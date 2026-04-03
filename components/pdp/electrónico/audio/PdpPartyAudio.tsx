'use client';
import React, { useState } from 'react';
import { StoreData, Product } from '@/lib/types';
import EnhancedProductGallery from '@/components/pdp/EnhancedProductGallery';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { data: StoreData; product: Product; }

const PdpPartyAudio: React.FC<Props> = ({ data, product }) => {
    const [faqOpen, setFaqOpen] = useState<number | null>(null);
    const ai = product.aiContent;
    const fmtPrice = (n: number) => { const s = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); return `Gs. ${s}`; };

    // Estética "Club Vibe": Intense contrasts, orange/red neon, super bold fonts
    const bg = '#0a0000'; // Very dark red/black
    const textMain = '#f8fafc'; // Slate 50
    const accent = '#ea580c'; // Orange 600

    return (
        <div style={{ background: bg, color: textMain }} className="font-sans antialiased overflow-x-hidden selection:bg-orange-600 selection:text-white">
            
            {/* Bass / Pulse Ambient Background */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center opacity-30">
                <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.4, 0.1] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }} className="absolute w-[80vh] h-[80vh] rounded-full bg-orange-600/20 blur-[150px]"></motion.div>
                <div className="absolute top-1/4 left-0 w-[400px] h-[400px] rounded-full bg-red-600/10 blur-[120px]"></div>
                <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] rounded-full bg-rose-600/10 blur-[120px]"></div>
            </div>

            {/* 1. TOP NAV (Loud Minimalist) */}
            <header className="sticky top-0 z-50 bg-[#0a0000]/90 backdrop-blur-3xl border-b border-orange-500/20">
                <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
                    <div className="text-2xl font-black italic tracking-tighter text-white uppercase flex items-center gap-2">
                        NOISE<span className="text-orange-500">MAKER</span>
                    </div>
                </div>
            </header>

            <main className="relative z-10 w-full overflow-hidden">
                {/* 2. BREADCRUMBS & LOGISTICS */}
                <div className="max-w-7xl mx-auto px-4 pt-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="text-xs uppercase tracking-[0.3em] font-bold text-neutral-500 flex items-center gap-2">
                            <span className="w-8 h-[2px] bg-orange-600 block"></span>
                            AUDIO <span className="text-white">/ EXTREMO</span>
                        </div>
                        <div className="inline-block bg-orange-600 text-white font-black text-[10px] uppercase tracking-widest px-4 py-2 skew-x-[-10deg]">
                            <span className="skew-x-[10deg] block">ENTREGA C.O.D. DISPONIBLE</span>
                        </div>
                    </div>
                </div>

                {/* 3. HERO (LOUD TYPOGRAPHY) */}
                <div className="max-w-7xl mx-auto px-4 py-16 lg:py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="relative z-20 order-2 lg:order-1">
                            <h1 className="text-7xl lg:text-8xl xl:text-9xl font-black text-white mb-6 uppercase tracking-tighter leading-[0.9] drop-shadow-[0_0_30px_rgba(234,88,12,0.3)]">
                                {ai?.enhancedTitle || product.title}
                            </h1>
                            <p className="text-xl md:text-2xl text-neutral-400 mb-12 font-bold uppercase tracking-tight max-w-lg">
                                {ai?.enhancedDescription || product.description || 'Haz temblar las paredes. 800 Vatios de Potencia RMS, Show de Luces Rítmicas y Cero Distorsión al máximo volumen.'}
                            </p>
                            
                            <div className="bg-[#140505] border-[3px] border-orange-600/30 p-8 transform -skew-x-2 relative group hover:border-orange-500 transition-colors">
                                <div className="flex items-end gap-6 mb-8 transform skew-x-2">
                                    <span className="text-6xl font-black text-white tracking-tighter">{fmtPrice(product.price)}</span>
                                    {product.originalPrice && <span className="text-2xl text-neutral-600 font-bold line-through pb-2 decoration-red-600">{fmtPrice(product.originalPrice)}</span>}
                                </div>
                                <button onClick={() => document.getElementById('checkout-loud')?.scrollIntoView({ behavior: 'smooth' })} className="w-full bg-white text-black py-6 text-xl font-black uppercase tracking-widest hover:bg-orange-500 hover:text-white transition-all transform skew-x-2">
                                    Pedir Ahora & Pagar Al Recibir
                                </button>
                            </div>
                        </div>

                        <div className="w-full relative flex items-center justify-center order-1 lg:order-2">
                            {/* Graphic equalizer bars behind gallery */}
                            <div className="absolute inset-0 flex items-end justify-center gap-2 opacity-20 pb-20 pointer-events-none z-0">
                                {[...Array(15)].map((_,i) => <motion.div key={i} animate={{ height: [20, Math.random()*200+50, 20] }} transition={{ duration: 0.5+Math.random(), repeat: Infinity }} className="w-4 bg-orange-500"></motion.div>)}
                            </div>
                            <div className="relative z-10 w-full shadow-[0_0_100px_rgba(234,88,12,0.15)] ring-1 ring-orange-500/20 rounded-3xl overflow-hidden p-2 bg-gradient-to-b from-[#1a0505] to-black">
                                <EnhancedProductGallery product={product} accentColor={accent} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. TRUST BADGES TECHNICAL (Specs Loud) */}
                <div className="border-y border-orange-600/20 bg-orange-950/20">
                    <div className="max-w-7xl mx-auto px-4 py-16">
                        <div className="flex flex-wrap items-center justify-center lg:justify-between gap-12 font-black italic uppercase tracking-tighter text-4xl lg:text-5xl text-neutral-800">
                            {[
                                {v: '800W', l: 'RMS'},
                                {v: 'Bass', l: 'Boost'},
                                {v: 'IPX4', l: 'Splash'},
                                {v: 'LED', l: 'Sync'}
                            ].map((b, i) => (
                                <div key={i} className="flex gap-4 items-baseline">
                                    <span className="text-white drop-shadow-[0_0_15px_rgba(234,88,12,0.5)]">{b.v}</span>
                                    <span className="text-xl text-orange-600">{b.l}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 5. EXPERT ACCORDIONS */}
                <div className="max-w-4xl mx-auto px-4 py-32">
                    <h2 className="text-4xl font-black text-white uppercase tracking-tighter mb-12 border-b-4 border-orange-600 pb-4 inline-block">Ingeniería Acústica</h2>
                    <div className="space-y-4">
                        {[
                            { t: 'Subwoofers de Excursión Larga', a: 'Dos conos gemelos gigantes que mueven una cantidad de aire brutal. Sentirás los bajos golpeando tu pecho físicamente sin distorsionar los agudos de la voz vocal.' },
                            { t: 'Show Lumínico Estroboscópico', a: 'No es solo música. El anillo LED frontal y los estrobos laterales se sincronizan algorítmicamente con el beat de la canción. Tú pones la pista, el parlante pone el club.' },
                            { t: 'True Wireless Stereo (TWS)', a: '¿No te basta con uno? Puedes emparejar dos torres de forma totalmente inalámbrica para crear un sonido estéreo colosal que cubriría un estadio pequeño.' }
                        ].map((ac, i) => (
                            <div key={i} className="bg-[#0f0000] border-2 border-neutral-900 overflow-hidden transform transition-all hover:border-orange-900/50">
                                <button className="w-full p-8 flex justify-between items-center text-left" onClick={() => setFaqOpen(faqOpen===i?null:i)}>
                                    <span className="text-xl font-bold uppercase tracking-tight text-white">{ac.t}</span>
                                    <motion.span animate={{ rotate: faqOpen===i ? 45 : 0 }} className="text-3xl text-orange-600 font-light">+</motion.span>
                                </button>
                                <AnimatePresence>
                                    {faqOpen === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-8 pb-8 text-neutral-400 font-medium text-base leading-relaxed">
                                            {ac.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 6. ENDLESS MARQUEE (Giant Text) */}
                <div className="w-[100vw] overflow-hidden py-4 bg-orange-600 flex transform relative left-[50%] -translate-x-[50%]">
                    <div className="flex whitespace-nowrap font-black text-[120px] text-black tracking-tighter uppercase leading-none opacity-80 mix-blend-multiply">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="flex items-center gap-12 px-6">
                                <span>MÁS FUERTE</span>
                                <span>•</span>
                                <span>MÁS BAJOS</span>
                                <span>•</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 7. WHY TO USE / BENEFITS (High Contrast) */}
                <div className="max-w-7xl mx-auto px-4 py-40 border-b-2 border-neutral-900">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-end">
                        <div>
                            <span className="text-orange-500 font-black tracking-[0.3em] mb-4 block">DOMINIO TOTAL</span>
                            <h2 className="text-6xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-10">Cualquier parlante Bluetooth Suena.<br/><span className="text-neutral-700">Este Hace Ruido.</span></h2>
                            <p className="text-2xl text-neutral-400 font-bold tracking-tight mb-12">Ruedas resistentes integradas y manija telescópica. Lo llevas del living a la piscina sin sudar, y una vez que lo enciendes, la fiesta empieza oficialmente.</p>
                            
                            <ul className="space-y-6">
                                {[
                                    { t: 'Panel Dj Superior', d: 'Botones iluminados de pads de efectos para añadir bocinas, rasgueos e iluminar el ambiente.' },
                                    { t: 'Entradas Mic/Guitarra', d: 'Conecta tu guitarra eléctrica o micrófono. Afina el volumen y organiza un recital en vivo en segundos.' }
                                ].map((b, i) => (
                                    <li key={i} className="flex items-start gap-6 border-l-4 border-orange-600 pl-6">
                                        <div>
                                            <h4 className="text-white font-black text-xl uppercase tracking-tight mb-2">{b.t}</h4>
                                            <p className="text-neutral-400 font-medium">{b.d}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-neutral-900 p-10 transform translate-y-10 border-4 border-black shadow-[20px_20px_0_theme(colors.orange.600)]">
                            <div className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-neutral-800 to-black uppercase tracking-tighter opacity-50 absolute -top-10 -right-4">IPX4</div>
                            <h3 className="text-3xl text-white font-black uppercase tracking-tight mb-4 relative z-10">¿Lluvia? ¿Cerveza Derramada?</h3>
                            <p className="text-neutral-400 font-medium relative z-10">Diseñado con plásticos balísticos y cobertura IPX4. Este equipo sobrevive tormentas de verano y fiestas descontroladas contiguas a tu piscina.</p>
                        </div>
                    </div>
                </div>

                {/* 8. HOW TO USE / SET UP AESTHETIC */}
                <div className="py-32 bg-[#050000]">
                    <div className="max-w-6xl mx-auto px-4">
                        <h2 className="text-5xl text-white font-black uppercase tracking-tighter text-center mb-24">Encendido Extremo</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
                            {[
                                { n: 'P1', s: 'Conexión Bruta', d: 'Enchufa el cable de poder industrial a la pared.' },
                                { n: 'P2', s: 'Emparejamiento', d: 'Activa Bluetooth. Busca "Party Dominator" en tu celular.' },
                                { n: 'P3', s: 'Explosión', d: 'Presiona "Bass Boost" nivel 2 y aléjate al menos un metro.' }
                            ].map((s, i) => (
                                <div key={i} className="group">
                                    <div className="w-24 h-24 mx-auto bg-neutral-900 flex items-center justify-center rounded-2xl transform rotate-45 mb-10 group-hover:bg-orange-600 transition-colors">
                                        <span className="text-3xl text-white font-black uppercase tracking-tighter -rotate-45 block">{s.n}</span>
                                    </div>
                                    <h4 className="text-while font-black text-2xl uppercase tracking-tight mb-4 text-white">{s.s}</h4>
                                    <p className="text-neutral-400 font-medium">{s.d}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 10. COMPARISON TABLE (High Impact) */}
                <div className="max-w-5xl mx-auto px-4 py-32">
                    <div className="border-4 border-neutral-900 bg-[#0a0000]">
                        <div className="grid grid-cols-3 bg-neutral-900/50 text-sm uppercase tracking-widest font-black text-orange-500">
                            <div className="p-6 md:p-10">Métrica</div>
                            <div className="p-6 md:p-10 text-white border-x-4 border-neutral-900 bg-orange-950/20 text-center">Nuestra Torre</div>
                            <div className="p-6 md:p-10 text-center text-neutral-600">Torres Antiguas</div>
                        </div>
                        {[
                            { k: 'Graves Reales', u: 'Doble Woofer Dinámico', t: 'Cartón Barato' },
                            { k: 'Luces', u: 'Estroboscópicas / RGB Rítmico', t: 'Luces fijas sin ritmo' },
                            { k: 'Conexión', u: 'Bluetooth 5.1 Cero Lag', t: 'Bluetooth 4.0 (Cortocircuitos)' },
                            { k: 'Adquisición', u: 'C.O.D. en puerta 100% Seguro', t: 'Riesgo online' }
                        ].map((r, i) => (
                            <div key={i} className="grid grid-cols-3 border-t-2 border-neutral-900 font-bold text-base">
                                <div className="p-6 md:p-10 text-neutral-400">{r.k}</div>
                                <div className="p-6 md:p-10 text-white text-center border-x-4 border-neutral-900 bg-orange-950/10">{r.u}</div>
                                <div className="p-6 md:p-10 text-neutral-700 text-center line-through">{r.t}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 11. RISK REVERSAL WARRANTY (Loud Trust) */}
                <div className="py-24 bg-orange-600 text-black">
                    <div className="max-w-4xl mx-auto px-4 text-center">
                        <h3 className="text-5xl font-black uppercase tracking-tighter mb-8">Pago Contra Entrega (C.O.D)</h3>
                        <p className="text-2xl font-bold leading-tight mix-blend-multiply opacity-80">
                            Equipos tan potentes y caros no se pagan en un formulario web dudoso. Llenas el folleto abajo, nuestro flete te lleva la caja GIGANTE a tu casa, la desembalas, te sorprendes, y nos pagas en ese exacto instante. Cero estafas. Sonido puro.
                        </p>
                    </div>
                </div>

                {/* 12. BRAND ETHOS */}
                <div className="py-32 text-center px-4">
                    <h3 className="text-3xl text-white font-black uppercase tracking-tight mb-6">El Monopolio del Ruido.</h3>
                    <p className="text-neutral-500 font-bold text-xl max-w-2xl mx-auto">Importamos directamente tecnología sónica diseñada para romper el silencio. Tu barrio completo lo va a saber.</p>
                </div>

                {/* 13. FAQ */}
                <div className="max-w-4xl mx-auto px-4 py-24 border-t-2 border-neutral-900">
                    <h2 className="text-4xl text-white font-black uppercase tracking-tighter mb-16 text-center">Interrogatorio Frecuente</h2>
                    <div className="space-y-6">
                        {[
                            {q: '¿Se puede usar conectado siempre o usa batería?', a: 'Este monstruo está diseñado para usar conectado directamente a tensión 220v para poder brindar la bestial cantidad de 800W reales continuos.'},
                            {q: '¿Puede romper los vidrios de mi casa?', a: 'Honestamente a volumen máximo en un lugar totalmente cerrado genera altísima presión acústica. Recomendamos precaución si tienes ventanas de cristal simple.'},
                            {q: 'No entiendo el C.O.D, ¿No requiere tarjeta?', a: '¡NO! Es cero tarjetas. Pides abajo, llamamos para validar qué día estás en casa, te lo llevamos. Abonas en EFECTIVO o TRANSFERENCIA al repartidor en persona.'}
                        ].map((f, i) => (
                            <div key={i} className="bg-neutral-900 border-l-8 border-neutral-800 hover:border-orange-600 transition-colors">
                                <button onClick={() => setFaqOpen(faqOpen===i?null:i)} className="w-full p-8 text-left flex justify-between items-center text-white uppercase font-black tracking-tight text-lg">
                                    {f.q}
                                    <span className="text-orange-600 font-bold text-2xl">{faqOpen===i?'-':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {faqOpen === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-8 pb-8 text-neutral-400 font-medium text-base">
                                            {f.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 14. EXPANDED REVIEWS */}
                <div className="py-32 bg-[#050000]">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { r: "Llamaron a la policía la primera noche que lo probé al 60% de volumen. Es una LOCURA absoluta la cantidad de graves que escupe. Genial el pago en puerta.", n: "Rodrigo B.", t: "DJ Amateur" },
                                { r: "Pesa muchísimo, pero las ruedas salvan todo. Lo saqué al patio y los 800 vatios cubrieron al aire libre sin esfuerzo. Compra C.O.D segura y confiable.", n: "Tomas R.", t: "Cliente" },
                                { r: "Buscaba algo para el bar, puse uno en la esquina y me sobró sonido para 150 personas. Brutal. Llegó sellado y pagué al contado ahí mismo.", n: "Gabriel H.", t: "Dueño de Pub" }
                            ].map((rev, i) => (
                                <div key={i} className="p-10 border-4 border-neutral-900 relative">
                                    <div className="text-orange-900 font-black text-8xl absolute top-4 left-6 leading-none select-none">"</div>
                                    <p className="text-white font-bold text-lg mb-8 relative z-10 pt-10">"{rev.r}"</p>
                                    <div className="text-orange-500 uppercase font-black text-sm tracking-widest">{rev.n}</div>
                                    <div className="text-neutral-600 font-bold uppercase text-xs">{rev.t}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 15. CHECKOUT (Loud & Aggressive) */}
                <div id="checkout-loud" className="py-32 bg-neutral-900 relative">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=2000')] bg-cover bg-center mix-blend-overlay opacity-10"></div>
                    
                    <div className="max-w-6xl mx-auto px-4 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <div className="inline-block bg-orange-600 text-black font-black uppercase px-4 py-2 text-sm mb-8">INVENTARIO LIMITADO</div>
                            <h2 className="text-6xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-[0.9] uppercase">Reclama <br/>La Bestia.</h2>
                            <p className="text-2xl text-neutral-400 font-bold mb-10">Genera la órden. El correo te lleva esta monstruosidad a tu hogar hoy mismo. Pagas en efectivo o QR a quien te entregue la caja.</p>
                            
                            <div className="text-6xl font-black text-white">{fmtPrice(product.price)}</div>
                        </div>
                        
                        <div className="bg-[#050000] border-4 border-orange-600 p-8 md:p-12 shadow-[0_0_50px_rgba(234,88,12,0.3)]">
                            <h3 className="text-3xl text-white font-black uppercase tracking-tighter mb-8">Boleta de Despacho</h3>
                            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                                <div>
                                    <input type="text" placeholder="NOMBRE COMPLETO" className="w-full bg-transparent border-b-4 border-neutral-800 text-white font-black outline-none py-4 px-2 focus:border-orange-500 transition-colors uppercase placeholder:text-neutral-700" />
                                </div>
                                <div>
                                    <input type="tel" placeholder="NÚMERO DE WHATSAPP" className="w-full bg-transparent border-b-4 border-neutral-800 text-white font-black outline-none py-4 px-2 focus:border-orange-500 transition-colors uppercase placeholder:text-neutral-700" />
                                </div>
                                <div>
                                    <textarea rows={2} placeholder="DIRECCIÓN DE LA FIESTA (DOMICILIO)" className="w-full bg-transparent border-b-4 border-neutral-800 text-white font-black outline-none py-4 px-2 focus:border-orange-500 transition-colors uppercase placeholder:text-neutral-700 resize-none"></textarea>
                                </div>
                                <div className="pt-8">
                                    <button className="w-full bg-white text-black font-black uppercase tracking-widest text-xl py-6 hover:bg-orange-500 hover:text-white transition-colors">
                                        ENVIAR MI EQUIPO
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

export default PdpPartyAudio;
