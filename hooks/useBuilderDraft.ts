// ── Responsabilidad única: persistencia del borrador en localStorage ──
// No sabe de templates, no sabe de publicación, no sabe de pasos.

import { useState, useEffect, useRef } from 'react';

export interface DraftData {
    current_step: number;
    flow_type: 'store' | 'pdp' | null;
    template: string;
    store_data: any;
    selected_products: string[];
    timestamp: string;
}

export function useBuilderDraft(userId: string | undefined) {
    const [draftData, setDraftData] = useState<DraftData | null>(null);
    const [showPrompt, setShowPrompt] = useState(false);
    const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const draftKey = userId ? `builder_draft_${userId}` : null;

    // Detectar borrador al montar
    useEffect(() => {
        if (!draftKey) return;
        try {
            const raw = localStorage.getItem(draftKey);
            if (raw) {
                const parsed = JSON.parse(raw);
                if (parsed) { setDraftData(parsed); setShowPrompt(true); }
            }
        } catch { /* borrador corrupto — ignorar */ }
    }, [draftKey]);

    const save = (data: Omit<DraftData, 'timestamp'>) => {
        if (!draftKey) return;
        if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
        saveTimeoutRef.current = setTimeout(() => {
            localStorage.setItem(draftKey, JSON.stringify({ ...data, timestamp: new Date().toISOString() }));
        }, 1500);
    };

    const discard = () => {
        if (draftKey) localStorage.removeItem(draftKey);
        setDraftData(null);
        setShowPrompt(false);
    };

    const accept = () => setShowPrompt(false);

    const clearSaved = () => {
        if (draftKey) localStorage.removeItem(draftKey);
    };

    return { draftData, showPrompt, save, discard, accept, clearSaved };
}
