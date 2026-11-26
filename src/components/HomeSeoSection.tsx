import { HUB_GUIDE_URL, HUB_SEO_URL } from '../site';

export function HomeSeoSection() {
  return (
    <article
      class="max-w-3xl mx-auto px-4 py-8 text-left text-gray-7 text-sm leading-relaxed"
      aria-labelledby="home-guide-heading"
    >
      <h2 id="home-guide-heading" class="text-2xl text-gray-9 font-medium mb-4">
        Free video to GIF converter — how it works in your browser
      </h2>

      <p class="mb-4">
        This <strong class="font-medium text-gray-9">free video to GIF converter</strong> turns a short clip from your
        computer into an animated GIF you can post in Discord, Slack, GitHub, social media, or documentation. You choose a
        local MP4, WebM, or MOV file, trim the moment you care about, adjust frame rate and width, and download the
        result. Everything runs in the tab—no account, no queue, and no cloud upload. Browse related utilities on{' '}
        <a href={HUB_SEO_URL} class="text-blue hover:underline">
          web-free.site
        </a>{' '}
        or read the hub walkthrough{' '}
        <a href={HUB_GUIDE_URL} class="text-blue hover:underline">
          convert video to GIF free in the browser
        </a>
        .
      </p>

      <h3 class="text-lg text-gray-9 font-medium mt-6 mb-2">What this tool does</h3>
      <p class="mb-4">
        A GIF is a sequence of images shown in a loop. This converter samples frames from your video, reduces dimensions
        and colors to keep file size reasonable, and writes a standard GIF file you can save anywhere. Modern browsers can
        decode many videos with built-in APIs; when that is not enough, an optional WebAssembly decode helper (LGPL FFmpeg)
        can load on demand so you still do not send the video to a remote server. Encoding uses the modern-gif library in
        JavaScript, and you can preview timing before you export.
      </p>
      <p class="mb-4">
        Built-in presets target common sharing limits: Discord favors smaller dimensions and fewer colors; Slack and GitHub
        README layouts benefit from moderate width and frame rate so animations stay crisp without megabyte bloat. You can
        also fine-tune loop behavior, target width, and frames per second manually when you need a custom balance between
        quality and size.
      </p>

      <h3 class="text-lg text-gray-9 font-medium mt-6 mb-2">How to convert video to GIF — step by step</h3>
      <ol class="list-decimal pl-5 space-y-2 mb-4">
        <li>
          <span class="text-gray-9 font-medium">Select your video.</span> Click or drag an MP4, WebM, or MOV from your
          device. The file is read locally; nothing is uploaded.
        </li>
        <li>
          <span class="text-gray-9 font-medium">Trim the clip.</span> Use the timeline handles to keep only the seconds you
          want in the GIF. Shorter loops load faster and stay under chat upload limits.
        </li>
        <li>
          <span class="text-gray-9 font-medium">Set output options.</span> Pick width, FPS, and color settings—or choose a
          Discord, Slack, or GitHub preset if you are sharing in those places.
        </li>
        <li>
          <span class="text-gray-9 font-medium">Convert and preview.</span> Start processing and watch the preview build.
          Adjust settings if the motion feels too fast or the file looks too large.
        </li>
        <li>
          <span class="text-gray-9 font-medium">Download your GIF.</span> Save the file to your downloads folder. The export
          has no watermark; you own the output for personal or commercial use subject to the rights in your source video.
        </li>
      </ol>

      <h3 class="text-lg text-gray-9 font-medium mt-6 mb-2">Privacy and in-browser processing</h3>
      <p class="mb-4">
        Privacy is the main reason to use a browser-based converter instead of a random upload site. Your video frames are
        processed in memory on your machine. We do not receive the file contents, store them on a server, or train models on
        them. Optional decode components may download open-source WebAssembly code from a public CDN the first time you need
        them; that is software delivery, not your media. For more detail, see our{' '}
        <a href="/privacy" class="text-blue hover:underline">
          privacy policy
        </a>
        .
      </p>

      <h3 class="text-lg text-gray-9 font-medium mt-6 mb-2">Popular use cases</h3>
      <ul class="list-disc pl-5 space-y-2 mb-4">
        <li>
          <span class="text-gray-9 font-medium">Chat reactions.</span> Turn a funny moment from gameplay or a screen capture
          into a looping GIF for Discord or Slack.
        </li>
        <li>
          <span class="text-gray-9 font-medium">README and docs.</span> Illustrate a UI click path or CLI output in a GitHub
          README without linking to a heavy video file.
        </li>
        <li>
          <span class="text-gray-9 font-medium">Social posts.</span> Share a short product demo or tutorial highlight where
          autoplay video is disabled but GIFs still play inline on many platforms.
        </li>
        <li>
          <span class="text-gray-9 font-medium">Support and training.</span> Capture a reproduction step from a screen
          recording MP4 and send a lightweight GIF in email or ticketing systems with strict size caps.
        </li>
        <li>
          <span class="text-gray-9 font-medium">Memes and edits.</span> Isolate a few seconds from phone footage or exports
          from an editor, then loop them for classic reaction GIF style.
        </li>
      </ul>

      <p>
        For platform-specific tips, see our guides on{' '}
        <a href="/how-to-convert-a-video-to-gif-in-the-browser" class="text-blue hover:underline">
          converting video to GIF in the browser
        </a>
        ,{' '}
        <a href="/video-to-gif-for-discord" class="text-blue hover:underline">
          Discord size limits
        </a>
        , and{' '}
        <a href="/make-a-gif-from-a-screen-recording" class="text-blue hover:underline">
          screen recordings to GIF
        </a>
        .
      </p>
    </article>
  );
}