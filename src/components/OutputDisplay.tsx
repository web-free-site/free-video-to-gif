import { Show } from 'solid-js';
import { store } from '../store';

function readableFileSize(size: number) {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const unitIndex = Math.floor(Math.log(size) / Math.log(1024));
  return (size / Math.pow(1024, unitIndex)).toFixed(2) + ' ' + units[unitIndex];
}

export function OutputDisplay() {
  const hasError = () => isNaN(store.outputFileContent?.length || 0);

  return (
    <Show when={store.outputFileURL}>
      <section
        class="rounded-xl p-4 mt-4 bg-slate-2"
        classList={{ 'bg-gray-1': hasError() }}
      >
        <h2>Output</h2>

        <Show when={hasError()}>
          <p class="text-red-6">Output could not be created. Try reducing duration, width, or frame rate.</p>
        </Show>

        <p>File size: {readableFileSize(store.outputFileContent?.length || 0)}</p>
        <p>
          <a
            class="decoration-none text-blue-500 hover:underline"
            download={`${store.fileInfo.name || 'video'}.gif`}
            href={store.outputFileURL}
          >
            <i class="i-mdi-download mr-1" />
            Download GIF
          </a>
        </p>
        <img src={store.outputFileURL} alt="Converted GIF preview" class="block mx-auto max-w-full rounded-xl" />
      </section>
    </Show>
  );
}