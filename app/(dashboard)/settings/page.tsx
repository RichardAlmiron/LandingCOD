'use client';
import React, { useState } from 'react';

type Tab = 'profile' | 'system';

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
    return (
        <div className={`toggle-track ${on ? 'on' : ''}`} onClick={onToggle} style={{ cursor: 'pointer' }}>
            <div className="toggle-thumb" />
        </div>
    );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-subtle)' }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>{title}</h3>
            </div>
            <div style={{ padding: '24px' }}>{children}</div>
        </div>
    );
}

function Field({ label, description, children }: { label: string; description?: string; children: React.ReactNode }) {
    return (
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 24, paddingBottom: 20, marginBottom: 20, borderBottom: '1px solid var(--border-subtle)' }}>
            <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>{label}</div>
                {description && <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5 }}>{description}</div>}
            </div>
            <div style={{ flexShrink: 0 }}>{children}</div>
        </div>
    );
}

export default function SettingsPage() {
    const [tab, setTab] = useState<Tab>('profile');
    const [name, setName] = useState('Admin User');
    const [email, setEmail] = useState('admin@landingcod.com');
    const [saved, setSaved] = useState(false);
    const [notifications, setNotifications] = useState({ email: true, browser: true, weekly: false });
    const [darkMode, setDarkMode] = useState(true);
    const [defaultTemplate, setDefaultTemplate] = useState('megamarket');
    const [apiVisible, setApiVisible] = useState(false);
    const API_KEY = 'lc_live_sk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    };

    const tabs: { id: Tab; label: string }[] = [
        { id: 'profile', label: 'Perfil' },
        { id: 'system', label: 'Sistema' },
    ];

    return (
        <div className="page-enter" style={{ maxWidth: 740 }}>
            {/* Tab switcher */}
            <div style={{ display: 'flex', gap: 4, background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: 4, marginBottom: 28, width: 'fit-content' }}>
                {tabs.map(t => (
                    <button key={t.id} onClick={() => setTab(t.id)} style={{
                        padding: '8px 20px', borderRadius: 'var(--radius-sm)', border: 'none',
                        background: tab === t.id ? 'var(--accent-primary)' : 'transparent',
                        color: tab === t.id ? '#fff' : 'var(--text-secondary)',
                        fontWeight: 600, fontSize: 14, cursor: 'pointer', transition: 'all 0.2s',
                        boxShadow: tab === t.id ? '0 0 16px var(--accent-glow)' : 'none',
                    }}>{t.label}</button>
                ))}
            </div>

            {tab === 'profile' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <Section title="Información de Perfil">
                        {/* Avatar */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 20, paddingBottom: 24, marginBottom: 24, borderBottom: '1px solid var(--border-subtle)' }}>
                            <div style={{ position: 'relative' }}>
                                <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #a78bfa)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 800, color: '#fff', border: '3px solid var(--border-default)' }}>
                                    A
                                </div>
                            </div>
                            <div>
                                <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>{name}</div>
                                <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 12 }}>{email}</div>
                                <button className="btn-secondary" style={{ fontSize: 13, padding: '6px 14px' }}>Cambiar foto</button>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            <div>
                                <label className="label-dark">Nombre completo</label>
                                <input className="input-dark" value={name} onChange={e => setName(e.target.value)} />
                            </div>
                            <div>
                                <label className="label-dark">Correo electrónico</label>
                                <input className="input-dark" value={email} onChange={e => setEmail(e.target.value)} type="email" />
                            </div>
                        </div>
                    </Section>

                    <Section title="Seguridad">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            <div>
                                <label className="label-dark">Contraseña actual</label>
                                <input className="input-dark" type="password" placeholder="••••••••" />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                <div>
                                    <label className="label-dark">Nueva contraseña</label>
                                    <input className="input-dark" type="password" placeholder="Nueva contraseña" />
                                </div>
                                <div>
                                    <label className="label-dark">Confirmar contraseña</label>
                                    <input className="input-dark" type="password" placeholder="Confirmar" />
                                </div>
                            </div>
                        </div>
                    </Section>

                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button className="btn-primary" style={{ padding: '12px 28px' }} onClick={handleSave}>
                            {saved ? (
                                <>
                                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M2 7.5 L6.5 12 L13 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    Guardado
                                </>
                            ) : 'Guardar cambios'}
                        </button>
                    </div>
                </div>
            )}

            {tab === 'system' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <Section title="Preferencias de la Plataforma">
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Field label="Modo Oscuro" description="Interfaz oscura con acentos eléctricos">
                                <Toggle on={darkMode} onToggle={() => setDarkMode(p => !p)} />
                            </Field>
                            <Field label="Template por defecto" description="Template que se preselecciona al crear una nueva página">
                                <select value={defaultTemplate} onChange={e => setDefaultTemplate(e.target.value)} className="input-dark" style={{ width: 180 }}>
                                    <option value="megamarket">MegaMarket</option>
                                    <option value="boldathlete">BoldAthlete</option>
                                    <option value="minimaltech">MinimalTech</option>
                                    <option value="editorialchic">EditorialChic</option>
                                    <option value="italiancraft">ItalianCraft</option>
                                </select>
                            </Field>
                            <div style={{ borderBottom: 'none', paddingBottom: 0, marginBottom: 0 }}>
                                <Field label="Idioma" description="Idioma de la interfaz">
                                    <select className="input-dark" style={{ width: 180 }}>
                                        <option>Español</option>
                                        <option>English</option>
                                    </select>
                                </Field>
                            </div>
                        </div>
                    </Section>

                    <Section title="Notificaciones">
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Field label="Notificaciones por email" description="Recibe alertas importantes en tu correo">
                                <Toggle on={notifications.email} onToggle={() => setNotifications(p => ({ ...p, email: !p.email }))} />
                            </Field>
                            <Field label="Notificaciones del navegador" description="Alertas en tiempo real en el navegador">
                                <Toggle on={notifications.browser} onToggle={() => setNotifications(p => ({ ...p, browser: !p.browser }))} />
                            </Field>
                            <div style={{ borderBottom: 'none', paddingBottom: 0, marginBottom: 0 }}>
                                <Field label="Reporte semanal" description="Resumen de métricas cada semana">
                                    <Toggle on={notifications.weekly} onToggle={() => setNotifications(p => ({ ...p, weekly: !p.weekly }))} />
                                </Field>
                            </div>
                        </div>
                    </Section>

                    <Section title="API y Acceso">
                        <Field label="API Key" description="Úsala para integraciones externas">
                            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                                <code style={{ padding: '8px 12px', background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', fontSize: 12, color: 'var(--accent-bright)', fontFamily: 'monospace', letterSpacing: '0.02em' }}>
                                    {apiVisible ? API_KEY : '••••••••••••••••••••••••••••••••'}
                                </code>
                                <button className="btn-ghost" style={{ padding: '6px 10px' }} onClick={() => setApiVisible(p => !p)}>
                                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                                        {apiVisible
                                            ? <><circle cx="7.5" cy="7.5" r="2.5" stroke="currentColor" strokeWidth="1.5" /><path d="M1 7.5 C3 4 5 2.5 7.5 2.5 C10 2.5 12 4 14 7.5 C12 11 10 12.5 7.5 12.5 C5 12.5 3 11 1 7.5 Z" stroke="currentColor" strokeWidth="1.5" fill="none" /></>
                                            : <><path d="M1 1 L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M2 6 C3 4.5 5 3 7.5 3 M13 9 C12 10.5 10 12 7.5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></>
                                        }
                                    </svg>
                                </button>
                            </div>
                        </Field>
                    </Section>

                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button className="btn-primary" style={{ padding: '12px 28px' }} onClick={handleSave}>
                            {saved ? 'Guardado ✓' : 'Guardar cambios'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
