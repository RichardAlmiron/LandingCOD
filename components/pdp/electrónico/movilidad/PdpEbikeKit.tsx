'use client';
import React, { useState } from 'react';
import { StoreData, Product } from '@/lib/types';
import EnhancedProductGallery from '@/components/pdp/EnhancedProductGallery';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { data: StoreData; product: Product; }

const PdpEbikeKit: React.FC<Props> = ({ data, product }) => {
    const [openSpecAcc, setOpenSpecAcc] = useState<number | null>(0);
    const [faqOpen, setFaqOpen] = useState<number | null>(null);
    const ai = product.aiContent;
    const fmtPrice = (n: number) => { const s = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); return `Gs. ${s}`; };
    
    // Aesthetic Palette: Urban Mobility / Eco-Tech
    const bg = '#171717'; // Neutral 900
    const textMain = '#fafafa'; // Neutral 50
    const accentGreen = '#10b981'; // Emerald 500
    const accentDark = '#0a0a0a'; // Neutral 950

    return (
        <div style={{ background: bg, color: textMain, fontFamily: "'Inter', sans-serif" }} className="overflow-x-hidden selection:bg-emerald-500/30 selection:text-emerald-200 antialiased">
            
            {/* 0. AMBIENT GRID */}
            <div className="absolute top-0 right-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0"></div>
            <div className="fixed top-[-10%] right-[-10%] w-[600px] h-[600px] bg-emerald-500/10 blur-[150px] rounded-full pointer-events-none z-0"></div>

            {/* 1. TOP NAV (Urban Engineering) */}
            <header className="sticky top-0 z-50 bg-neutral-900/80 backdrop-blur-2xl border-b border-neutral-800">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-emerald-500 rounded-sm flex items-center justify-center transform -skew-x-12">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#171717" strokeWidth="2.5"><path d="M5 18 19 6M19 18 5 6"/></svg>
                        </div>
                        <span className="font-black text-2xl tracking-tighter text-white uppercase italic">
                            E-DRIVE<span className="text-emerald-500">KINETICS</span>
                        </span>
                    </div>
                </div>
            </header>

            <main className="relative z-10 w-full overflow-hidden">
                {/* 2. BREADCRUMBS & LOGISTICS */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6 pb-2">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="text-[10px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-4 py-2 border border-emerald-500/20 inline-flex items-center gap-3 transform -skew-x-12">
                            <span className="w-1.5 h-1.5 bg-emerald-400 animate-ping"></span>
                            MOVILIDAD URBANA / KITS CONVERSIÓN
                        </div>
                        <div className="inline-flex items-center gap-2 text-[10px] font-bold text-neutral-400 uppercase tracking-widest bg-neutral-800 px-4 py-2 border border-neutral-700 rounded-sm">
                            ENSAMBLE C.O.D. LOCAL
                        </div>
                    </div>
                </div>

                {/* 3. HERO SECTION (INDUSTRIAL VELOCITY) */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 lg:py-16 relative">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
                        <div className="flex flex-col relative z-20 lg:col-span-5">
                            <div className="flex items-center gap-2 mb-6">
                                <span className="flex items-center bg-white text-black px-3 py-1 font-black text-[10px] uppercase tracking-widest transform -skew-x-12">
                                    Velocidad Eléctrica Instantánea
                                </span>
                            </div>
                            
                            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-[0.95] mb-6 uppercase italic">
                                {ai?.enhancedTitle || "Motor E-Bike Hub"}
                            </h1>
                            <p className="text-base md:text-lg font-medium text-neutral-400 mb-10 leading-snug">
                                {ai?.enhancedDescription || "Cero combustible. Instala esta rueda motriz eléctrica trasera en menos de 30 minutos y transforma tu bicicleta vieja en un misil urbano capaz de alcanzar enormes velocidades sin pedalear."}
                            </p>

                            <div className="bg-neutral-800/80 backdrop-blur-md p-8 border-l-4 border-emerald-500 relative shadow-2xl">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><circle cx="12" cy="12" r="10"/><path d="M12 2v20M2 12h20"/></svg>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-end gap-6 mb-8 relative z-10">
                                    <span className="text-5xl font-black text-emerald-400 tracking-tighter italic">{fmtPrice(product.price)}</span>
                                    {product.originalPrice && <span className="text-xl font-bold text-neutral-600 line-through pb-1">{fmtPrice(product.originalPrice)}</span>}
                                </div>
                                <button onClick={() => document.getElementById('checkout-action')?.scrollIntoView({ behavior: 'smooth' })} className="w-full h-[64px] bg-emerald-500 text-neutral-950 font-black uppercase tracking-widest text-[13px] hover:bg-white transition-all duration-300 flex items-center justify-center gap-3 transform -skew-x-6 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                                    Orden de Distribución
                                </button>
                                <div className="flex items-center justify-center gap-2 mt-4 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> Entregado presencialmente a domicilio
                                </div>
                            </div>
                        </div>

                        <div className="relative z-10 lg:col-span-7 flex items-center justify-center p-2">
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="w-full max-w-[600px] aspect-square relative bg-neutral-900 border border-neutral-800 flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.1)]">
                                <EnhancedProductGallery product={product} accentColor={accentGreen} />
                                
                                {/* Decorational Elements */}
                                <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-md border border-neutral-800 px-4 py-2 flex items-center gap-3">
                                    <div className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Output</div>
                                    <div className="text-white font-black italic">1000W BLDC</div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* 4. TRUST BADGES TECHNICAL */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 pb-16">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            {v: '40 KM/H', l: 'Velocidad Punta'},
                            {v: 'Li-Ion', l: 'Batería 36V/48V'},
                            {v: 'PAS', l: 'Sensor de Pedaleo'},
                            {v: 'LCD', l: 'Pantalla Métrica'}
                        ].map((b, i) => (
                            <div key={i} className="flex flex-col items-center justify-center p-6 bg-neutral-800/50 border border-neutral-800 backdrop-blur-sm transform -skew-x-6">
                                <span className="text-white font-black text-2xl tracking-tighter mb-1 italic">{b.v}</span>
                                <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest">{b.l}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 5. EXPERT ACCORDIONS */}
                <div className="max-w-4xl mx-auto px-4 md:px-8 py-20">
                    <div className="mb-10 text-center">
                        <h2 className="text-4xl font-black tracking-tighter text-white uppercase italic">Fuerza Bruta <span className="text-emerald-500">Ecológica.</span></h2>
                    </div>
                    <div className="bg-neutral-900 border border-neutral-800">
                        {[
                            { t: 'Motor Trasero Direct Drive', a: 'Conducir una bicicleta eléctrica no es como andar en moto. El motor se sitúa en la masa trasera. Es inaudible y su torque te empuja hacia adelante suave y violentamente, incluso si dejas de pedalear al 100% en subidas empinadas.' },
                            { t: 'LCD Dash de Navegación', a: 'Instalado directo sobre tu manillar. Controla los 5 niveles de asistencia, verifica tu velocidad actual, el odómetro de viaje y la carga restante de tu batería con números blancos súper brillantes aptos para luz solar directa.' },
                            { t: 'Mantenimiento Cero', a: 'A diferencia de los motores de combustión de motonetas, un BLDC (Motor sin escobillas) no requiere aceite, filtros, ni engranajes complejos. Su vida útil supera los 15 años usando un costo eléctrico casi imperceptible.' }
                        ].map((ac, i) => (
                            <div key={i} className="border-b border-neutral-800 last:border-b-0">
                                <button onClick={() => setOpenSpecAcc(openSpecAcc===i?null:i)} className="w-full text-left p-6 md:p-8 flex items-center justify-between text-sm font-black uppercase tracking-widest text-neutral-300 hover:text-white transition-all bg-neutral-900 hover:bg-neutral-800">
                                    <div className="flex items-center gap-4">
                                        <div className="w-8 h-8 rounded-sm bg-neutral-800 border border-neutral-700 text-emerald-500 font-bold flex items-center justify-center transform -skew-x-12">0{i+1}</div>
                                        {ac.t}
                                    </div>
                                    <span className="text-emerald-500 text-xl font-light">{openSpecAcc===i?'-':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {openSpecAcc === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 md:px-8 pb-8 pl-[4.5rem] text-sm font-medium text-neutral-400 leading-relaxed bg-neutral-900">
                                            {ac.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 6. ENDLESS MARQUEE */}
                <div className="w-full overflow-hidden py-4 bg-emerald-500 flex transform -skew-x-6 border-y border-emerald-400 shadow-[0_15px_30px_rgba(16,185,129,0.2)] my-10">
                    <div className="flex whitespace-nowrap animate-marquee font-black uppercase text-2xl tracking-tighter text-black italic">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="flex items-center gap-6 px-6">
                                <span>EVITA EL TRÁFICO</span><span>//</span>
                                <span>SIN SEGURO NI MATRICULA</span><span>//</span>
                                <span>ASISTENCIA A PEDAL</span><span>//</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 7. BENEFITS CON IMAGENES DE RELLENO UNSPLASH Y BICI URBAN */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-32 border-b border-neutral-900">
                    <div className="text-center mb-20 relative">
                        <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-6 uppercase italic">Tu Nueva <span className="text-emerald-400">Ruta Diaria.</span></h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { img: 'https://images.unsplash.com/photo-1528629297340-d1d466945dc5?q=80&w=1000&auto=format&fit=crop', t: 'Acelerador de Gatillo', d: 'Incluye un acelerador de pulgar independiente paralelo a tu manubrio. Usalo para arranques rápidos en semáforos sin pisar el pedal.' },
                            { img: 'https://images.unsplash.com/photo-1574510009653-ba1a3f6db447?q=80&w=1000&auto=format&fit=crop', t: 'Frenado Regenerativo', d: 'Los sensores e-brake detectan cuando presionas los frenos. Automáticamente cortan la potencia del motor e inyectan un ínfimo pulso de carga atrás.' },
                            { img: 'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?q=80&w=1000&auto=format&fit=crop', t: 'Batería Desmontable', d: 'Ancla la batería al lugar del botellín térmico. Posee llave anti-robo. Quitale el seguro cuando llegues a destino y cargala sola en tu departamento.' }
                        ].map((b, i) => (
                            <div key={i} className="bg-neutral-900 border border-neutral-800 relative group overflow-hidden">
                                <div className="h-64 w-full relative overflow-hidden">
                                     <img src={b.img} alt={b.t} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-60 group-hover:opacity-100 group-hover:scale-105" />
                                     <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent"></div>
                                </div>
                                <div className="p-8 relative z-10 -mt-10">
                                    <h3 className="text-xl font-black text-white mb-3 uppercase tracking-tight italic">{b.t}</h3>
                                    <p className="text-sm font-medium text-neutral-400 leading-relaxed">{b.d}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 8. COMO USAR - PASOS MECÁNICOS */}
                <div className="py-24 bg-neutral-950">
                    <div className="max-w-7xl mx-auto px-4 md:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-4xl font-black tracking-tighter text-white mb-8 uppercase italic">Procedimiento <br/><span className="text-emerald-500">Mecánico de Media Hora.</span></h2>
                                <p className="text-neutral-400 font-medium mb-12 leading-relaxed text-lg">No eres mecánico, y no hace falta que lo seas. Todo este kit viene preconectado con plug-and-play resistentes al agua.</p>
                                
                                <div className="space-y-4">
                                    {[
                                        { t: 'Cambio de Rueda', d: 'Quita tu rueda trasera tradicional y coloca la nueva Llanta-Motor que viene ya enrollada y con cámara incluida en tu calibre preferido (26", 27.5", 29").' },
                                        { t: 'Pantalla y Gatillo', d: 'Enrosca y fija el mando y la pantalla LCD en tu manillar frontal izquierdo.' },
                                        { t: 'Sensor Magnético', d: 'Conecta el imán al eje de tu pedalera para interpretar cuándo y con qué fuerza estás pedaleando para inyectar asistencia.' }
                                    ].map((s, i) => (
                                        <div key={i} className="flex gap-4 items-start bg-neutral-900 p-6 border-l-4 border-transparent hover:border-emerald-500 transition-colors">
                                            <div className="text-emerald-500 font-black text-xl italic uppercase">0{i+1}_</div>
                                            <div>
                                                <h4 className="text-sm font-black text-white mb-2 uppercase tracking-wide">{s.t}</h4>
                                                <p className="text-sm text-neutral-400 leading-relaxed">{s.d}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="w-full relative aspect-[4/3] bg-neutral-900 border border-neutral-800 p-4 shadow-2xl">
                                <div className="w-full h-full relative overflow-hidden bg-black">
                                    <img src="https://images.unsplash.com/photo-1579227571345-06ec1de14bc5?q=80&w=1000&auto=format&fit=crop" alt="E-bike Engineering" className="w-full h-full object-cover opacity-50" />
                                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#0a0a0a_100%)]"></div>
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-500/50 w-32 h-32 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                                        <div className="font-black text-white text-3xl font-mono">1000W</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 10. COMPARISON TABLE */}
                <div className="max-w-5xl mx-auto px-4 md:px-8 py-32">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black tracking-tighter text-white uppercase italic">Ingeniería vs Combustión.</h2>
                    </div>
                    
                    <div className="bg-neutral-900 border border-neutral-800">
                        <div className="grid grid-cols-3 bg-neutral-950 border-b border-neutral-800 text-[10px] font-black uppercase tracking-widest text-neutral-500">
                            <div className="p-6 md:p-8">Métrica Urbana</div>
                            <div className="p-6 md:p-8 text-center text-emerald-400 border-x border-neutral-800">E-BIKE KIT KINETICS</div>
                            <div className="p-6 md:p-8 text-center">Scooter / Moto Gasolina</div>
                        </div>
                        {[
                            { k: 'Gasto por Carga', u: '$0.02 USD (Electricidad)', t: '$25 USD (Tanque de Gasolina)' },
                            { k: 'Trámites Legales', u: 'Llegas, instalas, la usas.', t: 'Matrícula, Seguros Caros, Licencia de Conducir.' },
                            { k: 'Estacionamiento', u: 'Dormitorio, Sala o Bicicletero Gratis.', t: 'Pagar Ticket parking/Cuidado ante robos.' },
                            { k: 'Frecuencia Taller', u: 'Parches o frenos básicos (baratos).', t: 'Aceites, Carburación, Motor fundido.' }
                        ].map((r, i) => (
                            <div key={i} className="grid grid-cols-3 border-b border-neutral-800 last:border-b-0 text-sm">
                                <div className="p-6 md:p-8 font-black text-neutral-300 flex items-center uppercase">{r.k}</div>
                                <div className="p-6 md:p-8 font-bold text-white text-center flex items-center justify-center border-x border-neutral-800 bg-emerald-500/5">{r.u}</div>
                                <div className="p-6 md:p-8 font-medium text-neutral-600 text-center flex items-center justify-center line-through decoration-red-500/50">{r.t}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 11. RISK REVERSAL WARRANTY */}
                <div className="max-w-5xl mx-auto px-4 md:px-8 py-12">
                    <div className="bg-neutral-900 border-l-4 border-emerald-500 p-10 md:p-14 text-white md:flex items-center gap-10 shadow-2xl relative overflow-hidden">
                        <div className="absolute right-[-10%] top-[-50%] w-[500px] h-[500px] bg-emerald-500/5 blur-[100px] pointer-events-none rounded-full"></div>
                        <div className="w-20 h-20 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-black italic text-4xl rounded-none shrink-0 flex items-center justify-center mb-8 md:mb-0 transform -skew-x-6 relative z-10">
                            W_
                        </div>
                        <div className="relative z-10 w-full">
                            <h3 className="text-3xl font-black tracking-tighter uppercase mb-2">Logística Táctica Offline.</h3>
                            <p className="font-bold text-neutral-400 leading-relaxed text-sm md:text-base max-w-2xl">
                                Comprar kits de importación te condena a meses de espera en aduanas. Todo nuestro stock está dentro del país y se despliega con logística humana prioritaria. No necesitas ingresar tarjetas ni pagos por internet. Tú envías el formulario desde esta terminal, y un mensajero trae el kit en caja a la cochera de tu domicilio. Inspeccionas y le pagas físicamente. 
                            </p>
                        </div>
                    </div>
                </div>

                {/* 13. FAQ */}
                <div className="max-w-4xl mx-auto px-4 md:px-8 py-24 mb-16">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black tracking-tighter text-white uppercase italic">Datos Técnicos Operacionales.</h2>
                    </div>
                    <div className="space-y-2">
                        {[
                            {q: '¿Puede esta red soportar la lluvia y cruzar charcos?', a: 'Sí. Todos los conectores a la batería, display y motor cuentan con certificación IP65 contra agua y polvo. Es totalmente seguro conducirla debajo de un monzón prolongado, solo se prohíbe el ahogamiento submarino de la motriz.'},
                            {q: '¿Mi freno convencional sigue funcionando?', a: 'Sí, tu sistema de freno de zapata V-Brake o disco permanece en el marco trasero. Solo te suministramos manetas de freno adicionales con sensor E-Brake hidráulico, te conectas si prefieres cortar asistencia bruscamente al tocar la manivela.'},
                            {q: 'No sé destornillar ¿Me enviarán un manual fácil?', a: 'Completamente detallado. Más de un manual, te enviaremos acceso encriptado a un código QR con video en 4K donde te explicaremos paso a paso el desenroscado en 30 minutos sin frustraciones mecánicas.'}
                        ].map((f, i) => (
                            <div key={i} className="bg-neutral-900 border border-neutral-800 hover:border-emerald-500 transition-colors">
                                <button onClick={() => setFaqOpen(faqOpen===i?null:i)} className="w-full text-left p-6 md:p-8 flex items-center justify-between font-black text-sm uppercase text-white hover:bg-neutral-800">
                                    <span className="pr-4">{f.q}</span>
                                    <span className="text-emerald-500 font-bold text-2xl leading-none">{faqOpen===i?'-':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {faqOpen === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 md:px-8 pb-8 text-sm font-medium text-neutral-400 leading-relaxed pt-0">
                                            {f.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 14. EXPANDED REVIEWS */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-24 border-t border-neutral-800">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black tracking-tighter text-white uppercase italic mb-6">Conductores Certificados.</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { r: "Estaba gastando unos $150 al mes en combustible. Vendí la moto, enchufé esto a mi Mountain Bike rota. Llego al trabajo volando a 38 km/h en vía directa y me gasto céntimos diarios conectándola mi enchufe PC. La mejor decisión económica que tomé.", n: "Felipe O.", t: "Trabajador Urbano", i: "https://images.unsplash.com/photo-1558980394-0a37c6964177?q=80&w=200&auto=format&fit=crop" },
                            { r: "Instalé uno a la bici a mi hijo para que llegue a la universidad rápida y seguro. Pude pagar el kit allí adelante del chófer al momento de la entrega en mi residencia, sin estrés de dar pasarelas bancarias por la web.", n: "Carolina F.", t: "Delivery C.O.D", i: "https://images.unsplash.com/photo-1481268388488-b2deaf80eeca?q=80&w=200&auto=format&fit=crop" },
                            { r: "Las cuestas pesadas solían ser tediosas. Con el motor a máximo nivel pedalear en subidas pronunciadas se vuelve tan suave igualar circular en total plano llano. Un invento de otro mundo.", n: "Roberto G.", t: "Deportista Híbrido", i: "https://images.unsplash.com/photo-1541881515284-82dd8cb18751?q=80&w=200&auto=format&fit=crop" }
                        ].map((rev, i) => (
                            <div key={i} className="bg-neutral-900 p-8 border border-neutral-800 hover:border-emerald-500 transition-colors duration-300 group">
                                <img src={rev.i} alt={rev.n} className="w-16 h-16 object-cover border-2 border-emerald-500/20 mb-6 grayscale group-hover:grayscale-0 transition-all"/>
                                <p className="text-sm font-medium text-neutral-400 leading-relaxed mb-8 italic">"{rev.r}"</p>
                                <div className="flex items-center justify-between border-t border-neutral-800 pt-6">
                                    <div className="text-xs font-black text-white uppercase tracking-wide">{rev.n}</div>
                                    <div className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">{rev.t}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 15. CHECKOUT */}
                <div id="checkout-action" className="py-24 md:py-32 bg-black relative border-t-[6px] border-emerald-500 overflow-hidden">
                    <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24 items-center">
                        <div className="md:col-span-6 relative text-center md:text-left">
                            <h3 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 text-white uppercase italic leading-[0.9]">Carga <br/><span className="text-emerald-500 px-1 border-x border-emerald-500 mr-2 bg-emerald-500/10">El</span>Kit.</h3>
                            <p className="text-sm font-medium text-neutral-400 mb-10 leading-relaxed max-w-sm mx-auto md:mx-0">Pasa de un chasis mecánico a una moto eléctrica. Pidéla aquí, págas al operador contra entrega en efectivo.</p>
                            
                            <div className="text-6xl md:text-8xl font-black text-white tracking-tighter italic">{fmtPrice(product.price)}</div>
                        </div>
                        
                        <div className="md:col-span-6 w-full border border-neutral-800 bg-neutral-900 p-8 md:p-12 shadow-2xl relative group">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-transparent"></div>
                            <form onSubmit={e=>e.preventDefault()}>
                                <div className="space-y-6">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">Placas del Usuario</label>
                                        <input type="text" className="w-full bg-neutral-950 border border-neutral-800 focus:border-emerald-500 text-white font-bold text-sm px-6 py-4 outline-none transition-all rounded-none" placeholder="Nombre completo Legal" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">Nexo Telecom</label>
                                        <input type="tel" className="w-full bg-neutral-950 border border-neutral-800 focus:border-emerald-500 text-white font-bold text-sm px-6 py-4 outline-none transition-all rounded-none" placeholder="Número de Smartphone" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">Garage Geográfico</label>
                                        <textarea rows={3} className="w-full bg-neutral-950 border border-neutral-800 focus:border-emerald-500 text-white font-bold text-sm px-6 py-4 outline-none transition-all resize-none rounded-none" placeholder="Dirección residencia exacta (Ciudad / Calle / Puerta)" />
                                    </div>
                                    <div className="pt-4">
                                        <button className="w-full h-[64px] bg-emerald-500 text-black font-black uppercase tracking-widest text-sm hover:bg-white transition-all transform -skew-x-6">
                                            Confirmar Enrutamiento (C.O.D)
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </main>

            <style dangerouslySetInnerHTML={{__html: `
                @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
                .animate-marquee { animation: marquee 16s linear infinite; }
            `}} />
        </div>
    );
};

export default PdpEbikeKit;
