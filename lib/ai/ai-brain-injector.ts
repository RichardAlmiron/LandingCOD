/**
 * AI Brain Injector — "cerebro.ts"
 * 
 * Responsabilidad: recorrer el DOM de una página PDP renderizada en un iframe,
 * identificar TODOS los elementos de texto visibles, y reemplazarlos con el
 * contenido generado por la IA.
 * 
 * Flujo:
 * 1. Recibe el documento del iframe + el aiContent del producto
 * 2. Identifica secciones por su posición en la página (hero, mid, bottom)
 * 3. Mapea cada texto visible a un campo del aiContent
 * 4. Reemplaza TODO el texto — no deja nada del contenido original
 * 
 * NO toca: estilos, layout, imágenes (eso lo maneja la media strategy)
 * SÍ toca: todo texto visible, headings, párrafos, botones, badges, FAQs, testimonios
 */

import { Product } from '../types';

interface AIContent {
  enhancedTitle: string;
  enhancedDescription: string;
  tagline: string;
  storytelling: { hook: string; painPoint: string; reveal: string };
  authority: { badgeText: string; certification: string };
  comparison: { us: string[]; them: string[] };
  faq: { q: string; a: string }[];
  testimonials?: { name: string; text: string; stars: number }[];
  sections: {
    heroHeadline: string;
    heroSubheadline: string;
    benefitsBullets: string[];
    urgencyText: string;
    socialProofText: string;
    guaranteeText: string;
    ctaPrimary: string;
    ctaSecondary: string;
    closingArgument: string;
  };
}

// Tags que contienen texto editable
const TEXT_TAGS = new Set(['H1','H2','H3','H4','H5','H6','P','SPAN','A','BUTTON','LI','LABEL','STRONG','EM','B','I','SMALL','BLOCKQUOTE','FIGCAPTION','TD','TH','DT','DD']);

// Elementos a ignorar
const SKIP_SELECTORS = [
  'script', 'style', 'noscript', 'svg', 'path', 'circle', 'rect', 'line',
  'input', 'textarea', 'select', 'option', 'img', 'video', 'source', 'iframe',
  '[data-ve-product]', '.ve-unsaved-badge', '[data-ve-badge-for]',
  'nav', 'header nav', 'footer',
];

function isVisible(el: HTMLElement, win: Window): boolean {
  const style = win.getComputedStyle(el);
  return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0' && el.offsetHeight > 0;
}

function getDirectText(el: HTMLElement): string {
  let text = '';
  el.childNodes.forEach(node => {
    if (node.nodeType === Node.TEXT_NODE) {
      text += node.textContent || '';
    }
  });
  return text.trim();
}

/**
 * Recopila todos los elementos de texto visibles del documento,
 * clasificados por su posición vertical en la página.
 */
function collectTextElements(doc: Document, win: Window): HTMLElement[] {
  const elements: HTMLElement[] = [];
  const skipSelector = SKIP_SELECTORS.join(', ');

  const walker = doc.createTreeWalker(doc.body, NodeFilter.SHOW_ELEMENT, {
    acceptNode(node) {
      const el = node as HTMLElement;
      if (el.matches(skipSelector)) return NodeFilter.FILTER_REJECT;
      if (!TEXT_TAGS.has(el.tagName)) return NodeFilter.FILTER_SKIP;
      return NodeFilter.FILTER_ACCEPT;
    }
  });

  let node: Node | null;
  while ((node = walker.nextNode())) {
    const el = node as HTMLElement;
    const text = getDirectText(el);
    // Solo elementos con texto real (más de 2 chars, no solo espacios/números)
    if (text.length > 2 && /[a-záéíóúñ]/i.test(text) && isVisible(el, win)) {
      elements.push(el);
    }
  }

  return elements;
}

/**
 * Clasifica elementos por zona vertical de la página.
 */
