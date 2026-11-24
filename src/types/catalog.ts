/**
 * Modelos de dominio del catálogo.
 * Los componentes dependen de estos tipos, NO de la fuente de datos
 * (content collections hoy, una API mañana). Así cambiar el origen de los
 * datos solo afecta a `src/lib/catalog.ts`.
 */

export interface Category {
  slug: string;
  name: string;
  description: string;
  /** Color de acento usado en placeholders e ilustraciones */
  color: string;
  order: number;
}

export interface Product {
  slug: string;
  name: string;
  brand: string;
  category: Pick<Category, 'slug' | 'name' | 'color'>;
  price: number;
  /** Precio anterior, para mostrar descuentos */
  compareAtPrice?: number;
  volumeMl: number;
  /** Grado alcohólico (% vol.) */
  abv?: number;
  origin?: string;
  description: string;
  image?: string;
  tags: string[];
  featured: boolean;
  inStock: boolean;
}
