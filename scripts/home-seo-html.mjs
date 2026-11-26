/** Static HTML mirror of HomeSeoSection for crawlers (keep in sync with src/components/HomeSeoSection.tsx). */

const HUB_SEO_URL = 'https://web-free.site/?ref=free-video-to-gif';
const HUB_GUIDE_URL = 'https://web-free.site/guides/video-to-gif-converter-free/';

export const HOME_FAQ = [
  {
    question: 'Does this tool upload my video?',
    answer:
      'No. The file stays on your device. Frames are decoded and encoded locally in your browser, so your clip never passes through our servers.',
  },
  {
    question: 'Which video formats can I convert to GIF?',
    answer:
      'Common local files such as MP4, WebM, and MOV work in most modern browsers. If your browser cannot decode a format, an optional LGPL FFmpeg fallback may load from a CDN to help read the file—still without uploading it.',
  },
  {
    question: 'Is there a watermark on the exported GIF?',
    answer: 'No. Downloaded GIFs are watermark-free. The converter does not add logos, text, or branding to your animation.',
  },
  {
    question: 'What are the Discord, Slack, and GitHub presets for?',
    answer:
      'They apply sensible width, frame rate, and color limits so your GIF is easier to share in chat apps or README files without blowing past upload size limits.',
  },
  {
    question: 'How do I make a smaller GIF for faster loading?',
    answer:
      'Trim the clip to only the action you need, lower the output width, reduce frames per second, and use fewer colors in the palette. The Discord preset is a good starting point when you need a compact file.',
  },
];

export function homeSeoArticleHtml() {
  return `<article id="home-seo-article" aria-labelledby="home-guide-heading">
  <h2 id="home-guide-heading">Free video to GIF converter — how it works in your browser</h2>
  <p>This <strong>free video to GIF converter</strong> turns a short clip from your computer into an animated GIF you can post in Discord, Slack, GitHub, social media, or documentation. You choose a local MP4, WebM, or MOV file, trim the moment you care about, adjust frame rate and width, and download the result. Everything runs in the tab—no account, no queue, and no cloud upload. Browse related utilities on <a href="${HUB_SEO_URL}">web-free.site</a> or read the hub walkthrough <a href="${HUB_GUIDE_URL}">convert video to GIF free in the browser</a>.</p>
  <h3>What this tool does</h3>
  <p>A GIF is a sequence of images shown in a loop. This converter samples frames from your video, reduces dimensions and colors to keep file size reasonable, and writes a standard GIF file you can save anywhere. Modern browsers can decode many videos with built-in APIs; when that is not enough, an optional WebAssembly decode helper (LGPL FFmpeg) can load on demand so you still do not send the video to a remote server. Encoding uses the modern-gif library in JavaScript, and you can preview timing before you export.</p>
  <p>Built-in presets target common sharing limits: Discord favors smaller dimensions and fewer colors; Slack and GitHub README layouts benefit from moderate width and frame rate so animations stay crisp without megabyte bloat. You can also fine-tune loop behavior, target width, and frames per second manually when you need a custom balance between quality and size.</p>
  <h3>How to convert video to GIF — step by step</h3>
  <ol>
    <li><strong>Select your video.</strong> Click or drag an MP4, WebM, or MOV from your device. The file is read locally; nothing is uploaded.</li>
    <li><strong>Trim the clip.</strong> Use the timeline handles to keep only the seconds you want in the GIF. Shorter loops load faster and stay under chat upload limits.</li>
    <li><strong>Set output options.</strong> Pick width, FPS, and color settings—or choose a Discord, Slack, or GitHub preset if you are sharing in those places.</li>
    <li><strong>Convert and preview.</strong> Start processing and watch the preview build. Adjust settings if the motion feels too fast or the file looks too large.</li>
    <li><strong>Download your GIF.</strong> Save the file to your downloads folder. The export has no watermark; you own the output for personal or commercial use subject to the rights in your source video.</li>
  </ol>
  <h3>Privacy and in-browser processing</h3>
  <p>Privacy is the main reason to use a browser-based converter instead of a random upload site. Your video frames are processed in memory on your machine. We do not receive the file contents, store them on a server, or train models on them. Optional decode components may download open-source WebAssembly code from a public CDN the first time you need them; that is software delivery, not your media. For more detail, see our <a href="/privacy/">privacy policy</a>.</p>
  <h3>Popular use cases</h3>
  <ul>
    <li><strong>Chat reactions.</strong> Turn a funny moment from gameplay or a screen capture into a looping GIF for Discord or Slack.</li>
    <li><strong>README and docs.</strong> Illustrate a UI click path or CLI output in a GitHub README without linking to a heavy video file.</li>
    <li><strong>Social posts.</strong> Share a short product demo or tutorial highlight where autoplay video is disabled but GIFs still play inline on many platforms.</li>
    <li><strong>Support and training.</strong> Capture a reproduction step from a screen recording MP4 and send a lightweight GIF in email or ticketing systems with strict size caps.</li>
    <li><strong>Memes and edits.</strong> Isolate a few seconds from phone footage or exports from an editor, then loop them for classic reaction GIF style.</li>
  </ul>
  <p>For platform-specific tips, see our guides on <a href="/how-to-convert-a-video-to-gif-in-the-browser/">converting video to GIF in the browser</a>, <a href="/video-to-gif-for-discord/">Discord size limits</a>, and <a href="/make-a-gif-from-a-screen-recording/">screen recordings to GIF</a>.</p>
</article>`;
}

export function homeFaqHtml() {
  const items = HOME_FAQ.map(
    f => `<dt>${f.question}</dt><dd>${f.answer}</dd>`,
  ).join('');
  return `<section aria-labelledby="faq-heading"><h2 id="faq-heading">Frequently asked questions</h2><dl>${items}</dl></section>`;
}

export function homeFaqJsonLd() {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: HOME_FAQ.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  });
}