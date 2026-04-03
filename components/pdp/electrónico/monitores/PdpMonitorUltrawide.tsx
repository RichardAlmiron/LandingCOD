'use client';
import React, { useState } from 'react';
import { StoreData, Product } from '@/lib/types';
import EnhancedProductGallery from '@/components/pdp/EnhancedProductGallery';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { data: StoreData; product: Product; }

const PdpMonitorUltrawide: React.FC<Props> = ({ data, product }) => {
    const [openSpecAcc, setOpenSpecAcc] = useState<number | null>(0);
    const [faqOpen, setFaqOpen] = useState<number | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const ai = product.aiContent;
    const fmtPrice = (n: number) => { const s = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); return `Gs. ${s}`; };
    
    // Aesthetic Palette: Ultrawide Curved Monitor Backlight (Dark Mode RGB)
    const bg = '#020617'; // Slate 950
    const textMain = '#f8fafc'; // Slate 50
    const accentPurple = '#8b5cf6'; // Violet 500
    const accentCyan = '#0ea5e9'; // Sky 500

    return (
        <div style={{ background: bg, color: textMain, fontFamily: "'Inter', sans-serif" }} className="overflow-x-hidden selection:bg-violet-500 selection:text-white antialiased">
            
            {/* 0. AMBIENT BACKLIGHT EFFECT (Curved top) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[300px] md:h-[500px] bg-gradient-to-r from-violet-600/30 via-sky-500/20 to-violet-600/30 rounded-[100%] blur-[80px] pointer-events-none -translate-y-1/2 opacity-60"></div>

            {/* 1. TOP NAV */}
            <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/10">
                <div className="max-w-screen-2xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
                    <div className="text-xl font-black uppercase tracking-tighter text-white flex gap-1">
                        <span>WIDE</span><span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-sky-400">ARC</span>
                    </div>
                    <nav className="hidden lg:flex gap-8">
                        {['1000R', 'Panel', 'G-Sync'].map((item) => (
                            <a key={item} href={`#${item.toLowerCase()}`} className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400 hover:text-white transition-colors relative group">
                                {item}
                                <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></span>
                            </a>
                        ))}
                    </nav>
                </div>
            </header>

            <main className="relative z-10 w-full overflow-hidden">
                {/* 2. BREADCRUMBS & MICRO-LOGISTICS */}
                <div className="max-w-4xl mx-auto px-4 md:px-8 pt-8 pb-4 relative z-20">
                    <div className="flex flex-col md:flex-row md:items-center justify-center gap-4 text-center">
                        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Entrega Especial Asegurada</span>
                        </div>
                    </div>
                </div>

                {/* 3. HERO (ULTRAWIDE EXPANSIVE) */}
                <div className="max-w-screen-2xl mx-auto px-4 md:px-8 py-8 lg:py-16">
                    <div className="flex flex-col items-center text-center mb-12">
                        <div className="text-[10px] font-black text-violet-400 uppercase tracking-[0.4em] mb-4">Relación Aspecto 32:9</div>
                        <h1 className="text-5xl md:text-8xl lg:text-[7rem] font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-200 to-slate-600 leading-none mb-6 pb-2">
                            {ai?.enhancedTitle || product.title}
                        </h1>
                        <p className="text-base md:text-xl font-medium text-slate-400 mb-0 max-w-2xl mx-auto leading-relaxed">
                            {ai?.enhancedDescription || product.description || 'Equivale a dos monitores de 27" unidos sin el espantoso bisel en el centro. Curvatura 1000R que coincide con tu campo visual periférico.'}
                        </p>
                    </div>

                    <div className="relative w-full max-w-[1200px] mx-auto aspect-[21/9] md:aspect-[32/9] mb-16 perspective-[2000px]">
                        {/* Curved visual representation via CSS 3D transform */}
                        <motion.div initial={{ rotateX: 20, scale: 0.9 }} animate={{ rotateX: 0, scale: 1 }} transition={{ duration: 1, ease: 'easeOut' }} className="w-full h-full relative border-[8px] border-slate-900 rounded-2xl md:rounded-[3rem] shadow-[0_20px_100px_rgba(139,92,246,0.3)] overflow-hidden bg-slate-900">
                            {/* Inner screen glow */}
                            <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(255,255,255,0.1)] z-10 pointer-events-none"></div>
                            <EnhancedProductGallery product={product} accentColor={accentPurple} />
                        </motion.div>
                    </div>

                    <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6 justify-center">
                        <div className="bg-slate-900/80 border border-slate-800 backdrop-blur-md px-8 py-5 rounded-2xl flex items-center gap-6 w-full md:w-auto shrink-0 justify-center">
                            <span className="text-4xl md:text-5xl font-black text-white">{fmtPrice(product.price)}</span>
                            {product.originalPrice && <span className="text-lg font-bold text-slate-600 line-through">{fmtPrice(product.originalPrice)}</span>}
                        </div>
                        <button onClick={() => document.getElementById('checkout-action')?.scrollIntoView({ behavior: 'smooth' })} className="w-full md:w-auto h-[74px] px-12 bg-gradient-to-r from-violet-600 to-sky-500 text-white font-black text-sm uppercase tracking-[0.2em] rounded-2xl hover:scale-105 transition-transform shadow-[0_0_30px_rgba(139,92,246,0.4)] relative overflow-hidden group">
                            <span className="relative z-10">Desplegar en Escritorio</span>
                            {/* Light sweep effect */}
                            <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out z-0"></div>
                        </button>
                    </div>
                </div>

                {/* 4. TRUST BADGES FAST (WIDGET STYLE) */}
                <div className="max-w-6xl mx-auto px-4 md:px-8 pb-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            {v: '49" WQHD', l: 'Resolución Doble'},
                            {v: '240Hz', l: 'Tasa Refresco'},
                            {v: '1ms GTG', l: 'Latencia'},
                            {v: 'Quantum AI', l: 'Retroiluminación'}
                        ].map((b, i) => (
                            <div key={i} className="flex flex-col items-center justify-center py-6 bg-slate-900 border border-slate-800 rounded-2xl hover:border-violet-500/50 transition-colors">
                                <span className="text-white font-black text-xl mb-1 tracking-tighter">{b.v}</span>
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{b.l}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 5. SPECIFICATION ACCORDIONS (ABOVE FOLD) */}
                <div id="1000r" className="max-w-4xl mx-auto px-4 md:px-8 py-16">
                    <div className="border border-slate-800 rounded-3xl overflow-hidden bg-slate-900/50 backdrop-blur-sm">
                        {[
                            { t: 'Curvatura 1000R Explicada', a: '1000R representa el radio en milímetros. Es la curvatura más pronunciada del mercado y coincide exactamente con el radio de la visión humana. Tus ojos no tienen que reenfocar al mirar los extremos alejados.' },
                            { t: 'Colores Quantum Dot', a: 'Las nanopartículas emiten espectros de color tan precisos que cubren el 95% del espacio DCI-P3 (Estándar de cine). Los negros son profundos y el contraste HDR es cegador.' },
                            { t: 'Protocolo de Entrega de Carga Frágil', a: 'Monitores de este tamaño no van por correo normal. Un servicio logístico privado lleva la caja a tu destino. Abres el empaque, confirmas que el cristal está intacto, y pagas el valor (COD) con total calma.' }
                        ].map((ac, i) => (
                            <div key={i} className="border-b border-slate-800 last:border-b-0 group">
                                <button onClick={() => setOpenSpecAcc(openSpecAcc===i?null:i)} className="w-full text-left px-8 py-6 flex items-center justify-between text-xs font-black uppercase tracking-[0.1em] text-slate-300 hover:text-white transition-colors">
                                    <span className="flex items-center gap-3">
                                        <span className="text-violet-500">_</span> {ac.t}
                                    </span>
                                    <span className="text-violet-500 font-bold text-lg">{openSpecAcc===i?'-':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {openSpecAcc === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-8 pb-8 text-sm font-medium text-slate-400 leading-relaxed pl-12">
                                            {ac.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 6. ENDLESS MARQUEE */}
                <div className="w-[100vw] overflow-hidden py-4 bg-gradient-to-r from-violet-600 to-sky-500 relative left-[50%] -translate-x-[50%] flex transform rotate-1">
                    <div className="flex whitespace-nowrap animate-marquee font-black uppercase text-2xl tracking-tighter text-white">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="flex items-center gap-10 px-5">
                                <span>SIN_BISELES_CENTRALES</span><span>/</span>
                                <span>PICTURE_IN_PICTURE</span><span>/</span>
                                <span>FREESYNC_PREMIUM</span><span>/</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 7. WHY TO USE / BENEFITS */}
                <div id="panel" className="max-w-7xl mx-auto px-4 md:px-8 py-32">
                    <div className="text-center mb-24 relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-violet-600/20 blur-[100px] rounded-full pointer-events-none"></div>
                        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white relative z-10">Tus dos monitores<br/>son <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-sky-400">obsoletos.</span></h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { ic: 'M21 3H3v18h18V3zM12 21V3', t: 'Productividad PBP', d: 'Puedes conectar tu laptop Mac y tu PC Windows al mismo tiempo. El monitor corta la pantalla 50/50 y te permite controlar ambas fuentes como un rey.' },
                            { ic: 'M13 10V3L4 14h7v7l9-11h-7z', t: 'Velocidad HZ', d: 'Con 240Hz, la fluidez del mouse en una tabla de Excel o arrastrando archivos pesa. En juegos, la ventaja competitiva es desleal para tus rivales.' },
                            { ic: 'M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7', t: 'Expansión Field of View', d: 'No solo ves más grande. Ves lo que había fuera del margen. Descubres celdas extra, ves enemigos acercándose por los costados.' }
                        ].map((b, i) => (
                            <div key={i} className="bg-slate-900 border border-slate-800 p-8 rounded-3xl hover:bg-slate-800 transition-colors group">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-violet-500 mb-6 group-hover:scale-110 transition-transform"><path strokeLinecap="round" strokeLinejoin="round" d={b.ic}/></svg>
                                <h3 className="text-xl font-black uppercase tracking-tight text-white mb-4">{b.t}</h3>
                                <p className="text-sm font-medium text-slate-400 leading-relaxed">{b.d}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 8. HOW TO USE (VISUAL GUIDE) */}
                <div className="py-24 border-y border-white/5 bg-black/50">
                    <div className="max-w-6xl mx-auto px-4 md:px-8">
                        <div className="flex flex-col lg:flex-row gap-16 items-center">
                            <div className="lg:w-1/2">
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-sky-400 mb-4 block">Montaje Sincronizado</span>
                                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mb-10">Escritorio Ilimitado.</h2>
                                <div className="space-y-8">
                                    {[
                                        { s: '01', t: 'Fija la Base Metálica', d: 'Viene con un brazo articulado y una base V-Shape pesada. Se ancla por sistema click sin necesitar ni un destornillador.' },
                                        { s: '02', t: 'Conexión Single-Cable', d: 'Usa el DisplayPort 1.4 incluido. Un solo cable transmite los 240Hz en toda la inmensa resolución WQHD.' },
                                        { s: '03', t: 'Inmersión Total', d: 'Apaga todas las luces. La iluminación trasera LED proyectará el borde de tu pantalla hacia la pared atrás del monitor.' }
                                    ].map((s, i) => (
                                        <div key={i} className="flex gap-6 items-start">
                                            <div className="text-sky-400 font-mono text-sm leading-none pt-1">[{s.s}]</div>
                                            <div>
                                                <h4 className="text-sm font-black uppercase tracking-widest text-slate-200 mb-2">{s.t}</h4>
                                                <p className="text-sm font-medium text-slate-500 leading-relaxed max-w-sm">{s.d}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="lg:w-1/2 relative w-full aspect-video border-[6px] border-slate-900 rounded-[2rem] overflow-hidden bg-slate-950 flex items-center justify-center">
                                {/* Simulated Sync Backlight */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-violet-900/40 to-sky-900/40"></div>
                                <div className="text-center relative z-10">
                                    <div className="w-16 h-16 border border-white/20 rounded-full flex items-center justify-center mx-auto mb-4 bg-white/5 backdrop-blur-md">
                                        <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                                    </div>
                                    <div className="text-[10px] font-mono tracking-widest text-white/50">Core Sync Active</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 9. DEEP DIVE MULTIMEDIA */}
                <div id="g-sync" className="py-40 relative text-center flex items-center justify-center overflow-hidden">
                    {/* massive ambient */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-900/20 to-transparent"></div>
                    <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-transparent via-sky-400 to-transparent opacity-50 shadow-[0_0_20px_#0ea5e9]"></div>
                    
                    <div className="relative z-10 max-w-3xl px-4 text-center">
                        <span className="text-xs font-black uppercase tracking-[0.4em] text-white bg-white/10 px-4 py-2 rounded-full border border-white/20 backdrop-blur-sm mb-8 inline-block shadow-[0_0_15px_rgba(255,255,255,0.2)]">NVIDIA G-SYNC COMPATIBLE</span>
                        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-6">Desgarro Gráfico Aniquilado.</h2>
                        <p className="text-lg font-medium text-slate-400 leading-relaxed uppercase tracking-widest">
                            Sincroniza la taza de actualización de la pantalla con el framerate exacto de tu tarjeta gráfica. El resultado es un panel que jamás corta los cuadros a la mitad. Suavidad líquida a nivel de píxel.
                        </p>
                    </div>
                </div>

                {/* 10. COMPARISON TABLE */}
                <div className="max-w-5xl mx-auto px-4 md:px-8 py-24">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black uppercase tracking-tighter text-white">Dual vs Ultrawide.</h2>
                    </div>
                    
                    <div className="bg-slate-900/60 border border-slate-800 rounded-3xl overflow-hidden backdrop-blur-sm">
                        <div className="grid grid-cols-3 bg-slate-900 border-b border-slate-800 text-[10px] md:text-xs font-black uppercase tracking-widest text-slate-500">
                            <div className="p-6 text-left">Frontera</div>
                            <div className="p-6 text-center text-sky-400 border-x border-slate-800">49" ULTRAWIDE ARC</div>
                            <div className="p-6 text-center">Dos Pantallas de 27"</div>
                        </div>
                        {[
                            { k: 'Brecha Visual (Bisel)', u: '0.0mm (Inexistente)', t: '20mm de plástico bloqueando tu vista' },
                            { k: 'Cables requeridos', u: '1 Cable DisplayPort', t: '2 DisplayPorts, 2 Tomas de pared' },
                            { k: 'Alineación de Colores', u: '100% Homogéneo', t: 'Imposible (Uno se ve siempre más azul)' },
                            { k: 'Gestión Ventanas', u: 'Software integrado (Pantalla entera)', t: 'Choque al mover ventanas al medio' }
                        ].map((r, i) => (
                            <div key={i} className="grid grid-cols-3 border-b border-slate-800/50 last:border-b-0 text-sm">
                                <div className="p-6 font-bold text-slate-300 flex items-center bg-slate-900/30">{r.k}</div>
                                <div className="p-6 font-black text-white text-center flex items-center justify-center border-x border-slate-800 bg-sky-900/10 shadow-[inner_0_0_20px_rgba(14,165,233,0.05)]">{r.u}</div>
                                <div className="p-6 font-medium text-slate-500 text-center flex items-center justify-center line-through">{r.t}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 11. RISK REVERSAL WARRANTY */}
                <div className="max-w-5xl mx-auto px-4 md:px-8 py-12">
                    <div className="border border-violet-500/30 bg-gradient-to-r from-violet-900/20 to-transparent p-10 md:p-12 rounded-3xl md:flex items-center gap-10">
                        <div className="w-20 h-20 bg-violet-600 text-white font-black text-4xl rounded-2xl shrink-0 flex items-center justify-center shadow-[0_0_30px_rgba(139,92,246,0.3)] mb-6 md:mb-0">
                            !
                        </div>
                        <div>
                            <h3 className="text-2xl font-black uppercase tracking-tight mb-4 text-white">Blindaje en Tránsito (C.O.D)</h3>
                            <p className="font-medium text-violet-200/70 leading-relaxed text-sm">
                                Una curvatura 1000R es extremadamente delicada. Por eso, evitamos empresas de correo maltratadoras. Nuestro servicio de Carga Frágil lleva la inmensa caja de un metro veinte a tu casa. Solo págales el importe presencial tras haber revisado su perfecta estructura física.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 12. BRAND ETHOS */}
                <div className="py-24 border-y border-white/5 mt-16 text-center px-4 bg-black/40">
                    <div className="max-w-3xl mx-auto">
                        <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white mb-6">Rompe la <span className="text-violet-500">caja.</span></h3>
                        <p className="text-base font-medium text-slate-400 leading-loose mx-auto">Pensamos y trabajamos dentro de rectángulos restrictivos. Cuando pasas a 32:9, descubres que la información no tiene que estar apilada; puede extenderse horizontalmente como lo hace tu visión natural a lo largo del horizonte.</p>
                    </div>
                </div>

                {/* 13. FAQ */}
                <div className="max-w-4xl mx-auto px-4 md:px-8 py-24">
                    <div className="text-center mb-16">
                        <h2 className="text-2xl font-black uppercase tracking-widest text-slate-500">Preguntas Críticas</h2>
                    </div>
                    <div className="space-y-4">
                        {[
                            {q: '¿Mi tarjeta gráfica soporta esta resolución loca?', a: 'La resolución Dual QHD (5120x1440) es pesada en juegos, requiere una tarjeta moderna de gama media-alta (ej. RTX 3060ti o superior). Para ofimática o programación, literalmente cualquier gráfica de los últimos 6 años puede manejarla a 60Hz-120Hz sin transpirar.'},
                            {q: '¿Cómo funciona para compartir pantalla en Zoom/Teams?', a: 'El monitor trae su software que te permite compartir solo un "cubo" o sector de la pantalla. Así, la otra persona no ve tu pantalla comprimida o extremadamente larga.'},
                            {q: '¿Cómo pago al momento de recibir semejante caja?', a: 'Llena el formulario, prepararemos el viaje seguro. El repartidor llegará a tu domicilio, y podrás pagarle en efectivo o vía transferencia bancaria ahí mismo, validando que el empaque no tenga golpes.'}
                        ].map((f, i) => (
                            <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl">
                                <button onClick={() => setFaqOpen(faqOpen===i?null:i)} className="w-full text-left p-6 md:p-8 flex items-center justify-between font-bold text-sm text-slate-300 uppercase tracking-widest hover:text-white transition-colors">
                                    <span>{f.q}</span>
                                    <span className="text-sky-400 text-xl font-mono">{faqOpen===i?'-':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {faqOpen === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 md:px-8 pb-8 text-sm font-medium text-slate-500 leading-relaxed pt-2">
                                            {f.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 14. EXPANDED REVIEWS */}
                <div className="max-w-6xl mx-auto px-4 md:px-8 py-20 border-t border-slate-800">
                    <div className="flex flex-col md:flex-row justify-between mb-16 items-end gap-6 text-center md:text-left">
                        <h2 className="text-3xl font-black uppercase tracking-tighter text-white">Status Report.</h2>
                        <span className="text-[10px] font-mono text-cyan-500 tracking-widest border border-cyan-900 px-3 py-1 bg-cyan-900/20">LOG DE USUARIOS COMPROBADOS</span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { r: "Absurdo. Editar videos en la línea de tiempo de Premiere Pro a lo largo de este monitor es una experiencia religiosa. Me compró al instante.", n: "David C.", t: "Editor Audiovisual" },
                            { r: "Trabajo con Excel gigante y dos plataformas web a la vez. Ya no alt-tabeo nada. Aparte, que me lo dejen en casa y pagar ahí sacó todo el estrés de una compra tan cara.", n: "Martín P.", t: "Data Analyst" },
                            { r: "Inmersión total en simuladores espaciales y de carreras. El HDR y el brillo a 1000 nits te ciegan si miras al sol en el juego.", n: "Leo Z.", t: "Piloto Virtual" },
                            { r: "Adiós brazo del soporte que me robaba espacio. La base de este es súper elegante, cero estética barata de gaming plástico.", n: "Andrea L.", t: "Diseñadora UI" }
                        ].map((rev, i) => (
                            <div key={i} className="bg-slate-900 border border-slate-800 p-8 rounded-3xl hover:border-violet-500/50 transition-colors">
                                <p className="text-sm font-medium text-slate-400 leading-relaxed mb-8">"{rev.r}"</p>
                                <div className="flex items-center gap-3 border-t border-slate-800 pt-4">
                                    <div className="text-[10px] font-black uppercase text-white bg-slate-800 px-3 py-1 rounded">{rev.n}</div>
                                    <div className="text-[10px] font-bold text-violet-400 uppercase">{rev.t}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 15. CHECKOUT */}
                <div id="checkout-action" className="py-24 md:py-32 bg-slate-950 relative border-t border-slate-800 overflow-hidden">
                    {/* Dark glow blob */}
                    <div className="absolute top-[10%] -left-[10%] w-[400px] h-[400px] bg-violet-600/10 rounded-full blur-[100px] pointer-events-none"></div>
                    <div className="absolute bottom-[10%] -right-[10%] w-[400px] h-[400px] bg-sky-500/10 rounded-full blur-[100px] pointer-events-none"></div>
                    
                    <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24 items-center">
                        <div className="md:col-span-6 relative">
                            <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 text-white leading-[0.9]">Abre el <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-sky-400">Espectro.</span></h3>
                            <p className="text-sm font-medium text-slate-400 mb-10 leading-relaxed uppercase tracking-widest max-w-sm">Asegura tu reserva. Abonas directamente al encargado logístico tras descarga en residencia.</p>
                            
                            <div className="inline-block relative">
                                <div className="absolute inset-0 bg-violet-500/20 blur-xl"></div>
                                <div className="text-5xl lg:text-7xl font-black text-white relative z-10">{fmtPrice(product.price)}</div>
                            </div>
                        </div>
                        
                        <div className="md:col-span-6 w-full">
                            <form className="bg-slate-900/80 backdrop-blur-xl p-8 md:p-10 rounded-[2rem] border border-slate-700 shadow-2xl relative" onSubmit={e=>e.preventDefault()}>
                                <div className="space-y-6">
                                    <div>
                                        <input type="text" className="w-full bg-slate-950 border border-slate-800 focus:border-violet-500 text-white font-bold text-sm px-6 py-5 rounded-2xl outline-none transition-all placeholder:text-slate-600 uppercase tracking-widest" placeholder="Identidad Oficial" />
                                    </div>
                                    <div>
                                        <input type="tel" className="w-full bg-slate-950 border border-slate-800 focus:border-violet-500 text-white font-bold text-sm px-6 py-5 rounded-2xl outline-none transition-all placeholder:text-slate-600 uppercase tracking-widest" placeholder="Canal Telefónico" />
                                    </div>
                                    <div>
                                        <textarea rows={2} className="w-full bg-slate-950 border border-slate-800 focus:border-violet-500 text-white font-bold text-sm px-6 py-5 rounded-2xl outline-none transition-all resize-none placeholder:text-slate-600 uppercase tracking-widest" placeholder="Zona de Despliegue (DOMICILIO)" />
                                    </div>
                                    <div className="pt-4">
                                        <button className="w-full h-[70px] bg-white text-slate-950 font-black uppercase tracking-[0.2em] text-sm rounded-2xl hover:bg-slate-200 hover:scale-x-105 transition-all outline outline-offset-4 outline-transparent hover:outline-white/30">
                                            Confirmar Compra
                                        </button>
                                        <p className="text-center text-[10px] font-mono text-slate-500 uppercase mt-6 tracking-widest">Protección C.O.D. Certificada</p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </main>

            {/* STICKY MOBILE CTA */}
            <div className="md:hidden fixed bottom-4 left-4 right-4 z-50">
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-3xl flex items-center justify-between shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
                    <div className="pl-3">
                        <div className="text-[9px] font-bold uppercase text-slate-500 tracking-widest">Pago contra entrega</div>
                        <div className="font-black text-white text-xl tracking-tighter mt-1">{fmtPrice(product.price)}</div>
                    </div>
                    <button onClick={() => document.getElementById('checkout-action')?.scrollIntoView({ behavior: 'smooth' })} className="bg-gradient-to-r from-violet-600 to-sky-500 text-white rounded-2xl px-6 py-3 font-black uppercase tracking-widest text-[11px]">
                        Comprar
                    </button>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{__html: `
                @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
                .animate-marquee { animation: marquee 10s linear infinite; }
            `}} />
        </div>
    );
};

export default PdpMonitorUltrawide;
