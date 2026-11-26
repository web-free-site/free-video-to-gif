import { onCleanup, onMount } from 'solid-js';
import { SITE_NAME, SITE_URL } from '../site';

const SCRIPT_ID = 'app-json-ld';

export function JsonLdWebApp() {
  onMount(() => {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: SITE_NAME,
      url: SITE_URL,
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'Web browser',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description:
        'Convert local MP4, WebM, and MOV videos to GIF in your browser. Trim clips, set FPS and width, download without watermark.',
      browserRequirements: 'Requires JavaScript. Optional WebAssembly decode fallback uses LGPL FFmpeg.',
    };
    let el = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (!el) {
      el = document.createElement('script');
      el.id = SCRIPT_ID;
      el.type = 'application/ld+json';
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(data);
    onCleanup(() => el?.remove());
  });
  return null;
}

export function JsonLdFaq(props: { faqs: { question: string; answer: string }[] }) {
  onMount(() => {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: props.faqs.map(f => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    };
    const id = document.getElementById('static-faq-json-ld') ? 'static-faq-json-ld' : 'faq-json-ld';
    let el = document.getElementById(id) as HTMLScriptElement | null;
    if (!el) {
      el = document.createElement('script');
      el.id = id;
      el.type = 'application/ld+json';
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(data);
    onCleanup(() => el?.remove());
  });
  return null;
}