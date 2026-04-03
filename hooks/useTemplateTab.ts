// ── Responsabilidad única: gestionar la pestaña activa de templates ──
// No sabe de filtros, no sabe de acciones, solo navegación entre tabs.

import { useState, useCallback } from 'react';
import { TemplateType } from '@/hooks/useTemplates';

export type PageTab = TemplateType | 'playground';

export function useTemplateTab(onTabChange: () => void) {
    const [pageTab, setPageTab] = useState<PageTab>('stores');

    const switchTab = useCallback((t: PageTab) => {
        setPageTab(t);
        onTabChange();
    }, [onTabChange]);

    return { pageTab, switchTab };
}
