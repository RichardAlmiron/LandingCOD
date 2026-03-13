'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { StoreData } from '@/lib/types';
import { Search, ShoppingBag, Menu, ArrowRight, MapPin, Phone, Mail, Instagram, Twitter, Youtube, Facebook, ChevronDown, Heart, X } from 'lucide-react';
import { usePagination, ProductPagination } from './shared/Pagination';

export default function ItalianCraftTemplate({ data }: { data: StoreData }) {
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
    <div className="min-h-full bg-[#f4f2eb] font-sans text-[#1a1a1a] overflow-x-hidden selection:bg-[#1b3c35] selection:text-[#f4f2eb]">

      {/* ─── TOP PROMO BAR ─── */}
      <div className="bg-[#1b3c35] text-white text-[11px] text-center py-2.5 tracking-widest uppercase font-medium">
        Complimentary Shipping & Returns
      </div>

      {/* ─── HEADER ─── */}
      <header className="sticky top-0 z-50 bg-[#f4f2eb] border-b border-[#e5e5e5] transition-transform">
        <div className="w-full mx-auto px-4 md:px-8 h-[60px] md:h-[80px] flex items-center justify-between">

          <div className="flex items-center space-x-6 w-1/3">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex flex-col space-y-[4px] hover:opacity-70 transition-opacity"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : (
                <>
                  <span className="block h-[1.5px] bg-black w-6"></span>
                  <span className="block h-[1.5px] bg-black w-6"></span>
                  <span className="block h-[1.5px] bg-black w-6"></span>
                </>
              )}
            </button>
            <button className="hidden md:block hover:opacity-70 transition-opacity">
              <Search className="w-[22px] h-[22px]" strokeWidth={1.5} />
            </button>
          </div>

          <div className="flex justify-center w-1/3 cursor-pointer hover:opacity-80 transition-opacity">
            {/* Elegant Serif Logo for ItalianCraft */}
            <div className="font-serif text-[32px] md:text-[44px] tracking-[0.1em] uppercase leading-none" style={{ fontFamily: "'Times New Roman', Times, serif" }}>
              {data.logoText !== 'ItalianCraft' ? data.logoText : 'ItalianCraft'}
            </div>
          </div>

          <div className="flex items-center justify-end space-x-6 w-1/3">
            <a href="#" className="text-[12px] hidden md:block hover:underline underline-offset-4 uppercase tracking-widest font-medium">Sign In</a>
            <button 
              onClick={() => toggleFavorite('header')}
              className="hidden sm:block hover:opacity-70 transition-opacity relative"
            >
              <Heart className={`w-[22px] h-[22px] ${favorites.length > 0 ? 'fill-red-500 text-red-500' : ''}`} strokeWidth={1.5} />
              {favorites.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{favorites.length}</span>
              )}
            </button>
            <button 
              onClick={addToCart}
              className="hover:opacity-70 transition-opacity relative"
            >
              <ShoppingBag className="w-[22px] h-[22px]" strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#1b3c35] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{cartCount}</span>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="w-full">

        {/* ─── HERO CAMPAIGN (Editorial Full Bleed) ─── */}
        <div className="relative h-[85vh] md:h-[95vh] w-full overflow-hidden cursor-pointer group">
          <Image
            src={data.bannerImage}
            alt="Campaign"
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-[2000ms] ease-out"
            referrerPolicy="no-referrer"
            priority
          />
          <div className="absolute inset-0 bg-black/15 flex flex-col items-center justify-end pb-24 text-white">
            <div className="text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
              <h2 className="text-[40px] md:text-[80px] font-serif mb-4 leading-none tracking-tight">
                {data.name}
              </h2>
              <p className="text-[14px] md:text-[16px] mb-8 font-sans font-normal tracking-wide text-center max-w-xl">
                {data.description || "The new collection is a narrative of elegance and heritage, designed for the modern era."}
              </p>
              <button className="bg-white text-black px-10 py-4 text-[11px] md:text-[12px] uppercase tracking-[0.2em] font-medium hover:bg-black hover:text-white transition-colors duration-500 ease-in-out">
                Discover the Collection
              </button>
            </div>
          </div>
        </div>

        {/* ─── SUBTLE EDITORIAL SECTION ─── */}
        <div className="w-full px-6 py-20 text-center bg-[#f4f2eb]">
          <h3 className="text-[13px] uppercase tracking-[0.2em] font-medium mb-4 text-[#666]">LATEST ARRIVALS</h3>
          <p className="font-serif text-[24px] md:text-[36px] max-w-3xl mx-auto leading-relaxed">
            A curation of exceptional pieces blending archival motifs with contemporary vision.
          </p>
        </div>

        {/* ─── PRODUCT GRID (Luxurious Spacing, Soft Backgrounds) ─── */}
        <div className="w-full max-w-[1920px] mx-auto px-4 md:px-12 pb-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-2 md:gap-x-4 gap-y-16">
            {data.products.map((product) => (
              <div key={product.id} data-product-id={product.id} className="group cursor-pointer flex flex-col">
                <div className="relative aspect-[3/4] mb-4 overflow-hidden bg-[#f4f2eb]">
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-[1000ms]"
                    referrerPolicy="no-referrer"
                  />
                  {/* Favorite Button */}
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }}
                    className="absolute top-3 right-3 p-2 bg-white/80 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Heart className={`w-4 h-4 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-black'}`} strokeWidth={1.5} />
                  </button>
                  {/* Add to Cart */}
                  <button 
                    onClick={(e) => { e.stopPropagation(); addToCart(); }}
                    className="absolute bottom-3 left-3 right-3 bg-[#1b3c35] text-[#f4f2eb] py-2 text-[11px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Add to Bag
                  </button>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-gray-500 mb-1">{product.category || "Women's Collection"}</span>
                  <h4 className="text-[13px] md:text-[14px] font-sans font-medium mb-1 group-hover:underline underline-offset-4">{product.title}</h4>
                  <div className="flex items-center justify-between mt-auto pt-2">
                    <span className="text-[13px] font-sans tracking-wide text-[#666]">
                      ${product.price}
                    </span>
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
        </div>

        {/* ─── ASYMMETRIC EDITORIAL BLOCK ─── */}
        <div className="w-full bg-[#1b3c35] text-[#f4f2eb] relative">
          <div className="flex flex-col md:flex-row min-h-[70vh]">
            <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-24 py-16 md:py-0 order-2 md:order-1">
              <h3 className="text-[32px] md:text-[48px] font-serif mb-6 leading-tight">The Art of<br />Craftsmanship</h3>
              <p className="font-sans font-light text-[14px] md:text-[15px] leading-relaxed mb-10 opacity-80 max-w-md text-justify">
                Explore the heritage and meticulous attention to detail that defines our latest collection. Every piece tells a story of tradition meeting contemporary vision, crafted in Italy with the finest materials.
              </p>
              <button className="border border-[#f4f2eb] px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] w-fit hover:bg-[#f4f2eb] hover:text-[#1b3c35] transition-colors duration-500">
                Read the Story
              </button>
            </div>
            <div className="w-full md:w-1/2 relative h-[50vh] md:h-auto order-1 md:order-2 overflow-hidden group cursor-pointer">
              <Image src="https://picsum.photos/1000/1200?random=260" alt="Craftsmanship" fill className="object-cover group-hover:scale-105 transition-transform duration-[2000ms]" />
            </div>
          </div>
        </div>

        {/* ─── COLLECTION CAROUSEL (Floating Cards) ─── */}
        <div className="w-full mx-auto px-4 md:px-12 py-24 bg-[#f4f2eb]">
          <div className="text-center mb-16">
            <h3 className="text-[28px] md:text-[36px] font-serif mb-6">Explore the Collections</h3>
          </div>

          <div className="flex overflow-x-auto gap-4 md:gap-6 pb-8 snap-x hide-scrollbar px-4 lg:px-0 lg:grid lg:grid-cols-4 lg:justify-center">
            {[
              { name: 'Handbags', img: 'https://picsum.photos/600/800?random=270' },
              { name: 'Ready-to-Wear', img: 'https://picsum.photos/600/800?random=271' },
              { name: 'Shoes', img: 'https://picsum.photos/600/800?random=272' },
              { name: 'Jewelry & Watches', img: 'https://picsum.photos/600/800?random=273' },
            ].map((category, i) => (
              <div key={i} className="group cursor-pointer relative overflow-hidden aspect-[3/4] shrink-0 w-[75vw] sm:w-[350px] lg:w-auto snap-center shadow-md">
                <Image src={category.img} alt={category.name} fill className="object-cover group-hover:scale-105 transition-transform duration-[1500ms] ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-80" />
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-12">
                  <h4 className="text-white text-[20px] md:text-[24px] font-serif text-center px-4 mb-4 drop-shadow-md">{category.name}</h4>
                  <span className="text-white text-[11px] tracking-[0.2em] border-b border-transparent group-hover:border-white pb-1 transition-all uppercase">Discover</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── THE HOUSE (ItalianCraft Equilibrium style) ─── */}
        <div className="relative h-[70vh] w-full overflow-hidden group cursor-pointer">
          <Image src="https://picsum.photos/1920/1080?random=274" alt="The House" fill className="object-cover group-hover:scale-105 transition-transform duration-[2000ms]" />
          <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-[#f4f2eb] text-center px-6">
            <h2 className="text-[40px] md:text-[64px] font-serif mb-6">ItalianCraft Equilibrium</h2>
            <p className="text-[14px] md:text-[16px] mb-10 font-sans font-light tracking-wide max-w-2xl px-4 text-justify md:text-center leading-relaxed">
              Our commitment to generate positive change for people and our planet. Discover our journey towards a more sustainable and inclusive future.
            </p>
            <button className="border border-[#f4f2eb] px-10 py-3.5 text-[11px] tracking-[0.2em] uppercase hover:bg-[#f4f2eb] hover:text-[#1a1a1a] transition-colors duration-500 backdrop-blur-sm">
              Discover More
            </button>
          </div>
        </div>

        {/* ─── CLIENT SERVICES (Elegant grid layout) ─── */}
        <div className="bg-[#f4f2eb] py-24 px-6 md:px-12 border-b border-[#e5e5e5]">
          <div className="w-full max-w-[1440px] mx-auto text-center">
            <h3 className="text-[13px] uppercase tracking-[0.2em] font-medium mb-16 text-[#666]">ItalianCraft Services</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16">

              <div className="flex flex-col items-center text-center">
                <ShoppingBag className="w-8 h-8 mb-6 text-[#1a1a1a] stroke-[1]" />
                <h4 className="text-[14px] font-serif mb-3 tracking-wide">Complimentary Shipping</h4>
                <p className="text-[13px] font-sans font-light text-gray-600 leading-relaxed max-w-xs">
                  Enjoy free shipping and returns on all orders. Next-day delivery available in select areas.
                </p>
                <a href="#" className="mt-4 text-[11px] uppercase tracking-[0.1em] border-b border-black pb-0.5 hover:text-gray-500">Learn More</a>
              </div>

              <div className="flex flex-col items-center text-center">
                <Phone className="w-8 h-8 mb-6 text-[#1a1a1a] stroke-[1]" />
                <h4 className="text-[14px] font-serif mb-3 tracking-wide">Client Advisors</h4>
                <p className="text-[13px] font-sans font-light text-gray-600 leading-relaxed max-w-xs">
                  Our Client Advisors are available to assist you with styling advice and product information.
                </p>
                <a href="#" className="mt-4 text-[11px] uppercase tracking-[0.1em] border-b border-black pb-0.5 hover:text-gray-500">Contact Us</a>
              </div>

              <div className="flex flex-col items-center text-center">
                <MapPin className="w-8 h-8 mb-6 text-[#1a1a1a] stroke-[1]" />
                <h4 className="text-[14px] font-serif mb-3 tracking-wide">In-Store Appointments</h4>
                <p className="text-[13px] font-sans font-light text-gray-600 leading-relaxed max-w-xs">
                  Book a private appointment at your nearest boutique for a personalized shopping experience.
                </p>
                <a href="#" className="mt-4 text-[11px] uppercase tracking-[0.1em] border-b border-black pb-0.5 hover:text-gray-500">Book Now</a>
              </div>

            </div>
          </div>
        </div>

      </main>

      {/* ─── FOOTER (ItalianCraft Dark Mode) ─── */}
      <footer className="bg-[#1a1a1a] text-white pt-24 pb-12 font-sans selection:bg-[#f4f2eb] selection:text-[#1b3c35]">
        <div className="w-full max-w-[1920px] mx-auto px-8 md:px-12">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-16 gap-x-8 mb-24">

            <div className="flex flex-col space-y-5">
              <h4 className="text-[11px] tracking-[0.2em] uppercase text-[#999] mb-2 font-medium">Exclusive Services</h4>
              <a href="#" className="text-[13px] font-light text-[#ccc] hover:text-white transition-colors">Complimentary Shipping & Returns</a>
              <a href="#" className="text-[13px] font-light text-[#ccc] hover:text-white transition-colors">ItalianCraft Services</a>
              <a href="#" className="text-[13px] font-light text-[#ccc] hover:text-white transition-colors">Book an Appointment</a>
              <a href="#" className="text-[13px] font-light text-[#ccc] hover:text-white transition-colors">Collect In-Store</a>
            </div>

            <div className="flex flex-col space-y-5">
              <h4 className="text-[11px] tracking-[0.2em] uppercase text-[#999] mb-2 font-medium">Need Help?</h4>
              <a href="#" className="text-[13px] font-light text-[#ccc] hover:text-white transition-colors">Contact Us</a>
              <a href="#" className="text-[13px] font-light text-[#ccc] hover:text-white transition-colors">FAQs</a>
              <a href="#" className="text-[13px] font-light text-[#ccc] hover:text-white transition-colors">Track Order</a>
              <a href="#" className="text-[13px] font-light text-[#ccc] hover:text-white transition-colors">Returns & Exchanges</a>
            </div>

            <div className="flex flex-col space-y-5">
              <h4 className="text-[11px] tracking-[0.2em] uppercase text-[#999] mb-2 font-medium">The Company</h4>
              <a href="#" className="text-[13px] font-light text-[#ccc] hover:text-white transition-colors">About ItalianCraft</a>
              <a href="#" className="text-[13px] font-light text-[#ccc] hover:text-white transition-colors">ItalianCraft Equilibrium</a>
              <a href="#" className="text-[13px] font-light text-[#ccc] hover:text-white transition-colors">Code of Ethics</a>
              <a href="#" className="text-[13px] font-light text-[#ccc] hover:text-white transition-colors">Careers</a>
            </div>

            <div className="flex flex-col">
              <h4 className="text-[11px] tracking-[0.2em] uppercase text-[#999] mb-6 font-medium">Sign Up for ItalianCraft Updates</h4>
              <p className="text-[13px] font-light text-[#ccc] mb-6">By entering your email address below, you consent to receiving our newsletter with access to our latest collections, events and initiatives.</p>

              <div className="flex border-b border-[#555] pb-2 group focus-within:border-white transition-colors">
                <input type="email" placeholder="Email Address" className="bg-transparent outline-none w-full text-[13px] text-white placeholder-gray-500" />
                <button className="hover:opacity-70 transition-opacity"><ArrowRight className="w-5 h-5 text-white" strokeWidth={1.5} /></button>
              </div>

              <h4 className="text-[11px] tracking-[0.2em] uppercase text-[#999] mb-6 mt-12 font-medium">Find Us On</h4>
              <div className="flex space-x-6">
                <a href="#" className="text-white hover:text-[#999] transition-colors"><Instagram className="w-[18px] h-[18px]" /></a>
                <a href="#" className="text-white hover:text-[#999] transition-colors"><Twitter className="w-[18px] h-[18px]" /></a>
                <a href="#" className="text-white hover:text-[#999] transition-colors"><Youtube className="w-[18px] h-[18px]" /></a>
                <a href="#" className="text-white hover:text-[#999] transition-colors"><Facebook className="w-[18px] h-[18px]" /></a>
              </div>
            </div>

          </div>

          <div className="pt-10 border-t border-[#333] flex flex-col md:flex-row items-center justify-between text-[11px] font-medium text-[#999] tracking-widest gap-y-6">
            <span className="mb-4 md:mb-0">© 2026 ItalianCraftO ItalianCraft S.P.A. ALL RIGHTS RESERVED.</span>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
              <a href="#" className="hover:text-white transition-colors">Corporate Information</a>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
