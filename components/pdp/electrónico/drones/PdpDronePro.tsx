'use client';
import React, { useState } from 'react';
import { StoreData, Product } from '@/lib/types';
import EnhancedProductGallery from '@/components/pdp/EnhancedProductGallery';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { data: StoreData; product: Product; }

const PdpDronePro: React.FC<Props> = ({ data, product }) => {
    const [faqOpen, setFaqOpen] = useState<number | null>(null);
    const ai = product.aiContent;
    const fmtPrice = (n: number) => { const s = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); return `Gs. ${s}`; };

    // Estética "Airborne Dark": Inspirado en aviónica y displays HUD tácticos.
    const bg = '#060a0f'; // Very dark blue/slate
    const textMain = '#e2e8f0'; // Slate 200
    const accent = '#38bdf8'; // Sky 400
    const accentDark = '#0284c7'; // Sky 600

    return (
        <div style={{ background: bg, color: textMain }} className="font-mono antialiased overflow-x-hidden selection:bg-sky-500/30">
            {/* Ambient Background Grid (Radar vibe) */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sky-900/10 rounded-full blur-[100px]"></div>
            </div>

            {/* 1. TOP NAV (Avionics Header) */}
            <header className="sticky top-0 z-50 bg-[#060a0f]/80 backdrop-blur-md border-b border-sky-400/20">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 flex items-center justify-center border border-sky-400/50 text-sky-400">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 7l10 5 10-5-10-5zm0 10l-10 5 10 5 10-5-10-5z"/></svg>
                        </div>
                        <span className="text-sm font-bold tracking-[0.2em] uppercase text-white">SKY<span className="text-sky-400">COMMAND</span></span>
                    </div>
                </div>
            </header>

            <main className="relative z-10 w-full overflow-hidden">
                {/* 2. BREADCRUMBS & LOGISTICS (Tactical readout) */}
                <div className="max-w-7xl mx-auto px-4 pt-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-4">
                        <div className="text-[10px] uppercase tracking-[0.3em] text-slate-500">
                            SYS / DRONES / <span className="text-sky-400">PRO-CAPTURE</span>
                        </div>
                        <div className="inline-flex items-center gap-2 text-[9px] uppercase tracking-widest text-sky-400 bg-sky-900/20 px-3 py-1.5 border border-sky-500/20">
                            <span className="w-1.5 h-1.5 bg-sky-400 animate-pulse"></span>
                            Despacho COD Habilitado
                        </div>
                    </div>
                </div>

                {/* 3. HERO (EDITORIAL WITH HUD ELEMENTS) */}
                <div className="max-w-7xl mx-auto px-4 py-12 lg:py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="relative z-20">
                            {/* HUD Crosshair Top-Left */}
                            <div className="absolute -top-10 -left-6 w-8 h-8 border-t-2 border-l-2 border-sky-400/30"></div>
                            
                            <h1 className="text-5xl md:text-7xl font-light tracking-tighter text-white mb-6 uppercase">
                                {ai?.enhancedTitle || product.title}
                            </h1>
                            <p className="text-sm md:text-base text-slate-400 mb-10 leading-relaxed font-sans max-w-lg">
                                {ai?.enhancedDescription || product.description || 'Domina los cielos con la óptica capturadora definitiva. Vuelo inteligente, esquiva de obstáculos 360° y transmisión cinemática sin pérdidas. El nivel profesional en tus manos.'}
                            </p>
                            
                            <div className="border border-white/10 bg-white/5 p-8 relative backdrop-blur-sm group">
                                <div className="absolute top-0 right-0 p-2 text-[8px] text-sky-400 tracking-widest">STATUS: IN-STOCK</div>
                                <div className="flex items-end gap-6 mb-8">
                                    <span className="text-4xl font-light text-white tracking-tight">{fmtPrice(product.price)}</span>
                                    {product.originalPrice && <span className="text-lg text-slate-500 line-through pb-1 decoration-sky-500/50">{fmtPrice(product.originalPrice)}</span>}
                                </div>
                                <button onClick={() => document.getElementById('checkout-target')?.scrollIntoView({ behavior: 'smooth' })} className="w-full bg-sky-500 text-black py-4 uppercase font-bold tracking-[0.2em] text-xs hover:bg-sky-400 transition-colors shadow-[0_0_20px_rgba(56,189,248,0.3)] group-hover:shadow-[0_0_30px_rgba(56,189,248,0.5)]">
                                    Desplegar Unidad
                                </button>
                                <div className="text-[10px] text-center text-slate-400 uppercase tracking-widest mt-4">
                                    Pago en Base Terrestre (COD)
                                </div>
                            </div>
                        </div>

                        <div className="w-full relative flex items-center justify-center">
                            {/* HUD Targeting Overlay over gallery */}
                            <div className="absolute inset-0 border border-sky-400/10 pointer-events-none z-10 flex items-center justify-center">
                                <div className="w-[80%] h-[80%] border border-sky-400/20 rounded-full opacity-50 border-dashed animate-spin-slow"></div>
                            </div>
                            <EnhancedProductGallery product={product} accentColor={accent} />
                        </div>
                    </div>
                </div>

                {/* 4. TRUST BADGES TECHNICAL (Telemetry Stats) */}
                <div className="border-y border-sky-400/10 bg-[#03060a]">
                    <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-sky-400/10">
                        {[
                            {v: '46 Min', l: 'Tiempo de Vuelo'},
                            {v: '15 Km', l: 'Transmisión HD'},
                            {v: 'APAS 5.0', l: 'Evasión IA'},
                            {v: 'Hasselblad', l: 'Óptica Sueca'}
                        ].map((b, i) => (
                            <div key={i} className="text-center px-4">
                                <div className="text-2xl lg:text-3xl text-sky-400 font-light mb-2">{b.v}</div>
                                <div className="text-[9px] uppercase tracking-widest text-slate-500 font-sans">{b.l}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 5. EXPERT ACCORDIONS (Data Logs) */}
                <div className="max-w-5xl mx-auto px-4 py-24">
                    <h2 className="text-xs text-sky-400 uppercase tracking-[0.3em] mb-8 flex items-center gap-4">
                        <span className="w-8 h-[1px] bg-sky-400"></span>
                        Archivos Secretos de Aviónica
                    </h2>
                    <div className="border-t border-sky-400/20">
                        {[
                            { t: 'SENSOR CMOS 4/3"', a: 'Rango dinámico de 12.8 pasos que retiene infinidad de detalles en sombras y luces, llevando su metraje nocturno a niveles cinematográficos sin ruido granulado.' },
                            { t: 'BATERÍA PROPULSORA', a: 'Celdas de iones de litio de alta densidad que permiten mantenerse estacionario y resistir vientos nivel 5. Menos tiempo aterrizando, más tiempo encuadrando.' },
                            { t: 'LOGÍSTICA INVISIBLE', a: 'Enviamos su aeronave en caja blindada a nivel nacional. La transacción se completa físicamente frente a usted para anular riesgos cibernéticos de pasarelas web.' }
                        ].map((ac, i) => (
                            <div key={i} className="border-b border-sky-400/20 group hover:bg-sky-400/5 transition-colors">
                                <button className="w-full py-8 px-4 flex gap-8 items-start text-left">
                                    <span className="text-sky-500 font-bold">0{i+1}</span>
                                    <div>
                                        <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-2 group-hover:text-sky-400 transition-colors">{ac.t}</h3>
                                        <p className="text-slate-400 font-light font-sans text-sm leading-relaxed">{ac.a}</p>
                                    </div>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 6. ENDLESS MARQUEE */}
                <div className="w-[100vw] overflow-hidden py-6 bg-sky-500 text-black relative left-[50%] -translate-x-[50%] flex transform">
                    <div className="flex whitespace-nowrap font-bold text-xs uppercase tracking-[0.3em]">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="flex items-center gap-10 px-8">
                                <span>SINCRONIZACIÓN SATELITAL</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-black"></span>
                                <span>COBERTURA TOTAL</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-black"></span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 7. WHY TO USE / BENEFITS (Visual Radar mapping) */}
                <div className="max-w-7xl mx-auto px-4 py-32 border-b border-sky-400/10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="relative p-12 flex items-center justify-center aspect-square border border-sky-400/20 rounded-full overflow-hidden">
                            <div className="absolute inset-0 bg-sky-400/5"></div>
                            {/* Radar sweep effect */}
                            <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0deg,rgba(56,189,248,0.1)_90deg,transparent_90deg)] animate-spin-slow origin-center"></div>
                            <div className="absolute w-[50%] h-[50%] border border-sky-400/30 rounded-full flex items-center justify-center">
                                <div className="text-sky-400 text-xs tracking-widest uppercase">Target Locked</div>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-3xl md:text-5xl font-light text-white mb-8">El final de los choques ciegos.</h2>
                            <p className="text-slate-400 font-sans leading-relaxed mb-12">Ocho sensores visuales agudos trabajan junto a un motor de computación visual de alto rendimiento para identificar con precisión los obstáculos en todas las direcciones y planificar una ruta de vuelo segura.</p>
                            
                            <div className="space-y-6">
                                {[
                                    { t: 'Return To Home Inteligente', d: 'En caso de pérdida de señal, calcula automáticamente el trayecto más seguro esquivando montañas y rascacielos.' },
                                    { t: 'ActiveTrack 5.0', d: 'Fija un objetivo en movimiento (vehículos o personas) y la cámara no lo soltará sin importar tu pericia de vuelo.' }
                                ].map((b, i) => (
                                    <div key={i} className="border border-sky-400/10 p-6 bg-[#03060a]">
                                        <h4 className="text-sky-400 uppercase tracking-widest text-xs font-bold mb-2">{b.t}</h4>
                                        <p className="text-slate-500 font-sans text-sm">{b.d}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 8. HOW TO USE / SET UP AESTHETIC */}
                <div className="py-24 bg-[url('https://images.unsplash.com/photo-1506744626753-149bf970cc52?q=80&w=2000')] bg-cover bg-center relative">
                    <div className="absolute inset-0 bg-[#060a0f]/90 backdrop-blur-sm"></div>
                    <div className="max-w-6xl mx-auto px-4 relative z-10">
                        <h2 className="text-2xl text-white font-light mb-16 text-center uppercase tracking-widest">Protocolo de Lanzamiento</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { s: 'Despliegue Físico', d: 'Extiende los brazos mecánicos hasta escuchar el seguro. Retira la cubierta del gimbal frontal.' },
                                { s: 'Link de Mando', d: 'Enciende el radiocontrol, presiona el encendido del dron. Vinculación Ocusync en 2 segundos.' },
                                { s: 'Despegue', d: 'Comando de despegue seguro y mantención estacionaria automática a 1 metro del suelo.' }
                            ].map((s, i) => (
                                <div key={i} className="p-8 border border-white/10 bg-black/50 backdrop-blur-md">
                                    <div className="text-4xl text-sky-500/30 font-bold mb-6">0{i+1}</div>
                                    <h4 className="text-white uppercase tracking-widest text-xs mb-4">{s.s}</h4>
                                    <p className="text-slate-400 font-sans text-sm">{s.d}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 10. COMPARISON TABLE */}
                <div className="max-w-4xl mx-auto px-4 py-32">
                    <div className="border border-sky-400/20 bg-[#03060a]">
                        <div className="grid grid-cols-3 border-b border-sky-400/20 text-[10px] uppercase tracking-[0.2em] font-bold text-sky-400">
                            <div className="p-6">Métrica</div>
                            <div className="p-6 text-white border-x border-sky-400/20 bg-sky-900/10">Nuestra Unidad</div>
                            <div className="p-6 text-slate-600">Drones Civiles Básicos</div>
                        </div>
                        {[
                            { k: 'Sensor de Imagen', u: 'CMOS 4/3 (Grado Cine)', t: 'CMOS 1/2.3"' },
                            { k: 'Resistencia a Viento', u: 'Nivel 5 (10.7 m/s)', t: 'Nivel 3' },
                            { k: 'Riesgo de Perderlo', u: 'Bajísimo (RTH Avanzado)', t: 'Alto (Flyaways)' },
                            { k: 'Método Adquisitivo', u: 'Pago COD (100% Seguro)', t: 'Tarjetas Web' }
                        ].map((r, i) => (
                            <div key={i} className="grid grid-cols-3 border-t border-white/5 font-sans text-sm">
                                <div className="p-6 text-slate-400 uppercase tracking-wider text-xs">{r.k}</div>
                                <div className="p-6 text-sky-300 font-medium border-x border-sky-400/20 bg-sky-900/10">{r.u}</div>
                                <div className="p-6 text-slate-600 flex items-center justify-center">- - -</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 11. RISK REVERSAL WARRANTY */}
                <div className="py-20 border-y border-sky-400/10 bg-sky-900/5">
                    <div className="max-w-4xl mx-auto px-4 text-center">
                        <div className="w-16 h-16 border border-sky-400/50 text-sky-400 rounded flex items-center justify-center mx-auto mb-6">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                        </div>
                        <h3 className="text-2xl text-white font-light tracking-widest uppercase mb-6">Escudo de Protección C.O.D.</h3>
                        <p className="text-slate-400 font-sans leading-relaxed max-w-2xl mx-auto text-sm">
                            Este es un equipo de alto valor. Entendemos tu preocupación por fraudes en internet. Entregamos el maletín sellado a tu ubicación y abonas el importe (efectivo o transferencia) frente al transportista logístico una vez verifiques la caja. Tu seguridad total es nuestra bandera.
                        </p>
                    </div>
                </div>

                {/* 12. BRAND ETHOS */}
                <div className="py-24 text-center border-b border-sky-400/10 px-4">
                    <h3 className="text-xl text-white font-light uppercase tracking-[0.3em] mb-4">Ingeniería que Eleva el Estándar.</h3>
                    <p className="text-slate-500 font-sans max-w-lg mx-auto text-sm">Convertimos creadores promedio en directores aéreos de élite mediante herramientas de aviación sin compromisos.</p>
                </div>

                {/* 13. FAQ */}
                <div className="max-w-3xl mx-auto px-4 py-24 border-b border-sky-400/10">
                    <h2 className="text-xl text-white uppercase tracking-widest mb-10">Briefing de Consultas</h2>
                    <div className="space-y-4">
                        {[
                            {q: '¿Preciso licencia especial para pilotarlo?', a: 'Según las regulaciones CIV, el peso e IA de esta aeronave le permite operarla bajo normativas VFR (Reglas de Vuelo Visual) sin brevets complejos para uso particular, aunque instamos a vuelo responsable.'},
                            {q: '¿Qué incluye realmente la versión que entregan?', a: 'Batería inteligente, radio de control con telemetría, cables OTG, palancas de repuesto, protector de gimbal y cargador portátil.'},
                            {q: '¿Cómo coordino el pago "En Base Terrestre"?', a: 'Generas la nota de despacho abajo. Nos contactamos por WhatsApp para acordar hora de vuelo de nuestro cadete. Recibes en tu ubicación y pagas presencialmente.'}
                        ].map((f, i) => (
                            <div key={i} className="border border-sky-400/20 bg-[#03060a]">
                                <button onClick={() => setFaqOpen(faqOpen===i?null:i)} className="w-full p-6 text-left flex justify-between items-center text-sky-200 uppercase tracking-widest text-[10px] font-bold hover:bg-sky-400/10 transition-colors">
                                    {f.q}
                                    <span className="text-sky-400 text-lg">{faqOpen===i?'-':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {faqOpen === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 pb-6 text-slate-400 font-sans text-sm leading-relaxed border-t border-sky-400/10 mt-2 pt-4">
                                            {f.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 14. EXPANDED REVIEWS */}
                <div className="py-24 bg-[#03060a]">
                    <div className="max-w-7xl mx-auto px-4">
                        <h2 className="text-lg text-sky-400 uppercase tracking-[0.3em] font-bold mb-16 text-center">Registros de Pilotaje.</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            {[
                                { r: "La estabilidad con ráfagas en la costa es absurda. Literalmente se queda clavado en el aire. El pago COD impecable, vino un chico hasta mi productora.", n: "Miguel Ángel", t: "Piloto" },
                                { r: "Pasé de un dron de juguete a esto y los colores que saca el sensor de la cámara en Atardecer no tienen descripción. Vale cada moneda.", n: "Sara V.", t: "Filmmaker" },
                                { r: "Logística seria. No solté un billete hasta revisar la caja precintada con los códigos QR de fábrica. Muy recomendados.", n: "Esteban F.", t: "Corredor" }
                            ].map((rev, i) => (
                                <div key={i} className="p-8 border border-white/5 bg-[#060a0f] relative group hover:border-sky-400/30 transition-colors">
                                    <div className="absolute top-0 left-0 w-2 h-full bg-sky-500/20 group-hover:bg-sky-400 transition-colors"></div>
                                    <p className="text-slate-400 font-sans text-sm mb-8 leading-relaxed">"{rev.r}"</p>
                                    <div className="text-white uppercase text-[10px] tracking-widest mb-1">{rev.n}</div>
                                    <div className="text-sky-400 text-[9px] uppercase tracking-[0.2em]">{rev.t}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 15. CHECKOUT */}
                <div id="checkout-target" className="py-24 md:py-32 relative overflow-hidden border-t border-sky-400/20">
                    {/* Background graphic */}
                    <div className="absolute inset-0 bg-sky-900/5"></div>
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#03060a] to-transparent"></div>
                    
                    <div className="max-w-6xl mx-auto px-4 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16">
                        <div>
                            <span className="text-sky-400 text-[10px] uppercase tracking-[0.3em] mb-4 block">Autorización de Vuelo</span>
                            <h2 className="text-4xl lg:text-5xl font-light text-white mb-6 uppercase">Coordenadas de <br/><span className="text-sky-400 font-bold">Despacho.</span></h2>
                            <p className="text-slate-400 font-sans mb-10 max-w-md">Llene este manifiesto para asegurar el stock de la aeronave en nuestro último cargamento. Usted pagará frente a frente cuando el envío llegue a su base.</p>
                            <div className="text-5xl font-light text-white tracking-widest">{fmtPrice(product.price)}</div>
                        </div>
                        
                        <div className="border border-sky-400/30 bg-[#03060a]/90 backdrop-blur-xl p-8 lg:p-12 shadow-[0_0_50px_rgba(56,189,248,0.1)] relative">
                            {/* Decorative HUD corners */}
                            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-sky-400"></div>
                            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-sky-400"></div>
                            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-sky-400"></div>
                            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-sky-400"></div>

                            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                                <div>
                                    <label className="text-[9px] uppercase tracking-widest text-sky-400 mb-2 block">Nombre Piloto / Receptor</label>
                                    <input type="text" className="w-full bg-white/5 border border-white/10 text-white font-sans text-sm p-4 focus:border-sky-400 focus:bg-sky-400/5 outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="text-[9px] uppercase tracking-widest text-sky-400 mb-2 block">Señal Telefónica Celular</label>
                                    <input type="tel" className="w-full bg-white/5 border border-white/10 text-white font-sans text-sm p-4 focus:border-sky-400 focus:bg-sky-400/5 outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="text-[9px] uppercase tracking-widest text-sky-400 mb-2 block">Coordenadas Domicilio Terrestre</label>
                                    <textarea rows={2} className="w-full bg-white/5 border border-white/10 text-white font-sans text-sm p-4 focus:border-sky-400 focus:bg-sky-400/5 outline-none transition-all resize-none"></textarea>
                                </div>
                                <button className="w-full bg-sky-500 text-black uppercase font-bold tracking-[0.2em] py-5 mt-4 hover:bg-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
                                    Emitir Orden C.O.D.
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
};

export default PdpDronePro;
