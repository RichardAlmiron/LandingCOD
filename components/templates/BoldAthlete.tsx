'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { StoreData } from '@/lib/types';
import { Search, ShoppingBag, Heart, ArrowRight, CheckCircle2, Star, PlayCircle, MapPin, ChevronLeft, ChevronRight, Menu, Facebook, Twitter, Instagram, ChevronDown, X } from 'lucide-react';
import { usePagination, ProductPagination } from './shared/Pagination';

export default function BoldAthleteTemplate({ data }: { data: StoreData }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlist, setWishlist] = useState<string[]>([]);
  
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

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };
  return (
    <div className="min-h-full bg-white font-sans text-[#111] overflow-x-hidden">

      {/* ─── TOP NAV (Jordan / Converse / Help) ─── */}
      <div className="hidden md:flex bg-[#f5f5f5] h-[36px] px-6 lg:px-10 justify-between items-center z-50 relative">
        <div className="flex items-center space-x-4 h-full">
          {/* Jordan Logo SVG (Simulated) */}
          <a href="#" className="h-full flex items-center px-2 hover:opacity-70 transition-opacity">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
              <path d="M14.5 10c-.8 0-1.5-.7-1.5-1.5T13.7 7t1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5zm6.8 12.2l-.5-.8c-1.1-1.6-1.7-2.6-1.7-2.6l-1.6-4.9-1.3-.9 1-5.6c0-.2-.1-.4-.2-.5l-2.6-2.5.3-.9c.1-.4-.2-.8-.6-.9l-3.2-1.1c-.2-.1-.5 0-.6.2l-.7 1.4-1.2.9-2.9 1 1 1 2.2-1 .7-.4.5.3-1.6 4.3s-.5 2.1-1.6 3.6l-4.7 4.1-1.2 5.5h1.2l.6-3.8 3.5-3.3 1.3 2 .5 5.1h1.2l-.3-4.8 1.4-1.5 2.2 4.1 2.5 2.2h1.6l-1.9-2z" />
            </svg>
          </a>
          {/* Converse Logo SVG (Simulated) */}
          <a href="#" className="h-full flex items-center px-2 hover:opacity-70 transition-opacity">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-[20px] h-[20px]">
              <path d="M12 2L9.2 8.6 2 9.2l5.4 4.6L5.8 21 12 17.3 18.2 21l-1.6-7.2L22 9.2l-7.2-.6L12 2z" strokeWidth="1" stroke="currentColor" />
            </svg>
          </a>
        </div>
        <div className="flex items-center text-[12px] font-medium text-[#111]">
          <a href="#" className="hover:text-gray-500 px-3">Find a Store</a>
          <span className="text-gray-800">|</span>
          <a href="#" className="hover:text-gray-500 px-3">Help</a>
          <span className="text-gray-800">|</span>
          <a href="#" className="hover:text-gray-500 px-3">Join Us</a>
          <span className="text-gray-800">|</span>
          <a href="#" className="hover:text-gray-500 pl-3">Sign In</a>
        </div>
      </div>

      {/* ─── MAIN HEADER ─── */}
      <header className="h-[60px] md:h-[72px] px-4 lg:px-10 flex items-center justify-between sticky top-0 bg-white z-40 transition-transform duration-300">

        {/* Logo (BoldAthlete Swoosh) */}
        <div className="shrink-0 flex items-center h-full hover:opacity-70 transition-opacity cursor-pointer">
          <div className="font-bold text-[36px] tracking-tighter italic uppercase leading-none font-sans" style={{ fontFamily: 'Impact, sans-serif' }}>
            {data.logoText !== 'BoldAthlete' ? data.logoText : (
              <svg aria-hidden="true" className="w-[60px] md:w-[70px] h-auto" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 7.8c-2.7 1.2-5.9 1.4-8 1.4C10 9.2 3.6 5.8.5.5c-1 3.2.1 6.5 2.6 9 3 3 8 4.7 13.9 4.7 2 0 4.1-.2 7-.9z" />
              </svg>
            )}
          </div>
        </div>

        {/* Navigation Categories (Centered) */}
        <nav className="hidden lg:flex items-center space-x-6 h-full font-bold text-[16px]">
          <a href="#" className="hover:border-b-2 border-black pb-1 px-1 mt-1 transition-all h-[24px]">New & Featured</a>
          <a href="#" className="hover:border-b-2 border-black pb-1 px-1 mt-1 transition-all h-[24px]">Men</a>
          <a href="#" className="hover:border-b-2 border-black pb-1 px-1 mt-1 transition-all h-[24px]">Women</a>
          <a href="#" className="hover:border-b-2 border-black pb-1 px-1 mt-1 transition-all h-[24px]">Kids</a>
          <a href="#" className="hover:border-b-2 border-black pb-1 px-1 mt-1 transition-all h-[24px]">Accessories</a>
          <a href="#" className="hover:border-b-2 border-black pb-1 px-1 mt-1 transition-all h-[24px]">Sale</a>
        </nav>

        {/* Right Nav (Search + Icons) */}
        <div className="flex items-center space-x-4 lg:space-x-5 h-full">
          <div className="hidden lg:flex items-center bg-[#f5f5f5] rounded-full px-3 py-2 hover:bg-[#e5e5e5] transition-colors w-[180px] group cursor-text">
            <button className="p-1 rounded-full group-hover:bg-[#d5d5d5] transition-colors mr-1 shrink-0"><Search className="w-5 h-5 text-[#111]" strokeWidth={2.5} /></button>
            <input type="text" placeholder="Search" className="bg-transparent outline-none text-[15px] font-medium w-full text-[#111] placeholder:text-gray-500" />
          </div>

          <button className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"><Search className="w-6 h-6 text-[#111]" strokeWidth={2} /></button>

          <button className="hidden sm:flex p-2 hover:bg-gray-100 rounded-full transition-colors relative" onClick={() => toggleWishlist('header')}>
            <Heart className={`w-6 h-6 text-[#111] ${wishlist.length > 0 ? 'fill-red-500 text-red-500' : ''}`} strokeWidth={2} />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{wishlist.length}</span>
            )}
          </button>

          <button 
            onClick={addToCart}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
          >
            <ShoppingBag className="w-6 h-6 text-[#111]" strokeWidth={2} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{cartCount}</span>
            )}
          </button>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#111]" strokeWidth={2} /> : <Menu className="w-6 h-6 text-[#111]" strokeWidth={2} />}
          </button>
        </div>
      </header>

      <main className="w-full pb-16">

        {/* Promotional Bar (Hello BoldAthlete App) */}
        <div className="bg-[#f5f5f5] w-full py-4 px-4 text-center border-b border-gray-200">
          <h3 className="font-medium text-[15px] mb-1">Look For Store Delivery At Checkout</h3>
          <p className="text-[12px] underline underline-offset-2 cursor-pointer hover:opacity-70">Shop All</p>
        </div>

        {/* ─── HERO CAMPAIGN ─── */}
        <div className="w-full">
          {/* Main Hero Video / Image Placeholder */}
          <div className="w-full h-[60vh] md:h-[80vh] relative mt-2 md:px-12">
            <Image
              src={data.bannerImage}
              alt="Banner"
              fill
              className="object-cover md:object-center top-0 md:rounded-lg"
              referrerPolicy="no-referrer"
              priority
            />
          </div>

          {/* Hero Typography & CTA */}
          <div className="text-center mt-10 md:mt-14 w-full max-w-[1000px] mx-auto px-6 flex flex-col items-center">
            {/* Super bold condensed typography true to BoldAthlete's visual identity */}
            <h1 className="text-[60px] sm:text-[80px] md:text-[110px] font-black uppercase tracking-tighter mb-1 leading-[0.85] font-sans" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
              {data.name}
            </h1>
            <h2 className="text-[60px] sm:text-[80px] md:text-[110px] font-black uppercase tracking-tighter mb-6 leading-[0.85] font-sans" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
              STYLE
            </h2>
            <p className="text-[16px] md:text-[18px] mb-8 font-medium max-w-[600px] leading-relaxed">
              {data.description || "The season's latest gear. Discover lightweight essentials and boundary-pushing designs made to move with you."}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 w-full sm:w-auto">
              <button className="bg-[#111] text-white px-8 py-3.5 rounded-full font-medium hover:bg-gray-800 transition-colors active:scale-95 text-[15px] shadow-sm whitespace-nowrap">
                Shop All
              </button>
              <button className="bg-[#111] text-white px-8 py-3.5 rounded-full font-medium hover:bg-gray-800 transition-colors active:scale-95 text-[15px] shadow-sm whitespace-nowrap">
                Explore New Arrivals
              </button>
            </div>
          </div>
        </div>

        {/* ─── NEW & TRENDING (Horizontal Scroll) ─── */}
        <div className="mt-20 md:mt-24 w-full max-w-[1920px] mx-auto px-4 md:px-12">
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-[24px] font-medium leading-none">Trending</h2>
            <div className="hidden md:flex space-x-2">
              <button className="w-12 h-12 rounded-full bg-[#e5e5e5] flex items-center justify-center hover:bg-[#d5d5d5] transition-colors disabled:opacity-50"><ChevronLeft strokeWidth={2} /></button>
              <button className="w-12 h-12 rounded-full bg-[#e5e5e5] flex items-center justify-center hover:bg-[#d5d5d5] transition-colors"><ChevronRight strokeWidth={2} /></button>
            </div>
          </div>

          {/* Scrollable container with snap */}
          <div className="flex overflow-x-auto gap-4 pb-8 snap-x snap-mandatory hide-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
            {data.products.map((product, idx) => (
              <div key={`boldathlete-scroll-${idx}-${product.id}`} data-product-id={product.id} className="group cursor-pointer shrink-0 w-[80vw] sm:w-[350px] md:w-[400px] lg:w-[450px] snap-center">
                <div className="bg-[#f5f5f5] aspect-[4/5] mb-4 overflow-hidden relative">
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  {product.originalPrice && (
                    <div className="absolute top-4 left-4 font-bold text-[14px]">
                      <span className="bg-white px-3 py-1 text-[#111]">Promo</span>
                    </div>
                  )}
                </div>
                <div className="flex justify-between items-start pt-1">
                  <div className="pr-4 flex flex-col gap-0.5">
                    <h3 className="font-medium text-[#111] text-[16px] md:text-[18px] line-clamp-1">{product.title}</h3>
                    <p className="text-[#707070] text-[16px]">{product.category || "Men's Shoes"}</p>
                    <p className="text-[#707070] text-[16px] mt-1">1 Color</p>
                  </div>
                  <div className="font-medium text-[16px] md:text-[18px] text-right">
                    ${product.price}
                    {product.originalPrice && (
                      <div className="text-[14px] text-gray-500 line-through mt-0.5">${product.originalPrice}</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── FEATURED GRID (Shop By Sport/Gender) ─── */}
        <div className="mt-16 md:mt-24 w-full max-w-[1920px] mx-auto px-4 md:px-12">
          <h2 className="text-[24px] font-medium mb-6">Shop by Classic</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            {[
              { name: 'Air Jordan 1', img: 'https://picsum.photos/600/600?random=40' },
              { name: 'Air Force 1', img: 'https://picsum.photos/600/600?random=41' },
              { name: 'Dunk', img: 'https://picsum.photos/600/600?random=42' },
            ].map((classic, i) => (
              <div key={i} className="relative aspect-square group cursor-pointer overflow-hidden bg-[#f5f5f5]">
                <Image
                  src={classic.img}
                  alt={classic.name}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-[1.02]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-transparent group-hover:bg-black/10 transition-colors"></div>
                <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 z-10">
                  <h3 className="text-white text-[24px] md:text-[28px] font-medium mb-6 drop-shadow-md">{classic.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── ICONIC "JUST DO IT" / LATEST SECTION ─── */}
        <div className="mt-20 md:mt-32 w-full max-w-[1920px] mx-auto px-4 md:px-12">
          <h2 className="text-[24px] font-medium mb-6">The Latest</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            <div className="relative aspect-[4/5] md:aspect-auto md:h-[700px] overflow-hidden group cursor-pointer">
              <Image src="https://picsum.photos/800/1000?random=45" alt="Running" fill className="object-cover" />
              <div className="absolute bottom-10 left-10 md:bottom-12 md:left-12 flex flex-col items-start z-10">
                <p className="text-white text-[16px] font-medium mb-2 drop-shadow-sm">BoldAthlete Running</p>
                <h3 className="text-white text-[48px] md:text-[56px] font-black uppercase tracking-tighter leading-none mb-6 drop-shadow-md">Find Your<br />Fast</h3>
                <button className="bg-white text-black px-6 py-2.5 rounded-full font-medium hover:bg-gray-200 transition-colors">Shop</button>
              </div>
            </div>
            <div className="relative aspect-[4/5] md:aspect-auto md:h-[700px] overflow-hidden group cursor-pointer">
              <Image src="https://picsum.photos/800/1000?random=46" alt="Basketball" fill className="object-cover" />
              <div className="absolute bottom-10 left-10 md:bottom-12 md:left-12 flex flex-col items-start z-10">
                <p className="text-white text-[16px] font-medium mb-2 drop-shadow-sm">BoldAthlete Basketball</p>
                <h3 className="text-white text-[48px] md:text-[56px] font-black uppercase tracking-tighter leading-none mb-6 drop-shadow-md">Own The<br />Court</h3>
                <button className="bg-white text-black px-6 py-2.5 rounded-full font-medium hover:bg-gray-200 transition-colors">Shop</button>
              </div>
            </div>
          </div>
        </div>

        {/* ─── ALL PRODUCTS GRID WITH PAGINATION ─── */}
        <div className="mt-20 md:mt-24 w-full max-w-[1920px] mx-auto px-4 md:px-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[24px] font-medium">All Products ({totalItems})</h2>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
            {paginatedItems.map((product, idx) => (
              <div key={`boldathlete-grid-${idx}-${product.id}`} data-product-id={product.id} className="group cursor-pointer">
                <div className="bg-[#f5f5f5] aspect-square mb-3 overflow-hidden relative">
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
                  />
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
                    className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                  >
                    <Heart className={`w-4 h-4 ${wishlist.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); addToCart(); }}
                    className="absolute bottom-2 right-2 bg-black text-white px-3 py-1.5 rounded-full text-[12px] font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Add to Cart
                  </button>
                </div>
                <h3 className="font-medium text-[#111] text-[14px] line-clamp-1">{product.title}</h3>
                <p className="text-[#707070] text-[14px]">{product.category || "Men's Shoes"}</p>
                <p className="font-medium text-[14px] mt-1">${product.price}</p>
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

        {/* ─── CATEGORY LINKS CAROUSEL ─── */}
        <div className="mt-20 md:mt-24 w-full max-w-[1000px] mx-auto px-4 md:px-0 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-x-8 gap-y-10 justify-items-center sm:justify-items-start">
            <div className="flex flex-col text-center sm:text-left">
              <h4 className="font-medium text-[16px] mb-6">Icons</h4>
              <ul className="space-y-4 text-[16px] text-gray-500 font-medium flex flex-col">
                <li><a href="#" className="hover:text-black">Air Force 1</a></li>
                <li><a href="#" className="hover:text-black">Huarache</a></li>
                <li><a href="#" className="hover:text-black">Air Max 90</a></li>
                <li><a href="#" className="hover:text-black">Air Max 95</a></li>
                <li><a href="#" className="hover:text-black">Air Max 97</a></li>
                <li><a href="#" className="hover:text-black">Air Max 270</a></li>
                <li><a href="#" className="hover:text-black">Air Max 720</a></li>
                <li><a href="#" className="hover:text-black">All Air Max</a></li>
                <li><a href="#" className="hover:text-black">Vapormax</a></li>
              </ul>
            </div>
            <div className="flex flex-col text-center sm:text-left">
              <h4 className="font-medium text-[16px] mb-6">Shoes</h4>
              <ul className="space-y-4 text-[16px] text-gray-500 font-medium flex flex-col">
                <li><a href="#" className="hover:text-black">All Shoes</a></li>
                <li><a href="#" className="hover:text-black">Custom Shoes</a></li>
                <li><a href="#" className="hover:text-black">Jordan Shoes</a></li>
                <li><a href="#" className="hover:text-black">Running Shoes</a></li>
                <li><a href="#" className="hover:text-black">Basketball Shoes</a></li>
                <li><a href="#" className="hover:text-black">Football Shoes</a></li>
                <li><a href="#" className="hover:text-black">Gym & Training Shoes</a></li>
                <li><a href="#" className="hover:text-black">Lifestyle Shoes</a></li>
              </ul>
            </div>
            <div className="flex flex-col text-center sm:text-left">
              <h4 className="font-medium text-[16px] mb-6">Clothing</h4>
              <ul className="space-y-4 text-[16px] text-gray-500 font-medium flex flex-col">
                <li><a href="#" className="hover:text-black">All Clothing</a></li>
                <li><a href="#" className="hover:text-black">Modest Wear</a></li>
                <li><a href="#" className="hover:text-black">Hoodies & Pullovers</a></li>
                <li><a href="#" className="hover:text-black">Shirts & Tops</a></li>
                <li><a href="#" className="hover:text-black">Jackets</a></li>
                <li><a href="#" className="hover:text-black">Compression & BoldAthlete Pro</a></li>
                <li><a href="#" className="hover:text-black">Trousers & Leggings</a></li>
                <li><a href="#" className="hover:text-black">Shorts</a></li>
              </ul>
            </div>
            <div className="flex flex-col text-center sm:text-left">
              <h4 className="font-medium text-[16px] mb-6">Kids'</h4>
              <ul className="space-y-4 text-[16px] text-gray-500 font-medium flex flex-col">
                <li><a href="#" className="hover:text-black">Infant & Toddler Shoes</a></li>
                <li><a href="#" className="hover:text-black">Kids' Shoes</a></li>
                <li><a href="#" className="hover:text-black">Kids' Jordan Shoes</a></li>
                <li><a href="#" className="hover:text-black">Kids' Basketball Shoes</a></li>
                <li><a href="#" className="hover:text-black">Kids' Running Shoes</a></li>
                <li><a href="#" className="hover:text-black">Kids' Clothing</a></li>
                <li><a href="#" className="hover:text-black">Kids' Backpacks</a></li>
                <li><a href="#" className="hover:text-black">Kids' Socks</a></li>
              </ul>
            </div>
          </div>
        </div>

      </main>

      {/* ─── BLACK FOOTER ─── */}
      <footer className="bg-[#111] text-white pt-10 pb-4 text-[12px] font-medium leading-none">
        <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-12 mb-12">

          <div className="col-span-1 space-y-5 lg:col-span-1">
            <h4 className="uppercase font-bold tracking-[0.05em] text-[14px] cursor-pointer hover:opacity-75">Resources</h4>
            <ul className="space-y-4 flex flex-col text-[#7E7E7E]">
              <li><a href="#" className="hover:text-white transition-colors">Gift Cards</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Find a Store</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Become a Member</a></li>
              <li><a href="#" className="hover:text-white transition-colors">BoldAthlete x NBA</a></li>
              <li><a href="#" className="hover:text-white transition-colors">BoldAthlete Journal</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Site Feedback</a></li>
            </ul>
          </div>

          <div className="col-span-1 space-y-5 lg:col-span-1">
            <h4 className="uppercase font-bold tracking-[0.05em] text-[14px] cursor-pointer hover:opacity-75">Help</h4>
            <ul className="space-y-4 flex flex-col text-[#7E7E7E]">
              <li><a href="#" className="hover:text-white transition-colors">Get Help</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Order Status</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shipping and Delivery</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Order Cancellation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Payment Options</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Gift Card Balance</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div className="col-span-1 space-y-5 lg:col-span-1">
            <h4 className="uppercase font-bold tracking-[0.05em] text-[14px] cursor-pointer hover:opacity-75">Company</h4>
            <ul className="space-y-4 flex flex-col text-[#7E7E7E]">
              <li><a href="#" className="hover:text-white transition-colors">About BoldAthlete</a></li>
              <li><a href="#" className="hover:text-white transition-colors">News</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Investors</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Purpose</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sustainability</a></li>
            </ul>
          </div>

          <div className="col-span-1 space-y-5 lg:col-span-1">
            <h4 className="uppercase font-bold tracking-[0.05em] text-[14px] cursor-pointer hover:opacity-75">Promotions & Discounts</h4>
            <ul className="space-y-4 flex flex-col text-[#7E7E7E]">
              <li><a href="#" className="hover:text-white transition-colors">Student</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Military</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Teacher</a></li>
              <li><a href="#" className="hover:text-white transition-colors">First Responders & Medical Professionals</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Birthday</a></li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-4 lg:col-span-2 flex lg:justify-end gap-4 mt-6 md:mt-0">
            <a href="#" className="w-[30px] h-[30px] bg-[#7E7E7E] rounded-full flex items-center justify-center text-[#111] hover:bg-white transition-colors"><Twitter className="w-4 h-4 fill-current" /></a>
            <a href="#" className="w-[30px] h-[30px] bg-[#7E7E7E] rounded-full flex items-center justify-center text-[#111] hover:bg-white transition-colors"><Facebook className="w-4 h-4 fill-current" /></a>
            <a href="#" className="w-[30px] h-[30px] bg-[#7E7E7E] rounded-full flex items-center justify-center text-[#111] hover:bg-white transition-colors"><PlayCircle className="w-4 h-4 fill-current" /></a>
            <a href="#" className="w-[30px] h-[30px] bg-[#7E7E7E] rounded-full flex items-center justify-center text-[#111] hover:bg-white transition-colors"><Instagram className="w-4 h-4" /></a>
          </div>
        </div>

        <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-start md:items-end mt-16 pt-6 gap-y-4">
          <div className="flex items-center space-x-4">
            <a href="#" className="text-white hover:opacity-70 flex items-center"><MapPin className="w-[14px] h-[14px] mr-1 mb-0.5" /> United States</a>
            <span className="text-[#7E7E7E]">© 2026 BoldAthlete, Inc. All Rights Reserved</span>
          </div>

          <ul className="flex flex-wrap gap-x-6 gap-y-3 text-[#7E7E7E]">
            <li><a href="#" className="hover:text-white cursor-pointer select-none">Guides</a> <ChevronDown className="w-3 h-3 inline ml-0.5 mb-0.5" /></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms of Sale</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms of Use</a></li>
            <li><a href="#" className="hover:text-white transition-colors">BoldAthlete Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Your Privacy Choices</a></li>
            <li><a href="#" className="hover:text-white transition-colors">CA Supply Chains Act</a></li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
