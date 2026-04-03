'use client';
import React, { useState } from 'react';
import { StoreData, Product } from '@/lib/types';
import EnhancedProductGallery from '@/components/pdp/EnhancedProductGallery';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { data: StoreData; product: Product; }

const PdpSmartSkiGoggles: React.FC<Props> = ({ data, product }) => {
    const [openSpecAcc, setOpenSpecAcc] = useState<number | null>(0);
    const [faqOpen, setFaqOpen] = useState<number | null>(null);
    const ai = product.aiContent;
    const fmtPrice = (n: number) => { const s = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); return `Gs. ${s}`; };
    
    // Aesthetic Palette: Alpine Frost / AR HUD
    const bg = '#f0fdfa'; // Teal 50
    const textMain = '#134e4a'; // Teal 900
    const accentCyan = '#06b6d4'; // Cyan 500
    const accentWhite = '#ffffff';

    return (
        <div style={{ background: bg, color: textMain, fontFamily: "'Inter', sans-serif" }} className="overflow-x-hidden selection:bg-cyan-500/20 selection:text-cyan-900 antialiased">
            
            {/* 1. TOP NAV (Alpine Gear) */}
            <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-2xl border-b border-cyan-100">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-cyan-600 rounded-[10px] transform skew-x-[-15deg] flex items-center justify-center">
                            <span className="text-white font-black italic transform skew-x-[15deg]">A</span>
                        </div>
                        <span className="font-black text-xl tracking-tighter text-teal-950 uppercase italic">
                            ALTITUDE<span className="text-cyan-500">AR</span>
                        </span>
                    </div>
                </div>
            </header>

            <main className="relative z-10 w-full overflow-hidden">
                {/* 2. BREADCRUMBS & LOGISTICS */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6 pb-2">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="text-[10px] font-black uppercase tracking-widest text-cyan-600 bg-cyan-50 px-4 py-2 inline-flex items-center gap-2 rounded-r-2xl transform skew-x-[-10deg] border-l-4 border-cyan-500">
                            <span className="transform skew-x-[10deg]">DEPORTES INVIERNO / <span className="text-teal-900">{product.title.substring(0, 15)}...</span></span>
                        </div>
                        <div className="inline-flex items-center gap-2 text-[10px] font-bold text-teal-700 uppercase tracking-widest">
                            EQUIPAMIENTO C.O.D (PAGO EN PUERTA)
                        </div>
                    </div>
                </div>

                {/* 3. HERO SECTION (AR HUD) */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 lg:py-16 relative">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
                        <div className="flex flex-col relative z-20 lg:col-span-6">
                            <div className="flex items-center gap-2 mb-6 text-cyan-600 font-mono text-[10px] uppercase font-bold tracking-widest bg-cyan-100/50 w-max px-3 py-1 rounded">
                                [ PROYECCIÓN HUD HOLOGRÁFICA ]
                            </div>
                            
                            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-teal-950 leading-[0.9] mb-6 uppercase italic">
                                {ai?.enhancedTitle || "Gafas AR de Descenso"}
                            </h1>
                            <p className="text-base md:text-lg font-medium text-teal-800/80 mb-10 leading-relaxed max-w-lg">
                                {ai?.enhancedDescription || "Tu velocidad, altitud y mapas de las pistas proyectados directamente en la nieve frente a tus ojos. El cristal HD polarizado incluye un display transparente antiniebla inspirado en los jets de combate."}
                            </p>

                            <div className="bg-white p-8 rounded-[2rem] shadow-[0_20px_50px_rgba(6,182,212,0.1)] border border-cyan-50 relative mt-4">
                                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-[2.2rem] opacity-20 blur-xl pointer-events-none"></div>
                                <div className="flex flex-col sm:flex-row sm:items-end gap-6 mb-8 relative z-10">
                                    <span className="text-5xl font-black text-teal-950 tracking-tighter italic">{fmtPrice(product.price)}</span>
                                    {product.originalPrice && <span className="text-xl font-bold text-cyan-800/50 line-through pb-1">{fmtPrice(product.originalPrice)}</span>}
                                </div>
                                <button onClick={() => document.getElementById('checkout-action')?.scrollIntoView({ behavior: 'smooth' })} className="w-full h-[64px] bg-cyan-500 text-white font-black uppercase tracking-widest text-[13px] hover:bg-teal-950 transition-colors duration-300 flex items-center justify-center rounded-xl shadow-lg transform skew-x-[-5deg]">
                                    <span className="transform skew-x-[5deg]">Equipar Ahora (Pago C.O.D)</span>
                                </button>
                            </div>
                        </div>

                        <div className="relative z-10 lg:col-span-6 flex items-center justify-center p-2 lg:p-8">
                            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="w-full aspect-[4/3] relative bg-white rounded-3xl p-2 shadow-[0_30px_60px_rgba(19,78,74,0.1)] border my-auto overflow-hidden">
                                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1418985991508-e47386d96a71?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center rounded-3xl opacity-20 pointer-events-none filter blur-sm"></div>
                                <div className="w-full h-full relative z-10 rounded-2xl overflow-hidden bg-white/50 backdrop-blur-sm">
                                    <EnhancedProductGallery product={product} accentColor={accentCyan} />
                                </div>
                                
                                {/* Faux HUD Elements overlaid on the image */}
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-cyan-400/50 rounded-full pointer-events-none z-20 flex items-center justify-center">
                                    <div className="w-1 h-1 bg-cyan-400 rounded-full"></div>
                                </div>
                                <div className="absolute bottom-6 left-6 z-20 bg-black/40 backdrop-blur text-cyan-300 font-mono text-xs px-2 py-1 rounded flex flex-col pointer-events-none">
                                    <span className="text-[8px] text-cyan-100">SPEED</span>
                                    <span className="font-bold text-lg">74 KM/H</span>
                                </div>
                                <div className="absolute top-6 right-6 z-20 bg-black/40 backdrop-blur text-cyan-300 font-mono text-xs px-2 py-1 rounded flex flex-col text-right pointer-events-none">
                                    <span className="text-[8px] text-cyan-100">ALTITUDE</span>
                                    <span className="font-bold text-lg">2450M</span>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* 4. TRUST BADGES TECHNICAL */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 pb-16">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            {v: 'Micro-OLED', l: 'Display Transparente'},
                            {v: 'Anti-Vaho', l: 'Doble Capa Térmica'},
                            {v: 'UV400', l: 'Polarizado Nieve Rev.'},
                            {v: 'GPS', l: 'Telemetría Interna'}
                        ].map((b, i) => (
                            <div key={i} className="flex flex-col items-center justify-center p-6 bg-white border border-cyan-100 rounded-[2rem] shadow-sm transform hover:-translate-y-1 transition-transform">
                                <span className="text-teal-950 font-black text-2xl tracking-tighter mb-1 italic">{b.v}</span>
                                <span className="text-[9px] font-bold text-cyan-600 uppercase tracking-widest text-center">{b.l}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 5. EXPERT ACCORDIONS */}
                <div className="max-w-4xl mx-auto px-4 md:px-8 py-20">
                    <div className="mb-12 text-center">
                        <h2 className="text-4xl font-black tracking-tight text-teal-950 uppercase italic">Interfaz en la <span className="text-cyan-500">Nieve.</span></h2>
                    </div>
                    <div className="space-y-4">
                        {[
                            { t: 'Display Flotante No-Intrusivo', a: 'Un prisma integrado refleja un panel Micro-OLED directamente sobre el cristal derecho. Crea la ilusión óptica de una pantalla de 30 pulgadas suspendida a 2 metros de distancia, para no tapar tu línea de visión real durante el descenso.' },
                            { t: 'Navegación Táctica por GPS', a: 'Carga el mapa del resort en tu teléfono antes de salir. Las gafas te mostrarán flechas holográficas indicando los cruces de las pistas rojas y negras, evitando que te pierdas en montañas desconocidas.' },
                            { t: 'Control por Gestos de Guante', a: 'A -10°C no puedes quitarte los guantes para usar pantallas táctiles. Los sensores de proximidad laterales te permiten cambiar de pantalla, aceptar llamadas o cambiar de canción pasando el guante por el aire al costado de tu cabeza.' }
                        ].map((ac, i) => (
                            <div key={i} className="bg-white border border-cyan-100 rounded-2xl overflow-hidden shadow-sm">
                                <button onClick={() => setOpenSpecAcc(openSpecAcc===i?null:i)} className="w-full text-left p-6 md:p-8 flex items-center justify-between text-sm font-black uppercase text-teal-900 transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className="text-cyan-500 bg-cyan-50 font-mono text-xs px-3 py-1 rounded-full">HUD.0{i+1}</div>
                                        <span className="italic">{ac.t}</span>
                                    </div>
                                    <span className="text-cyan-600 font-light text-2xl leading-none">{openSpecAcc===i?'-':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {openSpecAcc === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 md:px-8 pb-8 pl-[6.5rem] text-sm font-medium text-teal-700/80 leading-relaxed">
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
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-teal-950 mb-6 uppercase italic">Dominio <span className="text-cyan-500">Alpino.</span></h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { img: 'https://images.unsplash.com/photo-1551524164-687a55dd1126?q=80&w=1000&auto=format&fit=crop', t: 'Llamadas Integradas', d: 'Micrófono de conducción ósea corta el sonido del viento. Contesta a tu grupo si los pierdes de vista sin frenar.' },
                            { img: 'https://images.unsplash.com/photo-1544256718-3b1eb7d91e60?q=80&w=1000&auto=format&fit=crop', t: 'Lentes Magnéticos', d: 'El cristal tintado se adhiere magnéticamente. Tíralo rápido e instala el cristal transparente para el esquí nocturno o neblina baja.' },
                            { img: 'https://images.unsplash.com/photo-1558222218-b7b54eede3f3?q=80&w=1000&auto=format&fit=crop', t: 'Espuma Triple Capa', d: 'Sellado hermético contra ráfagas de 100km/h con espuma viscoelástica que se amolda perfectamente al contorno de tu nariz y casco.' }
                        ].map((b, i) => (
                            <div key={i} className="bg-white border text-center border-cyan-100 rounded-[2rem] overflow-hidden group shadow-[0_10px_30px_rgba(6,182,212,0.05)] transition-all duration-300 hover:shadow-[0_20px_40px_rgba(6,182,212,0.15)]">
                                <div className="h-56 w-full relative overflow-hidden bg-cyan-900 border-b-4 border-cyan-400">
                                     <img src={b.img} alt={b.t} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 mix-blend-overlay opacity-80" />
                                </div>
                                <div className="p-8">
                                    <h3 className="text-lg font-black text-teal-950 mb-2 uppercase tracking-wide italic">{b.t}</h3>
                                    <p className="text-sm font-medium text-teal-700/80 leading-relaxed text-balance">{b.d}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 11. RISK REVERSAL WARRANTY */}
                <div className="max-w-5xl mx-auto px-4 md:px-8 py-12">
                    <div className="bg-teal-950 p-10 md:p-14 rounded-[3rem] text-white md:flex items-center gap-10 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-full bg-[linear-gradient(90deg,transparent_0%,rgba(6,182,212,0.2)_100%)]"></div>
                        <div className="relative z-10 w-full">
                            <span className="text-cyan-400 font-bold uppercase tracking-widest text-[10px] mb-2 block">PROTOCOLO DE ENCARGO</span>
                            <h3 className="text-3xl font-black tracking-tighter mb-4 uppercase italic">Despliegue Off-Grid.</h3>
                            <p className="font-medium text-cyan-50/80 leading-relaxed text-sm md:text-base">
                                El equipo táctico no se paga por internet. Pides tus gafas HUD abajo y nuestra unidad logística en la ciudad te visitará. Recibes la caja dura sellada, compruebas las micas polarizadas, y le abonas físicamente en Efectivo o App local al mensajero. Control Total desde el pedido hasta la montaña. Cero Riesgo.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 15. CHECKOUT */}
                <div id="checkout-action" className="py-24 md:py-32 bg-white relative border-t border-cyan-100">
                    <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24 items-center">
                        <div className="md:col-span-5 relative text-center md:text-left">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-600 mb-6 bg-cyan-50 px-4 py-2 rounded-full inline-block border border-cyan-200">HOJA DE DESPACHO DIRECTO</span>
                            <h3 className="text-5xl md:text-6xl font-black tracking-tighter mb-6 text-teal-950 uppercase leading-[1] italic">Prepara el <br/><span className="text-cyan-500">Descenso.</span></h3>
                            <p className="text-sm font-medium text-teal-700 mb-10 leading-relaxed">Completa la hoja de ruta. Tu equipo técnico llegará a tu puerta bajo la modalidad Pago Contra Entrega.</p>
                            
                            <div className="text-6xl font-black text-teal-950 tracking-tighter">{fmtPrice(product.price)}</div>
                        </div>
                        
                        <div className="md:col-span-7 w-full border border-cyan-100 bg-white p-8 md:p-12 rounded-[2.5rem] shadow-[0_20px_60px_rgba(19,78,74,0.08)]">
                            <form onSubmit={e=>e.preventDefault()}>
                                <div className="space-y-6">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-bold text-teal-600 uppercase tracking-widest">Esquiador Titular</label>
                                        <input type="text" className="w-full bg-cyan-50 border-none focus:ring-2 focus:ring-cyan-500 text-teal-950 font-bold text-sm px-6 py-4 outline-none transition-all rounded-2xl" placeholder="Nombre Destinatario" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-bold text-teal-600 uppercase tracking-widest">Baliza Celular</label>
                                        <input type="tel" className="w-full bg-cyan-50 border-none focus:ring-2 focus:ring-cyan-500 text-teal-950 font-bold text-sm px-6 py-4 outline-none transition-all rounded-2xl" placeholder="Número Celular" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-bold text-teal-600 uppercase tracking-widest">Refugio / Base (Dirección)</label>
                                        <textarea rows={2} className="w-full bg-cyan-50 border-none focus:ring-2 focus:ring-cyan-500 text-teal-950 font-bold text-sm px-6 py-4 outline-none transition-all resize-none rounded-2xl" placeholder="Calle, ciudad, piso..." />
                                    </div>
                                    <div className="pt-4">
                                        <button className="w-full h-[64px] bg-cyan-500 text-white font-black uppercase tracking-widest text-[13px] hover:bg-teal-950 transition-colors rounded-2xl shadow-lg transform skew-x-[-5deg]">
                                            <span className="transform skew-x-[5deg] inline-block">Procesar Orden (Pago C.O.D)</span>
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

export default PdpSmartSkiGoggles;
