'use client';
import React, { useState } from 'react';
import { StoreData, Product } from '@/lib/types';
import EnhancedProductGallery from '@/components/pdp/EnhancedProductGallery';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { data: StoreData; product: Product; }

const PdpCinemaOLED: React.FC<Props> = ({ data, product }) => {
    const [faqOpen, setFaqOpen] = useState<number | null>(null);
    const ai = product.aiContent;
    const fmtPrice = (n: number) => { const s = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); return `Gs. ${s}`; };

    // Estética "Absolute Zero Black": Negro puro OLED, espectro RGB vívido en el borde y text ultra delgado cinemático.
    const bg = '#000000'; // Pure OLED Black
    const textMain = '#a1a1aa'; // Zinc 400
    const accent = '#8b5cf6'; // Vivid Violet/Purple (Spectral glow)

    return (
        <div style={{ background: bg, color: textMain }} className="font-sans antialiased overflow-x-hidden selection:bg-purple-900 selection:text-white">
            
            {/* Spectral OLED Edge Ambient */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-purple-600/10 rounded-full blur-[120px] mix-blend-screen"></div>
                <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-blue-600/10 rounded-full blur-[150px] mix-blend-screen"></div>
            </div>

            {/* 1. TOP NAV (Cinematic Header) */}
            <header className="sticky top-0 z-50 bg-[#000000]/80 backdrop-blur-3xl border-b border-zinc-900/50">
                <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
                    <div className="text-xl font-light tracking-[0.3em] text-white uppercase flex items-center gap-3">
                        <span className="w-8 h-px bg-gradient-to-r from-transparent via-purple-500 to-blue-500 block"></span>
                        OLED<span className="font-medium text-zinc-500">MASTER</span>
                    </div>
                </div>
            </header>

            <main className="relative z-10 w-full overflow-hidden">
                {/* 2. BREADCRUMBS & LOGISTICS */}
                <div className="max-w-7xl mx-auto px-6 pt-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="text-[10px] uppercase font-light tracking-[0.3em] text-zinc-600">
                            Paneles {'>'} Ultra-HD Displays {'>'} <span className="text-zinc-300 font-medium tracking-widest">Tecnología Auto-Luminiscente</span>
                        </div>
                        <div className="text-[9px] uppercase font-bold tracking-[0.2em] text-[#000] bg-gradient-to-r from-purple-500 to-blue-500 px-3 py-1 rounded-[2px]">
                            Distribución Presencial C.O.D. Activa
                        </div>
                    </div>
                </div>

                {/* 3. HERO (INFINITE CONTRAST) */}
                <div className="max-w-7xl mx-auto px-6 py-20 lg:py-32">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                        <div className="lg:col-span-5 relative z-20">
                            <h1 className="text-5xl md:text-6xl font-light text-white mb-6 uppercase tracking-tighter leading-[1.1] drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                                {ai?.enhancedTitle || product.title}
                            </h1>
                            <p className="text-lg text-zinc-400 mb-12 font-light leading-relaxed">
                                {ai?.enhancedDescription || product.description || 'Píxeles auto-iluminados. Cuando el negro ocurre, el televisor literalmente se apaga. Descubre un contraste infinito y colores que el cine reservaba solo para directores.'}
                            </p>
                            
                            <div className="relative group border border-zinc-900 bg-[#020202] py-10 px-8 transition-colors duration-700 hover:border-purple-900/50">
                                {/* Spectral glowing border effect on hover */}
                                <div className="absolute inset-x-0 -bottom-[1px] h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                                <div className="absolute inset-x-0 -top-[1px] h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                                
                                <div className="text-xs font-light text-zinc-600 uppercase tracking-[0.3em] mb-4">Adquisición en Domicilio</div>
                                <div className="flex items-end gap-6 mb-10">
                                    <span className="text-4xl text-white font-light tracking-tight">{fmtPrice(product.price)}</span>
                                    {product.originalPrice && <span className="text-sm text-zinc-700 line-through pb-1">{fmtPrice(product.originalPrice)}</span>}
                                </div>
                                <button onClick={() => document.getElementById('checkout-oled')?.scrollIntoView({ behavior: 'smooth' })} className="w-full bg-white text-black py-4 font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-zinc-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                                    Coordinar Despacho Físico
                                </button>
                                <div className="text-[10px] text-center text-zinc-500 mt-6 tracking-widest font-light uppercase">
                                    Pague al recibidor sin tarjetas online.
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-7 w-full relative flex items-center justify-center p-4">
                            {/* The "Screen" glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-bl from-purple-600/20 via-blue-600/10 to-transparent blur-3xl rounded-3xl z-0"></div>
                            <div className="relative z-10 w-full p-2 border border-zinc-900/50 bg-[#000]">
                                <EnhancedProductGallery product={product} accentColor={accent} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. TRUST BADGES TECHNICAL (Specs panel) */}
                <div className="border-t border-zinc-900/50 bg-[#020202]">
                    <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-12 divide-x divide-zinc-900/50 text-center">
                        {[
                            {v: '8K HDR10+', l: 'Definición Hiperrealista'},
                            {v: '120 Hz', l: 'Frecuencia Nativa Gaming'},
                            {v: '0.1 ms', l: 'Respuesta de Píxel'},
                            {v: 'Dolby Vision', l: 'Colorimetría de Cine'}
                        ].map((b, i) => (
                            <div key={i} className="flex flex-col">
                                <span className="text-3xl font-light text-zinc-200 mb-2">{b.v}</span>
                                <span className="text-[9px] text-zinc-600 uppercase font-bold tracking-[0.2em]">{b.l}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 5. EXPERT ACCORDIONS (Behind the screen) */}
                <div className="max-w-4xl mx-auto px-6 py-32">
                    <div className="text-center mb-16 relative">
                        <span className="w-12 h-12 rounded-full border border-purple-500/30 flex items-center justify-center mx-auto mb-6">
                            <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_theme(colors.blue.500)]"></span>
                        </span>
                        <h2 className="text-3xl lg:text-4xl text-white font-light tracking-tight leading-tight">Ciencia y Magia Óptica.</h2>
                    </div>
                    
                    <div className="border-t border-zinc-900">
                        {[
                            { t: 'Color sobre Negro Absoluto', a: 'Los televisores LED convencionales tienen luces encendidas atrás siempre (backlight), filtrando feos grises en la oscuridad por bleeding o blooming de paneles. Este OLED apaga su electricidad individualmente por cada píxel para crear el color negro de un cuarto vacío. Infinito es el contraste resultante.' },
                            { t: 'Procesador Neural Alpha-AI', a: 'Sube de escala resoluciones pasadas. Toma un vídeo antiguo de Youtube en HD y usa aprendizaje profundo para reconstruir mentalmente los píxeles faltantes hasta que se vea en majestuoso 4K fluido en tiempo límite.' },
                            { t: 'Perfil Lámina de Cristal', a: 'Como no requiere bulbos abombados de iluminación detrás de la película de la imagen, el grosor total de la mitad superior del televisor es inferior al canto de tu teléfono móvil actual. Es literalmente arte pegado al muro.' }
                        ].map((ac, i) => (
                            <div key={i} className="border-b border-zinc-900 group">
                                <button className="w-full py-8 text-left flex justify-between items-center text-zinc-400 hover:text-white transition-colors" onClick={() => setFaqOpen(faqOpen===i?null:i)}>
                                    <span className="text-sm font-light uppercase tracking-widest">{ac.t}</span>
                                    <div className={`w-6 h-6 border border-zinc-800 rounded-full flex items-center justify-center text-zinc-500 transition-transform ${faqOpen===i?'rotate-180 bg-zinc-900':''}`}>V</div>
                                </button>
                                <AnimatePresence>
                                    {faqOpen === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="pb-8 text-zinc-500 font-light text-sm leading-relaxed">
                                            {ac.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 6. ENDLESS MARQUEE (Neon dark) */}
                <div className="w-[100vw] overflow-hidden py-10 bg-[#020202] border-y border-zinc-900/40 flex transform relative left-[50%] -translate-x-[50%]">
                    <div className="flex whitespace-nowrap font-light text-4xl text-zinc-800 uppercase tracking-tighter">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="flex items-center gap-16 px-8 select-none">
                                <span>ABSOLUTE ZERO BLACK</span>
                                <span className="text-zinc-900 font-serif opacity-30">■</span>
                                <span>INFINITE CONTRAST</span>
                                <span className="text-zinc-900 font-serif opacity-30">■</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 7. WHY TO USE / BENEFITS */}
                <div className="max-w-7xl mx-auto px-6 py-32 border-b border-zinc-900">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="order-2 lg:order-1 relative">
                            {/* Abstract Color Spectrum display */}
                            <div className="aspect-video bg-[#050505] border border-zinc-900 p-1 flex items-center justify-center relative overflow-hidden group">
                                <div className="absolute inset-0 bg-[conic-gradient(from_90deg_at_50%_50%,#000000_0%,#3b82f6_25%,#8b5cf6_50%,#ef4444_75%,#000000_100%)] opacity-20 group-hover:opacity-40 transition-opacity duration-1000 rotate-180 animate-[spin_20s_linear_infinite]"></div>
                                <div className="absolute inset-[2px] bg-[#000] z-10"></div>
                                <div className="relative z-20 text-center">
                                    <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.4em] mb-4">Gama de Color</div>
                                    <div className="text-2xl font-light text-zinc-300">100% DCI-P3</div>
                                    <p className="text-zinc-600 font-light text-xs mt-4 max-w-xs mx-auto">Colores exactamente como fueron rodados en estudios de Hollywood por la cámara maestra de redicción.</p>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2">
                            <h2 className="text-4xl lg:text-5xl font-light text-white leading-tight mb-8">El final del <br/><span className="text-zinc-600 italic">gris lavado nocturno.</span></h2>
                            <p className="text-zinc-400 font-light text-lg mb-12 leading-relaxed">No hay frustración mayor que visualizar una película del espacio y ver que el fondo estrellado se ve gris brillante con manchas por culpa de pantallas baratas. Transforma la experiencia y ríndete a la inmersión verídica.</p>
                            
                            <ul className="space-y-8">
                                {[
                                    { t: 'VRR (Variable Refresh Rate) para Gaming', d: 'Si conectas tu consola Next-Gen de tope de línea, el televisor empata sus hercios para borrar los cortes visuales violentos (tearing) entregando 120 fotogramas ininterrumpidos y fluidos.' },
                                    { t: 'Sonido Atmosférico Integrado', d: 'Con los altavoces de marco ultradelgado re-dirigiendo inteligencia acústica e imitando virtualmente un entorno acústico en formato vertical y direccional 5.1.2 superior.' }
                                ].map((b, i) => (
                                    <li key={i} className="flex gap-6">
                                        <div className="text-zinc-600 font-light text-xl">{"0" + (i+1)}</div>
                                        <div>
                                            <h4 className="text-zinc-200 font-medium uppercase tracking-[0.2em] text-[10px] mb-2">{b.t}</h4>
                                            <p className="text-zinc-500 font-light text-sm leading-relaxed">{b.d}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* 10. COMPARISON TABLE */}
                <div className="max-w-4xl mx-auto px-6 py-32">
                    <h2 className="text-center font-light uppercase tracking-[0.3em] text-zinc-300 mb-16 text-2xl">Línea Divisoria Visual</h2>
                    <div className="border border-zinc-900 bg-[#030303]">
                        <div className="grid grid-cols-3 bg-[#0a0a0a] text-[9px] uppercase font-bold text-zinc-600 tracking-widest border-b border-zinc-900">
                            <div className="p-6 md:p-8">Propiedad Técnica</div>
                            <div className="p-6 md:p-8 text-zinc-200 border-x border-zinc-900 text-center">Nuestro Panel OLED</div>
                            <div className="p-6 md:p-8 text-center">Smart TVs Básicos (LED/QLED)</div>
                        </div>
                        {[
                            { k: 'Estado del negro (Off)', u: 'PíXEL APAGADO. Oscuridad y contraste eterno.', t: 'Píxel grisáceo pálido sangrante' },
                            { k: 'Ángulo de Visión Múltiple', u: 'Perfecto desde extremos laterales (Vistas amplias)', t: 'Se lavan los colores al sentarse de lado' },
                            { k: 'Transacción Garantizada', u: 'Se paga cuando el operario deposita el paquete C.O.D.', t: 'Transfiere a ciegas, aduana o tarjeta robada' }
                        ].map((r, i) => (
                            <div key={i} className="grid grid-cols-3 border-t border-zinc-900 font-light text-xs mix-blend-screen shadow-inner">
                                <div className="p-6 md:p-8 text-zinc-500">{r.k}</div>
                                <div className="p-6 md:p-8 text-white font-medium bg-zinc-900/20 border-x border-zinc-900 text-center">{r.u}</div>
                                <div className="p-6 md:p-8 text-zinc-700 text-center line-through">{r.t}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 11. RISK REVERSAL WARRANTY */}
                <div className="py-32 bg-[#020202] border-t border-zinc-900/50 text-center px-6">
                    <div className="max-w-3xl mx-auto">
                        <div className="md:w-px md:h-20 bg-gradient-to-b from-purple-500/50 to-transparent mx-auto mb-8 hidden md:block"></div>
                        <h3 className="text-2xl text-zinc-200 font-light uppercase tracking-widest mb-6">Cerrojo Logístico Físico.</h3>
                        <p className="text-zinc-500 font-light text-sm leading-relaxed max-w-2xl mx-auto">
                            Comprar un televisor frágil y costoso usando pasarelas online es jugar ruleta rusa. Este panel ultra delgado no se maltratará con correos nacionales genéricos. Un vehículo comercial exclusivo C.O.D llevará el equipo envuelto meticulosamente directo a su living interior. El chofer aguardará y, tras corroborar marca y modelo frente a usted, cobrará en efectivo y materializará la venta sin miedo a extravíos.
                        </p>
                    </div>
                </div>

                {/* 13. FAQ */}
                <div className="max-w-3xl mx-auto px-6 py-24 border-b border-zinc-900/50">
                    <h2 className="text-center font-light uppercase tracking-[0.2em] text-zinc-600 font-bold mb-16 text-xs">Cuestionario Visual</h2>
                    <div className="space-y-2">
                        {[
                            {q: 'La tecnología OLED es famosa por quemar pantalla (Burn-in), ¿Es seguro este panel?', a: 'El Burn-in era un problema real hace 5 años. Nuestra panel goza de rutinas automatizadas de refresco de píxeles (Pixel Cleaning IA) ocultas mientras el televisor está inactivo; desplaza logos de canales sutilmente haciéndolo impermeable al quemado a largo plazo con un uso hogareño racional.'},
                            {q: '¿Se puede jugar con consolas a este OLED o es sólo para cines/películas?', a: 'Es el standard oro moderno (Gold Standard) para gamers debido al tiempo de respuesta orgánico instantáneo de 0.1ms; tu mando transmitirá tus reflejos sin los "fantasmas borrosos" (ghosting) de los visores LED normales.'},
                            {q: 'En un modelo de cobro contra-entrega (C.O.D.), ¿Hay costos extras o recargos ocultos extra?', a: 'Cero sorpresas. Tú solicitas abajo gratis con tus datos. Nosotros coordinamos el turno. Se lleva adonde estés, visualizas la caja integral sellada y depositas a nuestro agente logístico el mismo valor cerrado y listado de la promoción acá arriba expuesta.'}
                        ].map((f, i) => (
                            <div key={i} className="border-b border-zinc-900 group">
                                <button onClick={() => setFaqOpen(faqOpen===i?null:i)} className="w-full py-6 text-left flex justify-between items-center text-zinc-300 font-light hover:text-white transition-colors text-sm">
                                    {f.q}
                                    <span className="text-zinc-600 text-lg font-light">{faqOpen===i?'−':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {faqOpen === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="pb-6 text-zinc-500 font-light text-sm leading-relaxed">
                                            {f.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 14. EXPANDED REVIEWS */}
                <div className="py-24 bg-[#020202]">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            {[
                                { r: "Cuando vi Alien en esto, me asusté de verdad. Los negros son tan oscuros que la pantalla se pierde en el cuarto. Es espantoso el salto de calidad enorme. Recomendado 100% y excelente la movida de pagarle al flete de paso.", n: "Srta. Jimena D.", t: "Cinéfila C.O.D." },
                                { r: "Mis juegos de PS5 parecen totalmente diferentes. El HDR resalta como relámpagos cuando hay tiros porque el resto del mapa es negro puro. Pesa bajísimo y la instalé de una.", n: "Nicolás P.", t: "Ingeniero Backend" },
                                { r: "Sufro horrores metiendo tarjeta online de débito. Llené mis datos para reserva abajo, coordinamos fecha, pasaron, deslicé el efectivo presencial al chofer impecable y todo finalizado superando mis expectativas.", n: "Javier M.", t: "Residente Local" }
                            ].map((rev, i) => (
                                <div key={i} className="flex flex-col relative px-8 py-10 border border-zinc-900 bg-[#050505]">
                                    <div className="absolute top-0 right-8 w-[2px] h-8 bg-gradient-to-b from-blue-600/50 to-transparent"></div>
                                    <p className="text-zinc-400 font-light text-sm mb-10 leading-relaxed italic">"{rev.r}"</p>
                                    <div className="mt-auto border-t border-zinc-900/50 pt-6">
                                        <div className="text-zinc-200 font-bold uppercase tracking-widest text-[10px] mb-1">{rev.n}</div>
                                        <div className="text-zinc-600 font-sans text-[9px] uppercase tracking-widest">{rev.t}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 15. CHECKOUT (Cinema Ticketing Form) */}
                <div id="checkout-oled" className="py-32 relative bg-[#000]">
                    <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center relative z-10">
                        <div className="lg:col-span-6 order-2 lg:order-1 bg-[#020202] p-10 lg:p-14 border border-zinc-900 relative shadow-[0_0_80px_rgba(37,99,235,0.03)]">
                            {/* Blue/purple edge highlights */}
                            <div className="absolute top-0 left-0 w-32 h-[1px] bg-gradient-to-r from-purple-500 to-transparent opacity-50"></div>
                            <div className="absolute bottom-0 right-0 w-32 h-[1px] bg-gradient-to-l from-blue-500 to-transparent opacity-50"></div>
                            
                            <div className="mb-10 text-center">
                                <h3 className="text-xl font-light text-white mb-2 uppercase tracking-widest">Reserva de Panel Activo</h3>
                                <div className="text-[9px] font-sans text-zinc-600 uppercase tracking-[0.3em] font-bold">Orden de Entrega Externa</div>
                            </div>
                            
                            <form className="space-y-6 font-sans" onSubmit={(e) => e.preventDefault()}>
                                <div>
                                    <label className="text-zinc-500 uppercase text-[9px] font-bold tracking-[0.2em] block mb-2 text-center">Nombre Visualizador</label>
                                    <input type="text" className="w-full bg-[#050505] border border-zinc-900/80 text-white text-center text-sm p-4 focus:border-zinc-700 outline-none transition-colors uppercase tracking-widest" placeholder="..." />
                                </div>
                                <div>
                                    <label className="text-zinc-500 uppercase text-[9px] font-bold tracking-[0.2em] block mb-2 text-center">Nexo WhatsApp / Señal</label>
                                    <input type="tel" className="w-full bg-[#050505] border border-zinc-900/80 text-white text-center text-sm p-4 focus:border-zinc-700 outline-none transition-colors uppercase tracking-widest" placeholder="..." />
                                </div>
                                <div>
                                    <label className="text-zinc-500 uppercase text-[9px] font-bold tracking-[0.2em] block mb-2 text-center">Latitud y Referencias C.O.D.</label>
                                    <textarea rows={2} className="w-full bg-[#050505] border border-zinc-900/80 text-white text-center text-sm p-4 focus:border-zinc-700 outline-none transition-colors uppercase tracking-widest resize-none" placeholder="..."></textarea>
                                </div>
                                <div className="pt-6">
                                    <button className="w-full bg-white text-black py-5 border border-white font-bold uppercase tracking-[0.2em] text-xs hover:bg-transparent hover:text-white transition-colors duration-500">
                                        Proceder a Envío Físico Controlado
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className="lg:col-span-6 order-1 lg:order-2 text-center lg:text-left">
                            <h2 className="text-4xl lg:text-5xl font-light text-white mb-8 tracking-tighter leading-tight">Es el momento <br/>de ver de verdad.</h2>
                            <p className="text-zinc-400 font-sans font-light mb-12 text-sm leading-relaxed mx-auto lg:mx-0 max-w-sm">No pague absolutamente un solo recibo online ciego. Usted redacta las coordenadas a continuación, nosotros fletamos el televisor hiper delgado presencialmente hasta el punto, usted ratifica y ahí mismo paga su importe íntegro C.O.D en moneda sonante o por giro verificable. Seguro y aplastante.</p>
                            
                            <div className="text-3xl font-light text-zinc-300 tracking-tight">{fmtPrice(product.price)}</div>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
};

export default PdpCinemaOLED;
