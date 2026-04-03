'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { ShieldAlert, KeyRound, Mail, CheckCircle } from 'lucide-react';

export default function AdminResetPasswordPage() {
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            if (!res.ok) {
                const data = await res.json();
                setError(data.error || 'Error al enviar solicitud');
            } else {
                setSent(true);
            }
        } catch {
            setError('Error de conexión');
        } finally {
            setLoading(false);
        }
    };

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
                        RECUPERACIÓN DE ACCESO
                    </h1>
                    <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 700, letterSpacing: '0.1em', marginTop: 8 }}>
                        SISTEMA DE ADMINISTRADOR ALMIDROP
                    </p>
                </div>

                <div className="ultra-glass" style={{ padding: '40px' }}>
                    {!sent ? (
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                            {error && (
                                <div style={{
                                    background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.3)',
                                    borderRadius: 12, padding: '12px 16px', fontSize: 13, color: '#fb7185', fontWeight: 700
                                }}>
                                    {error}
                                </div>
                            )}

                            <div>
                                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: 16, lineHeight: 1.5 }}>
                                    Ingresa tu correo administrativo y te enviaremos un enlace seguro para restablecer tu contraseña.
                                </p>
                            </div>

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
                                    <Mail size={18} style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', opacity: 0.3 }} />
                                </div>
                            </div>

                            <button type="submit" className="neo-btn" disabled={loading} style={{ marginTop: 8 }}>
                                <span>{loading ? 'ENVIANDO...' : 'SOLICITAR RECUPERACIÓN'}</span>
                            </button>
                        </form>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '20px 0' }}>
                            <div style={{
                                width: 72, height: 72, borderRadius: '50%',
                                background: 'rgba(16, 185, 129, 0.1)',
                                border: '2px solid #10b981',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                margin: '0 auto 20px'
                            }}>
                                <CheckCircle size={36} color="#10b981" />
                            </div>
                            <h3 style={{ fontWeight: 700, fontSize: 20, color: 'var(--text-primary)', marginBottom: 12 }}>
                                ¡Solicitud enviada!
                            </h3>
                            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, lineHeight: 1.6 }}>
                                Revisa tu bandeja de entrada en <strong style={{ color: '#fff' }}>{email}</strong>.<br />
                                El enlace de recuperación expirará en 30 minutos.
                            </p>
                        </div>
                    )}
                </div>

                <p style={{ textAlign: 'center', fontSize: 13, color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>
                    <Link href="/admin/login" style={{ color: 'var(--accent-primary)', textDecoration: 'none', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                        <KeyRound size={16} />
                        VOLVER AL INICIO DE SESIÓN
                    </Link>
                </p>
            </div>
        </div>
    );
}
