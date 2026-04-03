'use client';
import React, { useState } from 'react';
import PresentationTab from '@/components/admin/templates/PresentationTab';
import RawDirectiveView from '@/components/admin/templates/RawDirectiveView';
import {
    FileText, Eye, Layers, Smartphone, Brain, Shield, ChevronDown, ChevronUp,
    Layout, Award, HelpCircle, Star, BarChart3, Image, Play, Users, Heart,
    Presentation, ScrollText,
    Lock, Settings, MessageSquare, ShoppingBag, Footprints, Copy, Check,
    AlertTriangle, Zap, Type, MousePointer
} from 'lucide-react';

// ═══════════════════════════════════════════════════════════
// DATOS DEL DOCUMENTO MAESTRO
// ═══════════════════════════════════════════════════════════

const SECTIONS = [
    { id: 1, name: 'Hero Section', subtitle: 'Above the Fold', icon: Layout, color: '#6366f1',
      description: 'Bloque de impacto inicial. Todo lo esencial sin scroll: navegación, galería HD con video, título SEO, precio bold, estrellas clicables, CTA de alto contraste.',
      elements: ['Logo + navegación + carrito', 'Galería HD + video del producto en uso', 'Título SEO-optimizado', 'Estrellas de reseñas clicables', 'Descripción de máx 2 frases', 'Botón ATC de alto contraste', 'Breadcrumbs sutiles'],
      why: 'El usuario decide en 3 segundos si se queda. Todo lo que necesita para comprar debe estar visible sin scroll.' },
    { id: 2, name: 'Beneficios Inmediatos', subtitle: '3 puntos clave', icon: Zap, color: '#10b981',
      description: 'Tres beneficios principales con iconografía minimalista de líneas finas. Sin emojis, sin colores saturados. Comunicación directa y profesional.',
      elements: ['3 iconos de líneas finas monocromáticos', 'Títulos de 3-4 palabras', 'Descripciones de 1 línea máximo'],
      why: 'El cerebro procesa 3 puntos rápidamente. Más de 3 genera fatiga cognitiva. Menos de 3 no convence.' },
    { id: 3, name: 'Autoridad ("As Seen In")', subtitle: 'Validación externa', icon: Award, color: '#8b5cf6',
      description: 'Logotipos de prensa, certificaciones o premios en escala de grises. Monocromático para no competir visualmente con el producto.',
      elements: ['Logos de medios en escala de grises', 'Certificaciones reales', 'Badges de autoridad personalizados'],
      why: 'La validación de terceros reduce la ansiedad de compra. El cerebro confía más en lo que otros ya validaron.' },
    { id: 4, name: '¿Por qué usarlo?', subtitle: 'Beneficios que resuelven', icon: HelpCircle, color: '#f59e0b',
      description: 'Enfoque en los beneficios principales que resuelven problemas reales del cliente. No features, sino transformaciones.',
      elements: ['Problema → Solución visual', 'Beneficios orientados al usuario', 'Imágenes de estilo de vida'],
      why: 'La gente no compra productos, compra soluciones a sus problemas. Esta sección conecta el producto con la vida real del usuario.' },
    { id: 5, name: 'Comparativa de Superioridad', subtitle: 'Nosotros vs. Competencia', icon: BarChart3, color: '#ef4444',
      description: 'Tabla elegante y minimalista comparando tu producto vs. la competencia. Sin colores agresivos, solo datos claros.',
      elements: ['Tabla limpia con tipografía clara', 'Checkmarks monocromáticos', 'Diferenciadores destacados sutilmente'],
      why: 'El usuario siempre compara. Si no le das la comparación, la buscará afuera y podrías perderlo.' },
    { id: 6, name: 'Ingeniería / Materiales', subtitle: 'Calidad tangible', icon: Settings, color: '#06b6d4',
      description: 'Detalles sobre la calidad de fabricación. Imágenes macro del producto, materiales, procesos. Genera percepción de valor premium.',
      elements: ['Imágenes macro de alta calidad', 'Detalles de materiales y procesos', 'Datos técnicos de fabricación'],
      why: 'Mostrar el "cómo está hecho" justifica el precio y genera percepción de calidad superior.' },
    { id: 7, name: 'Tutorial Visual', subtitle: 'Cómo usarlo', icon: Play, color: '#8b5cf6',
      description: 'Guía paso a paso con iconos de autor o videos cortos. Elimina la barrera de "no sé si sabré usarlo".',
      elements: ['3-4 pasos visuales numerados', 'Iconos o ilustraciones de autor', 'Video corto opcional'],
      why: 'Si el usuario puede visualizarse usando el producto, la barrera de compra baja drásticamente.' },
    { id: 8, name: 'Prueba Social Dinámica', subtitle: 'UGC y fotos reales', icon: Users, color: '#10b981',
      description: 'Carrusel de contenido generado por usuarios. Fotos reales de clientes usando el producto. Nada de stock photos.',
      elements: ['Carrusel de fotos de clientes reales', 'Contenido UGC auténtico', 'Nombres y ubicaciones reales'],
      why: 'El contenido generado por usuarios es 9.8x más influyente que el contenido de marca según estudios de Nielsen.' },
    { id: 9, name: 'Misión de Marca', subtitle: 'Conexión emocional', icon: Heart, color: '#ec4899',
      description: 'Historia y valores de la empresa. Conexión emocional que trasciende el producto. El usuario compra la marca, no solo el objeto.',
      elements: ['Historia breve y auténtica', 'Valores de marca claros', 'Imagen del equipo o fundador'],
      why: 'Las marcas con propósito generan 4x más lealtad. El usuario quiere sentir que su compra tiene significado.' },
    { id: 10, name: 'Garantía y Confianza', subtitle: 'Eliminación de riesgo', icon: Shield, color: '#6366f1',
      description: 'Explicación visual de la política de devoluciones, seguridad de pago y garantía. Elimina el último obstáculo antes de la compra.',
      elements: ['Política de devolución clara y visual', 'Badges de seguridad de pago', 'Garantía con timeline visual'],
      why: 'El miedo a perder dinero es la objeción #1. Una garantía clara y visible puede aumentar conversiones hasta 30%.' },
    { id: 11, name: 'Especificaciones Técnicas', subtitle: 'Drawers expandibles', icon: Layers, color: '#f97316',
      description: 'Datos técnicos en cajones expandibles (drawers/acordeones). No saturar la vista. El usuario técnico los abre, el casual los ignora.',
      elements: ['Acordeones limpios y elegantes', 'Datos organizados por categoría', 'Expandibles sin romper el flujo'],
      why: 'Satisface al comprador analítico sin abrumar al comprador emocional. Ambos perfiles coexisten.' },
    { id: 12, name: 'Preguntas Frecuentes', subtitle: 'Destructor de objeciones', icon: MessageSquare, color: '#14b8a6',
      description: 'Acordeones limpios que resuelven las objeciones más comunes ANTES de que el usuario las piense.',
      elements: ['8-10 preguntas estratégicas', 'Respuestas cortas y directas', 'Acordeón con animación suave'],
      why: 'Cada pregunta sin responder es una razón para no comprar. Las FAQ bien hechas pueden reducir abandono en 25%.' },
    { id: 13, name: 'Venta Cruzada', subtitle: 'Completa el look', icon: ShoppingBag, color: '#a855f7',
      description: 'Recomendaciones de productos relacionados. Aumenta el ticket promedio sin ser invasivo.',
      elements: ['Grid de 3-4 productos relacionados', 'Precios visibles', 'Botón de agregar rápido'],
      why: 'El 35% de los ingresos de Amazon vienen de recomendaciones. Si ya confía en ti, comprará más.' },
    { id: 14, name: 'Muro de Reseñas', subtitle: 'Prueba social profunda', icon: Star, color: '#f59e0b',
      description: 'Sección completa de reseñas con filtros, fotos de clientes, distribución de estrellas. La prueba social definitiva.',
      elements: ['Distribución de estrellas visual', 'Filtros por rating y tema', 'Fotos de clientes en reseñas', 'Reseñas verificadas'],
      why: 'El 93% de consumidores lee reseñas antes de comprar. Esta sección es el cierre de confianza final.' },
    { id: 15, name: 'Footer Funcional', subtitle: 'Cierre profesional', icon: Footprints, color: '#64748b',
      description: 'Métodos de pago, información legal, links de soporte. Discreto pero completo. El último toque de profesionalismo.',
      elements: ['Iconos de métodos de pago', 'Links legales (términos, privacidad)', 'Contacto y soporte', 'Redes sociales'],
      why: 'Un footer profesional es señal de legitimidad. Su ausencia genera desconfianza inmediata.' },
];

