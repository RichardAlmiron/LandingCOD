'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export default function ResetPasswordPage() {
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => { setLoading(false); setSent(true); }, 1000);
    };

    return (
        <div style={{ width: '100%', maxWidth: 420 }} className="page-enter">
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 64, height: 64, borderRadius: 18, background: 'rgba(99,102,241,0.1)', border: '1px solid var(--border-default)', marginBottom: 20 }}>
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <defs>
                            <linearGradient id="key-grad" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="#6366f1" />
                                <stop offset="100%" stopColor="#a78bfa" />
                            </linearGradient>
                        </defs>
                        <circle cx="12" cy="13" r="7" stroke="url(#key-grad)" strokeWidth="2" />
                        <circle cx="12" cy="13" r="3" fill="url(#key-grad)" opacity="0.5" />
                        <path d="M17 18 L26 27" stroke="url(#key-grad)" strokeWidth="2.5" strokeLinecap="round" />
                        <path d="M22 24 L24 22" stroke="url(#key-grad)" strokeWidth="2" strokeLinecap="round" />
                        <path d="M24 26 L26 24" stroke="url(#key-grad)" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </div>
                <h1 style={{ fontSize: 26, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 8, letterSpacing: '-0.02em' }}>
                    Restablecer contraseña
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6 }}>
                    Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña.
                </p>
            </div>

            <div className="glass-card" style={{ padding: 36 }}>
                {!sent ? (
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        <div>
                            <label className="label-dark">Correo electrónico</label>
                            <input
                                className="input-dark"
                                type="email"
                                placeholder="tu@email.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn-primary" style={{ width: '100%', padding: '13px', fontSize: 15 }} disabled={loading}>
                            {loading ? 'Enviando...' : 'Enviar enlace de recuperación'}
                        </button>
                    </form>
                ) : (
                    <div style={{ textAlign: 'center', padding: '8px 0' }}>
                        {/* Animated success SVG */}
                        <svg width="72" height="72" viewBox="0 0 72 72" fill="none" style={{ display: 'block', margin: '0 auto 20px' }}>
                            <defs>
                                <linearGradient id="success-grad" x1="0" y1="0" x2="1" y2="1">
                                    <stop offset="0%" stopColor="#10b981" />
                                    <stop offset="100%" stopColor="#34d399" />
                                </linearGradient>
                            </defs>
                            <circle cx="36" cy="36" r="35" stroke="url(#success-grad)" strokeWidth="2" fill="rgba(16,185,129,0.08)" />
                            <circle cx="36" cy="36" r="28" fill="rgba(16,185,129,0.06)" />
                            <path d="M22 36 L32 46 L50 26" stroke="url(#success-grad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" style={{ strokeDasharray: 50, animation: 'drawCheck 0.5s ease forwards 0.2s', strokeDashoffset: 50 }} />
                            <style>{`@keyframes drawCheck { to { stroke-dashoffset: 0; } }`}</style>
                        </svg>
                        <h3 style={{ fontWeight: 700, fontSize: 18, color: 'var(--text-primary)', marginBottom: 8 }}>¡Correo enviado!</h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6 }}>
                            Revisa tu bandeja de entrada en <strong style={{ color: 'var(--text-primary)' }}>{email}</strong>.<br />
                            El enlace expirará en 30 minutos.
                        </p>
                    </div>
                )}

                <div style={{ marginTop: 28, paddingTop: 20, borderTop: '1px solid var(--border-subtle)', textAlign: 'center' }}>
                    <Link href="/login" style={{ color: 'var(--text-secondary)', fontSize: 14, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3 L5 8 L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                        Volver al inicio de sesión
                    </Link>
                </div>
            </div>
        </div>
    );
}
