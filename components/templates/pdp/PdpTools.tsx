'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { StoreData, Product } from '@/lib/types';
import { Star, Wrench, Hammer, ShieldAlert, Zap, CheckSquare, AlertTriangle, Truck, Lock, ChevronDown, ChevronUp, HardHat, ShieldCheck, CheckCircle2, Users, XCircle, Clock, Award, Shield, Settings } from 'lucide-react';
import { LiveViewers, ScarcityWarning, ProblemAgitation, SolutionReveal, BeforeAfter, DeepDiveFeature, ExpertEndorsement, ComparisonTable, BundleOffer, SocialProofWall, HowItWorks, ShippingInfo, FinalCTA, InlineCODForm, StickyBuyButton, RecentSalesPopup } from './SharedCRO';

interface PDPProps {
  data: StoreData;
  product: Product;
  variant?: number;
}

export default function PdpTools({ data, product, variant = 1 }: PDPProps) {
  const [timeLeft, setTimeLeft] = useState(14400);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [viewers, setViewers] = useState(112);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0)), 1000);
    const viewerTimer = setInterval(() => setViewers(prev => Math.max(80, prev + Math.floor(Math.random() * 15) - 7)), 3500);
    return () => { clearInterval(timer); clearInterval(viewerTimer); };
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const getTheme = () => {
    switch(variant) {
      case 1: return { primary: 'bg-yellow-500', text: 'text-yellow-600', bgLight: 'bg-zinc-900', border: 'border-yellow-500', hover: 'hover:bg-yellow-400', alert: 'bg-red-600', name: 'Industrial Amarillo' };
      case 2: return { primary: 'bg-orange-600', text: 'text-orange-600', bgLight: 'bg-zinc-100', border: 'border-orange-500', hover: 'hover:bg-orange-700', alert: 'bg-red-700', name: 'Construcción Naranja' };
      case 3: return { primary: 'bg-red-700', text: 'text-red-700', bgLight: 'bg-zinc-950', border: 'border-red-800', hover: 'hover:bg-red-600', alert: 'bg-yellow-500', name: 'Mecánica Rojo' };
      case 4: return { primary: 'bg-blue-700', text: 'text-blue-700', bgLight: 'bg-blue-50', border: 'border-blue-800', hover: 'hover:bg-blue-600', alert: 'bg-orange-500', name: 'Taller Azul' };
      case 5: return { primary: 'bg-emerald-600', text: 'text-emerald-600', bgLight: 'bg-emerald-50', border: 'border-emerald-600', hover: 'hover:bg-emerald-500', alert: 'bg-red-600', name: 'Jardinería Verde' };
      case 6: return { primary: 'bg-zinc-800', text: 'text-zinc-800', bgLight: 'bg-zinc-100', border: 'border-zinc-800', hover: 'hover:bg-zinc-700', alert: 'bg-yellow-500', name: 'Acero Inoxidable' };
      case 7: return { primary: 'bg-amber-600', text: 'text-amber-600', bgLight: 'bg-amber-50', border: 'border-amber-600', hover: 'hover:bg-amber-500', alert: 'bg-red-700', name: 'Carpintería' };
      case 8: return { primary: 'bg-cyan-700', text: 'text-cyan-700', bgLight: 'bg-cyan-50', border: 'border-cyan-700', hover: 'hover:bg-cyan-600', alert: 'bg-orange-600', name: 'Plomería' };
      case 9: return { primary: 'bg-purple-700', text: 'text-purple-700', bgLight: 'bg-purple-50', border: 'border-purple-700', hover: 'hover:bg-purple-600', alert: 'bg-yellow-500', name: 'Alta Tensión' };
      case 10: return { primary: 'bg-rose-700', text: 'text-rose-700', bgLight: 'bg-rose-50', border: 'border-rose-700', hover: 'hover:bg-rose-600', alert: 'bg-zinc-900', name: 'Soldadura' };
      default: return { primary: 'bg-yellow-500', text: 'text-yellow-600', bgLight: 'bg-zinc-900', border: 'border-yellow-500', hover: 'hover:bg-yellow-400', alert: 'bg-red-600', name: 'Industrial Amarillo' };
    }
  };

  const theme = getTheme();

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans pb-24 selection:bg-yellow-200">
      
      {/* 1. Urgency Banner */}
      <div className={`${theme.alert} text-white text-center py-2 px-4 text-sm font-black flex items-center justify-center gap-2 uppercase tracking-widest sticky top-0 z-50`}>
        <AlertTriangle className="w-5 h-5 animate-pulse" />
        LIQUIDACIÓN DE BODEGA: 50% OFF TERMINA EN {formatTime(timeLeft)}
      </div>

      {/* 2. Live Viewers (Social Pressure) */}
      <div className="bg-zinc-900 text-zinc-400 py-2 text-center text-xs font-black uppercase tracking-widest flex justify-center items-center gap-2 border-b-4 border-zinc-800">
        <Users className={`w-4 h-4 ${theme.text} animate-pulse`} />
        <span className="text-white">{viewers} PROFESIONALES</span> VIENDO ESTE EQUIPO AHORA
      </div>

      {/* 3. Hero Section (Industrial Impact + Form) */}
      <section className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-4">
            <div className={`relative aspect-square bg-white border-8 ${theme.border} shadow-2xl p-8 group overflow-hidden`}>
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none"></div>
              <Image src={product.imageUrl} alt={product.title} fill className="object-contain p-8 group-hover:scale-110 transition-transform duration-500" />
              <div className={`absolute top-0 left-0 ${theme.primary} text-zinc-900 px-4 py-2 font-black tracking-widest uppercase text-sm shadow-md`}>
                GRADO INDUSTRIAL
              </div>
              <div className="absolute bottom-4 right-4 bg-zinc-900 text-white px-4 py-2 font-black text-lg transform -rotate-2 shadow-xl border-2 border-zinc-700">
                AHORRA 50% HOY
              </div>
            </div>
            
            {/* 4. Durability Badges */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: ShieldAlert, text: "Anti-Impacto" },
                { icon: Zap, text: "Alta Potencia" },
                { icon: HardHat, text: "Uso Rudo" }
              ].map((badge, i) => (
                <div key={i} className="bg-zinc-900 text-white p-3 text-center border-b-4 border-zinc-700 hover:border-zinc-500 transition-colors">
                  <badge.icon className={`w-6 h-6 mx-auto mb-1 ${theme.text}`} />
                  <div className="text-[10px] uppercase font-black tracking-wider">{badge.text}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col bg-white p-8 border-4 border-zinc-200 shadow-xl relative">
            <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
              <div className={`absolute top-0 right-0 bg-red-600 text-white text-[10px] font-black w-24 text-center py-1 transform rotate-45 translate-x-7 translate-y-2 shadow-md uppercase tracking-wider`}>
                PRO
              </div>
            </div>

            <div className="flex items-center gap-2 mb-4 bg-zinc-100 w-fit px-3 py-1 rounded-sm border border-zinc-300">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <span className="text-zinc-700 font-black text-sm uppercase underline decoration-dashed cursor-pointer">
                4.9/5 ({product.reviews} Profesionales)
              </span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-black tracking-tight text-zinc-900 mb-4 uppercase leading-[1.1]">
              {product.title}
            </h1>
            
            <p className="text-lg text-zinc-600 font-medium mb-6 leading-relaxed">
              {product.description}
            </p>

            {/* 5. Scarcity Warning (Stock Bar) */}
            <div className="mb-6">
               <ScarcityWarning colorClass={theme.primary} textClass={theme.text} />
            </div>

            <div className="bg-zinc-900 text-white p-6 mb-6 relative overflow-hidden shadow-inner">
              <div className={`absolute top-0 left-0 w-2 h-full ${theme.primary}`}></div>
              <div className="flex justify-between items-end mb-2">
                <div>
                  <p className="text-sm text-zinc-400 font-bold uppercase tracking-wider mb-1">Precio Directo de Fábrica</p>
                  <div className="flex items-baseline gap-3">
                    <span className={`text-5xl font-black ${theme.text}`}>{product.price}</span>
                    <span className="text-xl text-zinc-500 line-through font-bold">{product.originalPrice}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 6. Inline COD Form (Frictionless Checkout) */}
            <div className="bg-zinc-50 border-2 border-zinc-200 p-6 mb-6">
              <h3 className="text-lg font-black mb-4 flex items-center gap-2 uppercase">
                <Truck className="w-5 h-5 text-zinc-900" /> Pide Ahora, Paga al Recibir
              </h3>
              <InlineCODForm buttonColor={theme.primary} />
              
              <div className="mt-4 flex items-center justify-center gap-4 text-xs text-zinc-500 font-black uppercase tracking-wider">
                <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4" /> Garantía de Por Vida</span>
                <span className="flex items-center gap-1"><Lock className="w-4 h-4" /> Pago Seguro</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Problem Agitation (Tired of cheap tools?) */}
      <ProblemAgitation 
        title="¿Harto de herramientas que se rompen en el primer uso rudo?"
        pains={[
          "Motores que se queman al exigirles potencia real en trabajos largos.",
          "Materiales baratos que se oxidan, deforman o pierden el filo rápido.",
          "Baterías que mueren a mitad del trabajo dejándote tirado."
        ]}
        theme={theme}
      />

      {/* 8. Solution Reveal */}
      <SolutionReveal 
        productName={product.title}
        description="Diseñada desde cero para soportar el castigo diario de un taller profesional. Potencia bruta, materiales indestructibles y precisión milimétrica."
        theme={theme}
      />

      {/* 9. Core Benefits (Icon Grid) */}
      <section className="py-12 bg-white border-y-4 border-zinc-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <Hammer />, title: "Acero Forjado", desc: "Aleación indestructible." },
              { icon: <Zap />, title: "Motor Brushless", desc: "Más potencia, vida útil x3." },
              { icon: <ShieldAlert />, title: "Carcasa Blindada", desc: "Resiste caídas de 3m." },
              { icon: <Wrench />, title: "Ergonomía Pro", desc: "Agarre para 12 hrs de uso." }
            ].map((benefit, i) => (
              <div key={i} className="text-center p-6 border-4 border-zinc-100 hover:border-zinc-900 transition-colors bg-zinc-50">
                <div className={`w-16 h-16 mx-auto bg-zinc-900 ${theme.text} flex items-center justify-center mb-4 border-2 border-zinc-700`}>
                  {React.cloneElement(benefit.icon as React.ReactElement<{ className?: string }>, { className: "w-8 h-8" })}
                </div>
                <h4 className="font-black text-lg mb-2 uppercase">{benefit.title}</h4>
                <p className="text-sm text-zinc-600 font-medium">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Deep Dive Feature 1: Indestructible Build */}
      <DeepDiveFeature 
        title="Hecha para sobrevivir al apocalipsis."
        description={`Olvídate de tratar tus herramientas con cuidado. ${product.title} cuenta con una carcasa reforzada y componentes internos sellados que resisten polvo, agua, grasa y caídas sobre concreto.`}
        bullets={[
          "Sellado IP65 contra polvo y humedad.",
          "Engranajes de acero templado."
        ]}
        imageUrl={`https://picsum.photos/800/800?random=${product.id}5`}
        theme={theme}
        reversed={false}
      />

      {/* 11. Deep Dive Feature 2: Raw Power */}
      <DeepDiveFeature 
        title="Fuerza bruta sin sobrecalentamiento."
        description={`El corazón de ${product.title} es un motor sin escobillas (brushless) que entrega un 50% más de torque que la competencia, manteniendo una temperatura estable incluso en jornadas de 8 horas continuas.`}
        bullets={[
          "Cero mantenimiento de carbones.",
          "Control electrónico de velocidad."
        ]}
        imageUrl={`https://picsum.photos/800/800?random=${product.id}6`}
        theme={theme}
        reversed={true}
      />

      {/* 12. Expert Endorsement / Pro Review */}
      <ExpertEndorsement 
        expertName="Roberto 'El Maestro' Sánchez"
        expertTitle="Contratista General - 15 Años Exp."
        quote={`"Llevo 15 años en la construcción. He quemado decenas de herramientas de 'marca reconocida'. ${product.title} lleva 6 meses de uso rudo diario y sigue funcionando como el primer día. Es una bestia."`}
        theme={theme}
      />

      {/* 13. Us vs Them (Comparison Table) */}
      <ComparisonTable productName={product.title} theme={theme} />

      {/* 14. What's included (Kit Contents) */}
      <section className="bg-zinc-200 py-16 border-y-4 border-zinc-300">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black mb-10 uppercase">¿Qué incluye tu Kit Profesional?</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {["1x " + product.title, "1x Estuche Rígido Anti-Impacto", "Manual de Operación", "Certificado de Garantía Vitalicia"].map((item, i) => (
              <div key={i} className="bg-white px-6 py-3 border-2 border-zinc-900 font-black text-zinc-800 flex items-center gap-2 uppercase text-sm shadow-[4px_4px_0px_0px_rgba(24,24,27,1)]">
                <CheckSquare className="w-5 h-5 text-zinc-900" /> {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 15. Bundle Offer (AOV Maximizer) */}
      <BundleOffer price={product.price} theme={theme} />

      {/* 16. Social Proof Wall (Reviews from Pros) */}
      <SocialProofWall theme={theme} />

      {/* 17. How It Works */}
      <HowItWorks theme={theme} />

      {/* 18. Lifetime Warranty */}
      <section className="bg-zinc-800 text-white py-16 border-y-8 border-zinc-900">
        <div className="max-w-4xl mx-auto px-4 text-center flex flex-col items-center bg-zinc-900 p-12 border-4 border-zinc-700 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-10"></div>
          <ShieldCheck className={`w-24 h-24 ${theme.text} mb-6 relative z-10`} />
          <h2 className="text-4xl font-black mb-4 uppercase tracking-widest relative z-10">Garantía de Por Vida</h2>
          <p className="text-xl text-zinc-300 max-w-2xl font-medium relative z-10">
            Si logras romperla bajo condiciones normales de trabajo, te enviamos una nueva completamente gratis. Sin preguntas. Así de seguros estamos de nuestra calidad industrial.
          </p>
        </div>
      </section>

      {/* 19. FAQ */}
      <section className="py-20 max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-black text-center mb-10 uppercase">Preguntas Frecuentes</h2>
        <div className="space-y-4">
          {[
            { q: "¿Sirve para uso profesional o solo casero?", a: "Está diseñada específicamente para uso industrial y profesional diario. Soporta jornadas largas y trabajo pesado sin sobrecalentarse." },
            { q: "¿Tienen refacciones disponibles?", a: "Sí, contamos con todas las refacciones originales en stock, aunque por su durabilidad es muy raro que las necesites." },
            { q: "¿Cómo funciona el pago contra entrega?", a: "Pides hoy llenando el formulario sin usar tarjeta de crédito. Te la enviamos y le pagas en efectivo al repartidor cuando te la entregue en tu taller o domicilio." },
            { q: "¿Cuánto tarda el envío?", a: "Enviamos por paquetería express. El tiempo de entrega es de 24 a 48 horas en ciudades principales." }
          ].map((faq, i) => (
            <div key={i} className="border-4 border-zinc-200 bg-white">
              <button 
                className="w-full text-left p-6 font-black text-zinc-900 flex justify-between items-center hover:bg-zinc-50 uppercase"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                {faq.q}
                {openFaq === i ? <ChevronUp className="w-6 h-6 text-zinc-900" /> : <ChevronDown className="w-6 h-6 text-zinc-400" />}
              </button>
              {openFaq === i && (
                <div className="p-6 bg-zinc-100 text-zinc-700 border-t-4 border-zinc-200 font-bold">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 20. Final CTA */}
      <FinalCTA 
        title="Equípate como un Profesional."
        subtitle="Deja de gastar en herramientas desechables. Invierte en calidad industrial hoy mismo y aprovecha el 50% DE DESCUENTO."
        theme={theme}
      />

      <StickyBuyButton price={product.price} theme={theme} />
      {hasRecentSales && <RecentSalesPopup theme={theme} />}
    </div>
  );
}
