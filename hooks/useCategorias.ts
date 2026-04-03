// ── Responsabilidad única: cargar y exponer categorías PDP ──
// No maneja templates, no maneja filtros, solo categorías.

import { useState, useEffect } from 'react';
import { CategoriaConSubcategorias } from '@/lib/types-categorias';

export function useCategorias() {
    const [categorias, setCategorias] = useState<CategoriaConSubcategorias[]>([]);

    useEffect(() => {
        fetch('/api/categorias-pdp')
            .then(r => r.json())
            .then(d => setCategorias(d.categorias || []))
            .catch(err => console.error('Error cargando categorías:', err));
    }, []);

    return { categorias };
}
