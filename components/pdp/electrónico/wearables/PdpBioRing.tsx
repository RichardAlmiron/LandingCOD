'use client';
import React, { useState } from 'react';
import { StoreData, Product } from '@/lib/types';
import EnhancedProductGallery from '@/components/pdp/EnhancedProductGallery';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { data: StoreData; product: Product; }

const PdpBioRing: React.FC<Props> = ({ data, product }) => {
    const [openSpecAcc, setOpenSpecAcc] = useState<number | null>(0);
    const [faqOpen, setFaqOpen] = useState<number | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const ai = product.aiContent;
    const fmtPrice = (n: number) => { const s = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); return `Gs. ${s}`; };
    
    // Aesthetic Palette: Medical Grade Luxury / Zen
    const bg = '#FAFAFA'; // Titanium White
    const textMain = '#1A1A24'; // Deep cool grey
    const textMuted = '#9CA3AF'; // Cool Gray 400
    const accentSilver = '#E5E7EB'; // Platinum/Silver for borders
    const accentBio = '#0EA5E9'; // Sky blue for biometric pulses

    return (
        <div style={{ background: bg, color: textMain, fontFamily: "'Outfit', 'Inter', sans-serif" }} className="overflow-x-hidden selection:bg-[#0EA5E9]/20 antialiased relative">
            
            {/* 0. AMBIENT BIOMETRIC PULSE */}
            <div className="fixed top-[-20%] right-[-10%] w-[80vw] h-[80vw] border-[1px] border-[#0EA5E9]/5 rounded-full pointer-events-none z-0 animate-[ping_8s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
            <div className="fixed top-[-10%] right-[0%] w-[60vw] h-[60vw] border-[1px] border-[#0EA5E9]/10 rounded-full pointer-events-none z-0 animate-[ping_6s_cubic-bezier(0,0,0.2,1)_infinite]"></div>

            {/* 1. TOP NAV */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[#E5E7EB]">
                <div className="max-w-7xl mx-auto px-6 md:px-10 py-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <svg className="text-[#0EA5E9]" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                        <span className="text-xl font-bold tracking-tight text-[#1A1A24]">Aura<span className="font-light">Med</span></span>
                    </div>
                    <nav className="hidden lg:flex gap-10">
                        {['Sensores', 'Sueño', 'Ciencia'].map((item) => (
                            <a key={item} href={`#${item.toLowerCase()}`} className="text-xs font-semibold tracking-widest uppercase text-[#9CA3AF] hover:text-[#1A1A24] transition-colors">
                                {item}
                            </a>
                        ))}
                    </nav>
                </div>
            </header>

            <main className="relative z-10">
                {/* 2. BREADCRUMBS & MICRO-LOGISTICS */}
                <div className="max-w-7xl mx-auto px-6 md:px-10 pt-10 pb-4">
                    <div className="flex flex-wrap items-center justify-between gap-4 font-semibold text-[10px] uppercase tracking-widest text-[#9CA3AF]">
                        <div className="flex items-center gap-2">
                            <span>Laboratorio</span> <span className="text-[#E5E7EB]">/</span> <span>Biometría</span> <span className="text-[#E5E7EB]">/</span> <span className="text-[#1A1A24]">{product.title.substring(0, 15)}...</span>
                        </div>
                        <div className="flex items-center gap-2 border border-[#0EA5E9]/20 bg-[#0EA5E9]/5 px-4 py-2 text-[#0EA5E9] rounded-full">
                            Despacho Clínico en 24H
                        </div>
                    </div>
                </div>

                {/* 3. HERO SECTION */}
                <div className="max-w-7xl mx-auto px-6 md:px-10 py-10 lg:py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5, ease: "easeOut" }} className="relative bg-white rounded-[3rem] p-10 shadow-[0_30px_60px_rgba(0,0,0,0.03)] border border-[#F3F4F6]">
                            <EnhancedProductGallery product={product} accentColor={accentBio} />
                            {/* Inner ring gradient to imply scanning */}
                            <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] border-4 border-transparent border-t-[#0EA5E9]/20 rounded-full animate-spin pointer-events-none" style={{ animationDuration: '4s' }}></div>
                        </motion.div>

                        <div className="flex flex-col relative pt-4">
                            {/* Rating */}
                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex text-[#F59E0B]">
                                    {[...Array(5)].map((_,i) => <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
                                </div>
                                <span className="text-[11px] font-bold text-[#9CA3AF] tracking-widest uppercase">Aval Médico (12k Evaluaciones)</span>
                            </div>
                            
                            <h1 className="text-4xl md:text-6xl font-light tracking-tight leading-[1.05] mb-6 text-[#1A1A24]">
                                {ai?.enhancedTitle || product.title}
                            </h1>
                            <p className="text-sm md:text-base font-normal text-[#6B7280] mb-12 leading-relaxed border-l-[3px] border-[#0EA5E9] pl-6">
                                {ai?.enhancedDescription || product.description || 'Conoce tu cuerpo antes de que él te hable. Titanio de grado médico, sensores infrarrojos de flujo sanguíneo y monitoreo de sueño REM. La salud, en tu dedo.'}
                            </p>

                            <div className="bg-white border text-center md:text-left border-[#F3F4F6] p-8 md:p-10 rounded-3xl mb-8 shadow-sm">
                                <div className="flex flex-col md:flex-row items-center md:items-end gap-6 mb-8 justify-center md:justify-start">
                                    <span className="text-4xl md:text-5xl font-light tracking-tight text-[#1A1A24]">{fmtPrice(product.price)}</span>
                                    {product.originalPrice && <span className="text-lg font-normal text-[#9CA3AF] line-through pb-1">{fmtPrice(product.originalPrice)}</span>}
                                </div>
                                <button onClick={() => document.getElementById('checkout-ring')?.scrollIntoView({ behavior: 'smooth' })} className="w-full h-[64px] bg-[#1A1A24] text-white font-bold uppercase tracking-widest text-sm rounded-2xl hover:bg-[#0EA5E9] hover:shadow-[0_15px_30px_rgba(14,165,233,0.2)] transition-all flex items-center justify-center gap-3">
                                    Adquirir Tecnología
                                </button>
                            </div>

                            {/* 4. TRUST BADGES */}
                            <div className="flex flex-wrap font-semibold text-[10px] uppercase tracking-widest text-[#9CA3AF] gap-6 justify-center md:justify-start">
                                <span className="flex items-center gap-1.5"><svg className="text-[#0EA5E9]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> Garantía de Devolución</span>
                                <span className="flex items-center gap-1.5"><svg className="text-[#0EA5E9]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> Pago a Contraentrega</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 5. ABOVE FOLD DETAILS (ACCORDIONS) */}
                <div className="max-w-7xl mx-auto px-6 md:px-10 pb-20">
                    <div className="border border-[#E5E7EB] bg-white rounded-[2rem] overflow-hidden shadow-sm">
                        {[
                            { t: 'Composición Material', a: 'Capa externa de Titanio Forjado PVD (Resistente a rayaduras). Capa interna de resina hipoalergénica de grado quirúrgico sin imperfecciones.' },
                            { t: 'Placa de Sensores Ópticos', a: 'LEDs verdes para frecuencia cardíaca continua, LEDs rojos para oxígeno sanguíneo (SpO2) y NTC para temperatura epidérmica.' },
                            { t: 'Seguridad Financiera y Envío', a: 'Protegemos tu tranquilidad financiera tanto como tu salud. Recibe el estuche en tu casa y abona exactamente al recibirlo en tus manos.' }
                        ].map((ac, i) => (
                            <div key={i} className="border-b border-[#F3F4F6] last:border-b-0">
                                <button onClick={() => setOpenSpecAcc(openSpecAcc===i?null:i)} className="w-full text-left px-10 py-6 flex items-center justify-between font-bold uppercase text-[11px] tracking-widest text-[#1A1A24] hover:bg-[#F9FAFB] transition-colors">
                                    {ac.t} 
                                    <svg className={`w-5 h-5 text-[#0EA5E9] transition-transform ${openSpecAcc===i?'rotate-180':''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 9l-7 7-7-7"/></svg>
                                </button>
                                <AnimatePresence>
                                    {openSpecAcc === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-10 pb-8 pt-2 text-[13px] font-normal text-[#6B7280] leading-relaxed">
                                            {ac.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 6. ENDLESS MARQUEE */}
                <div className="w-[100vw] overflow-hidden py-5 bg-white border-y border-[#E5E7EB] relative left-[50%] -translate-x-[50%]">
                    <div className="flex whitespace-nowrap animate-marquee font-bold uppercase text-xs tracking-[0.4em] text-[#1A1A24]">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="flex items-center gap-12 px-6">
                                <span>7 DÍAS DE BATERÍA</span><span className="text-[#0EA5E9]">/</span>
                                <span>WATERPROOF 100M</span><span className="text-[#0EA5E9]">/</span>
                                <span>MONITOREO DE ESTRÉS HR</span><span className="text-[#0EA5E9]">/</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 7. WHY TO USE / BENEFITS */}
                <div id="sensores" className="max-w-7xl mx-auto px-6 md:px-10 py-24">
                    <h2 className="text-3xl md:text-5xl font-light tracking-tight mb-20 text-center">Un laboratorio en <span className="text-[#0EA5E9] font-medium">3 gramos.</span></h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { ic: 'M22 12h-4l-3 9L9 3l-3 9H2', t: 'Ritmo Basal', d: 'Mientras descansas, el anillo mide tu Variabilidad de Frecuencia Cardíaca (VFC). Sabrás con precisión científica si estás listo para entrenar o debes descansar.' },
                            { ic: 'M2 12h4l3-9 5 18 3-9h5', t: 'Oxigenación (SpO2)', d: 'Tu nivel de oxígeno en sangre es vital. El visor LED arroja haces rojos capaces de leer el flujo capilar de los dedos con superior fidelidad a la muñeca.' },
                            { ic: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z', t: 'Impermeable', d: 'Forjado con recubrimiento PVD en cámaras al vacío. Báñate, nada en el mar, ve a la sauna. No debes quitártelo jamás.' }
                        ].map((b, i) => (
                            <div key={i} className="bg-white border border-[#E5E7EB] p-12 rounded-[2rem] relative text-center hover:-translate-y-2 transition-transform shadow-sm">
                                <div className="w-16 h-16 rounded-full bg-[#0EA5E9]/10 text-[#0EA5E9] mx-auto flex items-center justify-center mb-8">
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={b.ic}/></svg>
                                </div>
                                <h3 className="text-lg font-bold tracking-widest uppercase mb-4 text-[#1A1A24]">{b.t}</h3>
                                <p className="text-sm font-normal text-[#6B7280] leading-relaxed">{b.d}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 8. HOW TO USE (VISUAL GUIDE) */}
                <div id="ciencia" className="bg-white py-32 border-y border-[#E5E7EB] relative overflow-hidden">
                    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#0EA5E9]/30 to-transparent"></div>
                    <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
                        <div className="text-center mb-24">
                            <span className="text-[10px] font-bold text-[#0EA5E9] uppercase tracking-[0.3em]">Protocolo de Inicio</span>
                            <h2 className="text-4xl font-light text-[#1A1A24] tracking-tight mt-4">Integración Invisible.</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
                            {[
                                { s: '1', t: 'Calibra', d: 'Conecta el anillo a su dock imantado de bambú. Descarga nuestra app iOS/Android y vincula vía Bluetooth LE en segundos.' },
                                { s: '2', t: 'Olvida', d: 'Póntelo en el índice o dedo corazón y vive tu vida. La batería microscópica dura una semana completa sin requerir tu atención.' },
                                { s: '3', t: 'Descifra', d: 'Abre la app al despertar. Desmenuzará tu noche en métricas: Sueño Ligero, Profundo, REM y tu Índice de Recuperación.' }
                            ].map((s, i) => (
                                <div key={i} className="flex flex-col items-center justify-center text-center relative bg-white px-6">
                                    <div className="w-16 h-16 bg-white border border-[#0EA5E9] rounded-2xl flex items-center justify-center mb-8 shadow-[0_10px_20px_rgba(14,165,233,0.15)] transform rotate-45">
                                        <div className="text-xl font-medium text-[#0EA5E9] transform -rotate-45">{s.s}</div>
                                    </div>
                                    <h4 className="text-sm font-bold uppercase tracking-widest mb-4 text-[#1A1A24]">{s.t}</h4>
                                    <p className="text-[13px] text-[#6B7280] font-normal leading-relaxed">{s.d}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 9. DEEP DIVE MULTIMEDIA */}
                <div className="py-32 relative flex flex-col items-center justify-center min-h-[50vh]">
                    <div className="max-w-4xl px-6 bg-white p-12 md:p-20 rounded-[3rem] border border-[#E5E7EB] shadow-[0_40px_80px_rgba(0,0,0,0.04)] text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#0EA5E9]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        <h2 className="text-3xl md:text-5xl font-light tracking-tight mb-8 text-[#1A1A24]">Diseccionando tu Descanso.</h2>
                        <p className="text-[15px] font-normal text-[#6B7280] leading-relaxed mb-0">Un SmartWatch clásico interrumpe tu sueño al emitir calor, peso o notificaciones fantasma. Hemos compactado el poder de diagnóstico de una clínica del sueño en una alianza suave, insonora e incansable que rastrea la alteración de tu temperatura basal para predecir si vas a enfermar mañana.</p>
                    </div>
                </div>

                {/* 10. COMPARISON TABLE */}
                <div className="max-w-5xl mx-auto px-6 md:px-10 py-20">
                    <h2 className="text-3xl font-light tracking-tight text-center mb-16 text-[#1A1A24]">Análisis de Mercado.</h2>
                    <div className="bg-white border text-sm border-[#E5E7EB] rounded-3xl overflow-hidden shadow-sm">
                        <div className="grid grid-cols-3 border-b border-[#F3F4F6] p-8 bg-[#F9FAFB]">
                            <div className="text-[10px] font-bold uppercase tracking-widest text-[#9CA3AF]">Funcionalidad</div>
                            <div className="text-xs font-bold uppercase tracking-widest text-[#0EA5E9] text-center">Nuestra Matriz Viva</div>
                            <div className="text-[10px] font-bold uppercase tracking-widest text-[#9CA3AF] text-center">Relojes SmartWatch</div>
                        </div>
                        {[
                            { k: 'Exactitud Pulsaciones (Descanso)', u: 'Rastreo Capilar 99.1% Fiel', t: 'Desfase por fricción en muñeca' },
                            { k: 'Comodidad Nocturna', u: 'Dormís sin darte cuenta', t: 'Incomodan y raspan sábanas' },
                            { k: 'Duración Energética', u: 'Hasta 7 días ininterrumpidos', t: 'Menos de 24 horas' },
                            { k: 'Desviación de Uso', u: 'Puro Hardware de Salud', t: 'Distractor lleno de notificaciones' }
                        ].map((r, i) => (
                            <div key={i} className="grid grid-cols-3 p-8 border-b border-[#F3F4F6] last:border-b-0 hover:bg-[#F9FAFB] transition-colors">
                                <div className="text-xs font-bold text-[#1A1A24] uppercase tracking-wider">{r.k}</div>
                                <div className="text-center font-bold text-[#0EA5E9] text-[13px]">{r.u}</div>
                                <div className="text-center font-normal line-through text-[#9CA3AF] text-[13px]">{r.t}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 11. RISK REVERSAL WARRANTY */}
                <div className="max-w-5xl mx-auto px-6 md:px-10 py-16">
                    <div className="bg-white border border-[#E5E7EB] p-10 md:p-16 rounded-[3rem] shadow-[0_20px_40px_rgba(0,0,0,0.03)] flex flex-col md:flex-row items-center gap-12 text-center md:text-left">
                        <div className="w-24 h-24 bg-[#F9FAFB] border border-[#E5E7EB] rounded-full flex flex-shrink-0 items-center justify-center pointer-events-none">
                            <span className="text-[#0EA5E9] font-light text-5xl">🛡</span>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold tracking-tight mb-4 text-[#1A1A24]">Salud libre de tensión financiera.</h3>
                            <p className="text-[14px] font-normal leading-relaxed text-[#6B7280]">Realizamos nuestro protocolo logístico libre de contacto financiero digital. Llenas tu hoja médica, enviamos el anillo a tu localización, y simplemente abonas el exacto importe en efectivo o transferencia rápida directo a nuestro asociado de courier. Garantía base de 12 meses frente a fallo de batería o sensores.</p>
                        </div>
                    </div>
                </div>

                {/* 12. BRAND ETHOS */}
                <div className="py-32 border-y border-[#E5E7EB] mt-12 px-6 bg-white text-center">
                    <div className="max-w-3xl mx-auto">
                        <h3 className="text-4xl md:text-5xl font-light tracking-tight mb-8 text-[#1A1A24]">El conocimiento<br/>es cura retrospectiva.</h3>
                        <p className="text-[15px] font-normal text-[#6B7280] leading-relaxed">No puedes mejorar la fatiga si no sabes medir en qué fase del sueño profundo sufres interrupciones. Abogamos por un futurismo biológico pacífico: empoderamos a humanos comunes a descifrar su cuerpo con la exactitud técnica de deportistas olímpicos, todo encapsulado en una joya minimalista.</p>
                    </div>
                </div>

                {/* 13. FAQ */}
                <div id="faq" className="max-w-3xl mx-auto px-6 md:px-10 py-32">
                    <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-center mb-16 text-[#0EA5E9]">Preguntas Clínicas</h2>
                    <div className="space-y-4">
                        {[
                            {q: '¿Cómo sé mi talla de anillo correcta?', a: 'El anillo viene en medidas de joyería estándar (Size 6 a 13). Si no sabes tu talla, al contactarte para despachar, nuestro asesor te ayudará a medir la circunferencia de tu dedo con un cartón o papel de forma perfecta.'},
                            {q: '¿Se requiere pagar suscripción mensual en la APP?', a: 'Cero cuotas ocultas. Compras el hardware y los paneles de salud de la App se quedan desbloqueados de por vida para leer todas tus estadísticas orgánicas sin paywalls absurdos.'},
                            {q: '¿Cómo procedo a solicitar la compra?', a: 'Llena tu identidad y ubicación en el apartado inferior. Procesaremos el pedimento, agendaremos el Courier en 24H y pagas únicamente al testear la caja hermética en tu presencia.'}
                        ].map((f, i) => (
                            <div key={i} className="bg-white border border-[#E5E7EB] rounded-2xl">
                                <button onClick={() => setFaqOpen(faqOpen===i?null:i)} className="w-full text-left py-6 px-8 flex items-center justify-between font-bold text-[13px] tracking-wider uppercase text-[#1A1A24] hover:text-[#0EA5E9] transition-colors">
                                    <span>{f.q}</span>
                                    <svg className={`w-4 h-4 text-[#0EA5E9] transition-transform ${faqOpen===i?'rotate-180':''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 9l-7 7-7-7"/></svg>
                                </button>
                                <AnimatePresence>
                                    {faqOpen === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-8 pb-8 text-[13.5px] font-normal text-[#6B7280] leading-relaxed">
                                            {f.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 14. EXPANDED REVIEWS (UGC) */}
                <div className="max-w-7xl mx-auto px-6 md:px-10 py-24 border-t border-[#E5E7EB]">
                    <div className="text-center mb-20">
                        <div className="flex justify-center text-[#F59E0B] mb-4">
                            {[...Array(5)].map((_,i) => <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>)}
                        </div>
                        <h2 className="text-3xl font-light tracking-tight text-[#1A1A24] mb-2">Cuaderno de Bitácora.</h2>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#9CA3AF]">Retroalimentaciones Verificadas</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { r: "Llevo tres meses. Aprendí que tomar alcohol un marte destruye mis pulsos REM por dos días enteros. Esta pieza de biotecnología ha cambiado totalmente cómo me alimento y descanso.", n: "Camila E.", t: "Biohacker" },
                            { r: "No soporto dormir con relojes enganchados apretando la muñeca. De este ni te acuerdas que lo llevas puesto. La alerta de temperatura fue clave, detectó que tendría fiebre un día antes.", n: "Ignacio F.", t: "Emprendedor" },
                            { r: "Compré dudosa porque odio poner tarjetas. Literal completé a la mañana, a la tarde llegó a mi vereda, verifiqué y le pagué al chico en billetes. Brutalmente fácil y seguro y sin estrés.", n: "Susana L.", t: "Directora Creativa" }
                        ].map((rev, i) => (
                            <div key={i} className="bg-[#F9FAFB] border border-[#F3F4F6] p-10 rounded-[2rem]">
                                <p className="text-[14px] font-normal text-[#6B7280] leading-relaxed italic mb-8 relative z-10">"{rev.r}"</p>
                                <div className="border-t border-[#E5E7EB] pt-6 flex justify-between items-center">
                                    <div>
                                        <div className="font-bold text-[11px] uppercase tracking-widest text-[#1A1A24]">{rev.n}</div>
                                        <div className="text-[10px] font-normal text-[#9CA3AF] uppercase mt-1">{rev.t}</div>
                                    </div>
                                    <div className="w-8 h-8 flex items-center justify-center font-bold text-[#0EA5E9] text-sm tracking-widest">
                                        ✓
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 15. CHECKOUT */}
                <div id="checkout-ring" className="py-24 md:py-32 bg-[#F9FAFB] relative border-t border-[#E5E7EB] mt-10">
                    <div className="max-w-4xl mx-auto px-6 md:px-10 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
                        <div className="md:col-span-5 text-center md:text-left">
                            <div className="text-[#0EA5E9] font-bold uppercase text-[10px] tracking-widest mb-6 border border-[#0EA5E9]/20 bg-[#0EA5E9]/5 inline-block px-4 py-1.5 rounded-full">
                                Terminal Quirúrgica
                            </div>
                            <h3 className="text-4xl md:text-5xl font-light tracking-tight mb-6 text-[#1A1A24]">Control Total.</h3>
                            <p className="text-[15px] font-normal text-[#6B7280] mb-8 leading-relaxed">Paga directamente en físico con el personal de logística. Cero adelantos.</p>
                            <div className="text-4xl font-light text-[#1A1A24]">{fmtPrice(product.price)}</div>
                        </div>
                        <div className="md:col-span-7">
                            <form className="bg-white border border-[#E5E7EB] p-10 md:p-12 rounded-[2.5rem] shadow-[0_20px_40px_rgba(0,0,0,0.02)]" onSubmit={e=>e.preventDefault()}>
                                <h4 className="text-lg font-bold tracking-tight mb-8 text-[#1A1A24] border-b border-[#F3F4F6] pb-6">Expediente Táctico</h4>
                                <div className="space-y-5">
                                    <input type="text" className="w-full bg-[#F9FAFB] border border-[#E5E7EB] focus:border-[#0EA5E9] focus:bg-white text-[#1A1A24] font-medium text-sm px-6 py-5 outline-none transition-all rounded-2xl" placeholder="Nombre Oficial del Receptor" />
                                    <input type="tel" className="w-full bg-[#F9FAFB] border border-[#E5E7EB] focus:border-[#0EA5E9] focus:bg-white text-[#1A1A24] font-medium text-sm px-6 py-5 outline-none transition-all rounded-2xl" placeholder="Número de Enlace Móvil" />
                                    <textarea rows={2} className="w-full bg-[#F9FAFB] border border-[#E5E7EB] focus:border-[#0EA5E9] focus:bg-white text-[#1A1A24] font-medium text-sm px-6 py-5 outline-none transition-all resize-none rounded-2xl" placeholder="Coordenadas Médicas (Dirección en Mapa)" />
                                    <div className="pt-6">
                                        <button className="w-full h-[70px] bg-[#1A1A24] text-white font-bold uppercase tracking-widest text-[13px] rounded-2xl hover:bg-[#0EA5E9] transition-all shadow-[0_15px_30px_rgba(14,165,233,0.15)] flex items-center justify-center gap-2">
                                            Confirmar Retiro
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </main>

            {/* STICKY MOBILE CTA */}
            <div className="md:hidden fixed bottom-6 left-4 right-4 z-50">
                <div className="bg-white border border-[#E5E7EB] p-4 rounded-2xl flex items-center justify-between shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
                    <div className="pl-2">
                        <div className="text-[10px] font-bold uppercase text-[#9CA3AF] tracking-widest">Inversión Final</div>
                        <div className="font-light text-[#1A1A24] text-xl leading-none mt-1">{fmtPrice(product.price)}</div>
                    </div>
                    <button onClick={() => document.getElementById('checkout-ring')?.scrollIntoView({ behavior: 'smooth' })} className="bg-[#1A1A24] text-white rounded-xl px-8 py-4 font-bold uppercase tracking-widest text-[11px]">
                        Pedir
                    </button>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{__html: `
                @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
                .animate-marquee { animation: marquee 20s linear infinite; }
            `}} />
        </div>
    );
};

export default PdpBioRing;
