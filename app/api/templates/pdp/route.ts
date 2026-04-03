import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { verifyAccessToken, ACCESS_COOKIE } from '@/lib/auth';
import { parse } from 'cookie';

// ────────────────────────────────────────────────────────────
// GET: Obtener plantillas PDP desde Plantillas_PDP (nuevo sistema)
// Mantiene compatibilidad con el formato anterior para clientes existentes
// ────────────────────────────────────────────────────────────
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const includeDeleted = searchParams.get('includeDeleted') === 'true';
    const includeUnverified = searchParams.get('includeUnverified') === 'true';

    let query = supabase
      .from('Plantillas_PDP')
      .select('*, Categorias_PDP(nombre, color)')
      .order('orden', { ascending: true });

    if (!includeDeleted) {
      query = query.is('deleted_at', null);
    }

    if (!includeUnverified) {
      query = query.eq('verificada', true).eq('activa', true);
    }

    const { data: pdps, error } = await query;
    if (error) throw error;

    // Map al formato PdpTemplate que esperan los clientes
    // IMPORTANTE: id = UUID real de la DB, codigo = identificador para renderizar componente
    // Nunca mezclar estos dos campos — cada uno tiene su responsabilidad única
    const mappedPdps = (pdps || []).map((pdp: any) => ({
      id: pdp.id,
      codigo: pdp.codigo,
      name: pdp.nombre || 'Sin nombre',
      description: pdp.descripcion || '',
      image_url: pdp.imagen_url || null,
      premium: pdp.premium || false,
      verified: pdp.verificada || false,
      componente: pdp.componente,
      categoria_nombre: pdp.Categorias_PDP?.nombre || null,
      categoria_color: pdp.Categorias_PDP?.color || null,
    }));

    return NextResponse.json({ pdps: mappedPdps });
  } catch (err) {
    console.error('GET /api/templates/pdp error:', err);
    return NextResponse.json({ error: 'Error al obtener plantillas PDP' }, { status: 500 });
  }
}


// ────────────────────────────────────────────────────────────
// POST: Gestionar plantillas PDP (verificar, eliminar, etc.)
// ────────────────────────────────────────────────────────────
// Helper para saber si el id provisto es un UUID o un código
const isUUID = (str: string) => /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(str);

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

    const { id, action, verified } = await request.json();

    if (!id) return NextResponse.json({ error: 'ID requerido' }, { status: 400 });

    if (action === 'restore') {
      const field = isUUID(id) ? 'id' : 'codigo';
      const { error } = await supabase
        .from('Plantillas_PDP')
        .update({ deleted_at: null })
        .eq(field, id);
      if (error) throw error;
      return NextResponse.json({ success: true, message: 'Plantilla restablecida' });
    }

    if (action === 'delete_permanent') {
      const ids = Array.isArray(id) ? id : [id];
      // Si todos son UUIDs, usamos 'id', sino 'codigo'. (Asumimos que no se mezclan o iteramos)
      // Para mayor seguridad con .in, iteramos si es necesario, o verificamos el primero
      const field = isUUID(ids[0]) ? 'id' : 'codigo';
      const { error } = await supabase
        .from('Plantillas_PDP')
        .delete()
        .in(field, ids);
      if (error) throw error;
      return NextResponse.json({ success: true, message: `${ids.length} plantilla(s) eliminada(s) definitivamente` });
    }

    if (action === 'verify') {
      const field = isUUID(id) ? 'id' : 'codigo';
      const { error } = await supabase
        .from('Plantillas_PDP')
        .update({ 
          verificada: verified === true,
          activa: verified === true 
        })
        .eq(field, id);
      if (error) throw error;
      return NextResponse.json({ 
        success: true, 
        message: verified === true ? 'Plantilla verificada' : 'Plantilla desverificada',
        verified: verified === true
      });
    }

    return NextResponse.json({ error: 'Acción no válida' }, { status: 400 });
  } catch (err) {
    console.error('POST /api/templates/pdp error:', err);
    return NextResponse.json({ error: 'Error al procesar acción' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const cookieHeader = request.headers.get('cookie') || '';
    const cookies = parse(cookieHeader);
    const accessToken = cookies[ACCESS_COOKIE];

    if (!accessToken) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

    const payload = verifyAccessToken(accessToken);
    if (payload.role !== 'admin') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: 'ID de plantilla requerido' }, { status: 400 });

    // Soft Delete
    const field = isUUID(id) ? 'id' : 'codigo';
    const { error } = await supabase
      .from('Plantillas_PDP')
      .update({ deleted_at: new Date().toISOString() })
      .eq(field, id);

    if (error) throw error;
    
    return NextResponse.json({ success: true, message: 'Plantilla movida a la papelera' });
  } catch (err) {
    console.error('DELETE /api/templates/pdp error:', err);
    return NextResponse.json({ error: 'Error al eliminar plantilla' }, { status: 500 });
  }
}

