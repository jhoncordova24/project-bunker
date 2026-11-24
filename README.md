# El Bunker – Licorería

Sitio web de **El Bunker**, hecho con [Astro](https://astro.build). Por ahora es solo frontend (sitio estático), preparado para crecer hacia backend, carrito o pagos.

## Requisitos

- Node.js **≥ 22.23.4**

## Comandos

| Comando           | Acción                                          |
| ----------------- | ----------------------------------------------- |
| `npm install`     | Instala dependencias                            |
| `npm run dev`     | Servidor de desarrollo en `localhost:4321`      |
| `npm run build`   | Genera el sitio en `./dist/`                    |
| `npm run preview` | Sirve el build localmente                       |
| `npm run check`   | Revisa tipos (TypeScript + Astro)               |
| `npm run format`  | Formatea el código con Prettier                 |

## Estructura

```
src/
├── components/
│   ├── ui/          # Piezas genéricas: Button, Badge, Container, Icon, Breadcrumbs...
│   ├── layout/      # Header, Footer, Logo, AgeGate (verificación +18)
│   ├── product/     # ProductCard, ProductGrid, ProductImage, CategoryCard, CategoryFilter...
│   └── sections/    # Bloques de la home: Hero, Features, FeaturedProducts...
├── config/site.ts   # Datos del negocio: nombre, contacto, WhatsApp, horario, redes, moneda
├── data/            # Datos del catálogo (JSON): categories.json, products.json
├── layouts/         # BaseLayout (SEO, head) y PageLayout (páginas internas)
├── lib/catalog.ts   # Capa de acceso a datos (único punto que conoce el origen)
├── pages/           # Rutas: /, /catalogo, /catalogo/[categoria], /producto/[slug], /nosotros, /contacto, 404
├── styles/          # global.css: Tailwind CSS v4 + design tokens (@theme)
├── types/           # Modelos de dominio (Product, Category)
├── utils/           # Formato de precios/volumen, enlaces de WhatsApp
└── content.config.ts # Esquemas (Zod) de las colecciones
```

Alias de importación: `@/` → `src/` (ej. `import { SITE } from '@/config/site'`).

## Tareas comunes

- **Cambiar datos del negocio** (teléfono, WhatsApp, dirección, horario, redes, moneda): `src/config/site.ts`.
- **Agregar un producto**: añade un objeto en `src/data/products.json`. El `id` es la URL (`/producto/<id>`) y `category` debe ser el `id` de una categoría existente. El esquema se valida al compilar.
- **Imágenes de productos**: guárdalas en `public/images/products/` y usa `"image": "/images/products/archivo.webp"`. Sin imagen se muestra una botella ilustrada con el color de la categoría.
- **Colores y tipografía**: tokens en el bloque `@theme` de `src/styles/global.css` (Tailwind CSS v4). Cada token genera sus utilidades, p. ej. `--color-accent` → `bg-accent`, `text-accent`. Para combinar clases en componentes usa `cn()` (`src/utils/cn.ts`).

## Cómo escalar

- **Backend / API**: reimplementa las funciones de `src/lib/catalog.ts` con `fetch` a la API, manteniendo las firmas. Los componentes usan los tipos de `src/types/catalog.ts`, no la fuente de datos, así que no hay que tocarlos.
- **Render en servidor (SSR)**: cambia `output` en `astro.config.mjs` y añade un adapter (`npx astro add node` / `vercel` / `netlify`).
- **Carrito / interactividad**: añade un framework de UI (`npx astro add react` o `preact`) y crea islas en `src/components/`. Para estado compartido, [nanostores](https://github.com/nanostores/nanostores) encaja bien con Astro.
- **SEO**: `npx astro add sitemap` y define `PUBLIC_SITE_URL` en `.env` (ver `.env.example`).
