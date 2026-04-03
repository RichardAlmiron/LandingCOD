'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

export default function LoginPage() {
    const { login } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError('');
        setLoading(true);
        const { error: err, user } = await login(email, password, 'client');
        if (err) {
            setLoading(false);
            setError(err);
            return;
        }
        // Hard navigation para que el middleware vea las cookies recién establecidas
        window.location.href = '/dashboard';
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', maxWidth: 460, gap: '20px' }}>
            {/* Ultra-Premium Header */}
            <div style={{ textAlign: 'center', zIndex: 10 }}>
                <div style={{
                    width: 56, height: 56, borderRadius: 16,
                    background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-violet))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 0 30px var(--accent-glow)',
                    margin: '0 auto 16px',
                    border: '1px solid rgba(255,255,255,0.2)'
                }}>
                    <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
                        <path d="M14 4 L24 10 L24 18 L14 24 L4 18 L4 10 Z" stroke="white" strokeWidth="2.5" fill="none" />
                        <circle cx="14" cy="14" r="3" fill="white" />
                    </svg>
                </div>
                <h1 className="shimmer-text" style={{ fontSize: 32, fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1, margin: 0 }}>
                    ACCESO ÉLITE
                </h1>
                <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 8, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.8 }}>
                    Plataforma Profesional ALMIDROP
                </p>
            </div>

            {/* Neo-Brutalist Form Card */}
            <div className="ultra-glass" style={{ width: '100%', padding: '32px 40px' }}>
                <div className="hyper-ring"></div>
                <form onSubmit={handleSubmit} style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 24 }}>

                    {error && (
                        <div style={{
                            background: 'rgba(244,63,94,0.15)', border: '1px solid rgba(244,63,94,0.5)',
                            borderRadius: 'var(--radius-md)', padding: '14px 16px',
                            fontSize: 13, color: '#fb7185', fontWeight: 700,
                            animation: 'shake 0.4s ease'
                        }}>
                            {error}
                        </div>
                    )}

                    <div className="neo-input-group">
                        <label className="neo-label">IDENTIDAD DIGITAL / EMAIL</label>
                        <input
                            className="neo-input"
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="correo@ejemplo.com"
                            autoComplete="email"
                            required
                        />
                    </div>

                    <div className="neo-input-group">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                            <label className="neo-label" style={{ marginBottom: 0 }}>CLAVE DE SEGURIDAD</label>
                            <Link href="/reset-password" style={{ fontSize: 11, color: 'var(--accent-bright)', textDecoration: 'none', fontWeight: 800, textTransform: 'uppercase', opacity: 0.8 }}>
                                Recuperar
                            </Link>
                        </div>
                        <input
                            className="neo-input"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="••••••••••••"
                            autoComplete="current-password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="neo-btn"
                        disabled={loading}
                        style={{ marginTop: 8 }}
                    >
                        <span>{loading ? 'AUTENTICANDO...' : 'ENTRAR AL SISTEMA'}</span>
                    </button>
                </form>
            </div>

            {/* Premium Trust Footer */}
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', fontWeight: 600, letterSpacing: '0.05em', marginTop: 8 }}>
                ¿NUEVO EN LA PLATAFORMA?{' '}
                <Link href="/register" style={{ color: 'var(--accent-bright)', fontWeight: 800, textDecoration: 'none', borderBottom: '1px solid' }}>
                    CREAR CUENTA
                </Link>
            </p>

            <style jsx>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-6px); }
                    75% { transform: translateX(6px); }
                }
            `}</style>
        </div>
    );
}
