import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { cookies } from 'next/headers';
import { verifyAccessToken } from '@/lib/auth';

const ACCESS_COOKIE = 'access_token';

// GET - Cargar configuración del builder del usuario
export async function GET(request: Request) {
    try {
        const cookieStore = await cookies();
        const accessToken = cookieStore.get(ACCESS_COOKIE)?.value;

        if (!accessToken) {
            return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
        }

        let payload;
        try {
            payload = verifyAccessToken(accessToken);
        } catch {
            return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
        }

        // Buscar configuración existente del usuario
        const { data: config, error } = await supabase
            .from('builder_configurations')
            .select('*')
            .eq('user_id', payload.sub)
            .is('tienda_id', null)  // Solo configuraciones en progreso (no publicadas)
            .order('updated_at', { ascending: false })
            .limit(1)
            .single();

        if (error && error.code !== 'PGRST116') {  // PGRST116 = no rows returned
            console.error('Error fetching builder config:', error);
            return NextResponse.json({ error: 'Error de base de datos' }, { status: 500 });
        }

        // Si hay configuración, actualizar last_accessed_at
        if (config) {
            await supabase
                .from('builder_configurations')
                .update({ last_accessed_at: new Date().toISOString() })
                .eq('id', config.id);
        }

        return NextResponse.json({ 
            success: true, 
            config: config || null 
        });

    } catch (err) {
        console.error('GET /api/builder-config error:', err);
        return NextResponse.json({ error: 'Error interno' }, { status: 500 });
    }
}

// POST - Guardar configuración del builder
export async function POST(request: Request) {
    try {
        const cookieStore = await cookies();
        const accessToken = cookieStore.get(ACCESS_COOKIE)?.value;

        if (!accessToken) {
            return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
        }

        let payload;
        try {
            payload = verifyAccessToken(accessToken);
        } catch {
            return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
        }

        const body = await request.json();
        const { 
            flowType, 
            storeData, 
            template, 
            currentStep,
            selectedProducts,
            pdpCategory 
        } = body;

        // Validar campos requeridos
        if (!flowType || !storeData || !template) {
            return NextResponse.json({ 
                error: 'Faltan campos obligatorios' 
            }, { status: 400 });
        }

        // Buscar si ya existe una configuración en progreso
        const { data: existingConfig } = await supabase
            .from('builder_configurations')
            .select('id')
            .eq('user_id', payload.sub)
            .is('tienda_id', null)
            .single();

        let result;
        
        if (existingConfig) {
            // Actualizar configuración existente
            result = await supabase
                .from('builder_configurations')
                .update({
                    flow_type: flowType,
                    store_data: storeData,
                    template: template,
                    current_step: currentStep || 1,
                    selected_products: selectedProducts || [],
                    pdp_category: pdpCategory || null,
                    updated_at: new Date().toISOString(),
                    last_accessed_at: new Date().toISOString()
                })
                .eq('id', existingConfig.id)
                .select()
                .single();
        } else {
            // Crear nueva configuración
            result = await supabase
                .from('builder_configurations')
                .insert({
                    user_id: payload.sub,
                    tienda_id: null,  // Se asigna cuando se publica
                    flow_type: flowType,
                    store_data: storeData,
                    template: template,
                    current_step: currentStep || 1,
                    selected_products: selectedProducts || [],
                    pdp_category: pdpCategory || null
                })
                .select()
                .single();
        }

        if (result.error) {
            console.error('Error saving builder config:', result.error);
            return NextResponse.json({ 
                error: 'Error guardando configuración' 
            }, { status: 500 });
        }

        return NextResponse.json({ 
            success: true, 
            config: result.data 
        });

    } catch (err) {
        console.error('POST /api/builder-config error:', err);
        return NextResponse.json({ error: 'Error interno' }, { status: 500 });
    }
}

// DELETE - Eliminar configuración (una o todas las no publicadas)
export async function DELETE(request: Request) {
    try {
        const cookieStore = await cookies();
        const accessToken = cookieStore.get(ACCESS_COOKIE)?.value;

        if (!accessToken) {
            return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
        }

        let payload;
        try {
            payload = verifyAccessToken(accessToken);
        } catch {
            return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const configId = searchParams.get('id');
        const deleteAll = searchParams.get('all') === 'true';

        // Si se solicita eliminar TODAS las configs no publicadas del usuario
        if (deleteAll) {
            const { data: configsToDelete, error: fetchError } = await supabase
                .from('builder_configurations')
                .select('id')
                .eq('user_id', payload.sub)
                .is('tienda_id', null);

            if (fetchError) {
                console.error('Error fetching configs to delete:', fetchError);
                return NextResponse.json({ error: 'Error consultando configuraciones' }, { status: 500 });
            }

            if (!configsToDelete || configsToDelete.length === 0) {
                return NextResponse.json({ 
                    success: true, 
                    message: 'No hay configuraciones para eliminar',
                    deletedCount: 0 
                });
            }

            const { error: deleteError, count } = await supabase
                .from('builder_configurations')
                .delete()
                .eq('user_id', payload.sub)
                .is('tienda_id', null);

            if (deleteError) {
                console.error('Error deleting all builder configs:', deleteError);
                return NextResponse.json({ error: 'Error eliminando configuraciones' }, { status: 500 });
            }

            return NextResponse.json({ 
                success: true, 
                message: `Eliminadas ${configsToDelete.length} configuraciones`,
                deletedCount: configsToDelete.length 
            });
        }

        // Si se solicita eliminar UNA config específica
        if (!configId) {
            return NextResponse.json({ error: 'ID requerido o usar ?all=true' }, { status: 400 });
        }

        // Verificar que la configuración pertenece al usuario
        const { data: config } = await supabase
            .from('builder_configurations')
            .select('user_id')
            .eq('id', configId)
            .single();

        if (!config || config.user_id !== payload.sub) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
        }

        const { error } = await supabase
            .from('builder_configurations')
            .delete()
            .eq('id', configId);

        if (error) {
            console.error('Error deleting builder config:', error);
            return NextResponse.json({ error: 'Error eliminando' }, { status: 500 });
        }

        return NextResponse.json({ 
            success: true,
            message: 'Configuración eliminada',
            deletedCount: 1 
        });

    } catch (err) {
        console.error('DELETE /api/builder-config error:', err);
        return NextResponse.json({ error: 'Error interno' }, { status: 500 });
    }
}
