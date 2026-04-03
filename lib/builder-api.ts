// ── Responsabilidad única: comunicación HTTP del builder con el backend ──
// No maneja estado, no maneja UI. Solo fetch.

export interface BuilderStoreTemplate {
    id: string;
    name: string;
    description: string;
    premium: boolean;
    image_url: string | null;
    verified: boolean;
}

export interface BuilderPdpTemplate {
    id: string;
    codigo: string;
    name: string;
    description: string;
    premium: boolean;
    image_url: string | null;
    verified: boolean;
    categoria_nombre: string | null;
    categoria_color: string | null;
}

export interface BuilderCategoria {
    id: string;
    nombre: string;
    icono: string;
}

export interface PublishPayload {
    identificador_url: string;
    storeData: any;
    template: string;
    flowType: 'store' | 'pdp';
}

export const builderApi = {
    async fetchStoreTemplates(): Promise<BuilderStoreTemplate[]> {
        const res = await fetch('/api/templates/stores').then(r => r.json());
        return (res.stores || []).map((s: any): BuilderStoreTemplate => ({
            id: s.id,
            name: s.name,
            description: s.description,
            premium: s.premium,
            image_url: s.image_url,
            verified: s.verified || false,
        }));
    },

    async fetchPdpTemplates(): Promise<{ templates: BuilderPdpTemplate[]; categorias: BuilderCategoria[] }> {
        const [plantillasData, categoriasData] = await Promise.all([
            fetch('/api/categorias-pdp?soloPlantillas=true').then(r => r.json()),
            fetch('/api/categorias-pdp').then(r => r.json()),
        ]);
        const templates = (plantillasData.plantillas || []).map((p: any): BuilderPdpTemplate => ({
            id: p.id,
            codigo: p.codigo,
            name: p.nombre,
            description: p.descripcion,
            premium: p.premium,
            image_url: p.imagen_url,
            verified: p.verificada || false,
            categoria_nombre: p.categoria_nombre || null,
            categoria_color: p.categoria_color || null,
        }));
        return { templates, categorias: categoriasData.categorias || [] };
    },

    async fetchCatalogProducts(search = ''): Promise<any[]> {
        const res = await fetch(`/api/almidrop/catalog?search=${encodeURIComponent(search)}`).then(r => r.json());
        return res.success ? (res.products || []) : [];
    },

    async publish(payload: PublishPayload): Promise<{ success: boolean; error?: string }> {
        const res = await fetch('/api/tiendas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        const data = await res.json();
        return res.ok && data.success ? { success: true } : { success: false, error: data.error || 'Error al publicar' };
    },

    async saveDraft(storeData: any, template: string, flowType: string): Promise<{ success: boolean; id?: string; action?: string; error?: string }> {
        const res = await fetch('/api/tiendas', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ storeData, template, flowType }),
        });
        const data = await res.json();
        return res.ok && data.success
            ? { success: true, id: data.id, action: data.action }
            : { success: false, error: data.error || 'Error al guardar' };
    },

    async generateAICopy(product: any): Promise<{ success: boolean; content?: any; error?: string }> {
        try {
            const res = await fetch('/api/ai/generate-copy', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ product }),
            });
            const data = await res.json();
            if (res.ok && data.success) {
                return { success: true, content: data.content };
            }
            return { success: false, error: data.error || 'Error generando copy con IA' };
        } catch {
            return { success: false, error: 'Error de red al conectar con el servicio de IA' };
        }
    },
};
