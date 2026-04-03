import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
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

export async function POST(request: Request) {
    try {
        const { email, password, context } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
        }

        // Validate context parameter
        if (context && !['client', 'admin'].includes(context)) {
            return NextResponse.json({ error: 'Invalid context parameter' }, { status: 400 });
        }

        // ── Find user ─────────────────────────────────────────────────────────
        const { data: user, error } = await supabase
            .from('usuarios')
            .select('id, email, name, plan, role, password_hash')
            .eq('email', email.toLowerCase().trim())
            .maybeSingle();

        if (error || !user) {
            // Constant-time-like response to prevent email enumeration
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        // ── Verify password ───────────────────────────────────────────────────
        const valid = await comparePassword(password, user.password_hash);
        if (!valid) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        // ── Validate role matches context ─────────────────────────────────────
        if (context === 'admin' && user.role !== 'admin') {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }
        if (context === 'client' && user.role === 'admin') {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
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

        // Invalidate all old sessions for this user, then insert new one
        await supabase.from('sesiones_activas').delete().eq('user_id', user.id);
        await supabase.from('sesiones_activas').insert({
            user_id: user.id,
            refresh_token_hash: hashToken(refreshToken),
            expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        });

        // ── Set cookies ───────────────────────────────────────────────────────
        const secure = process.env.NODE_ENV === 'production';
        const response = NextResponse.json({
            user: { id: user.id, email: user.email, name: user.name, plan: user.plan, role: user.role },
        });

        response.headers.append('Set-Cookie', serialize(ACCESS_COOKIE, accessToken, accessCookieOptions(secure)));
        response.headers.append('Set-Cookie', serialize(REFRESH_COOKIE, refreshToken, refreshCookieOptions(secure)));

        return response;
    } catch (err) {
        console.error('Login error:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
