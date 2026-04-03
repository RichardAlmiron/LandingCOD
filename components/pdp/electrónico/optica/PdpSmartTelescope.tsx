'use client';
import React, { useState } from 'react';
import { StoreData, Product } from '@/lib/types';
import EnhancedProductGallery from '@/components/pdp/EnhancedProductGallery';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { data: StoreData; product: Product; }

const PdpSmartTelescope: React.FC<Props> = ({ data, product }) => {
    const [openSpecAcc, setOpenSpecAcc] = useState<number | null>(0);
    const [faqOpen, setFaqOpen] = useState<number | null>(null);
    const ai = product.aiContent;
    const fmtPrice = (n: number) => { const s = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); return `Gs. ${s}`; };
    
    // Aesthetic Palette: Cosmos / Deep Sky / Starlight
    const bg = '#020617'; // Slate 950
    const textMain = '#f8fafc'; // Slate 50
    const accentIndigo = '#818cf8'; // Indigo 400
    const accentGold = '#fcd34d'; // Amber 300

    return (
        <div style={{ background: bg, color: textMain, fontFamily: "'Inter', sans-serif" }} className="overflow-x-hidden selection:bg-indigo-500/30 selection:text-indigo-200 antialiased">
            
            {/* 0. AMBIENT STARLIGHT GLOW */}
            <div className="absolute top-0 left-0 w-full h-[1200px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/40 via-slate-950 to-slate-950 pointer-events-none z-0"></div>
            <div className="fixed top-1/4 right-0 w-[500px] h-[500px] bg-amber-500/5 blur-[150px] rounded-full pointer-events-none z-0 mix-blend-screen"></div>

            {/* 1. TOP NAV (Astro Tech) */}
            <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-2xl border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-slate-800 flex items-center justify-center border border-indigo-400/30 shadow-[0_0_15px_rgba(129,140,248,0.3)]">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
                        </div>
                        <span className="font-bold text-xl tracking-[0.15em] text-white uppercase">
                            NOVA<span className="font-light text-indigo-400">STAR</span>
                        </span>
                    </div>
                </div>
            </header>

            <main className="relative z-10 w-full overflow-hidden">
                {/* 2. BREADCRUMBS & LOGISTICS */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6 pb-2">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-300 bg-indigo-950/50 px-4 py-2 rounded-full border border-indigo-500/20 inline-flex items-center gap-2">
                            <span className="text-amber-300">✦</span>
                            ÓPTICA / ASTRONOMÍA / <span className="text-white">{product.title.substring(0, 15)}...</span>
                        </div>
                        <div className="inline-flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-900 px-4 py-2 rounded-full border border-white/10">
                            Equipamiento Astronómico • ENTREGA C.O.D.
                        </div>
                    </div>
                </div>

                {/* 3. HERO SECTION (DEEP SKY) */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 lg:py-16 relative">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
                        <div className="flex flex-col relative z-20 lg:col-span-5">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="flex items-center bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-full backdrop-blur-md">
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse mr-2"></span>
                                    <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest">Lentes Sony CMOS Integrados</span>
                                </span>
                            </div>
                            
                            <h1 className="text-5xl md:text-7xl font-sans tracking-tight text-white leading-[1.05] mb-6 uppercase" style={{ fontWeight: 900 }}>
                                {ai?.enhancedTitle || "Explorador Óptico Deep-Sky"}
                            </h1>
                            <p className="text-base md:text-lg font-medium text-indigo-200/70 mb-10 leading-relaxed max-w-lg">
                                {ai?.enhancedDescription || "La astronomía dejó de ser complicada. Apunta al cielo, y la inteligencia artificial calculará coordenadas para mostrarte nebulosas en 4K directamente en tu teléfono celular."}
                            </p>

                            <div className="bg-slate-900/80 backdrop-blur-2xl rounded-[2rem] p-8 relative border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-500/20 to-transparent rounded-bl-[100px] pointer-events-none"></div>
                                <div className="flex flex-col sm:flex-row sm:items-end gap-6 mb-8 relative z-10">
                                    <span className="text-5xl font-black text-white tracking-tight">{fmtPrice(product.price)}</span>
                                    {product.originalPrice && <span className="text-lg font-medium text-slate-500 line-through pb-1">{fmtPrice(product.originalPrice)}</span>}
                                </div>
                                <button onClick={() => document.getElementById('checkout-action')?.scrollIntoView({ behavior: 'smooth' })} className="w-full h-[64px] bg-white text-slate-950 font-black uppercase tracking-[0.15em] text-[12px] rounded-2xl hover:bg-indigo-400 hover:text-white transition-all duration-300 flex items-center justify-center gap-3">
                                    Iniciar Observación
                                </button>
                                <div className="flex items-center justify-center gap-2 mt-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                                    Caja Cerrada • Liquidación Contra Entrega
                                </div>
                            </div>
                        </div>

                        <div className="relative z-10 lg:col-span-7 flex items-center justify-center p-4">
 <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="w-full max-w-[600px] relative bg-slate-900/50 rounded-[3rem] shadow-[0_0_80px_rgba(129,140,248,0.15)] border border-white/5 flex items-center justify-center p-4 backdrop-blur-md">
                                <EnhancedProductGallery product={product} accentColor={accentIndigo} />
                                
                                {/* UI Floating Astro Element */}
                                <motion.div animate={{ y: [-5, 5, -5] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} className="absolute content-none top-8 -right-4 bg-slate-900/90 backdrop-blur-md border border-white/10 shadow-2xl rounded-2xl p-4 flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full relative overflow-hidden bg-black border border-indigo-500/50">
                                        <img src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=200&auto=format&fit=crop" className="w-full h-full object-cover" alt="Nebula" />
                                    </div>
                                    <div>
                                        <div className="text-[9px] font-bold text-amber-400 uppercase tracking-widest">Identificando</div>
                                        <div className="text-sm font-bold text-white">Zeta Orionis A</div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* 4. TRUST BADGES TECHNICAL */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 pb-16">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            {v: '4K Sony', l: 'Sensor Astrofotografía'},
                            {v: '100x', l: 'Aumento Óptico Real'},
                            {v: 'GPS', l: 'Alineación Automática'},
                            {v: 'iOS/And', l: 'App Cosmos Gratuita'}
                        ].map((b, i) => (
                            <div key={i} className="flex flex-col items-center justify-center p-6 bg-slate-900/60 border border-white/5 rounded-2xl backdrop-blur-sm">
                                <span className="text-white font-black text-2xl tracking-tight mb-1">{b.v}</span>
                                <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest">{b.l}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 5. EXPERT ACCORDIONS */}
                <div className="max-w-4xl mx-auto px-4 md:px-8 py-20 relative">
                    <div className="mb-10 text-center relative z-10">
                        <h2 className="text-3xl font-black tracking-tight text-white uppercase">Adiós a la Óptica Obsoleta.</h2>
                    </div>
                    <div className="bg-slate-900/80 border border-white/5 rounded-3xl overflow-hidden relative z-10 shadow-2xl">
                        {[
                            { t: 'Alineación Inteligente', a: 'Los telescopios antiguos requieren horas de alineación polar y conocimientos astronómicos. Éste tiene GPS y acelerómetros internos. Solo enciéndelo, apuntará al cielo y te dirá en la app exactamente hacia dónde moverlo para ver Saturno.' },
                            { t: 'Reducción de Contaminación Lumínica', a: '¿Vives en la ciudad? No importa. El sensor CMOS integrado procesa imágenes aplicando filtros UHC digitales que bloquean la luz urbana, permitiéndote ver galaxias tenues incluso desde un balcón en el centro.' },
                            { t: 'Captura Fotográfica al Instante', a: 'Olvídate de pegar tu ojo al ocular congelándote de frío. El equipo envía la imagen por WiFi a tu tablet o celular. Puedes guardar fotografías espectaculares de cráteres lunares con un solo tap.' }
                        ].map((ac, i) => (
                            <div key={i} className="border-b border-white/5 last:border-b-0">
                                <button onClick={() => setOpenSpecAcc(openSpecAcc===i?null:i)} className="w-full text-left p-6 md:p-8 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-slate-300 hover:text-white hover:bg-white/5 transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className="w-8 h-8 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full flex items-center justify-center font-bold font-serif">0{i+1}</div>
                                        {ac.t}
                                    </div>
                                    <span className="text-amber-400 font-light text-2xl">{openSpecAcc===i?'-':'+'}</span>
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

                {/* 6. ENDLESS MARQUEE */}
                <div className="w-[100vw] overflow-hidden py-4 bg-indigo-600 border-y border-indigo-400 relative left-[50%] -translate-x-[50%] flex transform">
                    <div className="flex whitespace-nowrap animate-marquee font-black uppercase text-xl tracking-[0.2em] text-white">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="flex items-center gap-10 px-8">
                                <span>NOCHE ESTELAR</span><span className="text-amber-300">✦</span>
                                <span>CRÁTERES LUNARES EN 4K</span><span className="text-amber-300">✦</span>
                                <span>CAPTURA DIRECTA AL MÓVIL</span><span className="text-amber-300">✦</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 7. WHY TO USE / BENEFITS CON IMÁGENES */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-32 border-b border-white/5">
                    <div className="text-center mb-20 relative">
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-6 uppercase">El Universo en la<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-amber-300">Palma de tu Mano.</span></h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { img: 'https://images.unsplash.com/photo-1543722530-d2c3201371e7?q=80&w=1000&auto=format&fit=crop', t: 'Observación en Familia', d: 'Conéctalo al iPad y toda la familia puede observar los anillos de Saturno al mismo tiempo en la pantalla. Nadie tiene que esperar su turno tiritando.' },
                            { img: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1000&auto=format&fit=crop', t: 'Apilamiento de Imágenes Vivo', d: 'El sensor sumará la luz captada segundo a segundo frente a tus ojos. Verás cómo una mancha negra se convierte en una nebulosa multicolor brillante.' },
                            { img: 'https://images.unsplash.com/photo-1518331647614-7a1f04cd34cf?q=80&w=1000&auto=format&fit=crop', t: 'Portabilidad Extrema', d: 'Pesa menos de 4kg y cabe en una mochila estándar. Llévalo a tu próximo camping o viaje por la ruta sin requerir un flete especial.' }
                        ].map((b, i) => (
                            <div key={i} className="bg-slate-900 border border-white/5 rounded-[2rem] overflow-hidden group hover:border-indigo-500/50 transition-all duration-700">
                                <div className="h-60 w-full relative overflow-hidden">
                                     <img src={b.img} alt={b.t} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 opacity-80" />
                                     <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
                                </div>
                                <div className="p-8 relative z-10 -mt-6">
                                    <h3 className="text-lg font-black text-white mb-3 uppercase tracking-wide">{b.t}</h3>
                                    <p className="text-sm font-medium text-slate-400 leading-relaxed">{b.d}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 8. COMO USAR - HORIZONTAL FLOW */}
                <div className="py-24 bg-slate-950">
                    <div className="max-w-7xl mx-auto px-4 md:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-black tracking-tight text-white uppercase mb-4">Secuencia de Ignición.</h2>
                            <p className="text-slate-400">Instalación en menos de 90 segundos.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { s: '01', t: 'Trípode y Base', d: 'Extiende las patas de aluminio y encaja el cuerpo principal magnéticamente. No necesitas destornilladores.', i: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1000&auto=format&fit=crop' },
                                { s: '02', t: 'App Connect', d: 'Abre la app gratuita y toca "Connect". El dispositivo sincronizará su brújula y GPS con tu ubicación exacta.', i: 'https://images.unsplash.com/photo-1541881515284-82dd8cb18751?q=80&w=1000&auto=format&fit=crop' },
                                { s: '03', t: 'Elige tu Destino', d: 'Toca "La luna" o "Nebulosa de Orión" en el catálogo de la app. Flechas en pantalla te guiarán milimétricamente.', i: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?q=80&w=1000&auto=format&fit=crop' }
                            ].map((s, i) => (
                                <div key={i} className="relative rounded-3xl overflow-hidden aspect-[4/3] group border border-white/10">
                                    <img src={s.i} alt={s.t} className="w-full h-full object-cover opacity-50 group-hover:opacity-30 transition-opacity" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent"></div>
                                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                        <div className="text-5xl font-black text-indigo-500/30 mb-2">{s.s}</div>
                                        <h4 className="text-xl font-black text-white mb-2 uppercase tracking-tight">{s.t}</h4>
                                        <p className="text-xs font-medium text-slate-300 leading-relaxed">{s.d}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 10. COMPARISON TABLE */}
                <div className="max-w-5xl mx-auto px-4 md:px-8 py-24">
                    <div className="text-center mb-16">
                        <div className="text-[10px] font-bold text-amber-300 uppercase tracking-widest bg-amber-500/10 px-4 py-2 rounded-full border border-amber-500/20 mb-4 inline-block">Óptica Avanzada</div>
                        <h2 className="text-3xl font-black tracking-tight text-white uppercase">Telescopio Smart vs Clásico.</h2>
                    </div>
                    
                    <div className="bg-slate-900 border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
                        <div className="grid grid-cols-3 bg-slate-950 border-b border-white/5 text-[10px] font-black uppercase tracking-widest text-slate-500">
                            <div className="p-6 md:p-8">Tecnología</div>
                            <div className="p-6 md:p-8 text-center text-indigo-400 border-x border-white/5 bg-indigo-900/10">SMART NOVASTAR</div>
                            <div className="p-6 md:p-8 text-center">Refractor Newtoniano Antiguo</div>
                        </div>
                        {[
                            { k: 'Ubicación de Astros', u: 'Automática por GPS/App', t: 'Manual buscando mapas' },
                            { k: 'Visión Ciudadana', u: 'Filtro anti-luz digital integrado', t: 'Solo visible campo abierto' },
                            { k: 'Postura Física', u: 'Sentado mirando el celular', t: 'Agachado en posiciones incómodas' },
                            { k: 'Captura Fotográfica', u: '1 click a la galería (.JPG/.RAW)', t: 'Requiere adaptadores caros' }
                        ].map((r, i) => (
                            <div key={i} className="grid grid-cols-3 border-b border-white/5 last:border-b-0 text-sm">
                                <div className="p-6 md:p-8 font-bold text-slate-300 flex items-center">{r.k}</div>
                                <div className="p-6 md:p-8 font-black text-white text-center flex items-center justify-center border-x border-white/5 bg-indigo-900/10">{r.u}</div>
                                <div className="p-6 md:p-8 font-medium text-slate-600 text-center flex items-center justify-center line-through">{r.t}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 11. RISK REVERSAL WARRANTY (Astro Guarantee) */}
                <div className="max-w-5xl mx-auto px-4 md:px-8 py-12">
                    <div className="bg-slate-900 p-10 md:p-14 rounded-[3rem] border border-white/10 text-white md:flex items-center gap-10 shadow-2xl overflow-hidden relative">
                        <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-indigo-500/10 to-transparent pointer-events-none"></div>
                        <div className="w-20 h-20 bg-indigo-500 text-white font-serif italic text-4xl rounded-2xl shrink-0 flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.3)] mb-8 md:mb-0 relative z-10">
                            C
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-2xl font-black tracking-tight mb-3 text-white uppercase">Cero Riesgos Comerciales.</h3>
                            <p className="font-medium text-indigo-100/70 leading-relaxed text-sm">
                                No confíes tu dinero a envíos internacionales dudosos. Pides ahora en el formulario, empaquetamos el dispositivo óptico sellado, y nuestro cartero privado llega hasta la puerta de tu domicilio en las próximas 48 horas. Allí lo compruebas y entregas en efectivo. Garantía absoluta sobre lentes y sensores por 12 meses.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 12. BRAND ETHOS */}
                <div className="py-24 mt-16 text-center px-4 bg-slate-950 border-t border-white/5">
                    <div className="max-w-3xl mx-auto">
                        <h3 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-8 max-w-2xl mx-auto leading-tight uppercase">No Mires <span className="text-indigo-400">Arriba.</span> Míralo <span className="text-amber-300">Más Cerca.</span></h3>
                        <p className="text-base font-medium text-slate-400 leading-loose mx-auto">Queríamos democratizar las estrellas. La astronomía solía ser para ricos o científicos. Al fusionar los sensores fotográficos modernos con lentes de precisión, el borde del universo ahora cabe en tu mochila.</p>
                    </div>
                </div>

                {/* 13. FAQ */}
                <div className="max-w-4xl mx-auto px-4 md:px-8 py-24">
                    <div className="text-center mb-16">
                        <h2 className="text-2xl font-black tracking-tight text-white uppercase">Manual Científico Básico.</h2>
                    </div>
                    <div className="space-y-2 px-4 md:px-0">
                        {[
                            {q: '¿Puede usarse de día para ver paisajes terrestres?', a: 'Completamente. La aplicación celular cuenta con un "Modo Paisaje" que anula los filtros de astrofotografía y transmite imagen a todo color en tiempo real sin quemado por la luz del sol.'},
                            {q: '¿Qué pasa si mi celular Android es viejo?', a: 'La App es ultraligera y compatible con cualquier smartphone de los últimos 6 años. El procesamiento gráfico crudo lo hace el hardware del telescopio, tu teléfono solo actúa como pantalla.'},
                            {q: '¿Viene con batería interna o debo enchufarlo?', a: 'Cuenta con una batería de Iones de Lítio (10,000 mAh) integrada. Te proporciona unas 5 horas de autonomía contínua en invierno. Y además puede recargarse en pleno uso mediante PowerBank tipo-C.'}
                        ].map((f, i) => (
                            <div key={i} className="border-b border-white/5 last:border-b-0 hover:bg-slate-900 rounded-2xl transition-colors">
                                <button onClick={() => setFaqOpen(faqOpen===i?null:i)} className="w-full text-left p-6 md:p-8 flex items-center justify-between font-bold text-sm text-slate-300">
                                    <span>{f.q}</span>
                                    <span className="text-indigo-400 font-light text-2xl leading-none">{faqOpen===i?'-':'+'}</span>
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

                {/* 14. EXPANDED REVIEWS */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-24 border-t border-white/5">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black tracking-tight text-white uppercase mb-6">Bitácoras Reales.</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { r: "Tengo años usando Dobsonianos caros y pesados. Este chiquitín sacó una foto de la galaxia de Andrómeda desde el centro de la ciudad con mucha luz artificial, en 5 minutos. Me voló la cabeza.", n: "Carlos E.", t: "Astrónomo Amateur", i: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=200&auto=format&fit=crop" },
                            { r: "Lo compré para mis hijos de 8 años. Es fascinante. Ahora solo abren la app, tocamos 'Luna' y los vemos emocionarse viéndola en la tablet. Tremenda tecnología.", n: "Marta G.", t: "Mamá de Dos", i: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?q=80&w=200&auto=format&fit=crop" },
                            { r: "Llegó súper asegurado. El chico del flete me esperó a que lo abriese, la mochila es rígida bellísima. Le pagué el efectivo ahí, la mejor compra de mi temporada.", n: "Julián V.", t: "Fotógrafo de Ruta", i: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop" }
                        ].map((rev, i) => (
                            <div key={i} className="bg-slate-900 border border-white/10 p-10 rounded-[2.5rem] relative shadow-lg hover:border-indigo-500/30 transition-all duration-500">
                                <img src={rev.i} alt={rev.n} className="w-16 h-16 rounded-full object-cover border-2 border-slate-700 mb-6"/>
                                <p className="text-sm font-medium text-slate-400 leading-relaxed mb-8 relative z-10 text-balance">"{rev.r}"</p>
                                <div className="flex items-center justify-between border-t border-slate-800 pt-6">
                                    <div className="text-xs font-black text-white uppercase tracking-wide">{rev.n}</div>
                                    <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">{rev.t}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 15. CHECKOUT */}
                <div id="checkout-action" className="py-24 md:py-32 bg-slate-950 relative border-t-[8px] border-indigo-500 overflow-hidden">
                    <div className="absolute top-0 right-0 w-[500px] h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/30 via-slate-950 to-slate-950 pointer-events-none mix-blend-screen"></div>

                    <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24 items-center">
                        <div className="md:col-span-5 relative text-center md:text-left">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-300 mb-6 bg-indigo-900/40 border border-indigo-500/30 px-3 py-1 rounded-full inline-block backdrop-blur-md">Petición Óptica Certificada</span>
                            <h3 className="text-4xl md:text-6xl font-black tracking-tight mb-6 text-white leading-[1.05] uppercase">Inicia la <br/>Expedición.</h3>
                            <p className="text-sm font-medium text-slate-400 mb-10 leading-relaxed max-w-sm mx-auto md:mx-0">Llena la bitácora física de entrega. El paquete te será trasladado seguro, con cero costo frontal. Abonas en físico al recibir.</p>
                            
                            <div className="text-5xl md:text-6xl font-black text-white tracking-tight">{fmtPrice(product.price)}</div>
                        </div>
                        
                        <div className="md:col-span-7 w-full border border-white/10 bg-slate-900/95 backdrop-blur-3xl p-8 md:p-12 shadow-[0_0_80px_rgba(129,140,248,0.15)] relative rounded-[3rem]">
                            <form onSubmit={e=>e.preventDefault()}>
                                <div className="space-y-6">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-2">Titularidad Registral</label>
                                        <input type="text" className="w-full bg-slate-950 border border-white/5 focus:border-indigo-500 text-white font-bold text-sm px-6 py-5 rounded-2xl outline-none transition-all" placeholder="Nombre Destinatario" />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-2">Enlace de Comunicación</label>
                                        <input type="tel" className="w-full bg-slate-950 border border-white/5 focus:border-indigo-500 text-white font-bold text-sm px-6 py-5 rounded-2xl outline-none transition-all" placeholder="Número Celular Activo" />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-2">Coordenadas Terrestres</label>
                                        <textarea rows={2} className="w-full bg-slate-950 border border-white/5 focus:border-indigo-500 text-white font-bold text-sm px-6 py-5 rounded-3xl outline-none transition-all resize-none" placeholder="Dirección Postal de Recepción" />
                                    </div>
                                    <div className="pt-6">
                                        <button className="w-full h-[70px] bg-white text-slate-950 font-black uppercase tracking-[0.15em] text-sm hover:bg-amber-400 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] rounded-3xl">
                                            Confirmar Despacho en Puerta
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
                <div className="bg-slate-900 border border-white/10 p-4 rounded-3xl flex items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
                    <div className="pl-3">
                        <div className="text-[10px] font-bold uppercase text-slate-400 tracking-widest mb-1">Aprobado C.O.D.</div>
                        <div className="font-black text-white text-xl tracking-tight leading-none">{fmtPrice(product.price)}</div>
                    </div>
                    <button onClick={() => document.getElementById('checkout-action')?.scrollIntoView({ behavior: 'smooth' })} className="bg-white text-slate-950 rounded-2xl px-6 py-3 font-black uppercase tracking-widest text-[11px] shadow-lg hover:bg-amber-400">
                        Aceptar
                    </button>
                </div>
            </div>

        </div>
    );
};

export default PdpSmartTelescope;
