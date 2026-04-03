import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
    const almidropUrl = process.env.ALMIDROP_SUPABASE_URL || '';
    const almidropKey = process.env.ALMIDROP_SUPABASE_SERVICE_ROLE_KEY || '';

    // Production Check: Ensure we have real credentials
    if (!almidropUrl || 
        !almidropKey || 
        almidropUrl.includes('mock.supabase.co')) {
        
        console.error('[PRODUCTION ALERT] AlmiDrop credentials missing or using mocks');
        return NextResponse.json(
            { error: 'Servicio de catálogo no disponible (Configuración de producción requerida).' },
            { status: 500 }
        );
    }

    // Inicializar el cliente Supabase con el Service Role de AlmiDrop (Bypass RLS)
    const almidropSupabase = createClient(almidropUrl, almidropKey);

    try {
        const { searchParams } = new URL(request.url);
        const search = (searchParams.get('search') || '').replace(/[%_\\(),."']/g, '').trim().substring(0, 100);
        const category = (searchParams.get('category') || '').replace(/[^a-zA-Z0-9-]/g, '');
        const sort = (searchParams.get('sort') || 'random').replace(/[^a-z_]/g, '');
        const limit = Math.max(1, Math.min(500, parseInt(searchParams.get('limit') || '500') || 500));
        const seed = searchParams.get('seed') || '';

        // ── Count exacto con mismos filtros ──
        // Excluir productos deshabilitados por agotamiento de stock
        let countQuery = almidropSupabase
            .from('catalogo_de_los_productos_del_master')
            .select('id', { count: 'exact', head: true })
            .eq('is_active', true)
            .or('disabled_by_stock.is.null,disabled_by_stock.eq.false');

        if (category) countQuery = countQuery.eq('category_id', category);
        if (search) countQuery = countQuery.or(`name.ilike.%${search}%,description.ilike.%${search}%`);

        const { count: totalCount, error: countError } = await countQuery;
        if (countError) throw countError;

        const total = totalCount || 0;
        const maxPages = Math.max(1, Math.ceil(total / limit));
        const page = Math.max(1, Math.min(maxPages, parseInt(searchParams.get('page') || '1') || 1));
        const offset = (page - 1) * limit;

        // ── Query principal ──
        // Excluir productos deshabilitados por agotamiento de stock
        let query = almidropSupabase
            .from('catalogo_de_los_productos_del_master')
            .select('*, categories(id, name, slug), edited_images, original_images, videos, product_code')
            .eq('is_active', true)
            .or('disabled_by_stock.is.null,disabled_by_stock.eq.false');

        if (category) query = query.eq('category_id', category);
        if (search) query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);

        // ── Ordenamiento server-side ──
        switch (sort) {
            case 'newest':
                query = query.order('created_at', { ascending: false });
                break;
            case 'price_low':
                query = query.order('precio_para_el_dropshipper', { ascending: true, nullsFirst: false });
                break;
            case 'price_high':
                query = query.order('precio_para_el_dropshipper', { ascending: false, nullsFirst: false });
                break;
            case 'random':
                // Para random: traemos todo y mezclamos con semilla en servidor
                // Esto garantiza estabilidad entre páginas con la misma semilla
                break;
            default:
                query = query.order('created_at', { ascending: false });
        }

        if (sort === 'random') {
            // Traer todos los IDs y mezclar con semilla determinista
            // NOTA: Supabase retorna max 1000 filas por defecto.
            // Usamos el count ya obtenido para paginar si es necesario.
            let allIds: { id: string }[] = [];
            const batchSize = 1000;
            for (let i = 0; i < total; i += batchSize) {
                let batchQuery = almidropSupabase
                    .from('catalogo_de_los_productos_del_master')
                    .select('id')
                    .eq('is_active', true)
                    .or('disabled_by_stock.is.null,disabled_by_stock.eq.false')
                    .range(i, i + batchSize - 1);

                if (category) batchQuery = batchQuery.eq('category_id', category);
                if (search) batchQuery = batchQuery.or(`name.ilike.%${search}%,description.ilike.%${search}%`);

                const { data: batch, error: batchError } = await batchQuery;
                if (batchError) throw batchError;
                if (batch) allIds = allIds.concat(batch);
            }

            // Mezcla determinista con semilla
            const ids = allIds.map(r => r.id);
            const seedNum = seed ? hashSeed(seed) : Date.now();
            seededShuffle(ids, seedNum);

            // Paginar sobre los IDs mezclados
            const pageIds = ids.slice(offset, offset + limit);

            if (pageIds.length === 0) {
                return NextResponse.json({ 
                    success: true,
                    products: [], 
                    total, 
                    page, 
                    totalPages: maxPages, 
                    seed: seed || String(seedNum),
                    currency: 'Gs.'
                });
            }

            const { data: products, error: prodError } = await almidropSupabase
                .from('catalogo_de_los_productos_del_master')
                .select('*, categories(id, name, slug)')
                .in('id', pageIds)
                .eq('is_active', true)
                .or('disabled_by_stock.is.null,disabled_by_stock.eq.false');

            if (prodError) throw prodError;

            // Reordenar según el orden de pageIds
            const idOrder = new Map(pageIds.map((id, i) => [id, i]));
            const sorted = (products || []).sort((a, b) => (idOrder.get(a.id) ?? 0) - (idOrder.get(b.id) ?? 0));

            // Mapear productos al formato LandingCOD
            const mappedProducts = sorted.map(mapAlmiDropProduct);

            return NextResponse.json({
                success: true,
                products: mappedProducts,
                total,
                page,
                totalPages: maxPages,
                seed: seed || String(seedNum),
                currency: 'Gs.'
            });
        }

        // Para sort != random, paginación normal
        query = query.range(offset, offset + limit - 1);

        const { data, error } = await query;
        if (error) throw error;

        // Mapear productos al formato LandingCOD
        const mappedProducts = (data || []).map(mapAlmiDropProduct);

        return NextResponse.json({
            success: true,
            products: mappedProducts,
            total,
            page,
            totalPages: maxPages,
            currency: 'Gs.'
        });

    } catch (error: any) {
        console.error('Error fetching AlmiDrop catalog:', error);
        return NextResponse.json(
            { error: 'Error interno conectando con el catálogo maestro.' },
            { status: 500 }
        );
    }
}

