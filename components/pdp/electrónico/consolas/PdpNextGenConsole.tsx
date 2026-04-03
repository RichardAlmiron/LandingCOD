'use client';
import React, { useState } from 'react';
import { StoreData, Product } from '@/lib/types';
import EnhancedProductGallery from '@/components/pdp/EnhancedProductGallery';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { data: StoreData; product: Product; }

const PdpNextGenConsole: React.FC<Props> = ({ data, product }) => {
    const [faqOpen, setFaqOpen] = useState<number | null>(null);
    const ai = product.aiContent;
    const fmtPrice = (n: number) => { const s = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); return `Gs. ${s}`; };

    // Estética "Sleek Odyssey": Blanco inmaculado combinado con Azul Cobalto, emulando la pureza óptica del gaming next-gen
    const bg = '#ffffff'; 
    const textMain = '#0f172a'; // Slate 900
    const accent = '#2563eb'; // Deep Neon Blue (Cobalt)

    return (
        <div style={{ background: bg, color: textMain }} className="font-sans antialiased overflow-x-hidden selection:bg-blue-600 selection:text-white">
            
            {/* Ethereal Glow Ambient */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center">
                <div className="absolute top-[-10%] right-[-10%] w-[50vh] h-[50vh] bg-blue-500/10 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[60vh] h-[60vh] bg-indigo-500/10 blur-[130px] rounded-full"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-white via-[#f8fafc] to-blue-50/30"></div>
            </div>

            {/* 1. TOP NAV (Smooth Curved) */}
            <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-3xl border-b border-blue-900/5">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="text-2xl font-light tracking-tighter text-slate-800 flex items-center gap-2">
                        <svg className="w-6 h-6 text-blue-600 animate-pulse" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                        OMNI<span className="font-bold text-blue-600">PLAY</span>
                    </div>
                </div>
            </header>

            <main className="relative z-10 w-full overflow-hidden">
                {/* 2. BREADCRUMBS & LOGISTICS */}
                <div className="max-w-7xl mx-auto px-6 pt-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-slate-400">
                            Hogar {'>'} Entretenimiento {'>'} <span className="text-blue-600">Alta Fidelidad</span>
                        </div>
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-[9px] uppercase tracking-widest px-4 py-2 rounded-full shadow-lg shadow-blue-500/20">
                            Unidades C.O.D. Disponibles
                        </div>
                    </div>
                </div>

                {/* 3. HERO (CLEAN, ETHEREAL) */}
                <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-5 relative z-20 order-2 lg:order-1">
                            <h1 className="text-5xl lg:text-7xl font-light text-slate-900 mb-6 tracking-tighter leading-[1.1]">
                                {ai?.enhancedTitle || product.title}
                            </h1>
                            <p className="text-lg text-slate-500 mb-10 leading-relaxed font-light">
                                {ai?.enhancedDescription || product.description || 'Bienvenido a la próxima generación inmersiva. Carga veloz hiper-rapida, retroalimentación háptica adaptativa y Audio 3D. El juego no tiene límites.'}
                            </p>
                            
                            <div className="bg-white rounded-3xl p-8 shadow-[0_30px_60px_rgba(37,99,235,0.06)] border border-blue-50 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-100 to-transparent rounded-bl-full opacity-50"></div>
                                <div className="flex flex-col mb-8 relative z-10">
                                    <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-2">Precio de Estructura Base</span>
                                    <div className="flex items-end gap-4">
                                        <span className="text-4xl font-light text-slate-900 tracking-tight">{fmtPrice(product.price)}</span>
                                        {product.originalPrice && <span className="text-sm text-slate-400 line-through pb-1">{fmtPrice(product.originalPrice)}</span>}
                                    </div>
                                </div>
                                <button onClick={() => document.getElementById('checkout-console')?.scrollIntoView({ behavior: 'smooth' })} className="w-full bg-blue-600 text-white rounded-2xl py-5 font-bold uppercase tracking-widest text-xs hover:bg-blue-700 hover:shadow-[0_15px_30px_rgba(37,99,235,0.2)] transition-all duration-300 relative z-10">
                                    Orden C.O.D. Preferencial
                                </button>
                                <div className="text-[10px] text-center text-slate-400 uppercase tracking-widest mt-6 font-bold flex justify-center items-center gap-2">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                                    Abono Mínimo Cero Online
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-7 w-full relative flex items-center justify-center order-1 lg:order-2">
                            {/* Curved display stand effect */}
                            <div className="absolute inset-x-10 bottom-0 h-24 bg-gradient-to-t from-blue-100/50 to-transparent rounded-full blur-2xl z-0"></div>
                            <div className="relative z-10 w-full rounded-[2rem] overflow-hidden  p-4">
                                <EnhancedProductGallery product={product} accentColor={accent} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. TRUST BADGES TECHNICAL (Smooth Specs) */}
                <div className="bg-slate-50 py-16">
                    <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                        {[
                            {v: '4K @ 120fps', l: 'Fidelidad Gráfica'},
                            {v: 'RayTracing', l: 'Iluminación Fotoreal'},
                            {v: 'SSD 1TB', l: 'Carga Ultra Rápida'},
                            {v: 'Tempest 3D', l: 'Sonido Espacial'}
                        ].map((b, i) => (
                            <div key={i} className="flex flex-col">
                                <span className="text-3xl font-light text-slate-800 mb-2">{b.v}</span>
                                <span className="text-[9px] text-blue-600 uppercase font-bold tracking-[0.2em]">{b.l}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 5. EXPERT ACCORDIONS */}
                <div className="max-w-5xl mx-auto px-6 py-24">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
                        <div className="md:col-span-5">
                            <h2 className="text-4xl text-slate-900 font-light tracking-tight leading-tight mb-6">Rompiendo el Océano Digital.</h2>
                            <p className="text-slate-500 font-light leading-relaxed">No es simplemente una actualización gráfica. Es un cambio de paradigma en cómo el software y el hardware interactúan para eliminar pantallas de carga y emular mundos enteros que existen en paralelo a nuestra realidad.</p>
                        </div>
                        <div className="md:col-span-7 space-y-4">
                            {[
                                { t: 'Unidad de Estado Sólido (SSD Custodiada)', a: 'Diseñada bajo una arquitectura personalizada que inyecta datos desde el disco a la GPU a 5.5 Gigabytes por segundo. Saltarás de un planeta a otro en tus juegos espaciales sin ver una sola barra de carga.' },
                                { t: 'Gatillos Adaptativos (Háptica Activa)', a: 'Los motores de los botones traseros oponen verdadera resistencia física según la programación del juego. Sentirás cómo se tensa la cuerda de un arco, o cómo se traba el acelerador de tu auto deportivo directamente en las puntas de tus dedos.' },
                                { t: 'Retrocompatibilidad Silenciosa', a: 'Inserta tus viejos discos. Un inmenso catálogo de la generación pasada recibe un impulso automático en fotogramas y resolución por mero exceso de fuerza bruta procesal.' }
                            ].map((ac, i) => (
                                <div key={i} className="bg-white border rounded-2xl border-slate-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all">
                                    <button className="w-full px-6 py-6 flex justify-between items-center text-left" onClick={() => setFaqOpen(faqOpen===i?null:i)}>
                                        <span className="text-slate-800 font-medium text-sm tracking-wide">{ac.t}</span>
                                        <div className={`w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center text-blue-600 transition-transform ${faqOpen===i?'rotate-180':''}`}>+</div>
                                    </button>
                                    <AnimatePresence>
                                        {faqOpen === i && (
                                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 pb-6 text-slate-500 font-light leading-relaxed text-sm border-t border-slate-50 pt-4">
                                                {ac.a}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 6. ENDLESS MARQUEE (Sleek text blur) */}
                <div className="w-[100vw] overflow-hidden py-8 bg-blue-600 text-white flex transform relative left-[50%] -translate-x-[50%]">
                    <div className="flex whitespace-nowrap font-light text-2xl uppercase tracking-[0.4em]">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="flex items-center gap-16 px-8">
                                <span>SIN LIMITES</span>
                                <span className="w-2 h-2 bg-blue-300 rounded-full"></span>
                                <span>PLAY HAS NO BOUNDARIES</span>
                                <span className="w-2 h-2 bg-blue-300 rounded-full"></span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 7. WHY TO USE / BENEFITS */}
                <div className="max-w-7xl mx-auto px-6 py-32 border-b border-slate-100">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="order-2 lg:order-1 relative rounded-[3rem] bg-slate-50 p-12 overflow-hidden">
                            <div className="absolute top-[-50px] right-[-50px] w-[200px] h-[200px] bg-blue-100 rounded-full blur-3xl"></div>
                            <div className="relative z-10 flex flex-col items-center justify-center text-center h-full gap-8">
                                <div className="text-blue-600 font-bold uppercase tracking-widest text-[10px]">DualSense Controller</div>
                                <h3 className="text-3xl font-light text-slate-800">Amplifica tus Sentidos</h3>
                                <p className="text-slate-500 font-light text-sm leading-relaxed">Olvídate de la vibración tosca y vieja. Los actuadores duales entregan respuestas táctiles granulares, simulando texturas. Sentirás si caminas por lodo de lluvia, metal crujiente o nieve profunda directamente en la palma de tu mano.</p>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2">
                            <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-6 leading-tight">Velocidad del rayo. <br/><span className="text-blue-600 font-medium">Inmersión profunda.</span></h2>
                            <p className="text-slate-500 font-light text-lg mb-10 leading-relaxed">El futuro del ocio en el sofá no es ver pasivamente televisión con streaming borroso, es ser el director y jugador principal de producciones multimillonarias que responden a tu control instantáneamente.</p>
                            
                            <ul className="space-y-6">
                                {[
                                    { t: 'Audio Tempest 3D', d: 'El entorno cobra vida. Usando auriculares el sonido vuela desde el eje Z, distinguiendo altura y profundidad.' },
                                    { t: 'Renderizado 120 FPS', d: 'Compatibilidad con pantallas 4K para tasas de refresco competitivas ultra-suaves.' },
                                    { t: 'Interfaz Invisible', d: 'Menús superpuestos. Únete a una partida con amigos en la otra punta del globo terráqueo en 3 clicks.' }
                                ].map((b, i) => (
                                    <li key={i} className="flex gap-4">
                                        <div className="w-8 h-8 rounded-full border border-blue-200 text-blue-600 flex items-center justify-center shrink-0">{i+1}</div>
                                        <div>
                                            <h4 className="text-slate-800 font-medium mb-1 text-sm">{b.t}</h4>
                                            <p className="text-slate-500 font-light text-sm leading-relaxed">{b.d}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* 10. COMPARISON TABLE */}
                <div className="max-w-4xl mx-auto px-6 py-24">
                    <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-lg shadow-slate-100/50">
                        <div className="grid grid-cols-3 bg-slate-50 text-[10px] uppercase font-bold text-slate-400 tracking-widest border-b border-slate-200">
                            <div className="p-6">Tecnología</div>
                            <div className="p-6 text-blue-700 bg-blue-50/50 border-x border-slate-200 text-center">Nuestra Órbita Play</div>
                            <div className="p-6 text-center">Consolas Standard Pasadas</div>
                        </div>
                        {[
                            { k: 'Carga de Datos', u: 'SSD a 5.5GB/s (Instantáneo)', t: 'Discos HDD Mecánicos' },
                            { k: 'Resolución Óptima', u: '4K Nativo Trazado de Rayos', t: '1080p Borroso' },
                            { k: 'Control', u: 'Háptico Adaptativo 360°', t: 'Vibración Plana de 1 motor' },
                            { k: 'Riesgo Logístico', u: 'Pago seguro al recibir (C.O.D.)', t: 'Fraude por Internet' }
                        ].map((r, i) => (
                            <div key={i} className="grid grid-cols-3 border-t border-slate-100 font-light text-sm">
                                <div className="p-6 text-slate-500">{r.k}</div>
                                <div className="p-6 text-slate-900 bg-blue-50/30 border-x border-slate-200 text-center font-medium">{r.u}</div>
                                <div className="p-6 text-slate-400 text-center line-through">{r.t}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 11. RISK REVERSAL WARRANTY */}
                <div className="py-24 bg-slate-50 text-center px-6">
                    <div className="max-w-3xl mx-auto">
                        <div className="w-16 h-16 rounded-full bg-blue-100/50 text-blue-600 flex items-center justify-center mx-auto mb-6">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                        </div>
                        <h3 className="text-2xl text-slate-900 font-light mb-4">La Inversión Blindada.</h3>
                        <p className="text-slate-500 font-light leading-relaxed mb-8">
                            Un hardware de nueva generación de este peso económico no debería transitar pasarelas dudosas de pago. Te enviaremos el baúl sellado directamente a tu domicilio. Lo abres, confirmas que es la versión integral Next-Gen y efectúas la compensación local en dinero. Sin trampas.
                        </p>
                    </div>
                </div>

                {/* 13. FAQ */}
                <div className="max-w-3xl mx-auto px-6 py-24 border-t border-slate-100">
                    <h2 className="text-2xl text-slate-900 font-light mb-12 text-center tracking-tight">Archivo de Dudas</h2>
                    <div className="space-y-3">
                        {[
                            {q: '¿Puede reproducir películas en formato físico?', a: 'Por supuesto. La bandeja interna es una reproductora lectora de Blu-Ray Ultra-HD nativa, además de poseer todas las plataformas de Netflix o HBO integradas.'},
                            {q: '¿Mis auriculares antiguos con cable normal servirán?', a: 'Sí. El mando táctil háptico inferior posee un puerto jack estándar de 3.5mm; enchufas tus auriculares directamente al control que tienes en la mano y el audio es transmitido inalámbricamente con perfil 3D.'},
                            {q: 'No cargué pagos. ¿Cómo sé que me enviarán la consola?', a: 'Al generar tu orden C.O.D, retienes un equipo de nuestro inventario y pasa a estado en ruta. Un operador humano te contactará para asegurar que estés en tu casa en el lapso del envío. Ahí realizarás el abono correspondiente.'}
                        ].map((f, i) => (
                            <div key={i} className="bg-white border border-slate-200 rounded-2xl hover:border-blue-200 transition-colors">
                                <button onClick={() => setFaqOpen(faqOpen===i?null:i)} className="w-full p-6 text-left flex justify-between items-center text-slate-800 font-medium">
                                    {f.q}
                                    <span className="text-slate-400 font-bold">{faqOpen===i?'−':'+'}</span>
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
                <div className="py-24 bg-white border-t border-slate-100">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { r: "Jugar títulos exlusivos que no cargan absolutamente nunca es como magia negra. Los gráficos en la TV 4k me dejaron sordo. Excelente el pago C.O.D, a salvo de ladrones virtuales.", n: "Mateo R.", t: "Streamer" },
                                { r: "Fue un regalo para mi hijo en su cumpleaños. Marqué la fecha para la logística, llegó el camión a las 10 am, le di la plata contada a la operadora. Feliz y contento.", n: "Valeria C.", t: "Cliente Local" },
                                { r: "Pasé de mi PC vieja a esto y no extraño nada. El mando es el 50% de la razón de esta consola. Increíble y silenciosa en extremo, ni se sienten los ventiladores.", n: "Facundo S.", t: "Estudiante Dev" }
                            ].map((rev, i) => (
                                <div key={i} className="p-8 bg-slate-50 rounded-3xl border border-slate-100 relative">
                                    <div className="text-blue-600/20 font-serif text-5xl absolute top-4 right-6">"</div>
                                    <p className="text-slate-600 font-light text-sm mb-6 leading-relaxed relative z-10 pt-4">"{rev.r}"</p>
                                    <div>
                                        <div className="text-slate-900 font-medium text-xs tracking-wide">{rev.n}</div>
                                        <div className="text-slate-400 uppercase text-[9px] tracking-wider mt-1">{rev.t}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 15. CHECKOUT (Sleek Clean Form) */}
                <div id="checkout-console" className="py-32 relative bg-white border-t border-slate-100">
                    <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1 bg-white p-8 lg:p-12 rounded-[2rem] border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.03)] focus-within:shadow-[0_20px_60px_rgba(37,99,235,0.08)] transition-all">
                            <h3 className="text-xl text-slate-800 font-semibold mb-2">Reserva de Stock Físico</h3>
                            <p className="text-slate-500 font-light text-xs mb-8">Pagas de forma segura en tu domicilio al recibir (C.O.D)</p>
                            
                            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                                <div>
                                    <label className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1 block ml-1">Receptor Autorizado</label>
                                    <input type="text" className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-4 focus:border-blue-400 focus:bg-white outline-none transition-all placeholder:text-slate-300" placeholder="Su Nombre" />
                                </div>
                                <div>
                                    <label className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1 block ml-1">Vía de Contacto WhatsApp</label>
                                    <input type="tel" className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-4 focus:border-blue-400 focus:bg-white outline-none transition-all placeholder:text-slate-300" placeholder="Su Móvil" />
                                </div>
                                <div>
                                    <label className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-1 block ml-1">Instrucciones de Destino Físico</label>
                                    <textarea rows={2} className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-4 focus:border-blue-400 focus:bg-white outline-none transition-all placeholder:text-slate-300 resize-none" placeholder="Localidad, calle, referencias..."></textarea>
                                </div>
                                <div className="pt-4">
                                    <button className="w-full bg-blue-600 text-white font-bold uppercase tracking-widest rounded-xl py-5 hover:bg-blue-700 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-600/30 transition-all">
                                        Despachar Unidad Oficial
                                    </button>
                                </div>
                            </form>
                        </div>
                        
                        <div className="order-1 lg:order-2">
                            <div className="inline-block border border-blue-200 text-blue-600 px-3 py-1 text-[10px] uppercase font-bold tracking-widest mb-6 rounded-full bg-blue-50">Juego Extremo</div>
                            <h2 className="text-4xl lg:text-5xl font-light text-slate-900 leading-tight mb-6">Traspasa los límites <br/><span className="font-semibold">de la pantalla.</span></h2>
                            <p className="text-slate-500 font-light text-lg mb-10 leading-relaxed max-w-sm">Este diseño es más que un objeto decorativo futurista bajo el televisor, es la llave a narrativas profundas e imparables que la generación pasada no puede compilar. Reclama la tuya.</p>
                            
                            <div className="text-5xl font-light text-slate-900 tracking-tight">{fmtPrice(product.price)}</div>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
};

export default PdpNextGenConsole;
