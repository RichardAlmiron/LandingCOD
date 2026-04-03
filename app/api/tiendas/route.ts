import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { verifyAccessToken, ACCESS_COOKIE } from '@/lib/auth';
import { parse } from 'cookie';

function getPayload(request: Request) {
    const cookieHeader = request.headers.get('cookie') || '';
    const cookies = parse(cookieHeader);
    const accessToken = cookies[ACCESS_COOKIE];
    if (!accessToken) return null;
    try {
        return verifyAccessToken(accessToken);
    } catch {
        return null;
    }
}

// ─── GET: Obtener tiendas/PDPs guardadas del usuario (admin: todas) ───
export async function GET(request: Request) {
    try {
        const payload = getPayload(request);
        if (!payload) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

        const { searchParams } = new URL(request.url);
        const type = searchParams.get('type'); // 'store' | 'pdp' | null (ambos)
        const all = searchParams.get('all') === 'true'; // admin: obtener todas
        const isAdmin = payload.role === 'admin';

        const results: any = {};

        if (!type || type === 'store') {
            let query = supabase
                .from('tiendas_publicadas')
                .select('id, identificador_url, name, template, status, user_id, created_at, updated_at')
                .order('updated_at', { ascending: false });
            if (!all || !isAdmin) {
                query = query.eq('user_id', payload.sub);
            }
            const { data: stores, error } = await query;
            if (error) throw error;
            results.stores = stores || [];
        }

        if (!type || type === 'pdp') {
            let query = supabase
                .from('pdp_publicadas')
                .select('id, identificador_url, name, pdp_template, status, user_id, created_at, updated_at')
                .order('updated_at', { ascending: false });
            if (!all || !isAdmin) {
                query = query.eq('user_id', payload.sub);
            }
            const { data: pdps, error } = await query;
            if (error) throw error;
            results.pdps = pdps || [];
        }

        return NextResponse.json({ success: true, ...results });
    } catch (err) {
        console.error('GET /api/tiendas error:', err);
        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
    }
}

// ─── POST: Publicar tienda o PDP (con slug personalizado) ───
export async function POST(request: Request) {
    try {
        const payload = getPayload(request);
        if (!payload) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

        const body = await request.json();
        const { identificador_url, storeData, template, flowType } = body;

        console.log('[API /tiendas POST] flowType:', flowType);
        console.log('[API /tiendas POST] pdpTemplate:', storeData?.pdpTemplate);

        if (!identificador_url || !storeData) {
            return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
        }

        // ── Flujo PDP: guardar en pdp_publicadas ──
        if (flowType === 'pdp') {
            // Verificar slug único en pdp_publicadas
            const { data: existingPdp } = await supabase
                .from('pdp_publicadas')
                .select('id')
                .eq('identificador_url', identificador_url)
                .single();

            if (existingPdp) {
                return NextResponse.json({ error: 'El nombre de enlace ya está en uso para una PDP. Por favor elige otro.' }, { status: 409 });
            }

            const pdpName = storeData.name || 'Mi Página de Producto';

            const { data: newPdp, error: insertError } = await supabase
                .from('pdp_publicadas')
                .insert({
                    user_id: payload.sub,
                    identificador_url,
                    name: pdpName,
                    pdp_template: storeData.pdpTemplate || template || 'urgency-1',
                    store_data: storeData,
                    status: 'published'
                })
                .select('id, identificador_url')
                .single();

            if (insertError) {
                console.error('Error insertando PDP:', insertError);
                return NextResponse.json({ error: 'Error de la base de datos al publicar la PDP.' }, { status: 500 });
            }

            return NextResponse.json({ success: true, store: newPdp, type: 'pdp' }, { status: 201 });
        }

        // ── Flujo Tienda: guardar en tiendas_publicadas ──
        if (!template) {
            return NextResponse.json({ error: 'Falta el template de la tienda' }, { status: 400 });
        }

        const { data: existingStore } = await supabase
            .from('tiendas_publicadas')
            .select('id')
            .eq('identificador_url', identificador_url)
            .single();

        if (existingStore) {
            return NextResponse.json({ error: 'El nombre de enlace ya está en uso. Por favor elige otro.' }, { status: 409 });
        }

        const storeName = storeData.name || 'Mi Tienda';

        const { data: newStore, error: insertError } = await supabase
            .from('tiendas_publicadas')
            .insert({
                user_id: payload.sub,
                identificador_url,
                name: storeName,
                template,
                pdp_template: storeData.pdpTemplate || 'urgency-1',
                store_data: storeData,
                status: 'published'
            })
            .select('id, identificador_url')
            .single();

        if (insertError) {
            console.error('Error insertando tienda:', insertError);
            return NextResponse.json({ error: 'Error de la base de datos al publicar la tienda.' }, { status: 500 });
        }

        return NextResponse.json({ success: true, store: newStore, type: 'store' }, { status: 201 });

    } catch (err) {
        console.error('POST /api/tiendas error:', err);
        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
    }
}

