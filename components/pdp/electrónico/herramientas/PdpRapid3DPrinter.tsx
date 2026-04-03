'use client';
import React, { useState } from 'react';
import { StoreData, Product } from '@/lib/types';
import EnhancedProductGallery from '@/components/pdp/EnhancedProductGallery';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { data: StoreData; product: Product; }

const PdpRapid3DPrinter: React.FC<Props> = ({ data, product }) => {
    const [faqOpen, setFaqOpen] = useState<number | null>(null);
    const ai = product.aiContent;
    const fmtPrice = (n: number) => { const s = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); return `Gs. ${s}`; };

    // Estética "Blueprint Cyber": Fondo azul profundo/espacial, mallas 3D cyan neón, texto consola.
    const bg = '#020617'; // Slate 950 (Dark blue space)
    const textMain = '#94a3b8'; // Slate 400
    const accent = '#22d3ee'; // Cyan 400

    return (
        <div style={{ background: bg, color: textMain }} className="font-mono antialiased overflow-x-hidden selection:bg-cyan-500 selection:text-black">
            
            {/* 3D Blueprint Ambient Grid */}
            <div className="fixed inset-0 pointer-events-none z-0">
                {/* Perspective Grid */}
                <div className="absolute inset-x-0 bottom-0 h-full border-t border-cyan-500/10" style={{ background: 'linear-gradient(transparent 49px, rgba(34, 211, 238, 0.05) 50px), linear-gradient(90deg, transparent 49px, rgba(34, 211, 238, 0.05) 50px)', backgroundSize: '50px 50px', transform: 'perspective(1000px) rotateX(60deg) scale(2)', transformOrigin: 'top center', opacity: 0.6 }}></div>
                {/* Glow behind the printer */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-3xl max-h-3xl bg-cyan-600/10 rounded-full blur-[100px] mix-blend-screen animate-pulse"></div>
            </div>

            {/* 1. TOP NAV (CAD Interface) */}
            <header className="sticky top-0 z-50 bg-[#020617]/80 backdrop-blur-md border-b border-cyan-900 shadow-[0_5px_30px_rgba(34,211,238,0.05)]">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="text-xl font-bold tracking-[0.2em] text-white uppercase flex items-center gap-3">
                        <div className="w-6 h-6 border border-cyan-400 relative p-1">
                            {/* Tiny extruder icon abstract */}
                            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1 h-3 bg-cyan-400"></div>
                            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-2 h-1 bg-cyan-400"></div>
                        </div>
                        EXTRUDE_<span className="font-light text-cyan-400">CORE</span>
                    </div>
                    <div className="text-[10px] uppercase font-bold tracking-widest text-[#020617] bg-cyan-400 px-3 py-1 border border-cyan-300">
                        PAGO CONTRA RECEPCIÓN
                    </div>
                </div>
            </header>

            <main className="relative z-10 w-full overflow-hidden">
                {/* 2. BREADCRUMBS & LOGISTICS */}
                <div className="max-w-7xl mx-auto px-6 pt-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="text-[10px] uppercase font-bold tracking-[0.3em] text-cyan-800">
                            Prototipado {'>'} Fabricación XYZ {'>'} <span className="text-cyan-400">CoreXY Rápida</span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-cyan-500 font-bold bg-[#040d21] border border-cyan-900/50 px-4 py-2">
                            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping"></span>
                            Distribuidor en Ciudad [Activo]
                        </div>
                    </div>
                </div>

                {/* 3. HERO (THE BENCHY MAKER) */}
                <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center flex-col-reverse lg:flex-row">
                        <div className="relative z-20">
                            <div className="inline-block text-cyan-300 bg-cyan-900/30 border border-cyan-500/30 font-bold text-[10px] mb-6 uppercase tracking-[0.3em] px-3 py-1">
                                {'>'} VELOCIDAD: 500mm/s
                            </div>
                            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 uppercase tracking-tighter leading-none">
                                {ai?.enhancedTitle || product.title}
                            </h1>
                            <p className="text-base text-cyan-100/70 mb-10 leading-relaxed font-medium max-w-lg">
                                {ai?.enhancedDescription || product.description || 'La era de armar impresoras con tornillos sueltos terminó. Sácala de la caja, enchúfala, y en 15 minutos tu primera pieza industrial de fibra de carbono estará en tus manos.'}
                            </p>
                            
                            <div className="bg-[#040d21] border border-cyan-900/60 p-8 shadow-[0_0_30px_rgba(34,211,238,0.1)] relative">
                                <div className="absolute top-0 right-8 w-px h-8 bg-cyan-500"></div>
                                <div className="text-[10px] text-cyan-600 uppercase tracking-[0.2em] font-bold mb-3">COTIZACIÓN EXACTA //</div>
                                <div className="flex items-end gap-5 mb-8">
                                    <span className="text-4xl text-white font-bold tracking-tight">{fmtPrice(product.price)}</span>
                                    {product.originalPrice && <span className="text-sm text-cyan-800 line-through pb-1 font-bold">{fmtPrice(product.originalPrice)}</span>}
                                </div>
                                <button onClick={() => document.getElementById('checkout-printer')?.scrollIntoView({ behavior: 'smooth' })} className="w-full bg-cyan-500 hover:bg-cyan-400 text-black py-4 font-bold uppercase tracking-[0.2em] text-xs transition-colors shadow-[inset_0_0_10px_rgba(255,255,255,0.5)]">
                                    ENSAMBLAR PEDIDO C.O.D
                                </button>
                                <div className="text-[9px] text-cyan-500/70 uppercase tracking-widest mt-4 font-bold text-center">
                                    SIN TARJETAS - CUBRES EL COSTO AL CONFIRMAR LA CAJA
                                </div>
                            </div>
                        </div>

                        <div className="w-full relative flex items-center justify-center p-8">
                            {/* Blueprint enclosing box */}
                            <div className="absolute inset-4 border-2 border-dashed border-cyan-900/50 rounded-xl z-0"></div>
                            <div className="absolute top-0 left-0 text-[10px] text-cyan-800 tracking-widest font-bold">Z-AXIS: 0.00</div>
                            <div className="absolute bottom-0 right-0 text-[10px] text-cyan-800 tracking-widest font-bold">Y-AXIS: 0.00</div>
                            <div className="relative z-10 w-full p-2 bg-[#020617] border border-cyan-900 shadow-2xl">
                                <EnhancedProductGallery product={product} accentColor={accent} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. TRUST BADGES TECHNICAL (Specs) */}
                <div className="border-y border-cyan-900/50 bg-[#040d21]">
                    <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {v: '500 mm/s', l: 'Velocidad Max.'},
                            {v: 'LiDAR Sen', l: 'Nivelación Auto.'},
                            {v: '300 °C', l: 'Temperatura Hotend'},
                            {v: 'CoreXY', l: 'Cinemática Frame'}
                        ].map((b, i) => (
                            <div key={i} className="flex flex-col items-center border border-cyan-900/30 p-4 bg-[#020617]/50">
                                <span className="text-2xl font-bold text-white mb-2">{b.v}</span>
                                <span className="text-[9px] text-cyan-500 uppercase tracking-widest font-bold">{b.l}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 5. EXPERT ACCORDIONS (The Tech) */}
                <div className="max-w-4xl mx-auto px-6 py-24">
                    <div className="text-center mb-16">
                        <div className="inline-block px-4 py-1 border border-cyan-500/30 text-cyan-400 tracking-[0.3em] text-[10px] font-bold mb-4">REPORTE DE INGENIERÍA</div>
                        <h2 className="text-3xl font-bold text-white uppercase tracking-tight">Cero Ajustes Manuales</h2>
                    </div>
                    
                    <div className="space-y-4">
                        {[
                            { t: 'Nivelación LIDAR con Microscopio', a: 'Olvídate de pasar un papelito debajo de la boquilla para ajustar ruedas. Un escáner láser inferior lee la cama de impresión con resolución micrométrica y mapea los relieves para inyectar plástico siempre perfecto en la primera capa.' },
                            { t: 'Compensación Activa de Vibración', a: 'Ejes pesados a 500mm/s sacudirían tu mesa y deformarían la caja. La máquina usa un acelerómetro G-Sensor dentro de la herramienta que "siente" las vibraciones y las cancela matemáticamente enviando frecuencias opuestas a los motores (Input Shaping).' },
                            { t: 'Cámara IA Anti-Spaghetti', a: '¿Impresión de 12 horas mientras duermes? La cámara interna con visión artificial detecta si el plástico se despega y hace formas de fideos (spaghetti). Si pasa eso, frena la máquina por sí sola y te manda la foto al celular para ahorrar filamento.' }
                        ].map((ac, i) => (
                            <div key={i} className="bg-[#040d21] border border-cyan-900/50 hover:border-cyan-400 transition-colors">
                                <button className="w-full px-8 py-6 flex justify-between items-center text-left" onClick={() => setFaqOpen(faqOpen===i?null:i)}>
                                    <span className="text-cyan-50 font-bold text-xs uppercase tracking-widest">{ac.t}</span>
                                    <span className="text-cyan-500 font-bold text-xl">{faqOpen===i?'_':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {faqOpen === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-8 pb-8 text-cyan-200/50 text-xs leading-relaxed border-t border-cyan-900/50 pt-6">
                                            {ac.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 6. ENDLESS MARQUEE (Neon Filament) */}
                <div className="w-[100vw] overflow-hidden py-4 bg-cyan-950/50 border-y border-cyan-900 flex transform relative left-[50%] -translate-x-[50%]">
                    <div className="flex whitespace-nowrap font-black text-2xl uppercase tracking-[0.2em] text-cyan-500/80">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="flex items-center gap-12 px-8">
                                <span>PLA / PETG / ABS / ASA</span>
                                <span className="text-white/20">|</span>
                                <span>FLAWLESS FIRST LAYER</span>
                                <span className="text-white/20">|</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 7. WHY TO USE / BENEFITS */}
                <div className="max-w-7xl mx-auto px-6 py-32 border-b border-cyan-900/30">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="order-2 lg:order-1 relative">
                            {/* Terminal / Code interface concept */}
                            <div className="bg-[#020617] border border-cyan-900 p-6 rounded-lg relative overflow-hidden font-mono text-[10px] leading-relaxed text-cyan-600 shadow-[0_20px_50px_rgba(34,211,238,0.03)] h-80">
                                <div className="absolute top-0 inset-x-0 h-6 bg-cyan-900/30 flex items-center px-4">
                                    <div className="text-cyan-400 font-bold">G-CODE TERMINAL</div>
                                </div>
                                <div className="mt-6">
                                    <div>{`> M104 S220 ; set nozzle temp`}</div>
                                    <div className="text-cyan-400">{`> M140 S60  ; set bed temp`}</div>
                                    <div>{`> G28       ; home all axis`}</div>
                                    <div>{`> G29       ; auto bed leveling...`}</div>
                                    <div className="text-green-500 mt-2">{`[OK] Bed Variance: 0.021mm`}</div>
                                    <div>{`> G1 Z0.2 F3000`}</div>
                                    <div>{`> G1 X100 E10 F1500 ; purge line`}</div>
                                    <div className="mt-4 text-cyan-200 animate-pulse">{`> PRINTING LAYER 1/450 ...`}</div>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2">
                            <h2 className="text-4xl lg:text-5xl font-bold text-white uppercase tracking-tighter leading-tight mb-8">Ideas puras <br/><span className="text-cyan-400">Directo al plástico.</span></h2>
                            <p className="text-cyan-100/60 font-medium text-sm mb-12 leading-relaxed">No la compraste para modificarla, la compraste como una herramienta. Es un horno microondas para tus archivos 3D. Le envías un objeto desde tu PC, te das la vuelta, y horas después es real. Sin raspar espátulas, sin rezar para que pegue.</p>
                            
                            <ul className="space-y-6">
                                {[
                                    { t: 'Hotend de Flujo Alto Metálico', d: 'Funde plástico salvajemente para sostener 500mm/s sostenidos. Imprimirás un casco de Iron-Man en 14 horas en vez de los 4 días que toma en máquinas de generación pasada.' },
                                    { t: 'Base Flexible Magnética PEI', d: 'La pieza que imprimiste está pegada durísimo por el calor. Sacas la placa de acero, la doblas ligeramente y la pieza "salta" limpia por sí sola.' }
                                ].map((b, i) => (
                                    <li key={i} className="flex gap-4">
                                        <div className="w-8 h-8 rounded border border-cyan-700 bg-cyan-900/20 text-cyan-400 font-bold flex items-center justify-center shrink-0">v{i+1}</div>
                                        <div>
                                            <h4 className="text-cyan-50 font-bold uppercase tracking-widest text-xs mb-1">{b.t}</h4>
                                            <p className="text-cyan-200/50 text-xs leading-relaxed">{b.d}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* 10. COMPARISON TABLE */}
                <div className="max-w-4xl mx-auto px-6 py-24">
                    <div className="border border-cyan-900 bg-[#040d21]">
                        <div className="grid grid-cols-3 bg-[#020617] text-[9px] uppercase font-bold text-cyan-600 tracking-[0.2em] border-b border-cyan-900 p-2">
                            <div className="p-4 md:p-6 opacity-0">...</div>
                            <div className="p-4 md:p-6 text-cyan-300 border-x border-cyan-900 text-center bg-cyan-900/20">Next-Gen CoreXY (Nuestra)</div>
                            <div className="p-4 md:p-6 text-center text-cyan-800">Bed Slinger Clásico (Ruedas)</div>
                        </div>
                        {[
                            { k: 'Tiempo calibración', u: 'Automatizado (3 min iniciales)', t: 'Manual horas frustrantes con papel' },
                            { k: 'Velocidad Benchy', u: '14 Minutos (Alta calidad)', t: '1 Hora 45 minutos (Calidad Media)' },
                            { k: 'Cierre Financiero', u: 'Pago Físico Contado a Domicilio', t: 'Tarjeta internacional con retención Aduana' }
                        ].map((r, i) => (
                            <div key={i} className="grid grid-cols-3 border-t border-cyan-900/50 text-xs hover:bg-[#061536] transition-colors">
                                <div className="p-4 md:p-6 text-cyan-100/50">{r.k}</div>
                                <div className="p-4 md:p-6 font-bold text-cyan-400 bg-cyan-900/10 border-x border-cyan-900 text-center flex items-center justify-center">{r.u}</div>
                                <div className="p-4 md:p-6 text-cyan-800 text-center line-through font-medium flex items-center justify-center">{r.t}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 11. RISK REVERSAL WARRANTY */}
                <div className="py-24 bg-[#040d21] border-y border-cyan-900 text-center px-6">
                    <div className="max-w-3xl mx-auto">
                        <div className="mb-8 font-black text-xs text-cyan-500 uppercase tracking-[0.3em] border border-cyan-500 p-3 inline-block">
                            LOGÍSTICA SEGURA C.O.D.
                        </div>
                        <h3 className="text-3xl text-white font-bold uppercase tracking-tighter mb-6">Bloquea El Fraude Virtual.</h3>
                        <p className="text-cyan-100/60 text-sm leading-relaxed max-w-2xl mx-auto">
                            Comprar maquinarias complejas de inyección de plástico exige tu tarjeta de crédito en importadoras repletas de quejas. Cortamos el eslabón débil: completas tu orden (sin cargo en web). Asignamos ruta y enviamos tu robot en caja prístina mediante nuestro personal a tu hogar. Compruebas visualmente el equipo y ahí, sobre seguro, ejecutas tu pago pactado presencial.
                        </p>
                    </div>
                </div>

                {/* 13. FAQ */}
                <div className="max-w-3xl mx-auto px-6 py-24">
                    <div className="space-y-4">
                        {[
                            {q: '¿Puede imprimir materiales industriales o sólo PLA de juguetes?', a: 'Su encerramiento y cama que levanta 100°C te permitirá hacer piezas funcionales en ABS, Nylon y Fibra de Carbono sin deformarse (Warping).'},
                            {q: 'Si soy nuevo, ¿necesito armar todas sus piezas yo mismo?', a: 'Negativo, sale de la caja 95% ensamblada. Solapas la pantalla táctil, cortas unos precintos rojos, enchufas, y el asistente inteligente toma control de tu primera calibración.'},
                            {q: 'Si compro C.O.D, ¿qué pasa si la unidad falla de sistemas la primera semana?', a: 'Esa es la ventaja suprema. Obtienes repuestos o recambio local garantizado directo con nosotros que te la llevamos, en contra de máquinas chinas importadas donde te desamparan tras la entrega.'}
                        ].map((f, i) => (
                            <div key={i} className="bg-[#020617] border-l-4 border-cyan-900 hover:border-cyan-500 p-2">
                                <button onClick={() => setFaqOpen(faqOpen===i?null:i)} className="w-full p-6 text-left flex justify-between items-center text-cyan-50 font-bold text-xs uppercase tracking-widest transition-colors">
                                    {f.q}
                                    <span className="text-cyan-500 font-bold text-xl">{faqOpen===i?'−':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {faqOpen === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 pb-6 text-cyan-200/60 font-medium text-xs leading-relaxed pt-2">
                                            {f.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 15. CHECKOUT (G-CODE Form) */}
                <div id="checkout-printer" className="py-32 relative bg-[#020617]">
                    <div className="absolute top-0 inset-x-0 h-px bg-cyan-900"></div>
                    <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center flex-col-reverse lg:flex-row">
                        <div className="lg:col-span-6 bg-[#040d21] p-10 border border-cyan-900 relative shadow-2xl">
                            <div className="absolute top-4 left-4 text-cyan-900 font-black text-6xl opacity-30 select-none">3D</div>
                            
                            <div className="relative z-10 mt-4">
                                <div className="mb-8 border-b border-cyan-900 pb-4">
                                    <h3 className="text-xl font-bold text-cyan-100 uppercase tracking-widest">Compilar Orden de Flete</h3>
                                    <div className="text-[10px] font-bold text-cyan-500 uppercase tracking-[0.2em] mt-2">VINCULANDO COMPRA C.O.D ...</div>
                                </div>
                                
                                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                                    <div>
                                        <label className="text-[9px] text-cyan-600 uppercase tracking-widest font-bold mb-1 block">USER ID (NOMBRE Y APELLIDO)</label>
                                        <input type="text" className="w-full bg-[#020617] border border-cyan-900 focus:border-cyan-500 text-cyan-100 font-bold text-sm p-4 outline-none transition-colors" placeholder="INGRESE_DATOS" />
                                    </div>
                                    <div>
                                        <label className="text-[9px] text-cyan-600 uppercase tracking-widest font-bold mb-1 block">PING (TELEFONO/WHATSAPP)</label>
                                        <input type="tel" className="w-full bg-[#020617] border border-cyan-900 focus:border-cyan-500 text-cyan-100 font-bold text-sm p-4 outline-none transition-colors" placeholder="INGRESE_NUMERO" />
                                    </div>
                                    <div>
                                        <label className="text-[9px] text-cyan-600 uppercase tracking-widest font-bold mb-1 block">COORDENADAS DE ATERRIZAJE</label>
                                        <textarea rows={2} className="w-full bg-[#020617] border border-cyan-900 focus:border-cyan-500 text-cyan-100 font-bold text-sm p-4 outline-none transition-colors resize-none" placeholder="CALLE, NUMERO, CIUDAD"></textarea>
                                    </div>
                                    <div className="pt-2">
                                        <button className="w-full bg-cyan-600 hover:bg-cyan-500 text-black py-5 font-bold uppercase tracking-[0.2em] text-[11px] transition-colors relative overflow-hidden">
                                            INICIAR SECUENCIA LOGÍSTICA
                                        </button>
                                        <div className="text-[9px] text-center text-cyan-700 mt-4 uppercase tracking-[0.2em] font-bold">
                                            SEGURO. CASH ON DELIVERY GARANTIZADO.
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="lg:col-span-6 lg:pl-10 text-center lg:text-left">
                            <h2 className="text-4xl lg:text-5xl font-bold text-white uppercase tracking-tighter leading-none mb-6">Tu Fábrica Personal <br/><span className="text-cyan-400">Despega Hoy.</span></h2>
                            <p className="text-cyan-100/60 font-medium text-sm mb-10 leading-relaxed max-w-sm mx-auto lg:mx-0">Pasa de ser un consumidor a ser un fabricante en 24 horas usando logística urbana física impecable. Coloca tus variables a la izquierda y despachamos hoy la carga a tu vereda.</p>
                            
                            <div className="text-4xl lg:text-5xl font-bold text-cyan-50 tracking-tighter mx-auto lg:mx-0">{fmtPrice(product.price)}</div>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
};

export default PdpRapid3DPrinter;
