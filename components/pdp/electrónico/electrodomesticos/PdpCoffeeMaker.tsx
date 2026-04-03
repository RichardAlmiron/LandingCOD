'use client';
import React, { useState } from 'react';
import { StoreData, Product } from '@/lib/types';
import EnhancedProductGallery from '@/components/pdp/EnhancedProductGallery';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { data: StoreData; product: Product; }

const PdpCoffeeMaker: React.FC<Props> = ({ data, product }) => {
    const [openSpecAcc, setOpenSpecAcc] = useState<number | null>(0);
    const [faqOpen, setFaqOpen] = useState<number | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const ai = product.aiContent;
    const fmtPrice = (n: number) => { const s = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); return `Gs. ${s}`; };
    
    // Aesthetic Palette: Barista Elite (Stainless Steel & Espresso)
    const bg = '#1c1917'; // Stone 900
    const textMain = '#fafaf9'; // Stone 50
    const accentCrema = '#d97706'; // Amber 600 (Crema)
    const metalBg = '#292524'; // Stone 800

    return (
        <div style={{ background: bg, color: textMain, fontFamily: "'Inter', sans-serif" }} className="overflow-x-hidden selection:bg-amber-600 selection:text-white antialiased">
            
            {/* 0. AMBIENT STEAM / BRUSHED METAL */}
            <div className="fixed inset-0 pointer-events-none z-0 opacity-20" style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/brushed-alum-dark.png')` }}></div>

            {/* 1. TOP NAV */}
            <header className="sticky top-0 z-50 bg-[#1c1917]/90 backdrop-blur-xl border-b border-[#292524]">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-5 flex items-center justify-between">
                    <div className="text-xl font-serif italic tracking-tight text-white flex gap-2 items-center">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2"><path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3"/></svg>
                        Nero<span className="text-amber-600">Crema</span>
                    </div>
                    <nav className="hidden md:flex gap-10">
                        {['Extracción', 'Molienda', 'Vapor'].map((item) => (
                            <a key={item} href={`#${item.toLowerCase()}`} className="text-[10px] font-bold tracking-[0.2em] uppercase text-stone-400 hover:text-amber-500 transition-colors">
                                {item}
                            </a>
                        ))}
                    </nav>
                </div>
            </header>

            <main className="relative z-10 w-full overflow-hidden">
                {/* 2. BREADCRUMBS & MICRO-LOGISTICS */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 pb-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-800 pb-4">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-[#d97706] flex items-center gap-2">
                            Molinillo Premium <span className="text-stone-700">/</span> <span className="text-stone-300">{product.title.substring(0, 15)}...</span>
                        </div>
                        <div className="inline-flex items-center gap-2 text-[10px] font-bold text-stone-300 uppercase tracking-widest bg-stone-800 px-4 py-2 rounded">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2"><path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/></svg>
                            Logística Contra Entrega (C.O.D)
                        </div>
                    </div>
                </div>

                {/* 3. HERO (BARISTA FOCUSED) */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 lg:py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <div className="flex flex-col relative pt-4">
                            {/* Italian Touch Badge */}
                            <div className="flex items-center gap-3 mb-8">
                                <div className="text-[10px] font-black bg-stone-800 border border-stone-700 text-stone-300 px-3 py-1.5 uppercase tracking-[0.2em]">15 Bares Pump</div>
                                <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest">Extracción Italiana Perfecta</span>
                            </div>
                            
                            <h1 className="text-5xl md:text-7xl font-serif italic tracking-tighter text-white leading-none mb-6">
                                {ai?.enhancedTitle || product.title}
                            </h1>
                            <p className="text-base font-light text-stone-400 mb-10 leading-relaxed pl-4 border-l-2 border-amber-600">
                                {ai?.enhancedDescription || product.description || 'Olvídate de las cápsulas plásticas carísimas. Molino cónico integrado, presión de 15 bares constantes y una varita de vapor micro-espuma para hacer Latte Art en tu propia cocina.'}
                            </p>

                            <div className="bg-[#292524] rounded-sm p-8 relative shadow-2xl border border-stone-700">
                                <div className="absolute top-0 right-0 w-40 h-40 bg-amber-600/10 blur-[50px] rounded-full pointer-events-none"></div>
                                <div className="flex items-end gap-6 mb-8 relative z-10">
                                    <span className="text-5xl font-black text-white font-serif">{fmtPrice(product.price)}</span>
                                    {product.originalPrice && <span className="text-lg font-bold text-stone-500 line-through pb-1 decoration-stone-500/50">{fmtPrice(product.originalPrice)}</span>}
                                </div>
                                <button onClick={() => document.getElementById('checkout-action')?.scrollIntoView({ behavior: 'smooth' })} className="w-full h-[64px] bg-amber-600 text-stone-900 font-bold uppercase tracking-widest text-sm hover:bg-amber-500 transition-colors flex items-center justify-center gap-3 rounded-sm shadow-[0_0_20px_rgba(217,119,6,0.3)]">
                                    Adquirir Espressera
                                </button>
                            </div>

                            {/* 4. TRUST BADGES FAST */}
                            <div className="grid grid-cols-4 gap-2 mt-6">
                                {[
                                    {v: '54mm', l: 'Portafiltro'},
                                    {v: 'PID', l: 'Temp Control'},
                                    {v: 'Acero', l: 'Inoxidable'},
                                    {v: 'C.O.D', l: 'Garantizado'}
                                ].map((b, i) => (
                                    <div key={i} className="flex flex-col items-center justify-center py-4 bg-stone-900/50 border border-stone-800 rounded-sm">
                                        <span className="text-stone-200 font-serif font-bold text-base italic">{b.v}</span>
                                        <span className="text-[9px] font-bold text-stone-500 uppercase tracking-widest mt-1">{b.l}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

 <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="relative bg-[#292524] rounded-full border-4 border-stone-800 flex items-center justify-center shadow-2xl group">
                            {/* Inner coffee ring effect */}
                            <div className="absolute inset-4 rounded-full border border-[#d97706]/30 pointer-events-none group-hover:scale-105 transition-transform duration-1000"></div>
                            
                            <div className="relative z-10 w-3/4 h-3/4 bg-stone-900 rounded-full shadow-2xl flex items-center justify-center overflow-hidden border border-stone-700">
                                <EnhancedProductGallery product={product} accentColor={accentCrema} />
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* 5. SPECIFICATION ACCORDIONS */}
                <div id="extracción" className="max-w-4xl mx-auto px-4 md:px-8 py-16">
                    <h2 className="text-2xl font-serif text-white mb-8 text-center italic">Ingeniería de Extracción.</h2>
                    <div className="border border-stone-700 bg-[#292524]">
                        {[
                            { t: 'Molinillo Cónico de Precisión', a: 'El café empieza a oxidarse apenas lo mueles. Esta máquina cuenta con cuchillas cónicas de acero con 15 niveles de molienda para extraer el grano directamente sobre el portafiltro justo antes de lanzar el agua.' },
                            { t: 'Sistema PID (Control Térmico)', a: 'El agua debe golpear el grano a exactamente 93°C. Si varía 2 grados, tu café sabrá ácido o quemado. El procesador PID monitoriza la caldera para que nunca te equivoques.' },
                            { t: 'Recibe en tu Cocina, Paga en tu Puerta', a: 'Una máquina pesada hecha de metales reales (10kg). No te obligamos a pagar por adelantado. Procesamos la compra, la enviamos, abres la tapa superior, inspeccionas el molino y recién allí entregas el pago.' }
                        ].map((ac, i) => (
                            <div key={i} className="border-b border-stone-700 last:border-b-0 hover:bg-stone-800 transition-colors">
                                <button onClick={() => setOpenSpecAcc(openSpecAcc===i?null:i)} className="w-full text-left px-8 py-6 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-stone-200">
                                    <div className="flex items-center gap-4">
                                        <div className="w-1.5 h-1.5 rounded-full bg-amber-600"></div>
                                        {ac.t}
                                    </div>
                                    <span className="text-amber-500 font-serif text-2xl font-light italic">{openSpecAcc===i?'-':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {openSpecAcc === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-8 pb-8 pl-[2.25rem] text-sm font-light text-stone-400 leading-relaxed">
                                            {ac.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 6. ENDLESS MARQUEE */}
                <div className="w-[100vw] overflow-hidden py-6 bg-stone-950 border-y border-stone-800 relative left-[50%] -translate-x-[50%] mt-8 flex transform rotate-1 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                    <div className="flex whitespace-nowrap animate-marquee font-serif uppercase text-2xl tracking-[0.2em] text-stone-400 italic">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="flex items-center gap-10 px-8">
                                <span>CAFÉ_EN_GRANO</span><span className="text-amber-600">✦</span>
                                <span>SIN_CÁPSULAS</span><span className="text-amber-600">✦</span>
                                <span>CREMA_PERFECTA</span><span className="text-amber-600">✦</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 7. WHY TO USE / BENEFITS */}
                <div id="molienda" className="max-w-7xl mx-auto px-4 md:px-8 py-32">
                    <div className="text-center mb-20">
                        <span className="text-amber-600 font-bold text-xs uppercase tracking-[0.3em] mb-4 block">Calculadora Económica</span>
                        <h2 className="text-4xl md:text-6xl font-serif text-white italic">Mata la<br/>Cápsula.</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { n: '01', t: 'Ahorro Abismal', d: 'Las cápsulas plásticas te cobran el café a precio de oro (aprox. $150 el kilo). Comprar granos frescos de especialidad cuesta una fracción de eso, salvando tu inversión en menos de un año.' },
                            { n: '02', t: 'Cero Basura', d: 'Miles de millones de cápsulas de aluminio y plástico terminan en vertederos porque no son reciclables. Usar café en grano solo produce posos orgánicos (ideal para abono de plantas).' },
                            { n: '03', t: 'Sabor de Cafetería', d: 'A los 10 minutos de molido, el café pierde el 50% de sus compuestos aromáticos. Imagina el que viene pre-molido hace 6 meses en un tubo. Esto te da frescura absoluta.' }
                        ].map((b, i) => (
                            <div key={i} className="bg-[#292524] border border-stone-700 px-8 py-12 text-center group hover:border-amber-600/50 transition-colors relative overflow-hidden">
                                <div className="text-9xl font-serif font-black text-stone-800 opacity-20 absolute -top-8 -left-8 pointer-events-none">{b.n}</div>
                                <h3 className="text-lg font-bold uppercase tracking-widest text-stone-100 mb-6 relative z-10">{b.t}</h3>
                                <p className="text-sm font-light text-stone-400 leading-relaxed text-left relative z-10">{b.d}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 8. HOW TO USE / SET UP AESTHETIC */}
                <div id="vapor" className="bg-stone-950 py-32 border-t border-stone-800 flex items-center relative">
                    <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-20 mix-blend-overlay"></div>
                    
                    <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                            <div className="relative aspect-square border-8 border-[#292524] rounded-full flex items-center justify-center p-8 bg-[#1c1917]">
                                <div className="absolute inset-0 rounded-full border border-stone-700 m-8 border-dashed"></div>
                                <div className="text-center">
                                    <div className="text-amber-600 font-serif italic text-6xl mb-4">93°</div>
                                    <div className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">TEMPERATURA<br/>CALDERA</div>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-4xl md:text-5xl font-serif text-white mb-10 italic">El Ritual<br/>Matutino.</h2>
                                <p className="text-stone-400 font-light mb-12 leading-relaxed text-lg">No es solo apretar un botón; es una artesanía. Tomarte 3 minutos a la mañana para ti mismo te cambia el día completo.</p>
                                
                                <div className="space-y-10">
                                    {[
                                        { s: 'Grind', d: 'Empuja el portafiltro contra el botón del molino. 18 gramos de grano fresco lloverán en forma de montaña en el cesto.' },
                                        { s: 'Tamp', d: 'Usa el prensador magnético incluido para aplanar el café ejerciendo 15 kilos de presión sobre el disco. El agua deberá pelear para pasar.' },
                                        { s: 'Extract', d: 'Gira, bloquea y aprieta el botón doble. Observa bajar esa crema color caramelo espeso mientras el aroma inunda la cocina.' }
                                    ].map((s, i) => (
                                        <div key={i} className="flex gap-8 items-start border-b border-stone-800 pb-8 last:border-0 last:pb-0">
                                            <div className="text-xs font-bold text-amber-600 uppercase tracking-[0.2em] w-20 shrink-0 mt-1">{s.s}</div>
                                            <p className="text-sm font-light text-stone-300 leading-relaxed">{s.d}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 9. DEEP DIVE MULTIMEDIA */}
                <div className="py-40 relative text-center border-t border-stone-800 bg-[#1c1917]">
                    {/* Fake steam blur glow */}
                    <div className="absolute inset-0 flex justify-center items-end opacity-30 pointer-events-none">
                        <div className="w-64 h-[500px] bg-white/10 blur-[100px] transform -translate-y-[20%]"></div>
                    </div>
                    
                    <div className="relative z-10 max-w-4xl mx-auto px-4">
                        <h2 className="text-5xl md:text-7xl font-serif italic text-white mb-8">Vapor Micro-Espuma.</h2>
                        <p className="text-lg md:text-xl font-light text-stone-400 leading-relaxed max-w-2xl mx-auto">
                            La varita de vapor manual calienta e inyecta aire en la leche fría creando texturas sedosas y densas. Podrás pintar rosas, tulipanes y corazones en tu taza como un profesional a los 2 meses de práctica.
                        </p>
                    </div>
                </div>

                {/* 10. COMPARISON TABLE */}
                <div className="max-w-5xl mx-auto px-4 md:px-8 py-32">
                    <div className="text-center mb-16">
                        <span className="text-amber-600 font-bold text-[10px] uppercase tracking-[0.3em] block mb-4">El Choque Térmico</span>
                        <h2 className="text-3xl font-serif text-white italic">Nuestra Espressera vs Cápsulas.</h2>
                    </div>
                    
                    <div className="border border-stone-800 bg-[#292524] rounded-sm p-1">
                        <div className="grid grid-cols-3 bg-stone-900 border-b border-stone-800 text-[10px] font-bold uppercase tracking-widest text-stone-500">
                            <div className="p-6">Estándar</div>
                            <div className="p-6 text-center text-amber-500 border-x border-stone-800">Doble Caldera / Molino</div>
                            <div className="p-6 text-center">Nespresso / Dolce</div>
                        </div>
                        {[
                            { k: 'Tiempo de Frescura', u: 'Molido a -10 segundos', t: 'Molido hace 6 meses' },
                            { k: 'Gasto por Café', u: '$15 - $20 pesos (Especialidad)', t: '$150 - $200 (Granel quemado)' },
                            { k: 'Impacto Ecológico', u: 'Posos (Abono orgánico)', t: 'Plástico/Aluminio al océano' },
                            { k: 'Capacidad de Leche', u: 'Varita de Microespuma Real', t: 'Pastilla química en polvo' }
                        ].map((r, i) => (
                            <div key={i} className="grid grid-cols-3 border-b border-stone-800 last:border-b-0 text-sm">
                                <div className="p-6 font-bold text-stone-300 flex items-center bg-stone-900/50">{r.k}</div>
                                <div className="p-6 font-light text-white text-center flex items-center justify-center border-x border-stone-800 bg-[#292524]">{r.u}</div>
                                <div className="p-6 font-medium text-stone-600 text-center flex items-center justify-center line-through">{r.t}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 11. RISK REVERSAL WARRANTY */}
                <div className="max-w-5xl mx-auto px-4 md:px-8 py-12">
                    <div className="bg-stone-900 p-10 md:p-12 rounded-sm border-l-4 border-amber-600 md:flex items-center gap-10 shadow-2xl">
                        <div className="w-16 h-16 border-2 border-stone-700 text-amber-500 rounded-full flex items-center justify-center font-serif text-3xl italic shrink-0 mb-6 md:mb-0">
                            ¡
                        </div>
                        <div>
                            <h3 className="text-xl font-bold uppercase tracking-widest mb-4 text-white">Transacción Offline Privada.</h3>
                            <p className="font-light text-stone-400 leading-relaxed text-sm">
                                Una torre de acero inoxidable requiere respeto logístico. Evitamos que introduzcas tu tarjeta de crédito online. Dejas tus datos base aquí, empacamos la máquina, y un cadete la deja en tu mesa. Solo sueltas el dinero cuando valides físicamente la pesada herramienta. 2 años de soporte en caldera.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 12. BRAND ETHOS */}
                <div className="py-32 border-y border-stone-800 mt-16 text-center px-4 bg-[#292524]">
                    <div className="max-w-3xl mx-auto">
                        <h3 className="text-4xl md:text-5xl font-serif text-white mb-8 italic">Eléctrico,<br/>pero Análogo.</h3>
                        <p className="text-base font-light text-stone-400 leading-loose mx-auto">Buscamos alejarte de las pantallas. Operar este mecanismo con sus manómetros, vapor de agua y ruidos mecánicos te devuelve la sensación de crear algo real con tus propias manos antes de salir a pelear con el mundo digital.</p>
                    </div>
                </div>

                {/* 13. FAQ */}
                <div className="max-w-4xl mx-auto px-4 md:px-8 py-24">
                    <div className="text-center mb-16">
                        <h2 className="text-2xl font-bold uppercase tracking-widest text-white">Buzón de Preguntas.</h2>
                    </div>
                    <div className="space-y-4">
                        {[
                            {q: '¿Qué tipo de granos debo comprar?', a: 'Cualquier café tostado natural (NO Torrado con azúcar ya que arruina el molino). Se aconseja Tueste Medio de cualquier tostador local para evitar aceites excesivos.'},
                            {q: '¿Es difícil de limpiar?', a: 'El portafiltro y la varita se lavan bajo la canilla en 10 segundos. La máquina tiene un botón de retrolavado que requiere solo 1 pastilla limpiadora al mes. Muy simple.'},
                            {q: '¿Cómo procedo con el recaudo presencial?', a: 'Fácil. Llenas el recuadro inferior, te llamaremos, ajustamos el horario, golpeamos tu puerta con la unidad inmaculada, y tú la abonas ahí al cadete sin usar tarjetas web.'}
                        ].map((f, i) => (
                            <div key={i} className="bg-[#292524] border border-stone-700">
                                <button onClick={() => setFaqOpen(faqOpen===i?null:i)} className="w-full text-left p-6 md:p-8 flex items-center justify-between font-bold text-xs text-white uppercase tracking-widest">
                                    <span>{f.q}</span>
                                    <span className="text-amber-600 text-xl font-serif italic">{faqOpen===i?'-':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {faqOpen === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 md:px-8 pb-8 text-sm font-light text-stone-400 leading-relaxed pt-2">
                                            {f.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 14. EXPANDED REVIEWS */}
                <div className="max-w-6xl mx-auto px-4 md:px-8 py-24 border-t border-stone-800 bg-stone-900">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-serif italic text-white mb-6">Baristas del Hogar.</h2>
                        <div className="flex justify-center text-amber-600">
                            {[...Array(5)].map((_,i) => <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { r: "Desde que compré esto dejé de ir a Starbucks. El nivel del café extraído no tiene ningún sentido, es dulce y fuerte. Me ahorró fortuna en 6 meses.", n: "Julieta D.", t: "Diseñadora" },
                            { r: "Pesadísima y senota que todos los componentes son acero de verdad. Me daba miedo pagar por internet algo tan caro, por suerte su método de entrega y pago en puerta me salvó.", n: "Gonzalo F.", t: "Arquitecto" },
                            { r: "La potencia de vapor no envidia nada a la máquina comercial que uso en mi trabajo. Pude hacer rosetas de latte art al tercer intento. Espectacular.", n: "Camila V.", t: "Barista Profesional" }
                        ].map((rev, i) => (
                            <div key={i} className="bg-[#292524] border border-stone-700 p-8 hover:border-amber-600/50 transition-colors">
                                <p className="text-sm font-light text-stone-300 leading-relaxed mb-10 italic">"{rev.r}"</p>
                                <div className="flex items-center justify-between border-t border-stone-800 pt-6">
                                    <div className="text-[10px] font-bold uppercase text-white tracking-widest">{rev.n}</div>
                                    <div className="text-[10px] font-light text-stone-500 uppercase">{rev.t}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 15. CHECKOUT */}
                <div id="checkout-action" className="py-24 md:py-32 bg-[#1c1917] relative border-t-[8px] border-amber-600 overflow-hidden">
                    <div className="max-w-6xl mx-auto px-4 md:px-8 relative grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24 items-center">
                        <div className="md:col-span-5 relative text-center md:text-left">
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-amber-600 mb-6 block">Operación Estándar</span>
                            <h3 className="text-5xl lg:text-7xl font-serif italic mb-6 text-white leading-none">Invoca la<br/>Máquina.</h3>
                            <p className="text-sm font-light text-stone-400 mb-10 leading-relaxed max-w-sm mx-auto md:mx-0">Registramos tu destino y enviamos el blindaje. Liquidas en efectivo cuando nuestro chofer aparque en tu puerta.</p>
                            
                            <div className="text-5xl font-black text-white">{fmtPrice(product.price)}</div>
                        </div>
                        
                        <div className="md:col-span-7 w-full">
                            <form className="bg-[#292524] p-8 md:p-12 border border-stone-700 shadow-2xl relative" onSubmit={e=>e.preventDefault()}>
                                <div className="space-y-6">
                                    <div>
                                        <input type="text" className="w-full bg-stone-900 border border-stone-700 focus:border-amber-600 text-white font-bold text-sm px-6 py-5 outline-none transition-all placeholder:text-stone-600 uppercase tracking-widest" placeholder="Identidad del Solicitante" />
                                    </div>
                                    <div>
                                        <input type="tel" className="w-full bg-stone-900 border border-stone-700 focus:border-amber-600 text-white font-bold text-sm px-6 py-5 outline-none transition-all placeholder:text-stone-600 uppercase tracking-widest" placeholder="Frecuencia Móvil (Celular)" />
                                    </div>
                                    <div>
                                        <textarea rows={2} className="w-full bg-stone-900 border border-stone-700 focus:border-amber-600 text-white font-bold text-sm px-6 py-5 outline-none transition-all resize-none placeholder:text-stone-600 uppercase tracking-widest" placeholder="Punto de Extracción (Dirección)" />
                                    </div>
                                    <div className="pt-6">
                                        <button className="w-full h-[70px] bg-amber-600 text-stone-900 font-bold uppercase tracking-[0.2em] text-sm hover:bg-white transition-all shadow-[0_0_20px_rgba(217,119,6,0.2)]">
                                            Generar Cita Operativa
                                        </button>
                                        <p className="text-center text-[10px] font-medium text-stone-500 uppercase mt-4 tracking-widest">Protocolo Seguro Offline</p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </main>

            {/* STICKY MOBILE CTA */}
            <div className="md:hidden fixed bottom-5 left-5 right-5 z-50">
                <div className="bg-[#292524] border border-stone-700 p-4 flex items-center justify-between shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
                    <div className="pl-2">
                        <div className="text-[10px] font-bold uppercase text-stone-400 tracking-widest">Abono Seguro</div>
                        <div className="font-serif text-amber-500 text-2xl tracking-tighter italic mt-1 leading-none">{fmtPrice(product.price)}</div>
                    </div>
                    <button onClick={() => document.getElementById('checkout-action')?.scrollIntoView({ behavior: 'smooth' })} className="bg-amber-600 text-stone-900 px-6 py-3 font-bold uppercase tracking-widest text-[11px] shadow-sm">
                        Extraer
                    </button>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{__html: `
                @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
                .animate-marquee { animation: marquee 16s linear infinite; }
            `}} />
        </div>
    );
};

export default PdpCoffeeMaker;
