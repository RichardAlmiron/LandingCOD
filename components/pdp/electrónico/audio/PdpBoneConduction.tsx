'use client';
import React, { useState } from 'react';
import { StoreData, Product } from '@/lib/types';
import EnhancedProductGallery from '@/components/pdp/EnhancedProductGallery';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { data: StoreData; product: Product; }

const PdpBoneConduction: React.FC<Props> = ({ data, product }) => {
    const [openSpecAcc, setOpenSpecAcc] = useState<number | null>(0);
    const [faqOpen, setFaqOpen] = useState<number | null>(null);
    const ai = product.aiContent;
    const fmtPrice = (n: number) => { const s = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); return `Gs. ${s}`; };
    
    // Aesthetic Palette: Fitness Elite / Neo-Athletic
    const bg = '#0a0a0a'; // Neutral 950
    const textMain = '#fafafa'; // Neutral 50
    const accentGreen = '#a3e635'; // Lime 400 (Acid Green)
    const accentGray = '#525252'; // Neutral 500

    return (
        <div style={{ background: bg, color: textMain, fontFamily: "'Impact', 'Inter', sans-serif" }} className="overflow-x-hidden selection:bg-lime-400/30 selection:text-lime-200 antialiased">
            
            {/* 0. AMBIENT ENERGY VIBES */}
            <div className="absolute top-0 right-0 w-[50%] h-[800px] bg-gradient-to-bl from-lime-400/10 via-neutral-900/50 to-transparent pointer-events-none z-0"></div>
            <div className="fixed top-1/2 left-0 w-[400px] h-[600px] bg-lime-400/5 blur-[120px] rounded-full pointer-events-none z-0 mix-blend-screen"></div>

            {/* 1. TOP NAV (Athletic Core) */}
            <header className="sticky top-0 z-50 bg-neutral-950/90 backdrop-blur-3xl border-b border-lime-400/20">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-md bg-lime-400 flex items-center justify-center shadow-[0_0_15px_rgba(163,230,53,0.4)]">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="3"><path d="M22 12A10 10 0 1 1 12 2v10z"/></svg>
                        </div>
                        <span className="font-black text-xl tracking-tighter text-white uppercase" style={{ fontFamily: 'Inter' }}>
                            AERO<span className="text-lime-400">PULSE</span>
                        </span>
                    </div>
                </div>
            </header>

            <main className="relative z-10 w-full overflow-hidden" style={{ fontFamily: 'Inter' }}>
                {/* 2. BREADCRUMBS & LOGISTICS */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6 pb-2">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="text-[10px] font-black uppercase tracking-widest text-lime-400 bg-lime-400/10 px-4 py-2 rounded-sm border border-lime-400/20 inline-flex items-center gap-2">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                            AUDIO / SPORT ELITE / <span className="text-white">{product.title.substring(0, 15)}...</span>
                        </div>
                        <div className="inline-flex items-center gap-2 text-[10px] font-black text-neutral-400 uppercase tracking-widest bg-neutral-900 px-4 py-2 border-l-2 border-lime-400">
                            ENVÍO CONTRA ENTREGA (C.O.D)
                        </div>
                    </div>
                </div>

                {/* 3. HERO SECTION (BRUTALIST ATHLETIC) */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 lg:py-16 relative">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
                        <div className="flex flex-col relative z-20 lg:col-span-5">
                            <div className="flex items-center gap-2 mb-6">
                                <span className="flex items-center bg-white text-black px-3 py-1 font-black text-[10px] uppercase tracking-widest">
                                    Seguridad Vial Garantizada
                                </span>
                            </div>
                            
                            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-[0.95] mb-6 uppercase">
                                {ai?.enhancedTitle || "Conducción Ósea Pro"}
                            </h1>
                            <p className="text-lg md:text-xl font-medium text-neutral-400 mb-10 leading-snug max-w-md">
                                {ai?.enhancedDescription || "Tus oídos quedan 100% libres. Escucha música a través de los huesos del cráneo mientras mantienes plena conciencia del entorno al correr o pedalear."}
                            </p>

                            <div className="bg-neutral-900 p-8 border-l-4 border-lime-400 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                                <div className="flex flex-col sm:flex-row sm:items-end gap-6 mb-8 relative z-10">
                                    <span className="text-5xl font-black text-white tracking-tighter">{fmtPrice(product.price)}</span>
                                    {product.originalPrice && <span className="text-xl font-bold text-neutral-600 line-through pb-1">{fmtPrice(product.originalPrice)}</span>}
                                </div>
                                <button onClick={() => document.getElementById('checkout-action')?.scrollIntoView({ behavior: 'smooth' })} className="w-full h-[64px] bg-lime-400 text-neutral-950 font-black uppercase tracking-widest text-sm hover:bg-white transition-all duration-300 flex items-center justify-center gap-3">
                                    Equipar Ahora
                                </button>
                                <div className="flex items-center justify-center gap-2 mt-4 text-[10px] font-black text-neutral-500 uppercase tracking-widest">
                                    Pago en puerta • Logística local
                                </div>
                            </div>
                        </div>

                        <div className="relative z-10 lg:col-span-7 flex items-center justify-center p-2 md:p-4">
 <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="w-full max-w-[600px] relative bg-neutral-900 shadow-[20px_20px_0px_rgba(163,230,53,0.1)] border border-neutral-800 ">
                                <EnhancedProductGallery product={product} accentColor={accentGreen} />
                                
                                {/* UI Floating HUD Element */}
                                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md border border-neutral-800 px-3 py-1.5 rounded-sm flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-lime-400 animate-pulse"></div>
                                    <span className="text-[9px] font-black uppercase tracking-widest text-lime-400">Oído Libre</span>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* 4. TRUST BADGES TECHNICAL */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 pb-16">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
                        {[
                            {v: 'IP67', l: 'Waterproof Rating'},
                            {v: '29g', l: 'Peso Ultraligero'},
                            {v: 'BT 5.2', l: 'Latencia Cero'},
                            {v: '8 Hrs', l: 'Batería Continua'}
                        ].map((b, i) => (
                            <div key={i} className="flex flex-col items-center justify-center p-6 bg-neutral-900 hover:bg-neutral-800 transition-colors">
                                <span className="text-white font-black text-2xl tracking-tighter mb-1">{b.v}</span>
                                <span className="text-[10px] font-bold text-lime-400 uppercase tracking-widest">{b.l}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 5. EXPERT ACCORDIONS */}
                <div className="max-w-4xl mx-auto px-4 md:px-8 py-20">
                    <div className="mb-10 text-center">
                        <h2 className="text-4xl font-black tracking-tighter text-white uppercase">Biomecánica del <span className="text-lime-400">Sonido.</span></h2>
                    </div>
                    <div className="bg-neutral-900 border border-neutral-800 rounded-sm">
                        {[
                            { t: 'Vibración Transcraneal', a: 'A diferencia de los audífonos normales que empujan aire hacia tu tímpano, estos transductores vibran apoyados en tus pómulos. El sonido viaja directamente a tu oído interno, sintiéndose como si la música sonara "dentro de tu cabeza".' },
                            { t: 'Conciencia Perimetral', a: 'Al dejar el conducto auditivo 100% destapado, puedes escuchar el motor de un auto acercándose, a otro ciclista pidiendo paso, o simplemente conversar con tu compañero de ruta sin sacarte los audífonos.' },
                            { t: 'Ajuste Inamovible', a: 'El cuello posterior está forjado con una aleación de titanio maleable. No importa lo brusco que sea tu movimiento, salto o sprint, la tensión mantendrá los transductores anclados firmemente.' }
                        ].map((ac, i) => (
                            <div key={i} className="border-b border-neutral-800 last:border-b-0">
                                <button onClick={() => setOpenSpecAcc(openSpecAcc===i?null:i)} className="w-full text-left p-6 md:p-8 flex items-center justify-between text-sm font-black uppercase tracking-widest text-neutral-300 hover:text-white transition-all bg-neutral-900 hover:bg-neutral-800">
                                    <div className="flex items-center gap-4">
                                        <div className="text-lime-400 shrink-0">0{i+1} //</div>
                                        {ac.t}
                                    </div>
                                    <span className="text-lime-400 text-xl leading-none">{openSpecAcc===i?'-':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {openSpecAcc === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 md:px-8 pb-8 pl-[4.5rem] text-sm font-medium text-neutral-400 leading-relaxed bg-neutral-900">
                                            {ac.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 6. ENDLESS MARQUEE */}
                <div className="w-full overflow-hidden py-4 bg-lime-400 flex transform rotate-2 shadow-xl my-10">
                    <div className="flex whitespace-nowrap animate-marquee font-black uppercase text-2xl tracking-tighter text-black">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="flex items-center gap-6 px-6">
                                <span>CORRE SIN RIESGOS</span><span>//</span>
                                <span>OÍDO 100% LIBRE</span><span>//</span>
                                <span>CIENCIA DEPORTIVA</span><span>//</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 7. BENEFITS CON IMAGENES */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-32 border-b border-neutral-900">
                    <div className="text-center mb-20">
                        <h2 className="text-5xl font-black tracking-tighter text-white mb-6 uppercase">Evolución <span className="text-lime-400">Atleta.</span></h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { img: 'https://images.unsplash.com/photo-1571008840902-28bf8f9cd71a?q=80&w=1000&auto=format&fit=crop', t: 'Ciclismo Seguro', d: 'Conoce todo lo que ocurre a tus espaldas en el tráfico urbano sin dejar de escuchar tus podcasts favoritos.' },
                            { img: 'https://images.unsplash.com/photo-1552674605-15c37eee6888?q=80&w=1000&auto=format&fit=crop', t: 'Entrenamiento Extremo', d: 'Soporta sudor denso y lluvia (IP67). Y al no estar dentro del oído, no se acumula cera ni sudor en el conducto.' },
                            { img: 'https://images.unsplash.com/photo-1534067783941-51c9c23ce04b?q=80&w=1000&auto=format&fit=crop', t: 'Diseño Táctico', d: 'Cobertura de silicona hipoalergénica. Pesa menos de 30 gramos, luego de 5 minutos olvidarás que los llevas puestos.' }
                        ].map((b, i) => (
                            <div key={i} className="bg-neutral-900 border border-neutral-800 p-4 group">
                                <div className="h-60 w-full relative overflow-hidden bg-neutral-950 mb-6 flex items-center justify-center">
                                     <img src={b.img} alt={b.t} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                                </div>
                                <h3 className="text-xl font-black text-white mb-2 uppercase tracking-tight">{b.t}</h3>
                                <p className="text-sm font-medium text-neutral-400 leading-relaxed">{b.d}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 8. VISUAL HOW TO USE (GRID) */}
                <div className="py-24 bg-black">
                    <div className="max-w-7xl mx-auto px-4 md:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-4xl font-black tracking-tighter text-white mb-8 uppercase">Plug & <span className="text-lime-400">Play.</span></h2>
                                <p className="text-neutral-400 font-medium mb-12 leading-relaxed text-lg">La conexión Bluetooth 5.2 multipunto permite que te vincules en segundos y cambies entre tu celular de trabajo y el personal sin desconectar nada.</p>
                                
                                <div className="space-y-4">
                                    {[
                                        { t: 'Emparejamiento Táctil', d: 'Mantén presionado el botón "+" durante 3 segundos. Búscalo en tu menú bluetooth y listo.' },
                                        { t: 'Colocación Perimetral', d: 'Cuelga los arcos detrás de tus orejas para que los parlantes se apoyen en el hueso temporal (pómulo alto), no sobre el agujero de tu oído.' },
                                        { t: 'Controles Físicos', d: 'Botones resistentes al sudor ubicados estratégicamente para responder llamadas o cambiar canciones en pleno movimiento.' }
                                    ].map((s, i) => (
                                        <div key={i} className="flex gap-4 items-start bg-neutral-900 p-6 border-l-2 border-transparent hover:border-lime-400 transition-colors">
                                            <div className="text-lime-400 font-black mt-1">0{i+1}</div>
                                            <div>
                                                <h4 className="text-sm font-black text-white mb-1 uppercase">{s.t}</h4>
                                                <p className="text-sm text-neutral-400 leading-relaxed">{s.d}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="relative aspect-[4/5] bg-neutral-900 p-4 border border-neutral-800 shadow-[15px_15px_0px_rgba(163,230,53,0.1)]">
                                <div className="w-full h-full relative overflow-hidden bg-black">
                                    <img src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1000&auto=format&fit=crop" alt="Bone Conduction in use" className="w-full h-full object-cover opacity-60" />
                                    <div className="absolute inset-0 bg-neutral-950/20 mix-blend-multiply"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 10. COMPARISON TABLE */}
                <div className="max-w-5xl mx-auto px-4 md:px-8 py-32">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black tracking-tighter text-white uppercase">El Duelo.</h2>
                    </div>
                    
                    <div className="bg-neutral-900 border border-neutral-800">
                        <div className="grid grid-cols-3 bg-neutral-950 border-b border-neutral-800 text-[10px] font-black uppercase tracking-widest text-neutral-500">
                            <div className="p-6 md:p-8">Métrica</div>
                            <div className="p-6 md:p-8 text-center text-lime-400 border-x border-neutral-800">AEROPULSE PRO</div>
                            <div className="p-6 md:p-8 text-center">In-Ear Clásicos (TWS)</div>
                        </div>
                        {[
                            { k: 'Seguridad en Tráfico', u: 'Alta (Oído Destapado)', t: 'Nula (Aislamiento Acústico)' },
                            { k: 'Higiene del Oído', u: 'Excelente (No entra nada)', t: 'Producción rápida de cerumen' },
                            { k: 'Caídas en movimiento', u: 'Imposible (Arco de Titanio)', t: 'Alta, se resbalan con sudor' },
                            { k: 'Aislamiento Pasivo', u: 'No tiene (Es su ventaja)', t: 'Sí (Peligroso al correr)' }
                        ].map((r, i) => (
                            <div key={i} className="grid grid-cols-3 border-b border-neutral-800 last:border-b-0 text-sm">
                                <div className="p-6 md:p-8 font-black text-neutral-300 flex items-center uppercase">{r.k}</div>
                                <div className="p-6 md:p-8 font-bold text-white text-center flex items-center justify-center border-x border-neutral-800 bg-lime-400/5">{r.u}</div>
                                <div className="p-6 md:p-8 font-medium text-neutral-600 text-center flex items-center justify-center">{r.t}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 11. RISK REVERSAL WARRANTY */}
                <div className="max-w-5xl mx-auto px-4 md:px-8 py-12">
                    <div className="bg-lime-400 p-10 md:p-14 text-black md:flex items-center gap-10">
                        <div className="relative z-10 w-full">
                            <div className="flex items-center gap-4 mb-4">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                                <h3 className="text-3xl font-black tracking-tighter uppercase">Riesgo Financiero Cero.</h3>
                            </div>
                            <p className="font-bold text-neutral-800 leading-relaxed text-sm md:text-base max-w-2xl">
                                Entendemos la desconfianza del comercio digital. Es por eso que no te pedimos los datos de tu tarjeta. Reserva tu unidad hoy, se asigna a ruta logística, y lo pagas en billete o app bancaria DIRECTAMENTE al repartidor en la puerta de tu gimnasio o casa.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 13. FAQ */}
                <div className="max-w-4xl mx-auto px-4 md:px-8 py-24 mb-16">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black tracking-tighter text-white uppercase">Interrogatorio.</h2>
                    </div>
                    <div className="space-y-4">
                        {[
                            {q: '¿Los demás pueden escuchar mi música?', a: 'La fuga de sonido es mínima en volumen normal a medio. Solo si los usas al 100% de volumen técnico en un ambiente extremadamente silencioso (como una biblioteca) alguien pegado a ti podría oír murmullos, pero al aire libre es inaudible para el resto.'},
                            {q: '¿Tienen micrófono para llamadas de trabajo?', a: 'Afirmativo. Poseen cancelación de ruido ENC doble para que al ir en bicicleta el viento no cancele a tu voz de quien te escucha en una videollamada urgente.'},
                            {q: 'Llevo lentes recetados/sol, ¿molestan por la patilla?', a: 'La estructura de titanio es ultra fina (apenas 3mm de grosor). Están diseñados justamente para convivir pacíficamente por encima o debajo de las varillas de tus anteojos y cascos de bicicleta.'}
                        ].map((f, i) => (
                            <div key={i} className="bg-neutral-900 border border-neutral-800 rounded-sm hover:border-lime-400 transition-colors">
                                <button onClick={() => setFaqOpen(faqOpen===i?null:i)} className="w-full text-left p-6 md:p-8 flex items-center justify-between font-black text-sm uppercase text-neutral-200">
                                    <span>{f.q}</span>
                                    <span className="text-lime-400 font-bold text-2xl leading-none">{faqOpen===i?'-':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {faqOpen === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 md:px-8 pb-8 text-sm font-medium text-neutral-400 leading-relaxed pt-0">
                                            {f.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 14. REVIEWS */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-24 border-t border-neutral-900">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black tracking-tighter text-white uppercase mb-6">El Pelotón Habla.</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { r: "Correr maratones de 42k obliga a algo firme. Estos no saltan nada. Además me salvaron 2 veces de no ser atropellado al escuchar la bocina. Totalmente recomendados.", n: "Mario T.", t: "Runner Amateur", i: "https://images.unsplash.com/photo-1530549387722-4c22909f18a5?q=80&w=200&auto=format&fit=crop" },
                            { r: "Al principio se siente raro como el sonido entra por el hueso, pero te acostumbras en 20 minutos. El hecho de pagar cuando me lo entregan en la puerta de mi casa es un plus genial.", n: "Lucía M.", t: "Ciclista MTB", i: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=200&auto=format&fit=crop" },
                            { r: "Mis in-ear siempre me daban infección de oído con tanto sudor de gimnasio largo. Con conducción ósea es el fin de esos problemas. Batería aguanta la semana.", n: "Javier P.", t: "Powerlifter", i: "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?q=80&w=200&auto=format&fit=crop" }
                        ].map((rev, i) => (
                            <div key={i} className="bg-neutral-900 p-8 border-l-2 border-neutral-800 hover:border-lime-400 transition-colors duration-300">
                                <img src={rev.i} alt={rev.n} className="w-14 h-14 object-cover border border-neutral-700 mb-6 grayscale"/>
                                <p className="text-sm font-medium text-neutral-400 leading-relaxed mb-8">"{rev.r}"</p>
                                <div className="flex items-center justify-between border-t border-neutral-800 pt-6">
                                    <div className="text-xs font-black text-white uppercase">{rev.n}</div>
                                    <div className="text-[10px] font-bold text-lime-400 uppercase tracking-widest">{rev.t}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 15. CHECKOUT */}
                <div id="checkout-action" className="py-24 md:py-32 bg-neutral-950 relative border-t-8 border-lime-400">
                    <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24 items-center">
                        <div className="md:col-span-6 relative text-center md:text-left">
                            <span className="text-[10px] font-black uppercase tracking-widest text-lime-400 mb-6 bg-lime-400/10 px-3 py-1 inline-block">Proceso Logístico Local</span>
                            <h3 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-white uppercase">Asegura tu <br/>Kit.</h3>
                            <p className="text-sm font-medium text-neutral-400 mb-10 leading-relaxed max-w-sm mx-auto md:mx-0">Completa este manifiesto digital. Nuestro courier físico recogerá tu pedido del almacén regional local y lo enviará. Cancelas la suma total al visualizarlo en tus manos.</p>
                            
                            <div className="text-6xl md:text-7xl font-black text-white tracking-tighter">{fmtPrice(product.price)}</div>
                        </div>
                        
                        <div className="md:col-span-6 w-full border border-neutral-800 bg-black p-8 md:p-12">
                            <form onSubmit={e=>e.preventDefault()}>
                                <div className="space-y-6">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">Identidad Plena</label>
                                        <input type="text" className="w-full bg-neutral-900 border border-neutral-800 focus:border-lime-400 text-white font-bold text-sm px-6 py-4 outline-none transition-all" placeholder="Nombre completo" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">Frecuencia de Contacto</label>
                                        <input type="tel" className="w-full bg-neutral-900 border border-neutral-800 focus:border-lime-400 text-white font-bold text-sm px-6 py-4 outline-none transition-all" placeholder="Teléfono de contacto local" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">Puerto de Entrega</label>
                                        <textarea rows={2} className="w-full bg-neutral-900 border border-neutral-800 focus:border-lime-400 text-white font-bold text-sm px-6 py-4 outline-none transition-all resize-none" placeholder="Dirección exacta (Incluir barrio/ciudad)" />
                                    </div>
                                    <div className="pt-4">
                                        <button className="w-full h-[64px] bg-lime-400 text-black font-black uppercase tracking-widest text-sm hover:bg-white transition-all">
                                            Autorizar Despliegue Físico
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
                <div className="bg-black border-t border-neutral-800 p-4 shrink-0 flex items-center justify-between">
                    <div>
                        <div className="text-[10px] font-black uppercase text-lime-400 tracking-widest mb-1">C.O.D.</div>
                        <div className="font-black text-white text-lg tracking-tighter leading-none">{fmtPrice(product.price)}</div>
                    </div>
                    <button onClick={() => document.getElementById('checkout-action')?.scrollIntoView({ behavior: 'smooth' })} className="bg-lime-400 text-black px-6 py-3 font-black uppercase tracking-widest text-[11px] hover:bg-white">
                        Solicitar Envío
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

export default PdpBoneConduction;
