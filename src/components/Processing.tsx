import { Show, createRoot, createSignal } from 'solid-js';
import { encode as GIFEncode } from 'modern-gif';
import GIFWorkerJS from 'modern-gif/worker?url';
import { outputSize, outputTimeRange, store, updateStore } from '../store';
import { grabFrames as grabFrames1 } from '../processors/frameGrabber';
import { reportError } from '../report';
import { AdSlot } from './ads/AdSlot';

export function ProcessingBar() {
  const [isRunning, setIsRunning] = createSignal(false);
  const [progress, setProgress] = createSignal('');
  const [percentage, setPercentage] = createSignal(0);
  const [errorMessage, setErrorMessage] = createSignal('');

  const errorHint = () => {
    const msg = errorMessage();
    if (!msg) return null;
    if (/allocation failed/.test(msg)) return 'Please reduce the width, height, framerate, or duration, and try again';
    return null;
  };

  async function processWithGIFjs() {
    const fetched = await grabFramesAndCombine();
    const { outputFrameDurationMS } = outputTimeRange();

    // Each frame must own its ArrayBuffer — shared views break worker postMessage (DataCloneError).
    const frames: { data: Uint8ClampedArray; delay: number }[] = Array.from({ length: fetched.frameCount }, (_, i) => {
      const begin = i * fetched.frameDataSize;
      const end = begin + fetched.frameDataSize;
      const copy = fetched.combined.slice(begin, end);
      return {
        data: new Uint8ClampedArray(copy.buffer, copy.byteOffset, copy.byteLength),
        delay: outputFrameDurationMS[i],
      };
    });

    setPercentage(-1);
    setProgress('Encoding to GIF');
    const encodeOpts = {
      width: outputSize().width,
      height: outputSize().height,
      maxColors: store.options.maxColors,
      format: 'arrayBuffer' as const,
      frames,
      looped: store.options.loop,
      loopCount: store.options.loop ? 0 : undefined,
    };
    let output: ArrayBuffer;
    try {
      output = await GIFEncode({
        ...encodeOpts,
        workerUrl: GIFWorkerJS as unknown as string,
      });
    } catch (workerErr) {
      const msg = String(workerErr);
      if (/DataCloneError|OperationError|could not be cloned|postMessage/i.test(msg)) {
        reportError('GIF worker encode failed, retrying on main thread', workerErr);
        setProgress('Encoding to GIF (main thread)');
        output = await GIFEncode(encodeOpts);
      } else {
        throw workerErr;
      }
    }

    setPercentage(100);
    setProgress('Finished');
    updateStore({
      outputFileContent: new Uint8Array(output),
    });
  }

  async function grabFramesAndCombine() {
    const { sourceStart, sourceEnd, frameCount: estimatedFrameCount } = outputTimeRange();
    const { file, fileContent } = store;
    if (!file || !fileContent) throw new Error('no file');

    setProgress('Allocating RAM');

    const { width, height } = outputSize();
    const frameDataSize = width * height * 4;
    const buffer = new ArrayBuffer(frameDataSize * estimatedFrameCount);
    const combined = new Uint8Array(buffer);
    let frameCount = 0;

    setProgress('Grabbing Frames');
    setPercentage(0);

    const progressSyncTimer = setInterval(() => {
      setPercentage((frameCount / estimatedFrameCount) * 100);
    }, 150);
    try {
      await grabFrames1({
        fileContent,
        fileExtname: store.fileInfo.extname,
        fileURL: store.fileInfo.url,
        resizeWidth: outputSize().width,
        resizeHeight: outputSize().height,
        frameTimestamps: Array.from(
          { length: estimatedFrameCount },
          (_, i) => sourceStart + (i * (sourceEnd - sourceStart)) / estimatedFrameCount,
        ),
        reportProgress(grabbedCount, frame) {
          const off = new OffscreenCanvas(width, height);
          const ctx = off.getContext('2d', { willReadFrequently: true })!;
          ctx.drawImage(frame.image, 0, 0, width, height);
          const imageData = ctx.getImageData(0, 0, width, height);
          combined.set(imageData.data, (grabbedCount - 1) * frameDataSize);
          frameCount = grabbedCount;
          if (frame.image instanceof ImageBitmap) {
            frame.image.close();
          }
          return isRunning();
        },
        ffmpeg: store.ffmpeg,
      });
    } finally {
      clearInterval(progressSyncTimer);
    }

    if (!isRunning()) throw new Error('Progress aborted');

    return {
      combined: combined.slice(0, frameCount * frameDataSize),
      width,
      height,
      frameCount,
      frameDataSize,
    };
  }

  function startProcess() {
    if (outputSize().width <= 0 || outputSize().height <= 0) {
      alert('Invalid output size');
      return;
    }

    setIsRunning(true);
    (document.querySelector('video.optionEditor-video') as HTMLVideoElement | null)?.pause();
    setErrorMessage('');
    processWithGIFjs()
      .catch(error => {
        reportError('convert error', error);
        setErrorMessage(String(error));
      })
      .finally(() => {
        setIsRunning(false);
      });
  }

  return (
    <div class="relative my-10 bg-white">
      {!isRunning() ? (
        <button class="startButton" onClick={startProcess}>
          <i class="i-mdi-play" /> Convert to GIF
        </button>
      ) : (
        <button class="stopButton" onClick={() => setIsRunning(false)}>
          Stop
        </button>
      )}

      <p class="text-center my-2 text-gray text-sm">
        <i class="i-mdi-google-chrome" /> Encodes with <strong>modern-gif</strong> in your browser — no upload, no watermark.
      </p>

      <WarningMsg
        when={outputSize().width > 600}
        message={`width ${outputSize().width} is kinda large.`}
        fix={() => updateStore('options', 'width', 600)}
      />
      <WarningMsg
        when={outputSize().height > 600}
        message={`height ${outputSize().height} is kinda large.`}
        fix={() => updateStore('options', 'height', 600)}
      />
      <WarningMsg when={outputTimeRange().frameCount > 250} message={`frame count ${outputTimeRange().frameCount} can be decreased with framerate, trimming and speed-up`} />

      <Show when={errorMessage()}>
        <div class="text-center my-4 text-red-7">
          <i class="i-mdi-alert-circle" /> {errorMessage()}
        </div>
        <Show when={errorHint()}>
          <div class="text-center my-4 mt--2 text-orange">{errorHint()}</div>
        </Show>
      </Show>

      <Show when={isRunning()}>
        <div class="text-center my-4">
          <i class="i-mdi-loading animate-spin mr-1" />
          {progress()}
        </div>
        <Show when={percentage() >= 0}>
          <div class="relative max-w-lg h-2 bg-gray-3 mx-auto rounded overflow-hidden">
            <div class="h-full bg-blue-5 transition" style={{ width: `${percentage()}%` }} />
          </div>
        </Show>
      </Show>

      <AdSlot slot="nativeBelowResult" class="mt-6 flex justify-center" />
    </div>
  );
}

function WarningMsg(props: { message: string; when: boolean; fix?: () => void }) {
  return (
    <Show when={props.when}>
      <div class="text-left text-gray text-sm">
        <i class="i-mdi-info-circle" /> {props.message}
        {props.fix && (
          <a class="ml-2 text-blue" href="#" onClick={e => { e.preventDefault(); props.fix!(); }}>
            (Fix It)
          </a>
        )}
      </div>
    </Show>
  );
}