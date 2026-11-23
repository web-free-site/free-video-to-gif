import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import UnoCSS from 'unocss/vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    UnoCSS(),
    solidPlugin(),
    viteStaticCopy({
      targets: [{ src: './LICENSE', dest: './' }],
    }),
  ],
  server: {
    port: 3000,
  },
  base: '/',
  build: {
    target: 'esnext',
  },
});