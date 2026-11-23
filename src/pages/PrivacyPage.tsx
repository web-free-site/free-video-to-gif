import { ContentPage } from './ContentPage';
import { SITE_NAME, SITE_URL } from '../site';

export function PrivacyPage() {
  return (
    <ContentPage title="Privacy policy" description={`Privacy policy for ${SITE_NAME}.`} canonicalPath="/privacy">
      <h1 class="text-3xl font-light mb-4">Privacy policy</h1>
      <p>
        <strong>Your videos stay on your device.</strong> Conversion runs locally in your browser. We do not receive,
        store, or process your media files on our servers.
      </p>
      <p class="mt-4">
        Like other sites on this network, we may use lightweight analytics (Cloudflare Web Analytics) and advertising
        scripts configured for {SITE_URL}. Those services may collect technical data such as browser type and page views
        according to their own policies.
      </p>
      <p class="mt-4">
        If you contact us through the hub or issue tracker, we receive only the information you choose to send.
      </p>
    </ContentPage>
  );
}