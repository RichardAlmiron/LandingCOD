'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { StoreData } from '@/lib/types';
import { Search, ShoppingCart, User, Menu, ChevronDown, Globe, Play, ArrowRight, Smartphone, MonitorPlay, Speaker, Watch, Plus, Heart, X } from 'lucide-react';
import { usePagination, ProductPagination } from './shared/Pagination';

export default function FutureTechTemplate({ data }: { data: StoreData }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [favorites, setFavorites] = useState<string[]>([]);
  
  const featuredProduct = data.products[0];
  const newReleases = data.products.slice(1, 4);
  const otherProducts = data.products.slice(4, 8);
  
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
    <div className="min-h-full bg-white font-sans text-black selection:bg-black selection:text-white pb-10 overflow-x-hidden">

      {/* ─── TOP PROMO BAR ─── */}
      <div className="bg-[#f7f7f7] text-black text-[12px] py-2 px-6 flex justify-center items-center font-bold tracking-wide border-b border-gray-200">
        <span className="mr-2">Trade in & save on the latest Galaxy.</span>
        <a href="#" className="underline hover:text-blue-600 transition-colors">Buy now</a>
      </div>

      {/* ─── MAIN HEADER ─── */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 transition-all">
        <div className="w-full max-w-[1440px] mx-auto px-4 lg:px-6 h-[64px] flex items-center justify-between">

          <div className="flex items-center space-x-8 lg:space-x-12 shrink-0 h-full">
            <div className="cursor-pointer flex items-center h-full">
              <span className="font-black text-[22px] md:text-[26px] tracking-tighter uppercase select-none relative top-0.5">
                {data.logoText !== 'FutureTech' ? data.logoText : 'FUTURETECH'}
              </span>
            </div>
            {/* Desktop Left Nav */}
            <nav className="hidden lg:flex h-full space-x-6 font-bold text-[13px] tracking-wide">
              <a href="#" className="flex items-center h-full hover:bg-gray-50 px-2 rounded-md transition-colors border-b-2 border-transparent hover:border-black">Shop</a>
              <a href="#" className="flex items-center h-full hover:bg-gray-50 px-2 rounded-md transition-colors border-b-2 border-transparent hover:border-black">Mobile</a>
              <a href="#" className="flex items-center h-full hover:bg-gray-50 px-2 rounded-md transition-colors border-b-2 border-transparent hover:border-black">TV & Audio</a>
              <a href="#" className="flex items-center h-full hover:bg-gray-50 px-2 rounded-md transition-colors border-b-2 border-transparent hover:border-black">Appliances</a>
              <a href="#" className="flex items-center h-full hover:bg-gray-50 px-2 rounded-md transition-colors border-b-2 border-transparent hover:border-black">Computing</a>
              <a href="#" className="flex items-center h-full hover:bg-gray-50 px-2 rounded-md transition-colors border-b-2 border-transparent hover:border-black">Displays</a>
              <a href="#" className="flex items-center h-full hover:bg-gray-50 px-2 rounded-md transition-colors border-b-2 border-transparent hover:border-black">Accessories</a>
              <a href="#" className="flex items-center h-full hover:bg-gray-50 px-2 rounded-md transition-colors border-b-2 border-transparent hover:border-black">SmartThings</a>
            </nav>
          </div>

          <div className="flex items-center h-full space-x-2 md:space-x-4">
            {/* Desktop Right Nav */}
            <nav className="hidden xl:flex h-full items-center space-x-4 text-[13px] font-bold mr-2">
              <a href="#" className="hover:bg-gray-50 px-2 py-1.5 rounded-md transition-colors">Explore</a>
              <a href="#" className="hover:bg-gray-50 px-2 py-1.5 rounded-md transition-colors">Support</a>
              <a href="#" className="hover:bg-gray-50 px-2 py-1.5 rounded-md transition-colors">For Business</a>
            </nav>

            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors group">
              <Search className="w-[20px] h-[20px] group-hover:scale-110 transition-transform" strokeWidth={2} />
            </button>
            <button 
              onClick={addToCart}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors group relative"
            >
              <ShoppingCart className="w-[20px] h-[20px] group-hover:scale-110 transition-transform" strokeWidth={2} />
              {cartCount > 0 && (
                <div className="absolute top-1 right-1 w-4 h-4 bg-[#2189ff] text-white text-[10px] font-bold rounded-full border border-white flex items-center justify-center">{cartCount}</div>
              )}
            </button>
            <button className="hidden sm:block p-2 hover:bg-gray-100 rounded-full transition-colors group">
              <User className="w-[20px] h-[20px] group-hover:scale-110 transition-transform" strokeWidth={2} />
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              {mobileMenuOpen ? <X className="w-[22px] h-[22px]" strokeWidth={2} /> : <Menu className="w-[22px] h-[22px]" strokeWidth={2} />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Promo Carousel Section */}
      <nav className="w-full bg-white border-b border-gray-100 overflow-x-auto hide-scrollbar">
        <div className="flex max-w-[1440px] mx-auto px-4 lg:px-6 py-4 space-x-6 md:space-x-12 items-center justify-start md:justify-center min-w-max">
          <a href="#" className="flex flex-col items-center group cursor-pointer">
            <div className="w-[48px] h-[48px] md:w-[56px] md:h-[56px] rounded-full bg-[#f4f4f4] mb-2 flex items-center justify-center group-hover:border-2 border-black transition-all">
              <Smartphone className="w-6 h-6 text-gray-700" strokeWidth={1.5} />
            </div>
            <span className="text-[12px] font-bold text-gray-800">Mobile</span>
          </a>
          <a href="#" className="flex flex-col items-center group cursor-pointer">
            <div className="w-[48px] h-[48px] md:w-[56px] md:h-[56px] rounded-full bg-[#f4f4f4] mb-2 flex items-center justify-center group-hover:border-2 border-black transition-all">
              <MonitorPlay className="w-6 h-6 text-gray-700" strokeWidth={1.5} />
            </div>
            <span className="text-[12px] font-bold text-gray-800">TV & Audio</span>
          </a>
          <a href="#" className="flex flex-col items-center group cursor-pointer">
            <div className="w-[48px] h-[48px] md:w-[56px] md:h-[56px] rounded-full bg-[#f4f4f4] mb-2 flex items-center justify-center group-hover:border-2 border-black transition-all">
              <svg className="w-6 h-6 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 6h16v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6z" /><path d="M4 10h16M10 2v4M14 2v4M8 2h8" /></svg>
            </div>
            <span className="text-[12px] font-bold text-gray-800">Appliances</span>
          </a>
          <a href="#" className="flex flex-col items-center group cursor-pointer">
            <div className="w-[48px] h-[48px] md:w-[56px] md:h-[56px] rounded-full bg-[#f4f4f4] mb-2 flex items-center justify-center group-hover:border-2 border-black transition-all">
              <Watch className="w-6 h-6 text-gray-700" strokeWidth={1.5} />
            </div>
            <span className="text-[12px] font-bold text-gray-800">Smartwatches</span>
          </a>
          <a href="#" className="flex flex-col items-center group cursor-pointer">
            <div className="w-[48px] h-[48px] md:w-[56px] md:h-[56px] rounded-full bg-[#f4f4f4] mb-2 flex items-center justify-center group-hover:border-2 border-black transition-all">
              <Speaker className="w-6 h-6 text-gray-700" strokeWidth={1.5} />
            </div>
            <span className="text-[12px] font-bold text-gray-800">Accessories</span>
          </a>
        </div>
      </nav>

      <main>

        {/* ─── HERO BANNER ─── */}
        {featuredProduct ? (
          <div className="relative h-[650px] md:h-[700px] lg:h-[800px] w-full bg-black overflow-hidden flex flex-col justify-between pt-16 group">
            <div className="absolute inset-0 z-0">
              <Image
                src={data.bannerImage}
                alt="Hero Banner image"
                fill
                className="object-cover opacity-60 md:opacity-80 scale-100 lg:scale-[1.02] group-hover:scale-105 transition-transform duration-[3000ms] ease-out"
                referrerPolicy="no-referrer"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            </div>

            <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 text-center lg:mt-10">
              <h1 className="text-[42px] md:text-[56px] lg:text-[72px] font-bold tracking-tight text-white mb-4 leading-[1.1]">{data.name}</h1>
              <p className="text-[16px] md:text-[20px] text-gray-200 mb-8 max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-md">
                {data.description || "The next generation of innovation is here. Pre-order now and get exclusive trade-in credits."}
              </p>
            </div>

            <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 pb-16 md:pb-24 flex flex-col items-center">
              <p className="text-white text-[15px] font-bold mb-6 drop-shadow-lg">From ${featuredProduct.price} before eligible trade-in.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                <button className="bg-white text-black px-10 py-3.5 rounded-[30px] font-bold hover:bg-gray-200 transition-colors w-full sm:w-[200px] text-[15px] shadow-lg active:scale-95">
                  Buy Now
                </button>
                <button className="bg-transparent border border-white text-white px-10 py-3.5 rounded-[30px] font-bold hover:bg-white/10 transition-colors w-full sm:w-[200px] text-[15px] backdrop-blur-sm active:scale-95">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        ) : null}

        <div className="w-full max-w-[1440px] mx-auto px-4 lg:px-8 py-16 md:py-24">

          {/* Section: New Releases */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-[32px] md:text-[44px] font-black tracking-tight mb-8">What's New</h2>
            <div className="flex items-center justify-center space-x-6 md:space-x-10 text-[16px] md:text-[18px] font-bold overflow-x-auto hide-scrollbar px-4">
              <button className="text-black border-b-[3px] border-black pb-1.5 whitespace-nowrap">For You</button>
              <button className="text-gray-400 hover:text-black transition-colors pb-1.5 whitespace-nowrap">Mobile</button>
              <button className="text-gray-400 hover:text-black transition-colors pb-1.5 whitespace-nowrap">TV & Audio</button>
              <button className="text-gray-400 hover:text-black transition-colors pb-1.5 whitespace-nowrap">Home Appliances</button>
              <button className="text-gray-400 hover:text-black transition-colors pb-1.5 whitespace-nowrap">Computing</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
            {newReleases.map((product, idx) => (
              <div key={product.id || idx} data-product-id={product.id} className="group cursor-pointer flex flex-col bg-[#f4f4f4] rounded-[24px] overflow-hidden hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-shadow duration-500 relative">
                {idx === 0 && <span className="absolute top-6 left-6 bg-black text-white text-[11px] font-bold px-3 py-1 rounded-[16px] z-10 uppercase tracking-widest">New</span>}
                <div className="pt-10 px-8 flex flex-col items-center text-center relative z-10">
                  <h3 className="text-[24px] md:text-[28px] font-bold mb-3 tracking-tight">{product.title}</h3>
                  <div className="text-[14px] text-gray-600 mb-6 font-medium line-clamp-2 max-w-[85%]">{product.description || 'Power meets precision. Upgrade today.'}</div>
                  <div className="flex gap-3 mb-8">
                    <button className="bg-black text-white px-6 py-2 rounded-full font-bold text-[13px] hover:bg-gray-800 transition-colors shadow-sm">
                      Buy Now
                    </button>
                    <button className="bg-transparent border border-gray-300 text-black px-6 py-2 rounded-full font-bold text-[13px] hover:border-black transition-colors group-hover:bg-white">
                      Learn More
                    </button>
                  </div>
                </div>
                <div className="relative aspect-square w-full mt-auto flex items-end justify-center px-4 pb-0">
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    fill
                    className="object-contain object-bottom p-6 group-hover:scale-105 transition-transform duration-700 mix-blend-multiply"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Large Promo Video-like Banner */}
          <div className="w-full bg-[#f4f4f4] rounded-[24px] overflow-hidden flex flex-col lg:flex-row mb-24 min-h-[500px]">
            <div className="flex-1 p-10 md:p-16 lg:p-24 flex flex-col justify-center order-2 lg:order-1">
              <span className="text-[#2189ff] font-bold text-[14px] tracking-widest uppercase mb-4">SmartThings</span>
              <h2 className="text-[36px] md:text-[48px] font-bold leading-[1.1] tracking-tight mb-6">
                Do the SmartThings
              </h2>
              <p className="text-[16px] md:text-[18px] text-gray-700 mb-10 leading-relaxed font-medium">
                Connect your entire home. Control your appliances, automate security, and manage your entertainment all from a single, powerful app.
              </p>
              <button className="bg-black text-white px-8 py-3.5 rounded-full font-bold text-[15px] hover:bg-gray-800 transition-colors w-fit shadow-md flex items-center">
                Discover SmartThings <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
            <div className="flex-1 relative min-h-[300px] lg:min-h-full order-1 lg:order-2">
              <Image src="https://picsum.photos/1000/1000?random=11" alt="Smart Home" fill className="object-cover" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer hover:bg-white/50 transition-colors border border-white/40">
                  <Play className="w-8 h-8 text-white ml-1 fill-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Grid list of other products */}
          {otherProducts.length > 0 && (
            <div className="mb-20">
              <h2 className="text-[28px] md:text-[36px] font-bold tracking-tight mb-10 text-center">More to Explore</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {otherProducts.map((product, idx) => (
                  <div key={product.id || idx} data-product-id={product.id} className="group cursor-pointer flex flex-col">
                    <div className="relative aspect-square mb-4 bg-[#f4f4f4] rounded-[16px] p-6 overflow-hidden flex items-center justify-center">
                      <Image
                        src={product.imageUrl}
                        alt={product.title}
                        fill
                        className="object-contain p-6 group-hover:scale-110 transition-transform duration-[600ms] ease-out mix-blend-multiply"
                        referrerPolicy="no-referrer"
                      />
                      <button 
                        onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }}
                        className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 shadow-sm border border-gray-100"
                      >
                        <Heart className={`w-4 h-4 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-black'}`} />
                      </button>
                    </div>
                    <div className="flex flex-col text-center px-2">
                      <div className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">{product.category || 'Galaxy'}</div>
                      <h3 className="text-[15px] font-bold mb-1 text-black line-clamp-2 md:leading-tight">{product.title}</h3>
                      <div className="text-[16px] font-medium text-black mt-2">
                        ${product.price}
                      </div>
                      <button 
                        onClick={(e) => { e.stopPropagation(); addToCart(); }}
                        className="mt-3 bg-black text-white py-2 rounded-full text-[12px] font-bold hover:bg-gray-800 transition-colors"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* All Products with Pagination */}
          <div className="mb-20">
            <h2 className="text-[28px] md:text-[36px] font-bold tracking-tight mb-10 text-center">All Products ({totalItems})</h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
              {paginatedItems.map((product, idx) => (
                <div key={product.id || idx} data-product-id={product.id} className="group cursor-pointer flex flex-col">
                  <div className="relative aspect-square mb-3 bg-[#f4f4f4] rounded-[12px] p-4 overflow-hidden flex items-center justify-center">
                    <Image
                      src={product.imageUrl}
                      alt={product.title}
                      fill
                      className="object-contain p-4 group-hover:scale-110 transition-transform duration-[600ms] ease-out mix-blend-multiply"
                      referrerPolicy="no-referrer"
                    />
                    <button 
                      onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }}
                      className="absolute top-3 right-3 w-7 h-7 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm border border-gray-100"
                    >
                      <Heart className={`w-3.5 h-3.5 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-black'}`} />
                    </button>
                  </div>
                  <div className="flex flex-col text-center px-1">
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">{product.category || 'Galaxy'}</div>
                    <h3 className="text-[13px] font-bold mb-1 text-black line-clamp-2 leading-tight">{product.title}</h3>
                    <div className="text-[14px] font-medium text-black mt-1">${product.price}</div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); addToCart(); }}
                      className="mt-2 bg-black text-white py-1.5 rounded-full text-[11px] font-bold hover:bg-gray-800 transition-colors"
                    >
                      Add
                    </button>
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
          </div>

          {/* Services highlight */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-gray-200 pt-16 mb-10">
            <div className="flex flex-col items-center text-center p-6 px-4 hover:bg-[#f9f9f9] rounded-[16px] transition-colors cursor-pointer">
              <img src="https://picsum.photos/100/100?random=201" alt="FutureTech Care+" className="w-16 h-16 rounded-full mb-6 object-cover" />
              <h4 className="font-bold text-[18px] mb-2">FutureTech Care+</h4>
              <p className="text-[14px] text-gray-600 font-medium">Get peace of mind with 24/7 support and extended coverage.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 px-4 hover:bg-[#f9f9f9] rounded-[16px] transition-colors cursor-pointer border-l-0 sm:border-l border-r-0 sm:border-r border-gray-100">
              <img src="https://picsum.photos/100/100?random=202" alt="Trade In" className="w-16 h-16 rounded-full mb-6 object-cover" />
              <h4 className="font-bold text-[18px] mb-2">Trade-in Program</h4>
              <p className="text-[14px] text-gray-600 font-medium">Trade in your old device to get an instant discount on your new purchase.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 px-4 hover:bg-[#f9f9f9] rounded-[16px] transition-colors cursor-pointer">
              <img src="https://picsum.photos/100/100?random=203" alt="Financing" className="w-16 h-16 rounded-full mb-6 object-cover" />
              <h4 className="font-bold text-[18px] mb-2">FutureTech Financing</h4>
              <p className="text-[14px] text-gray-600 font-medium">0% APR for up to 36 months on eligible purchases. Pay over time.</p>
            </div>
          </div>

        </div>
      </main>

      {/* ─── OVERHAULED FOOTER ─── */}
      <footer className="bg-white border-t border-gray-200 pt-16 pb-12">
        <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-8">

          {/* Breadcrumbs */}
          <div className="flex items-center space-x-2 text-[12px] text-gray-500 font-medium mb-10 border-b border-gray-100 pb-4">
            <a href="#" className="hover:text-black hover:underline transition-colors">Home</a>
            <span>/</span>
            <span className="text-black font-bold">Online Shop</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-12 mb-16">
            <div className="flex flex-col text-[13px] font-bold text-gray-800">
              <h4 className="text-black font-black mb-4 tracking-tight uppercase border-l-2 border-black pl-2 text-[14px]">Product & Service</h4>
              <div className="flex flex-col space-y-3.5 mt-2">
                <a href="#" className="hover:underline hover:text-[#2189ff] transition-colors w-fit">Smartphones</a>
                <a href="#" className="hover:underline hover:text-[#2189ff] transition-colors w-fit">Tablets</a>
                <a href="#" className="hover:underline hover:text-[#2189ff] transition-colors w-fit">Audio</a>
                <a href="#" className="hover:underline hover:text-[#2189ff] transition-colors w-fit">Watches</a>
                <a href="#" className="hover:underline hover:text-[#2189ff] transition-colors w-fit">Smart Switch</a>
                <a href="#" className="hover:underline hover:text-[#2189ff] transition-colors w-fit">Mobile Accessories</a>
                <a href="#" className="hover:underline hover:text-[#2189ff] transition-colors w-fit">TVs</a>
                <a href="#" className="hover:underline hover:text-[#2189ff] transition-colors w-fit">Sound Devices</a>
              </div>
            </div>

            <div className="flex flex-col text-[13px] font-bold text-gray-800">
              <h4 className="text-black font-black mb-4 tracking-tight uppercase border-l-2 border-transparent pl-2 text-[14px]">Shop</h4>
              <div className="flex flex-col space-y-3.5 mt-2">
                <a href="#" className="hover:underline hover:text-[#2189ff] transition-colors w-fit">Offers</a>
                <a href="#" className="hover:underline hover:text-[#2189ff] transition-colors w-fit">FutureTech Experience Store</a>
                <a href="#" className="hover:underline hover:text-[#2189ff] transition-colors w-fit">Explore</a>
                <a href="#" className="hover:underline hover:text-[#2189ff] transition-colors w-fit">FutureTech Rewards</a>
                <a href="#" className="hover:underline hover:text-[#2189ff] transition-colors w-fit">Trade-In</a>
                <a href="#" className="hover:underline hover:text-[#2189ff] transition-colors w-fit">Student Offers</a>
                <a href="#" className="hover:underline hover:text-[#2189ff] transition-colors w-fit">Shop FAQ</a>
              </div>
            </div>

            <div className="flex flex-col text-[13px] font-bold text-gray-800">
              <h4 className="text-black font-black mb-4 tracking-tight uppercase border-l-2 border-transparent pl-2 text-[14px]">Support</h4>
              <div className="flex flex-col space-y-3.5 mt-2">
                <a href="#" className="hover:underline hover:text-[#2189ff] transition-colors w-fit">Contact Us</a>
                <a href="#" className="hover:underline hover:text-[#2189ff] transition-colors w-fit">Email Support</a>
                <a href="#" className="hover:underline hover:text-[#2189ff] transition-colors w-fit">Live Chat</a>
                <a href="#" className="hover:underline hover:text-[#2189ff] transition-colors w-fit">Phone Support</a>
                <a href="#" className="hover:underline hover:text-[#2189ff] transition-colors w-fit">Community</a>
                <a href="#" className="hover:underline hover:text-[#2189ff] transition-colors w-fit">Order Support</a>
              </div>
            </div>

            <div className="flex flex-col text-[13px] font-bold text-gray-800">
              <h4 className="text-black font-black mb-4 tracking-tight uppercase border-l-2 border-transparent pl-2 text-[14px]">Account</h4>
              <div className="flex flex-col space-y-3.5 mt-2">
                <a href="#" className="hover:underline hover:text-[#2189ff] transition-colors w-fit">My Page</a>
                <a href="#" className="hover:underline hover:text-[#2189ff] transition-colors w-fit">Orders</a>
                <a href="#" className="hover:underline hover:text-[#2189ff] transition-colors w-fit">Products</a>
                <a href="#" className="hover:underline hover:text-[#2189ff] transition-colors w-fit">Vouchers</a>
                <a href="#" className="hover:underline hover:text-[#2189ff] transition-colors w-fit">Wishlist</a>
              </div>
            </div>

            <div className="flex flex-col text-[13px] font-bold text-gray-800">
              <h4 className="text-black font-black mb-4 tracking-tight uppercase border-l-2 border-transparent pl-2 text-[14px]">Sustainability</h4>
              <div className="flex flex-col space-y-3.5 mt-2">
                <a href="#" className="hover:underline hover:text-[#2189ff] transition-colors w-fit">Environment</a>
                <a href="#" className="hover:underline hover:text-[#2189ff] transition-colors w-fit">Security & Privacy</a>
                <a href="#" className="hover:underline hover:text-[#2189ff] transition-colors w-fit">Accessibility</a>
                <a href="#" className="hover:underline hover:text-[#2189ff] transition-colors w-fit">Diversity & Inclusion</a>
                <a href="#" className="hover:underline hover:text-[#2189ff] transition-colors w-fit">Corporate Citizenship</a>
                <a href="#" className="hover:underline hover:text-[#2189ff] transition-colors w-fit">Digital Responsibility</a>
              </div>
            </div>

            <div className="flex flex-col text-[13px] font-bold text-gray-800">
              <h4 className="text-black font-black mb-4 tracking-tight uppercase border-l-2 border-transparent pl-2 text-[14px]">About Us</h4>
              <div className="flex flex-col space-y-3.5 mt-2">
                <a href="#" className="hover:underline hover:text-[#2189ff] transition-colors w-fit">Company Info</a>
                <a href="#" className="hover:underline hover:text-[#2189ff] transition-colors w-fit">Business Area</a>
                <a href="#" className="hover:underline hover:text-[#2189ff] transition-colors w-fit">Brand Identity</a>
                <a href="#" className="hover:underline hover:text-[#2189ff] transition-colors w-fit">Careers</a>
                <a href="#" className="hover:underline hover:text-[#2189ff] transition-colors w-fit">Investor Relations</a>
                <a href="#" className="hover:underline hover:text-[#2189ff] transition-colors w-fit">Newsroom</a>
                <a href="#" className="hover:underline hover:text-[#2189ff] transition-colors w-fit">Ethics</a>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between pt-8 border-t border-gray-300 text-[11px] text-gray-600 font-bold">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 mb-6 lg:mb-0">
              <span className="font-medium">Copyright © 1995-2026 {data.logoText} All rights reserved.</span>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <a href="#" className="hover:underline hover:text-black transition-colors">Privacy</a>
                <span className="hidden md:inline">|</span>
                <a href="#" className="hover:underline hover:text-black transition-colors">Legal</a>
                <span className="hidden md:inline">|</span>
                <a href="#" className="hover:underline hover:text-black transition-colors">Accessibility Help</a>
                <span className="hidden md:inline">|</span>
                <a href="#" className="hover:underline hover:text-black transition-colors">Do Not Sell My Info</a>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 cursor-pointer hover:underline text-black group">
                <Globe className="w-4 h-4 group-hover:text-[#2189ff] transition-colors" strokeWidth={2} />
                <span>USA/English</span>
              </div>
              <div className="flex space-x-3">
                <a href="#" className="w-[32px] h-[32px] bg-gray-100 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all text-black"><svg className="w-[14px] h-[14px] fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg></a>
                <a href="#" className="w-[32px] h-[32px] bg-gray-100 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all text-black"><svg className="w-[14px] h-[14px] fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg></a>
                <a href="#" className="w-[32px] h-[32px] bg-gray-100 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all text-black"><svg className="w-[14px] h-[14px] fill-current" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" /></svg></a>
              </div>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
