'use client';
import React, { useState, useEffect } from 'react';
import { StoreData, Product } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';
import EnhancedProductGallery from '@/components/pdp/EnhancedProductGallery';

interface PdpPremiumElectronicsProps {
    data: StoreData;
    product: Product;
}

const PdpPremiumElectronics: React.FC<PdpPremiumElectronicsProps> = ({ data, product }) => {
    const [faqOpen, setFaqOpen] = useState<number | null>(0);
    const [viewers, setViewers] = useState(63);
    const ai = product.aiContent;
    const sec = ai?.sections;
    const fmtPrice = (n: number) => {
      const str = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      return `Gs. ${str}`;
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setViewers(Math.floor(Math.random() * (78 - 55 + 1) + 55));
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-[#050510] text-[#E0E0FF] font-sans selection:bg-cyan-500/30 overflow-x-hidden">
            {/* SECTION 1: Header + Live Viewers */}
            <header className="py-5 px-8 flex justify-between items-center border-b border-white/5 backdrop-blur-md sticky top-0 z-50 bg-[#050510]/80">
                <div className="text-xl font-black tracking-[0.2em] text-cyan-400">
                    NEXUS <span className="text-purple-400">NOVA X</span>
                </div>
                <div className="flex items-center gap-6">
                    <div className="hidden md:flex items-center gap-2 bg-cyan-500/10 px-3 py-1.5 rounded-full border border-cyan-500/20">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                        </span>
                        <span className="text-[10px] font-black text-cyan-400 tracking-widest">{viewers} VIENDO AHORA</span>
                    </div>
                    <nav className="hidden lg:flex gap-8 text-[10px] font-bold tracking-[0.15em] uppercase text-gray-500">
                        <a href="#specs" className="hover:text-cyan-400 transition-colors">Specs</a>
                        <a href="#reviews" className="hover:text-cyan-400 transition-colors">Reviews</a>
                        <a href="#faq" className="hover:text-cyan-400 transition-colors">FAQ</a>
                    </nav>
                    <button className="bg-cyan-500 hover:bg-cyan-400 text-black text-[10px] font-black tracking-widest uppercase px-5 py-2 rounded-full transition-all">
                        Comprar
                    </button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 pt-12">
                {/* SECTION 2: Hero — Producto + Precio + CTA */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[70vh]">
                    <div className="space-y-8 relative">
                        <div className="absolute -top-20 -left-20 w-64 h-64 bg-cyan-500/10 blur-[100px] rounded-full"></div>
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                                <svg className="w-4 h-4 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                                <span className="text-[10px] font-black text-cyan-400 tracking-[0.2em] uppercase">Lanzamiento Exclusivo</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black leading-[0.9] tracking-tighter">
                                {ai?.enhancedTitle || product.title}
                                <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
                                    REDEFINIDO.
                                </span>
                            </h1>
                            <p className="max-w-md text-gray-400 text-base leading-relaxed">
                                {ai?.enhancedDescription || product.description || 'Experimenta la evolución tecnológica definitiva. Rendimiento extremo, diseño premium y tecnología de vanguardia en un solo dispositivo.'}
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                            <div className="space-y-1">
                                <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Precio Exclusivo</span>
                                <div className="flex items-baseline gap-3">
                                    <span className="text-4xl font-black text-white">{fmtPrice(product.price)}</span>
                                    {product.originalPrice && <span className="text-xl text-gray-600 line-through">{fmtPrice(product.originalPrice)}</span>}
                                </div>
                            </div>
                            <button 
                                onClick={() => document.getElementById('checkout-electronics')?.scrollIntoView({ behavior: 'smooth' })}
                                className="bg-cyan-500 hover:bg-cyan-400 text-black px-10 py-5 rounded-xl font-black tracking-widest uppercase text-sm shadow-[0_0_30px_rgba(34,211,238,0.35)] transition-all active:scale-95"
                            >
                                Ordenar Ahora
                            </button>
                        </div>
                    </div>
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 blur-[120px] rounded-full scale-110"></div>
                        <div className="relative bg-gradient-to-b from-white/10 to-transparent p-1 rounded-[3rem] shadow-2xl border border-white/20 overflow-hidden">
                            <EnhancedProductGallery 
                                product={product}
                                accentColor="#06b6d4"
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none"></div>
                        </div>
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white/5 backdrop-blur-md px-6 py-2 rounded-full border border-white/10 flex items-center gap-3">
                            <div className="flex -space-x-1.5">
                                {[1,2,3,4,5].map(i => (
                                    <svg key={i} className="w-4 h-4 text-amber-400 fill-amber-400" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                                ))}
                            </div>
                            <span className="text-[10px] font-black text-gray-400 tracking-widest">+2.4K VENDIDOS</span>
                        </div>
                    </div>
                </div>

                {/* SECTION 3: Especificaciones Técnicas */}
                <div id="specs" className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-32 mb-24">
                    <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-12 space-y-6 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 blur-[50px] group-hover:bg-cyan-500/10 transition-colors"></div>
                        <h3 className="text-3xl font-black tracking-tighter">DISEÑO PREMIUM.<br /><span className="text-gray-500">POTENCIA INIGUALABLE.</span></h3>
                        <div className="grid grid-cols-2 gap-4 pt-6">
                            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                                <img src={product.imageUrl} className="h-32 w-full object-cover rounded-xl mb-4 opacity-50" alt="detail" />
                                <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">Cuerpo Ultrafino</div>
                            </div>
                            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                                <img src={product.imageUrl} className="h-32 w-full object-cover rounded-xl mb-4 opacity-50" alt="detail" />
                                <div className="text-[10px] font-bold text-purple-400 uppercase tracking-widest">Pantalla Aura</div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-12 space-y-8">
                        <h3 className="text-xs font-black tracking-[0.3em] uppercase text-gray-500">Especificaciones Técnicas</h3>
                        <div className="space-y-6">
                            {[
                                { icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 9h6v6H9z"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/></svg>, label: "Procesador", value: "Quantum Core X1, 4nm" },
                                { icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>, label: "Pantalla", value: '6.9" Dynamic OLED 4K' },
                                { icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>, label: "Batería", value: "6500mAh HyperCharge" },
                                { icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/></svg>, label: "Cámara", value: "200MP Ultra-Matrix" }
                            ].map((spec, i) => (
                                <div key={i} className="flex items-center justify-between border-b border-white/5 pb-4">
                                    <div className="flex items-center gap-4">
                                        <div className="text-cyan-400">{spec.icon}</div>
                                        <div className="text-sm font-bold tracking-wide uppercase">{spec.label}</div>
                                    </div>
                                    <div className="text-sm text-gray-400 font-medium">{spec.value}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* SECTION 4: Trust Bar — Envío, Garantía, Seguridad */}
                <div className="flex flex-wrap justify-center gap-12 py-16 border-t border-b border-white/5">
                    {[
                        { icon: <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="6" width="15" height="12" rx="2"/><path d="M16 10h4l3 3v5h-7V10z"/><circle cx="5.5" cy="20.5" r="1.5"/><circle cx="18.5" cy="20.5" r="1.5"/></svg>, title: "Envío Express Gratis", desc: "24-48 horas a todo el país" },
                        { icon: <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>, title: "Garantía 12 Meses", desc: "Cobertura total del fabricante" },
                        { icon: <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>, title: "Pago Seguro COD", desc: "Paga al recibir tu pedido" },
                        { icon: <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>, title: "Soporte 24/7", desc: "WhatsApp directo" }
                    ].map((item, i) => (
                        <div key={i} className="text-center group max-w-[180px]">
                            <div className="inline-flex p-4 rounded-2xl bg-white/5 border border-white/10 mb-4 group-hover:border-cyan-500/50 transition-colors">
                                <div className="text-cyan-400">{item.icon}</div>
                            </div>
                            <h4 className="font-black text-xs uppercase tracking-widest mb-1 text-white">{item.title}</h4>
                            <p className="text-[10px] text-gray-500 font-bold">{item.desc}</p>
                        </div>
                    ))}
                </div>

                {/* SECTION 5: Características Grid — 4 Features */}
                <div className="py-24">
                    <div className="text-center mb-16">
                        <span className="text-cyan-500 text-[10px] font-black tracking-[0.3em] uppercase">Tecnología de Vanguardia</span>
                        <h2 className="text-4xl font-black tracking-tighter mt-3">¿Por Qué Elegir {ai?.enhancedTitle || product.title}?</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { title: "Rendimiento Extremo", desc: "Procesador de 4nm con IA integrada para un rendimiento sin precedentes en multitarea y gaming.", icon: <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>, color: "cyan" },
                            { title: "Pantalla Inmersiva", desc: "OLED 4K con tasa de refresco de 120Hz y brillo adaptativo de 2000 nits para cualquier condición.", icon: <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>, color: "purple" },
                            { title: "Cámara Profesional", desc: "Sistema de 200MP con estabilización óptica, modo nocturno avanzado y grabación 8K.", icon: <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>, color: "pink" },
                            { title: "Batería Infinita", desc: "6500mAh con carga rápida de 120W. De 0 a 100% en solo 18 minutos. Todo el día sin preocupaciones.", icon: <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="6" width="18" height="12" rx="2"/><path d="M23 13v-2"/><path d="M7 12h4"/></svg>, color: "emerald" }
                        ].map((feat, i) => (
                            <div key={i} className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 hover:border-cyan-500/30 transition-all group">
                                <div className={`inline-flex p-3 rounded-2xl bg-${feat.color}-500/10 text-${feat.color}-400 mb-5`}>
                                    {feat.icon}
                                </div>
                                <h4 className="font-black text-lg text-white mb-2">{feat.title}</h4>
                                <p className="text-sm text-gray-400 leading-relaxed">{feat.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* SECTION 6: Social Proof — Reseñas Verificadas */}
                <div id="reviews" className="py-24 border-t border-white/5">
                    <div className="text-center mb-16">
                        <div className="flex justify-center gap-1 mb-4">
                            {[1,2,3,4,5].map(i => (
                                <svg key={i} className="w-6 h-6 text-amber-400 fill-amber-400" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                            ))}
                        </div>
                        <h2 className="text-3xl font-black tracking-tighter">Lo Que Dicen Nuestros Clientes</h2>
                        <p className="text-gray-500 text-sm font-bold mt-2">4.9/5 basado en 2,847 reseñas verificadas</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { name: "Andrés M.", text: "La pantalla OLED es impresionante. Los colores son tan vivos que parece que las imágenes cobran vida. Mejor compra del año.", stars: 5, badge: "Compra Verificada" },
                            { name: "Carolina S.", text: "La batería dura todo el día incluso con uso intensivo. La carga rápida es un game-changer total. Lo recomiendo al 100%.", stars: 5, badge: "Top Reviewer" },
                            { name: "Miguel R.", text: "La cámara de 200MP captura detalles increíbles. Las fotos nocturnas son espectaculares. Superó todas mis expectativas.", stars: 5, badge: "Compra Verificada" }
                        ].map((review, i) => (
                            <div key={i} className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-4 hover:border-cyan-500/20 transition-all">
                                <div className="flex gap-1">
                                    {[...Array(review.stars)].map((_, j) => (
                                        <svg key={j} className="w-4 h-4 text-amber-400 fill-amber-400" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                                    ))}
                                </div>
                                <p className="text-gray-300 font-medium leading-relaxed">"{review.text}"</p>
                                <div className="flex items-center gap-3 pt-2">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-white font-black text-sm">{review.name[0]}</div>
                                    <div>
                                        <div className="font-black text-sm text-white">{review.name}</div>
                                        <div className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest">{review.badge}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* SECTION 7: Comparación — Nosotros vs Competencia */}
                <div className="py-24">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black tracking-tighter">Compara y Decide</h2>
                        <p className="text-gray-500 text-sm font-bold mt-2 uppercase tracking-widest">¿Por qué somos la mejor opción?</p>
                    </div>
                    <div className="bg-white/5 rounded-[2.5rem] overflow-hidden border border-white/10">
                        <div className="grid grid-cols-3">
                            <div className="p-6 border-b border-white/5 flex items-end">
                                <span className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em]">Característica</span>
                            </div>
                            <div className="p-6 border-b border-white/5 bg-cyan-500/10 text-center">
                                <span className="block text-[10px] font-black text-cyan-400 uppercase tracking-widest mb-1">NUESTRA MARCA</span>
                                <span className="block text-sm font-black text-white">{ai?.enhancedTitle || product.title}</span>
                            </div>
                            <div className="p-6 border-b border-white/5 text-center">
                                <span className="block text-[10px] font-black text-gray-600 uppercase tracking-widest">OTRAS MARCAS</span>
                            </div>
                            {[
                                { label: "Procesador 4nm", us: true, them: false },
                                { label: "Pantalla OLED 4K", us: true, them: false },
                                { label: "Cámara 200MP", us: true, them: false },
                                { label: "Carga 120W", us: true, them: false },
                                { label: "Garantía 12 Meses", us: true, them: true },
                                { label: "Pago Contra Entrega", us: true, them: false }
                            ].map((row, i) => (
                                <React.Fragment key={i}>
                                    <div className="p-5 border-b border-white/5 flex items-center font-bold text-gray-400 text-sm px-6">{row.label}</div>
                                    <div className="p-5 border-b border-white/5 bg-cyan-500/5 flex justify-center items-center">
                                        {row.us ? (
                                            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                                <svg className="w-5 h-5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                                            </div>
                                        ) : (
                                            <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                                        )}
                                    </div>
                                    <div className="p-5 border-b border-white/5 flex justify-center items-center">
                                        {row.them ? (
                                            <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                                        ) : (
                                            <div className="w-8 h-8 rounded-full bg-rose-500/20 flex items-center justify-center">
                                                <svg className="w-5 h-5 text-rose-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                                            </div>
                                        )}
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>

                {/* SECTION 8: Cómo Funciona — 3 Pasos */}
                <div className="py-24 border-t border-white/5">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black tracking-tighter">¿Cómo Funciona?</h2>
                        <p className="text-gray-500 text-sm font-bold mt-2">3 pasos simples para tener tu dispositivo</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { step: "1", title: "Haz Tu Pedido", desc: "Completa el formulario con tus datos. Sin tarjeta, sin complicaciones.", color: "cyan" },
                            { step: "2", title: "Envío Express", desc: "Procesamos tu orden en 24h y te enviamos con seguimiento en tiempo real.", color: "purple" },
                            { step: "3", title: "Paga al Recibir", desc: "Verifica tu producto y paga en efectivo al repartidor. 100% seguro.", color: "emerald" }
                        ].map((s, i) => (
                            <div key={i} className="text-center space-y-4">
                                <div className={`w-20 h-20 mx-auto rounded-full bg-${s.color}-500/10 border-2 border-${s.color}-500/30 flex items-center justify-center`}>
                                    <span className={`text-3xl font-black text-${s.color}-400`}>{s.step}</span>
                                </div>
                                <h4 className="font-black text-lg text-white">{s.title}</h4>
                                <p className="text-sm text-gray-400 max-w-xs mx-auto">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* SECTION 9: Garantía + Formulario COD */}
                <div className="py-24 border-t border-white/5">
                    {/* Garantía */}
                    <div className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-[3rem] p-12 text-center mb-16 border border-white/10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/5 rounded-full blur-[60px]"></div>
                        <svg className="w-16 h-16 mx-auto text-cyan-400 mb-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                            <path d="M9 12l2 2 4-4"/>
                        </svg>
                        <h3 className="text-3xl font-black text-white mb-3 uppercase tracking-tight">Garantía Total de 12 Meses</h3>
                        <p className="text-gray-400 max-w-lg mx-auto leading-relaxed">
                            Si no estás 100% satisfecho con tu compra, te devolvemos tu dinero sin preguntas. Además, cuentas con garantía completa del fabricante por 12 meses.
                        </p>
                    </div>

                    {/* Formulario COD */}
                    <div id="checkout-electronics" className="max-w-2xl mx-auto bg-white/5 border border-white/10 rounded-[2.5rem] p-10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-[40px]"></div>
                        <div className="text-center mb-8 relative z-10">
                            <h3 className="text-2xl font-black text-white uppercase tracking-tight">Finaliza Tu Compra</h3>
                            <p className="text-gray-400 text-sm font-bold mt-2">Paga en efectivo al recibir. Sin tarjeta necesaria.</p>
                        </div>
                        <form className="space-y-5 relative z-10" onSubmit={(e) => e.preventDefault()}>
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Nombre Completo</label>
                                <input type="text" className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 outline-none text-white font-bold placeholder:text-gray-600 transition-all" placeholder="Tu nombre completo" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">WhatsApp / Celular</label>
                                <input type="tel" className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 outline-none text-white font-bold placeholder:text-gray-600 transition-all" placeholder="Ej: 0987654321" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Dirección de Entrega</label>
                                <textarea rows={2} className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 outline-none text-white font-bold placeholder:text-gray-600 transition-all resize-none" placeholder="Calle, número, ciudad y referencias..." />
                            </div>
                            <button className="w-full bg-cyan-500 hover:bg-cyan-400 text-black py-5 rounded-2xl font-black text-lg uppercase tracking-widest shadow-[0_0_40px_rgba(34,211,238,0.3)] transition-all flex items-center justify-center gap-3">
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>
                                PEDIR Y PAGAR AL RECIBIR
                            </button>
                            <div className="flex items-center justify-center gap-6 pt-2 opacity-50">
                                <div className="flex items-center gap-1.5">
                                    <svg className="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-tight">SSL Seguro</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <svg className="w-4 h-4 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="6" width="15" height="12" rx="2"/><path d="M16 10h4l3 3v5h-7V10z"/><circle cx="5.5" cy="20.5" r="1.5"/><circle cx="18.5" cy="20.5" r="1.5"/></svg>
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-tight">Entrega Segura</span>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                {/* SECTION 10: FAQ */}
                <div id="faq" className="py-24 border-t border-white/5 max-w-3xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black tracking-tighter">Preguntas Frecuentes</h2>
                        <p className="text-gray-500 text-sm font-bold mt-2">Resolvemos tus dudas al instante</p>
                    </div>
                    <div className="space-y-4">
                        {[
                            { q: "¿Cuándo pago mi pedido?", a: "Pagas ÚNICAMENTE cuando recibes el producto en tus manos. No necesitas tarjeta de crédito ni realizar pagos anticipados. Cero riesgos." },
                            { q: "¿Cuánto tarda el envío?", a: "Procesamos tu orden en 24 horas. El tiempo estimado de entrega es de 24 a 48 horas hábiles con seguimiento en tiempo real." },
                            { q: "¿El producto tiene garantía?", a: "Sí, cuentas con garantía completa de 12 meses del fabricante. Si presentas algún problema, lo resolvemos sin costo adicional." },
                            { q: "¿Es un producto original?", a: "100% original y sellado de fábrica. Cada unidad viene con número de serie verificable y certificado de autenticidad." },
                            { q: "¿Puedo devolver el producto?", a: "Absolutamente. Si no estás satisfecho, tienes 30 días para devolverlo y recibir un reembolso completo sin preguntas." }
                        ].map((faq, i) => (
                            <div key={i} className={`rounded-2xl border transition-all overflow-hidden ${faqOpen === i ? 'border-cyan-500/30 bg-white/5' : 'border-white/5 hover:border-white/10'}`}>
                                <button className="w-full flex justify-between items-center p-6 font-black text-left text-white outline-none" onClick={() => setFaqOpen(faqOpen === i ? null : i)}>
                                    <span className="text-base leading-tight pr-4">{faq.q}</span>
                                    <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${faqOpen === i ? 'bg-cyan-500 text-black rotate-180' : 'bg-white/10 text-gray-400'}`}>
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
                                    </div>
                                </button>
                                {faqOpen === i && (
                                    <div className="px-6 pb-6 text-gray-400 font-medium leading-relaxed">{faq.a}</div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* SECTION 11: CTA Final */}
                <div className="py-24 text-center border-t border-white/5">
                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-6">
                        No Dejes Pasar Esta <span className="text-cyan-400">Oportunidad</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-xl mx-auto mb-8">
                        Stock limitado. Precio exclusivo solo por tiempo limitado. Asegura tu {ai?.enhancedTitle || product.title} hoy y paga al recibir.
                    </p>
                    <div className="inline-block bg-cyan-500/10 text-cyan-400 font-black px-8 py-3 rounded-full text-xl uppercase tracking-widest border border-cyan-500/20 mb-8">
                        Precio: {fmtPrice(product.price)}
                    </div>
                    <div>
                        <button 
                            onClick={() => document.getElementById('checkout-electronics')?.scrollIntoView({ behavior: 'smooth' })}
                            className="bg-cyan-500 hover:bg-cyan-400 text-black px-16 py-6 rounded-2xl font-black text-xl uppercase tracking-widest shadow-[0_0_50px_rgba(34,211,238,0.3)] transition-all inline-flex items-center gap-3"
                        >
                            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>
                            Pedir Ahora
                        </button>
                    </div>
                </div>
            </main>

            {/* Sticky Mobile Bar */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#050510]/90 backdrop-blur-xl border-t border-white/10 p-4 z-50 flex justify-between items-center">
                <div className="font-black text-xl text-white">{fmtPrice(product.price)}</div>
                <button 
                    onClick={() => document.getElementById('checkout-electronics')?.scrollIntoView({ behavior: 'smooth' })}
                    className="bg-cyan-500 text-black px-8 py-3 rounded-xl font-black uppercase text-xs tracking-widest"
                >
                    Comprar Ahora
                </button>
            </div>
        </div>
    );
};

export default PdpPremiumElectronics;
