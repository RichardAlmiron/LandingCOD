import { useState, useMemo, useCallback } from 'react';

// ── Hook (single responsibility: paginate a list) ──
export function usePagination<T>(items: T[], perPage: number = 20) {
    const [page, setPage] = useState(1);

    const totalPages = useMemo(() => Math.max(1, Math.ceil(items.length / perPage)), [items.length, perPage]);

    // Auto-correct page if it exceeds total
    const safePage = Math.min(page, totalPages);
    if (safePage !== page) setPage(safePage);

    const paginated = useMemo(
        () => items.slice((safePage - 1) * perPage, safePage * perPage),
        [items, safePage, perPage]
    );

    const goTo = useCallback((p: number) => setPage(Math.max(1, Math.min(p, totalPages))), [totalPages]);
    const prev = useCallback(() => setPage(p => Math.max(1, p - 1)), []);
    const next = useCallback(() => setPage(p => Math.min(totalPages, p + 1)), [totalPages]);
    const reset = useCallback(() => setPage(1), []);

    return { page: safePage, totalPages, paginated, total: items.length, goTo, prev, next, reset, hasPrev: safePage > 1, hasNext: safePage < totalPages };
}
