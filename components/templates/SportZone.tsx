'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { StoreData } from '@/lib/types';
import { Search, ShoppingCart, Heart, User, Menu, MapPin, Activity, Leaf, Smartphone, ChevronRight, Facebook, Twitter, Instagram, Youtube, HelpCircle, ArrowRight, ShieldCheck, RefreshCcw, X } from 'lucide-react';
import { usePagination, ProductPagination } from './shared/Pagination';

export default function SportZoneTemplate({ data }: { data: StoreData }) {
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
    <div className="min-h-full bg-[#f4f5f7] font-sans text-[#333333] selection:bg-[#0082c3] selection:text-white pb-10 overflow-x-hidden">

      {/* ─── TOP PROMO BAR ─── */}
      <div className="bg-[#0082c3] text-white text-[12px] md:text-[13px] py-2 md:py-2.5 px-4 flex justify-center items-center font-bold tracking-wide">
        <span className="hidden sm:inline mr-2"><Activity className="w-4 h-4" /></span>
        Free standard shipping on orders over $50 | Free in-store pickup
      </div>

      {/* ─── MAIN HEADER ─── */}
      <header className="bg-white sticky top-0 z-50 border-b border-gray-200 shadow-[0_2px_10px_rgba(0,0,0,0.05)] transition-all">
        <div className="w-full max-w-[1400px] mx-auto px-4 lg:px-6 h-[70px] lg:h-[80px] flex items-center justify-between gap-4 lg:gap-8">

          <div className="flex items-center gap-4 lg:gap-6 shrink-0">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 hover:bg-gray-100 rounded-md transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" strokeWidth={2.5} /> : <Menu className="w-6 h-6" strokeWidth={2.5} />}
            </button>
            <div className="flex flex-col cursor-pointer">
              <span className="font-sans font-black text-[28px] md:text-[36px] tracking-tighter text-[#0082c3] uppercase italic leading-none select-none">
                {data.logoText !== 'SportZone' ? data.logoText : 'SportZone'}
              </span>
            </div>
          </div>

          <div className="hidden lg:flex flex-1 max-w-[650px] bg-[#f4f5f7] rounded-[4px] px-4 py-2.5 border-2 border-transparent focus-within:border-[#0082c3] focus-within:bg-white transition-all overflow-hidden h-[46px] group">
            <input type="text" placeholder="Search for a sport, product or keyword" className="bg-transparent outline-none text-[14px] w-full font-medium placeholder-gray-500 text-black" />
            <button className="bg-[#0082c3] text-white p-1.5 rounded-[2px] ml-2 shrink-0 group-focus-within:bg-[#0070a8] transition-colors">
              <Search className="w-[18px] h-[18px]" strokeWidth={2.5} />
            </button>
          </div>

          <div className="flex items-center space-x-2 md:space-x-5 text-[#333]">
            <button className="hidden sm:flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-colors group min-w-[50px]">
              <MapPin className="w-6 h-6 mb-0.5 group-hover:text-[#0082c3] transition-colors" strokeWidth={1.5} />
              <span className="text-[11px] font-bold tracking-wide">My Store</span>
            </button>
            <button className="hidden sm:flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-colors group min-w-[50px]">
              <User className="w-6 h-6 mb-0.5 group-hover:text-[#0082c3] transition-colors" strokeWidth={1.5} />
              <span className="text-[11px] font-bold tracking-wide">Account</span>
            </button>
            <button 
              onClick={() => toggleFavorite('header')}
              className="hidden sm:flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-colors group min-w-[50px] relative"
            >
              <Heart className={`w-6 h-6 mb-0.5 group-hover:text-[#0082c3] transition-colors ${favorites.length > 0 ? 'fill-red-500 text-red-500' : ''}`} strokeWidth={1.5} />
              {favorites.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full">{favorites.length}</span>
              )}
              <span className="text-[11px] font-bold tracking-wide">Favorites</span>
            </button>
            <button 
              onClick={addToCart}
              className="flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-colors group min-w-[50px] relative"
            >
              <div className="relative">
                <ShoppingCart className="w-[26px] h-[26px] mb-0.5 group-hover:text-[#0082c3] transition-colors" strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[#ffd100] text-black text-[11px] font-black w-[20px] h-[20px] flex items-center justify-center rounded-full leading-none border-2 border-white shadow-sm">{cartCount}</span>
                )}
              </div>
              <span className="text-[11px] font-bold tracking-wide hidden sm:block">Cart</span>
            </button>
          </div>
        </div>

        {/* Desktop Categories */}
        <nav className="hidden lg:flex justify-center w-full bg-white border-t border-gray-100 shadow-sm relative z-40">
          <div className="max-w-[1400px] mx-auto w-full px-6 flex items-center justify-center space-x-8 h-[48px] text-[15px] font-black uppercase text-[#333] tracking-wide italic">
            <a href="#" className="flex items-center h-full hover:text-[#0082c3] border-b-[3px] border-transparent hover:border-[#0082c3] transition-colors">
              <Menu className="w-5 h-5 mr-2" strokeWidth={2.5} /> Shop By Sport
            </a>
            <a href="#" className="flex items-center h-full hover:text-[#0082c3] border-b-[3px] border-transparent hover:border-[#0082c3] transition-colors">Men</a>
            <a href="#" className="flex items-center h-full hover:text-[#0082c3] border-b-[3px] border-transparent hover:border-[#0082c3] transition-colors">Women</a>
            <a href="#" className="flex items-center h-full hover:text-[#0082c3] border-b-[3px] border-transparent hover:border-[#0082c3] transition-colors">Kids</a>
            <a href="#" className="flex items-center h-full hover:text-[#0082c3] border-b-[3px] border-transparent hover:border-[#0082c3] transition-colors">Accessories</a>
            <a href="#" className="flex items-center h-full text-[#cc163f] hover:text-[#a01030] border-b-[3px] border-transparent hover:border-[#cc163f] transition-colors">Sale & Clearance</a>
          </div>
        </nav>
      </header>

      {/* Mobile Search Bar */}
      <div className="lg:hidden px-4 py-3 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center bg-[#f4f5f7] rounded-[4px] px-3 py-2 border border-gray-300 focus-within:border-[#0082c3] focus-within:bg-white transition-all">
          <input type="text" placeholder="Search for a sport or product" className="bg-transparent outline-none text-[15px] w-full font-medium" />
          <Search className="w-[18px] h-[18px] text-[#0082c3] ml-2 shrink-0" strokeWidth={2.5} />
        </div>
      </div>

      <main className="w-full max-w-[1400px] mx-auto px-4 lg:px-6 py-6 md:py-8">

        {/* ─── HERO BANNER ─── */}
        <div className="relative h-[350px] md:h-[450px] lg:h-[550px] mb-10 md:mb-16 group cursor-pointer overflow-hidden rounded-[4px] shadow-md">
          <Image
            src={data.bannerImage}
            alt="Hero Banner"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-[1200ms] ease-out brightness-90"
            referrerPolicy="no-referrer"
            priority
          />
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          <div className="absolute inset-0 flex flex-col items-start justify-end p-6 md:p-12 lg:p-16 w-full lg:w-2/3">
            <div className="bg-[#ffd100] text-black text-[12px] md:text-[14px] font-black uppercase italic px-3 py-1 mb-4 shadow-xl">New Collection</div>
            <h1 className="text-[36px] md:text-[52px] lg:text-[64px] font-black text-white leading-[1.05] tracking-tight uppercase italic drop-shadow-lg mb-4">
              {data.name}
            </h1>
            <p className="text-[16px] md:text-[20px] font-bold text-gray-100 mb-8 max-w-xl drop-shadow-md leading-snug">
              {data.description || "Gear up for your next adventure with our high-performance sports equipment designed for athletes of all levels."}
            </p>
            <button className="bg-[#0082c3] text-white px-8 py-3.5 md:px-10 md:py-4 rounded-[4px] font-black text-[15px] md:text-[16px] hover:bg-[#0070a8] hover:shadow-lg transition-all uppercase italic flex items-center group-hover:pr-6 md:group-hover:pr-8">
              Shop The Collection <ArrowRight className="w-5 h-5 ml-2 opacity-0 group-hover:opacity-100 transition-opacity -mr-5 group-hover:mr-0" />
            </button>
          </div>
        </div>

        {/* ─── CATEGORY CIRCLES ─── */}
        <div className="mb-16 hide-scrollbar overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0">
          <div className="flex gap-4 md:grid md:grid-cols-4 lg:grid-cols-8 md:gap-4 min-w-max md:min-w-0">
            {[
              { name: 'Cycling', img: 'https://picsum.photos/300/300?random=210' },
              { name: 'Hiking & Camping', img: 'https://picsum.photos/300/300?random=211' },
              { name: 'Running', img: 'https://picsum.photos/300/300?random=212' },
              { name: 'Water Sports', img: 'https://picsum.photos/300/300?random=213' },
              { name: 'Fitness & Gym', img: 'https://picsum.photos/300/300?random=214' },
              { name: 'Racket Sports', img: 'https://picsum.photos/300/300?random=215' },
              { name: 'Team Sports', img: 'https://picsum.photos/300/300?random=216' },
              { name: 'Winter Sports', img: 'https://picsum.photos/300/300?random=217' },
            ].map((sport, i) => (
              <div key={i} className="flex flex-col items-center cursor-pointer group w-[90px] md:w-auto shrink-0">
                <div className="w-[80px] h-[80px] md:w-[110px] md:h-[110px] rounded-full overflow-hidden mb-3 border-4 border-transparent group-hover:border-[#0082c3] transition-all shadow-md">
                  <Image src={sport.img} alt={sport.name} width={110} height={110} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <span className="font-bold text-[13px] md:text-[14px] text-center text-[#333] group-hover:text-[#0082c3] leading-tight uppercase tracking-tight">{sport.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ─── TOP PRODUCTS (CAROUSEL-LIKE) ─── */}
        {paginatedItems.length > 0 && (
          <div className="mb-16 md:mb-20">
            <div className="flex items-center justify-between mb-6 border-b-2 border-[#f4f5f7] pb-2">
              <h2 className="text-[24px] md:text-[28px] font-black text-[#333] uppercase italic flex items-center">
                Top Rated Gear ({totalItems})
              </h2>
              <a href="#" className="text-[14px] font-black text-[#0082c3] hover:underline uppercase italic flex items-center">
                View All <ChevronRight className="w-4 h-4" />
              </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
              {paginatedItems.map((product: any, idx: number) => (
                <div key={product.id || idx} data-product-id={product.id} className="group cursor-pointer flex flex-col bg-white border border-gray-200 rounded-[4px] hover:border-[#0082c3] hover:shadow-[0_8px_20px_rgba(0,130,195,0.15)] transition-all h-full relative">
                  {idx === 0 && <div className="absolute top-0 right-0 z-10 bg-[#cc163f] text-white text-[10px] md:text-[12px] font-black px-2 py-1 uppercase italic shadow-sm">-20% OFF</div>}
                  {idx === 2 && <div className="absolute top-0 left-0 z-10 bg-[#ffd100] text-black text-[10px] md:text-[12px] font-black px-2 py-1 uppercase italic shadow-sm">BEST SELLER</div>}

                  <div className="relative aspect-square overflow-hidden bg-white p-4 flex items-center justify-center">
                    <Image src={product.imageUrl} alt={product.title} fill className="object-contain p-4 group-hover:scale-105 transition-transform duration-500 mix-blend-multiply" referrerPolicy="no-referrer" />
                  </div>

                  <div className="p-4 flex flex-col flex-1 border-t border-gray-100">
                    <div className="text-[11px] font-black uppercase tracking-widest text-[#0082c3] mb-1.5">{product.category || 'Sport'}</div>
                    <h3 className="text-[14px] md:text-[15px] font-bold text-[#333] line-clamp-2 mb-3 leading-snug group-hover:underline decoration-[#0082c3]">{product.title}</h3>

                    <div className="mt-auto flex flex-col pt-2">
                      <div className="flex text-[#ffd100] mb-2">
                        {[1, 2, 3, 4, 5].map(s => <Activity key={s} className="w-3.5 h-3.5 fill-[#ffd100] text-[#ffd100]" />)}
                        <span className="text-[11px] text-gray-500 font-bold ml-1">({Math.floor(Math.random() * 200) + 15})</span>
                      </div>
                      <div className="flex items-end flex-wrap gap-2">
                        <span className="font-black text-[22px] md:text-[24px] text-[#333] leading-none">${product.price}</span>
                        {idx === 0 && <span className="text-[13px] text-gray-400 line-through font-bold mb-0.5">${(parseFloat(product.price) * 1.25).toFixed(2)}</span>}
                      </div>
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
          </div>
        )}

        {/* ─── INNOVATION BANNER ─── */}
        <div className="mb-20 bg-white border border-gray-200 rounded-[4px] overflow-hidden shadow-sm flex flex-col lg:flex-row hover:shadow-lg transition-shadow">
          <div className="w-full lg:w-[45%] relative aspect-[4/3] lg:aspect-auto">
            <Image src="https://picsum.photos/1000/800?random=218" alt="Innovation" fill className="object-cover" />
            <div className="absolute inset-0 bg-[#0082c3]/10 mix-blend-multiply" />
            {/* SportZone specific badge */}
            <div className="absolute top-6 left-6 bg-white p-2 rounded-[2px] shadow-lg">
              <span className="font-black text-[16px] text-[#0082c3] italic uppercase">Innovation</span>
            </div>
          </div>
          <div className="w-full lg:w-[55%] p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-[#fdfdfd]">
            <div className="flex items-center text-[#ec6607] font-black text-[13px] uppercase tracking-widest mb-4">
              <Activity className="w-4 h-4 mr-2" /> Research & Development
            </div>
            <h2 className="text-[32px] md:text-[40px] font-black text-[#333] mb-6 uppercase italic leading-tight">Designed for athletes,<br /> by athletes.</h2>
            <p className="text-[16px] md:text-[18px] text-gray-700 mb-8 leading-relaxed font-medium">
              We own all our exclusive brands. This means we design, manufacture, and sell all our products ourselves. By controlling the entire supply chain, we can ensure the highest quality gear at unbeatable prices.
            </p>
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="flex flex-col">
                <span className="text-[36px] font-black text-[#0082c3] italic leading-none mb-1">80+</span>
                <span className="text-[13px] font-bold text-gray-500 uppercase tracking-wide">Sports Covered</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[36px] font-black text-[#0082c3] italic leading-none mb-1">2 Yr</span>
                <span className="text-[13px] font-bold text-gray-500 uppercase tracking-wide">Minimum Warranty</span>
              </div>
            </div>
            <button className="bg-[#0082c3] text-white px-8 py-3.5 rounded-[4px] font-black text-[15px] hover:bg-[#0070a8] transition-colors uppercase italic self-start shadow-md flex items-center">
              Discover Our Brands <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>

        {/* ─── ECODESIGN SUSTAINABILITY ─── */}
        <div className="mb-20 bg-[#e6f3f9] rounded-[4px] p-8 md:p-14 lg:p-20 text-center border-t-8 border-[#0082c3] shadow-inner relative overflow-hidden">
          <Leaf className="absolute -left-10 -bottom-10 w-64 h-64 text-[#0082c3] opacity-5 -rotate-45" />
          <Leaf className="absolute -right-10 -top-10 w-64 h-64 text-[#0082c3] opacity-5 rotate-45" />

          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-md relative z-10">
            <Leaf className="w-10 h-10 text-[#5cb85c]" />
          </div>
          <h2 className="text-[32px] md:text-[40px] font-black text-[#333] mb-6 uppercase italic relative z-10">Commitment to the Playing Field</h2>
          <p className="text-[16px] md:text-[18px] text-gray-700 max-w-3xl mx-auto mb-12 leading-relaxed font-medium relative z-10">
            We are committed to reducing our environmental impact. Look for the Ecodesign label on our products, indicating they are made with more sustainable materials, recycled components, or water-saving processes.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto relative z-10">
            <div className="bg-white p-8 rounded-[4px] shadow-sm hover:shadow-md transition-shadow flex flex-col items-center border-[3px] border-transparent hover:border-[#5cb85c]">
              <h3 className="font-black text-[42px] text-[#5cb85c] mb-2 leading-none italic">100%</h3>
              <p className="text-[15px] text-gray-700 font-bold uppercase tracking-wide">Renewable Energy</p>
              <p className="text-[13px] text-gray-500 mt-2 font-medium">in our stores by 2026</p>
            </div>
            <div className="bg-white p-8 rounded-[4px] shadow-sm hover:shadow-md transition-shadow flex flex-col items-center border-[3px] border-transparent hover:border-[#5cb85c]">
              <h3 className="font-black text-[42px] text-[#5cb85c] mb-2 leading-none italic">100%</h3>
              <p className="text-[15px] text-gray-700 font-bold uppercase tracking-wide">Ecodesigned</p>
              <p className="text-[13px] text-gray-500 mt-2 font-medium">products goal by 2026</p>
            </div>
            <div className="bg-white p-8 rounded-[4px] shadow-sm hover:shadow-md transition-shadow flex flex-col items-center border-[3px] border-transparent hover:border-[#5cb85c]">
              <RefreshCcw className="w-10 h-10 text-[#5cb85c] mb-3" strokeWidth={2.5} />
              <p className="text-[15px] text-gray-700 font-bold uppercase tracking-wide">Repair Workshops</p>
              <p className="text-[13px] text-gray-500 mt-2 font-medium">in every store to extend life</p>
            </div>
          </div>
        </div>

        {/* ─── VALUE PROPS ─── */}
        <div className="mb-12 border-t border-gray-200 pt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center px-4">
            <div className="w-16 h-16 bg-[#0082c3] text-white rounded-full flex items-center justify-center mb-4">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h4 className="font-black text-[16px] uppercase italic mb-2">365 Days Return</h4>
            <p className="text-[14px] text-gray-600 font-medium">Return any product within 365 days if you're a member or 30 days with a receipt.</p>
          </div>
          <div className="flex flex-col items-center text-center px-4">
            <div className="w-16 h-16 bg-[#0082c3] text-white rounded-full flex items-center justify-center mb-4">
              <RefreshCcw className="w-8 h-8" />
            </div>
            <h4 className="font-black text-[16px] uppercase italic mb-2">Free In-Store Pickup</h4>
            <p className="text-[14px] text-gray-600 font-medium">Order online and pick it up at your local SportZone store for free in 2 hours.</p>
          </div>
          <div className="flex flex-col items-center text-center px-4">
            <div className="w-16 h-16 bg-[#0082c3] text-white rounded-full flex items-center justify-center mb-4">
              <HelpCircle className="w-8 h-8" />
            </div>
            <h4 className="font-black text-[16px] uppercase italic mb-2">Expert Advice</h4>
            <p className="text-[14px] text-gray-600 font-medium">Our teammates are sports passionate. Use our chat or visit a store for recommendations.</p>
          </div>
          <div className="flex flex-col items-center text-center px-4">
            <div className="w-16 h-16 bg-[#0082c3] text-white rounded-full flex items-center justify-center mb-4">
              <User className="w-8 h-8" />
            </div>
            <h4 className="font-black text-[16px] uppercase italic mb-2">Free Membership</h4>
            <p className="text-[14px] text-gray-600 font-medium">Join for free. Get unlimited returns, customized offers, and much more.</p>
          </div>
        </div>

      </main>

      {/* ─── FOOTER ─── */}
      <footer className="bg-[#1e2a3b] text-white pt-16 md:pt-20 border-t-8 border-[#ffd100]">
        <div className="w-full max-w-[1400px] mx-auto px-6">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-12 mb-16">

            <div className="flex flex-col space-y-4">
              <h4 className="text-[#ffd100] text-[16px] font-black mb-2 uppercase italic tracking-wide">Customer Service</h4>
              <a href="#" className="text-[14px] font-medium text-gray-300 hover:text-white hover:underline transition-colors w-fit">Help Center</a>
              <a href="#" className="text-[14px] font-medium text-gray-300 hover:text-white hover:underline transition-colors w-fit">Track Order</a>
              <a href="#" className="text-[14px] font-medium text-gray-300 hover:text-white hover:underline transition-colors w-fit">Return Policy</a>
              <a href="#" className="text-[14px] font-medium text-gray-300 hover:text-white hover:underline transition-colors w-fit">Shipping Information</a>
              <a href="#" className="text-[14px] font-medium text-gray-300 hover:text-white hover:underline transition-colors w-fit">Product Recall</a>
              <a href="#" className="text-[14px] font-medium text-gray-300 hover:text-white hover:underline transition-colors w-fit">Contact Us</a>
            </div>

            <div className="flex flex-col space-y-4">
              <h4 className="text-[#ffd100] text-[16px] font-black mb-2 uppercase italic tracking-wide">About SportZone</h4>
              <a href="#" className="text-[14px] font-medium text-gray-300 hover:text-white hover:underline transition-colors w-fit">Who We Are</a>
              <a href="#" className="text-[14px] font-medium text-gray-300 hover:text-white hover:underline transition-colors w-fit">Careers</a>
              <a href="#" className="text-[14px] font-medium text-gray-300 hover:text-white hover:underline transition-colors w-fit">Sustainability</a>
              <a href="#" className="text-[14px] font-medium text-gray-300 hover:text-white hover:underline transition-colors w-fit">Innovation & Design</a>
              <a href="#" className="text-[14px] font-medium text-gray-300 hover:text-white hover:underline transition-colors w-fit">Press Room</a>
            </div>

            <div className="flex flex-col space-y-4">
              <h4 className="text-[#ffd100] text-[16px] font-black mb-2 uppercase italic tracking-wide">Services & Programs</h4>
              <a href="#" className="text-[14px] font-medium text-gray-300 hover:text-white hover:underline transition-colors w-fit">Store Locator</a>
              <a href="#" className="text-[14px] font-medium text-gray-300 hover:text-white hover:underline transition-colors w-fit">Membership Program</a>
              <a href="#" className="text-[14px] font-medium text-gray-300 hover:text-white hover:underline transition-colors w-fit">Gift Cards</a>
              <a href="#" className="text-[14px] font-medium text-gray-300 hover:text-white hover:underline transition-colors w-fit">Workshop & Repair Services</a>
              <a href="#" className="text-[14px] font-medium text-gray-300 hover:text-white hover:underline transition-colors w-fit">B2B Sales & Clubs</a>
            </div>

            <div className="flex flex-col bg-[#273447] p-6 rounded-[4px] border border-gray-700">
              <h4 className="text-[#ffd100] text-[16px] font-black mb-4 uppercase italic tracking-wide">Join the Team</h4>
              <p className="text-[13px] text-gray-300 mb-4 font-medium line-clamp-2">Subscribe to our newsletter to receive the latest sports news, exclusive offers, and sports advice.</p>
              <div className="flex mb-6 w-full">
                <input type="email" placeholder="Enter your email" className="bg-white text-[#333] px-3 py-2.5 outline-none w-full font-medium text-[14px] rounded-l-[4px]" />
                <button className="bg-[#0082c3] text-white px-4 py-2.5 hover:bg-[#0070a8] transition-colors uppercase italic font-black text-[14px] rounded-r-[4px]">Join</button>
              </div>

              <h4 className="text-[14px] font-black mb-3 text-white uppercase tracking-wide">Follow Us</h4>
              <div className="flex space-x-3">
                <a href="#" className="w-[36px] h-[36px] bg-[#334259] rounded-full flex items-center justify-center hover:bg-[#0082c3] transition-colors text-white"><Facebook className="w-[18px] h-[18px] fill-current" /></a>
                <a href="#" className="w-[36px] h-[36px] bg-[#334259] rounded-full flex items-center justify-center hover:bg-[#0082c3] transition-colors text-white"><Twitter className="w-[18px] h-[18px] fill-current" /></a>
                <a href="#" className="w-[36px] h-[36px] bg-[#334259] rounded-full flex items-center justify-center hover:bg-[#0082c3] transition-colors text-white"><Instagram className="w-[18px] h-[18px]" /></a>
                <a href="#" className="w-[36px] h-[36px] bg-[#334259] rounded-full flex items-center justify-center hover:bg-[#0082c3] transition-colors text-white"><Youtube className="w-[18px] h-[18px]" /></a>
              </div>
            </div>

          </div>

          <div className="pt-8 pb-8 border-t border-gray-700 flex flex-col md:flex-row items-center justify-between text-[12px] font-medium text-gray-400 gap-4">
            <span className="text-center md:text-left">© 2026 {data.name} USA LLC. All rights reserved.</span>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
              <a href="#" className="hover:text-white transition-colors">Accessibility</a>
              <a href="#" className="hover:text-white transition-colors">CA Privacy Rights</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Manager</a>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
