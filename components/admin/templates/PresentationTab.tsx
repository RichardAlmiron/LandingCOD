'use client';
import React, { useState, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, BookOpen } from 'lucide-react';

const MIN_SLIDE = 0;
const MAX_SLIDE = 15;

const SLIDE_TITLES: Record<number, string> = {
    0: 'GUÍA VISUAL — Prototipo de Plantillas',
    1: 'La Anatomía Visual de una Página de 1M$',
    2: 'Las Reglas Anti-Infoproducto',
    3: 'El Ecosistema de Alta Conversión',
    4: 'La Regla de Oro del Primer Vistazo',
    5: 'Navegación Silenciosa pero Efectiva',
    6: 'El Sustituto del Tacto',
    7: 'Copywriting de Precisión y Prueba Social Temprana',
    8: 'El Eje Central de la Acción',
    9: 'Credibilidad Inmediata (Trust Badges Minimalistas)',
    10: 'Sustituyendo el Muro de Texto',
    11: 'Facilitando la Decisión Lógica',
    12: 'El Poder de la Comunidad (Prueba Social y UGC)',
    13: 'Resolviendo Objeciones en Automático',
    14: 'Dominando la Pantalla Pequeña (Móvil)',
    15: 'Matriz de Diagnóstico y Alta Conversión',
};

function getImgSrc(n: number) {
    if (n === 0) return '/slides/Prototipo de plantillas..png';
    return `/slides/${n}.jpg`;
}

function NavBtn({ onClick, disabled, children }: {
    onClick: () => void; disabled: boolean; children: React.ReactNode;
}) {
    return (
        <button onClick={onClick} disabled={disabled} style={{
            width: 44, height: 44, borderRadius: 12, border: 'none',
            cursor: disabled ? 'default' : 'pointer',
            background: disabled ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.08)',
            color: disabled ? 'rgba(255,255,255,0.15)' : '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
            {children}
        </button>
    );
}

function GuideNote() {
    return (
        <div style={{
            padding: '16px 20px', borderRadius: 14, marginTop: 12,
            background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.15)',
            display: 'flex', flexDirection: 'column', gap: 10,
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <BookOpen size={16} style={{ color: '#f59e0b' }} />
                <span style={{ fontSize: 13, fontWeight: 800, color: '#f59e0b' }}>
                    Imagen Guía Representativa
                </span>
            </div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, margin: 0 }}>
                Esta imagen es la guía visual representativa de todo el documento Landing Prompt.
                Muestra exactamente cómo debe verse y estructurarse una página de producto de alta conversión.
                Toda página de producto creada debe basarse en esta imagen y respetar íntegramente
                la directiva técnica completa documentada en el Landing Prompt.
            </p>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.8, margin: 0 }}>
                La imagen muestra 10 secciones como referencia visual, pero la implementación real
                debe contener un mínimo de 15 secciones CRO modulares tal como se define en el
                documento maestro. Las 5 secciones adicionales (Misión de Marca, Garantía y Confianza,
                Venta Cruzada, Muro de Reseñas Detallado y Footer Funcional) deben incluirse
                obligatoriamente en toda página de producto.
            </p>
        </div>
    );
}

