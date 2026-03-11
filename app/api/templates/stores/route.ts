import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { verifyAccessToken, ACCESS_COOKIE } from '@/lib/auth';
import { parse } from 'cookie';

// Obtener todas las tiendas
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const includeDeleted = searchParams.get('includeDeleted') === 'true';

    let query = supabase
      .from('Tiendas_Reutilizables')
      .select('*')
      .order('created_at', { ascending: true });

    if (!includeDeleted) {
      query = query.is('deleted_at', null);
    }

    const { data: stores, error } = await query;

    if (error) throw error;
    return NextResponse.json({ stores });
  } catch (err) {
    console.error('GET /api/templates/stores error:', err);
    return NextResponse.json({ error: 'Error al obtener tiendas reutilizables' }, { status: 500 });
  }
}

// Gestionar tienda (Soft Delete, Restore, Permanent Delete)
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
        .from('Tiendas_Reutilizables')
        .update({ deleted_at: null })
        .eq('id', id);
      if (error) throw error;
      return NextResponse.json({ success: true, message: 'Plantilla restablecida' });
    }

    if (action === 'delete_permanent') {
      const { error } = await supabase
        .from('Tiendas_Reutilizables')
        .delete()
        .eq('id', id);
      if (error) throw error;
      return NextResponse.json({ success: true, message: 'Plantilla eliminada definitivamente' });
    }

    return NextResponse.json({ error: 'Acción no válida' }, { status: 400 });
  } catch (err) {
    console.error('POST /api/templates/stores error:', err);
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

    if (!id) return NextResponse.json({ error: 'ID de tienda requerido' }, { status: 400 });

    // Soft Delete por defecto
    const { error } = await supabase
      .from('Tiendas_Reutilizables')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw error;
    
    return NextResponse.json({ success: true, message: 'Plantilla movida a la papelera' });
  } catch (err) {
    console.error('DELETE /api/templates/stores error:', err);
    return NextResponse.json({ error: 'Error al eliminar tienda' }, { status: 500 });
  }
}
