# Free Video to GIF Converter

Convert local MP4, WebM, and MOV files to GIF in the browser. Based on [lyonbot/video-to-gif](https://github.com/lyonbot/video-to-gif) (Apache-2.0).

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Output: `dist/` (static assets for Cloudflare Workers). Post-build scripts prerender SEO pages, write `sitemap.xml`, and inject the “More free tools” block plus Cloudflare Web Analytics.

## Deploy

Deploy is handled separately (see `wrangler.toml`). This repo does not run deploy in CI by default.