'use client';

import React, { useEffect, useState } from 'react';

interface StudioLaunchSequenceProps {
    onComplete: () => void;
    productCount?: number;
    storeName?: string;
}

const PHASES = [
    { text: 'Iniciando secuencia de despliegue principal...', time: 0 },
    { text: 'Conectando al motor de renderizado avanzado...', time: 1500 },
    { text: 'Analizando catálogo y metadatos...', time: 3500 },
    { text: 'Inyectando componentes dinámicos de alto impacto...', time: 5500 },
    { text: 'Compilando arquitectura e interactividad...', time: 7500 },
    { text: 'Sincronizando estado abstracto y caché...', time: 9500 },
    { text: 'Optimizando motor de rendimiento máximo...', time: 11500 },
    { text: 'Ajustes finales de la plataforma...', time: 13000 },
    { text: '¡Todo listo! Desplegando entorno...', time: 14000 }
];

export default function StudioLaunchSequence({ onComplete, productCount = 0, storeName = 'Visual Editor' }: StudioLaunchSequenceProps) {
    const [phaseIndex, setPhaseIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isUnveiling, setIsUnveiling] = useState(false);
    const [isFadingOutHud, setIsFadingOutHud] = useState(false);

    useEffect(() => {
        // Manejar el progreso de la barra y las fases
        const startTime = Date.now();
        const duration = 14000; // 14 segundos neto de carga hasta abrir el telón
        
        const updateProgress = () => {
            const elapsed = Date.now() - startTime;
            const currentProgress = Math.min((elapsed / duration) * 100, 100);
            setProgress(currentProgress);

            // Actualizar el texto basado en el tiempo transcurrido
            const activePhase = [...PHASES].reverse().findIndex(p => elapsed >= p.time);
            if (activePhase !== -1) {
                setPhaseIndex(PHASES.length - 1 - activePhase);
            }

            // Ocultar HUD cuando llega al 100%
            if (elapsed >= 14000 && !isFadingOutHud) {
                setIsFadingOutHud(true);
            }

            // Iniciar la partición del telón
            if (elapsed >= 14300 && !isUnveiling) {
                setIsUnveiling(true);
            }

            // Finalizar secuencia tras terminar la apertura logrando aprox 15.3s netos
            if (elapsed >= 15300) {
                onComplete();
                return;
            }

            requestAnimationFrame(updateProgress);
        };

        const animation = requestAnimationFrame(updateProgress);
        return () => cancelAnimationFrame(animation);
    }, [isUnveiling, isFadingOutHud, onComplete]);

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999, // Superponerse sobre absolutamente todo el panel 4 que carga detrás
            pointerEvents: 'none', // Impedir clics mientras se monta
        }}>
            {/* Animación local que define el CSS Cinematográfico */}
            <style>{`
                .cinematic-left, .cinematic-right {
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    width: 50vw;
                    background: #030303;
                    transition: transform 1.2s cubic-bezier(0.85, 0, 0.15, 1); /* Transición más dramática y lenta */
                    z-index: 1;
                    display: flex;
                    align-items: center;
                    pointer-events: none; /* CRITICAL: Allow clicks to pass through to the editor */
                }
                .cinematic-left {
                    left: 0;
                    border-right: 1px solid rgba(0, 243, 255, 0.1);
                    box-shadow: inset -20px 0 50px rgba(0, 0, 0, 0.8);
                }
                .cinematic-right {
                    right: 0;
                    border-left: 1px solid rgba(0, 243, 255, 0.1);
                    box-shadow: inset 20px 0 50px rgba(0, 0, 0, 0.8);
                }
                .cinematic-left.open {
                    transform: translateX(-100vw);
                }
                .cinematic-right.open {
                    transform: translateX(100vw);
                }
                .neon-glare {
                    position: absolute;
                    top: 0; bottom: 0;
                    width: 2px;
                    background: linear-gradient(to bottom, transparent, #00f3ff, transparent);
                    opacity: 0;
                    transition: opacity 0.5s;
                    z-index: 2;
                }
                .cinematic-left .neon-glare { right: 0; transform: translateX(50%); }
                .cinematic-right .neon-glare { left: 0; transform: translateX(-50%); }
                .glare-active .neon-glare { opacity: 1; animation: pulseGlow 2s infinite alternate; }
                
                @keyframes pulseGlow {
                    0% { box-shadow: 0 0 10px #00f3ff, 0 0 20px #00c8c8; }
                    100% { box-shadow: 0 0 25px #00f3ff, 0 0 50px #00c8c8; }
                }
                @keyframes floatIdle {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-12px); }
                }

                .cinematic-hud {
                    position: absolute;
                    inset: 0;
                    z-index: 10;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    opacity: 1;
                    transition: opacity 0.5s ease-in-out, transform 0.8s cubic-bezier(0.85, 0, 0.15, 1);
                    pointer-events: none; /* CRITICAL: Allow clicks to pass through to the editor */
                }
                .cinematic-hud.fade-out {
                    opacity: 0;
                    transform: scale(1.15) translateY(-20px);
                }
                
                .glow-circle-container {
                    position: relative;
                    width: 140px;
                    height: 140px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 40px;
                    animation: floatIdle 5s ease-in-out infinite;
                }
                .spinner-ring {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    border: 2px solid transparent;
                    border-top-color: #00f3ff;
                    border-bottom-color: #6366f1;
                    animation: spin 2s linear infinite;
                }
                .spinner-ring-inner {
                    position: absolute;
                    width: 70%;
                    height: 70%;
                    border-radius: 50%;
                    border: 2px solid transparent;
                    border-left-color: #fca5a5;
                    border-right-color: #fca5a5;
                    animation: spin 1.2s linear infinite reverse;
                }
                .hud-percentage {
                    font-family: 'Inter', system-ui, sans-serif;
                    font-size: 26px;
                    font-weight: 900;
                    letter-spacing: -1px;
                    background: linear-gradient(135deg, #ffffff, #a1a1aa);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                @keyframes spin { 100% { transform: rotate(360deg); } }

            `}</style>
            
            {/* Paneles del telón oscuros */}
            <div className={`cinematic-left ${isUnveiling ? 'open' : 'glare-active'}`}>
                <div className="neon-glare"></div>
            </div>
            <div className={`cinematic-right ${isUnveiling ? 'open' : 'glare-active'}`}>
                <div className="neon-glare"></div>
            </div>

            {/* HUD / Holograma Central */}
            <div className={`cinematic-hud ${isFadingOutHud ? 'fade-out' : ''}`}>
                <div className="glow-circle-container">
                    <div className="spinner-ring"></div>
                    <div className="spinner-ring-inner" style={{ borderColor: 'transparent', borderLeftColor: '#00f3ff', borderRightColor: '#6366f1' }}></div>
                    <div className="hud-percentage">
                        {progress.toFixed(1)}%
                    </div>
                </div>

                {/* Título y estado */}
                <h1 style={{
                    color: '#fff', fontSize: '32px', fontWeight: 900, letterSpacing: '-0.03em',
                    marginBottom: '12px', textTransform: 'uppercase', textShadow: '0 0 20px rgba(255,255,255,0.2)'
                }}>
                    {storeName}
                </h1>
                
                {/* Caja de terminal HUD */}
                <div style={{
                    background: 'rgba(0, 0, 0, 0.4)',
                    border: '1px solid rgba(99, 102, 241, 0.2)',
                    backdropFilter: 'blur(8px)',
                    padding: '12px 24px',
                    borderRadius: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    minWidth: '380px',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        color: '#00f3ff', fontFamily: 'monospace', fontSize: '12px', fontWeight: 600,
                        textTransform: 'uppercase', letterSpacing: '0.1em'
                    }}>
                        {PHASES[phaseIndex]?.text || 'Cargando...'}
                    </div>

                    {/* Barra de progreso */}
                    <div style={{
                        width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)',
                        marginTop: '16px', borderRadius: '4px', overflow: 'hidden', position: 'relative'
                    }}>
                        <div style={{
                            position: 'absolute', top: 0, bottom: 0, left: 0, 
                            width: `${progress}%`,
                            background: 'linear-gradient(90deg, #6366f1, #00f3ff)',
                            boxShadow: '0 0 10px #00f3ff',
                            transition: 'width 0.1s linear'
                        }}></div>
                    </div>
                </div>

                <div style={{
                    marginTop: '24px', color: 'rgba(255,255,255,0.4)', fontSize: '11px',
                    textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 800
                }}>
                    {productCount > 0 ? `${productCount} PRODUCTOS INYECTADOS` : 'INICIANDO MÓDULOS'}
                </div>
            </div>
        </div>
    );
}
