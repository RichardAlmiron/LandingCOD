import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// GET - Retrieve global display mode (for all users)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const entityType = searchParams.get('entity_type') || 'pdp_display_mode';

    // Buscar el modo global (is_global = TRUE)
    const { data, error } = await supabase
      .from('ui_preferences')
      .select('selected_mode')
      .eq('is_global', true)
      .eq('entity_type', entityType)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching preference:', error);
    }

    // Retornar el modo global o el default
    return NextResponse.json({
      success: true,
      selected_mode: data?.selected_mode || 'filmstrip'
    });

  } catch (error) {
    console.error('GET preference error:', error);
    return NextResponse.json({
      success: true,
      selected_mode: 'filmstrip'
    });
  }
}

// POST - Save global display mode (admin only, affects all users)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { entity_type, selected_mode } = body;

    if (!entity_type || !selected_mode) {
      return NextResponse.json({ 
        error: 'Missing required fields: entity_type, selected_mode' 
      }, { status: 400 });
    }

    // Guardar como global (is_global = TRUE, user_id = NULL)
    // Primero intentar update, si no existe hacer insert
    const { data: existing } = await supabase
      .from('ui_preferences')
      .select('id')
      .eq('is_global', true)
      .eq('entity_type', entity_type)
      .single();
    
    let result;
    if (existing) {
      // Update existing
      result = await supabase
        .from('ui_preferences')
        .update({ selected_mode })
        .eq('id', existing.id)
        .select()
        .single();
    } else {
      // Insert new
      result = await supabase
        .from('ui_preferences')
        .insert({
          user_id: null,
          is_global: true,
          entity_type,
          selected_mode
        })
        .select()
        .single();
    }
    
    const { data, error } = result;

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
