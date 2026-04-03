'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { StoreData, Product } from '@/lib/types';
import { motion } from 'framer-motion';
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
  AuthorityBadge,
  StorytellerIntro,
  ProblemAgitation,
  GuaranteeBadge
} from '@/components/pdp/SharedCRO';
import ProductCarousel3D from '@/components/componentes-tiendas/ProductCarousel3D';
import EnhancedProductGallery from '@/components/pdp/EnhancedProductGallery';
import { Wrench, Hammer, Shield, Star, ArrowRight, Settings } from 'lucide-react';

interface PDPProps {
  data: StoreData;
  product: Product;
  variant?: number;
}

export default function PdpHerramientasEstandar({ data, product, variant = 1 }: PDPProps) {
  const [timeLeft, setTimeLeft] = useState({ h: 3, m: 45, s: 0 });
  const copy = useMemo(() => getProductCopyPersona(product), [product]);
  const ai = product.aiContent;
  const sec = ai?.sections;
  const fmtPrice = (n: number) => {
    const str = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
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
    primary: 'bg-zinc-900',
    accent: 'bg-amber-500',
    text: 'text-zinc-900',
    bgLight: 'bg-zinc-50'
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-24">
      {/* Professional Header */}
      <header className="bg-zinc-900 text-white py-4 px-6 sticky top-0 z-50 shadow-2xl">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Settings className="w-6 h-6 text-amber-500 animate-[spin_4s_linear_infinite]" />
            <span className="font-black text-xl tracking-tighter uppercase">{data.logoText || 'TEK-PRO'}</span>
          </div>
          <div className="hidden md:flex items-center space-x-6 text-[10px] font-black tracking-widest uppercase">
            <span className="text-amber-500 flex items-center gap-1"><Shield className="w-3 h-3" /> GARANTÍA PRO</span>
            <span>ENVÍO PRIORITARIO</span>
            <span>SOPORTE TÉCNICO</span>
          </div>
          <div className="bg-amber-500 text-zinc-900 px-4 py-1 rounded-full text-xs font-black animate-pulse">
            OFERTA LIMITADA
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Technical Visualization Area */}
          <div className="lg:sticky lg:top-32 space-y-8">
            <div className="relative rounded-[2rem] overflow-hidden bg-white shadow-2xl border border-slate-200">
              <EnhancedProductGallery 
                product={product}
                accentColor="#f59e0b"
              />
              <div className="absolute top-0 right-0 p-6 z-10">
                <div className="bg-zinc-900/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-zinc-700 shadow-2xl">
                   <span className="text-amber-500 font-black text-[10px] uppercase tracking-widest">EDICIÓN PROFESIONAL</span>
                </div>
              </div>
            </div>
            
            <TrustBar />
          </div>

          {/* Precision Specification & Purchase Area */}
          <div className="space-y-10">
            <div>
              <AuthorityBadge copy={copy} />
              <h1 className="text-4xl lg:text-6xl font-black text-zinc-900 uppercase tracking-tighter leading-none mb-6">
                {ai?.enhancedTitle || product.title}
              </h1>
              
              <div className="flex items-center gap-6 mb-8">
                <div className="flex text-amber-400">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <div className="h-4 w-px bg-slate-200"></div>
                <LiveViewers colorClass="text-zinc-900" bgClass="bg-zinc-100" />
              </div>

              <div className="bg-zinc-900 text-white p-10 rounded-[2.5rem] relative overflow-hidden shadow-2xl border border-zinc-800">
                 <div className="absolute -bottom-10 -right-10 opacity-10">
                    <Wrench className="w-64 h-64" />
                 </div>
                 <div className="relative z-10">
                    <span className="text-amber-500 font-black text-xs uppercase tracking-widest mb-2 block">PRECIO DE LANZAMIENTO</span>
                    <div className="flex items-end gap-3 leading-none mb-6">
                       <span className="text-6xl font-black tabular-nums">{fmtPrice(product.price)}</span>
                       <span className="text-2xl text-zinc-500 line-through font-bold mb-1">{fmtPrice(product.originalPrice)}</span>
                    </div>
                    <ScarcityWarning colorClass="bg-amber-500" textClass="text-amber-100" />
                 </div>
              </div>
            </div>

             <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                <p className="text-lg font-black text-zinc-950 leading-relaxed italic border-l-4 border-amber-500 pl-6">
                   {(ai?.enhancedDescription || product.description).split('.')[0]}.
                </p>
                <p className="mt-4 text-zinc-800 leading-relaxed font-black">
                   {(ai?.enhancedDescription || product.description).substring((ai?.enhancedDescription || product.description).indexOf('.') + 1)}
                </p>
             </div>

            <BundleOffer price={product.price} colorClass="border-zinc-900" bgClass="bg-zinc-50" textClass="text-zinc-900" />

            <motion.button 
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => document.getElementById('checkout-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full bg-zinc-900 hover:bg-black text-white py-8 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] flex flex-col items-center justify-center relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="text-2xl font-black uppercase tracking-[0.1em] flex items-center gap-3">
                ORDENAR EQUIPO <ArrowRight className="w-8 h-8" />
              </span>
              <span className="text-[10px] font-black text-zinc-100 uppercase tracking-widest mt-1">PAGAR AL RECIBIR - STOCK PROFESIONAL LIMITADO</span>
            </motion.button>
            
            <FeatureGrid iconColor="text-zinc-900" bgClass="bg-zinc-100" />
          </div>
        </div>

        {/* Technical Narrative Section */}
        <div className="mt-24 space-y-32">
          
          <StorytellerIntro product={product} copy={copy} />

          <div className="max-w-4xl mx-auto">
             <ProblemAgitation product={product} copy={copy} />
          </div>

          <ComparisonTable productName={ai?.enhancedTitle || product.title} copy={copy} />

          <HowItWorks />

          <GuaranteeBadge />

          <div className="max-w-4xl mx-auto">
             <InlineCODForm buttonColor="bg-zinc-900" />
          </div>

          <FAQSection copy={copy} />
        </div>
      </main>

      <StickyBuyButton buttonColor="bg-zinc-900" />
      <RecentSalesPopup />
    </div>
  );
}



