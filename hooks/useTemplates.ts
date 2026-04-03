// ── Responsabilidad única: gestionar el estado en memoria de los templates ──
// No hace fetch directo, no maneja filtros, no maneja UI. Solo estado + operaciones.

import { useState, useCallback, useEffect } from 'react';
import { templatesApi } from '@/lib/templates-api';

export type TemplateType = 'stores' | 'pdps';

export interface TemplateRecord {
    id: string;
    name: string;
    description?: string;
    image_url?: string;
    premium?: boolean;
    verified: boolean;
    codigo?: string;
    componente?: string;
    categoria_nombre?: string;
    categoria_color?: string;
    subcategoria_nombre?: string;
}

export function useTemplates() {
    const [stores, setStores] = useState<TemplateRecord[]>([]);
    const [pdps, setPdps] = useState<TemplateRecord[]>([]);
    const [loading, setLoading] = useState(true);

    const refresh = useCallback(async () => {
        setLoading(true);
        try {
            const data = await templatesApi.fetchAll();
            setStores(data.stores);
            setPdps(data.pdps);
        } catch (err) {
            console.error('Error fetching templates:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { refresh(); }, [refresh]);

    const getList = (type: TemplateType) => type === 'stores' ? stores : pdps;

    return { stores, pdps, loading, refresh, getList };
}
