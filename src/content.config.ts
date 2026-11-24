import { defineCollection, reference } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Colecciones de contenido. Hoy leen JSON locales; en el futuro el loader
 * puede reemplazarse por uno que consulte una API/CMS sin tocar los componentes.
 */

const categories = defineCollection({
  loader: file('src/data/categories.json'),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    color: z.string(),
    order: z.number().int().default(0),
  }),
});

const products = defineCollection({
  loader: file('src/data/products.json'),
  schema: z.object({
    name: z.string(),
    brand: z.string(),
    category: reference('categories'),
    price: z.number().positive(),
    compareAtPrice: z.number().positive().optional(),
    volumeMl: z.number().int().positive(),
    abv: z.number().min(0).max(100).optional(),
    origin: z.string().optional(),
    description: z.string(),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    inStock: z.boolean().default(true),
  }),
});

export const collections = { categories, products };
