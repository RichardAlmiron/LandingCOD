'use client';
import React, { useState } from 'react';
import { StoreData, Product } from '@/lib/types';
import EnhancedProductGallery from '@/components/pdp/EnhancedProductGallery';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { data: StoreData; product: Product; }

const PdpPortableEspresso: React.FC<Props> = ({ data, product }) => {
    const [openSpecAcc, setOpenSpecAcc] = useState<number | null>(0);
    const [faqOpen, setFaqOpen] = useState<number | null>(null);
    const ai = product.aiContent;
    const fmtPrice = (n: number) => { const s = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); return `Gs. ${s}`; };
    
    // Aesthetic Palette: Outdoor Survival / Coffee
    const bg = '#1c1917'; // Stone 900
    const textMain = '#f5f5f4'; // Stone 50
    const accentBrew = '#d97706'; // Amber 600
    const accentSteel = '#78716c'; // Stone 500

    return (
        <div style={{ background: bg, color: textMain, fontFamily: "'Inter', sans-serif" }} className="overflow-x-hidden selection:bg-amber-600/30 selection:text-amber-200 antialiased">
            
            {/* 0. AMBIENT TEXTURE */}
            <div className="absolute top-0 right-0 w-full h-[1000px] bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')] opacity-[0.03] pointer-events-none z-0 mix-blend-overlay"></div>

            {/* 1. TOP NAV (Rugged) */}
            <header className="sticky top-0 z-50 bg-stone-900/90 backdrop-blur-md border-b border-stone-800">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-stone-800 border border-stone-600 flex items-center justify-center">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2.5"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/></svg>
                        </div>
                        <span className="font-black text-xl tracking-tight text-white uppercase flex items-center">
                            IRON<span className="text-amber-600 font-serif italic ml-1">BREW</span>
                        </span>
                    </div>
                </div>
            </header>

            <main className="relative z-10 w-full overflow-hidden">
                {/* 2. BREADCRUMBS & LOGISTICS */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6 pb-2">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-amber-500 bg-amber-900/20 px-4 py-2 rounded border border-amber-900/50 inline-flex items-center gap-2">
                            MÁQUINAS / OUTDOOR / <span className="text-white">{product.title.substring(0, 15)}...</span>
                        </div>
                        <div className="inline-flex items-center gap-2 text-[10px] font-black text-stone-500 uppercase tracking-widest">
                            ENTREGA FÍSICA • PAGO EN PUERTA
                        </div>
                    </div>
                </div>

                {/* 3. HERO SECTION (RUGGED STEEL & COFFEE) */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 lg:py-16 relative">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
                        <div className="flex flex-col relative z-20 lg:col-span-5">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="text-[10px] font-black text-stone-800 bg-white uppercase tracking-widest px-3 py-1 border border-stone-800">
                                    ESPRESSO 18 BAR DE PRESIÓN
                                </span>
                            </div>
                            
                            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-[0.95] mb-6 uppercase">
                                {ai?.enhancedTitle || "Espresso Manual de Supervivencia"}
                            </h1>
                            <p className="text-base md:text-lg font-medium text-stone-400 mb-10 leading-relaxed font-serif italic text-balance">
                                {ai?.enhancedDescription || "La crema perfecta no necesita electricidad. Construida en acero inoxidable y aluminio anodizado militar, presuriza a 18-Bar exactos en la punta de una montaña aislada."}
                            </p>

                            <div className="bg-stone-950 p-8 border border-stone-800 shadow-2xl relative block">
                                <div className="absolute top-0 right-0 w-2 h-full bg-amber-600"></div>
                                <div className="flex flex-col sm:flex-row sm:items-end gap-6 mb-8 relative z-10">
                                    <span className="text-5xl font-black text-white tracking-tighter">{fmtPrice(product.price)}</span>
                                    {product.originalPrice && <span className="text-lg font-medium text-stone-600 line-through pb-1">{fmtPrice(product.originalPrice)}</span>}
                                </div>
                                <button onClick={() => document.getElementById('checkout-action')?.scrollIntoView({ behavior: 'smooth' })} className="w-full h-[64px] bg-amber-600 text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-white hover:text-stone-900 transition-all duration-300 flex items-center justify-center">
                                    SOLICITAR UNIDAD DE CAMPAÑA
                                </button>
                                <div className="flex items-center justify-center gap-2 mt-4 text-[9px] font-black text-stone-500 uppercase tracking-widest">
                                    GARANTIZA OPERACIÓN C.O.D.
                                </div>
                            </div>
                        </div>

                        <div className="relative z-10 lg:col-span-7 flex items-center justify-center p-2">
 <div className="w-full max-w-[550px] relative bg-stone-900 border border-stone-800 shadow-[0_30px_60px_rgba(0,0,0,0.8)] p-2 rounded ">
                                <EnhancedProductGallery product={product} accentColor={accentBrew} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. TRUST BADGES TECHNICAL */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 pb-16 border-b border-stone-800">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            {v: '18 BAR', l: 'Presión Hidráulica'},
                            {v: 'Acero', l: 'Grado Quirúrgico'},
                            {v: '450g', l: 'Peso Mochilero'},
                            {v: 'Cápsula', l: 'Compatible Nespresso'}
                        ].map((b, i) => (
                            <div key={i} className="flex flex-col text-center items-center justify-center p-6 border-l border-stone-800 last:border-r">
                                <span className="text-white font-black text-3xl tracking-tighter mb-1 font-serif italic">{b.v}</span>
                                <span className="text-[9px] font-black text-stone-500 uppercase tracking-widest">{b.l}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 5. EXPERT ACCORDIONS */}
                <div className="max-w-4xl mx-auto px-4 md:px-8 py-20 relative">
                    <div className="mb-10 text-center relative z-10">
                        <h2 className="text-3xl font-black tracking-tighter text-white uppercase">El ritual donde <span className="text-amber-600 font-serif italic">sea.</span></h2>
                    </div>
                    <div className="bg-stone-950 border border-stone-800 rounded-sm">
                        {[
                            { t: 'Física pura, cero baterías', a: 'No dependes de cables o motores. Diseñada con una bomba hidráulica de bombeo pulgar patentada. Construyes los 18 BARES de presión bombeando 10 veces frente al vaso, forzando la extracción perfecta del café.' },
                            { t: 'Doble formato (Polvo/Cápsula)', a: 'Trae compartimiento dual. Si estás en la oficina, ponle una cápsula Nespresso rápida. Si estás en un cañón a kilómetros de civilización, carga el basket metálico con café arábica recién molido.' },
                            { t: 'Crema Barista Real', a: 'Lo que distingue a un aguachine de un Espresso es la extracción de aceites del grano. Al superar los 9 bares en cada bombeo, logras un shot oscuro y espeso, coronado con gruesa espuma dorada.' }
                        ].map((ac, i) => (
                            <div key={i} className="border-b border-stone-800 last:border-b-0">
                                <button onClick={() => setOpenSpecAcc(openSpecAcc===i?null:i)} className="w-full text-left p-6 md:p-8 flex items-center justify-between text-xs font-black uppercase tracking-widest text-stone-400 hover:text-white hover:bg-stone-900 transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className="w-6 h-6 bg-amber-600/20 text-amber-500 flex items-center justify-center font-bold">0{i+1}</div>
                                        {ac.t}
                                    </div>
                                    <span className="text-amber-600 font-black text-xl">{openSpecAcc===i?'-':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {openSpecAcc === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 md:px-8 pb-8 pl-[3.5rem] text-sm font-medium text-stone-500 leading-relaxed font-serif">
                                            {ac.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 7. BENEFITS CON IMAGENES */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-24 bg-black">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { img: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1000&auto=format&fit=crop', t: 'El Arte Táctico', d: 'Con solo 15cm de largo, cabe en la botella exterior de cualquier mochila táctica. Resiste caídas y polvo.' },
                            { img: 'https://images.unsplash.com/photo-1444419988131-046ed4e4d298?q=80&w=1000&auto=format&fit=crop', t: 'Motor a Pulso', d: 'Libera la perilla de bombeo. Unos pocos movimientos garantizan una extracción viscosa sin esfuerzo ridículo.' },
                            { img: 'https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?q=80&w=1000&auto=format&fit=crop', t: 'Taza Incorporada', d: 'La tapa protectora se transforma en un shot mug aislado térmicamente. Una solución todo en uno sin piezas sueltas.' }
                        ].map((b, i) => (
                            <div key={i} className="group cursor-default">
                                <div className="h-72 w-full relative overflow-hidden mb-6 filter sepia-[0.3]">
                                     <img src={b.img} alt={b.t} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-black text-white mb-2 uppercase tracking-wide">{b.t}</h3>
                                    <p className="text-sm font-medium text-stone-400 leading-relaxed text-balance">{b.d}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 10. COMPARISON TABLE */}
                <div className="max-w-5xl mx-auto px-4 md:px-8 py-32">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black tracking-tighter text-white uppercase font-serif italic">Contra lo tradicional.</h2>
                    </div>
                    
                    <div className="bg-stone-900 border border-stone-800 shadow-2xl">
                        <div className="grid grid-cols-3 bg-stone-950 border-b border-stone-800 text-[10px] font-black uppercase tracking-widest text-stone-500">
                            <div className="p-6 md:p-8">Métrica de Extracción</div>
                            <div className="p-6 md:p-8 text-center text-amber-500 border-x border-stone-800">MÁQUINA MANUAL</div>
                            <div className="p-6 md:p-8 text-center">Prensa Francesa Camping</div>
                        </div>
                        {[
                            { k: 'Presión Generada', u: '18 BAR (Espresso Real)', t: '1 BAR (Café aguachento)' },
                            { k: 'Crema / Espuma', u: 'Capa viscosa y dulce dorada', t: 'Nula' },
                            { k: 'Cápsulas Compatibles', u: 'Sí (Nespresso)', t: 'No, Solo grano grueso.' },
                            { k: 'Limpieza Poscampamento', u: 'Botar el disco de café (Puck) de un golpe', t: 'Engorroso, mucha agua sucia.' }
                        ].map((r, i) => (
                            <div key={i} className="grid grid-cols-3 border-b border-stone-800/50 last:border-b-0 text-xs md:text-sm">
                                <div className="p-6 md:p-8 font-black text-stone-300">{r.k}</div>
                                <div className="p-6 md:p-8 font-bold text-white text-center border-x border-stone-800 bg-amber-900/10">{r.u}</div>
                                <div className="p-6 md:p-8 font-medium text-stone-600 text-center line-through">{r.t}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 11. RISK REVERSAL WARRANTY */}
                <div className="max-w-5xl mx-auto px-4 md:px-8 py-12">
                    <div className="bg-[#111] p-10 md:p-14 text-white md:flex items-center gap-10 border border-stone-800 relative z-10 before:absolute before:inset-0 before:bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] before:opacity-20 before:z-[-1]">
                        <div className="w-16 h-16 shrink-0 bg-white text-black flex items-center justify-center font-black text-4xl mb-6 md:mb-0">!</div>
                        <div>
                            <h3 className="text-2xl font-black tracking-tight mb-3 uppercase">Pacto Logístico de Entrega Cero Riesgo.</h3>
                            <p className="font-medium text-stone-400 leading-relaxed text-sm">
                                Para los reacios a las tarjetas online: Todo nuestro equipamiento de supervivencia y outdoor reposa blindado en territorio nacional local. Usted provee la coordenada abajo, enviamos al mensajero táctico y verificas que el empaque primario no este violado antes de pagar la suma con dinero o transferencia local en mano.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 15. CHECKOUT */}
                <div id="checkout-action" className="py-24 md:py-32 bg-stone-900 relative">
                    <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24 items-center">
                        <div className="md:col-span-5 relative text-center md:text-left">
                            <span className="text-[10px] font-black uppercase tracking-widest text-amber-500 mb-6 bg-stone-800 px-3 py-1 inline-block border border-stone-700">ORDEN FÍSICA</span>
                            <h3 className="text-5xl md:text-6xl font-black tracking-tighter mb-6 text-white uppercase leading-[0.9] font-serif italic">Asegura la<br/>Extracción.</h3>
                            <div className="text-6xl font-black text-amber-500 tracking-tighter">{fmtPrice(product.price)}</div>
                        </div>
                        
                        <div className="md:col-span-7 w-full bg-stone-950 p-8 md:p-12 border-t-4 border-amber-600">
                            <form onSubmit={e=>e.preventDefault()}>
                                <div className="space-y-6">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-black text-stone-500 uppercase tracking-widest">Identificación Civil</label>
                                        <input type="text" className="w-full bg-stone-900 border border-stone-800 focus:border-amber-600 text-white font-bold text-sm px-6 py-4 outline-none transition-all" placeholder="Nombre Destinatario" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-black text-stone-500 uppercase tracking-widest">Comunicaciones</label>
                                        <input type="tel" className="w-full bg-stone-900 border border-stone-800 focus:border-amber-600 text-white font-bold text-sm px-6 py-4 outline-none transition-all" placeholder="Teléfono" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-black text-stone-500 uppercase tracking-widest">Waypoint de Despacho</label>
                                        <textarea rows={2} className="w-full bg-stone-900 border border-stone-800 focus:border-amber-600 text-white font-bold text-sm px-6 py-4 outline-none transition-all resize-none" placeholder="Dirección completa" />
                                    </div>
                                    <div className="pt-4">
                                        <button className="w-full h-[64px] bg-amber-600 text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-stone-100 hover:text-black transition-all">
                                            Ejecutar Misión C.O.D
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

export default PdpPortableEspresso;
