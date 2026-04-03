'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { StoreData, Product } from '@/lib/types';
import { useCart } from '@/contexts/CartContext';
import { Search, ShoppingBag, Menu, Heart, MapPin, Phone, ArrowRight, Facebook, Twitter, Instagram, Youtube, User, X } from 'lucide-react';
import { usePagination, ProductPagination } from '@/components/componentes-compartidos/templates/Pagination';

export default function HeritageLuxTemplate({ data }: { data: StoreData }) {
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
  return (
    <div className="min-h-full bg-white font-sans text-[#19110B] overflow-x-hidden" style={{ fontFamily: "'HeritageLux Web', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}>

      {/* ─── UTILITY BAR (Very dark brown, almost black, white text) ─── */}
      <div className="bg-[#19110B] text-white text-[10px] md:text-[11px] text-center py-2.5 tracking-[0.15em] uppercase font-medium">
        Complimentary Delivery or Collect in Store
      </div>

      {/* ─── HEADER (White, extremely thin borders) ─── */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#e5e5e5] transition-transform">
        <div className="w-full px-4 md:px-8 h-[60px] md:h-[72px] flex items-center justify-between">

          <div className="flex items-center space-x-6 md:space-x-8 w-1/3">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="hover:opacity-70 transition-opacity"
            >
              {mobileMenuOpen ? <X className="w-[22px] h-[22px] text-[#19110B]" strokeWidth={1} /> : <Menu className="w-[22px] h-[22px] text-[#19110B]" strokeWidth={1} />}
            </button>
            <button className="hidden md:flex items-center hover:opacity-70 transition-opacity space-x-2">
              <Search className="w-5 h-5 text-[#19110B]" strokeWidth={1} />
              <span className="text-[12px] uppercase tracking-widest font-medium hidden lg:block">Search</span>
            </button>
          </div>

          <div className="flex justify-center w-1/3 cursor-pointer hover:opacity-80 transition-opacity">
            {/* Iconic HeritageLux Futura-style Logo */}
            <div className="text-[20px] md:text-[28px] tracking-[0.2em] uppercase font-medium leading-none" style={{ fontFamily: "'Futura', 'Trebuchet MS', Arial, sans-serif" }}>
              {data.logoText !== 'HeritageLux' ? data.logoText : 'HeritageLux'}
            </div>
          </div>

          <div className="flex items-center justify-end space-x-5 md:space-x-7 w-1/3">
            <span className="text-[11px] tracking-[0.15em] uppercase hidden lg:block cursor-pointer hover:underline underline-offset-4 transition-all">Call Us</span>
            <div 
              onClick={() => toggleFavorite('header')}
              className="hidden md:block relative cursor-pointer hover:underline underline-offset-4 transition-all"
            >
              <span className="text-[11px] tracking-[0.15em] uppercase">Wishlist</span>
              {favorites.length > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-[8px] font-bold px-1.5 rounded-full">{favorites.length}</span>
              )}
            </div>
            <span className="text-[11px] tracking-[0.15em] uppercase hidden md:block cursor-pointer hover:underline underline-offset-4 transition-all">My LV</span>
            <button className="md:hidden hover:opacity-70 transition-opacity"><User className="w-[20px] h-[20px]" strokeWidth={1} /></button>
            <div 
              onClick={() => setIsCartOpen(true)}
              className="relative cursor-pointer hover:opacity-70 transition-opacity"
            >
              <ShoppingBag className="w-[20px] h-[20px] text-[#19110B]" strokeWidth={1} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#19110B] text-white text-[9px] font-bold px-1.5 rounded-full">{itemCount}</span>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="w-full">

        {/* ─── HIGH-END HERO BLADE ─── */}
        <div className="relative h-[80vh] md:h-[90vh] w-full overflow-hidden group">
          <Image
            src={data.bannerImage}
            alt="Campaign"
            fill
            className="object-cover object-center transition-transform duration-[2000ms] ease-out group-hover:scale-[1.03]"
            referrerPolicy="no-referrer"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#19110B]/60 via-transparent to-transparent flex flex-col items-center justify-end pb-16 md:pb-24 text-white">
            <h2 className="text-[32px] md:text-[56px] font-normal mb-6 text-center w-full tracking-wide leading-none" style={{ fontFamily: "'Futura', 'Trebuchet MS', Arial, sans-serif" }}>
              {data.name}
            </h2>
            <p className="text-[14px] md:text-[18px] mb-8 font-light tracking-wide text-center max-w-2xl px-4 drop-shadow-md">
              {data.description || "The spirit of travel meets modern elegance."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-6">
              <button className="bg-white text-[#19110B] px-10 py-4 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#e5e5e5] transition-colors duration-300 w-full sm:w-auto border border-white">
                Discover the Collection
              </button>
              <button className="bg-transparent text-white px-10 py-4 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-white/10 transition-colors duration-300 w-full sm:w-auto border border-white">
                Explore Art of Gifting
              </button>
            </div>
          </div>
        </div>

        {/* ─── NOVELTIES GRID (Structured Museum Layout - Paginated) ─── */}
        <div className="w-full max-w-[1920px] mx-auto px-4 md:px-12 py-20 md:py-32">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 border-b border-[#e5e5e5] pb-6">
            <h3 className="text-[22px] md:text-[28px] font-medium tracking-wide mb-4 md:mb-0">New This Season ({totalItems})</h3>
            <a href="#" className="flex items-center text-[11px] tracking-[0.2em] uppercase font-bold hover:text-[#9e704e] transition-colors group">
              View the Selection
              <span className="ml-2 transform group-hover:translate-x-1 transition-transform"><ArrowRight className="w-4 h-4" strokeWidth={1.5} /></span>
            </a>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-x-2 md:gap-x-4 gap-y-8 md:gap-y-12">
            {paginatedItems.map((product, idx) => (
              <div key={product.id || idx} data-product-id={product.id} className="group cursor-pointer flex flex-col relative">
                {/* Product Image Box */}
                <div className="relative aspect-[3/4] overflow-hidden bg-[#f6f5f3] mb-3">
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    fill
                    className="object-cover p-2 mix-blend-multiply group-hover:scale-105 transition-transform duration-[800ms] ease-out"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle LV Hover Heart */}
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }}
                    className="absolute top-3 right-3 p-1.5 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Heart className={`w-4 h-4 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-[#19110B]'}`} strokeWidth={1} />
                  </button>

                  {/* Web Exclusive Tag Example */}
                  {product.originalPrice && (
                    <div className="absolute bottom-3 left-3 text-[8px] uppercase tracking-widest font-bold bg-white/90 px-2 py-1">
                      Online Exclusive
                    </div>
                  )}
                  <button 
                    onClick={(e) => handleAddToCart(product, e)}
                    className="absolute bottom-3 left-3 right-3 bg-[#19110B] text-white py-1.5 text-[9px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Add
                  </button>
                </div>

                {/* Product Info */}
                <div className="flex-1 flex flex-col px-1">
                  <span className="text-[9px] tracking-[0.15em] uppercase text-[#767676] mb-0.5">{product.category || 'Leather Goods'}</span>
                  <h4 className="text-[12px] font-medium tracking-wide group-hover:underline underline-offset-4 line-clamp-2">{product.title}</h4>
                  <span className="text-[12px] text-[#767676] whitespace-nowrap mt-0.5">${product.price}</span>
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

        {/* ─── HERITAGE BANNER (Full width, text centered) ─── */}
        <div className="w-full bg-[#f6f5f3] py-24 md:py-32 px-6">
          <div className="max-w-[800px] mx-auto text-center flex flex-col items-center">
            <Image src="https://picsum.photos/100/100?random=444" alt="LV Monogram Logo" width={40} height={40} className="mb-8 opacity-20 grayscale mix-blend-multiply" />
            <h3 className="text-[24px] md:text-[36px] font-medium tracking-wide mb-6 leading-tight" style={{ fontFamily: "'Futura', 'Trebuchet MS', Arial, sans-serif" }}>
              The Spirit of Travel
            </h3>
            <p className="text-[14px] md:text-[16px] text-[#555] font-light leading-relaxed mb-10 max-w-xl">
              Since 1854, HeritageLux has brought unique designs to the world, combining innovation with style, always aiming for the finest quality. Today, the Maison remains faithful to the spirit of its founder.
            </p>
            <button className="text-[11px] tracking-[0.2em] font-bold uppercase border-b border-[#19110B] pb-1 hover:text-[#9e704e] hover:border-[#9e704e] transition-colors">
              Explore the Heritage
            </button>
          </div>
        </div>

        {/* ─── TRIPLE MOSAIC (Categories) ─── */}
        <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8 py-20 border-t border-[#e5e5e5]">
          <div className="mb-8 md:mb-12 text-center">
            <h3 className="text-[24px] md:text-[28px] font-medium tracking-wide" style={{ fontFamily: "'Futura', 'Trebuchet MS', Arial, sans-serif" }}>Explore by Category</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {[
              { title: 'Women', img: 'https://picsum.photos/600/800?random=400' },
              { title: 'Men', img: 'https://picsum.photos/600/800?random=401' },
              { title: 'Art of Living', img: 'https://picsum.photos/600/800?random=402' },
            ].map((category, i) => (
              <div key={i} className="group cursor-pointer relative aspect-[4/5] overflow-hidden">
                <Image src={category.img} alt={category.title} fill className="object-cover group-hover:scale-105 transition-transform duration-[2000ms] ease-out" />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent opacity-80" />
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-12">
                  <h4 className="text-white text-[28px] font-medium tracking-widest uppercase mb-4 drop-shadow-lg" style={{ fontFamily: "'Futura', 'Trebuchet MS', Arial, sans-serif" }}>{category.title}</h4>
                  <span className="text-white text-[11px] tracking-[0.2em] font-bold border-b border-transparent group-hover:border-white pb-1 transition-all uppercase">Discover</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── SERVICES ─── */}
        <div className="bg-white py-24 px-4 md:px-12 border-t border-[#e5e5e5]">
          <div className="w-full max-w-[1200px] mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-[24px] md:text-[28px] font-medium tracking-wide mb-4" style={{ fontFamily: "'Futura', 'Trebuchet MS', Arial, sans-serif" }}>HeritageLux Services</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">

              <div className="flex flex-col items-center">
                <div className="mb-6">
                  <ShoppingBag className="w-10 h-10 text-[#19110B]" strokeWidth={1} />
                </div>
                <h4 className="text-[15px] font-medium tracking-wide mb-3">Complimentary Delivery</h4>
                <p className="text-[13px] font-light text-[#555] mb-6 max-w-[250px] leading-relaxed">Enjoy complimentary delivery or collect in store.</p>
                <a href="#" className="text-[11px] tracking-[0.2em] uppercase font-bold border-b border-[#19110B] pb-0.5 hover:text-[#9e704e] hover:border-[#9e704e] transition-colors">Discover</a>
              </div>

              <div className="flex flex-col items-center">
                <div className="mb-6">
                  <Phone className="w-10 h-10 text-[#19110B]" strokeWidth={1} />
                </div>
                <h4 className="text-[15px] font-medium tracking-wide mb-3">Client Services</h4>
                <p className="text-[13px] font-light text-[#555] mb-6 max-w-[250px] leading-relaxed">Our Client Advisors are available to assist you via phone or email.</p>
                <a href="#" className="text-[11px] tracking-[0.2em] uppercase font-bold border-b border-[#19110B] pb-0.5 hover:text-[#9e704e] hover:border-[#9e704e] transition-colors">Contact Us</a>
              </div>

              <div className="flex flex-col items-center">
                <div className="mb-6">
                  <Heart className="w-10 h-10 text-[#19110B]" strokeWidth={1} />
                </div>
                <h4 className="text-[15px] font-medium tracking-wide mb-3">Personalization</h4>
                <p className="text-[13px] font-light text-[#555] mb-6 max-w-[250px] leading-relaxed">Make your item unique with our Hot Stamping and Engraving services.</p>
                <a href="#" className="text-[11px] tracking-[0.2em] uppercase font-bold border-b border-[#19110B] pb-0.5 hover:text-[#9e704e] hover:border-[#9e704e] transition-colors">Explore</a>
              </div>

            </div>
          </div>
        </div>

        {/* ─── EDITORIAL CAMPAIGN ─── */}
        <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8 py-20 border-t border-[#e5e5e5]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative aspect-[4/5] overflow-hidden group cursor-pointer">
              <Image src="https://picsum.photos/800/1000?random=410" alt="Campaign" fill className="object-cover group-hover:scale-[1.03] transition-transform duration-[2000ms]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex flex-col items-center justify-end pb-12">
                <h3 className="text-white text-[24px] md:text-[32px] font-medium tracking-wide mb-3 drop-shadow-lg" style={{ fontFamily: "'Futura', 'Trebuchet MS', Arial, sans-serif" }}>Capucines</h3>
                <p className="text-white/80 text-[13px] font-light mb-4">The art of leather craftsmanship</p>
                <button className="text-white text-[11px] tracking-[0.2em] font-bold uppercase border-b border-white pb-1 hover:opacity-70 transition-opacity">Discover</button>
              </div>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden group cursor-pointer">
              <Image src="https://picsum.photos/800/1000?random=411" alt="Campaign" fill className="object-cover group-hover:scale-[1.03] transition-transform duration-[2000ms]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex flex-col items-center justify-end pb-12">
                <h3 className="text-white text-[24px] md:text-[32px] font-medium tracking-wide mb-3 drop-shadow-lg" style={{ fontFamily: "'Futura', 'Trebuchet MS', Arial, sans-serif" }}>Tambour</h3>
                <p className="text-white/80 text-[13px] font-light mb-4">Timepieces of distinction</p>
                <button className="text-white text-[11px] tracking-[0.2em] font-bold uppercase border-b border-white pb-1 hover:opacity-70 transition-opacity">Discover</button>
              </div>
            </div>
          </div>
        </div>

        {/* ─── SAVOIR-FAIRE ─── */}
        <div className="w-full bg-[#19110B] text-white py-24 md:py-32 px-6">
          <div className="max-w-[1200px] mx-auto text-center">
            <h3 className="text-[24px] md:text-[36px] font-medium tracking-wide mb-6" style={{ fontFamily: "'Futura', 'Trebuchet MS', Arial, sans-serif" }}>Savoir-Faire</h3>
            <p className="text-[14px] md:text-[16px] text-[#a8a8a8] font-light leading-relaxed mb-12 max-w-2xl mx-auto">
              Each HeritageLux creation is the result of meticulous craftsmanship, passed down through generations. From the selection of the finest materials to the final stitch, every detail is a testament to our commitment to excellence.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'Leather Selection', desc: 'Only the finest hides are chosen for our creations', img: 'https://picsum.photos/400/300?random=412' },
                { title: 'Hand Stitching', desc: 'Each piece is assembled by master artisans', img: 'https://picsum.photos/400/300?random=413' },
                { title: 'Quality Control', desc: 'Rigorous inspection ensures lasting perfection', img: 'https://picsum.photos/400/300?random=414' },
              ].map((item, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="relative aspect-[4/3] overflow-hidden mb-6">
                    <Image src={item.img} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-[2000ms]" />
                  </div>
                  <h4 className="text-[15px] font-medium tracking-wide mb-2">{item.title}</h4>
                  <p className="text-[13px] text-[#a8a8a8] font-light">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── GIFT GUIDE ─── */}
        <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8 py-20 border-t border-[#e5e5e5]">
          <div className="text-center mb-12">
            <h3 className="text-[24px] md:text-[28px] font-medium tracking-wide mb-3" style={{ fontFamily: "'Futura', 'Trebuchet MS', Arial, sans-serif" }}>The Art of Gifting</h3>
            <p className="text-[14px] text-[#555] font-light">Find the perfect gift for every occasion</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { title: 'For Her', img: 'https://picsum.photos/400/500?random=415' },
              { title: 'For Him', img: 'https://picsum.photos/400/500?random=416' },
              { title: 'Small Leather Goods', img: 'https://picsum.photos/400/500?random=417' },
              { title: 'Fragrances', img: 'https://picsum.photos/400/500?random=418' },
            ].map((gift, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="relative aspect-[4/5] overflow-hidden mb-4 bg-[#f6f5f3]">
                  <Image src={gift.img} alt={gift.title} fill className="object-cover group-hover:scale-105 transition-transform duration-[2000ms]" />
                </div>
                <h4 className="text-center text-[13px] font-medium tracking-wide group-hover:underline underline-offset-4">{gift.title}</h4>
              </div>
            ))}
          </div>
        </div>

        {/* ─── NEWSLETTER ─── */}
        <div className="w-full bg-[#f6f5f3] py-20 px-6 border-t border-[#e5e5e5]">
          <div className="max-w-[600px] mx-auto text-center">
            <h3 className="text-[22px] md:text-[28px] font-medium tracking-wide mb-4" style={{ fontFamily: "'Futura', 'Trebuchet MS', Arial, sans-serif" }}>Stay Connected</h3>
            <p className="text-[14px] text-[#555] font-light mb-8">Sign up for HeritageLux emails and receive the latest news, including exclusive online pre-launches and new collections.</p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input type="email" placeholder="Enter your email" className="flex-1 bg-white border border-[#e5e5e5] px-4 py-3.5 text-[12px] font-medium tracking-wide outline-none focus:border-[#19110B] transition-colors" />
              <button type="button" className="bg-[#19110B] text-white px-8 py-3.5 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-black transition-colors">Subscribe</button>
            </form>
          </div>
        </div>

        {/* ─── STORE LOCATOR MAP ─── */}
        <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden flex items-center justify-center">
          <Image src="https://picsum.photos/1600/900?random=403" alt="Store" fill className="object-cover" />
          <div className="absolute inset-0 bg-[#19110B]/30 backdrop-blur-sm" />
          <div className="relative z-10 text-center text-[#19110B] p-10 bg-white/95 max-w-[600px] w-[90%] md:w-full mx-4 shadow-xl">
            <MapPin className="w-8 h-8 mx-auto mb-6 text-[#19110B]" strokeWidth={1.5} />
            <h3 className="text-[28px] font-medium tracking-wide mb-4" style={{ fontFamily: "'Futura', 'Trebuchet MS', Arial, sans-serif" }}>Find a Store</h3>
            <p className="text-[14px] font-light tracking-wide mb-8 opacity-90 text-[#555]">Discover HeritageLux stores near you and book an appointment.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-[#19110B] text-white px-8 py-3.5 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-black transition-colors duration-300 w-full sm:w-auto">
                Search
              </button>
              <button className="bg-white border border-[#19110B] text-[#19110B] px-8 py-3.5 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#f5f5f5] transition-colors duration-300 w-full sm:w-auto">
                Book Appointment
              </button>
            </div>
          </div>
        </div>

      </main>

      {/* ─── FOOTER ─── */}
      <footer className="bg-[#19110B] text-white pt-24 pb-12 mt-1 px-4 md:px-8">
        <div className="w-full max-w-[1920px] mx-auto">

          {/* Logo Top Footer */}
          <div className="flex justify-center mb-20">
            <div className="text-[24px] md:text-[32px] tracking-[0.2em] uppercase font-normal leading-none" style={{ fontFamily: "'Futura', 'Trebuchet MS', Arial, sans-serif" }}>
              HeritageLux
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8 mb-20 text-[11px] font-bold tracking-[0.15em] uppercase">

            <div className="flex flex-col space-y-6">
              <h4 className="text-[#a8a8a8] mb-4 text-[12px]">Help</h4>
              <a href="#" className="hover:text-[#a8a8a8] transition-colors w-fit">Client Services</a>
              <a href="#" className="hover:text-[#a8a8a8] transition-colors w-fit">FAQ</a>
              <a href="#" className="hover:text-[#a8a8a8] transition-colors w-fit">Track Your Order</a>
              <a href="#" className="hover:text-[#a8a8a8] transition-colors w-fit">Returns & Exchanges</a>
              <a href="#" className="hover:text-[#a8a8a8] transition-colors w-fit">Care & Services</a>
            </div>

            <div className="flex flex-col space-y-6">
              <h4 className="text-[#a8a8a8] mb-4 text-[12px]">Services</h4>
              <a href="#" className="hover:text-[#a8a8a8] transition-colors w-fit">Repairs</a>
              <a href="#" className="hover:text-[#a8a8a8] transition-colors w-fit">Personalization</a>
              <a href="#" className="hover:text-[#a8a8a8] transition-colors w-fit">Art of Gifting</a>
              <a href="#" className="hover:text-[#a8a8a8] transition-colors w-fit">Download our Apps</a>
            </div>

            <div className="flex flex-col space-y-6">
              <h4 className="text-[#a8a8a8] mb-4 text-[12px]">About HeritageLux</h4>
              <a href="#" className="hover:text-[#a8a8a8] transition-colors w-fit">Fashion Shows</a>
              <a href="#" className="hover:text-[#a8a8a8] transition-colors w-fit">Arts & Culture</a>
              <a href="#" className="hover:text-[#a8a8a8] transition-colors w-fit">La Maison</a>
              <a href="#" className="hover:text-[#a8a8a8] transition-colors w-fit">Sustainability</a>
              <a href="#" className="hover:text-[#a8a8a8] transition-colors w-fit">Careers</a>
            </div>

            <div className="flex flex-col space-y-6">
              <h4 className="text-[#a8a8a8] mb-4 text-[12px]">Connect</h4>
              <p className="text-[#ccc] normal-case tracking-normal text-[13px] font-light leading-relaxed mb-2">Sign up for HeritageLux emails and receive the latest news from the Maison, including exclusive online pre-launches and new collections.</p>
              <button className="border-b border-white pb-1 text-left hover:text-[#a8a8a8] hover:border-[#a8a8a8] transition-colors w-fit">
                Sign Up
              </button>
              <div className="pt-6 flex space-x-6">
                <a href="#" className="hover:text-[#a8a8a8] transition-colors"><Instagram className="w-[18px] h-[18px]" /></a>
                <a href="#" className="hover:text-[#a8a8a8] transition-colors"><Twitter className="w-[18px] h-[18px]" /></a>
                <a href="#" className="hover:text-[#a8a8a8] transition-colors"><Facebook className="w-[18px] h-[18px]" /></a>
                <a href="#" className="hover:text-[#a8a8a8] transition-colors"><Youtube className="w-[18px] h-[18px]" /></a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-[#333] flex flex-col md:flex-row items-center justify-between w-full text-[10px] font-bold tracking-[0.15em] uppercase text-[#a8a8a8]">
            <div className="flex items-center space-x-2 hover:text-white cursor-pointer transition-colors group mb-6 md:mb-0">
              <span className="text-[14px]">🇺🇸</span>
              <span className="group-hover:underline">Ship to: United States</span>
            </div>

            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-6 md:mb-0">
              <a href="#" className="hover:text-white transition-colors">Sitemap</a>
              <a href="#" className="hover:text-white transition-colors">Legal & Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
            </div>
            <span>© 2026 HeritageLux</span>
          </div>

        </div>
      </footer>
    </div>
  );
}

