'use client';
import React, { useState } from 'react';
import { StoreData } from '@/lib/types';
import { Search, ShoppingBag, Heart, User, Menu, ChevronDown, MapPin, Star, Gift, Sparkles, ArrowRight, X, Phone, Globe, Instagram, Facebook, Box } from 'lucide-react';

export default function ChicStoreTemplate({ data }: { data: StoreData }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-full bg-white font-sans text-black selection:bg-black selection:text-white">
      {/* Top Utility Bar */}
      <div className="bg-zinc-100 text-[10px] md:text-[11px] py-2 px-6 flex justify-between items-center font-bold tracking-widest uppercase border-b border-zinc-200">
        <div className="hidden md:flex items-center gap-6">
          <a href="#" className="hover:opacity-60 transition-opacity">Find a Store</a>
          <a href="#" className="hover:opacity-60 transition-opacity">Gift Registry</a>
          <a href="#" className="hover:opacity-60 transition-opacity">Shipping To: <span className="underline italic">USA</span></a>
        </div>
        <div className="flex-1 text-center md:flex-initial">
          Free Shipping & Free Returns for Loyallists. <a href="#" className="underline hover:opacity-70 transition-opacity">Sign Up</a>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <a href="#" className="hover:opacity-60 transition-opacity">Help</a>
          <a href="#" className="hover:opacity-60 transition-opacity font-black text-blue-600">Loyallist Points: 1,250</a>
        </div>
      </div>

      <header className="bg-white sticky top-0 z-[100]">
        <div className="max-w-[1440px] mx-auto px-6 py-6 md:py-10 flex flex-col items-center">
          {/* Main Logo - Ultra High Fashion */}
          <div className="w-full flex items-center justify-between mb-8">
            <button
              className="lg:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="font-serif text-4xl md:text-6xl tracking-[0.15em] uppercase cursor-pointer flex items-center group">
              BLOOMINGDALE<span className="text-xl md:text-2xl align-top mt-1 md:mt-2 group-hover:rotate-12 transition-transform">&apos;</span>S
            </div>
            <div className="flex items-center space-x-4 md:space-x-8">
              <div className="hidden md:flex items-center group cursor-pointer">
                <User className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-black tracking-widest uppercase border-b border-transparent group-hover:border-black transition-all">Sign In</span>
              </div>
              <div className="hidden md:block relative cursor-pointer group">
                <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </div>
              <div className="relative cursor-pointer group flex items-center gap-2">
                <ShoppingBag className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span className="bg-black text-white text-[9px] font-black px-1.5 py-0.5 rounded-full absolute -top-2 -right-2">0</span>
              </div>
            </div>
          </div>

          {/* Search Integration */}
          <div className="w-full max-w-2xl mb-10 hidden md:block group">
            <div className="relative flex items-center border-b-[1.5px] border-black pb-2 group-focus-within:border-zinc-300 transition-colors">
              <Search className="w-5 h-5 mr-4 text-zinc-400 group-focus-within:text-black" />
              <input
                type="text"
                placeholder="WHAT CAN WE HELP YOU FIND TODAY?"
                className="bg-transparent outline-none text-[11px] font-black tracking-[0.2em] w-full placeholder:text-zinc-300"
              />
              <button className="text-[10px] font-black tracking-widest hover:opacity-50 transition-opacity">BROWSE</button>
            </div>
          </div>

          {/* Navigation - Signature Black Border */}
          <div className="w-full border-t border-black pt-4">
            <nav className="hidden lg:flex items-center justify-center space-x-12 font-black text-[12px] uppercase tracking-[0.25em]">
              {['Designers', 'Women', 'Shoes', 'Handbags', 'Jewelry', 'Men', 'Kids', 'Home', 'Sale'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className={`hover:text-zinc-400 transition-all relative after:absolute after:bottom-[-8px] after:left-0 after:w-0 after:h-[2px] after:bg-black after:transition-all hover:after:w-full ${item === 'Sale' ? 'text-red-600' : ''}`}
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-[1440px] mx-auto px-6">
        {/* Editorial Hero */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 mb-24 items-center">
          <div className="lg:col-span-7 relative group overflow-hidden rounded-[2px]">
            <img src={data.bannerImage} alt="Banner" className="w-full aspect-[4/5] md:aspect-video lg:aspect-square object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" />
            <div className="absolute inset-0 border-[20px] border-white/10 m-6 pointer-events-none" />
          </div>
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-12 bg-black hidden md:block" />
              <span className="text-xs font-black tracking-[0.4em] uppercase text-zinc-400">Limited Edition</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-serif mb-8 tracking-tighter leading-[0.9] uppercase italic">
              {data.name} <br />
              <span className="not-italic text-zinc-300">Spring</span> Edit
            </h1>
            <p className="text-lg font-medium tracking-tight mb-12 text-zinc-500 max-w-md leading-relaxed selection:bg-zinc-900 selection:text-white">
              {data.description || "Discover the curated selection of contemporary luxury and seasonal essentials tailored for the modern silhouette."}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 w-full lg:w-auto">
              <button className="bg-black text-white px-16 py-5 font-black text-[12px] uppercase tracking-[0.3em] hover:bg-zinc-800 transition-all shadow-2xl active:scale-95">
                Shop Now
              </button>
              <button className="border-2 border-black text-black px-16 py-5 font-black text-[12px] uppercase tracking-[0.3em] hover:bg-black hover:text-white transition-all">
                The Lookbook
              </button>
            </div>
          </div>
        </div>

        {/* Categories Bar - Editorial Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-32 border-y border-zinc-100 py-12">
          {['NEW ARRIVALS', 'BEST SELLERS', 'EXCLUSIVE', 'THE LUXURY LIST', 'GIFT GUIDE'].map((cat, i) => (
            <div key={cat} className="flex flex-col items-center group cursor-pointer">
              <div className="w-16 h-16 rounded-full bg-zinc-50 flex items-center justify-center mb-4 group-hover:bg-black group-hover:text-white transition-all shadow-sm">
                <Sparkles className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-black tracking-[0.3em] uppercase transition-colors group-hover:text-zinc-500">{cat}</span>
            </div>
          ))}
        </div>

        {/* Curated Product Grid */}
        <div className="mb-32">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20">
            <div>
              <div className="text-[11px] font-black tracking-[0.5em] text-zinc-300 mb-4 uppercase">Selected Works</div>
              <h2 className="text-5xl font-serif uppercase tracking-tight italic">The New Standard</h2>
            </div>
            <div className="flex gap-1 items-center mt-8 md:mt-0 font-black text-[10px] tracking-[0.2em] group cursor-pointer">
              VIEW THE COLLECTION <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-x-12 sm:gap-y-24">
            {data.products.map((product) => (
              <div key={product.id} data-product-id={product.id} className="group cursor-pointer">
                <div className="relative aspect-[3/4] mb-8 overflow-hidden bg-zinc-50 shadow-sm">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s]"
                  />
                  <div className="absolute top-5 left-5">
                    <div className="bg-white/90 backdrop-blur-sm px-3 py-1 text-[9px] font-black tracking-[0.2em] uppercase border border-black/10 shadow-sm">
                      NEW SEASON
                    </div>
                  </div>
                  <div className="absolute bottom-6 inset-x-6 flex gap-2 translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <button className="flex-1 bg-black text-white px-4 py-3 text-[10px] font-black tracking-widest uppercase hover:bg-zinc-800 shadow-xl">
                      QUICK SHOP
                    </button>
                    <button className="bg-white text-black p-3 hover:bg-zinc-100 border border-zinc-200">
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black tracking-[0.3em] text-zinc-400 uppercase">{product.category || "CONTEMPORARY"}</span>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-zinc-300" />
                      <span className="text-[9px] font-bold text-zinc-300 uppercase underline">In Store</span>
                    </div>
                  </div>
                  <h3 className="text-sm font-black uppercase tracking-widest text-zinc-900 group-hover:text-zinc-500 transition-colors leading-relaxed line-clamp-2 min-h-[40px]">
                    {product.title}
                  </h3>
                  <div className="flex items-center gap-4 pt-1">
                    <span className="font-serif italic text-lg tracking-tight">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-xs text-zinc-300 line-through font-bold decoration-red-500/50">${product.originalPrice}</span>
                    )}
                  </div>
                  <div className="flex gap-1.5 pt-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className={`w-3.5 h-3.5 rounded-full border border-zinc-200 cursor-pointer hover:scale-125 transition-transform ${i === 1 ? 'bg-zinc-900' : i === 2 ? 'bg-zinc-400' : 'bg-zinc-100'}`} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Loyallist Signature Experience */}
        <div className="bg-black text-white rounded-[4px] p-12 md:p-32 mb-32 relative overflow-hidden text-center group">
          <div className="absolute inset-0 opacity-20 pointer-events-none grayscale group-hover:grayscale-0 transition-all duration-1000">
            <div className="absolute -top-20 -left-20 w-80 h-80 bg-zinc-600 rounded-full blur-[100px]" />
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-zinc-800 rounded-full blur-[100px]" />
          </div>
          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            <Star className="w-16 h-16 mb-12 animate-pulse text-zinc-200" />
            <h2 className="text-5xl md:text-7xl font-serif mb-10 tracking-tight italic leading-none">The Loyallist <br /><span className="not-italic text-zinc-500 uppercase text-4xl md:text-5xl tracking-[0.2em]">Universe</span></h2>
            <p className="text-lg font-medium tracking-tight text-zinc-400 mb-16 leading-relaxed max-w-xl">
              Elevate your shopping experience with the membership that defines modern luxury. Earn triple points on every purchase and enjoy worldwide expedited shipping.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full mb-16">
              <div className="flex flex-col items-center gap-3">
                <Box className="w-6 h-6 text-zinc-500" />
                <span className="text-[10px] font-black tracking-widest uppercase">FREE SHIPPING</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <Gift className="w-6 h-6 text-zinc-500" />
                <span className="text-[10px] font-black tracking-widest uppercase">VIP REWARDS</span>
              </div>
              <div className="flex flex-col items-center gap-3">
                <User className="w-6 h-6 text-zinc-500" />
                <span className="text-[10px] font-black tracking-widest uppercase">PERSONAL STYLIST</span>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6 w-full justify-center">
              <button className="bg-white text-black px-16 py-5 font-black text-[12px] uppercase tracking-[0.3em] hover:bg-zinc-200 transition-all shadow-2xl">
                JOIN NOW
              </button>
              <button className="border border-white/30 text-white px-16 py-5 font-black text-[12px] uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all">
                LEARN MORE
              </button>
            </div>
          </div>
        </div>

        {/* Global Designer Houses */}
        <div className="mb-32">
          <div className="text-center mb-24">
            <div className="inline-block border-y border-black py-4 px-12">
              <h2 className="text-5xl font-serif uppercase tracking-widest italic">Designer Houses</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {[
              { name: 'MAISON LUXE', tag: 'PARIS', img: 'https://picsum.photos/800/1000?random=200' },
              { name: 'ATELIER ELITE', tag: 'MILANO', img: 'https://picsum.photos/800/1000?random=201' },
              { name: 'STUDIO AVANT', tag: 'PARIS', img: 'https://picsum.photos/800/1000?random=202' },
            ].map((brand, i) => (
              <div key={i} className="group cursor-pointer flex flex-col">
                <div className="relative aspect-[4/5] overflow-hidden mb-8 shadow-2xl rounded-[1px]">
                  <img src={brand.img} alt={brand.name} className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-12 text-center transform translate-y-10 group-hover:translate-y-0 transition-transform duration-700">
                    <h3 className="text-white text-3xl font-serif tracking-[0.2em] mb-2">{brand.name}</h3>
                    <p className="text-zinc-400 text-[10px] font-black tracking-[0.5em] mb-6">{brand.tag}</p>
                    <span className="text-white text-[9px] font-black tracking-[0.3em] uppercase border-b border-white pb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">Explore Collection</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* High-Fidelity Corporate Footer */}
      <footer className="bg-zinc-50 border-t border-zinc-200 pt-32 pb-16">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="text-center mb-32">
            <div className="font-serif text-6xl tracking-[0.2em] uppercase mb-4">BLOOMINGDALE&apos;S</div>
            <div className="text-[11px] font-black tracking-[0.8em] text-zinc-300 uppercase">LIKE NO OTHER STORE IN THE WORLD</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-32">
            <div className="space-y-10">
              <h4 className="font-black text-[12px] uppercase tracking-[0.3em] border-b border-black pb-4 w-fit">Customer Service</h4>
              <nav className="flex flex-col space-y-5 text-[11px] font-bold text-zinc-400 uppercase tracking-widest">
                {['Help Center', 'Shipping Information', 'Returns & Exchanges', 'Contact Us'].map(l => (
                  <a key={l} href="#" className="hover:text-black transition-colors">{l}</a>
                ))}
              </nav>
            </div>
            <div className="space-y-10">
              <h4 className="font-black text-[12px] uppercase tracking-[0.3em] border-b border-black pb-4 w-fit">My Account</h4>
              <nav className="flex flex-col space-y-5 text-[11px] font-bold text-zinc-400 uppercase tracking-widest">
                {['Sign In / Register', 'Order History', 'Loyallist Rewards', 'My Credit Card'].map(l => (
                  <a key={l} href="#" className="hover:text-black transition-colors">{l}</a>
                ))}
              </nav>
            </div>
            <div className="space-y-10">
              <h4 className="font-black text-[12px] uppercase tracking-[0.3em] border-b border-black pb-4 w-fit">Company Info</h4>
              <nav className="flex flex-col space-y-5 text-[11px] font-bold text-zinc-400 uppercase tracking-widest">
                {['About Us', 'Sustainability', 'Careers', 'Investor Relations'].map(l => (
                  <a key={l} href="#" className="hover:text-black transition-colors">{l}</a>
                ))}
              </nav>
            </div>
            <div className="space-y-10">
              <h4 className="font-black text-[12px] uppercase tracking-[0.3em] border-b border-black pb-4 w-fit">Stay Connected</h4>
              <p className="text-[12px] font-medium text-zinc-500 leading-relaxed italic">
                Subscribe to receive special offers, event invitations, and boutique news.
              </p>
              <div className="flex border-b border-zinc-900 pb-3 group focus-within:border-black">
                <input type="email" placeholder="EMAIL ADDRESS" className="bg-transparent outline-none w-full text-[11px] font-black placeholder:text-zinc-300" />
                <ArrowRight className="w-5 h-5 cursor-pointer hover:translate-x-2 transition-transform" />
              </div>
              <div className="flex gap-8 pt-4">
                <Instagram className="w-5 h-5 cursor-pointer hover:opacity-50" />
                <Facebook className="w-5 h-5 cursor-pointer hover:opacity-50" />
                <Phone className="w-5 h-5 cursor-pointer hover:opacity-50" />
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-20 border-t border-zinc-200 gap-8">
            <div className="text-[10px] font-black tracking-[0.3em] text-zinc-300">
              © 2026 BLOOMINGDALE&apos;S | ALL RIGHTS RESERVED
            </div>
            <div className="flex flex-wrap justify-center gap-10 text-[9px] font-black tracking-[0.2em] text-zinc-400 uppercase">
              <a href="#" className="hover:text-black transition-colors">Privacy</a>
              <a href="#" className="hover:text-black transition-colors">Terms</a>
              <a href="#" className="hover:text-black transition-colors">Accessibility</a>
              <a href="#" className="hover:text-black transition-colors">Site Map</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
