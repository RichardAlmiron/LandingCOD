'use client';
import React, { useState } from 'react';
import { StoreData } from '@/lib/types';
import { Search, ShoppingBag, Heart, User, Menu, Star, ChevronDown, MapPin, ArrowRight, Gift, CreditCard, Smartphone, Facebook, Twitter, Instagram, Youtube, Percent, Clock, Box, ShieldCheck, Sparkles, X } from 'lucide-react';

export default function StarStoreTemplate({ data }: { data: StoreData }) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <div className="min-h-full bg-white font-sans text-[#111] selection:bg-[#e01a2b] selection:text-white">
      {/* Top Banner - Urgency & Conversion */}
      <div className="bg-[#e01a2b] text-white text-[11px] md:text-[12px] py-1.5 px-6 flex justify-between items-center font-black uppercase tracking-widest relative z-[110]">
        <div className="hidden md:flex items-center gap-4">
          <Clock className="w-4 h-4" />
          <span>Ends Tomorrow! Extra 20% Off Use Code: <span className="underline cursor-pointer">SPRING</span></span>
        </div>
        <div className="flex-1 text-center md:flex-initial">
          Free Shipping with $25 purchase! <a href="#" className="underline ml-2 hover:opacity-80 transition-opacity">Details</a>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <span>Star Rewards: <span className="text-amber-300">Gold Status</span></span>
          <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
        </div>
      </div>

      <header className="bg-white sticky top-0 z-[100] shadow-sm">
        <div className="max-w-[1440px] mx-auto px-6">
          {/* Main Integrated Header */}
          <div className="py-5 flex items-center justify-between gap-10">
            <div className="flex items-center gap-12">
              <div className="flex flex-col items-center cursor-pointer shrink-0 group">
                <Star className="text-[#e01a2b] fill-[#e01a2b] w-7 h-7 mb-0.5 group-hover:scale-125 transition-transform" />
                <div className="font-extrabold text-4xl tracking-tighter uppercase leading-none text-stone-900">
                  MACY<span className="text-xl align-top mt-1">&apos;</span>S
                </div>
              </div>

              {/* Refined Navigation */}
              <nav className="hidden xl:flex items-center gap-8 font-extrabold text-[13px] uppercase tracking-tighter text-stone-700">
                {['Women', 'Men', 'Kids', 'Home', 'Beauty', 'Shoes', 'Jewelry', 'Sale'].map(item => (
                  <a
                    key={item}
                    href="#"
                    onMouseEnter={() => setActiveCategory(item)}
                    className={`hover:text-[#e01a2b] transition-colors relative pb-1 ${item === 'Sale' ? 'text-[#e01a2b]' : ''}`}
                  >
                    {item}
                  </a>
                ))}
              </nav>
            </div>

            {/* Smart Search */}
            <div className="flex-1 max-w-xl hidden md:block group">
              <div className="relative flex items-center border-[1.5px] border-stone-300 rounded-md bg-stone-50 px-5 py-2.5 focus-within:border-[#e01a2b] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#e01a2b]/5 transition-all">
                <input
                  type="text"
                  placeholder="What are you looking for today?"
                  className="bg-transparent outline-none text-sm w-full font-semibold placeholder:text-stone-400"
                />
                <Search className="w-5 h-5 text-stone-400 cursor-pointer hover:text-[#e01a2b] transition-colors" />
              </div>
            </div>

            {/* Account & Bag icons */}
            <div className="flex items-center gap-8 text-stone-600">
              <div className="hidden lg:flex flex-col items-center cursor-pointer hover:text-[#e01a2b] group">
                <User className="w-6 h-6 group-hover:translate-y-[-2px] transition-transform" />
                <span className="text-[9px] font-black uppercase mt-1 tracking-wider">Account</span>
              </div>
              <div className="hidden lg:flex flex-col items-center cursor-pointer hover:text-[#e01a2b] group">
                <Heart className="w-6 h-6 group-hover:translate-y-[-2px] transition-transform" />
                <span className="text-[9px] font-black uppercase mt-1 tracking-wider">Lists</span>
              </div>
              <div className="relative cursor-pointer hover:text-[#e01a2b] group flex items-center gap-3 bg-stone-50 px-4 py-2 rounded-full border border-stone-100 hover:bg-white hover:shadow-md transition-all">
                <ShoppingBag className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span className="bg-[#e01a2b] text-white text-[10px] font-black px-1.5 py-0.5 rounded-full absolute -top-1 -right-1 ring-2 ring-white shadow-sm">0</span>
                <span className="hidden sm:block text-[11px] font-black uppercase tracking-tighter">Your Bag</span>
              </div>
            </div>
          </div>
        </div>

        {/* Global Utility Sub-bar */}
        <div className="bg-stone-50 border-t border-stone-200 px-6 py-2.5 flex items-center justify-between text-[11px] font-bold uppercase tracking-widest text-[#555]">
          <div className="max-w-[1440px] mx-auto w-full flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex items-center cursor-pointer hover:text-[#e01a2b] group">
                <MapPin className="w-3.5 h-3.5 mr-2 group-hover:scale-125 transition-transform" />
                Seattle Warehouse <span className="ml-2 font-black text-black">Find a store</span>
              </div>
              <div className="h-4 w-px bg-stone-300 hidden md:block" />
              <div className="flex items-center gap-4 hidden md:flex">
                <a href="#" className="hover:text-[#e01a2b]">Gift Registry</a>
                <a href="#" className="hover:text-[#e01a2b]">Star Rewards</a>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-stone-900 font-black">
                <Smartphone className="w-4 h-4" />
                Get 25% Off in the App
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1440px] mx-auto px-6 py-10">
        {/* Cinematic Hero */}
        <div className="relative h-[650px] mb-20 rounded-xl overflow-hidden shadow-2xl group cursor-pointer border border-stone-200">
          <img src={data.bannerImage} alt="Banner" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
          <div className="absolute inset-y-0 left-0 w-full md:w-2/3 flex flex-col justify-center p-16 md:p-24">
            <div className="bg-[#e01a2b] text-white px-4 py-1.5 text-[12px] font-black uppercase tracking-[0.3em] w-fit mb-8 shadow-xl">
              Spring Awakening Sale
            </div>
            <h1 className="text-7xl lg:text-8xl font-black text-white mb-6 uppercase tracking-tighter leading-[0.85] drop-shadow-2xl italic">
              {data.name} <br />
              <span className="not-italic text-[#e01a2b]">Vibes</span>
            </h1>
            <p className="text-2xl font-bold text-white mb-12 uppercase tracking-tight max-w-xl drop-shadow-md selection:bg-white selection:text-black">
              {data.description || "Discover the latest trends in high-fidelity fashion and home essentials. Limited-time specials available now."}
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <button className="bg-white text-black px-16 py-5 font-black uppercase text-[13px] tracking-widest hover:bg-[#e01a2b] hover:text-white transition-all shadow-2xl active:scale-95">
                Shop the Red Box
              </button>
              <button className="border-2 border-white text-white px-16 py-5 font-black uppercase text-[13px] tracking-widest hover:bg-white hover:text-black transition-all backdrop-blur-sm">
                Star Rewards Deals
              </button>
            </div>
          </div>
        </div>

        {/* Rapid Deal Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {[
            { label: 'Limited Time!', title: 'Extra 20% Off Plus Size', img: 'https://picsum.photos/400/400?random=400' },
            { label: 'Bonus!', title: 'Earn $10 for every $50', img: 'https://picsum.photos/400/400?random=401' },
            { label: 'Beauty Box', title: 'Gift with $75 Purchase', img: 'https://picsum.photos/400/400?random=402' },
            { label: 'Flash Sale', title: '60% Off Bed & Bath', img: 'https://picsum.photos/400/400?random=403' },
          ].map((deal, i) => (
            <div key={i} className="flex items-center gap-6 bg-stone-50 p-6 rounded-lg border border-stone-200 hover:shadow-xl transition-all cursor-pointer group group-hover:border-[#e01a2b]">
              <div className="w-20 h-20 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-md">
                <img src={deal.img} alt={deal.title} className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#e01a2b] block mb-1">{deal.label}</span>
                <h4 className="text-sm font-black uppercase tracking-tight leading-tight group-hover:text-[#e01a2b]">{deal.title}</h4>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Product Grid */}
        <div className="mb-32">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 border-b-[4px] border-black pb-6">
            <div>
              <div className="text-[12px] font-black tracking-[0.4em] text-stone-300 mb-2 uppercase">Member Favorites</div>
              <h2 className="text-5xl font-black uppercase tracking-tighter italic leading-none">Limited-Time <span className="text-[#e01a2b]">Specials</span></h2>
            </div>
            <div className="flex gap-2 items-center mt-6 md:mt-0 font-black text-[12px] tracking-widest cursor-pointer group hover:text-[#e01a2b] transition-colors uppercase">
              See All Offers <ArrowRight className="w-5 h-5 group-hover:translate-x-3 transition-transform" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-12 sm:gap-x-12 sm:gap-y-24">
            {data.products.map((product) => (
              <div key={product.id} data-product-id={product.id} className="group cursor-pointer flex flex-col">
                <div className="relative aspect-[3/4] mb-8 overflow-hidden bg-stone-50 rounded-[4px] shadow-sm">
                  <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s]" />
                  <div className="absolute top-5 left-5 flex flex-col gap-2">
                    <div className="bg-[#e01a2b] text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest shadow-xl">
                      Top Rated
                    </div>
                    <div className="bg-black text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest shadow-xl">
                      Special
                    </div>
                  </div>
                  <button className="absolute bottom-6 inset-x-6 bg-white/95 py-4 font-black uppercase text-[11px] tracking-widest translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all shadow-2xl hover:bg-black hover:text-white border-t border-stone-200">
                    Quick View
                  </button>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest text-[#e01a2b]">
                    <span>{product.category || "Designer"}</span>
                    <Heart className="w-4 h-4 text-stone-300 hover:text-[#e01a2b] hover:fill-[#e01a2b]" />
                  </div>
                  <h3 className="text-[14px] font-extrabold text-stone-900 leading-snug group-hover:underline line-clamp-2 min-h-[40px]">
                    {product.title}
                  </h3>
                  <div className="flex items-center gap-1">
                    <div className="flex text-amber-400">
                      {[1, 2, 3, 4, 5].map(v => <Star key={v} className="w-3 h-3 fill-current" />)}
                    </div>
                    <span className="text-[10px] font-bold text-stone-400">(2.4k reviewed)</span>
                  </div>
                  <div className="flex items-end gap-3 pt-2">
                    <span className="text-3xl font-black text-[#e01a2b] tracking-tighter italicSelection:bg-[#e01a2b] selection:text-white">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm font-bold text-stone-300 line-through mb-1.5">${product.originalPrice}</span>
                    )}
                  </div>
                  <div className="text-[10px] font-black text-emerald-600 bg-emerald-50 w-fit px-3 py-1 rounded-full uppercase tracking-tighter">
                    Bonus $10.00 Star Money
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Global Star Rewards Highlight */}
        <div className="bg-black text-white p-12 lg:p-32 rounded-3xl relative overflow-hidden flex flex-col lg:flex-row items-center gap-20 mb-32 shadow-[0_30px_60px_rgba(224,26,43,0.15)] group">
          <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12 transition-transform duration-[5s] group-hover:rotate-0">
            <Star className="w-[600px] h-[600px] fill-current" />
          </div>

          <div className="flex-1 relative z-10 space-y-10 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-4">
              <div className="bg-[#e01a2b] p-3 rounded-2xl shadow-[0_0_30px_rgba(224,26,43,0.5)]">
                <Sparkles className="w-10 h-10 text-white fill-current" />
              </div>
              <h2 className="text-6xl font-black uppercase italic tracking-tighter">Star Rewards</h2>
            </div>
            <h3 className="text-4xl font-black leading-[1.1] max-w-2xl uppercase tracking-tighter">
              The only membership that pays you to <span className="text-[#e01a2b]">Sparkle</span>.
            </h3>
            <p className="text-xl font-medium text-stone-400 max-w-xl leading-relaxed">
              Earn on every purchase, get a birthday surprise, and enjoy Star Money Bonus Days. Platinum members get free shipping with no minimum.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
              <button className="bg-[#e01a2b] text-white px-16 py-5 font-black uppercase text-sm tracking-widest hover:bg-white hover:text-stone-900 transition-all shadow-2xl active:scale-95">
                Join Now for Free
              </button>
              <button className="border-2 border-stone-700 text-white px-16 py-5 font-black uppercase text-sm tracking-widest hover:bg-white hover:text-stone-900 transition-all rounded-md">
                Manage Account
              </button>
            </div>
          </div>

          <div className="w-full lg:w-1/3 aspect-square bg-[#111] rounded-3xl border border-stone-800 p-12 flex flex-col justify-center items-center shadow-2xl transform hover:rotate-2 transition-transform cursor-pointer overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#e01a2b]/20 to-transparent opacity-50" />
            <Star className="w-40 h-40 text-[#e01a2b] fill-[#e01a2b] mb-10 drop-shadow-[0_0_50px_rgba(224,26,43,0.5)] animate-pulse" />
            <div className="text-center relative z-10">
              <div className="text-stone-500 font-black text-[10px] uppercase tracking-[0.5em] mb-4">StarStore Loyalty</div>
              <div className="text-white font-black text-2xl uppercase tracking-tighter italic">SPARKLE PLATINUM</div>
              <div className="mt-8 flex gap-8 justify-center">
                <div className="flex flex-col items-center">
                  <div className="text-2xl font-black text-stone-100">1,250</div>
                  <div className="text-[9px] font-black text-stone-500 uppercase">Points</div>
                </div>
                <div className="h-10 w-px bg-stone-800" />
                <div className="flex flex-col items-center">
                  <div className="text-2xl font-black text-[#e01a2b]">$25</div>
                  <div className="text-[9px] font-black text-stone-500 uppercase">Star Money</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Global Editorial Houses */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-32">
          <div className="group cursor-pointer relative h-[600px] overflow-hidden rounded-2xl">
            <img src="https://picsum.photos/1000/1200?random=404" alt="Ed 1" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-16 left-16 right-16">
              <div className="text-[#e01a2b] font-black text-[12px] uppercase tracking-[0.5em] mb-4">Designer Spotlight</div>
              <h3 className="text-5xl font-black text-white uppercase italic tracking-tighter mb-8 leading-none">The Luxury <br />Fragrance Edit</h3>
              <button className="bg-white text-black px-12 py-4 font-black uppercase text-xs tracking-widest hover:bg-[#e01a2b] hover:text-white transition-all">
                Discover the Scents
              </button>
            </div>
          </div>
          <div className="group cursor-pointer relative h-[600px] overflow-hidden rounded-2xl">
            <img src="https://picsum.photos/1000/1200?random=405" alt="Ed 2" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-16 left-16 right-16">
              <div className="text-[#e01a2b] font-black text-[12px] uppercase tracking-[0.5em] mb-4">Home Curation</div>
              <h3 className="text-5xl font-black text-white uppercase italic tracking-tighter mb-8 leading-none">Hotel Style <br />Bedding Event</h3>
              <button className="bg-[#e01a2b] text-white px-12 py-4 font-black uppercase text-xs tracking-widest hover:bg-white hover:text-black transition-all">
                Shop the Collection
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Corporate Legacy Footer */}
      <footer className="bg-stone-50 border-t border-stone-200 pt-32 pb-16">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="flex flex-col lg:flex-row justify-between mb-32 gap-20">
            <div className="lg:max-w-md space-y-10">
              <div className="flex items-center gap-3">
                <Star className="text-[#e01a2b] fill-[#e01a2b] w-8 h-8" />
                <div className="font-black text-5xl tracking-tighter uppercase leading-none">MACY&apos;S</div>
              </div>
              <p className="text-xl font-bold text-stone-400 italic leading-snug">
                Since 1858, we&apos;ve been the cornerstone of American fashion and heritage. Join us for our next chapter.
              </p>
              <div className="flex gap-8">
                <Facebook className="w-6 h-6 hover:text-[#e01a2b] cursor-pointer" />
                <Instagram className="w-6 h-6 hover:text-[#e01a2b] cursor-pointer" />
                <Twitter className="w-6 h-6 hover:text-[#e01a2b] cursor-pointer" />
                <Youtube className="w-6 h-6 hover:text-[#e01a2b] cursor-pointer" />
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-20 lg:flex-1">
              <div className="space-y-8">
                <h4 className="font-black text-[12px] uppercase tracking-[0.3em] text-stone-900 border-b-2 border-[#e01a2b] w-fit pb-3">Customer Service</h4>
                <nav className="flex flex-col gap-4 text-[11px] font-black uppercase tracking-widest text-stone-500">
                  {['Help Center', 'Order Status', 'Returns & Exchanges', 'Store Pickup', 'Check Gift Card Balance'].map(l => (
                    <a key={l} href="#" className="hover:text-[#e01a2b] transition-colors">{l}</a>
                  ))}
                </nav>
              </div>
              <div className="space-y-8">
                <h4 className="font-black text-[12px] uppercase tracking-[0.3em] text-stone-900 border-b-2 border-stone-900 w-fit pb-3">Stores & Services</h4>
                <nav className="flex flex-col gap-4 text-[11px] font-black uppercase tracking-widest text-stone-500">
                  {['Find a Store', 'Store Events', 'Personal Stylist', 'StarStore Wedding Registry', 'Restaurants'].map(l => (
                    <a key={l} href="#" className="hover:text-[#e01a2b] transition-colors">{l}</a>
                  ))}
                </nav>
              </div>
              <div className="space-y-8 lg:col-span-2 xl:col-span-1">
                <h4 className="font-black text-[12px] uppercase tracking-[0.3em] text-stone-900 border-b-2 border-stone-900 w-fit pb-3">Macy&apos;s Credit Card</h4>
                <nav className="flex flex-col gap-4 text-[11px] font-black uppercase tracking-widest text-stone-500 mb-8">
                  {['Apply Now', 'Pay Your Bill', 'Cardholder Benefits'].map(l => (
                    <a key={l} href="#" className="hover:text-[#e01a2b] transition-colors">{l}</a>
                  ))}
                </nav>
                <div className="bg-stone-100 p-8 rounded-xl space-y-4 border border-stone-200">
                  <span className="font-black text-[10px] uppercase tracking-widest text-[#e01a2b]">Exclusive App Offer</span>
                  <p className="text-[11px] font-bold leading-relaxed text-stone-600">Download the app and get <span className="text-black font-black">25% OFF</span> your first purchase.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-center pt-16 border-t border-stone-200 gap-10">
            <div className="text-[10px] font-black text-stone-400 uppercase tracking-[0.4em]">
              © 2026 MACY&apos;S. ALL RIGHTS RESERVED. REAL FASHION. REAL LIFE.
            </div>
            <div className="flex flex-wrap justify-center gap-10 text-[9px] font-black uppercase tracking-widest text-stone-400">
              <a href="#" className="hover:text-black">Privacy Policy</a>
              <a href="#" className="hover:text-black">Terms of Use</a>
              <a href="#" className="hover:text-black">Ad Choices</a>
              <a href="#" className="hover:text-black">Privacy Choices</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
