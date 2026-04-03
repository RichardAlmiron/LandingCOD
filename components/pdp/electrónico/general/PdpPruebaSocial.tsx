'use client';
import React, { useState, useMemo } from 'react';
import { StoreData, Product } from '@/lib/types';
import { Star, ShieldCheck, Truck, CheckCircle, Award, ThumbsUp, MessageCircle, Users, Zap, Clock, Shield } from 'lucide-react';
import { 
  TrustBar, 
  BundleOffer, 
  InlineCODForm, 
  StickyBuyButton, 
  FAQSection, 
  ComparisonTable, 
  GuaranteeBadge, 
  FeatureGrid, 
  HowItWorks,
  LiveViewers,
  ScarcityWarning,
  AuthorityBadge,
  StorytellerIntro,
  SolutionReveal,
  ProblemAgitation,
  RecentSalesPopup,
  FinalCTA
} from '@/components/pdp/SharedCRO';
import { getProductCopyPersona } from '@/lib/copy-engine';
import ProductCarousel3D from '@/components/componentes-tiendas/ProductCarousel3D';
import EnhancedProductGallery from '@/components/pdp/EnhancedProductGallery';

interface PDPProps {
  data: StoreData;
  product: Product;
  variant?: number;
}

export default function PdpPruebaSocial({ data, product, variant = 1 }: PDPProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const copy = useMemo(() => getProductCopyPersona(product), [product]);
  const ai = product.aiContent;
  const sec = ai?.sections;
  const fmtPrice = (n: number) => {
    const str = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `Gs. ${str}`;
  };

  const theme = {
    primary: 'bg-indigo-600',
    text: 'text-indigo-600',
    bgLight: 'bg-indigo-50',
    border: 'border-indigo-200',
    hover: 'hover:bg-indigo-700'
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-24 selection:bg-indigo-200">
      
      {/* 1. Trust Header */}
      <div className="bg-slate-900 text-white text-center py-2 px-4 text-[10px] font-black tracking-[0.2em] flex items-center justify-center gap-3 uppercase">
        <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
        <span>Verificado por la comunidad de compradores</span>
        <div className="h-3 w-px bg-white/20"></div>
        <span>COD Disponible</span>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-10 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* visual area */}
          <div className="space-y-6 lg:sticky lg:top-32">
            <div className="relative rounded-[2.5rem] overflow-hidden bg-white shadow-2xl border border-slate-200">
               <EnhancedProductGallery 
                 product={product}
                 accentColor="#4f46e5"
               />
               <div className="absolute top-6 left-6 z-10">
                 <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-black text-slate-900 flex items-center shadow-lg tracking-widest uppercase border border-slate-100">
                   <Users className="w-3.5 h-3.5 mr-2 text-indigo-600" /> +{product.reviews} Reseñas Reales
                 </div>
               </div>
            </div>
            <TrustBar />
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
               <div className="flex -space-x-3">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 overflow-hidden shadow-sm">
                       <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" className="w-full h-full object-cover" />
                    </div>
                  ))}
               </div>
               <div className="text-right">
                  <div className="flex text-amber-400 justify-end mb-0.5">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <span className="text-xs font-black text-slate-500 uppercase tracking-widest tabular-nums">PUNTUACIÓN 4.9/5</span>
               </div>
            </div>
          </div>

          {/* info area */}
          <div className="space-y-10">
            <div>
              <div className="flex items-center gap-3 mb-6">
                 <LiveViewers colorClass="text-indigo-600 font-black text-sm uppercase" />
                 <div className="h-4 w-px bg-slate-200"></div>
                 <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-1 rounded">STOCK DISPONIBLE</span>
              </div>
              
              <AuthorityBadge copy={copy} />
              <h1 className="text-4xl lg:text-7xl font-black text-slate-950 uppercase tracking-tighter leading-[0.85] mb-6">
                {ai?.enhancedTitle || product.title}
              </h1>
              
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm mb-8">
                 <p className="text-xl text-slate-900 font-black leading-relaxed italic border-l-4 border-indigo-600 pl-6 mb-8">
                    "{ai?.enhancedDescription || product.description}"
                 </p>
                 <div className="flex items-end justify-between border-t border-slate-100 pt-8">
                    <div>
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1 block">VALOR PREFERENCIAL</span>
                       <div className="flex items-end gap-3 leading-none">
                          <span className="text-6xl font-black text-slate-900 tabular-nums">{fmtPrice(product.price)}</span>
                          <span className="text-2xl text-slate-300 line-through font-bold">{fmtPrice(product.originalPrice)}</span>
                       </div>
                    </div>
                    <div className="animate-pulse">
                       <Zap className="w-8 h-8 text-indigo-600 fill-current" />
                    </div>
                 </div>
              </div>
              
              <ScarcityWarning colorClass="bg-indigo-600" />
            </div>

            <BundleOffer price={product.price} />

            <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 rounded-full blur-[100px] -mr-32 -mt-32 group-hover:scale-125 transition-transform duration-1000"></div>
               <h3 className="text-2xl font-black mb-6 flex items-center gap-3 relative z-10 uppercase tracking-tight">
                  <Truck className="w-7 h-7 text-indigo-400" /> Envío Express Gratuito
               </h3>
               <div className="relative z-10">
                  <InlineCODForm buttonColor="bg-indigo-600" />
                  <p className="text-center text-xs text-slate-400 font-bold mt-6 uppercase tracking-[0.15em]">
                     Paga en efectivo al repartidor en la puerta de tu casa
                  </p>
               </div>
            </div>
          </div>
        </div>

        {/* content flow */}
        <div className="mt-32 space-y-32">
           <StorytellerIntro product={product} copy={copy} />
           <ProblemAgitation product={product} copy={copy} />
           <SolutionReveal description={ai?.enhancedDescription} productName={ai?.enhancedTitle || product.title} />
           <FeatureGrid />
           <ComparisonTable productName={ai?.enhancedTitle || product.title} />
           <HowItWorks />
           <FAQSection copy={copy} />
           <FinalCTA product={product} price={fmtPrice(product.price)} />
        </div>
      </main>

      <StickyBuyButton buttonColor="bg-indigo-600" />
      <RecentSalesPopup />
      <GuaranteeBadge />
    </div>
  );
}



