'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { StoreData, Product } from '@/lib/types';
import { Star, ShieldCheck, Truck, Clock, AlertTriangle, Zap, CheckCircle, ArrowRight, Timer } from 'lucide-react';
import { LiveViewers, ScarcityWarning, TrustBar, BundleOffer, InlineCODForm, StickyBuyButton, RecentSalesPopup, FAQSection, FeatureGrid, HowItWorks, ComparisonTable } from './SharedCRO';

interface PDPProps {
  data: StoreData;
  product: Product;
  variant?: number;
}

export default function PdpAggressiveUrgency({ data, product, variant = 1 }: PDPProps) {
  const [timeLeft, setTimeLeft] = useState({ h: 2, m: 14, s: 59 });
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 };
        if (prev.m > 0) return { ...prev, m: prev.m - 1, s: 59 };
        if (prev.h > 0) return { ...prev, h: prev.h - 1, m: 59, s: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Dynamic styling based on variant (1-10)
  const getTheme = () => {
    switch(variant) {
      case 1: return { primary: 'bg-red-600', text: 'text-red-600', bgLight: 'bg-red-50', border: 'border-red-200', hover: 'hover:bg-red-700', alert: 'bg-red-100 text-red-800' };
      case 2: return { primary: 'bg-zinc-900', text: 'text-zinc-900', bgLight: 'bg-zinc-100', border: 'border-zinc-300', hover: 'hover:bg-black', alert: 'bg-zinc-200 text-zinc-900' };
      case 3: return { primary: 'bg-yellow-500', text: 'text-yellow-600', bgLight: 'bg-yellow-50', border: 'border-yellow-200', hover: 'hover:bg-yellow-600', alert: 'bg-yellow-100 text-yellow-800' };
      case 4: return { primary: 'bg-orange-600', text: 'text-orange-600', bgLight: 'bg-orange-50', border: 'border-orange-200', hover: 'hover:bg-orange-700', alert: 'bg-orange-100 text-orange-800' };
      case 5: return { primary: 'bg-rose-700', text: 'text-rose-700', bgLight: 'bg-rose-50', border: 'border-rose-200', hover: 'hover:bg-rose-800', alert: 'bg-rose-100 text-rose-800' };
      case 6: return { primary: 'bg-blue-900', text: 'text-blue-900', bgLight: 'bg-blue-50', border: 'border-blue-200', hover: 'hover:bg-blue-950', alert: 'bg-blue-100 text-blue-800' };
      case 7: return { primary: 'bg-fuchsia-600', text: 'text-fuchsia-600', bgLight: 'bg-fuchsia-50', border: 'border-fuchsia-200', hover: 'hover:bg-fuchsia-700', alert: 'bg-fuchsia-100 text-fuchsia-800' };
      case 8: return { primary: 'bg-red-800', text: 'text-red-800', bgLight: 'bg-red-50', border: 'border-red-200', hover: 'hover:bg-red-900', alert: 'bg-red-100 text-red-800' };
      case 9: return { primary: 'bg-red-500', text: 'text-red-500', bgLight: 'bg-zinc-900', border: 'border-red-900/50', hover: 'hover:bg-red-600', alert: 'bg-red-900/30 text-red-400' };
      case 10: return { primary: 'bg-amber-500', text: 'text-amber-500', bgLight: 'bg-zinc-900', border: 'border-amber-500/30', hover: 'hover:bg-amber-600', alert: 'bg-amber-900/30 text-amber-400' };
      case 11: return { primary: 'bg-lime-500', text: 'text-lime-600', bgLight: 'bg-lime-50', border: 'border-lime-200', hover: 'hover:bg-lime-600', alert: 'bg-lime-100 text-lime-800' };
      case 12: return { primary: 'bg-purple-700', text: 'text-purple-700', bgLight: 'bg-purple-50', border: 'border-purple-200', hover: 'hover:bg-purple-800', alert: 'bg-purple-100 text-purple-800' };
      case 13: return { primary: 'bg-black', text: 'text-black', bgLight: 'bg-zinc-100', border: 'border-black', hover: 'hover:bg-zinc-800', alert: 'bg-red-600 text-white' };
      case 14: return { primary: 'bg-cyan-500', text: 'text-cyan-600', bgLight: 'bg-cyan-50', border: 'border-cyan-200', hover: 'hover:bg-cyan-600', alert: 'bg-cyan-100 text-cyan-800' };
      case 15: return { primary: 'bg-yellow-400', text: 'text-black', bgLight: 'bg-yellow-50', border: 'border-yellow-400', hover: 'hover:bg-yellow-500', alert: 'bg-black text-yellow-400' };
      case 16: return { primary: 'bg-rose-600', text: 'text-rose-600', bgLight: 'bg-rose-50', border: 'border-rose-200', hover: 'hover:bg-rose-700', alert: 'bg-rose-100 text-rose-800' };
      case 17: return { primary: 'bg-pink-600', text: 'text-pink-600', bgLight: 'bg-pink-50', border: 'border-pink-200', hover: 'hover:bg-pink-700', alert: 'bg-pink-100 text-pink-800' };
      case 18: return { primary: 'bg-orange-500', text: 'text-orange-500', bgLight: 'bg-zinc-900', border: 'border-orange-500/30', hover: 'hover:bg-orange-600', alert: 'bg-orange-900/30 text-orange-400' };
      case 19: return { primary: 'bg-red-700', text: 'text-red-700', bgLight: 'bg-white', border: 'border-red-100', hover: 'hover:bg-red-800', alert: 'bg-red-50 text-red-700' };
      case 20: return { primary: 'bg-red-600', text: 'text-white', bgLight: 'bg-red-900', border: 'border-red-500', hover: 'hover:bg-red-500', alert: 'bg-red-950 text-red-200' };
      default: return { primary: 'bg-red-600', text: 'text-red-600', bgLight: 'bg-red-50', border: 'border-red-200', hover: 'hover:bg-red-700', alert: 'bg-red-100 text-red-800' };
    }
  };

  // Dynamic layout structure based on variant (1-10)
  const getLayout = () => {
    switch(variant) {
      case 1: return { main: 'max-w-5xl mx-auto px-4 lg:py-12', grid: 'lg:grid lg:grid-cols-2 lg:gap-12', media: 'space-y-4', info: 'pt-6 lg:pt-0 flex flex-col justify-center', timerTop: true, imageAspect: 'aspect-square rounded-2xl' };
      case 2: return { main: 'max-w-4xl mx-auto px-4 lg:py-16 text-center', grid: 'flex flex-col gap-10', media: 'w-full max-w-2xl mx-auto', info: 'flex flex-col items-center bg-white p-8 rounded-3xl shadow-xl border border-zinc-200', timerTop: false, imageAspect: 'aspect-[4/3] rounded-3xl' };
      case 3: return { main: 'max-w-7xl mx-auto px-4 lg:py-12', grid: 'lg:grid lg:grid-cols-12 gap-12', media: 'lg:col-span-7', info: 'lg:col-span-5 lg:sticky lg:top-24 h-fit bg-white p-8 rounded-2xl shadow-2xl border-2 border-yellow-100', timerTop: true, imageAspect: 'aspect-[3/4] rounded-xl' };
      case 4: return { main: 'max-w-5xl mx-auto px-4 lg:py-12', grid: 'flex flex-col lg:flex-row-reverse gap-12', media: 'lg:w-1/2 space-y-4', info: 'lg:w-1/2 pt-6 lg:pt-0 flex flex-col justify-center', timerTop: false, imageAspect: 'aspect-square rounded-2xl' };
      case 5: return { main: 'max-w-6xl mx-auto px-4 lg:py-12', grid: 'lg:grid lg:grid-cols-2 gap-0 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] bg-white', media: 'p-8 bg-rose-50 border-b-4 lg:border-b-0 lg:border-r-4 border-black', info: 'p-8 flex flex-col justify-center', timerTop: true, imageAspect: 'aspect-square border-4 border-black' };
      case 6: return { main: 'max-w-3xl mx-auto px-4 lg:py-10', grid: 'flex flex-col gap-6', media: 'w-full', info: 'bg-white p-8 rounded-3xl shadow-2xl -mt-20 relative z-10 mx-4 border border-blue-100', timerTop: false, imageAspect: 'aspect-video rounded-2xl' };
      case 7: return { main: 'max-w-6xl mx-auto px-4 lg:py-12', grid: 'lg:grid lg:grid-cols-3 gap-12', media: 'lg:col-span-2', info: 'lg:col-span-1 bg-white p-8 rounded-[2rem] shadow-xl border border-fuchsia-100', timerTop: true, imageAspect: 'aspect-square rounded-2xl' };
      case 8: return { main: 'max-w-5xl mx-auto px-4 lg:py-12', grid: 'lg:grid lg:grid-cols-2 gap-16 items-center', media: 'order-last lg:order-first', info: '', timerTop: false, imageAspect: 'aspect-square rounded-full shadow-2xl border-8 border-red-50' };
      case 9: return { main: 'max-w-5xl mx-auto px-4 lg:py-12', grid: 'lg:grid lg:grid-cols-2 gap-12 bg-zinc-950 text-white p-10 rounded-[3rem] shadow-2xl border border-red-900/50', media: '', info: 'flex flex-col justify-center', timerTop: true, imageAspect: 'aspect-square rounded-2xl border border-red-900/30' };
      case 10: return { main: 'w-full max-w-none px-0', grid: 'lg:flex min-h-[80vh]', media: 'lg:w-1/2 bg-zinc-950 flex items-center justify-center p-8 lg:p-16', info: 'lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center bg-zinc-900 text-white', timerTop: false, imageAspect: 'aspect-square rounded-none shadow-2xl border border-zinc-800', reviewsTop: true };
      case 11: return { main: 'max-w-7xl mx-auto px-4 lg:py-8', grid: 'lg:grid lg:grid-cols-12 gap-8', media: 'lg:col-span-6 lg:sticky lg:top-24 h-fit', info: 'lg:col-span-6', timerTop: true, imageAspect: 'aspect-[4/5] rounded-xl' };
      case 12: return { main: 'max-w-4xl mx-auto px-4 lg:py-12', grid: 'flex flex-col gap-8', media: 'w-full', info: 'bg-white p-8 rounded-2xl shadow-lg border border-purple-100 -mt-12 relative z-10', timerTop: true, imageAspect: 'aspect-[21/9] rounded-t-3xl' };
      case 13: return { main: 'max-w-6xl mx-auto px-4 lg:py-16', grid: 'lg:grid lg:grid-cols-2 gap-16 items-center', media: 'order-last', info: 'order-first flex flex-col justify-center', timerTop: false, imageAspect: 'aspect-square rounded-none border-8 border-black' };
      case 14: return { main: 'max-w-7xl mx-auto px-4 lg:py-12', grid: 'lg:grid lg:grid-cols-2 gap-12', media: 'grid grid-cols-2 gap-4', info: 'flex flex-col justify-center bg-cyan-50 p-10 rounded-3xl', timerTop: true, imageAspect: 'aspect-square rounded-2xl' };
      case 15: return { main: 'max-w-5xl mx-auto px-4 lg:py-12', grid: 'lg:grid lg:grid-cols-2 gap-0 border-8 border-black bg-yellow-400', media: 'p-6 border-b-8 lg:border-b-0 lg:border-r-8 border-black bg-white', info: 'p-8 flex flex-col justify-center bg-yellow-400', timerTop: true, imageAspect: 'aspect-square border-4 border-black' };
      case 16: return { main: 'max-w-5xl mx-auto px-4 lg:py-12 relative', grid: 'lg:grid lg:grid-cols-2 gap-12 relative z-10 bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white', media: '', info: 'flex flex-col justify-center', timerTop: false, imageAspect: 'aspect-[3/4] rounded-2xl shadow-xl' };
      case 17: return { main: 'max-w-md mx-auto px-0 lg:py-8', grid: 'flex flex-col bg-white lg:rounded-[3rem] lg:shadow-2xl overflow-hidden border-x lg:border border-pink-100', media: 'w-full', info: 'p-8', timerTop: true, imageAspect: 'aspect-[4/5] rounded-none' };
      case 18: return { main: 'max-w-6xl mx-auto px-4 lg:py-12', grid: 'lg:grid lg:grid-cols-2 gap-12 bg-zinc-950 text-white p-8 rounded-3xl border border-orange-500/20 shadow-[0_0_50px_-12px_rgba(249,115,22,0.3)]', media: '', info: 'flex flex-col justify-center', timerTop: true, imageAspect: 'aspect-square rounded-2xl border border-orange-500/30' };
      case 19: return { main: 'max-w-5xl mx-auto px-4 lg:py-20', grid: 'lg:grid lg:grid-cols-2 gap-20', media: '', info: 'flex flex-col justify-center', timerTop: false, imageAspect: 'aspect-[3/4] rounded-none' };
      case 20: return { main: 'w-full max-w-none px-0 bg-red-700 text-white', grid: 'max-w-6xl mx-auto lg:grid lg:grid-cols-2 gap-12 p-8 lg:p-16', media: 'bg-red-800 p-4 rounded-3xl', info: 'flex flex-col justify-center', timerTop: true, imageAspect: 'aspect-square rounded-2xl shadow-2xl' };
      default: return { main: 'max-w-5xl mx-auto px-4 lg:py-12', grid: 'lg:grid lg:grid-cols-2 lg:gap-12', media: 'space-y-4', info: 'pt-6 lg:pt-0 flex flex-col justify-center', timerTop: true, imageAspect: 'aspect-square rounded-2xl', reviewsTop: false };
    }
  };

  const theme = getTheme();
  const layout = getLayout();
  const isDark = variant === 9 || variant === 10 || variant === 18 || variant === 20;

  return (
    <div className={`min-h-screen ${isDark ? 'bg-zinc-950 text-white' : 'bg-slate-50 text-slate-900'} font-sans pb-24`}>
      {/* Top Banner */}
      {layout.timerTop && (
        <div className={`${theme.primary} text-white text-center py-3 px-4 font-black tracking-widest uppercase flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6 shadow-md`}>
          <div className="flex items-center space-x-2 animate-pulse">
            <Zap className="w-5 h-5" />
            <span className="text-sm md:text-base">OFERTA RELÁMPAGO: TERMINA HOY</span>
          </div>
          <div className="flex items-center space-x-2 bg-black/20 px-4 py-1.5 rounded-full">
            <Timer className="w-4 h-4" />
            <span className="text-lg tabular-nums">{String(timeLeft.h).padStart(2, '0')}:{String(timeLeft.m).padStart(2, '0')}:{String(timeLeft.s).padStart(2, '0')}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <header className={`px-6 py-4 flex justify-between items-center ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-slate-100'} shadow-sm sticky top-0 z-40 border-b`}>
        <div className={`font-black text-2xl tracking-tighter uppercase ${isDark ? 'text-white' : 'text-slate-900'}`}>{data.logoText}</div>
        {!layout.timerTop && (
          <div className={`flex items-center space-x-1.5 ${theme.text} font-black text-sm bg-red-50 px-3 py-1.5 rounded-full border border-red-100 animate-pulse`}>
            <Clock className="w-4 h-4" />
            <span className="tabular-nums">{String(timeLeft.h).padStart(2, '0')}:{String(timeLeft.m).padStart(2, '0')}:{String(timeLeft.s).padStart(2, '0')}</span>
          </div>
        )}
      </header>

      <main className={layout.main}>
        <div className={`${variant === 5 || variant === 9 || variant === 10 || variant === 2 || variant === 3 || variant === 7 ? '' : isDark ? 'bg-zinc-950 border-zinc-800 rounded-[2rem] shadow-xl overflow-hidden p-8 border' : 'bg-white border-slate-100 rounded-[2rem] shadow-xl overflow-hidden p-8 border'} ${layout.grid}`}>
          
          {/* Product Images */}
          <div className={layout.media}>
            <div className={`relative overflow-hidden ${layout.imageAspect} ${variant === 5 ? '' : isDark ? 'border-zinc-800 border' : 'border-slate-100 border shadow-sm'}`}>
              <div className={`absolute top-4 left-4 ${theme.primary} text-white px-4 py-2 rounded-full text-sm font-black uppercase z-10 shadow-lg flex items-center space-x-1.5 animate-bounce`}>
                <AlertTriangle className="w-4 h-4" />
                <span>-50% DTO</span>
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
            <div className={`mb-4 ${variant === 2 ? 'flex justify-center' : ''}`}>
              {data.pdpFeatures?.liveViewers && <LiveViewers colorClass={theme.text} bgClass={theme.alert} />}
            </div>
            
            <h1 className={`text-3xl lg:text-5xl font-black uppercase tracking-tighter leading-none mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {product.title}
            </h1>
            
            <div className={`flex items-center space-x-2 mb-6 ${variant === 2 ? 'justify-center' : ''}`}>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
              </div>
              <span className={`text-sm font-bold ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>({product.reviews} Reseñas Verificadas)</span>
            </div>

            <div className={`${isDark ? 'bg-zinc-900 border-zinc-800' : theme.bgLight} p-6 ${variant === 5 ? 'border-4 border-black' : 'rounded-2xl border'} mb-8 relative overflow-hidden`}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
              <div className={`flex items-end space-x-3 ${variant === 2 ? 'justify-center' : ''} relative z-10`}>
                <span className={`text-6xl font-black ${theme.text} tracking-tighter leading-none`}>${product.price}</span>
                <span className={`text-2xl ${isDark ? 'text-zinc-500' : 'text-slate-400'} line-through font-bold mb-1`}>${product.originalPrice}</span>
              </div>
              <div className={`mt-4 ${variant === 2 ? 'flex justify-center' : ''}`}>
                {data.pdpFeatures?.scarcityTimer && <ScarcityWarning colorClass={theme.primary} textClass={theme.text} />}
              </div>
            </div>
            
            <button 
              onClick={() => document.getElementById('checkout-form')?.scrollIntoView({ behavior: 'smooth' })}
              className={`w-full ${theme.primary} ${theme.hover} text-white font-black text-xl lg:text-2xl py-6 ${variant === 5 ? 'border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none' : 'rounded-2xl shadow-xl hover:scale-[1.02]'} uppercase tracking-widest transition-all transform flex items-center justify-center space-x-3 mb-8`}
            >
              <span>Pedir Ahora (COD)</span>
              <ArrowRight className="w-8 h-8 animate-pulse" />
            </button>

            <div className="mb-8">
              <TrustBar />
            </div>

            <div className={`prose prose-sm ${isDark ? 'text-zinc-300' : 'text-slate-600'} ${variant === 2 ? 'text-center mx-auto' : ''}`}>
              <p className={`font-black text-xl ${isDark ? 'text-white' : 'text-slate-900'} leading-tight mb-4`}>
                ¿Cansado de productos que no cumplen lo que prometen? {product.title} es la solución definitiva.
              </p>
              <p className="text-base font-medium">{product.description}</p>
              
              {layout.reviewsTop && (
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
              )}

              <ul className={`space-y-3 mt-6 font-bold ${isDark ? 'text-zinc-200' : 'text-slate-800'} ${variant === 2 ? 'inline-block text-left' : ''}`}>
                <li className="flex items-center space-x-3"><CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" /> <span>Resultados garantizados en 7 días.</span></li>
                <li className="flex items-center space-x-3"><CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" /> <span>Materiales de calidad premium.</span></li>
                <li className="flex items-center space-x-3"><CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" /> <span>Fácil de usar y mantener.</span></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Rich Content Area */}
        <div className="mt-16 space-y-16">
          {variant % 3 === 0 && <FeatureGrid iconColor={theme.text} bgClass={isDark ? 'bg-zinc-950' : theme.bgLight} />}
          
          {!layout.reviewsTop && (
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
          )}

          <BundleOffer price={product.price} colorClass={`border-${theme.primary.split('-')[1]}-500`} bgClass={isDark ? 'bg-zinc-900' : theme.bgLight} textClass={theme.text} />
          
          {variant % 2 !== 0 && <ComparisonTable productName={product.title} />}
          
          {variant > 5 && <HowItWorks />}

          <div className={`${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-slate-100'} ${variant === 5 ? 'border-4 border-black' : 'rounded-[2rem] border shadow-2xl'} p-8 lg:p-12 relative overflow-hidden`}>
            <div className={`absolute top-0 left-0 w-full h-2 ${theme.primary}`}></div>
            <div className="text-center mb-10">
              <div className={`inline-flex items-center justify-center space-x-2 ${theme.alert} px-4 py-1.5 rounded-full text-sm font-black mb-4 uppercase tracking-widest`}>
                <AlertTriangle className="w-4 h-4" />
                <span>Últimas unidades disponibles</span>
              </div>
              <h3 className={`text-3xl font-black uppercase tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'}`}>Completa tu pedido ahora</h3>
              <p className={`${isDark ? 'text-zinc-400' : 'text-slate-500'} mt-2 font-medium`}>Paga en efectivo al recibir tu producto. Sin riesgos.</p>
            </div>
            <InlineCODForm buttonColor={`${theme.primary} ${theme.hover}`} />
          </div>
          
          <FAQSection />
        </div>
      </main>

      {data.pdpFeatures?.stickyButton && <StickyBuyButton buttonColor={theme.primary} />}
      {data.pdpFeatures?.recentSales && <RecentSalesPopup />}
    </div>
  );
}
