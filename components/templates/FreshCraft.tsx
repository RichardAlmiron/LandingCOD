'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { StoreData } from '@/lib/types';
import { Search, ShoppingBag, Heart, User, Sparkles, Leaf, Droplets, ArrowRight, Menu, X } from 'lucide-react';
import { usePagination, ProductPagination } from './shared/Pagination';

export default function FreshCraftTemplate({ data }: { data: StoreData }) {
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
    <div className="min-h-full bg-white font-sans text-black selection:bg-black selection:text-white overflow-x-hidden">

      {/* ─── PROMO BAR ─── */}
      <div className="bg-black text-white text-[12px] py-3 px-6 flex justify-center items-center font-bold tracking-widest uppercase border-b border-black">
        Fresh Handmade Cosmetics | 100% Vegetarian | Cruelty Free
      </div>

      {/* ─── HEADER ─── */}
      <header className="bg-white sticky top-0 z-50 border-b-4 border-black transition-all">
        <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 h-[72px] lg:h-[88px] flex items-center justify-between">

          <div className="flex items-center space-x-6 lg:space-x-10 h-full">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : (
                <div className="flex flex-col space-y-1.5 cursor-pointer">
                  <span className="w-6 h-1 bg-black block"></span>
                  <span className="w-6 h-1 bg-black block"></span>
                  <span className="w-6 h-1 bg-black block"></span>
                </div>
              )}
            </button>

            <nav className="hidden lg:flex h-full font-black text-[14px] uppercase tracking-wider text-black">
              <div className="h-full flex items-center px-4 hover:bg-black hover:text-white transition-colors cursor-pointer">
                <a href="#">New</a>
              </div>
              <div className="h-full flex items-center px-4 hover:bg-black hover:text-white transition-colors cursor-pointer">
                <a href="#">Bath</a>
              </div>
              <div className="h-full flex items-center px-4 hover:bg-black hover:text-white transition-colors cursor-pointer">
                <a href="#">Shower</a>
              </div>
              <div className="h-full flex items-center px-4 hover:bg-black hover:text-white transition-colors cursor-pointer">
                <a href="#">Hair</a>
              </div>
              <div className="h-full flex items-center px-4 hover:bg-black hover:text-white transition-colors cursor-pointer border-x-4 border-transparent hover:border-black">
                <a href="#">Gifts</a>
              </div>
            </nav>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center cursor-pointer bg-white px-6">
            <span className="font-black text-[40px] md:text-[56px] tracking-tighter leading-none text-black">
              FreshCraft
            </span>
          </div>

          <div className="flex items-center space-x-6 text-black h-full">
            <div className="hidden xl:flex items-center bg-transparent border-2 border-black rounded-full px-4 py-2 w-48 group focus-within:w-64 transition-all">
              <Search className="w-4 h-4 text-black mr-2" strokeWidth={3} />
              <input type="text" placeholder="FIND IT" className="bg-transparent outline-none text-[12px] font-black uppercase tracking-widest w-full placeholder-gray-400" />
            </div>

            <Search className="xl:hidden w-6 h-6 lg:w-7 lg:h-7 cursor-pointer hover:opacity-70 transition-opacity" strokeWidth={2.5} />
            <div 
              onClick={() => toggleFavorite('header')}
              className="cursor-pointer hover:opacity-70 transition-opacity relative"
            >
              <Heart className={`w-6 h-6 lg:w-7 lg:h-7 ${favorites.length > 0 ? 'fill-red-500 text-red-500' : ''}`} strokeWidth={2.5} />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{favorites.length}</span>
              )}
            </div>
            <div 
              onClick={addToCart}
              className="relative cursor-pointer hover:opacity-70 transition-opacity"
            >
              <ShoppingBag className="w-6 h-6 lg:w-7 lg:h-7" strokeWidth={2.5} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{cartCount}</span>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="w-full">

        {/* ─── HERO EDITORIAL BANNER ─── */}
        <section className="w-full max-w-[1440px] mx-auto md:px-8 py-8 group cursor-pointer">
          <div className="relative w-full h-[500px] md:h-[650px] overflow-hidden border-y-4 md:border-4 border-black shadow-[4px_4px_0_0_#000] md:shadow-[8px_8px_0_0_#000] transition-transform hover:-translate-y-1 hover:-translate-x-1">
            <Image
              src={data.bannerImage}
              alt="FreshCraft Campaign"
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-[3000ms] ease-out brightness-95"
              priority
              referrerPolicy="no-referrer"
            />

            <div className="absolute inset-0 bg-black/10 transition-colors" />

            <div className="absolute inset-x-0 bottom-0 p-8 md:p-16 flex flex-col items-center justify-end text-center bg-gradient-to-t from-black/80 to-transparent">
              <span className="bg-[#4caf50] border-2 border-black text-white text-[12px] font-black uppercase tracking-widest px-4 py-1 rounded-full mb-6 flex items-center shadow-[4px_4px_0_0_#000] rotate-[-2deg]">
                <Leaf className="w-3 h-3 mr-2" fill="currentColor" /> Out Now
              </span>
              <h1 className="text-white text-[48px] md:text-[80px] font-black tracking-tighter leading-[0.9] mb-6 drop-shadow-xl uppercase">
                {data.name}
              </h1>
              <p className="text-white text-[16px] md:text-[20px] font-bold mb-8 max-w-xl drop-shadow-md">
                {data.description || 'Dive into our newest collection of fresh, handmade bath times.'}
              </p>
              <div className="flex gap-4">
                <button className="bg-black border-2 border-white text-white px-10 py-4 font-black uppercase tracking-widest text-[14px] hover:bg-white hover:text-black hover:border-black transition-colors shadow-[4px_4px_0_0_#fff] hover:shadow-[4px_4px_0_0_#000]">
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SHOP BY CATEGORY (BUBBLES) ─── */}
        <section className="max-w-[1440px] mx-auto px-6 py-10 md:py-16">
          <h2 className="text-[32px] md:text-[48px] font-black tracking-tighter text-black uppercase mb-10 text-center">Shop Best Sellers</h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
            <div className="flex flex-col items-center group cursor-pointer">
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-black mb-4 relative shadow-[4px_4px_0_0_#000] group-hover:-translate-y-1 transition-transform">
                <Image src="https://picsum.photos/400/400?random=1181" alt="Bath Bombs" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <h3 className="font-black text-[20px] md:text-[24px] uppercase tracking-tighter text-black group-hover:underline">Bath Bombs</h3>
            </div>
            <div className="flex flex-col items-center group cursor-pointer">
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-black mb-4 relative shadow-[4px_4px_0_0_#000] group-hover:-translate-y-1 transition-transform">
                <Image src="https://picsum.photos/400/400?random=1182" alt="Shower" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <h3 className="font-black text-[20px] md:text-[24px] uppercase tracking-tighter text-black group-hover:underline">Shower</h3>
            </div>
            <div className="flex flex-col items-center group cursor-pointer">
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-black mb-4 relative shadow-[4px_4px_0_0_#000] group-hover:-translate-y-1 transition-transform">
                <Image src="https://picsum.photos/400/400?random=1183" alt="Hair Care" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <h3 className="font-black text-[20px] md:text-[24px] uppercase tracking-tighter text-black group-hover:underline">Hair Care</h3>
            </div>
            <div className="flex flex-col items-center group cursor-pointer">
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-black mb-4 relative shadow-[4px_4px_0_0_#000] group-hover:-translate-y-1 transition-transform">
                <Image src="https://picsum.photos/400/400?random=1184" alt="Face" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <h3 className="font-black text-[20px] md:text-[24px] uppercase tracking-tighter text-black group-hover:underline">Face</h3>
            </div>
          </div>
        </section>

        {/* ─── FRESH INGREDIENTS BANNER ─── */}
        <section className="w-full bg-[#fce4ec] border-y-4 border-black py-16">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="w-full md:w-1/2">
              <h2 className="text-[40px] md:text-[56px] font-black uppercase tracking-tighter mb-6 leading-none">
                Fresh Matters
              </h2>
              <p className="text-[18px] md:text-[22px] font-bold text-black mb-8 leading-relaxed">
                We believe in making effective products from fresh, organic fruit and vegetables, the finest essential oils and safe synthetics.
              </p>
              <div className="space-y-4 mb-10 text-[18px] font-black uppercase tracking-tighter">
                <div className="flex items-center"><Leaf className="w-6 h-6 mr-3 text-[#4caf50]" strokeWidth={3} /> 100% Vegetarian</div>
                <div className="flex items-center"><Sparkles className="w-6 h-6 mr-3 text-[#ffc107]" strokeWidth={3} /> Handmade With Love</div>
                <div className="flex items-center"><Droplets className="w-6 h-6 mr-3 text-[#2196f3]" strokeWidth={3} /> Naked Packaging</div>
              </div>
              <button className="bg-white border-4 border-black text-black px-10 py-4 font-black uppercase tracking-widest text-[14px] hover:bg-black hover:text-white transition-colors shadow-[6px_6px_0_0_#000]">
                Discover Our Ingredients
              </button>
            </div>
            <div className="w-full md:w-1/2 relative aspect-video border-4 border-black shadow-[8px_8px_0_0_#000] rotate-2 overflow-hidden bg-white">
              <Image src="https://picsum.photos/800/450?random=1190" alt="Ingredients" fill className="object-cover" />
            </div>
          </div>
        </section>

        {/* ─── FRESH ARRIVALS WITH PAGINATION ─── */}
        <section className="max-w-[1440px] mx-auto px-6 py-20 lg:py-24">
          <div className="flex items-end justify-between mb-12">
            <h2 className="text-[40px] md:text-[56px] font-black tracking-tighter text-black uppercase leading-[0.9]">
              Fresh Arrivals ({totalItems})
            </h2>
            <a href="#" className="hidden sm:flex text-[16px] font-black uppercase tracking-widest text-black hover:underline border-b-4 border-black pb-1">
              Shop All New
            </a>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {paginatedItems.map((product, idx) => (
              <div key={product.id || idx} data-product-id={product.id} className="group cursor-pointer flex flex-col relative bg-white border-4 border-black rounded-xl p-3 shadow-[4px_4px_0_0_#000] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0_0_#000] transition-all">

                {/* Badges */}
                <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
                  {idx % 4 === 0 && (
                    <span className="bg-[#ffeb3b] border-2 border-black text-black text-[9px] font-black uppercase tracking-widest px-2 py-0.5 shadow-[2px_2px_0_0_#000]">
                      Limited
                    </span>
                  )}
                  {idx % 3 === 0 && (
                    <span className="bg-[#4caf50] border-2 border-black text-white text-[9px] font-black uppercase tracking-widest px-2 py-0.5 shadow-[2px_2px_0_0_#000]">
                      Vegan
                    </span>
                  )}
                </div>

                {/* Favorite Button */}
                <button 
                  onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }}
                  className="absolute top-2 right-2 z-10 p-1.5 bg-white/90 rounded-full shadow-sm transition-colors"
                >
                  <Heart className={`w-4 h-4 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-500'}`} />
                </button>

                <div className="relative w-full aspect-square mb-3 bg-gray-50 flex items-center justify-center overflow-hidden border-2 border-black">
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    fill
                    className="object-contain p-3 group-hover:scale-110 transition-transform duration-[800ms] ease-out mix-blend-multiply"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="flex flex-col flex-1 text-center px-1">
                  <div className="font-black text-[10px] text-gray-500 uppercase tracking-widest mb-1 line-clamp-1">
                    {product.category || 'Fresh Cosmetics'}
                  </div>
                  <h3 className="text-[16px] font-black text-black uppercase tracking-tighter leading-snug line-clamp-2 mb-2 group-hover:underline">
                    {product.title}
                  </h3>

                  <div className="flex flex-col items-center justify-center mt-auto">
                    {product.originalPrice ? (
                      <div className="flex items-center space-x-2">
                        <span className="font-black text-[18px] text-[#e91e63]">${product.price}</span>
                        <span className="text-[12px] font-bold text-gray-400 line-through">${product.originalPrice}</span>
                      </div>
                    ) : (
                      <span className="font-black text-[18px] text-black">${product.price}</span>
                    )}
                  </div>

                  <button 
                    onClick={(e) => { e.stopPropagation(); addToCart(); }}
                    className="w-full mt-3 bg-black text-white border-2 border-black font-black uppercase tracking-widest text-[11px] py-2 hover:bg-white hover:text-black transition-colors"
                  >
                    Add To Bag
                  </button>
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
        </section>

      </main>

      {/* ─── FOOTER ─── */}
      <footer className="bg-black text-white pt-20 pb-12 mt-10 border-t-8 border-black">
        <div className="w-full max-w-[1440px] mx-auto px-6">

          <div className="font-black text-[64px] md:text-[96px] tracking-tighter leading-none text-white mb-6 uppercase text-center block">
            FreshCraft
          </div>
          <p className="font-black text-[16px] md:text-[20px] uppercase tracking-tighter text-center max-w-3xl mx-auto mb-16 leading-tight">
            We believe in buying ingredients only from companies that do not commission tests on animals and in testing our products on humans.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">

            <div className="lg:col-span-2">
              <h4 className="text-white font-black text-[20px] uppercase tracking-tighter mb-4">Stay Connected</h4>
              <form className="flex w-full mb-8 max-w-md">
                <input type="email" placeholder="ENTER EMAIL ADDRESS" className="bg-transparent border-2 border-white text-white px-4 py-3 outline-none flex-1 font-black text-[13px] uppercase tracking-widest placeholder-gray-500 focus:bg-white focus:text-black transition-colors" />
                <button type="button" className="bg-white text-black px-6 py-3 border-2 border-white font-black uppercase tracking-widest text-[13px] hover:bg-black hover:text-white transition-colors ml-2">
                  Subscribe
                </button>
              </form>
              <h4 className="text-white font-black text-[20px] uppercase tracking-tighter mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="w-12 h-12 bg-white text-black border-2 border-transparent hover:border-white hover:bg-black hover:text-white rounded-full flex items-center justify-center transition-all"><span className="font-black">FB</span></a>
                <a href="#" className="w-12 h-12 bg-white text-black border-2 border-transparent hover:border-white hover:bg-black hover:text-white rounded-full flex items-center justify-center transition-all"><span className="font-black">IG</span></a>
                <a href="#" className="w-12 h-12 bg-white text-black border-2 border-transparent hover:border-white hover:bg-black hover:text-white rounded-full flex items-center justify-center transition-all"><span className="font-black">TW</span></a>
                <a href="#" className="w-12 h-12 bg-white text-black border-2 border-transparent hover:border-white hover:bg-black hover:text-white rounded-full flex items-center justify-center transition-all"><span className="font-black">TT</span></a>
              </div>
            </div>

            <div className="flex flex-col space-y-4 text-[13px] font-black uppercase tracking-widest text-gray-300">
              <h4 className="text-white font-black text-[20px] tracking-tighter mb-2">Customer Care</h4>
              <a href="#" className="hover:text-white transition-colors">Contact Us</a>
              <a href="#" className="hover:text-white transition-colors">FAQ</a>
              <a href="#" className="hover:text-white transition-colors">Shipping Information</a>
              <a href="#" className="hover:text-white transition-colors">Returns & Refunds</a>
              <a href="#" className="hover:text-white transition-colors">Find a Shop</a>
            </div>

            <div className="flex flex-col space-y-4 text-[13px] font-black uppercase tracking-widest text-gray-300">
              <h4 className="text-white font-black text-[20px] tracking-tighter mb-2">Discover</h4>
              <a href="#" className="hover:text-white transition-colors">Our Story</a>
              <a href="#" className="hover:text-white transition-colors">FreshCraft Spa</a>
              <a href="#" className="hover:text-white transition-colors">Parties</a>
              <a href="#" className="hover:text-white transition-colors">Charity Pot</a>
              <a href="#" className="hover:text-white transition-colors">Careers</a>
            </div>

          </div>

          <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] font-black uppercase tracking-widest text-gray-500 border-t-2 border-gray-800 space-y-4 md:space-y-0">
            <span>© 2026 FreshCraft FRESH HANDMADE COSMETICS. ALL RIGHTS RESERVED.</span>
            <div className="flex flex-wrap justify-center gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
              <a href="#" className="hover:text-white transition-colors">Accessibility</a>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
