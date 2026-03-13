'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { StoreData } from '@/lib/types';
import { Search, ShoppingBag, Menu, User, MapPin, Phone, ChevronRight, Instagram, Facebook, Twitter, Youtube, ArrowRight, X, Heart } from 'lucide-react';
import { usePagination, ProductPagination } from './shared/Pagination';

export default function ParisianChicTemplate({ data }: { data: StoreData }) {
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
    <div className="min-h-full bg-white font-sans text-black overflow-x-hidden selection:bg-black selection:text-white" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>

      {/* ─── EYEWEAR VIRTUAL TRY ON BANNER (ParisianChic utility pattern) ─── */}
      <div className="bg-black text-white text-[11px] text-center py-2.5 tracking-[0.2em] uppercase font-bold w-full">
        Complimentary Shipping & Returns
      </div>

      {/* ─── HEADER (Strict B&W, minimalist) ─── */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 transition-transform">
        <div className="w-full mx-auto px-4 md:px-8 h-[60px] md:h-[72px] flex items-center justify-between">

          <div className="flex items-center space-x-6 md:space-x-8 w-1/3">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex flex-col space-y-[5px] hover:opacity-70 transition-opacity"
            >
              {mobileMenuOpen ? <X className="w-[22px] h-[22px]" strokeWidth={1.5} /> : (
                <>
                  <span className="block h-[1.5px] bg-black w-[22px]"></span>
                  <span className="block h-[1.5px] bg-black w-[22px]"></span>
                  <span className="block h-[1.5px] bg-black w-[22px]"></span>
                </>
              )}
            </button>
            <button className="hidden md:block hover:opacity-70 transition-opacity">
              <Search className="w-[20px] h-[20px]" strokeWidth={1.5} />
            </button>
          </div>

          <div className="flex justify-center w-1/3 cursor-pointer hover:opacity-80 transition-opacity">
            {/* Iconic ParisianChic Logo: bold sans-serif, widely tracked */}
            <div className="font-sans text-[26px] md:text-[34px] tracking-[0.25em] uppercase font-bold leading-none" style={{ fontFamily: "Arial, sans-serif" }}>
              {data.logoText !== 'ParisianChic' ? data.logoText : 'ParisianChic'}
            </div>
          </div>

          <div className="flex items-center justify-end space-x-6 md:space-x-8 w-1/3">
            <button className="hidden md:block hover:opacity-70 transition-opacity">
              <User className="w-[20px] h-[20px]" strokeWidth={1.5} />
            </button>
            <div 
              onClick={() => toggleFavorite('header')}
              className="relative cursor-pointer hover:opacity-70 transition-opacity hidden md:block"
            >
              <Heart className={`w-[20px] h-[20px] ${favorites.length > 0 ? 'fill-red-500 text-red-500' : ''}`} strokeWidth={1.5} />
              {favorites.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[9px] font-bold px-1.5 rounded-full">{favorites.length}</span>
              )}
            </div>
            <div 
              onClick={addToCart}
              className="relative cursor-pointer hover:opacity-70 transition-opacity"
            >
              <ShoppingBag className="w-[20px] h-[20px]" strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-[9px] font-bold px-1.5 rounded-full">{cartCount}</span>
              )}
            </div>
          </div>
        </div>

        {/* SUB-NAVIGATION DESKTOP */}
        <div className="hidden lg:flex w-full justify-center space-x-10 py-3 border-t border-gray-100 bg-white">
          {['HAUTE COUTURE', 'FASHION', 'HIGH JEWELRY', 'FINE JEWELRY', 'WATCHES', 'EYEWEAR', 'FRAGRANCE', 'MAKEUP', 'SKINCARE'].map((item, idx) => (
            <a key={idx} href="#" className="text-[10px] font-bold tracking-[0.15em] hover:text-gray-500 transition-colors uppercase">
              {item}
            </a>
          ))}
        </div>
      </header>

      <main className="w-full">

        {/* ─── HERO CAMPAIGN (Black & White Editorial) ─── */}
        <div className="relative h-[80vh] md:h-[90vh] w-full overflow-hidden group cursor-pointer">
          <Image
            src={data.bannerImage}
            alt="Campaign"
            fill
            className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-[2000ms] group-hover:scale-[1.02]"
            referrerPolicy="no-referrer"
            priority
          />
          {/* Subtle vignette */}
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/30" />

          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8 z-10">
            <h2 className="text-[36px] md:text-[60px] font-bold mb-4 text-center w-full tracking-[0.15em] uppercase drop-shadow-md">
              {data.name}
            </h2>
            <p className="text-[12px] md:text-[14px] mb-10 font-bold tracking-[0.25em] uppercase text-center max-w-2xl drop-shadow-sm">
              {data.description || "The Vocabulary of Style"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-black px-12 py-3.5 text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-black hover:text-white transition-colors duration-500 w-full sm:w-auto">
                Discover
              </button>
            </div>
          </div>
        </div>

        {/* ─── FASHION OVERVIEW (Strict Grid - Paginated) ─── */}
        <div className="w-full max-w-[1920px] mx-auto px-4 md:px-12 py-20 md:py-32">
          <div className="text-center mb-16 md:mb-24 flex flex-col items-center">
            <h3 className="text-[18px] md:text-[24px] font-bold tracking-[0.2em] uppercase mb-6">The Collection ({totalItems})</h3>
            <div className="w-10 h-[2px] bg-black"></div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-2 md:gap-x-6 gap-y-12 md:gap-y-20">
            {paginatedItems.map((product: any) => (
              <div key={product.id} data-product-id={product.id} className="group cursor-pointer flex flex-col">
                <div className="relative aspect-[4/5] overflow-hidden bg-[#f4f4f4] mb-6">
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-[1500ms] ease-out mix-blend-darken"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
                    <button 
                      onClick={(e) => { e.stopPropagation(); addToCart(); }}
                      className="w-full text-[10px] font-bold tracking-[0.2em] uppercase text-center hover:text-gray-500 transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }}
                    className="absolute top-3 right-3 p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Heart className={`w-4 h-4 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : ''}`} strokeWidth={1} />
                  </button>
                </div>
                <div className="text-center flex-1 flex flex-col px-2">
                  <h4 className="text-[12px] md:text-[13px] font-bold tracking-widest uppercase mb-2 line-clamp-1 group-hover:underline underline-offset-4">{product.title}</h4>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-gray-500 mb-3 block">{product.category || "Novelty"}</span>
                  <div className="mt-auto pt-2">
                    <span className="text-[12px] md:text-[13px] font-bold tracking-widest">${product.price}</span>
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

          <div className="flex justify-center mt-16 md:mt-24">
            <button 
              onClick={() => handlePageChange(currentPage + 1)}
              className="border-2 border-black text-black px-12 py-3.5 text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-black hover:text-white transition-colors duration-500"
            >
              See All
            </button>
          </div>
        </div>

        {/* ─── DARK EDITORIAL BLOCK ─── */}
        <div className="bg-black text-white py-24 md:py-32 px-6 text-center">
          <div className="max-w-[800px] mx-auto flex flex-col items-center">
            <h3 className="text-[24px] md:text-[36px] font-bold tracking-[0.2em] uppercase mb-8">Haute Couture</h3>
            <p className="max-w-2xl mx-auto font-medium tracking-wide leading-relaxed mb-12 text-[#cccccc] text-[13px] md:text-[15px]">
              "Elegance is refusal." Discover the latest creations that embody the timeless spirit and avant-garde vision of the House. A testament to unparalleled craftsmanship.
            </p>
            <button className="border border-white px-10 py-4 text-[10px] md:text-[11px] font-bold tracking-[0.25em] uppercase hover:bg-white hover:text-black transition-colors duration-500">
              Explore the Universe
            </button>
          </div>
        </div>

        {/* ─── BEAUTY SPLIT BLOCK ─── */}
        <div className="w-full max-w-[1920px] mx-auto px-4 md:px-12 py-24 md:py-32">
          <div className="flex flex-col lg:flex-row gap-8 md:gap-16 items-center">

            <div className="w-full lg:w-1/2">
              <div className="aspect-[3/4] overflow-hidden relative group cursor-pointer bg-gray-100">
                <Image src="https://picsum.photos/1000/1333?random=195" alt="Fragrance" fill className="object-cover group-hover:scale-105 transition-transform duration-[2000ms] grayscale group-hover:grayscale-0" />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors duration-500" />
              </div>
            </div>

            <div className="w-full lg:w-1/2 flex flex-col items-center text-center lg:items-start lg:text-left">
              <h3 className="text-[24px] md:text-[32px] font-bold tracking-[0.2em] uppercase mb-6 md:mb-8">Fragrance & Beauty</h3>
              <p className="text-[13px] md:text-[15px] font-normal tracking-wide leading-relaxed text-[#555] mb-10 md:mb-12 max-w-lg">
                Discover the latest makeup creations, skincare innovations, and iconic fragrances. A world of beauty inspired by the visionary spirit of Gabrielle ParisianChic.
              </p>

              <div className="flex flex-col space-y-4 w-full md:max-w-xs">
                <button className="border border-black px-8 py-3.5 text-[10px] font-bold tracking-[0.25em] uppercase hover:bg-black hover:text-white transition-colors duration-500 w-full text-center">
                  Shop Makeup
                </button>
                <button className="border border-black px-8 py-3.5 text-[10px] font-bold tracking-[0.25em] uppercase hover:bg-black hover:text-white transition-colors duration-500 w-full text-center">
                  Shop Skincare
                </button>
                <button className="border border-black px-8 py-3.5 text-[10px] font-bold tracking-[0.25em] uppercase hover:bg-black hover:text-white transition-colors duration-500 w-full text-center">
                  Shop Fragrance
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* ─── WATCHES & FINE JEWELRY (Twin Blocks) ─── */}
        <div className="bg-[#f2f2f2] py-20 md:py-32">
          <div className="w-full max-w-[1920px] mx-auto px-4 md:px-12">
            <div className="text-center mb-16 md:mb-20 flex flex-col items-center">
              <h3 className="text-[18px] md:text-[24px] font-bold tracking-[0.2em] uppercase mb-6">Watches & Fine Jewelry</h3>
              <div className="w-10 h-[2px] bg-black"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">

              <div className="relative aspect-square overflow-hidden group cursor-pointer bg-white">
                <Image src="https://picsum.photos/1000/1000?random=196" alt="Watches" fill className="object-cover group-hover:scale-105 transition-transform duration-[2000ms] grayscale" />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 text-white">
                  <h4 className="text-[20px] md:text-[28px] font-bold tracking-[0.2em] uppercase mb-4 drop-shadow-md">Watches</h4>
                  <span className="text-[10px] font-bold tracking-[0.25em] uppercase border-b border-transparent group-hover:border-white pb-1 transition-all">Discover</span>
                </div>
              </div>

              <div className="relative aspect-square overflow-hidden group cursor-pointer bg-white">
                <Image src="https://picsum.photos/1000/1000?random=197" alt="Fine Jewelry" fill className="object-cover group-hover:scale-105 transition-transform duration-[2000ms] grayscale" />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 text-white">
                  <h4 className="text-[20px] md:text-[28px] font-bold tracking-[0.2em] uppercase mb-4 drop-shadow-md">Fine Jewelry</h4>
                  <span className="text-[10px] font-bold tracking-[0.25em] uppercase border-b border-transparent group-hover:border-white pb-1 transition-all">Discover</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ─── THE HOUSE OF ParisianChic ─── */}
        <div className="w-full max-w-[1920px] mx-auto px-4 md:px-12 py-24 md:py-32">
          <div className="text-center mb-16 md:mb-24 flex flex-col items-center">
            <h3 className="text-[18px] md:text-[24px] font-bold tracking-[0.2em] uppercase mb-6">The House of ParisianChic</h3>
            <div className="w-10 h-[2px] bg-black"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">

            <div className="flex flex-col items-center text-center group cursor-pointer">
              <div className="w-full aspect-[4/3] overflow-hidden mb-6 bg-gray-100">
                <Image src="https://picsum.photos/600/450?random=198" alt="Inside ParisianChic" fill className="object-cover group-hover:scale-105 transition-transform duration-[2000ms]" />
              </div>
              <h4 className="text-[13px] font-bold tracking-[0.15em] uppercase mb-3">Inside ParisianChic</h4>
              <p className="text-[13px] text-gray-500 leading-relaxed mb-6 max-w-[280px]">Discover the history and heritage of the House.</p>
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase border-b border-black pb-1 mt-auto hover:text-gray-500 hover:border-gray-500 transition-colors">Read More</span>
            </div>

            <div className="flex flex-col items-center text-center group cursor-pointer">
              <div className="w-full aspect-[4/3] overflow-hidden mb-6 bg-gray-100">
                <Image src="https://picsum.photos/600/450?random=199" alt="Foundation ParisianChic" fill className="object-cover group-hover:scale-105 transition-transform duration-[2000ms]" />
              </div>
              <h4 className="text-[13px] font-bold tracking-[0.15em] uppercase mb-3">Fondation ParisianChic</h4>
              <p className="text-[13px] text-gray-500 leading-relaxed mb-6 max-w-[280px]">Supporting women's empowerment and leadership worldwide.</p>
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase border-b border-black pb-1 mt-auto hover:text-gray-500 hover:border-gray-500 transition-colors">Discover</span>
            </div>

            <div className="flex flex-col items-center text-center group cursor-pointer">
              <div className="w-full aspect-[4/3] overflow-hidden mb-6 bg-gray-100">
                <Image src="https://picsum.photos/600/450?random=200" alt="Careers" fill className="object-cover group-hover:scale-105 transition-transform duration-[2000ms]" />
              </div>
              <h4 className="text-[13px] font-bold tracking-[0.15em] uppercase mb-3">Careers</h4>
              <p className="text-[13px] text-gray-500 leading-relaxed mb-6 max-w-[280px]">Join the House of ParisianChic and explore opportunities.</p>
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase border-b border-black pb-1 mt-auto hover:text-gray-500 hover:border-gray-500 transition-colors">Explore</span>
            </div>

          </div>
        </div>

        {/* ─── SERVICES ─── */}
        <div className="bg-black text-white py-20 md:py-24">
          <div className="w-full max-w-[1200px] mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 text-center">

              <div className="flex flex-col items-center">
                <ShoppingBag className="w-8 h-8 mb-6" strokeWidth={1} />
                <h4 className="text-[12px] font-bold tracking-[0.15em] uppercase mb-4">Complimentary Delivery</h4>
                <p className="text-[12px] text-gray-400 leading-relaxed max-w-[250px]">Enjoy complimentary standard delivery and returns on all orders.</p>
              </div>

              <div className="flex flex-col items-center">
                <MapPin className="w-8 h-8 mb-6" strokeWidth={1} />
                <h4 className="text-[12px] font-bold tracking-[0.15em] uppercase mb-4">Boutique Services</h4>
                <p className="text-[12px] text-gray-400 leading-relaxed max-w-[250px]">Book an appointment or find a boutique near you to explore our collections.</p>
              </div>

              <div className="flex flex-col items-center">
                <Phone className="w-8 h-8 mb-6" strokeWidth={1} />
                <h4 className="text-[12px] font-bold tracking-[0.15em] uppercase mb-4">Client Care</h4>
                <p className="text-[12px] text-gray-400 leading-relaxed max-w-[250px]">Our advisors are available to assist you via phone or email.</p>
              </div>

            </div>
          </div>
        </div>

      </main>

      {/* ─── FOOTER (Rigid white grid) ─── */}
      <footer className="bg-white pt-20 md:pt-24 pb-12 border-t border-gray-200">
        <div className="w-full max-w-[1920px] mx-auto px-6 md:px-12">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8 mb-20 text-[10px] font-bold tracking-[0.1em] uppercase text-gray-500">

            <div className="flex flex-col">
              <h4 className="text-[11px] font-bold tracking-[0.2em] text-black mb-6">Explore ParisianChic.com</h4>
              <ul className="space-y-4">
                <li><a href="#" className="hover:text-black transition-colors block w-fit">Haute Couture</a></li>
                <li><a href="#" className="hover:text-black transition-colors block w-fit">Fashion</a></li>
                <li><a href="#" className="hover:text-black transition-colors block w-fit">High Jewelry</a></li>
                <li><a href="#" className="hover:text-black transition-colors block w-fit">Fine Jewelry</a></li>
                <li><a href="#" className="hover:text-black transition-colors block w-fit">Watches</a></li>
                <li><a href="#" className="hover:text-black transition-colors block w-fit">Eyewear</a></li>
                <li><a href="#" className="hover:text-black transition-colors block w-fit">Fragrance</a></li>
                <li><a href="#" className="hover:text-black transition-colors block w-fit">Makeup</a></li>
                <li><a href="#" className="hover:text-black transition-colors block w-fit">Skincare</a></li>
              </ul>
            </div>

            <div className="flex flex-col">
              <h4 className="text-[11px] font-bold tracking-[0.2em] text-black mb-6">Online Services</h4>
              <ul className="space-y-4">
                <li><a href="#" className="hover:text-black transition-colors block w-fit">My Account</a></li>
                <li><a href="#" className="hover:text-black transition-colors block w-fit">Track Your Order</a></li>
                <li><a href="#" className="hover:text-black transition-colors block w-fit">Returns</a></li>
                <li><a href="#" className="hover:text-black transition-colors block w-fit">FAQ</a></li>
                <li><a href="#" className="hover:text-black transition-colors block w-fit">Care & Services</a></li>
              </ul>

              <h4 className="text-[11px] font-bold tracking-[0.2em] text-black mb-6 mt-12">Boutique Services</h4>
              <ul className="space-y-4">
                <li><a href="#" className="hover:text-black transition-colors block w-fit">Find a Boutique</a></li>
                <li><a href="#" className="hover:text-black transition-colors block w-fit">Book an Appointment</a></li>
              </ul>
            </div>

            <div className="flex flex-col">
              <h4 className="text-[11px] font-bold tracking-[0.2em] text-black mb-6">The House of ParisianChic</h4>
              <ul className="space-y-4 mb-12">
                <li><a href="#" className="hover:text-black transition-colors block w-fit">Inside ParisianChic</a></li>
                <li><a href="#" className="hover:text-black transition-colors block w-fit">Careers</a></li>
                <li><a href="#" className="hover:text-black transition-colors block w-fit">Fondation ParisianChic</a></li>
                <li><a href="#" className="hover:text-black transition-colors block w-fit">Legal</a></li>
                <li><a href="#" className="hover:text-black transition-colors block w-fit">Privacy Policy</a></li>
              </ul>
            </div>

            <div className="flex flex-col">
              <h4 className="text-[11px] font-bold tracking-[0.2em] text-black mb-6">Newsletter</h4>
              <p className="text-[10px] normal-case tracking-normal font-medium text-gray-500 mb-6">Subscribe to receive news from ParisianChic.</p>
              <div className="flex border-b border-black pb-2 group focus-within:border-gray-500">
                <input type="email" placeholder="Enter your email" className="bg-transparent outline-none w-full text-[12px] normal-case tracking-normal font-medium placeholder-gray-400 text-black" />
                <button className="hover:opacity-70 transition-opacity"><ArrowRight className="w-5 h-5 text-black" strokeWidth={1} /></button>
              </div>
            </div>

          </div>

          <div className="flex flex-col md:flex-row items-center justify-between pt-10 border-t border-gray-200">
            <div className="font-sans text-[24px] md:text-[28px] tracking-[0.25em] uppercase font-bold mb-6 md:mb-0 leading-none">
              ParisianChic
            </div>

            <div className="flex space-x-8 mb-6 md:mb-0 text-black">
              <a href="#" className="hover:opacity-50 transition-opacity"><Instagram className="w-[18px] h-[18px]" strokeWidth={1.5} /></a>
              <a href="#" className="hover:opacity-50 transition-opacity"><Facebook className="w-[18px] h-[18px]" strokeWidth={1.5} /></a>
              <a href="#" className="hover:opacity-50 transition-opacity"><Twitter className="w-[18px] h-[18px]" strokeWidth={1.5} /></a>
              <a href="#" className="hover:opacity-50 transition-opacity"><Youtube className="w-[18px] h-[18px]" strokeWidth={1.5} /></a>
            </div>

            <div className="text-[10px] font-bold tracking-[0.1em] uppercase text-gray-500">
              © 2026 ParisianChic
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
