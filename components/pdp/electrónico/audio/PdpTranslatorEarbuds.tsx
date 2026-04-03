'use client';
import React, { useState } from 'react';
import { StoreData, Product } from '@/lib/types';
import EnhancedProductGallery from '@/components/pdp/EnhancedProductGallery';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { data: StoreData; product: Product; }

const PdpTranslatorEarbuds: React.FC<Props> = ({ data, product }) => {
    const [openSpecAcc, setOpenSpecAcc] = useState<number | null>(0);
    const [faqOpen, setFaqOpen] = useState<number | null>(null);
    const ai = product.aiContent;
    const fmtPrice = (n: number) => { const s = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); return `Gs. ${s}`; };
    
    // Aesthetic Palette: Cloud / Flight / Global Traveler (Clean minimal UI like Airport Lounge)
    const bg = '#f8fafc'; // Slate 50
    const textMain = '#0f172a'; // Slate 900
    const accentBlue = '#2563eb'; // Blue 600

    return (
        <div style={{ background: bg, color: textMain, fontFamily: "'Inter', sans-serif" }} className="overflow-x-hidden selection:bg-blue-500/20 selection:text-blue-900 antialiased">
            
            {/* 1. TOP NAV */}
            <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><path d="m2 12 5.25 5 2.625-3M8 12l5.25 5L22 7m-6 5 2.625 2.5"/></svg>
                        </div>
                        <span className="font-extrabold text-lg tracking-tight text-slate-900">
                            VOICE<span className="text-blue-600 font-light">LINK</span> PRO
                        </span>
                    </div>
                </div>
            </header>

            <main className="relative z-10 w-full overflow-hidden">
                {/* 2. BREADCRUMBS & LOGISTICS */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6 pb-2">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 bg-slate-100 px-4 py-2 rounded-full inline-flex items-center gap-2">
                            AUDIO INTELIGENTE / <span className="text-slate-900">{product.title.substring(0, 15)}...</span>
                        </div>
                        <div className="inline-flex items-center gap-2 text-[10px] font-bold text-blue-600 uppercase tracking-widest border border-blue-200 bg-blue-50 px-4 py-2 rounded-full">
                            PAGO C.O.D. SEGURO
                        </div>
                    </div>
                </div>

                {/* 3. HERO SECTION */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 lg:py-16 relative">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
                        <div className="flex flex-col relative z-20 lg:col-span-5">
                            <div className="flex items-center gap-2 mb-6">
                                <span className="bg-slate-900 text-white text-[9px] uppercase font-bold tracking-widest px-3 py-1 rounded-full">
                                    144 IDIOMAS | 0.5s LATENCIA
                                </span>
                            </div>
                            
                            <h1 className="text-5xl md:text-6xl font-black tracking-tight text-slate-900 leading-[1] mb-6">
                                {ai?.enhancedTitle || "Audífonos de Traducción Universal"}
                            </h1>
                            <p className="text-base md:text-lg font-medium text-slate-600 mb-10 leading-relaxed max-w-md">
                                {ai?.enhancedDescription || "Rompe la barrera del idioma. El otro se pone un auricular, tú te pones el otro. Hablan en sus lenguas nativas y el IA traduce directo al canal auditivo en tiempo real."}
                            </p>

                            <div className="bg-white p-8 border border-slate-200 rounded-[2rem] shadow-xl relative mt-4">
                                <div className="flex flex-col sm:flex-row sm:items-end gap-6 mb-8 relative z-10">
                                    <span className="text-5xl font-black text-slate-900 tracking-tighter">{fmtPrice(product.price)}</span>
                                    {product.originalPrice && <span className="text-xl font-semibold text-slate-400 line-through pb-1">{fmtPrice(product.originalPrice)}</span>}
                                </div>
                                <button onClick={() => document.getElementById('checkout-action')?.scrollIntoView({ behavior: 'smooth' })} className="w-full h-[64px] bg-blue-600 text-white font-bold uppercase tracking-widest text-xs hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center rounded-2xl shadow-[0_10px_20px_rgba(37,99,235,0.2)]">
                                    Obtener Pasaporte Global
                                </button>
                                <div className="flex items-center justify-center mt-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                    Pagas al recibir en caja cerrada
                                </div>
                            </div>
                        </div>

                        <div className="relative z-10 lg:col-span-7 flex items-center justify-center p-2 lg:p-8">
                            <div className="w-full max-w-[500px] aspect-square relative bg-white rounded-full p-6 shadow-[0_20px_80px_rgba(0,0,0,0.06)] border border-slate-100 flex items-center justify-center">
                                <div className="absolute inset-0 bg-blue-500/5 rounded-full z-0"></div>
                                <div className="w-full h-full relative z-10 overflow-hidden rounded-full">
                                    <EnhancedProductGallery product={product} accentColor={accentBlue} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. TRUST BADGES TECHNICAL */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 pb-16">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            {v: '98%', l: 'Precisión IA'},
                            {v: '0.5s', l: 'Velocidad de Retorno'},
                            {v: 'Offline', l: 'Sin Roaming'},
                            {v: '15h', l: 'Autonomía'}
                        ].map((b, i) => (
                            <div key={i} className="flex flex-col items-center justify-center p-6 bg-white border border-slate-200 rounded-[2rem] shadow-sm">
                                <span className="text-slate-900 font-black text-3xl tracking-tighter mb-1">{b.v}</span>
                                <span className="text-[9px] font-bold text-blue-600 uppercase tracking-widest">{b.l}</span>
                            </div>
                        ))}
                    </div>
                </div>

                 {/* 5. EXPERT ACCORDIONS */}
                 <div className="max-w-4xl mx-auto px-4 md:px-8 py-20 bg-slate-100 rounded-[3rem]">
                    <div className="mb-10 text-center">
                        <h2 className="text-4xl font-black tracking-tight text-slate-900">Magia <span className="text-blue-600">Cognitiva.</span></h2>
                    </div>
                    <div className="space-y-4">
                        {[
                            { t: 'Modo Conversación Fluida', a: 'Sacas el estuche. Le das el audífono derecho a un nativo chino, tú te pones el izquierdo. Cuando él habla mandarín, tú escuchas español casi al instante en tu oído. Cuando tú respondes en español, él escucha mandarín. Sin tocar botones.' },
                            { t: 'Modo Clase / Reunión', a: '¿Atendiendo a un seminario en inglés? Ponte ambos audífonos, coloca tu teléfono sobre la mesa del profesor. El micrófono del teléfono capta la ponencia y los audífonos te la susurran en tu idioma en vivo.' },
                            { t: 'Traducción Offline Inteligente', a: 'Si estás en la calle de Tokyo sin WiFi ni chip de Roaming, la App almacena paquetes locales. Traduce los idiomas principales (Inglés, Chino, Coreano, Francés, Español) sin requerir internet de datos.' }
                        ].map((ac, i) => (
                            <div key={i} className="bg-white border text-left border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                <button onClick={() => setOpenSpecAcc(openSpecAcc===i?null:i)} className="w-full text-left p-6 md:p-8 flex items-center justify-between text-sm font-bold text-slate-800 transition-all bg-white">
                                    <div className="flex items-center gap-4">
                                        <div className="text-blue-600 bg-blue-50 w-8 h-8 rounded-full flex items-center justify-center shrink-0">0{i+1}</div>
                                        {ac.t}
                                    </div>
                                    <span className="text-slate-400 font-light text-2xl leading-none">{openSpecAcc===i?'-':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {openSpecAcc === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 md:px-8 pb-8 pl-[4.5rem] text-sm font-medium text-slate-500 leading-relaxed">
                                            {ac.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 7. BENEFITS CON IMAGENES */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-32">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black tracking-tight text-slate-900 mb-6 uppercase">Ciudadanos del <br/>Mundo.</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { img: 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?q=80&w=1000&auto=format&fit=crop', t: 'Viajes de Placer', d: 'Negocia regateos en mercados de Marruecos o pregunta direcciones en Seúl sin hacer muecas ni mímica vergonzosa.' },
                            { img: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=1000&auto=format&fit=crop', t: 'Negocios B2B', d: 'Cierra tratos comerciales con proveedores internacionales de fábrica, demostrando un alto nivel tecnológico y acortando la desconfianza.' },
                            { img: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1000&auto=format&fit=crop', t: 'Aprender Idiomas', d: 'Usa el modo "Práctica" para hablarle e identificar si tu pronunciación es correcta cruzando la data con motores IA.' }
                        ].map((b, i) => (
                            <div key={i} className="bg-white border border-slate-200 rounded-[2rem] overflow-hidden group shadow-sm hover:shadow-xl transition-all duration-500">
                                <div className="h-56 w-full relative overflow-hidden bg-slate-100">
                                     <img src={b.img} alt={b.t} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                </div>
                                <div className="p-8">
                                    <h3 className="text-lg font-black text-slate-900 mb-2">{b.t}</h3>
                                    <p className="text-sm font-medium text-slate-500 leading-relaxed">{b.d}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                 {/* 11. RISK REVERSAL WARRANTY */}
                 <div className="max-w-5xl mx-auto px-4 md:px-8 py-12">
                    <div className="bg-blue-600 p-10 md:p-14 rounded-[3rem] text-white md:flex items-center gap-10 shadow-xl overflow-hidden relative">
                        <div className="relative z-10 w-full">
                            <h3 className="text-3xl font-black tracking-tight mb-4">Embarque Libre de Estrés.</h3>
                            <p className="font-medium text-blue-100 leading-relaxed text-sm md:text-base">
                                Tu vuelo es mañana y no manejamos aduanas inciertas. Eludiendo pagos online rigurosos, nosotros te lo entregamos de forma táctica: Solicitas debajo, un courier oficial local llega a tu domicilio en el mismo día, y le pagas físicamente tras inspeccionar la integridad de la caja sellada. Total confianza, 0% riesgo.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 15. CHECKOUT */}
                <div id="checkout-action" className="py-24 md:py-32 bg-slate-50 relative border-t border-slate-200">
                    <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24 items-center">
                        <div className="md:col-span-5 relative text-center md:text-left">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 mb-6 bg-blue-100 px-4 py-2 rounded-full inline-block">MANIFIESTO DE RECEPCIÓN</span>
                            <h3 className="text-5xl md:text-6xl font-black tracking-tight mb-6 text-slate-900 leading-[1]">Abre el <br/>Diálogo.</h3>
                            <p className="text-sm font-medium text-slate-500 mb-10 leading-relaxed">Firma el manifiesto para programar el despacho físico C.O.D (Pagas al repartidor local al recibir).</p>
                            
                            <div className="text-6xl font-black text-slate-900 tracking-tighter">{fmtPrice(product.price)}</div>
                        </div>
                        
                        <div className="md:col-span-7 w-full border border-slate-200 bg-white p-8 md:p-12 rounded-[2rem] shadow-xl">
                            <form onSubmit={e=>e.preventDefault()}>
                                <div className="space-y-6">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pasajero Titular</label>
                                        <input type="text" className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 text-slate-900 font-bold text-sm px-6 py-4 outline-none transition-all rounded-xl shadow-inner" placeholder="Nombre Destinatario" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Contacto Local</label>
                                        <input type="tel" className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 text-slate-900 font-bold text-sm px-6 py-4 outline-none transition-all rounded-xl shadow-inner" placeholder="Número Celular" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Coordenada de Entrega</label>
                                        <textarea rows={2} className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 text-slate-900 font-bold text-sm px-6 py-4 outline-none transition-all resize-none rounded-xl shadow-inner" placeholder="Dirección Postal" />
                                    </div>
                                    <div className="pt-4">
                                        <button className="w-full h-[64px] bg-blue-600 text-white font-bold uppercase tracking-widest text-[12px] hover:bg-slate-900 transition-colors rounded-xl shadow-lg">
                                            Emitir Orden (Efectivo/COD)
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

export default PdpTranslatorEarbuds;
