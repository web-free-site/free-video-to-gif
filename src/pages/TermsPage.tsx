import { ContentPage } from './ContentPage';
import { SITE_NAME } from '../site';

export function TermsPage() {
  return (
    <ContentPage title="Terms of use" description={`Terms of use for ${SITE_NAME}.`} canonicalPath="/terms">
      <h1 class="text-3xl font-light mb-4">Terms of use</h1>
      <p>
        {SITE_NAME} is provided as-is for lawful personal and commercial use. You must have the right to convert any video
        you load into the tool.
      </p>
      <p class="mt-4">
        Do not use the site to process unlawful content. We do not guarantee uninterrupted availability or perfect
        output for every file format.
      </p>
      <p class="mt-4">
        Open-source components are subject to their respective licenses (Apache-2.0 for the upstream app, MIT for
        modern-gif, LGPL for the optional FFmpeg core).
      </p>
    </ContentPage>
  );
}