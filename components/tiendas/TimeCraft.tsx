'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { StoreData, Product } from '@/lib/types';
import { useCart } from '@/contexts/CartContext';
import { Search, MapPin, Menu, ChevronRight, Play, Heart, ShoppingBag, X } from 'lucide-react';
import { usePagination, ProductPagination } from '@/components/componentes-compartidos/templates/Pagination';

// TimeCraft SVG Crown Icon
const TimeCraftCrown = ({ className, color = "#006039" }: { className?: string, color?: string }) => (
  <svg viewBox="0 0 100 100" fill={color} xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M50 78.5C40 78.5 30 77 30 77V85H70V77C70 77 60 78.5 50 78.5Z" />
    <path d="M50 72C60 72 70 69 74.5 66L86 35L72 45L61 22L50 42L39 22L28 45L14 35L25.5 66C30 69 40 72 50 72Z" />
    <circle cx="88" cy="30" r="6" />
    <circle cx="70" cy="18" r="6" />
    <circle cx="50" cy="14" r="7" />
    <circle cx="30" cy="18" r="6" />
    <circle cx="12" cy="30" r="6" />
  </svg>
);

export default function TimeCraftTemplate({ data }: { data: StoreData }) {
  const brandGreen = "#006039";
  const brandGold = "#B4975A";
  
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
    <div className="min-h-full bg-white font-sans text-[#222222] selection:bg-[#006039] selection:text-white pb-0 overflow-x-hidden">

      {/* ─── HEADER ─── */}
      <header className="bg-white sticky top-0 z-50 border-b border-[#e5e5e5] h-[80px] md:h-[96px] transition-all">
        <div className="w-full max-w-[1800px] mx-auto px-6 md:px-12 h-full flex items-center justify-between">

          <div className="flex items-center">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 hover:bg-gray-100 rounded-md transition-colors mr-4"
            >
              {mobileMenuOpen ? <X className="w-7 h-7" strokeWidth={1.5} /> : <Menu className="w-7 h-7" strokeWidth={1.5} />}
            </button>
            <nav className="hidden lg:flex space-x-10 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#222]">
              <div className="group relative h-[96px] flex items-center cursor-pointer">
                <span className="group-hover:text-[#006039] transition-colors">Watches</span>
                <div className="absolute top-full left-0 w-[400px] bg-white border border-[#e5e5e5] shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all p-8 flex flex-col gap-4 z-50">
                  <span className="text-[10px] text-gray-400 tracking-[0.2em] uppercase font-bold mb-2">TimeCraft Watches</span>
                  <a href="#" className="font-serif text-[18px] text-[#222] hover:text-[#006039] transition-colors">Find your TimeCraft</a>
                  <a href="#" className="font-serif text-[18px] text-[#222] hover:text-[#006039] transition-colors">Configure your TimeCraft</a>
                  <a href="#" className="font-serif text-[18px] text-[#222] hover:text-[#006039] transition-colors">Men's watches</a>
                  <a href="#" className="font-serif text-[18px] text-[#222] hover:text-[#006039] transition-colors">Women's watches</a>
                </div>
              </div>
              <div className="group relative h-[96px] flex items-center cursor-pointer">
                <span className="group-hover:text-[#006039] transition-colors">World of TimeCraft</span>
              </div>
              <div className="group relative h-[96px] flex items-center cursor-pointer">
                <span className="group-hover:text-[#006039] transition-colors">Buying a TimeCraft</span>
              </div>
            </nav>
          </div>

          <div className="flex items-center justify-center cursor-pointer shrink-0 absolute left-1/2 -translate-x-1/2">
            <div className="flex flex-col items-center">
              <TimeCraftCrown className="w-10 h-10 md:w-12 md:h-12 mb-1" color="#006039" />
              <span className="font-serif text-[24px] md:text-[28px] tracking-[0.14em] uppercase leading-none text-[#006039] ml-1">
                TimeCraft
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-6 md:space-x-10 text-[#222]">
            <div className="hidden md:flex items-center space-x-3 cursor-pointer group">
              <MapPin className="w-5 h-5 group-hover:text-[#006039] transition-colors" strokeWidth={1.5} />
              <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] group-hover:text-[#006039] transition-colors">Store Locator</span>
            </div>
            <div className="flex items-center space-x-3 cursor-pointer group">
              <Search className="w-5 h-5 md:w-6 md:h-6 group-hover:text-[#006039] transition-colors" strokeWidth={1.5} />
            </div>
            <div 
              onClick={() => toggleFavorite('header')}
              className="relative cursor-pointer group hidden sm:block"
            >
              <Heart className={`w-5 h-5 group-hover:text-[#006039] transition-colors ${favorites.length > 0 ? 'fill-red-500 text-red-500' : ''}`} strokeWidth={1.5} />
              {favorites.length > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[9px] font-black px-1.5 rounded-full">{favorites.length}</span>
              )}
            </div>
            <div 
              onClick={() => setIsCartOpen(true)}
              className="relative cursor-pointer group"
            >
              <ShoppingBag className="w-5 h-5 md:w-6 md:h-6 group-hover:text-[#006039] transition-colors" strokeWidth={1.5} />
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[#006039] text-white text-[9px] font-black px-1.5 rounded-full">{itemCount}</span>
              )}
            </div>
          </div>

        </div>
      </header>

      <main className="w-full">

        {/* ─── HERO BANNER ─── */}
        <section className="relative w-full h-[600px] lg:h-[850px] flex justify-center items-center overflow-hidden bg-[#111]">
          <Image
            src={data.bannerImage}
            alt="TimeCraft Hero"
            fill
            className="object-cover object-center opacity-90"
            priority
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />

          <div className="absolute bottom-16 md:bottom-24 left-6 md:left-16 text-white max-w-2xl px-4 md:px-0">
            <h1 className="text-[40px] md:text-[64px] font-serif mb-4 leading-[1.1] drop-shadow-2xl text-[#fdfdfd]">
              {data.name}
            </h1>
            <p className="text-[16px] md:text-[20px] font-sans font-medium tracking-wide mb-10 drop-shadow-xl text-gray-200 max-w-xl">
              {data.description || 'Discover the most prestigious collection of highly precise and reliable luxury timepieces.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-[#222] px-10 py-4 font-sans font-bold uppercase text-[11px] tracking-[0.2em] hover:bg-[#e0e0e0] transition-colors text-center w-full sm:w-auto">
                Discover the collection
              </button>
              <button className="bg-transparent border border-white text-white px-10 py-4 font-sans font-bold uppercase text-[11px] tracking-[0.2em] hover:bg-white hover:text-[#222] transition-colors text-center w-full sm:w-auto flex justify-center items-center">
                Play Video <Play className="w-3 h-3 ml-2 fill-current" />
              </button>
            </div>
          </div>
        </section>

        {/* ─── BREADCRUMB / SUBNAV ─── */}
        <div className="w-full border-b border-[#e5e5e5] bg-[#fcfcfc] py-4 px-6 md:px-12">
          <div className="flex items-center text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-gray-500 space-x-4">
            <a href="#" className="hover:text-[#006039] transition-colors">TimeCraft</a>
            <ChevronRight className="w-3 h-3" />
            <a href="#" className="hover:text-[#006039] transition-colors">Watches</a>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#222]">{data.name}</span>
          </div>
        </div>

        {/* ─── INTRO STORY ─── */}
        <section className="max-w-[1000px] mx-auto px-6 py-24 md:py-32 text-center flex flex-col items-center">
          <TimeCraftCrown className="w-12 h-12 mb-8 opacity-40" color="#222" />
          <h2 className="text-[28px] md:text-[40px] font-serif text-[#222] mb-8 leading-tight">
            An Icon of Excellence
          </h2>
          <p className="text-[16px] md:text-[20px] font-sans text-gray-600 leading-relaxed max-w-3xl">
            TimeCraft watches are crafted from the finest raw materials and assembled with scrupulous attention to detail. Every component is designed, developed and produced in-house to the most exacting standards.
          </p>
        </section>

        {/* ─── PRODUCT COLLECTION ─── */}
        <section className="bg-[#f8f8f8] py-24 md:py-32">
          <div className="max-w-[1600px] mx-auto px-6 md:px-12">
            <div className="flex justify-between items-end mb-16 border-b border-[#e0e0e0] pb-6">
              <div>
                <span className="text-[10px] md:text-[12px] font-sans font-bold uppercase tracking-[0.2em] text-[#B4975A] mb-2 block">
                  The Collection
                </span>
                <h2 className="text-[32px] md:text-[48px] font-serif text-[#222] leading-none">
                  Unparalleled Prestige
                </h2>
              </div>
              <a href="#" className="hidden md:flex font-sans font-bold text-[11px] uppercase tracking-[0.2em] text-[#006039] hover:opacity-70 transition-opacity items-center">
                View all watches <ChevronRight className="w-4 h-4 ml-1" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-[#e0e0e0] bg-white">
              {paginatedItems.map((product: any, idx: number) => (
                <div key={product.id || idx} data-product-id={product.id} className="group cursor-pointer flex flex-col items-center text-center border-r border-b border-[#e0e0e0] hover:shadow-[0_0_30px_rgba(0,0,0,0.08)] relative z-10 hover:z-20 transition-all bg-white p-12 lg:p-16">

                  <div className="text-[10px] font-sans font-medium uppercase tracking-[0.15em] text-gray-400 mb-2">
                    {product.category || 'Oyster Perpetual'}
                  </div>
                  <h3 className="text-[24px] font-serif text-[#222] mb-8 leading-none">
                    {product.title}
                  </h3>

                  <div className="relative aspect-[3/4] w-full max-w-[220px] mb-12">
                    <Image
                      src={product.imageUrl}
                      alt={product.title}
                      fill
                      className="object-contain drop-shadow-2xl group-hover:scale-[1.03] transition-transform duration-[1500ms] ease-out"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="flex flex-col items-center mt-auto">
                    <span className="font-sans font-bold text-[12px] tracking-wider text-[#222] mb-6">
                      ${product.price}
                    </span>
                    <button 
                      onClick={(e) => handleAddToCart(product, e)}
                      className="text-[#006039] font-sans font-bold text-[11px] uppercase tracking-[0.2em] border border-[#006039] px-8 py-3 hover:bg-[#006039] hover:text-white transition-all w-full max-w-[200px]"
                    >
                      Discover more
                    </button>
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

            <div className="mt-12 flex justify-center md:hidden">
              <a href="#" className="font-sans font-bold text-[11px] uppercase tracking-[0.2em] text-[#006039] border-b border-[#006039] pb-1">
                View all watches
              </a>
            </div>
          </div>
        </section>

        {/* ─── THE ART OF WATCHMAKING (SPLIT SECTION) ─── */}
        <section className="bg-white">

          {/* Heritage Timeline */}
          <div className="max-w-[1200px] mx-auto px-6 py-24 md:py-32">
            <div className="text-center mb-20">
              <span className="text-[10px] md:text-[12px] font-sans font-bold uppercase tracking-[0.2em] text-[#B4975A] mb-4 block">Heritage</span>
              <h2 className="text-[36px] md:text-[48px] font-serif text-[#222] leading-tight">A Legacy of Innovation</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              {[
                { year: '1905', title: 'The Beginning', desc: 'TimeCraft is founded with a vision to create the most precise timepieces in the world.' },
                { year: '1926', title: 'First Waterproof', desc: 'The Oyster case revolutionizes watchmaking with the first truly waterproof wristwatch.' },
                { year: '1953', title: 'Deep Sea', desc: 'The Submariner is introduced, becoming the definitive diver\'s watch for generations.' },
                { year: '2026', title: 'New Era', desc: 'Continuing to push boundaries with cutting-edge materials and perpetual movements.' },
              ].map((item, i) => (
                <div key={i} className="text-center group cursor-pointer">
                  <div className="text-[48px] font-serif text-[#B4975A] mb-4 group-hover:text-[#006039] transition-colors">{item.year}</div>
                  <h3 className="text-[16px] font-sans font-bold uppercase tracking-[0.15em] text-[#222] mb-3">{item.title}</h3>
                  <p className="text-[14px] font-sans text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Craftsmanship Materials */}
          <div className="bg-[#f8f8f8] py-24 md:py-32">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
              <div className="text-center mb-16">
                <span className="text-[10px] md:text-[12px] font-sans font-bold uppercase tracking-[0.2em] text-[#B4975A] mb-4 block">Materials</span>
                <h2 className="text-[36px] md:text-[48px] font-serif text-[#222] leading-tight">Exceptional Materials</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[#e0e0e0]">
                {[
                  { name: 'Oystersteel', desc: 'A superalloy belonging to the 904L steel family, offering exceptional resistance to corrosion.', img: 'https://picsum.photos/600/400?random=925' },
                  { name: 'Everose Gold', desc: 'An exclusive 18ct pink gold alloy cast in our own foundry, with a unique warm hue.', img: 'https://picsum.photos/600/400?random=926' },
                  { name: 'Cerachrom Bezel', desc: 'Virtually scratchproof ceramic bezel with numerals and graduations molded directly.', img: 'https://picsum.photos/600/400?random=927' },
                ].map((mat, i) => (
                  <div key={i} className="bg-white border-r border-[#e0e0e0] last:border-r-0 group cursor-pointer">
                    <div className="relative h-[250px] overflow-hidden">
                      <Image src={mat.img} alt={mat.name} fill className="object-cover group-hover:scale-105 transition-transform duration-[2000ms]" />
                    </div>
                    <div className="p-10 text-center">
                      <h3 className="text-[22px] font-serif text-[#222] mb-4">{mat.name}</h3>
                      <p className="text-[14px] font-sans text-gray-500 leading-relaxed">{mat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Service & Care */}
          <div className="max-w-[1200px] mx-auto px-6 py-24 md:py-32">
            <div className="text-center mb-16">
              <span className="text-[10px] md:text-[12px] font-sans font-bold uppercase tracking-[0.2em] text-[#B4975A] mb-4 block">Service</span>
              <h2 className="text-[36px] md:text-[48px] font-serif text-[#222] leading-tight mb-6">Servicing Your TimeCraft</h2>
              <p className="text-[16px] font-sans text-gray-500 max-w-2xl mx-auto leading-relaxed">
                To preserve the quality and reliability of your TimeCraft, we recommend having it serviced at regular intervals by an Official TimeCraft Service Centre.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'Professional Service', desc: 'Complete movement overhaul, case and bracelet refinishing, and water-resistance testing.', icon: '⚙️' },
                { title: 'Authenticity Check', desc: 'Every component verified against our database to ensure 100% genuine TimeCraft parts.', icon: '🔍' },
                { title: '5-Year Warranty', desc: 'All serviced watches come with a renewed international 5-year service guarantee.', icon: '🛡️' },
              ].map((service, i) => (
                <div key={i} className="border border-[#e0e0e0] p-10 text-center hover:border-[#006039] transition-colors group cursor-pointer">
                  <div className="text-4xl mb-6">{service.icon}</div>
                  <h3 className="text-[18px] font-serif text-[#222] mb-4">{service.title}</h3>
                  <p className="text-[14px] font-sans text-gray-500 leading-relaxed">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter / Stay Connected */}
          <div className="bg-[#006039] py-20">
            <div className="max-w-[800px] mx-auto px-6 text-center text-white">
              <TimeCraftCrown className="w-10 h-10 mx-auto mb-6 opacity-60" color="white" />
              <h2 className="text-[32px] md:text-[40px] font-serif mb-6">Stay Informed</h2>
              <p className="text-[16px] font-sans text-white/70 mb-10 max-w-lg mx-auto leading-relaxed">
                Receive the latest news about TimeCraft watches, events, and the world of fine watchmaking.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 bg-white/10 border border-white/20 px-6 py-4 text-white placeholder-white/40 font-sans text-[14px] outline-none focus:border-white transition-colors"
                />
                <button className="bg-white text-[#006039] px-8 py-4 font-sans font-bold uppercase text-[11px] tracking-[0.2em] hover:bg-[#B4975A] hover:text-white transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-1/2 relative h-[500px] lg:h-auto min-h-[600px] overflow-hidden group">
              <Image src="https://picsum.photos/1200/1200?random=920" alt="TimeCraft Watchmaking" fill className="object-cover group-hover:scale-105 transition-transform duration-[4000ms]" />
            </div>
            <div className="w-full lg:w-1/2 p-12 md:p-24 lg:p-32 flex flex-col justify-center bg-[#fdfdfd]">
              <span className="text-[10px] md:text-[12px] font-sans font-bold uppercase tracking-[0.2em] text-[#B4975A] mb-4">
                Watchmaking
              </span>
              <h2 className="text-[36px] md:text-[50px] font-serif text-[#222] leading-tight mb-8">
                The Art of Perpetual Excellence
              </h2>
              <p className="text-[16px] md:text-[18px] font-sans text-gray-600 leading-relaxed mb-12 max-w-lg">
                The perpetual quest for excellence is the driving force behind TimeCraft's history. From the creation of the first waterproof wristwatch to the development of our self-winding Perpetual rotor.
              </p>
              <a href="#" className="text-[#222] font-sans font-bold text-[11px] uppercase tracking-[0.2em] flex items-center hover:text-[#006039] transition-colors w-max">
                Explore TimeCraft Watchmaking <ChevronRight className="w-4 h-4 ml-1" />
              </a>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row-reverse">
            <div className="w-full lg:w-1/2 relative h-[500px] lg:h-auto min-h-[600px] overflow-hidden group">
              <Image src="https://picsum.photos/1200/1200?random=921" alt="TimeCraft Retailer" fill className="object-cover group-hover:scale-105 transition-transform duration-[4000ms]" />
            </div>
            <div className="w-full lg:w-1/2 p-12 md:p-24 lg:p-32 flex flex-col justify-center bg-[#111] text-white">
              <span className="text-[10px] md:text-[12px] font-sans font-bold uppercase tracking-[0.2em] text-[#B4975A] mb-4">
                Store Locator
              </span>
              <h2 className="text-[36px] md:text-[50px] font-serif text-white leading-tight mb-8">
                Find Your TimeCraft
              </h2>
              <p className="text-[16px] md:text-[18px] font-sans text-gray-400 leading-relaxed mb-12 max-w-lg">
                Only official TimeCraft retailers are allowed to sell and maintain a TimeCraft watch. With the necessary skills, technical know-how and special equipment, they guarantee the authenticity of each and every part of your TimeCraft.
              </p>
              <button className="bg-transparent border border-white text-white px-10 py-4 font-sans font-bold uppercase text-[11px] tracking-[0.2em] hover:bg-white hover:text-[#111] transition-colors w-max">
                Find an Official Retailer
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* ─── FOOTER ─── */}
      <footer className="bg-[#111111] text-white pt-24 pb-12">
        <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12">

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-[#333] pb-16 mb-16">
            <div className="flex items-center mb-8 md:mb-0">
              <TimeCraftCrown className="w-8 h-8 md:w-10 md:h-10 text-white fill-current opacity-90" />
              <span className="font-serif text-[28px] md:text-[36px] tracking-[0.15em] uppercase text-white ml-2 opacity-90">
                TimeCraft
              </span>
            </div>
            <button className="bg-transparent border border-[#555] text-white px-8 py-3 font-sans font-bold uppercase text-[10px] tracking-[0.2em] hover:bg-white hover:text-[#111] transition-colors">
              Contact Us
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-24">

            <div className="flex flex-col space-y-6">
              <h4 className="font-serif text-[18px] text-[#B4975A] italic mb-2">TimeCraft Watches</h4>
              <div className="flex flex-col space-y-4 text-[11px] font-sans font-bold uppercase tracking-[0.15em] text-gray-400">
                <a href="#" className="hover:text-white transition-colors">TimeCraft Watches</a>
                <a href="#" className="hover:text-white transition-colors">New Watches 2026</a>
                <a href="#" className="hover:text-white transition-colors">Find Your TimeCraft</a>
                <a href="#" className="hover:text-white transition-colors">Configure Your TimeCraft</a>
                <a href="#" className="hover:text-white transition-colors">Men's Watches</a>
                <a href="#" className="hover:text-white transition-colors">Women's Watches</a>
              </div>
            </div>

            <div className="flex flex-col space-y-6">
              <h4 className="font-serif text-[18px] text-[#B4975A] italic mb-2">World of TimeCraft</h4>
              <div className="flex flex-col space-y-4 text-[11px] font-sans font-bold uppercase tracking-[0.15em] text-gray-400">
                <a href="#" className="hover:text-white transition-colors">Sports, Arts and Exploration</a>
                <a href="#" className="hover:text-white transition-colors">Our Environmental Vision</a>
                <a href="#" className="hover:text-white transition-colors">Watchmaking</a>
                <a href="#" className="hover:text-white transition-colors">The TimeCraft Experience</a>
                <a href="#" className="hover:text-white transition-colors">TimeCraft and Cinema</a>
              </div>
            </div>

            <div className="flex flex-col space-y-6">
              <h4 className="font-serif text-[18px] text-[#B4975A] italic mb-2">Services</h4>
              <div className="flex flex-col space-y-4 text-[11px] font-sans font-bold uppercase tracking-[0.15em] text-gray-400">
                <a href="#" className="hover:text-white transition-colors">Find a Retailer</a>
                <a href="#" className="hover:text-white transition-colors">Find a Service Center</a>
                <a href="#" className="hover:text-white transition-colors">Care and Servicing</a>
                <a href="#" className="hover:text-white transition-colors">Your Selection</a>
                <a href="#" className="hover:text-white transition-colors">Frequently Asked Questions</a>
              </div>
            </div>

            <div className="flex flex-col space-y-6">
              <h4 className="font-serif text-[18px] text-[#B4975A] italic mb-2">Official Channels</h4>
              <div className="flex flex-col space-y-4 text-[11px] font-sans font-bold uppercase tracking-[0.15em] text-gray-400">
                <a href="#" className="hover:text-white transition-colors">Instagram</a>
                <a href="#" className="hover:text-white transition-colors">Facebook</a>
                <a href="#" className="hover:text-white transition-colors">Twitter</a>
                <a href="#" className="hover:text-white transition-colors">YouTube</a>
                <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                <a href="#" className="hover:text-white transition-colors">Pinterest</a>
              </div>
            </div>

          </div>

          <div className="pt-8 border-t border-[#333] flex flex-col md:flex-row items-center justify-between text-[10px] font-sans font-bold uppercase tracking-[0.15em] text-gray-500 space-y-4 md:space-y-0">
            <div className="flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-4">
              <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
              <a href="#" className="hover:text-white transition-colors">Privacy Notice</a>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
              <a href="#" className="hover:text-white transition-colors">Accessibility</a>
            </div>
            <span>© 2026 TimeCraft SA. ALL RIGHTS RESERVED.</span>
          </div>

        </div>
      </footer>
    </div>
  );
}

