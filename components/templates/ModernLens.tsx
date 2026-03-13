'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { StoreData } from '@/lib/types';
import { Search, ShoppingCart, Heart, User, MapPin, ChevronRight, ArrowRight, Menu, X } from 'lucide-react';
import { usePagination, ProductPagination } from './shared/Pagination';

export default function ModernLensTemplate({ data }: { data: StoreData }) {
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
    <div className="min-h-full bg-white font-sans text-[#1a1a1a] selection:bg-[#cbe3f5] selection:text-[#1a1a1a] overflow-x-hidden">

      {/* ─── PROMO BAR ─── */}
      <div className="bg-[#f0f6fa] text-[#1a1a1a] text-[13px] py-3 px-6 flex justify-center font-medium tracking-wide border-b border-gray-200">
        <a href="#" className="hover:underline flex items-center transition-all">
          Try 5 frames at home for free—start with a quiz <ChevronRight className="w-4 h-4 ml-1" />
        </a>
      </div>

      {/* ─── HEADER ─── */}
      <header className="bg-white sticky top-0 z-50 border-b border-gray-200 shadow-sm transition-all h-[72px] lg:h-[80px]">
        <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 h-full flex items-center justify-between">

          <div className="flex items-center space-x-6 lg:space-x-10 h-full">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 mr-2 hover:text-[#458ad2] transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Logo */}
            <div className="flex items-center justify-center cursor-pointer shrink-0">
              <span className="font-sans text-[20px] md:text-[24px] font-bold tracking-tight leading-none text-[#1a1a1a] uppercase">
                ModernLens
              </span>
            </div>

            {/* Nav */}
            <nav className="hidden lg:flex h-full font-sans text-[15px] font-medium text-[#1a1a1a]">
              <div className="h-full flex items-center px-4 hover:border-b-4 hover:border-[#1a1a1a] border-b-4 border-transparent cursor-pointer transition-all">
                <a href="#">Eyeglasses</a>
              </div>
              <div className="h-full flex items-center px-4 hover:border-b-4 hover:border-[#1a1a1a] border-b-4 border-transparent cursor-pointer transition-all">
                <a href="#">Sunglasses</a>
              </div>
              <div className="h-full flex items-center px-4 hover:border-b-4 hover:border-[#1a1a1a] border-b-4 border-transparent cursor-pointer transition-all">
                <a href="#">Contacts</a>
              </div>
              <div className="h-full flex items-center px-4 hover:border-b-4 hover:border-[#1a1a1a] border-b-4 border-transparent cursor-pointer transition-all">
                <a href="#">Eye Exams</a>
              </div>
            </nav>
          </div>

          <div className="flex items-center space-x-5 lg:space-x-7 text-[#1a1a1a]">
            <a href="#" className="hidden lg:flex items-center text-[15px] font-medium hover:text-[#458ad2] transition-colors group">
              Locations
            </a>

            <Search className="w-6 h-6 cursor-pointer hover:text-[#458ad2] transition-colors" strokeWidth={1.5} />
            <User className="w-6 h-6 cursor-pointer hover:text-[#458ad2] transition-colors hidden sm:block" strokeWidth={1.5} />
            <div 
              onClick={() => toggleFavorite('header')}
              className="relative cursor-pointer hover:text-[#458ad2] transition-colors hidden sm:block"
            >
              <Heart className={`w-6 h-6 ${favorites.length > 0 ? 'fill-red-500 text-red-500' : ''}`} strokeWidth={1.5} />
              {favorites.length > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[9px] font-bold px-1.5 rounded-full">{favorites.length}</span>
              )}
            </div>
            <div 
              onClick={addToCart}
              className="relative cursor-pointer hover:text-[#458ad2] transition-colors"
            >
              <ShoppingCart className="w-6 h-6" strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[#458ad2] text-white text-[10px] font-bold w-[16px] h-[16px] flex items-center justify-center rounded-full leading-none">{cartCount}</span>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="w-full">

        {/* ─── SPLIT HERO SECTION ─── */}
        <section className="w-full flex flex-col-reverse lg:flex-row bg-[#f6f6f4] min-h-[500px] lg:min-h-[640px]">
          {/* Text Content */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 py-12 lg:px-20 xl:px-32">
            <h1 className="text-[40px] lg:text-[56px] font-serif tracking-tight leading-[1.1] mb-6 text-[#1a1a1a]">
              {data.name}
            </h1>
            <p className="text-[18px] lg:text-[20px] font-medium mb-10 text-gray-700 leading-relaxed max-w-lg">
              {data.description || "Discover new frames that feel like spring. Starting at $95, including prescription lenses."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button className="bg-[#1a1a1a] text-white px-8 py-4 font-bold text-[15px] rounded-full hover:bg-gray-800 transition-all border border-[#1a1a1a] w-full sm:w-auto">
                Shop Eyeglasses
              </button>
              <button className="bg-white text-[#1a1a1a] px-8 py-4 font-bold text-[15px] rounded-full hover:bg-gray-50 transition-all border border-gray-300 w-full sm:w-auto shadow-sm">
                Take the Quiz
              </button>
            </div>
          </div>

          {/* Image Content */}
          <div className="relative w-full lg:w-1/2 h-[400px] lg:h-auto">
            <Image
              src={data.bannerImage}
              alt="ModernLens Fall Collection"
              fill
              className="object-cover object-center"
              priority
              referrerPolicy="no-referrer"
            />
          </div>
        </section>

        {/* ─── VALUE PROPS ─── */}
        <section className="w-full bg-white py-16 lg:py-24 border-b border-gray-200">
          <div className="max-w-[1440px] mx-auto px-6 text-center">
            <h2 className="text-[28px] lg:text-[36px] font-serif tracking-tight text-[#1a1a1a] mb-12">
              Shopping with us is easy
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
              <div className="flex flex-col items-center group cursor-pointer">
                <div className="w-24 h-24 mb-6 relative hover:scale-105 transition-transform duration-500">
                  <Image src="https://picsum.photos/150/150?random=1151" alt="Home Try-On" fill className="object-cover rounded-full bg-[#f0f6fa]" />
                </div>
                <h3 className="font-bold text-[20px] mb-3 text-[#1a1a1a]">Home Try-On</h3>
                <p className="text-[16px] text-gray-600 mb-4 max-w-xs leading-relaxed">Select 5 frames to test out for 5 days, absolutely free.</p>
                <a href="#" className="text-[15px] font-bold text-[#458ad2] hover:underline underline-offset-4 flex items-center">
                  Learn more <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </div>

              <div className="flex flex-col items-center group cursor-pointer">
                <div className="w-24 h-24 mb-6 relative hover:scale-105 transition-transform duration-500">
                  <Image src="https://picsum.photos/150/150?random=1152" alt="Eye Exams" fill className="object-cover rounded-full bg-[#f0f6fa]" />
                </div>
                <h3 className="font-bold text-[20px] mb-3 text-[#1a1a1a]">Eye Exams</h3>
                <p className="text-[16px] text-gray-600 mb-4 max-w-xs leading-relaxed">Book a comprehensive exam at a location near you.</p>
                <a href="#" className="text-[15px] font-bold text-[#458ad2] hover:underline underline-offset-4 flex items-center">
                  Book an exam <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </div>

              <div className="flex flex-col items-center group cursor-pointer">
                <div className="w-24 h-24 mb-6 relative hover:scale-105 transition-transform duration-500">
                  <Image src="https://picsum.photos/150/150?random=1153" alt="Insurance" fill className="object-cover rounded-full bg-[#f0f6fa]" />
                </div>
                <h3 className="font-bold text-[20px] mb-3 text-[#1a1a1a]">Insurance</h3>
                <p className="text-[16px] text-gray-600 mb-4 max-w-xs leading-relaxed">We're in-network with many major vision plans.</p>
                <a href="#" className="text-[15px] font-bold text-[#458ad2] hover:underline underline-offset-4 flex items-center">
                  Check your coverage <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ─── PRODUCT GRID ─── */}
        <section className="max-w-[1440px] mx-auto px-6 py-20 lg:py-24">
          <div className="flex flex-col md:flex-row items-baseline justify-between mb-12 border-b border-gray-200 pb-4">
            <h2 className="text-[32px] lg:text-[40px] font-serif tracking-tight text-[#1a1a1a]">New Arrivals ({totalItems})</h2>
            <a href="#" className="text-[15px] font-bold text-[#458ad2] hover:underline underline-offset-4 mt-2 md:mt-0 transition-all">
              Shop all new frames
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {paginatedItems.map((product: any, idx: number) => (
              <div key={product.id || idx} data-product-id={product.id} className="group cursor-pointer flex flex-col">
                <div className="relative aspect-[3/2] mb-6 overflow-hidden w-full bg-[#f6f6f4] rounded-lg">
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    fill
                    className="object-contain p-8 group-hover:scale-105 transition-transform duration-[800ms] ease-out mix-blend-multiply"
                    referrerPolicy="no-referrer"
                  />
                  {/* Colors mock inside image */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity space-x-2">
                    <span className="w-4 h-4 rounded-full border border-gray-300 bg-black shadow-sm"></span>
                    <span className="w-4 h-4 rounded-full border border-gray-300 bg-[#a67c52] shadow-sm"></span>
                    <span className="w-4 h-4 rounded-full border border-gray-300 bg-transparent shadow-sm overflow-hidden flex">
                      <span className="w-1/2 h-full bg-[#e8e6e1]"></span><span className="w-1/2 h-full bg-[#8c8881]"></span>
                    </span>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }}
                    className="absolute top-3 right-3 p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Heart className={`w-4 h-4 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>
                </div>

                <div className="flex flex-col text-center">
                  <h3 className="text-[18px] font-bold text-[#1a1a1a] mb-1 group-hover:underline underline-offset-2 decoration-2">{product.title}</h3>
                  <div className="text-[15px] text-gray-600 mb-2 font-medium">Extra Wide</div>
                  <div className="flex items-center justify-center space-x-2">
                    {product.originalPrice ? (
                      <>
                        <span className="font-medium text-[16px] text-red-600">Starting at ${product.price}</span>
                        <span className="text-[14px] text-gray-500 line-through">${product.originalPrice}</span>
                      </>
                    ) : (
                      <span className="font-medium text-[16px] text-[#1a1a1a]">Starting at ${product.price}</span>
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
        </section>

      </main>

      {/* ─── FOOTER ─── */}
      <footer className="bg-[#1a1a1a] text-white py-20 pb-12 mt-10">
        <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20 lg:mb-32">

            <div className="flex flex-col space-y-4 font-medium text-[15px] text-gray-300">
              <h4 className="text-white font-bold mb-4 font-sans text-[16px]">Shop</h4>
              <a href="#" className="hover:text-white transition-colors">Eyeglasses</a>
              <a href="#" className="hover:text-white transition-colors">Sunglasses</a>
              <a href="#" className="hover:text-white transition-colors">Contacts</a>
              <a href="#" className="hover:text-white transition-colors">Gift Cards</a>
              <a href="#" className="hover:text-white transition-colors">Accessories</a>
            </div>

            <div className="flex flex-col space-y-4 font-medium text-[15px] text-gray-300">
              <h4 className="text-white font-bold mb-4 font-sans text-[16px]">Visit Us</h4>
              <a href="#" className="hover:text-white transition-colors">Locations</a>
              <a href="#" className="hover:text-white transition-colors">Book an Eye Exam</a>
              <a href="#" className="hover:text-white transition-colors">Home Try-On</a>
            </div>

            <div className="flex flex-col space-y-4 font-medium text-[15px] text-gray-300">
              <h4 className="text-white font-bold mb-4 font-sans text-[16px]">About Us</h4>
              <a href="#" className="hover:text-white transition-colors">Our Story</a>
              <a href="#" className="hover:text-white transition-colors">Buy a Pair, Give a Pair</a>
              <a href="#" className="hover:text-white transition-colors">Jobs</a>
              <a href="#" className="hover:text-white transition-colors">Impact</a>
            </div>

            <div className="flex flex-col space-y-4 font-medium text-[15px] text-gray-300">
              <h4 className="text-white font-bold mb-4 font-sans text-[16px]">Get In Touch</h4>
              <a href="#" className="hover:text-white transition-colors">FAQ</a>
              <a href="#" className="hover:text-white transition-colors">Order Status</a>
              <a href="#" className="hover:text-white transition-colors">1.888.492.7297</a>
              <a href="#" className="hover:text-white transition-colors">Email Us</a>
              <div className="flex space-x-4 pt-4">
                <a href="#" className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:bg-white hover:text-[#1a1a1a] transition-all">FB</a>
                <a href="#" className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:bg-white hover:text-[#1a1a1a] transition-all">IG</a>
                <a href="#" className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center hover:bg-white hover:text-[#1a1a1a] transition-all">XX</a>
              </div>
            </div>

          </div>

          <div className="pt-8 border-t border-gray-800 flex flex-col items-center lg:items-start justify-center text-[13px] font-medium text-gray-400 space-y-4 lg:space-y-0 relative">
            <span className="font-sans text-[20px] font-bold tracking-tight uppercase absolute right-0 bottom-0 text-white hidden lg:block">
              ModernLens
            </span>

            <div className="flex flex-wrap justify-center lg:justify-start gap-x-8 gap-y-4">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Notice of Privacy Practices</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
              <a href="#" className="hover:text-white transition-colors">Accessibility</a>
              <a href="#" className="hover:text-white transition-colors">CA Transparency in Supply Chains Act</a>
              <a href="#" className="hover:text-white transition-colors">Do Not Sell My Info</a>
            </div>

            <span className="lg:mt-4 block">© 2026 ModernLens Inc. All rights reserved.</span>
          </div>

        </div>
      </footer>
    </div>
  );
}
