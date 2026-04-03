'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { StoreData, Product } from '@/lib/types';
import { useCart } from '@/contexts/CartContext';
import { Search, ShoppingBag, Heart, User, Menu, MapPin, ArrowRight, PlayCircle, Smartphone, Facebook, Twitter, Instagram, Youtube, HelpCircle, X } from 'lucide-react';
import { usePagination, ProductPagination } from '@/components/componentes-compartidos/templates/Pagination';

export default function YogaPremiumTemplate({ data }: { data: StoreData }) {
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
    <div className="min-h-full bg-white font-sans text-[#000] selection:bg-[#d31334] selection:text-white pb-0 overflow-x-hidden">

      {/* ─── UTILITY BAR ─── */}
      <div className="bg-[#fafafa] text-[12px] py-1.5 px-6 hidden md:flex justify-between items-center font-normal border-b border-gray-200">
        <div className="flex space-x-6">
          <div className="flex items-center space-x-1 cursor-pointer hover:underline underline-offset-4 text-gray-700">
            <MapPin className="w-3.5 h-3.5" />
            <span>Store Locator</span>
          </div>
          <a href="#" className="hover:underline underline-offset-4 text-gray-700">Gift Cards</a>
          <a href="#" className="hover:underline underline-offset-4 text-gray-700">Get Help</a>
        </div>
        <div className="flex items-center space-x-4">
          <a href="#" className="hover:underline underline-offset-4 text-gray-700 font-bold">Sign In</a>
        </div>
      </div>

      {/* ─── GLOBAL HEADER ─── */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm transition-all h-[70px]">
        <div className="w-full mx-auto px-4 md:px-8 h-full flex items-center justify-between">

          <div className="flex items-center">
            <Menu 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-6 h-6 lg:hidden mr-4 cursor-pointer hover:opacity-70 transition-opacity" 
            />
            {mobileMenuOpen && <X className="w-6 h-6 lg:hidden mr-4 cursor-pointer hover:opacity-70 transition-opacity absolute left-12" />}

            <div className="flex items-center cursor-pointer mr-6 lg:mr-10">
              {/* YogaPremium Logo icon */}
              <div className="w-[38px] h-[38px] bg-[#d31334] rounded-full flex items-center justify-center shrink-0 shadow-sm">
                <svg viewBox="0 0 24 24" fill="white" className="w-[20px] h-[20px]">
                  <path d="M12,2C12,2 6,4.5 4,10c-0.5,1.5-1,5.5 1.5,8.5c1.5,1.8 4,3.1 6.5,3.5c2.5,-0.4 5,-1.7 6.5,-3.5c2.5,-3 2,-7 1.5,-8.5C18,4.5 12,2 12,2zm0,15.5c-1.5,-1-2.5,-2.5-3,-4.5c0,-3 1.5,-5 3,-6.5c1.5,1.5 3,3.5 3,6.5c-0.5,2-1.5,3.5-3,4.5z" />
                </svg>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex space-x-6 xl:space-x-8 font-semibold text-[14px] uppercase tracking-wide text-black mt-1">
              <a href="#" className="hover:text-[#d31334] border-b-2 border-transparent hover:border-[#d31334] pb-5 transition-all">Women</a>
              <a href="#" className="hover:text-[#d31334] border-b-2 border-transparent hover:border-[#d31334] pb-5 transition-all">Men</a>
              <a href="#" className="hover:text-[#d31334] border-b-2 border-transparent hover:border-[#d31334] pb-5 transition-all">Accessories</a>
              <a href="#" className="hover:text-[#d31334] border-b-2 border-transparent hover:border-[#d31334] pb-5 transition-all">Shoes</a>
              <a href="#" className="hover:text-[#d31334] border-b-2 border-transparent hover:border-[#d31334] pb-5 transition-all text-[#d31334]">What's New</a>
            </nav>
          </div>

          <div className="flex items-center space-x-5 lg:space-x-6 text-black">
            <div className="hidden xl:flex items-center border border-gray-300 rounded-[4px] px-3 py-2 w-64 focus-within:border-black transition-colors bg-[#f5f5f5]">
              <Search className="w-5 h-5 text-gray-500 mr-2" />
              <input type="text" placeholder="Search" className="bg-transparent outline-none text-[15px] w-full font-normal placeholder-gray-500" />
            </div>
            <Search className="w-6 h-6 xl:hidden cursor-pointer hover:text-[#d31334] transition-colors" />
            <User className="hidden md:block w-6 h-6 cursor-pointer hover:text-[#d31334] transition-colors" />
            <div 
              onClick={() => toggleFavorite('header')}
              className="hidden md:block relative cursor-pointer hover:text-[#d31334] transition-colors"
            >
              <Heart className={`w-6 h-6 ${favorites.length > 0 ? 'fill-red-500 text-red-500' : ''}`} />
              {favorites.length > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[9px] font-black px-1.5 rounded-full">{favorites.length}</span>
              )}
            </div>
            <div 
              onClick={() => setIsCartOpen(true)}
              className="relative cursor-pointer hover:text-[#d31334] transition-colors"
            >
              <ShoppingBag className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[#d31334] text-white text-[9px] font-black px-1.5 rounded-full">{itemCount}</span>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="w-full pb-16">

        {/* ─── HERO PROMO ─── */}
        <section className="relative w-full h-[500px] md:h-[650px] flex justify-start items-center overflow-hidden mb-12">
          <Image
            src={data.bannerImage}
            alt="Hero Banner"
            fill
            className="object-cover object-top"
            priority
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/10"></div>

          <div className="relative z-10 px-8 md:px-16 max-w-xl text-[#000] mt-auto pb-16">
            <div className="bg-white/95 backdrop-blur-md p-8 md:p-10 shadow-lg rounded-[2px]">
              <h1 className="text-[36px] md:text-[46px] font-bold uppercase tracking-tight leading-[1] mb-4">{data.name}</h1>
              <p className="text-[16px] md:text-[18px] font-normal mb-8 max-w-sm leading-snug">{data.description || 'Feel the difference. Shop the latest styles built for performance and comfort.'}</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="bg-black text-white px-8 py-3.5 font-bold uppercase tracking-wide text-[14px] hover:bg-gray-800 transition-all rounded-[3px] text-center w-full sm:w-auto">
                  Shop Women's
                </button>
                <button className="bg-black text-white px-8 py-3.5 font-bold uppercase tracking-wide text-[14px] hover:bg-gray-800 transition-all rounded-[3px] text-center w-full sm:w-auto">
                  Shop Men's
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ─── PRODUCT CAROUSEL (What's New) ─── */}
        <section className="px-4 md:px-8 max-w-[1600px] mx-auto mb-20">
          <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
            <h2 className="text-[26px] md:text-[32px] font-bold uppercase tracking-tight text-black leading-none">What's New</h2>
            <a href="#" className="text-[14px] font-bold uppercase tracking-wider text-black hover:text-[#d31334] hover:underline underline-offset-4 transition-colors">
              View All
            </a>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-8 mb-16">
            {paginatedItems.map((product: any, idx: number) => (
              <div key={product.id || idx} data-product-id={product.id} className="group cursor-pointer flex flex-col relative">
                <div className="relative aspect-[3/4] mb-5 overflow-hidden">
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    fill
                    className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }}
                    className="absolute top-2 right-2 bg-white/80 p-1.5 rounded-full hover:bg-white transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Heart className={`w-5 h-5 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] uppercase text-[#767676] mb-1">{product.category}</span>
                  <h3 className="text-[14px] font-normal text-[#000] line-clamp-2 hover:underline mb-2">{product.title}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-[14px] font-bold text-[#000]">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-[12px] text-[#767676] line-through">${product.originalPrice}</span>
                    )}
                  </div>
                  <button 
                    onClick={(e) => handleAddToCart(product, e)}
                    className="mt-3 bg-[#d31334] text-white py-2 px-4 rounded-[4px] text-[13px] font-bold hover:bg-[#b91c1c] transition-colors opacity-0 group-hover:opacity-100"
                  >
                    Add to Bag
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── CATEGORY EXPLORATION ─── */}
        <section className="px-4 md:px-8 max-w-[1600px] mx-auto mb-20">
          <h2 className="text-[26px] md:text-[32px] font-bold uppercase tracking-tight text-black leading-none mb-8 text-center border-b border-gray-200 pb-4">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { name: 'Align Shop', img: 'https://picsum.photos/600/800?random=450' },
              { name: 'Leggings', img: 'https://picsum.photos/600/800?random=451' },
              { name: 'Outerwear', img: 'https://picsum.photos/600/800?random=452' },
              { name: 'Accessories', img: 'https://picsum.photos/600/800?random=453' },
            ].map((cat, i) => (
              <div key={i} className="relative aspect-[3/4] group cursor-pointer overflow-hidden rounded-[4px]">
                <Image src={cat.img} alt={cat.name} fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-[22px] md:text-[28px] font-bold uppercase tracking-tight text-white mb-2 leading-none">{cat.name}</h3>
                  <span className="inline-flex items-center text-white text-[14px] font-bold border-b-2 border-white pb-0.5 group-hover:border-[#d31334] group-hover:text-[#d31334] transition-colors uppercase tracking-widest">
                    Shop <ArrowRight className="w-4 h-4 ml-1" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── THE SWEATLIFE SECTION ─── */}
        <section className="w-full bg-[#fafafa] py-16 md:py-24 border-y border-gray-200 mb-16">
          <div className="px-4 md:px-8 max-w-[1600px] mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between mb-10">
              <div>
                <h2 className="text-[32px] md:text-[40px] font-bold uppercase tracking-tight text-black leading-none mb-2">The Sweatlife</h2>
                <p className="text-[16px] text-gray-600 font-normal">Stay active, mindful, and connected.</p>
              </div>
              <div className="mt-4 md:mt-0">
                <button className="border border-black text-black px-8 py-3 font-bold uppercase tracking-widest text-[13px] hover:bg-black hover:text-white transition-colors rounded-[3px]">
                  View Stories
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Large Feature */}
              <div className="relative aspect-[16/9] group cursor-pointer overflow-hidden rounded-[4px] shadow-md">
                <Image src="https://picsum.photos/1000/600?random=455" alt="Running Club" fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <PlayCircle className="w-16 h-16 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all drop-shadow-md" />
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-[24px] font-bold uppercase tracking-tight text-white leading-none mb-2">Together in Stride</h3>
                  <p className="text-white font-medium text-[15px]">Find a local run club near you.</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map(num => (
                  <div key={num} className="relative aspect-square group cursor-pointer overflow-hidden rounded-[4px]">
                    <Image src={`https://picsum.photos/500/500?random=${460 + num}`} alt="Social" fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                      <Instagram className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    {num === 1 && (
                      <div className="absolute top-3 left-3 bg-[#d31334] text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest rounded-[2px]">
                        @YogaPremium
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── FEATURED PRODUCTS GRID ─── */}
        <section className="px-4 md:px-8 max-w-[1600px] mx-auto mb-20">
          <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
            <h2 className="text-[26px] md:text-[32px] font-bold uppercase tracking-tight text-black leading-none">Best Sellers</h2>
            <a href="#" className="text-[14px] font-bold uppercase tracking-wider text-black hover:text-[#d31334] hover:underline underline-offset-4 transition-colors">View All</a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {data.products.slice(0, 4).map((product, idx) => (
              <div key={product.id || idx} data-product-id={product.id} className="group cursor-pointer flex flex-col">
                <div className="relative aspect-[3/4] mb-4 overflow-hidden bg-[#f5f5f5]">
                  <Image src={product.imageUrl} alt={product.title} fill className="object-cover group-hover:scale-[1.03] transition-transform duration-500" referrerPolicy="no-referrer" />
                  {idx === 0 && <span className="absolute top-3 left-3 bg-[#d31334] text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest">Best Seller</span>}
                  <button onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }} className="absolute top-3 right-3 bg-white/80 p-1.5 rounded-full hover:bg-white transition-colors opacity-0 group-hover:opacity-100">
                    <Heart className={`w-5 h-5 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>
                </div>
                <span className="text-[11px] uppercase text-[#767676] mb-1">{product.category}</span>
                <h3 className="text-[14px] font-normal text-[#000] line-clamp-2 hover:underline mb-2">{product.title}</h3>
                <span className="text-[14px] font-bold text-[#000]">${product.price}</span>
                <button onClick={(e) => handleAddToCart(product, e)} className="mt-3 bg-[#d31334] text-white py-2 px-4 rounded-[4px] text-[13px] font-bold hover:bg-[#b91c1c] transition-colors opacity-0 group-hover:opacity-100">Add to Bag</button>
              </div>
            ))}
          </div>
        </section>

        {/* ─── FULL WIDTH PROMO BANNER ─── */}
        <section className="w-full bg-[#1a1a1a] text-white py-20 md:py-28 mb-20">
          <div className="max-w-[1200px] mx-auto px-8 text-center">
            <span className="text-[#d31334] text-[13px] font-bold uppercase tracking-widest mb-4 block">New Collection</span>
            <h2 className="text-[36px] md:text-[52px] font-bold uppercase tracking-tight leading-none mb-6">Move With Intention</h2>
            <p className="text-[16px] md:text-[18px] text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">Designed for the studio, the street, and everything in between. Our latest collection blends performance with everyday style.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-black px-10 py-4 font-bold uppercase tracking-wide text-[14px] hover:bg-gray-200 transition-colors">Shop Women</button>
              <button className="border border-white text-white px-10 py-4 font-bold uppercase tracking-wide text-[14px] hover:bg-white hover:text-black transition-colors">Shop Men</button>
            </div>
          </div>
        </section>

        {/* ─── COMMUNITY STORIES ─── */}
        <section className="px-4 md:px-8 max-w-[1600px] mx-auto mb-20">
          <h2 className="text-[26px] md:text-[32px] font-bold uppercase tracking-tight text-black leading-none mb-8 text-center">Community Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Finding Balance', author: 'Maria C.', img: 'https://picsum.photos/600/400?random=470' },
              { title: 'Run Club Diaries', author: 'James T.', img: 'https://picsum.photos/600/400?random=471' },
              { title: 'Mindful Mornings', author: 'Aisha R.', img: 'https://picsum.photos/600/400?random=472' },
            ].map((story, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="relative aspect-[3/2] mb-4 overflow-hidden rounded-[4px]">
                  <Image src={story.img} alt={story.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <h3 className="text-[18px] font-bold mb-1 group-hover:text-[#d31334] transition-colors">{story.title}</h3>
                <p className="text-[13px] text-[#767676]">By {story.author}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── SERVICES BAR ─── */}
        <section className="w-full border-y border-gray-200 py-12 mb-16">
          <div className="max-w-[1600px] mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: '🚚', title: 'Free Shipping', desc: 'On orders over $75' },
              { icon: '↩️', title: 'Free Returns', desc: 'Within 30 days' },
              { icon: '💬', title: 'Live Chat', desc: 'Talk to our educators' },
              { icon: '🏪', title: 'Store Pickup', desc: 'Ready in 2 hours' },
            ].map((svc, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-3xl mb-3">{svc.icon}</span>
                <h4 className="text-[14px] font-bold uppercase tracking-widest mb-1">{svc.title}</h4>
                <p className="text-[13px] text-[#767676]">{svc.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── NEWSLETTER ─── */}
        <section className="px-4 md:px-8 max-w-[800px] mx-auto mb-20 text-center">
          <h2 className="text-[26px] md:text-[32px] font-bold uppercase tracking-tight mb-4">Stay in the Flow</h2>
          <p className="text-[15px] text-[#767676] mb-8">Sign up for emails and get early access to new drops, exclusive offers, and community events.</p>
          <form className="flex w-full max-w-lg mx-auto">
            <input type="email" placeholder="Email Address" className="bg-white border-2 border-gray-300 text-black px-4 py-3 outline-none flex-1 font-normal focus:border-black transition-colors rounded-l-[3px]" />
            <button type="button" className="bg-[#d31334] text-white px-8 py-3 font-bold uppercase tracking-widest text-[13px] hover:bg-[#b91c1c] transition-colors rounded-r-[3px]">Sign Up</button>
          </form>
        </section>

        {/* ─── ALL PRODUCTS WITH PAGINATION ─── */}
        <section className="px-4 md:px-8 max-w-[1600px] mx-auto mb-20">
          <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
            <h2 className="text-[26px] md:text-[32px] font-bold uppercase tracking-tight text-black leading-none">All Products ({totalItems})</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {paginatedItems.map((product: any, idx: number) => (
              <div key={product.id || idx} data-product-id={product.id} className="group cursor-pointer flex flex-col">
                <div className="relative aspect-[3/4] mb-4 overflow-hidden bg-[#f5f5f5]">
                  <Image src={product.imageUrl} alt={product.title} fill className="object-cover group-hover:scale-[1.02] transition-transform duration-300" referrerPolicy="no-referrer" />
                  <button onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }} className="absolute top-2 right-2 bg-white/80 p-1.5 rounded-full hover:bg-white transition-colors opacity-0 group-hover:opacity-100">
                    <Heart className={`w-4 h-4 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>
                </div>
                <span className="text-[11px] uppercase text-[#767676] mb-1">{product.category}</span>
                <h3 className="text-[13px] font-normal text-[#000] line-clamp-2 mb-1">{product.title}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-[14px] font-bold">${product.price}</span>
                  {product.originalPrice && <span className="text-[12px] text-[#767676] line-through">${product.originalPrice}</span>}
                </div>
              </div>
            ))}
          </div>
          {totalPages > 1 && (
            <div className="mt-10">
              <ProductPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} totalItems={totalItems} itemsPerPage={itemsPerPage} />
            </div>
          )}
        </section>

      </main>

      {/* ─── FOOTER ─── */}
      <footer className="bg-white text-[#000] border-t border-gray-300 w-full pt-16">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16 text-[14px] font-normal text-gray-700">

            <div className="flex flex-col space-y-3">
              <h4 className="text-black font-bold uppercase tracking-widest text-[14px] mb-2">My Account</h4>
              <a href="#" className="hover:text-[#d31334] hover:underline underline-offset-4 transition-colors">Sign In</a>
              <a href="#" className="hover:text-[#d31334] hover:underline underline-offset-4 transition-colors">Register</a>
              <a href="#" className="hover:text-[#d31334] hover:underline underline-offset-4 transition-colors">Order Status</a>
              <a href="#" className="hover:text-[#d31334] hover:underline underline-offset-4 transition-colors">Returns</a>
            </div>

            <div className="flex flex-col space-y-3">
              <h4 className="text-black font-bold uppercase tracking-widest text-[14px] mb-2">Help</h4>
              <a href="#" className="hover:text-[#d31334] hover:underline underline-offset-4 transition-colors">FAQ</a>
              <a href="#" className="hover:text-[#d31334] hover:underline underline-offset-4 transition-colors">Accessibility Statement</a>
              <a href="#" className="hover:text-[#d31334] hover:underline underline-offset-4 transition-colors">Services</a>
              <a href="#" className="hover:text-[#d31334] hover:underline underline-offset-4 transition-colors">Ordering</a>
              <a href="#" className="hover:text-[#d31334] hover:underline underline-offset-4 transition-colors">Shipping Policy</a>
            </div>

            <div className="flex flex-col space-y-3">
              <h4 className="text-black font-bold uppercase tracking-widest text-[14px] mb-2">About Us</h4>
              <a href="#" className="hover:text-[#d31334] hover:underline underline-offset-4 transition-colors">Our Business</a>
              <a href="#" className="hover:text-[#d31334] hover:underline underline-offset-4 transition-colors">Media</a>
              <a href="#" className="hover:text-[#d31334] hover:underline underline-offset-4 transition-colors">Investors</a>
              <a href="#" className="hover:text-[#d31334] hover:underline underline-offset-4 transition-colors">Strategic Sales</a>
              <a href="#" className="hover:text-[#d31334] hover:underline underline-offset-4 transition-colors">Sweat Collective</a>
            </div>

            <div className="flex flex-col space-y-3 lg:col-span-2">
              <h4 className="text-black font-bold uppercase tracking-widest text-[14px] mb-2">Join our mailing list</h4>
              <p className="mb-4">Be the first to know about new products, exclusive events, and more.</p>
              <form className="flex w-full mb-6">
                <input type="email" placeholder="Email Address" className="bg-white border-2 border-gray-300 text-black px-4 py-3 outline-none flex-1 font-normal font-sans focus:border-black transition-colors rounded-l-[3px]" />
                <button type="button" className="bg-[#000] text-white px-6 py-3 font-bold uppercase tracking-widest text-[13px] hover:bg-gray-800 transition-colors rounded-r-[3px]">
                  Sign Up
                </button>
              </form>
              <div className="flex items-center gap-6 mt-2">
                <a href="#" className="text-gray-500 hover:text-black transition-colors"><Twitter className="w-5 h-5" /></a>
                <a href="#" className="text-gray-500 hover:text-black transition-colors"><Facebook className="w-5 h-5" /></a>
                <a href="#" className="text-gray-500 hover:text-black transition-colors"><Youtube className="w-5 h-5" /></a>
                <a href="#" className="text-gray-500 hover:text-black transition-colors"><Instagram className="w-5 h-5" /></a>
              </div>
            </div>

          </div>

          <div className="py-8 border-t border-gray-200 flex flex-col md:flex-row items-baseline lg:items-center justify-between gap-6 text-[11px] font-bold uppercase tracking-widest text-gray-500">
            <div className="flex flex-wrap gap-4 md:gap-8">
              <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-black transition-colors">Terms of Use</a>
              <a href="#" className="hover:text-black transition-colors">CA Privacy Rights</a>
              <a href="#" className="hover:text-black transition-colors">Accessibility</a>
            </div>
            <span>© YogaPremium athletica 1818 Cornwall Ave, Vancouver BC V6J 1C7</span>
          </div>

        </div>
      </footer>
    </div>
  );
}
