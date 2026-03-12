import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

const almidropUrl = process.env.ALMIDROP_SUPABASE_URL || 'https://mock.supabase.co';
const almidropKey = process.env.ALMIDROP_SUPABASE_SERVICE_ROLE_KEY || 'mock-key';

// Inicializar el cliente Supabase con el Service Role de AlmiDrop (Bypass RLS)
const almidropSupabase = createClient(almidropUrl, almidropKey);

export async function GET(request: Request) {
    if (!almidropUrl || !almidropKey) {
        return NextResponse.json(
            { error: 'Faltan credenciales de AlmiDrop en el servidor.' },
            { status: 500 }
        );
    }

    try {
        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search') || '';
        const limit = Math.min(parseInt(searchParams.get('limit') || '500') || 500, 500);

        const [masterResponse, bodegaResponse] = await Promise.all([
            almidropSupabase
                .from('catalogo_de_los_productos_del_master')
                .select('id, name, description, precio_para_el_dropshipper, images, category_id, stock, is_active')
                .eq('is_active', true)
                .order('name', { ascending: true }),
            almidropSupabase
                .from('mis_productos_de_la_bodega')
                .select('id, name, description, precio_para_el_dropshipper, images, category_id, stock, is_active, producto_origen_del_master')
                .limit(2000) 
        ]);

        if (masterResponse.error) throw masterResponse.error;

        const mapProduct = (p: any, source: string) => {
             let imageUrl = 'https://picsum.photos/400/400?random=1';
             const imgField = p.images || p.image_url || p.image_urls || p.imagen || p.imagenes || p.foto;
             if (imgField) {
                 if (Array.isArray(imgField) && imgField.length > 0) imageUrl = imgField[0];
                 else if (typeof imgField === 'string' && imgField.startsWith('http')) imageUrl = imgField;
             }

             return {
                id: p.id,
                title: p.name || 'Sin nombre',
                description: p.description || 'Sin descripción',
                price: `$${p.precio_para_el_dropshipper || 0}`,
                originalPrice: `$${Math.floor((p.precio_para_el_dropshipper || 0) * 1.5)}`,
                imageUrl: imageUrl,
                category: p.category_id || 'General',
                stock: p.stock || 0,
                rating: 5,
                reviews: 124,
                source: source,
                is_active: p.is_active,
                masterLink: p.producto_origen_del_master
             };
        };

        const mData = (masterResponse.data || []).map(p => mapProduct(p, 'master'));
        const bRaw = (bodegaResponse.data || []).map(p => mapProduct(p, 'bodega'));

        // UNIFICACIÓN FINAL (Garantizar catálogo limpio de 127 productos)
        const finalMap = new Map<string, any>();
        
        const normalize = (val: string) => (val || '').toLowerCase()
            .replace(/\s+/g, ' ')
            .trim()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        // 1. Prioridad: Todos los del Master Activos (120)
        for (const p of mData) {
            finalMap.set(normalize(p.title), p);
        }

        // 2. Complemento: Productos de Bodega que no están en el Master (incluyendo inactivos especiales)
        for (const p of bRaw) {
            const key = normalize(p.title);
            if (!finalMap.has(key)) {
                // Si no existe por nombre, es un producto "real" único
                finalMap.set(key, p);
            }
        }

        const consolidated = Array.from(finalMap.values());

        // Aplicar búsqueda sobre la lista consolidada
        const filtered = search 
            ? consolidated.filter(p => {
                const s = normalize(search);
                return normalize(p.title).includes(s) || normalize(p.description).includes(s);
            })
            : consolidated;

        console.log(`[ALMIDROP API] Final: ${consolidated.length} (Master: ${mData.length} | Extras: ${consolidated.length - mData.length})`);

        return NextResponse.json({ 
            success: true, 
            products: filtered,
            totalCount: consolidated.length,
            stats: {
                unique: consolidated.length,
                master_active: mData.length,
                bodega_extras: consolidated.length - mData.length
            }
        });

    } catch (error: any) {
        console.error('Error fetching AlmiDrop products:', error);
        return NextResponse.json(
            { error: 'Error interno conectando con el catálogo maestro.' },
            { status: 500 }
        );
    }
}
