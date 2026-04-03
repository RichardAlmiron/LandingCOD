'use client';
import React, { useState } from 'react';
import { StoreData, Product } from '@/lib/types';
import EnhancedProductGallery from '@/components/pdp/EnhancedProductGallery';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { data: StoreData; product: Product; }

const PdpTitaniumPhone: React.FC<Props> = ({ data, product }) => {
    const [faqOpen, setFaqOpen] = useState<number | null>(null);
    const ai = product.aiContent;
    const fmtPrice = (n: number) => { const s = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); return `Gs. ${s}`; };

    // Estética "Jewelry Tech": Sombras profundas, titanio platinado, dorado ceniza y lujo minimalista corporativo.
    const bg = '#020202'; // Pure darkness
    const textMain = '#a1a1aa'; // Zinc 400
    const accent = '#d4d4d8'; // Zinc 300 (Titanium reflection)

    return (
        <div style={{ background: bg, color: textMain }} className="font-serif antialiased overflow-x-hidden selection:bg-zinc-800 selection:text-white">
            
            {/* Minimalist Ambient Glow */}
            <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center opacity-30">
                <div className="w-[1000px] h-[300px] bg-zinc-600/10 rotate-[-15deg] blur-[150px]"></div>
            </div>

            {/* 1. TOP NAV (Haute Horlogerie Vibe) */}
            <header className="sticky top-0 z-50 bg-[#020202]/80 backdrop-blur-2xl border-b border-zinc-900">
                <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
                    <div className="text-xl font-light tracking-[0.2em] text-zinc-100 uppercase flex items-center gap-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-300"></span>
                        AURA<span className="font-bold">TITANIUM</span>
                    </div>
                </div>
            </header>

            <main className="relative z-10 w-full overflow-hidden">
                {/* 2. BREADCRUMBS & LOGISTICS */}
                <div className="max-w-6xl mx-auto px-6 pt-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-900 pb-4">
                        <div className="text-[10px] uppercase font-sans tracking-[0.3em] text-zinc-600">
                            Ediciones Limitadas / Telefonía / <span className="text-zinc-300">Grado Aeroespacial</span>
                        </div>
                        <div className="text-[10px] uppercase font-sans tracking-widest text-zinc-400">
                            Servicio C.O.D. Preferencial Activo
                        </div>
                    </div>
                </div>

                {/* 3. HERO (MAGAZINE COVER STYLE) */}
                <div className="max-w-6xl mx-auto px-6 py-20 lg:py-32">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="relative z-20">
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-zinc-100 mb-8 tracking-tighter leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500">
                                {ai?.enhancedTitle || product.title}
                            </h1>
                            <p className="text-lg md:text-xl text-zinc-500 mb-12 font-light leading-relaxed max-w-md">
                                {ai?.enhancedDescription || product.description || 'Forjado en titanio grado 5. Una obra maestra de ingeniería para líderes de negocios que exigen poder de cómputo inquebrantable en su bolsillo.'}
                            </p>
                            
                            <div className="border border-zinc-800 p-10 bg-[#050505] relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-tr from-zinc-800/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                                <div className="relative z-10">
                                    <div className="text-xs font-sans text-zinc-600 uppercase tracking-widest mb-4">Inversión Patrimonial</div>
                                    <div className="flex items-end gap-6 mb-10">
                                        <span className="text-4xl text-zinc-200 tracking-tight">{fmtPrice(product.price)}</span>
                                        {product.originalPrice && <span className="text-sm text-zinc-700 line-through pb-1">{fmtPrice(product.originalPrice)}</span>}
                                    </div>
                                    <button onClick={() => document.getElementById('checkout-luxury')?.scrollIntoView({ behavior: 'smooth' })} className="w-full bg-zinc-200 text-black py-4 font-sans font-bold uppercase tracking-[0.2em] text-xs hover:bg-white transition-colors duration-500">
                                        Solicitar Envío Blindado
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="w-full relative flex items-center justify-center p-8">
                            <div className="absolute inset-0 bg-gradient-to-b from-[#111] to-[#020202] rounded-full filter blur-3xl opacity-50 z-0"></div>
                            {/* Elegantly framed gallery */}
                            <div className="relative z-10 w-full max-w-sm">
                                <EnhancedProductGallery product={product} accentColor={accent} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. TRUST BADGES TECHNICAL (Monochrome minimal specs) */}
                <div className="border-y border-zinc-900 bg-[#050505]">
                    <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-2 lg:grid-cols-4 gap-12">
                        {[
                            {v: 'Titanio', l: 'Grado Aeroespacial 5'},
                            {v: '3nm', l: 'Arquitectura Biónica'},
                            {v: 'ProRes', l: 'Cámara Cinematográfica'},
                            {v: 'Ray Tracing', l: 'Hardware Acelerado'}
                        ].map((b, i) => (
                            <div key={i} className="text-center font-sans relative">
                                <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-[1px] h-8 bg-zinc-800 hidden lg:block first:hidden"></div>
                                <div className="text-2xl text-zinc-200 font-light tracking-tight mb-2">{b.v}</div>
                                <div className="text-[9px] text-zinc-600 uppercase tracking-widest">{b.l}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 5. EXPERT ACCORDIONS (Boutique details) */}
                <div className="max-w-4xl mx-auto px-6 py-32">
                    <div className="text-center mb-20 relative">
                        <span className="w-[1px] h-12 bg-zinc-800 absolute -top-16 left-1/2"></span>
                        <h2 className="text-3xl text-zinc-300 font-light mb-4">El Material del Acabado Impecable.</h2>
                        <div className="text-xs font-sans text-zinc-600 uppercase tracking-[0.2em]">Diseño Industrial Superior</div>
                    </div>
                    
                    <div className="border-t border-zinc-900 font-sans">
                        {[
                            { t: 'Mecanizado Micro-Preciso', a: 'Cortamos el chasis externo a partir de un bloque sólido de titanio fundido y luego cepillamos su superficie durante 14 horas para obtener esa textura exquisita que no resbala ni se marca con huellas.' },
                            { t: 'Batería Apilada de Alta Densidad', a: 'Un incremento arquitectónico que permite trabajar en excels u operar software pesado de finanzas sin buscar el enchufe hasta la media noche. Rendimiento corporativo sin interrupciones.' },
                            { t: 'Fotografía Computacional', a: 'El sensor de 48 Megapíxeles está bañado y escudado tras cristal de zafiro. No es una cámara de teléfono, es una cámara profesional de medio formato compactada que dispara en formatos LOG listos para producción.' }
                        ].map((ac, i) => (
                            <div key={i} className="border-b border-zinc-900 group">
                                <button className="w-full py-8 text-left flex justify-between items-center text-zinc-300 hover:text-white transition-colors" onClick={() => setFaqOpen(faqOpen===i?null:i)}>
                                    <span className="text-sm font-light tracking-widest uppercase">{ac.t}</span>
                                    <span className="text-zinc-600 text-xl font-light">{faqOpen===i?'−':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {faqOpen === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="pb-8 text-zinc-500 font-light text-sm leading-loose">
                                            {ac.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 6. ENDLESS MARQUEE (Elegant Typography) */}
                <div className="w-[100vw] overflow-hidden py-10 bg-[#050505] border-y border-zinc-900 flex transform relative left-[50%] -translate-x-[50%]">
                    <div className="flex whitespace-nowrap font-light text-3xl text-zinc-800 uppercase tracking-[0.3em]">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="flex items-center gap-16 px-8">
                                <span>SIN CONCESIONES</span>
                                <span className="text-zinc-900">|</span>
                                <span>PODER ABSOLUTO</span>
                                <span className="text-zinc-900">|</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 7. WHY TO USE / BENEFITS (Luxury Layout) */}
                <div className="max-w-6xl mx-auto px-6 py-32 lg:py-48">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                        <div className="order-2 lg:order-1 relative">
                            <div className="aspect-[3/4] bg-[#070707] border border-zinc-900 p-2 transform rotate-2">
                                <div className="absolute inset-0 bg-gradient-to-tr from-zinc-800/10 to-transparent"></div>
                                <div className="w-full h-full bg-[#020202] border border-zinc-900 flex flex-col justify-center p-12">
                                    <svg viewBox="0 0 24 24" fill="none" className="w-12 h-12 text-zinc-700 mb-8"><path stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 7l10 5 10-5-10-5zm0 10l-10 5 10 5 10-5-10-5z"/></svg>
                                    <h3 className="text-2xl font-light text-zinc-300 mb-6 leading-tight">Botón de Acción Programable</h3>
                                    <p className="text-zinc-500 font-sans font-light text-sm leading-relaxed">Olvídate del interruptor genérico. Ahora tienes un dial táctico háptico. Prográmalo para grabar voz, abrir tu app de banco corporativo o encender la linterna con una leve vibración metálica que se siente cara.</p>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2">
                            <h2 className="text-4xl lg:text-6xl font-light text-zinc-200 mb-8 tracking-tight leading-tight">La herramienta <br/><span className="italic text-zinc-500">del CEO moderno.</span></h2>
                            <p className="text-zinc-500 font-sans font-light mb-16 text-lg leading-relaxed">No es un juguete para redes sociales. Es una caja fuerte de silicio construida bajo normas inmensamente estrictas para asegurar tus datos y operar tus negocios globales sin ralentizaciones.</p>
                            
                            <div className="space-y-12 font-sans">
                                {[
                                    { t: 'Seguridad Biométrica 3D', d: 'Mapea la profundidad de tu rostro con 30,000 puntos infrarrojos. Imposible burlar con fotografías o máscaras.' },
                                    { t: 'Chasis Disipador Interno', d: 'La placa de aluminio 100% reciclado interna transfiere el calor rápidamente, evitando que se caliente en las videollamadas.' }
                                ].map((b, i) => (
                                    <div key={i} className="flex gap-6 items-start">
                                        <div className="w-8 h-8 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-500 text-xs shrink-0">{i+1}</div>
                                        <div>
                                            <h4 className="text-zinc-300 font-light uppercase tracking-widest text-xs mb-2">{b.t}</h4>
                                            <p className="text-zinc-600 font-light text-sm leading-relaxed">{b.d}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 10. COMPARISON TABLE (High-End Banking feel) */}
                <div className="max-w-4xl mx-auto px-6 py-32 border-t border-zinc-900">
                    <h2 className="text-3xl text-center font-light text-zinc-300 mb-16 tracking-wide">Clase vs Masa</h2>
                    <div className="border border-zinc-900 font-sans">
                        <div className="grid grid-cols-3 bg-[#050505] text-[9px] uppercase font-semibold text-zinc-500 tracking-[0.2em] border-b border-zinc-900">
                            <div className="p-6">Atributo</div>
                            <div className="p-6 text-zinc-200 border-x border-zinc-900 text-center">Edición Titanio Pro</div>
                            <div className="p-6 text-center">Smartphones Básicos</div>
                        </div>
                        {[
                            { k: 'Cuerpo Físico', u: 'Titanio + Cristal Mate texturizado', t: 'Plástico brillante o aluminio blando' },
                            { k: 'Transferencia Datos', u: 'Puerto USB-C (10 Gb/s) para SSDs', t: 'Puerto USB 2.0 lento antiguo' },
                            { k: 'Longevidad', u: '5+ Años de soporte del Software', t: '1 Año máximo' },
                            { k: 'Método Compra', u: 'Pago seguro al chofer logístico o banco', t: 'Depósito a ciegos online' }
                        ].map((r, i) => (
                            <div key={i} className="grid grid-cols-3 border-t border-zinc-900 text-xs font-light">
                                <div className="p-6 text-zinc-500">{r.k}</div>
                                <div className="p-6 font-medium text-zinc-300 bg-white/[0.01] border-x border-zinc-900 text-center">{r.u}</div>
                                <div className="p-6 text-zinc-700 text-center line-through">{r.t}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 11. RISK REVERSAL WARRANTY (VIP White Glove Delivery) */}
                <div className="max-w-4xl mx-auto px-6 py-32 text-center">
                    <div className="w-[1px] h-16 bg-zinc-800 mx-auto mb-10"></div>
                    <h3 className="text-2xl text-zinc-200 font-light tracking-widest uppercase mb-6">Logística de Guante Blanco.</h3>
                    <p className="text-zinc-500 font-sans font-light leading-relaxed max-w-2xl mx-auto text-sm">
                        Para transacciones VIP, la confianza es mandatoria. Olvida las pasarelas online inseguras. Cargas tus requerimientos abajo y enrutamos una caja sellada a tu piso de oficinas o complejo residencial. Usted aprueba visualmente el material y nos liquida ahí mismo en efectivo o transferencia verificada. Un trato de caballeros.
                    </p>
                </div>

                {/* 13. FAQ */}
                <div className="max-w-3xl mx-auto px-6 py-24 border-y border-zinc-900/50">
                    <div className="text-center mb-16">
                        <div className="text-xs font-sans uppercase tracking-[0.3em] text-zinc-600">Consideraciones</div>
                    </div>
                    <div className="space-y-2 font-sans">
                        {[
                            {q: '¿Los bordes de Titanio se rayan fácilmente?', a: 'El Titanio Grado 5 es empleado en satélites y blindajes médicos. Su índice de dureza a la tracción supera abrumadoramente al acero inoxidable comúnmente usado antes. No, es una roca ultraligera.'},
                            {q: '¿Tienen cobertura de envío para todo el interior?', a: 'Nuestro sistema de "Cobro en Base Terrestre" (C.O.D.) está operativo en toda la capital y Gran área metropolitana con choferes propios en 24hs. Consultar disponibilidad en rutas lejanas una vez pedido el equipo.'},
                            {q: 'No confío en dar dinero a un extraño. ¿Qué garantía hay?', a: 'Exactamente por eso existe el C.O.D. No es un extraño, es nuestro personal oficial uniformado. Validas el equipo CERRADO EN CAJA, escanéas sus QR y ahí autorizas frente a él la transacción con tu teléfono antiguo o en billetes físicos.'}
                        ].map((f, i) => (
                            <div key={i} className="border-b border-zinc-900 group">
                                <button onClick={() => setFaqOpen(faqOpen===i?null:i)} className="w-full py-6 text-left flex justify-between items-center text-zinc-400 font-light hover:text-zinc-200 transition-colors text-sm uppercase tracking-wider">
                                    {f.q}
                                    <span className="text-zinc-600 text-lg font-light">{faqOpen===i?'−':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {faqOpen === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="pb-6 text-zinc-600 font-light text-sm leading-relaxed">
                                            {f.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 14. EXPANDED REVIEWS (Executive Testimonials) */}
                <div className="py-24 border-b border-zinc-900">
                    <div className="max-w-6xl mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            {[
                                { r: "Compré dos equipos para dirección ejecutiva. Excelente el delivery corporativo. Vinieron a mi despacho, vi los sellos internacionales del empaque y les pagué al contado.", n: "Sr. Fernando L.", t: "Gerente Comercial" },
                                { r: "El tacto del titanio cepillado es asombroso. Por fin un teléfono que no pesa un kilo y sigue sintiéndose como un producto de la más alta relojería suiza.", n: "Dra. Carolina S.", t: "Abogada Asociada" },
                                { r: "Las fotos nocturnas parecen rodadas en cine. Es impresionante que esta cámara y procesador quepan en un perfil tan delgado. Servicio C.O.D recomendado totalmente.", n: "Martín E.", t: "Productor Publicitario" }
                            ].map((rev, i) => (
                                <div key={i} className="flex flex-col relative">
                                    <div className="absolute top-0 left-0 w-8 h-[1px] bg-zinc-700 mb-6"></div>
                                    <p className="text-zinc-500 font-light font-sans text-sm mt-6 mb-8 leading-relaxed italic">"{rev.r}"</p>
                                    <div className="mt-auto">
                                        <div className="text-zinc-300 font-light uppercase tracking-widest text-[10px] mb-1">{rev.n}</div>
                                        <div className="text-zinc-600 font-sans text-[9px] uppercase tracking-wider">{rev.t}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 15. CHECKOUT (Minimalist Black Card Form) */}
                <div id="checkout-luxury" className="py-32 bg-[#000] relative">
                    <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
                        <div className="order-2 lg:order-1 bg-[#050505] p-10 lg:p-14 border border-zinc-900/50">
                            <div className="text-center mb-10">
                                <h3 className="text-lg font-light text-zinc-300 uppercase tracking-[0.3em] mb-2">Petición de Equipo</h3>
                                <div className="text-[9px] font-sans text-zinc-600 uppercase tracking-widest">Protocolo Seguro</div>
                            </div>
                            
                            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                                <div>
                                    <input type="text" className="w-full bg-transparent border-b border-zinc-800 text-zinc-200 font-light text-sm pb-4 focus:border-zinc-400 outline-none transition-colors uppercase placeholder:text-zinc-700 tracking-wider" placeholder="Nombre de Adjudicatario" />
                                </div>
                                <div>
                                    <input type="tel" className="w-full bg-transparent border-b border-zinc-800 text-zinc-200 font-light text-sm pb-4 focus:border-zinc-400 outline-none transition-colors uppercase placeholder:text-zinc-700 tracking-wider" placeholder="Enlace Móvil / Celular" />
                                </div>
                                <div>
                                    <textarea rows={1} className="w-full bg-transparent border-b border-zinc-800 text-zinc-200 font-light text-sm pb-4 focus:border-zinc-400 outline-none transition-colors uppercase placeholder:text-zinc-700 tracking-wider resize-none" placeholder="Ubicación Terrestre Física"></textarea>
                                </div>
                                <div className="pt-6">
                                    <button className="w-full bg-zinc-200 text-black py-5 font-sans font-bold uppercase tracking-[0.2em] text-xs hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all duration-500">
                                        Remitir Órden & Abonar al Recibir
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className="order-1 lg:order-2 text-center lg:text-left">
                            <h2 className="text-4xl lg:text-5xl font-light text-zinc-200 mb-8 tracking-tighter leading-tight">Garantice un asfalto <br/>para sus <br/><span className="text-zinc-600 italic">decisiones diarias.</span></h2>
                            <p className="text-zinc-500 font-sans font-light mb-12 text-sm leading-relaxed max-w-sm mx-auto lg:mx-0">Deje sus identificadores en el sistema. Llevamos esta caja lacrada en oro ceniza hacia el sitio solicitado. Usted asume control visual, cierra el tracto abonando logísticamente, y el dispositivo le pertenece.</p>
                            
                            <div className="text-3xl font-light text-zinc-300 border-l border-zinc-800 pl-6 mx-auto lg:mx-0 inline-block">{fmtPrice(product.price)}</div>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
};

export default PdpTitaniumPhone;
