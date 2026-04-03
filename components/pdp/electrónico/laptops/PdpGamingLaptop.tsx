'use client';
import React, { useState } from 'react';
import { StoreData, Product } from '@/lib/types';
import EnhancedProductGallery from '@/components/pdp/EnhancedProductGallery';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { data: StoreData; product: Product; }

const PdpGamingLaptop: React.FC<Props> = ({ data, product }) => {
    const [faqOpen, setFaqOpen] = useState<number | null>(null);
    const ai = product.aiContent;
    const fmtPrice = (n: number) => { const s = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); return `Gs. ${s}`; };

    // Estética "Industrial Matrix": Graphite metal, Lime Green details, Monospace technical vibes
    const bg = '#0d0d0d'; // Graphite dark
    const textMain = '#a3a3a3'; // Neutral 400
    const accent = '#84cc16'; // Lime 500
    const accentBg = '#1a2e05'; // Dark Lime bg

    return (
        <div style={{ background: bg, color: textMain }} className="font-mono antialiased overflow-x-hidden selection:bg-lime-500 selection:text-black">
            
            {/* PCB / Circuit Ambient Background */}
            <div className="fixed inset-0 pointer-events-none z-0 opacity-10">
                <div className="absolute top-0 right-0 w-full h-[500px] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-lime-800/40 via-transparent to-transparent"></div>
                <svg className="absolute w-full h-full opacity-20" width="100%" height="100%">
                    <pattern id="pcb" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                        <circle cx="20" cy="20" r="1.5" fill="#84cc16" />
                        <path d="M 20 20 L 40 40 M 20 20 L 0 0" stroke="#84cc16" strokeWidth="0.5" fill="none" />
                    </pattern>
                    <rect x="0" y="0" width="100%" height="100%" fill="url(#pcb)" />
                </svg>
            </div>

            {/* 1. TOP NAV (Technical BIOS Header) */}
            <header className="sticky top-0 z-50 bg-[#0d0d0d]/80 backdrop-blur-md border-b-2 border-lime-500/20">
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="text-white font-bold tracking-widest uppercase flex items-center gap-3">
                        <div className="w-2 h-6 bg-lime-500 animate-pulse"></div>
                        CORE<span className="text-lime-500 font-light">SYSTEMS</span>
                    </div>
                    <div className="text-xs text-lime-500/60 hidden sm:block">
                        STATUS: ONLINE / THERMALS: OPTIMAL
                    </div>
                </div>
            </header>

            <main className="relative z-10 w-full overflow-hidden">
                {/* 2. BREADCRUMBS & LOGISTICS */}
                <div className="max-w-7xl mx-auto px-4 pt-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between border border-white/5 bg-white/5 p-3">
                        <div className="text-[10px] uppercase tracking-widest text-neutral-400">
                            ~/HARDWARE/PORTABLES/<span className="text-lime-400 font-bold">TERMINAL-PRO</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2 md:mt-0">
                            <span className="w-2 h-2 rounded-full bg-lime-500"></span>
                            <span className="text-[10px] uppercase text-lime-500 font-bold tracking-widest">LOGÍSTICA C.O.D. ACTIVA</span>
                        </div>
                    </div>
                </div>

                {/* 3. HERO (CHIPSET VIBE) */}
                <div className="max-w-7xl mx-auto px-4 py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#111] border border-white/5 p-6 md:p-12">
                        <div className="lg:col-span-5 relative z-20">
                            <div className="inline-block border border-lime-500 text-lime-500 px-2 py-1 text-[9px] mb-6 uppercase tracking-widest">
                                GPU DEDICADA / RTX ARCH
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 uppercase tracking-tight leading-none">
                                {ai?.enhancedTitle || product.title}
                            </h1>
                            <p className="text-sm text-neutral-400 mb-10 leading-relaxed">
                                {ai?.enhancedDescription || product.description || 'Renderiza mundos 3D, compila código o despliega framerates bestiales en e-sports. Una bestia termodinámicamente perfecta en un chasis de aluminio pulido.'}
                            </p>
                            
                            <div className="bg-[#0a0a0a] p-6 border-l-4 border-lime-500 shadow-xl">
                                <div className="text-xs text-neutral-500 uppercase tracking-widest mb-2">Precio de Estructura</div>
                                <div className="flex items-end gap-4 mb-6">
                                    <span className="text-3xl font-bold text-white leading-none">{fmtPrice(product.price)}</span>
                                    {product.originalPrice && <span className="text-sm text-neutral-600 line-through pb-1">{fmtPrice(product.originalPrice)}</span>}
                                </div>
                                <button onClick={() => document.getElementById('checkout-terminal')?.scrollIntoView({ behavior: 'smooth' })} className="w-full bg-lime-500 text-black font-bold uppercase tracking-widest py-4 text-xs hover:bg-lime-400 transition-colors flex justify-center items-center gap-2">
                                    <span>[ INICIE BOOT SEQUENCE ]</span>
                                </button>
                                <div className="text-[9px] text-center text-lime-500/70 uppercase pt-4 tracking-widest">
                                    Pague en Efectivo al Transportista
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-7 w-full relative flex items-center justify-center">
                            {/* Technical overlay grid */}
                            <div className="absolute inset-0 border border-lime-500/10 pointer-events-none z-10">
                                <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-lime-500/50"></div>
                                <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-lime-500/50"></div>
                            </div>
                            <div className="relative z-0 w-full p-8">
                                <EnhancedProductGallery product={product} accentColor={accent} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. TRUST BADGES TECHNICAL (System Specs) */}
                <div className="border-b border-white/5 bg-[#0a0a0a]">
                    <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
                        {[
                            {v: '16 NÚCLEOS', l: 'CPU Desbloqueado'},
                            {v: '140W TGP', l: 'Potencia Gráfica'},
                            {v: '240Hz', l: 'Panel IPS Calibrado'},
                            {v: 'Liquid Metal', l: 'Refrigeración Extrema'}
                        ].map((b, i) => (
                            <div key={i} className="text-center p-8">
                                <div className="text-white font-bold text-xl mb-2">{b.v}</div>
                                <div className="text-[10px] text-lime-500 uppercase tracking-widest">{b.l}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 5. EXPERT ACCORDIONS (System Logs) */}
                <div className="max-w-5xl mx-auto px-4 py-24">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="text-lime-500 font-bold text-2xl">{'//'}</div>
                        <h2 className="text-2xl text-white font-bold tracking-widest uppercase">Arquitectura Interna</h2>
                    </div>
                    
                    <div className="border border-white/10 bg-[#0d0d0d]">
                        {[
                            { t: 'Termodinámica Phase-Change', a: 'En lugar de pasta térmica genérica, inyectamos metal líquido sobre el dado de la CPU. Reduce espectacularmente las temperaturas (-15°C) evitando el estrangulamiento térmico (Thermal Throttling) durante renders largos.' },
                            { t: 'Multiplexor Gráfico (MUX Switch)', a: 'El hardware dirige directamente la señal de la Tarjeta Gráfica externa (dGPU) a la pantalla, puenteando la gráfica integrada. Resultados: 20% más frames por segundo en entornos competitivos.' },
                            { t: 'Chasis de Aluminio Aeroespacial', a: 'A prueba de flexión. El marco completo fue maquinado mediante CNC a partir de un bloque sólido de aluminio, garantizando durabilidad extrema al transportarlo en mochilas sin crujidos.' }
                        ].map((ac, i) => (
                            <div key={i} className="border-b border-white/10 last:border-0 hover:bg-[#111] transition-colors">
                                <button className="w-full p-6 lg:p-8 flex items-start gap-6 text-left" onClick={() => setFaqOpen(faqOpen===i?null:i)}>
                                    <span className="text-lime-500 font-bold">[{i+1}]</span>
                                    <span className="text-white font-bold uppercase tracking-wide flex-1">{ac.t}</span>
                                    <span className="text-neutral-500">{faqOpen===i?'[-]':'[+]'}</span>
                                </button>
                                <AnimatePresence>
                                    {faqOpen === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 lg:px-8 pb-8 pl-[4.5rem] text-sm text-neutral-400 font-sans leading-relaxed">
                                            {ac.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 6. ENDLESS MARQUEE (Code crawl) */}
                <div className="w-[100vw] overflow-hidden py-4 bg-lime-500 border-y border-lime-600 relative left-[50%] -translate-x-[50%] flex transform">
                    <div className="flex whitespace-nowrap font-bold text-black uppercase tracking-widest text-sm">
                        {[...Array(10)].map((_, i) => (
                            <div key={i} className="flex items-center gap-6 px-4">
                                <span>NO BOTTLENECKS // ZERO THROTTLING // PURE FPS //</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 7. WHY TO USE / BENEFITS (Dashboard) */}
                <div className="max-w-7xl mx-auto px-4 py-32 border-b border-white/5">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1 border border-white/10 p-2 bg-[#0a0a0a]">
                            <div className="relative aspect-video flex items-center justify-center p-8 overflow-hidden bg-[#111]">
                                {/* Fake UI Dashboard */}
                                <div className="absolute inset-4 border border-lime-500/20 flex flex-col justify-between p-4">
                                    <div className="flex justify-between items-center text-xs text-lime-500">
                                        <span>CPU USE: 12%</span>
                                        <span>GPU USE: 98%</span>
                                    </div>
                                    <div className="flex items-end justify-center h-full gap-2 pb-8">
                                        {[...Array(20)].map((_,i) => <div key={i} className="w-2 bg-lime-500" style={{height: `${Math.max(20, Math.random()*100)}%`}}></div>)}
                                    </div>
                                    <div className="text-center text-[10px] text-neutral-500">DASHBOARD DE RENDIMIENTO ESTABLE</div>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2">
                            <h2 className="text-3xl lg:text-4xl font-bold text-white uppercase tracking-tight mb-6">Velocidad como <br/><span className="text-lime-500">Arma Táctica.</span></h2>
                            <p className="text-neutral-400 font-sans leading-relaxed mb-8">Diseñada por obsesivos del hardware para el 1% de los usuarios que no pueden tolerar tiempos de carga. Exporta video 4K en minutos, compila miles de líneas de código al instante o juega los títulos AAA en Ultra sin despeinarse.</p>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    { t: 'Ventiladores Jet-Blade', d: 'Aspas de polímero de cristal líquido que empujan un 30% más de aire con menos ruido.' },
                                    { t: 'Teclado Mecánico', d: 'Switches independientes per-key con recorrido de 1.8mm para respuesta instantánea.' },
                                    { t: 'Batería 99Wh', d: 'El límite legal máximo para poder llevarla en la cabina de un avión (Flight-Safe).' },
                                    { t: 'Expansión Dual NVMe', d: 'Múltiples puertos M.2 PCIe Gen 4 para que almacenes terabytes sin lentitud.' }
                                ].map((b, i) => (
                                    <div key={i} className="border border-white/5 bg-white/5 p-4 hover:border-lime-500/30 transition-colors">
                                        <h4 className="text-white font-bold text-xs uppercase mb-2">_{b.t}</h4>
                                        <p className="text-neutral-500 font-sans text-xs">{b.d}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 8. HOW TO USE / SET UP AESTHETIC */}
                <div className="py-24 bg-[#0a0a0a]">
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-2xl text-white font-bold uppercase tracking-widest">Ejecución Inicial</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                            {/* Connecting line */}
                            <div className="hidden md:block absolute top-[40px] left-[10%] right-[10%] h-[1px] bg-lime-500/20"></div>
                            
                            {[
                                { s: 'Unboxing Estéril', d: 'Retira la máquina de su escudo protector de espuma de alta densidad. Totalmente pre-ensamblada.' },
                                { s: 'Conexión Energética', d: 'Enchufa la fuente de poder de 330W. La barra de estado frontal cambiará a color lima.' },
                                { s: 'Arranque del SO', d: 'El sistema operativo arranca desde el SSD NVMe en 4 segundos. Estás online.' }
                            ].map((s, i) => (
                                <div key={i} className="text-center relative z-10">
                                    <div className="w-20 h-20 mx-auto bg-[#0d0d0d] border border-lime-500 rounded-full flex items-center justify-center text-lime-500 text-2xl font-bold mb-6">
                                        0{i+1}
                                    </div>
                                    <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-3">{s.s}</h4>
                                    <p className="text-neutral-500 font-sans text-sm">{s.d}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 10. COMPARISON TABLE */}
                <div className="max-w-4xl mx-auto px-4 py-32">
                    <div className="border border-white/10">
                        <div className="grid grid-cols-3 bg-[#111] text-[10px] uppercase tracking-widest font-bold text-lime-500 border-b border-white/10">
                            <div className="p-6">Especificación</div>
                            <div className="p-6 text-white text-center border-x border-white/10 bg-white/5">Nuestra Workstation</div>
                            <div className="p-6 text-center text-neutral-600">Ultrabook Básica</div>
                        </div>
                        {[
                            { k: 'Refrigeración', u: 'Doble turbina + Cámara Vapor', t: 'Un solo ventilador' },
                            { k: 'Tarjeta Gráfica', u: 'Dedicada (Chip Gigante)', t: 'Integrada (Sin potencia 3D)' },
                            { k: 'Tasa de Refresco Pantalla', u: '240 Fotogramas / Seg', t: '60 Fotogramas / Seg' },
                            { k: 'Construcción', u: 'Aleación aluminio/magnesio', t: 'Plástico ABS endeble' }
                        ].map((r, i) => (
                            <div key={i} className="grid grid-cols-3 border-t border-white/5 font-sans text-xs">
                                <div className="p-6 text-neutral-400 font-medium">{r.k}</div>
                                <div className="p-6 text-lime-400 font-bold text-center border-x border-white/10 bg-white/5">{r.u}</div>
                                <div className="p-6 text-neutral-600 text-center line-through">{r.t}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 11. RISK REVERSAL WARRANTY (Hardware COD) */}
                <div className="border border-lime-500/20 m-4 md:mx-auto md:max-w-5xl bg-lime-900/10 p-8 md:p-12 mb-24 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-lime-500/20"><path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"/></svg>
                    </div>
                    <div className="relative z-10">
                        <h3 className="text-xl text-white font-bold uppercase tracking-widest mb-4">Firewall Financiero.</h3>
                        <p className="text-neutral-400 font-sans leading-relaxed text-sm max-w-2xl">
                            Entendemos. Comprar una computadora poderosa por internet requiere fe en el vendedor. Nosotros anulamos tu riesgo. Envío de la unidad con chofer a tu ubicación, abres tu caja, pasas tus manos por el aluminio del chasis, verificas sellos de garantía y, SÓLO a partir de allí, le pagas a nuestro equipo táctico en sitio (Efectivo/Transferencia).
                        </p>
                    </div>
                </div>

                {/* 12. BRAND ETHOS */}
                <div className="py-16 text-center px-4 border-t border-white/5">
                    <h3 className="text-2xl text-lime-500 font-bold uppercase tracking-[0.2em] mb-4">Hardware sin compromisos.</h3>
                    <p className="text-neutral-500 text-sm max-w-lg mx-auto font-sans">Nuestra misión es poner supercomputadoras portátiles en las manos de creativos y gamers que se niegan a esperar barras de carga.</p>
                </div>

                {/* 13. FAQ */}
                <div className="max-w-4xl mx-auto px-4 py-24 border-t border-white/5">
                    <h2 className="text-xl text-white font-bold mb-10 border-l-4 border-lime-500 pl-4 uppercase tracking-widest">Base de Conocimiento</h2>
                    <div className="space-y-2">
                        {[
                            {q: '¿Puede correr juegos competitivos exigentes?', a: 'Por supuesto. Al contar con un chip dedicado y un MUX Switch, puede alcanzar los 240 fotogramas por segundo en juegos competitivos 5v5 estándar.'},
                            {q: '¿De cuánto es el nivel de ruido de los ventiladores?', a: 'En uso de ofimática (web, excel) el equipo es 100% silencioso (0dB). Cuando compilas video o juegas, las turbinas alcanzan 48dB para disipar el inmenso calor.'},
                            {q: '¿Cómo coordino el pago contra entrega?', a: 'Muy simple. Completas tus datos abajo, no pagas NADA aquí. Un experto de logística te chatea, concuerda tu horario y llevamos tu laptop a tu mesa.'}
                        ].map((f, i) => (
                            <div key={i} className="bg-[#111] border border-white/5">
                                <button onClick={() => setFaqOpen(faqOpen===i?null:i)} className="w-full p-6 text-left flex justify-between items-center text-white font-bold text-xs uppercase tracking-widest hover:bg-white/5 transition-colors">
                                    {f.q}
                                    <span className="text-lime-500 font-normal">{faqOpen===i?'CLOSE':'OPEN'}</span>
                                </button>
                                <AnimatePresence>
                                    {faqOpen === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 pb-6 text-neutral-400 font-sans text-sm leading-relaxed border-t border-white/5 pt-4">
                                            {f.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 14. EXPANDED REVIEWS (Terminal Output Logs) */}
                <div className="py-24 bg-[#0a0a0a] border-t border-white/5">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="text-center mb-16">
                            <span className="text-xs uppercase tracking-widest text-lime-500 font-bold block mb-2">{'>'} CONSOLA DE USUARIOS</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { r: "Renderizo arquitectura 3D e importaba horas. Con esta bestia bajé mis renders a 12 minutos. Compré 100% por C.O.D, pago seguro.", n: "Felipe T.", t: "Arquitecto Senior" },
                                { r: "La fluidez de la pantalla de 240Hz arruinó los demás monitores para mí. Excelente refrigeración, nunca quema las manos.", n: "Sofía E.", t: "Gamer Profesional" },
                                { r: "Caja blindada genial. Vinieron a mi oficina comercial, verifiqué que la Mac estaba intacta y transferí in situ. Total tranquilidad.", n: "Arturo L.", t: "Ingeniero Dev" }
                            ].map((rev, i) => (
                                <div key={i} className="p-8 bg-[#0d0d0d] border-l-2 border-lime-500 hover:bg-[#111] transition-colors relative group">
                                    <div className="text-[10px] text-neutral-600 mb-6 font-mono">LOG_ENTRY_0{i+1}:</div>
                                    <p className="text-neutral-300 text-xs leading-relaxed mb-6">"{rev.r}"</p>
                                    <div className="flex justify-between items-end border-t border-white/5 pt-4">
                                        <div>
                                            <div className="text-lime-400 font-bold uppercase text-[9px] tracking-widest">{rev.n}</div>
                                            <div className="text-neutral-500 text-[8px] uppercase">{rev.t}</div>
                                        </div>
                                        <div className="text-lime-600 group-hover:text-lime-500 transition-colors">✔</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 15. CHECKOUT (Command Line Interface Form) */}
                <div id="checkout-terminal" className="py-24 md:py-32 relative border-t border-lime-500/20">
                    <div className="absolute inset-0 bg-[#0d0d0d]"></div>
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(132,204,22,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(132,204,22,0.03)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                    
                    <div className="max-w-5xl mx-auto px-4 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="text-lime-500 font-bold uppercase text-[10px] tracking-[0.3em] mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 bg-lime-500 inline-block animate-pulse"></span> REQUEST HARDWARE
                            </div>
                            <h2 className="text-4xl text-white font-bold uppercase tracking-tight mb-6">Asigna un Equipo <br/>a Tí.</h2>
                            <p className="text-neutral-400 font-sans text-sm mb-12 max-w-sm">Rellena las credenciales de envío. Nuestro sistema enrutará un repartidor COD a tu dirección. Pagas la cifra exacta únicamente al visualizar el equipo físicamente.</p>
                            
                            <div className="text-4xl font-bold text-white bg-white/5 inline-block px-6 py-3 border border-white/10">{fmtPrice(product.price)}</div>
                        </div>
                        
                        <div className="bg-[#050505] border border-lime-500/30 p-8 shadow-[0_0_40px_rgba(132,204,22,0.05)] rounded-lg">
                            <div className="flex space-x-2 mb-6 border-b border-white/10 pb-4">
                                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            </div>
                            
                            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                                <div>
                                    <label className="text-[9px] text-lime-500 uppercase tracking-widest mb-2 block">{'>'} INGRESE_NOMBRE</label>
                                    <input type="text" className="w-full bg-[#0d0d0d] border border-white/10 text-lime-300 font-mono text-sm p-4 focus:border-lime-500 outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="text-[9px] text-lime-500 uppercase tracking-widest mb-2 block">{'>'} INGRESE_CONTACTO_WSP</label>
                                    <input type="tel" className="w-full bg-[#0d0d0d] border border-white/10 text-lime-300 font-mono text-sm p-4 focus:border-lime-500 outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="text-[9px] text-lime-500 uppercase tracking-widest mb-2 block">{'>'} INGRESE_COORDENADAS_ENTREGA</label>
                                    <textarea rows={2} className="w-full bg-[#0d0d0d] border border-white/10 text-lime-300 font-mono text-sm p-4 focus:border-lime-500 outline-none transition-all resize-none"></textarea>
                                </div>
                                <div className="pt-4">
                                    <button className="w-full bg-lime-500 text-black font-bold uppercase tracking-widest text-xs py-5 hover:bg-lime-400 transition-colors shadow-[0_0_20px_rgba(132,204,22,0.4)]">
                                        EJECUTAR DESPACHO COD
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
};

export default PdpGamingLaptop;
