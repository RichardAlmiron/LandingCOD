'use client';
import React, { useState } from 'react';
import { StoreData, Product } from '@/lib/types';
import EnhancedProductGallery from '@/components/pdp/EnhancedProductGallery';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { data: StoreData; product: Product; }

const PdpPodcasterPro: React.FC<Props> = ({ data, product }) => {
    const [openSpecAcc, setOpenSpecAcc] = useState<number | null>(0);
    const [faqOpen, setFaqOpen] = useState<number | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const ai = product.aiContent;
    const fmtPrice = (n: number) => { const s = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); return `Gs. ${s}`; };
    
    // Aesthetic Palette: Broadcast Studio
    const bg = '#111111';
    const textMain = '#E5E5E5';
    const accentRed = '#FF2A2A';

    return (
        <div style={{ background: bg, color: textMain, fontFamily: "'Inter', sans-serif" }} className="overflow-x-hidden selection:bg-[#FF2A2A]/30 antialiased relative">
            
            {/* 0. AMBIENT FOAM TEXTURE */}
            <div className="fixed inset-0 pointer-events-none z-0 opacity-20" style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/carbon-fibre.png')` }}></div>

            {/* 1. TOP NAV */}
            <header className="sticky top-0 z-50 bg-[#111111]/90 backdrop-blur-md border-b-2 border-[#1c1c1c]">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5 font-black uppercase tracking-tighter text-white">
                            <span className="w-3 h-3 bg-[#FF2A2A] rounded-full animate-pulse shadow-[0_0_10px_#FF2A2A]"></span>
                            STUDIO_ON_AIR
                        </div>
                    </div>
                    <nav className="hidden lg:flex gap-8">
                        {['Cápsula', 'EQ', 'Accesorios'].map((item) => (
                            <a key={item} href={`#${item.toLowerCase()}`} className="text-xs font-bold tracking-widest uppercase text-[#888888] hover:text-[#FF2A2A] transition-colors">
                                {item}
                            </a>
                        ))}
                    </nav>
                </div>
            </header>

            <main className="relative z-10">
                {/* 2. BREADCRUMBS & MICRO-LOGISTICS */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 pb-4">
                    <div className="flex flex-wrap items-center justify-between gap-4 font-bold text-[10px] uppercase tracking-widest text-[#777777]">
                        <div className="flex items-center gap-2">
                            <span>Audio</span> <span className="text-[#333333]">-</span> <span>Broadcast</span> <span className="text-[#333333]">-</span> <span className="text-white">{product.title.substring(0, 15)}...</span>
                        </div>
                        <div className="flex items-center gap-2 border border-[#FF2A2A]/40 bg-[#FF2A2A]/10 px-3 py-1.5 text-[#FF2A2A] rounded-sm">
                            Envío Protegido (24H/48H)
                        </div>
                    </div>
                </div>

                {/* 3. HERO SECTION */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 lg:py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="relative bg-[#1a1a1a] p-4 rounded-xl shadow-2xl border border-[#222222]">
                            <EnhancedProductGallery product={product} accentColor={accentRed} />
                            <div className="absolute top-8 left-8 flex flex-col gap-1 pointer-events-none">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="w-1 h-3 rounded-full bg-white/20" style={{ height: `${Math.random()*20+5}px`, background: i > 3 ? '#FF2A2A' : (i > 1 ? '#eab308' : '#22c55e') }}></div>
                                ))}
                            </div>
                        </motion.div>

                        <div className="flex flex-col relative pt-4">
                            {/* Rating */}
                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex text-[#FF2A2A]">
                                    {[...Array(5)].map((_,i) => <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
                                </div>
                                <span className="text-xs font-black text-[#aaaaaa] uppercase tracking-widest">5 Estrellas (Rango Vocal)</span>
                            </div>
                            
                            <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-none mb-6 text-white uppercase">
                                {ai?.enhancedTitle || product.title}
                            </h1>
                            <p className="text-sm md:text-base font-medium text-[#aaaaaa] mb-10 leading-relaxed border-l-4 border-[#FF2A2A] pl-5">
                                {ai?.enhancedDescription || product.description || 'Patrón polar cardioide absoluto. Rechaza el eco de tu cuarto y captura los graves profundos de una emisora de radio real sin interfaces dolorosas.'}
                            </p>

                            <div className="bg-[#181818] border-2 border-[#262626] p-8 rounded-xl mb-6">
                                <div className="flex items-end gap-6 mb-8">
                                    <span className="text-4xl md:text-5xl font-black tracking-tighter">{fmtPrice(product.price)}</span>
                                    {product.originalPrice && <span className="text-lg font-bold text-[#666666] line-through pb-1 decoration-2">{fmtPrice(product.originalPrice)}</span>}
                                </div>
                                <button onClick={() => document.getElementById('checkout-mic')?.scrollIntoView({ behavior: 'smooth' })} className="w-full h-[64px] bg-[#FF2A2A] text-white font-black uppercase tracking-[0.2em] text-sm hover:bg-white hover:text-black transition-colors rounded-sm shadow-[0_10px_30px_rgba(255,42,42,0.2)]">
                                    Añadir al Setup
                                </button>
                            </div>

                            {/* 4. TRUST BADGES */}
                            <div className="flex font-bold text-[10px] uppercase tracking-widest text-[#777777] justify-between border-t border-[#222] pt-6">
                                <span className="flex items-center gap-1.5"><svg className="text-[#FF2A2A]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> USB & XLR</span>
                                <span className="flex items-center gap-1.5"><svg className="text-[#FF2A2A]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> 2 Años Gti.</span>
                                <span className="flex items-center gap-1.5"><svg className="text-[#FF2A2A]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/></svg> COD Disp.</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 5. ABOVE FOLD DETAILS (ACCORDIONS) */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 pb-16">
                    <div className="border border-[#333] bg-[#151515] rounded-xl overflow-hidden shadow-xl">
                        {[
                            { t: 'Dinámico de Diafragma Grande', a: 'No requiere alimentación Phantom power pesada. Captura la resonancia torácica sin alterar la curva de agudos (ideal para Spoken Word).' },
                            { t: 'Inmunidad Magnética', a: 'Blindaje interno que rechaza el zumbido electromagnético de monitores, luces LED y routers cercanos a tu set.' },
                            { t: 'Metodología de Envío', a: 'Solicitas desde la web y aguardas relajado. El operador logístico tocará tu puerta con el paquete hermético y allí haces el pago.' }
                        ].map((ac, i) => (
                            <div key={i} className="border-b border-[#222] last:border-b-0">
                                <button onClick={() => setOpenSpecAcc(openSpecAcc===i?null:i)} className="w-full text-left px-8 py-5 flex items-center justify-between font-black uppercase text-xs tracking-widest text-[#eeeeee] hover:bg-[#222] transition-colors">
                                    {ac.t} 
                                    <span className="text-[#FF2A2A] font-bold text-lg">{openSpecAcc===i?'-':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {openSpecAcc === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-8 pb-6 pt-2 text-sm font-medium text-[#888888] leading-relaxed border-t border-dashed border-[#333]">
                                            {ac.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 6. ENDLESS MARQUEE */}
                <div className="w-[100vw] overflow-hidden py-4 bg-[#FF2A2A] border-y border-[#FF2A2A] relative left-[50%] -translate-x-[50%] text-[#111111]">
                    <div className="flex whitespace-nowrap animate-marquee font-black uppercase text-xl md:text-2xl tracking-tighter">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="flex items-center gap-12 px-6">
                                <span>RANGO DE 50HZ A 20KHZ</span><span className="opacity-30">|</span>
                                <span>CERO LATENCIA DE MONITOREO</span><span className="opacity-30">|</span>
                                <span>DOBLE FILTRO ANTIPOP INTEGRADO</span><span className="opacity-30">|</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 7. WHY TO USE / BENEFITS */}
                <div id="cápsula" className="max-w-7xl mx-auto px-4 md:px-8 py-24">
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-20 text-center">No más eco <span className="text-[#FF2A2A]">de baño.</span></h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { ic: '🎙️', t: 'Aislamiento Frontal', d: 'Graba en tu sala sin tratar acústicamente las paredes. El patrón supercardioide es sordo a los costados y atrás.' },
                            { ic: '🎛️', t: 'Hardware DSP', d: 'No uses software para nivelar tu voz. El micro comprime y limita picos agresivos internamente antes de enviarlo al PC.' },
                            { ic: '🎧', t: 'Jack de Retorno', d: 'Conecta tus auriculares directamente al cuerpo del micrófono. Escúchate en tiempo real puro, sin ese retraso espantoso de Windows.' }
                        ].map((b, i) => (
                            <div key={i} className="bg-[#181818] border border-[#2A2A2A] p-10 rounded-2xl relative text-center hover:bg-[#1f1f1f] transition-all group">
                                <div className="absolute top-0 right-10 w-20 h-[2px] bg-[#FF2A2A] scale-x-0 group-hover:scale-x-100 transition-transform origin-right"></div>
                                <div className="text-5xl mb-6">{b.ic}</div>
                                <h3 className="text-xl font-black tracking-widest uppercase mb-4 text-white">{b.t}</h3>
                                <p className="text-sm font-medium text-[#888888] leading-relaxed">{b.d}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 8. HOW TO USE (VISUAL GUIDE) */}
                <div id="eq" className="bg-[#0A0A0A] py-24 border-y border-[#222]">
                    <div className="max-w-7xl mx-auto px-4 md:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-black uppercase tracking-tighter text-white">Setup_List</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { s: '01', t: 'Brazo Mecánico', d: 'Acóplalo a nuestro boom-arm o cualquier trípode estándar (rosca de 5/8). Asegura la base.' },
                                { s: '02', t: 'Plug & Play', d: 'Conecta el cable USB-C a tu puerto principal. Nada de descargar drivers fantasma ni reiniciar el equipo.' },
                                { s: '03', t: 'OBS / Discord', d: 'Entra a tu software de streaming, selecciona la fuente y tu voz saldrá con cuerpo de radio inmediatamente.' }
                            ].map((s, i) => (
                                <div key={i} className="flex flex-col bg-[#151515] p-8 border border-[#2A2A2A] relative overflow-hidden">
                                    <div className="absolute -top-4 -right-4 font-black text-8xl text-white/5">{s.s}</div>
                                    <div className="text-[#FF2A2A] font-black uppercase text-sm mb-4">Stage. {s.s}</div>
                                    <h4 className="text-xl font-black uppercase tracking-widest mb-2 text-white">{s.t}</h4>
                                    <p className="text-sm font-medium text-[#888888] leading-relaxed">{s.d}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 9. DEEP DIVE MULTIMEDIA */}
                <div className="py-32 relative text-center min-h-[50vh] flex flex-col items-center justify-center">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] border-4 border-[#222] rounded-full flex items-center justify-center pointer-events-none">
                        <div className="w-[60vw] h-[60vw] border-4 border-[#333] rounded-full flex items-center justify-center">
                            <div className="w-[40vw] h-[40vw] border-4 border-[#444] rounded-full shadow-[inset_0_0_50px_rgba(255,42,42,0.1)]"></div>
                        </div>
                    </div>
                    
                    <div className="relative z-10 max-w-2xl px-6 bg-[#111] p-10 border border-[#444] rounded-[2rem]">
                        <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-6"><span className="text-[#FF2A2A]">Silencia</span> a tu teclado mecánico.</h2>
                        <p className="text-base font-medium text-[#aaaaaa] leading-relaxed mb-0">La cápsula montada internamente en una suspensión elástica traga las vibraciones del escritorio. Si martillas las teclas mientras juegas o stremeas, tus seguidores solo escucharán tu voz, no tus clics.</p>
                    </div>
                </div>

                {/* 10. COMPARISON TABLE */}
                <div className="max-w-5xl mx-auto px-4 md:px-8 py-16">
                    <h2 className="text-3xl font-black uppercase tracking-tighter text-center mb-12">Monitor de Competencia.</h2>
                    <div className="bg-[#181818] border border-[#333] rounded-xl overflow-hidden shadow-2xl">
                        <div className="grid grid-cols-3 bg-[#111] border-b border-[#333] p-6 text-[10px] font-black uppercase tracking-widest text-[#777]">
                            <div>Característica</div>
                            <div className="text-[#FF2A2A] text-center">Nuestro Broadcast Pro</div>
                            <div className="text-[#666] text-center">Micro Condensador Genérico</div>
                        </div>
                        {[
                            { k: 'Sensibilidad al Ruido', u: 'Rechaza ventiladores y AC', t: 'Graba hasta los vecinos' },
                            { k: 'Material Externo', u: 'Aluminio Forjado Industrial', t: 'Plástico Chino Barato' },
                            { k: 'Curva de EQ', u: 'Realza Graves / Atenúa la "S"', t: 'Plana, sin vida y metálica' },
                            { k: 'Filtro Anti-Pop', u: 'Malla metálica doble adentro', t: 'Tenés que comprar una media negra externa' }
                        ].map((r, i) => (
                            <div key={i} className="grid grid-cols-3 p-6 border-b border-[#222] last:border-b-0 items-center hover:bg-[#222] transition-colors">
                                <div className="text-xs md:text-sm font-bold text-[#eee] uppercase">{r.k}</div>
                                <div className="text-center font-black text-white text-sm md:text-base">{r.u}</div>
                                <div className="text-center font-medium line-through text-[#555] text-xs md:text-sm">{r.t}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 11. RISK REVERSAL WARRANTY */}
                <div className="max-w-5xl mx-auto px-4 md:px-8 py-16">
                    <div className="bg-[#1a1a1a] border border-[#FF2A2A]/40 outline outline-[4px] outline-[#111] p-10 md:p-14 rounded-[2rem] flex flex-col md:flex-row items-center gap-10">
                        <div className="w-20 h-20 bg-[#FF2A2A]/10 border-2 border-[#FF2A2A] rounded-full flex flex-shrink-0 items-center justify-center pointer-events-none">
                            <span className="text-[#FF2A2A] font-black text-3xl">!</span>
                        </div>
                        <div>
                            <h3 className="text-2xl font-black uppercase tracking-widest mb-4">La transmisión no se cae.</h3>
                            <p className="font-medium text-sm md:text-base leading-relaxed text-[#aaaaaa]">Realizamos envíos asegurados. Registra tus datos debajo, aguarda al mensajero, comprueba e invierte sin dejar una estela de riesgo online. Tienes dos años enteros blindados contra cualquier microfallo del sistema eléctrico.</p>
                        </div>
                    </div>
                </div>

                {/* 12. BRAND ETHOS */}
                <div className="py-24 border-y border-[#333] mt-12 px-6 bg-[#0c0c0c] text-center">
                    <div className="max-w-3xl mx-auto">
                        <h3 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-8 text-white">Haz que te <span className="text-[#FF2A2A]">escuchen.</span></h3>
                        <p className="text-base font-medium text-[#888] leading-relaxed uppercase tracking-wider">La gente perdona un video en 720p, pero nadie tolera un audio estridente y molesto por más de 5 segundos. Somos los culpables de profesionalizar los canales de Twitch, los podcast locales y el e-learning con tecnología que no te obliga a estudiar ingeniería de sonido.</p>
                    </div>
                </div>

                {/* 13. FAQ */}
                <div className="max-w-3xl mx-auto px-4 md:px-8 py-24">
                    <h2 className="text-2xl font-black uppercase tracking-widest text-center mb-16">Bandeja de Entrada (FAQ)</h2>
                    <div className="space-y-4">
                        {[
                            {q: '¿Funciona bien si hablo lejos o me muevo?', a: 'Es un micrófono ciego direccional (dinámico). Te obliga a estar cerca para entregar ese tono bajo precioso y potente, a unos 5-10cm. Si planeas caminar muy lejos por la habitación, requerirás un lavalier.'},
                            {q: '¿Puede acoplarse con la Xbox/PS5?', a: 'La conexión USB integrada es universal. Las consolas lo detectan directo como interfaz de audio in/out sin problema.'},
                            {q: '¿Cómo ejecuto mi reserva de seguridad?', a: 'Completa tu información al final de esta página. El equipo confirma tu stock el mismo día y lo lanza a logística terrestre hacia ti.'}
                        ].map((f, i) => (
                            <div key={i} className="bg-[#111] border border-[#333] rounded-lg">
                                <button onClick={() => setFaqOpen(faqOpen===i?null:i)} className="w-full text-left py-6 px-6 flex items-center justify-between font-bold text-sm tracking-widest uppercase hover:text-[#FF2A2A] transition-colors">
                                    <span>{f.q}</span>
                                    <span className="text-[#FF2A2A] text-xl font-bold">{faqOpen===i?'-':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {faqOpen === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 pb-6 text-sm font-medium text-[#888] leading-relaxed border-t border-[#333] pt-6">
                                            {f.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 14. EXPANDED REVIEWS (UGC) */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 border-t border-[#333]">
                    <div className="text-center mb-16">
                        <div className="flex justify-center text-[#FF2A2A] mb-4">
                            {[...Array(5)].map((_,i) => <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>)}
                        </div>
                        <h2 className="text-3xl font-black uppercase tracking-tighter text-white mb-2">Comunidad Sonora.</h2>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#666]">Reviews Auditadas</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { r: "Tiró mi viejo blue yeti por la ventana. Esto captura mi voz como si estuviera locutando en ESPN y no hace estática cuando grito de cerca jugando.", n: "Gonzalo F.", t: "Twitch Streamer" },
                            { r: "Pesadísimo. Puro metal. La abrazadera que trae se atascó perfecto a mi brazo. Lo más increíble es que ignora al perro del vecino ladrando en la calle.", n: "Daniel M.", t: "Podcastero Local" },
                            { r: "Me llegó el paquete súper bien sellado. Yo desconfiaba un poco pero el muchacho me esperó a que lo abra y verifique. Conecté USB y mi chat notó el cambio al toque.", n: "Laura K.", t: "VTuber" }
                        ].map((rev, i) => (
                            <div key={i} className="bg-[#151515] border border-[#222] p-8 rounded-2xl relative shadow-lg">
                                <div className="text-6xl text-[#FF2A2A]/10 font-serif absolute -top-2 right-8 leading-none">"</div>
                                <p className="text-sm font-medium text-[#aaaaaa] leading-relaxed italic mb-8 relative z-10">"{rev.r}"</p>
                                <div className="border-t border-[#333] pt-4 flex justify-between items-end">
                                    <div>
                                        <div className="font-black text-sm uppercase tracking-widest text-white">{rev.n}</div>
                                        <div className="text-[10px] font-bold text-[#666] uppercase mt-1">{rev.t}</div>
                                    </div>
                                    <div className="w-8 h-8 rounded-full border border-[#FF2A2A]/40 flex items-center justify-center text-[#FF2A2A] text-xs font-black">
                                        {(rev.n).charAt(0)}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 15. CHECKOUT */}
                <div id="checkout-mic" className="py-24 bg-[#141414] border-t-2 border-[#FF2A2A] relative overflow-hidden mt-10">
                    <div className="absolute left-0 bottom-0 w-1/3 h-full bggradient-to-r from-[#FF2A2A]/5 to-transparent pointer-events-none"></div>
                    <div className="max-w-4xl mx-auto px-4 md:px-8 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                        <div className="md:col-span-5 text-center md:text-left">
                            <div className="text-[#FF2A2A] font-black uppercase text-xs tracking-[0.3em] mb-4 flex items-center gap-2 justify-center md:justify-start">
                                <span className="w-2 h-2 bg-[#FF2A2A] rounded-full animate-pulse"></span> DIRECTO AL CARRO
                            </div>
                            <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4 text-white">Haz el Upgrade.</h3>
                            <p className="text-sm font-medium text-[#888] mb-8 leading-relaxed">Liquidas la transacción al momento de recepcionar con el operario logístico.</p>
                            <div className="text-3xl font-black text-white">{fmtPrice(product.price)}</div>
                        </div>
                        <div className="md:col-span-7">
                            <form className="bg-[#111111] border border-[#333] p-8 md:p-10 rounded-2xl shadow-xl" onSubmit={e=>e.preventDefault()}>
                                <div className="space-y-6">
                                    <input type="text" className="w-full bg-[#181818] border border-[#444] focus:border-[#FF2A2A] text-white font-bold text-sm px-6 py-4 outline-none transition-colors rounded-lg placeholder-[#666]" placeholder="Nombre del Destinatario (Completo)" />
                                    <input type="tel" className="w-full bg-[#181818] border border-[#444] focus:border-[#FF2A2A] text-white font-bold text-sm px-6 py-4 outline-none transition-colors rounded-lg placeholder-[#666]" placeholder="WhatsApp de Contacto Local" />
                                    <textarea rows={2} className="w-full bg-[#181818] border border-[#444] focus:border-[#FF2A2A] text-white font-bold text-sm px-6 py-4 outline-none transition-colors resize-none rounded-lg placeholder-[#666]" placeholder="Dirección Exacta de Recepción (Link Local)" />
                                    <div className="pt-4">
                                        <button className="w-full h-[70px] bg-[#FF2A2A] text-white font-black uppercase tracking-widest text-sm rounded-lg hover:bg-white hover:text-black transition-colors shadow-[0_10px_20px_rgba(255,42,42,0.2)]">
                                            Confirmar Setup de Estudio
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </main>

            {/* STICKY MOBILE CTA */}
            <div className="md:hidden fixed bottom-6 left-4 right-4 z-50">
                <div className="bg-[#111] border border-[#333] p-4 rounded-xl flex items-center justify-between shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
                    <div className="pl-2">
                        <div className="text-[10px] font-bold uppercase text-[#777] tracking-widest">Abona en presencial</div>
                        <div className="font-black text-white text-lg leading-none mt-1">{fmtPrice(product.price)}</div>
                    </div>
                    <button onClick={() => document.getElementById('checkout-mic')?.scrollIntoView({ behavior: 'smooth' })} className="bg-[#FF2A2A] text-white rounded-lg px-8 py-3 font-black uppercase tracking-widest text-[11px] shadow-[0_0_15px_rgba(255,42,42,0.5)]">
                        Al Carrito
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

export default PdpPodcasterPro;
