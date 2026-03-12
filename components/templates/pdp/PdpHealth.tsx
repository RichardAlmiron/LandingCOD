'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { StoreData, Product } from '@/lib/types';
import { Star, ShieldCheck, HeartPulse, Activity, CheckCircle2, AlertTriangle, ArrowRight, Clock, ThumbsUp, Zap, ChevronDown, ChevronUp, Lock, Truck, Award, Users, XCircle, Shield, CheckCircle } from 'lucide-react';
import { LiveViewers, ScarcityWarning, ProblemAgitation, SolutionReveal, BeforeAfter, DeepDiveFeature, ExpertEndorsement, ComparisonTable, BundleOffer, SocialProofWall, HowItWorks, ShippingInfo, FinalCTA, InlineCODForm, StickyBuyButton, RecentSalesPopup } from './SharedCRO';

interface PDPProps {
  data: StoreData;
  product: Product;
  variant?: number;
}

export default function PdpHealth({ data, product, variant = 1 }: PDPProps) {
  const [timeLeft, setTimeLeft] = useState(845);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [viewers, setViewers] = useState(47);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0)), 1000);
    const viewerTimer = setInterval(() => setViewers(prev => Math.max(12, prev + Math.floor(Math.random() * 5) - 2)), 3000);
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
      case 2: return { primary: 'bg-emerald-600', text: 'text-emerald-600', bgLight: 'bg-emerald-50', border: 'border-emerald-200', hover: 'hover:bg-emerald-700', alert: 'bg-orange-600', name: 'Naturaleza Orgánica' };
      case 3: return { primary: 'bg-rose-600', text: 'text-rose-600', bgLight: 'bg-rose-50', border: 'border-rose-200', hover: 'hover:bg-rose-700', alert: 'bg-red-600', name: 'Vitalidad Femenina' };
      case 4: return { primary: 'bg-cyan-700', text: 'text-cyan-700', bgLight: 'bg-cyan-50', border: 'border-cyan-200', hover: 'hover:bg-cyan-800', alert: 'bg-red-500', name: 'Rendimiento Deportivo' };
      case 5: return { primary: 'bg-indigo-600', text: 'text-indigo-600', bgLight: 'bg-indigo-50', border: 'border-indigo-200', hover: 'hover:bg-indigo-700', alert: 'bg-red-600', name: 'Neuro Bienestar' };
      case 6: return { primary: 'bg-teal-600', text: 'text-teal-600', bgLight: 'bg-teal-50', border: 'border-teal-200', hover: 'hover:bg-teal-700', alert: 'bg-orange-500', name: 'Detox Total' };
      case 7: return { primary: 'bg-amber-600', text: 'text-amber-600', bgLight: 'bg-amber-50', border: 'border-amber-200', hover: 'hover:bg-amber-700', alert: 'bg-red-600', name: 'Inmunidad Plus' };
      case 8: return { primary: 'bg-violet-600', text: 'text-violet-600', bgLight: 'bg-violet-50', border: 'border-violet-200', hover: 'hover:bg-violet-700', alert: 'bg-red-500', name: 'Sueño Profundo' };
      case 9: return { primary: 'bg-sky-600', text: 'text-sky-600', bgLight: 'bg-sky-50', border: 'border-sky-200', hover: 'hover:bg-sky-700', alert: 'bg-orange-600', name: 'Respiración Libre' };
      case 10: return { primary: 'bg-fuchsia-600', text: 'text-fuchsia-600', bgLight: 'bg-fuchsia-50', border: 'border-fuchsia-200', hover: 'hover:bg-fuchsia-700', alert: 'bg-red-600', name: 'Articulaciones Sanas' };
      default: return { primary: 'bg-blue-600', text: 'text-blue-600', bgLight: 'bg-blue-50', border: 'border-blue-200', hover: 'hover:bg-blue-700', alert: 'bg-red-600', name: 'Clínica Pura' };
    }
  };

  const theme = getTheme();

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans pb-24 selection:bg-blue-200">
      
      {/* 1. Urgency Banner */}
      <div className={`${theme.alert} text-white text-center py-2 px-4 text-sm font-bold flex items-center justify-center gap-2 animate-pulse sticky top-0 z-50`}>
        <AlertTriangle className="w-4 h-4" />
        ATENCIÓN: Stock crítico. Oferta válida por los próximos {formatTime(timeLeft)}.
      </div>

      {/* 2. Live Viewers (Social Pressure) */}
      <div className="bg-slate-50 border-b border-slate-200 py-2 text-center text-xs font-medium text-slate-600 flex justify-center items-center gap-2">
        <Users className="w-4 h-4 text-red-500 animate-pulse" />
        <span className="font-bold text-red-600">{viewers} personas</span> están evaluando este tratamiento ahora mismo.
      </div>

      {/* 3. Hero Section (High Impact + Form) */}
      <section className="max-w-6xl mx-auto px-4 py-8 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl border border-slate-100">
              <Image src={product.imageUrl} alt={product.title} fill className="object-cover" />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-xs font-black text-emerald-600 flex items-center shadow-lg border border-emerald-100">
                <ShieldCheck className="w-4 h-4 mr-1" /> GRADO CLÍNICO
              </div>
              <div className="absolute bottom-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg font-black text-lg shadow-xl transform rotate-3">
                -50% HOY
              </div>
            </div>
            
            {/* 4. Trust Strip (Logos) */}
            <div className="flex justify-center gap-6 opacity-60 grayscale pt-4">
              <div className="font-black text-xl tracking-tighter flex items-center"><Shield className="w-5 h-5 mr-1"/> FDA<span className="text-xs align-top">®</span></div>
              <div className="font-black text-xl tracking-tighter flex items-center"><CheckCircle className="w-5 h-5 mr-1"/> GMP<span className="text-xs align-top">®</span></div>
              <div className="font-black text-xl tracking-tighter flex items-center"><Activity className="w-5 h-5 mr-1"/> ISO<span className="text-xs align-top">®</span></div>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
              </div>
              <span className="text-slate-600 font-bold text-sm underline decoration-dashed cursor-pointer">
                {product.reviews} Pacientes Recuperados
              </span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-black tracking-tight text-slate-900 mb-4 leading-[1.1]">
              {product.title}
            </h1>
            
            <p className="text-xl text-slate-600 font-medium mb-6 leading-relaxed">
              {product.description}
            </p>

            {/* 5. Scarcity Warning (Stock Bar) */}
            <div className="mb-6">
               <ScarcityWarning colorClass={theme.primary} textClass={theme.text} />
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6 flex items-center justify-between">
              <div>
                <p className="text-slate-800 font-bold text-sm uppercase tracking-wider">Tratamiento Completo:</p>
                <p className="text-3xl font-black text-slate-900 font-mono">{product.price}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-500 line-through font-bold">{product.originalPrice}</p>
                <p className="text-sm font-black text-emerald-600 bg-emerald-100 px-2 py-1 rounded">Ahorras 50%</p>
              </div>
            </div>

            {/* 6. Inline COD Form (Frictionless Checkout) */}
            <div className="bg-white rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.08)] border border-slate-200 p-6 relative overflow-hidden" id="checkout-form">
              <div className={`absolute top-0 left-0 w-full h-1 ${theme.primary}`}></div>
              <h3 className="text-xl font-black text-center mb-4">Inicia tu Recuperación Hoy 🩺</h3>
              <p className="text-center text-sm text-slate-500 mb-4">Paga en efectivo al recibir en tu domicilio. Cero riesgos.</p>
              <InlineCODForm buttonColor={theme.primary} />
            </div>
          </div>
        </div>
      </section>

      {/* 7. Problem Agitation */}
      <ProblemAgitation 
        title="¿Estás cansado de que tu salud te limite y las soluciones tradicionales NO funcionen?"
        pains={[
          "Gastas cientos en consultas y pastillas que solo alivian temporalmente los síntomas, pero no atacan la raíz.",
          "Sientes frustración y ansiedad al ver que tu calidad de vida disminuye a pesar de tus esfuerzos.",
          "Los efectos secundarios de los químicos te asustan y buscas una alternativa real y segura."
        ]}
        theme={theme}
      />

      {/* 8. Solution Reveal */}
      <SolutionReveal 
        productName={product.title}
        description="Diseñado por expertos en biotecnología para ofrecerte resultados reales, rápidos y duraderos. No es un simple suplemento, es una terapia celular aplicada a tu bienestar diario."
        theme={theme}
      />

      {/* 9. Core Benefits (Icon Grid) */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <Zap />, title: "Acción Rápida", desc: "Absorción en 15 min." },
              { icon: <Shield />, title: "100% Seguro", desc: "Sin efectos secundarios." },
              { icon: <HeartPulse />, title: "Salud Integral", desc: "Beneficios sistémicos." },
              { icon: <CheckCircle2 />, title: "Fácil de Usar", desc: "Una dosis diaria." }
            ].map((benefit, i) => (
              <div key={i} className="text-center p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className={`w-14 h-14 mx-auto rounded-full ${theme.bgLight} ${theme.text} flex items-center justify-center mb-4`}>
                  {React.cloneElement(benefit.icon as React.ReactElement<{ className?: string }>, { className: "w-7 h-7" })}
                </div>
                <h4 className="font-bold text-lg mb-2">{benefit.title}</h4>
                <p className="text-sm text-slate-500">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Before & After (Visual Proof) */}
      <BeforeAfter theme={theme} />

      {/* 11. Deep Dive Feature 1 */}
      <DeepDiveFeature 
        title="Biodisponibilidad del 99% para resultados inmediatos."
        description="A diferencia de productos genéricos que tu cuerpo desecha, nuestra fórmula micro-encapsulada penetra directamente en el torrente sanguíneo, garantizando que cada miligramo trabaje a tu favor."
        bullets={[
          "No irrita el estómago.",
          "Efecto prolongado de 24 horas."
        ]}
        imageUrl={`https://picsum.photos/800/800?random=${product.id}3`}
        theme={theme}
        reversed={false}
      />

      {/* 12. Expert Endorsement */}
      <ExpertEndorsement 
        expertName="Dr. Roberto M."
        expertTitle="Especialista en Medicina Funcional y Anti-aging"
        quote={`"Recomiendo ${product.title} a mis pacientes porque es la única fórmula que combina ingredientes de grado clínico con una absorción total. Los resultados que he visto en mi práctica son innegables y consistentes."`}
        theme={theme}
      />

      {/* 13. Us vs Them (Comparison Table) */}
      <ComparisonTable productName={product.title} theme={theme} />

      {/* 14. Bundle Offer (AOV Maximizer) */}
      <BundleOffer price={product.price} theme={theme} />

      {/* 15. Social Proof Wall */}
      <SocialProofWall theme={theme} />

      {/* 16. How It Works */}
      <HowItWorks theme={theme} />

      {/* 17. Ironclad Guarantee */}
      <section className="py-16 max-w-4xl mx-auto px-4">
        <div className="bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-300 p-8 md:p-12 rounded-3xl text-center relative overflow-hidden shadow-xl">
          <ShieldCheck className={`w-20 h-20 mx-auto mb-6 ${theme.text}`} />
          <h2 className="text-3xl font-black mb-4 text-slate-900">Garantía Médica de 30 Días</h2>
          <p className="text-lg text-slate-700 max-w-2xl mx-auto font-medium">
            Estamos tan seguros de la eficacia clínica de {product.title} que te ofrecemos una garantía total. Si no experimentas una mejora significativa en tus síntomas durante los primeros 30 días, te devolvemos el 100% de tu dinero. Tu salud y satisfacción son nuestra única prioridad.
          </p>
        </div>
      </section>

      {/* 18. FAQ */}
      <section className="py-16 max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-black text-center mb-10">Preguntas Frecuentes</h2>
        <div className="space-y-4">
          {[
            { q: "¿Tiene contraindicaciones o efectos secundarios?", a: "No, nuestra fórmula está compuesta por ingredientes 100% naturales, purificados y clínicamente probados. Es segura para el consumo diario y no genera dependencia." },
            { q: "¿Cuándo empezaré a notar los resultados?", a: "La mayoría de nuestros pacientes reportan una mejora significativa en los primeros 7 a 14 días de uso continuo, gracias a nuestra tecnología de alta biodisponibilidad." },
            { q: "¿Es seguro pagar al recibir?", a: "Absolutamente. Es el método más seguro. No arriesgas tu dinero ni tus datos bancarios en internet. Pagas en efectivo directamente al repartidor cuando tienes el producto en tus manos." },
            { q: "¿Hacen envíos a todo el país?", a: "Sí, contamos con cobertura nacional mediante mensajería express. El envío es rápido, seguro y totalmente discreto." }
          ].map((faq, i) => (
            <div key={i} className="border border-slate-200 rounded-xl overflow-hidden">
              <button 
                className="w-full text-left p-5 font-bold text-slate-900 bg-slate-50 flex justify-between items-center hover:bg-slate-100 transition-colors"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                {faq.q}
                {openFaq === i ? <ChevronUp className={`w-5 h-5 ${theme.text}`} /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
              </button>
              {openFaq === i && (
                <div className="p-5 bg-white text-slate-600 border-t border-slate-200 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 19. Shipping Info */}
      <ShippingInfo theme={theme} />

      {/* 20. Final CTA */}
      <FinalCTA 
        title="Tu salud no puede esperar más."
        subtitle="Aprovecha el 50% de descuento y el envío gratis. El stock reservado para esta promoción está a punto de agotarse."
        theme={theme}
      />

      <StickyBuyButton price={product.price} theme={theme} />
      {data.pdpFeatures.recentSales && <RecentSalesPopup theme={theme} />}
    </div>
  );
}

