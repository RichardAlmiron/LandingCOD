'use client';
import React, { useState } from 'react';
import { StoreData, Product } from '@/lib/types';
import EnhancedProductGallery from '@/components/pdp/EnhancedProductGallery';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { data: StoreData; product: Product; }

const PdpSillaErgo: React.FC<Props> = ({ data, product }) => {
    const [openSpecAcc, setOpenSpecAcc] = useState<number | null>(0);
    const [faqOpen, setFaqOpen] = useState<number | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const ai = product.aiContent;
    const fmtPrice = (n: number) => { const s = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); return `Gs. ${s}`; };
    
    // Aesthetic Palette: Ergonomic Corporate Engineering
    const bg = '#ffffff'; 
    const textMain = '#0f172a'; // Slate 900
    const accent = '#0284c7'; // Light Blue 600 (clinical/tech)
    const cardBg = '#f8fafc'; // Slate 50
    const borderCol = '#e2e8f0'; // Slate 200

    return (
        <div style={{ background: bg, color: textMain, fontFamily: "'Inter', sans-serif" }} className="overflow-x-hidden selection:bg-[#0284c7] selection:text-white antialiased">
            
            {/* 0. AMBIENT MESH GRID */}
            <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.02]" style={{ backgroundImage: `radial-gradient(#000 1px, transparent 1px)`, backgroundSize: '16px 16px' }}></div>

            {/* 1. TOP NAV (Engineering Blueprint Style) */}
            <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                        <span className="font-bold text-xl tracking-tight text-slate-900 uppercase">
                            Ergo<span className="text-slate-400 font-light">Matrix</span>
                        </span>
                    </div>
                    <nav className="hidden md:flex gap-8">
                        {['Biomecánica', 'Postura', 'Ingeniería'].map((item) => (
                            <a key={item} href={`#${item.toLowerCase()}`} className="text-xs font-semibold tracking-wider uppercase text-slate-500 hover:text-[#0284c7] transition-colors relative group">
                                {item}
                                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#0284c7] transition-all group-hover:w-full"></span>
                            </a>
                        ))}
                    </nav>
                </div>
            </header>

            <main className="relative z-10">
                {/* 2. BREADCRUMBS & MICRO-LOGISTICS */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 pb-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200 w-max">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7] animate-pulse"></span>
                            MOBILIARIO / CLASE EJECUTIVA / <span className="text-slate-800">{product.title.substring(0, 15)}...</span>
                        </div>
                        <div className="text-xs font-semibold text-[#0284c7] flex items-center gap-2">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/></svg>
                            Logística de Carga Pesada (24-48H)
                        </div>
                    </div>
                </div>

                {/* 3. HERO SECTION (CLINICAL & STRUCTURAL) */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 lg:py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
                        <div className="lg:col-span-6 order-2 lg:order-1 flex flex-col pt-4">
                            {/* Medical / Ortho Badge */}
                            <div className="inline-flex items-center gap-2 bg-blue-50 text-[#0284c7] px-4 py-2 rounded-lg border border-blue-100 mb-8 w-max">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                                <span className="text-[11px] font-bold uppercase tracking-widest">Soporte Vertebral Grado Médico</span>
                            </div>
                            
                            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-slate-900 leading-[1.05] mb-6">
                                {ai?.enhancedTitle || product.title}
                            </h1>
                            <p className="text-base md:text-lg font-medium text-slate-500 mb-10 leading-relaxed border-l-4 border-[#0284c7] pl-5 py-1">
                                {ai?.enhancedDescription || product.description || 'Diseñada a partir de 1,000 escaneos anatómicos. Malla elastomérica de tensión activa, soporte lumbar sincronizado y pistón de gas Clase 4. El fin definitivo de tus contracturas cervicales.'}
                            </p>

                            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 lg:p-8 relative shadow-sm">
                                <div className="flex flex-col sm:flex-row sm:items-end gap-6 mb-8">
                                    <span className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900">{fmtPrice(product.price)}</span>
                                    {product.originalPrice && <span className="text-xl font-bold text-slate-400 line-through pb-1 decoration-slate-300">{fmtPrice(product.originalPrice)}</span>}
                                </div>
                                <button onClick={() => document.getElementById('checkout-action')?.scrollIntoView({ behavior: 'smooth' })} className="w-full h-[64px] bg-[#0284c7] text-white font-bold text-sm uppercase tracking-widest rounded-xl hover:bg-[#0369a1] transition-all shadow-[0_10px_20px_-10px_rgba(2,132,199,0.5)] flex items-center justify-center gap-3">
                                    Ensamblar en su Oficina
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                                </button>
                            </div>

                            {/* 4. TRUST BADGES TECHNICAL */}
                            <div className="grid grid-cols-3 gap-4 mt-8">
                                {[
                                    {v: '150 KG', l: 'Carga Máxima', ic: 'M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z'},
                                    {v: '135°', l: 'Inclinación Sync', ic: 'M3 10h18M3 14h18M5 6h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z'},
                                    {v: 'Clase 4', l: 'Pistón BIFMA', ic: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'}
                                ].map((b, i) => (
                                    <div key={i} className="flex flex-col px-2 py-4 bg-white border border-slate-200 rounded-xl">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2" className="mb-3 mx-auto"><path d={b.ic}/></svg>
                                        <span className="text-[#0284c7] font-black tracking-tight text-center text-sm">{b.v}</span>
                                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider text-center mt-1">{b.l}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="lg:col-span-6 order-1 lg:order-2 relative">
                            {/* Blueprint visual aids inside hero */}
                            <div className="absolute top-10 left-0 w-full h-[1px] bg-slate-200 z-0"></div>
                            <div className="absolute top-0 left-1/2 w-[1px] h-full bg-slate-200 z-0"></div>
                            
                            <div className="relative z-10 bg-white p-2 rounded-2xl border-4 border-slate-100 shadow-xl">
                                <EnhancedProductGallery product={product} accentColor={accent} />
                            </div>
                            
                            {/* Point indicators */}
                            <div className="absolute top-[20%] right-[15%] w-3 h-3 bg-[#0284c7] rounded-full z-20 shadow-[0_0_0_4px_rgba(2,132,199,0.2)] animate-pulse"></div>
                            <div className="absolute top-[60%] left-[10%] w-3 h-3 bg-[#0284c7] rounded-full z-20 shadow-[0_0_0_4px_rgba(2,132,199,0.2)] animate-pulse"></div>
                        </motion.div>
                    </div>
                </div>

                {/* 5. SPECIFICATION ACCORDIONS */}
                <div className="max-w-5xl mx-auto px-4 md:px-8 py-12">
                    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                        {[
                            { t: 'Malla Elastomérica de Tensión Dinámica', a: 'Olvídate del sudor en el asiento y en la espalda. Nuestra malla híbrida transpira al 100% mientras redistribuye tu peso evitando puntos de presión que cortan la circulación.' },
                            { t: 'Soporte Lumbar 3D (Bionic Spine)', a: 'Una estructura doble independiente abraza tu zona lumbar inferior. Cada vez que cambias de postura, las almohadillas pivotan para mantener la curva natural en \'S\' de tu columna.' },
                            { t: 'Entrega Corporativa Segura', a: 'No pagas con tarjeta. Nuestro equipo despacha esta caja robusta a tu domicilio/oficina. La recibes, constatas la calidad del aluminio y la malla, y le abonas el importe al encargado.' }
                        ].map((ac, i) => (
                            <div key={i} className="border-b border-slate-200 last:border-b-0 group">
                                <button onClick={() => setOpenSpecAcc(openSpecAcc===i?null:i)} className="w-full text-left px-8 py-6 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-800 hover:bg-slate-50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <span className="text-[#0284c7] bg-blue-50 px-2 py-1 rounded">0{i+1}</span>
                                        {ac.t}
                                    </div>
                                    <span className="text-[#0284c7] font-medium text-xl">{openSpecAcc===i?'-':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {openSpecAcc === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-8 pb-6 pl-20 text-sm font-medium text-slate-500 leading-relaxed">
                                            {ac.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 6. ENDLESS MARQUEE (TECH SPECS) */}
                <div className="w-[100vw] overflow-hidden py-5 bg-[#0284c7] relative left-[50%] -translate-x-[50%] mt-8 border-y border-[#0369a1]">
                    <div className="flex whitespace-nowrap animate-marquee font-black uppercase text-sm tracking-[0.2em] text-white">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="flex items-center gap-12 px-6">
                                <span>RESPALDO_BIÓNICO</span><span>•</span>
                                <span>REPOSABRAZOS_4D</span><span>•</span>
                                <span>ALUMINIO_PULIDO</span><span>•</span>
                                <span>INCLINACIÓN_SÍNCRONA</span><span>•</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 7. WHY TO USE / BENEFITS (ENGINEERING FOCUS) */}
                <div id="biomecanica" className="max-w-7xl mx-auto px-4 md:px-8 py-24">
                    <div className="text-center mb-20">
                        <span className="text-[#0284c7] font-bold text-xs uppercase tracking-[0.2em] mb-2 block">Déficit Postural</span>
                        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-slate-900">12 Horas sentado.<br/>Cero Consecuencias.</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
                        {/* Connecting line */}
                        <div className="hidden md:block absolute top-[40px] left-[15%] right-[15%] h-[2px] bg-slate-100 z-0"></div>
                        
                        {[
                            { ic: 'M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z', t: 'Estructura Aluminio', d: 'Adiós a las bases plásticas que crujen y se rompen al año. Base de estrella de 5 puntas forjada en aleación de aluminio pulido.' },
                            { ic: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', t: 'Espuma de Alta Densidad', d: 'El borde frontal del asiento baja suavemente (diseño cascada) evitando el corte de circulación en la parte inferior de los muslos.' },
                            { ic: 'M4 6h16M4 12h16m-7 6h7', t: 'Apoyabrazos 4D', d: 'Ajustables en Altura, Profundidad, Ángulo y Separación. Tus codos quedan a ras del escritorio evitando la tensión del trapecio.' }
                        ].map((b, i) => (
                            <div key={i} className="relative z-10 flex flex-col items-center text-center bg-white border border-slate-200 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow">
                                <div className="w-20 h-20 bg-slate-50 border-4 border-white shadow-sm rounded-2xl flex items-center justify-center mb-6 text-[#0284c7]">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={b.ic}/></svg>
                                </div>
                                <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 mb-4">{b.t}</h3>
                                <p className="text-sm font-medium text-slate-500 leading-relaxed">{b.d}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 8. HOW TO USE / SET UP AESTHETIC */}
                <div id="postura" className="bg-slate-900 py-24 border-y border-slate-800 text-white relative overflow-hidden">
                    {/* Dark grid background */}
                    <div className="absolute inset-0 opacity-[0.1]" style={{ backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`, backgroundSize: '40px 40px' }}></div>
                    
                    <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-6">Calibración<br/><span className="text-[#0284c7]">Personal.</span></h2>
                                <p className="text-slate-400 font-medium mb-10 max-w-md leading-relaxed">No es una silla estándar; es un exoesqueleto ajustable. Toma 3 minutos y aseguras años de salud vertebral.</p>
                                
                                <div className="space-y-6">
                                    {[
                                        { s: '01', t: 'Set de Altura Neumática', d: 'Con la palanca de gas derecha, nivela el asiente hasta que tus rodillas formen 90 grados y los pies toquen plano el piso.' },
                                        { s: '02', t: 'Regulación de Tensión', d: 'Gira la perilla inferior hasta que puedas balancearte hacia atrás sin forzar el abdomen, pero sin caer de golpe.' },
                                        { s: '03', t: 'Anclaje Lumbar', d: 'Desliza el cojín biónico trasero verticalmente hasta que encaje exactamente en la curvatura baja de tu espalda.' }
                                    ].map((s, i) => (
                                        <div key={i} className="flex gap-6 items-start bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                                            <div className="text-2xl font-black text-[#0284c7] bg-slate-900 w-12 h-12 flex items-center justify-center rounded-lg pt-1 shrink-0">{s.s}</div>
                                            <div>
                                                <h4 className="text-base font-bold uppercase tracking-wider mb-2 text-white">{s.t}</h4>
                                                <p className="text-sm font-medium text-slate-400 leading-relaxed">{s.d}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="relative border border-slate-700 rounded-2xl bg-slate-800 p-8 flex flex-col items-center justify-center min-h-[400px]">
                                <h3 className="text-7xl opacity-10 font-black tracking-tighter uppercase absolute top-10">Orthopedic</h3>
                                <div className="w-48 h-64 border-2 border-[#0284c7] flex flex-col justify-between p-4 bg-slate-900 z-10 relative shadow-[0_0_50px_rgba(2,132,199,0.2)]">
                                    <div className="w-full h-[2px] bg-slate-700"></div>
                                    <div className="text-center">
                                        <div className="text-[#0284c7] text-xs font-mono mb-2">SCANNING...</div>
                                        <div className="w-full h-1 bg-[#0284c7] animate-pulse"></div>
                                    </div>
                                    <div className="w-full h-[2px] bg-slate-700"></div>
                                    {/* Laser line overlay */}
                                    <motion.div animate={{ top: ['0%', '100%', '0%'] }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }} className="absolute left-0 w-full h-[2px] bg-[#0284c7] shadow-[0_0_10px_#0284c7]"></motion.div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 9. DEEP DIVE MULTIMEDIA */}
                <div className="py-24 bg-white relative">
                    <div className="max-w-4xl mx-auto px-4 md:px-8 text-center text-slate-900 border-4 border-slate-100 p-12 md:p-20 rounded-3xl relative overflow-hidden">
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-50 rounded-full blur-3xl -z-10"></div>
                        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-8">Movimiento Sincronizado.</h2>
                        <p className="text-lg font-medium text-slate-600 leading-loose max-w-2xl mx-auto">
                            Al inclinar la silla, el asiento y el respaldo se mueven en un ratio de 2:1. Esto significa que cuando te reclinas para pensar o descansar, tus pies no se levantan del suelo de forma incómoda y la sangre sigue fluyendo libremente a tus piernas.
                        </p>
                    </div>
                </div>

                {/* 10. COMPARISON TABLE */}
                <div className="max-w-5xl mx-auto px-4 md:px-8 py-20">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black uppercase tracking-tight text-slate-900">Análisis Competitivo.</h2>
                        <p className="text-sm font-bold text-[#0284c7] uppercase tracking-widest mt-2 block">Sillas "Gamer" vs Ingeniería Ergo</p>
                    </div>
                    
                    <div className="bg-white border rounded-2xl shadow-lg border-slate-200 overflow-hidden">
                        <div className="grid grid-cols-3 bg-slate-50 border-b border-slate-200 text-xs md:text-sm font-black uppercase tracking-wider text-slate-500">
                            <div className="p-4 md:p-6 text-left">Especificación</div>
                            <div className="p-4 md:p-6 text-center text-[#0284c7] bg-blue-50/50">ERGO MATRIX</div>
                            <div className="p-4 md:p-6 text-center">Silla Gamer Típica</div>
                        </div>
                        {[
                            { k: 'Material Principal', u: 'Malla transpirable 100%', t: 'Cuero PU (Sudor excesivo)' },
                            { k: 'Soporte Lumbar', u: 'Adaptativo 3D Sincronizado', t: 'Un cojín suelto inútil' },
                            { k: 'Contorno de Hombros', u: 'Acompaña el movimiento', t: 'Aletas que empujan hacia adelante' },
                            { k: 'Vida Útil Estimada', u: '10+ Años (No se pela)', t: '1-2 Años (El cuero se desintegra)' }
                        ].map((r, i) => (
                            <div key={i} className="grid grid-cols-3 border-b border-slate-100 last:border-b-0 text-sm">
                                <div className="p-4 md:p-6 font-bold text-slate-700 flex items-center">{r.k}</div>
                                <div className="p-4 md:p-6 font-black text-slate-900 text-center flex items-center justify-center bg-blue-50/50">{r.u}</div>
                                <div className="p-4 md:p-6 font-medium text-slate-400 text-center flex items-center justify-center line-through">{r.t}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 11. RISK REVERSAL WARRANTY */}
                <div className="max-w-5xl mx-auto px-4 md:px-8 py-12">
                    <div className="bg-[#0284c7] p-10 md:p-12 rounded-3xl text-white shadow-2xl relative overflow-hidden">
                        {/* Decorative Background Icon */}
                        <svg className="absolute -right-20 -bottom-20 w-80 h-80 text-blue-500/30" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 22h20L12 2zm0 4.5L18.5 19H5.5L12 6.5zm-1 3v5h2v-5h-2zm0 6v2h2v-2h-2z"/></svg>

                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                            <div className="w-24 h-24 bg-white text-[#0284c7] rounded-2xl shrink-0 flex items-center justify-center shadow-lg">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                            </div>
                            <div>
                                <h3 className="text-3xl font-black uppercase tracking-tight mb-4">Garantía Corporativa y Pago Seguros.</h3>
                                <p className="text-sm md:text-base font-medium text-blue-100 leading-relaxed max-w-2xl">
                                    Adquirir mobiliario de oficina no requiere riesgos online. Solicita la silla ahora, prepararemos una caja reforzada y la llevaremos a tu espacio de trabajo. Solo cuando compruebes la tensión de la malla y la firmeza del armazón, le pagas al conductor responsable. Tienes 3 años de garantía estructural.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 12. BRAND ETHOS */}
                <div className="py-24 bg-slate-50 border-t border-slate-200 mt-16 text-center px-4">
                    <div className="max-w-3xl mx-auto">
                        <div className="text-[#0284c7] flex justify-center mb-8">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                        </div>
                        <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-slate-900 mb-6">Tu salud no es un<br/>accesorio.</h3>
                        <p className="text-base font-medium text-slate-500 leading-loose max-w-2xl mx-auto">Un oficinista promedio pasa más de 20,000 horas sentado en una década. Gastas fortunas en zapatillas para correr 1 hora, pero te sientas en una silla barata durante 8. Hemos diseñado una herramienta preventiva para tu cuerpo.</p>
                    </div>
                </div>

                {/* 13. FAQ */}
                <div id="ingeniería" className="max-w-4xl mx-auto px-4 md:px-8 py-24">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black uppercase tracking-tight text-slate-900">Documentación Técnica.</h2>
                    </div>
                    <div className="space-y-4">
                        {[
                            {q: '¿Es difícil de ensamblar cuando llega?', a: 'Viene semi-armada. Solo necesitas encajar 5 tornillos gruesos en la base de la misma (herramienta incluida). El pistón y la estrella se encastran a presión sin herramientas. Armado total: 5 minutos.'},
                            {q: '¿La malla cede o se hunde con el tiempo?', a: 'La tela elastomérica está tensada a nivel industrial. Está clasificada para no perder ni un 5% de su tensión original por hasta 5 años de uso consecutivo diario.'},
                            {q: '¿El pago contra entrega admite transferencia?', a: 'Sí. El equipo logístico acudirá a la puerta de su empresa u hogar, podrá inspeccionar que la caja es la correcta, y abonar mediante sobre cerrado en efectivo o transferencia bancaria al instante.'}
                        ].map((f, i) => (
                            <div key={i} className="bg-white border text-left border-slate-200 rounded-xl overflow-hidden hover:border-[#0284c7] transition-colors">
                                <button onClick={() => setFaqOpen(faqOpen===i?null:i)} className="w-full text-left p-6 md:p-8 flex items-center justify-between font-bold text-sm text-slate-800 uppercase tracking-widest">
                                    <span>{f.q}</span>
                                    <span className="text-[#0284c7] text-xl font-bold">{faqOpen===i?'-':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {faqOpen === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 md:px-8 pb-8 text-sm font-medium text-slate-500 leading-relaxed border-t border-slate-100 pt-6">
                                            {f.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 14. EXPANDED REVIEWS (UGC) */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 border-t border-slate-200 bg-slate-50">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black uppercase tracking-tight text-slate-900 mb-4">Métricas de Satisfacción.</h2>
                        <div className="flex justify-center text-[#0284c7] mb-2">
                            {[...Array(5)].map((_,i) => <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { r: "Tenía dolores punzantes en la cervical baja tras programar 10hs. El primer día sentí la diferencia con el soporte lumbar activo. Es una locura de inversión indispensable.", n: "Carlos V.", t: "Software Engineer" },
                            { r: "Tiré a la basura esa silla gamer de cuerina que me daba calor. La malla de esta respira perfecto y el mecanismo sincronizado para reclinarte es fluidísimo.", n: "Andrés G.", t: "Trader Financiero" },
                            { r: "Muy seria la gente que entregó el producto. Llegó a mi piso, verifiqué que estaban todos los plásticos protectores y pagué ahí recién en efectivo. Armado muy fácil.", n: "Lorena M.", t: "Gerente RRHH" }
                        ].map((rev, i) => (
                            <div key={i} className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative">
                                <p className="text-sm font-medium text-slate-600 leading-relaxed mb-8 italic">"{rev.r}"</p>
                                <div className="flex flex-col border-t border-slate-100 pt-4">
                                    <span className="text-sm font-black uppercase tracking-tight text-slate-900">{rev.n}</span>
                                    <span className="text-[10px] font-bold text-[#0284c7] uppercase tracking-widest mt-1">{rev.t}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 15. CHECKOUT */}
                <div id="checkout-action" className="py-24 bg-slate-900 relative mt-12 overflow-hidden">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0284c7]/20 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
                    
                    <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center">
                        <div>
                            <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-6 text-white leading-none">Despliegue<br/><span className="text-[#0284c7]">de Equipamiento.</span></h3>
                            <p className="text-sm font-medium text-slate-400 mb-8 max-w-sm leading-relaxed">Autoriza la entrega del componente a tu zona operativa. Inspección y liquidación contra entrega.</p>
                            
                            <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl inline-block">
                                <div className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-2">Presupuesto Final</div>
                                <div className="text-5xl font-black text-white">{fmtPrice(product.price)}</div>
                            </div>
                        </div>
                        
                        <div className="w-full">
                            <form className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl relative" onSubmit={e=>e.preventDefault()}>
                                <div className="absolute -top-4 -right-4 bg-[#0284c7] text-white px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg shadow-lg rotate-3">
                                    Safe COD Box
                                </div>
                                <div className="space-y-5">
                                    <div className="flex flex-col gap-1">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-[#0284c7]">Titular del Cargo</label>
                                        <input type="text" className="w-full bg-slate-50 border-2 border-slate-200 focus:border-[#0284c7] text-slate-900 font-bold text-sm px-5 py-4 rounded-xl outline-none transition-colors" placeholder="Nombre Completo" />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-[#0284c7]">Vía Telefónica</label>
                                        <input type="tel" className="w-full bg-slate-50 border-2 border-slate-200 focus:border-[#0284c7] text-slate-900 font-bold text-sm px-5 py-4 rounded-xl outline-none transition-colors" placeholder="Celular / WhatsApp" />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-[#0284c7]">Destino Logístico</label>
                                        <textarea rows={2} className="w-full bg-slate-50 border-2 border-slate-200 focus:border-[#0284c7] text-slate-900 font-bold text-sm px-5 py-4 rounded-xl outline-none transition-colors resize-none" placeholder="Dirección Exacta de Oficina/Hogar" />
                                    </div>
                                    <div className="pt-4">
                                        <button className="w-full h-[64px] bg-[#0284c7] text-white font-black uppercase tracking-widest text-sm rounded-xl hover:bg-slate-900 transition-colors shadow-lg shadow-blue-500/30">
                                            Aprobar Despacho Físico
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </main>

            {/* STICKY MOBILE CTA */}
            <div className="md:hidden fixed bottom-4 left-4 right-4 z-50">
                <div className="bg-white border border-slate-200 p-4 rounded-2xl flex items-center justify-between shadow-[0_20px_40px_rgba(0,0,0,0.2)]">
                    <div>
                        <div className="text-[9px] font-bold uppercase text-slate-400 tracking-widest">Abono al Recibir</div>
                        <div className="font-black text-slate-900 text-xl tracking-tighter leading-none mt-1">{fmtPrice(product.price)}</div>
                    </div>
                    <button onClick={() => document.getElementById('checkout-action')?.scrollIntoView({ behavior: 'smooth' })} className="bg-[#0284c7] text-white rounded-xl px-8 py-3 font-bold uppercase tracking-widest text-[11px] shadow-sm">
                        Comprar
                    </button>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{__html: `
                @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
                .animate-marquee { animation: marquee 15s linear infinite; }
            `}} />
        </div>
    );
};

export default PdpSillaErgo;
