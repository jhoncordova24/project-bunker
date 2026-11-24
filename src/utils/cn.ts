import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/**
 * tailwind-merge necesita conocer los tokens propios de `@theme`
 * (src/styles/global.css) para no confundirlos, p. ej. `text-hero`
 * (tamaño) con `text-accent` (color).
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ['hero'],
      tracking: ['label', 'eyebrow', 'ultra'],
      shadow: ['elevated'],
      container: ['site'],
      breakpoint: ['xs'],
    },
  },
});

/**
 * Combina clases condicionales (clsx) y resuelve conflictos de Tailwind,
 * de modo que una clase pasada por props sobrescriba a la clase base del
 * componente: cn('px-4', 'px-6') -> 'px-6'.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
