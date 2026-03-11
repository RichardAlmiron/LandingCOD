'use client';
import React, { useState } from 'react';
import { Database, Search, Info, Code, Table, Shield } from 'lucide-react';

const TABLES_DOCS = [
    {
        id: 'usuarios',
        name: 'USUARIOS',
        purpose: 'Entidad central de identidad. Almacena el perfil, preferencias y credenciales de acceso de cada cliente de la plataforma.',
        fields: [
            { name: 'id', type: 'UUID', desc: 'Identificador único universal generado por el sistema.' },
            { name: 'email', type: 'TEXT', desc: 'Correo electrónico único verificado.' },
            { name: 'name', type: 'TEXT', desc: 'Nombre completo o razón social del usuario.' },
            { name: 'password_hash', type: 'TEXT', desc: 'Firma encriptada (Bcrypt) de la contraseña de seguridad.' },
            { name: 'plan', type: 'ENUM', desc: 'Nivel de suscripción actual (free, pro, enterprise).' },
        ]
    },
    {
        id: 'sesiones_auth',
        name: 'SESIONES_AUTH',
        purpose: 'Subsistema de seguridad para la rotación de tokens. Permite mantener sesiones activas de forma segura sin exponer credenciales constantes.',
        fields: [
            { name: 'user_id', type: 'UUID', desc: 'Referencia directa al propietario de la sesión.' },
            { name: 'refresh_token_hash', type: 'TEXT', desc: 'Huella digital del token de refresco para prevenir reutilización malintencionada.' },
            { name: 'expires_at', type: 'TIMESTAMPTZ', desc: 'Fecha y hora exacta en la que la sesión debe ser revocada por el sistema.' },
        ]
    },
    {
        id: 'proyectos',
        name: 'PROYECTOS',
        purpose: 'Almacén de activos digitales. Contiene la configuración, métricas y datos de las Landing Pages creadas por los usuarios.',
        fields: [
            { name: 'name', type: 'TEXT', desc: 'Título descriptivo del proyecto asignado por el usuario.' },
            { name: 'template', type: 'TEXT', desc: 'Identificador del diseño visual aplicado (ej. MegaMarket, Minimalist).' },
            { name: 'store_data', type: 'JSONB', desc: 'Estructura dinámica que contiene productos, precios y configuración personalizada.' },
            { name: 'views', type: 'INT', desc: 'Contadores de tráfico real acumulado para el análisis de conversión.' },
        ]
    }
];

export default function DocumentationPage() {
    const [activeTable, setActiveTable] = useState(TABLES_DOCS[0]);

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '32px', height: 'calc(100vh - 120px)' }}>
            {/* Table Selector */}
            <div className="ultra-glass" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, padding: '0 8px' }}>
                    <Database size={18} color="var(--accent-primary)" />
                    <span style={{ fontSize: 13, fontWeight: 900, letterSpacing: '0.05em' }}>DICCIONARIO DE DATOS</span>
                </div>

                {TABLES_DOCS.map(table => (
                    <button
                        key={table.id}
                        onClick={() => setActiveTable(table)}
                        style={{
                            display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderRadius: 12,
                            border: activeTable.id === table.id ? '1px solid rgba(255,255,255,0.1)' : '1px solid transparent',
                            background: activeTable.id === table.id ? 'rgba(255,255,255,0.05)' : 'transparent',
                            color: activeTable.id === table.id ? '#fff' : 'rgba(255,255,255,0.4)',
                            cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s ease',
                            fontSize: 14, fontWeight: activeTable.id === table.id ? 700 : 500
                        }}
                    >
                        <Table size={16} />
                        {table.name}
                    </button>
                ))}
            </div>

            {/* Documentation Content */}
            <div style={{ overflowY: 'auto', paddingRight: '8px' }}>
                <div className="ultra-glass" style={{ padding: '40px', marginBottom: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                        <div style={{
                            width: 50, height: 50, borderRadius: 12,
                            background: 'rgba(99,102,241,0.1)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            border: '1px solid rgba(99,102,241,0.2)'
                        }}>
                            <Code size={24} color="var(--accent-primary)" />
                        </div>
                        <div>
                            <h1 style={{ fontSize: 24, fontWeight: 900, margin: 0 }}>TABLA: <span className="shimmer-text">{activeTable.name}</span></h1>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 4, fontWeight: 600 }}>
                                <Shield size={12} /> ALTA DISPONIBILIDAD • RLS ACTIVO
                            </div>
                        </div>
                    </div>

                    <div style={{
                        background: 'rgba(0,0,0,0.2)', padding: '24px', borderRadius: 16,
                        border: '1px solid rgba(255,255,255,0.05)', marginBottom: 40
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                            <Info size={16} color="var(--accent-cyan)" />
                            <span style={{ fontSize: 11, fontWeight: 800, color: 'var(--accent-cyan)', letterSpacing: '0.05em' }}>PROPÓSITO DE LA TABLA</span>
                        </div>
                        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, margin: 0, fontWeight: 500 }}>
                            {activeTable.purpose}
                        </p>
                    </div>

                    <h2 style={{ fontSize: 14, fontWeight: 900, marginBottom: 20, letterSpacing: '0.05em', color: 'rgba(255,255,255,0.6)' }}>DEFINICIÓN DE CAMPOS (SCHEMA)</h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {activeTable.fields.map(field => (
                            <div key={field.name} style={{
                                display: 'grid', gridTemplateColumns: '180px 120px 1fr', gap: '20px',
                                alignItems: 'center', padding: '16px 20px', borderRadius: 12,
                                background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.03)'
                            }}>
                                <span style={{ fontFamily: 'monospace', fontSize: 14, fontWeight: 700, color: '#fff' }}>{field.name}</span>
                                <span style={{ fontSize: 11, fontWeight: 800, color: 'var(--accent-violet)', background: 'rgba(168,85,247,0.1)', padding: '4px 8px', borderRadius: 6, width: 'fit-content', textAlign: 'center' }}>
                                    {field.type}
                                </span>
                                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>{field.desc}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
