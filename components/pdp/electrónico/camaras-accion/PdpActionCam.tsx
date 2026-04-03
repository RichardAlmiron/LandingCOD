'use client';
import React, { useState } from 'react';
import { StoreData, Product } from '@/lib/types';
import EnhancedProductGallery from '@/components/pdp/EnhancedProductGallery';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { data: StoreData; product: Product; }

const PdpActionCam: React.FC<Props> = ({ data, product }) => {
    const [faqOpen, setFaqOpen] = useState<number | null>(null);
    const ai = product.aiContent;
    const fmtPrice = (n: number) => { const s = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); return `Gs. ${s}`; };

    // Estética "Mud & Metal": Negros profundos, amarillos agresivos, texturas rústicas y técnicas.
    const bg = '#090a0b'; // Casi negro asfalto
    const textMain = '#e5e7eb'; // Gray 200
    const accent = '#eab308'; // Yellow 500

    return (
        <div style={{ background: bg, color: textMain }} className="font-sans antialiased overflow-x-hidden selection:bg-yellow-500 selection:text-black">
            
            {/* Grit / Noise / Metal Ambient Overlay */}
            <div className="fixed inset-0 pointer-events-none z-0 opacity-20" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
            
            <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-900/10 via-transparent to-transparent"></div>

            {/* 1. TOP NAV (Rugged Tool Look) */}
            <header className="sticky top-0 z-50 bg-[#090a0b]/90 backdrop-blur-md border-b-4 border-yellow-500">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="text-2xl font-black italic tracking-tighter text-white uppercase flex items-center gap-2">
                        <div className="w-4 h-4 bg-yellow-500 skew-x-[-15deg]"></div>
                        PRO<span className="text-yellow-500">CAPTURE</span>
                    </div>
                    <div className="text-[10px] font-bold text-black bg-yellow-500 px-3 py-1 uppercase tracking-widest skew-x-[-15deg]">
                        <span className="skew-x-[15deg] block">Mil-Spec Standard</span>
                    </div>
                </div>
            </header>

            <main className="relative z-10 w-full overflow-hidden">
                {/* 2. BREADCRUMBS & LOGISTICS */}
                <div className="max-w-7xl mx-auto px-4 pt-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 bg-neutral-900 px-4 py-2 border border-neutral-800">
                            GEAR {'>'} ÓPTICA {'>'} <span className="text-yellow-500 font-black">ACCIÓN 5K</span>
                        </div>
                        <div className="inline-flex items-center gap-2 text-xs font-bold text-slate-300">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-yellow-500"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                            PAGO SEGURO C.O.D.
                        </div>
                    </div>
                </div>

                {/* 3. HERO (AGGRESSIVE ACTION) */}
                <div className="max-w-7xl mx-auto px-4 py-16 lg:py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="relative z-20">
                            <h1 className="text-6xl md:text-8xl font-black text-white mb-6 uppercase tracking-tighter leading-[0.9] drop-shadow-2xl">
                                {ai?.enhancedTitle || product.title}
                            </h1>
                            <p className="text-xl md:text-2xl text-neutral-400 mb-10 font-bold tracking-tight border-l-4 border-yellow-500 pl-6 py-2">
                                {ai?.enhancedDescription || product.description || 'Sobrevive a caídas, polvo, barro y nevadas. Graba la adrenalina en 5K cristalino con estabilización inquebrantable.'}
                            </p>
                            
                            <div className="bg-[#111315] border-2 border-neutral-800 p-8 relative overflow-hidden group hover:border-yellow-500 transition-colors">
                                <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-500 rotate-45 translate-x-8 -translate-y-8 flex items-end justify-center pb-2 text-[10px] font-black text-black">IP68</div>
                                <div className="text-[10px] text-neutral-500 uppercase tracking-widest font-black mb-4">Tarifa de Adquisición</div>
                                <div className="flex items-end gap-6 mb-8">
                                    <span className="text-5xl font-black text-white tracking-widest">{fmtPrice(product.price)}</span>
                                    {product.originalPrice && <span className="text-xl text-neutral-600 font-bold line-through pb-1">{fmtPrice(product.originalPrice)}</span>}
                                </div>
                                <button onClick={() => document.getElementById('checkout-action')?.scrollIntoView({ behavior: 'smooth' })} className="w-full bg-yellow-500 text-black py-5 text-lg font-black uppercase tracking-widest hover:bg-yellow-400 focus:ring-4 ring-yellow-500/30 transition-all skew-x-[-5deg]">
                                    <span className="skew-x-[5deg] block text-center">Reclamar Equipo</span>
                                </button>
                                <div className="text-[10px] text-center text-yellow-500 mt-4 uppercase tracking-widest font-bold">
                                    Despacho C.O.D Habilitado
                                </div>
                            </div>
                        </div>

                        <div className="w-full pl-0 lg:pl-10">
                            {/* Caution Tape behind gallery */}
                            <div className="relative p-2 bg-[#1a1c1e] border-4 border-[#24272b] transform rotate-1 shadow-2xl">
                                <div className="absolute -inset-4 border-y-8 border-yellow-500/20 transform -rotate-3 z-0 pointer-events-none" style={{ background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(234, 179, 8, 0.1) 10px, rgba(234, 179, 8, 0.1) 20px)'}}></div>
                                <div className="relative z-10 bg-black">
                                    <EnhancedProductGallery product={product} accentColor={accent} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. TRUST BADGES TECHNICAL (Rugged Specs) */}
                <div className="border-y-4 border-neutral-900 bg-[#000]">
                    <div className="max-w-7xl mx-auto px-4 py-12">
                        <div className="flex flex-wrap gap-8 justify-center lg:justify-between items-center text-center font-black uppercase">
                            {[
                                {v: '5.3K 60FPS', l: 'Óptica Ultra-HD'},
                                {v: 'HyperSmooth 6.0', l: 'Estabilización IA'},
                                {v: '10 Mts', l: 'Sumergible Nativo'},
                                {v: 'Enduro', l: 'Batería Frío Extremo'}
                            ].map((b, i) => (
                                <div key={i} className="bg-[#111315] border border-neutral-800 p-6 min-w-[220px]">
                                    <div className="text-2xl text-white mb-2">{b.v}</div>
                                    <div className="text-xs text-yellow-500 tracking-[0.2em]">{b.l}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 5. EXPERT ACCORDIONS (Field Manual) */}
                <div className="max-w-5xl mx-auto px-4 py-32">
                    <h2 className="text-xl font-black text-yellow-500 uppercase tracking-[0.3em] mb-10 flex items-center gap-4">
                        <span className="w-10 h-1 bg-yellow-500 inline-block"></span>
                        Manual de Supervivencia
                    </h2>
                    <div className="space-y-4">
                        {[
                            { t: 'Lentes Hidrofóbicos Intercambiables', a: 'El agua y la nieve resbalan instantáneamente del cristal protector. Cero gotas arruinando tus tomas de surf o snowboard. Y si lo rompes contra una roca, lo giras, lo quitas y pones uno nuevo en 5 segundos.' },
                            { t: 'Bloqueo del Horizonte en 360°', a: 'Da tres giros completos en el aire con tu bicicleta. El horizonte de tu video permanecerá recto, firme y nivelado sin usar estabilizadores físicos (gimbals) externos.' },
                            { t: 'Grabación Retrospectiva (Hindsight)', a: '¿Te perdiste el truco porque no apretaste REC a tiempo? Hindsight graba continuamente pero borra. Si aprietas REC después del truco, empuja los últimos 30 segundos pasados al clip final.' }
                        ].map((ac, i) => (
                            <div key={i} className="bg-[#111315] border-l-4 border-neutral-800 hover:border-yellow-500 transition-colors">
                                <button className="w-full p-8 flex justify-between items-center text-left" onClick={() => setFaqOpen(faqOpen===i?null:i)}>
                                    <span className="text-lg font-black uppercase tracking-wide text-white">{ac.t}</span>
                                    <span className="text-yellow-500 font-bold font-mono text-xl">{faqOpen===i?'−':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {faqOpen === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-8 pb-8 text-neutral-400 font-medium leading-relaxed">
                                            {ac.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 6. ENDLESS MARQUEE (Caution Tape) */}
                <div className="w-[100vw] overflow-hidden py-4 bg-yellow-500 text-black flex transform relative left-[50%] -translate-x-[50%] font-black uppercase text-2xl tracking-tighter">
                    <div className="flex whitespace-nowrap pt-1">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="flex items-center gap-12 px-6">
                                <span>UNBREAKABLE HARDWARE</span>
                                <span className="transform rotate-45 text-4xl">///</span>
                                <span>CERO LÍMITES</span>
                                <span className="transform rotate-45 text-4xl">///</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 7. WHY TO USE / BENEFITS (Gritty Grid) */}
                <div className="max-w-7xl mx-auto px-4 py-32 border-b border-neutral-900">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                        <div>
                            <h2 className="text-5xl font-black text-white uppercase tracking-tighter mb-8 leading-[0.9]">El plástico no <br/><span className="text-neutral-600">resiste el impacto.</span></h2>
                            <p className="text-neutral-400 font-bold mb-12 text-lg">Acero, policarbonato endurecido y recubrimientos de goma balística. Los teléfonos se rompen en el manubrio de tu moto; esta cámara fue diseñada para ser atropellada.</p>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {[
                                    { t: 'Montajes Magnéticos', d: 'Engancha la cámara a tu pecho en 1 segundo.' },
                                    { t: 'Audio Direccional', d: 'Filtra el ruido del viento a 100km/h.' },
                                    { t: 'Control por Voz', d: '"¡Grabar Video!". Comandos para cuando tienes las manos ocupadas.' },
                                    { t: 'Pantalla Frontal LCD', d: 'Encuadra tus vlogs sin esfuerzo ciego.' }
                                ].map((b, i) => (
                                    <div key={i} className="bg-[#111315] p-6 border-b-2 border-neutral-800">
                                        <h4 className="text-yellow-500 font-black uppercase text-sm mb-2">{b.t}</h4>
                                        <p className="text-neutral-400 text-xs font-medium">{b.d}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-yellow-500/10 skew-x-[10deg] -z-10 transform translate-x-8"></div>
                            <div className="w-full h-full bg-[#111315] p-10 border border-neutral-800 flex flex-col justify-center">
                                <span className="text-8xl font-black text-neutral-900 absolute top-4 left-4 -z-0 select-none">RAW</span>
                                <div className="relative z-10">
                                    <h3 className="text-2xl font-black text-white uppercase mb-4">Captura en RAW + 10-Bit</h3>
                                    <p className="text-neutral-400 font-medium leading-relaxed">Más de mil millones de colores. Si te dedicas a la graduación de color en Davinci Resolve o Premiere, el perfil Logarítmico (Log) plano que entrega esta bestia óptica te dará el rango dinámico de una cámara de cine en el tamaño de una caja de fósforos.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 10. COMPARISON TABLE */}
                <div className="max-w-4xl mx-auto px-4 py-32">
                    <h2 className="text-4xl text-center font-black text-white uppercase tracking-tighter mb-16">Análisis Balístico</h2>
                    <div className="border border-neutral-800 bg-[#050607]">
                        <div className="grid grid-cols-3 bg-[#111315] text-[10px] uppercase font-black text-yellow-500 tracking-widest">
                            <div className="p-6">Sujeto Pruebas</div>
                            <div className="p-6 text-black bg-yellow-500 text-center">Nuestra Óptica Pro</div>
                            <div className="p-6 text-center border-l border-neutral-800">Cámaras Imitación Chinas</div>
                        </div>
                        {[
                            { k: 'Rango Visual', u: 'HiperView (Súper Gran Angular Inmersivo)', t: 'Gran Angular Plásticos Distorsionados' },
                            { k: 'Temperaturas Operativas', u: '-20°C a +50°C (Batería Química Enduro)', t: '0 a 30°C (Se apagan en la nieve)' },
                            { k: 'Nitidez a Velocidad', u: 'Acelerómetro Activo Anti-Borro', t: 'Un flan en el primer pozo' },
                            { k: 'Servicio Adquisitivo', u: 'Comprado Seguro x Pago en Puerta Local', t: 'Esperas eternas e impuestos de aduana' }
                        ].map((r, i) => (
                            <div key={i} className="grid grid-cols-3 border-t border-neutral-800 font-medium text-xs">
                                <div className="p-6 text-neutral-400">{r.k}</div>
                                <div className="p-6 font-black text-white bg-yellow-500/5 text-center">{r.u}</div>
                                <div className="p-6 text-neutral-600 text-center border-l border-neutral-800">{r.t}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 11. RISK REVERSAL WARRANTY (Tactical Trust) */}
                <div className="py-24 bg-yellow-500">
                    <div className="max-w-5xl mx-auto px-4 text-center">
                        <h3 className="text-5xl text-black font-black uppercase tracking-tighter mb-8 skew-x-[-5deg]">Extracción 100% Segura. C.O.D.</h3>
                        <p className="text-black font-bold text-xl max-w-3xl mx-auto leading-tight md:leading-normal mix-blend-multiply opacity-80">
                            Equipos de esta gama son faros para estafas en plataformas web comunes. Lo hemos resuelto al estilo miliar: nuestro transportista lleva la caja negra hasta tu localización por ruta terrestre; validas que la carga sea la tuya, nos pagas físicamente y finiquitas la transacción. El engaño se vuelve matemáticamente imposible.
                        </p>
                    </div>
                </div>

                {/* 13. FAQ */}
                <div className="max-w-4xl mx-auto px-4 py-32 border-b border-neutral-900">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl text-white font-black uppercase tracking-tighter">Buzón Táctico</h2>
                    </div>
                    <div className="grid gap-4">
                        {[
                            {q: '¿Puede hundirse en agua salada del mar?', a: 'Completamente apta para inmersiones oceánicas hasta 10 metros sin carcasa a presión externa. Recomendamos enjuagarla con agua dulce tras la inmersión por estética.'},
                            {q: '¿Cómo rinde de noche o en interiores?', a: 'Posee sensores CMOS de alta respuesta y modos IA de Fotografía Nocturna prolongada (Night Lapse) que traen estrellas al video incluso en la negrura total.'},
                            {q: '¿Cuál es el tiempo de despacho desde que pido?', a: 'Al llenar tus datos, entra y aprueba en nuestra central. Llevamos el equipo hasta tu puerta (usualmente entre de 24 a 48 hs dependiendo de tu municipio) y ahí nos pagas.'}
                        ].map((f, i) => (
                            <div key={i} className="bg-[#111315] border border-neutral-800">
                                <button onClick={() => setFaqOpen(faqOpen===i?null:i)} className="w-full px-8 py-6 text-left flex justify-between items-center text-white font-black text-sm uppercase tracking-wide">
                                    {f.q}
                                    <span className="text-yellow-500 font-bold">{faqOpen===i?'V':'<'}</span>
                                </button>
                                <AnimatePresence>
                                    {faqOpen === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-8 pb-6 text-neutral-400 font-medium text-sm leading-relaxed border-t border-neutral-800 pt-4">
                                            {f.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 14. EXPANDED REVIEWS */}
                <div className="py-24 bg-[#0a0a0b] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { r: "Cambiaron mi forma de grabar enduro. Puse el soporte en el casco de la moto y con barro, polvo y ramas no se hace ni media raya el lente. El pago al recibir me dio una paz increíble.", n: "Sebastián M.", t: "Motociclista" },
                                { r: "Las fotos raw que saca buceando son superiores a mi cámara DSLR. Aparte no necesito funda de plástico, la inmersión me funcionó perfecto. Buen modelo COD.", n: "Andrés V.", t: "Instructor de Buceo" },
                                { r: "El pedido fue genial, pedí por el formulario a la noche y al mediodía tocaron el timbre. Yo no pago nada por internet con tarjeta así que esto de dar cash en persona es lo mejor.", n: "Roberto G.", t: "Vlogger OffRoad" }
                            ].map((rev, i) => (
                                <div key={i} className="p-8 bg-[#111315]/90 backdrop-blur-md border border-neutral-800 relative z-10 shadow-xl">
                                    <div className="flex text-yellow-500 mb-6 gap-1">
                                        {[...Array(5)].map((_,star)=><svg key={star} width="16" height="16" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>)}
                                    </div>
                                    <p className="text-white font-medium text-sm mb-6 leading-relaxed">"{rev.r}"</p>
                                    <div className="border-t border-neutral-800 pt-4">
                                        <div className="text-neutral-500 font-bold uppercase tracking-widest text-[10px]">{rev.n}</div>
                                        <div className="text-yellow-600 font-bold uppercase text-[9px]">{rev.t}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 15. CHECKOUT (Rugged Log-in) */}
                <div id="checkout-action" className="py-24 md:py-32 relative">
                    <div className="absolute inset-0 bg-[#050607]"></div>
                    <div className="max-w-6xl mx-auto px-4 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        <div className="order-2 lg:order-1 bg-[#111315] p-8 lg:p-12 border-2 border-neutral-800 shadow-[20px_20px_0_theme(colors.yellow.500)]">
                            <h3 className="text-3xl font-black text-white uppercase tracking-tight mb-8">Orden de Operación Terrestre</h3>
                            
                            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                                <div>
                                    <label className="text-[10px] text-yellow-500 uppercase font-black tracking-widest mb-2 block">Identificación Oficial</label>
                                    <input type="text" className="w-full bg-[#090a0b] border border-neutral-800 text-white font-bold p-4 focus:border-yellow-500 outline-none transition-colors uppercase" placeholder="NOMBRE COMPLETO" />
                                </div>
                                <div>
                                    <label className="text-[10px] text-yellow-500 uppercase font-black tracking-widest mb-2 block">Línea de Enlace Activa</label>
                                    <input type="tel" className="w-full bg-[#090a0b] border border-neutral-800 text-white font-bold p-4 focus:border-yellow-500 outline-none transition-colors uppercase" placeholder="NÚMERO WHATSAPP" />
                                </div>
                                <div>
                                    <label className="text-[10px] text-yellow-500 uppercase font-black tracking-widest mb-2 block">Punto de Entrega / Domicilio</label>
                                    <textarea rows={2} className="w-full bg-[#090a0b] border border-neutral-800 text-white font-bold p-4 focus:border-yellow-500 outline-none transition-colors uppercase resize-none" placeholder="CALLE, NUMERO, CIUDAD"></textarea>
                                </div>
                                <div className="pt-6">
                                    <button className="w-full bg-yellow-500 text-black py-5 font-black uppercase tracking-widest text-lg md:text-xl skew-x-[-5deg] hover:bg-yellow-400 transition-colors">
                                        <span className="skew-x-[5deg] block">Cargar Despacho C.O.D.</span>
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className="order-1 lg:order-2">
                            <h2 className="text-5xl lg:text-5xl font-black text-white uppercase tracking-tighter mb-8 leading-tight">Que tu aventura <br/>no muera en el <br/><span className="text-yellow-500">Recuerdo.</span></h2>
                            <p className="text-neutral-400 font-bold mb-10 text-lg border-l-4 border-yellow-500 pl-4">Abastécete. Almacénalo en el carrito de logística. Entrega hoy si estás en nuestro rango capital. Pagas con dinero material cuando asientes tus manos en la óptica.</p>
                            
                            <div className="text-5xl font-black text-white">{fmtPrice(product.price)}</div>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
};

export default PdpActionCam;
