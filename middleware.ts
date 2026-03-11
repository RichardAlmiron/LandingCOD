import { NextRequest, NextResponse } from 'next/server';
import { ACCESS_COOKIE, REFRESH_COOKIE } from '@/lib/auth-constants';
import { jwtVerify } from 'jose';

/**
 * Optimizamos la verificación para que sea ultra-rápida.
 * Las claves secretas se cachean fuera del loop de la función.
 */
const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-secret-very-long-and-secure');

async function verifyJwtEdge(token: string) {
    try {
        const { payload } = await jwtVerify(token, SECRET, { algorithms: ['HS256'] });
        return { sub: payload.sub as string, role: payload.role as string };
    } catch {
        return null;
    }
}

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // 1. EXCLUSIÓN RÁPIDA: Si es un recurso estático o API interna, pasar de largo de inmediato
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api/auth/refresh') ||
        pathname.includes('.') || // svg, png, jpg, etc.
        pathname === '/favicon.ico'
    ) {
        return NextResponse.next();
    }

    const accessToken = request.cookies.get(ACCESS_COOKIE)?.value;

    // 2. RUTAS DE AUTH: Si ya tiene token, saltar el dashboard
    const isAuthPath = pathname.startsWith('/login') || pathname.startsWith('/register') || pathname.startsWith('/admin/login');

    if (isAuthPath && accessToken) {
        const payload = await verifyJwtEdge(accessToken);
        if (payload) {
            const dest = payload.role === 'admin' ? '/admin/dashboard' : '/dashboard';
            return NextResponse.redirect(new URL(dest, request.url));
        }
    }

    // 3. PROTECCIÓN DE RUTAS: Solo verificar si entra a /admin o /dashboard
    const isProtected = pathname.startsWith('/dashboard') || pathname.startsWith('/builder') || pathname.startsWith('/settings');
    const isAdmin = pathname.startsWith('/admin') && !isAuthPath;

    if (isProtected || isAdmin) {
        if (!accessToken) {
            return NextResponse.redirect(new URL(isAdmin ? '/admin/login' : '/login', request.url));
        }

        const payload = await verifyJwtEdge(accessToken);
        if (!payload) {
            const response = NextResponse.redirect(new URL(isAdmin ? '/admin/login' : '/login', request.url));
            response.cookies.delete(ACCESS_COOKIE);
            return response;
        }

        // Protección de rol admin
        if (isAdmin && !pathname.startsWith('/admin/login') && !pathname.startsWith('/admin/register')) {
            if (payload.role !== 'admin') {
                return NextResponse.redirect(new URL('/dashboard', request.url));
            }
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api/auth/refresh|_next/static|_next/image|favicon.ico).*)'],
};
