import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { verifyAccessToken, ACCESS_COOKIE } from '@/lib/auth';
import { parse } from 'cookie';

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

        // Return fresh data from DB (plan/role may have changed)
        const { data: user, error } = await supabase
            .from('usuarios')
            .select('id, email, name, plan, role, created_at')
            .eq('id', payload.sub)
            .single();

        if (error || !user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Cache response for 60s to avoid hammering DB on rapid navigations
        const response = NextResponse.json({ user });
        response.headers.set('Cache-Control', 'private, max-age=60, stale-while-revalidate=120');
        return response;
    } catch (err) {
        console.error('/me error:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
