'use client';
import React, { useState } from 'react';
import { StoreData, Product } from '@/lib/types';
import EnhancedProductGallery from '@/components/pdp/EnhancedProductGallery';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { data: StoreData; product: Product; }

const PdpWatchLumen: React.FC<Props> = ({ data, product }) => {
    const [faqOpen, setFaqOpen] = useState<number | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const ai = product.aiContent;
    const fmtPrice = (n: number) => { const s = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); return `Gs. ${s}`; };
    
    const accent = '#D4AF37'; // Gold
    const bg = '#020202';

    return (
        <div style={{ background: bg, color: '#EAEAEA', fontFamily: "'Inter', sans-serif" }} className="overflow-x-hidden selection:bg-yellow-500/20">

            {/* 0. GOLD DUST CONT */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 opacity-40">
                <style dangerouslySetInnerHTML={{__html:`
                    @keyframes drift { 0% { transform: translateY(0) rotate(0deg); opacity: 0; } 50% { opacity: 1; } 100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; } }
                    .particle { position: absolute; background: ${accent}; border-radius: 50%; animation: drift linear infinite; }
                    .glow-line { background: linear-gradient(90deg, transparent, ${accent}, transparent); }
                `}} />
                {[...Array(30)].map((_, i) => (
                    <div key={i} className="particle" style={{
                        left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
                        width: `${Math.random() * 3 + 1}px`, height: `${Math.random() * 3 + 1}px`,
                        animationDuration: `${Math.random() * 20 + 20}s`, animationDelay: `${Math.random() * 10}s`,
                        boxShadow: `0 0 ${Math.random() * 10 + 5}px ${accent}`
                    }} />
                ))}
            </div>

            {/* 1. HEADER */}
            <header className="fixed top-0 w-full z-50 bg-[#020202]/80 backdrop-blur-md border-b" style={{ borderColor: 'rgba(212,175,55,0.1)' }}>
                <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
                    <span className="text-xs font-black tracking-[0.4em] uppercase" style={{ color: accent, textShadow: `0 0 10px ${accent}40` }}>LUMEN</span>
                    <button className="lg:hidden text-[9px] border border-[#D4AF37]/30 text-[#D4AF37] px-4 py-1.5 uppercase tracking-[0.2em] font-black" onClick={() => document.getElementById('checkout-watch')?.scrollIntoView({ behavior: 'smooth' })}>Adquirir</button>
                    <nav className="hidden lg:flex gap-12">
                        {['Maestría', 'Precisión', 'Asesoría'].map((item) => (
                            <a key={item} href={`#${item.toLowerCase()}`} className="text-[9px] font-bold tracking-[0.3em] uppercase text-neutral-500 hover:text-[#D4AF37] transition-colors">
                                {item}
                            </a>
                        ))}
                    </nav>
                </div>
                <div className="w-full h-[1px] glow-line opacity-50"></div>
            </header>

            <main className="relative z-10 pt-28">
                
                {/* 2. HERO */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 min-h-[75vh] items-center px-6 max-w-7xl mx-auto pb-10">
                    <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: "easeOut" }} className="flex flex-col justify-center">
                        <div className="mb-8">
                            <span className="text-[10px] font-black tracking-[0.4em] uppercase text-neutral-500 border-b border-[#D4AF37]/30 pb-2">Alta Relojería Digital</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-light leading-[1.1] tracking-wide mb-8" style={{ fontFamily: 'serif' }}>
                            {ai?.enhancedTitle || product.title}
                        </h1>
                        <p className="text-sm text-neutral-400 leading-relaxed font-light mb-10 max-w-md tracking-wider">
                            {ai?.enhancedDescription || product.description || 'Precisión monumental esculpida en zafiro. Donde el tiempo se detiene y la innovación late en tu muñeca.'}
                        </p>
                        <div className="space-y-6">
                            <div className="flex items-baseline gap-6">
                                <span className="text-3xl font-light" style={{ color: accent, fontFamily: 'serif' }}>{fmtPrice(product.price)}</span>
                            </div>
                            <button onClick={() => document.getElementById('checkout-watch')?.scrollIntoView({ behavior: 'smooth' })} className="w-full max-w-[320px] h-14 bg-transparent border border-[#D4AF37] text-[#D4AF37] font-black text-[10px] uppercase tracking-[0.3em] hover:bg-[#D4AF37] hover:text-black transition-all flex items-center justify-center gap-4 group relative overflow-hidden">
                                <div className="absolute inset-0 bg-[#D4AF37] translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300"></div>
                                <span className="relative z-10">Boutique — Comprar</span>
                            </button>
                        </div>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5, ease: "easeOut" }} className="relative h-full flex items-center justify-center p-8">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-[#D4AF37]/10 blur-[80px] rounded-full pointer-events-none"></div>
                        <div className="w-full relative z-10 border border-[#D4AF37]/10 p-2 bg-gradient-to-br from-white/[0.02] to-transparent">
                            <EnhancedProductGallery product={product} accentColor={accent} />
                        </div>
                    </motion.div>
                </div>

                {/* 3. MARQUEE */}
                <div className="w-[100vw] overflow-hidden py-4 border-y relative left-[50%] -translate-x-[50%] mb-20" style={{ borderColor: 'rgba(212,175,55,0.1)' }}>
                    <div className="flex whitespace-nowrap animate-marquee-slow">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="flex items-center gap-16 px-8">
                                <span className="text-[10px] font-light uppercase tracking-[0.4em] text-[#D4AF37]" style={{ fontFamily: 'serif' }}>Zafiro Sintético</span>
                                <span className="text-neutral-800">|</span>
                                <span className="text-[10px] font-light uppercase tracking-[0.4em] text-[#D4AF37]" style={{ fontFamily: 'serif' }}>Acero Quirúrgico</span>
                                <span className="text-neutral-800">|</span>
                                <span className="text-[10px] font-light uppercase tracking-[0.4em] text-[#D4AF37]" style={{ fontFamily: 'serif' }}>Calibre Biométrico</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 4. COMPLICATIONS / ENGINEERING */}
                <div id="maestría" className="py-24 relative border-t" style={{ borderColor: 'rgba(212,175,55,0.1)' }}>
                    <div className="w-full h-[1px] glow-line absolute top-0 opacity-30"></div>
                    <div className="max-w-6xl mx-auto px-6">
                        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-5xl font-light text-center mb-24" style={{ fontFamily: 'serif' }}>
                            Complicaciones <span style={{ color: accent }} className="italic">Extraordinarias</span>
                        </motion.h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-16">
                            {[
                                { title: 'Cristal de Zafiro', val: 'Escudo', desc: 'Pulido a la perfección técnica, el cristal de zafiro repele rasguños y concede una claridad inmaculada.' },
                                { title: 'Corazón Analítico', val: 'ECG', desc: 'Micro-sensores ópticos registran la salud cardiovascular con precisión médica bajo tu piel.' },
                                { title: 'Autonomía', val: '14 Días', desc: 'Un microprocesador de bajo consumo permite extender la elegancia sin necesidad de ataduras eléctricas.' }
                            ].map((c, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex gap-6 group">
                                    <div className="w-[1px] h-full bg-[#D4AF37]/20 relative">
                                        <div className="absolute top-0 left-[-2px] w-[5px] h-[5px] bg-[#D4AF37] rotate-45 group-hover:scale-150 transition-transform"></div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] uppercase tracking-[0.3em] font-black text-[#D4AF37] mb-3">{c.val}</div>
                                        <h3 className="text-2xl font-light tracking-wide text-white mb-3" style={{ fontFamily: 'serif' }}>{c.title}</h3>
                                        <p className="text-[13px] text-neutral-400 font-light leading-relaxed tracking-wide">{c.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 5. TUTORIAL (CALIBRATION) */}
                <div className="max-w-5xl mx-auto px-6 py-24 border-t" style={{ borderColor: 'rgba(212,175,55,0.1)' }}>
                    <h2 className="text-3xl font-light tracking-wide text-center mb-16" style={{ fontFamily: 'serif' }}>Calibración Inicial</h2>
                    <div className="flex flex-col md:flex-row justify-between gap-12">
                        {[
                            { n: 'I', t: 'Vínculo', d: 'Enlaza el calibre digital a tu smartphone vía cifrado privado.' },
                            { n: 'II', t: 'Ajuste', d: 'Moldea la pulsera a tu muñeca; el sensor biométrico inicia el escaneo.' },
                            { n: 'III', t: 'Legado', d: 'El tiempo y tu salud ahora residen bajo el mismo zafiro.' }
                        ].map((m, i) => (
                            <div key={i} className="text-center relative flex-1">
                                <div className="text-4xl text-[#D4AF37]/20 mb-4 font-light" style={{ fontFamily: 'serif' }}>{m.n}</div>
                                <h3 className="text-[13px] uppercase tracking-[0.2em] font-black text-[#D4AF37] mb-2">{m.t}</h3>
                                <p className="text-sm text-neutral-400 font-light leading-relaxed">{m.d}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 6. US VS THEM */}
                <div className="max-w-4xl mx-auto px-6 py-24">
                    <h2 className="text-3xl font-light text-center mb-12" style={{ fontFamily: 'serif' }}>El Valor del Patrimonio</h2>
                    <div className="border border-[#D4AF37]/20 bg-transparent p-1">
                        <div className="bg-[#0A0A0A] p-2">
                            <div className="grid grid-cols-3 border-b border-[#D4AF37]/20 pb-4 pt-4 px-6 text-[9px] uppercase tracking-[0.3em] text-neutral-500">
                                <div>Atributo</div>
                                <div className="text-[#D4AF37] text-center">Firma Lumen</div>
                                <div className="text-center">Relojería Genérica</div>
                            </div>
                            {[
                                { k: 'Caja Principal', u: 'Acero Inoxidable 316L', t: 'Aleación de Zinc' },
                                { k: 'Pantalla', u: 'AMOLED Always-On', t: 'LCD TFT Básico' },
                                { k: 'Correa', u: 'Cuero / Eslabón Premium', t: 'Silicona Industrial' },
                            ].map((r, i) => (
                                <div key={i} className="grid grid-cols-3 p-6 border-b border-white/[0.02] items-center hover:bg-white/[0.01] transition-colors">
                                    <div className="font-light text-neutral-400 text-sm tracking-wide" style={{ fontFamily: 'serif' }}>{r.k}</div>
                                    <div className="text-center font-light text-white text-sm" style={{ fontFamily: 'serif' }}>{r.u}</div>
                                    <div className="text-center font-light text-neutral-600 text-sm line-through tracking-wider">{r.t}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 7. DEEP SPECS */}
                <div id="precisión" className="max-w-6xl mx-auto px-6 py-20 border-t" style={{ borderColor: 'rgba(212,175,55,0.1)' }}>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { v: '1.43"', l: 'Diámetro' }, { v: '326', l: 'PPI (Densidad)' },
                            { v: '50m', l: 'Hermeticidad' }, { v: '45g', l: 'Peso en Vacío' }
                        ].map((s, i) => (
                            <div key={i} className="text-center border border-[#D4AF37]/10 p-8 hover:border-[#D4AF37]/30 transition-colors">
                                <div className="text-3xl font-light text-[#D4AF37] mb-3" style={{ fontFamily: 'serif' }}>{s.v}</div>
                                <div className="text-[9px] font-black tracking-[0.3em] uppercase text-neutral-500">{s.l}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 8. UGC / TESTIMONIALS */}
                <div className="max-w-7xl mx-auto px-6 py-24 border-t" style={{ borderColor: 'rgba(212,175,55,0.1)' }}>
                    <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once:true }} className="text-3xl font-light text-center mb-16" style={{ fontFamily: 'serif' }}>Club Privado Lumen</motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { d: 'Su peso y la temperatura del acero en la piel denotan una manufactura que no esperaba encontrar en la era digital.', n: 'A. Vanderbilt' },
                            { d: 'Reemplazó a mi reloj automático de uso diario. Las notificaciones son discretas y la esfera clásica no rompe el protocolo en reuniones.', n: 'C. De la Vega' },
                            { d: 'La duración de batería es una obra de ingeniería. Me olvido de llevar cargador a mis viajes de negocios.', n: 'H. Rothschild' }
                        ].map((r, i) => (
                            <div key={i} className="bg-[#050505] p-10 border border-[#D4AF37]/10 relative">
                                <div className="absolute top-[-10px] left-10 text-4xl text-[#D4AF37]/20" style={{ fontFamily: 'serif' }}>"</div>
                                <p className="text-sm font-light text-neutral-300 leading-relaxed tracking-wide mb-8">"{r.d}"</p>
                                <div className="text-[10px] uppercase font-black uppercase text-[#D4AF37] tracking-[0.2em]">{r.n}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 9. BRAND STORY */}
                <div className="py-32 text-center bg-[#050505] border-y" style={{ borderColor: 'rgba(212,175,55,0.1)' }}>
                    <div className="max-w-2xl mx-auto px-6">
                        <svg className="w-8 h-8 mx-auto text-[#D4AF37] mb-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        <h3 className="text-3xl font-light tracking-wide mb-6" style={{ fontFamily: 'serif' }}>El Tiempo es un Lujo.</h3>
                        <p className="text-sm font-light text-neutral-400 leading-relaxed tracking-wider">La tecnología obsesionada con la obsolescencia programada nos ofende. Fabricamos cronógrafos digitales que trascienden generaciones, combinando el encanto táctil de la ingeniería antigua con procesadores del mañana.</p>
                    </div>
                </div>

                {/* 10. WARRANTY */}
                <div className="max-w-4xl mx-auto px-6 py-24">
                    <div className="flex flex-col md:flex-row items-center gap-12 bg-transparent border border-[#D4AF37]/20 p-12">
                        <div className="w-24 h-24 rounded-full border border-[#D4AF37] flex items-center justify-center shrink-0">
                            <span className="font-light text-3xl text-[#D4AF37]" style={{ fontFamily: 'serif' }}>V</span>
                        </div>
                        <div>
                            <h3 className="text-xl font-light tracking-wide mb-3" style={{ fontFamily: 'serif' }}>Garantía Vitalicia.</h3>
                            <p className="text-sm font-light text-neutral-400 leading-relaxed tracking-wider">Cada pieza es analizada bajo microscopio óptico antes de su envío. Si no cumple tus exigencias o nuestro estándar artesanal, la transacción se revierte al instante. Pago habilitado contra-entrega por seguridad.</p>
                        </div>
                    </div>
                </div>

                {/* 11. FAQ */}
                <div id="asesoría" className="max-w-3xl mx-auto px-6 py-24 border-t" style={{ borderColor: 'rgba(212,175,55,0.1)' }}>
                    <h2 className="text-3xl font-light text-center mb-16" style={{ fontFamily: 'serif' }}>Asesoría Privada</h2>
                    <div className="space-y-4">
                        {[
                            { q: '¿Es el oro expuesto a desvanecerse?', a: 'El recubrimiento utiliza deposición física de vapor (PVD), penetrando molecularmente el acero para evitar desvanecimiento.' },
                            { q: '¿Requiere calibración profesional periódica?', a: 'No. El calibre digital se auto-regula sincronizándose con los relojes atómicos mundiales a través del teléfono.' },
                            { q: 'Sobre la logística de entrega...', a: 'Un agente designado entregará su pieza. Usted podrá abrirla, inspeccionarla y recién ese momento, efectuar el pago.' }
                        ].map((f, i) => (
                            <div key={i} className="border-b border-white/10">
                                <button onClick={() => setFaqOpen(faqOpen===i?null:i)} className="w-full text-left py-6 flex items-center justify-between font-light tracking-wider text-sm text-[#EAEAEA]" style={{ fontFamily: 'serif' }}>
                                    {f.q}
                                    <span className="text-[#D4AF37] font-light">{faqOpen===i?'-':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {faqOpen === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="pb-6 text-xs text-neutral-500 font-light leading-relaxed tracking-wider">
                                            {f.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 12. CHECKOUT */}
                <div id="checkout-watch" className="py-32 relative border-t" style={{ borderColor: 'rgba(212,175,55,0.2)' }}>
                    <div className="max-w-xl mx-auto px-6 z-10 relative">
                        <div className="relative p-[1px] bg-gradient-to-b from-[#D4AF37]/40 via-[#D4AF37]/5 to-transparent">
                            <div className="bg-[#020202] p-10 md:p-14 h-full relative z-10 inner-glow">
                                <style dangerouslySetInnerHTML={{__html: `
                                    .inner-glow { box-shadow: inset 0 0 40px rgba(212,175,55,0.05); }
                                    .input-lux { background: transparent; border: none; border-bottom: 1px solid rgba(212,175,55,0.3); color: white; font-family: 'Inter', sans-serif; font-weight: 300; font-size: 14px; letter-spacing: 1px; transition: border-color 0.3s; padding: 15px 0; outline: none; }
                                    .input-lux:focus { border-bottom-color: #D4AF37; }
                                    .input-lux::placeholder { color: rgba(255,255,255,0.3); }
                                `}} />
                                <div className="text-center mb-12">
                                    <h3 className="text-3xl font-light tracking-widest text-white mb-4" style={{ fontFamily: 'serif' }}>Adquisición</h3>
                                    <div className="w-10 h-[1px] bg-[#D4AF37] mx-auto mb-6"></div>
                                    <p className="text-[10px] text-neutral-500 font-light uppercase tracking-[0.3em]">Reserva Exclusiva — Pago a la entrega</p>
                                </div>
                                <form className="space-y-8" onSubmit={e => e.preventDefault()}>
                                    <div className="relative">
                                        <input type="text" className="input-lux w-full" placeholder="NOMBRE COMPLETO" />
                                    </div>
                                    <div className="relative">
                                        <input type="tel" className="input-lux w-full" placeholder="TELÉFONO DE ASESORÍA" />
                                    </div>
                                    <div className="relative">
                                        <textarea rows={2} className="input-lux w-full resize-none" placeholder="DIRECCIÓN DE CORRESPONDENCIA" />
                                    </div>
                                    <button className="w-full h-16 bg-[#D4AF37] text-black font-black text-[10px] uppercase tracking-[0.3em] hover:bg-white transition-colors mt-8">
                                        Solicitar Envío Privado
                                    </button>
                                    <div className="flex justify-center items-center gap-6 mt-6">
                                        <span className="text-[9px] text-[#D4AF37]/50 tracking-[0.2em] uppercase font-black">Transacción Segura</span>
                                        <span className="text-[#D4AF37]/50">•</span>
                                        <span className="text-[9px] text-[#D4AF37]/50 tracking-[0.2em] uppercase font-black">Cobro Presencial</span>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </main>
            
            {/* STICKY MOBILE */}
            <div className="md:hidden fixed bottom-6 left-4 right-4 z-50">
                <div className="bg-[#020202] border border-[#D4AF37]/30 p-4 flex items-center justify-between shadow-[0_10px_30px_rgba(212,175,55,0.15)]">
                    <div className="pl-1">
                        <div className="text-[9px] font-black text-[#D4AF37] uppercase tracking-[0.2em]">Inversión</div>
                        <div className="font-light tracking-wide text-lg text-white" style={{ fontFamily: 'serif' }}>{fmtPrice(product.price)}</div>
                    </div>
                    <button onClick={() => document.getElementById('checkout-watch')?.scrollIntoView({ behavior: 'smooth' })} className="px-5 py-3 border border-[#D4AF37]/30 text-[#D4AF37] font-black text-[10px] uppercase tracking-[0.2em]">
                        Adquirir
                    </button>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{__html: `
                @keyframes marquee-slow { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
                .animate-marquee-slow { animation: marquee-slow 20s linear infinite; }
            `}} />
        </div>
    );
};

export default PdpWatchLumen;
