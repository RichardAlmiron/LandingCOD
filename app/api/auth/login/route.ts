import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';
import {
    comparePassword,
    signAccessToken,
    signRefreshToken,
    generateJti,
    hashToken,
    ACCESS_COOKIE,
    REFRESH_COOKIE,
    accessCookieOptions,
    refreshCookieOptions,
} from '@/lib/auth';
import { serialize } from 'cookie';

export const dynamic = 'force-dynamic';

/**
 * Login con autenticación dual:
 * 1. Primero verifica si es un dropshipper de Almidrop
 * 2. Si no, busca en usuarios admin de LandingCOD
 * 3. Si no, busca en usuarios externos de LandingCOD
 */
export async function POST(request: Request) {
    try {
        const { email, password, context } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ error: 'Email y contraseña son obligatorios' }, { status: 400 });
        }

        if (context && !['client', 'admin'].includes(context)) {
            return NextResponse.json({ error: 'Contexto inválido' }, { status: 400 });
        }

        const normalizedEmail = email.toLowerCase().trim();

        // ── 1. Verificar en Almidrop (solo dropshippers) ──────────────────────
        if (context !== 'admin') {
            const almidropUrl = process.env.ALMIDROP_SUPABASE_URL;
            const almidropKey = process.env.ALMIDROP_SUPABASE_SERVICE_ROLE_KEY;

            if (almidropUrl && almidropKey) {
                const almidropDb = createClient(almidropUrl, almidropKey);
                const { data: almidropUser } = await almidropDb
                    .from('users')
                    .select('id, email, password_hash, full_name, is_dropshipper')
                    .eq('email', normalizedEmail)
                    .eq('is_dropshipper', true)
                    .maybeSingle();

                if (almidropUser) {
                    const validAlmidrop = await bcrypt.compare(password, almidropUser.password_hash);
                    if (validAlmidrop) {
                        return issueTokens({
                            id: `almidrop_${almidropUser.id}`,
                            email: almidropUser.email,
                            name: almidropUser.full_name || 'Dropshipper',
                            plan: 'almidrop',
                            role: 'user',
                            source: 'almidrop',
                            almidropId: almidropUser.id,
                        });
                    }
                    // Password wrong for Almidrop user
                    return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 });
                }
            }
        }

        // ── 2. Verificar en usuarios admin de LandingCOD ─────────────────────
        const { data: adminUser } = await supabase
            .from('usuarios')
            .select('id, email, name, plan, role, password_hash')
            .eq('email', normalizedEmail)
            .maybeSingle();

        if (adminUser) {
            const validAdmin = await comparePassword(password, adminUser.password_hash);
            if (!validAdmin) {
                return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 });
            }
            if (context === 'admin' && adminUser.role !== 'admin') {
                return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 });
            }
            if (context === 'client' && adminUser.role === 'admin') {
                return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 });
            }
            return issueTokens({
                id: adminUser.id,
                email: adminUser.email,
                name: adminUser.name,
                plan: adminUser.plan,
                role: adminUser.role,
                source: 'landingcod',
            });
        }

        // ── 3. Verificar en usuarios externos de LandingCOD ──────────────────
        if (context !== 'admin') {
            const { data: externalUser } = await supabase
                .from('usuarios_externos')
                .select('id, email, full_name, password_hash, is_active')
                .eq('email', normalizedEmail)
                .maybeSingle();

            if (externalUser) {
                if (!externalUser.is_active) {
                    return NextResponse.json({ error: 'Tu cuenta está desactivada. Contacta a soporte.' }, { status: 403 });
                }
                const validExternal = await bcrypt.compare(password, externalUser.password_hash);
                if (!validExternal) {
                    return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 });
                }
                return issueTokens({
                    id: externalUser.id,
                    email: externalUser.email,
                    name: externalUser.full_name,
                    plan: 'free',
                    role: 'user',
                    source: 'external',
                });
            }
        }

        // No user found anywhere
        return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 });
    } catch (err) {
        console.error('Login error:', err);
        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
    }
}

/**
 * Genera tokens JWT y setea cookies para cualquier tipo de usuario.
 */
async function issueTokens(user: {
    id: string; email: string; name: string; plan: string;
    role: 'user' | 'admin'; source: string; almidropId?: string;
}) {
    const accessToken = signAccessToken({
        sub: user.id,
        email: user.email,
        name: user.name,
        plan: user.plan,
        role: user.role,
    });

    const jti = generateJti();
    const refreshToken = signRefreshToken(user.id, jti);

    await supabase.from('sesiones_activas').delete().eq('user_id', user.id);
    await supabase.from('sesiones_activas').insert({
        user_id: user.id,
        refresh_token_hash: hashToken(refreshToken),
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    });

    const secure = process.env.NODE_ENV === 'production';
    const response = NextResponse.json({
        user: {
            id: user.id,
            email: user.email,
            name: user.name,
            plan: user.plan,
            role: user.role,
            source: user.source,
            ...(user.almidropId ? { almidropId: user.almidropId } : {}),
        },
    });

    response.headers.append('Set-Cookie', serialize(ACCESS_COOKIE, accessToken, accessCookieOptions(secure)));
    response.headers.append('Set-Cookie', serialize(REFRESH_COOKIE, refreshToken, refreshCookieOptions(secure)));

    return response;
}
