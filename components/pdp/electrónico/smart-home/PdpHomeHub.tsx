'use client';
import React, { useState } from 'react';
import { StoreData, Product } from '@/lib/types';
import EnhancedProductGallery from '@/components/pdp/EnhancedProductGallery';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { data: StoreData; product: Product; }

const PdpHomeHub: React.FC<Props> = ({ data, product }) => {
    const [openSpecAcc, setOpenSpecAcc] = useState<number | null>(0);
    const [faqOpen, setFaqOpen] = useState<number | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const ai = product.aiContent;
    const fmtPrice = (n: number) => { const s = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); return `Gs. ${s}`; };
    
    // Aesthetic Palette: Minimalist Domestic AI / Warm Frosted Glass
    const bg = '#f8fafc'; // Slate 50
    const textMain = '#334155'; // Slate 700
    const accentIndigo = '#6366f1'; // Indigo 500 (Voice AI Wave)
    const accentPink = '#f472b6'; // Pink 400 (Warmth)

    return (
        <div style={{ background: bg, color: textMain, fontFamily: "'Inter', sans-serif" }} className="overflow-x-hidden selection:bg-indigo-100 selection:text-indigo-900 antialiased">
            
            {/* 0. AMBIENT DOMESTIC GLOW */}
            <div className="absolute top-0 right-0 w-[60%] h-[800px] bg-gradient-to-bl from-indigo-100 via-pink-50 to-transparent pointer-events-none z-0"></div>
            <div className="absolute top-20 left-10 w-[400px] h-[400px] bg-sky-100/50 blur-[100px] rounded-full pointer-events-none z-0"></div>

            {/* 1. TOP NAV (Soft & Friendly) */}
            <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200/50">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 shadow-md flex items-center justify-center p-1.5">
                            <div className="w-full h-full bg-white rounded-full"></div>
                        </div>
                        <span className="font-bold text-xl tracking-tight text-slate-800">
                            Nexus<span className="font-light text-indigo-500">Hub</span>
                        </span>
                    </div>
                    <nav className="hidden lg:flex gap-8">
                        {['Intercom', 'Seguridad', 'Domótica'].map((item) => (
                            <a key={item} href={`#${item.toLowerCase()}`} className="text-[11px] font-semibold tracking-widest uppercase text-slate-500 hover:text-indigo-600 transition-colors">
                                {item}
                            </a>
                        ))}
                    </nav>
                </div>
            </header>

            <main className="relative z-10 w-full overflow-hidden">
                {/* 2. BREADCRUMBS & MICRO-LOGISTICS */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6 pb-2">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-white shadow-sm shadow-slate-200/50 px-4 py-2 rounded-full border border-slate-100 inline-flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                            SMART HOME / ASISTENTES / <span className="text-slate-700">{product.title.substring(0, 15)}...</span>
                        </div>
                        <div className="inline-flex items-center gap-2 text-[10px] font-bold text-indigo-600 uppercase tracking-widest">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                            Logística Blanca • Cash On Delivery
                        </div>
                    </div>
                </div>

                {/* 3. HERO (FRIENDLY DOMESTIC INTELLIGENCE) */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 lg:py-16 relative">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        <div className="flex flex-col relative z-20">
                            {/* AI Voice Badge */}
                            <div className="flex items-center gap-3 mb-6">
                                <span className="flex gap-1 items-center bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-full">
                                    {[1,2,3,4].map(i => <motion.div key={i} animate={{ height: [6, 12, 6] }} transition={{ duration: 1, repeat: Infinity, delay: i*0.2 }} className="w-1 bg-indigo-500 rounded-full"></motion.div>)}
                                </span>
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Reconocimiento Caper 3.0</span>
                            </div>
                            
                            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 leading-[1.05] mb-6">
                                {ai?.enhancedTitle || product.title}
                            </h1>
                            <p className="text-base md:text-lg font-medium text-slate-500 mb-10 leading-relaxed">
                                {ai?.enhancedDescription || product.description || 'El centro neurológico de tu casa. Una pantalla táctil rotativa flotante que apaga luces, muestra quién toca el timbre, reproduce Netflix en la cocina y sigue tu rostro mientras cocinas.'}
                            </p>

                            <div className="bg-white rounded-[2rem] p-8 relative shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-pink-100 to-indigo-50 rounded-bl-[100px] pointer-events-none opacity-50"></div>
                                <div className="flex flex-col sm:flex-row sm:items-end gap-6 mb-8 relative z-10">
                                    <span className="text-5xl font-bold text-slate-900 tracking-tight">{fmtPrice(product.price)}</span>
                                    {product.originalPrice && <span className="text-lg font-medium text-slate-400 line-through pb-1 decoration-slate-300">{fmtPrice(product.originalPrice)}</span>}
                                </div>
                                <button onClick={() => document.getElementById('checkout-action')?.scrollIntoView({ behavior: 'smooth' })} className="w-full h-[64px] bg-slate-900 text-white font-bold uppercase tracking-widest text-[11px] rounded-[1.5rem] hover:bg-indigo-600 transition-colors flex items-center justify-center gap-3 shadow-lg">
                                    Instalar Asistente
                                </button>
                                <p className="text-[10px] font-semibold text-slate-400 mt-4 text-center uppercase tracking-widest">Abono Seguro al Recepcionar</p>
                            </div>
                        </div>

                        <div className="relative z-10 flex items-center justify-center p-4">
 <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeOut" }} className="w-full max-w-[500px] relative bg-white rounded-[3rem] shadow-[0_30px_80px_-20px_rgba(99,102,241,0.15)] flex items-center justify-center border border-slate-50 ">
                                <EnhancedProductGallery product={product} accentColor={accentIndigo} />
                                
                                {/* UI Floating Element Mockups */}
                                <motion.div animate={{ y: [-5, 5, -5] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-10 -left-6 bg-white/90 backdrop-blur-md border border-slate-100 shadow-xl rounded-2xl p-4 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-500">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-bold text-slate-400 uppercase">Luces Salón</div>
                                        <div className="text-sm font-bold text-slate-800">Cálidas 40%</div>
                                    </div>
                                </motion.div>

                                <motion.div animate={{ y: [5, -5, 5] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }} className="absolute bottom-12 -right-6 bg-white/90 backdrop-blur-md border border-slate-100 shadow-xl rounded-2xl p-4 flex gap-3 items-center">
                                    <img src="https://i.pravatar.cc/100?img=5" alt="Avatar" className="w-10 h-10 rounded-full shadow-sm" />
                                    <div>
                                        <div className="text-[10px] font-bold text-slate-400 uppercase">Llamada Intercom</div>
                                        <div className="text-sm font-bold text-indigo-600 animate-pulse">Cuarto Chicos...</div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* 4. TRUST BADGES TECHNICAL */}
                <div className="max-w-6xl mx-auto px-4 md:px-8 pb-16">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            {v: '10.1"', l: 'Pantalla Táctil'},
                            {v: '360°', l: 'Rotación Auto'},
                            {v: 'Zigbee', l: 'Hub Domótico'},
                            {v: 'C.O.D', l: 'Compra Física'}
                        ].map((b, i) => (
                            <div key={i} className="flex flex-col items-center justify-center p-6 bg-white border border-slate-100 rounded-[2rem] shadow-sm">
                                <span className="text-slate-800 font-bold text-2xl tracking-tight mb-1">{b.v}</span>
                                <span className="text-[9px] font-bold text-indigo-500 uppercase tracking-widest">{b.l}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 5. EXPERT ACCORDIONS */}
                <div id="domótica" className="max-w-4xl mx-auto px-4 md:px-8 py-20">
                    <div className="mb-10 text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-slate-800">Cerebro Arquitectónico.</h2>
                    </div>
                    <div className="bg-white border border-slate-100 rounded-[2rem] shadow-sm overflow-hidden">
                        {[
                            { t: 'Pantalla Seguimiento Facial Motorizada', a: 'Si estás cocinando y moviéndote por la mesada mientras ves una videollamada o una receta de YouTube, el dispositivo gira sobre su base silenciosamente manteniéndote siempre en foco. No tienes que tocarlo con las manos sucias.' },
                            { t: 'Antena Zigbee/Matter Integrada', a: 'No todos los focos inteligentes usan WiFi. Muchos necesitan un "Puente" costoso. Este asistente ya tiene esa antena adentro. Detecta termostatos, cerraduras y sensores de cientos de marcas genéricas y los unifica en tu voz.' },
                            { t: 'Recepción Logística Verificada', a: 'Un artículo que centraliza tu casa no puede comprarse con dudas electrónicas. Al llenar el registro de envío, va un operario a tu domicilio con la unidad, la evalúas, compruebas que encaja en tu sala, y realizas el abono en cash ahí mismo.' }
                        ].map((ac, i) => (
                            <div key={i} className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50 transition-colors">
                                <button onClick={() => setOpenSpecAcc(openSpecAcc===i?null:i)} className="w-full text-left p-6 md:p-8 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-slate-700">
                                    <div className="flex items-center gap-4">
                                        <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-bold">0{i+1}</div>
                                        {ac.t}
                                    </div>
                                    <span className="text-slate-400 font-light text-2xl">{openSpecAcc===i?'-':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {openSpecAcc === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 md:px-8 pb-8 pl-[4.5rem] text-sm font-medium text-slate-500 leading-relaxed">
                                            {ac.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 6. ENDLESS MARQUEE */}
                <div className="w-[100vw] overflow-hidden py-4 bg-indigo-50 border-y border-indigo-100 relative left-[50%] -translate-x-[50%] flex transform">
                    <div className="flex whitespace-nowrap animate-marquee font-bold uppercase text-xl tracking-widest text-indigo-300">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="flex items-center gap-10 px-8">
                                <span>"APAGA_LA_COCINA"</span><span className="text-pink-300">✦</span>
                                <span>"MUESTRA_LA_PUERTA"</span><span className="text-pink-300">✦</span>
                                <span>"ANUNCIA_LA_CENA"</span><span className="text-pink-300">✦</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 7. WHY TO USE / BENEFITS */}
                <div id="seguridad" className="max-w-7xl mx-auto px-4 md:px-8 py-32">
                    <div className="text-center mb-20 relative">
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-800 mb-6 max-w-2xl mx-auto leading-tight">Levantarse del sofá es <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-pink-500">Totalmente Opcional.</span></h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { ic: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z', t: 'Vigilancia Frontal', d: 'Alguien toca el timbre y la pantalla automáticamente interrumpe tu música para mostrarte la cámara del porche en vivo. Háblale al cartero sin ir hasta la puerta.' },
                            { ic: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', t: 'Intercomunicador Familiar', d: 'Pon uno en tu cuarto y otro en la cocina. "Anuncia que la cena está lista" e instantáneamente tu voz sonará en todos los aparatos de la casa como en un aeropuerto.' },
                            { ic: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z', t: 'Rutinas Mañaneras', d: 'Dile "Buenos días". Prenderá la luz suave al 20%, te leerá si hay tráfico hacia tu trabajo, iniciará la cafetera smart y te pondrá a Frank Sinatra. Todo junto.' }
                        ].map((b, i) => (
                            <div key={i} className="bg-white border border-slate-100 p-10 rounded-[2.5rem] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:-translate-y-2 transition-transform duration-300">
                                <div className="w-14 h-14 bg-gradient-to-br from-indigo-50 to-pink-50 rounded-2xl flex items-center justify-center mb-8 border border-white">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="url(#gv)" strokeWidth="2"><defs><linearGradient id="gv" x1="0" y1="0" x2="24" y2="24"><stop offset="0%" stopColor="#6366f1"/><stop offset="100%" stopColor="#f472b6"/></linearGradient></defs><path strokeLinecap="round" strokeLinejoin="round" d={b.ic}/></svg>
                                </div>
                                <h3 className="text-lg font-bold text-slate-800 mb-4">{b.t}</h3>
                                <p className="text-sm font-medium text-slate-500 leading-relaxed">{b.d}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 8. HOW TO USE / SET UP AESTHETIC */}
                <div id="intercom" className="py-24 bg-white relative border-y border-slate-100">
                    <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                            <div className="relative aspect-square flex items-center justify-center p-8">
                                <div className="absolute inset-0 bg-indigo-50 rounded-full blur-3xl opacity-50"></div>
                                {/* Central Hub representation */}
                                <div className="relative z-10 w-48 h-48 bg-white rounded-full shadow-2xl border-4 border-slate-50 flex items-center justify-center flex-col z-20">
                                    <div className="flex gap-1 mb-2">
                                        {[1,2,3,4].map(i => <motion.div key={i} animate={{ height: [8, 20, 8] }} transition={{ duration: 1.5, repeat: Infinity, delay: i*0.2 }} className="w-1.5 bg-indigo-500 rounded-full"></motion.div>)}
                                    </div>
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2 hover:text-indigo-500 transition-colors cursor-default">Escuchando...</div>
                                </div>

                                {/* Orbiting devices */}
                                {[
                                    { t: 'Termostato', d: '24°C', a: 0, ic: 'M13 10V3L4 14h7v7l9-11h-7z' },
                                    { t: 'Cerradura', d: 'Bloqueada', a: 120, ic: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' },
                                    { t: 'Luces', d: 'Apagadas', a: 240, ic: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' }
                                ].map((orb, i) => (
                                    <motion.div key={i} animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }} className="absolute inset-0 z-10" style={{ transformOrigin: 'center' }}>
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 bg-white border border-slate-100 shadow-lg p-3 rounded-2xl flex items-center gap-3" style={{ transform: `rotate(-${orb.a}deg)` }}>
                                            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-600"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={orb.ic}/></svg></div>
                                            <div>
                                                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{orb.t}</div>
                                                <div className="text-xs font-bold text-slate-800">{orb.d}</div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <div>
                                <h2 className="text-4xl font-bold tracking-tight text-slate-800 mb-8 leading-tight">Configuración en <br/><span className="text-indigo-600">3 Minutos Reales.</span></h2>
                                <p className="text-slate-500 font-medium mb-12 leading-relaxed text-lg">No necesitas ser un ingeniero para domotizar tu hogar. Si sabes conectar tu celular al WiFi, sabes armar esto.</p>
                                
                                <div className="space-y-6">
                                    {[
                                        { s: '1', t: 'Enchufa a la pared', d: 'Recibe la caja por operador físico. Conecta el único cable blanco a cualquier enchufe. La pantalla encenderá sola.' },
                                        { s: '2', t: 'Toca el WiFi', d: 'Elige tu red de casa de la lista en la pantalla. Pon tu contraseña. Él se actualizará e invitará al menú.' },
                                        { s: '3', t: 'Escaneo Automático', d: 'El dispositivo rastreará el aire y detectará todos los televisores, focos y parlantes smart cercanos para tomar el control.' }
                                    ].map((s, i) => (
                                        <div key={i} className="flex gap-6 items-start bg-slate-50/50 p-6 rounded-3xl border border-slate-100">
                                            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 font-bold flex items-center justify-center shrink-0">{s.s}</div>
                                            <div>
                                                <h4 className="text-sm font-bold text-slate-800 mb-2">{s.t}</h4>
                                                <p className="text-sm font-medium text-slate-500 leading-relaxed">{s.d}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 10. COMPARISON TABLE */}
                <div className="max-w-5xl mx-auto px-4 md:px-8 py-32">
                    <div className="text-center mb-16">
                        <div className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-4 py-2 rounded-full mb-4 inline-block">Matriz de Datos</div>
                        <h2 className="text-3xl font-bold tracking-tight text-slate-800">El Asistente vs La App del Celular.</h2>
                    </div>
                    
                    <div className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm">
                        <div className="grid grid-cols-3 bg-slate-50 border-b border-slate-200 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                            <div className="p-6 md:p-8">Experiencia de Uso</div>
                            <div className="p-6 md:p-8 text-center text-indigo-600 border-x border-slate-200 bg-indigo-50/30">NEXUS HUB CENTRAL</div>
                            <div className="p-6 md:p-8 text-center">Abrir Alexa/Home en Celular</div>
                        </div>
                        {[
                            { k: 'Tiempo de Acción', u: '0.5s ("Apaga luz central")', t: '12s (Desbloquea, busca app, toca)' },
                            { k: 'Disponibilidad', u: 'Siempre en la cocina, pantalla ON', t: 'El celular puede estar sin batería' },
                            { k: 'Uso Familiar', u: 'Los niños y abuelos pueden hablarle', t: 'El control doméstico muere contigo' },
                            { k: 'Privacidad Cámara', u: 'Shutter manual de plástico bloqueador', t: 'Difícil saber si la cámara del celu graba' }
                        ].map((r, i) => (
                            <div key={i} className="grid grid-cols-3 border-b border-slate-100 last:border-b-0 text-sm">
                                <div className="p-6 md:p-8 font-bold text-slate-700 flex items-center bg-slate-50/50">{r.k}</div>
                                <div className="p-6 md:p-8 font-semibold text-slate-900 text-center flex items-center justify-center border-x border-slate-100">{r.u}</div>
                                <div className="p-6 md:p-8 font-medium text-slate-400 text-center flex items-center justify-center line-through">{r.t}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 11. RISK REVERSAL WARRANTY */}
                <div className="max-w-5xl mx-auto px-4 md:px-8 py-12">
                    <div className="bg-slate-900 p-10 md:p-14 rounded-[3rem] text-white md:flex items-center gap-10 shadow-xl overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-[400px] h-full bg-gradient-to-l from-indigo-500/20 to-transparent pointer-events-none"></div>
                        <div className="w-20 h-20 bg-indigo-500 text-white font-serif italic text-4xl rounded-[1.5rem] shrink-0 flex items-center justify-center shadow-lg mb-8 md:mb-0 relative z-10">
                            A
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold tracking-tight mb-3 text-white">Transacción Analógica. Tecnología Digital.</h3>
                            <p className="font-medium text-slate-300 leading-relaxed text-sm">
                                Automatizar tu casa no debe comprometer tu tarjeta de crédito online. Ejecutamos la entrega física directa. Rellenas la orden, empacamos la pantalla en su estuche original, y la recibes en tus manos mediante nuestro cadete. Pagas el importe en efectivo al comprobar los acabados y el peso del equipo. 1 Año de cobertura local.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 12. BRAND ETHOS */}
                <div className="py-24 mt-16 text-center px-4">
                    <div className="max-w-3xl mx-auto">
                        <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-800 mb-8 max-w-2xl mx-auto leading-tight">La pantalla que está hecha para que <span className="text-indigo-600">no la mires.</span></h3>
                        <p className="text-base font-medium text-slate-500 leading-loose mx-auto">Queremos que guardes tu teléfono cuando cenes con tu familia. Que uses la voz para controlar tu entorno sin desconectarte de los que amas al sumergirte en una app. Es tecnología diseñada para servir en segundo plano.</p>
                    </div>
                </div>

                {/* 13. FAQ */}
                <div className="max-w-4xl mx-auto px-4 md:px-8 py-24 bg-white border border-slate-100 rounded-[3rem] shadow-sm mb-24">
                    <div className="text-center mb-16">
                        <h2 className="text-2xl font-bold tracking-tight text-slate-800 uppercase">Consultas Frecuentes.</h2>
                    </div>
                    <div className="space-y-2 px-4 md:px-12">
                        {[
                            {q: '¿Me están grabando o escuchando todo el día?', a: 'El micrófono solo procesa localmente cuando dices la palabra clave ("Nexus"). Hay un botón físico arriba que desconecta eléctricamente los micrófonos (se enciende una luz roja), y una tapa física que puedes deslizar sobre la cámara.'},
                            {q: '¿Puede reproducir Spotify y YouTube?', a: 'Sí. Tiene ambas plataformas nativas integradas. Su parlante trasero tiene bajos profundos excelentes para llenar una cocina o un comedor con música alta mientras lavas los platos o las preparaciones.'},
                            {q: '¿Si compro para envío COD, cómo sigo el paquete?', a: 'Generas la orden abajo. Te enviamos un WhatsApp oficial validando el día, y te llega un link del tracking en vivo para ver al repartidor llegar a cobrar a tu casa.'}
                        ].map((f, i) => (
                            <div key={i} className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50 rounded-2xl transition-colors">
                                <button onClick={() => setFaqOpen(faqOpen===i?null:i)} className="w-full text-left p-6 md:p-8 flex items-center justify-between font-bold text-sm text-slate-700">
                                    <span>{f.q}</span>
                                    <span className="text-indigo-500 font-light text-2xl leading-none">{faqOpen===i?'-':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {faqOpen === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 md:px-8 pb-8 text-sm font-medium text-slate-500 leading-relaxed pt-0">
                                            {f.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 14. EXPANDED REVIEWS */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-24 border-t border-slate-200">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold tracking-tight text-slate-800 mb-6">El Corazón del Hogar.</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { r: "Lo puse en la isla de la cocina. Mientras hago la cena, veo series, si tocan la puerta veo al repartidor directo ahí y le digo que deje la pizza en el porche. Mi vida entera mejoró un 20%.", n: "Sabrina M.", t: "Hogar y Domótica" },
                            { r: "La función de seguimiento de cara parece sacada de una película de Sci-Fi. Camino por toda la pieza y la pantalla me sigue fluidamente para que no pierda la videollamada con mi madre. Brutal.", n: "Daniel P.", t: "Desarrollador" },
                            { r: "Pésimas experiencias pagando con tarjetas online antes. Entré, vi esto de pago al recibir, me arriesgué a pedirlo. El jueves estaba el flaco en mi puerta con una caja hermosa, le di los billetes. Todo perfecto.", n: "Graciela V.", t: "Cliente C.O.D." }
                        ].map((rev, i) => (
                            <div key={i} className="bg-white border border-slate-100 p-10 rounded-[2.5rem] relative shadow-sm hover:shadow-xl transition-all duration-500">
                                <p className="text-sm font-medium text-slate-500 leading-relaxed mb-8 relative z-10 text-balance">"{rev.r}"</p>
                                <div className="flex items-center justify-between border-t border-slate-100 pt-6">
                                    <div className="text-xs font-bold text-slate-800 uppercase tracking-wide">{rev.n}</div>
                                    <div className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">{rev.t}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 15. CHECKOUT */}
                <div id="checkout-action" className="py-24 md:py-32 bg-slate-900 relative border-t-[6px] border-indigo-500 overflow-hidden">
                    <div className="absolute top-0 right-0 w-[500px] h-full bg-gradient-to-l from-indigo-500/20 to-transparent pointer-events-none"></div>
                    <div className="absolute top-1/2 left-0 w-64 h-64 bg-pink-500/10 blur-[100px] pointer-events-none -translate-y-1/2"></div>

                    <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24 items-center">
                        <div className="md:col-span-5 relative text-center md:text-left">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 mb-6 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full inline-block backdrop-blur-md">Petición Logística COD</span>
                            <h3 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white leading-[1.05]">Inicia el<br/>Sistema.</h3>
                            <p className="text-sm font-medium text-slate-400 mb-10 leading-relaxed max-w-sm mx-auto md:mx-0">Registra tus parámetros domiciliarios. Nuestra flota blindada lo despacha y abonas directamente el importe material en tu estancia.</p>
                            
                            <div className="text-5xl md:text-6xl font-bold text-white tracking-tight">{fmtPrice(product.price)}</div>
                        </div>
                        
                        <div className="md:col-span-7 w-full border border-slate-700 bg-slate-800/80 backdrop-blur-2xl p-8 md:p-12 shadow-2xl relative rounded-[3rem]">
                            <form onSubmit={e=>e.preventDefault()}>
                                <div className="space-y-6">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-2">Titularidad</label>
                                        <input type="text" className="w-full bg-slate-900 border border-slate-700 focus:border-indigo-500 text-white font-bold text-sm px-6 py-5 rounded-2xl outline-none transition-all" placeholder="Nombre Destinatario" />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-2">Comunicación</label>
                                        <input type="tel" className="w-full bg-slate-900 border border-slate-700 focus:border-indigo-500 text-white font-bold text-sm px-6 py-5 rounded-2xl outline-none transition-all" placeholder="Número Telefónico Activo" />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-2">Locación Física</label>
                                        <textarea rows={2} className="w-full bg-slate-900 border border-slate-700 focus:border-indigo-500 text-white font-bold text-sm px-6 py-5 rounded-3xl outline-none transition-all resize-none" placeholder="Dirección de Instalación" />
                                    </div>
                                    <div className="pt-6">
                                        <button className="w-full h-[70px] bg-indigo-500 text-white font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-slate-900 transition-colors shadow-lg rounded-3xl border border-indigo-400/50">
                                            Aprobar Despliegue Físico
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </main>

            {/* STICKY MOBILE CTA */}
            <div className="md:hidden fixed bottom-4 left-4 right-4 z-50">
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-3xl flex items-center justify-between shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
                    <div className="pl-3">
                        <div className="text-[10px] font-bold uppercase text-slate-400 tracking-widest mb-1">Abono en Efectivo</div>
                        <div className="font-bold text-white text-xl tracking-tight leading-none">{fmtPrice(product.price)}</div>
                    </div>
                    <button onClick={() => document.getElementById('checkout-action')?.scrollIntoView({ behavior: 'smooth' })} className="bg-indigo-500 border border-indigo-400/50 text-white rounded-2xl px-8 py-3 font-bold uppercase tracking-widest text-[11px] shadow-sm">
                        Asignar
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

export default PdpHomeHub;
