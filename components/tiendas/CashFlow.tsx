'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { StoreData, Product } from '@/lib/types';
import { useCart } from '@/contexts/CartContext';
import { Search, ShoppingCart, Heart, User, Menu, Zap, Gift, Percent, ChevronDown, CheckCircle, Smartphone, ExternalLink, X } from 'lucide-react';
import { usePagination, ProductPagination } from '@/components/componentes-compartidos/templates/Pagination';

export default function CashFlowTemplate({ data }: { data: StoreData }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { addToCart: addToCartContext, itemCount, setIsCartOpen } = useCart();
  const [favorites, setFavorites] = useState<string[]>([]);
  
  const itemsPerPage = 15; // 3 rows x 5 columns
  const {
    currentPage,
    totalPages,
    paginatedItems,
    handlePageChange,
    totalItems,
  } = usePagination(data.products, itemsPerPage);

  const handleAddToCart = (product: Product, e?: React.MouseEvent) => { if (e) e.stopPropagation(); addToCartContext(product); };

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div className="min-h-full bg-[#f4f4f4] font-sans text-black selection:bg-[#bf0000] selection:text-white pb-10 overflow-x-hidden">

      {/* ─── PROMO BAR ─── */}
      <div className="bg-[#bf0000] text-white text-[12px] md:text-[13px] py-2.5 px-6 flex justify-center items-center font-bold tracking-wide shadow-sm w-full z-50 relative">
        <Gift className="w-4 h-4 mr-2" />
        <span className="mr-2">Earn Cash Back at over 3,500 stores. Join for free and get a $30 Welcome Bonus!*</span>
        <a href="#" className="underline hover:text-white/80 transition-colors">Join Now</a>
      </div>

      {/* ─── MAIN HEADER ─── */}
      <header className="bg-white sticky top-0 z-40 border-b border-gray-200">
        <div className="w-full max-w-[1240px] mx-auto px-4 md:px-6 h-[72px] flex items-center justify-between">
          <div className="flex items-center space-x-6 md:space-x-10 shrink-0 h-full">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hover:text-[#bf0000] transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <div className="flex items-center cursor-pointer">
              {/* CashFlow Logo Text */}
              <span className="font-black text-[28px] md:text-[32px] tracking-tighter text-[#bf0000]">
                CashFlow
              </span>
            </div>
            {/* Desktop Left Nav */}
            <div className="hidden lg:flex h-full items-center font-bold text-[14px]">
              <div className="group h-full flex items-center cursor-pointer relative">
                <span className="hover:text-[#bf0000] transition-colors flex items-center font-bold">
                  Categories <ChevronDown className="w-4 h-4 ml-1 opacity-70" />
                </span>
              </div>
              <a href="#" className="ml-6 hover:text-[#bf0000] transition-colors flex items-center">Double Cash Back</a>
              <a href="#" className="ml-6 hover:text-[#bf0000] transition-colors flex items-center">In-Store</a>
              <a href="#" className="ml-6 hover:text-[#bf0000] transition-colors flex items-center">Travel</a>
            </div>
          </div>

          <div className="flex items-center h-full justify-end flex-1 space-x-4 md:space-x-6 pl-4 md:pl-8">
            <div className="hidden md:flex items-center bg-white border border-gray-300 rounded-full px-5 py-2 w-full max-w-[400px] hover:border-[#bf0000] focus-within:border-[#bf0000] focus-within:shadow-[0_0_0_1px_#bf0000] transition-all group">
              <input
                type="text"
                placeholder="Search stores, coupons or categories"
                className="bg-transparent outline-none text-[15px] w-full placeholder-gray-500 font-medium"
              />
              <Search className="w-5 h-5 text-gray-500 ml-2 group-focus-within:text-[#bf0000]" />
            </div>

            <Search className="w-6 h-6 md:hidden text-gray-700 cursor-pointer" />

            <div className="hidden md:flex items-center space-x-6 font-bold text-[14px]">
              <a href="#" className="hover:text-[#bf0000] transition-colors whitespace-nowrap text-[#bf0000]">How to Earn</a>
              <a href="#" className="hover:text-[#bf0000] transition-colors whitespace-nowrap">Sign In</a>
              <button className="bg-black hover:bg-gray-800 text-white px-5 py-2 rounded-full transition-colors whitespace-nowrap shadow-md">
                Join Now
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="w-full max-w-[1240px] mx-auto px-4 md:px-6 py-6 md:py-10">

        {/* ─── HERO BANNER ─── */}
        <div className="relative h-[350px] md:h-[450px] mb-12 flex flex-col md:flex-row bg-[#fdf0f0] rounded-[16px] overflow-hidden shadow-sm border border-[#fce4e4]">
          <div className="w-full md:w-1/2 p-8 md:p-14 flex flex-col justify-center order-2 md:order-1 relative z-10">
            <div className="bg-white text-[#bf0000] px-3 py-1.5 rounded-full font-bold text-[11px] md:text-[13px] uppercase tracking-wider mb-4 w-fit shadow-sm border border-red-100 flex items-center">
              <CheckCircle className="w-4 h-4 mr-1.5 text-[#bf0000]" /> Free to join
            </div>
            <h1 className="text-[36px] md:text-[48px] lg:text-[56px] font-black tracking-tight text-black mb-4 leading-tight w-full max-w-sm">
              Get Cash Back at 3,500+ stores.
            </h1>
            <p className="text-[16px] md:text-[18px] text-gray-700 font-medium mb-8">
              {data.description || 'Shop through CashFlow and get Cash Back on your everyday purchases.'}
            </p>
            <div className="flex items-center space-x-4">
              <button className="bg-[#bf0000] text-white px-8 py-4 rounded-full font-bold text-[16px] hover:bg-[#a00000] transition-colors shadow-lg active:scale-95 whitespace-nowrap">
                Join for Free
              </button>
              <span className="text-[14px] text-gray-500 font-medium hidden sm:block">No hidden fees. Just Cash Back.</span>
            </div>
          </div>
          <div className="w-full md:w-1/2 relative h-full min-h-[150px] order-1 md:order-2">
            <div className="absolute inset-0 bg-gradient-to-r from-[#fdf0f0] to-transparent z-10 w-24 hidden md:block" />
            <Image
              src={data.bannerImage}
              alt="Banner"
              fill
              className="object-cover object-right mix-blend-multiply opacity-80"
              referrerPolicy="no-referrer"
              priority
            />
          </div>
        </div>

        {/* ─── TRENDING STORES GRID (Paginated) ─── */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-[28px] font-black tracking-tight text-gray-900">Trending Stores ({totalItems})</h2>
            <a href="#" className="hidden md:flex text-[15px] font-bold text-[#bf0000] hover:underline items-center">
              See all stores
            </a>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 md:gap-4">
            {paginatedItems.map((brand, idx) => {
              // Usar descuento del producto si existe, o valores predeterminados
              const hasDiscount = brand.discount && brand.discount > 0;
              const discountValue = hasDiscount ? brand.discount : 5;
              const cashbackStr = `${discountValue.toFixed(1)}%`;
              const isDouble = hasDiscount && brand.discount && brand.discount > 10;
              return (
                <div key={brand.id || idx} data-product-id={brand.id} data-discount={brand.discount || 0} className="group cursor-pointer flex flex-col bg-white rounded-[12px] p-4 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all border border-gray-200">
                  <div className="relative aspect-[3/2] w-full flex items-center justify-center mb-3">
                    <Image
                      src={brand.imageUrl}
                      alt={brand.title}
                      fill
                      className="object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500 p-2"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex flex-col items-center flex-1">
                    <h3 className="text-[12px] font-bold text-gray-900 line-clamp-1 mb-1">{brand.title}</h3>
                    <div className="text-[10px] text-gray-500 font-medium mb-2">Coupons & Codes</div>
                    <div className={`mt-auto text-center w-full py-1.5 rounded-[8px] ${isDouble ? 'bg-[#fff0f0] text-[#bf0000]' : 'bg-[#eef8f3] text-[#08a05c]'}`}>
                      <div className="font-black text-[18px] leading-none mb-0.5">
                        {isDouble ? 'Up to 15%' : `Up to ${cashbackStr}`}
                      </div>
                      <div className="text-[10px] font-bold uppercase tracking-widest leading-none">Cash Back</div>
                    </div>
                    {isDouble && (
                      <div className="bg-[#bf0000] text-white text-[9px] font-bold px-2 py-0.5 rounded-[4px] mt-1.5 tracking-wide uppercase">
                        Was 5.0%
                      </div>
                    )}
                  </div>
                  <button 
                    onClick={(e) => handleAddToCart(brand, e)}
                    className="w-full bg-white border border-gray-300 text-black py-2 rounded-full font-bold text-[12px] mt-3 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-gray-50"
                  >
                    Shop Now <ExternalLink className="w-3 h-3 ml-1.5 text-gray-400" />
                  </button>
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

        {/* ─── HOW IT WORKS BANNER ─── */}
        <div className="w-full bg-[#1b1b1b] text-white rounded-[16px] p-8 md:p-12 mb-16 flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#bf0000] rounded-full blur-[100px] opacity-40 -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#bf0000] rounded-full blur-[100px] opacity-20 -ml-20 -mb-20"></div>

          <h2 className="text-[32px] md:text-[40px] font-black tracking-tight mb-12 relative z-10 w-full max-w-2xl leading-tight">
            Get paid for shopping at your favorite stores.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 w-full max-w-4xl relative z-10">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-6">
                <User className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-[20px] mb-2">1. Start with CashFlow</h3>
              <p className="text-[14px] text-gray-400 font-medium">Head to CashFlow.com, use our app, or install our browser extension.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-6 border border-[#bf0000]">
                <ShoppingCart className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-[20px] mb-2">2. Shop as usual</h3>
              <p className="text-[14px] text-gray-400 font-medium">Click through CashFlow to your favorite store and buy what you love.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-[#bf0000] rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(191,0,0,0.5)]">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-[20px] mb-2">3. Get Cash Back</h3>
              <p className="text-[14px] text-gray-400 font-medium">Watch your Cash Back balance grow, then get paid via check or PayPal.</p>
            </div>
          </div>
        </div>

        {/* ─── HOT DEALS AND COUPONS ─── */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-[28px] font-black tracking-tight text-gray-900">Hot Deals & Coupons</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.products.slice(0, 4).map((deal: any, idx: number) => (
              <div key={idx} data-product-id={deal.id} className="bg-white border border-gray-200 rounded-[12px] p-6 flex items-start gap-6 hover:shadow-lg transition-shadow cursor-pointer group">
                <div className="relative w-[100px] h-[100px] bg-gray-50 rounded-lg p-2 border border-gray-100 flex items-center justify-center shrink-0">
                  <Image src={deal.imageUrl} alt="" fill className="object-contain mix-blend-multiply p-2 group-hover:scale-105 transition-transform" referrerPolicy="no-referrer" />
                </div>
                <div className="flex flex-col">
                  <div className="bg-[#eef8f3] text-[#08a05c] w-fit px-2 py-1 rounded font-bold text-[12px] mb-2 uppercase tracking-wide">Up to 8% Cash Back</div>
                  <h3 className="font-bold text-[16px] text-gray-900 hover:text-[#bf0000] transition-colors leading-tight mb-2">
                    Extra 20% Off Select Styles + Cash Back
                  </h3>
                  <p className="text-[13px] text-gray-500 font-medium line-clamp-2">Code: <span className="font-bold text-black border border-dashed border-gray-400 px-2 py-0.5 rounded ml-1 bg-gray-50 select-all">SAVE20</span></p>
                  <button className="text-[#bf0000] font-bold text-[13px] mt-4 hover:underline flex items-center w-fit">
                    Shop Now <ChevronDown className="w-4 h-4 -rotate-90 ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── TOP CATEGORIES ─── */}
        <div className="mb-16">
          <h2 className="text-[28px] font-black tracking-tight text-gray-900 mb-8">Top Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Fashion', stores: '450+', color: 'bg-pink-50 border-pink-200' },
              { name: 'Electronics', stores: '320+', color: 'bg-blue-50 border-blue-200' },
              { name: 'Travel', stores: '280+', color: 'bg-green-50 border-green-200' },
              { name: 'Food & Dining', stores: '190+', color: 'bg-orange-50 border-orange-200' },
            ].map((cat, i) => (
              <div key={i} className={`group cursor-pointer rounded-[12px] p-6 border ${cat.color} hover:shadow-lg transition-all text-center`}>
                <div className="relative w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image src={`https://picsum.photos/200/200?random=${500 + i}`} alt={cat.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <h3 className="font-black text-[16px] text-gray-900 mb-1">{cat.name}</h3>
                <span className="text-[12px] text-gray-500 font-medium">{cat.stores} stores</span>
              </div>
            ))}
          </div>
        </div>

        {/* ─── FEATURED BRANDS ─── */}
        <div className="mb-16">
          <h2 className="text-[28px] font-black tracking-tight text-gray-900 mb-8">Featured Brands</h2>
          <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4">
            {data.products.slice(0, 8).map((brand, idx) => (
              <div key={`feat-${idx}`} className="min-w-[160px] md:min-w-[180px] shrink-0 group cursor-pointer bg-white rounded-[12px] p-4 border border-gray-200 hover:shadow-lg transition-all text-center">
                <div className="relative aspect-square w-full mb-3 rounded-lg overflow-hidden">
                  <Image src={brand.imageUrl} alt={brand.title} fill className="object-contain mix-blend-multiply p-3 group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                </div>
                <h3 className="text-[12px] font-bold text-gray-900 line-clamp-1">{brand.title}</h3>
                <div className="bg-[#eef8f3] text-[#08a05c] text-[11px] font-bold rounded px-2 py-0.5 mt-2 inline-block">Up to 8% Back</div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── MEMBER TESTIMONIALS ─── */}
        <div className="mb-16">
          <h2 className="text-[28px] font-black tracking-tight text-gray-900 mb-8 text-center">What Members Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Maria S.', text: 'I earned over $500 in Cash Back last year just from my regular shopping!', amount: '$523' },
              { name: 'David L.', text: 'The browser extension makes it so easy. I never miss Cash Back anymore.', amount: '$312' },
              { name: 'Sarah K.', text: 'Love the Double Cash Back events. Best rewards program out there.', amount: '$478' },
            ].map((review, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-[12px] p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-bold text-[14px] text-gray-900">{review.name}</span>
                  <span className="bg-[#eef8f3] text-[#08a05c] font-black text-[16px] px-3 py-1 rounded-full">{review.amount}</span>
                </div>
                <p className="text-[14px] text-gray-600 italic">&ldquo;{review.text}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>

        {/* ─── CASH BACK STATS ─── */}
        <div className="mb-16 bg-[#1b1b1b] text-white rounded-[16px] p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-48 h-48 bg-[#bf0000] rounded-full blur-[80px] opacity-30 -ml-10 -mt-10"></div>
          <h2 className="text-[32px] md:text-[40px] font-black tracking-tight mb-8 relative z-10">CashFlow by the Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
            {[
              { num: '$1B+', label: 'Cash Back Paid' },
              { num: '15M+', label: 'Members' },
              { num: '3,500+', label: 'Stores' },
              { num: '4.8★', label: 'App Rating' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-[36px] md:text-[44px] font-black text-[#bf0000] leading-none mb-2">{stat.num}</div>
                <div className="text-[12px] font-bold uppercase tracking-widest text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── APP DOWNLOAD ─── */}
        <div className="mb-16 bg-[#fdf0f0] rounded-[16px] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between border border-[#fce4e4]">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h2 className="text-[28px] md:text-[36px] font-black tracking-tight text-gray-900 mb-3">Never Miss Cash Back</h2>
            <p className="text-[16px] text-gray-600 font-medium max-w-md">Download the CashFlow app or browser extension and earn Cash Back automatically.</p>
          </div>
          <div className="flex gap-4">
            <button className="bg-black text-white px-6 py-3 rounded-full font-bold text-[14px] hover:bg-gray-800 transition-colors shadow-md flex items-center">
              <Smartphone className="w-5 h-5 mr-2" /> App Store
            </button>
            <button className="bg-[#bf0000] text-white px-6 py-3 rounded-full font-bold text-[14px] hover:bg-[#a00000] transition-colors shadow-md flex items-center">
              <Smartphone className="w-5 h-5 mr-2" /> Google Play
            </button>
          </div>
        </div>

        {/* ─── REFER A FRIEND ─── */}
        <div className="mb-16 bg-white border border-gray-200 rounded-[16px] p-8 md:p-12 text-center">
          <Gift className="w-10 h-10 text-[#bf0000] mx-auto mb-4" />
          <h2 className="text-[28px] md:text-[36px] font-black tracking-tight text-gray-900 mb-3">Refer a Friend, Get $25</h2>
          <p className="text-[16px] text-gray-600 font-medium max-w-lg mx-auto mb-8">Share CashFlow with friends. When they sign up and make a qualifying purchase, you both earn $25 Cash Back.</p>
          <button className="bg-[#bf0000] text-white px-10 py-4 rounded-full font-bold text-[16px] hover:bg-[#a00000] transition-colors shadow-lg">Invite Friends</button>
        </div>

      </main>

      {/* ─── FOOTER ─── */}
      <footer className="bg-[#1a1c1e] text-white pt-16 pb-12 mt-auto">
        <div className="w-full max-w-[1240px] mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-12 mb-16 text-[14px]">
            <div className="flex flex-col col-span-2 lg:col-span-1 border-r-0 lg:border-r border-gray-800 pr-0 lg:pr-6">
              <div className="font-black text-[32px] tracking-tighter text-white mb-6">
                CashFlow
              </div>
              <p className="text-gray-400 font-medium mb-6 text-[13px] leading-relaxed">
                Shop smarter and save money with Cash Back, coupons, and deals at CashFlow.
              </p>
              <div className="flex space-x-3 mb-6">
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#bf0000] hover:text-white transition-colors cursor-pointer text-white">
                  <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#bf0000] hover:text-white transition-colors cursor-pointer text-white">
                  <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-y-4">
              <h4 className="text-white font-bold text-[15px] mb-2 font-black">About CashFlow</h4>
              <a href="#" className="text-gray-400 hover:text-white transition-colors w-fit">About Us</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors w-fit">Our Team</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors w-fit">Careers</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors w-fit">Press Room</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors w-fit">Blog</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors w-fit">Diversity & Inclusion</a>
            </div>

            <div className="flex flex-col gap-y-4">
              <h4 className="text-white font-bold text-[15px] mb-2 font-black">Help</h4>
              <a href="#" className="text-gray-400 hover:text-white transition-colors w-fit">Help Center</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors w-fit">Track My Cash Back</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors w-fit">Missing Cash Back</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors w-fit">Store Help</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors w-fit">Return Policy</a>
            </div>

            <div className="flex flex-col gap-y-4">
              <h4 className="text-white font-bold text-[15px] mb-2 font-black">Ways to Earn</h4>
              <a href="#" className="text-gray-400 hover:text-white transition-colors w-fit">In-Store Cash Back</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors w-fit">CashFlow App</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors w-fit">Browser Extension</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors w-fit">CashFlow Credit Card</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors w-fit">Refer a Friend</a>
            </div>

            <div className="flex flex-col gap-y-4">
              <h4 className="text-white font-bold text-[15px] mb-2 font-black">Partner with Us</h4>
              <a href="#" className="text-gray-400 hover:text-white transition-colors w-fit">Advertisers</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors w-fit">Affiliates</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors w-fit">Influencers</a>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between text-[12px] font-medium text-gray-500 gap-y-4">
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
              <span>© 2026 CashFlow Rewards. All Rights Reserved.</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms & Conditions</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Accessibility</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Do Not Sell My Personal Information</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

