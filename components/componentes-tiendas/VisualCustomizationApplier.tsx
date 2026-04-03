'use client';

import { useEffect } from 'react';
import { generateVeId } from '@/lib/ve-id-generator';

interface VisualCustomization {
  id: string;
  selector: string;
  type: 'text' | 'image' | 'style' | 'visibility' | 'component';
  property?: string;
  newValue: string;
  timestamp: number;
}

interface Props {
  customizations: VisualCustomization[];
  injectedComponents: string[];
}

/**
 * Applies visual customizations to the published page.
 * 
 * Uses the same deterministic ID generator (ve-id-generator) as the editor,
 * so the same element always gets the same ID in both contexts.
 * This guarantees that customizations saved in the editor are correctly
 * applied on the published page.
 */
function markElements() {
  const body = document.body;
  if (!body) return;

  const allElements = body.querySelectorAll('*');
  allElements.forEach((el) => {
    const htmlEl = el as HTMLElement;
    const tag = htmlEl.tagName.toLowerCase();

    if (['script', 'style', 'link', 'meta', 'noscript', 'svg', 'path'].includes(tag)) return;
    if (htmlEl.hasAttribute('data-ve-editable')) return;

    if (['h1','h2','h3','h4','h5','h6','p','span','a','button','label','div'].includes(tag)) {
      const directText = Array.from(htmlEl.childNodes)
        .filter(n => n.nodeType === Node.TEXT_NODE)
        .map(n => n.textContent?.trim())
        .join('');
      if (directText.length > 0 && directText.length < 500) {
        htmlEl.setAttribute('data-ve-editable', generateVeId(htmlEl));
      }
    }

    if (tag === 'img') {
      htmlEl.setAttribute('data-ve-editable', generateVeId(htmlEl));
    }

    if (['header','footer','nav','section','main'].includes(tag)) {
      htmlEl.setAttribute('data-ve-editable', generateVeId(htmlEl));
    }
  });
}

export default function VisualCustomizationApplier({ customizations, injectedComponents }: Props) {
  useEffect(() => {
    if ((!customizations || customizations.length === 0) && (!injectedComponents || injectedComponents.length === 0)) return;

    const timer = setTimeout(() => {
      // Step 1: Mark elements with deterministic IDs (same as editor)
      markElements();

      // Step 2: Apply customizations
      customizations.forEach(c => {
        try {
          const el = document.querySelector(c.selector) as HTMLElement;
          if (!el) return;

          switch (c.type) {
            case 'text':
              el.innerHTML = c.newValue;
              break;
            case 'style':
              if (c.property) {
                (el.style as any)[c.property] = c.newValue;
              }
              break;
            case 'visibility':
              el.style.display = c.newValue === 'hidden' ? 'none' : '';
              break;
            case 'image':
              if (el.tagName === 'IMG') {
                (el as HTMLImageElement).src = c.newValue;
              }
              break;
          }
        } catch (err) {
          console.warn('[VCA] Failed to apply:', c.id, err);
        }
      });

      // Step 3: Inject components
      if (injectedComponents.length > 0) {
        const root = document.querySelector('[class*="min-h"]') || document.body.firstElementChild;
        if (root) {
          injectedComponents.forEach(html => {
            const wrapper = document.createElement('div');
            wrapper.innerHTML = html;
            const child = wrapper.firstElementChild;
            if (child) root.insertBefore(child, root.firstChild);
          });
        }
      }

      // Step 4: Clean up attributes (not needed on published page)
      document.querySelectorAll('[data-ve-editable]').forEach(el => {
        el.removeAttribute('data-ve-editable');
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [customizations, injectedComponents]);

  return null;
}
