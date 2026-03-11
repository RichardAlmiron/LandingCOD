'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

// --- Mock data ---
const stats = [
    { label: 'Landing Pages', value: 24, change: '+3 este mes', up: true, color: '#6366f1' },
    { label: 'Vistas Totales', value: '48.2K', change: '+12% vs mes ant.', up: true, color: '#06b6d4' },
    { label: 'Tasa Conversión', value: '4.7%', change: '+0.8% este mes', up: true, color: '#10b981' },
    { label: 'Templates Usados', value: 18, change: '75+ disponibles', up: true, color: '#a78bfa' },
];

const activityFeed = [
    { action: 'Nueva landing page creada', detail: 'Template BoldAthlete — Athletic Bold', time: 'Hace 2h', color: '#6366f1' },
    { action: 'Configuración actualizada', detail: 'Template de producto: Urgencia Extrema', time: 'Hace 5h', color: '#10b981' },
    { action: 'Página publicada', detail: 'Store: MegaStore — MegaMarket template', time: 'Ayer', color: '#06b6d4' },
    { action: 'Producto añadido', detail: 'Smartwatch Deportivo Pro Series X', time: 'Ayer', color: '#a78bfa' },
    { action: 'Nueva landing page creada', detail: 'Template ItalianCraft — Italian Luxury', time: 'Hace 3d', color: '#6366f1' },
];

const recentProjects = [
    { name: 'MegaStore', template: 'MegaMarket', category: 'Health', views: '12.4K', conversions: '5.2%', status: 'Publicado' },
    { name: 'TechWorld', template: 'MinimalTech', category: 'Electronics', views: '8.1K', conversions: '3.8%', status: 'Publicado' },
    { name: 'StyleHub', template: 'EditorialChic', category: 'Beauty', views: '5.6K', conversions: '6.1%', status: 'Borrador' },
    { name: 'PowerTools', template: 'BuilderZone', category: 'Tools', views: '3.2K', conversions: '4.3%', status: 'Publicado' },
    { name: 'LuxeShop', template: 'ItalianCraft', category: 'Luxury', views: '2.8K', conversions: '7.9%', status: 'Borrador' },
];

// --- SVG Area Chart ---
function AreaChart() {
    const [animated, setAnimated] = useState(false);
    useEffect(() => { setTimeout(() => setAnimated(true), 200); }, []);

    const data = [320, 480, 380, 620, 540, 780, 650, 890, 720, 1050, 940, 1200, 1100, 1380, 1240, 1500, 1350, 1620, 1480, 1750, 1600, 1900, 1750, 2100, 1950, 2250, 2100, 2400, 2200, 2600];
    const W = 680, H = 160;
    const max = Math.max(...data);
    const pts = data.map((v, i) => `${(i / (data.length - 1)) * W},${H - (v / max) * (H - 20)}`);
    const area = `M ${pts.join(' L ')} L ${W},${H} L 0,${H} Z`;
    const line = `M ${pts.join(' L ')}`;
    const pathLen = 1800;
    const months = ['D1', 'D5', 'D10', 'D15', 'D20', 'D25', 'D30'];

    return (
        <div style={{ position: 'relative', width: '100%' }}>
            <svg viewBox={`0 0 ${W} ${H + 30}`} preserveAspectRatio="none" style={{ width: '100%', height: 180, display: 'block' }}>
                <defs>
                    <linearGradient id="area-grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#6366f1" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                    </linearGradient>
                </defs>
                {[0.25, 0.5, 0.75, 1].map((t, i) => (
                    <line key={i} x1="0" y1={H - t * (H - 20)} x2={W} y2={H - t * (H - 20)} stroke="rgba(99,102,241,0.06)" strokeWidth="1" />
                ))}
                <path d={area} fill="url(#area-grad)" />
                <path
                    d={line} stroke="#6366f1" strokeWidth="2.5" fill="none"
                    strokeDasharray={pathLen} strokeDashoffset={animated ? 0 : pathLen}
                    style={{ transition: 'stroke-dashoffset 2s cubic-bezier(0.4,0,0.2,1)' }}
                />
                {[9, 14, 19, 24, 29].map(i => {
                    const [x, y] = pts[i].split(',').map(Number);
                    return <circle key={i} cx={x} cy={y} r="4" fill="#6366f1" stroke="var(--bg-void)" strokeWidth="2" />;
                })}
                {months.map((m, i) => (
                    <text key={m} x={(i / (months.length - 1)) * W} y={H + 22} textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="11" fontFamily="Inter, sans-serif">{m}</text>
                ))}
            </svg>
        </div>
    );
}

