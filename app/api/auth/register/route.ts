import { NextResponse } from 'next/server';
import { supabase, DbUser } from '@/lib/supabase';
import {
    hashPassword,
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

export async function POST(request: Request) {
    try {
        const { name, email, password, plan = 'free', role = 'user' } = await request.json();

        // ── Validate input ────────────────────────────────────────────────────
        if (!name || !email || !password) {
            return NextResponse.json({ error: 'Name, email, and password are required' }, { status: 400 });
        }
        if (password.length < 8) {
            return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 });
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
        }

        // ── Check if user already exists ──────────────────────────────────────
        const { data: existing } = await supabase
            .from('usuarios')
            .select('id')
            .eq('email', email.toLowerCase())
            .maybeSingle();

        if (existing) {
            return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
        }

        // ── Hash password ─────────────────────────────────────────────────────
        const password_hash = await hashPassword(password);

        // ── Insert user ───────────────────────────────────────────────────────
        const { data: user, error: insertError } = await supabase
            .from('usuarios')
            .insert({
                name: name.trim(),
                email: email.toLowerCase().trim(),
                password_hash,
                plan: ['free', 'pro', 'enterprise'].includes(plan) ? plan : 'free',
                role: ['user', 'admin'].includes(role) ? role : 'user',
            })
            .select('id, email, name, plan, role, created_at')
            .single();

        if (insertError || !user) {
            console.error('Insert error:', insertError);
            return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
        }

        // ── Issue tokens ──────────────────────────────────────────────────────
        const accessToken = signAccessToken({
            sub: user.id,
            email: user.email,
            name: user.name,
            plan: user.plan,
            role: user.role,
        });

        const jti = generateJti();
        const refreshToken = signRefreshToken(user.id, jti);

        // Store hashed refresh token in DB
        const refreshTokenHash = hashToken(refreshToken);
        await supabase.from('sesiones_activas').insert({
            user_id: user.id,
            refresh_token_hash: refreshTokenHash,
            expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        });

        // ── Set cookies ───────────────────────────────────────────────────────
        const secure = process.env.NODE_ENV === 'production';
        const response = NextResponse.json({
            user: { id: user.id, email: user.email, name: user.name, plan: user.plan, role: user.role },
            message: 'Account created successfully',
        }, { status: 201 });

        response.headers.append('Set-Cookie', serialize(ACCESS_COOKIE, accessToken, accessCookieOptions(secure)));
        response.headers.append('Set-Cookie', serialize(REFRESH_COOKIE, refreshToken, refreshCookieOptions(secure)));

        return response;
    } catch (err) {
        console.error('Register error:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
