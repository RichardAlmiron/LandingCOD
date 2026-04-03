// ── Responsabilidad única: gestionar el catálogo de productos AlmiDrop ──
// No sabe de templates, no sabe de publicación, no sabe de pasos.

import { useState, useCallback } from 'react';
import { builderApi } from '@/lib/builder-api';

const ITEMS_PER_PAGE = 40;

export function useBuilderProducts(flowType: 'store' | 'pdp' | null) {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [selected, setSelected] = useState<Set<string>>(new Set());
    const [viewing, setViewing] = useState<any>(null);

    const fetch = useCallback(async (searchStr = search) => {
        setLoading(true);
        try {
            const data = await builderApi.fetchCatalogProducts(searchStr);
            setProducts(data);
            setPage(1);
        } catch (err) {
            console.error('Error fetching catalog products', err);
        } finally {
            setLoading(false);
        }
    }, [search]);

    const toggle = useCallback((id: string) => {
        setSelected(prev => {
            const next = new Set(prev);
            if (flowType === 'pdp') {
                // PDP: selección única
                if (next.has(id)) { next.delete(id); } else { next.clear(); next.add(id); }
            } else {
                if (next.has(id)) { next.delete(id); } else { next.add(id); }
            }
            return next;
        });
    }, [flowType]);

    const toggleAll = useCallback(() => {
        setSelected(prev =>
            prev.size === products.length ? new Set() : new Set(products.map(p => p.id))
        );
    }, [products]);

    const reset = useCallback(() => {
        setSelected(new Set());
        setSearch('');
        setPage(1);
    }, []);

    const totalPages = Math.max(1, Math.ceil(products.length / ITEMS_PER_PAGE));
    const paginated = products.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

    return {
        products, loading, search, setSearch,
        page, setPage, totalPages, paginated,
        selected, toggle, toggleAll, reset,
        viewing, setViewing,
        fetch,
    };
}
