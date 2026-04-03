'use client';

import React, { useEffect, useState } from 'react';
import { Layers } from 'lucide-react';

export default function AuthCinematicIntro({ onComplete }: { onComplete: () => void }) {
    const [progress, setProgress] = useState(0);
    const [isUnveiling, setIsUnveiling] = useState(false);
    const [isFadingOut, setIsFadingOut] = useState(false);
    const [diagnosticText, setDiagnosticText] = useState('PROTOCOLO LANDICOD INICIADO...');

    useEffect(() => {
        const startTime = Date.now();
        const duration = 5000; // 5 segundos de carga intensa

        const updateProgress = () => {
            const elapsed = Date.now() - startTime;
            const currentProgress = Math.min((elapsed / duration) * 100, 100);
            setProgress(currentProgress);

            if (elapsed > 1000 && elapsed < 2000) setDiagnosticText('SINCRONIZANDO CON ALMIDROP CLOUD...');
            if (elapsed >= 2000 && elapsed < 3500) setDiagnosticText('CONFIGURANDO ENTORNO DINÁMICO...');
            if (elapsed >= 3500 && elapsed < 4500) setDiagnosticText('AUTENTICACIÓN DE SISTEMA NIVEL 7...');
            if (elapsed >= 4500) setDiagnosticText('CANAL DE ACCESO LISTO');

            if (elapsed >= 5000 && !isFadingOut) {
                setIsFadingOut(true);
            }

            if (elapsed >= 5500 && !isUnveiling) {
                setIsUnveiling(true);
            }

            // Duración total de 7 segundos netos (5 de carga + 2 de transición final)
            if (elapsed >= 7000) {
                onComplete();
                return;
            }

            requestAnimationFrame(updateProgress);
        };

        const animation = requestAnimationFrame(updateProgress);
        return () => cancelAnimationFrame(animation);
    }, [isUnveiling, isFadingOut, onComplete]);

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#04040a',
            transition: 'opacity 0.8s cubic-bezier(0.85, 0, 0.15, 1), transform 0.8s cubic-bezier(0.85, 0, 0.15, 1)',
            opacity: isUnveiling ? 0 : 1,
            transform: isUnveiling ? 'scale(1.2) translateY(-20px)' : 'scale(1)',
        }}>
            <style>{`
                .orbit-ring {
                    position: absolute;
                    border-radius: 50%;
                    border: 1px solid rgba(99, 102, 241, 0.2);
                    animation: rotateRing 10s linear infinite;
                }
                .orbit-1 { width: 140px; height: 140px; }
                .orbit-2 { width: 220px; height: 220px; animation-duration: 20s; animation-direction: reverse; border-color: rgba(0, 243, 255, 0.1); }
                .orbit-3 { width: 300px; height: 300px; animation-duration: 15s; border-style: dashed; }
                
                @keyframes rotateRing {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

                .core-glow {
                    animation: corePulse 3s infinite alternate;
                }
                @keyframes corePulse {
                    0% { filter: drop-shadow(0 0 15px rgba(99, 102, 241, 0.5)); transform: scale(0.95) rotate(0deg); }
                    100% { filter: drop-shadow(0 0 45px rgba(0, 243, 255, 0.8)); transform: scale(1.05) rotate(15deg); }
                }

                .node-particle {
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    background: #00f3ff;
                    border-radius: 50%;
                    box-shadow: 0 0 10px #00f3ff;
                }
                
                .scan-bar {
                    position: absolute;
                    width: 100%;
                    height: 150px;
                    background: linear-gradient(to bottom, transparent, rgba(99, 102, 241, 0.05), transparent);
                    top: -150px;
                    animation: v-scan 4s infinite linear;
                }
                @keyframes v-scan {
                    0% { top: -150px; }
                    100% { top: 100vh; }
                }

                .shimmer-logo {
                    background: linear-gradient(90deg, #fff, #6366f1, #00f3ff, #fff);
                    background-size: 300% 100%;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    animation: shimer 4s infinite linear;
                }
                @keyframes shimer {
                    0% { background-position: 0% 50%; }
                    100% { background-position: 100% 50%; }
                }
            `}</style>
            
            {/* Capas Espaciales / Orbitales */}
            <div className="orbit-ring orbit-1" />
            <div className="orbit-ring orbit-2" />
            <div className="orbit-ring orbit-3" />
            <div className="scan-bar" />

            {/* Contenido HUD */}
            <div style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '40px',
                transition: 'opacity 0.4s',
                opacity: isFadingOut ? 0 : 1
            }}>
                <div style={{ position: 'relative', marginBottom: 32 }} className="core-glow">
                    <div style={{
                        width: 80, height: 80, borderRadius: 24,
                        background: 'linear-gradient(135deg, #6366f1, #00f3ff)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 0 50px rgba(99, 102, 241, 0.4)'
                    }}>
                        <Layers size={40} color="#fff" strokeWidth={2} />
                    </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                    <div className="shimmer-logo" style={{
                        fontSize: 32,
                        fontWeight: 900,
                        letterSpacing: '0.1em',
                        marginBottom: 4,
                        textTransform: 'uppercase'
                    }}>
                        LANDICOD
                    </div>
                    <div style={{
                        fontSize: 10,
                        letterSpacing: '0.4em',
                        color: 'rgba(255,255,255,0.4)',
                        marginBottom: 28,
                        fontWeight: 800,
                        textTransform: 'uppercase'
                    }}>
                        BY ALMIDROP
                    </div>
                </div>
                
                {/* Consola de Diagnóstico */}
                <div style={{
                    width: 320,
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    padding: '16px 20px',
                    borderRadius: 12,
                    backdropFilter: 'blur(10px)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <div style={{
                        fontSize: 9,
                        letterSpacing: '0.2em',
                        color: '#00f3ff',
                        fontWeight: 700,
                        marginBottom: 16,
                        height: 12,
                        width: '100%',
                        textAlign: 'center'
                    }}>
                        {diagnosticText}
                    </div>

                    {/* Barra de Progreso Core */}
                    <div style={{
                        width: '100%',
                        height: 2,
                        background: 'rgba(255,255,255,0.1)',
                        position: 'relative',
                        overflow: 'hidden',
                        borderRadius: 1
                    }}>
                        <div style={{
                            position: 'absolute',
                            left: 0, top: 0, bottom: 0,
                            width: `${progress}%`,
                            background: 'linear-gradient(90deg, #6366f1, #00f3ff)',
                            boxShadow: '0 0 15px #00f3ff',
                            transition: 'width 0.1s linear'
                        }} />
                    </div>
                    
                    <div style={{
                        marginTop: 10,
                        fontSize: 9,
                        color: 'rgba(255,255,255,0.4)',
                        fontFamily: 'monospace',
                        fontWeight: 700
                    }}>
                        ACCESO_ESTADO: {(progress).toFixed(1)}%
                    </div>
                </div>
            </div>
        </div>
    );
}
