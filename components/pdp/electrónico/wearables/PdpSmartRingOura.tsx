'use client';
import React, { useState } from 'react';
import { StoreData, Product } from '@/lib/types';
import EnhancedProductGallery from '@/components/pdp/EnhancedProductGallery';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { data: StoreData; product: Product; }

const PdpSmartRingOura: React.FC<Props> = ({ data, product }) => {
    const [openSpecAcc, setOpenSpecAcc] = useState<number | null>(0);
    const [faqOpen, setFaqOpen] = useState<number | null>(null);
    const ai = product.aiContent;
    const fmtPrice = (n: number) => { const s = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); return `Gs. ${s}`; };
    
    // Aesthetic Palette: Luxury Minimal / Rose Gold & Obsidian
    const bg = '#fffbfc'; // Ultra light warm grey/pink
    const textMain = '#1c1917'; // Stone 900
    const accentRose = '#b45309'; // Rose Gold/Copper accent (Amber 700)
    const accentObsidian = '#0c0a09'; // Stone 950

    return (
        <div style={{ background: bg, color: textMain, fontFamily: "'Inter', sans-serif" }} className="overflow-x-hidden selection:bg-amber-900/10 selection:text-amber-900 antialiased">
            
            {/* 1. TOP NAV (Luxury Minimal) */}
            <header className="sticky top-0 z-50 bg-[#fffbfc]/80 backdrop-blur-2xl border-b border-stone-200">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full border-[1.5px] border-amber-800 flex items-center justify-center p-1">
                            <div className="w-full h-full rounded-full border-[1px] border-amber-800/50"></div>
                        </div>
                        <span className="font-serif text-2xl tracking-[0.15em] text-stone-900 uppercase">
                            AEON<span className="font-sans font-light tracking-widest text-amber-800 text-sm ml-2">Ring</span>
                        </span>
                    </div>
                </div>
            </header>

            <main className="relative z-10 w-full overflow-hidden">
                {/* 2. BREADCRUMBS & LOGISTICS */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 pb-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="text-[9px] font-sans uppercase tracking-[0.3em] text-stone-500 border-b border-stone-300 pb-1 inline-flex items-center gap-2">
                            WEARABLES / SALUD / <span className="text-amber-800">{product.title.substring(0, 15)}...</span>
                        </div>
                        <div className="inline-flex items-center gap-2 text-[9px] font-sans text-stone-900 uppercase tracking-[0.2em]">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                            PRIVILEGIO C.O.D (ABONO AL RECIBIR)
                        </div>
                    </div>
                </div>

                {/* 3. HERO SECTION (VOGUE / HIGH FASHION TECH) */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 lg:py-20 relative">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
                        <div className="flex flex-col relative z-20 lg:col-span-5 order-2 lg:order-1">
                            <div className="flex items-center gap-2 mb-8">
                                <span className="text-amber-800 text-[10px] font-sans uppercase tracking-[0.4em] relative">
                                    TITANIO GRADO AEROESPACIAL
                                </span>
                            </div>
                            
                            <h1 className="text-5xl md:text-7xl font-serif text-stone-900 leading-[1.1] mb-8">
                                {ai?.enhancedTitle || "El Anillo de la Longevidad."}
                            </h1>
                            <p className="text-sm md:text-base font-light text-stone-500 mb-12 leading-relaxed tracking-wider max-w-sm">
                                {ai?.enhancedDescription || "Toda la inteligencia de un laboratorio del sueño en 3 gramos de titanio. Conoce tus niveles de estrés, HRV y temperatura basal sin usar una pantalla invasiva."}
                            </p>

                            <div className="border border-stone-200 bg-white p-8 md:p-10 shadow-sm relative">
                                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-amber-50 to-transparent"></div>
                                <div className="flex flex-col mb-10 relative z-10">
                                    <span className="text-sm font-sans tracking-[0.2em] text-stone-400 uppercase mb-2">Inversión en Salud</span>
                                    <span className="text-4xl md:text-5xl font-serif text-stone-900">{fmtPrice(product.price)}</span>
                                </div>
                                <button onClick={() => document.getElementById('checkout-action')?.scrollIntoView({ behavior: 'smooth' })} className="w-full h-[60px] bg-stone-950 text-white font-sans uppercase tracking-[0.2em] text-[11px] hover:bg-amber-900 transition-colors duration-500 flex items-center justify-center">
                                    Solicitar Medida (C.O.D)
                                </button>
                            </div>
                        </div>

                        <div className="relative z-10 lg:col-span-7 flex items-center justify-center p-2 lg:p-8 order-1 lg:order-2">
                            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: "easeOut" }} className="w-full max-w-[500px] aspect-[4/5] relative bg-stone-100/50 p-2 border border-stone-200">
                                <div className="w-full h-full relative z-10 overflow-hidden bg-white">
                                    <EnhancedProductGallery product={product} accentColor={accentRose} />
                                </div>
                                {/* Minimalist Data Annotations */}
                                <div className="absolute top-20 -left-6 z-20 bg-white border border-stone-200 px-4 py-3 shadow-sm flex flex-col pointer-events-none">
                                    <span className="text-[8px] text-stone-400 uppercase tracking-widest font-sans mb-1">Heart Rate</span>
                                    <span className="font-serif text-xl text-stone-900">58 <span className="text-xs font-sans">BPM</span></span>
                                </div>
                                <div className="absolute bottom-32 -right-6 z-20 bg-white border border-stone-200 px-4 py-3 shadow-sm flex flex-col text-right pointer-events-none">
                                    <span className="text-[8px] text-amber-800 uppercase tracking-widest font-sans mb-1">Sleep Score</span>
                                    <span className="font-serif text-xl text-stone-900">92<span className="text-xs font-sans">%</span></span>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* 4. TRUST BADGES TECHNICAL */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 pb-20">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 border-t border-b border-stone-200 py-12">
                        {[
                            {v: '3g', l: 'Peso Ultraligero'},
                            {v: '7d', l: 'Autonomía Batería'},
                            {v: '50m', l: 'Resistencia Agua'},
                            {v: 'NTC', l: 'Sensor Temperatura'}
                        ].map((b, i) => (
                            <div key={i} className="flex flex-col items-center justify-center text-center">
                                <span className="text-stone-900 font-serif text-3xl mb-3">{b.v}</span>
                                <span className="text-[9px] font-sans text-stone-500 uppercase tracking-[0.2em]">{b.l}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 5. EXPERT ACCORDIONS */}
                <div className="max-w-4xl mx-auto px-4 md:px-8 py-20">
                    <div className="mb-16 text-center">
                        <span className="text-[10px] text-amber-800 uppercase tracking-[0.3em] font-sans mb-4 block">BIOMETRÍA SILENCIOSA</span>
                        <h2 className="text-4xl md:text-5xl font-serif text-stone-900">Ingeniería <span className="italic text-amber-800">Interior.</span></h2>
                    </div>
                    <div className="space-y-0 border-t border-stone-200">
                        {[
                            { t: 'Sensores de Grado Médico', a: 'Mientras duermes, los LEDs infrarrojos leen el pulso directamente desde las arterias de tu dedo índice o anular, mucho más precisos que los sensores de muñeca de un smartwatch porque evitan la interferencia del hueso y vello.' },
                            { t: 'Desconexión Digital', a: 'No hay pantallas, no hay notificaciones vibrando ni luces distrayéndote. Es una joya de titanio que recopila datos en silencio y los sincroniza con tu iPhone/Android solo cuando tú decides abrir la App.' },
                            { t: 'Predicción de Enfermedad', a: 'El sensor NTC mide micro variaciones de temperatura térmica basal cada minuto. La aplicación puede alertarte si desarrollarás fiebre o un resfriado 2 días antes de que presentes el primer síntoma.' }
                        ].map((ac, i) => (
                            <div key={i} className="border-b border-stone-200">
                                <button onClick={() => setOpenSpecAcc(openSpecAcc===i?null:i)} className="w-full text-left py-8 flex items-start justify-between text-base font-serif text-stone-900 transition-all hover:text-amber-800">
                                    <div className="flex gap-6">
                                        <span className="text-stone-300 font-sans text-xs tracking-widest mt-1">0{i+1}</span>
                                        <span>{ac.t}</span>
                                    </div>
                                    <span className="text-stone-400 font-light text-2xl leading-none">{openSpecAcc===i?'-':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {openSpecAcc === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="pb-8 pl-[2.8rem] md:pl-[3.5rem] text-sm font-light text-stone-500 leading-loose tracking-wide">
                                            {ac.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 7. BENEFITS CON IMAGENES UNSPLASH */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-24 mb-16 bg-stone-100">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-serif text-stone-900 mb-6">El Anillo <span className="italic text-amber-800">Invisible.</span></h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { img: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1000&auto=format&fit=crop', t: 'Arte & Elegancia', d: 'El titanio pulido resiste rayones diarios. Nadie sabrá que llevas un potente laboratorio biométrico; pensarán que es alta joyería.' },
                            { img: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=80&w=1000&auto=format&fit=crop', t: 'Cronotipo de Sueño', d: 'Analiza tus fases REM, profunda y ligera. Te dice a qué hora exacta tu cuerpo tiene la mayor predisposición genética para ir a dormir.' },
                            { img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1000&auto=format&fit=crop', t: 'Tasa de Recuperación', d: 'Observa tu Variabilidad de Frecuencia Cardíaca (HRV). Sabrás si tu cuerpo está listo para un entrenamiento duro o si debes descansar ese día.' }
                        ].map((b, i) => (
                            <div key={i} className="bg-white p-4 pb-8 transition-shadow hover:shadow-lg border border-stone-200">
                                <div className="h-64 w-full relative overflow-hidden mb-6 filter sepia-[0.2]">
                                     <img src={b.img} alt={b.t} className="w-full h-full object-cover" />
                                </div>
                                <div className="px-4">
                                    <h3 className="text-xl font-serif text-stone-900 mb-3">{b.t}</h3>
                                    <p className="text-xs font-light text-stone-500 leading-loose tracking-wide">{b.d}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 11. RISK REVERSAL WARRANTY */}
                <div className="max-w-4xl mx-auto px-4 md:px-8 py-16">
                    <div className="border border-stone-300 p-10 md:p-16 text-center bg-white shadow-sm relative">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#fffbfc] px-4">
                            <div className="w-8 h-8 flex items-center justify-center">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#b45309" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                            </div>
                        </div>
                        <h3 className="text-2xl font-serif text-stone-900 mb-6 uppercase tracking-widest mt-4">Transacción de Guante Blanco.</h3>
                        <p className="font-light text-stone-600 leading-loose text-sm">
                            El lujo se experimenta, no se cobra por adelantado. Una vez dejes tu solicitud, nos pondremos en contacto para definir la talla (Size 6 a 13). Luego, nuestro enviado local llevará la pieza hasta tu residencia u oficina en un sobre lacrado. Podrás examinar su acabado en titanio y abonarás en Efectivo de manera segura y privada solo tras tu absoluta conformidad.
                        </p>
                    </div>
                </div>

                {/* 15. CHECKOUT */}
                <div id="checkout-action" className="py-24 md:py-32 bg-stone-950 relative mt-12">
                    <div className="max-w-5xl mx-auto px-4 md:px-8 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div className="relative text-center md:text-left pr-0 md:pr-12">
                            <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-amber-600 mb-6 block">FORMULARIO DE ADQUISICIÓN</span>
                            <h3 className="text-5xl md:text-6xl font-serif mb-8 text-white leading-[1.1]">Posee Tu <br/><span className="text-stone-400 italic">Evolución.</span></h3>
                            <p className="text-sm font-light text-stone-400 mb-12 leading-loose">Solo requerimos los detalles de entrega. Nuestro asesor biométrico organizará la entrega física (Modalidad C.O.D).</p>
                            
                            <div className="text-5xl font-serif text-white">{fmtPrice(product.price)}</div>
                        </div>
                        
                        <div className="w-full bg-stone-900 p-8 md:p-10 border border-stone-800">
                            <form onSubmit={e=>e.preventDefault()}>
                                <div className="space-y-8">
                                    <div className="flex flex-col gap-3">
                                        <label className="text-[9px] font-sans text-stone-500 uppercase tracking-[0.3em]">Titular (Nombre)</label>
                                        <input type="text" className="w-full bg-transparent border-b border-stone-700 focus:border-amber-700 text-white font-serif text-base pb-3 outline-none transition-colors" placeholder="Tu nombre..." />
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <label className="text-[9px] font-sans text-stone-500 uppercase tracking-[0.3em]">Comunicación (Celular)</label>
                                        <input type="tel" className="w-full bg-transparent border-b border-stone-700 focus:border-amber-700 text-white font-serif text-base pb-3 outline-none transition-colors" placeholder="Línea activa..." />
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <label className="text-[9px] font-sans text-stone-500 uppercase tracking-[0.3em]">Residencia (Dirección Central)</label>
                                        <textarea rows={2} className="w-full bg-transparent border-b border-stone-700 focus:border-amber-700 text-white font-serif text-base pb-3 outline-none transition-colors resize-none" placeholder="Dirección formal para la visita..." />
                                    </div>
                                    <div className="pt-8">
                                        <button className="w-full h-[60px] bg-white text-stone-950 font-sans uppercase tracking-[0.2em] text-[11px] hover:bg-amber-800 hover:text-white transition-colors duration-500 shadow-xl">
                                            Autorizar Visita Privada (Pagar C.O.D)
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

export default PdpSmartRingOura;
