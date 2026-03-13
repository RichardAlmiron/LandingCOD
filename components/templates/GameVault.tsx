'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { StoreData } from '@/lib/types';
import { Search, ShoppingCart, User, Menu, Gamepad2, Monitor, Laptop, Bell, Cloud, Globe, Download, Play, MessageSquare, ThumbsUp, ChevronDown, Facebook, Twitter, Heart, X } from 'lucide-react';
import { usePagination, ProductPagination } from './shared/Pagination';

export default function GameVaultTemplate({ data }: { data: StoreData }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [favorites, setFavorites] = useState<string[]>([]);
  
  // Keep original product sections
  const featuredProduct = data.products[0];
  const specialOffers = data.products.slice(1, 5);
  const communityRecommendations = data.products.slice(5, 9);
  
  // Pagination for all products
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
    <div className="min-h-full bg-[#1b2838] font-sans text-[#c7d5e0] selection:bg-[#66c0f4] selection:text-white pb-10 overflow-x-hidden">

      {/* ─── GLOBAL HEADER (SUPER TOP BAR) ─── */}
      <div className="bg-[#171a21] text-[#b8b6b4] text-[11px] py-1.5 px-4 md:px-8 flex justify-between items-center font-medium uppercase tracking-wider">
        <div className="hidden md:flex items-center space-x-6">
          <a href="#" className="hover:text-white flex items-center transition-colors">
            <Gamepad2 className="w-3.5 h-3.5 mr-1" /> Return to Store
          </a>
        </div>
        <div className="flex items-center justify-end w-full md:w-auto space-x-4">
          <button className="bg-[#5c7e10] hover:bg-[#79a617] text-white px-3 py-1 rounded-[2px] flex items-center transition-colors">
            <Download className="w-3 h-3 mr-1.5" /> Install GameVault
          </button>
          <a href="#" className="hover:text-white transition-colors">login</a>
          <span className="text-[#414853]">|</span>
          <a href="#" className="hover:text-white flex items-center transition-colors">
            language <ChevronDown className="w-3 pos-relative top-[1px] ml-1" />
          </a>
        </div>
      </div>

      {/* ─── MAIN NAV HEADER ─── */}
      <header className="bg-[#171a21] sticky top-0 z-50 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
        <div className="w-full max-w-[940px] xl:max-w-[1100px] 2xl:max-w-[1400px] mx-auto px-4 h-[75px] md:h-[104px] flex items-center justify-between">

          <div className="flex items-center space-x-8 md:space-x-12 shrink-0 h-full">
            <div className="flex items-center cursor-pointer h-full group">
              <span className="font-black text-[24px] md:text-[34px] tracking-tighter uppercase leading-none text-white flex items-center">
                <div className="w-[32px] h-[32px] md:w-[44px] md:h-[44px] bg-[#171a21] border-2 border-white rounded-full flex items-center justify-center mr-2 md:mr-3 group-hover:scale-105 transition-transform">
                  <Gamepad2 className="w-[18px] h-[18px] md:w-[24px] md:h-[24px]" />
                </div>
                STEAM
              </span>
            </div>
            {/* Desktop Nav */}
            <nav className="hidden lg:flex space-x-2 xl:space-x-6 h-full items-center font-bold text-[14px] uppercase tracking-[1px] text-[#dcdedf]">
              <a href="#" className="hover:text-white border-b-[3px] border-[#1a9fff] text-[#1a9fff] h-full flex items-center pt-1 px-2">Store</a>
              <a href="#" className="hover:text-white border-b-[3px] border-transparent hover:border-gray-500 h-full flex items-center pt-1 px-2 transition-all">Community</a>
              <a href="#" className="hover:text-white border-b-[3px] border-transparent hover:border-gray-500 h-full flex items-center pt-1 px-2 transition-all">About</a>
              <a href="#" className="hover:text-white border-b-[3px] border-transparent hover:border-gray-500 h-full flex items-center pt-1 px-2 transition-all">Support</a>
            </nav>
          </div>

          <div className="flex items-center h-full">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-300 hover:text-white transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* STORE NAV BAR (Blue background menu below header) */}
      <div className="w-full bg-[#1b2838] relative z-40">
        <div className="max-w-[940px] xl:max-w-[1100px] 2xl:max-w-[1400px] mx-auto px-4 pt-6 pb-2">
          {/* Internal gradient nav */}
          <div className="hidden lg:flex bg-gradient-to-r from-[#316282] to-[#203a4c] rounded-[3px] p-2 items-center justify-between shadow-md">
            <div className="flex space-x-1 text-[13px] font-medium text-white shadow-text relative">
              <a href="#" className="px-3 py-1 hover:bg-[#66c0f4]/20 rounded-[2px] transition-colors relative group">
                Your Store
                <div className="absolute top-[100%] left-0 w-[150px] bg-[#3d4450] text-[#c7d5e0] hidden group-hover:flex flex-col rounded-b-sm shadow-xl z-50 text-[12px] py-1 border border-gray-700">
                  <span className="px-4 py-1 hover:bg-[#e5e5e5] hover:text-black cursor-pointer">Home</span>
                  <span className="px-4 py-1 hover:bg-[#e5e5e5] hover:text-black cursor-pointer">Community Recommendations</span>
                  <span className="px-4 py-1 hover:bg-[#e5e5e5] hover:text-black cursor-pointer">Recently Viewed</span>
                </div>
              </a>
              <a href="#" className="px-3 py-1 hover:bg-[#66c0f4]/20 rounded-[2px] transition-colors">New & Noteworthy</a>
              <a href="#" className="px-3 py-1 hover:bg-[#66c0f4]/20 rounded-[2px] transition-colors">Categories</a>
              <a href="#" className="px-3 py-1 hover:bg-[#66c0f4]/20 rounded-[2px] transition-colors">Points Shop</a>
              <a href="#" className="px-3 py-1 hover:bg-[#66c0f4]/20 rounded-[2px] transition-colors">News</a>
              <a href="#" className="px-3 py-1 hover:bg-[#66c0f4]/20 rounded-[2px] transition-colors">Labs</a>
            </div>

            <div className="flex items-center bg-[#316282] border-none rounded-[3px] h-[30px] pr-1 w-[220px]">
              <input type="text" placeholder="search" className="bg-transparent outline-none text-[13px] pl-3 w-full font-medium text-white placeholder-[#16202d] italic shadow-inner" />
              <button className="bg-[#66c0f4] p-[3px] rounded-[2px] hover:bg-[#66c0f4]/90">
                <Search className="w-4 h-4 text-black" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="w-full max-w-[940px] xl:max-w-[1100px] mx-auto px-4 pb-16 pt-4">

        {/* Wishlist / Cart floating strip */}
        <div className="flex items-center justify-between text-[11px] text-[#8f98a0] mb-8 font-medium">
          <div 
            onClick={() => toggleFavorite('header')}
            className="bg-[#000000]/30 hover:bg-[#000000]/50 hover:text-white px-3 py-1.5 rounded-sm transition-colors border border-[#3d4450]/50 flex items-center cursor-pointer"
          >
            <span className="text-[#66c0f4] mr-1">WISHLIST</span> ({favorites.length})
          </div>
          <div 
            onClick={addToCart}
            className="bg-[#000000]/30 hover:bg-[#000000]/50 hover:text-white px-3 py-1.5 rounded-sm transition-colors border border-[#3d4450]/50 flex items-center cursor-pointer"
          >
            <ShoppingCart className="w-3 h-3 mr-1.5 text-gray-400" />
            <span className="text-white mr-1">CART</span> ({cartCount})
          </div>
        </div>

        {/* ─── FEATURED AND RECOMMENDED HERO (CAROUSEL-LIKE) ─── */}
        <h2 className="text-[14px] text-white font-medium uppercase tracking-widest mb-2 shadow-text">Featured & Recommended</h2>
        {featuredProduct ? (
          <div className="relative mb-12 group cursor-pointer shadow-[0_0_15px_rgba(0,0,0,0.8)] flex flex-col md:flex-row bg-[#0a141d] active:scale-[0.99] transition-transform">
            <div className="w-full md:w-[62%] relative aspect-video md:aspect-auto md:min-h-[353px]">
              <Image
                src={data.bannerImage}
                alt="Featured Game"
                fill
                className="object-cover group-hover:brightness-110 transition-all duration-300"
                referrerPolicy="no-referrer"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent hidden md:block" />
            </div>
            <div className="w-full md:w-[38%] p-4 md:p-6 flex flex-col justify-between bg-gradient-to-b from-[#0e1822] to-[#12202e] border-l-4 border-black/20">
              <div>
                <h1 className="text-[24px] md:text-[28px] font-normal leading-tight text-white mb-2 drop-shadow-md">{data.name}</h1>
                <div className="text-[12px] flex space-x-2 text-[#66c0f4] mb-4">
                  <span>Top Seller</span>
                  <span>New Release</span>
                </div>

                {/* Micro screenshot grid (mock) */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {[1, 2, 3, 4].map(i => (
                    <div className="relative aspect-video bg-gray-800 opacity-60 hover:opacity-100 transition-opacity" key={i}>
                      <Image src={`https://picsum.photos/300/200?random=${100 + i}`} alt="screenshot" fill className="object-cover" />
                    </div>
                  ))}
                </div>
                <div className="text-[14px] text-white font-bold mb-4 line-clamp-2 leading-snug">
                  {data.description || "Experience the ultimate adventure."}
                </div>
              </div>

              <div className="flex flex-col mt-auto">
                <div className="text-[12px] text-gray-400 mb-1">Available Now</div>
                <div className="flex items-center justify-between">
                  <span className="bg-[#1b2838] px-2 py-1 text-[11px] rounded-[2px] border border-white/10 flex items-center space-x-1">
                    <Monitor className="w-3 h-3 text-gray-300" />
                    <Cloud className="w-3 h-3 text-gray-300" />
                  </span>
                  <div className="flex bg-[#000000]/60 p-1 rounded-[2px]">
                    <span className="text-[16px] text-white font-normal px-2 py-0.5">${featuredProduct.price}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {/* ─── SPECIAL OFFERS ─── */}
        {specialOffers.length > 0 && (
          <div className="mb-16">
            <h2 className="text-[14px] text-white font-medium uppercase tracking-widest mb-2 shadow-text">Special Offers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {specialOffers.map((product, idx) => {
                const discount = [40, 60, 75, 80][idx % 4];
                const originalPrice = parseFloat(product.price) / (1 - (discount / 100));

                return (
                  <div key={product.id || idx} data-product-id={product.id} className="group cursor-pointer flex flex-col bg-[#16202d] hover:bg-[#2a475e] transition-colors shadow-lg border border-[#3d4450]/20 active:scale-[0.98]">
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={product.imageUrl}
                        alt={product.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/80 to-transparent" />
                      <div className="absolute bottom-2 left-2 flex space-x-1">
                        <Monitor className="w-3.5 h-3.5 text-white/70 drop-shadow-md" />
                      </div>
                    </div>
                    <div className="p-3 flex flex-col justify-between h-[80px]">
                      <h3 className="text-[13px] font-normal text-white line-clamp-1 truncate">{product.title}</h3>
                      <div className="flex items-center justify-between w-full h-[32px] mt-auto">
                        <div className="text-[10px] text-[#66c0f4] font-medium bg-[#1b2838]/80 px-1 py-0.5 rounded-sm line-clamp-1 max-w-[40%]">
                          Offer ends soon
                        </div>
                        <div className="flex bg-[#4c6b22] h-full items-center pl-2 rounded-[2px] overflow-hidden ml-1">
                          <div className="text-[#beee11] text-[14px] font-bold px-1 py-1 mr-1">-{discount}%</div>
                          <div className="bg-[#000000]/60 flex flex-col items-center justify-center px-2 py-0.5 h-full min-w-[50px]">
                            <span className="text-[10px] text-[#7092a5] line-through font-normal leading-none">${originalPrice.toFixed(2)}</span>
                            <span className="font-normal text-[13px] text-[#beee11] leading-none mt-0.5">${product.price}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* ─── COMMUNITY RECOMMENDED ─── */}
        {communityRecommendations.length > 0 && (
          <div className="mb-16">
            <h2 className="text-[14px] text-white font-medium uppercase tracking-widest mb-2 shadow-text">Community Recommendations</h2>
            <div className="flex flex-col space-y-[4px]">
              {communityRecommendations.map((product, idx) => (
                <div key={product.id || idx} data-product-id={product.id} className="group cursor-pointer bg-[#16202d] hover:bg-[#3d4450] transition-colors shadow-md flex h-[69px] border border-transparent hover:border-[#66c0f4]/30 relative">
                  {/* Left Hero Cap */}
                  <div className="w-[184px] h-full relative shrink-0">
                    <Image src={product.imageUrl} alt={product.title} fill className="object-cover" referrerPolicy="no-referrer" />
                  </div>

                  {/* Info center */}
                  <div className="flex-1 px-4 flex flex-col justify-center">
                    <h3 className="text-[15px] font-normal text-[#c7d5e0] group-hover:text-white mb-1 truncate">{product.title}</h3>
                    <div className="flex items-center space-x-2 text-[12px]">
                      <span className="text-[#4c6b22] font-bold flex items-center">
                        <ThumbsUp className="w-3 h-3 mr-1" /> Very Positive
                      </span>
                      <span className="text-[#626366]">|</span>
                      <span className="text-[#626366] capitalize">{product.category || 'Action'}</span>
                    </div>
                  </div>

                  {/* Right Price Drop */}
                  <div className="w-[150px] flex items-center justify-end pr-4 shrink-0">
                    <div className="bg-[#000000]/40 px-3 py-1 text-white font-normal text-[14px] rounded-[2px] transition-colors group-hover:bg-[#000000]/60">
                      ${product.price}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-2">
              <button className="text-[#66c0f4] hover:text-white text-[12px] border border-[#66c0f4]/30 px-3 py-1 hover:border-white transition-colors">
                See More
              </button>
            </div>
          </div>
        )}

        {/* ─── ALL GAMES WITH PAGINATION ─── */}
        <div className="mb-16">
          <h2 className="text-[14px] text-white font-medium uppercase tracking-widest mb-4 shadow-text">All Games ({totalItems})</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
            {paginatedItems.map((product, idx) => (
              <div key={product.id || idx} data-product-id={product.id} className="group cursor-pointer flex flex-col bg-[#16202d] hover:bg-[#2a475e] transition-colors shadow-lg border border-[#3d4450]/20 active:scale-[0.98]">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    referrerPolicy="no-referrer"
                  />
                  {/* Favorite Button */}
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }}
                    className="absolute top-2 right-2 p-1.5 bg-black/50 rounded-full hover:bg-black/80 transition-colors"
                  >
                    <Heart className={`w-4 h-4 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                  </button>
                </div>
                <div className="p-2 flex flex-col">
                  <h3 className="text-[12px] font-normal text-white line-clamp-1 mb-1">{product.title}</h3>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-[#66c0f4] text-[11px]">${product.price}</span>
                    <button 
                      onClick={(e) => { e.stopPropagation(); addToCart(); }}
                      className="bg-[#5c7e10] hover:bg-[#79a617] text-white text-[10px] px-2 py-1 rounded-sm transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8">
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

      </main>

      {/* ─── FOOTER ─── */}
      <footer className="bg-[#171a21] pt-12 pb-16 border-t border-[#2a475e]">
        <div className="w-full max-w-[940px] xl:max-w-[1100px] mx-auto px-6">

          <div className="flex flex-col md:flex-row items-start justify-between border-b border-[#363c44] pb-8 text-[12px] text-[#8f98a0] font-medium leading-relaxed gap-6">
            <div className="flex flex-col gap-4 max-w-2xl">
              <p className="opacity-80">
                © 2026 {data.logoText || 'GameVault'} Corporation. All rights reserved. All trademarks are property of their respective owners in the US and other countries.<br />
                VAT included in all prices where applicable.
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <span className="text-[#363c44]">|</span>
                <a href="#" className="hover:text-white transition-colors">Legal</a>
                <span className="text-[#363c44]">|</span>
                <a href="#" className="hover:text-white transition-colors">GameVault Subscriber Agreement</a>
                <span className="text-[#363c44]">|</span>
                <a href="#" className="hover:text-white transition-colors">Refunds</a>
                <span className="text-[#363c44]">|</span>
                <a href="#" className="hover:text-white transition-colors">Cookies</a>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer">
              <div className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center mb-2">
                <Gamepad2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-white text-[14px] font-black uppercase tracking-tighter">STEAM</span>
            </div>
          </div>

          <div className="pt-6 flex flex-col md:flex-row items-center justify-start text-[12px] font-bold text-[#c6d4df] gap-x-6 gap-y-3">
            <a href="#" className="hover:text-white transition-colors">About {data.logoText || 'GameVault'}</a>
            <a href="#" className="hover:text-white transition-colors">Jobs</a>
            <a href="#" className="hover:text-white transition-colors">GameVaultworks</a>
            <a href="#" className="hover:text-white transition-colors">GameVault Distribution</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
            <a href="#" className="hover:text-white transition-colors">Gift Cards</a>
            <a href="#" className="hover:text-white transition-colors flex items-center">
              <Facebook className="w-3.5 h-3.5 mr-1 text-[#66c0f4]" /> GameVault
            </a>
            <a href="#" className="hover:text-white transition-colors flex items-center">
              <Twitter className="w-3.5 h-3.5 mr-1 text-[#66c0f4]" /> @gamevault
            </a>
          </div>

        </div>
      </footer>
    </div>
  );
}
