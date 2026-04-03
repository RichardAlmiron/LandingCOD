'use client';
import React, { useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { LayoutDashboard, Users, Settings, LogOut, Shield, ChevronRight, LayoutTemplate, Store, FileText, BookOpen, Tag, Bug, Brain, Code2, Activity } from 'lucide-react';

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { user, logout } = useAuth();
    const router = useRouter();

    // Pre-calentar TODAS las rutas inmediatamente al montar
    useEffect(() => {
        const routes = [
            '/admin/templates',
            '/admin/dashboard',
            '/admin/usuarios',
            '/admin/publicadas',
            '/admin/ai-health',
            '/admin/settings',
            '/admin/landing-prompt',
            '/admin/documentacion',
            '/admin/documentacion/categorias-pdp',
            '/admin/documentacion/builder',
            '/admin/documentacion/mapa-arquitectura',
            '/admin/documentacion/codigo-detallado',
            '/admin/documentacion/bugs-resueltos',
        ];
        routes.forEach(route => router.prefetch(route));
    }, []); // Solo una vez

    const menuItems = [
        { name: 'Panel Principal', icon: LayoutDashboard, path: '/admin/dashboard' },
        { name: 'Templates', icon: LayoutTemplate, path: '/admin/templates' },
        { name: 'Landing Prompt', icon: FileText, path: '/admin/landing-prompt' },
        { name: 'Gestión Usuarios', icon: Users, path: '/admin/usuarios' },
        { name: 'Publicadas', icon: Store, path: '/admin/publicadas' },
        { name: 'Estado IA', icon: Activity, path: '/admin/ai-health' },
        { name: 'Documentación', icon: BookOpen, path: '/admin/documentacion', children: [
            { name: 'Categorías PDP', icon: Tag, path: '/admin/documentacion/categorias-pdp' },
            { name: 'Builder', icon: LayoutTemplate, path: '/admin/documentacion/builder' },
            { name: 'Mapa Arquitectura', icon: Brain, path: '/admin/documentacion/mapa-arquitectura' },
            { name: 'Cerebro de Landing Code', icon: Brain, path: '/admin/documentacion/cerebro' },
            { name: 'Código Detallado', icon: Code2, path: '/admin/documentacion/codigo-detallado' },
            { name: 'Bugs Resueltos', icon: Bug, path: '/admin/documentacion/bugs-resueltos' },
        ]},
        { name: 'Configuración', icon: Settings, path: '/admin/settings' },
    ];

    const handleNavigation = useCallback((path: string) => {
        // Navegación inmediata sin esperar
        router.push(path);
    }, [router]);

    return (
        <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden', position: 'relative' }}>
            {/* ═══ ELECTRIC ANIMATED BACKGROUND (Same as Auth pages) ═══ */}
            <div className="electric-bg" />

            {/* SVG Lightning Lines (Same as Auth Layout) */}
            <svg style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }} aria-hidden="true">
                <polyline className="lightning-line" points="0,150 100,130 200,160 350,110 500,150 650,100" strokeDasharray="700" style={{ animationDelay: '0s', animationDuration: '6s' }} />
                <polyline className="lightning-line" points="700,50 800,80 900,40 1050,90 1200,60 1400,100" strokeDasharray="800" style={{ animationDelay: '2.5s', animationDuration: '7s', stroke: 'rgba(167,139,250,0.25)' }} />
                <polyline className="lightning-line" points="100,600 200,580 350,620 500,580 700,620 900,590" strokeDasharray="900" style={{ animationDelay: '1.5s', animationDuration: '8s', stroke: 'rgba(6,182,212,0.2)' }} />
            </svg>

            {/* ═══ SIDEBAR (Ultra-Glass, matching Auth card style) ═══ */}
            <aside className="ultra-glass" style={{
                width: 260, minWidth: 260, height: '100%', display: 'flex', flexDirection: 'column',
                padding: '28px 16px', borderRadius: 0, borderRight: '1px solid rgba(255,255,255,0.08)',
                zIndex: 50, position: 'relative',
            }}>
                <div className="hyper-ring" style={{ borderRadius: 0 }}></div>

                {/* Brand Header */}
                <div style={{ padding: '0 12px', marginBottom: 40, position: 'relative', zIndex: 1 }}>
                    <Link href="/admin/dashboard" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
                        <div style={{
                            width: 40, height: 40, borderRadius: 12,
                            background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-violet))',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 0 25px var(--accent-glow)',
                            border: '1px solid rgba(255,255,255,0.2)'
                        }}>
                            <Shield size={22} color="white" />
                        </div>
                        <div>
                            <span style={{ fontSize: 17, fontWeight: 900, letterSpacing: '-0.02em', display: 'block', lineHeight: 1, color: '#fff' }}>ALMIDROP</span>
                            <span className="shimmer-text" style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.12em' }}>ADMIN CORE</span>
                        </div>
                    </Link>
                </div>

                {/* Navigation */}
                <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6, position: 'relative', zIndex: 1, overflowY: 'auto' }} className="custom-scrollbar">
                    {menuItems.map((item) => {
                        const isActive = pathname.startsWith(item.path);
                        const hasChildren = !!(item as any).children;
                        const children = (item as any).children as { name: string; icon: any; path: string }[] | undefined;
                        const isChildActive = children?.some(c => pathname.startsWith(c.path));
                        const isExpanded = isActive || isChildActive;

                        return (
                            <div key={item.path}>
                                <button
                                    onClick={() => hasChildren ? (isExpanded ? handleNavigation(item.path) : handleNavigation(children![0].path)) : handleNavigation(item.path)}
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px',
                                        borderRadius: 12, textDecoration: 'none', transition: 'all 0.25s ease',
                                        background: isActive && !hasChildren ? 'rgba(99, 102, 241, 0.12)' : isExpanded && hasChildren ? 'rgba(99, 102, 241, 0.06)' : 'transparent',
                                        border: isActive && !hasChildren ? '1px solid rgba(99, 102, 241, 0.3)' : isExpanded && hasChildren ? '1px solid rgba(99, 102, 241, 0.15)' : '1px solid transparent',
                                        color: isActive || isChildActive ? '#fff' : 'rgba(255,255,255,0.45)',
                                        fontWeight: isActive || isChildActive ? 700 : 500,
                                        boxShadow: isActive && !hasChildren ? '0 0 20px rgba(99,102,241,0.15), inset 0 1px 0 rgba(255,255,255,0.1)' : 'none',
                                        cursor: 'pointer',
                                        width: '100%',
                                        textAlign: 'left',
                                        fontSize: 14,
                                    }}
                                >
                                    <item.icon size={18} style={{ color: isActive || isChildActive ? 'var(--accent-bright)' : 'inherit' }} />
                                    <span style={{ flex: 1 }}>{item.name}</span>
                                    {hasChildren ? (
                                        <ChevronRight size={14} style={{ opacity: 0.5, transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
                                    ) : isActive ? (
                                        <ChevronRight size={14} style={{ opacity: 0.5 }} />
                                    ) : null}
                                </button>
                                {/* Submenú */}
                                {hasChildren && isExpanded && children && (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, paddingLeft: 20, marginTop: 4 }}>
                                        {children.map((child) => {
                                            const isSubActive = pathname.startsWith(child.path);
                                            return (
                                                <button
                                                    key={child.path}
                                                    onClick={() => handleNavigation(child.path)}
                                                    style={{
                                                        display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px',
                                                        borderRadius: 8, transition: 'all 0.2s ease',
                                                        background: isSubActive ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                                                        border: isSubActive ? '1px solid rgba(99, 102, 241, 0.25)' : '1px solid transparent',
                                                        color: isSubActive ? '#fff' : 'rgba(255,255,255,0.4)',
                                                        fontWeight: isSubActive ? 700 : 500,
                                                        cursor: 'pointer',
                                                        width: '100%',
                                                        textAlign: 'left',
                                                        fontSize: 12,
                                                    }}
                                                >
                                                    <child.icon size={14} style={{ color: isSubActive ? 'var(--accent-bright)' : 'inherit' }} />
                                                    <span>{child.name}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </nav>

                {/* User Info & Logout */}
                <div style={{ marginTop: 'auto', paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.06)', position: 'relative', zIndex: 1 }}>
                    {/* User */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', marginBottom: 8 }}>
                        <div style={{
                            width: 32, height: 32, borderRadius: '50%',
                            background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-violet))',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 13, fontWeight: 700, color: '#fff', flexShrink: 0,
                            boxShadow: '0 0 12px var(--accent-glow)'
                        }}>
                            {user?.name?.[0]?.toUpperCase() ?? 'A'}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.name ?? 'Admin'}</div>
                            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.email ?? ''}</div>
                        </div>
                    </div>

                    <button
                        onClick={() => logout()}
                        className="neo-btn"
                        style={{
                            width: '100%', padding: '10px 16px', fontSize: 12,
                            letterSpacing: '0.1em', marginTop: 4,
                        }}
                    >
                        <LogOut size={14} />
                        <span>CERRAR SESIÓN</span>
                    </button>
                </div>
            </aside>

            {/* ═══ MAIN CONTENT ═══ */}
            <main style={{ flex: 1, height: '100%', overflowY: 'auto', padding: '36px 40px', position: 'relative', zIndex: 10 }} className="custom-scrollbar">
                <div className="page-enter">
                    {children}
                </div>
            </main>
        </div>
    );
}
