# Cursor agent brief — free-video-to-gif

Target: https://free-video-to-gif.web-free.site
Repo name (wrangler `name`): `free-video-to-gif`
English name: "Free Video to GIF Converter". English primary.

Follow every rule in the attached `agent-brief-common.md`, with one SEO override below. Do not write the tool from scratch. Do not deploy. Do not switch models. Push to `main` of this repo when the work is done.

**SEO / language override (takes precedence over the common brief):** do **not** add a French or Swahili landing page, UI translation, or how-to pages. How-to and legal pages are English only. You may omit `hreflang` fr.

This is a **local-file** video-to-GIF converter: the user picks a local video, trims a passage, sets fps / width / loop / target size if possible, and downloads a GIF. No watermark. Do not add YouTube, URL, or cloud downloading.

## Recommended base (use this)

- Repo: https://github.com/lyonbot/video-to-gif
- License: Apache-2.0 (keep `LICENSE`, include the Apache notice, credit video-to-gif / lyonbot in the footer and on `/about`)
- Stars: 55
- Last commit: 9 Dec 2025, 21:04 Africa/Kigali — `731e866dcf` on `main`
- Official demo: `https://lyonbot.github.io/video-to-gif/`
- Stack: Vite, Solid.js, TypeScript, UnoCSS, `modern-gif`, `mp4box`, `@ffmpeg/ffmpeg` 0.12.15 and `@ffmpeg/core` 0.12.10, WebCodecs. A complete in-browser converter with a live demo. `npm run build` emits a static `dist/`.
- Cloudflare: yes — static assets / Workers with assets. You must add prerendered HTML for every public page (no bare SPA fallback).
- Verification (this box, 23 Nov 2026, Africa/Kigali): GitHub API. `LICENSE` is Apache-2.0; `package.json` license is Apache-2.0; author field is `lyonbot`. **Remove `@sentry/browser` and `setupSentry` / `report.ts` — no third-party tracking.** Official `@ffmpeg/core@0.12.10` is GPL — you must replace it (see FFmpeg section). A commit mentions "watermarks in localStorage": **exported GIFs must have no watermark**.
- Why this one: permissive Apache-2.0, a complete working website, 55 stars, in-browser WebCodec + ffmpeg, live demo.

## Backup (MIT; simpler React trimmer)

- Repo: https://github.com/godbasin/video-to-gif
- License: MIT (LICENSE file, Copyright (c) 2023 godbasin)
- Stars: 31
- Last commit: 19 Apr 2024, 11:52 Africa/Kigali — `cb97fa7f55` on `main`
- Official demo: `https://godbasin.github.io/video-to-gif/`
- Stack: Vite, React, TypeScript, ffmpeg.wasm, cropperjs. MP4 to GIF, start/end, crop, FPS, width. UI/README are partly Chinese — rebrand to English if you use this base. Same FFmpeg-core rules.

`mryhryki/video-to-gif` is MIT but **archived**. `realdennis/video2gif` has no license file. `RadekVyM/bezel-more` is MIT (device bezels) — optional inspiration, not the primary product.

## Do not use these

- Repos without a license.
- Desktop, Electron, or server-side GIF tools, and any tool that uploads the video or downloads from a URL.

## FFmpeg core license and file size (mandatory)

The JavaScript wrapper `@ffmpeg/ffmpeg` is MIT. The FFmpeg **WebAssembly cores are often not**.

- Official `@ffmpeg/core@0.12.10` is **GPL-2.0-or-later** on the npm registry. The npm license field on some older tags (including 0.12.6) may say MIT — do not trust that for the `.wasm` binary without checking the core you actually ship.
- Multi-thread cores (`@ffmpeg/core-mt`) need COEP/COOP, which **breaks Adsterra**. Do not use them.
- Gentil allows an **LGPL** ffmpeg.wasm core used as a library. A GPL core is worse.
- Prefer a **single-thread LGPL build** (no `--enable-gpl`, no COEP/COOP). If you cannot produce or obtain a clearly LGPL single-thread core, **STOP before shipping a GPL core** and report what you found, rather than quietly using a CDN `@ffmpeg/core` or `@ffmpeg/core-mt`.
- **Do not put a 25+ MiB `.wasm` file in the Worker assets or the Git repo.** Cloudflare static assets typically cap individual files at 25 MiB. Load the single-thread core at runtime from a public CDN or similar host, show a progress indicator, and cache it in the browser (Cache API or OPFS). Credit FFmpeg and ffmpeg.wasm on `/about`, and keep the license texts that apply to the core you actually ship.
- **Do not set COEP/COOP headers.** Ads will break if you do. Drop any `coi-serviceworker` or similar COOP/COEP shim.

