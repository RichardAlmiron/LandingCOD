'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { StoreData } from '@/lib/types';
import { Search, ShoppingBag, Heart, User, Menu, Leaf, Mountain, ArrowRight, Recycle, Globe, BookOpen, Facebook, Twitter, Instagram, Youtube, X, HelpCircle, ChevronRight, PlayCircle } from 'lucide-react';
import { usePagination, ProductPagination } from './shared/Pagination';

export default function EcoOutdoorTemplate({ data }: { data: StoreData }) {
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
    <div className="min-h-full bg-[#f6f6f6] font-sans text-[#1a1a1a] selection:bg-[#1a1a1a] selection:text-white pb-0 overflow-x-hidden">

      {/* ─── PROMO BAR ─── */}
      <div className="bg-[#1a1a1a] text-white text-[11px] md:text-[12px] py-2 px-6 flex justify-center items-center font-bold tracking-[0.05em] uppercase w-full z-50 relative">
        <Leaf className="w-3.5 h-3.5 mr-2" />
        <span className="text-center">Free Shipping on Orders Over $99 <span className="hidden sm:inline">| Earth Is Now Our Only Shareholder</span></span>
      </div>

      {/* ─── GLOBAL HEADER ─── */}
      <header className="bg-white sticky top-0 z-40 border-b border-gray-200 shadow-sm transition-all h-[70px]">
        <div className="w-full mx-auto px-4 md:px-8 h-full flex items-center justify-between">

          <div className="flex items-center">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 mr-2 hover:opacity-70 transition-opacity"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <div className="flex items-center cursor-pointer">
              {/* EcoOutdoor Logo styling */}
              <div className="flex flex-col items-center justify-center leading-none">
                <span className="font-black text-[28px] md:text-[32px] tracking-tighter text-[#1a1a1a] flex items-center mb-0 pb-0">
                  EcoOutdoor
                </span>
                <div className="w-full h-[3px] bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 mt-0.5"></div>
              </div>
            </div>
          </div>

          <nav className="hidden lg:flex space-x-8 font-bold text-[13px] uppercase tracking-[0.05em] text-[#1a1a1a]">
            <a href="#" className="hover:underline underline-offset-8 transition-all px-2">Shop</a>
            <a href="#" className="hover:underline underline-offset-8 transition-all px-2">Activism</a>
            <a href="#" className="hover:underline underline-offset-8 transition-all px-2">Sports</a>
            <a href="#" className="hover:underline underline-offset-8 transition-all px-2">Stories</a>
            <a href="#" className="hover:underline underline-offset-8 transition-all px-2 text-orange-700">Worn Wear</a>
          </nav>

          <div className="flex items-center space-x-6 text-[#1a1a1a]">
            <Search className="w-5 h-5 cursor-pointer hover:opacity-70 transition-opacity" />
            <div className="hidden md:flex items-center cursor-pointer hover:opacity-70 transition-opacity">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div className="hidden md:flex items-center cursor-pointer hover:opacity-70 transition-opacity">
              <User className="w-5 h-5" />
            </div>
            <div 
              onClick={() => toggleFavorite('header')}
              className="hidden md:flex relative cursor-pointer hover:opacity-70 transition-opacity"
            >
              <Heart className={`w-5 h-5 ${favorites.length > 0 ? 'fill-red-500 text-red-500' : ''}`} />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[9px] font-bold px-1 rounded-full min-w-[16px] text-center">{favorites.length}</span>
              )}
            </div>
            <div 
              onClick={addToCart}
              className="relative cursor-pointer hover:opacity-70 transition-opacity"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-[#1a1a1a] text-white text-[10px] font-bold px-1.5 rounded-full min-w-[16px] text-center border-2 border-white">{cartCount}</span>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="w-full">

        {/* ─── HERO SECTION ─── */}
        <section className="relative w-full h-[600px] md:h-[800px] mb-12 flex flex-col justify-end bg-black">
          <Image
            src={data.bannerImage}
            alt="Hero Banner"
            fill
            className="object-cover object-center opacity-80"
            priority
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

          <div className="relative z-10 px-6 md:px-16 pb-16 md:pb-24 max-w-4xl text-white">
            <div className="bg-[#cc5500] text-white text-[11px] font-black px-3 py-1.5 uppercase tracking-widest w-fit mb-6">New Collection</div>
            <h1 className="text-[48px] md:text-[80px] font-black uppercase tracking-tighter leading-[0.9] mb-6 drop-shadow-xl">{data.name}</h1>
            <p className="text-[18px] md:text-[24px] font-medium mb-10 max-w-2xl text-gray-100 drop-shadow-md leading-snug">{data.description || 'Gear designed for the wildest places on Earth, built to last a lifetime.'}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-black px-8 py-4 font-black uppercase tracking-widest text-[13px] hover:bg-gray-200 transition-colors shadow-lg active:scale-95 text-center">
                Shop Men's
              </button>
              <button className="bg-white text-black px-8 py-4 font-black uppercase tracking-widest text-[13px] hover:bg-gray-200 transition-colors shadow-lg active:scale-95 text-center">
                Shop Women's
              </button>
            </div>
          </div>
        </section>

        {/* ─── PRODUCT GRID (Paginated) ─── */}
        <section className="px-4 md:px-8 max-w-[1600px] mx-auto mb-20">
          <div className="flex flex-col md:flex-row items-baseline justify-between mb-10 border-b border-gray-300 pb-4">
            <h2 className="text-[32px] md:text-[40px] font-black uppercase tracking-tighter text-[#1a1a1a]">Built For The Elements ({totalItems})</h2>
            <a href="#" className="text-[14px] font-bold uppercase tracking-widest text-[#1a1a1a] hover:underline underline-offset-8 mt-4 md:mt-0 flex items-center">
              Shop All <ChevronRight className="w-4 h-4 ml-1" />
            </a>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 md:gap-4">
            {paginatedItems.map((product, idx) => (
              <div key={product.id || idx} data-product-id={product.id} className="group cursor-pointer flex flex-col bg-white p-3">
                <div className="relative aspect-[3/4] mb-3 bg-gray-100 overflow-hidden">
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    fill
                    className="object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-[800ms] ease-out"
                    referrerPolicy="no-referrer"
                  />
                  {idx % 3 === 0 && (
                    <div className="absolute top-2 left-2 bg-[#e4dac6] text-[#4b3e2b] text-[9px] font-black px-1.5 py-0.5 uppercase tracking-widest shadow-sm">
                      Recycled
                    </div>
                  )}
                  {idx % 5 === 0 && (
                    <div className="absolute top-2 left-2 bg-[#a2b399] text-[#2c3d22] text-[9px] font-black px-1.5 py-0.5 uppercase tracking-widest shadow-sm">
                      Fair Trade
                    </div>
                  )}
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }}
                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Heart className={`w-4 h-4 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : ''}`} strokeWidth={1.5} />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); addToCart(); }}
                    className="absolute bottom-2 left-2 right-2 bg-[#1a1a1a] text-white py-2 text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-col flex-1 text-center items-center px-1">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-blue-900 border border-gray-300"></div>
                    <div className="w-3 h-3 rounded-full bg-gray-800 border border-gray-300"></div>
                    <div className="w-3 h-3 rounded-full bg-orange-700 border border-gray-300"></div>
                  </div>
                  <h3 className="text-[13px] font-bold text-[#1a1a1a] line-clamp-2 leading-tight mt-2 group-hover:underline underline-offset-2">
                    {product.title}
                  </h3>
                  <div className="text-[14px] font-normal text-gray-700 mt-1">
                    ${product.price}
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
        </section>

        {/* ─── ACTIVISM PROMO (EARTH FUND) ─── */}
        <section className="w-full bg-[#3d4b3c] text-[#f4f1ea] py-16 md:py-24 px-4 border-y border-gray-800">
          <div className="max-w-[1200px] mx-auto flex flex-col items-center text-center">
            <Globe className="w-16 h-16 md:w-20 md:h-20 text-[#a2b399] mb-8" strokeWidth={1} />
            <h2 className="text-[40px] md:text-[64px] font-black uppercase tracking-tighter leading-none mb-6">Earth is now our <br className="hidden md:block" />only shareholder.</h2>
            <p className="text-[18px] md:text-[22px] font-normal max-w-3xl leading-relaxed text-gray-300 mb-10">
              If we have any hope of a thriving planet—much less a thriving business—it is going to take all of us doing what we can with the resources we have. This is what we can do.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <button className="border-2 border-[#a2b399] text-[#a2b399] px-10 py-4 font-black uppercase tracking-widest text-[13px] hover:bg-[#a2b399] hover:text-[#1a1a1a] transition-colors">
                Read the letter
              </button>
              <button className="bg-[#a2b399] text-[#1a1a1a] px-10 py-4 font-black uppercase tracking-widest text-[13px] hover:bg-white transition-colors">
                Take Action Now
              </button>
            </div>
          </div>
        </section>

        {/* ─── WORN WEAR SECTION ─── */}
        <section className="flex flex-col lg:flex-row w-full bg-white border-b border-gray-200">
          <div className="w-full lg:w-1/2 relative h-[400px] lg:h-auto min-h-[500px]">
            <Image src="https://picsum.photos/1000/1000?random=320" alt="Worn Wear" fill className="object-cover" />
          </div>
          <div className="w-full lg:w-1/2 flex flex-col justify-center p-10 md:p-20 bg-[#e4dac6]">
            <div className="flex items-center gap-3 mb-6">
              <Recycle className="w-10 h-10 text-orange-800" />
              <span className="font-black text-[32px] tracking-tighter uppercase text-orange-950">Worn Wear</span>
            </div>
            <h2 className="text-[36px] md:text-[48px] font-black uppercase tracking-tighter leading-tight text-[#1a1a1a] mb-6">Better than new</h2>
            <p className="text-[18px] text-gray-800 font-medium mb-10 leading-relaxed max-w-lg">
              Buying used extends a garment's life by about two years, which cuts its combined carbon, waste and water footprint by 82%. Trade in your gear, buy used, or get it repaired.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-[#1a1a1a] text-white px-8 py-3.5 font-black uppercase tracking-widest text-[12px] hover:bg-gray-800 transition-colors w-fit">
                Shop Used
              </button>
              <button className="border-2 border-[#1a1a1a] text-[#1a1a1a] px-8 py-3.5 font-black uppercase tracking-widest text-[12px] hover:bg-[#1a1a1a] hover:text-white transition-colors w-fit">
                Trade in gear
              </button>
            </div>
          </div>
        </section>

        {/* ─── STORIES & FILMS ─── */}
        <section className="px-4 md:px-8 max-w-[1600px] mx-auto py-20 pb-24">
          <div className="flex flex-col md:flex-row items-baseline justify-between mb-10 border-b border-gray-300 pb-4">
            <h2 className="text-[32px] md:text-[40px] font-black uppercase tracking-tighter text-[#1a1a1a] flex items-center">
              <BookOpen className="w-8 h-8 mr-3" /> Stories & Films
            </h2>
            <a href="#" className="text-[14px] font-bold uppercase tracking-widest text-[#1a1a1a] hover:underline underline-offset-8 mt-4 md:mt-0 flex items-center">
              Read All <ChevronRight className="w-4 h-4 ml-1" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group cursor-pointer flex flex-col">
              <div className="relative aspect-[16/10] overflow-hidden mb-6 bg-gray-100">
                <Image src="https://picsum.photos/800/500?random=321" alt="" fill className="object-cover group-hover:scale-105 transition-transform duration-[1200ms] ease-out" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <PlayCircle className="w-16 h-16 text-white opacity-80 group-hover:opacity-100 transition-opacity drop-shadow-lg" strokeWidth={1} />
                </div>
              </div>
              <div className="text-[11px] font-black uppercase tracking-widest text-orange-800 mb-3">Film</div>
              <h3 className="text-[24px] font-black uppercase tracking-tighter text-[#1a1a1a] leading-tight mb-3 group-hover:underline underline-offset-4">The Arctic Refuge</h3>
              <p className="text-[15px] text-gray-700 font-medium">The fight to protect America's wildest landscape from oil drilling.</p>
            </div>

            <div className="group cursor-pointer flex flex-col">
              <div className="relative aspect-[16/10] overflow-hidden mb-6 bg-gray-100">
                <Image src="https://picsum.photos/800/500?random=322" alt="" fill className="object-cover group-hover:scale-105 transition-transform duration-[1200ms] ease-out" />
              </div>
              <div className="text-[11px] font-black uppercase tracking-widest text-blue-800 mb-3">Activism</div>
              <h3 className="text-[24px] font-black uppercase tracking-tighter text-[#1a1a1a] leading-tight mb-3 group-hover:underline underline-offset-4">Vote Climate</h3>
              <p className="text-[15px] text-gray-700 font-medium">Elections matter. Vote for leaders who will take decisive climate action.</p>
            </div>

            <div className="group cursor-pointer flex flex-col">
              <div className="relative aspect-[16/10] overflow-hidden mb-6 bg-gray-100">
                <Image src="https://picsum.photos/800/500?random=323" alt="" fill className="object-cover group-hover:scale-105 transition-transform duration-[1200ms] ease-out" />
              </div>
              <div className="text-[11px] font-black uppercase tracking-widest text-green-800 mb-3">Sports</div>
              <h3 className="text-[24px] font-black uppercase tracking-tighter text-[#1a1a1a] leading-tight mb-3 group-hover:underline underline-offset-4">Finding Flow</h3>
              <p className="text-[15px] text-gray-700 font-medium">Mountain biking through the old-growth forests of the Pacific Northwest.</p>
            </div>
          </div>
        </section>

      </main>

      {/* ─── FOOTER ─── */}
      <footer className="bg-[#1a1a1a] text-white pt-20 pb-12 w-full">
        <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12">

          <div className="flex flex-col lg:flex-row justify-between pb-16 border-b border-gray-800 mb-10 gap-16">
            <div className="max-w-xl">
              <h3 className="text-[24px] font-black uppercase tracking-tighter mb-4">Subscribe</h3>
              <p className="text-gray-400 font-medium text-[15px] mb-8 leading-relaxed">
                Sign up for exclusive offers, original stories, activism awareness, events and more.
              </p>
              <form className="flex w-full mb-8">
                <input type="email" placeholder="Email Address" className="bg-transparent border-b-2 border-white text-white px-2 py-3 outline-none flex-1 placeholder-gray-500 font-medium font-sans focus:border-white transition-colors" />
                <button type="button" className="bg-white text-black px-8 py-3 font-black uppercase tracking-widest text-[12px] hover:bg-gray-200 transition-colors ml-4 shrink-0">
                  Sign me up
                </button>
              </form>
              <div className="flex items-center gap-6">
                <a href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook className="w-6 h-6" /></a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter className="w-6 h-6" /></a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram className="w-6 h-6" /></a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors"><Youtube className="w-6 h-6" /></a>
              </div>
            </div>

            <div className="flex gap-12 flex-wrap sm:flex-nowrap">
              <div className="flex flex-col space-y-4">
                <h4 className="text-[13px] font-black tracking-widest uppercase mb-2">Shop</h4>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-[14px]">Men's</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-[14px]">Women's</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-[14px]">Kids' & Baby</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-[14px]">Packs & Gear</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-[14px]">Worn Wear</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-[14px]">Gift Cards</a>
              </div>

              <div className="flex flex-col space-y-4">
                <h4 className="text-[13px] font-black tracking-widest uppercase mb-2">Help</h4>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-[14px]">Help Center</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-[14px]">Ironclad Guarantee</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-[14px]">Returns</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-[14px]">Repairs</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-[14px]">Delivery Details</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-[14px]">Contact Us</a>
              </div>

              <div className="flex flex-col space-y-4">
                <h4 className="text-[13px] font-black tracking-widest uppercase mb-2">About</h4>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-[14px]">Core Values</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-[14px]">Careers</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-[14px]">Press</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-[14px]">1% for the Planet</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-[14px]">Action Works</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-[14px]">Privacy Policy</a>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-baseline md:items-center justify-between gap-6 text-[11px] font-black uppercase tracking-widest text-gray-500">
            <div className="flex items-center gap-6">
              <Globe className="w-5 h-5 text-gray-500" />
              <span>United States / English</span>
            </div>
            <div className="flex flex-wrap gap-4 md:gap-8 justify-center">
              <span>© 2026 EcoOutdoor, Inc. All Rights Reserved.</span>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
              <a href="#" className="hover:text-white transition-colors">Accessibility</a>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
