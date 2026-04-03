'use client';
import React, { useState } from 'react';
import { StoreData, Product } from '@/lib/types';
import EnhancedProductGallery from '@/components/pdp/EnhancedProductGallery';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { data: StoreData; product: Product; }

const PdpStarProjector: React.FC<Props> = ({ data, product }) => {
    const [openSpecAcc, setOpenSpecAcc] = useState<number | null>(0);
    const [faqOpen, setFaqOpen] = useState<number | null>(null);
    const ai = product.aiContent;
    const fmtPrice = (n: number) => { const s = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); return `Gs. ${s}`; };
    
    // Aesthetic Palette: Nebula / Deep Space / Sleep
    const bg = '#020014'; // Almost black purple
    const textMain = '#e2e8f0'; // Slate 200
    const accentPurple = '#a855f7'; // Purple 500
    const accentBlue = '#3b82f6'; // Blue 500

    return (
        <div style={{ background: bg, color: textMain, fontFamily: "'Inter', sans-serif" }} className="overflow-x-hidden selection:bg-purple-500/30 selection:text-purple-200 antialiased">
            
            {/* 0. AMBIENT NEBULA BACKGROUND */}
            <div className="fixed top-0 left-0 w-full h-[100vh] pointer-events-none z-0 overflow-hidden mix-blend-screen opacity-40">
                 <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-purple-900/20 blur-[120px] animate-[pulse_10s_ease-in-out_infinite_alternate]"></div>
                 <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-blue-900/20 blur-[120px] animate-[pulse_12s_ease-in-out_infinite_alternate_reverse]"></div>
            </div>

            {/* 1. TOP NAV (Space Station) */}
            <header className="sticky top-0 z-50 bg-[#020014]/60 backdrop-blur-2xl border-b border-purple-900/30">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-blue-500 p-[1px] animate-spin-slow">
                            <div className="w-full h-full bg-[#020014] rounded-full flex items-center justify-center">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 font-bold">✦</span>
                            </div>
                        </div>
                        <span className="font-light text-xl tracking-[0.3em] text-white uppercase">
                            NOVA<span className="font-bold text-purple-400">LUX</span>
                        </span>
                    </div>
                </div>
            </header>

            <main className="relative z-10 w-full overflow-hidden">
                {/* 2. BREADCRUMBS & LOGISTICS */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6 pb-2">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="text-[9px] font-medium uppercase tracking-[0.3em] text-purple-300 border border-purple-500/30 px-4 py-2 rounded-full inline-flex items-center gap-2 bg-purple-900/10 backdrop-blur">
                            ILUMINACIÓN AMBIENTAL / <span className="text-white">{product.title.substring(0, 15)}...</span>
                        </div>
                        <div className="inline-flex items-center gap-2 text-[10px] font-bold text-blue-400 uppercase tracking-widest">
                            ☄ ENTREGA (PAGO C.O.D)
                        </div>
                    </div>
                </div>

                {/* 3. HERO SECTION (DEEP SPACE) */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 lg:py-16 relative">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
                        <div className="flex flex-col relative z-20 lg:col-span-5 text-center lg:text-left">
                            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white leading-[1] mb-6 drop-shadow-[0_0_30px_rgba(168,85,247,0.4)]">
                                {ai?.enhancedTitle || "Proyector de Galaxia Smart"}
                            </h1>
                            <p className="text-base md:text-lg font-light text-purple-200/80 mb-10 leading-relaxed">
                                {ai?.enhancedDescription || "Transforma tu techo en un planetario 4K. Duerme bajo un cielo de nebulosas en movimiento y estrellas láser que respiran al ritmo de Ruido Blanco integrado."}
                            </p>

                            <div className="bg-[#0a071d]/80 backdrop-blur-xl p-8 rounded-[2rem] shadow-[0_0_50px_rgba(168,85,247,0.15)] border border-purple-500/20 relative mx-auto lg:mx-0 max-w-sm w-full">
                                <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent rounded-[2rem] pointer-events-none"></div>
                                <div className="flex flex-col items-center lg:items-start gap-4 mb-8 relative z-10">
                                    <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200 tracking-tighter">{fmtPrice(product.price)}</span>
                                    {product.originalPrice && <span className="text-sm font-medium text-purple-400/50 line-through">{fmtPrice(product.originalPrice)}</span>}
                                </div>
                                <button onClick={() => document.getElementById('checkout-action')?.scrollIntoView({ behavior: 'smooth' })} className="w-full h-[60px] bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold uppercase tracking-[0.2em] text-[12px] hover:scale-[1.02] transition-transform duration-300 flex items-center justify-center rounded-full shadow-[0_10px_30px_rgba(168,85,247,0.3)] hover:shadow-[0_10px_40px_rgba(168,85,247,0.5)]">
                                    Encender Cosmos (C.O.D)
                                </button>
                                <div className="text-center mt-4 text-[9px] font-medium text-purple-400/70 uppercase tracking-widest">
                                    Lo recibes intacto, lo pagas al instante
                                </div>
                            </div>
                        </div>

                        <div className="relative z-10 lg:col-span-7 flex items-center justify-center p-2 lg:p-8">
 <div className="w-full max-w-[500px] relative bg-[#020014] rounded-full p-4 shadow-[0_0_100px_rgba(59,130,246,0.2)] border border-blue-500/20 flex items-center justify-center">
                                {/* Orbit rings */}
                                <div className="absolute inset-4 border border-purple-500/20 rounded-full animate-[spin_60s_linear_infinite]"></div>
                                <div className="absolute inset-10 border border-blue-500/20 rounded-full animate-[spin_40s_linear_infinite_reverse]"></div>
                                
                                <div className="w-full h-full relative z-10 rounded-full overflow-hidden">
                                     <EnhancedProductGallery product={product} accentColor={accentPurple} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. TRUST BADGES TECHNICAL */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 pb-16">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            {v: 'WiFi', l: 'App & Alexa / Google'},
                            {v: 'RGBW', l: '16 Millones de Colores'},
                            {v: 'Class 1', l: 'Láser Óptico Seguro'},
                            {v: 'Dual', l: 'Altavoz Bluetooth 5.0'}
                        ].map((b, i) => (
                            <div key={i} className="flex flex-col items-center justify-center p-6 bg-[#0a071d] border border-purple-500/10 rounded-2xl shadow-[inset_0_0_20px_rgba(168,85,247,0.05)]">
                                <span className="text-white font-light text-3xl tracking-tight mb-1">{b.v}</span>
                                <span className="text-[9px] font-medium text-purple-400 uppercase tracking-widest text-center">{b.l}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 5. EXPERT ACCORDIONS */}
                <div className="max-w-4xl mx-auto px-4 md:px-8 py-20 relative">
                    <div className="mb-12 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white uppercase font-light">Mecánica <span className="text-purple-400 font-bold">Celeste.</span></h2>
                    </div>
                    <div className="space-y-4">
                        {[
                            { t: 'Nubes de Nebulosa Dinámica', a: 'Un cristal facetado interno gira motorizadamente frente a un array LED potente, proyectando auroras densas y nubes de gas espacial sobre tu techo que cambian morfología como el agua fluyendo.' },
                            { t: 'Ruido Blanco & Bluetooth', a: 'Incluye audios bi-aurales pre-cargados (Lluvia, Olas, Bosque nocturno). O conéctalo por Bluetooth a Spotify y pon tu propia lista Lofi. Si activas el modo micrófono, la nebulosa titilará al ritmo del beat de la música.' },
                            { t: 'Temporizador Inteligente y App', a: '¿Te acuestas a dormir? Dile "Alexa, activa modo sueño". El proyector bajará la luz al 15%, y se apagará solo después de 1 o 2 horas para no gastar lúmenes toda la madrugada.' }
                        ].map((ac, i) => (
                            <div key={i} className="bg-[#0a071d] border border-purple-900/30 rounded-2xl overflow-hidden backdrop-blur-sm">
                                <button onClick={() => setOpenSpecAcc(openSpecAcc===i?null:i)} className="w-full text-left p-6 md:p-8 flex items-center justify-between text-sm font-medium uppercase tracking-widest text-purple-100 transition-all hover:bg-purple-900/20">
                                    <div className="flex items-center gap-4">
                                        <div className="text-purple-400 opacity-50">✦ {i+1}</div>
                                        {ac.t}
                                    </div>
                                    <span className="text-purple-400 font-light text-2xl leading-none">{openSpecAcc===i?'-':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {openSpecAcc === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 md:px-8 pb-8 pl-[4.5rem] text-sm font-normal text-purple-200/60 leading-relaxed text-balance">
                                            {ac.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 7. BENEFITS CON IMAGENES */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-24 mb-16 relative">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#020014] via-purple-900/10 to-[#020014] pointer-events-none -z-10"></div>
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-light tracking-tight text-white mb-6 uppercase">La Atmósfera <span className="font-bold text-blue-400">Perfecta.</span></h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { img: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1000&auto=format&fit=crop', t: 'Hack para el Insomnio', d: 'El movimiento rítmico de la luz lenta hipnotiza el sistema nervioso parasimpático y relaja la mente acelerada antes de dormir.' },
                            { img: 'https://images.unsplash.com/photo-1549468057-5ce754b4f164?q=80&w=1000&auto=format&fit=crop', t: 'Gaming Room & Cine', d: 'Apaga las luces blancas y enciende el láser azul. Tus tardes de PS5 o películas tendrán estética de nave espacial sci-fi profunda.' },
                            { img: 'https://images.unsplash.com/photo-1540324155974-7523202daa3f?q=80&w=1000&auto=format&fit=crop', t: 'Pánico a la Oscuridad', d: 'Reemplazo absoluto del velador para niños. En lugar de miedo, sentirán fascinación acampando imaginariamente bajo la Vía Láctea.' }
                        ].map((b, i) => (
                            <div key={i} className="bg-[#0a071d] border border-blue-900/20 rounded-[2rem] overflow-hidden group hover:border-purple-500/30 transition-all duration-300">
                                <div className="h-60 w-full relative overflow-hidden bg-black">
                                     <img src={b.img} alt={b.t} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-60 mix-blend-screen" />
                                     <div className="absolute inset-0 bg-gradient-to-t from-[#0a071d] via-transparent to-transparent"></div>
                                </div>
                                <div className="p-8 relative z-10 -mt-6">
                                    <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">{b.t}</h3>
                                    <p className="text-sm font-light text-purple-200/60 leading-relaxed text-balance">{b.d}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 11. RISK REVERSAL WARRANTY */}
                <div className="max-w-5xl mx-auto px-4 md:px-8 py-12">
                    <div className="bg-gradient-to-br from-purple-900/40 to-blue-900/20 border border-purple-500/20 p-10 md:p-14 rounded-[3rem] text-white md:flex items-center gap-10 backdrop-blur-md shadow-[0_0_50px_rgba(168,85,247,0.1)]">
                        <div className="w-16 h-16 shrink-0 bg-white/10 rounded-full flex items-center justify-center mb-6 md:mb-0 border border-purple-500/30">
                            <span className="text-2xl">🌍</span>
                        </div>
                        <div className="relative z-10 w-full text-center md:text-left">
                            <h3 className="text-2xl font-bold tracking-tight mb-2 uppercase">Gravedad Cero / Riesgo Cero</h3>
                            <p className="font-light text-purple-100/80 leading-relaxed text-sm md:text-base">
                                El pedido viaja desde nuestra bodega hasta tu órbita local (casa) sin cobrarte nada por adelantado online. El mensajero aterriza en tu puerta con la nave (caja) impecable. Inspeccionas, y si todo está correcto, entregas el pago en efectivo para concretar la misión comercial. Sin tarjetas, sin comisiones raras.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 15. CHECKOUT */}
                <div id="checkout-action" className="py-24 md:py-32 relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0a27] to-[#020014] -z-10 border-t border-purple-900/30"></div>
                    <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24 items-center">
                        <div className="md:col-span-5 relative text-center md:text-left">
                            <h3 className="text-5xl md:text-6xl font-light tracking-tighter mb-6 text-white uppercase leading-[1.1]">Solicita Tu <br/><span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Universo.</span></h3>
                            <p className="text-sm font-light text-purple-200/60 mb-10 leading-relaxed">Completa los datos satelitales. Pagarás el total únicamente al cadete en la puerta de tu domicilio.</p>
                            
                            <div className="text-6xl font-black text-white tracking-tighter drop-shadow-[0_0_20px_rgba(168,85,247,0.3)]">{fmtPrice(product.price)}</div>
                        </div>
                        
                        <div className="md:col-span-7 w-full border border-purple-500/20 bg-[#0a071d]/80 backdrop-blur-xl p-8 md:p-12 rounded-[3rem] shadow-[0_20px_80px_rgba(0,0,0,0.5)]">
                            <form onSubmit={e=>e.preventDefault()}>
                                <div className="space-y-6">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-medium text-purple-400 uppercase tracking-[0.2em]">Comandante (Nombre)</label>
                                        <input type="text" className="w-full bg-[#020014] border border-purple-900 focus:border-purple-500 text-white font-medium text-sm px-6 py-4 outline-none transition-all rounded-full shadow-inner" placeholder="Tu nombre..." />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-medium text-purple-400 uppercase tracking-[0.2em]">Frecuencia (Celular)</label>
                                        <input type="tel" className="w-full bg-[#020014] border border-purple-900 focus:border-purple-500 text-white font-medium text-sm px-6 py-4 outline-none transition-all rounded-full shadow-inner" placeholder="Línea activa para Whatsapp..." />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-medium text-purple-400 uppercase tracking-[0.2em]">Base Espacial (Dirección)</label>
                                        <textarea rows={2} className="w-full bg-[#020014] border border-purple-900 focus:border-purple-500 text-white font-medium text-sm px-6 py-4 outline-none transition-all resize-none rounded-3xl shadow-inner" placeholder="Coordenadas de entrega..." />
                                    </div>
                                    <div className="pt-4">
                                        <button className="w-full h-[64px] bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold uppercase tracking-[0.2em] text-[12px] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-shadow rounded-full">
                                            Confirmar Lanzamiento (Pagar C.O.D)
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
};

export default PdpStarProjector;
