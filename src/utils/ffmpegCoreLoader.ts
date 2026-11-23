/**
 * Loads the LGPL single-threaded ffmpeg.wasm core at runtime (never bundled in Worker assets).
 */
import { toBlobURL } from '@ffmpeg/util';

export interface FfmpegCoreManifest {
  license: string;
  description: string;
  coreJsUrl: string;
  coreWasmUrl: string;
  wasmBytes?: number;
  fallbackWasmBytes?: number;
}

const CACHE_NAME = 'free-video-to-gif-ffmpeg-core-v1';
const MANIFEST_URL = '/ffmpeg-core.json';

let manifestPromise: Promise<FfmpegCoreManifest> | null = null;

export async function loadFfmpegCoreManifest(): Promise<FfmpegCoreManifest> {
  if (!manifestPromise) {
    manifestPromise = fetch(MANIFEST_URL, { cache: 'no-cache' }).then(r => {
      if (!r.ok) throw new Error(`Could not load ${MANIFEST_URL}`);
      return r.json() as Promise<FfmpegCoreManifest>;
    });
  }
  return manifestPromise;
}

async function fetchWithCache(
  url: string,
  mime: string,
  onProgress?: (loaded: number, total?: number) => void,
): Promise<string> {
  if (typeof caches !== 'undefined') {
    try {
      const cache = await caches.open(CACHE_NAME);
      const cached = await cache.match(url);
      if (cached) {
        const blob = await cached.blob();
        onProgress?.(blob.size, blob.size);
        return URL.createObjectURL(blob);
      }
    } catch {
      /* ignore */
    }
  }

  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch FFmpeg core (${response.status}): ${url}`);

  const total = Number(response.headers.get('content-length')) || undefined;
  const blob = await response.blob();
  onProgress?.(blob.size, total ?? blob.size);
  const blobUrl = URL.createObjectURL(blob);
  try {
    const cache = await caches.open(CACHE_NAME);
    await cache.put(url, new Response(blob, { headers: { 'Content-Type': mime } }));
  } catch {
    /* ignore */
  }
  return blobUrl;
}

export type CoreLoadProgress = (loaded: number, total?: number, phase?: 'manifest' | 'js' | 'wasm') => void;

export async function resolveFfmpegCoreUrls(onProgress?: CoreLoadProgress): Promise<{
  coreURL: string;
  wasmURL: string;
  manifest: FfmpegCoreManifest;
}> {
  onProgress?.(0, undefined, 'manifest');
  const manifest = await loadFfmpegCoreManifest();
  const estimated = manifest.wasmBytes ?? manifest.fallbackWasmBytes;

  const coreURL = await fetchWithCache(manifest.coreJsUrl, 'text/javascript', (loaded, total) =>
    onProgress?.(loaded, total, 'js'),
  );
  const wasmURL = await toBlobURL(manifest.coreWasmUrl, 'application/wasm');
  onProgress?.(estimated ?? 0, estimated, 'wasm');

  return { coreURL, wasmURL, manifest };
}