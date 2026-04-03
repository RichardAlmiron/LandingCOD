'use client';

import { useEffect } from 'react';

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
 * Applies visual customizations made in the Visual Editor to the published store.
 * Runs client-side after the template has rendered.
 */
export default function VisualCustomizationApplier({ customizations, injectedComponents }: Props) {
  useEffect(() => {
    if ((!customizations || customizations.length === 0) && (!injectedComponents || injectedComponents.length === 0)) return;

    // Small delay to ensure template has fully rendered
    const timer = setTimeout(() => {
      // Apply customizations
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
          console.warn('Failed to apply customization:', c.id, err);
        }
      });

      // Inject components
      if (injectedComponents.length > 0) {
        const templateRoot = document.querySelector('[class*="min-h"]') || document.body.firstElementChild;
        if (templateRoot) {
          injectedComponents.forEach(html => {
            const wrapper = document.createElement('div');
            wrapper.innerHTML = html;
            const child = wrapper.firstElementChild;
            if (child) {
              templateRoot.insertBefore(child, templateRoot.firstChild);
            }
          });
        }
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [customizations, injectedComponents]);

  return null;
}
