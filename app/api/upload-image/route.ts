import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { verifyAccessToken, ACCESS_COOKIE } from '@/lib/auth';
import { parse } from 'cookie';

export const dynamic = 'force-dynamic';

const BUCKET = 'store-images';
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(request: Request) {
  try {
    const cookieHeader = request.headers.get('cookie') || '';
    const cookies = parse(cookieHeader);
    const accessToken = cookies[ACCESS_COOKIE];

    if (!accessToken) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

    let payload;
    try {
      payload = verifyAccessToken(accessToken);
    } catch {
      return NextResponse.json({ error: 'Sesión inválida o expirada' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No se recibió ningún archivo' }, { status: 400 });
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: 'La imagen excede el límite de 5MB' }, { status: 400 });
    }

    // Validate mime type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Formato no soportado. Usa JPG, PNG, WebP, GIF o SVG.' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // File path: user_id/timestamp-random.ext
    const ext = file.name.split('.').pop() || 'png';
    const fileName = `${payload.sub}/${Date.now()}-${Math.random().toString(36).slice(2, 6)}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.error('[upload-image] Storage error:', uploadError);
      return NextResponse.json({ error: 'Error al subir la imagen', details: uploadError.message }, { status: 500 });
    }

    const { data: { publicUrl } } = supabase.storage
      .from(BUCKET)
      .getPublicUrl(fileName);

    return NextResponse.json({ success: true, url: publicUrl });
  } catch (err: any) {
    console.error('[upload-image] Error:', err);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
