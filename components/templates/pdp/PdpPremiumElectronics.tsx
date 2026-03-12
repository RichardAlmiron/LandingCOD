import React from 'react';
import { StoreData, Product } from '@/lib/types';
import { Cpu, Zap, Camera, Smartphone, Globe, Shield, CreditCard, ArrowRight, Star } from 'lucide-react';

interface PdpPremiumElectronicsProps {
    data: StoreData;
    product: Product;
}

const PdpPremiumElectronics: React.FC<PdpPremiumElectronicsProps> = ({ data, product }) => {
    return (
        <div className="bg-[#050510] text-[#E0E0FF] font-sans selection:bg-cyan-500/30 overflow-x-hidden">
            {/* Header */}
            <header className="py-6 px-10 flex justify-between items-center border-b border-white/5 backdrop-blur-md sticky top-0 z-50">
                <div className="text-xl font-black tracking-[0.2em] text-cyan-400">
                    NEXUS <span className="text-purple-400">NOVA X</span>
                </div>
                <nav className="hidden md:flex gap-10 text-xs font-bold tracking-[0.15em] uppercase text-gray-400">
                    <a href="#" className="hover:text-cyan-400 transition-colors">Features</a>
                    <a href="#" className="hover:text-cyan-400 transition-colors">Specs</a>
                    <a href="#" className="hover:text-cyan-400 transition-colors">Gallery</a>
                    <a href="#" className="hover:text-cyan-400 transition-colors">Support</a>
                </nav>
                <button className="bg-white/5 hover:bg-white/10 text-[10px] font-black tracking-widest uppercase px-6 py-2 rounded-full border border-white/10 transition-all">
                    Sign In
                </button>
            </header>

            <main className="max-w-7xl mx-auto px-6 pt-12">
                {/* Hero Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[70vh]">
                    <div className="space-y-8 relative">
                        {/* Decorative Blur */}
                        <div className="absolute -top-20 -left-20 w-64 h-64 bg-cyan-500/10 blur-[100px] rounded-full"></div>
                        
                        <div className="space-y-4">
                            <h2 className="text-cyan-500 font-bold tracking-[0.3em] uppercase text-sm">Nexus Nova X</h2>
                            <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter">
                                THE FUTURE.<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
                                    UNVEILED.
                                </span>
                            </h1>
                            <p className="max-w-md text-gray-400 text-lg leading-relaxed">
                                Experimenta la evolución tecnológica definitiva. {product.title} redefine los límites del rendimiento y la elegancia.
                            </p>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                            <div className="space-y-1">
                                <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">Starting from</span>
                                <div className="text-3xl font-black text-white">{product.price}</div>
                            </div>
                            <div className="flex gap-4">
                                <button className="bg-cyan-500 hover:bg-cyan-400 text-black px-10 py-5 rounded-xl font-black tracking-widest uppercase text-sm shadow-[0_0_30px_rgba(34,211,238,0.35)] transition-all active:scale-95">
                                    Pre-Order Now
                                </button>
                                <button className="bg-white/5 hover:bg-white/10 text-white px-8 py-5 rounded-xl font-black tracking-widest uppercase text-sm border border-white/10 transition-all">
                                    Learn More
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="relative group">
                        {/* Phone Mockup Placeholder */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 blur-[120px] rounded-full scale-110"></div>
                        <div className="relative bg-gradient-to-b from-white/10 to-transparent p-1 rounded-[3rem] shadow-2xl border border-white/20 overflow-hidden">
                            <img 
                                src={product.imageUrl} 
                                alt={product.title} 
                                className="w-full rounded-[2.8rem] opacity-90 group-hover:scale-105 transition-transform duration-700"
                            />
                            {/* Reflexes Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none"></div>
                        </div>
                    </div>
                </div>

                {/* Grid Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-32 mb-32">
                    <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-12 space-y-6 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 blur-[50px] group-hover:bg-cyan-500/10 transition-colors"></div>
                        <h3 className="text-3xl font-black tracking-tighter">PREMIUM DESIGN.<br /><span className="text-gray-500">UNMATCHED POWER.</span></h3>
                        <div className="grid grid-cols-2 gap-4 pt-6">
                            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                                <img src={product.imageUrl} className="h-32 w-full object-cover rounded-xl mb-4 opacity-50" />
                                <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">Ultrathin Form</div>
                            </div>
                            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                                <img src={product.imageUrl} className="h-32 w-full object-cover rounded-xl mb-4 opacity-50" />
                                <div className="text-[10px] font-bold text-purple-400 uppercase tracking-widest">Aura Display</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-12 space-y-8">
                        <h3 className="text-xs font-black tracking-[0.3em] uppercase text-gray-500">Technical Specifications</h3>
                        <div className="space-y-6">
                            {[
                                { icon: <Cpu className="w-5 h-5" />, label: "Processor", value: "Quantum Core X1, 4nm" },
                                { icon: <Smartphone className="w-5 h-5" />, label: "Display", value: "6.9\" Dynamic OLED 4K" },
                                { icon: <Zap className="w-5 h-5" />, label: "Battery", value: "6500mAh HyperCharge" },
                                { icon: <Camera className="w-5 h-5" />, label: "Camera", value: "200MP Ultra-Matrix" }
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

                {/* Horizontal Features */}
                <div className="flex flex-wrap justify-center gap-16 py-20 border-t border-white/5">
                    {[
                        { icon: <Globe className="w-8 h-8" />, title: "Global Connectivity", desc: "Next-gen 6G Ready" },
                        { icon: <Shield className="w-8 h-8" />, title: "Quantum Secure", desc: "Military Encryption" },
                        { icon: <CreditCard className="w-8 h-8" />, title: "Trade-In Program", desc: "Save up to $500" }
                    ].map((item, i) => (
                        <div key={i} className="text-center group max-w-[200px]">
                            <div className="inline-flex p-4 rounded-2xl bg-white/5 border border-white/10 mb-6 group-hover:border-cyan-500/50 transition-colors">
                                <div className="text-cyan-400">{item.icon}</div>
                            </div>
                            <h4 className="font-black text-sm uppercase tracking-widest mb-2">{item.title}</h4>
                            <p className="text-xs text-gray-500 font-bold">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </main>

            {/* Sticky Order Bar Mobile */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#050510]/80 backdrop-blur-xl border-t border-white/10 p-4 z-50 flex justify-between items-center">
                <div className="font-black text-xl">{product.price}</div>
                <button className="bg-cyan-500 text-black px-8 py-3 rounded-lg font-black uppercase text-xs">
                    Buy Now
                </button>
            </div>
        </div>
    );
};

export default PdpPremiumElectronics;