GIF encoding can be done with `modern-gif` (already in the recommended base) or an LGPL-safe ffmpeg path. You do **not** need libx264 for a GIF. If the base can work without FFmpeg (WebCodecs + `modern-gif`), that is fine and avoids the core-license problem; still credit whatever you ship.

## What to build on top of lyonbot/video-to-gif

1. Import the base into this repo, keep the Apache-2.0 license, and credit video-to-gif / lyonbot (and FFmpeg / ffmpeg.wasm / modern-gif as applicable). Omit GitHub Actions workflows if any (the token lacks the `workflow` scope — do not restore them). Remove Sentry and any other analytics except the Cloudflare beacon specified below.
2. Rebrand to "Free Video to GIF Converter". English primary. No FR/SW translations of the site. Keep trim, fps, width, and preview. Add **presets** for Discord, Slack, and GitHub README (reasonable max size / width). **No watermark** on the GIF. Loop should be on by default.
3. Keep everything 100% in the browser. No accounts, no paid APIs, no API keys, no file upload, no YouTube, no URL import. Accept common local videos (at least MP4, WebM, MOV). Let the user download the GIF.
4. Adsterra only, never AdSense. Use **only** the placeholder keys in this brief (or real keys if a follow-up provides them). Follow the `free-invoice-generator` pattern: all 10 units, banners in isolated iframes, `public/ads.json`. Never set COEP/COOP headers. Ads must not break conversion or download.
5. SEO: prerendered HTML for every page (no bare SPA fallback); unique title, meta description, canonical, OG; JSON-LD (WebApplication + FAQPage); `sitemap.xml` and `robots.txt` for `https://free-video-to-gif.web-free.site`; English how-to pages, at least `/how-to-convert-a-video-to-gif-in-the-browser`, `/video-to-gif-for-discord`, and `/make-a-gif-from-a-screen-recording` (each with its own title, description and canonical); prerendered `/privacy`, `/terms`, `/about`, `/contact`. Canonicals must be `https://free-video-to-gif.web-free.site`. No French landing page.
6. Footer: credit the upstream project (and FFmpeg if used), and add a link back to the hub `https://web-free.site/?ref=video-to-gif`.
7. On every prerendered HTML page, before `</body>`, add the More free tools block and the Cloudflare Web Analytics beacon (see below). Implement this with `scripts/inject-more-tools.mjs` hooked into `postbuild` or the end of `npm run build`, so a later rebuild cannot drop the home-page snippets. Do not rely on a one-off manual edit of `dist/` / `out/`.
   - The same **"More free tools"** block used on the other web-free.site tools (`id="wf-more-tools"`). Include a "Guides on this site" column for the how-to pages. List every current hub tool, plus the six other sites in this batch. Show **Free Video to GIF Converter** as bold text, not a self-link. Every outbound tool/hub link must carry `?ref=video-to-gif`.
     - **Documents & writing:** Free Word Counter (`https://free-word-counter.web-free.site/?ref=video-to-gif`), Free PDF Converter (`https://free-pdf-converter.web-free.site/?ref=video-to-gif`), Free CV Maker (`https://free-cv-maker.web-free.site/?ref=video-to-gif`), Free Invoice Generator (`https://free-invoice-generator.web-free.site/?ref=video-to-gif`), Free Typing Test (`https://free-typing-test.web-free.site/?ref=video-to-gif`), Free Signature Generator (`https://free-signature-generator.web-free.site/?ref=video-to-gif`), Free Email Signature Generator (`https://free-email-signature-generator.web-free.site/?ref=video-to-gif`).
     - **Images & codes:** Free QR Code Creator (`https://free-qr-code-creator.web-free.site/?ref=video-to-gif`), Free Image Resizer (`https://free-image-resizer.web-free.site/?ref=video-to-gif`), Free Image to Text (`https://free-image-to-text.web-free.site/?ref=video-to-gif`), Free Background Remover (`https://free-background-remover.web-free.site/?ref=video-to-gif`), Free Image Compressor (`https://free-image-compressor.web-free.site/?ref=video-to-gif`), Free HEIC to JPG Converter (`https://free-heic-to-jpg.web-free.site/?ref=video-to-gif`), Free Image Upscaler (`https://free-image-upscaler.web-free.site/?ref=video-to-gif`), Free Passport Photo Maker (`https://free-passport-photo-maker.web-free.site/?ref=video-to-gif`), Free PNG to SVG Converter (`https://free-png-to-svg.web-free.site/?ref=video-to-gif`).
     - **Calculators & currency:** Free Online Calculator (`https://free-online-calculator.web-free.site/?ref=video-to-gif`), Free Currency Converter (`https://free-currency-converter.web-free.site/?ref=video-to-gif`), Free Unit Converter (`https://free-unit-converter.web-free.site/?ref=video-to-gif`), Free Loan Calculator (`https://free-loan-calculator.web-free.site/?ref=video-to-gif`), Free Age Calculator (`https://free-age-calculator.web-free.site/?ref=video-to-gif`), Free Percentage Calculator (`https://free-percentage-calculator.web-free.site/?ref=video-to-gif`), Free BMI Calculator (`https://free-bmi-calculator.web-free.site/?ref=video-to-gif`).
     - **Text & SEO:** Free AI Humanizer (`https://free-ai-humanizer.web-free.site/?ref=video-to-gif`), Free SEO Generator (`https://free-seo-generator.web-free.site/?ref=video-to-gif`), Free Backlink Generator (`https://free-backlink-generator.web-free.site/?ref=video-to-gif`), Free JSON Formatter (`https://free-json-formatter.web-free.site/?ref=video-to-gif`), Free Text to Speech (`https://free-text-to-speech.web-free.site/?ref=video-to-gif`), Free Speech to Text (`https://free-speech-to-text.web-free.site/?ref=video-to-gif`), Free Diff Checker (`https://free-diff-checker.web-free.site/?ref=video-to-gif`).
     - **Audio & video:** Free Video to MP3 Converter (`https://free-video-to-mp3.web-free.site/?ref=video-to-gif`), Free MP3 Cutter (`https://free-mp3-cutter.web-free.site/?ref=video-to-gif`), Free Screen Recorder (`https://free-screen-recorder.web-free.site/?ref=video-to-gif`), Free Video Compressor (`https://free-video-compressor.web-free.site/?ref=video-to-gif`), **Free Video to GIF Converter**, Free Audio Converter (`https://free-audio-converter.web-free.site/?ref=video-to-gif`).
     - **Files:** Free ZIP Tool (`https://free-zip-tool.web-free.site/?ref=video-to-gif`).
     - **Test data:** Free Fake Address Generator (`https://free-fake-address-generator.web-free.site/?ref=video-to-gif`), Free Fake Name Generator (`https://free-fake-name-generator.web-free.site/?ref=video-to-gif`).
     - **Security & passwords:** Free Password Generator (`https://free-password-generator.web-free.site/?ref=video-to-gif`).
   - The same Cloudflare Web Analytics tag used on the other sites: `<!-- Cloudflare Web Analytics --><script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "3e2f5f96ab32442ebb6e6f650615b58a"}'></script><!-- End Cloudflare Web Analytics -->`
