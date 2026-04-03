import { useState, useCallback } from 'react';

// ── Hook (single responsibility: manage selection state) ──
export function useSelection() {
    const [selected, setSelected] = useState<Set<string>>(new Set());

    const toggle = useCallback((id: string) => {
        setSelected(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id); else next.add(id);
            return next;
        });
    }, []);

    const selectMany = useCallback((ids: string[]) => {
        setSelected(prev => {
            const next = new Set(prev);
            ids.forEach(id => next.add(id));
            return next;
        });
    }, []);

    const deselectMany = useCallback((ids: string[]) => {
        setSelected(prev => {
            const next = new Set(prev);
            ids.forEach(id => next.delete(id));
            return next;
        });
    }, []);

    const selectAll = useCallback((ids: string[]) => {
        setSelected(new Set(ids));
    }, []);

    const clear = useCallback(() => setSelected(new Set()), []);

    const has = useCallback((id: string) => selected.has(id), [selected]);

    return { selected, count: selected.size, ids: Array.from(selected), toggle, selectMany, deselectMany, selectAll, clear, has };
}
