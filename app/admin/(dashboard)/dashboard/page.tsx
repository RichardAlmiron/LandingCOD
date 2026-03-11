'use client';
import React, { useEffect, useState } from 'react';
import { Users, Zap, Layout, ShieldCheck, ArrowUpRight, Activity, Server, Database, Wifi } from 'lucide-react';

export default function AdminDashboard() {
    const [counts, setCounts] = useState([0, 0, 0, 0]);
    useEffect(() => {
        const targets = [1248, 412, 3892, 99.9];
        const dur = 1400;
        const start = Date.now();
        const tick = () => {
            const p = Math.min((Date.now() - start) / dur, 1);
            const ease = 1 - Math.pow(1 - p, 3);
            setCounts(targets.map(t => t * ease));
            if (p < 1) requestAnimationFrame(tick);
        };
        setTimeout(() => requestAnimationFrame(tick), 300);
    }, []);

    const stats = [
        { name: 'USUARIOS TOTALES', value: Math.round(counts[0]).toLocaleString(), icon: Users, trend: '+12%', color: 'var(--accent-primary)' },
        { name: 'SUSCRIPCIONES PRO', value: Math.round(counts[1]).toString(), icon: Zap, trend: '+5%', color: 'var(--accent-cyan)' },
        { name: 'PROYECTOS ACTIVOS', value: Math.round(counts[2]).toLocaleString(), icon: Layout, trend: '+18%', color: 'var(--accent-violet)' },
        { name: 'UPTIME SISTEMA', value: `${counts[3].toFixed(1)}%`, icon: ShieldCheck, trend: 'Óptimo', color: '#10b981' },
    ];

    const nodes = [
        { label: 'Servidor API Express', status: 'Online', color: '#10b981', icon: Server },
        { label: 'Base de Datos Supabase', status: 'Online', color: '#10b981', icon: Database },
        { label: 'Worker de IA (Gemini)', status: 'Online', color: '#10b981', icon: Zap },
        { label: 'Red CDN Global', status: 'Online', color: '#10b981', icon: Wifi },
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* ═══ HEADER ═══ */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 className="shimmer-text" style={{ fontSize: 36, fontWeight: 900, letterSpacing: '-0.04em', margin: 0, lineHeight: 1 }}>
                        DIRECCIÓN GENERAL
                    </h1>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', fontWeight: 600, marginTop: 8, letterSpacing: '0.03em' }}>
                        Centro de mando de AlmiDrop Core • Todos los sistemas operativos
                    </p>
                </div>
                <div style={{
                    fontSize: 11, fontWeight: 800, color: '#10b981',
                    background: 'rgba(16,185,129,0.1)', padding: '8px 16px', borderRadius: 20,
                    border: '1px solid rgba(16,185,129,0.25)', letterSpacing: '0.05em',
                    display: 'flex', alignItems: 'center', gap: 6,
                    boxShadow: '0 0 15px rgba(16,185,129,0.1)'
                }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981', animation: 'breathe 2s ease-in-out infinite alternate' }}></div>
                    SISTEMA OPERATIVO
                </div>
            </div>

            {/* ═══ STATS GRID (Ultra-Glass cards like Auth) ═══ */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                {stats.map((stat) => (
                    <div key={stat.name} className="ultra-glass glass-card-hover" style={{ padding: '24px', position: 'relative', overflow: 'hidden', cursor: 'pointer' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16, position: 'relative', zIndex: 1 }}>
                            <div style={{
                                width: 44, height: 44, borderRadius: 12,
                                background: `rgba(255,255,255,0.03)`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                border: '1px solid rgba(255,255,255,0.06)',
                                boxShadow: `0 0 15px ${stat.color}20`
                            }}>
                                <stat.icon size={20} style={{ color: stat.color }} />
                            </div>
                            <div style={{
                                fontSize: 11, fontWeight: 800, color: '#10b981',
                                background: 'rgba(16,185,129,0.1)', padding: '4px 10px', borderRadius: 8,
                                border: '1px solid rgba(16,185,129,0.2)'
                            }}>
                                {stat.trend}
                            </div>
                        </div>
                        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', position: 'relative', zIndex: 1 }}>
                            {stat.name}
                        </div>
                        <div className="count-animate" style={{ fontSize: 30, fontWeight: 900, marginTop: 4, position: 'relative', zIndex: 1, letterSpacing: '-0.02em' }}>
                            {stat.value}
                        </div>

                        {/* Decorative glow */}
                        <div style={{
                            position: 'absolute', right: -20, bottom: -20, width: 80, height: 80,
                            background: `radial-gradient(circle, ${stat.color}15 0%, transparent 70%)`
                        }}></div>
                    </div>
                ))}
            </div>

            {/* ═══ MAIN CONTENT (Activity + Nodes) ═══ */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
                {/* Activity Log */}
                <div className="ultra-glass" style={{ padding: '32px', position: 'relative', overflow: 'hidden' }}>
                    <div className="hyper-ring" style={{ opacity: 0.2 }}></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, position: 'relative', zIndex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <Activity size={18} color="var(--accent-primary)" />
                            <h2 style={{ fontSize: 16, fontWeight: 900, letterSpacing: '0.03em', margin: 0 }}>ACTIVIDAD DEL SISTEMA</h2>
                        </div>
                        <button style={{
                            background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)',
                            color: 'var(--accent-bright)', fontWeight: 800, fontSize: 11, cursor: 'pointer',
                            display: 'flex', alignItems: 'center', gap: 4, padding: '6px 14px', borderRadius: 8,
                            letterSpacing: '0.05em'
                        }}>
                            VER TODO <ArrowUpRight size={12} />
                        </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative', zIndex: 1 }}>
                        {[
                            { action: 'Nuevo usuario registrado', detail: 'maria_pro@email.com — Plan Enterprise', time: 'Hace 3 min', color: 'var(--accent-primary)' },
                            { action: 'Proyecto desplegado', detail: 'MegaStore — Template MegaMarket Urgency', time: 'Hace 18 min', color: '#10b981' },
                            { action: 'Suscripción actualizada', detail: 'juan_demo@email.com — Free → Pro', time: 'Hace 45 min', color: 'var(--accent-cyan)' },
                            { action: 'Login administrativo', detail: 'admin@almidrop.com — IP: 192.168.x.x', time: 'Hace 1h', color: 'var(--accent-violet)' },
                        ].map((log, i) => (
                            <div key={i} style={{
                                display: 'flex', alignItems: 'center', gap: '16px', paddingBottom: '16px',
                                borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.04)' : 'none'
                            }}>
                                <div style={{
                                    width: 40, height: 40, borderRadius: 12,
                                    background: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    border: '1px solid rgba(255,255,255,0.06)',
                                    flexShrink: 0
                                }}>
                                    <Zap size={16} color={log.color} />
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>{log.action}</div>
                                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{log.detail}</div>
                                </div>
                                <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.25)', whiteSpace: 'nowrap' }}>
                                    {log.time}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* System Nodes */}
                <div className="ultra-glass" style={{ padding: '32px', position: 'relative', overflow: 'hidden' }}>
                    <div className="hyper-ring" style={{ opacity: 0.15 }}></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28, position: 'relative', zIndex: 1 }}>
                        <Server size={18} color="var(--accent-cyan)" />
                        <h2 style={{ fontSize: 16, fontWeight: 900, letterSpacing: '0.03em', margin: 0 }}>ESTADO DE NODOS</h2>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative', zIndex: 1 }}>
                        {nodes.map(node => (
                            <div key={node.label} style={{
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                padding: '14px 16px', borderRadius: 12,
                                background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)',
                                transition: 'all 0.2s ease'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                    <node.icon size={16} color="rgba(255,255,255,0.5)" />
                                    <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>{node.label}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <div style={{
                                        width: 7, height: 7, borderRadius: '50%', background: node.color,
                                        boxShadow: `0 0 10px ${node.color}`,
                                        animation: 'breathe 2s ease-in-out infinite alternate'
                                    }}></div>
                                    <span style={{ fontSize: 11, fontWeight: 800, color: node.color, letterSpacing: '0.05em' }}>
                                        {node.status.toUpperCase()}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
