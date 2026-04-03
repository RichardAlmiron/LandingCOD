// ── Responsabilidad única: comunicación con el backend de templates ──
// Este módulo NO maneja estado, NO maneja UI, solo HTTP.

import { TemplateRecord, TemplateType } from '@/hooks/useTemplates';

const ENDPOINTS: Record<TemplateType, string> = {
    stores: '/api/templates/stores',
    pdps: '/api/templates/pdp',
};

export const templatesApi = {
    async fetchAll(): Promise<{ stores: TemplateRecord[]; pdps: TemplateRecord[] }> {
        const [storesRes, pdpsRes] = await Promise.all([
            fetch(`${ENDPOINTS.stores}?includeUnverified=true`).then(r => r.json()),
            fetch(`${ENDPOINTS.pdps}?includeUnverified=true`).then(r => r.json()),
        ]);
        return {
            stores: (storesRes.stores || []).map(mapStore),
            pdps: (pdpsRes.pdps || []).map(mapPdp),
        };
    },

    async verify(type: TemplateType, id: string, verified: boolean): Promise<boolean> {
        const res = await fetch(ENDPOINTS[type], {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, action: 'verify', verified }),
        });
        return res.ok;
    },

    async remove(type: TemplateType, id: string): Promise<boolean> {
        const res = await fetch(`${ENDPOINTS[type]}?id=${id}`, { method: 'DELETE' });
        return res.ok;
    },

    async removeMany(type: TemplateType, ids: string[]): Promise<boolean> {
        const res = await fetch(ENDPOINTS[type], {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: ids, action: 'delete_permanent' }),
        });
        return res.ok;
    },

    async assignCategory(itemId: string, categoriaId: string | null): Promise<boolean> {
        const res = await fetch('/api/categorias-pdp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                tabla: 'plantilla',
                accion: 'asignar_categoria',
                id: itemId,
                categoria_id: categoriaId,
            }),
        });
        return res.ok;
    },
};

// ── Mappers: responsabilidad única — transformar datos crudos de la API ──
function mapStore(s: any): TemplateRecord {
    return {
        id: s.id,
        name: s.name || 'Sin nombre',
        description: s.description || '',
        image_url: s.image_url,
        premium: s.premium,
        verified: s.verified || false,
    };
}

function mapPdp(p: any): TemplateRecord {
    return {
        id: p.id,
        name: p.name || 'Sin nombre',
        description: p.description || '',
        image_url: p.image_url,
        premium: p.premium,
        verified: p.verified || p.verificada || false,
        codigo: p.codigo,
        componente: p.componente,
        categoria_nombre: p.categoria_nombre,
        categoria_color: p.categoria_color,
    };
}
