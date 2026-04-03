// ── Responsabilidad única: cargar templates disponibles para el builder ──
// No sabe de pasos, no sabe de productos, no sabe de publicación.

import { useState, useEffect } from 'react';
import { builderApi, BuilderStoreTemplate, BuilderPdpTemplate, BuilderCategoria } from '@/lib/builder-api';

export function useBuilderTemplates() {
    const [storeTemplates, setStoreTemplates] = useState<BuilderStoreTemplate[]>([]);
    const [pdpTemplates, setPdpTemplates] = useState<BuilderPdpTemplate[]>([]);
    const [categorias, setCategorias] = useState<BuilderCategoria[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            builderApi.fetchStoreTemplates(),
            builderApi.fetchPdpTemplates(),
        ]).then(([stores, { templates, categorias: cats }]) => {
            setStoreTemplates(stores);
            setPdpTemplates(templates);
            setCategorias(cats);
        }).catch(console.error).finally(() => setLoading(false));
    }, []);

    return { storeTemplates, pdpTemplates, categorias, loading };
}
