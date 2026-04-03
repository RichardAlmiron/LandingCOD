'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { StoreData, Product } from '@/lib/types';
import { useCart } from '@/contexts/CartContext';
import { Search, ShoppingBag, Heart, User, Menu, MapPin, X } from 'lucide-react';
import { usePagination, ProductPagination } from '@/components/componentes-compartidos/templates/Pagination';

export default function GlamAngelTemplate({ data }: { data: StoreData }) {
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
    <div className="min-h-full bg-white font-sans text-black selection:bg-pink-200 selection:text-black overflow-x-hidden">

      {/* ─── PROMO BAR ─── */}
      <div className="bg-[#f7cddb] text-[#111] text-[12px] font-bold py-2.5 px-6 flex flex-col md:flex-row justify-center items-center text-center w-full uppercase tracking-widest gap-1 md:gap-4">
        <span>The Semi-Annual Sale is Here!</span>
        <span className="hidden md:inline">|</span>
        <a href="#" className="underline underline-offset-4 hover:opacity-70 transition-opacity">Up to 60% Off Select Styles</a>
      </div>

      {/* ─── BRAND TABS (VS / PINK) ─── */}
      <div className="bg-[#f5f5f5] w-full flex justify-center text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-gray-500">
        <a href="#" className="px-8 py-2 md:py-3 bg-white text-black border-t-2 border-black inline-block">
          GlamAngel
        </a>
        <a href="#" className="px-8 py-2 md:py-3 hover:text-black transition-colors border-t-2 border-transparent hover:border-black inline-block flex items-center">
          P I N K
        </a>
        <a href="#" className="hidden sm:inline-block px-8 py-2 md:py-3 hover:text-black transition-colors border-t-2 border-transparent hover:border-black">
          Beauty
        </a>
      </div>

      {/* ─── HEADER ─── */}
      <header className="bg-white sticky top-0 z-50 border-b border-gray-200">
        <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8 py-4 md:py-6 flex items-center justify-between">

          <div className="flex items-center space-x-6">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hover:text-[#f7cddb] transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <div className="hidden lg:flex items-center border-b border-gray-300 pb-1 w-48 group">
              <Search className="w-4 h-4 mr-2 text-gray-400 group-hover:text-black transition-colors" />
              <input type="text" placeholder="Search" className="bg-transparent outline-none text-[12px] font-medium tracking-widest w-full placeholder-gray-400" />
            </div>
          </div>

          <div className="flex flex-col items-center justify-center cursor-pointer">
            <span className="font-serif text-[28px] md:text-[40px] tracking-widest uppercase leading-none text-black text-center whitespace-nowrap">
              GLAMANGEL
            </span>
          </div>

          <div className="flex items-center space-x-5 lg:space-x-8">
            <Search className="lg:hidden w-5 h-5 cursor-pointer hover:text-gray-500" />
            <MapPin className="hidden md:block w-5 h-5 cursor-pointer hover:text-gray-500 transition-colors" strokeWidth={1.5} />
            <User className="hidden md:block w-5 h-5 cursor-pointer hover:text-gray-500 transition-colors" strokeWidth={1.5} />
            <div 
              onClick={() => toggleFavorite('header')}
              className="hidden sm:block relative cursor-pointer hover:text-[#f7cddb] transition-colors"
            >
              <Heart className={`w-5 h-5 ${favorites.length > 0 ? 'fill-red-500 text-red-500' : ''}`} strokeWidth={1.5} />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[9px] font-bold px-1 rounded-full">{favorites.length}</span>
              )}
            </div>
            <div 
              onClick={() => setIsCartOpen(true)}
              className="relative cursor-pointer hover:text-gray-500 group"
            >
              <ShoppingBag className="w-5 h-5 lg:w-6 lg:h-6 group-hover:fill-current" strokeWidth={1.5} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-pink-500 text-white text-[9px] font-bold w-[16px] h-[16px] flex items-center justify-center rounded-full leading-none">{itemCount}</span>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Categories */}
        <nav className="hidden lg:flex justify-center space-x-8 py-3 text-[11px] font-bold uppercase tracking-widest">
          <a href="#" className="hover:text-pink-500 transition-colors">Bras</a>
          <a href="#" className="hover:text-pink-500 transition-colors">Panties</a>
          <a href="#" className="hover:text-pink-500 transition-colors">Lingerie</a>
          <a href="#" className="hover:text-pink-500 transition-colors">Sleep</a>
          <a href="#" className="hover:text-pink-500 transition-colors">Sport</a>
          <a href="#" className="hover:text-pink-500 transition-colors">Beauty</a>
          <a href="#" className="hover:text-pink-500 transition-colors">Swim</a>
          <a href="#" className="hover:text-pink-500 transition-colors">Apparel</a>
          <a href="#" className="text-red-600 hover:opacity-70 transition-opacity flex items-center">
            Sale
          </a>
        </nav>
      </header>

      <main className="w-full">

        {/* ─── HERO PROMO ─── */}
        <section className="relative w-full h-[550px] md:h-[700px] group cursor-pointer lg:px-8 lg:pt-8 mb-20">
          <div className="relative w-full h-full overflow-hidden">
            <Image
              src={data.bannerImage}
              alt="Semi-Annual Sale"
              fill
              className="object-cover object-top group-hover:scale-105 transition-transform duration-[4000ms] ease-out"
              priority
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-x-0 bottom-0 p-8 md:p-16 flex flex-col items-center justify-end text-center bg-gradient-to-t from-black/60 to-transparent">
              <span className="bg-red-600 text-white text-[12px] font-black uppercase tracking-[0.2em] px-4 py-1.5 mb-6">
                Ending Soon
              </span>
              <h1 className="text-white text-[48px] md:text-[80px] font-serif uppercase tracking-tighter leading-none mb-4 drop-shadow-xl">
                Semi-Annual Sale
              </h1>
              <p className="text-white text-[14px] md:text-[18px] font-medium uppercase tracking-[0.2em] mb-10 drop-shadow-md">
                {data.description || 'Up to 60% off your favorite bras, panties, sleep & beauty.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <button className="bg-white text-black px-12 py-3.5 font-bold text-[12px] uppercase tracking-[0.2em] hover:bg-gray-100 transition-colors w-full sm:w-auto">
                  Shop Bras
                </button>
                <button className="bg-transparent border-2 border-white text-white px-12 py-3.5 font-bold text-[12px] uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors w-full sm:w-auto">
                  Shop panties
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ─── QUICK SHOP CATEGORIES ─── */}
        <section className="max-w-[1600px] mx-auto px-4 md:px-8 mb-24">
          <h2 className="text-center font-serif text-[32px] md:text-[40px] uppercase tracking-tighter mb-10">
            Sale By Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">

            <div className="group cursor-pointer">
              <div className="relative aspect-[4/5] overflow-hidden mb-4 bg-gray-100">
                <Image src="https://picsum.photos/400/500?random=1121" alt="Bras Sale" fill className="object-cover group-hover:scale-[1.03] transition-transform duration-1000" />
                <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 font-bold text-[11px] uppercase tracking-widest shadow-sm">
                  $14.99 & Up
                </div>
              </div>
              <h3 className="text-center font-bold text-[13px] uppercase tracking-widest group-hover:underline underline-offset-4">Bras</h3>
            </div>

            <div className="group cursor-pointer">
              <div className="relative aspect-[4/5] overflow-hidden mb-4 bg-gray-100">
                <Image src="https://picsum.photos/400/500?random=1122" alt="Panties Sale" fill className="object-cover group-hover:scale-[1.03] transition-transform duration-1000" />
                <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 font-bold text-[11px] uppercase tracking-widest shadow-sm">
                  5 for $15
                </div>
              </div>
              <h3 className="text-center font-bold text-[13px] uppercase tracking-widest group-hover:underline underline-offset-4">Panties</h3>
            </div>

            <div className="group cursor-pointer">
              <div className="relative aspect-[4/5] overflow-hidden mb-4 bg-gray-100">
                <Image src="https://picsum.photos/400/500?random=1123" alt="Sleep Sale" fill className="object-cover group-hover:scale-[1.03] transition-transform duration-1000" />
                <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 font-bold text-[11px] uppercase tracking-widest shadow-sm">
                  Up to 50% Off
                </div>
              </div>
              <h3 className="text-center font-bold text-[13px] uppercase tracking-widest group-hover:underline underline-offset-4">Sleep apparel</h3>
            </div>

            <div className="group cursor-pointer">
              <div className="relative aspect-[4/5] overflow-hidden mb-4 bg-gray-100">
                <Image src="https://picsum.photos/400/500?random=1124" alt="Beauty Sale" fill className="object-cover group-hover:scale-[1.03] transition-transform duration-1000" />
                <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 font-bold text-[11px] uppercase tracking-widest shadow-sm">
                  $5.99 & Up
                </div>
              </div>
              <h3 className="text-center font-bold text-[13px] uppercase tracking-widest group-hover:underline underline-offset-4">Beauty</h3>
            </div>

          </div>
        </section>

        {/* ─── NEW COLLECTION GRID ─── */}
        <section className="bg-pink-50/50 py-24 mb-16 border-t border-pink-100">
          <div className="max-w-[1600px] mx-auto px-4 md:px-8">
            <div className="flex flex-col items-center mb-16">
              <h2 className="text-[32px] md:text-[48px] font-serif uppercase tracking-tighter mb-4 text-center">
                The Dream Angels Collection
              </h2>
              <a href="#" className="font-bold text-[12px] uppercase tracking-widest border-b-2 border-black pb-1 hover:text-pink-600 hover:border-pink-600 transition-colors">
                Shop All Collection
              </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-x-6 gap-y-12 md:gap-y-16">
              {paginatedItems.map((product, idx) => (
                <div key={product.id || idx} data-product-id={product.id} className="group cursor-pointer flex flex-col items-center text-center">

                  <div className="relative w-full aspect-[3/4] mb-4 overflow-hidden bg-white">
                    <Image
                      src={product.imageUrl}
                      alt={product.title}
                      fill
                      className="object-cover group-hover:scale-[1.05] transition-transform duration-[2000ms] opacity-95 group-hover:opacity-100"
                      referrerPolicy="no-referrer"
                    />

                    {/* Add to Bag Hover */}
                    <div className="absolute bottom-0 inset-x-0 p-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hidden lg:block bg-gradient-to-t from-black/50 to-transparent">
                      <button 
                        onClick={(e) => handleAddToCart(product, e)}
                        className="w-full bg-white text-black py-3 font-bold text-[11px] uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
                      >
                        Quick View
                      </button>
                    </div>

                    <button 
                      onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }}
                      className="absolute top-3 right-3 p-2 bg-white/70 backdrop-blur rounded-full text-black hover:text-pink-600 hover:bg-white transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Heart className={`w-4 h-4 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                    </button>

                    {/* Labels */}
                    {(idx === 1 || idx === 3) && (
                      <div className="absolute top-3 left-3 bg-black text-white px-2 py-1 font-bold text-[9px] uppercase tracking-widest">
                        Online Exclusive
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col w-full h-[80px]">
                    <h3 className="font-bold text-[12px] text-gray-500 uppercase tracking-widest mb-1">
                      {product.category || 'GlamAngel'}
                    </h3>
                    <div className="text-[13px] md:text-[14px] text-black font-medium line-clamp-2 leading-snug mb-2 group-hover:underline underline-offset-2 decoration-1">
                      {product.title}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 mt-auto">
                    {product.originalPrice ? (
                      <>
                        <span className="font-bold text-[15px] text-red-600">${product.price}</span>
                        <span className="text-[12px] text-gray-500 line-through">${product.originalPrice}</span>
                      </>
                    ) : (
                      <span className="font-bold text-[15px] text-black">${product.price}</span>
                    )}
                  </div>

                  {/* Colors mock */}
                  <div className="flex justify-center space-x-1.5 mt-3">
                    <span className="w-3 h-3 rounded-full border border-gray-300 bg-pink-100"></span>
                    <span className="w-3 h-3 rounded-full border border-gray-300 bg-black"></span>
                    <span className="w-3 h-3 rounded-full border border-gray-300 bg-[#e7d2cc]"></span>
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
          </div>
        </section>

        {/* ─── BEST SELLERS CAROUSEL ─── */}
        <section className="max-w-[1600px] mx-auto px-4 md:px-8 mb-24">
          <h2 className="text-center font-serif text-[32px] md:text-[40px] uppercase tracking-tighter mb-4">Best Sellers</h2>
          <p className="text-center text-[12px] font-bold uppercase tracking-widest text-gray-400 mb-12">Our Most-Loved Styles</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {data.products.slice(0, 4).map((product, idx) => (
              <div key={`bs-${product.id || idx}`} className="group cursor-pointer text-center">
                <div className="relative aspect-[3/4] overflow-hidden mb-4 bg-pink-50">
                  <Image src={product.imageUrl} alt={product.title} fill className="object-cover group-hover:scale-[1.03] transition-transform duration-1000" referrerPolicy="no-referrer" />
                  <button onClick={(e) => handleAddToCart(product, e)} className="absolute bottom-4 left-4 right-4 bg-white text-black py-2.5 font-bold text-[11px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black hover:text-white">
                    Quick Add
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }} className="absolute top-3 right-3 p-2 bg-white/70 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <Heart className={`w-4 h-4 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-black'}`} />
                  </button>
                  {idx === 0 && <div className="absolute top-3 left-3 bg-pink-500 text-white px-2 py-1 font-bold text-[9px] uppercase tracking-widest">#1 Best Seller</div>}
                </div>
                <h3 className="font-bold text-[12px] uppercase tracking-widest text-gray-500 mb-1">{product.category || 'GlamAngel'}</h3>
                <p className="text-[13px] font-medium line-clamp-1 mb-1">{product.title}</p>
                <span className="font-bold text-[14px]">${product.price}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ─── BODY BY GLAMANGEL ─── */}
        <section className="relative w-full h-[500px] md:h-[600px] mb-24 overflow-hidden group cursor-pointer">
          <Image src="https://picsum.photos/1600/600?random=1130" alt="Body by GlamAngel" fill className="object-cover group-hover:scale-[1.02] transition-transform duration-[3000ms]" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-center">
            <div className="px-8 md:px-16 max-w-xl">
              <span className="bg-[#f7cddb] text-black text-[11px] font-black uppercase tracking-[0.2em] px-4 py-1.5 mb-6 inline-block">New Collection</span>
              <h2 className="text-white text-[40px] md:text-[60px] font-serif uppercase tracking-tighter leading-none mb-4 drop-shadow-xl">Body by GlamAngel</h2>
              <p className="text-white/80 text-[14px] md:text-[16px] font-medium mb-8">Smoothing, shaping, and oh-so-comfortable. Discover our new body collection.</p>
              <button className="bg-white text-black px-10 py-3.5 font-bold text-[12px] uppercase tracking-[0.2em] hover:bg-gray-100 transition-colors">Shop Body</button>
            </div>
          </div>
        </section>

        {/* ─── FRAGRANCE SPOTLIGHT ─── */}
        <section className="max-w-[1600px] mx-auto px-4 md:px-8 mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative aspect-[4/5] overflow-hidden group cursor-pointer bg-[#f9e8ee]">
              <Image src="https://picsum.photos/600/750?random=1131" alt="Bombshell" fill className="object-cover group-hover:scale-[1.03] transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex flex-col items-center justify-end pb-10">
                <h3 className="text-white text-[28px] md:text-[36px] font-serif uppercase tracking-tighter mb-2 drop-shadow-lg">Bombshell</h3>
                <p className="text-white/80 text-[13px] font-medium mb-4">The #1 Fragrance in America</p>
                <button className="bg-white text-black px-8 py-3 font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-gray-100 transition-colors">Shop Now</button>
              </div>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden group cursor-pointer bg-[#e8e0f0]">
              <Image src="https://picsum.photos/600/750?random=1132" alt="Tease" fill className="object-cover group-hover:scale-[1.03] transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex flex-col items-center justify-end pb-10">
                <h3 className="text-white text-[28px] md:text-[36px] font-serif uppercase tracking-tighter mb-2 drop-shadow-lg">Tease</h3>
                <p className="text-white/80 text-[13px] font-medium mb-4">Playful. Bold. Irresistible.</p>
                <button className="bg-white text-black px-8 py-3 font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-gray-100 transition-colors">Shop Now</button>
              </div>
            </div>
          </div>
        </section>

        {/* ─── LOYALTY REWARDS ─── */}
        <section className="bg-[#f7cddb] py-16 md:py-20 mb-24">
          <div className="max-w-[1200px] mx-auto px-4 md:px-8 text-center">
            <h2 className="font-serif text-[32px] md:text-[40px] uppercase tracking-tighter mb-4">The GlamAngel Rewards</h2>
            <p className="text-[14px] font-medium text-black/70 mb-10 max-w-lg mx-auto">Join for free and earn points on every purchase. Unlock exclusive perks, birthday gifts, and early access to sales.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="bg-white/80 backdrop-blur p-6 text-center">
                <div className="text-[32px] font-serif mb-2">🎁</div>
                <h4 className="font-bold text-[13px] uppercase tracking-widest mb-2">Birthday Gift</h4>
                <p className="text-[12px] text-gray-600">A special treat just for you on your birthday</p>
              </div>
              <div className="bg-white/80 backdrop-blur p-6 text-center">
                <div className="text-[32px] font-serif mb-2">⭐</div>
                <h4 className="font-bold text-[13px] uppercase tracking-widest mb-2">Earn Points</h4>
                <p className="text-[12px] text-gray-600">1 point for every $1 spent in store & online</p>
              </div>
              <div className="bg-white/80 backdrop-blur p-6 text-center">
                <div className="text-[32px] font-serif mb-2">🛍️</div>
                <h4 className="font-bold text-[13px] uppercase tracking-widest mb-2">Early Access</h4>
                <p className="text-[12px] text-gray-600">Shop new collections before everyone else</p>
              </div>
            </div>
            <button className="bg-black text-white px-12 py-3.5 font-bold text-[12px] uppercase tracking-[0.2em] hover:bg-gray-800 transition-colors">Join Now — It&apos;s Free</button>
          </div>
        </section>

        {/* ─── SPORT COLLECTION ─── */}
        <section className="max-w-[1600px] mx-auto px-4 md:px-8 mb-24">
          <div className="flex flex-col md:flex-row gap-6 items-stretch">
            <div className="flex-1 relative aspect-[4/5] md:aspect-auto overflow-hidden group cursor-pointer">
              <Image src="https://picsum.photos/800/600?random=1133" alt="Sport Collection" fill className="object-cover group-hover:scale-[1.03] transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex flex-col items-start justify-end p-8 md:p-12">
                <span className="bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 mb-4">GlamAngel Sport</span>
                <h3 className="text-white text-[28px] md:text-[36px] font-serif uppercase tracking-tighter leading-none mb-3 drop-shadow-lg">Move in Style</h3>
                <p className="text-white/80 text-[13px] font-medium mb-6 max-w-sm">Performance meets fashion. Our sport collection is designed for every workout.</p>
                <button className="bg-white text-black px-8 py-3 font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-gray-100 transition-colors">Shop Sport</button>
              </div>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4">
              {[
                { title: 'Sports Bras', img: 'https://picsum.photos/400/400?random=1134' },
                { title: 'Leggings', img: 'https://picsum.photos/400/400?random=1135' },
                { title: 'Shorts', img: 'https://picsum.photos/400/400?random=1136' },
                { title: 'Tops', img: 'https://picsum.photos/400/400?random=1137' },
              ].map((item, i) => (
                <div key={i} className="group cursor-pointer relative aspect-square overflow-hidden bg-gray-100">
                  <Image src={item.img} alt={item.title} fill className="object-cover group-hover:scale-[1.03] transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors flex items-end p-4">
                    <span className="text-white font-bold text-[12px] uppercase tracking-widest">{item.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SWIM SEASON ─── */}
        <section className="relative w-full h-[400px] md:h-[500px] mb-24 overflow-hidden group cursor-pointer">
          <Image src="https://picsum.photos/1600/500?random=1138" alt="Swim Season" fill className="object-cover group-hover:scale-[1.02] transition-transform duration-[3000ms]" />
          <div className="absolute inset-0 bg-gradient-to-l from-black/50 to-transparent flex items-center justify-end">
            <div className="px-8 md:px-16 max-w-lg text-right">
              <h2 className="text-white text-[36px] md:text-[52px] font-serif uppercase tracking-tighter leading-none mb-4 drop-shadow-xl">Swim Season</h2>
              <p className="text-white/80 text-[14px] font-medium mb-8">Bikinis, one-pieces, and cover-ups designed to make a splash.</p>
              <button className="bg-white text-black px-10 py-3.5 font-bold text-[12px] uppercase tracking-[0.2em] hover:bg-gray-100 transition-colors">Shop Swim</button>
            </div>
          </div>
        </section>

        {/* ─── NEWSLETTER SIGNUP ─── */}
        <section className="max-w-[1200px] mx-auto px-4 md:px-8 mb-24 text-center">
          <h2 className="font-serif text-[28px] md:text-[36px] uppercase tracking-tighter mb-4">Stay in the Know</h2>
          <p className="text-[13px] text-gray-500 font-medium mb-8 max-w-md mx-auto">Sign up for emails and get first dibs on new arrivals, sales, exclusive content, events, and more.</p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input type="email" placeholder="ENTER EMAIL ADDRESS" className="flex-1 bg-gray-100 border border-transparent px-4 py-3 font-bold text-[11px] tracking-widest placeholder-gray-500 focus:border-black focus:bg-white transition-all outline-none" />
            <button type="button" className="bg-black text-white px-8 py-3 font-bold text-[11px] uppercase tracking-widest hover:bg-pink-600 transition-colors">Subscribe</button>
          </form>
        </section>

      </main>

      {/* ─── FOOTER ─── */}
      <footer className="bg-white border-t border-gray-200 pt-20 pb-12">
        <div className="w-full max-w-[1600px] mx-auto px-6">

          <div className="font-serif text-[32px] md:text-[48px] tracking-[0.1em] uppercase text-center mb-16 border-b border-gray-100 pb-10">
            GLAMANGEL
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">

            <div className="col-span-1 lg:col-span-2">
              <h4 className="font-bold text-[13px] uppercase tracking-[0.1em] mb-4 text-black">Sign Up for Email</h4>
              <p className="font-medium text-[13px] text-gray-500 mb-6 max-w-sm leading-relaxed">
                Be the first to know about new arrivals, sales, exclusive offers & more.
              </p>
              <form className="flex w-full mb-8 max-w-sm">
                <input type="email" placeholder="ENTER EMAIL ADDRESS" className="bg-gray-100 border border-transparent text-black px-4 py-3 outline-none flex-1 font-bold text-[11px] tracking-widest placeholder-gray-500 focus:border-black focus:bg-white transition-all" />
                <button type="button" className="bg-black text-white px-6 py-3 font-bold uppercase tracking-widest text-[11px] hover:bg-pink-600 transition-colors">
                  Sign Up
                </button>
              </form>
              <h4 className="font-bold text-[13px] uppercase tracking-[0.1em] mb-4 text-black">Find A Store</h4>
              <div className="flex items-center text-[12px] font-bold uppercase tracking-widest text-gray-600 hover:text-black cursor-pointer w-max border-b-2 border-black pb-1">
                <MapPin className="w-4 h-4 mr-2" /> Store Locator
              </div>
            </div>

            <div className="flex flex-col space-y-5 text-[11px] font-bold uppercase tracking-widest text-gray-500">
              <h4 className="text-black mb-2">Help</h4>
              <a href="#" className="hover:text-black transition-colors">Customer Service</a>
              <a href="#" className="hover:text-black transition-colors">Live Chat</a>
              <a href="#" className="hover:text-black transition-colors">Returns & Exchanges</a>
              <a href="#" className="hover:text-black transition-colors">Shipping Information</a>
              <a href="#" className="hover:text-black transition-colors">Product Care</a>
            </div>

            <div className="flex flex-col space-y-5 text-[11px] font-bold uppercase tracking-widest text-gray-500">
              <h4 className="text-black mb-2">Orders</h4>
              <a href="#" className="hover:text-black transition-colors">Track Your Order</a>
              <a href="#" className="hover:text-black transition-colors">Order History</a>
              <a href="#" className="hover:text-black transition-colors">Gift Cards</a>
              <a href="#" className="hover:text-black transition-colors">Check Gift Card Balance</a>
            </div>

            <div className="flex flex-col space-y-5 text-[11px] font-bold uppercase tracking-widest text-gray-500">
              <h4 className="text-black mb-2">About Us</h4>
              <a href="#" className="hover:text-black transition-colors">Our Company</a>
              <a href="#" className="hover:text-black transition-colors">Careers</a>
              <a href="#" className="hover:text-black transition-colors">Corporate Responsibility</a>
              <a href="#" className="hover:text-black transition-colors">Affiliate Program</a>
            </div>

          </div>

          <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between text-[10px] font-bold uppercase tracking-widest text-gray-400 space-y-4 md:space-y-0">
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-black transition-colors">Terms of Use</a>
              <a href="#" className="hover:text-black transition-colors">Site Map</a>
              <a href="#" className="hover:text-black transition-colors">California Privacy Rights</a>
            </div>
            <span>© 2026 GLAMANGEL. ALL RIGHTS RESERVED.</span>
          </div>

        </div>
      </footer>
    </div>
  );
}

