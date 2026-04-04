import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { hashPassword, signAccessToken, signRefreshToken, generateJti, hashToken, ACCESS_COOKIE, REFRESH_COOKIE, accessCookieOptions, refreshCookieOptions } from '@/lib/auth';
import { serialize } from 'cookie';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { email, password, fullName, phone, city } = await request.json();

    if (!email || !password || !fullName) {
      return NextResponse.json({ error: 'Email, contraseña y nombre completo son obligatorios' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: 'La contraseña debe tener al menos 6 caracteres' }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if email already exists in usuarios_externos
    const { data: existing } = await supabase
      .from('usuarios_externos')
      .select('id')
      .eq('email', normalizedEmail)
      .maybeSingle();

    if (existing) {
      return NextResponse.json({ error: 'Este email ya está registrado' }, { status: 409 });
    }

    // Check if email exists in Almidrop (dropshippers should use their Almidrop credentials)
    const almidropUrl = process.env.ALMIDROP_SUPABASE_URL;
    const almidropKey = process.env.ALMIDROP_SUPABASE_SERVICE_ROLE_KEY;
    if (almidropUrl && almidropKey) {
      const { createClient } = await import('@supabase/supabase-js');
      const almidropDb = createClient(almidropUrl, almidropKey);
      const { data: almidropUser } = await almidropDb
        .from('users')
        .select('id')
        .eq('email', normalizedEmail)
        .eq('is_dropshipper', true)
        .maybeSingle();

      if (almidropUser) {
        return NextResponse.json({ 
          error: 'Este email pertenece a un usuario de AlmiDrop. Iniciá sesión directamente con tus credenciales de AlmiDrop.' 
        }, { status: 409 });
      }
    }

    // Create the external user
    const passwordHash = await hashPassword(password);
    const { data: newUser, error: insertError } = await supabase
      .from('usuarios_externos')
      .insert({
        email: normalizedEmail,
        password_hash: passwordHash,
        full_name: fullName.trim(),
        phone: phone?.trim() || null,
        city: city?.trim() || null,
      })
      .select('id, email, full_name')
      .single();

    if (insertError) {
      console.error('Register external error:', insertError);
      return NextResponse.json({ error: 'Error al crear la cuenta' }, { status: 500 });
    }

    // Issue tokens
    const accessToken = signAccessToken({
      sub: newUser.id,
      email: newUser.email,
      name: newUser.full_name,
      plan: 'free',
      role: 'user',
    });

    const jti = generateJti();
    const refreshToken = signRefreshToken(newUser.id, jti);

    await supabase.from('sesiones_activas').delete().eq('user_id', newUser.id);
    await supabase.from('sesiones_activas').insert({
      user_id: newUser.id,
      refresh_token_hash: hashToken(refreshToken),
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    });

    const secure = process.env.NODE_ENV === 'production';
    const response = NextResponse.json({
      user: { id: newUser.id, email: newUser.email, name: newUser.full_name, plan: 'free', role: 'user', source: 'external' },
    });

    response.headers.append('Set-Cookie', serialize(ACCESS_COOKIE, accessToken, accessCookieOptions(secure)));
    response.headers.append('Set-Cookie', serialize(REFRESH_COOKIE, refreshToken, refreshCookieOptions(secure)));

    return response;
  } catch (err) {
    console.error('Register external error:', err);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
