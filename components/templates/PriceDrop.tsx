'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { StoreData } from '@/lib/types';
import { Search, ShoppingCart, Heart, User, Menu, Zap, Flame, Sparkles, Percent, Package, Truck, ShieldCheck, ChevronDown, Bell, Star, X } from 'lucide-react';
import { usePagination, ProductPagination } from './shared/Pagination';

export default function PriceDropTemplate({ data }: { data: StoreData }) {
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

  const categories = ['Best Sellers', '5-Star Rated', 'New Arrivals', 'Home & Kitchen', 'Women\'s Clothing', 'Men\'s Clothing', 'Shoes', 'Electronics', 'Beauty & Health', 'Toys & Games', 'Automotive', 'Tools'];

  return (
    <div className="min-h-full bg-[#f4f4f4] font-sans text-[#333] selection:bg-[#ff6000] selection:text-white pb-10 overflow-x-hidden">

      {/* ─── TOP PROMO BAR ─── */}
      <div className="bg-black text-white text-[11px] md:text-[13px] py-1 px-4 flex justify-between items-center font-bold tracking-wide w-full relative z-50">
        <div className="flex items-center space-x-6">
          <a href="#" className="hidden md:flex items-center hover:text-[#ff6000] transition-colors">
            <Sparkles className="w-3.5 h-3.5 mr-1 text-[#ff6000]" /> Shop like a billionaire
          </a>
        </div>
        <div className="flex items-center justify-center space-x-4 md:space-x-8">
          <span className="flex items-center"><Truck className="w-4 h-4 mr-1.5 text-[#ff6000]" /> FREE shipping on all orders</span>
          <span className="hidden sm:flex items-center"><Package className="w-4 h-4 mr-1.5 text-[#ff6000]" /> FREE returns within 90 days</span>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <a href="#" className="flex items-center hover:text-[#ff6000] transition-colors"><ShieldCheck className="w-3.5 h-3.5 mr-1" /> Buyer Protection</a>
        </div>
      </div>

      {/* ─── SECONDARY TOP BAR (Utility Nav) ─── */}
      <div className="hidden lg:flex justify-end items-center w-full px-6 py-1.5 border-b border-gray-200 text-[12px] font-medium text-gray-600 bg-white">
        <div className="flex items-center space-x-6">
          <a href="#" className="hover:text-[#ff6000] transition-colors flex items-center">Download App</a>
          <a href="#" className="hover:text-[#ff6000] transition-colors flex items-center">Support Center</a>
          <a href="#" className="hover:text-[#ff6000] transition-colors">Language: EN</a>
          <a href="#" className="hover:text-[#ff6000] transition-colors">Currency: USD</a>
        </div>
      </div>

      {/* ─── MAIN HEADER ─── */}
      <header className="bg-white sticky top-0 z-40 border-b border-gray-200 shadow-sm">
        <div className="w-full max-w-[1500px] mx-auto px-4 md:px-6 h-[72px] flex items-center justify-between">

          <div className="flex items-center shrink-0 mr-4 md:mr-8">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden mr-3 p-1 hover:text-[#ff6000] transition-colors"
            >
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
            <div className="flex items-center cursor-pointer">
              <span className="font-black text-[32px] md:text-[42px] tracking-tighter uppercase leading-none text-black flex items-center">
                Te<span className="text-[#ff6000]">mu</span>
              </span>
            </div>
          </div>

          {/* Main Search Bar */}
          <div className="hidden lg:flex items-center bg-white rounded-full flex-1 max-w-[800px] border-[2.5px] border-[#ff6000] overflow-hidden group">
            <div className="flex items-center justify-center px-4 bg-gray-50 border-r border-gray-200 h-full py-2.5 cursor-pointer">
              <span className="text-[14px] font-bold text-gray-700 whitespace-nowrap">All categories</span>
              <ChevronDown className="w-4 h-4 text-gray-500 ml-1" />
            </div>
            <input
              type="text"
              placeholder="Search for items, brands, and more"
              className="bg-transparent outline-none text-[15px] w-full px-4 font-medium placeholder-gray-400 text-black h-full"
            />
            <button className="bg-[#ff6000] hover:bg-[#e55600] text-white px-8 py-3 h-full font-bold transition-colors">
              <Search className="w-5 h-5" strokeWidth={2.5} />
            </button>
          </div>

          <div className="flex items-center h-full space-x-4 ml-4 md:ml-8">
            <div className="flex lg:hidden items-center justify-center p-2 cursor-pointer bg-gray-100 rounded-full">
              <Search className="w-5 h-5 text-black" />
            </div>

            <a href="#" className="hidden xl:flex flex-col items-center justify-center cursor-pointer hover:text-[#ff6000] transition-colors w-[60px]">
              <User className="w-[24px] h-[24px]" strokeWidth={1.5} />
              <span className="text-[11px] font-bold mt-1 max-w-[60px] truncate">Sign in</span>
            </a>

            <a href="#" className="hidden xl:flex flex-col items-center justify-center cursor-pointer hover:text-[#ff6000] transition-colors w-[60px]">
              <div className="relative">
                <Bell className="w-[24px] h-[24px]" strokeWidth={1.5} />
                <span className="absolute -top-1 -right-1.5 bg-[#ff6000] text-white text-[10px] font-bold px-1 rounded-full min-w-[16px] text-center border-2 border-white">3</span>
              </div>
              <span className="text-[11px] font-bold mt-1">Messages</span>
            </a>

            <div 
              onClick={() => toggleFavorite('header')}
              className="relative hidden md:flex flex-col items-center justify-center cursor-pointer hover:text-[#ff6000] transition-colors w-[60px] border-l border-gray-200 pl-4 ml-2"
            >
              <Heart className={`w-[24px] h-[24px] ${favorites.length > 0 ? 'fill-red-500 text-red-500' : ''}`} strokeWidth={1.5} />
              <span className="text-[11px] font-bold mt-1">Wishlist</span>
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold px-1 rounded-full min-w-[16px] text-center border-2 border-white">{favorites.length}</span>
              )}
            </div>

            <div 
              onClick={addToCart}
              className="flex flex-col items-center justify-center cursor-pointer hover:text-[#ff6000] transition-colors px-2"
            >
              <div className="relative">
                <ShoppingCart className="w-[28px] h-[28px]" strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[#ff6000] text-white text-[11px] font-bold px-1.5 rounded-full min-w-[20px] text-center border-2 border-white shadow-sm">{cartCount}</span>
                )}
              </div>
              <span className="text-[11px] font-bold mt-1 hidden md:block">Cart</span>
            </div>
          </div>
        </div>

        {/* Categories Nav */}
        <nav className="w-full bg-white border-t border-gray-100 overflow-x-auto hide-scrollbar">
          <div className="flex max-w-[1500px] mx-auto px-4 w-max space-x-1 py-1">
            {categories.map((cat, i) => (
              <a key={i} href="#" className={`text-[13px] font-bold px-4 py-2 rounded-full whitespace-nowrap transition-colors ${i === 0 || i === 2 ? 'text-[#ff6000] bg-orange-50/50 hover:bg-orange-100' : 'text-gray-700 hover:bg-gray-100'}`}>
                {cat}
              </a>
            ))}
          </div>
        </nav>
      </header>

      <main className="w-full max-w-[1500px] mx-auto px-2 sm:px-4 py-6">

        {/* ─── HERO BANNER SECTION ─── */}
        <div className="flex flex-col lg:flex-row gap-4 mb-10 w-full min-h-[300px] md:min-h-[460px]">

          {/* Main Carousel Banner */}
          <div className="relative flex-[3] group cursor-pointer overflow-hidden rounded-[8px] xl:rounded-[12px] shadow-sm border border-gray-200 bg-white min-h-[300px] lg:min-h-[460px]">
            <Image
              src={data.bannerImage}
              alt="Banner"
              fill
              className="object-cover md:object-fill lg:object-cover group-hover:scale-105 transition-transform duration-[600ms] ease-out brightness-95"
              referrerPolicy="no-referrer"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex flex-col justify-center p-8 md:p-14">
              <div className="bg-[#ff6000] text-white px-3 py-1 w-fit rounded-[2px] font-black text-[11px] md:text-[13px] uppercase tracking-wider mb-4 shadow-xl flex items-center">
                <Zap className="w-4 h-4 mr-1 fill-white" /> Biggest Sale of the Year
              </div>
              <h1 className="text-[36px] md:text-[54px] lg:text-[72px] font-black tracking-tighter text-white mb-2 leading-[1.05] drop-shadow-xl w-[90%] md:w-[70%]">
                {data.name}
              </h1>
              <p className="text-[16px] md:text-[22px] font-bold text-white mb-8 drop-shadow-lg max-w-lg leading-snug">
                {data.description || 'Up to 90% OFF on millions of items! Discover unbeatable prices.'}
              </p>
              <button className="bg-white text-[#ff6000] px-8 py-3.5 rounded-[40px] font-black uppercase text-[15px] tracking-wide hover:scale-105 transition-transform shadow-[0_4px_15px_rgba(255,96,0,0.4)] w-fit active:scale-95 flex items-center">
                Shop the Drop <ChevronDown className="w-5 h-5 ml-1 -rotate-90" />
              </button>
            </div>
          </div>

          {/* Right side mini promos */}
          <div className="hidden lg:flex flex-[1] flex-col gap-4">
            <div className="flex-1 bg-gradient-to-br from-[#ffe8da] to-[#fff4ed] rounded-[12px] p-6 border border-[#ffcca8] relative overflow-hidden group cursor-pointer">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff6000]/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="text-[#ff6000] font-black text-[12px] uppercase tracking-widest mb-1 flex items-center">
                    <Flame className="w-4 h-4 mr-1 fill-[#ff6000]" /> Lightning Deals
                  </div>
                  <h3 className="text-[24px] font-black leading-tight text-gray-900 mb-2">Flash Sale Ends Soon</h3>
                  <p className="text-[13px] font-bold text-gray-700">Grab it before it's gone!</p>
                </div>
                <div className="flex gap-2 mt-4 aspect-[2/1] bg-white rounded-[8px] p-2 shadow-sm border border-orange-100">
                  <div className="w-1/2 relative bg-gray-50 rounded-[4px] overflow-hidden"><Image src="https://picsum.photos/400/400?random=190" alt="" fill className="object-cover" /></div>
                  <div className="w-1/2 relative bg-gray-50 rounded-[4px] overflow-hidden"><Image src="https://picsum.photos/400/400?random=191" alt="" fill className="object-cover" /></div>
                </div>
              </div>
            </div>
            <div className="flex-1 bg-gradient-to-br from-[#1b1e23] to-[#2c313a] rounded-[12px] p-6 border border-gray-800 relative overflow-hidden group cursor-pointer">
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="text-[#ffd700] font-black text-[12px] uppercase tracking-widest mb-1 flex items-center">
                    <Star className="w-4 h-4 mr-1 fill-[#ffd700]" /> New User Gift
                  </div>
                  <h3 className="text-[24px] font-black leading-tight text-white mb-2">Claim Your $100 Coupon Bundle</h3>
                  <p className="text-[13px] font-medium text-gray-300">Register now to unlock exclusive savings on your first app order.</p>
                </div>
                <button className="w-full bg-[#ff6000] text-white py-3 rounded-[40px] font-bold text-[14px] mt-4 hover:bg-[#e55600] transition-colors">
                  Claim Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ─── LIGHTNING DEALS STRIP ─── */}
        <div className="mb-10 lg:mb-14">
          <div className="flex items-center justify-between mb-4 px-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <h2 className="text-[22px] md:text-[28px] font-black tracking-tight text-gray-900 flex items-center">
                Lightning Deals
              </h2>
              <div className="flex items-center text-[13px] font-bold text-[#ff6000] bg-orange-50 px-3 py-1 rounded-[4px]">
                Ends in: <span className="text-black bg-[#ff6000]/10 px-1.5 py-0.5 rounded ml-2">12</span><span className="mx-0.5">:</span><span className="text-black bg-[#ff6000]/10 px-1.5 py-0.5 rounded">45</span><span className="mx-0.5">:</span><span className="text-black bg-[#ff6000]/10 px-1.5 py-0.5 rounded">03</span>
              </div>
            </div>
            <a href="#" className="flex items-center text-[14px] font-bold text-gray-600 hover:text-[#ff6000] cursor-pointer">
              View All <ChevronDown className="w-4 h-4 -rotate-90 ml-1" />
            </a>
          </div>

          {/* Deals Horizontal Scroller */}
          <div className="flex overflow-x-auto hide-scrollbar gap-2 sm:gap-4 pb-4 px-1" style={{ scrollSnapType: 'x mandatory' }}>
            {data.products.slice(0, 10).map((product, idx) => {
              const discount = Math.floor(Math.random() * 60) + 30; // 30-90% discount
              const originalPrice = parseFloat(product.price.replace(/[$,]/g, '')) / (1 - (discount / 100));

              return (
                <div key={idx} data-product-id={product.id} className="shrink-0 w-[140px] md:w-[180px] lg:w-[220px] bg-white rounded-[8px] p-2 md:p-3 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all cursor-pointer border border-gray-100 flex flex-col hover:border-[#ff6000]" style={{ scrollSnapAlign: 'start' }}>
                  <div className="relative aspect-square w-full rounded-[4px] overflow-hidden bg-[#f9f9f9] mb-3">
                    <Image src={product.imageUrl} alt={product.title} fill className="object-contain mix-blend-multiply" referrerPolicy="no-referrer" />
                    <div className="absolute top-1 left-1 md:top-2 md:left-2 bg-[#ff6000] text-white text-[10px] md:text-[12px] font-black px-1.5 py-0.5 rounded-[2px] leading-tight shadow-sm">
                      -{discount}%
                    </div>
                  </div>
                  <div className="flex flex-col mt-auto pb-1">
                    <div className="flex items-end gap-1 mb-0.5">
                      <span className="text-[12px] md:text-[14px] font-bold text-[#ff6000] bg-orange-50 px-1 py-0.5 rounded leading-none">Limited</span>
                    </div>
                    <div className="flex items-baseline gap-1.5 mt-1">
                      <span className="font-black text-[18px] md:text-[22px] text-gray-900 leading-none">${product.price}</span>
                      <span className="text-[11px] md:text-[12px] text-gray-400 line-through font-medium leading-none">${originalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ─── MAIN PRODUCT GRID ─── */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-4 md:mb-6 px-1">
            <h2 className="text-[22px] md:text-[28px] font-black tracking-tight text-gray-900 flex items-center">
              Recommended for you ({totalItems})
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
            {paginatedItems.map((product: any, idx: number) => {
              const discount = Math.floor(Math.random() * 50) + 40;
              const original = parseFloat(product.price.replace(/[$,]/g, '')) / (1 - (discount / 100));
              const sold = Math.floor(Math.random() * 100) + 5;
              const reviewCount = Math.floor(Math.random() * 5000) + 100;
              return (
                <div key={product.id || idx} className="group cursor-pointer flex flex-col bg-white rounded-[8px] overflow-hidden hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)] transition-all border border-transparent hover:border-gray-200">
                  <div className="relative aspect-square overflow-hidden bg-[#f7f7f7]">
                    <Image
                      src={product.imageUrl}
                      alt={product.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    {idx % 3 === 0 && (
                      <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-[4px] shadow flex items-center">
                        <Flame className="w-3 h-3 mr-1 text-[#ff6000] fill-[#ff6000]" /> Hot
                      </div>
                    )}
                    {/* Cart Overlay Button */}
                    <button 
                      onClick={(e) => { e.stopPropagation(); addToCart(); }}
                      className="absolute bottom-3 right-3 w-9 h-9 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 shadow-[0_4px_10px_rgba(0,0,0,0.15)] hover:bg-[#ff6000] hover:text-white transition-all translate-y-2 group-hover:translate-y-0 text-black"
                    >
                      <ShoppingCart className="w-5 h-5" strokeWidth={2} />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }}
                      className="absolute top-2 left-2 p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Heart className={`w-4 h-4 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                    </button>
                  </div>

                  <div className="p-2 sm:p-3 flex flex-col flex-1 h-[150px]">
                    <h3 className="text-[13px] sm:text-[14px] font-medium text-gray-800 line-clamp-2 leading-[1.3] mb-1 group-hover:underline">
                      {product.title}
                    </h3>

                    <div className="flex items-center gap-1 mb-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-3 h-3 text-[#ffc107] fill-[#ffc107]" />)}
                      </div>
                      <span className="text-[11px] text-gray-500">({reviewCount})</span>
                    </div>

                    <div className="mt-auto flex flex-col">
                      <div className="flex items-baseline space-x-1.5 overflow-hidden whitespace-nowrap">
                        <span className="font-black text-[18px] sm:text-[22px] text-gray-900 leading-none">${product.price}</span>
                        <span className="text-[11px] sm:text-[13px] text-gray-400 line-through font-medium leading-none">${original.toFixed(2)}</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-1 mt-1.5">
                        {idx % 2 === 0 && (
                          <span className="text-[10px] font-bold text-[#ff6000] bg-orange-50 px-1.5 py-0.5 rounded-[2px] leading-tight border border-orange-100">
                            Almost sold out
                          </span>
                        )}
                        <span className="text-[10px] font-medium text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded-[2px] leading-tight">
                          {sold}k+ sold
                        </span>
                      </div>
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
      </main>

      {/* ─── PRICEDROP GUARANTEE HIGHLIGHT ─── */}
      <div className="w-full bg-white py-10 md:py-16 border-t border-gray-200 mt-20">
        <div className="max-w-[1500px] mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-3">
            <div className="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center p-3 text-black">
              <Truck className="w-8 h-8" strokeWidth={1.5} />
            </div>
            <div>
              <h4 className="font-black text-[15px] mb-1">Free Shipping</h4>
              <p className="text-[13px] text-gray-500 font-medium leading-snug">On all orders. Plus, get a $5 credit for delayed delivery.</p>
            </div>
          </div>
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-3">
            <div className="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center p-3 text-black">
              <Package className="w-8 h-8" strokeWidth={1.5} />
            </div>
            <div>
              <h4 className="font-black text-[15px] mb-1">90-Day Returns</h4>
              <p className="text-[13px] text-gray-500 font-medium leading-snug">Return eligible items easily and for free within 90 days.</p>
            </div>
          </div>
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-3">
            <div className="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center p-3 text-black">
              <ShieldCheck className="w-8 h-8" strokeWidth={1.5} />
            </div>
            <div>
              <h4 className="font-black text-[15px] mb-1">Price Adjustment</h4>
              <p className="text-[13px] text-gray-500 font-medium leading-snug">Get a refund for the price difference within 30 days.</p>
            </div>
          </div>
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-3">
            <div className="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center p-3 text-black">
              <Sparkles className="w-8 h-8" strokeWidth={1.5} />
            </div>
            <div>
              <h4 className="font-black text-[15px] mb-1">PriceDrop Purchase Protection</h4>
              <p className="text-[13px] text-gray-500 font-medium leading-snug">Shop confidently with our comprehensive buyer protection policy.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── FOOTER ─── */}
      <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
        <div className="w-full max-w-[1500px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-12 mb-16 text-[13px] text-gray-600 font-medium">
            <div className="flex flex-col col-span-2 lg:col-span-2 max-w-sm">
              <div className="font-black text-[32px] tracking-tighter uppercase leading-none text-black mb-6 flex items-center">
                Te<span className="text-[#ff6000]">mu</span>
              </div>
              <p className="mb-6 leading-relaxed">
                Shop on PriceDrop for exclusive offers. No matter what you're looking for, PriceDrop has you covered with millions of items to choose from.
              </p>
              <h4 className="font-bold text-black mb-4">Connect with us</h4>
              <div className="flex gap-4 mb-4">
                {/* Social icons map */}
                <div className="w-9 h-9 bg-black rounded-full text-white flex items-center justify-center cursor-pointer hover:bg-[#ff6000] transition-colors"><Image src="https://picsum.photos/50/50?random=1" className="rounded-full invert w-5 h-5" width={20} height={20} alt="" /></div>
                <div className="w-9 h-9 bg-black rounded-full text-white flex items-center justify-center cursor-pointer hover:bg-[#ff6000] transition-colors"><Image src="https://picsum.photos/50/50?random=2" className="rounded-full invert w-5 h-5" width={20} height={20} alt="" /></div>
                <div className="w-9 h-9 bg-black rounded-full text-white flex items-center justify-center cursor-pointer hover:bg-[#ff6000] transition-colors"><Image src="https://picsum.photos/50/50?random=3" className="rounded-full invert w-5 h-5" width={20} height={20} alt="" /></div>
              </div>
            </div>

            <div className="flex flex-col gap-y-3">
              <h4 className="text-black font-bold text-[15px] mb-2 font-black">Company info</h4>
              <a href="#" className="hover:text-[#ff6000] transition-colors w-fit">About PriceDrop</a>
              <a href="#" className="hover:text-[#ff6000] transition-colors w-fit">Affiliate Program</a>
              <a href="#" className="hover:text-[#ff6000] transition-colors w-fit">Influencer Program</a>
              <a href="#" className="hover:text-[#ff6000] transition-colors w-fit">Careers</a>
              <a href="#" className="hover:text-[#ff6000] transition-colors w-fit">Press Center</a>
              <a href="#" className="hover:text-[#ff6000] transition-colors w-fit">Campus Ambassador</a>
            </div>

            <div className="flex flex-col gap-y-3">
              <h4 className="text-black font-bold text-[15px] mb-2 font-black">Customer service</h4>
              <a href="#" className="hover:text-[#ff6000] transition-colors w-fit">Return and refund policy</a>
              <a href="#" className="hover:text-[#ff6000] transition-colors w-fit">Intellectual property policy</a>
              <a href="#" className="hover:text-[#ff6000] transition-colors w-fit">Shipping info</a>
              <a href="#" className="hover:text-[#ff6000] transition-colors w-fit">Report suspicious activity</a>
            </div>

            <div className="flex flex-col gap-y-3">
              <h4 className="text-black font-bold text-[15px] mb-2 font-black">Help</h4>
              <a href="#" className="hover:text-[#ff6000] transition-colors w-fit">Support Center & FAQ</a>
              <a href="#" className="hover:text-[#ff6000] transition-colors w-fit">PriceDrop purchase protection</a>
              <a href="#" className="hover:text-[#ff6000] transition-colors w-fit">Sitemap</a>
              <a href="#" className="hover:text-[#ff6000] transition-colors w-fit">Partner with PriceDrop</a>
            </div>

            <div className="flex flex-col gap-y-4">
              <h4 className="text-black font-bold text-[15px] mb-2 font-black">Download the PriceDrop App</h4>
              <div className="flex flex-col gap-3">
                <button className="bg-black text-white px-4 py-2.5 rounded-[8px] flex items-center justify-start gap-3 hover:bg-gray-800 transition-colors">
                  <div className="w-6 h-6 bg-white/20 rounded-full shrink-0"></div>
                  <div className="flex flex-col items-start leading-none">
                    <span className="text-[10px]">Download on the</span>
                    <span className="text-[14px] font-bold">App Store</span>
                  </div>
                </button>
                <button className="bg-black text-white px-4 py-2.5 rounded-[8px] flex items-center justify-start gap-3 hover:bg-gray-800 transition-colors">
                  <div className="w-6 h-6 bg-white/20 rounded-full shrink-0"></div>
                  <div className="flex flex-col items-start leading-none">
                    <span className="text-[10px]">GET IT ON</span>
                    <span className="text-[14px] font-bold">Google Play</span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row items-start md:items-center justify-between text-[12px] font-medium text-gray-500 gap-y-4">
            <div className="flex flex-col lg:flex-row gap-x-6 gap-y-2 lg:items-center">
              <span>© 2026 {data.logoText || 'PriceDrop'}. All Rights Reserved.</span>
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-black underline-offset-2">
                <a href="#" className="hover:text-[#ff6000] hover:underline transition-colors w-fit">Terms of use</a>
                <a href="#" className="hover:text-[#ff6000] hover:underline transition-colors w-fit">Privacy policy</a>
                <a href="#" className="hover:text-[#ff6000] hover:underline transition-colors w-fit">Your Privacy Choices</a>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-black font-bold mr-2">Secure payment:</span>
              <div className="flex gap-2">
                <div className="w-10 h-6 bg-gray-100 rounded border border-gray-200"></div>
                <div className="w-10 h-6 bg-gray-100 rounded border border-gray-200"></div>
                <div className="w-10 h-6 bg-gray-100 rounded border border-gray-200"></div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
