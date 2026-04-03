'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { StoreData, Product } from '@/lib/types';
import { useCart } from '@/contexts/CartContext';
import { Search, ShoppingBag, Heart, User, Menu, ChevronRight, X } from 'lucide-react';
import { usePagination, ProductPagination } from '@/components/componentes-compartidos/templates/Pagination';

export default function InfluenceStyleTemplate({ data }: { data: StoreData }) {
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
    <div className="min-h-full bg-white font-sans text-[#111] selection:bg-pink-100 selection:text-[#111] overflow-x-hidden">

      {/* ─── PROMO BANNER ─── */}
      <div className="bg-[#111] text-white text-[10px] md:text-[11px] py-1.5 px-4 flex justify-center text-center font-bold tracking-[0.15em] uppercase w-full">
        Free 2-Day Shipping & Returns | Sign Up For 10% Off
      </div>

      {/* ─── HEADER ─── */}
      <header className="bg-white sticky top-0 z-50 border-b border-gray-100 transition-all">
        <div className="w-full max-w-[1600px] mx-auto px-4 lg:px-8 h-[60px] lg:h-[80px] flex items-center justify-between">

          <div className="flex items-center space-x-6 lg:space-x-8">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hover:opacity-50 transition-opacity"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <nav className="hidden lg:flex space-x-6 xl:space-x-8 font-sans font-bold text-[11px] uppercase tracking-widest text-[#111]">
              <div className="group relative py-8">
                <a href="#" className="hover:text-gray-500 transition-colors">Hot List</a>
                {/* Mega Menu Mock */}
                <div className="absolute top-full -left-4 w-[600px] bg-white border border-gray-100 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all flex p-8 gap-8 z-50">
                  <div className="flex flex-col gap-3 text-[11px] font-sans font-bold text-gray-500 uppercase tracking-widest">
                    <h4 className="text-[#111] mb-2 border-b border-gray-100 pb-2">Trending Now</h4>
                    <a href="#" className="hover:text-[#111] transition-colors">Festival Shop</a>
                    <a href="#" className="hover:text-[#111] transition-colors">Vacation Edit</a>
                    <a href="#" className="hover:text-[#111] transition-colors">Wedding Guest</a>
                    <a href="#" className="hover:text-[#111] transition-colors">Y2K Nostalgia</a>
                  </div>
                  <div className="flex-1 bg-gray-50 relative aspect-[4/3] overflow-hidden group/img cursor-pointer">
                    <Image src="https://picsum.photos/400/300?random=990" alt="Festival edit" fill className="object-cover group-hover/img:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                      <span className="text-white font-bold text-[14px] uppercase tracking-widest">The Festival Shop</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="py-8"><a href="#" className="hover:text-gray-500 transition-colors">New Arrivals</a></div>
              <div className="py-8"><a href="#" className="hover:text-gray-500 transition-colors">Designers</a></div>
              <div className="py-8"><a href="#" className="hover:text-gray-500 transition-colors">Clothing</a></div>
              <div className="py-8"><a href="#" className="hover:text-gray-500 transition-colors">Shoes</a></div>
              <div className="py-8"><a href="#" className="hover:text-gray-500 transition-colors">Beauty</a></div>
              <div className="py-8"><a href="#" className="text-red-500 hover:text-red-400 transition-colors">Sale</a></div>
            </nav>
          </div>

          <div className="flex flex-col items-center justify-center cursor-pointer absolute left-1/2 -translate-x-1/2">
            <span className="font-serif text-[28px] md:text-[36px] font-black tracking-tighter uppercase leading-none text-[#111]">
              InfluenceStyle
            </span>
          </div>

          <div className="flex items-center space-x-4 lg:space-x-6 text-[#111]">
            <div className="hidden md:flex items-center border-b border-[#111] pb-1 w-32 xl:w-48 group">
              <Search className="w-4 h-4 mr-2 group-hover:text-gray-500 transition-colors" />
              <input type="text" placeholder="SEARCH..." className="bg-transparent outline-none text-[10px] font-bold uppercase tracking-widest w-full placeholder-[#111] focus:placeholder-gray-400 transition-colors" />
            </div>

            <Search className="md:hidden w-5 h-5 cursor-pointer hover:text-gray-500 transition-colors" />
            <User className="hidden sm:block w-5 h-5 lg:w-6 lg:h-6 cursor-pointer hover:text-gray-500 transition-colors" strokeWidth={1.5} />
            <div 
              onClick={() => toggleFavorite('header')}
              className="relative cursor-pointer hover:text-gray-500 transition-colors"
            >
              <Heart className={`w-5 h-5 lg:w-6 lg:h-6 ${favorites.length > 0 ? 'fill-red-500 text-red-500' : ''}`} strokeWidth={1.5} />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[9px] font-bold px-1 rounded-full leading-tight">{favorites.length}</span>
              )}
            </div>
            <div 
              onClick={() => setIsCartOpen(true)}
              className="relative cursor-pointer hover:text-gray-500 transition-colors"
            >
              <ShoppingBag className="w-5 h-5 lg:w-6 lg:h-6" strokeWidth={1.5} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-[#111] text-white text-[9px] font-bold px-1 rounded-full leading-tight">{itemCount}</span>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="w-full">

        {/* ─── HERO EDITORIAL BANNER ─── */}
        <section className="relative w-full h-[70vh] md:h-[80vh] flex flex-col items-center justify-end overflow-hidden group cursor-pointer bg-orange-50">
          <Image
            src={data.bannerImage}
            alt="InfluenceStyle Hero"
            fill
            className="object-cover object-top group-hover:scale-105 transition-transform duration-[4000ms] ease-out"
            priority
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

          <div className="relative z-10 w-full px-6 pb-16 md:pb-24 flex flex-col items-center text-center text-white">
            <h1 className="text-[50px] md:text-[80px] lg:text-[100px] font-serif font-black uppercase tracking-tighter mb-4 leading-none drop-shadow-xl w-full text-balance">
              {data.name}
            </h1>
            <p className="text-[14px] md:text-[18px] font-sans font-bold uppercase tracking-widest mb-10 drop-shadow-lg text-white/90">
              {data.description || 'The season’s most coveted styles.'}
            </p>
            <button className="bg-white text-[#111] px-14 py-4 font-sans font-bold uppercase text-[12px] md:text-[13px] tracking-[0.2em] hover:bg-[#111] hover:text-white transition-all shadow-xl">
              Shop The Edit
            </button>
          </div>
        </section>

        {/* ─── CATEGORY LINKS ─── */}
        <section className="w-full border-b border-gray-100 hidden md:block">
          <div className="max-w-[1400px] mx-auto flex justify-center py-6 gap-12 overflow-x-auto hide-scrollbar text-[11px] font-sans font-bold uppercase tracking-widest text-[#111]">
            <a href="#" className="hover:text-gray-400 transition-colors whitespace-nowrap">Dresses</a>
            <a href="#" className="hover:text-gray-400 transition-colors whitespace-nowrap">Tops</a>
            <a href="#" className="hover:text-gray-400 transition-colors whitespace-nowrap">Denim</a>
            <a href="#" className="hover:text-gray-400 transition-colors whitespace-nowrap">Swimwear</a>
            <a href="#" className="hover:text-gray-400 transition-colors whitespace-nowrap">Shoes & Bags</a>
            <a href="#" className="hover:text-gray-400 transition-colors whitespace-nowrap text-red-500">Beauty Discoveries</a>
          </div>
        </section>

        {/* ─── JUST DROPPED / PRODUCTS ─── */}
        <section className="max-w-[1600px] mx-auto px-4 md:px-8 py-20 md:py-32">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b-2 border-[#111] pb-4">
            <h2 className="text-[28px] md:text-[40px] font-serif font-black uppercase tracking-tighter text-[#111] leading-none mb-4 md:mb-0">
              Trending Now
            </h2>
            <div className="flex space-x-6 text-[11px] md:text-[12px] font-sans font-bold uppercase tracking-widest text-gray-400">
              <a href="#" className="text-[#111] border-b border-[#111]">All</a>
              <a href="#" className="hover:text-[#111] transition-colors">Dresses</a>
              <a href="#" className="hover:text-[#111] transition-colors">Tops</a>
              <a href="#" className="hover:text-[#111] transition-colors">Shoes</a>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-4 md:gap-x-6 gap-y-12 md:gap-y-16">
            {paginatedItems.map((product: any, idx: number) => (
              <div key={product.id || idx} data-product-id={product.id} className="group cursor-pointer flex flex-col">
                <div className="relative aspect-[2/3] md:aspect-[3/4] mb-4 overflow-hidden bg-gray-50 flex items-center justify-center">
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-[1500ms] p-2 mix-blend-multiply opacity-90"
                    referrerPolicy="no-referrer"
                  />
                  {/* Quick Shop Button (Desktop) */}
                  <div className="absolute bottom-4 inset-x-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 hidden lg:block">
                    <button 
                      onClick={(e) => handleAddToCart(product, e)}
                      className="w-full bg-white/95 text-[#111] py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-[#111] hover:text-white transition-colors shadow-lg"
                    >
                      Quick Shop
                    </button>
                  </div>
                  {/* Heart Icon */}
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }}
                    className="absolute top-3 right-3 p-2 bg-white/50 backdrop-blur-sm rounded-full text-[#111] opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500 hover:bg-white"
                  >
                    <Heart className={`w-4 h-4 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>
                  {/* Badges */}
                  {(idx === 1 || idx === 4) && (
                    <div className="absolute top-3 left-3 bg-[#111] text-white text-[9px] font-bold uppercase tracking-widest px-2 py-1">
                      Best Seller
                    </div>
                  )}
                </div>

                <div className="flex flex-col text-center md:text-left">
                  <div className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#111] mb-1">
                    {product.category || 'InfluenceStyle Brand'}
                  </div>
                  <h3 className="text-[12px] font-sans text-gray-500 leading-snug line-clamp-1 mb-2">
                    {product.title}
                  </h3>
                  <div className="flex flex-col md:flex-row items-center md:items-baseline md:space-x-2">
                    <span className="font-sans font-bold text-[13px] tracking-wide text-[#111]">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="font-sans text-[11px] text-red-500 line-through tracking-wide">
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
            <div className="mt-12">
              <ProductPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
              />
            </div>
          )}

          <div className="mt-16 flex justify-center">
            <button className="bg-transparent text-[#111] px-14 py-4 font-sans font-bold uppercase text-[12px] tracking-[0.2em] border-2 border-[#111] hover:bg-[#111] hover:text-white transition-all w-full md:w-auto">
              View All New Arrivals
            </button>
          </div>
        </section>

        {/* ─── CURATED EDITS ─── */}
        <section className="bg-orange-50/50 py-24">
          <div className="max-w-[1600px] mx-auto px-4 md:px-8">
            <h2 className="text-[32px] md:text-[50px] font-serif font-black uppercase tracking-tighter text-[#111] leading-none mb-12 text-center">
              The Hot List
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">

              <div className="group relative aspect-[4/5] md:aspect-[3/4] overflow-hidden cursor-pointer">
                <Image src="https://picsum.photos/800/1000?random=991" alt="Vacation Edit" fill className="object-cover group-hover:scale-105 transition-transform duration-[4000ms]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />
                <div className="absolute inset-x-0 bottom-0 p-8 md:p-12 flex flex-col items-center md:items-start text-center md:text-left text-white">
                  <h3 className="text-[36px] md:text-[56px] font-serif font-black uppercase tracking-tighter mb-4 leading-none">The<br />Getaway</h3>
                  <p className="font-sans font-bold text-[12px] uppercase tracking-widest text-gray-200 mb-8 max-w-sm">Jet-set styles for your next warm-weather escape.</p>
                  <span className="font-sans font-bold text-[11px] uppercase tracking-widest bg-white text-[#111] px-8 py-3 group-hover:bg-[#111] group-hover:text-white transition-colors">
                    Shop The Edit
                  </span>
                </div>
              </div>

              <div className="group relative aspect-[4/5] md:aspect-[3/4] overflow-hidden cursor-pointer">
                <Image src="https://picsum.photos/800/1000?random=992" alt="Event Edit" fill className="object-cover group-hover:scale-105 transition-transform duration-[4000ms]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />
                <div className="absolute inset-x-0 bottom-0 p-8 md:p-12 flex flex-col items-center md:items-start text-center md:text-left text-white">
                  <h3 className="text-[36px] md:text-[56px] font-serif font-black uppercase tracking-tighter mb-4 leading-none">After<br />Dark</h3>
                  <p className="font-sans font-bold text-[12px] uppercase tracking-widest text-gray-200 mb-8 max-w-sm">Statement piece dresses and accessories for the night out.</p>
                  <span className="font-sans font-bold text-[11px] uppercase tracking-widest bg-white text-[#111] px-8 py-3 group-hover:bg-[#111] group-hover:text-white transition-colors">
                    Shop Evening Wear
                  </span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ─── TRENDING DESIGNERS ─── */}
        <section className="max-w-[1600px] mx-auto px-4 md:px-8 py-20">
          <h2 className="text-[28px] md:text-[36px] font-serif font-black uppercase tracking-tighter mb-12 text-center">Trending Designers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Maison Luxe', img: 'https://picsum.photos/400/500?random=993' },
              { name: 'Atelier Noir', img: 'https://picsum.photos/400/500?random=994' },
              { name: 'Casa Bella', img: 'https://picsum.photos/400/500?random=995' },
              { name: 'Studio Vogue', img: 'https://picsum.photos/400/500?random=996' },
            ].map((d, i) => (
              <div key={i} className="group cursor-pointer relative aspect-[3/4] overflow-hidden">
                <Image src={d.img} alt={d.name} fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <h3 className="text-white font-serif font-black text-[20px] uppercase tracking-tighter">{d.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── BEAUTY EDIT ─── */}
        <section className="relative w-full h-[450px] md:h-[550px] overflow-hidden group cursor-pointer">
          <Image src="https://picsum.photos/1600/550?random=997" alt="Beauty Edit" fill className="object-cover group-hover:scale-[1.02] transition-transform duration-[3000ms]" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
            <div className="px-8 md:px-16 max-w-lg">
              <span className="bg-white text-[#111] text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 mb-6 inline-block">Beauty</span>
              <h2 className="text-white text-[36px] md:text-[52px] font-serif font-black uppercase tracking-tighter leading-none mb-4">The Beauty Edit</h2>
              <p className="text-white/80 text-[14px] font-medium mb-8">Discover the season's most coveted beauty products from top brands.</p>
              <button className="bg-white text-[#111] px-10 py-3.5 font-bold text-[12px] uppercase tracking-[0.2em] hover:bg-[#111] hover:text-white transition-all">Shop Beauty</button>
            </div>
          </div>
        </section>

        {/* ─── STYLE ADVICE ─── */}
        <section className="max-w-[1600px] mx-auto px-4 md:px-8 py-20">
          <h2 className="text-[28px] md:text-[36px] font-serif font-black uppercase tracking-tighter mb-4 text-center">Style Advice</h2>
          <p className="text-center text-[12px] font-bold uppercase tracking-widest text-gray-400 mb-12">Expert tips from our fashion editors</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'How to Style a Blazer', img: 'https://picsum.photos/500/400?random=998' },
              { title: 'The Perfect Summer Dress', img: 'https://picsum.photos/500/400?random=999' },
              { title: 'Accessorize Like a Pro', img: 'https://picsum.photos/500/400?random=1000' },
            ].map((article, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="relative aspect-[5/4] overflow-hidden mb-4">
                  <Image src={article.img} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <h3 className="font-serif font-black text-[16px] uppercase tracking-tighter group-hover:text-gray-500 transition-colors">{article.title}</h3>
                <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mt-2 inline-block">Read More →</span>
              </div>
            ))}
          </div>
        </section>

        {/* ─── BRAND VALUES ─── */}
        <section className="bg-[#111] text-white py-16">
          <div className="max-w-[1400px] mx-auto px-4 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: '🚚', title: 'Free Shipping', desc: 'On orders over $200' },
              { icon: '↩️', title: 'Easy Returns', desc: '28-day return policy' },
              { icon: '🔒', title: 'Secure Payment', desc: 'SSL encrypted checkout' },
              { icon: '💎', title: 'Authenticity', desc: '100% genuine products' },
            ].map((v, i) => (
              <div key={i} className="p-6">
                <div className="text-3xl mb-3">{v.icon}</div>
                <h4 className="font-bold text-[12px] uppercase tracking-widest mb-1">{v.title}</h4>
                <p className="text-[11px] text-gray-400">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── AMBASSADOR PROGRAM ─── */}
        <section className="max-w-[1600px] mx-auto px-4 md:px-8 py-20">
          <div className="bg-orange-50/50 p-12 md:p-16 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-4 block">Join Us</span>
              <h2 className="text-[28px] md:text-[36px] font-serif font-black uppercase tracking-tighter mb-4">Ambassador Program</h2>
              <p className="text-[14px] text-gray-600 mb-8 leading-relaxed">Earn commission on every sale. Get early access to new collections and exclusive perks.</p>
              <button className="bg-[#111] text-white px-10 py-3.5 font-bold text-[12px] uppercase tracking-[0.2em] hover:bg-gray-800 transition-colors">Apply Now</button>
            </div>
            <div className="flex-1 relative aspect-[4/3] overflow-hidden">
              <Image src="https://picsum.photos/600/450?random=1001" alt="Ambassador" fill className="object-cover" />
            </div>
          </div>
        </section>

        {/* ─── NEWSLETTER ─── */}
        <section className="max-w-[1200px] mx-auto px-4 md:px-8 py-16 text-center">
          <h2 className="font-serif font-black text-[24px] uppercase tracking-tighter mb-4">Stay in the Loop</h2>
          <p className="text-[13px] text-gray-500 mb-8 max-w-md mx-auto">Get 10% off your first order when you sign up for our newsletter.</p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input type="email" placeholder="YOUR EMAIL ADDRESS" className="flex-1 bg-transparent border-b-2 border-gray-200 py-3 font-bold text-[11px] tracking-widest placeholder-gray-400 focus:border-[#111] transition-colors outline-none" />
            <button type="button" className="text-[#111] font-black uppercase tracking-widest text-[12px] hover:text-gray-500 transition-colors border-b-2 border-transparent">Sign Up</button>
          </form>
        </section>

      </main>

      {/* ─── FOOTER ─── */}
      <footer className="bg-white border-t border-gray-100 pt-20 pb-12">
        <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-8">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-20 text-[11px] font-sans font-bold uppercase tracking-widest text-gray-400">

            <div className="lg:col-span-2 pr-0 lg:pr-12">
              <span className="font-serif text-[36px] font-black tracking-tighter uppercase leading-none text-[#111] mb-6 block">
                InfluenceStyle
              </span>
              <p className="normal-case text-[14px] text-gray-500 font-medium leading-relaxed mb-8 max-w-md tracking-normal">
                Sign up to hear about our latest drops, new designers, exclusive access to sales & more. Enjoy 10% off your first order!
              </p>
              <form className="flex w-full mb-6">
                <input type="email" placeholder="YOUR EMAIL ADDRESS" className="bg-transparent border-b-2 border-gray-200 text-[#111] py-3 outline-none flex-1 font-bold text-[12px] tracking-widest placeholder-gray-400 focus:border-[#111] transition-colors" />
                <button type="button" className="text-[#111] font-black uppercase tracking-widest text-[12px] hover:text-gray-500 transition-colors shrink-0 ml-4 border-b-2 border-transparent">
                  Sign Up
                </button>
              </form>
              <div className="flex space-x-6">
                <a href="#" className="hover:text-[#111] transition-colors">Instagram</a>
                <a href="#" className="hover:text-[#111] transition-colors">TikTok</a>
                <a href="#" className="hover:text-[#111] transition-colors">YouTube</a>
              </div>
            </div>

            <div className="flex flex-col space-y-5">
              <h4 className="text-[#111] font-black text-[13px] tracking-widest mb-2 border-b border-[#111] pb-2 w-max">Customer Care</h4>
              <a href="#" className="hover:text-[#111] transition-colors">Contact Us</a>
              <a href="#" className="hover:text-[#111] transition-colors">Shipping Information</a>
              <a href="#" className="hover:text-[#111] transition-colors">Returns & Exchanges</a>
              <a href="#" className="hover:text-[#111] transition-colors">Order Status</a>
              <a href="#" className="hover:text-[#111] transition-colors">FAQ</a>
            </div>

            <div className="flex flex-col space-y-5">
              <h4 className="text-[#111] font-black text-[13px] tracking-widest mb-2 border-b border-[#111] pb-2 w-max">Company</h4>
              <a href="#" className="hover:text-[#111] transition-colors">About Us</a>
              <a href="#" className="hover:text-[#111] transition-colors">Careers</a>
              <a href="#" className="hover:text-[#111] transition-colors">Investors</a>
              <a href="#" className="hover:text-[#111] transition-colors">Ambassador Program</a>
            </div>

            <div className="flex flex-col space-y-5">
              <h4 className="text-[#111] font-black text-[13px] tracking-widest mb-2 border-b border-[#111] pb-2 w-max">Shop</h4>
              <a href="#" className="hover:text-[#111] transition-colors">Gift Cards</a>
              <a href="#" className="hover:text-[#111] transition-colors">Store Locations</a>
              <a href="#" className="hover:text-[#111] transition-colors">Brands A-Z</a>
              <a href="#" className="text-red-500 hover:text-red-400 transition-colors">Sale</a>
            </div>

          </div>

          <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between text-[10px] font-bold uppercase tracking-widest text-gray-400 space-y-4 md:space-y-0">
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              <a href="#" className="hover:text-[#111] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#111] transition-colors">Terms of Use</a>
              <a href="#" className="hover:text-[#111] transition-colors">Accessibility</a>
              <a href="#" className="hover:text-[#111] transition-colors">California Supply Chains Act</a>
            </div>
            <span>© 2026 EMINENT, INC. ALL RIGHTS RESERVED.</span>
          </div>

        </div>
      </footer>
    </div>
  );
}

