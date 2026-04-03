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
            { error: 'Servicio de stock no disponible (Configuración de producción requerida).' },
            { status: 500 }
        );
    }

    // Inicializar el cliente Supabase con el Service Role de AlmiDrop (Bypass RLS)
    const almidropSupabase = createClient(almidropUrl, almidropKey);

    try {
        const { searchParams } = new URL(request.url);
        const city = searchParams.get('city') || '';
        const cities = searchParams.get('cities') || '';

        // Si hay múltiples ciudades (multiciudad)
        if (cities) {
            const cityList = cities.split(',').map(c => c.trim()).filter(Boolean);
            if (cityList.length === 0) {
                return NextResponse.json({ products: [], ids: [] });
            }

            // 1. Buscar bodegas que cubren todas las ciudades
            const { data: bodegas, error: bodegaError } = await almidropSupabase
                .from('users')
                .select('id, company_city, coverage_cities')
                .eq('is_bodega', true)
                .or('login_blocked.is.null,login_blocked.eq.false');

            if (bodegaError) throw bodegaError;

            // Encontrar bodegas que cubren cada ciudad
            const cityBodegas = new Map<string, string[]>();
            for (const bodega of (bodegas || [])) {
                const bodegaCities: string[] = [];
                if (bodega.company_city?.trim()) bodegaCities.push(bodega.company_city.trim());
                if (Array.isArray(bodega.coverage_cities)) {
                    bodegaCities.push(...bodega.coverage_cities.filter((c: string) => c?.trim()));
                }
                
                for (const c of bodegaCities) {
                    if (!cityBodegas.has(c)) cityBodegas.set(c, []);
                    cityBodegas.get(c)!.push(bodega.id);
                }
            }

            // Bodegas que están en TODAS las ciudades solicitadas
            const allBodegaIds = [...new Set((bodegas || []).map(b => b.id))];
            const validBodegaIds = allBodegaIds.filter(bodegaId => {
                return cityList.every(city => cityBodegas.get(city)?.includes(bodegaId));
            });

            if (validBodegaIds.length === 0) {
                return NextResponse.json({ products: [], ids: [] });
            }

            // 2. Buscar productos de esas bodegas con stock > 0
            const { data: stockData, error: stockError } = await almidropSupabase
                .from('mis_productos_de_la_bodega')
                .select('producto_origen_del_master')
                .in('supplier_id', validBodegaIds)
                .gt('stock', 0)
                .eq('is_active', true)
                .not('producto_origen_del_master', 'is', null);

            if (stockError) throw stockError;

            const productIds = [...new Set((stockData || []).map(s => s.producto_origen_del_master))];

            if (productIds.length === 0) {
                return NextResponse.json({ products: [], ids: [] });
            }

            // 3. Obtener detalles de productos
            const { data: products, error: prodError } = await almidropSupabase
                .from('catalogo_de_los_productos_del_master')
                .select('*, categories(id, name, slug)')
                .in('id', productIds)
                .eq('is_active', true)
                .or('disabled_by_stock.is.null,disabled_by_stock.eq.false');

            if (prodError) throw prodError;

            const mapped = (products || []).map(mapExpressProduct);

            return NextResponse.json({
                success: true,
                products: mapped,
                ids: productIds,
                cities: cityList
            });
        }

        // Si hay una sola ciudad
        if (!city) {
            return NextResponse.json({ products: [], ids: [] });
        }

        // 1. Buscar bodegas que cubren esa ciudad
        const { data: bodegas, error: bodegaError } = await almidropSupabase
            .from('users')
            .select('id')
            .eq('is_bodega', true)
            .or('login_blocked.is.null,login_blocked.eq.false')
            .or(`company_city.eq.${city},coverage_cities.cs.{${city}}`);

        if (bodegaError) throw bodegaError;

        const bodegaIds = (bodegas || []).map(b => b.id);

        if (bodegaIds.length === 0) {
            return NextResponse.json({ products: [], ids: [] });
        }

        // 2. Buscar productos de esas bodegas con stock > 0
        const { data: stockData, error: stockError } = await almidropSupabase
            .from('mis_productos_de_la_bodega')
            .select('producto_origen_del_master')
            .in('supplier_id', bodegaIds)
            .gt('stock', 0)
            .eq('is_active', true)
            .not('producto_origen_del_master', 'is', null);

        if (stockError) throw stockError;

        const productIds = [...new Set((stockData || []).map(s => s.producto_origen_del_master))];

        if (productIds.length === 0) {
            return NextResponse.json({ products: [], ids: [] });
        }

        // 3. Obtener detalles de productos
        const { data: products, error: prodError } = await almidropSupabase
            .from('catalogo_de_los_productos_del_master')
            .select('*, categories(id, name, slug)')
            .in('id', productIds)
            .eq('is_active', true)
            .or('disabled_by_stock.is.null,disabled_by_stock.eq.false');

        if (prodError) throw prodError;

        const mapped = (products || []).map(mapExpressProduct);

        return NextResponse.json({
            success: true,
            products: mapped,
            ids: productIds,
            city
        });

    } catch (error: any) {
        console.error('Error fetching express stock:', error);
        return NextResponse.json(
            { error: 'Error interno consultando stock.' },
            { status: 500 }
        );
    }
}

// Función para mapear productos con stock real
function mapExpressProduct(p: any) {
    let imageUrl = 'https://picsum.photos/400/400?random=1';
    const imgField = p.images || p.edited_images || p.original_images || p.image_url;
    if (imgField) {
        if (Array.isArray(imgField) && imgField.length > 0) imageUrl = imgField[0];
        else if (typeof imgField === 'string' && imgField.startsWith('http')) imageUrl = imgField;
    }

    const costPrice = p.precio_para_el_dropshipper || 0;
    const suggestedPrice = p.precio_sugerido_de_venta_al_publico || costPrice;

    return {
        id: p.id,
        title: p.name || 'Sin nombre',
        description: p.description || 'Sin descripción',
        price: costPrice,
        originalPrice: suggestedPrice,
        currency: 'Gs.',
        imageUrl: imageUrl,
        images: p.images || [],
        category: p.categories?.name || p.category_id || 'General',
        hasRealStock: true,
        supplier: {
            id: p.created_by,
            companyName: 'AlmiDrop',
            isVerified: true
        }
    };
}
