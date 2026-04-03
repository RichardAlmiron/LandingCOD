'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { StoreData, Product } from '@/lib/types';
import { Star, Home, Sofa, Maximize, Sun, CheckCircle2, Clock, ShieldCheck, ArrowRight, Truck, Heart, ChevronDown, ChevronUp, Sparkles, AlertTriangle, Users, Activity, CheckCircle, Zap } from 'lucide-react';
import { 
  LiveViewers, 
  ScarcityWarning, 
  ProblemAgitation, 
  SolutionReveal, 
  BeforeAfter, 
  DeepDiveFeature, 
  ExpertEndorsement, 
  ComparisonTable, 
  BundleOffer, 
  SocialProofWall, 
  HowItWorks, 
  ShippingInfo, 
  FinalCTA, 
  InlineCODForm, 
  StickyBuyButton, 
  RecentSalesPopup,
  AuthorityBadge,
  StorytellerIntro,
  TrustBar,
  FAQSection,
  FeatureGrid,
  GuaranteeBadge
} from '@/components/pdp/SharedCRO';
import { getProductCopyPersona } from '@/lib/copy-engine';
import ProductCarousel3D from '@/components/componentes-tiendas/ProductCarousel3D';
import EnhancedProductGallery from '@/components/pdp/EnhancedProductGallery';

interface PDPProps {
  data: StoreData;
  product: Product;
  variant?: number;
}

export default function PdpHogarEstandar({ data, product, variant = 1 }: PDPProps) {
  const [timeLeft, setTimeLeft] = useState(7200); // 2 hours
  const [viewers, setViewers] = useState(87);
  const copy = useMemo(() => getProductCopyPersona(product), [product]);
  const ai = product.aiContent;
  const sec = ai?.sections;
  const fmtPrice = (n: number) => {
    const str = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `Gs. ${str}`;
  };

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0)), 1000);
    const viewerTimer = setInterval(() => setViewers(87), 6000);
    return () => { clearInterval(timer); clearInterval(viewerTimer); };
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const theme = { primary: 'bg-orange-800', text: 'text-orange-800', bgLight: 'bg-orange-100' };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-900 font-sans pb-24 selection:bg-orange-200">
      
      {/* 1. Urgency Banner */}
      <div className="bg-red-600 text-white text-center py-2 px-4 text-sm font-black flex items-center justify-center gap-2 tracking-wide sticky top-0 z-50 shadow-lg">
        <Clock className="w-4 h-4" />
        VENTA FLASH: TERMINA EN {formatTime(timeLeft)}
      </div>

      <main className="max-w-7xl mx-auto px-4 py-10 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          <div className="space-y-6 lg:sticky lg:top-32">
            <div className="relative rounded-[2.5rem] overflow-hidden bg-white shadow-2xl border border-stone-200">
               <EnhancedProductGallery 
                 product={product}
                 accentColor="#9a3412"
               />
               <div className="absolute top-6 left-6 z-10">
                 <div className="bg-stone-900/90 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-black text-white flex items-center shadow-lg tracking-widest uppercase">
                   <Home className="w-3 h-3 mr-2 text-orange-400" /> Tendencia Hogar 2024
                 </div>
               </div>
            </div>
            <TrustBar />
            <SocialProofWall testimonials={ai?.testimonials} />
          </div>

          <div className="space-y-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <span className="text-stone-900 font-black text-sm">{product.reviews} familias felices</span>
              </div>

              <AuthorityBadge copy={copy} />
              <h1 className="text-4xl lg:text-7xl font-black text-stone-950 leading-[0.8] mb-6 tracking-tighter uppercase">
                {ai?.enhancedTitle || product.title}
              </h1>
              
              <p className="text-xl text-stone-900 font-bold mb-8 leading-relaxed max-w-xl">
                 {ai?.enhancedDescription || product.description}
              </p>

              <div className="bg-stone-100 p-10 rounded-[2.5rem] border-2 border-stone-200 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-stone-900/5 rounded-full -mr-16 -mt-16"></div>
                <div className="relative z-10 flex justify-between items-end">
                   <div>
                     <span className="text-stone-500 font-black text-xs uppercase tracking-widest mb-1 block">PRECIO DE LANZAMIENTO</span>
                     <div className="flex items-baseline gap-3">
                        <span className="text-6xl font-black text-stone-950 tabular-nums">{fmtPrice(product.price)}</span>
                        <span className="text-2xl text-stone-400 line-through font-bold">{fmtPrice(product.originalPrice)}</span>
                     </div>
                   </div>
                   <div className="bg-red-600 text-white px-4 py-2 rounded-xl font-black text-sm animate-bounce">
                     -50% HOY
                   </div>
                </div>
                <div className="mt-8">
                  <ScarcityWarning colorClass="bg-orange-800" />
                </div>
              </div>
            </div>

            <BundleOffer price={product.price} />

            <div className="bg-stone-50 p-8 rounded-3xl border border-stone-200 shadow-sm">
               <h3 className="font-black text-xl mb-6 text-stone-900 flex items-center gap-2 uppercase tracking-tight">
                  <Truck className="w-6 h-6" /> Paga al recibir en casa
               </h3>
               <InlineCODForm buttonColor="bg-orange-800" />
            </div>
          </div>
        </div>

        <div className="mt-32 space-y-32">
           <StorytellerIntro product={product} copy={copy} />
           <ProblemAgitation product={product} copy={copy} />
           <SolutionReveal description={ai?.enhancedDescription} productName={ai?.enhancedTitle || product.title} />
           <BeforeAfter />
           <DeepDiveFeature title="Hecho para ser vivido" reversed={false} />
           <HowItWorks />
           <ComparisonTable productName={ai?.enhancedTitle || product.title} />
           <FinalCTA product={product} price={fmtPrice(product.price)} />
        </div>
      </main>

      <StickyBuyButton buttonColor="bg-orange-800" />
      <RecentSalesPopup />
      <GuaranteeBadge />
    </div>
  );
}



