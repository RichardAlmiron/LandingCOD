'use client';
import React, { useState } from 'react';
import { StoreData, Product } from '@/lib/types';
import EnhancedProductGallery from '@/components/pdp/EnhancedProductGallery';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { data: StoreData; product: Product; }

const PdpSmartGuitar: React.FC<Props> = ({ data, product }) => {
    const [openSpecAcc, setOpenSpecAcc] = useState<number | null>(0);
    const [faqOpen, setFaqOpen] = useState<number | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const ai = product.aiContent;
    const fmtPrice = (n: number) => { const s = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); return `Gs. ${s}`; };
    
    // Aesthetic Palette: Dark Concert / Neon Rock
    const bg = '#09090b'; // Zinc 950 (Stage darkness)
    const textMain = '#fafafa'; // Zinc 50
    const accentNeon = '#e11d48'; // Rose 600 (Laser Red / Magenta)
    const accentWood = '#b45309'; // Amber 700

    return (
        <div style={{ background: bg, color: textMain, fontFamily: "'Inter', sans-serif" }} className="overflow-x-hidden selection:bg-rose-600 selection:text-white antialiased">
            
            {/* 0. AMBIENT STAGE FOG & SPOTLIGHT */}
            <div className="absolute top-0 left-0 w-full h-[600px] overflow-hidden pointer-events-none z-0">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-full bg-rose-600/10 blur-[100px]" style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }}></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay"></div>
            </div>

            {/* 1. TOP NAV (Rock / Synthwave) */}
            <header className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-900/50 uppercase">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-5 flex items-center justify-between">
                    <div className="text-xl font-black tracking-[0.2em] text-white flex items-center gap-2">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e11d48" strokeWidth="2.5"><path d="M9 18V5l12-2v13"/><path d="M6 15H3c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h3c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2z"/><path d="M21 13h-3c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h3c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2z"/></svg>
                        NEXO<span className="text-rose-600">CHORD</span>
                    </div>
                    <nav className="hidden lg:flex gap-10">
                        {['Trastes LED', 'MIDI IN', 'AMP Nativo'].map((item) => (
                            <a key={item} href={`#${item.toLowerCase()}`} className="text-[10px] font-black tracking-[0.3em] text-zinc-500 hover:text-rose-500 transition-colors hover:scale-105 transform">
                                {item}
                            </a>
                        ))}
                    </nav>
                </div>
            </header>

            <main className="relative z-10 w-full overflow-hidden">
                {/* 2. BREADCRUMBS & MICRO-LOGISTICS */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 pb-4 relative z-20">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-900/80 pb-4">
                        <div className="text-[9px] font-black uppercase tracking-[0.3em] text-rose-500 flex items-center gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
                            INSTRUMENTOS <span className="text-zinc-600">/</span> <span className="text-white">{product.title.substring(0, 15)}...</span>
                        </div>
                        <div className="text-[10px] font-black text-rose-400 uppercase tracking-widest border border-rose-900/50 bg-rose-950/20 px-3 py-1.5 rounded">
                            Envío Blindado en Estuche (C.O.D)
                        </div>
                    </div>
                </div>

                {/* 3. HERO (STAGE PRESENCE) */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 lg:py-20 relative">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="flex flex-col relative z-20">
                            {/* Pro Gear Badge */}
                            <div className="flex items-center gap-4 mb-8">
                                <div className="text-[10px] font-black bg-rose-600 text-white px-3 py-1 uppercase tracking-[0.3em]">Cuerpo de Caoba</div>
                                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">+ Procesador ARM</span>
                            </div>
                            
                            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-200 to-zinc-600 leading-[0.9] mb-8">
                                {ai?.enhancedTitle || product.title}
                            </h1>
                            <p className="text-base md:text-xl font-medium text-zinc-400 mb-10 leading-relaxed border-l-4 border-rose-600 pl-6">
                                {ai?.enhancedDescription || product.description || 'La revolución de las 6 cuerdas. Olvídate de los pedales caros y cables enredados. Esta guitarra de madera maciza trae su propio amplificador interno, conexión Bluetooth y mástil con LEDs tutorizados para aprender a tocar destruyendo la curva de dificultad.'}
                            </p>

                            <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-3xl p-8 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-full h-[2px] bg-gradient-to-r from-transparent via-rose-600 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
                                <div className="flex flex-col sm:flex-row sm:items-end gap-6 mb-8 relative z-10">
                                    <span className="text-6xl font-black text-white tracking-tighter">{fmtPrice(product.price)}</span>
                                    {product.originalPrice && <span className="text-xl font-bold text-zinc-600 line-through pb-1">{fmtPrice(product.originalPrice)}</span>}
                                </div>
                                <button onClick={() => document.getElementById('checkout-action')?.scrollIntoView({ behavior: 'smooth' })} className="w-full h-[70px] bg-white text-zinc-950 font-black uppercase tracking-[0.2em] text-sm hover:bg-rose-600 hover:text-white transition-all duration-300 rounded-xl flex items-center justify-center gap-3">
                                    Comprar Instrumento
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18V5l12-2v13"/></svg>
                                </button>
                                <p className="text-[9px] font-mono text-zinc-500 mt-4 text-center uppercase tracking-widest">Liquidación Segura en Puerta (COD)</p>
                            </div>
                        </div>

                        <div className="relative z-10 lg:h-[700px] flex items-center justify-center perspective-[1000px]">
                            {/* Tech/Wood contrast background plate */}
                            <div className="absolute inset-0 bg-gradient-to-b from-rose-900/20 to-zinc-900/5 rounded-full blur-[80px]"></div>
                            
                            <motion.div initial={{ rotateY: -15, rotateX: 5 }} animate={{ rotateY: 0, rotateX: 0 }} transition={{ duration: 1.5, ease: "easeOut" }} className="w-full max-w-[500px] aspect-[3/4] relative bg-zinc-900 rounded-3xl border-2 border-zinc-800 p-4 shadow-[0_0_50px_rgba(225,29,72,0.2)] overflow-hidden">
                                <EnhancedProductGallery product={product} accentColor={accentNeon} />
                                {/* Laser string mockup overlay */}
                                <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[10%] flex justify-evenly pointer-events-none opacity-40 mix-blend-screen mix-blend-color-dodge">
                                    {[1,2,3,4,5,6].map(s => <div key={s} className="h-full w-[1px] bg-rose-500 shadow-[0_0_5px_rgba(225,29,72,1)]"></div>)}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* 4. TRUST BADGES TECHNICAL */}
                <div className="max-w-6xl mx-auto px-4 md:px-8 pb-16">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            {v: '50W', l: 'Amp Integrado'},
                            {v: '10h', l: 'Batería Litio'},
                            {v: 'MIDI', l: 'Salida Digital'},
                            {v: 'APP', l: 'iOS / Android'}
                        ].map((b, i) => (
                            <div key={i} className="flex flex-col items-center justify-center p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
                                <span className="text-white font-black text-2xl tracking-tighter mb-1">{b.v}</span>
                                <span className="text-[10px] font-bold text-rose-600 uppercase tracking-widest">{b.l}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 5. EXPERT ACCORDIONS */}
                <div id="trastes led" className="max-w-4xl mx-auto px-4 md:px-8 py-16">
                    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl">
                        {[
                            { t: 'Mástil con Pantalla LED Integrada', a: 'Aprender escala pentatónica o acordes complejos ya no requiere un libro grueso. Sincroniza la guitarra con la App y los LEDs en el diapasón se encenderán indicándote exactamente dónde poner los dedos en tiempo real como en "Guitar Hero".' },
                            { t: 'Amplificador y Efectos en tu Hombro', a: 'El cuerpo de la guitarra esconde un altavoz magnético direccional. Puedes sonar como si estuvieses en un concierto de metal, añadir Delay o Reverb atmosférico directo desde las perillas físicas sin enchufar a un equipo grande.' },
                            { t: 'Operación de Compra Local', a: 'No envíes dinero online ni arriesgues la integridad física del instrumento pidiéndolo del extranjero. Llenando la hoja abajo, nosotros llevamos esta obra de arte en su estuche hasta tus manos. Verificas la electrónica y pagas el importe al instante.' }
                        ].map((ac, i) => (
                            <div key={i} className="border-b border-zinc-800 last:border-b-0 hover:bg-zinc-800/50 transition-colors">
                                <button onClick={() => setOpenSpecAcc(openSpecAcc===i?null:i)} className="w-full text-left p-6 md:p-8 flex items-center justify-between text-xs font-black uppercase tracking-widest text-zinc-100">
                                    <div className="flex items-center gap-4">
                                        <div className="w-6 h-6 bg-rose-600 text-white rounded-full flex items-center justify-center text-[10px]">{i+1}</div>
                                        {ac.t}
                                    </div>
                                    <span className="text-rose-500 font-black text-2xl">{openSpecAcc===i?'-':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {openSpecAcc === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 md:px-8 pb-8 pl-[4.5rem] text-sm font-medium text-zinc-400 leading-relaxed">
                                            {ac.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 6. ENDLESS MARQUEE */}
                <div className="w-[100vw] overflow-hidden py-4 bg-rose-600 relative left-[50%] -translate-x-[50%] my-8 transform -skew-y-2">
                    <div className="flex whitespace-nowrap animate-marquee font-black uppercase text-2xl tracking-tighter text-white">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="flex items-center gap-10 px-8">
                                <span>DISTORSIÓN_NATIVA</span><span className="text-zinc-950">✚</span>
                                <span>CERO_CABLES</span><span className="text-zinc-950">✚</span>
                                <span>GRABACIÓN_BLUETOOTH</span><span className="text-zinc-950">✚</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 7. WHY TO USE / BENEFITS */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-32 border-b border-zinc-900">
                    <div className="text-center mb-24">
                        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-6 leading-none">Matando el<br/>Amplificador.</h2>
                        <p className="text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed font-medium">Llevar guitarra, cable largo, pedales y un cubo pesado de madera a tus ensayos o viajes se acabó. Todo ese estudio de grabación está dentro de esta guitarra.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { ic: 'M3 18v-6a9 9 0 0118 0v6', t: 'Práctica Silenciosa', d: 'Conecta tus auriculares directo a la ficha en la guitarra a las 3 AM. Tú escucharás que estás tocando en un estadio lleno con distorsión total, y tu familia solo oirá el suave sonido "Pluck" de la cuerda apagada.' },
                            { ic: 'M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2v11z', t: 'Tarjeta Sonido Interna', d: 'Graba en GarageBand o Ableton sin tener interfaz Focusrite externa. Conectas un cable USB-C a la PC y el sonido digital puro entra sin latencia. Literalmente es enchufar y grabar tu hit.' },
                            { ic: 'M13 10V3L4 14h7v7l9-11h-7z', t: 'Batería Titánica', d: 'Cargas tu celular cada día, pero la batería de polímero de litio de esta guitarra aguanta más de 10 horas tocando con el amplificador interno a máximo volumen. Se recarga con puerto Tipo-C en una hora.' }
                        ].map((b, i) => (
                            <div key={i} className="bg-zinc-900/80 border border-zinc-800 p-10 rounded-3xl hover:border-rose-500/50 transition-colors group">
                                <div className="w-16 h-16 bg-zinc-950 rounded-2xl flex items-center justify-center mb-8 border border-zinc-800">
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-rose-500 group-hover:scale-110 transition-transform"><path strokeLinecap="round" strokeLinejoin="round" d={b.ic}/></svg>
                                </div>
                                <h3 className="text-xl font-black uppercase tracking-tighter text-white mb-4">{b.t}</h3>
                                <p className="text-sm font-medium text-zinc-400 leading-relaxed">{b.d}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 8. HOW TO USE / SET UP AESTHETIC */}
                <div id="midi in" className="py-24 bg-zinc-950 relative overflow-hidden">
                    {/* Retro Grid Floor */}
                    <div className="absolute bottom-0 left-0 w-[200%] h-[50%] -translate-x-[25%] bg-[url('https://www.transparenttextures.com/patterns/black-stripes.png')] opacity-10" style={{ transform: 'perspective(500px) rotateX(60deg) translateY(100px)' }}></div>
                    
                    <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div className="order-2 lg:order-1 relative aspect-[4/3] bg-zinc-900 border border-zinc-800 rounded-3xl p-8 flex flex-col justify-center items-center shadow-2xl">
                                <div className="w-full max-w-[300px] space-y-4">
                                    {['Delay (Echo 300ms)', 'Reverb (Hall Room)', 'Overdrive (Tube Screamer)', 'Chorus (80s Wave)'].map((p, i) => (
                                        <div key={i} className="bg-zinc-950 border border-zinc-800 rounded-xl p-4 flex justify-between items-center group cursor-pointer hover:border-rose-500">
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 group-hover:text-white transition-colors">{p}</span>
                                            <div className="w-8 h-4 rounded-full bg-zinc-800 relative">
                                                <div className={`absolute top-0.5 ${i<2 ? 'right-0.5 bg-rose-500' : 'left-0.5 bg-zinc-600'} w-3 h-3 rounded-full transition-all`}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="absolute -bottom-6 bg-rose-600 text-white text-[10px] font-black tracking-widest px-6 py-2 rounded-full uppercase shadow-[0_0_20px_rgba(225,29,72,0.5)]">Control por App</div>
                            </div>

                            <div className="order-1 lg:order-2">
                                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mb-8 leading-none">Pedalera Virtual<br/><span className="text-rose-500">Inyectada.</span></h2>
                                <p className="text-zinc-400 font-medium mb-10 leading-relaxed text-lg">Un botón en el mástil te permite conmutar entre 4 canales pre-grabados al instante en medio de la canción. Limpio suave, o distorsión metálica sucia; tú decides.</p>
                                
                                <div className="space-y-6">
                                    {[
                                        { s: '01', t: 'Saca el instrumento', d: 'Recibe el equipo COD. Viene ya afinada y con batería al 80%. Sácala de la funda premium.' },
                                        { s: '02', t: 'Elige tu sonido', d: 'Conecta tu celular Bluetooth y carga perfiles de sonido de guitarristas famosos directos a la memoria de la guitarra.' },
                                        { s: '03', t: 'Domina los Acordes', d: 'Pon el modo Tutorial en la App. El diapasón físico parpadeará en luces rojas mostrándote exactamente dónde poner tus dedos.' }
                                    ].map((s, i) => (
                                        <div key={i} className="flex gap-6 items-start bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800/80">
                                            <div className="text-rose-500 font-black text-xl leading-none mt-1">{s.s}</div>
                                            <div>
                                                <h4 className="text-sm font-black uppercase tracking-widest text-white mb-2">{s.t}</h4>
                                                <p className="text-sm font-medium text-zinc-500 leading-relaxed">{s.d}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 9. DEEP DIVE MULTIMEDIA */}
                <div id="amp nativo" className="py-40 relative text-center border-y border-zinc-900 bg-zinc-900 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950 z-10 pointer-events-none"></div>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-20 mix-blend-color-dodge"></div>
                    
                    <div className="relative z-20 max-w-4xl mx-auto px-4">
                        <div className="text-[10px] font-black uppercase tracking-[0.5em] text-rose-500 mb-8 border border-rose-500/30 px-6 py-2 rounded-full inline-block backdrop-blur-md bg-rose-500/10">Artesanía Híbrida</div>
                        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-8">Madera Análoga,<br/>Corazón Digital.</h2>
                        <p className="text-lg md:text-xl font-medium text-zinc-400 leading-relaxed max-w-2xl mx-auto">
                            No está hecha de plástico barato. El cuerpo macizo y el cuello son de caoba africana real, dando un sustain grueso y análogo que resuena en tu pecho, mientras el microprocesador ARM trabaja debajo de la madera procesando la señal matemática.
                        </p>
                    </div>
                </div>

                {/* 10. COMPARISON TABLE */}
                <div className="max-w-5xl mx-auto px-4 md:px-8 py-32">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black uppercase tracking-tighter text-white">Setup Evolucionado.</h2>
                    </div>
                    
                    <div className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] overflow-hidden shadow-2xl">
                        <div className="grid grid-cols-3 bg-zinc-950 border-b border-zinc-800 text-[9px] md:text-xs font-black uppercase tracking-widest text-zinc-500">
                            <div className="p-6 md:p-8">Infraestructura</div>
                            <div className="p-6 md:p-8 text-center text-rose-500 bg-rose-500/10 border-x border-zinc-800">SMART GUITAR NEXO</div>
                            <div className="p-6 md:p-8 text-center">Setup Clásico Madera</div>
                        </div>
                        {[
                            { k: 'Peso y Espacio (Bolso)', u: '3.5 Kg (Todo Incluido)', t: 'Guitarra (3kg) + Amp (15kg) + Cables' },
                            { k: 'Costo Total de Inicio', u: '1 Compra Fija', t: 'Compra Guitarra, luego Amp, luego Pedales' },
                            { k: 'Curva de Aprendizaje', u: 'Diapasón Interactivo LED', t: 'Libros en papel, mirar YouTube en laptop' },
                            { k: 'Entorno de Práctica', u: 'Auriculares (Silencio Total)', t: 'Ensordecer a los vecinos o no poder tocar' }
                        ].map((r, i) => (
                            <div key={i} className="grid grid-cols-3 border-b border-zinc-800/50 last:border-b-0 text-sm">
                                <div className="p-6 md:p-8 font-bold text-zinc-300 flex items-center bg-zinc-900/30">{r.k}</div>
                                <div className="p-6 md:p-8 font-black text-white text-center flex items-center justify-center bg-rose-950/20 border-x border-zinc-800 transition-colors shadow-[inner_0_0_30px_rgba(225,29,72,0.05)]">{r.u}</div>
                                <div className="p-6 md:p-8 font-medium text-zinc-600 text-center flex items-center justify-center line-through">{r.t}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 11. RISK REVERSAL WARRANTY */}
                <div className="max-w-5xl mx-auto px-4 md:px-8 py-12">
                    <div className="bg-gradient-to-r from-rose-900/20 to-zinc-900 border border-rose-900/50 p-10 md:p-14 rounded-[2rem] text-white md:flex items-center gap-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none"></div>
                        <div className="w-20 h-20 bg-rose-600 text-white font-black text-4xl rounded-2xl shrink-0 flex items-center justify-center shadow-[0_10px_30px_rgba(225,29,72,0.4)] mb-8 md:mb-0 relative z-10">
                            !
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-2xl font-black uppercase tracking-tight mb-4 text-white">Afinación Segura. Compra Íntegra.</h3>
                            <p className="font-medium text-rose-100/70 leading-relaxed text-sm">
                                Una madera tan noble e instrumentación láser no pueden caer en manos de correos genéricos. Un operario privado lleva tu instrumento en funda premium hasta la puerta de tu hogar o sala de ensayo. Abres el cierre, observas el acabado, verificas que enciende y ahí mismo haces la entrega del efectivo al cadete logístico. Sin fricción web.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 12. BRAND ETHOS */}
                <div className="py-24 border-y border-zinc-900 mt-16 text-center px-4 bg-zinc-950">
                    <div className="max-w-3xl mx-auto">
                        <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mb-8">El Futuro es<br/><span className="text-rose-500">Autónomo.</span></h3>
                        <p className="text-base font-medium text-zinc-500 leading-loose mx-auto">Jimi Hendrix hizo gritar su guitarra destrozando amplificadores gigantes a máximo volumen. Hoy, la rebelión no es ensuciar el sonido por fuera, es generar tornados de distorsión perfectos desde adentro mientras tú viajas ligero con tu acústica en la espalda.</p>
                    </div>
                </div>

                {/* 13. FAQ */}
                <div className="max-w-4xl mx-auto px-4 md:px-8 py-24">
                    <div className="text-center mb-16">
                        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em]">Hardware & Software</span>
                        <h2 className="text-3xl font-black uppercase tracking-tighter text-white mt-4">Rutas de Acceso Frecuente.</h2>
                    </div>
                    <div className="space-y-4">
                        {[
                            {q: '¿Sirve si soy completamente principiante?', a: 'Es la MEJOR opción. Descargas la App, seleccionas "Aprender Acordes", la pantalla de tu celular te mostrará ritmos y el mástil de la guitarra pintará una luz en la cuerda 6, traste 3, diciéndote donde pisar. Es un juego de seguir la luz.'},
                            {q: 'Si se acaba la batería... ¿Puedo tocarla igual?', a: '¡Por supuesto! El mueble es acústico puro. Sin batería funcionará como una guitarra acústica convencional, sonando perfectamente balanceada para tocar un fogón sin efectos.'},
                            {q: '¿Cómo funciona el pago Presencial COD?', a: 'Completa la orden abajo, agendamos día y hora. El chófer logístico va a tu puerta. Examinas la funda premium acolchada, la guitarra y su mástil impecable, y abonas con dinero/transferencia ahí en vivo sin pasarelas de pago de internet.'}
                        ].map((f, i) => (
                            <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-2xl hover:border-rose-500/30 transition-all">
                                <button onClick={() => setFaqOpen(faqOpen===i?null:i)} className="w-full text-left p-6 md:p-8 flex items-center justify-between font-bold text-sm text-zinc-100 uppercase tracking-widest">
                                    <span>{f.q}</span>
                                    <span className="text-rose-500 text-2xl font-mono leading-none">{faqOpen===i?'-':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {faqOpen === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 md:px-8 pb-8 text-sm font-medium text-zinc-400 leading-relaxed pt-2">
                                            {f.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 14. EXPANDED REVIEWS */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-24 border-t border-zinc-900 bg-zinc-950">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
                        <h2 className="text-3xl font-black uppercase tracking-tighter text-white">Backstage Reviews.</h2>
                        <div className="text-[10px] uppercase font-black tracking-widest bg-zinc-900 text-zinc-500 px-4 py-2 border border-zinc-800 rounded">100% Validated</div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { r: "Absoluta locura. Toco en mi departamento a las 2 de la mañana con auriculares puestos en modo Overdrive brutal. Siento el rock volándome la cabeza, e irónicamente mi novia duerme tranquila en la pieza de al lado.", n: "Felipe T.", t: "Músico Amateur" },
                            { r: "Traté de aprender a tocar guitarra tres veces en mi vida, y siempre lo dejaba. La luz en los trastes (fretboard) convirtió el aprendizaje en un juego. Ya saco canciones de Nirvana reales solo siguiendo los LEDs rosas.", n: "Carolina S.", t: "Software Tester / Principiante" },
                            { r: "El proceso de compra fue irreal. Llené mis datos, me llamaron, a las horas el tipo estaba en mi casa. Desenfundé esa maravilla de color mate oscuro, le pagué en cash rápido y empecé a componer. 10/10 la experiencia offline.", n: "Joaquín D.", t: "Productor Indie" }
                        ].map((rev, i) => (
                            <div key={i} className="bg-zinc-900 border border-zinc-800 p-10 rounded-2xl relative group hover:border-rose-500/50 transition-colors">
                                <p className="text-sm font-medium text-zinc-400 leading-relaxed mb-10 text-balance">"{rev.r}"</p>
                                <div className="border-t border-zinc-800 pt-6">
                                    <div className="text-sm font-black text-white uppercase tracking-widest mb-1">{rev.n}</div>
                                    <div className="text-[10px] font-bold text-rose-500 uppercase tracking-widest">{rev.t}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 15. CHECKOUT */}
                <div id="checkout-action" className="py-24 md:py-32 bg-zinc-950 relative border-t-4 border-rose-600 overflow-hidden">
                    <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] bg-rose-600/10 blur-[120px] rounded-full pointer-events-none"></div>
                    <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24 items-center">
                        <div className="md:col-span-5 relative">
                            <h3 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-6 text-white leading-[0.9]">Subir a<br/><span className="text-rose-500">Escena.</span></h3>
                            <p className="text-sm font-medium text-zinc-400 mb-10 leading-relaxed uppercase tracking-widest max-w-sm">No pidas si no estás dispuesto a rockear hoy. El equipo logístico aguarda tu orden para despacho (cash on delivery).</p>
                            
                            <div className="text-5xl lg:text-6xl font-black text-white tracking-tighter mix-blend-screen">{fmtPrice(product.price)}</div>
                        </div>
                        
                        <div className="md:col-span-7 w-full border border-zinc-800 rounded-[2rem] bg-zinc-900/50 backdrop-blur-xl p-8 md:p-12 shadow-2xl relative">
                            <form onSubmit={e=>e.preventDefault()}>
                                <div className="space-y-6">
                                    <div>
                                        <input type="text" className="w-full bg-zinc-950 border border-zinc-800 focus:border-rose-500 text-white font-bold text-sm px-6 py-5 rounded-xl outline-none transition-all placeholder:text-zinc-600 uppercase tracking-widest" placeholder="Nombre Oficial (Documento)" />
                                    </div>
                                    <div>
                                        <input type="tel" className="w-full bg-zinc-950 border border-zinc-800 focus:border-rose-500 text-white font-bold text-sm px-6 py-5 rounded-xl outline-none transition-all placeholder:text-zinc-600 uppercase tracking-widest" placeholder="Canal Celular Principal" />
                                    </div>
                                    <div>
                                        <textarea rows={2} className="w-full bg-zinc-950 border border-zinc-800 focus:border-rose-500 text-white font-bold text-sm px-6 py-5 rounded-xl outline-none transition-all resize-none placeholder:text-zinc-600 uppercase tracking-widest" placeholder="Escenario de Entrega (Ubicación Hogar/Trabajo)" />
                                    </div>
                                    <div className="pt-4">
                                        <button className="w-full h-[70px] bg-white text-zinc-950 font-black uppercase tracking-[0.3em] text-sm hover:bg-rose-600 hover:text-white transition-all duration-300 rounded-xl shadow-[0_0_40px_rgba(225,29,72,0.15)] hover:shadow-[0_0_40px_rgba(225,29,72,0.4)]">
                                            Acatar Ticket de Envío
                                        </button>
                                        <p className="text-center text-[10px] font-bold text-zinc-500 uppercase mt-6 tracking-widest">Protección C.O.D. Certificada</p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </main>

            {/* STICKY MOBILE CTA */}
            <div className="md:hidden fixed bottom-4 left-4 right-4 z-50">
                <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-3xl flex items-center justify-between shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
                    <div className="pl-3">
                        <div className="text-[10px] font-bold uppercase text-zinc-400 tracking-widest mb-1">Abono contra entrega</div>
                        <div className="font-black text-white text-xl tracking-tighter leading-none">{fmtPrice(product.price)}</div>
                    </div>
                    <button onClick={() => document.getElementById('checkout-action')?.scrollIntoView({ behavior: 'smooth' })} className="bg-rose-600 text-white rounded-xl px-6 py-3 font-black uppercase tracking-widest text-[11px] shadow-sm">
                        Comprar
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

export default PdpSmartGuitar;
