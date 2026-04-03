'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
                href: '/builder', label: 'Generador', icon: (
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
    {
        label: 'Administración',
        items: [
            {
                href: '/admin', label: 'Generador Master', icon: (
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <circle cx="9" cy="6" r="3" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M3 16 C3 13.24 5.24 11 8 11 H10 C12.76 11 15 13.24 15 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M13 7 L14 8 L16 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                )
            },
            {
                href: '/admin/users', label: 'Usuarios', icon: (
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <circle cx="7" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M2 15 C2 12.79 4.24 11 7 11 C9.76 11 12 12.79 12 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        <circle cx="13" cy="6" r="2" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M13 11 C14.66 11 16 12.34 16 14 V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                )
            },
        ]
    }
];

export default function Sidebar() {
    const pathname = usePathname();
    const { user, logout } = useAuth();

    return (
        <aside style={{
            width: 'var(--sidebar-width)',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            display: 'flex',
            flexDirection: 'column',
            background: 'var(--bg-surface)',
            borderRight: '1px solid var(--border-subtle)',
            zIndex: 100,
            overflow: 'hidden',
        }}>
            {/* Logo */}
            <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid var(--border-subtle)', flexShrink: 0 }}>
                <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
                    <div style={{ position: 'relative', flexShrink: 0 }}>
                        <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
                            <defs>
                                <linearGradient id="sb-logo-grad" x1="0" y1="0" x2="1" y2="1">
                                    <stop offset="0%" stopColor="#6366f1" />
                                    <stop offset="100%" stopColor="#a78bfa" />
                                </linearGradient>
                                <filter id="sb-glow">
                                    <feGaussianBlur stdDeviation="2" result="blur" />
                                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                                </filter>
                            </defs>
                            <rect width="48" height="48" rx="12" fill="url(#sb-logo-grad)" opacity="0.15" />
                            <rect x="0.5" y="0.5" width="47" height="47" rx="11.5" stroke="url(#sb-logo-grad)" strokeOpacity="0.4" />
                            <path d="M24 10 L38 18 L38 30 L24 38 L10 30 L10 18 Z" stroke="url(#sb-logo-grad)" strokeWidth="1.5" fill="none" filter="url(#sb-glow)" />
                            <circle cx="24" cy="24" r="4" fill="url(#sb-logo-grad)" filter="url(#sb-glow)" />
                        </svg>
                    </div>
                    <div>
                        <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1.2 }}>LandingCOD</div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 600 }}>SaaS Platform</div>
                    </div>
                </Link>
            </div>

            {/* Nav */}
            <nav style={{ flex: 1, padding: '16px 12px', overflowY: 'auto' }} className="custom-scrollbar">
                {NAV_ITEMS.map(section => (
                    <div key={section.label} style={{ marginBottom: 28 }}>
                        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', padding: '0 10px', marginBottom: 8 }}>
                            {section.label}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {section.items.map(item => {
                                const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`nav-item ${isActive ? 'active' : ''}`}
                                    >
                                        <span style={{ color: isActive ? 'var(--accent-bright)' : 'var(--text-muted)', transition: 'color 0.2s', flexShrink: 0 }}>
                                            {item.icon}
                                        </span>
                                        <span>{item.label}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </nav>

            {/* User section at bottom */}
            <div style={{ padding: '12px', borderTop: '1px solid var(--border-subtle)', flexShrink: 0 }}>
                <Link href="/settings" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', padding: '8px 10px', borderRadius: 'var(--radius-md)', marginBottom: 4 }} className="nav-item">
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #a78bfa)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff', flexShrink: 0 }}>
                        {user?.name?.[0]?.toUpperCase() ?? 'U'}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.name ?? 'Usuario'}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.email ?? ''}</div>
                    </div>
                </Link>
                <button
                    onClick={logout}
                    style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 'var(--radius-md)', border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--text-muted)', fontSize: 13, fontWeight: 500, transition: 'all 0.2s' }}
                    className="nav-item"
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M6 14 H3 C2.45 14 2 13.55 2 13 V3 C2 2.45 2.45 2 3 2 H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M11 11 L14 8 L11 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M14 8 H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    Cerrar sesión
                </button>
            </div>
        </aside>
    );
}
