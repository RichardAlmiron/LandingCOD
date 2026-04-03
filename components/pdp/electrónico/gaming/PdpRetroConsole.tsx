'use client';
import React, { useState } from 'react';
import { StoreData, Product } from '@/lib/types';
import EnhancedProductGallery from '@/components/pdp/EnhancedProductGallery';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { data: StoreData; product: Product; }

const PdpRetroConsole: React.FC<Props> = ({ data, product }) => {
    const [openSpecAcc, setOpenSpecAcc] = useState<number | null>(0);
    const [faqOpen, setFaqOpen] = useState<number | null>(null);
    const ai = product.aiContent;
    const fmtPrice = (n: number) => { const s = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); return `Gs. ${s}`; };
    
    // Aesthetic Palette: Vaporwave / Arcade Neon
    const bg = '#110c1c'; // Deep Purple Black
    const textMain = '#f8fafc'; // Slate 50
    const accentPink = '#d946ef'; // Fuchsia 500
    const accentCyan = '#06b6d4'; // Cyan 500

    return (
        <div style={{ background: bg, color: textMain, fontFamily: "'Inter', sans-serif" }} className="overflow-x-hidden selection:bg-fuchsia-500/30 selection:text-cyan-300 antialiased">
            
            {/* 0. AMBIENT VAPORWAVE GRID */}
            <div className="fixed top-0 left-0 w-full h-[100vh] pointer-events-none z-0 overflow-hidden mix-blend-screen opacity-30">
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(transparent_95%,rgba(217,70,239,0.3)_100%),linear-gradient(90deg,transparent_95%,rgba(6,182,212,0.3)_100%)] bg-[length:40px_40px] transform perspective-[500px] rotateX-[60deg] origin-bottom animate-[gridMove_20s_linear_infinite]"></div>
            </div>
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-fuchsia-600/10 blur-[150px] rounded-full pointer-events-none z-0"></div>

            {/* 1. TOP NAV (Arcade Header) */}
            <header className="sticky top-0 z-50 bg-[#110c1c]/80 backdrop-blur-md border-b border-fuchsia-500/20">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-fuchsia-500 to-cyan-500 p-[2px]">
                            <div className="w-full h-full bg-[#110c1c] rounded-full flex items-center justify-center">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d946ef" strokeWidth="2"><path d="M6 12h4m-2-2v4m10-4h.01M16 14h.01"/><rect width="20" height="16" x="2" y="4" rx="3"/></svg>
                            </div>
                        </div>
                        <span className="font-black text-xl tracking-[0.1em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 uppercase italic">
                            NEON<span className="font-light text-white">CADE</span>
                        </span>
                    </div>
                </div>
            </header>

            <main className="relative z-10 w-full overflow-hidden">
                {/* 2. BREADCRUMBS & LOGISTICS */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6 pb-2">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="text-[10px] font-black uppercase tracking-widest text-cyan-400 bg-cyan-900/20 px-4 py-2 border border-cyan-500/30 inline-flex items-center gap-2 rounded-r-xl rounded-l-sm border-l-4 border-l-fuchsia-500">
                            ENTRETENIMIENTO / RETRO / <span className="text-white">{product.title.substring(0, 15)}...</span>
                        </div>
                        <div className="inline-flex items-center gap-2 text-[10px] font-bold text-fuchsia-400 uppercase tracking-widest">
                            INSERT COIN A LA ENTREGA (C.O.D)
                        </div>
                    </div>
                </div>

                {/* 3. HERO SECTION (16-BIT GLORY) */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 lg:py-16 relative">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
                        <div className="flex flex-col relative z-20 lg:col-span-5">
                            <div className="flex items-center gap-2 mb-6">
                                <span className="flex items-center bg-fuchsia-500/10 border border-fuchsia-500 px-3 py-1 text-[10px] uppercase font-black tracking-widest text-fuchsia-400">
                                    [ 15.000 JUEGOS PRE-CARGADOS ]
                                </span>
                            </div>
                            
                            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-[0.95] mb-6 uppercase italic drop-shadow-[0_0_20px_rgba(217,70,239,0.3)]">
                                {ai?.enhancedTitle || "Consola Arcade Portátil"}
                            </h1>
                            <p className="text-base md:text-lg font-medium text-cyan-100/70 mb-10 leading-snug">
                                {ai?.enhancedDescription || "Vuelve a los 90s sin gastar fichas. Conecta este stick HDMI a tu Smart TV y juega PS1, N64 y todos los clásicos Arcade al instante. Dos mandos inalámbricos incluidos."}
                            </p>

                            <div className="bg-[#1a122e] p-8 border-t-2 border-l-2 border-fuchsia-500 rounded-br-3xl shadow-[5px_5px_0px_0px_#06b6d4]">
                                <div className="flex flex-col sm:flex-row sm:items-end gap-6 mb-8 relative z-10">
                                    <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-cyan-300 tracking-tighter drop-shadow-md">{fmtPrice(product.price)}</span>
                                    {product.originalPrice && <span className="text-xl font-bold text-fuchsia-900 line-through pb-1">{fmtPrice(product.originalPrice)}</span>}
                                </div>
                                <button onClick={() => document.getElementById('checkout-action')?.scrollIntoView({ behavior: 'smooth' })} className="w-full h-[64px] bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white font-black uppercase tracking-[0.2em] text-[13px] hover:scale-[1.02] transition-transform flex items-center justify-center gap-3 rounded-xl shadow-[0_0_30px_rgba(6,182,212,0.4)]">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                                    START PLAYER 1 (COMPRAR)
                                </button>
                                <div className="flex items-center justify-center mt-4 text-[10px] font-black text-cyan-500 uppercase tracking-widest">
                                    Abonas en la puerta de tu casa
                                </div>
                            </div>
                        </div>

                        <div className="relative z-10 lg:col-span-7 flex items-center justify-center p-2">
                            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="w-full max-w-[600px] aspect-video relative bg-[#0d0914] rounded-2xl border-2 border-cyan-500/30 overflow-hidden shadow-[0_0_50px_rgba(217,70,239,0.2)]">
                                <EnhancedProductGallery product={product} accentColor={accentCyan} />
                                {/* Emulated Scanlines */}
                                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none mix-blend-overlay"></div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* 4. TRUST BADGES TECHNICAL */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 pb-16">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            {v: '4K', l: 'Upscaling HDMI'},
                            {v: '2.4G', l: 'Mandos Inalámbricos'},
                            {v: '64GB', l: 'MicroSD Incluida'},
                            {v: 'Save', l: 'Guardado de Partida'}
                        ].map((b, i) => (
                            <div key={i} className="flex flex-col items-center justify-center p-6 bg-[#1a122e]/50 border border-cyan-500/20 rounded-xl backdrop-blur-sm">
                                <span className="text-white font-black text-2xl tracking-tighter mb-1 italic">{b.v}</span>
                                <span className="text-[10px] font-bold text-fuchsia-400 uppercase tracking-widest">{b.l}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 5. EXPERT ACCORDIONS */}
                <div className="max-w-4xl mx-auto px-4 md:px-8 py-20 relative">
                    <div className="mb-10 text-center">
                        <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-cyan-300 uppercase italic">Revive Tu <span className="text-fuchsia-500">Infancia.</span></h2>
                    </div>
                    <div className="bg-[#1a122e] border border-fuchsia-500/30 rounded-2xl shadow-[0_0_40px_rgba(217,70,239,0.1)]">
                        {[
                            { t: 'Plug & Play Real', a: 'Nada de instalaciones complejas. Es un pendrive gigante. Lo insertas en el puerto HDMI de tu televisor, conectas el cable de poder a un USB cercano, y la interfaz de selección de juegos arranca en 10 segundos.' },
                            { t: 'Arquitectura Inalámbrica', a: 'Los dos controles estilo PS2 incluidos funcionan con receptores USB de 2.4Ghz. Puedes jugar desde el sofá a 8 metros de distancia sin que los cables crucen por toda tu sala de estar.' },
                            { t: 'Guardado Mágico (Savestates)', a: '¿Te tenías que ir a cenar y perdías el progreso en Super Mario? Ya no. Presionando Select+Start puedes guardar la partida exactamente en el píxel donde estás, e incluso retroceder si te matan.' }
                        ].map((ac, i) => (
                            <div key={i} className="border-b border-cyan-500/20 last:border-b-0">
                                <button onClick={() => setOpenSpecAcc(openSpecAcc===i?null:i)} className="w-full text-left p-6 md:p-8 flex items-center justify-between text-xs font-black uppercase tracking-widest text-cyan-100 hover:text-white transition-all bg-[#1a122e] rounded-xl">
                                    <div className="flex items-center gap-4">
                                        <div className="text-cyan-400 font-black tracking-tighter font-mono">{i+1}P</div>
                                        {ac.t}
                                    </div>
                                    <span className="text-fuchsia-500 font-black text-xl">{openSpecAcc===i?'-':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {openSpecAcc === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 md:px-8 pb-8 pl-[4.5rem] text-sm font-medium text-cyan-100/60 leading-relaxed bg-[#1a122e] rounded-b-xl">
                                            {ac.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 6. ENDLESS MARQUEE (Pixel Art Text Style) */}
                <div className="w-full overflow-hidden py-4 bg-fuchsia-600 border-y border-cyan-400 mb-10 shadow-[0_0_30px_rgba(217,70,239,0.5)]">
                    <div className="flex whitespace-nowrap animate-marquee font-black uppercase text-2xl tracking-[0.2em] text-white">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="flex items-center gap-8 px-8">
                                <span>CRASH BANDICOOT</span><span className="text-cyan-300">★</span>
                                <span>SUPER MARIO WORLD</span><span className="text-cyan-300">★</span>
                                <span>STREET FIGHTER II</span><span className="text-cyan-300">★</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 7. BENEFITS CON IMAGENES UNSPLASH VAPORWAVE / NEON */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-24 mb-16">
                    <div className="text-center mb-16 relative">
                        <h2 className="text-4xl font-black tracking-tighter text-white uppercase italic">Multiverso <span className="text-cyan-400">Retro.</span></h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop', t: 'Noche de Amigos', d: 'Perfecto para reuniones. Rompe el hielo jugando a los clásicos de lucha o carreras en pantalla dividida.' },
                            { img: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=1000&auto=format&fit=crop', t: '30 Emuladores en Uno', d: 'Soporta MAME, FC, GB, GBA, GBC, MD, SFC, PS1 y ATARI. Una enciclopedia histórica de la industria.' },
                            { img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1000&auto=format&fit=crop', t: 'Upscaling HD', d: 'El procesador estira las resoluciones pixeladas nativas de los juegos antiguos para que no se vean borrosos en tu TV de 4K.' }
                        ].map((b, i) => (
                            <div key={i} className="bg-[#150f24] rounded-3xl overflow-hidden border border-fuchsia-500/20 group hover:border-cyan-500 transition-all duration-500 shadow-xl">
                                <div className="h-48 w-full relative overflow-hidden filter hue-rotate-15 contrast-125">
                                     <img src={b.img} alt={b.t} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-80" />
                                     <div className="absolute inset-0 bg-gradient-to-t from-[#150f24] to-transparent"></div>
                                </div>
                                <div className="p-8 relative z-10">
                                    <h3 className="text-lg font-black text-cyan-300 mb-2 uppercase tracking-wide">{b.t}</h3>
                                    <p className="text-sm font-medium text-slate-400 leading-relaxed">{b.d}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 10. COMPARISON TABLE */}
                <div className="max-w-5xl mx-auto px-4 md:px-8 py-24">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black tracking-tighter text-white uppercase italic">Consola vs Mini-PC.</h2>
                    </div>
                    
                    <div className="bg-[#1a122e] border-2 border-cyan-500/50 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.1)]">
                        <div className="grid grid-cols-3 border-b-2 border-cyan-500/50 text-[10px] font-black uppercase tracking-widest text-fuchsia-400">
                            <div className="p-6 md:p-8 bg-[#150f24]">Experiencia</div>
                            <div className="p-6 md:p-8 text-center text-cyan-300 bg-cyan-900/20 border-x-2 border-cyan-500/50">NEONCADE STICK</div>
                            <div className="p-6 md:p-8 text-center bg-[#150f24]">PC Gamer (Emulador)</div>
                        </div>
                        {[
                            { k: 'Tiempo de Setup', u: '10 Segundos', t: 'Horas bajando ROMs/BIOS' },
                            { k: 'Portabilidad', u: 'Cabe en el bolsillo del jean', t: 'Intrasladable' },
                            { k: 'Mandos', u: 'Pares Inalámbricos incluidos', t: 'Comprar por separado ($100+)' },
                            { k: 'Interfaz', u: 'Dedicada para TV (Arcade)', t: 'Teclado y ratón de Windows' }
                        ].map((r, i) => (
                            <div key={i} className="grid grid-cols-3 border-b border-fuchsia-500/10 last:border-b-0 text-xs md:text-sm">
                                <div className="p-6 md:p-8 font-bold text-white bg-[#150f24]">{r.k}</div>
                                <div className="p-6 md:p-8 font-black text-cyan-100 text-center flex items-center justify-center border-x-2 border-cyan-500/50 bg-cyan-900/10 drop-shadow-md">{r.u}</div>
                                <div className="p-6 md:p-8 font-medium text-slate-500 text-center flex items-center justify-center bg-[#150f24]">{r.t}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 11. RISK REVERSAL WARRANTY */}
                <div className="max-w-5xl mx-auto px-4 md:px-8 py-12">
                    <div className="bg-gradient-to-r from-fuchsia-600 to-cyan-600 p-[2px] rounded-3xl">
                        <div className="bg-[#110c1c] p-10 md:p-14 rounded-[calc(1.5rem-2px)] md:flex items-center gap-10">
                            <div className="w-20 h-20 shrink-0 border border-fuchsia-500 rounded-2xl flex items-center justify-center mb-6 md:mb-0 shadow-[0_0_20px_rgba(217,70,239,0.5)]">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                            </div>
                            <div>
                                <h3 className="text-2xl font-black tracking-tight mb-3 text-white uppercase italic">Continúa. No Gamas Over Financiero.</h3>
                                <p className="font-medium text-cyan-100/70 leading-relaxed text-sm">
                                    Pagar adelantado por equipos electrónicos es arriesgado. Por eso somos el "Nivel Secreto". Pide hoy la consola, nosotros enviamos al repartidor. Lo recibes en caja cerrada frente a tu puerta, compruebas que la orden es la correcta, y abonas tu dinero (Efectivo/Transferencia) al mensajero. Simple y Retro, como los tratos antes del internet.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 15. CHECKOUT */}
                <div id="checkout-action" className="py-24 md:py-32 relative">
                    <div className="absolute inset-0 bg-[#0d0914]"></div>
                    <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24 items-center">
                        <div className="md:col-span-5 relative text-center md:text-left">
                            <h3 className="text-5xl md:text-6xl font-black tracking-tighter mb-4 text-white uppercase italic">Select<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">Player 1.</span></h3>
                            <p className="text-sm font-medium text-slate-400 mb-10 leading-relaxed">Solo coloca tus datos de contacto abajo. Operamos Envío C.O.D (Pagas al repartidor en persona).</p>
                            
                            <div className="text-6xl font-black text-white tracking-tighter drop-shadow-[0_0_15px_rgba(217,70,239,0.5)]">{fmtPrice(product.price)}</div>
                        </div>
                        
                        <div className="md:col-span-7 w-full border-4 border-[#1a122e] bg-[#110c1c] p-8 md:p-12 rounded-3xl relative overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.1)]">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-500/20 blur-[50px]"></div>
                            <form onSubmit={e=>e.preventDefault()} className="relative z-10">
                                <div className="space-y-6">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.2em] px-2">Player 1 (Nombre)</label>
                                        <input type="text" className="w-full bg-[#1a122e] text-white font-bold text-sm px-6 py-5 outline-none border-2 border-transparent focus:border-cyan-500 rounded-xl transition-all" placeholder="Escribe tu nombre" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.2em] px-2">Connection (Celular)</label>
                                        <input type="tel" className="w-full bg-[#1a122e] text-white font-bold text-sm px-6 py-5 outline-none border-2 border-transparent focus:border-cyan-500 rounded-xl transition-all" placeholder="Número para WhatsApp/Llamadas" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.2em] px-2">Map Level (Dirección)</label>
                                        <textarea rows={2} className="w-full bg-[#1a122e] text-white font-bold text-sm px-6 py-5 outline-none border-2 border-transparent focus:border-cyan-500 rounded-xl transition-all resize-none" placeholder="Ingresa calle, ciudad, referencias..." />
                                    </div>
                                    <div className="pt-6">
                                        <button className="w-full h-[70px] bg-gradient-to-r from-fuchsia-600 to-cyan-600 text-white font-black uppercase tracking-[0.2em] text-[13px] hover:scale-[1.03] transition-transform rounded-2xl shadow-[0_10px_30px_rgba(217,70,239,0.3)]">
                                            Confirmar Compra (Pago en Casa)
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </main>

            <style dangerouslySetInnerHTML={{__html: `
                @keyframes gridMove { 0% { background-position: 0 0, 0 0; } 100% { background-position: 0 100%, 0 0; } }
                @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
                .animate-marquee { animation: marquee 16s linear infinite; }
            `}} />
        </div>
    );
};

export default PdpRetroConsole;
