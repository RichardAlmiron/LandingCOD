'use client';
import React, { useState } from 'react';
import { StoreData, Product } from '@/lib/types';
import EnhancedProductGallery from '@/components/pdp/EnhancedProductGallery';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { data: StoreData; product: Product; }

const PdpUrbanScooter: React.FC<Props> = ({ data, product }) => {
    const [faqOpen, setFaqOpen] = useState<number | null>(null);
    const ai = product.aiContent;
    const fmtPrice = (n: number) => { const s = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); return `Gs. ${s}`; };

    // Estética "Asphalt Stealth": Grises oscuro humo, ángulos agresivos rectos, luces de neón rojas (Tail-lights)
    const bg = '#0d0d0f'; // Dark stealth gray
    const textMain = '#94a3b8'; // Slate 400
    const accent = '#ef4444'; // Red 500

    return (
        <div style={{ background: bg, color: textMain }} className="font-sans antialiased overflow-x-hidden selection:bg-red-500 selection:text-white">
            
            {/* Velocity Lines Ambient */}
            <div className="fixed inset-0 pointer-events-none z-0 opacity-10">
                <div className="absolute top-0 right-0 w-full h-[60vh] bg-[linear-gradient(-45deg,transparent_25%,rgba(239,68,68,0.2)_50%,transparent_75%)] bg-[length:200%_200%] animate-[pulse_4s_ease-in-out_infinite]"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asphalt-dark.png')] opacity-20 mix-blend-overlay"></div>
            </div>

            {/* 1. TOP NAV (Sport HUD) */}
            <header className="sticky top-0 z-50 bg-[#0d0d0f] border-b-2 border-red-900/50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="text-2xl font-black italic tracking-tighter text-white uppercase flex items-center gap-1">
                        <span className="text-red-500 mr-2 transform -skew-x-[20deg] block bg-red-500 w-3 h-5"></span>
                        AERO<span className="font-light text-slate-400">MACH</span>
                    </div>
                    <div className="text-[10px] font-bold text-white bg-red-600 px-4 py-1 uppercase tracking-widest transform -skew-x-[15deg]">
                        <span className="skew-x-[15deg] block">Zero Emisiones</span>
                    </div>
                </div>
            </header>

            <main className="relative z-10 w-full overflow-hidden">
                {/* 2. BREADCRUMBS & LOGISTICS */}
                <div className="max-w-7xl mx-auto px-6 pt-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-600 bg-[#16161a] px-3 py-1 inline-block border border-slate-800">
                            Ciudad {'>'} Transporte Líquido {'>'} <span className="text-red-500">Dual Motor V2</span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-slate-300 font-bold">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-[ping_2s_ease-in-out_infinite]"></span>
                            Logística Contra-Reembolso Activa
                        </div>
                    </div>
                </div>

                {/* 3. HERO (ASPHALT RACE) */}
                <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="relative z-20">
                            <div className="inline-block text-red-500 font-black text-4xl mb-6 italic transform -skew-x-[10deg] tracking-tighter">
                                SPORT EDITION.
                            </div>
                            <h1 className="text-5xl lg:text-7xl font-black text-white mb-6 uppercase tracking-tighter leading-[0.9] drop-shadow-2xl">
                                {ai?.enhancedTitle || product.title}
                            </h1>
                            <p className="text-lg lg:text-xl text-slate-400 mb-10 font-medium leading-relaxed max-w-lg border-l-2 border-red-600 pl-4">
                                {ai?.enhancedDescription || product.description || 'El asesino del tráfico pesado. Construido enteramente en aleación ligera, corta la ciudad a 40km/h burlando al transporte público con absoluta agilidad.'}
                            </p>
                            
                            <div className="bg-[#16161a] border border-slate-800 p-8 relative shadow-2xl skew-x-[-2deg] hover:skew-x-0 transition-transform duration-500">
                                <div className="absolute inset-0 bg-gradient-to-tr from-red-600/5 to-transparent skew-x-[2deg] z-0"></div>
                                <div className="relative z-10 skew-x-[2deg]">
                                    <div className="text-[10px] text-slate-500 uppercase tracking-widest font-black mb-2">Pago Único Operativo</div>
                                    <div className="flex items-end gap-5 mb-8">
                                        <span className="text-4xl text-white font-black tracking-tighter italic">{fmtPrice(product.price)}</span>
                                        {product.originalPrice && <span className="text-sm text-slate-600 font-bold line-through pb-1">{fmtPrice(product.originalPrice)}</span>}
                                    </div>
                                    <button onClick={() => document.getElementById('checkout-mobility')?.scrollIntoView({ behavior: 'smooth' })} className="w-full bg-red-600 text-white rounded-none py-5 font-black uppercase tracking-widest text-xs hover:bg-red-500 transition-colors shadow-[5px_5px_0_theme(colors.red.900)] active:shadow-none active:translate-x-[5px] active:translate-y-[5px]">
                                        Solicitar Chofer a Domicilio
                                    </button>
                                    <div className="text-[9px] text-center text-red-400 uppercase font-black tracking-[0.2em] mt-6">
                                        Abonas el vehículo C.O.D en persona
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full relative flex items-center justify-center lg:p-10">
                            {/* Asphalt background platform */}
                            <div className="absolute inset-0 top-[20%] bg-[#08080a] border-t-2 border-r-2 border-red-900/30 transform skew-12 rounded-tr-3xl shadow-[0_-20px_50px_rgba(239,68,68,0.1)] z-0"></div>
                            <div className="relative z-10 w-full p-4 skew-y-1">
                                <EnhancedProductGallery product={product} accentColor={accent} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. TRUST BADGES TECHNICAL (Dashboard) */}
                <div className="border-y border-slate-800 bg-[#16161a]">
                    <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {v: '45 KM', l: 'Autonomía Max'},
                            {v: '800 W', l: 'Motor Peak Power'},
                            {v: '12 KG', l: 'Peso Carbono'},
                            {v: 'IP54', l: 'Resistencia a Lluvia'}
                        ].map((b, i) => (
                            <div key={i} className="flex flex-col text-center justify-center p-4">
                                <span className="text-3xl font-black text-slate-200 mb-1 italic">{b.v}</span>
                                <span className="text-[10px] text-red-500 uppercase tracking-widest font-black">{b.l}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 5. EXPERT ACCORDIONS (Mechanics) */}
                <div className="max-w-4xl mx-auto px-6 py-24">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-1 bg-red-600 skew-x-[-20deg]"></div>
                        <h2 className="text-2xl text-white font-black uppercase tracking-widest italic">Ingeniería Vial</h2>
                    </div>
                    <p className="text-slate-500 font-medium max-w-xl mb-12">Detalles que marcan la diferencia entre un juguete plástico y un vehículo real.</p>
                    
                    <div className="space-y-3">
                        {[
                            { t: 'Neumáticos Neumáticos 10"', a: 'Mientras la competencia usa ruedas macizas que transmiten cada golpe de la calle a tus rodillas, este scooter incluye aire. Absorbe baches y empedrados entregando un viaje silencioso y suave como ir sobre aceite.' },
                            { t: 'Doble Frenado Regenerativo', a: 'Freno de disco trasero hiperventilado y E-ABS delantero. Al presionar la palanca izquierda, no solo te detienes en seco, sino que la inercia recarga cinéticamente un leve porcentaje de la batería.' },
                            { t: 'Pliegue de Un Toque (One-Click)', a: 'El mástil estructural se detiene y engancha al guardabarros trasero en 3 segundos exactos. Llévalo en el tren o apílalo en la cajuela de tu auto sedán sin sudar grasa.' }
                        ].map((ac, i) => (
                            <div key={i} className="bg-[#121215] border border-slate-800 group hover:border-red-600/50 transition-colors">
                                <button className="w-full px-6 py-6 flex justify-between items-center text-left" onClick={() => setFaqOpen(faqOpen===i?null:i)}>
                                    <span className="text-white font-bold uppercase tracking-wider text-sm">{ac.t}</span>
                                    <div className={`w-6 h-6 flex items-center justify-center text-red-500 text-lg transition-transform ${faqOpen===i?'rotate-90':''}`}>»</div>
                                </button>
                                <AnimatePresence>
                                    {faqOpen === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 pb-6 text-slate-400 font-medium leading-relaxed text-sm border-t border-slate-800 pt-4">
                                            {ac.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 6. ENDLESS MARQUEE (Red neon strip) */}
                <div className="w-[100vw] overflow-hidden py-3 bg-red-600 border-y-2 border-red-700 flex transform relative left-[50%] -translate-x-[50%] shadow-[0_0_50px_rgba(239,68,68,0.3)]">
                    <div className="flex whitespace-nowrap font-black text-2xl text-black uppercase tracking-tighter italic">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="flex items-center gap-12 px-6">
                                <span>SIN TRÁFICO</span>
                                <span>///</span>
                                <span>LIBERTAD URBANA</span>
                                <span>///</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 7. WHY TO USE / BENEFITS */}
                <div className="max-w-7xl mx-auto px-6 py-32 border-b border-slate-900">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        <div className="order-2 lg:order-1 relative">
                            {/* Abstract Map UI */}
                            <div className="aspect-square w-full bg-[#16161a] border border-slate-800 flex items-center justify-center p-8 relative overflow-hidden">
                                <div className="absolute inset-0 opacity-10 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/e0/OpenStreetMap_routing_example.png')] bg-cover bg-center mix-blend-overlay filter grayscale invert"></div>
                                <div className="relative z-10 bg-[#0d0d0f]/90 backdrop-blur border border-red-900 p-8 shadow-2xl w-[90%]">
                                    <div className="flex justify-between items-center mb-6">
                                        <span className="text-red-500 font-bold uppercase text-[10px] tracking-widest">Navegación Bluetooth</span>
                                        <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                                    </div>
                                    <h3 className="text-2xl font-black text-white italic tracking-tight mb-2">Conéctalo al Teléfono</h3>
                                    <p className="text-slate-400 font-medium text-sm leading-relaxed">Observa los kilómetros restantes, activa alarmas anti-robo o usa el modo bloqueo "parking" a través de la interfaz oficial.</p>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2">
                            <h2 className="text-5xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-8">El fin del <br/><span className="text-red-500">transporte lento.</span></h2>
                            <p className="text-slate-400 font-medium text-lg leading-relaxed mb-10">Multiplica el tiempo que tienes libre. Viajar a la oficina, gimnasio o facultad de noche ya no requerirá estacionamiento privado, encender un motor de combustión pesada ni quemar tus nervios mirando al vehículo de enfrente.</p>
                            
                            <ul className="space-y-6">
                                {[
                                    { t: 'Display Dash Integrado', d: 'Panel LED ultrabrillante que arroja velocidad digital, % batería y marchas (Eco, Normal, Sport) visibles a pleno sol del mediodía.' },
                                    { t: 'Foco Halo Lumínico', d: 'Luz LED frontal de 2.5W capaz de revelar baches agresivos en asfalto a 15 metros a la redonda en las avenidas muy oscuras nocturnas.' }
                                ].map((b, i) => (
                                    <li key={i} className="flex gap-5">
                                        <div className="w-10 h-10 bg-[#16161a] border border-slate-800 text-slate-300 font-black italic flex items-center justify-center shrink-0">0{i+1}</div>
                                        <div>
                                            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-2 mt-1">{b.t}</h4>
                                            <p className="text-slate-400 font-medium text-sm leading-relaxed">{b.d}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* 10. COMPARISON TABLE */}
                <div className="max-w-4xl mx-auto px-6 py-24">
                    <h2 className="text-3xl text-center font-black text-white uppercase tracking-widest italic mb-12">Autopsia de Rendimiento</h2>
                    <div className="border border-slate-800 bg-[#16161a] p-2">
                        <div className="grid grid-cols-3 bg-[#0d0d0f] text-[10px] uppercase font-black text-slate-500 tracking-[0.2em] border border-slate-800">
                            <div className="p-5 md:p-6">Feature</div>
                            <div className="p-5 md:p-6 text-white border-x border-slate-800 text-center bg-red-600/10">Este E-Scooter</div>
                            <div className="p-5 md:p-6 text-center">Alternativas Comunes</div>
                        </div>
                        {[
                            { k: 'Materialidad', u: 'Aluminio Aero Grado 6', t: 'Metales pesados de hierro puro' },
                            { k: 'Pendiente y Trepada', u: '20% inclinación sin sudar', t: 'Se frenan en las lomas de cerros' },
                            { k: 'Carga de Riesgo', u: 'C.O.D (Pagas cuando te llevan la unidad al lado tuyo)', t: 'Tarjetas en pasarelas dudosas y sin soporte directo' }
                        ].map((r, i) => (
                            <div key={i} className="grid grid-cols-3 border-x border-b border-slate-800 font-medium text-xs bg-[#0d0d0f] hover:bg-slate-900 transition-colors">
                                <div className="p-5 md:p-6 text-slate-400">{r.k}</div>
                                <div className="p-5 md:p-6 font-bold text-red-100 bg-red-600/5 text-center">{r.u}</div>
                                <div className="p-5 md:p-6 text-slate-600 text-center line-through">{r.t}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 11. RISK REVERSAL WARRANTY */}
                <div className="py-24 bg-[#16161a] border-y border-slate-800 text-center px-6">
                    <div className="max-w-3xl mx-auto">
                        <div className="inline-block px-4 py-1 border-2 border-red-600 text-red-500 font-black uppercase tracking-widest text-sm mb-6 skew-x-[-10deg]">
                            <span className="skew-x-[10deg] block">Operación Táctica C.O.D.</span>
                        </div>
                        <h3 className="text-2xl text-white font-black mb-6 uppercase tracking-tighter italic">Adquisición Blindada.</h3>
                        <p className="text-slate-400 font-medium leading-relaxed max-w-2xl mx-auto text-sm">
                            Este es un vehículo, no un simple producto. Protegeremos su transacción. Un conductor fletará la caja gigantesca del patinete directo a la localización corporativa o residencial que dictes. Bajarás a inspeccionarla con el empleado de logística y en ese segundo pagas en moneda circulante/transfer. Así anulamos 100% las estafas virtuales de este nicho.
                        </p>
                    </div>
                </div>

                {/* 13. FAQ */}
                <div className="max-w-3xl mx-auto px-6 py-24">
                    <h2 className="text-2xl text-slate-50 font-black uppercase tracking-widest italic mb-12 border-l-4 border-red-600 pl-4">Radar Técnico (FAQ)</h2>
                    <div className="space-y-4">
                        {[
                            {q: '¿Puede un adulto algo pesado montar su plataforma sin romperlo?', a: 'Absolutamente. El diseño de chasis estructural reforzado admite portabilidad de pilotos hasta 120 kilogramos (264 lbs). El motor apenas lo notará al llanear.'},
                            {q: '¿Cuánto cuesta "la carga" en electricidad o nafta?', a: 'Electricidad insignificante. Recargar su bloque de litio de 0 a 100% de noche cuesta el equivalente promedio a dejar prendido una bombilla LED potente por un rato. Ahorrarás miles en buses o gasolineras.'},
                            {q: 'Al pedir usando modo Pago al Flete, ¿es necesario algún anticipo de seña?', a: 'CERO anticipos. Usas el recuadro de abajo. Genera una boleta. Si el stock lo permite, te llevamos el transporte esa misma semana. Pagas recíen cuando la bestia asoma en tu puerta y el chofer lo desciende.'}
                        ].map((f, i) => (
                            <div key={i} className="bg-[#121215] border border-slate-800">
                                <button onClick={() => setFaqOpen(faqOpen===i?null:i)} className="w-full p-6 text-left flex justify-between items-center text-white font-bold text-[11px] uppercase tracking-widest">
                                    {f.q}
                                    <span className="text-red-500 text-lg font-black">{faqOpen===i?'−':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {faqOpen === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 pb-6 text-slate-400 font-medium text-sm leading-relaxed border-t border-slate-800 pt-4">
                                            {f.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 14. EXPANDED REVIEWS */}
                <div className="py-24 bg-[#16161a] border-t border-slate-800">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center font-black uppercase text-[10px] text-red-500 tracking-widest mb-10">Registros de Choferes</div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { r: "Llegó a mi puerta, vi el logo en la caja y le transfeí al delivery con mi app de banco, todo genial. El trasto corre impresionante, voy por la ciclovía pasándole al tráfico.", n: "Fabricio G.", t: "Cliente C.O.D." },
                                { r: "Dejó de mortificarme ir a la facultad. Enchufo en clase y vuelvo lleno. La luz roja de atrás alinea súper fuerte con las luces de ciudad de noche.", n: "Camila V.", t: "Estudiante de Arq." },
                                { r: "Tremendo torque, pensé que iba a arrancar suave en la rampa y acelera con agresividad tipo modo Sport. Gran atención el hecho de no exigir prepago web, me dio paz.", n: "Agustín P.", t: "Freelance" }
                            ].map((rev, i) => (
                                <div key={i} className="p-8 bg-[#0d0d0f] border border-slate-800 relative shadow-lg">
                                    <div className="text-red-500 font-serif text-5xl absolute top-4 left-4 opacity-20">"</div>
                                    <p className="text-slate-300 font-medium text-sm mb-6 leading-relaxed relative z-10 pt-4 italic">"{rev.r}"</p>
                                    <div className="flex justify-between items-center border-t border-slate-800 pt-4">
                                        <div>
                                            <div className="text-white font-black text-[10px] uppercase tracking-widest">{rev.n}</div>
                                            <div className="text-slate-500 uppercase text-[9px] font-bold mt-1 tracking-widest">{rev.t}</div>
                                        </div>
                                        <div className="text-red-500">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 13l4 4L19 7"/></svg>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 15. CHECKOUT (Asphalt Dispatch) */}
                <div id="checkout-mobility" className="py-24 md:py-32 relative bg-[#121215]">
                    <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
                        <div className="lg:col-span-6 relative order-2 lg:order-1">
                            <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-2 italic">Apropiación Física</h3>
                            <p className="text-slate-500 text-sm font-medium mb-10">Se mandará un operador para que liberes la máquina C.O.D.</p>
                            
                            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                                <div>
                                    <input type="text" className="w-full bg-[#16161a] border border-slate-800 text-white font-bold text-sm p-5 focus:border-red-500 outline-none transition-colors uppercase placeholder:text-slate-600" placeholder="> Nombre Piloto Registrado" />
                                </div>
                                <div>
                                    <input type="tel" className="w-full bg-[#16161a] border border-slate-800 text-white font-bold text-sm p-5 focus:border-red-500 outline-none transition-colors uppercase placeholder:text-slate-600" placeholder="> Contacto Móvil (WhatsApp Activo)" />
                                </div>
                                <div>
                                    <textarea rows={2} className="w-full bg-[#16161a] border border-slate-800 text-white font-bold text-sm p-5 focus:border-red-500 outline-none transition-colors uppercase placeholder:text-slate-600 resize-none" placeholder="> Puesto de Entrega (Referencia/Calle)"></textarea>
                                </div>
                                <div className="pt-2">
                                    <button className="w-full bg-red-600 hover:bg-red-500 text-white py-6 font-black uppercase tracking-[0.2em] text-sm italic transition-colors shadow-[5px_5px_0_theme(colors.red.900)] active:shadow-none active:translate-x-[5px] active:translate-y-[5px]">
                                        Despachar a Garaje Personal
                                    </button>
                                </div>
                            </form>
                        </div>
                        
                        <div className="lg:col-span-6 order-1 lg:order-2">
                            <h2 className="text-5xl lg:text-5xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-8">El que madruga <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">no se atasca.</span></h2>
                            <p className="text-slate-400 font-medium text-lg mb-10 leading-relaxed border-l-4 border-red-600 pl-6">Acaba con las multas y estrés. Pon tú mismo los términos. Llevaremos este blindado de asfalto directo a ti para que lo pagues una vez el caucho estrene contacto con tu piso. Reclama tu libertad de ruta hoy.</p>
                            
                            <div className="text-5xl font-black text-red-50 py-4 italic tracking-tighter">{fmtPrice(product.price)}</div>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
};

export default PdpUrbanScooter;
