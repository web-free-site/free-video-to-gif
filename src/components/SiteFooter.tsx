import { A } from '@solidjs/router';
import { HUB_URL, SITE_NAME, UPSTREAM_REPO } from '../site';
import { SponsoredSmartlink } from './ads/AdSlot';

export function SiteFooter() {
  return (
    <footer class="max-w-6xl mx-auto px-4 py-10 mt-12 border-t border-gray-3 text-sm text-gray-7">
      <div class="grid sm:grid-cols-2 gap-6">
        <div>
          <p class="font-semibold text-gray-9 mb-2">{SITE_NAME}</p>
          <p>
            Based on{' '}
            <a href={UPSTREAM_REPO} class="text-blue hover:underline" rel="noopener noreferrer" target="_blank">
              video-to-gif / lyonbot
            </a>{' '}
            (Apache-2.0). GIF encoding uses{' '}
            <a href="https://www.npmjs.com/package/modern-gif" class="text-blue hover:underline" rel="noopener">
              modern-gif
            </a>
            . Optional decode fallback may use{' '}
            <a href="https://ffmpeg.org" class="text-blue hover:underline" rel="noopener">
              FFmpeg
            </a>{' '}
            (LGPL) via{' '}
            <a href="https://github.com/ffmpegwasm/ffmpeg.wasm" class="text-blue hover:underline" rel="noopener">
              ffmpeg.wasm
            </a>
            .
          </p>
          <p class="mt-2">
            More free tools:{' '}
            <a href={HUB_URL} class="text-blue hover:underline">
              web-free.site
            </a>
          </p>
          <SponsoredSmartlink class="mt-3" />
        </div>
        <nav aria-label="Footer" class="flex flex-col gap-1">
          <A href="/how-to-convert-a-video-to-gif-in-the-browser" class="hover:text-gray-9">
            How to convert video to GIF
          </A>
          <A href="/video-to-gif-for-discord" class="hover:text-gray-9">
            GIF size for Discord
          </A>
          <A href="/make-a-gif-from-a-screen-recording" class="hover:text-gray-9">
            Screen recording to GIF
          </A>
          <A href="/about" class="hover:text-gray-9">
            About
          </A>
          <A href="/contact" class="hover:text-gray-9">
            Contact
          </A>
          <A href="/privacy" class="hover:text-gray-9">
            Privacy
          </A>
          <A href="/terms" class="hover:text-gray-9">
            Terms
          </A>
        </nav>
      </div>
      <p class="mt-6 text-xs text-gray-6">© {new Date().getFullYear()} {SITE_NAME}. English only.</p>
    </footer>
  );
}