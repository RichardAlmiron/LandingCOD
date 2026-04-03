'use client';
import React, { useState } from 'react';
import { StoreData, Product } from '@/lib/types';
import EnhancedProductGallery from '@/components/pdp/EnhancedProductGallery';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { data: StoreData; product: Product; }

const PdpEInkFolio: React.FC<Props> = ({ data, product }) => {
    const [faqOpen, setFaqOpen] = useState<number | null>(null);
    const ai = product.aiContent;
    const fmtPrice = (n: number) => { const s = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); return `Gs. ${s}`; };

    // Estética "Paper White Minimal": Super fondos blancos cálidos (tipo papel), texto gris oscuro (e-ink), acentos muy sutiles negros, tipografía clásica combinada con sans muy finificada.
    const bg = '#f8f9fa'; // Matte paper white
    const textMain = '#2c3e50'; // Deep dark e-ink grey
    const accent = '#1a1a1a'; // True black for active states

    return (
        <div style={{ background: bg, color: textMain }} className="font-serif antialiased overflow-x-hidden selection:bg-zinc-200 selection:text-zinc-900">
            
            {/* Paper Texture Ambient */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/rice-paper-2.png')] opacity-30 mix-blend-multiply"></div>
            </div>

            {/* 1. TOP NAV (Minimalist Reader Header) */}
            <header className="sticky top-0 z-50 bg-[#f8f9fa]/80 backdrop-blur-md border-b-2 border-zinc-200">
                <div className="max-w-4xl mx-auto px-6 py-5 flex items-center justify-between">
                    <div className="text-xl font-bold tracking-widest text-[#1a1a1a] uppercase text-center w-full relative">
                        <span className="font-sans font-light tracking-[0.3em]">CÓDICE</span><span className="font-serif italic font-bold">DIGITAL</span>
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[9px] font-sans font-bold bg-[#1a1a1a] text-white px-3 py-1 uppercase tracking-widest">
                            Venta Directa
                        </div>
                    </div>
                </div>
            </header>

            <main className="relative z-10 w-full overflow-hidden">
                {/* 2. BREADCRUMBS & LOGISTICS */}
                <div className="max-w-4xl mx-auto px-6 pt-12 pb-6 border-b border-zinc-300">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 font-sans">
                        <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-zinc-500">
                            Dispositivos {'>'} Foco y Lectura {'>'} <span className="text-[#1a1a1a]">Tinta Electrónica (E-Ink)</span>
                        </div>
                        <div className="text-[9px] uppercase tracking-widest text-zinc-600 font-bold flex items-center gap-2">
                            <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                            Logística de Pago Contra-Entrega Activa
                        </div>
                    </div>
                </div>

                {/* 3. HERO (THE DISTRACTION FREE ZONE) */}
                <div className="max-w-4xl mx-auto px-6 py-20 lg:py-32">
                    <div className="text-center">
                        <div className="inline-block border-b border-zinc-400 pb-1 font-sans text-[10px] uppercase font-bold tracking-[0.2em] text-zinc-400 mb-8">
                            Herramienta de Pensamiento Puro
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-bold text-[#1a1a1a] mb-8 leading-[1.1] tracking-tight">
                            {ai?.enhancedTitle || product.title}
                        </h1>
                        <p className="text-lg text-zinc-600 mb-16 leading-relaxed max-w-2xl mx-auto font-light">
                            {ai?.enhancedDescription || product.description || 'Siente la rugosidad del papel sin talar árboles. Toma notas, lee y diagrama con una batería que dura semanas en un panel que no daña tus retinas con luz azul.'}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
                        <div className="md:col-span-7 bg-white p-6 shadow-[0_30px_60px_rgba(0,0,0,0.05)] border border-zinc-200">
                            <EnhancedProductGallery product={product} accentColor={accent} />
                        </div>
                        <div className="md:col-span-5 pb-6">
                            <div className="bg-zinc-50 border-2 border-zinc-200 p-8 font-sans">
                                <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-4">Adquisición Única</div>
                                <div className="flex items-end gap-4 mb-8">
                                    <span className="text-4xl text-[#1a1a1a] font-light tracking-tighter">{fmtPrice(product.price)}</span>
                                    {product.originalPrice && <span className="text-xs text-zinc-400 line-through pb-1 font-medium">{fmtPrice(product.originalPrice)}</span>}
                                </div>
                                <button onClick={() => document.getElementById('checkout-folio')?.scrollIntoView({ behavior: 'smooth' })} className="w-full bg-[#1a1a1a] hover:bg-black text-white py-4 font-bold uppercase tracking-[0.2em] text-[10px] transition-colors">
                                    Solicitar Flete de Entrega
                                </button>
                                <p className="text-[10px] text-center text-zinc-500 mt-4 uppercase tracking-widest font-bold">
                                    Pago estricto al operador físico.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. TRUST BADGES TECHNICAL (E-Ink Specs) */}
                <div className="border-y border-zinc-200 bg-white">
                    <div className="max-w-4xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center font-sans">
                        {[
                            {v: '300 ppi', l: 'Densidad Retina E-Ink'},
                            {v: '14 Días', l: 'Autonomía de Batería'},
                            {v: '18 ms', l: 'Latencia de Lápiz'},
                            {v: 'Off-Grid', l: 'Cero Redes Sociales'}
                        ].map((b, i) => (
                            <div key={i} className="flex flex-col items-center">
                                <span className="text-2xl font-light text-[#1a1a1a] mb-2">{b.v}</span>
                                <span className="text-[9px] text-zinc-400 uppercase tracking-widest font-bold">{b.l}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 5. EXPERT ACCORDIONS (The Silence of Paper) */}
                <div className="max-w-3xl mx-auto px-6 py-32">
                    <div className="text-center mb-16">
                        <div className="w-12 h-1 bg-[#1a1a1a] mx-auto mb-8"></div>
                        <h2 className="text-3xl lg:text-4xl font-bold text-[#1a1a1a] leading-tight mb-4 tracking-tight">Recupera tu capacidad <br/><span className="text-zinc-500 italic font-light">de concentrarte.</span></h2>
                    </div>
                    
                    <div className="space-y-0 border-t border-zinc-300 font-sans">
                        {[
                            { t: 'Panel de Tinta Electrónica Carta 1200', a: 'No hay retroiluminación LED agresiva disparando fotones a tus ojos. Son microcápsulas físicas blancas y negras que suben y bajan magnéticamente a la superficie del cristal. Lo que ves no es luz, es material sólido; exacto a la tinta sobre hoja de un libro de 1900.' },
                            { t: 'Fricción Sonora con Stylus', a: 'Inyectamos micro-textura en la lámina superior protectora del cristal. Al pasar el lápiz inteligente sin baterías, ambos materiales rozan generando el "rasgueo" auditivo de un lápiz HB sobre papel bond. Magia para el flujo de escritura.' },
                            { t: 'Total Silencio de Silicio', a: 'Un iPad te tienta con notificaciones de correos y videos. Este folio no puede, y no quiere hacerlo. Está diseñado con la restricción como virtud (Feature): Es un pozo de concentración profunda donde sólo puedes leer documentos, anotar ideas y dibujar esquemas.' }
                        ].map((ac, i) => (
                            <div key={i} className="border-b border-zinc-200">
                                <button className="w-full py-8 text-left flex justify-between items-start md:items-center text-[#1a1a1a] hover:text-zinc-600 transition-colors" onClick={() => setFaqOpen(faqOpen===i?null:i)}>
                                    <span className="text-sm font-bold uppercase tracking-widest leading-relaxed pr-4">{ac.t}</span>
                                    <span className="text-zinc-400 font-light text-2xl shrink-0">{faqOpen===i?'−':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {faqOpen === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="pb-8 text-zinc-500 text-[13px] leading-relaxed font-serif">
                                            {ac.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 6. TYPOGRAPHIC DIVIDER */}
                <div className="w-[100vw] overflow-hidden py-16 flex transform relative left-[50%] -translate-x-[50%] bg-[#f8f9fa] border-y border-zinc-200">
                    <div className="flex whitespace-nowrap font-serif italic text-4xl text-zinc-300/50">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="flex items-center gap-16 px-8 select-none">
                                <span>Distraction Free Tool</span>
                                <span className="font-sans font-light">·</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 7. WHY TO USE / BENEFITS */}
                <div className="max-w-4xl mx-auto px-6 py-32 border-b border-zinc-300">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-stretch">
                        <div className="flex flex-col">
                            <h2 className="text-3xl font-bold text-[#1a1a1a] leading-snug mb-8 tracking-tight">El fin del <br/><span className="text-zinc-500 italic font-light">cansancio visual.</span></h2>
                            <p className="text-zinc-600 font-sans text-sm mb-12 leading-relaxed">Tras 8 horas de monitor en la computadora portátil, tu cerebro necesita vaciar, diseñar y aprender consumiendo largos PDFs de texto. Tus ojos no soportan otra pantalla brillante.</p>
                            
                            <ul className="space-y-8 flex-1 font-sans">
                                {[
                                    { t: 'Conversión Escrita Mágica (OCR)', d: 'Escribe a mano cursiva y sucia durante tu reunión. Con tocar un margen, la libreta leerá tus trazos y los convertirá instantáneamente a texto digital de computadora copiable y pasteable. Mándalo limpio por email al salir de la sala.' },
                                    { t: 'Librería Ilimitada, Grosor Cero', d: 'Puedes guardar la bibliografía entera de la carrera de medicina en un objeto de aluminio inmaculado y ligero que mide 4.7 milímetros de espesor (más fino que un bolígrafo).' }
                                ].map((b, i) => (
                                    <li key={i} className="flex flex-col">
                                        <div className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold mb-2">Pilar 0{i+1}</div>
                                        <h4 className="text-[#1a1a1a] font-bold uppercase tracking-widest text-[11px] mb-2">{b.t}</h4>
                                        <p className="text-zinc-500 font-serif text-[13px] leading-relaxed">{b.d}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="relative">
                            <div className="h-full border border-zinc-300 bg-white p-12 flex flex-col justify-center shadow-sm relative overflow-hidden">
                                <div className="absolute top-0 right-8 w-px h-16 bg-zinc-300"></div>
                                {/* E-ink screen abstraction */}
                                <div className="font-serif italic text-2xl lg:text-3xl text-zinc-800 leading-relaxed tracking-tight">
                                    "La simplicidad no es meramente la ausencia de desorden. Es la creación de la tranquilidad visual."
                                </div>
                                <div className="mt-8 pt-8 border-t border-zinc-300 font-sans text-[10px] uppercase text-zinc-400 font-bold tracking-[0.2em]">
                                    Modo Lectura Profunda
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 10. COMPARISON TABLE */}
                <div className="max-w-4xl mx-auto px-6 py-24">
                    <h2 className="text-center text-zinc-400 font-sans uppercase font-bold text-[9px] tracking-[0.3em] mb-12">Tabla Tecnológica</h2>
                    <div className="border border-zinc-300 bg-white font-sans">
                        <div className="grid grid-cols-3 bg-zinc-50 text-[10px] uppercase font-bold text-[#1a1a1a] tracking-[0.2em] border-b border-zinc-300">
                            <div className="p-6 md:p-8 border-r border-zinc-300 text-center">Foco</div>
                            <div className="p-6 md:p-8 border-r border-zinc-300 text-center bg-zinc-100">Folio E-Ink Natural</div>
                            <div className="p-6 md:p-8 text-center text-zinc-500">Tablets Comerciales</div>
                        </div>
                        {[
                            { k: 'Material Emisor', u: 'Tinta física pasiva (Refleja luz)', t: 'Bombillas LED quema-retinas' },
                            { k: 'Ecosistema Aplicaciones', u: 'Ninguna distracción. Leer y escribir', t: 'Notificaciones invasivas constantes' },
                            { k: 'Modalidad de Pago', u: 'Contado al recibir el objeto en caja', t: 'Tarjeta pre-cargada con miedo a roturas' }
                        ].map((r, i) => (
                            <div key={i} className="grid grid-cols-3 border-t border-zinc-200 text-xs">
                                <div className="p-6 md:p-8 border-r border-zinc-200 text-zinc-500 font-medium flex items-center justify-center text-center">{r.k}</div>
                                <div className="p-6 md:p-8 font-bold text-[#1a1a1a] bg-zinc-50 border-r border-zinc-200 text-center flex items-center justify-center">{r.u}</div>
                                <div className="p-6 md:p-8 text-zinc-400 text-center line-through font-light flex items-center justify-center">{r.t}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 11. RISK REVERSAL WARRANTY */}
                <div className="py-24 font-sans text-center px-6">
                    <div className="max-w-2xl mx-auto">
                        <div className="w-8 h-8 rounded-full border border-black flex items-center justify-center mx-auto mb-6 text-black">✓</div>
                        <h3 className="text-xl text-[#1a1a1a] font-bold uppercase tracking-widest mb-6">Trato C.O.D Cerrado (Offline).</h3>
                        <p className="text-zinc-500 text-sm leading-relaxed mx-auto font-serif italic text-lg">
                            Te enviamos una joya ultra-delgada y delicada. No permitimos que correos ordinarios la maltraten y no te obligamos a pagar por sistemas de dudoso reembolso si la pantalla llega dañada. Haces el pedido abajo de modo directo, transportamos la unidad a tu zona en mano, validas abriendo su folio y liquidas el pago total y sin intermediarios con el propio conductor comercial. Paz profunda.
                        </p>
                    </div>
                </div>

                {/* 13. FAQ */}
                <div className="max-w-3xl mx-auto px-6 py-24 border-t border-zinc-300 font-sans">
                    <div className="space-y-0">
                        {[
                            {q: '¿Puede correr vídeos o buscar cosas en internet libre?', a: 'No. Ese es su mayor atractivo. Posee conexión WiFi para sincronizar tus notas (PDFs / EPUBs) con tu teléfono u ordenador como nubes automáticas, pero la pantalla no está pensada para ver películas ni correr animaciones.'},
                            {q: 'Se me hace pesado y antinatural un lápiz de plástico ¿Es cómodo?', a: 'Es liviano porque carece de batería el mismo lápiz electromagnético. Y gracias a que el procesador es rápido, la línea digital que la tinta traza abajo sigue a milímetros a la punta real sin el desagradable "lag" asqueroso de tabletas baratas.'},
                            {q: 'No confío en comprar con tarjeta, ¿el Pago C.O.D (entrega en mano) suma costo extra?', a: 'En absoluto. Rellenas y coordinas el lugar en el panel inferior sin poner un centavo. Cuando llega la flota a tu locación y te cede el instrumento hermético, traspasas el efectivo. El monto fijado arriba no muta ni padece letra chica.'}
                        ].map((f, i) => (
                            <div key={i} className="border-b border-zinc-200 bg-white">
                                <button onClick={() => setFaqOpen(faqOpen===i?null:i)} className="w-full p-8 text-left flex justify-between items-start text-[#1a1a1a] font-bold text-[11px] uppercase tracking-widest transition-colors hover:bg-zinc-50">
                                    <span className="pr-8 leading-relaxed">{f.q}</span>
                                    <span className="text-zinc-400 font-light text-2xl shrink-0 leading-none">{faqOpen===i?'−':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {faqOpen === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-8 pb-8 text-zinc-500 font-serif text-[13px] leading-relaxed bg-zinc-50 border-t border-zinc-100 pt-6">
                                            {f.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 14. EXPANDED REVIEWS */}
                <div className="py-24 bg-white border-y border-zinc-200">
                    <div className="max-w-5xl mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 font-serif">
                            {[
                                { r: "Desde que uso esto para transcribir ideas, mi sueño mejoró abismalmente frente a leer cosas en el iPad que usaba antes antes de acostarme. Pago contra entrega fue comodísimo.", n: "Carolina V.", t: "Escritora de Contenido" },
                                { r: "Es finísimo y asusta tocarlo fuerte de lo lindo que es, pero es de aluminio sólido. Firmé el recibo y pagué billete sobre billete al hombre de reparto. Seguro.", n: "Esteban R.", t: "Consultor Financiero" },
                                { r: "El sonido al escribir es adictivo, sigo preguntándome de dónde viene, es como raspar papel real en un anotador Moleskine. Ahorraremos un montón de cuadernos por fin.", n: "Valeria M.", t: "Arquitecta Independiente" }
                            ].map((rev, i) => (
                                <div key={i} className="flex flex-col relative text-center">
                                    <p className="text-zinc-600 font-light text-sm mb-6 leading-relaxed italic">"{rev.r}"</p>
                                    <div className="mt-auto font-sans">
                                        <div className="text-[#1a1a1a] font-bold text-[10px] uppercase tracking-[0.2em]">{rev.n}</div>
                                        <div className="text-zinc-400 uppercase text-[9px] font-bold mt-1 tracking-widest">{rev.t}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 15. CHECKOUT (Classic Form) */}
                <div id="checkout-folio" className="py-32 relative bg-[#f8f9fa] border-t-8 border-white">
                    <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1 bg-white p-10 lg:p-14 border border-zinc-300 shadow-xl font-sans">
                            <div className="text-center mb-10 border-b border-zinc-200 pb-6">
                                <h3 className="text-xl font-bold text-[#1a1a1a] mb-2 uppercase tracking-[0.2em]">Registro Adquisidor</h3>
                                <div className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest mt-2 block">Acuerdo de C.O.D. Físico Local</div>
                            </div>
                            
                            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                                <div>
                                    <label className="text-[9px] text-[#1a1a1a] uppercase tracking-widest font-bold mb-2 block">Nombre Legible del Receptor</label>
                                    <input type="text" className="w-full bg-zinc-50 border border-zinc-300 focus:border-[#1a1a1a] focus:bg-white text-[#1a1a1a] font-bold text-sm p-4 outline-none transition-colors placeholder:text-zinc-400 placeholder:font-light" placeholder="Apellidos..." />
                                </div>
                                <div>
                                    <label className="text-[9px] text-[#1a1a1a] uppercase tracking-widest font-bold mb-2 block">Numeral Activo de Comunicación</label>
                                    <input type="tel" className="w-full bg-zinc-50 border border-zinc-300 focus:border-[#1a1a1a] focus:bg-white text-[#1a1a1a] font-bold text-sm p-4 outline-none transition-colors placeholder:text-zinc-400 placeholder:font-light" placeholder="Línea Celular..." />
                                </div>
                                <div>
                                    <label className="text-[9px] text-[#1a1a1a] uppercase tracking-widest font-bold mb-2 block">Punto Exacto de Entrega (Domicilio)</label>
                                    <textarea rows={2} className="w-full bg-zinc-50 border border-zinc-300 focus:border-[#1a1a1a] focus:bg-white text-[#1a1a1a] font-bold text-sm p-4 outline-none transition-colors resize-none placeholder:text-zinc-400 placeholder:font-light" placeholder="Locación para despachar..."></textarea>
                                </div>
                                <div className="pt-2">
                                    <button className="w-full bg-[#1a1a1a] hover:bg-black text-white py-5 font-bold uppercase tracking-[0.3em] text-[10px] transition-colors shadow-md">
                                        Proceder Inmediatamente
                                    </button>
                                    <div className="text-[9px] text-center text-zinc-500 mt-4 uppercase tracking-[0.2em] font-bold">
                                        Liquidación Presupuestal al Transporte
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="order-1 lg:order-2 text-center lg:text-left">
                            <h2 className="text-4xl lg:text-5xl font-bold text-[#1a1a1a] leading-tight mb-6 tracking-tight">Tu intelecto <br/><span className="text-zinc-500 italic font-light font-serif">A otro ritmo.</span></h2>
                            <p className="text-zinc-600 font-serif text-lg mb-10 leading-relaxed max-w-sm mx-auto lg:mx-0">Retoma el tiempo que perdiste cambiando al papel del siglo XXI. Sin fricciones tecnológicas asimétricas: colocas tus pautas logísticas a continuación y lo enviaremos gratuitamente para que nos abones directamente ahí mismo al confirmar su estado impecable.</p>
                            
                            <div className="text-4xl lg:text-5xl font-bold text-[#1a1a1a] tracking-tighter border-l-4 border-zinc-200 pl-6 py-2 mx-auto lg:mx-0 w-max bg-zinc-50">{fmtPrice(product.price)}</div>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
};

export default PdpEInkFolio;
