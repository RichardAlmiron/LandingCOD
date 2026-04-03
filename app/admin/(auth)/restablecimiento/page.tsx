'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, RefreshCcw, ShieldCheck } from 'lucide-react';

export default function AdminResetPasswordPage() {
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        // Mocking the reset email for now
        setTimeout(() => {
            setLoading(false);
            setSent(true);
        }, 1500);
    }

    return (
        <div style={{
            height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: '#05050a', overflow: 'hidden', position: 'relative'
        }}>
            <div className="bg-glow" style={{ top: '10%', right: '10%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.05) 0%, transparent 70%)' }}></div>

            <div style={{ width: '100%', maxWidth: 440, zIndex: 10, display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{
                        width: 50, height: 50, borderRadius: 12,
                        background: 'rgba(255,255,255,0.03)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 16px',
                        border: '1px solid rgba(255,255,255,0.05)'
                    }}>
                        <RefreshCcw size={28} color="var(--accent-primary)" />
                    </div>
                    <h1 className="shimmer-text" style={{ fontSize: 24, fontWeight: 900 }}>REESTABLECIMIENTO</h1>
                    <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 700, letterSpacing: '0.05em', marginTop: 4 }}>
                        GESTIÓN DE CREDENCIALES ADMINISTRATIVAS
                    </p>
                </div>

                <div className="ultra-glass" style={{ padding: '32px' }}>
                    {!sent ? (
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.5, margin: 0, fontWeight: 500 }}>
                                Introduzca su correo corporativo para recibir un enlace de recuperación seguro generado por el núcleo AlmiDrop.
                            </p>

                            <div className="neo-input-group">
                                <label className="neo-label">CORREO ELECTRÓNICO</label>
                                <div style={{ position: 'relative' }}>
                                    <input
                                        className="neo-input"
                                        type="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        placeholder="admin@almidrop.com"
                                        required
                                    />
                                    <Mail size={16} style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', opacity: 0.3 }} />
                                </div>
                            </div>

                            <button type="submit" className="neo-btn" disabled={loading}>
                                <span>{loading ? 'PROCESANDO...' : 'ENVIAR ENLACE DE ACCESO'}</span>
                            </button>
                        </form>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '16px 0' }}>
                            <div style={{
                                width: 44, height: 44, borderRadius: '50%', background: 'rgba(16,185,129,0.1)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px'
                            }}>
                                <ShieldCheck size={28} color="#10b981" />
                            </div>
                            <h2 style={{ fontSize: 18, fontWeight: 900, marginBottom: 12 }}>SOLICITUD ENVIADA</h2>
                            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.5, margin: 0 }}>
                                Si el correo <b>{email}</b> está registrado como administrador, recibirá instrucciones en breve.
                            </p>
                            <button
                                onClick={() => setSent(false)}
                                style={{
                                    marginTop: 24, background: 'none', border: 'none', color: 'var(--accent-primary)',
                                    fontWeight: 800, fontSize: 12, cursor: 'pointer', textTransform: 'uppercase'
                                }}
                            >
                                Intentar con otro correo
                            </button>
                        </div>
                    )}
                </div>

                <p style={{ textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>
                    <Link href="/admin/login" style={{ color: 'var(--accent-primary)', textDecoration: 'none', fontWeight: 800 }}>
                        VOLVER AL LOGIN
                    </Link>
                </p>
            </div>
        </div>
    );
}
