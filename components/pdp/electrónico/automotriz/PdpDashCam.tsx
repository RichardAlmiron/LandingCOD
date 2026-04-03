'use client';
import React, { useState } from 'react';
import { StoreData, Product } from '@/lib/types';
import EnhancedProductGallery from '@/components/pdp/EnhancedProductGallery';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { data: StoreData; product: Product; }

const PdpDashCam: React.FC<Props> = ({ data, product }) => {
    const [openSpecAcc, setOpenSpecAcc] = useState<number | null>(0);
    const [faqOpen, setFaqOpen] = useState<number | null>(null);
    const ai = product.aiContent;
    const fmtPrice = (n: number) => { const s = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); return `Gs. ${s}`; };
    
    // Aesthetic Palette: Automotive Stealth / Dark / Security
    const bg = '#000000'; // Pure Black
    const textMain = '#f1f5f9'; // Slate 100
    const accentRed = '#ef4444'; // Red 500 (Recording status)
    const accentDark = '#0f172a'; // Slate 900

    return (
        <div style={{ background: bg, color: textMain, fontFamily: "'Inter', sans-serif" }} className="overflow-x-hidden selection:bg-red-500/30 selection:text-white antialiased">
            
            {/* 1. TOP NAV (Security Core) */}
            <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-red-500/20">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex gap-1 items-center">
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                            <span className="w-2 h-2 rounded-full bg-red-500/50"></span>
                        </div>
                        <span className="font-extrabold text-xl tracking-[0.2em] text-white uppercase font-mono">
                            DASH<span className="text-red-500">PRO</span>
                        </span>
                    </div>
                </div>
            </header>

            <main className="relative z-10 w-full overflow-hidden">
                {/* 2. BREADCRUMBS & LOGISTICS */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6 pb-2">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 font-mono flex items-center gap-2">
                            <span>SEGURIDAD VIAL</span> / <span>VISUAL</span>
                        </div>
                        <div className="inline-flex items-center gap-2 text-[10px] font-black text-red-500 uppercase tracking-widest bg-red-500/10 px-4 py-2 border border-red-500/20">
                            INSPECCIÓN FÍSICA Y PAGO EN PUERTA
                        </div>
                    </div>
                </div>

                {/* 3. HERO SECTION (NIGHT VISION) */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 lg:py-16 relative">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
                        <div className="flex flex-col relative z-20 lg:col-span-5">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="text-[9px] font-black font-mono text-white bg-slate-900 border border-slate-700 uppercase tracking-widest px-3 py-1">
                                    [4K DUAL CAMERA + RADAR]
                                </span>
                            </div>
                            
                            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-[1.0] mb-4 uppercase">
                                {ai?.enhancedTitle || "DashCam Infrarrojo Nocturna"}
                            </h1>
                            <p className="text-base md:text-lg font-medium text-slate-400 mb-10 leading-snug">
                                {ai?.enhancedDescription || "Tu abogado silencioso en cada trayecto. Grabación frontal 4K y cabina 1080p con visión nocturna infrarroja. Nadie podrá mentir tras un accidente."}
                            </p>

                            <div className="w-full border border-slate-800 p-8 bg-slate-900/50 backdrop-blur-sm relative">
                                <div className="absolute top-0 right-0 p-4 font-mono text-red-500 text-xs">REC</div>
                                <div className="flex flex-col sm:flex-row sm:items-end gap-6 mb-8 relative z-10">
                                    <span className="text-5xl font-black tracking-tighter font-mono text-white">{fmtPrice(product.price)}</span>
                                    {product.originalPrice && <span className="text-lg font-bold text-slate-600 line-through pb-1 font-mono">{fmtPrice(product.originalPrice)}</span>}
                                </div>
                                <button onClick={() => document.getElementById('checkout-action')?.scrollIntoView({ behavior: 'smooth' })} className="w-full h-[64px] bg-red-600 text-white font-black uppercase tracking-[0.3em] text-[11px] hover:bg-white hover:text-black transition-all flex items-center justify-center">
                                    Asegurar Unidad (C.O.D)
                                </button>
                            </div>
                        </div>

                        <div className="relative z-10 lg:col-span-7 flex items-center justify-center p-2">
                            <div className="w-full max-w-[500px] aspect-video relative bg-slate-950 border border-slate-800 p-2 overflow-hidden shadow-2xl group">
                                {/* Simulador UI cámara */}
                                <div className="absolute inset-0 z-20 pointer-events-none p-4 flex flex-col justify-between opacity-30 group-hover:opacity-100 transition-opacity">
                                    <div className="flex justify-between font-mono text-[10px] text-white">
                                        <span>2026/04/05 21:45:10</span>
                                        <span className="text-red-500">120 KM/H</span>
                                    </div>
                                    <div className="w-full flex justify-center pb-2">
                                        <div className="w-32 h-16 border-2 border-green-500/50 border-dashed rounded-md flex items-center justify-center">
                                            <span className="text-[8px] font-mono text-green-500">LICENSE PLATE DETECTED</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full h-full relative z-10">
                                    <EnhancedProductGallery product={product} accentColor={accentRed} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. TRUST BADGES TECHNICAL */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 pb-16">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            {v: 'Loop 24/7', l: 'Grabación Continua'},
                            {v: 'G-Sensor', l: 'Bloqueo x Impacto'},
                            {v: 'IR LED', l: 'Visión Cabina'},
                            {v: 'WiFi App', l: 'Descarga de Pruebas'}
                        ].map((b, i) => (
                            <div key={i} className="flex flex-col p-6 bg-slate-950 border-l-2 border-slate-800">
                                <span className="text-white font-black text-2xl tracking-tight mb-2 uppercase">{b.v}</span>
                                <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest font-mono">{b.l}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 5. EXPERT ACCORDIONS */}
                <div className="max-w-4xl mx-auto px-4 md:px-8 py-20 relative border-t border-slate-900">
                    <div className="mb-10">
                        <h2 className="text-4xl font-black tracking-tighter text-white uppercase text-center font-mono">Testigo Incorruptible.</h2>
                    </div>
                    <div className="border border-slate-800">
                        {[
                            { t: 'Bloqueo G-Sensor Automático', a: 'Si alguien frena bruscamente o recibes un impacto, el acelerómetro interno de 3 Ejes sella instantáneamente ese clip de video. Ya no se podrá sobreescribir ni borrar accidentalmente. La prueba es tuya.' },
                            { t: 'Modo Parking Guard 24Hs', a: 'Incluso cuando el auto está apagado y estacionado. Si el radar detecta movimiento o impacto en el chasis, la cámara frontal despertará en un microsegundo y grabará la matrícula del infractor que rayó tu parachoques.' },
                            { t: 'Supercondensador (No Batería de Litio)', a: 'Diseñada para estar bajo el rayo del sol en el parabrisas a más de 60°C. Las baterías comerciales explotan o se abultan. Usamos supercondensadores para soportar calor extremo y seguir grabando con total seguridad.' }
                        ].map((ac, i) => (
                            <div key={i} className="border-b border-slate-800 last:border-b-0">
                                <button onClick={() => setOpenSpecAcc(openSpecAcc===i?null:i)} className="w-full text-left p-6 flex items-center justify-between text-xs font-black uppercase tracking-widest text-slate-300 hover:text-white bg-slate-950 hover:bg-slate-900 transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className="text-red-500 shrink-0 font-mono">[0{i+1}]</div>
                                        {ac.t}
                                    </div>
                                    <span className="text-red-500 text-xl font-light">{openSpecAcc===i?'-':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {openSpecAcc === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 pb-6 pl-[3.5rem] text-sm font-medium text-slate-400 bg-slate-950 leading-relaxed max-w-2xl">
                                            {ac.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 7. BENEFITS CON IMAGENES */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-24 bg-slate-950 border-y border-slate-900">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { img: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1000&auto=format&fit=crop', t: 'Visión Frontal 4K Sony', d: 'Matrículas legibles incluso a 20 metros de distancia, bajo la lluvia o en alta velocidad gracias al sensor estabilizado.' },
                            { img: 'https://images.unsplash.com/photo-1629367307044-8cb31b9efb8b?q=80&w=1000&auto=format&fit=crop', t: 'Infrarrojo IR Cabina', d: 'Si manejas Uber o Taxi, las 4 luces Infrarrojas iluminan la oscuridad total de los pasajeros traseros en monocromo nítido.' },
                            { img: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1000&auto=format&fit=crop', t: 'Transferencia Directa', d: 'No saques la MicroSD. Conecta tu móvil al WiFi integrado de la cámara y descarga el video del accidente en Segundos para la aseguradora.' }
                        ].map((b, i) => (
                            <div key={i} className="group">
                                <div className="h-48 w-full relative overflow-hidden mb-6 filter contrast-125 saturate-50 group-hover:saturate-100 transition-all border border-slate-800">
                                     <img src={b.img} alt={b.t} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                                </div>
                                <h3 className="text-xl font-black text-white mb-2 uppercase font-mono tracking-tight">{b.t}</h3>
                                <p className="text-sm font-medium text-slate-400 leading-relaxed text-balance">{b.d}</p>
                            </div>
                        ))}
                    </div>
                </div>

                 {/* 11. RISK REVERSAL WARRANTY */}
                 <div className="max-w-5xl mx-auto px-4 md:px-8 py-16">
                    <div className="bg-red-600 p-10 md:p-14 text-white md:flex items-center gap-10">
                        <div className="relative z-10 w-full">
                            <h3 className="text-3xl font-black tracking-tighter uppercase mb-2 font-mono">Pago Físico Aprobado.</h3>
                            <p className="font-bold text-red-100 leading-relaxed max-w-2xl text-sm md:text-base">
                                El proceso es simple y seguro. No cobramos en esta web. Toma la reserva sin utilizar plásticos, un repartidor blindado lleva la cámara de seguridad sellada de fábrica en el baúl de su moto hasta el estacionamiento de tu oficina o domicilio. Paga su costo exacto solo al recibir materialidad en la mano.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 15. CHECKOUT */}
                <div id="checkout-action" className="py-24 md:py-32 bg-slate-950 relative border-t-2 border-slate-900">
                    <div className="max-w-6xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24 items-center">
                        <div className="md:col-span-6 relative text-center md:text-left">
                            <h3 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 text-white uppercase leading-[0.9]">Protégete<br/><span className="text-red-500 line-through">Hoy</span></h3>
                            <p className="text-sm font-medium text-slate-500 mb-10 leading-relaxed font-mono">Terminal de Alta en Rutas Físicas.</p>
                            <div className="text-5xl font-black text-white tracking-tighter font-mono">{fmtPrice(product.price)}</div>
                        </div>
                        
                        <div className="md:col-span-6 w-full bg-black border border-slate-800 p-8 md:p-10">
                            <form onSubmit={e=>e.preventDefault()}>
                                <div className="space-y-6">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest font-mono">Piloto (Titular)</label>
                                        <input type="text" className="w-full bg-slate-900 text-white font-bold text-sm px-6 py-4 outline-none border border-transparent focus:border-red-500" placeholder="Nombre completo" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest font-mono">Frecuencia Móvil</label>
                                        <input type="tel" className="w-full bg-slate-900 text-white font-bold text-sm px-6 py-4 outline-none border border-transparent focus:border-red-500" placeholder="Número de celular" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest font-mono">Ubicación de Garaje</label>
                                        <textarea rows={2} className="w-full bg-slate-900 text-white font-bold text-sm px-6 py-4 outline-none resize-none border border-transparent focus:border-red-500" placeholder="Dirección precisa" />
                                    </div>
                                    <div className="pt-4">
                                        <button className="w-full h-[64px] bg-red-600 text-white font-black uppercase tracking-[0.2em] text-[11px] hover:bg-white hover:text-black transition-all font-mono">
                                            Aprobar Despacho C.O.D
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

export default PdpDashCam;
