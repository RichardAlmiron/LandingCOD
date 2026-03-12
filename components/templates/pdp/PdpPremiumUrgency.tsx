import React, { useState, useEffect } from 'react';
import { StoreData, Product } from '@/lib/types';
import { ShoppingCart, Star, Clock, AlertTriangle, Zap, ArrowRight, ShieldCheck, Truck, Users } from 'lucide-react';

interface PdpPremiumUrgencyProps {
    data: StoreData;
    product: Product;
}

const PdpPremiumUrgency: React.FC<PdpPremiumUrgencyProps> = ({ data, product }) => {
    const [timeLeft, setTimeLeft] = useState(3600 * 24 + 1421); // 24h+ for demo

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number) => {
        const d = Math.floor(seconds / (3600 * 24));
        const h = Math.floor((seconds % (3600 * 24)) / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return { d, h, m, s };
    };

    const time = formatTime(timeLeft);

    return (
        <div className="bg-[#0A0A0A] text-white font-sans overflow-x-hidden selection:bg-red-600/30">
            {/* Header */}
            <header className="bg-black/80 backdrop-blur-md py-4 px-6 flex justify-between items-center sticky top-0 z-50 border-b border-white/5">
                <div className="text-2xl font-black italic tracking-tighter flex items-center gap-2">
                    <span className="text-red-600">AURA</span> AUDIO
                </div>
                <div className="flex gap-4">
                    <div className="relative p-2 hover:bg-white/5 rounded-full transition-colors cursor-pointer">
                        <ShoppingCart className="w-6 h-6" />
                        <span className="absolute top-0 right-0 bg-red-600 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-black">1</span>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Left: Product Images */}
                    <div className="space-y-6">
                        <div className="bg-[#151515] rounded-3xl overflow-hidden border border-white/5 group relative">
                            <img src={product.imageUrl} alt={product.title} className="w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute top-6 left-6 bg-red-600 text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest animate-pulse shadow-lg shadow-red-900/40">
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
                        
                        <div className="bg-red-600/10 border border-red-600/20 p-6 rounded-3xl flex items-center gap-6">
                            <div className="bg-red-600 p-3 rounded-2xl">
                                <Users className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <div className="font-black text-white">{i === 1 ? 'Sara J.' : 'Alguien'} acaba de comprar</div>
                                <div className="text-xs text-red-500 font-bold uppercase tracking-widest">Hace 2 minutos</div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Order Section */}
                    <div className="space-y-10">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-red-500 font-black text-xs uppercase tracking-[0.2em] animate-pulse">
                                <Zap className="w-4 h-4 fill-current" /> LA OFERTA EXCLUSIVA TERMINA EN:
                            </div>
                            
                            {/* Countdown Timer */}
                            <div className="grid grid-cols-4 gap-4">
                                {[
                                    { v: time.d, l: 'DÍAS' },
                                    { v: time.h, l: 'HRS' },
                                    { v: time.m, l: 'MINS' },
                                    { v: time.s, l: 'SECS' }
                                ].map((t, i) => (
                                    <div key={i} className="bg-[#151515] rounded-2xl p-4 border border-white/5 text-center shadow-xl">
                                        <div className="text-4xl font-black tracking-tighter leading-none mb-1">{t.v.toString().padStart(2, '0')}</div>
                                        <div className="text-[10px] font-black text-gray-500 tracking-widest">{t.l}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h1 className="text-5xl md:text-6xl font-black leading-[0.95] tracking-tighter">
                                {product.title}
                            </h1>
                            <div className="flex items-center gap-2 pt-2">
                                <div className="flex text-red-600">
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                                </div>
                                <span className="text-xs font-black text-gray-500 uppercase tracking-widest">Insuperable!</span>
                            </div>
                        </div>

                        <div className="flex items-baseline gap-6">
                            <div className="text-5xl font-black text-white">{product.price}</div>
                            <div className="text-2xl text-gray-600 line-through font-bold">{product.originalPrice}</div>
                            <div className="text-red-500 font-black text-sm uppercase tracking-widest">Ahorra $100 + Envío Gratis</div>
                        </div>

                        <div className="space-y-4">
                            <div className="p-4 bg-red-600/20 border-l-4 border-red-600 rounded-r-xl flex items-center gap-3">
                                <AlertTriangle className="w-5 h-5 text-red-500" />
                                <span className="text-sm font-black text-red-500 uppercase tracking-widest">¡SOLO QUEDAN 3 UNIDADES EN STOCK!</span>
                            </div>

                            <button className="w-full bg-red-600 hover:bg-red-700 text-white py-6 rounded-2xl font-black text-xl shadow-2xl shadow-red-900/40 transition-all flex items-center justify-center gap-3 group">
                                COMPRAR AHORA - AHORRA $100
                                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                            </button>
                            
                            <button className="w-full bg-white/5 hover:bg-white/10 text-white py-4 rounded-2xl font-black text-base transition-all border border-white/5">
                                Añadir al Carrito
                            </button>
                        </div>

                        {/* Trust & Badges */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-white/5 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
                            <div className="flex flex-col items-center gap-2">
                                <ShieldCheck className="w-6 h-6" />
                                <span className="text-[10px] font-black uppercase text-center">Garantía Total</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <Truck className="w-6 h-6" />
                                <span className="text-[10px] font-black uppercase text-center">Envío Express</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <div className="font-black text-lg">BT 5.3</div>
                                <span className="text-[10px] font-black uppercase text-center">Conexión Pro</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <div className="font-black text-lg">40hr</div>
                                <span className="text-[10px] font-black uppercase text-center">Batería</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Review section preview */}
                <div className="mt-32 space-y-12">
                    <h2 className="text-3xl font-black text-center text-red-600 italic tracking-tighter">FLASH SALE <span className="text-white">LIVE</span></h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="bg-[#151515] p-8 rounded-3xl border border-white/5 space-y-4">
                                <div className="flex text-red-600 gap-1">
                                    {[1, 2, 3, 4, 5].map(j => <Star key={j} className="w-3 h-3 fill-current" />)}
                                </div>
                                <h4 className="font-black text-lg">"{i === 1 ? '¡Sonido Imbatible!' : '¡Urgencia Real!'}"</h4>
                                <div className="text-sm text-gray-500 leading-relaxed font-medium">Este producto superó mis expectativas. La calidad de construcción y el sonido son de otro nivel. No duden en comprarlo antes de que se agote.</div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PdpPremiumUrgency;
