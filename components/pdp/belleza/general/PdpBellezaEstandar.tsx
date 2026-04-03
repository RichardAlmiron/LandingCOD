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
  AuthorityBadge,
  StorytellerIntro,
  ProblemAgitation,
  GuaranteeBadge,
  SocialProofWall
} from '@/components/pdp/SharedCRO';
import ProductCarousel3D from '@/components/componentes-tiendas/ProductCarousel3D';
import EnhancedProductGallery from '@/components/pdp/EnhancedProductGallery';
import { Sparkles, Heart, Star, ArrowRight, ShieldCheck, Leaf } from 'lucide-react';

interface PDPProps {
  data: StoreData;
  product: Product;
  variant?: number;
}

export default function PdpBellezaEstandar({ data, product, variant = 1 }: PDPProps) {
  const [timeLeft, setTimeLeft] = useState({ h: 1, m: 20, s: 0 });
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
    primary: 'bg-rose-400',
    accent: 'bg-rose-50',
    text: 'text-rose-500',
    border: 'border-rose-100'
  };

  return (
    <div className="min-h-screen bg-rose-50/30 text-stone-800 font-sans pb-24 selection:bg-rose-100">
      {/* 1. Luxury Banner */}
      <div className="bg-rose-400 text-white text-center py-2 px-4 text-[10px] tracking-[0.2em] font-black uppercase sticky top-0 z-50 shadow-xl">
        REVELA TU BELLEZA NATURAL • OFERTA POR TIEMPO LIMITADO
      </div>

      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Visual Elegance Section */}
          <div className="lg:sticky lg:top-32 space-y-10">
            <div className="relative rounded-[3rem] overflow-hidden bg-white shadow-[0_40px_80px_-20px_rgba(244,114,182,0.2)]">
               <EnhancedProductGallery 
                 product={product}
                 accentColor="#f472b6"
               />
               <div className="absolute top-6 left-6 z-10">
                 <div className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-sm flex items-center space-x-2 border border-white">
                    <Sparkles className="w-4 h-4 text-rose-400" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-stone-600">Premium Glow Edition</span>
                 </div>
               </div>
            </div>
            
            <div className="flex justify-center gap-8">
               <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md"><Leaf className="w-6 h-6 text-emerald-400" /></div>
                  <span className="text-[9px] font-black uppercase opacity-60">100% Orgánico</span>
               </div>
               <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md"><ShieldCheck className="w-6 h-6 text-blue-400" /></div>
                  <span className="text-[9px] font-black uppercase opacity-60">Testado Lab</span>
               </div>
               <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md"><Heart className="w-6 h-6 text-rose-400" /></div>
                  <span className="text-[9px] font-black uppercase opacity-60">Cruelty Free</span>
               </div>
            </div>

            <TrustBar />
          </div>

          {/* Luxury Copy & Acquisition Area */}
          <div className="space-y-10">
            <div>
              <AuthorityBadge copy={copy} />
              <h1 className="text-4xl lg:text-5xl font-serif text-stone-900 leading-[0.9] mb-6">
                {ai?.enhancedTitle || product.title}
              </h1>
              
              <div className="flex items-center gap-6 mb-8">
                <div className="flex text-rose-300">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <div className="h-4 w-px bg-stone-200"></div>
                <LiveViewers colorClass="text-rose-500" bgClass="bg-rose-50" />
              </div>

              <div className="bg-white p-10 rounded-[3rem] relative overflow-hidden shadow-xl border border-rose-50">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-rose-100/50 rounded-full blur-3xl -mr-16 -mt-16"></div>
                 <div className="relative z-10">
                    <span className="text-rose-400 font-black text-[10px] uppercase tracking-widest mb-3 block">RUTINA DE LUJO EXCLUSIVA</span>
                    <div className="flex items-end gap-3 leading-none mb-6">
                       <span className="text-6xl font-serif text-stone-900">{fmtPrice(product.price)}</span>
                       <span className="text-2xl text-stone-300 line-through mb-1">{fmtPrice(product.originalPrice)}</span>
                    </div>
                    <ScarcityWarning colorClass="bg-rose-400" textClass="text-rose-100" />
                 </div>
              </div>
            </div>

             <div className="space-y-6">
               <p className="text-xl text-stone-900 font-black leading-relaxed italic">
                  "{(ai?.enhancedDescription || product.description).split('.')[0]}."
               </p>
               <p className="text-stone-900 leading-relaxed font-bold">
                  {(ai?.enhancedDescription || product.description).substring((ai?.enhancedDescription || product.description).indexOf('.') + 1)}
               </p>
            </div>

            <BundleOffer price={product.price} />

            <motion.button 
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => document.getElementById('checkout-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full bg-stone-900 hover:bg-black text-rose-100 py-8 rounded-[2rem] shadow-2xl flex flex-col items-center justify-center relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-rose-400/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="text-2xl font-black uppercase tracking-[0.2em] flex items-center gap-4">
                OBTENER MI PACK <ArrowRight className="w-8 h-8" />
              </span>
              <span className="text-[10px] font-bold text-rose-200/50 uppercase tracking-[0.3em] mt-1">Siente la Diferencia - Pago al Recibir</span>
            </motion.button>
            
            <FeatureGrid iconColor="text-rose-400" bgClass="bg-rose-50" />
          </div>
        </div>

        {/* Sensory Narrative Section */}
        <div className="mt-24 space-y-32">
          
          <StorytellerIntro product={product} copy={copy} />

          <ProblemAgitation product={product} copy={copy} />

          <ComparisonTable productName={ai?.enhancedTitle || product.title} copy={copy} />

          <HowItWorks />

          <SocialProofWall testimonials={ai?.testimonials} />

          <div className="max-w-4xl mx-auto">
             <InlineCODForm buttonColor="bg-rose-400" />
          </div>

          <FAQSection copy={copy} />
          
          <GuaranteeBadge />
        </div>
      </main>

      <StickyBuyButton buttonColor="bg-rose-400" />
      <RecentSalesPopup />
    </div>
  );
}