// ─── PUT: Guardar (save) tienda o PDP en la base de datos con user_id ───
// Este es el "Guardar" del editor visual — persiste en DB directamente
export async function PUT(request: Request) {
    try {
        const payload = getPayload(request);
        if (!payload) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

        const body = await request.json();
        const { storeData, template, flowType } = body;

        if (!storeData) {
            return NextResponse.json({ error: 'Faltan datos para guardar' }, { status: 400 });
        }

        // ── Flujo PDP: guardar/actualizar en pdp_publicadas ──
        if (flowType === 'pdp') {
            // Buscar si el usuario ya tiene un draft/publicado de PDP
            const { data: existingPdp } = await supabase
                .from('pdp_publicadas')
                .select('id')
                .eq('user_id', payload.sub)
                .eq('status', 'draft')
                .order('updated_at', { ascending: false })
                .limit(1)
                .single();

            const pdpName = storeData.name || 'Mi Página de Producto';

            if (existingPdp) {
                // Actualizar el draft existente
                const { error: updateError } = await supabase
                    .from('pdp_publicadas')
                    .update({
                        name: pdpName,
                        pdp_template: storeData.pdpTemplate || 'urgency-1',
                        store_data: storeData,
                    })
                    .eq('id', existingPdp.id);

                if (updateError) {
                    console.error('Error actualizando PDP draft:', updateError);
                    return NextResponse.json({ error: 'Error al guardar la PDP' }, { status: 500 });
                }

                return NextResponse.json({ success: true, id: existingPdp.id, type: 'pdp', action: 'updated' });
            } else {
                // Crear nuevo draft de PDP
                const { data: newPdp, error: insertError } = await supabase
                    .from('pdp_publicadas')
                    .insert({
                        user_id: payload.sub,
                        identificador_url: `draft-pdp-${payload.sub}-${Date.now()}`,
                        name: pdpName,
                        pdp_template: storeData.pdpTemplate || 'urgency-1',
                        store_data: storeData,
                        status: 'draft'
                    })
                    .select('id')
                    .single();

                if (insertError) {
                    console.error('Error creando PDP draft:', insertError);
                    return NextResponse.json({ error: 'Error al guardar la PDP' }, { status: 500 });
                }

                return NextResponse.json({ success: true, id: newPdp.id, type: 'pdp', action: 'created' });
            }
        }

        // ── Flujo Tienda: guardar/actualizar en tiendas_publicadas ──
        const { data: existingStore } = await supabase
            .from('tiendas_publicadas')
            .select('id')
            .eq('user_id', payload.sub)
            .eq('status', 'draft')
            .order('updated_at', { ascending: false })
            .limit(1)
            .single();

        const storeName = storeData.name || 'Mi Tienda';

        if (existingStore) {
            const { error: updateError } = await supabase
                .from('tiendas_publicadas')
                .update({
                    name: storeName,
                    template: template || 'megamarket',
                    pdp_template: storeData.pdpTemplate || 'urgency-1',
                    store_data: storeData,
                })
                .eq('id', existingStore.id);

            if (updateError) {
                console.error('Error actualizando tienda draft:', updateError);
                return NextResponse.json({ error: 'Error al guardar la tienda' }, { status: 500 });
            }

            return NextResponse.json({ success: true, id: existingStore.id, type: 'store', action: 'updated' });
        } else {
            const { data: newStore, error: insertError } = await supabase
                .from('tiendas_publicadas')
                .insert({
                    user_id: payload.sub,
                    identificador_url: `draft-store-${payload.sub}-${Date.now()}`,
                    name: storeName,
                    template: template || 'megamarket',
                    pdp_template: storeData.pdpTemplate || 'urgency-1',
                    store_data: storeData,
                    status: 'draft'
                })
                .select('id')
                .single();

            if (insertError) {
                console.error('Error creando tienda draft:', insertError);
                return NextResponse.json({ error: 'Error al guardar la tienda' }, { status: 500 });
            }

            return NextResponse.json({ success: true, id: newStore.id, type: 'store', action: 'created' });
        }
    } catch (err) {
        console.error('PUT /api/tiendas error:', err);
        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
    }
}

