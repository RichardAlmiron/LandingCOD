export const ACCESS_COOKIE = 'lc_access';
export const REFRESH_COOKIE = 'lc_refresh';

export function accessCookieOptions(secure: boolean) {
    return {
        httpOnly: true,
        secure,
        sameSite: 'lax' as const,
        path: '/',
        maxAge: 15 * 60,              // 15 minutes
    };
}

export function refreshCookieOptions(secure: boolean) {
    return {
        httpOnly: true,
        secure,
        sameSite: 'lax' as const,
        path: '/api/auth/refresh',    // scoped — only sent to refresh endpoint
        maxAge: 7 * 24 * 60 * 60,    // 7 days
    };
}

export function clearCookieOptions() {
    return {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax' as const,
        path: '/',
        maxAge: 0,
    };
}
