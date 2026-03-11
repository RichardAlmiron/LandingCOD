'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { StoreData, Product } from '@/lib/types';
import { Star, Sparkles, Droplet, Sun, Heart, Check, Clock, ShieldCheck, ArrowRight, Leaf, Shield, HeartHandshake, ChevronDown, ChevronUp, AlertTriangle, Users, Activity, CheckCircle, Zap } from 'lucide-react';
import { LiveViewers, ScarcityWarning, ProblemAgitation, SolutionReveal, BeforeAfter, DeepDiveFeature, ExpertEndorsement, ComparisonTable, BundleOffer, SocialProofWall, HowItWorks, ShippingInfo, FinalCTA, InlineCODForm, StickyBuyButton, RecentSalesPopup } from './SharedCRO';

interface PDPProps {
  data: StoreData;
  product: Product;
  variant?: number;
}

export default function PdpBeauty({ data, product, variant = 1 }: PDPProps) {
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour
  const [viewers, setViewers] = useState(142);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    
    const viewerTimer = setInterval(() => {
      setViewers(prev => Math.max(89, Math.min(215, prev + Math.floor(Math.random() * 7) - 3)));
    }, 5000);

    return () => { clearInterval(timer); clearInterval(viewerTimer); };
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const getTheme = () => {
    switch(variant) {
      case 1: return { primary: 'bg-rose-400', text: 'text-rose-500', bgLight: 'bg-rose-50', border: 'border-rose-200', hover: 'hover:bg-rose-500', accent: 'bg-rose-100', alert: 'bg-red-500', name: 'Rosa Delicado' };
      case 2: return { primary: 'bg-pink-500', text: 'text-pink-500', bgLight: 'bg-pink-50', border: 'border-pink-200', hover: 'hover:bg-pink-600', accent: 'bg-pink-100', alert: 'bg-rose-600', name: 'Fucsia Vibrante' };
      case 3: return { primary: 'bg-stone-900', text: 'text-stone-800', bgLight: 'bg-stone-100', border: 'border-stone-300', hover: 'hover:bg-stone-800', accent: 'bg-stone-200', alert: 'bg-stone-700', name: 'Elegancia Negra' };
      case 4: return { primary: 'bg-fuchsia-600', text: 'text-fuchsia-600', bgLight: 'bg-fuchsia-50', border: 'border-fuchsia-200', hover: 'hover:bg-fuchsia-700', accent: 'bg-fuchsia-100', alert: 'bg-red-500', name: 'Orquídea' };
      case 5: return { primary: 'bg-purple-500', text: 'text-purple-500', bgLight: 'bg-purple-50', border: 'border-purple-200', hover: 'hover:bg-purple-600', accent: 'bg-purple-100', alert: 'bg-rose-500', name: 'Lavanda Suave' };
      case 6: return { primary: 'bg-amber-400', text: 'text-amber-500', bgLight: 'bg-amber-50', border: 'border-amber-200', hover: 'hover:bg-amber-500', accent: 'bg-amber-100', alert: 'bg-orange-500', name: 'Brillo Dorado' };
      case 7: return { primary: 'bg-teal-500', text: 'text-teal-500', bgLight: 'bg-teal-50', border: 'border-teal-200', hover: 'hover:bg-teal-600', accent: 'bg-teal-100', alert: 'bg-emerald-500', name: 'Menta Fresca' };
      case 8: return { primary: 'bg-sky-400', text: 'text-sky-500', bgLight: 'bg-sky-50', border: 'border-sky-200', hover: 'hover:bg-sky-500', accent: 'bg-sky-100', alert: 'bg-blue-500', name: 'Cielo Claro' };
      case 9: return { primary: 'bg-red-600', text: 'text-red-600', bgLight: 'bg-red-50', border: 'border-red-200', hover: 'hover:bg-red-700', accent: 'bg-red-100', alert: 'bg-red-700', name: 'Rojo Pasión' };
      case 10: return { primary: 'bg-orange-400', text: 'text-orange-500', bgLight: 'bg-orange-50', border: 'border-orange-200', hover: 'hover:bg-orange-500', accent: 'bg-orange-100', alert: 'bg-red-500', name: 'Durazno' };
      default: return { primary: 'bg-rose-400', text: 'text-rose-500', bgLight: 'bg-rose-50', border: 'border-rose-200', hover: 'hover:bg-rose-500', accent: 'bg-rose-100', alert: 'bg-red-500', name: 'Rosa Delicado' };
    }
  };

  const theme = getTheme();

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-stone-800 font-sans pb-24 selection:bg-rose-200">
      
      {/* 1. Urgency Banner */}
      <div className={`${theme.alert} text-white text-center py-2 px-4 text-xs tracking-widest uppercase font-medium flex items-center justify-center gap-2 sticky top-0 z-50`}>
        <Clock className="w-4 h-4 animate-pulse" />
        Oferta Especial Termina en: <span className="font-bold">{formatTime(timeLeft)}</span>
      </div>

      {/* 2. Live Viewers (Social Pressure) */}
      <div className="bg-white border-b border-stone-100 py-2 text-center text-xs font-medium text-stone-500 flex justify-center items-center gap-2">
        <Users className={`w-4 h-4 ${theme.text} animate-pulse`} />
        <span className={`font-bold ${theme.text}`}>{viewers} personas</span> están viendo este producto ahora.
      </div>

      {/* 3. Hero Section (Soft & High Converting) */}
      <section className="max-w-6xl mx-auto px-4 py-8 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* Left: Visuals */}
          <div className="relative">
            <div className={`absolute inset-0 ${theme.bgLight} rounded-t-full transform -rotate-6 scale-105 -z-10`}></div>
            <div className="relative aspect-[4/5] rounded-t-full overflow-hidden shadow-2xl border-8 border-white">
              <Image src={product.imageUrl} alt={product.title} fill className="object-cover" />
              <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold text-stone-800 flex items-center shadow-lg">
                <Sparkles className={`w-4 h-4 mr-1 ${theme.text}`} /> #1 Bestseller
              </div>
            </div>
            
            {/* 4. Trust Badges Floating */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[110%] flex justify-center gap-2">
              {[
                { icon: Leaf, text: "100% Natural" },
                { icon: ShieldCheck, text: "Dermatológico" },
                { icon: Heart, text: "Cruelty Free" }
              ].map((badge, i) => (
                <div key={i} className="bg-white px-4 py-3 rounded-2xl shadow-xl flex flex-col items-center gap-1 border border-stone-100">
                  <badge.icon className={`w-5 h-5 ${theme.text}`} />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-600">{badge.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Copy & Form */}
          <div className="flex flex-col mt-12 lg:mt-0">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <span className="text-stone-600 font-medium text-sm underline decoration-dashed cursor-pointer">
                4.9/5 en más de {product.reviews} reseñas
              </span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-serif text-stone-900 mb-4 leading-tight">
              {product.title}
            </h1>
            
            <p className="text-lg text-stone-500 font-light mb-6 leading-relaxed">
              {product.description}
            </p>

            {/* 5. Scarcity Warning */}
            <div className="mb-6">
               <ScarcityWarning colorClass={theme.primary} textClass={theme.text} />
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-100 mb-8 relative overflow-hidden">
              <div className={`absolute top-0 left-0 w-1 h-full ${theme.primary}`}></div>
              <div className="flex justify-between items-end mb-4">
                <div>
                  <p className="text-xs text-stone-400 font-bold uppercase tracking-wider mb-1">Precio Especial Hoy</p>
                  <div className="flex items-baseline gap-3">
                    <span className={`text-4xl font-light text-stone-900`}>{product.price}</span>
                    <span className="text-lg text-stone-400 line-through">{product.originalPrice}</span>
                  </div>
                </div>
                <div className={`${theme.bgLight} ${theme.text} px-3 py-1 rounded-full text-xs font-bold`}>
                  Ahorras 50%
                </div>
              </div>
              
              <div className="space-y-3 mb-6">
                {[
                  'Resultados visibles en 14 días',
                  'Fórmula clínica comprobada',
                  'Envío gratis en tu primera orden'
                ].map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full ${theme.bgLight} flex items-center justify-center shrink-0`}>
                      <Check className={`w-3 h-3 ${theme.text}`} />
                    </div>
                    <span className="text-stone-600 text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. Inline COD Form */}
            <div className="bg-white p-6 rounded-3xl shadow-xl border border-stone-100">
              <h3 className="text-center font-serif text-xl mb-4 text-stone-800">Completa tu pedido ahora</h3>
              <InlineCODForm buttonColor={theme.primary} />
              <p className="text-center text-xs text-stone-400 mt-4 flex items-center justify-center gap-1">
                <Shield className="w-3 h-3" /> Pago 100% Seguro al Recibir
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Problem Agitation */}
      <ProblemAgitation 
        title="¿Cansada de probar productos que prometen mucho y no hacen nada?"
        pains={[
          "Cremas costosas que solo dejan la piel grasosa sin hidratar realmente.",
          "Tratamientos agresivos que irritan y enrojecen tu piel sensible.",
          "Rutinas interminables de 10 pasos que no tienes tiempo de hacer."
        ]}
        theme={theme}
      />

      {/* 8. Solution Reveal */}
      <SolutionReveal 
        productName={product.title}
        description="Formulado en laboratorios europeos con activos de última generación, nuestro tratamiento ofrece resultados clínicos sin irritación."
        theme={theme}
      />

      {/* 9. Core Benefits (Icon Grid) */}
      <section className="py-16 max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Droplet, title: "Ácido Hialurónico Puro", desc: "Penetra en las capas más profundas para una hidratación que dura 72 horas." },
            { icon: Sun, title: "Vitamina C Estabilizada", desc: "Ilumina el rostro, unifica el tono y combate los radicales libres." },
            { icon: HeartHandshake, title: "Péptidos Bioactivos", desc: "Estimulan la producción natural de colágeno para una piel más firme." }
          ].map((feat, i) => (
            <div key={i} className="text-center group bg-white p-8 rounded-3xl shadow-sm border border-stone-100 hover:shadow-md transition-all">
              <div className={`w-20 h-20 mx-auto ${theme.bgLight} rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                <feat.icon className={`w-8 h-8 ${theme.text} font-light`} />
              </div>
              <h3 className="text-xl font-serif text-stone-800 mb-3">{feat.title}</h3>
              <p className="text-stone-500 font-light leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 10. Before & After (Visual Proof) */}
      <BeforeAfter theme={theme} />

      {/* 11. Deep Dive Feature 1 */}
      <DeepDiveFeature 
        title="Transformación Real en 3 Pasos Simples"
        description="Olvídate de las rutinas complicadas. Solo necesitas 2 minutos al día."
        bullets={[
          "Paso 1: Aplica 2-3 gotas sobre la piel limpia.",
          "Paso 2: Masajea con movimientos circulares ascendentes.",
          "Paso 3: Disfruta la absorción inmediata y el efecto tensor."
        ]}
        imageUrl={`https://picsum.photos/800/800?random=${product.id}1`}
        theme={theme}
        reversed={false}
      />

      {/* 12. Expert Endorsement */}
      <ExpertEndorsement 
        expertName="Dra. Elena Valdés"
        expertTitle="Dermatóloga Clínica"
        quote={`"Recomiendo ${product.title} a mis pacientes porque combina activos puros en concentraciones efectivas sin comprometer la barrera cutánea. Es un avance real en el cuidado diario."`}
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
      <section className={`${theme.bgLight} py-16`}>
        <div className="max-w-3xl mx-auto px-4 text-center flex flex-col items-center">
          <div className="bg-white p-4 rounded-full shadow-sm mb-6">
            <Heart className={`w-12 h-12 ${theme.text}`} />
          </div>
          <h2 className="text-3xl font-serif mb-4 text-stone-900">Garantía de Piel Feliz</h2>
          <p className="text-lg text-stone-600 font-light">
            Queremos que ames tu piel. Si después de 30 días de uso no ves resultados, te devolvemos tu dinero. Sin preguntas complicadas.
          </p>
        </div>
      </section>

      {/* 18. FAQ */}
      <section className="py-24 max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-serif text-center mb-12 text-stone-900">Preguntas Frecuentes</h2>
        <div className="space-y-4">
          {[
            { q: "¿Es apto para pieles grasas o con tendencia a acné?", a: "Sí, su fórmula es no comedogénica, lo que significa que no obstruye los poros. Es ligera y se absorbe rápidamente." },
            { q: "¿En cuánto tiempo veré resultados?", a: "La hidratación y luminosidad se notan desde la primera aplicación. Los resultados reafirmantes y de reducción de líneas finas son visibles a partir de los 14 días de uso continuo." },
            { q: "¿Puedo usarlo de día y de noche?", a: "Absolutamente. De día protege e hidrata, y de noche ayuda en el proceso de regeneración celular. Recuerda usar protector solar durante el día." }
          ].map((faq, i) => (
            <div key={i} className="bg-white border border-stone-200 rounded-2xl overflow-hidden">
              <button 
                className="w-full text-left p-6 font-medium text-stone-800 flex justify-between items-center hover:bg-stone-50"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                {faq.q}
                {openFaq === i ? <ChevronUp className="w-5 h-5 text-stone-400" /> : <ChevronDown className="w-5 h-5 text-stone-400" />}
              </button>
              {openFaq === i && (
                <div className="p-6 bg-stone-50 text-stone-600 font-light border-t border-stone-100">
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
        title="Tu piel merece lo mejor."
        subtitle="No esperes más para darle a tu rostro el cuidado que necesita. Pide hoy y paga al recibir en la comodidad de tu hogar."
        theme={theme}
      />

      <StickyBuyButton price={product.price} theme={theme} />
      {data.pdpFeatures.recentSales && <RecentSalesPopup theme={theme} />}
    </div>
  );
}
