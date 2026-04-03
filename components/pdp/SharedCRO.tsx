'use client';
import React, { useState, useEffect } from 'react';
import { Product, StoreData } from '@/lib/types';
import { PowerCopy } from '@/lib/copy-engine';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ShieldCheck, Truck, Clock, CheckCircle, AlertTriangle, Users, ChevronDown, ChevronUp, ShoppingCart, XCircle, Zap, Shield, ArrowRight, Gift } from 'lucide-react';

// 1. Live Viewers (Social Pressure) - Premium & Animated
export const LiveViewers = ({ colorClass = 'text-rose-600', bgClass = 'bg-rose-50' }) => {
  const [viewers, setViewers] = useState(47);
  
  useEffect(() => {
    const interval = setInterval(() => {
      // Variación sutil para que parezca real
      setViewers(prev => Math.floor(Math.random() * (52 - 42 + 1) + 42));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`inline-flex items-center space-x-2.5 ${bgClass} ${colorClass} px-4 py-2 rounded-full text-sm font-bold shadow-sm border border-current/10`}
    >
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
      </span>
      <span>{viewers} compradores viendo ahora</span>
    </motion.div>
  );
};

// 2. Scarcity Warning (Dynamic Stock Bar)
export const ScarcityWarning = ({ colorClass = 'bg-rose-600', textClass = 'text-rose-600' }) => {
  return (
    <div className="space-y-3 my-6 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
      <div className={`flex justify-between items-center text-sm font-black uppercase tracking-tight ${textClass}`}>
        <span className="flex items-center gap-1.5">
          <Zap className="w-4 h-4 fill-current" /> 
          ¡OFERTA CASI AGOTADA!
        </span>
        <motion.span 
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="bg-rose-100 px-2 py-0.5 rounded text-[10px]"
        >
          QUEDAN 7 UNIDADES
        </motion.span>
      </div>
      <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
        <motion.div 
          initial={{ width: "100%" }}
          animate={{ width: "12%" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className={`h-full ${colorClass} rounded-full shadow-[0_0_8px_rgba(225,29,72,0.4)]`}
        ></motion.div>
      </div>
      <p className="text-[11px] text-slate-700 flex items-center justify-center gap-1 font-bold">
        <Clock className="w-3 h-3" /> Actualizado hace unos segundos
      </p>
    </div>
  );
};

// 3. Trust Bar (Iconos Premium con SVGs integrados)
export const TrustBar = () => {
  const items = [
    {
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 10L9 14L19 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M1 12C1 18.0751 5.92487 23 12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="1 4"/>
        </svg>
      ),
      title: "ENVÍO GRATIS",
      desc: "Todo el país",
      color: "text-emerald-600",
      bg: "bg-emerald-50"
    },
    {
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "PAGO SEGURO",
      desc: "Contra entrega",
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M19.4 15L22 12L19.4 9L20 5L16 4L14 1L11 2.5L8 1L6 4L2 5L2.6 9L0 12L2.6 15L2 19L6 20L8 23L11 21.5L14 23L16 20L20 19L19.4 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "GARANTÍA",
      desc: "30 días",
      color: "text-amber-600",
      bg: "bg-amber-50"
    }
  ];

  return (
    <div className="grid grid-cols-3 gap-3 py-6 my-6 border-y border-slate-100">
      {items.map((item, idx) => (
        <motion.div 
          key={idx} 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.1 }}
          className="flex flex-col items-center text-center group cursor-default"
        >
          <motion.div 
            whileHover={{ y: -5, rotate: 5 }}
            className={`${item.bg} ${item.color} p-3 rounded-2xl mb-3 shadow-sm transition-shadow group-hover:shadow-md border border-white`}
          >
            {item.icon}
          </motion.div>
          <span className="text-[10px] md:text-[11px] font-black uppercase tracking-tighter leading-tight text-slate-900">{item.title}</span>
          <span className="text-[9px] text-slate-700 font-bold uppercase mt-0.5">{item.desc}</span>
        </motion.div>
      ))}
    </div>
  );
};

// 4. Bundle Offer (AOV Maximizer) - Premium Design
export const BundleOffer = ({ price, colorClass = 'border-rose-500', bgClass = 'bg-rose-50', textClass = 'text-rose-600', theme }: any) => {
  const [selected, setSelected] = useState(2);
  const numPrice = typeof price === 'string' ? parseInt(String(price).replace(/\D/g, '')) || 0 : Number(price) || 0;
  const fmtGs = (n: number) => {
    const str = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `Gs. ${str}`;
  };
  
  const offers = [
    { id: 1, title: '1 UNIDAD', subtitle: 'Para probar', price: numPrice, tag: '', discount: '' },
    { id: 2, title: '2 UNIDADES', subtitle: 'Envío Prioritario', price: Math.round(numPrice * 1.8), tag: 'MÁS VENDIDO', discount: '-10%' },
    { id: 3, title: '3 UNIDADES', subtitle: 'Lleva 3, Paga 2', price: numPrice * 2, tag: 'MEJOR OFERTA', discount: '-33%' },
  ];

  return (
    <div className="space-y-4 my-8">
      <div className="flex items-center justify-center space-x-2">
        <Gift className="w-5 h-5 text-rose-500" />
        <h3 className="font-black text-xl text-center uppercase tracking-tight text-slate-900">Selecciona tu Oferta</h3>
      </div>
      <div className="grid gap-3">
        {offers.map((offer) => (
          <motion.div 
            key={offer.id}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelected(offer.id)}
            className={`relative p-5 rounded-2xl border-2 cursor-pointer transition-all ${selected === offer.id ? `${colorClass} ${bgClass} shadow-md` : 'border-slate-100 bg-white hover:border-slate-200'}`}
          >
            {offer.tag && (
              <span className="absolute -top-3 right-4 bg-slate-900 text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                {offer.tag}
              </span>
            )}
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${selected === offer.id ? colorClass : 'border-slate-200'}`}>
                  {selected === offer.id && <motion.div layoutId="selectionCircle" className={`w-3 h-3 rounded-full ${colorClass.replace('border-', 'bg-')}`}></motion.div>}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-slate-900 leading-none">{offer.title}</span>
                    {offer.discount && <span className="text-[10px] font-black bg-rose-600 text-white px-1.5 py-0.5 rounded">{offer.discount}</span>}
                  </div>
                  <div className="text-xs text-slate-700 font-bold mt-1">{offer.subtitle}</div>
                </div>
              </div>
              <div className="text-right">
                <div className={`font-black text-xl ${textClass}`}>{fmtGs(offer.price)}</div>
                {offer.id > 1 && <div className="text-xs text-slate-300 line-through font-bold">{fmtGs(numPrice * offer.id)}</div>}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// 5. Inline COD Form (High-Conversion Frictionless Checkout)
export const InlineCODForm = ({ buttonColor = 'bg-slate-900 hover:bg-black', secondaryColor = 'rose' }) => {
  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-100 my-8 shadow-xl relative overflow-hidden" id="checkout-form">
      <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -mr-16 -mt-16 -z-0"></div>
      
      <div className="text-center mb-8 relative z-10">
        <h3 className="font-black text-3xl text-slate-900 uppercase leading-none">Finaliza tu Compra</h3>
        <p className="text-[13px] text-slate-700 mt-2 font-black">Completa tus datos y paga en efectivo al recibir.</p>
      </div>

      <form className="space-y-5 relative z-10" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-1.5">
          <label className="block text-[11px] font-black text-slate-700 uppercase tracking-widest ml-1">Nombre Completo</label>
          <div className="relative group">
            <input 
              type="text" 
              className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 outline-none transition-all font-bold text-slate-900 placeholder:text-slate-300" 
              placeholder="Juan Pérez" 
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-[11px] font-black text-slate-700 uppercase tracking-widest ml-1">WhatsApp (Celular)</label>
          <input 
            type="tel" 
            className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 outline-none transition-all font-bold text-slate-900 placeholder:text-slate-300" 
            placeholder="Ej: 0987123456" 
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-[11px] font-black text-slate-700 uppercase tracking-widest ml-1">Dirección de Entrega</label>
          <textarea 
            rows={2} 
            className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-slate-900/5 focus:border-slate-900 outline-none transition-all font-bold text-slate-900 placeholder:text-slate-300 resize-none" 
            placeholder="Calle, número, ciudad y referencias..."
          ></textarea>
        </div>

        <motion.button 
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full ${buttonColor} text-white font-black text-xl py-5 rounded-2xl uppercase tracking-widest shadow-2xl flex items-center justify-center space-x-3 transition-all`}
        >
          <ShoppingCart className="w-6 h-4" />
          <span>¡PEDIR Y PAGAR EN CASA!</span>
          <ArrowRight className="w-5 h-5 animate-pulse" />
        </motion.button>

        <div className="flex items-center justify-center space-x-6 pt-4 grayscale opacity-50">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="text-[10px] font-black text-slate-900 uppercase tracking-tight">CIFRADO SSL</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Truck className="w-4 h-4 text-blue-600" />
            <span className="text-[10px] font-black text-slate-900 uppercase tracking-tight">ENTREGA SEGURA</span>
          </div>
        </div>
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
    let currentIndex = 0;
    const showPopup = () => {
      setCurrent({
        name: names[currentIndex % names.length],
        city: cities[currentIndex % cities.length],
        time: '5 min'
      });
      currentIndex++;
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
        <p className="text-xs text-gray-900 font-bold">Compró este producto hace {current.time}</p>
      </div>
    </div>
  );
};

// 8. FAQ Section - Premium Accordion
export const FAQSection = ({ copy }: { copy?: PowerCopy }) => {
  const defaultFaqs = [
    { q: '¿Cuándo pagaré mi pedido?', a: 'Pagas ÚNICAMENTE cuando recibes el producto en tus manos. Cero riesgos, 100% confianza.' },
    { q: '¿Cuánto tarda el envío?', a: 'Procesamos tu orden de inmediato. El tiempo estimado de entrega es de 24 a 48 horas laborables.' }
  ];
  
  const faqs = copy?.faq || defaultFaqs;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="my-16 max-w-3xl mx-auto px-4">
      <div className="text-center mb-10">
        <h3 className="font-black text-3xl text-slate-900 uppercase tracking-tighter">Preguntas Frecuentes</h3>
        <p className="text-slate-700 font-bold mt-2">Resolvemos todas tus dudas en segundos.</p>
      </div>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <motion.div 
            key={i} 
            initial={false}
            className={`rounded-3xl border transition-all overflow-hidden ${open === i ? 'border-slate-900 bg-white shadow-xl' : 'border-slate-100 bg-slate-50/50 hover:bg-white'}`}
          >
            <button 
              className="w-full flex justify-between items-center p-6 font-black text-left text-slate-900 outline-none"
              onClick={() => setOpen(open === i ? null : i)}
            >
              <span className="text-lg leading-tight pr-4">{faq.q}</span>
              <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-transform ${open === i ? 'bg-slate-900 text-white rotate-180' : 'bg-slate-200 text-slate-500'}`}>
                <ChevronDown className="w-5 h-5" />
              </div>
            </button>
            <AnimatePresence>
              {open === i && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                >
                  <div className="px-6 pb-8 text-zinc-800 font-bold leading-relaxed">
                    {faq.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// 9. Comparison Table - Elite Visual Style
export const ComparisonTable = ({ productName = "Nuestro Producto", copy }: { productName?: string, copy?: PowerCopy }) => {
  const defaultRows = [
    { label: 'Calidad de Materiales', us: true, others: false },
    { label: 'Envío Gratis en 48h', us: true, others: false },
    { label: 'Garantía de 30 días', us: true, others: false },
    { label: 'Pago Contra Entrega', us: true, others: true },
    { label: 'Soporte 24/7 WhatsApp', us: true, others: false }
  ];

  const rows = copy ? [
    ...copy.comparison.us.map(item => ({ label: item, us: true, others: false })),
    { label: 'Pago Contra Entrega', us: true, others: true }
  ] : defaultRows;

  return (
    <div className="my-20 px-4">
      <div className="text-center mb-12">
        <h3 className="font-black text-4xl text-slate-900 uppercase tracking-tighter mb-4">Compara y Decide</h3>
        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">¿Por qué somos la mejor opción?</p>
      </div>
      
      <div className="max-w-4xl mx-auto bg-white rounded-[2.5rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] overflow-hidden border border-slate-100">
        <div className="grid grid-cols-3">
          <div className="p-8 border-b border-slate-50 flex items-end">
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Características</span>
          </div>
          <div className="p-8 border-b border-slate-50 bg-slate-900 text-center">
             <span className="block text-[10px] font-black text-rose-500 uppercase tracking-widest mb-2">NUESTRA MARCA</span>
             <span className="block text-lg font-black text-white leading-none">{productName}</span>
          </div>
          <div className="p-8 border-b border-slate-50 bg-slate-50 text-center flex flex-col justify-end">
             <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">OTRAS TIENDAS</span>
          </div>

          {rows.map((row, i) => (
            <React.Fragment key={i}>
              <div className="p-6 border-b border-slate-50 flex items-center font-bold text-slate-600 text-sm md:text-base px-8">
                {row.label}
              </div>
              <div className="p-6 border-b border-slate-50 bg-slate-900/5 flex justify-center items-center">
                {row.us ? (
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-emerald-600" />
                  </div>
                ) : (
                  <XCircle className="w-6 h-6 text-slate-200" />
                )}
              </div>
              <div className="p-6 border-b border-slate-50 flex justify-center items-center">
                {row.others ? (
                  <CheckCircle className="w-6 h-6 text-slate-300" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center">
                    <XCircle className="w-6 h-6 text-rose-400" />
                  </div>
                )}
              </div>
            </React.Fragment>
          ))}
        </div>
        
        <div className="bg-slate-50 p-6 text-center">
           <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Resultados basados en auditorías de mercado 2024</p>
        </div>
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
          <p className="text-sm text-gray-900 font-bold">Rellena el formulario en menos de 1 minuto sin usar tarjeta.</p>
        </div>
        <div className="text-center space-y-3">
          <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center text-2xl font-black text-gray-900 border-4 border-white shadow-lg">2</div>
          <h4 className="font-bold text-lg">Lo enviamos</h4>
          <p className="text-sm text-gray-900 font-bold">Preparamos tu paquete y te lo enviamos en 24/48 horas.</p>
        </div>
        <div className="text-center space-y-3">
          <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center text-2xl font-black text-green-600 border-4 border-white shadow-lg">3</div>
          <h4 className="font-bold text-lg">Pagas al recibir</h4>
          <p className="text-sm text-gray-900 font-bold">Pagas en efectivo directamente al repartidor. 100% seguro.</p>
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
        <p className="text-xs text-gray-900 font-bold">Notarás la diferencia desde el primer día de uso.</p>
      </div>
      <div className="p-4 rounded-2xl border border-gray-100 bg-white shadow-sm flex flex-col items-center text-center space-y-2">
        <div className={`p-3 rounded-full ${bgClass} ${iconColor}`}><Shield className="w-6 h-6" /></div>
        <h4 className="font-bold text-sm">Materiales Premium</h4>
        <p className="text-xs text-gray-900 font-bold">Fabricado con los más altos estándares de calidad.</p>
      </div>
      <div className="p-4 rounded-2xl border border-gray-100 bg-white shadow-sm flex flex-col items-center text-center space-y-2">
        <div className={`p-3 rounded-full ${bgClass} ${iconColor}`}><Star className="w-6 h-6" /></div>
        <h4 className="font-bold text-sm">Diseño Exclusivo</h4>
        <p className="text-xs text-gray-900 font-bold">Un producto único que no encontrarás en tiendas físicas.</p>
      </div>
      <div className="p-4 rounded-2xl border border-gray-100 bg-white shadow-sm flex flex-col items-center text-center space-y-2">
        <div className={`p-3 rounded-full ${bgClass} ${iconColor}`}><CheckCircle className="w-6 h-6" /></div>
        <h4 className="font-bold text-sm">Fácil de Usar</h4>
        <p className="text-xs text-gray-900 font-bold">Diseñado para ser intuitivo y práctico para todos.</p>
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
      <h3 className="font-black text-2xl uppercase mb-2 text-yellow-400">Garantía de Satisfacción Total</h3>
      <p className="text-sm text-gray-300 leading-relaxed">
        Cada producto pasa por un riguroso control de calidad antes de ser enviado. Nos comprometemos con tu satisfacción y la excelencia en cada detalle. Compra con total confianza.
      </p>
    </div>
  );
};

// 13. Problem Agitation - Visceral Storytelling
export const ProblemAgitation = ({ product, copy }: { product: Product, copy?: PowerCopy }) => {
  if (!product) return null;
  
  return (
    <div className="my-24 px-4 overflow-hidden">
      <div className="max-w-4xl mx-auto bg-rose-50 rounded-[3rem] p-10 md:p-20 relative border border-rose-100 shadow-inner">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/50 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <h3 className="font-black text-3xl md:text-5xl text-rose-950 uppercase leading-[0.9] tracking-tighter mb-10">
            {copy?.storytelling.hook || `¿Cansado de perder dinero en soluciones que fallan?`}
          </h3>
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-start gap-6 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shrink-0 shadow-sm group-hover:bg-rose-100 transition-colors">
                 <XCircle className="w-6 h-6 text-rose-500" />
              </div>
              <div>
                <p className="font-black text-rose-900 uppercase text-sm tracking-widest mb-1">Punto de Dolor</p>
                <p className="text-rose-950 font-black">{copy?.storytelling.painPoint || `Has buscado una solución real para ${product?.title || 'este producto'}, pero todas las opciones baratas que has probado terminan en el cubo de la basura.`}</p>
              </div>
            </motion.div>
          </div>
          
          <div className="mt-16 pt-10 border-t border-rose-200 text-center">
             <p className="text-rose-950 font-black text-2xl uppercase tracking-tighter italic whitespace-nowrap overflow-hidden">¡Basta de conformarse con menos!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// NEW: 14. Solution Reveal
export const SolutionReveal = ({ productName = "Nuestro Producto", highlightColor = "text-indigo-600", description, theme, product }: any) => {
  const name = product?.title || productName;
  const desc = description || product?.description || 'Diseñado con tecnología de última generación para ofrecerte resultados reales, rápidos y duraderos.';
  return (
    <div className="my-16 text-center px-4">
      <p className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-3">La Solución Definitiva</p>
      <h2 className="font-black text-4xl md:text-5xl uppercase leading-none mb-6 text-gray-900">
        Conoce <span className={highlightColor}>{name}</span>
      </h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
        {desc}
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
          <div className="aspect-square bg-gradient-to-br from-red-50 to-red-100 flex flex-col items-center justify-center p-6 text-center">
            <svg className="w-16 h-16 text-red-300 mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M8 15s1.5-2 4-2 4 2 4 2"/><circle cx="9" cy="9" r="1" fill="currentColor"/><circle cx="15" cy="9" r="1" fill="currentColor"/></svg>
            <span className="text-red-400 font-black text-sm uppercase tracking-widest">Sin el producto</span>
            <span className="text-red-300 text-xs font-bold mt-1">Problemas persistentes</span>
          </div>
        </div>
        <div className="relative rounded-2xl overflow-hidden border-4 border-green-100">
          <div className="absolute top-2 left-2 bg-green-600 text-white text-xs font-black px-3 py-1 rounded-full uppercase z-10 shadow-md">Después</div>
          <div className="aspect-square bg-gradient-to-br from-green-50 to-emerald-100 flex flex-col items-center justify-center p-6 text-center">
            <svg className="w-16 h-16 text-emerald-400 mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><circle cx="9" cy="9" r="1" fill="currentColor"/><circle cx="15" cy="9" r="1" fill="currentColor"/></svg>
            <span className="text-emerald-600 font-black text-sm uppercase tracking-widest">Con el producto</span>
            <span className="text-emerald-400 text-xs font-bold mt-1">Resultados visibles</span>
          </div>
        </div>
      </div>
      <p className="text-center text-sm text-gray-900 font-bold mt-4 italic">* Los resultados pueden variar según cada persona, pero la satisfacción está garantizada.</p>
    </div>
  );
};

// NEW: 16. Deep Dive Feature
export const DeepDiveFeature = ({ title = "Tecnología Avanzada", desc = "Nuestro sistema patentado asegura la máxima eficiencia.", align = "left", colorClass = "bg-blue-50", description, bullets, imageUrl, theme, reversed }: any) => {
  return (
    <div className={`my-12 flex flex-col ${align === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 p-6 rounded-3xl ${colorClass}`}>
      <div className="w-full md:w-1/2 aspect-square bg-white rounded-2xl shadow-sm flex flex-col items-center justify-center border border-gray-100 overflow-hidden p-8">
         <svg className="w-20 h-20 text-blue-200 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><rect x="2" y="2" width="20" height="20" rx="4"/><circle cx="12" cy="10" r="3"/><path d="M6 20c0-3.31 2.69-6 6-6s6 2.69 6 6"/></svg>
         <span className="text-gray-400 font-black text-xs uppercase tracking-widest">Detalle del Producto</span>
         <span className="text-gray-300 text-[10px] font-bold mt-1">Imagen proporcionada por el vendedor</span>
      </div>
      <div className="w-full md:w-1/2 space-y-4 text-center md:text-left">
        <div className="inline-block bg-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-sm border border-gray-100">Característica Clave</div>
        <h3 className="font-black text-3xl text-gray-900 leading-tight">{title}</h3>
        <p className="text-gray-600 text-lg leading-relaxed">{desc}</p>
        <ul className="space-y-2 text-left mt-4 inline-block">
          <li className="flex items-center space-x-2"><CheckCircle className="w-5 h-5 text-green-500" /><span className="font-medium text-gray-800">Materiales de primera calidad</span></li>
          <li className="flex items-center space-x-2"><CheckCircle className="w-5 h-5 text-green-500" /><span className="font-medium text-gray-800">Diseño ergonómico y funcional</span></li>
        </ul>
      </div>
    </div>
  );
};

// NEW: 17. Social Proof Wall
export const SocialProofWall = ({ theme, testimonials }: any) => {
  const defaultReviews = [
    { name: "Laura M.", text: "Increíble. Cambió mi rutina por completo.", stars: 5 },
    { name: "Carlos T.", text: "Dudaba al principio, pero los resultados hablan por sí solos.", stars: 5 },
    { name: "Elena R.", text: "La mejor compra del año. Envío súper rápido.", stars: 5 },
    { name: "David S.", text: "Calidad premium, se nota desde el primer uso.", stars: 4 }
  ];
  const reviews = (testimonials && testimonials.length > 0) ? testimonials : defaultReviews;
  return (
    <div className="my-16">
      <h3 className="font-black text-3xl text-center uppercase mb-2 text-gray-900">Lo que dicen nuestros clientes</h3>
      <div className="flex justify-center items-center space-x-1 mb-8">
        {[1,2,3,4,5].map(i => <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />)}
        <span className="ml-2 font-bold text-gray-700">4.9/5 (1,248 reseñas)</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reviews.map((r: any, i: number) => (
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
// 21. Storyteller Intro (Intelligence based on product)
export const StorytellerIntro = ({ product, copy }: { product: Product, copy?: PowerCopy }) => {
  if (!product) return null;
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="my-16 px-6 py-12 bg-slate-900 text-white rounded-[3rem] text-center overflow-hidden relative"
    >
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 0 L100 100 M100 0 L0 100" stroke="white" strokeWidth="0.1" />
        </svg>
      </div>
      
      <motion.span 
        initial={{ y: 20 }}
        whileInView={{ y: 0 }}
        className="inline-block px-4 py-1.5 rounded-full bg-rose-600 text-[10px] font-black uppercase tracking-[0.2em] mb-6"
      >
        Revelación Exclusiva
      </motion.span>
      
      <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-8 leading-[0.9]">
        La mayoría de los <span className="text-zinc-500 line-through">productos comunes</span> fallan. <br/>
        <span className="text-rose-500">{product?.title || 'Nuestro producto'}</span> es diferente.
      </h2>
      
      <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed font-medium italic">
        "{copy?.storytelling.reveal || `No diseñamos ${product?.title || 'nuestros productos'} para ser uno más. Lo diseñamos para ser el último que necesites comprar.`}"
      </p>
      
      <div className="mt-10 flex justify-center items-center space-x-12 opacity-50 grayscale scale-75 md:scale-100">
        <div className="font-black text-2xl tracking-tighter">PREMIUM QUALITY</div>
        <div className="font-black text-2xl tracking-tighter">ISO CERTIFIED</div>
        <div className="font-black text-2xl tracking-tighter">LAB TESTED</div>
      </div>
    </motion.div>
  );
};

// 22. Enhanced Authority Badge
export const AuthorityBadge = ({ copy }: { copy?: PowerCopy }) => {
  return (
    <div className="flex items-center space-x-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-8 w-fit mx-auto md:mx-0 shadow-sm hover:shadow-md transition-shadow">
      <div className="relative">
        <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center text-white">
          <Shield className="w-6 h-6" />
        </div>
        <div className="absolute -bottom-1 -right-1 bg-emerald-500 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center">
          <CheckCircle className="w-3.5 h-3.5 text-white" />
        </div>
      </div>
      <div>
        <div className="flex gap-0.5 mb-1">
          {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />)}
        </div>
        <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest leading-none">{copy?.authority.badgeText || 'Producto Recomendado'}</p>
        <p className="text-[9px] text-slate-400 font-bold uppercase mt-1">{copy?.authority.certification || 'Calidad Garantizada A+'}</p>
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
        Precio Hoy: {String(price).includes('Gs') ? price : `Gs. ${price}`}
      </div>
      <div className="pt-4">
        <button 
          onClick={() => document.getElementById('checkout-form')?.scrollIntoView({ behavior: 'smooth' })}
          className={`w-full md:w-auto md:px-12 ${buttonColor} text-white font-black text-2xl py-5 rounded-2xl uppercase tracking-widest shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.3)] transition-all transform hover:-translate-y-1 flex items-center justify-center space-x-3 mx-auto`}
        >
          <ShoppingCart className="w-8 h-8" />
          <span>Pedir Ahora</span>
        </button>
        <p className="text-sm text-gray-900 font-bold mt-4 flex items-center justify-center space-x-1">
          <Clock className="w-4 h-4" />
          <span>Oferta válida por tiempo limitado</span>
        </p>
      </div>
    </div>
  );
};
