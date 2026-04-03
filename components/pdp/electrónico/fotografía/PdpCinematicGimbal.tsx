'use client';
import React, { useState } from 'react';
import { StoreData, Product } from '@/lib/types';
import EnhancedProductGallery from '@/components/pdp/EnhancedProductGallery';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { data: StoreData; product: Product; }

const PdpCinematicGimbal: React.FC<Props> = ({ data, product }) => {
    const [faqOpen, setFaqOpen] = useState<number | null>(null);
    const ai = product.aiContent;
    const fmtPrice = (n: number) => { const s = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); return `Gs. ${s}`; };

    // Estética "Robotic Cinema Grid": Oscuros tipo fibra de carbono (Grafito), UI estilo cámara de cine (Rojo REC y Amarillo Industrial), y crosshairs.
    const bg = '#121212'; // Graphite dark
    const textMain = '#9e9e9e'; // Grey 500
    const accent = '#facc15'; // Yellow 400 (Industrial)

    return (
        <div style={{ background: bg, color: textMain }} className="font-mono antialiased overflow-x-hidden selection:bg-yellow-400 selection:text-black">
            
            {/* Viewfinder Overlay Ambient */}
            <div className="fixed inset-0 pointer-events-none z-0 opacity-20">
                {/* Center crosshair */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32">
                    <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/20"></div>
                    <div className="absolute left-0 right-0 top-1/2 h-px bg-white/20"></div>
                    <div className="absolute top-1/2 left-1/2 w-8 h-8 border border-white/40 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                </div>
                {/* Camera corner brackets */}
                <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-white/30"></div>
                <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-white/30"></div>
                <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-white/30"></div>
                <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-white/30"></div>
            </div>

            {/* 1. TOP NAV (HUD Interface) */}
            <header className="sticky top-0 z-50 bg-[#121212]/90 backdrop-blur-sm border-b border-zinc-800">
                <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between text-xs">
                    <div className="font-bold tracking-[0.2em] text-white uppercase flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                        REC / <span className="text-yellow-400">AXIS_PRO</span>
                    </div>
                    <div className="flex gap-4 items-center">
                        <div className="hidden md:flex gap-4 text-zinc-500 font-bold">
                            <span>ISO <span className="text-white">800</span></span>
                            <span>F<span className="text-white">1.8</span></span>
                            <span>SHT <span className="text-white">1/48</span></span>
                        </div>
                        <div className="font-bold text-black bg-yellow-400 px-2 py-1 tracking-widest text-[10px] uppercase">
                            Entrega C.O.D
                        </div>
                    </div>
                </div>
            </header>

            <main className="relative z-10 w-full overflow-hidden">
                {/* 2. BREADCRUMBS & LOGISTICS */}
                <div className="max-w-7xl mx-auto px-6 pt-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="text-[10px] uppercase font-bold tracking-[0.3em] text-zinc-600">
                            Cinematografía {'>'} Robótica {'>'} <span className="text-yellow-400">Cardán 3-Ejes</span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-zinc-400 font-bold border border-zinc-800 px-3 py-1">
                            <span className="text-yellow-500">[ TRÁNSITO FÍSICO ]</span>
                        </div>
                    </div>
                </div>

                {/* 3. HERO (THE ROBOTIC ARM) */}
                <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="relative z-20">
                            <div className="inline-flex gap-2 mb-6">
                                <span className="border border-yellow-400/50 text-yellow-400 px-2 py-1 text-[9px] uppercase tracking-widest font-bold">Payload 4.5KG</span>
                                <span className="border border-zinc-700 text-zinc-400 px-2 py-1 text-[9px] uppercase tracking-widest font-bold">Carbon Fiber</span>
                            </div>
                            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 uppercase tracking-tighter leading-[0.95]">
                                {ai?.enhancedTitle || product.title}
                            </h1>
                            <p className="text-base text-zinc-400 mb-10 leading-relaxed font-medium">
                                {ai?.enhancedDescription || product.description || 'Anula la vibración micro-humana. Convierte cada toma en un traveling fluido estilo Hollywood usando motores sin escobillas ultra rápidos y titanio puro.'}
                            </p>
                            
                            <div className="bg-[#18181b] border-2 border-zinc-800 p-6 shadow-2xl relative">
                                <div className="absolute top-0 right-0 w-4 h-4 border-b-2 border-l-2 border-zinc-800"></div>
                                <div className="absolute bottom-0 left-0 w-4 h-4 border-t-2 border-r-2 border-zinc-800"></div>
                                
                                <div className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] font-bold mb-3">Valor de Adquisición &gt;&gt;</div>
                                <div className="flex items-end gap-4 mb-8">
                                    <span className="text-4xl text-white font-bold tracking-tighter">{fmtPrice(product.price)}</span>
                                    {product.originalPrice && <span className="text-xs text-zinc-600 line-through pb-1 font-bold">{fmtPrice(product.originalPrice)}</span>}
                                </div>
                                <button onClick={() => document.getElementById('checkout-gimbal')?.scrollIntoView({ behavior: 'smooth' })} className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-4 font-bold uppercase tracking-[0.2em] text-xs transition-colors shadow-[4px_4px_0_rgba(255,255,255,0.1)] hover:translate-y-1 hover:shadow-none hover:shadow-inner">
                                    Desplegar Envío C.O.D
                                </button>
                                <div className="text-[9px] text-zinc-500 uppercase tracking-widest mt-4 font-bold text-center">
                                    {`[ CANCELAR IMPORTE AL RECEPCIONAR ]`}
                                </div>
                            </div>
                        </div>

                        <div className="w-full relative flex items-center justify-center p-8">
                            {/* Target lock visual */}
                            <div className="absolute inset-0 border border-zinc-800 rounded bg-[#18181b] flex items-center justify-center p-8">
                                <div className="absolute inset-x-0 top-1/2 h-px bg-zinc-800/50"></div>
                                <div className="absolute inset-y-0 left-1/2 w-px bg-zinc-800/50"></div>
                                <div className="relative z-10 w-full p-2 bg-[#121212] border-2 border-zinc-800/50">
                                    <EnhancedProductGallery product={product} accentColor={accent} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. TRUST BADGES TECHNICAL (Specs) */}
                <div className="border-y border-zinc-800 bg-[#0f0f0f]">
                    <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 lg:grid-cols-4 gap-8 divide-x divide-zinc-800">
                        {[
                            {v: 'LiDAR', l: 'Autoenfoque Láser'},
                            {v: '12 Hrs', l: 'Batería BG30'},
                            {v: '1.5 KG', l: 'Peso sin carga'},
                            {v: 'SuperSmooth', l: 'Algoritmo de 3ra Gen'}
                        ].map((b, i) => (
                            <div key={i} className="flex flex-col text-center">
                                <span className="text-2xl font-bold text-white mb-2">{b.v}</span>
                                <span className="text-[10px] text-yellow-500 uppercase tracking-[0.2em] font-bold">{b.l}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 5. EXPERT ACCORDIONS (The Tech) */}
                <div className="max-w-4xl mx-auto px-6 py-24">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="text-yellow-400 font-bold text-2xl">//</div>
                        <h2 className="text-2xl lg:text-3xl font-bold text-white uppercase tracking-tight">Estabilidad Robótica</h2>
                    </div>
                    
                    <div className="space-y-2">
                        {[
                            { t: 'Motores Blindados de Titanio', a: 'Carga pesadas cámaras Mirrorless o de cine (Blackmagic/RED) con lentes extravagantes. Los motores 20% más fuertes estabilizan objetivos cruzando los 4.5 kilogramos si sudar frío.' },
                            { t: 'Transmisor de Video in-situ', a: 'Cero cables tirados por el suelo. Envía la señal HDMI directamente desde tu cámara hacia monitores remotos en un rango de 200 metros con 50 milisegundos de retraso. El director dirigirá de lejos.' },
                            { t: 'Brazos Extensibles de Fibra de Carbono', a: 'Corte CNC puro para el balance. Cada brazo lleva revestimiento de teflón que asegura un desplazamiento milimétrico sin micro-saltos que arruinarían una toma tracking rápida persiguiendo autos.' }
                        ].map((ac, i) => (
                            <div key={i} className="bg-[#18181b] border border-zinc-800 hover:border-yellow-400/50 transition-colors">
                                <button className="w-full px-6 py-6 flex justify-between items-center text-left" onClick={() => setFaqOpen(faqOpen===i?null:i)}>
                                    <span className="text-stone-300 font-bold text-xs uppercase tracking-widest">{ac.t}</span>
                                    <span className="text-yellow-400 font-bold text-lg">{faqOpen===i?'−':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {faqOpen === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 pb-6 text-zinc-400 text-xs leading-relaxed border-t border-zinc-800/50 pt-4">
                                            {ac.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 6. ENDLESS MARQUEE (Yellow caution tape) */}
                <div className="w-[100vw] overflow-hidden py-3 bg-yellow-400 text-black border-y-4 border-yellow-500 flex transform relative left-[50%] -translate-x-[50%] -rotate-1">
                    <div className="flex whitespace-nowrap font-black text-2xl uppercase tracking-[0.2em]">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="flex items-center gap-12 px-8">
                                <span>CAUTION: HEAVY PAYLOAD</span>
                                <span>///</span>
                                <span>FLUID DYNAMICS STRICT</span>
                                <span>///</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 7. WHY TO USE / BENEFITS */}
                <div className="max-w-7xl mx-auto px-6 py-32 border-b border-zinc-900">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="order-2 lg:order-1 relative">
                            {/* HUD Diagram Concept */}
                            <div className="aspect-[4/3] bg-[#0a0a0a] border border-zinc-800 relative flex justify-center items-center overflow-hidden">
                                {/* Grid */}
                                <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                                {/* Focus box */}
                                <div className="w-48 h-32 border-2 border-yellow-400 relative z-10 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm">
                                    <div className="absolute top-0 right-0 p-1 text-[8px] text-yellow-400 bg-black">TRACKING</div>
                                    <div className="w-16 h-16 border border-red-500 rounded-full animate-ping opacity-50 absolute"></div>
                                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                                </div>
                                {/* UI info */}
                                <div className="absolute bottom-4 left-4 text-[8px] text-zinc-500 flex flex-col space-y-1 font-bold">
                                    <span>PAN: 0.00°</span>
                                    <span>TILT: -15.4°</span>
                                    <span>ROLL: 0.00°</span>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2">
                            <h2 className="text-4xl lg:text-5xl font-bold text-white uppercase tracking-tighter leading-tight mb-8">No más tomas <br/><span className="text-yellow-400">Arruinadas.</span></h2>
                            <p className="text-zinc-400 text-sm mb-12 leading-relaxed">Caminar con una cámara de cine en mano produce rebotes indeseables de pie. Arruinas la magia inmersiva. Sujeta los mangos texturizados de este rig y corre rápido; los motores invisibles contra-actuarán tus pasos.</p>
                            
                            <ul className="space-y-6">
                                {[
                                    { t: 'ActiveTrack Avanzado', d: 'Dibuja un cuadrado de arrastre en la pantalla sobre el rostro del actor corriendo. El cardán girará mecánicamente el lente por sí solo para mantenerlo en el centro sin que tú muevas un joystick.' },
                                    { t: 'Modo FPV de Carreras', d: 'Libera los tres ejes para que la cámara siga fielmente cada inclinación y derrape de tu brazo en escenarios de pura adrenalina.' }
                                ].map((b, i) => (
                                    <li key={i} className="flex gap-4">
                                        <div className="w-6 h-6 border-2 border-zinc-700 flex items-center justify-center text-zinc-500 font-bold shrink-0 text-[10px]">{i+1}</div>
                                        <div>
                                            <h4 className="text-white font-bold uppercase tracking-widest text-[10px] mb-1">{b.t}</h4>
                                            <p className="text-zinc-500 text-xs leading-relaxed font-medium">{b.d}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* 10. COMPARISON TABLE */}
                <div className="max-w-4xl mx-auto px-6 py-24">
                    <div className="border border-zinc-800 bg-[#18181b]">
                        <div className="grid grid-cols-3 bg-[#0f0f0f] text-[9px] uppercase font-bold text-zinc-500 tracking-[0.2em] border-b border-zinc-800">
                            <div className="p-5">Especificación</div>
                            <div className="p-5 text-white border-x border-zinc-800 text-center bg-zinc-900">Cardán Cinema</div>
                            <div className="p-5 text-center">Gimbals Baratos de Celular</div>
                        </div>
                        {[
                            { k: 'Material Principal', u: 'Brazos CNC Carbon Fiber / Titanio', t: 'Plásticos crujibles' },
                            { k: 'Adaptabilidad Óptica', u: 'Calibra pesos de teles grandes sin quemar', t: 'Motor vibra o colapsa al poner zoom' },
                            { k: 'Gestión Venta Local', u: 'Compras 100% físicas. Pagas al ver el bulto', t: 'Largas esperas ciegas en aduanas grises' }
                        ].map((r, i) => (
                            <div key={i} className="grid grid-cols-3 border-t border-zinc-800 text-xs">
                                <div className="p-5 text-zinc-400">{r.k}</div>
                                <div className="p-5 font-bold text-yellow-400 bg-zinc-900 border-x border-zinc-800 text-center">{r.u}</div>
                                <div className="p-5 text-zinc-600 text-center line-through font-medium">{r.t}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 11. RISK REVERSAL WARRANTY */}
                <div className="py-24 bg-[#0f0f0f] border-y border-zinc-800 text-center px-6">
                    <div className="max-w-3xl mx-auto">
                        <div className="inline-flex gap-2 justify-center mb-6">
                            <span className="w-16 h-1 bg-yellow-500 block"></span>
                            <span className="w-4 h-1 bg-yellow-500 block"></span>
                            <span className="w-1 h-1 bg-yellow-500 block"></span>
                        </div>
                        <h3 className="text-2xl text-white font-bold uppercase tracking-widest mb-6">Cerrojo de Compras 100% Físicas.</h3>
                        <p className="text-zinc-400 text-sm leading-relaxed max-w-2xl mx-auto">
                            Equipamiento de cine de esta categoría atrae estrés de estafadores online si abonas adelantado ciego. Bloqueamos esto. No te pedimos tajadas. Escribes el "manifiesto" aquí abajo, agendamos por comunicador, mandamos una van comercial blindada y entregamos frente a tus dos ojos físicos la maleta técnica. Compruebas, y liberas pago C.O.D. en la misma vereda.
                        </p>
                    </div>
                </div>

                {/* 13. FAQ */}
                <div className="max-w-3xl mx-auto px-6 py-24">
                    <h2 className="text-xl text-white font-bold uppercase tracking-widest mb-12 text-center">// Protocolo Info //</h2>
                    <div className="space-y-3">
                        {[
                            {q: '¿Es complejo estabilizarlo / balancearlo la primera prueba?', a: 'Posee bloqueadores de eje individual mecánicos. Dejas estático dos ejes fijos, balanceas el horizonte suelto solo para ese motor, ajustas seguro y pasas al siguiente milimétricamente. Terminas tu balance en 60 segundos.'},
                            {q: '¿Qué cámara pesada máxima soporta antes de claudicar?', a: 'Sube fácilmente conjuntos DSLR o Mirrorless con Lentes de Cine Primos pesados hasta 4.5 Kilogramos netos. El brazo bajo está alargado para el despeje, tu lente no chocará atrás al mirar hacia arriba.'},
                            {q: 'Si pido el Pago Contra-Entrega (C.O.D.), ¿Viene en maletín acolchado?', a: 'Definitivo. La unidad viaja sellada dentro de una caja de policarbonato anti-lluvia (hard shell) incrustada en foam comprimido exacto. Si ves la maleta arruinada, tú puedes cancelar entregar un peso de tu dinero libremente.'}
                        ].map((f, i) => (
                            <div key={i} className="bg-[#121212] border-l-4 border-zinc-800 hover:border-yellow-500">
                                <button onClick={() => setFaqOpen(faqOpen===i?null:i)} className="w-full p-6 text-left flex justify-between items-center text-white font-bold text-xs uppercase tracking-widest transition-colors">
                                    {f.q}
                                    <span className="text-yellow-500 font-bold text-lg">{faqOpen===i?'−':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {faqOpen === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 pb-6 text-zinc-400 font-medium text-xs leading-relaxed pt-2">
                                            {f.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 15. CHECKOUT (Terminal Tracker Form) */}
                <div id="checkout-gimbal" className="py-32 relative bg-[#0a0a0a] border-t border-zinc-800">
                    <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                        <div className="lg:col-span-6 order-2 lg:order-1 bg-[#121212] p-8 border border-zinc-800 relative shadow-2xl">
                            {/* REC frame */}
                            <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-red-500"></div>
                            
                            <div className="relative z-10 mt-6">
                                <div className="mb-8">
                                    <h3 className="text-lg font-bold text-white uppercase tracking-widest">Coordenadas de Transferencia</h3>
                                    <div className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mt-1">C.O.D. Operation Lock</div>
                                </div>
                                
                                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                                    <div>
                                        <label className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold mb-1 block">Alias Operario</label>
                                        <input type="text" className="w-full bg-[#18181b] border border-zinc-800 focus:border-yellow-500 text-white font-bold text-xs p-4 outline-none transition-colors placeholder:text-zinc-700" placeholder="[NOMBRE APELLIDO]" />
                                    </div>
                                    <div>
                                        <label className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold mb-1 block">Señal Nexo Vía MSJ</label>
                                        <input type="tel" className="w-full bg-[#18181b] border border-zinc-800 focus:border-yellow-500 text-white font-bold text-xs p-4 outline-none transition-colors placeholder:text-zinc-700" placeholder="[NUMERO TELEFÓNICO]" />
                                    </div>
                                    <div>
                                        <label className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold mb-1 block">Drop-Zone (Fábrica / Residencia)</label>
                                        <textarea rows={2} className="w-full bg-[#18181b] border border-zinc-800 focus:border-yellow-500 text-white font-bold text-xs p-4 outline-none transition-colors placeholder:text-zinc-700 resize-none" placeholder="[DIRECCION EXACTA]"></textarea>
                                    </div>
                                    <div className="pt-4">
                                        <button className="w-full bg-red-600 hover:bg-red-500 text-white py-5 font-bold uppercase tracking-[0.3em] text-[10px] transition-colors relative overflow-hidden group">
                                            <span className="absolute inset-x-0 w-full h-[1px] bg-white top-1 opacity-20"></span>
                                            Despachar Solicitud Contado
                                        </button>
                                        <div className="text-[9px] text-center text-zinc-600 mt-4 uppercase tracking-[0.2em] font-bold">
                                            - Sin Riesgos - Pago Físico Único -
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="lg:col-span-6 order-1 lg:order-2">
                            <h2 className="text-4xl lg:text-5xl font-bold text-white uppercase tracking-tighter leading-none mb-6">Filma <br/><span className="text-red-500">Intocable.</span></h2>
                            <p className="text-zinc-400 font-medium text-sm mb-10 leading-relaxed max-w-sm">No pierdas horas borrando vibraciones en post-producción. Tráete tu mejor lente, recibe hoy mismo este armamento, pruébalo al tacto, paga suelto a nuestro representante C.O.D. y filma inmaculable el resto de la tarde.</p>
                            
                            <div className="text-4xl lg:text-5xl font-bold text-white tracking-tighter">{fmtPrice(product.price)}</div>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
};

export default PdpCinematicGimbal;
