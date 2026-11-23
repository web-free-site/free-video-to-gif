import { ContentPage } from './ContentPage';
import { A } from '@solidjs/router';

export function HowToGifPage() {
  return (
    <ContentPage
      title="How to convert a video to GIF in the browser"
      description="Step-by-step: trim a local MP4, WebM, or MOV and download a watermark-free GIF without uploading."
      canonicalPath="/how-to-convert-a-video-to-gif-in-the-browser"
    >
      <h1 class="text-3xl font-light mb-4">How to convert a video to GIF in the browser</h1>
      <ol class="list-decimal pl-5 space-y-2">
        <li>
          Open the <A href="/">converter</A> and click to choose a video from your device (MP4, WebM, MOV, and other
          formats your browser can decode).
        </li>
        <li>Drag the green and blue handles on the timeline to set the start and end of the GIF clip.</li>
        <li>Set frame rate and width, or pick a Discord, Slack, or GitHub preset.</li>
        <li>Leave <strong>Loop</strong> enabled for a repeating GIF (default).</li>
        <li>Click <strong>Convert to GIF</strong>, then download the file. Nothing is uploaded.</li>
      </ol>
      <p class="mt-6">
        For chat apps, see <A href="/video-to-gif-for-discord">GIF size tips for Discord</A>. For screen recordings, see{' '}
        <A href="/make-a-gif-from-a-screen-recording">screen recording to GIF</A>.
      </p>
    </ContentPage>
  );
}