'use client';
import React, { useState } from 'react';
import { StoreData, Product } from '@/lib/types';
import EnhancedProductGallery from '@/components/pdp/EnhancedProductGallery';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { data: StoreData; product: Product; }

const PdpGamingElite: React.FC<Props> = ({ data, product }) => {
    const [faqOpen, setFaqOpen] = useState<number | null>(null);
    const [isHovered, setIsHovered] = useState(false);
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const ai = product.aiContent;
    const fmtPrice = (n: number) => { const s = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'); return `Gs. ${s}`; };
    
    const accent = '#06B6D4'; // Cyan
    const secondary = '#7C3AED'; // Violet
    const bgDark = '#040406';

    const fadeIn = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
    };

    return (
        <div style={{ background: bgDark, color: '#E2E2F0', fontFamily: "'Inter', system-ui, sans-serif" }} className="overflow-x-hidden selection:bg-cyan-500/30 relative">

            {/* ═════════ AMBIENT GLOWS ═════════ */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full blur-[120px] opacity-20 animate-pulse" style={{ background: `radial-gradient(circle, ${secondary} 0%, transparent 70%)`, animationDuration: '8s' }} />
                <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full blur-[150px] opacity-[0.15]" style={{ background: `radial-gradient(circle, ${accent} 0%, transparent 70%)` }} />
            </div>

            {/* 1. HEADER */}
            <header className="sticky top-0 z-50 backdrop-blur-2xl bg-[#040406]/70 border-b border-white/[0.05] shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <span className="text-base font-black tracking-[0.3em] uppercase flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: accent, boxShadow: `0 0 10px ${accent}` }}></div>
                        <span style={{ color: accent, textShadow: `0 0 20px ${accent}40` }}>APEX</span>
                        <span className="text-neutral-500">GAMING</span>
                    </span>
                    <button className="lg:hidden text-cyan-400 font-bold text-xs uppercase" onClick={() => document.getElementById('checkout-game')?.scrollIntoView({ behavior: 'smooth' })}>Buy</button>
                    <nav className="hidden lg:flex gap-8">
                        {['Ingeniería', 'Specs', 'FAQ'].map((item) => (
                            <a key={item} href={`#${item.toLowerCase()}`} className="text-[11px] font-bold tracking-[0.15em] uppercase text-neutral-500 hover:text-cyan-400 transition-colors relative group">
                                {item}
                                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
                            </a>
                        ))}
                    </nav>
                </div>
            </header>

            <main className="relative z-10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="py-6 pt-10">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-600">
                            Equipamiento &gt; <span style={{ color: accent }}>Nivel Pro Torneo</span>
                        </span>
                    </div>

                    {/* 2. HERO */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pb-20">
                        <motion.div 
                            initial="hidden" animate="visible" variants={fadeIn}
                            className="relative rounded-3xl overflow-hidden group"
                            onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
                            style={{
                                background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.05)',
                                boxShadow: isHovered ? `0 0 40px ${secondary}20` : '0 10px 40px rgba(0,0,0,0.5)',
                                transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)'
                            }}
                        >
                            <EnhancedProductGallery product={product} accentColor={accent} />
                        </motion.div>

                        <div className="flex flex-col justify-center space-y-8">
                            <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.1 }}>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="flex items-center px-2.5 py-1 rounded-sm bg-cyan-500/10 border border-cyan-500/20">
                                        <span className="text-[10px] font-black tracking-[0.2em] uppercase text-cyan-400 animate-pulse">0.1ms Response</span>
                                    </div>
                                </div>
                                <h1 className="text-5xl md:text-6xl font-black leading-[0.9] tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-neutral-200 to-neutral-600 pb-2">
                                    {ai?.enhancedTitle || product.title}
                                </h1>
                                <p className="text-[15px] text-neutral-400 leading-relaxed font-medium mt-4 border-l-2 border-cyan-500/30 pl-4">
                                    {ai?.enhancedDescription || product.description || 'Rendimiento extremo diseñado para esports. Precisión milimétrica que elimina la brecha entre el pensamiento y la acción in-game.'}
                                </p>
                            </motion.div>
                            <motion.div initial="hidden" animate="visible" variants={fadeIn} transition={{ delay: 0.2 }} className="space-y-4">
                                <div className="flex items-baseline gap-4">
                                    <span className="text-4xl font-black text-white drop-shadow-[0_0_15px_rgba(6,182,212,0.3)]">{fmtPrice(product.price)}</span>
                                    {product.originalPrice && <span className="text-xl text-neutral-600 line-through decoration-red-500/50 font-bold">{fmtPrice(product.originalPrice)}</span>}
                                </div>
                                <button onClick={() => document.getElementById('checkout-game')?.scrollIntoView({ behavior: 'smooth' })} className="relative w-full rounded-xl font-black text-sm uppercase tracking-[0.2em] h-[70px] overflow-hidden group">
                                    <div className="absolute inset-0 z-0 bg-gradient-to-r from-cyan-500 to-violet-600 glow-pulse"></div>
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-1"></div>
                                    <span className="relative z-10 text-white drop-shadow-md">Asegurar Ventaja Competitiva</span>
                                </button>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* 3. ENDLESS MARQUEE */}
                <div className="w-[100vw] overflow-hidden py-4 border-y border-white/[0.05] bg-white/[0.01] mb-20 relative left-[50%] -translate-x-[50%]">
                    <div className="flex whitespace-nowrap animate-marquee">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="flex items-center gap-12 px-6">
                                {['Zero Hardware Acceleration', 'Switches Ópticos', 'Esports Ready', 'Polling Rate 1000Hz'].map((text, j) => (
                                    <div key={j} className="flex items-center gap-4">
                                        <span className="text-[11px] font-black uppercase tracking-[0.3em] text-neutral-500">{text}</span>
                                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/50"></div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                {/* 4. ENGINEERING (BENEFITS) */}
                <div id="ingeniería" className="max-w-7xl mx-auto px-6 py-10">
                    <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl font-black text-center tracking-tight text-white mb-20">
                        Ventaja <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">Injusta.</span>
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="url(#c-grad)" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>, title: 'Actuación Óptica', desc: 'Activación basada en luz infrarroja. 0 milisegundos de rebote físico, garantizando que tu input se registre antes que el del enemigo.' },
                            { icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="url(#v-grad)" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>, title: 'Sensor Predictivo', desc: 'Tracking perfecto sin smoothing ni aceleración artificial. Donde apuntas es donde el crosshair aterriza, punto.' },
                            { icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="url(#c-grad)" strokeWidth="1.5"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5zM16 8L2 22M17.5 15H9"/></svg>, title: 'Chasis Aerospacial', desc: 'Reducción masiva de peso manteniendo integridad estructural. Flick shots que no fatigan tu muñeca después de 6 horas.' },
                        ].map((b, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-8 rounded-3xl border border-white/[0.05] bg-white/[0.02] backdrop-blur-md relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-10 transition-opacity duration-500 scale-150 transform translate-x-4 -translate-y-4">{b.icon}</div>
                                <div className="mb-6">{b.icon}</div>
                                <h3 className="text-xl font-black tracking-tight text-white mb-3">{b.title}</h3>
                                <p className="text-sm text-neutral-400 leading-relaxed font-medium">{b.desc}</p>
                                <svg width="0" height="0"><linearGradient id="c-grad"><stop offset="0%" stopColor="#06B6D4"/><stop offset="100%" stopColor="#3B82F6"/></linearGradient><linearGradient id="v-grad"><stop offset="0%" stopColor="#7C3AED"/><stop offset="100%" stopColor="#EC4899"/></linearGradient></svg>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* 5. TUTORIAL (HOW TO SETUP) */}
                <div className="max-w-7xl mx-auto px-6 py-20 border-t border-white/[0.05]">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black text-white">Plug & Destroy.</h2>
                        <p className="text-neutral-500 mt-2">Sin softwares invasivos ni bloqueos de recursos.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { step: '01', title: 'Conecta el Paracord', desc: 'Cable ultra-flexible que simula la sensación de no tener cables.' },
                            { step: '02', title: 'Automático', desc: 'Los drivers nativos se instalan en 3 segundos sin bloatware.' },
                            { step: '03', title: 'Domina', desc: 'Entra al lobby. La configuración base es la usada por jugadores tier 1.' },
                        ].map((s, i) => (
                            <div key={i} className="text-center relative">
                                <div className="text-6xl font-black text-white/[0.03] absolute top-[-20%] left-1/2 -translate-x-1/2">STEP</div>
                                <div className="w-16 h-16 rounded-full border border-cyan-500/30 text-cyan-400 font-black flex items-center justify-center mx-auto mb-6 bg-cyan-500/10 shadow-[0_0_20px_rgba(6,182,212,0.2)]">{s.step}</div>
                                <h4 className="text-lg font-bold text-white mb-2">{s.title}</h4>
                                <p className="text-sm text-neutral-400">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 6. US VS THEM */}
                <div className="max-w-4xl mx-auto px-6 py-20">
                    <h2 className="text-3xl font-black text-center mb-10">La diferencia en un combate.</h2>
                    <div className="rounded-3xl border border-white/10 bg-[#0A0A0F]/60 backdrop-blur-xl overflow-hidden shadow-2xl">
                        <div className="grid grid-cols-3 bg-white/[0.02] border-b border-white/10 p-5">
                            <div className="text-[10px] font-black uppercase text-neutral-500 tracking-[0.2em]">Dato</div>
                            <div className="text-[10px] font-black uppercase text-cyan-400 tracking-[0.2em] text-center border-b-2 border-cyan-500 pb-2">APEX Setup</div>
                            <div className="text-[10px] font-black uppercase text-neutral-500 tracking-[0.2em] text-center">Setup Promedio</div>
                        </div>
                        {[
                            { k: 'Tiempo de Actuación', u: '0.2 ms', t: '1.0 ms+' },
                            { k: 'Arrastre (Fricción)', u: 'Deslizamiento Absoluto', t: 'Resistencia Notoria' },
                            { k: 'Lift-Off Distance', u: 'Programable (1mm)', t: 'Fijo (Sensors Spin)' },
                        ].map((r, i) => (
                            <div key={i} className="grid grid-cols-3 p-5 border-b border-white/[0.03] hover:bg-white/[0.02] transition">
                                <div className="text-xs font-bold text-neutral-400 pt-1">{r.k}</div>
                                <div className="text-center font-black text-white text-sm">{r.u}</div>
                                <div className="text-center font-bold text-neutral-600 text-sm line-through">{r.t}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 7. TECH SPECS GRID */}
                <div id="specs" className="max-w-7xl mx-auto px-6 py-10 border-t border-white/[0.05]">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { lbl: 'Switch Life', val: '70M+ Clicks' }, { lbl: 'Sensor', val: 'PixArt 3389' },
                            { lbl: 'Material', val: 'PBT Rugoso' }, { lbl: 'Memoria', val: 'On-Board (5 perfiles)' }
                        ].map((s, i) => (
                            <div key={i} className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 text-center group hover:border-cyan-500/50 transition duration-300">
                                <div className="text-cyan-500 text-sm font-black mb-1 group-hover:scale-110 transition-transform">{s.val}</div>
                                <div className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">{s.lbl}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 8. REVIEWS UGC */}
                <div className="max-w-7xl mx-auto px-6 py-20 border-t border-white/[0.05]">
                    <div className="text-center mb-16">
                        <div className="flex justify-center gap-1 mb-4 text-cyan-500">
                            {[1,2,3,4,5].map(i=><svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
                        </div>
                        <h2 className="text-3xl font-black">Certificado en lobbies Ranked.</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {t: "Con este modelo crucé de Ascendente a Inmortal. Ese mínimo input lag ahorrado gana tiroteos imposibles.", n: "Kieran J."},
                            {t: "Lo recomiendo muchísimo para agarre de garra (Claw). Las dimensiones son milimétricamente exactas.", n: "TenzFan44"},
                            {t: "El cable realmente no se siente. Es como jugar wireless pero sin la paranoia de que se apague en rondas.", n: "OmenMain_x"}
                        ].map((r,i) => (
                            <div key={i} className="p-6 rounded-2xl bg-gradient-to-b from-[#08080C] to-[#040406] border border-white/[0.08]">
                                <p className="text-sm text-neutral-300 italic mb-4 font-light">"{r.t}"</p>
                                <div className="text-[10px] uppercase font-black tracking-widest text-violet-400">— {r.n}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 9. MISSION */}
                <div className="py-20 relative text-center border-y border-white/[0.05] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
                    <div className="absolute inset-0 bg-black/80"></div>
                    <div className="relative z-10 max-w-2xl mx-auto px-6">
                        <svg className="w-10 h-10 mx-auto text-cyan-500/50 mb-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
                        <h3 className="text-2xl font-black mb-4">Creado por Gamers, para Competidores.</h3>
                        <p className="text-sm text-neutral-400 font-medium">Buscábamos erradicar las excusas de setup. Queríamos crear un hardware tan puro que tu única limitación sea tu reflejo visual dictaminado por la biología.</p>
                    </div>
                </div>

                {/* 10. WARRANTY */}
                <div className="max-w-4xl mx-auto px-6 py-20 border-b border-white/[0.05]">
                    <div className="flex flex-col md:flex-row items-center gap-10 bg-gradient-to-r from-cyan-500/10 to-violet-500/5 p-10 rounded-3xl border border-cyan-500/20">
                        <div className="w-24 h-24 rounded-full bg-[#040406] border border-cyan-500 flex items-center justify-center flex-shrink-0 shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                            <span className="font-black text-2xl text-cyan-400 leading-none">100%</span>
                        </div>
                        <div>
                            <h3 className="text-2xl font-black mb-2">Sin Riesgo en el Clash.</h3>
                            <p className="text-sm text-neutral-400">Garantía total de satisfacción. Si no se convierte en la mejor extensión corporal en tu setup de escritorio, solicita un reembolso. Paga a contra-entrega con total seguridad.</p>
                        </div>
                    </div>
                </div>

                {/* 11. FAQ */}
                <div id="faq" className="max-w-3xl mx-auto px-6 py-20">
                    <h2 className="text-3xl font-black text-center mb-12">Inteligencia Compartida (FAQ)</h2>
                    <div className="space-y-4">
                        {[
                            {q: '¿Funciona bien en consolas?', a: 'Sí, gracias a la memoria integrada mantiene la configuración si lo conectas directamente por USB tanto a PS5 como a Xbox Series X/S.'},
                            {q: '¿Necesito instalar software obligatoriamente?', a: 'No, opera en modalidad plug & play pura. El panel de software es opcional solo si deseas configurar macros específicos.'},
                            {q: '¿Cuándo llega mi pedido?', a: 'El envío toma de 24 a 48 horas en zonas urbanas. Recordatorio: pagas únicamente cuando el producto esté en tus manos.'}
                        ].map((f, i) => (
                            <div key={i} className="border border-white/10 rounded-2xl bg-white/[0.01] overflow-hidden">
                                <button onClick={() => setFaqOpen(faqOpen===i?null:i)} className="w-full text-left px-6 py-5 flex items-center justify-between font-bold text-white">
                                    {f.q}
                                    <svg className={`transition-transform duration-300 w-5 h-5 text-cyan-500 ${faqOpen===i?'rotate-180':''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
                                </button>
                                <AnimatePresence>
                                    {faqOpen === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 pb-5 text-sm text-neutral-400">
                                            {f.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 12. CHECKOUT */}
                <div className="py-20 relative bg-[#0A0A0F]/80 backdrop-blur-3xl border-t border-cyan-500/20">
                    <div id="checkout-game" className="max-w-2xl mx-auto px-6">
                        <div className="text-center mb-10">
                            <h3 className="text-4xl font-black uppercase tracking-tight text-white drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]">Desbloquea el Nivel</h3>
                            <p className="text-sm text-neutral-400 mt-2">Asegura tu unidad pagando al recibir. Sin fricción. Sin riesgo.</p>
                        </div>
                        <div className="relative p-[1px] rounded-[24px] overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-violet-500 opacity-50 glow-pulse"></div>
                            <div className="relative bg-[#040406] rounded-[23px] p-8 md:p-12 z-10">
                                <form className="space-y-6" onSubmit={e=>e.preventDefault()}>
                                    <input type="text" className="w-full px-5 py-4 rounded-xl bg-white/[0.03] border border-white/[0.05] focus:border-cyan-500 outline-none transition-all text-sm font-bold text-white" placeholder="Firma de Operador (Nombre)" />
                                    <input type="tel" className="w-full px-5 py-4 rounded-xl bg-white/[0.03] border border-white/[0.05] focus:border-cyan-500 outline-none transition-all text-sm font-bold text-white" placeholder="Comms (Teléfono Celular)" />
                                    <textarea rows={2} className="w-full px-5 py-4 rounded-xl bg-white/[0.03] border border-white/[0.05] focus:border-cyan-500 outline-none transition-all text-sm font-bold text-white resize-none" placeholder="Coordenadas (Dirección de envío)" />
                                    <button className="w-full rounded-xl font-black text-sm uppercase tracking-[0.2em] h-[70px] bg-cyan-500 text-black hover:bg-white transition-colors flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.4)] mt-4">
                                        Pagar y Recibir el Drop
                                    </button>
                                </form>
                                <div className="flex items-center justify-center gap-4 pt-6 opacity-60">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-green-400">Delivery Seguro</span>
                                    <span className="w-1 h-1 rounded-full bg-white/20"></span>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400">Zero Riesgo Financiero</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <div className="md:hidden fixed bottom-6 left-4 right-4 z-50">
                <div className="rounded-2xl backdrop-blur-2xl bg-[#040406]/90 border border-cyan-500/30 p-3 flex items-center justify-between shadow-[0_0_30px_rgba(6,182,212,0.4)]">
                    <div className="pl-2">
                        <div className="text-[10px] font-black text-cyan-400 uppercase tracking-widest mb-1">Monto Total</div>
                        <div className="font-black text-lg text-white leading-none">{fmtPrice(product.price)}</div>
                    </div>
                    <button onClick={() => document.getElementById('checkout-game')?.scrollIntoView({ behavior: 'smooth' })} className="px-6 py-4 rounded-xl font-black text-xs uppercase tracking-[0.15em] bg-cyan-500 text-[#040406]">
                        Finalizar
                    </button>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{__html: `
                @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
                .animate-marquee { animation: marquee 20s linear infinite; }
                .glow-pulse { animation: pulse-border 2s infinite; }
                @keyframes pulse-border { 0% { opacity: 0.4; } 50% { opacity: 0.8; } 100% { opacity: 0.4; } }
            `}} />
        </div>
    );
};

export default PdpGamingElite;
