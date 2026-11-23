import { ContentPage } from './ContentPage';
import { A } from '@solidjs/router';

export function DiscordGifPage() {
  return (
    <ContentPage
      title="Video to GIF for Discord"
      description="Make smaller GIFs for Discord: width, FPS, and the in-app Discord preset (about 8 MB)."
      canonicalPath="/video-to-gif-for-discord"
    >
      <h1 class="text-3xl font-light mb-4">Video to GIF for Discord</h1>
      <p>
        Discord limits animated uploads (often around 8 MB for free accounts). Short loops with fewer pixels and frames
        work best.
      </p>
      <ul class="list-disc pl-5 mt-4 space-y-2">
        <li>Use the <strong>Discord</strong> preset on the <A href="/">converter</A> (320 px width, 15 FPS).</li>
        <li>Trim to the shortest useful segment—under 10 seconds when possible.</li>
        <li>Lower max colors (128 or fewer) to shrink file size.</li>
        <li>After conversion, check the download size before you post.</li>
      </ul>
    </ContentPage>
  );
}