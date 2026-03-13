'use client';

import React, { useState, useEffect } from 'react';
import { StoreData } from '@/lib/types';
import { Search, ShoppingBag, User, Menu, ArrowRight, MapPin, IceCream, Star, Instagram, Twitter, Facebook, Youtube, ChevronDown, Plus, Minus, X, Clock, Globe, Shield, Heart } from 'lucide-react';
import { usePagination, ProductPagination } from './shared/Pagination';

export default function StreetBoutiqueTemplate({ data }: { data: StoreData }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('New Arrivals');
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
    <div className="min-h-full bg-white font-sans text-stone-900 selection:bg-stone-900 selection:text-white antialiased">
      {/* Ghostly Top Bar */}
      <div className="bg-white border-b border-stone-100 py-3 px-8 flex justify-between items-center text-[9px] font-bold uppercase tracking-[0.25em] text-stone-400">
        <div className="flex gap-6">
          <span className="flex items-center gap-1.5 hover:text-stone-900 cursor-pointer transition-colors"><Globe className="w-2.5 h-2.5" /> US / USD</span>
          <span className="hover:text-stone-900 cursor-pointer transition-colors">Find a Store</span>
        </div>
        <div className="flex gap-6 animate-pulse">
          <span>StreetBoutique Loyalty: Sign in for Early Access</span>
        </div>
        <div className="flex gap-6">
          <span className="hover:text-stone-900 cursor-pointer transition-colors">Help</span>
        </div>
      </div>

      <header className={`sticky top-0 z-[100] transition-all duration-700 bg-white/95 backdrop-blur-xl ${isScrolled ? 'h-16 border-b border-stone-200' : 'h-28 border-b border-stone-100'}`}>
        <div className="max-w-full mx-auto px-10 h-full flex items-center justify-between">
          {/* Main Navigation */}
          <nav className="hidden lg:flex items-center gap-10 font-bold text-[10px] uppercase tracking-[0.3em] text-stone-400">
            {['Mens', 'Womens', 'Kids', 'Footwear'].map(item => (
              <a key={item} href="#" className="hover:text-stone-900 transition-all relative group py-2">
                {item}
                <span className="absolute bottom-0 left-0 w-full h-px bg-stone-900 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </a>
            ))}
          </nav>

          {/* Logo - Centered if possible in CSS, but here kept standard */}
          <div className="flex items-center justify-center cursor-pointer group">
            <span className={`font-serif uppercase tracking-[0.6em] transition-all duration-700 leading-none ${isScrolled ? 'text-2xl' : 'text-5xl'}`}>
              StreetBoutique
            </span>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-10 font-bold text-[10px] uppercase tracking-[0.3em] text-stone-400">
            <nav className="hidden xl:flex items-center gap-10">
              {['Treats', 'Editorial', 'Loyalty'].map(item => (
                <a key={item} href="#" className="hover:text-stone-900 transition-all relative group py-2">
                  {item}
                  <span className="absolute bottom-0 left-0 w-full h-px bg-stone-900 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-8 text-stone-900">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-1 hover:text-stone-600 transition-colors"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <Search className="w-4 h-4 cursor-pointer hover:opacity-50 transition-opacity hidden sm:block" />
              <div 
                onClick={() => toggleFavorite('header')}
                className="relative cursor-pointer group hidden sm:block"
              >
                <Heart className={`w-5 h-5 ${favorites.length > 0 ? 'fill-red-500 text-red-500' : ''}`} />
                {favorites.length > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[8px] font-black w-4 h-4 flex items-center justify-center rounded-full">{favorites.length}</span>
                )}
              </div>
              <div 
                onClick={addToCart}
                className="relative cursor-pointer group"
              >
                <ShoppingBag className="w-5 h-5 group-hover:opacity-50 transition-all" />
                <span className="absolute -top-1.5 -right-2 bg-stone-900 text-white text-[8px] font-black w-4 h-4 flex items-center justify-center rounded-full">{cartCount}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Editorial-Grade Hero */}
        <section className="relative h-screen min-h-[800px] overflow-hidden group">
          <img
            src={data.bannerImage || "https://images.unsplash.com/photo-1594938291221-94f18cbb5660?auto=format&fit=crop&q=80"}
            alt="Main Campaign"
            className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-[6000ms]"
          />
          <div className="absolute inset-0 bg-stone-900/10" />

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-10">
            <div className="max-w-3xl space-y-8">
              <span className="inline-block font-bold text-[10px] uppercase tracking-[0.5em] text-white bg-black/20 backdrop-blur-md px-6 py-2 rounded-full mb-8">
                The Archive Edition
              </span>
              <h1 className="text-white text-7xl md:text-9xl font-serif uppercase tracking-[0.2em] leading-tight drop-shadow-2xl">
                {data.name}
              </h1>
              <p className="text-white text-sm font-bold uppercase tracking-[0.4em] max-w-2xl mx-auto opacity-90 leading-relaxed shadow-stone-900 text-shadow">
                {data.description}
              </p>
              <div className="pt-12 flex flex-wrap justify-center gap-8">
                <button className="bg-white text-stone-900 px-16 py-5 font-bold uppercase text-[10px] tracking-[0.4em] hover:bg-stone-900 hover:text-white transition-all duration-700 shadow-2xl">
                  Shop Collection
                </button>
                <button className="bg-stone-900/40 backdrop-blur-xl text-white border border-white/20 px-16 py-5 font-bold uppercase text-[10px] tracking-[0.4em] hover:bg-white hover:text-stone-900 transition-all duration-700">
                  Read Editorial
                </button>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-px h-16 bg-gradient-to-t from-white to-transparent" />
          </div>
        </section>

        {/* Curated Feed Section */}
        <section className="max-w-full mx-auto px-10 py-32 bg-stone-50/50">
          <div className="flex flex-col items-center mb-24 space-y-6">
            <h2 className="text-4xl font-serif uppercase tracking-[0.4em] text-stone-900">Now Available ({totalItems})</h2>
            <div className="flex gap-12 font-bold text-[10px] uppercase tracking-[0.3em] text-stone-300">
              {['New Arrivals', 'Mens', 'Womens', 'Footwear'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`transition-all relative py-2 ${activeTab === tab ? 'text-stone-900' : 'hover:text-stone-500'}`}
                >
                  {tab}
                  <div className={`absolute bottom-0 left-0 w-full h-[2px] bg-stone-900 transition-transform duration-700 ${activeTab === tab ? 'scale-x-100' : 'scale-x-0'}`} />
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-24">
            {paginatedItems.map((product: any, idx: number) => (
              <div key={product.id || idx} data-product-id={product.id} className="group cursor-pointer flex flex-col">
                <div className="relative aspect-[3/4] mb-8 overflow-hidden bg-white">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-1000"
                  />

                  {/* Subtle Action Overlays */}
                  <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-700 bg-white/80 backdrop-blur-md">
                    <button 
                      onClick={(e) => { e.stopPropagation(); addToCart(); }}
                      className="w-full bg-stone-900 text-white py-4 font-bold uppercase text-[9px] tracking-[0.3em] hover:bg-stone-700 transition-colors"
                    >
                      Quick Add
                    </button>
                  </div>

                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }}
                    className="absolute top-4 right-4 p-2 bg-white/50 backdrop-blur rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                  >
                    <Heart className={`w-4 h-4 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>

                  {product.originalPrice && (
                    <div className="absolute top-6 left-6 font-bold text-[8px] uppercase tracking-[0.3em] bg-stone-900 text-white px-3 py-1.5 grayscale">
                      Reduced
                    </div>
                  )}
                </div>

                <div className="space-y-3 flex flex-col items-center text-center">
                  <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-stone-400">{product.category}</span>
                  <h3 className="text-[12px] font-serif uppercase tracking-[0.2em] text-stone-900 line-clamp-2 h-[2.5rem] leading-relaxed group-hover:opacity-50 transition-opacity px-4">
                    {product.title}
                  </h3>
                  <div className="flex items-center gap-3 pt-2">
                    <span className="text-[11px] font-bold tracking-[0.3em] text-stone-900">${product.price}.00</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-16">
              <ProductPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
              />
            </div>
          )}

          <div className="flex justify-center mt-32">
            <button className="border border-stone-200 px-20 py-5 font-bold uppercase text-[10px] tracking-[0.4em] hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-all duration-700 text-stone-500">
              View All Featured
            </button>
          </div>
        </section>

        {/* Cinematic Grid / Editorial */}
        <section className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative h-[800px] overflow-hidden group border-r border-white">
            <img src="https://images.unsplash.com/photo-1550246140-5119ae4790b8?auto=format&fit=crop&q=80" alt="StreetBoutique Summer" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[4000ms]" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-20 text-center">
              <span className="font-bold text-[10px] uppercase tracking-[0.5em] text-white/80 mb-6">Collections</span>
              <h2 className="text-white text-5xl font-serif uppercase tracking-[0.3em] mb-10 leading-tight">Summer <br />Archive</h2>
              <button className="border-b-2 border-white text-white font-bold uppercase text-[10px] tracking-[0.4em] pb-3 hover:opacity-50 transition-opacity">
                Explore The Lookbook
              </button>
            </div>
          </div>
          <div className="relative h-[800px] overflow-hidden group">
            <img src="https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80" alt="StreetBoutique Footwear" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[4000ms]" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-20 text-center">
              <span className="font-bold text-[10px] uppercase tracking-[0.5em] text-white/80 mb-6">Partnerships</span>
              <h2 className="text-white text-5xl font-serif uppercase tracking-[0.3em] mb-10 leading-tight">Elite <br />Footwear</h2>
              <button className="border-b-2 border-white text-white font-bold uppercase text-[10px] tracking-[0.4em] pb-3 hover:opacity-50 transition-opacity">
                Shop Collaboration
              </button>
            </div>
          </div>
        </section>

        {/* StreetBoutique Treats - Boutique Cafe Experience */}
        <section className="py-32 bg-stone-900 overflow-hidden relative group/treats">
          {/* Parallax Floating Text */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03] select-none">
            <span className="text-[25rem] font-serif uppercase tracking-tighter block whitespace-nowrap -ml-40 text-white">TREATS</span>
          </div>

          <div className="max-w-7xl mx-auto px-10 relative z-10 flex flex-col lg:flex-row items-center gap-24">
            <div className="flex-1 space-y-12">
              <div className="flex items-center gap-6">
                <IceCream className="w-12 h-12 text-white" />
                <div className="h-px w-24 bg-white/20" />
              </div>
              <h2 className="text-white text-6xl font-serif uppercase tracking-[0.2em] leading-tight group-hover/treats:tracking-[0.25em] transition-all duration-1000">
                StreetBoutique <br /><span className="text-stone-500">TREATS</span>
              </h2>
              <p className="text-stone-400 text-lg font-medium leading-relaxed max-w-xl">
                The world's premium cereal bar and cafe. Melding luxury aesthetics with the nostalgia of artisanal dairy and breakfast icons.
              </p>
              <div className="flex gap-8">
                <button className="bg-white text-stone-900 px-14 py-5 font-bold uppercase text-[10px] tracking-[0.4em] hover:bg-stone-300 transition-all shadow-xl">
                  Order Online
                </button>
                <button className="border border-white/20 text-white px-14 py-5 font-bold uppercase text-[10px] tracking-[0.4em] hover:bg-white hover:text-stone-900 transition-all">
                  Full Menu
                </button>
              </div>
            </div>

            <div className="flex-1 relative">
              <div className="relative z-20 aspect-square overflow-hidden rounded-[2rem] shadow-[0_50px_100px_rgba(0,0,0,0.5)] border border-white/10">
                <img src="https://images.unsplash.com/photo-1541167760496-02d51abc01e0?auto=format&fit=crop&q=80" alt="Cafe" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-[2000ms]" />
              </div>
              {/* Offset Detail Image */}
              <div className="absolute -bottom-12 -left-12 z-30 w-64 h-80 overflow-hidden rounded-3xl shadow-3xl border-8 border-stone-900 hidden xl:block">
                <img src="https://images.unsplash.com/photo-1533134486753-c833f0ed4866?auto=format&fit=crop&q=80" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* Boutique Location System */}
        <section className="py-32 bg-white antialiased">
          <div className="max-w-full mx-auto px-10">
            <div className="flex items-end justify-between mb-24 pb-8 border-b border-stone-100">
              <div className="space-y-4">
                <h2 className="text-4xl font-serif uppercase tracking-[0.4em]">The Flagships</h2>
                <p className="text-stone-400 font-bold uppercase text-[9px] tracking-[0.5em]">Global destinations for the StreetBoutique lifestyle</p>
              </div>
              <button className="group flex items-center gap-4 font-bold uppercase text-[10px] tracking-[0.3em] hover:opacity-50 transition-opacity">
                Store Finder <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              {[
                { city: 'New York (Flatiron)', street: '85 5th Avenue', postal: '10003', img: 'https://images.unsplash.com/photo-1550246140-29f40b904e5a?auto=format&fit=crop&q=80' },
                { city: 'Tokyo (Shibuya)', street: '6 Chome-20-10', postal: '150-0001', img: 'https://images.unsplash.com/photo-1540959733332-e94e270b4d82?auto=format&fit=crop&q=80' },
                { city: 'Paris (Lafayette)', street: '49 Rue Pierre Charron', postal: '75008', img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80' },
              ].map((loc, i) => (
                <div key={i} className="group flex flex-col space-y-8 cursor-pointer">
                  <div className="aspect-[4/5] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-[1500ms]">
                    <img src={loc.img} className="w-full h-full object-cover transform scale-110 group-hover:scale-100 transition-transform duration-[1500ms]" />
                  </div>
                  <div className="space-y-2 text-center lg:text-left transition-all duration-700 group-hover:translate-x-2">
                    <h3 className="text-xl font-serif uppercase tracking-[0.3em]">{loc.city}</h3>
                    <p className="text-stone-400 text-[10px] font-bold uppercase tracking-[0.5em]">{loc.street} - {loc.postal}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-stone-100 pt-32 pb-12">
        <div className="max-w-full mx-auto px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-32">
            <div className="space-y-12">
              <h4 className="font-serif text-3xl uppercase tracking-[0.5em]">StreetBoutique</h4>
              <p className="text-stone-400 text-[10px] font-bold uppercase tracking-[0.3em] leading-relaxed max-w-xs">
                Multifunctional lifestyle brand for men, women, and children. Established in 2011 to provide a unique curated experience.
              </p>
              <div className="flex gap-8">
                {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
                  <a key={i} href="#" className="text-stone-300 hover:text-stone-900 transition-colors">
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-10">
              <h5 className="font-bold text-[10px] uppercase tracking-[0.4em] text-stone-900">Service</h5>
              <nav className="flex flex-col gap-6 font-bold text-[10px] uppercase tracking-[0.3em] text-stone-400">
                {['Contact Us', 'Returns', 'Loyalty', 'Gift Cards', 'Shipping', 'FAQ'].map(l => (
                  <a key={l} href="#" className="hover:text-stone-900 transition-colors">{l}</a>
                ))}
              </nav>
            </div>

            <div className="space-y-10">
              <h5 className="font-bold text-[10px] uppercase tracking-[0.4em] text-stone-900">Explore</h5>
              <nav className="flex flex-col gap-6 font-bold text-[10px] uppercase tracking-[0.3em] text-stone-400">
                {['Careers', 'App Store', 'Google Play', 'StreetBoutique Treats', 'Collections', 'About'].map(l => (
                  <a key={l} href="#" className="hover:text-stone-900 transition-colors">{l}</a>
                ))}
              </nav>
            </div>

            <div className="space-y-10">
              <h5 className="font-bold text-[10px] uppercase tracking-[0.4em] text-stone-900">Join The List</h5>
              <p className="text-stone-400 text-[10px] font-bold uppercase tracking-[0.3em] leading-relaxed">
                Stay updated on footwear drops and collection launches.
              </p>
              <div className="relative group">
                <input
                  type="email"
                  placeholder="EMAIL ADDRESS"
                  className="w-full border-b border-stone-200 py-4 font-bold text-[10px] tracking-[0.3em] outline-none focus:border-stone-900 transition-all uppercase"
                />
                <button className="absolute right-0 bottom-4 text-stone-900 hover:opacity-50 transition-opacity">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center gap-4 opacity-30">
                <Shield className="w-4 h-4 text-stone-900" />
                <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-stone-900">Encrypted checkout</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-10 pt-16 border-t border-stone-50 font-bold text-[8px] uppercase tracking-[0.4em] text-stone-300">
            <p>© 2026 StreetBoutique RETAIL, LLC. ALL RIGHTS RESERVED.</p>
            <div className="flex flex-wrap justify-center gap-10">
              <a href="#" className="hover:text-stone-900 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-stone-900 transition-colors">Terms of Use</a>
              <a href="#" className="hover:text-stone-900 transition-colors">Accessibility</a>
              <a href="#" className="hover:text-stone-900 transition-colors">CA Transparency</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
