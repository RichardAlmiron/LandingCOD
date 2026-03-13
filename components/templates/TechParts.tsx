'use client';

import React, { useState, useEffect } from 'react';
import { StoreData } from '@/lib/types';
import { Search, ShoppingCart, Heart, User, Menu, Cpu, Monitor, Zap, ChevronDown, Wrench, Smartphone, ArrowRight, Facebook, Twitter, Instagram, Youtube, ShieldCheck, Truck, Microchip, HardDrive, Box, Activity, Layers, Settings, Globe, Clock, ChevronRight, Star, AlertCircle, X } from 'lucide-react';
import { usePagination, ProductPagination } from './shared/Pagination';

export default function TechPartsTemplate({ data }: { data: StoreData }) {
  const [activeCategory, setActiveCategory] = useState('Components');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [favorites, setFavorites] = useState<string[]>([]);
  
  const itemsPerPage = 15; // 3 rows x 5 columns
  const {
    currentPage,
    totalPages,
    paginatedItems,
    handlePageChange,
    totalItems,
  } = usePagination(data.products, itemsPerPage);

  const addToCart = () => {
    setCartCount(prev => prev + 1);
  };

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-full bg-[#f8f9fa] font-mono text-slate-900 selection:bg-[#ff6600] selection:text-white antialiased">
      {/* Industrial Top Bar */}
      <div className="bg-[#002244] text-white py-2 px-8 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest border-b border-white/5">
        <div className="flex gap-8 items-center">
          <span className="flex items-center gap-2 hover:text-[#ff6600] cursor-pointer"><Globe className="w-3 h-3" /> US / EN</span>
          <span className="flex items-center gap-2 hover:text-[#ff6600] cursor-pointer"><Settings className="w-3 h-3" /> TRACK ORDER</span>
          <div className="h-3 w-px bg-white/20 mx-2" />
          <span className="flex items-center gap-2 text-[#ff6600] bg-white/5 px-3 py-1 rounded">
            <Zap className="w-3 h-3 fill-[#ff6600]" /> NEWNEGG+ EXCLUSIVE DEALS
          </span>
        </div>
        <div className="hidden xl:flex gap-8 items-center">
          <span>PC Builder</span>
          <span>Business Account</span>
          <span>TechParts Creators</span>
          <span>Help Center</span>
        </div>
      </div>

      <header className={`sticky top-0 z-[100] transition-all duration-500 bg-[#003366] text-white ${isScrolled ? 'py-4' : 'py-8'}`}>
        <div className="max-w-full mx-auto px-8">
          <div className="flex items-center justify-between gap-12">
            {/* Logo */}
            <div className="flex items-center gap-12 shrink-0">
              <div className="flex items-center cursor-pointer group">
                <span className="font-black text-4xl tracking-tighter uppercase leading-none flex items-center">
                  NEW<span className="text-[#ff6600] group-hover:drop-shadow-[0_0_10px_rgba(255,102,0,0.5)] transition-all">EGG</span>
                </span>
              </div>

              <button className="hidden lg:flex items-center gap-3 bg-white/10 px-6 py-3 rounded-md font-bold text-[11px] uppercase tracking-widest hover:bg-[#ff6600] transition-all border border-white/5">
                <Menu className="w-4 h-4" />
                SHOP DEPARTMENTS
              </button>
            </div>

            {/* Technical Search Bar */}
            <div className="flex-1 max-w-3xl hidden md:block">
              <div className="relative group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-focus-within:text-[#ff6600] transition-colors" />
                <input
                  type="text"
                  placeholder="I'M SEARCHING FOR... (E.G. RTX 5090, 64GB DDR5, AM5 MOTHERBOARD)"
                  className="w-full bg-white/5 border border-white/10 py-4 pl-14 pr-32 rounded-lg text-[12px] font-bold outline-none focus:bg-white focus:text-[#003366] focus:border-[#ff6600] transition-all placeholder:text-white/20 shadow-inner"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#ff6600] text-white px-6 py-2 rounded font-black text-[10px] uppercase shadow-lg hover:bg-white hover:text-orange-600 transition-all">
                  Search
                </button>
              </div>
            </div>

            {/* Right Hardware Actions */}
            <div className="flex items-center gap-8">
              <div className="hidden xl:flex flex-col items-center cursor-pointer group">
                <Activity className="w-6 h-6 text-white/60 group-hover:text-[#ff6600] transition-colors" />
                <span className="text-[9px] font-black uppercase mt-1 tracking-widest opacity-40 group-hover:opacity-100">Compare</span>
              </div>
              <div className="hidden lg:flex flex-col items-center cursor-pointer group">
                <User className="w-6 h-6 text-white/60 group-hover:text-[#ff6600] transition-colors" />
                <span className="text-[9px] font-black uppercase mt-1 tracking-widest opacity-40 group-hover:opacity-100">Sign In</span>
              </div>
              <div 
                onClick={() => toggleFavorite('header')}
                className="relative cursor-pointer group hidden sm:block"
              >
                <Heart className={`w-6 h-6 ${favorites.length > 0 ? 'fill-red-500 text-red-500' : ''}`} />
                {favorites.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[9px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#003366] shadow-xl">
                    {favorites.length}
                  </span>
                )}
              </div>
              <div 
                onClick={addToCart}
                className="relative cursor-pointer group bg-white/5 p-3 rounded-lg hover:bg-[#ff6600] transition-all border border-white/10"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#ff6600] text-white text-[9px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#003366] shadow-xl">
                    {cartCount}
                  </span>
                )}
              </div>
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-full mx-auto p-8 lg:p-12">
        {/* High-Performance Hero */}
        <section className="relative h-[650px] mb-12 overflow-hidden rounded-[2rem] group shadow-[0_40px_80px_-15px_rgba(0,51,102,0.3)] border-b-8 border-[#ff6600]">
          <img
            src={data.bannerImage || "https://images.unsplash.com/photo-1587202377425-876ae33cf0b5?auto=format&fit=crop&q=80"}
            alt="Hardware Campaign"
            className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-[6000ms] brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#001122] via-[#003366]/40 to-transparent" />

          <div className="absolute inset-0 flex flex-col items-start justify-center p-12 lg:p-24 text-white">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-[#ff6600] text-white px-6 py-2 font-black text-[10px] uppercase tracking-[0.3em] shadow-2xl flex items-center gap-2">
                <Cpu className="w-4 h-4" /> BATTLE-READY HARDWARE
              </div>
              <div className="bg-white/10 backdrop-blur-md text-white px-6 py-2 font-black text-[10px] uppercase tracking-[0.3em] flex items-center gap-2 border border-white/20">
                <Clock className="w-4 h-4" /> LIMITED STOCK
              </div>
            </div>

            <h1 className="text-8xl font-black uppercase tracking-tighter mb-6 leading-[0.85] drop-shadow-2xl max-w-4xl">
              {data.name}
            </h1>
            <p className="text-xl font-bold uppercase mb-12 text-blue-100/70 max-w-2xl leading-relaxed tracking-widest border-l-4 border-[#ff6600] pl-6">
              {data.description}
            </p>

            <div className="flex flex-wrap gap-6 pt-4">
              <button className="bg-[#ff6600] text-white px-16 py-5 rounded font-black uppercase text-lg hover:bg-white hover:text-[#003366] transition-all transform hover:-translate-y-2 shadow-[0_20px_40px_rgba(255,102,0,0.3)]">
                Upgrade My Build
              </button>
              <button className="bg-white/10 backdrop-blur-xl text-white border border-white/20 px-16 py-5 rounded font-black uppercase text-lg hover:bg-white hover:text-[#003366] transition-all">
                Full Specs
              </button>
            </div>
          </div>

          {/* Tech Spec Overlay Sidebar */}
          <div className="absolute right-12 bottom-12 hidden lg:flex flex-col gap-4">
            <div className="bg-black/60 backdrop-blur-md p-6 rounded-2xl border border-white/10 w-64 space-y-4">
              <div className="flex justify-between items-center text-[10px] font-black uppercase text-white/40">
                <span>Core Clock</span>
                <span className="text-[#ff6600]">4.8GHz</span>
              </div>
              <div className="h-1 bg-white/10 overflow-hidden">
                <div className="w-[85%] h-full bg-[#ff6600] animate-pulse" />
              </div>
              <div className="flex justify-between items-center text-[10px] font-black uppercase text-white/40">
                <span>VRAM Cap</span>
                <span className="text-[#ff6600]">24GB</span>
              </div>
              <div className="h-1 bg-white/10 overflow-hidden">
                <div className="w-[92%] h-full bg-[#ff6600]" />
              </div>
            </div>
          </div>
        </section>

        {/* Industrial Navigation Grid */}
        <section className="mb-24">
          <div className="flex flex-col xl:flex-row xl:items-end justify-between mb-12 gap-8 border-b-8 border-[#003366] pb-10">
            <div className="space-y-4">
              <h2 className="text-6xl font-black uppercase tracking-tighter flex items-center gap-5 leading-none text-[#003366]">
                <Microchip className="w-14 h-14 text-[#ff6600]" /> CORE COMPONENTS
              </h2>
              <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.5em]">Enterprise-grade hardware inventory for builders & enthusiasts</p>
            </div>

            {/* Dept Filter */}
            <div className="flex flex-wrap gap-4">
              {['Components', 'Laptops', 'Gaming', 'Storage', 'Monitors', 'Peripherals'].map(dept => (
                <button
                  key={dept}
                  onClick={() => setActiveCategory(dept)}
                  className={`px-8 py-3 rounded font-black uppercase text-[10px] tracking-[0.2em] transition-all border-2 ${activeCategory === dept ? 'bg-[#ff6600] border-[#ff6600] text-white shadow-xl translate-y--1' : 'bg-white text-slate-400 border-slate-200 hover:border-[#ff6600] hover:text-[#ff6600]'
                    }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {paginatedItems.map((product: any, idx: number) => (
              <div key={product.id || idx} data-product-id={product.id} className="group cursor-pointer flex flex-col bg-white border border-slate-200 hover:border-[#ff6600] hover:shadow-[0_40px_80px_-15px_rgba(0,51,102,0.15)] transition-all duration-500 rounded-2xl overflow-hidden">
                <div className="relative aspect-square overflow-hidden bg-white p-10 flex items-center justify-center">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-full object-contain transform scale-100 group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Action Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <div className="bg-[#003366] text-white text-[9px] font-black uppercase px-3 py-1.5 flex items-center gap-2 rounded">
                      <Zap className="w-3 h-3 fill-white" /> NEWNEGG+
                    </div>
                    {product.originalPrice && (
                      <div className="bg-red-600 text-white text-[9px] font-black uppercase px-3 py-1.5 rounded">
                        SAVE {Math.round((1 - Number(product.price) / Number(product.originalPrice)) * 100)}%
                      </div>
                    )}
                  </div>

                  {/* Wishlist Button */}
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }}
                    className="absolute top-4 right-4 p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                  >
                    <Heart className={`w-4 h-4 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>

                  {/* Subtle Grid Pattern Overlay */}
                  <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]}" />
                </div>

                <div className="p-8 space-y-4 flex-1 flex flex-col border-t border-slate-100">
                  <div className="flex justify-between items-start">
                    <div className="text-[10px] font-black uppercase tracking-widest text-[#ff6600]">
                      {product.category}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
                      <span className="text-[10px] font-black text-green-600 uppercase tracking-tighter italic">Official Stock</span>
                    </div>
                  </div>

                  <h3 className="font-bold uppercase text-slate-800 text-[12px] leading-tight line-clamp-3 min-h-[3.3rem] group-hover:text-[#ff6600] transition-colors tracking-tight">
                    {product.title}
                  </h3>

                  <div className="pt-6 border-t border-slate-50 mt-auto flex flex-col gap-6">
                    <div className="flex flex-col">
                      <div className="flex items-baseline gap-3">
                        <span className="text-4xl font-black tracking-tighter text-[#003366] leading-none">${product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-slate-300 line-through font-bold">${product.originalPrice}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-3 text-green-600 font-black text-[9px] uppercase tracking-widest bg-green-50 px-3 py-1 w-fit rounded">
                        <Truck className="w-3 h-3" /> Free Global Shipping
                      </div>
                    </div>

                    <button 
                      onClick={(e) => { e.stopPropagation(); addToCart(); }}
                      className="w-full bg-[#003366] text-white py-4 rounded font-black uppercase text-[10px] tracking-[0.2em] hover:bg-[#ff6600] transition-all shadow-xl flex items-center justify-center gap-3"
                    >
                      <ShoppingCart className="w-4 h-4" /> Add to Workshop
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-10">
              <ProductPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
              />
            </div>
          )}

          <div className="flex justify-center mt-20">
            <button className="border-2 border-[#003366] px-20 py-5 font-black uppercase text-[12px] tracking-[0.4em] hover:bg-[#003366] hover:text-white transition-all text-[#003366]">
              Load Entire Inventory
            </button>
          </div>
        </section>

        {/* Technical Grid / PC Builder Module */}
        <section className="bg-[#003366] rounded-[3rem] overflow-hidden relative group shadow-[0_60px_100px_rgba(0,51,102,0.4)] border-b-[20px] border-[#ff6600]">
          <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')] pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-center">
            <div className="flex-1 p-12 lg:p-24 space-y-12 relative z-10 text-white">
              <div className="flex flex-col items-start gap-4">
                <div className="bg-[#ff6600] p-4 rounded-xl shadow-2xl">
                  <Wrench className="w-12 h-12 text-white" />
                </div>
                <div className="h-px w-24 bg-white/20" />
              </div>

              <h2 className="text-7xl font-black uppercase tracking-tighter leading-none">
                ADVANCED <br /><span className="text-[#ff6600]">PC BUILDER</span>
              </h2>

              <p className="text-blue-100/60 text-lg font-medium leading-relaxed max-w-xl border-l-2 border-[#ff6600]/30 pl-8">
                The most sophisticated compatibility engine in the industry. Design your next-gen workstation or elite gaming rig with real-time hardware validation.
              </p>

              <div className="grid grid-cols-2 gap-8 py-8 opacity-80">
                <div className="flex items-center gap-4">
                  <Layers className="w-6 h-6 text-[#ff6600]" />
                  <span className="text-[11px] font-black uppercase tracking-widest">REAL-TIME STOCK</span>
                </div>
                <div className="flex items-center gap-4">
                  <Settings className="w-6 h-6 text-[#ff6600]" />
                  <span className="text-[11px] font-black uppercase tracking-widest">COMPATIBILTY CHECK</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-8 pt-6">
                <button className="bg-[#ff6600] text-white px-16 py-6 rounded font-black uppercase text-xl italic hover:bg-white hover:text-[#003366] transition-all transform hover:-translate-y-2 shadow-2xl">
                  Initiate Build
                </button>
                <button className="border border-white/20 text-white px-16 py-6 rounded font-black uppercase text-xl hover:bg-white hover:text-[#003366] transition-all">
                  Saved Layouts
                </button>
              </div>
            </div>

            <div className="flex-1 relative h-[700px] w-full mt-12 lg:mt-0">
              <img src="https://images.unsplash.com/photo-1591405351990-4726e331f141?auto=format&fit=crop&q=80" className="w-full h-full object-cover grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-[2000ms]" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#003366] via-transparent to-transparent" />

              {/* Floating Interactive Elements */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-12 space-y-12">
                {[
                  { part: 'Processor', model: 'CORE i9-14900K', status: 'COMPATIBLE' },
                  { part: 'Memory', model: '64GB DDR5-8000', status: 'OPTIMIZED' },
                  { part: 'Graphics', model: 'RTX 5090 FOUNDERS', status: 'IN STOCK' },
                ].map((item, i) => (
                  <div key={i} className="bg-white/10 backdrop-blur-3xl p-8 border border-white/20 rounded-2xl flex justify-between items-center transform translate-x-20 group-hover:translate-x-0 transition-transform duration-1000" style={{ transitionDelay: `${i * 200}ms` }}>
                    <div>
                      <div className="text-[10px] font-black uppercase text-white/40 mb-1">{item.part}</div>
                      <div className="text-xl font-black text-white tracking-widest">{item.model}</div>
                    </div>
                    <div className="text-green-400 font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4" /> {item.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Global Hub Connect */}
        <section className="py-32 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white p-16 rounded-[3rem] border-2 border-slate-100 space-y-10 group hover:border-[#ff6600] transition-colors">
            <div className="w-16 h-16 bg-[#ff6600] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Smartphone className="w-8 h-8 text-white" />
            </div>
            <div className="space-y-4">
              <h3 className="text-4xl font-black uppercase tracking-tighter text-[#003366]">TECHPARTS MOBILE LAB</h3>
              <p className="text-slate-500 font-bold uppercase text-[11px] leading-relaxed tracking-widest max-w-md">Access your workshop parameters and inventory procurement from anywhere. Real-time drops and alert synchronization.</p>
            </div>
            <div className="flex gap-4">
              <button className="bg-[#003366] text-white px-10 py-4 rounded font-black uppercase text-[11px] tracking-widest hover:bg-[#ff6600] transition-colors">App Store</button>
              <button className="bg-[#003366] text-white px-10 py-4 rounded font-black uppercase text-[11px] tracking-widest hover:bg-[#ff6600] transition-colors">Play Store</button>
            </div>
          </div>

          <div className="bg-[#ff6600] p-16 rounded-[3rem] space-y-10 group text-white">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Zap className="w-8 h-8 text-[#ff6600] fill-[#ff6600]" />
            </div>
            <div className="space-y-4">
              <h3 className="text-4xl font-black uppercase tracking-tighter">SHELL SHOCKER PULSE</h3>
              <p className="text-white/70 font-bold uppercase text-[11px] leading-relaxed tracking-widest max-w-md">Critical price drops on high-demand hardware. Don't let your desired components slip into legacy status.</p>
            </div>
            <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest border-t border-white/20 pt-8">
              <AlertCircle className="w-5 h-5" /> NEXT DROP IN: 04:22:15
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#001122] text-white pt-32 pb-16 border-t-[32px] border-[#003366]">
        <div className="max-w-full mx-auto px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-24 mb-32">
            <div className="space-y-12">
              <div className="flex items-center cursor-pointer group">
                <span className="font-black text-4xl tracking-tighter uppercase leading-none text-white">
                  NEW<span className="text-[#ff6600]">EGG</span>
                </span>
              </div>
              <p className="text-white/40 font-bold uppercase text-[11px] leading-relaxed tracking-[0.2em] max-w-xs">
                The leading tech-focused e-retailer in North America, with a global reach in over 50 countries. Dedicated to industrial-grade logistics and tech passion.
              </p>
              <div className="flex gap-6">
                {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                  <a key={i} href="#" className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-[#ff6600] transition-all group">
                    <Icon className="w-5 h-5 group-hover:scale-110 transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-10">
              <h4 className="text-[#ff6600] font-black uppercase text-sm tracking-[0.3em]">PRO SERVICE</h4>
              <nav className="flex flex-col gap-6 text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
                {['Help Center', 'Track Order', 'Return Policy', 'Order History', 'RMA Status', 'International Shipping'].map(l => (
                  <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>
                ))}
              </nav>
            </div>

            <div className="space-y-10">
              <h4 className="text-[#ff6600] font-black uppercase text-sm tracking-[0.3em]">RESOURCES</h4>
              <nav className="flex flex-col gap-6 text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
                {['PC Builder', 'Shell Shocker', 'Marketplace', 'EggBox Deals', 'Trade-In Program', 'Corporate Sales'].map(l => (
                  <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>
                ))}
              </nav>
            </div>

            <div className="space-y-10">
              <h4 className="text-[#ff6600] font-black uppercase text-sm tracking-[0.3em]">DATA SYNC</h4>
              <p className="text-white/40 font-bold uppercase text-[11px] leading-relaxed tracking-[0.2em]">
                Initialize subscription to receive technical updates and hardware drops.
              </p>
              <div className="relative group">
                <input
                  type="email"
                  placeholder="ENGINEER@BUILD.PRO"
                  className="w-full bg-transparent border-b-2 border-white/10 py-4 font-black text-[11px] tracking-[0.3em] outline-none focus:border-[#ff6600] transition-all uppercase"
                />
                <button className="absolute right-0 bottom-4 text-[#ff6600] hover:text-white transition-colors">
                  <ArrowRight className="w-6 h-6" />
                </button>
              </div>
              <div className="flex items-center gap-4 text-[9px] font-black uppercase text-white/20">
                <Box className="w-4 h-4" /> SECURE PROCUREMENT CHANNEL
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-10 pt-16 border-t border-white/5 text-[9px] font-black uppercase tracking-[0.4em] text-white/20">
            <p>© 2026 TECHPARTS INC. ALL LOGISTICAL PARAMETERS RESERVED.</p>
            <div className="flex flex-wrap justify-center gap-10">
              <a href="#" className="hover:text-white transition-colors">Privacy Protocol</a>
              <a href="#" className="hover:text-white transition-colors">Legal Terms</a>
              <a href="#" className="hover:text-white transition-colors">Transparency</a>
              <a href="#" className="hover:text-white transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
