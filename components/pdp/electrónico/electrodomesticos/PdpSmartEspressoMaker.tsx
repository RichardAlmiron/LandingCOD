'use client';
import React, { useState } from 'react';
import { StoreData, Product } from '@/lib/types';
import EnhancedProductGallery from '@/components/pdp/EnhancedProductGallery';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { data: StoreData; product: Product; }

const PdpSmartEspressoMaker: React.FC<Props> = ({ data, product }) => {
    const [faqOpen, setFaqOpen] = useState<number | null>(null);
    const ai = product.aiContent;
    const fmtPrice = (n: number) => { const s = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); return `Gs. ${s}`; };

    // Estética "Barista Morning Steel": Grises metálicos cepillados (Steel), dorados/ámbar (Warm morning light) y oscuros marrón café.
    const bg = '#11100e'; // Off-black dark brown/espresso hue
    const textMain = '#a8a29e'; // Stone 400
    const accent = '#d97706'; // Amber 600

    return (
        <div style={{ background: bg, color: textMain }} className="font-serif antialiased overflow-x-hidden selection:bg-amber-700 selection:text-white">
            
            {/* Ambient Morning Steam / Heat */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 right-0 w-[60vw] h-[60vh] bg-amber-600/5 rounded-full blur-[150px] mix-blend-screen opacity-60"></div>
                {/* Brushed steel texture overlay */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')] opacity-[0.03] mix-blend-overlay"></div>
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent opacity-80"></div>
            </div>

            {/* 1. TOP NAV (Barista Badge) */}
            <header className="sticky top-0 z-50 bg-[#11100e]/90 backdrop-blur-md border-b border-amber-900/30">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="text-xl font-bold tracking-widest text-stone-100 uppercase flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full border border-amber-600/50 flex items-center justify-center p-1">
                            <span className="w-full h-full rounded-full border border-amber-500/20 bg-amber-900/10"></span>
                        </div>
                        EXTRACCIÓN<span className="font-light text-amber-600">PURA</span>
                    </div>
                </div>
            </header>

            <main className="relative z-10 w-full overflow-hidden">
                {/* 2. BREADCRUMBS & LOGISTICS */}
                <div className="max-w-6xl mx-auto px-6 pt-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-800/50 pb-6 font-sans">
                        <div className="text-[10px] uppercase font-bold tracking-widest text-stone-500">
                            Alta Cocina {'>'} Extracción Metálica {'>'} <span className="text-amber-500">Bomba Rotativa</span>
                        </div>
                        <div className="text-[10px] font-bold text-amber-900 bg-amber-500 px-4 py-2 uppercase tracking-widest rounded-sm border-2 border-amber-700/50 shadow-[0_0_15px_rgba(217,119,6,0.3)]">
                            Distribución Comercial y C.O.D.
                        </div>
                    </div>
                </div>

                {/* 3. HERO (COFFEE CRAFTSMAN) */}
                <div className="max-w-6xl mx-auto px-6 py-16 lg:py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="relative z-20 order-2 lg:order-1 text-center lg:text-left">
                            <div className="inline-block text-amber-500 font-sans font-bold text-[10px] mb-6 uppercase tracking-[0.4em]">
                                Presión Atmosférica 9 Bares
                            </div>
                            <h1 className="text-5xl lg:text-7xl font-light text-stone-100 mb-6 tracking-wide leading-[1.05]">
                                {ai?.enhancedTitle || product.title}
                            </h1>
                            <p className="text-lg lg:text-xl text-stone-400 mb-10 font-sans font-light leading-relaxed mx-auto lg:mx-0 max-w-lg">
                                {ai?.enhancedDescription || product.description || 'Despierta con el bramido del acero cepillado purificando el grano. Control térmico PID inteligente envuelto en maquinaria ruda de cafetería italiana clásica.'}
                            </p>
                            
                            <div className="font-sans bg-[#171512] border border-stone-800 p-8 shadow-2xl relative text-left">
                                <div className="absolute left-0 top-0 w-1 h-full bg-amber-600"></div>
                                
                                <div className="text-[9px] text-stone-500 uppercase tracking-widest font-bold mb-4">Adquisición para Hogar/Comercio</div>
                                <div className="flex items-end justify-center lg:justify-start gap-5 mb-8">
                                    <span className="text-4xl text-stone-100 font-light tracking-tight">{fmtPrice(product.price)}</span>
                                    {product.originalPrice && <span className="text-sm text-stone-600 line-through pb-1">{fmtPrice(product.originalPrice)}</span>}
                                </div>
                                <button onClick={() => document.getElementById('checkout-coffee')?.scrollIntoView({ behavior: 'smooth' })} className="w-full bg-stone-100 hover:bg-white text-stone-900 py-5 font-bold uppercase tracking-widest text-[11px] transition-colors shadow-lg">
                                    Pedir Unidad C.O.D en Efectivo
                                </button>
                                <div className="text-xs text-center text-stone-500 mt-5 italic">
                                    Liquide monto en la recepción del cargamento.
                                </div>
                            </div>
                        </div>

                        <div className="w-full relative flex items-center justify-center p-4 lg:p-8 order-1 lg:order-2">
                            {/* Metallic pedestal effect */}
                            <div className="absolute bottom-0 w-3/4 h-8 bg-black blur-xl rounded-[100%] opacity-80 translate-y-6"></div>
                            <div className="relative z-10 w-full p-3 bg-gradient-to-b from-stone-800/10 to-[#11100e] rounded border border-stone-800 shadow-[inset_0_0_50px_rgba(255,255,255,0.02)]">
                                <EnhancedProductGallery product={product} accentColor={accent} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. TRUST BADGES TECHNICAL (Machine Specs) */}
                <div className="border-y border-stone-800/60 bg-[#0d0c0a] font-sans">
                    <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 lg:grid-cols-4 gap-12 divide-x divide-stone-800 text-center">
                        {[
                            {v: 'Dual Boiler', l: 'Evaporación Continua'},
                            {v: '58 mm', l: 'Portafiltro Comercial'},
                            {v: 'App Sync', l: 'Auto-Encendido Wifi'},
                            {v: 'Acero Inox', l: 'Carcasa Cepillada 304'}
                        ].map((b, i) => (
                            <div key={i} className="flex flex-col">
                                <span className="text-2xl text-stone-200 font-light mb-2">{b.v}</span>
                                <span className="text-[9px] text-amber-600 uppercase tracking-widest font-bold">{b.l}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 5. EXPERT ACCORDIONS (The Extraction) */}
                <div className="max-w-4xl mx-auto px-6 py-32">
                    <div className="text-center mb-16 relative">
                        <h2 className="text-3xl lg:text-4xl text-stone-100 font-light tracking-wide mb-4">Ingeniería Termodinámica.</h2>
                        <p className="text-stone-500 font-sans font-light md:text-lg">No es una vulgar jarra de filtro plástico, es un laboratorio de presiones.</p>
                        <div className="mt-8 w-px h-16 bg-amber-600/30 mx-auto"></div>
                    </div>
                    
                    <div className="space-y-2 font-sans border-t border-stone-800 pt-2">
                        {[
                            { t: 'Doble Caldera Independiente', a: 'Mientras las máquinas baratas de un solo bloque térmico te hacen esperar para espumar leche después de sacar el café quemándolo, aquí hay dos ollas de acero: una al rojo vivo para vapor inagotable, otra exacta a 92°C para un espresso sedoso simultáneo.' },
                            { t: 'Molienda Integrada de Muelas Cónicas', a: 'El secreto está en el grano inmediato. La tolva superior esconde discos de acero templado que trituran el grano fresco en milisegundos directo a la canasta, ajustándose milimétricamente en 40 grados de grosor.' },
                            { t: 'Control Térmico PID Artificial', a: 'Los sensores leen la temperatura del agua mil veces por segundo. Si cae medio grado durante la extracción, bombea energía microscópica compensando. Tu café nunca sabrá ácido o amargo jamás.' }
                        ].map((ac, i) => (
                            <div key={i} className="bg-[#151311] border-b border-stone-800 hover:bg-[#1a1815] transition-colors">
                                <button className="w-full p-8 text-left flex justify-between items-center text-stone-300" onClick={() => setFaqOpen(faqOpen===i?null:i)}>
                                    <span className="text-sm font-bold uppercase tracking-widest">{ac.t}</span>
                                    <span className="text-amber-500 font-light text-2xl">{faqOpen===i?'−':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {faqOpen === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-8 pb-8 text-stone-500 font-light text-sm leading-relaxed">
                                            {ac.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 6. ENDLESS MARQUEE (Aromatic steam) */}
                <div className="w-[100vw] overflow-hidden py-10 bg-[#0d0c0a] border-y border-stone-800/80 flex transform relative left-[50%] -translate-x-[50%]">
                    <div className="flex whitespace-nowrap font-light text-4xl text-stone-700 uppercase tracking-tighter">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="flex items-center gap-16 px-8 select-none">
                                <span>COMMERCIAL EXTRACTION</span>
                                <span className="text-amber-900/50">☕</span>
                                <span>LIQUID GOLD</span>
                                <span className="text-amber-900/50">☕</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 7. WHY TO USE / BENEFITS */}
                <div className="max-w-7xl mx-auto px-6 py-32 border-b border-stone-800 font-sans">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="order-2 lg:order-1 relative">
                            {/* Coffee pressure dial abstract */}
                            <div className="aspect-square bg-[#0f0e0c] rounded-full border-[10px] border-[#1c1a17] shadow-[20px_20px_60px_#090807,-20px_-20px_60px_#191815] relative p-12 flex flex-col justify-center items-center">
                                {/* Dial marks */}
                                <div className="absolute inset-x-0 top-6 text-center text-[10px] font-bold text-stone-500 uppercase tracking-[0.2em] opacity-30">Pressure</div>
                                
                                <div className="text-amber-500 text-6xl font-light font-serif mb-2">9.0</div>
                                <div className="text-stone-400 font-bold uppercase text-[9px] tracking-widest mb-6">BAR / Mpa</div>
                                
                                <div className="text-center">
                                    <p className="text-stone-500 font-light text-xs leading-relaxed max-w-[200px] mx-auto">La barrera de oro para desatar aceites aromáticos densos y crema espesa amielada.</p>
                                </div>

                                {/* Needle illusion */}
                                <div className="absolute bottom-1/2 left-1/2 w-1 h-[40%] bg-gradient-to-t from-stone-800 to-amber-600 rounded-full origin-bottom transform rotate-[45deg]"></div>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2">
                            <h2 className="text-4xl lg:text-5xl font-light text-stone-100 font-serif leading-tight mb-8">El ritual <br/><span className="text-amber-600 italic">profesional.</span></h2>
                            <p className="text-stone-400 font-light text-lg mb-12 leading-relaxed">No hay un botón milagroso; esto requiere práctica. Esta máquina respeta el oficio del barista y te transfiere las válvulas de control mecánicas para texturizar micro-espuma densa para arte latte, superando cualquier cafetería encadenada comercial.</p>
                            
                            <ul className="space-y-8">
                                {[
                                    { t: 'Varita de Vapor (No-Burn)', d: 'Inyector de 4 agujeros envuelto en aislante inyectado de teflón. El vapor sale hirviendo a 120 grados creando seda líquida con la leche, pero el metal no quema los dedos al limpiarlo.' },
                                    { t: 'Pre-infusión y Despertador Electrónico', d: 'Conecta el enchufe al Wifi doméstico. Dile a tu celular que a las 6:30AM empiece a pre-calentar el pesado brass metálico. Levantarse directo al sonido y olor cálido de la molienda.' }
                                ].map((b, i) => (
                                    <li key={i} className="flex gap-6">
                                        <div className="w-8 h-8 rounded border border-amber-800 text-amber-500 flex items-center justify-center font-bold text-xs shrink-0">B{i+1}</div>
                                        <div>
                                            <h4 className="text-stone-300 font-medium uppercase tracking-[0.15em] text-[10px] mb-2">{b.t}</h4>
                                            <p className="text-stone-500 font-light text-sm leading-relaxed">{b.d}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* 10. COMPARISON TABLE */}
                <div className="max-w-4xl mx-auto px-6 py-24 font-sans border-b border-stone-800">
                    <h2 className="text-center text-amber-600 uppercase font-bold text-[10px] tracking-widest mb-10">Análisis Comparativo</h2>
                    <div className="bg-[#151311] border border-stone-800 p-2 shadow-xl">
                        <div className="grid grid-cols-3 bg-[#0d0c0a] text-[9px] uppercase font-bold text-stone-500 tracking-[0.2em] border-b border-stone-800">
                            <div className="p-4 md:p-6">Detalle de Flujo</div>
                            <div className="p-4 md:p-6 text-stone-200 border-x border-stone-800 text-center bg-[#1a1815]">Máquina Semi-Pro</div>
                            <div className="p-4 md:p-6 text-center">Electrodomésticos Básicos</div>
                        </div>
                        {[
                            { k: 'Materialidad', u: 'Calderas y chasis de Acero Quirúrgico Bruto', t: 'Carcasas de chapucero plástico inyectado' },
                            { k: 'Fuerza de extracción', u: 'Motor rotativo implacable; 9 bar constantes', t: 'Vibraciones chillonas y débiles (15 bars falsos)' },
                            { k: 'Canal de Transacción', u: 'Contraremos (C.O.D). Pague de manera táctil a la entrega', t: 'Dificultosa integración online, riesgo de hackeos' }
                        ].map((r, i) => (
                            <div key={i} className="grid grid-cols-3 border-t border-stone-800/50 text-xs">
                                <div className="p-4 md:p-6 text-stone-400 font-light">{r.k}</div>
                                <div className="p-4 md:p-6 font-medium text-amber-500 bg-[#1a1815]/50 border-x border-stone-800 text-center">{r.u}</div>
                                <div className="p-4 md:p-6 text-stone-600 text-center line-through font-light">{r.t}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 11. RISK REVERSAL WARRANTY */}
                <div className="py-24 max-w-3xl mx-auto px-6 text-center">
                    <h3 className="text-3xl text-stone-100 font-serif font-light tracking-wide mb-6">Custodia de Caja Privada.</h3>
                    <p className="text-stone-400 font-sans font-light leading-relaxed mb-4 text-sm">
                        Las transacciones financieras en pasarelas dudosas apestan y acarrean estrés innecesario. Desaparecemos eso con la logística presencial. Envía aquí mismo abajo tu solicitud (gratis). Te coordinamos un móvil de traslado pesado directo a la cafetería de tu barrio o domicilio. Visualizas los 15 kilos de metal impecable, validas, y entregas presencialmente el cobro. Todo offline y seguro.
                    </p>
                </div>

                {/* 13. FAQ */}
                <div className="max-w-3xl mx-auto px-6 py-24 font-sans">
                    <h2 className="text-2xl text-stone-200 font-light mb-12 uppercase tracking-widest text-center">Consultas de Tuesta</h2>
                    <div className="space-y-4">
                        {[
                            {q: 'El equipo es muy avanzado, ¿Necesito curso de Barista para prepararme uno?', a: 'Incluye rutinas pre-programadas para nobuck. Si aprietas un botón muele el gramaje estándar y otra tecla bombea por los 25 segundos mágicos. Cuando busques perfeccionarte como oficio manual te dará todo el control.'},
                            {q: '¿Qué mantenimiento preventivo lleva anualmente esto?', a: 'Posee sensores de sarro calcáreo (descale). La propia máquina avisa en su panel frontal pasados los 250 cafés si el agua de tu grifo fue pesada y tira una guía simple de purgado natural usándola con polvos neutros desincrustantes que incluimos.'},
                            {q: 'Al solicitar método de pago Contra-entrega (C.O.D), ¿viene alguien capacitado?', a: 'Sí, el chofer asignado conoce y entiende la manipulación estricta de bultos tecnológicos verticales. Se lo entregan al ras de puerta cuidando la maquinaria hasta que usted efectúe el traspaso monetario visualizando la unidad.'}
                        ].map((f, i) => (
                            <div key={i} className="bg-[#11100e] border border-stone-800 p-1">
                                <button onClick={() => setFaqOpen(faqOpen===i?null:i)} className="w-full p-6 text-left flex justify-between items-center text-stone-300 font-medium text-xs uppercase tracking-widest transition-colors hover:bg-stone-800/30">
                                    {f.q}
                                    <span className="text-amber-600 font-light text-xl">{faqOpen===i?'−':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {faqOpen === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 pb-6 text-stone-500 font-light text-sm leading-relaxed pt-2">
                                            {f.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 14. EXPANDED REVIEWS */}
                <div className="py-24 bg-[#0a0908] border-t border-stone-800">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 font-sans">
                            {[
                                { r: "Me asustaba usar tarjeta así que el pago contra reembolso fue mi salvación. El equipo pesa toneladas, material brutal y el café que tira no tiene nada que envidiarle a las máquinas de $10K dólares.", n: "Valeria G.", t: "Aficionada Tueste" },
                                { r: "Amo encenderla desde la cama recién amanecido. Hace un ruido grave fenomenal purificando el circuito de metales. Los de logística divinos, pasaron a la hora del almuerzo, comprobé paquete, aboné, fin.", n: "Ramiro F.", t: "Abogado Local" },
                                { r: "Hacer Lattes y cremar la leche en 10 segundos es otra cosa con doble caldera. Dejé de ir a Starbucks y creo que en 8 meses la máquina se pagó sola con lo ahorrado.", n: "Sofía M.", t: "Diseñadora Freelance" }
                            ].map((rev, i) => (
                                <div key={i} className="p-8 bg-[#11100e] border border-stone-800 relative z-10 shadow-lg">
                                    <span className="absolute top-4 left-4 text-4xl text-amber-900/40 font-serif">"</span>
                                    <p className="text-stone-400 font-light text-sm mb-6 leading-relaxed relative z-10 italic mt-4">"{rev.r}"</p>
                                    <div className="border-t border-stone-800 pt-4">
                                        <div className="text-stone-200 font-bold text-[10px] uppercase tracking-widest">{rev.n}</div>
                                        <div className="text-amber-700 uppercase text-[9px] font-bold mt-1 tracking-widest">{rev.t}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 15. CHECKOUT (Barista Ticket Form) */}
                <div id="checkout-coffee" className="py-32 relative bg-[#151311] font-sans">
                    <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
                        <div className="lg:col-span-6 order-2 lg:order-1 bg-[#1c1a17] p-10 shadow-2xl relative border-2 border-stone-800">
                            {/* Coffee ticket styling */}
                            <div className="absolute top-0 inset-x-0 h-4 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgogIDxwb2x5Z29uIHBvaW50cz0iMCwwIDgsMCA0LDgiIGZpbGw9IiMxNTEzMTEiLz4KPC9zdmc+')] bg-repeat-x opacity-100"></div>
                            
                            <div className="relative z-10 mt-4">
                                <div className="mb-10 text-center">
                                    <h3 className="text-xl font-bold text-stone-200 mb-2 uppercase tracking-[0.2em] border-b border-stone-800 pb-4 inline-block">Orden Faltante</h3>
                                    <div className="text-[9px] font-bold text-amber-600 uppercase tracking-widest mt-2">Logística Presencial Local</div>
                                </div>
                                
                                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                                    <div>
                                        <label className="text-stone-500 uppercase text-[9px] font-bold tracking-widest block mb-2 px-1">Comensal Receptor</label>
                                        <input type="text" className="w-full bg-[#151311] border-b-2 border-stone-800 focus:border-amber-500 text-stone-200 font-medium text-sm py-3 px-1 outline-none transition-colors placeholder:text-stone-700" placeholder="Escriba apellido completo" />
                                    </div>
                                    <div>
                                        <label className="text-stone-500 uppercase text-[9px] font-bold tracking-widest block mb-2 px-1">WhatsApp Frecuente</label>
                                        <input type="tel" className="w-full bg-[#151311] border-b-2 border-stone-800 focus:border-amber-500 text-stone-200 font-medium text-sm py-3 px-1 outline-none transition-colors placeholder:text-stone-700" placeholder="Escriba línea activa" />
                                    </div>
                                    <div>
                                        <label className="text-stone-500 uppercase text-[9px] font-bold tracking-widest block mb-2 px-1">Señales Domésticas</label>
                                        <textarea rows={2} className="w-full bg-[#151311] border-b-2 border-stone-800 focus:border-amber-500 text-stone-200 font-medium text-sm py-3 px-1 outline-none transition-colors placeholder:text-stone-700 resize-none" placeholder="Ubicaciones, barrio, referencias locales"></textarea>
                                    </div>
                                    <div className="pt-6">
                                        <button className="w-full bg-amber-700 hover:bg-amber-600 text-white py-5 font-bold uppercase tracking-[0.2em] text-[11px] transition-colors">
                                            Marchando Pedido C.O.D
                                        </button>
                                        <div className="text-[10px] text-center text-stone-500 mt-4 uppercase tracking-widest font-bold border border-dashed border-stone-800 p-2">Pase presencial por caja con el fletero.</div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="lg:col-span-6 order-1 lg:order-2 text-center lg:text-left">
                            <h2 className="text-4xl lg:text-5xl font-light text-stone-100 font-serif leading-tight mb-8">El amanecer perfecto <br/><span className="text-amber-500 italic">comienza aquí.</span></h2>
                            <p className="text-stone-400 font-light text-lg mb-10 leading-relaxed max-w-sm mx-auto lg:mx-0">Invierte fuertemente en tu primera bebida matinal sin miedos virtuales. Registra las señas domésticas necesarias gratuitamente. Llevamos y descargamos la maquinaria, verificas el embalaje, y pagas el importe cerrado en domicilio en efectivo. Todo offline.</p>
                            
                            <div className="text-5xl font-light text-stone-200 tracking-tighter mx-auto lg:mx-0 py-2 w-max">{fmtPrice(product.price)}</div>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
};

export default PdpSmartEspressoMaker;
