'use client';
import React, { useState } from 'react';
import { StoreData, Product } from '@/lib/types';
import EnhancedProductGallery from '@/components/pdp/EnhancedProductGallery';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { data: StoreData; product: Product; }

const PdpPowerStation: React.FC<Props> = ({ data, product }) => {
    const [faqOpen, setFaqOpen] = useState<number | null>(null);
    const ai = product.aiContent;
    const fmtPrice = (n: number) => { const s = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); return `Gs. ${s}`; };

    // Estética "Industrial Caution": Negro asfalto mate, amarillo Caterpillar industrial, tipografía brutal.
    const bg = '#111111'; 
    const textMain = '#a3a3a3'; // Neutral 400
    const accent = '#f59e0b'; // Amber 500

    return (
        <div style={{ background: bg, color: textMain }} className="font-mono antialiased overflow-x-hidden selection:bg-amber-500 selection:text-black">
            
            {/* Caution Ambient Striping */}
            <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 10px, #f59e0b 10px, #f59e0b 20px)' }}></div>

            {/* 1. TOP NAV (Warning Header) */}
            <header className="sticky top-0 z-50 bg-[#111] border-b-4 border-amber-500">
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="text-xl font-black tracking-tight text-white uppercase flex items-center gap-2">
                        <svg className="w-6 h-6 text-amber-500" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                        VOLT<span className="text-amber-500">CORE</span>
                    </div>
                    <div className="text-[10px] font-black text-black bg-amber-500 px-3 py-1 uppercase tracking-widest">
                        High Voltage
                    </div>
                </div>
            </header>

            <main className="relative z-10 w-full overflow-hidden">
                {/* 2. BREADCRUMBS & LOGISTICS */}
                <div className="max-w-7xl mx-auto px-4 pt-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800 pb-4">
                        <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-neutral-500">
                            Equipamiento Base / Generación / <span className="text-amber-500">Central Litio 1000W</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-500 font-bold bg-[#1a1a1a] px-4 py-2 border border-neutral-800">
                            <span className="w-2 h-2 bg-amber-500 animate-pulse"></span>
                            Unidades C.O.D. en Flota
                        </div>
                    </div>
                </div>

                {/* 3. HERO (INDUSTRIAL WORKSHOP) */}
                <div className="max-w-7xl mx-auto px-4 py-16 lg:py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="relative z-20">
                            <div className="inline-block bg-neutral-900 border border-amber-500/30 text-amber-500 font-bold text-[10px] px-3 py-1 uppercase tracking-widest mb-6">
                                Batería LFP (LiFePO4)
                            </div>
                            <h1 className="text-5xl lg:text-7xl font-black text-white mb-6 uppercase tracking-tighter leading-[0.9] drop-shadow-lg">
                                {ai?.enhancedTitle || product.title}
                            </h1>
                            <p className="text-base lg:text-xl text-neutral-400 mb-10 font-bold tracking-tight border-l-4 border-amber-500 pl-6 leading-relaxed">
                                {ai?.enhancedDescription || product.description || 'Apagones masivos o campamentos remotos. Conecta tu refrigerador, router WiFi y dispositivos médicos simultáneamente sin emitir ruido ni gases tóxicos.'}
                            </p>
                            
                            <div className="bg-[#1a1a1a] border-t-8 border-amber-500 p-8 shadow-2xl shadow-amber-500/5 relative">
                                {/* Decorative Warning Label */}
                                <div className="absolute top-4 right-4 bg-amber-500 text-black px-2 py-0.5 text-[8px] font-black uppercase tracking-widest rotate-3">
                                    [PESADA: 12 KG]
                                </div>
                                
                                <div className="text-[10px] text-neutral-500 uppercase font-black tracking-widest mb-3">Asignación de Capital</div>
                                <div className="flex items-end gap-6 mb-8">
                                    <span className="text-5xl font-black text-white tracking-widest">{fmtPrice(product.price)}</span>
                                    {product.originalPrice && <span className="text-lg text-neutral-600 line-through pb-1">{fmtPrice(product.originalPrice)}</span>}
                                </div>
                                <button onClick={() => document.getElementById('checkout-power')?.scrollIntoView({ behavior: 'smooth' })} className="w-full bg-amber-500 hover:bg-amber-400 text-black py-5 text-xl font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-3">
                                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                                    Reclamar Suministro
                                </button>
                                <div className="text-[10px] text-center text-amber-500 mt-4 uppercase tracking-widest font-bold">
                                    Pague en Efectivo al Transportista (C.O.D)
                                </div>
                            </div>
                        </div>

                        <div className="w-full relative flex items-center justify-center p-6 bg-[#0a0a0a] border border-neutral-900 rounded-lg">
                            <div className="absolute inset-0 border-2 border-dashed border-neutral-800 m-4 rounded-lg z-0"></div>
                            <div className="relative z-10 w-full p-4">
                                <EnhancedProductGallery product={product} accentColor={accent} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. TRUST BADGES TECHNICAL (Control Panel) */}
                <div className="bg-[#0a0a0a] border-y border-neutral-800">
                    <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {v: '1000W CA', l: 'Inversor Onda Pura'},
                            {v: 'x10 Puertos', l: 'Carga Simultánea'},
                            {v: '70 Min', l: 'Carga a Pared Ultra Rápida'},
                            {v: '10 Años', l: 'Vida Útil de Batería'}
                        ].map((b, i) => (
                            <div key={i} className="flex flex-col border border-neutral-800 bg-[#111] p-6 text-center shadow-inner relative">
                                <span className="text-3xl font-black text-amber-500 mb-2">{b.v}</span>
                                <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">{b.l}</span>
                                <div className="absolute top-2 left-2 w-1 h-1 bg-neutral-700 rounded-full"></div>
                                <div className="absolute top-2 right-2 w-1 h-1 bg-neutral-700 rounded-full"></div>
                                <div className="absolute bottom-2 left-2 w-1 h-1 bg-neutral-700 rounded-full"></div>
                                <div className="absolute bottom-2 right-2 w-1 h-1 bg-neutral-700 rounded-full"></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 5. EXPERT ACCORDIONS (Operations Manual) */}
                <div className="max-w-4xl mx-auto px-4 py-32">
                    <h2 className="text-3xl font-black text-white uppercase tracking-tight mb-4 text-center">Tolerancia Cero a Apagones</h2>
                    <p className="text-center text-neutral-500 font-bold max-w-xl mx-auto mb-16 uppercase text-xs tracking-widest">Manual de Ingeniería del Inversor Central</p>
                    
                    <div className="space-y-4">
                        {[
                            { t: 'Inversor de Onda Sinusoidal Pura', a: 'No es un generador de combustible barato que freirá tus placas. El flujo de corriente alterna que emite es idéntico a la electricidad de la red de la calle. Seguro para conectar tu Macbook Pro M2 sin temor a microcortes ni sobrecargas.' },
                            { t: 'Química LFP Ultra-Segura', a: 'En lugar del ion-litio clásico inflamable, utiliza Fosfato de Hierro y Litio (LiFePO4). Puedes someter la central a impactos, calor en el baúl del auto y hacerle 3,000 ciclos de descarga dura (10 años de apagones) antes de que la retención caiga al 80%.' },
                            { t: 'Sistema de Alimentación Ininterrumpida (UPS)', a: 'Déjalo enchufado permanentemente entre la pared y tu computadora de escritorio. Si la luz de la calle se corta de súbito por tormentas, el inversor entra en estado operativo en <20 milisegundos. Tu monitor ni siquiera parpadeará.' }
                        ].map((ac, i) => (
                            <div key={i} className="bg-[#111] border border-neutral-800 hover:border-amber-500 focus-within:border-amber-500 transition-colors">
                                <button className="w-full p-8 flex justify-between items-center text-left" onClick={() => setFaqOpen(faqOpen===i?null:i)}>
                                    <div className="flex items-center gap-4">
                                        <span className="text-amber-500 font-black">[{i+1}]</span>
                                        <span className="text-white font-bold uppercase tracking-wide text-sm">{ac.t}</span>
                                    </div>
                                    <span className="text-amber-500 font-bold bg-[#1a1a1a] w-8 h-8 flex items-center justify-center border border-neutral-800">{faqOpen===i?'−':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {faqOpen === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-8 pb-8 text-neutral-400 font-sans leading-relaxed border-t border-neutral-900 pt-6">
                                            {ac.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 6. ENDLESS MARQUEE (Warning Label) */}
                <div className="w-[100vw] overflow-hidden py-3 bg-amber-500 text-black flex transform relative left-[50%] -translate-x-[50%] font-black uppercase tracking-tighter text-3xl">
                    <div className="flex whitespace-nowrap">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="flex items-center gap-12 px-6">
                                <span>PELIGRO // ALTO VOLTAJE</span>
                                <span>CAUTION // NO FUMES CERCA DEL SOL</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 7. WHY TO USE / BENEFITS (Toolbox layout) */}
                <div className="max-w-7xl mx-auto px-4 py-32 border-b border-neutral-900">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="order-2 lg:order-1 bg-[#1a1a1a] p-10 border border-neutral-800 rounded-sm relative">
                            <div className="absolute top-0 right-10 w-20 h-10 bg-[#111] border-x border-b border-neutral-800 rounded-b-md flex justify-around items-center px-4 -mt-px select-none">
                                <div className="w-2 h-2 bg-neutral-800 rounded-full"></div>
                                <div className="w-2 h-2 bg-neutral-800 rounded-full"></div>
                            </div>
                            <h3 className="text-white font-black uppercase text-xl mb-6">Múltiples Toma-Corrientes</h3>
                            
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { n: '3x Enchufes Pared', t: '220V CA' },
                                    { n: '2x USB-C', t: '100W PD (Para Laptops)' },
                                    { n: '4x USB-A', t: 'Carga Rápida QC3' },
                                    { n: '1x Salida Auto', t: 'Encendedor 12V DC' }
                                ].map((p, i) => (
                                    <div key={i} className="bg-[#111] border border-neutral-800 p-4 text-center">
                                        <div className="text-amber-500 font-bold uppercase text-[10px] tracking-widest mb-1">{p.t}</div>
                                        <div className="text-white font-black text-sm">{p.n}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="order-1 lg:order-2">
                            <h2 className="text-5xl font-black text-white uppercase tracking-tighter mb-8 leading-[0.95]">Apaga los anticuados motores <span className="text-amber-500">a gasolina.</span></h2>
                            <p className="text-neutral-400 font-bold mb-10 text-lg">Olvídate de comprar bidones de combustible, lidiar con el ruido ensordecedor que amarga el domingo de campamento o llenar el cuarto de humo tóxico. Este bloque almacena pura electricidad que recogió de tu pared o paneles solares.</p>
                            
                            <div className="space-y-6">
                                {[
                                    { t: 'Display LCD Métrico', d: 'Te dice exactamente cuántos watts están entrando (INPUT), cuántos están saliendo (OUTPUT) y la hora aproximada de cuando se agotará la batería con la carga actual.' },
                                    { t: 'Expansión Solar', d: 'Conecta cualquier panel solar compatible de hasta 220W y recarga esta base 100% de la energía del sol estando en medio del desierto.' }
                                ].map((b, i) => (
                                    <div key={i} className="flex gap-4 items-start">
                                        <div className="mt-1">
                                            <svg className="w-5 h-5 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 13l4 4L19 7"/></svg>
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-2">{b.t}</h4>
                                            <p className="text-neutral-500 font-sans text-sm">{b.d}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 10. COMPARISON TABLE */}
                <div className="px-4 py-32 bg-[#0a0a0a]">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl text-center font-black text-white uppercase tracking-widest mb-16">Esquema Comparativo Físico</h2>
                        <div className="border border-neutral-800">
                            <div className="grid grid-cols-3 bg-[#111] text-[10px] uppercase font-black text-neutral-500 tracking-widest border-b border-neutral-800">
                                <div className="p-6">Motorización</div>
                                <div className="p-6 text-black bg-amber-500 border-x border-neutral-800 text-center">Generador de Litio LFP</div>
                                <div className="p-6 text-center">Generador a Gasolina Clásico</div>
                            </div>
                            {[
                                { k: 'Sonido / Ruido', u: 'Silencio absoluto (Cero dbA)', t: 'Motor a explosión ensordecedor' },
                                { k: 'Mantenimiento', u: 'Nulo (No usa aceite, no hay aspas)', t: 'Cambios de aceite, filtros y bujías' },
                                { k: 'Lugar de Uso', u: 'Apto interiores y cuartos cerrados', t: 'Prohibido usar dentro de casa' },
                                { k: 'Desembolso Financiero', u: 'Extracción Personalizada C.O.D.', t: 'Peligros de transferencias previas' }
                            ].map((r, i) => (
                                <div key={i} className="grid grid-cols-3 border-t border-neutral-800 font-bold text-xs bg-[#111] hover:bg-[#1a1a1a] transition-colors">
                                    <div className="p-6 text-neutral-400">{r.k}</div>
                                    <div className="p-6 text-amber-500 bg-amber-500/5 font-black border-x border-neutral-800 text-center">{r.u}</div>
                                    <div className="p-6 text-neutral-600 text-center line-through">{r.t}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 11. RISK REVERSAL WARRANTY (Heavy Duty Trust) */}
                <div className="border-t-4 border-amber-500 bg-[#111] py-24 text-center px-4">
                    <div className="max-w-3xl mx-auto">
                        <svg className="w-16 h-16 text-amber-500 mx-auto mb-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>
                        <h3 className="text-3xl text-white font-black uppercase tracking-tighter mb-6">Bloqueo Logístico (C.O.D.)</h3>
                        <p className="text-neutral-400 font-sans font-medium leading-relaxed mb-8 max-w-2xl mx-auto">
                            Equipos pesados de almacenamiento eléctrico de alta densidad representan inversiones serias de seguridad que no deben arriesgarse transitando dinero a webs extrañas. Subiremos tu base central de energía a un transporte privado hacia tu base de operaciones u hogar. Corroboras físicamente el empaque de hierro, y recién entonces, nos transfieres o pagas el valor ahí mismo al conductor.
                        </p>
                    </div>
                </div>

                {/* 13. FAQ */}
                <div className="max-w-4xl mx-auto px-4 py-32 border-b border-neutral-900">
                    <div className="flex items-center gap-4 mb-16 font-black text-amber-500 uppercase tracking-widest text-xl">
                        <div className="w-2 h-8 bg-amber-500"></div>
                        Consultas de Infraestructura
                    </div>
                    <div className="space-y-4">
                        {[
                            {q: '¿Qué NO puede encender esto?', a: 'Puede operar el 90% de electrodomésticos (Neveras, TVs, PCs, Lámparas y Ventiladores). NO está diseñado para motores masivos como aires acondicionados de altas fragorías, hornos eléctricos de cocina pesados ni sierras industriales circulares masivas que picoarranquen por encima de los 2000W.'},
                            {q: '¿Si lo guardo 6 meses en un mueble, sufre la batería?', a: 'El litio ferrosfato (LFP) sufre una pérdida menor al 5% por mes si se guarda al 100%. Te recomendamos dejarlo cargado completo, guardarlo tranquilamente en el placard y en 1 año aún tendrás muchísima energía disponible en caso de emergencia.'},
                            {q: 'Al pedir de esta manera C.O.D., ¿Cuántos días tarda en llegar el peso de 12kg?', a: 'Una vez asignas tu pedido en el formulario, un gestor lo monta en la camioneta de reparto ese mismo día o al inicio del siguiente si andas por vías céntricas. Pagas cuando la caja gruesa pisa el piso de tu hogar.'}
                        ].map((f, i) => (
                            <div key={i} className="bg-[#111] border border-neutral-800">
                                <button onClick={() => setFaqOpen(faqOpen===i?null:i)} className="w-full px-8 py-6 text-left flex justify-between items-center text-white font-bold text-sm uppercase tracking-widest hover:text-amber-500 transition-colors">
                                    {f.q}
                                    <span className="text-amber-500 font-black">{faqOpen===i?'−':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {faqOpen === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-8 pb-8 text-neutral-400 font-medium font-sans text-sm leading-relaxed border-t border-neutral-900 pt-6">
                                            {f.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 14. EXPANDED REVIEWS (Field Reports) */}
                <div className="py-24 bg-[#0a0a0a]">
                    <div className="max-w-7xl mx-auto px-4">
                        <h2 className="text-center font-bold text-neutral-600 uppercase tracking-widest text-[10px] mb-12">Reportes Técnicos de Consumidores</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { r: "Trabajo home office editando videos en PC de escritorio. Saltó la llave de luz y este aparato ni pestañeó, me salvó horas de progreso no guardado. La transacción en efectivo es transparente 100%.", n: "Oscar L.", t: "Videógrafo" },
                                { r: "Llevamos este cubo de 12kg al fin de semana de campamento en el lago donde no hay electricidad. Alimentó nuestras heladerías, luces y música durante los tres días íntegros. Soberbio.", n: "Familia Daza", t: "Uso Recreativo" },
                                { r: "No tengo que preocuparme si hay escasez o apagones de luz por el verano, enchufamos 2 ventiladores potentes y funcionan casi toda la noche. Pagamos a la furgoneta de envío sin problemas de tarjeta.", n: "Carlos O.", t: "Cliente Habitual" }
                            ].map((rev, i) => (
                                <div key={i} className="p-8 bg-[#111] border border-neutral-800 relative group">
                                    <div className="absolute top-0 right-0 w-8 h-8 flex items-center justify-center font-bold text-neutral-700 bg-neutral-900 border-l border-b border-neutral-800 text-sm">
                                        {i+1}
                                    </div>
                                    <p className="text-neutral-300 font-sans text-sm mb-6 leading-relaxed relative z-10 pt-4">"{rev.r}"</p>
                                    <div className="border-t border-neutral-800 pt-4">
                                        <div className="text-white font-bold uppercase text-[10px] tracking-widest">{rev.n}</div>
                                        <div className="text-amber-500 uppercase text-[9px] font-black">{rev.t}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 15. CHECKOUT (Warning Form) */}
                <div id="checkout-power" className="py-24 md:py-32 relative">
                    <div className="max-w-6xl mx-auto px-4 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        <div className="order-2 lg:order-1 bg-[#1a1a1a] p-8 lg:p-12 border-2 border-amber-500 shadow-[15px_15px_0_theme(colors.amber.500)]">
                            <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-8">Gestión de Reserva Física</h3>
                            
                            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                                <div>
                                    <label className="text-[10px] text-amber-500 uppercase font-black tracking-widest mb-2 block">Identificación Pila</label>
                                    <input type="text" className="w-full bg-[#111] border border-neutral-800 text-white font-bold p-4 focus:border-amber-500 outline-none transition-colors uppercase placeholder:text-neutral-700" placeholder="NOMBRE QUIEN RECIBE" />
                                </div>
                                <div>
                                    <label className="text-[10px] text-amber-500 uppercase font-black tracking-widest mb-2 block">Dato de Comunicación Rápida</label>
                                    <input type="tel" className="w-full bg-[#111] border border-neutral-800 text-white font-bold p-4 focus:border-amber-500 outline-none transition-colors uppercase placeholder:text-neutral-700" placeholder="NUMERO (WHATSAPP ACTIVO)" />
                                </div>
                                <div>
                                    <label className="text-[10px] text-amber-500 uppercase font-black tracking-widest mb-2 block">Centro de Destino Físico</label>
                                    <textarea rows={2} className="w-full bg-[#111] border border-neutral-800 text-white font-bold p-4 focus:border-amber-500 outline-none transition-colors uppercase placeholder:text-neutral-700 resize-none" placeholder="CIUDAD, ZONA, Y REFERENCIAS"></textarea>
                                </div>
                                <div className="pt-6">
                                    <button className="w-full bg-amber-500 hover:bg-amber-400 text-black py-5 font-black uppercase tracking-widest text-lg transition-colors border-2 border-transparent">
                                        EJECUTAR EXTRACCION C.O.D
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className="order-1 lg:order-2">
                            <h2 className="text-5xl font-black text-white uppercase tracking-tighter mb-8 leading-[1.1]">No te quedes sin <br/> <span className="bg-amber-500 text-black px-2 mt-2 inline-block">Energía en Apagones.</span></h2>
                            <p className="text-neutral-400 font-bold mb-10 text-lg border-l-4 border-amber-500 pl-4">Haz el despacho hacia tu hogar firmando ahora. Te mandamos un transporte con el equipo entero para que te despreocupes de la estafa moderna. Pague efectivo solo frente al transportista pesado.</p>
                            
                            <div className="text-5xl font-black text-white">{fmtPrice(product.price)}</div>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
};

export default PdpPowerStation;
