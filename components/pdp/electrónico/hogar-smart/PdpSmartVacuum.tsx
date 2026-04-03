'use client';
import React, { useState } from 'react';
import { StoreData, Product } from '@/lib/types';
import EnhancedProductGallery from '@/components/pdp/EnhancedProductGallery';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { data: StoreData; product: Product; }

const PdpSmartVacuum: React.FC<Props> = ({ data, product }) => {
    const [faqOpen, setFaqOpen] = useState<number | null>(null);
    const ai = product.aiContent;
    const fmtPrice = (n: number) => { const s = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); return `Gs. ${s}`; };

    // Estética "Sterile Minimalist": Clínico, puros blancos, marfiles y gris suave.
    const bg = '#ffffff'; 
    const textMain = '#334155'; // Slate 700 (Softer than black)
    const accent = '#0ea5e9'; // Clean Sky Blue

    return (
        <div style={{ background: bg, color: textMain }} className="font-sans antialiased overflow-x-hidden selection:bg-sky-100 selection:text-sky-900">
            
            {/* Pristine Ambient */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-[#f8fafc] to-[#ffffff]"></div>
                {/* Soft glow highlighting cleanliness */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-50 rounded-full blur-[100px] opacity-60"></div>
            </div>

            {/* 1. TOP NAV (Clinical Header) */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
                    <div className="text-xl font-light tracking-widest text-slate-800 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-gradient-to-tr from-sky-400 to-sky-200 shadow-sm flex items-center justify-center">
                            <span className="w-2 h-2 bg-white rounded-full"></span>
                        </span>
                        AURA<span className="font-semibold">CLEAN</span>
                    </div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400 bg-slate-50 px-3 py-1 rounded-full border border-slate-200">
                        Smart Home
                    </div>
                </div>
            </header>

            <main className="relative z-10 w-full overflow-hidden">
                {/* 2. BREADCRUMBS & LOGISTICS */}
                <div className="max-w-7xl mx-auto px-6 pt-6 mb-4">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="text-[11px] uppercase tracking-widest text-slate-400 font-medium">
                            Colección / Hogar / <span className="text-sky-500 font-bold">Automatización</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Entrega Segura (COD)</span>
                        </div>
                    </div>
                </div>

                {/* 3. HERO (EDITORIAL WHITE) */}
                <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="relative z-20 order-2 lg:order-1">
                            <div className="inline-block bg-sky-50 text-sky-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] mb-8 border border-sky-100">
                                Navegación LiDAR 3D
                            </div>
                            <h1 className="text-5xl lg:text-7xl font-light text-slate-900 mb-6 tracking-tight leading-[1.1]">
                                {ai?.enhancedTitle || product.title}
                            </h1>
                            <p className="text-lg text-slate-500 mb-10 leading-relaxed font-light max-w-lg">
                                {ai?.enhancedDescription || product.description || 'El fin del aseo manual. Este ecosistema autónomo mapea milimétricamente tu hogar, aspira, friega y vacía su propio depósito sin que intervengas en 30 días.'}
                            </p>
                            
                            <div className="bg-white rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-slate-100">
                                <div className="text-xs text-slate-400 uppercase tracking-widest font-semibold mb-2">Inversión Doméstica</div>
                                <div className="flex items-end gap-5 mb-8">
                                    <span className="text-4xl font-light text-slate-900 tracking-tight">{fmtPrice(product.price)}</span>
                                    {product.originalPrice && <span className="text-lg text-slate-400 line-through pb-1 decoration-slate-300">{fmtPrice(product.originalPrice)}</span>}
                                </div>
                                <button onClick={() => document.getElementById('checkout-clinical')?.scrollIntoView({ behavior: 'smooth' })} className="w-full bg-slate-900 text-white rounded-2xl py-5 font-semibold text-sm hover:shadow-[0_10px_30px_rgba(15,23,42,0.15)] hover:-translate-y-1 transition-all duration-300">
                                    Solicitar Entrega Gratis
                                </button>
                                <div className="text-[11px] text-center text-slate-500 mt-4 flex items-center justify-center gap-2 font-medium">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                                    PAGAS AL RECIBIR (C.O.D)
                                </div>
                            </div>
                        </div>

                        <div className="w-full relative flex items-center justify-center order-1 lg:order-2">
                            {/* Halo effect behind image */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-sky-50 to-white rounded-[3rem] -z-10 translate-x-4 translate-y-4"></div>
                            <div className="w-full bg-white border border-slate-100 rounded-[3rem] p-4 shadow-sm overflow-hidden">
                                <EnhancedProductGallery product={product} accentColor={accent} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. TRUST BADGES TECHNICAL (Clinical Specs) */}
                <div className="bg-slate-50 py-12 border-y border-slate-100">
                    <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {v: '6000 Pa', l: 'Poder de Succión'},
                            {v: '+30 Días', l: 'Autovaciado Base'},
                            {v: 'LiDAR Dual', l: 'Mapeo Preciso'},
                            {v: 'App Sync', l: 'Control WiFi 5G'}
                        ].map((b, i) => (
                            <div key={i} className="flex flex-col items-center justify-center text-center">
                                <span className="text-3xl font-light text-slate-800 mb-2">{b.v}</span>
                                <span className="text-[10px] text-slate-500 uppercase font-semibold tracking-widest">{b.l}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 5. EXPERT ACCORDIONS (Clean Details) */}
                <div className="max-w-4xl mx-auto px-6 py-24">
                    <div className="text-center mb-16">
                        <span className="text-sky-500 font-bold uppercase tracking-[0.2em] text-xs mb-3 block">Perfección Tecnológica</span>
                        <h2 className="text-3xl text-slate-900 font-light">¿Por qué es superior en su clase?</h2>
                    </div>
                    
                    <div className="space-y-4">
                        {[
                            { t: 'Mapeo Invisible Láser (LiDAR)', a: 'El sensor superior gira cientos de veces por segundo, detectando paredes, patas de sillas y escaleras en absoluta oscuridad. Construye un mapa 3D de tu hogar que puedes ver en el teléfono.' },
                            { t: 'Elevación de Mopa Ultrasónica', a: 'Cuando detecta una alfombra mediante ultrasonido, eleva físicamente su paño de fregado húmedo e incrementa al máximo su poder de aspiración, evitando ensuciar tus tejidos finos.' },
                            { t: 'Estación de Autovaciado Clínico', a: 'Al terminar su rutina, vuelve a la base y extrae toda la suciedad acumulada a una bolsa sellada antibacteriana de 3 litros. Prácticamente te olvidas del mantenimiento.' }
                        ].map((ac, i) => (
                            <div key={i} className="bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                                <button className="w-full px-8 py-6 flex justify-between items-center text-left" onClick={() => setFaqOpen(faqOpen===i?null:i)}>
                                    <span className="text-slate-800 font-medium text-lg">{ac.t}</span>
                                    <span className={`w-8 h-8 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 border border-slate-100 transition-transform duration-300 ${faqOpen===i?'rotate-180':''}`}>↓</span>
                                </button>
                                <AnimatePresence>
                                    {faqOpen === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-8 pb-6 text-slate-500 font-light leading-relaxed">
                                            {ac.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 6. ENDLESS MARQUEE (Clean & Soft) */}
                <div className="w-[100vw] overflow-hidden py-12 bg-sky-50 border-y border-sky-100 flex transform relative left-[50%] -translate-x-[50%]">
                    <div className="flex whitespace-nowrap font-light text-2xl text-sky-800/30 uppercase tracking-[0.3em]">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="flex items-center gap-16 px-8">
                                <span>SIN POLVO</span>
                                <span className="w-1.5 h-1.5 bg-sky-300 rounded-full"></span>
                                <span>SIN RUIDO</span>
                                <span className="w-1.5 h-1.5 bg-sky-300 rounded-full"></span>
                                <span>SIN ESFUERZO</span>
                                <span className="w-1.5 h-1.5 bg-sky-300 rounded-full"></span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 7. WHY TO USE / BENEFITS (Sterile presentation) */}
                <div className="max-w-7xl mx-auto px-6 py-24 lg:py-32">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl text-slate-900 font-light leading-tight mb-8">El lujo de caminar <br/><span className="font-semibold">descalzo siempre.</span></h2>
                            <p className="text-slate-500 font-light leading-relaxed mb-10 text-lg">No solo aspira la suciedad visible, su sistema de filtración HEPA H14 atrapa alérgenos microscópicos mientras deja tus pisos relucientes mediante su fregado oscilante de doble mopa.</p>
                            
                            <div className="space-y-6">
                                {[
                                    { t: 'Esquiva Objetos (IA visual)', d: 'Identifica y rodea cables tirados, zapatillas o desechos de mascotas.' },
                                    { t: 'Zonas Prohibidas App', d: 'Dibuja una línea roja en tu móvil si no quieres que entre a la cocina.' }
                                ].map((b, i) => (
                                    <div key={i} className="flex flex-col border-l-2 border-sky-400 pl-5">
                                        <h4 className="text-slate-800 font-semibold mb-1">{b.t}</h4>
                                        <p className="text-slate-500 font-light text-sm">{b.d}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <div className="aspect-[4/3] bg-slate-100 rounded-[2rem] overflow-hidden flex items-center justify-center p-8 relative shadow-inner">
                                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2000')] bg-cover bg-center opacity-30 mix-blend-multiply"></div>
                                <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl w-[80%] max-w-sm relative z-10 border border-white">
                                    <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-2">
                                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">MAPA DEL HOGAR</span>
                                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                    </div>
                                    <div className="h-32 mb-4 relative flex items-center justify-center">
                                        <div className="w-[120px] h-[120px] border border-sky-200 rounded-full opacity-50 relative flex items-center justify-center">
                                            <div className="absolute inset-0 border border-sky-400/50 rounded-full animate-ping opacity-20"></div>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-sky-500"><path strokeLinecap="round" strokeLinejoin="round" d="M12 2v20m10-10H2m15.364 7.364l-14.142-14.14M20.485 4.93L6.343 19.071"/></svg>
                                        </div>
                                    </div>
                                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-sky-400 w-3/4 rounded-full"></div>
                                    </div>
                                    <div className="flex justify-between mt-2 text-[10px] text-slate-500 font-medium">
                                        <span>Limpiando Sala</span>
                                        <span>75% Batería</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 8. HOW TO USE / SET UP AESTHETIC */}
                <div className="py-24 bg-white border-y border-slate-100">
                    <div className="max-w-6xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl text-slate-900 font-light mb-4">Instalación en 5 Minutos</h2>
                            <p className="text-slate-500 font-light max-w-xl mx-auto">La tecnología robótica compleja debe ser simple para el usuario final.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-4xl mx-auto">
                            {[
                                { s: 'Base a la pared', d: 'Conecta la estación de carga cerca de un enchufe, lejos del sol directo.' },
                                { s: 'Mapeo Rápido', d: 'Toca el botón principal. Hará un viaje de 5 minutos por tu casa sin limpiar, solo escaneando el perímetro 3D.' },
                                { s: 'Rutina Automática', d: 'Programa en tu celular qué días y horas limpia. Te olvidarás que existe.' }
                            ].map((s, i) => (
                                <div key={i} className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100">
                                    <div className="w-12 h-12 bg-white rounded-full mx-auto flex items-center justify-center text-sky-500 font-bold mb-6 shadow-sm border border-slate-100">
                                        {i+1}
                                    </div>
                                    <h4 className="text-slate-800 font-semibold mb-3 text-sm">{s.s}</h4>
                                    <p className="text-slate-500 font-light text-sm leading-relaxed">{s.d}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 10. COMPARISON TABLE (Clean lines) */}
                <div className="max-w-4xl mx-auto px-6 py-24">
                    <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden">
                        <div className="grid grid-cols-3 bg-slate-50 text-[10px] uppercase font-bold text-slate-400 tracking-widest">
                            <div className="p-6 md:px-8 border-b border-slate-200">Prestación</div>
                            <div className="p-6 md:px-8 text-slate-800 bg-sky-50 border-x border-b border-sky-100 text-center">Nuestro Robot LiDAR</div>
                            <div className="p-6 md:px-8 text-center border-b border-slate-200 text-slate-400">Aspiradoras Básicas</div>
                        </div>
                        {[
                            { k: 'Sentido Espacial', u: 'Sensores Láser y Cámara IA', t: 'Chocan al azar (Sensor Parachoques)' },
                            { k: 'Mantenimiento', u: 'Autovaciado a bolsa 3L', t: 'Vaciar cesto de tierra manualmente cada día' },
                            { k: 'Recorridos', u: 'Líneas perfectas paralelas', t: 'Rebote errático caótico' },
                            { k: 'Seguridad Financiera', u: 'Pago seguro al recibir en casa (C.O.D)', t: 'Tarjetas online riesgosas' }
                        ].map((r, i) => (
                            <div key={i} className="grid grid-cols-3 text-sm font-light">
                                <div className="p-6 md:px-8 text-slate-600 border-b border-slate-100">{r.k}</div>
                                <div className="p-6 md:px-8 text-slate-900 bg-sky-50/50 border-x border-b border-sky-100 text-center font-medium">{r.u}</div>
                                <div className="p-6 md:px-8 text-slate-400 text-center border-b border-slate-100 line-through">{r.t}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 11. RISK REVERSAL WARRANTY (Sterile Trust) */}
                <div className="max-w-3xl mx-auto px-6 py-20 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 mb-6 border border-emerald-100">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                    </div>
                    <h3 className="text-2xl text-slate-900 font-light mb-4">La seguridad del mundo real.</h3>
                    <p className="text-slate-500 font-light leading-relaxed">
                        Rechazamos las pasarelas de pago dudosas. Tu pedido genera una alerta en nuestro centro logístico y acudimos con la unidad sellada en caja a tu portería o puerta. Inspeccionas y le pagas físicamente a nuestro empleado logístico (C.O.D. Efectivo o Transferencia). Total cero riesgo para ti.
                    </p>
                </div>

                {/* 12. BRAND ETHOS */}
                <div className="py-20 bg-slate-900 text-center px-6">
                    <h3 className="text-xl text-white font-light tracking-widest uppercase mb-4">Recupera tu tiempo.</h3>
                    <p className="text-slate-400 max-w-lg mx-auto font-light leading-relaxed">Importamos artefactos de estilo de vida que eliminan la fricción doméstica rutinaria, devolviéndote horas preciosas con tu familia y proyectos.</p>
                </div>

                {/* 13. FAQ */}
                <div className="max-w-3xl mx-auto px-6 py-24">
                    <h2 className="text-2xl text-slate-900 font-light mb-12 text-center">Preguntas Frecuentes</h2>
                    <div className="space-y-4">
                        {[
                            {q: '¿Puede subir alfombras gruesas o cruzar desniveles entre cuartos?', a: 'Sí. Sus pesadas ruedas motrices le permiten trepar desniveles y bordes de alfombras de hasta 2 centímetros de alto sin atascarse.'},
                            {q: '¿Debo dejarles las luces prendidas si limpio de noche?', a: 'Para nada. La tecnología óptica de la torre LiDAR trabaja en base a rebotes láser infrarrojos, funciona exactamente igual a las 3:00 am en la oscuridad más absoluta.'},
                            {q: '¿Cómo garantizo que no me estafen pagando online?', a: 'Porque NO pagas online. Completa el casillero de abajo, te llamamos para confirmar tu presencia en el domicilio, y pagas en la misma puerta tras ver con tus ojos el paquete que pediste.'}
                        ].map((f, i) => (
                            <div key={i} className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-slate-300 transition-colors">
                                <button onClick={() => setFaqOpen(faqOpen===i?null:i)} className="w-full p-6 text-left flex justify-between items-center text-slate-800 font-medium">
                                    {f.q}
                                    <span className="text-slate-400">{faqOpen===i?'−':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {faqOpen === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 pb-6 text-slate-500 font-light text-sm leading-relaxed border-t border-slate-100 pt-4">
                                            {f.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 14. EXPANDED REVIEWS */}
                <div className="py-24 bg-slate-50 border-t border-slate-100">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { r: "Tengo un Golden Retriever y los pelos me volvían loco. Este aparato junta todo tres veces al día. Ver cómo se vacía solo en su base me da mucha paz mental.", n: "Carlos V.", t: "Cliente C.O.D." },
                                { r: "El primer pedido logístico que hago por internet donde no me obligan a poner la tarjeta y fallar. Llegaron en 1 día, pagué, limpiaron la casa. Impecable servicio.", n: "Martina D.", t: "Psicóloga" },
                                { r: "Tuve robots antes que golpeaban las mesas como torpes. Este escanea y jamás choca. Su nivel de limpieza trapeando mis cerámicas es inigualable.", n: "Diego F.", t: "Consultor" }
                            ].map((rev, i) => (
                                <div key={i} className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm relative">
                                    <p className="text-slate-600 font-light text-sm mb-8 leading-relaxed relative z-10">"{rev.r}"</p>
                                    <div className="flex items-center gap-3 border-t border-slate-100 pt-4">
                                        <div className="w-8 h-8 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center font-bold text-xs">{rev.n.charAt(0)}</div>
                                        <div>
                                            <div className="text-slate-900 font-semibold text-xs tracking-wide">{rev.n}</div>
                                            <div className="text-sky-500 text-[9px] uppercase font-bold">{rev.t}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 15. CHECKOUT (Clean & Clinical form) */}
                <div id="checkout-clinical" className="py-24 lg:py-32 bg-white relative border-t border-slate-100">
                    <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 mb-6">
                                <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></span>
                                <span className="text-[10px] text-sky-500 font-bold uppercase tracking-widest">STOCK INMEDIATO</span>
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-light text-slate-900 mb-6 leading-tight">Activa tu ecosistema <br/><span className="font-semibold text-sky-500">de limpieza autónomo.</span></h2>
                            <p className="text-slate-500 font-light mb-10 text-lg">Completa este manifiesto logístico. Nuestro cadete exclusivo te depositará la caja sellada en tus manos y tú le pagarás in-situ. Así de sencillo y fiable.</p>
                            
                            <div className="text-5xl font-light text-slate-900 tracking-tight">{fmtPrice(product.price)}</div>
                        </div>
                        
                        <div className="bg-slate-50 rounded-[2rem] p-8 lg:p-12 border border-slate-200 shadow-sm">
                            <h3 className="text-xl text-slate-800 font-semibold mb-8">Formulario de Recepción Físico</h3>
                            
                            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                                <div>
                                    <label className="text-[11px] text-slate-500 font-semibold uppercase mb-2 block ml-1">Nombre Completo</label>
                                    <input type="text" className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl p-4 focus:ring-2 focus:ring-sky-100 focus:border-sky-400 outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="text-[11px] text-slate-500 font-semibold uppercase mb-2 block ml-1">Teléfono (WhatsApp activo)</label>
                                    <input type="tel" className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl p-4 focus:ring-2 focus:ring-sky-100 focus:border-sky-400 outline-none transition-all" />
                                </div>
                                <div>
                                    <label className="text-[11px] text-slate-500 font-semibold uppercase mb-2 block ml-1">Domicilio Terrestre Físico</label>
                                    <textarea rows={3} className="w-full bg-white border border-slate-200 text-slate-800 rounded-xl p-4 focus:ring-2 focus:ring-sky-100 focus:border-sky-400 outline-none transition-all resize-none"></textarea>
                                </div>
                                <button className="w-full bg-slate-900 text-white font-semibold uppercase tracking-wide text-sm py-5 rounded-xl hover:-translate-y-1 hover:shadow-lg transition-all duration-300 mt-4">
                                    Enviar a Domicilio y Pagar al Recibir
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
};

export default PdpSmartVacuum;
