import { SITE } from '@/config/site';

const priceFormatter = new Intl.NumberFormat(SITE.locale, {
  style: 'currency',
  currency: SITE.currency,
});

export function formatPrice(amount: number): string {
  return priceFormatter.format(amount);
}

export function formatVolume(ml: number): string {
  return ml >= 1000 ? `${ml / 1000} L` : `${ml} ml`;
}

export function getDiscountPercent(price: number, compareAtPrice?: number): number {
  if (!compareAtPrice || compareAtPrice <= price) return 0;
  return Math.round((1 - price / compareAtPrice) * 100);
}
