'use client';
import React, { useState } from 'react';
import { StoreData, Product } from '@/lib/types';
import EnhancedProductGallery from '@/components/pdp/EnhancedProductGallery';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { data: StoreData; product: Product; }

const PdpGimbalPro: React.FC<Props> = ({ data, product }) => {
    const [openSpecAcc, setOpenSpecAcc] = useState<number | null>(0);
    const [faqOpen, setFaqOpen] = useState<number | null>(null);
    const ai = product.aiContent;
    const fmtPrice = (n: number) => { const s = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); return `Gs. ${s}`; };
    
    const bg = '#18181b'; // Zinc 900
    const textMain = '#fafafa'; // Zinc 50
    const accentYellow = '#eab308'; // Yellow 500
    const accentDark = '#09090b'; // Zinc 950

    return (
        <div style={{ background: bg, color: textMain, fontFamily: "'Inter', sans-serif" }} className="overflow-x-hidden selection:bg-yellow-500/30 selection:text-yellow-200 antialiased">
            
            {/* 1. TOP NAV */}
            <header className="sticky top-0 z-50 bg-zinc-900/90 backdrop-blur-xl border-b border-zinc-800">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-yellow-500 flex items-center justify-center">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#18181b" strokeWidth="2.5"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
                        </div>
                        <span className="font-extrabold text-xl tracking-tighter text-white uppercase">
                            GIMBAL<span className="text-yellow-500 font-light">PRO</span>
                        </span>
                    </div>
                </div>
            </header>

            <main className="relative z-10 w-full overflow-hidden">
                {/* 2. BREADCRUMBS & LOGISTICS */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6 pb-2">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 border border-zinc-800 px-4 py-2 inline-flex items-center gap-2 rounded-full">
                            EQUIPO FOTOGRÁFICO / <span className="text-white">{product.title.substring(0, 15)}...</span>
                        </div>
                        <div className="inline-flex items-center gap-2 text-[10px] font-black text-yellow-500 uppercase tracking-widest">
                            [ C.O.D. LOCAL / INSPECT BEFORE BUY ]
                        </div>
                    </div>
                </div>

                {/* 3. HERO SECTION */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 lg:py-16 relative">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
                        <div className="flex flex-col relative z-20 lg:col-span-5">
                            <div className="flex items-center gap-2 mb-6">
                                <span className="bg-yellow-500 text-zinc-900 text-[10px] uppercase font-black tracking-[0.2em] px-3 py-1">
                                    ESTABILIZADOR DE 3 EJES PROFESIONAL
                                </span>
                            </div>
                            
                            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-[1] mb-6 uppercase border-l-4 border-yellow-500 pl-4">
                                {ai?.enhancedTitle || "Gimbal 4K Cine-Smooth"}
                            </h1>
                            <p className="text-base md:text-lg font-medium text-zinc-400 mb-10 leading-snug">
                                {ai?.enhancedDescription || "Convierte el lente de tu smartphone en un dron terrestre flotante. Tomas cinematográficas perfectas mientras corres, giras u operas en baja luz sin temblores microscópicos."}
                            </p>

                            <div className="bg-zinc-950 p-8 border border-zinc-800 rounded-lg shadow-xl relative mt-4">
                                <div className="flex flex-col sm:flex-row sm:items-end gap-6 mb-8 relative z-10">
                                    <span className="text-5xl font-black text-white tracking-tighter">{fmtPrice(product.price)}</span>
                                    {product.originalPrice && <span className="text-xl font-medium text-zinc-600 line-through pb-1">{fmtPrice(product.originalPrice)}</span>}
                                </div>
                                <button onClick={() => document.getElementById('checkout-action')?.scrollIntoView({ behavior: 'smooth' })} className="w-full h-[64px] bg-white text-zinc-900 font-black uppercase tracking-widest text-xs hover:bg-yellow-500 transition-colors duration-300 flex items-center justify-center rounded">
                                    Producir Compra (Pago Efectivo/Casa)
                                </button>
                            </div>
                        </div>

                        <div className="relative z-10 lg:col-span-7 flex items-center justify-center p-2 lg:p-8">
                            <div className="w-full max-w-[500px] aspect-square relative bg-zinc-900/50 rounded-2xl p-4 shadow-2xl border border-zinc-800 overflow-hidden flex items-center justify-center">
                                {/* Rule of thirds grid overlay */}
                                <div className="absolute inset-0 border border-zinc-700/30 w-full h-[33.33%] top-1/3 pointer-events-none z-20"></div>
                                <div className="absolute inset-0 border border-zinc-700/30 w-[33.33%] h-full left-1/3 pointer-events-none z-20"></div>
                                {/* Rec UI element */}
                                <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-black/60 px-2 py-1 rounded">
                                    <div className="w-3 h-3 rounded-full bg-red-600 animate-pulse"></div>
                                    <span className="font-mono text-[10px] text-white">00:00:24</span>
                                </div>
                                
                                <div className="w-full h-full relative z-10">
                                    <EnhancedProductGallery product={product} accentColor={accentYellow} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. TRUST BADGES TECHNICAL */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 pb-16">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            {v: 'AI Face', l: 'Auto Tracking Facial'},
                            {v: '290g', l: 'Capacidad Carga MAX'},
                            {v: '3 Ejes', l: 'Inercia Magnética'},
                            {v: '12 Horas', l: 'Batería Rig'},
                        ].map((b, i) => (
                            <div key={i} className="flex flex-col items-center justify-center p-6 bg-zinc-800/20 border border-zinc-800 rounded-lg">
                                <span className="text-white font-black text-3xl tracking-tighter mb-1">{b.v}</span>
                                <span className="text-[9px] font-bold text-yellow-500 uppercase tracking-widest">{b.l}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 5. ACCORDIONS */}
                <div className="max-w-4xl mx-auto px-4 md:px-8 py-20 border-t border-zinc-800">
                    <div className="mb-10 text-center">
                        <h2 className="text-4xl font-black tracking-tight text-white uppercase">Mecánica del <span className="text-yellow-500">Frame.</span></h2>
                    </div>
                    <div className="space-y-4">
                        {[
                            { t: 'Motores Brushless Inaudibles', a: 'No hay engranajes raspando. Tres motores magnéticos contrarrestan en milisegundos las vibraciones de tus manos respirando o tus pisadas corriendo. El video base saldrá perfecto sin post-producción por software.' },
                            { t: 'Seguimiento por IA', a: '¿Te grabas solo dando una masterclass? Acepta el gesto rápido de tu mano (signo V) y el gimbal rotará su cabeza persiguiéndote por toda la sala si te mueves fuera del plano. Tu camarógrafo personal.' },
                            { t: 'Rueda de Enfoque Física', a: 'Un control giratorio táctil en el lateral para hacer transiciones de Zoom-In o jalar el foco a lo Hitchcock de manera manual y suave, sin tocar la pantalla de tu cristal temblorosa.' }
                        ].map((ac, i) => (
                            <div key={i} className="bg-zinc-950 border text-left border-zinc-800 rounded-lg overflow-hidden transition-shadow">
                                <button onClick={() => setOpenSpecAcc(openSpecAcc===i?null:i)} className="w-full text-left p-6 md:p-8 flex items-center justify-between text-sm font-black uppercase text-zinc-200 transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className="text-zinc-600 font-mono text-[10px] border border-zinc-800 px-2 rounded">SHOT {i+1}</div>
                                        {ac.t}
                                    </div>
                                    <span className="text-yellow-500 font-light text-2xl leading-none">{openSpecAcc===i?'-':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {openSpecAcc === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 md:px-8 pb-8 pl-[6rem] text-sm font-medium text-zinc-400 leading-relaxed">
                                            {ac.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 7. BENEFITS CON IMAGENES UNSPLASH */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-24 mb-16">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black tracking-tight text-white mb-6 uppercase">Producción <span className="text-yellow-500 underline decoration-4">On-The-Go.</span></h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { img: 'https://images.unsplash.com/photo-1510525009512-ad7fc13eefab?q=80&w=1000&auto=format&fit=crop', t: 'Vlogs & Reels', d: 'Paso instantáneo de modo Horizontal a Vertical 9:16 para dominar TikTok y Shorts.' },
                            { img: 'https://images.unsplash.com/photo-1540324155974-7523202daa3f?q=80&w=1000&auto=format&fit=crop', t: 'B-Roll Inception', d: 'Modo Vortex. Presiona tres veces y el gimbal entra en rotación 360 continua hacia el frente.' },
                            { img: 'https://images.unsplash.com/photo-1563200921-12c8b8a5fcb9?q=80&w=1000&auto=format&fit=crop', t: 'Plegable Extra-Fuerte', d: 'Se dobla sus articulaciones al nivel de un bolsillo grande. Plásticos livianos aeronáuticos.' }
                        ].map((b, i) => (
                            <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden group">
                                <div className="h-48 w-full relative overflow-hidden bg-black filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700">
                                     <img src={b.img} alt={b.t} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-lg font-black text-white mb-2 uppercase tracking-wide">{b.t}</h3>
                                    <p className="text-sm font-medium text-zinc-500 leading-relaxed text-balance">{b.d}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 11. C.O.D WARRANTY */}
                <div className="max-w-5xl mx-auto px-4 md:px-8 py-12">
                    <div className="bg-black border border-zinc-800 p-10 md:p-14 rounded-2xl text-white md:flex items-center gap-10 shadow-2xl relative">
                        <div className="w-16 h-16 shrink-0 bg-yellow-500 text-black flex items-center justify-center rounded-full mb-6 md:mb-0">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                        </div>
                        <div className="relative z-10 w-full">
                            <h3 className="text-2xl font-black tracking-tight mb-2 uppercase">Operador C.O.D Local</h3>
                            <p className="font-medium text-zinc-400 leading-relaxed text-sm md:text-base">
                                Desplegaremos este estabilizador a través del departamento logístico local. Al arribar a tu estudio o patio, auditas visualmente la maleta cerrada y abonas el corte total al cadete a través de medio físico (Efectivo) o banca directa celular. Cero riesgo pre-pago.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 15. CHECKOUT */}
                <div id="checkout-action" className="py-24 md:py-32 bg-zinc-950 relative border-t-2 border-yellow-500">
                    <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24 items-center">
                        <div className="md:col-span-5 relative text-center md:text-left">
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-yellow-500 border border-yellow-500 px-3 py-1 bg-yellow-500/10 mb-6 inline-block">FORMULARIO DE ACCIÓN</span>
                            <h3 className="text-5xl md:text-6xl font-black tracking-tight mb-6 text-white uppercase leading-[1]">Lock & <br/>Shoot.</h3>
                            <p className="text-sm font-medium text-zinc-500 mb-10 leading-relaxed">No usamos pasarelas de cobro online.</p>
                            
                            <div className="text-6xl font-black text-white tracking-tighter">{fmtPrice(product.price)}</div>
                        </div>
                        
                        <div className="md:col-span-7 w-full border border-zinc-800 bg-black p-8 md:p-12 rounded-2xl shadow-xl">
                            <form onSubmit={e=>e.preventDefault()}>
                                <div className="space-y-6">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Director (Nombre y Apellido)</label>
                                        <input type="text" className="w-full bg-zinc-900 border-2 border-transparent focus:border-yellow-500 text-white font-bold text-sm px-6 py-4 outline-none transition-all rounded" placeholder="Tu nombre..." />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Radio Comm (Celular)</label>
                                        <input type="tel" className="w-full bg-zinc-900 border-2 border-transparent focus:border-yellow-500 text-white font-bold text-sm px-6 py-4 outline-none transition-all rounded" placeholder="Número..." />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Set Address (Dirección)</label>
                                        <textarea rows={2} className="w-full bg-zinc-900 border-2 border-transparent focus:border-yellow-500 text-white font-bold text-sm px-6 py-4 outline-none transition-all resize-none rounded" placeholder="Dirección precisa..." />
                                    </div>
                                    <div className="pt-4">
                                        <button className="w-full h-[64px] bg-yellow-500 text-black font-black uppercase tracking-widest text-[12px] hover:bg-white hover:text-black transition-colors rounded">
                                            Autorizar Toma (Pago C.O.D)
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

export default PdpGimbalPro;
