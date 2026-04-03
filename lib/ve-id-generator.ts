/**
 * Visual Editor ID Generator — Fuente única de verdad
 * 
 * Genera IDs determinísticos para elementos editables del DOM.
 * El mismo elemento produce el mismo ID tanto en el editor (iframe)
 * como en la página publicada, independientemente del contexto.
 * 
 * Algoritmo: hash basado en tag + posición relativa entre hermanos del mismo tipo + 
 * primeros N caracteres del texto directo. Esto es estable porque:
 * - El tag no cambia
 * - La posición entre hermanos del mismo tipo es estable
 * - El texto original (antes de edición) es el mismo en ambos contextos
 * 
 * Usado por:
 * - VisualEditorOverlay (markEditableElements)
 * - VisualCustomizationApplier (markEditableElements)
 */

/**
 * Genera un hash corto determinístico de un string.
 * Usa djb2 — rápido, buena distribución, sin dependencias.
 */
function hashStr(str: string): string {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash + str.charCodeAt(i)) & 0xffffffff;
  }
  return Math.abs(hash).toString(36).slice(0, 6);
}

/**
 * Calcula la posición de un elemento entre sus hermanos del mismo tag.
 * Ejemplo: el tercer <p> dentro de su padre → 2
 */
function getSiblingIndex(el: HTMLElement): number {
  const parent = el.parentElement;
  if (!parent) return 0;
  const tag = el.tagName;
  let index = 0;
  for (const child of Array.from(parent.children)) {
    if (child === el) return index;
    if (child.tagName === tag) index++;
  }
  return index;
}

/**
 * Construye un path corto desde el body hasta el elemento.
 * Ejemplo: "div.0>section.1>h2.0" (tag.siblingIndex en cada nivel)
 * Limitado a 4 niveles para mantener IDs cortos.
 */
function getStructuralPath(el: HTMLElement): string {
  const parts: string[] = [];
  let current: HTMLElement | null = el;
  let depth = 0;
  while (current && current !== current.ownerDocument?.body && depth < 4) {
    parts.unshift(`${current.tagName.toLowerCase()}.${getSiblingIndex(current)}`);
    current = current.parentElement;
    depth++;
  }
  return parts.join('>');
}

/**
 * Obtiene el texto directo (no de hijos) de un elemento, truncado.
 */
function getDirectText(el: HTMLElement, maxLen = 30): string {
  let text = '';
  el.childNodes.forEach(node => {
    if (node.nodeType === Node.TEXT_NODE) {
      text += (node.textContent || '').trim();
    }
  });
  return text.slice(0, maxLen);
}

/**
 * Genera un ID determinístico para un elemento editable.
 * Formato: ve-{tag}-{hash}
 * 
 * El hash combina:
 * - Tag del elemento
 * - Path estructural (posición en el DOM)
 * - Primeros 30 chars del texto directo
 */
export function generateVeId(el: HTMLElement): string {
  const tag = el.tagName.toLowerCase();
  const path = getStructuralPath(el);
  const text = getDirectText(el);
  const fingerprint = `${tag}|${path}|${text}`;
  return `ve-${tag}-${hashStr(fingerprint)}`;
}

/**
 * Tipo de elemento editable.
 */
export function getVeType(el: HTMLElement): 'text' | 'image' | 'section' {
  const tag = el.tagName.toLowerCase();
  if (tag === 'img') return 'image';
  if (['header', 'footer', 'nav', 'section', 'main'].includes(tag)) return 'section';
  return 'text';
}

/**
 * Label legible para el editor.
 */
export function getVeLabel(el: HTMLElement): string {
  const tag = el.tagName.toLowerCase();
  const labels: Record<string, string> = {
    img: 'IMAGEN', header: 'ENCABEZADO', footer: 'PIE DE PÁGINA',
    nav: 'NAVEGACIÓN', section: 'SECCIÓN', main: 'PRINCIPAL',
  };
  return labels[tag] || tag.toUpperCase();
}
