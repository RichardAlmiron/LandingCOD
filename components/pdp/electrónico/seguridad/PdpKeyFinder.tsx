'use client';
import React, { useState } from 'react';
import { StoreData, Product } from '@/lib/types';
import EnhancedProductGallery from '@/components/pdp/EnhancedProductGallery';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { data: StoreData; product: Product; }

const PdpKeyFinder: React.FC<Props> = ({ data, product }) => {
    const [openSpecAcc, setOpenSpecAcc] = useState<number | null>(0);
    const [faqOpen, setFaqOpen] = useState<number | null>(null);
    const ai = product.aiContent;
    const fmtPrice = (n: number) => { const s = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); return `Gs. ${s}`; };
    
    // Aesthetic Palette: Minimalist Tracker / White & Silver
    const bg = '#f8fafc'; // Slate 50
    const textMain = '#334155'; // Slate 700
    const accentBlue = '#3b82f6'; // Blue 500 (Bluetooth pairing)
    const accentDark = '#0f172a'; // Slate 900

    return (
        <div style={{ background: bg, color: textMain, fontFamily: "'Inter', sans-serif" }} className="overflow-x-hidden selection:bg-blue-500/20 selection:text-blue-900 antialiased">
            
            {/* 1. TOP NAV (Apple-esque Clean) */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center">
                            <span className="w-3 h-3 border-[2px] border-white rounded-full"></span>
                        </div>
                        <span className="font-semibold text-lg tracking-tight text-slate-900">
                            Omni<span className="font-light text-slate-500">Track</span>
                        </span>
                    </div>
                </div>
            </header>

            <main className="relative z-10 w-full overflow-hidden">
                {/* 2. BREADCRUMBS & LOGISTICS */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 pb-2">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="text-[11px] font-medium text-slate-500 inline-flex items-center gap-2">
                            Tecnología / Seguridad / <span className="text-slate-900">{product.title.substring(0, 15)}...</span>
                        </div>
                        <div className="inline-flex items-center gap-2 text-[10px] font-bold text-slate-900 uppercase tracking-widest bg-slate-100 px-3 py-1.5 rounded-full">
                            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span> PAGO CONTRA ENTREGA LOCAL
                        </div>
                    </div>
                </div>

                {/* 3. HERO SECTION (MINIMALIST) */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 lg:py-16 relative">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
                        <div className="flex flex-col relative z-20 lg:col-span-5 text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-2 mb-6">
                                <span className="border border-slate-300 text-slate-500 text-[10px] font-bold tracking-widest px-3 py-1 rounded-full uppercase">
                                    Localización Global MFi
                                </span>
                            </div>
                            
                            <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-slate-900 leading-[1.05] mb-6">
                                {ai?.enhancedTitle || "Rastreador GPS Slim"}
                            </h1>
                            <p className="text-base md:text-lg text-slate-500 mb-10 leading-relaxed max-w-md mx-auto md:mx-0 font-light">
                                {ai?.enhancedDescription || "Nunca más digas '¿dónde dejé las llaves?'. Pégalo a tu cartera o collar de mascota. Usa la red global de dispositivos Apple para ubicarlo en un mapa sin pagar mensualidad."}
                            </p>

                            <div className="bg-white p-8 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.04)] border border-slate-100 relative">
                                <div className="flex flex-col sm:flex-row sm:items-end justify-center md:justify-start gap-6 mb-8 relative z-10">
                                    <span className="text-5xl font-bold text-slate-900 tracking-tighter">{fmtPrice(product.price)}</span>
                                    {product.originalPrice && <span className="text-xl text-slate-400 line-through pb-1">{fmtPrice(product.originalPrice)}</span>}
                                </div>
                                <button onClick={() => document.getElementById('checkout-action')?.scrollIntoView({ behavior: 'smooth' })} className="w-full md:w-auto px-10 h-[60px] bg-slate-900 text-white font-semibold text-sm hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center rounded-full shadow-lg mx-auto md:mx-0">
                                    Comprar y Pagar en Casa (C.O.D)
                                </button>
                            </div>
                        </div>

                        <div className="relative z-10 lg:col-span-7 flex items-center justify-center p-2 lg:p-8">
                            <div className="w-full max-w-[450px] aspect-square relative bg-white rounded-full p-8 shadow-[0_30px_60px_rgba(0,0,0,0.06)] border border-slate-100 flex items-center justify-center">
                                {/* Bluetooth ping waves */}
                                <div className="absolute inset-0 border border-blue-100 rounded-full animate-[ping_3s_ease-out_infinite] opacity-50"></div>
                                <div className="absolute inset-8 border border-slate-50 rounded-full"></div>
                                
                                <div className="w-full h-full relative z-10 rounded-full overflow-hidden bg-slate-50">
                                    <EnhancedProductGallery product={product} accentColor={accentDark} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. TRUST BADGES TECHNICAL */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 pb-16">
                    <div className="flex flex-wrap justify-center md:justify-between gap-4 md:gap-8 border-y border-slate-200 py-10">
                        {[
                            {v: 'Batería 1 Año', l: 'CR2032 Reemplazable'},
                            {v: 'Alarma 90dB', l: 'Altavoz Integrado'},
                            {v: 'IP67', l: 'Resistente al Agua'},
                            {v: 'Apple Find My', l: 'Red Nativa iOS'}
                        ].map((b, i) => (
                            <div key={i} className="flex flex-col items-center justify-center text-center px-4 w-[40%] md:w-auto">
                                <span className="text-slate-900 font-bold text-xl mb-1">{b.v}</span>
                                <span className="text-[10px] text-slate-500 uppercase tracking-wider">{b.l}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 5. EXPERT ACCORDIONS */}
                <div className="max-w-4xl mx-auto px-4 md:px-8 py-20">
                    <div className="mb-12 text-center">
                        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900">¿Cómo Funciona Sin Chip Móvil?</h2>
                    </div>
                    <div className="space-y-4">
                        {[
                            { t: 'Red Global de Búsqueda', a: 'No necesita un chip claro, tigo o personal. Emite una señal Bluetooth segura que es detectada por cualquier iPhone cercano en el mundo. Esos dispositivos envían la ubicación de tu objeto a la nube, y tú la ves en tu mapa. Todo encriptado y anónimo.' },
                            { t: 'Modo "Reproducir Sonido"', a: 'Si estás en tu casa y sabes que la billetera está cerca pero no la ves, abre la App y presiona "Sonar". El rastreador emitirá un pitido agudo de 90 decibelios guiándote directo hasta debajo del sillón.' },
                            { t: 'Notificación de "Olvido"', a: 'El modo de separación te salva la vida. Si sales de un restaurante y dejas las llaves en la mesa, tu celular te enviará una notificación a las dos cuadras diciéndote "Has dejado a OMNI-TRACK atrás".' }
                        ].map((ac, i) => (
                            <div key={i} className="bg-white border text-left border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                <button onClick={() => setOpenSpecAcc(openSpecAcc===i?null:i)} className="w-full text-left p-6 md:p-8 flex items-center justify-between text-sm font-semibold text-slate-800 transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className="text-blue-500 bg-blue-50 w-8 h-8 rounded-full flex items-center justify-center shrink-0">0{i+1}</div>
                                        {ac.t}
                                    </div>
                                    <span className="text-slate-400 font-light text-2xl leading-none">{openSpecAcc===i?'-':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {openSpecAcc === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 md:px-8 pb-8 pl-[4.5rem] text-sm font-light text-slate-600 leading-relaxed">
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
                        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900 mb-6">Pierde el <span className="text-blue-600">Miedo a Perder.</span></h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { img: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1000&auto=format&fit=crop', t: 'Mascotas Escapistas', d: 'Cuélgalo del collar de tu perro/gato. Si se escapan por la puerta, podrás ver por qué calles del barrio están corriendo en tiempo real.' },
                            { img: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1000&auto=format&fit=crop', t: 'Equipaje de Vuelo', d: 'Mételo en tu maleta antes de entregarla en el aeropuerto. Sabrás exactamente si tu maleta abordó tu mismo avión o se quedó en otro país.' },
                            { img: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?q=80&w=1000&auto=format&fit=crop', t: 'Llaves del Coche', d: 'Evita perder 40 minutos en la mañana volteando abrigos y cajones. Toca el botón y sigue el sonido hasta encontrarlas.' }
                        ].map((b, i) => (
                            <div key={i} className="bg-white border border-slate-100 rounded-[2rem] overflow-hidden group shadow-sm">
                                <div className="h-56 w-full relative overflow-hidden bg-slate-100">
                                     <img src={b.img} alt={b.t} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                </div>
                                <div className="p-8">
                                    <h3 className="text-lg font-semibold text-slate-900 mb-2">{b.t}</h3>
                                    <p className="text-sm font-light text-slate-500 leading-relaxed">{b.d}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 11. RISK REVERSAL WARRANTY */}
                <div className="max-w-5xl mx-auto px-4 md:px-8 py-12">
                    <div className="bg-slate-900 p-10 md:p-14 rounded-3xl text-white md:flex items-center justify-between gap-10 shadow-2xl relative">
                        <div className="relative z-10 w-full md:w-2/3">
                            <h3 className="text-2xl font-semibold tracking-tight mb-4">Recepción Segura (C.O.D)</h3>
                            <p className="font-light text-slate-300 leading-relaxed text-sm md:text-base">
                                Sin necesidad de rellenar tarjetas de crédito ni exponer tus datos. Te enviamos el rastreador al domicilio y solo cuando lo tienes en tu mano cerrado, le entregas el dinero en billetes o transferencia a nuestro motorista. Fácil y libre de fricciones.
                            </p>
                        </div>
                        <div className="w-16 h-16 shrink-0 bg-blue-500 rounded-full flex items-center justify-center mt-6 md:mt-0">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M5 12l5 5L20 7"/></svg>
                        </div>
                    </div>
                </div>

                {/* 15. CHECKOUT */}
                <div id="checkout-action" className="py-24 md:py-32 bg-white relative border-t border-slate-200">
                    <div className="max-w-5xl mx-auto px-4 md:px-8 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div className="relative text-center md:text-left">
                            <h3 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6 text-slate-900 leading-[1.1]">No pierdas la <br/>pista.</h3>
                            <p className="text-sm font-light text-slate-600 mb-10 leading-relaxed md:pr-10">Carga tus datos físicos para el envío. Pagas el total del producto en persona cuando llega a tu puerta.</p>
                            
                            <div className="text-5xl font-bold text-slate-900 tracking-tighter">{fmtPrice(product.price)}</div>
                        </div>
                        
                        <div className="w-full bg-slate-50 border border-slate-200 p-8 md:p-10 rounded-3xl shadow-sm">
                            <form onSubmit={e=>e.preventDefault()}>
                                <div className="space-y-6">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[11px] font-semibold text-slate-700">Nombre de quien recibe</label>
                                        <input type="text" className="w-full bg-white border border-slate-300 focus:border-blue-500 text-slate-900 font-medium text-sm px-5 py-4 outline-none transition-all rounded-xl" placeholder="Ej: Juan Pérez" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[11px] font-semibold text-slate-700">Celular de contacto</label>
                                        <input type="tel" className="w-full bg-white border border-slate-300 focus:border-blue-500 text-slate-900 font-medium text-sm px-5 py-4 outline-none transition-all rounded-xl" placeholder="Para avisar cuando llegue" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[11px] font-semibold text-slate-700">Dirección completa</label>
                                        <textarea rows={2} className="w-full bg-white border border-slate-300 focus:border-blue-500 text-slate-900 font-medium text-sm px-5 py-4 outline-none transition-all resize-none rounded-xl" placeholder="Calle, Nro, Casa/Depto..." />
                                    </div>
                                    <div className="pt-4">
                                        <button className="w-full h-[60px] bg-blue-600 text-white font-semibold text-[14px] hover:bg-slate-900 transition-colors rounded-xl shadow-md">
                                            Hacer Pedido (Pago Contra Entrega)
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

export default PdpKeyFinder;
