'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const PAGE_TITLES: Record<string, string> = {
    '/dashboard': 'Dashboard',
    '/builder': 'Builder',
    '/settings': 'Configuración',
    '/admin': 'Admin Panel',
    '/admin/users': 'Gestión de Usuarios',
};

export default function TopBar() {
    const pathname = usePathname();
    const title = PAGE_TITLES[pathname] ?? 'LandingCOD';

    return (
        <header style={{
            height: 'var(--topbar-height)',
            background: 'var(--bg-surface)',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 28px',
            position: 'sticky',
            top: 0,
            zIndex: 50,
        }}>
            {/* Page Title */}
            <div>
                <h1 style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>{title}</h1>
            </div>

            {/* Right actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {/* New Landing Page CTA */}
                <Link href="/builder" style={{ textDecoration: 'none' }}>
                    <button className="btn-primary" style={{ padding: '8px 16px', fontSize: 13 }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M7 1 V13 M1 7 H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        Nuevo Builder
                    </button>
                </Link>

                {/* Notifications */}
                <button style={{ width: 36, height: 36, borderRadius: 'var(--radius-md)', background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative', transition: 'all 0.2s' }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 2 C5.24 2 3 4.24 3 7 V11 H13 V7 C13 4.24 10.76 2 8 2 Z" stroke="var(--text-secondary)" strokeWidth="1.5" fill="none" />
                        <path d="M3 11 H13" stroke="var(--text-secondary)" strokeWidth="1.5" strokeLinecap="round" />
                        <circle cx="8" cy="13" r="1.5" fill="var(--text-secondary)" />
                    </svg>
                    <span style={{ position: 'absolute', top: 6, right: 6, width: 7, height: 7, borderRadius: '50%', background: 'var(--accent-primary)', border: '1.5px solid var(--bg-surface)' }} />
                </button>

                {/* User avatar */}
                <Link href="/settings" style={{ textDecoration: 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 12px 6px 6px', borderRadius: 'var(--radius-full)', background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', cursor: 'pointer', transition: 'all 0.2s' }}>
                        <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #a78bfa)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#fff' }}>
                            A
                        </div>
                        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>Admin</span>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ color: 'var(--text-muted)' }}>
                            <path d="M2 4 L6 8 L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    </div>
                </Link>
            </div>
        </header>
    );
}
