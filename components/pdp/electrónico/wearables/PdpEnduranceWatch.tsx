'use client';
import React, { useState } from 'react';
import { StoreData, Product } from '@/lib/types';
import EnhancedProductGallery from '@/components/pdp/EnhancedProductGallery';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { data: StoreData; product: Product; }

const PdpEnduranceWatch: React.FC<Props> = ({ data, product }) => {
    const [faqOpen, setFaqOpen] = useState<number | null>(null);
    const ai = product.aiContent;
    const fmtPrice = (n: number) => { const s = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); return `Gs. ${s}`; };

    // Estética "Topography Dark": Verde oliva muy oscuro, mapas topo y acentos lima amarillentos
    const bg = '#0d110f'; // Dark OD Green / Black
    const textMain = '#cbd5e1'; // Slate 300
    const accent = '#bef264'; // Lime 300
    const topoUrl = "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z' fill='%23bef264' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E\")";

    return (
        <div style={{ background: bg, color: textMain }} className="font-mono antialiased overflow-x-hidden selection:bg-lime-300 selection:text-black">
            
            {/* Topography Ambient Background */}
            <div className="fixed inset-0 pointer-events-none z-0" style={{ backgroundImage: topoUrl, backgroundSize: '400px 400px' }}></div>

            {/* 1. TOP NAV (Tactical HUD) */}
            <header className="sticky top-0 z-50 bg-[#0d110f]/90 backdrop-blur-md border-b border-[#1b251f]">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full border border-lime-300/50 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-lime-300 animate-ping"></div>
                        </div>
                        <span className="text-xl font-bold tracking-widest uppercase text-white">APEX<span className="text-lime-300">GEAR</span></span>
                    </div>
                </div>
            </header>

            <main className="relative z-10 w-full overflow-hidden">
                {/* 2. BREADCRUMBS & LOGISTICS (Coordinates style) */}
                <div className="max-w-7xl mx-auto px-4 pt-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-lime-300/10 pb-4">
                        <div className="text-[10px] uppercase tracking-[0.3em] text-emerald-600/70">
                            SURVIVAL / WEARABLES / <span className="text-lime-300">GPS MULTIBAND</span>
                        </div>
                        <div className="inline-flex items-center gap-2 text-[9px] uppercase tracking-widest text-[#0d110f] bg-lime-300 px-3 py-1.5 font-bold">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 13l4 4L19 7"/></svg>
                            LOGÍSTICA CONTRA-ENTREGA (C.O.D.)
                        </div>
                    </div>
                </div>

                {/* 3. HERO (FIELD OPERATION VIBE) */}
                <div className="max-w-7xl mx-auto px-4 py-16 lg:py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="relative z-20">
                            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter leading-tight drop-shadow-md">
                                {ai?.enhancedTitle || product.title}
                            </h1>
                            <p className="text-sm md:text-base text-zinc-400 mb-10 leading-relaxed font-sans max-w-lg">
                                {ai?.enhancedDescription || product.description || 'Diseñado para lo implacable. Carga solar ilimitada, linterna verde LED táctica y mapas topográficos integrados. Un computador de supervivencia atado a tu muñeca.'}
                            </p>
                            
                            <div className="bg-[#131c17] border border-[#223329] p-8 relative">
                                {/* Crosshairs decorative */}
                                <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-lime-300/50"></div>
                                <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-lime-300/50"></div>
                                <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-lime-300/50"></div>
                                <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-lime-300/50"></div>

                                <div className="text-[9px] text-lime-300/60 uppercase tracking-widest mb-2 font-bold block">Adquisición Estratégica</div>
                                <div className="flex items-end gap-6 mb-8">
                                    <span className="text-4xl font-bold text-white tracking-tight">{fmtPrice(product.price)}</span>
                                    {product.originalPrice && <span className="text-lg text-emerald-800 line-through pb-1">{fmtPrice(product.originalPrice)}</span>}
                                </div>
                                <button onClick={() => document.getElementById('checkout-tactical')?.scrollIntoView({ behavior: 'smooth' })} className="w-full bg-lime-300 text-black py-4 uppercase font-black tracking-[0.2em] text-xs hover:bg-[#a3e635] transition-colors flex justify-center items-center gap-4 group">
                                    <span>Proceder al Despacho</span>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                                </button>
                            </div>
                        </div>

                        <div className="w-full relative flex items-center justify-center lg:p-10">
                            {/* Radar circular background */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none z-0">
                                <div className="w-[80%] aspect-square rounded-full border border-lime-300/20"></div>
                                <div className="absolute w-[60%] aspect-square rounded-full border border-lime-300/20"></div>
                                <div className="absolute w-[40%] aspect-square rounded-full border border-lime-300/20"></div>
                                <div className="absolute w-full h-[1px] bg-lime-300/20"></div>
                                <div className="absolute h-full w-[1px] bg-lime-300/20"></div>
                            </div>
                            <div className="relative z-10 w-full">
                                <EnhancedProductGallery product={product} accentColor={accent} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. TRUST BADGES TECHNICAL (Vital Signs) */}
                <div className="border-y border-[#1b251f] bg-[#090d0b]">
                    <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-[#1b251f]">
                        {[
                            {v: 'Zafiro', l: 'Cristal Anti-Arañazos'},
                            {v: '+30 Días', l: 'Batería Carga Solar'},
                            {v: 'Multi-Banda', l: 'GPS Anti-Interferencias'},
                            {v: '10 ATM', l: 'Resistencia al Agua'}
                        ].map((b, i) => (
                            <div key={i} className="text-center px-4">
                                <div className="text-2xl lg:text-3xl text-lime-300 font-bold mb-2">{b.v}</div>
                                <div className="text-[9px] uppercase tracking-widest text-[#4b6d58] font-bold">{b.l}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 5. EXPERT ACCORDIONS (Operations Log) */}
                <div className="max-w-4xl mx-auto px-4 py-24">
                    <h2 className="text-sm font-bold text-white uppercase tracking-[0.3em] mb-12 flex items-center gap-4">
                        <span className="w-4 h-4 bg-lime-300 text-[#0d110f] flex items-center justify-center rounded-sm">!</span>
                        Especificaciones del Terreno
                    </h2>
                    <div className="space-y-3">
                        {[
                            { t: 'Lente de Carga Solar Translúcida', a: 'El cristal de zafiro esconde diminutas células fotovoltaicas invisibles. Si corres ultramaratones o subes picos alpinos de día, el sol prolongará tu batería durante un mes en modo smartwatch sin tocar un enchufe.' },
                            { t: 'Linterna LED Focalizada', a: 'No es una pantalla blanca que ilumina débilmente. Integrada en el chásis hay una linterna real de doble LED (blanco y verde táctico) capaz de iluminar tu sendero si cae la noche imprevistamente en la montaña.' },
                            { t: 'Enrutamiento Trendline (Calor)', a: 'El mapa a color te muestra no solo dónde estás, sino las rutas más populares utilizadas por locales y por donde debes correr o andar en bicicleta basándose en miles de millones de kilómetros analizados globalmente por corredores.' }
                        ].map((ac, i) => (
                            <div key={i} className="border border-[#1b251f] bg-[#0c120f] hover:border-lime-300/30 transition-colors">
                                <button className="w-full py-6 px-6 lg:px-8 flex items-center text-left" onClick={() => setFaqOpen(faqOpen===i?null:i)}>
                                    <span className="text-lime-300 font-bold mr-6">0{i+1}</span>
                                    <span className="text-sm uppercase tracking-widest text-zinc-300 font-bold flex-1">{ac.t}</span>
                                    <span className="text-zinc-600 ml-4 font-bold">{faqOpen===i?'CLOSE':'OPEN'}</span>
                                </button>
                                <AnimatePresence>
                                    {faqOpen === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 lg:px-8 pb-8 pl-[4.5rem] pr-8 text-xs font-sans text-zinc-400 leading-relaxed border-t border-[#1b251f] pt-4">
                                            {ac.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 6. ENDLESS MARQUEE (Coordinates stream) */}
                <div className="w-[100vw] overflow-hidden py-4 bg-lime-300 text-[#0d110f] border-y-2 border-lime-400 relative left-[50%] -translate-x-[50%] flex transform">
                    <div className="flex whitespace-nowrap font-bold uppercase tracking-widest text-lg">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="flex items-center gap-12 px-6">
                                <span>35°42' N 139°45' E</span>
                                <span className="bg-[#0d110f] text-lime-300 px-2 py-1 text-xs">GPS SYNCED</span>
                                <span>144 BPM (ZONA 4)</span>
                                <span className="bg-[#0d110f] text-lime-300 px-2 py-1 text-xs">AEROBIC</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 7. WHY TO USE / BENEFITS (Survival Breakdown) */}
                <div className="max-w-7xl mx-auto px-4 py-32 border-b border-[#1b251f]">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="relative p-10 bg-[#090d0b] border border-[#1b251f]">
                            {/* Abstract Heart Rate Graph */}
                            <svg className="w-full h-auto text-lime-300/20" viewBox="0 0 200 50">
                                <path fill="none" stroke="currentColor" strokeWidth="2" d="M0,25 L30,25 L40,10 L50,40 L60,25 L200,25" />
                                <path fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3,3" d="M60,25 L200,25" />
                            </svg>
                            <h3 className="text-3xl font-black text-white uppercase mt-8 mb-4">Abandona la <br/>Zona de Confort.</h3>
                            <p className="text-zinc-400 font-sans text-sm leading-relaxed mb-6">Mide tu resiliencia en tiempo real. Este no es un simple notificador de whatsapp, es una máquina diseñada para empujar tu Umbral de Lactato (VO2 Max) en entornos completamente hostiles.</p>
                            <div className="flex items-center gap-2 text-[10px] text-lime-300 font-bold tracking-widest uppercase">
                                <span className="w-2 h-2 rounded-full bg-lime-300 animate-pulse"></span>
                                Monitoreo HRV 24/7
                            </div>
                        </div>
                        <div>
                            <div className="space-y-4">
                                {[
                                    { t: 'Métricas de Ascenso (ClimbPro)', d: 'Información en tiempo real sobre tus ascensos (pendientes, distancias). Sabrás cuánto castigo te falta en la colina.' },
                                    { t: 'Navegador Tracback', d: 'Si te pierdes en un bosque sin señal celular, presiona un botón y el reloj te enrutará exactamente por tus mismos pasos.' },
                                    { t: 'Música Offline (Sin red)', d: 'Guarda miles de canciones de Spotify en el reloj. Conecta tus auriculares y deja el pesado teléfono en casa.' },
                                    { t: 'Cuerpo de Titanio Endurecido', d: 'Bisel forjado que aguanta golpes directos contra rocas sin doblarse ni romperse.' }
                                ].map((b, i) => (
                                    <div key={i} className="flex gap-6 border border-[#1b251f] p-6 hover:bg-[#111814] transition-colors">
                                        <div className="text-lime-300 font-bold text-xl">0{i+1}</div>
                                        <div>
                                            <h4 className="text-white font-bold uppercase tracking-wide text-sm mb-2">{b.t}</h4>
                                            <p className="text-zinc-500 font-sans text-xs leading-relaxed">{b.d}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 10. COMPARISON TABLE */}
                <div className="max-w-4xl mx-auto px-4 py-32 border-b border-[#1b251f]">
                    <div className="border border-[#223329]">
                        <div className="grid grid-cols-3 bg-[#0d110f] text-[9px] uppercase tracking-widest font-black text-[#587e65] border-b border-[#223329]">
                            <div className="p-6">Feature</div>
                            <div className="p-6 text-lime-300 bg-lime-900/10 border-x border-[#223329] text-center">Nuestra Máquina Táctica</div>
                            <div className="p-6 text-center">Relojes "Smart" Comunes</div>
                        </div>
                        {[
                            { k: 'Tiempo de Batería Real', u: 'Hasta 37 Días (Carga Solar)', t: '1 Día (Deberás cargarlo a diario)' },
                            { k: 'Pantalla', u: 'Transflectiva (Se ve mejor bajo el sol)', t: 'OLED Brillante (Se apaga bajo el sol)' },
                            { k: 'Lente y Bisel', u: 'Zafiro y Titanio de grado aviación', t: 'Vidrio frágil y aluminio propenso a abolladuras' },
                            { k: 'Método Logístico', u: 'Entrega Presencial (Abono Efectivo/Transf)', t: 'Tarjeta en web insegura y correos perdidos' }
                        ].map((r, i) => (
                            <div key={i} className="grid grid-cols-3 border-t border-[#1b251f] font-sans text-xs">
                                <div className="p-6 text-zinc-400 font-medium">{r.k}</div>
                                <div className="p-6 text-lime-100 bg-lime-900/5 font-bold border-x border-[#223329] text-center">{r.u}</div>
                                <div className="p-6 text-zinc-700 text-center line-through">{r.t}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 11. RISK REVERSAL WARRANTY (Extraction Policy) */}
                <div className="py-24 bg-[#090d0b] text-center px-4">
                    <div className="max-w-3xl mx-auto border border-lime-300/20 bg-[#0d110f] p-10 relative">
                        <div className="absolute top-0 right-0 w-8 h-8 flex items-center justify-center p-2">
                            <span className="w-full h-[1px] bg-lime-300/50 block rotate-45 transform origin-center absolute"></span>
                            <span className="w-full h-[1px] bg-lime-300/50 block -rotate-45 transform origin-center absolute"></span>
                        </div>
                        <h3 className="text-xl text-white font-bold tracking-widest uppercase mb-4">Normas de Extracción (C.O.D.)</h3>
                        <p className="text-zinc-400 font-sans text-sm leading-relaxed mb-6">
                            Protegemos tus fondos operativos. Ignora las estafas. Un operador logístico transportará físicamente este instrumental hacia tu domicilio por rutas terrestres. Solamente liberamos el reloj en el instante preciso en el que apruebas visualmente el hardware y efectúas la compensación local en efectivo o por giro inmediato frente a él.
                        </p>
                    </div>
                </div>

                {/* 13. FAQ */}
                <div className="max-w-3xl mx-auto px-4 py-24 border-b border-[#1b251f]">
                    <h2 className="text-2xl text-lime-300 font-black uppercase mb-12 text-center tracking-wide">Base de Datos F.A.Q.</h2>
                    <div className="space-y-4">
                        {[
                            {q: '¿Se conecta a teléfonos de cualquier marca (Android o iPhone)?', a: 'Totalmente. La aplicación central descarga y procesa todos tus datos fisiológicos de forma nativa e independiente del ecosistema de tu marca móvil.'},
                            {q: 'No soy maratonista, ¿Vale la pena tener este modelo de supervivencia?', a: 'Sorprendentemente, muchos gerentes y directores lo usan por el "look" industrial y porque odian cargar sus "smartwatches" todos los días de su vida.'},
                            {q: '¿Qué me garantiza que el reloj llega y no me roban el pedido online?', a: 'Pidiendo abajo bloqueas un equipo de nuestro inventario pero no aportas datos financieros. Llevamos el equipo hasta tus manos y pagas ahí; el riesgo para ti es nulo.'}
                        ].map((f, i) => (
                            <div key={i} className="border-b border-[#1b251f]">
                                <button onClick={() => setFaqOpen(faqOpen===i?null:i)} className="w-full py-6 text-left flex justify-between items-center text-white font-bold text-xs uppercase tracking-widest hover:text-lime-300 transition-colors">
                                    {f.q}
                                    <span className="text-lime-300 text-lg font-bold">{faqOpen===i?'−':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {faqOpen === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="pb-6 text-zinc-500 font-sans text-sm leading-relaxed">
                                            {f.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 14. EXPANDED REVIEWS */}
                <div className="py-24 bg-[#090d0b]">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="text-center mb-16">
                            <span className="text-[10px] uppercase font-bold text-[#4b6d58] tracking-widest">TRANSMISIONES DE CAMPO RECIBIDAS</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { r: "Hice el circuito de 3 días en Patagonia profunda sin celular. El GPS no perdió señal y usé el mapa topo todo el tiempo. Llegué con 60% de batería restante. Una joya y excelente pago C.O.D", n: "Esteban R.", t: "Guía de Montaña" },
                                { r: "Me resistía a cambiar el Apple Watch pero cargar el reloj todos los días me superó. Este me duró exactamente 28 días con la carga solar. El material se ve caro y rudo.", n: "Miguel F.", t: "Ingeniero Civil" },
                                { r: "El servicio C.O.D. espectacular. Marqué la caja de abajo, me escribieron y vino el flete a la sucursal de mi trabajo. Entregué la plata, abrí la caja. Todo limpio.", n: "Lucas H.", t: "Rescatista Táctico" }
                            ].map((rev, i) => (
                                <div key={i} className="p-8 border border-[#1b251f] bg-[#0d110f] hover:border-lime-300 transition-colors duration-500">
                                    <p className="text-zinc-300 font-sans text-sm mb-8 leading-relaxed">"{rev.r}"</p>
                                    <div className="border-t border-[#1b251f] pt-4 flex justify-between items-center">
                                        <div>
                                            <div className="text-white font-bold uppercase text-[10px] tracking-widest">{rev.n}</div>
                                            <div className="text-lime-500 uppercase text-[9px] font-bold">{rev.t}</div>
                                        </div>
                                        <div className="text-lime-300">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 15. CHECKOUT (Tactical Dispatch) */}
                <div id="checkout-tactical" className="py-32 relative">
                    <div className="absolute inset-0 bg-[#060807]"></div>
                    <div className="max-w-6xl mx-auto px-4 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="inline-block border border-lime-300 text-lime-300 px-3 py-1 font-bold text-[10px] uppercase tracking-widest mb-8">
                                PROTOCOLO DE DESPACHO
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-black text-white uppercase tracking-tighter mb-6 leading-tight">Activa tu <br/><span className="text-lime-300">Reserva de Campo.</span></h2>
                            <p className="text-zinc-500 font-sans mb-10 max-w-sm">Rellena el reporte a continuación para que nuestras unidades logísticas recolecionen el equipo y lo entreguen a tu perímetro. Tú abonas solamente cuando verifiques la caja en persona.</p>
                            
                            <div className="text-5xl font-black text-white px-6 py-4 bg-[#0d110f] border border-[#1b251f] inline-block">{fmtPrice(product.price)}</div>
                        </div>
                        
                        <div className="bg-lime-900/10 p-8 lg:p-12 border-2 border-lime-300/30">
                            <h3 className="text-lg text-white font-bold uppercase tracking-widest mb-6">Manifiesto Personal</h3>
                            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                                <div>
                                    <input type="text" className="w-full bg-[#0d110f] border border-[#223329] text-white font-bold p-4 focus:border-lime-300 outline-none transition-colors uppercase placeholder:text-[#375240] placeholder:tracking-widest" placeholder="< IDENTIDAD />" />
                                </div>
                                <div>
                                    <input type="tel" className="w-full bg-[#0d110f] border border-[#223329] text-white font-bold p-4 focus:border-lime-300 outline-none transition-colors uppercase placeholder:text-[#375240] placeholder:tracking-widest" placeholder="< TELÉFONO WSP />" />
                                </div>
                                <div>
                                    <textarea rows={2} className="w-full bg-[#0d110f] border border-[#223329] text-white font-bold p-4 focus:border-lime-300 outline-none transition-colors uppercase placeholder:text-[#375240] placeholder:tracking-widest resize-none" placeholder="< COORDENADAS DOMICILIO />"></textarea>
                                </div>
                                <div className="pt-4">
                                    <button className="w-full bg-lime-300 text-black py-5 font-black uppercase tracking-[0.2em] text-sm hover:bg-white transition-colors">
                                        EJECUTAR ENVÍO C.O.D.
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
};

export default PdpEnduranceWatch;
