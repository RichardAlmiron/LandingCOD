import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { cookies } from 'next/headers';
import { verifyAccessToken } from '@/lib/auth';

export const dynamic = 'force-dynamic';

const ACCESS_COOKIE = 'access_token';

// Helper para verificar autenticación
async function verifyAuth() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_COOKIE)?.value;

  if (!accessToken) {
    return { error: 'No autenticado', status: 401 };
  }

  let payload;
  try {
    payload = verifyAccessToken(accessToken);
  } catch {
    return { error: 'Token inválido', status: 401 };
  }

  return { userId: payload.sub };
}

// GET - Obtener descuentos del usuario
export async function GET(request: NextRequest) {
  try {
    const auth = await verifyAuth();
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');

    let query = supabase
      .from('product_discounts')
      .select('*')
      .eq('user_id', auth.userId);

    if (productId) {
      query = query.eq('product_id', productId);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error al obtener descuentos:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ discounts: data || [] });
  } catch (error) {
    console.error('Error en GET /api/discounts:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

// POST - Crear o actualizar descuento
export async function POST(request: NextRequest) {
  try {
    const auth = await verifyAuth();
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const body = await request.json();
    const { product_id, discount_percent, is_active = true } = body;

    if (!product_id || discount_percent === undefined) {
      return NextResponse.json(
        { error: 'product_id y discount_percent son requeridos' },
        { status: 400 }
      );
    }

    if (discount_percent < 0 || discount_percent > 100) {
      return NextResponse.json(
        { error: 'El porcentaje debe estar entre 0 y 100' },
        { status: 400 }
      );
    }

    // Upsert: crear o actualizar
    const { data, error } = await supabase
      .from('product_discounts')
      .upsert({
        user_id: auth.userId,
        product_id,
        discount_percent,
        is_active
      }, {
        onConflict: 'user_id,product_id'
      })
      .select()
      .single();

    if (error) {
      console.error('Error al guardar descuento:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ discount: data });
  } catch (error) {
    console.error('Error en POST /api/discounts:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}

// DELETE - Eliminar descuento
export async function DELETE(request: NextRequest) {
  try {
    const auth = await verifyAuth();
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');

    if (!productId) {
      return NextResponse.json(
        { error: 'productId es requerido' },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from('product_discounts')
      .delete()
      .eq('user_id', auth.userId)
      .eq('product_id', productId);

    if (error) {
      console.error('Error al eliminar descuento:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error en DELETE /api/discounts:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
