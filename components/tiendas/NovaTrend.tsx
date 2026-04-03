'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { StoreData, Product } from '@/lib/types';
import { useCart } from '@/contexts/CartContext';
import { Search, ShoppingBag, Heart, User, Menu, Flame, ArrowRight, Instagram, Facebook, Twitter, Youtube, Smartphone, Star, Zap, X } from 'lucide-react';
import { usePagination, ProductPagination } from '@/components/componentes-compartidos/templates/Pagination';

export default function NovaTrendTemplate({ data }: { data: StoreData }) {
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
    <div className="min-h-full bg-white font-sans text-[#000] selection:bg-pink-500 selection:text-white pb-0 overflow-x-hidden">

      {/* ─── URGENCY BANNER ─── */}
      <div className="bg-black text-white text-[13px] md:text-[15px] py-2.5 px-4 flex justify-center items-center font-black uppercase tracking-tighter italic shadow-md relative z-50">
        <Flame className="w-5 h-5 mr-2 fill-red-600 text-red-600 animate-pulse" />
        <span className="text-center">80% OFF EVERYTHING! USE CODE: <span className="text-red-500">FN80</span></span>
        <Flame className="w-5 h-5 ml-2 fill-red-600 text-red-600 animate-pulse" />
      </div>

      <div className="bg-red-600 text-white text-[11px] md:text-[12px] py-1.5 px-4 flex justify-center items-center font-bold uppercase tracking-widest">
        Free Shipping On Orders Over $75
      </div>

      {/* ─── HEADER ─── */}
      <header className="bg-white sticky top-0 z-40 border-b-2 border-gray-100 shadow-sm transition-all h-[70px] md:h-[80px]">
        <div className="w-full mx-auto px-4 md:px-6 h-full flex items-center justify-between">

          <div className="flex items-center">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hover:text-pink-500 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>

            <div className="flex items-center cursor-pointer mr-6 lg:mr-10">
              <span className="font-black text-[28px] md:text-[36px] tracking-tighter uppercase leading-none text-black mt-1">
                FASHION<span className="text-pink-500">NOVA</span>
              </span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex space-x-6 xl:space-x-8 font-black text-[14px] uppercase tracking-tighter text-black mt-2">
              <a href="#" className="hover:text-pink-500 transition-colors">Women</a>
              <a href="#" className="hover:text-pink-500 transition-colors">Curve</a>
              <a href="#" className="hover:text-pink-500 transition-colors">Men</a>
              <a href="#" className="hover:text-pink-500 transition-colors">Kids</a>
              <a href="#" className="hover:text-pink-500 transition-colors">Beauty</a>
              <a href="#" className="text-red-600 flex items-center"><Zap className="w-4 h-4 mr-1 fill-red-600" /> Sale</a>
            </nav>
          </div>

          <div className="flex items-center space-x-5 lg:space-x-6 text-black">
            <div className="hidden xl:flex items-center bg-gray-100 rounded-full px-4 py-2 w-56 focus-within:ring-2 focus-within:ring-pink-500 transition-shadow">
              <input type="text" placeholder="Search..." className="bg-transparent outline-none text-[14px] w-full font-bold placeholder-gray-500" />
              <Search className="w-5 h-5 text-gray-500" />
            </div>
            <Search className="w-6 h-6 xl:hidden cursor-pointer hover:text-pink-500 transition-colors" />
            <User className="hidden md:block w-7 h-7 cursor-pointer hover:text-pink-500 transition-colors" />
            <div 
              onClick={() => toggleFavorite('header')}
              className="relative cursor-pointer hover:text-pink-500 transition-colors hidden md:block"
            >
              <Heart className={`w-7 h-7 ${favorites.length > 0 ? 'fill-red-500 text-red-500' : ''}`} />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] font-black px-1.5 rounded-full min-w-[18px] text-center border-2 border-white shadow-sm">{favorites.length}</span>
              )}
            </div>
            <div 
              onClick={() => setIsCartOpen(true)}
              className="relative cursor-pointer hover:text-pink-500 transition-colors"
            >
              <ShoppingBag className="w-7 h-7" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-pink-500 text-white text-[11px] font-black px-1.5 rounded-full min-w-[20px] text-center border-2 border-white shadow-sm">{itemCount}</span>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="w-full">

        {/* ─── HERO BANNER ─── */}
        <section className="relative w-full h-[550px] md:h-[700px] flex justify-center items-center overflow-hidden bg-black mb-8 md:mb-12 rounded-b-[30px] shadow-lg">
          <Image
            src={data.bannerImage}
            alt="Hero Banner"
            fill
            className="object-cover object-top opacity-90 scale-105"
            priority
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

          <div className="relative z-10 px-6 max-w-4xl text-center text-white mt-auto pb-16 md:pb-24">
            <div className="inline-flex items-center bg-red-600 text-white text-[14px] md:text-[18px] font-black px-6 py-2 uppercase tracking-widest mb-6 rounded-full italic transform -rotate-2 shadow-xl border-2 border-white">
              <Flame className="w-5 h-5 mr-2 fill-yellow-400 text-yellow-400" /> Trending Now
            </div>
            <h1 className="text-[50px] md:text-[90px] font-black uppercase tracking-tighter leading-[0.85] mb-6 drop-shadow-2xl italic">
              {data.name}
            </h1>
            <p className="text-[20px] md:text-[28px] font-bold mb-10 mx-auto max-w-2xl drop-shadow-lg leading-tight uppercase italic">{data.description || 'The styles breaking the internet.'}</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-white text-black px-12 py-4 font-black uppercase italic tracking-wider text-[16px] hover:bg-pink-500 hover:text-white transition-all transform hover:scale-105 shadow-2xl rounded-full border-2 border-transparent hover:border-white">
                Shop Women
              </button>
              <button className="bg-transparent border-2 border-white text-white px-12 py-4 font-black uppercase italic tracking-wider text-[16px] hover:bg-white hover:text-black transition-all transform hover:scale-105 shadow-2xl rounded-full">
                Shop Curve
              </button>
            </div>
          </div>
        </section>

        {/* ─── NEW ARRIVALS GRID ─── */}
        <section className="px-4 md:px-6 max-w-[1800px] mx-auto mb-16">
          <div className="flex items-end justify-between mb-8 border-b-2 border-gray-100 pb-4">
            <h2 className="text-[32px] md:text-[44px] font-black uppercase italic tracking-tighter text-black leading-none flex items-center">
              <span className="w-2 h-8 bg-pink-500 mr-4 rounded-full"></span> New Arrivals ({totalItems})
            </h2>
            <a href="#" className="hidden md:flex text-[14px] font-black uppercase border-b-2 border-black pb-0.5 tracking-widest text-black hover:text-pink-500 hover:border-pink-500 transition-all items-center">
              View All
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-5">
            {paginatedItems.map((product: any, idx: number) => (
              <div key={product.id || idx} data-product-id={product.id} className="group cursor-pointer flex flex-col bg-white">
                <div className="relative aspect-[3/4] mb-3 bg-[#f5f5f5] overflow-hidden rounded-[16px] md:rounded-[24px]">
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  {idx % 3 === 0 && (
                    <div className="absolute top-3 right-3 bg-red-600 text-white text-[11px] md:text-[13px] font-black italic px-3 py-1.5 uppercase tracking-tighter shadow-lg rounded-full transform rotate-3">
                      Going Fast!
                    </div>
                  )}
                  {idx % 4 === 1 && (
                    <div className="absolute top-3 right-3 bg-pink-500 text-white text-[11px] md:text-[13px] font-black italic px-3 py-1.5 uppercase tracking-tighter shadow-lg rounded-full">
                      Viral
                    </div>
                  )}
                  {/* Quick Add Overlay */}
                  <button 
                    onClick={(e) => handleAddToCart(product, e)}
                    className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md py-3 text-center text-[13px] font-black uppercase italic tracking-widest translate-y-[150%] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black hover:text-white rounded-xl shadow-xl border border-gray-100"
                  >
                    Quick Add
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }}
                    className="absolute top-3 left-3 bg-white/90 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:text-pink-500"
                  >
                    <Heart className={`w-5 h-5 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : ''}`} strokeWidth={2.5} />
                  </button>
                </div>
                <div className="flex flex-col flex-1 px-1">
                  <h3 className="text-[14px] md:text-[15px] font-bold uppercase text-black line-clamp-1 leading-tight mb-1 group-hover:text-pink-500 transition-colors">
                    {product.title}
                  </h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-[18px] md:text-[20px] font-black text-red-600 italic">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-[13px] font-bold text-gray-400 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
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

          <div className="mt-8 flex justify-center md:hidden">
            <button 
              onClick={() => handlePageChange(currentPage + 1)}
              className="bg-black text-white px-10 py-4 font-black uppercase italic tracking-widest text-[14px] w-full rounded-full shadow-lg"
            >
              View All
            </button>
          </div>
        </section>

        {/* ─── SHOP BY CATEGORY ─── */}
        <section className="px-4 md:px-6 max-w-[1800px] mx-auto mb-20 md:mb-24">
          <h2 className="text-[32px] md:text-[44px] font-black uppercase italic tracking-tighter text-black leading-none mb-8 text-center flex items-center justify-center">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {[
              { name: 'Dresses', img: 'https://picsum.photos/400/600?random=350' },
              { name: 'Tops', img: 'https://picsum.photos/400/600?random=351' },
              { name: 'Jeans', img: 'https://picsum.photos/400/600?random=352' },
              { name: 'Sets', img: 'https://picsum.photos/400/600?random=353' },
              { name: 'Swim', img: 'https://picsum.photos/400/600?random=354' },
              { name: 'Shoes', img: 'https://picsum.photos/400/600?random=355' },
            ].map((cat, i) => (
              <div key={i} className="relative aspect-[3/4] group cursor-pointer overflow-hidden rounded-[20px] md:rounded-[30px] shadow-sm hover:shadow-xl transition-shadow">
                <Image src={cat.img} alt={cat.name} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>
                <div className="absolute bottom-6 left-0 right-0 text-center">
                  <h3 className="text-[26px] md:text-[32px] font-black uppercase italic tracking-tighter text-white mb-0 leading-none group-hover:text-pink-400 transition-colors drop-shadow-md">
                    {cat.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── TRENDING TAGS ─── */}
        <section className="bg-[#f8f8f8] py-16 md:py-24 mb-20 md:mb-24">
          <div className="max-w-[1200px] mx-auto px-6 text-center">
            <h2 className="text-[40px] md:text-[60px] font-black uppercase italic tracking-tighter mb-4 text-black leading-none">Trending Now</h2>
            <p className="text-[18px] md:text-[22px] font-bold uppercase text-gray-500 mb-10">What everyone is adding to cart</p>

            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              {[
                'Cargo Pants', 'Corset Tops', 'Maxi Dresses', 'Platform Heels',
                'Faux Leather', 'Cut Out Details', 'Rhinestone Accessories', 'Matching Sets'
              ].map((tag, i) => (
                <button key={i} className="bg-white border-2 border-black px-6 py-3.5 text-[14px] md:text-[16px] font-black uppercase italic hover:bg-black hover:text-white transition-all rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1">
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ─── INSTAGRAM SHOP ─── */}
        <section className="px-4 md:px-6 max-w-[1800px] mx-auto mb-20">
          <div className="flex flex-col items-center mb-10">
            <h2 className="text-[36px] md:text-[48px] font-black uppercase italic tracking-tighter text-black leading-none flex items-center justify-center mb-2">
              <Instagram className="w-10 h-10 md:w-12 md:h-12 mr-3 text-pink-500" /> Shop Our Insta
            </h2>
            <a href="#" className="text-[16px] font-black uppercase italic tracking-widest text-pink-500 hover:underline underline-offset-4">
              @NovaTrend
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
            {[1, 2, 3, 4, 5].map((num) => (
              <div key={num} className={`relative aspect-square group cursor-pointer overflow-hidden rounded-[20px] ${num === 5 ? 'hidden lg:block' : ''}`}>
                <Image src={`https://picsum.photos/500/500?random=${360 + num}`} alt="Instagram" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <ShoppingBag className="w-12 h-12 text-white drop-shadow-lg" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── APP PROMO ─── */}
        <section className="px-4 md:px-6 max-w-[1400px] mx-auto mb-20 md:mb-24">
          <div className="bg-gradient-to-br from-black to-gray-900 text-white rounded-[40px] p-8 md:p-16 flex flex-col md:flex-row items-center justify-between overflow-hidden relative shadow-2xl">
            {/* Decorative blobs */}
            <div className="absolute -right-20 -top-20 w-96 h-96 bg-red-600 rounded-full blur-[100px] opacity-30" />
            <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-pink-600 rounded-full blur-[100px] opacity-30" />

            <div className="relative z-10 text-center md:text-left md:w-1/2 mb-10 md:mb-0">
              <div className="inline-block bg-pink-500 text-white text-[12px] font-black px-4 py-1.5 uppercase tracking-widest mb-6 rounded-full">
                Download & Save
              </div>
              <h2 className="text-[40px] md:text-[60px] font-black uppercase tracking-tighter leading-none mb-6 italic">
                Get The App<br />Take 30% Off
              </h2>
              <p className="text-[18px] md:text-[20px] font-bold text-gray-300 mb-8 max-w-md mx-auto md:mx-0">
                Use code APP30 at checkout. Plus, get exclusive access to sales, drops & more!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button className="bg-white text-black px-8 py-4 font-black uppercase italic tracking-widest text-[14px] hover:bg-gray-200 transition-colors rounded-full text-center">
                  Download iOS
                </button>
                <button className="bg-transparent border-2 border-white text-white px-8 py-4 font-black uppercase italic tracking-widest text-[14px] hover:bg-white hover:text-black transition-colors rounded-full text-center">
                  Download Android
                </button>
              </div>
            </div>

            <div className="relative z-10 w-full md:w-2/5 aspect-[3/4] max-w-[300px] mx-auto hidden md:block">
              <div className="absolute inset-0 bg-white rounded-[40px] p-2 shadow-2xl transform rotate-6 border-[8px] border-gray-800">
                <Image src="https://picsum.photos/400/800?random=370" alt="App Screen" fill className="object-cover rounded-[28px]" />
              </div>
            </div>
          </div>
        </section>

        {/* ─── CUSTOMER REVIEWS ─── */}
        <section className="bg-white py-16 md:py-24 px-4 md:px-6 mb-16">
          <div className="max-w-[1400px] mx-auto text-center">
            <h2 className="text-[36px] md:text-[48px] font-black uppercase italic tracking-tighter mb-4 text-black leading-none">
              <Star className="w-8 h-8 inline fill-yellow-400 text-yellow-400 mr-2" /> Real Reviews
            </h2>
            <p className="text-[16px] font-bold text-gray-500 uppercase mb-12">What our customers are saying</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: "Jessica M.", review: "Obsessed with the quality for the price. I get compliments every time I wear my NovaTrend fits!", rating: 5 },
                { name: "Aaliyah K.", review: "Shipping was super fast and the sizing is perfect. Already placed my second order!", rating: 5 },
                { name: "Maria L.", review: "The curve collection is everything. Finally a brand that understands real bodies.", rating: 5 },
              ].map((r, i) => (
                <div key={i} className="bg-[#f8f8f8] rounded-[24px] p-8 text-left">
                  <div className="flex mb-4">
                    {Array.from({ length: r.rating }).map((_, s) => (
                      <Star key={s} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-[15px] font-bold text-black mb-4 leading-relaxed">&ldquo;{r.review}&rdquo;</p>
                  <span className="text-[13px] font-black uppercase text-gray-500">{r.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── STYLE GUIDE ─── */}
        <section className="px-4 md:px-6 max-w-[1800px] mx-auto mb-20">
          <h2 className="text-[32px] md:text-[44px] font-black uppercase italic tracking-tighter text-black leading-none mb-8 text-center">
            Style Guide
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Date Night Looks", img: "https://picsum.photos/600/800?random=371" },
              { title: "Festival Ready", img: "https://picsum.photos/600/800?random=372" },
              { title: "Office to Happy Hour", img: "https://picsum.photos/600/800?random=373" },
            ].map((guide, i) => (
              <div key={i} className="relative aspect-[3/4] overflow-hidden rounded-[24px] group cursor-pointer">
                <Image src={guide.img} alt={guide.title} fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-0 right-0 text-center text-white">
                  <h3 className="text-[24px] md:text-[28px] font-black uppercase italic tracking-tighter mb-2">{guide.title}</h3>
                  <span className="text-[12px] font-bold uppercase tracking-widest">Shop the Look</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── REWARDS PROGRAM ─── */}
        <section className="bg-gradient-to-r from-pink-500 to-red-500 py-16 md:py-24 px-4 md:px-6 mb-20 text-white text-center">
          <div className="max-w-[800px] mx-auto">
            <h2 className="text-[40px] md:text-[56px] font-black uppercase italic tracking-tighter leading-none mb-4">
              Nova Rewards
            </h2>
            <p className="text-[18px] md:text-[22px] font-bold mb-8 opacity-90">
              Earn points on every purchase. Unlock exclusive perks, early access & birthday surprises.
            </p>
            <button className="bg-white text-black px-12 py-4 font-black uppercase italic tracking-widest text-[16px] hover:bg-black hover:text-white transition-all rounded-full shadow-2xl border-2 border-transparent hover:border-white">
              Join Free
            </button>
          </div>
        </section>

        {/* ─── NEWSLETTER ─── */}
        <section className="px-4 md:px-6 max-w-[800px] mx-auto mb-20 text-center">
          <h2 className="text-[32px] md:text-[44px] font-black uppercase italic tracking-tighter text-black leading-none mb-4">
            Stay in the Loop
          </h2>
          <p className="text-[16px] font-bold text-gray-500 mb-8">Get 20% off your first order when you sign up</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input type="email" placeholder="Enter your email" className="flex-1 bg-[#f5f5f5] border-2 border-black px-6 py-4 font-bold text-[14px] rounded-full outline-none focus:border-pink-500 transition-colors" />
            <button className="bg-black text-white px-10 py-4 font-black uppercase italic tracking-widest text-[14px] hover:bg-pink-500 transition-colors rounded-full shadow-lg">
              Sign Up
            </button>
          </div>
        </section>

      </main>

      {/* ─── FOOTER ─── */}
      <footer className="bg-black text-white w-full border-t-[10px] border-pink-500">
        <div className="max-w-[1800px] mx-auto px-6 md:px-10 pt-20 pb-12">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16 text-[14px] font-medium text-gray-400">

            <div className="flex flex-col space-y-4">
              <h4 className="text-white font-black uppercase italic tracking-widest text-[16px] mb-2 border-l-4 border-pink-500 pl-3">Customer Care</h4>
              <a href="#" className="hover:text-pink-500 transition-colors">Track Order</a>
              <a href="#" className="hover:text-pink-500 transition-colors">Returns & Exchanges</a>
              <a href="#" className="hover:text-pink-500 transition-colors">Shipping Info</a>
              <a href="#" className="hover:text-pink-500 transition-colors">Contact Us</a>
              <a href="#" className="hover:text-pink-500 transition-colors">Size Guide</a>
              <a href="#" className="hover:text-pink-500 transition-colors">Gift Cards</a>
            </div>

            <div className="flex flex-col space-y-4">
              <h4 className="text-white font-black uppercase italic tracking-widest text-[16px] mb-2 border-l-4 border-pink-500 pl-3">About Us</h4>
              <a href="#" className="hover:text-pink-500 transition-colors">About NovaTrend</a>
              <a href="#" className="hover:text-pink-500 transition-colors">Careers</a>
              <a href="#" className="hover:text-pink-500 transition-colors">NovaCares</a>
              <a href="#" className="hover:text-pink-500 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-pink-500 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-pink-500 transition-colors">CA Supply Chains Act</a>
            </div>

            <div className="flex flex-col space-y-4 lg:col-span-2">
              <h4 className="text-white font-black uppercase italic tracking-widest text-[18px] mb-2">Want 20% Off?</h4>
              <p className="mb-4 text-gray-300 font-bold">Sign up for texts & emails to be the first to know about exclusive deals, new arrivals & more!</p>
              <form className="flex w-full mb-8 flex-col sm:flex-row gap-3">
                <input type="email" placeholder="Email Address" className="bg-white border-none text-black px-6 py-4 outline-none flex-1 font-bold font-sans rounded-full md:rounded-r-none" />
                <button type="button" className="bg-pink-500 text-white px-8 py-4 font-black uppercase italic tracking-widest text-[14px] hover:bg-pink-600 transition-colors rounded-full md:rounded-l-none md:-ml-6 shadow-lg">
                  Subscribe
                </button>
              </form>

              <h4 className="text-white font-black uppercase italic tracking-widest text-[16px] mb-4">Follow Us</h4>
              <div className="flex items-center gap-4">
                <a href="#" className="bg-white/10 p-3 rounded-full text-white hover:bg-pink-500 transition-colors"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="bg-white/10 p-3 rounded-full text-white hover:bg-pink-500 transition-colors"><Facebook className="w-5 h-5" /></a>
                <a href="#" className="bg-white/10 p-3 rounded-full text-white hover:bg-pink-500 transition-colors"><Twitter className="w-5 h-5" /></a>
                <a href="#" className="bg-white/10 p-3 rounded-full text-white hover:bg-pink-500 transition-colors"><Youtube className="w-5 h-5" /></a>
                <a href="#" className="bg-white/10 p-3 rounded-full text-white hover:bg-pink-500 transition-colors"><Smartphone className="w-5 h-5" /></a>
              </div>
            </div>

          </div>

          <div className="pt-8 border-t border-gray-800 flex flex-col items-center justify-center gap-4 text-[12px] font-bold uppercase tracking-widest text-gray-500 text-center">
            <span>© 2026 NovaTrend, LLC. All Rights Reserved.</span>
            <p className="text-[10px] max-w-3xl">PROMO CODES EXCLUDE BEAUTY, MULTIPACKS, GIFT CARDS & CERTAIN EXCLUDED ITEMS UNLESS OTHERWISE SPECIFIED. FINAL SALE ITEMS CANNOT BE RETURNED OR EXCHANGED.</p>
          </div>

        </div>
      </footer>
    </div>
  );
}

