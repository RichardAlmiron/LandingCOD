import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Datos de fallback para desarrollo local cuando no hay credenciales de AlmiDrop
const MOCK_CITIES = [
    { name: 'Asunción', totalStock: 150 },
    { name: 'Ciudad del Este', totalStock: 89 },
    { name: 'San Lorenzo', totalStock: 67 },
    { name: 'Luque', totalStock: 54 },
    { name: 'Capiatá', totalStock: 43 },
    { name: 'Lambaré', totalStock: 38 },
    { name: 'Fernando de la Mora', totalStock: 35 },
    { name: 'Ñemby', totalStock: 28 },
    { name: 'Encarnación', totalStock: 25 },
    { name: 'Pedro Juan Caballero', totalStock: 22 },
    { name: 'Mariano Roque Alonso', totalStock: 19 },
    { name: 'Villa Elisa', totalStock: 15 },
];

const almidropUrl = process.env.ALMIDROP_SUPABASE_URL || '';
const almidropKey = process.env.ALMIDROP_SUPABASE_SERVICE_ROLE_KEY || '';

const isMockCredentials = !almidropUrl || 
    !almidropKey || 
    almidropUrl.includes('mock.supabase.co') ||
    almidropUrl.includes('placeholder');

const almidropSupabase = isMockCredentials ? null : createClient(almidropUrl, almidropKey);

// ═══════════════════════════════════════════════════════════════════
// GET: Ciudades disponibles — Dinámicas desde AlmiDrop
//
// Obtiene ciudades únicas de:
//   1. mis_productos_de_la_bodega (productos con stock) → supplier_id
//   2. users (bodegas) → company_city + coverage_cities[]
//
// Ordenadas por cantidad de productos únicos disponibles (descendente)
// ═══════════════════════════════════════════════════════════════════

export async function GET() {
    // Debug: Log environment state (sin mostrar valores completos por seguridad)
    const hasUrl = !!almidropUrl;
    const hasKey = !!almidropKey;
    const urlPreview = almidropUrl ? `${almidropUrl.substring(0, 20)}...` : 'NO URL';
    console.log('[Cities API] Environment check:', { hasUrl, hasKey, urlPreview, isMockCredentials });
    
    // Si no hay credenciales, retornar datos de fallback para desarrollo
    if (isMockCredentials) {
        console.log('[Cities API] Using mock data for development');
        return NextResponse.json({
            success: true,
            cities: MOCK_CITIES,
            total: MOCK_CITIES.length,
            source: 'mock',
            timestamp: new Date().toISOString()
        });
    }

    try {
        // Verificar que el cliente Supabase se creó correctamente
        if (!almidropSupabase) {
            console.error('[Cities API] ERROR: almidropSupabase es null');
            throw new Error('Supabase client not initialized');
        }

        console.log('[Cities API] Obteniendo productos con stock...');
        
        // 1. Obtener productos de bodegas con stock > 0
        const { data: productsWithStock, error: productsError } = await almidropSupabase
            .from('mis_productos_de_la_bodega')
            .select('supplier_id, producto_origen_del_master')
            .gt('stock', 0)
            .eq('is_active', true)
            .not('producto_origen_del_master', 'is', null);

        if (productsError) {
            console.error('[Cities API] Error en mis_productos_de_la_bodega:', productsError);
            throw productsError;
        }
        console.log(`[Cities API] Productos con stock: ${productsWithStock?.length || 0}`);

        // Si no hay productos, retornar vacío
        if (!productsWithStock || productsWithStock.length === 0) {
            return NextResponse.json({
                success: true,
                cities: [],
                total: 0,
                source: 'almidrop-empty',
                message: 'No products with stock found',
                timestamp: new Date().toISOString()
            });
        }

        // 2. Extraer supplier_ids únicos
        const supplierIds = [...new Set(productsWithStock.map(p => p.supplier_id).filter(Boolean))];
        console.log(`[Cities API] Supplier IDs únicos: ${supplierIds.length}`);

        // 3. Obtener bodegas con esos supplier_ids y sus ciudades
        console.log('[Cities API] Consultando bodegas...');
        const { data: bodegas, error: bodegaError } = await almidropSupabase
            .from('users')
            .select('id, company_city, coverage_cities')
            .in('id', supplierIds)
            .eq('is_bodega', true)
            .or('login_blocked.is.null,login_blocked.eq.false');

        if (bodegaError) {
            console.error('[Cities API] Error en users:', bodegaError);
            throw bodegaError;
        }
        console.log(`[Cities API] Bodegas encontradas: ${bodegas?.length || 0}`);
        // 4. Mapa de bodega → ciudades que cubre
        const bodegaCitiesMap = new Map<string, string[]>();
        for (const bodega of (bodegas || [])) {
            const cities: string[] = [];
            if (bodega.company_city?.trim()) {
                cities.push(bodega.company_city.trim());
            }
            if (Array.isArray(bodega.coverage_cities)) {
                for (const c of bodega.coverage_cities) {
                    if (c && typeof c === 'string' && c.trim()) {
                        const trimmed = c.trim();
                        if (!cities.includes(trimmed)) {
                            cities.push(trimmed);
                        }
                    }
                }
            }
            bodegaCitiesMap.set(bodega.id, cities);
        }

        // 5. Contar productos ÚNICOS por ciudad
        const cityProductSets = new Map<string, Set<string>>();
        
        for (const product of productsWithStock) {
            const bodegaCities = bodegaCitiesMap.get(product.supplier_id);
            if (!bodegaCities) continue;
            
            const masterProductId = product.producto_origen_del_master;
            if (!masterProductId) continue;
            
            for (const cityName of bodegaCities) {
                if (!cityProductSets.has(cityName)) {
                    cityProductSets.set(cityName, new Set());
                }
                cityProductSets.get(cityName)!.add(masterProductId);
            }
        }

        // 6. Convertir a array ordenado por cantidad de productos únicos
        const cities = Array.from(cityProductSets.entries())
            .map(([name, productSet]) => ({ 
                name, 
                totalStock: productSet.size 
            }))
            .filter(c => c.totalStock > 0)
            .sort((a, b) => b.totalStock - a.totalStock);

        console.log(`[Cities API] Ciudades consolidadas: ${cities.length}`, 
            cities.slice(0, 5).map(c => `${c.name}: ${c.totalStock}`));

        // Si no hay ciudades, retornar vacío
        if (cities.length === 0) {
            console.warn('[Cities API] No se encontraron ciudades con productos');
            return NextResponse.json({
                success: true,
                cities: [],
                total: 0,
                source: 'almidrop-empty',
                message: 'No cities with products found',
                timestamp: new Date().toISOString()
            });
        }

        return NextResponse.json({
            success: true,
            cities,
            total: cities.length,
            source: 'almidrop',
            timestamp: new Date().toISOString()
        });

    } catch (error: any) {
        console.error('[Cities API] ERROR CRÍTICO:', error);
        return NextResponse.json({
            success: false,
            cities: [],
            total: 0,
            source: 'error',
            error: error.message,
            timestamp: new Date().toISOString()
        }, { status: 500 });
    }
}
