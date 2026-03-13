'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { StoreData } from '@/lib/types';
import { Search, ShoppingBag, Heart, User, Menu, Sparkles, ArrowRight, GraduationCap, Smartphone, Facebook, Twitter, Instagram, Youtube, PlayCircle, Star, Zap, X } from 'lucide-react';
import { usePagination, ProductPagination } from './shared/Pagination';

export default function PinkGlamTemplate({ data }: { data: StoreData }) {
  const pltPink = "#f4a2b6"; // Signature PinkGlam Pink
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
    <div className="min-h-full bg-white font-sans text-[#000] selection:bg-[#f4a2b6] selection:text-white pb-0 overflow-x-hidden">

      {/* ─── URGENCY BANNER ─── */}
      <div className="bg-[#f4a2b6] text-black text-[13px] py-2.5 px-4 flex justify-center items-center font-black uppercase tracking-tighter shadow-sm border-b border-black/10">
        <Sparkles className="w-4 h-4 mr-2" fill="black" />
        <span>50% OFF EVERYTHING + EXTRA 10% OFF APP!</span>
        <Sparkles className="w-4 h-4 ml-2" fill="black" />
      </div>

      <div className="bg-black text-white text-[11px] font-bold uppercase tracking-widest py-1.5 px-6 flex justify-center items-center">
        FREE SHIPPING ON ORDERS OVER $50
      </div>

      {/* ─── HEADER ─── */}
      <header className="bg-white sticky top-0 z-50 border-b-2 border-gray-100 shadow-sm transition-all h-[70px] md:h-[80px]">
        <div className="w-full mx-auto px-4 md:px-8 h-full flex items-center justify-between">

          <div className="flex items-center">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 mr-2 hover:text-[#f4a2b6] transition-colors"
            >
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>

            <div className="flex items-center cursor-pointer mr-6 lg:mr-10">
              <span className="font-black text-[22px] md:text-[28px] tracking-tighter uppercase leading-none text-black flex items-center">
                PINKGLAM
              </span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex space-x-6 xl:space-x-8 font-black text-[14px] uppercase tracking-tighter text-black mt-1">
              <a href="#" className="hover:text-[#f4a2b6] border-b-[3px] border-transparent hover:border-[#f4a2b6] pb-1 transition-all">New In</a>
              <a href="#" className="hover:text-[#f4a2b6] border-b-[3px] border-transparent hover:border-[#f4a2b6] pb-1 transition-all">Clothing</a>
              <a href="#" className="hover:text-[#f4a2b6] border-b-[3px] border-transparent hover:border-[#f4a2b6] pb-1 transition-all">Dresses</a>
              <a href="#" className="hover:text-[#f4a2b6] border-b-[3px] border-transparent hover:border-[#f4a2b6] pb-1 transition-all">Shoes</a>
              <a href="#" className="hover:text-[#f4a2b6] border-b-[3px] border-transparent hover:border-[#f4a2b6] pb-1 transition-all">Beauty</a>
              <a href="#" className="text-red-500 flex items-center border-b-[3px] border-transparent hover:border-red-500 pb-1 transition-all"><Zap className="w-4 h-4 mr-1 fill-red-500" /> Sale</a>
            </nav>
          </div>

          <div className="flex items-center space-x-5 lg:space-x-6 text-black">
            <div className="hidden xl:flex items-center bg-[#f8f8f8] rounded-full px-4 py-2.5 w-64 border border-transparent focus-within:border-[#f4a2b6] transition-colors">
              <input type="text" placeholder="Search..." className="bg-transparent outline-none text-[13px] w-full font-bold uppercase placeholder-gray-500" />
              <Search className="w-4 h-4 text-gray-800" />
            </div>
            <Search className="w-6 h-6 xl:hidden cursor-pointer hover:text-[#f4a2b6] transition-colors" />
            <User className="hidden md:block w-7 h-7 cursor-pointer hover:text-[#f4a2b6] transition-colors" />
            <div 
              onClick={() => toggleFavorite('header')}
              className="relative cursor-pointer hover:text-[#f4a2b6] transition-colors hidden md:block"
            >
              <Heart className={`w-7 h-7 ${favorites.length > 0 ? 'fill-red-500 text-red-500' : ''}`} />
              {favorites.length > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[11px] font-black px-1.5 rounded-full min-w-[18px] text-center shadow-sm">{favorites.length}</span>
              )}
            </div>
            <div 
              onClick={addToCart}
              className="relative cursor-pointer hover:text-[#f4a2b6] transition-colors"
            >
              <ShoppingBag className="w-7 h-7" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-black group-hover:bg-[#f4a2b6] transition-colors text-white text-[11px] font-black px-1.5 rounded-full min-w-[20px] text-center shadow-sm">{cartCount}</span>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="w-full">

        {/* ─── HERO BANNER ─── */}
        <section className="relative w-full h-[550px] md:h-[680px] flex justify-center items-center overflow-hidden bg-[#ffd1dc] mb-12">
          <Image
            src={data.bannerImage}
            alt="Hero Banner"
            fill
            className="object-cover object-center opacity-90 scale-105"
            priority
            referrerPolicy="no-referrer"
          />
          {/* A soft pink gradient overlay typical of PinkGlam */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#f4a2b6]/60 via-[#f4a2b6]/20 to-transparent"></div>

          <div className="absolute inset-0 flex flex-col items-start justify-center text-black px-8 md:px-16 lg:px-24 max-w-[1600px] mx-auto w-full">
            <div className="bg-white/90 backdrop-blur-md p-8 md:p-12 rounded-[30px] shadow-[0_20px_50px_rgba(244,162,182,0.3)] max-w-xl border-4 border-white">
              <div className="inline-flex items-center bg-black text-white text-[12px] font-black px-4 py-1.5 uppercase tracking-widest mb-6 rounded-full">
                <Sparkles className="w-4 h-4 mr-2 text-[#f4a2b6]" /> The Latest
              </div>
              <h1 className="text-[48px] md:text-[64px] font-black uppercase tracking-tighter mb-4 leading-[0.9] text-black drop-shadow-sm">
                {data.name}
              </h1>
              <p className="text-[18px] md:text-[22px] font-bold text-gray-800 mb-8 leading-tight uppercase">
                {data.description || 'Your new season wardrobe starts here. Get the look.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-[#f4a2b6] text-black px-10 py-4 rounded-full font-black uppercase tracking-widest text-[14px] hover:bg-black hover:text-white transition-all shadow-lg text-center">
                  Shop The Drop
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ─── NEW IN GRID ─── */}
        <section className="px-4 md:px-8 max-w-[1600px] mx-auto mb-20 md:mb-24">
          <div className="flex items-end justify-between mb-8 border-b-2 border-[#f4a2b6]/30 pb-4">
            <h2 className="text-[36px] md:text-[48px] font-black uppercase tracking-tighter text-black leading-none flex items-center">
              Trending Now <Sparkles className="w-8 h-8 ml-3 text-[#f4a2b6]" />
            </h2>
            <a href="#" className="hidden md:flex text-[14px] font-black uppercase tracking-widest text-black hover:text-[#f4a2b6] transition-colors items-center border-b-[3px] border-black pb-0.5 hover:border-[#f4a2b6]">
              See All
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6">
            {paginatedItems.map((product: any, idx: number) => (
              <div key={product.id || idx} data-product-id={product.id} className="group cursor-pointer flex flex-col bg-white">
                <div className="relative aspect-[3/4] mb-3 bg-[#f9f9f9] overflow-hidden rounded-[24px]">
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-white text-black text-[11px] font-black px-3 py-1.5 uppercase shadow-sm rounded-full">
                    NEW
                  </div>
                  {idx === 1 && (
                    <div className="absolute top-3 right-3 bg-[#f4a2b6] text-white text-[11px] font-black px-3 py-1.5 uppercase shadow-sm rounded-full">
                      Hot
                    </div>
                  )}
                  {/* Quick Add Overlay */}
                  <button 
                    onClick={(e) => { e.stopPropagation(); addToCart(); }}
                    className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md py-3 rounded-full text-center text-[12px] font-black uppercase tracking-widest translate-y-[150%] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black hover:text-[#f4a2b6] shadow-xl"
                  >
                    Add to Bag
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }}
                    className="absolute top-3 right-3 bg-white/80 rounded-full p-2.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:text-[#f4a2b6] hidden group-hover:block md:group-hover:hidden"
                  >
                    <Heart className={`w-4 h-4 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : ''}`} strokeWidth={2.5} />
                  </button>
                </div>
                <div className="flex flex-col flex-1 px-1">
                  <h3 className="text-[13px] md:text-[14px] font-bold uppercase text-gray-800 line-clamp-2 leading-tight mb-1 group-hover:text-[#f4a2b6] transition-colors">
                    {product.title}
                  </h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-[18px] md:text-[20px] font-black text-black">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-[13px] font-bold text-[#f4a2b6] line-through">
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
              className="bg-[#f4a2b6] text-white px-10 py-4 font-black uppercase tracking-widest text-[14px] w-full rounded-full shadow-md"
            >
              View All
            </button>
          </div>
        </section>

        {/* ─── SHOP BY CATEGORY ─── */}
        <section className="px-4 md:px-8 max-w-[1600px] mx-auto mb-20 md:mb-24">
          <h2 className="text-[36px] md:text-[48px] font-black uppercase tracking-tighter text-black leading-none mb-8 text-center border-b-2 border-black/5 pb-6">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { name: 'Dresses', img: 'https://picsum.photos/400/500?random=510' },
              { name: 'Tops', img: 'https://picsum.photos/400/500?random=511' },
              { name: 'Shoes', img: 'https://picsum.photos/400/500?random=512' },
              { name: 'Accessories', img: 'https://picsum.photos/400/500?random=513' },
            ].map((category, i) => (
              <div key={i} className="group cursor-pointer relative aspect-[3/4] overflow-hidden rounded-[30px] bg-[#fdfdfd] shadow-sm hover:shadow-xl transition-shadow">
                <Image src={category.img} alt={category.name} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors"></div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <h3 className="text-white font-black uppercase text-[28px] md:text-[36px] tracking-tighter drop-shadow-md group-hover:scale-110 transition-transform bg-black/30 backdrop-blur-sm px-6 py-2 rounded-full border border-white/20">
                    {category.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── THE PinkGlam EDIT ─── */}
        <section className="px-4 md:px-8 max-w-[1600px] mx-auto mb-20 md:mb-24">
          <div className="bg-[#fdf0f3] rounded-[40px] p-8 md:p-16 flex flex-col md:flex-row items-center justify-between border-4 border-white shadow-[0_20px_50px_rgba(244,162,182,0.15)] relative overflow-hidden">
            {/* Decorative background accent */}
            <div className="absolute -left-20 -top-20 w-64 h-64 bg-[#f4a2b6] rounded-full blur-[80px] opacity-40"></div>

            <div className="w-full md:w-1/2 mb-10 md:mb-0 md:pr-16 relative z-10 text-center md:text-left">
              <div className="inline-block bg-white text-[#f4a2b6] text-[12px] font-black px-4 py-1.5 uppercase tracking-[0.3em] mb-4 rounded-full shadow-sm">
                The Edit
              </div>
              <h3 className="text-[40px] md:text-[60px] font-black uppercase tracking-tighter mb-6 leading-[0.9] text-black drop-shadow-sm">
                Festival Season Is Here
              </h3>
              <p className="text-[18px] font-bold text-gray-700 mb-8 leading-relaxed max-w-lg mx-auto md:mx-0">
                Get ready to rave in our latest collection of festival-ready fits. From sequin sets to statement boots, we've got your main stage look sorted.
              </p>
              <button className="bg-black text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-[14px] hover:bg-[#f4a2b6] hover:text-black transition-all shadow-lg mx-auto md:mx-0 block w-fit">
                Shop The Edit
              </button>
            </div>
            <div className="w-full md:w-1/2 relative aspect-[4/3] rounded-[30px] overflow-hidden shadow-2xl group cursor-pointer">
              <Image src="https://picsum.photos/800/600?random=520" alt="The Edit" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/10 flex items-center justify-center group-hover:bg-[#f4a2b6]/30 transition-colors">
                <PlayCircle className="w-20 h-20 text-white opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all drop-shadow-lg" />
              </div>
            </div>
          </div>
        </section>

        {/* ─── STUDENT DISCOUNT ─── */}
        <section className="px-4 md:px-8 max-w-[1600px] mx-auto mb-20 md:mb-24">
          <div className="bg-black text-white rounded-[40px] p-10 md:p-20 flex flex-col md:flex-row items-center justify-between relative overflow-hidden shadow-2xl">
            <div className="absolute left-0 top-0 bottom-0 w-1/2 bg-[url('https://picsum.photos/800/800?random=525')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
            <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-[#f4a2b6] rounded-full blur-[100px] opacity-30"></div>

            <div className="w-full md:w-1/2 relative z-10 md:ml-auto md:pl-16 text-center md:text-left">
              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start mb-6 gap-3">
                <div className="bg-[#f4a2b6] p-3 rounded-full"><GraduationCap className="w-8 h-8 text-black" /></div>
                <h2 className="text-[40px] font-black uppercase tracking-tighter text-[#f4a2b6] leading-none">Student Beans</h2>
              </div>
              <h3 className="text-[36px] md:text-[50px] font-black uppercase tracking-tight mb-6 leading-none">
                Get 20% Off <br className="hidden md:block" />All Year Round!
              </h3>
              <p className="text-[18px] font-bold text-gray-300 mb-8 leading-relaxed max-w-md mx-auto md:mx-0">
                Verify your student status with Student Beans to get your exclusive discount code. Looking good shouldn't break the bank.
              </p>
              <button className="bg-[#f4a2b6] text-black px-12 py-4 rounded-full font-black uppercase tracking-widest text-[15px] hover:bg-white transition-all shadow-lg mx-auto md:mx-0 block w-fit">
                Get Discount
              </button>
            </div>
          </div>
        </section>

        {/* ─── APP PROMO ─── */}
        <section className="px-4 md:px-8 max-w-[1600px] mx-auto mb-20 md:mb-24">
          <div className="border-4 border-[#f4a2b6] rounded-[40px] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between bg-white relative overflow-hidden shadow-xl">
            <div className="absolute top-0 left-0 w-full h-full bg-[#f4a2b6]/5"></div>

            <div className="w-full md:w-1/2 mb-10 md:mb-0 md:pr-16 relative z-10 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start mb-6">
                <Smartphone className="w-10 h-10 text-black mr-3" />
                <h2 className="text-[36px] md:text-[46px] font-black uppercase tracking-tighter text-black leading-none">Download The App</h2>
              </div>
              <h3 className="text-[24px] md:text-[32px] font-black uppercase tracking-tight mb-4 text-[#f4a2b6] leading-none">
                Get an extra 10% off your first app order!
              </h3>
              <p className="text-[18px] font-bold text-gray-600 mb-8 leading-relaxed max-w-md mx-auto md:mx-0">
                Shop the latest trends, get exclusive app-only discounts, and checkout in seconds.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button className="bg-black text-white px-8 py-4 rounded-full font-black uppercase tracking-widest text-[13px] hover:bg-[#f4a2b6] hover:text-black transition-all shadow-md">
                  App Store
                </button>
                <button className="bg-transparent border-2 border-black text-black px-8 py-4 rounded-full font-black uppercase tracking-widest text-[13px] hover:bg-black hover:text-white transition-all shadow-md">
                  Google Play
                </button>
              </div>
            </div>
            <div className="w-full md:w-1/2 flex justify-center relative z-10">
              <div className="relative border-8 border-black rounded-[40px] p-2 bg-white shadow-2xl transform rotate-6">
                <div className="aspect-[9/19] w-[180px] md:w-[220px] bg-red-100 rounded-[28px] overflow-hidden relative">
                  <Image src="https://picsum.photos/400/800?random=530" alt="App Preview" fill className="object-cover" />
                  <div className="absolute top-0 left-0 w-full bg-black/80 text-white text-[10px] text-center py-1 font-bold">PinkGlam APP</div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* ─── FOOTER ─── */}
      <footer className="bg-[#f9f9f9] pt-24 pb-12 border-t border-gray-200">
        <div className="w-full mx-auto px-6 md:px-12">

          <div className="font-black text-[40px] md:text-[70px] lg:text-[110px] tracking-tighter uppercase mb-20 text-center text-black/5 leading-none select-none">
            PINKGLAM
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20 text-[13px] font-bold uppercase tracking-widest text-gray-500">

            <div className="flex flex-col space-y-4">
              <h4 className="text-black mb-3 text-[15px] font-black border-l-4 border-[#f4a2b6] pl-3">Help & Information</h4>
              <a href="#" className="hover:text-[#f4a2b6] transition-colors">Help Center</a>
              <a href="#" className="hover:text-[#f4a2b6] transition-colors">Track Order</a>
              <a href="#" className="hover:text-[#f4a2b6] transition-colors">Delivery Information</a>
              <a href="#" className="hover:text-[#f4a2b6] transition-colors">Returns Policy</a>
              <a href="#" className="hover:text-[#f4a2b6] transition-colors">Size Guide</a>
            </div>

            <div className="flex flex-col space-y-4">
              <h4 className="text-black mb-3 text-[15px] font-black border-l-4 border-[#f4a2b6] pl-3">About Us</h4>
              <a href="#" className="hover:text-[#f4a2b6] transition-colors">About PinkGlam</a>
              <a href="#" className="hover:text-[#f4a2b6] transition-colors">Careers</a>
              <a href="#" className="hover:text-[#f4a2b6] transition-colors">Students</a>
              <a href="#" className="hover:text-[#f4a2b6] transition-colors">Essential Worker Discount</a>
              <a href="#" className="hover:text-[#f4a2b6] transition-colors">Become An Affiliate</a>
            </div>

            <div className="flex flex-col space-y-4">
              <h4 className="text-black mb-3 text-[15px] font-black border-l-4 border-[#f4a2b6] pl-3">Legal</h4>
              <a href="#" className="hover:text-[#f4a2b6] transition-colors">Terms & Conditions</a>
              <a href="#" className="hover:text-[#f4a2b6] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#f4a2b6] transition-colors">Environment, Social & Governance</a>
              <a href="#" className="hover:text-[#f4a2b6] transition-colors">BCI Membership</a>
            </div>

            <div className="flex flex-col space-y-4">
              <h4 className="text-black mb-3 text-[15px] font-black">Sign Up For Emails</h4>
              <p className="normal-case tracking-normal font-medium text-[14px] mb-4 text-gray-600">Get exclusive offers and news straight to your inbox.</p>
              <form className="flex shadow-md rounded-full overflow-hidden">
                <input type="email" placeholder="Email Address" className="bg-white text-black px-6 py-4 outline-none w-full font-bold text-[14px] placeholder-gray-400" />
                <button type="button" className="bg-black text-white px-8 py-4 font-black uppercase hover:bg-[#f4a2b6] hover:text-black transition-colors shrink-0">
                  Subscribe
                </button>
              </form>
              <div className="pt-6 flex space-x-4">
                <a href="#" className="bg-white p-3 rounded-full text-black hover:bg-[#f4a2b6] hover:text-white transition-colors shadow-sm"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="bg-white p-3 rounded-full text-black hover:bg-[#f4a2b6] hover:text-white transition-colors shadow-sm"><Facebook className="w-5 h-5" /></a>
                <a href="#" className="bg-white p-3 rounded-full text-black hover:bg-[#f4a2b6] hover:text-white transition-colors shadow-sm"><Twitter className="w-5 h-5" /></a>
                <a href="#" className="bg-white p-3 rounded-full text-black hover:bg-[#f4a2b6] hover:text-white transition-colors shadow-sm"><Youtube className="w-5 h-5" /></a>
              </div>
            </div>

          </div>

          <div className="pt-8 border-t border-gray-300 flex flex-col md:flex-row items-center justify-between text-[11px] font-black uppercase tracking-widest text-gray-500 space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6">
              <span className="text-black text-[20px] tracking-tighter leading-none">PinkGlam</span>
              <span>© 2026 PINKGLAM. ALL RIGHTS RESERVED.</span>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              <a href="#" className="hover:text-[#f4a2b6] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#f4a2b6] transition-colors">Terms of Use</a>
              <a href="#" className="hover:text-[#f4a2b6] transition-colors">Cookie Policy</a>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
