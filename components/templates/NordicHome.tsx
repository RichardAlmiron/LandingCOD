'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { StoreData } from '@/lib/types';
import { Search, ShoppingBag, Heart, Menu, User, Truck, ArrowRight, Sofa, Bed, Utensils, Wrench, Leaf, ShieldCheck, ChevronRight, Facebook, Instagram, Twitter, Youtube, Linkedin, Info, Star, X } from 'lucide-react';
import { usePagination, ProductPagination } from './shared/Pagination';

export default function NordicHomeTemplate({ data }: { data: StoreData }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [favorites, setFavorites] = useState<string[]>([]);
  
  const categories = [
    { name: 'Products', href: '#' },
    { name: 'Rooms', href: '#' },
    { name: 'Deals', href: '#' },
    { name: 'NordicHome Family', href: '#' },
    { name: 'Tips & ideas', href: '#' },
    { name: 'Design your room', href: '#' },
    { name: 'Customer service', href: '#' },
  ];

  const highlights = [
    { name: 'Living room', icon: Sofa },
    { name: 'Bedroom', icon: Bed },
    { name: 'Kitchen', icon: Utensils },
    { name: 'Workspace', icon: Wrench },
  ];

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
    <div className="min-h-full bg-white font-sans text-[#111111] overflow-x-hidden selection:bg-[#0058a3] selection:text-white pb-10">

      {/* ─── HEADER ─── */}
      <header className="px-4 lg:px-8 py-4 lg:py-6 flex items-center justify-between sticky top-0 bg-white z-50 border-b border-solid border-gray-200 shadow-sm transition-all duration-300">

        {/* Left: Menu + Logo */}
        <div className="flex items-center space-x-3 md:space-x-6">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 hover:bg-[#f5f5f5] rounded-full transition-colors cursor-pointer group"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 md:w-7 md:h-7" strokeWidth={2} /> : <Menu className="w-6 h-6 md:w-7 md:h-7 group-hover:scale-110 transition-transform" strokeWidth={2} />}
          </button>
          {/* NordicHome Logo proxy: thick blue text on yellow block or just iconic blue */}
          <div className="font-sans font-black text-[28px] md:text-[36px] tracking-tight md:tracking-tighter bg-[#fbd914] text-[#0058a3] px-3 py-1 rounded-[2px] leading-none shrink-0 uppercase select-none cursor-pointer hover:opacity-90 transition-opacity">
            {data.logoText !== 'NordicHome' ? data.logoText : 'NordicHome'}
          </div>
        </div>

        {/* Center: Search (Expandable on desktop) */}
        <div className="hidden lg:flex flex-1 max-w-[800px] mx-8 relative group">
          <div className="flex items-center w-full bg-[#f5f5f5] rounded-full hover:bg-[#e5e5e5] border-2 border-transparent focus-within:border-[#0058a3] focus-within:bg-white transition-all overflow-hidden h-[48px]">
            <span className="pl-4 pr-3 text-gray-500 group-focus-within:text-[#0058a3]"><Search className="w-5 h-5" strokeWidth={2.5} /></span>
            <input
              type="text"
              placeholder="What are you looking for?"
              className="bg-transparent outline-none text-[15px] w-full h-full font-medium placeholder-gray-500"
            />
          </div>
        </div>

        {/* Right: User Icons */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <button className="hidden sm:flex flex-col items-center justify-center cursor-pointer hover:bg-[#f5f5f5] p-2 md:p-3 rounded-full md:rounded-lg transition-colors min-w-[60px]">
            <Truck className="w-[22px] h-[22px] md:mb-1" strokeWidth={2} />
            <span className="text-[11px] font-bold hidden md:block tracking-wide">Delivery</span>
          </button>

          <button className="hidden sm:flex flex-col items-center justify-center cursor-pointer hover:bg-[#f5f5f5] p-2 md:p-3 rounded-full md:rounded-lg transition-colors min-w-[60px]">
            <User className="w-[22px] h-[22px] md:mb-1" strokeWidth={2} />
            <span className="text-[11px] font-bold hidden md:block tracking-wide">Hej! Log in</span>
          </button>

          <button 
            onClick={() => toggleFavorite('header')}
            className="flex flex-col items-center justify-center cursor-pointer hover:bg-[#f5f5f5] p-2 md:p-3 rounded-full md:rounded-lg transition-colors min-w-[60px]"
          >
            <Heart className={`w-[22px] h-[22px] md:mb-1 ${favorites.length > 0 ? 'fill-red-500 text-red-500' : ''}`} strokeWidth={2} />
            {favorites.length > 0 && (
              <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{favorites.length}</span>
            )}
            <span className="text-[11px] font-bold hidden md:block tracking-wide">Favorites</span>
          </button>

          <button 
            onClick={addToCart}
            className="flex flex-col items-center justify-center cursor-pointer hover:bg-[#f5f5f5] p-2 md:p-3 rounded-full md:rounded-lg transition-colors min-w-[60px] relative"
          >
            <div className="relative">
              <ShoppingBag className="w-[22px] h-[22px] md:mb-1" strokeWidth={2} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 md:top-[2px] md:-right-2.5 bg-[#0058a3] text-white text-[10px] md:text-[11px] font-bold w-[18px] h-[18px] md:w-[20px] md:h-[20px] flex items-center justify-center rounded-full leading-none border-2 border-white">{cartCount}</span>
              )}
            </div>
            <span className="text-[11px] font-bold hidden md:block tracking-wide">Cart</span>
          </button>
        </div>
      </header>

      {/* ─── SCROLLABLE NAV (Mobile focus but visible desktop) ─── */}
      <nav className="px-4 lg:px-8 py-3 flex space-x-2 lg:space-x-4 text-[13px] md:text-[14px] font-bold overflow-x-auto hide-scrollbar bg-white">
        {categories.map((cat, i) => (
          <a key={i} href={cat.href} className="whitespace-nowrap bg-[#f5f5f5] hover:bg-[#e5e5e5] px-4 md:px-5 py-2 md:py-2.5 rounded-full transition-colors truncate">
            {cat.name}
          </a>
        ))}
      </nav>

      {/* Mobile Search Bar */}
      <div className="lg:hidden px-4 pb-4 bg-white border-b border-gray-200">
        <div className="flex items-center bg-[#f5f5f5] rounded-full px-4 py-3 border-2 border-transparent focus-within:border-[#0058a3]">
          <Search className="w-5 h-5 text-gray-500 mr-2 shrink-0" strokeWidth={2.5} />
          <input type="text" placeholder="What are you looking for?" className="bg-transparent outline-none text-[15px] w-full font-medium" />
        </div>
      </div>

      <main className="w-full max-w-[1600px] mx-auto px-4 lg:px-8 py-8 md:py-12">

        {/* ─── HERO & FAMILY PROMO ─── */}
        <div className="flex flex-col lg:flex-row gap-6 mb-16">
          <div className="lg:w-[70%] h-[350px] md:h-[500px] relative rounded-[4px] md:rounded-[8px] overflow-hidden group cursor-pointer shadow-sm">
            <Image
              src={data.bannerImage}
              alt="Banner"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-[2000ms] ease-out brightness-95"
              referrerPolicy="no-referrer"
              priority
            />
            {/* Subtle overlay gradient */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6 md:p-10">
              <div className="text-white max-w-2xl">
                <h2 className="text-[32px] md:text-[48px] font-black mb-3 leading-[1.1] tracking-tight">{data.description || "Make room for life."}</h2>
                <div className="flex items-center font-bold hover:underline underline-offset-4 cursor-pointer">
                  Shop the look <ArrowRight className="w-5 h-5 ml-2" />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-[30%] bg-[#0058a3] text-white rounded-[4px] md:rounded-[8px] p-8 md:p-10 flex flex-col justify-center shadow-sm relative overflow-hidden group border border-[#004a89]">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
            <h2 className="text-[36px] md:text-[42px] font-black mb-4 text-[#fbd914] leading-[1.1] tracking-tight">Join NordicHome Family</h2>
            <p className="mb-8 font-medium text-[16px] leading-relaxed text-blue-50">Get exclusive discounts, free coffee, member-only events, and more. It's free to join!</p>
            <button className="bg-white text-[#111111] font-bold text-[14px] md:text-[15px] py-3.5 px-8 rounded-full hover:bg-[#f5f5f5] hover:scale-[1.02] transition-all w-fit active:scale-95 shadow-md">
              Join now
            </button>
            <div className="mt-6 flex items-center font-bold text-[13px] hover:underline cursor-pointer">
              Log in instead <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </div>
        </div>

        {/* ─── TOP SELLERS GRID WITH PAGINATION ─── */}
        <div className="mb-16 md:mb-24">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-[24px] md:text-[28px] font-bold tracking-tight">Top sellers ({totalItems})</h3>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {paginatedItems.map((product, idx) => {
              const [dollars, cents] = product.price.split('.');
              return (
                <div key={product.id || idx} data-product-id={product.id} className="group cursor-pointer flex flex-col relative h-full">
                  <div className="relative aspect-square mb-4 bg-[#f5f5f5] flex items-center justify-center p-4 rounded-[4px] overflow-hidden group-hover:bg-[#eaeaec] transition-colors">
                    <Image
                      src={product.imageUrl}
                      alt={product.title}
                      fill
                      className="object-contain p-4 group-hover:scale-105 transition-transform duration-700 mix-blend-multiply"
                      referrerPolicy="no-referrer"
                    />
                    {/* Floating Add to Cart Button */}
                    <button 
                      onClick={(e) => { e.stopPropagation(); addToCart(); }}
                      className="absolute bottom-3 right-3 bg-[#0058a3] text-white p-3 md:p-3.5 rounded-full shadow-lg hover:bg-[#004a89] hover:scale-105 transition-all opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 active:scale-95 z-10"
                    >
                      <ShoppingBag className="w-[18px] h-[18px] md:w-5 md:h-5" strokeWidth={2.5} />
                    </button>
                    {/* Favorite Button */}
                    <button 
                      onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }}
                      className="absolute top-3 right-3 p-2 bg-white/80 rounded-full hover:bg-white transition-colors z-10"
                    >
                      <Heart className={`w-4 h-4 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                    </button>
                  </div>
                  <div className="flex-1 flex flex-col px-1">
                    <h4 className="text-[14px] md:text-[15px] font-bold uppercase mb-1 leading-tight tracking-wide">{product.title.split(' ')[0] || 'MALM'}</h4>
                    <p className="text-[13px] md:text-[14px] text-gray-700 mb-3 line-clamp-2 leading-relaxed h-[42px]">{product.title}</p>
                    <div className="flex items-start mb-2 mt-auto">
                      <span className="text-[13px] font-bold mt-[2px] md:mt-[4px]">$</span>
                      <span className="text-[28px] md:text-[32px] font-black leading-none tracking-tighter">{dollars || product.price}</span>
                      <span className="text-[13px] font-bold mt-[2px] md:mt-[4px]">{cents || '00'}</span>
                    </div>
                    <div className="flex items-center space-x-1.5 mt-2">
                      <div className="flex text-[#FFCE00]">
                        {[1, 2, 3, 4].map(s => <Star key={s} className="w-[14px] h-[14px] fill-current" />)}
                        <Star className="w-[14px] h-[14px] text-gray-300" />
                      </div>
                      <span className="text-[12px] text-gray-500 font-medium">({product.reviews || Math.floor(Math.random() * 500) + 50})</span>
                    </div>
                  </div>
                </div>
              )
            })}
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
        </div>

        {/* ─── NEW LOWER PRICE PROMO ─── */}
        <div className="bg-[#fbd914] rounded-[8px] md:rounded-[16px] p-6 md:p-12 mb-16 md:mb-24 flex flex-col lg:flex-row items-center gap-8 lg:gap-16 border-2 border-[#f2ca00]">
          <div className="w-full lg:w-[45%] mb-6 lg:mb-0">
            <div className="bg-[#e0001b] text-white font-black uppercase text-[15px] md:text-[18px] px-5 py-2 inline-block mb-6 shadow-md skew-x-[-10deg]">
              <span className="block skew-x-[10deg]">New lower price</span>
            </div>
            <h3 className="text-[36px] md:text-[48px] font-black mb-6 text-[#111111] leading-[1.05] tracking-tight">Great quality.<br />Lower price.</h3>
            <p className="text-[16px] md:text-[18px] mb-8 text-[#222] font-medium leading-relaxed">We've lowered the prices on hundreds of your favorite products. Because a beautiful home shouldn't cost a fortune. Find the red tags across the store.</p>
            <button className="bg-[#111111] text-white font-bold text-[14px] md:text-[15px] py-3.5 md:py-4 px-8 md:px-10 rounded-full hover:bg-[#333] hover:scale-[1.02] transition-all w-full md:w-auto active:scale-95 shadow-xl">
              Shop all new lower prices
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4 md:gap-6 w-full lg:w-[55%]">
            {data.products.slice(0, 2).map((product, i) => (
              <div key={`nlp-${i}`} className="bg-white rounded-[4px] md:rounded-[8px] p-4 md:p-6 shadow-md hover:shadow-xl transition-shadow cursor-pointer relative group">
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
                  <div className="bg-[#e0001b] text-white text-[10px] md:text-[12px] font-bold px-2 py-1 shadow-sm font-sans uppercase">New lower price</div>
                </div>
                <div className="relative aspect-square mb-4 mt-8 flex items-center justify-center">
                  <Image src={product.imageUrl} alt={product.title} fill className="object-contain group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                </div>
                <h4 className="font-bold uppercase text-[15px] md:text-[17px] mb-1">{product.title.split(' ')[0]}</h4>
                <div className="flex flex-col space-y-1">
                  <div className="flex items-baseline">
                    <span className="text-[14px] font-bold text-[#e0001b] mr-0.5">$</span>
                    <span className="text-[28px] md:text-[36px] font-black text-[#e0001b] leading-none tracking-tighter">{(parseFloat(product.price) * 0.8).toFixed(2)}</span>
                  </div>
                  <span className="text-[12px] text-gray-500 line-through font-medium tracking-wide">Previous price: ${product.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── ROOMS INSPIRATION ─── */}
        <div className="mb-16 md:mb-24">
          <div className="flex justify-between items-end mb-8">
            <h3 className="text-[24px] md:text-[28px] font-bold tracking-tight">Shop by room</h3>
            <a href="#" className="font-bold text-[14px] md:text-[15px] hover:bg-[#f5f5f5] px-4 py-2 rounded-full transition-colors hidden sm:flex items-center">View all rooms <ArrowRight className="w-5 h-5 ml-2" /></a>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {highlights.map((room, i) => (
              <div key={i} className="group cursor-pointer flex flex-col">
                <div className="relative aspect-[4/3] md:aspect-square mb-4 overflow-hidden rounded-[4px]">
                  <Image src={`https://picsum.photos/600/600?random=${i + 70}`} alt={room.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors duration-300"></div>
                  {/* Plus marker typical of NordicHome */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white/80 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="w-1.5 h-1.5 bg-black rounded-full" />
                  </div>
                </div>
                <h4 className="font-bold text-[16px] md:text-[18px] flex items-center group-hover:underline decoration-2 underline-offset-4">
                  {room.name}
                </h4>
              </div>
            ))}
          </div>
          <button className="w-full sm:hidden mt-6 bg-[#f5f5f5] text-[#111] font-bold text-[14px] py-3.5 rounded-full hover:bg-[#e5e5e5] transition-colors">
            View all rooms
          </button>
        </div>

        {/* ─── SERVICES GRID ─── */}
        <div className="mb-16 md:mb-24 pt-8 border-t border-gray-200">
          <h3 className="text-[24px] md:text-[28px] font-bold mb-8 tracking-tight">Services to help you</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#f5f5f5] p-8 md:p-10 rounded-[8px] hover:bg-[#eaeaea] transition-colors cursor-pointer group shadow-sm border border-transparent hover:border-gray-200">
              <Truck className="w-[32px] h-[32px] mb-6 text-[#111] group-hover:scale-110 transition-transform origin-left" strokeWidth={1.5} />
              <h4 className="font-bold text-[18px] md:text-[20px] mb-3">Delivery options</h4>
              <p className="text-[14px] text-gray-700 mb-6 leading-relaxed max-w-[90%]">From parcel delivery to truck delivery, we have options to suit your needs and budget.</p>
              <a href="#" className="font-bold text-[14px] hover:underline underline-offset-4 flex items-center">Learn more <ArrowRight className="w-4 h-4 ml-1" /></a>
            </div>
            <div className="bg-[#f5f5f5] p-8 md:p-10 rounded-[8px] hover:bg-[#eaeaea] transition-colors cursor-pointer group shadow-sm border border-transparent hover:border-gray-200">
              <Wrench className="w-[32px] h-[32px] mb-6 text-[#111] group-hover:scale-110 transition-transform origin-left" strokeWidth={1.5} />
              <h4 className="font-bold text-[18px] md:text-[20px] mb-3">Assembly & installation</h4>
              <p className="text-[14px] text-gray-700 mb-6 leading-relaxed max-w-[90%]">Need a hand? We can help assemble and install your new furniture through TaskRabbit.</p>
              <a href="#" className="font-bold text-[14px] hover:underline underline-offset-4 flex items-center">Learn more <ArrowRight className="w-4 h-4 ml-1" /></a>
            </div>
            <div className="bg-[#f5f5f5] p-8 md:p-10 rounded-[8px] hover:bg-[#eaeaea] transition-colors cursor-pointer group shadow-sm border border-transparent hover:border-gray-200">
              <ShieldCheck className="w-[32px] h-[32px] mb-6 text-[#111] group-hover:scale-110 transition-transform origin-left" strokeWidth={1.5} />
              <h4 className="font-bold text-[18px] md:text-[20px] mb-3">Return policy</h4>
              <p className="text-[14px] text-gray-700 mb-6 leading-relaxed max-w-[90%]">You have 365 days to return your purchase if you're not completely satisfied. Peace of mind.</p>
              <a href="#" className="font-bold text-[14px] hover:underline underline-offset-4 flex items-center">Learn more <ArrowRight className="w-4 h-4 ml-1" /></a>
            </div>
          </div>
        </div>

        {/* ─── SUSTAINABLE LIVING BANNER ─── */}
        <div className="bg-[#0058a3] text-white rounded-[8px] md:rounded-[16px] overflow-hidden mb-12 flex flex-col md:flex-row shadow-lg border border-[#004a89]">
          <div className="p-8 md:p-14 lg:p-20 max-w-xl md:w-[50%] lg:w-[45%] flex flex-col justify-center bg-gradient-to-br from-[#0058a3] to-[#004a89] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-5"><Leaf className="w-64 h-64 rotate-45" /></div>
            <Leaf className="w-12 h-12 md:w-16 md:h-16 mb-6 text-[#fbd914] relative z-10 animate-bounce-slow" />
            <h3 className="text-[32px] md:text-[40px] font-black mb-4 leading-tight tracking-tight relative z-10">Sustainable living at home</h3>
            <p className="text-[16px] md:text-[18px] mb-8 text-blue-100 font-medium leading-relaxed relative z-10">Small actions can make a big difference. Discover innovative products and simple tips to help you save energy, water, and reduce waste.</p>
            <button className="bg-white text-[#0058a3] font-bold text-[14px] md:text-[15px] py-4 px-8 rounded-full hover:bg-[#f5f5f5] hover:scale-[1.02] transition-all w-fit shadow-md active:scale-95 relative z-10">
              Explore sustainable products
            </button>
          </div>
          <div className="w-full md:w-[50%] lg:w-[55%] relative min-h-[300px] md:min-h-full bg-black/20">
            <Image src="https://picsum.photos/1000/800?random=80" alt="Sustainable Living" fill className="object-cover focus:filter-none opacity-90 hover:opacity-100 transition-opacity duration-700" />
          </div>
        </div>

      </main>

      {/* ─── ENHANCED REDESIGNED FOOTER ─── */}
      <footer className="bg-[#f5f5f5] pt-16 md:pt-20 pb-8 border-t border-gray-200">
        <div className="w-full max-w-[1600px] mx-auto px-4 lg:px-8">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-12 mb-16">

            <div className="lg:pr-8">
              <h4 className="font-bold text-[18px] md:text-[20px] mb-4 text-[#111] tracking-tight">Join NordicHome Family</h4>
              <p className="text-[14px] text-gray-700 mb-6 leading-relaxed font-medium">Bring your ideas to life with special discounts, inspiration, and lots of good things in store. It's all free.</p>
              <button className="bg-[#111111] text-white font-bold text-[14px] py-3.5 px-6 rounded-full hover:bg-gray-800 transition-all w-full md:w-fit active:scale-95 shadow-md">
                Join or log in
              </button>
            </div>

            <div className="flex flex-col space-y-4">
              <h4 className="font-bold text-[18px] mb-2 text-[#111] tracking-tight">Help</h4>
              <a href="#" className="text-[14px] hover:underline hover:text-black text-gray-700 font-medium w-fit">Customer service</a>
              <a href="#" className="text-[14px] hover:underline hover:text-black text-gray-700 font-medium w-fit">FAQ</a>
              <a href="#" className="text-[14px] hover:underline hover:text-black text-gray-700 font-medium w-fit">My orders</a>
              <a href="#" className="text-[14px] hover:underline hover:text-black text-gray-700 font-medium w-fit">Returns & claims</a>
              <a href="#" className="text-[14px] hover:underline hover:text-black text-gray-700 font-medium w-fit">Delivery options</a>
              <a href="#" className="text-[14px] hover:underline hover:text-black text-gray-700 font-medium w-fit">Track your order</a>
            </div>

            <div className="flex flex-col space-y-4">
              <h4 className="font-bold text-[18px] mb-2 text-[#111] tracking-tight">Shop & Learn</h4>
              <a href="#" className="text-[14px] hover:underline hover:text-black text-gray-700 font-medium w-fit">Find a location</a>
              <a href="#" className="text-[14px] hover:underline hover:text-black text-gray-700 font-medium w-fit">NordicHome Services</a>
              <a href="#" className="text-[14px] hover:underline hover:text-black text-gray-700 font-medium w-fit">NordicHome Family</a>
              <a href="#" className="text-[14px] hover:underline hover:text-black text-gray-700 font-medium w-fit">NordicHome Business</a>
              <a href="#" className="text-[14px] hover:underline hover:text-black text-gray-700 font-medium w-fit">NordicHome Planners</a>
              <a href="#" className="text-[14px] hover:underline hover:text-black text-gray-700 font-medium w-fit">Buying guides</a>
            </div>

            <div className="flex flex-col space-y-4">
              <h4 className="font-bold text-[18px] mb-2 text-[#111] tracking-tight">About NordicHome</h4>
              <a href="#" className="text-[14px] hover:underline hover:text-black text-gray-700 font-medium w-fit">This is NordicHome</a>
              <a href="#" className="text-[14px] hover:underline hover:text-black text-gray-700 font-medium w-fit">Careers</a>
              <a href="#" className="text-[14px] hover:underline hover:text-black text-gray-700 font-medium w-fit">Newsroom</a>
              <a href="#" className="text-[14px] hover:underline hover:text-black text-gray-700 font-medium w-fit">Sustainability</a>
              <a href="#" className="text-[14px] hover:underline hover:text-black text-gray-700 font-medium w-fit">NordicHome Foundation</a>
            </div>

          </div>

          {/* Social Icons mapped to Lucide React properly */}
          <div className="flex space-x-3 mb-10 border-b border-gray-200 pb-10">
            <a href="#" className="w-[42px] h-[42px] border border-gray-400 rounded-full flex items-center justify-center cursor-pointer hover:border-black hover:text-black text-gray-600 transition-colors bg-white hover:shadow-sm">
              <Facebook className="w-[18px] h-[18px] fill-current" />
            </a>
            <a href="#" className="w-[42px] h-[42px] border border-gray-400 rounded-full flex items-center justify-center cursor-pointer hover:border-black hover:text-black text-gray-600 transition-colors bg-white hover:shadow-sm">
              <Instagram className="w-[18px] h-[18px]" />
            </a>
            <a href="#" className="w-[42px] h-[42px] border border-gray-400 rounded-full flex items-center justify-center cursor-pointer hover:border-black hover:text-black text-gray-600 transition-colors bg-white hover:shadow-sm">
              <Twitter className="w-[18px] h-[18px] fill-current" />
            </a>
            <a href="#" className="w-[42px] h-[42px] border border-gray-400 rounded-full flex items-center justify-center cursor-pointer hover:border-black hover:text-black text-gray-600 transition-colors bg-white hover:shadow-sm">
              <Youtube className="w-[18px] h-[18px]" />
            </a>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center text-[12px] md:text-[13px] text-[#111] font-medium gap-6">
            <div className="md:mb-0 bg-white px-3 py-1 border border-gray-200 rounded-[4px] shadow-sm">
              <span className="flex items-center"><Info className="w-3.5 h-3.5 mr-1" /> © Inter NordicHome Systems B.V. 1999-2026</span>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-3 font-bold">
              <a href="#" className="hover:underline underline-offset-4 transition-all">Privacy policy</a>
              <a href="#" className="hover:underline underline-offset-4 transition-all">Cookie policy</a>
              <a href="#" className="hover:underline underline-offset-4 transition-all">Terms & conditions</a>
              <a href="#" className="hover:underline underline-offset-4 transition-all">Accessibility</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
