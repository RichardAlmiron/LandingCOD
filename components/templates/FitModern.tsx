'use client';

import React, { useState } from 'react';
import { StoreData } from '@/lib/types';
import { Search, ShoppingBag, Heart, User, Menu, Dumbbell, ArrowRight, Play, Smartphone, Instagram, Twitter, Youtube, Facebook, MapPin, X } from 'lucide-react';
import { usePagination, ProductPagination } from './shared/Pagination';

export default function FitModernTemplate({ data }: { data: StoreData }) {
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
    <div className="min-h-full bg-white font-sans text-black">
      <div className="bg-black text-white text-[11px] py-2 px-6 flex justify-center font-bold tracking-widest uppercase">
        FREE STANDARD DELIVERY ON ORDERS OVER $75
      </div>
      <header className="bg-white sticky top-0 z-50 border-b border-gray-100">
        <div className="w-full mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-12">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 mr-2 hover:text-gray-600 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <div className="flex items-center cursor-pointer shrink-0">
              <span className="font-black text-3xl tracking-tighter uppercase leading-none text-black flex items-center">
                <Dumbbell className="w-8 h-8 mr-2 text-black" />
                FitModern
              </span>
            </div>
            <nav className="hidden lg:flex space-x-8 font-bold text-xs uppercase tracking-widest text-gray-600">
              <a href="#" className="hover:text-black transition-colors">Womens</a>
              <a href="#" className="hover:text-black transition-colors">Mens</a>
              <a href="#" className="hover:text-black transition-colors">Accessories</a>
              <a href="#" className="hover:text-black transition-colors">Lifting</a>
            </nav>
          </div>
          <div className="flex items-center space-x-6 text-black">
            <Search className="w-5 h-5 cursor-pointer hover:text-gray-600" />
            <User className="w-5 h-5 cursor-pointer hover:text-gray-600" />
            <div 
              onClick={() => toggleFavorite('header')}
              className="relative cursor-pointer hover:text-gray-600"
            >
              <Heart className={`w-5 h-5 ${favorites.length > 0 ? 'fill-red-500 text-red-500' : ''}`} />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[9px] font-bold px-1.5 rounded-full">{favorites.length}</span>
              )}
            </div>
            <div 
              onClick={addToCart}
              className="relative cursor-pointer hover:text-gray-600"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-black text-white text-[9px] font-bold px-1.5 rounded-full">{cartCount}</span>
              )}
            </div>
          </div>
        </div>
      </header>
      <main className="w-full mx-auto px-6 py-12">
        <div className="relative h-[650px] mb-20 group cursor-pointer overflow-hidden">
          <img src={data.bannerImage} alt="Banner" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms]" />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 text-white text-center w-full w-full">
            <h1 className="text-7xl font-black uppercase tracking-tighter mb-4 leading-none drop-shadow-2xl">{data.name}</h1>
            <p className="text-xl font-bold uppercase tracking-widest mb-10 drop-shadow-xl">{data.description}</p>
            <div className="flex justify-center space-x-4">
              <button className="bg-white text-black px-12 py-4 font-bold uppercase text-sm hover:bg-black hover:text-white transition-all">
                Shop Womens
              </button>
              <button className="bg-white text-black px-12 py-4 font-bold uppercase text-sm hover:bg-black hover:text-white transition-all">
                Shop Mens
              </button>
            </div>
          </div>
        </div>
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black uppercase tracking-tighter text-black">Trending Now ({totalItems})</h2>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-x-3 gap-y-8">
            {paginatedItems.map((product, idx) => (
              <div key={product.id || idx} data-product-id={product.id} className="group cursor-pointer flex flex-col">
                <div className="relative aspect-[3/4] mb-3 overflow-hidden bg-[#f4f4f4]">
                  <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                  <div className="absolute top-2 left-2 bg-white text-black text-[9px] font-bold px-1.5 py-0.5 uppercase tracking-widest">New</div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); addToCart(); }}
                    className="absolute bottom-2 left-2 right-2 bg-black text-white py-1.5 text-[9px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Add
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }}
                    className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Heart className={`w-3.5 h-3.5 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>
                </div>
                <div className="flex flex-col space-y-0.5 text-center">
                  <h3 className="text-xs font-bold uppercase text-black line-clamp-1 group-hover:text-gray-600">{product.title}</h3>
                  <div className="text-[9px] font-bold uppercase tracking-widest text-gray-500">{product.category}</div>
                  <div className="flex items-center justify-center space-x-2 pt-0.5">
                    <span className="font-bold text-xs text-black">${product.price}</span>
                  </div>
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

        {/* Shop by Edit */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black uppercase tracking-tighter text-black">Shop The Edit</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Vital Seamless', img: 'https://picsum.photos/600/800?random=280', desc: 'Do-it-all activewear.' },
              { name: 'Legacy', img: 'https://picsum.photos/600/800?random=281', desc: 'Old school bodybuilding.' },
              { name: 'Adapt', img: 'https://picsum.photos/600/800?random=282', desc: 'Premium lifting wear.' },
            ].map((edit, i) => (
              <div key={i} className="group cursor-pointer relative overflow-hidden aspect-[3/4]">
                <img src={edit.img} alt={edit.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-10 left-10 right-10">
                  <h3 className="text-white text-3xl font-black uppercase tracking-tighter mb-2">{edit.name}</h3>
                  <p className="text-gray-300 font-bold text-sm uppercase tracking-widest mb-6">{edit.desc}</p>
                  <button className="bg-white text-black px-8 py-3 font-bold uppercase text-xs hover:bg-black hover:text-white transition-colors">
                    Shop Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* The Lifting Club */}
        <div className="mb-24 bg-black text-white flex flex-col md:flex-row overflow-hidden">
          <div className="w-full md:w-1/2 p-12 md:p-24 flex flex-col justify-center items-start">
            <Dumbbell className="w-16 h-16 mb-8 text-white" />
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 leading-none">The Lifting<br/>Club</h2>
            <p className="text-lg font-bold text-gray-400 mb-10 uppercase tracking-widest leading-relaxed">
              More than just a gym. It's a community. Join us for events, exclusive drops, and heavy lifting.
            </p>
            <button className="border-2 border-white text-white px-10 py-4 font-bold uppercase text-sm hover:bg-white hover:text-black transition-colors flex items-center">
              Find Out More <ArrowRight className="w-5 h-5 ml-3" />
            </button>
          </div>
          <div className="w-full md:w-1/2 relative h-[500px] md:h-auto">
            <img src="https://picsum.photos/800/800?random=283" alt="Lifting Club" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors border border-white/30">
                <Play className="w-10 h-10 text-white fill-white ml-2" />
              </div>
            </div>
          </div>
        </div>

        {/* Community */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black uppercase tracking-tighter text-black mb-4">FitModern Family</h2>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">Tag @fitmodern to be featured</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="relative aspect-square overflow-hidden group cursor-pointer">
                <img src={`https://picsum.photos/400/400?random=${283 + i}`} alt="Community" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <Instagram className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* App Promo */}
        <div className="mb-24 bg-[#f4f4f4] rounded-3xl p-12 md:p-20 flex flex-col md:flex-row items-center justify-between">
          <div className="max-w-xl mb-12 md:mb-0">
            <h2 className="text-5xl font-black uppercase tracking-tighter mb-6 leading-none">Download The App</h2>
            <p className="text-lg font-bold text-gray-600 mb-10 uppercase tracking-widest leading-relaxed">
              Get exclusive early access to drops, app-only products, and a faster checkout experience.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="bg-black text-white px-8 py-4 font-bold uppercase text-xs hover:bg-gray-800 transition-colors flex items-center justify-center">
                <Smartphone className="w-5 h-5 mr-3" /> App Store
              </button>
              <button className="bg-black text-white px-8 py-4 font-bold uppercase text-xs hover:bg-gray-800 transition-colors flex items-center justify-center">
                <Smartphone className="w-5 h-5 mr-3" /> Google Play
              </button>
            </div>
          </div>
          <div className="relative w-full md:w-1/3 flex justify-center">
             <img src="https://picsum.photos/400/600?random=289" alt="App" className="w-64 rounded-[40px] shadow-2xl border-8 border-black" />
          </div>
        </div>

      </main>
      <footer className="bg-[#f4f4f4] text-black pt-24 pb-12">
        <div className="w-full mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20 text-[11px] font-bold uppercase tracking-widest text-gray-600">
            <div className="flex flex-col space-y-6">
              <h4 className="text-black text-sm">Help</h4>
              <a href="#" className="hover:text-black transition-colors">FAQ</a>
              <a href="#" className="hover:text-black transition-colors">Delivery Information</a>
              <a href="#" className="hover:text-black transition-colors">Returns Policy</a>
              <a href="#" className="hover:text-black transition-colors">Make A Return</a>
              <a href="#" className="hover:text-black transition-colors">Orders</a>
              <a href="#" className="hover:text-black transition-colors">Submit a Fake</a>
            </div>
            <div className="flex flex-col space-y-6">
              <h4 className="text-black text-sm">My Account</h4>
              <a href="#" className="hover:text-black transition-colors">Login</a>
              <a href="#" className="hover:text-black transition-colors">Register</a>
            </div>
            <div className="flex flex-col space-y-6">
              <h4 className="text-black text-sm">Pages</h4>
              <a href="#" className="hover:text-black transition-colors">FitModern Central</a>
              <a href="#" className="hover:text-black transition-colors">About Us</a>
              <a href="#" className="hover:text-black transition-colors">Careers</a>
              <a href="#" className="hover:text-black transition-colors">Student Discount</a>
              <a href="#" className="hover:text-black transition-colors">Veterans Discount</a>
            </div>
            <div className="lg:col-span-2 flex flex-col space-y-6">
              <h4 className="text-black text-sm">Sign Up For Updates</h4>
              <p className="text-gray-500 leading-relaxed">Be the first to know about new releases, exclusive events, and lifting tips.</p>
              <div className="flex border-b-2 border-black pb-2 mt-4">
                <input type="email" placeholder="Email Address" className="bg-transparent outline-none w-full text-black placeholder-gray-400" />
                <button className="text-black hover:text-gray-600 transition-colors"><ArrowRight className="w-6 h-6" /></button>
              </div>
              <div className="pt-8">
                <h4 className="text-black text-sm mb-6">Social</h4>
                <div className="flex space-x-6">
                  <a href="#" className="text-black hover:text-gray-600 transition-colors"><Instagram className="w-6 h-6" /></a>
                  <a href="#" className="text-black hover:text-gray-600 transition-colors"><Twitter className="w-6 h-6" /></a>
                  <a href="#" className="text-black hover:text-gray-600 transition-colors"><Youtube className="w-6 h-6" /></a>
                  <a href="#" className="text-black hover:text-gray-600 transition-colors"><Facebook className="w-6 h-6" /></a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-12 border-t border-gray-300 flex flex-col md:flex-row items-center justify-between text-[10px] font-bold uppercase tracking-widest text-gray-500">
            <span className="mb-6 md:mb-0">© 2026 FitModern LIMITED. ALL RIGHTS RESERVED.</span>
            <div className="flex flex-wrap justify-center gap-8">
              <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-black transition-colors">Terms & Conditions</a>
              <a href="#" className="hover:text-black transition-colors">Terms of Use</a>
              <a href="#" className="hover:text-black transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
