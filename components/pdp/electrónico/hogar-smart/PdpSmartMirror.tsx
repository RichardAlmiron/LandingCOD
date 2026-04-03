'use client';
import React, { useState } from 'react';
import { StoreData, Product } from '@/lib/types';
import EnhancedProductGallery from '@/components/pdp/EnhancedProductGallery';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { data: StoreData; product: Product; }

const PdpSmartMirror: React.FC<Props> = ({ data, product }) => {
    const [openSpecAcc, setOpenSpecAcc] = useState<number | null>(0);
    const [faqOpen, setFaqOpen] = useState<number | null>(null);
    const ai = product.aiContent;
    const fmtPrice = (n: number) => { const s = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); return `Gs. ${s}`; };
    
    // Aesthetic Palette: Luxury Fitness / Reflection
    const bg = '#ffffff'; // Pure White
    const textMain = '#18181b'; // Zinc 900
    const accentSilver = '#94a3b8'; // Slate 400
    const accentDark = '#09090b'; // Zinc 950

    return (
        <div style={{ background: bg, color: textMain, fontFamily: "'Inter', sans-serif" }} className="overflow-x-hidden selection:bg-zinc-200 selection:text-black antialiased">
            
            {/* 0. AMBIENT LUXURY */}
            <div className="absolute top-0 right-0 w-[50%] h-[800px] bg-gradient-to-bl from-zinc-100 via-transparent to-transparent pointer-events-none z-0"></div>

            {/* 1. TOP NAV (Minimalist Gym) */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-2xl border-b border-zinc-100">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 flex items-center justify-center border border-zinc-200 shadow-sm rounded-full overflow-hidden relative">
                            <div className="absolute inset-0 bg-gradient-to-tr from-zinc-100 to-white"></div>
                            <svg className="relative z-10" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#18181b" strokeWidth="1.5"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                        </div>
                        <span className="font-light text-xl tracking-[0.2em] text-zinc-900 uppercase">
                            REFLECT<span className="font-black">FIT</span>
                        </span>
                    </div>
                </div>
            </header>

            <main className="relative z-10 w-full overflow-hidden">
                {/* 2. BREADCRUMBS & LOGISTICS */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6 pb-2">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 bg-zinc-50 px-4 py-2 rounded-full border border-zinc-200 inline-flex items-center gap-2">
                            <span className="w-1 h-1 bg-zinc-900 rounded-full"></span>
                            FITNESS / HOGAR SMART / <span className="text-zinc-900">{product.title.substring(0, 15)}...</span>
                        </div>
                        <div className="inline-flex items-center gap-2 text-[10px] font-bold text-zinc-600 uppercase tracking-widest px-4 py-2 border-b border-zinc-900">
                            PAGO C.O.D. • ENVÍO BLANCO
                        </div>
                    </div>
                </div>

                {/* 3. HERO SECTION (GLASS & REFLECTION) */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 lg:py-16 relative">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
                        <div className="flex flex-col relative z-20 lg:col-span-5">
                            <h1 className="text-5xl md:text-7xl font-extralight tracking-tighter text-zinc-900 leading-[1] mb-6">
                                {ai?.enhancedTitle || "Espejo Smart de Entrenamiento."}
                            </h1>
                            <p className="text-base md:text-lg font-normal text-zinc-500 mb-10 leading-relaxed">
                                {ai?.enhancedDescription || "Un espejo de cuerpo entero cuando está apagado. Un entrenador personal de élite proyectado mágicamente en cristal HD cuando lo enciendes."}
                            </p>

                            <div className="bg-zinc-50 p-8 border border-zinc-200 rounded-[2rem] shadow-sm relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-tr from-white to-transparent opacity-50"></div>
                                <div className="flex flex-col sm:flex-row sm:items-end gap-6 mb-8 relative z-10">
                                    <span className="text-5xl font-black text-zinc-900 tracking-tighter">{fmtPrice(product.price)}</span>
                                    {product.originalPrice && <span className="text-xl font-medium text-zinc-400 line-through pb-1">{fmtPrice(product.originalPrice)}</span>}
                                </div>
                                <button onClick={() => document.getElementById('checkout-action')?.scrollIntoView({ behavior: 'smooth' })} className="w-full h-[64px] bg-zinc-900 text-white font-bold tracking-[0.2em] text-[11px] uppercase rounded-full hover:bg-zinc-800 transition-all duration-300 flex items-center justify-center shadow-xl">
                                    Reservar Unidad
                                </button>
                                <div className="flex items-center justify-center gap-2 mt-4 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                                    Logística e Instalación Local
                                </div>
                            </div>
                        </div>

                        <div className="relative z-10 lg:col-span-7 flex items-center justify-center p-2 lg:p-8">
                            {/* Reflexive Glass UI */}
                            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="w-full max-w-[450px] aspect-[4/6] relative bg-white border-8 border-zinc-100 shadow-2xl rounded-[3rem] overflow-hidden">
                                <div className="w-full h-full relative">
                                    <EnhancedProductGallery product={product} accentColor={accentDark} />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-white/40 pointer-events-none mix-blend-overlay"></div>
                                {/* HUD UI INSIDE MIRROR */}
                                <div className="absolute top-8 left-8 text-white font-light text-sm mix-blend-difference drop-shadow-md">
                                    <div className="text-4xl font-black mb-1">08:45</div>
                                    <div className="opacity-80 uppercase tracking-widest text-[9px]">Cardio Elite</div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* 4. TRUST BADGES TECHNICAL */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 pb-16">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            {v: '4K', l: 'Display Oculto'},
                            {v: 'Live', l: 'Feedback de Postura'},
                            {v: 'Hi-Fi', l: 'Audio Estéreo'},
                            {v: 'Cero', l: 'Huella de Gimnasio'}
                        ].map((b, i) => (
                            <div key={i} className="flex flex-col items-center justify-center p-6 border border-zinc-100 rounded-3xl bg-zinc-50/50">
                                <span className="text-zinc-900 font-extralight text-3xl tracking-tighter mb-1">{b.v}</span>
                                <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">{b.l}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 5. EXPERT ACCORDIONS */}
                <div className="max-w-4xl mx-auto px-4 md:px-8 py-20">
                    <div className="mb-12 text-center">
                        <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-zinc-900">El santuario es<br/>tu hogar.</h2>
                    </div>
                    <div className="bg-white border border-zinc-100 rounded-3xl overflow-hidden shadow-sm">
                        {[
                            { t: 'Tecnología Invisible', a: 'Nadie sabrá que tienes un gimnasio completo en tu cuarto. Apagado, es un espejo decorativo con marco de aluminio adonizado. Encendido, la pantalla LED 4K atraviesa el cristal unidireccional dándote métricas y clases HD.' },
                            { t: 'Corrección de Postura IA', a: 'La cámara gran angular ultra-discreta en la parte superior te observa mientras haces sentadillas, y te corrige en tiempo real si tus rodillas pasan la punta de tus pies. El entrenador te habla directamente.' },
                            { t: 'Catálogo sin fin', a: 'Boxeo, Yoga, Pilates o Fuerza Bruta. Accede a las aplicaciones conectadas para cambiar tu rutina diaria sin tener que comprar un solo disco o máquina que ocupe polvo en la casa.' }
                        ].map((ac, i) => (
                            <div key={i} className="border-b border-zinc-100 last:border-b-0">
                                <button onClick={() => setOpenSpecAcc(openSpecAcc===i?null:i)} className="w-full text-left p-6 md:p-8 flex items-center justify-between text-sm font-bold uppercase tracking-widest text-zinc-500 hover:text-zinc-900 transition-all bg-white hover:bg-zinc-50">
                                    <div className="flex items-center gap-4">
                                        <div className="w-8 h-8 rounded-full border border-zinc-200 text-zinc-400 font-light flex items-center justify-center">0{i+1}</div>
                                        {ac.t}
                                    </div>
                                    <span className="text-zinc-900 text-xl font-light">{openSpecAcc===i?'-':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {openSpecAcc === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 md:px-8 pb-8 pl-[4.5rem] text-sm font-normal text-zinc-500 leading-relaxed bg-white">
                                            {ac.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 7. BENEFITS CON IMAGENES UNSPLASH */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-24 border-y border-zinc-100 bg-zinc-50">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { img: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=1000&auto=format&fit=crop', t: 'Ballet & Barre', d: 'Perfecto para rutinas de alta estética donde la postura en el reflejo es vital.' },
                            { img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop', t: 'Personalizado', d: 'Conecta tu Apple Watch o Banda Cardíaca por Bluetooth y ve tus latidos flotar en el espejo.' },
                            { img: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1000&auto=format&fit=crop', t: 'Minimalismo Puro', d: 'Olvídate de pesas oxidadas en la esquina. Tu gimnasio cabe en el grosor de un cuadro de pared.' }
                        ].map((b, i) => (
                            <div key={i} className="bg-white border border-zinc-100 rounded-[2rem] overflow-hidden group hover:shadow-xl transition-all duration-500">
                                <div className="h-64 w-full relative overflow-hidden bg-zinc-100">
                                     <img src={b.img} alt={b.t} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90" />
                                </div>
                                <div className="p-8">
                                    <h3 className="text-lg font-black text-zinc-900 mb-2 uppercase tracking-wide">{b.t}</h3>
                                    <p className="text-sm font-normal text-zinc-500 leading-relaxed">{b.d}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 10. COMPARISON TABLE */}
                <div className="max-w-5xl mx-auto px-4 md:px-8 py-32">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black tracking-tighter text-zinc-900 uppercase">La Decisión Elite.</h2>
                    </div>
                    
                    <div className="bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-sm">
                        <div className="grid grid-cols-3 bg-zinc-50 border-b border-zinc-200 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                            <div className="p-6 md:p-8">Métrica Diaria</div>
                            <div className="p-6 md:p-8 text-center text-zinc-900 border-x border-zinc-200 bg-white">SMART MIRROR</div>
                            <div className="p-6 md:p-8 text-center">Gimnasio Comercial</div>
                        </div>
                        {[
                            { k: 'Tiempo de Viaje', u: '0 minutos', t: '40 minutos tráfico' },
                            { k: 'Privacidad', u: '100% Íntimo', t: 'Lleno a las 7:00 PM' },
                            { k: 'Estética del Cuarto', u: 'Aumenta el lujo del espacio', t: '-' },
                            { k: 'Mensualidades', u: 'Un solo pago de Hardware', t: 'Membresías eternas' }
                        ].map((r, i) => (
                            <div key={i} className="grid grid-cols-3 border-b border-zinc-100 last:border-b-0 text-sm">
                                <div className="p-6 md:p-8 font-bold text-zinc-700">{r.k}</div>
                                <div className="p-6 md:p-8 font-black text-zinc-900 text-center border-x border-zinc-100">{r.u}</div>
                                <div className="p-6 md:p-8 font-normal text-zinc-400 text-center opacity-70 line-through">{r.t}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 11. RISK REVERSAL WARRANTY */}
                <div className="max-w-5xl mx-auto px-4 md:px-8 py-12">
                    <div className="bg-zinc-900 p-10 md:p-14 text-white md:flex items-center gap-10 rounded-[2rem] shadow-xl">
                        <div className="relative z-10 w-full">
                            <h3 className="text-3xl font-extralight tracking-tight mb-4">Garantía Inmaculada y Logística Privada.</h3>
                            <p className="font-light text-zinc-400 leading-relaxed text-sm md:text-base max-w-3xl">
                                Los objetos de cristal deben tratarse con respeto. Es por ello que no usamos correos públicos. Nuestro equipo de logística White-Glove (Guante Blanco) llevará la unidad a la sala de su casa. Usted no inserta tarjetas en esta web; abona el costo total únicamente tras la desembalaje físico e inspección del cristal en su domicilio.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 15. CHECKOUT */}
                <div id="checkout-action" className="py-24 md:py-32 bg-white relative border-t-[1px] border-zinc-200">
                    <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24 items-center">
                        <div className="md:col-span-6 relative text-center md:text-left">
                            <h3 className="text-5xl md:text-6xl font-light tracking-tighter mb-4 text-zinc-900 leading-[1.1]">Tu reflejo,<br/><span className="font-black">evolucionado.</span></h3>
                            <p className="text-sm font-normal text-zinc-500 mb-10 leading-relaxed max-w-sm mx-auto md:mx-0">Solicite el dispositivo hoy. Pago en efectivo o transferencia contra entrega tras la inspección visual en puerta.</p>
                            
                            <div className="text-6xl font-black text-zinc-900 tracking-tighter">{fmtPrice(product.price)}</div>
                        </div>
                        
                        <div className="md:col-span-6 w-full border border-zinc-200 bg-zinc-50 p-8 md:p-12 rounded-[2rem] shadow-sm">
                            <form onSubmit={e=>e.preventDefault()}>
                                <div className="space-y-6">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Titular</label>
                                        <input type="text" className="w-full bg-white border border-zinc-200 focus:border-zinc-900 text-zinc-900 font-bold text-sm px-6 py-4 outline-none rounded-xl" placeholder="Nombre completo" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Línea Móvil</label>
                                        <input type="tel" className="w-full bg-white border border-zinc-200 focus:border-zinc-900 text-zinc-900 font-bold text-sm px-6 py-4 outline-none rounded-xl" placeholder="Teléfono" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Locación</label>
                                        <textarea rows={2} className="w-full bg-white border border-zinc-200 focus:border-zinc-900 text-zinc-900 font-bold text-sm px-6 py-4 outline-none resize-none rounded-xl" placeholder="Dirección de ensamblaje" />
                                    </div>
                                    <div className="pt-4">
                                        <button className="w-full h-[64px] bg-zinc-900 text-white font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-black transition-all rounded-full shadow-lg">
                                            Confirmar Enrutamiento
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

export default PdpSmartMirror;
