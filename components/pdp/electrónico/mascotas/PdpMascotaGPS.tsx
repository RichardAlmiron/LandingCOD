'use client';
import React, { useState } from 'react';
import { StoreData, Product } from '@/lib/types';
import EnhancedProductGallery from '@/components/pdp/EnhancedProductGallery';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { data: StoreData; product: Product; }

const PdpMascotaGPS: React.FC<Props> = ({ data, product }) => {
    const [openSpecAcc, setOpenSpecAcc] = useState<number | null>(0);
    const [faqOpen, setFaqOpen] = useState<number | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const ai = product.aiContent;
    const fmtPrice = (n: number) => { const s = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); return `Gs. ${s}`; };
    
    // Aesthetic Palette: Wild Outdoor / Rescue Radar
    const bg = '#18181b'; // Zinc 900
    const textMain = '#fafafa'; // Zinc 50
    const accentOrange = '#f97316'; // Orange 500 (Rescue Orange)
    const cardBg = '#27272a'; // Zinc 800

    return (
        <div style={{ background: bg, color: textMain, fontFamily: "'Inter', sans-serif" }} className="overflow-x-hidden selection:bg-orange-500 selection:text-white antialiased">
            
            {/* 0. AMBIENT TOPOGRAPHY GRID */}
            <div className="fixed inset-0 pointer-events-none z-0 opacity-10" style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/connected.png')` }}></div>

            {/* 1. TOP NAV (Radar Header) */}
            <header className="sticky top-0 z-50 bg-[#18181b]/90 backdrop-blur-md border-b border-zinc-800">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded border-2 border-orange-500 flex items-center justify-center relative">
                            <div className="w-2 h-2 bg-orange-500 rounded-full animate-ping absolute"></div>
                            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                        </div>
                        <span className="font-black text-xl tracking-tighter text-white uppercase">
                            HOUND<span className="text-orange-500">TRAK</span>
                        </span>
                    </div>
                    <nav className="hidden md:flex gap-8">
                        {['Geocerca', 'LTE Realtime', 'Batería'].map((item) => (
                            <a key={item} href={`#${item.toLowerCase().replace(' ', '')}`} className="text-[10px] font-black tracking-widest uppercase text-zinc-400 hover:text-orange-500 transition-colors">
                                {item}
                            </a>
                        ))}
                    </nav>
                </div>
            </header>

            <main className="relative z-10 w-full overflow-hidden">
                {/* 2. BREADCRUMBS & MICRO-LOGISTICS */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 pb-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
                        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 flex items-center gap-2">
                            MUNDO CANINO <span className="text-zinc-700">/</span> RASTREO <span className="text-zinc-700">/</span> <span className="text-white">{product.title.substring(0, 15)}...</span>
                        </div>
                        <div className="inline-flex items-center gap-2 text-[10px] font-black text-orange-400 uppercase tracking-widest bg-orange-500/10 border border-orange-500/20 px-3 py-1.5 rounded">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                            Entrega Segura Offline (COD)
                        </div>
                    </div>
                </div>

                {/* 3. HERO (OUTDOOR RESCUE) */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 lg:py-16 relative">
                    {/* Big blurred orange back */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-600/10 rounded-full blur-[100px] pointer-events-none"></div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
                        <div className="flex flex-col relative pt-4">
                            {/* Satellite Badge */}
                            <div className="flex items-center gap-3 mb-6">
                                <div className="text-[10px] font-black bg-orange-500 text-black px-3 py-1.5 uppercase tracking-[0.2em] rounded-sm">Conexión 4G LTE</div>
                                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Señal de Satélite Directa</span>
                            </div>
                            
                            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white leading-[0.95] mb-6">
                                {ai?.enhancedTitle || product.title}
                            </h1>
                            <p className="text-base md:text-lg font-medium text-zinc-400 mb-10 leading-relaxed border-l-2 border-orange-500 pl-4">
                                {ai?.enhancedDescription || product.description || 'Si la puerta queda abierta, ya no tendrás que salir a correr gritando su nombre. Collar GPS con actualización en vivo cada 3 segundos, resistente al barro y sumergible. Encuéntralo exacto en el mapa celular.'}
                            </p>

                            <div className="bg-zinc-800/80 rounded-xl p-8 shadow-2xl border border-zinc-700 relative overflow-hidden">
                                {/* Tactical crosshair background */}
                                <svg className="absolute top-0 right-0 w-32 h-32 text-zinc-700 opacity-20 pointer-events-none" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2"/><line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="2"/><line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="2"/></svg>
                                
                                <div className="flex items-end gap-6 mb-8 relative z-10">
                                    <span className="text-5xl md:text-6xl font-black text-white">{fmtPrice(product.price)}</span>
                                    {product.originalPrice && <span className="text-lg font-bold text-zinc-500 line-through pb-1">{fmtPrice(product.originalPrice)}</span>}
                                </div>
                                <button onClick={() => document.getElementById('checkout-action')?.scrollIntoView({ behavior: 'smooth' })} className="w-full h-[64px] bg-orange-500 text-black font-black uppercase tracking-widest text-sm hover:bg-orange-400 transition-colors rounded shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)]">
                                    Proteger a mi Mascota
                                </button>
                            </div>

                            {/* 4. TRUST BADGES FAST */}
                            <div className="grid grid-cols-4 gap-2 mt-6">
                                {[
                                    {v: 'IP68', l: 'Anti-Barro'},
                                    {v: '30 Días', l: 'Batería'},
                                    {v: '10m', l: 'Precisión'},
                                    {v: 'C.O.D', l: 'Pago Seguro'}
                                ].map((b, i) => (
                                    <div key={i} className="flex flex-col items-center justify-center p-3 bg-zinc-900 border border-zinc-800 rounded-lg">
                                        <span className="text-white font-black text-lg mb-1 tracking-tighter">{b.v}</span>
                                        <span className="text-[9px] font-bold text-orange-500 uppercase tracking-widest">{b.l}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

 <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, type: "spring" }} className="relative bg-zinc-800 rounded-[2rem] p-2 border border-zinc-700 shadow-2xl flex items-center justify-center">
                            {/* Topographic map under the image */}
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <motion.div animate={{ scale: [1, 2, 4], opacity: [0.8, 0.3, 0] }} transition={{ duration: 3, repeat: Infinity }} className="w-20 h-20 border border-orange-500 rounded-full"></motion.div>
                                <motion.div animate={{ scale: [1, 2, 4], opacity: [0.8, 0.3, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 1 }} className="w-20 h-20 border border-orange-500 rounded-full absolute"></motion.div>
                            </div>
                            
                            <div className="relative z-10 w-[85%] h-[85%] bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl border-2 border-zinc-800">
                                <EnhancedProductGallery product={product} accentColor={accentOrange} />
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* 5. SPECIFICATION ACCORDIONS */}
                <div id="geocerca" className="max-w-4xl mx-auto px-4 md:px-8 py-16">
                    <h2 className="text-3xl font-black uppercase tracking-tighter text-white mb-8 text-center text-balance">Inteligencia Canina Inyectada.</h2>
                    <div className="bg-zinc-800/50 border border-zinc-700 rounded-2xl overflow-hidden backdrop-blur-sm">
                        {[
                            { t: 'Geocerca Virtual (Valla Invisible)', a: 'Abre la app, dibuja un círculo de 50 metros alrededor de tu casa. En el instante exacto en que tu perro o gato cruce esa línea, tu celular sonará como una alarma de emergencia. Cortas las huidas antes de que doblen la esquina.' },
                            { t: 'Construcción Tanque (Kevlar & Goma)', a: 'Sabemos que se acuestan en charcos, se meten entre arbustos llenos de espinas y se rascan el cuello. El módulo GPS está recubierto en goma balística. Es 100% sumergible (IP68), no se ahoga si salta al agua.' },
                            { t: 'Modalidad de Recepción Directa', a: 'Un artículo que salva vidas no puede quedar varado en correos postales. Al generar la orden abajo, nosotros armamos la caja protectora y la entregamos a un agente que va hasta tu domicilio. Lo abres, y recién allí le entregas el dinero efectivo.' }
                        ].map((ac, i) => (
                            <div key={i} className="border-b border-zinc-700 last:border-b-0 hover:bg-zinc-800 transition-colors">
                                <button onClick={() => setOpenSpecAcc(openSpecAcc===i?null:i)} className="w-full text-left p-6 flex items-center justify-between text-xs font-black uppercase tracking-widest text-zinc-100">
                                    <div className="flex items-center gap-4">
                                        <div className="w-2 h-2 bg-orange-500 transform rotate-45"></div>
                                        {ac.t}
                                    </div>
                                    <span className="text-orange-500 font-bold text-xl">{openSpecAcc===i?'-':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {openSpecAcc === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 pb-6 pl-[2.25rem] text-sm font-medium text-zinc-400 leading-relaxed">
                                            {ac.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 6. ENDLESS MARQUEE */}
                <div className="w-[100vw] overflow-hidden py-3 bg-orange-500 relative left-[50%] -translate-x-[50%] border-y border-orange-400 mt-8">
                    <div className="flex whitespace-nowrap animate-marquee font-black uppercase text-xl tracking-widest text-black">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="flex items-center gap-12 px-6">
                                <span>COBERTURA_LTE_GLOBAL</span><span className="text-orange-900">◆</span>
                                <span>SIN_LÍMITE_DE_DISTANCIA</span><span className="text-orange-900">◆</span>
                                <span>PROTECCIÓN_ACTIVA</span><span className="text-orange-900">◆</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 7. WHY TO USE / BENEFITS */}
                <div id="lterealtime" className="py-24 bg-zinc-950 border-b border-zinc-900">
                    <div className="max-w-7xl mx-auto px-4 md:px-8 relative">
                        <div className="text-center mb-20">
                            <span className="text-[10px] font-black tracking-[0.4em] text-orange-500 mb-4 block uppercase">No Mires Atrás</span>
                            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white leading-none">Un AirTag es Inútil.<br/>Esto es un <span className="text-orange-500">Radar.</span></h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { ic: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', t: 'Airtag = Bluetooth Roto', d: 'Los rastreadores comunes pierden conexión si están a más de 10 metros del celular. Si tu perro corre al bosque, desaparecen. Este collar lleva su propio chip de datos celulares incorporado.' },
                                { ic: 'M2 12A10 10 0 1 0 22 12 10 10 0 1 0 2 12', t: 'Cobertura Nacional LTE', d: 'Literalmente puede irse de tu ciudad y seguirás viéndolo moverse como un punto en Google Maps, porque se conecta a antenas telefónicas enormes.' },
                                { ic: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 14.939 3 13.498 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z', t: 'SOS LED y Sonido', d: 'Si lo ves escondido abajo de un mueble o auto en la calle oscura, mandas un comando y el collar emite una luz LED láser roja fortísima y una alarma de 90 decibelios.' }
                            ].map((b, i) => (
                                <div key={i} className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl relative overflow-hidden group hover:border-orange-500/50 transition-colors">
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/5 blur-3xl pointer-events-none group-hover:bg-orange-500/20 transition-all"></div>
                                    <div className="w-14 h-14 border border-zinc-700 bg-zinc-950 rounded-xl flex items-center justify-center mb-6">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-orange-500 group-hover:scale-110 transition-transform"><path strokeLinecap="round" strokeLinejoin="round" d={b.ic}/></svg>
                                    </div>
                                    <h3 className="text-lg font-black uppercase tracking-tight text-white mb-4">{b.t}</h3>
                                    <p className="text-sm font-medium text-zinc-400 leading-relaxed">{b.d}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 8. HOW TO USE / SET UP AESTHETIC */}
                <div className="py-24 bg-zinc-900 relative">
                    <div className="max-w-7xl mx-auto px-4 md:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div className="relative aspect-[4/3] bg-zinc-950 border border-zinc-800 rounded-3xl p-6 shadow-2xl flex items-center justify-center overflow-hidden">
                                {/* MAP UI MOCKUP */}
                                <div className="absolute inset-0 bg-[#0f172a] opacity-50"></div>
                                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, #334155 1px, transparent 1px)', backgroundSize: '15px 15px' }}></div>
                                <div className="relative z-10 w-full h-full border border-slate-700/50 rounded-2xl overflow-hidden flex items-center justify-center shadow-lg bg-black/40 backdrop-blur-sm">
                                    {/* Sonar sweep */}
                                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }} className="absolute inset-9 border-[40px] border-l-orange-500/30 border-r-transparent border-t-transparent border-b-transparent rounded-full mix-blend-screen -z-10 blur-md"></motion.div>
                                    
                                    <div className="text-center relative">
                                        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-[0_0_20px_#f97316] mb-2 mx-auto overflow-hidden border-2 border-orange-500">
                                            <span className="text-xl">🐶</span>
                                        </motion.div>
                                        <div className="bg-orange-500 text-black text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded shadow-md">MAX (Corriendo)</div>
                                        <div className="text-white text-[10px] font-mono tracking-widest mt-2 bg-black/50 px-2 py-1 rounded border border-white/10">34.6km/h - NORTE</div>
                                    </div>
                                    
                                    <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                                        <div className="bg-zinc-900/80 text-orange-500 text-[10px] font-bold px-3 py-1.5 rounded border border-zinc-700 backdrop-blur-md">BATERÍA: 82%</div>
                                        <div className="bg-red-500 text-white text-[10px] font-black px-3 py-1.5 rounded shadow-[0_0_10px_#ef4444] animate-pulse">MODO PERSECUCIÓN</div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mb-8 leading-none">Centro de Comando<br/>de <span className="text-zinc-500">Bolsillo.</span></h2>
                                <p className="text-zinc-400 font-medium mb-12 leading-relaxed text-lg">No necesitas antenas de radioaficionado. La interfaz la descargas directo a tu iPhone o Android y mapea todo usando los satélites libres arriba tuyo.</p>
                                
                                <div className="space-y-6">
                                    {[
                                        { s: '01', t: 'Engancha al Collar', d: 'El módulo pesa 30 gramos. Trae correas cruzadas fortísimas para pasarlas por el collar existente de tu perro. Ni lo sentirá.' },
                                        { s: '02', t: 'Sincroniza el ID', d: 'Abre la caja recibida por C.O.D, escanea el código QR que viene en el plástico, y tu teléfono emparejará ese collar para siempre.' },
                                        { s: '03', t: 'Libertad Absoluta', d: 'Tu perro puede cruzar el campo abierto o saltar tapias. Si el punto en el mapa se aleja más de 2 manzanas, te avisará en 1 segundo.' }
                                    ].map((s, i) => (
                                        <div key={i} className="flex gap-6 items-start">
                                            <div className="text-orange-500 font-black text-xl leading-none mt-1 border-b-2 border-orange-500 pb-1">{s.s}</div>
                                            <div>
                                                <h4 className="text-sm font-black uppercase tracking-widest text-white mb-2">{s.t}</h4>
                                                <p className="text-sm font-medium text-zinc-400 leading-relaxed">{s.d}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 9. DEEP DIVE MULTIMEDIA */}
                <div id="batería" className="py-32 relative text-center border-t border-zinc-800 bg-[#18181b] overflow-hidden">
                    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-zinc-800 pointer-events-none -translate-y-1/2 line-through opacity-50"></div>
                    <div className="relative z-10 max-w-4xl mx-auto px-4">
                        <div className="text-7xl md:text-9xl font-black text-zinc-800/40 mb-[-4rem] select-none tracking-tighter">720H</div>
                        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-6 relative">Batería Mes-Completo.</h2>
                        <p className="text-lg font-medium text-zinc-400 leading-relaxed max-w-2xl mx-auto">
                            Tener que sacarle el collar al perro para cargarlo todos los días anula el propósito (siempre escapan justo cuando el collar está cargando). Nuestro chip de bajo consumo y optimización magnética asegura hasta 30 días de latencia con una sola hora de carga magnética a la pared.
                        </p>
                    </div>
                </div>

                {/* 10. COMPARISON TABLE */}
                <div className="max-w-5xl mx-auto px-4 md:px-8 py-32">
                    <div className="text-center mb-16">
                        <div className="text-[10px] font-black text-orange-500 uppercase tracking-widest border border-orange-500/20 px-3 py-1 rounded mb-4 inline-block">Análisis Táctico</div>
                        <h2 className="text-3xl font-black uppercase tracking-tighter text-white">No juegues con<br/>su seguridad.</h2>
                    </div>
                    
                    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-xl">
                        <div className="grid grid-cols-3 bg-zinc-950 border-b border-zinc-800 text-[9px] md:text-xs font-black uppercase tracking-widest text-zinc-500">
                            <div className="p-5 md:p-8">Componente</div>
                            <div className="p-5 md:p-8 text-center text-orange-500 border-x border-zinc-800 bg-orange-500/5">HOUND TRAK GPS</div>
                            <div className="p-5 md:p-8 text-center text-zinc-600">Airtags / Chapitas Bluetooth</div>
                        </div>
                        {[
                            { k: 'Señal en Distancia', u: 'Ilimitada (Antenas Celulares)', t: 'Muere a los 10 Metros del dueño' },
                            { k: 'Aviso de Fuga', u: 'Alarma Inmediata (Geocerca)', t: 'Silencioso. No avisa si huye.' },
                            { k: 'Tiempo de Actividad en fuga', u: 'Refresco cada 3s en vivo', t: 'Muestra "Última vez visto hace 4 hs"' },
                            { k: 'Durabilidad Física', u: 'Goma Balística Inundable', t: 'Plástico de llavero frágil' }
                        ].map((r, i) => (
                            <div key={i} className="grid grid-cols-3 border-b border-zinc-800/50 last:border-b-0 text-sm">
                                <div className="p-5 md:p-8 font-bold text-zinc-300 flex items-center bg-zinc-950/30">{r.k}</div>
                                <div className="p-5 md:p-8 font-black text-white text-center flex items-center justify-center border-x border-zinc-800 bg-orange-900/10 shadow-[inner_0_0_20px_rgba(249,115,22,0.05)]">{r.u}</div>
                                <div className="p-5 md:p-8 font-medium text-zinc-600 text-center flex items-center justify-center line-through">{r.t}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 11. RISK REVERSAL WARRANTY */}
                <div className="max-w-5xl mx-auto px-4 md:px-8 py-12">
                    <div className="bg-[#27272a] p-10 md:p-14 rounded-3xl border border-zinc-700 md:flex items-center gap-12 relative overflow-hidden shadow-2xl">
                        <div className="w-16 h-16 bg-white text-zinc-900 font-black text-3xl rounded-xl shrink-0 flex items-center justify-center shadow-lg mb-8 md:mb-0 transform rotate-3">
                            $
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-2xl font-black uppercase tracking-tight mb-4 text-white">Transacción en Mano. Protege tu Capital.</h3>
                            <p className="font-medium text-zinc-400 leading-relaxed text-sm">
                                Entendemos la inestabilidad de pedir chips importados por la web o meter tarjetas. Cortamos ese paso. Nuestra flota saca la caja de los depósitos, viaja hasta tu casa y te la da en efectivo. Tú tocas el GPS, compruebas que el caucho es irrompible, y solo así cedes tu dinero. 6 meses de garantía al circuito interno por agua masiva.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 12. BRAND ETHOS */}
                <div className="py-24 border-y border-zinc-800 mt-16 text-center px-4 bg-zinc-950/50">
                    <div className="max-w-3xl mx-auto">
                        <div className="text-orange-500 mb-6 flex justify-center">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                        </div>
                        <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white mb-6">No es una mascota,<br/>es <span className="text-zinc-500">Familia.</span></h3>
                        <p className="text-base font-medium text-zinc-400 leading-loose mx-auto">Pagar una fortuna a un paseador por paseos de 30 minutos es lo habitual. Pero negarse a gastar en la ÚNICA herramienta tecnológica que asegurará su retorno si un día la reja queda abierta, es negligencia. El estrés de pegar carteles fotocopiados a los postes de luz no tiene precio.</p>
                    </div>
                </div>

                {/* 13. FAQ */}
                <div className="max-w-4xl mx-auto px-4 md:px-8 py-24">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black uppercase tracking-tighter text-white">Manual Operativo.</h2>
                    </div>
                    <div className="space-y-4">
                        {[
                            {q: '¿Hay algún costo mensual extra en la app?', a: 'La tarifa de "C.O.D" inferior ampara todo el hardware. La conectividad celular global usa redes IoT (internet de las cosas). No tienes que ponerle ningún chip de Claro/Movistar tuyo. El dispositivo en sí maneja sus propios datos y su app vitalicia sin suscripciones abusivas mes a mes.'},
                            {q: 'Mi perro muerde y destroza todo. ¿Soportará?', a: 'El rastreador no puede ser arrancado fácilmente ya que va inserto transversalmente al nilon de su collar grueso. Al menos que tenga manos humanas para presionar los dos botones de seguridad blindados al mismo tiempo, nunca logrará soltarlo.'},
                            {q: 'Logística COD, ¿Van a cualquier zona?', a: 'Tenemos amplificación por decenas de rutas logísticas de transporte físico y encomiendas para pago offline. Tú dejas el teléfono; nuestro call center confirma la ruta a tu ciudad y despachamos.'}
                        ].map((f, i) => (
                            <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-2xl">
                                <button onClick={() => setFaqOpen(faqOpen===i?null:i)} className="w-full text-left p-6 md:p-8 flex items-center justify-between font-bold text-sm text-zinc-200 uppercase tracking-widest hover:text-orange-500 transition-colors">
                                    <span>{f.q}</span>
                                    <span className="text-orange-500 text-2xl font-black leading-none">{faqOpen===i?'-':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {faqOpen === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 md:px-8 pb-8 text-sm font-medium text-zinc-500 leading-relaxed pt-2">
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
                    <div className="text-center mb-16">
                        <span className="text-orange-500 text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">Reportes de Rescate</span>
                        <h2 className="text-3xl font-black uppercase tracking-tighter text-white">Casos de Éxito.</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { r: "Los cohetes de navidad lo asustaron, rompió la puerta mosquitera y huyó. Abrí la App de este collar, activé el modo rastreo intenso, agarré la camioneta y la pantalla me guió tres barrios más abajo, donde estaba metido debajo de un puente. Jamás lo habría hallado sin esto.", n: "Ricardo N.", t: "Dueño de Ovejero Alemán" },
                            { r: "Compré lo del AirTag barato primero. Se me escapó en el campo y a los 5 minutos el Apple decía 'sin señal'. Esto es otro mundo. Llega a todos los rincones con la señal celular real profunda de rastreo. Muy buen empaque pagado contra entrega perfecto.", n: "Bárbara S.", t: "Proteccionista" },
                            { r: "La función de la geocerca valla perimetral es magia negra. Puse un radio de la cabaña, y si el beagle salía para perseguir una liebre, me llegaba una alarma de bomba al celular inmediato.", n: "Esteban L.", t: "Casa de Campo" }
                        ].map((rev, i) => (
                            <div key={i} className="bg-zinc-900/50 border border-zinc-800 p-10 rounded-3xl relative">
                                <div className="absolute top-8 right-8 text-zinc-700">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                                </div>
                                <p className="text-sm font-medium text-zinc-400 leading-relaxed mb-8 pr-4">"{rev.r}"</p>
                                <div className="border-t border-zinc-800 pt-6">
                                    <div className="text-xs font-black text-white uppercase tracking-widest">{rev.n}</div>
                                    <div className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mt-1">{rev.t}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 15. CHECKOUT */}
                <div id="checkout-action" className="py-24 md:py-32 bg-[#18181b] relative border-t-8 border-orange-500 overflow-hidden">
                    {/* Orange radar effect back focus */}
                    <div className="absolute top-1/2 left-[20%] w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2"></div>

                    <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24 items-center">
                        <div className="md:col-span-5 relative text-center md:text-left">
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500 mb-6 block">Liquidación Físicamente Offline</span>
                            <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 text-white leading-[0.9]">Mapear el<br/>Módulo.</h3>
                            <p className="text-sm font-medium text-zinc-400 mb-10 leading-relaxed max-w-sm mx-auto md:mx-0">Registra tus cuarteles base abajo. Despachamos el equipo con el agente y se lo abonas al recibir la pieza armada.</p>
                            
                            <div className="text-5xl lg:text-7xl font-black text-white tracking-tighter">{fmtPrice(product.price)}</div>
                        </div>
                        
                        <div className="md:col-span-7 w-full border border-zinc-800 rounded-3xl bg-zinc-900/80 backdrop-blur-md p-8 md:p-12 shadow-2xl relative">
                            <div className="absolute -top-4 -right-4 bg-orange-500 text-black text-[10px] font-black tracking-widest px-4 py-2 uppercase rounded transform rotate-6 shadow-xl">COD Aprobado</div>
                            <form onSubmit={e=>e.preventDefault()}>
                                <div className="space-y-6">
                                    <div>
                                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 ml-1 block">Titular del Control</label>
                                        <input type="text" className="w-full bg-zinc-950 border border-zinc-800 focus:border-orange-500 text-white font-bold text-sm px-6 py-5 rounded-xl outline-none transition-all placeholder:text-zinc-700 uppercase" placeholder="Nombre en Identificación" />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 ml-1 block">Frecuencia Radio / Teléfono</label>
                                        <input type="tel" className="w-full bg-zinc-950 border border-zinc-800 focus:border-orange-500 text-white font-bold text-sm px-6 py-5 rounded-xl outline-none transition-all placeholder:text-zinc-700 uppercase" placeholder="Número de Celular Actual" />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2 ml-1 block">Punto de Entrega Logística</label>
                                        <textarea rows={2} className="w-full bg-zinc-950 border border-zinc-800 focus:border-orange-500 text-white font-bold text-sm px-6 py-5 rounded-xl outline-none transition-all resize-none placeholder:text-zinc-700 uppercase" placeholder="Dirección Base (Hogar/Oficina)" />
                                    </div>
                                    <div className="pt-6">
                                        <button className="w-full h-[70px] bg-orange-500 text-black font-black uppercase tracking-[0.2em] text-sm hover:bg-white transition-all duration-300 rounded-xl shadow-[0_10px_30px_rgba(249,115,22,0.3)]">
                                            Acatar Ticket & Pagar al Recibir
                                        </button>
                                        <p className="text-center text-[10px] font-bold text-zinc-600 uppercase mt-6 tracking-widest">Procedimiento libre de fraudes bancarios.</p>
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
                        <div className="text-[10px] font-bold uppercase text-zinc-400 tracking-widest mb-1">Abono Seguro/Cash</div>
                        <div className="font-black text-white text-xl tracking-tighter leading-none">{fmtPrice(product.price)}</div>
                    </div>
                    <button onClick={() => document.getElementById('checkout-action')?.scrollIntoView({ behavior: 'smooth' })} className="bg-orange-500 text-black rounded-xl px-8 py-4 font-black uppercase tracking-widest text-[11px] shadow-sm">
                        Proteger
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

export default PdpMascotaGPS;
