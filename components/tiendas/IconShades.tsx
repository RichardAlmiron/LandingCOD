'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { StoreData, Product } from '@/lib/types';
import { useCart } from '@/contexts/CartContext';
import { Search, ShoppingBag, User, MapPin, Heart, ChevronRight, Play, Menu, X } from 'lucide-react';
import { usePagination, ProductPagination } from '@/components/componentes-compartidos/templates/Pagination';

export default function IconShadesTemplate({ data }: { data: StoreData }) {
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
  const rbRed = "#e60000";
  const rbBlack = "#111111";

  return (
    <div className="min-h-full bg-white font-sans text-[#111] selection:bg-[#e60000] selection:text-white pb-0 overflow-x-hidden">

      {/* ─── TOP NOTIFICATION BAR ─── */}
      <div className="bg-[#111] text-white text-[12px] py-2 px-6 flex justify-center font-black tracking-widest uppercase border-b-2 border-[#e60000]">
        Free Shipping & Returns On All Orders
      </div>

      {/* ─── HEADER ─── */}
      <header className="bg-white sticky top-0 z-50 transition-all border-b border-gray-200">
        <div className="w-full max-w-[1600px] mx-auto px-6 h-[80px] flex items-center justify-between">

          <div className="flex items-center space-x-6 lg:space-x-10">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hover:text-[#e60000] transition-colors"
            >
              {mobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>

            <div className="flex items-center justify-center cursor-pointer bg-[#e60000] px-4 py-2 text-white skew-x-[-10deg]">
              <span className="font-serif text-[28px] md:text-[36px] font-black italic tracking-tighter leading-none skew-x-[10deg] px-1 relative top-[2px]">
                IconShades
              </span>
            </div>

            <nav className="hidden lg:flex space-x-8 font-sans text-[15px] font-black uppercase tracking-wider text-[#111]">
              <div className="group relative py-8">
                <a href="#" className="hover:text-[#e60000] transition-colors">Sunglasses</a>
                <div className="absolute top-full -left-10 w-[700px] bg-white shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all flex border-t-4 border-[#e60000] z-50 overflow-hidden">
                  <div className="flex-1 p-10 flex flex-col gap-4">
                    <h4 className="text-[#111] font-black italic uppercase tracking-widest text-[18px] mb-2 border-b-2 border-gray-200 pb-2">Icons</h4>
                    <a href="#" className="text-[14px] font-bold text-gray-600 hover:text-[#e60000] transition-colors flex justify-between items-center group/item">
                      Aviator <ChevronRight className="w-4 h-4 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                    </a>
                    <a href="#" className="text-[14px] font-bold text-gray-600 hover:text-[#e60000] transition-colors flex justify-between items-center group/item">
                      Wayfarer <ChevronRight className="w-4 h-4 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                    </a>
                    <a href="#" className="text-[14px] font-bold text-gray-600 hover:text-[#e60000] transition-colors flex justify-between items-center group/item">
                      Clubmaster <ChevronRight className="w-4 h-4 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                    </a>
                    <a href="#" className="text-[14px] font-bold text-gray-600 hover:text-[#e60000] transition-colors flex justify-between items-center group/item">
                      Round <ChevronRight className="w-4 h-4 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                    </a>
                  </div>
                  <div className="w-[300px] bg-gray-100 relative">
                    <Image src="https://picsum.photos/300/400?random=960" alt="New Aviators" fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                      <span className="text-white font-black italic uppercase text-[24px] leading-tight drop-shadow-md">The New<br />Aviator</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="py-8"><a href="#" className="hover:text-[#e60000] transition-colors">Eyeglasses</a></div>
              <div className="py-8"><a href="#" className="hover:text-[#e60000] transition-colors">Custom</a></div>
              <div className="py-8"><a href="#" className="text-[#e60000] hover:text-[#111] transition-colors">Promo</a></div>
            </nav>
          </div>

          <div className="flex items-center space-x-4 lg:space-x-6 text-[#111]">
            <Search className="w-6 h-6 cursor-pointer hover:text-[#e60000] transition-colors" strokeWidth={2.5} />
            <MapPin className="hidden md:block w-6 h-6 cursor-pointer hover:text-[#e60000] transition-colors" strokeWidth={2.5} />
            <User className="hidden md:block w-6 h-6 cursor-pointer hover:text-[#e60000] transition-colors" strokeWidth={2.5} />
            <div 
              onClick={() => toggleFavorite('header')}
              className="relative cursor-pointer hover:text-[#e60000] transition-colors"
            >
              <Heart className={`w-6 h-6 ${favorites.length > 0 ? 'fill-[#e60000] text-[#e60000]' : ''}`} strokeWidth={2.5} />
              {favorites.length > 0 && (
                <span className="absolute -bottom-1 -right-2 bg-[#e60000] text-white text-[9px] font-black px-1.5 rounded-full">{favorites.length}</span>
              )}
            </div>
            <div 
              onClick={() => setIsCartOpen(true)}
              className="relative cursor-pointer hover:text-[#e60000] transition-colors"
            >
              <ShoppingBag className="w-6 h-6" strokeWidth={2.5} />
              {itemCount > 0 && (
                <span className="absolute -bottom-1 -right-2 bg-[#e60000] text-white text-[10px] font-black px-1.5 py-0.5 leading-none rounded-full border border-white">{itemCount}</span>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="w-full">

        {/* ─── HERO BANNER ─── */}
        <section className="relative w-full h-[600px] lg:h-[800px] flex justify-end items-end overflow-hidden bg-[#111] group">
          <Image
            src={data.bannerImage}
            alt="IconShades Hero"
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-[5000ms] ease-out"
            priority
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-black/20 to-transparent" />

          <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 pb-12 md:pb-24">
            <h1 className="text-[60px] md:text-[100px] lg:text-[140px] font-black italic uppercase tracking-tighter text-white leading-[0.85] mb-4 drop-shadow-2xl">
              {data.name}
            </h1>
            <p className="text-[18px] md:text-[24px] font-bold uppercase tracking-widest text-[#e60000] bg-[#111] inline-block px-4 py-1 mb-8">
              {data.description || 'Genuine Since 1937.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <button className="bg-[#e60000] text-white px-12 py-4 font-black uppercase text-[15px] tracking-widest hover:bg-[#111] transition-all w-full sm:w-auto text-center border-2 border-[#e60000] hover:border-[#111]">
                Shop Sunglasses
              </button>
              <button className="bg-transparent border-2 border-white text-white px-12 py-4 font-black uppercase text-[15px] tracking-widest hover:bg-white hover:text-[#111] transition-all w-full sm:w-auto text-center">
                Customize Yours
              </button>
            </div>
          </div>
        </section>

        {/* ─── THE ICONS GRID ─── */}
        <section className="py-20 md:py-32 bg-white">
          <div className="max-w-[1600px] mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b-4 border-[#111] pb-4">
              <h2 className="text-[40px] md:text-[60px] font-black italic uppercase tracking-tighter text-[#111] leading-none">
                The Icons
              </h2>
              <a href="#" className="text-[14px] font-black uppercase tracking-widest text-[#e60000] hover:text-[#111] transition-colors mt-4 md:mt-0 flex items-center group">
                Shop All Icons <ChevronRight className="w-5 h-5 ml-1 transform group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: 'Aviator', img: 'https://picsum.photos/500/500?random=961' },
                { name: 'Wayfarer', img: 'https://picsum.photos/500/500?random=962' },
                { name: 'Clubmaster', img: 'https://picsum.photos/500/500?random=963' },
                { name: 'Round', img: 'https://picsum.photos/500/500?random=964' },
              ].map((icon, i) => (
                <div key={i} className="group relative cursor-pointer overflow-hidden bg-gray-100 flex items-center justify-center p-8 border-2 border-transparent hover:border-[#e60000] transition-colors">
                  <div className="absolute top-4 left-4 font-black italic text-[24px] uppercase text-[#111] tracking-tighter mix-blend-multiply opacity-20 group-hover:opacity-10 transition-opacity scale-150 origin-top-left z-0">
                    {icon.name}
                  </div>
                  <div className="relative z-10 w-full aspect-[4/3]">
                    <Image src={icon.img} alt={icon.name} fill className="object-contain group-hover:scale-110 group-hover:rotate-[-5deg] transition-all duration-700 drop-shadow-xl" />
                  </div>
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#111] text-white px-8 py-3 font-black uppercase tracking-widest text-[12px] opacity-0 translate-y-4 group-hover:translate-y-0 group-hover:opacity-100 transition-all z-20 whitespace-nowrap">
                    Shop {icon.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── NEW ARRIVALS / COLLECTION (Paginated) ─── */}
        <section className="bg-gray-100 py-20 md:py-32">
          <div className="max-w-[1600px] mx-auto px-6">
            <h2 className="text-[32px] md:text-[48px] font-black italic uppercase tracking-tighter text-[#111] mb-12 text-center md:text-left">
              Latest Drops ({totalItems})
            </h2>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 md:gap-4">
              {paginatedItems.map((product: any, idx: number) => (
                <div key={product.id || idx} data-product-id={product.id} className="group cursor-pointer bg-white flex flex-col items-center relative border border-gray-200 p-2">

                  {(idx === 0 || idx === 2) && (
                    <div className="absolute top-2 right-2 bg-[#e60000] text-white text-[10px] font-black uppercase px-1.5 py-0.5 tracking-widest z-10">
                      New
                    </div>
                  )}

                  <div className="relative aspect-[4/3] w-full p-3">
                    <Image
                      src={product.imageUrl}
                      alt={product.title}
                      fill
                      className="object-contain p-4 group-hover:scale-110 transition-transform duration-500 drop-shadow-lg"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="flex flex-col items-center w-full px-2 pb-3 mt-auto border-t border-gray-100 pt-3">
                    <h3 className="text-[13px] font-black uppercase tracking-wider text-[#111] text-center mb-0.5 line-clamp-1">
                      {product.title}
                    </h3>
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
                      {product.category || 'Standard Fit'}
                    </div>

                    {/* Swatches mock */}
                    <div className="flex space-x-1.5 mb-2">
                      <div className="w-4 h-4 rounded-full bg-black border-2 border-transparent group-hover:border-gray-300 transition-colors"></div>
                      <div className="w-4 h-4 rounded-full bg-[gold] border-2 border-transparent group-hover:border-gray-300 transition-colors"></div>
                      <div className="w-4 h-4 rounded-full bg-[silver] border-2 border-transparent group-hover:border-gray-300 transition-colors"></div>
                    </div>

                    <div className="flex flex-col items-center">
                      <span className="font-black text-[15px] text-[#111]">${product.price}</span>
                      {product.originalPrice && (
                        <span className="font-bold text-[11px] text-gray-400 line-through">${product.originalPrice}</span>
                      )}
                    </div>
                  </div>

                  {/* Interactive buttons */}
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }}
                    className="absolute top-2 left-2 p-1.5 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Heart className={`w-3.5 h-3.5 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>
                  <button 
                    onClick={(e) => handleAddToCart(product, e)}
                    className="absolute bottom-16 left-2 right-2 bg-[#111] text-white py-1 text-[9px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Add
                  </button>
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

            <div className="mt-8 flex justify-center">
              <button 
                onClick={() => handlePageChange(currentPage + 1)}
                className="bg-[#111] text-white px-10 py-3 font-black uppercase text-[13px] tracking-widest hover:bg-[#e60000] border-2 border-[#111] hover:border-[#e60000] transition-all"
              >
                Load More
              </button>
            </div>
          </div>
        </section>

        {/* ─── CUSTOMIZE SECTION (REMIX) ─── */}
        <section className="relative bg-[#111] text-white overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-1/2 p-12 md:p-24 lg:p-32 flex flex-col justify-center items-start relative z-10">
              <div className="flex items-center space-x-2 mb-6 cursor-pointer bg-white w-max px-3 py-1 skew-x-[-10deg]">
                <span className="font-serif text-[24px] font-black italic tracking-tighter leading-none skew-x-[10deg] text-[#e60000] px-1 relative top-[1px]">
                  IconShades
                </span>
                <span className="font-black italic uppercase tracking-widest text-[#111] skew-x-[10deg] text-[18px]">
                  Remix
                </span>
              </div>
              <h2 className="text-[48px] md:text-[70px] font-black italic uppercase tracking-tighter text-white leading-[0.9] mb-6 drop-shadow-lg">
                Design Your Own IconShades
              </h2>
              <p className="text-[16px] md:text-[20px] font-bold text-gray-300 leading-relaxed mb-10 max-w-lg">
                Millions of combinations. Choose your favorite frame, lens, temples, and add a personalized engraving to make them truly yours.
              </p>
              <button className="bg-[#e60000] text-white px-12 py-5 font-black uppercase text-[15px] tracking-widest hover:bg-white hover:text-[#111] transition-all flex items-center">
                Start Customizing <Play className="w-4 h-4 ml-3 fill-current" />
              </button>
            </div>
            <div className="w-full lg:w-1/2 relative h-[500px] lg:h-auto min-h-[600px] overflow-hidden group">
              {/* A vibrant, highly contrasted image to represent custom eyewear */}
              <Image src="https://picsum.photos/1200/1200?random=965" alt="IconShades Remix" fill className="object-cover group-hover:scale-105 transition-transform duration-[6000ms] ease-out opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#111] to-transparent lg:w-1/3" />
              <div className="absolute inset-0 bg-[#e60000] mix-blend-multiply opacity-20" />
            </div>
          </div>
        </section>

        {/* ─── BEST SELLERS ─── */}
        <section className="py-20 md:py-32 bg-white">
          <div className="max-w-[1600px] mx-auto px-6">
            <h2 className="text-[32px] md:text-[48px] font-black italic uppercase tracking-tighter text-[#111] mb-12">Best Sellers</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {data.products.slice(0, 4).map((product, idx) => (
                <div key={`bs-${product.id || idx}`} className="group cursor-pointer bg-gray-100 p-4 border-2 border-transparent hover:border-[#e60000] transition-colors">
                  <div className="relative aspect-[4/3] mb-4">
                    <Image src={product.imageUrl} alt={product.title} fill className="object-contain p-4 group-hover:scale-110 transition-transform duration-500 drop-shadow-lg" referrerPolicy="no-referrer" />
                    <button onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }} className="absolute top-2 left-2 p-1.5 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <Heart className={`w-4 h-4 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                    </button>
                  </div>
                  <h3 className="text-[13px] font-black uppercase tracking-wider text-center mb-1 line-clamp-1">{product.title}</h3>
                  <p className="text-center font-black text-[15px]">${product.price}</p>
                  <button onClick={(e) => handleAddToCart(product, e)} className="w-full mt-3 bg-[#111] text-white py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-[#e60000] transition-colors">Add to Bag</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── VIRTUAL TRY-ON ─── */}
        <section className="relative bg-gray-100 overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-1/2 p-12 md:p-24 flex flex-col justify-center">
              <span className="text-[#e60000] font-black italic uppercase tracking-widest text-[14px] mb-4">New Feature</span>
              <h2 className="text-[40px] md:text-[56px] font-black italic uppercase tracking-tighter leading-[0.9] mb-6">Virtual Try-On</h2>
              <p className="text-[16px] text-gray-600 font-bold leading-relaxed mb-10 max-w-lg">
                See how any frame looks on you before you buy. Use your camera to try on hundreds of styles from the comfort of your home.
              </p>
              <button className="bg-[#e60000] text-white px-12 py-4 font-black uppercase text-[14px] tracking-widest hover:bg-[#111] transition-all w-max">Try Now</button>
            </div>
            <div className="w-full lg:w-1/2 relative h-[400px] lg:h-[600px]">
              <Image src="https://picsum.photos/800/600?random=970" alt="Virtual Try-On" fill className="object-cover" />
            </div>
          </div>
        </section>

        {/* ─── LENS TECHNOLOGY ─── */}
        <section className="py-20 md:py-32 bg-white">
          <div className="max-w-[1200px] mx-auto px-6 text-center">
            <h2 className="text-[32px] md:text-[48px] font-black italic uppercase tracking-tighter mb-4">Lens Technology</h2>
            <p className="text-gray-500 font-bold text-[14px] mb-16 max-w-lg mx-auto">Engineered for clarity, protection, and style</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'Polarized', desc: 'Eliminates glare for crystal-clear vision in bright conditions', icon: '🔆' },
                { title: 'Chromance™', desc: 'Enhanced color and contrast for a vivid visual experience', icon: '🌈' },
                { title: 'Transitions®', desc: 'Lenses that adapt to changing light conditions automatically', icon: '🕶️' },
              ].map((tech, i) => (
                <div key={i} className="p-8 border-2 border-gray-200 hover:border-[#e60000] transition-colors cursor-pointer group">
                  <div className="text-[48px] mb-6">{tech.icon}</div>
                  <h3 className="font-black italic uppercase tracking-wider text-[18px] mb-3 group-hover:text-[#e60000] transition-colors">{tech.title}</h3>
                  <p className="text-[13px] text-gray-500 font-bold leading-relaxed">{tech.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CELEBRITY PICKS ─── */}
        <section className="py-20 bg-[#111] text-white">
          <div className="max-w-[1600px] mx-auto px-6">
            <h2 className="text-[32px] md:text-[48px] font-black italic uppercase tracking-tighter mb-12">As Seen On</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[971, 972, 973, 974].map(seed => (
                <div key={seed} className="group cursor-pointer relative aspect-[3/4] overflow-hidden">
                  <Image src={`https://picsum.photos/400/533?random=${seed}`} alt="Celebrity" fill className="object-cover group-hover:scale-105 transition-transform duration-700 grayscale group-hover:grayscale-0" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <button className="bg-[#e60000] text-white px-6 py-2 font-black uppercase text-[11px] tracking-widest">Shop the Look</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── STORE LOCATOR ─── */}
        <section className="relative h-[400px] md:h-[500px] overflow-hidden group">
          <Image src="https://picsum.photos/1600/500?random=975" alt="Store" fill className="object-cover group-hover:scale-[1.02] transition-transform duration-[3000ms]" />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="text-center text-white max-w-lg px-6">
              <MapPin className="w-10 h-10 mx-auto mb-6" strokeWidth={1.5} />
              <h2 className="text-[32px] md:text-[40px] font-black italic uppercase tracking-tighter mb-4">Find a Store</h2>
              <p className="text-gray-300 font-bold text-[14px] mb-8">Visit one of our stores to try on your favorite frames in person</p>
              <button className="bg-white text-[#111] px-10 py-4 font-black uppercase text-[13px] tracking-widest hover:bg-[#e60000] hover:text-white transition-all">Store Locator</button>
            </div>
          </div>
        </section>

      </main>

      {/* ─── PRE-FOOTER BENEFITS ─── */}
      <div className="bg-[#111] border-y border-gray-800 text-white flex flex-col md:flex-row justify-between">
        <div className="flex-1 p-10 flex flex-col items-center text-center border-b md:border-b-0 md:border-r border-gray-800 hover:bg-[#1a1a1a] transition-colors cursor-pointer">
          <span className="font-black italic text-[24px] tracking-widest mb-2">FREE SHIPPING</span>
          <span className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">On all orders</span>
        </div>
        <div className="flex-1 p-10 flex flex-col items-center text-center border-b md:border-b-0 md:border-r border-gray-800 hover:bg-[#1a1a1a] transition-colors cursor-pointer">
          <span className="font-black italic text-[24px] tracking-widest mb-2">FREE RETURNS</span>
          <span className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">Within 30 days</span>
        </div>
        <div className="flex-1 p-10 flex flex-col items-center text-center hover:bg-[#1a1a1a] transition-colors cursor-pointer">
          <span className="font-black italic text-[24px] tracking-widest mb-2">RESPONSIBLE</span>
          <span className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">Discover our efforts</span>
        </div>
      </div>

      {/* ─── FOOTER ─── */}
      <footer className="bg-[#111] text-white pt-24 pb-12">
        <div className="w-full max-w-[1600px] mx-auto px-6">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">

            <div className="flex flex-col space-y-6">
              <h4 className="font-black uppercase tracking-widest text-[16px] mb-2 text-white border-b-2 border-[#e60000] pb-2 inline-block w-max">Shop</h4>
              <div className="flex flex-col space-y-4 text-[13px] font-bold uppercase tracking-widest text-gray-400">
                <a href="#" className="hover:text-white transition-colors">Women's Sunglasses</a>
                <a href="#" className="hover:text-white transition-colors">Men's Sunglasses</a>
                <a href="#" className="hover:text-white transition-colors">Eyeglasses</a>
                <a href="#" className="hover:text-[#e60000] transition-colors">Customize</a>
                <a href="#" className="hover:text-white transition-colors">Gift Cards</a>
              </div>
            </div>

            <div className="flex flex-col space-y-6">
              <h4 className="font-black uppercase tracking-widest text-[16px] mb-2 text-white border-b-2 border-[#e60000] pb-2 inline-block w-max">Support</h4>
              <div className="flex flex-col space-y-4 text-[13px] font-bold uppercase tracking-widest text-gray-400">
                <a href="#" className="hover:text-white transition-colors">Track Order</a>
                <a href="#" className="hover:text-white transition-colors">Check Gift Card Balance</a>
                <a href="#" className="hover:text-white transition-colors">Return Policy</a>
                <a href="#" className="hover:text-white transition-colors">Warranty</a>
                <a href="#" className="hover:text-white transition-colors">Contact Us</a>
              </div>
            </div>

            <div className="flex flex-col space-y-6">
              <h4 className="font-black uppercase tracking-widest text-[16px] mb-2 text-white border-b-2 border-[#e60000] pb-2 inline-block w-max">About Us</h4>
              <div className="flex flex-col space-y-4 text-[13px] font-bold uppercase tracking-widest text-gray-400">
                <a href="#" className="hover:text-white transition-colors">Corporate Info</a>
                <a href="#" className="hover:text-white transition-colors">Store Locator</a>
                <a href="#" className="hover:text-white transition-colors">Careers</a>
                <a href="#" className="hover:text-white transition-colors">Sustainability</a>
              </div>
            </div>

            <div className="flex flex-col space-y-6">
              <h4 className="font-black uppercase tracking-widest text-[16px] mb-2 text-white border-b-2 border-[#e60000] pb-2 inline-block w-max">Join The Club</h4>
              <p className="text-[13px] font-bold text-gray-400 leading-relaxed uppercase tracking-wider">Sign up to receive updates on new products and special promotions.</p>
              <form className="mt-2 flex w-full">
                <input type="email" placeholder="YOUR EMAIL" className="bg-transparent border border-gray-600 text-white px-4 py-3 outline-none flex-1 font-bold text-[12px] tracking-widest focus:border-white transition-colors" />
                <button type="button" className="bg-white text-[#111] px-6 py-3 font-black uppercase tracking-widest text-[12px] hover:bg-[#e60000] hover:text-white transition-colors shrink-0">
                  Sign Up
                </button>
              </form>
            </div>

          </div>

          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between text-[11px] font-bold uppercase tracking-widest text-gray-500 space-y-6 md:space-y-0">
            <div className="flex flex-wrap justify-center gap-6">
              <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">AdChoices</a>
              <a href="#" className="hover:text-white transition-colors">DO NOT SELL MY INFO</a>
            </div>
            <span>© 2026 Luxottica Group S.p.A. All rights reserved.</span>
          </div>

        </div>
      </footer>
    </div>
  );
}

