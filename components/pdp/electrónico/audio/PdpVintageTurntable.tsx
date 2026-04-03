'use client';
import React, { useState } from 'react';
import { StoreData, Product } from '@/lib/types';
import EnhancedProductGallery from '@/components/pdp/EnhancedProductGallery';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { data: StoreData; product: Product; }

const PdpVintageTurntable: React.FC<Props> = ({ data, product }) => {
    const [faqOpen, setFaqOpen] = useState<number | null>(null);
    const ai = product.aiContent;
    const fmtPrice = (n: number) => { const s = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); return `Gs. ${s}`; };

    // Estética "Warm Vinyl Room": Maderas oscuras (Nogal), bronces dorados y negros carbón
    const bg = '#171311'; // Dark Espresso / Charcoal
    const textMain = '#d4d4d8'; // Zinc 300
    const accent = '#d97706'; // Amber 600 (Bronze/Gold)

    return (
        <div style={{ background: bg, color: textMain }} className="font-serif antialiased overflow-x-hidden selection:bg-amber-600/30 selection:text-amber-100">
            
            {/* Cinematic Warm Glow */}
            <div className="fixed inset-0 pointer-events-none z-0 mix-blend-screen opacity-20">
                <div className="absolute top-0 right-0 w-[80vw] h-[80vh] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/40 via-transparent to-transparent blur-[100px]"></div>
                <div className="absolute bottom-0 left-0 w-[60vw] h-[60vh] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-950/40 via-transparent to-transparent blur-[120px]"></div>
            </div>

            {/* 1. TOP NAV (Acoustic Gallery Line) */}
            <header className="sticky top-0 z-50 bg-[#171311]/80 backdrop-blur-xl border-b border-amber-900/30">
                <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
                    <div className="text-xl font-light tracking-[0.2em] text-amber-100 uppercase flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full border border-amber-600/50 flex items-center justify-center p-1">
                            <div className="w-full h-full rounded-full border-2 border-dashed border-amber-700/50 animate-[spin_10s_linear_infinite]"></div>
                        </div>
                        ANALOGUE<span className="font-bold text-amber-600">SOUND</span>
                    </div>
                </div>
            </header>

            <main className="relative z-10 w-full overflow-hidden">
                {/* 2. BREADCRUMBS & LOGISTICS */}
                <div className="max-w-6xl mx-auto px-6 pt-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-amber-900/20 pb-6">
                        <div className="text-xs uppercase font-sans tracking-[0.2em] text-neutral-500">
                            Alta Fidelidad / Reproductores / <span className="text-amber-500">Analógico Pura Clase</span>
                        </div>
                        <div className="text-xs uppercase font-sans tracking-widest text-[#171311] bg-amber-600 font-bold px-4 py-2 border border-amber-400/30 shadow-[0_0_15px_rgba(217,119,6,0.2)]">
                            Abono Físico en Entrega (C.O.D)
                        </div>
                    </div>
                </div>

                {/* 3. HERO (AUDIOPHILE SANCTUARY) */}
                <div className="max-w-6xl mx-auto px-6 py-20 lg:py-28">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="relative z-20 order-2 lg:order-1">
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-amber-50 mb-8 tracking-wide leading-[1.05]">
                                {ai?.enhancedTitle || product.title}
                            </h1>
                            <p className="text-lg md:text-xl text-neutral-400 mb-12 font-light leading-relaxed font-sans border-l-2 border-amber-800/50 pl-6">
                                {ai?.enhancedDescription || product.description || 'El ritual del vinilo perfeccionado. Un mecanismo audiófilo de tracción directa sobre un chasis de nogal macizo, rescatando la frecuencia musical que lo digital comprimió.'}
                            </p>
                            
                            <div className="bg-[#1f1a18] border border-amber-900/30 p-10 relative shadow-2xl">
                                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-amber-700/50 to-transparent"></div>
                                <div className="text-xs font-sans text-amber-700 uppercase tracking-widest mb-4 font-bold">Inversión de Escucha</div>
                                <div className="flex items-end gap-6 mb-10">
                                    <span className="text-4xl text-amber-100 tracking-tight">{fmtPrice(product.price)}</span>
                                    {product.originalPrice && <span className="text-sm text-neutral-600 line-through pb-1 font-sans">{fmtPrice(product.originalPrice)}</span>}
                                </div>
                                <button onClick={() => document.getElementById('checkout-vintage')?.scrollIntoView({ behavior: 'smooth' })} className="w-full bg-amber-600 hover:bg-amber-500 text-[#171311] py-5 font-sans font-bold uppercase tracking-[0.2em] text-xs transition-colors shadow-[0_4px_20px_rgba(217,119,6,0.15)] flex justify-center items-center gap-3">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>
                                    Asegurar Transmisión de Audio
                                </button>
                                <div className="text-[10px] text-center text-amber-600/70 uppercase tracking-widest mt-6 font-sans font-bold">
                                    Sin tarjetas. Pague al instalador logístico.
                                </div>
                            </div>
                        </div>

                        <div className="w-full relative flex items-center justify-center p-8 order-1 lg:order-2">
                            {/* Wooden / Bronze Frame Illusion behind image */}
                            <div className="absolute inset-0 bg-[#2b211d] rounded-sm transform rotate-3 scale-95 border border-[#3e2e27] shadow-[20px_20px_60px_rgba(0,0,0,0.8)] z-0"></div>
                            <div className="relative z-10 w-full bg-[#171311] p-3 border border-amber-900/40">
                                <EnhancedProductGallery product={product} accentColor={accent} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. TRUST BADGES TECHNICAL (Acoustic Metrics) */}
                <div className="border-y border-amber-900/20 bg-[#14100e]">
                    <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
                        {[
                            {v: 'Tracción Directa', l: 'Cero Fluctuaciones'},
                            {v: 'Nogal Genuino', l: 'Absorción de Resonancia'},
                            {v: 'Brazo Carbono', l: 'Traking Ultraligero'},
                            {v: 'Pre-Amp Phono', l: 'Salida Lineal Integrada'}
                        ].map((b, i) => (
                            <div key={i} className="flex flex-col relative">
                                <div className="text-xl text-amber-100 font-light tracking-wide mb-3">{b.v}</div>
                                <div className="text-[10px] font-sans text-amber-700/80 uppercase tracking-widest font-bold">{b.l}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 5. EXPERT ACCORDIONS (The Ritual) */}
                <div className="max-w-4xl mx-auto px-6 py-24 lg:py-32">
                    <div className="text-center mb-20 relative">
                        <h2 className="text-3xl text-amber-50 font-light mb-6 tracking-wide">La Arquitectura del Sonido Cálido.</h2>
                        <div className="text-xs font-sans text-neutral-500 uppercase tracking-[0.2em] max-w-xl mx-auto">Materiales Nobles. Precisión de Relojero Músico.</div>
                    </div>
                    
                    <div className="border-t border-amber-900/30">
                        {[
                            { t: 'Motor sin Escobillas (Cero Wow & Flutter)', a: 'Ignora las bandas de goma baratas que se estiran y cambian el tono con el tiempo. El motor de cuarzo empuja el plato de aluminio fundido directamente, clavando las 33⅓ RPM con una precisión abrumadora. La voz del cantante jamás temblará.' },
                            { t: 'Plinto (Cuerpo) Antirresonancia', a: 'Un disco de vinilo lee vibraciones microscópicas de la aguja. Si el parlante hace vibrar el mueble, esa mala vibración entra a la música. Nuestra base de 8 kilos de MDF alta densidad enchapada en madera mata las vibraciones del suelo.' },
                            { t: 'Actualización Analógico/Digital Libre', a: 'Transmite ese sonido vintage y crepitante maravillosamente imperfecto a parlantes mediante cable RCA puro de cobre, O encienda el módulo Bluetooth AptX si desea escuchar sus vinilos desde un auricular inalámbrico en la terraza.' }
                        ].map((ac, i) => (
                            <div key={i} className="border-b border-amber-900/30 group">
                                <button className="w-full py-8 text-left flex justify-between items-center text-amber-100/80 hover:text-amber-400 transition-colors" onClick={() => setFaqOpen(faqOpen===i?null:i)}>
                                    <span className="text-lg font-light tracking-wide">{ac.t}</span>
                                    <span className="text-amber-700 font-sans text-xl">{faqOpen===i?'−':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {faqOpen === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="pb-8 text-neutral-400 font-sans font-light text-sm leading-loose">
                                            {ac.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 6. ENDLESS MARQUEE (Sleek Bronze) */}
                <div className="w-[100vw] overflow-hidden py-12 bg-[#12100e] border-y border-amber-900/10 flex transform relative left-[50%] -translate-x-[50%]">
                    <div className="flex whitespace-nowrap font-light text-3xl text-amber-900/30 uppercase tracking-[0.3em]">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="flex items-center gap-16 px-8 select-none">
                                <span>FRECUENCIA PURA</span>
                                <span><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg></span>
                                <span>ESCAPE DIGITAL</span>
                                <span><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M12 2v20M2 12h20"/></svg></span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 7. WHY TO USE / BENEFITS */}
                <div className="max-w-6xl mx-auto px-6 py-24 lg:py-40">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                        <div className="order-2 lg:order-1 relative">
                            <div className="bg-[#1f1a18] p-10 border border-amber-900/20 rounded-t-full pt-32 text-center shadow-[-20px_20px_0_rgba(217,119,6,0.05)]">
                                <div className="absolute top-10 left-1/2 -translate-x-1/2 w-32 h-32 border border-dashed border-amber-700/30 rounded-full flex items-center justify-center animate-[spin_20s_linear_infinite]">
                                    <div className="w-4 h-4 bg-amber-600 rounded-full"></div>
                                </div>
                                <h3 className="text-2xl font-light text-amber-50 mb-6">Detente a Escuchar.</h3>
                                <p className="text-neutral-500 font-sans font-light text-sm leading-relaxed mb-6">Elige el disco de tu biblioteca. Extráelo cuidadosamente de la funda de papel antiestático. Bájale la aguja lentamente. La música vuelve a ser un evento deliberado que experimentas prestando atención, no ruido de fondo aleatorio.</p>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2">
                            <h2 className="text-4xl lg:text-5xl font-light text-amber-100 mb-8 tracking-tight leading-tight">Música que ocupa <br/><span className="italic text-amber-600 font-serif">espacio físico.</span></h2>
                            <p className="text-neutral-400 font-sans font-light mb-12 text-lg leading-relaxed">Conéctate visceralmente con un álbum del inicio a su fin lógico visualizando su enorme portada de arte, mientras el plato sólido rotará sin titubear decodificando las estrías analógicas del surco.</p>
                            
                            <div className="space-y-8 font-sans">
                                {[
                                    { t: 'Cápsula MM de Origen', d: 'Con aguja de diamante elíptico incluida y preajustada desde nuestra central.' },
                                    { t: 'Interruptor de Velocidad Ciegos', d: 'Mando mecánico pulido para rotar entre discos LP de 33 1/3 y sencillos de 45 RPM.' },
                                    { t: 'Patas de Elastómero Amortiguado', d: 'Cuarteto regulable en altura para nivelar el tocadiscos a la perfección milimétrica.' }
                                ].map((b, i) => (
                                    <div key={i} className="flex gap-6 items-start border-b border-amber-900/10 pb-6 last:border-0">
                                        <div className="text-amber-700 font-light text-xl mt-1">{"0" + (i+1)}</div>
                                        <div>
                                            <h4 className="text-amber-100 font-medium uppercase tracking-widest text-[10px] mb-3">{b.t}</h4>
                                            <p className="text-neutral-500 font-light text-sm leading-relaxed">{b.d}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 10. COMPARISON TABLE */}
                <div className="max-w-4xl mx-auto px-6 py-24">
                    <div className="border border-amber-900/20 font-sans bg-[#1a1513]">
                        <div className="grid grid-cols-3 bg-[#120f0d] text-[10px] uppercase font-bold text-amber-700 tracking-[0.2em] border-b border-amber-900/20">
                            <div className="p-6">Fidelidad</div>
                            <div className="p-6 text-amber-100 border-x border-amber-900/20 text-center bg-amber-900/10">Tocadiscos Premium</div>
                            <div className="p-6 text-center">Tocadiscos Valija de Plástico</div>
                        </div>
                        {[
                            { k: 'Desgaste del Disco', u: 'Contrapeso regulado. Cuida tus vinilos', t: 'Aguja pesada, destruye el disco en 10 pasadas' },
                            { k: 'Materiales base', u: 'MDF 20mm + Plato de Aluminio 2kg', t: 'Valija de plástico hueco' },
                            { k: 'Rango de Frecuencias', u: 'Separación estéreo amplia', t: 'Parlantitos integrados sin graves' },
                            { k: 'Logística Transaccional', u: 'Comodidad de abono contra-entrega (C.O.D.)', t: 'Tarjetas en línea y aduanas' }
                        ].map((r, i) => (
                            <div key={i} className="grid grid-cols-3 border-t border-amber-900/10 text-xs font-light">
                                <div className="p-6 text-neutral-500">{r.k}</div>
                                <div className="p-6 font-medium text-amber-200 bg-amber-900/5 border-x border-amber-900/20 text-center">{r.u}</div>
                                <div className="p-6 text-neutral-600 text-center line-through">{r.t}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 11. RISK REVERSAL WARRANTY */}
                <div className="max-w-4xl mx-auto px-6 py-24 text-center">
                    <div className="w-[1px] h-16 bg-amber-800/50 mx-auto mb-10"></div>
                    <h3 className="text-2xl text-amber-50 font-light tracking-wide mb-6">Cobro Físico, Respeto al Tratado.</h3>
                    <p className="text-neutral-400 font-sans font-light leading-relaxed max-w-2xl mx-auto text-sm">
                        La electrónica auditiva de precisión detesta los envíos agresivos y las transacciones fantasma. Procesando tus credenciales de C.O.D., cargaremos con cuidado extremo el tocadiscos a uno de nuestros transportes utilitarios. Arribaremos a su residencia, presentaremos la caja y usted transferirá los fondos tras verificar in-situ la posesión. La serenidad auditiva empieza con una compra sin tensiones.
                    </p>
                </div>

                {/* 13. FAQ */}
                <div className="bg-[#120f0d] py-32 border-t border-amber-900/20">
                    <div className="max-w-4xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <div className="text-xs font-sans uppercase tracking-[0.3em] text-amber-700 font-bold mb-4">Mesa de Ayuda Analógica</div>
                            <h2 className="text-3xl text-amber-50 font-light">Resolución de Discos</h2>
                        </div>
                        <div className="space-y-4 font-sans">
                            {[
                                {q: '¿Necesito un amplificador antiguo, o lo enchufo a mis parlantes actuales?', a: 'El tocadiscos viene con un preamplificador phono integrado activable por interruptor. Eso significa que puedes conectarlo directamente mediante el cable a CUALQUIER parlante moderno activo (como los de computadora de escritorio, torres o un Home Theater actual).'},
                                {q: 'Nunca instalé un tocadiscos de peso, ¿romperé la aguja al configurarlo?', a: 'Calibrar la fuerza de arrastre (tracking force) deslizando el peso de atrás toma 2 minutos. Si lo requieres, nuestro agente logístico, una vez concretado el pago en efectivo, te ofrecerá asistencia guiada de cortesía para dejarte el gramaje perfecto antes de retirarse.'},
                                {q: '¿Cómo funciona solicitar sin tarjeta vía C.O.D.?', a: 'Completa la orden abajo reservando la unidad a tu nombre. Ningún costo por hacerlo. Nuestro departamento organizativo se contacta a tu celular, valida que no seas un bot y enruta la entrega para despacharla. Entregamos y tú pagas presencial.'}
                            ].map((f, i) => (
                                <div key={i} className="border border-amber-900/30 bg-[#171311] px-6 py-2">
                                    <button onClick={() => setFaqOpen(faqOpen===i?null:i)} className="w-full py-6 text-left flex justify-between items-center text-amber-100/90 font-medium transition-colors text-sm">
                                        {f.q}
                                        <span className="text-amber-700 text-xl font-light">{faqOpen===i?'−':'+'}</span>
                                    </button>
                                    <AnimatePresence>
                                        {faqOpen === i && (
                                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="pb-8 text-neutral-500 font-light text-sm leading-relaxed border-t border-amber-900/20 pt-6">
                                                {f.a}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 14. EXPANDED REVIEWS */}
                <div className="py-24 border-b border-amber-900/20">
                    <div className="max-w-6xl mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            {[
                                { r: "Tiraron a la basura esos tocadiscos de maletín de plástico que me arruinaban los vinilos. La pesadez del plato metálico y la madera es hermosa. Una joya para el salón. Lo trajeron y lo pagué en efectivo impecable.", n: "Sr. Horacio R.", t: "Coleccionista 70s" },
                                { r: "El sonido sale sumamente orgánico y la opción de que tire bluetooth a mi parlante Bose es genial cuando no quiero enredar cables. El cadete que trajo el paquete súper amble y esperó mi transferencia.", n: "María Inés T.", t: "Música Cuerdas" },
                                { r: "Estética retro minimalista divina para mí dpto, no desentona con los muebles. Entregaron todo el mismo día. La compra más serena que he hecho por web en años. Ni puse tarjeta de crédito.", n: "Guillermo P.", t: "Audiófilo Amateur" }
                            ].map((rev, i) => (
                                <div key={i} className="flex flex-col relative px-8 py-10 bg-[#1f1a18]/50 border-t border-amber-600/30">
                                    <div className="absolute top-[-15px] left-8 w-8 h-8 rounded-full bg-[#171311] border border-amber-900/50 flex items-center justify-center">
                                        <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
                                    </div>
                                    <p className="text-neutral-400 font-serif font-light text-base mb-8 leading-relaxed italic">"{rev.r}"</p>
                                    <div className="mt-auto pt-6 border-t border-amber-900/20">
                                        <div className="text-amber-100 font-sans font-medium uppercase tracking-[0.2em] text-[10px] mb-1">{rev.n}</div>
                                        <div className="text-amber-700 font-sans text-[9px] uppercase tracking-wider">{rev.t}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 15. CHECKOUT (Audiophile Form) */}
                <div id="checkout-vintage" className="py-32 relative bg-[#120f0d]">
                    <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
                        <div className="order-2 lg:order-1 bg-[#171311] p-10 lg:p-14 border border-amber-900/30 relative">
                            {/* Record styling decoration */}
                            <div className="absolute -top-10 -right-10 w-40 h-40 border-8 border-[#1a1715] rounded-full z-0 flex items-center justify-center">
                                <div className="w-16 h-16 border-4 border-[#1a1715] rounded-full"></div>
                            </div>
                            
                            <div className="relative z-10">
                                <div className="mb-10">
                                    <h3 className="text-2xl font-light text-amber-50 mb-3 font-serif">Petición de Unidad de Giro</h3>
                                    <div className="text-[10px] font-sans text-amber-600 uppercase tracking-widest font-bold">Gestión de Carga (C.O.D)</div>
                                </div>
                                
                                <form className="space-y-6 font-sans" onSubmit={(e) => e.preventDefault()}>
                                    <div>
                                        <label className="text-neutral-500 uppercase text-[9px] font-bold tracking-widest pl-1 block mb-2">A Nombre De</label>
                                        <input type="text" className="w-full bg-[#0d0a09] border border-amber-900/40 text-amber-100 font-light text-sm p-4 focus:border-amber-600 outline-none transition-colors tracking-wide" placeholder="" />
                                    </div>
                                    <div>
                                        <label className="text-neutral-500 uppercase text-[9px] font-bold tracking-widest pl-1 block mb-2">Canal Móvil de Contacto (WSP)</label>
                                        <input type="tel" className="w-full bg-[#0d0a09] border border-amber-900/40 text-amber-100 font-light text-sm p-4 focus:border-amber-600 outline-none transition-colors tracking-wide" placeholder="" />
                                    </div>
                                    <div>
                                        <label className="text-neutral-500 uppercase text-[9px] font-bold tracking-widest pl-1 block mb-2">Dirección del Salón Domicilio</label>
                                        <textarea rows={2} className="w-full bg-[#0d0a09] border border-amber-900/40 text-amber-100 font-light text-sm p-4 focus:border-amber-600 outline-none transition-colors tracking-wide resize-none" placeholder=""></textarea>
                                    </div>
                                    <div className="pt-6">
                                        <button className="w-full bg-amber-600 text-[#171311] py-5 font-bold uppercase tracking-[0.2em] text-xs hover:bg-amber-500 transition-colors shadow-[0_0_20px_rgba(217,119,6,0.1)]">
                                            Autorizar Viaje Estéreo / Pagar en Casa
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="order-1 lg:order-2">
                            <h2 className="text-4xl lg:text-5xl font-light text-amber-100 mb-8 tracking-tighter leading-tight">Preserva el Sonido <br/>de una <br/><span className="text-amber-600 italic font-serif">era elegante.</span></h2>
                            <p className="text-neutral-400 font-sans font-light mb-12 text-sm leading-relaxed mx-auto lg:mx-0 max-w-sm">Díle a nuestra base qué locación requieres la instalación de la caja. El cadete fleteará el tocadiscos, tú verificarás el precioso mueble de nogal en su envoltorio y aportarás el capital localmente, cero stress con tu banco digital.</p>
                            
                            <div className="text-3xl font-light text-amber-50 border-t border-amber-900/40 pt-6 mx-auto lg:mx-0 font-sans tracking-tight">{fmtPrice(product.price)}</div>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
};

export default PdpVintageTurntable;
