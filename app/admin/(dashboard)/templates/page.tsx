'use client';

// ── Responsabilidad única: orquestar la página de templates ──
// Esta página NO contiene lógica de negocio. Solo compone hooks y componentes.

import React, { useCallback } from 'react';
import { PLAYGROUND_MODELS } from '@/lib/playground-models';
import { useTemplates } from '@/hooks/useTemplates';
import { useSelection } from '@/hooks/useSelection';
import { usePagination } from '@/hooks/usePagination';
import { useCategorias } from '@/hooks/useCategorias';
import { useTemplateTab } from '@/hooks/useTemplateTab';
import { useTemplateFilters } from '@/hooks/useTemplateFilters';
import { useTemplateActions } from '@/hooks/useTemplateActions';
import {
    PageHeader,
    TabBar,
    StatsBar,
    BulkActionBar,
    TableHeader,
    Pagination,
    EmptyState,
    LoadingState,
    FilterBar,
} from '@/components/admin/templates/TemplateUI';
import { TemplateRow } from '@/components/admin/templates/TemplateRow';
import PlaygroundTab from '@/components/admin/templates/PlaygroundTab';

export default function TemplatesPage() {
    const templates = useTemplates();
    const selection = useSelection();
    const { categorias } = useCategorias();

    const { pageTab, switchTab } = useTemplateTab(
        useCallback(() => { selection.clear(); }, [selection]),
    );

    const tab = pageTab !== 'playground' ? pageTab : 'stores';
    const list = pageTab !== 'playground' ? templates.getList(tab) : [];

    const filters = useTemplateFilters(list, tab, categorias);
    const pag = usePagination(filters.filtered, 20);

    const actions = useTemplateActions({
        tab,
        onMutate: templates.refresh,
        onDeselect: selection.deselectMany,
        onClearSelection: selection.clear,
        selectedIds: selection.ids,
        categorias,
    });

    const doRefresh = useCallback(() => {
        selection.clear();
        filters.clearFilters();
        templates.refresh();
    }, [selection, filters, templates]);

    const doSelectAll = useCallback(() => {
        selection.selectAll(filters.filtered.map(t => t.id));
    }, [filters.filtered, selection]);

    const verified = list.filter(t => t.verified).length;
    const unverified = list.length - verified;

    if (pageTab === 'playground') {
        return (
            <div style={{ padding: '32px 40px', maxWidth: 1400, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
                <PageHeader onRefresh={doRefresh} />
                <TabBar tab={pageTab} storeCount={templates.stores.length} pdpCount={templates.pdps.length} playgroundCount={PLAYGROUND_MODELS.length} onChange={switchTab} />
                <PlaygroundTab />
            </div>
        );
    }

    return (
        <div style={{ padding: '32px 40px', maxWidth: 1400, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
            <PageHeader onRefresh={doRefresh} />
            <TabBar tab={pageTab} storeCount={templates.stores.length} pdpCount={templates.pdps.length} playgroundCount={PLAYGROUND_MODELS.length} onChange={switchTab} />
            <StatsBar verified={verified} unverified={unverified} search={filters.search} onSearch={filters.setSearch} onRefresh={doRefresh} />
            <FilterBar
                tab={pageTab}
                estadoFiltro={filters.estadoFiltro}
                categoriaFiltro={filters.categoriaFiltro}
                subcategoriaFiltro={filters.subcategoriaFiltro}
                categorias={categorias}
                onEstadoChange={filters.setEstadoFiltro}
                onCategoriaChange={filters.setCategoriaFiltro}
                onSubcategoriaChange={filters.setSubcategoriaFiltro}
            />
            <BulkActionBar
                count={selection.count}
                totalFiltered={filters.filtered.length}
                loading={actions.busy}
                onVerify={actions.doBulkVerify}
                onUnverify={actions.doBulkUnverify}
                onDelete={actions.doBulkDelete}
                onSelectAll={doSelectAll}
                onClear={selection.clear}
            />
            <div style={{ borderRadius: 16, border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)', overflow: 'hidden' }}>
                {templates.loading ? (
                    <LoadingState />
                ) : filters.filtered.length === 0 ? (
                    <EmptyState tab={tab} />
                ) : (
                    <>
                        <TableHeader tab={tab} />
                        {pag.paginated.map(item => (
                            <TemplateRow
                                key={item.id}
                                item={item}
                                tab={tab}
                                isSelected={selection.has(item.id)}
                                actionLoading={actions.busy}
                                categorias={tab === 'pdps' ? categorias : undefined}
                                onToggle={() => selection.toggle(item.id)}
                                onVerify={() => actions.doVerify(item.id, item.verified)}
                                onDelete={() => actions.doDelete(item.id)}
                                onCategoryChange={(catId, subId) => actions.doAssignCategory(item.id, catId, subId)}
                            />
                        ))}
                        <Pagination
                            page={pag.page}
                            totalPages={pag.totalPages}
                            total={pag.total}
                            hasPrev={pag.hasPrev}
                            hasNext={pag.hasNext}
                            onPrev={pag.prev}
                            onNext={pag.next}
                            onGoTo={pag.goTo}
                        />
                    </>
                )}
            </div>
        </div>
    );
}
