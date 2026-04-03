import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { verifyAccessToken, ACCESS_COOKIE } from '@/lib/auth';
import { parse } from 'cookie';

// ────────────────────────────────────────────────────────────
// GET: Obtener categorías con subcategorías y plantillas
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
        .select('*, Categorias_PDP(nombre, color), Subcategorias_PDP(nombre)')
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
        subcategoria_id: p.subcategoria_id,
        imagen_url: p.imagen_url,
        premium: p.premium,
        verificada: p.verificada,
        variante: p.variante,
        orden: p.orden,
        activa: p.activa,
        categoria_nombre: p.Categorias_PDP?.nombre || null,
        categoria_color: p.Categorias_PDP?.color || null,
        subcategoria_nombre: p.Subcategorias_PDP?.nombre || null,
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

    // Obtener subcategorías
    let subQuery = supabase
      .from('Subcategorias_PDP')
      .select('*')
      .order('orden', { ascending: true });
    if (!incluirInactivas) subQuery = subQuery.eq('activa', true);
    const { data: subcategorias, error: subError } = await subQuery;
    if (subError) throw subError;

    // Anidar subcategorías dentro de categorías
    const resultado = (categorias || []).map((cat: any) => ({
      ...cat,
      subcategorias: (subcategorias || []).filter((sub: any) => sub.categoria_id === cat.id),
    }));

    return NextResponse.json({ categorias: resultado });
  } catch (err) {
    console.error('GET /api/categorias-pdp error:', err);
    return NextResponse.json({ error: 'Error al obtener categorías' }, { status: 500 });
  }
}

// ────────────────────────────────────────────────────────────
// POST: Gestionar categorías, subcategorías y plantillas
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

    // ── Subcategorías ──
    if (tabla === 'subcategoria') {
      if (accion === 'crear') {
        const { categoria_id, nombre, descripcion, icono, orden } = body;
        const { data, error } = await supabase
          .from('Subcategorias_PDP')
          .insert({ categoria_id, nombre, descripcion, icono, orden })
          .select()
          .single();
        if (error) throw error;
        return NextResponse.json({ success: true, data });
      }
      if (accion === 'actualizar') {
        const { id, ...campos } = body;
        delete campos.accion;
        delete campos.tabla;
        const { error } = await supabase.from('Subcategorias_PDP').update(campos).eq('id', id);
        if (error) throw error;
        return NextResponse.json({ success: true });
      }
      if (accion === 'eliminar') {
        const { id } = body;
        const { error } = await supabase.from('Subcategorias_PDP').delete().eq('id', id);
        if (error) throw error;
        return NextResponse.json({ success: true });
      }
    }

    // ── Plantillas ──
    if (tabla === 'plantilla') {
      if (accion === 'asignar_categoria') {
        const { id, categoria_id, subcategoria_id } = body;
        const updateData: any = {};
        if (categoria_id !== undefined) updateData.categoria_id = categoria_id;
        if (subcategoria_id !== undefined) updateData.subcategoria_id = subcategoria_id;
        const { error } = await supabase.from('Plantillas_PDP').update(updateData).eq('id', id);
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