function classifyByZone(elements: HTMLElement[]): { hero: HTMLElement[]; mid: HTMLElement[]; bottom: HTMLElement[] } {
  if (elements.length === 0) return { hero: [], mid: [], bottom: [] };

  const totalHeight = Math.max(
    ...elements.map(el => el.getBoundingClientRect().bottom + (el.ownerDocument.defaultView?.scrollY || 0))
  );

  const heroThreshold = totalHeight * 0.2;
  const midThreshold = totalHeight * 0.65;

  const hero: HTMLElement[] = [];
  const mid: HTMLElement[] = [];
  const bottom: HTMLElement[] = [];

  elements.forEach(el => {
    const top = el.getBoundingClientRect().top + (el.ownerDocument.defaultView?.scrollY || 0);
    if (top < heroThreshold) hero.push(el);
    else if (top < midThreshold) mid.push(el);
    else bottom.push(el);
  });

  return { hero, mid, bottom };
}

/**
 * Reemplaza el texto de un elemento preservando los hijos no-texto.
 */
function replaceText(el: HTMLElement, newText: string): void {
  // Si el elemento solo tiene texto directo (sin hijos complejos), reemplazar directamente
  const hasOnlyText = Array.from(el.childNodes).every(
    n => n.nodeType === Node.TEXT_NODE || (n.nodeType === Node.ELEMENT_NODE && (n as HTMLElement).tagName === 'BR')
  );

  if (hasOnlyText) {
    el.textContent = newText;
  } else {
    // Reemplazar solo los nodos de texto, preservar hijos
    el.childNodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE && (node.textContent || '').trim().length > 2) {
        node.textContent = newText;
      }
    });
  }
}

/**
 * FUNCIÓN PRINCIPAL: Inyecta todo el contenido de la IA en el DOM del iframe.
 * Recorre cada zona de la página y asigna el contenido correspondiente.
 */
export function injectAIContent(doc: Document, win: Window, product: Product): number {
  const ai = product.aiContent as AIContent | undefined;
  if (!ai || !ai.sections) return 0;

  const sec = ai.sections;
  const allElements = collectTextElements(doc, win);
  if (allElements.length === 0) return 0;

  const zones = classifyByZone(allElements);
  let replaced = 0;

  // ── HERO ZONE (top 20%) ──
  const heroTexts = [
    ai.authority?.badgeText,
    ai.enhancedTitle,
    sec.heroSubheadline || ai.tagline,
    ai.enhancedDescription,
    sec.ctaPrimary,
    sec.ctaSecondary,
    sec.urgencyText,
    sec.socialProofText,
  ].filter(Boolean) as string[];

  zones.hero.forEach((el, i) => {
    if (i < heroTexts.length) {
      replaceText(el, heroTexts[i]);
      replaced++;
    }
  });

  // ── MID ZONE (20-65%) — benefits, storytelling, comparison, how-it-works ──
  const midTexts = [
    sec.heroHeadline,
    ...(sec.benefitsBullets || []),
    ai.storytelling?.hook,
    ai.storytelling?.painPoint,
    ai.storytelling?.reveal,
    ...(ai.comparison?.us || []),
    ...(ai.comparison?.them || []),
    ai.authority?.certification,
    sec.guaranteeText,
  ].filter(Boolean) as string[];

  zones.mid.forEach((el, i) => {
    if (i < midTexts.length) {
      replaceText(el, midTexts[i]);
      replaced++;
    }
  });

  // ── BOTTOM ZONE (65-100%) — testimonials, FAQ, closing ──
  const testimonialTexts: string[] = [];
  (ai.testimonials || []).forEach(t => {
    testimonialTexts.push(t.text);
    testimonialTexts.push(t.name);
  });

  const faqTexts: string[] = [];
  (ai.faq || []).forEach(f => {
    faqTexts.push(f.q);
    faqTexts.push(f.a);
  });

  const bottomTexts = [
    ...testimonialTexts,
    ...faqTexts,
    sec.closingArgument,
    sec.ctaPrimary,
    sec.ctaSecondary,
  ].filter(Boolean) as string[];

  zones.bottom.forEach((el, i) => {
    if (i < bottomTexts.length) {
      replaceText(el, bottomTexts[i]);
      replaced++;
    }
  });

  console.log(`[AI Brain] Inyectados ${replaced}/${allElements.length} textos en la PDP`);
  return replaced;
}
