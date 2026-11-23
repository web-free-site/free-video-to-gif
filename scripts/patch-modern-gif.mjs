import fs from 'node:fs';
import path from 'node:path';

const file = path.join('node_modules', 'modern-gif', 'dist', 'index.mjs');
let src = fs.readFileSync(file, 'utf8');
const needle = `    if (this._config.workerUrl) {
      this._worker = createWorker({ workerUrl: this._config.workerUrl });
      this._worker.call("encoder:init", options);`;
const patch = `    if (this._config.workerUrl) {
      var transferable = [];
      options.frames?.forEach(f => {
        if (f.data?.buffer instanceof ArrayBuffer) {
          transferable.push(f.data.buffer);
        }
      });
      this._worker = createWorker({ workerUrl: this._config.workerUrl });
      this._worker.call("encoder:init", options, transferable);`;
if (!src.includes('transferable.push')) {
  if (!src.includes(needle)) {
    console.error('modern-gif patch: pattern not found');
    process.exit(1);
  }
  fs.writeFileSync(file, src.replace(needle, patch));
}
console.log('modern-gif patch: ok');