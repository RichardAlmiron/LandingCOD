import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { parse, serialize } from 'cookie';
import {
    REFRESH_COOKIE,
    ACCESS_COOKIE,
    hashToken,
    clearCookieOptions,
    verifyRefreshToken,
} from '@/lib/auth';

export async function POST(request: Request) {
    try {
        const cookieHeader = request.headers.get('cookie') || '';
        const cookies = parse(cookieHeader);
        const refreshToken = cookies[REFRESH_COOKIE];

        // Remove session from DB if we have a valid refresh token
        if (refreshToken) {
            try {
                const payload = verifyRefreshToken(refreshToken);
                await supabase
                    .from('sesiones_activas')
                    .delete()
                    .eq('refresh_token_hash', hashToken(refreshToken));
            } catch {
                // Token invalid — still clear cookies
            }
        }

        const clearOpts = clearCookieOptions();
        const response = NextResponse.json({ message: 'Logged out successfully' });
        response.headers.append('Set-Cookie', serialize(ACCESS_COOKIE, '', clearOpts));
        response.headers.append('Set-Cookie', serialize(REFRESH_COOKIE, '', { ...clearOpts, path: '/api/auth/refresh' }));
        return response;
    } catch (err) {
        console.error('Logout error:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
