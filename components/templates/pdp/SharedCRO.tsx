'use client';
import React, { useState, useEffect } from 'react';
import { Product, StoreData } from '@/lib/types';
import { Star, ShieldCheck, Truck, Clock, CheckCircle, AlertTriangle, Users, ChevronDown, ChevronUp, ShoppingCart, XCircle, Zap, Shield } from 'lucide-react';

// 1. Live Viewers (Social Pressure)
export const LiveViewers = ({ colorClass = 'text-red-600', bgClass = 'bg-red-50' }) => {
  const [viewers, setViewers] = useState(47);
  useEffect(() => {
    const interval = setInterval(() => {
      setViewers(prev => Math.max(12, prev + Math.floor(Math.random() * 5) - 2));
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className={`flex items-center space-x-2 ${bgClass} ${colorClass} px-3 py-2 rounded-lg text-sm font-medium animate-pulse`}>
      <Users className="w-4 h-4" />
      <span>{viewers} personas están viendo este producto ahora mismo</span>
    </div>
  );
};

// 2. Scarcity Warning (Stock Bar)
export const ScarcityWarning = ({ colorClass = 'bg-red-600', textClass = 'text-red-600' }) => {
  return (
    <div className="space-y-2 my-4">
      <div className={`flex justify-between text-sm font-bold ${textClass}`}>
        <span className="flex items-center"><AlertTriangle className="w-4 h-4 mr-1" /> ¡ATENCIÓN!</span>
        <span>Solo quedan 7 unidades</span>
      </div>
      <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
        <div className={`h-full ${colorClass} rounded-full w-[15%] animate-pulse`}></div>
      </div>
      <p className="text-xs text-gray-500 text-center">El stock se actualiza en tiempo real. Alta demanda.</p>
    </div>
  );
};

// 3. Trust Bar (COD & Shipping)
export const TrustBar = () => {
  return (
    <div className="grid grid-cols-3 gap-2 py-4 border-y border-gray-100 my-6">
      <div className="flex flex-col items-center text-center space-y-1">
        <div className="bg-green-100 p-2 rounded-full text-green-600"><Truck className="w-5 h-5" /></div>
        <span className="text-[10px] sm:text-xs font-bold leading-tight">ENVÍO GRATIS<br/>A TODO EL PAÍS</span>
      </div>
      <div className="flex flex-col items-center text-center space-y-1">
        <div className="bg-blue-100 p-2 rounded-full text-blue-600"><ShieldCheck className="w-5 h-5" /></div>
        <span className="text-[10px] sm:text-xs font-bold leading-tight">PAGO CONTRA<br/>ENTREGA (COD)</span>
      </div>
      <div className="flex flex-col items-center text-center space-y-1">
        <div className="bg-yellow-100 p-2 rounded-full text-yellow-600"><CheckCircle className="w-5 h-5" /></div>
        <span className="text-[10px] sm:text-xs font-bold leading-tight">GARANTÍA DE<br/>SATISFACCIÓN</span>
      </div>
    </div>
  );
};

// 4. Bundle Offer (AOV Maximizer)
export const BundleOffer = ({ price, colorClass = 'border-green-500', bgClass = 'bg-green-50', textClass = 'text-green-600', theme }: any) => {
  const [selected, setSelected] = useState(2);
  const numPrice = parseFloat(price?.replace(/[$,]/g, '') || '0');
  
  const offers = [
    { id: 1, title: '1 Unidad', subtitle: 'Para probar', price: numPrice, tag: '' },
    { id: 2, title: '2 Unidades', subtitle: 'Envío Prioritario', price: numPrice * 1.8, tag: 'MÁS VENDIDO' },
    { id: 3, title: '3 Unidades', subtitle: 'Lleva 3, Paga 2', price: numPrice * 2, tag: 'MEJOR OFERTA' },
  ];

  return (
    <div className="space-y-3 my-6">
      <h3 className="font-black text-lg text-center uppercase tracking-tight">Selecciona tu Oferta</h3>
      <div className="space-y-2">
        {offers.map((offer) => (
          <div 
            key={offer.id}
            onClick={() => setSelected(offer.id)}
            className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all ${selected === offer.id ? `${colorClass} ${bgClass}` : 'border-gray-200 bg-white hover:border-gray-300'}`}
          >
            {offer.tag && (
              <span className="absolute -top-3 right-4 bg-red-600 text-white text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-wider">
                {offer.tag}
              </span>
            )}
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selected === offer.id ? colorClass : 'border-gray-300'}`}>
                  {selected === offer.id && <div className={`w-2.5 h-2.5 rounded-full ${colorClass.replace('border-', 'bg-')}`}></div>}
                </div>
                <div>
                  <div className="font-bold text-gray-900">{offer.title}</div>
                  <div className="text-xs text-gray-500">{offer.subtitle}</div>
                </div>
              </div>
              <div className="text-right">
                <div className={`font-black text-lg ${textClass}`}>${offer.price.toLocaleString()}</div>
                {offer.id > 1 && <div className="text-xs text-gray-400 line-through">${(numPrice * offer.id).toLocaleString()}</div>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 5. Inline COD Form (Frictionless Checkout)
export const InlineCODForm = ({ buttonColor = 'bg-green-600 hover:bg-green-700' }) => {
  return (
    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 my-8 shadow-inner" id="checkout-form">
      <div className="text-center mb-6">
        <h3 className="font-black text-2xl text-gray-900 uppercase">Pide Ahora, Paga al Recibir</h3>
        <p className="text-sm text-gray-600 mt-1">Completa el formulario y enviaremos tu pedido hoy mismo.</p>
      </div>
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Nombre Completo</label>
          <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none transition-all" placeholder="Ej. Juan Pérez" />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Teléfono (WhatsApp)</label>
          <input type="tel" className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none transition-all" placeholder="Para confirmar tu pedido" />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Dirección de Entrega</label>
          <textarea rows={2} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-gray-900 outline-none transition-all" placeholder="Calle, número, barrio, referencias..."></textarea>
        </div>
        <button className={`w-full ${buttonColor} text-white font-black text-lg py-4 rounded-xl uppercase tracking-widest shadow-lg transition-all transform hover:scale-[1.02] flex items-center justify-center space-x-2`}>
          <ShoppingCart className="w-6 h-6" />
          <span>Confirmar Pedido</span>
        </button>
        <p className="text-center text-xs text-gray-500 flex items-center justify-center space-x-1 mt-4">
          <ShieldCheck className="w-4 h-4 text-green-600" />
          <span>Tus datos están 100% seguros</span>
        </p>
      </form>
    </div>
  );
};

// 6. Sticky Buy Button
export const StickyBuyButton = ({ buttonColor = 'bg-red-600', price, theme }: any) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-[0_-10px_20px_rgba(0,0,0,0.1)] z-50 md:hidden">
      <button 
        onClick={() => document.getElementById('checkout-form')?.scrollIntoView({ behavior: 'smooth' })}
        className={`w-full ${buttonColor} text-white font-black text-lg py-4 rounded-xl uppercase tracking-widest shadow-lg animate-bounce`}
      >
        Pedir y Pagar al Recibir
      </button>
    </div>
  );
};

// 7. Recent Sales Popup (Fake Social Proof)
export const RecentSalesPopup = ({ theme }: any) => {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState({ name: '', city: '', time: '' });

  useEffect(() => {
    const names = ['Carlos M.', 'Ana G.', 'Luis F.', 'María P.', 'Jorge R.'];
    const cities = ['Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'EditorialChicgoza'];
    const showPopup = () => {
      setCurrent({
        name: names[Math.floor(Math.random() * names.length)],
        city: cities[Math.floor(Math.random() * cities.length)],
        time: `${Math.floor(Math.random() * 15) + 1} min`
      });
      setVisible(true);
      setTimeout(() => setVisible(false), 4000);
    };

    const interval = setInterval(showPopup, 15000);
    const initialTimeout = setTimeout(showPopup, 3000); // Initial show
    return () => {
      clearInterval(interval);
      clearTimeout(initialTimeout);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-24 left-4 right-4 md:left-8 md:right-auto md:w-80 bg-white p-3 rounded-xl shadow-2xl border border-gray-100 z-40 flex items-center space-x-3 animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center shrink-0">
        <CheckCircle className="w-6 h-6 text-green-600" />
      </div>
      <div>
        <p className="text-sm text-gray-800"><span className="font-bold">{current.name}</span> de {current.city}</p>
        <p className="text-xs text-gray-500">Compró este producto hace {current.time}</p>
      </div>
    </div>
  );
};

// 8. FAQ Section
export const FAQSection = () => {
  const faqs = [
    { q: '¿Cuándo pagaré mi pedido?', a: 'Pagas ÚNICAMENTE cuando recibes el producto en tus manos. Cero riesgos.' },
    { q: '¿Cuánto tarda el envío?', a: 'Entregamos en 24-48 horas laborables en toda la península.' },
    { q: '¿Tiene garantía?', a: 'Sí, tienes 30 días de garantía de satisfacción total o te devolvemos el dinero.' }
  ];
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="my-8">
      <h3 className="font-black text-2xl text-center uppercase mb-6">Preguntas Frecuentes</h3>
      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
            <button 
              className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 font-bold text-left"
              onClick={() => setOpen(open === i ? null : i)}
            >
              <span>{faq.q}</span>
              {open === i ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
            {open === i && <div className="p-4 bg-white text-gray-600 text-sm">{faq.a}</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

// NEW: 9. Comparison Table (Us vs Them)
export const ComparisonTable = ({ productName, theme }: any) => {
  return (
    <div className="my-10 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <h3 className="font-black text-2xl text-center uppercase py-6 bg-gray-50 border-b border-gray-100">¿Por qué elegirnos?</h3>
      <div className="grid grid-cols-3 text-center text-sm">
        <div className="col-span-1 py-4 font-bold text-gray-500 border-r border-gray-100">Característica</div>
        <div className="col-span-1 py-4 font-black text-gray-900 border-r border-gray-100 bg-green-50/50">{productName}</div>
        <div className="col-span-1 py-4 font-bold text-gray-500">Otros</div>
        
        {/* Row 1 */}
        <div className="col-span-1 py-4 border-t border-r border-gray-100 flex items-center justify-center px-2">Calidad Premium</div>
        <div className="col-span-1 py-4 border-t border-r border-gray-100 bg-green-50/50 flex justify-center"><CheckCircle className="w-6 h-6 text-green-500" /></div>
        <div className="col-span-1 py-4 border-t border-gray-100 flex justify-center"><XCircle className="w-6 h-6 text-red-400" /></div>
        
        {/* Row 2 */}
        <div className="col-span-1 py-4 border-t border-r border-gray-100 flex items-center justify-center px-2">Envío Rápido</div>
        <div className="col-span-1 py-4 border-t border-r border-gray-100 bg-green-50/50 flex justify-center"><CheckCircle className="w-6 h-6 text-green-500" /></div>
        <div className="col-span-1 py-4 border-t border-gray-100 flex justify-center"><XCircle className="w-6 h-6 text-red-400" /></div>
        
        {/* Row 3 */}
        <div className="col-span-1 py-4 border-t border-r border-gray-100 flex items-center justify-center px-2">Pago al Recibir</div>
        <div className="col-span-1 py-4 border-t border-r border-gray-100 bg-green-50/50 flex justify-center"><CheckCircle className="w-6 h-6 text-green-500" /></div>
        <div className="col-span-1 py-4 border-t border-gray-100 flex justify-center"><XCircle className="w-6 h-6 text-red-400" /></div>
      </div>
    </div>
  );
};

// NEW: 10. How It Works (3 Steps)
export const HowItWorks = ({ theme }: any) => {
  return (
    <div className="my-10">
      <h3 className="font-black text-2xl text-center uppercase mb-8">¿Cómo funciona?</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center text-2xl font-black text-gray-900 border-4 border-white shadow-lg">1</div>
          <h4 className="font-bold text-lg">Haz tu pedido</h4>
          <p className="text-sm text-gray-500">Rellena el formulario en menos de 1 minuto sin usar tarjeta.</p>
        </div>
        <div className="text-center space-y-3">
          <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center text-2xl font-black text-gray-900 border-4 border-white shadow-lg">2</div>
          <h4 className="font-bold text-lg">Lo enviamos</h4>
          <p className="text-sm text-gray-500">Preparamos tu paquete y te lo enviamos en 24/48 horas.</p>
        </div>
        <div className="text-center space-y-3">
          <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center text-2xl font-black text-green-600 border-4 border-white shadow-lg">3</div>
          <h4 className="font-bold text-lg">Pagas al recibir</h4>
          <p className="text-sm text-gray-500">Pagas en efectivo directamente al repartidor. 100% seguro.</p>
        </div>
      </div>
    </div>
  );
};

// NEW: 11. Feature Grid
export const FeatureGrid = ({ iconColor = 'text-indigo-600', bgClass = 'bg-indigo-50' }) => {
  return (
    <div className="grid grid-cols-2 gap-4 my-8">
      <div className="p-4 rounded-2xl border border-gray-100 bg-white shadow-sm flex flex-col items-center text-center space-y-2">
        <div className={`p-3 rounded-full ${bgClass} ${iconColor}`}><Zap className="w-6 h-6" /></div>
        <h4 className="font-bold text-sm">Resultados Rápidos</h4>
        <p className="text-xs text-gray-500">Notarás la diferencia desde el primer día de uso.</p>
      </div>
      <div className="p-4 rounded-2xl border border-gray-100 bg-white shadow-sm flex flex-col items-center text-center space-y-2">
        <div className={`p-3 rounded-full ${bgClass} ${iconColor}`}><Shield className="w-6 h-6" /></div>
        <h4 className="font-bold text-sm">Materiales Premium</h4>
        <p className="text-xs text-gray-500">Fabricado con los más altos estándares de calidad.</p>
      </div>
      <div className="p-4 rounded-2xl border border-gray-100 bg-white shadow-sm flex flex-col items-center text-center space-y-2">
        <div className={`p-3 rounded-full ${bgClass} ${iconColor}`}><Star className="w-6 h-6" /></div>
        <h4 className="font-bold text-sm">Diseño Exclusivo</h4>
        <p className="text-xs text-gray-500">Un producto único que no encontrarás en tiendas físicas.</p>
      </div>
      <div className="p-4 rounded-2xl border border-gray-100 bg-white shadow-sm flex flex-col items-center text-center space-y-2">
        <div className={`p-3 rounded-full ${bgClass} ${iconColor}`}><CheckCircle className="w-6 h-6" /></div>
        <h4 className="font-bold text-sm">Fácil de Usar</h4>
        <p className="text-xs text-gray-500">Diseñado para ser intuitivo y práctico para todos.</p>
      </div>
    </div>
  );
};

// NEW: 12. Guarantee Badge
export const GuaranteeBadge = () => {
  return (
    <div className="my-10 bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8 rounded-3xl shadow-2xl text-center relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-10 -mt-10"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-5 rounded-full -ml-10 -mb-10"></div>
      <ShieldCheck className="w-16 h-16 mx-auto text-yellow-400 mb-4" />
      <h3 className="font-black text-2xl uppercase mb-2 text-yellow-400">Garantía de Hierro 30 Días</h3>
      <p className="text-sm text-gray-300 leading-relaxed">
        Estamos tan seguros de la calidad de nuestro producto que si no estás 100% satisfecho, te devolvemos tu dinero sin hacer preguntas. Tu satisfacción es nuestra prioridad absoluta.
      </p>
    </div>
  );
};

// NEW: 13. Problem Agitation
export const ProblemAgitation = ({ title = "¿Cansado de probar productos que no funcionan?", bgClass = "bg-red-50", textClass = "text-red-900", pains, theme }: any) => {
  return (
    <div className={`my-12 p-8 rounded-3xl ${bgClass} border border-red-100`}>
      <h3 className={`font-black text-2xl md:text-3xl text-center uppercase mb-6 ${textClass} leading-tight`}>{title}</h3>
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <XCircle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
          <p className="text-red-800 font-medium">Gastas dinero en soluciones temporales que no atacan la raíz del problema.</p>
        </div>
        <div className="flex items-start space-x-3">
          <XCircle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
          <p className="text-red-800 font-medium">Sientes frustración al ver que nada cambia a pesar de tus esfuerzos.</p>
        </div>
        <div className="flex items-start space-x-3">
          <XCircle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
          <p className="text-red-800 font-medium">Pierdes tiempo valioso buscando una respuesta definitiva que parece no existir.</p>
        </div>
      </div>
      <p className="text-center mt-8 font-black text-lg text-red-900 uppercase tracking-wide">¡Es hora de decir basta!</p>
    </div>
  );
};

// NEW: 14. Solution Reveal
export const SolutionReveal = ({ productName = "Nuestro Producto", highlightColor = "text-indigo-600", description, theme }: any) => {
  return (
    <div className="my-16 text-center px-4">
      <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-3">La Solución Definitiva</p>
      <h2 className="font-black text-4xl md:text-5xl uppercase leading-none mb-6 text-gray-900">
        Conoce <span className={highlightColor}>{productName}</span>
      </h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
        Diseñado con tecnología de última generación para ofrecerte resultados reales, rápidos y duraderos. No es magia, es ciencia aplicada a tu bienestar.
      </p>
    </div>
  );
};

// NEW: 15. Before & After (Visual Proof)
export const BeforeAfter = ({ theme }: any) => {
  return (
    <div className="my-12">
      <h3 className="font-black text-2xl text-center uppercase mb-8 text-gray-900">Resultados Reales</h3>
      <div className="grid grid-cols-2 gap-2 md:gap-6">
        <div className="relative rounded-2xl overflow-hidden border-4 border-red-100">
          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-black px-3 py-1 rounded-full uppercase z-10 shadow-md">Antes</div>
          <div className="aspect-square bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400 font-bold">Imagen Antes</span>
          </div>
        </div>
        <div className="relative rounded-2xl overflow-hidden border-4 border-green-100">
          <div className="absolute top-2 left-2 bg-green-600 text-white text-xs font-black px-3 py-1 rounded-full uppercase z-10 shadow-md">Después</div>
          <div className="aspect-square bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400 font-bold">Imagen Después</span>
          </div>
        </div>
      </div>
      <p className="text-center text-sm text-gray-500 mt-4 italic">* Los resultados pueden variar según cada persona, pero la satisfacción está garantizada.</p>
    </div>
  );
};

// NEW: 16. Deep Dive Feature
export const DeepDiveFeature = ({ title = "Tecnología Avanzada", desc = "Nuestro sistema patentado asegura la máxima eficiencia.", align = "left", colorClass = "bg-blue-50", description, bullets, imageUrl, theme, reversed }: any) => {
  return (
    <div className={`my-12 flex flex-col ${align === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 p-6 rounded-3xl ${colorClass}`}>
      <div className="w-full md:w-1/2 aspect-square bg-white rounded-2xl shadow-sm flex items-center justify-center border border-gray-100 overflow-hidden">
         <span className="text-gray-300 font-bold">Imagen Detalle</span>
      </div>
      <div className="w-full md:w-1/2 space-y-4 text-center md:text-left">
        <div className="inline-block bg-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-sm border border-gray-100">Característica Clave</div>
        <h3 className="font-black text-3xl text-gray-900 leading-tight">{title}</h3>
        <p className="text-gray-600 text-lg leading-relaxed">{desc}</p>
        <ul className="space-y-2 text-left mt-4 inline-block">
          <li className="flex items-center space-x-2"><CheckCircle className="w-5 h-5 text-green-500" /><span className="font-medium text-gray-800">Beneficio directo 1</span></li>
          <li className="flex items-center space-x-2"><CheckCircle className="w-5 h-5 text-green-500" /><span className="font-medium text-gray-800">Beneficio directo 2</span></li>
        </ul>
      </div>
    </div>
  );
};

// NEW: 17. Social Proof Wall
export const SocialProofWall = ({ theme }: any) => {
  const reviews = [
    { name: "Laura M.", text: "Increíble. Cambió mi rutina por completo.", stars: 5 },
    { name: "Carlos T.", text: "Dudaba al principio, pero los resultados hablan por sí solos.", stars: 5 },
    { name: "Elena R.", text: "La mejor compra del año. Envío súper rápido.", stars: 5 },
    { name: "David S.", text: "Calidad premium, se nota desde el primer uso.", stars: 4 }
  ];
  return (
    <div className="my-16">
      <h3 className="font-black text-3xl text-center uppercase mb-2 text-gray-900">Lo que dicen nuestros clientes</h3>
      <div className="flex justify-center items-center space-x-1 mb-8">
        {[1,2,3,4,5].map(i => <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />)}
        <span className="ml-2 font-bold text-gray-700">4.9/5 (1,248 reseñas)</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reviews.map((r, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex space-x-1 mb-3">
              {[...Array(r.stars)].map((_, j) => <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
            </div>
            <p className="text-gray-700 italic mb-4">"{r.text}"</p>
            <p className="font-bold text-sm text-gray-900 flex items-center">
              {r.name} <CheckCircle className="w-4 h-4 text-green-500 ml-1" /> <span className="text-xs text-gray-400 font-normal ml-1">Comprador Verificado</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

// NEW: 18. Expert Endorsement
export const ExpertEndorsement = ({ expertName, expertTitle, quote, theme }: any) => {
  return (
    <div className="my-12 bg-gray-900 text-white p-8 md:p-12 rounded-3xl relative overflow-hidden">
      <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/4 -translate-y-1/4">
        <ShieldCheck className="w-64 h-64" />
      </div>
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
        <div className="w-24 h-24 rounded-full bg-gray-700 border-4 border-gray-600 shrink-0 flex items-center justify-center overflow-hidden">
          <Users className="w-10 h-10 text-gray-400" />
        </div>
        <div>
          <div className="flex space-x-1 mb-2">
            {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
          </div>
          <p className="text-xl md:text-2xl font-medium italic leading-relaxed mb-4">
            "Recomiendo este producto a todos mis clientes. La calidad de los materiales y la eficacia de su diseño lo convierten en la mejor opción del mercado actual."
          </p>
          <p className="font-black text-lg text-white uppercase tracking-wider">Dr. Especialista / Experto</p>
          <p className="text-gray-400 text-sm">Autoridad en el sector</p>
        </div>
      </div>
    </div>
  );
};

// NEW: 19. Shipping Info
export const ShippingInfo = ({ theme }: any) => {
  return (
    <div className="my-10 border-2 border-dashed border-gray-200 rounded-3xl p-6 bg-gray-50 text-center">
      <Truck className="w-12 h-12 text-gray-400 mx-auto mb-4" />
      <h3 className="font-black text-xl uppercase text-gray-900 mb-2">Envío Express Asegurado</h3>
      <p className="text-gray-600 max-w-md mx-auto">
        Todos nuestros pedidos se procesan en 24 horas. Recibirás un número de seguimiento para que sepas exactamente dónde está tu paquete en todo momento.
      </p>
    </div>
  );
};

// NEW: 20. Final CTA
export const FinalCTA = ({ productName = "Producto", price = "0", buttonColor = "bg-green-600", title, subtitle, theme }: any) => {
  return (
    <div className="my-16 text-center space-y-6">
      <h2 className="font-black text-4xl md:text-5xl uppercase leading-none text-gray-900">
        No dejes pasar esta <span className="text-red-600">oportunidad</span>
      </h2>
      <p className="text-xl text-gray-600 max-w-xl mx-auto">
        El stock es limitado y la oferta termina pronto. Asegura tu {productName} hoy mismo y paga solo al recibir.
      </p>
      <div className="inline-block bg-yellow-100 text-yellow-800 font-black px-6 py-2 rounded-full text-lg uppercase tracking-widest border border-yellow-200">
        Precio Hoy: ${price}
      </div>
      <div className="pt-4">
        <button 
          onClick={() => document.getElementById('checkout-form')?.scrollIntoView({ behavior: 'smooth' })}
          className={`w-full md:w-auto md:px-12 ${buttonColor} text-white font-black text-2xl py-5 rounded-2xl uppercase tracking-widest shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.3)] transition-all transform hover:-translate-y-1 flex items-center justify-center space-x-3 mx-auto`}
        >
          <ShoppingCart className="w-8 h-8" />
          <span>Pedir Ahora</span>
        </button>
        <p className="text-sm text-gray-500 mt-4 flex items-center justify-center space-x-1">
          <Clock className="w-4 h-4" />
          <span>Oferta válida por tiempo limitado</span>
        </p>
      </div>
    </div>
  );
};
