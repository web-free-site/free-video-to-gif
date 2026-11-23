import { ContentPage } from './ContentPage';
import { HUB_URL, SITE_NAME, UPSTREAM_REPO } from '../site';

export function AboutPage() {
  return (
    <ContentPage
      title="About"
      description={`About ${SITE_NAME}: upstream credits, modern-gif encoding, and optional LGPL FFmpeg decode fallback.`}
      canonicalPath="/about"
    >
      <h1 class="text-3xl font-light mb-4">About {SITE_NAME}</h1>
      <p>
        {SITE_NAME} turns short clips from local video files into GIFs entirely in your browser. Files are never uploaded to
        our servers.
      </p>
      <h2 class="text-xl mt-6 mb-2">Open source</h2>
      <p>
        The converter UI and pipeline are based on{' '}
        <a href={UPSTREAM_REPO} rel="noopener noreferrer" target="_blank">
          lyonbot/video-to-gif
        </a>{' '}
        (Apache License 2.0). We keep the upstream license and thank the original author.
      </p>
      <h2 class="text-xl mt-6 mb-2">Encoding</h2>
      <p>
        GIF frames are encoded with{' '}
        <a href="https://www.npmjs.com/package/modern-gif" rel="noopener">
          modern-gif
        </a>{' '}
        in the browser using WebCodecs and canvas where supported.
      </p>
      <h2 class="text-xl mt-6 mb-2">Optional decode fallback</h2>
      <p>
        When the browser cannot decode a rare codec, the tool may download a single-thread{' '}
        <a href="https://ffmpeg.org" rel="noopener">
          FFmpeg
        </a>{' '}
        WebAssembly build (LGPL, via{' '}
        <a href="https://github.com/ffmpegwasm/ffmpeg.wasm" rel="noopener">
          ffmpeg.wasm
        </a>
        ) from a public CDN, with progress and cache. That core is not shipped inside the site bundle and is not used for
        GIF encoding.
      </p>
      <h2 class="text-xl mt-6 mb-2">Hub</h2>
      <p>
        Find more utilities on{' '}
        <a href={HUB_URL}>web-free.site</a>.
      </p>
    </ContentPage>
  );
}