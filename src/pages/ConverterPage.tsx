import { Show, createMemo } from 'solid-js';
import { store, updateStore } from '../store';
import { FileSelector } from '../components/FileSelector';
import { OptionEditor } from '../components/OptionEditor';
import { ProcessingBar } from '../components/Processing';
import { OutputDisplay } from '../components/OutputDisplay';
import { FileSelector2 } from '../components/FileSelector2';
import { AdSlot } from '../components/ads/AdSlot';
import { JsonLdFaq, JsonLdWebApp } from '../components/JsonLd';
import { HomeSeoSection } from '../components/HomeSeoSection';
import { usePageMeta } from '../seo/usePageMeta';
import { CONVERTER_FAQ } from '../seo/converterFaq';

export function ConverterPage() {
  usePageMeta({
    title: 'Free Video to GIF Converter',
    description:
      'Convert MP4, WebM, or MOV to GIF in your browser. Trim clips, set FPS and width, use Discord presets, download with no watermark—nothing uploaded.',
    path: '/',
  });

  const output = createMemo(() => store.outputFileURL && <OutputDisplay />);

  return (
    <>
      <JsonLdWebApp />
      <JsonLdFaq faqs={[...CONVERTER_FAQ]} />
      <section class="text-center my-8 max-w-4xl mx-auto px-2">
        <h1 class="text-4xl md:text-5xl font-light my-4 text-gray-9">Free Video to GIF Converter</h1>
        <p class="text-gray-7">Pick a video from your device, trim a clip, and download a GIF. Nothing is uploaded.</p>
      </section>

      <AdSlot slot="homeTop728x90" class="flex justify-center mb-4" />

      <Show when={!store.fileInfo.url}>
        <FileSelector />
      </Show>

      {store.file && <FileSelector2 />}

      <Show when={store.fileInfo.url}>
        <div class="flex gap-4 mx-auto max-w-7xl flex-col lg:flex-row px-2">
          <div class="flex-1">
            <OptionEditor />
            <a
              href="#"
              class="mt-2 block text-slate-8 text-center hover:text-blue"
              onClick={() => updateStore({ file: null, fileInfo: { ...store.fileInfo, url: '' } })}
            >
              Choose another file…
            </a>
            <AdSlot slot="content468x60" class="flex justify-center mt-6" />
          </div>
          <div class="flex-1 flex flex-col gap-2">
            <aside class="hidden lg:block">
              <AdSlot slot="sidebar160x600" class="flex justify-center" />
              <AdSlot slot="sidebar160x300" class="flex justify-center mt-4" />
            </aside>
            <ProcessingBar />
            {output()}
          </div>
        </div>
      </Show>

      <AdSlot slot="betweenToolContent728x90" class="flex justify-center my-8" />
      <AdSlot slot="content300x250" class="flex justify-center my-6" />

      <HomeSeoSection />

      <section class="max-w-3xl mx-auto px-4 py-8 text-left text-gray-7 text-sm" aria-labelledby="faq-heading">
        <h2 id="faq-heading" class="text-xl text-gray-9 font-medium mb-4">
          Frequently asked questions
        </h2>
        <dl class="space-y-4">
          {CONVERTER_FAQ.map(f => (
            <>
              <dt class="font-medium text-gray-9">{f.question}</dt>
              <dd>{f.answer}</dd>
            </>
          ))}
        </dl>
      </section>

      <AdSlot slot="mobileSticky320x50" class="ad-mobile-sticky lg:hidden" />
    </>
  );
}