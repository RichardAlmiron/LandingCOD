'use client';
import React, { useState } from 'react';
import { StoreData, Product } from '@/lib/types';
import EnhancedProductGallery from '@/components/pdp/EnhancedProductGallery';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { data: StoreData; product: Product; }

const PdpLentesBluetooth: React.FC<Props> = ({ data, product }) => {
    const [openSpecAcc, setOpenSpecAcc] = useState<number | null>(0);
    const [faqOpen, setFaqOpen] = useState<number | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const ai = product.aiContent;
    const fmtPrice = (n: number) => { const s = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); return `Gs. ${s}`; };
    
    // Aesthetic Palette: High-Fashion Tech (Ray-Ban disguise)
    const bg = '#0a0a0a'; // Neutral 950
    const textMain = '#fafafa'; // Neutral 50
    const accentGlass = '#fcd34d'; // Amber 300 (Sunlight reflection)
    const accentTech = '#38bdf8'; // Sky 400 (Bluetooth LED)

    return (
        <div style={{ background: bg, color: textMain, fontFamily: "'Inter', sans-serif" }} className="overflow-x-hidden selection:bg-sky-400 selection:text-black antialiased font-light">
            
            {/* 0. AMBIENT SUNLIGHT / LENS FLARE FLARE */}
            <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-sky-200/5 blur-[120px] rounded-full pointer-events-none mix-blend-screen"></div>
            <div className="absolute top-[20%] left-0 w-[400px] h-[400px] bg-amber-400/5 blur-[100px] rounded-full pointer-events-none mix-blend-screen"></div>

            {/* 1. TOP NAV (Fashion Minimalist) */}
            <header className="sticky top-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-2xl border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-5 flex items-center justify-between">
                    <div className="text-xl font-serif tracking-widest text-white uppercase italic">
                        VISION<span className="text-sky-400 font-sans not-italic">×</span>AI
                    </div>
                    <nav className="hidden lg:flex gap-12">
                        {['Óptica', 'Sonido Abierto', 'Montura'].map((item) => (
                            <a key={item} href={`#${item.toLowerCase().replace(' ', '')}`} className="text-[10px] font-sans tracking-[0.2em] uppercase text-neutral-400 hover:text-white transition-colors relative group">
                                {item}
                                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-white group-hover:w-full transition-all"></span>
                            </a>
                        ))}
                    </nav>
                </div>
            </header>

            <main className="relative z-10 w-full overflow-hidden">
                {/* 2. BREADCRUMBS & MICRO-LOGISTICS */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 pb-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-900 pb-4">
                        <div className="text-[9px] font-sans uppercase tracking-[0.3em] text-neutral-500 flex items-center gap-3">
                            COLECCIÓN <span className="text-neutral-700">/</span> LIFESTYLE <span className="text-neutral-700">/</span> <span className="text-white">{product.title.substring(0, 15)}...</span>
                        </div>
                        <div className="inline-flex items-center gap-2 text-[9px] text-sky-400 uppercase tracking-widest bg-sky-400/10 px-3 py-1.5 border border-sky-400/20">
                            Logística Codificada • COD
                        </div>
                    </div>
                </div>

                {/* 3. HERO (EDITORIAL) */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 lg:py-20 relative">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="flex flex-col relative z-20">
                            {/* Tech Flag */}
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse"></div>
                                <span className="text-[10px] font-bold text-sky-400 uppercase tracking-[0.4em]">Audio Direccional Invisible</span>
                            </div>
                            
                            <h1 className="text-5xl md:text-7xl font-sans tracking-tight text-white leading-none mb-6">
                                {ai?.enhancedTitle || product.title}
                            </h1>
                            <p className="text-base md:text-lg font-light text-neutral-400 mb-12 leading-relaxed max-w-md">
                                {ai?.enhancedDescription || product.description || 'El fin de los auriculares intrusivos. Habla por teléfono, escucha música y pídele rutas a tu asistente virtual mientras luces unas gafas de diseñador clásicas polarizadas.'}
                            </p>

                            <div className="bg-neutral-900/50 backdrop-blur-xl border border-neutral-800 p-8 shadow-2xl relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="flex flex-col sm:flex-row sm:items-end gap-6 mb-8 relative z-10">
                                    <span className="text-5xl font-light text-white tracking-tighter">{fmtPrice(product.price)}</span>
                                    {product.originalPrice && <span className="text-xl font-light text-neutral-600 line-through pb-1">{fmtPrice(product.originalPrice)}</span>}
                                </div>
                                <button onClick={() => document.getElementById('checkout-action')?.scrollIntoView({ behavior: 'smooth' })} className="w-full h-[64px] bg-white text-black font-sans uppercase tracking-[0.3em] text-xs hover:bg-neutral-200 transition-colors flex items-center justify-center gap-3">
                                    Adquirir Montura
                                </button>
                                <p className="text-[9px] font-sans text-neutral-500 mt-4 text-center uppercase tracking-widest">Liquidación Presencial Exclusiva</p>
                            </div>
                        </div>

                        <div className="relative z-10 flex items-center justify-center">
 <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5, ease: "easeOut" }} className="w-full max-w-[600px] relative flex items-center justify-center ">
                                <div className="absolute inset-0 bg-gradient-to-tr from-sky-400/10 to-amber-300/5 rounded-full blur-[60px] -z-10 mix-blend-screen"></div>
                                <EnhancedProductGallery product={product} accentColor={accentGlass} />
                                
                                {/* Fake UI Overlay reflecting on glasses */}
                                <div className="absolute bottom-1/4 -right-10 px-4 py-2 border border-sky-400/30 bg-black/40 backdrop-blur-md rounded text-[10px] text-sky-400 font-mono flex items-center gap-2">
                                    <span className="w-1 h-1 rounded-full bg-sky-400"></span> Playing: The Weeknd
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* 4. TRUST BADGES TECHNICAL */}
                <div className="max-w-6xl mx-auto px-4 md:px-8 pb-16 border-b border-neutral-900">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            {v: 'UV400', l: 'Polarizado Real'},
                            {v: '2x Mic', l: 'Reducción Viento'},
                            {v: '6Hrs', l: 'Audio Continuo'},
                            {v: 'IPX4', l: 'Resistencia Sudor'}
                        ].map((b, i) => (
                            <div key={i} className="flex flex-col items-center justify-center p-6 bg-[#0a0a0a] border border-white/5 hover:border-sky-400/30 transition-colors">
                                <span className="text-white font-light text-2xl tracking-tighter mb-2">{b.v}</span>
                                <span className="text-[9px] font-sans font-bold text-neutral-500 uppercase tracking-[0.2em]">{b.l}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 5. EXPERT ACCORDIONS */}
                <div id="óptica" className="max-w-4xl mx-auto px-4 md:px-8 py-20">
                    <div className="mb-12 text-center">
                        <h2 className="text-2xl font-sans tracking-tight text-white mb-4">Arquitectura Inadvertida.</h2>
                    </div>
                    <div className="border-t border-b border-neutral-900">
                        {[
                            { t: 'Parlantes de Conducción Aérea Direccional', a: 'No vibran contra tus huesos ni taponan tu canal auditivo. Esconden parlantes diminutos en las patillas que disparan el sonido en forma de láser directamente hacia tu oído. El que está sentado a tu lado en el sillón no escucha un solo susurro de lo que tú estás oyendo.' },
                            { t: 'Lentes Polarizadas de Clase Óptica 1', a: 'Antes de ser "Smart", son Lentes de Sol. Cortan el reflejo enceguecedor del cemento mojado o el agua con un revestimiento TAC premium de 7 capas, protegiendo tus retinas del 100% de la radiación UVA/UVB mientras conduces.' },
                            { t: 'Transacción Discreta C.O.D', a: 'Sin pasarelas web riesgosas. Completa el folio inferior y un mensajero te llevará el estuche sellado. Te las pruebas, verificas el sensor táctil, y abonarás en efectivo directo al cadete logístico con total privacidad.' }
                        ].map((ac, i) => (
                            <div key={i} className="border-b border-neutral-900 last:border-b-0 hover:bg-neutral-950 transition-colors">
                                <button onClick={() => setOpenSpecAcc(openSpecAcc===i?null:i)} className="w-full text-left p-8 flex items-center justify-between text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-neutral-200">
                                    <div className="flex items-center gap-6">
                                        <div className="text-sky-400 font-mono font-light">0{i+1}</div>
                                        {ac.t}
                                    </div>
                                    <span className="text-neutral-600 font-light text-xl">{openSpecAcc===i?'-':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {openSpecAcc === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-8 pb-8 pl-[4.5rem] text-sm font-light text-neutral-400 leading-relaxed">
                                            {ac.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 6. ENDLESS MARQUEE */}
                <div className="w-[100vw] overflow-hidden py-10 border-y border-neutral-900 relative left-[50%] -translate-x-[50%] flex transform">
                    <div className="flex whitespace-nowrap animate-marquee font-serif italic text-4xl text-neutral-700">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="flex items-center gap-10 px-8">
                                <span>SIN_CABLES.</span>
                                <span>SIN_TAPONES_DE_OÍDO.</span>
                                <span>100%_ESTILO.</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 7. WHY TO USE / BENEFITS */}
                <div id="sonidoabierto" className="max-w-7xl mx-auto px-4 md:px-8 py-32 border-b border-neutral-900">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
                        <div>
                            <h2 className="text-4xl md:text-6xl font-sans tracking-tight text-white mb-6">El Peligro del <br/><span className="text-neutral-500 line-through decoration-white/20">Aislamiento.</span></h2>
                            <p className="text-lg text-neutral-400 leading-relaxed font-light">Correr por la calle, andar en bicicleta o caminar por la ciudad con auriculares In-Ear con Cancelación de Ruido es jugar con tu vida. Estas gafas te devuelven tus sentidos.</p>
                        </div>
                        <div className="relative aspect-video bg-neutral-900 border border-neutral-800 rounded-lg flex items-center justify-center p-8 overflow-hidden">
                            {/* Sound wave graphic */}
                            <div className="flex items-center gap-1 w-full justify-center absolute z-0 mix-blend-screen opacity-30">
                                {[...Array(30)].map((_,i) => <motion.div key={i} animate={{ height: [10, Math.random()*150+50, 10] }} transition={{ repeat: Infinity, duration: 1+Math.random() }} className="w-1 bg-sky-400"></motion.div>)}
                            </div>
                            <div className="z-10 text-center bg-black/60 backdrop-blur-md p-6 border border-white/10">
                                <span className="text-sky-400 text-xs font-mono tracking-widest block mb-2">Open-Ear Audio</span>
                                <span className="text-white text-lg font-light">Escuchas la bocina. Escuchas el motor. Sigues escuchando tu playlist.</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { ic: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z', t: 'Llamadas de Alta Velocidad', d: 'Los micrófonos duales están escondidos en la nariz del marco. Poseen cancelación de ruido de viento algorítmica. Puedes ir en scooter a 20km/h y la otra persona no escuchará ni una ráfaga.' },
                            { ic: 'M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122', t: 'Botones Táctiles Fantasma', d: 'No hay botones horribles. Toda la patilla derecha es un panel táctil de cristal invisible. Desliza hacia adelante para subir volumen, dos toques rápidos para contestar la llamada o invocar a Siri.' },
                            { ic: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9', t: 'Cambio de Lentes', d: '¿Usas receta médica obligatoria? Puedes llevar este armazón a tu oculista de confianza y pedirle que le instale exactamente tus cristales de descanso o graduación.' }
                        ].map((b, i) => (
                            <div key={i} className="border border-neutral-900 p-8 rounded-lg hover:border-neutral-700 transition-colors">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white mb-6"><path strokeLinecap="round" strokeLinejoin="round" d={b.ic}/></svg>
                                <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-4">{b.t}</h3>
                                <p className="text-xs font-light text-neutral-500 leading-relaxed">{b.d}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 8. HOW TO USE / SET UP AESTHETIC */}
                <div id="montura" className="py-24 bg-[#050505] relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                            <div className="relative aspect-square flex items-center justify-center border border-white/5 rounded-full p-12">
                                <div className="absolute inset-4 rounded-full border border-sky-400/20 border-dashed animate-spin-slow"></div>
                                <div className="text-center pb-20">
                                    <div className="text-5xl font-light text-white mb-4 mt-20">Pogo Pin.</div>
                                    <p className="text-[10px] text-sky-400 uppercase tracking-[0.3em] font-mono">Carga Magnética Invisible</p>
                                    <p className="text-xs text-neutral-500 max-w-[200px] mx-auto mt-4 leading-relaxed font-light">Acopla el pequeño cable al interior de la patilla, cargan al 100% en 45 min y no se ven conectores feos por fuera.</p>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-3xl md:text-5xl font-sans tracking-tight text-white mb-10 leading-snug">La estética primero.<label className="text-neutral-600"> El hardware después.</label></h2>
                                
                                <div className="space-y-4">
                                    {[
                                        { s: 'Unboxing Estuche', d: 'El correo C.O.D te entregará un estuche de cuero de policarbonato texturizado. Idéntico a los de marcas italianas centenarias.' },
                                        { s: 'Emparejamiento 3 Segundos', d: 'Sacas las gafas, abres el Bluetooth del celular. Listo. Se conectarán automáticamente cada mañana apenas te las pongas en el rostro.' },
                                        { s: 'Bisagras Flexibles TR90', d: 'Se abren suavemente acomodándose a cualquier ancho de cráneo masculino o femenino sin apretar detrás de las orejas.' }
                                    ].map((s, i) => (
                                        <div key={i} className="flex gap-8 items-start py-6 border-b border-neutral-900 group">
                                            <div className="text-[9px] font-mono text-sky-400 pt-1 group-hover:text-white transition-colors">0{i+1}</div>
                                            <div>
                                                <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-300 mb-2">{s.s}</h4>
                                                <p className="text-sm font-light text-neutral-500 leading-relaxed">{s.d}</p>
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
                        <span className="text-[9px] font-sans text-neutral-500 uppercase tracking-[0.3em] mb-4 block">Evaluación Funcional</span>
                        <h2 className="text-2xl font-sans tracking-tight text-white">Lentes Bluetooth vs Genéricos.</h2>
                    </div>
                    
                    <div className="border border-neutral-900">
                        <div className="grid grid-cols-3 bg-[#0a0a0a] border-b border-neutral-900 text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-600">
                            <div className="p-6 md:p-8">Funcionalidad</div>
                            <div className="p-6 md:p-8 text-center text-white border-x border-neutral-900 bg-white/5">NUESTRA MONTURA INTELIGENTE</div>
                            <div className="p-6 md:p-8 text-center">Gafas Polarizadas Comunes</div>
                        </div>
                        {[
                            { k: 'Música & Podcasts', u: 'Sí (Aéreo Dirigido)', t: 'Imposible' },
                            { k: 'Recepción Llamadas', u: 'Micrófono Doble Interno', t: 'Saca el teléfono y sácate los guantes' },
                            { k: 'Navegación GPS', u: 'Siri te habla al oído la ruta', t: 'Mirar el celular mientras conduces' },
                            { k: 'Peso del Marco', u: '40 gramos (Mínima Diferencia)', t: '30 gramos' }
                        ].map((r, i) => (
                            <div key={i} className="grid grid-cols-3 border-b border-neutral-900/50 last:border-b-0 text-xs">
                                <div className="p-6 md:p-8 font-light text-neutral-400 flex items-center">{r.k}</div>
                                <div className="p-6 md:p-8 font-medium text-white text-center flex items-center justify-center border-x border-neutral-900 bg-white/5">{r.u}</div>
                                <div className="p-6 md:p-8 font-light text-neutral-600 text-center flex items-center justify-center line-through">{r.t}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 11. RISK REVERSAL WARRANTY */}
                <div className="max-w-5xl mx-auto px-4 md:px-8 py-12">
                    <div className="border border-white/10 p-10 md:p-14 md:flex items-center gap-12 relative overflow-hidden bg-gradient-to-r from-neutral-900/50 to-black">
                        <div className="w-16 h-16 border border-sky-400/30 text-sky-400 font-light text-3xl rounded-full shrink-0 flex items-center justify-center mb-8 md:mb-0">
                            P
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-xl font-sans tracking-tight mb-4 text-white">Adquisición Física Sin Riesgo.</h3>
                            <p className="font-light text-neutral-400 leading-relaxed text-sm">
                                Una montura debe sentirse segura antes de comprarse. Por ello cancelamos las pasarelas de pago. Te enviamos la caja rígida magnética, llega a tu hogar o trabajo, tomas la montura, verificas los cristales negros tácticos, y ejecutas el pago directo con el transportista en efectivo o transferencia. 100% blindado contra estafas virtuales (C.O.D).
                            </p>
                        </div>
                    </div>
                </div>

                {/* 12. BRAND ETHOS */}
                <div className="py-32 border-t border-neutral-900 mt-16 text-center px-4">
                    <div className="max-w-3xl mx-auto">
                        <h3 className="text-3xl font-serif text-white mb-8 italic">El wearable que no parece un wearable.</h3>
                        <p className="text-sm font-light text-neutral-500 leading-loose mx-auto">Estar usando audífonos grandes gesticula que "no quieres hablar con nadie". Usar gafas oscuras te da estilo y presencia. Fusionamos la primera tecnología directamente dentro del símbolo de mayor moda atemporal del mundo.</p>
                    </div>
                </div>

                {/* 13. FAQ */}
                <div className="max-w-4xl mx-auto px-4 md:px-8 py-24">
                    <div className="border-b border-neutral-900 mb-12 pb-6">
                        <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-600">Consultas Técnicas</h2>
                    </div>
                    <div className="space-y-0 text-sm">
                        {[
                            {q: '¿Puede el que está al lado mío escuchar lo que suena?', a: 'Sorprendentemente, no. Usa cavidades acústicas que disparan fases invertidas para cancelar el sonido que sale hacia afuera. A volumen medio, la persona a medio metro tuyo no escuchará absolutamente nada.'},
                            {q: '¿Se rompen con la lluvia o el sudor?', a: 'Poseen certificación IPX4 hidrofóbica en todos los puertos. Puedes salir a correr horas transpirando, o quedar atrapado en una lluvia ligera en moto y no sufrirán corto alguno.'},
                            {q: 'No entiendo cómo funciona el pago al recibir.', a: 'Es nuestro sello de garantía. Vas al cajón de abajo👇, completas dirección, nombre y línea móvil. Lo recepcionamos, avisamos y nuestro agente viajará a la dirección. Pagarás ahí recíen presencialmente su labor.'}
                        ].map((f, i) => (
                            <div key={i} className="border-b border-neutral-900 hover:bg-neutral-900/30 transition-colors">
                                <button onClick={() => setFaqOpen(faqOpen===i?null:i)} className="w-full text-left py-6 md:py-8 flex items-center justify-between font-medium text-neutral-300">
                                    <span>{f.q}</span>
                                    <span className="text-sky-400 font-mono text-lg">{faqOpen===i?'-':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {faqOpen === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="pb-8 text-neutral-500 leading-relaxed font-light">
                                            {f.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 14. EXPANDED REVIEWS */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-24 bg-[#050505]">
                    <div className="text-center mb-24">
                        <h2 className="text-2xl font-serif text-neutral-500 italic">Vistos en la Calle.</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-16 gap-x-8">
                        {[
                            { r: "Pedalear 40 kilómetros por la ruta asoleada escuchando mi música sin tapar el ruido de los autos atrás mío, no tiene precio. Una genialidad la óptica.", n: "Andrés B.", t: "Ciclista Urbano" },
                            { r: "Son literalmente imperceptibles de que son unas gafas inteligentes. Todos creen que ando con unas gafas de diseñador carísimas hasta que atiendo una llamada tocando el anteojo derecho y quedan locos.", n: "Juliana R.", t: "Asesora Inmobiliaria" },
                            { r: "Tenía miedo de que se me cayeran por ser más pesadas por la batería, pero no. El peso está balanceado hacia atrás en la patilla, entonces se agarran perfecto. Pago COD impecable a mi oficina.", n: "Martín E.", t: "Conductor" }
                        ].map((rev, i) => (
                            <div key={i} className="relative px-6">
                                <div className="text-sky-900 font-serif text-6xl absolute -top-8 left-0 opacity-20">"</div>
                                <p className="text-[13px] font-light text-neutral-400 leading-relaxed mb-6 pt-4 text-balance">"{rev.r}"</p>
                                <div>
                                    <div className="text-xs font-bold text-white uppercase tracking-widest">{rev.n}</div>
                                    <div className="text-[9px] font-sans text-neutral-600 uppercase tracking-widest mt-1">{rev.t}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 15. CHECKOUT */}
                <div id="checkout-action" className="py-24 md:py-32 bg-[#0a0a0a] relative border-t-[1px] border-white/10 overflow-hidden">
                    <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24 items-center">
                        <div className="md:col-span-5 relative">
                            <span className="text-[9px] font-sans uppercase tracking-[0.4em] text-neutral-500 mb-6 block">Recepción Offline Total</span>
                            <h3 className="text-4xl md:text-5xl font-sans tracking-tight mb-8 text-white leading-tight">Reclama tu<br/>Visión.</h3>
                            <p className="text-sm font-light text-neutral-400 mb-12 leading-relaxed max-w-sm">Completa la hoja de pase en blanco. Enviaremos el paquete COD táctico para tu tranquilidad financiera.</p>
                            
                            <div className="text-5xl font-light text-white tracking-tighter mix-blend-screen">{fmtPrice(product.price)}</div>
                        </div>
                        
                        <div className="md:col-span-7 w-full border border-white/10 bg-black/50 p-8 md:p-12 relative shadow-2xl">
                            <form onSubmit={e=>e.preventDefault()}>
                                <div className="space-y-6">
                                    <div>
                                        <input type="text" className="w-full bg-transparent border-b border-neutral-800 focus:border-sky-400 text-white font-light text-sm px-0 py-4 outline-none transition-all placeholder:text-neutral-700 uppercase tracking-[0.2em]" placeholder="Su Nombre Documental" />
                                    </div>
                                    <div>
                                        <input type="tel" className="w-full bg-transparent border-b border-neutral-800 focus:border-sky-400 text-white font-light text-sm px-0 py-4 outline-none transition-all placeholder:text-neutral-700 uppercase tracking-[0.2em]" placeholder="Frecuencia Móvil Contacto" />
                                    </div>
                                    <div>
                                        <textarea rows={2} className="w-full bg-transparent border-b border-neutral-800 focus:border-sky-400 text-white font-light text-sm px-0 py-4 outline-none transition-all resize-none placeholder:text-neutral-700 uppercase tracking-[0.2em]" placeholder="Coordenada Domicilio Exacto" />
                                    </div>
                                    <div className="pt-8">
                                        <button className="w-full h-[64px] bg-white text-black font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-sky-400 hover:text-white transition-all duration-500">
                                            Aprobar Despacho & Pagar al Cadete
                                        </button>
                                        <p className="text-center text-[9px] font-mono text-neutral-600 uppercase mt-4 tracking-widest">Circuito de Cero-Digital-Friction</p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </main>

            {/* STICKY MOBILE CTA */}
            <div className="md:hidden fixed bottom-5 left-5 right-5 z-50">
                <div className="bg-black border border-white/10 p-4 flex items-center justify-between shadow-[0_20px_40px_rgba(0,0,0,0.9)]">
                    <div className="pl-2">
                        <div className="text-[9px] font-bold uppercase text-neutral-500 tracking-widest mb-1">C.O.D Asegurado</div>
                        <div className="font-light text-white text-xl tracking-tight leading-none">{fmtPrice(product.price)}</div>
                    </div>
                    <button onClick={() => document.getElementById('checkout-action')?.scrollIntoView({ behavior: 'smooth' })} className="bg-white text-black px-6 py-3 font-bold uppercase tracking-widest text-[10px]">
                        Asignar
                    </button>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{__html: `
                @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
                .animate-marquee { animation: marquee 20s linear infinite; }
            `}} />
        </div>
    );
};

export default PdpLentesBluetooth;
