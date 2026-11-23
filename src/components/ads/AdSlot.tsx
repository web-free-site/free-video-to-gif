import { Show, createMemo, createSignal, onCleanup, onMount } from 'solid-js';

type BannerDef = { key: string; width: number; height: number };

type AdsConfig = {
  enabled: boolean;
  bannerScriptBase?: string;
  socialBar?: string;
  popunder?: string;
  nativeBanner?: { src: string; containerId: string };
  smartlink?: { url: string; label?: string };
  banners?: Record<string, BannerDef>;
  slots?: Record<string, string>;
};

const DEFAULT_BANNER_BASE = 'https://bauval.org/22';

let adsCache: AdsConfig | null = null;

async function loadAds(): Promise<AdsConfig> {
  if (adsCache) return adsCache;
  try {
    const res = await fetch('/ads.json');
    adsCache = (await res.json()) as AdsConfig;
  } catch {
    adsCache = { enabled: false };
  }
  return adsCache;
}

function bannerIframeSrcDoc(key: string, width: number, height: number, scriptBase: string): string {
  const atOptions = JSON.stringify({ key, format: 'iframe', height, width, params: {} });
  const src = `${scriptBase.replace(/\/$/, '')}/${key}`;
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="referrer" content="no-referrer-when-downgrade"></head><body style="margin:0;padding:0;overflow:hidden;background:transparent"><script type="text/javascript">var atOptions = ${atOptions};</script><script type="text/javascript" src="${src}"><\/script></body></html>`;
}

export type AdSlotName =
  | 'header728x90'
  | 'homeTop728x90'
  | 'betweenToolContent728x90'
  | 'sidebar160x600'
  | 'sidebar160x300'
  | 'mobileSticky320x50'
  | 'nativeBelowResult'
  | 'content468x60'
  | 'content300x250';

function injectScript(src: string, marker: string, target: HTMLElement) {
  if (!src || document.querySelector(`script[data-ad="${marker}"]`)) return;
  const s = document.createElement('script');
  s.src = src;
  s.async = true;
  s.setAttribute('data-cfasync', 'false');
  s.setAttribute('data-ad', marker);
  target.appendChild(s);
}

export function useAdScripts() {
  onMount(() => {
    loadAds().then(cfg => {
      if (!cfg.enabled) return;
      if (cfg.popunder) injectScript(cfg.popunder, 'popunder', document.head);
      if (cfg.socialBar) injectScript(cfg.socialBar, 'social-bar', document.body);
    });
  });
}

function NativeBanner(props: { cfg: { src: string; containerId: string }; class?: string; label?: string }) {
  onMount(() => {
    injectScript(props.cfg.src, `native-${props.cfg.containerId}`, document.body);
  });
  return (
    <aside class={props.class} aria-label={props.label ?? 'Advertisement'} data-ad-slot="nativeBelowResult">
      <div id={props.cfg.containerId} />
    </aside>
  );
}

export function AdSlot(props: { slot: AdSlotName; class?: string; label?: string }) {
  const [cfg, setCfg] = createSignal<AdsConfig | null>(null);

  onMount(() => {
    let active = true;
    loadAds().then(loaded => {
      if (active) setCfg(loaded);
    });
    onCleanup(() => {
      active = false;
    });
  });

  const mapped = createMemo(() => {
    const c = cfg();
    if (!c?.enabled) return null;
    return c.slots?.[props.slot] ?? props.slot;
  });

  const bannerDef = createMemo(() => {
    const c = cfg();
    const m = mapped();
    if (!c || !m || m === 'nativeBanner') return null;
    return c.banners?.[m] ?? null;
  });

  const native = createMemo(() => cfg()?.nativeBanner);

  return (
    <Show when={cfg()?.enabled}>
      <Show
        when={mapped() === 'nativeBanner' || props.slot === 'nativeBelowResult'}
        fallback={
          <Show when={bannerDef()}>
            {def => (
              <aside class={`ad-slot ${props.class ?? ''}`} aria-label={props.label ?? 'Advertisement'} data-ad-slot={props.slot}>
                <iframe
                  title={`Advertisement ${props.slot}`}
                  width={def().width}
                  height={def().height}
                  style={{
                    border: '0',
                    display: 'block',
                    'max-width': '100%',
                    margin: '0 auto',
                    background: 'transparent',
                  }}
                  sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox"
                  referrerpolicy="no-referrer-when-downgrade"
                  srcdoc={bannerIframeSrcDoc(
                    def().key,
                    def().width,
                    def().height,
                    cfg()!.bannerScriptBase || DEFAULT_BANNER_BASE,
                  )}
                />
              </aside>
            )}
          </Show>
        }
      >
        <Show when={native()?.src && native()?.containerId}>
          {n => <NativeBanner cfg={n()!} class={props.class} label={props.label} />}
        </Show>
      </Show>
    </Show>
  );
}

export function SponsoredSmartlink(props: { class?: string }) {
  const [cfg, setCfg] = createSignal<AdsConfig | null>(null);
  onMount(() => loadAds().then(setCfg));
  const link = () => cfg()?.smartlink;
  return (
    <Show when={cfg()?.enabled && link()?.url}>
      {l => (
        <p class={props.class}>
          <a href={l().url} rel="sponsored noopener noreferrer" target="_blank">
            {l().label ?? 'Sponsored'}
          </a>
        </p>
      )}
    </Show>
  );
}