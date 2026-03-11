import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { verifyAccessToken, ACCESS_COOKIE } from '@/lib/auth';
import { parse } from 'cookie';

export async function POST(request: Request) {
    try {
        const cookieHeader = request.headers.get('cookie') || '';
        const cookies = parse(cookieHeader);
        const accessToken = cookies[ACCESS_COOKIE];

        if (!accessToken) {
            return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
        }

        let payload;
        try {
            payload = verifyAccessToken(accessToken);
        } catch {
            return NextResponse.json({ error: 'Token inválido o expirado' }, { status: 401 });
        }

        // Parse Request Body
        const body = await request.json();
        const { identificador_url, storeData, template } = body;

        if (!identificador_url || !storeData || !template) {
            return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
        }

        const storeName = storeData.header?.storeName || 'Mi Tienda';

        // Check if slug is taken (by anyone)
        const { data: existingStore } = await supabase
            .from('tiendas_publicadas')
            .select('id')
            .eq('identificador_url', identificador_url)
            .single();

        if (existingStore) {
            return NextResponse.json({ error: 'El nombre de enlace ya está en uso. Por favor elige otro.' }, { status: 409 });
        }

        // Insert new store into Supabase
        const { data: newStore, error: insertError } = await supabase
            .from('tiendas_publicadas')
            .insert({
                user_id: payload.sub,
                identificador_url,
                name: storeName,
                template,
                pdp_category: storeData.pdpCategory || 'urgency',
                pdp_template: storeData.pdpTemplate || 'urgency-1',
                store_data: storeData,
                status: 'published'
            })
            .select('id, identificador_url')
            .single();

        if (insertError) {
            console.error('Error insertando tienda:', insertError);
            return NextResponse.json({ error: 'Error de la base de datos al guardar la tienda.' }, { status: 500 });
        }

        return NextResponse.json({ success: true, store: newStore }, { status: 201 });

    } catch (err) {
        console.error('POST /api/tiendas error:', err);
        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
    }
}
