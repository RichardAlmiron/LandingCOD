/**
 * Copy Engine V3 — Puente IA → Plantillas PDP
 * 
 * Responsabilidad única: transformar aiContent del producto en PowerCopy
 * que las plantillas PDP consumen.
 * 
 * NO genera copy. Solo lee lo que la IA ya generó.
 */

import { Product } from './types';

export type CopyNiche = 'TECHNICAL' | 'BEAUTY' | 'HOME' | 'GENERAL_URGENCY' | 'ELECTRONICS';

export interface PowerCopy {
  niche: CopyNiche;
  storytelling: {
    hook: string;
    painPoint: string;
    reveal: string;
  };
  authority: {
    badgeText: string;
    certification: string;
  };
  comparison: {
    us: string[];
    them: string[];
  };
  faq: { q: string; a: string }[];
}

/**
 * Extrae el PowerCopy del contenido generado por IA.
 */
export function getProductCopyPersona(product?: Product): PowerCopy {
  if (!product) {
    return getProductCopyPersona({ title: 'Producto', description: '' } as Product);
  }

  if (product.aiContent) {
    const ai = product.aiContent;
    return {
      niche: (ai.niche as CopyNiche) || 'GENERAL_URGENCY',
      storytelling: ai.storytelling || {
        hook: ai.sections?.heroHeadline || product.title,
        painPoint: ai.sections?.closingArgument || product.description,
        reveal: ai.tagline || '',
      },
      authority: ai.authority || {
        badgeText: 'CALIDAD VERIFICADA',
        certification: '',
      },
      comparison: ai.comparison || {
        us: ai.sections?.benefitsBullets?.slice(0, 3) || [],
        them: [],
      },
      faq: ai.faq || [],
    };
  }

  // La IA falló en todos los niveles — estructura mínima de emergencia
  console.error('[CopyEngine] Producto sin aiContent:', product.title);
  return {
    niche: 'GENERAL_URGENCY',
    storytelling: { hook: product.title, painPoint: product.description || '', reveal: '' },
    authority: { badgeText: 'PRODUCTO VERIFICADO', certification: '' },
    comparison: { us: [], them: [] },
    faq: [],
  };
}
