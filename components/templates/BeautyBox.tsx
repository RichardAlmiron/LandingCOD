'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { StoreData } from '@/lib/types';
import { Search, ShoppingBag, Heart, User, MapPin, Store, Star, ChevronRight, ChevronDown, Calendar, MessageCircle, ArrowRight, Menu, Truck, ShieldCheck, Zap, Sparkles, X } from 'lucide-react';
import { usePagination, ProductPagination } from './shared/Pagination';

export default function BeautyBoxTemplate({ data }: { data: StoreData }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [cartCount, setCartCount] = useState(0);
  const [wishlist, setWishlist] = useState<string[]>([]);
  
  const topCategories = ['Makeup', 'Skincare', 'Hair', 'Fragrance', 'Tools & Brushes', 'Bath & Body', 'Mini Size', 'Gifts', 'Beauty Under $20'];
  const trendingProducts = data.products.slice(0, 4);
  const newArrivals = data.products.slice(4, 10);
  
  const itemsPerPage = 15; // 3 rows x 5 columns
  
  const categories = ['All', ...Array.from(new Set(data.products.map(p => p.category).filter(Boolean)))];
  
  const filteredProducts = activeCategory === 'All' 
    ? data.products 
    : data.products.filter(p => p.category === activeCategory);
  
  const {
    currentPage,
    totalPages,
    paginatedItems,
    handlePageChange,
    totalItems,
  } = usePagination(filteredProducts, itemsPerPage);

  const addToCart = () => {
    setCartCount(prev => prev + 1);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div className="min-h-full bg-white font-sans text-[#000000] overflow-x-hidden selection:bg-black selection:text-white">

      {/* ─── PROMO BANNER ─── */}
      <div className="bg-[#e32636] text-white text-[12px] md:text-[14px] py-2 md:py-2.5 px-4 text-center font-bold tracking-normal lg:tracking-wide">
        <span className="cursor-pointer hover:underline">Get up to 50% off select beauty! Shop Now </span>
      </div>

      {/* ─── HEADER ─── */}
      <header className="sticky top-0 bg-white z-50 border-b border-gray-200 shadow-[0_4px_12px_rgba(0,0,0,0.03)]">
        {/* Main Header Bar */}
        <div className="w-full max-w-[1400px] mx-auto px-4 lg:px-8 py-4 flex items-center justify-between gap-4 lg:gap-8 overflow-hidden h-[72px]">

          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            {/* BeautyBox Logo representation */}
            <a href="#" className="font-serif text-[28px] md:text-[34px] tracking-[0.15em] uppercase cursor-pointer hover:opacity-80 transition-opacity whitespace-nowrap">
              {data.logoText !== 'BeautyBox' ? data.logoText : 'BeautyBox'}
            </a>
          </div>

          {/* Search Bar - Expandable on focus */}
          <div className="hidden md:flex flex-1 max-w-[500px] lg:max-w-[700px] relative group">
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-[#f6f6f8] border border-transparent rounded-full py-[10px] pl-[40px] pr-4 text-[14px] outline-none hover:bg-[#eaeaec] focus:bg-white focus:border-black focus:ring-1 focus:ring-black transition-all placeholder:text-[#666] font-medium"
            />
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#333] group-focus-within:text-black transition-colors" />
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-2 md:space-x-5 shrink-0">
            <div className="hidden lg:flex items-center space-x-2 cursor-pointer hover:underline p-1">
              <Store className="w-6 h-6" strokeWidth={1.5} />
              <div className="flex flex-col leading-tight">
                <span className="text-[14px] font-bold">Stores & Services</span>
                <span className="text-[12px] text-gray-600">Choose Your Store</span>
              </div>
            </div>

            <div className="hidden lg:flex items-center space-x-2 cursor-pointer hover:underline p-1">
              <div className="bg-[#f0f0f0] rounded-full p-1.5"><User className="w-[18px] h-[18px]" strokeWidth={2} /></div>
              <div className="flex flex-col leading-tight">
                <span className="text-[14px] font-bold">Sign In</span>
                <span className="text-[12px] text-gray-600">for FREE Shipping</span>
              </div>
            </div>

            <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors hidden sm:block">
              <Heart className="w-6 h-6" strokeWidth={1.5} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#e32636] text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button 
              onClick={addToCart}
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center"
            >
              <ShoppingBag className="w-6 h-6" strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#e32636] text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex w-full max-w-[1400px] mx-auto px-8 items-center justify-between text-[14px] font-bold bg-white text-black h-[50px]">
          <div className="flex space-x-6 lg:space-x-8 h-full">
            <a href="#" className="flex items-center hover:underline h-full border-b-[3px] border-transparent hover:border-black transition-all">New</a>
            <a href="#" className="flex items-center hover:underline h-full border-b-[3px] border-transparent hover:border-black transition-all">Brands</a>
            {topCategories.map((cat, i) => (
              <a key={i} href="#" className="flex items-center hover:underline h-full border-b-[3px] border-transparent hover:border-black transition-all whitespace-nowrap">
                {cat}
              </a>
            ))}
            <a href="#" className="flex items-center hover:underline h-full text-[#e32636] border-b-[3px] border-transparent hover:border-[#e32636] transition-all">Sale & Offers</a>
          </div>
        </nav>
      </header>

      <main className="w-full">

        {/* ─── HERO BANNER STRIP ─── */}
        <div className="w-full bg-[#f6f6f8] pt-8 pb-12 px-4 md:px-8">
          <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-[#fed6e3]">
              <h1 className="text-[32px] md:text-[42px] font-bold mb-4 leading-[1.1] tracking-tight text-[#c81045]">{data.name}</h1>
              <p className="text-[16px] md:text-[18px] mb-8 font-medium text-[#9a0932] max-w-md">{data.description || "Discover the latest in beauty, skincare, and fragrance."}</p>
              <button 
              onClick={addToCart}
              className="bg-[#c81045] text-white px-8 py-3.5 rounded-full font-bold hover:bg-black transition-colors w-fit text-[14px] flex items-center gap-2"
            >
              Shop the Collection
              <ArrowRight className="w-4 h-4" />
            </button>
            </div>
            <div className="md:w-1/2 relative min-h-[300px] md:min-h-[450px]">
              <Image
                src={data.bannerImage}
                alt="Banner"
                fill
                className="object-cover object-center"
                referrerPolicy="no-referrer"
                priority
              />
            </div>
          </div>
        </div>

        {/* ─── JUST DROPPED / NEW ARRIVALS ─── */}
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-12 md:py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-[20px] md:text-[24px] font-bold">Just Dropped</h2>
            <a href="#" className="font-bold text-[14px] hover:underline">Show more</a>
          </div>

          <div className="flex overflow-x-auto hide-scrollbar gap-4 md:gap-6 pb-6 -mx-4 px-4 md:mx-0 md:px-0">
            {newArrivals.map((product, idx) => (
              <div key={product.id || idx} className="group shrink-0 w-[160px] md:w-[220px] flex flex-col cursor-pointer bg-white rounded-lg hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all duration-300 relative border border-transparent hover:border-gray-200">
                <div className="relative aspect-square mb-3 bg-[#f6f6f8] rounded-t-lg overflow-hidden flex items-center justify-center p-4">
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-500 mix-blend-darken"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 left-2 bg-white border border-black text-black text-[10px] font-bold px-2 py-1 uppercase rounded-sm z-10">
                    New
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); addToCart(); }}
                    className="absolute bottom-3 right-3 bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 z-10 hover:bg-black hover:text-white"
                  >
                    <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
                  </button>
                </div>
                <div className="px-3 pb-4 flex flex-col flex-grow">
                  <h3 className="font-bold text-[14px] mb-1">{product.category || 'Brand Name'}</h3>
                  <p className="text-[13px] text-gray-700 line-clamp-2 mb-2 leading-relaxed">{product.title}</p>
                  <div className="mt-auto">
                    <div className="font-bold text-[15px] mb-2">${product.price}</div>
                    <div className="flex text-[#FFCE00]">
                      {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-[12px] h-[12px] fill-current" />)}
                      <span className="text-gray-500 text-[12px] ml-1">(12{idx})</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── BEAUTY INSIDER PROMO ─── */}
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 pb-16">
          <div className="border border-gray-300 rounded-[12px] shadow-[0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col lg:flex-row hover:shadow-md transition-shadow p-6 lg:p-10 justify-between items-center bg-gradient-to-r from-[#ffeef2] to-white relative">
            <div className="absolute top-0 right-0 p-8 opacity-10"><img src="https://upload.wikimedia.org/wikipedia/commons/e/ec/BeautyBox_logo.svg" className="w-[300px] object-cover" /></div>
            <div className="flex items-center space-x-6 md:space-x-8 mb-6 lg:mb-0 relative z-10">
              <div className="hidden sm:flex w-[100px] h-[100px] rounded-full bg-white border border-gray-200 items-center justify-center shrink-0 shadow-sm relative">
                <div className="w-[80px] h-[80px] rounded-full border-2 border-black border-dashed flex items-center justify-center text-black font-serif text-3xl font-bold bg-[#fbfbfb]">B</div>
                <div className="absolute top-0 right-0 bg-[#e32636] w-6 h-6 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h3 className="text-[28px] md:text-[34px] font-serif mb-2 tracking-tight">Beauty Insider Rewards</h3>
                <p className="text-[15px] text-gray-700 max-w-xl font-medium">Earn points, get free standard shipping, and redeem rewards. Check out your exclusive perks today.</p>
              </div>
            </div>
            <div className="flex flex-col space-y-3 w-full lg:w-[280px] shrink-0 relative z-10">
              <button className="bg-black text-white px-8 py-3.5 rounded-full font-bold hover:bg-gray-800 transition-colors w-full text-center text-[15px]">
                Sign In
              </button>
              <button className="bg-white border text-black border-black px-8 py-3.5 rounded-full font-bold hover:bg-gray-50 transition-colors w-full text-center text-[15px]">
                Join Now for Free
              </button>
            </div>
          </div>
        </div>

        {/* ─── CHOOSE YOUR CATEGORY ─── */}
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 pb-16 md:pb-20">
          <h2 className="text-[20px] md:text-[24px] font-bold mb-8 text-center md:text-left">Shop by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-8">
            {[
              { name: 'Makeup', img: 'https://picsum.photos/300/300?random=81' },
              { name: 'Skincare', img: 'https://picsum.photos/300/300?random=82' },
              { name: 'Hair', img: 'https://picsum.photos/300/300?random=83' },
              { name: 'Fragrance', img: 'https://picsum.photos/300/300?random=84' },
              { name: 'Bath & Body', img: 'https://picsum.photos/300/300?random=85' },
              { name: 'Mini Size', img: 'https://picsum.photos/300/300?random=86' },
            ].map((cat, i) => (
              <div key={i} className="group cursor-pointer flex flex-col items-center">
                <div className="w-[120px] h-[120px] md:w-[150px] md:h-[150px] rounded-full overflow-hidden mb-4 shadow-sm group-hover:shadow-[0_8px_20px_rgba(0,0,0,0.1)] transition-all duration-300 relative border border-gray-100">
                  <Image src={cat.img} alt={cat.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <span className="font-bold text-[14px] md:text-[15px] group-hover:underline text-center">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ─── TRENDING NOW (Mosaics) ─── */}
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 pb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-[20px] md:text-[24px] font-bold">Trending Now</h2>
            <a href="#" className="font-bold text-[14px] hover:underline flex items-center">Shop All <ChevronRight className="w-[18px] h-[18px]" /></a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 border-t border-gray-200 pt-8">

            <div className="group cursor-pointer flex flex-col bg-[#f0f3f6] rounded-[8px] overflow-hidden">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-200">
                <Image src="https://picsum.photos/800/600?random=87" alt="Trending 1" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-6 bg-white flex flex-col flex-1 border-x border-b border-gray-200 rounded-b-[8px]">
                <h3 className="font-bold text-[20px] mb-2 leading-tight group-hover:underline">Viral Makeup Finds</h3>
                <p className="text-[14px] text-gray-700 mb-6 font-medium">The products everyone is talking about on social media. Get them before they sell out.</p>
                <span className="font-bold text-[14px] flex items-center mt-auto">Shop Now <ChevronRight className="w-4 h-4 ml-1" /></span>
              </div>
            </div>

            <div className="group cursor-pointer flex flex-col bg-[#f0f3f6] rounded-[8px] overflow-hidden">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-200">
                <Image src="https://picsum.photos/800/600?random=88" alt="Trending 2" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-6 bg-white flex flex-col flex-1 border-x border-b border-gray-200 rounded-b-[8px]">
                <h3 className="font-bold text-[20px] mb-2 leading-tight group-hover:underline">Clean Skincare Routine</h3>
                <p className="text-[14px] text-gray-700 mb-6 font-medium">Discover top-rated clean skincare essentials for a glowing, healthy complexion.</p>
                <span className="font-bold text-[14px] flex items-center mt-auto">Shop Now <ChevronRight className="w-4 h-4 ml-1" /></span>
              </div>
            </div>

            <div className="group cursor-pointer flex flex-col bg-[#f0f3f6] rounded-[8px] overflow-hidden md:hidden lg:flex">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-200">
                <Image src="https://picsum.photos/800/600?random=89" alt="Trending 3" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-6 bg-white flex flex-col flex-1 border-x border-b border-gray-200 rounded-b-[8px]">
                <h3 className="font-bold text-[20px] mb-2 leading-tight group-hover:underline">Signature Scents</h3>
                <p className="text-[14px] text-gray-700 mb-6 font-medium">Find your new signature fragrance for the season from top luxury brands.</p>
                <span className="font-bold text-[14px] flex items-center mt-auto">Shop Now <ChevronRight className="w-4 h-4 ml-1" /></span>
              </div>
            </div>

          </div>
        </div>

        {/* ─── BEST SELLING PRODUCTS ─── */}
        {trendingProducts.length > 0 && (
          <div className="bg-[#fcfcfc] border-y border-gray-200 py-16 mb-16">
            <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-[20px] md:text-[24px] font-bold">Recommended For You</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {trendingProducts.map((product, idx) => (
                  <div key={product.id} data-product-id={product.id} className="group cursor-pointer bg-white border border-gray-200 p-4 rounded-lg flex flex-col hover:border-black transition-colors relative shadow-sm hover:shadow-md">
                    <div className="absolute top-4 left-4 z-10">
                      <Heart className="w-5 h-5 text-gray-400 hover:text-black hover:fill-black transition-colors" />
                    </div>
                    <div className="relative aspect-square mb-4 bg-white p-2">
                      <Image
                        src={product.imageUrl}
                        alt={product.title}
                        fill
                        className="object-contain p-2 group-hover:scale-105 transition-transform duration-300 mix-blend-multiply"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex flex-col flex-grow">
                      <h3 className="font-bold text-[14px] mb-1 leading-tight">{product.title.split(' ').slice(0, 2).join(' ')}</h3>
                      <p className="text-[13px] text-gray-700 line-clamp-2 mb-3 leading-relaxed">{product.title}</p>
                    </div>
                    <div>
                      <div className="font-bold text-[15px] mb-3">${product.price}</div>
                      <button className="w-full border border-black rounded-full py-2.5 text-[14px] font-bold hover:bg-black hover:text-white transition-colors">
                        Add to Basket
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      {/* ─── FULL PRODUCT CATALOG WITH PAGINATION ─── */}
      <section className="max-w-[1400px] mx-auto px-4 lg:px-8 py-12 md:py-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-[24px] md:text-[28px] font-bold mb-2">Shop All Products</h2>
            <p className="text-gray-600">{totalItems} items available</p>
          </div>
          
          {/* Category Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {categories.slice(0, 6).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  handlePageChange(1);
                }}
                className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${
                  activeCategory === cat
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid (3x5 = 15 products) */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 md:gap-6">
          {paginatedItems.map((product, idx) => (
            <div 
              key={product.id || idx} 
              data-product-id={product.id}
              className="group cursor-pointer bg-white rounded-lg hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-gray-200"
            >
              <div className="relative aspect-square mb-3 bg-[#f6f6f8] rounded-t-lg overflow-hidden flex items-center justify-center p-4">
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  fill
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-500 mix-blend-darken"
                />
                {idx % 4 === 0 && (
                  <span className="absolute top-2 left-2 bg-[#e32636] text-white text-[10px] font-bold px-2 py-1 rounded-sm">
                    HOT
                  </span>
                )}
                <button 
                  onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                >
                  <Heart className={`w-4 h-4 ${wishlist.includes(product.id) ? 'fill-[#e32636] text-[#e32636]' : 'text-gray-400'}`} />
                </button>
              </div>
              <div className="px-3 pb-4 flex flex-col flex-grow">
                <h3 className="font-bold text-[13px] mb-1">{product.category || 'Brand Name'}</h3>
                <p className="text-[12px] text-gray-700 line-clamp-2 mb-2 leading-relaxed">{product.title}</p>
                <div className="mt-auto">
                  <div className="font-bold text-[15px] mb-2">${product.price}</div>
                  <div className="flex items-center justify-between">
                    <div className="flex text-[#FFCE00]">
                      {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-[12px] h-[12px] fill-current" />)}
                      <span className="text-gray-500 text-[11px] ml-1">({product.reviews || 24})</span>
                    </div>
                  </div>
                  <button 
                    onClick={addToCart}
                    className="w-full mt-2 bg-black text-white py-2 rounded-full text-[12px] font-bold hover:bg-gray-800 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <ProductPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
          />
        )}
      </section>

      {/* ─── SERVICES ─── */}
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 pb-16">
          <div className="bg-white border-4 border-black rounded-[8px] p-8 md:p-12 relative overflow-hidden">
            <div className="absolute -right-20 -bottom-20 opacity-5"><Zap className="w-[300px] h-[300px]" /></div>
            <h2 className="text-[24px] md:text-[32px] font-bold mb-10 text-center relative z-10">In-Store & Online Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative z-10">

              <div className="flex flex-col items-center text-center cursor-pointer group">
                <div className="w-[80px] h-[80px] bg-black text-white rounded-full flex items-center justify-center mb-5 group-hover:-translate-y-2 transition-transform duration-300">
                  <Calendar className="w-10 h-10" strokeWidth={1.5} />
                </div>
                <h3 className="font-bold text-[18px] mb-2">Book a Service</h3>
                <p className="text-[14px] text-gray-600 mb-4 px-4 font-medium">Makeup applications, skincare treatments, and more.</p>
                <a href="#" className="text-[14px] font-bold border-b-2 border-black pb-0.5 hover:text-gray-600 hover:border-gray-600 transition-colors">Book Now</a>
              </div>

              <div className="flex flex-col items-center text-center cursor-pointer group border-t md:border-t-0 md:border-l border-gray-200 pt-8 md:pt-0">
                <div className="w-[80px] h-[80px] bg-black text-white rounded-full flex items-center justify-center mb-5 group-hover:-translate-y-2 transition-transform duration-300">
                  <Sparkles className="w-10 h-10" strokeWidth={1.5} />
                </div>
                <h3 className="font-bold text-[18px] mb-2">Beauty Classes</h3>
                <p className="text-[14px] text-gray-600 mb-4 px-4 font-medium">Learn new techniques from our Beauty Advisors.</p>
                <a href="#" className="text-[14px] font-bold border-b-2 border-black pb-0.5 hover:text-gray-600 hover:border-gray-600 transition-colors">Find a Class</a>
              </div>

              <div className="flex flex-col items-center text-center cursor-pointer group border-t md:border-t-0 md:border-l border-gray-200 pt-8 md:pt-0">
                <div className="w-[80px] h-[80px] bg-black text-white rounded-full flex items-center justify-center mb-5 group-hover:-translate-y-2 transition-transform duration-300">
                  <MessageCircle className="w-10 h-10" strokeWidth={1.5} />
                </div>
                <h3 className="font-bold text-[18px] mb-2">Live Beauty Help</h3>
                <p className="text-[14px] text-gray-600 mb-4 px-4 font-medium">Chat with a Beauty Advisor for personalized advice.</p>
                <a href="#" className="text-[14px] font-bold border-b-2 border-black pb-0.5 hover:text-gray-600 hover:border-gray-600 transition-colors">Chat Now</a>
              </div>

            </div>
          </div>
        </div>

      </main>

      {/* ─── FOOTER ─── */}
      <footer className="bg-black text-white pt-16 pb-8 border-t-[8px] border-[#e32636]">
        <div className="w-full max-w-[1400px] mx-auto px-4 lg:px-8">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
            <div>
              <h4 className="font-bold text-[16px] mb-5 uppercase tracking-wide">About BeautyBox</h4>
              <ul className="flex flex-col space-y-3.5 text-[14px] text-gray-300 font-medium">
                <li><a href="#" className="hover:text-white hover:underline transition-colors w-fit">About Us</a></li>
                <li><a href="#" className="hover:text-white hover:underline transition-colors w-fit">Careers</a></li>
                <li><a href="#" className="hover:text-white hover:underline transition-colors w-fit">Supply Chain Transparency</a></li>
                <li><a href="#" className="hover:text-white hover:underline transition-colors w-fit">Affiliates</a></li>
                <li><a href="#" className="hover:text-white hover:underline transition-colors w-fit">BeautyBox Events</a></li>
                <li><a href="#" className="hover:text-white hover:underline transition-colors w-fit">Gift Cards</a></li>
                <li><a href="#" className="hover:text-white hover:underline transition-colors w-fit">Global Sites</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-[16px] mb-5 uppercase tracking-wide">My BeautyBox</h4>
              <ul className="flex flex-col space-y-3.5 text-[14px] text-gray-300 font-medium">
                <li><a href="#" className="hover:text-white hover:underline transition-colors w-fit">Beauty Insider</a></li>
                <li><a href="#" className="hover:text-white hover:underline transition-colors w-fit">BeautyBox Credit Card</a></li>
                <li><a href="#" className="hover:text-white hover:underline transition-colors w-fit">Community Profile</a></li>
                <li><a href="#" className="hover:text-white hover:underline transition-colors w-fit">Order Status</a></li>
                <li><a href="#" className="hover:text-white hover:underline transition-colors w-fit">Purchase History</a></li>
                <li><a href="#" className="hover:text-white hover:underline transition-colors w-fit">Account Settings</a></li>
                <li><a href="#" className="hover:text-white hover:underline transition-colors w-fit">Beauty Advisor Recommendations</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-[16px] mb-5 uppercase tracking-wide">Help</h4>
              <ul className="flex flex-col space-y-3.5 text-[14px] text-gray-300 font-medium">
                <li><a href="#" className="hover:text-white hover:underline transition-colors w-fit">Customer Service</a></li>
                <li><a href="#" className="hover:text-white hover:underline transition-colors w-fit">Returns & Exchanges</a></li>
                <li><a href="#" className="hover:text-white hover:underline transition-colors w-fit">Delivery & Pickup Options</a></li>
                <li><a href="#" className="hover:text-white hover:underline transition-colors w-fit">Shipping</a></li>
                <li><a href="#" className="hover:text-white hover:underline transition-colors w-fit">Billing</a></li>
                <li><a href="#" className="hover:text-white hover:underline transition-colors w-fit">International Shipments</a></li>
                <li><a href="#" className="hover:text-white hover:underline transition-colors w-fit">Beauty Services FAQ</a></li>
              </ul>
            </div>

            <div className="flex flex-col bg-[#111] p-6 rounded-lg border border-gray-800">
              <h4 className="font-bold text-[16px] mb-4">Sign up for BeautyBox Emails</h4>
              <p className="text-[13px] text-gray-400 mb-4 line-clamp-2">Be the first to know about new products, exclusive offers, and expert tips.</p>
              <div className="flex flex-col space-y-3 mb-8">
                <input type="email" placeholder="Enter your email address" className="bg-white text-black px-4 py-3 rounded outline-none text-[14px] placeholder-gray-500 font-medium" />
                <button className="bg-transparent border border-white text-white px-4 py-3 rounded font-bold hover:bg-white hover:text-black transition-colors text-[14px]">Sign Up</button>
              </div>

              <h4 className="font-bold text-[16px] mb-4">We Love Our App</h4>
              <div className="flex space-x-3">
                <button className="flex-1 bg-white text-black py-2.5 rounded font-bold text-[12px] hover:bg-gray-200 transition-colors">App Store</button>
                <button className="flex-1 bg-white text-black py-2.5 rounded font-bold text-[12px] hover:bg-gray-200 transition-colors">Google Play</button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-[12px] text-gray-400 font-medium gap-4">
            <div className="mb-2 md:mb-0">
              <p>© 2026 {data.name} USA, Inc. All rights reserved.</p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              <a href="#" className="hover:text-white hover:underline transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white hover:underline transition-colors">Terms of Use</a>
              <a href="#" className="hover:text-white hover:underline transition-colors">Accessibility</a>
              <a href="#" className="hover:text-white hover:underline transition-colors">Sitemap</a>
              <a href="#" className="hover:text-white hover:underline transition-colors flex items-center">
                <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Your Privacy Choices
              </a>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
