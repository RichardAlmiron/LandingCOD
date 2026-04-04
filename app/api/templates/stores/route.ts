import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { verifyAccessToken, ACCESS_COOKIE } from '@/lib/auth';
import { parse } from 'cookie';

export const dynamic = 'force-dynamic';

// Obtener todas las tiendas
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const includeDeleted = searchParams.get('includeDeleted') === 'true';
    const includeUnverified = searchParams.get('includeUnverified') === 'true';

    let query = supabase
      .from('Tiendas_Reutilizables')
      .select('*')
      .order('created_at', { ascending: true });

    if (!includeDeleted) {
      query = query.is('deleted_at', null);
    }

    // Si no se solicita incluir no verificadas, filtrar solo verificadas
    if (!includeUnverified) {
      query = query.eq('verified', true);
    }

    const { data: stores, error } = await query;

    if (error) throw error;
    return NextResponse.json({ stores });
  } catch (err) {
    console.error('GET /api/templates/stores error:', err);
    return NextResponse.json({ error: 'Error al obtener tiendas reutilizables' }, { status: 500 });
  }
}

// Gestionar tienda (Soft Delete, Restore, Permanent Delete, Verify)
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
      const { error } = await supabase
        .from('Tiendas_Reutilizables')
        .update({ deleted_at: null })
        .eq('id', id);
      if (error) throw error;
      return NextResponse.json({ success: true, message: 'Plantilla restablecida' });
    }

    if (action === 'delete_permanent') {
      const ids = Array.isArray(id) ? id : [id];
      const { error } = await supabase
        .from('Tiendas_Reutilizables')
        .delete()
        .in('id', ids);
      if (error) throw error;
      return NextResponse.json({ success: true, message: `${ids.length} tienda(s) eliminada(s) definitivamente` });
    }

    if (action === 'verify') {
      const { error } = await supabase
        .from('Tiendas_Reutilizables')
        .update({ verified: verified === true })
        .eq('id', id);
      if (error) throw error;
      return NextResponse.json({ 
        success: true, 
        message: verified === true ? 'Plantilla verificada' : 'Plantilla desverificada',
        verified: verified === true
      });
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
