'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { StoreData, Product } from '@/lib/types';
import { Star, ShieldCheck, Truck, CheckCircle, Gift, TrendingUp, Percent } from 'lucide-react';
import { TrustBar, InlineCODForm, StickyBuyButton, FAQSection, FeatureGrid, GuaranteeBadge, ComparisonTable, HowItWorks } from './SharedCRO';

interface PDPProps {
  data: StoreData;
  product: Product;
  variant?: number;
}

export default function PdpBundleMaximizer({ data, product, variant = 1 }: PDPProps) {
  const [selectedBundle, setSelectedBundle] = useState(3);
  const basePrice = parseFloat(product.price.replace(/,/g, ''));
  const originalBasePrice = parseFloat(product.originalPrice.replace(/,/g, ''));

  const bundles = [
    { id: 1, qty: 1, title: 'Paquete Básico', price: basePrice, oldPrice: originalBasePrice, save: 0, tag: '', popular: false },
    { id: 2, qty: 2, title: 'Paquete Doble', price: basePrice * 1.8, oldPrice: originalBasePrice * 2, save: 20, tag: 'ENVÍO GRATIS', popular: false },
    { id: 3, qty: 3, title: 'Paquete Familiar', price: basePrice * 2.2, oldPrice: originalBasePrice * 3, save: 40, tag: 'MÁS POPULAR', popular: true },
    { id: 4, qty: 5, title: 'Mega Paquete', price: basePrice * 3, oldPrice: originalBasePrice * 5, save: 55, tag: 'MEJOR VALOR', popular: false },
  ];

  const selected = bundles.find(b => b.id === selectedBundle) || bundles[0];

  // Dynamic styling based on variant (1-10)
  const getTheme = () => {
    switch(variant) {
      case 1: return { primary: 'bg-emerald-600', text: 'text-emerald-600', bgLight: 'bg-emerald-50', border: 'border-emerald-200', hover: 'hover:bg-emerald-700' };
      case 2: return { primary: 'bg-zinc-900', text: 'text-zinc-900', bgLight: 'bg-zinc-100', border: 'border-zinc-300', hover: 'hover:bg-black' };
      case 3: return { primary: 'bg-orange-500', text: 'text-orange-600', bgLight: 'bg-orange-50', border: 'border-orange-200', hover: 'hover:bg-orange-600' };
      case 4: return { primary: 'bg-purple-600', text: 'text-purple-600', bgLight: 'bg-purple-50', border: 'border-purple-200', hover: 'hover:bg-purple-700' };
      case 5: return { primary: 'bg-pink-600', text: 'text-pink-600', bgLight: 'bg-pink-50', border: 'border-pink-200', hover: 'hover:bg-pink-700' };
      case 6: return { primary: 'bg-slate-700', text: 'text-slate-700', bgLight: 'bg-slate-100', border: 'border-slate-300', hover: 'hover:bg-slate-800' };
      case 7: return { primary: 'bg-cyan-600', text: 'text-cyan-600', bgLight: 'bg-cyan-50', border: 'border-cyan-200', hover: 'hover:bg-cyan-700' };
      case 8: return { primary: 'bg-red-600', text: 'text-red-600', bgLight: 'bg-red-50', border: 'border-red-200', hover: 'hover:bg-red-700' };
      case 9: return { primary: 'bg-lime-600', text: 'text-lime-600', bgLight: 'bg-lime-50', border: 'border-lime-200', hover: 'hover:bg-lime-700' };
      case 10: return { primary: 'bg-amber-500', text: 'text-amber-600', bgLight: 'bg-amber-50', border: 'border-amber-200', hover: 'hover:bg-amber-600' };
      case 11: return { primary: 'bg-teal-600', text: 'text-teal-600', bgLight: 'bg-teal-50', border: 'border-teal-200', hover: 'hover:bg-teal-700' };
      case 12: return { primary: 'bg-indigo-600', text: 'text-indigo-600', bgLight: 'bg-indigo-50', border: 'border-indigo-200', hover: 'hover:bg-indigo-700' };
      case 13: return { primary: 'bg-fuchsia-600', text: 'text-fuchsia-600', bgLight: 'bg-fuchsia-50', border: 'border-fuchsia-200', hover: 'hover:bg-fuchsia-700' };
      case 14: return { primary: 'bg-rose-600', text: 'text-rose-600', bgLight: 'bg-rose-50', border: 'border-rose-200', hover: 'hover:bg-rose-700' };
      case 15: return { primary: 'bg-sky-600', text: 'text-sky-600', bgLight: 'bg-sky-50', border: 'border-sky-200', hover: 'hover:bg-sky-700' };
      case 16: return { primary: 'bg-violet-600', text: 'text-violet-600', bgLight: 'bg-violet-50', border: 'border-violet-200', hover: 'hover:bg-violet-700' };
      case 17: return { primary: 'bg-emerald-700', text: 'text-emerald-700', bgLight: 'bg-emerald-100', border: 'border-emerald-300', hover: 'hover:bg-emerald-800' };
      case 18: return { primary: 'bg-orange-600', text: 'text-orange-600', bgLight: 'bg-orange-100', border: 'border-orange-300', hover: 'hover:bg-orange-700' };
      case 19: return { primary: 'bg-zinc-800', text: 'text-zinc-800', bgLight: 'bg-zinc-200', border: 'border-zinc-400', hover: 'hover:bg-zinc-900' };
      case 20: return { primary: 'bg-blue-700', text: 'text-blue-700', bgLight: 'bg-blue-100', border: 'border-blue-300', hover: 'hover:bg-blue-800' };
      default: return { primary: 'bg-emerald-600', text: 'text-emerald-600', bgLight: 'bg-emerald-50', border: 'border-emerald-200', hover: 'hover:bg-emerald-700' };
    }
  };

  // Dynamic layout structure based on variant (1-10)
  const getLayout = () => {
    switch(variant) {
      case 1: return { main: 'max-w-5xl mx-auto px-4 lg:py-10', grid: 'lg:grid lg:grid-cols-12 lg:gap-0 bg-white rounded-[2rem] shadow-2xl overflow-hidden border', media: 'lg:col-span-5 p-6 lg:p-8 bg-emerald-50/50 border-r', info: 'lg:col-span-7 p-6 lg:p-10', bundleStyle: 'list', reviewsTop: false };
      case 2: return { main: 'max-w-4xl mx-auto px-4 lg:py-12', grid: 'flex flex-col gap-8', media: 'w-full max-w-2xl mx-auto', info: 'bg-white p-8 rounded-3xl shadow-xl border', bundleStyle: 'grid', reviewsTop: true };
      case 3: return { main: 'max-w-6xl mx-auto px-4 lg:py-12', grid: 'lg:grid lg:grid-cols-2 gap-12', media: 'space-y-6', info: 'lg:sticky lg:top-24 h-fit', bundleStyle: 'cards', reviewsTop: false };
      case 4: return { main: 'max-w-5xl mx-auto px-4 lg:py-10', grid: 'flex flex-col lg:flex-row-reverse gap-8', media: 'lg:w-5/12', info: 'lg:w-7/12 bg-white p-8 rounded-3xl shadow-lg border', bundleStyle: 'list', reviewsTop: false };
      case 5: return { main: 'max-w-5xl mx-auto px-4 lg:py-12', grid: 'lg:grid lg:grid-cols-2 gap-0 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white', media: 'p-8 border-b-4 lg:border-b-0 lg:border-r-4 border-black bg-pink-50', info: 'p-8', bundleStyle: 'brutalist', reviewsTop: true };
      case 6: return { main: 'max-w-3xl mx-auto px-4 lg:py-8', grid: 'flex flex-col gap-6', media: 'w-full', info: 'bg-white p-6 rounded-2xl shadow-md border', bundleStyle: 'compact', reviewsTop: false };
      case 7: return { main: 'max-w-6xl mx-auto px-4 lg:py-12', grid: 'lg:grid lg:grid-cols-12 gap-8', media: 'lg:col-span-7', info: 'lg:col-span-5 bg-white p-8 rounded-3xl shadow-sm border', bundleStyle: 'list', reviewsTop: false };
      case 8: return { main: 'max-w-5xl mx-auto px-4 lg:py-12', grid: 'lg:grid lg:grid-cols-2 gap-12 items-center', media: 'order-last lg:order-first', info: '', bundleStyle: 'grid', reviewsTop: true };
      case 9: return { main: 'max-w-5xl mx-auto px-4 lg:py-12', grid: 'lg:grid lg:grid-cols-2 gap-8 bg-zinc-900 text-white p-8 rounded-[2rem]', media: '', info: 'flex flex-col justify-center', bundleStyle: 'dark-cards', reviewsTop: false };
      case 10: return { main: 'w-full max-w-none px-0', grid: 'lg:flex min-h-[80vh]', media: 'lg:w-1/2 bg-amber-50 flex items-center justify-center p-8 lg:p-16', info: 'lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center bg-white', bundleStyle: 'list', reviewsTop: true };
      case 11: return { main: 'max-w-7xl mx-auto px-4 lg:py-12', grid: 'lg:grid lg:grid-cols-2 gap-16', media: 'lg:sticky lg:top-24 h-fit', info: 'bg-white p-10 rounded-[3rem] shadow-2xl border border-teal-100', bundleStyle: 'cards', reviewsTop: false };
      case 12: return { main: 'max-w-5xl mx-auto px-4 lg:py-16', grid: 'flex flex-col gap-12', media: 'w-full max-w-3xl mx-auto', info: 'bg-indigo-50/50 p-8 lg:p-12 rounded-3xl border border-indigo-100', bundleStyle: 'grid', reviewsTop: true };
      case 13: return { main: 'max-w-6xl mx-auto px-4 lg:py-12', grid: 'lg:grid lg:grid-cols-12 gap-0 bg-white rounded-2xl shadow-xl border overflow-hidden', media: 'lg:col-span-6 p-8 bg-fuchsia-50', info: 'lg:col-span-6 p-8 lg:p-12', bundleStyle: 'list', reviewsTop: false };
      case 14: return { main: 'max-w-4xl mx-auto px-4 lg:py-10', grid: 'flex flex-col gap-8', media: 'w-full', info: 'bg-white p-6 lg:p-10 rounded-2xl shadow-lg border-t-8 border-rose-600', bundleStyle: 'compact', reviewsTop: true };
      case 15: return { main: 'max-w-7xl mx-auto px-4 lg:py-12', grid: 'lg:grid lg:grid-cols-2 gap-12 items-center', media: 'order-last', info: 'order-first bg-sky-50 p-8 rounded-[2rem]', bundleStyle: 'grid', reviewsTop: false };
      case 16: return { main: 'max-w-5xl mx-auto px-4 lg:py-12', grid: 'lg:grid lg:grid-cols-2 gap-0 border-8 border-violet-900 bg-white', media: 'p-8 border-b-8 lg:border-b-0 lg:border-r-8 border-violet-900 bg-violet-50', info: 'p-8', bundleStyle: 'brutalist', reviewsTop: true };
      case 17: return { main: 'max-w-6xl mx-auto px-4 lg:py-16', grid: 'lg:grid lg:grid-cols-12 gap-12', media: 'lg:col-span-5', info: 'lg:col-span-7 bg-white p-8 rounded-3xl shadow-2xl border border-emerald-100', bundleStyle: 'cards', reviewsTop: false };
      case 18: return { main: 'max-w-5xl mx-auto px-4 lg:py-12', grid: 'flex flex-col lg:flex-row gap-12', media: 'lg:w-1/2', info: 'lg:w-1/2 flex flex-col justify-center', bundleStyle: 'list', reviewsTop: true };
      case 19: return { main: 'w-full max-w-none px-0 bg-zinc-950 text-white', grid: 'max-w-6xl mx-auto lg:grid lg:grid-cols-2 gap-16 p-8 lg:p-16', media: 'bg-zinc-900 p-6 rounded-3xl border border-zinc-800', info: 'flex flex-col justify-center', bundleStyle: 'dark-cards', reviewsTop: false };
      case 20: return { main: 'max-w-5xl mx-auto px-4 lg:py-12', grid: 'lg:grid lg:grid-cols-2 gap-8 bg-blue-600 text-white p-8 lg:p-12 rounded-[3rem] shadow-2xl', media: 'bg-white/10 p-6 rounded-2xl backdrop-blur-sm', info: 'flex flex-col justify-center', bundleStyle: 'dark-cards', reviewsTop: true };
      default: return { main: 'max-w-5xl mx-auto px-4 lg:py-10', grid: 'lg:grid lg:grid-cols-12 lg:gap-0 bg-white rounded-[2rem] shadow-2xl overflow-hidden border', media: 'lg:col-span-5 p-6 lg:p-8 bg-emerald-50/50 border-r', info: 'lg:col-span-7 p-6 lg:p-10', bundleStyle: 'list', reviewsTop: false };
    }
  };

  const theme = getTheme();
  const layout = getLayout();
  const isDark = variant === 2 || variant === 6 || variant === 9 || variant === 19 || variant === 20;

  const reviewsSection = (
    <div className="mt-12">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-1 text-amber-400 mb-2">
          {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
        </div>
        <h3 className={`text-2xl font-black ${isDark || variant === 9 ? 'text-white' : 'text-slate-900'}`}>Lo que dicen nuestros clientes</h3>
        <p className={`${isDark || variant === 9 ? 'text-zinc-400' : 'text-slate-500'} mt-1`}>Basado en {product.reviews} reseñas reales</p>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {[
          { name: 'Andrés R.', text: 'Increíble oferta, compré el paquete de 3 y me ahorré muchísimo. La calidad es excelente.', rating: 5 },
          { name: 'Lucía M.', text: 'El envío fue súper rápido, llegó en menos de 24 horas. Muy contenta con la compra.', rating: 5 },
        ].map((review, i) => (
          <div key={i} className={`${isDark || variant === 9 ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-slate-100'} p-6 rounded-2xl border shadow-sm`}>
            <div className="flex text-amber-400 mb-3">
              {[...Array(review.rating)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
            </div>
            <p className={`${isDark || variant === 9 ? 'text-zinc-300' : 'text-slate-600'} italic mb-4`}>&quot;{review.text}&quot;</p>
            <div className="flex items-center space-x-2">
              <div className={`w-8 h-8 ${theme.primary} text-white rounded-full flex items-center justify-center font-bold text-xs`}>{review.name.charAt(0)}</div>
              <span className={`font-bold ${isDark || variant === 9 ? 'text-white' : 'text-slate-900'}`}>{review.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const bundlesList = (() => {
    if (layout.bundleStyle === 'grid' || layout.bundleStyle === 'cards' || layout.bundleStyle === 'dark-cards') {
      return (
        <div className={`grid ${layout.bundleStyle === 'grid' ? 'grid-cols-2' : 'grid-cols-1 sm:grid-cols-2'} gap-4`}>
          {bundles.map((bundle) => (
            <div 
              key={bundle.id}
              onClick={() => setSelectedBundle(bundle.id)}
              className={`relative p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 flex flex-col items-center text-center ${
                selectedBundle === bundle.id 
                  ? `${theme.border} ${theme.bgLight} shadow-md transform scale-[1.02]` 
                  : `${isDark && variant !== 9 ? 'border-zinc-800 bg-zinc-900 hover:border-zinc-700' : variant === 9 ? 'border-zinc-700 bg-zinc-800 hover:border-zinc-600' : 'border-slate-200 bg-white hover:border-slate-300'}`
              }`}
            >
              {bundle.popular && (
                <div className="absolute -top-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-black px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
                  {bundle.tag}
                </div>
              )}
              <div className={`font-black text-lg ${isDark || variant === 9 ? 'text-white' : 'text-slate-900'} mt-2`}>{bundle.title}</div>
              <div className={`text-sm ${theme.text} font-medium mb-3`}>{bundle.qty}x Unidades</div>
              <div className={`font-black text-2xl ${isDark || variant === 9 ? 'text-white' : 'text-slate-800'}`}>${bundle.price.toLocaleString()}</div>
              {bundle.save > 0 && (
                <div className="mt-2 flex flex-col items-center">
                  <span className={`text-xs ${isDark || variant === 9 ? 'text-zinc-400' : 'text-slate-400'} line-through`}>${bundle.oldPrice.toLocaleString()}</span>
                  <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded mt-1">Ahorras {bundle.save}%</span>
                </div>
              )}
            </div>
          ))}
        </div>
      );
    }

    if (layout.bundleStyle === 'brutalist') {
      return (
        <div className="space-y-4">
          {bundles.map((bundle) => (
            <div 
              key={bundle.id}
              onClick={() => setSelectedBundle(bundle.id)}
              className={`relative p-4 border-4 border-black cursor-pointer transition-all duration-200 flex items-center justify-between ${
                selectedBundle === bundle.id 
                  ? `${theme.bgLight} shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] translate-x-[-2px] translate-y-[-2px]` 
                  : `bg-white hover:bg-slate-50`
              }`}
            >
              {bundle.popular && (
                <div className="absolute -top-4 -right-2 bg-black text-white text-xs font-black px-3 py-1 uppercase tracking-wider transform rotate-3">
                  {bundle.tag}
                </div>
              )}
              <div className="flex items-center space-x-4">
                <div className={`w-8 h-8 border-4 border-black flex items-center justify-center shrink-0 ${selectedBundle === bundle.id ? theme.primary : 'bg-white'}`}>
                  {selectedBundle === bundle.id && <CheckCircle className="w-5 h-5 text-white" />}
                </div>
                <div>
                  <div className="font-black text-xl text-black uppercase">{bundle.title}</div>
                  <div className="text-sm font-bold text-black">{bundle.qty}x Unidades</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-black text-2xl text-black">${bundle.price.toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    // Default list style
    return (
      <div className="grid gap-3">
        {bundles.map((bundle) => (
          <div 
            key={bundle.id}
            onClick={() => setSelectedBundle(bundle.id)}
            className={`relative p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 flex items-center justify-between ${
              selectedBundle === bundle.id 
                ? `${theme.border} ${theme.bgLight} shadow-md transform scale-[1.02]` 
                : `${isDark && variant !== 9 ? 'border-zinc-800 bg-zinc-900 hover:border-zinc-700' : variant === 9 ? 'border-zinc-700 bg-zinc-800 hover:border-zinc-600' : 'border-slate-200 bg-white hover:border-slate-300'}`
            }`}
          >
            {bundle.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-black px-4 py-1 rounded-full shadow-md uppercase tracking-wider">
                {bundle.tag}
              </div>
            )}
            {!bundle.popular && bundle.tag && (
              <div className={`absolute -top-3 right-4 ${theme.primary} text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase`}>
                {bundle.tag}
              </div>
            )}
            
            <div className="flex items-center space-x-4">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${selectedBundle === bundle.id ? `${theme.border} ${theme.primary}` : (isDark || variant === 9 ? 'border-zinc-600' : 'border-slate-300')}`}>
                {selectedBundle === bundle.id && <CheckCircle className="w-4 h-4 text-white" />}
              </div>
              <div>
                <div className={`font-black text-lg ${isDark || variant === 9 ? 'text-white' : 'text-slate-900'}`}>{bundle.title}</div>
                <div className={`text-sm ${theme.text} font-medium`}>{bundle.qty}x Unidades</div>
              </div>
            </div>
            
            <div className="text-right">
              <div className={`font-black text-2xl ${isDark || variant === 9 ? 'text-white' : 'text-slate-800'}`}>${bundle.price.toLocaleString()}</div>
              {bundle.save > 0 && (
                <div className="flex items-center justify-end space-x-2">
                  <span className={`text-xs ${isDark || variant === 9 ? 'text-zinc-500' : 'text-slate-400'} line-through`}>${bundle.oldPrice.toLocaleString()}</span>
                  <span className="text-xs font-bold text-red-500 bg-red-50 px-1.5 rounded">-{bundle.save}%</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  })();

  return (
    <div className={`min-h-screen ${isDark ? 'bg-zinc-950 text-white' : 'bg-slate-50 text-slate-900'} font-sans pb-24`}>
      {/* Promo Header */}
      <div className={`${theme.primary} text-white text-center py-2.5 text-sm font-bold tracking-wide flex items-center justify-center space-x-2 shadow-md`}>
        <Gift className="w-5 h-5 animate-bounce" />
        <span>¡OFERTA ESPECIAL: LLEVA MÁS Y PAGA MENOS!</span>
      </div>

      <header className={`p-4 flex justify-between items-center ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-200'} shadow-sm sticky top-0 z-40`}>
        <div className={`font-black text-2xl tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'}`}>{data.logoText}</div>
        <div className={`flex items-center space-x-1 ${theme.text} font-bold text-sm ${theme.bgLight} px-3 py-1 rounded-full`}>
          <TrendingUp className="w-4 h-4" />
          <span>Ahorra hasta 55%</span>
        </div>
      </header>

      <main className={layout.main}>
        <div className={layout.grid}>
          
          {/* Left Column: Images & Trust */}
          <div className={layout.media}>
            <h1 className={`text-2xl lg:text-3xl font-black leading-tight ${isDark ? 'text-white' : 'text-slate-900'} mb-4 lg:hidden`}>
              {product.title}
            </h1>
            
            <div className={`relative overflow-hidden ${variant === 5 ? 'border-4 border-black' : 'rounded-2xl shadow-lg border-4'} ${isDark ? 'border-zinc-800' : 'border-white'}`}>
              <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-1.5 rounded-full text-sm font-black flex items-center space-x-1 z-10 shadow-md transform -rotate-2">
                <Percent className="w-4 h-4" />
                <span>AHORRO MASIVO</span>
              </div>
              <Image src={product.imageUrl} alt={product.title} fill className="object-cover" referrerPolicy="no-referrer" />
            </div>
            
            <div className="grid grid-cols-4 gap-3 mt-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={`relative w-full aspect-square ${variant === 5 ? 'border-2 border-black' : 'rounded-xl border-2'} overflow-hidden cursor-pointer transition-all ${isDark ? 'border-zinc-800' : 'border-white'} shadow-sm hover:${theme.border}`}>
                  <Image 
                    src={`https://picsum.photos/400/400?random=${product.id}${i}`} 
                    alt={`${product.title} thumbnail ${i}`}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </div>

            <div className="mt-8 hidden lg:block">
              <TrustBar />
            </div>
          </div>

          {/* Right Column: Bundles & Checkout */}
          <div className={layout.info}>
            <h1 className={`text-3xl lg:text-4xl font-black leading-tight ${isDark || variant === 9 ? 'text-white' : 'text-slate-900'} mb-2 hidden lg:block`}>
              {product.title}
            </h1>
            
            <div className={`flex items-center space-x-2 mb-6 ${variant === 2 ? 'justify-center' : ''}`}>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
              </div>
              <span className={`text-sm font-bold ${theme.text} ${theme.bgLight} px-2 py-0.5 rounded-md`}>
                {product.reviews} Compradores Felices
              </span>
            </div>

            <p className={`${isDark || variant === 9 ? 'text-zinc-400' : 'text-slate-600'} text-base leading-relaxed mb-8 font-medium ${variant === 2 ? 'text-center' : ''}`}>
              {product.description} Aprovecha nuestros descuentos por volumen antes de que se agoten.
            </p>

            {/* Bundle Selector */}
            <div className="space-y-4 mb-8">
              <h3 className={`font-black text-xl ${isDark || variant === 9 ? 'text-white' : 'text-slate-900'} flex items-center space-x-2 ${variant === 2 ? 'justify-center' : ''}`}>
                <span className={`${theme.primary} text-white w-8 h-8 rounded-full flex items-center justify-center text-sm`}>1</span>
                <span>Elige tu paquete de ahorro:</span>
              </h3>
              
              {bundlesList}
            </div>

            {/* Summary Box */}
            <div className={`${variant === 5 ? 'bg-black text-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(255,0,0,1)]' : isDark || variant === 9 ? 'bg-zinc-800' : 'bg-slate-900'} text-white p-6 rounded-2xl shadow-xl mb-8 relative overflow-hidden`}>
              <div className={`absolute -right-10 -top-10 w-32 h-32 ${isDark || variant === 9 ? 'bg-zinc-700' : 'bg-slate-800'} rounded-full opacity-50 blur-2xl`}></div>
              <div className="relative z-10">
                <div className="flex justify-between items-end mb-2">
                  <span className={`${isDark || variant === 9 ? 'text-zinc-300' : 'text-slate-300'} font-medium`}>Total a pagar al recibir:</span>
                  <div className="text-right">
                    <span className={`text-sm ${isDark || variant === 9 ? 'text-zinc-400' : 'text-slate-400'} line-through mr-2`}>${selected.oldPrice.toLocaleString()}</span>
                    <span className="text-4xl font-black">${selected.price.toLocaleString()}</span>
                  </div>
                </div>
                {selected.save > 0 && (
                  <div className={`${isDark || variant === 9 ? 'text-zinc-300' : 'text-emerald-400'} text-sm font-bold text-right`}>
                    ¡Estás ahorrando ${(selected.oldPrice - selected.price).toLocaleString()} hoy!
                  </div>
                )}
              </div>
            </div>

            {layout.reviewsTop && reviewsSection}

            <div className="lg:hidden mb-8">
              <TrustBar />
            </div>

            <div className="mb-8">
              <h3 className={`font-black text-xl ${isDark || variant === 9 ? 'text-white' : 'text-slate-900'} flex items-center space-x-2 mb-4 ${variant === 2 ? 'justify-center' : ''}`}>
                <span className={`${theme.primary} text-white w-8 h-8 rounded-full flex items-center justify-center text-sm`}>2</span>
                <span>Ingresa tus datos de envío:</span>
              </h3>
              <InlineCODForm buttonColor={`${theme.primary} ${theme.hover}`} />
            </div>
            
          </div>
        </div>

        {/* Rich Content Sections */}
        <div className="mt-12 space-y-12">
          {variant % 2 === 0 && <FeatureGrid iconColor={theme.text} bgClass={theme.bgLight} />}
          
          <GuaranteeBadge />
          
          {!layout.reviewsTop && reviewsSection}
          
          {variant > 4 && <ComparisonTable productName={product.title} />}
          
          {variant % 3 === 0 && <HowItWorks />}

          <FAQSection />
        </div>
      </main>

      {data.pdpFeatures?.stickyButton && <StickyBuyButton buttonColor={theme.primary} />}
    </div>
  );
}
