import type { FFmpeg } from '@ffmpeg/ffmpeg';
import { FileData } from '@ffmpeg/ffmpeg/dist/esm/types';
import { createEffect, createMemo, createRoot, on, onCleanup } from 'solid-js';
import { createStore } from 'solid-js/store';
import { debounce, pick } from 'lodash-es';
import { readVideoFileInfo } from './processors/readFileInfo';

export const ditherOptions = ['none', 'sierra2_4a', 'bayer', 'floyd_steinberg'];

export const GIF_PRESETS = {
  discord: { label: 'Discord (~8 MB)', width: 320, framerate: 15, maxColors: 128 },
  slack: { label: 'Slack', width: 480, framerate: 12, maxColors: 128 },
  github: { label: 'GitHub README', width: 400, framerate: 10, maxColors: 96 },
} as const;

export const defaultOptions = {
  start: 0,
  end: 0,
  speed: 1,
  width: -1,
  height: -1,
  framerate: 12,
  maxColors: 255,
  dither: 'sierra2_4a',
  loop: true,
};

const storedOptionKeys: (keyof typeof defaultOptions)[] = ['maxColors', 'dither', 'loop', 'framerate'];

export const [store, updateStore] = createStore({
  file: null as null | File,
  fileContent: null as null | Uint8Array,
  fileInfo: {
    name: '',
    extname: '',
    url: '',
    width: 0,
    height: 0,
    duration: 0,
  },
  options: { ...defaultOptions },
  ffmpeg: null as null | FFmpeg,

  outputFileContent: null as null | FileData,
  outputFileURL: '',
});

export const outputSize = createRoot(() =>
  createMemo(() => {
    const { width: ow, height: oh } = store.fileInfo;
    const { width: nw, height: nh } = store.options;

    let w = nw,
      h = nh;
    if (nw === -1 && nh === -1) {
      w = ow;
      h = oh;
    } else if (nw === -1) {
      w = ow * (nh / oh);
    } else if (nh === -1) {
      h = oh * (nw / ow);
    }

    return { width: Math.floor(w), height: Math.floor(h) };
  }),
);

export const outputTimeRange = createRoot(() =>
  createMemo(() => {
    const { start: sourceStart, end: sourceEnd, speed, framerate } = store.options;

    const duration = (sourceEnd - sourceStart) / speed;
    const frameCount = Math.ceil(duration * framerate);

    const outputFramePresentTimeMS = Array.from({ length: frameCount }, (_, i) =>
      Math.round((i / frameCount) * duration * 1e3),
    );
    const outputFrameDurationMS = outputFramePresentTimeMS.map(
      (t, i) => (i === frameCount - 1 ? duration * 1e3 : outputFramePresentTimeMS[i + 1]) - t,
    );

    return {
      sourceStart,
      sourceEnd,
      duration,
      frameCount,
      outputFramePresentTimeMS,
      outputFrameDurationMS,
    };
  }),
);

createRoot(() => {
  createEffect(() => {
    const file = store.file;
    if (!file) return;

    updateStore('fileInfo', {
      name: file.name,
      extname: file.name.split('.').pop() ?? '',
    });

    const url = URL.createObjectURL(file);
    updateStore('fileInfo', { url });

    file
      .arrayBuffer()
      .then(data => {
        if (file !== store.file) return;

        const fileContent = new Uint8Array(data);
        updateStore('fileContent', fileContent);
        return readVideoFileInfo({ fileContent, fileURL: url });
      })
      .then(videoInfo => {
        if (!videoInfo || file !== store.file) return;
        updateStore('fileInfo', videoInfo);
        updateStore('options', { ...defaultOptions, end: videoInfo.duration });
      });

    onCleanup(() => {
      URL.revokeObjectURL(url);
      updateStore('fileInfo', { url: '' });
      updateStore('fileContent', null);
    });
  });

  createEffect(() => {
    const { start, end } = store.options;
    if (start > end) updateStore('options', { start: end, end: start });
  });

  createEffect(() => {
    const { outputFileContent } = store;
    if (!outputFileContent) {
      updateStore('outputFileURL', '');
      return;
    }

    const blob = new Blob([outputFileContent], { type: 'image/gif' });
    const url = URL.createObjectURL(blob);
    updateStore('outputFileURL', url);

    onCleanup(() => {
      URL.revokeObjectURL(url);
    });
  });

  const skOptions = 'vtg:options';
  const debouncedWriteOptions = createDebouncedWrite(skOptions);

  try {
    const read = JSON.parse(localStorage.getItem(skOptions)!);
    const picked = pick(read, storedOptionKeys);
    Object.assign(defaultOptions, picked);
    updateStore('options', picked);
  } catch {
    /* ignore */
  }

  createEffect(
    on(
      () => JSON.stringify(pick(store.options, storedOptionKeys)),
      str => {
        debouncedWriteOptions(str);
        Object.assign(defaultOptions, JSON.parse(str));
      },
    ),
  );
});

function createDebouncedWrite(key: string): (value: string) => void {
  let lastValue: string | null = null;
  const debouncedWrite = debounce(
    () => {
      if (lastValue === null) return;
      localStorage.setItem(key, lastValue);
      lastValue = null;
    },
    1000,
    { trailing: true },
  );

  return (value: string) => {
    lastValue = value;
    debouncedWrite();
  };
}