'use client';
import React, { useState } from 'react';
import { StoreData, Product } from '@/lib/types';
import { ShoppingCart, Star, Check, Shield, Truck, Zap, Plus, ArrowRight } from 'lucide-react';
import EnhancedProductGallery from '@/components/pdp/EnhancedProductGallery';
import { TrustBar, FeatureGrid, ComparisonTable, HowItWorks } from '@/components/pdp/SharedCRO';
import ProductShowcase from '@/components/pdp/ProductShowcase';

interface PdpPremiumBundleProps {
    data: StoreData;
    product: Product;
}

const PdpPremiumBundle: React.FC<PdpPremiumBundleProps> = ({ data, product }) => {
    const [faqOpen, setFaqOpen] = useState<number | null>(null);
    const ai = product.aiContent;
    const sec = ai?.sections;
    const fmtPrice = (n: number) => {
      const str = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      return `Gs. ${str}`;
    };
    return (
        <div className="bg-white font-sans text-gray-900 pb-20">
            {/* Top Promo Bar */}
            <div className="bg-orange-500 text-white py-2 px-4 text-center font-bold text-sm tracking-wide">
                <svg className="w-4 h-4 inline mr-1 -mt-0.5" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                OFERTA LIMITADA: SHAKER GRATIS con cada Bundle
                <svg className="w-4 h-4 inline ml-1 -mt-0.5" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            </div>

            {/* Header */}
            <header className="py-4 px-6 border-b flex justify-between items-center bg-white sticky top-0 z-50">
                <div className="text-2xl font-black text-green-700 tracking-tighter">
                    VITALIFE
                </div>
                <nav className="hidden md:flex gap-8 font-semibold text-gray-600">
                    <a href="#" className="hover:text-green-700">Tienda</a>
                    <a href="#" className="hover:text-green-700 text-green-700 border-b-2 border-green-700">Bundles</a>
                    <a href="#" className="hover:text-green-700">Nosotros</a>
                </nav>
                <div className="flex gap-4 items-center">
                    <span className="font-bold text-sm hidden sm:inline">Mi Cuenta</span>
                    <div className="relative">
                        <ShoppingCart className="w-6 h-6" />
                        <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">1</span>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 mt-8">
                {/* Breadcrumbs */}
                <div className="text-xs text-gray-400 mb-6 flex gap-2">
                    <span>Inicio</span> <span>›</span> <span>Bundles</span> <span>›</span> <span className="text-gray-900">{product.title}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Left: Product Media */}
                    <div className="space-y-4 sticky top-24">
 <div className="bg-gray-50 rounded-3xl flex items-center justify-center relative shadow-inner"> 
                            <EnhancedProductGallery 
                                product={product}
                                accentColor="#16a34a"
                            />
                            <div className="absolute top-4 left-4 bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full uppercase z-10">
                                Bundle Popular
                            </div>
                        </div>
                        <div className="grid grid-cols-5 gap-2">
                            {[1, 2, 3, 4, 5].map(i => (
                                <div key={i} className={`aspect-square rounded-xl overflow-hidden border-2 h-16 sm:h-20 ${i === 1 ? 'border-green-600' : 'border-transparent bg-gray-100 hover:border-gray-200 cursor-pointer'}`}>
                                    <img src={product.imageUrl} alt={`view ${i}`} className="w-full h-full object-cover opacity-80" />
                                </div>
                            ))}
                        </div>

                        {/* Features List */}
                        <div className="pt-8 border-t border-gray-100">
                            <h3 className="font-bold text-lg mb-4 text-gray-800">Beneficios Destacados</h3>
                            <div className="grid grid-cols-2 gap-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="bg-green-100 p-2 rounded-full"><Check className="w-4 h-4 text-green-700" /></div>
                                    <span className="text-sm font-medium">No-GMO</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="bg-green-100 p-2 rounded-full"><Check className="w-4 h-4 text-green-700" /></div>
                                    <span className="text-sm font-medium">100% Vegano</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="bg-green-100 p-2 rounded-full"><Check className="w-4 h-4 text-green-700" /></div>
                                    <span className="text-sm font-medium">Testeado 3ra Parte</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="bg-green-100 p-2 rounded-full"><Check className="w-4 h-4 text-green-700" /></div>
                                    <span className="text-sm font-medium">Sabor Natural</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Product Info & Bundle Selection */}
                    <div className="space-y-8">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <div className="flex text-yellow-400">
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                                </div>
                                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">312 RESEÑAS VERIFICADAS</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-[1.1] mb-4">
                                {ai?.enhancedTitle || product.title}
                            </h1>
                            <div className="flex items-baseline gap-4">
                                <span className="text-4xl font-black text-green-700">{fmtPrice(product.price)}</span>
                                <span className="text-xl text-gray-400 line-through font-bold">{fmtPrice(product.originalPrice)}</span>
                                {product.discount && product.discount > 0 && (
                                    <span className="bg-red-100 text-red-700 text-xs font-black px-2 py-1 rounded">AHORRA {product.discount}%</span>
                                )}
                            </div>
                        </div>

                        <button className="w-full bg-green-600 hover:bg-green-700 text-white py-6 rounded-2xl font-black text-xl shadow-lg shadow-green-200 transition-all flex items-center justify-center gap-3">
                            <ShoppingCart className="w-6 h-6" />
                            AÑADIR BUNDLE AL CARRITO
                        </button>

                        <div className="p-6 bg-green-50 rounded-3xl border-2 border-green-100 relative overflow-hidden">
                            <div className="absolute top-4 right-4 text-green-200 rotate-12">
                                <Star className="w-24 h-24 fill-current" />
                            </div>
                            <h2 className="text-2xl font-black text-gray-900 mb-6 relative z-10">¡ARMA TU BUNDLE Y AHORRA MÁS!</h2>
                            
                            <div className="space-y-4 relative z-10">
                                {/* Bundle Options */}
                                <div className="group bg-white p-5 rounded-2xl border-2 border-green-600 shadow-sm cursor-pointer hover:shadow-md transition-all">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Mejor Valor</span>
                                            <h3 className="font-black text-lg mt-1">KIT PROFESIONAL: COMPRA 2 LLEVA 1 GRATIS</h3>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-lg font-black text-green-700">$99.98</div>
                                            <div className="text-[10px] font-bold text-red-600">AHORRA $49.99!</div>
                                        </div>
                                    </div>
                                    <button className="w-full mt-2 bg-green-600 text-white py-2 rounded-xl font-bold text-sm">Elegir 3 y Ahorrar</button>
                                </div>

                                <div className="group bg-white/60 p-5 rounded-2xl border-2 border-transparent hover:border-green-200 cursor-pointer transition-all">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-bold text-gray-700 text-base">PACK INICIAL: LLÉVATE 2 CON 50% DCTO</h3>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-base font-bold text-gray-900">$74.99</div>
                                            <div className="text-[10px] font-bold text-gray-500">AHORRA $25.00!</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="group bg-white/60 p-5 rounded-2xl border-2 border-transparent hover:border-green-200 cursor-pointer transition-all">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-bold text-gray-700 text-base">PACK FAMILIAR: COMPRA 4 LLEVA 3</h3>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-base font-bold text-gray-900">$149.97</div>
                                            <div className="text-[10px] font-bold text-gray-500">AHORRA $48.99!</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Upsell section */}
                        <div>
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">COMPLETA TU RUTINA</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="bg-gray-50 p-4 rounded-2xl flex items-center gap-4 border border-transparent hover:border-gray-200 transition-all cursor-pointer">
                                    <div className="h-16 w-16 bg-white rounded-xl flex items-center justify-center p-2 shadow-sm">
                                        <img src={product.imageUrl} className="h-full object-contain" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-xs font-bold truncate">Probiotic Complex</div>
                                        <div className="text-green-700 font-bold text-sm">+$24.99</div>
                                    </div>
                                    <button className="bg-green-600 text-white h-8 w-8 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-2xl flex items-center gap-4 border border-transparent hover:border-gray-200 transition-all cursor-pointer">
                                    <div className="h-16 w-16 bg-white rounded-xl flex items-center justify-center p-2 shadow-sm">
                                        <img src={product.imageUrl} className="h-full object-contain" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-xs font-bold truncate">Superfood Powder</div>
                                        <div className="text-green-700 font-bold text-sm">+$19.99</div>
                                    </div>
                                    <button className="bg-green-600 text-white h-8 w-8 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Social Proof */}
                        <div className="pt-8 border-t border-gray-100 flex flex-wrap gap-x-8 gap-y-4">
                            <div className="flex items-center gap-2">
                                <Shield className="w-5 h-5 text-gray-400" />
                                <span className="text-xs font-bold text-gray-500">Compra Segura</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Truck className="w-5 h-5 text-gray-400" />
                                <span className="text-xs font-bold text-gray-500">Envío Gratis</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Zap className="w-5 h-5 text-gray-400" />
                                <span className="text-xs font-bold text-gray-500">Garantía 30 días</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* SECCIÓN: Trust Bar */}
                <div className="mt-16">
                    <TrustBar />
                </div>

                {/* SECCIÓN: Características del Producto */}
                <div className="mt-24">
                    <FeatureGrid iconColor="text-green-600" bgClass="bg-green-50" />
                </div>

                {/* SECCIÓN: Product Showcase - Espacios Visuales */}
                <div className="mt-24">
                    <ProductShowcase product={product} accentColor="#16a34a" />
                </div>

                {/* FAQ section simplified */}
                <div className="mt-24 max-w-4xl mx-auto space-y-12">
                    <div className="text-center">
                        <h2 className="text-3xl font-black mb-4">Preguntas Frecuentes</h2>
                        <div className="h-1 w-20 bg-green-600 mx-auto rounded-full"></div>
                    </div>
                    <div className="space-y-4">
                        {[
                            { q: "¿Cómo se toma el bundle?", a: "Simplemente mezcla una porción con agua fría en tu shaker gratuito y disfruta una vez al día. Ideal por la mañana." },
                            { q: "¿Es apto para veganos?", a: "Sí, todos nuestros ingredientes son de origen vegetal y libres de crueldad animal. 100% plant-based." },
                            { q: "¿Tienen garantía?", a: "Por supuesto. Si no estás 100% satisfecho, te devolvemos el dinero en los primeros 30 días sin preguntas." },
                            { q: "¿Cuánto tarda el envío?", a: "Entrega express en 24-48 horas hábiles en las principales ciudades con seguimiento en tiempo real." },
                            { q: "¿Cuándo pago?", a: "Pagas ÚNICAMENTE cuando recibes el producto en tus manos. No necesitas tarjeta de crédito. Cero riesgos." }
                        ].map((faq, i) => (
                            <div key={i} className={`rounded-2xl border transition-all overflow-hidden ${faqOpen === i ? 'border-green-300 bg-white shadow-lg' : 'border-gray-100 bg-gray-50/50 hover:bg-white'}`}>
                                <button className="w-full flex justify-between items-center p-5 font-bold text-left text-gray-900 outline-none" onClick={() => setFaqOpen(faqOpen === i ? null : i)}>
                                    <span className="text-base leading-tight pr-4">{faq.q}</span>
                                    <div className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all ${faqOpen === i ? 'bg-green-600 text-white rotate-180' : 'bg-gray-200 text-gray-500'}`}>
                                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg>
                                    </div>
                                </button>
                                {faqOpen === i && (
                                    <div className="px-5 pb-5 text-gray-600 font-medium leading-relaxed">{faq.a}</div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Reseñas Verificadas */}
                <div className="mt-24 max-w-5xl mx-auto space-y-12">
                    <div className="text-center">
                        <div className="flex justify-center gap-1 mb-3">
                            {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />)}
                        </div>
                        <h2 className="text-3xl font-black mb-2">Lo Que Dicen Nuestros Clientes</h2>
                        <p className="text-gray-400 text-sm font-bold">4.9/5 basado en 312 reseñas verificadas</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { name: "Patricia R.", text: "El bundle profesional es increíble. La calidad del producto se nota desde el primer uso. El shaker gratis fue un plus genial.", badge: "Compra Verificada" },
                            { name: "Diego M.", text: "Llevo 2 meses con el pack y los resultados son reales. Envío súper rápido y el sabor es delicioso.", badge: "Top Reviewer" },
                            { name: "Valentina S.", text: "Mejor inversión en mi salud. El pack familiar nos sale perfecto para toda la casa. Recomendado al 100%.", badge: "Compra Verificada" }
                        ].map((review, i) => (
                            <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-3">
                                <div className="flex gap-1">{[1,2,3,4,5].map(j => <Star key={j} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />)}</div>
                                <p className="text-gray-600 font-medium italic leading-relaxed text-sm">"{review.text}"</p>
                                <div className="flex items-center gap-3 pt-2">
                                    <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-black text-sm">{review.name[0]}</div>
                                    <div>
                                        <div className="font-bold text-sm">{review.name}</div>
                                        <div className="text-[10px] text-green-600 font-bold uppercase tracking-widest">{review.badge}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* SECCIÓN: Comparación con Competencia */}
                <div className="mt-24">
                    <ComparisonTable productName={ai?.enhancedTitle || product.title} />
                </div>

                {/* SECCIÓN: Cómo Funciona */}
                <div className="mt-24">
                    <HowItWorks />
                </div>

                {/* Garantía */}
                <div className="mt-24 max-w-4xl mx-auto bg-gray-900 text-white rounded-3xl p-12 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-[60px]"></div>
                    <Shield className="w-14 h-14 mx-auto text-yellow-400 mb-4" />
                    <h3 className="text-2xl font-black uppercase mb-3 text-yellow-400">Garantía de Satisfacción 30 Días</h3>
                    <p className="text-gray-300 max-w-lg mx-auto leading-relaxed">
                        Si no estás 100% satisfecho con tu bundle, te devolvemos el dinero completo sin preguntas. Tu bienestar es nuestra prioridad.
                    </p>
                </div>

                {/* Formulario COD */}
                <div id="checkout-bundle" className="mt-24 max-w-2xl mx-auto bg-white rounded-3xl p-10 shadow-2xl border border-gray-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full -mr-16 -mt-16"></div>
                    <div className="text-center mb-8 relative z-10">
                        <h3 className="text-2xl font-black text-gray-900 uppercase">Finaliza Tu Compra</h3>
                        <p className="text-gray-500 text-sm font-bold mt-2">Paga en efectivo al recibir. Sin tarjeta necesaria.</p>
                    </div>
                    <form className="space-y-5 relative z-10" onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-1">Nombre Completo</label>
                            <input type="text" className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all font-bold text-gray-900 placeholder:text-gray-300" placeholder="Tu nombre completo" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-1">WhatsApp / Celular</label>
                            <input type="tel" className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all font-bold text-gray-900 placeholder:text-gray-300" placeholder="Ej: 0987654321" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 ml-1">Dirección de Entrega</label>
                            <textarea rows={2} className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-green-500/10 focus:border-green-500 outline-none transition-all font-bold text-gray-900 placeholder:text-gray-300 resize-none" placeholder="Calle, número, ciudad y referencias..." />
                        </div>
                        <button className="w-full bg-green-600 hover:bg-green-700 text-white py-5 rounded-2xl font-black text-lg uppercase tracking-widest shadow-lg shadow-green-200 transition-all flex items-center justify-center gap-3">
                            <ShoppingCart className="w-6 h-6" />
                            PEDIR Y PAGAR AL RECIBIR
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default PdpPremiumBundle;
