'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { StoreData, Product } from '@/lib/types';
import { Star, ShieldCheck, HeartPulse, Activity, CheckCircle2, AlertTriangle, ArrowRight, Clock, ThumbsUp, Zap, ChevronDown, ChevronUp, Lock, Truck, Award, Users, XCircle, Shield, CheckCircle } from 'lucide-react';
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
  TrustBar
} from '@/components/pdp/SharedCRO';
import { getProductCopyPersona } from '@/lib/copy-engine';
import ProductCarousel3D from '@/components/componentes-tiendas/ProductCarousel3D';
import EnhancedProductGallery from '@/components/pdp/EnhancedProductGallery';

interface PDPProps {
  data: StoreData;
  product: Product;
  variant?: number;
}

export default function PdpSaludEstandar({ data, product, variant = 1 }: PDPProps) {
  const [timeLeft, setTimeLeft] = useState(845);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [viewers, setViewers] = useState(47);
  const copy = useMemo(() => getProductCopyPersona(product), [product]);
  const ai = product.aiContent;
  const sec = ai?.sections;
  const fmtPrice = (n: number) => {
    const str = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `Gs. ${str}`;
  };

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0)), 1000);
    const viewerTimer = setInterval(() => setViewers(47), 3000);
    return () => { clearInterval(timer); clearInterval(viewerTimer); };
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const getTheme = () => {
    switch(variant) {
      case 1: return { primary: 'bg-blue-600', text: 'text-blue-600', bgLight: 'bg-blue-50', border: 'border-blue-200', hover: 'hover:bg-blue-700', alert: 'bg-red-600', name: 'Clínica Pura' };
      default: return { primary: 'bg-emerald-600', text: 'text-emerald-600', bgLight: 'bg-emerald-50', border: 'border-emerald-200', hover: 'hover:bg-emerald-700', alert: 'bg-orange-600', name: 'Naturaleza Orgánica' };
    }
  };

  const theme = getTheme();

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans pb-24 selection:bg-blue-200">
      
      {/* 1. Urgency Banner */}
      <div className={`${theme.alert} text-white text-center py-2 px-4 text-sm font-black flex items-center justify-center gap-2 animate-pulse sticky top-0 z-50 shadow-xl`}>
        <AlertTriangle className="w-4 h-4" />
        STOCK CRÍTICO: OFERTA VÁLIDA POR {formatTime(timeLeft)}
      </div>

      <main className="max-w-7xl mx-auto px-4 py-10 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Left: Componente Visual */}
          <div className="space-y-6 lg:sticky lg:top-32">
            <div className="relative rounded-[2.5rem] overflow-hidden bg-white shadow-2xl border border-blue-100">
               <EnhancedProductGallery 
                 product={product}
                 accentColor="#2563eb"
               />
               <div className="absolute top-6 left-6 z-10">
                 <div className="bg-blue-900/90 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-black text-white flex items-center shadow-lg tracking-widest uppercase">
                    <ShieldCheck className="w-4 h-4 mr-2" /> Grado Farmacéutico
                 </div>
               </div>
            </div>
            
            <div className="flex justify-center gap-8 py-4 px-8 bg-blue-50 rounded-3xl border border-blue-100 divide-x divide-blue-200">
               <div className="text-center px-4">
                  <Shield className="w-6 h-6 mx-auto mb-1 text-blue-600" />
                  <span className="text-[10px] font-black text-blue-800 uppercase tabular-nums">FDA CERTIFIED</span>
               </div>
               <div className="text-center px-4 pl-8">
                  <CheckCircle className="w-6 h-6 mx-auto mb-1 text-blue-600" />
                  <span className="text-[10px] font-black text-blue-800 uppercase">GMP QUALITY</span>
               </div>
               <div className="text-center px-4 pl-8">
                  <Activity className="w-6 h-6 mx-auto mb-1 text-blue-600" />
                  <span className="text-[10px] font-black text-blue-800 uppercase tabular-nums">LAB TESTED</span>
               </div>
            </div>

            <TrustBar />
            <SocialProofWall testimonials={ai?.testimonials} />
          </div>

          {/* Right: Conversión */}
          <div className="space-y-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <div className="h-4 w-px bg-slate-300"></div>
                <span className="text-slate-900 font-black text-sm tabular-nums underline decoration-blue-500 decoration-2">{product.reviews} Pacientes Verificados</span>
              </div>

              <AuthorityBadge copy={copy} />
              <h1 className="text-4xl lg:text-7xl font-black text-slate-950 leading-[0.85] mb-6 tracking-tighter uppercase">
                {ai?.enhancedTitle || product.title}
              </h1>
              
              <p className="text-xl text-slate-900 font-bold mb-8 leading-relaxed italic border-l-4 border-blue-500 pl-6">
                 "{ai?.enhancedDescription || product.description}"
              </p>

              <div className="bg-slate-950 text-white p-10 rounded-[2.5rem] relative overflow-hidden shadow-2xl">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/30 rounded-full blur-[100px] -mr-32 -mt-32"></div>
                 <div className="relative z-10">
                    <span className="text-blue-400 font-black text-xs uppercase tracking-widest mb-2 block">TRATAMIENTO RECOMENDADO</span>
                    <div className="flex items-end gap-3 leading-none mb-6">
                       <span className="text-6xl font-black tabular-nums">{fmtPrice(product.price)}</span>
                       <span className="text-2xl text-slate-500 line-through font-bold">{fmtPrice(product.originalPrice)}</span>
                    </div>
                    <ScarcityWarning colorClass="bg-red-600" textClass="text-red-100" />
                 </div>
              </div>
            </div>

            <BundleOffer price={product.price} />

            <div className="bg-white p-8 rounded-3xl border-2 border-slate-200 shadow-xl space-y-6">
               <h3 className="font-black text-2xl text-slate-950 text-center uppercase tracking-tight">Pide ahora y paga al recibir</h3>
               <InlineCODForm buttonColor="bg-blue-600" />
               <div className="flex justify-center gap-6 text-[11px] font-black text-slate-500 uppercase tracking-widest pt-2">
                  <span className="flex items-center gap-1"><Lock className="w-4 h-4" /> Pago 100% Seguro</span>
                  <span className="flex items-center gap-1"><Truck className="w-4 h-4" /> Envío Express</span>
               </div>
            </div>
          </div>
        </div>

        {/* Narrative Flow */}
        <div className="mt-32 space-y-32">
           <StorytellerIntro product={product} copy={copy} />
           <ProblemAgitation product={product} copy={copy} />
           <SolutionReveal description={ai?.enhancedDescription} productName={ai?.enhancedTitle || product.title} highlightColor="text-blue-600" />
           <HowItWorks />
           <ComparisonTable productName={ai?.enhancedTitle || product.title} />
           <FinalCTA product={product} price={fmtPrice(product.price)} />
        </div>
      </main>

      <StickyBuyButton buttonColor="bg-blue-600" />
      <RecentSalesPopup />
    </div>
  );
}



