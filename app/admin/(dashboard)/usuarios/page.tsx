'use client';
import React from 'react';
import { Users, Search, Filter, MoreHorizontal, Shield, Mail } from 'lucide-react';

export default function UserManagementPage() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div>
                <h1 className="shimmer-text" style={{ fontSize: 32, fontWeight: 900, marginBottom: 8 }}>GESTIÓN DE USUARIOS</h1>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>Administra los niveles de acceso y perfiles de la plataforma.</p>
            </div>

            <div className="ultra-glass" style={{ padding: '24px', display: 'flex', gap: '16px', alignItems: 'center' }}>
                <div style={{ flex: 1, position: 'relative' }}>
                    <input className="neo-input" placeholder="Buscar por nombre o correo..." style={{ paddingLeft: '44px' }} />
                    <Search size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }} />
                </div>
                <button className="btn-secondary" style={{ height: '48px', padding: '0 20px', borderRadius: '12px', borderColor: 'rgba(255,255,255,0.1)' }}>
                    <Filter size={18} style={{ marginRight: 8 }} /> FILTRAR
                </button>
            </div>

            <div className="ultra-glass" style={{ overflow: 'hidden' }}>
                <table className="table-dark" style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th>IDENTIDAD</th>
                            <th>ESTADO</th>
                            <th>PLAN</th>
                            <th>ROL</th>
                            <th>ACCIONES</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            { name: 'Richard Admin', email: 'richard@almidrop.com', status: 'Activo', plan: 'Enterprise', role: 'admin' },
                            { name: 'Juan Cliente', email: 'juan@demo.com', status: 'Activo', plan: 'Pro', role: 'user' },
                            { name: 'Maria Tester', email: 'maria@test.com', status: 'Pendiente', plan: 'Free', role: 'user' },
                        ].map((u, i) => (
                            <tr key={i}>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                        <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Users size={14} />
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: 700, fontSize: 14 }}>{u.name}</div>
                                            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', gap: 4 }}>
                                                <Mail size={10} /> {u.email}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span className={u.status === 'Activo' ? 'badge badge-green' : 'badge badge-amber'}>{u.status}</span>
                                </td>
                                <td>
                                    <span style={{ fontWeight: 700, fontSize: 12 }}>{u.plan}</span>
                                </td>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                        <Shield size={12} color={u.role === 'admin' ? 'var(--accent-primary)' : 'rgba(255,255,255,0.3)'} />
                                        <span style={{ textTransform: 'uppercase', fontSize: 11, fontWeight: 800 }}>{u.role}</span>
                                    </div>
                                </td>
                                <td>
                                    <button style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', cursor: 'pointer' }}>
                                        <MoreHorizontal size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
