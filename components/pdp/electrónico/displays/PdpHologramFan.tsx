'use client';
import React, { useState } from 'react';
import { StoreData, Product } from '@/lib/types';
import EnhancedProductGallery from '@/components/pdp/EnhancedProductGallery';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { data: StoreData; product: Product; }

const PdpHologramFan: React.FC<Props> = ({ data, product }) => {
    const [openSpecAcc, setOpenSpecAcc] = useState<number | null>(0);
    const [faqOpen, setFaqOpen] = useState<number | null>(null);
    const ai = product.aiContent;
    const fmtPrice = (n: number) => { const s = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); return `Gs. ${s}`; };
    
    // Aesthetic Palette: Cyberpunk Commercial / Neon Dark
    const bg = '#0f172a'; // Slate 900
    const textMain = '#f8fafc'; // Slate 50
    const accentCyan = '#06b6d4'; // Cyan 500

    return (
        <div style={{ background: bg, color: textMain, fontFamily: "'Inter', sans-serif" }} className="overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200 antialiased">
            
            {/* 0. AMBIENT HOLOGRAPHIC GLOW */}
            <div className="absolute top-0 right-0 w-[80%] h-[1000px] bg-gradient-to-bl from-cyan-900/30 via-fuchsia-900/20 to-transparent pointer-events-none z-0 mix-blend-screen"></div>
            <div className="fixed top-20 left-10 w-[600px] h-[600px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none z-0"></div>

            {/* 1. TOP NAV (Cyber Display) */}
            <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-2xl border-b border-cyan-500/20">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-fuchsia-500 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                        </div>
                        <span className="font-bold text-xl tracking-widest text-white uppercase">HOLO<span className="font-light text-cyan-400">VISION</span></span>
                    </div>
                </div>
            </header>

            <main className="relative z-10 w-full overflow-hidden">
                {/* 2. BREADCRUMBS & LOGISTICS */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6 pb-2">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 px-4 py-2 rounded-full border border-cyan-500/20 inline-flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
                            DISPLAYS / 3D HOLOGRAPHIC / <span className="text-white">{product.title.substring(0, 15)}...</span>
                        </div>
                        <div className="inline-flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-800 px-4 py-2 rounded-full border border-slate-700">Logística Física • PAGO AL RELEVO</div>
                    </div>
                </div>

                {/* 3. HERO SECTION (NEON CYBER CORE) */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 lg:py-16 relative">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
                        <div className="flex flex-col relative z-20 lg:col-span-5">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="flex gap-1 items-center bg-fuchsia-500/10 border border-fuchsia-500/30 px-3 py-1.5 rounded-full backdrop-blur-md">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#d946ef" strokeWidth="2"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.9 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
                                    <span className="text-[10px] font-bold text-fuchsia-400 uppercase tracking-widest ml-1">Retención de Tráfico +400%</span>
                                </span>
                            </div>
                            
                            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white leading-[1.1] mb-6 uppercase">
                                {ai?.enhancedTitle || "Proyector Holográfico 3D Elite"}
                            </h1>
                            <p className="text-base md:text-lg font-medium text-slate-400 mb-10 leading-relaxed max-w-lg">
                                {ai?.enhancedDescription || "Rompe la ceguera publicitaria. Cientos de LEDs rotando a velocidades extremas para proyectar hologramas 3D flotantes en el aire. La herramienta definitiva para dueños de negocios."}
                            </p>

                            <div className="bg-slate-800/50 backdrop-blur-xl rounded-[2rem] p-8 relative border border-slate-700 shadow-2xl">
                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-[2rem] pointer-events-none"></div>
                                <div className="flex flex-col sm:flex-row sm:items-end gap-6 mb-8 relative z-10">
                                    <span className="text-5xl font-black text-cyan-400 tracking-tight">{fmtPrice(product.price)}</span>
                                    {product.originalPrice && <span className="text-lg font-medium text-slate-500 line-through pb-1">{fmtPrice(product.originalPrice)}</span>}
                                </div>
                                <button onClick={() => document.getElementById('checkout-action')?.scrollIntoView({ behavior: 'smooth' })} className="w-full h-[64px] bg-cyan-500 text-slate-900 font-black uppercase tracking-[0.2em] text-[12px] rounded-2xl hover:bg-white transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(6,182,212,0.4)]">
                                    Adquirir Tecnología
                                </button>
                                <div className="flex items-center justify-center gap-2 mt-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> Transacción Física Analógica
                                </div>
                            </div>
                        </div>

                        <div className="relative z-10 lg:col-span-7 flex items-center justify-center">
 <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="w-full max-w-[600px] relative bg-black rounded-[3rem] shadow-[0_0_80px_rgba(6,182,212,0.2)] border border-slate-800 flex items-center justify-center">
                                {/* Componente de Galería con relleno asegurado de 4 miniaturas */}
                                <div className="w-full h-full p-4">
                                    <EnhancedProductGallery product={product} accentColor={accentCyan} />
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* 4. TRUST BADGES TECHNICAL (Cyber Specs) */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 pb-16">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            {v: 'High-RPM', l: 'Motor Brushless'},
                            {v: 'WiFi/App', l: 'Control Carga 3D'},
                            {v: '224 LED', l: 'Matriz HyperBrillante'},
                            {v: 'Carga .MP4', l: 'Soporte Formativos'}
                        ].map((b, i) => (
                            <div key={i} className="flex flex-col items-center justify-center p-6 bg-slate-800/40 border border-slate-700/50 rounded-2xl backdrop-blur-sm">
                                <span className="text-white font-black text-xl tracking-tight mb-1">{b.v}</span>
                                <span className="text-[9px] font-bold text-cyan-500 uppercase tracking-widest">{b.l}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 5. EXPERT ACCORDIONS (El cerebro de la venta) */}
                <div className="max-w-4xl mx-auto px-4 md:px-8 py-20 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[300px] bg-fuchsia-500/5 blur-[100px] rounded-full pointer-events-none"></div>
                    <div className="mb-10 text-center relative z-10">
                        <h2 className="text-3xl font-black tracking-tight text-white uppercase">El Fin de la Pancarta Muerta.</h2>
                    </div>
                    <div className="bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden relative z-10 shadow-2xl">
                        {[
                            { t: 'Tráfico Magnetizado', a: 'El ojo humano está programado para ignorar los banners impresos y pantallas de TV estáticas. Las aspas invisibles del ventilador holográfico engañan al cerebro forzando a los peatones a detenerse y mirar tu vitrina.' },
                            { t: 'Biblioteca 3D Incluida', a: 'No necesitas ser un animador profesional. La aplicación conectada vía WiFi incluye cientos de logotipos, textos en 3D, ofertas y formas abstractas listas para enviar al proyector con un solo toque.' },
                            { t: 'Operación Comercial Continua', a: 'Diseñado bajo estándares industriales, su motor brushless puede operar 24/7 sin recalentamiento. Mientras tu negocio esté abierto, el holograma estará flotando.' }
                        ].map((ac, i) => (
                            <div key={i} className="border-b border-slate-800 last:border-b-0">
                                <button onClick={() => setOpenSpecAcc(openSpecAcc===i?null:i)} className="w-full text-left p-6 md:p-8 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className="w-8 h-8 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-lg flex items-center justify-center font-bold">0{i+1}</div>
                                        {ac.t}
                                    </div>
                                    <span className="text-cyan-500 font-light text-2xl">{openSpecAcc===i?'-':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {openSpecAcc === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 md:px-8 pb-8 pl-[4.5rem] text-sm font-medium text-slate-400 leading-relaxed">
                                            {ac.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 6. ENDLESS MARQUEE (Impacto Visual Continuo) */}
                <div className="w-[100vw] overflow-hidden py-6 bg-cyan-500 border-y border-cyan-400 relative left-[50%] -translate-x-[50%] flex transform rotate-1 shadow-[0_0_50px_rgba(6,182,212,0.3)]">
                    <div className="flex whitespace-nowrap animate-marquee font-black uppercase text-2xl tracking-[0.2em] text-slate-900">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="flex items-center gap-10 px-8">
                                <span>"ROBA_MIRADAS"</span><span className="text-white">✦</span>
                                <span>"PROYECCIÓN_AÉREA"</span><span className="text-white">✦</span>
                                <span>"AUMENTA_TRAFICO"</span><span className="text-white">✦</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 7. WHY TO USE / BENEFITS CON IMÁGENES DE RELLENO */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-32">
                    <div className="text-center mb-20 relative">
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-6 uppercase">La Ventaja de lo<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400">Invisible.</span></h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { img: 'https://images.unsplash.com/photo-1542482489-c454dbcdcdbc?q=80&w=1000&auto=format&fit=crop', t: 'Vitrina Impactante', d: 'Convierta la fachada de su negocio en un punto de referencia local. La gente toma fotos de sus hologramas y las sube a Instagram gratis.' },
                            { img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop', t: 'App de Carga Directa', d: 'Graba un video en tu celular, ábrelo en la App y súbelo al proyector por WiFi. El procesador interno le quita el fondo negro en segundos.' },
                            { img: 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?q=80&w=1000&auto=format&fit=crop', t: 'Múltiples Sincronizaciones', d: '¿Deseas algo inmenso? Compra múltiples ventiladores y sincrónizalos. Se unirán matemáticamente para proyectar un solo holograma gigante.' }
                        ].map((b, i) => (
                            <div key={i} className="bg-slate-800 border border-slate-700 rounded-[2.5rem] overflow-hidden group hover:border-cyan-500/50 transition-colors duration-500 shadow-xl">
                                <div className="h-64 w-full relative overflow-hidden">
                                     <img src={b.img} alt={b.t} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-70 group-hover:opacity-100" />
                                     <div className="absolute inset-0 bg-gradient-to-t from-slate-800 via-transparent to-transparent"></div>
                                </div>
                                <div className="p-8 relative z-10">
                                    <h3 className="text-xl font-black text-white mb-4 uppercase">{b.t}</h3>
                                    <p className="text-sm font-medium text-slate-400 leading-relaxed">{b.d}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 8. VISUAL HOW TO USE GRID */}
                <div className="py-24 bg-slate-900 border-y border-slate-800">
                    <div className="max-w-7xl mx-auto px-4 md:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-4xl font-black tracking-tight text-white mb-8 uppercase">Instalación <br/><span className="text-fuchsia-400">Minimalista.</span></h2>
                                <p className="text-slate-400 font-medium mb-12 leading-relaxed text-lg">Cero configuraciones de PC complejas. Todo fue diseñado asumiendo que tienes un comercio abierto y necesitas resultados en 5 minutos.</p>
                                
                                <div className="space-y-6">
                                    {[
                                        { s: '1', t: 'Fijación de Pared', d: 'Usa los tarugos incluidos para fijar la pequeña base metálica en la pared. Asegúrate que quede a 2 metros de altura.' },
                                        { s: '2', t: 'Conecta Enchufe', d: 'Conecta el transformador ultra-delgado a cualquier enchufe estándar de 220V o 110V. Las aspas empezarán a girar.' },
                                        { s: '3', t: 'Abre la App', d: 'Sube tu logo 3D desde el celular y míralo aparecer flotando en el aire mágicamente.' }
                                    ].map((s, i) => (
                                        <div key={i} className="flex gap-6 items-start bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50 hover:border-fuchsia-500/30 transition-colors">
                                            <div className="w-8 h-8 rounded-lg bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20 font-black flex items-center justify-center shrink-0">{s.s}</div>
                                            <div>
                                                <h4 className="text-sm font-black text-white mb-2 uppercase">{s.t}</h4>
                                                <p className="text-sm text-slate-400 leading-relaxed">{s.d}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden border border-slate-700 p-2 bg-slate-800">
                                <div className="w-full h-full rounded-[2.5rem] overflow-hidden relative">
                                    <img src="https://images.unsplash.com/photo-1549416878-b9ca95e1ebfb?q=80&w=1000&auto=format&fit=crop" alt="Hologram Installation" className="w-full h-full object-cover opacity-60" />
                                    <div className="absolute inset-0 bg-gradient-to-tr from-cyan-900/80 to-transparent"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 10. COMPARISON TABLE */}
                <div className="max-w-5xl mx-auto px-4 md:px-8 py-32">
                    <div className="text-center mb-16">
                        <div className="text-[10px] font-bold text-cyan-500 uppercase tracking-widest bg-cyan-500/10 px-4 py-2 rounded-full border border-cyan-500/20 mb-4 inline-block">Análisis Competitivo</div>
                        <h2 className="text-3xl font-black tracking-tight text-white uppercase">El Final de los Anuncios Físicos.</h2>
                    </div>
                    
                    <div className="bg-slate-800 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl">
                        <div className="grid grid-cols-3 bg-slate-900 border-b border-slate-700 text-[10px] font-black uppercase tracking-widest text-slate-400">
                            <div className="p-6 md:p-8">Métrica Visual</div>
                            <div className="p-6 md:p-8 text-center text-cyan-400 border-x border-slate-700 bg-cyan-500/5">HOLO-VENTILADOR 3D</div>
                            <div className="p-6 md:p-8 text-center">Pantalla Led Estándar</div>
                        </div>
                        {[
                            { k: 'Efecto Wow', u: 'Flota en el aire, 3D Real', t: 'Plano, aburrido y común' },
                            { k: 'Consumo Energético', u: 'Apenas 24W', t: 'Más de 150W' },
                            { k: 'Instalación', u: '2 tornillos en pared', t: 'Soporte VESA pesado' },
                            { k: 'Contenido', u: 'Fondo transparente libre', t: 'Marco negro distractor' }
                        ].map((r, i) => (
                            <div key={i} className="grid grid-cols-3 border-b border-slate-700/50 last:border-b-0 text-sm">
                                <div className="p-6 md:p-8 font-bold text-slate-300 flex items-center">{r.k}</div>
                                <div className="p-6 md:p-8 font-black text-white text-center flex items-center justify-center border-x border-slate-700 bg-cyan-500/5">{r.u}</div>
                                <div className="p-6 md:p-8 font-medium text-slate-500 text-center flex items-center justify-center line-through">{r.t}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 11. RISK REVERSAL WARRANTY (Cyber Trust) */}
                <div className="max-w-5xl mx-auto px-4 md:px-8 py-12">
                    <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-10 md:p-14 rounded-[3rem] border border-cyan-500/20 text-white md:flex items-center gap-10 shadow-[0_0_50px_rgba(6,182,212,0.1)] overflow-hidden relative">
                        <div className="w-20 h-20 bg-cyan-500/10 border border-cyan-400 text-cyan-400 font-serif italic text-4xl rounded-2xl shrink-0 flex items-center justify-center shadow-lg mb-8 md:mb-0 relative z-10">
                            A
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-2xl font-black tracking-tight mb-3 text-white uppercase">Operación Blindada 100%.</h3>
                            <p className="font-medium text-slate-400 leading-relaxed text-sm">
                                Somos distribuidores electrónicos reales. Rechazamos el pago online por adelantado. Su unidad holográfica será desplegada físicamente por nuestro operador logístico a su recinto comercial. Únicamente cuando vea el empaque sellado, procederá a realizar el pago en efectivo o transferencia in-situ. Cero riesgo cibernético.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 12. BRAND ETHOS */}
                <div className="py-24 mt-16 text-center px-4">
                    <div className="max-w-3xl mx-auto">
                        <h3 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-8 max-w-2xl mx-auto leading-tight uppercase">Controla <span className="text-cyan-400">la atención.</span> Contolrarás <span className="text-fuchsia-400">las ventas.</span></h3>
                        <p className="text-base font-medium text-slate-400 leading-loose mx-auto">El comercio moderno es una guerra por la atención. Un peatón promedio ve más de 5,000 impactos publicitarios al día. Para destacarte, tienes que sacarlos de su zona de confort geométrico.</p>
                    </div>
                </div>

                {/* 13. FAQ */}
                <div className="max-w-4xl mx-auto px-4 md:px-8 py-24 bg-slate-900 border border-slate-800 rounded-3xl mb-24 shadow-2xl">
                    <div className="text-center mb-16">
                        <h2 className="text-2xl font-black tracking-tight text-white uppercase">Soporte Técnico Rápido.</h2>
                    </div>
                    <div className="space-y-2 px-4 md:px-12">
                        {[
                            {q: '¿Tengo que saber animar en 3D?', a: '¡No! La Aplicación viene con una tienda gratuita de animaciones. Solo escribes el nombre de tu tienda, y la app lo convierte en un texto flotante 3D dorado girando. Listo para usar.'},
                            {q: '¿Hace mucho ruido al girar?', a: 'Los motores brushless giran a altas RPM cortando el viento, lo que genera un silbido continuo bajo. En un ambiente comercial de tienda con música o calle, es completamente imperceptible.'},
                            {q: '¿Y si lo toco mientras gira me corto?', a: 'Las barras son de polímero acrílico y no tienen filo. Si lo golpeas se detendrá abruptamente sin cortapapeles. Aún así, recomendamos instalarlo siempre por encima de los 2 metros de altura para evitar interrupciones de clientes curiosos.'}
                        ].map((f, i) => (
                            <div key={i} className="border-b border-slate-800 last:border-b-0 hover:bg-slate-800/50 rounded-2xl transition-colors">
                                <button onClick={() => setFaqOpen(faqOpen===i?null:i)} className="w-full text-left p-6 md:p-8 flex items-center justify-between font-bold text-sm text-slate-300">
                                    <span>{f.q}</span>
                                    <span className="text-cyan-500 font-light text-2xl leading-none">{faqOpen===i?'-':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {faqOpen === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 md:px-8 pb-8 text-sm font-medium text-slate-500 leading-relaxed pt-0">
                                            {f.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 14. EXPANDED REVIEWS (Con Fotos Reales Unsplash) */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-24 border-t border-slate-800">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black tracking-tight text-white uppercase mb-6">Testimonios de Vitrina.</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { r: "Tengo una tienda de zapatos. Puse un Sneaker 3D girando afuera. Literalmente la gente frena el auto para ver de qué se trata y varios han entrado a preguntar. Pagó su inversión en la primera semana.", n: "Ricardo M.", t: "Retailer (C.O.D)", i: "https://images.unsplash.com/photo-1549416878-b9ca95e1ebfb?q=80&w=200&auto=format&fit=crop" },
                            { r: "La calidad de los LEDs es brutal incluso de día. Subo mis propias promociones escritas desde mi iPhone en 1 minuto. El envío contra entrega me dio toda la confianza.", n: "Andrés V.", t: "Manager Electrónica", i: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=200&auto=format&fit=crop" },
                            { r: "El equipo llegó en 24hs. Pagué en la puerta a mi repartidor. La instalación me llevó literalmente 10 minutos con taladro. Brutal herramienta visual.", n: "Camila S.", t: "Dueña Boutique", i: "https://images.unsplash.com/photo-1542482489-c454dbcdcdbc?q=80&w=200&auto=format&fit=crop" }
                        ].map((rev, i) => (
                            <div key={i} className="bg-slate-800 border border-slate-700/50 p-10 rounded-[2.5rem] relative shadow-lg hover:border-cyan-500/30 transition-all duration-500">
                                {/* Relleno real visual de thumbnail testimonio */}
                                <img src={rev.i} alt={rev.n} className="w-16 h-16 rounded-full object-cover border-2 border-cyan-500/50 mb-6 shadow-[0_0_15px_rgba(6,182,212,0.3)]"/>
                                <p className="text-sm font-medium text-slate-400 leading-relaxed mb-8 relative z-10 text-balance">"{rev.r}"</p>
                                <div className="flex items-center justify-between border-t border-slate-700 pt-6">
                                    <div className="text-xs font-black text-white uppercase tracking-wide">{rev.n}</div>
                                    <div className="text-[10px] font-bold text-cyan-500 uppercase tracking-widest">{rev.t}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 15. CHECKOUT */}
                <div id="checkout-action" className="py-24 md:py-32 bg-black relative border-t-[8px] border-cyan-500 overflow-hidden">
                    <div className="absolute top-0 right-0 w-[500px] h-full bg-gradient-to-l from-cyan-900/40 to-transparent pointer-events-none mix-blend-screen"></div>

                    <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24 items-center">
                        <div className="md:col-span-5 relative text-center md:text-left">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 mb-6 bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 rounded-full inline-block backdrop-blur-md">Terminal de Distribución Comercial</span>
                            <h3 className="text-4xl md:text-6xl font-black tracking-tight mb-6 text-white leading-[1.05] uppercase">Inicia la <br/>Operación.</h3>
                            <p className="text-sm font-medium text-slate-400 mb-10 leading-relaxed max-w-sm mx-auto md:mx-0">Despliegue logístico local. Ingresa tus variables y nuestro operador te entregará el dispositivo sellado para pago físico.</p>
                            
                            <div className="text-5xl md:text-6xl font-black text-cyan-400 tracking-tight">{fmtPrice(product.price)}</div>
                        </div>
                        
                        <div className="md:col-span-7 w-full border border-slate-700 bg-slate-900/80 backdrop-blur-2xl p-8 md:p-12 shadow-[0_0_50px_rgba(6,182,212,0.1)] relative rounded-[3rem]">
                            <form onSubmit={e=>e.preventDefault()}>
                                <div className="space-y-6">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-2">Titularidad Comercial</label>
                                        <input type="text" className="w-full bg-slate-800 border border-slate-700 focus:border-cyan-500 text-white font-bold text-sm px-6 py-5 rounded-2xl outline-none transition-all" placeholder="Nombre Destinatario" />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-2">Transmisión Celular</label>
                                        <input type="tel" className="w-full bg-slate-800 border border-slate-700 focus:border-cyan-500 text-white font-bold text-sm px-6 py-5 rounded-2xl outline-none transition-all" placeholder="Número Telefónico Activo" />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-2">Coordenadas de Impacto</label>
                                        <textarea rows={2} className="w-full bg-slate-800 border border-slate-700 focus:border-cyan-500 text-white font-bold text-sm px-6 py-5 rounded-3xl outline-none transition-all resize-none" placeholder="Dirección de Instalación" />
                                    </div>
                                    <div className="pt-6">
                                        <button className="w-full h-[70px] bg-cyan-500 text-black font-black uppercase tracking-[0.2em] text-sm hover:bg-white transition-all shadow-[0_0_30px_rgba(6,182,212,0.4)] rounded-3xl">
                                            Ejecutar Envío Contra Entrega
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </main>

            {/* STICKY MOBILE CTA */}
            <div className="md:hidden fixed bottom-4 left-4 right-4 z-50">
                <div className="bg-slate-900 border border-slate-700 p-4 rounded-3xl flex items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
                    <div className="pl-3">
                        <div className="text-[10px] font-bold uppercase text-slate-400 tracking-widest mb-1">C.O.D Habilitado</div>
                        <div className="font-black text-cyan-400 text-xl tracking-tight leading-none">{fmtPrice(product.price)}</div>
                    </div>
                    <button onClick={() => document.getElementById('checkout-action')?.scrollIntoView({ behavior: 'smooth' })} className="bg-cyan-500 text-black rounded-2xl px-6 py-3 font-black uppercase tracking-widest text-[11px] shadow-lg">
                        Adquirir
                    </button>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{__html: `
                @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
                .animate-marquee { animation: marquee 16s linear infinite; }
            `}} />
        </div>
    );
};

export default PdpHologramFan;
