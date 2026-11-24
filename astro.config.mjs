// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { loadEnv } from 'vite';

const env = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '');

// https://astro.build/config
export default defineConfig({
  // URL pública del sitio (canonical, Open Graph, sitemap). Se define en .env.
  site: env.PUBLIC_SITE_URL || 'https://elbunker.example',
  // Salida estática por ahora. Cuando haya backend se puede pasar a 'server'
  // añadiendo un adapter (@astrojs/node, @astrojs/vercel, etc.).
  output: 'static',
  trailingSlash: 'ignore',
  vite: {
    plugins: [tailwindcss()],
  },
});
