'use client';
import React, { useState } from 'react';
import { StoreData, Product } from '@/lib/types';
import EnhancedProductGallery from '@/components/pdp/EnhancedProductGallery';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { data: StoreData; product: Product; }

const PdpSmartStudioMirror: React.FC<Props> = ({ data, product }) => {
    const [faqOpen, setFaqOpen] = useState<number | null>(null);
    const ai = product.aiContent;
    const fmtPrice = (n: number) => { const s = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); return `Gs. ${s}`; };

    // Estética "Studio Glass Energy": Reflejos, negros profundos, cian vibrante y rojos musculares.
    const bg = '#09090b'; // Zinc 950
    const textMain = '#a1a1aa'; // Zinc 400
    const accent = '#0ea5e9'; // Light Blue 500

    return (
        <div style={{ background: bg, color: textMain }} className="font-sans antialiased overflow-x-hidden selection:bg-cyan-500 selection:text-black">
            
            {/* Mirror / Glass Energy Ambient */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-cyan-600/10 rounded-full blur-[120px] mix-blend-screen animate-[pulse_8s_ease-in-out_infinite]"></div>
                <div className="absolute bottom-0 left-0 w-[40vw] h-[40vh] bg-rose-600/10 rounded-full blur-[100px] mix-blend-screen animate-[pulse_10s_ease-in-out_infinite]"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-zinc-800/10 to-white/5 opacity-50 mix-blend-overlay"></div>
            </div>

            {/* 1. TOP NAV (Locker Room Tech) */}
            <header className="sticky top-0 z-50 bg-[#09090b]/80 backdrop-blur-2xl border-b border-cyan-500/20">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="text-xl font-bold tracking-tighter text-white uppercase flex items-center gap-2">
                        <div className="w-5 h-8 border-2 border-cyan-500 rounded-sm flex items-center justify-center">
                            <div className="w-1 h-3 bg-cyan-400 rounded-full"></div>
                        </div>
                        REFLECT<span className="font-light text-cyan-500">A.I.</span>
                    </div>
                    <div className="text-[10px] font-black text-[#09090b] bg-cyan-500 px-3 py-1 uppercase tracking-widest rounded-sm">
                        Fitness C.O.D.
                    </div>
                </div>
            </header>

            <main className="relative z-10 w-full overflow-hidden">
                {/* 2. BREADCRUMBS & LOGISTICS */}
                <div className="max-w-7xl mx-auto px-6 pt-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">
                            Equipamiento {'>'} Fuerza Digital {'>'} <span className="text-cyan-400">Espejo Biométrico</span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-zinc-300 font-bold bg-[#18181b] px-4 py-2 border border-zinc-800 rounded-full">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-[pulse_2s_ease-in-out_infinite]"></span>
                            Gestión de Pago Presencial Activa
                        </div>
                    </div>
                </div>

                {/* 3. HERO (FITNESS TEMPLE) */}
                <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="relative z-20">
                            <div className="inline-block text-cyan-400 font-bold text-xs mb-6 uppercase tracking-[0.3em] border-l-2 border-cyan-500 pl-3">
                                Gimnasio de Cristal Integral
                            </div>
                            <h1 className="text-5xl lg:text-7xl font-light text-white mb-6 tracking-tighter leading-[1]">
                                {ai?.enhancedTitle || product.title}
                            </h1>
                            <p className="text-lg lg:text-xl text-zinc-400 mb-10 font-light leading-relaxed max-w-lg">
                                {ai?.enhancedDescription || product.description || 'Una pieza de arte en tu pared apagado. Un entrenador holográfico personal que corrige tu postura en tiempo real encendido. El hierro quedó atrás.'}
                            </p>
                            
                            <div className="bg-[#121214] border border-zinc-800 p-8 rounded-3xl relative shadow-[0_20px_50px_rgba(6,182,212,0.05)] backdrop-blur-xl">
                                <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
                                
                                <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-3">Valor de Cuota Vitalicia</div>
                                <div className="flex items-end justify-start gap-4 mb-8">
                                    <span className="text-5xl text-white font-light tracking-tighter">{fmtPrice(product.price)}</span>
                                    {product.originalPrice && <span className="text-sm text-zinc-600 line-through pb-1 font-medium">{fmtPrice(product.originalPrice)}</span>}
                                </div>
                                <button onClick={() => document.getElementById('checkout-mirror')?.scrollIntoView({ behavior: 'smooth' })} className="w-full bg-cyan-600 hover:bg-cyan-500 text-white rounded-2xl py-5 font-bold uppercase tracking-[0.2em] text-xs transition-colors shadow-[0_10px_30px_rgba(6,182,212,0.2)]">
                                    Programar Instalación C.O.D
                                </button>
                                <div className="text-[10px] text-center text-cyan-400/80 uppercase tracking-widest mt-5 font-bold">
                                    Cancela en tu casa al recibir la unidad.
                                </div>
                            </div>
                        </div>

                        <div className="w-full relative flex items-center justify-center p-6 lg:p-12">
                            {/* Mirror reflection illusion */}
                            <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-black rounded-3xl transform rotate-2 scale-95 border border-zinc-700 shadow-2xl z-0 overflow-hidden">
                                <div className="absolute top-0 right-0 w-[150%] h-[150%] bg-white/[0.03] transform -rotate-45 translate-x-12 -translate-y-24"></div>
                            </div>
                            <div className="relative z-10 w-full p-2 bg-[#09090b] rounded-[1.5rem] border border-cyan-900/40">
                                <EnhancedProductGallery product={product} accentColor={accent} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. TRUST BADGES TECHNICAL (Biometrics) */}
                <div className="border-y border-zinc-800 bg-[#0c0c0e]">
                    <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {v: '4K Display', l: 'Cristal Capacitivo'},
                            {v: 'Cam 12MP', l: 'Captura Postural IA'},
                            {v: '100+ Lbs', l: 'Resistencia Digital'},
                            {v: 'Zero Hueco', l: 'Pared Plana (Flush)'}
                        ].map((b, i) => (
                            <div key={i} className="flex flex-col items-center justify-center text-center p-4">
                                <span className="text-3xl font-light text-white mb-2">{b.v}</span>
                                <span className="text-[9px] text-cyan-500 uppercase tracking-widest font-bold">{b.l}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 5. EXPERT ACCORDIONS (The Method) */}
                <div className="max-w-4xl mx-auto px-6 py-32">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-light text-white tracking-tight mb-4">La Gravedad Re-inventada</h2>
                        <p className="text-zinc-500 font-medium text-sm uppercase tracking-widest">Tecnología de Motores Electromagnéticos</p>
                    </div>
                    
                    <div className="space-y-3">
                        {[
                            { t: 'Pesas Invisibles (Resistencia Magnética)', a: 'Tira a la basura las pesadas e inseguras mancuernas de hierro. Los cables retráctiles laterales de esta pantalla generan resistencia tirando usando enormes imanes eléctricos; puedes modificar de 1 a 100 kilos de resistencia con un simple tap en la pantalla táctil.' },
                            { t: 'Ojo Biónico (Scanner de Postura)', a: 'La discreta lente frontal de alta velocidad analiza tus articulaciones. Si en una sentadilla inclinas las rodillas hacia adentro, el instructor virtual en la pantalla pausará el conteo y sobrepondrá líneas rojas en tu reflejo mostrándote cómo corregirlo.' },
                            { t: 'Modo Spotter IA (Cero Lesiones)', a: 'Si estás levantando mucho peso y el sistema sensa que el cable comienza a temblar o te detuviste a la mitad gritando "ayuda", corta el campo magnético al instante. Suelta el peso. Nunca estarás atrapado bajo una barra de nuevo.' }
                        ].map((ac, i) => (
                            <div key={i} className="bg-[#121214] rounded-3xl border border-zinc-800 hover:border-cyan-500/50 transition-colors">
                                <button className="w-full px-8 py-6 flex justify-between items-center text-left" onClick={() => setFaqOpen(faqOpen===i?null:i)}>
                                    <span className="text-white font-medium text-sm tracking-wide">{ac.t}</span>
                                    <span className="text-cyan-500 font-light text-2xl">{faqOpen===i?'−':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {faqOpen === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-8 pb-8 text-zinc-400 font-light text-sm leading-relaxed border-t border-zinc-800/50 pt-4">
                                            {ac.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 6. ENDLESS MARQUEE (Neon Gym) */}
                <div className="w-[100vw] overflow-hidden py-6 bg-gradient-to-r from-cyan-600 to-blue-600 text-white flex transform relative left-[50%] -translate-x-[50%]">
                    <div className="flex whitespace-nowrap font-black text-2xl uppercase tracking-[0.2em] opacity-90">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="flex items-center gap-12 px-8">
                                <span>SMART RESISTANCE</span>
                                <span className="bg-white w-2 h-2 rounded-full"></span>
                                <span>UNLIMITED IRON</span>
                                <span className="bg-white w-2 h-2 rounded-full"></span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 7. WHY TO USE / BENEFITS */}
                <div className="max-w-7xl mx-auto px-6 py-32 border-b border-zinc-900">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="order-2 lg:order-1 relative">
                            {/* Glass display concept */}
                            <div className="aspect-[3/4] max-w-sm mx-auto bg-black border-8 border-zinc-800 rounded-[3rem] relative shadow-2xl overflow-hidden p-6 flex flex-col justify-end">
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cyan-900/30"></div>
                                {/* Fake reflection overlay */}
                                <div className="absolute top-0 right-0 w-full h-full bg-white opacity-[0.02] transform rotate-12 origin-bottom-left"></div>
                                
                                <div className="relative z-10 text-center bg-black/60 backdrop-blur-md p-6 rounded-3xl border border-zinc-800">
                                    <div className="text-3xl font-light text-white mb-1">Costo Físico Cero.</div>
                                    <div className="text-cyan-400 font-bold uppercase text-[10px] tracking-widest mb-4">Adios mensualidades de gimnasio</div>
                                    <p className="text-zinc-400 font-light text-xs leading-relaxed">No tienes que ver espejos llenos de sudor con música insoportable que tú no elegiste.</p>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2">
                            <h2 className="text-4xl lg:text-5xl font-light text-white leading-[1.1] mb-8">Tus paredes ahora <br/><span className="text-cyan-500 font-medium">bombean sangre.</span></h2>
                            <p className="text-zinc-400 font-light text-lg leading-relaxed mb-10">Manejas horas atravesando tráfico para llegar a gimnasios repletos, esperar máquinas, y volver destrozado a ducharte. Elimina la fricción. La pared de tu sala de estar se acaba de transformar en un santuario de hipertrofia.</p>
                            
                            <ul className="space-y-6">
                                {[
                                    { t: 'Clases En Directo Tras el Espejo', d: 'Boxeo, Pilates, Yoga y Levantamiento pesado. Instructores a escala 1:1 aparecen frente a ti, dictándote órdenes con la música bombeando.' },
                                    { t: 'Modo Invitado Multi-Perfil', d: 'Con solo pararse enfrente, la cámara reconoce tu cara biométricamente y ajusta instantáneamente los pesos magnéticos a la fuerza de tu propio perfil.' }
                                ].map((b, i) => (
                                    <li key={i} className="flex gap-5">
                                        <div className="w-10 h-10 border border-cyan-500/30 rounded-full flex items-center justify-center text-cyan-500 font-bold shrink-0">0{i+1}</div>
                                        <div>
                                            <h4 className="text-white font-medium uppercase tracking-[0.15em] text-[10px] mb-2">{b.t}</h4>
                                            <p className="text-zinc-500 font-light text-sm leading-relaxed">{b.d}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* 10. COMPARISON TABLE */}
                <div className="max-w-4xl mx-auto px-6 py-24">
                    <h2 className="text-center text-zinc-600 uppercase font-bold text-[10px] tracking-widest mb-12">Rendimiento Inversional</h2>
                    <div className="border border-zinc-800 bg-[#121214] rounded-3xl overflow-hidden">
                        <div className="grid grid-cols-3 bg-[#0c0c0e] text-[9px] uppercase font-bold text-zinc-500 tracking-[0.2em] border-b border-zinc-800">
                            <div className="p-6">Medición</div>
                            <div className="p-6 text-white border-x border-zinc-800 text-center bg-cyan-900/20">Espejo Inteligente</div>
                            <div className="p-6 text-center">Gimnasio Comercial</div>
                        </div>
                        {[
                            { k: 'Tiempo de Traslado Promedio', u: '0 Minutos', t: '50 Minutos (Ida/Vuelta)' },
                            { k: 'Costo de Equipos Varios', u: 'Todo Incluido dentro del muro', t: 'Compras múltiples o membresías caras' },
                            { k: 'Seguridad en el Pago', u: 'Abone C.O.D. en su casa al recibir', t: 'Débitos automáticos imposibles de cancelar' }
                        ].map((r, i) => (
                            <div key={i} className="grid grid-cols-3 border-t border-zinc-800/50 font-light text-xs hover:bg-[#18181b] transition-colors">
                                <div className="p-6 text-zinc-400">{r.k}</div>
                                <div className="p-6 font-medium text-cyan-300 bg-cyan-900/10 border-x border-zinc-800 text-center">{r.u}</div>
                                <div className="p-6 text-zinc-600 text-center line-through">{r.t}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 11. RISK REVERSAL WARRANTY */}
                <div className="py-24 bg-[#09090b] text-center px-6 relative">
                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>
                    <div className="max-w-3xl mx-auto">
                        <div className="inline-block p-4 rounded-full bg-cyan-500/10 text-cyan-500 mb-6">
                            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /><path d="M9 12l2 2 4-4" /></svg>
                        </div>
                        <h3 className="text-3xl text-white font-light uppercase tracking-tighter mb-6">Blindaje de Compra Física.</h3>
                        <p className="text-zinc-400 font-light leading-relaxed max-w-2xl mx-auto text-sm">
                            Este es un artículo de lujo para diseño de interiores. Cuidamos su integridad usando una flota privada que te lo llevará bajo la modalidad C.O.D. (Contra Reembolso). Te relajas esperando el turno acordado, los operarios lo ingresan a tu suite, lo observas en prístinas condiciones, y pagas monetariamente presencial. Cero estrés de internet.
                        </p>
                    </div>
                </div>

                {/* 13. FAQ */}
                <div className="max-w-3xl mx-auto px-6 py-24 border-t border-zinc-800">
                    <h2 className="text-2xl text-white font-light tracking-tight mb-12 text-center">Protocolos del Sistema</h2>
                    <div className="space-y-3">
                        {[
                            {q: '¿Tengo que amurarlo obligatoriamente a la pared (perforar)?', a: 'No, viene con un soporte de acero trasero pesadísimo. Puedes recostarlo elegante y sutilmente contra la pared sin hacer un solo agujero, lo cual es ideal si rentas/alquilas tu apartamento.'},
                            {q: 'Si se corta la luz, ¿Me caen de golpe las pesas virtuales?', a: 'En absoluto. Como la resistencia en sus cuerdas es por electromagnetismo puro, un apagón repentino significa que el imán pierde poder suavemente: el cable simplemente se vuelve flojo y liviano sin impacto.'},
                            {q: 'Me asusta poner la tarjeta online, veo el pago C.O.D. ¿Requieren adelantos?', a: 'CERO adelantos. Llenas el formulario de abajo. Una operadora de WhatsApp te enviará un mensaje. Ella acordará el horario para que estés en casa. En ese momento lo llevamos y lo pagas. Es transparente al 100%.'}
                        ].map((f, i) => (
                            <div key={i} className="bg-[#121214] rounded-2xl border border-zinc-800/80">
                                <button onClick={() => setFaqOpen(faqOpen===i?null:i)} className="w-full p-6 text-left flex justify-between items-center text-zinc-300 font-medium text-sm transition-colors">
                                    {f.q}
                                    <span className="text-cyan-500 font-light text-xl">{faqOpen===i?'−':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {faqOpen === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 pb-6 text-zinc-500 font-light text-sm leading-relaxed border-t border-zinc-800/50 pt-4">
                                            {f.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 14. EXPANDED REVIEWS */}
                <div className="py-24 bg-[#050505] border-y border-zinc-900">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { r: "Elegante a más no poder. Visitas creen que tengo un vulgar espejo negro en el pasillo, pero cuando le doy dos toques, se enciende la luz alienígena turquesa y me pongo a sudar con el instructor HD. Excelente el cobro presencial.", n: "Ignacio M.", t: "Cliente Frecuente" },
                                { r: "Odiaba ir al gimnasio abarrotado y las máquinas siempre llenas de transpiración ajena. Invertí en esto y me devolvió unas 6 horas semanales. Cancelando contra-entrega es hiper tranquilo.", n: "Julieta F.", t: "Emprendedora" },
                                { r: "Soy grandote y pensé que los cables los iba a arrancar, pero cuando le subí a 80 kilos digitales se trabó magnéticamente como empujar concreto. Increíble software.", n: "Maxi B.", t: "Deportista Amateur" }
                            ].map((rev, i) => (
                                <div key={i} className="p-8 bg-[#0c0c0e] border border-zinc-800 rounded-3xl relative">
                                    <p className="text-zinc-400 font-light text-sm mb-6 leading-relaxed relative z-10 italic">"{rev.r}"</p>
                                    <div className="border-t border-zinc-800 pt-4 opacity-80">
                                        <div className="text-zinc-200 font-medium text-[11px] uppercase tracking-widest">{rev.n}</div>
                                        <div className="text-cyan-600 uppercase text-[9px] font-bold mt-1 tracking-widest">{rev.t}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 15. CHECKOUT (Digital Lock) */}
                <div id="checkout-mirror" className="py-32 relative bg-[#09090b]">
                    <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        <div className="order-2 lg:order-1 bg-[#121214] p-10 lg:p-14 border border-zinc-800 rounded-[2.5rem] shadow-[0_0_80px_rgba(6,182,212,0.03)] relative overflow-hidden">
                            {/* Inner glow */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-600/10 rounded-full blur-3xl"></div>
                            
                            <div className="relative z-10">
                                <div className="mb-10 lg:text-left">
                                    <h3 className="text-2xl font-light text-white mb-2 tracking-tight">Registro de Unidad Biometal.</h3>
                                    <div className="text-[10px] font-bold text-cyan-500 uppercase tracking-widest">Protocolo Despacho Físico C.O.D.</div>
                                </div>
                                
                                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                                    <div>
                                        <input type="text" className="w-full bg-[#050505] border border-zinc-800 text-white font-medium text-sm p-4 rounded-xl focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all placeholder:text-zinc-600" placeholder="Titular Requerido" />
                                    </div>
                                    <div>
                                        <input type="tel" className="w-full bg-[#050505] border border-zinc-800 text-white font-medium text-sm p-4 rounded-xl focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all placeholder:text-zinc-600" placeholder="Señal Celular Diaria" />
                                    </div>
                                    <div>
                                        <textarea rows={2} className="w-full bg-[#050505] border border-zinc-800 text-white font-medium text-sm p-4 rounded-xl focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all placeholder:text-zinc-600 resize-none" placeholder="Coordenadas y Detalles para Cadetería"></textarea>
                                    </div>
                                    <div className="pt-4">
                                        <button className="w-full bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl py-5 font-bold uppercase tracking-[0.2em] text-[11px] transition-colors shadow-[0_10px_20px_rgba(6,182,212,0.15)]">
                                            Ejecutar Misión Logística
                                        </button>
                                        <div className="text-[10px] text-center text-zinc-500 mt-4 uppercase tracking-widest font-bold">Liquida la cuota directamente con el chófer.</div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="order-1 lg:order-2 text-center lg:text-left">
                            <h2 className="text-4xl lg:text-5xl font-light text-white uppercase tracking-tighter leading-tight mb-8">La fuerza y data <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">en la palma física.</span></h2>
                            <p className="text-zinc-400 font-light text-lg mb-10 leading-relaxed max-w-sm mx-auto lg:mx-0">Pasa de nivel y entrena en el año en que vives, sin exponer tu capital en interfaces fraudulentas internacionales. Rellena los perfiles abajo para el envío blindado local.</p>
                            
                            <div className="text-5xl font-light text-white tracking-tighter mx-auto lg:mx-0 py-2 border-l-2 border-cyan-500 pl-4 w-max">{fmtPrice(product.price)}</div>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
};

export default PdpSmartStudioMirror;
