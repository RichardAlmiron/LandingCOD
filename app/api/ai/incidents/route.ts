import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

// GET: Obtener incidentes para el panel admin
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(100, parseInt(searchParams.get('limit') || '50'));
    const unreadOnly = searchParams.get('unread') === 'true';

    let query = supabase
      .from('ai_engine_incidents')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (unreadOnly) {
      query = query.eq('read', false);
    }

    const { data, error } = await query;
    if (error) throw error;

    // Contar no leídos
    const { count } = await supabase
      .from('ai_engine_incidents')
      .select('id', { count: 'exact', head: true })
      .eq('read', false);

    return NextResponse.json({
      success: true,
      incidents: data || [],
      unreadCount: count || 0,
    });
  } catch (err: any) {
    console.error('[AI Incidents GET]', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// PATCH: Marcar incidentes como leídos
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { ids, markAllRead } = body;

    if (markAllRead) {
      const { error } = await supabase
        .from('ai_engine_incidents')
        .update({ read: true })
        .eq('read', false);
      if (error) throw error;
    } else if (ids?.length) {
      const { error } = await supabase
        .from('ai_engine_incidents')
        .update({ read: true })
        .in('id', ids);
      if (error) throw error;
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('[AI Incidents PATCH]', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
