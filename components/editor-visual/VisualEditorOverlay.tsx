'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  X, Save, Undo2, Redo2, Type, Palette, Plus, Image,
  Sparkles, Check, Trash2,
  Loader2, Info, RotateCcw
} from 'lucide-react';
import {
  VisualCustomization, VisualEditorState, TextEditorOptions,
  EDITOR_FONTS, EDITOR_COLORS
} from '@/lib/visual-editor-types';
import { StoreData, TemplateType } from '@/lib/types';
import { generateVeId, getVeType, getVeLabel } from '@/lib/ve-id-generator';

interface VisualEditorOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  storeData: StoreData;
  template: TemplateType;
  onSave: (customizations: VisualCustomization[], injectedComponents: string[]) => Promise<void>;
  onPublish?: () => void;
  existingCustomizations?: VisualCustomization[];
  existingInjectedComponents?: string[];
  closeLabel?: string;
  flowType?: 'store' | 'pdp';
}

// ═══════════════════════════════════════════════════════════════
// Tooltip Component - Rich hover tooltip with description
// ═══════════════════════════════════════════════════════════════
function Tooltip({ children, text, description, position = 'bottom' }: {
  children: React.ReactNode;
  text: string;
  description?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}) {
  const [show, setShow] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const handleEnter = () => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    let x = rect.left + rect.width / 2;
    let y = rect.bottom + 8;
    if (position === 'top') y = rect.top - 8;
    if (position === 'left') { x = rect.left - 8; y = rect.top + rect.height / 2; }
    if (position === 'right') { x = rect.right + 8; y = rect.top + rect.height / 2; }
    setCoords({ x, y });
    setShow(true);
  };

  return (
    <div ref={ref} onMouseEnter={handleEnter} onMouseLeave={() => setShow(false)} style={{ position: 'relative', display: 'inline-flex' }}>
      {children}
      {show && (
        <div style={{
          position: 'fixed',
          left: position === 'left' ? coords.x : position === 'right' ? coords.x : coords.x,
          top: position === 'top' ? coords.y : coords.y,
          transform: position === 'top'
            ? 'translate(-50%, -100%)'
            : position === 'left'
              ? 'translate(-100%, -50%)'
              : position === 'right'
                ? 'translate(0, -50%)'
                : 'translate(-50%, 0)',
          zIndex: 999999,
          pointerEvents: 'none',
        }}>
          <div style={{
            background: 'rgba(15, 15, 25, 0.97)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            borderRadius: 10,
            padding: description ? '10px 14px' : '7px 12px',
            maxWidth: 260,
            boxShadow: '0 8px 30px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,102,241,0.1)',
            backdropFilter: 'blur(12px)',
          }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#e4e4e7', whiteSpace: 'nowrap' }}>{text}</div>
            {description && (
              <div style={{ fontSize: 11, color: '#a1a1aa', marginTop: 3, lineHeight: 1.4 }}>{description}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function VisualEditorOverlay({
  isOpen, onClose, storeData, template, onSave, onPublish,
  existingCustomizations = [], existingInjectedComponents = [],
  closeLabel = 'Cerrar editor',
  flowType = 'store'
}: VisualEditorOverlayProps) {
  // ── State ──
  const [editorState, setEditorState] = useState<VisualEditorState>({
    isActive: true,
    selectedElement: null,
    hoveredElement: null,
    customizations: existingCustomizations,
    undoStack: [],
    redoStack: [],
    isDirty: false,
    isSaving: false,
    activePanel: 'none',
    zoom: 100,
  });
  const [injectedComponents] = useState<string[]>(existingInjectedComponents);
  const [selectedElementStyles, setSelectedElementStyles] = useState<Partial<TextEditorOptions>>({});
  const [originalElementStyles, setOriginalElementStyles] = useState<Partial<TextEditorOptions>>({});
  const [originalStylePanelValues, setOriginalStylePanelValues] = useState<Record<string, string>>({});
  const [editingText, setEditingText] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [selectedTextContent, setSelectedTextContent] = useState('');
  const [selectedElementInfo, setSelectedElementInfo] = useState<{ tag: string; type: string; label: string } | null>(null);
  const [selectedImageSrc, setSelectedImageSrc] = useState<string>('');
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [showToolsFab, setShowToolsFab] = useState(false);
  const [aiRewriting, setAiRewriting] = useState(false);
  const [aiRewritingAll, setAiRewritingAll] = useState(false);

  // ── Persistent original snapshots (captured ONCE per element, never overwritten) ──
  const originalSnapshotsRef = useRef<Map<string, { styles: Record<string, string>; textContent?: string }>>(new Map());
  // Track which veIds have unsaved changes for tooltip display
  const [unsavedVeIds, setUnsavedVeIds] = useState<Set<string>>(new Set());
  // Track the last saved customizations to know what's "confirmed"
  const lastSavedCustomizationsRef = useRef<VisualCustomization[]>(existingCustomizations);

  // ── Capture original snapshot for an element (only once, never overwritten) ──
  const captureOriginalSnapshot = useCallback((el: HTMLElement, veId: string) => {
    if (originalSnapshotsRef.current.has(veId)) return; // Already captured
    const iframe = iframeRef.current;
    if (!iframe?.contentWindow) return;
    const computed = iframe.contentWindow.getComputedStyle(el);
    originalSnapshotsRef.current.set(veId, {
      styles: {
        fontSize: computed.fontSize,
        fontWeight: computed.fontWeight,
        fontFamily: computed.fontFamily?.split(',')[0]?.replace(/['"]/g, '') || 'Inter',
        color: rgbToHex(computed.color),
        textAlign: computed.textAlign || 'left',
        lineHeight: String(parseFloat(computed.lineHeight) / (parseInt(computed.fontSize) || 16) || 1.5),
        letterSpacing: String(parseFloat(computed.letterSpacing) || 0),
        textTransform: computed.textTransform || 'none',
        textDecoration: computed.textDecoration?.split(' ')[0] || 'none',
        backgroundColor: rgbToHex(computed.backgroundColor),
        background: computed.background || '',
        borderRadius: computed.borderRadius || '0px',
        padding: computed.padding || '0px',
        opacity: computed.opacity || '1',
        boxShadow: computed.boxShadow || 'none',
      },
      textContent: el.innerHTML,
    });
  }, []);

  // ── Update "unsaved" tracking — inject badges + revert buttons into iframe ──
  const updateUnsavedTooltips = useCallback((dirtyIds: Set<string>) => {
    const iframe = iframeRef.current;
    if (!iframe?.contentDocument) return;
    const doc = iframe.contentDocument;

    // Clean up all existing badges and unsaved classes
    doc.querySelectorAll('.ve-unsaved-badge').forEach(el => el.remove());
    doc.querySelectorAll('.ve-has-unsaved').forEach(el => el.classList.remove('ve-has-unsaved'));

    // Inject a badge + revert button for each dirty element
    dirtyIds.forEach(veId => {
      const el = doc.querySelector(`[data-ve-editable="${veId}"]`) as HTMLElement;
      if (!el || el.style.display === 'none') return;

      // Add the unsaved visual class (dashed purple outline)
      el.classList.add('ve-has-unsaved');

      // Ensure the element is positioned so the badge can be absolute
      const pos = iframe.contentWindow!.getComputedStyle(el).position;
      if (pos === 'static') el.style.position = 'relative';

      const badge = doc.createElement('div');
      badge.className = 've-unsaved-badge';
      badge.setAttribute('data-ve-badge-for', veId);
      badge.innerHTML = `
        <span class="ve-badge-label">⚠ Sin guardar</span>
        <button class="ve-badge-revert" data-ve-revert-id="${veId}">↩ Revertir</button>
      `;
      el.appendChild(badge);

      // Attach click handler for the revert button
      const btn = badge.querySelector('.ve-badge-revert') as HTMLElement;
      if (btn) {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          // Use postMessage to communicate back to the parent React component
          iframe.contentWindow?.parent.postMessage({ type: 've-revert', veId }, '*');
        }, true);
      }
    });
  }, []);

  // ── Revert a single element to its original state ──
  const revertElement = useCallback((veId: string) => {
    const iframe = iframeRef.current;
    if (!iframe?.contentDocument) return;
    const doc = iframe.contentDocument;
    const el = doc.querySelector(`[data-ve-editable="${veId}"]`) as HTMLElement;
    const snapshot = originalSnapshotsRef.current.get(veId);
    if (!el || !snapshot) return;

    // Restore all styles
    Object.entries(snapshot.styles).forEach(([prop, val]) => {
      if (prop === 'background') {
        el.style.background = val;
      } else {
        (el.style as any)[prop] = val;
      }
    });
    // Restore text content if it was captured
    if (snapshot.textContent !== undefined) {
      el.innerHTML = snapshot.textContent;
    }

    // Clean up the badge and unsaved class from this element
    el.classList.remove('ve-has-unsaved');
    el.querySelectorAll('.ve-unsaved-badge').forEach(b => b.remove());

    // Remove customizations for this element
    setEditorState(prev => ({
      ...prev,
      customizations: prev.customizations.filter(c => !c.selector.includes(veId)),
      isDirty: prev.customizations.filter(c => !c.selector.includes(veId)).length > 0,
    }));

    // Remove from unsaved set
    setUnsavedVeIds(prev => {
      const next = new Set(prev);
      next.delete(veId);
      updateUnsavedTooltips(next);
      return next;
    });

    // Clear snapshot so it can be recaptured fresh
    originalSnapshotsRef.current.delete(veId);

    // Update selected element styles if this is the currently selected element
    if (el.getAttribute('data-ve-editable') === editorState.selectedElement?.getAttribute('data-ve-editable')) {
      const computed = iframe.contentWindow!.getComputedStyle(el);
      setSelectedElementStyles({
        fontSize: parseInt(computed.fontSize) || 16,
        fontWeight: computed.fontWeight || '400',
        fontFamily: computed.fontFamily?.split(',')[0]?.replace(/['"]/g, '') || 'Inter',
        color: rgbToHex(computed.color),
        textAlign: computed.textAlign || 'left',
        lineHeight: parseFloat(computed.lineHeight) / (parseInt(computed.fontSize) || 16) || 1.5,
        letterSpacing: parseFloat(computed.letterSpacing) || 0,
        textTransform: computed.textTransform || 'none',
        textDecoration: computed.textDecoration?.split(' ')[0] || 'none',
      });
      setSelectedTextContent(el.textContent?.trim().slice(0, 200) || '');
    }
  }, [editorState.selectedElement, updateUnsavedTooltips]);

  // ── Add customization with undo support ──
  const addCustomization = useCallback((customization: VisualCustomization) => {
    setEditorState(prev => ({
      ...prev,
      undoStack: [...prev.undoStack, prev.customizations],
      redoStack: [],
      customizations: [
        ...prev.customizations.filter(c => c.id !== customization.id || c.property !== customization.property),
        customization
      ],
      isDirty: true,
    }));
  }, []);

  // ── Stable refs for functions used inside iframe listeners ──
  // This avoids stale closures in setupIframeListeners (which has [] deps to avoid re-attaching)
  const captureOriginalSnapshotRef = useRef(captureOriginalSnapshot);
  const addCustomizationRef = useRef(addCustomization);
  const updateUnsavedTooltipsRef = useRef(updateUnsavedTooltips);
  useEffect(() => { captureOriginalSnapshotRef.current = captureOriginalSnapshot; }, [captureOriginalSnapshot]);
  useEffect(() => { addCustomizationRef.current = addCustomization; }, [addCustomization]);
  useEffect(() => { updateUnsavedTooltipsRef.current = updateUnsavedTooltips; }, [updateUnsavedTooltips]);

  // ── Inject editor styles into iframe ──
  const injectEditorStyles = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe?.contentDocument) return;
    const doc = iframe.contentDocument;

    doc.getElementById('ve-styles')?.remove();

    const style = doc.createElement('style');
    style.id = 've-styles';
    style.textContent = `
      [data-ve-editable]:not([data-ve-product]) {
        outline: 2px dashed transparent !important;
        outline-offset: 2px;
        transition: outline-color 0.15s ease, box-shadow 0.15s ease;
        cursor: pointer !important;
        position: relative;
      }
      [data-ve-editable]:not([data-ve-product]):hover {
        outline-color: #6366f1 !important;
        box-shadow: inset 0 0 0 1px rgba(99, 102, 241, 0.15) !important;
      }
      [data-ve-editable].ve-selected {
        outline: 2px solid #6366f1 !important;
        outline-offset: 2px;
        box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.2) !important;
        background-color: rgba(30, 30, 60, 0.12) !important;
        text-shadow: 0 0 0 transparent !important;
      }
      [data-ve-editable].ve-selected * {
        text-shadow: 0 1px 3px rgba(0,0,0,0.4), 0 0 8px rgba(99,102,241,0.3) !important;
      }
      /* Pulsing glow on selected images to draw attention to the sidebar panel */
      img[data-ve-editable].ve-selected {
        animation: veImagePulse 1.5s ease-in-out infinite !important;
      }
      @keyframes veImagePulse {
        0%, 100% { box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.3), 0 0 20px rgba(99, 102, 241, 0.15) !important; }
        50% { box-shadow: 0 0 0 6px rgba(99, 102, 241, 0.5), 0 0 30px rgba(99, 102, 241, 0.3) !important; }
      }
      [data-ve-editable].ve-selected::before {
        content: attr(data-ve-label);
        position: absolute;
        top: -24px;
        left: 0;
        background: #6366f1;
        color: white;
        font-size: 10px;
        font-weight: 700;
        padding: 2px 10px;
        border-radius: 6px 6px 0 0;
        white-space: nowrap;
        z-index: 10000;
        font-family: system-ui, -apple-system, sans-serif;
        letter-spacing: 0.03em;
      }
      [data-ve-product] {
        pointer-events: none !important;
        opacity: 0.7;
        position: relative;
      }
      [data-ve-product]::after {
        content: '🔒 Productos (no editable)';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0,0,0,0.7);
        color: white;
        padding: 8px 16px;
        border-radius: 8px;
        font-size: 12px;
        font-weight: 600;
        pointer-events: none;
        z-index: 100;
        white-space: nowrap;
        font-family: system-ui, -apple-system, sans-serif;
      }
      .ve-injected-component {
        position: relative;
        outline: 2px dashed #22c55e !important;
        outline-offset: 2px;
      }
      .ve-injected-component:hover {
        outline-color: #16a34a !important;
      }
      .ve-injected-component::before {
        content: '✨ Componente añadido';
        position: absolute;
        top: -22px;
        right: 0;
        background: #22c55e;
        color: white;
        font-size: 10px;
        font-weight: 600;
        padding: 2px 8px;
        border-radius: 4px 4px 0 0;
        z-index: 10000;
        font-family: system-ui, -apple-system, sans-serif;
      }
      [contenteditable="true"] {
        outline: 2px solid #f59e0b !important;
        outline-offset: 1px;
        min-height: 1em;
        cursor: text !important;
      }
      [contenteditable="true"]:focus {
        outline: 2px solid #f59e0b !important;
        background-color: rgba(245, 158, 11, 0.05) !important;
      }
      /* ── Unsaved badge + revert button on edited elements ── */
      .ve-unsaved-badge {
        position: absolute;
        top: -28px;
        right: 0;
        display: flex;
        align-items: center;
        gap: 4px;
        z-index: 10001;
        pointer-events: auto;
        animation: veBadgeIn 0.25s ease-out;
      }
      .ve-badge-label {
        background: rgba(139, 92, 246, 0.92);
        color: #fff;
        font-size: 10px;
        font-weight: 700;
        padding: 3px 8px;
        border-radius: 0 0 0 8px;
        white-space: nowrap;
        font-family: system-ui, -apple-system, sans-serif;
        letter-spacing: 0.02em;
        line-height: 1.3;
        backdrop-filter: blur(4px);
        box-shadow: 0 2px 8px rgba(139,92,246,0.3);
      }
      .ve-badge-revert {
        background: rgba(239, 68, 68, 0.9);
        color: #fff;
        font-size: 10px;
        font-weight: 700;
        padding: 3px 8px;
        border: none;
        border-radius: 0 0 6px 0;
        cursor: pointer;
        white-space: nowrap;
        font-family: system-ui, -apple-system, sans-serif;
        letter-spacing: 0.02em;
        line-height: 1.3;
        transition: background 0.15s;
        backdrop-filter: blur(4px);
        box-shadow: 0 2px 8px rgba(239,68,68,0.3);
      }
      .ve-badge-revert:hover {
        background: rgba(239, 68, 68, 1);
        transform: scale(1.05);
      }
      /* Edited elements get a subtle colored outline */
      [data-ve-editable].ve-has-unsaved:not(.ve-selected) {
        outline: 2px dashed rgba(139, 92, 246, 0.6) !important;
        outline-offset: 2px;
      }
      @keyframes veBadgeIn {
        from { opacity: 0; transform: translateY(-4px); }
        to { opacity: 1; transform: translateY(0); }
      }
      * { scroll-behavior: smooth; }
      /* ── AI Rewrite Buttons ── */
      .ve-ai-rewrite-btn {
        position: absolute;
        top: -4px;
        right: -4px;
        width: 26px;
        height: 26px;
        border-radius: 8px;
        background: linear-gradient(135deg, #7c3aed, #6366f1);
        border: 2px solid rgba(255,255,255,0.9);
        color: #fff;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        opacity: 0;
        transform: scale(0.7);
        transition: all 0.2s cubic-bezier(0.4,0,0.2,1);
        box-shadow: 0 2px 10px rgba(99,102,241,0.5), 0 0 0 1px rgba(99,102,241,0.3);
        pointer-events: auto;
      }
      [data-ve-editable]:hover > .ve-ai-rewrite-btn,
      .ve-ai-rewrite-btn:hover {
        opacity: 1;
        transform: scale(1);
      }
      .ve-ai-rewrite-btn:hover {
        background: linear-gradient(135deg, #6d28d9, #4f46e5);
        box-shadow: 0 4px 20px rgba(99,102,241,0.7), 0 0 0 2px rgba(99,102,241,0.4);
        transform: scale(1.1);
      }
      .ve-ai-rewrite-btn:active {
        transform: scale(0.95);
      }
      .ve-ai-rewrite-btn.ve-ai-loading {
        opacity: 1;
        transform: scale(1);
        pointer-events: none;
        animation: ve-ai-spin 1s linear infinite;
      }
      @keyframes ve-ai-spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `;
    doc.head.appendChild(style);
  }, []);

  // ── Mark editable elements in iframe ──
  const markEditableElements = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe?.contentDocument) return;
    const doc = iframe.contentDocument;
    const body = doc.body;
    if (!body) return;

    const allElements = body.querySelectorAll('*');
    allElements.forEach((el) => {
      const htmlEl = el as HTMLElement;
      const tag = htmlEl.tagName.toLowerCase();

      if (['script', 'style', 'link', 'meta', 'noscript', 'svg', 'path'].includes(tag)) return;
      if (htmlEl.closest('[data-ve-product]')) return;

      const text = htmlEl.textContent?.trim() || '';
      
      const isPageWrapper = ['main', 'body', 'html', 'header', 'footer', 'section', 'article'].includes(tag);
      const isDeeplyNested = htmlEl.querySelectorAll('*').length > 50;
      const hasSinglePrice = (text.match(/\$[\d,.]+/g) || []).length === 1;
      const hasProductTitle = text.length > 10 && text.length < 200;
      const hasBuyButton = htmlEl.querySelector('button, [role="button"]') !== null;
      const isCompactCard = htmlEl.querySelectorAll('*').length < 30;
      
      if (!isPageWrapper && !isDeeplyNested && isCompactCard && hasSinglePrice && hasProductTitle && hasBuyButton) {
        htmlEl.setAttribute('data-ve-product', 'true');
        return;
      }

      if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'a', 'button', 'label', 'div'].includes(tag)) {
        const directText = Array.from(htmlEl.childNodes)
          .filter(n => n.nodeType === Node.TEXT_NODE)
          .map(n => n.textContent?.trim())
          .join('');

        if (directText.length > 0 && directText.length < 500 && !htmlEl.closest('[data-ve-product]')) {
          let veId: string;
          if (!htmlEl.hasAttribute('data-ve-editable')) {
            veId = generateVeId(htmlEl);
            htmlEl.setAttribute('data-ve-editable', veId);
            htmlEl.setAttribute('data-ve-type', 'text');
            htmlEl.setAttribute('data-ve-label', tag.toUpperCase());
          } else {
            veId = htmlEl.getAttribute('data-ve-editable')!;
          }

          if (directText.length > 1 && !htmlEl.querySelector('.ve-ai-rewrite-btn')) {
            const pos = iframe.contentWindow!.getComputedStyle(htmlEl).position;
            if (pos === 'static') htmlEl.style.position = 'relative';
            const btn = doc.createElement('button');
            btn.className = 've-ai-rewrite-btn';
            btn.setAttribute('data-ve-ai-for', veId);
            btn.title = 'Reescribir con IA — Gs. 1.000 por click';
            btn.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>`;
            btn.addEventListener('click', (e) => {
              e.preventDefault();
              e.stopPropagation();
              iframe.contentWindow?.parent.postMessage({ type: 've-ai-rewrite', veId, text: directText }, '*');
            }, true);
            htmlEl.appendChild(btn);
          }
        }
      }

      if (tag === 'img' && !htmlEl.closest('[data-ve-product]')) {
        if (!htmlEl.hasAttribute('data-ve-editable')) {
          htmlEl.setAttribute('data-ve-editable', generateVeId(htmlEl));
          htmlEl.setAttribute('data-ve-type', 'image');
          htmlEl.setAttribute('data-ve-label', 'IMAGEN');
        }
      }

      if (['header', 'footer', 'nav', 'section', 'main'].includes(tag)) {
        if (!htmlEl.closest('[data-ve-product]') && !htmlEl.hasAttribute('data-ve-editable')) {
          htmlEl.setAttribute('data-ve-editable', generateVeId(htmlEl));
          htmlEl.setAttribute('data-ve-type', 'section');
          htmlEl.setAttribute('data-ve-label', getVeLabel(htmlEl));
        }
      }
    });
  }, []);

  // ── Handle element click in iframe ──
  const setupIframeListeners = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe?.contentDocument) {
      console.warn('[VE] setupIframeListeners: contentDocument is null!');
      return;
    }
    const doc = iframe.contentDocument;

    // Remove any previously attached VE listeners to avoid duplicates
    if ((doc as any).__veClickHandler) {
      doc.removeEventListener('click', (doc as any).__veClickHandler, true);
      doc.removeEventListener('dblclick', (doc as any).__veDblClickHandler, true);
    }

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Ignore clicks on unsaved badges
      if (target.closest('.ve-unsaved-badge')) return;

      // Find the editable element — prefer the target itself if it's editable,
      // otherwise walk up. This ensures clicking an <img> selects the image, not a parent <section>.
      let editable: HTMLElement | null = null;
      if (target.hasAttribute('data-ve-editable')) {
        editable = target;
      } else {
        editable = target.closest('[data-ve-editable]') as HTMLElement;
      }

      if (!editable || editable.closest('[data-ve-product]')) {
        doc.querySelectorAll('.ve-selected').forEach(el => el.classList.remove('ve-selected'));
        setEditorState(prev => ({ ...prev, selectedElement: null }));
        setSelectedElementInfo(null);
        setSelectedTextContent('');
        return;
      }

      e.preventDefault();
      e.stopPropagation();

      doc.querySelectorAll('.ve-selected').forEach(el => el.classList.remove('ve-selected'));
      editable.classList.add('ve-selected');

      // Flash animation to confirm selection
      editable.style.transition = 'outline-color 0.15s ease';

      const veType = editable.getAttribute('data-ve-type') || 'text';
      const veLabel = editable.getAttribute('data-ve-label') || editable.tagName;
      const tag = editable.tagName.toLowerCase();
      const textContent = editable.textContent?.trim().slice(0, 200) || '';

      setSelectedElementInfo({ tag: tag.toUpperCase(), type: veType, label: veLabel });
      setSelectedTextContent(textContent);
      setShowComponentPicker(false);

      // Auto-open the correct panel based on element type — ALWAYS
      if (veType === 'image') {
        const imgSrc = (editable as HTMLImageElement).src || '';
        setSelectedImageSrc(imgSrc);
        setEditorState(prev => ({ ...prev, selectedElement: editable, activePanel: 'image' }));
      } else if (veType === 'section') {
        setEditorState(prev => ({ ...prev, selectedElement: editable, activePanel: 'style' }));
        const computed = iframe.contentWindow!.getComputedStyle(editable);
        setSelectedElementStyles({
          fontSize: parseInt(computed.fontSize) || 16,
          fontWeight: computed.fontWeight || '400',
          fontFamily: computed.fontFamily?.split(',')[0]?.replace(/['"]/g, '') || 'Inter',
          color: rgbToHex(computed.color),
          textAlign: computed.textAlign || 'left',
          lineHeight: parseFloat(computed.lineHeight) / (parseInt(computed.fontSize) || 16) || 1.5,
          letterSpacing: parseFloat(computed.letterSpacing) || 0,
          textTransform: computed.textTransform || 'none',
          textDecoration: computed.textDecoration?.split(' ')[0] || 'none',
        });
      } else {
        setEditorState(prev => ({ ...prev, selectedElement: editable, activePanel: 'text' }));
        const computed = iframe.contentWindow!.getComputedStyle(editable);
        setSelectedElementStyles({
          fontSize: parseInt(computed.fontSize) || 16,
          fontWeight: computed.fontWeight || '400',
          fontFamily: computed.fontFamily?.split(',')[0]?.replace(/['"]/g, '') || 'Inter',
          color: rgbToHex(computed.color),
          textAlign: computed.textAlign || 'left',
          lineHeight: parseFloat(computed.lineHeight) / (parseInt(computed.fontSize) || 16) || 1.5,
          letterSpacing: parseFloat(computed.letterSpacing) || 0,
          textTransform: computed.textTransform || 'none',
          textDecoration: computed.textDecoration?.split(' ')[0] || 'none',
        });
      }

      // Capture original snapshot ONCE (never overwrite)
      const veId = editable.getAttribute('data-ve-editable') || '';
      captureOriginalSnapshotRef.current(editable, veId);
      const snapshot = originalSnapshotsRef.current.get(veId);

      // Set original styles from persistent snapshot
      if (snapshot) {
        setOriginalElementStyles({
          fontSize: parseInt(snapshot.styles.fontSize) || 16,
          fontWeight: snapshot.styles.fontWeight || '400',
          fontFamily: snapshot.styles.fontFamily || 'Inter',
          color: snapshot.styles.color || '#000000',
          textAlign: snapshot.styles.textAlign || 'left',
          lineHeight: parseFloat(snapshot.styles.lineHeight) || 1.5,
          letterSpacing: parseFloat(snapshot.styles.letterSpacing) || 0,
          textTransform: snapshot.styles.textTransform || 'none',
          textDecoration: snapshot.styles.textDecoration || 'none',
        });
        setOriginalStylePanelValues({
          backgroundColor: snapshot.styles.backgroundColor,
          background: snapshot.styles.background,
          borderRadius: snapshot.styles.borderRadius,
          padding: snapshot.styles.padding,
          opacity: snapshot.styles.opacity,
          boxShadow: snapshot.styles.boxShadow,
        });
      }
    };

    const handleDblClick = (e: MouseEvent) => {
      // Double click text editing (contenteditable) is disabled because it directly
      // mutates React-managed DOM nodes, causing fatal NotFoundError hydration 
      // crashes (the "manto blanco" Next.js error overlay). Users use the sidebar text area instead.
      e.preventDefault();
      e.stopPropagation();
    };

    doc.addEventListener('click', handleClick, true);
    doc.addEventListener('dblclick', handleDblClick, true);

    // Store references for cleanup on re-setup
    (doc as any).__veClickHandler = handleClick;
    (doc as any).__veDblClickHandler = handleDblClick;

    console.log('[VE] setupIframeListeners: click + dblclick listeners attached to iframe document');

    return () => {
      doc.removeEventListener('click', handleClick, true);
      doc.removeEventListener('dblclick', handleDblClick, true);
    };
  }, []);

  // ── Undo / Redo ──
  const handleUndo = useCallback(() => {
    setEditorState(prev => {
      if (prev.undoStack.length === 0) return prev;
      const newUndo = [...prev.undoStack];
      const restored = newUndo.pop()!;
      return { ...prev, undoStack: newUndo, redoStack: [...prev.redoStack, prev.customizations], customizations: restored, isDirty: true };
    });
  }, []);

  const handleRedo = useCallback(() => {
    setEditorState(prev => {
      if (prev.redoStack.length === 0) return prev;
      const newRedo = [...prev.redoStack];
      const restored = newRedo.pop()!;
      return { ...prev, redoStack: newRedo, undoStack: [...prev.undoStack, prev.customizations], customizations: restored, isDirty: true };
    });
  }, []);

  // ── Apply style to selected element ──
  const applyStyle = useCallback((property: string, value: string) => {
    const el = editorState.selectedElement;
    if (!el) return;

    const veId = el.getAttribute('data-ve-editable') || '';
    // Capture snapshot before first modification
    captureOriginalSnapshot(el, veId);

    (el.style as any)[property] = value;
    addCustomization({
      id: `${veId}-${property}`,
      selector: `[data-ve-editable="${veId}"]`,
      type: 'style',
      property,
      newValue: value,
      timestamp: Date.now(),
    });
    setSelectedElementStyles(prev => ({ ...prev, [property]: value }));

    // Mark as unsaved and show tooltip
    setUnsavedVeIds(prev => {
      const next = new Set(prev);
      next.add(veId);
      updateUnsavedTooltips(next);
      return next;
    });
  }, [editorState.selectedElement, addCustomization, captureOriginalSnapshot, updateUnsavedTooltips]);

  // ── Apply image change from panel ──
  const applyImageChange = useCallback((newSrc: string) => {
    const el = editorState.selectedElement;
    if (!el || el.tagName.toLowerCase() !== 'img') return;
    const veId = el.getAttribute('data-ve-editable') || '';
    captureOriginalSnapshot(el, veId);
    (el as HTMLImageElement).src = newSrc;
    setSelectedImageSrc(newSrc);
    addCustomization({
      id: `${veId}-src`,
      selector: `[data-ve-editable="${veId}"]`,
      type: 'image',
      property: 'src',
      newValue: newSrc,
      timestamp: Date.now(),
    });
    setUnsavedVeIds(prev => {
      const next = new Set(prev);
      next.add(veId);
      updateUnsavedTooltips(next);
      return next;
    });
  }, [editorState.selectedElement, addCustomization, captureOriginalSnapshot, updateUnsavedTooltips]);

  // ── Apply text change from panel textarea ──
  const applyTextFromPanel = useCallback((newText: string) => {
    const el = editorState.selectedElement;
    if (!el) return;
    const veId = el.getAttribute('data-ve-editable') || '';
    captureOriginalSnapshot(el, veId);
    el.textContent = newText;
    setSelectedTextContent(newText);
    addCustomization({
      id: veId,
      selector: `[data-ve-editable="${veId}"]`,
      type: 'text',
      newValue: el.innerHTML,
      timestamp: Date.now(),
    });
    setUnsavedVeIds(prev => {
      const next = new Set(prev);
      next.add(veId);
      updateUnsavedTooltips(next);
      return next;
    });
  }, [editorState.selectedElement, addCustomization, captureOriginalSnapshot, updateUnsavedTooltips]);

  // ── Helper: build AI rewrite request body with full context ──
  const buildRewriteBody = useCallback((el: HTMLElement, currentText: string) => {
    const product = storeData.products?.[0];
    const tag = el.tagName.toLowerCase();
    const textLen = currentText.split(/\s+/).length;
    const sectionType = (tag === 'button' || tag === 'a') ? 'botón CTA'
      : tag === 'h1' ? 'título principal'
      : tag === 'h2' ? 'título de sección'
      : tag === 'h3' || tag === 'h4' ? 'subtítulo'
      : tag === 'li' ? 'punto de beneficio'
      : tag === 'span' && textLen <= 5 ? 'badge o etiqueta'
      : tag === 'label' ? 'etiqueta de formulario'
      : textLen <= 5 ? 'texto corto (badge/CTA)'
      : textLen <= 15 ? 'título o frase de impacto'
      : 'descripción o párrafo';

    // Get surrounding text for zone context
    const parent = el.closest('section, article, div[class], main') as HTMLElement | null;
    let surroundingText = '';
    if (parent) {
      const nearby = parent.querySelectorAll('h1,h2,h3,h4,p,span,button');
      const texts: string[] = [];
      nearby.forEach(n => {
        const t = (n.textContent || '').trim();
        if (t.length > 2 && t.length < 200 && t !== currentText) texts.push(t);
      });
      surroundingText = texts.slice(0, 5).join(' | ');
    }

    return {
      productTitle: product?.title || product?.aiContent?.enhancedTitle || '',
      productDescription: product?.description || product?.aiContent?.enhancedDescription || '',
      productCategory: product?.category || '',
      sectionType,
      currentText,
      aiContext: product?.aiContent || null,
      surroundingText,
    };
  }, [storeData]);

  // ── AI Rewrite selected text element ──
  const handleAIRewrite = useCallback(async () => {
    const el = editorState.selectedElement;
    if (!el || aiRewriting) return;
    const currentText = el.textContent?.trim();
    if (!currentText) return;

    setAiRewriting(true);
    try {
      const res = await fetch('/api/ai/rewrite-section', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buildRewriteBody(el, currentText)),
      });
      const data = await res.json();
      if (data.success && data.newText) {
        applyTextFromPanel(data.newText);
      }
    } catch (err) {
      console.error('[AI Rewrite] Error:', err);
    } finally {
      setAiRewriting(false);
    }
  }, [editorState.selectedElement, storeData, aiRewriting, applyTextFromPanel, buildRewriteBody]);

  // ── AI Rewrite ALL text elements in ONE single API call ──
  const handleRewriteAll = useCallback(async () => {
    const iframe = iframeRef.current;
    if (!iframe?.contentDocument || aiRewritingAll) return;
    const doc = iframe.contentDocument;
    const product = storeData.products?.[0];
    if (!product) return;

    const textElements = Array.from(doc.querySelectorAll('[data-ve-editable][data-ve-type="text"]')) as HTMLElement[];
    if (textElements.length === 0) return;

    // Collect all text elements info
    const elements: { veId: string; el: HTMLElement; currentText: string; sectionType: string; wordCount: number }[] = [];
    textElements.forEach(htmlEl => {
      const directText = Array.from(htmlEl.childNodes)
        .filter(n => n.nodeType === Node.TEXT_NODE)
        .map(n => n.textContent?.trim())
        .join('');
      if (directText.length < 2) return;

      const tag = htmlEl.tagName.toLowerCase();
      const wordCount = directText.split(/\s+/).length;
      const sectionType = (tag === 'button' || tag === 'a') ? 'botón CTA'
        : tag === 'h1' ? 'título principal'
        : tag === 'h2' ? 'título de sección'
        : tag === 'h3' || tag === 'h4' ? 'subtítulo'
        : tag === 'li' ? 'punto de beneficio'
        : tag === 'span' && wordCount <= 5 ? 'badge o etiqueta'
        : wordCount <= 5 ? 'texto corto'
        : wordCount <= 15 ? 'título o frase'
        : 'descripción o párrafo';

      elements.push({
        veId: htmlEl.getAttribute('data-ve-editable') || '',
        el: htmlEl,
        currentText: directText,
        sectionType,
        wordCount,
      });
    });

    if (elements.length === 0) return;

    setAiRewritingAll(true);
    setShowToolsFab(false);

    // Show loading on ALL buttons
    elements.forEach(({ el }) => {
      const btn = el.querySelector('.ve-ai-rewrite-btn') as HTMLElement;
      if (btn) btn.classList.add('ve-ai-loading');
    });

    try {
      const res = await fetch('/api/ai/rewrite-all', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productTitle: product.title || product.aiContent?.enhancedTitle || '',
          productDescription: product.description || product.aiContent?.enhancedDescription || '',
          productCategory: product.category || '',
          aiContext: product.aiContent || null,
          elements: elements.map(e => ({ sectionType: e.sectionType, wordCount: e.wordCount, currentText: e.currentText })),
        }),
      });
      const data = await res.json();

      if (data.success && Array.isArray(data.results)) {
        data.results.forEach((r: { i: number; t: string }) => {
          if (r.i >= 0 && r.i < elements.length && r.t) {
            const { veId, el } = elements[r.i];
            captureOriginalSnapshot(el, veId);
            el.childNodes.forEach(node => {
              if (node.nodeType === Node.TEXT_NODE && (node.textContent || '').trim().length > 1) {
                node.textContent = r.t;
              }
            });
            if (!Array.from(el.childNodes).some(n => n.nodeType === Node.TEXT_NODE && (n.textContent || '').trim().length > 1)) {
              const tw = iframe.contentDocument!.createTreeWalker(el, NodeFilter.SHOW_TEXT);
              let tn: Text | null;
              while ((tn = tw.nextNode() as Text | null)) {
                if ((tn.textContent || '').trim().length > 2) { tn.textContent = r.t; break; }
              }
            }
            addCustomization({
              id: veId, selector: `[data-ve-editable="${veId}"]`,
              type: 'text', newValue: el.innerHTML, timestamp: Date.now(),
            });
            setUnsavedVeIds(prev => { const next = new Set(prev); next.add(veId); return next; });
          }
        });
      }
    } catch (err) {
      console.error('[AI Rewrite All] Error:', err);
    } finally {
      // Remove loading from ALL buttons
      elements.forEach(({ el }) => {
        const btn = el.querySelector('.ve-ai-rewrite-btn') as HTMLElement;
        if (btn) btn.classList.remove('ve-ai-loading');
      });
      setAiRewritingAll(false);
      setUnsavedVeIds(prev => { updateUnsavedTooltips(prev); return prev; });
    }
  }, [storeData, aiRewritingAll, captureOriginalSnapshot, addCustomization, updateUnsavedTooltips, buildRewriteBody]);

  // ── Delete selected element ──
  const deleteElement = useCallback(() => {
    const el = editorState.selectedElement;
    if (!el || el.closest('[data-ve-product]')) return;

    const veId = el.getAttribute('data-ve-editable') || '';
    captureOriginalSnapshot(el, veId);
    addCustomization({
      id: veId,
      selector: `[data-ve-editable="${veId}"]`,
      type: 'visibility',
      newValue: 'hidden',
      timestamp: Date.now(),
    });
    el.style.display = 'none';
    setEditorState(prev => ({ ...prev, selectedElement: null }));
    setSelectedElementInfo(null);
    setSelectedTextContent('');
    setUnsavedVeIds(prev => {
      const next = new Set(prev);
      next.add(veId);
      updateUnsavedTooltips(next);
      return next;
    });
  }, [editorState.selectedElement, addCustomization, captureOriginalSnapshot, updateUnsavedTooltips]);

  // ── Save all customizations ──
  const handleSave = useCallback(async () => {
    setEditorState(prev => ({ ...prev, isSaving: true }));
    try {
      await onSave(editorState.customizations, injectedComponents);
      // Mark everything as saved
      lastSavedCustomizationsRef.current = [...editorState.customizations];
      // Clear unsaved tooltips and reset snapshots so revert now goes to this saved state
      setUnsavedVeIds(prev => {
        const empty = new Set<string>();
        updateUnsavedTooltips(empty);
        return empty;
      });
      // Reset snapshots so future reverts go back to the newly saved state
      originalSnapshotsRef.current.clear();
      setEditorState(prev => ({ ...prev, isDirty: false, isSaving: false }));
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error('Error saving visual customizations:', err);
      setEditorState(prev => ({ ...prev, isSaving: false }));
    }
  }, [editorState.customizations, injectedComponents, onSave, updateUnsavedTooltips]);

  // ── Full editor setup (inject styles, mark elements, attach listeners) ──
  const performEditorSetup = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe?.contentDocument?.body) {
      console.log('[VE] performEditorSetup: no contentDocument or body');
      return false;
    }
    
    const doc = iframe.contentDocument;
    const body = doc.body;
    
    // Check if the iframe body has real content (not just a loading spinner)
    const bodyChildren = body.children.length;
    const bodyText = body.innerText?.trim() || '';
    const hasImages = body.querySelectorAll('img').length > 0;
    const hasRealContent = bodyChildren > 2 || bodyText.length > 30 || hasImages;
    
    if (!hasRealContent) {
      console.log('[VE] performEditorSetup: no real content yet (children:', bodyChildren, 'text:', bodyText.length, ')');
      return false;
    }
    
    console.log('[VE] performEditorSetup: content found, setting up editor...');
    injectEditorStyles();
    markEditableElements();
    const editableCount = doc.querySelectorAll('[data-ve-editable]').length;
    console.log('[VE] performEditorSetup: editables:', editableCount, 'children:', bodyChildren);
    
    // ALWAYS attach listeners — even if no editables found yet
    setupIframeListeners();
    applyExistingCustomizations();
    applyExistingInjectedComponents();
    
    return true;
  }, [injectEditorStyles, markEditableElements, setupIframeListeners]);

  // ── MutationObserver ref to watch for iframe DOM changes ──
  const mutationObserverRef = useRef<MutationObserver | null>(null);
  const setupCompleteRef = useRef(false);

  // ── Iframe load handler ──
  const handleIframeLoad = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe?.contentWindow) return;
    setupCompleteRef.current = false;

    // Clean up previous MutationObserver
    if (mutationObserverRef.current) {
      mutationObserverRef.current.disconnect();
      mutationObserverRef.current = null;
    }

    // Send store data to iframe via postMessage (retry until received)
    let retryCount = 0;
    const maxRetries = 15;
    const effectiveTemplate = flowType === 'pdp' ? (storeData.pdpTemplate || template) : template;
    const sendData = () => {
      if (retryCount >= maxRetries) return;
      iframe.contentWindow?.postMessage({
        type: 've-init-data',
        store: storeData,
        template: effectiveTemplate,
      }, '*');
      retryCount++;
    };
    sendData();
    const retryInterval = setInterval(sendData, 200);
    setTimeout(() => clearInterval(retryInterval), 4000);

    // Instead of waiting for ve-ready, poll the iframe until it has real content
    // This is more reliable than postMessage handshakes which can fail in React Strict Mode
    setIframeLoaded(true);
    
    let pollCount = 0;
    const maxPolls = 60; // 60 * 300ms = 18 seconds max
    const pollInterval = setInterval(() => {
      pollCount++;
      if (pollCount > maxPolls || setupCompleteRef.current) {
        clearInterval(pollInterval);
        return;
      }
      
      const success = performEditorSetup();
      if (success) {
        setupCompleteRef.current = true;
        clearInterval(pollInterval);
        console.log('[VE] Editor setup complete after', pollCount, 'polls');
        
        // Set up MutationObserver for resilience after successful setup
        try {
          const doc = iframe.contentDocument;
          if (!doc?.body) return;
          let debounceTimer: ReturnType<typeof setTimeout> | null = null;
          const observer = new MutationObserver((mutations) => {
            const significant = mutations.some(m =>
              m.type === 'childList' && m.addedNodes.length > 0
            );
            if (!significant) return;
            
            // Re-mark editable elements whenever DOM changes significantly
            if (debounceTimer) clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
              const hasEditables = doc.querySelectorAll('[data-ve-editable]').length > 0;
              if (!hasEditables) {
                console.log('[VE] DOM rebuilt detected — re-injecting');
                performEditorSetup();
              } else {
                // Even if editables exist, re-mark new elements that may have been added
                markEditableElements();
              }
            }, 400);
          });
          observer.observe(doc.body, { childList: true, subtree: true });
          mutationObserverRef.current = observer;
        } catch (e) {
          console.warn('[VE] Could not set up MutationObserver:', e);
        }
      }
    }, 300);

    return () => {
      clearInterval(retryInterval);
      clearInterval(pollInterval);
      if (mutationObserverRef.current) {
        mutationObserverRef.current.disconnect();
        mutationObserverRef.current = null;
      }
    };
  }, [performEditorSetup, markEditableElements, storeData, template, flowType]);

  const applyExistingCustomizations = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe?.contentDocument) return;
    const doc = iframe.contentDocument;

    existingCustomizations.forEach(c => {
      const el = doc.querySelector(c.selector) as HTMLElement;
      if (!el) return;
      if (c.type === 'text') {
        el.innerHTML = c.newValue;
      } else if (c.type === 'style' && c.property) {
        (el.style as any)[c.property] = c.newValue;
      } else if (c.type === 'visibility') {
        el.style.display = c.newValue === 'hidden' ? 'none' : '';
      }
    });
  }, [existingCustomizations]);

  const applyExistingInjectedComponents = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe?.contentDocument) return;
    const doc = iframe.contentDocument;
    const body = doc.body;
    const templateRoot = body.firstElementChild;
    if (!templateRoot) return;

    existingInjectedComponents.forEach(html => {
      const wrapper = doc.createElement('div');
      wrapper.innerHTML = html;
      const child = wrapper.firstElementChild;
      if (child) {
        templateRoot.insertBefore(child, templateRoot.firstChild);
      }
    });
  }, [existingInjectedComponents]);

  // ── Listen for revert and AI rewrite messages from iframe ──
  useEffect(() => {
    const handleMessage = async (e: MessageEvent) => {
      if (e.data?.type === 've-revert' && e.data?.veId) {
        revertElement(e.data.veId);
      }
      if (e.data?.type === 've-ai-rewrite' && e.data?.veId && e.data?.text) {
        const iframe = iframeRef.current;
        if (!iframe?.contentDocument) return;
        const el = iframe.contentDocument.querySelector(`[data-ve-editable="${e.data.veId}"]`) as HTMLElement;
        if (!el) return;

        // Show loading state on the button
        const btn = el.querySelector('.ve-ai-rewrite-btn') as HTMLElement;
        if (btn) btn.classList.add('ve-ai-loading');

        try {
          const res = await fetch('/api/ai/rewrite-section', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(buildRewriteBody(el, e.data.text)),
          });
          const data = await res.json();
          if (data.success && data.newText) {
            // Replace text in the element
            const veId = e.data.veId;
            captureOriginalSnapshot(el, veId);
            // Preserve the AI button, replace only text nodes
            el.childNodes.forEach(node => {
              if (node.nodeType === Node.TEXT_NODE) {
                node.textContent = data.newText;
              }
            });
            // If no text nodes were found (all wrapped in children), set textContent on first text-bearing child
            if (!Array.from(el.childNodes).some(n => n.nodeType === Node.TEXT_NODE && (n.textContent || '').trim().length > 2)) {
              // Fallback: find deepest text node
              const textNodes: Text[] = [];
              const tw = iframe.contentDocument!.createTreeWalker(el, NodeFilter.SHOW_TEXT);
              let tn: Text | null;
              while ((tn = tw.nextNode() as Text | null)) {
                if ((tn.textContent || '').trim().length > 2) textNodes.push(tn);
              }
              if (textNodes.length > 0) textNodes[0].textContent = data.newText;
              else el.textContent = data.newText;
            }
            setSelectedTextContent(data.newText);
            addCustomization({
              id: veId,
              selector: `[data-ve-editable="${veId}"]`,
              type: 'text',
              newValue: el.innerHTML,
              timestamp: Date.now(),
            });
            setUnsavedVeIds(prev => {
              const next = new Set(prev);
              next.add(veId);
              updateUnsavedTooltips(next);
              return next;
            });
          }
        } catch (err) {
          console.error('[AI Rewrite] Error:', err);
        } finally {
          if (btn) btn.classList.remove('ve-ai-loading');
        }
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [revertElement, storeData, captureOriginalSnapshot, addCustomization, updateUnsavedTooltips, buildRewriteBody]);

  // ── Keyboard shortcuts ──
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'z' && !e.shiftKey) { e.preventDefault(); handleUndo(); }
        if (e.key === 'z' && e.shiftKey) { e.preventDefault(); handleRedo(); }
        if (e.key === 'y') { e.preventDefault(); handleRedo(); }
        if (e.key === 's') { e.preventDefault(); handleSave(); }
      }
      if (e.key === 'Delete' && editorState.selectedElement) { deleteElement(); }
      if (e.key === 'Escape') {
        if (editorState.selectedElement) {
          const iframe = iframeRef.current;
          iframe?.contentDocument?.querySelectorAll('.ve-selected').forEach(el => el.classList.remove('ve-selected'));
          setEditorState(prev => ({ ...prev, selectedElement: null, activePanel: 'none' }));
          setSelectedElementInfo(null);
          setSelectedTextContent('');
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, editorState.selectedElement, handleUndo, handleRedo, handleSave, deleteElement, onClose]);

  if (!isOpen) return null;

  const previewUrl = flowType === 'pdp' 
    ? `/preview?template=${storeData.pdpTemplate || template}&type=pdp&ve=1`
    : `/preview?template=${template}&type=store&ve=1`;
  const hasSidePanel = editorState.activePanel !== 'none';

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 99999,
      background: '#0d0d12',
      display: 'flex', flexDirection: 'column',
      animation: 'veSlideIn 0.3s ease-out',
    }}>
      {/* ── Compact Top Bar ── */}
      <div style={{
        height: 48, background: '#0f0f14', borderBottom: '1px solid #1e1e28',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 14px', flexShrink: 0,
      }}>
        {/* Left: Back + Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button onClick={onClose} style={{
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 8, padding: '5px 10px', color: '#a1a1aa', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 5, transition: 'all 0.2s',
            fontSize: 11, fontWeight: 600,
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.15)'; e.currentTarget.style.color = '#c4b5fd'; e.currentTarget.style.borderColor = 'rgba(99,102,241,0.3)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#a1a1aa'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
            <span>{closeLabel}</span>
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.2))', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(99,102,241,0.2)' }}>
              <Sparkles size={13} style={{ color: '#a78bfa' }} />
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: 6, lineHeight: 1.2 }}>
                Studio Editor
                {editorState.isDirty && <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#f59e0b', display: 'inline-block' }} />}
              </div>
              <div style={{ fontSize: 10, color: '#52525b', fontWeight: 500 }}>
                Selecciona un elemento en la vista previa para personalizarlo
              </div>
            </div>
          </div>
        </div>

        {/* Right: Undo/Redo + Save + Publish */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {/* Compact undo/redo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 2, background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: 2 }}>
            <button onClick={handleUndo} disabled={editorState.undoStack.length === 0} style={{
              background: 'transparent', border: 'none', borderRadius: 6, padding: 5, cursor: editorState.undoStack.length === 0 ? 'not-allowed' : 'pointer',
              color: editorState.undoStack.length === 0 ? '#3f3f46' : '#a1a1aa', display: 'flex', transition: 'all 0.15s',
            }}
              onMouseEnter={e => { if (editorState.undoStack.length > 0) e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.color = editorState.undoStack.length === 0 ? '#3f3f46' : '#a1a1aa'; }}
            ><Undo2 size={14} /></button>
            <button onClick={handleRedo} disabled={editorState.redoStack.length === 0} style={{
              background: 'transparent', border: 'none', borderRadius: 6, padding: 5, cursor: editorState.redoStack.length === 0 ? 'not-allowed' : 'pointer',
              color: editorState.redoStack.length === 0 ? '#3f3f46' : '#a1a1aa', display: 'flex', transition: 'all 0.15s',
            }}
              onMouseEnter={e => { if (editorState.redoStack.length > 0) e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.color = editorState.redoStack.length === 0 ? '#3f3f46' : '#a1a1aa'; }}
            ><Redo2 size={14} /></button>
          </div>

          {editorState.selectedElement && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 2, background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: 2 }}>
              {unsavedVeIds.has(editorState.selectedElement.getAttribute('data-ve-editable') || '') && (
                <button onClick={() => revertElement(editorState.selectedElement!.getAttribute('data-ve-editable') || '')} style={{
                  background: 'transparent', border: 'none', borderRadius: 6, padding: 5, cursor: 'pointer',
                  color: '#a1a1aa', display: 'flex', transition: 'all 0.15s',
                }}><RotateCcw size={14} /></button>
              )}
              <button onClick={deleteElement} style={{
                background: 'transparent', border: 'none', borderRadius: 6, padding: 5, cursor: 'pointer',
                color: '#ef4444', display: 'flex', transition: 'all 0.15s', opacity: 0.7,
              }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '1'; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '0.7'; }}
              ><Trash2 size={14} /></button>
            </div>
          )}

          {saveSuccess && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#22c55e', fontSize: 11, fontWeight: 600 }}>
              <Check size={12} /> OK
            </div>
          )}

          {editorState.customizations.length > 0 && (
            <span style={{ fontSize: 10, color: '#52525b', fontWeight: 500 }}>{editorState.customizations.length} cambios</span>
          )}

          <button
            onClick={handleSave}
            disabled={!editorState.isDirty || editorState.isSaving}
            style={{
              background: editorState.isDirty ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'rgba(255,255,255,0.06)',
              border: 'none', borderRadius: 8, padding: '6px 14px',
              color: editorState.isDirty ? '#fff' : '#52525b',
              fontSize: 12, fontWeight: 700, cursor: editorState.isDirty ? 'pointer' : 'not-allowed',
              display: 'flex', alignItems: 'center', gap: 5,
              transition: 'all 0.2s',
              opacity: editorState.isSaving ? 0.7 : 1,
              boxShadow: editorState.isDirty ? '0 2px 10px rgba(99,102,241,0.25)' : 'none',
            }}
          >
            {editorState.isSaving ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
            {editorState.isSaving ? 'Guardando...' : 'Guardar'}
          </button>

          {onPublish && (
            <div style={{ position: 'relative', display: 'inline-flex' }}>
              <button
                onClick={() => {
                  if (editorState.isDirty) return; // Block if unsaved
                  onPublish();
                }}
                style={{
                  background: editorState.isDirty
                    ? 'rgba(255,255,255,0.06)'
                    : 'linear-gradient(135deg, #10b981, #059669)',
                  border: editorState.isDirty ? '1px solid rgba(239,68,68,0.3)' : 'none',
                  borderRadius: 8, padding: '6px 14px',
                  color: editorState.isDirty ? '#ef4444' : '#fff',
                  fontSize: 12, fontWeight: 700,
                  cursor: editorState.isDirty ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', gap: 5,
                  transition: 'all 0.2s',
                  boxShadow: editorState.isDirty ? 'none' : '0 2px 10px rgba(16,185,129,0.25)',
                  opacity: editorState.isDirty ? 0.7 : 1,
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                Publicar
              </button>
              {editorState.isDirty && (
                <div style={{
                  position: 'absolute', top: '100%', right: 0, marginTop: 6,
                  background: 'rgba(220,38,38,0.95)', backdropFilter: 'blur(8px)',
                  color: '#fff', fontSize: 11, fontWeight: 700,
                  padding: '8px 12px', borderRadius: 8, whiteSpace: 'nowrap',
                  boxShadow: '0 4px 15px rgba(220,38,38,0.4)',
                  zIndex: 200, pointerEvents: 'none',
                  animation: 'veFabPanelIn 0.2s ease-out',
                  lineHeight: 1.4,
                }}>
                  Guardá los cambios antes de publicar
                  <div style={{ position: 'absolute', top: -4, right: 14, width: 8, height: 8, background: 'rgba(220,38,38,0.95)', transform: 'rotate(45deg)' }} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Main Content ── */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', position: 'relative' }}>

        {/* ── Floating Tools FAB (right side, always visible) ── */}
        <div style={{ position: 'absolute', top: 16, right: 16, zIndex: 100, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
          {/* FAB Button */}
          <button
            onClick={() => setShowToolsFab(prev => !prev)}
            style={{
              width: 44, height: 44, borderRadius: 14,
              background: showToolsFab
                ? 'linear-gradient(135deg, #6366f1, #8b5cf6)'
                : 'rgba(15,15,20,0.85)',
              border: showToolsFab
                ? '1px solid rgba(139,92,246,0.5)'
                : '1px solid rgba(255,255,255,0.1)',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.25s cubic-bezier(0.4,0,0.2,1)',
              boxShadow: showToolsFab
                ? '0 8px 25px rgba(99,102,241,0.4), 0 0 0 1px rgba(99,102,241,0.2)'
                : '0 4px 20px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)',
              backdropFilter: 'blur(12px)',
              position: 'relative',
              overflow: 'hidden',
            }}
            onMouseEnter={e => { if (!showToolsFab) { e.currentTarget.style.background = 'rgba(99,102,241,0.2)'; e.currentTarget.style.borderColor = 'rgba(99,102,241,0.4)'; } }}
            onMouseLeave={e => { if (!showToolsFab) { e.currentTarget.style.background = 'rgba(15,15,20,0.85)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; } }}
          >
            {/* Custom CSS icon: layered design tool */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ transition: 'transform 0.25s', transform: showToolsFab ? 'rotate(45deg)' : 'rotate(0deg)' }}>
              {showToolsFab ? (
                <path d="M18 6L6 18M6 6l12 12" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
              ) : (
                <>
                  <rect x="3" y="3" width="7" height="7" rx="2" stroke="#a78bfa" strokeWidth="1.5" fill="rgba(99,102,241,0.15)"/>
                  <rect x="14" y="3" width="7" height="7" rx="2" stroke="#818cf8" strokeWidth="1.5" fill="rgba(129,140,248,0.1)"/>
                  <rect x="3" y="14" width="7" height="7" rx="2" stroke="#818cf8" strokeWidth="1.5" fill="rgba(129,140,248,0.1)"/>
                  <rect x="14" y="14" width="7" height="7" rx="2" stroke="#a78bfa" strokeWidth="1.5" fill="rgba(99,102,241,0.15)"/>
                  <circle cx="12" cy="12" r="2.5" fill="#a78bfa" opacity="0.6"/>
                </>
              )}
            </svg>
            {/* Active panel indicator dot */}
            {(editorState.activePanel !== 'none') && !showToolsFab && (
              <span style={{ position: 'absolute', top: 6, right: 6, width: 7, height: 7, borderRadius: '50%', background: '#a78bfa', border: '1.5px solid #0f0f14', animation: 'veFabDot 2s ease-in-out infinite' }} />
            )}
          </button>

          {/* Floating Tools Panel */}
          {showToolsFab && (
            <div style={{
              background: 'rgba(15,15,22,0.95)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 16, padding: 6, backdropFilter: 'blur(20px)',
              boxShadow: '0 12px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(99,102,241,0.1)',
              display: 'flex', flexDirection: 'column', gap: 2,
              animation: 'veFabPanelIn 0.2s ease-out',
              minWidth: 180,
            }}>
              <FabToolItem
                icon={<Type size={15} />}
                label="Tipografía"
                sublabel="Fuentes, tamaños, colores"
                active={editorState.activePanel === 'text'}
                color="#6366f1"
                onClick={() => { setEditorState(p => ({ ...p, activePanel: p.activePanel === 'text' ? 'none' : 'text' })); setShowComponentPicker(false); }}
              />
              <FabToolItem
                icon={<Palette size={15} />}
                label="Estilo"
                sublabel="Fondos, bordes, sombras"
                active={editorState.activePanel === 'style'}
                color="#8b5cf6"
                onClick={() => { setEditorState(p => ({ ...p, activePanel: p.activePanel === 'style' ? 'none' : 'style' })); setShowComponentPicker(false); }}
              />
              <FabToolItem
                icon={<Image size={15} />}
                label="Imágenes"
                sublabel="Fotos, banners, logos"
                active={editorState.activePanel === 'image'}
                color="#a78bfa"
                onClick={() => { setEditorState(p => ({ ...p, activePanel: p.activePanel === 'image' ? 'none' : 'image' })); setShowComponentPicker(false); }}
              />
              <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '2px 8px' }} />
              <button
                onClick={handleRewriteAll}
                disabled={aiRewritingAll}
                style={{
                  background: aiRewritingAll ? 'rgba(245,158,11,0.1)' : 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(239,68,68,0.12))',
                  border: '1px solid rgba(245,158,11,0.25)',
                  borderRadius: 10, padding: '10px 12px',
                  cursor: aiRewritingAll ? 'wait' : 'pointer',
                  display: 'flex', alignItems: 'center', gap: 10,
                  transition: 'all 0.15s', textAlign: 'left' as const, width: '100%',
                }}
              >
                <div style={{
                  width: 30, height: 30, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(245,158,11,0.2)', color: '#f59e0b',
                }}>
                  {aiRewritingAll ? (
                    <Loader2 size={15} className="animate-spin" />
                  ) : (
                    <Sparkles size={15} />
                  )}
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: aiRewritingAll ? '#f59e0b' : '#fbbf24', lineHeight: 1.2 }}>
                    {aiRewritingAll ? 'Reescribiendo...' : 'Reescribir toda la página'}
                  </div>
                  <div style={{ fontSize: 9, color: '#78716c', fontWeight: 500, lineHeight: 1.3 }}>
                    IA reescribe todos los textos
                  </div>
                </div>
              </button>
            </div>
          )}
        </div>

        {/* ── Side Panel (slides in from left when a tool is active) ── */}
        {hasSidePanel && (
          <div style={{
            width: 280, background: 'rgba(16,16,24,0.98)', borderRight: '1px solid #1e1e28',
            overflowY: 'auto', flexShrink: 0, display: 'flex', flexDirection: 'column',
            paddingTop: 6, animation: 'veSidePanelIn 0.2s ease-out',
            backdropFilter: 'blur(12px)',
          }} className="custom-scrollbar">

            {/* ── Selected Element Info Card ── */}
            {editorState.selectedElement && selectedElementInfo && (
              <SelectedElementCard
                info={selectedElementInfo}
                textContent={selectedTextContent}
                onTextChange={applyTextFromPanel}
                isTextType={selectedElementInfo.type === 'text'}
                veId={editorState.selectedElement.getAttribute('data-ve-editable') || ''}
                isUnsaved={unsavedVeIds.has(editorState.selectedElement.getAttribute('data-ve-editable') || '')}
                onRevertElement={revertElement}
                onAIRewrite={selectedElementInfo.type === 'text' ? handleAIRewrite : undefined}
                aiRewriting={aiRewriting}
              />
            )}

            {/* Text Panel */}
            {editorState.activePanel === 'text' && editorState.selectedElement && (
              <TextPanel
                styles={selectedElementStyles}
                originalStyles={originalElementStyles}
                onApply={applyStyle}
                veId={editorState.selectedElement.getAttribute('data-ve-editable') || ''}
                isUnsaved={unsavedVeIds.has(editorState.selectedElement.getAttribute('data-ve-editable') || '')}
                onRevertElement={revertElement}
              />
            )}
            {editorState.activePanel === 'text' && !editorState.selectedElement && (
              <EmptyPanelMessage panelType="text" />
            )}

            {/* Style Panel */}
            {editorState.activePanel === 'style' && editorState.selectedElement && (
              <StylePanel
                element={editorState.selectedElement}
                onApply={applyStyle}
                iframeRef={iframeRef}
                originalValues={originalStylePanelValues}
                veId={editorState.selectedElement.getAttribute('data-ve-editable') || ''}
                isUnsaved={unsavedVeIds.has(editorState.selectedElement.getAttribute('data-ve-editable') || '')}
                onRevertElement={revertElement}
              />
            )}
            {editorState.activePanel === 'style' && !editorState.selectedElement && (
              <EmptyPanelMessage panelType="style" />
            )}

            {/* Image Panel */}
            {editorState.activePanel === 'image' && editorState.selectedElement && (
              <ImagePanel 
                currentSrc={selectedImageSrc} 
                onApply={applyImageChange}
                veId={editorState.selectedElement.getAttribute('data-ve-editable') || ''}
                isUnsaved={unsavedVeIds.has(editorState.selectedElement.getAttribute('data-ve-editable') || '')}
                onRevertElement={revertElement}
              />
            )}
            {editorState.activePanel === 'image' && !editorState.selectedElement && (
              <EmptyPanelMessage panelType="image" />
            )}

            {/* ── Compact Save (inside side panel) ── */}
            {editorState.isDirty && (
              <div style={{
                padding: 10, borderTop: '1px solid rgba(255,255,255,0.05)',
                background: 'rgba(16,16,24,0.98)', marginTop: 'auto', flexShrink: 0,
              }}>
                {unsavedVeIds.size > 0 && (
                  <div style={{
                    fontSize: 10, color: '#f59e0b', fontWeight: 600, marginBottom: 6,
                    display: 'flex', alignItems: 'center', gap: 4,
                    padding: '4px 8px', background: 'rgba(245,158,11,0.06)',
                    borderRadius: 6, border: '1px solid rgba(245,158,11,0.1)',
                  }}>
                    ⚠ {unsavedVeIds.size} sin guardar
                  </div>
                )}
                <button
                  onClick={handleSave}
                  disabled={editorState.isSaving}
                  style={{
                    width: '100%', padding: '8px 0',
                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    border: 'none', borderRadius: 8, color: '#fff',
                    fontSize: 12, fontWeight: 700, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
                    boxShadow: '0 2px 10px rgba(99,102,241,0.25)',
                    transition: 'all 0.2s',
                    opacity: editorState.isSaving ? 0.7 : 1,
                  }}
                >
                  {editorState.isSaving ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
                  {editorState.isSaving ? 'Guardando...' : 'Guardar cambios'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── Preview iframe ── */}
        <div style={{ flex: 1, position: 'relative', background: '#1a1a24' }}>
          {!iframeLoaded && (
            <div style={{
              position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: 16, color: '#a1a1aa',
            }}>
              <Loader2 size={32} className="animate-spin" style={{ color: '#6366f1' }} />
              <div style={{ fontSize: 14, fontWeight: 600 }}>Cargando editor visual...</div>
              <div style={{ fontSize: 12, color: '#71717a' }}>Preparando tu tienda para edición</div>
            </div>
          )}

          <iframe
            ref={iframeRef}
            src={previewUrl}
            onLoad={handleIframeLoad}
            style={{
              width: '100%', height: '100%', border: 'none',
              opacity: iframeLoaded ? 1 : 0,
              transition: 'opacity 0.3s ease',
            }}
          />
        </div>
      </div>

      {/* ── Compact Status Bar ── */}
      <div style={{
        height: 32, background: '#0f0f14', borderTop: '1px solid #1e1e28',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 14px', fontSize: 10, color: '#52525b', flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span>{flowType === 'pdp' ? (storeData.pdpTemplate || template) : template}</span>
          <span style={{ color: '#3f3f46' }}>·</span>
          <span>{editorState.customizations.length} ediciones</span>
          {unsavedVeIds.size > 0 && (
            <span style={{ color: '#f59e0b', fontWeight: 600 }}>⚠ {unsavedVeIds.size} pendientes</span>
          )}
          {editingText && <span style={{ color: '#f59e0b', fontWeight: 600 }}>✏ Editando...</span>}
        </div>
        <span style={{ color: '#3f3f46' }}>⌘S guardar · ⌘Z deshacer · Esc salir</span>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes veSlideIn {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes veFabPanelIn {
          from { opacity: 0; transform: translateY(-8px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes veSidePanelIn {
          from { opacity: 0; transform: translateX(-12px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes veFabDot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @keyframes veBadgePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .custom-scrollbar select {
          background-color: #1e1e2a !important;
          color: #e4e4e7 !important;
        }
        .custom-scrollbar select option {
          background-color: #1e1e2a !important;
          color: #e4e4e7 !important;
          padding: 8px 10px;
        }
        .custom-scrollbar select option:checked {
          background-color: #6366f1 !important;
          color: #fff !important;
        }
        .custom-scrollbar select:focus {
          border-color: rgba(99,102,241,0.5) !important;
          outline: none;
        }
      `}</style>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// Sub-Components
// ═══════════════════════════════════════════════════════════════

// ── Floating FAB Tool Item ──
function FabToolItem({ icon, label, sublabel, active, color, onClick }: {
  icon: React.ReactNode; label: string; sublabel: string; active?: boolean; color: string; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        background: active ? `${color}18` : 'transparent',
        border: 'none', borderRadius: 10, padding: '8px 12px',
        cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10,
        transition: 'all 0.15s', textAlign: 'left',
        borderLeft: active ? `2px solid ${color}` : '2px solid transparent',
      }}
      onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
      onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
    >
      <div style={{
        width: 30, height: 30, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: active ? `${color}25` : 'rgba(255,255,255,0.05)',
        color: active ? color : '#a1a1aa',
        transition: 'all 0.15s',
      }}>{icon}</div>
      <div>
        <div style={{ fontSize: 12, fontWeight: 600, color: active ? '#fff' : '#d4d4d8', lineHeight: 1.2 }}>{label}</div>
        <div style={{ fontSize: 9, color: '#52525b', fontWeight: 500, lineHeight: 1.3 }}>{sublabel}</div>
      </div>
    </button>
  );
}

function ToolbarButton({ icon, label, active, disabled, danger, onClick }: {
  icon: React.ReactNode; label: string; active?: boolean; disabled?: boolean; danger?: boolean; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        background: active ? 'rgba(99,102,241,0.2)' : 'transparent',
        border: active ? '1px solid rgba(99,102,241,0.3)' : '1px solid transparent',
        borderRadius: 8, padding: '6px 10px',
        color: danger ? '#ef4444' : active ? '#a78bfa' : disabled ? '#3f3f46' : '#a1a1aa',
        cursor: disabled ? 'not-allowed' : 'pointer',
        display: 'flex', alignItems: 'center', gap: 5,
        fontSize: 12, fontWeight: 600, transition: 'all 0.15s',
        opacity: disabled ? 0.4 : 1,
      }}
    >
      {icon}
      <span className="hidden lg:inline">{label}</span>
    </button>
  );
}

// ── Selected Element Info Card ──
function SelectedElementCard({ info, textContent, onTextChange, isTextType, veId, isUnsaved, onRevertElement, onAIRewrite, aiRewriting }: {
  info: { tag: string; type: string; label: string };
  textContent: string;
  onTextChange: (text: string) => void;
  isTextType: boolean;
  veId: string;
  isUnsaved: boolean;
  onRevertElement: (veId: string) => void;
  onAIRewrite?: () => void;
  aiRewriting?: boolean;
}) {
  const typeColors: Record<string, string> = {
    text: '#6366f1',
    section: '#22c55e',
    image: '#f59e0b',
    component: '#ec4899',
  };

  const typeLabels: Record<string, string> = {
    text: '📝 Texto',
    section: '📦 Sección',
    image: '🖼️ Imagen',
    component: '✨ Componente',
  };

  return (
    <div style={{
      padding: 16, borderBottom: '1px solid rgba(255,255,255,0.06)',
      background: 'rgba(99, 102, 241, 0.04)',
    }}>
      {/* Element type badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <div style={{
          background: typeColors[info.type] || '#6366f1',
          color: '#fff', fontSize: 10, fontWeight: 700,
          padding: '3px 10px', borderRadius: 20,
          letterSpacing: '0.03em',
        }}>
          {info.tag}
        </div>
        <div style={{ fontSize: 12, color: '#a1a1aa', fontWeight: 600, flex: 1 }}>
          {typeLabels[info.type] || info.label}
        </div>
        {isUnsaved && (
          <RevertButton onClick={() => onRevertElement(veId)} tooltip="Revierte TODOS los cambios de este elemento al estado original" />
        )}
      </div>

      {/* What you can do hint */}
      <div style={{
        fontSize: 11, color: '#71717a', lineHeight: 1.5, marginBottom: 10,
        padding: '8px 10px', background: 'rgba(255,255,255,0.03)',
        borderRadius: 8, border: '1px solid rgba(255,255,255,0.04)',
      }}>
        <Info size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4, color: '#6366f1' }} />
        {info.type === 'text'
          ? 'Edita el texto abajo — los cambios se reflejan en tiempo real en la tienda.'
          : info.type === 'section'
            ? 'Cambia el fondo, gradiente, bordes y sombras de esta sección.'
            : info.type === 'image'
              ? 'Sube una nueva imagen o pega una URL para reemplazar la imagen seleccionada.'
              : 'Seleccionaste un elemento. Usa las herramientas del panel para modificarlo.'}
      </div>

      {/* Editable text area — real-time changes */}
      {isTextType && (
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#71717a', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Contenido del texto
          </div>
          <textarea
            value={textContent}
            onChange={e => onTextChange(e.target.value)}
            placeholder="Escribe aquí el nuevo texto..."
            rows={3}
            style={{
              width: '100%', padding: '10px 12px', borderRadius: 10,
              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(99,102,241,0.2)',
              color: '#e4e4e7', fontSize: 13, outline: 'none', resize: 'vertical',
              lineHeight: 1.5, fontFamily: 'inherit',
              transition: 'border-color 0.2s',
            }}
            onFocus={e => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.5)'; }}
            onBlur={e => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.2)'; }}
          />
          {/* AI Rewrite Button */}
          {onAIRewrite && (
            <button
              onClick={onAIRewrite}
              disabled={aiRewriting || !textContent.trim()}
              style={{
                width: '100%', marginTop: 8, padding: '9px 12px', borderRadius: 10,
                background: aiRewriting ? 'rgba(139,92,246,0.1)' : 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(99,102,241,0.15))',
                border: '1px solid rgba(139,92,246,0.25)',
                color: aiRewriting ? '#a78bfa' : '#c4b5fd',
                fontSize: 11, fontWeight: 700, cursor: aiRewriting ? 'wait' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                transition: 'all 0.2s',
                opacity: (!textContent.trim()) ? 0.4 : 1,
              }}
            >
              {aiRewriting ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}><path d="M21 12a9 9 0 11-6.219-8.56"/></svg>
                  Reescribiendo...
                </>
              ) : (
                <>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
                  Reescribir con IA — Gs. 1.000
                </>
              )}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ── Empty Panel Message — specific per panel type ──
function EmptyPanelMessage({ panelType }: { panelType: 'text' | 'style' | 'image' }) {
  if (panelType === 'text') {
    return (
      <div style={{ padding: 20, color: '#a1a1aa' }}>
        {/* Header */}
        <div style={{
          textAlign: 'center', marginBottom: 20, padding: '20px 16px',
          background: 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(139,92,246,0.06))',
          borderRadius: 14, border: '1px solid rgba(99,102,241,0.12)',
        }}>
          <div style={{ fontSize: 32, marginBottom: 10 }}>✏️</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#e4e4e7', marginBottom: 6 }}>
            Tipografía y Texto
          </div>
          <div style={{ fontSize: 12, color: '#a1a1aa', lineHeight: 1.5 }}>
            Aquí puedes editar cualquier texto de tu tienda: títulos, descripciones, botones, enlaces y más.
          </div>
        </div>

        {/* What is this for */}
        <div style={{
          padding: '14px 16px', borderRadius: 12, marginBottom: 14,
          background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#e4e4e7', marginBottom: 8 }}>
            ¿Para qué sirve esta herramienta?
          </div>
          <div style={{ fontSize: 12, lineHeight: 1.6, color: '#a1a1aa' }}>
            Con esta herramienta puedes cambiar <span style={{ color: '#a78bfa', fontWeight: 600 }}>lo que dice</span> cualquier texto de tu tienda y también <span style={{ color: '#a78bfa', fontWeight: 600 }}>cómo se ve</span> ese texto: la fuente, el tamaño, si es negrita, el color, la alineación, etc.
          </div>
        </div>

        {/* Step by step */}
        <div style={{
          padding: '14px 16px', borderRadius: 12, marginBottom: 14,
          background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#e4e4e7', marginBottom: 10 }}>
            ¿Cómo se usa? Paso a paso:
          </div>
          <div style={{ fontSize: 12, lineHeight: 1.7, color: '#a1a1aa' }}>
            <div style={{ marginBottom: 6, display: 'flex', gap: 8 }}>
              <span style={{ background: '#6366f1', color: '#fff', borderRadius: 6, padding: '1px 7px', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>1</span>
              <span>Mira tu tienda a la derecha y busca el texto que quieras cambiar (un título, un párrafo, un botón, etc.)</span>
            </div>
            <div style={{ marginBottom: 6, display: 'flex', gap: 8 }}>
              <span style={{ background: '#6366f1', color: '#fff', borderRadius: 6, padding: '1px 7px', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>2</span>
              <span>Haz clic directamente sobre ese texto en la tienda</span>
            </div>
            <div style={{ marginBottom: 6, display: 'flex', gap: 8 }}>
              <span style={{ background: '#6366f1', color: '#fff', borderRadius: 6, padding: '1px 7px', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>3</span>
              <span>Se marcará con un borde morado y aquí aparecerán todas las opciones para editarlo</span>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <span style={{ background: '#6366f1', color: '#fff', borderRadius: 6, padding: '1px 7px', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>4</span>
              <span>Cambia lo que necesites y haz clic en <span style={{ color: '#a78bfa', fontWeight: 600 }}>Guardar</span></span>
            </div>
          </div>
        </div>

        {/* Examples */}
        <div style={{
          padding: '14px 16px', borderRadius: 12, marginBottom: 14,
          background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#e4e4e7', marginBottom: 8 }}>
            Ejemplos de lo que puedes hacer:
          </div>
          <div style={{ fontSize: 12, lineHeight: 1.7, color: '#a1a1aa' }}>
            <div style={{ marginBottom: 4 }}>• Cambiar el nombre de tu tienda por otro</div>
            <div style={{ marginBottom: 4 }}>• Cambiar la descripción o eslogan</div>
            <div style={{ marginBottom: 4 }}>• Cambiar la fuente (tipografía) de un título</div>
            <div style={{ marginBottom: 4 }}>• Hacer un texto más grande o más pequeño</div>
            <div style={{ marginBottom: 4 }}>• Poner un texto en negrita</div>
            <div style={{ marginBottom: 4 }}>• Cambiar el color de un texto</div>
            <div>• Centrar o alinear un texto</div>
          </div>
        </div>

        {/* Try it prompt */}
        <div style={{
          padding: '14px 16px', borderRadius: 12,
          background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(139,92,246,0.08))',
          border: '1px solid rgba(99,102,241,0.15)',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#c4b5fd', marginBottom: 4 }}>
            🎯 ¿Querés probar?
          </div>
          <div style={{ fontSize: 12, color: '#a1a1aa', lineHeight: 1.5 }}>
            Haz clic en cualquier texto de tu tienda a la derecha. Por ejemplo, haz clic en el <span style={{ color: '#a78bfa', fontWeight: 600 }}>nombre de tu tienda</span> o en algún <span style={{ color: '#a78bfa', fontWeight: 600 }}>título</span> que veas.
          </div>
        </div>
      </div>
    );
  }

  // Style panel
  return (
    <div style={{ padding: 20, color: '#a1a1aa' }}>
      {/* Header */}
      <div style={{
        textAlign: 'center', marginBottom: 20, padding: '20px 16px',
        background: 'linear-gradient(135deg, rgba(34,197,94,0.08), rgba(16,185,129,0.06))',
        borderRadius: 14, border: '1px solid rgba(34,197,94,0.12)',
      }}>
        <div style={{ fontSize: 32, marginBottom: 10 }}>🎨</div>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#e4e4e7', marginBottom: 6 }}>
          Estilo Visual
        </div>
        <div style={{ fontSize: 12, color: '#a1a1aa', lineHeight: 1.5 }}>
          Aquí puedes cambiar la apariencia visual de las secciones de tu tienda: fondos, colores, bordes, sombras y más.
        </div>
      </div>

      {/* What is this for */}
      <div style={{
        padding: '14px 16px', borderRadius: 12, marginBottom: 14,
        background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#e4e4e7', marginBottom: 8 }}>
          ¿Para qué sirve esta herramienta?
        </div>
        <div style={{ fontSize: 12, lineHeight: 1.6, color: '#a1a1aa' }}>
          Esta herramienta es para cambiar <span style={{ color: '#4ade80', fontWeight: 600 }}>el fondo y la apariencia</span> de secciones completas de tu tienda. No es para cambiar textos (para eso usa "Tipografía y Texto"). Aquí cambias cómo se ve <span style={{ color: '#4ade80', fontWeight: 600 }}>por detrás</span>: el color de fondo, degradados, bordes, sombras, etc.
        </div>
      </div>

      {/* Step by step */}
      <div style={{
        padding: '14px 16px', borderRadius: 12, marginBottom: 14,
        background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#e4e4e7', marginBottom: 10 }}>
          ¿Cómo se usa? Paso a paso:
        </div>
        <div style={{ fontSize: 12, lineHeight: 1.7, color: '#a1a1aa' }}>
          <div style={{ marginBottom: 6, display: 'flex', gap: 8 }}>
            <span style={{ background: '#22c55e', color: '#fff', borderRadius: 6, padding: '1px 7px', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>1</span>
            <span>Mira tu tienda a la derecha y busca una sección que quieras cambiar (el encabezado, una franja de color, el pie de página, etc.)</span>
          </div>
          <div style={{ marginBottom: 6, display: 'flex', gap: 8 }}>
            <span style={{ background: '#22c55e', color: '#fff', borderRadius: 6, padding: '1px 7px', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>2</span>
            <span>Haz clic sobre esa sección en la tienda</span>
          </div>
          <div style={{ marginBottom: 6, display: 'flex', gap: 8 }}>
            <span style={{ background: '#22c55e', color: '#fff', borderRadius: 6, padding: '1px 7px', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>3</span>
            <span>Se marcará con un borde y aquí aparecerán las opciones de estilo</span>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <span style={{ background: '#22c55e', color: '#fff', borderRadius: 6, padding: '1px 7px', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>4</span>
            <span>Cambia colores, gradientes o sombras y haz clic en <span style={{ color: '#4ade80', fontWeight: 600 }}>Guardar</span></span>
          </div>
        </div>
      </div>

      {/* Examples */}
      <div style={{
        padding: '14px 16px', borderRadius: 12, marginBottom: 14,
        background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#e4e4e7', marginBottom: 8 }}>
          Ejemplos de lo que puedes hacer:
        </div>
        <div style={{ fontSize: 12, lineHeight: 1.7, color: '#a1a1aa' }}>
          <div style={{ marginBottom: 4 }}>• Cambiar el color de fondo del encabezado</div>
          <div style={{ marginBottom: 4 }}>• Poner un degradado de colores en una sección</div>
          <div style={{ marginBottom: 4 }}>• Redondear las esquinas de un bloque</div>
          <div style={{ marginBottom: 4 }}>• Agregar una sombra para que una sección se vea elevada</div>
          <div style={{ marginBottom: 4 }}>• Cambiar la transparencia de un elemento</div>
          <div>• Agregar más espacio interno dentro de una sección</div>
        </div>
      </div>

      {/* Try it prompt */}
      <div style={{
        padding: '14px 16px', borderRadius: 12,
        background: 'linear-gradient(135deg, rgba(34,197,94,0.1), rgba(16,185,129,0.08))',
        border: '1px solid rgba(34,197,94,0.15)',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#86efac', marginBottom: 4 }}>
          🎯 ¿Querés probar?
        </div>
        <div style={{ fontSize: 12, color: '#a1a1aa', lineHeight: 1.5 }}>
          Haz clic en una sección grande de tu tienda a la derecha. Por ejemplo, haz clic en el <span style={{ color: '#4ade80', fontWeight: 600 }}>encabezado</span> (la parte de arriba) o en el <span style={{ color: '#4ade80', fontWeight: 600 }}>pie de página</span> (la parte de abajo).
        </div>
      </div>
    </div>
  );

  // Image panel
  if (panelType === 'image') {
    return (
      <div style={{ padding: 20, color: '#a1a1aa' }}>
        {/* Header */}
        <div style={{
          textAlign: 'center', marginBottom: 20, padding: '20px 16px',
          background: 'linear-gradient(135deg, rgba(245,158,11,0.08), rgba(251,191,36,0.06))',
          borderRadius: 14, border: '1px solid rgba(245,158,11,0.12)',
        }}>
          <div style={{ fontSize: 32, marginBottom: 10 }}>🖼️</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#e4e4e7', marginBottom: 6 }}>
            Cambiar Imágenes
          </div>
          <div style={{ fontSize: 12, color: '#a1a1aa', lineHeight: 1.5 }}>
            Aquí puedes cambiar cualquier imagen de tu tienda: fotos de productos, banners, logos, testimonios y más.
          </div>
        </div>

        {/* What is this for */}
        <div style={{
          padding: '14px 16px', borderRadius: 12, marginBottom: 14,
          background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#e4e4e7', marginBottom: 8 }}>
            ¿Para qué sirve esta herramienta?
          </div>
          <div style={{ fontSize: 12, lineHeight: 1.6, color: '#a1a1aa' }}>
            Con esta herramienta puedes <span style={{ color: '#fbbf24', fontWeight: 600 }}>reemplazar cualquier imagen</span> de tu tienda. Puedes subir una nueva imagen desde tu computadora o pegar un enlace (URL) de una imagen de internet.
          </div>
        </div>

        {/* Step by step */}
        <div style={{
          padding: '14px 16px', borderRadius: 12, marginBottom: 14,
          background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#e4e4e7', marginBottom: 10 }}>
            ¿Cómo se usa? Paso a paso:
          </div>
          <div style={{ fontSize: 12, lineHeight: 1.7, color: '#a1a1aa' }}>
            <div style={{ marginBottom: 6, display: 'flex', gap: 8 }}>
              <span style={{ background: '#f59e0b', color: '#fff', borderRadius: 6, padding: '1px 7px', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>1</span>
              <span>Haz clic en cualquier imagen de tu tienda (producto, banner, logo, etc.)</span>
            </div>
            <div style={{ marginBottom: 6, display: 'flex', gap: 8 }}>
              <span style={{ background: '#f59e0b', color: '#fff', borderRadius: 6, padding: '1px 7px', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>2</span>
              <span>La imagen se marcará con un borde morado</span>
            </div>
            <div style={{ marginBottom: 6, display: 'flex', gap: 8 }}>
              <span style={{ background: '#f59e0b', color: '#fff', borderRadius: 6, padding: '1px 7px', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>3</span>
              <span>Elige si quieres subir desde tu computadora o pegar una URL</span>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <span style={{ background: '#f59e0b', color: '#fff', borderRadius: 6, padding: '1px 7px', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>4</span>
              <span>La nueva imagen se aplicará inmediatamente en ese lugar</span>
            </div>
          </div>
        </div>

        {/* Examples */}
        <div style={{
          padding: '14px 16px', borderRadius: 12, marginBottom: 14,
          background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#e4e4e7', marginBottom: 8 }}>
            Ejemplos de lo que puedes cambiar:
          </div>
          <div style={{ fontSize: 12, lineHeight: 1.7, color: '#a1a1aa' }}>
            <div style={{ marginBottom: 4 }}>• Foto principal de un producto</div>
            <div style={{ marginBottom: 4 }}>• Imagen de banner o encabezado</div>
            <div style={{ marginBottom: 4 }}>• Logo de la tienda</div>
            <div style={{ marginBottom: 4 }}>• Imágenes de testimonios</div>
            <div style={{ marginBottom: 4 }}>• Thumbnails de productos</div>
            <div>• Imágenes de fondo o decorativas</div>
          </div>
        </div>

        {/* Try it prompt */}
        <div style={{
          padding: '14px 16px', borderRadius: 12,
          background: 'linear-gradient(135deg, rgba(245,158,11,0.1), rgba(251,191,36,0.08))',
          border: '1px solid rgba(245,158,11,0.15)',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#fbbf24', marginBottom: 4 }}>
            🎯 ¿Querés probar?
          </div>
          <div style={{ fontSize: 12, color: '#a1a1aa', lineHeight: 1.5 }}>
            Haz clic en cualquier imagen de tu tienda a la derecha. Por ejemplo, haz clic en una <span style={{ color: '#fbbf24', fontWeight: 600 }}>foto de producto</span> o en el <span style={{ color: '#fbbf24', fontWeight: 600 }}>banner principal</span>.
          </div>
        </div>
      </div>
    );
  }

  return null;
}

// ── Revert Button ──
function RevertButton({ onClick, tooltip }: { onClick: () => void; tooltip?: string }) {
  return (
    <Tooltip text="Revertir" description={tooltip || 'Vuelve al valor original antes de tus cambios'} position="top">
      <button
        onClick={onClick}
        style={{
          background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)',
          borderRadius: 6, padding: '3px 8px', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 4,
          color: '#f87171', fontSize: 10, fontWeight: 600,
          transition: 'all 0.15s',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.2)'; e.currentTarget.style.borderColor = 'rgba(239,68,68,0.4)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.1)'; e.currentTarget.style.borderColor = 'rgba(239,68,68,0.2)'; }}
      >
        <RotateCcw size={10} /> Revertir
      </button>
    </Tooltip>
  );
}

// ── Text Panel with tooltips on every control ──
function TextPanel({ styles, originalStyles, onApply, veId, isUnsaved, onRevertElement }: { styles: Partial<TextEditorOptions>; originalStyles: Partial<TextEditorOptions>; onApply: (prop: string, val: string) => void; veId: string; isUnsaved: boolean; onRevertElement: (veId: string) => void }) {
  const revertFont = () => { if (originalStyles.fontFamily) onApply('fontFamily', originalStyles.fontFamily); };
  const revertSize = () => { if (originalStyles.fontSize) onApply('fontSize', `${originalStyles.fontSize}px`); };
  const revertWeight = () => { if (originalStyles.fontWeight) onApply('fontWeight', originalStyles.fontWeight); };
  const revertColor = () => { if (originalStyles.color) onApply('color', originalStyles.color); };
  const revertAlign = () => { if (originalStyles.textAlign) onApply('textAlign', originalStyles.textAlign); };
  const revertTransform = () => { if (originalStyles.textTransform) onApply('textTransform', originalStyles.textTransform); };
  const revertLineHeight = () => { if (originalStyles.lineHeight) onApply('lineHeight', String(originalStyles.lineHeight)); };
  const revertLetterSpacing = () => { if (originalStyles.letterSpacing !== undefined) onApply('letterSpacing', `${originalStyles.letterSpacing}px`); };

  return (
    <div style={{ padding: 16 }}>
      <PanelHeader title="Tipografía y Texto" icon="✏️" />

      {/* Revert All Text Changes */}
      {isUnsaved && (
        <div style={{ marginBottom: 14 }}>
          <button
            onClick={() => onRevertElement(veId)}
            style={{
              width: '100%', padding: '10px 14px', borderRadius: 10,
              background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)',
              color: '#f87171', fontSize: 12, fontWeight: 700, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.15)'; e.currentTarget.style.borderColor = 'rgba(239,68,68,0.4)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.08)'; e.currentTarget.style.borderColor = 'rgba(239,68,68,0.2)'; }}
          >
            <RotateCcw size={14} /> Revertir todo este elemento
          </button>
        </div>
      )}

      {/* Font Family */}
      <PanelSection title="Tipografía" tooltip="Cambia la fuente del texto seleccionado. Cada fuente tiene un estilo visual diferente." revertButton={<RevertButton onClick={revertFont} tooltip="Vuelve a la tipografía original" />}>
        <select
          value={styles.fontFamily || 'Inter'}
          onChange={e => onApply('fontFamily', e.target.value)}
          style={selectStyle}
        >
          {EDITOR_FONTS.map(f => <option key={f} value={f}>{f}</option>)}
        </select>
      </PanelSection>

      {/* Font Size + Weight */}
      <PanelSection title="Tamaño y Peso" tooltip="Tamaño: ajusta qué tan grande se ve el texto (en píxeles). Peso: controla qué tan grueso o delgado es el texto." revertButton={<><RevertButton onClick={revertSize} tooltip="Vuelve al tamaño original" /><RevertButton onClick={revertWeight} tooltip="Vuelve al peso original" /></>}>
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ flex: 1 }}>
            <Tooltip text="Tamaño" description="Ajusta el tamaño del texto en píxeles. Valores comunes: 14px (pequeño), 16px (normal), 24px (título), 48px (hero)." position="top">
              <label style={miniLabelStyle}>Tamaño (px)</label>
            </Tooltip>
            <input
              type="number"
              value={styles.fontSize || 16}
              onChange={e => onApply('fontSize', `${e.target.value}px`)}
              style={inputStyle}
              min={8} max={120}
            />
          </div>
          <div style={{ flex: 1 }}>
            <Tooltip text="Peso" description="Controla el grosor del texto. Light = fino, Normal = estándar, Bold = negrita, Black = muy grueso." position="top">
              <label style={miniLabelStyle}>Peso</label>
            </Tooltip>
            <select
              value={styles.fontWeight || '400'}
              onChange={e => onApply('fontWeight', e.target.value)}
              style={selectStyle}
            >
              <option value="300">Light (fino)</option>
              <option value="400">Normal</option>
              <option value="500">Medium</option>
              <option value="600">Semibold</option>
              <option value="700">Bold (negrita)</option>
              <option value="800">Extra Bold</option>
              <option value="900">Black (grueso)</option>
            </select>
          </div>
        </div>
      </PanelSection>

      {/* Color */}
      <PanelSection title="Color del Texto" tooltip="Cambia el color del texto seleccionado. Puedes elegir de la paleta o usar el selector de color personalizado." revertButton={<RevertButton onClick={revertColor} tooltip="Vuelve al color original" />}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {EDITOR_COLORS.slice(0, 24).map(c => (
            <Tooltip key={c} text={c} position="top">
              <button
                onClick={() => onApply('color', c)}
                style={{
                  width: 24, height: 24, borderRadius: 6,
                  border: styles.color === c ? '2px solid #6366f1' : '1px solid rgba(255,255,255,0.1)',
                  background: c, cursor: 'pointer', transition: 'transform 0.1s',
                }}
              />
            </Tooltip>
          ))}
        </div>
        <Tooltip text="Color personalizado" description="Abre el selector de color para elegir cualquier color exacto." position="top">
          <input
            type="color"
            value={styles.color || '#000000'}
            onChange={e => onApply('color', e.target.value)}
            style={{ width: '100%', height: 32, marginTop: 8, borderRadius: 6, border: 'none', cursor: 'pointer' }}
          />
        </Tooltip>
      </PanelSection>

      {/* Text Align */}
      <PanelSection title="Alineación" tooltip="Controla cómo se alinea el texto: izquierda, centro, derecha o justificado (distribuido uniformemente)." revertButton={<RevertButton onClick={revertAlign} tooltip="Vuelve a la alineación original" />}>
        <div style={{ display: 'flex', gap: 4 }}>
          {([
            ['left', '◀', 'Izquierda: el texto se alinea al lado izquierdo'],
            ['center', '◆', 'Centro: el texto se centra horizontalmente'],
            ['right', '▶', 'Derecha: el texto se alinea al lado derecho'],
            ['justify', '▣', 'Justificado: el texto se distribuye uniformemente'],
          ] as const).map(([align, icon, desc]) => (
            <Tooltip key={align} text={align.charAt(0).toUpperCase() + align.slice(1)} description={desc} position="top">
              <button
                onClick={() => onApply('textAlign', align)}
                style={{
                  flex: 1, padding: '6px 0', borderRadius: 6,
                  background: styles.textAlign === align ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.04)',
                  border: styles.textAlign === align ? '1px solid rgba(99,102,241,0.3)' : '1px solid rgba(255,255,255,0.06)',
                  color: styles.textAlign === align ? '#a78bfa' : '#a1a1aa',
                  cursor: 'pointer', fontSize: 11, fontWeight: 600,
                }}
              >
                {icon}
              </button>
            </Tooltip>
          ))}
        </div>
      </PanelSection>

      {/* Text Transform */}
      <PanelSection title="Transformación" tooltip="Cambia cómo se muestran las letras: normal, MAYÚSCULAS, minúsculas o Capitalizado." revertButton={<RevertButton onClick={revertTransform} tooltip="Vuelve a la transformación original" />}>
        <div style={{ display: 'flex', gap: 4 }}>
          {([
            ['none', 'Aa', 'Normal: sin cambios en las letras'],
            ['uppercase', 'AA', 'Mayúsculas: TODO EN MAYÚSCULAS'],
            ['lowercase', 'aa', 'Minúsculas: todo en minúsculas'],
            ['capitalize', 'Ab', 'Capitalizado: Primera Letra En Mayúscula'],
          ] as const).map(([val, label, desc]) => (
            <Tooltip key={val} text={label} description={desc} position="top">
              <button
                onClick={() => onApply('textTransform', val)}
                style={{
                  flex: 1, padding: '6px 0', borderRadius: 6,
                  background: styles.textTransform === val ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.04)',
                  border: styles.textTransform === val ? '1px solid rgba(99,102,241,0.3)' : '1px solid rgba(255,255,255,0.06)',
                  color: styles.textTransform === val ? '#a78bfa' : '#a1a1aa',
                  cursor: 'pointer', fontSize: 12, fontWeight: 600,
                }}
              >
                {label}
              </button>
            </Tooltip>
          ))}
        </div>
      </PanelSection>

      {/* Line Height + Letter Spacing */}
      <PanelSection title="Espaciado" tooltip="Interlineado: espacio entre líneas de texto. Letras: espacio entre cada letra individual." revertButton={<><RevertButton onClick={revertLineHeight} tooltip="Vuelve al interlineado original" /><RevertButton onClick={revertLetterSpacing} tooltip="Vuelve al espaciado de letras original" /></>}>
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ flex: 1 }}>
            <Tooltip text="Interlineado" description="Espacio vertical entre líneas de texto. 1.0 = compacto, 1.5 = normal, 2.0 = espacioso." position="top">
              <label style={miniLabelStyle}>Interlineado</label>
            </Tooltip>
            <input
              type="number"
              value={styles.lineHeight || 1.5}
              onChange={e => onApply('lineHeight', e.target.value)}
              style={inputStyle}
              min={0.5} max={4} step={0.1}
            />
          </div>
          <div style={{ flex: 1 }}>
            <Tooltip text="Espaciado de letras" description="Espacio horizontal entre cada letra. 0 = normal, valores positivos separan las letras." position="top">
              <label style={miniLabelStyle}>Letras (px)</label>
            </Tooltip>
            <input
              type="number"
              value={styles.letterSpacing || 0}
              onChange={e => onApply('letterSpacing', `${e.target.value}px`)}
              style={inputStyle}
              min={-5} max={20} step={0.5}
            />
          </div>
        </div>
      </PanelSection>
    </div>
  );
}

// ── Image Panel with upload and URL input ──
function ImagePanel({ currentSrc, onApply, veId, isUnsaved, onRevertElement }: { currentSrc: string; onApply: (src: string) => void; veId: string; isUnsaved: boolean; onRevertElement: (veId: string) => void }) {
  const [urlInput, setUrlInput] = useState(currentSrc);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update urlInput when currentSrc changes (e.g., when selecting a different image)
  useEffect(() => {
    setUrlInput(currentSrc);
  }, [currentSrc]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload-image', { method: 'POST', body: formData });
      const data = await res.json();

      if (res.ok && data.url) {
        onApply(data.url);
        setUrlInput(data.url);
      } else {
        alert(data.error || 'Error al subir la imagen.');
      }
    } catch (err) {
      console.error('Error uploading image:', err);
      alert('Error de red al subir la imagen. Intenta de nuevo.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      onApply(urlInput.trim());
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <PanelHeader title="Cambiar Imagen" icon="🖼️" />

      {/* Revert Image Button */}
      {isUnsaved && (
        <div style={{ marginBottom: 14 }}>
          <button
            onClick={() => onRevertElement(veId)}
            style={{
              width: '100%', padding: '10px 14px', borderRadius: 10,
              background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)',
              color: '#f87171', fontSize: 12, fontWeight: 700, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.15)'; e.currentTarget.style.borderColor = 'rgba(239,68,68,0.4)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.08)'; e.currentTarget.style.borderColor = 'rgba(239,68,68,0.2)'; }}
          >
            <RotateCcw size={14} /> Revertir imagen al original
          </button>
        </div>
      )}

      {/* Current Image Preview */}
      {currentSrc && (
        <PanelSection title="Imagen Actual" tooltip="Esta es la imagen que está seleccionada actualmente.">
          <div style={{
            width: '100%',
            height: 150,
            borderRadius: 10,
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <img 
              src={currentSrc} 
              alt="Preview" 
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
              }}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
        </PanelSection>
      )}

      {/* Upload from Computer */}
      <PanelSection 
        title="Subir desde tu Computadora" 
        tooltip="Selecciona una imagen desde tu dispositivo. Formatos soportados: JPG, PNG, GIF, WebP."
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept="image/*"
          style={{ display: 'none' }}
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          style={{
            width: '100%',
            padding: '12px 16px',
            borderRadius: 10,
            background: isUploading ? 'rgba(99,102,241,0.1)' : 'rgba(99,102,241,0.15)',
            border: '1px solid rgba(99,102,241,0.3)',
            color: '#a78bfa',
            fontSize: 13,
            fontWeight: 600,
            cursor: isUploading ? 'wait' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => {
            if (!isUploading) {
              e.currentTarget.style.background = 'rgba(99,102,241,0.25)';
            }
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = isUploading ? 'rgba(99,102,241,0.1)' : 'rgba(99,102,241,0.15)';
          }}
        >
          {isUploading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Cargando...
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
              Elegir archivo
            </>
          )}
        </button>
        <div style={{ fontSize: 11, color: '#71717a', marginTop: 6, textAlign: 'center' }}>
          JPG, PNG, GIF, WebP - Máx 5MB
        </div>
      </PanelSection>

      {/* Divider */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 12, 
        margin: '20px 0',
      }}>
        <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.1)' }} />
        <span style={{ fontSize: 11, color: '#71717a', fontWeight: 500 }}>O</span>
        <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.1)' }} />
      </div>

      {/* Paste URL */}
      <PanelSection 
        title="Pegar URL de Imagen" 
        tooltip="Pega el enlace directo de una imagen desde internet. La imagen debe ser pública y accesible."
      >
        <input
          type="text"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          placeholder="https://ejemplo.com/imagen.jpg"
          style={{
            width: '100%',
            padding: '10px 12px',
            borderRadius: 8,
            background: '#1e1e2a',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#e4e4e7',
            fontSize: 13,
            outline: 'none',
            marginBottom: 10,
            fontFamily: 'inherit',
          }}
          onFocus={e => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.5)'; }}
          onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleUrlSubmit();
            }
          }}
        />
        <button
          onClick={handleUrlSubmit}
          disabled={!urlInput.trim()}
          style={{
            width: '100%',
            padding: '10px 16px',
            borderRadius: 8,
            background: urlInput.trim() ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.04)',
            border: urlInput.trim() ? '1px solid rgba(34,197,94,0.3)' : '1px solid rgba(255,255,255,0.06)',
            color: urlInput.trim() ? '#4ade80' : '#71717a',
            fontSize: 13,
            fontWeight: 600,
            cursor: urlInput.trim() ? 'pointer' : 'not-allowed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => {
            if (urlInput.trim()) {
              e.currentTarget.style.background = 'rgba(34,197,94,0.25)';
            }
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = urlInput.trim() ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.04)';
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
          </svg>
          Aplicar URL
        </button>
      </PanelSection>

      {/* Tips */}
      <div style={{
        marginTop: 20,
        padding: '12px 14px',
        borderRadius: 10,
        background: 'rgba(245,158,11,0.08)',
        border: '1px solid rgba(245,158,11,0.15)',
      }}>
        <div style={{ fontSize: 12, color: '#fbbf24', fontWeight: 600, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
          <Info size={14} />
          💡 Consejos
        </div>
        <div style={{ fontSize: 11, color: '#a1a1aa', lineHeight: 1.6 }}>
          • Las imágenes subidas se convierten a base64 para previsualización<br/>
          • Para imágenes grandes, considera usar URLs externas<br/>
          • Formatos recomendados: JPG para fotos, PNG para logos
        </div>
      </div>
    </div>
  );
}

// ── Style Panel with tooltips ──
function StylePanel({ element, onApply, iframeRef, originalValues, veId, isUnsaved, onRevertElement }: { element: HTMLElement; onApply: (prop: string, val: string) => void; iframeRef: React.RefObject<HTMLIFrameElement | null>; originalValues: Record<string, string>; veId: string; isUnsaved: boolean; onRevertElement: (veId: string) => void }) {
  const computed = iframeRef.current?.contentWindow?.getComputedStyle(element);
  const bgColor = computed ? rgbToHex(computed.backgroundColor) : '#ffffff';
  const borderRadius = computed ? parseInt(computed.borderRadius) || 0 : 0;
  const opacity = computed ? parseFloat(computed.opacity) || 1 : 1;
  const padding = computed ? parseInt(computed.padding) || 0 : 0;

  const revertBgColor = () => { if (originalValues.backgroundColor) onApply('backgroundColor', originalValues.backgroundColor); };
  const revertGradient = () => { if (originalValues.background) onApply('background', originalValues.background); else onApply('background', 'none'); };
  const revertBorderRadius = () => { if (originalValues.borderRadius) onApply('borderRadius', originalValues.borderRadius); };
  const revertPadding = () => { if (originalValues.padding) onApply('padding', originalValues.padding); };
  const revertOpacity = () => { if (originalValues.opacity) onApply('opacity', originalValues.opacity); };
  const revertBoxShadow = () => { if (originalValues.boxShadow) onApply('boxShadow', originalValues.boxShadow); };

  return (
    <div style={{ padding: 16 }}>
      <PanelHeader title="Estilo Visual" icon="🎨" />

      {/* Revert All Style Changes */}
      {isUnsaved && (
        <div style={{ marginBottom: 14 }}>
          <button
            onClick={() => onRevertElement(veId)}
            style={{
              width: '100%', padding: '10px 14px', borderRadius: 10,
              background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)',
              color: '#f87171', fontSize: 12, fontWeight: 700, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.15)'; e.currentTarget.style.borderColor = 'rgba(239,68,68,0.4)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.08)'; e.currentTarget.style.borderColor = 'rgba(239,68,68,0.2)'; }}
          >
            <RotateCcw size={14} /> Revertir todo este elemento
          </button>
        </div>
      )}

      {/* Background Color */}
      <PanelSection title="Color de Fondo" tooltip="Cambia el color de fondo del elemento seleccionado. Elige de la paleta o usa el selector personalizado." revertButton={<RevertButton onClick={revertBgColor} tooltip="Vuelve al color de fondo original" />}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {EDITOR_COLORS.slice(0, 24).map(c => (
            <Tooltip key={c} text={c} position="top">
              <button
                onClick={() => onApply('backgroundColor', c)}
                style={{
                  width: 24, height: 24, borderRadius: 6,
                  border: bgColor === c ? '2px solid #6366f1' : '1px solid rgba(255,255,255,0.1)',
                  background: c, cursor: 'pointer',
                }}
              />
            </Tooltip>
          ))}
        </div>
        <input
          type="color"
          value={bgColor}
          onChange={e => onApply('backgroundColor', e.target.value)}
          style={{ width: '100%', height: 32, marginTop: 8, borderRadius: 6, border: 'none', cursor: 'pointer' }}
        />
      </PanelSection>

      {/* Background Gradient */}
      <PanelSection title="Gradiente" tooltip="Aplica un degradado de colores como fondo. Los gradientes dan un aspecto moderno y profesional." revertButton={<RevertButton onClick={revertGradient} tooltip="Vuelve al gradiente/fondo original" />}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[
            ['linear-gradient(135deg, #667eea, #764ba2)', '🟣 Violeta'],
            ['linear-gradient(135deg, #f093fb, #f5576c)', '🩷 Rosa'],
            ['linear-gradient(135deg, #4facfe, #00f2fe)', '🔵 Azul'],
            ['linear-gradient(135deg, #43e97b, #38f9d7)', '🟢 Verde'],
            ['linear-gradient(135deg, #fa709a, #fee140)', '🟡 Sunset'],
            ['linear-gradient(135deg, #a18cd1, #fbc2eb)', '💜 Lavanda'],
            ['linear-gradient(135deg, #1e293b, #334155)', '⚫ Oscuro'],
            ['none', '🚫 Sin gradiente'],
          ].map(([gradient, label]) => (
            <Tooltip key={gradient} text={label} description={gradient === 'none' ? 'Elimina el gradiente y muestra el color de fondo sólido' : `Aplica un gradiente ${label.slice(2)} al fondo`} position="right">
              <button
                onClick={() => onApply('background', gradient)}
                style={{
                  padding: '8px 12px', borderRadius: 8, width: '100%',
                  background: gradient === 'none' ? 'rgba(255,255,255,0.04)' : gradient,
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: gradient === 'none' ? '#a1a1aa' : '#fff',
                  cursor: 'pointer', fontSize: 12, fontWeight: 600, textAlign: 'left',
                  textShadow: gradient !== 'none' ? '0 1px 2px rgba(0,0,0,0.3)' : 'none',
                }}
              >
                {label}
              </button>
            </Tooltip>
          ))}
        </div>
      </PanelSection>

      {/* Border Radius */}
      <PanelSection title="Bordes Redondeados" tooltip="Redondea las esquinas del elemento. 0 = esquinas rectas, valores altos = más redondeado." revertButton={<RevertButton onClick={revertBorderRadius} tooltip="Vuelve al borde original" />}>
        <input
          type="range"
          min={0} max={50} value={borderRadius}
          onChange={e => onApply('borderRadius', `${e.target.value}px`)}
          style={{ width: '100%', accentColor: '#6366f1' }}
        />
        <div style={{ fontSize: 11, color: '#71717a', textAlign: 'center' }}>{borderRadius}px</div>
      </PanelSection>

      {/* Padding */}
      <PanelSection title="Espaciado Interno" tooltip="Agrega espacio entre el contenido y los bordes del elemento. Más padding = más espacio interior." revertButton={<RevertButton onClick={revertPadding} tooltip="Vuelve al espaciado interno original" />}>
        <input
          type="range"
          min={0} max={80} value={padding}
          onChange={e => onApply('padding', `${e.target.value}px`)}
          style={{ width: '100%', accentColor: '#6366f1' }}
        />
        <div style={{ fontSize: 11, color: '#71717a', textAlign: 'center' }}>{padding}px</div>
      </PanelSection>

      {/* Opacity */}
      <PanelSection title="Opacidad" tooltip="Controla la transparencia del elemento. 100% = completamente visible, 0% = invisible." revertButton={<RevertButton onClick={revertOpacity} tooltip="Vuelve a la opacidad original" />}>
        <input
          type="range"
          min={0} max={100} value={Math.round(opacity * 100)}
          onChange={e => onApply('opacity', String(parseInt(e.target.value) / 100))}
          style={{ width: '100%', accentColor: '#6366f1' }}
        />
        <div style={{ fontSize: 11, color: '#71717a', textAlign: 'center' }}>{Math.round(opacity * 100)}%</div>
      </PanelSection>

      {/* Box Shadow */}
      <PanelSection title="Sombra" tooltip="Agrega una sombra al elemento para darle profundidad y destacarlo visualmente." revertButton={<RevertButton onClick={revertBoxShadow} tooltip="Vuelve a la sombra original" />}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[
            ['none', 'Sin sombra', 'Elimina cualquier sombra del elemento'],
            ['0 1px 3px rgba(0,0,0,0.12)', 'Sutil', 'Sombra muy ligera, casi imperceptible'],
            ['0 4px 12px rgba(0,0,0,0.15)', 'Media', 'Sombra moderada, da sensación de elevación'],
            ['0 10px 30px rgba(0,0,0,0.2)', 'Fuerte', 'Sombra pronunciada, el elemento parece flotar'],
            ['0 20px 50px rgba(0,0,0,0.25)', 'Dramática', 'Sombra muy intensa, máximo impacto visual'],
            ['0 0 0 3px rgba(99,102,241,0.3)', 'Glow Indigo', 'Brillo de color índigo alrededor del elemento'],
          ].map(([shadow, label, desc]) => (
            <Tooltip key={shadow} text={label} description={desc} position="right">
              <button
                onClick={() => onApply('boxShadow', shadow)}
                style={{
                  padding: '8px 12px', borderRadius: 8, width: '100%',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  color: '#a1a1aa', cursor: 'pointer', fontSize: 12, textAlign: 'left',
                }}
              >
                {label}
              </button>
            </Tooltip>
          ))}
        </div>
      </PanelSection>
    </div>
  );
}

// ── Shared Panel Components ──
function PanelHeader({ title, icon }: { title: string; icon: string }) {
  return (
    <div style={{ marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: '#e4e4e7', display: 'flex', alignItems: 'center', gap: 8 }}>
        <span>{icon}</span> {title}
      </div>
    </div>
  );
}

function PanelSection({ title, children, tooltip, revertButton }: { title: string; children: React.ReactNode; tooltip?: string; revertButton?: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.05em', flex: 1 }}>
          {title}
        </div>
        {tooltip && (
          <Tooltip text={title} description={tooltip} position="right">
            <div style={{ cursor: 'help', display: 'flex', alignItems: 'center' }}>
              <Info size={12} style={{ color: '#52525b' }} />
            </div>
          </Tooltip>
        )}
        {revertButton}
      </div>
      {children}
    </div>
  );
}

// ── Shared Styles ──
const inputStyle: React.CSSProperties = {
  width: '100%', padding: '8px 10px', borderRadius: 8,
  background: '#1e1e2a', border: '1px solid rgba(255,255,255,0.1)',
  color: '#e4e4e7', fontSize: 13, outline: 'none',
};

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  cursor: 'pointer',
  color: '#e4e4e7',
  background: '#1e1e2a',
  WebkitAppearance: 'none',
  MozAppearance: 'none',
  appearance: 'none',
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23a1a1aa' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 10px center',
  paddingRight: '28px',
};

const miniLabelStyle: React.CSSProperties = {
  display: 'block', fontSize: 11, color: '#71717a', marginBottom: 4, fontWeight: 500,
};

// ── Utility ──
function rgbToHex(rgb: string): string {
  if (rgb.startsWith('#')) return rgb;
  const match = rgb.match(/\d+/g);
  if (!match || match.length < 3) return '#000000';
  return '#' + match.slice(0, 3).map(x => parseInt(x).toString(16).padStart(2, '0')).join('');
}
