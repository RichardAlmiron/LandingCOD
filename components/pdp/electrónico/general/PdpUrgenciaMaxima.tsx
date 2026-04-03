'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { StoreData, Product } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';
import { getProductCopyPersona } from '@/lib/copy-engine';
import { 
  LiveViewers, 
  ScarcityWarning, 
  TrustBar, 
  BundleOffer, 
  InlineCODForm, 
  StickyBuyButton, 
  RecentSalesPopup, 
  FAQSection, 
  FeatureGrid, 
  HowItWorks, 
  ComparisonTable,
  StorytellerIntro,
  AuthorityBadge,
  ProblemAgitation,
  SolutionReveal,
  SocialProofWall,
  GuaranteeBadge,
  FinalCTA
} from '@/components/pdp/SharedCRO';
import ProductCarousel3D from '@/components/componentes-tiendas/ProductCarousel3D';
import EnhancedProductGallery from '@/components/pdp/EnhancedProductGallery';
import { Zap, Timer, ArrowRight, ShieldCheck, Star } from 'lucide-react';

interface PDPProps {
  data: StoreData;
  product: Product;
  variant?: number;
}

export default function PdpUrgenciaMaxima({ data, product, variant = 1 }: PDPProps) {
  const [timeLeft, setTimeLeft] = useState({ h: 2, m: 14, s: 59 });

  const copy = useMemo(() => getProductCopyPersona(product), [product]);
  const ai = product.aiContent;
  const sec = ai?.sections;

  // Formatear precio en Guaraníes con puntos: Gs. 550.000
  const fmtPrice = (n: number) => {
    const rounded = Math.round(n);
    const str = rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `Gs. ${str}`;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 };
        if (prev.m > 0) return { ...prev, m: prev.m - 1, s: 59 };
        if (prev.h > 0) return { ...prev, h: prev.h - 1, m: 59, s: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const theme = {
    primary: 'bg-rose-600',
    text: 'text-rose-600',
    bgLight: 'bg-rose-50',
    border: 'border-rose-100',
    hover: 'hover:bg-rose-700'
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-rose-100 selection:text-rose-900 pb-24">
      {/* Dynamic Top Banner */}
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`${theme.primary} text-white py-3 px-4 shadow-2xl relative z-50 overflow-hidden`}
      >
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:250%_250%] animate-[shimmer_3s_infinite]"></div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 relative z-10">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-1 rounded-lg animate-pulse">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <span className="text-sm md:text-base font-black tracking-widest uppercase">
              {sec?.urgencyText || 'VENTA FLASH: 50% DE DESCUENTO FINALIZA EN:'}
            </span>
          </div>
          <div className="flex items-center space-x-4 bg-black/20 px-6 py-2 rounded-2xl backdrop-blur-md border border-white/10">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-black tabular-nums leading-none">{String(timeLeft.h).padStart(2, '0')}</span>
              <span className="text-[8px] font-bold opacity-70 uppercase tracking-widest">Horas</span>
            </div>
            <span className="text-xl font-bold opacity-50 mb-4">:</span>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-black tabular-nums leading-none">{String(timeLeft.m).padStart(2, '0')}</span>
              <span className="text-[8px] font-bold opacity-70 uppercase tracking-widest">Min</span>
            </div>
            <span className="text-xl font-bold opacity-50 mb-4">:</span>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-black tabular-nums leading-none">{String(timeLeft.s).padStart(2, '0')}</span>
              <span className="text-[8px] font-bold opacity-70 uppercase tracking-widest">Seg</span>
            </div>
          </div>
        </div>
      </motion.div>

      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* Visual Excellence Section (Media) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:sticky lg:top-32 space-y-6"
          >
            <div className="relative group overflow-hidden rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)]">
              <EnhancedProductGallery 
                product={product}
                accentColor="#e11d48"
              />
              <div className="absolute top-6 left-6 z-10">
                <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl flex items-center space-x-2 border border-slate-100">
                  <div className="flex -space-x-2">
                    {[1,2,3].map(i => <div key={i} className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white overflow-hidden shadow-sm flex items-center justify-center text-[10px] font-bold">U{i}</div>)}
                  </div>
                  <span className="text-[10px] font-black text-slate-900">{sec?.socialProofText || '+1.2k Vendidos'}</span>
                </div>
              </div>
            </div>
            
            <TrustBar />
            
            <div className="hidden lg:block">
              <SocialProofWall testimonials={ai?.testimonials} />
            </div>
          </motion.div>

          {/* Persuasive Info & Action Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              {/* Badges CRO superiores — profesionales, compactos */}
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <span className="inline-flex items-center bg-slate-900 text-white text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                  <svg className="w-3 h-3 mr-1" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0l2.5 5.3L16 6.2l-4 3.8 1 5.5L8 12.9l-5 2.6 1-5.5-4-3.8 5.5-.9z"/></svg>
                  {product.category || 'Producto'}
                </span>
                <span className="inline-flex items-center bg-emerald-50 text-emerald-700 text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border border-emerald-200">
                  <svg className="w-3 h-3 mr-1" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 1l1.5 3.2 3.5.5-2.5 2.5.6 3.5L8 9.2l-3.1 1.5.6-3.5L3 4.7l3.5-.5z"/><circle cx="8" cy="8" r="7"/></svg>
                  Garantía de Satisfacción
                </span>
                <span className="inline-flex items-center bg-amber-50 text-amber-700 text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border border-amber-200">
                  <svg className="w-3 h-3 mr-1" viewBox="0 0 16 16" fill="currentColor"><path d="M14 6H9.5L8 1 6.5 6H2l3.7 2.8-1.4 4.5L8 10.5l3.7 2.8-1.4-4.5z"/></svg>
                  {copy?.authority?.badgeText || 'Calidad Verificada'}
                </span>
              </div>
              
              {/* Título CRO — RECREADO por IA, con highlight decorativo */}
              <div className="mb-4">
                <h1 className="text-xl md:text-2xl font-bold text-slate-900 leading-tight">
                  {ai?.enhancedTitle || product.title}
                </h1>
                {ai?.tagline && (
                  <div className="mt-2 flex items-center gap-2">
                    <div className="w-8 h-[2px] bg-rose-500 rounded-full"></div>
                    <p className="text-sm text-slate-500 font-medium italic">{ai.tagline}</p>
                  </div>
                )}
              </div>

              {/* Viewers */}
              <div className="mb-5">
                <LiveViewers />
              </div>

              {/* Precio — Guaraníes con puntos */}
              <div className="relative p-5 rounded-2xl bg-slate-900 text-white shadow-lg overflow-hidden border border-slate-800">
                <div className="absolute top-0 right-0 w-40 h-40 bg-rose-600/15 rounded-full blur-[60px] -mr-20 -mt-20"></div>
                <div className="flex items-center justify-between relative z-10">
                  <div>
                    <span className="text-rose-400 font-bold text-[10px] uppercase tracking-[0.15em] block mb-1">Precio Sugerido</span>
                    <span className="text-3xl font-black tabular-nums tracking-tight">{fmtPrice(product.price)}</span>
                  </div>
                  <div className="bg-rose-600 text-white text-[10px] font-bold uppercase px-3 py-1.5 rounded-lg flex items-center gap-1">
                    <svg className="w-3 h-3" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0a8 8 0 100 16A8 8 0 008 0zm1 11H7V9h2v2zm0-3H7V4h2v4z"/></svg>
                    COD
                  </div>
                </div>
                <div className="mt-3 relative z-10">
                  <ScarcityWarning colorClass="bg-rose-500" textClass="text-rose-400" />
                </div>
              </div>
            </div>

            {/* Descripción CRO — RECREADA por IA, tarjetas con ícono SVG profesional */}
            <div className="space-y-2">
              {(ai?.enhancedDescription || product.description || '').split(/\.\s+|\.$/g).filter((s: string) => s.trim().length > 10).slice(0, 4).map((sentence: string, i: number) => (
                <div key={i} className="flex items-start gap-3 bg-gradient-to-r from-slate-50 to-white rounded-lg p-3.5 border border-slate-100 hover:border-slate-200 transition-colors">
                  <div className="w-6 h-6 rounded-lg bg-rose-600 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 8l3.5 3.5L13 4"/></svg>
                  </div>
                  <p className="text-[13px] text-slate-700 font-medium leading-relaxed">{sentence.trim()}.</p>
                </div>
              ))}
            </div>

            <BundleOffer price={product.price} />

            <motion.button 
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => document.getElementById('checkout-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full bg-rose-600 hover:bg-rose-700 text-white py-8 rounded-[2rem] shadow-[0_20px_50px_rgba(225,29,72,0.3)] flex flex-col items-center justify-center relative overflow-hidden group transition-all"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="text-2xl font-black uppercase tracking-widest relative z-10 flex items-center gap-3">
                {sec?.ctaPrimary || 'PEDIR AHORA'} <ArrowRight className="w-6 h-6 animate-pulse" />
              </span>
              <span className="text-[10px] font-bold opacity-70 uppercase tracking-[0.2em] relative z-10 mt-1">{sec?.ctaSecondary || 'NO SE REQUIERE TARJETA - PAGA AL RECIBIR'}</span>
            </motion.button>

            <FeatureGrid iconColor="text-rose-600" bgClass="bg-rose-50" />
          </motion.div>
        </div>

        {/* Narrative & Authority Flow */}
        <div className="mt-24 space-y-32">
          
          <StorytellerIntro product={product} copy={copy} />

          <ProblemAgitation product={product} copy={copy} />

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl border-8 border-slate-50 bg-slate-100">
               <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent flex flex-col items-center justify-end pb-10">
                 <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl flex items-center gap-4 border border-slate-100">
                   <div className="w-14 h-14 rounded-full bg-rose-600 flex items-center justify-center shadow-lg">
                     <svg className="w-6 h-6 text-white ml-1" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                   </div>
                   <div>
                     <p className="font-black text-slate-900 text-sm uppercase tracking-wider">Ver Demostración</p>
                     <p className="text-[10px] text-slate-500 font-bold">Descubre el producto en acción</p>
                   </div>
                 </div>
               </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-black text-slate-900 leading-tight tracking-tight">
                {sec?.heroHeadline || ai?.enhancedTitle || product.title}
              </h2>
              {sec?.heroSubheadline && (
                <p className="text-base text-slate-500 font-medium">{sec.heroSubheadline}</p>
              )}
              <ul className="space-y-5">
                {(sec?.benefitsBullets || [
                  "Calidad premium garantizada.",
                  "Envío express a tu puerta.",
                  "Paga solo al recibir.",
                  "Satisfacción 100% garantizada."
                ]).slice(0, 4).map((item: string, i: number) => (
                  <motion.li 
                    key={i} 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 text-lg font-bold text-slate-700"
                  >
                    <div className="h-6 w-6 rounded-full bg-emerald-500 fill-white flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-4 h-4 text-white" />
                    </div>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          <SolutionReveal product={product} description={ai?.enhancedDescription} productName={ai?.enhancedTitle || product.title} />

          <HowItWorks />

          <ComparisonTable productName={ai?.enhancedTitle || product.title} copy={copy} />

          <GuaranteeBadge />

          <div className="max-w-4xl mx-auto">
             <InlineCODForm />
          </div>

          <FAQSection copy={copy} />

          <FinalCTA product={product} price={fmtPrice(product.price)} />
        </div>
      </main>

      <StickyBuyButton buttonColor="bg-rose-600" />
      <RecentSalesPopup />
      
      {/* Visual background details */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none opacity-20">
        <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] bg-rose-200 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[30vw] h-[30vw] bg-blue-100 rounded-full blur-[100px]"></div>
      </div>
    </div>
  );
}



