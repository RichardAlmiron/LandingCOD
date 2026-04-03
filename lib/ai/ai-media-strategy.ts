/**
 * Responsabilidad única: construir la distribución de medios
 * a partir de la respuesta de la IA y los assets del producto.
 * 
 * La IA decide en qué sección va cada video (via mediaDistribution).
 * Este módulo aplica esas decisiones y asigna labels contextuales.
 */

import { Product } from '../types';

export interface VideoPlacement {
  url: string;
  section: 'hero' | 'after-benefits' | 'before-testimonials' | 'before-faq' | 'closing';
  label: string;
}

export interface MediaStrategy {
  heroImages: string[];
  galleryImages: string[];
  featureImages: string[];
  videoPlacement: VideoPlacement[];
}

const SECTION_LABELS: Record<string, string> = {
  'hero': 'Míralo en Acción',
  'after-benefits': 'Así Funciona',
  'before-testimonials': 'Resultados Reales',
  'before-faq': 'Demostración Completa',
  'closing': 'Última Oportunidad — Míralo Antes de Decidir',
};

const SECTION_PRIORITY: string[] = [
  'after-benefits',
  'before-testimonials',
  'hero',
  'before-faq',
  'closing',
];

export function buildMediaStrategy(product: Product, aiResponse: any): MediaStrategy {
  const orig = product.original_images || [];
  const edit = product.edited_images || [];
  const vids = (product.videos || []).filter(v => v && typeof v === 'string' && v.trim());
  const md = aiResponse.mediaDistribution || {};

  // Imágenes
  const strategy: MediaStrategy = {
    heroImages: (md.heroImageIndices || [0, 1, 2]).map((i: number) => orig[i]).filter(Boolean),
    galleryImages: (md.galleryImageIndices || [0, 1, 2, 3]).map((i: number) => edit[i]).filter(Boolean),
    featureImages: (md.featureImageIndices || [0, 1]).map((i: number) => (edit[i] || orig[i])).filter(Boolean),
    videoPlacement: [],
  };

  if (strategy.heroImages.length === 0) strategy.heroImages = edit.slice(0, 3);
  if (strategy.galleryImages.length === 0) strategy.galleryImages = orig.slice(0, 4);

  // Videos — la IA puede sugerir secciones, si no, asignamos estratégicamente
  if (vids.length > 0) {
    const aiSections: string[] = md.videoSections || [];
    const usedSections = new Set<string>();

    vids.slice(0, 3).forEach((url, idx) => {
      let section = aiSections[idx];

      // Validar que la sección sugerida por la IA sea válida
      if (!section || !SECTION_LABELS[section] || usedSections.has(section)) {
        // Asignar la siguiente sección disponible por prioridad
        section = SECTION_PRIORITY.find(s => !usedSections.has(s)) || 'after-benefits';
      }

      usedSections.add(section);

      // Label personalizado de la IA o default por sección
      const aiLabel = md.videoLabels?.[idx];
      const label = (aiLabel && typeof aiLabel === 'string' && aiLabel.trim())
        ? aiLabel
        : SECTION_LABELS[section] || 'Ver Video';

      strategy.videoPlacement.push({
        url,
        section: section as VideoPlacement['section'],
        label,
      });
    });
  }

  return strategy;
}
