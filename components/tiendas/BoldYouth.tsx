'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { StoreData, Product } from '@/lib/types';
import { useCart } from '@/contexts/CartContext';
import { Search, ShoppingBag, Heart, User, Menu, Zap, ArrowRight, Smartphone, Instagram, Facebook, Twitter, Youtube, CheckCircle, ChevronRight, Tag, X } from 'lucide-react';
import { usePagination, ProductPagination } from '@/components/componentes-compartidos/templates/Pagination';

export default function BoldYouthTemplate({ data }: { data: StoreData }) {
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
    <div className="min-h-full bg-white font-sans text-black selection:bg-[#F20078] selection:text-white pb-0 overflow-x-hidden">

      {/* ─── SCROLLING PROMO BAR ─── */}
      <div className="bg-[#F20078] text-white text-[13px] py-2 flex items-center overflow-hidden whitespace-nowrap border-b-2 border-black">
        <div className="animate-[marquee_20s_linear_infinite] flex items-center font-black uppercase italic tracking-wider">
          <span className="mx-6 flex items-center"><Zap className="w-4 h-4 mr-2" fill="white" /> 60% OFF EVERYTHING! ENDS SOON <Zap className="w-4 h-4 ml-2" fill="white" /></span>
          <span className="mx-6 flex items-center"><Zap className="w-4 h-4 mr-2" fill="white" /> 60% OFF EVERYTHING! ENDS SOON <Zap className="w-4 h-4 ml-2" fill="white" /></span>
          <span className="mx-6 flex items-center"><Zap className="w-4 h-4 mr-2" fill="white" /> 60% OFF EVERYTHING! ENDS SOON <Zap className="w-4 h-4 ml-2" fill="white" /></span>
          <span className="mx-6 flex items-center"><Zap className="w-4 h-4 mr-2" fill="white" /> 60% OFF EVERYTHING! ENDS SOON <Zap className="w-4 h-4 ml-2" fill="white" /></span>
        </div>
      </div>

      <div className="bg-black text-white text-[11px] font-bold uppercase tracking-widest py-1.5 px-6 flex justify-center items-center">
        FREE PREMIER DELIVERY & RETURNS - ONLY $9.99/YEAR
      </div>

      {/* ─── HEADER ─── */}
      <header className="bg-white sticky top-0 z-50 border-b-2 border-black shadow-none transition-all h-[75px] md:h-[85px]">
        <div className="w-full mx-auto px-4 md:px-8 h-full flex items-center justify-between">

          <div className="flex items-center">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden mr-4 cursor-pointer hover:text-[#F20078] transition-colors"
            >
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>

            <div className="flex items-center cursor-pointer mr-8 lg:mr-12">
              <span className="font-black text-[36px] md:text-[42px] tracking-tighter italic lowercase leading-none text-black">
                BoldYouth
              </span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex space-x-6 xl:space-x-8 font-black text-[15px] uppercase tracking-tighter italic text-black mt-2">
              <a href="#" className="hover:text-[#F20078] transition-colors">Womens</a>
              <a href="#" className="hover:text-[#F20078] transition-colors">Mens</a>
              <a href="#" className="hover:text-[#F20078] transition-colors">Dresses</a>
              <a href="#" className="hover:text-[#F20078] transition-colors">Beauty</a>
              <a href="#" className="text-[#F20078] flex items-center"><Tag className="w-4 h-4 mr-1 fill-[#F20078]" /> Sale</a>
            </nav>
          </div>

          <div className="flex items-center space-x-5 lg:space-x-6 text-black">
            <div className="hidden xl:flex items-center border-2 border-black rounded-none px-4 py-2 w-64 focus-within:ring-2 focus-within:ring-[#F20078] transition-shadow">
              <input type="text" placeholder="WHAT ARE YOU LOOKING FOR?" className="bg-transparent outline-none text-[12px] font-black italic uppercase w-full placeholder-gray-500" />
              <Search className="w-5 h-5 text-black" />
            </div>
            <Search className="w-6 h-6 xl:hidden cursor-pointer hover:text-[#F20078] transition-colors" />
            <User className="hidden md:block w-7 h-7 cursor-pointer hover:text-[#F20078] transition-colors" />
            <div 
              onClick={() => toggleFavorite('header')}
              className="hidden md:block relative cursor-pointer hover:text-[#F20078] transition-colors"
            >
              <Heart className={`w-7 h-7 ${favorites.length > 0 ? 'fill-[#F20078] text-[#F20078]' : ''}`} />
              {favorites.length > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[#F20078] text-white text-[10px] font-black px-1.5 rounded-full min-w-[18px] text-center">{favorites.length}</span>
              )}
            </div>
            <div 
              onClick={() => setIsCartOpen(true)}
              className="relative cursor-pointer hover:text-[#F20078] transition-colors"
            >
              <ShoppingBag className="w-7 h-7" />
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[#F20078] text-white text-[10px] font-black px-1.5 rounded-full min-w-[18px] text-center">{itemCount}</span>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="w-full">

        {/* ─── HERO BANNER ─── */}
        <section className="relative w-full h-[550px] md:h-[680px] flex justify-center items-center overflow-hidden mb-8 md:mb-12 border-b-4 border-black">
          <Image
            src={data.bannerImage}
            alt="Hero Banner"
            fill
            className="object-cover object-center opacity-90"
            priority
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/30"></div>

          <div className="relative z-10 px-6 w-full h-full flex flex-col justify-end text-white pb-16 md:pb-24">
            <div className="max-w-[1200px] mx-auto w-full">
              <div className="bg-black/80 backdrop-blur-sm border-2 border-[#F20078] p-6 md:p-10 w-full max-w-2xl transform -skew-x-3 drop-shadow-[8px_8px_0_#F20078]">
                <h1 className="text-[50px] md:text-[80px] font-black uppercase italic tracking-tighter leading-[0.9] text-white drop-shadow-lg mb-4 transform skew-x-3">
                  {data.name}
                </h1>
                <p className="text-[18px] md:text-[24px] font-bold uppercase italic text-gray-200 leading-tight mb-8 transform skew-x-3">
                  {data.description || 'YOUR NEW SEASON WARDROBE STARTS HERE.'}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 transform skew-x-3">
                  <button className="bg-[#F20078] text-white px-10 py-4 font-black uppercase italic tracking-widest text-[16px] hover:bg-white hover:text-black transition-colors shadow-[4px_4px_0_0_#fff] hover:shadow-[4px_4px_0_0_#F20078]">
                    Shop Women
                  </button>
                  <button className="bg-white text-black px-10 py-4 font-black uppercase italic tracking-widest text-[16px] hover:bg-black hover:text-white transition-colors shadow-[4px_4px_0_0_#F20078] hover:shadow-[4px_4px_0_0_#fff]">
                    Shop Men
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── CATEGORY BLOCKS ─── */}
        <section className="px-4 md:px-8 max-w-[1600px] mx-auto mb-16 md:mb-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Dresses', img: 'https://picsum.photos/500/600?random=110' },
              { name: 'Tops', img: 'https://picsum.photos/500/600?random=111' },
              { name: 'Going Out', img: 'https://picsum.photos/500/600?random=112' },
              { name: 'Accessories', img: 'https://picsum.photos/500/600?random=113' },
            ].map((cat, i) => (
              <div key={i} className="group cursor-pointer flex flex-col items-center">
                <div className="w-full aspect-[4/5] overflow-hidden mb-4 border-2 border-black shadow-[4px_4px_0_0_#000] group-hover:shadow-[4px_4px_0_0_#F20078] group-hover:-translate-y-1 transition-all relative">
                  <Image src={cat.img} alt={cat.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                </div>
                <span className="font-black text-[22px] md:text-[28px] uppercase italic tracking-tighter text-black group-hover:text-[#F20078] transition-colors">{cat.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ─── NEW IN GRID (Paginated) ─── */}
        <section className="px-4 md:px-8 max-w-[1600px] mx-auto mb-20 md:mb-24">
          <div className="flex items-end justify-between mb-8 border-b-4 border-black pb-4">
            <h2 className="text-[36px] md:text-[48px] font-black uppercase italic tracking-tighter text-black leading-none flex items-center">
              All Products ({totalItems})
            </h2>
            <a href="#" className="hidden md:flex text-[16px] font-black uppercase italic tracking-widest text-[#F20078] hover:text-black hover:underline underline-offset-4 transition-colors items-center">
              View All <ChevronRight className="w-5 h-5 ml-1" />
            </a>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 md:gap-4">
            {paginatedItems.map((product, idx) => (
              <div key={product.id || idx} data-product-id={product.id} className="group cursor-pointer flex flex-col bg-white">
                <div className="relative aspect-[3/4] mb-2 bg-[#f0f0f0] overflow-hidden border-2 border-transparent group-hover:border-black transition-colors">
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 left-2 bg-black text-white text-[9px] font-black italic px-2 py-1 uppercase tracking-widest">
                    New In
                  </div>
                  {idx % 2 === 0 && (
                    <div className="absolute top-2 right-2 bg-[#F20078] text-white text-[9px] font-black italic px-2 py-1 uppercase tracking-widest">
                      60% OFF
                    </div>
                  )}
                  {/* Favorite Button */}
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }}
                    className="absolute bottom-2 right-2 bg-white border-2 border-black rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-[2px_2px_0_0_#000]"
                  >
                    <Heart className={`w-3 h-3 ${favorites.includes(product.id) ? 'fill-[#F20078] text-[#F20078]' : ''}`} strokeWidth={2.5} />
                  </button>
                  {/* Add to Cart */}
                  <button 
                    onClick={(e) => handleAddToCart(product, e)}
                    className="absolute bottom-2 left-2 right-2 bg-black text-white py-2 text-[10px] font-black uppercase italic tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#F20078]"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-col flex-1">
                  <h3 className="text-[11px] md:text-[12px] font-bold uppercase text-gray-800 line-clamp-2 leading-tight mb-1 group-hover:text-black">
                    {product.title}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-[14px] md:text-[16px] font-black text-[#F20078] italic">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-[10px] md:text-[11px] font-bold text-gray-400 line-through italic">
                        ${product.originalPrice}
                      </span>
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
        </section>

        {/* ─── TRENDING NOW MASSIVE BLOCKS ─── */}
        <section className="px-4 md:px-8 max-w-[1600px] mx-auto mb-20 md:mb-24">
          <div className="text-center mb-10">
            <h2 className="text-[40px] md:text-[60px] font-black uppercase italic tracking-tighter text-black leading-none drop-shadow-[2px_2px_0_#F20078]">Trending Now</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="relative group cursor-pointer overflow-hidden aspect-[4/3] md:aspect-video border-4 border-black shadow-[8px_8px_0_0_#000] hover:shadow-[8px_8px_0_0_#F20078] transition-all hover:-translate-y-2">
              <Image src="https://picsum.photos/800/600?random=120" alt="Trend 1" fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>
              <div className="absolute bottom-8 left-8 text-white max-w-sm">
                <div className="bg-[#F20078] text-white text-[12px] font-black px-3 py-1 uppercase italic tracking-widest w-fit mb-3 transform -skew-x-6">The Edit</div>
                <h3 className="text-[36px] md:text-[48px] font-black italic uppercase tracking-tighter mb-2 leading-none drop-shadow-md">Y2K Core</h3>
                <button className="mt-4 bg-white text-black px-6 py-2.5 font-black uppercase italic tracking-widest text-[12px] hover:bg-black hover:text-white transition-colors flex items-center">
                  Shop The Look <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>

            <div className="relative group cursor-pointer overflow-hidden aspect-[4/3] md:aspect-video border-4 border-black shadow-[8px_8px_0_0_#000] hover:shadow-[8px_8px_0_0_#F20078] transition-all hover:-translate-y-2">
              <Image src="https://picsum.photos/800/600?random=121" alt="Trend 2" fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>
              <div className="absolute bottom-8 left-8 text-white max-w-sm">
                <div className="bg-[#F20078] text-white text-[12px] font-black px-3 py-1 uppercase italic tracking-widest w-fit mb-3 transform -skew-x-6">Must Haves</div>
                <h3 className="text-[36px] md:text-[48px] font-black italic uppercase tracking-tighter mb-2 leading-none drop-shadow-md">Cargo Core</h3>
                <button className="mt-4 bg-white text-black px-6 py-2.5 font-black uppercase italic tracking-widest text-[12px] hover:bg-black hover:text-white transition-colors flex items-center">
                  Shop The Look <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SHOP BY STYLE ─── */}
        <section className="px-4 md:px-8 max-w-[1600px] mx-auto mb-20 md:mb-24">
          <h2 className="text-[36px] md:text-[48px] font-black uppercase italic tracking-tighter text-black leading-none mb-8 text-center drop-shadow-[2px_2px_0_#F20078]">Shop by Style</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {['Streetwear', 'Casual', 'Party', 'Athleisure', 'Vintage', 'Minimalist'].map((style, i) => (
              <div key={i} className="group cursor-pointer text-center">
                <div className="aspect-square rounded-full overflow-hidden border-4 border-black group-hover:border-[#F20078] transition-colors shadow-[4px_4px_0_0_#000] group-hover:shadow-[4px_4px_0_0_#F20078] mx-auto w-full max-w-[140px] relative">
                  <Image src={`https://picsum.photos/300/300?random=${140 + i}`} alt={style} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <span className="font-black text-[14px] md:text-[16px] uppercase italic tracking-tighter mt-3 block group-hover:text-[#F20078] transition-colors">{style}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ─── BESTSELLERS ─── */}
        <section className="px-4 md:px-8 max-w-[1600px] mx-auto mb-20 md:mb-24">
          <div className="flex items-end justify-between mb-8 border-b-4 border-black pb-4">
            <h2 className="text-[36px] md:text-[48px] font-black uppercase italic tracking-tighter text-black leading-none">Bestsellers</h2>
          </div>
          <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4">
            {data.products.slice(0, 6).map((product, idx) => (
              <div key={`best-${idx}`} className="min-w-[200px] md:min-w-[240px] shrink-0 group cursor-pointer">
                <div className="relative aspect-[3/4] mb-3 bg-[#f0f0f0] overflow-hidden border-2 border-black shadow-[4px_4px_0_0_#000] group-hover:shadow-[4px_4px_0_0_#F20078] transition-all">
                  <Image src={product.imageUrl} alt={product.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                  <div className="absolute top-2 left-2 bg-[#F20078] text-white text-[10px] font-black italic px-2 py-1">#{idx + 1}</div>
                  <button onClick={(e) => handleAddToCart(product, e)} className="absolute bottom-2 left-2 right-2 bg-black text-white py-2 text-[10px] font-black uppercase italic opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#F20078]">Add</button>
                </div>
                <h3 className="text-[12px] font-bold uppercase line-clamp-1">{product.title}</h3>
                <span className="text-[14px] font-black text-[#F20078] italic">${product.price}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ─── CUSTOMER REVIEWS ─── */}
        <section className="px-4 md:px-8 max-w-[1600px] mx-auto mb-20 md:mb-24">
          <h2 className="text-[36px] md:text-[48px] font-black uppercase italic tracking-tighter text-black leading-none mb-8 text-center">What They Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Emily R.', text: 'Obsessed with the quality for the price. My go-to for going out fits!', rating: 5 },
              { name: 'Jake M.', text: 'Fast delivery and the styles are always on trend. Love it.', rating: 5 },
              { name: 'Sophie T.', text: 'Student discount is a game changer. Best online store for my budget.', rating: 4 },
            ].map((review, i) => (
              <div key={i} className="bg-white border-4 border-black p-6 shadow-[6px_6px_0_0_#000] hover:shadow-[6px_6px_0_0_#F20078] transition-all">
                <div className="flex mb-3">
                  {[...Array(review.rating)].map((_, j) => <Zap key={j} className="w-4 h-4 text-[#F20078] fill-[#F20078]" />)}
                </div>
                <p className="text-[14px] text-gray-700 mb-4 italic font-bold">&ldquo;{review.text}&rdquo;</p>
                <span className="font-black text-[13px] uppercase italic">{review.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ─── APP DOWNLOAD ─── */}
        <section className="px-4 md:px-8 max-w-[1600px] mx-auto mb-20 md:mb-24">
          <div className="bg-[#F20078] border-4 border-black p-8 md:p-14 flex flex-col md:flex-row items-center justify-between shadow-[8px_8px_0_0_#000] transform -skew-x-1">
            <div className="transform skew-x-1 mb-6 md:mb-0 text-center md:text-left">
              <h2 className="text-[36px] md:text-[48px] font-black uppercase italic tracking-tighter text-white leading-none mb-4">Get The App</h2>
              <p className="text-[16px] font-bold text-white/90 uppercase italic max-w-md">Exclusive app-only deals, early access to drops, and 20% off your first app order.</p>
            </div>
            <div className="flex gap-4 transform skew-x-1">
              <button className="bg-black text-white px-8 py-4 font-black uppercase italic tracking-widest text-[14px] shadow-[4px_4px_0_0_#fff] hover:bg-white hover:text-black transition-colors flex items-center">
                <Smartphone className="w-5 h-5 mr-2" /> App Store
              </button>
              <button className="bg-white text-black px-8 py-4 font-black uppercase italic tracking-widest text-[14px] shadow-[4px_4px_0_0_#000] hover:bg-black hover:text-white transition-colors flex items-center">
                <Smartphone className="w-5 h-5 mr-2" /> Google Play
              </button>
            </div>
          </div>
        </section>

        {/* ─── SERVICES STRIP ─── */}
        <section className="px-4 md:px-8 max-w-[1600px] mx-auto mb-20 md:mb-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '🚚', title: 'Free Delivery', desc: 'On orders over $40' },
              { icon: '↩️', title: 'Easy Returns', desc: '28-day free returns' },
              { icon: '💳', title: 'Pay Later', desc: 'Klarna & Afterpay' },
              { icon: '🎁', title: 'Gift Cards', desc: 'The perfect gift' },
            ].map((s, i) => (
              <div key={i} className="bg-white border-2 border-black p-4 text-center shadow-[3px_3px_0_0_#000] hover:shadow-[3px_3px_0_0_#F20078] transition-all">
                <div className="text-[28px] mb-2">{s.icon}</div>
                <h3 className="font-black text-[14px] uppercase italic tracking-tighter">{s.title}</h3>
                <p className="text-[11px] text-gray-500 font-bold uppercase italic">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── STUDENT DISCOUNT ─── */}
        <section className="bg-black text-white border-y-4 border-[#F20078] mb-20 md:mb-24 overflow-hidden relative">
          <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between p-10 md:p-20 relative z-10">

            <div className="max-w-xl text-center md:text-left mb-10 md:mb-0">
              <div className="inline-flex items-center text-[#F20078] font-black uppercase italic tracking-widest text-[14px] mb-4">
                <CheckCircle className="w-5 h-5 mr-2" /> Verified Students Only
              </div>
              <h2 className="text-[50px] md:text-[80px] font-black uppercase italic tracking-tighter leading-[0.8] mb-6 drop-shadow-[4px_4px_0_#F20078]">
                Student<br />Discount
              </h2>
              <p className="text-[18px] md:text-[22px] font-bold text-gray-300 mb-8 uppercase italic tracking-wide max-w-md">
                Get an extra <span className="text-[#F20078]">10% off</span> your order. Register with UNiDAYS or Student Beans.
              </p>
              <button className="bg-[#F20078] text-white px-10 py-4 font-black uppercase italic tracking-widest text-[16px] hover:bg-white hover:text-black transition-colors transform -skew-x-6 border-2 border-transparent">
                <span className="block transform skew-x-6">Get Discount</span>
              </button>
            </div>

            <div className="relative">
              {/* Giant 10% typography art */}
              <div className="absolute -inset-10 bg-gradient-to-tr from-[#F20078] to-purple-600 rounded-full blur-[100px] opacity-40 animate-pulse"></div>
              <div className="relative border-4 border-[#F20078] rounded-full w-[250px] h-[250px] md:w-[350px] md:h-[350px] flex items-center justify-center bg-black/50 backdrop-blur-sm transform rotate-12 shadow-[10px_10px_0_0_#F20078]">
                <div className="text-center transform -rotate-12">
                  <span className="block text-[80px] md:text-[120px] font-black uppercase italic tracking-tighter leading-[0.8] drop-shadow-[4px_4px_0_#F20078]">10%</span>
                  <span className="block text-[40px] md:text-[60px] font-black uppercase italic tracking-tighter leading-[0.8] text-[#F20078]">OFF</span>
                </div>
              </div>
            </div>

          </div>
          {/* Background repeat pattern */}
          <div className="absolute inset-0 opacity-5 pointer-events-none select-none flex flex-wrap content-start overflow-hidden text-[120px] font-black italic tracking-tighter leading-none text-[#F20078]">
            STUDENTSTUDENTSTUDENTSTUDENTSTUDENTSTUDENTSTUDENT
          </div>
        </section>

      </main>

      {/* ─── FOOTER ─── */}
      <footer className="bg-white text-black border-t-8 border-black pt-16">
        <div className="w-full mx-auto px-6 md:px-12">

          <div className="flex flex-col lg:flex-row justify-between gap-12 mb-16">

            {/* Newsletter */}
            <div className="flex-1 max-w-xl">
              <h4 className="font-black uppercase italic tracking-tighter text-[28px] md:text-[36px] mb-4">Don't Miss Out</h4>
              <p className="font-bold text-gray-600 mb-6 uppercase italic text-[14px]">Sign up for exclusive discounts, new drops and the latest trends.</p>
              <form className="flex w-full mb-8 shadow-[4px_4px_0_0_#000]">
                <input type="email" placeholder="Email Address" className="bg-gray-100 border-2 border-black border-r-0 text-black px-6 py-4 outline-none flex-1 font-bold uppercase italic placeholder-gray-500" />
                <button type="button" className="bg-black text-white px-8 py-4 font-black uppercase italic tracking-widest text-[14px] hover:bg-[#F20078] hover:text-white transition-colors border-2 border-black">
                  Subscribe
                </button>
              </form>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 bg-black text-white flex items-center justify-center hover:bg-[#F20078] transition-colors shadow-[2px_2px_0_0_#000]"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="w-12 h-12 bg-black text-white flex items-center justify-center hover:bg-[#F20078] transition-colors shadow-[2px_2px_0_0_#000]"><Facebook className="w-5 h-5" /></a>
                <a href="#" className="w-12 h-12 bg-black text-white flex items-center justify-center hover:bg-[#F20078] transition-colors shadow-[2px_2px_0_0_#000]"><Twitter className="w-5 h-5" /></a>
                <a href="#" className="w-12 h-12 bg-black text-white flex items-center justify-center hover:bg-[#F20078] transition-colors shadow-[2px_2px_0_0_#000]"><Youtube className="w-5 h-5" /></a>
              </div>
            </div>

            {/* Links */}
            <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-8 text-[13px] font-black uppercase italic tracking-widest">
              <div className="flex flex-col space-y-4">
                <h4 className="text-[#F20078] mb-2 text-[15px] border-b-2 border-black pb-1 inline-block w-fit">Help</h4>
                <a href="#" className="hover:text-[#F20078] hover:translate-x-1 transition-all">Track My Order</a>
                <a href="#" className="hover:text-[#F20078] hover:translate-x-1 transition-all">Delivery Options</a>
                <a href="#" className="hover:text-[#F20078] hover:translate-x-1 transition-all">Returns</a>
                <a href="#" className="hover:text-[#F20078] hover:translate-x-1 transition-all">Make a Return</a>
                <a href="#" className="hover:text-[#F20078] hover:translate-x-1 transition-all">FAQs</a>
              </div>

              <div className="flex flex-col space-y-4">
                <h4 className="text-[#F20078] mb-2 text-[15px] border-b-2 border-black pb-1 inline-block w-fit">Information</h4>
                <a href="#" className="hover:text-[#F20078] hover:translate-x-1 transition-all">About Us</a>
                <a href="#" className="hover:text-[#F20078] hover:translate-x-1 transition-all">Careers</a>
                <a href="#" className="hover:text-[#F20078] hover:translate-x-1 transition-all">Investor Relations</a>
                <a href="#" className="hover:text-[#F20078] hover:translate-x-1 transition-all">Responsibility</a>
                <a href="#" className="hover:text-[#F20078] hover:translate-x-1 transition-all">Affiliates</a>
              </div>

              <div className="flex flex-col space-y-4 col-span-2 md:col-span-1">
                <h4 className="text-[#F20078] mb-2 text-[15px] border-b-2 border-black pb-1 inline-block w-fit">More BoldYouth</h4>
                <a href="#" className="hover:text-[#F20078] hover:translate-x-1 transition-all">BoldYouthMAN</a>
                <a href="#" className="hover:text-[#F20078] hover:translate-x-1 transition-all">Gift Cards</a>
                <a href="#" className="hover:text-[#F20078] hover:translate-x-1 transition-all">Student Discount</a>
                <a href="#" className="hover:text-[#F20078] hover:translate-x-1 transition-all">BoldYouth Premier</a>
                <a href="#" className="hover:text-[#F20078] hover:translate-x-1 transition-all">The BoldYouth App</a>
              </div>
            </div>

          </div>

          <div className="py-8 border-t-2 border-black flex flex-col items-center justify-between text-[11px] font-black uppercase italic tracking-widest text-black text-center gap-4">
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              <a href="#" className="hover:text-[#F20078] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#F20078] transition-colors">Terms of Use</a>
              <a href="#" className="hover:text-[#F20078] transition-colors">Accessibility</a>
              <a href="#" className="hover:text-[#F20078] transition-colors">Sitemap</a>
            </div>
            <span>© 2026 BOLDYOUTH. ALL RIGHTS RESERVED.</span>
          </div>

        </div>
      </footer>
    </div>
  );
}

