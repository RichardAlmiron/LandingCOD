import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { verifyAccessToken } from '@/lib/auth';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// GET - Retrieve user preference
export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;
    
    // Si no hay token, retornar modo por defecto para demo
    if (!accessToken) {
      return NextResponse.json({
        success: true,
        selected_mode: 'fullscreenslider'
      });
    }

    const payload = verifyAccessToken(accessToken);
    if (!payload) {
      return NextResponse.json({
        success: true,
        selected_mode: 'fullscreenslider'
      });
    }

    const { searchParams } = new URL(request.url);
    const entityType = searchParams.get('entity_type') || 'pdp_display_mode';

    const { data, error } = await supabase
      .from('ui_preferences')
      .select('selected_mode')
      .eq('user_id', payload.sub)
      .eq('entity_type', entityType)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching preference:', error);
      return NextResponse.json({
        success: true,
        selected_mode: 'fullscreenslider' // Fallback a modo por defecto
      });
    }

    return NextResponse.json({
      success: true,
      selected_mode: data?.selected_mode || 'fullscreenslider'
    });

  } catch (error) {
    console.error('GET preference error:', error);
    return NextResponse.json({
      success: true,
      selected_mode: 'fullscreenslider' // Fallback a modo por defecto
    });
  }
}

// POST - Save or update user preference
export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;
    
    // Si no hay token, solo retornar success para demo (no guardar en BD)
    if (!accessToken) {
      const body = await request.json();
      return NextResponse.json({
        success: true,
        message: 'Demo mode - preference not saved'
      });
    }

    const payload = verifyAccessToken(accessToken);
    if (!payload) {
      const body = await request.json();
      return NextResponse.json({
        success: true,
        message: 'Demo mode - preference not saved'
      });
    }

    const body = await request.json();
    const { entity_type, selected_mode } = body;

    if (!entity_type || !selected_mode) {
      return NextResponse.json({ 
        error: 'Missing required fields: entity_type, selected_mode' 
      }, { status: 400 });
    }

    // Upsert preference
    const { data, error } = await supabase
      .from('ui_preferences')
      .upsert({
        user_id: payload.sub,
        entity_type,
        selected_mode
      }, {
        onConflict: 'user_id,entity_type'
      })
      .select()
      .single();

    if (error) {
      console.error('Error saving preference:', error);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      data
    });

  } catch (error) {
    console.error('POST preference error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
