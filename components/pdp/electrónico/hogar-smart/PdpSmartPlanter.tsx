'use client';
import React, { useState } from 'react';
import { StoreData, Product } from '@/lib/types';
import EnhancedProductGallery from '@/components/pdp/EnhancedProductGallery';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { data: StoreData; product: Product; }

const PdpSmartPlanter: React.FC<Props> = ({ data, product }) => {
    const [openSpecAcc, setOpenSpecAcc] = useState<number | null>(0);
    const [faqOpen, setFaqOpen] = useState<number | null>(null);
    const ai = product.aiContent;
    const fmtPrice = (n: number) => { const s = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); return `Gs. ${s}`; };
    
    // Aesthetic Palette: Biophilic / Clean Nature / Zen Tech
    const bg = '#fbfdfc'; // Mint White
    const textMain = '#064e3b'; // Emerald 900
    const accentGreen = '#10b981'; // Emerald 500
    const accentSoil = '#78350f'; // Amber 900

    return (
        <div style={{ background: bg, color: textMain, fontFamily: "'Inter', sans-serif" }} className="overflow-x-hidden selection:bg-emerald-500/20 selection:text-emerald-900 antialiased">
            
            {/* 1. TOP NAV (Nature Tech) */}
            <header className="sticky top-0 z-50 bg-white/60 backdrop-blur-2xl border-b border-emerald-100">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-400 to-green-500 p-[2px]">
                            <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5"><path d="M12 22c4-4 8-9 8-14a8 8 0 1 0-16 0c0 5 4 10 8 14z"/><path d="M12 22V12"/></svg>
                            </div>
                        </div>
                        <span className="font-bold text-xl tracking-tight text-emerald-900 font-serif">
                            LIVING<span className="text-emerald-500 italic">ROOT.</span>
                        </span>
                    </div>
                </div>
            </header>

            <main className="relative z-10 w-full overflow-hidden">
                {/* 2. BREADCRUMBS & LOGISTICS */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6 pb-2">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-200 inline-flex items-center gap-2">
                            HOGAR SMART / JARDINERÍA / <span className="text-emerald-900">{product.title.substring(0, 15)}...</span>
                        </div>
                        <div className="inline-flex items-center gap-2 text-[10px] font-bold text-emerald-700 uppercase tracking-widest border-b border-emerald-300">
                            PAGO C.O.D RESIDENCIAL
                        </div>
                    </div>
                </div>

                {/* 3. HERO SECTION (ZEN GARDEN) */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 lg:py-16 relative">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
                        <div className="flex flex-col relative z-20 lg:col-span-5">
                            <h1 className="text-5xl md:text-7xl font-light tracking-tighter text-emerald-900 leading-[1] mb-6 font-serif italic text-balance">
                                {ai?.enhancedTitle || "Maceta Biótica Autocultivo"}
                            </h1>
                            <p className="text-base md:text-lg font-medium text-emerald-700 mb-10 leading-relaxed">
                                {ai?.enhancedDescription || "La tecnología al servicio de la botánica. Una maceta que se riega sola y proporciona la luz fotosintética exacta que tu planta necesita sin importar que vivas en un sótano."}
                            </p>

                            <div className="bg-white p-8 border border-emerald-100 rounded-[2rem] shadow-[0_20px_60px_rgba(16,185,129,0.06)] relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-[40px]"></div>
                                <div className="flex flex-col sm:flex-row sm:items-end gap-6 mb-8 relative z-10">
                                    <span className="text-5xl font-black text-emerald-900 tracking-tighter">{fmtPrice(product.price)}</span>
                                    {product.originalPrice && <span className="text-lg font-medium text-emerald-400 line-through pb-1">{fmtPrice(product.originalPrice)}</span>}
                                </div>
                                <button onClick={() => document.getElementById('checkout-action')?.scrollIntoView({ behavior: 'smooth' })} className="w-full h-[64px] bg-emerald-600 text-white font-bold uppercase tracking-widest text-[12px] hover:bg-emerald-700 transition-colors duration-300 flex items-center justify-center rounded-3xl shadow-lg">
                                    Cultivar Mi Espacio (C.O.D)
                                </button>
                                <div className="flex items-center justify-center mt-4 text-[10px] font-bold text-emerald-600/70 uppercase tracking-widest">
                                    Envíos físicos locales con pago en puerta
                                </div>
                            </div>
                        </div>

                        <div className="relative z-10 lg:col-span-7 flex items-center justify-center p-2 lg:p-8">
                            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="w-full max-w-[450px] aspect-[4/5] relative bg-white rounded-[4rem] p-4 shadow-[0_20px_50px_rgba(6,78,59,0.1)] border border-emerald-50">
                                <div className="w-full h-full relative overflow-hidden rounded-[3.5rem] bg-emerald-50/50">
                                    <EnhancedProductGallery product={product} accentColor={accentGreen} />
                                </div>
                                {/* HUD UI INSIDE PLANTER */}
                                <div className="absolute top-12 left-10 text-emerald-900 bg-white/80 backdrop-blur px-3 py-1.5 rounded-2xl shadow-sm border border-white text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span> Water: 85%
                                </div>
                                <div className="absolute top-24 left-10 text-emerald-900 bg-white/80 backdrop-blur px-3 py-1.5 rounded-2xl shadow-sm border border-white text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span> Light: 14h
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* 4. TRUST BADGES TECHNICAL */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 pb-16">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            {v: 'LED', l: 'Espectro Completo'},
                            {v: '2 L', l: 'Tanque Automático'},
                            {v: 'Wifi', l: 'App Botánica'},
                            {v: '10W', l: 'Bajo Consumo'}
                        ].map((b, i) => (
                            <div key={i} className="flex flex-col items-center justify-center p-6 bg-emerald-50/50 rounded-[2rem] border border-emerald-100">
                                <span className="text-emerald-900 font-medium text-3xl tracking-tighter mb-1 font-serif italic">{b.v}</span>
                                <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest">{b.l}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 5. EXPERT ACCORDIONS */}
                <div className="max-w-4xl mx-auto px-4 md:px-8 py-20 relative">
                    <div className="mb-12 text-center">
                        <h2 className="text-4xl md:text-5xl font-light tracking-tighter text-emerald-900 font-serif italic">Naturaleza <span className="text-emerald-500">Imposible de Matar.</span></h2>
                    </div>
                    <div className="bg-white border border-emerald-100 rounded-[2rem] shadow-sm overflow-hidden">
                        {[
                            { t: 'Riego Capilar Inteligente', a: 'Si eres de los que siempre olvida regar o, por el contrario, ahoga sus plantas; esta maceta tiene un tanque interno que dosifica el agua a la tierra usando mechas de algodón puro. La planta bebe solo lo que necesita por hasta 3 semanas continuas.' },
                            { t: 'Sol Artificial (Fotosíntesis real)', a: 'El brazo de aluminio retráctil esconde LEDs de espectro completo optimizados para promover el crecimiento e inducir la floración. Podrías tener una planta sana floreciendo dentro de un armario oscuro.' },
                            { t: 'Sensor de Nutrientes', a: 'Sus dos sondas de titanio incrustadas en el sustrato miden la conductividad de la tierra. La app de tu celular te enviará una notificación amigable el día exacto en que necesites echarle más fertilizante líquido.' }
                        ].map((ac, i) => (
                            <div key={i} className="border-b border-emerald-100 last:border-b-0">
                                <button onClick={() => setOpenSpecAcc(openSpecAcc===i?null:i)} className="w-full text-left p-6 md:p-8 flex items-center justify-between text-sm font-bold uppercase tracking-widest text-emerald-700 hover:text-emerald-900 hover:bg-emerald-50/50 transition-all bg-white">
                                    <div className="flex items-center gap-4">
                                        <div className="text-emerald-300 font-light text-2xl font-serif italic">0{i+1}</div>
                                        {ac.t}
                                    </div>
                                    <span className="text-emerald-500 font-medium text-2xl leading-none">{openSpecAcc===i?'-':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {openSpecAcc === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 md:px-8 pb-8 pl-[4rem] text-sm font-medium text-emerald-700/80 leading-relaxed bg-white font-serif">
                                            {ac.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 7. BENEFITS CON IMAGENES UNSPLASH */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-24 bg-emerald-900 border-y-8 border-emerald-800 text-white">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-light tracking-tighter text-white uppercase font-serif italic">Cultiva Vida.</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { img: 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?q=80&w=1000&auto=format&fit=crop', t: 'Horticultura Chef', d: 'Cultiva albahaca, romero y menta fresca directo en el mesón de tu cocina para usarlas en el acto en tus pestos.' },
                            { img: 'https://images.unsplash.com/photo-1492496913980-501348b61469?q=80&w=1000&auto=format&fit=crop', t: 'Biocontrol Terapéutico', d: 'Se ha comprobado que cuidar vida verde dentro de un departamento cerrado disminuye la ansiedad y filtra micro-toxinas del aire.' },
                            { img: 'https://images.unsplash.com/photo-1596547609652-9cb5d8d8cecc?q=80&w=1000&auto=format&fit=crop', t: 'Diseño Nórdico', d: 'Inyección de policarbonato blanco mate con inserciones de madera de fresno nórdico para combinar con salas minimalistas.' }
                        ].map((b, i) => (
                            <div key={i} className="group">
                                <div className="h-64 w-full relative overflow-hidden rounded-[2rem] mb-6">
                                     <img src={b.img} alt={b.t} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 opacity-90" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-black text-white mb-2 uppercase tracking-wide">{b.t}</h3>
                                    <p className="text-sm font-medium text-emerald-200/80 leading-relaxed text-balance">{b.d}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 11. RISK REVERSAL WARRANTY */}
                <div className="max-w-5xl mx-auto px-4 md:px-8 py-20">
                    <div className="bg-emerald-50 border border-emerald-200 p-10 md:p-14 rounded-[3rem] text-emerald-900 md:flex items-center gap-10">
                        <div className="w-20 h-20 shrink-0 border border-emerald-300 rounded-full flex items-center justify-center bg-white shadow-sm mb-6 md:mb-0">
                            <span className="text-emerald-500 font-serif font-black text-4xl italic">S</span>
                        </div>
                        <div className="relative z-10 w-full">
                            <h3 className="text-2xl font-black tracking-tight mb-3">Sembrado y Logística Blanca.</h3>
                            <p className="font-medium text-emerald-700/80 leading-relaxed text-sm">
                                Operamos sin pedir tu plástico online. Sometes el manifiesto de enrutamiento al final de esta página, y derivamos la caja grande sellada mediante courier físico humano. Recibes la unidad íntegra en la puerta de tu hogar o recepción de tu edificio, inspeccionas los plásticos y abonas directamente al transportista (Efectivo/Giro). Raíces seguras.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 15. CHECKOUT */}
                <div id="checkout-action" className="py-24 md:py-32 bg-white relative border-t-[1px] border-emerald-100">
                    <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24 items-center">
                        <div className="md:col-span-5 relative text-center md:text-left">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 mb-6 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-full inline-block">MANIFIESTO BOTÁNICO (C.O.D)</span>
                            <h3 className="text-5xl md:text-6xl font-black tracking-tighter mb-6 text-emerald-900 leading-[1] font-serif italic">Siembra Tu <br/>Reserva.</h3>
                            <p className="text-sm font-medium text-emerald-700 mb-10 leading-relaxed max-w-sm mx-auto md:mx-0">Pide ahora para recibir en tiempo récord vía cadete local asegurado.</p>
                            
                            <div className="text-6xl font-black text-emerald-900 tracking-tighter">{fmtPrice(product.price)}</div>
                        </div>
                        
                        <div className="md:col-span-7 w-full border border-emerald-100 bg-white p-8 md:p-12 rounded-[3rem] shadow-[0_20px_60px_rgba(16,185,129,0.06)] relative overflow-hidden">
                            <form onSubmit={e=>e.preventDefault()} className="relative z-10">
                                <div className="space-y-6">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Botánico (Responsable)</label>
                                        <input type="text" className="w-full bg-emerald-50 text-emerald-900 font-bold text-sm px-6 py-4 outline-none transition-all rounded-2xl border border-transparent focus:border-emerald-500" placeholder="Nombre Destinatario" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Enlace Celular</label>
                                        <input type="tel" className="w-full bg-emerald-50 text-emerald-900 font-bold text-sm px-6 py-4 outline-none transition-all rounded-2xl border border-transparent focus:border-emerald-500" placeholder="Número Celular" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Tierra Firme (Dirección)</label>
                                        <textarea rows={2} className="w-full bg-emerald-50 text-emerald-900 font-bold text-sm px-6 py-4 outline-none transition-all resize-none rounded-2xl border border-transparent focus:border-emerald-500" placeholder="Calle, ciudad, piso, puerta..." />
                                    </div>
                                    <div className="pt-6">
                                        <button className="w-full h-[70px] bg-emerald-600 text-white font-bold uppercase tracking-widest text-[13px] hover:bg-emerald-700 transition-colors rounded-3xl shadow-[0_10px_30px_rgba(16,185,129,0.3)]">
                                            Aprobar Despliegue Físico
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

export default PdpSmartPlanter;
