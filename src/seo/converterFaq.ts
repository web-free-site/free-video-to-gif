export const CONVERTER_FAQ = [
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
] as const;