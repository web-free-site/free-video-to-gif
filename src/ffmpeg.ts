import { FFmpeg } from '@ffmpeg/ffmpeg';
import { updateStore } from './store';
import { resolveFfmpegCoreUrls } from './utils/ffmpegCoreLoader';
import workerURL from '@ffmpeg/ffmpeg/worker?url';

let loadPromise: Promise<FFmpeg> | null = null;

/** Lazy LGPL core load — only used when WebCodecs cannot decode a file. */
export function ensureFfmpeg(): Promise<FFmpeg> {
  if (loadPromise) return loadPromise;
  loadPromise = (async () => {
    const ffmpeg = new FFmpeg();
    const { coreURL, wasmURL } = await resolveFfmpegCoreUrls();
    await ffmpeg.load({
      coreURL,
      wasmURL,
      classWorkerURL: import.meta.env.PROD ? undefined : workerURL,
    });
    updateStore({ ffmpeg });
    return ffmpeg;
  })();
  return loadPromise;
}