8. `wrangler.toml`: `name = "free-video-to-gif"`, `[assets]` pointing at the static build output (`dist` or `out`). Use `html_handling = "auto-trailing-slash"` and `not_found_handling = "none"`. Custom domain `free-video-to-gif.web-free.site`. **Do not put `account_id` (or API tokens) in the committed file.** **Do not deploy.** Push to this repo only. Deploy happens from Gentil's box. Add a `.assetsignore` so Worker assets do not publish `AGENT_BRIEF.md`, `wrangler.toml`, `package.json`, `package-lock.json`, `.git/`, `node_modules/`, or other source/config files.
9. Test: production build, run locally (without COEP/COOP), convert a short MP4 (and a short WebM if possible) to a GIF, confirm there is no watermark, download and play/open the GIF, try a Discord-oriented preset, check mobile at 390px, confirm no file is uploaded and that no URL downloader exists, fix bugs. Critique your own result and fix issues.
10. Push everything to `main`. Final report: base repo + license, which encoder/core you actually shipped, pages, tests and results, remaining caveats, commit hash.

## Adsterra ad codes

Real Adsterra codes were not ready when this brief was written (the publisher-dashboard collection was stopped mid-run on an earlier attempt). **Do not invent real-looking keys.** Wire all 10 units and `public/ads.json` with the exact placeholder strings below (32 characters each, prefix `wf23placeholder0`). A later swap (or a follow-up to you with real keys) will replace them before deploy.

Code formats (KEY = the 32-char placeholder, later a 32-hex hash):
- Popunder: <script data-cfasync="false" src="https://abscloud.org/1/KEY"></script>
- Native Banner: <script async="async" data-cfasync="false" src="https://bauval.org/21/KEY"></script><div id="container-KEY"></div>
- Social Bar: <script data-cfasync="false" src="https://bauval.org/14/KEY"></script>
- Banner WxH: <script>atOptions = {'key':'KEY','format':'iframe','height':H,'width':W,'params':{}};</script><script src="https://bauval.org/22/KEY"></script>
- Smartlink URL: https://araplhn.org/4/KEY

