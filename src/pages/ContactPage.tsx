import { ContentPage } from './ContentPage';
import { HUB_URL, SITE_NAME } from '../site';

export function ContactPage() {
  return (
    <ContentPage title="Contact" description={`Contact the maintainers of ${SITE_NAME}.`} canonicalPath="/contact">
      <h1 class="text-3xl font-light mb-4">Contact</h1>
      <p>
        For questions about this converter, use the feedback options on{' '}
        <a href={HUB_URL}>web-free.site</a> or open an issue in the{' '}
        <a href="https://github.com/web-free-site/free-video-to-gif" rel="noopener noreferrer" target="_blank">
          GitHub repository
        </a>
        .
      </p>
    </ContentPage>
  );
}