import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import {
    verifyRefreshToken,
    hashToken,
    signAccessToken,
    signRefreshToken,
    generateJti,
    ACCESS_COOKIE,
    REFRESH_COOKIE,
    accessCookieOptions,
    refreshCookieOptions,
} from '@/lib/auth';
import { parse, serialize } from 'cookie';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    try {
        const cookieHeader = request.headers.get('cookie') || '';
        const cookies = parse(cookieHeader);
        const refreshToken = cookies[REFRESH_COOKIE];

        if (!refreshToken) {
            return NextResponse.json({ error: 'No refresh token' }, { status: 401 });
        }

        // ── Verify refresh token signature ────────────────────────────────────
        let payload;
        try {
            payload = verifyRefreshToken(refreshToken);
        } catch {
            return NextResponse.json({ error: 'Invalid or expired refresh token' }, { status: 401 });
        }

        // ── Check refresh token exists in DB (rotation guard) ─────────────────
        const tokenHash = hashToken(refreshToken);
        const { data: session } = await supabase
            .from('sesiones_activas')
            .select('id, user_id, expires_at')
            .eq('refresh_token_hash', tokenHash)
            .eq('user_id', payload.sub)
            .maybeSingle();

        if (!session) {
            // Token reuse detected — invalidate ALL sessions for this user
            await supabase.from('sesiones_activas').delete().eq('user_id', payload.sub);
            return NextResponse.json({ error: 'Refresh token reuse detected' }, { status: 401 });
        }

        if (new Date(session.expires_at) < new Date()) {
            await supabase.from('sesiones_activas').delete().eq('id', session.id);
            return NextResponse.json({ error: 'Refresh token expired' }, { status: 401 });
        }

        // ── Load latest user data ─────────────────────────────────────────────
        const { data: user } = await supabase
            .from('usuarios')
            .select('id, email, name, plan, role')
            .eq('id', payload.sub)
            .single();

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 401 });
        }

        // ── Rotate: delete old session, issue new tokens ──────────────────────
        await supabase.from('sesiones_activas').delete().eq('id', session.id);

        const newAccessToken = signAccessToken({
            sub: user.id, email: user.email, name: user.name, plan: user.plan, role: user.role,
        });

        const jti = generateJti();
        const newRefreshToken = signRefreshToken(user.id, jti);

        await supabase.from('sesiones_activas').insert({
            user_id: user.id,
            refresh_token_hash: hashToken(newRefreshToken),
            expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        });

        const secure = process.env.NODE_ENV === 'production';
        const response = NextResponse.json({ user });
        response.headers.append('Set-Cookie', serialize(ACCESS_COOKIE, newAccessToken, accessCookieOptions(secure)));
        response.headers.append('Set-Cookie', serialize(REFRESH_COOKIE, newRefreshToken, refreshCookieOptions(secure)));

        return response;
    } catch (err) {
        console.error('Refresh error:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
