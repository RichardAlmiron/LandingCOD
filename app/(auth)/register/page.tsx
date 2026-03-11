'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

const COUNTRIES = [
    { code: '+54', name: 'Argentina', flag: '🇦🇷' },
    { code: '+34', name: 'España', flag: '🇪🇸' },
    { code: '+52', name: 'México', flag: '🇲🇽' },
    { code: '+57', name: 'Colombia', flag: '🇨🇴' },
    { code: '+56', name: 'Chile', flag: '🇨🇱' },
    { code: '+51', name: 'Perú', flag: '🇵🇪' },
    { code: '+58', name: 'Venezuela', flag: '🇻🇪' },
    { code: '+1', name: 'USA', flag: '🇺🇸' },
];

export default function RegisterPage() {
    const { register } = useAuth();
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [countryCode, setCountryCode] = useState('+34');
    const [whatsapp, setWhatsapp] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError('');
        setLoading(true);
        const fullPhone = `${countryCode}${whatsapp}`;
        const { error: err } = await register(name, email, password, 'free', 'user', { whatsapp: fullPhone });
        setLoading(false);
        if (err) {
            setError(err);
        } else {
            router.push('/dashboard');
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', maxWidth: 460, gap: '16px' }}>
            {/* Ultra-Premium Header */}
            <div style={{ textAlign: 'center', zIndex: 10 }}>
                <div style={{
                    width: 48, height: 48, borderRadius: 12,
                    background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-cyan))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 0 25px var(--accent-glow)',
                    margin: '0 auto 12px',
                    border: '1px solid rgba(255,255,255,0.2)'
                }}>
                    <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
                        <path d="M14 4 L24 10 L24 18 L14 24 L4 18 L4 10 Z" stroke="white" strokeWidth="2.5" fill="none" />
                        <circle cx="14" cy="14" r="3" fill="white" />
                    </svg>
                </div>
                <h1 className="shimmer-text" style={{ fontSize: 26, fontWeight: 900, letterSpacing: '-0.04em', margin: 0 }}>
                    NUEVO PROYECTO
                </h1>
                <p style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 4, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.8 }}>
                    CREACIÓN DE CUENTA ÉLITE
                </p>
            </div>

            {/* Neo-Brutalist Form Card */}
            <div className="ultra-glass" style={{ width: '100%', padding: '24px 32px' }}>
                <div className="hyper-ring"></div>
                <form onSubmit={handleSubmit} style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>

                    {/* VIP HUD Offer */}
                    <div style={{
                        background: 'linear-gradient(90deg, rgba(99,102,241,0.1), rgba(6,182,212,0.1))',
                        border: '1px solid rgba(255,255,255,0.05)', borderRadius: 'var(--radius-md)',
                        padding: '10px', textAlign: 'center',
                        boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.5)',
                        position: 'relative', overflow: 'hidden'
                    }}>
                        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: 'var(--accent-cyan)' }}></div>
                        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.9)', margin: 0, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                            ACCESO VIP: <span className="shimmer-text" style={{ fontWeight: 900, color: '#fff' }}>3 DÍAS SIN COSTE</span>
                        </div>
                    </div>

                    {error && (
                        <div style={{ background: 'rgba(244,63,94,0.15)', border: '1px solid rgba(244,63,94,0.5)', borderRadius: 'var(--radius-md)', padding: '12px 16px', fontSize: 12, color: '#fb7185', fontWeight: 700, animation: 'shake 0.4s ease' }}>
                            {error}
                        </div>
                    )}

                    <div className="neo-input-group">
                        <label className="neo-label">NOMBRE COMPLETO</label>
                        <input className="neo-input" value={name} onChange={e => setName(e.target.value)} placeholder="Ej. Juan Pérez" required style={{ padding: '12px 16px' }} />
                    </div>

                    <div className="neo-input-group">
                        <label className="neo-label">CORREO ELECTRÓNICO</label>
                        <input className="neo-input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="tu@email.com" required style={{ padding: '12px 16px' }} />
                    </div>

                    <div className="neo-input-group">
                        <label className="neo-label">CONEXIÓN WHATSAPP</label>
                        <div style={{ display: 'flex', gap: 8 }}>
                            <select
                                className="neo-input"
                                value={countryCode}
                                onChange={(e) => setCountryCode(e.target.value)}
                                style={{ width: 100, padding: '12px', appearance: 'none', cursor: 'pointer', textAlign: 'center' }}
                            >
                                {COUNTRIES.map(c => (
                                    <option key={c.code} value={c.code} style={{ background: '#080810', color: '#fff' }}>
                                        {c.flag} {c.code}
                                    </option>
                                ))}
                            </select>
                            <input
                                className="neo-input"
                                value={whatsapp}
                                onChange={e => setWhatsapp(e.target.value.replace(/\D/g, ''))}
                                placeholder="Número móvil"
                                style={{ flex: 1, padding: '12px 16px' }}
                                required
                            />
                        </div>
                    </div>

                    <div className="neo-input-group">
                        <label className="neo-label">CLAVE DE ACCESO</label>
                        <input className="neo-input" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••••••" minLength={8} required style={{ padding: '12px 16px' }} />
                    </div>

                    <button
                        type="submit"
                        className="neo-btn"
                        disabled={loading}
                        style={{ marginTop: 8, padding: '14px 24px' }}
                    >
                        <span>{loading ? 'DESPLEGANDO...' : 'CREAR CUENTA PROFESIONAL'}</span>
                    </button>
                </form>
            </div>

            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', fontWeight: 600, letterSpacing: '0.05em' }}>
                ¿YA TIENES ACCESO?{' '}
                <Link href="/login" style={{ color: 'var(--accent-bright)', fontWeight: 800, textDecoration: 'none', borderBottom: '1px solid' }}>
                    ENTRAR AQUÍ
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
