import fs from 'node:fs';
import path from 'node:path';

/**
 * modern-gif worker init must not transfer frame buffers: duplicate transfers of a
 * shared ArrayBuffer throw DataCloneError in Chrome/Edge. Structured clone copies
 * TypedArray payloads safely when each frame has its own buffer (see Processing.tsx).
 *
 * Per-frame encoder:encode still transfers a single buffer (one frame at a time).
 */
const file = path.join('node_modules', 'modern-gif', 'dist', 'index.mjs');
let src = fs.readFileSync(file, 'utf8');

const brokenPatch = `    if (this._config.workerUrl) {
      var transferable = [];
      options.frames?.forEach(f => {
        if (f.data?.buffer instanceof ArrayBuffer) {
          transferable.push(f.data.buffer);
        }
      });
      this._worker = createWorker({ workerUrl: this._config.workerUrl });
      this._worker.call("encoder:init", options, transferable);`;

const goodInit = `    if (this._config.workerUrl) {
      this._worker = createWorker({ workerUrl: this._config.workerUrl });
      this._worker.call("encoder:init", options);`;

if (src.includes(brokenPatch)) {
  src = src.replace(brokenPatch, goodInit);
  fs.writeFileSync(file, src);
  console.log('modern-gif patch: removed broken encoder:init buffer transfer');
} else if (src.includes('transferable.push') && src.includes('encoder:init')) {
  src = src.replace(
    /if \(this\._config\.workerUrl\) \{[\s\S]*?this\._worker\.call\("encoder:init", options, transferable\);/,
    goodInit,
  );
  fs.writeFileSync(file, src);
  console.log('modern-gif patch: removed encoder:init buffer transfer (regex)');
} else if (!src.includes(goodInit)) {
  console.log('modern-gif patch: already clean or layout changed');
} else {
  console.log('modern-gif patch: ok');
}