// Función para mapear productos de AlmiDrop al formato LandingCOD
// IMPORTANTE: Los productos vienen de catalogo_de_los_productos_del_master (Almiplace Dropshipper)
// price = precio_sugerido_de_venta_al_publico (precio que se muestra en la landing/PDP al cliente final)
// costPrice = precio_para_el_dropshipper (costo real del dropshipper, solo visible en el builder)
function mapAlmiDropProduct(p: any) {
    // Extraer primera imagen
    let imageUrl = 'https://picsum.photos/400/400?random=1';
    const imgField = p.images || p.edited_images || p.original_images || p.image_url || p.image_urls || p.imagen || p.imagenes || p.foto;
    if (imgField) {
        if (Array.isArray(imgField) && imgField.length > 0) imageUrl = imgField[0];
        else if (typeof imgField === 'string' && imgField.startsWith('http')) imageUrl = imgField;
    }

    // Precios en Guaraníes — Almiplace Dropshipper
    const dropshipperCost = p.precio_para_el_dropshipper || 0;
    const suggestedRetailPrice = p.precio_sugerido_de_venta_al_publico || dropshipperCost;

    return {
        id: p.id,
        title: p.name || 'Sin nombre',
        description: p.description || 'Sin descripción',
        // price = precio sugerido de venta al público (el que va en la landing/PDP)
        price: suggestedRetailPrice,
        // costPrice = lo que paga el dropshipper (solo visible en el builder, NO en la landing)
        costPrice: dropshipperCost,
        // originalPrice se mantiene para compatibilidad con plantillas que muestran precio tachado
        originalPrice: suggestedRetailPrice,
        currency: 'Gs.',
        imageUrl: imageUrl,
        images: p.images || [],
        edited_images: p.edited_images || [],
        original_images: p.original_images || [],
        videos: [], // Videos desactivados — no se extraen del catálogo
        category: p.categories?.name || p.category_id || 'General',
        categoryId: p.category_id,
        categorySlug: p.categories?.slug,
        stock: p.stock || 0,
        productCode: p.product_code || null,
        tags: p.tags || [],
        totalSold: p.total_sold || 0,
        rating: 5,
        reviews: 124,
        isActive: p.is_active,
        hasRealStock: false, // Se determina vía API express-stock
        supplier: {
            id: p.created_by,
            companyName: 'AlmiDrop',
            isVerified: true
        }
    };
}

// ── Utilidades para random determinista ──

function hashSeed(seed: string): number {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        const char = seed.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash);
}

function seededShuffle<T>(arr: T[], seed: number): void {
    let s = seed;
    for (let i = arr.length - 1; i > 0; i--) {
        // Generador pseudo-aleatorio simple (mulberry32-like)
        s = (s * 1664525 + 1013904223) & 0xFFFFFFFF;
        const j = ((s >>> 0) / 0xFFFFFFFF * (i + 1)) | 0;
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}
