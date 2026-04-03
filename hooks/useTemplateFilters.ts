// ── Responsabilidad única: gestionar el estado de filtros de templates ──
// No sabe de API, no sabe de selección, no sabe de acciones. Solo filtros.

import { useState, useMemo } from 'react';
import { TemplateRecord, TemplateType } from '@/hooks/useTemplates';
import { CategoriaConSubcategorias } from '@/lib/types-categorias';

export type EstadoFiltro = 'todos' | 'verificados' | 'pendientes';

export function useTemplateFilters(
    list: TemplateRecord[],
    tab: TemplateType,
    categorias: CategoriaConSubcategorias[],
) {
    const [search, setSearch] = useState('');
    const [estadoFiltro, setEstadoFiltro] = useState<EstadoFiltro>('todos');
    const [categoriaFiltro, setCategoriaFiltro] = useState('');
    const [subcategoriaFiltro, setSubcategoriaFiltro] = useState('');

    const filtered = useMemo(() => {
        let result = list;

        if (search.trim()) {
            const q = search.toLowerCase();
            result = result.filter(t =>
                t.name.toLowerCase().includes(q) ||
                (t.description || '').toLowerCase().includes(q) ||
                t.id.toLowerCase().includes(q),
            );
        }

        if (estadoFiltro !== 'todos') {
            result = result.filter(t =>
                estadoFiltro === 'verificados' ? t.verified : !t.verified,
            );
        }

        if (tab === 'pdps' && categoriaFiltro) {
            const cat = categorias.find(c => c.id === categoriaFiltro);
            if (cat) result = result.filter(t => t.categoria_nombre === cat.nombre);
        }

        if (tab === 'pdps' && subcategoriaFiltro) {
            const cat = categorias.find(c => c.id === categoriaFiltro);
            const sub = cat?.subcategorias.find(s => s.id === subcategoriaFiltro);
            if (sub) result = result.filter(t => t.subcategoria_nombre === sub.nombre);
        }

        return result;
    }, [list, search, tab, estadoFiltro, categoriaFiltro, subcategoriaFiltro, categorias]);

    const clearFilters = () => {
        setSearch('');
        setEstadoFiltro('todos');
        setCategoriaFiltro('');
        setSubcategoriaFiltro('');
    };

    return {
        search, setSearch,
        estadoFiltro, setEstadoFiltro,
        categoriaFiltro, setCategoriaFiltro,
        subcategoriaFiltro, setSubcategoriaFiltro,
        filtered,
        clearFilters,
    };
}
