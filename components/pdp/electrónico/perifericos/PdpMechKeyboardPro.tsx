'use client';
import React, { useState } from 'react';
import { StoreData, Product } from '@/lib/types';
import EnhancedProductGallery from '@/components/pdp/EnhancedProductGallery';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { data: StoreData; product: Product; }

const PdpMechKeyboardPro: React.FC<Props> = ({ data, product }) => {
    const [faqOpen, setFaqOpen] = useState<number | null>(null);
    const ai = product.aiContent;
    const fmtPrice = (n: number) => { const s = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); return `Gs. ${s}`; };

    // Estética "Synthwave Tactile": Violetas oscuros, magentas neón, estética tipo "keycap programador 80s"
    const bg = '#0f0a17'; // Deep dark violet
    const textMain = '#c4b5fd'; // Violet 300
    const accent = '#d946ef'; // Fuchsia/Magenta 500

    return (
        <div style={{ background: bg, color: textMain }} className="font-mono antialiased overflow-x-hidden selection:bg-fuchsia-600 selection:text-white">
            
            {/* Vaporwave Night Ambient */}
            <div className="fixed inset-0 pointer-events-none z-0 opacity-40">
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-fuchsia-900/20 to-transparent"></div>
                {/* CSS Grid plane below */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 border-t border-fuchsia-500/20 shadow-[0_-5px_20px_rgba(217,70,239,0.1)]" style={{ background: 'linear-gradient(transparent 19px, rgba(217, 70, 239, 0.1) 20px), linear-gradient(90deg, transparent 19px, rgba(217, 70, 239, 0.1) 20px)', backgroundSize: '40px 40px', transform: 'perspective(500px) rotateX(60deg)', transformOrigin: 'top center' }}></div>
            </div>

            {/* 1. TOP NAV (Switch Header) */}
            <header className="sticky top-0 z-50 bg-[#0f0a17]/90 backdrop-blur-md border-b-4 border-fuchsia-600 shadow-[0_5px_30px_rgba(217,70,239,0.15)]">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="text-xl font-black tracking-widest text-white uppercase flex items-center gap-2">
                        {/* Fake mechanical switch icon */}
                        <div className="w-8 h-8 bg-fuchsia-900/50 border-2 border-fuchsia-500 flex items-center justify-center rounded-sm">
                            <div className="w-4 h-4 bg-fuchsia-600 shadow-inner rounded-[1px]"></div>
                        </div>
                        MECH<span className="text-fuchsia-500 font-normal">BOARD</span>
                    </div>
                    <div className="text-[10px] font-bold text-[#0f0a17] bg-fuchsia-500 px-3 py-1 uppercase tracking-widest border-2 border-fuchsia-400">
                        Ctrl+Shift+Buy
                    </div>
                </div>
            </header>

            <main className="relative z-10 w-full overflow-hidden">
                {/* 2. BREADCRUMBS & LOGISTICS */}
                <div className="max-w-7xl mx-auto px-6 pt-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-violet-400 bg-[#161122] px-4 py-2 border border-violet-900/50">
                            Workspace {'>'} Entrada Tactil {'>'} <span className="text-fuchsia-400">Custom Aluminio CNC</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-fuchsia-400 font-bold">
                            <span className="w-2 h-2 rounded-full bg-fuchsia-500 animate-[ping_1.5s_ease-in-out_infinite]"></span>
                            Logística C.O.D. Offline
                        </div>
                    </div>
                </div>

                {/* 3. HERO (KEYCAP HEAVEN) */}
                <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-center lg:text-left">
                        <div className="relative z-20 order-2 lg:order-1">
                            <div className="inline-block text-fuchsia-500 font-black text-sm mb-6 tracking-widest uppercase border border-fuchsia-500/30 px-3 py-1 bg-fuchsia-500/10 backdrop-blur-sm">
                                [ HOT-SWAPPABLE PCB ]
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter leading-none drop-shadow-[0_0_25px_rgba(217,70,239,0.4)]">
                                {ai?.enhancedTitle || product.title}
                            </h1>
                            <p className="text-lg text-violet-300 mb-10 leading-relaxed mx-auto lg:mx-0 max-w-lg font-bold">
                                {ai?.enhancedDescription || product.description || 'Escribir código, novelas o jugar de madrugada nunca volverá a ser un castigo para tus dejos. Interruptores mecánicos lubricados de fábrica bajo un bloque metálico implacable.'}
                            </p>
                            
                            <div className="bg-[#161122] border-2 border-fuchsia-900/50 p-8 shadow-[10px_10px_0_rgba(217,70,239,0.2)] focus-within:translate-x-1 focus-within:translate-y-1 focus-within:shadow-none transition-all">
                                <div className="text-[10px] text-fuchsia-400 uppercase tracking-widest font-black mb-3">Tasa de Adquisición &gt;&gt;</div>
                                <div className="flex items-end justify-center lg:justify-start gap-4 mb-8">
                                    <span className="text-4xl text-white font-black tracking-tight">{fmtPrice(product.price)}</span>
                                    {product.originalPrice && <span className="text-sm text-violet-600 line-through pb-1 font-bold">{fmtPrice(product.originalPrice)}</span>}
                                </div>
                                <button onClick={() => document.getElementById('checkout-keyboard')?.scrollIntoView({ behavior: 'smooth' })} className="w-full bg-fuchsia-600 hover:bg-fuchsia-500 text-white rounded-none py-4 font-black uppercase tracking-widest text-xs transition-colors border-2 border-fuchsia-400 shadow-[inset_0_2px_0_rgba(255,255,255,0.4)]">
                                    Ejecutar Orden de Chofer
                                </button>
                                <div className="text-[10px] text-fuchsia-300 uppercase tracking-widest mt-4 font-bold opacity-80">
                                    // Abonelo en puerta física
                                </div>
                            </div>
                        </div>

                        <div className="w-full relative flex items-center justify-center p-6 order-1 lg:order-2">
                            {/* Keycap mounting frame illusion */}
                            <div className="absolute inset-0 bg-[#25173d] border-4 border-[#322055] rounded-xl transform rotate-3 shadow-[0_20px_60px_rgba(107,33,168,0.5)] z-0"></div>
                            <div className="absolute inset-0 bg-[#2d1b4e] border-4 border-[#3d276b] rounded-xl transform -rotate-1 z-0 opacity-50"></div>
                            <div className="relative z-10 w-full p-4 bg-[#1b1029] rounded-lg">
                                <EnhancedProductGallery product={product} accentColor={accent} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. TRUST BADGES TECHNICAL (System Diagnostic) */}
                <div className="border-y-2 border-fuchsia-900/40 bg-[#0f0a17]">
                    <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {v: 'Gasket Mount', l: 'Absorción Acústica'},
                            {v: 'PBT Double', l: 'Teclas Imborrables'},
                            {v: 'Mac / Win', l: 'Layout Híbrido'},
                            {v: 'QMK / VIA', l: '100% Programable'}
                        ].map((b, i) => (
                            <div key={i} className="flex flex-col items-center bg-[#191128] p-4 border border-violet-900/30 text-center">
                                <span className="text-2xl font-black text-white mb-2">{b.v}</span>
                                <span className="text-[10px] text-fuchsia-500 uppercase tracking-widest font-black">{b.l}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 5. EXPERT ACCORDIONS (The Build) */}
                <div className="max-w-4xl mx-auto px-6 py-32">
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="text-3xl font-black text-fuchsia-500">{'<'}</div>
                        <h2 className="text-3xl font-black text-white uppercase tracking-tight">Anatomía Custom</h2>
                        <div className="text-3xl font-black text-fuchsia-500">{'>'}</div>
                    </div>
                    <p className="text-center text-violet-400 font-bold text-sm mb-16 uppercase tracking-widest">Lo que la oficina aburrida teme.</p>
                    
                    <div className="space-y-4">
                        {[
                            { t: 'Montura de Junta (Gasket Mount) Cero Ruido Rígido', a: 'La placa interna donde se asientan las teclas no atornilla directamente al chasis duro. En su lugar, flota encajada entre espumas Poron de alta densidad. El resultado visual y táctil es una amortiguación celestial en cada teclazo, eliminando por completo los "clacs" plásticos huecos.' },
                            { t: 'Interruptores Pre-Lubricados Profesionalmente', a: 'No hay ruidos de muelles metálicos oxidados aquí. Cada interruptor interno (switch) fue extraído, abierto y recubierto con lubricante Krytox en su vástago. Tus manos sentirán que aprietan teclas de teflón untado en mantequilla.' },
                            { t: 'Personalización Absoluta Vía Software de Código Abierto', a: 'No uses programas pesados (Bloatware) que gastan recursos. Mapea macros complejos en el firmware directo usando QMK / VIA desde el navegador de tu computadora. Configuras, guardas y lo conectas en otra PC; mantendrá la memoria.' }
                        ].map((ac, i) => (
                            <div key={i} className="bg-[#191128] border-2 border-[#2b1744] hover:border-fuchsia-500 transition-colors">
                                <button className="w-full px-8 py-6 flex justify-between items-center text-left" onClick={() => setFaqOpen(faqOpen===i?null:i)}>
                                    <span className="text-white font-bold uppercase tracking-widest text-sm">{ac.t}</span>
                                    <span className="text-fuchsia-500 font-bold font-mono text-xl">{faqOpen===i?'_':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {faqOpen === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-8 pb-8 text-violet-300 font-mono text-sm leading-relaxed border-t border-[#2b1744] pt-6">
                                            {ac.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 6. ENDLESS MARQUEE (Neon Syntax) */}
                <div className="w-[100vw] overflow-hidden py-4 bg-fuchsia-600 text-white border-y-4 border-fuchsia-900 flex transform relative left-[50%] -translate-x-[50%]">
                    <div className="flex whitespace-nowrap font-black text-2xl uppercase tracking-[0.2em]">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="flex items-center gap-12 px-8">
                                <span>THOCK MASTERCLASS</span>
                                <span className="opacity-50">||</span>
                                <span>ZERO FLEX METAL BASE</span>
                                <span className="opacity-50">||</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 7. WHY TO USE / BENEFITS */}
                <div className="max-w-7xl mx-auto px-6 py-32 border-b border-fuchsia-900/30">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="order-2 lg:order-1 relative">
                            {/* Exploded View Concept Box */}
                            <div className="bg-[#1a1129] border border-violet-900/50 p-10 flex flex-col items-center justify-center relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 font-black text-fuchsia-500/20 text-6xl">DIY</div>
                                <div className="w-full space-y-2 mb-8 relative z-10">
                                    <div className="h-6 border-b-2 border-fuchsia-500/50 text-center text-[10px] text-fuchsia-400 uppercase tracking-widest font-bold pb-1 translate-y-[-10px]">Keycaps PBT</div>
                                    <div className="h-6 border-b-2 border-fuchsia-500/40 text-center text-[10px] text-fuchsia-400 uppercase tracking-widest font-bold pb-1 translate-y-0">Switches Mecánicos</div>
                                    <div className="h-6 border-b-2 border-fuchsia-500/30 text-center text-[10px] text-fuchsia-400 uppercase tracking-widest font-bold pb-1 translate-y-[10px]">Placa Duraluminio</div>
                                    <div className="h-6 border-b-2 border-fuchsia-500/20 text-center text-[10px] text-fuchsia-400 uppercase tracking-widest font-bold pb-1 translate-y-[20px]">PCB 5-pines</div>
                                    <div className="h-6 border-b-2 border-fuchsia-500/10 text-center text-[10px] text-fuchsia-400 uppercase tracking-widest font-bold pb-1 translate-y-[30px]">Espuma Silenciadora</div>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2">
                            <h2 className="text-4xl lg:text-5xl font-black text-white uppercase tracking-tighter leading-tight mb-8">El tacto es el <br/><span className="text-fuchsia-500">nuevo lujo.</span></h2>
                            <p className="text-violet-300 font-bold text-base leading-relaxed mb-10">Dejaste atrás el teclado de membrana chiclet de tu laptop genérica. Tus herramientas de trabajo dictan la calidad de tu producción. El sonido "Thock" grave y profundo de cada pulsación se convertirá en ASMR mientras vacías tu bandeja de mails o picas código Python.</p>
                            
                            <ul className="space-y-6">
                                {[
                                    { t: 'Hot-Swap Rápido', d: 'Incluye extractor metálico. Si amas teclas ligeras para jugar, o duras pesadas para redactar novelas, quitas los chips individuales y los cambias sin soldador.' },
                                    { t: 'Batería Ultra Masiva WiFi', d: 'Pesa 2 Kilos porque su interior esconde una celda de 4000mAh. Úsalo vía Bluetooth o Dongle USB inalámbrico de 2.4ghz en 3 equipos a la vez durante todo un mes.' }
                                ].map((b, i) => (
                                    <li key={i} className="flex gap-4">
                                        <div className="w-8 h-8 rounded-sm bg-fuchsia-600 text-white font-black flex items-center justify-center shrink-0">v{i+1}</div>
                                        <div>
                                            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-1">{b.t}</h4>
                                            <p className="text-violet-400 font-medium text-xs leading-relaxed">{b.d}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* 10. COMPARISON TABLE */}
                <div className="max-w-4xl mx-auto px-6 py-24">
                    <div className="border-2 border-fuchsia-900/50 bg-[#161122]">
                        <div className="grid grid-cols-3 bg-[#0f0a17] text-[10px] uppercase font-black text-fuchsia-500 tracking-[0.2em] border-b-2 border-fuchsia-900/50">
                            <div className="p-6 text-center lg:text-left">Dato RAW</div>
                            <div className="p-6 text-white border-x-2 border-fuchsia-900/50 text-center bg-fuchsia-900/20">Custom Board Élite</div>
                            <div className="p-6 text-center text-violet-700">Comunes de Membrana</div>
                        </div>
                        {[
                            { k: 'Material Externo', u: 'Aluminio Fresado (Teclas PBT gruesas)', t: 'Plástico ABS que se vuelve brillante/grasoso' },
                            { k: 'Actuación (Golpe)', u: 'Contacto de Oro lineal o táctil (Eliges tú)', t: 'Domo de goma blando (Cansancio de dedos)' },
                            { k: 'Garantía del Trato', u: 'Flete físico. Pago contra recepción (C.O.D.)', t: 'Depósito a tienda aleatoria sin protección' }
                        ].map((r, i) => (
                            <div key={i} className="grid grid-cols-3 border-t border-[#2b1744] font-medium text-xs bg-[#191128] hover:bg-[#201533] transition-colors">
                                <div className="p-6 text-violet-400">{r.k}</div>
                                <div className="p-6 text-fuchsia-100 font-bold bg-fuchsia-900/10 border-x-2 border-[#2b1744] text-center">{r.u}</div>
                                <div className="p-6 text-violet-600 text-center line-through">{r.t}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 11. RISK REVERSAL WARRANTY */}
                <div className="py-24 bg-[#0f0a17] border-y-4 border-fuchsia-600 text-center px-6">
                    <div className="max-w-3xl mx-auto">
                        <div className="inline-block p-4 border-4 border-fuchsia-500 rotate-45 mb-8 bg-[#1a1129]">
                            <svg className="w-8 h-8 text-fuchsia-500 -rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                        </div>
                        <h3 className="text-3xl text-white font-black uppercase tracking-tighter mb-6">Cortafuegos Logístico C.O.D.</h3>
                        <p className="text-violet-300 font-bold leading-relaxed max-w-2xl mx-auto text-sm">
                            El equipamiento para setups que cruzan las 7 cifras en internet es un nido de fraudes virtuales. Anulamos el riesgo con un cortafuegos físico: solicitas hoy, nuestro sistema despacha vía un operador humano oficial a tus aposentos o estudio urbano. Abres su caja acrílica, constatas la ingeniería y ahí, sin intermediarios nublados, aportas tu pago cara a cara en papel o QR en directo.
                        </p>
                    </div>
                </div>

                {/* 13. FAQ */}
                <div className="max-w-3xl mx-auto px-6 py-24">
                    <h2 className="text-2xl text-white font-black uppercase tracking-widest italic mb-12 text-center text-fuchsia-400">Terminal de Consultas //</h2>
                    <div className="space-y-4">
                        {[
                            {q: '¿Qué sonido hace? ¿Es ruidoso como para molestar en la oficina?', a: 'Depende de ti. Ofrecemos las versiones Táctiles/Lineales "Silenciosas" (Bobagum o similares pre-lubricados) que suenan como golpear arena fina, ideales si hay gente durmiendo. NO usamos los infames blue-switches clicky molestos a menos que lo pidas.'},
                            {q: '¿Incluye la letra "Ñ" nativamente o es Layout USA?', a: 'Lo adaptamos de fábrica. El lenguaje físico es ISO-Latam, el de la tecla enter gorda entera, con la tecla "Ñ" en PBT inyectado. La disposición pura que usamos de toda la vida.'},
                            {q: '¿Cuál es la demora si aprieto en el botón de solicitar pago al recibir?', a: 'La latencia de nuestra flota se enruta habitualmente en 24hs si tu área reside en ciudad principal o alrededores inmediatos. Reservaste, apartamos del servidor y zarpó. Simple.'}
                        ].map((f, i) => (
                            <div key={i} className="bg-[#100b1a] border-2 border-violet-900/40">
                                <button onClick={() => setFaqOpen(faqOpen===i?null:i)} className="w-full p-6 text-left flex justify-between items-center text-white font-bold text-xs uppercase tracking-widest hover:text-fuchsia-400 transition-colors">
                                    {f.q}
                                    <span className="text-fuchsia-500 font-black text-xl">{faqOpen===i?'−':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {faqOpen === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 pb-6 text-violet-400 font-bold text-sm leading-relaxed border-t-2 border-violet-900/40 pt-4">
                                            {f.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 14. EXPANDED REVIEWS */}
                <div className="py-24 bg-[#161122] border-t-2 border-fuchsia-900/40">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center font-black uppercase text-[10px] text-fuchsia-500 tracking-widest mb-10">Output / Reseñas Verificadas</div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { r: "Tipear en esto es pura droga tecnológica. El sonido grave que tira mi barra espaciadora amortiguada hizo que regalara mis otros 4 teclados. El delivery C.O.D un lujo de tranquilidad.", n: "Martín P.", t: "Software Developer" },
                                { r: "Tremendo bloque de metal. Pesadísimo en el buen sentido, no se mueve de la mesa cuando juego duro. Lo probé, le pasé el efectivo al cadete y fue. Re seguro el método de compra.", n: "Gonzalo V.", t: "Competitivo eSport" },
                                { r: "Mejor inversión para teletrabajar. Los dedos no te duelen porque las teclas caen suavemente antes de impactar abajo de todo. La iluminación violeta synthwave es hermosa en la noche.", n: "Lucía D.", t: "Escritora Fantasía" }
                            ].map((rev, i) => (
                                <div key={i} className="p-8 bg-[#0f0a17] border border-violet-900/50 shadow-[5px_5px_0_rgba(217,70,239,0.15)] relative">
                                    <div className="text-fuchsia-500 font-black text-2xl absolute top-4 left-4 opacity-50">&gt;</div>
                                    <p className="text-violet-300 font-bold text-sm mb-6 leading-relaxed relative z-10 pt-4">"{rev.r}"</p>
                                    <div className="border-t border-violet-900/50 pt-4">
                                        <div className="text-white font-black text-[10px] uppercase tracking-widest">{rev.n}</div>
                                        <div className="text-fuchsia-600 uppercase text-[9px] font-black mt-1 tracking-widest">{rev.t}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 15. CHECKOUT (Terminal Form) */}
                <div id="checkout-keyboard" className="py-32 relative bg-[#0f0a17] border-t-4 border-fuchsia-600">
                    <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
                        <div className="lg:col-span-6 order-2 lg:order-1 border-2 border-fuchsia-500 p-2 bg-[#1a1129] relative shadow-[0_0_50px_rgba(217,70,239,0.1)]">
                            {/* Window UI frame */}
                            <div className="flex bg-[#0f0a17] border-b-2 border-fuchsia-500 p-2 mb-2">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                </div>
                                <div className="mx-auto text-[10px] text-fuchsia-500 uppercase tracking-widest font-black flex-1 text-center">Form.exe</div>
                            </div>
                            
                            <div className="p-4 lg:p-8">
                                <p className="text-violet-400 text-xs font-black mb-8">// Ingresar credenciales para bloque de reserva PAGO(C.O.D)</p>
                                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                                    <div>
                                        <label className="text-[10px] text-fuchsia-400 uppercase font-black tracking-widest mb-1 block">root@Nombre_Cliente:~#</label>
                                        <input type="text" className="w-full bg-[#0f0a17] border border-violet-900/50 text-white font-bold text-sm p-4 focus:border-fuchsia-500 outline-none transition-colors" placeholder="_" />
                                    </div>
                                    <div>
                                        <label className="text-[10px] text-fuchsia-400 uppercase font-black tracking-widest mb-1 block">root@Canal_WhatsApp:~#</label>
                                        <input type="tel" className="w-full bg-[#0f0a17] border border-violet-900/50 text-white font-bold text-sm p-4 focus:border-fuchsia-500 outline-none transition-colors" placeholder="_" />
                                    </div>
                                    <div>
                                        <label className="text-[10px] text-fuchsia-400 uppercase font-black tracking-widest mb-1 block">root@Ubicacion_Geografica:~#</label>
                                        <textarea rows={2} className="w-full bg-[#0f0a17] border border-violet-900/50 text-white font-bold text-sm p-4 focus:border-fuchsia-500 outline-none transition-colors resize-none" placeholder="_"></textarea>
                                    </div>
                                    <div className="pt-2">
                                        <button className="w-full bg-fuchsia-600 hover:bg-fuchsia-500 text-white py-5 font-black uppercase tracking-widest text-sm transition-colors border-2 border-fuchsia-400 shadow-[inset_0_2px_0_rgba(255,255,255,0.3)]">
                                            [ COMPILAR PEDIDO SEGURO ]
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        
                        <div className="lg:col-span-6 order-1 lg:order-2">
                            <h2 className="text-4xl lg:text-5xl font-black text-white uppercase tracking-tighter leading-none mb-6">Abandona la <br/><span className="text-fuchsia-500">Mediocridad de Serie.</span></h2>
                            <p className="text-violet-300 font-bold text-lg mb-10 leading-relaxed max-w-sm">Dignifica el escritorio en donde inviertes más de 8 horas diarias de tu vida adulta. Exige que el mensajero aborde tu periferia y págalo al toque sólo cuando lo palpes.</p>
                            
                            <div className="text-5xl font-black text-white py-2 tracking-tighter">{fmtPrice(product.price)}</div>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
};

export default PdpMechKeyboardPro;
