'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { StoreData } from '@/lib/types';
import { ShoppingBag, Menu, Search, User, ArrowRight, Instagram, Twitter, Facebook, Youtube, X, Heart } from 'lucide-react';
import { usePagination, ProductPagination } from './shared/Pagination';

export default function EditorialChicTemplate({ data }: { data: StoreData }) {
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
    <div className="min-h-full bg-white font-sans text-black overflow-x-hidden selection:bg-black selection:text-white" style={{ fontFamily: "'Neue Helvetica', Helvetica, Arial, sans-serif" }}>

      {/* ─── BRAND LOGO (OVERLAID) ─── */}
      <div className="fixed top-3 left-3 md:top-6 md:left-6 z-[60] mix-blend-difference text-white">
        <svg viewBox="0 0 132 55" className="w-[120px] md:w-[210px] h-auto fill-current">
          <path d="M109.28 15.65h-10.74l14.49-14.89h-21.9v1.78h17.38l-14.54 14.88h15.31v-1.77zM76.99 15.65h-8.08V.76h-2.1v14.89h-6.86L68.85.76h-2.26l-9.17 14.89h-2.31V.76h-2.1v14.89h-10.8v-1.78h8.7V.76h-2.1v13.11H41.51L50.4.76h-2.26l-9.17 14.89h-2.31V.76h-2.1v14.89h-10.8v-1.78h8.7V.76h-2.1v13.11H22.15L31.04.76h-2.26L19.61 15.65h-2.31V.76h-2.1v14.89H4.4V.76H2.3v14.89H0v1.77h17.51l8.77-14.24v14.24h8.31l8.77-14.24v14.24h8.31l8.77-14.24v14.24h8.31l8.77-14.24v14.24h18.27v-1.77z"></path>
          {/* A more accurate simplified EditorialChic vector path representation scaled down */}
          <path d="M131.7 41.8l-12.7-27.1h-5v30.5h2v-27.6l11.8 25.3h3.9zm-38.3 3.4h5.2v-1.6h-5.2v-11h6.6v-1.6h-8.8v14.2h8.8v-1.6h-6.6v-10.4zm-22.6-12.6h3v-1.6h-3c-4.4 0-7.7 3.2-7.7 7.7 0 4.5 3.3 7.7 7.7 7.7h3v-1.6h-3c-3.4 0-5.7-2.4-5.7-6.1.1-3.6 2.4-6.1 5.7-6.1zm-15.6 14.2h2v-14.2h-2v14.2zm-12.6-1.6h3.4v1.6H31v-14.2h2v12.6h9.6v-1.6zm-20.4 1.6h2L2 29.1v16.1h2v-13.6l8.8 13.6h9.4v-1.6H12.8L2 29.8v15.4z" transform="translate(0, 10)"></path>
          {/* Custom fallback if SVG path approximation fails visual test */}
        </svg>
        {/* Fallback to text if missing real logo - Using classic EditorialChic serif style overlay */}
        <div className="font-serif text-[42px] md:text-[80px] tracking-[-0.08em] uppercase shrink-0 leading-[0.8]">
          {data.logoText !== 'EditorialChic' ? data.logoText : null}
        </div>
      </div>

      {/* ─── NAVIGATION (OVERLAID) ─── */}
      <header className="fixed top-0 left-0 right-0 z-50 mix-blend-difference text-white pointer-events-none">
        <div className="w-full px-4 md:px-10 py-6 md:py-8 flex items-start justify-between">

          <div className="flex flex-col items-start space-y-6 pointer-events-auto mt-16 md:mt-24">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex items-center group"
            >
              <div className="flex flex-col space-y-[4px] w-6 md:w-8 group-hover:opacity-70 transition-opacity">
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 md:w-8 md:h-8 text-white" />
                ) : (
                  <>
                    <span className="block h-[1px] md:h-[1.5px] bg-white w-full"></span>
                    <span className="block h-[1px] md:h-[1.5px] bg-white w-full"></span>
                    <span className="block h-[1px] md:h-[1.5px] bg-white w-full"></span>
                  </>
                )}
              </div>
            </button>
          </div>

          <div className="flex items-start space-x-6 md:space-x-10 text-[11px] md:text-[13px] uppercase tracking-widest font-medium pointer-events-auto">
            <div className="flex items-center space-x-2 cursor-pointer border-b border-white pb-0.5 group">
              <span className="group-hover:opacity-70 transition-opacity">Search</span>
            </div>
            <span className="cursor-pointer hidden sm:block hover:opacity-70 transition-opacity">Log In</span>
            <span className="cursor-pointer hidden sm:block hover:opacity-70 transition-opacity">Help</span>
            <div 
              onClick={() => toggleFavorite('header')}
              className="relative cursor-pointer hover:opacity-70 transition-opacity"
            >
              <Heart className={`w-4 h-4 md:w-5 md:h-5 stroke-[1.5] ${favorites.length > 0 ? 'fill-red-500 text-red-500' : ''}`} />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-2 text-[9px] font-bold">{favorites.length}</span>
              )}
            </div>
            <div 
              onClick={addToCart}
              className="relative cursor-pointer hover:opacity-70 transition-opacity flex items-center space-x-2"
            >
              <ShoppingBag className="w-4 h-4 md:w-5 md:h-5 stroke-[1.5]" />
              {cartCount > 0 && (
                <span className="absolute top-2 right-[-8px] text-[9px] font-bold">{cartCount}</span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ─── MAIN CONTENT ─── */}
      <main className="w-full">

        {/* HERO EDITORIAL VIDEO / IMAGE (Full Screen) */}
        <div className="relative h-[90vh] md:h-[100svh] w-full snap-start overflow-hidden bg-gray-100">
          <Image
            src={data.bannerImage}
            alt="Campaign"
            fill
            className="object-cover object-center"
            referrerPolicy="no-referrer"
            priority
          />
          <div className="absolute inset-0 bg-black/10 transition-colors duration-500"></div>

          {/* Subtle Campaign Text */}
          <div className="absolute top-[80%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-white flex flex-col items-center w-full px-4 text-center mix-blend-difference pointer-events-none">
            <h2 className="text-[12px] md:text-[14px] uppercase tracking-[0.2em] mb-4 md:mb-6 leading-relaxed opacity-90 max-w-sm md:max-w-md">
              {data.description || "NEW COLLECTION SR26"}
            </h2>
          </div>

          {/* Quick Category Buttons */}
          <div className="absolute bottom-12 md:bottom-20 left-1/2 -translate-x-1/2 flex space-x-8 md:space-x-16 text-white text-[10px] md:text-[12px] uppercase tracking-[0.2em] font-medium mix-blend-difference z-20">
            <button className="hover:opacity-50 transition-opacity border-b border-transparent hover:border-white pb-0.5">Woman</button>
            <button className="hover:opacity-50 transition-opacity border-b border-transparent hover:border-white pb-0.5">Man</button>
            <button className="hover:opacity-50 transition-opacity border-b border-white pb-0.5 opacity-100">Kids</button>
            <button className="hidden sm:block hover:opacity-50 transition-opacity border-b border-transparent hover:border-white pb-0.5">Beauty</button>
          </div>
        </div>

        {/* ─── EDITORIAL SCROLL (EditorialChic's Infinite Feed Style) ─── */}
        <div className="w-full flex flex-col pt-20 md:pt-32">

          {/* Editorial Block 1 (Large Image, Left Aligned) */}
          <div className="w-full px-4 md:px-24 flex justify-start mb-24 md:mb-40">
            <div className="w-full lg:w-[65%] relative aspect-[3/4] md:aspect-[4/5] overflow-hidden group cursor-pointer bg-gray-100">
              <Image src="https://picsum.photos/1200/1600?random=11" alt="Editorial 1" fill className="object-cover object-center group-hover:scale-105 transition-transform duration-[1500ms] ease-out" />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                <h3 className="text-white text-[11px] md:text-[13px] uppercase tracking-[0.15em] mb-2 font-medium">Textured Wool Coat</h3>
                <span className="text-white text-[11px] md:text-[13px] font-light tracking-wider hover:underline underline-offset-4 cursor-pointer">View Product</span>
              </div>
            </div>
          </div>

          {/* Editorial Block 2 (Medium Image, Right Aligned offset) */}
          <div className="w-full px-4 md:px-24 flex justify-end mb-32 md:mb-48">
            <div className="w-[85%] sm:w-[50%] lg:w-[45%] relative aspect-[2/3] overflow-hidden group cursor-pointer bg-gray-100 mt-0 lg:-mt-[20%] z-10">
              <Image src="https://picsum.photos/800/1200?random=12" alt="Editorial 2" fill className="object-cover object-center group-hover:scale-105 transition-transform duration-[1500ms] ease-out" />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="absolute bottom-8 left-8 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                <h3 className="text-white text-[11px] md:text-[13px] uppercase tracking-[0.15em] mb-2 font-medium">Leather Heeled Boots</h3>
                <span className="text-white text-[11px] md:text-[13px] font-light tracking-wider hover:underline underline-offset-4 cursor-pointer">View Product</span>
              </div>
            </div>
          </div>

          {/* Double Grid (Classic Catalog View - Paginated) */}
          <div className="w-full px-2 md:px-8 mb-32 md:mb-48">
            <div className="flex items-center justify-between mb-8 px-2 md:px-4">
              <h2 className="text-[12px] md:text-[14px] uppercase tracking-[0.15em] font-medium">New In / Basics ({totalItems})</h2>
              <div className="flex space-x-6 text-[11px] md:text-[13px] uppercase tracking-widest text-gray-500 font-medium">
                <button className="text-black border-b border-black pb-0.5">View All</button>
              </div>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 md:gap-3">
              {paginatedItems.map((product, i) => (
                <div key={i} data-product-id={product.id} className="group cursor-pointer flex flex-col mb-8 md:mb-0">
                  <div className="relative aspect-[2/3] overflow-hidden bg-[#f4f4f4] mb-2">
                    <Image src={product.imageUrl} alt={product.title} fill className="object-cover object-center group-hover:opacity-80 transition-opacity duration-300 mix-blend-darken p-0" />
                    <button 
                      onClick={(e) => { e.stopPropagation(); addToCart(); }}
                      className="absolute bottom-2 left-2 right-2 bg-black text-white py-1.5 text-[8px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Add
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }}
                      className="absolute top-2 right-2 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Heart className={`w-3 h-3 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                    </button>
                  </div>
                  <div className="flex flex-col items-start px-1">
                    <h3 className="text-[9px] md:text-[10px] uppercase tracking-[0.05em] font-medium text-black line-clamp-1 w-full">{product.title}</h3>
                    <div className="text-[9px] md:text-[10px] tracking-widest text-[#666] mt-0.5">${product.price}</div>
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

          {/* Full Width Collection Banner */}
          <div className="w-full aspect-[4/5] sm:aspect-[16/9] relative mb-32 md:mb-40 group cursor-pointer overflow-hidden">
            <Image src="https://picsum.photos/1920/1080?random=20" alt="Collection Banner" fill className="object-cover object-center group-hover:scale-105 transition-transform duration-[2000ms] ease-in-out" />
            <div className="absolute bottom-10 left-6 md:bottom-16 md:left-16 text-white text-[42px] md:text-[80px] font-serif uppercase tracking-[-0.05em] leading-[0.85] mix-blend-difference pointer-events-none">
              EditorialChic<br />ORIGINS
            </div>
          </div>

          {/* Remaining Products Grid */}
          <div className="w-full px-2 md:px-8 mb-32">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 gap-y-12 md:gap-y-16">
              {data.products.slice(4).map((product, i) => (
                <div key={i} data-product-id={product.id} className="group cursor-pointer flex flex-col">
                  <div className="relative aspect-[2/3] overflow-hidden bg-[#f4f4f4] mb-3">
                    <Image src={product.imageUrl} alt={product.title} fill className="object-cover object-center group-hover:opacity-80 transition-opacity duration-300 blend-darken" />
                  </div>
                  <div className="flex flex-col items-start px-1">
                    <h3 className="text-[10px] md:text-[11px] uppercase tracking-[0.05em] font-medium text-black line-clamp-1 w-full">{product.title}</h3>
                    <div className="text-[10px] md:text-[11px] tracking-widest text-[#666] mt-1">${product.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* JOIN NEWSLETTER (Aesthetic block) */}
        <div className="w-full border-t border-black pt-20 pb-32 px-6 md:px-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
          <div className="w-full md:w-1/2">
            <h3 className="text-[18px] md:text-[24px] uppercase tracking-widest mb-2 font-medium">Join our newsletter</h3>
            <p className="text-[12px] md:text-[13px] text-gray-500 max-w-sm mb-8 md:mb-0">Stay up to date with the latest trends, editorial looks, and exclusive offers.</p>
          </div>

          <div className="w-full md:w-1/2 flex border-b border-black pb-2 group">
            <input type="email" placeholder="ENTER YOUR EMAIL ADDRESS" className="w-full bg-transparent outline-none text-[11px] md:text-[13px] uppercase tracking-widest font-medium placeholder:text-gray-400 group-hover:placeholder:text-gray-600 transition-colors" />
            <button className="text-[11px] md:text-[13px] uppercase tracking-widest font-medium shrink-0 hover:text-gray-500 transition-colors ml-4">Subscribe</button>
          </div>
        </div>

      </main>

      {/* ─── FOOTER (Extremely clean & barebones) ─── */}
      <footer className="w-full bg-white pt-10 pb-20 px-6 md:px-12">
        <div className="max-w-[1920px] mx-auto">

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-16 mb-24">

            <div className="space-y-6">
              <h4 className="text-[12px] uppercase tracking-[0.1em] font-medium">Help</h4>
              <ul className="flex flex-col space-y-4 text-[11px] text-gray-500 tracking-wider">
                <li><a href="#" className="hover:text-black transition-colors">Shop at {data.name}</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Product</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Payment</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Shipping</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Exchanges and returns</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Shops and company</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Clothes collection programme</a></li>
                <li><a href="#" className="hover:text-black transition-colors">My account</a></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-[12px] uppercase tracking-[0.1em] font-medium">Follow Us</h4>
              <ul className="flex flex-col space-y-4 text-[11px] text-gray-500 tracking-wider">
                <li><a href="#" className="hover:text-black transition-colors">Newsletter</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Pinterest</a></li>
                <li><a href="#" className="hover:text-black transition-colors">YouTube</a></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-[12px] uppercase tracking-[0.1em] font-medium">Company</h4>
              <ul className="flex flex-col space-y-4 text-[11px] text-gray-500 tracking-wider">
                <li><a href="#" className="hover:text-black transition-colors">About us</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Offices</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Stores</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Work with us</a></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-[12px] uppercase tracking-[0.1em] font-medium">Policies</h4>
              <ul className="flex flex-col space-y-4 text-[11px] text-gray-500 tracking-wider">
                <li><a href="#" className="hover:text-black transition-colors">Privacy policy</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Purchase conditions</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Cookies settings</a></li>
              </ul>
            </div>

          </div>

          <div className="flex flex-col py-6 border-t border-gray-200">
            <div className="text-[10px] text-gray-500 tracking-widest uppercase mb-4">
              United States &nbsp;|&nbsp; English
            </div>
            <div className="text-[10px] text-gray-400 uppercase tracking-widest flex items-center justify-between">
              <span>© All rights reserved</span>
              <span className="text-black font-serif tracking-[-0.05em] text-[14px]">EditorialChic</span>
            </div>
            <div className="mt-8 text-[9px] text-[#A2A2A2] max-w-4xl leading-relaxed uppercase">
              NAME AND ADDRESS OF THE MANUFACTURER: INDUSTRIA DE DISEÑO TEXTIL, S.A. (INDITEX, S.A.) - AVDA. DE LA DIPUTACIÓN, EDIFICIO INDITEX, 15143, ARTEIXO (A CORUÑA), SPAIN
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
