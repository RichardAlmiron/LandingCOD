'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { StoreData, Product } from '@/lib/types';
import { Star, Home, Sofa, Maximize, Sun, CheckCircle2, Clock, ShieldCheck, ArrowRight, Truck, Heart, ChevronDown, ChevronUp, Sparkles, AlertTriangle, Users, Activity, CheckCircle, Zap } from 'lucide-react';
import { LiveViewers, ScarcityWarning, ProblemAgitation, SolutionReveal, BeforeAfter, DeepDiveFeature, ExpertEndorsement, ComparisonTable, BundleOffer, SocialProofWall, HowItWorks, ShippingInfo, FinalCTA, InlineCODForm, StickyBuyButton, RecentSalesPopup } from './SharedCRO';

interface PDPProps {
  data: StoreData;
  product: Product;
  variant?: number;
}

export default function PdpHome({ data, product, variant = 1 }: PDPProps) {
  const [timeLeft, setTimeLeft] = useState(7200); // 2 hours
  const [viewers, setViewers] = useState(87);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    
    const viewerTimer = setInterval(() => {
      setViewers(prev => Math.max(45, Math.min(150, prev + Math.floor(Math.random() * 5) - 2)));
    }, 6000);

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
      case 1: return { primary: 'bg-orange-800', text: 'text-orange-800', bgLight: 'bg-orange-50', border: 'border-orange-200', hover: 'hover:bg-orange-900', accent: 'bg-orange-100', alert: 'bg-red-600', name: 'Terracota Cálido' };
      case 2: return { primary: 'bg-stone-600', text: 'text-stone-600', bgLight: 'bg-stone-100', border: 'border-stone-300', hover: 'hover:bg-stone-700', accent: 'bg-stone-200', alert: 'bg-orange-600', name: 'Piedra Natural' };
      case 3: return { primary: 'bg-emerald-800', text: 'text-emerald-800', bgLight: 'bg-emerald-50', border: 'border-emerald-200', hover: 'hover:bg-emerald-900', accent: 'bg-emerald-100', alert: 'bg-red-500', name: 'Verde Botánico' };
      case 4: return { primary: 'bg-amber-700', text: 'text-amber-700', bgLight: 'bg-amber-50', border: 'border-amber-200', hover: 'hover:bg-amber-800', accent: 'bg-amber-100', alert: 'bg-red-600', name: 'Madera Ámbar' };
      case 5: return { primary: 'bg-slate-800', text: 'text-slate-800', bgLight: 'bg-slate-100', border: 'border-slate-300', hover: 'hover:bg-slate-900', accent: 'bg-slate-200', alert: 'bg-orange-500', name: 'Gris Industrial' };
      case 6: return { primary: 'bg-sky-700', text: 'text-sky-700', bgLight: 'bg-sky-50', border: 'border-sky-200', hover: 'hover:bg-sky-800', accent: 'bg-sky-100', alert: 'bg-red-600', name: 'Azul Nórdico' };
      case 7: return { primary: 'bg-rose-700', text: 'text-rose-700', bgLight: 'bg-rose-50', border: 'border-rose-200', hover: 'hover:bg-rose-800', accent: 'bg-rose-100', alert: 'bg-red-500', name: 'Rosa Vintage' };
      case 8: return { primary: 'bg-indigo-800', text: 'text-indigo-800', bgLight: 'bg-indigo-50', border: 'border-indigo-200', hover: 'hover:bg-indigo-900', accent: 'bg-indigo-100', alert: 'bg-orange-600', name: 'Azul Profundo' };
      case 9: return { primary: 'bg-teal-700', text: 'text-teal-700', bgLight: 'bg-teal-50', border: 'border-teal-200', hover: 'hover:bg-teal-800', accent: 'bg-teal-100', alert: 'bg-red-600', name: 'Verde Agua' };
      case 10: return { primary: 'bg-zinc-900', text: 'text-zinc-900', bgLight: 'bg-zinc-100', border: 'border-zinc-300', hover: 'hover:bg-black', accent: 'bg-zinc-200', alert: 'bg-red-500', name: 'Minimalista Negro' };
      default: return { primary: 'bg-orange-800', text: 'text-orange-800', bgLight: 'bg-orange-50', border: 'border-orange-200', hover: 'hover:bg-orange-900', accent: 'bg-orange-100', alert: 'bg-red-600', name: 'Terracota Cálido' };
    }
  };

  const theme = getTheme();

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-800 font-sans pb-24 selection:bg-orange-200">
      
      {/* 1. Urgency Banner */}
      <div className={`${theme.alert} text-white text-center py-2 px-4 text-sm font-bold flex items-center justify-center gap-2 tracking-wide sticky top-0 z-50`}>
        <Clock className="w-4 h-4 animate-pulse" />
        Venta Flash de Temporada: Termina en <span className="font-black bg-white/20 px-2 py-0.5 rounded">{formatTime(timeLeft)}</span>
      </div>

      {/* 2. Live Viewers (Social Pressure) */}
      <div className="bg-white border-b border-stone-200 py-2 text-center text-xs font-medium text-stone-600 flex justify-center items-center gap-2">
        <Users className={`w-4 h-4 ${theme.text} animate-pulse`} />
        <span className={`font-bold ${theme.text}`}>{viewers} personas</span> están viendo este producto ahora.
      </div>

      {/* 3. Hero Section (Lifestyle) */}
      <section className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Left: Visuals */}
          <div className="space-y-6">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <Image src={product.imageUrl} alt={product.title} fill className="object-cover" />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold text-stone-800 flex items-center shadow-lg">
                <Home className={`w-4 h-4 mr-2 ${theme.text}`} /> Tendencia 2024
              </div>
            </div>
            
            {/* 4. Trust Badges */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: ShieldCheck, text: "Calidad Premium" },
                { icon: Truck, text: "Envío Seguro" },
                { icon: Heart, text: "Diseño Exclusivo" }
              ].map((badge, i) => (
                <div key={i} className={`${theme.bgLight} p-4 rounded-2xl flex flex-col items-center gap-2 text-center border border-stone-100`}>
                  <badge.icon className={`w-6 h-6 ${theme.text}`} />
                  <span className="text-xs font-bold text-stone-700">{badge.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Copy & Form */}
          <div className="flex flex-col bg-white p-8 lg:p-10 rounded-[2rem] shadow-xl border border-stone-100">
            <div className="flex items-center gap-2 mb-6">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
              </div>
              <span className="text-stone-600 font-medium underline decoration-dashed cursor-pointer">
                4.9/5 ({product.reviews} familias felices)
              </span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-stone-900 mb-4 leading-tight tracking-tight">
              {product.title}
            </h1>
            
            <p className="text-lg text-stone-500 mb-6 leading-relaxed">
              {product.description}
            </p>

            {/* 5. Scarcity Warning */}
            <div className="mb-6">
               <ScarcityWarning colorClass={theme.primary} textClass={theme.text} />
            </div>

            <div className={`${theme.bgLight} p-6 rounded-2xl mb-8 border border-stone-200`}>
              <div className="flex justify-between items-end mb-4">
                <div>
                  <p className="text-sm text-stone-500 font-bold uppercase tracking-wider mb-1">Precio de Fábrica</p>
                  <div className="flex items-baseline gap-3">
                    <span className={`text-5xl font-bold ${theme.text}`}>{product.price}</span>
                    <span className="text-xl text-stone-400 line-through">{product.originalPrice}</span>
                  </div>
                </div>
                <div className={`${theme.primary} text-white px-3 py-1 rounded-full text-sm font-bold shadow-md`}>
                  Ahorras 50%
                </div>
              </div>
              
              <div className="space-y-3">
                {[
                  'Materiales de alta durabilidad',
                  'Fácil de limpiar y mantener',
                  'Combina con cualquier decoración'
                ].map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className={`w-5 h-5 ${theme.text}`} />
                    <span className="text-stone-700 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. Inline COD Form */}
            <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200">
              <h3 className="text-center font-bold text-lg mb-4 text-stone-800 flex items-center justify-center gap-2">
                <Truck className="w-5 h-5" /> Pide Hoy, Paga al Recibir
              </h3>
              <InlineCODForm buttonColor={theme.primary} />
            </div>
          </div>
        </div>
      </section>

      {/* 7. Problem Agitation (The Problem) */}
      <ProblemAgitation 
        title="¿Tu casa no se siente como el hogar que mereces?"
        pains={[
          "Espacios aburridos y sin personalidad que no invitan a relajarse.",
          "Muebles o accesorios incómodos que solo se ven bien en fotos.",
          "Productos baratos que se rompen o desgastan a los pocos meses."
        ]}
        theme={theme}
      />

      {/* 8. Solution Reveal */}
      <SolutionReveal 
        productName={product.title}
        description="Diseñado para aportar calidez, estilo y funcionalidad a tu día a día. Transforma cualquier espacio en tu lugar favorito."
        theme={theme}
      />

      {/* 9. Core Benefits (Icon Grid) */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-10">
          {[
            { icon: Sofa, title: "Confort Absoluto", desc: "Materiales suaves y ergonómicos que invitan al descanso después de un largo día." },
            { icon: Sparkles, title: "Estilo Atemporal", desc: "Un diseño elegante que no pasa de moda y eleva la estética de cualquier habitación." },
            { icon: ShieldCheck, title: "Hecho para Durar", desc: "Resistente al uso diario, fácil de limpiar y diseñado para acompañarte por años." }
          ].map((feat, i) => (
            <div key={i} className="bg-white p-10 rounded-[2rem] shadow-lg border border-stone-100 hover:-translate-y-2 transition-transform duration-300">
              <div className={`w-16 h-16 ${theme.bgLight} rounded-2xl flex items-center justify-center mb-6`}>
                <feat.icon className={`w-8 h-8 ${theme.text}`} />
              </div>
              <h3 className="text-2xl font-bold text-stone-900 mb-4">{feat.title}</h3>
              <p className="text-stone-600 leading-relaxed text-lg">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 10. Before & After (Visual Proof) */}
      <BeforeAfter theme={theme} />

      {/* 11. Deep Dive Feature 1 */}
      <DeepDiveFeature 
        title="Diseño Inteligente para Espacios Modernos"
        description="Cada detalle ha sido pensado para maximizar la funcionalidad sin sacrificar la estética."
        bullets={[
          "Materiales premium que resisten el paso del tiempo.",
          "Acabados impecables que combinan con cualquier estilo.",
          "Fácil integración en tu decoración actual."
        ]}
        imageUrl={`https://picsum.photos/800/800?random=${product.id}2`}
        theme={theme}
        reversed={false}
      />

      {/* 12. Expert Endorsement */}
      <ExpertEndorsement 
        expertName="Carolina Herrera"
        expertTitle="Diseñadora de Interiores"
        quote={`"Siempre recomiendo ${product.title} a mis clientes. Es la pieza clave que logra transformar un espacio común en un ambiente verdaderamente acogedor y sofisticado."`}
        theme={theme}
      />

      {/* 13. Comparison (Us vs Them) */}
      <ComparisonTable productName={product.title} theme={theme} />

      {/* 14. Bundle Offer (AOV Maximizer) */}
      <BundleOffer price={product.price} theme={theme} />

      {/* 15. Social Proof Wall */}
      <SocialProofWall theme={theme} />

      {/* 16. How It Works */}
      <HowItWorks theme={theme} />

      {/* 17. Guarantee */}
      <section className="bg-stone-900 text-white py-20">
        <div className="max-w-3xl mx-auto px-4 text-center flex flex-col items-center">
          <div className="bg-white/10 p-6 rounded-full mb-8">
            <ShieldCheck className={`w-16 h-16 ${theme.text}`} />
          </div>
          <h2 className="text-4xl font-bold mb-6">Garantía de Satisfacción Total</h2>
          <p className="text-xl text-stone-300 leading-relaxed">
            Queremos que ames cómo se ve en tu hogar. Si no estás 100% satisfecho con la calidad o el diseño, te ayudamos a resolverlo de inmediato. Tu tranquilidad es nuestra prioridad.
          </p>
        </div>
      </section>

      {/* 18. FAQ */}
      <section className="py-24 max-w-3xl mx-auto px-4">
        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12 text-stone-900">Preguntas Frecuentes</h2>
        <div className="space-y-4">
          {[
            { q: "¿Es fácil de limpiar y mantener?", a: "Sí, los materiales están seleccionados para resistir el uso diario. La mayoría de las manchas superficiales se limpian fácilmente con un paño húmedo." },
            { q: "¿Cuánto tarda en llegar mi pedido?", a: "El envío suele tomar entre 2 y 5 días hábiles dependiendo de tu ubicación. Te mantendremos informado en todo momento." },
            { q: "¿Cómo funciona el pago contra entrega?", a: "Es muy sencillo y seguro. Haces tu pedido hoy sin pagar nada. Cuando el repartidor llegue a la puerta de tu casa con el paquete, le pagas en efectivo." }
          ].map((faq, i) => (
            <div key={i} className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
              <button 
                className="w-full text-left p-6 font-bold text-stone-800 text-lg flex justify-between items-center hover:bg-stone-50"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                {faq.q}
                {openFaq === i ? <ChevronUp className="w-6 h-6 text-stone-400" /> : <ChevronDown className="w-6 h-6 text-stone-400" />}
              </button>
              {openFaq === i && (
                <div className="p-6 bg-stone-50 text-stone-600 text-lg border-t border-stone-100">
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
        title="Haz de tu casa tu lugar favorito."
        subtitle="Aprovecha nuestro descuento de temporada y renueva tu espacio hoy mismo con pago al recibir."
        theme={theme}
      />

      <StickyBuyButton price={product.price} theme={theme} />
      {data.pdpFeatures.recentSales && <RecentSalesPopup theme={theme} />}
    </div>
  );
}
