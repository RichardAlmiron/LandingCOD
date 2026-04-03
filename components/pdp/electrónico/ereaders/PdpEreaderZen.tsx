'use client';
import React, { useState } from 'react';
import { StoreData, Product } from '@/lib/types';
import EnhancedProductGallery from '@/components/pdp/EnhancedProductGallery';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { data: StoreData; product: Product; }

const PdpEreaderZen: React.FC<Props> = ({ data, product }) => {
    const [openSpecAcc, setOpenSpecAcc] = useState<number | null>(0);
    const [faqOpen, setFaqOpen] = useState<number | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const ai = product.aiContent;
    const fmtPrice = (n: number) => { const s = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); return `Gs. ${s}`; };
    
    // Aesthetic Palette: Japanese E-Ink Minimalist
    const bg = '#f9f9f8'; // Off-white warm paper
    const textMain = '#111111'; // Pure dark charcoal ink
    const accent = '#64748b'; // Slate gray
    const borderDark = '#222222';

    return (
        <div style={{ background: bg, color: textMain, fontFamily: "'Inter', sans-serif" }} className="overflow-x-hidden selection:bg-[#111] selection:text-[#f9f9f8] antialiased">
            
            {/* 0. AMBIENT PAPER TEXTURE */}
            <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]" style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/rice-paper-2.png')` }}></div>

            {/* 1. TOP NAV */}
            <header className="sticky top-0 z-50 bg-[#f9f9f8]/95 backdrop-blur-sm border-b border-[#dddddd]">
                <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
                    <div className="font-serif text-2xl tracking-tighter text-[#111] font-medium italic">
                        KUU<span className="opacity-40">HAKU</span>
                    </div>
                    <nav className="hidden lg:flex gap-10">
                        {['Silencio', 'Tinta', 'Enfoque'].map((item) => (
                            <a key={item} href={`#${item.toLowerCase()}`} className="text-xs tracking-[0.2em] uppercase text-[#666] hover:text-[#111] transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-[#111] hover:after:w-full after:transition-all">
                                {item}
                            </a>
                        ))}
                    </nav>
                </div>
            </header>

            <main className="relative z-10">
                {/* 2. BREADCRUMBS & MICRO-LOGISTICS */}
                <div className="max-w-6xl mx-auto px-4 md:px-8 pt-8 pb-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-[9px] uppercase tracking-[0.1em] text-[#666]">
                        <div className="flex items-center gap-3">
                            <span>LITERATURA</span> <span className="opacity-30">/</span> <span>HARDWARE</span> <span className="opacity-30">/</span> <span className="text-[#111]">{product.title.substring(0, 15)}...</span>
                        </div>
                        <div className="inline-flex items-center gap-2 border border-[#ddd] bg-white px-4 py-2">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 22h20L12 2zm0 4.5L18.5 19H5.5L12 6.5z"/></svg>
                            Tránsito Cuidadoso a su Residencia
                        </div>
                    </div>
                </div>

                {/* 3. HERO (EDITORIAL) */}
                <div className="max-w-6xl mx-auto px-4 md:px-8 py-12 lg:py-20 border-b border-[#ddd]">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: 'easeOut' }} className="relative bg-white p-4 md:p-8 border border-[#eaeaea] shadow-sm">
                            <EnhancedProductGallery product={product} accentColor={borderDark} />
                            {/* Ink spot decoration */}
                            <div className="absolute top-4 -right-4 w-2 h-2 rounded-full bg-[#111]"></div>
                            <div className="absolute bottom-12 -left-2 w-1 h-1 rounded-full bg-[#111]"></div>
                        </motion.div>

                        <div className="flex flex-col relative">
                            {/* Rating */}
                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex text-[#111] gap-1">
                                    {[...Array(5)].map((_,i) => <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#111]"></div>)}
                                </div>
                                <span className="text-[10px] tracking-[0.2em] font-medium text-[#666] uppercase">Compostura Verificada</span>
                            </div>
                            
                            <h1 className="text-5xl md:text-7xl font-serif font-medium tracking-tight leading-[0.9] text-[#111] mb-8">
                                {ai?.enhancedTitle || product.title}
                            </h1>
                            <p className="text-base md:text-lg font-light text-[#444] mb-12 leading-relaxed max-w-md">
                                {ai?.enhancedDescription || product.description || 'Despídete del parpadeo luminoso. Tinta electrónica E-Ink Carta 1200 que imita la suavidad del papel prensado en frío. Ojos descansados, mentes profundas.'}
                            </p>

                            <div className="mb-10">
                                <div className="flex items-end gap-4 mb-8">
                                    <span className="text-4xl font-serif font-medium tracking-tighter text-[#111]">{fmtPrice(product.price)}</span>
                                    {product.originalPrice && <span className="text-sm text-[#888] line-through pb-1">{fmtPrice(product.originalPrice)}</span>}
                                </div>
                                <button onClick={() => document.getElementById('checkout-action')?.scrollIntoView({ behavior: 'smooth' })} className="w-full h-[60px] bg-[#111] text-[#f9f9f8] font-mono text-xs uppercase tracking-[0.3em] hover:bg-white hover:text-[#111] border border-[#111] transition-all duration-300">
                                    Adquirir Ejemplar
                                </button>
                            </div>

                            {/* 4. TRUST BADGES MINIMAL */}
                            <div className="grid grid-cols-3 gap-0 border-t border-b border-[#ddd] divide-x divide-[#ddd]">
                                {[
                                    {t: '300 ppi', d: 'Resolución Nitida'},
                                    {t: '8 Semanas', d: 'Autonomía Batería'},
                                    {t: 'Pago Físico', d: 'Contra Entrega'}
                                ].map((b, i) => (
                                    <div key={i} className="flex flex-col items-center justify-center p-4 text-center">
                                        <span className="text-xs font-serif italic text-[#111] mb-1">{b.t}</span>
                                        <span className="text-[9px] uppercase tracking-widest text-[#888]">{b.d}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 5. EXPANDABLE DETAILS ABOVE FOLD */}
                <div className="max-w-6xl mx-auto px-4 md:px-8 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
                        <div className="md:col-span-4">
                            <h2 className="text-2xl font-serif font-medium mb-4 text-[#111]">Anatomía del Silencio.</h2>
                            <p className="text-sm font-light text-[#666] leading-relaxed">No es una tablet. No emite notificaciones, no tiene redes sociales. Solo es un portal directo entre el autor y tú.</p>
                        </div>
                        <div className="md:col-span-8 border-t border-[#ddd]">
                            {[
                                { t: 'Iluminación Frontal Cálida', a: 'A diferencia de las pantallas LCD que disparan luz hacia tus ojos, este panel proyecta la luz sutilmente hacia la superficie de tinta. Lee a medianoche sin arruinar tu ciclo circadiano de melatonina.' },
                                { t: 'Grosor de Lomo de Periódico', a: 'Con apenas 6.8mm de profundidad y bordes asimétricos para balance de peso en una sola mano. Puedes leer recostado por horas sin que el brazo reclame.' },
                                { t: 'Adquisición Tangible', a: 'Sin pasarelas digitales complejas. Recibes la caja sellada en la dirección de confort elegida e intercambias el importe recién cuando el dispositivo está en tus manos.' }
                            ].map((ac, i) => (
                                <div key={i} className="border-b border-[#ddd] group">
                                    <button onClick={() => setOpenSpecAcc(openSpecAcc===i?null:i)} className="w-full text-left py-6 flex items-center justify-between text-xs font-mono uppercase tracking-[0.15em] text-[#111]">
                                        <span>{String(i+1).padStart(2, '0')}. {ac.t}</span>
                                        <span className="text-lg font-light text-[#888] group-hover:text-[#111] transition-colors">{openSpecAcc===i?'-':'+'}</span>
                                    </button>
                                    <AnimatePresence>
                                        {openSpecAcc === i && (
                                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="pb-8 text-sm font-light text-[#444] leading-relaxed pr-8">
                                                {ac.a}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 6. ENDLESS MARQUEE */}
                <div className="w-[100vw] overflow-hidden py-10 border-y border-[#111] bg-white relative left-[50%] -translate-x-[50%] flex transform -rotate-1">
                    <div className="flex whitespace-nowrap animate-marquee font-serif italic text-4xl text-[#111]">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="flex items-center gap-16 px-8">
                                <span>SIN DISTRACCIONES.</span><span className="w-2 h-2 rounded-full bg-[#111] block"></span>
                                <span>LETRAS TINTADAS.</span><span className="w-2 h-2 rounded-full bg-[#111] block"></span>
                                <span>RECUPERA TU ENFOQUE.</span><span className="w-2 h-2 rounded-full bg-[#111] block"></span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 7. WHY TO USE / BENEFITS */}
                <div id="silencio" className="max-w-6xl mx-auto px-4 md:px-8 py-24 border-b border-[#ddd]">
                    <div className="mb-20">
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#888] mb-4 block">Filosofía de Lectura</span>
                        <h2 className="text-4xl md:text-5xl font-serif text-[#111] font-medium tracking-tight">El iPad es ruido.<br/>Esto es un <span className="italic text-[#888]">santuario</span>.</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                        {[
                            { n: 'I', t: 'Legibilidad Solar', d: 'Llévalo a la playa. A diferencia del vidrio reflectivo brillante, la resina mate tratada de esta pantalla corta los reflejos. Cuanto más sol hay, mejor se lee la tinta.' },
                            { n: 'II', t: 'Espacio Abismal', d: 'Los libros físicos tienen un encanto innegable, pero no puedes llevar 3,000 en la mochila. Acumula la historia de la humanidad en tus manos con 32GB internos.' },
                            { n: 'III', t: 'Carga Estacional', d: 'No lo cargas cada día, ni siquiera cada semana. Úsalo dos meses sin acordarte dónde guardaste el cable USB-C. Tinta electrónica consume casi 0 energía al mantener la imagen estática.' }
                        ].map((b, i) => (
                            <div key={i} className="pb-8 group">
                                <div className="text-3xl font-serif text-[#ccc] mb-6 italic group-hover:text-[#111] transition-colors">{b.n}</div>
                                <h3 className="text-sm font-mono tracking-widest uppercase text-[#111] mb-6 relative inline-block">
                                    {b.t}
                                    <div className="absolute -bottom-2 left-0 w-0 h-[1px] bg-[#111] group-hover:w-full transition-all duration-500"></div>
                                </h3>
                                <p className="text-sm font-light text-[#555] leading-loose">{b.d}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 8. HOW TO USE (VISUAL GUIDE) */}
                <div id="enfoque" className="py-24 bg-[#eaeaea] border-t border-white">
                    <div className="max-w-6xl mx-auto px-4 md:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-3xl md:text-5xl font-serif font-medium text-[#111] mb-12">Ritual de <br/>Inmersión.</h2>
                                <div className="space-y-12">
                                    {[
                                        { t: 'Despeja', d: 'Agrega tus archivos ePub o PDFs. Deja el teléfono en otra habitación, cierra la puerta.' },
                                        { t: 'Modula', d: 'Ajusta la temperatura de la luz ámbar si estás en cama para indicarle a tu cerebro que es hora de dormir.' },
                                        { t: 'Desaparece', d: 'El dispositivo es tan ligero (170g) que en veinte minutos olvidarás que sostienes tecnología.' }
                                    ].map((s, i) => (
                                        <div key={i} className="flex gap-6">
                                            <div className="w-px bg-[#ccc] flex-shrink-0 relative mt-2">
                                                <div className="absolute top-0 -left-[2.5px] w-[6px] h-[6px] rounded-full bg-[#111]"></div>
                                            </div>
                                            <div className="pb-4">
                                                <h4 className="text-sm font-mono uppercase tracking-[0.15em] text-[#111] mb-3">{s.t}</h4>
                                                <p className="text-sm font-light text-[#666] leading-relaxed">{s.d}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="aspect-[4/5] bg-[#d5d5d5] p-2 relative">
                                <div className="w-full h-full bg-[#f9f9f8] flex items-center justify-center border border-[#ccc]">
                                    <span className="font-serif italic text-4xl text-[#bbb]">Focus.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 9. DEEP DIVE MULTIMEDIA */}
                <div className="py-32 relative text-center border-b border-[#ddd]">
                    <div className="max-w-4xl mx-auto px-4 md:px-8">
                        <div className="text-[10px] uppercase font-mono tracking-[0.3em] text-[#111] mb-6">Lectura Nocturna Optimizada</div>
                        <h2 className="text-5xl md:text-6xl font-serif font-medium text-[#111] mb-12 italic">Ámbar Profundo.</h2>
                        <div className="h-40 w-full bg-gradient-to-r from-[#f9f9f8] via-[#e2c199] to-[#f9f9f8] rounded-full opacity-30 blur-2xl absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none"></div>
                        <p className="text-base font-light text-[#444] leading-loose max-w-2xl mx-auto relative z-10">
                            La luz azul no solo daña la retina, también arruina tu sueño al imitar la luz del mediodía. Este visor ajusta dinámicamente sus LEDs frontales a un tono anaranjado cálido, como leer frente a una vela.
                        </p>
                    </div>
                </div>

                {/* 10. COMPARISON TABLE */}
                <div className="max-w-5xl mx-auto px-4 md:px-8 py-24">
                    <div className="flex flex-col items-center mb-16">
                        <h2 className="text-3xl font-serif text-[#111]">Tinta vs Pantalla.</h2>
                        <div className="w-12 h-px bg-[#111] mt-6"></div>
                    </div>
                    
                    <div className="bg-white border border-[#eaeaea] shadow-sm">
                        <div className="grid grid-cols-3 border-b border-[#ddd]">
                            <div className="p-6"></div>
                            <div className="p-6 text-center border-l border-[#ddd] bg-[#f9f9f8]">
                                <span className="font-serif italic text-lg text-[#111]">Tinta Electrónica</span>
                            </div>
                            <div className="p-6 text-center border-l border-[#ddd]">
                                <span className="font-serif italic text-lg text-[#999]">Tablets Comunes</span>
                            </div>
                        </div>
                        {[
                            { k: 'Fatiga Visual', u: 'Nula. Refleja luz ambiental.', t: 'Pesada (Luz directa al ojo)' },
                            { k: 'Visibilidad al Sol', u: 'Perfecta (Tinta real)', t: 'Un espejo oscuro inútil' },
                            { k: 'Tiempo de Batería', u: 'Semanas completas', t: 'Apenas 10 horas' },
                            { k: 'Notificaciones', u: 'Ninguna (Cero distracciones)', t: 'Bombardeo constante' }
                        ].map((r, i) => (
                            <div key={i} className="grid grid-cols-3 border-b border-[#eaeaea] last:border-b-0 hover:bg-[#fafafa] transition-colors">
                                <div className="p-6 text-xs font-mono uppercase tracking-widest text-[#555] flex items-center">{r.k}</div>
                                <div className="p-6 text-center border-l border-[#ddd] flex items-center justify-center bg-[#f9f9f8]/50">
                                    <span className="text-sm font-medium text-[#111]">{r.u}</span>
                                </div>
                                <div className="p-6 text-center border-l border-[#ddd] flex items-center justify-center">
                                    <span className="text-sm font-light text-[#aaa] line-through">{r.t}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 11. RISK REVERSAL WARRANTY */}
                <div className="max-w-5xl mx-auto px-4 md:px-8 py-16">
                    <div className="border border-[#111] p-10 md:p-16 relative bg-white">
                        <div className="absolute top-0 left-10 -translate-y-1/2 bg-[#f9f9f8] px-4">
                            <span className="text-3xl font-serif italic text-[#111]">Condición Clara.</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
                            <div className="md:col-span-3 text-center md:text-left">
                                <svg className="w-16 h-16 mx-auto md:mx-0 text-[#111] opacity-20" viewBox="0 0 24 24" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            </div>
                            <div className="md:col-span-9">
                                <p className="text-base font-light text-[#444] leading-relaxed">
                                    La transacción debe ser tan transparente como la hoja del dispositivo. Completa el formulario con tu dirección. **El mensajero llega a tu residencia**, tú abres la caja, verificas la carcasa y la pantalla fría, y recién en ese momento completas el pago en efectivo o transferencia. Estás cobijado por 12 meses de garantía de hardware.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 12. BRAND ETHOS */}
                <div className="py-24 bg-[#111] text-[#f9f9f8] text-center mt-12 relative overflow-hidden">
                    <div className="max-w-2xl mx-auto px-6 relative z-10">
                        <h3 className="text-3xl md:text-5xl font-serif font-light mb-8 italic">El lujo de desconectar.</h3>
                        <div className="w-8 h-px bg-[#444] mx-auto mb-8"></div>
                        <p className="text-sm font-light text-[#aaa] leading-loose tracking-wide">En un mundo ahogado en videos cortos y colores chillones por doquier, sentarse en silencio a leer tinta de alto contraste es el verdadero privilegio moderno. No vendemos tecnología, vendemos tu tiempo de vuelta.</p>
                    </div>
                </div>

                {/* 13. FAQ */}
                <div className="max-w-3xl mx-auto px-4 md:px-8 py-24">
                    <div className="mb-16">
                        <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-[#888] mb-4">Interrogantes</h2>
                    </div>
                    <div className="space-y-4">
                        {[
                            {q: '¿Puede reproducir audio o videos?', a: 'Absolutamente no. Es un monolito dedicado a la lectura de texto puro en formatos EPUB, MOBI, PDF, TXT. No hay navegador web usable ni YouTube.'},
                            {q: '¿Cómo cargo los libros?', a: 'Por USB-C arrastrando carpetas como un pendrive, o mediante email enviando los archivos directo a la dirección del dispositivo vía WiFi. Toma 3 segundos.'},
                            {q: '¿Qué es el pago contra entrega exacto?', a: 'Nuestra logística no retiene dinero online. Generas la orden abajo. Pasamos a dejar el equipo en tu domicilio indicado, y le abonas directamente al conductor.'}
                        ].map((f, i) => (
                            <div key={i} className="border-b border-[#ddd]">
                                <button onClick={() => setFaqOpen(faqOpen===i?null:i)} className="w-full text-left py-6 flex items-center justify-between text-sm font-medium font-serif text-[#111]">
                                    <span>{f.q}</span>
                                    <span className="text-[#888] font-light">{faqOpen===i?'-':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {faqOpen === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="pb-6 text-sm font-light text-[#666] leading-relaxed">
                                            {f.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 14. EXPANDED REVIEWS (UGC MINIMALIST) */}
                <div className="max-w-6xl mx-auto px-4 md:px-8 py-24 border-t border-[#ddd]">
                    <div className="flex justify-between items-end mb-16">
                        <h2 className="text-2xl font-serif text-[#111]">Testimonios,<br/><span className="italic text-[#888]">desde el silencio.</span></h2>
                        <span className="text-xs font-mono tracking-widest text-[#aaa]">003_LOG</span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { r: "Llevaba años sin terminar un libro por culpa de leer en el iPad, donde terminaba abriendo Twitter a los cinco minutos. Esta pantalla me forzó creativamente a enfocarme de nuevo.", n: "Sofía M.", t: "Escritora" },
                            { r: "Literalmente parece papel impreso plastificado. No me lloran los ojos después de 3 horas. El proceso de entrega COD funcionó sin ninguna fricción en mi consultorio.", n: "Dr. Arturo V.", t: "Académico" },
                            { r: "Minimalismo extremo. Lo dejé cargando a principios del mes pasado y recién ahora me pidió conectarlo al cable otra vez. Increíble batería.", n: "Valeria G.", t: "Minimalista" }
                        ].map((rev, i) => (
                            <div key={i} className="p-8 border border-[#eaeaea] bg-white hover:border-[#111] transition-colors duration-500 flex flex-col justify-between">
                                <div>
                                    <div className="text-[#111] flex gap-1 mb-6 text-xs">
                                        {[1,2,3,4,5].map(x=><span key={x}>■</span>)}
                                    </div>
                                    <p className="text-sm font-light text-[#555] leading-loose mb-8">"{rev.r}"</p>
                                </div>
                                <div className="border-t border-[#f0f0f0] pt-6 flex justify-between items-center">
                                    <span className="text-xs font-mono uppercase tracking-widest text-[#111]">{rev.n}</span>
                                    <span className="text-[10px] font-medium text-[#aaa] font-serif italic">{rev.t}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 15. CHECKOUT */}
                <div id="checkout-action" className="py-24 bg-[#111] relative border-t-8 border-[#333]">
                    <div className="max-w-5xl mx-auto px-4 md:px-8 relative grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center">
                        <div className="text-[#f9f9f8]">
                            <h3 className="text-4xl md:text-5xl font-serif mb-6 italic">Adquisición Tranquila.</h3>
                            <p className="text-sm font-light text-[#aaa] mb-12 leading-relaxed">Liquidación contra entrega en efectivo. Sin pasarelas de pago, sin fricción artificial. Su tomo lo espera.</p>
                            <div className="text-5xl md:text-6xl font-serif text-white tracking-tighter border-b border-[#333] inline-block pb-4">{fmtPrice(product.price)}</div>
                        </div>
                        <div className="w-full">
                            <form className="bg-[#1a1a1a] border border-[#333] p-8 md:p-10" onSubmit={e=>e.preventDefault()}>
                                <div className="space-y-6">
                                    <div className="relative">
                                        <input type="text" className="w-full bg-transparent border-b border-[#444] focus:border-[#f9f9f8] text-white font-mono text-sm px-0 py-4 outline-none transition-colors placeholder:text-[#555]" placeholder="Su Nombre Completo" />
                                    </div>
                                    <div className="relative">
                                        <input type="tel" className="w-full bg-transparent border-b border-[#444] focus:border-[#f9f9f8] text-white font-mono text-sm px-0 py-4 outline-none transition-colors placeholder:text-[#555]" placeholder="Número Celular" />
                                    </div>
                                    <div className="relative">
                                        <textarea rows={2} className="w-full bg-transparent border-b border-[#444] focus:border-[#f9f9f8] text-white font-mono text-sm px-0 py-4 outline-none transition-colors resize-none placeholder:text-[#555]" placeholder="Dirección de Destino" />
                                    </div>
                                    <div className="pt-6">
                                        <button className="w-full bg-white text-[#111] font-mono uppercase tracking-[0.2em] text-xs py-6 hover:bg-[#ccc] transition-colors border-2 border-white">
                                            Confirmar Encomienda COD
                                        </button>
                                        <p className="text-center text-[9px] text-[#555] uppercase tracking-widest mt-4">Sus datos no salen de este habitáculo.</p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </main>

            {/* STICKY MOBILE CTA */}
            <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] z-50">
                <div className="bg-[#111] border border-[#333] p-3 flex items-center justify-between shadow-2xl">
                    <div className="pl-3">
                        <div className="text-[9px] uppercase font-mono text-[#888] tracking-widest">Entrega Segura</div>
                        <div className="font-serif text-[#f9f9f8] text-lg mt-0.5">{fmtPrice(product.price)}</div>
                    </div>
                    <button onClick={() => document.getElementById('checkout-action')?.scrollIntoView({ behavior: 'smooth' })} className="bg-white text-[#111] font-mono text-[10px] uppercase tracking-widest px-6 py-3 border border-white">
                        Solicitar
                    </button>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{__html: `
                @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
                .animate-marquee { animation: marquee 20s linear infinite; }
            `}} />
        </div>
    );
};

export default PdpEreaderZen;
