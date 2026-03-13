'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { StoreData } from '@/lib/types';
import { Search, ShoppingBag, User, MapPin, Menu, ChevronRight, Gift, Phone, Clock, ShieldCheck, ArrowRight, Play, Heart, X } from 'lucide-react';
import { usePagination, ProductPagination } from './shared/Pagination';

export default function MaisonEleganceTemplate({ data }: { data: StoreData }) {
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
    <div className="min-h-full bg-white font-serif text-[#1a1a1a] overflow-x-hidden selection:bg-[#bc001b] selection:text-white" style={{ fontFamily: "'Brilliant Cut Pro', 'Times New Roman', Times, serif" }}>

      {/* ─── HEADER (Elegant, centered logo, gold & red touches) ─── */}
      <header className="bg-white sticky top-0 z-50 border-b border-[#e5e5e5] transition-transform">
        {/* Top utility bar - typically very thin */}
        <div className="w-full bg-[#f8f8f8] text-[#555] text-[9px] md:text-[10px] text-center py-1.5 tracking-[0.2em] font-sans uppercase">
          Complimentary Delivery & Returns
        </div>

        <div className="w-full mx-auto px-4 md:px-8 h-[60px] md:h-[80px] flex items-center justify-between">

          <div className="flex items-center space-x-6 md:space-x-8 w-1/3">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex lg:hidden flex-col space-y-[4px] hover:text-[#bc001b] transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : (
                <>
                  <span className="block h-[1px] bg-current w-5"></span>
                  <span className="block h-[1px] bg-current w-5"></span>
                  <span className="block h-[1px] bg-current w-5"></span>
                </>
              )}
            </button>
            <nav className="hidden lg:flex space-x-8 font-sans text-[10px] font-medium uppercase tracking-[0.15em] text-[#1a1a1a]">
              <a href="#" className="hover:text-[#bc001b] transition-colors pb-1 border-b border-transparent hover:border-[#bc001b]">High Jewelry</a>
              <a href="#" className="hover:text-[#bc001b] transition-colors pb-1 border-b border-transparent hover:border-[#bc001b]">Jewelry</a>
              <a href="#" className="hover:text-[#bc001b] transition-colors pb-1 border-b border-transparent hover:border-[#bc001b]">Watches</a>
              <a href="#" className="hover:text-[#bc001b] transition-colors pb-1 border-b border-transparent hover:border-[#bc001b]">Gifts</a>
            </nav>
          </div>

          <div className="flex items-center justify-center cursor-pointer flex-shrink-0 w-1/3 text-center">
            {/* MaisonElegance Logo: Extremely elegant italic serif */}
            <div className="font-serif text-[28px] md:text-[40px] tracking-widest leading-none text-[#bc001b] italic pr-2 drop-shadow-sm">
              {data.logoText !== 'MaisonElegance' ? data.logoText : 'MaisonElegance'}
            </div>
          </div>

          <div className="flex items-center justify-end space-x-5 md:space-x-6 text-[#1a1a1a] w-1/3">
            <button className="hover:text-[#bc001b] transition-colors"><Search className="w-[18px] h-[18px]" strokeWidth={1} /></button>
            <button className="hidden md:block hover:text-[#bc001b] transition-colors"><User className="w-[18px] h-[18px]" strokeWidth={1} /></button>
            <button className="hidden sm:block hover:text-[#bc001b] transition-colors"><MapPin className="w-[18px] h-[18px]" strokeWidth={1} /></button>
            <button 
              onClick={() => toggleFavorite('header')}
              className="hover:text-[#bc001b] transition-colors relative"
            >
              <Heart className={`w-[18px] h-[18px] ${favorites.length > 0 ? 'fill-[#bc001b] text-[#bc001b]' : ''}`} strokeWidth={1} />
              {favorites.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#bc001b] text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{favorites.length}</span>
              )}
            </button>
            <button 
              onClick={addToCart}
              className="hover:text-[#bc001b] transition-colors relative"
            >
              <ShoppingBag className="w-[18px] h-[18px]" strokeWidth={1} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#bc001b] text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{cartCount}</span>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="w-full">

        {/* ─── GRAND HERO BANNER ─── */}
        <div className="relative h-[70vh] md:h-[85vh] w-full group cursor-pointer overflow-hidden bg-[#f9f9f9]">
          <Image
            src={data.bannerImage}
            alt="Banner"
            fill
            className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-[3000ms] ease-out brightness-95"
            referrerPolicy="no-referrer"
            priority
          />
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 md:pb-24 text-white text-center px-4 z-10">
            <h1 className="text-[36px] md:text-[56px] font-serif mb-4 leading-tight drop-shadow-lg italic font-normal tracking-wide">
              {data.name}
            </h1>
            <p className="text-[12px] md:text-[14px] font-sans font-medium uppercase tracking-[0.25em] mb-10 drop-shadow-md max-w-2xl">
              {data.description || "The magic of the red box."}
            </p>
            <div className="flex gap-4">
              <button className="bg-white text-[#1a1a1a] px-12 py-3.5 font-sans font-bold uppercase text-[10px] tracking-[0.2em] hover:bg-[#bc001b] hover:text-white hover:border-[#bc001b] border border-white transition-all duration-300">
                Discover
              </button>
            </div>
          </div>
        </div>

        {/* ─── ICONIC CREATIONS (Paginated 3x5) ─── */}
        <div className="w-full max-w-[1920px] mx-auto pt-24 pb-16 md:pt-32 md:pb-24 px-4 md:px-10">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-[28px] md:text-[36px] font-serif text-[#1a1a1a] mb-6 italic tracking-wide">Iconic Creations ({totalItems})</h2>
            <div className="w-16 h-[1px] bg-[#c1a673] mx-auto"></div>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-x-3 gap-y-8">
            {paginatedItems.map((product, idx) => (
              <div key={product.id || idx} data-product-id={product.id} className="group cursor-pointer flex flex-col items-center text-center">
                <div className="relative aspect-square w-full mb-4 overflow-hidden bg-[#fcfcfc] border border-transparent group-hover:border-[#eaeaea] transition-all duration-500 shadow-sm group-hover:shadow-md">
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    fill
                    className="object-contain p-4 group-hover:scale-110 transition-transform duration-[2000ms] mix-blend-darken"
                    referrerPolicy="no-referrer"
                  />
                  {/* Favorite Button */}
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }}
                    className="absolute top-3 right-3 p-2 bg-white/80 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Heart className={`w-4 h-4 ${favorites.includes(product.id) ? 'fill-[#bc001b] text-[#bc001b]' : 'text-[#1a1a1a]'}`} strokeWidth={1} />
                  </button>
                  {/* Subtle 'New' or 'Exclusive' tag */}
                  {product.originalPrice && (
                    <div className="absolute top-3 left-3 bg-[#bc001b] text-white text-[8px] px-2 py-1 font-sans font-bold tracking-widest uppercase">
                      Novelty
                    </div>
                  )}
                  {/* Add to Cart */}
                  <button 
                    onClick={(e) => { e.stopPropagation(); addToCart(); }}
                    className="absolute bottom-0 left-0 right-0 bg-[#1a1a1a] text-white py-2 text-[9px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Add to Cart
                  </button>
                </div>
                <div className="flex flex-col space-y-1 px-1 w-full">
                  <div className="text-[8px] font-sans font-medium uppercase tracking-[0.2em] text-[#888]">{product.category || 'Jewelry'}</div>
                  <h3 className="text-[12px] md:text-[13px] font-serif text-[#1a1a1a] leading-snug group-hover:text-[#bc001b] transition-colors">{product.title}</h3>
                  <div className="pt-1">
                    <span className="font-sans font-medium text-[10px] md:text-[11px] tracking-widest text-[#1a1a1a]">${product.price}</span>
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

        {/* ─── FULL WIDTH EDITORIAL (Deep Red Background) ─── */}
        <div className="w-full bg-[#530000] text-white py-24 md:py-32">
          <div className="max-w-[1920px] mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20 px-4 md:px-12">
            <div className="w-full lg:w-1/2 aspect-[4/3] relative overflow-hidden group cursor-pointer shadow-2xl">
              <Image src="https://picsum.photos/1000/800?random=190" alt="High Jewelry" fill className="object-cover group-hover:scale-[1.03] transition-transform duration-[3000ms]" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors">
                <Play className="w-[70px] h-[70px] text-white opacity-80 group-hover:scale-110 transition-all duration-500 stroke-[1]" />
              </div>
            </div>
            <div className="w-full lg:w-1/2 flex flex-col items-center text-center lg:items-start lg:text-left">
              <h2 className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-[#c1a673] mb-4">Savoir-Faire</h2>
              <h3 className="text-[32px] md:text-[44px] font-serif mb-6 italic tracking-wide">High Jewelry Collection</h3>
              <p className="text-[14px] font-sans font-light leading-relaxed text-gray-200 mb-10 max-w-lg">
                Discover the extraordinary creations of MaisonElegance High Jewelry. A unique blend of exceptional stones, masterful craftsmanship, and visionary design that transcends time. The ultimate expression of the Maison's style.
              </p>
              <button className="border border-white text-white px-10 py-3.5 font-sans font-bold uppercase text-[10px] tracking-[0.2em] hover:bg-white hover:text-[#530000] transition-all duration-300">
                Explore the Collection
              </button>
            </div>
          </div>
        </div>

        {/* ─── THE MAISON MaisonElegance (3 pillars) ─── */}
        <div className="w-full max-w-[1920px] mx-auto py-24 md:py-32 px-4 md:px-10">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-[28px] md:text-[36px] font-serif text-[#1a1a1a] mb-6 italic tracking-wide">The Maison MaisonElegance</h2>
            <div className="w-16 h-[1px] bg-[#c1a673] mx-auto mb-10"></div>
            <p className="text-[13px] md:text-[14px] font-sans font-light leading-relaxed text-[#555] max-w-3xl mx-auto">
              Since 1847, MaisonElegance has been synonymous with luxury, elegance, and exceptional craftsmanship. From the iconic panther to the timeless Love bracelet, our creations are a testament to our enduring legacy of creativity and innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              { title: "Our History", img: "https://picsum.photos/600/800?random=191" },
              { title: "Savoir-Faire", img: "https://picsum.photos/600/800?random=192" },
              { title: "Our Commitments", img: "https://picsum.photos/600/800?random=193" },
            ].map((pillar, idx) => (
              <div key={idx} className="flex flex-col items-center group cursor-pointer">
                <div className="w-full aspect-[3/4] overflow-hidden mb-6 relative">
                  <Image src={pillar.img} alt={pillar.title} fill className="object-cover group-hover:scale-105 transition-transform duration-[2000ms]" />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors duration-500" />
                </div>
                <h3 className="text-[18px] md:text-[20px] font-serif text-[#1a1a1a] mb-3 italic">{pillar.title}</h3>
                <span className="text-[9px] font-sans font-bold uppercase tracking-[0.2em] text-[#888] group-hover:text-[#bc001b] transition-colors flex items-center border-b border-transparent group-hover:border-[#bc001b] pb-0.5">
                  Discover <ChevronRight className="w-3 h-3 ml-1" strokeWidth={2} />
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ─── SERVICES (Detailed, elegant borders) ─── */}
        <div className="w-full bg-[#f9f9f9] py-24 md:py-32 px-4 md:px-10 border-t border-[#eaeaea]">
          <div className="max-w-[1920px] mx-auto">
            <div className="text-center mb-16 md:mb-20">
              <h2 className="text-[28px] md:text-[32px] font-serif text-[#1a1a1a] mb-6 italic tracking-wide">MaisonElegance Services</h2>
              <div className="w-16 h-[1px] bg-[#c1a673] mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">

              <div className="flex flex-col items-center text-center p-10 bg-white border border-[#eaeaea] hover:border-[#c1a673] transition-colors duration-500 cursor-pointer group shadow-sm hover:shadow-md">
                <Gift className="w-10 h-10 text-[#1a1a1a] mb-8 stroke-[1] group-hover:text-[#bc001b] transition-colors" />
                <h3 className="text-[16px] font-serif text-[#1a1a1a] mb-4">The Art of Gifting</h3>
                <p className="text-[12px] font-sans font-light text-[#666] mb-8 leading-relaxed">Beautifully wrapped in our signature red box with a personalized message.</p>
                <span className="text-[9px] font-sans font-bold uppercase tracking-[0.2em] text-[#1a1a1a] border-b border-[#1a1a1a] pb-1 mt-auto group-hover:text-[#bc001b] group-hover:border-[#bc001b] transition-colors">Learn More</span>
              </div>

              <div className="flex flex-col items-center text-center p-10 bg-white border border-[#eaeaea] hover:border-[#c1a673] transition-colors duration-500 cursor-pointer group shadow-sm hover:shadow-md">
                <Phone className="w-10 h-10 text-[#1a1a1a] mb-8 stroke-[1] group-hover:text-[#bc001b] transition-colors" />
                <h3 className="text-[16px] font-serif text-[#1a1a1a] mb-4">Contact an Ambassador</h3>
                <p className="text-[12px] font-sans font-light text-[#666] mb-8 leading-relaxed">Our ambassadors are available to assist you with your order or any inquiries.</p>
                <span className="text-[9px] font-sans font-bold uppercase tracking-[0.2em] text-[#1a1a1a] border-b border-[#1a1a1a] pb-1 mt-auto group-hover:text-[#bc001b] group-hover:border-[#bc001b] transition-colors">Contact Us</span>
              </div>

              <div className="flex flex-col items-center text-center p-10 bg-white border border-[#eaeaea] hover:border-[#c1a673] transition-colors duration-500 cursor-pointer group shadow-sm hover:shadow-md">
                <Clock className="w-10 h-10 text-[#1a1a1a] mb-8 stroke-[1] group-hover:text-[#bc001b] transition-colors" />
                <h3 className="text-[16px] font-serif text-[#1a1a1a] mb-4">Book an Appointment</h3>
                <p className="text-[12px] font-sans font-light text-[#666] mb-8 leading-relaxed">Schedule a personalized consultation in one of our boutiques.</p>
                <span className="text-[9px] font-sans font-bold uppercase tracking-[0.2em] text-[#1a1a1a] border-b border-[#1a1a1a] pb-1 mt-auto group-hover:text-[#bc001b] group-hover:border-[#bc001b] transition-colors">Book Now</span>
              </div>

              <div className="flex flex-col items-center text-center p-10 bg-white border border-[#eaeaea] hover:border-[#c1a673] transition-colors duration-500 cursor-pointer group shadow-sm hover:shadow-md">
                <ShieldCheck className="w-10 h-10 text-[#1a1a1a] mb-8 stroke-[1] group-hover:text-[#bc001b] transition-colors" />
                <h3 className="text-[16px] font-serif text-[#1a1a1a] mb-4">Care & Repair</h3>
                <p className="text-[12px] font-sans font-light text-[#666] mb-8 leading-relaxed">Entrust your creations to our experts for maintenance and repair services.</p>
                <span className="text-[9px] font-sans font-bold uppercase tracking-[0.2em] text-[#1a1a1a] border-b border-[#1a1a1a] pb-1 mt-auto group-hover:text-[#bc001b] group-hover:border-[#bc001b] transition-colors">Discover Services</span>
              </div>

            </div>
          </div>
        </div>

        {/* ─── BOUTIQUE LOCATOR ─── */}
        <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden flex items-center justify-center group cursor-pointer">
          <Image src="https://picsum.photos/1920/1080?random=194" alt="Boutique" fill className="object-cover group-hover:scale-[1.03] transition-transform duration-[4000ms]" />
          <div className="absolute inset-0 bg-[#530000]/40 backdrop-blur-[2px]" />

          <div className="relative z-10 text-center text-white p-10 md:p-12 max-w-[600px] w-[90%] bg-white/10 backdrop-blur-md border border-white/30 shadow-2xl">
            <MapPin className="w-10 h-10 mx-auto mb-6 stroke-[1]" />
            <h2 className="text-[32px] md:text-[40px] font-serif mb-6 italic tracking-wide">Find a Boutique</h2>
            <p className="text-[13px] font-sans font-light mb-10 leading-relaxed drop-shadow-sm">Discover the MaisonElegance boutique nearest to you and experience our creations in person.</p>
            <button className="bg-white text-[#1a1a1a] px-12 py-3.5 font-sans font-bold uppercase text-[10px] tracking-[0.2em] hover:bg-[#bc001b] hover:text-white hover:border-[#bc001b] border border-white transition-all duration-300">
              Store Locator
            </button>
          </div>
        </div>

      </main>

      {/* ─── FOOTER (Elegant dark grey/black with gold accents) ─── */}
      <footer className="bg-[#141414] text-white pt-24 pb-12 px-4 md:px-10 border-t-4 border-[#bc001b]">
        <div className="w-full max-w-[1920px] mx-auto">

          <div className="flex flex-col items-center justify-center mb-24">
            <span className="font-serif text-[40px] md:text-[56px] tracking-widest text-[#bc001b] italic mb-10">MaisonElegance</span>
            <div className="flex flex-wrap justify-center gap-6 md:gap-12 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-[#c1a673]">
              <a href="#" className="hover:text-white transition-colors flex items-center"><Phone className="w-[14px] h-[14px] mr-2" /> Contact Us</a>
              <a href="#" className="hover:text-white transition-colors flex items-center"><MapPin className="w-[14px] h-[14px] mr-2" /> Find a Boutique</a>
              <a href="#" className="hover:text-white transition-colors flex items-center"><Clock className="w-[14px] h-[14px] mr-2" /> Book an Appointment</a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-12 mb-20 text-[10px] font-sans font-bold uppercase tracking-[0.15em] text-[#888]">

            <div className="flex flex-col space-y-6">
              <h4 className="text-white mb-4 tracking-[0.2em] border-b border-[#333] pb-4">Customer Care</h4>
              <a href="#" className="hover:text-[#c1a673] transition-colors w-fit">Contact Us</a>
              <a href="#" className="hover:text-[#c1a673] transition-colors w-fit">Call Now: 1-800-MaisonElegance</a>
              <a href="#" className="hover:text-[#c1a673] transition-colors w-fit">FAQ</a>
              <a href="#" className="hover:text-[#c1a673] transition-colors w-fit">Track Your Order</a>
              <a href="#" className="hover:text-[#c1a673] transition-colors w-fit">Book an Appointment</a>
            </div>

            <div className="flex flex-col space-y-6">
              <h4 className="text-white mb-4 tracking-[0.2em] border-b border-[#333] pb-4">Our Company</h4>
              <a href="#" className="hover:text-[#c1a673] transition-colors w-fit">Find a Boutique</a>
              <a href="#" className="hover:text-[#c1a673] transition-colors w-fit">Careers</a>
              <a href="#" className="hover:text-[#c1a673] transition-colors w-fit">MaisonElegance Philanthropy</a>
              <a href="#" className="hover:text-[#c1a673] transition-colors w-fit">Foundation MaisonElegance</a>
              <a href="#" className="hover:text-[#c1a673] transition-colors w-fit">MaisonElegance Women's Initiative</a>
            </div>

            <div className="flex flex-col space-y-6">
              <h4 className="text-white mb-4 tracking-[0.2em] border-b border-[#333] pb-4">Legal Area</h4>
              <a href="#" className="hover:text-[#c1a673] transition-colors w-fit">Terms of Use</a>
              <a href="#" className="hover:text-[#c1a673] transition-colors w-fit">Privacy Notice</a>
              <a href="#" className="hover:text-[#c1a673] transition-colors w-fit">Conditions of Sale</a>
              <a href="#" className="hover:text-[#c1a673] transition-colors w-fit">Accessibility</a>
            </div>

            <div className="flex flex-col">
              <h4 className="text-white mb-4 tracking-[0.2em] border-b border-[#333] pb-4">Newsletter</h4>
              <p className="text-[#888] normal-case font-light tracking-normal text-[13px] leading-relaxed mb-6">Subscribe to our newsletter to receive the latest news and updates from the Maison.</p>
              <div className="flex border-b border-[#555] pb-2 group focus-within:border-[#c1a673] transition-colors">
                <input type="email" placeholder="Email Address" className="bg-transparent outline-none w-full text-white placeholder-[#888] text-[12px] normal-case tracking-normal" />
                <button className="hover:text-[#c1a673] transition-colors"><ArrowRight className="w-5 h-5" strokeWidth={1} /></button>
              </div>
            </div>

          </div>

          <div className="pt-8 border-t border-[#333] flex flex-col md:flex-row items-center justify-between text-[9px] font-sans font-bold uppercase tracking-[0.2em] text-[#666]">
            <span className="mb-6 md:mb-0">© 2026 MaisonElegance. ALL RIGHTS RESERVED.</span>
            <div className="flex space-x-8">
              <a href="#" className="hover:text-[#c1a673] transition-colors">United States</a>
              <span className="hidden md:inline">|</span>
              <a href="#" className="hover:text-[#c1a673] transition-colors">English</a>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
