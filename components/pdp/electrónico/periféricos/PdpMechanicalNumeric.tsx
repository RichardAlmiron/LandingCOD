'use client';
import React, { useState } from 'react';
import { StoreData, Product } from '@/lib/types';
import EnhancedProductGallery from '@/components/pdp/EnhancedProductGallery';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { data: StoreData; product: Product; }

const PdpMechanicalNumeric: React.FC<Props> = ({ data, product }) => {
    const [openSpecAcc, setOpenSpecAcc] = useState<number | null>(0);
    const [faqOpen, setFaqOpen] = useState<number | null>(null);
    const ai = product.aiContent;
    const fmtPrice = (n: number) => { const s = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); return `Gs. ${s}`; };
    
    // Aesthetic Palette: Hacker / Hacker Desk / Mechanical RGB
    const bg = '#09090b'; // Zinc 950
    const textMain = '#e4e4e7'; // Zinc 200
    const accentGreen = '#10b981'; // Emerald 500
    const accentPurple = '#a855f7'; // Purple 500

    return (
        <div style={{ background: bg, color: textMain, fontFamily: "'Inter', sans-serif" }} className="overflow-x-hidden selection:bg-emerald-500/30 selection:text-emerald-300 antialiased">
            
            {/* 1. TOP NAV (Hacker Terminal style) */}
            <header className="sticky top-0 z-50 bg-[#09090b]/90 backdrop-blur-md border-b border-zinc-800">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="text-emerald-500 font-mono text-xl font-bold border border-emerald-500 px-2 py-0.5 rounded shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                            0xPAD
                        </div>
                        <span className="font-mono text-sm tracking-widest text-zinc-400 hidden sm:block">
                            ~/devices/input/numpad
                        </span>
                    </div>
                </div>
            </header>

            <main className="relative z-10 w-full overflow-hidden">
                {/* 2. BREADCRUMBS & LOGISTICS */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6 pb-2">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="text-xs font-mono text-zinc-500">
                            <span className="text-emerald-500">$</span> cd PERIFERICOS / <span className="text-zinc-300">{product.title.substring(0, 15)}...</span> _
                        </div>
                        <div className="inline-flex items-center gap-2 text-[10px] font-bold text-black bg-emerald-500 uppercase tracking-widest px-3 py-1 font-mono">
                            EXECUTE: PAGO_EN_CASA
                        </div>
                    </div>
                </div>

                {/* 3. HERO SECTION (DARK TERMINAL) */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 lg:py-16 relative">
                    {/* Matrix-like background effect */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-emerald-500/10 to-purple-500/10 blur-[100px] pointer-events-none"></div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
                        <div className="flex flex-col relative z-20 lg:col-span-5">
                            <div className="flex items-center gap-2 mb-6">
                                <span className="border border-zinc-700 text-zinc-400 bg-zinc-900/50 text-[10px] uppercase font-black tracking-widest font-mono px-3 py-1 rounded">
                                    SWITCHES HOT-SWAPPABLE
                                </span>
                            </div>
                            
                            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-tight mb-6 uppercase">
                                {ai?.enhancedTitle || "Numpad Mecánico RGB"}
                            </h1>
                            <p className="text-base md:text-lg font-medium text-zinc-400 mb-10 leading-snug font-mono">
                                {ai?.enhancedDescription || "Eleva tu productividad en hojas de cálculo y macros de edición. Teclas PBT gruesas, sonido 'Thock' profundo y perilla de aluminio asignable."}
                            </p>

                            <div className="bg-zinc-900 border-2 border-zinc-800 p-8 shadow-[10px_10px_0px_0px_#27272a] relative transition-transform hover:translate-y-[-2px] hover:shadow-[12px_12px_0px_0px_#10b981]">
                                <div className="flex flex-col sm:flex-row sm:items-end gap-6 mb-8 relative z-10">
                                    <span className="text-5xl font-black text-white tracking-tighter font-mono">{fmtPrice(product.price)}</span>
                                    {product.originalPrice && <span className="text-xl font-bold text-zinc-600 line-through pb-1 font-mono">{fmtPrice(product.originalPrice)}</span>}
                                </div>
                                <button onClick={() => document.getElementById('checkout-action')?.scrollIntoView({ behavior: 'smooth' })} className="w-full h-[64px] bg-zinc-100 text-zinc-950 font-black uppercase tracking-[0.2em] text-xs hover:bg-emerald-500 hover:text-black transition-colors duration-300 flex items-center justify-center border-b-4 border-zinc-300 hover:border-emerald-700 active:border-b-0 active:translate-y-[4px]">
                                    [ PRESIONA ENTER PARA COMPRAR (C.O.D) ]
                                </button>
                            </div>
                        </div>

                        <div className="relative z-10 lg:col-span-7 flex items-center justify-center p-2 lg:p-8">
                            <div className="w-full max-w-[500px] aspect-video relative bg-zinc-950 border-2 border-zinc-800 shadow-2xl p-4 flex items-center justify-center group overflow-hidden">
                                {/* RGB Underglow simulation */}
                                <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-emerald-500 to-purple-500 opacity-20 blur-2xl group-hover:opacity-40 transition-opacity duration-1000"></div>
                                <div className="w-full h-full relative z-10 bg-zinc-900 border border-zinc-800 rounded">
                                    <EnhancedProductGallery product={product} accentColor={accentGreen} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. TRUST BADGES TECHNICAL */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 pb-16">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            {v: 'Gateron', l: 'Switches Lineares'},
                            {v: 'QMK/VIA', l: 'Programable 100%'},
                            {v: 'Aluminio', l: 'Chasis Pesado'},
                            {v: 'Bluetooth', l: 'Triple Conexión'}
                        ].map((b, i) => (
                            <div key={i} className="flex flex-col items-center justify-center p-6 bg-zinc-900 border border-zinc-800 border-l-2 hover:border-l-emerald-500 transition-colors">
                                <span className="text-white font-black text-2xl tracking-tighter mb-1 font-mono">{b.v}</span>
                                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{b.l}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 5. EXPERT ACCORDIONS */}
                <div className="max-w-4xl mx-auto px-4 md:px-8 py-20">
                    <div className="mb-12 text-center">
                        <h2 className="text-4xl font-black tracking-tight text-white uppercase font-mono">Specs del <span className="text-emerald-500 border-b-2 border-emerald-500">Hardware.</span></h2>
                    </div>
                    <div className="border border-zinc-800 bg-zinc-950">
                        {[
                            { t: 'Hot-Swappable de 5 Pines', a: 'No necesitas soldar. Si no te gusta el sonido, usa un extractor de switches, arráncalo y pon switches Blue ruidosos o Silent Red para la oficina. Literalmente Lego para adultos.' },
                            { t: 'Modificación Acústica', a: 'De fábrica, incluye dos capas de espuma Poron entre el PCB y el chasis (Tape Mod & Foam Mod) que eliminan el eco plástico hueco, entregando un sonido "Thock" cremoso en cada tipeo.' },
                            { t: 'Knob de Audio / Macro', a: 'La perilla giratoria no solo sube el volumen. Mediante el software VIA puedes asignarla para hacer zoom in/out en Photoshop, avanzar en la línea de tiempo de Premiere o simplemente mutear Discord con un click.' }
                        ].map((ac, i) => (
                            <div key={i} className="border-b border-zinc-800 last:border-b-0">
                                <button onClick={() => setOpenSpecAcc(openSpecAcc===i?null:i)} className="w-full text-left p-6 flex items-center justify-between text-sm font-black uppercase text-zinc-300 hover:text-emerald-400 hover:bg-zinc-900 transition-all font-mono">
                                    <div className="flex items-center gap-4">
                                        <span className="text-zinc-600">[{i+1}/3]</span> {ac.t}
                                    </div>
                                    <span className="text-emerald-500 font-black text-xl">{openSpecAcc===i?'-':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {openSpecAcc === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 pb-6 pl-[4.5rem] text-sm font-medium text-zinc-500 leading-relaxed font-mono">
                                            {">"} {ac.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 7. BENEFITS CON IMAGENES UNSPLASH */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-24 mb-16 border-t border-zinc-800 border-dashed">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black tracking-tight text-white uppercase font-mono">Setup <span className="text-purple-500">Endgame.</span></h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { img: 'https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=1000&auto=format&fit=crop', t: 'Productividad Excel', d: 'Los contadores lo saben. Ingresar datos en Data Entry sin un Numpad es dolor de manos. Multiplica tu WPM.' },
                            { img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop', t: 'Macros para Juegos', d: 'Con el software pogramas teclas para comprar armas enteras en CS:GO o spamear habilidades en MMOs con un solo botón físico.' },
                            { img: 'https://images.unsplash.com/photo-1629654297299-c8506221eca9?q=80&w=1000&auto=format&fit=crop', t: 'Desk Aesthetics', d: 'Completará el look premium de tu escritorio minimalista si usas teclados 60% que de otra forma carecen de flechas y números.' }
                        ].map((b, i) => (
                            <div key={i} className="bg-zinc-900 border-2 border-zinc-800 p-2 group hover:border-purple-500/50 transition-colors">
                                <div className="h-48 w-full relative overflow-hidden bg-black mb-4">
                                     <img src={b.img} alt={b.t} className="w-full h-full object-cover filter brightness-[0.7] contrast-125 group-hover:scale-105 transition-transform duration-700" />
                                </div>
                                <div className="px-4 pb-4">
                                    <h3 className="text-lg font-black text-white mb-2 uppercase font-mono tracking-tighter">{b.t}</h3>
                                    <p className="text-sm font-medium text-zinc-500 leading-relaxed font-mono">{b.d}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 11. RISK REVERSAL WARRANTY */}
                <div className="max-w-5xl mx-auto px-4 md:px-8 py-12">
                    <div className="bg-zinc-900 border border-zinc-700 p-8 md:p-12 text-white md:flex items-center justify-between gap-10 shadow-2xl font-mono">
                        <div className="relative z-10 w-full md:w-3/4">
                            <h3 className="text-xl font-bold tracking-tight mb-4 text-emerald-400">root@logistics:~# execute_compra_fisica</h3>
                            <p className="font-normal text-zinc-400 leading-relaxed text-sm">
                                [INFO] No pedimos tarjetas en esta terminal web. <br/>
                                [INFO] Cargas tus datos en el prompt inferior. <br/>
                                [INFO] Se compila la orden y un agente lleva la caja a tu casa. <br/>
                                [SUCCESS] Abonas en efectivo físico al recibir. Transacción fuera de la matrix bancaria en línea.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 15. CHECKOUT */}
                <div id="checkout-action" className="py-24 md:py-32 bg-zinc-950 relative border-t-2 border-zinc-800 mt-12">
                    <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center">
                        <div className="relative text-center md:text-left">
                            <h3 className="text-5xl font-black tracking-tighter mb-4 text-white uppercase font-mono">Compile <br/><span className="text-emerald-500">Order.exe</span></h3>
                            <p className="text-sm font-medium text-zinc-500 mb-10 leading-relaxed font-mono max-w-sm mt-4">{">>"} Input data below. Payment executed locally upon delivery.</p>
                            
                            <div className="text-5xl font-black text-white tracking-tighter font-mono">{fmtPrice(product.price)}</div>
                        </div>
                        
                        <div className="w-full border-2 border-emerald-500 bg-black p-8 md:p-10 shadow-[0_0_30px_rgba(16,185,129,0.1)]">
                            <form onSubmit={e=>e.preventDefault()}>
                                <div className="space-y-6">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest font-mono">Usuario Destino</label>
                                        <input type="text" className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-500 text-emerald-400 font-mono text-sm px-6 py-4 outline-none transition-all placeholder:text-zinc-700" placeholder="Nombre real..." />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest font-mono">Punto de Acceso</label>
                                        <input type="tel" className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-500 text-emerald-400 font-mono text-sm px-6 py-4 outline-none transition-all placeholder:text-zinc-700" placeholder="Número Celular..." />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest font-mono">Directorio de Entrega</label>
                                        <textarea rows={2} className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-500 text-emerald-400 font-mono text-sm px-6 py-4 outline-none transition-all resize-none placeholder:text-zinc-700" placeholder="Avenida, casa, barrio..." />
                                    </div>
                                    <div className="pt-4">
                                        <button className="w-full h-[60px] bg-emerald-500 text-black font-black uppercase tracking-widest text-[13px] hover:bg-white transition-colors font-mono hover:shadow-[0_0_20px_rgba(16,185,129,0.6)]">
                                            [ ENVIAR ORDEN C.O.D ]
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

export default PdpMechanicalNumeric;
