/**
 * Hook que extrae y normaliza todo el contenido AI de un producto.
 * Las plantillas PDP usan este hook para obtener textos, testimonios,
 * FAQ, comparación, etc. generados por la IA.
 * 
 * Si la IA generó contenido, lo devuelve. Si no, devuelve null para
 * que la plantilla use su fallback visual (pero nunca texto hardcodeado genérico).
 */

import { useMemo } from 'react';
import { Product } from '@/lib/types';

export interface AIProductData {
  title: string;
  description: string;
  tagline: string;
  badge: string;
  certification: string;
  heroHeadline: string;
  heroSubheadline: string;
  benefits: string[];
  urgency: string;
  socialProof: string;
  guarantee: string;
  ctaPrimary: string;
  ctaSecondary: string;
  closing: string;
  hook: string;
  painPoint: string;
  reveal: string;
  comparisonUs: string[];
  comparisonThem: string[];
  testimonials: { name: string; text: string; stars: number }[];
  faq: { q: string; a: string }[];
  hasAI: boolean;
}

export function useAIProduct(product: Product): AIProductData {
  return useMemo(() => {
    const ai = product.aiContent;
    const sec = ai?.sections;
    const hasAI = !!(ai && sec);

    return {
      title: ai?.enhancedTitle || product.title,
      description: ai?.enhancedDescription || product.description || '',
      tagline: ai?.tagline || '',
      badge: ai?.authority?.badgeText || '',
      certification: ai?.authority?.certification || '',
      heroHeadline: sec?.heroHeadline || '',
      heroSubheadline: sec?.heroSubheadline || ai?.tagline || '',
      benefits: sec?.benefitsBullets || [],
      urgency: sec?.urgencyText || '',
      socialProof: sec?.socialProofText || '',
      guarantee: sec?.guaranteeText || '',
      ctaPrimary: sec?.ctaPrimary || '',
      ctaSecondary: sec?.ctaSecondary || '',
      closing: sec?.closingArgument || '',
      hook: ai?.storytelling?.hook || '',
      painPoint: ai?.storytelling?.painPoint || '',
      reveal: ai?.storytelling?.reveal || '',
      comparisonUs: ai?.comparison?.us || [],
      comparisonThem: ai?.comparison?.them || [],
      testimonials: ai?.testimonials || [],
      faq: ai?.faq || [],
      hasAI,
    };
  }, [product]);
}
