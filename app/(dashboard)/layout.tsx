'use client';
import React, { useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

const NAV_ITEMS = [
    {
        label: 'Principal',
        items: [
            {
                href: '/dashboard', label: 'Dashboard', icon: (
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <rect x="1" y="1" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.5" />
                        <rect x="10" y="1" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.5" />
                        <rect x="1" y="10" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.5" />
                        <rect x="10" y="10" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                )
            },
            {
                href: '/builder', label: 'LandingCOD Studio', icon: (
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M2 5 C2 3.34 3.34 2 5 2 H13 C14.66 2 16 3.34 16 5 V13 C16 14.66 14.66 16 13 16 H5 C3.34 16 2 14.66 2 13 Z" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M6 9 H12 M9 6 V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                )
            },
            {
                href: '/settings', label: 'Configuración', icon: (
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M9 1.5 L9 3.5 M9 14.5 L9 16.5 M1.5 9 L3.5 9 M14.5 9 L16.5 9 M3.7 3.7 L5.1 5.1 M12.9 12.9 L14.3 14.3 M14.3 3.7 L12.9 5.1 M5.1 12.9 L3.7 14.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                )
            },
        ]
    },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { user, logout } = useAuth();
    const router = useRouter();

    // Pre-calentar TODAS las rutas inmediatamente al montar
    useEffect(() => {
        const routes = ['/builder', '/settings', '/dashboard'];
        routes.forEach(route => router.prefetch(route));
    }, []); // Solo una vez

    const handleNavigation = useCallback((path: string) => {
        router.push(path);
    }, [router]);

    return (
        <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden', position: 'relative' }}>
            {/* ═══ ELECTRIC ANIMATED BACKGROUND (Same as Auth) ═══ */}
            <div className="electric-bg" />

            {/* SVG Lightning Lines */}
            <svg style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }} aria-hidden="true">
                <polyline className="lightning-line" points="0,200 120,180 200,220 320,160 400,200" strokeDasharray="600" style={{ animationDelay: '0s', animationDuration: '5s' }} />
                <polyline className="lightning-line" points="600,0 650,80 700,60 800,120 900,80 1000,140" strokeDasharray="800" style={{ animationDelay: '2s', animationDuration: '6s', stroke: 'rgba(167,139,250,0.3)' }} />
                <polyline className="lightning-line" points="0,500 100,480 180,520 280,490 400,530 520,500 640,540" strokeDasharray="700" style={{ animationDelay: '1s', animationDuration: '7s', stroke: 'rgba(6,182,212,0.2)' }} />
            </svg>

            {/* ═══ SIDEBAR (Ultra-Glass with Hyper-Ring) ═══ */}
            <aside className="ultra-glass" style={{
                width: 'var(--sidebar-width)', minWidth: 'var(--sidebar-width)',
                height: '100%', display: 'flex', flexDirection: 'column',
                padding: 0, borderRadius: 0, borderRight: '1px solid rgba(255,255,255,0.08)',
                zIndex: 50, position: 'relative',
            }}>
                <div className="hyper-ring" style={{ borderRadius: 0 }}></div>

                {/* Logo */}
                <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)', flexShrink: 0, position: 'relative', zIndex: 1 }}>
                    <Link href="/dashboard" prefetch={true} style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
                        <div style={{
                            width: 38, height: 38, borderRadius: 10,
                            background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-violet))',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 0 25px var(--accent-glow)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            flexShrink: 0
                        }}>
                            <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
                                <path d="M14 4 L24 10 L24 18 L14 24 L4 18 L4 10 Z" stroke="white" strokeWidth="2.5" fill="none" />
                                <circle cx="14" cy="14" r="3" fill="white" />
                            </svg>
                        </div>
                        <div>
                            <div style={{ fontSize: 15, fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.2 }}>LandingCOD</div>
                            <div className="shimmer-text" style={{ fontSize: 10, letterSpacing: '0.08em', fontWeight: 700 }}>PLATAFORMA SAAS</div>
                        </div>
                    </Link>
                </div>

                {/* Nav */}
                <nav style={{ flex: 1, padding: '16px 12px', overflowY: 'auto', position: 'relative', zIndex: 1 }} className="custom-scrollbar">
                    {NAV_ITEMS.map(section => (
                        <div key={section.label} style={{ marginBottom: 28 }}>
                            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', padding: '0 14px', marginBottom: 10 }}>
                                {section.label}
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                {section.items.map(item => {
                                    const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
                                    return (
                                        <button
                                            key={item.href}
                                            onClick={() => handleNavigation(item.href)}
                                            style={{
                                                display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px',
                                                borderRadius: 10, textDecoration: 'none', transition: 'all 0.25s ease',
                                                background: isActive ? 'rgba(99, 102, 241, 0.12)' : 'transparent',
                                                border: isActive ? '1px solid rgba(99, 102, 241, 0.25)' : '1px solid transparent',
                                                color: isActive ? '#fff' : 'rgba(255,255,255,0.4)',
                                                fontWeight: isActive ? 700 : 500, fontSize: 14,
                                                boxShadow: isActive ? '0 0 15px rgba(99,102,241,0.1)' : 'none',
                                                cursor: 'pointer',
                                                width: '100%',
                                                textAlign: 'left',
                                            }}
                                        >
                                            <span style={{ color: isActive ? 'var(--accent-bright)' : 'rgba(255,255,255,0.35)', transition: 'color 0.2s', flexShrink: 0 }}>
                                                {item.icon}
                                            </span>
                                            <span>{item.label}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </nav>

                {/* User section */}
                <div style={{ padding: '12px', borderTop: '1px solid rgba(255,255,255,0.06)', flexShrink: 0, position: 'relative', zIndex: 1 }}>
                    <Link href="/settings" prefetch={true} style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', padding: '8px 10px', borderRadius: 10, marginBottom: 8 }}>
                        <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #a78bfa)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff', flexShrink: 0, boxShadow: '0 0 12px var(--accent-glow)' }}>
                            {user?.name?.[0]?.toUpperCase() ?? 'U'}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div suppressHydrationWarning style={{ fontSize: 13, fontWeight: 700, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.name ?? 'Usuario'}</div>
                            <div suppressHydrationWarning style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.email ?? ''}</div>
                        </div>
                    </Link>
                    <button
                        onClick={logout}
                        className="neo-btn"
                        style={{ width: '100%', padding: '10px 16px', fontSize: 12, letterSpacing: '0.1em' }}
                    >
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                            <path d="M6 14 H3 C2.45 14 2 13.55 2 13 V3 C2 2.45 2.45 2 3 2 H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M11 11 L14 8 L11 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M14 8 H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                        <span>CERRAR SESIÓN</span>
                    </button>
                </div>
            </aside>

            {/* ═══ MAIN CONTENT ═══ */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 10, height: '100vh', overflow: 'hidden' }}>
                {/* TopBar */}
                <header className="ultra-glass" style={{
                    height: 'var(--topbar-height)', minHeight: 'var(--topbar-height)',
                    borderRadius: 0, borderBottom: '1px solid rgba(255,255,255,0.06)',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '0 28px', position: 'relative', zIndex: 50,
                }}>
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <h1 style={{ fontSize: 16, fontWeight: 800, color: '#fff', letterSpacing: '-0.01em', margin: 0 }}>
                            {pathname === '/dashboard' ? 'Dashboard' : pathname === '/builder' ? 'LandingCOD Studio' : pathname === '/settings' ? 'Configuración' : 'LandingCOD'}
                        </h1>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, position: 'relative', zIndex: 1 }}>
                        <Link href="/builder" prefetch={true} style={{ textDecoration: 'none' }}>
                            <button className="neo-btn" style={{ padding: '8px 18px', fontSize: 12, letterSpacing: '0.08em' }}>
                                <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M7 1 V13 M1 7 H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                                <span>NUEVO</span>
                            </button>
                        </Link>
                        {/* Notification bell */}
                        <button style={{
                            width: 38, height: 38, borderRadius: 10,
                            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                            position: 'relative', transition: 'all 0.2s'
                        }}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M8 2 C5.24 2 3 4.24 3 7 V11 H13 V7 C13 4.24 10.76 2 8 2 Z" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none" />
                                <path d="M3 11 H13" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" />
                                <circle cx="8" cy="13" r="1.5" fill="rgba(255,255,255,0.5)" />
                            </svg>
                            <span style={{ position: 'absolute', top: 7, right: 7, width: 7, height: 7, borderRadius: '50%', background: 'var(--accent-primary)', boxShadow: '0 0 8px var(--accent-primary)' }} />
                        </button>
                    </div>
                </header>

                {/* Page content */}
                <main style={{ flex: 1, padding: '28px 32px', overflowY: 'auto' }} className="custom-scrollbar">
                    <div className="page-enter">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
