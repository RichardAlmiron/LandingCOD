'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { StoreData, Product } from '@/lib/types';
import { Star, Cpu, Battery, Wifi, ShieldCheck, Zap, ChevronDown, ChevronUp, Lock, Truck, Monitor, Smartphone, Headphones, CheckCircle2, AlertTriangle, Users, XCircle, Shield, Clock, Award } from 'lucide-react';
import { LiveViewers, ScarcityWarning, ProblemAgitation, SolutionReveal, BeforeAfter, DeepDiveFeature, ExpertEndorsement, ComparisonTable, BundleOffer, SocialProofWall, HowItWorks, ShippingInfo, FinalCTA, InlineCODForm, StickyBuyButton, RecentSalesPopup } from './SharedCRO';

interface PDPProps {
  data: StoreData;
  product: Product;
  variant?: number;
}

export default function PdpElectronics({ data, product, variant = 1 }: PDPProps) {
  const [timeLeft, setTimeLeft] = useState(3599);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [viewers, setViewers] = useState(89);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0)), 1000);
    const viewerTimer = setInterval(() => setViewers(prev => Math.max(45, prev + Math.floor(Math.random() * 10) - 4)), 3000);
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
      case 1: return { primary: 'bg-indigo-600', text: 'text-indigo-600', bgLight: 'bg-indigo-50', border: 'border-indigo-200', hover: 'hover:bg-indigo-700', alert: 'bg-red-600', name: 'Modo Oscuro Tech' };
      case 2: return { primary: 'bg-zinc-900', text: 'text-zinc-900', bgLight: 'bg-zinc-100', border: 'border-zinc-300', hover: 'hover:bg-black', alert: 'bg-orange-600', name: 'Minimalismo Tech' };
      case 3: return { primary: 'bg-blue-600', text: 'text-blue-600', bgLight: 'bg-blue-50', border: 'border-blue-200', hover: 'hover:bg-blue-700', alert: 'bg-red-500', name: 'Gamer RGB' };
      case 4: return { primary: 'bg-emerald-600', text: 'text-emerald-600', bgLight: 'bg-emerald-50', border: 'border-emerald-200', hover: 'hover:bg-emerald-700', alert: 'bg-red-600', name: 'Eco Tech' };
      case 5: return { primary: 'bg-cyan-600', text: 'text-cyan-600', bgLight: 'bg-cyan-50', border: 'border-cyan-200', hover: 'hover:bg-cyan-700', alert: 'bg-orange-500', name: 'Futurista Neón' };
      case 6: return { primary: 'bg-rose-600', text: 'text-rose-600', bgLight: 'bg-rose-50', border: 'border-rose-200', hover: 'hover:bg-rose-700', alert: 'bg-red-600', name: 'Estilo Premium' };
      case 7: return { primary: 'bg-amber-500', text: 'text-amber-600', bgLight: 'bg-amber-50', border: 'border-amber-200', hover: 'hover:bg-amber-600', alert: 'bg-red-600', name: 'Oferta Relámpago' };
      case 8: return { primary: 'bg-violet-600', text: 'text-violet-600', bgLight: 'bg-violet-50', border: 'border-violet-200', hover: 'hover:bg-violet-700', alert: 'bg-orange-600', name: 'Audio Pro' };
      case 9: return { primary: 'bg-slate-800', text: 'text-slate-800', bgLight: 'bg-slate-100', border: 'border-slate-300', hover: 'hover:bg-slate-900', alert: 'bg-red-600', name: 'Industrial Tech' };
      case 10: return { primary: 'bg-fuchsia-600', text: 'text-fuchsia-600', bgLight: 'bg-fuchsia-50', border: 'border-fuchsia-200', hover: 'hover:bg-fuchsia-700', alert: 'bg-red-500', name: 'Cyberpunk' };
      default: return { primary: 'bg-zinc-900', text: 'text-zinc-900', bgLight: 'bg-zinc-100', border: 'border-zinc-300', hover: 'hover:bg-black', alert: 'bg-red-600', name: 'Minimalismo Tech' };
    }
  };

  const theme = getTheme();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-24 selection:bg-indigo-200">
      
      {/* 1. Urgency Banner */}
      <div className={`${theme.alert} text-white text-center py-2 px-4 text-sm font-bold flex items-center justify-center gap-2 animate-pulse sticky top-0 z-50`}>
        <Zap className="w-4 h-4" />
        FLASH SALE: 50% OFF termina en {formatTime(timeLeft)}. Unidades limitadas.
      </div>

      {/* 2. Live Viewers (Social Pressure) */}
      <div className="bg-white border-b border-slate-200 py-2 text-center text-xs font-medium text-slate-600 flex justify-center items-center gap-2">
        <Users className="w-4 h-4 text-indigo-500 animate-pulse" />
        <span className="font-bold text-indigo-600">{viewers} usuarios</span> están viendo este dispositivo ahora mismo.
      </div>

      {/* 3. Hero Section (High Impact + Form) */}
      <section className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-4">
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl bg-white border border-slate-200 p-8 flex items-center justify-center group">
              <Image src={product.imageUrl} alt={product.title} fill className="object-contain p-8 group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute top-6 left-6 bg-zinc-900 text-white px-4 py-1.5 rounded-full text-xs font-black flex items-center shadow-lg tracking-widest uppercase">
                Next-Gen Tech
              </div>
              <div className="absolute bottom-6 right-6 bg-red-600 text-white px-4 py-2 rounded-lg font-black text-lg shadow-xl transform rotate-3">
                -50% HOY
              </div>
            </div>
            
            {/* 4. Quick Specs Grid */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              {[
                { icon: Cpu, label: "Procesador", val: "Ultra-Fast" },
                { icon: Battery, label: "Batería", val: "48h+" },
                { icon: Wifi, label: "Conexión", val: "Bluetooth 5.3" }
              ].map((spec, i) => (
                <div key={i} className="bg-white p-4 rounded-2xl border border-slate-200 text-center shadow-sm hover:border-indigo-300 transition-colors">
                  <spec.icon className={`w-6 h-6 mx-auto mb-2 ${theme.text}`} />
                  <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">{spec.label}</div>
                  <div className="font-black text-sm">{spec.val}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
              </div>
              <span className="text-slate-600 font-bold text-sm underline decoration-dashed cursor-pointer">
                4.9/5 ({product.reviews} reviews verificadas)
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

            <div className="bg-white border-2 border-slate-900 rounded-2xl p-6 mb-8 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
              <div className="flex justify-between items-end mb-4 border-b border-slate-100 pb-4">
                <div>
                  <p className="text-sm text-slate-500 font-bold uppercase tracking-wider mb-1">Precio Especial</p>
                  <div className="flex items-baseline gap-3">
                    <span className="text-5xl font-black text-slate-900">{product.price}</span>
                    <span className="text-xl text-slate-400 line-through font-bold">{product.originalPrice}</span>
                  </div>
                </div>
                <div className="bg-red-100 text-red-700 font-black px-3 py-1 rounded-lg text-sm">
                  Ahorras 50%
                </div>
              </div>

              {/* 6. Inline COD Form (Frictionless Checkout) */}
              <h3 className="text-lg font-black mb-4 flex items-center gap-2">
                <Truck className="w-5 h-5 text-emerald-600" /> Envío Gratis + Pago Contra Entrega
              </h3>
              <InlineCODForm buttonColor={theme.primary} />
              
              <div className="mt-4 flex items-center justify-center gap-4 text-xs text-slate-500 font-bold uppercase tracking-wider">
                <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4" /> Garantía 1 Año</span>
                <span className="flex items-center gap-1"><Lock className="w-4 h-4" /> Pago Seguro</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Problem Agitation */}
      <ProblemAgitation 
        title="¿Cansado de pagar precios inflados por tecnología que se vuelve obsoleta en meses?"
        pains={[
          "Las grandes marcas te cobran un 300% más solo por el logo en la caja.",
          "Dispositivos que prometen mucho pero su batería muere a mitad del día.",
          "Conexiones inestables, lag y materiales baratos que se rompen fácilmente."
        ]}
        theme={theme}
      />

      {/* 8. Solution Reveal */}
      <SolutionReveal 
        productName={product.title}
        description="Diseñado con los mismos componentes internos que los dispositivos de $300+, pero directo de fábrica a tus manos. Máximo rendimiento, cero sobreprecio."
        theme={theme}
      />

      {/* 9. Core Benefits (Icon Grid) */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <Zap />, title: "Cero Latencia", desc: "Respuesta instantánea." },
              { icon: <Battery />, title: "Batería Infinita", desc: "Dura días, no horas." },
              { icon: <Smartphone />, title: "Emparejamiento Rápido", desc: "iOS, Android, Mac, PC." },
              { icon: <ShieldCheck />, title: "Materiales Premium", desc: "Aleación de grado aeroespacial." }
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

      {/* 10. Deep Dive Feature 1: Performance */}
      <DeepDiveFeature 
        title="Potencia bruta que supera a la competencia."
        description={`Equipado con nuestro procesador de última generación, ${product.title} procesa datos un 40% más rápido que el modelo anterior, garantizando una experiencia fluida sin importar la exigencia.`}
        bullets={[
          "Multitarea sin interrupciones.",
          "Gestión térmica avanzada (no se calienta)."
        ]}
        imageUrl={`https://picsum.photos/800/800?random=${product.id}3`}
        theme={theme}
        reversed={false}
      />

      {/* 11. Deep Dive Feature 2: Battery */}
      <DeepDiveFeature 
        title="Olvídate del cargador. Literalmente."
        description="Con una celda de alta densidad y optimización por IA, obtienes hasta 48 horas de uso continuo. Y si te quedas sin batería, nuestra carga rápida te da 5 horas de uso con solo 10 minutos conectado."
        bullets={[
          "Carga rápida USB-C.",
          "Modo ahorro de energía inteligente."
        ]}
        imageUrl={`https://picsum.photos/800/800?random=${product.id}4`}
        theme={theme}
        reversed={true}
      />

      {/* 12. Expert Endorsement / Tech Review */}
      <ExpertEndorsement 
        expertName="TechReviewer Pro"
        expertTitle="Canal de YouTube con 2M+ Subs"
        quote={`"He probado dispositivos que cuestan el triple y ${product.title} los supera en rendimiento de batería y calidad de construcción. Es absurdo lo bueno que es por este precio. Una compra obligada."`}
        theme={theme}
      />

      {/* 13. Us vs Them (Comparison Table) */}
      <ComparisonTable productName={product.title} theme={theme} />

      {/* 14. Unboxing / What's included */}
      <section className="bg-slate-100 py-16 border-y border-slate-200">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black mb-10">¿Qué hay en la caja?</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {["1x " + product.title, "1x Cable USB-C Carga Rápida", "1x Manual de Usuario", "1x Estuche Protector Premium", "Certificado de Garantía"].map((item, i) => (
              <div key={i} className="bg-white px-6 py-3 rounded-full border border-slate-200 font-bold text-slate-700 flex items-center gap-2 shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-indigo-500" /> {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 15. Bundle Offer (AOV Maximizer) */}
      <BundleOffer price={product.price} theme={theme} />

      {/* 16. Social Proof Wall */}
      <SocialProofWall theme={theme} />

      {/* 17. How It Works */}
      <HowItWorks theme={theme} />

      {/* 18. Ironclad Guarantee */}
      <section className="py-16 max-w-4xl mx-auto px-4">
        <div className="bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-300 p-8 md:p-12 rounded-3xl text-center relative overflow-hidden shadow-xl">
          <ShieldCheck className={`w-20 h-20 mx-auto mb-6 ${theme.text}`} />
          <h2 className="text-3xl font-black mb-4 text-slate-900">Garantía Tecnológica de 1 Año</h2>
          <p className="text-lg text-slate-700 max-w-2xl mx-auto font-medium">
            Respaldamos la calidad de nuestros componentes. Si tu {product.title} presenta cualquier falla de fábrica durante los primeros 365 días, te lo reemplazamos por uno completamente nuevo. Sin letras pequeñas.
          </p>
        </div>
      </section>

      {/* 19. FAQ */}
      <section className="py-16 max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-black text-center mb-10">Preguntas Frecuentes</h2>
        <div className="space-y-4">
          {[
            { q: "¿Es compatible con mi teléfono/computadora?", a: "Sí, es 100% compatible con cualquier dispositivo iOS (iPhone, iPad), Android (FutureTech, Xiaomi, Motorola, etc), Windows y Mac que tenga conectividad Bluetooth." },
            { q: "¿Qué incluye la garantía?", a: "Ofrecemos 1 año de garantía por defectos de fábrica (problemas de batería, conectividad, audio). Si falla, te enviamos una unidad nueva." },
            { q: "¿Cómo funciona el pago contra entrega?", a: "Haces tu pedido hoy sin pagar nada por adelantado. Te lo enviamos por paquetería express y le pagas en efectivo al repartidor cuando te entregue el paquete en tus manos. 100% seguro." },
            { q: "¿Cuánto tarda en llegar?", a: "Nuestros tiempos de entrega son de 24 a 48 horas laborables en ciudades principales, y hasta 72 horas en zonas extendidas." }
          ].map((faq, i) => (
            <div key={i} className="border-2 border-slate-200 rounded-2xl overflow-hidden bg-white">
              <button 
                className="w-full text-left p-6 font-black text-slate-900 flex justify-between items-center hover:bg-slate-50 transition-colors"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                {faq.q}
                {openFaq === i ? <ChevronUp className={`w-6 h-6 ${theme.text}`} /> : <ChevronDown className="w-6 h-6 text-slate-400" />}
              </button>
              {openFaq === i && (
                <div className="p-6 bg-slate-50 text-slate-700 border-t-2 border-slate-200 font-medium leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 20. Final CTA */}
      <FinalCTA 
        title="Únete a la revolución tecnológica."
        subtitle="No pagues de más por el logo de una marca. Obtén la misma tecnología premium hoy mismo con un 50% de descuento."
        theme={theme}
      />

      <StickyBuyButton price={product.price} theme={theme} />
      {data.pdpFeatures.recentSales && <RecentSalesPopup theme={theme} />}
    </div>
  );
}
