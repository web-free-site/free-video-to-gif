import { ContentPage } from './ContentPage';
import { A } from '@solidjs/router';

export function ScreenRecordingGifPage() {
  return (
    <ContentPage
      title="Make a GIF from a screen recording"
      description="Turn a local screen-recording MP4 or WebM into a GIF: trim, lower FPS, resize width."
      canonicalPath="/make-a-gif-from-a-screen-recording"
    >
      <h1 class="text-3xl font-light mb-4">Make a GIF from a screen recording</h1>
      <p>
        Save your screen recording as a local file (for example MP4 or WebM from your OS or our{' '}
        <a href="https://free-screen-recorder.web-free.site/?ref=video-to-gif">Free Screen Recorder</a>), then open it in
        the <A href="/">Free Video to GIF Converter</A>.
      </p>
      <ul class="list-disc pl-5 mt-4 space-y-2">
        <li>Trim to only the action you need—screen recordings are often long and high resolution.</li>
        <li>Use 10–15 FPS; full 30 FPS screen captures create huge GIFs.</li>
        <li>Limit width to 480–600 px unless you need full detail.</li>
        <li>Enable loop for repeating UI demos (default).</li>
      </ul>
    </ContentPage>
  );
}