'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { ShieldAlert, KeyRound, UserCircle2 } from 'lucide-react';

export default function AdminLoginPage() {
    const { login } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError('');
        setLoading(true);
        const { error: err } = await login(email, password, 'admin');
        if (err) {
            setLoading(false);
            setError(err);
            return;
        }
        // Hard navigation — las cookies ya están establecidas por el API
        window.location.href = '/admin/dashboard';
    }

    return (
        <div style={{
            height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: '#05050a', overflow: 'hidden', position: 'relative'
        }}>
            {/* Background Effects */}
            <div className="bg-glow" style={{ position: 'absolute', top: '20%', left: '25%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)', pointerEvents: 'none', filter: 'blur(60px)' }}></div>

            <div style={{ width: '100%', maxWidth: 440, zIndex: 10, display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{
                        width: 60, height: 60, borderRadius: 16,
                        background: 'linear-gradient(135deg, #f43f5e, #881337)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 0 30px rgba(244,63,94,0.3)',
                        margin: '0 auto 20px',
                        border: '1px solid rgba(255,255,255,0.2)'
                    }}>
                        <ShieldAlert size={32} color="white" />
                    </div>
                    <h1 className="shimmer-text" style={{ fontSize: 28, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
                        ADMIN CORE ACCESS
                    </h1>
                    <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 700, letterSpacing: '0.1em', marginTop: 8 }}>
                        SISTEMA DE GESTIÓN CENTRAL ALMIDROP
                    </p>
                </div>

                <div className="ultra-glass" style={{ padding: '40px' }}>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                        {error && (
                            <div style={{
                                background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.3)',
                                borderRadius: 12, padding: '12px 16px', fontSize: 13, color: '#fb7185', fontWeight: 700
                            }}>
                                {error}
                            </div>
                        )}

                        <div className="neo-input-group">
                            <label className="neo-label">CORREO ADMINISTRATIVO</label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    className="neo-input"
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="admin@almidrop.com"
                                    required
                                />
                                <UserCircle2 size={18} style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', opacity: 0.3 }} />
                            </div>
                        </div>

                        <div className="neo-input-group">
                            <label className="neo-label">CLAVE MAESTRA</label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    className="neo-input"
                                    type="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder="••••••••••••"
                                    required
                                />
                                <KeyRound size={18} style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', opacity: 0.3 }} />
                            </div>
                        </div>

                        <button type="submit" className="neo-btn" disabled={loading} style={{ marginTop: 8 }}>
                            <span>{loading ? 'AUTENTICANDO...' : 'INICIAR SESIÓN SEGURA'}</span>
                        </button>
                    </form>
                </div>

                <p style={{ textAlign: 'center', fontSize: 13, color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>
                    <Link href="/admin/restablecimiento" style={{ color: 'var(--accent-primary)', textDecoration: 'none', fontWeight: 800 }}>
                        SOLICITAR RECUPERACIÓN DE ACCESO
                    </Link>
                </p>
            </div>
        </div>
    );
}
