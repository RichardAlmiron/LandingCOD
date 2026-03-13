'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { StoreData } from '@/lib/types';
import { Search, ShoppingBag, Menu, Globe, ChevronDown, Check, Zap, ArrowRight, Star, Heart, ChevronLeft, ChevronRightIcon, Truck, Shield, RotateCcw } from 'lucide-react';
import { usePagination, ProductPagination } from './shared/Pagination';
import { StoreFooter } from './shared/StoreFooter';

export default function FutureAutoTemplate({ data }: { data: StoreData }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'vehicles' | 'catalog'>('vehicles');
  const itemsPerPage = 15; // 3 rows x 5 columns

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const featuredProduct = data.products[0];
  const vehicles = data.products.slice(0, 4);
  const accessories = data.products.slice(4, 7);

  const {
    currentPage,
    totalPages,
    paginatedItems,
    handlePageChange,
    totalItems,
  } = usePagination(data.products, itemsPerPage);

  return (
    <div className="min-h-full bg-white font-sans text-black selection:bg-black selection:text-white">
      {/* ─── HEADER ─── */}
      <header className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${isScrolled ? 'bg-white shadow-sm' : 'bg-transparent'}`}>
        <div className="w-full px-6 md:px-12 h-[56px] flex items-center justify-between">
          <div className="flex-1 md:flex-none">
            <a href="#" className={`font-sans text-[18px] tracking-[0.4em] uppercase font-black cursor-pointer ${isScrolled ? 'text-black' : 'text-white'}`}>
              {data.logoText || 'FUTUREAUTO'}
            </a>
          </div>

          <nav className="hidden xl:flex space-x-1 font-medium text-[13.5px] tracking-wide">
            <button 
              onClick={() => setActiveTab('vehicles')}
              className={`px-4 py-1.5 rounded-[4px] transition-colors ${activeTab === 'vehicles' ? (isScrolled ? 'bg-black text-white' : 'bg-white/20 text-white') : (isScrolled ? 'hover:bg-gray-100 text-black' : 'hover:bg-white/10 text-white')}`}
            >
              Vehicles
            </button>
            <button 
              onClick={() => setActiveTab('catalog')}
              className={`px-4 py-1.5 rounded-[4px] transition-colors ${activeTab === 'catalog' ? (isScrolled ? 'bg-black text-white' : 'bg-white/20 text-white') : (isScrolled ? 'hover:bg-gray-100 text-black' : 'hover:bg-white/10 text-white')}`}
            >
              Shop Catalog
            </button>
            <a href="#" className={`px-4 py-1.5 rounded-[4px] transition-colors ${isScrolled ? 'hover:bg-gray-100 text-black' : 'hover:bg-white/10 text-white'}`}>Energy</a>
            <a href="#" className={`px-4 py-1.5 rounded-[4px] transition-colors ${isScrolled ? 'hover:bg-gray-100 text-black' : 'hover:bg-white/10 text-white'}`}>Charging</a>
            <a href="#" className={`px-4 py-1.5 rounded-[4px] transition-colors ${isScrolled ? 'hover:bg-gray-100 text-black' : 'hover:bg-white/10 text-white'}`}>Discover</a>
          </nav>

          <div className="flex items-center space-x-2 md:space-x-1">
            <button className={`p-1.5 rounded-[4px] transition-colors hidden xl:block ${isScrolled ? 'hover:bg-gray-100 text-black' : 'hover:bg-white/10 text-white'}`}>
              <Globe className="w-5 h-5" strokeWidth={1.5} />
            </button>
            <button className={`p-1.5 rounded-[4px] transition-colors hidden md:block ${isScrolled ? 'hover:bg-gray-100 text-black' : 'hover:bg-white/10 text-white'}`}>
              <Search className="w-5 h-5" strokeWidth={1.5} />
            </button>
            <button className={`p-1.5 rounded-[4px] transition-colors ${isScrolled ? 'hover:bg-gray-100 text-black' : 'hover:bg-white/10 text-white'}`}>
              <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`flex p-1.5 rounded-[4px] transition-colors xl:hidden ${isScrolled ? 'hover:bg-gray-100 bg-gray-100' : 'hover:bg-white/10 bg-black/5 backdrop-blur-md'}`}
            >
              <Menu className={`w-5 h-5 ${isScrolled ? 'text-black' : 'text-white'}`} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white shadow-lg">
            <nav className="flex flex-col py-4 px-6">
              <button 
                onClick={() => { setActiveTab('vehicles'); setMobileMenuOpen(false); }}
                className="text-left py-3 font-medium border-b border-gray-100"
              >
                Vehicles
              </button>
              <button 
                onClick={() => { setActiveTab('catalog'); setMobileMenuOpen(false); }}
                className="text-left py-3 font-medium border-b border-gray-100"
              >
                Shop Catalog
              </button>
              <a href="#" className="py-3 font-medium border-b border-gray-100">Energy</a>
              <a href="#" className="py-3 font-medium border-b border-gray-100">Charging</a>
              <a href="#" className="py-3 font-medium">Discover</a>
            </nav>
          </div>
        )}
      </header>

      {activeTab === 'vehicles' ? (
        <main className="snap-y snap-mandatory h-screen w-full overflow-y-scroll overflow-x-hidden scroll-smooth relative">
          {/* ─── SECTION 1: HERO ─── */}
          <section data-product-id={featuredProduct?.id} className="relative h-screen w-full snap-start flex flex-col justify-between pt-24 pb-12 shrink-0">
            <Image
              src={data.bannerImage}
              alt="Hero"
              fill
              className="absolute inset-0 w-full h-full object-cover -z-10"
              priority
            />
            <div className="absolute inset-0 bg-black/10 -z-10" />

            <div className="flex flex-col items-center mt-6 text-white text-center drop-shadow-md px-4">
              <h1 className="text-[40px] md:text-[52px] font-medium tracking-tight mb-2">
                {data.name || 'Model Y'}
              </h1>
              <p className="text-[14px] md:text-[16px] font-medium tracking-wide">
                {data.description || 'Lease starting at $299/mo'}
              </p>
            </div>

            <div className="flex flex-col items-center mb-6 w-full px-6">
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 w-full max-w-lg mb-8">
                <button className="flex-1 bg-white text-[#393c41] py-2.5 rounded-[4px] text-[14px] font-medium hover:bg-gray-200 transition-colors">
                  Order Now
                </button>
                <button className="flex-1 bg-[#171a20]/60 backdrop-blur-md text-white py-2.5 rounded-[4px] text-[14px] font-medium hover:bg-[#171a20]/80 transition-colors">
                  Demo Drive
                </button>
              </div>
              <div className="text-[12px] text-white/80 max-w-2xl text-center px-4 leading-relaxed font-medium">
                *Excludes taxes and fees with $2,999 down. Subject to specific configurations and availability.
              </div>
            </div>
          </section>

          {/* ─── SECTION 2: VEHICLE FOCUS ─── */}
          {vehicles[1] && (
            <section data-product-id={vehicles[1].id} className="relative h-screen w-full snap-start flex flex-col justify-between pt-24 pb-12 shrink-0">
              <Image
                src={vehicles[1].imageUrl}
                alt="Model 3"
                fill
                className="absolute inset-0 w-full h-full object-cover -z-10 brightness-90"
              />

              <div className="flex flex-col items-center mt-6 text-white text-center drop-shadow-md px-4">
                <h1 className="text-[40px] md:text-[52px] font-medium tracking-tight mb-2">
                  {vehicles[1].title}
                </h1>
                <p className="text-[14px] md:text-[16px] font-medium tracking-wide">
                  From ${vehicles[1].price}/mo
                </p>
              </div>

              <div className="flex flex-col items-center mb-6 w-full px-6">
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 w-full max-w-lg mb-8">
                  <button className="flex-1 bg-white text-[#393c41] py-2.5 rounded-[4px] text-[14px] font-medium hover:bg-gray-200 transition-colors">
                    Order Now
                  </button>
                  <button className="flex-1 bg-[#171a20]/60 backdrop-blur-md text-white py-2.5 rounded-[4px] text-[14px] font-medium hover:bg-[#171a20]/80 transition-colors">
                    Demo Drive
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* ─── SECTION 3: CATALOG PREVIEW ─── */}
          <section className="relative min-h-screen w-full snap-start bg-white py-24 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-[32px] md:text-[40px] font-medium tracking-tight mb-4">
                  Shop Accessories
                </h2>
                <p className="text-gray-600 max-w-xl mx-auto">
                  Enhance your experience with official accessories and merchandise.
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {data.products.slice(0, 10).map((product, idx) => (
                  <div key={product.id} data-product-id={product.id} className="group cursor-pointer">
                    <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden mb-3">
                      <Image
                        src={product.imageUrl}
                        alt={product.title}
                        fill
                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="font-medium text-sm line-clamp-2">{product.title}</h3>
                    <p className="font-bold mt-1">${product.price}</p>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-10">
                <button 
                  onClick={() => setActiveTab('catalog')}
                  className="bg-black text-white px-8 py-3 rounded-[4px] font-medium hover:bg-gray-800 transition-colors"
                >
                  View Full Catalog
                </button>
              </div>
            </div>
          </section>

          {/* ─── FOOTER SECTION ─── */}
          <section className="relative h-screen w-full snap-start bg-black flex flex-col justify-end pb-12">
            <div className="flex flex-col items-center px-6 mb-12">
              <h2 className="text-white text-[32px] md:text-[40px] font-medium mb-6">FutureAuto</h2>
              <footer className="w-full flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 text-[12px] font-medium tracking-wide text-white/60">
                <a href="#" className="hover:text-white transition-colors">FutureAuto © 2026</a>
                <a href="#" className="hover:text-white transition-colors">Privacy & Legal</a>
                <a href="#" className="hover:text-white transition-colors">Vehicle Recalls</a>
                <a href="#" className="hover:text-white transition-colors">Contact</a>
                <a href="#" className="hover:text-white transition-colors">News</a>
                <a href="#" className="hover:text-white transition-colors">Careers</a>
                <a href="#" className="hover:text-white transition-colors">Locations</a>
              </footer>
            </div>
          </section>
        </main>
      ) : (
        /* ─── CATALOG VIEW ─── */
        <main className="pt-[80px] min-h-screen bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
            {/* Breadcrumb & Title */}
            <div className="mb-8">
              <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <button onClick={() => setActiveTab('vehicles')} className="hover:text-black">Home</button>
                <ChevronRightIcon className="w-4 h-4" />
                <span className="text-black font-medium">Shop</span>
              </nav>
              <h1 className="text-3xl font-bold">Official Shop</h1>
              <p className="text-gray-600 mt-2">All products • {totalItems} items</p>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="flex items-center gap-3 bg-white p-4 rounded-lg">
                <Truck className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="font-semibold text-sm">Free Shipping</p>
                  <p className="text-xs text-gray-500">Orders over $50</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white p-4 rounded-lg">
                <Shield className="w-6 h-6 text-green-600" />
                <div>
                  <p className="font-semibold text-sm">2-Year Warranty</p>
                  <p className="text-xs text-gray-500">On all products</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white p-4 rounded-lg">
                <RotateCcw className="w-6 h-6 text-orange-600" />
                <div>
                  <p className="font-semibold text-sm">Easy Returns</p>
                  <p className="text-xs text-gray-500">30-day policy</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white p-4 rounded-lg">
                <Zap className="w-6 h-6 text-yellow-600" />
                <div>
                  <p className="font-semibold text-sm">Fast Delivery</p>
                  <p className="text-xs text-gray-500">2-3 business days</p>
                </div>
              </div>
            </div>

            {/* Product Grid (3x5 = 15 products) */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 md:gap-6">
                {paginatedItems.map((product, idx) => (
                  <div 
                    key={product.id} 
                    data-product-id={product.id}
                    className="group cursor-pointer"
                  >
                    <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden mb-3">
                      <Image
                        src={product.imageUrl}
                        alt={product.title}
                        fill
                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                      />
                      <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100">
                        <Heart className="w-4 h-4" />
                      </button>
                      {idx % 5 === 0 && (
                        <span className="absolute top-2 left-2 bg-black text-white text-[10px] font-bold px-2 py-1">
                          BESTSELLER
                        </span>
                      )}
                    </div>
                    <h3 className="font-medium text-sm line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {product.title}
                    </h3>
                    <div className="flex items-center gap-1 mt-1">
                      <div className="flex text-yellow-400">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star} 
                            className={`w-3 h-3 ${star <= 4 ? 'fill-current' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">({product.reviews || 24})</span>
                    </div>
                    <p className="font-bold text-lg mt-1">${product.price}</p>
                    {product.originalPrice && (
                      <p className="text-sm text-gray-500 line-through">${product.originalPrice}</p>
                    )}
                    <button className="w-full mt-3 bg-black text-white py-2 rounded font-medium text-sm hover:bg-gray-800 transition-colors opacity-0 group-hover:opacity-100">
                      Add to Cart
                    </button>
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
            </div>
          </div>

          <StoreFooter data={data} variant="dark" />
        </main>
      )}
    </div>
  );
}
