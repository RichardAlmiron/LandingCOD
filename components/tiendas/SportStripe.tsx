'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { StoreData, Product } from '@/lib/types';
import { useCart } from '@/contexts/CartContext';
import { Search, ShoppingBag, Heart, User, ArrowRight, Star, Truck, RotateCcw, ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';
import { usePagination, ProductPagination } from '@/components/componentes-compartidos/templates/Pagination';

export default function SportStripeTemplate({ data }: { data: StoreData }) {
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
    <div className="min-h-full bg-white font-sans text-black overflow-x-hidden" style={{ fontFamily: "'AdihausDIN', Helvetica, Arial, sans-serif" }}>

      {/* ─── TOP PROMO BAR ─── */}
      <div className="bg-black text-white text-[11px] py-2 px-4 text-center font-bold tracking-[2px] uppercase flex justify-center items-center h-[32px] cursor-pointer hover:underline underline-offset-4">
        FREE STANDARD SHIPPING & RETURNS | JOIN NOW
      </div>

      {/* ─── HELP / LOGIN BAR ─── */}
      <div className="hidden lg:flex w-full px-10 py-1.5 justify-end items-center text-[12px] font-medium space-x-6 text-[#767677]">
        <a href="#" className="hover:text-black hover:underline underline-offset-2 transition-colors">help</a>
        <a href="#" className="hover:text-black hover:underline underline-offset-2 transition-colors">exchanges & returns</a>
        <a href="#" className="hover:text-black hover:underline underline-offset-2 transition-colors">order tracker</a>
        <a href="#" className="hover:text-black hover:underline underline-offset-2 transition-colors">join adiClub</a>
      </div>

      {/* ─── MAIN HEADER ─── */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 transition-transform h-[60px] md:h-[80px]">
        <div className="w-full h-full px-4 lg:px-10 flex items-center justify-between">

          <div className="flex items-center space-x-4 lg:space-x-12 h-full">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 hover:bg-gray-100 rounded-md transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" strokeWidth={2.5} /> : <Menu className="w-6 h-6" strokeWidth={2.5} />}
            </button>

            {/* Logo (SportStripe 3 Bars - Simulated Support) */}
            <div className="shrink-0 cursor-pointer h-full flex flex-col justify-center mt-1">
              <svg viewBox="0 0 50 34" className="w-[50px] md:w-[68px] h-auto">
                <path d="M33.6 32.5L20.4 9.6h6.7l13.2 22.9h-6.7zM19.7 32.5L12 19.3h6.6L26.3 32.5h-6.6zM6 32.5L3.4 28h6.6l2.6 4.5H6z" fill="#000" />
              </svg>
            </div>

            {/* Main Desktop Navigation */}
            <nav className="hidden lg:flex h-full space-x-6 font-bold text-[15px] uppercase tracking-normal">
              <a href="#" className="flex items-center h-full border-b-[3px] border-transparent hover:border-black transition-all">Men</a>
              <a href="#" className="flex items-center h-full border-b-[3px] border-transparent hover:border-black transition-all">Women</a>
              <a href="#" className="flex items-center h-full border-b-[3px] border-transparent hover:border-black transition-all">Kids</a>
              <a href="#" className="flex items-center h-full border-b-[3px] border-transparent hover:border-black transition-all text-[#e51c24]">Sale</a>
              <a href="#" className="flex items-center h-full border-b-[3px] border-transparent hover:border-black transition-all">3 Stripe Life</a>
            </nav>
          </div>

          <div className="flex items-center space-x-5 lg:space-x-6 h-full">
            {/* Search Input */}
            <div className="hidden md:flex items-center bg-[#f5f5f5] px-3 h-[40px] w-[220px] rounded-sm border border-transparent hover:border-gray-300 focus-within:border-black focus-within:bg-white transition-all group">
              <input type="text" placeholder="Search" className="bg-transparent outline-none text-[14px] w-full font-medium placeholder:text-[#767677] text-black" />
              <Search className="w-[18px] h-[18px] text-black group-focus-within:text-black shrink-0 cursor-pointer" strokeWidth={2.5} />
            </div>

            {/* Mobile Search Icon */}
            <button className="md:hidden p-1 hover:bg-gray-100 rounded-full">
              <Search className="w-6 h-6" strokeWidth={2} />
            </button>

            <button className="hidden sm:block p-1 hover:bg-gray-100 rounded-sm tooltip-wrapper relative" title="Profile">
              <User className="w-[22px] h-[22px]" strokeWidth={2} />
            </button>
            <button 
              onClick={() => toggleFavorite('header')}
              className="hidden sm:block p-1 hover:bg-gray-100 rounded-sm tooltip-wrapper relative" title="Wishlist"
            >
              <Heart className={`w-[22px] h-[22px] ${favorites.length > 0 ? 'fill-red-500 text-red-500' : ''}`} strokeWidth={2} />
              {favorites.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-[9px] font-bold px-1.5 rounded-full">{favorites.length}</span>
              )}
            </button>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="p-1 hover:bg-gray-100 rounded-sm relative tooltip-wrapper" title="Cart"
            >
              <ShoppingBag className="w-[22px] h-[22px]" strokeWidth={2} />
              {itemCount > 0 && (
                <span className="absolute top-1 right-0 bg-[#0071ae] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full leading-none">{itemCount}</span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ─── MAIN CONTENT ─── */}
      <main className="w-full">

        {/* HERO BANNER SECTION (Full width, sharp edges) */}
        <div className="relative h-[65vh] md:h-[80vh] w-full group cursor-pointer overflow-hidden bg-[#e5e5e5]">
          <Image
            src={data.bannerImage}
            alt="Banner"
            fill
            className="object-cover object-center"
            referrerPolicy="no-referrer"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

          <div className="absolute bottom-10 left-4 md:bottom-16 md:left-10 text-white max-w-2xl px-2">
            <h1 className="text-[38px] sm:text-[50px] md:text-[68px] font-black uppercase tracking-tighter mb-2 leading-[0.9]">{data.name}</h1>
            <p className="text-[16px] md:text-[20px] font-normal mb-8 leading-tight drop-shadow-md">{data.description || "Unleash your potential with the latest arrivals. Built for performance, designed for style."}</p>
            <div className="flex flex-wrap gap-3">
              <button className="bg-white text-black px-6 py-3 md:px-8 md:py-4 font-bold uppercase text-[13px] tracking-wider flex items-center group/btn hover:text-gray-600 transition-colors shadow-sm rounded-sm">
                Shop Men <ArrowRight className="w-5 h-5 ml-3 group-hover/btn:translate-x-1 transition-transform" strokeWidth={2.5} />
              </button>
              <button className="bg-white text-black px-6 py-3 md:px-8 md:py-4 font-bold uppercase text-[13px] tracking-wider flex items-center group/btn hover:text-gray-600 transition-colors shadow-sm rounded-sm">
                Shop Women <ArrowRight className="w-5 h-5 ml-3 group-hover/btn:translate-x-1 transition-transform" strokeWidth={2.5} />
              </button>
              <button className="bg-white text-black px-6 py-3 md:px-8 md:py-4 font-bold uppercase text-[13px] tracking-wider flex items-center group/btn hover:text-gray-600 transition-colors shadow-sm rounded-sm">
                Shop Kids <ArrowRight className="w-5 h-5 ml-3 group-hover/btn:translate-x-1 transition-transform" strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>

        <div className="w-full max-w-[1920px] mx-auto px-4 md:px-10 py-12 md:py-16">

          {/* POPULAR RIGHT NOW */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-[26px] md:text-[32px] font-black uppercase tracking-tighter">Popular right now</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {['samba', 'campus', 'gazelle', 'adicolor', 'terrex', 'ultraboost'].map((tag, i) => (
                <div key={i} className="border border-gray-300 px-6 py-3 font-medium uppercase text-[14px] tracking-wide hover:border-black cursor-pointer transition-colors">
                  {tag}
                </div>
              ))}
            </div>
          </div>

          {/* NEW ARRIVALS (Product Carousel) */}
          <div className="mb-20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[26px] md:text-[32px] font-black uppercase tracking-tighter">New Arrivals</h2>
              <a href="#" className="text-[14px] font-bold uppercase tracking-wide underline underline-offset-4 hover:bg-black hover:text-white px-2 py-1 transition-colors hidden sm:block">Shop All</a>
            </div>

            <div className="flex overflow-x-auto gap-4 pb-8 snap-x snap-mandatory hide-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
              {data.products.map((product, idx) => {
                const price = product.price;
                const originalPrice = product.originalPrice;
                const isNew = product.discount && product.discount > 0;

                return (
                  <div key={product.id} data-product-id={product.id} data-discount={product.discount || 0} className="group cursor-pointer flex flex-col shrink-0 w-[240px] md:w-[280px] lg:w-[320px] snap-start hover:border-black transition-all border border-transparent pb-1">
                    <div className="relative aspect-square mb-3 bg-[#ecefef] overflow-hidden group-hover:border-b-4 border-black transition-all">
                      <Image
                        src={product.imageUrl}
                        alt={product.title}
                        fill
                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-500 mix-blend-multiply"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-2 left-2 flex flex-col gap-1">
                        <span className="bg-white px-2 py-1 text-[12px] font-bold tracking-wide italic">${price}</span>
                        {originalPrice && <span className="bg-white px-2 py-1 text-[12px] font-bold tracking-wide italic line-through text-gray-500">${originalPrice}</span>}
                      </div>
                      <button className="absolute top-2 right-2 bg-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity hover:opacity-70">
                        <Heart className="w-[18px] h-[18px] text-black" strokeWidth={2} />
                      </button>
                    </div>
                    <div className="px-1 flex-1 flex flex-col">
                      <h3 className="text-[14px] font-medium line-clamp-1 group-hover:underline underline-offset-2 mb-0.5">{product.title}</h3>
                      <p className="text-[14px] text-[#767677] capitalize">{product.category || "Originals"}</p>

                      <div className="mt-auto pt-2 text-[13px] text-[#767677]">
                        {isNew ? `-${product.discount}% OFF` : '2 colors'}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            {/* Mobile shop all button */}
            <div className="sm:hidden mt-4">
              <button className="w-full border border-black py-3 font-bold uppercase text-[14px] tracking-wide hover:bg-black hover:text-white transition-colors">Shop All New Arrivals</button>
            </div>
          </div>

          {/* SHOP BY CATEGORY (Large Blocks) */}
          <div className="mb-20">
            <h2 className="text-[26px] md:text-[32px] font-black uppercase tracking-tighter mb-6">Who are you shopping for?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: 'Men', img: 'https://picsum.photos/600/800?random=120' },
                { name: 'Women', img: 'https://picsum.photos/600/800?random=121' },
                { name: 'Kids', img: 'https://picsum.photos/600/800?random=122' },
              ].map((cat, i) => (
                <div key={i} className="group cursor-pointer relative overflow-hidden h-[400px] md:h-[500px]">
                  <Image src={cat.img} alt={cat.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                  <div className="absolute inset-0 bg-black/10 transition-colors duration-500"></div>

                  {/* SportStripe blocky button style absolute positioned */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-white text-black p-4 inline-block font-black uppercase text-[15px] tracking-widest shadow-lg group-hover:bg-black group-hover:text-white transition-colors border border-transparent shadow-[4px_4px_0_0_#000]">
                      {cat.name}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* TRENDING STORIES (Editorial Layout) */}
          <div className="mb-20">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-[26px] md:text-[32px] font-black uppercase tracking-tighter">Trending</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="group cursor-pointer relative overflow-hidden h-[450px] md:h-[550px] bg-gray-100 flex flex-col justify-end">
                <Image src="https://picsum.photos/800/1000?random=123" alt="Samba" fill className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80"></div>

                <div className="relative z-10 p-8 text-white w-full">
                  <h3 className="text-[32px] font-black uppercase tracking-tighter mb-2 leading-none">Samba</h3>
                  <p className="text-[16px] font-normal mb-6">The iconic silhouette that never goes out of style.</p>
                  <span className="font-bold uppercase text-[13px] tracking-widest border-b-[2px] border-white pb-1 group-hover:bg-white group-hover:text-black group-hover:px-2 group-hover:py-1 transition-all">Shop Now</span>
                </div>
              </div>
              <div className="group cursor-pointer relative overflow-hidden h-[450px] md:h-[550px] bg-gray-100 flex flex-col justify-end">
                <Image src="https://picsum.photos/800/1000?random=124" alt="Gazelle" fill className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80"></div>

                <div className="relative z-10 p-8 text-white w-full">
                  <h3 className="text-[32px] font-black uppercase tracking-tighter mb-2 leading-none">Gazelle</h3>
                  <p className="text-[16px] font-normal mb-6">A classic reimagined for the modern street.</p>
                  <span className="font-bold uppercase text-[13px] tracking-widest border-b-[2px] border-white pb-1 group-hover:bg-white group-hover:text-black group-hover:px-2 group-hover:py-1 transition-all">Shop Now</span>
                </div>
              </div>
            </div>
          </div>

          {/* ─── RECENTLY VIEWED ─── */}
          <div className="mb-20">
            <h2 className="text-[26px] md:text-[32px] font-black uppercase tracking-tighter mb-6">Recently Viewed</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {data.products.slice(0, 4).map((product, idx) => (
                <div key={`rv-${idx}`} className="group cursor-pointer border border-transparent hover:border-black transition-all">
                  <div className="relative aspect-square bg-[#ecefef] overflow-hidden mb-3">
                    <Image src={product.imageUrl} alt={product.title} fill className="object-contain p-4 mix-blend-multiply group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                  </div>
                  <div className="px-1">
                    <h3 className="text-[14px] font-medium line-clamp-1 group-hover:underline">{product.title}</h3>
                    <span className="text-[14px] font-bold">${product.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ─── SUSTAINABILITY SECTION ─── */}
          <div className="mb-20 bg-[#e8f5e9] p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 border-2 border-[#2e7d32]">
            <div className="flex-1">
              <span className="text-[12px] font-bold uppercase tracking-widest text-[#2e7d32] mb-2 block">End Plastic Waste</span>
              <h2 className="text-[32px] md:text-[42px] font-black uppercase tracking-tighter mb-4 leading-[0.9] text-[#1b5e20]">Made to be Remade</h2>
              <p className="text-[16px] text-[#333] mb-6 max-w-lg">Our commitment to sustainability means creating products that are designed with the planet in mind. Shop our eco-friendly collection.</p>
              <button className="bg-[#2e7d32] text-white px-6 py-3 font-bold uppercase text-[13px] tracking-widest flex items-center hover:bg-[#1b5e20] transition-colors">
                Shop Sustainable <ArrowRight className="w-5 h-5 ml-3" strokeWidth={2} />
              </button>
            </div>
            <div className="w-full md:w-[300px] aspect-square relative overflow-hidden">
              <Image src="https://picsum.photos/400/400?random=130" alt="Sustainability" fill className="object-cover rounded-sm" referrerPolicy="no-referrer" />
            </div>
          </div>

          {/* ADICLUB PROMO (Yellow / Black high contrast) */}
          <div className="bg-[#ede734] text-black p-8 md:p-16 mb-20 flex flex-col md:flex-row items-center justify-between shadow-[4px_4px_0_0_#000] border-2 border-black">
            <div className="max-w-xl mb-10 md:mb-0">
              <h2 className="text-[40px] md:text-[56px] font-black uppercase tracking-tighter mb-4 leading-[0.9]">Join the club.<br />Get rewarded.</h2>
              <p className="text-[16px] md:text-[18px] font-medium mb-8 max-w-[400px]">Join adiClub to get free shipping, exclusive access to drops, and members-only rewards.</p>

              <button className="bg-black text-white px-6 py-4 font-bold uppercase text-[13px] tracking-widest flex items-center group/btn hover:text-gray-300 transition-colors w-full sm:w-auto justify-center">
                Join for Free <ArrowRight className="w-5 h-5 ml-3 group-hover/btn:translate-x-1 transition-transform" strokeWidth={2} />
              </button>
            </div>

            <div className="w-full sm:w-[300px] aspect-square bg-black flex items-center justify-center rounded-sm">
              <Star className="w-[150px] h-[150px] text-[#ede734] fill-current" />
            </div>
          </div>

        </div>
      </main>

      {/* ─── STARK BLACK FOOTER ─── */}
      <footer className="bg-black text-white pt-16 pb-8 border-t-[6px] border-[#ede734]">
        <div className="w-full max-w-[1920px] mx-auto px-6 lg:px-10">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-12 mb-16">

            <div className="lg:col-span-2 pr-0 lg:pr-16">
              <h3 className="text-[24px] font-black uppercase tracking-tighter mb-4 leading-none">Sign up for news & offers</h3>
              <div className="flex flex-col sm:flex-row mb-8 gap-2">
                <input type="email" placeholder="Your email address" className="bg-white border-none text-black px-4 py-3 w-full outline-none text-[15px] focus:ring-2 focus:ring-[#ede734]" />
                <button className="bg-gray-800 text-white px-8 py-3 font-bold uppercase text-[13px] tracking-widest hover:bg-[#ede734] hover:text-black transition-colors shrink-0">Sign Up</button>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 mt-10">
                <div className="flex items-start space-x-3">
                  <div className="bg-white p-2 rounded-full text-black"><Truck className="w-5 h-5 shrink-0" strokeWidth={2} /></div>
                  <div>
                    <h5 className="text-[14px] font-bold uppercase tracking-wide mb-1">Free Delivery</h5>
                    <p className="text-[12px] text-gray-400">For adiClub members</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-white p-2 rounded-full text-black"><RotateCcw className="w-5 h-5 shrink-0" strokeWidth={2} /></div>
                  <div>
                    <h5 className="text-[14px] font-bold uppercase tracking-wide mb-1">Free Returns</h5>
                    <p className="text-[12px] text-gray-400">Within 30 days</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-[18px] uppercase tracking-tighter mb-5">Products</h4>
              <ul className="flex flex-col space-y-3 text-[14px] text-[#c8cbcc] font-medium">
                <li><a href="#" className="hover:underline hover:text-white transition-colors">Shoes</a></li>
                <li><a href="#" className="hover:underline hover:text-white transition-colors">Clothing</a></li>
                <li><a href="#" className="hover:underline hover:text-white transition-colors">Accessories</a></li>
                <li><a href="#" className="hover:underline hover:text-white transition-colors">Gift Cards</a></li>
                <li><a href="#" className="hover:underline hover:text-white transition-colors">New Arrivals</a></li>
                <li><a href="#" className="hover:underline hover:text-white transition-colors">Best Sellers</a></li>
                <li><a href="#" className="hover:underline hover:text-white transition-colors">Release Dates</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-[18px] uppercase tracking-tighter mb-5">Sports</h4>
              <ul className="flex flex-col space-y-3 text-[14px] text-[#c8cbcc] font-medium">
                <li><a href="#" className="hover:underline hover:text-white transition-colors">Soccer</a></li>
                <li><a href="#" className="hover:underline hover:text-white transition-colors">Running</a></li>
                <li><a href="#" className="hover:underline hover:text-white transition-colors">Basketball</a></li>
                <li><a href="#" className="hover:underline hover:text-white transition-colors">Football</a></li>
                <li><a href="#" className="hover:underline hover:text-white transition-colors">Outdoor</a></li>
                <li><a href="#" className="hover:underline hover:text-white transition-colors">Golf</a></li>
                <li><a href="#" className="hover:underline hover:text-white transition-colors">Baseball</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-[18px] uppercase tracking-tighter mb-5">Support</h4>
              <ul className="flex flex-col space-y-3 text-[14px] text-[#c8cbcc] font-medium">
                <li><a href="#" className="hover:underline hover:text-white transition-colors">Help</a></li>
                <li><a href="#" className="hover:underline hover:text-white transition-colors">Returns & Exchanges</a></li>
                <li><a href="#" className="hover:underline hover:text-white transition-colors">Shipping</a></li>
                <li><a href="#" className="hover:underline hover:text-white transition-colors">Order Tracker</a></li>
                <li><a href="#" className="hover:underline hover:text-white transition-colors">Store Locator</a></li>
                <li><a href="#" className="hover:underline hover:text-white transition-colors">Size Charts</a></li>
                <li><a href="#" className="hover:underline hover:text-white transition-colors">adiClub</a></li>
              </ul>
            </div>

          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-[12px] text-[#c8cbcc]">
            <div className="flex flex-wrap gap-x-6 gap-y-3 justify-center mb-6 md:mb-0 px-4">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <span className="hidden md:block">|</span>
              <a href="#" className="hover:text-white transition-colors">Terms and Conditions</a>
              <span className="hidden md:block">|</span>
              <a href="#" className="hover:text-white transition-colors">Do Not Sell My Personal Information</a>
            </div>
            <div className="px-4 text-center md:text-right">
              <p className="font-bold tracking-widest text-[#767677] uppercase">© 2026 SportStripe America, Inc.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

