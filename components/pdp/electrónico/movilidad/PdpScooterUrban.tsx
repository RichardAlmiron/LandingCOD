'use client';
import React, { useState } from 'react';
import { StoreData, Product } from '@/lib/types';
import EnhancedProductGallery from '@/components/pdp/EnhancedProductGallery';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { data: StoreData; product: Product; }

const PdpScooterUrban: React.FC<Props> = ({ data, product }) => {
    const [openSpecAcc, setOpenSpecAcc] = useState<number | null>(0);
    const [faqOpen, setFaqOpen] = useState<number | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const ai = product.aiContent;
    const fmtPrice = (n: number) => { const s = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); return `Gs. ${s}`; };
    
    // Aesthetic Palette: Urban / Cyber-Streetwear
    const bg = '#0E0E10'; // Deep Asphalt
    const accent = '#D9F836'; // Neon Lime/Yellow
    const cardBg = '#18181B'; // Zinc 900

    return (
        <div style={{ background: bg, color: '#F4F4F5', fontFamily: "'Teko', 'Inter', sans-serif" }} className="overflow-x-hidden selection:bg-[#D9F836]/30 antialiased">
            
            {/* 0. AMBIENT SPEED/ASPHALT TEXTURE */}
            <div className="fixed inset-0 pointer-events-none z-0 opacity-10" style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/asfalt-dark.png')` }}></div>
            <div className="fixed top-0 right-0 w-[50vw] h-[100vh] bg-gradient-to-l from-[#D9F836]/5 to-transparent pointer-events-none z-0 transform -skew-x-12 translate-x-32"></div>

            {/* 1. TOP NAV */}
            <header className="sticky top-0 z-50 bg-[#0E0E10]/95 backdrop-blur-xl border-b-[3px] border-[#D9F836]">
                <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3 flex items-center justify-between font-sans">
                    <div className="flex items-center gap-3">
                        <div className="uppercase font-black text-2xl tracking-tighter italic text-white flex items-center">
                            STREET<span className="text-[#D9F836] ml-1">KINETICS</span>
                        </div>
                    </div>
                    <nav className="hidden lg:flex gap-6 items-center">
                        {['Motor', 'Batería', 'Reseñas'].map((item) => (
                            <a key={item} href={`#${item.toLowerCase()}`} className="text-xs font-black tracking-widest uppercase text-zinc-400 hover:text-[#D9F836] transition-colors italic">
                                /// {item}
                            </a>
                        ))}
                    </nav>
                </div>
            </header>

            <main className="relative z-10 font-sans">
                {/* 2. BREADCRUMBS & MICRO-LOGISTICS */}
                <div className="max-w-7xl mx-auto px-4 lg:px-8 pt-8 pb-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
                        <div className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
                            MOVILIDAD &gt; HARDWARE &gt; <span className="text-white">{product.title.substring(0, 20)}...</span>
                        </div>
                        <div className="inline-flex items-center gap-2 bg-[#D9F836]/10 px-4 py-2 text-[#D9F836] border border-[#D9F836]/20 self-start md:self-auto transform -skew-x-12">
                            <svg className="animate-bounce" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                            <span className="text-xs font-black uppercase tracking-widest skew-x-12">Envío Ultrashock (24H)</span>
                        </div>
                    </div>
                </div>

                {/* 3. HERO */}
                <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div initial={{ opacity: 0, x: -50, skewX: 10 }} animate={{ opacity: 1, x: 0, skewX: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} className="relative bg-[#18181B] border border-zinc-800 p-2 shadow-[20px_20px_0_rgba(217,248,54,0.05)]">
                            <EnhancedProductGallery product={product} accentColor={accent} />
                            <div className="absolute -bottom-4 -right-4 bg-[#D9F836] text-black font-black text-sm uppercase px-4 py-2 transform -skew-x-12">MAX RANGE</div>
                        </motion.div>

                        <div className="flex flex-col justify-center relative">
                            {/* Stars */}
                            <div className="flex items-center gap-2 mb-6">
                                <div className="flex text-[#D9F836]">
                                    {[...Array(5)].map((_,i) => <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
                                </div>
                                <div className="text-xs font-bold text-zinc-400">4.9/5 (1.2K+ Asfaltos Recorridos)</div>
                            </div>
                            
                            <h1 className="text-5xl md:text-7xl font-black uppercase leading-[0.9] text-white tracking-tighter italic mb-6">
                                {ai?.enhancedTitle || product.title}
                            </h1>
                            <p className="text-sm md:text-base font-bold text-zinc-400 mb-8 max-w-md uppercase tracking-wider leading-relaxed border-l-4 border-[#D9F836] pl-4">
                                {ai?.enhancedDescription || product.description || 'Potencia de 500W pura. El asfalto es tuyo. Rompe el tráfico, salva tiempo y redefine cómo te mueves en la jungla de concreto.'}
                            </p>

                            <div className="bg-[#18181B] border-l-4 border-[#D9F836] p-6 mb-4 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                                </div>
                                <div className="flex items-end gap-6 mb-6">
                                    <span className="text-5xl font-black text-white italic">{fmtPrice(product.price)}</span>
                                    {product.originalPrice && <span className="text-lg font-black text-zinc-600 line-through pb-1 italic">{fmtPrice(product.originalPrice)}</span>}
                                </div>
                                <button onClick={() => document.getElementById('checkout-scooter')?.scrollIntoView({ behavior: 'smooth' })} className="w-full h-[70px] bg-[#D9F836] text-black font-black uppercase text-lg tracking-[0.2em] transform -skew-x-12 hover:bg-white transition-colors relative overflow-hidden shadow-[10px_10px_0_#18181B] active:translate-y-2 active:shadow-none active:translate-x-2">
                                    <span className="skew-x-12 block">Arrancar Ahora</span>
                                </button>
                            </div>

                            {/* 4. TRUST BADGES FAST */}
                            <div className="grid grid-cols-3 gap-2 mt-2">
                                {[
                                    {i: 'M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z', t: 'Chasis Aluminio'},
                                    {i: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', t: 'Seguro Activo'},
                                    {i: 'M13 10V3L4 14h7v7l9-11h-7z', t: 'Energía Limpia'}
                                ].map((b, i) => (
                                    <div key={i} className="flex flex-col items-center justify-center p-3 text-center border-t border-zinc-800">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D9F836" strokeWidth="2.5" className="mb-2"><path strokeLinecap="round" strokeLinejoin="round" d={b.i}/></svg>
                                        <span className="text-[9px] font-black uppercase text-zinc-500 tracking-wider hidden sm:block">{b.t}</span>
                                    </div>
                                ))}
                            </div>

                            {/* 5. ABOVE FOLD DETAILS (ACCORDIONS) */}
                            <div className="mt-6 border-y border-zinc-800">
                                {[
                                    { t: 'Poder Bruto', a: 'Motor magnético sin escobillas. Trepa pendientes de 20° sin sudar ni reducir torque.' },
                                    { t: 'Seguridad Reactiva', a: 'Freno de disco trasero perforado ventilado + freno E-ABS frontal. Stop absoluto en 3.5 metros.' },
                                    { t: 'Empaque y Logística', a: 'Despacho directo sin intermediarios. Llevamos la caja a tu destino y abonas únicamente al confirmar físicamente la unidad.' }
                                ].map((ac, i) => (
                                    <div key={i} className="border-b border-zinc-800 last:border-0 bg-[#0E0E10]">
                                        <button onClick={() => setOpenSpecAcc(openSpecAcc===i?null:i)} className="w-full text-left py-4 flex items-center justify-between text-xs font-black uppercase tracking-widest text-[#D9F836]">
                                            <span className="italic">{ac.t}</span>
                                            <span className="text-white text-lg font-normal">{openSpecAcc===i?'-':'+'}</span>
                                        </button>
                                        <AnimatePresence>
                                            {openSpecAcc === i && (
                                                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="pb-4 text-xs font-bold text-zinc-400 uppercase tracking-wider leading-relaxed">
                                                    {ac.a}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 6. ENDLESS MARQUEE (AUTHORITY) */}
                <div className="w-[100vw] overflow-hidden py-5 bg-[#D9F836] text-[#0E0E10] my-16 border-y-4 border-white relative left-[50%] -translate-x-[50%] transform -rotate-1">
                    <div className="flex whitespace-nowrap animate-marquee font-black uppercase text-xl md:text-3xl tracking-tighter italic">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="flex items-center gap-12 px-6">
                                <span>35 KM/H MAX SPEED</span><span>⚡</span>
                                <span>ZERO EMISIONES</span><span>⚡</span>
                                <span>CARGA HIPER RÁPIDA</span><span>⚡</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 7. WHY TO USE / BENEFITS */}
                <div id="motor" className="max-w-7xl mx-auto px-4 lg:px-8 py-20 pb-20">
                    <div className="text-center mb-20 relative">
                        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-transparent" style={{ WebkitTextStroke: '2px white' }}>Por qué<br/>somos los reyes.</h2>
                        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white absolute inset-0 -translate-x-2 translate-y-2 opacity-50 z-[-1] blur-sm">Por qué<br/>somos los reyes.</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { n: '01', t: 'Celdas de Litio', d: 'Baterías de alta densidad grado automotriz. Hasta 45 KM de autonomía real en calle urbana parando y arrancando.' },
                            { n: '02', t: 'Llantas Sólidas', d: 'Neumáticos Honeycomb antipinchazos de 8.5". Absorción de impactos masiva para no sentir las grietas de la calle.' },
                            { n: '03', t: 'Plegado 3 Seg.', d: 'El mecanismo de bloqueo del chasis es de aleación de aviación. Desarma tu movilidad, mételo al maletero o a la oficina al instante.' }
                        ].map((b, i) => (
                            <div key={i} className="bg-[#18181B] border-l-4 border-[#D9F836] p-8 pb-12 relative overflow-hidden group hover:bg-zinc-800 transition-colors">
                                <span className="absolute -top-4 -right-4 text-8xl font-black italic text-white/5">{b.n}</span>
                                <div className="text-4xl font-black italic text-zinc-700 mb-4">{b.n}</div>
                                <h3 className="text-xl font-black uppercase tracking-tight text-white mb-4">{b.t}</h3>
                                <p className="text-sm font-bold text-zinc-400 leading-relaxed">{b.d}</p>
                                <div className="absolute bottom-0 left-0 w-full h-1 bg-[#D9F836] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 8. HOW TO USE (VISUAL GUIDE) */}
                <div className="bg-[#18181B] py-24 border-y border-zinc-800">
                    <div className="max-w-7xl mx-auto px-4 lg:px-8">
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-center mb-16 text-white italic">Domina el asfalto.</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { st: 'Despliegue', ic: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M5 12h14M12 5v14"/></svg>, d: 'Libera la traba inferior, sube el mástil de acero y asegura.' },
                                { st: 'Energía', ic: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>, d: 'Presiona el botón frontal LED. Selecciona tu modo de velocidad (Eco / Normal / Xtreme).' },
                                { st: 'Aceleración', ic: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"/><path d="M12 8l4 4-4 4M8 12h7"/></svg>, d: 'Dale un ligero empuje y aplica torsión en el gatillo. Siente el viento.' }
                            ].map((s, i) => (
                                <div key={i} className="bg-[#0E0E10] text-center p-8 border border-zinc-800 relative z-10 before:absolute before:inset-0 before:bg-[#D9F836] before:z-[-1] before:transform before:translate-x-2 before:translate-y-2 before:transition-transform hover:before:translate-x-0 hover:before:translate-y-0 before:-skew-x-6">
                                    <div className="w-16 h-16 bg-[#18181B] border border-zinc-700 text-[#D9F836] mx-auto rounded-full flex items-center justify-center mb-6">
                                        <div className="w-8 h-8">{s.ic}</div>
                                    </div>
                                    <h4 className="text-2xl font-black uppercase italic tracking-widest text-[#D9F836] mb-3">{s.st}</h4>
                                    <p className="text-sm font-bold text-zinc-400">{s.d}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 9. DEEP DIVE MULTIMEDIA */}
                <div className="py-32 relative text-center min-h-[50vh] flex flex-col items-center justify-center border-b border-zinc-800">
                    <div className="absolute inset-0 bg-[#0E0E10] z-0">
                        {/* Fake Light streaks for speed illusion */}
                        {[...Array(10)].map((_, i) => (
                            <div key={i} className="absolute h-1 bg-[#D9F836] shadow-[0_0_10px_#D9F836] rounded-full animate-pulse opacity-20" style={{ left: `${Math.random()*100}%`, top: `${Math.random()*100}%`, width: `${Math.random()*200+50}px`, animationDuration: `${Math.random()*2+1}s` }}></div>
                        ))}
                    </div>
                    <div className="relative z-10 max-w-2xl px-6">
                        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-6 italic transform -skew-x-12">Pantalla Táctica LED.</h2>
                        <p className="text-base text-zinc-400 font-bold max-w-lg mx-auto uppercase tracking-wider mb-8">Vigila tu velocidad, kilometraje restante y potencia térmica a plena luz del sol. El brillo del dashboard aniquila los destellos externos y te mantiene en control absoluto.</p>
                        <div className="inline-block border-2 border-[#D9F836] text-[#D9F836] px-8 py-3 font-black uppercase tracking-[0.3em] bg-[#18181B]">NO TE DETENGAS</div>
                    </div>
                </div>

                {/* 10. COMPARISON TABLE */}
                <div className="max-w-6xl mx-auto px-4 lg:px-8 py-24">
                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-center italic mb-12">No corremos, <span className="text-cyan-500">Volamos.</span></h2>
                    <div className="bg-[#18181B] border-4 border-zinc-800 transform -skew-x-6 overflow-hidden">
                        <div className="grid grid-cols-3 bg-zinc-900 border-b border-zinc-800 p-6 text-[10px] md:text-xs font-black uppercase tracking-widest skew-x-6">
                            <div className="text-zinc-500">Métrica</div>
                            <div className="text-[#D9F836] text-center italic text-sm md:text-base">StreetKinetics Pro</div>
                            <div className="text-zinc-500 text-center">Clon Plástico</div>
                        </div>
                        {[
                            { k: 'Tiempo de Vida', u: '5+ Años Chasis Reforzado', t: '1 Año máximo' },
                            { k: 'Pendientes', u: 'Trepa 20° Inclinación', t: 'Se ahoga en 10°' },
                            { k: 'Visibilidad', u: 'Luz Foco 30 Metros', t: 'Pobre/No ilumina asfalto' },
                            { k: 'Repuestos', u: 'Ecosistema Abierto Universal', t: 'Propietario Inconseguible' }
                        ].map((r, i) => (
                            <div key={i} className="grid grid-cols-3 p-6 border-b border-zinc-800/50 hover:bg-zinc-800 transition skew-x-6">
                                <div className="font-bold text-zinc-400 text-xs md:text-sm uppercase">{r.k}</div>
                                <div className="text-center font-black text-white text-sm md:text-base italic">{r.u}</div>
                                <div className="text-center font-bold text-zinc-500 line-through text-xs md:text-sm">{r.t}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 11. RISK REVERSAL WARRANTY */}
                <div className="max-w-5xl mx-auto px-4 lg:px-8 py-16">
                    <div className="bg-[#D9F836] p-1 border-4 border-zinc-800 transform skew-1">
                        <div className="bg-[#0E0E10] px-8 py-12 flex flex-col md:flex-row items-center gap-12 text-center md:text-left">
                            <div className="text-8xl flex-shrink-0 relative">
                                🛡️
                            </div>
                            <div>
                                <h3 className="text-3xl font-black uppercase text-white tracking-widest mb-4 italic">Cobertura Cero-Estrés.</h3>
                                <p className="text-zinc-400 font-bold uppercase tracking-wider text-sm leading-relaxed">Olvídate de comprar a oscuras. Reserva hoy llenando los datos para congelar el precio de promoción. Hacemos el envío hasta tu zona y pagarás a contra-entrega. 1 año de garantía sobre motor y circuito blindado, soportado nacionalmente.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 12. BRAND ETHOS */}
                <div className="py-24 bg-[#18181B] text-center border-y border-zinc-800 px-6 mt-12">
                    <div className="max-w-3xl mx-auto">
                        <div className="text-[#D9F836] font-black uppercase tracking-[0.5em] text-xs mb-4">Nuestra Sangre</div>
                        <h3 className="text-3xl md:text-5xl font-black lowercase tracking-tighter text-white mb-6">f*ck_el_transito.</h3>
                        <p className="text-lg font-bold text-zinc-500 uppercase tracking-widest">Nacimos para recuperar el tiempo perdido en autos parados evaporando combustible y gastando dinero. Construimos artillería móvil. Somos dueños del asfalto y cortamos tu tiempo de trayecto por la mitad.</p>
                    </div>
                </div>

                {/* 13. FAQ */}
                <div className="max-w-4xl mx-auto px-4 lg:px-8 py-24">
                    <h2 className="text-4xl font-black uppercase tracking-tighter text-center italic mb-12">Preguntas<br/>Frecuentes</h2>
                    <div className="space-y-2">
                        {[
                            {q: '¿Se necesita licencia para usarlo en la ciudad?', a: 'En la gran mayoría de regulaciones latinoamericanas, no requiere chapa ni registro municipal por ser un Variable Electric Vehicle (VEV) bajo límites específicos.'},
                            {q: '¿Cuánto cuesta recargar la batería completa?', a: 'Sorprendentemente ridículo. Una carga de 0 a 100% impacta tu factura eléctrica en centavos. Es inmensamente más barato que cualquier pasaje o combustible.'},
                            {q: '¿Cómo funciona la compra presencial segura?', a: 'Para evitarte miedos, usamos entrega propia en coberturas urbanas. Llena el pedido, te agendamos, llegamos, bajas a verlo y luego pagas.'}
                        ].map((f, i) => (
                            <div key={i} className="bg-[#18181B] border-2 border-zinc-800 hover:border-[#D9F836]/50 transition-colors">
                                <button onClick={() => setFaqOpen(faqOpen===i?null:i)} className="w-full text-left px-8 py-6 flex items-center justify-between font-black uppercase text-white tracking-widest text-sm">
                                    {f.q}
                                    <span className="text-[#D9F836] text-xl font-black">{faqOpen===i?'-':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {faqOpen === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-8 pb-6 text-sm font-bold text-zinc-400 uppercase tracking-wider leading-relaxed">
                                            {f.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 14. EXPANDED REVIEWS (UGC) */}
                <div id="reseñas" className="max-w-7xl mx-auto px-4 lg:px-8 py-16 border-t border-zinc-800">
                    <h2 className="text-4xl font-black uppercase italic tracking-tighter text-white mb-2 text-center">Leyendas Locales.</h2>
                    <p className="text-center font-bold text-zinc-500 uppercase tracking-widest text-xs mb-16">Calles recorridas. Tiempo salvado.</p>
                    <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                        {[
                            { r: "Llego volando a la facultad de medicina. Mientras mis compañeros lloran por el bus, yo llego antes y fresco. Aparte la envidia que genera el diseño.", n: "Alejandro B." },
                            { r: "La potencia de aceleración te tira hacía atrás al principio. Tienes demasiada fuerza en cuesta arriba y yo peso 85KG. No se achicó nunca.", n: "Mateo R." },
                            { r: "Compré el modelo para la oficina. Se pliega tan simple que lo meto debajo del escritorio. Ya ahorré la cuota del equipo en lo que no gasté de nafta este mes.", n: "Verónica S." },
                            { r: "Increíble las ruedas macizas!! Destruí llantas de otros en cristales rotos. Estos son inmortales. Duro pero seguro.", n: "Christian V." }
                        ].map((rev, i) => (
                            <div key={i} className="bg-[#18181B] border border-zinc-800 p-8 transform hover:-scale-y-1 hover:scale-y-[1.01] transition-transform shadow-[5px_5px_0_rgba(217,248,54,0.1)]">
                                <div className="text-[#D9F836] flex gap-1 mb-6">
                                    {[1,2,3,4,5].map(x=><svg key={x} width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>)}
                                </div>
                                <p className="text-sm font-bold text-zinc-300 uppercase tracking-wider leading-relaxed mb-6 italic">"{rev.r}"</p>
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-zinc-800 font-black text-white flex items-center justify-center border border-zinc-700">{(rev.n).charAt(0)}</div>
                                    <div className="font-black text-xs uppercase tracking-widest text-[#D9F836]">{rev.n}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 15. CHECKOUT */}
                <div id="checkout-scooter" className="py-24 md:py-32 bg-[#D9F836] relative overflow-hidden mt-20">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                    <div className="max-w-4xl mx-auto px-4 lg:px-8 relative z-10 flex flex-col md:flex-row gap-12 items-center">
                        <div className="flex-1 text-[#0E0E10] text-center md:text-left">
                            <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic mb-4">La ciudad<br/>es tuya.</h3>
                            <p className="text-lg font-bold uppercase tracking-widest mb-6 border-l-4 border-black pl-4">Asegura stock contra-entrega. Llenando aquí aceleras tu independencia.</p>
                            <div className="text-3xl font-black">{fmtPrice(product.price)}</div>
                        </div>
                        <div className="flex-1 w-full flex flex-col items-center">
                            <form className="w-full bg-[#0E0E10] p-8 border-4 border-black transform -skew-x-2" onSubmit={e=>e.preventDefault()}>
                                <div className="space-y-4 font-sans skew-x-2">
                                    <input type="text" className="w-full bg-[#18181B] border-b-2 border-zinc-800 focus:border-[#D9F836] text-white font-bold px-5 py-4 outline-none uppercase tracking-widest text-xs" placeholder="[ Operador / Nombre ]" />
                                    <input type="tel" className="w-full bg-[#18181B] border-b-2 border-zinc-800 focus:border-[#D9F836] text-white font-bold px-5 py-4 outline-none uppercase tracking-widest text-xs" placeholder="[ Frecuencia / WhatsApp ]" />
                                    <textarea rows={2} className="w-full bg-[#18181B] border-b-2 border-zinc-800 focus:border-[#D9F836] text-white font-bold px-5 py-4 outline-none resize-none uppercase tracking-widest text-xs" placeholder="[ Zona de Drop / Dirección de envío ]" />
                                    <button className="w-full h-[70px] bg-white text-black font-black uppercase tracking-[0.2em] hover:bg-[#D9F836] transition-colors flex items-center justify-center gap-3">
                                        Despachar Unidad YA
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </main>

            {/* STICKY MOBILE CTA */}
            <div className="md:hidden fixed bottom-4 left-4 right-4 z-50">
                <div className="bg-[#18181B] border-2 border-[#D9F836] p-3 flex items-center justify-between shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                    <div className="pl-2">
                        <div className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">Liquidación</div>
                        <div className="font-black text-white text-lg leading-none italic">{fmtPrice(product.price)}</div>
                    </div>
                    <button onClick={() => document.getElementById('checkout-scooter')?.scrollIntoView({ behavior: 'smooth' })} className="bg-[#D9F836] text-black font-black uppercase text-[10px] tracking-widest px-6 py-3">
                        Hacer Clic
                    </button>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{__html: `
                @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
                .animate-marquee { animation: marquee 12s linear infinite; }
            `}} />
        </div>
    );
};

export default PdpScooterUrban;
