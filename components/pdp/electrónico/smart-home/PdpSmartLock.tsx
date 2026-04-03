'use client';
import React, { useState } from 'react';
import { StoreData, Product } from '@/lib/types';
import EnhancedProductGallery from '@/components/pdp/EnhancedProductGallery';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { data: StoreData; product: Product; }

const PdpSmartLock: React.FC<Props> = ({ data, product }) => {
    const [openSpecAcc, setOpenSpecAcc] = useState<number | null>(0);
    const [faqOpen, setFaqOpen] = useState<number | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const ai = product.aiContent;
    const fmtPrice = (n: number) => { const s = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); return `Gs. ${s}`; };
    
    // Aesthetic Palette: Bank Vault / Luxury Security
    const bg = '#F1F5F9'; // Slate 100
    const accent = '#0F172A'; // Slate 900 (Deep Navy/Black)
    const highlight = '#3B82F6'; // Blue 500

    return (
        <div style={{ background: bg, color: accent, fontFamily: "'Inter', sans-serif" }} className="overflow-x-hidden selection:bg-blue-500/20 antialiased">
            
            {/* 1. TOP NAV */}
            <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-slate-900 rounded-sm flex items-center justify-center">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                        </div>
                        <span className="text-base font-black tracking-widest text-slate-900 uppercase">Aegis<span className="font-light text-slate-400">Lock</span></span>
                    </div>
                    <nav className="hidden lg:flex gap-8">
                        {['Biometría', 'Materiales', 'Instalación'].map((item) => (
                            <a key={item} href={`#${item.toLowerCase()}`} className="text-[11px] font-bold tracking-[0.1em] uppercase text-slate-500 hover:text-blue-600 transition-colors">
                                {item}
                            </a>
                        ))}
                    </nav>
                </div>
            </header>

            <main className="relative z-10">
                {/* 2. BREADCRUMBS & MICRO-LOGISTICS */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-wrap items-center justify-between pt-6 mb-6 text-[11px] font-bold tracking-widest uppercase text-slate-400">
                    <div>Seguridad / Accesos / <span className="text-slate-900">{product.title.substring(0, 15)}...</span></div>
                    <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full border border-blue-100">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
                        Despacho Inmediato
                    </div>
                </div>

                {/* 3. SUPER HERO SECTION */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
                    <div className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="p-4 md:p-10 bg-[#F8FAFC]">
                                <EnhancedProductGallery product={product} accentColor={highlight} />
                            </motion.div>
                            
                            <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white border-l border-slate-100">
                                <div className="flex items-center gap-1 mb-4 text-amber-500">
                                    {[1,2,3,4,5].map(i => <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
                                    <span className="text-sm font-bold text-slate-800 ml-2">5.0 (Certificado de Seguridad Nivel 3)</span>
                                </div>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 mb-6 leading-[1.05]">
                                    {ai?.enhancedTitle || product.title}
                                </h1>
                                <p className="text-base font-medium text-slate-500 mb-8 border-l-4 border-blue-500 pl-4 leading-relaxed">
                                    {ai?.enhancedDescription || product.description || 'Haz tu puerta impenetrable. Aleación de zinc de grado militar y escáner biométrico infrarrojo. Tu hogar no es negociable.'}
                                </p>
                                
                                <div className="space-y-6">
                                    <div className="flex items-end gap-4 text-slate-900">
                                        <span className="text-4xl md:text-5xl font-black tracking-tight">{fmtPrice(product.price)}</span>
                                        {product.originalPrice && <span className="text-lg font-bold text-slate-400 line-through pb-1">{fmtPrice(product.originalPrice)}</span>}
                                    </div>
                                    <button onClick={() => document.getElementById('checkout-lock')?.scrollIntoView({ behavior: 'smooth' })} className="w-full h-[70px] rounded-xl bg-slate-900 hover:bg-black text-white font-black text-sm uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-xl">
                                        Proteger mi Hogar Hoy
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
                                    </button>
                                    {/* 4. TRUST BADGES */}
                                    <div className="flex justify-between items-center px-2 pt-2 text-[10px] uppercase font-bold text-slate-400 tracking-widest">
                                        <div className="flex items-center gap-1"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> Encriptación AES-128</div>
                                        <div className="flex items-center gap-1"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/></svg> Soporte 24/7</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 5. EXPANDABLE DETAILS ABOVE FOLD */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 mb-20">
                    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                        {[
                            { t: 'Núcleo de Zinc y Acero Integrado', a: 'Diseñado para resistir talados, palancas y ataques de fuerza bruta. El cilindro C-Class previene el ganzuado.' },
                            { t: 'Modos de Apertura (5 in 1)', a: '1. Huella Dactilar 3D. 2. Código PIN Anti-Mirón. 3. Tarjeta RFID. 4. Llave Física de Emergencia. 5. App Remota (Bluetooth/WiFi).' },
                            { t: 'Logística de Seguridad y Envío', a: 'No solicitamos tarjeta de crédito. La caja sellada viaja directamente a tu casa y la abonas al currier en la puerta para total confianza.' }
                        ].map((ac, i) => (
                            <div key={i} className="border-b border-slate-100 last:border-0">
                                <button onClick={() => setOpenSpecAcc(openSpecAcc===i?null:i)} className="w-full text-left px-8 py-5 flex items-center justify-between text-xs md:text-sm font-bold uppercase tracking-widest text-slate-800 hover:bg-slate-50 transition-colors">
                                    {ac.t} 
                                    <div className={`w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-black text-lg transition-transform ${openSpecAcc===i?'rotate-180':''}`}>{openSpecAcc===i?'-':'+'}</div>
                                </button>
                                <AnimatePresence>
                                    {openSpecAcc === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-8 pb-5 pt-1 text-sm font-medium text-slate-500 leading-relaxed">
                                            {ac.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 6. ENDLESS MARQUEE */}
                <div className="w-[100vw] overflow-hidden py-4 bg-slate-900 border-y-4 border-slate-800 relative left-[50%] -translate-x-[50%]">
                    <div className="flex whitespace-nowrap animate-marquee font-black uppercase text-xs sm:text-sm tracking-[0.4em] text-white">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="flex items-center gap-16 px-8">
                                <span>LECTURA BIOMÉTRICA EN 0.3s</span><span className="text-blue-500 text-xl">•</span>
                                <span>BATERÍA QUE DURA 1 AÑO</span><span className="text-blue-500 text-xl">•</span>
                                <span>PIN FALSO ANTI-MIRADAS</span><span className="text-blue-500 text-xl">•</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 7. WHY TO USE (BENEFITS) */}
                <div id="biometría" className="max-w-7xl mx-auto px-4 md:px-8 py-24">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-4">Tranquilidad Absoluta.</h2>
                        <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">Tu familia merece estar detrás del mejor escudo fabricado por la ingeniería moderna.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { i: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2A10 10 0 0 0 2 12c0 4.4 2.8 8.1 6.8 9.5l1.6-4.9a6 6 0 1 1 3.2 0l1.6 4.9C19.2 20.1 22 16.4 22 12A10 10 0 0 0 12 2z"/></svg>, t: 'Biometría 3D Viva', d: 'Los sensores capacitivos solo leen huellas vivas. Es inútil usar moldes de gel o impresiones 2D. Reconocimiento garantizado en el 99.9% de los casos.' },
                            { i: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M12 17v-2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>, t: 'Aleación Anti-Impactos', d: 'Componentes forjados que resisten impactos de mazo, sierras eléctricas y cualquier manipulación de apertura con tarjetas o radiografías.' },
                            { i: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="6" width="20" height="12" rx="2" ry="2"/><path d="M6 12h12"/></svg>, t: 'Auto-Cierre Inteligente', d: '¿Olvidaste echar llave al salir apurado? El sensor giroscópico detecta que la puerta cuadró en el marco y bloquea los pasadores en 1 segundo.' }
                        ].map((b, i) => (
                            <div key={i} className="bg-white rounded-3xl p-10 shadow-sm border border-slate-200 text-center flex flex-col items-center">
                                <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-8 shadow-inner">
                                    <div className="w-10 h-10">{b.i}</div>
                                </div>
                                <h3 className="text-xl font-black text-slate-900 mb-4">{b.t}</h3>
                                <p className="text-sm text-slate-500 font-medium leading-relaxed">{b.d}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 8. HOW TO USE (VISUAL GUIDE) */}
                <div id="instalación" className="bg-slate-900 py-24 text-white">
                    <div className="max-w-7xl mx-auto px-4 md:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                            <div className="md:col-span-4">
                                <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">Instala tú mismo.</h2>
                                <p className="text-slate-400 font-medium text-lg leading-relaxed mb-8">Diseñada para encajar en el 90% de las perforaciones estándar de puertas. No necesitas llamar a un cerrajero ni romper la estructura.</p>
                            </div>
                            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
                                {[
                                    { s: '1', t: 'Remueve', d: 'Desatornilla tu cerradura antigua usando un destornillador normal.' },
                                    { s: '2', t: 'Encaja', d: 'Mete el nuevo pasador cilíndrico robusto de acero que viene en la caja.' },
                                    { s: '3', t: 'Asegura', d: 'Ajusta los paneles biométricos y ponle las 4 pilas AA. Listo.' }
                                ].map((s, i) => (
                                    <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-8 relative">
                                        <div className="text-6xl font-black text-white/10 absolute top-4 right-4">{s.s}</div>
                                        <div className="w-12 h-12 bg-blue-500 text-white font-black rounded-lg flex items-center justify-center mb-6 relative z-10">{s.s}</div>
                                        <h4 className="text-xl font-bold mb-2 relative z-10">{s.t}</h4>
                                        <p className="text-sm font-medium text-slate-400 relative z-10 leading-relaxed">{s.d}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 9. MULTIMEDIA REVEAL */}
                <div className="py-24 max-w-7xl mx-auto px-4 md:px-8">
                    <div className="bg-slate-100 rounded-[3rem] overflow-hidden flex flex-col md:flex-row items-center border border-slate-200">
                        <div className="flex-1 p-12 md:p-20 text-center md:text-left">
                            <h3 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 mb-6">El Código Anti-Mirones.</h3>
                            <p className="text-slate-500 font-medium text-lg leading-relaxed">Si alguien está mirando mientras tecleas tu contraseña, puedes poner números aleatorios antes y después del PIN real. <strong className="text-slate-900">Ejemplo: ***4441234***</strong>. La cerradura abrirá siempre y cuando el pin continuo esté ahí.</p>
                        </div>
                        <div className="flex-1 w-full bg-slate-900 p-12 flex justify-center items-center relative overflow-hidden">
                            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at center, #3B82F6 0%, transparent 70%)' }}></div>
                            <div className="w-48 h-64 bg-black rounded-xl border-4 border-slate-800 shadow-2xl flex flex-col justify-end p-6 relative z-10">
                                <div className="text-center font-mono text-xl text-green-400 tracking-[0.5em] mb-4">*1234*</div>
                                <div className="grid grid-cols-3 gap-2">
                                    {[1,2,3,4,5,6,7,8,9,'*',0,'#'].map(n => <div key={n} className="w-full h-10 rounded-md bg-slate-800/50 border border-slate-700"></div>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 10. COMPARISON TABLE */}
                <div className="max-w-5xl mx-auto px-4 md:px-8 py-16">
                    <h2 className="text-3xl md:text-4xl font-black tracking-tight text-center mb-12">Por qué los ladrones la odian.</h2>
                    <div className="border border-slate-200 bg-white rounded-2xl overflow-hidden shadow-lg">
                        <div className="grid grid-cols-3 bg-slate-50 border-b border-slate-200 p-5 md:p-6 text-[10px] sm:text-xs font-black uppercase tracking-widest">
                            <div className="text-slate-400">Protección</div>
                            <div className="text-slate-900 text-center">Aegis Lock Pro</div>
                            <div className="text-slate-400 text-center">Cerradura Común</div>
                        </div>
                        {[
                            { k: 'Tiempo de Intrusión (Ganzúa)', u: 'Virtualmente Imposible', t: 'Promedio 15 segundos' },
                            { k: 'Bloqueo Dactilar', u: 'Avisa por App y bloquea 5 min', t: 'No tiene' },
                            { k: 'Pasadores Radiales', u: 'Acero Inoxidable Grueso', t: 'Latón Hueco' },
                            { k: 'Accesos Temporales', u: 'Claves de un solo uso para Airbnb/Visitas', t: 'Debes esconder las llaves bajo la alfombra' }
                        ].map((r, i) => (
                            <div key={i} className="grid grid-cols-3 p-5 md:p-6 border-b border-slate-100 items-center text-sm hover:bg-slate-50 transition">
                                <div className="font-bold text-slate-600 leading-tight">{r.k}</div>
                                <div className="text-center font-black text-slate-900">{r.u}</div>
                                <div className="text-center font-medium text-slate-400 line-through leading-tight">{r.t}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 11. RISK-REVERSAL WARRANTY */}
                <div className="max-w-4xl mx-auto px-4 md:px-8 py-16">
                    <div className="bg-blue-600 rounded-3xl p-10 md:p-14 text-white flex flex-col md:flex-row items-center gap-10 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px]"></div>
                        <div className="w-24 h-24 shrink-0 bg-white/10 border-2 border-white/30 rounded-2xl flex items-center justify-center backdrop-blur-sm z-10 shadow-lg">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                        </div>
                        <div className="z-10 text-center md:text-left">
                            <h3 className="text-2xl md:text-3xl font-black mb-4">Garantía Inviolable de 2 Años.</h3>
                            <p className="text-blue-100 font-medium leading-relaxed">No vas a comprar una promesa, vas a comprar tranquilidad tangible. Pide la tuya ahora completando el formulario. El mensajero llegará a la puerta que vas a proteger, y recién en ese momento pagas el dispositivo.</p>
                        </div>
                    </div>
                </div>

                {/* 12. BRAND ETHOS */}
                <div className="py-24 text-center mt-12 px-6 bg-white border-y border-slate-100">
                    <div className="max-w-3xl mx-auto">
                        <h3 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-6">Dejamos a los invasores afuera.</h3>
                        <p className="text-lg font-medium text-slate-500 leading-relaxed">El índice de inseguridad sube cada año. Una cerradura vieja de llaves representa una vulnerabilidad crítica documentada en miles de incidencias de robo. No diseñamos un gadget tecnológico; forjamos el escudo maestro para tu propiedad.</p>
                    </div>
                </div>

                {/* 13. FAQ ACCORDIONS */}
                <div className="max-w-3xl mx-auto px-4 md:px-8 py-24">
                    <h2 className="text-3xl font-black tracking-tight text-center mb-12">Dudas Resueltas Rápidamente</h2>
                    <div className="space-y-4">
                        {[
                            { q: '¿Qué pasa si se queda sin batería o hay un corte de luz?', a: 'La cerradura funciona con 4 pilas AA independientes, no le afectan cortes eléctricos. Te avisa meses antes de que se gasten. Y si mueren, la abres con la llave física de emergencia o con un cable USB conectando un powerbank por fuera.' },
                            { q: '¿Cuántas huellas puede almacenar?', a: 'El servidor local de la cerradura guarda hasta 100 huellas vivas y 100 códigos PIN diferentes. Tienes espacio de sobra para familia numerosa, oficina y personal de limpieza.' },
                            { q: '¿Tengo que meter mi tarjeta de crédito ahora?', a: 'En lo absoluto. Eliges la cantidad, pones tu dirección y enviamos por mensajería. Cuando el chico toque a la puerta de tu casa y lo veas con tus propios ojos, le pagas.' }
                        ].map((f, i) => (
                            <div key={i} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                                <button onClick={() => setFaqOpen(faqOpen===i?null:i)} className="w-full text-left px-8 py-6 flex items-center justify-between font-bold text-slate-800 text-sm md:text-base">
                                    {f.q}
                                    <svg className={`shrink-0 transition-transform duration-300 w-5 h-5 text-blue-500 ${faqOpen===i?'rotate-180':''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"/></svg>
                                </button>
                                <AnimatePresence>
                                    {faqOpen === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-8 pb-6 text-sm text-slate-500 font-medium leading-relaxed bg-slate-50 border-t border-slate-100 pt-5">
                                            {f.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 14. EXPANDED REVIEWS (MASONRY-ISH) */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 pb-24 border-b border-slate-200">
                    <div className="text-center mb-16">
                        <div className="text-amber-500 flex justify-center gap-1 mb-4">
                            {[...Array(5)].map((_,i) => <svg key={i} width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
                        </div>
                        <h2 className="text-4xl font-black tracking-tight text-slate-900 mb-2">Hogares Protegidos</h2>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Reseñas Auditadas de Compradores Reales</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { r: "Tuvimos un intento de robo el año pasado y quedamos asustados. Esta bestia de acero no tiene por dónde ser palanqueada. El material es súper grueso. Dormimos felices.", n: "Ricardo Fernández", t: "Padre de familia" },
                            { r: "La puse en la puerta del AirBnb. Ya no tengo que andar yendo a dar llaves, les creo un código PIN temporal desde la App que expira cuando el check-out se acaba. Una maravilla total.", n: "Paola G.", t: "Host Certificada" },
                            { r: "Pensé que me iba a costar horrores instalarla yo mismo. Tomó 15 minutos exactos con el destornillador en cruz clásico de casa. Reacción de la huella rapidísima, parece magia.", n: "Esteban V.", t: "Arquitecto" }
                        ].map((rev, i) => (
                            <div key={i} className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
                                <div>
                                    <svg className="w-8 h-8 text-slate-200 mb-4" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
                                    <p className="text-sm font-medium text-slate-600 leading-relaxed mb-8">"{rev.r}"</p>
                                </div>
                                <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
                                    <div>
                                        <div className="font-black text-slate-900">{rev.n}</div>
                                        <div className="text-xs font-bold text-slate-400">{rev.t}</div>
                                    </div>
                                    <div className="flex gap-1 bg-green-50 text-green-600 px-2 py-1 rounded text-[9px] font-bold uppercase items-center">
                                        <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/><path fill="white" d="M10 17l-5-5 1.4-1.4 3.6 3.6 7.6-7.6L19 8z"/></svg>
                                        Validado
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 15. CHECKOUT */}
                <div id="checkout-lock" className="py-24 md:py-32 bg-slate-50 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/clean-gray-paper.png')] opacity-30 pointer-events-none"></div>
                    <div className="max-w-2xl mx-auto px-4 md:px-8 relative z-10">
                        <div className="text-center mb-12">
                            <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">Fortifica tu Puerta</h3>
                            <p className="text-slate-500 font-medium text-lg leading-relaxed shadow-sm">Recibe en casa HOY. Paga el producto <span className="font-bold text-blue-600">ÚNICAMENTE AL RECIBIR.</span></p>
                        </div>
                        <div className="bg-white p-8 md:p-14 rounded-[2.5rem] border border-slate-200 shadow-2xl">
                            <form className="space-y-6" onSubmit={e => e.preventDefault()}>
                                <input type="text" className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-2xl text-slate-900 font-bold text-sm md:text-base px-6 py-5 outline-none transition-shadow" placeholder="Nombre completo" />
                                <input type="tel" className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-2xl text-slate-900 font-bold text-sm md:text-base px-6 py-5 outline-none transition-shadow" placeholder="Teléfono de contacto (WhatsApp)" />
                                <textarea rows={2} className="w-full bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-2xl text-slate-900 font-bold text-sm md:text-base px-6 py-5 outline-none transition-shadow resize-none" placeholder="Ingresa la dirección detallada o Link GPS del hogar a instalar." />
                                <div className="pt-4">
                                    <button className="w-full h-20 bg-slate-900 text-white uppercase tracking-[0.2em] font-black text-sm md:text-base rounded-2xl hover:bg-blue-600 hover:shadow-2xl hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-3 relative overflow-hidden">
                                        Confirmar Envío Express
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
                                    </button>
                                </div>
                            </form>
                            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center gap-6 text-[10px] uppercase tracking-widest font-black">
                                <span className="text-slate-400">Total a pagar:</span>
                                <span className="text-xl text-slate-900">{fmtPrice(product.price)}</span>
                            </div>
                        </div>
                    </div>
                </div>

            </main>

            {/* STICKY MOBILE CTA */}
            <div className="md:hidden fixed bottom-6 left-4 right-4 z-50">
                <div className="bg-white border text-sm border-slate-200 p-4 rounded-3xl flex items-center justify-between shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
                    <div className="pl-2">
                        <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest">En efectivo al recibir</div>
                        <div className="font-black text-slate-900 text-xl leading-none">{fmtPrice(product.price)}</div>
                    </div>
                    <button onClick={() => document.getElementById('checkout-lock')?.scrollIntoView({ behavior: 'smooth' })} className="bg-slate-900 text-white rounded-xl px-6 py-4 font-black uppercase tracking-widest text-[11px] shadow-lg">
                        Adquirir
                    </button>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{__html: `
                @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
                .animate-marquee { animation: marquee 25s linear infinite; }
            `}} />
        </div>
    );
};

export default PdpSmartLock;