// --- Sparkline mini SVG ---
function Sparkline({ color }: { color: string }) {
    const pts = Array.from({ length: 8 }, () => 10 + Math.random() * 30);
    const max = Math.max(...pts);
    const w = 80, h = 32;
    const line = pts.map((v, i) => `${(i / (pts.length - 1)) * w},${h - (v / max) * (h - 4)}`).join(' L ');
    return (
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
            <path d={`M ${line}`} stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.8" />
        </svg>
    );
}

export default function DashboardPage() {
    const [counts, setCounts] = useState([0, 0, 0, 0]);
    useEffect(() => {
        const targets = [24, 48200, 4.7, 18];
        const dur = 1200;
        const start = Date.now();
        const tick = () => {
            const p = Math.min((Date.now() - start) / dur, 1);
            const ease = 1 - Math.pow(1 - p, 3);
            setCounts(targets.map(t => t * ease));
            if (p < 1) requestAnimationFrame(tick);
        };
        setTimeout(() => requestAnimationFrame(tick), 300);
    }, []);

    const formatCount = (i: number, v: number) => {
        if (i === 1) return v >= 1000 ? `${(v / 1000).toFixed(1)}K` : Math.round(v).toString();
        if (i === 2) return `${v.toFixed(1)}%`;
        return Math.round(v).toString();
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            {/* Header */}
            <div>
                <h2 className="shimmer-text" style={{ fontSize: 28, fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 6, lineHeight: 1 }}>
                    CENTRO DE CONTROL
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, fontWeight: 600 }}>Resumen de tu plataforma • Todos los KPIs al día</p>
            </div>

            {/* KPI Stats — Ultra-Glass cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
                {stats.map((s, i) => (
                    <div key={s.label} className="ultra-glass glass-card-hover" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: 12, cursor: 'pointer', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
                            <span style={{ fontSize: 10, fontWeight: 800, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.label}</span>
                            <span style={{ width: 8, height: 8, borderRadius: '50%', background: s.color, display: 'block', boxShadow: `0 0 10px ${s.color}`, animation: 'breathe 2s ease-in-out infinite alternate' }} />
                        </div>
                        <div className="count-animate" style={{ fontSize: 32, fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1, position: 'relative', zIndex: 1 }}>
                            {formatCount(i, counts[i])}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
                            <span style={{ fontSize: 12, color: s.up ? '#34d399' : '#fb7185', fontWeight: 600 }}>{s.change}</span>
                            <Sparkline color={s.color} />
                        </div>
                        {/* Decorative glow */}
                        <div style={{ position: 'absolute', right: -15, bottom: -15, width: 70, height: 70, background: `radial-gradient(circle, ${s.color}15 0%, transparent 70%)` }}></div>
                    </div>
                ))}
            </div>

            {/* Chart + Activity Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20 }}>
                {/* Area Chart */}
                <div className="ultra-glass" style={{ padding: 28, position: 'relative', overflow: 'hidden' }}>
                    <div className="hyper-ring" style={{ opacity: 0.15 }}></div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, position: 'relative', zIndex: 1 }}>
                        <div>
                            <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', marginBottom: 4 }}>Tráfico — Últimos 30 días</div>
                            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>Vistas totales de landing pages</div>
                        </div>
                        <div style={{ display: 'flex', gap: 6 }}>
                            {['7d', '30d', '90d'].map((t, i) => (
                                <button key={t} style={{
                                    padding: '5px 14px', borderRadius: 20, cursor: 'pointer', fontSize: 11, fontWeight: 700,
                                    background: i === 1 ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.03)',
                                    border: `1px solid ${i === 1 ? 'rgba(99,102,241,0.3)' : 'rgba(255,255,255,0.06)'}`,
                                    color: i === 1 ? 'var(--accent-bright)' : 'rgba(255,255,255,0.3)',
                                    letterSpacing: '0.03em'
                                }}>{t}</button>
                            ))}
                        </div>
                    </div>
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <AreaChart />
                    </div>
                </div>

                {/* Activity Feed */}
                <div className="ultra-glass" style={{ padding: 24, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
                    <div className="hyper-ring" style={{ opacity: 0.1 }}></div>
                    <div style={{ fontSize: 15, fontWeight: 800, color: '#fff', marginBottom: 20, position: 'relative', zIndex: 1 }}>Actividad Reciente</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 0, flex: 1, position: 'relative', zIndex: 1 }}>
                        {activityFeed.map((act, i) => (
                            <div key={i} style={{ display: 'flex', gap: 12, paddingBottom: i < activityFeed.length - 1 ? 16 : 0, position: 'relative' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: act.color, marginTop: 4, boxShadow: `0 0 10px ${act.color}` }} />
                                    {i < activityFeed.length - 1 && (
                                        <div style={{ width: 1, flex: 1, background: 'rgba(255,255,255,0.05)', margin: '4px 0' }} />
                                    )}
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 2 }}>{act.action}</div>
                                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginBottom: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{act.detail}</div>
                                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)' }}>{act.time}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Projects */}
            <div className="ultra-glass" style={{ padding: '0 0 4px 0', overflow: 'hidden', position: 'relative' }}>
                <div className="hyper-ring" style={{ opacity: 0.1 }}></div>
                <div style={{ padding: '20px 24px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', position: 'relative', zIndex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>Proyectos Recientes</div>
                    <Link href="/builder" style={{ textDecoration: 'none' }}>
                        <button className="neo-btn" style={{ padding: '6px 16px', fontSize: 11, letterSpacing: '0.08em' }}>
                            <span>+ NUEVO PROYECTO</span>
                        </button>
                    </Link>
                </div>
                <table className="table-dark" style={{ tableLayout: 'fixed', position: 'relative', zIndex: 1 }}>
                    <thead>
                        <tr>
                            <th style={{ width: '28%' }}>Tienda</th>
                            <th style={{ width: '18%' }}>Template</th>
                            <th style={{ width: '15%' }}>Categoría</th>
                            <th style={{ width: '16%' }}>Vistas</th>
                            <th style={{ width: '15%' }}>Conversión</th>
                            <th style={{ width: '12%' }}>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentProjects.map(p => (
                            <tr key={p.name}>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                        <div style={{
                                            width: 32, height: 32, borderRadius: 8,
                                            background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontSize: 13, fontWeight: 800, color: 'var(--accent-bright)', flexShrink: 0
                                        }}>
                                            {p.name[0]}
                                        </div>
                                        <span style={{ fontWeight: 700 }}>{p.name}</span>
                                    </div>
                                </td>
                                <td style={{ color: 'rgba(255,255,255,0.5)' }}>{p.template}</td>
                                <td style={{ color: 'rgba(255,255,255,0.5)' }}>{p.category}</td>
                                <td style={{ fontWeight: 700, color: 'var(--accent-bright)' }}>{p.views}</td>
                                <td style={{ fontWeight: 700, color: '#34d399' }}>{p.conversions}</td>
                                <td>
                                    <span className={`badge ${p.status === 'Publicado' ? 'badge-green' : 'badge-amber'}`}>
                                        {p.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Quick Actions */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                {[
                    { label: 'Crear Landing Page', desc: 'Elige un template y configura tu tienda', href: '/builder', color: '#6366f1' },
                    { label: 'Documentación', desc: 'Aprende a usar todas las funciones', href: '/settings', color: '#06b6d4' },
                    { label: 'Configuración', desc: 'Ajusta tu perfil y plataforma', href: '/settings', color: '#a78bfa' },
                ].map(q => (
                    <Link key={q.label} href={q.href} style={{ textDecoration: 'none' }}>
                        <div className="ultra-glass glass-card-hover" style={{ padding: 24, cursor: 'pointer', position: 'relative', overflow: 'hidden' }}>
                            <div style={{
                                width: 40, height: 40, borderRadius: 12,
                                background: `${q.color}15`, border: `1px solid ${q.color}30`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14
                            }}>
                                <div style={{ width: 14, height: 14, borderRadius: '50%', background: q.color, boxShadow: `0 0 12px ${q.color}` }} />
                            </div>
                            <div style={{ fontSize: 14, fontWeight: 800, color: '#fff', marginBottom: 6 }}>{q.label}</div>
                            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', lineHeight: 1.5 }}>{q.desc}</div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
