'use client';
import React, { useState } from 'react';
import { StoreData, Product } from '@/lib/types';
import EnhancedProductGallery from '@/components/pdp/EnhancedProductGallery';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { data: StoreData; product: Product; }

const PdpActionCam: React.FC<Props> = ({ data, product }) => {
    const [openSpecAcc, setOpenSpecAcc] = useState<number | null>(0);
    const [faqOpen, setFaqOpen] = useState<number | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const ai = product.aiContent;
    const fmtPrice = (n: number) => { const s = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); return `Gs. ${s}`; };
    
    // Aesthetic Palette: Extreme Sports (Dust, Yellow, Black)
    const bg = '#121212';
    const accent = '#FACC15'; // Yellow 400
    const cardBg = '#1E1E1E';
    
    return (
        <div style={{ background: bg, color: '#f3f4f6', fontFamily: "'Bebas Neue', 'Inter', sans-serif" }} className="overflow-x-hidden selection:bg-yellow-400 selection:text-black antialiased">
            
            {/* 0. AMBIENT DIRT TEXTURE */}
            <div className="fixed inset-0 pointer-events-none z-0 opacity-10" style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/dust.png')` }}></div>

            {/* 1. TOP NAV */}
            <header className="sticky top-0 z-50 bg-[#121212]/90 backdrop-blur-sm border-b-4 border-yellow-400">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between font-sans">
                    <div className="text-2xl font-black italic tracking-tighter text-white uppercase transform -skew-x-12">
                        EXTREME<span className="text-yellow-400">CATCH</span>
                    </div>
                    <nav className="hidden lg:flex gap-8">
                        {['Resistencia', 'Lente', 'Montura'].map((item) => (
                            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-black tracking-widest uppercase text-zinc-400 hover:text-yellow-400 transition-colors transform -skew-x-12">
                                // {item}
                            </a>
                        ))}
                    </nav>
                </div>
            </header>

            <main className="relative z-10 font-sans">
                {/* 2. BREADCRUMBS & MICRO-LOGISTICS */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 pb-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
                        <div className="text-xs font-black uppercase tracking-widest text-zinc-500">
                            ACCIÓN / VIDEO / <span className="text-white bg-black px-1 border border-yellow-400 transform -skew-x-12 inline-block shadow-[2px_2px_0_#FACC15]">{product.title.substring(0, 15)}...</span>
                        </div>
                        <div className="inline-flex items-center gap-2 bg-yellow-400 text-black px-4 py-2 font-black uppercase text-sm tracking-widest transform -skew-x-12 shadow-[4px_4px_0_#FACC15]">
                            <svg className="animate-spin-slow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
                            LOGÍSTICA EXTREMA 24/48H
                        </div>
                    </div>
                </div>

                {/* 3. HERO */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 lg:py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <motion.div initial={{ opacity: 0, x: -50, rotate: -5 }} animate={{ opacity: 1, x: 0, rotate: 0 }} transition={{ duration: 0.8 }} className="relative bg-black border-4 border-zinc-800 p-2 shadow-[20px_20px_0_rgba(250,204,21,0.2)]">
                            <EnhancedProductGallery product={product} accentColor={accent} />
                            {/* Hazard tape elements */}
                            <div className="absolute -top-4 -left-4 w-32 h-8 bg-[repeating-linear-gradient(45deg,#FACC15,#FACC15_10px,#000_10px,#000_20px)] border-2 border-black z-10 transform -rotate-6"></div>
                            <div className="absolute -bottom-4 -right-4 w-32 h-8 bg-[repeating-linear-gradient(45deg,#FACC15,#FACC15_10px,#000_10px,#000_20px)] border-2 border-black z-10 transform -rotate-6"></div>
                        </motion.div>

                        <div className="flex flex-col relative">
                            {/* Rating */}
                            <div className="flex items-center gap-2 mb-6">
                                <div className="flex text-yellow-400">
                                    {[...Array(5)].map((_,i) => <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
                                </div>
                                <span className="text-xs font-black text-zinc-400 uppercase tracking-widest bg-zinc-900 px-2">Aprobado en Terreno Sucio (4.9/5)</span>
                            </div>
                            
                            <h1 className="text-5xl md:text-7xl font-sans font-black uppercase tracking-tighter leading-[0.9] text-white italic mb-6">
                                {ai?.enhancedTitle || product.title}
                            </h1>
                            <p className="text-sm md:text-base font-bold text-zinc-300 mb-8 max-w-md uppercase tracking-wider leading-relaxed border-l-4 border-yellow-400 pl-4 bg-zinc-900/50 py-2">
                                {ai?.enhancedDescription || product.description || 'Hazla morder el fango. Sumergible a 10 metros nativamente. Lente 5K con recubrimiento de diamante y estabilización Hyper-Smooth. Tírate de un avión, ella seguirá grabando.'}
                            </p>

                            <div className="bg-[#1E1E1E] border-2 border-zinc-800 p-6 mb-6">
                                <div className="flex flex-col sm:flex-row sm:items-end gap-6 mb-6">
                                    <span className="text-5xl md:text-6xl font-black italic text-yellow-400">{fmtPrice(product.price)}</span>
                                    {product.originalPrice && <span className="text-xl font-black text-zinc-600 line-through pb-1 italic">{fmtPrice(product.originalPrice)}</span>}
                                </div>
                                <button onClick={() => document.getElementById('checkout-action')?.scrollIntoView({ behavior: 'smooth' })} className="w-full h-[70px] bg-yellow-400 text-black font-black text-xl uppercase tracking-widest hover:bg-white hover:shadow-[10px_10px_0_#FFF] transition-all transform -skew-x-12 shadow-[10px_10px_0_#FACC15] flex items-center justify-center gap-3">
                                    <span className="skew-x-12">Capturar Unidad</span>
                                </button>
                            </div>

                            {/* 4. TRUST BADGES FAST */}
                            <div className="grid grid-cols-3 gap-2 mt-2">
                                {[
                                    {i: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z', t: 'Batería Enduro'},
                                    {i: 'M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z', t: 'Coraza Titanio'},
                                    {i: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4', t: 'Paga al Recibir'}
                                ].map((b, i) => (
                                    <div key={i} className="flex flex-col items-center justify-center p-3 text-center border border-zinc-800 bg-[#1A1A1A]">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FACC15" strokeWidth="2.5" className="mb-2"><path strokeLinecap="round" strokeLinejoin="round" d={b.i}/></svg>
                                        <span className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">{b.t}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 5. EXPANDABLE DETAILS ABOVE FOLD */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 pb-16 mt-8">
                    <div className="border border-zinc-800 bg-[#1E1E1E]">
                        {[
                            { t: 'Blindaje Sumergible Nativo', a: 'No requiere carcasa externa plástica que arruina el audio. Totalmente estanca hasta 33 pies (10m) desde que la sacas de la caja.' },
                            { t: 'Sensor Mágico 5K', a: 'Censor 1/1.9". Extrae cuadros fijos de 24MP directamente del video. Soporta HDR y 10-Bit Color para corrección en post de Davinci Resolve.' },
                            { t: 'Procedimiento de Compra Zero-Risk', a: 'Completa la orden y aguarda nuestro cadete. Destapa el empaque en la calle, valida que esté intacta, y recién sueltas el dinero.' }
                        ].map((ac, i) => (
                            <div key={i} className="border-b border-zinc-800 last:border-0 hover:bg-zinc-800 transition-colors">
                                <button onClick={() => setOpenSpecAcc(openSpecAcc===i?null:i)} className="w-full text-left py-5 px-6 flex items-center justify-between text-xs font-black uppercase tracking-widest text-white">
                                    <div className="flex items-center gap-3">
                                        <span className="text-yellow-400 bg-black px-2">{i+1}</span>
                                        <span className="italic">{ac.t}</span>
                                    </div>
                                    <span className="text-yellow-400 text-xl font-bold">{openSpecAcc===i?'-':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {openSpecAcc === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="pb-6 px-6 pl-14 text-[13px] font-bold text-zinc-400 uppercase tracking-wider leading-relaxed">
                                            // {ac.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 6. ENDLESS MARQUEE */}
                <div className="w-[100vw] overflow-hidden py-4 bg-[repeating-linear-gradient(45deg,#FACC15,#FACC15_40px,#EAB308_40px,#EAB308_80px)] border-y-8 border-black relative left-[50%] -translate-x-[50%] transform rotate-1">
                    <div className="flex whitespace-nowrap animate-marquee font-black uppercase text-3xl tracking-tighter text-black italic">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="flex items-center gap-8 px-6">
                                <span>HYPERSMOOTH 6.0</span><span>×</span>
                                <span>240.FPS_SLOW.MO</span><span>×</span>
                                <span>HORIZON.LOCK</span><span>×</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 7. WHY TO USE / BENEFITS */}
                <div id="resistencia" className="max-w-7xl mx-auto px-4 md:px-8 py-24">
                    <h2 className="text-5xl md:text-7xl font-sans font-black uppercase tracking-tighter text-center mb-20 italic">No es para <span className="text-yellow-400">Suaves.</span></h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { ic: '🏔️', t: 'Soporta el Frío', d: 'La Batería Enduro de estado sólido funciona a niveles óptimos incluso si estás bajo cero esquiando. No se va a apagar de la nada.' },
                            { ic: '⚖️', t: 'Bloqueo Horizonte', d: 'Gira la cámara 360 grados en caída libre y el software mantendrá la línea del horizonte nivelada como si tuvieras un gimbal de Hollywood.' },
                            { ic: '💥', t: 'Cristal Templado 9H', d: 'La cubierta del lente no es plástico. Repele agua y resiste rebotes de grava y barro crudo a 80km/h.' }
                        ].map((b, i) => (
                            <div key={i} className="bg-[#1a1a1a] border-4 border-black border-t-yellow-400 p-8 shadow-[10px_10px_0_#FFF] hover:shadow-[10px_10px_0_#FACC15] transform hover:-translate-y-2 transition-all">
                                <div className="text-5xl mb-6 bg-black inline-block p-4">{b.ic}</div>
                                <h3 className="text-2xl font-black uppercase tracking-tighter text-white mb-4 italic">{b.t}</h3>
                                <p className="text-sm font-bold text-zinc-400 leading-relaxed uppercase">{b.d}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 8. HOW TO USE (VISUAL GUIDE) */}
                <div id="montura" className="bg-yellow-400 text-black py-24 border-y-8 border-black">
                    <div className="max-w-7xl mx-auto px-4 md:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic border-4 border-black inline-block px-6 py-2 shadow-[15px_15px_0_#000]">3 Steps To Drop</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative items-start">
                            {[
                                { s: '01', t: 'Ancla', d: 'Usa las patas universales inferiores y atorníllala al clip de pecho, casco o dron de carreras FPV.' },
                                { s: '02', t: 'Grita', d: 'Ni toques el táctil. Dí: "ActionCam, Inicia Grabación" y su mic filtrará el viento para escucharte e iniciar.' },
                                { s: '03', t: 'Sube', d: 'Conéctala a la pared y los clips subirán solitos a la nube en 10-Bit mientras editas un reel directo desde el cel.' }
                            ].map((s, i) => (
                                <div key={i} className="flex flex-col p-8 border-4 border-black bg-white shadow-[10px_10px_0_#000] transform -rotate-1 relative">
                                    <div className="text-7xl font-black italic text-zinc-100 absolute top-2 right-4 pointer-events-none">{s.s}</div>
                                    <h4 className="text-3xl font-black uppercase tracking-widest text-black mb-4 relative z-10">{s.t}</h4>
                                    <p className="text-sm font-bold text-zinc-600 uppercase relative z-10">{s.d}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 9. DEEP DIVE MULTIMEDIA */}
                <div className="py-24 relative overflow-hidden flex items-center justify-center min-h-[50vh] bg-black">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-50"></div>
                    <div className="absolute left-0 w-full h-[2px] bg-yellow-400 rotate-12 shadow-[0_0_20px_#FACC15]"></div>
                    <div className="absolute left-0 w-full h-[2px] bg-yellow-400 -rotate-6 shadow-[0_0_20px_#FACC15]"></div>
                    
                    <div className="relative z-10 text-center max-w-3xl px-6 bg-black border-4 border-yellow-400 p-12 shadow-[20px_20px_0_#FACC15] transform -skew-x-6">
                        <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter text-white mb-6 italic transform skew-x-6">Ultra Slow-Mo 240.</h2>
                        <p className="text-base text-zinc-400 font-bold uppercase tracking-widest mb-0 transform skew-x-6">Captura el choque, la salpicadura y el barrido de polvo a un nivel celular. Congela el tiempo rodando en 2.7K y analiza tu técnica post-salto sin pixeles horribles.</p>
                    </div>
                </div>

                {/* 10. COMPARISON TABLE */}
                <div className="max-w-5xl mx-auto px-4 md:px-8 py-24">
                    <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-center italic mb-16">Tabla de Carnicería.</h2>
                    <div className="bg-[#1E1E1E] border-4 border-black shadow-[15px_15px_0_#FFF]">
                        <div className="grid grid-cols-3 bg-yellow-400 border-b-4 border-black text-black font-black uppercase text-xs md:text-sm p-4 tracking-widest">
                            <div>Métrica</div>
                            <div className="text-center italic">La Bestia</div>
                            <div className="text-center">Cámara "Sport" Genérica</div>
                        </div>
                        {[
                            { k: 'Estabilización de Magen', u: 'Óptica e IA Integrada (Rock Steady)', t: 'Sacudida inaudible (Basura)' },
                            { k: 'Rango Dinámico', u: 'HDR en Video Nivel Dios', t: 'Cielos quemados y blancos' },
                            { k: 'Montaje Nativo', u: 'Patas Plegables Incrustadas', t: 'Requiere jaula plástica de mierda' },
                            { k: 'Enfriamiento', u: 'Disipador térmico frontal', t: 'Se sobrecalienta a los 15 minutos' }
                        ].map((r, i) => (
                            <div key={i} className="grid grid-cols-3 p-5 md:p-6 border-b-2 border-zinc-800 font-bold text-xs md:text-sm items-center hover:bg-yellow-400 hover:text-black transition-colors">
                                <div className="uppercase tracking-widest">{r.k}</div>
                                <div className="font-black text-center text-sm md:text-base italic">{r.u}</div>
                                <div className="text-center font-bold text-zinc-600 line-through uppercase">{r.t}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 11. RISK REVERSAL WARRANTY */}
                <div className="max-w-5xl mx-auto px-4 md:px-8 py-12">
                    <div className="bg-black border-l-8 border-yellow-400 p-8 shadow-[10px_10px_0_rgba(250,204,21,0.2)]">
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="text-8xl font-black text-yellow-400 !font-serif">
                                !!
                            </div>
                            <div>
                                <h3 className="text-3xl font-black uppercase tracking-tighter text-white mb-4 italic">No juegas con tu billetera.</h3>
                                <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest leading-relaxed">Completa el formulario inferior y enviamos la unidad. El tipo del correo parará frente a ti, mirarás el sello de fábrica sin roto, y solo así desembucharás el efectivo. Tienes 1 año de garantía pura y dura sobre fallos de lente o placa.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 12. BRAND ETHOS */}
                <div className="py-24 bg-yellow-400 text-black border-y-8 border-black text-center mt-12 px-6">
                    <div className="max-w-3xl mx-auto">
                        <h3 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-6 italic leading-none">Graba o no<br/>pasó.</h3>
                        <p className="text-lg font-bold uppercase tracking-widest leading-relaxed border-2 border-black p-6 bg-white transform rotate-1 shadow-[10px_10px_0_#000]">Romper tu iPhone para grabar un POV en la bici es de novatos estúpidos. Forjamos el metal de este equipo para que se ahogue, se caiga en la nieve y se golpee contra ramas, mientras protege la única memoria que importa.</p>
                    </div>
                </div>

                {/* 13. FAQ */}
                <div className="max-w-4xl mx-auto px-4 md:px-8 py-24">
                    <h2 className="text-4xl font-black uppercase tracking-tighter text-center mb-16 italic">Reporte de Dudas</h2>
                    <div className="space-y-4">
                        {[
                            {q: '¿Qué memorias soporta?', a: 'Pide microSD desde V30 para asegurar que el bit-rate en 5K no se trabe. Puede leer tarjetas de hasta 1TB de almacenamiento continuo.'},
                            {q: '¿Se requiere micrófono aparte?', a: 'Viene con tres micrófonos direccionales que cancelan el ruido del viento de la moto automáticamente. Si quieres hacer VLOG, puedes comprarle el add-on Media Mod.'},
                            {q: '¿Cómo funciona el recaudo presencial?', a: 'Simple. Llenas el bunker de datos bajo. El camión pisa ruta en menos de 24H. Llega a tu zaguán, te da la caja preciosa, y tú le pasas los billetes o haces transferencia ahí mismo.'}
                        ].map((f, i) => (
                            <div key={i} className="bg-black border-2 border-zinc-800 transform hover:-skew-x-3 transition-transform">
                                <button onClick={() => setFaqOpen(faqOpen===i?null:i)} className="w-full text-left p-6 md:p-8 flex items-center justify-between font-black uppercase text-sm tracking-wider text-white">
                                    <span>{'>'} {f.q}</span>
                                    <span className="text-yellow-400 bg-zinc-900 border border-zinc-700 w-8 h-8 flex items-center justify-center font-black text-xl">{faqOpen===i?'-':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {faqOpen === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-8 pb-8 text-sm font-bold text-zinc-400 uppercase tracking-widest leading-relaxed border-t-2 border-dashed border-zinc-800 pt-6">
                                            {f.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 14. EXPANDED REVIEWS (UGC BRUTALIST) */}
                <div id="reseñas" className="max-w-7xl mx-auto px-4 md:px-8 py-16 border-t border-zinc-800">
                    <h2 className="text-5xl font-black uppercase tracking-tighter text-white mb-2 text-center italic">Hall de Fama.</h2>
                    <p className="text-center font-bold text-yellow-400 uppercase tracking-widest text-xs mb-16 px-4 py-1 bg-yellow-400/10 inline-block mx-auto">Veteranos de la Calle</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { r: "Se me soltó del casco de la moto a 90 km/h en carretera por atornillar mal. La junté, el lente tenía un rasguño asqueroso... pero le saqué la cubierta de cristal de repuesto, la cambie en 2 min y siguió grabando como si nada.", n: "Biker_X", t: "Motovlogger" },
                            { r: "Los videos bajo el agua en mis vacaciones tienen colores que aplastan al iPhone. Aparte no sudé nunca por si se me caía a la piscina.", n: "Marte_11", t: "Viajera" },
                            { r: "Excelente metodología del loco que la vendió. Metí mis datos y me llamaron al toque. A dos días estaba en mi casa, pagué cash, cero peros.", n: "Javier_Box", t: "Deportista Extremo" }
                        ].map((rev, i) => (
                            <div key={i} className="bg-[#121212] border-4 border-zinc-800 p-8 shadow-[6px_6px_0_#FACC15] relative">
                                <div className="absolute top-2 right-2 text-black bg-yellow-400 text-[10px] px-2 font-black uppercase">User_Log {i}</div>
                                <div className="text-yellow-400 flex gap-1 mb-6">
                                    {[1,2,3,4,5].map(x=><span key={x}>★</span>)}
                                </div>
                                <p className="text-sm font-bold text-zinc-300 uppercase tracking-wider leading-relaxed mb-8 italic">"{rev.r}"</p>
                                <div className="flex items-center gap-3 border-t border-zinc-800 pt-4">
                                    <div className="w-10 h-10 bg-white text-black font-black flex items-center justify-center transform -skew-x-12">{(rev.n).charAt(0)}</div>
                                    <div>
                                        <div className="font-black uppercase text-xs text-white tracking-widest">{rev.n}</div>
                                        <div className="text-[10px] uppercase font-bold text-yellow-400">{rev.t}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 15. CHECKOUT */}
                <div id="checkout-action" className="py-24 md:py-32 bg-black relative border-t-8 border-yellow-400 overflow-hidden mt-16">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dust.png')] opacity-30"></div>
                    <div className="max-w-5xl mx-auto px-4 md:px-8 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                        <div className="md:col-span-5 text-center md:text-left">
                            <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 text-white italic transform -skew-x-6">Hazte Cargo.</h3>
                            <p className="text-xs font-bold text-yellow-400 mb-8 uppercase tracking-widest bg-[#121212] p-4 border border-zinc-800 transform skew-x-6">Registra mandato. Liquidación C.O.D (Paga al mensajero).</p>
                            <div className="text-4xl md:text-6xl font-black text-white italic">{fmtPrice(product.price)}</div>
                        </div>
                        <div className="md:col-span-7">
                            <form className="bg-[#1E1E1E] border-4 border-black p-8 md:p-12 shadow-[15px_15px_0_#FFF]" onSubmit={e=>e.preventDefault()}>
                                <div className="space-y-6">
                                    <input type="text" className="w-full bg-[#121212] border-b-4 border-black focus:border-yellow-400 text-white font-black uppercase text-sm px-5 py-5 outline-none transition-colors" placeholder="IDENTIDAD (Nombre del Atleta)" />
                                    <input type="tel" className="w-full bg-[#121212] border-b-4 border-black focus:border-yellow-400 text-white font-black uppercase text-sm px-5 py-5 outline-none transition-colors" placeholder="CANAL DE VIDA (Teléfono / WA)" />
                                    <textarea rows={2} className="w-full bg-[#121212] border-b-4 border-black focus:border-yellow-400 text-white font-black uppercase text-sm px-5 py-5 outline-none transition-colors resize-none" placeholder="COORDENADAS TÁCTICAS (Dirección de Dropeo)" />
                                    <div className="pt-6">
                                        <button className="w-full h-[80px] bg-yellow-400 text-black font-black uppercase tracking-[0.3em] text-lg lg:text-xl border-4 border-black hover:bg-white transition-colors transform -skew-x-6 shadow-[10px_10px_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none">
                                            <span className="skew-x-6 block">Confirmar Operación</span>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </main>

            {/* STICKY MOBILE CTA */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
                <div className="bg-black border-t-4 border-yellow-400 flex flex-row">
                    <div className="flex-1 p-4 flex flex-col justify-center">
                        <div className="text-[10px] font-black uppercase tracking-widest text-zinc-500">PAGO A LA ENTREGA</div>
                        <div className="font-black text-white text-xl italic">{fmtPrice(product.price)}</div>
                    </div>
                    <button onClick={() => document.getElementById('checkout-action')?.scrollIntoView({ behavior: 'smooth' })} className="bg-yellow-400 text-black font-black uppercase text-[11px] tracking-widest px-8 shadow-[inset_4px_0_0_#000] flex items-center justify-center transform -skew-x-12 relative right-[-10px] w-2/5">
                        <span className="skew-x-12 block">CAPTÚRALO</span>
                    </button>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{__html: `
                @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
                .animate-marquee { animation: marquee 8s linear infinite; }
            `}} />
        </div>
    );
};

export default PdpActionCam;
