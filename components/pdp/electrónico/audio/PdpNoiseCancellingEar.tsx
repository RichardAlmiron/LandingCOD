'use client';
import React, { useState } from 'react';
import { StoreData, Product } from '@/lib/types';
import EnhancedProductGallery from '@/components/pdp/EnhancedProductGallery';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { data: StoreData; product: Product; }

const PdpNoiseCancellingEar: React.FC<Props> = ({ data, product }) => {
    const [faqOpen, setFaqOpen] = useState<number | null>(null);
    const ai = product.aiContent;
    const fmtPrice = (n: number) => { const s = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); return `Gs. ${s}`; };

    // Estética "Sensory Deprivation (Serene Space)": Grises perla pasteles, sensación de aire o nubes acústicas. Glassmorphism.
    const bg = '#f8fafc'; // Slate 50
    const textMain = '#64748b'; // Slate 500
    const accent = '#6366f1'; // Indigo 500

    return (
        <div style={{ background: bg, color: textMain }} className="font-sans antialiased overflow-x-hidden selection:bg-indigo-100 selection:text-indigo-900">
            
            {/* Vaporous Floating Clouds Background */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute -top-[10%] -right-[10%] w-[70vw] h-[70vw] bg-indigo-100/50 rounded-full blur-[150px] mix-blend-multiply opacity-50 animate-[pulse_10s_ease-in-out_infinite]"></div>
                <div className="absolute -bottom-[20%] -left-[10%] w-[80vw] h-[80vw] bg-slate-200/60 rounded-full blur-[150px] mix-blend-multiply opacity-60"></div>
                {/* Acoustic wave abstraction */}
                <svg className="absolute top-[30%] -right-[20%] w-[100vw] h-[20vw] opacity-[0.03] text-indigo-900" viewBox="0 0 1000 200" preserveAspectRatio="none">
                    <path d="M0,100 C150,200 350,0 500,100 C650,200 850,0 1000,100" fill="none" stroke="currentColor" strokeWidth="2" />
                    <path d="M0,100 C150,150 350,50 500,100 C650,150 850,50 1000,100" fill="none" stroke="currentColor" strokeWidth="1" />
                </svg>
            </div>

            {/* 1. TOP NAV (Airy Header) */}
            <header className="sticky top-0 z-50 bg-white/40 backdrop-blur-3xl border-b border-indigo-900/5">
                <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
                    <div className="text-xl font-light tracking-widest text-slate-800 flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full border border-indigo-400 flex items-center justify-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                        </span>
                        AURA<span className="font-semibold text-indigo-500">SOUND</span>
                    </div>
                </div>
            </header>

            <main className="relative z-10 w-full overflow-hidden">
                {/* 2. BREADCRUMBS & LOGISTICS */}
                <div className="max-w-6xl mx-auto px-6 pt-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/60 pb-6">
                        <div className="text-xs uppercase font-medium tracking-widest text-slate-400">
                            Aislamiento {'>'} Circumaurales {'>'} <span className="text-slate-700">Cancelación Activa</span>
                        </div>
                        <div className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-4 py-2 uppercase tracking-widest rounded-full border border-indigo-100 flex items-center gap-2">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            Logística Contra-Entrega Activa
                        </div>
                    </div>
                </div>

                {/* 3. HERO (SENSORY DEPRIVATION) */}
                <div className="max-w-6xl mx-auto px-6 py-20 lg:py-28">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="relative z-20 order-2 lg:order-1 text-center lg:text-left">
                            <h1 className="text-5xl lg:text-7xl font-light text-slate-900 mb-6 tracking-tight leading-[1.05]">
                                {ai?.enhancedTitle || product.title}
                            </h1>
                            <p className="text-xl text-slate-500 mb-10 font-light leading-relaxed mx-auto lg:mx-0 max-w-lg">
                                {ai?.enhancedDescription || product.description || 'Ponte los auriculares y pulsa el interruptor. El ruido del tráfico, colegas hablando o motores de avión desaparecerán en una nada absoluta.'}
                            </p>
                            
                            <div className="bg-white/60 backdrop-blur-xl border border-white p-10 rounded-[2rem] shadow-[0_30px_60px_rgba(99,102,241,0.05)] text-left w-full relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent rounded-[2rem] z-0"></div>
                                <div className="relative z-10">
                                    <div className="text-[10px] text-indigo-500 uppercase tracking-widest font-bold mb-4">Inversión en Paz Mental</div>
                                    <div className="flex items-end gap-6 mb-8">
                                        <span className="text-4xl text-slate-800 font-light tracking-tight">{fmtPrice(product.price)}</span>
                                        {product.originalPrice && <span className="text-sm text-slate-400 line-through pb-1">{fmtPrice(product.originalPrice)}</span>}
                                    </div>
                                    <button onClick={() => document.getElementById('checkout-headphones')?.scrollIntoView({ behavior: 'smooth' })} className="w-full bg-slate-900 text-white rounded-full py-5 font-medium tracking-wide text-sm hover:bg-indigo-600 transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_10px_30px_rgba(99,102,241,0.3)]">
                                        Solicitar Envío para Pago en Casa
                                    </button>
                                    <div className="text-xs text-center text-slate-500 mt-6 font-light">
                                        Total anonimato financiero: Pago exclusivo C.O.D.
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full relative flex items-center justify-center p-8 order-1 lg:order-2">
                            {/* Floating glass orb effect */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white to-transparent rounded-full opacity-60 mix-blend-screen scale-110 blur-xl"></div>
                            <div className="relative z-10 w-full max-w-sm rounded-[3rem] overflow-hidden bg-white/30 backdrop-blur-md p-4 shadow-[0_20px_60px_rgba(0,0,0,0.02)] border border-white/50">
                                <EnhancedProductGallery product={product} accentColor={accent} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. TRUST BADGES TECHNICAL (Acoustic Properties) */}
                <div className="border-y border-white/60 bg-white/30 backdrop-blur-sm">
                    <div className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
                        {[
                            {v: '-40 dB', l: 'Supresión de Ruido ANC'},
                            {v: '45 Hrs', l: 'Autonomía de Batería'},
                            {v: '245 G', l: 'Peso Ultraligero'},
                            {v: 'Códec LDAC', l: 'Hi-Res Wireless'}
                        ].map((b, i) => (
                            <div key={i} className="flex flex-col relative">
                                <div className="text-3xl text-slate-800 font-light mb-2">{b.v}</div>
                                <div className="text-[10px] text-slate-500 uppercase tracking-widest font-medium">{b.l}</div>
                                {i < 3 && <div className="hidden lg:block absolute right-[-24px] top-1/2 -translate-y-1/2 w-px h-8 bg-slate-200"></div>}
                            </div>
                        ))}
                    </div>
                </div>

                {/* 5. EXPERT ACCORDIONS (The Silence) */}
                <div className="max-w-4xl mx-auto px-6 py-32">
                    <div className="text-center mb-16 relative">
                        <h2 className="text-3xl lg:text-4xl text-slate-800 font-light leading-tight mb-4 tracking-tight">Arquitectura del Vacío.</h2>
                        <p className="text-slate-500 font-light lg:text-lg max-w-2xl mx-auto">No es magia, son físicas de ondas acústicas invertidas procesadas en tiempo real.</p>
                    </div>
                    
                    <div className="space-y-4">
                        {[
                            { t: 'Doble Microfonía de Captura Ambiental', a: 'Existen diminutos micrófonos en las copas de cada lado escuchando el bullicio que te rodea. Un chip detecta el ruido del mundo, y reproduce un "antiruido" milisegundos antes que llegue a tu tímpano, anulando tu percepción externa.' },
                            { t: 'Almohadillas de Espuma Viscoelástica Lenta', a: 'Incluso con la tecnología apagada, el sellado pasivo de estas almohadillas de alta gama sella perfectamente con tus gafas o pendientes sin aplicar presión dolorosa a tu mandíbula usándolos por horas.' },
                            { t: 'Multipunto Inalámbrico Total', a: 'Mira una película en tu portátil. Cuando entre una llamada a tu celular, en tu bolsillo, los auriculares pausarán inteligentemente el portátil y conectarán la llamada. Al cortar, regresan al cine.' }
                        ].map((ac, i) => (
                            <div key={i} className="bg-white/50 backdrop-blur-md rounded-[2rem] border border-white hover:border-indigo-100 transition-colors shadow-sm">
                                <button className="w-full p-8 text-left flex justify-between items-center text-slate-700 transition-colors" onClick={() => setFaqOpen(faqOpen===i?null:i)}>
                                    <span className="text-sm font-medium tracking-wide">{ac.t}</span>
                                    <span className="text-indigo-400 text-xl font-light">{faqOpen===i?'−':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {faqOpen === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-8 pb-8 text-slate-500 font-light text-sm leading-relaxed border-t border-slate-100 pt-6">
                                            {ac.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 6. ENDLESS MARQUEE (Floating Text) */}
                <div className="w-[100vw] overflow-hidden py-10 flex transform relative left-[50%] -translate-x-[50%] bg-white/20 backdrop-blur-sm border-y border-white">
                    <div className="flex whitespace-nowrap font-light text-4xl text-slate-800/10 uppercase tracking-tighter">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="flex items-center gap-16 px-8 select-none">
                                <span>ABSALUTE SILENCE</span>
                                <span className="text-indigo-500/20 font-serif">~</span>
                                <span>FOCUS DEEPLY</span>
                                <span className="text-indigo-500/20 font-serif">~</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 7. WHY TO USE / BENEFITS */}
                <div className="max-w-7xl mx-auto px-6 py-32 border-b border-slate-200/50">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="order-2 lg:order-1 relative">
                            {/* Zen conceptual visual */}
                            <div className="aspect-square rounded-full bg-gradient-to-b from-indigo-50 to-white flex items-center justify-center p-12 relative shadow-[inset_0_20px_50px_rgba(255,255,255,1)]">
                                <div className="absolute inset-x-0 top-1/2 w-full h-[1px] bg-slate-200"></div>
                                {/* Animated sine wave */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-50 text-indigo-400">
                                     <svg viewBox="0 0 100 20" className="w-[120%]">
                                        <path fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" d="M0,10 Q5,5 10,10 T20,10 T30,10 T40,10 T50,10 T60,10 T70,10 T80,10 T90,10 T100,10" />
                                    </svg>
                                </div>
                                <div className="bg-white/80 backdrop-blur shadow-xl border border-white p-8 rounded-3xl relative z-10 text-center w-full max-w-sm">
                                    <div className="text-indigo-500 font-medium tracking-widest uppercase text-[10px] mb-2">Activación ANC</div>
                                    <div className="text-2xl font-light text-slate-800">Cero Distracciones</div>
                                    <p className="text-slate-500 text-xs font-light leading-relaxed mt-4">Transforma oficinas abiertas o cabinas ruidosas en tu estudio silencioso y privado al instante.</p>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2">
                            <h2 className="text-4xl lg:text-5xl font-light text-slate-800 leading-tight mb-8">Recupera <br/><span className="text-indigo-500">tu espacio mental.</span></h2>
                            <p className="text-slate-500 font-light text-lg lg:text-xl mb-12 leading-relaxed">El mundo moderno compite constantemente por tu atención con ruidos no deseados. Este dispositivo no es un reproductor de música, es una burbuja protectora para tu psiquis cognitiva.</p>
                            
                            <ul className="space-y-8 mt-12">
                                {[
                                    { t: 'Modo Transparencia Acústica', d: 'Coloca la mano completa sobre el auricular derecho: la música baja automáticamente y se activan los micrófonos para que escuches fluidamente la voz del azafato o camarero sin quitarte los cascos.' },
                                    { t: 'Ecualizador Zen Inteligente', d: 'Perfiles que adecúan bajos profundos y agudos en la aplicación del teléfono dependiendo de si deseas frecuencias pesadas en el gimnasio, o jazz sutil mientras trabajas con la laptop.' }
                                ].map((b, i) => (
                                    <li key={i} className="flex gap-6">
                                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2"></div>
                                        <div>
                                            <h4 className="text-slate-800 font-medium uppercase tracking-[0.1em] text-[11px] mb-2">{b.t}</h4>
                                            <p className="text-slate-500 font-light text-sm leading-relaxed">{b.d}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* 10. COMPARISON TABLE */}
                <div className="max-w-4xl mx-auto px-6 py-32">
                    <div className="bg-white/50 backdrop-blur-xl rounded-[2rem] border border-white shadow-[0_20px_50px_rgba(0,0,0,0.02)] overflow-hidden">
                        <div className="grid grid-cols-3 bg-slate-50/50 text-[9px] uppercase font-bold text-slate-400 tracking-widest border-b border-white">
                            <div className="p-6 md:p-8">Tecnología</div>
                            <div className="p-6 md:p-8 text-indigo-700 bg-indigo-50/50 border-x border-white text-center">Nuestra Burbuja ANC</div>
                            <div className="p-6 md:p-8 text-center">Plásticos de "Supermercado"</div>
                        </div>
                        {[
                            { k: 'Anulación Externa', u: 'Doble chip de Cancelación Activa (-40db)', t: 'Solución Pasiva (Igual entra ruido exterior)' },
                            { k: 'Materialidad y Calor', u: 'Termo-regulación con espuma inteligente', t: 'Plástico de fagina que suda en 20 minutos' },
                            { k: 'Protección de Fondos', u: 'Retención de dinero hasta que te los llevan a casa (C.O.D)', t: 'Tarjeta ingresada en páginas fraudulentas por riesgo' }
                        ].map((r, i) => (
                            <div key={i} className="grid grid-cols-3 border-t border-slate-100 font-light text-xs">
                                <div className="p-6 md:p-8 text-slate-500">{r.k}</div>
                                <div className="p-6 md:p-8 text-slate-800 font-medium bg-indigo-50/20 border-x border-white text-center">{r.u}</div>
                                <div className="p-6 md:p-8 text-slate-400 text-center line-through">{r.t}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 11. RISK REVERSAL WARRANTY */}
                <div className="py-24 max-w-4xl mx-auto px-6 text-center">
                    <div className="w-16 h-16 bg-white rounded-full flex justify-center items-center mx-auto mb-8 shadow-sm border border-slate-100">
                        <svg className="w-6 h-6 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                    </div>
                    <h3 className="text-2xl text-slate-800 font-light uppercase tracking-widest mb-6">Tranquilidad Pre y Post Venta (C.O.D).</h3>
                    <p className="text-slate-500 font-light text-sm leading-relaxed max-w-2xl mx-auto">
                        Aspiras comprar paz anulando el sonido; no deberías ganar ansiedad usando tu tarjeta en la web. Emitimos nuestra propia flota logística a la red de tu ciudad. Abajo colocas lugar y horario de confort. Bajan el equipo tecnológico inmaculado en su caja sellada. La abres, revisas con el personal y abonas tu capital al contado o transferencia in-situ. Respeto 100%.
                    </p>
                </div>

                {/* 13. FAQ */}
                <div className="max-w-3xl mx-auto px-6 py-24 border-t border-slate-200/50">
                    <h2 className="text-3xl text-slate-800 font-light mb-16 text-center">Inquietudes Sonoras</h2>
                    <div className="space-y-4">
                        {[
                            {q: 'No soporto la presión al usar auriculares de estos grandes, ¿Aprietan mucho la cien?', a: 'Usamos un rediseño de fuerza de sujeción (clamping force) que recide en el arco de aluminio, no en las orejas, además de ser increíblemente livianos al sacarle metales innecesarios. Se sienten como usar sombreros de aire.'},
                            {q: 'Tengo un iPhone y uso una notebook genérica Windows, ¿Me ligan bien a los dos?', a: 'Completamente interoperables. Usan codec Bluetooth 5.2 abierto que liga perfecto con ecosistema Android, iOS, Windows y macOS sin requerir ecosistemas cerrados privativos absurdos.'},
                            {q: 'Si hago pedido sin tarjeta (C.O.D), ¿qué pasa si demuestran una falla el primer día?', a: 'Te incluimos una póliza de recambio interno por fallos sistémicos de fábrica de 30 días directo con nuestra firma y la entrega, al ser tú mismo tu propio custodio presencial de dinero con el transportista, sella una transparencia insuperable.'}
                        ].map((f, i) => (
                            <div key={i} className="bg-white/60 backdrop-blur-md rounded-2xl border border-white shadow-sm">
                                <button onClick={() => setFaqOpen(faqOpen===i?null:i)} className="w-full p-6 text-left flex justify-between items-center text-slate-700 font-medium text-sm transition-colors">
                                    {f.q}
                                    <span className="text-slate-400 font-light text-xl">{faqOpen===i?'−':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {faqOpen === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 pb-6 text-slate-500 font-light text-sm leading-relaxed border-t border-slate-100 pt-4">
                                            {f.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 14. EXPANDED REVIEWS */}
                <div className="py-24 bg-slate-100/50">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { r: "Trabajar en la cafetería para huir de mi casa ahora es soportable, la función de supresión baja las voces molestas a la nada misma. Pagué el envío contrareembolso exacto lo que figura ahí arriba.", n: "Carolina S.", t: "Diseñadora Freelance" },
                                { r: "Se siente literal como sacarte un casco pesado, son superlivianos en las orejas. El sonido super limpio, no esos bajos saturados horribles. 10/10 la app y excelente la entrega cobro local.", n: "Felipe K.", t: "DevOps Engineer" },
                                { r: "Viajo mucho en colectivo larga distancia, apagarlos y sentir el run-run del motor desaparecer me relaja totalmente. La reserva de la compra fue rápida, pedí, confirmaron al wapp y trajeron.", n: "Lorena M.", t: "Comprador Físico" }
                            ].map((rev, i) => (
                                <div key={i} className="p-8 bg-white/80 backdrop-blur-md border border-white rounded-[2rem] shadow-sm relative">
                                    <p className="text-slate-600 font-light text-sm mb-8 leading-relaxed italic">"{rev.r}"</p>
                                    <div className="pt-4 border-t border-slate-100">
                                        <div className="text-slate-800 font-medium tracking-wide text-xs mb-1">{rev.n}</div>
                                        <div className="text-indigo-500 font-medium uppercase text-[10px] tracking-widest">{rev.t}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 15. CHECKOUT (Zen Dispatch Form) */}
                <div id="checkout-headphones" className="py-32 relative bg-white border-t border-slate-100">
                    <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
                        <div className="order-2 lg:order-1 bg-slate-50/80 p-10 lg:p-16 rounded-[3rem] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] relative overflow-hidden backdrop-blur-xl">
                            {/* Ambient internal soft orb */}
                            <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-100 rounded-full blur-3xl"></div>
                            
                            <div className="relative z-10">
                                <div className="mb-10 text-center lg:text-left">
                                    <h3 className="text-2xl font-light text-slate-800 tracking-tight mb-2">Manifiesto Estático Físico</h3>
                                    <div className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">Reserva y Contado presencial {'>'}</div>
                                </div>
                                
                                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                                    <div>
                                        <label className="text-slate-400 uppercase text-[9px] font-bold tracking-widest block mb-2 px-6">Identidad Visual</label>
                                        <input type="text" className="w-full bg-white border-none shadow-sm rounded-full text-slate-700 text-sm py-4 px-6 focus:ring-2 focus:ring-indigo-100 outline-none transition-shadow" placeholder="Escriba su Nombre" />
                                    </div>
                                    <div>
                                        <label className="text-slate-400 uppercase text-[9px] font-bold tracking-widest block mb-2 px-6">Línea Telefónica</label>
                                        <input type="tel" className="w-full bg-white border-none shadow-sm rounded-full text-slate-700 text-sm py-4 px-6 focus:ring-2 focus:ring-indigo-100 outline-none transition-shadow" placeholder="Escriba WhatsApp" />
                                    </div>
                                    <div>
                                        <label className="text-slate-400 uppercase text-[9px] font-bold tracking-widest block mb-2 px-6">Ubicación Residencial / Flete</label>
                                        <textarea rows={2} className="w-full bg-white border-none shadow-sm text-slate-700 rounded-3xl text-sm py-4 px-6 focus:ring-2 focus:ring-indigo-100 outline-none transition-shadow resize-none" placeholder="Localidad o Referencia exacta"></textarea>
                                    </div>
                                    <div className="pt-6">
                                        <button className="w-full bg-slate-900 text-white py-5 rounded-full font-medium tracking-wide text-sm hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200">
                                            Aprobar Despacho
                                        </button>
                                        <div className="text-[10px] text-center text-slate-400 mt-4 font-bold tracking-widest uppercase">Pague sin tarjetas al operario logístico</div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="order-1 lg:order-2 text-center lg:text-left">
                            <h2 className="text-4xl lg:text-5xl font-light text-slate-900 mb-8 tracking-tighter leading-tight">Envío silenciado,<br/><span className="text-indigo-500 font-medium">dinero a salvo.</span></h2>
                            <p className="text-slate-500 font-light mb-12 text-lg leading-relaxed max-w-sm mx-auto lg:mx-0">Dejar de prestar atención al ruido también significa no enredarse ni sudar estresado por pagos difusos internacionales. Cargas tus datos sencillos bajo la total privacidad aquí a la izquierda, nosotros hacemos la inmersión del reparto a tu casa en modo C.O.D., y ahí lo resuelves pagando al verlo sano y salvo.</p>
                            
                            <div className="text-5xl font-light text-slate-800 tracking-tighter py-2 border-l-2 border-indigo-100 pl-6 mx-auto lg:mx-0 w-max">{fmtPrice(product.price)}</div>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
};

export default PdpNoiseCancellingEar;
