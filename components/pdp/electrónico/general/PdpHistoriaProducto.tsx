'use client';
import React from 'react';
import Image from 'next/image';
import { StoreData, Product } from '@/lib/types';
import { Star, CheckCircle, ArrowRight, Heart, Sparkles, XCircle } from 'lucide-react';
import { TrustBar, InlineCODForm, StickyBuyButton, FAQSection, RecentSalesPopup, FeatureGrid, GuaranteeBadge, ComparisonTable, HowItWorks } from '@/components/pdp/SharedCRO';
import EnhancedProductGallery from '@/components/pdp/EnhancedProductGallery';

interface PDPProps {
  data: StoreData;
  product: Product;
  variant?: number;
}

export default function PdpHistoriaProducto({ data, product, variant = 1 }: PDPProps) {
  const ai = product.aiContent;
  const sec = ai?.sections;
  const fmtPrice = (n: number) => {
    const str = Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `Gs. ${str}`;
  };

  // Dynamic styling based on variant (1-10)
  const getTheme = () => {
    switch(variant) {
      case 1: return { primary: 'bg-zinc-900', text: 'text-zinc-900', bgLight: 'bg-zinc-100', border: 'border-zinc-200', hover: 'hover:bg-zinc-800', accent: 'text-amber-500' };
      case 2: return { primary: 'bg-stone-800', text: 'text-stone-800', bgLight: 'bg-stone-100', border: 'border-stone-200', hover: 'hover:bg-stone-900', accent: 'text-stone-500' };
      case 3: return { primary: 'bg-rose-900', text: 'text-rose-900', bgLight: 'bg-rose-50', border: 'border-rose-200', hover: 'hover:bg-rose-950', accent: 'text-rose-500' };
      case 4: return { primary: 'bg-slate-900', text: 'text-slate-900', bgLight: 'bg-slate-100', border: 'border-slate-200', hover: 'hover:bg-black', accent: 'text-blue-500' };
      case 5: return { primary: 'bg-amber-900', text: 'text-amber-900', bgLight: 'bg-amber-50', border: 'border-amber-200', hover: 'hover:bg-amber-950', accent: 'text-amber-600' };
      case 6: return { primary: 'bg-indigo-900', text: 'text-indigo-900', bgLight: 'bg-indigo-50', border: 'border-indigo-200', hover: 'hover:bg-indigo-950', accent: 'text-indigo-500' };
      case 7: return { primary: 'bg-emerald-900', text: 'text-emerald-900', bgLight: 'bg-emerald-50', border: 'border-emerald-200', hover: 'hover:bg-emerald-950', accent: 'text-emerald-500' };
      case 8: return { primary: 'bg-neutral-900', text: 'text-neutral-900', bgLight: 'bg-neutral-100', border: 'border-neutral-200', hover: 'hover:bg-black', accent: 'text-neutral-500' };
      case 9: return { primary: 'bg-teal-900', text: 'text-teal-900', bgLight: 'bg-teal-50', border: 'border-teal-200', hover: 'hover:bg-teal-950', accent: 'text-teal-500' };
      case 10: return { primary: 'bg-orange-900', text: 'text-orange-900', bgLight: 'bg-orange-50', border: 'border-orange-200', hover: 'hover:bg-orange-950', accent: 'text-orange-500' };
      case 11: return { primary: 'bg-lime-900', text: 'text-lime-900', bgLight: 'bg-lime-50', border: 'border-lime-200', hover: 'hover:bg-lime-950', accent: 'text-lime-500' };
      case 12: return { primary: 'bg-fuchsia-900', text: 'text-fuchsia-900', bgLight: 'bg-fuchsia-50', border: 'border-fuchsia-200', hover: 'hover:bg-fuchsia-950', accent: 'text-fuchsia-500' };
      case 13: return { primary: 'bg-cyan-900', text: 'text-cyan-900', bgLight: 'bg-cyan-50', border: 'border-cyan-200', hover: 'hover:bg-cyan-950', accent: 'text-cyan-500' };
      case 14: return { primary: 'bg-pink-900', text: 'text-pink-900', bgLight: 'bg-pink-50', border: 'border-pink-200', hover: 'hover:bg-pink-950', accent: 'text-pink-500' };
      case 15: return { primary: 'bg-violet-900', text: 'text-violet-900', bgLight: 'bg-violet-50', border: 'border-violet-200', hover: 'hover:bg-violet-950', accent: 'text-violet-500' };
      case 16: return { primary: 'bg-sky-900', text: 'text-sky-900', bgLight: 'bg-sky-50', border: 'border-sky-200', hover: 'hover:bg-sky-950', accent: 'text-sky-500' };
      case 17: return { primary: 'bg-emerald-800', text: 'text-emerald-800', bgLight: 'bg-emerald-100', border: 'border-emerald-300', hover: 'hover:bg-emerald-900', accent: 'text-emerald-600' };
      case 18: return { primary: 'bg-rose-800', text: 'text-rose-800', bgLight: 'bg-rose-100', border: 'border-rose-300', hover: 'hover:bg-rose-900', accent: 'text-rose-600' };
      case 19: return { primary: 'bg-zinc-800', text: 'text-zinc-800', bgLight: 'bg-zinc-200', border: 'border-zinc-400', hover: 'hover:bg-zinc-900', accent: 'text-zinc-600' };
      case 20: return { primary: 'bg-indigo-800', text: 'text-indigo-800', bgLight: 'bg-indigo-100', border: 'border-indigo-300', hover: 'hover:bg-indigo-900', accent: 'text-indigo-600' };
      default: return { primary: 'bg-zinc-900', text: 'text-zinc-900', bgLight: 'bg-zinc-100', border: 'border-zinc-200', hover: 'hover:bg-zinc-800', accent: 'text-amber-500' };
    }
  };

  // Dynamic layout structure based on variant (1-10)
  const getLayout = () => {
    switch(variant) {
      case 1: return { main: 'max-w-3xl mx-auto px-6 py-12', hero: 'relative rounded-sm overflow-hidden mb-12 shadow-2xl', text: 'prose prose-lg mx-auto mb-16', solution: 'p-8 md:p-12 rounded-2xl shadow-sm border mb-16', align: 'text-center', reviewsTop: false };
      case 2: return { main: 'max-w-4xl mx-auto px-6 py-16', hero: 'w-full mb-16 rounded-3xl shadow-xl', text: 'max-w-2xl mx-auto text-lg leading-relaxed mb-16', solution: 'grid md:grid-cols-2 gap-12 items-center mb-16', align: 'text-left', reviewsTop: true };
      case 3: return { main: 'max-w-5xl mx-auto px-6 py-12', hero: 'lg:float-right lg:w-1/2 lg:ml-12 mb-8 rounded-xl shadow-lg', text: 'text-xl leading-relaxed mb-12', solution: 'clear-both bg-rose-50 p-10 rounded-3xl mb-16', align: 'text-left', reviewsTop: false };
      case 4: return { main: 'max-w-3xl mx-auto px-6 py-12', hero: 'aspect-video object-cover w-full mb-12 rounded-none', text: 'prose prose-xl font-serif mx-auto mb-16', solution: 'border-l-4 border-slate-900 pl-8 py-4 mb-16', align: 'text-left', reviewsTop: false };
      case 5: return { main: 'max-w-4xl mx-auto px-6 py-12', hero: 'grid grid-cols-2 gap-4 mb-12', text: 'text-center text-lg max-w-2xl mx-auto mb-16', solution: 'bg-amber-900 text-white p-12 rounded-2xl mb-16', align: 'text-center', reviewsTop: true };
      case 6: return { main: 'max-w-3xl mx-auto px-6 py-16', hero: 'rounded-full aspect-square w-2/3 mx-auto mb-16 shadow-2xl object-cover', text: 'prose prose-lg mx-auto mb-16 text-center', solution: 'p-10 rounded-3xl border-2 border-indigo-100 mb-16', align: 'text-center', reviewsTop: false };
      case 7: return { main: 'max-w-5xl mx-auto px-6 py-12', hero: 'lg:sticky lg:top-24 lg:w-5/12 lg:float-left lg:mr-12 mb-8 rounded-2xl', text: 'text-lg leading-relaxed mb-12', solution: 'bg-emerald-50 p-8 rounded-2xl mb-16', align: 'text-left', reviewsTop: false };
      case 8: return { main: 'max-w-3xl mx-auto px-6 py-20', hero: 'w-full aspect-[21/9] object-cover mb-16 grayscale hover:grayscale-0 transition-all duration-700', text: 'prose prose-xl mx-auto mb-20', solution: 'border-y border-neutral-200 py-12 mb-20', align: 'text-justify', reviewsTop: true };
      case 9: return { main: 'max-w-4xl mx-auto px-6 py-12', hero: 'rounded-tl-[4rem] rounded-br-[4rem] overflow-hidden mb-12 shadow-xl', text: 'text-lg leading-relaxed mb-16', solution: 'bg-teal-900 text-teal-50 p-12 rounded-tr-[4rem] rounded-bl-[4rem] mb-16', align: 'text-left', reviewsTop: false };
      case 10: return { main: 'max-w-3xl mx-auto px-6 py-12', hero: 'border-8 border-orange-100 rounded-xl mb-12 rotate-2 hover:rotate-0 transition-all', text: 'prose prose-lg mx-auto mb-16', solution: 'p-8 border-4 border-orange-900 rounded-xl mb-16', align: 'text-center', reviewsTop: true };
      case 11: return { main: 'max-w-4xl mx-auto px-6 py-16', hero: 'w-full mb-16 rounded-[3rem] shadow-2xl', text: 'max-w-2xl mx-auto text-xl leading-relaxed mb-16', solution: 'bg-lime-50 p-12 rounded-[3rem] mb-16', align: 'text-left', reviewsTop: false };
      case 12: return { main: 'max-w-5xl mx-auto px-6 py-12', hero: 'lg:float-left lg:w-1/2 lg:mr-12 mb-8 rounded-3xl shadow-xl', text: 'text-lg leading-relaxed mb-12', solution: 'clear-both border-t-2 border-fuchsia-100 pt-12 mb-16', align: 'text-left', reviewsTop: true };
      case 13: return { main: 'max-w-3xl mx-auto px-6 py-16', hero: 'aspect-[4/3] object-cover w-full mb-12 rounded-2xl shadow-lg', text: 'prose prose-xl font-serif mx-auto mb-16', solution: 'bg-cyan-900 text-white p-10 rounded-2xl mb-16', align: 'text-center', reviewsTop: false };
      case 14: return { main: 'max-w-4xl mx-auto px-6 py-12', hero: 'grid grid-cols-2 gap-6 mb-12', text: 'text-center text-lg max-w-2xl mx-auto mb-16', solution: 'border-2 border-pink-200 p-10 rounded-[2rem] mb-16', align: 'text-center', reviewsTop: true };
      case 15: return { main: 'max-w-3xl mx-auto px-6 py-16', hero: 'rounded-full aspect-square w-3/4 mx-auto mb-16 shadow-xl object-cover border-8 border-violet-50', text: 'prose prose-lg mx-auto mb-16 text-center', solution: 'bg-violet-50 p-10 rounded-[3rem] mb-16', align: 'text-center', reviewsTop: false };
      case 16: return { main: 'max-w-5xl mx-auto px-6 py-12', hero: 'lg:sticky lg:top-24 lg:w-5/12 lg:float-right lg:ml-12 mb-8 rounded-3xl shadow-2xl', text: 'text-lg leading-relaxed mb-12', solution: 'bg-sky-900 text-sky-50 p-10 rounded-3xl mb-16', align: 'text-left', reviewsTop: false };
      case 17: return { main: 'max-w-3xl mx-auto px-6 py-20', hero: 'w-full aspect-[16/9] object-cover mb-16 rounded-none shadow-2xl', text: 'prose prose-xl mx-auto mb-20', solution: 'border-l-8 border-emerald-800 pl-8 py-6 mb-20', align: 'text-justify', reviewsTop: true };
      case 18: return { main: 'max-w-4xl mx-auto px-6 py-12', hero: 'rounded-tr-[4rem] rounded-bl-[4rem] overflow-hidden mb-12 shadow-2xl', text: 'text-lg leading-relaxed mb-16', solution: 'bg-rose-50 p-12 rounded-tl-[4rem] rounded-br-[4rem] mb-16', align: 'text-left', reviewsTop: false };
      case 19: return { main: 'max-w-3xl mx-auto px-6 py-12', hero: 'border-4 border-zinc-200 rounded-2xl mb-12 p-2 bg-white', text: 'prose prose-lg mx-auto mb-16', solution: 'p-10 border border-zinc-200 rounded-2xl shadow-sm mb-16', align: 'text-center', reviewsTop: true };
      case 20: return { main: 'max-w-5xl mx-auto px-6 py-16', hero: 'w-full mb-16 rounded-[2rem] shadow-xl', text: 'max-w-3xl mx-auto text-xl leading-relaxed mb-16', solution: 'grid md:grid-cols-2 gap-12 items-center bg-indigo-50 p-10 rounded-[2rem] mb-16', align: 'text-left', reviewsTop: false };
      default: return { main: 'max-w-3xl mx-auto px-6 py-12', hero: 'relative rounded-sm overflow-hidden mb-12 shadow-2xl', text: 'prose prose-lg mx-auto mb-16', solution: 'p-8 md:p-12 rounded-2xl shadow-sm border mb-16', align: 'text-center', reviewsTop: false };
    }
  };

  const theme = getTheme();
  const layout = getLayout();
  const isDark = variant === 2 || variant === 8 || variant === 19;

  const reviewsSection = (
    <div className="my-12">
      <div className="flex items-center justify-center space-x-1 text-amber-400 mb-4">
        {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-current" />)}
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        {[
          { name: 'Sofía L.', text: 'Esta historia me llegó al corazón. El producto es tan bueno como dicen. Totalmente recomendado.', rating: 5 },
          { name: 'Miguel A.', text: 'Buscaba algo auténtico y lo encontré. La calidad es excepcional y el proceso de compra muy sencillo.', rating: 5 },
        ].map((review, i) => (
          <div key={i} className={`${isDark ? 'bg-zinc-800/30 border-zinc-700' : 'bg-white border-zinc-100'} p-8 rounded-3xl border shadow-sm`}>
            <p className={`text-lg ${isDark ? 'text-zinc-300' : 'text-zinc-700'} italic mb-6 leading-relaxed`}>&quot;{review.text}&quot;</p>
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 ${theme.primary} text-white rounded-full flex items-center justify-center font-bold`}>{review.name.charAt(0)}</div>
              <span className={`font-bold ${isDark ? 'text-white' : 'text-zinc-900'}`}>{review.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen ${isDark ? 'bg-zinc-900 text-zinc-300' : 'bg-[#faf9f6] text-zinc-800'} font-serif pb-24`}>
      {/* Editorial Header */}
      <header className={`py-6 border-b ${isDark ? 'border-zinc-800 bg-zinc-950' : 'border-zinc-200 bg-white'} sticky top-0 z-40`}>
        <div className="max-w-4xl mx-auto px-6 flex justify-between items-center">
          <div className={`font-bold text-2xl tracking-widest uppercase ${isDark ? 'text-white' : 'text-zinc-900'}`}>{data.logoText}</div>
          <div className={`text-sm font-medium ${isDark ? 'text-zinc-400' : 'text-zinc-500'} italic`}>Descubre la diferencia</div>
        </div>
      </header>

      <main className={layout.main}>
        {/* The Hook */}
        <div className={`${layout.align} mb-12`}>
          <h1 className={`text-4xl md:text-5xl font-bold leading-tight ${isDark ? 'text-white' : 'text-zinc-900'} mb-6`}>
            Por fin, la solución que estabas esperando.
          </h1>
          <p className={`text-xl ${isDark ? 'text-zinc-400' : 'text-zinc-600'} italic max-w-2xl ${layout.align === 'text-center' ? 'mx-auto' : ''} leading-relaxed`}>
            &quot;Pasé años buscando algo que realmente funcionara. Hasta que descubrí esto.&quot;
          </p>
        </div>

        {/* Hero Image */}
        {variant === 5 ? (
          <div className={layout.hero}>
 <div className="relative w-full rounded-2xl shadow-lg "> 
              <EnhancedProductGallery 
                product={product}
                accentColor={theme.accent.replace('text-', '#')}
              />
            </div>
 <div className="relative w-full rounded-2xl shadow-lg mt-8 "> 
              <Image src={`https://picsum.photos/400/400?random=${product.id}1`} alt="Detail" fill className="object-cover" referrerPolicy="no-referrer" />
            </div>
          </div>
        ) : (
          <div className={layout.hero}>
 <div className={`relative w-full ${variant === 6 ? ' rounded-full' : variant === 8 ? 'aspect-[21/9]' : 'aspect-[4/3]'} `}> 
              <EnhancedProductGallery 
                product={product}
                accentColor={theme.accent.replace('text-', '#')}
              />
            </div>
            {variant === 1 && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h2 className="text-3xl font-bold text-white mb-2">{product.title}</h2>
                <div className="flex items-center space-x-2 text-white/90">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <span className="text-sm font-medium">({product.reviews} reseñas)</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* The Problem (Agitation) */}
        <div className={`${layout.text} ${isDark ? 'prose-invert text-zinc-300' : 'prose-zinc text-zinc-700'}`}>
          <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-zinc-900'} mb-6 flex items-center ${layout.align === 'text-center' ? 'justify-center' : ''} space-x-3`}>
            <XCircle className="w-6 h-6 text-red-500" />
            <span>El problema con las alternativas tradicionales</span>
          </h3>
          <p className="mb-6">
            Todos hemos estado allí. Gastas dinero en productos que prometen el mundo pero entregan muy poco. Te frustras, pierdes tiempo y, lo peor de todo, el problema original sigue ahí. Las soluciones comunes suelen ser complicadas, ineficaces o simplemente demasiado caras para lo que ofrecen.
          </p>
          <p className={`${isDark ? 'border-zinc-700' : 'border-zinc-300'} font-medium italic border-l-4 pl-4`}>
            ¿No es hora de probar algo diferente? Algo que realmente esté diseñado pensando en ti y en tus necesidades reales.
          </p>
          
          {layout.reviewsTop && reviewsSection}
        </div>

        {/* The Solution (Product Reveal) */}
        <div className={`${layout.solution} ${isDark ? 'bg-zinc-950 border-zinc-800' : variant !== 5 && variant !== 9 && variant !== 3 && variant !== 7 ? 'bg-white border-zinc-100' : ''}`}>
          <div className={variant === 2 ? 'order-last' : ''}>
            <h3 className={`text-3xl font-bold ${isDark || variant === 5 || variant === 9 ? 'text-white' : 'text-zinc-900'} mb-6 flex items-center ${variant === 1 || variant === 5 || variant === 6 || variant === 10 ? 'justify-center' : ''} space-x-3`}>
              <Sparkles className={`w-8 h-8 ${variant === 5 || variant === 9 ? 'text-white' : theme.accent}`} />
              <span>Presentamos {ai?.enhancedTitle || product.title}</span>
            </h3>
            <p className={`text-lg ${isDark || variant === 5 || variant === 9 ? 'text-zinc-300' : 'text-zinc-700'} leading-relaxed mb-8 ${variant === 1 || variant === 5 || variant === 6 || variant === 10 ? 'text-center' : ''}`}>
              {ai?.enhancedDescription || product.description}
            </p>
            
            <div className={`grid ${variant === 1 || variant === 6 || variant === 10 ? 'md:grid-cols-2 gap-8' : 'gap-6'} mb-8`}>
              {(variant === 1 || variant === 6 || variant === 10) && (
                <div className="relative w-full aspect-square rounded-xl overflow-hidden">
                  <Image src={`https://picsum.photos/400/400?random=${product.id}2`} alt="Product Detail" fill className="object-cover" referrerPolicy="no-referrer" />
                </div>
              )}
              <div className="flex flex-col justify-center space-y-6">
                <div className="flex items-start space-x-4">
                  <CheckCircle className={`w-6 h-6 ${variant === 5 || variant === 9 ? 'text-white' : theme.text} shrink-0 mt-1`} />
                  <div>
                    <h4 className={`font-bold ${isDark || variant === 5 || variant === 9 ? 'text-white' : 'text-zinc-900'}`}>Diseño Innovador</h4>
                    <p className={`text-sm ${isDark || variant === 5 || variant === 9 ? 'text-zinc-400' : 'text-zinc-600'} mt-1`}>Creado con los mejores materiales para garantizar durabilidad y eficacia.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className={`w-6 h-6 ${variant === 5 || variant === 9 ? 'text-white' : theme.text} shrink-0 mt-1`} />
                  <div>
                    <h4 className={`font-bold ${isDark || variant === 5 || variant === 9 ? 'text-white' : 'text-zinc-900'}`}>Resultados Rápidos</h4>
                    <p className={`text-sm ${isDark || variant === 5 || variant === 9 ? 'text-zinc-400' : 'text-zinc-600'} mt-1`}>Notarás la diferencia desde el primer uso. Sin esperas interminables.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className={`w-6 h-6 ${variant === 5 || variant === 9 ? 'text-white' : theme.text} shrink-0 mt-1`} />
                  <div>
                    <h4 className={`font-bold ${isDark || variant === 5 || variant === 9 ? 'text-white' : 'text-zinc-900'}`}>Fácil de Usar</h4>
                    <p className={`text-sm ${isDark || variant === 5 || variant === 9 ? 'text-zinc-400' : 'text-zinc-600'} mt-1`}>Intuitivo y diseñado para integrarse perfectamente en tu rutina diaria.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {variant === 2 && (
            <div className="relative w-full aspect-square rounded-3xl shadow-lg overflow-hidden">
              <Image src={`https://picsum.photos/400/400?random=${product.id}3`} alt="Product Detail" fill className="object-cover" referrerPolicy="no-referrer" />
            </div>
          )}
        </div>

        {/* Clearfix for floating layouts */}
        {(variant === 3 || variant === 7) && <div className="clear-both"></div>}

        {/* Rich Content Area */}
        <div className="mt-16 space-y-16">
          <FeatureGrid iconColor={theme.text} bgClass={isDark ? 'bg-zinc-950' : theme.bgLight} />
          
          <GuaranteeBadge />
          
          {!layout.reviewsTop && reviewsSection}
          
          <ComparisonTable productName={ai?.enhancedTitle || product.title} />
          
          <HowItWorks />
        </div>

        {/* The Offer */}
        <div className="text-center mt-16 mb-16">
          <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-zinc-900'} mb-4`}>Transforma tu vida hoy mismo</h3>
          <div className="flex justify-center items-end space-x-4 mb-8">
            <span className={`text-5xl font-bold ${isDark ? 'text-white' : 'text-zinc-900'}`}>{fmtPrice(product.price)}</span>
            <div className="flex flex-col items-start pb-1">
              <span className={`text-lg ${isDark ? 'text-zinc-500' : 'text-zinc-400'} line-through`}>{fmtPrice(product.originalPrice)}</span>
              {product.discount && product.discount > 0 && (
                <span className={`text-sm font-bold ${theme.text}`}>Ahorras {product.discount}%</span>
              )}
            </div>
          </div>
          
          <button 
            onClick={() => document.getElementById('checkout-form')?.scrollIntoView({ behavior: 'smooth' })}
            className={`w-full md:w-auto md:px-12 ${theme.primary} ${theme.hover} text-white font-bold text-lg py-5 rounded-full shadow-xl transition-all transform hover:-translate-y-1 flex items-center justify-center space-x-3 mx-auto`}
          >
            <span>Quiero mi {ai?.enhancedTitle || product.title} ahora</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          <p className={`text-sm ${isDark ? 'text-zinc-400' : 'text-zinc-500'} mt-4 flex items-center justify-center space-x-2`}>
            <Heart className="w-4 h-4 text-red-500" />
            <span>Paga solo cuando lo recibas en casa. Sin riesgos.</span>
          </p>
        </div>

        <TrustBar />

        {/* The Checkout */}
        <div id="checkout-form" className={`mt-16 ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-100'} p-8 md:p-12 rounded-3xl shadow-2xl border relative overflow-hidden`}>
          <div className={`absolute top-0 left-0 w-full h-2 ${theme.primary}`}></div>
          <h3 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-zinc-900'} mb-2 text-center`}>Da el primer paso</h3>
          <p className={`text-center ${isDark ? 'text-zinc-400' : 'text-zinc-600'} mb-8`}>Rellena el formulario y te lo enviamos hoy mismo. Pago contra entrega.</p>
          <InlineCODForm buttonColor={`${theme.primary} ${theme.hover}`} />
        </div>

        <div className="mt-16">
          <FAQSection />
        </div>
      </main>

      {data.pdpFeatures?.stickyButton && <StickyBuyButton buttonColor={theme.primary} />}
      {data.pdpFeatures?.recentSales && <RecentSalesPopup theme={theme} />}
    </div>
  );
}



