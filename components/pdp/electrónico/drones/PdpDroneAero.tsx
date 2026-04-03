'use client';
import React, { useState } from 'react';
import { StoreData, Product } from '@/lib/types';
import EnhancedProductGallery from '@/components/pdp/EnhancedProductGallery';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { data: StoreData; product: Product; }

const PdpDroneAero: React.FC<Props> = ({ data, product }) => {
    const [openSpecAcc, setOpenSpecAcc] = useState<number | null>(0);
    const [faqOpen, setFaqOpen] = useState<number | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const ai = product.aiContent;
    const fmtPrice = (n: number) => { const s = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); return `Gs. ${s}`; };
    
    // Aesthetic Palette: Military HUD
    const bg = '#020617'; // Slate 950
    const accent = '#06b6d4'; // Cyan 500
    const textGray = '#94a3b8'; // Slate 400

    return (
        <div style={{ background: bg, color: '#f8fafc', fontFamily: "'Rajdhani', 'Inter', sans-serif" }} className="overflow-x-hidden selection:bg-cyan-500/30">
            
            {/* 0. AMBIENT HUD GRID */}
            <div className="fixed inset-0 pointer-events-none z-0 opacity-20">
                <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(rgba(6,182,212,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.1) 1px, transparent 1px)`, backgroundSize: '40px 40px' }}></div>
                <div className="absolute top-[10%] left-[10%] w-[80vw] h-[80vw] rounded-full border border-cyan-500/20 animate-ping" style={{ animationDuration: '4s' }}></div>
            </div>

            {/* 1. TOP NAV */}
            <header className="sticky top-0 z-50 bg-[#020617]/80 backdrop-blur-md border-b border-cyan-500/10">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <svg className="animate-pulse" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2"><polygon points="12 2 19 21 12 17 5 21 12 2"/></svg>
                        <span className="text-sm font-bold tracking-widest uppercase">Aero<span className="text-cyan-500 font-light">Drone</span></span>
                    </div>
                    <nav className="hidden lg:flex gap-6">
                        {['Datos', 'Calibración', 'Simulador'].map((item) => (
                            <a key={item} href={`#${item.toLowerCase()}`} className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400 hover:text-cyan-400 transition-colors">
                                {item}
                            </a>
                        ))}
                    </nav>
                </div>
            </header>

            <main className="relative z-10 pt-6">
                
                {/* 2. BREADCRUMBS & MICRO-LOGISTICS */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-wrap items-center justify-between mb-8 text-[10px] font-bold tracking-[0.1em] uppercase text-slate-500">
                    <div>INICIO / AEROSPACE / <span className="text-cyan-500">{product.title.substring(0, 15)}...</span></div>
                    <div className="flex items-center gap-2 bg-cyan-500/10 px-3 py-1 rounded-sm border border-cyan-500/20 text-cyan-400 animate-pulse">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
                        Entrega Estimada: 2-4 Días
                    </div>
                </div>

                {/* 3. SUPER HERO SECTION */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-start pb-6">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="relative bg-slate-900/50 rounded-2xl p-2 border border-slate-800 shadow-[0_0_30px_rgba(6,182,212,0.1)]">
                        {/* HUD Corners */}
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500 z-10"></div>
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-500 z-10"></div>
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-500 z-10"></div>
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500 z-10"></div>
                        <EnhancedProductGallery product={product} accentColor={accent} />
                        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-[9px] font-mono text-cyan-400 border border-cyan-500/30">ALT: 400M // REC</div>
                    </motion.div>

                    <div className="flex flex-col space-y-6">
                        <div>
                            <div className="flex items-center gap-1.5 mb-2 text-cyan-400 text-sm">
                                {[1,2,3,4,5].map(i => <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
                                <span className="text-xs font-bold text-slate-400 ml-2">4.9/5 (2,410 Vuelos)</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-2" style={{ textShadow: '0 0 20px rgba(6,182,212,0.3)' }}>
                                {ai?.enhancedTitle || product.title}
                            </h1>
                            <p className="text-sm font-medium text-slate-400 border-l-2 border-cyan-500 pl-3">
                                {ai?.enhancedDescription || product.description || 'Inteligencia de evasión 3D. Rango de 15KM. Vuelo milimétricamente estabilizado para captura cinemática 4K.'}
                            </p>
                        </div>
                        
                        <div className="bg-[#040B16] border border-cyan-500/20 p-5 shadow-[inset_0_0_20px_rgba(6,182,212,0.05)]">
                            <div className="flex items-end gap-4 mb-4 text-cyan-400">
                                <span className="text-4xl font-black">{fmtPrice(product.price)}</span>
                                {product.originalPrice && <span className="text-sm font-bold text-slate-600 line-through pb-1">{fmtPrice(product.originalPrice)}</span>}
                            </div>
                            <button onClick={() => document.getElementById('checkout-drone')?.scrollIntoView({ behavior: 'smooth' })} className="w-full h-[60px] bg-cyan-500 hover:bg-cyan-400 text-[#020617] font-black text-sm uppercase tracking-[0.2em] transition-all relative overflow-hidden group">
                                <span className="relative z-10">Asegurar Despliegue</span>
                                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
                            </button>
                        </div>

                        {/* 4. TRUST BADGES */}
                        <div className="grid grid-cols-3 gap-2">
                            {[
                                { t: 'Retorno 50 Días', i: 'M10 19l-7-7m0 0l7-7m-7 7h18' },
                                { t: 'Garantía Cero Riesgo', i: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
                                { t: 'Envío COD', i: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4' }
                            ].map((b, i) => (
                                <div key={i} className="flex flex-col items-center justify-center p-2 text-center bg-slate-900 border border-slate-800">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-cyan-500 mb-1"><path strokeLinecap="round" strokeLinejoin="round" d={b.i}/></svg>
                                    <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">{b.t}</span>
                                </div>
                            ))}
                        </div>

                        {/* 5. EXPANDABLE DETAILS ABOVE FOLD */}
                        <div className="border border-slate-800 bg-[#040B16]">
                            {[
                                { t: 'Datos Criptográficos (Specs)', a: 'Transmisión O3+ | Peso 249g | Resistencia viento Lvl 5 | Sensor CMOS 1/1.3".' },
                                { t: 'Componentes Aleación', a: 'Polímero de fibra de carbono. Armazón ultra ligero resistente a micro-impactos.' },
                                { t: 'Directriz de Envío', a: 'Entrega prioritaria sin recargo. Pagas tu unidad directamente en las manos del operador de correos.' }
                            ].map((ac, i) => (
                                <div key={i} className="border-b border-slate-800 last:border-0">
                                    <button onClick={() => setOpenSpecAcc(openSpecAcc===i?null:i)} className="w-full text-left px-5 py-4 flex items-center justify-between text-[11px] font-bold uppercase tracking-widest text-[#f8fafc]">
                                        {ac.t} <span className="text-cyan-500 text-lg">{openSpecAcc===i?'-':'+'}</span>
                                    </button>
                                    <AnimatePresence>
                                        {openSpecAcc === i && (
                                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-5 pb-4 text-xs font-mono text-slate-400 leading-relaxed">
                                                {ac.a}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 6. ENDLESS MARQUEE */}
                <div className="w-[100vw] overflow-hidden py-3 bg-cyan-500 text-[#020617] relative left-[50%] -translate-x-[50%] my-12 border-y border-cyan-400">
                    <div className="flex whitespace-nowrap animate-marquee font-black uppercase text-xs tracking-[0.3em]">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="flex items-center gap-12 px-6">
                                <span>34 MIN TIEMPO AUTONOMÍA</span><span>///</span>
                                <span>DETECCIÓN OBSTÁCULOS APEX</span><span>///</span>
                                <span>SEÑAL INQUEBRANTABLE 15KM</span><span>///</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 7. WHY TO USE (BENEFITS) */}
                <div id="datos" className="max-w-7xl mx-auto px-4 md:px-8 py-16">
                    <h2 className="text-2xl md:text-3xl font-black uppercase tracking-widest text-center mb-12">Superioridad <span className="text-cyan-500">Aérea</span></h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { i: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>, t: 'Radares Ópticos', d: 'Sensores de evasión tridimensional bloquean colisiones hasta 30 metros de distancia automáticamente.' },
                            { i: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="6" width="20" height="12" rx="2" ry="2"/><path d="M6 12h8"/></svg>, t: 'Celdas de Iones', d: 'Hasta 40 increíbles minutos de flotación constante en condiciones ideales de presión.' },
                            { i: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="21.17" y1="8" x2="12" y2="8"/><line x1="3.95" y1="6.06" x2="8.54" y2="14"/><line x1="10.88" y1="21.94" x2="15.46" y2="14"/></svg>, t: 'Viento Cero', d: 'Motores ultra-brushless estabilizan el gimbal mecánico incluso contra ráfagas de 38km/h.' }
                        ].map((b, i) => (
                            <div key={i} className="bg-slate-900 border border-slate-800 p-8 text-center group hover:border-cyan-500/50 transition-colors relative overflow-hidden">
                                <div className="absolute -top-10 -right-10 w-24 h-24 bg-cyan-500/5 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                                <div className="text-cyan-500 w-16 h-16 mx-auto mb-6">{b.i}</div>
                                <h3 className="text-lg font-black uppercase text-white mb-2">{b.t}</h3>
                                <p className="text-xs text-slate-400 font-medium leading-relaxed">{b.d}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 8. HOW TO USE (VISUAL GUIDE) */}
                <div id="calibración" className="bg-[#01030B] py-16 border-y border-slate-800">
                    <div className="max-w-7xl mx-auto px-4 md:px-8">
                        <div className="text-center mb-12">
                            <span className="text-cyan-500 text-[10px] uppercase font-bold tracking-widest bg-cyan-500/10 px-3 py-1 rounded inline-block mb-3">Protocolo de Inicio</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { s: '1', m: 'Despliegue', t: 'Extiende los brazos mecánicos hasta que el lock sintonice con un click sólido.' },
                                { s: '2', m: 'Satélite', t: 'El controlador remoto obtiene señal GPS de 12 satélites en sólo 15 segundos.' },
                                { s: '3', m: 'Lift Off', t: 'Comando de joystick hacia abajo. Despegue vertical estabilizado a las nubes.' }
                            ].map((s, i) => (
                                <div key={i} className="flex flex-col border border-slate-800 bg-slate-900 overflow-hidden relative">
                                    <div className="h-32 bg-slate-800/50 flex items-center justify-center text-7xl font-black text-slate-800">0{s.s}</div>
                                    <div className="p-6">
                                        <div className="text-xs font-black text-cyan-400 uppercase tracking-widest mb-2 border-b border-cyan-500/20 pb-2">FASE {s.s}: {s.m}</div>
                                        <p className="text-sm font-medium text-slate-400">{s.t}</p>
                                    </div>
                                    {/* connection lines */}
                                    {i < 2 && <div className="hidden md:block absolute right-[-24px] top-1/2 w-12 h-[2px] bg-cyan-500/30 z-10"></div>}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 9. MULTIMEDIA REVEAL */}
                <div className="py-24 relative overflow-hidden flex items-center justify-center min-h-[50vh]">
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                    <div className="w-[300px] h-[300px] border border-cyan-500/30 rounded-full absolute animate-[spin_10s_linear_infinite]"></div>
                    <div className="w-[450px] h-[450px] border border-cyan-500/10 rounded-full absolute animate-[spin_15s_linear_infinite_reverse]"></div>
                    <div className="text-center relative z-10 max-w-2xl px-6">
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4 text-white">4K Resolución Absoluta.</h2>
                        <p className="text-slate-400 text-sm md:text-base font-medium">Captura imágenes nítidas a hiper-velocidad. Filtros ND integrados para domar la intensidad solar sin sacrificar bitrate.</p>
                    </div>
                </div>

                {/* 10. COMPARISON TABLE */}
                <div className="max-w-5xl mx-auto px-4 md:px-8 py-16">
                    <h2 className="text-2xl font-black uppercase text-center tracking-widest mb-10">Radar de Comparación</h2>
                    <div className="border border-slate-800 bg-slate-900 rounded-lg overflow-hidden shadow-2xl">
                        <div className="grid grid-cols-3 bg-[#01030B] border-b border-slate-800 font-black text-[10px] uppercase tracking-widest p-4">
                            <div className="text-slate-500">Unidad de Medida</div>
                            <div className="text-cyan-400 text-center">Nuestra Aeronave</div>
                            <div className="text-slate-500 text-center">Modelo Convencional</div>
                        </div>
                        {[
                            { k: 'Tiempo de Vuelo Promedio', u: '38 Minutos Reales', t: '15 Minutos' },
                            { k: 'Señal en Interferencia', u: 'Codificación Cero Defecto', t: 'Pérdida de Video' },
                            { k: 'Rastreo Inteligente', u: 'ActiveTrack Automático', t: 'Vuelo Manual Único' },
                            { k: 'Material Chasis', u: 'Aleación Ultraligera 249g', t: 'Plástico Pesado (+400g)' }
                        ].map((r, i) => (
                            <div key={i} className="grid grid-cols-3 border-b border-slate-800 p-4 text-sm hover:bg-slate-800/50 transition">
                                <div className="font-bold text-slate-400">{r.k}</div>
                                <div className="font-black text-white text-center">{r.u}</div>
                                <div className="font-bold text-slate-600 text-center">{r.t}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 11. RISK-REVERSAL WARRANTY */}
                <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
                    <div className="bg-gradient-to-r from-cyan-500/10 to-slate-900 border border-cyan-500/20 p-8 md:p-12 rounded-2xl flex flex-col md:flex-row items-center gap-8">
                        <div className="w-20 h-20 shrink-0 bg-[#01030B] border border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.4)] flex items-center justify-center rounded-full">
                            <svg className="text-cyan-400" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                        </div>
                        <div>
                            <h3 className="text-xl font-black uppercase text-white mb-2">Escudo Operativo: Cero Caídas.</h3>
                            <p className="text-xs text-slate-400 font-medium leading-relaxed">No vas a comprar promesas. Recibe la unidad sin adelantar un solo centavo, págalo directamente a tu mensajero. Tienes una cobertura de fábrica por 12 meses absolutos contra defectos de aviónica o sensores. </p>
                        </div>
                    </div>
                </div>

                {/* 12. BRAND ETHOS */}
                <div className="py-20 text-center border-y border-slate-800 bg-[#01030B] px-6 mt-10">
                    <h3 className="max-w-3xl mx-auto text-2xl md:text-3xl font-black uppercase text-[#f8fafc] leading-tight">
                        Nuestro Comando: <br/> <span className="text-cyan-500">Democratizar el Espacio Aéreo.</span>
                    </h3>
                    <p className="max-w-2xl mx-auto mt-6 text-sm text-slate-400 font-medium">Históricamente las tomas desde el cielo costaban miles de dólares en equipo pesado. Construimos este drone para que cualquier pionero con visión pueda atrapar paisajes o narrativas impresionantes desde una óptica antes inalcanzable, directamente desde su mochila y a costo radical.</p>
                </div>

                {/* 13. FAQ ACCORDIONS */}
                <div className="max-w-3xl mx-auto px-4 md:px-8 py-20">
                    <h2 className="text-2xl font-black uppercase text-center tracking-widest mb-10">Interrogatorio Frecuente (FAQ)</h2>
                    <div className="space-y-3">
                        {[
                            { q: '¿Necesito licencia de piloto para manejarlo?', a: 'Al pesar menos de 250 gramos, esquiva regulaciones estrictas de aviación civil en su mayoría, permitiéndote volarlo como hobby sin papeleos molestos de inicio.' },
                            { q: '¿Pasa algo si llueve o hay neblina densa?', a: 'Posee un nivel de tolerancia a humedad, pero no recomendamos volar bajo precipitación. El motor está blindado pero los rotores pueden perder eficiencia aerodinámica en lluvia.' },
                            { q: '¿Cómo funciona exactamente el pago Contra-Entrega?', a: 'Llenas el formulario debajo con tus coordenadas de residencia. Enviamos el equipo gratis. El currier llegará a tu casa y tú le entregarás el efectivo o usarás POS.' }
                        ].map((f, i) => (
                            <div key={i} className="bg-slate-900 border border-slate-800 overflow-hidden">
                                <button onClick={() => setFaqOpen(faqOpen===i?null:i)} className="w-full text-left px-6 py-5 flex items-center justify-between font-bold text-xs uppercase tracking-wider text-slate-200">
                                    {f.q}
                                    <span className="text-cyan-500 font-black text-lg">{faqOpen===i?'-':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {faqOpen === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 pb-5 text-xs text-slate-400 font-medium">
                                            {f.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 14. EXPANDED REVIEWS */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 pb-20 border-t border-slate-800">
                    <div className="text-center mb-12">
                        <div className="text-cyan-500 flex justify-center gap-1 mb-3">
                            {[...Array(5)].map((_,i) => <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
                        </div>
                        <h2 className="text-2xl font-black uppercase text-white">Transmisiones Recibidas</h2>
                        <span className="text-[10px] text-slate-500 tracking-widest font-bold uppercase">Operadores Verificados</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { r: "Absolutamente bestial. La conectividad no cae incluso habiendo árboles o muros alrededor de una zona montañosa. El video parece de cine.", n: "Miguel H.", t: "Hobbyist" },
                            { r: "Tengo modelos por los que pagué el triple y se comportan peor contra el viento cruzado. La cámara está estática como un trípode real.", n: "Felipe O.", t: "Film Maker" },
                            { r: "Fue mi primer vuelo y en 10 minutos ya sentía que era profesional. Los sensores automáticos me salvaron de chocar un muro seguro.", n: "Carla T.", t: "Travel Vlogger" }
                        ].map((rev, i) => (
                            <div key={i} className="p-6 bg-slate-900 border border-slate-800 relative">
                                <div className="absolute top-4 right-4 text-slate-700">✓</div>
                                <p className="text-xs text-slate-400 font-medium leading-relaxed italic mb-6">"{rev.r}"</p>
                                <div className="flex gap-3 items-center">
                                    <div className="w-8 h-8 rounded-sm bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-black">{(rev.n).charAt(0)}</div>
                                    <div>
                                        <div className="text-[10px] font-black uppercase text-slate-200">{rev.n}</div>
                                        <div className="text-[9px] uppercase font-bold text-slate-500">{rev.t}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 15. CHECKOUT */}
                <div id="checkout-drone" className="py-24 bg-[#01030B] border-t border-cyan-500/20 relative">
                    <div className="absolute top-0 left-0 w-32 h-[1px] bg-cyan-500 shadow-[0_0_20px_#06b6d4]"></div>
                    <div className="absolute bottom-0 right-0 w-32 h-[1px] bg-cyan-500 shadow-[0_0_20px_#06b6d4]"></div>
                    <div className="max-w-3xl mx-auto px-4 md:px-8">
                        <div className="text-center mb-10">
                            <h3 className="text-4xl font-black uppercase text-white mb-2" style={{ textShadow: '0 0 15px rgba(6,182,212,0.3)' }}>Asignación Exclusiva</h3>
                            <p className="text-slate-400 text-sm font-medium">Ingresa tus coordenadas para recibir el equipamiento. <strong className="text-cyan-400">Total a Pagar en Domicilio: {fmtPrice(product.price)}</strong></p>
                        </div>
                        <div className="bg-slate-900 p-8 md:p-12 border border-slate-800 relative">
                            {/* Decorative crosshairs */}
                            <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-slate-600"></div>
                            <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-slate-600"></div>
                            
                            <form className="space-y-6" onSubmit={e => e.preventDefault()}>
                                <input type="text" className="w-full bg-[#020617] border border-slate-700 focus:border-cyan-500 text-white font-bold text-sm px-5 py-4 outline-none transition-colors" placeholder="Firma Táctica (Nombre Completo)" />
                                <input type="tel" className="w-full bg-[#020617] border border-slate-700 focus:border-cyan-500 text-white font-bold text-sm px-5 py-4 outline-none transition-colors" placeholder="Frecuencia Móvil (Teléfono)" />
                                <textarea rows={2} className="w-full bg-[#020617] border border-slate-700 focus:border-cyan-500 text-white font-bold text-sm px-5 py-4 outline-none transition-colors resize-none" placeholder="Coordenadas GPS (Dirección de envío)" />
                                <div className="pt-4">
                                    <button className="w-full h-16 bg-cyan-500 text-[#020617] uppercase tracking-[0.2em] font-black text-sm hover:bg-white transition-all shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                                        Confirmar Drop y Pagar al Recibir
                                    </button>
                                </div>
                            </form>
                            <div className="mt-6 flex items-center justify-center gap-4 text-[9px] uppercase tracking-widest text-slate-500 font-bold">
                                <span>Operación Segura SSL</span>
                                <span>•</span>
                                <span className="text-green-500">Logística Activa</span>
                            </div>
                        </div>
                    </div>
                </div>

            </main>

            {/* STICKY MOBILE CTA */}
            <div className="md:hidden fixed bottom-4 left-4 right-4 z-50">
                <div className="bg-[#020617] border border-cyan-500/50 p-3 flex items-center justify-between shadow-[0_0_30px_rgba(6,182,212,0.2)]">
                    <div className="pl-2">
                        <div className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Liquidación</div>
                        <div className="font-black text-white text-base leading-none">{fmtPrice(product.price)}</div>
                    </div>
                    <button onClick={() => document.getElementById('checkout-drone')?.scrollIntoView({ behavior: 'smooth' })} className="bg-cyan-500 px-6 py-3 font-black text-[10px] uppercase tracking-widest text-[#020617]">
                        Autorizar
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

export default PdpDroneAero;
