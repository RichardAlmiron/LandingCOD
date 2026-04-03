'use client';
import React, { useState } from 'react';
import { StoreData, Product } from '@/lib/types';
import EnhancedProductGallery from '@/components/pdp/EnhancedProductGallery';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { data: StoreData; product: Product; }

const PdpLaserEngraver: React.FC<Props> = ({ data, product }) => {
    const [openSpecAcc, setOpenSpecAcc] = useState<number | null>(0);
    const [faqOpen, setFaqOpen] = useState<number | null>(null);
    const ai = product.aiContent;
    const fmtPrice = (n: number) => { const s = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); return `Gs. ${s}`; };
    
    // Aesthetic Palette: Maker / Industrial / Precision
    const bg = '#0f172a'; // Slate 900
    const textMain = '#e2e8f0'; // Slate 200
    const accentOrange = '#f97316'; // Orange 500 (Laser Heat)
    const accentDark = '#020617'; // Slate 950

    return (
        <div style={{ background: bg, color: textMain, fontFamily: "'Inter', sans-serif" }} className="overflow-x-hidden selection:bg-orange-500/30 selection:text-orange-200 antialiased">
            
            {/* 0. AMBIENT LASER VIBES */}
            <div className="absolute top-0 right-0 w-[50%] h-[1000px] bg-gradient-to-l from-orange-500/10 via-red-900/10 to-transparent pointer-events-none z-0 mix-blend-screen"></div>
            <div className="fixed bottom-0 left-0 w-full h-[500px] bg-gradient-to-t from-slate-950 to-transparent pointer-events-none z-0"></div>

            {/* 1. TOP NAV (Workshop Tech) */}
            <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-2xl border-b border-orange-500/20 shadow-[0_4px_30px_rgba(249,115,22,0.05)]">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-gradient-to-b from-orange-400 to-red-600 flex items-center justify-center border-b-2 border-red-800 shadow-[0_0_15px_rgba(249,115,22,0.4)] relative overflow-hidden">
                            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_45%,#fff_50%,transparent_55%)] animate-[shimmer_2s_infinite]"></div>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5"><path d="M12 2v20M8 6l8 12M16 6l-8 12"/></svg>
                        </div>
                        <span className="font-extrabold text-xl tracking-tighter text-white font-mono uppercase">
                            THERMO<span className="text-orange-500 font-light">FORGE</span>
                        </span>
                    </div>
                </div>
            </header>

            <main className="relative z-10 w-full overflow-hidden">
                {/* 2. BREADCRUMBS & LOGISTICS */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6 pb-2">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="text-[10px] font-black uppercase tracking-widest text-orange-400 bg-orange-500/10 px-4 py-2 rounded border border-orange-500/20 inline-flex items-center gap-2 font-mono">
                            <span className="w-1.5 h-1.5 bg-red-500 animate-pulse rounded-full"></span>
                            TALLER / FABRICACIÓN DIGITAL / <span className="text-white">{product.title.substring(0, 15)}...</span>
                        </div>
                        <div className="inline-flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-950 px-4 py-2 border border-slate-800 rounded font-mono">
                            OPERACIÓN FÍSICA • PAGO C.O.D.
                        </div>
                    </div>
                </div>

                {/* 3. HERO SECTION (INDUSTRIAL BURN) */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 lg:py-16 relative">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
                        <div className="flex flex-col relative z-20 lg:col-span-5">
                            <div className="flex items-center gap-2 mb-6 text-orange-500 font-mono text-[10px] uppercase font-black tracking-widest">
                                [ PRECISION DIODE TECHNOLOGY ]
                            </div>
                            
                            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-tight mb-6 uppercase">
                                {ai?.enhancedTitle || "Grabadora Láser Doméstica Pro"}
                            </h1>
                            <p className="text-base md:text-lg font-medium text-slate-400 mb-10 leading-snug">
                                {ai?.enhancedDescription || "Crea un negocio en tu escritorio. Quema madera, corta acrílico y talla metales oscuros con resolución microscópica de 0.08mm. Potencia industrial, tamaño doméstico."}
                            </p>

                            <div className="bg-slate-950 relative border-l-4 border-orange-500 p-8 shadow-2xl overflow-hidden group">
                                <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1544383835-bca2bc6f5ea3?q=80&w=1000&auto=format&fit=crop')] bg-cover mix-blend-overlay"></div>
                                <div className="flex flex-col sm:flex-row sm:items-end gap-6 mb-8 relative z-10">
                                    <span className="text-5xl font-black text-white tracking-tighter font-mono">{fmtPrice(product.price)}</span>
                                    {product.originalPrice && <span className="text-xl font-bold text-slate-600 line-through pb-1 font-mono">{fmtPrice(product.originalPrice)}</span>}
                                </div>
                                <button onClick={() => document.getElementById('checkout-action')?.scrollIntoView({ behavior: 'smooth' })} className="w-full h-[64px] bg-gradient-to-r from-orange-500 to-red-600 text-white font-black uppercase tracking-[0.2em] text-xs hover:from-white hover:to-white hover:text-red-600 transition-all duration-500 flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(249,115,22,0.4)]">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                                    Activar Orden de Fábrica
                                </button>
                                <div className="flex items-center justify-center gap-2 mt-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">
                                    Inspección Física al Recibir
                                </div>
                            </div>
                        </div>

                        <div className="relative z-10 lg:col-span-7 flex items-center justify-center p-2">
                            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="w-full max-w-[600px] aspect-square relative bg-slate-900 border border-slate-800 shadow-[20px_20px_60px_rgba(0,0,0,0.8)] p-4 flex flex-col justify-between">
                                <EnhancedProductGallery product={product} accentColor={accentOrange} />
                                
                                <div className="absolute top-4 left-4 border border-orange-500/50 bg-black/60 backdrop-blur text-orange-400 font-mono text-[9px] uppercase px-2 py-1 tracking-widest flex items-center gap-2">
                                    <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span> Laser Active
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* 4. TRUST BADGES TECHNICAL */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 pb-16">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {[
                            {v: '10W / 20W', l: 'Potencia Óptica'},
                            {v: '0.08mm', l: 'Punto Comprimido'},
                            {v: 'WiFi/USB', l: 'Conectividad Dual'},
                            {v: 'Mac/Win', l: 'LaserGRBL & LightBurn'}
                        ].map((b, i) => (
                            <div key={i} className="flex flex-col items-center justify-center p-8 bg-slate-800/20 border border-slate-800 hover:border-orange-500/30 transition-colors">
                                <span className="text-white font-black text-2xl tracking-tighter mb-2 font-mono">{b.v}</span>
                                <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">{b.l}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 5. EXPERT ACCORDIONS */}
                <div className="max-w-4xl mx-auto px-4 md:px-8 py-20">
                    <div className="mb-12 text-center">
                        <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white uppercase bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-600">Manufactura <br className="md:hidden"/>Exacta.</h2>
                    </div>
                    <div className="bg-slate-950 border border-slate-800">
                        {[
                            { t: 'Punto de Compresión FAC', a: 'Cualquier láser barato quema, pero hacen bordes chamuscados. Nuestra lente FAC estabiliza la luz en un cuadrado perfecto de 0.08x0.08mm, permitiendo tallar tipografías diminutas en anillos o vasos sin dañar el perímetro.' },
                            { t: 'Corte de Materiales Densos', a: 'No es solo para dejar marcas oscuras. Con más de 10W reales de salida óptica (Doble Diodo), puedes atravesar maderas MDF de 10mm o acrílicos negros en pocas pasadas. Crea puzzles 3D o cajitas para joyería.' },
                            { t: 'Area de Trabajo Monstruosa', a: 'Un marco rígido de aluminio ofrece un lecho de 400x400 milímetros. Ideal para personalizar tablas de madera enteras para asado, grabar skates completos cruzados, o producciones en masa cortando 20 llaveros al mismo tiempo.' }
                        ].map((ac, i) => (
                            <div key={i} className="border-b border-slate-800 last:border-b-0">
                                <button onClick={() => setOpenSpecAcc(openSpecAcc===i?null:i)} className="w-full text-left p-6 md:p-8 flex items-center justify-between text-sm font-black uppercase tracking-widest text-slate-300 hover:text-white transition-all bg-slate-900/50 hover:bg-slate-900">
                                    <div className="flex items-center gap-4">
                                        <div className="text-orange-500 font-mono shrink-0">{'['}0{i+1}{']'}</div>
                                        {ac.t}
                                    </div>
                                    <span className="text-orange-500 text-2xl leading-none font-light">{openSpecAcc===i?'-':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {openSpecAcc === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 md:px-8 pb-8 pl-[4.5rem] text-sm font-medium text-slate-400 leading-relaxed bg-slate-900/50">
                                            {ac.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 6. ENDLESS MARQUEE */}
                <div className="w-full overflow-hidden py-4 bg-orange-600 flex shadow-[0_0_40px_rgba(249,115,22,0.4)] my-10 relative">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-multiply"></div>
                    <div className="flex whitespace-nowrap animate-marquee font-black uppercase text-2xl tracking-tighter text-white font-mono relative z-10">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="flex items-center gap-8 px-8">
                                <span>PRODUCCIÓN EN MASA</span><span className="text-black">/</span>
                                <span>CORTE ACRÍLICO Y MADERA</span><span className="text-black">/</span>
                                <span>CNC PERSONAL</span><span className="text-black">/</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 7. BENEFITS CON IMAGENES */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-32 border-b border-slate-800">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-6 uppercase">Rentabilidad <br/><span className="text-orange-500 border-b-4 border-red-600 pb-2">Doméstica.</span></h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { img: 'https://images.unsplash.com/photo-1544383835-bca2bc6f5ea3?q=80&w=1000&auto=format&fit=crop', t: 'Madera (Burn Art)', d: 'Graba fotografías hiperrealistas sobre superficies de madera blanda. O corta piezas para maquetas arquitectónicas y ensambles 3D.' },
                            { img: 'https://images.unsplash.com/photo-1590483868266-9922c2a13cc7?q=80&w=1000&auto=format&fit=crop', t: 'Merchandising Cuero', d: 'Personaliza carteras, billeteras y cinturones de piel en segundos. Ideal para ventas de temporada (Navidad, Día del Padre) sin salir de tu sala.' },
                            { img: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80&w=1000&auto=format&fit=crop', t: 'Placas Metálicas', d: 'Si usas el papel térmico protector o aerosol de marcado, el láser de 20W puede tallar sobre acero inoxidable. Haz identificadores de mascotas y joyería militar.' }
                        ].map((b, i) => (
                            <div key={i} className="bg-slate-900 border border-slate-800 p-6 group hover:border-orange-500/50 transition-colors duration-500">
                                <div className="h-56 w-full relative overflow-hidden bg-black mb-6">
                                     <img src={b.img} alt={b.t} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-60 group-hover:opacity-100" />
                                     <div className="absolute inset-0 bg-orange-500/10 mix-blend-overlay"></div>
                                </div>
                                <h3 className="text-lg font-black text-white mb-2 uppercase tracking-wide font-mono">{b.t}</h3>
                                <p className="text-sm font-medium text-slate-400 leading-relaxed">{b.d}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 8. VISUAL HOW TO USE (GRID) */}
                <div className="py-24 bg-slate-950">
                    <div className="max-w-7xl mx-auto px-4 md:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-4xl font-black tracking-tighter text-white mb-8 uppercase">Operación <br/><span className="text-orange-500">Mecánica.</span></h2>
                                <p className="text-slate-400 font-medium mb-12 leading-relaxed text-lg">Parece ciencia de cohetes, pero el software lo hace un juego de niños. Tu abuela podría quemar una placa.</p>
                                
                                <div className="space-y-6">
                                    {[
                                        { t: 'Diseño Base', d: 'Arrastra cualquier imagen JPG plana o vector SVG dentro del programa gratuito LaserGRBL (Windows) o LightBurn (Mac).' },
                                        { t: 'Foco Manual Rápido', d: 'Baja el bloque del láser hasta que toque la pequeña pieza calibradora de metal sobre la madera, aprieta la tuerca y listo. Foco perfecto.' },
                                        { t: 'Start & Burn', d: 'Ponte las gafas naranjas de protección (incluidas). Presiona Iniciar. El cabezal comenzará los recorridos con un fino haz violeta brillante dejando humo artesanal.' }
                                    ].map((s, i) => (
                                        <div key={i} className="flex gap-4 items-start bg-slate-900 p-6 border-l-2 border-slate-700 hover:border-orange-500 transition-colors">
                                            <div className="text-slate-600 font-black mt-1 font-mono">0{i+1}_</div>
                                            <div>
                                                <h4 className="text-sm font-black text-white mb-1 uppercase tracking-wide">{s.t}</h4>
                                                <p className="text-sm text-slate-400 leading-relaxed">{s.d}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="relative aspect-square w-full max-w-[500px] mx-auto p-4 border border-slate-800 bg-slate-900 shadow-2xl">
                                <div className="w-full h-full relative overflow-hidden bg-black flex items-center justify-center">
                                    <img src="https://images.unsplash.com/photo-1563820986518-e21bdee1f964?q=80&w=1000&auto=format&fit=crop" alt="Laser UI" className="w-full h-full object-cover opacity-30" />
                                    {/* HUD FAKE */}
                                    <div className="absolute inset-0 p-6 flex flex-col justify-between">
                                        <div className="flex justify-between items-center text-orange-500 font-mono text-[9px] uppercase">
                                            <span>LightBurn Pro V1.0</span>
                                            <span>Status: Burning...</span>
                                        </div>
                                        <div className="flex border border-orange-500/20 bg-orange-500/5 p-4 self-center w-full max-w-[200px] aspect-video relative">
                                             <div className="w-2 h-2 bg-red-500 absolute top-[30%] left-[40%] rounded-full opacity-80 blur-sm"></div>
                                             <div className="w-full h-full border border-dashed border-slate-700/50"></div>
                                        </div>
                                        <div className="text-white font-mono text-xs">
                                            [=========&gt; ] 75%
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 10. COMPARISON TABLE */}
                <div className="max-w-5xl mx-auto px-4 md:px-8 py-32">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-white uppercase font-mono">Decisión de Taller.</h2>
                    </div>
                    
                    <div className="bg-slate-900 border border-slate-800 shadow-xl max-w-4xl mx-auto">
                        <div className="grid grid-cols-3 bg-slate-950 border-b border-slate-800 text-[10px] font-black uppercase tracking-widest text-slate-500 font-mono">
                            <div className="p-4 md:p-8">Tecnología CNC</div>
                            <div className="p-4 md:p-8 text-center text-orange-500 border-x border-slate-800 bg-orange-950/20">Láser de Diodo Activo</div>
                            <div className="p-4 md:p-8 text-center">Láser CO2 Gigante (Tubo)</div>
                        </div>
                        {[
                            { k: 'Inversión Inicial', u: 'Económico y Retornable (< 5 meses)', t: 'Costos prohibitivos (>$3000)' },
                            { k: 'Mantenimiento', u: 'Limpiar lente c/Alcohol', t: 'Cambiar bomba de agua y tubos' },
                            { k: 'Portabilidad', u: 'Pesará unos 4kg, se guarda.', t: 'Pesa 80kg y ocupa media sala.' },
                            { k: 'Uso Eléctrico', u: 'Consume lo que una laptop.', t: 'Requiere enchufes industriales.' }
                        ].map((r, i) => (
                            <div key={i} className="grid grid-cols-3 border-b border-slate-800/50 last:border-b-0 text-xs md:text-sm">
                                <div className="p-4 md:p-8 font-black text-slate-300 flex items-center uppercase">{r.k}</div>
                                <div className="p-4 md:p-8 font-bold text-white text-center flex items-center justify-center border-x border-slate-800 bg-orange-900/10 font-mono">{r.u}</div>
                                <div className="p-4 md:p-8 font-medium text-slate-600 text-center flex items-center justify-center opacity-60">{r.t}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 11. RISK REVERSAL WARRANTY */}
                <div className="max-w-5xl mx-auto px-4 md:px-8 py-12">
                    <div className="bg-slate-900 border-t-2 border-orange-500 p-10 md:p-14 text-white md:flex items-center gap-10">
                        <div className="relative z-10 w-full">
                            <div className="flex items-center justify-between border-b border-slate-800 pb-6 mb-6">
                                <h3 className="text-2xl md:text-3xl font-black tracking-tighter uppercase text-white font-mono">Protocolo de Confianza C.O.D.</h3>
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                            </div>
                            <p className="font-medium text-slate-400 leading-relaxed text-sm md:text-base max-w-3xl">
                                Comprar máquinas industriales online a ciegas desde China suele ser motivo de estafa. Por eso somos un ente logístico local. Solicita tu grabadora mediante la orden; nosotros usamos fletes de la zona que llevarán la enorme caja negra con moldes de resistencia hasta la mesa de tu casa. **Solo se le entrega el importe (Efectivo/Transferencia) al conductor una vez garantizada tu visualización física del stock.**
                            </p>
                        </div>
                    </div>
                </div>

                {/* 13. FAQ */}
                <div className="max-w-4xl mx-auto px-4 md:px-8 py-24 mb-16">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black tracking-tighter text-white uppercase">Soporte Técnico Maker.</h2>
                    </div>
                    <div className="space-y-4">
                        {[
                            {q: '¿Tira mucho humo?', a: 'Al quemar madera o cuero, sí. Es humo blanco de leña/olor a asado. Si cortas acrílico huele feo químico. Úsala cerca de una ventana tirando un ventilador o conectale un enclosure de extracción. ¡El humo es la evidencia de que funciona!'},
                            {q: '¿Puede esta herramienta grabar mi vaso termo Stanley (Acero)?', a: 'Si compras el modelo de 10W, necesitarás pintar el termo con aerosol negro, grabarlo y luego limpiar con solvente. Si usas el cabezal más fuerte (Dual 20W), puedes grabarlo directamente pero más lento.'},
                            {q: '¿Se rompe fácil, qué garantía tiene?', a: 'Construcción robusta en perfiles de aluminio formato V-Slot (igual que impresoras 3D industriales). Cambiar el módulo láser es tan sencillo como quitar 2 tornillos hexagonales. Tienes garantía de motor paso-a-paso por 6 meses.'}
                        ].map((f, i) => (
                            <div key={i} className="bg-slate-900 border border-slate-800 hover:border-orange-500 transition-colors">
                                <button onClick={() => setFaqOpen(faqOpen===i?null:i)} className="w-full text-left p-6 md:p-8 flex items-center justify-between font-black text-sm uppercase text-slate-200">
                                    <span className="pr-4">{f.q}</span>
                                    <span className="text-orange-500 font-bold text-2xl leading-none">{faqOpen===i?'-':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {faqOpen === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 md:px-8 pb-8 text-sm font-medium text-slate-400 leading-relaxed pt-0">
                                            {f.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 14. REVIEWS */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-24 border-t border-slate-800">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black tracking-tighter text-white uppercase mb-6">Fabricantes Locales.</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { r: "Inicié un emprendimiento haciendo llaveros y letreros para bodas de madera. En 2 meses recuperé lo invertido. Además amo que la manden contra entrega, estaba harto que me retengan máquinas en aduana internacional.", n: "Raúl Castañeda", t: "Carpintero & Maker", i: "https://images.unsplash.com/photo-1544383835-bca2bc6f5ea3?q=80&w=200&auto=format&fit=crop" },
                            { r: "Precisión absurda. El punto láser es tan fino que pude grabar un código QR funcional en un pedazo de cuero minúsculo. El envío llegó perfecto y aboné ahí mismo.", n: "Sofía T.", t: "Diseñadora Gráfica", i: "https://images.unsplash.com/photo-1590483868266-9922c2a13cc7?q=80&w=200&auto=format&fit=crop" },
                            { r: "He cortado acrílico rojo de 3mm usando pasadas lentas. Mi perro no soporta su sonido, pero es magia para mi negocio secundario. La recomiendo solo para gente que entienda lo básico de diseño (Photoshop).", n: "Miguel R.", t: "Dueño de PetShop", i: "https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80&w=200&auto=format&fit=crop" }
                        ].map((rev, i) => (
                            <div key={i} className="bg-slate-900 p-8 border border-slate-800 hover:border-orange-500/50 transition-colors duration-300">
                                <p className="text-sm font-medium text-slate-400 leading-relaxed mb-8">"{rev.r}"</p>
                                <div className="flex items-center gap-4 border-t border-slate-800 pt-6">
                                    <img src={rev.i} alt={rev.n} className="w-10 h-10 object-cover grayscale rounded-full border border-slate-700"/>
                                    <div>
                                        <div className="text-xs font-black text-white uppercase">{rev.n}</div>
                                        <div className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">{rev.t}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 15. CHECKOUT */}
                <div id="checkout-action" className="py-24 md:py-32 bg-slate-950 relative border-t-[8px] border-orange-500 overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                    <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24 items-center">
                        <div className="md:col-span-5 relative text-center md:text-left">
                            <span className="text-[10px] font-black uppercase tracking-widest text-orange-500 mb-6 bg-orange-500/10 border border-orange-500/30 px-3 py-1 inline-block">Proceso Logístico Local (Pago al Recibir)</span>
                            <h3 className="text-5xl md:text-6xl font-black tracking-tighter mb-6 text-white uppercase leading-[0.95] font-mono">Quema el<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">Catálogo.</span></h3>
                            <p className="text-sm font-medium text-slate-400 mb-10 leading-relaxed max-w-sm mx-auto md:mx-0">Llena esta data registral. No se debita dinero, es una orden directa a almacén. Pagas billete o giro físico cuando las poleas de aluminio choquen tus manos.</p>
                            
                            <div className="text-6xl font-black text-white tracking-tighter font-mono">{fmtPrice(product.price)}</div>
                        </div>
                        
                        <div className="md:col-span-7 w-full bg-slate-900 border border-slate-800 p-8 md:p-12 shadow-2xl relative">
                            <div className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-orange-500 m-2"></div>
                            <div className="absolute bottom-0 left-0 w-24 h-24 border-b-2 border-l-2 border-orange-500 m-2"></div>
                            <form onSubmit={e=>e.preventDefault()}>
                                <div className="space-y-6">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest font-mono">Maker's Label</label>
                                        <input type="text" className="w-full bg-slate-950 border border-slate-800 focus:border-orange-500 text-white font-bold text-sm px-6 py-4 outline-none transition-all rounded-none" placeholder="Nombre Destinatario" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest font-mono">Enlace G.S.M</label>
                                        <input type="tel" className="w-full bg-slate-950 border border-slate-800 focus:border-orange-500 text-white font-bold text-sm px-6 py-4 outline-none transition-all rounded-none" placeholder="Teléfono Operativo" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest font-mono">Taller/Residencia (Drop-off)</label>
                                        <textarea rows={3} className="w-full bg-slate-950 border border-slate-800 focus:border-orange-500 text-white font-bold text-sm px-6 py-4 outline-none transition-all resize-none rounded-none" placeholder="Proporciona dirección con piso, puerta y ciudad real." />
                                    </div>
                                    <div className="pt-4">
                                        <button className="w-full h-[64px] bg-gradient-to-r from-orange-500 to-red-600 text-white font-black uppercase tracking-widest text-sm hover:from-white hover:to-white hover:text-red-700 transition-all font-mono border border-transparent shadow-[0_0_15px_rgba(249,115,22,0.3)]">
                                            [ Execute Dispatch ]
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </main>

            {/* STICKY MOBILE CTA */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
                <div className="bg-slate-900 border-t border-slate-800 p-4 flex items-center justify-between">
                    <div>
                        <div className="text-[10px] font-black uppercase text-orange-500 tracking-widest mb-1 font-mono">C.O.D.</div>
                        <div className="font-black text-white text-lg tracking-tighter leading-none font-mono">{fmtPrice(product.price)}</div>
                    </div>
                    <button onClick={() => document.getElementById('checkout-action')?.scrollIntoView({ behavior: 'smooth' })} className="bg-orange-500 text-black px-6 py-3 font-black uppercase tracking-widest text-[11px] font-mono">
                        Despachar
                    </button>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{__html: `
                @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
                .animate-marquee { animation: marquee 16s linear infinite; }
                @keyframes shimmer { 0% { background-position: 200%; } 100% { background-position: -200%; } }
            `}} />
        </div>
    );
};

export default PdpLaserEngraver;
