import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { verifyAccessToken, ACCESS_COOKIE } from '@/lib/auth';
import { parse } from 'cookie';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const cookieHeader = request.headers.get('cookie') || '';
    const cookies = parse(cookieHeader);
    const accessToken = cookies[ACCESS_COOKIE];

    if (!accessToken) return NextResponse.json({ error: 'No autenticado' }, { status: 401 });

    let payload;
    try {
      payload = verifyAccessToken(accessToken);
    } catch (authErr: any) {
      return NextResponse.json({ error: 'Sesión inválida o expirada' }, { status: 401 });
    }

    if (payload.role !== 'admin') {
      return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const templateId = formData.get('templateId') as string;

    if (!file || !templateId) {
      return NextResponse.json({ error: 'Archivo y templateId requeridos' }, { status: 400 });
    }

    // Convert file to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const fileName = `${templateId}-${Date.now()}.webp`;

    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('pdp-previews')
      .upload(fileName, buffer, {
        contentType: 'image/webp',
        upsert: true
      });

    if (uploadError) {
      return NextResponse.json({ error: 'Error al subir imagen a storage', details: uploadError.message }, { status: 500 });
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('pdp-previews')
      .getPublicUrl(fileName);

    // Update database
    const { error: dbError } = await supabase
      .from('Plantillas_PDP')
      .update({ imagen_url: publicUrl })
      .eq('id', templateId);

    if (dbError) {
      return NextResponse.json({ error: 'Error al actualizar base de datos', details: dbError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, imageUrl: publicUrl });
  } catch (err: any) {
    console.error('CRITICAL POST /api/templates/pdp/upload error:', err);
    return NextResponse.json({ 
      error: 'Error interno del servidor', 
      message: err.message
    }, { status: 500 });
  }
}
