import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { verifyAccessToken, ACCESS_COOKIE } from '@/lib/auth';
import { parse } from 'cookie';

export const dynamic = 'force-dynamic';

// ────────────────────────────────────────────────────────────
// GET: Obtener categorías y plantillas
// ────────────────────────────────────────────────────────────
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const incluirInactivas = searchParams.get('incluirInactivas') === 'true';
    const soloPlantillas = searchParams.get('soloPlantillas') === 'true';

    // Si solo piden plantillas
    if (soloPlantillas) {
      let query = supabase
        .from('Plantillas_PDP')
        .select('*, Categorias_PDP(nombre, color)')
        .is('deleted_at', null)
        .order('orden', { ascending: true });

      if (!incluirInactivas) query = query.eq('activa', true);

      const { data, error } = await query;
      if (error) throw error;

      const plantillas = (data || []).map((p: any) => ({
        id: p.id,
        codigo: p.codigo,
        nombre: p.nombre,
        descripcion: p.descripcion,
        componente: p.componente,
        categoria_id: p.categoria_id,
        imagen_url: p.imagen_url,
        premium: p.premium,
        verificada: p.verificada,
        variante: p.variante,
        orden: p.orden,
        activa: p.activa,
        categoria_nombre: p.Categorias_PDP?.nombre || null,
        categoria_color: p.Categorias_PDP?.color || null,
      }));

      return NextResponse.json({ plantillas });
    }

    // Obtener categorías
    let catQuery = supabase
      .from('Categorias_PDP')
      .select('*')
      .order('orden', { ascending: true });
    if (!incluirInactivas) catQuery = catQuery.eq('activa', true);
    const { data: categorias, error: catError } = await catQuery;
    if (catError) throw catError;

    return NextResponse.json({ categorias: categorias || [] });
  } catch (err) {
    console.error('GET /api/categorias-pdp error:', err);
    return NextResponse.json({ error: 'Error al obtener categorías' }, { status: 500 });
  }
}

// ────────────────────────────────────────────────────────────
// POST: Gestionar categorías y plantillas
// ────────────────────────────────────────────────────────────
export async function POST(request: Request) {
  try {
    const cookieHeader = request.headers.get('cookie') || '';
    const cookies = parse(cookieHeader);
    const accessToken = cookies[ACCESS_COOKIE];
    if (!accessToken) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

    const payload = verifyAccessToken(accessToken);
    if (payload.role !== 'admin') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
    }

    const body = await request.json();
    const { accion, tabla } = body;

    // ── Categorías ──
    if (tabla === 'categoria') {
      if (accion === 'crear') {
        const { nombre, descripcion, icono, color, orden } = body;
        const { data, error } = await supabase
          .from('Categorias_PDP')
          .insert({ nombre, descripcion, icono, color, orden })
          .select()
          .single();
        if (error) throw error;
        return NextResponse.json({ success: true, data });
      }
      if (accion === 'actualizar') {
        const { id, ...campos } = body;
        delete campos.accion;
        delete campos.tabla;
        const { error } = await supabase.from('Categorias_PDP').update(campos).eq('id', id);
        if (error) throw error;
        return NextResponse.json({ success: true });
      }
      if (accion === 'eliminar') {
        const { id } = body;
        const { error } = await supabase.from('Categorias_PDP').delete().eq('id', id);
        if (error) throw error;
        return NextResponse.json({ success: true });
      }
      if (accion === 'toggle') {
        const { id, activa } = body;
        const { error } = await supabase.from('Categorias_PDP').update({ activa }).eq('id', id);
        if (error) throw error;
        return NextResponse.json({ success: true });
      }
    }

    // ── Plantillas ──
    if (tabla === 'plantilla') {
      if (accion === 'asignar_categoria') {
        const { id, categoria_id } = body;
        const { error } = await supabase.from('Plantillas_PDP').update({ categoria_id }).eq('id', id);
        if (error) throw error;
        return NextResponse.json({ success: true });
      }
      if (accion === 'actualizar') {
        const { id, ...campos } = body;
        delete campos.accion;
        delete campos.tabla;
        const { error } = await supabase.from('Plantillas_PDP').update(campos).eq('id', id);
        if (error) throw error;
        return NextResponse.json({ success: true });
      }
    }

    return NextResponse.json({ error: 'Acción no válida' }, { status: 400 });
  } catch (err) {
    console.error('POST /api/categorias-pdp error:', err);
    return NextResponse.json({ error: 'Error al procesar acción' }, { status: 500 });
  }
}
