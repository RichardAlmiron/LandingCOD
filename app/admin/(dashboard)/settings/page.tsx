'use client';
import React from 'react';
import { Settings, Shield, Bell, Database, Save, Lock } from 'lucide-react';

export default function AdminSettingsPage() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div>
                <h1 className="shimmer-text" style={{ fontSize: 32, fontWeight: 900, marginBottom: 8 }}>CONFIGURACIÓN DEL SISTEMA</h1>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>Ajustes globales de seguridad y parámetros de la plataforma.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div className="ultra-glass" style={{ padding: '32px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                        <Shield size={20} color="var(--accent-primary)" />
                        <h2 style={{ fontSize: 18, fontWeight: 900 }}>Seguridad y Acceso</h2>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                        <div className="neo-input-group">
                            <label className="neo-label">Modo de Registro</label>
                            <select className="neo-input" style={{ appearance: 'none' }}>
                                <option>Solo Invitación</option>
                                <option>Abierto al Público</option>
                                <option>Restringido por Dominio</option>
                            </select>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <div style={{ fontSize: 14, fontWeight: 700 }}>Doble Autenticación (2FA)</div>
                                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Requerido para cuentas administrativas</div>
                            </div>
                            <div className="toggle-track on"><div className="toggle-thumb" /></div>
                        </div>

                        <button className="neo-btn" style={{ padding: '14px' }}>
                            <Save size={18} style={{ marginRight: 8 }} /> GUARDAR CAMBIOS
                        </button>
                    </div>
                </div>

                <div className="ultra-glass" style={{ padding: '32px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                        <Database size={20} color="var(--accent-cyan)" />
                        <h2 style={{ fontSize: 18, fontWeight: 900 }}>Infraestructura</h2>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.05)' }}>
                            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 800, marginBottom: 8, textTransform: 'uppercase' }}>Token de API Maestro</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <div style={{ flex: 1, fontFamily: 'monospace', fontSize: 13, color: 'var(--accent-cyan)' }}>sk-almidrop-************************</div>
                                <Lock size={14} color="rgba(255,255,255,0.2)" />
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <div style={{ fontSize: 14, fontWeight: 700 }}>Logs de Auditoría</div>
                                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Guardar historial por 90 días</div>
                            </div>
                            <div className="toggle-track on"><div className="toggle-thumb" /></div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <div style={{ fontSize: 14, fontWeight: 700 }}>Notificaciones de Error</div>
                                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Enviar alertas criticas por email</div>
                            </div>
                            <div className="toggle-track"><div className="toggle-thumb" /></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
