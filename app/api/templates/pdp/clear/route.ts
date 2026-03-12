import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { verifyAccessToken, ACCESS_COOKIE } from '@/lib/auth';
import { parse } from 'cookie';

const MAX_RETRIES = 3;
const PAGE_SIZE = 100;

// Auth helper
async function verifyAuth(request: Request) {
  const cookieHeader = request.headers.get('cookie') || '';
  const cookies = parse(cookieHeader);
  const accessToken = cookies[ACCESS_COOKIE];

  if (!accessToken) {
    return { error: 'No autenticado', status: 401 };
  }

  const payload = verifyAccessToken(accessToken);
  if (payload.role !== 'admin') {
    return { error: 'No autorizado', status: 403 };
  }

  return { payload };
}

// Log de auditoría
async function logAudit(payload: any, action: string, details: any, success: boolean) {
  try {
    await supabase.from('audit_logs').insert({
      user_id: payload.userId || payload.sub,
      user_email: payload.email,
      action,
      details: JSON.stringify(details),
      success,
      created_at: new Date().toISOString()
    });
  } catch (err) {
    console.error('Error logging audit:', err);
  }
}

// Retry helper
async function withRetry<T>(fn: () => Promise<T>, retries = MAX_RETRIES): Promise<T> {
  let lastError: any;
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (i < retries - 1) {
        await new Promise(r => setTimeout(r, 500 * (i + 1)));
      }
    }
  }
  throw lastError;
}

// PASO 1: Analizar - Cuenta cuántas imágenes existen (con paginación)
export async function GET(request: Request) {
  try {
    const auth = await verifyAuth(request);
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const { searchParams } = new URL(request.url);
    const analyze = searchParams.get('analyze') === 'true';
    const page = parseInt(searchParams.get('page') || '0', 10);

    if (!analyze) {
      return NextResponse.json({ error: 'Use ?analyze=true' }, { status: 400 });
    }

    // Primero: contar total
    const { count: totalCount, error: countError } = await supabase
      .from('Paginas_de_Productos_Reutilizables')
      .select('*', { count: 'exact', head: true })
      .not('image_url', 'is', null)
      .is('deleted_at', null);

    if (countError) {
      await logAudit(auth.payload, 'pdp_clear_analyze', { error: countError.message }, false);
      return NextResponse.json({ error: 'Error al contar PDPs', details: countError.message }, { status: 500 });
    }

    const count = totalCount || 0;
    const hasMore = count > ((page + 1) * PAGE_SIZE);

    // Si hay muchos, paginar
    let pdps: any[] = [];
    if (count > 0) {
      const { data, error: dbError } = await supabase
        .from('Paginas_de_Productos_Reutilizables')
        .select('id, name, category, image_url')
        .not('image_url', 'is', null)
        .is('deleted_at', null)
        .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);

      if (dbError) {
        await logAudit(auth.payload, 'pdp_clear_analyze', { error: dbError.message }, false);
        return NextResponse.json({ error: 'Error al obtener PDPs', details: dbError.message }, { status: 500 });
      }
      pdps = data || [];
    }

    await logAudit(auth.payload, 'pdp_clear_analyze', { count, page, pageSize: PAGE_SIZE }, true);

    return NextResponse.json({
      success: true,
      count,
      templates: pdps,
      page,
      pageSize: PAGE_SIZE,
      hasMore,
      message: count === 0 ? 'No hay imágenes para eliminar' : `Encontradas ${count} imágenes (página ${page + 1})`
    });

  } catch (err: any) {
    console.error('Error analyzing:', err);
    return NextResponse.json({ error: 'Error interno', message: err.message }, { status: 500 });
  }
}

// PASO 2: Eliminar - Elimina una imagen específica (o todas si no se especifica)
export async function POST(request: Request) {
  try {
    const auth = await verifyAuth(request);
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const body = await request.json();
    const { templateId } = body;

    // Si viene templateId, eliminar solo ese (con retry)
    if (templateId) {
      try {
        const result = await withRetry(async () => {
          // Obtener el PDP
          const { data: template, error: getError } = await supabase
            .from('Paginas_de_Productos_Reutilizables')
            .select('id, image_url')
            .eq('id', templateId)
            .single();

          if (getError || !template) {
            throw new Error('Template no encontrado');
          }

          if (!template.image_url) {
            return { success: true, message: 'No tenía imagen' };
          }

          // Extraer filename y eliminar de Storage
          const fileName = template.image_url.split('/').pop();
          if (fileName) {
            await supabase.storage.from('pdp-previews').remove([fileName]);
          }

          // Limpiar BD
          await supabase
            .from('Paginas_de_Productos_Reutilizables')
            .update({ image_url: null })
            .eq('id', templateId);

          return { success: true, id: templateId, message: 'Imagen eliminada' };
        });

        await logAudit(auth.payload, 'pdp_clear_single', { templateId }, true);
        return NextResponse.json(result);

      } catch (err: any) {
        await logAudit(auth.payload, 'pdp_clear_single', { templateId, error: err.message }, false);
        return NextResponse.json({ error: 'Error al eliminar después de 3 intentos', message: err.message }, { status: 500 });
      }
    }

    // Si no viene templateId, eliminar TODAS (modo legacy con retry por elemento)
    const { data: pdps, error: dbError } = await supabase
      .from('Paginas_de_Productos_Reutilizables')
      .select('id, image_url')
      .not('image_url', 'is', null)
      .is('deleted_at', null);

    if (dbError) {
      await logAudit(auth.payload, 'pdp_clear_all', { error: dbError.message }, false);
      return NextResponse.json({ error: 'Error al obtener PDPs' }, { status: 500 });
    }

    let cleared = 0;
    const failed: string[] = [];

    for (const template of (pdps || [])) {
      try {
        await withRetry(async () => {
          const fileName = template.image_url?.split('/').pop();
          if (fileName) {
            await supabase.storage.from('pdp-previews').remove([fileName]);
          }
          await supabase
            .from('Paginas_de_Productos_Reutilizables')
            .update({ image_url: null })
            .eq('id', template.id);
        });
        cleared++;
      } catch (err) {
        console.error(`Error eliminando ${template.id} después de 3 intentos:`, err);
        failed.push(template.id);
      }
    }

    await logAudit(auth.payload, 'pdp_clear_all', { total: pdps?.length || 0, cleared, failed: failed.length }, failed.length === 0);

    return NextResponse.json({
      success: true,
      cleared,
      failed: failed.length,
      failedIds: failed,
      message: `${cleared} de ${pdps?.length || 0} imágenes eliminadas${failed.length > 0 ? `, ${failed.length} fallaron` : ''}`
    });

  } catch (err: any) {
    console.error('Error clearing:', err);
    return NextResponse.json({ error: 'Error interno', message: err.message }, { status: 500 });
  }
}
