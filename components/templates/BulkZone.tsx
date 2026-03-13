'use client';

import React, { useState } from 'react';
import { StoreData } from '@/lib/types';
import { Search, ShoppingCart, User, MapPin, Menu, ChevronDown, Phone, CreditCard, Truck, Shield, Tag, Heart, Star, Info, Mail, Facebook, Instagram, Twitter, Youtube, CheckCircle, Package, Clock, ShieldCheck, Zap, Scissors, Eye, PlusCircle, ArrowRight, X } from 'lucide-react';
import { usePagination, ProductPagination } from './shared/Pagination';

export default function BulkZoneTemplate({ data }: { data: StoreData }) {
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
  return (
    <div className="min-h-full bg-[#f2f2f2] font-sans text-stone-800">
      {/* Utility Bar */}
      <div className="bg-[#f0f0f0] text-[11px] py-2 px-6 flex justify-between items-center font-bold text-[#005daa] border-b border-stone-200">
        <div className="flex gap-6">
          <a href="#" className="hover:underline">Customer Service</a>
          <a href="#" className="hover:underline">Concierge Services</a>
          <a href="#" className="hover:underline">Warehouse Locator</a>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5 cursor-pointer hover:underline">
            <MapPin className="w-3.5 h-3.5" />
            <span>My Warehouse: <span className="font-extrabold">Seattle, WA</span></span>
          </div>
          <span className="text-stone-300">|</span>
          <a href="#" className="hover:underline">Membership</a>
        </div>
      </div>

      <header className="bg-white border-b border-stone-300 sticky top-0 z-[100] shadow-sm">
        <div className="max-w-[1440px] mx-auto px-6 py-5 flex items-center gap-10">
          {/* Logo - Signature Italic Bold */}
          <div className="font-black text-4xl tracking-tighter text-[#005daa] italic flex items-center cursor-pointer group">
            BULKZONE<span className="text-[#e31837] ml-0.5 text-5xl leading-none group-hover:scale-125 transition-transform">.</span>
            <div className="hidden lg:block ml-4 text-[10px] not-italic tracking-[0.2em] text-[#005daa] font-extrabold border-l-2 border-stone-200 pl-4 uppercase">
              WHOLESALE
            </div>
          </div>

          {/* Search Engine - Large & Functional */}
          <div className="flex-1 relative flex items-center group">
            <input
              type="text"
              placeholder="Search products, services and brands"
              className="w-full border-2 border-stone-200 rounded-md py-3 pl-5 pr-14 text-sm outline-none focus:border-[#005daa] bg-stone-50 transition-all font-medium"
            />
            <button className="absolute right-0 h-full px-5 text-white bg-[#005daa] hover:bg-[#004d8a] transition-colors rounded-r-md">
              <Search className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>

          {/* Global Actions */}
          <div className="flex items-center gap-6 lg:gap-8 font-extrabold text-[#005daa]">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hover:text-[#e31837] transition-colors"
            >
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
            <div className="flex flex-col items-start cursor-pointer group">
              <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider group-hover:text-[#e31837]">Hello, Sign In</span>
              <div className="flex items-center gap-1">
                <span className="text-sm">Account</span>
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
            <div className="h-10 w-px bg-stone-200" />
            <div 
              onClick={() => toggleFavorite('header')}
              className="hidden md:flex flex-col items-center cursor-pointer group relative"
            >
              <Heart className={`w-7 h-7 ${favorites.length > 0 ? 'fill-[#e31837] text-[#e31837]' : 'text-[#005daa]'}`} />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-2 bg-[#e31837] text-white text-[9px] font-black px-1.5 py-0.5 rounded-full">{favorites.length}</span>
              )}
              <span className="text-[10px] mt-0.5 uppercase tracking-tighter">Lists</span>
            </div>
            <div 
              onClick={addToCart}
              className="flex flex-col items-center cursor-pointer group relative"
            >
              <ShoppingCart className="w-8 h-8 text-[#005daa] group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-[#e31837] text-white text-[10px] font-black px-1.5 py-0.5 rounded-full ring-2 ring-white">{cartCount}</span>
              )}
              <span className="text-[10px] mt-0.5 uppercase tracking-tighter">Cart</span>
            </div>
          </div>
        </div>

        {/* Categories Bar - Primary Branding Color */}
        <nav className="bg-[#005daa] px-6">
          <div className="max-w-[1440px] mx-auto flex items-center gap-1">
            <button className="flex items-center gap-2 bg-white/10 px-6 py-3 text-white text-[13px] font-black uppercase tracking-wider hover:bg-white/20 transition-all">
              <Menu className="w-5 h-5" />
              <span>Shop All</span>
            </button>
            <div className="flex-1 flex items-center gap-6 px-4 overflow-x-auto scrollbar-hide">
              {['Grocery', 'Computers', 'Appliances', 'Tires', 'Floral', 'Travel', 'Pharmacy', 'Kirkland Signature'].map(item => (
                <a
                  key={item}
                  href="#"
                  className="text-white text-[12px] font-bold whitespace-nowrap hover:bg-white/10 px-3 py-3 transition-colors border-b-2 border-transparent hover:border-white"
                >
                  {item}
                </a>
              ))}
            </div>
            <div className="hidden lg:flex items-center gap-4 text-white text-[12px] font-black pl-4">
              <Tag className="w-4 h-4 text-emerald-400 fill-emerald-400" />
              <span className="uppercase italic tracking-tighter">While Supplies Last</span>
            </div>
          </div>
        </nav>
      </header>

      <main className="max-w-[1440px] mx-auto px-6 py-8">
        {/* Banner - Industrial Wholesale Aesthetics */}
        <div className="relative h-[480px] bg-white rounded-lg overflow-hidden border border-stone-200 mb-12 shadow-md group">
          <img src={data.bannerImage} alt="Banner" className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700" />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
          <div className="absolute inset-y-0 left-0 w-full md:w-[45%] p-12 md:p-16 flex flex-col justify-center">
            <div className="flex items-center gap-3 text-[#e31837] font-black text-sm uppercase tracking-[0.2em] mb-4">
              <Zap className="w-5 h-5 fill-current" />
              Treasure Hunt Found
            </div>
            <h1 className="text-5xl lg:text-6xl font-black text-[#005daa] mb-8 leading-[0.9] uppercase tracking-tighter">
              {data.name} <br />
              <span className="text-stone-900 border-b-8 border-[#e31837]">Wholesale Savings</span>
            </h1>
            <p className="text-lg font-bold text-stone-600 mb-10 leading-relaxed max-w-md">
              {data.description || "Exclusive warehouse deals for members only. Stock up and save on premium brands and bulk essentials."}
            </p>
            <div className="flex gap-4">
              <button className="bg-[#005daa] text-white px-12 py-4 font-black text-sm uppercase tracking-wider hover:bg-[#004d8a] transition-all shadow-xl hover:translate-y-[-2px]">
                Shop the Ad
              </button>
              <button className="bg-[#e31837] text-white px-12 py-4 font-black text-sm uppercase tracking-wider hover:bg-[#c4152f] transition-all">
                Join Today
              </button>
            </div>
          </div>
        </div>

        {/* Kirkland Signature Section - Dedicated Industrial Look */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          <div className="lg:col-span-1 bg-[#1a1a1a] p-8 text-white rounded-lg relative overflow-hidden flex flex-col justify-center">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Package className="w-40 h-40" />
            </div>
            <div className="font-black italic text-3xl tracking-tighter mb-4">
              KIRKLAND <span className="text-[#e31837]">SIGNATURE</span>
            </div>
            <p className="text-stone-400 text-sm font-bold mb-8 leading-relaxed">
              Premium quality standards without the premium price tag. Exclusively at BulkZone.
            </p>
            <button className="w-fit text-sm font-black border-b-2 border-white pb-1 hover:text-[#e31837] hover:border-[#e31837] transition-all uppercase tracking-widest">
              View All Items
            </button>
          </div>
          <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { name: 'Paper Towels', price: '22.99', count: '12 Rolls', img: 'https://picsum.photos/400/400?random=170' },
              { name: 'Vitamins', price: '18.49', count: '300 CT', img: 'https://picsum.photos/400/400?random=171' },
              { name: 'Mixed Nuts', price: '14.99', count: '40 OZ', img: 'https://picsum.photos/400/400?random=172' },
              { name: 'Coffee Pods', price: '34.99', count: '120 CT', img: 'https://picsum.photos/400/400?random=173' },
            ].map((item, i) => (
              <div key={i} className="bg-white p-4 border border-stone-200 rounded-lg hover:shadow-lg transition-shadow cursor-pointer flex flex-col group">
                <div className="aspect-square mb-4 relative">
                  <img src={item.img} alt={item.name} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform" />
                  <div className="absolute top-0 left-0 bg-stone-100 px-2 py-0.5 text-[9px] font-black text-stone-500 uppercase tracking-tighter">Kirkland Sig.</div>
                </div>
                <div className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1">{item.count}</div>
                <h4 className="text-xs font-bold text-[#005daa] leading-tight mb-2 group-hover:underline">{item.name}</h4>
                <div className="mt-auto flex items-end justify-between">
                  <span className="text-xl font-black text-stone-900">${item.price}</span>
                  <button className="bg-stone-100 p-2 rounded-full hover:bg-[#005daa] hover:text-white transition-all">
                    <PlusCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Warehouse Savings - Member Only Logic */}
        <div className="bg-white border border-stone-200 rounded-lg shadow-sm mb-12 overflow-hidden">
          <div className="bg-[#e31837] px-6 py-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 animate-pulse" />
              <h2 className="text-xl font-black uppercase italic tracking-tighter">Member-Only Warehouse Savings</h2>
            </div>
            <div className="text-[11px] font-black bg-white/20 px-3 py-1 rounded-full uppercase tracking-widest border border-white/30">
              Ends in 4 Days
            </div>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 border-t border-stone-200">
            {paginatedItems.map((product, i) => (
              <div key={product.id || i} data-product-id={product.id} className="p-4 border-r border-b border-stone-100 hover:bg-stone-50 transition-colors group cursor-pointer relative">
                {i < 3 && (
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }}
                    className="absolute top-3 right-3 text-[#e31837] hover:scale-110 transition-transform"
                  >
                    <Heart className={`w-4 h-4 ${favorites.includes(product.id) ? 'fill-[#e31837]' : ''}`} />
                  </button>
                )}
                <div className="aspect-[4/3] mb-6 flex items-center justify-center relative">
                  <img src={product.imageUrl} alt={product.title} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                  <div className="absolute bottom-0 left-0 bg-[#005daa]/10 text-[#005daa] text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-tighter">
                    Limit {i + 2} per member
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="flex text-amber-500">
                      {[1, 2, 3, 4, 5].map(v => <Star key={v} className="w-3 h-3 fill-current" />)}
                    </div>
                    <span className="text-[10px] font-bold text-stone-400">(412)</span>
                  </div>

                  <h3 className="text-sm font-bold text-[#005daa] leading-snug h-10 line-clamp-2 group-hover:underline">
                    {product.title}
                  </h3>

                  <div className="bg-stone-100 rounded p-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] font-black text-stone-500 uppercase">Regular Price</span>
                      <span className="text-xs font-bold text-stone-500 underline decoration-stone-300 decoration-2">${product.originalPrice || (parseFloat(product.price) * 1.3).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-black text-[#e31837] uppercase">Member Savings</span>
                      <span className="text-xs font-black text-[#e31837] tracking-tighter">-${(parseFloat(product.price) * 0.3).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-end border-t border-stone-200 pt-2">
                      <div className="flex flex-col">
                        <span className="text-[9px] font-black text-stone-400 uppercase tracking-tighter leading-none">After $2.00 OFF</span>
                        <span className="text-2xl font-black text-stone-900 leading-none py-1">${product.price}</span>
                      </div>
                      <div className="text-[10px] font-bold text-stone-400 italic">
                        Price Per LB: $1.20
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={(e) => { e.stopPropagation(); addToCart(); }}
                    className="w-full bg-[#005daa] text-white py-2 font-black text-[11px] uppercase tracking-widest hover:bg-[#004d8a] transition-all rounded shadow-sm"
                  >
                    Add to Cart
                  </button>

                  <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-600">
                    <Truck className="w-4 h-4" />
                    <span>Free Shipping Available</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 p-4">
              <ProductPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
              />
            </div>
          )}
        </div>

        {/* Global Warehouse Services - 3D Card Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            { name: 'Pharmacy', desc: 'Expert advice and prescription savings.', icon: <PlusCircle className="w-6 h-6" />, color: 'bg-emerald-50 text-emerald-700' },
            { name: 'Tire Center', desc: 'Quality installation and maintenance.', icon: <Package className="w-6 h-6" />, color: 'bg-blue-50 text-blue-700' },
            { name: 'Optometry', desc: 'Comprehensive exams and designer frames.', icon: <Eye className="w-6 h-6" />, color: 'bg-amber-50 text-amber-700' },
            { name: 'Photo Center', desc: 'Preserve memories with high-quality prints.', icon: <Scissors className="w-6 h-6" />, color: 'bg-purple-50 text-purple-700' },
          ].map((service, i) => (
            <div key={i} className="bg-white border border-stone-200 p-8 rounded-xl hover:shadow-2xl transition-all cursor-pointer group flex flex-col h-full border-b-[6px]">
              <div className={`${service.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                {service.icon}
              </div>
              <h3 className="text-xl font-black text-stone-900 mb-2 uppercase tracking-tight">{service.name}</h3>
              <p className="text-sm text-stone-500 font-medium mb-8 leading-relaxed">
                {service.desc}
              </p>
              <div className="mt-auto flex items-center gap-2 text-xs font-black text-[#005daa] uppercase tracking-widest">
                <span>Learn More</span> <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Executive Membership - High Impact Branding */}
        <div className="bg-[#2a2a2a] text-white rounded-2xl p-12 lg:p-20 relative overflow-hidden flex flex-col lg:flex-row items-center gap-16 shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <Star className="w-[500px] h-[500px] fill-current" />
          </div>

          <div className="flex-1 space-y-8 relative z-10 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-4">
              <div className="bg-[#d4af37] p-2 rounded">
                <ShieldCheck className="w-8 h-8 text-stone-900" />
              </div>
              <h2 className="text-4xl font-black italic tracking-tighter uppercase text-[#d4af37]">Executive Membership</h2>
            </div>
            <h3 className="text-3xl md:text-4xl font-black leading-tight">
              Earn an annual 2% Reward on qualified BulkZone purchases.
            </h3>
            <p className="text-stone-400 text-lg font-medium max-w-2xl">
              Maximize your savings with our highest level of membership. Enjoy exclusive benefits on services, insurance, and travel products.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
              <button className="bg-[#d4af37] text-stone-900 px-16 py-5 font-black text-sm uppercase tracking-[0.2em] rounded-md hover:bg-[#b8972f] transition-all shadow-lg active:scale-95">
                Upgrade Now
              </button>
              <button className="border-2 border-stone-600 text-white px-16 py-5 font-black text-sm uppercase tracking-[0.2em] rounded-md hover:bg-white hover:text-stone-900 transition-all">
                Member Benefits
              </button>
            </div>
          </div>

          <div className="w-full lg:w-[450px] aspect-[1.58/1] perspective-1000 group hidden md:block">
            <div className="w-full h-full bg-gradient-to-br from-stone-800 to-stone-900 rounded-2xl border-2 border-stone-700 shadow-2xl p-10 flex flex-col justify-between transform transition-transform duration-700 group-hover:rotate-y-12">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="font-black italic text-3xl tracking-tighter text-white">BULKZONE</div>
                  <div className="text-[10px] font-black tracking-[0.5em] text-stone-500 uppercase">WHOLESALE</div>
                </div>
                <div className="bg-stone-800 p-3 rounded-xl border border-stone-700">
                  <CreditCard className="w-10 h-10 text-[#d4af37]" />
                </div>
              </div>

              <div className="space-y-6">
                <div className="font-mono text-2xl tracking-[0.3em] text-stone-400">111  222  333  444</div>
                <div className="flex justify-between items-end border-t border-stone-700 pt-6">
                  <div className="space-y-1">
                    <div className="text-[8px] font-black text-stone-600 uppercase tracking-widest">Member Since</div>
                    <div className="text-sm font-bold tracking-widest">2024</div>
                  </div>
                  <div className="bg-[#d4af37] text-stone-900 px-4 py-1.5 rounded-sm font-black italic text-sm tracking-tight skew-x-[-10deg]">
                    EXECUTIVE
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Industrial Footer - Data Rich */}
      <footer className="bg-stone-100 border-t border-stone-300 pt-24 pb-12">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-16 mb-24 uppercase tracking-widest font-black text-[11px] text-[#005daa]">
            <div className="space-y-6">
              <h4 className="text-stone-900 text-[13px] border-b-4 border-[#e31837] pb-2 w-fit">Membership</h4>
              <nav className="flex flex-col gap-4">
                {['Join Now', 'Renew Membership', 'Upgrade to Executive', 'Member Privileges'].map(l => (
                  <a key={l} href="#" className="hover:underline">{l}</a>
                ))}
              </nav>
            </div>
            <div className="space-y-6">
              <h4 className="text-stone-900 text-[13px] border-b-4 border-[#005daa] pb-2 w-fit">Customer Service</h4>
              <nav className="flex flex-col gap-4">
                {['Track Order', 'Return Policy', 'Technical Support', 'Help Center'].map(l => (
                  <a key={l} href="#" className="hover:underline">{l}</a>
                ))}
              </nav>
            </div>
            <div className="space-y-6">
              <h4 className="text-stone-900 text-[13px] border-b-4 border-[#005daa] pb-2 w-fit">Find a Warehouse</h4>
              <div className="flex flex-col gap-4">
                <div className="flex gap-2">
                  <input type="text" placeholder="Zip Code" className="w-full px-4 py-2 bg-white border border-stone-300 text-stone-900 rounded outline-none" />
                  <button className="bg-stone-900 text-white px-4 py-2 rounded">
                    <Search className="w-4 h-4" />
                  </button>
                </div>
                {['Warehouse Events', 'Gas Station Prices', 'Tire Center', 'Hearing Aid Center'].map(l => (
                  <a key={l} href="#" className="hover:underline lowercase font-bold normal-case capitalize tracking-normal">{l}</a>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <h4 className="text-stone-900 text-[13px] border-b-4 border-[#005daa] pb-2 w-fit">About Us</h4>
              <nav className="flex flex-col gap-4">
                {['Company Information', 'Sustainability', 'Careers', 'Investor Relations'].map(l => (
                  <a key={l} href="#" className="hover:underline">{l}</a>
                ))}
              </nav>
            </div>
            <div className="space-y-8 lg:col-span-4 xl:col-span-1 border-t md:border-t-0 border-stone-200 pt-8 md:pt-0">
              <div className="flex items-center gap-4 mb-6">
                <div className="font-black italic text-2xl tracking-tighter text-[#005daa]">BULKZONE</div>
                <Mail className="w-6 h-6 text-stone-400" />
              </div>
              <p className="text-stone-500 font-bold normal-case tracking-normal mb-6">
                Subscribe to get warehouse savings delivered directly to your inbox.
              </p>
              <div className="flex border-b-2 border-stone-900 pb-2">
                <input type="email" placeholder="ENTER EMAIL" className="bg-transparent outline-none w-full text-stone-900 placeholder:text-stone-300" />
                <button className="font-black text-[10px] hover:text-[#e31837] transition-all">SIGN UP</button>
              </div>
              <div className="flex gap-6 mt-8">
                <Facebook className="w-5 h-5 hover:text-stone-900 transition-colors" />
                <Instagram className="w-5 h-5 hover:text-stone-900 transition-colors" />
                <Twitter className="w-5 h-5 hover:text-stone-900 transition-colors" />
                <Youtube className="w-5 h-5 hover:text-stone-900 transition-colors" />
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-center gap-10 pt-16 border-t border-stone-300 text-[10px] font-black text-stone-400 uppercase tracking-widest">
            <div className="flex flex-wrap justify-center gap-8">
              <a href="#" className="hover:text-stone-900">Privacy Policy</a>
              <a href="#" className="hover:text-stone-900">Terms & Conditions</a>
              <a href="#" className="hover:text-stone-900">Accessibility</a>
              <a href="#" className="hover:text-stone-900">Ad Choices</a>
              <a href="#" className="hover:text-stone-900">Your Privacy Choices</a>
            </div>
            <div className="text-center lg:text-right">
              © 2026 BULKZONE WHOLESALE CORPORATION. ALL RIGHTS RESERVED.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