const PRINCIPLES = [
    { title: 'Anti-Infoproducto', icon: AlertTriangle, color: '#ef4444',
      rule: 'Prohibido el uso de emojis genéricos, iconos de colores saturados o checks verdes brillantes.',
      solution: 'Usar insignias de autoridad personalizadas, monocromáticas, de líneas finas y minimalistas.' },
    { title: 'Fricción Cero', icon: MousePointer, color: '#6366f1',
      rule: 'El usuario no debe adivinar dónde está la información clave.',
      solution: 'Layout familiar que reduce ansiedad. Precio bold y grande. ATC como punto focal.' },
    { title: 'Jerarquía Visual', icon: Eye, color: '#8b5cf6',
      rule: 'Cada elemento tiene un orden de importancia visual estricto.',
      solution: 'Precio bold → ATC destacado → Beneficios → Prueba social → Detalles técnicos.' },
    { title: 'Legibilidad', icon: Type, color: '#10b981',
      rule: 'Frases cortas y punchy. Cero bloques de texto densos.',
      solution: 'Máximo 2 frases por descripción. Módulos visuales independientes. Espacio generoso.' },
    { title: 'Mobile First', icon: Smartphone, color: '#f59e0b',
      rule: 'Dots en carrusel móvil. Imagen siguiente asomándose. Sticky ATC.',
      solution: 'Botón pegajoso al scroll. Pruebas en Chrome y Safari obligatorias.' },
    { title: 'Cada Pixel Cuenta', icon: Brain, color: '#ec4899',
      rule: 'Si un elemento no elimina una duda o demuestra autoridad, se elimina.',
      solution: 'Diseño limpio, espacioso y extremadamente profesional. Cero decoración sin propósito.' },
];

