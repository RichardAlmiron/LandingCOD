import { NextRequest, NextResponse } from 'next/server';
import { ACCESS_COOKIE } from '@/lib/auth-constants';
import { jwtVerify } from 'jose';

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-secret-very-long-and-secure');

/**
 * Caché en memoria para verificaciones JWT — evita re-verificar el mismo token
 * en navegaciones rápidas (clics de menú). TTL de 30 segundos para máxima velocidad.
 */
const jwtCache = new Map<string, { payload: { sub: string; role: string }; expiry: number }>();
const CACHE_TTL = 30000; // 30 segundos para navegación ultra-rápida

async function verifyJwtEdgeCached(token: string) {
    const now = Date.now();
    const cached = jwtCache.get(token);
    if (cached && cached.expiry > now) return cached.payload;

    // Limpiar entradas expiradas (máx 20 por ciclo para no bloquear)
    let cleaned = 0;
    for (const [k, v] of jwtCache.entries()) {
        if (v.expiry <= now) { jwtCache.delete(k); cleaned++; }
        if (cleaned >= 20) break;
    }

    try {
        const { payload } = await jwtVerify(token, SECRET, { algorithms: ['HS256'] });
        const result = { sub: payload.sub as string, role: payload.role as string };
        jwtCache.set(token, { payload: result, expiry: now + CACHE_TTL });
        return result;
    } catch {
        jwtCache.delete(token);
        return null;
    }
}

// ─── Definición de rutas ─────────────────────────────────────────────────────

const PUBLIC_AUTH_PATHS = [
    '/login',
    '/register',
    '/reset-password',
    '/admin/login',
    '/admin/register',
    '/admin/reset-password',
    '/admin/restablecimiento',
];

function isPublicAuthPath(pathname: string): boolean {
    return PUBLIC_AUTH_PATHS.some(p => pathname === p || pathname === p + '/');
}

function isStaticOrExcluded(pathname: string): boolean {
    return (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api/') ||
        pathname.startsWith('/static') ||
        pathname.startsWith('/images') ||
        pathname.startsWith('/fonts') ||
        pathname.startsWith('/t/') ||
        pathname.startsWith('/p/') ||
        pathname.startsWith('/preview') ||
        pathname.startsWith('/auth/') ||
        pathname === '/' ||
        pathname === '/favicon.ico' ||
        pathname === '/manifest.json' ||
        pathname === '/robots.txt' ||
        pathname === '/admin/access-denied' ||
        pathname === '/dashboard/access-denied' ||
        /\.(svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2|ttf|otf)$/.test(pathname)
    );
}

/** Rutas protegidas del dashboard de cliente (role: user) */
function isUserProtectedPath(pathname: string): boolean {
    return (
        pathname.startsWith('/dashboard') ||
        pathname.startsWith('/builder') ||
        pathname.startsWith('/settings')
    );
}

/** Rutas protegidas del panel admin (role: admin) */
function isAdminProtectedPath(pathname: string): boolean {
    return (
        pathname.startsWith('/admin/dashboard') ||
        pathname.startsWith('/admin/settings') ||
        pathname.startsWith('/admin/templates') ||
        pathname.startsWith('/admin/landing-prompt') ||
        pathname.startsWith('/admin/usuarios') ||
        pathname.startsWith('/admin/publicadas') ||
        pathname.startsWith('/admin/users') ||
        pathname.startsWith('/admin/playground')
    );
}

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // 1. Excluir rutas estáticas y API — respuesta instantánea
    if (isStaticOrExcluded(pathname)) {
        return NextResponse.next();
    }

    const accessToken = request.cookies.get(ACCESS_COOKIE)?.value;

    // 2. Rutas públicas de auth sin token → dejar pasar
    if (isPublicAuthPath(pathname) && !accessToken) {
        return NextResponse.next();
    }

    // 3. Verificar token (con caché ultra-rápido)
    let payload = null;
    if (accessToken) {
        payload = await verifyJwtEdgeCached(accessToken);
    }

    // 4. Rutas de auth CON token válido → redirigir al dashboard correspondiente
    if (isPublicAuthPath(pathname) && payload) {
        const dest = payload.role === 'admin' ? '/admin/dashboard' : '/dashboard';
        return NextResponse.redirect(new URL(dest, request.url));
    }

    // 5. Rutas protegidas de usuario
    if (isUserProtectedPath(pathname)) {
        if (!payload) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
        // Admin no debería estar en el dashboard de cliente
        if (payload.role === 'admin') {
            return NextResponse.redirect(new URL('/admin/dashboard', request.url));
        }
    }

    // 6. Rutas protegidas de admin
    if (isAdminProtectedPath(pathname)) {
        if (!payload) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
        if (payload.role !== 'admin') {
            return NextResponse.redirect(new URL('/admin/access-denied', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder files
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2|ttf|otf)$).*)',
    ],
};