## free-video-to-gif.web-free.site — site ID SITE_ID_PENDING
Popunder wf23placeholder0popunder00000000
Native Banner wf23placeholder0nativebanner0000
Smartlink wf23placeholder0smartlink0000000
Social Bar wf23placeholder0socialbar0000000
468x60 wf23placeholder0banner468x600000
160x300 wf23placeholder0banner160x300000
320x50 wf23placeholder0banner320x500000
300x250 wf23placeholder0banner300x250000
160x600 wf23placeholder0banner160x600000
728x90 wf23placeholder0banner728x900000


---
NOTE: any /workspace/... box path mentioned above is NOT accessible to you; everything you need is inline below. Clone the base repo from GitHub yourself.

# COMMON RULES (contents of agent-brief-common.md)
COMMON RULES (from Gentil, mandatory):
- Start from an existing, usable open-source repository: search GitHub, then compare stars, activity, license (MIT/Apache/BSD preferred; avoid AGPL/GPL unless nothing else fits) and code quality. Import its code into this repo, keep its LICENSE, and credit it in the footer and on /about.
- Do NOT write the tool from scratch. If no suitable open-source base exists, STOP before coding and report the 2-3 best candidates and why they fail. Gentil must approve any from-scratch work, and he only allows it for one or two simple pages.
- Keep the model you were launched with. Do not switch models.
- Must be hostable on Cloudflare Workers with static assets (free plan). No paid APIs, no server costs, no API keys. Client-side processing preferred.
- Monetization: Adsterra only, never AdSense. This brief ships obviously fake placeholder keys (the `wf23placeholder0…` strings). Wire all 10 units with those exact strings so they can be swapped later. Do not invent real-looking 32-hex Adsterra keys, URLs, or site IDs. If this prompt (or a later follow-up) includes a filled "ADSTERRA CODES FOR THIS SITE" section with real 32-hex keys, use those instead of the placeholders. Integrate all 10 units following the free-invoice-generator pattern: Popunder and Social Bar in the HTML; 728x90 at the top; sidebar 160x600 and 160x300; mid-page 728x90, 468x60 and Native; 300x250; sticky 320x50 on mobile; Smartlink as a discreet link. Banners go in isolated iframes with atOptions {key, format:'iframe', height, width, params:{}} and src https://bauval.org/22/<key>. Also write public/ads.json with all the codes. Never set COEP/COOP headers. Ads must not break the tool.
- SEO: prerendered HTML for every page (no bare SPA fallback); unique title, meta description, canonical and OG tags; JSON-LD (WebApplication + FAQPage); a long-tail keyword page or two; FAQ and how-to content; /privacy, /terms, /about and /contact pages (prerendered). The site-specific brief may override hreflang / French landing pages.
- Name: "Free <Tool>". English primary.
- Hook a `scripts/inject-more-tools.mjs` (or equivalent) into `postbuild` or the end of `npm run build`, so the Cloudflare Web Analytics beacon and the "More free tools" block are injected into every built HTML page and cannot be dropped by a later rebuild.
- Add wrangler.toml with name = <repo name> and [assets] pointing to the build output. Do NOT deploy: Gentil's box deploys it.
- Test: build, run it locally, exercise the main feature in a browser, check mobile at 390px, and fix bugs. Critique your own result and fix the issues you find.
- Push everything to main of this repo.
- Final report: the base repo and its license, the pages, the tests and their results, the remaining caveats, and the commit hash.

# ADSTERRA CODES FOR THIS SITE (use only these)
- Popunder: <script data-cfasync="false" src="https://abscloud.org/1/KEY"></script>
- Native Banner: <script async="async" data-cfasync="false" src="https://bauval.org/21/KEY"></script><div id="container-KEY"></div>
- Social Bar: <script data-cfasync="false" src="https://bauval.org/14/KEY"></script>
- Banner WxH: <script>atOptions = {'key':'KEY','format':'iframe','height':H,'width':W,'params':{}};</script><script src="https://bauval.org/22/KEY"></script>
- Smartlink URL: https://araplhn.org/4/KEY

## free-video-to-gif.web-free.site — site ID SITE_ID_PENDING
Popunder wf23placeholder0popunder00000000
Native Banner wf23placeholder0nativebanner0000
Smartlink wf23placeholder0smartlink0000000
Social Bar wf23placeholder0socialbar0000000
468x60 wf23placeholder0banner468x600000
160x300 wf23placeholder0banner160x300000
320x50 wf23placeholder0banner320x500000
300x250 wf23placeholder0banner300x250000
160x600 wf23placeholder0banner160x600000
728x90 wf23placeholder0banner728x900000
