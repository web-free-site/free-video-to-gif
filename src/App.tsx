import { Route, Router } from '@solidjs/router';
import { Navbar } from './components/Navbar';
import { SiteFooter } from './components/SiteFooter';
import { AdSlot, useAdScripts } from './components/ads/AdSlot';
import { ConverterPage } from './pages/ConverterPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { HowToGifPage } from './pages/HowToGifPage';
import { DiscordGifPage } from './pages/DiscordGifPage';
import { ScreenRecordingGifPage } from './pages/ScreenRecordingGifPage';

function RootLayout(props: { children?: unknown }) {
  useAdScripts();
  return (
    <div class="App min-h-screen bg-gray-1">
      <Navbar />
      <AdSlot slot="header728x90" class="flex justify-center py-2 bg-white" />
      <main class="pb-8">{props.children}</main>
      <SiteFooter />
    </div>
  );
}

export default function App() {
  return (
    <Router root={RootLayout}>
      <Route path="/" component={ConverterPage} />
      <Route path="/how-to-convert-a-video-to-gif-in-the-browser" component={HowToGifPage} />
      <Route path="/video-to-gif-for-discord" component={DiscordGifPage} />
      <Route path="/make-a-gif-from-a-screen-recording" component={ScreenRecordingGifPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/privacy" component={PrivacyPage} />
      <Route path="/terms" component={TermsPage} />
      <Route path="/contact" component={ContactPage} />
    </Router>
  );
}