// ─── PATCH: Actualizar personalizaciones visuales de una tienda/PDP ya publicada ───
export async function PATCH(request: Request) {
    try {
        const payload = getPayload(request);
        if (!payload) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

        const body = await request.json();
        const { identificador_url, visualCustomizations, flowType } = body;

        if (!identificador_url || !visualCustomizations) {
            return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
        }

        const tableName = flowType === 'pdp' ? 'pdp_publicadas' : 'tiendas_publicadas';

        // Verificar propiedad
        const { data: record, error: fetchError } = await supabase
            .from(tableName)
            .select('id, store_data')
            .eq('identificador_url', identificador_url)
            .eq('user_id', payload.sub)
            .single();

        if (fetchError || !record) {
            return NextResponse.json({ error: 'Registro no encontrado o no tienes permisos' }, { status: 404 });
        }

        const updatedStoreData = {
            ...(record.store_data as any),
            visualCustomizations: {
                customizations: visualCustomizations.customizations || [],
                injectedComponents: visualCustomizations.injectedComponents || [],
                lastEditedAt: new Date().toISOString(),
            }
        };

        const { error: updateError } = await supabase
            .from(tableName)
            .update({ store_data: updatedStoreData })
            .eq('id', record.id);

        if (updateError) {
            console.error('Error updating visual customizations:', updateError);
            return NextResponse.json({ error: 'Error actualizando personalizaciones' }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('PATCH /api/tiendas error:', err);
        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
    }
}

// ─── DELETE: Eliminar tiendas/PDPs publicadas (admin: bulk, usuario: propias) ───
export async function DELETE(request: Request) {
    try {
        const payload = getPayload(request);
        if (!payload) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

        const body = await request.json();
        const { ids, type } = body; // ids: string[], type: 'store' | 'pdp'

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return NextResponse.json({ error: 'Se requiere un array de IDs para eliminar' }, { status: 400 });
        }

        if (!type || !['store', 'pdp'].includes(type)) {
            return NextResponse.json({ error: 'Tipo inválido. Usa "store" o "pdp".' }, { status: 400 });
        }

        const tableName = type === 'pdp' ? 'pdp_publicadas' : 'tiendas_publicadas';
        const isAdmin = payload.role === 'admin';

        // Admin puede eliminar cualquiera, usuario solo las propias
        let query = supabase.from(tableName).delete().in('id', ids);
        if (!isAdmin) {
            query = query.eq('user_id', payload.sub);
        }

        const { error } = await query.select('id');

        if (error) {
            console.error(`DELETE /api/tiendas error (${type}):`, error);
            return NextResponse.json({ error: 'Error al eliminar registros' }, { status: 500 });
        }

        return NextResponse.json({
            success: true,
            deleted: ids.length,
            type,
            message: `${ids.length} ${type === 'pdp' ? 'página(s) de producto' : 'tienda(s)'} eliminada(s) permanentemente`
        });
    } catch (err) {
        console.error('DELETE /api/tiendas error:', err);
        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
    }
}
