'use client';

import React, { useState } from 'react';
import { StoreData } from '@/lib/types';
import { Search, ShoppingBag, Heart, User, Menu, ChevronDown, Globe, ArrowRight, PlayCircle, Smartphone, Facebook, Twitter, Instagram, Youtube, X } from 'lucide-react';
import { usePagination, ProductPagination } from './shared/Pagination';

export default function LuxEditTemplate({ data }: { data: StoreData }) {
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
    <div className="min-h-full bg-white font-sans text-[#000]">
      <div className="bg-black text-white text-[10px] py-2 px-6 flex justify-between items-center font-bold tracking-[0.2em] uppercase">
        <div className="flex items-center space-x-6">
          <a href="#" className="hover:text-gray-400">Sale</a>
          <a href="#" className="hover:text-gray-400">New In</a>
        </div>
        <div className="flex items-center space-x-6">
          <a href="#" className="hover:text-gray-400">Download the App</a>
        </div>
      </div>
      <header className="bg-white border-b border-gray-200">
        <div className="w-full mx-auto px-6 py-8 flex flex-col items-center">
          <div className="font-serif text-5xl tracking-[0.2em] uppercase cursor-pointer mb-8">
            LuxEdit
          </div>
          <div className="w-full flex items-center justify-between">
            <nav className="hidden lg:flex space-x-8 font-bold text-[11px] uppercase tracking-widest">
              <a href="#" className="hover:text-gray-500">Designers</a>
              <a href="#" className="hover:text-gray-500">Clothing</a>
              <a href="#" className="hover:text-gray-500">Shoes</a>
              <a href="#" className="hover:text-gray-500">Bags</a>
              <a href="#" className="hover:text-gray-500">Accessories</a>
              <a href="#" className="hover:text-gray-500">Jewelry</a>
              <a href="#" className="hover:text-gray-500">Beauty</a>
            </nav>
            <div className="flex items-center space-x-8">
              <div className="hidden md:flex items-center border-b border-black pb-1 w-48">
                <Search className="w-4 h-4 mr-2" />
                <input type="text" placeholder="Search" className="bg-transparent outline-none text-[10px] font-bold uppercase tracking-widest w-full" />
              </div>
              <div className="flex items-center space-x-6">
                <User className="w-5 h-5 cursor-pointer hover:opacity-50" />
              <div 
                onClick={() => toggleFavorite('header')}
                className="relative cursor-pointer hover:opacity-50"
              >
                <Heart className={`w-5 h-5 ${favorites.length > 0 ? 'fill-red-500 text-red-500' : ''}`} />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-2 bg-black text-white text-[9px] font-bold px-1 rounded-full">{favorites.length}</span>
                )}
              </div>
              <div 
                onClick={addToCart}
                className="relative cursor-pointer hover:opacity-50"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-2 bg-black text-white text-[9px] font-bold px-1 rounded-full">{cartCount}</span>
                )}
              </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="w-full mx-auto px-6 py-12">
        <div className="relative h-[650px] mb-24 group cursor-pointer overflow-hidden">
          <img src={data.bannerImage} alt="Banner" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
          <div className="absolute inset-0 bg-black/5" />
          <div className="absolute bottom-16 left-16 bg-white p-12 max-w-lg border border-black">
            <h1 className="text-4xl font-serif mb-6 tracking-tight uppercase leading-tight">{data.name}</h1>
            <p className="text-xs font-bold tracking-[0.2em] uppercase mb-10 text-gray-600">{data.description}</p>
            <button className="bg-black text-white px-12 py-4 font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-gray-800 transition-all">
              Shop the Edit
            </button>
          </div>
        </div>
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif uppercase tracking-widest mb-4">The New Arrivals ({totalItems})</h2>
            <div className="w-16 h-px bg-black mx-auto" />
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-x-4 gap-y-8">
            {paginatedItems.map((product, idx) => (
              <div key={product.id || idx} data-product-id={product.id} className="group cursor-pointer flex flex-col">
                <div className="relative aspect-[3/4] mb-4 overflow-hidden bg-[#f9f9f9]">
                  <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }}
                    className="absolute bottom-3 right-3 bg-white p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Heart className={`w-4 h-4 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); addToCart(); }}
                    className="absolute bottom-3 left-3 bg-black text-white px-3 py-1.5 text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-col space-y-1 text-center">
                  <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400">{product.category}</div>
                  <h3 className="text-[11px] font-bold uppercase tracking-widest text-gray-900 line-clamp-2 min-h-[28px] leading-relaxed group-hover:underline">{product.title}</h3>
                  <div className="flex items-center justify-center space-x-2 pt-1">
                    <span className="font-bold text-xs tracking-widest">${product.price}</span>
                    {product.originalPrice && <span className="text-[10px] text-gray-400 line-through tracking-widest">${product.originalPrice}</span>}
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

        {/* Shop by Category */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif uppercase tracking-widest mb-4">Shop by Category</h2>
            <div className="w-16 h-px bg-black mx-auto" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Dresses', img: 'https://picsum.photos/400/500?random=440' },
              { name: 'Shoes', img: 'https://picsum.photos/400/500?random=441' },
              { name: 'Bags', img: 'https://picsum.photos/400/500?random=442' },
              { name: 'Jewelry', img: 'https://picsum.photos/400/500?random=443' },
            ].map((category, i) => (
              <div key={i} className="group cursor-pointer relative aspect-[4/5] overflow-hidden">
                <img src={category.img} alt={category.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                <div className="absolute bottom-8 left-0 right-0 text-center">
                  <h3 className="text-white font-serif text-2xl uppercase tracking-widest mb-4">{category.name}</h3>
                  <span className="inline-flex items-center text-white text-[10px] font-bold uppercase tracking-[0.2em] border-b border-white pb-1 hover:text-gray-200 hover:border-gray-200 transition-colors">
                    Shop Now <ArrowRight className="w-3 h-3 ml-2" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* The Edit */}
        <div className="mb-24 bg-[#f9f9f9] p-12 md:p-24 flex flex-col md:flex-row items-center justify-between">
          <div className="w-full md:w-1/2 mb-12 md:mb-0 md:pr-20">
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-500 mb-6">Editorial</h2>
            <h3 className="text-4xl font-serif uppercase tracking-widest mb-8 leading-tight">The Summer Escape Edit</h3>
            <p className="text-sm text-gray-600 mb-10 leading-relaxed font-light">
              Discover our curated selection of vacation-ready pieces. From breezy linen dresses to statement swimwear, everything you need for your next getaway.
            </p>
            <button className="bg-black text-white px-12 py-4 font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-gray-800 transition-all">
              Read & Shop
            </button>
          </div>
          <div className="w-full md:w-1/2 relative aspect-[3/4] md:aspect-square overflow-hidden group cursor-pointer">
            <img src="https://picsum.photos/800/800?random=444" alt="The Edit" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms]" />
            <div className="absolute inset-0 bg-black/10 flex items-center justify-center group-hover:bg-black/20 transition-colors">
              <PlayCircle className="w-16 h-16 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
            </div>
          </div>
        </div>

        {/* Designers */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif uppercase tracking-widest mb-4">Featured Designers</h2>
            <div className="w-16 h-px bg-black mx-auto" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              'Maison A', 'Atelier B', 'Casa C', 'Studio D',
              'Maison E', 'Atelier F', 'Casa G', 'Studio H'
            ].map((designer, i) => (
              <div key={i} className="group cursor-pointer py-8 border border-gray-100 hover:border-black transition-colors">
                <h3 className="text-lg font-serif uppercase tracking-widest group-hover:text-gray-600 transition-colors">{designer}</h3>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <a href="#" className="inline-block text-[10px] font-bold uppercase tracking-[0.3em] border-b border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-colors">
              View All Designers
            </a>
          </div>
        </div>

        {/* App Promo */}
        <div className="mb-24 bg-black text-white p-12 md:p-24 flex flex-col md:flex-row items-center justify-between relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-[url('https://picsum.photos/800/800?random=445')] bg-cover bg-center opacity-40 mix-blend-overlay" />
          <div className="w-full md:w-1/2 relative z-10">
            <div className="flex items-center mb-8">
              <Smartphone className="w-12 h-12 mr-6" />
              <h2 className="text-3xl font-serif uppercase tracking-widest">The LuxEdit App</h2>
            </div>
            <p className="text-sm text-gray-300 mb-10 leading-relaxed font-light max-w-md">
              Enjoy 10% off your first app order with code APP10. Shop the latest arrivals, create wishlists, and read exclusive editorial content on the go.
            </p>
            <div className="flex space-x-6">
              <button className="bg-white text-black px-10 py-4 font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-gray-200 transition-colors">
                Download Now
              </button>
            </div>
          </div>
        </div>

      </main>
      <footer className="bg-[#f9f9f9] pt-24 pb-12 border-t border-gray-200">
        <div className="w-full mx-auto px-6">
          <div className="text-center mb-20">
            <div className="font-serif text-5xl tracking-[0.2em] uppercase mb-8">
              LuxEdit
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 max-w-2xl mx-auto leading-relaxed">
              The world's premier luxury fashion destination. Discover the latest collections from over 800 of the world's most coveted designer brands.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24 text-[10px] font-bold uppercase tracking-[0.2em]">
            <div className="flex flex-col space-y-6">
              <h4 className="text-black mb-4">Customer Care</h4>
              <a href="#" className="text-gray-500 hover:text-black transition-colors">Contact Us</a>
              <a href="#" className="text-gray-500 hover:text-black transition-colors">Shipping</a>
              <a href="#" className="text-gray-500 hover:text-black transition-colors">Returns</a>
              <a href="#" className="text-gray-500 hover:text-black transition-colors">FAQs</a>
              <a href="#" className="text-gray-500 hover:text-black transition-colors">Track Your Order</a>
            </div>
            <div className="flex flex-col space-y-6">
              <h4 className="text-black mb-4">About Us</h4>
              <a href="#" className="text-gray-500 hover:text-black transition-colors">Our Story</a>
              <a href="#" className="text-gray-500 hover:text-black transition-colors">Careers</a>
              <a href="#" className="text-gray-500 hover:text-black transition-colors">Affiliates</a>
              <a href="#" className="text-gray-500 hover:text-black transition-colors">Advertising</a>
              <a href="#" className="text-gray-500 hover:text-black transition-colors">Terms & Conditions</a>
            </div>
            <div className="flex flex-col space-y-6">
              <h4 className="text-black mb-4">Services</h4>
              <a href="#" className="text-gray-500 hover:text-black transition-colors">Personal Shopping</a>
              <a href="#" className="text-gray-500 hover:text-black transition-colors">Gift Cards</a>
              <a href="#" className="text-gray-500 hover:text-black transition-colors">Download the App</a>
              <a href="#" className="text-gray-500 hover:text-black transition-colors">EIP Program</a>
            </div>
            <div className="flex flex-col space-y-6">
              <h4 className="text-black mb-4">Newsletter</h4>
              <p className="text-gray-500 normal-case tracking-normal font-light text-sm mb-4">Sign up for the latest fashion news and exclusive offers.</p>
              <div className="flex border-b border-black pb-2">
                <input type="email" placeholder="Email Address" className="bg-transparent outline-none w-full text-black placeholder-gray-400" />
                <button className="hover:text-gray-500 transition-colors ml-4"><ArrowRight className="w-4 h-4" /></button>
              </div>
              <div className="pt-8 flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-black transition-colors"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="text-gray-400 hover:text-black transition-colors"><Facebook className="w-5 h-5" /></a>
                <a href="#" className="text-gray-400 hover:text-black transition-colors"><Twitter className="w-5 h-5" /></a>
                <a href="#" className="text-gray-400 hover:text-black transition-colors"><Youtube className="w-5 h-5" /></a>
              </div>
            </div>
          </div>
          
          <div className="pt-12 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400">
            <span className="mb-6 md:mb-0">© 2026 LuxEdit. ALL RIGHTS RESERVED.</span>
            <div className="flex flex-wrap justify-center gap-8">
              <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-black transition-colors">Cookie Policy</a>
              <a href="#" className="hover:text-black transition-colors">Terms & Conditions</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
