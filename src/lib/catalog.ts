/**
 * Capa de acceso a datos del catálogo.
 *
 * Es el ÚNICO lugar que sabe de dónde vienen los productos. Hoy usa
 * content collections (JSON locales). Cuando exista backend, basta con
 * reimplementar estas funciones con `fetch` a la API manteniendo las firmas.
 */
import { getCollection, type CollectionEntry } from 'astro:content';
import type { Category, Product } from '@/types/catalog';

function toCategory(entry: CollectionEntry<'categories'>): Category {
  return { slug: entry.id, ...entry.data };
}

function toProduct(entry: CollectionEntry<'products'>, categories: Map<string, Category>): Product {
  const { category: ref, ...data } = entry.data;
  const category = categories.get(ref.id);
  if (!category) {
    throw new Error(`Producto "${entry.id}" referencia una categoría inexistente: "${ref.id}"`);
  }
  return {
    slug: entry.id,
    ...data,
    category: { slug: category.slug, name: category.name, color: category.color },
  };
}

export async function getCategories(): Promise<Category[]> {
  const entries = await getCollection('categories');
  return entries.map(toCategory).sort((a, b) => a.order - b.order);
}

export async function getCategory(slug: string): Promise<Category | undefined> {
  return (await getCategories()).find((c) => c.slug === slug);
}

export async function getProducts(): Promise<Product[]> {
  const [entries, categories] = await Promise.all([getCollection('products'), getCategories()]);
  const bySlug = new Map(categories.map((c) => [c.slug, c]));
  return entries.map((e) => toProduct(e, bySlug));
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  return (await getProducts()).find((p) => p.slug === slug);
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  return (await getProducts()).filter((p) => p.category.slug === categorySlug);
}

export async function getFeaturedProducts(limit = 4): Promise<Product[]> {
  return (await getProducts()).filter((p) => p.featured).slice(0, limit);
}

export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  return (await getProductsByCategory(product.category.slug))
    .filter((p) => p.slug !== product.slug)
    .slice(0, limit);
}
