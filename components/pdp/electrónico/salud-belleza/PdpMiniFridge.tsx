'use client';
import React, { useState } from 'react';
import { StoreData, Product } from '@/lib/types';
import EnhancedProductGallery from '@/components/pdp/EnhancedProductGallery';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { data: StoreData; product: Product; }

const PdpMiniFridge: React.FC<Props> = ({ data, product }) => {
    const [openSpecAcc, setOpenSpecAcc] = useState<number | null>(0);
    const [faqOpen, setFaqOpen] = useState<number | null>(null);
    const ai = product.aiContent;
    const fmtPrice = (n: number) => { const s = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); return `Gs. ${s}`; };
    
    // Aesthetic Palette: Clean Beauty / Soft Pink
    const bg = '#fff5f7'; // Rose 50
    const textMain = '#881337'; // Rose 900
    const accentPink = '#ec4899'; // Pink 500
    const accentWhite = '#ffffff';

    return (
        <div style={{ background: bg, color: textMain, fontFamily: "'Inter', sans-serif" }} className="overflow-x-hidden selection:bg-pink-300/30 selection:text-rose-900 antialiased">
            
            {/* 1. TOP NAV (Beauty Salon) */}
            <header className="sticky top-0 z-50 bg-[#fff5f7]/80 backdrop-blur-2xl border-b border-pink-100">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-400 to-rose-300 p-[2px]">
                            <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                                <span className="text-pink-500 font-serif italic text-lg leading-none">f</span>
                            </div>
                        </div>
                        <span className="font-serif text-2xl tracking-widest text-rose-900 uppercase">
                            GLOW<span className="font-sans font-light text-pink-500 text-sm tracking-widest ml-1">VAULT</span>
                        </span>
                    </div>
                </div>
            </header>

            <main className="relative z-10 w-full overflow-hidden">
                {/* 2. BREADCRUMBS & LOGISTICS */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 pt-6 pb-2">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-pink-600 bg-white px-4 py-2 rounded-full border border-pink-100 shadow-sm inline-flex items-center gap-2">
                            BEAUTY TECH / <span className="text-rose-900">{product.title.substring(0, 15)}...</span>
                        </div>
                        <div className="inline-flex items-center gap-2 text-[10px] font-bold text-rose-800 uppercase tracking-widest border-b border-pink-200 pb-1">
                            PAGO C.O.D (AL RECIBIR)
                        </div>
                    </div>
                </div>

                {/* 3. HERO SECTION (SOFT BEAUTY) */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 lg:py-16 relative">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-center">
                        <div className="flex flex-col relative z-20 lg:col-span-5">
                            <div className="flex items-center gap-2 mb-6">
                                <span className="bg-pink-100 text-pink-600 border border-pink-200 text-[9px] uppercase font-bold tracking-[0.3em] px-3 py-1 rounded-full">
                                    CONSERVACIÓN EN FRÍO 8°C
                                </span>
                            </div>
                            
                            <h1 className="text-5xl md:text-7xl font-serif tracking-tighter text-rose-950 leading-[0.95] mb-6">
                                {ai?.enhancedTitle || "Mini Nevera Skincare"}
                            </h1>
                            <p className="text-base md:text-lg font-light text-rose-800/70 mb-10 leading-relaxed max-w-sm">
                                {ai?.enhancedDescription || "La vida útil de tus cremas de ácido hialurónico se triplica en frío. Despierta tus poros con rodillos de jade helados en lugar de bacterias del baño."}
                            </p>

                            <div className="bg-white p-8 rounded-[2rem] shadow-[0_20px_50px_rgba(236,72,153,0.08)] border border-pink-50 relative">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-pink-50 to-transparent rounded-tr-[2rem]"></div>
                                <div className="flex flex-col sm:flex-row sm:items-end gap-6 mb-8 relative z-10">
                                    <span className="text-5xl font-serif text-rose-950 tracking-tighter">{fmtPrice(product.price)}</span>
                                    {product.originalPrice && <span className="text-lg font-sans font-medium text-pink-300 line-through pb-1">{fmtPrice(product.originalPrice)}</span>}
                                </div>
                                <button onClick={() => document.getElementById('checkout-action')?.scrollIntoView({ behavior: 'smooth' })} className="w-full h-[64px] bg-rose-900 text-white font-sans uppercase tracking-[0.2em] text-[12px] hover:bg-pink-500 transition-colors duration-300 flex items-center justify-center rounded-2xl shadow-[0_10px_20px_rgba(225,29,72,0.15)]">
                                    Añadir a mi Tocador (C.O.D)
                                </button>
                            </div>
                        </div>

                        <div className="relative z-10 lg:col-span-7 flex items-center justify-center p-2 lg:p-8">
                            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="w-full max-w-[450px] aspect-[4/5] relative bg-white rounded-[3rem] p-3 shadow-[0_30px_60px_rgba(225,29,72,0.1)] border border-pink-100 flex items-center justify-center">
                                <div className="w-full h-full relative z-10 overflow-hidden rounded-[2.5rem] bg-pink-50/50">
                                    <EnhancedProductGallery product={product} accentColor={accentPink} />
                                </div>
                                {/* Frost overlay simulation */}
                                <div className="absolute inset-4 rounded-[2rem] bg-gradient-to-b from-white/20 to-transparent pointer-events-none mix-blend-overlay"></div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* 4. TRUST BADGES TECHNICAL */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 pb-16">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            {v: '4 L', l: 'Capacidad Interna'},
                            {v: 'Silencio', l: '28dB Modo Noche'},
                            {v: 'LED', l: 'Aro de Luz Espejo'},
                            {v: 'Frío/Calor', l: 'Termostato Dual'}
                        ].map((b, i) => (
                            <div key={i} className="flex flex-col items-center justify-center p-6 bg-white border border-pink-100 rounded-[2rem] shadow-sm">
                                <span className="text-rose-900 font-serif text-3xl mb-1">{b.v}</span>
                                <span className="text-[9px] font-sans font-bold text-pink-500 uppercase tracking-widest text-center">{b.l}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 5. EXPERT ACCORDIONS */}
                <div className="max-w-4xl mx-auto px-4 md:px-8 py-20">
                    <div className="mb-12 text-center">
                        <span className="text-[10px] text-pink-500 uppercase tracking-[0.3em] font-sans mb-4 block">PRESERVA TU INVERSIÓN</span>
                        <h2 className="text-4xl md:text-5xl font-serif text-rose-950">Por Qué El Frío <span className="italic text-pink-500">Importa.</span></h2>
                    </div>
                    <div className="bg-white border text-left border-pink-100 rounded-[2rem] shadow-sm overflow-hidden">
                        {[
                            { t: 'Adiós a las Bacterias del Baño', a: 'Guardar cosméticos orgánicos cerca de la ducha caliente fomenta hongos e inactiva los péptidos de tus serums caros. El entorno frío y oscuro evita la oxidación de la Vitamina C.' },
                            { t: 'Desinflamación Facial (Puffiness)', a: 'Aplicar sueros helados o pasar el Gua Sha frío por las mañanas constriñe los capilares sanguíneos debajo de la piel, reduciendo las bolsas de los ojos y el enrojecimiento casi al instante.' },
                            { t: 'Diseño Espejo + Luz Anular', a: 'La puerta no es plástico opaco. Es un espejo de cristal templado bordeado por un aro de luz LED regulable. Saca tu crema y aplícala ahí mismo con iluminación de estudio.' }
                        ].map((ac, i) => (
                            <div key={i} className="border-b border-pink-50 last:border-b-0">
                                <button onClick={() => setOpenSpecAcc(openSpecAcc===i?null:i)} className="w-full text-left p-6 md:p-8 flex items-center justify-between text-sm font-sans font-bold uppercase tracking-widest text-rose-900 transition-all hover:bg-pink-50/50">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-pink-300 font-serif italic text-xs normal-case">Dato {i+1}</span>
                                        <span>{ac.t}</span>
                                    </div>
                                    <span className="text-pink-400 font-light text-2xl leading-none">{openSpecAcc===i?'-':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {openSpecAcc === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 md:px-8 pb-8 text-sm font-light text-rose-800/70 leading-loose">
                                            {ac.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 7. BENEFITS CON IMAGENES UNSPLASH */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-24 mb-16 bg-white border-y border-pink-100">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-serif text-rose-950 mb-6">Santuario del <span className="italic text-pink-500">Cuidado.</span></h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { img: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1000&auto=format&fit=crop', t: 'Vitamina C Intacta', d: 'El ácido ascórbico se oxida y se vuelve amarillo con el calor. El frío mantiene su pureza transparente y efectiva.' },
                            { img: 'https://images.unsplash.com/photo-1596462502278-27bf85033e5a?q=80&w=1000&auto=format&fit=crop', t: 'Mascarillas Faciales', d: 'Sentir una mascarilla de tela fría después de un día estresante es una experiencia de spa a nivel neuronal.' },
                            { img: 'https://images.unsplash.com/photo-1598440947619-2ce164eebc9b?q=80&w=1000&auto=format&fit=crop', t: 'También para Medicación', d: 'Ideal para personas que requieren refrigerar insulina o gotas oftalmológicas especiales al lado de su cama.' }
                        ].map((b, i) => (
                            <div key={i} className="group">
                                <div className="h-64 w-full relative overflow-hidden rounded-[2rem] mb-6 border border-pink-50">
                                     <img src={b.img} alt={b.t} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                                </div>
                                <div className="px-2">
                                    <h3 className="text-lg font-serif text-rose-950 mb-2">{b.t}</h3>
                                    <p className="text-sm font-light text-rose-800/70 leading-relaxed text-balance">{b.d}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 11. RISK REVERSAL WARRANTY */}
                <div className="max-w-5xl mx-auto px-4 md:px-8 py-12">
                    <div className="bg-rose-900 border border-rose-800 p-10 md:p-14 rounded-[3rem] text-white md:flex items-center gap-10 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-full bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-20 mix-blend-overlay"></div>
                        <div className="w-16 h-16 shrink-0 bg-pink-500 rounded-full flex items-center justify-center mb-6 md:mb-0">
                            <span className="text-2xl">🤍</span>
                        </div>
                        <div className="relative z-10 w-full text-center md:text-left">
                            <h3 className="text-2xl font-serif tracking-tight mb-2">Mimos hasta tu Puerta.</h3>
                            <p className="font-light text-pink-100 leading-relaxed text-sm md:text-base">
                                Queremos que la experiencia sea libre de estrés. Pides tu neverita aquí sin dejar datos bancarios. Una vez que llega en su empaque especial a tu casa de la mano de nuestro servicio local, la conectas y se la pagas directamente a quien te hizo la entrega.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 15. CHECKOUT */}
                <div id="checkout-action" className="py-24 md:py-32 relative mt-12 bg-white border-t border-pink-100 shadow-[0_-20px_50px_rgba(255,245,247,0.5)]">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-50/50 via-white to-white pointer-events-none"></div>
                    <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24 items-center">
                        <div className="md:col-span-5 relative text-center md:text-left">
                            <span className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-pink-500 bg-pink-50 border border-pink-100 px-4 py-2 rounded-full inline-block mb-8">COMPROBANTE C.O.D</span>
                            <h3 className="text-5xl md:text-6xl font-serif text-rose-950 leading-[1.1] mb-6">Tu Espacio <br/><span className="text-pink-500 italic">Personal.</span></h3>
                            <p className="text-sm font-light text-rose-800/70 mb-10 leading-relaxed max-w-sm mx-auto md:mx-0">Completa la dirección. Sin adelantos online. Pagas el total al mensajero que te la lleva.</p>
                            
                            <div className="text-6xl font-serif text-rose-950">{fmtPrice(product.price)}</div>
                        </div>
                        
                        <div className="md:col-span-7 w-full border border-pink-100 bg-[#fff5f7] p-8 md:p-12 rounded-[3.5rem] shadow-[0_20px_60px_rgba(225,29,72,0.05)]">
                            <form onSubmit={e=>e.preventDefault()}>
                                <div className="space-y-6">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-sans font-bold text-pink-700 uppercase tracking-widest pl-4">A nombre de (Destinatario)</label>
                                        <input type="text" className="w-full bg-white border border-pink-100 focus:border-pink-500 text-rose-900 font-sans font-medium text-sm px-6 py-4 outline-none transition-all rounded-full shadow-sm" placeholder="Nombre completo" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-sans font-bold text-pink-700 uppercase tracking-widest pl-4">Número de Aviso</label>
                                        <input type="tel" className="w-full bg-white border border-pink-100 focus:border-pink-500 text-rose-900 font-sans font-medium text-sm px-6 py-4 outline-none transition-all rounded-full shadow-sm" placeholder="Celular" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[10px] font-sans font-bold text-pink-700 uppercase tracking-widest pl-4">Destino de Entrega</label>
                                        <textarea rows={2} className="w-full bg-white border border-pink-100 focus:border-pink-500 text-rose-900 font-sans font-medium text-sm px-6 py-4 outline-none transition-all resize-none rounded-3xl shadow-sm" placeholder="Calle, número de casa, referencias..." />
                                    </div>
                                    <div className="pt-6">
                                        <button className="w-full h-[64px] bg-rose-900 text-white font-sans font-bold uppercase tracking-[0.2em] text-[12px] hover:bg-pink-500 transition-colors shadow-lg rounded-full">
                                            Confirmar Compra (Pago en Efectivo)
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
};

export default PdpMiniFridge;
