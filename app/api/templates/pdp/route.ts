import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { verifyAccessToken, ACCESS_COOKIE } from '@/lib/auth';
import { parse } from 'cookie';

// Obtener todos los PDPs
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const includeDeleted = searchParams.get('includeDeleted') === 'true';

    let query = supabase
      .from('Paginas_de_Productos_Reutilizables')
      .select('*')
      .order('created_at', { ascending: true });

    if (!includeDeleted) {
      query = query.is('deleted_at', null);
    }

    const { data: pdps, error } = await query;

    if (error) throw error;
    
    // Map database columns to PdpTemplate format
    const mappedPdps = pdps?.map((pdp: any) => ({
      id: pdp.id,
      name: pdp.name || 'Sin nombre',
      description: pdp.description || '',
      category: pdp.category || 'urgency',
      image_url: pdp.image_url || null,
      premium: pdp.premium || false
    })) || [];
    
    return NextResponse.json({ pdps: mappedPdps });
  } catch (err) {
    console.error('GET /api/templates/pdp error:', err);
    return NextResponse.json({ error: 'Error al obtener páginas de producto reutilizables' }, { status: 500 });
  }
}

// Gestionar PDP (Soft Delete, Restore, Permanent Delete)
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

    const { id, action } = await request.json();

    if (!id) return NextResponse.json({ error: 'ID requerido' }, { status: 400 });

    if (action === 'restore') {
      const { error } = await supabase
        .from('Paginas_de_Productos_Reutilizables')
        .update({ deleted_at: null })
        .eq('id', id);
      if (error) throw error;
      return NextResponse.json({ success: true, message: 'PDP restablecido' });
    }

    if (action === 'delete_permanent') {
      const { error } = await supabase
        .from('Paginas_de_Productos_Reutilizables')
        .delete()
        .eq('id', id);
      if (error) throw error;
      return NextResponse.json({ success: true, message: 'PDP eliminado definitivamente' });
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

    if (!id) return NextResponse.json({ error: 'ID de PDP requerido' }, { status: 400 });

    // Soft Delete por defecto
    const { error } = await supabase
      .from('Paginas_de_Productos_Reutilizables')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw error;
    
    return NextResponse.json({ success: true, message: 'PDP movido a la papelera' });
  } catch (err) {
    console.error('DELETE /api/templates/pdp error:', err);
    return NextResponse.json({ error: 'Error al eliminar PDP' }, { status: 500 });
  }
}
