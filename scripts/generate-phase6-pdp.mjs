import fs from 'fs';
import path from 'path';

const products = [
  { pId: 'PdpDjiMavic3', cat: 'drones', name: 'DJI Mavic 3 Classic', type: 'Dron Profesional', img: 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?q=80&w=1000', price: 'Gs. 13.500.000', oprice: 'Gs. 15.000.000' },
  { pId: 'PdpMacBookProM2', cat: 'laptops', name: 'MacBook Pro M2 Max 16"', type: 'Laptop Producción', img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1000', price: 'Gs. 29.000.000', oprice: 'Gs. 32.500.000' },
  { pId: 'PdpGoProHero12', cat: 'camaras-accion', name: 'GoPro HERO12 Black', type: 'Cámara Acción', img: 'https://images.unsplash.com/photo-1521405924368-64c5b828fcb0?q=80&w=1000', price: 'Gs. 3.200.000', oprice: 'Gs. 4.100.000' },
  { pId: 'PdpPs5Disc', cat: 'consolas', name: 'Sony PlayStation 5', type: 'Consola Premium', img: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=1000', price: 'Gs. 4.900.000', oprice: 'Gs. 5.500.000' },
  { pId: 'PdpSwitchOLED', cat: 'consolas', name: 'Nintendo Switch OLED', type: 'Consola Portátil', img: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?q=80&w=1000', price: 'Gs. 3.000.000', oprice: 'Gs. 3.600.000' },
  { pId: 'PdpMetaQuest3', cat: 'vr', name: 'Oculus Meta Quest 3', type: 'Realidad Mixta', img: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=1000', price: 'Gs. 4.500.000', oprice: 'Gs. 5.200.000' },
  { pId: 'PdpJblPartyBox', cat: 'audio', name: 'JBL PartyBox 710', type: 'Audio Alta Potencia', img: 'https://images.unsplash.com/photo-1612444530582-fc66183b16f7?q=80&w=1000', price: 'Gs. 6.800.000', oprice: 'Gs. 8.000.000' },
  { pId: 'PdpBoseUltra', cat: 'audio', name: 'Bose QC Ultra', type: 'Auriculares Over-Ear', img: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=1000', price: 'Gs. 3.500.000', oprice: 'Gs. 4.200.000' },
  { pId: 'PdpGalaxyS24U', cat: 'celulares', name: 'Samsung S24 Ultra 512GB', type: 'Smartphone Flagship', img: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=1000', price: 'Gs. 9.800.000', oprice: 'Gs. 11.000.000' },
  { pId: 'PdpIphone15PM', cat: 'celulares', name: 'iPhone 15 Pro Max', type: 'Smartphone Flagship', img: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=1000', price: 'Gs. 10.500.000', oprice: 'Gs. 12.000.000' },
  { pId: 'PdpIpadPro12', cat: 'tablets', name: 'iPad Pro 12.9" M2', type: 'Tablet Profesional', img: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=1000', price: 'Gs. 9.200.000', oprice: 'Gs. 10.500.000' },
  { pId: 'PdpGarminFenix7X', cat: 'wearables', name: 'Garmin Fenix 7X Pro', type: 'Reloj Táctico Solar', img: 'https://images.unsplash.com/photo-1635391211756-34a8bb83a152?q=80&w=1000', price: 'Gs. 7.900.000', oprice: 'Gs. 9.000.000' },
  { pId: 'PdpEchoShow15', cat: 'hogar-smart', name: 'Amazon Echo Show 15', type: 'Smart Display Hub', img: 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?q=80&w=1000', price: 'Gs. 2.500.000', oprice: 'Gs. 3.200.000' },
  { pId: 'PdpRoborockS8', cat: 'hogar-smart', name: 'Roborock S8 Pro Ultra', type: 'Aspiradora Autónoma', img: 'https://plus.unsplash.com/premium_photo-1682148403197-697b0dbec4ff?q=80&w=1000', price: 'Gs. 12.000.000', oprice: 'Gs. 13.500.000' },
  { pId: 'PdpDecoBE85', cat: 'redes', name: 'TP-Link Deco BE85', type: 'Router Malla Wi-Fi 7', img: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1000', price: 'Gs. 8.500.000', oprice: 'Gs. 9.800.000' },
  { pId: 'PdpGProSuperlight', cat: 'gaming', name: 'Logitech G Pro X 2', type: 'Mouse Esports', img: 'https://images.unsplash.com/photo-1527814050087-14be2611e2f3?q=80&w=1000', price: 'Gs. 1.300.000', oprice: 'Gs. 1.800.000' },
  { pId: 'PdpBlackWidowV4', cat: 'gaming', name: 'Razer BlackWidow V4', type: 'Teclado Mecánico', img: 'https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=1000', price: 'Gs. 1.900.000', oprice: 'Gs. 2.400.000' },
  { pId: 'PdpOdysseyOLED', cat: 'monitores', name: 'Samsung Odyssey G9', type: 'Monitor Ultrawide 49"', img: 'https://plus.unsplash.com/premium_photo-1683326528070-4eb62c4a92c0?q=80&w=1000', price: 'Gs. 15.500.000', oprice: 'Gs. 18.000.000' },
  { pId: 'PdpAnker767', cat: 'outdoor', name: 'Anker PowerHouse 767', type: 'Generador Portátil', img: 'https://images.unsplash.com/photo-1584981144066-5e04df7cb212?q=80&w=1000', price: 'Gs. 18.000.000', oprice: 'Gs. 21.000.000' },
  { pId: 'PdpOsmoMobile6', cat: 'fotografía', name: 'DJI Osmo Mobile 6', type: 'Estabilizador IA', img: 'https://images.unsplash.com/photo-1611082534575-cf511a3b9eb2?q=80&w=1000', price: 'Gs. 1.500.000', oprice: 'Gs. 2.100.000' }
];

function generate15SectionTemplate(prod) {
  // Ultra-premium aesthetic logic
  const bgColors = ['bg-[#0a0a0a]', 'bg-[#111]', 'bg-[#0f0f13]']; // Dark sleek electronic backgrounds
  const rootBg = bgColors[Math.floor(Math.random()*bgColors.length)];
  
  return `'use client';
import React, { useState } from 'react';
import { StoreData, Product } from '@/lib/types';
import EnhancedProductGallery from '@/components/pdp/EnhancedProductGallery';
import { motion, AnimatePresence } from 'framer-motion';

interface Props { data: StoreData; product: Product; }

const ${prod.pId}: React.FC<Props> = ({ data, product }) => {
    const [faqOpen, setFaqOpen] = useState<number | null>(null);
    const ai = product.aiContent;
    const fmtPrice = (n: number) => { const s = Math.round(n).toString().replace(/\\B(?=(\\d{3})+(?!\\d))/g, '.'); return \`Gs. \${s}\`; };
    
    // Aesthetic Palette Default
    const bg = '#0a0a0a';
    const textMain = '#fafafa';

    return (
        <div style={{ background: bg, color: textMain }} className="font-sans antialiased selection:bg-indigo-500 selection:text-white">
            {/* 1. TOP NAV */}
            <header className="sticky top-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-2xl border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-5 flex items-center justify-between">
                    <div className="text-xl font-bold tracking-widest text-white uppercase flex items-center gap-2">
                        <span className="w-6 h-6 bg-white text-black flex items-center justify-center text-xs">SC</span>
                        SHOPPING CHINA <span className="text-neutral-500 font-light">| TECH</span>
                    </div>
                </div>
            </header>

            <main className="relative z-10 w-full overflow-hidden">
                {/* 2. BREADCRUMBS & LOGISTICS */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 pb-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-900 pb-4">
                        <div className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">
                            INVENTARIO / ${prod.cat.toUpperCase()} / <span className="text-white">${prod.type.toUpperCase()}</span>
                        </div>
                        <div className="inline-flex items-center gap-2 text-[9px] text-white uppercase tracking-widest bg-emerald-500/10 px-3 py-1.5 border border-emerald-500/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            Distribución COD Certificada
                        </div>
                    </div>
                </div>

                {/* 3. HERO (EDITORIAL) */}
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 lg:py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="flex flex-col relative z-20">
                            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
                                {product.title || '${prod.name}'}
                            </h1>
                            <p className="text-base md:text-lg font-light text-neutral-400 mb-10 leading-relaxed">
                                {ai?.enhancedDescription || product.description || 'Extraído del inventario premium de Shopping China. Rendimiento absoluto. Diseñado para cruzar los límites del diseño y la ingeniería moderna, llevando el desempeño en ${prod.cat} al siguiente nivel.'}
                            </p>
                            
                            <div className="bg-neutral-900 border border-neutral-800 p-8 flex flex-col gap-6">
                                <div className="flex items-end gap-4">
                                    <span className="text-4xl font-bold text-white">${prod.price}</span>
                                    <span className="text-lg text-neutral-500 line-through pb-1">${prod.oprice}</span>
                                </div>
                                <button onClick={() => document.getElementById('checkout')?.scrollIntoView({ behavior: 'smooth' })} className="w-full bg-white text-black py-5 font-bold uppercase tracking-[0.2em] hover:bg-neutral-200 transition-all">
                                    Asegurar Inventario
                                </button>
                                <div className="text-[10px] text-center text-neutral-500 uppercase tracking-widest">
                                    Sin riesgo financiero hasta recibirlo
                                </div>
                            </div>
                        </div>

                        {/* NO aspect-square / overflow-hidden to prevent gallery clipping issues */}
                        <div className="w-full relative flex items-center justify-center">
                            <EnhancedProductGallery product={{...product, imageUrl: '${prod.img}'}} accentColor="#ffffff" />
                        </div>
                    </div>
                </div>

                {/* 4. TRUST BADGES TECHNICAL */}
                <div className="border-y border-neutral-900 bg-[#050505]">
                    <div className="max-w-7xl mx-auto px-4 py-8 flex flex-wrap justify-center md:justify-between items-center gap-8">
                        {[
                            {v: '12 Meses', l: 'Garantía C.O.D'},
                            {v: 'Original', l: 'Sello de Fábrica'},
                            {v: 'Verificado', l: 'Quality Control'},
                            {v: 'Rápido', l: 'Logística 24H'}
                        ].map((b, i) => (
                            <div key={i} className="text-center">
                                <div className="text-xl text-white font-bold mb-1">{b.v}</div>
                                <div className="text-[9px] uppercase tracking-widest text-neutral-500">{b.l}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 5. EXPERT ACCORDIONS */}
                <div className="max-w-4xl mx-auto px-4 py-24">
                    <h2 className="text-3xl font-bold text-white mb-10 text-center">Ficha Técnica Oficial</h2>
                    <div className="border-t border-neutral-900">
                        {[
                            { t: 'ESPECIFICACIONES NÚCLEO', a: 'Arquitectura de alto rendimiento con los últimos protocolos del mercado. Ensamblado con precisión milimétrica para durabilidad a largo plazo. Compatible con estándares globales.' },
                            { t: 'CONTENIDO DE LA CAJA', a: 'Unidad principal, manual de usuario original, cables de alimentación y accesorios documentados de fábrica. Caja sellada con bandas de seguridad.' },
                            { t: 'GARANTÍA Y SOPORTE', a: 'Soporte técnico y garantía de cambio por defectos de fábrica directamente a través de nuestro canal. Cubre daños sistémicos no provocados.' }
                        ].map((ac, i) => (
                            <div key={i} className="border-b border-neutral-900">
                                <button className="w-full py-8 flex justify-between text-left text-sm font-bold uppercase tracking-widest text-white">
                                    <span>0{i+1}. {ac.t}</span>
                                </button>
                                <div className="pb-8 text-neutral-400 font-light leading-relaxed">{ac.a}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 6. ENDLESS MARQUEE */}
                <div className="w-[100vw] overflow-hidden py-10 bg-white text-black border-y border-neutral-900 relative left-[50%] -translate-x-[50%] flex transform">
                    <div className="flex whitespace-nowrap font-bold text-4xl uppercase tracking-tighter">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="flex items-center gap-10 px-8">
                                <span>INGENIERÍA EXTREMA</span>
                                <span>/</span>
                                <span>DISEÑO ABSOLUTO</span>
                                <span>/</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 7. WHY TO USE / BENEFITS */}
                <div className="max-w-7xl mx-auto px-4 py-32 border-b border-neutral-900">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        <div>
                            <span className="text-indigo-400 text-[10px] font-bold uppercase tracking-widest mb-4 block">El Cambio Paradigmático</span>
                            <h2 className="text-4xl text-white font-bold leading-tight mb-6">Porque el hardware lento tiene un costo oculto muy alto.</h2>
                            <p className="text-neutral-400 leading-relaxed font-light mb-8">El hardware anticuado ralentiza tu flujo de trabajo, merma tu productividad y arruina la experiencia de entretenimiento. Es el momento de la actualización definitiva.</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {[
                                { t: 'Velocidad Ilimitada', d: 'Capacidad de respuesta inmediata que destruye cuellos de botella.' },
                                { t: 'Diseño Térmico', d: 'Múltiples vías de disipación para evitar sobrecalentamiento bajo carga.' },
                                { t: 'Integración Visual', d: 'Atractivo para configuraciones minimalistas o profesionales.' },
                                { t: 'Confiabilidad', d: 'Hardware validado intensivamente bajo stress-tests crudos.' }
                            ].map((b, i) => (
                                <div key={i} className="bg-neutral-900/50 p-6 border border-white/5">
                                    <h4 className="text-white font-bold mb-2">{b.t}</h4>
                                    <p className="text-xs text-neutral-500">{b.d}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 8. HOW TO USE / SET UP AESTHETIC */}
                <div className="py-24 bg-[#111]">
                    <div className="max-w-6xl mx-auto px-4 text-center">
                        <h2 className="text-3xl text-white font-bold mb-16">Secuencia de Activación.</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { s: 'Desempaque', d: 'Retira los precintos logísticos del embalaje premium y comprueba los componentes.' },
                                { s: 'Encendido Base', d: 'Conecta o carga el terminal por 30 minutos antes del primer uso riguroso.' },
                                { s: 'Despliegue', d: 'Lista para operar. Integración plug-and-play sin instalaciones dolorosas.' }
                            ].map((s, i) => (
                                <div key={i} className="p-8 border border-neutral-800">
                                    <div className="text-4xl font-light text-neutral-700 mb-6">0{i+1}</div>
                                    <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-4">{s.s}</h4>
                                    <p className="text-neutral-500 font-light text-sm">{s.d}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 9. VISUAL SHOWCASE / FEATURED IMAGE */}
                <div className="w-full h-[60vh] relative">
                    <img src="${prod.img}" alt="Lifestyle ${prod.name}" className="w-full h-full object-cover opacity-50 grayscale" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm">
                        <h2 className="text-5xl text-white font-bold tracking-tight mb-4">Arquitectura Perfecta.</h2>
                        <p className="text-neutral-300 font-light">Mire de cerca los detalles de construcción.</p>
                    </div>
                </div>

                {/* 10. COMPARISON TABLE */}
                <div className="max-w-4xl mx-auto px-4 py-32">
                    <h2 className="text-2xl text-white font-bold text-center mb-16">No Aceptes Imitaciones.</h2>
                    <div className="border border-neutral-800">
                        <div className="grid grid-cols-3 bg-neutral-900 text-[10px] uppercase tracking-widest font-bold text-neutral-500">
                            <div className="p-6">Atributo</div>
                            <div className="p-6 text-white text-center border-x border-neutral-800">Stock Shopping China</div>
                            <div className="p-6 text-center">Alternativas Locales</div>
                        </div>
                        {[
                            { k: 'Materiales', u: 'Aleaciones Premium / Originales', t: 'Plásticos Reciclados' },
                            { k: 'Garantía', u: 'Directa y Resolutiva', t: 'Inexistente o Dilatada' },
                            { k: 'Empaque', u: 'Caja Sellada Fábrica', t: 'Cajas Abiertas en Aduana' },
                            { k: 'Autenticidad', u: 'Verificable vía Serial', t: 'Difícil Rastreo' }
                        ].map((r, i) => (
                            <div key={i} className="grid grid-cols-3 border-t border-neutral-800 font-light text-sm">
                                <div className="p-6 text-neutral-400">{r.k}</div>
                                <div className="p-6 text-white text-center font-bold border-x border-neutral-800 bg-white/5">{r.u}</div>
                                <div className="p-6 text-neutral-600 text-center line-through">{r.t}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 11. RISK REVERSAL WARRANTY */}
                <div className="border-y border-neutral-900 bg-neutral-950 py-16">
                    <div className="max-w-4xl mx-auto px-4 text-center">
                        <div className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">!</div>
                        <h3 className="text-2xl text-white font-bold mb-4">Garantía Extrema C.O.D.</h3>
                        <p className="text-neutral-400 font-light leading-relaxed max-w-2xl mx-auto">
                            No pagas nada por internet. Ingresas el pedido, nuestro transporte asegura tu ruta, y te toca revisar el pedido en la puerta de tu hogar u oficina antes de abonar al mensajero. El blindaje absoluto de tu dinero.
                        </p>
                    </div>
                </div>

                {/* 12. BRAND ETHOS */}
                <div className="py-24 max-w-2xl mx-auto px-4 text-center border-b border-neutral-900">
                    <h3 className="text-xl text-white font-bold mb-6">Potenciando tu ecosistema.</h3>
                    <p className="text-neutral-500 font-light leading-loose text-sm">Traemos el inventario más agresivo y premium a tus manos usando los canales logísticos más veloces de la historia. Menos fricción administrativa, más hardware en tu escritorio.</p>
                </div>

                {/* 13. FAQ */}
                <div className="max-w-3xl mx-auto px-4 py-24 border-b border-neutral-900">
                    <h2 className="text-2xl text-white font-bold mb-12">Respuestas Operativas.</h2>
                    <div className="space-y-2">
                        {[
                            {q: '¿Cuál es el tiempo de tránsito desde la central?', a: 'Usualmente entre 24 y 48 horas operativas dependiendo de su latitud residencial.'},
                            {q: '¿Cómo ejecuto la garantía si falla al mes?', a: 'Comunícate a la línea de WhatsApp provista en tu factura y el mensajero retirará la unidad fallida sin costo.'},
                            {q: '¿Reciben transferencias al momento de entrega?', a: 'Absolutamente. SIPAP, billetes en efectivo y billeteras electrónicas. Todo frente a nuestro propio agente.'}
                        ].map((f, i) => (
                            <div key={i} className="border border-neutral-800 bg-neutral-900/30">
                                <button onClick={() => setFaqOpen(faqOpen===i?null:i)} className="w-full p-6 text-left flex justify-between items-center text-white font-bold text-sm">
                                    {f.q}
                                    <span className="text-neutral-500">{faqOpen===i?'-':'+'}</span>
                                </button>
                                <AnimatePresence>
                                    {faqOpen === i && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 pb-6 text-neutral-500 font-light text-sm leading-relaxed">
                                            {f.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 14. EXPANDED REVIEWS */}
                <div className="py-24 bg-[#0a0a0a]">
                    <div className="max-w-7xl mx-auto px-4">
                        <h2 className="text-2xl text-white font-bold mb-16 text-center">Despachos Funcionales.</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { r: "Llegó completamente sellado de fábrica. El repartidor me esperó a que yo abriera la caja antes de abonarle. Servicio espectacular.", n: "David R.", t: "Asesor Comercial" },
                                { r: "Es increíble no tener que meter tarjetas de crédito en sitios raros. Pido el gadget, viene al otro día, pago. Fin.", n: "Carlos M.", t: "Desarrollador" },
                                { r: "Rendimiento perfecto, todo original. Excelente la calidad del embalaje anti-escombros.", n: "Sonia G.", t: "Diseñadora" }
                            ].map((rev, i) => (
                                <div key={i} className="p-8 border border-neutral-800 bg-neutral-900/50">
                                    <p className="text-neutral-400 font-light mb-6">"{rev.r}"</p>
                                    <div className="text-white font-bold text-xs uppercase tracking-widest">{rev.n}</div>
                                    <div className="text-neutral-600 text-[10px] uppercase tracking-widest mt-1">{rev.t}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 15. CHECKOUT */}
                <div id="checkout" className="py-24 border-t border-neutral-800">
                    <div className="max-w-5xl mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-5xl font-bold text-white mb-6">Protocolo de Despacho.</h2>
                                <p className="text-neutral-400 font-light mb-8">Completa el formulario logístico ahora. Reserva el stock que trajimos directamente desde la cuna de Shopping China. Paga al recepcionar.</p>
                                <div className="text-4xl text-white font-bold">${prod.price}</div>
                            </div>
                            <div className="bg-[#111] border border-neutral-800 p-8 shadow-2xl relative">
                                <div className="absolute top-0 left-0 w-full h-1 bg-white/10"></div>
                                <div className="space-y-6">
                                    <input type="text" placeholder="Nombre Destinatario" className="w-full bg-transparent border-b border-neutral-700 p-4 text-white uppercase text-xs tracking-widest focus:border-white outline-none transition-colors" />
                                    <input type="tel" placeholder="Número Telefónico" className="w-full bg-transparent border-b border-neutral-700 p-4 text-white uppercase text-xs tracking-widest focus:border-white outline-none transition-colors" />
                                    <textarea rows={2} placeholder="Dirección Exacta" className="w-full bg-transparent border-b border-neutral-700 p-4 text-white uppercase text-xs tracking-widest focus:border-white outline-none transition-colors resize-none"></textarea>
                                    <button className="w-full bg-white text-black font-bold uppercase tracking-[0.2em] py-5 hover:bg-neutral-200 transition-colors mt-4 text-xs">
                                        Confirmar Pase COD
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </main>
            
            {/* STICKY MOBILE CTA */}
            <div className="md:hidden fixed bottom-4 left-4 right-4 z-50">
                <button onClick={() => document.getElementById('checkout')?.scrollIntoView({ behavior: 'smooth' })} className="w-full bg-white text-black py-4 font-bold uppercase tracking-widest text-xs shadow-2xl">
                    Solicitar (${prod.price})
                </button>
            </div>
        </div>
    );
};

export default ${prod.pId};
`;
}

products.forEach(prod => {
    const dir = path.join('components', 'pdp', 'electrónico', prod.cat);
    fs.mkdirSync(dir, { recursive: true });
    
    const filePath = path.join(dir, `${prod.pId}.tsx`);
    fs.writeFileSync(filePath, generate15SectionTemplate(prod));
    console.log(`Generated ${filePath}`);
});

console.log('\\nPhase 6 Components Generation Complete! 20 items created.');
