'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { StoreData, Product } from '@/lib/types';
import { useCart } from '@/contexts/CartContext';
import { Search, ShoppingBag, Heart, User, Globe, HelpCircle, ChevronRight, Leaf, Menu, X } from 'lucide-react';
import { usePagination, ProductPagination } from '@/components/componentes-compartidos/templates/Pagination';

export default function EuroStyleTemplate({ data }: { data: StoreData }) {
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
    <div className="min-h-full bg-[#f4f4f4] font-sans text-[#1a1a1a] selection:bg-[#ff6900] selection:text-white pb-0 overflow-x-hidden">

      {/* ─── TOP UTILITY BAR (EUROSTYLE) ─── */}
      <div className="bg-[#f4f4f4] text-[#1a1a1a] text-[12px] py-2 px-4 md:px-8 flex justify-between items-center font-medium border-b border-gray-300">
        <div className="flex items-center space-x-6">
          <a href="#" className="hover:text-[#ff6900] transition-colors flex items-center">
            <HelpCircle className="w-4 h-4 mr-1.5" /> Help & Contact
          </a>
          <a href="#" className="hover:text-[#ff6900] transition-colors hidden sm:flex items-center">
            Free delivery & returns*
          </a>
        </div>
        <div className="flex items-center space-x-6 hidden md:flex">
          <a href="#" className="hover:text-[#ff6900] transition-colors">100-day return policy</a>
          <div className="flex items-center cursor-pointer hover:text-[#ff6900] transition-colors bg-white px-2 py-0.5 rounded border border-gray-300 shadow-sm">
            <Globe className="w-3.5 h-3.5 mr-1.5" />
            <span className="font-bold">EN</span>
          </div>
        </div>
      </div>

      {/* ─── MAIN HEADER ─── */}
      <header className="bg-white sticky top-0 z-50 border-b border-gray-200 shadow-sm">
        <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 h-[72px] flex items-center justify-between">

          <div className="flex items-center space-x-8 lg:space-x-12">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hover:text-[#ff6900] transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Logo */}
            <div className="flex items-center cursor-pointer shrink-0">
              <div className="bg-[#ff6900] w-8 h-8 rounded shrink-0 mr-2 relative overflow-hidden flex items-center justify-center transform -skew-x-[15deg]">
                <div className="bg-white w-full h-[3px] absolute top-[45%] -left-[10%] rotate-[-25deg]"></div>
              </div>
              <span className="font-extrabold text-[28px] tracking-tight lowercase leading-none text-[#ff6900]">
                eurostyle
              </span>
            </div>

            {/* Primary Nav */}
            <nav className="hidden lg:flex space-x-8 font-extrabold text-[15px] text-[#1a1a1a]">
              <a href="#" className="hover:text-[#ff6900] border-b-[3px] border-[#ff6900] pb-[25px] pt-[28px] transition-colors">Women</a>
              <a href="#" className="hover:text-[#ff6900] border-b-[3px] border-transparent hover:border-gray-300 pb-[25px] pt-[28px] transition-colors">Men</a>
              <a href="#" className="hover:text-[#ff6900] border-b-[3px] border-transparent hover:border-gray-300 pb-[25px] pt-[28px] transition-colors">Kids</a>
            </nav>
          </div>

          {/* Search & Actions */}
          <div className="flex items-center space-x-4 lg:space-x-6 flex-1 justify-end max-w-2xl">
            <div className="hidden md:flex flex-1 items-center bg-gray-100 rounded-sm px-4 py-2.5 focus-within:bg-white focus-within:ring-2 focus-within:ring-black transition-all">
              <Search className="w-5 h-5 text-gray-500 mr-2" strokeWidth={2.5} />
              <input type="text" placeholder="Search" className="bg-transparent outline-none text-[15px] w-full font-medium placeholder-gray-500" />
            </div>

            <Search className="md:hidden w-6 h-6 cursor-pointer hover:text-[#ff6900] transition-colors" strokeWidth={2} />
            <User className="w-6 h-6 lg:w-7 lg:h-7 cursor-pointer hover:text-[#ff6900] transition-colors" strokeWidth={1.5} />
            <div 
              onClick={() => toggleFavorite('header')}
              className="hidden sm:block relative cursor-pointer hover:text-[#ff6900] transition-colors"
            >
              <Heart className={`w-6 h-6 lg:w-7 lg:h-7 ${favorites.length > 0 ? 'fill-red-500 text-red-500' : ''}`} strokeWidth={1.5} />
              {favorites.length > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm leading-none">{favorites.length}</span>
              )}
            </div>

            <div 
              onClick={() => setIsCartOpen(true)}
              className="relative cursor-pointer hover:text-[#ff6900] transition-colors group"
            >
              <ShoppingBag className="w-6 h-6 lg:w-7 lg:h-7" strokeWidth={1.5} />
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[#ff6900] text-white text-[11px] font-bold px-1.5 py-0.5 rounded-full shadow-sm leading-none">{itemCount}</span>
              )}
            </div>
          </div>
        </div>

        {/* Secondary Nav Row */}
        <div className="w-full bg-white border-t border-gray-100 hidden lg:block">
          <nav className="max-w-[1440px] mx-auto px-8 py-3 flex space-x-8 font-medium text-[14px]">
            <a href="#" className="text-[#d70032] font-bold hover:underline underline-offset-4">Sale</a>
            <a href="#" className="hover:text-[#ff6900] hover:underline underline-offset-4">Get the Look</a>
            <a href="#" className="hover:text-[#ff6900] hover:underline underline-offset-4">Clothing</a>
            <a href="#" className="hover:text-[#ff6900] hover:underline underline-offset-4">Shoes</a>
            <a href="#" className="hover:text-[#ff6900] hover:underline underline-offset-4">Sports</a>
            <a href="#" className="hover:text-[#ff6900] hover:underline underline-offset-4">Accessories</a>
            <a href="#" className="hover:text-[#ff6900] hover:underline underline-offset-4">Designer</a>
            <a href="#" className="hover:text-[#ff6900] hover:underline underline-offset-4">Brands</a>
            <a href="#" className="hover:text-green-700 hover:underline underline-offset-4 flex items-center">
              <Leaf className="w-3.5 h-3.5 mr-1" /> Sustainability
            </a>
          </nav>
        </div>
      </header>

      <main className="w-full max-w-[1440px] mx-auto px-4 md:px-8 py-6 md:py-8">

        {/* ─── HERO EDITORIAL BANNER ─── */}
        <section className="relative w-full h-[400px] md:h-[550px] mb-12 group cursor-pointer overflow-hidden rounded-lg shadow-sm bg-white border border-gray-200">
          <div className="absolute inset-0 md:w-[65%] h-full z-0 overflow-hidden">
            <Image
              src={data.bannerImage}
              alt="EuroStyle Banner"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-[3000ms] ease-out"
              priority
              referrerPolicy="no-referrer"
            />
            {/* Gradient fade to white on the right for desktop */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white hidden md:block" />
            <div className="absolute inset-0 bg-black/30 md:hidden" />
          </div>

          <div className="absolute inset-0 md:relative md:float-right md:w-[45%] h-full flex flex-col justify-end md:justify-center p-6 md:p-12 text-white md:text-[#1a1a1a] z-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent md:bg-none">
            <h1 className="text-[36px] md:text-[52px] font-black tracking-tighter mb-4 leading-none text-balance">
              {data.name}
            </h1>
            <p className="text-[16px] md:text-[18px] font-medium mb-8 leading-relaxed max-w-sm drop-shadow-md md:drop-shadow-none">
              {data.description || 'Discover bold new styles to elevate your everyday rotation.'}
            </p>
            <button className="bg-white text-[#1a1a1a] md:bg-[#1a1a1a] md:text-white px-10 py-3.5 font-bold text-[15px] hover:bg-gray-100 md:hover:bg-gray-800 transition-colors w-max rounded-sm">
              Discover now
            </button>
          </div>
        </section>

        {/* ─── QUICK CATEGORIES ─── */}
        <section className="mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition-shadow flex flex-col items-center justify-center text-center group">
              <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mb-4 group-hover:bg-[#ff6900] transition-colors text-[#ff6900] group-hover:text-white font-black text-2xl">
                S
              </div>
              <h3 className="font-bold text-[16px] mb-1">Sneaker Drop</h3>
              <p className="text-[14px] text-gray-500">The latest kicks</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition-shadow flex flex-col items-center justify-center text-center group">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors text-blue-600 group-hover:text-white font-black text-2xl">
                D
              </div>
              <h3 className="font-bold text-[16px] mb-1">Denim Edit</h3>
              <p className="text-[14px] text-gray-500">Your perfect fit</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition-shadow flex flex-col items-center justify-center text-center group">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4 group-hover:bg-green-700 transition-colors text-green-700 group-hover:text-white">
                <Leaf className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-[16px] mb-1">Sustainable</h3>
              <p className="text-[14px] text-gray-500">Shop mindfully</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition-shadow flex flex-col items-center justify-center text-center group">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4 group-hover:bg-[#d70032] transition-colors text-[#d70032] group-hover:text-white font-black text-2xl">
                %
              </div>
              <h3 className="font-bold text-[16px] mb-1">Last Chance</h3>
              <p className="text-[14px] text-gray-500">Up to 50% off</p>
            </div>
          </div>
        </section>

        {/* ─── PRODUCT GRID (Paginated) ─── */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-[28px] font-black tracking-tight">Just dropped ({totalItems})</h2>
            <a href="#" className="hidden sm:flex items-center text-[15px] font-bold text-[#1a1a1a] hover:text-[#ff6900] transition-colors">
              See all <ChevronRight className="w-5 h-5 ml-1" />
            </a>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 md:gap-4">
            {paginatedItems.map((product, idx) => (
              <div key={product.id || idx} data-product-id={product.id} data-discount={product.discount || 0} className="group cursor-pointer flex flex-col bg-white p-2 rounded-lg border border-gray-200 hover:shadow-lg transition-all relative">

                {/* Save Heart */}
                <button 
                  onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }}
                  className="absolute top-3 right-3 z-10 w-7 h-7 bg-white/90 backdrop-blur rounded-full shadow-sm flex items-center justify-center text-gray-500 hover:text-[#ff6900] hover:bg-white transition-colors"
                >
                  <Heart className={`w-3.5 h-3.5 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                </button>

                {/* Tags */}
                <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 align-start">
                  {product.discount && product.discount > 0 && (
                    <span className="bg-[#d70032] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm">
                      -{product.discount}%
                    </span>
                  )}
                  {product.discount && product.discount > 20 && (
                    <span className="bg-green-700 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm flex items-center gap-1 shadow-sm">
                      <Leaf className="w-2.5 h-2.5" /> Eco
                    </span>
                  )}
                </div>

                <div className="relative aspect-[3/4] mb-2 overflow-hidden bg-gray-50 flex items-center justify-center rounded-md">
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    fill
                    className="object-contain p-1 mix-blend-multiply group-hover:scale-[1.03] transition-transform duration-[800ms] ease-out"
                    referrerPolicy="no-referrer"
                  />
                  <button 
                    onClick={(e) => handleAddToCart(product, e)}
                    className="absolute bottom-2 left-2 right-2 bg-[#1a1a1a] text-white py-1.5 text-[9px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Add
                  </button>
                </div>

                <div className="flex flex-col flex-1 px-1">
                  <div className="font-bold text-[12px] text-[#1a1a1a] mb-[2px] line-clamp-1 group-hover:underline decoration-2">
                    {product.category || 'Premium Brand'}
                  </div>
                  <h3 className="text-[12px] text-gray-600 font-normal leading-snug line-clamp-1 mb-1">
                    {product.title}
                  </h3>

                  <div className="flex items-center space-x-2 mt-auto pt-1">
                    {product.originalPrice ? (
                      <>
                        <span className="font-bold text-[14px] text-[#d70032]">${product.price}</span>
                        <span className="text-[11px] text-gray-500 line-through">${product.originalPrice}</span>
                      </>
                    ) : (
                      <span className="font-bold text-[14px] text-[#1a1a1a]">${product.price}</span>
                    )}
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

          <div className="mt-8 flex justify-center sm:hidden">
            <button className="bg-white border border-gray-300 text-[#1a1a1a] px-8 py-3.5 font-bold text-[15px] hover:bg-gray-50 transition-colors w-full rounded-sm">
              See all
            </button>
          </div>
        </section>

        {/* ─── TRENDING BRANDS ─── */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-[28px] font-black tracking-tight">Top Brands</h2>
            <a href="#" className="hidden sm:flex items-center text-[15px] font-bold text-[#1a1a1a] hover:text-[#ff6900] transition-colors">
              All brands <ChevronRight className="w-5 h-5 ml-1" />
            </a>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {['Nike', 'Adidas', 'Puma', 'Levi\'s', 'Tommy', 'Calvin Klein', 'Lacoste', 'Hugo Boss', 'Vans', 'New Balance', 'Converse', 'Reebok'].map((brand, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-lg p-6 flex items-center justify-center cursor-pointer hover:border-[#ff6900] hover:shadow-md transition-all group h-24">
                <span className="font-extrabold text-[14px] text-gray-400 group-hover:text-[#ff6900] transition-colors">{brand}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ─── EDITORIAL / GET THE LOOK ─── */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-[28px] font-black tracking-tight">Get the Look</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Street Smart', desc: 'Urban essentials for the modern commuter.', img: 'https://picsum.photos/600/800?random=601' },
              { title: 'Weekend Vibes', desc: 'Relaxed fits for your days off.', img: 'https://picsum.photos/600/800?random=602' },
              { title: 'Office Ready', desc: 'Sharp looks that mean business.', img: 'https://picsum.photos/600/800?random=603' },
            ].map((look, i) => (
              <div key={i} className="group cursor-pointer relative overflow-hidden rounded-lg">
                <div className="relative aspect-[3/4]">
                  <Image src={look.img} alt={look.title} fill className="object-cover group-hover:scale-105 transition-transform duration-[1500ms]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute bottom-8 left-8 text-white">
                    <h3 className="text-2xl font-black tracking-tight mb-2">{look.title}</h3>
                    <p className="text-[14px] font-medium text-white/80 mb-4">{look.desc}</p>
                    <span className="text-[13px] font-bold border-b border-white pb-1">Shop the look</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── CUSTOMER REVIEWS ─── */}
        <section className="mb-20 bg-white rounded-lg border border-gray-200 p-8 md:p-12">
          <div className="text-center mb-10">
            <h2 className="text-[28px] font-black tracking-tight mb-2">Customer Reviews</h2>
            <p className="text-[15px] text-gray-500">See what our community is saying.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Laura M.', text: 'Super fast delivery and the quality is amazing for the price. My new favorite store.', rating: 5 },
              { name: 'Thomas K.', text: 'The return process was so easy. Great customer service and beautiful packaging.', rating: 5 },
              { name: 'Anna S.', text: 'Love the sustainable collection. Finally a store that cares about the planet.', rating: 4 },
            ].map((review, i) => (
              <div key={i} className="p-6 bg-gray-50 rounded-lg">
                <div className="flex mb-3">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <span key={j} className="text-[#ff6900] text-sm">★</span>
                  ))}
                  {Array.from({ length: 5 - review.rating }).map((_, j) => (
                    <span key={j} className="text-gray-300 text-sm">★</span>
                  ))}
                </div>
                <p className="text-[14px] text-gray-600 mb-4 leading-relaxed italic">&ldquo;{review.text}&rdquo;</p>
                <p className="text-[14px] font-bold text-[#1a1a1a]">{review.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── SERVICES & VALUE PROPS ─── */}
        <section className="mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '🚚', title: 'Free Delivery', desc: 'On orders over €24.90' },
              { icon: '↩️', title: '100-Day Returns', desc: 'Free & easy returns' },
              { icon: '💳', title: 'Flexible Payment', desc: 'Pay later options available' },
              { icon: '🎁', title: 'Gift Cards', desc: 'The perfect present' },
            ].map((service, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-md transition-shadow">
                <div className="text-3xl mb-3">{service.icon}</div>
                <h3 className="font-bold text-[15px] mb-1">{service.title}</h3>
                <p className="text-[13px] text-gray-500">{service.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── SUSTAINABILITY ─── */}
        <section className="mb-20 bg-green-50 rounded-lg border border-green-200 overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 relative min-h-[400px]">
              <Image src="https://picsum.photos/800/600?random=604" alt="Sustainability" fill className="object-cover" />
            </div>
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="w-5 h-5 text-green-700" />
                <span className="text-[13px] font-bold text-green-700 uppercase tracking-widest">Sustainability</span>
              </div>
              <h2 className="text-[28px] font-black tracking-tight mb-4">Fashion with a Conscience</h2>
              <p className="text-[15px] text-gray-600 mb-6 leading-relaxed">
                Discover our growing collection of sustainable brands and eco-friendly products. Together, we can make fashion more responsible.
              </p>
              <div className="flex gap-6 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-black text-green-700">500+</div>
                  <div className="text-[11px] text-gray-500 font-bold">Sustainable Items</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-black text-green-700">CO₂</div>
                  <div className="text-[11px] text-gray-500 font-bold">Neutral Shipping</div>
                </div>
              </div>
              <button className="bg-green-700 text-white px-8 py-3 font-bold text-[14px] hover:bg-green-800 transition-colors w-max rounded-sm">
                Shop Sustainable
              </button>
            </div>
          </div>
        </section>

        {/* ─── APP DOWNLOAD ─── */}
        <section className="mb-20 bg-[#1a1a1a] text-white rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row items-center p-8 md:p-12 gap-8">
            <div className="w-full md:w-1/2">
              <h2 className="text-[28px] font-black tracking-tight mb-4">The EuroStyle App</h2>
              <p className="text-[15px] text-gray-400 mb-6 leading-relaxed">
                Get personalized recommendations, exclusive app deals, and scan items in-store for instant info.
              </p>
              <div className="flex gap-4">
                <button className="bg-white text-[#1a1a1a] px-6 py-3 font-bold text-[14px] hover:bg-gray-200 transition-colors rounded-sm">App Store</button>
                <button className="bg-white text-[#1a1a1a] px-6 py-3 font-bold text-[14px] hover:bg-gray-200 transition-colors rounded-sm">Google Play</button>
              </div>
            </div>
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="w-40 h-72 bg-gray-800 rounded-[1.5rem] border-4 border-gray-700 shadow-xl flex items-center justify-center">
                <span className="font-extrabold text-[20px] tracking-tight lowercase text-[#ff6900] opacity-40">eurostyle</span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── NEWSLETTER ─── */}
        <section className="mb-20 bg-[#ff6900] rounded-lg p-8 md:p-12 text-white text-center">
          <h2 className="text-[28px] font-black tracking-tight mb-3">Stay in the Loop</h2>
          <p className="text-[15px] text-white/80 mb-8 max-w-md mx-auto">Subscribe for exclusive deals, new arrivals, and style inspiration. Unsubscribe anytime.</p>
          <div className="flex max-w-md mx-auto">
            <input type="email" placeholder="Your email address" className="flex-1 px-6 py-3 rounded-l-sm bg-white text-[#1a1a1a] text-[15px] outline-none placeholder-gray-400" />
            <button className="bg-[#1a1a1a] text-white px-8 py-3 rounded-r-sm font-bold text-[14px] hover:bg-black transition-colors">
              Subscribe
            </button>
          </div>
        </section>

      </main>

      {/* ─── FOOTER ─── */}
      <footer className="bg-white border-t border-gray-200 mt-12 pt-16 pb-8">
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-8">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">

            <div className="flex flex-col space-y-4">
              <h4 className="text-[#1a1a1a] font-black text-[18px] mb-2">Help & Contact</h4>
              <a href="#" className="hover:text-[#ff6900] text-[15px] text-gray-600 transition-colors">Track your order</a>
              <a href="#" className="hover:text-[#ff6900] text-[15px] text-gray-600 transition-colors">Return an item</a>
              <a href="#" className="hover:text-[#ff6900] text-[15px] text-gray-600 transition-colors">Return policy</a>
              <a href="#" className="hover:text-[#ff6900] text-[15px] text-gray-600 transition-colors">FAQ</a>
            </div>

            <div className="flex flex-col space-y-4">
              <h4 className="text-[#1a1a1a] font-black text-[18px] mb-2">Gift Cards</h4>
              <a href="#" className="hover:text-[#ff6900] text-[15px] text-gray-600 transition-colors">Buy gift cards</a>
              <a href="#" className="hover:text-[#ff6900] text-[15px] text-gray-600 transition-colors">Redeem a gift card</a>
              <a href="#" className="hover:text-[#ff6900] text-[15px] text-gray-600 transition-colors">Corporate gift cards</a>
            </div>

            <div className="flex flex-col space-y-4">
              <h4 className="text-[#1a1a1a] font-black text-[18px] mb-2">EuroStyle Corporate</h4>
              <a href="#" className="hover:text-[#ff6900] text-[15px] text-gray-600 transition-colors">About Us</a>
              <a href="#" className="hover:text-[#ff6900] text-[15px] text-gray-600 transition-colors">Corporate Responsibility</a>
              <a href="#" className="hover:text-[#ff6900] text-[15px] text-gray-600 transition-colors">Investor Relations</a>
              <a href="#" className="hover:text-[#ff6900] text-[15px] text-gray-600 transition-colors">Press & Media</a>
              <a href="#" className="hover:text-[#ff6900] text-[15px] text-gray-600 transition-colors">Jobs & Careers</a>
            </div>

            <div className="flex flex-col space-y-4">
              <h4 className="text-[#1a1a1a] font-black text-[18px] mb-2">Discover EuroStyle</h4>
              <a href="#" className="hover:text-[#ff6900] text-[15px] text-gray-600 transition-colors">EuroStyle Plus</a>
              <a href="#" className="hover:text-[#ff6900] text-[15px] text-gray-600 transition-colors">EuroStyle Pre-owned</a>
              <a href="#" className="hover:text-[#ff6900] text-[15px] text-gray-600 transition-colors">Streetwear Hub</a>
              <a href="#" className="hover:text-[#ff6900] text-[15px] text-gray-600 transition-colors">Sustainability</a>
            </div>

          </div>

          <div className="pt-8 border-t border-gray-200 flex flex-col items-center md:items-start justify-center text-[12px] font-bold text-gray-500 space-y-4">
            <span className="font-extrabold text-[20px] tracking-tight lowercase text-gray-300">eurostyle</span>
            <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2">
              <a href="#" className="hover:text-[#ff6900] transition-colors">Data settings</a>
              <a href="#" className="hover:text-[#ff6900] transition-colors">Privacy Notice</a>
              <a href="#" className="hover:text-[#ff6900] transition-colors">Terms & Conditions</a>
              <a href="#" className="hover:text-[#ff6900] transition-colors">Legal Notice</a>
              <a href="#" className="hover:text-[#ff6900] transition-colors">Accessibility</a>
            </div>
            <span className="font-normal mt-2">© 2026 EuroStyle SE. All rights reserved.</span>
          </div>

        </div>
      </footer>
    </div>
  );
}

