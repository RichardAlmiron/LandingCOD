'use client';
import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

/**
 * Silent refresh content - uses search params
 */
function RefreshingContent() {
    const router = useRouter();
    const params = useSearchParams();
    const redirect = params.get('redirect') || '/dashboard';

    useEffect(() => {
        fetch('/api/auth/refresh', { method: 'POST', credentials: 'include' })
            .then(res => {
                if (res.ok) {
                    router.replace(redirect);
                } else {
                    router.replace('/login');
                }
            })
            .catch(() => router.replace('/login'));
    }, [redirect, router]);

    return (
        <div style={{
            minHeight: '100vh',
            background: 'var(--bg-void)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 20,
            position: 'relative'
        }}>
            <div className="electric-bg" />
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style={{ position: 'relative' }}>
                <circle cx="24" cy="24" r="20" stroke="var(--accent-primary)" strokeWidth="3" strokeDasharray="30 96" strokeLinecap="round">
                    <animateTransform attributeName="transform" type="rotate" from="0 24 24" to="360 24 24" dur="1s" repeatCount="indefinite" />
                </circle>
            </svg>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, position: 'relative' }}>Verificando sesión…</p>
        </div>
    );
}

/**
 * Main page component wrapped in Suspense for static pre-rendering
 */
export default function RefreshingPage() {
    return (
        <Suspense fallback={
            <div style={{ minHeight: '100vh', background: 'var(--bg-void)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="electric-bg" />
                <p style={{ color: 'var(--text-secondary)', fontSize: 14, position: 'relative' }}>Cargando...</p>
            </div>
        }>
            <RefreshingContent />
        </Suspense>
    );
}
