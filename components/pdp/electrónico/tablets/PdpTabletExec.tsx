'use client';
import React, { useState } from 'react';
import { StoreData, Product } from '@/lib/types';
import EnhancedProductGallery from '@/components/pdp/EnhancedProductGallery';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

interface Props { data: StoreData; product: Product; }

const PdpTabletExec: React.FC<Props> = ({ data, product }) => {
    const [faqOpen, setFaqOpen] = useState<number | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const ai = product.aiContent;
    const fmtPrice = (n: number) => { const s = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); return `Gs. ${s}`; };
    
    const accent = '#0071E3'; // Apple Blue
    const bg = '#FBFBFD';
    
    const { scrollYProgress } = useScroll();
    const heroY = useTransform(scrollYProgress, [0, 1], [0, -300]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

    return (
        <div style={{ background: bg, color: '#1D1D1F', fontFamily: "system-ui, -apple-system, sans-serif" }} className="overflow-x-hidden selection:bg-blue-500/20 antialiased">
            
            {/* 0. AMBIENT GLOW */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <motion.div 
                    animate={{ rotate: 360, scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="absolute top-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full blur-[100px]" 
                    style={{ background: `radial-gradient(circle, ${accent} 0%, transparent 70%)` }} 
                />
            </div>

            {/* 1. HEADER */}
            <header className="fixed top-0 w-full z-50 bg-[#FBFBFD]/80 backdrop-blur-xl border-b border-black/[0.04]">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
                    <span className="text-sm font-semibold tracking-wide text-black">Slates<span className="text-blue-600">Pro</span></span>
                    <nav className="hidden lg:flex gap-8">
                        {['Vision', 'Rendimiento', 'Reseñas'].map((item) => (
                            <a key={item} href={`#${item.toLowerCase()}`} className="text-xs font-medium text-neutral-500 hover:text-black transition-colors">
                                {item}
                            </a>
                        ))}
                    </nav>
                    <div className="flex items-center gap-4">
                        <button className="text-xs bg-blue-600 text-white px-4 py-1.5 rounded-full font-semibold hover:bg-blue-700 transition" onClick={() => document.getElementById('checkout-tab')?.scrollIntoView({ behavior: 'smooth' })}>
                            Comprar
                        </button>
                    </div>
                </div>
            </header>

            <main className="relative z-10 pt-32">
                
                {/* 2. HERO */}
                <motion.div style={{ y: heroY, opacity: heroOpacity }} className="text-center pb-10 px-6 max-w-5xl mx-auto">
                    <h1 className="text-6xl md:text-[7rem] font-bold tracking-tight leading-[0.95] text-black mb-6">
                        Súper potente. <br className="hidden md:block"/> Súper portátil.
                    </h1>
                    <p className="text-xl md:text-2xl text-neutral-500 font-medium tracking-tight mb-8">
                        {ai?.enhancedDescription || product.description || 'El chip más avanzado. Pantalla Retina líquida que desafía la realidad. Es tu próxima computadora en formato mágico.'}
                    </p>
                    <div className="text-3xl font-semibold mb-2">{fmtPrice(product.price)}</div>
                    {product.originalPrice && <div className="text-sm text-neutral-400 line-through mb-8">Antes {fmtPrice(product.originalPrice)}</div>}
                </motion.div>

                {/* PRODUCT FLOAT */}
                <div className="max-w-5xl mx-auto px-6 relative z-20 -mt-8">
                    <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="rounded-3xl overflow-hidden bg-white shadow-[0_20px_40px_-20px_rgba(0,0,0,0.1)] border border-neutral-100 p-2">
                        <EnhancedProductGallery product={product} accentColor={accent} />
                    </motion.div>
                </div>

                {/* 3. ENDLESS TEXT BARS */}
                <div className="w-[100vw] overflow-hidden py-6 bg-white border-y border-neutral-200 mt-20 relative left-[50%] -translate-x-[50%]">
                    <div className="flex whitespace-nowrap animate-marquee-fast">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="flex items-center gap-16 px-8">
                                <span className="text-2xl font-bold tracking-tight text-neutral-300">XDR DISPLAY</span>
                                <span className="text-2xl font-bold tracking-tight text-blue-500">M-CLASS CHIP</span>
                                <span className="text-2xl font-bold tracking-tight text-neutral-300">APPLE PENCIL SUPPORT</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 4. BENEFITS (GLASSMORPHISM) */}
                <div id="vision" className="max-w-7xl mx-auto px-6 py-32">
                    <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-6xl font-semibold tracking-tight text-center mb-20">El futuro en tus manos.</motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { title: 'Pantalla ProMotion.', desc: 'Tasa de actualización adaptable a 120Hz. Fluidez extrema.', bg: 'bg-white', text: 'text-black' },
                            { title: 'Multitarea Extrema.', desc: 'Poder de escritorio en 6 milímetros. Renderiza videos 4K al instante.', bg: 'bg-[#1D1D1F]', text: 'text-white' },
                            { title: 'Centro Móvil.', desc: 'Wi-Fi 6E ultra rápido, cámaras web panorámicas integradas.', bg: 'bg-gradient-to-br from-blue-500 to-indigo-600', text: 'text-white' },
                        ].map((b, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, ease: 'easeOut' }} className={`rounded-[2.5rem] p-10 ${b.bg} ${b.text} shadow-sm border ${i===0?'border-neutral-200':'border-transparent'} relative overflow-hidden group hover:scale-[1.02] transition-transform duration-500`}>
                                <h3 className="text-3xl font-semibold tracking-tight mb-4 pr-10">{b.title}</h3>
                                <p className={`text-lg font-medium ${i===0?'text-neutral-500':'text-white/80'} leading-relaxed`}>{b.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* 5. SETUP (TUTORIAL) */}
                <div className="py-32 bg-white border-y border-neutral-100">
                    <div className="max-w-7xl mx-auto px-6 text-center">
                        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-20">Tan fácil como pensarlo.</h2>
                        <div className="flex flex-col md:flex-row gap-12 justify-center">
                            {[
                                { step: '1', title: 'Enciende', desc: 'Presiona el botón superior y el sistema te guiará en segundos.' },
                                { step: '2', title: 'Sincroniza', desc: 'Acerca tu smartphone y transfiere todas tus cuentas automáticamente.' },
                                { step: '3', title: 'Crea', desc: 'Abre tus aplicaciones y experimenta una velocidad nunca antes vista.' }
                            ].map((s, i) => (
                                <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="flex-1 bg-[#F5F5F7] p-10 rounded-[2rem]">
                                    <div className="text-6xl font-black text-white drop-shadow-[0_4px_10px_rgba(0,113,227,0.3)] mb-6">{s.step}</div>
                                    <h4 className="text-2xl font-semibold tracking-tight text-neutral-900 mb-3">{s.title}</h4>
                                    <p className="text-neutral-500 font-medium text-lg leading-relaxed">{s.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 6. US VS THEM */}
                <div className="py-32 max-w-5xl mx-auto px-6">
                    <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-center mb-16">¿Por qué cambiarte?</h2>
                    <div className="bg-white rounded-[2rem] border border-neutral-200 overflow-hidden shadow-sm">
                        <div className="flex bg-[#F5F5F7] p-8 border-b border-neutral-200">
                            <div className="flex-1 text-[11px] font-bold uppercase tracking-widest text-neutral-400">Comparativa</div>
                            <div className="flex-1 text-[11px] font-bold uppercase tracking-widest text-blue-600 text-center">Nueva Pro</div>
                            <div className="flex-1 text-[11px] font-bold uppercase tracking-widest text-neutral-400 text-center">Standard Tablet</div>
                        </div>
                        {[
                            { k: 'Rendimiento Chip', u: 'Procesador Grado Desktop (8 Core)', t: 'Procesador Mobile Limitado' },
                            { k: 'Pantalla', u: 'Liquid Retina XDR', t: 'LCD genérico' },
                            { k: 'Puerto', u: 'Thunderbolt 4 / USB 4', t: 'USB-C Lento' },
                            { k: 'Seguridad', u: 'Identidad Facial 3D', t: 'Pin o Huella básica' }
                        ].map((r, i) => (
                            <div key={i} className="flex p-8 border-b border-neutral-100 items-center">
                                <div className="flex-1 font-semibold text-neutral-900">{r.k}</div>
                                <div className="flex-1 text-center font-bold text-black">{r.u}</div>
                                <div className="flex-1 text-center font-medium text-neutral-400 line-through">{r.t}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 7. TECH SPECS */}
                <div id="rendimiento" className="py-32 bg-white border-y border-neutral-100">
                    <div className="max-w-4xl mx-auto px-6">
                        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-center mb-20 text-black">El detalle hace la diferencia.</h2>
                        <div className="space-y-4">
                            {[
                                { k: 'Procesador', v: 'Chip de 8 Núcleos Arquitectura M-Class' },
                                { k: 'Pantalla', v: 'Liquid Retina XDR, P3 True Tone, 1000 nits' },
                                { k: 'Conexión', v: 'Wi-Fi 6E (802.11ax) ultrarrápido y Bluetooth 5.3' },
                                { k: 'Cámaras', v: '12 MP Gran Angular y Ultra Gran Angular + LiDAR' },
                                { k: 'Autonomía', v: 'Batería de polímero de litio, hasta 10 horas' },
                            ].map((spec, i) => (
                                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="flex flex-col md:flex-row justify-between py-8 border-b border-neutral-100">
                                    <span className="text-xl md:text-2xl font-semibold text-neutral-900 mb-2 md:mb-0">{spec.k}</span>
                                    <span className="text-lg md:text-xl font-medium text-neutral-500 max-w-md md:text-right">{spec.v}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 8. REVIEWS UGC */}
                <div id="reseñas" className="max-w-7xl mx-auto px-6 py-32">
                    <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-center mb-20">Validada por la crítica.</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            { name: 'M. Marques', role: 'Tech Reviewer', r: 'La pantalla XDR hace que cualquier otro dispositivo se vea apagado. El contraste y el brillo son irreales para este formato.' },
                            { name: 'Sarah L.', role: 'Arquitecta', r: 'Poder renderizar modelos pesados fuera de mi oficina estática cambió mi manera de trabajar. Es ligera pero monstruosa por dentro.' },
                            { name: 'Juan D.', role: 'Estudiante', r: 'La batería es ridícula. Me paso todo el día en el campus tomando notas y editando gráficos sin tocar el cargador.' },
                            { name: 'Elena C.', role: 'Diseñadora Digital', r: 'La latencia con el lápiz es nula. Sientes que estás dibujando sobre papel fino. Una experiencia superior.' }
                        ].map((rev, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-10 rounded-[2rem] bg-white border border-neutral-100 shadow-sm">
                                <div className="flex gap-1 text-blue-500 mb-6">
                                    {[1,2,3,4,5].map(star=><svg key={star} width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
                                </div>
                                <p className="text-xl font-medium text-neutral-800 tracking-tight leading-relaxed mb-8">"{rev.r}"</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-neutral-100 rounded-full"></div>
                                    <div>
                                        <div className="font-semibold text-neutral-900">{rev.name}</div>
                                        <div className="text-sm font-medium text-neutral-500">{rev.role}</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* 9. BRAND MISSION */}
                <div className="py-32 bg-[#1D1D1F] text-white text-center">
                    <div className="max-w-3xl mx-auto px-6">
                        <h3 className="text-4xl lg:text-6xl font-semibold tracking-tight mb-8">Nuestra Visión.</h3>
                        <p className="text-xl lg:text-3xl font-medium text-neutral-400 leading-snug tracking-tight">Creemos firmemente en diluir las barreras creativas. Esta herramienta no fue construida para consumir contenido, fue diseñada desde cero <span className="text-white">para que lo crees.</span></p>
                    </div>
                </div>

                {/* 10. WARRANTY */}
                <div className="max-w-4xl mx-auto px-6 py-20">
                    <div className="flex flex-col md:flex-row items-center gap-12 bg-white rounded-[2.5rem] p-12 border border-neutral-200 shadow-xl">
                        <div className="w-32 h-32 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0 shadow-inner">
                            <span className="font-bold text-3xl text-blue-600 block">CARE+</span>
                        </div>
                        <div>
                            <h3 className="text-3xl font-semibold tracking-tight text-neutral-900 mb-4">Garantía Total Extendida.</h3>
                            <p className="text-lg font-medium text-neutral-500 leading-relaxed">Paga cuando recibas. Si el rendimiento no supera con creces cualquier tablet que hayas usado en el pasado, procesamos un retorno sin fricción. No hay letras pequeñas, solo soporte inmediato.</p>
                        </div>
                    </div>
                </div>

                {/* 11. FAQ */}
                <div className="max-w-3xl mx-auto px-6 py-20 border-t border-neutral-200 mb-20">
                    <h2 className="text-4xl font-semibold tracking-tight text-center mb-16">Preguntas habituales.</h2>
                    <div className="space-y-4">
                        {[
                            { q: '¿Es mi información segura?', a: 'Completamente. Utilizamos tecnología de reconocimiento facial procesada localmente. Nada va a la nube, tu identidad permanece tuya.' },
                            { q: '¿Cuándo se me cobra la funda o el lápiz si lo elijo?', a: 'Hoy no pagas nada. Solo completas el formulario y realizarás el pago físicamente en efectivo o tarjeta a tu mensajero al momento de recibir.' },
                            { q: '¿Tiene soporte internacional de reparación?', a: 'Sí. Todos nuestros dispositivos vienen con la cobertura base internacional de 1 año.' }
                        ].map((f, i) => (
                            <div key={i} className="border-b border-neutral-200 bg-white">
                                <button onClick={() => setFaqOpen(faqOpen===i?null:i)} className="w-full text-left py-6 flex items-center justify-between font-semibold text-lg text-neutral-900">
                                    {f.q}
                                    <span className="text-blue-500 text-2xl font-light">{faqOpen===i?'-':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {faqOpen === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="pb-6 text-base font-medium text-neutral-500 leading-relaxed pr-8">
                                            {f.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 12. CHECKOUT FORM */}
                <div id="checkout-tab" className="py-32 px-6 bg-white border-t border-neutral-200">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto rounded-[2.5rem] bg-[#F5F5F7] p-10 md:p-14 border border-neutral-200">
                        <div className="text-center mb-12">
                            <h3 className="text-4xl font-semibold tracking-tight text-neutral-900">Compra directa y segura.</h3>
                            <p className="text-lg text-neutral-500 mt-2 font-medium">Paga directamente al mensajero cuando lo recibas. Sin sorpresas.</p>
                        </div>
                        <form className="space-y-5" onSubmit={e => e.preventDefault()}>
                            <div className="relative">
                                <input type="text" className="w-full px-6 py-5 rounded-2xl bg-white border border-neutral-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-shadow text-[17px] font-medium placeholder-neutral-400 text-neutral-900" placeholder="Nombre completo" />
                            </div>
                            <div className="relative">
                                <input type="tel" className="w-full px-6 py-5 rounded-2xl bg-white border border-neutral-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-shadow text-[17px] font-medium placeholder-neutral-400 text-neutral-900" placeholder="Teléfono Móvil" />
                            </div>
                            <div className="relative">
                                <textarea rows={2} className="w-full px-6 py-5 rounded-2xl bg-white border border-neutral-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-shadow text-[17px] font-medium placeholder-neutral-400 resize-none text-neutral-900" placeholder="Dirección Postal Completa" />
                            </div>
                            <button className="w-full h-[72px] rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[19px] transition-colors mt-6 shadow-[0_10px_20px_rgba(0,113,227,0.2)] hover:shadow-xl">
                                Confirmar Pedido y Pagar al Recibir
                            </button>
                            <p className="text-center text-sm font-semibold text-neutral-400 mt-6 pt-6 border-t border-neutral-200">Envío Asegurado 100% Gratuito en la capital.</p>
                        </form>
                    </motion.div>
                </div>

            </main>

            {/* STICKY MOBILE */}
            <div className="md:hidden fixed bottom-6 left-4 right-4 z-50">
                <div className="bg-[#FBFBFD]/90 backdrop-blur-xl rounded-[2rem] p-4 flex items-center justify-between border border-neutral-200 shadow-2xl">
                    <div className="pl-3">
                        <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Total a pagar</div>
                        <div className="font-semibold text-lg text-black">{fmtPrice(product.price)}</div>
                    </div>
                    <button onClick={() => document.getElementById('checkout-tab')?.scrollIntoView({ behavior: 'smooth' })} className="px-6 py-3 rounded-full font-semibold text-sm bg-blue-600 text-white">
                        Comprar
                    </button>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{__html: `
                @keyframes marquee-fast { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
                .animate-marquee-fast { animation: marquee-fast 10s linear infinite; }
            `}} />
        </div>
    );
};

export default PdpTabletExec;
