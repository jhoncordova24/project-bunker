// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { loadEnv } from 'vite';

const env = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '');

// https://astro.build/config
export default defineConfig({
  // URL pública del sitio (canonical, Open Graph, sitemap). Se define en .env.
  site: env.PUBLIC_SITE_URL || 'https://bunkerlicoreria.netlify.app',
  // Salida estática por ahora. Cuando haya backend se puede pasar a 'server'
  // añadiendo un adapter (@astrojs/node, @astrojs/vercel, etc.).
  output: 'static',
  trailingSlash: 'ignore',
  // Precarga en segundo plano todas las rutas internas en cuanto sus enlaces
  // entran en pantalla: al hacer clic el HTML ya está en caché y el cambio de
  // página es inmediato (el sitio es pequeño, así que el coste es mínimo).
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
