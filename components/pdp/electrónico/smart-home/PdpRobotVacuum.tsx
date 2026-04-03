'use client';
import React, { useState } from 'react';
import { StoreData, Product } from '@/lib/types';
import EnhancedProductGallery from '@/components/pdp/EnhancedProductGallery';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { data: StoreData; product: Product; }

const PdpRobotVacuum: React.FC<Props> = ({ data, product }) => {
    const [openSpecAcc, setOpenSpecAcc] = useState<number | null>(0);
    const [faqOpen, setFaqOpen] = useState<number | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const ai = product.aiContent;
    const fmtPrice = (n: number) => { const s = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); return `Gs. ${s}`; };
    
    // Aesthetic Palette: LiDAR Domotics
    const bg = '#ffffff'; 
    const textMain = '#18181b'; // Zinc 900
    const textMuted = '#71717a'; // Zinc 500
    const accentLaser = '#ef4444'; // Red 500
    const accentLaserGlow = 'rgba(239, 68, 68, 0.2)';

    return (
        <div style={{ background: bg, color: textMain, fontFamily: "'Inter', sans-serif" }} className="overflow-x-hidden selection:bg-red-500 selection:text-white antialiased relative">
            
            {/* 0. AMBIENT LIDAR MAPPING GRID */}
            <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(#ef4444 1px, transparent 1px), linear-gradient(90deg, #ef4444 1px, transparent 1px)`, backgroundSize: '60px 60px' }}></div>

            {/* 1. TOP NAV (Radar Style) */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-zinc-200">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full border border-red-500 flex items-center justify-center relative">
                            <div className="w-4 h-4 rounded-full border border-red-500 animate-ping absolute"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                        </div>
                        <span className="font-black text-xl tracking-tighter text-zinc-900 uppercase">
                            AUTONOMA<span className="text-zinc-300">X</span>
                        </span>
                    </div>
                    <nav className="hidden md:flex gap-8">
                        {['Navegación', 'Succión', 'Mapeo'].map((item) => (
                            <a key={item} href={`#${item.toLowerCase()}`} className="text-[10px] font-bold tracking-widest uppercase text-zinc-500 hover:text-red-500 transition-colors">
                                {item}
                            </a>
                        ))}
                    </nav>
                </div>
            </header>

            <main className="relative z-10">
                {/* 2. BREADCRUMBS & MICRO-LOGISTICS */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 pb-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-100 pb-4">
                        <div className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 bg-zinc-100 px-3 py-1.5 rounded-lg w-max">
                            HOGAR / DOMÓTICA / <span className="text-zinc-800">{product.title.substring(0, 15)}...</span>
                        </div>
                        <div className="inline-flex items-center gap-2 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                            Logística Física Protegida
                        </div>
                    </div>
                </div>

                {/* 3. HERO (LIDAR SCANNED) */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 lg:py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="relative bg-zinc-50 p-8 rounded-full aspect-square border border-zinc-200 flex items-center justify-center shadow-2xl">
                            {/* Scanning Laser Effect */}
                            <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }} className="absolute inset-0 rounded-full border-[10px] border-r-transparent border-t-transparent border-b-transparent border-l-red-500/20 z-0 mask-image-radial"></motion.div>
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 rounded-full mix-blend-multiply pointer-events-none"></div>

                            <div className="relative z-10 w-4/5 h-4/5 bg-white rounded-full p-4 border border-zinc-200 shadow-xl overflow-hidden flex items-center justify-center">
                                <EnhancedProductGallery product={product} accentColor={accentLaser} />
                            </div>
                        </motion.div>

                        <div className="flex flex-col relative pt-4">
                            {/* Sensor Badge */}
                            <div className="flex items-center gap-3 mb-6">
                                <div className="text-[10px] font-black bg-red-500 text-white px-2 py-1 uppercase tracking-widest rounded-sm">V2.0 LiDAR</div>
                                <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">Navegación Láser Verificada</span>
                            </div>
                            
                            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-zinc-900 leading-[1] mb-6">
                                {ai?.enhancedTitle || product.title}
                            </h1>
                            <p className="text-base font-medium text-zinc-500 mb-8 leading-relaxed">
                                {ai?.enhancedDescription || product.description || 'Barre. Trapea. Mapea tu hogar al milímetro. Disparando lásers imperceptibles para esquivar cables, escaleras y mascotas. Mantén tus pisos inmaculados mientras tú no estás.'}
                            </p>

                            <div className="bg-zinc-900 rounded-3xl p-6 lg:p-8 relative overflow-hidden shadow-2xl">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/20 blur-3xl rounded-full pointer-events-none"></div>
                                <div className="flex items-end gap-6 mb-8 relative z-10">
                                    <span className="text-4xl md:text-5xl font-black text-white">{fmtPrice(product.price)}</span>
                                    {product.originalPrice && <span className="text-lg font-bold text-zinc-500 line-through pb-1">{fmtPrice(product.originalPrice)}</span>}
                                </div>
                                <button onClick={() => document.getElementById('checkout-action')?.scrollIntoView({ behavior: 'smooth' })} className="w-full h-[60px] bg-white text-zinc-900 font-black uppercase tracking-widest text-sm rounded-xl hover:bg-zinc-100 transition-colors flex items-center justify-center gap-3">
                                    Enviar a Mi Domicilio
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                                </button>
                                <p className="text-center text-[10px] text-zinc-500 uppercase tracking-widest mt-4">Pago seguro al confirmar la unidad.</p>
                            </div>

                            {/* 4. TRUST BADGES TECHNICAL */}
                            <div className="grid grid-cols-4 gap-2 mt-6">
                                {[
                                    {v: '4000Pa', l: 'Succión'},
                                    {v: 'LiDAR', l: 'Radar'},
                                    {v: 'APP', l: 'WiFi 5G'},
                                    {v: 'HEPA', l: 'Filtro'}
                                ].map((b, i) => (
                                    <div key={i} className="flex flex-col items-center justify-center py-4 bg-zinc-50 rounded-xl border border-zinc-200">
                                        <span className="text-zinc-900 font-black text-sm md:text-base">{b.v}</span>
                                        <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest mt-1">{b.l}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 5. SPECIFICATION ACCORDIONS */}
                <div id="mapeo" className="max-w-5xl mx-auto px-4 md:px-8 py-16">
                    <h2 className="text-2xl font-black uppercase tracking-tighter text-zinc-900 mb-8 text-center">Torreta de Control.</h2>
                    <div className="bg-zinc-50 border border-zinc-200 rounded-3xl overflow-hidden">
                        {[
                            { t: 'Navegación Láser 360°', a: 'No es una aspiradora que choca ciegamente como una bola de pinball. La torreta superior gira enviando pulsos de luz, creando un mapa 3D de tu casa en tiempo real.' },
                            { t: 'Rutinas de Limpieza por App', a: '¿Quieres que limpie la cocina después de las 3PM pero no toque el pasillo? Desde tu celular puedes dibujar muros virtuales y zonas prohibidas donde no entrará jamás.' },
                            { t: 'Fórmula de Compra Cero Estrés', a: 'Olvida las pasarelas dudosas. Nosotros te enviamos este robot en su caja sellada. El transportista te la entrega en tus manos y tú le abonas allí mismo en la puerta. Seguridad total.' }
                        ].map((ac, i) => (
                            <div key={i} className="border-b border-zinc-200 last:border-b-0 group">
                                <button onClick={() => setOpenSpecAcc(openSpecAcc===i?null:i)} className="w-full text-left px-8 py-6 flex items-center justify-between text-xs font-black uppercase tracking-wider text-zinc-900 hover:bg-zinc-100 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                        {ac.t}
                                    </div>
                                    <span className="text-red-500 font-bold text-xl">{openSpecAcc===i?'-':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {openSpecAcc === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-8 pb-6 pl-14 text-sm font-medium text-zinc-600 leading-relaxed">
                                            {ac.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 6. ENDLESS MARQUEE (TECH SPECS) */}
                <div className="w-[100vw] overflow-hidden py-4 bg-zinc-900 relative left-[50%] -translate-x-[50%]">
                    <div className="flex whitespace-nowrap animate-marquee font-black uppercase text-xl tracking-tighter text-white">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="flex items-center gap-12 px-6">
                                <span>SIN_CHOQUES_ABSURDOS</span><span className="text-red-500">•</span>
                                <span>SENSORES_ANTI_CAÍDAS</span><span className="text-red-500">•</span>
                                <span>BARRIDO+TRAPEADO</span><span className="text-red-500">•</span>
                                <span>RETORNO_A_BASE</span><span className="text-red-500">•</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 7. WHY TO USE / BENEFITS (ENGINEERING FOCUS) */}
                <div className="bg-zinc-50 py-24 border-b border-zinc-200">
                    <div className="max-w-7xl mx-auto px-4 md:px-8">
                        <div className="text-center mb-20">
                            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-zinc-900 mb-6">Tu tiempo<br/>vale más.</h2>
                            <p className="text-base font-medium text-zinc-500 max-w-xl mx-auto">Deja de perder 4 horas a la semana pasando una escoba. Esta unidad opera sola, incluso de noche.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                            {[
                                { ic: 'M3 10h18M3 14h18M5 6h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z', t: 'Succión Anti-Pelo', d: 'El motor DC sin escobillas extrae 4000Pa de presión. Levanta cereales enteros y pelo de mascota incrustado en la alfombra.' },
                                { ic: 'M2 12h4l3-9 5 18 3-9h5', t: 'Escalador Todoterreno', d: 'Sus ruedas de oruga sintética trepan desniveles cilíndricos de hasta 2 cm. Pasa del piso a la alfombra sin quedar atorada.' },
                                { ic: 'M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6', t: 'Auto-Recarga Inductiva', d: 'Si por casualidad llega al 15% de batería vaciando tu casa, volverá sola a su rincón de carga y luego retomará donde quedó.' }
                            ].map((b, i) => (
                                <div key={i} className="flex flex-col items-center text-center p-8 bg-white rounded-3xl border border-zinc-200 shadow-sm hover:shadow-xl transition-all hover:border-red-500 group">
                                    <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-6 text-red-500 group-hover:bg-red-500 group-hover:text-white transition-colors">
                                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={b.ic}/></svg>
                                    </div>
                                    <h3 className="text-lg font-black uppercase tracking-tighter text-zinc-900 mb-4">{b.t}</h3>
                                    <p className="text-sm font-medium text-zinc-500 leading-relaxed">{b.d}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 8. HOW TO USE / SET UP AESTHETIC */}
                <div id="navegación" className="max-w-7xl mx-auto px-4 md:px-8 py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="relative w-full aspect-square bg-zinc-900 rounded-full overflow-hidden border-8 border-zinc-100 flex items-center justify-center shadow-inner">
                            {/* Visual App Map Representation */}
                            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `linear-gradient(#ffffff 2px, transparent 2px), linear-gradient(90deg, #ffffff 2px, transparent 2px)`, backgroundSize: '20px 20px' }}></div>
                            
                            {/* Blue zone */}
                            <div className="absolute top-[20%] left-[20%] w-[60%] h-[30%] border border-red-500 bg-red-500/10 z-10 flex items-center justify-center">
                                <span className="text-[10px] font-mono text-red-400">RESTRICTED_ZONE</span>
                            </div>
                            {/* Active path */}
                            <svg className="absolute inset-0 z-10 w-full h-full" viewBox="0 0 100 100" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="2,2">
                                <path d="M 10,80 L 10,50 L 80,50 L 80,90" className="animate-pulse" />
                                <circle cx="80" cy="90" r="2" fill="white"/>
                            </svg>
                        </div>

                        <div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-red-500 mb-2 block">Protocolo Zero-Touch</span>
                            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-8 text-zinc-900">Domina desde<br/>la Oficina.</h2>
                            <p className="text-zinc-600 font-medium mb-12 leading-relaxed">No necesitas levantarte a prenderla. Tu celular es el control maestro y la unidad Wi-Fi recibe comandos desde cualquier parte del mundo.</p>
                            
                            <div className="space-y-6">
                                {[
                                    { s: '01', t: 'Vuelca los Residuos', d: 'Abre el paquete recibido COD, extrae la base y conéctala a la pared. Deposita el robot.' },
                                    { s: '02', t: 'Pulsa SCAN', d: 'El robot dará su primer paseo ciego por toda la casa escaneando el perímetro y enviando el mapa 3D a tu celular.' },
                                    { s: '03', t: 'Programa', d: 'Entra a la cama, pon que todos los días a las 11AM aspire y trapee en nivel húmedo la cocina.' }
                                ].map((s, i) => (
                                    <div key={i} className="flex gap-6 items-start">
                                        <div className="text-xl font-black text-white bg-zinc-900 border-4 border-zinc-100 w-12 h-12 flex items-center justify-center rounded-2xl shrink-0 shadow-sm">{s.s}</div>
                                        <div>
                                            <h4 className="text-base font-black uppercase tracking-tighter mb-2 text-zinc-900">{s.t}</h4>
                                            <p className="text-sm font-medium text-zinc-500 leading-relaxed">{s.d}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 9. DEEP DIVE MULTIMEDIA */}
                <div id="succión" className="py-32 relative text-center border-t border-zinc-200 overflow-hidden">
                    <div className="absolute inset-0 bg-red-500"></div>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/micro-carbon.png')] opacity-20 mix-blend-multiply"></div>
                    
                    <div className="max-w-4xl mx-auto px-4 md:px-8 relative z-10 text-white">
                        <div className="w-24 h-24 mx-auto border-[6px] border-white/20 rounded-full flex items-center justify-center mb-8 relative">
                            <div className="absolute inset-0 border-[6px] border-white rounded-full animate-spin-slow" style={{ borderTopColor: 'transparent', borderBottomColor: 'transparent' }}></div>
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8">Cepillo Flotante Multi-Superficie.</h2>
                        <p className="text-lg md:text-xl font-medium text-red-100 leading-relaxed max-w-2xl mx-auto">
                            El cabezal de limpieza ajusta su altura automáticamente. Al detectar alfombras o desniveles, desciende para rozar el fondo y aplicar toda la presión estática, extrayendo ácaros invisibles.
                        </p>
                    </div>
                </div>

                {/* 10. COMPARISON TABLE */}
                <div className="max-w-5xl mx-auto px-4 md:px-8 py-24">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black uppercase tracking-tight text-zinc-900">Filtro Antiguos vs LiDAR.</h2>
                    </div>
                    
                    <div className="bg-white border rounded-3xl shadow-sm border-zinc-200 overflow-hidden">
                        <div className="grid grid-cols-3 bg-zinc-900 text-white text-[10px] md:text-xs font-bold uppercase tracking-widest">
                            <div className="p-5 md:p-6 text-left">Función Táctica</div>
                            <div className="p-5 md:p-6 text-center text-red-400 bg-red-500/10">NUESTRA UNIDAD</div>
                            <div className="p-5 md:p-6 text-center text-zinc-500">ROBOT ECONÓMICO ("CIEGO")</div>
                        </div>
                        {[
                            { k: 'Metodología de Limpieza', u: 'Filas exactas sin repetir', t: 'Rebote aleatorio estúpido' },
                            { k: 'Zonas Prohibidas', u: 'Digital mediante App', t: 'Requiere cinta magnética física' },
                            { k: 'Trapeado Electrónico', u: 'Válvula de goteo controlado', t: 'Moja todo arruinando madera' },
                            { k: 'Escalada de Alfombras', u: 'Eleva el trapo y aumenta succión', t: 'Se atasca pidiendo rescate' }
                        ].map((r, i) => (
                            <div key={i} className="grid grid-cols-3 border-b border-zinc-100 last:border-b-0 text-sm">
                                <div className="p-5 md:p-6 font-bold text-zinc-800 flex items-center">{r.k}</div>
                                <div className="p-5 md:p-6 font-black text-zinc-900 text-center flex items-center justify-center bg-red-50/50">{r.u}</div>
                                <div className="p-5 md:p-6 font-medium text-zinc-400 text-center flex items-center justify-center line-through">{r.t}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 11. RISK REVERSAL WARRANTY */}
                <div className="max-w-5xl mx-auto px-4 md:px-8 py-12">
                    <div className="bg-zinc-50 p-10 md:p-12 rounded-3xl border-2 border-dashed border-zinc-300 md:flex items-center gap-10">
                        <div className="w-20 h-20 bg-white border border-zinc-200 text-zinc-900 font-black text-5xl rounded-full shrink-0 flex items-center justify-center shadow-sm mb-6 md:mb-0">
                            ✓
                        </div>
                        <div>
                            <h3 className="text-2xl font-black uppercase tracking-tight mb-4 text-zinc-900">Sin Tarjeta, Sin Riesgo.</h3>
                            <p className="font-medium text-zinc-500 leading-relaxed text-sm md:text-base">
                                La logística pesada la ponemos nosotros. Dejas tus datos, enviamos un mensajero a tu hogar perimetral, rompes el sello en su presencia y le pagas únicamente cuando verifiques la calidad de la unidad física. Gozas de cobertura total de motor por 1 año de desperfectos de fábrica reales.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 12. BRAND ETHOS */}
                <div className="py-24 border-y border-zinc-200 mt-16 text-center px-4 bg-white">
                    <div className="max-w-3xl mx-auto">
                        <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-zinc-900 mb-6">Delega lo<br/><span className="text-zinc-300">mundano.</span></h3>
                        <p className="text-base font-medium text-zinc-500 leading-loose mx-auto">No compras una aspiradora. Compras 4 horas libres para tu familia los fines de semana. La robótica avanzada no es para lucir, es para quitarte el peso del mantenimiento doméstico.</p>
                    </div>
                </div>

                {/* 13. FAQ */}
                <div className="max-w-4xl mx-auto px-4 md:px-8 py-24">
                    <div className="text-center mb-16">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Banco de Respuestas</span>
                        <h2 className="text-3xl font-black uppercase tracking-tight text-zinc-900 mt-2">Dudas Frecuentes.</h2>
                    </div>
                    <div className="space-y-4">
                        {[
                            {q: '¿Se requiere internet para usarla?', a: '¡No! Si no tienes WiFi o prefieres privacidad, simplemente aprietas el botón físico superior y limpiará la casa impecablemente usando su radar, y volverá sola a la base. La app es opcional (aunque recomendada para los bloqueos virtuales).'},
                            {q: 'Tengo perros y gatos que sueltan MUCHO pelo, ¿se traba?', a: 'Justamente posee el "Anti-Tangle Brush" y sus 4000Pa extraen pelo adherido y arena sin detener los rodamientos. El depósito de basura interno soporta muchísimo volumen.'},
                            {q: '¿Cómo le pago al que me la trae?', a: 'Completas el módulo de abajo sin tarjeta de crédito. Al llegar a tu timbre el enviado logístico, cruzan la caja y le pasas el dinero en billetes o vía transferencia. Total seguridad.'}
                        ].map((f, i) => (
                            <div key={i} className="bg-white border border-zinc-200 rounded-2xl hover:border-red-500 hover:shadow-lg transition-all">
                                <button onClick={() => setFaqOpen(faqOpen===i?null:i)} className="w-full text-left p-6 md:p-8 flex items-center justify-between font-black text-sm text-zinc-900 uppercase tracking-widest">
                                    <span>{f.q}</span>
                                    <span className="text-red-500 text-2xl leading-none">{faqOpen===i?'-':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {faqOpen === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 md:px-8 pb-8 text-sm font-medium text-zinc-600 leading-relaxed pt-2">
                                            {f.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 14. EXPANDED REVIEWS (UGC) */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 border-t border-zinc-200 bg-zinc-50">
                    <div className="text-center mb-16">
                        <div className="text-red-500 font-bold tracking-widest text-[10px] uppercase mb-4 py-1 px-3 bg-red-100 inline-block rounded-full">Reseñas en Campo</div>
                        <h2 className="text-3xl font-black uppercase tracking-tight text-zinc-900 mb-4">Aprobación Total.</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { r: "Tuve una aspiradora barata de las que rebotan por años. Pasar a esta con tecnología LÁSER es otro mundo. Sabe exactamente dónde está, hace carriles perfectos y no raya los zócalos al chocar.", n: "Miguel R.", t: "Padre de familia (2 Gatos)" },
                            { r: "La función de trapear es sorprendentemente útil para las baldosas. Y el método de entrega COD fue perfecto, llené los datos acá abajo, el tipo vino, la revisé y pagué en efectivo sin estrés.", n: "Valeria C.", t: "Gerente" },
                            { r: "Tengo alfombras gruesas persas y se las banca sin problema alguno. Aumenta el motor automáticamente cuando las pisa. Excelente producto.", n: "Federico J.", t: "Inversor" }
                        ].map((rev, i) => (
                            <div key={i} className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-sm relative pt-12">
                                <div className="absolute top-0 left-8 -translate-y-1/2 w-12 h-12 bg-zinc-900 text-white rounded-full flex items-center justify-center font-serif text-3xl italic">"</div>
                                <p className="text-sm font-medium text-zinc-600 leading-relaxed mb-8">"{rev.r}"</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-zinc-100 rounded-full flex items-center justify-center font-black text-zinc-900">{rev.n.charAt(0)}</div>
                                    <div>
                                        <div className="font-black text-xs uppercase tracking-wider text-zinc-900">{rev.n}</div>
                                        <div className="text-[10px] font-bold text-red-500 uppercase tracking-widest">{rev.t}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 15. CHECKOUT */}
                <div id="checkout-action" className="py-24 md:py-32 bg-white relative border-t-4 border-red-500">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
                    <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
                        <div className="md:col-span-5 relative">
                            {/* Scanning overlay behind text */}
                            <div className="absolute -left-10 top-0 w-1 h-full bg-red-500 blur-sm opacity-50 -z-10"></div>
                            
                            <span className="text-[10px] font-bold uppercase tracking-widest text-red-500 mb-4 block bg-red-50 px-3 py-1 w-max rounded-sm">Orden de Envío Seguro</span>
                            <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 text-zinc-900 leading-none">Ejecuta el<br/>Módulo.</h3>
                            <p className="text-sm font-medium text-zinc-500 mb-8 leading-relaxed max-w-sm">No pidas la caja sino dejas tus datos firmes. Recepción C.O.D. directo al conductor en efectivo.</p>
                            
                            <div className="text-5xl md:text-6xl font-black text-zinc-900 tracking-tighter">{fmtPrice(product.price)}</div>
                        </div>
                        
                        <div className="md:col-span-7 w-full">
                            <form className="bg-zinc-50 p-8 md:p-12 rounded-[2rem] border border-zinc-200 shadow-xl" onSubmit={e=>e.preventDefault()}>
                                <div className="space-y-6">
                                    <div>
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 block mb-2 ml-4">Solicitante</label>
                                        <input type="text" className="w-full bg-white border border-zinc-200 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 text-zinc-900 font-bold text-sm px-6 py-5 rounded-full outline-none transition-all shadow-sm" placeholder="Nombre en su Documento" />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 block mb-2 ml-4">Línea de Vida</label>
                                        <input type="tel" className="w-full bg-white border border-zinc-200 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 text-zinc-900 font-bold text-sm px-6 py-5 rounded-full outline-none transition-all shadow-sm" placeholder="Celular para Avisos Logísticos" />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 block mb-2 ml-4">Coordenadas</label>
                                        <textarea rows={2} className="w-full bg-white border border-zinc-200 focus:border-red-500 focus:ring-4 focus:ring-red-500/10 text-zinc-900 font-bold text-sm px-6 py-5 rounded-[2rem] outline-none transition-all resize-none shadow-sm" placeholder="Dirección Exacta del Hogar" />
                                    </div>
                                    <div className="pt-6">
                                        <button className="w-full h-[70px] bg-red-500 text-white font-black uppercase tracking-widest text-sm rounded-full hover:bg-red-600 hover:shadow-[0_10px_30px_rgba(239,68,68,0.4)] transition-all">
                                            Confirmar Compra
                                        </button>
                                        <p className="text-center text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-6">Protocolos encriptados de punto a punto</p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </main>

            {/* STICKY MOBILE CTA */}
            <div className="md:hidden fixed bottom-4 left-4 right-4 z-50">
                <div className="bg-zinc-900 p-4 rounded-2xl flex items-center justify-between shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
                    <div className="pl-2">
                        <div className="text-[9px] font-bold uppercase text-zinc-400 tracking-widest">Transferencia COD</div>
                        <div className="font-black text-white text-xl tracking-tighter leading-none mt-1">{fmtPrice(product.price)}</div>
                    </div>
                    <button onClick={() => document.getElementById('checkout-action')?.scrollIntoView({ behavior: 'smooth' })} className="bg-white text-zinc-900 rounded-xl px-6 py-3 font-black uppercase tracking-widest text-[11px]">
                        Comprar
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

export default PdpRobotVacuum;
