/**
 * Responsabilidad única: construir la distribución de medios
 * a partir de la respuesta de la IA y los assets del producto.
 */

import { Product } from '../types';

export interface MediaStrategy {
  heroImages: string[];
  galleryImages: string[];
  featureImages: string[];
  videoPlacement: Array<{ url: string; section: string; label: string }>;
}

export function buildMediaStrategy(product: Product, aiResponse: any): MediaStrategy {
  const orig = product.original_images || [];
  const edit = product.edited_images || [];
  const vids = product.videos || [];
  const md = aiResponse.mediaDistribution || {};

  const strategy: MediaStrategy = {
    heroImages: (md.heroImageIndices || [0, 1, 2]).map((i: number) => orig[i]).filter(Boolean),
    galleryImages: (md.galleryImageIndices || [0, 1, 2, 3]).map((i: number) => edit[i]).filter(Boolean),
    featureImages: (md.featureImageIndices || [0, 1]).map((i: number) => (edit[i] || orig[i])).filter(Boolean),
    videoPlacement: vids.slice(0, 3).map((url, idx) => ({
      url,
      section: md.videoSections?.[idx] || 'demo',
      label: idx === 0 ? 'Ver Demostración' : idx === 1 ? 'Características' : 'Resultados Reales',
    })),
  };

  if (strategy.heroImages.length === 0) strategy.heroImages = edit.slice(0, 3);
  if (strategy.galleryImages.length === 0) strategy.galleryImages = orig.slice(0, 4);

  return strategy;
}
