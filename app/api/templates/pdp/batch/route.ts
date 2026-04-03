import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { verifyAccessToken, ACCESS_COOKIE } from '@/lib/auth';
import { parse } from 'cookie';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const cookieHeader = request.headers.get('cookie') || '';
    const cookies = parse(cookieHeader);
    const accessToken = cookies[ACCESS_COOKIE];

    if (!accessToken) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    const payload = verifyAccessToken(accessToken);
    if (payload.role !== 'admin') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
    }

    const body = await request.json();
    const { plantillas } = body;

    if (!plantillas || !Array.isArray(plantillas)) {
      return NextResponse.json({ error: 'Se requiere un array de plantillas' }, { status: 400 });
    }

    const results = [];
    const errors = [];

    for (const p of plantillas) {
      const { codigo, nombre, descripcion, componente, categoria_id, premium } = p;

      if (!codigo || !nombre || !componente) {
        errors.push({ codigo: codigo || 'unknown', error: 'Faltan campos requeridos' });
        continue;
      }

      const { data, error } = await supabase
        .from('Plantillas_PDP')
        .insert({
          codigo,
          nombre,
          descripcion: descripcion || '',
          componente,
          categoria_id: categoria_id || null,
          premium: premium || false,
          verificada: false,
          activa: true,
          orden: 100
        })
        .select()
        .single();

      if (error) {
        errors.push({ codigo, error: error.message });
      } else {
        results.push(data);
      }
    }

    return NextResponse.json({
      success: true,
      created: results.length,
      errors: errors.length > 0 ? errors : undefined,
      plantillas: results
    });
  } catch (err: any) {
    console.error('POST /api/templates/pdp/batch error:', err);
    return NextResponse.json({ error: 'Error interno del servidor', message: err.message }, { status: 500 });
  }
}
