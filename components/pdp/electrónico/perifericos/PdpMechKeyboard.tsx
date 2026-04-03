'use client';
import React, { useState } from 'react';
import { StoreData, Product } from '@/lib/types';
import EnhancedProductGallery from '@/components/pdp/EnhancedProductGallery';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { data: StoreData; product: Product; }

const PdpMechKeyboard: React.FC<Props> = ({ data, product }) => {
    const [openSpecAcc, setOpenSpecAcc] = useState<number | null>(0);
    const [faqOpen, setFaqOpen] = useState<number | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const ai = product.aiContent;
    const fmtPrice = (n: number) => { const s = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); return `Gs. ${s}`; };
    
    // Aesthetic Palette: Brutalist / Hacker
    const bg = '#E5E5E5'; // Light gray brutalist bg
    const uiBg = '#111111'; // Deep black for massive blocks
    const accent = '#FF3366'; // Punchy Pink/Red brutalist accent

    return (
        <div style={{ background: bg, color: uiBg, fontFamily: "'JetBrains Mono', 'Courier New', monospace" }} className="overflow-x-hidden selection:bg-[#FF3366] selection:text-white antialiased">
            
            {/* 0. AMBIENT GRID */}
            <div className="fixed inset-0 pointer-events-none z-0" style={{ backgroundImage: 'linear-gradient(#00000010 1px, transparent 1px), linear-gradient(90deg, #00000010 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

            {/* 1. TOP NAV (BRUTALIST) */}
            <header className="sticky top-0 z-50 bg-[#E5E5E5] border-b-4 border-black">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
                    <div className="text-2xl font-black uppercase tracking-tighter bg-black text-white px-3 py-1 shadow-[4px_4px_0_#FF3366]">
                        TYPING_CTRL
                    </div>
                    <nav className="hidden lg:flex gap-8">
                        {['Switches', 'PCB', 'Setup'].map((item) => (
                            <a key={item} href={`#${item.toLowerCase()}`} className="text-xs font-black uppercase text-black hover:text-[#FF3366] hover:bg-black px-2 py-1 transition-colors border border-transparent hover:border-black">
                                [{item}]
                            </a>
                        ))}
                    </nav>
                </div>
            </header>

            <main className="relative z-10">
                {/* 2. BREADCRUMBS & MICRO-LOGISTICS */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 pb-4">
                    <div className="flex flex-wrap items-center justify-between gap-4 font-bold text-xs uppercase border-b-2 border-black/10 pb-4">
                        <div>ROOT / HARDWARE / <span className="bg-[#FF3366] text-white px-1">{product.title.substring(0, 15)}...</span></div>
                        <div className="flex items-center gap-2 bg-black text-white px-3 py-1 shadow-[4px_4px_0_#FF3366]">
                            <svg className="animate-spin-slow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
                            ENVÍO [STATUS: 24H]
                        </div>
                    </div>
                </div>

                {/* 3. HERO SECTION */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="relative bg-white border-4 border-black p-4 shadow-[12px_12px_0_#000000]">
                            <EnhancedProductGallery product={product} accentColor={accent} />
                            <div className="absolute top-4 left-4 border-2 border-black bg-white font-black text-[10px] px-2 py-1 shadow-[2px_2px_0_#FF3366]">OBJ_ID: {product.id.substring(0,6)}</div>
                        </motion.div>

                        <div className="flex flex-col relative pt-4">
                            {/* Rating Brutalist */}
                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex border-2 border-black bg-white px-2 py-1">
                                    {[...Array(5)].map((_,i) => <span key={i} className="text-[#FF3366]">★</span>)}
                                </div>
                                <span className="text-xs font-black uppercase">v4.9 Stable Build (980 Reviews)</span>
                            </div>
                            
                            <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-6">
                                {ai?.enhancedTitle || product.title}
                            </h1>
                            <p className="text-sm border-l-4 border-black pl-4 mb-10 leading-relaxed font-bold">
                                {ai?.enhancedDescription || product.description || 'Chasis de aluminio mecanizado CNC. Switches mecánicos lubricados de fábrica. Acústica modificada en placa PC. Escribir no debe ser aburrido.'}
                            </p>

                            <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0_#FF3366] mb-6">
                                <div className="flex items-end gap-4 mb-6">
                                    <span className="text-4xl md:text-5xl font-black">{fmtPrice(product.price)}</span>
                                    {product.originalPrice && <span className="text-lg font-bold line-through pb-1 decoration-4">{fmtPrice(product.originalPrice)}</span>}
                                </div>
                                <button onClick={() => document.getElementById('checkout-mech')?.scrollIntoView({ behavior: 'smooth' })} className="w-full h-[64px] bg-black text-white hover:bg-[#FF3366] hover:text-black font-black uppercase tracking-widest text-sm border-4 border-transparent focus:border-black transition-colors flex items-center justify-center gap-3">
                                    {'>'} INICIAR COMPRA_
                                </button>
                            </div>

                            {/* 4. TRUST BADGES */}
                            <div className="grid grid-cols-3 gap-4 font-bold text-[10px] text-center">
                                <div className="border border-black bg-white p-2 flex flex-col items-center">
                                    <div className="text-lg mb-1">📦</div> Envío Seguro
                                </div>
                                <div className="border border-black bg-white p-2 flex flex-col items-center">
                                    <div className="text-lg mb-1">🛡️</div> 365 Días Gtia
                                </div>
                                <div className="border border-black bg-white p-2 flex flex-col items-center">
                                    <div className="text-lg mb-1">🏦</div> Pago Puerta
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 5. ABOVE FOLD DETAILS (ACCORDIONS) */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 pb-16">
                    <div className="border-4 border-black bg-white">
                        {[
                            { t: 'Spec: Layout & PCB', a: 'PCB Hot-Swappable 5 pines de orientación Sur. Teclas PBT Double-shot. Factor de forma 75% con perilla de aluminio sólido.' },
                            { t: 'Spec: Construcción', a: 'Cuerpo completo de aluminio 6063. Montaje Gasket con placa de policarbonato para una acústica grave (marblesound).' },
                            { t: 'Rutina Logística', a: 'No arriesgas dinero online. Hacemos el deploy a tu domicilio y pagas únicamente tras verificar visualmente la caja física.' }
                        ].map((ac, i) => (
                            <div key={i} className="border-b-4 border-black last:border-b-0">
                                <button onClick={() => setOpenSpecAcc(openSpecAcc===i?null:i)} className="w-full text-left px-6 py-5 flex items-center justify-between font-black uppercase text-sm hover:bg-black hover:text-white transition-colors group">
                                    {ac.t} 
                                    <span className="text-[#FF3366]">{openSpecAcc===i?'-':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {openSpecAcc === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 pb-6 pt-2 text-xs font-bold leading-relaxed border-t border-dashed border-black/20">
                                            {'>'} {ac.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 6. ENDLESS MARQUEE */}
                <div className="w-[100vw] overflow-hidden py-4 bg-black text-white border-y-4 border-black relative left-[50%] -translate-x-[50%] transform -rotate-1">
                    <div className="flex whitespace-nowrap animate-marquee font-black uppercase text-xl tracking-widest">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="flex items-center gap-8 px-4">
                                <span className="bg-[#FF3366] text-black px-2">HOT-SWAPPABLE</span>
                                <span>GASKET MOUNT</span>
                                <span className="bg-white text-black px-2">PBT KEYCAPS</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 7. WHY TO USE / BENEFITS */}
                <div id="switches" className="max-w-7xl mx-auto px-4 md:px-8 py-24">
                    <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-16 text-center">
                        <span className="bg-black text-white px-4 py-1 shadow-[6px_6px_0_#FF3366]">Hardware_Superior</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { ic: '⎋', t: 'Placa Hot-Swap', d: 'Cambia los switches sin soldador. Modifica el sentimiento y sonido pieza por pieza si así lo deseas.' },
                            { ic: '⌨', t: 'Acústica Thock', d: 'Cuerpo relleno de espuma de porón de alta densidad y silicona. Absorbe el eco brillante, dejando un sonido profundo.' },
                            { ic: '⌘', t: 'QMK/VIA Mapeo', d: 'Programable por hardware. Cambia qué hace cada tecla interactuando directamente con el firmware del sistema.' }
                        ].map((b, i) => (
                            <div key={i} className="bg-white border-4 border-black p-8 relative hover:translate-x-1 hover:-translate-y-1 hover:shadow-[12px_12px_0_#FF3366] transition-all">
                                <div className="text-5xl mb-6 text-black">{b.ic}</div>
                                <h3 className="text-xl font-black uppercase mb-4 bg-black text-white px-2 inline-block py-1">{b.t}</h3>
                                <p className="text-sm font-bold leading-relaxed">{b.d}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 8. HOW TO USE (VISUAL GUIDE) */}
                <div id="setup" className="bg-[#111111] text-white py-24 border-y-4 border-black border-dashed">
                    <div className="max-w-7xl mx-auto px-4 md:px-8">
                        <h2 className="text-3xl font-black uppercase tracking-tighter mb-16">{'// Secuencia de booteo'}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { s: '01', t: 'Conexión Física', d: 'Enchufa el cable USB-C aviador enrollado en el puerto tipo C de la PCB.' },
                                { s: '02', t: 'Intermitencia', d: 'El RGB de la placa iniciará un ciclo rojo para identificar que los drivers se instalan auto.' },
                                { s: '03', t: 'Ejecución', d: 'Empieza a teclear. Experimentarás un rebote mecánico que tu teclado de membrana no tiene.' }
                            ].map((s, i) => (
                                <div key={i} className="border-l-4 border-[#FF3366] pl-6 relative">
                                    <div className="absolute top-0 right-0 font-black text-8xl text-white/5 pointer-events-none">{s.s}</div>
                                    <div className="text-[#FF3366] font-black mb-2 border border-[#FF3366] inline-block px-2">Paso_{s.s}</div>
                                    <h4 className="text-2xl font-black uppercase mb-3">{s.t}</h4>
                                    <p className="text-sm text-zinc-400 font-bold">{s.d}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 9. DEEP DIVE MULTIMEDIA */}
                <div className="py-24 max-w-7xl mx-auto px-4 md:px-8">
                    <div className="bg-black border-4 border-black text-white p-6 md:p-16 relative">
                        {/* Cut corner effect brutalist */}
                        <div className="absolute top-0 right-0 w-16 h-16 bg-[#E5E5E5] border-b-4 border-l-4 border-black"></div>
                        <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8 max-w-2xl"><span className="text-[#FF3366]">Escribir no es</span> una obligación.</h3>
                        <p className="text-lg font-bold max-w-xl leading-relaxed mb-8 text-zinc-400">Es una transferencia analógica a la terminal. Cuando el hardware tiene el sonido perfecto y la resistencia justa en cada dedo, pasar 8 horas tecleando se vuelve adictivo.</p>
                        <div className="flex gap-4 font-black uppercase text-sm">
                            <span className="bg-white text-black px-4 py-2 shadow-[4px_4px_0_#FF3366]">Lubed Switches</span>
                            <span className="bg-[#FF3366] text-white px-4 py-2 border-2 border-[#FF3366]">PBT Caps</span>
                        </div>
                    </div>
                </div>

                {/* 10. COMPARISON TABLE */}
                <div className="max-w-5xl mx-auto px-4 md:px-8 py-16">
                    <h2 className="text-3xl font-black uppercase text-center mb-12">Diff: Nosotros_vs_Membrana</h2>
                    <div className="bg-white border-4 border-black shadow-[12px_12px_0_#000000]">
                        <div className="grid grid-cols-3 bg-black text-white font-black uppercase text-xs p-4 tracking-widest">
                            <div>Property</div>
                            <div className="text-[#FF3366] text-center">Mech_Pro</div>
                            <div className="text-zinc-500 text-center">Membrana Base</div>
                        </div>
                        {[
                            { k: 'Tiempo de Actuación', u: '1.2mm (Instantáneo)', t: 'Lento (Bottom-out total)' },
                            { k: 'Durabilidad Switch', u: '50 Millones de Clicks', t: '1 Millón (Goma que se rompe)' },
                            { k: 'Rollover', u: 'N-Key (Presiona todo a la vez)', t: 'Ghosting (Máximo 3 teclas)' },
                            { k: 'Sonido Acústico', u: 'Modificado/Thock (Grave)', t: 'Plástico hueco chirriante' }
                        ].map((r, i) => (
                            <div key={i} className="grid grid-cols-3 p-4 border-b-2 border-black last:border-0 font-bold text-sm items-center hover:bg-[#FF3366] hover:text-white transition-colors">
                                <div className="uppercase">{r.k}</div>
                                <div className="font-black text-center">{r.u}</div>
                                <div className="text-center font-normal line-through opacity-50">{r.t}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 11. RISK REVERSAL WARRANTY */}
                <div className="max-w-4xl mx-auto px-4 md:px-8 py-16">
                    <div className="border-4 border-black bg-[#FF3366] p-8 md:p-12 text-black shadow-[16px_16px_0_#111111] flex flex-col md:flex-row items-center gap-8">
                        <div className="w-24 h-24 bg-black text-white flex items-center justify-center font-black text-4xl shrink-0 uppercase">
                            !
                        </div>
                        <div>
                            <h3 className="text-2xl font-black uppercase mb-4 bg-white inline-block px-3 py-1">Excepción No Tratada (Error 0)</h3>
                            <p className="font-bold leading-relaxed text-sm md:text-base border-l-4 border-black pl-4">Comunidad garantizada. No arriesgues tu saldo. Rellena los datos en la terminal inferior, lo despachamos en 24H y pagas en la puerta tras visualizar el empaque intacto.</p>
                        </div>
                    </div>
                </div>

                {/* 12. BRAND ETHOS */}
                <div className="py-24 border-y-4 border-black mt-12 px-6 bg-white text-center">
                    <div className="max-w-3xl mx-auto">
                        <div className="inline-block bg-black text-white font-black text-xs px-2 py-1 mb-6 shadow-[4px_4px_0_#FF3366]">OUR_SOURCE_CODE</div>
                        <h3 className="text-4xl font-black uppercase tracking-tighter mb-6">El teclado de membrana ofende.</h3>
                        <p className="text-base font-bold leading-relaxed">Trabajar detrás del monitor la mayor parte del día merecía una evolución. La mayoría usa trozos de plástico inyectado muy baratos. Nosotros traemos herramientas mecanizadas para desarrolladores, artistas y creadores que ven al teclado como su pincel principal.</p>
                    </div>
                </div>

                {/* 13. FAQ */}
                <div className="max-w-3xl mx-auto px-4 md:px-8 py-24">
                    <h2 className="text-3xl font-black uppercase text-center mb-12">{'// Array_De_Preguntas'}</h2>
                    <div className="space-y-4">
                        {[
                            {q: '¿Son compatibles con Mac o solo PC?', a: 'El sistema operativo no importa. Hay un comando integrado para hacer switch de Windows a MacOS y mapear las teclas Command / Option.'},
                            {q: '¿El sonido molestará en una oficina?', a: 'Viene ensamblado con switches lineales pretónicamente lubricados con Krytox_205g0. Es decir: suenan elegantes, secos y apagados. Tu compañero de la izquierda no sufrirá.'},
                            {q: '¿Cómo procedo a pagar físicamente?', a: 'Ingresa en el form, y el despachante te visitará dentro del SLA acordado [24H-48H]. Entregarás efectivo directamente o harás transferencia en el POS.'}
                        ].map((f, i) => (
                            <div key={i} className="bg-white border-2 border-black p-2">
                                <button onClick={() => setFaqOpen(faqOpen===i?null:i)} className="w-full text-left px-4 py-4 bg-[#E5E5E5] flex items-center justify-between font-black uppercase text-sm border border-transparent hover:border-black">
                                    <span>{'>'} {f.q}</span>
                                    <span className="text-[#FF3366] bg-black text-white w-6 h-6 flex items-center justify-center">{faqOpen===i?'-':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {faqOpen === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-4 pb-4 pt-4 text-xs font-bold bg-white border-t-2 border-dashed border-black/20">
                                            {f.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 14. EXPANDED REVIEWS (UGC BRUTALIST) */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 border-t-4 border-black">
                    <h2 className="text-4xl font-black uppercase tracking-tighter text-center mb-2">Logs de Usuarios</h2>
                    <p className="text-center font-bold text-xs uppercase mb-16 opacity-70">Salida Terminal: Verified_Buyers</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { r: "Absoluto monstruo industrial. Pesa casi 2 kilos todo armado. Cuando tecleas no se mueve un solo milímetro sobre el pad. El sonido es tan satisfactorio que de verdad escribo más código ahora.", n: "Felipe J.", t: "Dev Senior" },
                            { r: "Vengo de uno gamer de 200 dólares. El RGB era genial pero temblaba como juguete. Este se nota forjado pensando en estética y purismo.", n: "Arturo S.", t: "Editor de Video" },
                            { r: "Excelente flujo logístico loco. Pedí a la mañana, a las 18 me cayó el courrier. Miré la caja sellada, pasé efectivo y listo. Brutal.", n: "Martín B.", t: "Data Analyst" }
                        ].map((rev, i) => (
                            <div key={i} className="bg-white border-2 border-black p-6 shadow-[6px_6px_0_#000000] relative flex flex-col justify-between">
                                <div className="absolute top-2 right-2 bg-black text-white text-[9px] px-1 font-black">LOG_{i+1}</div>
                                <p className="text-sm font-bold mb-6 pt-4 border-t border-dashed border-black mt-2">"{rev.r}"</p>
                                <div className="flex justify-between items-center bg-[#E5E5E5] p-2 border-black border">
                                    <div>
                                        <div className="font-black uppercase text-xs">{rev.n}</div>
                                        <div className="text-[10px] text-zinc-600 font-bold">{rev.t}</div>
                                    </div>
                                    <div className="text-[#FF3366] text-xs">★★★★★</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 15. CHECKOUT */}
                <div id="checkout-mech" className="py-24 bg-black relative mt-16 border-t-8 border-[#FF3366]">
                    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-[#FF3366]/5 rounded-full blur-[100px] pointer-events-none"></div>
                    <div className="max-w-3xl mx-auto px-4 md:px-8 relative z-10">
                        <div className="bg-white border-4 border-[#FF3366] p-8 md:p-12 shadow-[16px_16px_0_#FF3366]">
                            <div className="text-center mb-8 border-b-4 border-black pb-8">
                                <h3 className="text-4xl font-black uppercase tracking-tighter mb-4 text-black">Final_Input</h3>
                                <div className="inline-block bg-black text-white font-black text-3xl px-6 py-2 shadow-[4px_4px_0_#FF3366]">
                                    {fmtPrice(product.price)}
                                </div>
                                <p className="text-xs font-bold mt-4 max-w-sm mx-auto uppercase">Abona en presencial al recibir.</p>
                            </div>
                            <form className="space-y-4" onSubmit={e=>e.preventDefault()}>
                                <input type="text" className="w-full bg-[#E5E5E5] border-2 border-black hover:bg-black hover:text-white focus:bg-black focus:border-[#FF3366] focus:text-white rounded-none text-black font-black text-sm px-6 py-4 outline-none transition-colors uppercase placeholder-black/50 hover:placeholder-white/50" placeholder="> str(Nombre_Completo)" />
                                <input type="tel" className="w-full bg-[#E5E5E5] border-2 border-black hover:bg-black hover:text-white focus:bg-black focus:border-[#FF3366] focus:text-white rounded-none text-black font-black text-sm px-6 py-4 outline-none transition-colors uppercase placeholder-black/50 hover:placeholder-white/50" placeholder="> int(Telefono_WhatsApp)" />
                                <textarea rows={2} className="w-full bg-[#E5E5E5] border-2 border-black hover:bg-black hover:text-white focus:bg-black focus:border-[#FF3366] focus:text-white rounded-none text-black font-black text-sm px-6 py-4 outline-none resize-none transition-colors uppercase placeholder-black/50 hover:placeholder-white/50" placeholder="> str(Escriba_Su_Dirección)" />
                                <div className="pt-6">
                                    <button className="w-full h-[70px] bg-[#FF3366] border-4 border-black text-black text-lg font-black uppercase hover:bg-white hover:text-black hover:shadow-[10px_10px_0_#FF3366] transition-all flex items-center justify-center gap-2">
                                        {'[ ENTER ] Confirmar Drop'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </main>

            {/* STICKY MOBILE CTA */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
                <div className="bg-black border-t-4 border-[#FF3366] flex">
                    <div className="flex-1 p-3 px-4 flex flex-col justify-center">
                        <div className="text-[10px] font-black uppercase text-zinc-400">Total Pago en Destino</div>
                        <div className="font-black text-white text-lg">{fmtPrice(product.price)}</div>
                    </div>
                    <button onClick={() => document.getElementById('checkout-mech')?.scrollIntoView({ behavior: 'smooth' })} className="bg-[#FF3366] text-black font-black uppercase px-8 flex items-center justify-center border-l-4 border-black">
                        COMPRAR
                    </button>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{__html: `
                @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
                .animate-marquee { animation: marquee 10s linear infinite; }
            `}} />
        </div>
    );
};

export default PdpMechKeyboard;
