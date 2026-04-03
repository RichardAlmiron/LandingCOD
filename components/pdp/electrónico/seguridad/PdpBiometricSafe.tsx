'use client';
import React, { useState } from 'react';
import { StoreData, Product } from '@/lib/types';
import EnhancedProductGallery from '@/components/pdp/EnhancedProductGallery';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { data: StoreData; product: Product; }

const PdpBiometricSafe: React.FC<Props> = ({ data, product }) => {
    const [openSpecAcc, setOpenSpecAcc] = useState<number | null>(0);
    const [faqOpen, setFaqOpen] = useState<number | null>(null);
    const ai = product.aiContent;
    const fmtPrice = (n: number) => { const s = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); return `Gs. ${s}`; };
    
    // Aesthetic Palette: Gunmetal / Titanium Security
    const bg = '#0f1115'; // Very dark blue/grey
    const textMain = '#e2e8f0'; // Slate 200
    const accentSecurity = '#38bdf8'; // Light Blue 400 (Scanner light)
    const accentDark = '#020617'; // Slate 950

    return (
        <div style={{ background: bg, color: textMain, fontFamily: "'Inter', sans-serif" }} className="overflow-x-hidden selection:bg-sky-500/30 selection:text-sky-300 antialiased">
            
            {/* 0. AMBIENT GRID */}
            <div className="fixed top-0 left-0 w-full h-[150vh] bg-[linear-gradient(rgba(56,189,248,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.05)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none z-0 mix-blend-screen opacity-50"></div>

            {/* 1. TOP NAV (Vault Header) */}
            <header className="sticky top-0 z-50 bg-[#0f1115]/90 backdrop-blur-md border-b-[2px] border-slate-800">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-md bg-gradient-to-br from-slate-700 to-slate-900 border border-slate-600 flex items-center justify-center shadow-[0_0_10px_rgba(56,189,248,0.2)]">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                        </div>
                        <span className="font-black text-xl tracking-[0.2em] text-white uppercase font-mono">
                            AEGIS<span className="text-sky-400 font-light">VAULT</span>
                        </span>
                    </div>
                </div>
            </header>

            <main className="relative z-10 w-full overflow-hidden">
                {/* 2. BREADCRUMBS & LOGISTICS */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6 pb-2">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-sky-400 bg-sky-900/10 px-4 py-2 border border-sky-500/20 inline-flex items-center gap-2 font-mono">
                            <span className="w-1.5 h-1.5 bg-sky-400 animate-pulse rounded-none"></span>
                            DEFENSA / ALMACENAJE / <span className="text-white">{product.title.substring(0, 15)}...</span>
                        </div>
                        <div className="inline-flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest px-4 py-2 bg-slate-900 border border-slate-800">
                            ENTREGA BLINDADA (C.O.D)
                        </div>
                    </div>
                </div>

                {/* 3. HERO SECTION (GUNMETAL) */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 lg:py-16 relative">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
                        <div className="flex flex-col relative z-20 lg:col-span-5">
                            <div className="flex items-center gap-2 mb-6 text-sky-500 font-mono text-[10px] uppercase font-black tracking-widest">
                                [ 0.3 SEG SCANNER BIOMÉTRICO ]
                            </div>
                            
                            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-tight mb-6 uppercase">
                                {ai?.enhancedTitle || "Caja Fuerte Biométrica Inviolable"}
                            </h1>
                            <p className="text-base md:text-lg font-medium text-slate-400 mb-10 leading-snug">
                                {ai?.enhancedDescription || "Acceso inmediato en la oscuridad. Memoria para 50 huellas y acero reforzado anti-palanca. Protege tus valores y elementos de defensa personal lejos de los niños pero al alcance de tu mano en milisegundos."}
                            </p>

                            <div className="bg-slate-900/80 p-8 border-l-[6px] border-sky-500 shadow-2xl relative block overflow-hidden">
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')] opacity-10 mix-blend-overlay"></div>
                                <div className="flex flex-col sm:flex-row sm:items-end gap-6 mb-8 relative z-10">
                                    <span className="text-5xl font-black text-white tracking-tighter font-mono">{fmtPrice(product.price)}</span>
                                    {product.originalPrice && <span className="text-xl font-bold text-slate-600 line-through pb-1 font-mono">{fmtPrice(product.originalPrice)}</span>}
                                </div>
                                <button onClick={() => document.getElementById('checkout-action')?.scrollIntoView({ behavior: 'smooth' })} className="w-full h-[64px] bg-sky-500 text-slate-950 font-black uppercase tracking-[0.2em] text-xs hover:bg-white transition-all duration-300 flex items-center justify-center gap-3">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                                    Autorizar Envío C.O.D
                                </button>
                                <div className="flex items-center justify-center gap-2 mt-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">
                                    Total Discreción Garantizada
                                </div>
                            </div>
                        </div>

                        <div className="relative z-10 lg:col-span-7 flex items-center justify-center p-2">
                            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="w-full max-w-[550px] aspect-square relative bg-slate-950 border-[4px] border-slate-800 shadow-[0_0_100px_rgba(56,189,248,0.1)] p-4">
                                <EnhancedProductGallery product={product} accentColor={accentSecurity} />
                                
                                <div className="absolute top-8 right-8 border border-sky-500/50 bg-black/80 backdrop-blur text-sky-400 font-mono text-[10px] uppercase px-3 py-1.5 tracking-[0.2em] flex items-center gap-2">
                                    <span className="text-sky-400">◎</span> LOCKED
                                </div>
                                {/* Biometric Scanner fake light */}
                                <div className="absolute bottom-8 left-8 w-16 h-16 rounded-full border border-sky-500/30 flex items-center justify-center bg-sky-500/5 shadow-[0_0_30px_rgba(56,189,248,0.3)]">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="1.5"><path d="M12 22v-4m0-4v-4m0-4V2m-4 8v10m8-10v8M4 10v6m16-6v4"/></svg> {/* Faux fingerprint icon */}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* 4. TRUST BADGES TECHNICAL */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 pb-16">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 border border-slate-800 bg-slate-900 overflow-hidden">
                        {[
                            {v: '50', l: 'Huellas en Memoria'},
                            {v: 'Acero Q235', l: 'Anti-Palanca / Taladro'},
                            {v: 'Cuna FOAM', l: 'Absorción de Impactos'},
                            {v: 'Backup', l: 'Llave Mecánica Fís.'}
                        ].map((b, i) => (
                            <div key={i} className="flex flex-col items-center justify-center p-8 border-r border-slate-800 last:border-r-0">
                                <span className="text-white font-black text-2xl tracking-tighter mb-2 font-mono">{b.v}</span>
                                <span className="text-[9px] font-bold text-sky-500 uppercase tracking-widest text-center">{b.l}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 5. EXPERT ACCORDIONS */}
                <div className="max-w-4xl mx-auto px-4 md:px-8 py-20">
                    <div className="mb-12 text-center">
                        <h2 className="text-4xl font-black tracking-tighter text-white uppercase font-mono">Protocolo de <span className="text-sky-400">Acceso.</span></h2>
                    </div>
                    <div className="bg-[#0f1115] border border-slate-800">
                        {[
                            { t: 'Decisión en 0.3 Segundos', a: 'En una emergencia nocturna, no hay tiempo para marcar combinaciones mecánicas o buscar llaves. El sensor FPC de semiconductores 3D lee la profundidad de tu huella arterial al instante, no importa el ángulo en que coloques el dedo.' },
                            { t: 'Alarma de Error y Bloqueo', a: 'Si un niño o un intruso intenta 5 huellas fallidas consecutivas, el sistema entra en bloqueo total por 5 minutos y activa una alarma penetrante en la habitación que alertará a todos los presentes.' },
                            { t: 'Anclaje Táctico Oculto', a: 'Incluye hardware de instalación pesada. Perfora y atornilla sus 4 puntos de anclaje base directamente al concreto de la pared trasera de tu clóset o piso bajo la cama. No podrán llevársela bajo el brazo.' }
                        ].map((ac, i) => (
                            <div key={i} className="border-b border-slate-800 last:border-b-0">
                                <button onClick={() => setOpenSpecAcc(openSpecAcc===i?null:i)} className="w-full text-left p-6 md:p-8 flex items-center justify-between text-sm font-black uppercase tracking-[0.1em] text-slate-300 hover:text-white transition-all bg-slate-900/50 hover:bg-slate-900">
                                    <div className="flex items-center gap-4">
                                        <div className="text-sky-500 font-mono shrink-0">CODE 0{i+1}</div>
                                        {ac.t}
                                    </div>
                                    <span className="text-sky-500 text-2xl leading-none font-light">{openSpecAcc===i?'-':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {openSpecAcc === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 md:px-8 pb-8 pl-[6rem] text-sm font-medium text-slate-400 leading-relaxed bg-slate-900/50 border-l-[2px] border-sky-500 ml-6">
                                            {ac.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 7. BENEFITS CON IMAGENES */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-32 border-b border-slate-800">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-6 uppercase border-b-4 border-sky-500 pb-2 inline-block">Custodia <br/><span className="text-slate-500">Definitiva.</span></h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { img: 'https://images.unsplash.com/photo-1579308696773-4f9aa636b1cc?q=80&w=1000&auto=format&fit=crop', t: 'Metales Finos / Relojería', d: 'La espuma interna corrugada protege cristales de zafiro de tus relojes automáticos o lingotes contra ralladuras.' },
                            { img: 'https://images.unsplash.com/photo-1616422285623-146c6ea7e268?q=80&w=1000&auto=format&fit=crop', t: 'Pasaportes & Efectivo', d: 'Mantén el flujo de caja operativo y documentos de migración lejos del personal de limpieza o visitas ajenas a la casa.' },
                            { img: 'https://images.unsplash.com/photo-1542104523-bd92025ed75f?q=80&w=1000&auto=format&fit=crop', t: 'Armamento de Defensa', d: 'El muelle hidráulico empuja la puerta inmediatamente y expone el empuñe de tu Taser, Gas pimienta o arma lícita sin estorbos.' }
                        ].map((b, i) => (
                            <div key={i} className="bg-slate-950 border border-slate-800 p-6 group">
                                <div className="h-56 w-full relative overflow-hidden bg-black mb-6 border border-slate-700">
                                     <img src={b.img} alt={b.t} className="w-full h-full object-cover filter contrast-125 saturate-0 group-hover:saturate-100 transition-all duration-1000 opacity-60" />
                                </div>
                                <h3 className="text-lg font-black text-white mb-2 uppercase tracking-widest font-mono">{b.t}</h3>
                                <p className="text-sm font-medium text-slate-500 leading-relaxed">{b.d}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 10. COMPARISON TABLE */}
                <div className="max-w-5xl mx-auto px-4 md:px-8 py-32">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black tracking-tighter text-white uppercase font-mono">Biometría vs Mecánica.</h2>
                    </div>
                    
                    <div className="bg-slate-900 border border-slate-800 shadow-xl max-w-4xl mx-auto">
                        <div className="grid grid-cols-3 bg-slate-950 border-b border-slate-800 text-[9px] font-black uppercase tracking-widest text-slate-500 font-mono">
                            <div className="p-4 md:p-8">Métrica Operativa</div>
                            <div className="p-4 md:p-8 text-center text-sky-400 border-x border-slate-800 bg-sky-950/20">VAULT BIOMÉTRICA</div>
                            <div className="p-4 md:p-8 text-center">Teclado Numérico Viejo</div>
                        </div>
                        {[
                            { k: 'Apertura a Ciegas', u: 'Sí (Solo tocas el lector curvo)', t: 'Imposible (Requiere linterna)' },
                            { k: 'Tiempo de Extracción', u: '< 0.5 Segundos', t: '5-8 Segundos' },
                            { k: 'Hackeos (Fuerza Bruta)', u: 'Rechaza dedos fríos/falsos', t: 'Códigos desgastan botones visualmente' }
                        ].map((r, i) => (
                            <div key={i} className="grid grid-cols-3 border-b border-slate-800/50 last:border-b-0 text-xs md:text-sm">
                                <div className="p-4 md:p-8 font-black text-slate-300 flex items-center uppercase">{r.k}</div>
                                <div className="p-4 md:p-8 font-bold text-white text-center flex items-center justify-center border-x border-slate-800 bg-sky-900/10 font-mono">{r.u}</div>
                                <div className="p-4 md:p-8 font-medium text-slate-600 text-center flex items-center justify-center opacity-60 line-through">{r.t}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 11. RISK REVERSAL WARRANTY */}
                <div className="max-w-5xl mx-auto px-4 md:px-8 py-12">
                    <div className="bg-slate-800/50 border border-slate-700 p-10 md:p-14 text-white md:flex items-center gap-10">
                        <div className="relative z-10 w-full">
                            <div className="flex items-center justify-between border-b border-slate-600 pb-6 mb-6">
                                <h3 className="text-2xl font-black tracking-tighter uppercase text-white font-mono">Logística Blanca y Discreta.</h3>
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                            </div>
                            <p className="font-medium text-slate-300 leading-relaxed text-sm max-w-3xl">
                                Tratándose de seguridad, no enviamos cajas rotuladas y no aceptamos transacciones que dejen su huella en los servidores del banco si no lo deseas. Haces el pedido por esta terminal interna blindada. Mandaremos un flete privado con una caja de empaque neutro, y liquidas en efectivo físico o app contra la entrega, tras comprobar que la esclusa funciona. Confidencialidad al 100%.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 15. CHECKOUT */}
                <div id="checkout-action" className="py-24 md:py-32 bg-slate-950 relative border-t-4 border-sky-500 overflow-hidden">
                    <div className="absolute top-0 right-0 w-[500px] h-full bg-sky-500/5 blur-[100px] pointer-events-none"></div>
                    <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24 items-center">
                        <div className="md:col-span-5 relative text-center md:text-left">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-sky-500 mb-6 bg-sky-500/10 border border-sky-500/30 px-3 py-1 inline-block font-mono">ENCRIPTAR ORDEN DIRECTA</span>
                            <h3 className="text-5xl md:text-6xl font-black tracking-tighter mb-6 text-white uppercase leading-[0.95] font-mono">Cierra la<br/><span className="text-sky-500">Bóveda.</span></h3>
                            <p className="text-sm font-medium text-slate-400 mb-10 leading-relaxed max-w-sm mx-auto md:mx-0">Llena la hoja registral de entrega. Solo se pedirá el abono contra entrega. El stock nacional provee a tu garaje.</p>
                            
                            <div className="text-5xl font-black text-white tracking-tighter font-mono">{fmtPrice(product.price)}</div>
                        </div>
                        
                        <div className="md:col-span-7 w-full bg-[#0f1115] border border-slate-800 p-8 md:p-12 shadow-[0_0_50px_rgba(56,189,248,0.05)] relative">
                            {/* Decorative screw heads */}
                            <div className="absolute top-4 left-4 w-2 h-2 rounded-full border border-slate-700 bg-slate-900"></div>
                            <div className="absolute top-4 right-4 w-2 h-2 rounded-full border border-slate-700 bg-slate-900"></div>
                            <div className="absolute bottom-4 left-4 w-2 h-2 rounded-full border border-slate-700 bg-slate-900"></div>
                            <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full border border-slate-700 bg-slate-900"></div>
                            
                            <form onSubmit={e=>e.preventDefault()}>
                                <div className="space-y-6">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] font-mono">IDENTIDAD (Nombre)</label>
                                        <input type="text" className="w-full bg-slate-900 border border-slate-800 focus:border-sky-500 text-sky-400 font-mono font-bold text-sm px-6 py-4 outline-none transition-all rounded-sm" placeholder="ID de Usuario..." />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] font-mono">CANAL (Teléfono)</label>
                                        <input type="tel" className="w-full bg-slate-900 border border-slate-800 focus:border-sky-500 text-sky-400 font-mono font-bold text-sm px-6 py-4 outline-none transition-all rounded-sm" placeholder="Línea activa para courier..." />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] font-mono">PUNTO ZERO (Dirección)</label>
                                        <textarea rows={2} className="w-full bg-slate-900 border border-slate-800 focus:border-sky-500 text-sky-400 font-mono font-bold text-sm px-6 py-4 outline-none transition-all resize-none rounded-sm" placeholder="Coordenadas de despliegue fiscal..." />
                                    </div>
                                    <div className="pt-4">
                                        <button className="w-full h-[64px] bg-sky-500 text-slate-900 font-black uppercase tracking-[0.2em] text-xs hover:bg-white transition-all font-mono">
                                            [ INICIAR DESPACHO SEGURO ]
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

export default PdpBiometricSafe;
