'use client';
import React, { useState, useEffect } from 'react';
import { StoreData, Product } from '@/lib/types';
import EnhancedProductGallery from '@/components/pdp/EnhancedProductGallery';

interface PdpPremiumHealthProps {
    data: StoreData;
    product: Product;
}

const PdpPremiumHealth: React.FC<PdpPremiumHealthProps> = ({ data, product }) => {
    const [faqOpen, setFaqOpen] = useState<number | null>(0);
    const [viewers, setViewers] = useState(38);
    const ai = product.aiContent;
    const sec = ai?.sections;
    const fmtPrice = (n: number) => {
      const str = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      return `Gs. ${str}`;
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setViewers(Math.floor(Math.random() * (48 - 32 + 1) + 32));
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-[#F8FAFC] text-[#1E293B] font-sans">
            {/* SECTION 1: Header */}
            <header className="bg-white border-b border-slate-200 py-4 px-6 md:px-12 flex justify-between items-center sticky top-0 z-50">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-slate-800 uppercase">Nuro-Balance</span>
                </div>
                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-2 bg-teal-50 px-3 py-1.5 rounded-full border border-teal-100">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                        </span>
                        <span className="text-[10px] font-black text-teal-700 tracking-widest">{viewers} VIENDO</span>
                    </div>
                    <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-500">
                        <a href="#beneficios" className="hover:text-teal-600">Beneficios</a>
                        <a href="#ciencia" className="hover:text-teal-600">Ciencia</a>
                        <a href="#faq" className="hover:text-teal-600">FAQ</a>
                    </nav>
                    <button onClick={() => document.getElementById('checkout-health')?.scrollIntoView({ behavior: 'smooth' })} className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-full font-bold text-sm shadow-sm transition-all">
                        Comprar Ahora
                    </button>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-6 py-12 space-y-24">
                {/* SECTION 2: Hero */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="order-2 lg:order-1 space-y-8">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-teal-600 font-bold text-sm uppercase tracking-widest">
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                                Formulado Científicamente
                            </div>
                            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight">
                                {ai?.enhancedTitle || product.title}:<br />
                                <span className="text-teal-600 font-black italic">Desbloquea tu Vitalidad.</span>
                            </h1>
                            <p className="text-lg text-slate-600 leading-relaxed font-medium">
                                {ai?.enhancedDescription || product.description || 'Soporte botánico premium para claridad mental, enfoque y memoria. Respaldado por estudios clínicos y diseñado para tu rendimiento diario.'}
                            </p>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="flex text-yellow-500">
                                {[1,2,3,4,5].map(i => <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
                            </div>
                            <span className="text-sm font-bold text-slate-400">4.9/5 (342 reseñas)</span>
                        </div>
                        <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-8">
                            <div className="text-center sm:text-left">
                                <span className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-1">Suministro para 60 días</span>
                                <div className="flex items-baseline gap-3">
                                    <span className="text-4xl font-black text-slate-900">{fmtPrice(product.price)}</span>
                                    {product.originalPrice && <span className="text-xl text-slate-400 line-through">{fmtPrice(product.originalPrice)}</span>}
                                </div>
                                <span className="text-teal-600 text-sm font-bold mt-1 block">Envío Express Gratis</span>
                            </div>
                            <button onClick={() => document.getElementById('checkout-health')?.scrollIntoView({ behavior: 'smooth' })} className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white px-10 py-5 rounded-2xl font-black text-lg transition-transform active:scale-95 shadow-lg shadow-slate-200">
                                AÑADIR AL CARRITO
                            </button>
                        </div>
                    </div>
                    <div className="order-1 lg:order-2 relative">
                        <div className="absolute inset-0 bg-teal-500/5 rounded-full blur-3xl scale-125"></div>
                        <div className="relative bg-white p-12 rounded-[3rem] shadow-2xl shadow-teal-900/10 border border-white">
                            <EnhancedProductGallery 
                                product={product}
                                accentColor="#14b8a6"
                            />
                        </div>
                    </div>
                </div>

                {/* SECTION 3: Trust Bar — Certificaciones */}
                <div className="grid grid-cols-3 md:grid-cols-6 gap-6 py-12 border-y border-slate-100">
                    {[
                        { label: "Orgánico", icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22c-4.97 0-9-2.69-9-6v-2c0-3.31 4.03-6 9-6s9 2.69 9 6v2c0 3.31-4.03 6-9 6z"/><path d="M12 8V2"/><path d="M8 4l4 4 4-4"/></svg> },
                        { label: "No-GMO", icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M4.93 4.93l14.14 14.14"/></svg> },
                        { label: "Sin Gluten", icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
                        { label: "Vegano", icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 22l10-10"/><path d="M16 8a6 6 0 00-8.49 8.49"/><path d="M22 2l-5.5 5.5"/></svg> },
                        { label: "Lab Tested", icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 3h6v5.17l4 6V21H5v-6.83l4-6V3z"/><path d="M9 3h6"/></svg> },
                        { label: "GMP Cert.", icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg> }
                    ].map((badge, i) => (
                        <div key={i} className="flex flex-col items-center gap-2">
                            <div className="w-14 h-14 rounded-full border-2 border-teal-100 bg-teal-50 flex items-center justify-center text-teal-600">
                                {badge.icon}
                            </div>
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">{badge.label}</span>
                        </div>
                    ))}
                </div>

                {/* SECTION 4: Resultados Clínicos */}
                <div id="ciencia" className="bg-white rounded-[3rem] p-12 md:p-16 shadow-xl shadow-slate-200/50 border border-white text-center space-y-12">
                    <div className="max-w-2xl mx-auto space-y-4">
                        <h2 className="text-3xl font-black text-slate-900 uppercase">Resultados Clínicos Comprobados</h2>
                        <p className="text-slate-500 font-medium">Respaldado por estudios científicos en más de 500 participantes.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { value: "87%", label: "Mejora en Concentración", desc: "Después de 4 semanas de uso continuo", color: "teal" },
                            { value: "92%", label: "Reducción de Fatiga Mental", desc: "Reportado por usuarios verificados", color: "emerald" },
                            { value: "95%", label: "Satisfacción General", desc: "Recomendarían el producto a otros", color: "cyan" }
                        ].map((stat, i) => (
                            <div key={i} className="bg-slate-50 rounded-3xl p-8 border border-slate-100 space-y-4">
                                <div className={`text-5xl font-black text-${stat.color}-600`}>{stat.value}</div>
                                <h4 className="font-black text-slate-900 uppercase text-sm tracking-wide">{stat.label}</h4>
                                <p className="text-xs text-slate-400 font-bold">{stat.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* SECTION 5: Beneficios — Feature Grid */}
                <div id="beneficios" className="space-y-12">
                    <div className="text-center">
                        <span className="text-teal-600 text-[10px] font-black tracking-[0.3em] uppercase">Beneficios Clave</span>
                        <h2 className="text-3xl font-black text-slate-900 mt-3">¿Por Qué Elegir {ai?.enhancedTitle || product.title}?</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { title: "Claridad Mental", desc: "Ingredientes nootrópicos que potencian tu enfoque y concentración durante todo el día sin efectos secundarios.", icon: <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg> },
                            { title: "Energía Natural", desc: "Sin cafeína ni estimulantes artificiales. Energía sostenida proveniente de extractos botánicos puros y orgánicos.", icon: <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg> },
                            { title: "Memoria Mejorada", desc: "Fórmula clínicamente probada para mejorar la retención y recuperación de información en un 87%.", icon: <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg> },
                            { title: "Sueño Reparador", desc: "Adaptógenos que regulan el cortisol y promueven un descanso profundo y reparador cada noche.", icon: <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg> }
                        ].map((feat, i) => (
                            <div key={i} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-lg transition-all flex gap-6">
                                <div className="shrink-0 w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600">
                                    {feat.icon}
                                </div>
                                <div>
                                    <h4 className="font-black text-slate-900 text-lg mb-2">{feat.title}</h4>
                                    <p className="text-sm text-slate-500 leading-relaxed">{feat.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* SECTION 6: Ingredientes Destacados */}
                <div className="bg-white rounded-[3rem] p-12 md:p-16 shadow-xl shadow-slate-200/50 border border-white">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-black text-slate-900 uppercase">Ingredientes Premium</h2>
                        <p className="text-slate-500 font-medium mt-2">Cada ingrediente seleccionado por su eficacia comprobada</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { name: "Bacopa Monnieri", dose: "300mg", benefit: "Mejora la memoria y el aprendizaje. Usado en medicina ayurvédica por más de 3000 años.", color: "bg-emerald-50 text-emerald-700 border-emerald-100" },
                            { name: "Lion's Mane", dose: "500mg", benefit: "Estimula el factor de crecimiento nervioso (NGF). Regeneración neuronal comprobada.", color: "bg-amber-50 text-amber-700 border-amber-100" },
                            { name: "Ashwagandha KSM-66", dose: "600mg", benefit: "Reduce el cortisol un 28%. Adaptógeno premium para estrés y ansiedad.", color: "bg-purple-50 text-purple-700 border-purple-100" }
                        ].map((ing, i) => (
                            <div key={i} className={`rounded-3xl p-8 border ${ing.color} space-y-4`}>
                                <div className="flex justify-between items-start">
                                    <h4 className="font-black text-lg">{ing.name}</h4>
                                    <span className="text-xs font-black bg-white px-3 py-1 rounded-full shadow-sm">{ing.dose}</span>
                                </div>
                                <p className="text-sm leading-relaxed opacity-80">{ing.benefit}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* SECTION 7: Reseñas Verificadas */}
                <div className="space-y-12">
                    <div className="text-center">
                        <div className="flex justify-center gap-1 mb-3">
                            {[1,2,3,4,5].map(i => <svg key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
                        </div>
                        <h2 className="text-3xl font-black text-slate-900">Historias de Usuarios Verificados</h2>
                        <p className="text-slate-400 font-bold text-sm mt-2">4.9/5 basado en 342 reseñas verificadas</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { name: "Sara J.", text: "Realmente cambió mi forma de trabajar. Me siento más enfocada que nunca. Llevo 3 meses y no pienso dejarlo.", badge: "Compra Verificada" },
                            { name: "Marcos L.", text: "Increíble producto, envío súper rápido y resultados reales. Mi concentración mejoró notablemente en 2 semanas.", badge: "Top Reviewer" },
                            { name: "Elena P.", text: "Probé muchos suplementos antes y ninguno funcionó como este. La diferencia es notable desde la primera semana.", badge: "Compra Verificada" }
                        ].map((review, i) => (
                            <div key={i} className="bg-white p-8 rounded-[2rem] shadow-lg shadow-slate-200/50 border border-slate-50 space-y-4">
                                <div className="flex text-yellow-400 gap-1">
                                    {[1,2,3,4,5].map(j => <svg key={j} className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
                                </div>
                                <p className="text-slate-600 font-medium italic leading-relaxed">"{review.text}"</p>
                                <div className="flex items-center gap-4 pt-4">
                                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-black">{review.name[0]}</div>
                                    <div>
                                        <div className="font-black text-sm">{review.name}</div>
                                        <div className="text-[10px] text-teal-600 font-bold uppercase tracking-widest">{review.badge}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* SECTION 8: Cómo Funciona — 3 Pasos */}
                <div className="bg-white rounded-[3rem] p-12 md:p-16 shadow-xl shadow-slate-200/50 border border-white">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-black text-slate-900 uppercase">¿Cómo Funciona?</h2>
                        <p className="text-slate-500 font-medium mt-2">3 pasos simples para empezar tu transformación</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { step: "1", title: "Haz Tu Pedido", desc: "Completa el formulario con tus datos. Sin tarjeta, sin complicaciones. Paga al recibir.", color: "bg-teal-50 text-teal-700 border-teal-200" },
                            { step: "2", title: "Recibe en 24-48h", desc: "Envío express a todo el país con seguimiento en tiempo real de tu paquete.", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
                            { step: "3", title: "Siente la Diferencia", desc: "Toma 2 cápsulas diarias y experimenta resultados visibles desde la primera semana.", color: "bg-cyan-50 text-cyan-700 border-cyan-200" }
                        ].map((s, i) => (
                            <div key={i} className={`text-center rounded-3xl p-8 border ${s.color}`}>
                                <div className="w-16 h-16 mx-auto rounded-full bg-white flex items-center justify-center text-3xl font-black shadow-sm mb-4 border">{s.step}</div>
                                <h4 className="font-black text-lg mb-2">{s.title}</h4>
                                <p className="text-sm leading-relaxed opacity-80">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* SECTION 9: Garantía + Formulario COD */}
                <div className="space-y-12">
                    {/* Garantía */}
                    <div className="bg-slate-900 text-white rounded-[3rem] p-12 text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-teal-500/10 rounded-full blur-[60px]"></div>
                        <svg className="w-16 h-16 mx-auto text-yellow-400 mb-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                            <path d="M9 12l2 2 4-4"/>
                        </svg>
                        <h3 className="text-3xl font-black uppercase mb-3 text-yellow-400">Garantía de Satisfacción 60 Días</h3>
                        <p className="text-gray-300 max-w-lg mx-auto leading-relaxed">
                            Si no notas resultados en los primeros 60 días, te devolvemos el 100% de tu dinero sin preguntas. Tu bienestar es nuestra prioridad absoluta.
                        </p>
                    </div>

                    {/* Formulario COD */}
                    <div id="checkout-health" className="max-w-2xl mx-auto bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-full -mr-16 -mt-16"></div>
                        <div className="text-center mb-8 relative z-10">
                            <h3 className="text-2xl font-black text-slate-900 uppercase">Finaliza Tu Compra</h3>
                            <p className="text-slate-500 text-sm font-bold mt-2">Paga en efectivo al recibir. Sin tarjeta necesaria.</p>
                        </div>
                        <form className="space-y-5 relative z-10" onSubmit={(e) => e.preventDefault()}>
                            <div>
                                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">Nombre Completo</label>
                                <input type="text" className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all font-bold text-slate-900 placeholder:text-slate-300" placeholder="Tu nombre completo" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">WhatsApp / Celular</label>
                                <input type="tel" className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all font-bold text-slate-900 placeholder:text-slate-300" placeholder="Ej: 0987654321" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">Dirección de Entrega</label>
                                <textarea rows={2} className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all font-bold text-slate-900 placeholder:text-slate-300 resize-none" placeholder="Calle, número, ciudad y referencias..." />
                            </div>
                            <button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-5 rounded-2xl font-black text-lg uppercase tracking-widest shadow-lg shadow-teal-200 transition-all flex items-center justify-center gap-3">
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>
                                PEDIR Y PAGAR AL RECIBIR
                            </button>
                            <div className="flex items-center justify-center gap-6 pt-2 opacity-50">
                                <div className="flex items-center gap-1.5">
                                    <svg className="w-4 h-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
                                    <span className="text-[10px] font-black text-slate-500 uppercase">SSL Seguro</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <svg className="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="6" width="15" height="12" rx="2"/><path d="M16 10h4l3 3v5h-7V10z"/><circle cx="5.5" cy="20.5" r="1.5"/><circle cx="18.5" cy="20.5" r="1.5"/></svg>
                                    <span className="text-[10px] font-black text-slate-500 uppercase">Entrega Segura</span>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                {/* SECTION 10: FAQ */}
                <div id="faq" className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-black text-slate-900 uppercase">Preguntas Frecuentes</h2>
                        <p className="text-slate-500 font-medium mt-2">Resolvemos todas tus dudas</p>
                    </div>
                    <div className="space-y-4">
                        {[
                            { q: "¿Cuándo veré resultados?", a: "La mayoría de usuarios reportan mejoras notables en concentración y energía dentro de las primeras 2 semanas. Los resultados óptimos se alcanzan a las 4-6 semanas de uso continuo." },
                            { q: "¿Tiene efectos secundarios?", a: "No. Nuestra fórmula es 100% natural, orgánica y libre de estimulantes artificiales. Ha sido testeada clínicamente y es segura para uso diario prolongado." },
                            { q: "¿Cómo se toma?", a: "Toma 2 cápsulas al día con un vaso de agua, preferiblemente por la mañana con el desayuno para máxima absorción." },
                            { q: "¿Cuándo pago mi pedido?", a: "Pagas ÚNICAMENTE cuando recibes el producto en tus manos. No necesitas tarjeta de crédito. Cero riesgos." },
                            { q: "¿Tienen garantía de devolución?", a: "Sí, ofrecemos garantía de satisfacción de 60 días. Si no estás satisfecho, te devolvemos el 100% de tu dinero sin preguntas." }
                        ].map((faq, i) => (
                            <div key={i} className={`rounded-3xl border transition-all overflow-hidden ${faqOpen === i ? 'border-teal-200 bg-white shadow-xl' : 'border-slate-100 bg-slate-50/50 hover:bg-white'}`}>
                                <button className="w-full flex justify-between items-center p-6 font-black text-left text-slate-900 outline-none" onClick={() => setFaqOpen(faqOpen === i ? null : i)}>
                                    <span className="text-base leading-tight pr-4">{faq.q}</span>
                                    <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${faqOpen === i ? 'bg-teal-600 text-white rotate-180' : 'bg-slate-200 text-slate-500'}`}>
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
                                    </div>
                                </button>
                                {faqOpen === i && (
                                    <div className="px-6 pb-6 text-slate-600 font-medium leading-relaxed">{faq.a}</div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* SECTION 11: CTA Final */}
                <div className="text-center py-16 border-t border-slate-100">
                    <h2 className="text-4xl font-black text-slate-900 mb-4">Tu Bienestar No Puede Esperar</h2>
                    <p className="text-slate-500 text-lg max-w-xl mx-auto mb-8">
                        Stock limitado. Envío gratis por tiempo limitado. Empieza tu transformación hoy.
                    </p>
                    <div className="inline-block bg-teal-50 text-teal-700 font-black px-8 py-3 rounded-full text-xl uppercase tracking-widest border border-teal-100 mb-8">
                        Precio: {fmtPrice(product.price)}
                    </div>
                    <div>
                        <button onClick={() => document.getElementById('checkout-health')?.scrollIntoView({ behavior: 'smooth' })} className="bg-slate-900 hover:bg-slate-800 text-white px-16 py-6 rounded-2xl font-black text-xl uppercase tracking-widest shadow-2xl shadow-slate-200 transition-all inline-flex items-center gap-3">
                            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>
                            Pedir Ahora
                        </button>
                    </div>
                </div>
            </main>

            {/* Sticky Mobile Bar */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-lg bg-teal-900/90 backdrop-blur-md text-white px-8 py-4 rounded-3xl shadow-2xl flex justify-between items-center md:hidden">
                <div className="font-black text-xl">{fmtPrice(product.price)}</div>
                <button onClick={() => document.getElementById('checkout-health')?.scrollIntoView({ behavior: 'smooth' })} className="bg-white text-teal-900 font-black px-6 py-2 rounded-xl text-xs uppercase tracking-widest">Comprar</button>
            </div>
        </div>
    );
};

export default PdpPremiumHealth;
