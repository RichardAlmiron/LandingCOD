'use client';
import React, { useState } from 'react';
import { StoreData, Product } from '@/lib/types';
import EnhancedProductGallery from '@/components/pdp/EnhancedProductGallery';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { data: StoreData; product: Product; }

const PdpPowerStation: React.FC<Props> = ({ data, product }) => {
    const [openSpecAcc, setOpenSpecAcc] = useState<number | null>(0);
    const [faqOpen, setFaqOpen] = useState<number | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const ai = product.aiContent;
    const fmtPrice = (n: number) => { const s = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); return `Gs. ${s}`; };
    
    // Aesthetic Palette: Industrial Power
    const bg = '#0f172a'; // Slate 900
    const textMain = '#f8fafc'; // Slate 50
    const accentPower = '#10b981'; // Emerald 500 (Full battery)
    const warningColor = '#f59e0b'; // Amber 500

    return (
        <div style={{ background: bg, color: textMain, fontFamily: "'Inter', sans-serif" }} className="overflow-x-hidden selection:bg-emerald-500/30 antialiased relative">
            
            {/* 0. AMBIENT GRID */}
            <div className="fixed inset-0 pointer-events-none z-0 opacity-10" style={{ backgroundImage: `linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)`, backgroundSize: '40px 40px' }}></div>

            {/* 1. TOP NAV */}
            <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <svg className="text-emerald-400" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                        <span className="text-xl font-black uppercase tracking-tighter text-slate-100">VOLT<span className="text-emerald-400">CORE</span></span>
                    </div>
                    <nav className="hidden lg:flex gap-8">
                        {['Celda', 'Fase', 'Blindaje'].map((item) => (
                            <a key={item} href={`#${item.toLowerCase()}`} className="text-xs font-bold tracking-widest uppercase text-slate-400 hover:text-emerald-400 transition-colors">
                                {item}
                            </a>
                        ))}
                    </nav>
                </div>
            </header>

            <main className="relative z-10">
                {/* 2. BREADCRUMBS & MICRO-LOGISTICS */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6 pb-4">
                    <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-widest text-slate-500">
                        <div className="flex items-center gap-2">
                            <span>GRID</span> <span className="text-slate-700">/</span> <span>ENERGY</span> <span className="text-slate-700">/</span> <span className="text-white">{product.title.substring(0, 15)}...</span>
                        </div>
                        <div className="flex items-center gap-2 border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-emerald-400 rounded">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                            Distribución Activa (24H)
                        </div>
                    </div>
                </div>

                {/* 3. HERO SECTION */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 lg:py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="relative bg-slate-800/50 p-6 rounded-2xl border border-slate-700 shadow-2xl backdrop-blur-sm">
                            <EnhancedProductGallery product={product} accentColor={accentPower} />
                            
                            {/* Battery level indicator UI overlay */}
                            <div className="absolute top-8 right-8 w-12 h-24 border-2 border-slate-600 rounded-sm p-1 flex flex-col justify-end bg-slate-900/80 backdrop-blur">
                                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-2 bg-slate-600 rounded-t-sm"></div>
                                <div className="w-full h-full bg-slate-800 flex flex-col justify-end gap-1 overflow-hidden">
                                    {[...Array(5)].map((_, i) => (
                                        <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 * i }} className="w-full h-1/5 bg-emerald-400"></motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        <div className="flex flex-col relative pt-4">
                            {/* Rating */}
                            <div className="flex items-center gap-2 mb-6 bg-slate-800/50 inline-flex w-max px-3 py-1.5 rounded-full border border-slate-700">
                                <div className="flex text-emerald-400">
                                    {[...Array(5)].map((_,i) => <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
                                </div>
                                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Testado: Carga Máxima (4.9/5)</span>
                            </div>
                            
                            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-6">
                                {ai?.enhancedTitle || product.title}
                            </h1>
                            <p className="text-sm md:text-base font-medium text-slate-400 mb-10 leading-relaxed border-l-2 border-emerald-500 pl-4">
                                {ai?.enhancedDescription || product.description || 'Independencia eléctrica absoluta. Enciende refrigeradores, sierras y equipos médicos durante el apagón. Inversor de onda senoidal pura y 3000 ciclos de vida.'}
                            </p>

                            <div className="bg-slate-800 border border-slate-700 p-8 rounded-2xl mb-8 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[50px] rounded-full pointer-events-none"></div>
                                <div className="flex items-end gap-6 mb-8 relative z-10">
                                    <span className="text-4xl md:text-5xl font-black text-white">{fmtPrice(product.price)}</span>
                                    {product.originalPrice && <span className="text-lg font-bold text-slate-500 line-through pb-1">{fmtPrice(product.originalPrice)}</span>}
                                </div>
                                <button onClick={() => document.getElementById('checkout-power')?.scrollIntoView({ behavior: 'smooth' })} className="w-full h-[64px] bg-emerald-500 text-slate-900 font-black uppercase tracking-widest text-sm hover:bg-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all rounded-lg flex items-center justify-center gap-3">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                                    Asignar Estación a mi Sector
                                </button>
                            </div>

                            {/* 4. TRUST BADGES */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[
                                    {v: 'LiFePO4', l: 'Química Celda'},
                                    {v: 'BMS', l: 'Protección IA'},
                                    {v: '48H', l: 'Envío Terrestre'},
                                    {v: 'COD', l: 'Trato Directo'}
                                ].map((b, i) => (
                                    <div key={i} className="flex flex-col border border-slate-800 p-3 rounded-lg text-center bg-slate-900/50">
                                        <span className="text-emerald-400 font-black uppercase tracking-wider text-xs mb-1">{b.v}</span>
                                        <span className="text-[9px] font-bold text-slate-500 uppercase">{b.l}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 5. ABOVE FOLD DETAILS (ACCORDIONS) */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 pb-16">
                    <div className="border border-slate-700 bg-slate-800/80 rounded-2xl overflow-hidden backdrop-blur-md">
                        {[
                            { t: 'Inversor AC Integral', a: 'Suministra energía pura (Pure Sine Wave). No dañará tus laptops, respiradores o TVs caras, algo común en generadores a gasolina baratos.' },
                            { t: 'Recarga Multivía Rápida', a: 'Carga dual por panel solar y toma de pared AC simultáneamente. Pasa del 0% al 80% en apenas 1 hora. Lista antes del próximo corte.' },
                            { t: 'Blindaje Comercial', a: 'Cero fraudes. Tras confirmar acá, enviaremos la pesada unidad a tu domicilio; la desempacas y pagas en la propia puerta de tu garaje o casa.' }
                        ].map((ac, i) => (
                            <div key={i} className="border-b border-slate-700 last:border-b-0">
                                <button onClick={() => setOpenSpecAcc(openSpecAcc===i?null:i)} className="w-full text-left px-8 py-5 flex items-center justify-between font-bold uppercase text-[11px] tracking-widest text-slate-200 hover:bg-slate-700/50 transition-colors">
                                    {ac.t} 
                                    <div className="text-emerald-500 font-bold text-lg font-mono">{openSpecAcc===i?'-':'+'}</div>
                                </button>
                                <AnimatePresence>
                                    {openSpecAcc === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-8 pb-6 pt-2 text-sm font-medium text-slate-400 leading-relaxed">
                                            {ac.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 6. ENDLESS MARQUEE (GRID STYLE) */}
                <div className="w-[100vw] overflow-hidden py-3 bg-emerald-500 border-y border-emerald-400 relative left-[50%] -translate-x-[50%]">
                    <div className="flex whitespace-nowrap animate-marquee font-black uppercase text-sm tracking-widest text-slate-900">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="flex items-center gap-12 px-6">
                                <span>SIN HUMO. SIN RUIDO.</span><span>✦</span>
                                <span>BATERÍA EV-GRADE (10 AÑOS)</span><span>✦</span>
                                <span>CONTROL INTELIGENTE BLUETOOTH</span><span>✦</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 7. WHY TO USE / BENEFITS */}
                <div id="celda" className="max-w-7xl mx-auto px-4 md:px-8 py-24">
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-20 text-center">Apaga el corte de <span className="text-emerald-400">Luz.</span></h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { ic: 'M3 3h18v18H3V3zm16 16V5H5v14h14zm-8-2h2v-4h4v-2h-4V7h-2v4H7v2h4v4z', t: 'Puertos Masivos', d: 'Hasta 12 o 15 dispositivos a la vez. Desde USB-C a 100W, tomas de corriente alternas de 110/220v y encendedor de auto de 12V.' },
                            { ic: 'M12 2L2 22h20L12 2zm0 4.5L18.5 19H5.5L12 6.5zm-1 3v5h2v-5h-2zm0 6v2h2v-2h-2z', t: 'Rescate Crítico (EPS)', d: 'Si lo conectas a la PC y la luz se corta, cambia al modo batería en 30ms. Tu computadora no se apagará nunca.' },
                            { ic: 'M20 6h-2V4h-2v2h-8V4H6v2H4v14h16V6zm-2 12H6V10h12v8z', t: 'Celda LiFePO4', d: 'La misma química que los autos eléctricos modernos. Es la batería más segura y térmica, no explota ni degrada por 3,000 ciclos diarios.' }
                        ].map((b, i) => (
                            <div key={i} className="bg-slate-800/30 border border-slate-700 p-10 rounded-2xl text-center hover:-translate-y-1 transition-transform relative group">
                                <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none"></div>
                                <div className="text-emerald-400 mx-auto flex items-center justify-center mb-8">
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor"><path d={b.ic}/></svg>
                                </div>
                                <h3 className="text-lg font-black tracking-widest uppercase mb-4 text-white">{b.t}</h3>
                                <p className="text-sm font-medium text-slate-400 leading-relaxed">{b.d}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 8. HOW TO USE (VISUAL GUIDE) */}
                <div id="fase" className="bg-[#0b1120] py-24 border-y border-slate-800">
                    <div className="max-w-7xl mx-auto px-4 md:px-8">
                        <div className="text-center mb-16">
                            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest border border-emerald-500/30 px-3 py-1 rounded">MANUAL DE OPERACIÓN</span>
                            <h2 className="text-4xl font-black text-white uppercase tracking-tighter mt-6">Cero Mantenimiento.</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { s: 'ON', t: 'Apreta un Botón', d: 'Nada de tirar de una cuerda con fuerza y mancharte de aceite/nafta. Apretás el botón maestro y ya hay 2000W listos.' },
                                { s: 'PLUG', t: 'Soluciona la Noche', d: 'Enchufa el ventilador, la TV, las luces del camping y tu celular directamente. Tiene salidas puras con supresión de picos.' },
                                { s: 'SUN', t: 'Carga Libre', d: 'Si te vas 3 días al monte, conéctale los paneles solares opcionales para recoger electrones gratuitos del cielo por siempre.' }
                            ].map((s, i) => (
                                <div key={i} className="flex flex-col bg-slate-900 border border-slate-700 p-8 rounded-xl relative overflow-hidden">
                                    <div className="absolute -bottom-4 -right-4 font-black text-7xl text-slate-800 pointer-events-none">{s.s}</div>
                                    <div className="w-12 h-12 bg-slate-800 border border-slate-600 rounded flex items-center justify-center mb-6">
                                        <div className="text-sm font-black uppercase text-emerald-400">{i+1}</div>
                                    </div>
                                    <h4 className="text-lg font-black uppercase tracking-wider mb-2 text-white relative z-10">{s.t}</h4>
                                    <p className="text-sm text-slate-400 font-medium leading-relaxed relative z-10">{s.d}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 9. DEEP DIVE MULTIMEDIA */}
                <div className="py-24 max-w-7xl mx-auto px-4 md:px-8">
                    <div className="bg-slate-800 border border-slate-600 rounded-3xl p-8 md:p-16 relative overflow-hidden text-center md:text-left flex flex-col md:flex-row items-center gap-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                        {/* Fake Fan Grille */}
                        <div className="absolute top-0 right-0 w-64 h-full bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,#475569_2px,#475569_4px)] opacity-20 pointer-events-none"></div>
                        
                        <div className="flex-1 relative z-10">
                            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6">Poder que puedes respirar.</h2>
                            <p className="text-base font-medium text-slate-300 leading-relaxed mb-0">Los generadores de antes emiten monóxido de carbono, son pesados y ruidosos. Éste puedes tenerlo metido bajo tu mesa en plena oficina trabajando cómodamente, sin ruido mayor a 30dB y sin asfixiarte.</p>
                        </div>
                        <div className="w-32 h-32 md:w-48 md:h-48 border-[8px] border-slate-700 rounded-full flex items-center justify-center relative shrink-0 z-10 bg-slate-900">
                            <div className="absolute inset-0 border-4 border-emerald-500 rounded-full animate-[spin_3s_linear_infinite]" style={{ borderTopColor: 'transparent', borderLeftColor: 'transparent' }}></div>
                            <span className="text-3xl font-black text-emerald-400">0dB</span>
                        </div>
                    </div>
                </div>

                {/* 10. COMPARISON TABLE */}
                <div className="max-w-5xl mx-auto px-4 md:px-8 py-16">
                    <h2 className="text-3xl font-black uppercase tracking-tighter text-center mb-12">Batalla de Arquitecturas.</h2>
                    <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden shadow-2xl">
                        <div className="grid grid-cols-3 bg-slate-900 border-b border-slate-700 p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
                            <div>Especificación</div>
                            <div className="text-emerald-400 text-center">Power Station LFP</div>
                            <div className="text-slate-500 text-center">Generador Combustible</div>
                        </div>
                        {[
                            { k: 'Uso en Interiores', u: '100% Seguro (No Emite Humo)', t: 'Prohibido (Intoxicación Severa)' },
                            { k: 'Mantenimiento Anual', u: 'Cero pesos de por vida', t: 'Cambio de Aceite, Bujías, Limpieza' },
                            { k: 'Arranque en Frío', u: 'Botón Digital Inmediato', t: 'Tirar una cuerda por 5 minutos' },
                            { k: 'Onda Creada', u: 'Pura (Segura para PC)', t: 'Sucia (Quema fuentes de poder)' }
                        ].map((r, i) => (
                            <div key={i} className="grid grid-cols-3 p-6 border-b border-slate-700 last:border-b-0 items-center hover:bg-slate-800/80 transition-colors">
                                <div className="text-xs font-bold text-slate-200 uppercase tracking-wider">{r.k}</div>
                                <div className="text-center font-black text-white text-sm">{r.u}</div>
                                <div className="text-center font-bold text-slate-500 text-xs line-through">{r.t}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 11. RISK REVERSAL WARRANTY */}
                <div className="max-w-5xl mx-auto px-4 md:px-8 py-16">
                    <div className="bg-amber-500/10 border-l-4 border-amber-500 p-8 md:p-12 rounded-r-2xl flex flex-col md:flex-row items-center gap-8 text-center md:text-left shadow-lg">
                        <div className="w-20 h-20 bg-amber-500 text-slate-900 rounded-full flex flex-shrink-0 items-center justify-center font-black text-4xl">
                            !
                        </div>
                        <div>
                            <h3 className="text-2xl font-black uppercase tracking-tighter mb-4 text-white">Transacción Fuerte y Segura.</h3>
                            <p className="font-medium text-sm md:text-base leading-relaxed text-slate-300">Estas estaciones eléctricas involucran peso logístico importante. Sin embargo, no te pediremos ni una tarjeta online. Rellena la orden, enviamos el bunker pesando ~20kg a la tolva de tu casa, el camión te baja la unidad con sus respectivos 2 años de garantía nativa, y recién abonas la compra en tu acera.</p>
                        </div>
                    </div>
                </div>

                {/* 12. BRAND ETHOS */}
                <div className="py-24 border-y border-slate-800 mt-12 bg-slate-900/50 text-center px-4">
                    <div className="max-w-3xl mx-auto">
                        <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8 text-white">Tu propio sistema <span className="text-emerald-400">Descentralizado.</span></h3>
                        <p className="text-base font-medium text-slate-400 leading-relaxed uppercase tracking-widest">Nos adaptamos a caídas del tendido local. Cuando otros quedan a ciegas y aislados, las familias equipadas y empresas prevenidas encienden sus routers, alimentan sus heladeras con comida y mantienen la civilización bajo control. Un bloque de energía que dura 10 años.</p>
                    </div>
                </div>

                {/* 13. FAQ */}
                <div id="blindaje" className="max-w-3xl mx-auto px-4 md:px-8 py-24">
                    <h2 className="text-2xl font-black uppercase tracking-widest text-center mb-16 opacity-50">Consulta de Redes</h2>
                    <div className="space-y-4">
                        {[
                            {q: '¿Puede correr un microondas o aire acondicionado chico?', a: 'La respuesta depende de los Watts. Soporta descargas continuas de hasta 1500W y picos de 3000W. Un microondas estándar demanda 800W, así que es pan comido.'},
                            {q: 'Si la dejo guardada, ¿Se agota?', a: 'El sistema de químicos internos LiFePO4 permite que retenga un 80% de su carga por 6 meses completos encimada en el estante de tu garage apagada.'},
                            {q: '¿Cómo hago efectivo el pago físico?', a: 'Almacena tus coordenadas en la sección que sigue. Coordinaremos el transporte de carga por mensajería al destintario indicado y a su arribo final te cobrará la plata.'}
                        ].map((f, i) => (
                            <div key={i} className="bg-slate-800 border border-slate-700 rounded-lg">
                                <button onClick={() => setFaqOpen(faqOpen===i?null:i)} className="w-full text-left py-6 px-6 flex items-center justify-between font-bold text-sm tracking-widest uppercase hover:bg-slate-700/50 transition-colors">
                                    <span>{f.q}</span>
                                    <span className="text-emerald-400 text-xl font-bold">{faqOpen===i?'-':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {faqOpen === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 pb-6 text-sm font-medium text-slate-400 leading-relaxed border-t border-slate-700 pt-6">
                                            {f.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 14. EXPANDED REVIEWS (UGC) */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 border-t border-slate-800">
                    <div className="text-center mb-16">
                        <div className="flex justify-center text-emerald-400 mb-4">
                            {[...Array(5)].map((_,i) => <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
                        </div>
                        <h2 className="text-3xl font-black uppercase tracking-tighter text-white mb-2">Despachos Funcionales.</h2>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600">Base de Usuarios</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { r: "Tuvimos un apagón por tres días seguidos en el huracán. Los vecinos sufrieron mucho, pero mi familia tuvo el router WiFi, luces y celulares a tope. Fue un salvavidas de verdad.", n: "Miguel R.", t: "Padre Familia" },
                            { r: "Soy editor de video y se me cortaba la luz en pleno render. Activé esta caja pesada y problema borrado. No hace el ruido imbécil a motor de mi generador viejo.", n: "Bruno D.", t: "Freelancer" },
                            { r: "Excelente. Puse la chata en la dirección, me llegó un mini-pallet directo a mi garage y le dí efectivo al fletero. Material muy premium por cierto de la carcasa.", n: "Andrés V.", t: "Contratista" }
                        ].map((rev, i) => (
                            <div key={i} className="bg-slate-800/80 border border-slate-700 p-8 rounded-xl relative shadow-lg">
                                <div className="text-sm font-bold bg-slate-900 border border-slate-700 px-3 py-1 inline-block mb-6 text-slate-400 uppercase tracking-widest">{rev.n}</div>
                                <p className="text-sm font-medium text-slate-300 leading-relaxed italic mb-8">"{rev.r}"</p>
                                <div className="text-[10px] uppercase font-bold text-emerald-400 tracking-widest">{rev.t}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 15. CHECKOUT */}
                <div id="checkout-power" className="py-24 bg-emerald-500 relative mt-10">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-multiply"></div>
                    <div className="max-w-5xl mx-auto px-4 md:px-8 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                        <div className="md:col-span-5 text-center md:text-left">
                            <h3 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-4 text-slate-900">Asegura tu<br/>Red.</h3>
                            <p className="text-sm font-bold text-slate-800 mb-8 uppercase tracking-widest">Liquidación Presencial a Destino.</p>
                            <div className="text-5xl font-black text-slate-900 bg-emerald-400 inline-block p-4 border-2 border-slate-900 shadow-[8px_8px_0_#0f172a]">{fmtPrice(product.price)}</div>
                        </div>
                        <div className="md:col-span-7">
                            <form className="bg-slate-900 border border-slate-700 p-8 md:p-10 rounded-xl shadow-[0_30px_60px_rgba(0,0,0,0.4)]" onSubmit={e=>e.preventDefault()}>
                                <div className="space-y-5">
                                    <input type="text" className="w-full bg-slate-800 border-2 border-slate-700 focus:border-emerald-400 text-white font-bold text-sm px-6 py-5 outline-none transition-colors rounded uppercase" placeholder="[N. IDENTIDAD] Nombre Completo" />
                                    <input type="tel" className="w-full bg-slate-800 border-2 border-slate-700 focus:border-emerald-400 text-white font-bold text-sm px-6 py-5 outline-none transition-colors rounded uppercase" placeholder="[ENLACE] Número Celular Activo" />
                                    <textarea rows={2} className="w-full bg-slate-800 border-2 border-slate-700 focus:border-emerald-400 text-white font-bold text-sm px-6 py-5 outline-none transition-colors resize-none rounded uppercase" placeholder="[UBICACIÓN] Dirección Física" />
                                    <div className="pt-6">
                                        <button className="w-full h-[70px] bg-emerald-500 text-slate-900 font-black uppercase tracking-[0.2em] text-lg rounded-lg hover:bg-white transition-colors flex items-center justify-center gap-3">
                                            Aprobar Despliegue COD
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
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
                <div className="bg-slate-900 border border-slate-700 p-4 rounded-xl flex items-center justify-between shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
                    <div className="pl-2">
                        <div className="text-[10px] font-bold uppercase text-slate-500 tracking-widest">En Puerta</div>
                        <div className="font-black text-white text-xl leading-none mt-1">{fmtPrice(product.price)}</div>
                    </div>
                    <button onClick={() => document.getElementById('checkout-power')?.scrollIntoView({ behavior: 'smooth' })} className="bg-emerald-500 text-slate-900 rounded-lg px-8 py-3 font-black uppercase tracking-widest text-[11px]">
                        Pedir
                    </button>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{__html: `
                @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
                .animate-marquee { animation: marquee 16s linear infinite; }
            `}} />
        </div>
    );
};

export default PdpPowerStation;
