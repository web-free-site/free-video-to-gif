import { onCleanup, onMount } from 'solid-js';
import { SITE_NAME, SITE_URL } from '../site';

export function usePageMeta(opts: { title: string; description: string; path: string }) {
  onMount(() => {
    const url = opts.path === '/' ? `${SITE_URL}/` : `${SITE_URL}${opts.path}`;
    const prevTitle = document.title;
    document.title = opts.title.includes(SITE_NAME) ? opts.title : `${opts.title} — ${SITE_NAME}`;

    const setMeta = (name: string, content: string, isProperty = false) => {
      const sel = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let el = document.querySelector(sel) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        if (isProperty) el.setAttribute('property', name);
        else el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    setMeta('description', opts.description);
    setMeta('og:title', document.title, true);
    setMeta('og:description', opts.description, true);
    setMeta('og:url', url, true);

    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = url;

    onCleanup(() => {
      document.title = prevTitle;
    });
  });
}