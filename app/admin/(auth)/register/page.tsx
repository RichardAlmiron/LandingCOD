'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { ShieldCheck, UserPlus } from 'lucide-react';

export default function AdminRegisterPage() {
    const { register } = useAuth();
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError('');

        setLoading(true);
        // We override the role to 'admin' in the registration data
        const { error: err } = await register(name, email, password, 'enterprise', 'admin');
        setLoading(false);

        if (err) {
            setError(err);
        } else {
            router.push('/admin/dashboard');
        }
    }

    return (
        <div style={{
            height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: '#05050a', overflow: 'hidden', position: 'relative'
        }}>
            <div className="bg-glow" style={{ position: 'absolute', bottom: '20%', right: '25%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%)', pointerEvents: 'none', filter: 'blur(60px)' }}></div>

            <div style={{ width: '100%', maxWidth: 440, zIndex: 10, display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{
                        width: 50, height: 50, borderRadius: 12,
                        background: 'rgba(99,102,241,0.1)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 0 25px rgba(99,102,241,0.15)',
                        margin: '0 auto 16px',
                        border: '1px solid rgba(255,255,255,0.1)'
                    }}>
                        <ShieldCheck size={28} color="var(--accent-primary)" />
                    </div>
                    <h1 className="shimmer-text" style={{ fontSize: 24, fontWeight: 900 }}>REGISTRO DE OPERADOR</h1>
                    <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 700, letterSpacing: '0.05em', marginTop: 4 }}>
                        ALTA DE NUEVO ADMINISTRADOR DEL SISTEMA
                    </p>
                </div>

                <div className="ultra-glass" style={{ padding: '32px' }}>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {error && (
                            <div style={{ background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.3)', borderRadius: 10, padding: '10px 14px', fontSize: 12, color: '#fb7185', fontWeight: 700 }}>
                                {error}
                            </div>
                        )}

                        <div className="neo-input-group">
                            <label className="neo-label">NOMBRE DE OPERADOR</label>
                            <input className="neo-input" value={name} onChange={e => setName(e.target.value)} placeholder="Ej. Admin Principal" required />
                        </div>

                        <div className="neo-input-group">
                            <label className="neo-label">CORREO CORPORATIVO</label>
                            <input className="neo-input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@almidrop.com" required />
                        </div>

                        <div className="neo-input-group">
                            <label className="neo-label">CONTRASEÑA</label>
                            <input className="neo-input" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••••••" required />
                        </div>

                        <button type="submit" className="neo-btn" disabled={loading} style={{ marginTop: 8 }}>
                            <span>{loading ? 'REGISTRANDO...' : 'REGISTRAR OPERADOR'}</span>
                        </button>
                    </form>
                </div>

                <p style={{ textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>
                    ¿YA TIENES ACCESO?{' '}
                    <Link href="/admin/login" style={{ color: 'var(--accent-primary)', textDecoration: 'none', fontWeight: 800 }}>
                        INICIAR SESIÓN
                    </Link>
                </p>
            </div>
        </div>
    );
}
