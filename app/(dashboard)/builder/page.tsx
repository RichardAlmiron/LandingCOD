'use client';
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { CartProvider } from '@/contexts/CartContext';

const BuilderFlow = dynamic(() => import('@/components/flujo-constructor/BuilderFlow'), {
    ssr: false,
    loading: () => <BuilderSkeleton />,
});

function BuilderSkeleton() {
    return (
        <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', height: 'calc(100vh - 140px)', gap: 20,
        }}>
            <div style={{
                width: 56, height: 56, borderRadius: 16,
                background: 'rgba(99,102,241,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '1px solid rgba(99,102,241,0.15)',
            }}>
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <circle cx="20" cy="20" r="16" stroke="rgba(99,102,241,0.15)" strokeWidth="3" />
                    <circle cx="20" cy="20" r="16" stroke="#6366f1" strokeWidth="3"
                        strokeDasharray="25 75" strokeLinecap="round">
                        <animateTransform attributeName="transform" type="rotate"
                            from="0 20 20" to="360 20 20" dur="0.6s" repeatCount="indefinite" />
                    </circle>
                </svg>
            </div>
            <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: '#fff', marginBottom: 6 }}>
                    Preparando Builder
                </div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', fontWeight: 500 }}>
                    Cargando herramientas de diseño...
                </div>
            </div>
            {/* Skeleton bars */}
            <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                {[80, 100, 60].map((w, i) => (
                    <div key={i} style={{
                        width: w, height: 8, borderRadius: 4,
                        background: 'rgba(255,255,255,0.04)',
                        animation: `pulse 1.5s ease-in-out ${i * 0.2}s infinite`,
                    }} />
                ))}
            </div>
            <style>{`@keyframes pulse { 0%,100% { opacity: 0.4; } 50% { opacity: 1; } }`}</style>
        </div>
    );
}

export default function BuilderPage() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        // Montar el componente pesado en el siguiente frame para que
        // la página se pinte inmediatamente con el skeleton
        const id = requestAnimationFrame(() => setShow(true));
        return () => cancelAnimationFrame(id);
    }, []);

    if (!show) return <BuilderSkeleton />;

    return (
        <CartProvider>
            <BuilderFlow />
        </CartProvider>
    );
}
