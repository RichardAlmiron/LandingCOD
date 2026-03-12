import React from 'react';
import { StoreData, Product } from '@/lib/types';
import { Check, Star, ShieldCheck, Heart, Info, ArrowRight, UserCheck, Microscope } from 'lucide-react';

interface PdpPremiumHealthProps {
    data: StoreData;
    product: Product;
}

const PdpPremiumHealth: React.FC<PdpPremiumHealthProps> = ({ data, product }) => {
    return (
        <div className="bg-[#F8FAFC] text-[#1E293B] font-sans">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 py-4 px-6 md:px-12 flex justify-between items-center sticky top-0 z-50">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
                        <Heart className="w-5 h-5 text-white fill-current" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-slate-800 uppercase">Nuro-Balance</span>
                </div>
                <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-500">
                    <a href="#" className="hover:text-teal-600">Beneficios</a>
                    <a href="#" className="hover:text-teal-600">Ingredientes</a>
                    <a href="#" className="hover:text-teal-600">Ciencia</a>
                    <a href="#" className="hover:text-teal-600">FAQ</a>
                </nav>
                <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-full font-bold text-sm shadow-sm transition-all">
                    Comprar Ahora
                </button>
            </header>

            <main className="max-w-6xl mx-auto px-6 py-12 space-y-24">
                {/* Hero section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="order-2 lg:order-1 space-y-8">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-teal-600 font-bold text-sm uppercase tracking-widest">
                                <Microscope className="w-4 h-4" />
                                Formulado Científicamente
                            </div>
                            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight">
                                {product.title}:<br />
                                <span className="text-teal-600 font-black italic">Desbloquea tu Vitalidad.</span>
                            </h1>
                            <p className="text-lg text-slate-600 leading-relaxed font-medium">
                                Soporte botánico premium para claridad mental, enfoque y memoria. Respaldado por estudios clínicos y diseñado para tu rendimiento diario.
                            </p>
                        </div>

                        <div className="flex items-center gap-6">
                            <div className="flex text-yellow-500">
                                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-5 h-5 fill-current" />)}
                            </div>
                            <span className="text-sm font-bold text-slate-400">4.9/5 (342 reseñas)</span>
                        </div>

                        <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-8">
                            <div className="text-center sm:text-left">
                                <span className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-1">Suministro para 60 días</span>
                                <div className="text-4xl font-black text-slate-900">{product.price}</div>
                                <span className="text-teal-600 text-sm font-bold mt-1 block">Envío Express Gratis</span>
                            </div>
                            <button className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white px-10 py-5 rounded-2xl font-black text-lg transition-transform active:scale-95 shadow-lg shadow-slate-200">
                                AÑADIR AL CARRITO
                            </button>
                        </div>
                    </div>

                    <div className="order-1 lg:order-2 relative">
                        {/* Decorative elements */}
                        <div className="absolute inset-0 bg-teal-500/5 rounded-full blur-3xl scale-125"></div>
                        <div className="relative bg-white p-12 rounded-[3rem] shadow-2xl shadow-teal-900/10 border border-white">
                            <img src={product.imageUrl} alt={product.title} className="w-full h-auto object-contain drop-shadow-2xl" />
                        </div>
                    </div>
                </div>

                {/* Clinical results section */}
                <div className="bg-white rounded-[3.5rem] p-12 md:p-20 shadow-xl shadow-slate-200/50 border border-white text-center space-y-12">
                    <div className="max-w-2xl mx-auto space-y-4">
                        <h2 className="text-3xl font-black text-slate-900 uppercase">Resultados Clínicos Comprobados</h2>
                        <p className="text-slate-500 font-medium italic">Soporte botánico premium para claridad mental, enfoque y memoria.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Chart Placeholders */}
                        <div className="space-y-4">
                            <div className="bg-slate-50 h-64 rounded-2xl border border-slate-100 p-6 flex flex-col justify-end gap-2">
                                <div className="flex gap-4 items-end justify-center h-full pb-8">
                                    <div className="w-8 bg-teal-200 rounded-t-md h-[40%]"></div>
                                    <div className="w-8 bg-teal-400 rounded-t-md h-[60%]"></div>
                                    <div className="w-8 bg-teal-600 rounded-t-md h-[85%]"></div>
                                    <div className="w-8 bg-teal-700 rounded-t-md h-[100%]"></div>
                                </div>
                                <div className="text-xs font-black text-slate-400 uppercase tracking-widest">Mejora de Memoria (12 semanas)</div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="bg-slate-50 h-64 rounded-2xl border border-slate-100 p-6 flex items-center justify-center">
                                <div className="relative w-40 h-40 border-[12px] border-slate-200 rounded-full flex items-center justify-center">
                                    <div className="absolute inset-0 border-[12px] border-teal-600 rounded-full border-t-transparent border-r-transparent -rotate-45"></div>
                                    <div className="text-3xl font-black text-slate-900">87%</div>
                                </div>
                                <div className="text-left ml-8 max-w-[150px]">
                                    <div className="text-sm font-black text-slate-900 mb-1">Efectividad Verificada</div>
                                    <div className="text-xs text-slate-400">Pacientes reportaron mejora en la concentración.</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-12 pt-12">
                        {[
                            { label: "Producto Orgánico" },
                            { label: "No-GMO" },
                            { label: "Sin Gluten" },
                            { label: "Vegano" },
                            { label: "Testeado 3ra Parte" },
                            { label: "GMP Certificado" }
                        ].map((badge, i) => (
                            <div key={i} className="flex flex-col items-center gap-3">
                                <div className="w-16 h-16 rounded-full border-2 border-slate-200 flex items-center justify-center p-3">
                                    <ShieldCheck className="w-full h-full text-teal-600" />
                                </div>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{badge.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Testimonials */}
                <div className="space-y-12">
                    <div className="text-center">
                        <h2 className="text-3xl font-black text-slate-900">Historias de Usuarios Verificados</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="bg-white p-8 rounded-[2rem] shadow-lg shadow-slate-200/50 border border-slate-50 space-y-4">
                                <div className="flex text-yellow-400 gap-1">
                                    {[1, 2, 3, 4, 5].map(j => <Star key={j} className="w-4 h-4 fill-current" />)}
                                </div>
                                <p className="text-slate-600 font-medium italic">"{i === 1 ? '¡Realmente cambió mi forma de trabajar! Me siento más enfocado que nunca.' : 'Increíble producto, envío súper rápido y resultados reales.'}"</p>
                                <div className="flex items-center gap-4 pt-4">
                                    <div className="w-12 h-12 bg-slate-200 rounded-full"></div>
                                    <div>
                                        <div className="font-black text-sm">{i === 1 ? 'Sara J.' : i === 2 ? 'Marcos L.' : 'Elena P.'}</div>
                                        <div className="text-xs text-slate-400 font-bold uppercase tracking-widest">Comprador Verificado</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            {/* Sticky Order Bar */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-lg bg-teal-900/90 backdrop-blur-md text-white px-8 py-4 rounded-3xl shadow-2xl flex justify-between items-center md:hidden">
                <div className="font-black text-xl">{product.price}</div>
                <button className="bg-white text-teal-900 font-black px-6 py-2 rounded-xl text-xs uppercase tracking-widest">Añadir</button>
            </div>
        </div>
    );
};

export default PdpPremiumHealth;
