'use client';
import React, { useState } from 'react';
import { StoreData, Product } from '@/lib/types';
import EnhancedProductGallery from '@/components/pdp/EnhancedProductGallery';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { data: StoreData; product: Product; }

const PdpTheragun: React.FC<Props> = ({ data, product }) => {
    const [openSpecAcc, setOpenSpecAcc] = useState<number | null>(0);
    const [faqOpen, setFaqOpen] = useState<number | null>(null);
    const ai = product.aiContent;
    const fmtPrice = (n: number) => { const s = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); return `Gs. ${s}`; };
    
    // Aesthetic Palette: Athlete Recovery / Performance
    const bg = '#171717'; // Neutral 900
    const textMain = '#f5f5f5'; // Neutral 100
    const accentRed = '#ef4444'; // Red 500 (Performance Accent)
    const cardBg = '#262626'; // Neutral 800

    return (
        <div style={{ background: bg, color: textMain, fontFamily: "'Inter', sans-serif" }} className="overflow-x-hidden selection:bg-red-500/30 selection:text-red-200 antialiased">
            
            {/* 1. TOP NAV (Athletic Header) */}
            <header className="sticky top-0 z-50 bg-[#171717]/90 backdrop-blur-xl border-b border-neutral-800">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center -skew-x-12">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#171717" strokeWidth="3"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                        </div>
                        <span className="font-black text-xl tracking-tighter text-white uppercase italic">
                            KINETIC<span className="text-red-500">PRO</span>
                        </span>
                    </div>
                </div>
            </header>

            <main className="relative z-10 w-full overflow-hidden">
                {/* 2. BREADCRUMBS & LOGISTICS */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6 pb-2">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="text-[10px] font-black uppercase tracking-widest text-red-500 bg-red-950/30 px-3 py-1.5 inline-flex items-center gap-2 border border-red-900/50 -skew-x-12">
                            <span className="skew-x-12">RECUPERACIÓN DEPORTIVA / <span className="text-white">{product.title.substring(0, 15)}...</span></span>
                        </div>
                        <div className="inline-flex items-center gap-2 text-[10px] font-black text-neutral-400 uppercase tracking-widest bg-neutral-800 px-3 py-1.5 -skew-x-12">
                            <span className="skew-x-12">ENTREGA C.O.D (PAGO EFECTIVO)</span>
                        </div>
                    </div>
                </div>

                {/* 3. HERO SECTION (HIGH PERFORMANCE) */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 lg:py-16 relative">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
                        <div className="flex flex-col relative z-20 lg:col-span-5">
                            <div className="flex items-center gap-2 mb-6">
                                <span className="text-red-500 text-[11px] uppercase font-black tracking-[0.2em] relative inline-block">
                                    AMPLITUD DE 16MM (TEJIDO PROFUNDO)
                                    <div className="absolute -bottom-1 left-0 w-1/3 h-0.5 bg-red-500"></div>
                                </span>
                            </div>
                            
                            <h1 className="text-6xl md:text-7xl font-black tracking-tighter text-white leading-[0.95] mb-6 uppercase italic">
                                {ai?.enhancedTitle || "Pistola de Masaje Percusivo"}
                            </h1>
                            <p className="text-base md:text-lg font-medium text-neutral-400 mb-10 leading-snug">
                                {ai?.enhancedDescription || "Destruye el ácido láctico en segundos. Golpea el músculo 40 veces por segundo con una fuerza de 60lbs. Desbloquea tú movilidad y elimina nudos crónicos sin ir al fisioterapeuta."}
                            </p>

                            <div className="bg-neutral-800 p-8 shadow-2xl relative border-l-4 border-red-500 -skew-x-3 transform-gpu">
                                <div className="skew-x-3">
                                    <div className="flex flex-col sm:flex-row sm:items-end gap-6 mb-8 relative z-10">
                                        <span className="text-5xl font-black text-white tracking-tighter italic">{fmtPrice(product.price)}</span>
                                        {product.originalPrice && <span className="text-xl font-bold text-neutral-500 line-through pb-1 italic">{fmtPrice(product.originalPrice)}</span>}
                                    </div>
                                    <button onClick={() => document.getElementById('checkout-action')?.scrollIntoView({ behavior: 'smooth' })} className="w-full h-[64px] bg-red-600 text-white font-black uppercase tracking-[0.2em] text-[13px] hover:bg-neutral-900 border-2 border-transparent hover:border-red-600 transition-all duration-300 flex items-center justify-center -skew-x-6">
                                        <span className="skew-x-6">Recuperación Inmediata (C.O.D)</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="relative z-10 lg:col-span-7 flex items-center justify-center p-2 lg:p-8">
                            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="w-full max-w-[550px] aspect-square relative bg-neutral-950 p-6 shadow-[0_0_50px_rgba(239,68,68,0.1)] border border-neutral-800 flex items-center justify-center">
                                {/* Crosshair aesthetic */}
                                <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-red-500/20 pointer-events-none"></div>
                                <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-red-500/20 pointer-events-none"></div>
                                
                                <div className="w-full h-full relative z-10 bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
                                    <EnhancedProductGallery product={product} accentColor={accentRed} />
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* 4. TRUST BADGES TECHNICAL */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 pb-16">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            {v: '60 lbs', l: 'Fuerza de Bloqueo'},
                            {v: '3200', l: 'Percusiones / Minuto'},
                            {v: '35 dB', l: 'Motor Silencioso Shield'},
                            {v: '6', l: 'Cabezales Pro'}
                        ].map((b, i) => (
                            <div key={i} className="flex flex-col items-center justify-center p-6 bg-neutral-800 border border-neutral-700/50 -skew-x-6">
                                <span className="text-white font-black text-3xl tracking-tighter mb-1 skew-x-6 italic">{b.v}</span>
                                <span className="text-[9px] font-bold text-red-500 uppercase tracking-widest skew-x-6 text-center">{b.l}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 5. EXPERT ACCORDIONS */}
                <div className="max-w-4xl mx-auto px-4 md:px-8 py-20 border-t border-neutral-800">
                    <div className="mb-12 text-center">
                        <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white uppercase italic">Bio<span className="text-red-500">hack.</span></h2>
                    </div>
                    <div className="space-y-4">
                        {[
                            { t: 'El Secreto: 16MM de Amplitud', a: 'Las pistolas baratas solo "vibran" en la superficie de la piel. Nuestro motor viaja 16 milímetros hacia adentro y hacia afuera. Esto llega al tejido conectivo profundo, separando las fibras musculares pegadas y reactivando el flujo sanguíneo de golpe.' },
                            { t: 'Calentamiento Pre-Entreno Flash', a: 'No pierdas 20 minutos estirando. 2 minutos de pasada rápida sobre isquios, cuádriceps y pantorrillas engañan al sistema nervioso, elevando la temperatura local y preparándote para un PR inmediato.' },
                            { t: 'Fuerza Anti-Bloqueo de 60 lbs', a: 'Puedes enterrar la pistola con todo el peso de tu cuerpo contra tu banda iliotibial (IT). El motor Brushless de grado industrial detecta la presión y aumenta el torque automáticamente sin detenerse.' }
                        ].map((ac, i) => (
                            <div key={i} className="bg-neutral-800/50 border border-neutral-700/50 hover:border-red-500/50 transition-colors">
                                <button onClick={() => setOpenSpecAcc(openSpecAcc===i?null:i)} className="w-full text-left p-6 md:p-8 flex items-center justify-between text-sm font-black uppercase text-neutral-200">
                                    <div className="flex items-center gap-4">
                                        <div className="text-red-500 font-black italic text-xl">0{i+1}</div>
                                        <span className="tracking-wide italic">{ac.t}</span>
                                    </div>
                                    <span className="text-red-500 font-light text-2xl leading-none">{openSpecAcc===i?'-':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {openSpecAcc === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 md:px-8 pb-8 pl-[4.5rem] text-sm font-medium text-neutral-400 leading-relaxed overflow-hidden">
                                            {ac.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 7. BENEFITS CON IMAGENES UNSPLASH */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-24 mb-16 bg-neutral-950 border-y border-neutral-800">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black tracking-tighter text-white mb-6 uppercase italic">Alivio <span className="text-red-500">Táctico.</span></h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1000&auto=format&fit=crop', t: 'Crossfit / Pesas', d: 'Adiós al DOMS (Dolor tardío). Desbarata los micro-desgarros después del día de piernas para que puedas caminar normalmente mañana.' },
                            { img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000&auto=format&fit=crop', t: 'Postura de Oficina', d: 'El estrés cristaliza la cervical y los trapecios. Un masaje de 5 minutos en el cuello libera la tensión del nervio vago mejorando el sueño.' },
                            { img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop', t: 'Runners / Ciclismo', d: 'Dile adiós a la fascitis plantar y tendinitis. El cabezal en "U" está diseñado quirúrgicamente para masajear alrededor del tendón de Aquiles.' }
                        ].map((b, i) => (
                            <div key={i} className="bg-neutral-900 border border-neutral-800 rounded-none group overflow-hidden">
                                <div className="h-56 w-full relative overflow-hidden bg-black filter contrast-125">
                                     <img src={b.img} alt={b.t} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-100" />
                                </div>
                                <div className="p-8 border-t-2 border-red-500/0 group-hover:border-red-500 transition-colors">
                                    <h3 className="text-lg font-black text-white mb-2 uppercase tracking-wide italic">{b.t}</h3>
                                    <p className="text-sm font-medium text-neutral-400 leading-relaxed text-balance">{b.d}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 11. RISK REVERSAL WARRANTY */}
                <div className="max-w-5xl mx-auto px-4 md:px-8 py-12">
                    <div className="bg-red-600 p-10 md:p-14 text-white md:flex items-center gap-10 shadow-2xl relative -skew-x-3 transform-gpu">
                        <div className="skew-x-3 w-full flex flex-col md:flex-row items-center gap-10">
                            <div className="w-20 h-20 shrink-0 bg-neutral-950 text-red-500 flex items-center justify-center mb-6 md:mb-0 border-4 border-red-800">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                            </div>
                            <div className="relative z-10 w-full text-center md:text-left">
                                <h3 className="text-3xl font-black tracking-tighter mb-3 uppercase italic">Compra Física y Segura (C.O.D).</h3>
                                <p className="font-bold text-red-100/90 leading-relaxed text-sm md:text-base">
                                    Cero tarjetas de crédito. Cero fraudes online. Cargas tú dirección abajo, enviamos el equipo con nuestro courier asociado, lo enciendes en la puerta de tu casa para sentir su poder y le abonas físicamente al repartidor. Puro impacto, cero dolor financiero.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 15. CHECKOUT */}
                <div id="checkout-action" className="py-24 md:py-32 bg-neutral-950 relative border-t-4 border-red-600">
                    <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24 items-center">
                        <div className="md:col-span-5 relative text-center md:text-left">
                            <span className="text-[10px] font-black uppercase tracking-widest text-red-500 mb-6 bg-red-950/50 border border-red-900/50 px-3 py-1 inline-block -skew-x-12">PLAN DE TRABAJO LOCAL</span>
                            <h3 className="text-5xl md:text-6xl font-black tracking-tighter mb-6 text-white uppercase leading-[1] italic">Pide el <br/><span className="text-red-500">Drop.</span></h3>
                            <p className="text-sm font-medium text-neutral-400 mb-10 leading-relaxed max-w-sm mx-auto md:mx-0">Llena la hoja de ruta pesada. Pagas al motorista de paquetería cuando llegue a tu zona. 100% C.O.D.</p>
                            
                            <div className="text-6xl font-black text-white tracking-tighter italic drop-shadow-[5px_5px_0_rgba(239,68,68,0.2)]">{fmtPrice(product.price)}</div>
                        </div>
                        
                        <div className="md:col-span-7 w-full bg-neutral-900 p-8 md:p-12 relative shadow-2xl border-l-[8px] border-red-600">
                            <form onSubmit={e=>e.preventDefault()}>
                                <div className="space-y-6">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">Atleta / Receptor</label>
                                        <input type="text" className="w-full bg-neutral-950 border-2 border-neutral-800 focus:border-red-500 text-white font-bold text-sm px-6 py-4 outline-none transition-all" placeholder="Nombre completo" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">Número de Contacto</label>
                                        <input type="tel" className="w-full bg-neutral-950 border-2 border-neutral-800 focus:border-red-500 text-white font-bold text-sm px-6 py-4 outline-none transition-all" placeholder="Celular" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">Ubicación Set</label>
                                        <textarea rows={2} className="w-full bg-neutral-950 border-2 border-neutral-800 focus:border-red-500 text-white font-bold text-sm px-6 py-4 outline-none transition-all resize-none" placeholder="Dirección exacta para el GPS" />
                                    </div>
                                    <div className="pt-4">
                                        <button className="w-full h-[70px] bg-red-600 text-white font-black uppercase tracking-widest text-[14px] hover:bg-white hover:text-red-600 transition-colors shadow-lg flex items-center justify-center gap-2">
                                            Confirmar Recuperación (Pagar en Casa) <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
};

export default PdpTheragun;
