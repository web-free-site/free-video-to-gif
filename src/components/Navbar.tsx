import { A } from '@solidjs/router';
import { SITE_NAME } from '../site';

const links = [
  { href: '/', label: 'Converter', end: true },
  { href: '/how-to-convert-a-video-to-gif-in-the-browser', label: 'How-to' },
  { href: '/about', label: 'About' },
];

export function Navbar() {
  return (
    <nav class="sticky top-0 z-20 border-b border-gray-3 bg-white/90 backdrop-blur-md">
      <div class="max-w-6xl mx-auto flex items-center justify-between px-4 py-3 gap-2">
        <A href="/" class="font-bold text-gray-9 text-lg shrink-0">
          {SITE_NAME}
        </A>
        <div class="flex flex-wrap justify-end gap-1">
          {links.map(l => (
            <A
              href={l.href}
              end={l.end}
              class="px-3 py-1.5 rounded-full text-sm text-gray-7 hover:bg-gray-2"
              activeClass="bg-blue-1 text-blue-8 font-medium"
              inactiveClass=""
            >
              {l.label}
            </A>
          ))}
        </div>
      </div>
    </nav>
  );
}