'use client';

import React, { useEffect, useState } from 'react';

interface StepCinematicTransitionProps {
    /** Callback cuando la animación termina */
    onComplete: () => void;
    /** Título principal que se muestra en el HUD (ej: "Etapa 2") */
    title: string;
    /** Subtítulo descriptivo (ej: "Selección de Tienda") */
    subtitle: string;
    /** Duración mínima en ms (default 2000 = 2 segundos). El telón NO se abre antes de esto. */
    minDuration?: number;
    /** Señal externa: true cuando los datos del siguiente paso ya están listos.
     *  El telón se abre solo cuando minDuration pasó Y dataReady es true. */
    dataReady?: boolean;
    /** Color de acento para el efecto (default cyan) */
    accentColor?: string;
}

export default function StepCinematicTransition({
    onComplete,
    title,
    subtitle,
    minDuration = 2000,
    dataReady = true,
    accentColor = '#00f3ff'
}: StepCinematicTransitionProps) {
    const [progress, setProgress] = useState(0);
    const [isUnveiling, setIsUnveiling] = useState(false);
    const [isFadingOutHud, setIsFadingOutHud] = useState(false);
    const [minTimeReached, setMinTimeReached] = useState(false);

    // Fase 1: Barra de progreso corre durante minDuration (efecto visual)
    useEffect(() => {
        const startTime = Date.now();
        const progressDuration = minDuration * 0.85; // La barra llega a 100% al 85% del tiempo mínimo

        const updateProgress = () => {
            const elapsed = Date.now() - startTime;
            const currentProgress = Math.min((elapsed / progressDuration) * 100, 100);
            setProgress(currentProgress);

            if (elapsed >= minDuration) {
                setMinTimeReached(true);
                return; // Dejamos de animar, esperamos a dataReady
            }

            requestAnimationFrame(updateProgress);
        };

        const animation = requestAnimationFrame(updateProgress);
        return () => cancelAnimationFrame(animation);
    }, [minDuration]);

    // Fase 2: Cuando minDuration pasó Y dataReady es true → abrir telón y completar
    useEffect(() => {
        if (!minTimeReached || !dataReady) return;

        // Primero ocultar el HUD
        setIsFadingOutHud(true);

        // Después de 200ms abrir el telón
        const unveilTimer = setTimeout(() => {
            setIsUnveiling(true);
        }, 200);

        // Después de 700ms (200 + 500 de animación del telón) → completar
        const completeTimer = setTimeout(() => {
            onComplete();
        }, 700);

        return () => {
            clearTimeout(unveilTimer);
            clearTimeout(completeTimer);
        };
    }, [minTimeReached, dataReady, onComplete]);

    // Duración fija de la transición del telón
    const curtainSpeed = 0.5;

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            pointerEvents: 'none',
        }}>
            <style>{`
                .step-cinematic-left, .step-cinematic-right {
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    width: 50vw;
                    background: #030303;
                    transition: transform ${curtainSpeed}s cubic-bezier(0.85, 0, 0.15, 1);
                    z-index: 1;
                    display: flex;
                    align-items: center;
                }
                .step-cinematic-left {
                    left: 0;
                    border-right: 1px solid ${accentColor}22;
                    box-shadow: inset -20px 0 50px rgba(0, 0, 0, 0.8);
                }
                .step-cinematic-right {
                    right: 0;
                    border-left: 1px solid ${accentColor}22;
                    box-shadow: inset 20px 0 50px rgba(0, 0, 0, 0.8);
                }
                .step-cinematic-left.open {
                    transform: translateX(-100vw);
                }
                .step-cinematic-right.open {
                    transform: translateX(100vw);
                }
                .step-neon-glare {
                    position: absolute;
                    top: 0; bottom: 0;
                    width: 2px;
                    background: linear-gradient(to bottom, transparent, ${accentColor}, transparent);
                    opacity: 0;
                    transition: opacity 0.3s;
                    z-index: 2;
                }
                .step-cinematic-left .step-neon-glare { right: 0; transform: translateX(50%); }
                .step-cinematic-right .step-neon-glare { left: 0; transform: translateX(-50%); }
                .step-glare-active .step-neon-glare { opacity: 1; animation: stepPulseGlow 1s infinite alternate; }

                @keyframes stepPulseGlow {
                    0% { box-shadow: 0 0 10px ${accentColor}, 0 0 20px ${accentColor}88; }
                    100% { box-shadow: 0 0 25px ${accentColor}, 0 0 50px ${accentColor}88; }
                }
                @keyframes stepFloatIdle {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-8px); }
                }
                @keyframes stepSpin { 100% { transform: rotate(360deg); } }

                .step-cinematic-hud {
                    position: absolute;
                    inset: 0;
                    z-index: 10;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    opacity: 1;
                    transition: opacity 0.3s ease-in-out, transform 0.5s cubic-bezier(0.85, 0, 0.15, 1);
                }
                .step-cinematic-hud.fade-out {
                    opacity: 0;
                    transform: scale(1.1) translateY(-15px);
                }

                .step-glow-circle {
                    position: relative;
                    width: 100px;
                    height: 100px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 28px;
                    animation: stepFloatIdle 3s ease-in-out infinite;
                }
                .step-spinner-ring {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    border: 2px solid transparent;
                    border-top-color: ${accentColor};
                    border-bottom-color: #6366f1;
                    animation: stepSpin 1.5s linear infinite;
                }
                .step-spinner-ring-inner {
                    position: absolute;
                    width: 70%;
                    height: 70%;
                    border-radius: 50%;
                    border: 2px solid transparent;
                    border-left-color: ${accentColor};
                    border-right-color: #6366f1;
                    animation: stepSpin 0.9s linear infinite reverse;
                }
            `}</style>

            {/* Paneles del telón */}
            <div className={`step-cinematic-left ${isUnveiling ? 'open' : 'step-glare-active'}`}>
                <div className="step-neon-glare"></div>
            </div>
            <div className={`step-cinematic-right ${isUnveiling ? 'open' : 'step-glare-active'}`}>
                <div className="step-neon-glare"></div>
            </div>

            {/* HUD Central */}
            <div className={`step-cinematic-hud ${isFadingOutHud ? 'fade-out' : ''}`}>
                <div className="step-glow-circle">
                    <div className="step-spinner-ring"></div>
                    <div className="step-spinner-ring-inner"></div>
                    <span style={{
                        fontFamily: "'Inter', system-ui, sans-serif",
                        fontSize: 20,
                        fontWeight: 900,
                        letterSpacing: '-0.5px',
                        background: 'linear-gradient(135deg, #ffffff, #a1a1aa)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}>
                        {progress.toFixed(0)}%
                    </span>
                </div>

                {/* Título de la etapa */}
                <h1 style={{
                    color: '#fff', fontSize: 28, fontWeight: 900, letterSpacing: '-0.03em',
                    marginBottom: 8, textTransform: 'uppercase',
                    textShadow: `0 0 20px rgba(255,255,255,0.2)`
                }}>
                    {title}
                </h1>

                {/* Subtítulo */}
                <p style={{
                    color: accentColor, fontFamily: 'monospace', fontSize: 13, fontWeight: 600,
                    textTransform: 'uppercase', letterSpacing: '0.12em',
                    marginBottom: 20,
                }}>
                    {subtitle}
                </p>

                {/* Barra de progreso mini */}
                <div style={{
                    width: 280, height: 3, background: 'rgba(255,255,255,0.1)',
                    borderRadius: 4, overflow: 'hidden', position: 'relative'
                }}>
                    <div style={{
                        position: 'absolute', top: 0, bottom: 0, left: 0,
                        width: `${progress}%`,
                        background: `linear-gradient(90deg, #6366f1, ${accentColor})`,
                        boxShadow: `0 0 10px ${accentColor}`,
                        transition: 'width 0.1s linear'
                    }}></div>
                </div>
            </div>
        </div>
    );
}
