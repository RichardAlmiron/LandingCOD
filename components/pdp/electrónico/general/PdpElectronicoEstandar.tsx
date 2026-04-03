'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { StoreData, Product } from '@/lib/types';
import { Sparkles, Zap, ShieldCheck, Star } from 'lucide-react';
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

export default function PdpElectronicoEstandar({ data, product, variant = 1 }: PDPProps) {
  const [timeLeft, setTimeLeft] = useState(3600);
  const copy = useMemo(() => getProductCopyPersona(product), [product]);
  const ai = product.aiContent;
  const sec = ai?.sections;
  const fmtPrice = (n: number) => {
    const str = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `Gs. ${str}`;
  };

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, []);

  const theme = {
    primary: 'bg-blue-700',
    text: 'text-blue-700',
    bgLight: 'bg-blue-50',
    border: 'border-blue-200',
    hover: 'hover:bg-blue-800'
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-24 selection:bg-blue-100">
      
      {/* 1. Tech Banner */}
      <div className="bg-slate-950 text-white text-center py-2 px-4 text-[10px] font-black tracking-[0.3em] flex items-center justify-center gap-2 sticky top-0 z-50 uppercase">
        <Sparkles className="w-3.5 h-3.5 text-blue-400" />
        SISTEMA DE ALTO RENDIMIENTO • EDICIÓN 2024
      </div>

      <main className="max-w-7xl mx-auto px-4 py-10 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          <div className="space-y-6 lg:sticky lg:top-32">
            <div className="relative rounded-[2.5rem] overflow-hidden bg-white shadow-2xl border border-slate-200">
               <EnhancedProductGallery 
                 product={product}
                 accentColor="#1d4ed8"
               />
            </div>
            <TrustBar />
            <SocialProofWall testimonials={ai?.testimonials} />
          </div>

          <div className="space-y-10">
            <div>
              <div className="flex items-center gap-3 mb-6">
                 <LiveViewers colorClass="text-blue-600 font-black text-sm uppercase" />
                 <div className="h-4 w-px bg-slate-200"></div>
                 <span className="text-slate-900 font-black text-sm tabular-nums underline decoration-blue-500 decoration-2">{product.reviews} Unidades Vendidas</span>
              </div>

              <AuthorityBadge copy={copy} />
              <h1 className="text-5xl lg:text-8xl font-black text-slate-950 leading-[0.8] mb-6 tracking-tighter uppercase italic">
                {ai?.enhancedTitle || product.title}
              </h1>
              
              <div className="bg-white p-8 rounded-[2rem] border-2 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] mb-10">
                 <p className="text-xl text-slate-950 font-black leading-tight mb-8">
                    {ai?.enhancedDescription || product.description}
                 </p>
                 <div className="flex items-baseline gap-4">
                    <span className="text-6xl font-black text-blue-700 tabular-nums">{fmtPrice(product.price)}</span>
                    <span className="text-2xl text-slate-300 line-through font-bold">{fmtPrice(product.originalPrice)}</span>
                 </div>
              </div>

              <ScarcityWarning colorClass="bg-red-600" />
            </div>

            <BundleOffer price={product.price} />

            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-lg">
               <h3 className="font-black text-xl mb-6 text-slate-950 flex items-center gap-3 uppercase tracking-tighter">
                  <Zap className="w-6 h-6 text-blue-600" /> Paga al recibir en efectivo
               </h3>
               <InlineCODForm buttonColor="bg-blue-700" />
            </div>
          </div>
        </div>

        <div className="mt-32 space-y-32">
           <StorytellerIntro product={product} copy={copy} />
           <ProblemAgitation product={product} copy={copy} />
           <SolutionReveal description={ai?.enhancedDescription} productName={ai?.enhancedTitle || product.title} highlightColor="text-blue-600" />
           <FeatureGrid />
           <ComparisonTable productName={ai?.enhancedTitle || product.title} />
           <HowItWorks />
           <FAQSection />
           <FinalCTA product={product} price={fmtPrice(product.price)} />
        </div>
      </main>

      <StickyBuyButton buttonColor="bg-blue-700" />
      <RecentSalesPopup />
      <GuaranteeBadge />
    </div>
  );
}

