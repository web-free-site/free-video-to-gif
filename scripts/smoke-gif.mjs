#!/usr/bin/env node
/**
 * End-to-end GIF export smoke test (headless Chromium).
 * Usage: node scripts/smoke-gif.mjs [mp4] [webm]
 */
import { chromium } from 'playwright';
import fs from 'node:fs';

const url = process.env.SMOKE_URL || 'http://127.0.0.1:4173/';
const files = process.argv.slice(2).length
  ? process.argv.slice(2)
  : ['/tmp/test-vtg.mp4', '/tmp/test-vtg.webm'];

async function convertOne(page, videoPath) {
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  await page.locator('input[type=file]').setInputFiles(videoPath);
  await page.waitForFunction(() => /\d+\s*×\s*\d+/.test(document.body.innerText), { timeout: 60000 });
  await page.evaluate(() => document.querySelector('button.startButton')?.click());
  await page.waitForSelector('text=Download GIF', { timeout: 180000 });
  const len = await page.evaluate(async () => {
    const a = document.querySelector('a[download]');
    const buf = await (await fetch(a.href)).arrayBuffer();
    return buf.byteLength;
  });
  const header = await page.evaluate(async () => {
    const a = document.querySelector('a[download]');
    const u8 = new Uint8Array(await (await fetch(a.href)).arrayBuffer());
    return String.fromCharCode(...u8.slice(0, 6));
  });
  if (header !== 'GIF87a' && header !== 'GIF89a') throw new Error(`${videoPath}: bad header ${header}`);
  if (len < 100) throw new Error(`${videoPath}: output too small`);
  console.log('OK', videoPath, len, 'bytes', header);
}

const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
page.on('console', m => {
  if (/convert error|DataClone|OperationError|Encoder/i.test(m.text())) console.error('browser:', m.text());
});

for (const f of files) {
  if (!fs.existsSync(f)) {
    console.error('Missing', f);
    process.exit(1);
  }
  await convertOne(page, f);
}

await browser.close();