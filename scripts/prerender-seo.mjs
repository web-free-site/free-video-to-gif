import fs from 'node:fs';
import path from 'node:path';
import { homeFaqHtml, homeSeoArticleHtml } from './home-seo-html.mjs';

const HOST = 'https://free-video-to-gif.web-free.site';
const dist = path.resolve('dist');
const baseHtml = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

const pages = [
  {
    path: '/how-to-convert-a-video-to-gif-in-the-browser',
    title: 'How to convert a video to GIF in the browser',
    description: 'Step-by-step guide to trim local video and download a GIF without uploading.',
    h1: 'How to convert a video to GIF in the browser',
    snippet:
      '<p>Choose a local file, trim with the timeline, set FPS and width, then convert and download. No upload.</p>',
  },
  {
    path: '/video-to-gif-for-discord',
    title: 'Video to GIF for Discord',
    description: 'Tips and the Discord preset for smaller GIFs that fit Discord upload limits.',
    h1: 'Video to GIF for Discord',
    snippet: '<p>Use the Discord preset, keep clips short, and lower colors to stay near 8 MB.</p>',
  },
  {
    path: '/make-a-gif-from-a-screen-recording',
    title: 'Make a GIF from a screen recording',
    description: 'Convert a local screen recording MP4 or WebM into a trimmed, lower-FPS GIF.',
    h1: 'Make a GIF from a screen recording',
    snippet: '<p>Open your recording in the converter, trim to the action, reduce width and FPS.</p>',
  },
  {
    path: '/about',
    title: 'About',
    description: 'About Free Video to GIF Converter — lyonbot/video-to-gif, modern-gif, optional LGPL FFmpeg.',
    h1: 'About this converter',
    snippet: '<p>Apache-2.0 upstream, modern-gif encoding, optional LGPL decode fallback from CDN.</p>',
  },
  {
    path: '/privacy',
    title: 'Privacy policy',
    description: 'Privacy policy for Free Video to GIF Converter.',
    h1: 'Privacy policy',
    snippet: '<p>Your media stays on your device. We do not receive your video files.</p>',
  },
  {
    path: '/terms',
    title: 'Terms of use',
    description: 'Terms for using Free Video to GIF Converter.',
    h1: 'Terms of use',
    snippet: '<p>Use the tool lawfully on files you have rights to convert.</p>',
  },
  {
    path: '/contact',
    title: 'Contact',
    description: 'Contact maintainers of Free Video to GIF Converter.',
    h1: 'Contact',
    snippet: '<p>Reach us via web-free.site or GitHub issues.</p>',
  },
];

function buildPage(page) {
  const url = HOST + page.path;
  let html = baseHtml;
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${page.title} — Free Video to GIF Converter</title>`);
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${page.description}" />`,
  );
  if (html.includes('rel="canonical"')) {
    html = html.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${url}" />`);
  } else {
    html = html.replace('</head>', `    <link rel="canonical" href="${url}" />\n  </head>`);
  }
  html = html.replace(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${url}" />`);
  html = html.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${page.title}" />`,
  );
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${page.description}" />`,
  );
  const seoBlock = `<section id="seo-prerender" class="seo-prerender"><h1>${page.h1}</h1>${page.snippet}</section>`;
  html = html.replace('<div id="root"></div>', `${seoBlock}<div id="root"></div>`);
  return html;
}

for (const page of pages) {
  const dir = path.join(dist, page.path.replace(/^\//, ''));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), buildPage(page));
}

const homeSeoBlock = `<section id="seo-prerender" class="seo-prerender"><h1>Free Video to GIF Converter</h1><p>Pick a video from your device, trim a clip, and download a GIF. Nothing is uploaded.</p>${homeSeoArticleHtml()}${homeFaqHtml()}</section>`;
let homeHtml = baseHtml.replace('<div id="root"></div>', `${homeSeoBlock}<div id="root"></div>`);
fs.writeFileSync(path.join(dist, 'index.html'), homeHtml);

console.log('Prerendered', pages.length, 'SEO HTML shells plus homepage into dist/');