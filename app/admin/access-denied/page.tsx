'use client';
import Link from 'next/link';
import { ShieldAlert, AlertTriangle, Lock } from 'lucide-react';

export default function AdminAccessDenied() {
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(180deg, #0a0a0f 0%, #1a0505 50%, #0a0a0f 100%)',
            padding: '20px',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Líneas decorativas arriba y abajo */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(90deg, transparent 0%, #dc2626 20%, #ef4444 50%, #dc2626 80%, transparent 100%)',
                boxShadow: '0 0 20px rgba(220, 38, 38, 0.8)'
            }} />
            
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(90deg, transparent 0%, #dc2626 20%, #ef4444 50%, #dc2626 80%, transparent 100%)',
                boxShadow: '0 0 20px rgba(220, 38, 38, 0.8)'
            }} />

            {/* Glow de fondo */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '600px',
                height: '600px',
                background: 'radial-gradient(circle, rgba(220, 38, 38, 0.15) 0%, transparent 70%)',
                filter: 'blur(60px)',
                pointerEvents: 'none'
            }} />

            {/* Contenedor principal */}
            <div style={{
                textAlign: 'center',
                zIndex: 1,
                maxWidth: '500px'
            }}>
                {/* Icono de alerta */}
                <div style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '24px',
                    background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 32px',
                    boxShadow: '0 0 40px rgba(220, 38, 38, 0.5), inset 0 1px 0 rgba(255,255,255,0.2)',
                    border: '2px solid rgba(239, 68, 68, 0.5)',
                    animation: 'pulse 2s ease-in-out infinite'
                }}>
                    <ShieldAlert size={48} color="white" strokeWidth={1.5} />
                </div>

                {/* Título */}
                <h1 style={{
                    fontSize: '42px',
                    fontWeight: 900,
                    color: '#ef4444',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    margin: '0 0 16px',
                    textShadow: '0 0 30px rgba(239, 68, 68, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px'
                }}>
                    <AlertTriangle size={36} />
                    Acceso Denegado
                    <AlertTriangle size={36} />
                </h1>

                {/* Barra divisoria */}
                <div style={{
                    width: '200px',
                    height: '2px',
                    background: 'linear-gradient(90deg, transparent, #dc2626, transparent)',
                    margin: '24px auto'
                }} />

                {/* Mensaje */}
                <div style={{
                    background: 'rgba(220, 38, 38, 0.1)',
                    border: '1px solid rgba(220, 38, 38, 0.3)',
                    borderRadius: '12px',
                    padding: '24px',
                    marginBottom: '32px'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '12px',
                        marginBottom: '16px'
                    }}>
                        <Lock size={24} color="#ef4444" />
                        <span style={{
                            fontSize: '18px',
                            fontWeight: 700,
                            color: '#fca5a5'
                        }}>
                            Zona Restringida
                        </span>
                        <Lock size={24} color="#ef4444" />
                    </div>
                    <p style={{
                        fontSize: '16px',
                        color: 'rgba(255, 255, 255, 0.7)',
                        lineHeight: 1.6,
                        margin: 0
                    }}>
                        No tienes permisos para acceder a esta área.
                        <br />
                        <strong style={{ color: '#ef4444' }}>
                            Esta sección es exclusiva para Administradores.
                        </strong>
                    </p>
                </div>

                {/* Botón para volver */}
                <Link
                    href="/dashboard"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '14px 32px',
                        background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                        color: 'white',
                        fontSize: '15px',
                        fontWeight: 700,
                        textDecoration: 'none',
                        borderRadius: '10px',
                        boxShadow: '0 4px 20px rgba(99, 102, 241, 0.4)',
                        transition: 'all 0.3s ease',
                        border: '1px solid rgba(99, 102, 241, 0.5)'
                    }}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M19 12H5M12 19l-7-7 7-7"/>
                    </svg>
                    Volver a mi Dashboard
                </Link>
            </div>

            <style jsx>{`
                @keyframes pulse {
                    0%, 100% { transform: scale(1); box-shadow: 0 0 40px rgba(220, 38, 38, 0.5); }
                    50% { transform: scale(1.02); box-shadow: 0 0 60px rgba(220, 38, 38, 0.7); }
                }
            `}</style>
        </div>
    );
}
