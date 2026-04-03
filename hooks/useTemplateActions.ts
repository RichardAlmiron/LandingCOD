// ── Responsabilidad única: ejecutar acciones sobre templates ──
// No maneja filtros, no maneja UI, no maneja navegación. Solo operaciones CRUD.

import { useState, useCallback } from 'react';
import { TemplateType } from '@/hooks/useTemplates';
import { templatesApi } from '@/lib/templates-api';
import { CategoriaConSubcategorias } from '@/lib/types-categorias';

interface UseTemplateActionsParams {
    tab: TemplateType;
    onMutate: () => void; // callback para refrescar datos tras mutación
    onDeselect: (ids: string[]) => void;
    onClearSelection: () => void;
    selectedIds: string[];
    categorias: CategoriaConSubcategorias[];
}

export function useTemplateActions({
    tab,
    onMutate,
    onDeselect,
    onClearSelection,
    selectedIds,
    categorias,
}: UseTemplateActionsParams) {
    const [busy, setBusy] = useState(false);

    const withBusy = useCallback(async (fn: () => Promise<void>) => {
        setBusy(true);
        try { await fn(); } finally { setBusy(false); }
    }, []);

    const doVerify = useCallback((id: string, current: boolean) =>
        withBusy(async () => {
            await templatesApi.verify(tab, id, !current);
            onMutate();
        }),
        [tab, onMutate, withBusy],
    );

    const doDelete = useCallback((id: string) =>
        withBusy(async () => {
            if (!confirm('¿Eliminar este template permanentemente?')) return;
            await templatesApi.remove(tab, id);
            onDeselect([id]);
            onMutate();
        }),
        [tab, onMutate, onDeselect, withBusy],
    );

    const doBulkVerify = useCallback(() =>
        withBusy(async () => {
            await Promise.all(selectedIds.map(id => templatesApi.verify(tab, id, true)));
            onClearSelection();
            onMutate();
        }),
        [tab, selectedIds, onMutate, onClearSelection, withBusy],
    );

    const doBulkUnverify = useCallback(() =>
        withBusy(async () => {
            await Promise.all(selectedIds.map(id => templatesApi.verify(tab, id, false)));
            onClearSelection();
            onMutate();
        }),
        [tab, selectedIds, onMutate, onClearSelection, withBusy],
    );

    const doBulkDelete = useCallback(() =>
        withBusy(async () => {
            if (!confirm(`¿Eliminar ${selectedIds.length} templates permanentemente?`)) return;
            await templatesApi.removeMany(tab, selectedIds);
            onClearSelection();
            onMutate();
        }),
        [tab, selectedIds, onMutate, onClearSelection, withBusy],
    );

    const doAssignCategory = useCallback((itemId: string, categoriaId: string | null, subcategoriaId: string | null) =>
        withBusy(async () => {
            await templatesApi.assignCategory(itemId, categoriaId, subcategoriaId);
            onMutate();
        }),
        [onMutate, withBusy],
    );

    return { busy, doVerify, doDelete, doBulkVerify, doBulkUnverify, doBulkDelete, doAssignCategory };
}
