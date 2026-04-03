'use client';
import React, { useState } from 'react';
import { StoreData, Product } from '@/lib/types';
import EnhancedProductGallery from '@/components/pdp/EnhancedProductGallery';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { data: StoreData; product: Product; }

const PdpVirtualReality: React.FC<Props> = ({ data, product }) => {
    const [openSpecAcc, setOpenSpecAcc] = useState<number | null>(0);
    const [faqOpen, setFaqOpen] = useState<number | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const ai = product.aiContent;
    const fmtPrice = (n: number) => { const s = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); return `Gs. ${s}`; };
    
    // Aesthetic Palette: Metaverse & Synthwave
    const bg = '#05000A'; // Deep Dark Purple/Black
    const accentCyan = '#00F0FF';
    const accentMagenta = '#FF00E6';

    return (
        <div style={{ background: bg, color: '#E0E0FF', fontFamily: "'Space Grotesk', 'Inter', sans-serif" }} className="overflow-x-hidden selection:bg-[#FF00E6]/30 antialiased relative">
            
            {/* 0. AMBIENT GLITCH/GRID */}
            <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]">
                <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(${accentCyan} 1px, transparent 1px), linear-gradient(90deg, ${accentMagenta} 1px, transparent 1px)`, backgroundSize: '60px 60px', transform: 'perspective(500px) rotateX(60deg) translateY(-100px)' }}></div>
            </div>

            {/* 1. TOP NAV */}
            <header className="sticky top-0 z-50 bg-[#05000A]/80 backdrop-blur-xl border-b border-white/5">
                <style dangerouslySetInnerHTML={{__html:`
                    .glitch-text { position: relative; display: inline-block; }
                    .glitch-text::before, .glitch-text::after { content: attr(data-text); position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0.8; z-index:-1; }
                    .glitch-text::before { left: 2px; text-shadow: -2px 0 ${accentMagenta}; animation: glitch-anim 2s infinite linear alternate-reverse; }
                    .glitch-text::after { left: -2px; text-shadow: -2px 0 ${accentCyan}; animation: glitch-anim 3s infinite linear alternate-reverse; }
                    @keyframes glitch-anim { 0% { clip-path: inset(20% 0 80% 0); } 20% { clip-path: inset(60% 0 10% 0); } 40% { clip-path: inset(10% 0 50% 0); } 60% { clip-path: inset(80% 0 5% 0); } 80% { clip-path: inset(30% 0 40% 0); } 100% { clip-path: inset(0% 0 100% 0); } }
                `}} />
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
                    <div className="text-xl font-black uppercase tracking-[0.2em] glitch-text" data-text="OASIS">OASIS</div>
                    <nav className="hidden lg:flex gap-8">
                        {['Óptica', 'Sensores', 'Testimonios'].map((item) => (
                            <a key={item} href={`#${item.toLowerCase()}`} className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#A0A0FF] hover:text-[#00F0FF] transition-colors relative group">
                                {item}
                                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-[#00F0FF] transition-all group-hover:w-full"></span>
                            </a>
                        ))}
                    </nav>
                </div>
            </header>

            <main className="relative z-10">
                {/* 2. BREADCRUMBS & MICRO-LOGISTICS */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 pb-4">
                    <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-widest text-[#606080]">
                        <div>/SYS/Hardware/ <span className="text-white">{product.title.substring(0, 20)}...</span></div>
                        <div className="flex items-center gap-2 border border-[#FF00E6]/30 bg-[#FF00E6]/5 px-3 py-1.5 text-[#FF00E6]">
                            <svg className="animate-pulse" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                            Enlace Rápido: Despacho 24H
                        </div>
                    </div>
                </div>

                {/* 3. HERO SECTION */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 lg:py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="lg:col-span-5 relative">
                            {/* Hologram glow effect */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#00F0FF]/15 via-transparent to-transparent pointer-events-none blur-2xl"></div>
                            <div className="relative border border-white/5 bg-black/40 rounded-xl p-4 overflow-hidden backdrop-blur-sm">
                                <EnhancedProductGallery product={product} accentColor={accentCyan} />
                                <div className="absolute bottom-4 left-4 bg-black/60 font-mono text-[9px] text-[#00F0FF] p-2 border border-[#00F0FF]/20 backdrop-blur-md">
                                    [ RENDER_PHASE: ACTIVE ]
                                </div>
                            </div>
                        </motion.div>

                        <div className="lg:col-span-7 flex flex-col justify-center relative pl-0 lg:pl-10">
                            {/* Rating */}
                            <div className="flex items-center gap-2 mb-6 font-mono text-xs text-[#A0A0FF]">
                                <div className="flex text-[#FF00E6]">
                                    {[...Array(5)].map((_,i) => <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
                                </div>
                                <span>{'<'} 4.8 / 5.0 RATIO {'>'}</span>
                            </div>
                            
                            <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-none mb-6 text-white" style={{ textShadow: `2px 2px 0px ${accentMagenta}, -2px -2px 0px ${accentCyan}` }}>
                                {ai?.enhancedTitle || product.title}
                            </h1>
                            <p className="text-sm md:text-base font-medium text-[#A0A0FF] mb-10 max-w-xl leading-relaxed">
                                {ai?.enhancedDescription || product.description || 'Abandona la realidad estándar. Paneles Micro-OLED duales con 4K por ojo. Lentes Pancake para cero fatiga visual.'}
                            </p>

                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
                                <div>
                                    <span className="text-4xl md:text-5xl font-bold tracking-tighter text-white">{fmtPrice(product.price)}</span>
                                    {product.originalPrice && <div className="text-sm font-bold text-white/30 line-through mt-1 font-mono">{fmtPrice(product.originalPrice)}</div>}
                                </div>
                                <button onClick={() => document.getElementById('checkout-vr')?.scrollIntoView({ behavior: 'smooth' })} className="w-full sm:w-auto flex-1 h-[64px] bg-gradient-to-r from-[#00F0FF] to-[#FF00E6] text-white font-bold uppercase tracking-[0.2em] text-sm hover:opacity-90 transition-opacity rounded-sm relative group overflow-hidden">
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                                        Iniciar Inmersión
                                    </span>
                                </button>
                            </div>

                            {/* 4. TRUST BADGES */}
                            <div className="flex font-mono text-[9px] uppercase tracking-widest text-[#00F0FF] border-t border-white/10 pt-4 gap-6">
                                <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 bg-[#00F0FF] rounded-full"></div> Setup PC-Free</span>
                                <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 bg-[#FF00E6] rounded-full"></div> Safe-Delivery</span>
                                <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 bg-[#00F0FF] rounded-full"></div> 1YR Warranty</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 5. ABOVE FOLD DETAILS (ACCORDIONS) */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 pb-10">
                    <div className="border border-white/5 bg-white/[0.02] backdrop-blur-md rounded-lg overflow-hidden">
                        {[
                            { t: 'Especificaciones Ópticas', a: 'Resolución 4K+ por ojo (2160x2160). Lentes Pancake ultradelgadas que eliminan el efecto "malla" y expanden el FOV a 115 grados.' },
                            { t: 'Sensores de Rastreo (6DoF)', a: 'Cuatro cámaras de rastreo "inside-out" mapean tu entorno físico sin necesidad de faros externos. Escaneo de manos y pupilas en tiempo real.' },
                            { t: 'Logística de Portal', a: 'Te enviamos el producto de forma 100% segura. Solo debes desembolsar el pago cuando el paquete llegue físicamente al punto de encuentro acordado.' }
                        ].map((ac, i) => (
                            <div key={i} className="border-b border-white/10 last:border-0">
                                <button onClick={() => setOpenSpecAcc(openSpecAcc===i?null:i)} className="w-full text-left px-6 py-4 flex items-center justify-between font-mono text-xs font-bold uppercase tracking-widest text-[#E0E0FF] hover:bg-white/[0.05] transition-colors">
                                    {ac.t} 
                                    <span className={`text-[#FF00E6] transition-transform ${openSpecAcc===i?'rotate-45':''}`}>[+]</span>
                                </button>
                                <AnimatePresence>
                                    {openSpecAcc === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 pb-4 font-mono text-[11px] text-[#A0A0FF] leading-relaxed">
                                            {ac.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 6. ENDLESS MARQUEE */}
                <div className="w-[100vw] overflow-hidden py-3 bg-[#FF00E6] border-y border-[#FF00E6]/50 relative left-[50%] -translate-x-[50%]">
                    <div className="flex whitespace-nowrap animate-marquee font-bold uppercase text-xs md:text-sm tracking-[0.4em] text-white">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="flex items-center gap-12 px-6">
                                <span>LATENCIA SUB-10MS</span><span>×</span>
                                <span>WIRELESS FREEDOM</span><span>×</span>
                                <span>AUDIO ESPACIAL 3D</span><span>×</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 7. WHY TO USE / BENEFITS */}
                <div id="óptica" className="max-w-7xl mx-auto px-4 md:px-8 py-24">
                    <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tighter text-center mb-16">
                        El hardware que <span className="text-[#00F0FF]">doblega</span> la realidad.
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { ic: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>, t: 'Lentes Pancake 4K', d: 'El peso se reduce al 50%. A diferencia de lentes Fresnel antiguas, nuestra óptica te da bordes nítidos sin el terrible destello ni fatiga.' },
                            { ic: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>, t: 'Bypass de Realidad', d: 'Doble click lateral te permite ver tu cuarto en "Full-Color Passthrough". Podrás agarrar tu agua o celular sin sacarte el casco.' },
                            { ic: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="8 12 12 16 16 12"/><line x1="12" y1="8" x2="12" y2="16"/></svg>, t: 'Control Háptico', d: 'Los mandos no solo vibran, "empujan". Siente la resistencia de un arco o el retroceso metálico con una precisión de milisegundos.' }
                        ].map((b, i) => (
                            <div key={i} className="bg-white/[0.02] border border-white/5 p-8 rounded-2xl text-center group hover:border-[#00F0FF]/50 transition-colors">
                                <div className="w-16 h-16 rounded-full bg-[#00F0FF]/10 text-[#00F0FF] mx-auto flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <div className="w-8 h-8">{b.ic}</div>
                                </div>
                                <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-4">{b.t}</h3>
                                <p className="text-sm font-medium text-[#A0A0FF] leading-relaxed">{b.d}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 8. HOW TO USE (VISUAL GUIDE) */}
                <div id="sensores" className="bg-black py-24 relative border-y border-white/10">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-20"></div>
                    <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                        <h2 className="text-2xl font-mono uppercase tracking-widest text-center text-[#FF00E6] mb-16">{'<'} Protocol_Start {'>'}</h2>
                        <div className="flex flex-col md:flex-row gap-8">
                            {[
                                { s: '01', t: 'Póntelo.', d: 'La correa elohipita se ajusta al girar la rueda trasera, estabilizando el peso y liberando tu nariz de presión.' },
                                { s: '02', t: 'Traza.', d: 'Usa el mando como láser para dibujar el perímetro seguro en tu propio piso físico. El sensor lo guardará.' },
                                { s: '03', t: 'Transfiere.', d: 'Sin cables complicados. Accede al HUB principal y lanza tu simulación de forma visceral e instantánea.' }
                            ].map((s, i) => (
                                <div key={i} className="flex-1 border border-white/10 bg-[#05000A] p-6 relative">
                                    <div className="text-[#00F0FF]/20 font-bold text-7xl font-mono absolute top-2 right-4 pointer-events-none">{s.s}</div>
                                    <div className="text-[10px] uppercase font-mono text-[#00F0FF] mb-4">Step_{s.s}</div>
                                    <h4 className="text-xl font-bold uppercase text-white mb-2">{s.t}</h4>
                                    <p className="text-sm text-[#A0A0FF] font-medium leading-relaxed">{s.d}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 9. DEEP DIVE MULTIMEDIA */}
                <div className="py-32 relative text-center min-h-[40vh] flex flex-col items-center justify-center overflow-hidden">
                    <div className="absolute w-[600px] h-[600px] border border-[#FF00E6]/20 rounded-full flex items-center justify-center">
                        <div className="w-[400px] h-[400px] border border-[#00F0FF]/20 rounded-full flex items-center justify-center">
                            <div className="w-[200px] h-[200px] border border-[#FF00E6]/30 rounded-full"></div>
                        </div>
                    </div>
                    <div className="relative z-10 max-w-3xl px-6">
                        <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter text-white mb-6">Mapeo del Espacio en Tiempo Real</h2>
                        <p className="text-lg text-[#A0A0FF] font-medium leading-relaxed">No vas a chocar con tus muebles. El sistema crea una cuadrícula holográfica si te aproximas peligrosamente a la pared de tu sala. Inmersión del 100%, riesgo del 0%.</p>
                    </div>
                </div>

                {/* 10. COMPARISON TABLE */}
                <div className="max-w-4xl mx-auto px-4 md:px-8 py-20 border-t border-white/10">
                    <h2 className="text-3xl font-bold uppercase tracking-tighter text-center mb-12 text-white">Nosotros VS Ellos.</h2>
                    <div className="border border-white/20 bg-white/[0.02] backdrop-blur-md rounded-2xl overflow-hidden">
                        <div className="grid grid-cols-3 bg-black/60 border-b border-white/10 p-5 font-mono text-[9px] uppercase tracking-widest text-[#A0A0FF]">
                            <div>Hardware Spec</div>
                            <div className="text-[#00F0FF] text-center">Nuestra VR</div>
                            <div className="text-center">VR Antiguo (Gen 1)</div>
                        </div>
                        {[
                            { k: 'Cableado Requerido', u: 'Completamente Standalone', t: 'Cables HDMI y USB gruesos amarrados al PC' },
                            { k: 'Resolución Óptica', u: 'Doble Panel 4K Micro-OLED', t: 'Un solo panel LCD (Se ven los pixeles)' },
                            { k: 'Frecuencia Refresco', u: 'Constantes 120Hz (Cero Mareos)', t: '72Hz (Causa cinetosis)' },
                            { k: 'Tasa de Latencia', u: '< 10 Milisegundos', t: '50+ Milisegundos' }
                        ].map((r, i) => (
                            <div key={i} className="grid grid-cols-3 p-5 border-b border-white/5 items-center hover:bg-white/[0.05] transition-colors">
                                <div className="font-bold text-white text-xs md:text-sm">{r.k}</div>
                                <div className="text-center font-bold text-[#00F0FF] text-sm">{r.u}</div>
                                <div className="text-center font-medium text-white/30 text-xs line-through">{r.t}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 11. RISK REVERSAL WARRANTY */}
                <div className="max-w-4xl mx-auto px-4 md:px-8 py-16">
                    <div className="bg-gradient-to-r from-black to-[#100020] border border-[#FF00E6]/30 p-8 md:p-12 rounded-3xl shadow-[0_0_50px_rgba(255,0,230,0.1)] flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-[200px] h-full bg-[#FF00E6]/10 blur-[100px]"></div>
                        <div className="w-20 h-20 bg-black border border-[#FF00E6] rounded-2xl flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(255,0,230,0.5)] z-10">
                            <svg className="text-[#FF00E6]" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                        </div>
                        <div className="text-center md:text-left z-10">
                            <h3 className="text-2xl font-bold uppercase text-white tracking-widest mb-2">Protocolo de Confianza (Garantía)</h3>
                            <p className="text-sm font-medium text-[#A0A0FF] leading-relaxed">No vas a soltar dinero ciegamente en internet. Recibe la unidad en tu hogar por medio de nuestro personal capacitado y pagas exacto lo que figura aquí en formato Contra-Entrega. 1 año absoluto contra fallos internos de hardware.  </p>
                        </div>
                    </div>
                </div>

                {/* 12. BRAND ETHOS */}
                <div className="py-24 border-y border-white/10 bg-[#020005] text-center mt-12 px-6">
                    <h3 className="text-3xl md:text-5xl font-bold uppercase text-white tracking-tighter mb-6 glitch-text" data-text="La Pantalla Muerda.">
                        La Pantalla <span className="text-[#00F0FF]">Muere.</span>
                    </h3>
                    <p className="max-w-2xl mx-auto text-lg text-[#A0A0FF] font-medium leading-relaxed">Jugar frente a un monitor de 27 pulgadas es asomarse a una ventana. Construimos este portal para que entres por la ventana. Queremos democratizar la verdadera inmersión espacial sin computadoras costosas.</p>
                </div>

                {/* 13. FAQ */}
                <div className="max-w-3xl mx-auto px-4 md:px-8 py-24">
                    <h2 className="text-3xl font-mono uppercase tracking-widest text-[#FF00E6] text-center mb-12">{'<'} Interrogantes {'>'}</h2>
                    <div className="space-y-4">
                        {[
                            {q: '¿Uso lentes físicos. Me molestará el visor?', a: 'El diseño facial incorpora un espaciador magnético que aleja las lentes 5mm. Puedes usar tus gafas habituales dentro del casco cómodamente sin que rocen las ópticas.'},
                            {q: '¿Puede marear a primerizos?', a: 'La latencia por debajo de los 10ms y los 120Hz reales han eliminado el 95% de la cinetosis (mareo virtual). Te recomendamos empezar con experiencias estáticas los primeros 20 minutos.'},
                            {q: '¿Qué formas de pago Contra Entrega aceptan?', a: 'Efectivo o Transferencia vía código directamente al mensajero, justo en la puerta de tu hogar tras confirmarte visualmente la entrega del paquete cerrado.'}
                        ].map((f, i) => (
                            <div key={i} className="bg-black/50 border border-white/20 rounded-xl overflow-hidden backdrop-blur-sm">
                                <button onClick={() => setFaqOpen(faqOpen===i?null:i)} className="w-full text-left px-6 py-5 flex items-center justify-between font-bold text-white text-sm">
                                    {f.q}
                                    <span className="text-[#00F0FF] font-mono font-bold">{faqOpen===i?'[-]':'[+]'}</span>
                                </button>
                                <AnimatePresence>
                                    {faqOpen === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 pb-5 text-sm font-medium text-[#A0A0FF] leading-relaxed">
                                            {f.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 14. EXPANDED REVIEWS */}
                <div id="testimonios" className="max-w-7xl mx-auto px-4 md:px-8 py-16 border-t border-white/10">
                    <h2 className="text-3xl font-bold text-white uppercase tracking-tighter text-center mb-16">Data Colectada (Reseñas)</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { r: "Probé el primer casco en 2016 y me mareaba. Esto es otra bestia. La nitidez de los lentes pancake hace que puedas leer texto minúsculo dentro del juego como si estuvieras en tu oficina.", n: "David Ortega" },
                            { r: "El seguimiento de manos es brujería pura. Puedo dejar los controles en la mesa y usar mis propios dedos para interactuar con el menú espacial. Funciona de 10.", n: "Sara Giménez" },
                            { r: "Dejaron de cobrarme caro por conectividad loca. Pagué el casco, llegó en su caja inmaculada al día siguiente y le di la plata al chico. Jugué 4 horas seguidas.", n: "Javier V." }
                        ].map((rev, i) => (
                            <div key={i} className="bg-black border border-white/10 p-8 rounded-2xl relative">
                                <div className="absolute top-0 right-8 w-12 h-[2px] bg-[#FF00E6]"></div>
                                <div className="text-[#00F0FF] flex gap-1 mb-6">
                                    {[...Array(5)].map((_,x)=><svg key={x} width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
                                </div>
                                <p className="text-sm font-medium text-[#A0A0FF] leading-relaxed mb-6">"{rev.r}"</p>
                                <div className="text-xs font-bold text-white uppercase tracking-widest">{rev.n}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 15. CHECKOUT */}
                <div id="checkout-vr" className="py-24 max-w-4xl mx-auto px-4 md:px-8 mt-12 mb-20 relative">
                    <div className="absolute inset-0 bg-[#00F0FF]/5 blur-[100px] pointer-events-none"></div>
                    <div className="bg-[#020005]/80 backdrop-blur-xl border border-[#00F0FF]/30 p-8 md:p-12 rounded-3xl relative z-10 shadow-[0_0_50px_rgba(0,240,255,0.1)]">
                        <div className="text-center mb-10">
                            <h3 className="text-3xl font-bold uppercase text-white tracking-widest mb-4">Inicialización de Venta</h3>
                            <p className="text-[#A0A0FF] font-medium text-sm">Reserva la terminal rellenando estos parámetros y ejecuta el pago solo tras tenerla en tus manos físicas. <br/><strong className="text-[#00F0FF] block mt-2 text-xl">{fmtPrice(product.price)}</strong></p>
                        </div>
                        <form className="space-y-4" onSubmit={e=>e.preventDefault()}>
                            <input type="text" className="w-full bg-black/50 border border-white/20 focus:border-[#FF00E6] rounded-xl text-white font-mono text-sm px-6 py-4 outline-none transition-colors" placeholder="NOMBRE // IDENTIFICADOR" />
                            <input type="tel" className="w-full bg-black/50 border border-white/20 focus:border-[#FF00E6] rounded-xl text-white font-mono text-sm px-6 py-4 outline-none transition-colors" placeholder="COMUNICACIÓN // WHATSAPP" />
                            <textarea rows={2} className="w-full bg-black/50 border border-white/20 focus:border-[#FF00E6] rounded-xl text-white font-mono text-sm px-6 py-4 outline-none transition-colors resize-none" placeholder="COORDENADAS FÍSICAS // DIRECCIÓN LOCAL" />
                            <div className="pt-6">
                                <button className="w-full h-[70px] bg-white text-black font-bold uppercase tracking-[0.2em] text-sm rounded-xl hover:bg-[#00F0FF] transition-all flex items-center justify-center gap-3">
                                    Conceder Acceso al Portal
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

            </main>

            {/* STICKY MOBILE CTA */}
            <div className="md:hidden fixed bottom-6 left-4 right-4 z-50">
                <div className="bg-[#05000A] border border-[#FF00E6]/50 rounded-2xl p-4 flex items-center justify-between shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-md">
                    <div className="pl-2">
                        <div className="text-[9px] font-mono uppercase text-[#A0A0FF] tracking-widest">En Efectivo (COD)</div>
                        <div className="font-bold text-white text-lg leading-none mt-1">{fmtPrice(product.price)}</div>
                    </div>
                    <button onClick={() => document.getElementById('checkout-vr')?.scrollIntoView({ behavior: 'smooth' })} className="bg-gradient-to-r from-[#00F0FF] to-[#FF00E6] text-white rounded-lg px-6 py-3 font-bold uppercase tracking-widest text-[11px]">
                        Iniciar
                    </button>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{__html: `
                @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
                .animate-marquee { animation: marquee 15s linear infinite; }
            `}} />
        </div>
    );
};

export default PdpVirtualReality;
