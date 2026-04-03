'use client';
import React, { useState } from 'react';
import { StoreData, Product } from '@/lib/types';
import EnhancedProductGallery from '@/components/pdp/EnhancedProductGallery';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { data: StoreData; product: Product; }

const PdpVRStation: React.FC<Props> = ({ data, product }) => {
    const [faqOpen, setFaqOpen] = useState<number | null>(null);
    const ai = product.aiContent;
    const fmtPrice = (n: number) => { const s = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); return `Gs. ${s}`; };

    // Estética "Neon Immersive": Ciberespacio, glassmorphism, lúces púrpuras
    const bg = '#020005'; // Deep void
    const textMain = '#e9d5ff'; // Purple 200
    const accent = '#a855f7'; // Purple 500

    return (
        <div style={{ background: bg, color: textMain }} className="font-sans antialiased overflow-x-hidden selection:bg-purple-500/50">
            {/* Cyberpunk Grid / Ambient */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-fuchsia-900/10 blur-[120px] rounded-full mix-blend-screen"></div>
                <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-violet-900/10 blur-[150px] mix-blend-screen"></div>
            </div>

            {/* 1. TOP NAV (Portal Interface) */}
            <header className="sticky top-0 z-50 bg-[#020005]/70 backdrop-blur-2xl border-b border-purple-500/10">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="text-xl font-bold tracking-tighter text-white flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-500 animate-pulse"></div>
                        NEXUS<span className="font-light text-purple-400">VR</span>
                    </div>
                    <div className="hidden md:block text-[10px] uppercase tracking-[0.2em] text-purple-300/50">
                        Interfaz Neural Activa
                    </div>
                </div>
            </header>

            <main className="relative z-10 w-full overflow-hidden">
                {/* 2. BREADCRUMBS & LOGISTICS */}
                <div className="max-w-7xl mx-auto px-4 pt-8">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="text-xs uppercase tracking-widest text-purple-400/60 font-medium">
                            HARDWARE / <span className="text-fuchsia-400">REALIDAD MIXTA</span>
                        </div>
                        <div className="px-4 py-1 rounded-full bg-purple-900/30 border border-purple-500/30 text-[10px] text-purple-300 uppercase tracking-widest backdrop-blur-md">
                            C.O.D. Físico Habilitado
                        </div>
                    </div>
                </div>

                {/* 3. HERO (EDITORIAL) */}
                <div className="max-w-7xl mx-auto px-4 py-16 lg:py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="relative z-20">
                            <h1 className="text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-white via-fuchsia-200 to-purple-600 mb-6 tracking-tight leading-tight">
                                {ai?.enhancedTitle || product.title}
                            </h1>
                            <p className="text-base text-purple-200/70 mb-12 leading-relaxed max-w-md font-light">
                                {ai?.enhancedDescription || product.description || 'Cruza el umbral. Sumérgete en mundos asombrosos o fusiona elementos virtuales en tu entorno físico real con fluidez imperceptible. Sin cables, sin distracciones, sin límites.'}
                            </p>
                            
                            <div className="p-[1px] bg-gradient-to-br from-purple-500/50 to-transparent rounded-3xl group">
                                <div className="bg-[#05010a] rounded-3xl p-8 backdrop-blur-xl relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                    <div className="flex items-end gap-5 mb-8 relative z-10">
                                        <span className="text-5xl font-light text-white">{fmtPrice(product.price)}</span>
                                        {product.originalPrice && <span className="text-lg text-purple-500/50 line-through pb-1">{fmtPrice(product.originalPrice)}</span>}
                                    </div>
                                    <button onClick={() => document.getElementById('checkout-portal')?.scrollIntoView({ behavior: 'smooth' })} className="w-full relative py-5 rounded-2xl bg-white text-black font-bold uppercase tracking-[0.2em] text-xs hover:scale-[1.02] transition-transform duration-300">
                                        Materializar Pedido
                                    </button>
                                    <div className="text-[10px] text-center text-purple-400/50 uppercase tracking-widest mt-6">
                                        Pago Contra Entrega Terrestre
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full relative flex items-center justify-center">
                            {/* Floating ring logic */}
                            <motion.div animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }} className="absolute w-[120%] aspect-square border border-purple-500/10 rounded-full border-dashed"></motion.div>
                            <EnhancedProductGallery product={product} accentColor={accent} />
                        </div>
                    </div>
                </div>

                {/* 4. TRUST BADGES TECHNICAL (Specs) */}
                <div className="py-8 border-y border-purple-900/30 bg-purple-900/5 backdrop-blur-md">
                    <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            {v: '4K+', l: 'Resolución Óptica'},
                            {v: '120Hz', l: 'Tasa de Refresco'},
                            {v: 'Passthrough', l: 'Color Real HD'},
                            {v: 'Inalámbrico', l: 'All-In-One'}
                        ].map((b, i) => (
                            <div key={i} className="text-center group">
                                <div className="text-2xl text-white font-bold mb-1 group-hover:text-fuchsia-400 transition-colors duration-300">{b.v}</div>
                                <div className="text-[10px] uppercase tracking-widest text-purple-400/60">{b.l}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 5. EXPERT ACCORDIONS */}
                <div className="max-w-4xl mx-auto px-4 py-24">
                    <div className="text-center mb-16">
                        <span className="text-fuchsia-500 text-[10px] uppercase tracking-[0.3em] font-bold block mb-4">Arquitectura de Inmersión</span>
                        <h2 className="text-3xl text-white font-light">¿Por qué este headset lo cambia todo?</h2>
                    </div>
                    
                    <div className="space-y-4">
                        {[
                            { t: 'Lentes Pancake 80% más nítidas', a: 'Eliminamos el efecto "puerta de pantalla" (Screen-Door). Las lentes planas y delgadas curvan la luz de forma múltiple, entregando una pureza visual que hace que tu cerebro se olvide que es una pantalla.' },
                            { t: 'Realidad Mixta a todo color', a: 'Las cámaras exteriores capturan tu entorno real con fidelidad. Puedes jugar al ajedrez virtual sobre tu mesa de comedor física, o repeler naves alienígenas que salen de las paredes de tu habitación.' },
                            { t: 'Ecosistema Standalone (Sin PC requerida)', a: 'Todo el procesamiento monstruoso reside dentro de las gafas. No necesitas una PC encendida, ni cables colgando, ni sensores en las paredes. Te las pones y estás en otro universo en 3 segundos.' }
                        ].map((ac, i) => (
                            <div key={i} className="bg-purple-900/10 border border-purple-500/10 rounded-2xl overflow-hidden backdrop-blur-sm">
                                <button className="w-full p-8 flex justify-between items-center text-left" onClick={() => setFaqOpen(faqOpen===i?null:i)}>
                                    <span className="text-white font-medium tracking-wide">{ac.t}</span>
                                    <div className={`w-8 h-8 rounded-full border border-purple-500/30 flex items-center justify-center text-purple-400 transition-transform duration-300 ${faqOpen===i?'rotate-180':''}`}>
                                        ↓
                                    </div>
                                </button>
                                <AnimatePresence>
                                    {faqOpen === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-8 pb-8 text-purple-200/60 font-light leading-relaxed">
                                            {ac.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 6. ENDLESS MARQUEE */}
                <div className="w-[100vw] overflow-hidden py-12 bg-white flex transform relative left-[50%] -translate-x-[50%]">
                    <div className="flex whitespace-nowrap font-black italic text-5xl text-black tracking-tighter uppercase">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="flex items-center gap-12 px-6">
                                <span>SIN LIMITES ESPACIALES</span>
                                <span className="text-purple-600">/</span>
                                <span>PRESENCIA TOTAL</span>
                                <span className="text-purple-600">/</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 7. WHY TO USE / BENEFITS */}
                <div className="max-w-7xl mx-auto px-4 py-32">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                        <div>
                            <h2 className="text-4xl lg:text-5xl font-light text-white mb-8 leading-tight">Tu sala de estar es ahora <br/><span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-600">tu lienzo infinito.</span></h2>
                            <p className="text-purple-200/70 font-light leading-relaxed mb-8">El aburrimiento físico ya no existe. Entrena boxeo con entrenadores holográficos, ten reuniones con pantallas flotantes del ancho de tu pared, o relájate viendo cine en tu cama como si tuvieras una pantalla IMAX en el techo.</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { t: 'Mandos Tácticos', d: 'Anillos TruTouch para retroalimentación háptica hiper-realista. Sientes la tensión de un arco disparando.' },
                                { t: 'Audio 3D Directo', d: 'Altavoces estéreo incorporados en las correas que emiten sonido espacial. Sabes quién está detrás tuyo.' },
                                { t: 'Fit Personalizado', d: 'Dial de ajuste trasero milimétrico. Se adapta a niños, adolescentes, o uso con gafas recetadas.' },
                                { t: 'Hand Tracking', d: 'Las cámaras leen tus manos sin usar mandos. Navegas los menús pellizcando el aire.' }
                            ].map((b, i) => (
                                <div key={i} className="bg-purple-900/10 border border-purple-500/20 p-6 rounded-3xl hover:bg-purple-900/20 transition-colors">
                                    <h4 className="text-white font-bold text-sm mb-3">{b.t}</h4>
                                    <p className="text-xs text-purple-200/60 font-light">{b.d}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 8. HOW TO USE / SET UP AESTHETIC */}
                <div className="py-24 bg-[#05010a] relative border-y border-purple-900/30">
                    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"></div>
                    <div className="max-w-5xl mx-auto px-4 relative z-10 text-center">
                        <h2 className="text-3xl text-white font-light mb-20 uppercase tracking-widest">Setup de 3 Pasos</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            {[
                                { n: '01', s: 'Scan Ambiental', d: 'Te pones el visor y miras tu cuarto. Él automáticamente escanea tus paredes, mesa y muebles.' },
                                { n: '02', s: 'Trazo de Límite', d: 'La interfaz te sugiere una zona segura o tú la dibujas con las manos. Si te sales, verás el mundo real.' },
                                { n: '03', s: 'Inmersión Total', d: 'El entorno físico desaparece e ingresas a tu Home Virtual. Listo para descargar o streamear contenido.' }
                            ].map((s, i) => (
                                <div key={i} className="relative">
                                    <div className="text-7xl font-light text-fuchsia-900/30 absolute -top-10 left-1/2 -translate-x-1/2 z-0">{s.n}</div>
                                    <div className="relative z-10 p-8">
                                        <h4 className="text-white font-bold text-base mb-4 tracking-wide">{s.s}</h4>
                                        <p className="text-purple-200/60 font-light text-sm">{s.d}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 10. COMPARISON TABLE */}
                <div className="max-w-4xl mx-auto px-4 py-32">
                    <div className="bg-[#020005] border border-purple-500/20 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.05)]">
                        <div className="grid grid-cols-3 bg-fuchsia-900/20 text-[10px] uppercase tracking-[0.2em] font-bold text-purple-300">
                            <div className="p-6">Componente</div>
                            <div className="p-6 text-white text-center bg-purple-500/20">Nuestro Visor Premium</div>
                            <div className="p-6 text-center text-purple-400/50">VR de Generación Pasada</div>
                        </div>
                        {[
                            { k: 'Procesador', u: 'Chips Snapdragon XR2 Gen 2', t: 'Chips lentos sin Mixed Reality' },
                            { k: 'Lentes', u: 'Óptica Pancake Delgada', t: 'Lentes Fresnel (Gordas/Visión Borrosa)' },
                            { k: 'Conexión PC', u: 'Inalámbrica (AirLink Integrado)', t: 'Cable HDMI grueso obligatorio' },
                            { k: 'Tasa de Mareo', u: 'Nula (Seguimiento ultrarrápido)', t: 'Alta (Latencia en giro de cabeza)' }
                        ].map((r, i) => (
                            <div key={i} className="grid grid-cols-3 border-t border-purple-500/10 font-light text-sm">
                                <div className="p-6 text-purple-200/60">{r.k}</div>
                                <div className="p-6 text-white font-medium text-center bg-purple-500/5">{r.u}</div>
                                <div className="p-6 text-purple-400/50 text-center line-through">{r.t}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 11. RISK REVERSAL WARRANTY */}
                <div className="py-24 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#020005] to-[#0d001a]"></div>
                    <div className="max-w-3xl mx-auto px-4 relative z-10 text-center">
                        <div className="inline-block p-4 bg-fuchsia-500/10 border border-fuchsia-500/30 rounded-full mb-8">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-fuchsia-400"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                        </div>
                        <h3 className="text-3xl text-white font-light tracking-tight mb-6">Bloqueo de Transacción Insegura.</h3>
                        <p className="text-purple-200/70 font-light leading-relaxed">
                            No pongas los datos de tu tarjeta en nuestra web. Tu identidad digital es invaluable. Te enviamos el Hardware inmaculado por correo privado, lo inspeccionas en tus manos, y abonas con total confianza presencialmente al personal logístico (Servicio COD Píxel-a-Píxel).
                        </p>
                    </div>
                </div>

                {/* 12. BRAND ETHOS */}
                <div className="py-24 text-center px-4">
                    <h3 className="text-xl text-white font-light uppercase tracking-widest mb-6">Traspasando las Leyes de la Física.</h3>
                    <p className="text-purple-200/50 max-w-2xl mx-auto font-light leading-relaxed">
                        Desarrollamos una cadena de provisión ultra-premium para entregarte hardware de realidad mixta directamente en la puerta de tu hogar, cortando intermediarios tecnológicos caducos y asumiendo todo el riesgo financiero por ti.
                    </p>
                </div>

                {/* 13. FAQ */}
                <div className="max-w-3xl mx-auto px-4 py-24 border-t border-purple-900/30">
                    <h2 className="text-2xl text-white font-light mb-12 text-center">Queries del Sistema</h2>
                    <div className="grid gap-6">
                        {[
                            {q: '¿Puede usarlo alguien que usa gafas reales?', a: 'Absolutamente. Incluye un espaciador de gafas integrado en la interfaz facial. También puedes pedir insertos graduados para no usar tus lentes físicos dentro del visor.'},
                            {q: '¿Marea como las gafas viejas de centros comerciales?', a: 'No. El problema del mareo (Motion Sickness) ocurría por baja tasa de refresco y baja resolución. Con 120Hz de refresco y ajuste focal milimétrico, tu cerebro no percibe el lag.'},
                            {q: '¿Cómo funciona el pago al mensajero logístico?', a: 'Dejarás tus datos sin costo en la ficha inferior. Te enviamos un WhatsApp de rectificación y liberamos la orden. Pagas con dinero o transferencia en la puerta de tu domicilio en el mismo momento que recibes el paquete negro.'}
                        ].map((f, i) => (
                            <div key={i} className="bg-purple-950/20 border border-purple-500/20 p-8 rounded-2xl">
                                <h4 className="text-white font-bold text-sm mb-4 tracking-wide">{f.q}</h4>
                                <p className="text-purple-200/60 font-light text-sm leading-relaxed">{f.a}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 14. EXPANDED REVIEWS */}
                <div className="py-24 border-t border-purple-900/30 bg-[#04010a]">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { r: "Jugar juegos de ritmo o minigolf con mis amigos que viven en otro país sintiendo que están en mi sala es la experiencia social más loca de mi vida. Gran servicio COD.", n: "Sofía M.", t: "Diseñadora UX" },
                                { r: "Lo compré para jugar conectado a mi PC, pero terminé usándolo Standalone porque se ve increíblemente nítido sin ningún alambre cruzando mi cabeza.", n: "Andrés G.", t: "Productor Musical" },
                                { r: "Me impresionó la atención. Coordinaron por WhatsApp el envío COD y el cadete llegó a horario a mi oficina. El casco sellado de fábrica perfecto.", n: "Javier R.", t: "Ingeniero" }
                            ].map((rev, i) => (
                                <div key={i} className="p-8 bg-purple-500/5 rounded-3xl border border-purple-500/10 backdrop-blur-md">
                                    <div className="text-fuchsia-500 font-serif text-5xl mb-2 opacity-50">"</div>
                                    <p className="text-purple-200/70 font-light text-sm mb-8 leading-relaxed">"{rev.r}"</p>
                                    <div className="text-white uppercase font-bold text-[10px] tracking-widest">{rev.n}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 15. CHECKOUT */}
                <div id="checkout-portal" className="py-32 relative">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent opacity-50"></div>
                    <div className="absolute inset-0 bg-fuchsia-900/5"></div>
                    
                    <div className="max-w-7xl mx-auto px-4 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <span className="text-fuchsia-400 text-[10px] uppercase tracking-[0.3em] mb-4 block font-bold">Portal de Solicitud Física</span>
                            <h2 className="text-5xl lg:text-6xl font-light text-white mb-8 tracking-tighter leading-tight">Activa tu <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-600 font-bold">Unidad.</span></h2>
                            <p className="text-purple-200/70 font-light leading-relaxed mb-10 max-w-md">Reserva inmediatamente esta pieza de hardware VR inmersivo. Sin poner tarjetas de crédito. Pagas presencialmente al operador transite tu pedido C.O.D.</p>
                            
                            <div className="text-5xl font-light text-white">{fmtPrice(product.price)}</div>
                        </div>
                        
                        <div className="bg-[#0b0314] rounded-3xl p-8 lg:p-12 border border-purple-500/20 shadow-[0_20px_100px_rgba(168,85,247,0.15)] relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-fuchsia-500 to-purple-600"></div>
                            
                            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                                <div>
                                    <label className="text-[10px] text-purple-400 uppercase tracking-widest mb-2 block ml-2">Nombre Civil</label>
                                    <input type="text" className="w-full bg-purple-900/10 border border-purple-500/20 rounded-xl text-white font-sans text-sm p-5 focus:border-fuchsia-500 outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="text-[10px] text-purple-400 uppercase tracking-widest mb-2 block ml-2">Número WhatsApp</label>
                                    <input type="tel" className="w-full bg-purple-900/10 border border-purple-500/20 rounded-xl text-white font-sans text-sm p-5 focus:border-fuchsia-500 outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="text-[10px] text-purple-400 uppercase tracking-widest mb-2 block ml-2">Locación Terrestre Física</label>
                                    <textarea rows={2} className="w-full bg-purple-900/10 border border-purple-500/20 rounded-xl text-white font-sans text-sm p-5 focus:border-fuchsia-500 outline-none transition-all resize-none"></textarea>
                                </div>
                                <div className="pt-4">
                                    <button className="w-full bg-white text-black font-bold uppercase tracking-[0.2em] rounded-xl py-5 hover:scale-[1.02] transition-transform duration-300">
                                        Despachar & Pagar al Recibir
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
};

export default PdpVRStation;