// ═══════════════════════════════════════════════════════════
// COMPONENTES
// ═══════════════════════════════════════════════════════════

function SectionCard({ section, index }: { section: typeof SECTIONS[0]; index: number }) {
    const [open, setOpen] = useState(false);
    return (
        <div style={{
            background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 16, overflow: 'hidden', transition: 'all 0.3s',
        }}>
            <button onClick={() => setOpen(!open)} style={{
                width: '100%', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16,
                background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
            }}>
                {/* Number */}
                <div style={{
                    width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                    background: `${section.color}12`, border: `1px solid ${section.color}25`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 14, fontWeight: 800, color: section.color,
                }}>
                    {String(section.id).padStart(2, '0')}
                </div>
                {/* Icon */}
                <div style={{
                    width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                    background: `${section.color}08`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                    <section.icon size={18} style={{ color: section.color }} />
                </div>
                {/* Text */}
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>{section.name}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', fontWeight: 600, marginTop: 2 }}>{section.subtitle}</div>
                </div>
                {/* Chevron */}
                <div style={{ color: 'rgba(255,255,255,0.2)', flexShrink: 0 }}>
                    {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
            </button>

            {open && (
                <div style={{ padding: '0 24px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {/* Description */}
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, margin: 0 }}>
                        {section.description}
                    </p>
                    {/* Elements */}
                    <div>
                        <span style={{ fontSize: 10, fontWeight: 800, color: section.color, letterSpacing: '0.1em', display: 'block', marginBottom: 8 }}>
                            ELEMENTOS REQUERIDOS
                        </span>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                            {section.elements.map((el, i) => (
                                <div key={i} style={{
                                    display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px',
                                    borderRadius: 8, background: 'rgba(255,255,255,0.02)',
                                }}>
                                    <div style={{ width: 4, height: 4, borderRadius: '50%', background: section.color, flexShrink: 0 }} />
                                    <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>{el}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Why */}
                    <div style={{
                        padding: '12px 16px', borderRadius: 10,
                        background: `${section.color}06`, borderLeft: `3px solid ${section.color}40`,
                    }}>
                        <span style={{ fontSize: 10, fontWeight: 800, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', display: 'block', marginBottom: 4 }}>
                            ¿POR QUÉ ESTA SECCIÓN?
                        </span>
                        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, margin: 0 }}>
                            {section.why}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

function PrincipleCard({ principle }: { principle: typeof PRINCIPLES[0] }) {
    return (
        <div style={{
            padding: '20px 24px', borderRadius: 14,
            background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.06)',
            display: 'flex', flexDirection: 'column', gap: 12,
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                    width: 32, height: 32, borderRadius: 8,
                    background: `${principle.color}10`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                    <principle.icon size={16} style={{ color: principle.color }} />
                </div>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>{principle.title}</span>
            </div>
            <div style={{
                padding: '8px 12px', borderRadius: 8, background: 'rgba(239,68,68,0.04)',
                border: '1px solid rgba(239,68,68,0.08)',
            }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#ef4444', letterSpacing: '0.05em' }}>REGLA: </span>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{principle.rule}</span>
            </div>
            <div style={{
                padding: '8px 12px', borderRadius: 8, background: 'rgba(16,185,129,0.04)',
                border: '1px solid rgba(16,185,129,0.08)',
            }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: '#10b981', letterSpacing: '0.05em' }}>SOLUCIÓN: </span>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{principle.solution}</span>
            </div>
        </div>
    );
}

// ═══════════════════════════════════════════════════════════
// PÁGINA PRINCIPAL
// ═══════════════════════════════════════════════════════════

export default function LandingPromptPage() {
    const [activeTab, setActiveTab] = useState<'sections' | 'principles' | 'prompt' | 'presentation'>('sections');

    return (
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 32 }}>
            {/* Header */}
            <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                    <div style={{
                        width: 44, height: 44, borderRadius: 12,
                        background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.15))',
                        border: '1px solid rgba(99,102,241,0.25)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                        <FileText size={22} style={{ color: '#a78bfa' }} />
                    </div>
                    <div>
                        <h1 className="shimmer-text" style={{ fontSize: 28, fontWeight: 900, letterSpacing: '-0.03em', margin: 0, lineHeight: 1 }}>
                            LANDING PROMPT
                        </h1>
                        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', fontWeight: 600, marginTop: 4, letterSpacing: '0.03em' }}>
                            Documento maestro para la creación de páginas de producto de alta autoridad
                        </p>
                    </div>
                </div>

                {/* Subtitle card */}
                <div style={{
                    marginTop: 16, padding: '16px 20px', borderRadius: 12,
                    background: 'rgba(99,102,241,0.04)', border: '1px solid rgba(99,102,241,0.1)',
                }}>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, margin: 0 }}>
                        Esta es la base para la creación de cualquier nicho. Define la estructura de 15 secciones modulares,
                        las reglas de diseño anti-infoproducto, los principios de psicología de conversión y la directiva técnica
                        que toda página de producto debe seguir para maximizar autoridad y ventas.
                    </p>
                </div>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: 6 }}>
                {[
                    { key: 'sections' as const, label: '15 Secciones', icon: Layers, count: 15 },
                    { key: 'principles' as const, label: 'Principios de Diseño', icon: Brain, count: 6 },
                    { key: 'prompt' as const, label: 'Prompt Maestro', icon: ScrollText, count: null },
                    { key: 'presentation' as const, label: 'Presentación', icon: Presentation, count: 15 },
                ].map(t => (
                    <button key={t.key} onClick={() => setActiveTab(t.key)} style={{
                        display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px',
                        borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s',
                        background: activeTab === t.key ? 'rgba(99,102,241,0.12)' : 'rgba(255,255,255,0.02)',
                        border: `1px solid ${activeTab === t.key ? 'rgba(99,102,241,0.25)' : 'rgba(255,255,255,0.06)'}`,
                        color: activeTab === t.key ? '#fff' : 'rgba(255,255,255,0.4)',
                    }}>
                        <t.icon size={14} />
                        {t.label}
                        {t.count && (
                            <span style={{
                                padding: '1px 7px', borderRadius: 12, fontSize: 10, fontWeight: 800,
                                background: activeTab === t.key ? 'rgba(99,102,241,0.25)' : 'rgba(255,255,255,0.05)',
                            }}>{t.count}</span>
                        )}
                    </button>
                ))}
            </div>

            {/* Content */}
            {activeTab === 'sections' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {/* Flow indicator */}
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px',
                        borderRadius: 10, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)',
                        marginBottom: 8,
                    }}>
                        <Eye size={14} style={{ color: 'rgba(255,255,255,0.3)' }} />
                        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', fontWeight: 600 }}>
                            Flujo de arriba a abajo. Cada sección es un módulo visual independiente. Click para expandir documentación.
                        </span>
                    </div>
                    {SECTIONS.map((s, i) => (
                        <SectionCard key={s.id} section={s} index={i} />
                    ))}
                </div>
            )}

            {activeTab === 'principles' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 12 }}>
                    {PRINCIPLES.map((p, i) => (
                        <PrincipleCard key={i} principle={p} />
                    ))}
                </div>
            )}

            {activeTab === 'prompt' && (
                <RawDirectiveView />
            )}

            {activeTab === 'presentation' && (
                <PresentationTab />
            )}
        </div>
    );
}