import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { verifyAccessToken, ACCESS_COOKIE } from '@/lib/auth';
import { parse } from 'cookie';

export const dynamic = 'force-dynamic';

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

// GET - Obtener favoritos del usuario autenticado
export async function GET(request: Request) {
  try {
    const payload = getPayload(request);
    if (!payload) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    const { data, error } = await supabase
      .from('favoritos_tiendas')
      .select('template_id, created_at')
      .eq('user_id', payload.sub)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({
      success: true,
      favorites: (data || []).map((f: any) => f.template_id),
    });
  } catch (err) {
    console.error('GET /api/favorites error:', err);
    return NextResponse.json({ error: 'Error al obtener favoritos' }, { status: 500 });
  }
}

// POST - Agregar favorito
export async function POST(request: Request) {
  try {
    const payload = getPayload(request);
    if (!payload) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    const { template_id } = await request.json();
    if (!template_id) {
      return NextResponse.json({ error: 'template_id requerido' }, { status: 400 });
    }

    const { error } = await supabase
      .from('favoritos_tiendas')
      .upsert(
        { user_id: payload.sub, template_id },
        { onConflict: 'user_id,template_id' }
      );

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('POST /api/favorites error:', err);
    return NextResponse.json({ error: 'Error al agregar favorito' }, { status: 500 });
  }
}

// DELETE - Quitar favorito
export async function DELETE(request: Request) {
  try {
    const payload = getPayload(request);
    if (!payload) {
      return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const templateId = searchParams.get('template_id');
    if (!templateId) {
      return NextResponse.json({ error: 'template_id requerido' }, { status: 400 });
    }

    const { error } = await supabase
      .from('favoritos_tiendas')
      .delete()
      .eq('user_id', payload.sub)
      .eq('template_id', templateId);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('DELETE /api/favorites error:', err);
    return NextResponse.json({ error: 'Error al quitar favorito' }, { status: 500 });
  }
}
