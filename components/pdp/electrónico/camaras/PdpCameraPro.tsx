'use client';
import React, { useState } from 'react';
import { StoreData, Product } from '@/lib/types';
import EnhancedProductGallery from '@/components/pdp/EnhancedProductGallery';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { data: StoreData; product: Product; }

const PdpCameraPro: React.FC<Props> = ({ data, product }) => {
    const [faqOpen, setFaqOpen] = useState<number | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const ai = product.aiContent;
    const fmtPrice = (n: number) => { const s = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); return `Gs. ${s}`; };
    
    const accent = '#E60000'; 
    const bg = '#FFFFFF';
    
    const shutterReveal = {
        hidden: { opacity: 0, clipPath: 'inset(50% 0 50% 0)' },
        visible: { opacity: 1, clipPath: 'inset(0% 0 0% 0)', transition: { duration: 0.7, ease: [0.77, 0, 0.175, 1] } }
    };

    return (
        <div style={{ background: bg, color: '#000', fontFamily: "'Inter', sans-serif" }} className="overflow-x-hidden selection:bg-red-500/30 font-medium">

            {/* 1. HEADER */}
            <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-black/[0.05]">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <span className="text-sm font-black tracking-[0.25em] uppercase text-black flex items-center gap-2">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill={accent}><circle cx="12" cy="12" r="10"/></svg>
                        LENS<span className="font-light text-neutral-400">PRO</span>
                    </span>
                    <button className="lg:hidden text-xs font-black uppercase text-red-600 bg-red-50 px-4 py-2 rounded-full" onClick={() => document.getElementById('checkout-cam')?.scrollIntoView({ behavior: 'smooth' })}>Buy</button>
                    <nav className="hidden lg:flex gap-10">
                        {['Óptica', 'Especificaciones', 'Comunidad'].map((item) => (
                            <a key={item} href={`#${item.toLowerCase()}`} className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-500 hover:text-black transition-colors">
                                {item}
                            </a>
                        ))}
                    </nav>
                </div>
            </header>

            <main className="relative z-10">
                {/* 0. TIMELINE CROSSHAIRS */}
                <div className="fixed inset-0 pointer-events-none z-0 opacity-10">
                    <div className="absolute top-1/4 left-[10%] w-6 h-6 border-t-2 border-l-2 border-black"></div>
                    <div className="absolute top-1/4 right-[10%] w-6 h-6 border-t-2 border-r-2 border-black"></div>
                    <div className="absolute bottom-1/4 left-[10%] w-6 h-6 border-b-2 border-l-2 border-black"></div>
                    <div className="absolute bottom-1/4 right-[10%] w-6 h-6 border-b-2 border-r-2 border-black"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center">
                        <div className="w-[1px] h-full bg-black"></div><div className="w-full h-[1px] bg-black absolute"></div>
                    </div>
                </div>

                {/* 2. HERO */}
                <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[70vh]">
                    <motion.div initial="hidden" animate="visible" variants={shutterReveal} className="lg:col-span-5 flex flex-col justify-center pr-10 relative z-10">
                        <div className="inline-flex items-center gap-2 mb-6">
                            <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></div>
                            <span className="text-[10px] font-black tracking-[0.2em] uppercase text-neutral-400">Captura Profesional</span>
                        </div>
                        <h1 className="text-5xl lg:text-[5rem] font-black leading-[0.85] tracking-tighter uppercase mb-6" style={{ wordSpacing: '10px' }}>
                            {(ai?.enhancedTitle || product.title).split(' ').map((word, i) => (
                                <span key={i} className={i % 2 !== 0 ? '' : 'text-transparent'} style={i % 2 !== 0 ? {} : { WebkitTextStroke: '1px black' }}>{word} </span>
                            ))}
                        </h1>
                        <p className="text-sm text-neutral-600 leading-relaxed font-medium mb-10 max-w-sm">
                            {ai?.enhancedDescription || product.description || 'Sistema óptico profesional. Captura cada detalle con precisión de color absoluta y latencia cero.'}
                        </p>
                        <div className="space-y-4">
                            <div className="text-4xl font-black">{fmtPrice(product.price)}</div>
                            <button onClick={() => document.getElementById('checkout-cam')?.scrollIntoView({ behavior: 'smooth' })} className="w-full max-w-[300px] h-[60px] bg-black text-white font-black text-[11px] uppercase tracking-[0.2em] hover:bg-neutral-800 transition-all flex items-center justify-center gap-3 relative overflow-hidden group">
                                <span className="relative z-10">Asegurar Unidad</span>
                                <div className="absolute right-0 top-0 bottom-0 w-16 bg-red-600 group-hover:w-full transition-all duration-300 ease-out z-0 flex items-center justify-center">
                                    <svg className="opacity-0 group-hover:opacity-100 transition-opacity delay-100" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
                                </div>
                            </button>
                        </div>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="lg:col-span-7 bg-neutral-100 p-8 md:p-12 relative z-10">
                        <EnhancedProductGallery product={product} accentColor={accent} />
                        <div className="flex justify-between items-center mt-6 text-[10px] font-black uppercase tracking-widest text-neutral-400">
                            <span>ISO 100-51200</span>
                            <span>SHUTTER 1/8000s</span>
                            <span>F/1.4 LENS</span>
                        </div>
                    </motion.div>
                </div>

                {/* 3. MARQUEE */}
                <div className="w-[100vw] overflow-hidden py-5 bg-neutral-900 border-y-4 border-black relative left-[50%] -translate-x-[50%] mb-20">
                    <div className="flex whitespace-nowrap animate-marquee">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="flex items-center gap-12 px-8">
                                <span className="text-xs font-black uppercase tracking-[0.3em] text-white">RAW CAPTURE</span>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill={accent}><circle cx="12" cy="12" r="12"/></svg>
                                <span className="text-xs font-black uppercase tracking-[0.3em] text-white">CINEMATOGRAPHY 8K</span>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill={accent}><circle cx="12" cy="12" r="12"/></svg>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 4. ENGINEERING */}
                <div id="óptica" className="max-w-7xl mx-auto px-6 flex flex-col py-20 border-t border-black/[0.05]">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 gap-x-8">
                        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} className="md:col-span-1">
                            <h2 className="text-4xl font-black tracking-tighter leading-[0.9] mb-4 uppercase">Arquitectura<br/>Óptica.</h2>
                            <p className="text-sm text-neutral-500 max-w-xs font-medium">Luz filtrada y procesada a través del sensor de última generación para lograr precisión cinemática.</p>
                        </motion.div>
                        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
                            {[
                                { title: 'Sensor de Fuzz', val: '45MP', desc: 'Captación lumínica insana para crops de recorte perfecto.' },
                                { title: 'Doble Enfoque', val: 'AF-C', desc: 'Rastreo predictivo de ojo animal y humano simultáneo.' },
                                { title: 'Estabilizador', val: '8-Stops', desc: 'IBIS interno de 5 ejes, despídete de tripodes pesados.' },
                                { title: '10-Bit Color', val: 'C-LOG', desc: 'Curvas de color planas preparadas para post-producción.' }
                            ].map((s, i) => (
                                <motion.div key={i} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay: i*0.1 }} className="border-l-[3px] border-black pl-6 group">
                                    <div className="text-[10px] font-black tracking-[0.2em] uppercase mb-2 text-red-600 group-hover:text-black transition-colors">{s.val}</div>
                                    <h3 className="text-xl font-black tracking-tight mb-2 uppercase">{s.title}</h3>
                                    <p className="text-xs text-neutral-500 font-bold">{s.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 5. VS COMPARISON */}
                <div className="max-w-7xl mx-auto px-6 py-20 bg-neutral-50 border-y border-black/[0.05]">
                    <h2 className="text-3xl font-black tracking-tighter uppercase text-center mb-16">No compites. Aniquilas.</h2>
                    <div className="max-w-4xl mx-auto bg-white border border-black shadow-[10px_10px_0_rgba(0,0,0,1)]">
                        <div className="grid grid-cols-3 bg-black text-white p-6 font-black text-xs uppercase tracking-widest">
                            <div>Feature</div>
                            <div className="text-center text-red-500">LensPro System</div>
                            <div className="text-center text-neutral-500">Consumer DSLR</div>
                        </div>
                        {[
                            {k: 'Rango Dinámico', p: '14.5 Pasos Ev', n: '11 Pasos Ev'},
                            {k: 'Buffer de Ráfaga', p: 'Ráfaga Ilimitada a 20 FPS', n: 'Buffer Lleno a los 3s'},
                            {k: 'Weather Sealing', p: 'Cuerpo de Magnesio Sellado', n: 'Plástico No Sellado'},
                        ].map((r,i) => (
                            <div key={i} className="grid grid-cols-3 p-6 border-b border-black/[0.05]">
                                <div className="font-bold text-sm">{r.k}</div>
                                <div className="text-center font-black text-sm">{r.p}</div>
                                <div className="text-center font-bold text-neutral-400 text-sm line-through">{r.n}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 6. TUTORIAL (SHOOTING TIMELINE) */}
                <div className="max-w-7xl mx-auto px-6 py-20 border-b border-black/[0.05]">
                    <h2 className="text-3xl font-black tracking-tighter uppercase text-center mb-16">Workflow Editor.</h2>
                    <div className="flex flex-col md:flex-row gap-8 justify-center">
                        {[
                            {n: '01', t: 'Encuadre', d: 'Levanta el visor EVF de 9M puntos sin lag de visualización.'},
                            {n: '02', t: 'Foco AI', d: 'El procesador aisla el ojo del sujeto central en 0.05 segundos.'},
                            {n: '03', t: 'Disparo', d: 'Obturador electrónico silencioso, congela el tiempo perfectamente.'}
                        ].map((m, i) => (
                            <div key={i} className="flex-1 bg-white p-8 border border-neutral-200 relative">
                                <div className="absolute top-0 right-0 w-8 h-8 bg-black flex items-center justify-center text-white font-black text-[10px]">{m.n}</div>
                                <h3 className="text-xl font-black uppercase tracking-tight mb-4">{m.t}</h3>
                                <p className="text-xs text-neutral-500 font-bold leading-relaxed">{m.d}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 7. DEEP SPECS */}
                <div className="bg-black text-white py-20">
                    <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            {v: 'Dual UHS-II', l: 'Memoria'}, {v: '120fps', l: 'Video 4K'}, 
                            {v: 'EVF OLED', l: 'Visor'}, {v: '1,200', l: 'Batería (Shots)'}
                        ].map((s,i) => (
                            <div key={i} className="text-center">
                                <div className="text-2xl font-black text-red-600 mb-2 uppercase">{s.v}</div>
                                <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400">{s.l}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 8. MASONRY UGC */}
                <div id="comunidad" className="max-w-7xl mx-auto px-6 pb-24 pt-20">
                    <div className="text-center mb-16">
                        <div className="flex justify-center mb-4"><svg width="24" height="24" viewBox="0 0 24 24" fill={accent}><circle cx="12" cy="12" r="12"/></svg></div>
                        <h2 className="text-4xl font-black tracking-tighter uppercase">Exposición #LensPro</h2>
                        <p className="text-sm text-neutral-500 mt-2 font-bold tracking-widest uppercase">Galería de Directores Activos</p>
                    </div>
                    <div className="columns-1 md:columns-3 gap-6 space-y-6">
                        {[
                            { h: 'h-64', i: 1 }, { h: 'h-40', i: 2 }, { h: 'h-72', i: 3 }, 
                            { h: 'h-48', i: 4 }, { h: 'h-60', i: 5 }, { h: 'h-56', i: 6 }
                        ].map((box, i) => (
                            <motion.div key={i} initial={{ opacity:0, scale:0.95 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true }} transition={{ delay: (i%3)*0.1 }} className={`w-full ${box.h} bg-neutral-100 overflow-hidden relative group cursor-pointer border border-neutral-200`}>
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/80 transition-colors z-10 flex items-center justify-center p-6 text-center">
                                    <p className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs font-bold leading-relaxed block">
                                        "El color que saca el sensor directo de cámara no necesita edición masiva. Las sombras son impecables."
                                    </p>
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* 9. MISSION */}
                <div className="py-24 bg-neutral-50 text-center border-y border-black/[0.1] px-6">
                    <div className="max-w-2xl mx-auto">
                        <h3 className="text-4xl font-black text-black mb-6 uppercase tracking-tighter">Capturar para Existir.</h3>
                        <p className="text-sm text-neutral-600 font-black leading-relaxed">No estamos fabricando plástico y circuitos. Construímos las extensiones ópticas del ojo humano. Nuestra misión es darte las herramientas para congelar la inmensidad del presente, sin fricción técnica mediando entre vos y tu composición perfecta.</p>
                    </div>
                </div>

                {/* 10. WARRANTY */}
                <div className="max-w-4xl mx-auto px-6 py-20">
                    <div className="flex flex-col md:flex-row items-center gap-10 bg-white border-2 border-black p-10 shadow-[10px_10px_0_rgba(0,0,0,1)]">
                        <div className="w-20 h-20 bg-red-600 flex items-center justify-center shrink-0">
                            <span className="font-black text-3xl text-white uppercase tracking-tighter">1Y</span>
                        </div>
                        <div>
                            <h3 className="text-2xl font-black uppercase tracking-tight mb-2">Seguro de Protección de Lente.</h3>
                            <p className="text-sm text-neutral-600 font-bold leading-relaxed">Compra con total confianza pagando de manera electrónica o mediante el cobro exacto en el momento en que recibes el paquete. Incluímos garantía internacional completa por 1 año sobre el hardware base.</p>
                        </div>
                    </div>
                </div>

                {/* 11. FAQ Collapse */}
                <div className="max-w-3xl mx-auto px-6 py-20 border-t border-black/[0.05]">
                    <h2 className="text-3xl font-black tracking-tighter uppercase text-center mb-12">Detalles Operativos</h2>
                    <div className="space-y-4 shadow-sm border border-black/10 bg-white">
                        {[
                            {q: '¿Incluye el lente base mostrado?', a: 'Sí, el kit inicial viene con un lente versátil de 35mm f/1.8 totalmente optimizado para el chasis.'},
                            {q: '¿Es resistente al clima extremo?', a: 'Completamente. Las gomas sellan los anillos para repeler arena, humedad y salpicaduras.'},
                            {q: 'Respecto al envío...', a: 'Es gratuito y asegurado. Un currier privado entrega el paquete directamente en tu hogar. Pagarás el total únicamente allí.'}
                        ].map((f, i) => (
                            <div key={i} className="border-b border-neutral-100 last:border-0">
                                <button onClick={() => setFaqOpen(faqOpen===i?null:i)} className="w-full text-left px-6 py-6 flex items-center justify-between font-black uppercase text-xs tracking-widest text-black">
                                    {f.q}
                                    <span className="text-red-500 font-black text-lg leading-none">{faqOpen===i?'-':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {faqOpen === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 pb-6 text-sm text-neutral-600 font-medium leading-relaxed">
                                            {f.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 12. CHECKOUT FORM */}
                <div id="checkout-cam" className="py-32 bg-black text-white relative border-t-[10px] border-red-600">
                    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 px-6 relative z-10">
                        <div className="flex-1 space-y-6 lg:pr-10">
                            <h3 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.85]">Concreta<br/><span className="text-red-600">tu Visión.</span></h3>
                            <p className="text-sm text-neutral-400 font-medium max-w-sm">Completa el formulario logístico para reservar tu unidad. El pago se efectúa única y exclusivamente tras la confirmación de la entrega en tus manos.</p>
                            <div className="bg-[#111] p-8 border border-white/10 mt-8">
                                <div className="flex justify-between items-center text-lg font-black border-b border-white/10 pb-6 mb-6">
                                    <span>Inversión</span>
                                    <span>{fmtPrice(product.price)}</span>
                                </div>
                                <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest text-neutral-500">
                                    <span>Logística</span>
                                    <span className="text-red-500">GRATUITO</span>
                                </div>
                            </div>
                        </div>

                        <form className="flex-1 space-y-6" onSubmit={e => e.preventDefault()}>
                            <div className="relative">
                                <span className="absolute top-4 left-0 text-[9px] font-black uppercase tracking-widest text-red-500">A</span>
                                <input type="text" className="w-full h-16 bg-transparent border-b-2 border-white/20 focus:border-white outline-none transition-colors text-sm font-black placeholder:text-neutral-600 pl-6" placeholder="Identidad Operativa (Nombre Completo)" />
                            </div>
                            <div className="relative">
                                <span className="absolute top-4 left-0 text-[9px] font-black uppercase tracking-widest text-red-500">B</span>
                                <input type="tel" className="w-full h-16 bg-transparent border-b-2 border-white/20 focus:border-white outline-none transition-colors text-sm font-black placeholder:text-neutral-600 pl-6" placeholder="Banda de Frecuencia (WhatsApp)" />
                            </div>
                            <div className="relative">
                                <span className="absolute top-4 left-0 text-[9px] font-black uppercase tracking-widest text-red-500">C</span>
                                <textarea rows={2} className="w-full h-20 bg-transparent border-b-2 border-white/20 focus:border-white outline-none transition-colors text-sm font-black placeholder:text-neutral-600 resize-none pt-4 pl-6" placeholder="Coordenadas Exactas de Recepción" />
                            </div>
                            <button className="w-full h-[80px] bg-white text-black font-black text-sm uppercase tracking-[0.2em] hover:bg-red-600 hover:text-white transition-colors mt-8">
                                Asignar mi Equipo / Pagar al Recibir
                            </button>
                        </form>
                    </div>
                </div>

            </main>

            {/* STICKY MOBILE */}
            <div className="md:hidden fixed bottom-6 left-4 right-4 z-50">
                <div className="bg-white border-2 border-black p-3 flex items-center justify-between shadow-[5px_5px_0_rgba(0,0,0,1)]">
                    <div className="pl-2">
                        <div className="text-[10px] font-black text-red-600 uppercase tracking-widest line-through">{product.originalPrice ? fmtPrice(product.originalPrice) : ''}</div>
                        <div className="font-black text-xl text-black leading-none">{fmtPrice(product.price)}</div>
                    </div>
                    <button onClick={() => document.getElementById('checkout-cam')?.scrollIntoView({ behavior: 'smooth' })} className="px-6 py-4 bg-black text-white font-black text-xs uppercase tracking-[0.2em]">
                        Comprar
                    </button>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{__html: `
                @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
                .animate-marquee { animation: marquee 15s linear infinite; }
            `}} />
        </div>
    );
};

export default PdpCameraPro;
