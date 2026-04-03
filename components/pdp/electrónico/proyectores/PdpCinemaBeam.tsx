'use client';
import React, { useState } from 'react';
import { StoreData, Product } from '@/lib/types';
import EnhancedProductGallery from '@/components/pdp/EnhancedProductGallery';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { data: StoreData; product: Product; }

const PdpCinemaBeam: React.FC<Props> = ({ data, product }) => {
    const [openSpecAcc, setOpenSpecAcc] = useState<number | null>(0);
    const [faqOpen, setFaqOpen] = useState<number | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const ai = product.aiContent;
    const fmtPrice = (n: number) => { const s = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); return `Gs. ${s}`; };
    
    // Aesthetic Palette: Cinema Night
    const bg = '#09090b'; // Zinc 950
    const textMain = '#fafafa'; // Zinc 50
    const textMuted = '#a1a1aa'; // Zinc 400
    const accentLight = '#fef08a'; // Yellow 200 (Warm beam color)
    const accentGlow = '#eab308'; // Yellow 500

    return (
        <div style={{ background: bg, color: textMain, fontFamily: "'Inter', sans-serif" }} className="overflow-x-hidden selection:bg-[#eab308]/30 antialiased relative">
            
            {/* 0. AMBIENT PROJECTOR BEAM */}
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[140vw] h-[100vh] pointer-events-none z-0 opacity-10" style={{ 
                background: 'radial-gradient(circle at 50% 0%, rgba(234, 179, 8, 0.4) 0%, transparent 60%)',
                clipPath: 'polygon(45% 0, 55% 0, 100% 100%, 0% 100%)'
            }}></div>
            <div className="fixed inset-0 pointer-events-none z-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

            {/* 1. TOP NAV */}
            <header className="sticky top-0 z-50 bg-[#09090b]/80 backdrop-blur-2xl border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-600 to-yellow-200 flex items-center justify-center shadow-[0_0_15px_rgba(234,179,8,0.4)]">
                            <div className="w-4 h-4 rounded-full bg-black"></div>
                        </div>
                        <span className="text-xl font-bold tracking-tighter text-yellow-50">LUMIÈRE</span>
                    </div>
                    <nav className="hidden lg:flex gap-8">
                        {['Lente', 'Sonido', 'Pantalla'].map((item) => (
                            <a key={item} href={`#${item.toLowerCase()}`} className="text-xs font-medium tracking-widest uppercase text-zinc-400 hover:text-yellow-400 transition-colors">
                                {item}
                            </a>
                        ))}
                    </nav>
                </div>
            </header>

            <main className="relative z-10">
                {/* 2. BREADCRUMBS & MICRO-LOGISTICS */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 pb-4">
                    <div className="flex flex-wrap items-center justify-between gap-4 font-bold text-[10px] uppercase tracking-widest text-[#a1a1aa]">
                        <div className="flex items-center gap-2">
                            <span>Boutique</span> <span className="text-zinc-600">/</span> <span>Display</span> <span className="text-zinc-600">/</span> <span className="text-white">{product.title.substring(0, 15)}...</span>
                        </div>
                        <div className="flex items-center gap-2 border border-yellow-500/20 bg-yellow-500/5 px-3 py-1.5 text-yellow-500 rounded-full">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
                            </span>
                            Stock Local: Entrega en 24H
                        </div>
                    </div>
                </div>

                {/* 3. HERO SECTION */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 lg:py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }} animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }} transition={{ duration: 1.5, ease: "easeOut" }} className="relative bg-[#18181b]/50 border border-white/5 rounded-3xl p-6 shadow-2xl backdrop-blur-sm">
                            <EnhancedProductGallery product={product} accentColor={accentGlow} />
                            {/* Cinematic Light flare */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[2px] bg-gradient-to-r from-transparent via-yellow-200/50 to-transparent pointer-events-none transform -rotate-12"></div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[2px] h-full bg-gradient-to-b from-transparent via-yellow-200/20 to-transparent pointer-events-none transform -rotate-12"></div>
                        </motion.div>

                        <div className="flex flex-col relative pt-4">
                            {/* Rating */}
                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex text-yellow-500">
                                    {[...Array(5)].map((_,i) => <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>)}
                                </div>
                                <span className="text-xs font-bold text-zinc-400 tracking-widest uppercase">4.9 Estrellas (Cinefilia)</span>
                            </div>
                            
                            <h1 className="text-4xl md:text-6xl font-medium tracking-tight leading-[1.1] mb-6 text-white capitalize" style={{ fontFamily: 'serif' }}>
                                {ai?.enhancedTitle || product.title}
                            </h1>
                            <p className="text-sm md:text-base font-normal text-zinc-400 mb-10 leading-relaxed">
                                {ai?.enhancedDescription || product.description || 'Haz de cualquier pared blanca tu propia sala de cine privada. Lente nativo de tiro corto, soporte 4K y altavoces espaciales incrustados. Tu habitación jamás volverá a ser la misma.'}
                            </p>

                            <div className="bg-[#18181b]/30 border border-white/5 p-6 rounded-2xl mb-6 backdrop-blur-sm">
                                <div className="flex items-end gap-6 mb-8">
                                    <span className="text-4xl md:text-5xl font-medium" style={{ fontFamily: 'serif' }}>{fmtPrice(product.price)}</span>
                                    {product.originalPrice && <span className="text-lg font-normal text-zinc-600 line-through pb-1">{fmtPrice(product.originalPrice)}</span>}
                                </div>
                                <button onClick={() => document.getElementById('checkout-cinema')?.scrollIntoView({ behavior: 'smooth' })} className="w-full h-[64px] bg-white text-black font-bold uppercase tracking-widest text-sm rounded-xl hover:bg-yellow-400 hover:shadow-[0_0_30px_rgba(234,179,8,0.3)] transition-all flex items-center justify-center gap-3">
                                    Adquirir Sistema
                                </button>
                            </div>

                            {/* 4. TRUST BADGES */}
                            <div className="flex font-semibold text-[10px] uppercase tracking-widest text-zinc-500 gap-6 justify-center lg:justify-start">
                                <span className="flex items-center gap-1.5"><svg className="text-yellow-500" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> Compra Segura</span>
                                <span className="flex items-center gap-1.5"><svg className="text-yellow-500" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg> Paga al Recibir</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 5. ABOVE FOLD DETAILS (ACCORDIONS) */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 pb-16">
                    <div className="border border-white/5 bg-[#18181b]/30 rounded-2xl overflow-hidden backdrop-blur-sm">
                        {[
                            { t: 'Lúmenes y Contraste', a: 'Fuente de luz LED brillante (10.000 Lúmenes dinámicos). Contraste infinito que proporciona negros profundos sin quemar los colores cálidos.' },
                            { t: 'Audio Embebido', a: 'Sistema estéreo dual hiperfocalizado. No requieres barras de sonido externas para disfrutar de voces nítidas y explosiones densas.' },
                            { t: 'Protocolo de Adquisición', a: 'Evita tarjetas de crédito y fraudes. Entregamos la óptica en tu puerta; la pagas directamente en efectivo al cadete luego de verificar su estado impecable.' }
                        ].map((ac, i) => (
                            <div key={i} className="border-b border-white/5 last:border-b-0">
                                <button onClick={() => setOpenSpecAcc(openSpecAcc===i?null:i)} className="w-full text-left px-8 py-5 flex items-center justify-between font-bold uppercase text-xs tracking-widest hover:bg-white/[0.02] transition-colors">
                                    {ac.t} 
                                    <svg className={`w-4 h-4 text-yellow-500 transition-transform ${openSpecAcc===i?'rotate-180':''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 9l-7 7-7-7"/></svg>
                                </button>
                                <AnimatePresence>
                                    {openSpecAcc === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-8 pb-6 pt-1 text-sm font-normal text-zinc-400 leading-relaxed">
                                            {ac.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 6. ENDLESS MARQUEE */}
                <div className="w-[100vw] overflow-hidden py-4 bg-gradient-to-r from-[#18181b] via-[#27272a] to-[#18181b] border-y border-white/5 relative left-[50%] -translate-x-[50%]">
                    <div className="flex whitespace-nowrap animate-marquee font-medium uppercase text-sm tracking-[0.3em] text-yellow-50" style={{ fontFamily: 'serif' }}>
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="flex items-center gap-12 px-6">
                                <span>PROYECCIÓN HASTA 150 PULGADAS</span><span className="text-yellow-500">•</span>
                                <span>CORRECCIÓN TRAPEZOIDAL AUTOMÁTICA</span><span className="text-yellow-500">•</span>
                                <span>100,000 HORAS DE LÁMPARA</span><span className="text-yellow-500">•</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 7. WHY TO USE / BENEFITS */}
                <div id="lente" className="max-w-7xl mx-auto px-4 md:px-8 py-24">
                    <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-20 text-center capitalize" style={{ fontFamily: 'serif' }}>Magia Arquitectónica.</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { ic: '◐', t: 'Auto-Focus Laser', d: 'Olvida ajustar una rueda plástica manual hasta agotar tu vista. Nuestro sensor LIDAR frontal mide la distancia mid-air y te da la nitidez perfecta en 2 segundos.' },
                            { ic: '◧', t: 'Sin Marco. Sin Límite.', d: 'Las TV de 85" cuestan hasta 5 veces más y son un estorbo mudarlas. Aquí consigues 150 pulgadas puras de colores vívidos que caben de vuelta en tu mochila.' },
                            { ic: '⎉', t: 'Sistema Nativo OS', d: 'Posee un entorno integrado (Android OS / Similar). Entra a Netflix, YouTube o Prime Video directamente sin enchufar tu laptop por cables estorbosos.' }
                        ].map((b, i) => (
                            <div key={i} className="bg-white/[0.01] border border-white/5 p-10 rounded-3xl relative text-center hover:bg-white/[0.03] transition-colors group">
                                <div className="text-5xl mb-8 text-yellow-500 opacity-50 group-hover:opacity-100 transition-opacity drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]">{b.ic}</div>
                                <h3 className="text-lg font-bold tracking-widest uppercase mb-4 text-white">{b.t}</h3>
                                <p className="text-sm font-normal text-zinc-400 leading-relaxed">{b.d}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 8. HOW TO USE (VISUAL GUIDE) */}
                <div id="pantalla" className="bg-[#18181b]/30 py-24 border-y border-white/5 relative overflow-hidden">
                    {/* Beam crossing background */}
                    <div className="absolute top-0 right-0 w-[50%] h-[1px] bg-gradient-to-l from-yellow-500 to-transparent transform -rotate-45 origin-right"></div>
                    <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                        <div className="text-center mb-16">
                            <span className="text-xs font-bold text-yellow-500 uppercase tracking-widest">Guía de Encendido</span>
                            <h2 className="text-4xl font-medium text-white tracking-tight mt-2" style={{ fontFamily: 'serif' }}>La Butaca está servida.</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                            {/* Line connecting steps */}
                            <div className="hidden md:block absolute top-[40px] left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                            {[
                                { s: 'I', t: 'Alinea', d: 'Conecta a la corriente y apúntalo a cualquier muro blanco de tu casa. Él hará el auto-enfoque al instante.' },
                                { s: 'II', t: 'Vincula', d: 'Conecta tu WiFi o enchufa tu consola mediante HDMI. Reconoce formatos automáticos sin drivers.' },
                                { s: 'III', t: 'Oculta', d: 'Apaga la lámpara principal de tu cuarto, ponte cómodo y absorbe el cine crudo.' }
                            ].map((s, i) => (
                                <div key={i} className="flex flex-col items-center text-center relative z-10">
                                    <div className="w-20 h-20 bg-[#09090b] border border-white/10 rounded-full flex items-center justify-center mb-6 shadow-xl">
                                        <div className="text-2xl font-medium text-yellow-500" style={{ fontFamily: 'serif' }}>{s.s}</div>
                                    </div>
                                    <h4 className="text-xl font-bold uppercase tracking-widest mb-3 text-white">{s.t}</h4>
                                    <p className="text-sm text-zinc-400 font-normal leading-relaxed">{s.d}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 9. DEEP DIVE MULTIMEDIA */}
                <div className="py-32 relative flex flex-col items-center justify-center min-h-[50vh] overflow-hidden">
                    {/* Projector throw effect */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[30vw] border-r-[30vw] border-b-[50vh] border-l-transparent border-r-transparent border-b-yellow-500/5 blur-[20px] pointer-events-none"></div>
                    <div className="absolute bottom-0 w-[50vw] h-2 bg-yellow-500/50 shadow-[0_0_50px_rgba(234,179,8,1)] blur-sm"></div>
                    
                    <div className="relative z-10 text-center max-w-3xl px-6">
                        <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-8 capitalize" style={{ fontFamily: 'serif' }}>Adiós Marcos Negros.</h2>
                        <p className="text-lg font-normal text-zinc-300 leading-relaxed mb-10">El cine no fue concebido para ser consumido detrás de un plástico negro reflectivo. Disfruta de la inmersión pura y absoluta donde la imagen se difumina con la oscuridad de tu propia habitación.</p>
                        <div className="text-xs font-bold uppercase tracking-widest text-zinc-500 border border-zinc-800 rounded-full px-6 py-2 inline-block">Proporción 16:9 Nativa</div>
                    </div>
                </div>

                {/* 10. COMPARISON TABLE */}
                <div className="max-w-5xl mx-auto px-4 md:px-8 py-16">
                    <h2 className="text-3xl font-medium text-center mb-16 capitalize" style={{ fontFamily: 'serif' }}>Por fin, tecnología honesta.</h2>
                    <div className="bg-[#18181b]/50 border border-white/5 rounded-3xl overflow-hidden backdrop-blur-sm">
                        <div className="grid grid-cols-3 border-b border-white/5 p-6 bg-white/[0.02]">
                            <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Métrica</div>
                            <div className="text-xs font-bold uppercase tracking-widest text-yellow-500 text-center">Nuestra Óptica</div>
                            <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 text-center">TV Tradicional (85")</div>
                        </div>
                        {[
                            { k: 'Costo por Pulgada', u: 'Económico y Expansible (150")', t: 'Multiplicador exponencial de precio' },
                            { k: 'Luz Azul Dañina', u: 'Reflejada Mínima (Protege Retina)', t: 'Directa a los ojos (Causa Insomnio)' },
                            { k: 'Portabilidad', u: '1.2 KG. Va en una mochila.', t: '40 KG. Requiere 2 instaladores.' },
                            { k: 'Ajuste de Sala', u: 'Puedes proyectar en el techo.', t: 'Fijo al mueble con tornillos.' }
                        ].map((r, i) => (
                            <div key={i} className="grid grid-cols-3 p-6 border-b border-white/5 last:border-b-0 hover:bg-white/[0.02] transition-colors">
                                <div className="text-xs md:text-sm font-bold text-white uppercase tracking-wider">{r.k}</div>
                                <div className="text-center font-bold text-yellow-400 text-sm md:text-base">{r.u}</div>
                                <div className="text-center font-normal line-through text-zinc-500 text-xs md:text-sm">{r.t}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 11. RISK REVERSAL WARRANTY */}
                <div className="max-w-5xl mx-auto px-4 md:px-8 py-20">
                    <div className="bg-yellow-500 text-black border border-yellow-400 p-8 md:p-14 rounded-[3rem] shadow-[0_0_50px_rgba(234,179,8,0.15)] flex flex-col md:flex-row items-center gap-10">
                        <div className="w-24 h-24 border-2 border-black rounded-full flex flex-shrink-0 items-center justify-center pointer-events-none">
                            <span className="text-4xl" style={{ fontFamily: 'serif' }}>V</span>
                        </div>
                        <div>
                            <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-widest mb-4">La Lámpara no Quema tu Dinero.</h3>
                            <p className="font-semibold text-sm md:text-base leading-relaxed text-black/80">Recibe tu orden vía Courier certificado, inspecciona la caja y paga en efectivo en tu misma acera. Sin adelantos digitales, sin trucos. Y si algo ocurre en 365 días, tienes soporte VIP de fábrica para reemplazos o servicio técnico local.</p>
                        </div>
                    </div>
                </div>

                {/* 12. BRAND ETHOS */}
                <div className="py-24 border-y border-white/5 mt-12 px-6 bg-[#18181b]/30 text-center relative">
                    <div className="max-w-3xl mx-auto relative z-10">
                        <h3 className="text-3xl md:text-5xl font-medium tracking-tight mb-8 capitalize text-white" style={{ fontFamily: 'serif' }}>Regresa el rito social.</h3>
                        <p className="text-base font-normal text-zinc-400 leading-relaxed uppercase tracking-widest">Las pantallas convencionales nos aislaron en sillones individuales fijando el cuello. Un proyector llena la pared, invita a que todos volteen a un mismo lienzo gigante, a tirar alfombras al piso y recuperar la calidez de "ir al cine", pero ahora sin salir de tu núcleo familiar.</p>
                    </div>
                </div>

                {/* 13. FAQ */}
                <div className="max-w-3xl mx-auto px-4 md:px-8 py-24">
                    <h2 className="text-2xl font-bold uppercase tracking-widest text-center mb-16">Acervo de Dudas Frecuentes</h2>
                    <div className="space-y-4">
                        {[
                            {q: '¿Se requiere pintar la pared de blanco o tela especial?', a: 'Proyectará impecablemente sobre paredes blancas, grises claras o crema mate. Las pantallas de tela gris anti-reflectante (ALR) mejoran el contraste diurno, pero para uso nocturno, tu pared limpia basta y sobra.'},
                            {q: '¿Hace ruido el ventilador interno?', a: 'Emitimos menos de 28dB en modo cine eco. Esencialmente imperceptible en cuanto arranca el audio dual de la película. No daña la inmersión.'},
                            {q: '¿Cómo pido que me lo entreguen físicamente?', a: 'Llena tus datos de contacto abajo. Confirmamos stock en depósito, enrutamos el envío hoy, y lo cancelas en puerta cuando el transportista lo presente en su caja virgen.'}
                        ].map((f, i) => (
                            <div key={i} className="bg-transparent border-b border-zinc-800">
                                <button onClick={() => setFaqOpen(faqOpen===i?null:i)} className="w-full text-left py-6 flex items-center justify-between font-bold text-sm tracking-widest uppercase transition-colors hover:text-yellow-500">
                                    <span>{f.q}</span>
                                    <span className="text-yellow-500 text-xl font-normal">{faqOpen===i?'-':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {faqOpen === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="pb-6 text-sm font-normal text-zinc-400 leading-relaxed">
                                            {f.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 14. EXPANDED REVIEWS (UGC) */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 border-t border-white/5">
                    <div className="text-center mb-16">
                        <div className="flex justify-center text-yellow-500 mb-4">
                            {[...Array(5)].map((_,i) => <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>)}
                        </div>
                        <h2 className="text-3xl font-medium tracking-tight capitalize text-white mb-2" style={{ fontFamily: 'serif' }}>Los Espectadores Hablan.</h2>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Tickets Cortados</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { r: "Tiré al basurero un SmartTV viejo para dejar una pared lisa exclusiva para esto. Apagamos la luz y mi hijo siente que The Avengers sucede en su propia habitación. Joya pura.", n: "Héctor Maldonado" },
                            { r: "Pensé que se vería borroso en los bordes como mi antiguo proyector del 2010. Este auto-enfoque alinea las cuatro esquinas con precisión láser. Ver series es otra cosa total.", n: "Valeria Centurión" },
                            { r: "Me llegó por encomienda en un día. Lo abrí en frente del mensajero, estaba perfecto, le pasé el efectivo y lo prendí enseguida. Suena fuerte, ni prendí el parlante bluetooh.", n: "Roberto J." }
                        ].map((rev, i) => (
                            <div key={i} className="bg-[#18181b]/50 border border-white/5 p-8 rounded-3xl relative backdrop-blur-sm shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                                <div className="absolute top-8 right-8 text-yellow-500/20 text-6xl" style={{ fontFamily: 'serif' }}>"</div>
                                <p className="text-sm font-normal text-zinc-300 leading-relaxed italic mb-8 relative z-10">"{rev.r}"</p>
                                <div className="border-t border-white/10 pt-4">
                                    <div className="font-bold text-xs uppercase tracking-widest text-white">{rev.n}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 15. CHECKOUT */}
                <div id="checkout-cinema" className="py-24 md:py-32 bg-[#18181b] border-t border-white/10 relative overflow-hidden mt-20">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-[100px] pointer-events-none"></div>
                    <div className="max-w-4xl mx-auto px-4 md:px-8 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                        <div className="md:col-span-5 text-center md:text-left">
                            <h3 className="text-4xl md:text-5xl font-medium tracking-tight mb-4 capitalize text-white" style={{ fontFamily: 'serif' }}>Pase Vip.</h3>
                            <p className="text-sm font-normal text-zinc-400 mb-8 leading-relaxed">No vas a vaciar tu tarjeta online hoy. Reserva la unidad para apartar el stock e inicia la logística. Tu pago se ejecuta en la entrega.</p>
                            <div className="text-3xl font-medium text-yellow-400" style={{ fontFamily: 'serif' }}>{fmtPrice(product.price)}</div>
                        </div>
                        <div className="md:col-span-7">
                            <form className="bg-[#09090b] border border-white/10 p-8 rounded-[2rem] shadow-2xl" onSubmit={e=>e.preventDefault()}>
                                <div className="space-y-6">
                                    <input type="text" className="w-full bg-transparent border-b border-white/20 focus:border-yellow-500 text-white font-medium text-sm px-2 py-4 outline-none transition-colors" placeholder="Firma de Reservante (Nombre)" />
                                    <input type="tel" className="w-full bg-transparent border-b border-white/20 focus:border-yellow-500 text-white font-medium text-sm px-2 py-4 outline-none transition-colors" placeholder="Teléfono para Coordinar (WhatsApp)" />
                                    <textarea rows={2} className="w-full bg-transparent border-b border-white/20 focus:border-yellow-500 text-white font-medium text-sm px-2 py-4 outline-none transition-colors resize-none" placeholder="Destino de la Butaca (Dirección)" />
                                    <div className="pt-4">
                                        <button className="w-full h-[70px] bg-white text-black font-bold uppercase tracking-widest text-sm rounded-xl hover:bg-yellow-400 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(234,179,8,0.3)]">
                                            Autorizar Despacho COD
                                        </button>
                                    </div>
                                    <div className="text-center font-bold text-[10px] uppercase tracking-widest text-zinc-600">
                                        Proceso Confidencial // 100% Sin Riesgo
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </main>

            {/* STICKY MOBILE CTA */}
            <div className="md:hidden fixed bottom-6 left-4 right-4 z-50">
                <div className="bg-[#18181b]/90 backdrop-blur-md border border-white/10 p-4 rounded-2xl flex items-center justify-between shadow-2xl">
                    <div className="pl-2">
                        <div className="text-[10px] font-bold uppercase text-zinc-500 tracking-widest">Abona en destino</div>
                        <div className="font-medium text-yellow-400 text-lg leading-none mt-1" style={{ fontFamily: 'serif' }}>{fmtPrice(product.price)}</div>
                    </div>
                    <button onClick={() => document.getElementById('checkout-cinema')?.scrollIntoView({ behavior: 'smooth' })} className="bg-white text-black rounded-lg px-6 py-3 font-bold uppercase tracking-widest text-[11px] shadow-[0_0_15px_white]">
                        Boleto
                    </button>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{__html: `
                @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
                .animate-marquee { animation: marquee 18s linear infinite; }
            `}} />
        </div>
    );
};

export default PdpCinemaBeam;
