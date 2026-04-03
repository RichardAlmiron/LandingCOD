'use client';
import React, { useState } from 'react';
import { StoreData, Product } from '@/lib/types';
import EnhancedProductGallery from '@/components/pdp/EnhancedProductGallery';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { data: StoreData; product: Product; }

const PdpAudioStudio: React.FC<Props> = ({ data, product }) => {
    const [faqOpen, setFaqOpen] = useState<number | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const ai = product.aiContent;
    const fmtPrice = (n: number) => { const str = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); return `Gs. ${str}`; };
    
    const bg = '#FDFCFB';
    const accent = '#B8860B';
    const darkAccent = '#1A1A1A';

    const fadeUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
    };

    return (
        <div style={{ background: bg, color: darkAccent, fontFamily: "'Inter', sans-serif" }} className="overflow-x-hidden selection:bg-amber-200/40 relative">

            {/* ═════════ 0. AMBIENT BACKGROUND ═════════ */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 opacity-[0.03]">
                <div className="absolute top-[20%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[80vw] h-[80vw] rounded-full border border-black animate-ping" style={{ animationDuration: '6s' }} />
                <div className="absolute top-[20%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[120vw] h-[120vw] rounded-full border border-black animate-ping" style={{ animationDuration: '8s', animationDelay: '2s' }} />
            </div>

            {/* ═════════ 1. HEADER ═════════ */}
            <header className="sticky top-0 z-50 backdrop-blur-3xl bg-[#FDFCFB]/80 border-b border-black/[0.04]">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <span className="text-xl font-black tracking-[0.25em] uppercase text-neutral-900">STUDIO<span style={{ color: accent }} className="font-light">ACOUSTICS</span></span>
                    <button className="lg:hidden text-xs font-black uppercase text-amber-600" onClick={() => document.getElementById('checkout-audio')?.scrollIntoView({ behavior: 'smooth' })}>Adquirir</button>
                    <nav className="hidden lg:flex gap-10">
                        {['Fidelidad', 'Comparativa', 'Comunidad'].map((item) => (
                            <a key={item} href={`#${item.toLowerCase()}`} className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400 hover:text-black transition-colors relative group overflow-hidden">
                                <span className="relative z-10">{item}</span>
                                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-black translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></span>
                            </a>
                        ))}
                    </nav>
                </div>
            </header>

            <main className="relative z-10">
                {/* ═════════ 2. HERO ═════════ */}
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 pt-10 pb-20 items-center">
                        <div className="flex flex-col justify-center space-y-8 order-2 lg:order-1">
                            <motion.div initial="hidden" animate="visible" variants={fadeUp}>
                                <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full border border-neutral-200 bg-white shadow-sm mb-6">
                                    <span className="flex h-2 w-2 relative"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span></span>
                                    <span className="text-[10px] font-black tracking-[0.2em] uppercase text-neutral-600">Alta Fidelidad</span>
                                </div>
                                <h1 className="text-5xl md:text-7xl font-black leading-[0.95] tracking-tighter text-neutral-900 pb-2">
                                    {ai?.enhancedTitle || product.title}
                                </h1>
                                <p className="text-base text-neutral-500 leading-relaxed max-w-lg mt-6 font-medium border-l-2 border-amber-500/20 pl-4">
                                    {ai?.enhancedDescription || product.description || 'Sonido de estudio profesional con cancelación de ruido líder en la industria y diseño ergonómico para largas sesiones.'}
                                </p>
                            </motion.div>
                            <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.1 }} className="space-y-4">
                                <div className="flex items-baseline gap-4">
                                    <span className="text-4xl font-black text-neutral-900">{fmtPrice(product.price)}</span>
                                    {product.originalPrice && <span className="text-xl text-neutral-400 line-through font-medium">{fmtPrice(product.originalPrice)}</span>}
                                </div>
                                <button onClick={() => document.getElementById('checkout-audio')?.scrollIntoView({ behavior: 'smooth' })} className="relative w-full max-w-md overflow-hidden rounded-2xl font-black text-sm uppercase tracking-[0.2em] transition-transform active:scale-[0.98] group h-[70px] bg-neutral-900">
                                    <div className="absolute inset-0 bg-white/10 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-500 ease-out"></div>
                                    <span className="relative z-10 text-white flex items-center justify-center gap-3">
                                        Escuchar Ahora <svg className="group-hover:translate-x-2 transition-transform" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
                                    </span>
                                </button>
                                <p className="text-[10px] uppercase font-black tracking-widest text-neutral-400">Paga 100% Contra Entrega</p>
                            </motion.div>
                        </div>
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9, rotate: -2 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 1, ease: "easeOut" }}
                            className="order-1 lg:order-2 rounded-[2rem] overflow-hidden bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-neutral-100 p-2"
                        >
                            <EnhancedProductGallery product={product} accentColor={accent} />
                        </motion.div>
                    </div>
                </div>

                {/* ═════════ 3. FEATURES MARQUEE ═════════ */}
                <div className="w-[100vw] relative left-[50%] -translate-x-[50%] overflow-hidden py-10 bg-neutral-900 mb-10 shadow-2xl">
                    <div className="flex whitespace-nowrap animate-marquee-slow">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="flex items-center gap-16 px-8">
                                <span className="text-sm font-black uppercase tracking-[0.4em] text-white">HI-RES AUDIO CERTIFIED</span>
                                <span className="text-amber-500">✦</span>
                                <span className="text-sm font-black uppercase tracking-[0.4em] text-white">NOISE CANCELLING AISLADO</span>
                                <span className="text-amber-500">✦</span>
                                <span className="text-sm font-black uppercase tracking-[0.4em] text-white">48H BATTERY LIFE</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ═════════ 4. ENGINEERING / BENEFITS ═════════ */}
                <div id="fidelidad" className="max-w-7xl mx-auto px-6 py-20 relative">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black text-neutral-900 tracking-tight">Pureza Acústica.</h2>
                        <p className="mt-4 text-neutral-500 font-medium">Renderización obsesiva de cada frecuencia, construida pieza a pieza para verdaderos audiófilos.</p>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.5"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>, title: 'Driver Magnético Plano', desc: 'Bajos expansivos y agudos cristalinos mediante bobinas distribuidas uniformemente over-ear.' },
                            { icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>, title: 'Frecuencia Absoluta', desc: 'Rango de espectro masivo desde 4Hz hasta 40kHz, sobrepasando los límites de la audición humana comercial.' },
                            { icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v12M6 12h12"/></svg>, title: 'Supresión Activa', desc: 'Sistemas micromecánicos que bloquean el 99.8% del ruido ambiental mediante cancelación por desfase de onda.' },
                        ].map((b, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group bg-white p-10 rounded-[2rem] border border-neutral-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-shadow">
                                <div className="mb-8 w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">{b.icon}</div>
                                <h3 className="text-xl font-black tracking-tight text-neutral-900 mb-3">{b.title}</h3>
                                <p className="text-sm text-neutral-500 leading-relaxed font-medium">{b.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* ═════════ 5. TUTORIAL / HOW TO USE ═════════ */}
                <div className="max-w-7xl mx-auto px-6 py-20 border-t border-neutral-100">
                    <h2 className="text-3xl md:text-4xl font-black text-center mb-16">Inmersión en Segundos.</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { s: '01', t: 'Vincular', d: 'Conexión Bluetooth 5.3 instantánea con emparejamiento LDAC sin pérdida.' },
                            { s: '02', t: 'Ajustar', d: 'Ergonomía de espuma viscoelástica para sellar el espacio orgánicamente.' },
                            { s: '03', t: 'Sumergir', d: 'Activa la supresión de ruido desde el touchpad lateral y desaparece del mundo.' },
                        ].map((s, i) => (
                            <div key={i} className="text-center p-8 bg-white rounded-3xl border border-neutral-100">
                                <div className="text-5xl font-black text-neutral-100 mb-4">{s.s}</div>
                                <h4 className="text-lg font-black text-neutral-900 mb-2">{s.t}</h4>
                                <p className="text-sm text-neutral-500">{s.d}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ═════════ 6. US VS THEM ═════════ */}
                <div id="comparativa" className="max-w-5xl mx-auto px-6 py-20 border-t border-neutral-100">
                    <h2 className="text-3xl font-black text-center mb-12">La cruda realidad.</h2>
                    <div className="rounded-[2rem] overflow-hidden border border-neutral-200 bg-white shadow-xl">
                        <div className="grid grid-cols-3 bg-neutral-50 p-6 border-b border-neutral-200 font-black text-xs uppercase tracking-[0.2em] text-neutral-500">
                            <div>Especificación</div>
                            <div className="text-amber-600 text-center">Nuestro Studio</div>
                            <div className="text-center">Marca Comercial</div>
                        </div>
                        {[
                            { k: 'Material Acústico', u: 'Kevlar & Seda', t: 'Plástico ABS Básico' },
                            { k: 'Codecs', u: 'LDAC, aptX HD', t: 'SBC estándar' },
                            { k: 'Aislamiento', u: 'Pasivo 30dB + Activo 45dB', t: 'Aislamiento Pobre' },
                            { k: 'Carga Rápida', u: '5 min = 6 Horas', t: '2 Horas de Carga' },
                        ].map((r, i) => (
                            <div key={i} className="grid grid-cols-3 p-6 border-b border-neutral-100 text-sm hover:bg-neutral-50 transition">
                                <div className="font-bold text-neutral-600">{r.k}</div>
                                <div className="text-center font-black text-neutral-900">{r.u}</div>
                                <div className="text-center font-bold text-neutral-400 line-through">{r.t}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ═════════ 7. SPEC DEEP DIVE ═════════ */}
                <div className="max-w-7xl mx-auto px-6 py-10 bg-neutral-900 text-white rounded-3xl overflow-hidden mb-20 shadow-2xl relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 blur-[80px] rounded-full"></div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 p-10 relative z-10">
                        {[ { l: 'Sensibilidad', v: '110 dB SPL/V' }, { l: 'Impedancia', v: '32 Ohms' }, { l: 'Peso', v: '260 Gramos' }, { l: 'Micrófonos', v: 'Cuadruple Array' } ].map((s, i) => (
                            <div key={i} className="border-l border-white/20 pl-6 border-opacity-50">
                                <div className="text-2xl font-black text-amber-500 mb-1">{s.v}</div>
                                <div className="text-[10px] uppercase font-bold tracking-widest text-neutral-400">{s.l}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ═════════ 8. REVIEWS UGC ═════════ */}
                <div id="comunidad" className="max-w-7xl mx-auto px-6 py-20 border-t border-neutral-100">
                    <div className="text-center mb-16">
                        <div className="flex justify-center gap-1 mb-4 text-amber-500">
                            {[1,2,3,4,5].map(i=><svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-neutral-900 tracking-tight">Veredicto Profesional.</h2>
                        <p className="mt-4 text-neutral-500 font-medium">Validado por productores, ingenieros y puristas del sonido.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { r: "Al fin unos auriculares con respuesta plana sin colorear los graves absurdamente. Herramienta crucial en mi estudio.", n: "David C. - Ingeniero en Mezcla" },
                            { r: "El aislamiento acústico en ambientes ruidosos es impresionante. Viajo mucho y esto me salva la vida cerebral.", n: "Elena R. - Editora de Video" },
                            { r: "Simplemente la mejor relación precio/calidad del mercado audiófilo. No compres marketing, compra esto.", n: "Tomás G. - Reseñador Tech" }
                        ].map((rev, i) => (
                            <div key={i} className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm relative">
                                <svg className="absolute top-6 right-6 text-neutral-100 w-12 h-12" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
                                <p className="text-sm font-medium text-neutral-600 relative z-10 leading-relaxed mb-6">"{rev.r}"</p>
                                <div className="text-[10px] font-black uppercase text-amber-600 tracking-widest">{rev.n}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ═════════ 9. BRAND MISSION ═════════ */}
                <div className="py-24 bg-neutral-100 text-center border-y border-neutral-200 px-6">
                    <div className="max-w-2xl mx-auto">
                        <h3 className="text-2xl font-black text-neutral-900 mb-6 uppercase tracking-widest">Nuestra Obsesión</h3>
                        <p className="text-base text-neutral-600 font-medium">Desafiamos el monopolio del audio comercial. Traemos fidelidad inmaculada antes solo accesible en estudios de cientos de miles de dólares, para que sientas la música exactamente como el artista la compuso.</p>
                    </div>
                </div>

                {/* ═════════ 10. GUARANTEE / WARRANTY ═════════ */}
                <div className="max-w-4xl mx-auto px-6 py-20">
                    <div className="flex flex-col md:flex-row items-center gap-10 bg-white p-12 rounded-[2rem] border border-amber-500/30 shadow-[0_20px_50px_rgba(184,134,11,0.1)]">
                        <div className="w-24 h-24 rounded-full bg-amber-50 border border-amber-300 flex items-center justify-center shadow-inner shrink-0">
                            <span className="font-black text-2xl text-amber-600 leading-none">1A</span>
                        </div>
                        <div>
                            <h3 className="text-2xl font-black text-neutral-900 mb-3">Garantía Acústica Ironclad.</h3>
                            <p className="text-sm text-neutral-600 leading-relaxed">Si al presionar "Play" no experimentas escalofríos ni descubres instrumentos que no sabías que estaban en tu canción favorita, te devolvemos tu dinero. Compra hoy sin riesgo mediante modalidad contra-entrega.</p>
                        </div>
                    </div>
                </div>

                {/* ═════════ 11. FAQ ═════════ */}
                <div className="max-w-3xl mx-auto px-6 py-20 border-t border-neutral-100">
                    <h2 className="text-3xl font-black text-center mb-12">Respuestas Rápidas</h2>
                    <div className="space-y-4">
                        {[
                            { q: '¿Son compatibles con cualquier teléfono?', a: 'Sí, utilizan conectividad universal Bluetooth 5.3 y también incluyen cable auxiliar 3.5mm clásico para audio sin pérdida cero-latencia.' },
                            { q: '¿Se rompen con el sudor o lluvia?', a: 'Tienen certificación de protección, soportan entrenamientos intensivos, sudor físico y lloviznas menores.' },
                            { q: '¿Cómo funciona el pago al recibir?', a: 'Sencillo. Haces tu pedido aquí mismo, no introduces tarjeta. Llega a tu casa/oficina, verificas y le pagas al mensajero.' }
                        ].map((f, i) => (
                            <div key={i} className="border border-neutral-200 rounded-2xl bg-white overflow-hidden">
                                <button onClick={() => setFaqOpen(faqOpen===i?null:i)} className="w-full text-left px-6 py-5 flex items-center justify-between font-bold text-neutral-900">
                                    {f.q}
                                    <svg className={`transition-transform duration-300 w-5 h-5 text-amber-500 ${faqOpen===i?'rotate-180':''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
                                </button>
                                <AnimatePresence>
                                    {faqOpen === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 pb-5 text-sm text-neutral-500 bg-neutral-50 border-t border-neutral-100 font-medium">
                                            {f.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ═════════ 12. CHECKOUT ═════════ */}
                <div id="checkout-audio" className="py-32 bg-neutral-50 border-t border-neutral-200">
                    <div className="max-w-2xl mx-auto px-6">
                        <div className="bg-white p-10 md:p-14 rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.08)] border border-neutral-100">
                            <h3 className="text-4xl font-black tracking-tight text-neutral-900 text-center mb-2">Expande tus Sentidos</h3>
                            <p className="text-center text-sm font-bold text-amber-600 mb-10 tracking-[0.2em] uppercase">Completa el formulario — Pago a la Entrega</p>
                            <form className="space-y-6" onSubmit={e => e.preventDefault()}>
                                <input type="text" className="w-full px-6 py-5 rounded-2xl bg-neutral-50 border border-neutral-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all font-bold placeholder:text-neutral-400 text-neutral-900" placeholder="Nombre completo para el envío" />
                                <input type="tel" className="w-full px-6 py-5 rounded-2xl bg-neutral-50 border border-neutral-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all font-bold placeholder:text-neutral-400 text-neutral-900" placeholder="Número Celular (WhatsApp)" />
                                <textarea rows={2} className="w-full px-6 py-5 rounded-2xl bg-neutral-50 border border-neutral-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all font-bold resize-none placeholder:text-neutral-400 text-neutral-900" placeholder="Dirección Postal Detallada" />
                                <button className="w-full h-20 rounded-2xl bg-neutral-900 text-white font-black text-sm md:text-base uppercase tracking-[0.2em] hover:bg-black transition-colors flex justify-center items-center gap-3 shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:shadow-xl mt-4">
                                    Confirmar Orden de Compra <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
                                </button>
                                <div className="flex justify-center items-center gap-6 text-[10px] uppercase font-black tracking-widest text-neutral-400 pt-6 border-t border-neutral-100">
                                    <span>Seguro Anti-Robos Extendido</span>
                                    <span>Entrega en Mano</span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>

            {/* ═════════ STICKY MOBILE ═════════ */}
            <div className="md:hidden fixed bottom-6 left-4 right-4 z-50">
                <div className="bg-neutral-900 rounded-2xl p-3 flex items-center justify-between shadow-[0_20px_40px_rgba(0,0,0,0.4)] border border-neutral-800">
                    <div className="pl-3">
                        <div className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Total Autorizado</div>
                        <div className="font-black text-lg text-white">{fmtPrice(product.price)}</div>
                    </div>
                    <button onClick={() => document.getElementById('checkout-audio')?.scrollIntoView({ behavior: 'smooth' })} className="px-6 py-4 rounded-xl bg-white text-black font-black text-xs uppercase tracking-[0.1em] shadow-md">
                        Comprar
                    </button>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{__html: `
                @keyframes marquee-slow { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
                .animate-marquee-slow { animation: marquee-slow 25s linear infinite; }
            `}} />
        </div>
    );
};

export default PdpAudioStudio;
