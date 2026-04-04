import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { verifyAccessToken, ACCESS_COOKIE } from '@/lib/auth';
import { parse } from 'cookie';

export const dynamic = 'force-dynamic';

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

        // Return fresh data — check all user sources
        let userData: any = null;
        let source = 'landingcod';

        // Check if it's an Almidrop user (id starts with almidrop_)
        if (payload.sub.startsWith('almidrop_')) {
            source = 'almidrop';
            userData = {
                id: payload.sub,
                email: payload.email,
                name: payload.name,
                plan: payload.plan || 'almidrop',
                role: payload.role || 'user',
                source: 'almidrop',
            };
        } else {
            // Try admin/internal users first
            const { data: adminUser } = await supabase
                .from('usuarios')
                .select('id, email, name, plan, role, created_at')
                .eq('id', payload.sub)
                .maybeSingle();

            if (adminUser) {
                userData = { ...adminUser, source: 'landingcod' };
            } else {
                // Try external users
                const { data: externalUser } = await supabase
                    .from('usuarios_externos')
                    .select('id, email, full_name, is_active, created_at')
                    .eq('id', payload.sub)
                    .maybeSingle();

                if (externalUser) {
                    userData = {
                        id: externalUser.id,
                        email: externalUser.email,
                        name: externalUser.full_name,
                        plan: 'free',
                        role: 'user',
                        source: 'external',
                    };
                }
            }
        }

        if (!userData) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        userCache.set(payload.sub, { user: userData, expiry: now + USER_CACHE_TTL });

        const response = NextResponse.json({ user: userData });
        response.headers.set('Cache-Control', 'private, max-age=30');
        return response;
    } catch (err) {
        console.error('/me error:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
