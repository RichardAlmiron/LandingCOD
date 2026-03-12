'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { StoreData, Product } from '@/lib/types';
import { Star, ShieldCheck, Truck, CheckCircle, Award, ThumbsUp, MessageCircle, Users } from 'lucide-react';
import { TrustBar, BundleOffer, InlineCODForm, StickyBuyButton, FAQSection, ComparisonTable, GuaranteeBadge, FeatureGrid, HowItWorks } from './SharedCRO';

interface PDPProps {
  data: StoreData;
  product: Product;
  variant?: number;
}

export default function PdpSocialTrust({ data, product, variant = 1 }: PDPProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  // Dynamic styling based on variant (1-10)
  const getTheme = () => {
    switch(variant) {
      case 1: return { primary: 'bg-blue-600', text: 'text-blue-600', bgLight: 'bg-blue-50', border: 'border-blue-200', hover: 'hover:bg-blue-700', badge: 'bg-blue-100 text-blue-800' };
      case 2: return { primary: 'bg-zinc-900', text: 'text-zinc-900', bgLight: 'bg-zinc-100', border: 'border-zinc-300', hover: 'hover:bg-black', badge: 'bg-zinc-200 text-zinc-900' };
      case 3: return { primary: 'bg-emerald-600', text: 'text-emerald-600', bgLight: 'bg-emerald-50', border: 'border-emerald-200', hover: 'hover:bg-emerald-700', badge: 'bg-emerald-100 text-emerald-800' };
      case 4: return { primary: 'bg-slate-800', text: 'text-slate-800', bgLight: 'bg-slate-100', border: 'border-slate-300', hover: 'hover:bg-slate-900', badge: 'bg-slate-200 text-slate-800' };
      case 5: return { primary: 'bg-yellow-500', text: 'text-yellow-600', bgLight: 'bg-yellow-50', border: 'border-yellow-200', hover: 'hover:bg-yellow-600', badge: 'bg-yellow-100 text-yellow-800' };
      case 6: return { primary: 'bg-teal-600', text: 'text-teal-600', bgLight: 'bg-teal-50', border: 'border-teal-200', hover: 'hover:bg-teal-700', badge: 'bg-teal-100 text-teal-800' };
      case 7: return { primary: 'bg-zinc-500', text: 'text-zinc-600', bgLight: 'bg-zinc-50', border: 'border-zinc-200', hover: 'hover:bg-zinc-600', badge: 'bg-zinc-200 text-zinc-700' };
      case 8: return { primary: 'bg-indigo-600', text: 'text-indigo-600', bgLight: 'bg-indigo-50', border: 'border-indigo-200', hover: 'hover:bg-indigo-700', badge: 'bg-indigo-100 text-indigo-800' };
      case 9: return { primary: 'bg-zinc-950', text: 'text-zinc-100', bgLight: 'bg-zinc-900', border: 'border-zinc-800', hover: 'hover:bg-zinc-800', badge: 'bg-zinc-800 text-zinc-300' };
      case 10: return { primary: 'bg-sky-600', text: 'text-sky-600', bgLight: 'bg-sky-50', border: 'border-sky-200', hover: 'hover:bg-sky-700', badge: 'bg-sky-100 text-sky-800' };
      case 11: return { primary: 'bg-emerald-500', text: 'text-emerald-600', bgLight: 'bg-emerald-50', border: 'border-emerald-200', hover: 'hover:bg-emerald-600', badge: 'bg-emerald-100 text-emerald-800' };
      case 12: return { primary: 'bg-cyan-700', text: 'text-cyan-700', bgLight: 'bg-cyan-50', border: 'border-cyan-200', hover: 'hover:bg-cyan-800', badge: 'bg-cyan-100 text-cyan-800' };
      case 13: return { primary: 'bg-fuchsia-500', text: 'text-fuchsia-600', bgLight: 'bg-fuchsia-50', border: 'border-fuchsia-200', hover: 'hover:bg-fuchsia-600', badge: 'bg-fuchsia-100 text-fuchsia-800' };
      case 14: return { primary: 'bg-rose-700', text: 'text-rose-700', bgLight: 'bg-rose-50', border: 'border-rose-200', hover: 'hover:bg-rose-800', badge: 'bg-rose-100 text-rose-800' };
      case 15: return { primary: 'bg-amber-600', text: 'text-amber-600', bgLight: 'bg-amber-50', border: 'border-amber-200', hover: 'hover:bg-amber-700', badge: 'bg-amber-100 text-amber-800' };
      case 16: return { primary: 'bg-lime-600', text: 'text-lime-600', bgLight: 'bg-lime-50', border: 'border-lime-200', hover: 'hover:bg-lime-700', badge: 'bg-lime-100 text-lime-800' };
      case 17: return { primary: 'bg-violet-700', text: 'text-violet-700', bgLight: 'bg-violet-50', border: 'border-violet-200', hover: 'hover:bg-violet-800', badge: 'bg-violet-100 text-violet-800' };
      case 18: return { primary: 'bg-emerald-800', text: 'text-emerald-800', bgLight: 'bg-emerald-100', border: 'border-emerald-300', hover: 'hover:bg-emerald-900', badge: 'bg-emerald-200 text-emerald-900' };
      case 19: return { primary: 'bg-orange-700', text: 'text-orange-700', bgLight: 'bg-orange-50', border: 'border-orange-200', hover: 'hover:bg-orange-800', badge: 'bg-orange-100 text-orange-800' };
      case 20: return { primary: 'bg-zinc-800', text: 'text-zinc-800', bgLight: 'bg-zinc-200', border: 'border-zinc-400', hover: 'hover:bg-zinc-900', badge: 'bg-zinc-300 text-zinc-900' };
      default: return { primary: 'bg-blue-600', text: 'text-blue-600', bgLight: 'bg-blue-50', border: 'border-blue-200', hover: 'hover:bg-blue-700', badge: 'bg-blue-100 text-blue-800' };
    }
  };

  // Dynamic layout structure based on variant (1-10)
  const getLayout = () => {
    switch(variant) {
      case 1: return { main: 'max-w-5xl mx-auto px-4 lg:py-12', grid: 'lg:grid lg:grid-cols-2 lg:gap-12', media: 'space-y-4', info: 'pt-6 lg:pt-0 flex flex-col justify-center', reviewsTop: false, imageAspect: 'aspect-square rounded-2xl' };
      case 2: return { main: 'max-w-4xl mx-auto px-4 lg:py-16', grid: 'flex flex-col gap-12', media: 'w-full max-w-2xl mx-auto', info: 'flex flex-col items-center text-center bg-white p-8 rounded-3xl shadow-sm border', reviewsTop: true, imageAspect: 'aspect-[4/3] rounded-3xl' };
      case 3: return { main: 'max-w-7xl mx-auto px-4 lg:py-12', grid: 'lg:grid lg:grid-cols-12 gap-12', media: 'lg:col-span-7', info: 'lg:col-span-5 lg:sticky lg:top-24 h-fit bg-white p-8 rounded-2xl shadow-lg border', reviewsTop: false, imageAspect: 'aspect-[3/4] rounded-xl' };
      case 4: return { main: 'max-w-5xl mx-auto px-4 lg:py-12', grid: 'flex flex-col lg:flex-row-reverse gap-12', media: 'lg:w-1/2 space-y-4', info: 'lg:w-1/2 pt-6 lg:pt-0 flex flex-col justify-center', reviewsTop: false, imageAspect: 'aspect-square rounded-2xl' };
      case 5: return { main: 'max-w-6xl mx-auto px-4 lg:py-12', grid: 'lg:grid lg:grid-cols-2 gap-0 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white', media: 'p-8 bg-yellow-50 border-b-4 lg:border-b-0 lg:border-r-4 border-black', info: 'p-8 flex flex-col justify-center', reviewsTop: false, imageAspect: 'aspect-square border-4 border-black' };
      case 6: return { main: 'max-w-3xl mx-auto px-4 lg:py-10', grid: 'flex flex-col gap-6', media: 'w-full', info: 'bg-white p-8 rounded-3xl shadow-xl -mt-16 relative z-10 mx-4', reviewsTop: true, imageAspect: 'aspect-video rounded-2xl' };
      case 7: return { main: 'max-w-6xl mx-auto px-4 lg:py-12', grid: 'lg:grid lg:grid-cols-3 gap-12', media: 'lg:col-span-1', info: 'lg:col-span-2 bg-white p-10 rounded-[2rem] shadow-sm border', reviewsTop: false, imageAspect: 'aspect-[3/4] rounded-2xl' };
      case 8: return { main: 'max-w-5xl mx-auto px-4 lg:py-12', grid: 'lg:grid lg:grid-cols-2 gap-16 items-center', media: 'order-last lg:order-first', info: '', reviewsTop: false, imageAspect: 'aspect-square rounded-full shadow-2xl' };
      case 9: return { main: 'max-w-5xl mx-auto px-4 lg:py-12', grid: 'lg:grid lg:grid-cols-2 gap-12 bg-zinc-950 text-white p-10 rounded-[3rem] shadow-2xl border border-zinc-800', media: '', info: 'flex flex-col justify-center', reviewsTop: false, imageAspect: 'aspect-square rounded-2xl border border-zinc-800' };
      case 10: return { main: 'w-full max-w-none px-0', grid: 'lg:flex min-h-[80vh]', media: 'lg:w-1/2 bg-sky-900 flex items-center justify-center p-8 lg:p-16', info: 'lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center bg-sky-50', reviewsTop: false, imageAspect: 'aspect-square rounded-none shadow-2xl' };
      case 11: return { main: 'max-w-7xl mx-auto px-4 lg:py-16', grid: 'lg:grid lg:grid-cols-12 gap-16', media: 'lg:col-span-6 lg:sticky lg:top-24 h-fit', info: 'lg:col-span-6 bg-white p-10 rounded-[3rem] shadow-2xl border border-emerald-100', reviewsTop: false, imageAspect: 'aspect-[4/5] rounded-2xl' };
      case 12: return { main: 'max-w-5xl mx-auto px-4 lg:py-16', grid: 'flex flex-col gap-12', media: 'w-full max-w-3xl mx-auto', info: 'bg-cyan-50/50 p-8 lg:p-12 rounded-3xl border border-cyan-100', reviewsTop: true, imageAspect: 'aspect-video rounded-3xl' };
      case 13: return { main: 'max-w-6xl mx-auto px-4 lg:py-12', grid: 'lg:grid lg:grid-cols-12 gap-0 bg-white rounded-2xl shadow-xl border overflow-hidden', media: 'lg:col-span-6 p-8 bg-fuchsia-50', info: 'lg:col-span-6 p-8 lg:p-12 flex flex-col justify-center', reviewsTop: false, imageAspect: 'aspect-square rounded-xl' };
      case 14: return { main: 'max-w-4xl mx-auto px-4 lg:py-10', grid: 'flex flex-col gap-8', media: 'w-full', info: 'bg-white p-6 lg:p-10 rounded-2xl shadow-lg border-t-8 border-rose-700', reviewsTop: true, imageAspect: 'aspect-[4/3] rounded-2xl' };
      case 15: return { main: 'max-w-7xl mx-auto px-4 lg:py-12', grid: 'lg:grid lg:grid-cols-2 gap-12 items-center', media: 'order-last', info: 'order-first bg-amber-50 p-8 rounded-[2rem]', reviewsTop: false, imageAspect: 'aspect-square rounded-3xl' };
      case 16: return { main: 'max-w-5xl mx-auto px-4 lg:py-12', grid: 'lg:grid lg:grid-cols-2 gap-0 border-8 border-lime-900 bg-white', media: 'p-8 border-b-8 lg:border-b-0 lg:border-r-8 border-lime-900 bg-lime-50', info: 'p-8', reviewsTop: true, imageAspect: 'aspect-square border-4 border-lime-900' };
      case 17: return { main: 'max-w-6xl mx-auto px-4 lg:py-16', grid: 'lg:grid lg:grid-cols-12 gap-12', media: 'lg:col-span-5', info: 'lg:col-span-7 bg-white p-8 rounded-3xl shadow-2xl border border-violet-100', reviewsTop: false, imageAspect: 'aspect-[3/4] rounded-2xl' };
      case 18: return { main: 'max-w-5xl mx-auto px-4 lg:py-12', grid: 'flex flex-col lg:flex-row gap-12', media: 'lg:w-1/2', info: 'lg:w-1/2 flex flex-col justify-center', reviewsTop: true, imageAspect: 'aspect-square rounded-full shadow-xl' };
      case 19: return { main: 'w-full max-w-none px-0 bg-zinc-950 text-white', grid: 'max-w-6xl mx-auto lg:grid lg:grid-cols-2 gap-16 p-8 lg:p-16', media: 'bg-zinc-900 p-6 rounded-3xl border border-zinc-800', info: 'flex flex-col justify-center', reviewsTop: false, imageAspect: 'aspect-video rounded-2xl' };
      case 20: return { main: 'max-w-5xl mx-auto px-4 lg:py-12', grid: 'lg:grid lg:grid-cols-2 gap-8 bg-blue-600 text-white p-8 lg:p-12 rounded-[3rem] shadow-2xl', media: 'bg-white/10 p-6 rounded-2xl backdrop-blur-sm', info: 'flex flex-col justify-center bg-white text-zinc-900 p-8 rounded-2xl', reviewsTop: true, imageAspect: 'aspect-square rounded-xl' };
      default: return { main: 'max-w-5xl mx-auto px-4 lg:py-12', grid: 'lg:grid lg:grid-cols-2 lg:gap-12', media: 'space-y-4', info: 'pt-6 lg:pt-0 flex flex-col justify-center', reviewsTop: false, imageAspect: 'aspect-square rounded-2xl' };
    }
  };

  const theme = getTheme();
  const layout = getLayout();
  const isDark = variant === 9 || variant === 19;

  const reviews = [
    { name: 'Elena M.', title: '¡Increíble calidad!', text: 'Dudaba un poco al principio, pero el producto superó mis expectativas. El envío fue rapidísimo y pagar al recibir me dio mucha tranquilidad.', verified: true },
    { name: 'Roberto S.', title: 'Exactamente lo que buscaba', text: 'Excelente servicio al cliente y el producto es tal cual se describe. Lo recomiendo al 100%.', verified: true },
    { name: 'Carmen L.', title: 'Muy recomendado', text: 'Me encantó la presentación y cómo funciona. Definitivamente volveré a comprar en esta tienda.', verified: true },
    { name: 'Javier P.', title: 'Mejor de lo esperado', text: 'Había probado otros similares pero este es de lejos el mejor. La atención al cliente es de 10.', verified: true }
  ].slice(0, variant === 2 || variant === 6 ? 4 : 2);

  const reviewsSection = (
    <div className={`${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-100'} rounded-3xl shadow-sm border p-6 lg:p-10 w-full`}>
      <div className="text-center mb-10">
        <div className={`inline-flex items-center justify-center space-x-2 ${theme.badge} px-4 py-1.5 rounded-full text-sm font-bold mb-4`}>
          <Users className="w-4 h-4" />
          <span>Comunidad de Clientes</span>
        </div>
        <h2 className={`text-3xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'} mb-3`}>Lo que dicen nuestros clientes</h2>
        <div className="flex items-center justify-center space-x-2 text-amber-400 text-2xl">
          {[...Array(5)].map((_, i) => <Star key={i} className="w-8 h-8 fill-current drop-shadow-sm" />)}
          <span className={`${isDark ? 'text-white' : 'text-slate-900'} font-black ml-3`}>4.9/5</span>
        </div>
        <p className={`text-base font-medium ${isDark ? 'text-zinc-400' : 'text-slate-500'} mt-2`}>Basado en {product.reviews} reseñas verificadas</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {reviews.map((review, i) => (
          <div key={i} className={`${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-slate-50 border-slate-100'} p-6 rounded-2xl border`}>
            <div className="flex text-amber-400 mb-3">
              {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
            </div>
            <h4 className={`font-bold ${isDark ? 'text-zinc-100' : 'text-slate-900'} text-lg mb-2`}>{review.title}</h4>
            <p className={`${isDark ? 'text-zinc-400' : 'text-slate-600'} text-sm leading-relaxed mb-4`}>&quot;{review.text}&quot;</p>
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-200/50">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 ${theme.primary} text-white rounded-full flex items-center justify-center font-bold text-xs`}>
                  {review.name.charAt(0)}
                </div>
                <div>
                  <div className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'} text-sm flex items-center space-x-1`}>
                    <span>{review.name}</span>
                    {review.verified && <CheckCircle className={`w-3.5 h-3.5 ${theme.text}`} />}
                  </div>
                  <span className={`text-xs ${isDark ? 'text-zinc-500' : 'text-slate-400'}`}>Comprador Verificado</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen ${isDark ? 'bg-zinc-900 text-white' : 'bg-slate-50 text-slate-900'} font-sans pb-24`}>
      {/* Trust Header */}
      <div className={`${theme.primary} text-white text-center py-2.5 text-xs font-bold tracking-widest flex items-center justify-center space-x-2 uppercase`}>
        <ShieldCheck className="w-4 h-4" />
        <span>Compra 100% Segura y Protegida</span>
      </div>

      <header className={`px-6 py-4 flex justify-between items-center ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-slate-100'} shadow-sm sticky top-0 z-40 border-b`}>
        <div className={`font-black text-2xl tracking-tighter uppercase ${isDark ? 'text-white' : 'text-slate-900'}`}>{data.logoText}</div>
        <div className={`flex items-center space-x-1.5 ${isDark ? 'text-zinc-300' : 'text-slate-600'} text-sm font-bold bg-slate-100 px-3 py-1.5 rounded-full`}>
          <Truck className="w-4 h-4" />
          <span>Envío Gratis</span>
        </div>
      </header>

      <main className={layout.main}>
        {layout.reviewsTop && <div className="mb-12">{reviewsSection}</div>}
        
        <div className={`${variant === 5 || variant === 9 || variant === 10 || variant === 2 || variant === 3 || variant === 7 ? '' : isDark ? 'bg-zinc-950 border-zinc-800 rounded-[2rem] shadow-xl overflow-hidden p-8 border' : 'bg-white border-slate-100 rounded-[2rem] shadow-xl overflow-hidden p-8 border'} ${layout.grid}`}>
          {/* Product Images */}
          <div className={layout.media}>
            <div className={`relative overflow-hidden ${layout.imageAspect} ${variant === 5 ? '' : isDark ? 'border-zinc-800 border' : 'border-slate-100 border shadow-sm'}`}>
              <div className={`absolute top-4 left-4 ${isDark ? 'bg-zinc-900/90 text-white' : 'bg-white/90 text-slate-900'} backdrop-blur-md px-4 py-2 rounded-full text-xs font-black flex items-center space-x-1.5 z-10 shadow-lg border ${isDark ? 'border-zinc-700' : 'border-slate-200'}`}>
                <Award className={`w-4 h-4 ${theme.text}`} />
                <span>Nº 1 EN VENTAS</span>
              </div>
              <Image src={selectedImage === 0 ? product.imageUrl : `https://picsum.photos/800/800?random=${product.id}${selectedImage}`} alt={product.title} fill className="object-cover" referrerPolicy="no-referrer" />
            </div>
            
            <div className="grid grid-cols-4 gap-3 mt-4">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className={`relative w-full aspect-square ${variant === 5 ? 'border-2 border-black' : 'rounded-xl border-2'} overflow-hidden cursor-pointer transition-all ${selectedImage === i ? theme.border : 'border-transparent opacity-60 hover:opacity-100'}`} onClick={() => setSelectedImage(i)}>
                  <Image 
                    src={i === 0 ? product.imageUrl : `https://picsum.photos/400/400?random=${product.id}${i}`} 
                    alt={`${product.title} thumbnail ${i}`}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info & Buy Area */}
          <div className={layout.info}>
            <div className={`flex items-center space-x-2 mb-4 ${variant === 2 ? 'justify-center' : ''}`}>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
              </div>
              <span className={`text-sm font-bold ${theme.text} hover:underline cursor-pointer`}>
                Ver {product.reviews} opiniones verificadas
              </span>
            </div>

            <h1 className={`text-3xl lg:text-4xl font-black tracking-tight leading-tight ${isDark ? 'text-white' : 'text-slate-900'} mb-4`}>
              {product.title}
            </h1>
            
            <p className={`${isDark ? 'text-zinc-400' : 'text-slate-600'} text-base leading-relaxed mb-8 font-medium`}>
              {product.description}
            </p>

            <div className={`${isDark ? 'bg-zinc-900 border-zinc-800' : theme.bgLight} p-6 ${variant === 5 ? 'border-4 border-black' : 'rounded-2xl border'} mb-8`}>
              <div className={`flex items-end space-x-3 ${variant === 2 ? 'justify-center' : ''}`}>
                <span className={`text-5xl font-black tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'}`}>${product.price}</span>
                <span className={`text-xl ${isDark ? 'text-zinc-500' : 'text-slate-400'} line-through font-bold mb-1`}>${product.originalPrice}</span>
                <span className={`${theme.primary} text-white text-xs font-black px-2.5 py-1 rounded-md mb-2 uppercase tracking-wider`}>Ahorras ${(parseFloat(product.originalPrice.replace(/,/g, '')) - parseFloat(product.price.replace(/,/g, ''))).toLocaleString()}</span>
              </div>
              <p className={`text-sm ${theme.text} mt-3 flex items-center font-bold ${variant === 2 ? 'justify-center' : ''}`}><CheckCircle className="w-4 h-4 mr-1.5" /> Impuestos incluidos. Envío gratis.</p>
            </div>

            <button 
              onClick={() => document.getElementById('checkout-form')?.scrollIntoView({ behavior: 'smooth' })}
              className={`w-full ${theme.primary} ${theme.hover} text-white font-black text-xl py-5 ${variant === 5 ? 'border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none' : 'rounded-xl shadow-xl hover:-translate-y-1'} uppercase tracking-widest transition-all transform flex items-center justify-center space-x-3`}
            >
              <ShieldCheck className="w-6 h-6" />
              <span>Comprar de Forma Segura (COD)</span>
            </button>

            <div className="mt-8">
              <TrustBar />
            </div>
          </div>
        </div>

        {/* Rich Content Area */}
        <div className="mt-16 space-y-16">
          {variant % 2 === 0 && <FeatureGrid iconColor={theme.text} bgClass={isDark ? 'bg-zinc-950' : theme.bgLight} />}
          
          <GuaranteeBadge />
          
          {variant > 4 && <ComparisonTable productName={product.title} />}

          {!layout.reviewsTop && reviewsSection}

          {variant % 3 === 0 && <HowItWorks />}

          <BundleOffer price={product.price} colorClass={`border-${theme.primary.split('-')[1]}-500`} bgClass={isDark ? 'bg-zinc-900' : theme.bgLight} textClass={theme.text} />
          
          <div className={`${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-slate-100'} ${variant === 5 ? 'border-4 border-black' : 'rounded-[2rem] border shadow-xl'} p-8 lg:p-12`}>
            <div className="text-center mb-8">
              <h3 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>Completa tu pedido ahora</h3>
              <p className={`${isDark ? 'text-zinc-400' : 'text-slate-500'} mt-2`}>Paga en efectivo al recibir tu producto. Sin riesgos.</p>
            </div>
            <InlineCODForm buttonColor={`${theme.primary} ${theme.hover}`} />
          </div>
          
          <FAQSection />
        </div>
      </main>

      {data.pdpFeatures?.stickyButton && <StickyBuyButton buttonColor={theme.primary} />}
    </div>
  );
}