export default function PresentationTab() {
    const [current, setCurrent] = useState(0);
    const [fullscreen, setFullscreen] = useState(false);

    const goPrev = useCallback(() => setCurrent(c => Math.max(MIN_SLIDE, c - 1)), []);
    const goNext = useCallback(() => setCurrent(c => Math.min(MAX_SLIDE, c + 1)), []);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') goPrev();
            if (e.key === 'ArrowRight') goNext();
            if (e.key === 'Escape') setFullscreen(false);
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [goPrev, goNext]);

    const imgSrc = getImgSrc(current);
    const title = SLIDE_TITLES[current];
    const isGuide = current === 0;
    const displayNum = isGuide ? 'G' : String(current);

    // ── Fullscreen ──
    if (fullscreen) {
        return (
            <div style={{
                position: 'fixed', inset: 0, zIndex: 9999,
                background: '#000', display: 'flex', flexDirection: 'column',
            }}>
                <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '10px 20px', background: 'rgba(0,0,0,0.9)',
                    borderBottom: '1px solid rgba(255,255,255,0.08)',
                }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.5)' }}>
                        {isGuide ? 'Guía Visual' : `${current} / 15`} — {title}
                    </span>
                    <button onClick={() => setFullscreen(false)} style={{
                        padding: '6px 14px', borderRadius: 8, border: 'none', cursor: 'pointer',
                        background: 'rgba(239,68,68,0.1)', color: '#ef4444',
                        fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6,
                    }}>
                        <Minimize2 size={14} /> Salir
                    </button>
                </div>
                <div style={{
                    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: 20,
                }}>
                    <NavBtn onClick={goPrev} disabled={current <= MIN_SLIDE}>
                        <ChevronLeft size={24} />
                    </NavBtn>
                    <img src={imgSrc} alt={title} style={{
                        maxWidth: 'calc(100% - 120px)', maxHeight: 'calc(100vh - 120px)',
                        objectFit: 'contain', borderRadius: 12, margin: '0 16px',
                    }} />
                    <NavBtn onClick={goNext} disabled={current >= MAX_SLIDE}>
                        <ChevronRight size={24} />
                    </NavBtn>
                </div>
                <div style={{
                    display: 'flex', justifyContent: 'center', gap: 6, padding: '10px 20px',
                    borderTop: '1px solid rgba(255,255,255,0.08)',
                }}>
                    {Array.from({ length: MAX_SLIDE + 1 }, (_, i) => (
                        <button key={i} onClick={() => setCurrent(i)} style={{
                            width: current === i ? 28 : 8, height: 8, borderRadius: 4,
                            border: 'none', cursor: 'pointer',
                            background: current === i ? (i === 0 ? '#f59e0b' : '#6366f1') : 'rgba(255,255,255,0.15)',
                            transition: 'all 0.3s',
                        }} />
                    ))}
                </div>
            </div>
        );
    }

    // ── Normal view ──
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <h2 style={{ fontSize: 20, fontWeight: 800, color: '#fff', margin: '0 0 4px 0' }}>
                        Presentación Visual
                    </h2>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', margin: 0 }}>
                        Guía visual + 15 diapositivas del documento maestro. Usa ← → para navegar.
                    </p>
                </div>
                <button onClick={() => setFullscreen(true)} style={{
                    display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px',
                    borderRadius: 10, border: '1px solid rgba(99,102,241,0.25)',
                    background: 'rgba(99,102,241,0.1)', color: '#a78bfa',
                    fontSize: 12, fontWeight: 700, cursor: 'pointer',
                }}>
                    <Maximize2 size={14} /> Pantalla Completa
                </button>
            </div>

            {/* Slide title */}
            <div style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 16px', borderRadius: 10,
                background: isGuide ? 'rgba(245,158,11,0.06)' : 'rgba(99,102,241,0.06)',
                border: `1px solid ${isGuide ? 'rgba(245,158,11,0.12)' : 'rgba(99,102,241,0.12)'}`,
            }}>
                <span style={{
                    width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                    background: isGuide ? '#f59e0b' : '#6366f1',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 12, fontWeight: 900, color: '#fff',
                }}>
                    {displayNum}
                </span>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>{title}</span>
            </div>

            {/* Image */}
            <div style={{
                borderRadius: 16, overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.06)',
                background: '#f5f3ee',
            }}>
                <img src={imgSrc} alt={title} style={{ width: '100%', display: 'block' }} />
            </div>

            {/* Guide note - only on slide 0 */}
            {isGuide && <GuideNote />}

            {/* Navigation */}
            <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '10px 16px', borderRadius: 14,
                background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
            }}>
                <button onClick={goPrev} disabled={current <= MIN_SLIDE} style={{
                    display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px',
                    borderRadius: 10, border: 'none', fontSize: 12, fontWeight: 700,
                    cursor: current > MIN_SLIDE ? 'pointer' : 'default',
                    background: current > MIN_SLIDE ? 'rgba(255,255,255,0.06)' : 'transparent',
                    color: current > MIN_SLIDE ? '#fff' : 'rgba(255,255,255,0.15)',
                }}>
                    <ChevronLeft size={16} /> Anterior
                </button>

                <div style={{ display: 'flex', gap: 4 }}>
                    {Array.from({ length: MAX_SLIDE + 1 }, (_, i) => (
                        <button key={i} onClick={() => setCurrent(i)} style={{
                            width: current === i ? 30 : 22, height: 22, borderRadius: 6,
                            border: 'none', cursor: 'pointer', transition: 'all 0.2s',
                            background: current === i ? (i === 0 ? '#f59e0b' : '#6366f1') : 'rgba(255,255,255,0.06)',
                            fontSize: 9, fontWeight: 800,
                            color: current === i ? '#fff' : 'rgba(255,255,255,0.25)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                            {i === 0 ? 'G' : i}
                        </button>
                    ))}
                </div>

                <button onClick={goNext} disabled={current >= MAX_SLIDE} style={{
                    display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px',
                    borderRadius: 10, border: 'none', fontSize: 12, fontWeight: 700,
                    cursor: current < MAX_SLIDE ? 'pointer' : 'default',
                    background: current < MAX_SLIDE ? 'rgba(255,255,255,0.06)' : 'transparent',
                    color: current < MAX_SLIDE ? '#fff' : 'rgba(255,255,255,0.15)',
                }}>
                    Siguiente <ChevronRight size={16} />
                </button>
            </div>
        </div>
    );
}
