import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { verifyAccessToken, ACCESS_COOKIE } from '@/lib/auth';
import { parse } from 'cookie';

// Caché en memoria para datos de usuario (evita consultas repetidas a Supabase)
const userCache = new Map<string, { user: any; expiry: number }>();
const USER_CACHE_TTL = 30000; // 30 segundos

export async function GET(request: Request) {
    try {
        const cookieHeader = request.headers.get('cookie') || '';
        const cookies = parse(cookieHeader);
        const accessToken = cookies[ACCESS_COOKIE];

        if (!accessToken) {
            return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
        }

        let payload;
        try {
            payload = verifyAccessToken(accessToken);
        } catch {
            return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
        }

        // Verificar caché en memoria primero
        const now = Date.now();
        const cached = userCache.get(payload.sub);
        if (cached && cached.expiry > now) {
            const response = NextResponse.json({ user: cached.user });
            response.headers.set('Cache-Control', 'private, max-age=30');
            return response;
        }

        // Limpiar entradas expiradas del caché
        for (const [key, value] of userCache.entries()) {
            if (value.expiry <= now) userCache.delete(key);
        }

        // Return fresh data from DB (plan/role may have changed)
        const { data: user, error } = await supabase
            .from('usuarios')
            .select('id, email, name, plan, role, created_at')
            .eq('id', payload.sub)
            .single();

        if (error || !user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Guardar en caché
        userCache.set(payload.sub, { user, expiry: now + USER_CACHE_TTL });

        // Cache response for 30s to avoid hammering DB on rapid navigations
        const response = NextResponse.json({ user });
        response.headers.set('Cache-Control', 'private, max-age=30');
        return response;
    } catch (err) {
        console.error('/me error:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
