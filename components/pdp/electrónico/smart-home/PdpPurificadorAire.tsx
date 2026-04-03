'use client';
import React, { useState } from 'react';
import { StoreData, Product } from '@/lib/types';
import EnhancedProductGallery from '@/components/pdp/EnhancedProductGallery';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { data: StoreData; product: Product; }

const PdpPurificadorAire: React.FC<Props> = ({ data, product }) => {
    const [openSpecAcc, setOpenSpecAcc] = useState<number | null>(0);
    const [faqOpen, setFaqOpen] = useState<number | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const ai = product.aiContent;
    const fmtPrice = (n: number) => { const s = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); return `Gs. ${s}`; };
    
    // Aesthetic Palette: Clinical / Atmospheric Air
    const bg = '#f8fafc'; // Slate 50
    const textMain = '#0f172a'; // Slate 900 
    const accentBlue = '#0ea5e9'; // Sky 500
    const cardBg = '#ffffff';

    return (
        <div style={{ background: bg, color: textMain, fontFamily: "'Inter', sans-serif" }} className="overflow-x-hidden selection:bg-sky-100 selection:text-sky-900 antialiased">
            
            {/* 0. AIRFLOW BACKGROUND AMBIENT */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <motion.div animate={{ y: [0, -50, 0], opacity: [0.5, 0.8, 0.5] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-sky-300/20 blur-[120px] rounded-full"></motion.div>
                <motion.div animate={{ y: [0, 50, 0], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }} className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-blue-300/20 blur-[140px] rounded-full"></motion.div>
            </div>

            {/* 1. TOP NAV (Clinical Glassmorphism) */}
            <header className="sticky top-0 z-50 bg-white/60 backdrop-blur-2xl border-b border-white/50 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2"><path d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2ZM12 8A4 4 0 1 1 8 12A4 4 0 0 1 12 8Z"/><path d="M12 2v6M22 12h-6M12 22v-6M2 12h6"/></svg>
                        <span className="font-semibold text-xl tracking-tight text-slate-800">
                            Aero<span className="font-light text-sky-500">Klinik</span>
                        </span>
                    </div>
                    <nav className="hidden lg:flex gap-8">
                        {['Filtración', 'HEPA 14', 'AQI Index'].map((item) => (
                            <a key={item} href={`#${item.toLowerCase()}`} className="text-xs font-semibold tracking-wider uppercase text-slate-500 hover:text-sky-600 transition-colors">
                                {item}
                            </a>
                        ))}
                    </nav>
                </div>
            </header>

            <main className="relative z-10 w-full overflow-hidden">
                {/* 2. BREADCRUMBS & MICRO-LOGISTICS */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 pb-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-white shadow-sm px-4 py-2 rounded-full flex items-center gap-2 border border-slate-100">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                            BIENESTAR CORPORAL / RESPIRACIÓN / <span className="text-slate-800">{product.title.substring(0, 15)}...</span>
                        </div>
                        <div className="inline-flex items-center gap-2 text-[10px] font-bold text-sky-600 uppercase tracking-widest">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                            Logística Blanca y Segura (C.O.D)
                        </div>
                    </div>
                </div>

                {/* 3. HERO (MEDICAL/CLINICAL FOCUSED) */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 lg:py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        <div className="flex flex-col relative">
                            {/* Medical Grade Badge */}
                            <div className="flex items-center gap-3 mb-6">
                                <div className="text-[10px] font-bold bg-sky-50 text-sky-600 border border-sky-100 px-3 py-1 rounded-full uppercase tracking-widest">Grado Médico H14</div>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                                    Retiene 99.997%
                                </span>
                            </div>
                            
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-slate-900 leading-[1] mb-6">
                                {ai?.enhancedTitle || product.title}
                            </h1>
                            <p className="text-base lg:text-lg font-medium text-slate-500 mb-10 leading-relaxed">
                                {ai?.enhancedDescription || product.description || 'Respira aire más limpio que un quirófano. Destruye alérgenos, humo de incendios, caspa de mascotas y virus suspendidos antes de que ingresen por tu tráquea corporativa.'}
                            </p>

                            <div className="bg-white rounded-3xl p-8 relative shadow-xl border border-slate-100 overflow-hidden">
                                <div className="absolute -top-10 -right-10 w-32 h-32 bg-sky-100 rounded-full blur-[40px]"></div>
                                <div className="flex items-end gap-6 mb-8 relative z-10">
                                    <span className="text-5xl font-black text-slate-900">{fmtPrice(product.price)}</span>
                                    {product.originalPrice && <span className="text-lg font-semibold text-slate-400 line-through pb-1">{fmtPrice(product.originalPrice)}</span>}
                                </div>
                                <button onClick={() => document.getElementById('checkout-action')?.scrollIntoView({ behavior: 'smooth' })} className="w-full h-[64px] bg-slate-900 text-white font-bold uppercase tracking-widest text-sm rounded-2xl hover:bg-sky-600 transition-colors shadow-lg flex items-center justify-center gap-3 relative z-10">
                                    Adquirir Protección Pulmonar
                                </button>
                                <p className="text-center text-[10px] font-semibold text-slate-400 uppercase tracking-widest mt-4">Transacción segura al momento de entrega.</p>
                            </div>

                            {/* 4. TRUST BADGES FAST */}
                            <div className="grid grid-cols-4 gap-3 mt-8">
                                {[
                                    {v: '400 CADR', l: 'Limpieza'},
                                    {v: 'PM2.5', l: 'Láser'},
                                    {v: '20 dB', l: 'Ruido'},
                                    {v: 'Carbono', l: 'Activo'}
                                ].map((b, i) => (
                                    <div key={i} className="flex flex-col items-center justify-center py-4 bg-white/50 backdrop-blur-sm border border-slate-200 rounded-2xl">
                                        <span className="text-slate-800 font-bold text-lg mb-1">{b.v}</span>
                                        <span className="text-[9px] font-bold text-sky-500 uppercase tracking-widest">{b.l}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="relative bg-white rounded-[3rem] p-4 lg:p-8 aspect-[4/5] border border-slate-100 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] flex items-center justify-center overflow-hidden">
                            {/* Glass overlay subtle effect */}
                            <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/80 to-transparent z-10 pointer-events-none rounded-[3rem]"></div>
                            
                            <EnhancedProductGallery product={product} accentColor={accentBlue} />
                            
                            {/* Floating particles effect to simulate clean air */}
                            {[...Array(6)].map((_, i) => (
                                <motion.div key={i} animate={{ y: [-20, -100], x: [0, (i%2===0?20:-20)], opacity: [0, 1, 0] }} transition={{ duration: 4+i, repeat: Infinity, delay: i*0.5 }} className="absolute bottom-1/4 w-2 h-2 rounded-full bg-sky-200 blur-sm pointer-events-none" style={{ left: `${20 + i*10}%` }}></motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* 5. SPECIFICATION ACCORDIONS */}
                <div id="filtración" className="max-w-4xl mx-auto px-4 md:px-8 py-20">
                    <h2 className="text-3xl font-black tracking-tight text-slate-800 mb-8 text-center text-balance">Barrera de Contención<br/>Absoluta.</h2>
                    <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                        {[
                            { t: 'Malla HEPA H14 (Hospitalaria)', a: 'No es un filtro HEPA comercial que deja pasar partículas minúsculas. Es el estándar utilizado en salas de cirugías estériles. Atrapa partículas del tamaño de 0.1 micrones; es decir, el virus del resfriado es una roca gigante comparado con lo que el filtro frena.' },
                            { t: 'Matriz de Carbono Activado', a: 'Mientras el HEPA detiene sólidos, los gránulos de carbono absorben gases nocivos. Si vives cerca de una avenida y el humo del escape (NOx) entra a tu hogar, o se quema la cena, el carbono lo neutraliza al instante eliminando el olor.' },
                            { t: 'Adquisición COD Sin Estrés', a: 'Lo enviamos como lo que es: equipo médico. Completas los datos de la hoja de ruta inferior. Nuestro servicio logístico lo lleva a tu hogar, abres el precinto verificando la tecnología, y ahí mismo líquidas el importe. 100% libre de sorpresas virtuales.' }
                        ].map((ac, i) => (
                            <div key={i} className="border-b border-slate-100 last:border-b-0">
                                <button onClick={() => setOpenSpecAcc(openSpecAcc===i?null:i)} className="w-full text-left px-8 py-6 flex items-center justify-between font-bold text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-8 h-8 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center font-black">0{i+1}</div>
                                        {ac.t}
                                    </div>
                                    <span className="text-slate-300 font-bold text-xl">{openSpecAcc===i?'-':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {openSpecAcc === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-8 pb-6 pl-20 text-sm font-medium text-slate-500 leading-relaxed">
                                            {ac.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 6. ENDLESS MARQUEE */}
                <div className="w-[100vw] overflow-hidden py-4 bg-sky-400 relative left-[50%] -translate-x-[50%] flextransform border-y-4 border-sky-300">
                    <div className="flex whitespace-nowrap animate-marquee font-black uppercase text-2xl tracking-tighter text-white">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="flex items-center gap-10 px-8">
                                <span>RESPIRA_COMO_NUNCA</span><span className="opacity-50">///</span>
                                <span>SIN_ALÉRGENOS</span><span className="opacity-50">///</span>
                                <span>SUEÑO_PROFUNDO</span><span className="opacity-50">///</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 7. WHY TO USE / BENEFITS */}
                <div id="hepa 14" className="max-w-7xl mx-auto px-4 md:px-8 py-32">
                    <div className="text-center mb-24 relative">
                        <span className="text-[10px] font-bold text-sky-600 uppercase tracking-widest bg-sky-50 px-4 py-2 rounded-full mb-6 inline-block">Análisis del Diagnóstico</span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-slate-900 max-w-3xl mx-auto leading-tight">El interior de tu casa está <span className="text-sky-500">5x más contaminado</span> que la calle.</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { ic: 'M2 12A10 10 0 1 0 22 12 10 10 0 1 0 2 12', t: 'El Enemigo: PM2.5', d: 'El polvo normal cae al piso. Las partículas ultrafinas de humo flotan eternamente, traspasan tu nariz y terminan directo en tu torrente sanguíneo. Esto frena el 100% de ellas.' },
                            { ic: 'M5 12l5 5L20 7', t: 'Alergias Terminadas', d: 'Levantarte con la nariz tapada o picazón en los ojos no es "normal". Es una reacción inmune constante a los ácaros de tu sábanas. Depurar tu cuarto corta la alergia de raíz.' },
                            { ic: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z', t: 'Modo Ultra-Nocturno', d: 'Al apagar las luces de tu cuarto, la máquina apaga sus pantallas, reduce el ventilador a unos inaudibles 20 decibelios y te inyecta aire purificado mientras reparas células durmiendo.' }
                        ].map((b, i) => (
                            <div key={i} className="bg-white border border-slate-100 p-10 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
                                <div className="w-16 h-16 bg-sky-50 rounded-2xl flex items-center justify-center mb-8">
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-sky-500 group-hover:scale-125 transition-transform"><path strokeLinecap="round" strokeLinejoin="round" d={b.ic}/></svg>
                                </div>
                                <h3 className="text-xl font-bold tracking-tight text-slate-800 mb-4">{b.t}</h3>
                                <p className="text-sm font-medium text-slate-500 leading-relaxed">{b.d}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 8. HOW TO USE / SET UP AESTHETIC */}
                <div id="aqi index" className="py-32 border-t border-slate-200 bg-white relative">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50 clip-path-diagonal"></div>
                    <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                            <div className="order-2 lg:order-1 relative aspect-square bg-slate-900 rounded-[3rem] p-8 flex flex-col items-center justify-center shadow-2xl">
                                <div className="w-full text-center mb-8"></div>
                                <div className="w-48 h-48 rounded-full border-8 border-emerald-400 flex flex-col items-center justify-center relative shadow-[0_0_50px_rgba(52,211,153,0.3)] bg-slate-950">
                                    <div className="text-emerald-400 font-bold text-sm tracking-widest mb-1">PM2.5</div>
                                    <div className="text-white font-black text-6xl tracking-tighter leading-none mb-1">003</div>
                                    <div className="text-emerald-400 font-bold text-[10px] tracking-widest uppercase">Excelente</div>
                                </div>
                                <div className="text-center mt-12 w-full max-w-xs">
                                    <div className="flex justify-between text-[10px] text-slate-500 font-bold uppercase mb-2">
                                        <span>Automático</span><span>Láser ON</span>
                                    </div>
                                    <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-emerald-400 w-1/4"></div>
                                    </div>
                                </div>
                            </div>

                            <div className="order-1 lg:order-2">
                                <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-10 text-balance">Inteligencia<br/>Atmosférica.</h2>
                                <p className="text-slate-500 font-medium mb-12 leading-relaxed text-lg">No necesitas adivinar si el aire está sucio. Un sensor láser microscópico analiza las partículas volando frente a él 1,000 veces por segundo.</p>
                                
                                <div className="space-y-8">
                                    {[
                                        { col: 'bg-emerald-400', txt: 'Verde (0 - 50 AQI)', d: 'Aire de nivel hospitalario. La máquina gira apenas para mantener todo circulando.' },
                                        { col: 'bg-amber-400', txt: 'Naranja (51 - 150 AQI)', d: 'Acabas de plumear, barrer, o alguien encendió un incienso cerca. Pasa a velocidad 2.' },
                                        { col: 'bg-rose-500', txt: 'Rojo (150+ AQI)', d: 'Derrame de humo o contaminación extrema ingresando. Activa la turbina al máximo para despejar toda la habitación en 5 minutos.' }
                                    ].map((s, i) => (
                                        <div key={i} className="flex gap-6 items-start">
                                            <div className={`mt-1.5 w-4 h-4 rounded-full shadow-lg ${s.col} shrink-0 ring-4 ring-offset-2 ring-slate-100`}></div>
                                            <div>
                                                <h4 className="text-sm font-bold text-slate-900 mb-2">{s.txt}</h4>
                                                <p className="text-sm font-medium text-slate-500 leading-relaxed">{s.d}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 9. DEEP DIVE MULTIMEDIA */}
                <div className="py-40 relative text-center border-t border-slate-200 overflow-hidden bg-sky-500">
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/micro-carbon.png')] mix-blend-multiply"></div>
                    <div className="max-w-4xl mx-auto px-4 md:px-8 relative z-10 text-white">
                        <div className="w-20 h-20 mx-auto bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-8">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/></svg>
                        </div>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-8 max-w-2xl mx-auto leading-[1.1]">Turbina Vortex de 360 Grados.</h2>
                        <p className="text-lg md:text-xl font-medium text-sky-100 leading-relaxed max-w-2xl mx-auto">
                            Toma aire putrefacto de paredes enteras por su cuerpo cilíndrico, lo pasa a presión por el HEPA y dispara aire prístino directo hacia el techo para crear una cascada de limpieza invisible que barre todo el salón.
                        </p>
                    </div>
                </div>

                {/* 10. COMPARISON TABLE */}
                <div className="max-w-5xl mx-auto px-4 md:px-8 py-32">
                    <div className="text-center mb-16">
                        <div className="text-[10px] font-bold text-sky-600 uppercase tracking-widest bg-sky-50 px-4 py-2 rounded-full mb-6 inline-block">Calidad Garantizada</div>
                        <h2 className="text-3xl font-black tracking-tighter text-slate-900">Equipo Clínico vs Comunes.</h2>
                    </div>
                    
                    <div className="bg-white border rounded-[2rem] shadow-lg border-slate-200 overflow-hidden">
                        <div className="grid grid-cols-3 bg-slate-50 border-b border-slate-200 text-[9px] md:text-xs font-bold uppercase tracking-widest text-slate-500">
                            <div className="p-6 md:p-8">Métrico Clave</div>
                            <div className="p-6 md:p-8 text-center text-sky-600 bg-sky-50/50">AERO KLINIK PROTECT</div>
                            <div className="p-6 md:p-8 text-center">Filtro de Supermercado</div>
                        </div>
                        {[
                            { k: 'Densidad del Filtro', u: 'HEPA H14 (Hospitales)', t: 'HEPA H11 (Promedio)' },
                            { k: 'Motor / Ruido', u: 'Inducción Magnética (20dB)', t: 'A escobillas chirriantes (50+ dB)' },
                            { k: 'Captura Biológica', u: 'Sí (Frena esporas y caspa)', t: 'Solo frena polvo grande' },
                            { k: 'Gasto energético', u: 'Menos que una bombita LED', t: 'Motor devorador ineficiente' }
                        ].map((r, i) => (
                            <div key={i} className="grid grid-cols-3 border-b border-slate-100 last:border-b-0 text-sm">
                                <div className="p-6 md:p-8 font-bold text-slate-800 flex items-center">{r.k}</div>
                                <div className="p-6 md:p-8 font-black text-slate-900 text-center flex items-center justify-center bg-blue-50/10 hover:bg-blue-50/50 transition-colors">{r.u}</div>
                                <div className="p-6 md:p-8 font-medium text-slate-400 text-center flex items-center justify-center line-through">{r.t}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 11. RISK REVERSAL WARRANTY */}
                <div className="max-w-5xl mx-auto px-4 md:px-8 py-12">
                    <div className="bg-slate-900 p-10 md:p-14 rounded-[3rem] text-white md:flex items-center gap-12 shadow-2xl relative overflow-hidden text-center md:text-left">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/20 blur-[80px] rounded-full pointer-events-none"></div>
                        <div className="w-24 h-24 bg-white/10 backdrop-blur-md text-sky-400 border border-white/20 font-black text-4xl rounded-full shrink-0 flex mx-auto md:mx-0 items-center justify-center shadow-lg mb-8 md:mb-0 relative z-10">
                            ✓
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-2xl md:text-3xl font-black tracking-tight mb-4 text-white">Salud Directa a tu Hogar.</h3>
                            <p className="font-medium text-slate-400 leading-relaxed text-sm md:text-base mb-2">
                                Esto trata sobre los pulmones de tu familia. No arriesgues pagos online ciegamente. Rellena el formato, despachamos la caja reforzada con personal capacitado; la destapas, compruebas el gigantesco filtro H14 y el motor limpio, y pagas el monto con dinero en mano. 
                            </p>
                        </div>
                    </div>
                </div>

                {/* 12. BRAND ETHOS */}
                <div className="py-24 border-y border-slate-200 mt-16 text-center px-4 bg-slate-50">
                    <div className="max-w-3xl mx-auto">
                        <h3 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 mb-6">El agua que bebes<br/>está limpia.<br/><span className="text-sky-500">Tu aire no.</span></h3>
                        <p className="text-base font-medium text-slate-500 leading-loose mx-auto">Te niegas a tomar agua turbia o con polvo, entonces, ¿por qué exhalas y respiras sin filtrar los 11,000 litros de aire que tu cuerpo necesita por día? El purificador dejó de ser un lujo de oficina; es tu riñón externo.</p>
                    </div>
                </div>

                {/* 13. FAQ */}
                <div className="max-w-4xl mx-auto px-4 md:px-8 py-24">
                    <div className="text-center mb-16">
                        <h2 className="text-2xl font-black uppercase tracking-tighter text-slate-900">Respuestas Bio-Técnicas.</h2>
                    </div>
                    <div className="space-y-4">
                        {[
                            {q: '¿Cada cuánto tiempo debo gastar en cambiar el filtro?', a: 'El filtro colosal H14 dura entre 6 a 12 meses si se usa prendido 24 horas todos los días, dependiendo tu zona. La máquina te avisará con una luz roja exacta cuando esté tapado de mugre letal.'},
                            {q: '¿Sirve si fumo en la misma habitación?', a: 'Totalmente. El pre-filtro atrapa la ceniza y el carbono activado absorbe molecularmente el olor residual del tabaco. La habitación no olerá a humo para la siguiente persona en entrar.'},
                            {q: 'Quiero abonar al recibir, ¿tengo garantía de motor?', a: 'Ese es nuestro método insignia. Envías orden sin tarjeta. Enviamos el equipo a tu residencia. Pagas y estás cubierto legalmente por 1 año sobre el motor inverter interno.'}
                        ].map((f, i) => (
                            <div key={i} className="bg-white border border-slate-200 rounded-[2rem] hover:shadow-md transition-all">
                                <button onClick={() => setFaqOpen(faqOpen===i?null:i)} className="w-full text-left p-6 md:p-8 flex items-center justify-between font-bold text-sm text-slate-900 uppercase tracking-wide">
                                    <span>{f.q}</span>
                                    <span className="text-sky-500 text-2xl font-light leading-none">{faqOpen===i?'-':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {faqOpen === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 md:px-8 pb-8 text-sm font-medium text-slate-500 leading-relaxed pt-2">
                                            {f.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 14. EXPANDED REVIEWS */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-24 border-t border-slate-200 bg-white">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black tracking-tighter italic text-slate-800 mb-6">Testimonios Clínicos.</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { r: "Dejé de roncar y de despertar con la garganta seca a los tres días de ponerlo en mi mesita de noche. El aire literamente sabe más limpio. Su modo noche ni siquiera se escucha.", n: "Marcos P.", t: "Cliente (Asmático)" },
                            { r: "Tengo dos Golden Retrievers. Me encantaban pero la casa olía fuerte. Este purificador elimina al 100% el olor a mascota por su carbono activo. Lo pagué contra entrega sin dramas.", n: "Verónica L.", t: "Dueña de mascotas" },
                            { r: "Me mudé cerca de una avenida de alto tráfico. El polvo negro en mi ventana me asustaba. Lo prendía y en 10 minutos se ponía rojo el láser y limpiaba toda la contaminación pesada.", n: "Lic. Rómulo T.", t: "Urbanista" }
                        ].map((rev, i) => (
                            <div key={i} className="bg-slate-50 border border-slate-100 p-10 rounded-[2rem] relative">
                                <p className="text-sm font-medium text-slate-600 leading-relaxed mb-8 relative z-10 text-balance">"{rev.r}"</p>
                                <div className="flex items-center justify-between pt-6 border-t border-slate-200">
                                    <div className="text-xs font-black text-slate-900 uppercase tracking-widest">{rev.n}</div>
                                    <div className="text-[10px] font-bold text-sky-500 uppercase">{rev.t}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 15. CHECKOUT */}
                <div id="checkout-action" className="py-24 md:py-32 bg-white relative border-t-4 border-sky-400 overflow-hidden">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50 clip-path-diagonal"></div>
                    <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24 items-center">
                        <div className="md:col-span-5 relative text-center md:text-left">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-sky-600 mb-6 bg-sky-50 px-3 py-1 rounded inline-block">Protocolo COD</span>
                            <h3 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-6 text-slate-900 leading-[0.9]">Bloquea el<br/>Humos.</h3>
                            <p className="text-sm font-medium text-slate-500 mb-10 leading-relaxed max-w-sm mx-auto md:mx-0">Sin compromisos digitales. Completa el folio, recíbelo en tu estancia y efectúa tu pago tras constatar calidad con el agente.</p>
                            
                            <div className="text-5xl font-black text-slate-900 tracking-tighter">{fmtPrice(product.price)}</div>
                        </div>
                        
                        <div className="md:col-span-7 w-full">
                            <form className="bg-white p-8 md:p-12 border border-slate-200 shadow-[0_30px_60px_rgba(0,0,0,0.05)] relative rounded-[3rem]" onSubmit={e=>e.preventDefault()}>
                                <div className="space-y-6">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-2">Identidad</label>
                                        <input type="text" className="w-full bg-slate-50 border border-slate-200 focus:border-sky-500 text-slate-900 font-bold text-sm px-6 py-5 outline-none transition-all rounded-2xl" placeholder="Nombre Destinatario" />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-2">Telefónico</label>
                                        <input type="tel" className="w-full bg-slate-50 border border-slate-200 focus:border-sky-500 text-slate-900 font-bold text-sm px-6 py-5 outline-none transition-all rounded-2xl" placeholder="Número Celular de Enlace" />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-2">Santuario Domiciliario</label>
                                        <textarea rows={2} className="w-full bg-slate-50 border border-slate-200 focus:border-sky-500 text-slate-900 font-bold text-sm px-6 py-5 outline-none transition-all resize-none rounded-[2rem]" placeholder="Dirección Exacta de Recepción" />
                                    </div>
                                    <div className="pt-6">
                                        <button className="w-full h-[70px] bg-slate-900 text-white font-bold uppercase tracking-widest text-sm hover:bg-sky-500 transition-colors shadow-lg rounded-[2rem]">
                                            Despachar Solicitud (Pago Presencial)
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
                <div className="bg-white border border-slate-100 p-4 rounded-3xl flex items-center justify-between shadow-[0_40px_100px_rgba(0,0,0,0.5)]">
                    <div className="pl-2">
                        <div className="text-[10px] font-bold uppercase text-slate-400 tracking-widest mb-1">Pago Físico Aprobado</div>
                        <div className="font-black text-slate-900 text-2xl tracking-tighter leading-none">{fmtPrice(product.price)}</div>
                    </div>
                    <button onClick={() => document.getElementById('checkout-action')?.scrollIntoView({ behavior: 'smooth' })} className="bg-sky-500 text-white px-8 py-4 rounded-2xl font-bold uppercase tracking-widest text-[11px] shadow-sm">
                        Comprar
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

export default PdpPurificadorAire;
