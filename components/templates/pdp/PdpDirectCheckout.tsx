'use client';
import React from 'react';
import Image from 'next/image';
import { StoreData, Product } from '@/lib/types';
import { ShieldCheck, Truck, CheckCircle, ArrowRight, Zap, ShoppingCart, Star } from 'lucide-react';
import { TrustBar, InlineCODForm, ScarcityWarning, FeatureGrid, GuaranteeBadge, ComparisonTable, HowItWorks } from './SharedCRO';

interface PDPProps {
  data: StoreData;
  product: Product;
  variant?: number;
}

export default function PdpDirectCheckout({ data, product, variant = 1 }: PDPProps) {
  // Dynamic styling based on variant (1-10)
  const getTheme = () => {
    switch(variant) {
      case 1: return { primary: 'bg-zinc-900', text: 'text-zinc-900', bgLight: 'bg-zinc-100', border: 'border-zinc-200', hover: 'hover:bg-black', accent: 'text-green-600', accentBg: 'bg-green-50', accentBorder: 'border-green-100' };
      case 2: return { primary: 'bg-blue-600', text: 'text-blue-600', bgLight: 'bg-blue-50', border: 'border-blue-200', hover: 'hover:bg-blue-700', accent: 'text-amber-500', accentBg: 'bg-amber-50', accentBorder: 'border-amber-100' };
      case 3: return { primary: 'bg-emerald-600', text: 'text-emerald-600', bgLight: 'bg-emerald-50', border: 'border-emerald-200', hover: 'hover:bg-emerald-700', accent: 'text-emerald-600', accentBg: 'bg-emerald-50', accentBorder: 'border-emerald-100' };
      case 4: return { primary: 'bg-rose-600', text: 'text-rose-600', bgLight: 'bg-rose-50', border: 'border-rose-200', hover: 'hover:bg-rose-700', accent: 'text-rose-600', accentBg: 'bg-rose-50', accentBorder: 'border-rose-100' };
      case 5: return { primary: 'bg-purple-600', text: 'text-purple-600', bgLight: 'bg-purple-50', border: 'border-purple-200', hover: 'hover:bg-purple-700', accent: 'text-purple-600', accentBg: 'bg-purple-50', accentBorder: 'border-purple-100' };
      case 6: return { primary: 'bg-slate-800', text: 'text-slate-800', bgLight: 'bg-slate-100', border: 'border-slate-300', hover: 'hover:bg-slate-900', accent: 'text-blue-500', accentBg: 'bg-blue-50', accentBorder: 'border-blue-100' };
      case 7: return { primary: 'bg-orange-500', text: 'text-orange-600', bgLight: 'bg-orange-50', border: 'border-orange-200', hover: 'hover:bg-orange-600', accent: 'text-orange-600', accentBg: 'bg-orange-50', accentBorder: 'border-orange-100' };
      case 8: return { primary: 'bg-cyan-600', text: 'text-cyan-600', bgLight: 'bg-cyan-50', border: 'border-cyan-200', hover: 'hover:bg-cyan-700', accent: 'text-cyan-600', accentBg: 'bg-cyan-50', accentBorder: 'border-cyan-100' };
      case 9: return { primary: 'bg-stone-800', text: 'text-stone-800', bgLight: 'bg-stone-100', border: 'border-stone-300', hover: 'hover:bg-stone-900', accent: 'text-stone-600', accentBg: 'bg-stone-50', accentBorder: 'border-stone-100' };
      case 10: return { primary: 'bg-indigo-600', text: 'text-indigo-600', bgLight: 'bg-indigo-50', border: 'border-indigo-200', hover: 'hover:bg-indigo-700', accent: 'text-indigo-600', accentBg: 'bg-indigo-50', accentBorder: 'border-indigo-100' };
      case 11: return { primary: 'bg-teal-600', text: 'text-teal-600', bgLight: 'bg-teal-50', border: 'border-teal-200', hover: 'hover:bg-teal-700', accent: 'text-teal-600', accentBg: 'bg-teal-50', accentBorder: 'border-teal-100' };
      case 12: return { primary: 'bg-fuchsia-600', text: 'text-fuchsia-600', bgLight: 'bg-fuchsia-50', border: 'border-fuchsia-200', hover: 'hover:bg-fuchsia-700', accent: 'text-fuchsia-600', accentBg: 'bg-fuchsia-50', accentBorder: 'border-fuchsia-100' };
      case 13: return { primary: 'bg-sky-600', text: 'text-sky-600', bgLight: 'bg-sky-50', border: 'border-sky-200', hover: 'hover:bg-sky-700', accent: 'text-sky-600', accentBg: 'bg-sky-50', accentBorder: 'border-sky-100' };
      case 14: return { primary: 'bg-rose-500', text: 'text-rose-500', bgLight: 'bg-rose-50', border: 'border-rose-200', hover: 'hover:bg-rose-600', accent: 'text-rose-500', accentBg: 'bg-rose-50', accentBorder: 'border-rose-100' };
      case 15: return { primary: 'bg-amber-500', text: 'text-amber-600', bgLight: 'bg-amber-50', border: 'border-amber-200', hover: 'hover:bg-amber-600', accent: 'text-amber-600', accentBg: 'bg-amber-50', accentBorder: 'border-amber-100' };
      case 16: return { primary: 'bg-lime-500', text: 'text-lime-600', bgLight: 'bg-lime-50', border: 'border-lime-200', hover: 'hover:bg-lime-600', accent: 'text-lime-600', accentBg: 'bg-lime-50', accentBorder: 'border-lime-100' };
      case 17: return { primary: 'bg-violet-600', text: 'text-violet-600', bgLight: 'bg-violet-50', border: 'border-violet-200', hover: 'hover:bg-violet-700', accent: 'text-violet-600', accentBg: 'bg-violet-50', accentBorder: 'border-violet-100' };
      case 18: return { primary: 'bg-emerald-700', text: 'text-emerald-700', bgLight: 'bg-emerald-100', border: 'border-emerald-300', hover: 'hover:bg-emerald-800', accent: 'text-emerald-700', accentBg: 'bg-emerald-100', accentBorder: 'border-emerald-300' };
      case 19: return { primary: 'bg-orange-600', text: 'text-orange-600', bgLight: 'bg-orange-100', border: 'border-orange-300', hover: 'hover:bg-orange-700', accent: 'text-orange-600', accentBg: 'bg-orange-100', accentBorder: 'border-orange-300' };
      case 20: return { primary: 'bg-zinc-800', text: 'text-zinc-800', bgLight: 'bg-zinc-200', border: 'border-zinc-400', hover: 'hover:bg-zinc-900', accent: 'text-zinc-800', accentBg: 'bg-zinc-200', accentBorder: 'border-zinc-400' };
      default: return { primary: 'bg-zinc-900', text: 'text-zinc-900', bgLight: 'bg-zinc-100', border: 'border-zinc-200', hover: 'hover:bg-black', accent: 'text-green-600', accentBg: 'bg-green-50', accentBorder: 'border-green-100' };
    }
  };

  // Dynamic layout structure based on variant (1-10)
  const getLayout = () => {
    switch(variant) {
      case 1: return { main: 'max-w-5xl mx-auto px-4 py-8 lg:py-12', grid: 'lg:grid lg:grid-cols-2 border rounded-[2rem] shadow-2xl overflow-hidden', media: 'p-6 lg:p-10 border-r flex flex-col justify-between', form: 'p-6 lg:p-10 flex flex-col justify-center relative', imageStyle: 'aspect-[4/3] rounded-2xl', reviewsTop: false };
      case 2: return { main: 'max-w-4xl mx-auto px-4 py-8 lg:py-16', grid: 'flex flex-col gap-8', media: 'w-full text-center', form: 'bg-white p-8 rounded-3xl shadow-xl border', imageStyle: 'aspect-video rounded-3xl', reviewsTop: true };
      case 3: return { main: 'max-w-6xl mx-auto px-4 py-8 lg:py-12', grid: 'lg:grid lg:grid-cols-12 gap-12', media: 'lg:col-span-7', form: 'lg:col-span-5 lg:sticky lg:top-24 h-fit bg-white p-8 rounded-2xl shadow-lg border', imageStyle: 'aspect-square rounded-xl', reviewsTop: false };
      case 4: return { main: 'max-w-5xl mx-auto px-4 py-8 lg:py-12', grid: 'flex flex-col lg:flex-row-reverse gap-8', media: 'lg:w-1/2', form: 'lg:w-1/2 bg-white p-8 rounded-3xl shadow-md border', imageStyle: 'aspect-[4/3] rounded-2xl', reviewsTop: false };
      case 5: return { main: 'max-w-5xl mx-auto px-4 py-8 lg:py-12', grid: 'lg:grid lg:grid-cols-2 gap-0 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white', media: 'p-8 border-b-4 lg:border-b-0 lg:border-r-4 border-black bg-purple-50', form: 'p-8', imageStyle: 'aspect-square border-4 border-black', reviewsTop: true };
      case 6: return { main: 'max-w-3xl mx-auto px-4 py-8 lg:py-10', grid: 'flex flex-col gap-6', media: 'w-full', form: 'bg-zinc-950 p-6 rounded-2xl shadow-md border border-zinc-800', imageStyle: 'aspect-video rounded-xl', reviewsTop: false };
      case 7: return { main: 'max-w-7xl mx-auto px-4 py-8 lg:py-12', grid: 'lg:grid lg:grid-cols-2 gap-16 items-center', media: 'order-last lg:order-first', form: 'bg-white p-10 rounded-[2rem] shadow-2xl border', imageStyle: 'aspect-[3/4] rounded-3xl', reviewsTop: false };
      case 8: return { main: 'max-w-5xl mx-auto px-4 py-8 lg:py-12', grid: 'lg:grid lg:grid-cols-2 gap-8 bg-cyan-900 text-white p-8 rounded-[2rem] shadow-xl', media: 'flex flex-col justify-center', form: 'bg-white text-zinc-900 p-8 rounded-2xl', imageStyle: 'aspect-square rounded-2xl', reviewsTop: true };
      case 9: return { main: 'w-full max-w-none px-0', grid: 'lg:flex min-h-[80vh]', media: 'lg:w-1/2 bg-zinc-900 flex flex-col justify-center p-8 lg:p-16 text-white', form: 'lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center bg-zinc-950 text-white', imageStyle: 'aspect-video rounded-none', reviewsTop: false };
      case 10: return { main: 'max-w-4xl mx-auto px-4 py-8 lg:py-12', grid: 'flex flex-col gap-12', media: 'flex flex-col md:flex-row gap-8 items-center', form: 'bg-white p-8 rounded-3xl shadow-lg border-2 border-indigo-100', imageStyle: 'w-full md:w-1/2 aspect-square rounded-full shadow-2xl', reviewsTop: true };
      case 11: return { main: 'max-w-7xl mx-auto px-4 py-8 lg:py-16', grid: 'lg:grid lg:grid-cols-12 gap-16', media: 'lg:col-span-6 lg:sticky lg:top-24 h-fit', form: 'lg:col-span-6 bg-white p-10 rounded-[3rem] shadow-2xl border border-teal-100', imageStyle: 'aspect-[4/5] rounded-2xl', reviewsTop: false };
      case 12: return { main: 'max-w-5xl mx-auto px-4 py-8 lg:py-16', grid: 'flex flex-col gap-12', media: 'w-full max-w-3xl mx-auto', form: 'bg-fuchsia-50/50 p-8 lg:p-12 rounded-3xl border border-fuchsia-100', imageStyle: 'aspect-video rounded-3xl', reviewsTop: true };
      case 13: return { main: 'max-w-6xl mx-auto px-4 py-8 lg:py-12', grid: 'lg:grid lg:grid-cols-12 gap-0 bg-white rounded-2xl shadow-xl border overflow-hidden', media: 'lg:col-span-6 p-8 bg-sky-50', form: 'lg:col-span-6 p-8 lg:p-12 flex flex-col justify-center', imageStyle: 'aspect-square rounded-xl', reviewsTop: false };
      case 14: return { main: 'max-w-4xl mx-auto px-4 py-8 lg:py-10', grid: 'flex flex-col gap-8', media: 'w-full', form: 'bg-white p-6 lg:p-10 rounded-2xl shadow-lg border-t-8 border-rose-500', imageStyle: 'aspect-[4/3] rounded-2xl', reviewsTop: true };
      case 15: return { main: 'max-w-7xl mx-auto px-4 py-8 lg:py-12', grid: 'lg:grid lg:grid-cols-2 gap-12 items-center', media: 'order-last', form: 'order-first bg-amber-50 p-8 rounded-[2rem]', imageStyle: 'aspect-square rounded-3xl', reviewsTop: false };
      case 16: return { main: 'max-w-5xl mx-auto px-4 py-8 lg:py-12', grid: 'lg:grid lg:grid-cols-2 gap-0 border-8 border-lime-900 bg-white', media: 'p-8 border-b-8 lg:border-b-0 lg:border-r-8 border-lime-900 bg-lime-50', form: 'p-8', imageStyle: 'aspect-square border-4 border-lime-900', reviewsTop: true };
      case 17: return { main: 'max-w-6xl mx-auto px-4 py-8 lg:py-16', grid: 'lg:grid lg:grid-cols-12 gap-12', media: 'lg:col-span-5', form: 'lg:col-span-7 bg-white p-8 rounded-3xl shadow-2xl border border-violet-100', imageStyle: 'aspect-[3/4] rounded-2xl', reviewsTop: false };
      case 18: return { main: 'max-w-5xl mx-auto px-4 py-8 lg:py-12', grid: 'flex flex-col lg:flex-row gap-12', media: 'lg:w-1/2', form: 'lg:w-1/2 flex flex-col justify-center', imageStyle: 'aspect-square rounded-full shadow-xl', reviewsTop: true };
      case 19: return { main: 'w-full max-w-none px-0 bg-zinc-950 text-white', grid: 'max-w-6xl mx-auto lg:grid lg:grid-cols-2 gap-16 p-8 lg:p-16', media: 'bg-zinc-900 p-6 rounded-3xl border border-zinc-800', form: 'flex flex-col justify-center', imageStyle: 'aspect-video rounded-2xl', reviewsTop: false };
      case 20: return { main: 'max-w-5xl mx-auto px-4 py-8 lg:py-12', grid: 'lg:grid lg:grid-cols-2 gap-8 bg-blue-600 text-white p-8 lg:p-12 rounded-[3rem] shadow-2xl', media: 'bg-white/10 p-6 rounded-2xl backdrop-blur-sm', form: 'flex flex-col justify-center bg-white text-zinc-900 p-8 rounded-2xl', imageStyle: 'aspect-square rounded-xl', reviewsTop: true };
      default: return { main: 'max-w-5xl mx-auto px-4 py-8 lg:py-12', grid: 'lg:grid lg:grid-cols-2 border rounded-[2rem] shadow-2xl overflow-hidden', media: 'p-6 lg:p-10 border-r flex flex-col justify-between', form: 'p-6 lg:p-10 flex flex-col justify-center relative', imageStyle: 'aspect-[4/3] rounded-2xl', reviewsTop: false };
    }
  };

  const theme = getTheme();
  const layout = getLayout();
  const isDark = variant === 6 || variant === 9 || variant === 19;

  const reviewsSection = (
    <div className="mt-8">
      <div className={`flex items-center space-x-1 mb-4 ${variant === 2 ? 'justify-center' : ''}`}>
        {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current text-amber-400" />)}
        <span className={`text-xs font-bold ${isDark ? 'text-zinc-400' : 'text-zinc-500'} ml-2`}>{product.reviews} Reseñas</span>
      </div>
      <div className="space-y-4">
        {[
          { name: 'Marta V.', text: 'Increíble servicio. Pedí ayer y hoy ya lo tengo. El producto es de 10.', rating: 5 },
          { name: 'Carlos T.', text: 'Muy práctico y fácil de usar. Pagar al recibir me dio mucha confianza.', rating: 5 },
        ].map((review, i) => (
          <div key={i} className={`${isDark ? 'bg-zinc-800/50 border-zinc-700' : 'bg-zinc-50 border-zinc-100'} p-4 rounded-xl border`}>
            <p className={`text-sm ${isDark ? 'text-zinc-300' : 'text-zinc-600'} italic mb-2`}>&quot;{review.text}&quot;</p>
            <span className={`text-xs font-bold ${isDark ? 'text-white' : 'text-zinc-900'}`}>{review.name}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen ${isDark ? 'bg-zinc-900 text-zinc-100' : 'bg-zinc-50 text-zinc-900'} font-sans pb-12`}>
      {/* Minimal Header */}
      <header className={`py-4 px-6 ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-200'} flex justify-between items-center sticky top-0 z-40 shadow-sm`}>
        <div className={`font-black text-xl tracking-tighter uppercase ${isDark ? 'text-white' : 'text-zinc-900'}`}>{data.logoText}</div>
        <div className={`flex items-center space-x-2 ${theme.accent} font-bold text-sm ${theme.accentBg} px-3 py-1.5 rounded-full border ${theme.accentBorder}`}>
          <ShieldCheck className="w-4 h-4" />
          <span>Pago Seguro al Recibir</span>
        </div>
      </header>

      <main className={layout.main}>
        <div className={`${layout.grid} ${isDark && variant !== 9 ? 'bg-zinc-950 border-zinc-800' : variant !== 5 && variant !== 8 && variant !== 9 && variant !== 2 && variant !== 3 && variant !== 4 && variant !== 6 && variant !== 7 && variant !== 10 ? 'bg-white border-zinc-100' : ''}`}>
          
          {/* Left Side: Product Focus */}
          <div className={`${layout.media} ${isDark && variant !== 9 ? 'bg-zinc-900 border-zinc-800' : variant !== 5 && variant !== 8 && variant !== 9 && variant !== 2 && variant !== 3 && variant !== 4 && variant !== 6 && variant !== 7 && variant !== 10 ? 'bg-zinc-50/50 border-zinc-100' : ''}`}>
            <div className={variant === 10 ? 'md:w-1/2' : ''}>
              <div className={`flex items-center space-x-2 mb-4 ${variant === 2 ? 'justify-center' : ''}`}>
                <span className={`${theme.primary} text-white text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wider`}>
                  Envío Express
                </span>
                <span className={`text-sm font-medium ${isDark || variant === 8 ? 'text-zinc-400' : 'text-zinc-500'} flex items-center`}>
                  <Truck className="w-4 h-4 mr-1" /> 24/48h
                </span>
              </div>

              <h1 className={`text-3xl lg:text-4xl font-black leading-tight ${isDark || variant === 8 ? 'text-white' : 'text-zinc-900'} mb-4 tracking-tight`}>
                {product.title}
              </h1>
              
              <div className={`flex items-end space-x-3 mb-6 ${variant === 2 ? 'justify-center' : ''}`}>
                <span className={`text-5xl font-black ${isDark || variant === 8 ? 'text-white' : 'text-zinc-900'} tracking-tighter`}>${product.price}</span>
                <span className={`text-xl ${isDark || variant === 8 ? 'text-zinc-500' : 'text-zinc-400'} line-through font-bold mb-1`}>${product.originalPrice}</span>
              </div>

              <div className={`relative overflow-hidden shadow-md mb-6 ${layout.imageStyle} ${variant === 5 ? '' : isDark || variant === 8 ? 'border-zinc-800 border' : 'border-zinc-200 border'}`}>
                <Image src={product.imageUrl} alt={product.title} fill className="object-cover" referrerPolicy="no-referrer" />
                <div className={`absolute bottom-4 right-4 ${isDark || variant === 8 ? 'bg-zinc-900/90 text-white' : 'bg-white/90 text-zinc-900'} backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-bold shadow-sm flex items-center space-x-1`}>
                  <CheckCircle className={`w-4 h-4 ${theme.accent}`} />
                  <span>Stock Disponible</span>
                </div>
              </div>

              <p className={`${isDark || variant === 8 ? 'text-zinc-300' : 'text-zinc-600'} text-base leading-relaxed mb-6 font-medium`}>
                {product.description}
              </p>

              {layout.reviewsTop && reviewsSection}

              <ul className={`space-y-3 mb-8 ${variant === 2 ? 'text-left inline-block' : ''}`}>
                {[
                  'Calidad premium garantizada.',
                  'Fácil de usar y resultados inmediatos.',
                  'Pagas solo cuando lo tienes en tus manos.'
                ].map((benefit, i) => (
                  <li key={i} className="flex items-start space-x-3">
                    <div className={`w-6 h-6 rounded-full ${theme.accentBg} flex items-center justify-center shrink-0 mt-0.5`}>
                      <CheckCircle className={`w-4 h-4 ${theme.accent}`} />
                    </div>
                    <span className={`${isDark || variant === 8 ? 'text-zinc-200' : 'text-zinc-700'} font-medium`}>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={`hidden lg:block ${variant === 10 ? 'w-full mt-8' : ''}`}>
              <TrustBar />
            </div>
          </div>

          {/* Right Side: Direct Checkout Form */}
          <div className={`${layout.form} ${variant === 1 ? 'bg-white' : ''}`}>
            {(variant === 1 || variant === 9) && (
              <div className={`absolute top-0 right-0 w-32 h-32 ${isDark ? 'bg-zinc-900' : 'bg-zinc-50'} rounded-bl-full -z-10`}></div>
            )}
            
            <div className="mb-8">
              <h2 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-zinc-900'} mb-2 flex items-center space-x-2`}>
                <Zap className={`w-6 h-6 ${theme.accent}`} />
                <span>Completa tu pedido</span>
              </h2>
              <p className={`text-sm ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>Sin tarjetas de crédito. Paga en efectivo al repartidor.</p>
            </div>

            {data.pdpFeatures?.scarcityTimer && <ScarcityWarning />}

            <form className="space-y-5 mt-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-4">
                <div className="relative">
                  <label className={`absolute -top-2 left-3 ${isDark || variant === 6 || variant === 9 ? 'bg-zinc-950 text-zinc-400' : 'bg-white text-zinc-500'} px-1 text-xs font-bold uppercase tracking-wider`}>Nombre Completo</label>
                  <input type="text" className={`w-full px-4 py-4 ${variant === 5 ? 'rounded-none border-4 border-black' : 'rounded-xl border-2'} ${isDark || variant === 6 || variant === 9 ? 'border-zinc-800 focus:border-zinc-600 text-white placeholder-zinc-600' : 'border-zinc-200 focus:border-zinc-900 text-zinc-900 placeholder-zinc-300'} focus:ring-0 outline-none transition-colors bg-transparent font-medium`} placeholder="Ej. Juan Pérez" />
                </div>
                
                <div className="relative">
                  <label className={`absolute -top-2 left-3 ${isDark || variant === 6 || variant === 9 ? 'bg-zinc-950 text-zinc-400' : 'bg-white text-zinc-500'} px-1 text-xs font-bold uppercase tracking-wider`}>Teléfono / WhatsApp</label>
                  <input type="tel" className={`w-full px-4 py-4 ${variant === 5 ? 'rounded-none border-4 border-black' : 'rounded-xl border-2'} ${isDark || variant === 6 || variant === 9 ? 'border-zinc-800 focus:border-zinc-600 text-white placeholder-zinc-600' : 'border-zinc-200 focus:border-zinc-900 text-zinc-900 placeholder-zinc-300'} focus:ring-0 outline-none transition-colors bg-transparent font-medium`} placeholder="Para confirmar el envío" />
                </div>
                
                <div className="relative">
                  <label className={`absolute -top-2 left-3 ${isDark || variant === 6 || variant === 9 ? 'bg-zinc-950 text-zinc-400' : 'bg-white text-zinc-500'} px-1 text-xs font-bold uppercase tracking-wider`}>Dirección de Entrega</label>
                  <textarea rows={3} className={`w-full px-4 py-4 ${variant === 5 ? 'rounded-none border-4 border-black' : 'rounded-xl border-2'} ${isDark || variant === 6 || variant === 9 ? 'border-zinc-800 focus:border-zinc-600 text-white placeholder-zinc-600' : 'border-zinc-200 focus:border-zinc-900 text-zinc-900 placeholder-zinc-300'} focus:ring-0 outline-none transition-colors bg-transparent font-medium resize-none`} placeholder="Calle, número, ciudad, referencias..."></textarea>
                </div>
              </div>

              <div className={`${isDark || variant === 6 || variant === 9 ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-50 border-zinc-200'} p-4 ${variant === 5 ? 'rounded-none border-4 border-black' : 'rounded-xl border'} mt-6 mb-6`}>
                <div className="flex justify-between items-center mb-2">
                  <span className={`${isDark || variant === 6 || variant === 9 ? 'text-zinc-400' : 'text-zinc-600'} font-medium`}>Subtotal</span>
                  <span className={`font-bold ${isDark || variant === 6 || variant === 9 ? 'text-white' : 'text-zinc-900'}`}>${product.price}</span>
                </div>
                <div className={`flex justify-between items-center mb-3 pb-3 border-b ${isDark || variant === 6 || variant === 9 ? 'border-zinc-800' : 'border-zinc-200'}`}>
                  <span className={`${isDark || variant === 6 || variant === 9 ? 'text-zinc-400' : 'text-zinc-600'} font-medium`}>Envío Express (COD)</span>
                  <span className={`font-bold ${theme.accent}`}>GRATIS</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`text-lg font-black ${isDark || variant === 6 || variant === 9 ? 'text-white' : 'text-zinc-900'}`}>Total a Pagar</span>
                  <span className={`text-2xl font-black ${isDark || variant === 6 || variant === 9 ? 'text-white' : 'text-zinc-900'}`}>${product.price}</span>
                </div>
              </div>

              <button className={`w-full ${theme.primary} ${theme.hover} text-white font-black text-xl py-5 ${variant === 5 ? 'rounded-none border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none' : 'rounded-xl shadow-xl hover:-translate-y-1'} uppercase tracking-widest transition-all transform flex items-center justify-center space-x-3 group`}>
                <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span>Confirmar Pedido</span>
                <ArrowRight className="w-5 h-5 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </button>
              
              <p className={`text-center text-xs flex items-center justify-center space-x-1.5 mt-4 ${isDark || variant === 6 || variant === 9 ? 'text-zinc-500' : 'text-zinc-500'}`}>
                <ShieldCheck className={`w-4 h-4 ${theme.accent}`} />
                <span>Tus datos están protegidos. Paga al recibir.</span>
              </p>
            </form>

            <div className="lg:hidden mt-8">
              <TrustBar />
            </div>
          </div>
        </div>

        {/* Rich Content Area */}
        <div className="mt-12 space-y-12">
          {variant % 2 === 0 && <FeatureGrid iconColor={theme.text} bgClass={isDark ? 'bg-zinc-950' : theme.bgLight} />}
          
          <GuaranteeBadge />
          
          {!layout.reviewsTop && reviewsSection}
          
          {variant > 4 && <ComparisonTable productName={product.title} />}
          
          {variant % 3 === 0 && <HowItWorks />}
        </div>
      </main>
    </div>
  );
}
