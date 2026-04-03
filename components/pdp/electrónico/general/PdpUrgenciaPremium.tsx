'use client';

import React, { useState, useEffect } from 'react';
import { StoreData, Product } from '@/lib/types';
import EnhancedProductGallery from '@/components/pdp/EnhancedProductGallery';

interface PdpPremiumUrgencyProps {
    data: StoreData;
    product: Product;
}

const PdpPremiumUrgency: React.FC<PdpPremiumUrgencyProps> = ({ data, product }) => {
    const [timeLeft, setTimeLeft] = useState(3600 * 24 + 1421);
    const [faqOpen, setFaqOpen] = useState<number | null>(null);
    const ai = product.aiContent;
    const sec = ai?.sections;
    const fmtPrice = (n: number) => {
      const str = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      return `Gs. ${str}`;
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const time = {
        d: Math.floor(timeLeft / (3600 * 24)),
        h: Math.floor((timeLeft % (3600 * 24)) / 3600),
        m: Math.floor((timeLeft % 3600) / 60),
        s: timeLeft % 60
    };

    return (
        <div className="bg-[#0A0A0A] text-white font-sans overflow-x-hidden selection:bg-red-600/30">
            {/* SECTION 1: Header */}
            <header className="bg-black/80 backdrop-blur-md py-4 px-6 flex justify-between items-center sticky top-0 z-50 border-b border-white/5">
                <div className="text-2xl font-black italic tracking-tighter flex items-center gap-2">
                    <span className="text-red-600">AURA</span> AUDIO
                </div>
                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-2 bg-red-600/10 px-3 py-1.5 rounded-full border border-red-600/20">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                        </span>
                        <span className="text-[10px] font-black text-red-400 tracking-widest">VENTA FLASH ACTIVA</span>
                    </div>
                    <button onClick={() => document.getElementById('checkout-urgency')?.scrollIntoView({ behavior: 'smooth' })} className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest transition-all">
                        Comprar
                    </button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-12">
                {/* SECTION 2: Hero — Producto + Countdown + CTA */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Left: Product Images */}
                    <div className="space-y-6">
                        <div className="bg-[#151515] rounded-3xl overflow-hidden border border-white/5 group relative">
                            <EnhancedProductGallery 
                                product={product}
                                accentColor="#dc2626"
                            />
                            <div className="absolute top-6 left-6 bg-red-600 text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest animate-pulse shadow-lg shadow-red-900/40 z-10">
                                OFERTA EXCLUSIVA
                            </div>
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className={`aspect-square rounded-2xl overflow-hidden border-2 bg-[#151515] ${i === 1 ? 'border-red-600' : 'border-transparent opacity-50 hover:opacity-100 cursor-pointer'}`}>
                                    <img src={product.imageUrl} alt="thumb" className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                        {/* Social Proof Notification */}
                        <div className="bg-red-600/10 border border-red-600/20 p-5 rounded-3xl flex items-center gap-5">
                            <div className="bg-red-600 p-3 rounded-2xl shrink-0">
                                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
                            </div>
                            <div>
                                <div className="font-black text-white">Sara J. acaba de comprar</div>
                                <div className="text-xs text-red-500 font-bold uppercase tracking-widest">Hace 2 minutos — Madrid</div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Order Section */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-red-500 font-black text-xs uppercase tracking-[0.2em] animate-pulse">
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                                LA OFERTA EXCLUSIVA TERMINA EN:
                            </div>
                            {/* Countdown Timer */}
                            <div className="grid grid-cols-4 gap-4">
                                {[
                                    { v: time.d, l: 'DÍAS' }, { v: time.h, l: 'HRS' },
                                    { v: time.m, l: 'MINS' }, { v: time.s, l: 'SECS' }
                                ].map((t, i) => (
                                    <div key={i} className="bg-[#151515] rounded-2xl p-4 border border-white/5 text-center shadow-xl">
                                        <div className="text-4xl font-black tracking-tighter leading-none mb-1">{t.v.toString().padStart(2, '0')}</div>
                                        <div className="text-[10px] font-black text-gray-500 tracking-widest">{t.l}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <h1 className="text-5xl md:text-6xl font-black leading-[0.95] tracking-tighter">{ai?.enhancedTitle || product.title}</h1>
                            <div className="flex items-center gap-2 pt-2">
                                <div className="flex text-red-600">
                                    {[1,2,3,4,5].map(i => <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
                                </div>
                                <span className="text-xs font-black text-gray-500 uppercase tracking-widest">4.9/5 (1,847 reseñas)</span>
                            </div>
                        </div>
                        <div className="flex items-baseline gap-6">
                            <div className="text-5xl font-black text-white">{fmtPrice(product.price)}</div>
                            {product.originalPrice && <div className="text-2xl text-gray-600 line-through font-bold">{fmtPrice(product.originalPrice)}</div>}
                            <div className="text-red-500 font-black text-sm uppercase tracking-widest">Envío Gratis</div>
                        </div>
                        <div className="space-y-4">
                            <div className="p-4 bg-red-600/20 border-l-4 border-red-600 rounded-r-xl flex items-center gap-3">
                                <svg className="w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><path d="M12 9v4M12 17h.01"/></svg>
                                <span className="text-sm font-black text-red-500 uppercase tracking-widest">SOLO QUEDAN 3 UNIDADES EN STOCK</span>
                            </div>
                            <button onClick={() => document.getElementById('checkout-urgency')?.scrollIntoView({ behavior: 'smooth' })} className="w-full bg-red-600 hover:bg-red-700 text-white py-6 rounded-2xl font-black text-xl shadow-2xl shadow-red-900/40 transition-all flex items-center justify-center gap-3 group">
                                COMPRAR AHORA
                                <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* SECTION 3: Trust Bar */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-16 mt-16 border-t border-b border-white/5">
                    {[
                        { icon: <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>, title: "Garantía Total", desc: "30 días" },
                        { icon: <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="6" width="15" height="12" rx="2"/><path d="M16 10h4l3 3v5h-7V10z"/><circle cx="5.5" cy="20.5" r="1.5"/><circle cx="18.5" cy="20.5" r="1.5"/></svg>, title: "Envío Express", desc: "24-48 horas" },
                        { icon: <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>, title: "Pago Seguro", desc: "Contra entrega" },
                        { icon: <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>, title: "Soporte 24/7", desc: "WhatsApp" }
                    ].map((item, i) => (
                        <div key={i} className="flex flex-col items-center gap-3 text-center">
                            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-red-400">{item.icon}</div>
                            <span className="text-xs font-black uppercase tracking-widest text-white">{item.title}</span>
                            <span className="text-[10px] font-bold text-gray-500">{item.desc}</span>
                        </div>
                    ))}
                </div>

                {/* SECTION 4: Características del Producto */}
                <div className="py-24">
                    <div className="text-center mb-16">
                        <span className="text-red-500 text-[10px] font-black tracking-[0.3em] uppercase">Especificaciones</span>
                        <h2 className="text-4xl font-black tracking-tighter mt-3">¿Por Qué Es El Mejor?</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { title: "Sonido Inmersivo 360°", desc: "Drivers de 40mm con tecnología de cancelación activa de ruido. Sumérgete en cada nota con claridad cristalina.", icon: <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg> },
                            { title: "Batería de 40 Horas", desc: "Escucha sin parar durante días. Carga rápida de 10 minutos para 3 horas de reproducción.", icon: <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="6" width="18" height="12" rx="2"/><path d="M23 13v-2"/><path d="M7 12h4"/></svg> },
                            { title: "Bluetooth 5.3", desc: "Conexión instantánea y estable hasta 15 metros. Compatible con todos los dispositivos.", icon: <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6.5 6.5l11 11L12 23V1l5.5 5.5-11 11"/></svg> },
                            { title: "Diseño Ergonómico", desc: "Almohadillas de memory foam premium. Diseñado para sesiones largas sin fatiga.", icon: <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> }
                        ].map((feat, i) => (
                            <div key={i} className="bg-[#151515] border border-white/5 rounded-3xl p-8 hover:border-red-600/20 transition-all">
                                <div className="inline-flex p-3 rounded-2xl bg-red-600/10 text-red-400 mb-5">{feat.icon}</div>
                                <h4 className="font-black text-lg text-white mb-2">{feat.title}</h4>
                                <p className="text-sm text-gray-400 leading-relaxed">{feat.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* SECTION 5: Reseñas */}
                <div className="py-24 border-t border-white/5">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black text-red-600 italic tracking-tighter">FLASH SALE <span className="text-white">LIVE</span></h2>
                        <p className="text-gray-500 text-sm font-bold mt-2">Lo que dicen nuestros compradores verificados</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { name: "Carlos M.", text: "Sonido imbatible. La cancelación de ruido es de otro nivel. Mejor compra del año sin duda.", stars: 5 },
                            { name: "Ana G.", text: "La batería dura una eternidad. Llevo 3 días sin cargar y sigue funcionando perfecto.", stars: 5 },
                            { name: "Luis F.", text: "Calidad premium real. Se nota desde que lo sacas de la caja. El diseño es espectacular.", stars: 5 }
                        ].map((review, i) => (
                            <div key={i} className="bg-[#151515] p-8 rounded-3xl border border-white/5 space-y-4">
                                <div className="flex text-red-600 gap-1">
                                    {[...Array(review.stars)].map((_, j) => <svg key={j} className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
                                </div>
                                <p className="text-gray-300 font-medium leading-relaxed">"{review.text}"</p>
                                <div className="flex items-center gap-3 pt-2">
                                    <div className="w-10 h-10 rounded-full bg-red-600/20 flex items-center justify-center text-red-400 font-black text-sm">{review.name[0]}</div>
                                    <div>
                                        <div className="font-black text-sm text-white">{review.name}</div>
                                        <div className="text-[10px] text-red-500 font-bold uppercase tracking-widest">Compra Verificada</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* SECTION 6: Comparación */}
                <div className="py-24 border-t border-white/5">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black tracking-tighter">Nosotros vs La Competencia</h2>
                    </div>
                    <div className="bg-[#151515] rounded-[2.5rem] overflow-hidden border border-white/5 max-w-4xl mx-auto">
                        <div className="grid grid-cols-3">
                            <div className="p-6 border-b border-white/5"><span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Característica</span></div>
                            <div className="p-6 border-b border-white/5 bg-red-600/10 text-center"><span className="text-[10px] font-black text-red-400 uppercase tracking-widest">AURA AUDIO</span></div>
                            <div className="p-6 border-b border-white/5 text-center"><span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">OTROS</span></div>
                            {[
                                { label: "Cancelación de Ruido", us: true, them: false },
                                { label: "Batería 40+ Horas", us: true, them: false },
                                { label: "Bluetooth 5.3", us: true, them: true },
                                { label: "Garantía 30 Días", us: true, them: false },
                                { label: "Pago Contra Entrega", us: true, them: false }
                            ].map((row, i) => (
                                <React.Fragment key={i}>
                                    <div className="p-5 border-b border-white/5 flex items-center font-bold text-gray-400 text-sm px-6">{row.label}</div>
                                    <div className="p-5 border-b border-white/5 bg-red-600/5 flex justify-center">
                                        {row.us ? <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center"><svg className="w-5 h-5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg></div> : <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>}
                                    </div>
                                    <div className="p-5 border-b border-white/5 flex justify-center">
                                        {row.them ? <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg> : <div className="w-8 h-8 rounded-full bg-rose-500/20 flex items-center justify-center"><svg className="w-5 h-5 text-rose-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg></div>}
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>

                {/* SECTION 7: Cómo Funciona */}
                <div className="py-24 border-t border-white/5">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black tracking-tighter">¿Cómo Funciona?</h2>
                        <p className="text-gray-500 text-sm font-bold mt-2">3 pasos simples</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { step: "1", title: "Haz Tu Pedido", desc: "Completa el formulario abajo. Sin tarjeta, sin complicaciones.", color: "red" },
                            { step: "2", title: "Envío Express", desc: "Procesamos en 24h con seguimiento en tiempo real.", color: "orange" },
                            { step: "3", title: "Paga al Recibir", desc: "Verifica y paga en efectivo al repartidor. 100% seguro.", color: "emerald" }
                        ].map((s, i) => (
                            <div key={i} className="text-center space-y-4">
                                <div className={`w-20 h-20 mx-auto rounded-full bg-${s.color}-600/10 border-2 border-${s.color}-600/30 flex items-center justify-center`}>
                                    <span className={`text-3xl font-black text-${s.color}-400`}>{s.step}</span>
                                </div>
                                <h4 className="font-black text-lg text-white">{s.title}</h4>
                                <p className="text-sm text-gray-400 max-w-xs mx-auto">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* SECTION 8: Garantía */}
                <div className="py-16">
                    <div className="bg-gradient-to-br from-red-600/10 to-orange-600/10 rounded-[3rem] p-12 text-center border border-red-600/10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-red-600/5 rounded-full blur-[60px]"></div>
                        <svg className="w-16 h-16 mx-auto text-yellow-400 mb-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                            <path d="M9 12l2 2 4-4"/>
                        </svg>
                        <h3 className="text-3xl font-black text-yellow-400 uppercase mb-3">Garantía de Hierro 30 Días</h3>
                        <p className="text-gray-400 max-w-lg mx-auto leading-relaxed">
                            Si no estás 100% satisfecho, te devolvemos tu dinero sin preguntas. Tu satisfacción es nuestra prioridad absoluta.
                        </p>
                    </div>
                </div>

                {/* SECTION 9: Formulario COD */}
                <div id="checkout-urgency" className="py-16 max-w-2xl mx-auto">
                    <div className="bg-[#151515] border border-white/10 rounded-[2.5rem] p-10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 rounded-full blur-[40px]"></div>
                        <div className="text-center mb-8 relative z-10">
                            <h3 className="text-2xl font-black text-white uppercase tracking-tight">Finaliza Tu Compra</h3>
                            <p className="text-gray-400 text-sm font-bold mt-2">Paga en efectivo al recibir. Sin tarjeta necesaria.</p>
                        </div>
                        <form className="space-y-5 relative z-10" onSubmit={(e) => e.preventDefault()}>
                            <div>
                                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-1">Nombre Completo</label>
                                <input type="text" className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-red-600/50 focus:ring-2 focus:ring-red-600/20 outline-none text-white font-bold placeholder:text-gray-600 transition-all" placeholder="Tu nombre completo" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-1">WhatsApp / Celular</label>
                                <input type="tel" className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-red-600/50 focus:ring-2 focus:ring-red-600/20 outline-none text-white font-bold placeholder:text-gray-600 transition-all" placeholder="Ej: 0987654321" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-1">Dirección de Entrega</label>
                                <textarea rows={2} className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-red-600/50 focus:ring-2 focus:ring-red-600/20 outline-none text-white font-bold placeholder:text-gray-600 transition-all resize-none" placeholder="Calle, número, ciudad y referencias..." />
                            </div>
                            <button className="w-full bg-red-600 hover:bg-red-700 text-white py-6 rounded-2xl font-black text-xl uppercase tracking-widest shadow-2xl shadow-red-900/40 transition-all flex items-center justify-center gap-3">
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>
                                PEDIR Y PAGAR AL RECIBIR
                            </button>
                            <div className="flex items-center justify-center gap-6 pt-2 opacity-50">
                                <div className="flex items-center gap-1.5">
                                    <svg className="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
                                    <span className="text-[10px] font-black text-gray-400 uppercase">SSL Seguro</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <svg className="w-4 h-4 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="6" width="15" height="12" rx="2"/><path d="M16 10h4l3 3v5h-7V10z"/><circle cx="5.5" cy="20.5" r="1.5"/><circle cx="18.5" cy="20.5" r="1.5"/></svg>
                                    <span className="text-[10px] font-black text-gray-400 uppercase">Entrega Segura</span>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                {/* SECTION 10: FAQ */}
                <div className="py-24 border-t border-white/5 max-w-3xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black tracking-tighter">Preguntas Frecuentes</h2>
                    </div>
                    <div className="space-y-4">
                        {[
                            { q: "¿Cuándo pago mi pedido?", a: "Pagas ÚNICAMENTE cuando recibes el producto en tus manos. No necesitas tarjeta de crédito. Cero riesgos." },
                            { q: "¿Cuánto tarda el envío?", a: "Procesamos tu orden en 24 horas. Entrega estimada de 24 a 48 horas hábiles con seguimiento en tiempo real." },
                            { q: "¿El producto tiene garantía?", a: "Sí, garantía completa de 30 días. Si no estás satisfecho, te devolvemos tu dinero sin preguntas." },
                            { q: "¿Es compatible con mi dispositivo?", a: "Sí, compatible con todos los dispositivos vía Bluetooth 5.3. También incluye cable auxiliar para conexión directa." },
                            { q: "¿La oferta es real?", a: "Absolutamente. Es una venta flash con stock limitado. Una vez agotado, el precio vuelve a su valor original." }
                        ].map((faq, i) => (
                            <div key={i} className={`rounded-2xl border transition-all overflow-hidden ${faqOpen === i ? 'border-red-600/30 bg-[#151515]' : 'border-white/5 hover:border-white/10'}`}>
                                <button className="w-full flex justify-between items-center p-6 font-black text-left text-white outline-none" onClick={() => setFaqOpen(faqOpen === i ? null : i)}>
                                    <span className="text-base leading-tight pr-4">{faq.q}</span>
                                    <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${faqOpen === i ? 'bg-red-600 text-white rotate-180' : 'bg-white/10 text-gray-400'}`}>
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg>
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
                        La Oferta Termina <span className="text-red-600">Pronto</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-xl mx-auto mb-8">
                        Solo quedan pocas unidades. No dejes pasar esta oportunidad única. Paga al recibir.
                    </p>
                    <button onClick={() => document.getElementById('checkout-urgency')?.scrollIntoView({ behavior: 'smooth' })} className="bg-red-600 hover:bg-red-700 text-white px-16 py-6 rounded-2xl font-black text-xl uppercase tracking-widest shadow-2xl shadow-red-900/40 transition-all inline-flex items-center gap-3">
                        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>
                        Pedir Ahora
                    </button>
                </div>
            </main>

            {/* Sticky Mobile Bar */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0A0A0A]/90 backdrop-blur-xl border-t border-white/10 p-4 z-50 flex justify-between items-center">
                <div className="font-black text-xl">{fmtPrice(product.price)}</div>
                <button onClick={() => document.getElementById('checkout-urgency')?.scrollIntoView({ behavior: 'smooth' })} className="bg-red-600 text-white px-8 py-3 rounded-lg font-black uppercase text-xs">
                    Comprar Ahora
                </button>
            </div>
        </div>
    );
};

export default PdpPremiumUrgency;
