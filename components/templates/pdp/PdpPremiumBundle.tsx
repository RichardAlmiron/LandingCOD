import React from 'react';
import { StoreData, Product } from '@/lib/types';
import { ShoppingCart, Star, Check, Shield, Truck, Zap, Plus, ArrowRight } from 'lucide-react';

interface PdpPremiumBundleProps {
    data: StoreData;
    product: Product;
}

const PdpPremiumBundle: React.FC<PdpPremiumBundleProps> = ({ data, product }) => {
    return (
        <div className="bg-white font-sans text-gray-900 pb-20">
            {/* Top Promo Bar */}
            <div className="bg-orange-500 text-white py-2 px-4 text-center font-bold text-sm tracking-wide">
                🔥 OFERTA LIMITADA: ¡SHAKER GRATIS con cada Bundle! 🔥
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
                        <div className="bg-gray-50 rounded-3xl overflow-hidden aspect-square flex items-center justify-center relative shadow-inner">
                            <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover" />
                            <div className="absolute top-4 left-4 bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full uppercase">
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
                                {product.title}
                            </h1>
                            <div className="flex items-baseline gap-4">
                                <span className="text-4xl font-black text-green-700">{product.price}</span>
                                <span className="text-xl text-gray-400 line-through font-bold">{product.originalPrice}</span>
                                <span className="bg-red-100 text-red-700 text-xs font-black px-2 py-1 rounded">AHORRA 33%</span>
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

                {/* FAQ section simplified */}
                <div className="mt-24 max-w-4xl mx-auto space-y-12">
                    <div className="text-center">
                        <h2 className="text-3xl font-black mb-4">Preguntas Frecuentes</h2>
                        <div className="h-1 w-20 bg-green-600 mx-auto rounded-full"></div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8 text-left">
                        <div>
                            <h4 className="font-bold text-gray-900 mb-2">Q: ¿Cómo se toma el bundle?</h4>
                            <p className="text-sm text-gray-600">Simplemente mezcla una porción con agua fría en tu shaker gratuito y disfruta una vez al día.</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 mb-2">Q: ¿Es apto para veganos?</h4>
                            <p className="text-sm text-gray-600">Sí, todos nuestros ingredientes son de origen vegetal y libres de crueldad animal.</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 mb-2">Q: ¿Tienen garantía?</h4>
                            <p className="text-sm text-gray-600">Por supuesto. Si no estás 100% satisfecho, te devolvemos el dinero en los primeros 30 días.</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 mb-2">Q: ¿Cuánto tarda el envío?</h4>
                            <p className="text-sm text-gray-600">Entrega express en 24-48 horas hábiles en las principales ciudades.</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PdpPremiumBundle;
