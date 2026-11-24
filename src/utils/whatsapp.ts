import { SITE } from '@/config/site';
import type { Product } from '@/types/catalog';
import { formatPrice, formatVolume } from './format';

export function buildWhatsAppLink(message?: string): string {
  const base = `https://wa.me/${SITE.contact.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function buildProductOrderLink(product: Product): string {
  return buildWhatsAppLink(
    `Hola ${SITE.name}, quiero pedir: ${product.name} (${formatVolume(product.volumeMl)}) – ${formatPrice(product.price)}`,
  );
}
