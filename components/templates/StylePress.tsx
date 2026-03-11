import React from 'react';
import Image from 'next/image';
import { StoreData } from '@/lib/types';
import { Search, ShoppingBag, Heart, User, Menu, ChevronRight, Facebook, Instagram, Twitter, Youtube, Smartphone } from 'lucide-react';

export default function StylePressTemplate({ data }: { data: StoreData }) {
  return (
    <div className="min-h-full bg-white font-sans text-[#2d2d2d] overflow-x-hidden" style={{ fontFamily: "'futura-pt', Tahoma, Geneva, Verdana, Arial, sans-serif" }}>

      {/* ─── MARKETPLACE / HELP BAR ─── */}
      <div className="hidden lg:flex justify-end items-center bg-[#f5f5f5] h-[30px] px-8 text-[12px] text-[#666] space-x-6">
        <a href="#" className="hover:text-[#0088cc] border-r border-[#ddd] pr-6">Marketplace</a>
        <a href="#" className="hover:text-[#0088cc] border-r border-[#ddd] pr-6">Help & FAQs</a>
        <div className="flex items-center space-x-2 cursor-pointer hover:text-[#0088cc]">
          <span className="text-[14px]">🇺🇸</span>
          <span className="font-bold">US</span>
        </div>
      </div>

      {/* ─── MAIN HEADER (Black) ─── */}
      <header className="sticky top-0 z-50 w-full transition-transform">
        <div className="bg-[#2d2d2d] w-full h-[60px] flex items-center justify-between px-4 lg:px-8">

          {/* Mobile Menu & Logo */}
          <div className="flex items-center h-full">
            <button className="lg:hidden text-white mr-4">
              <Menu className="w-7 h-7" strokeWidth={1.5} />
            </button>

            <div className="font-black text-[32px] md:text-[40px] tracking-tighter uppercase text-white cursor-pointer mr-6 lg:mr-10 leading-none">
              {data.logoText !== 'StylePress' ? data.logoText : 'StylePress'}
            </div>

            {/* Gender Switcher (Desktop) */}
            <div className="hidden lg:flex h-full border-l border-[#525050]">
              <a href="#" className="h-full px-8 flex items-center font-bold text-[14px] text-white hover:bg-[#525050] transition-colors uppercase tracking-widest border-r border-[#525050]">
                Women
              </a>
              <a href="#" className="h-full px-8 flex items-center font-bold text-[14px] text-white bg-[#525050] transition-colors uppercase tracking-widest">
                Men
              </a>
            </div>
          </div>

          {/* Search Bar (Desktop) */}
          <div className="hidden lg:flex flex-1 max-w-[800px] mx-8 h-[40px] relative">
            <input
              type="text"
              placeholder="Search for items and brands"
              className="w-full h-full rounded-full pl-5 pr-12 text-[14px] outline-none border-2 border-transparent focus:border-[#0088cc] transition-colors text-black"
            />
            <button className="absolute right-0 top-0 h-full w-[50px] flex items-center justify-center text-[#2d2d2d]">
              <Search className="w-5 h-5" strokeWidth={2} />
            </button>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-5 lg:space-x-7 text-white h-full">
            <button className="lg:hidden">
              <Search className="w-6 h-6" strokeWidth={1.5} />
            </button>
            <button className="hidden sm:block hover:bg-[#525050] p-2 rounded-full transition-colors tooltip-group">
              <User className="w-[22px] h-[22px]" strokeWidth={1.5} />
            </button>
            <button className="hover:bg-[#525050] p-2 rounded-full transition-colors relative">
              <Heart className="w-[22px] h-[22px]" strokeWidth={1.5} />
            </button>
            <button className="hover:bg-[#525050] p-2 rounded-full transition-colors relative">
              <ShoppingBag className="w-[22px] h-[22px]" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* ─── SUB-NAVIGATION (Gray) ─── */}
        <div className="hidden lg:flex bg-[#525050] w-full h-[50px] justify-center items-center px-4">
          <nav className="flex items-center h-full max-w-[1200px] overflow-hidden">
            {[
              { label: 'Sale', color: '#d01345' },
              { label: 'New in', color: 'white' },
              { label: 'Clothing', color: 'white' },
              { label: 'Trending', color: 'white' },
              { label: 'Dresses', color: 'white' },
              { label: 'Shoes', color: 'white' },
              { label: 'Accessories', color: 'white' },
              { label: 'Face + Body', color: 'white' },
              { label: 'Brands', color: 'white' },
              { label: 'Sportswear', color: 'white' },
              { label: 'Topshop', color: 'white' },
            ].map((item, i) => (
              <a
                key={i}
                href="#"
                className={`h-full flex items-center px-4 font-bold text-[13px] hover:bg-[#dddddd] hover:text-[#2d2d2d] transition-colors whitespace-nowrap`}
                style={{ color: item.color }}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        {/* ─── PROMO BANNER (Pink) ─── */}
        <div className="w-full bg-[#ffb3c6] text-[#2d2d2d] flex flex-col md:flex-row items-center justify-center py-2 md:py-3 px-4 text-center border-b-[2px] border-black">
          <div className="font-black text-[14px] md:text-[16px] tracking-wide uppercase flex flex-col md:flex-row items-center gap-1 md:gap-3">
            <span>UP TO -50% ALMOST EVERYTHING!</span>
            <span className="text-[12px] md:text-[14px] font-bold">Use code: <span className="bg-white px-2 py-0.5 border border-dashed border-black ml-1">StylePressNEW</span></span>
          </div>
        </div>
      </header>

      <main className="w-full max-w-[1440px] mx-auto pb-16">

        {/* ─── SPLIT HERO SECTION ─── */}
        <div className="w-full px-4 md:px-6 lg:px-8 mt-6">
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full h-auto">

            {/* Left Hero (Women) */}
            <div className="relative w-full md:w-1/2 aspect-[4/5] md:aspect-auto md:h-[650px] group cursor-pointer overflow-hidden border-2 border-transparent hover:border-black transition-colors">
              <Image src={data.bannerImage} alt="Women" fill className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-700" referrerPolicy="no-referrer" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 mt-32 md:mt-48">
                <div className="bg-white/95 backdrop-blur-sm p-6 md:p-8 max-w-[320px] shadow-2xl transform transition-transform group-hover:-translate-y-2">
                  <h2 className="text-[28px] md:text-[34px] font-black uppercase tracking-tight mb-2 leading-none text-[#2d2d2d]">{data.name}</h2>
                  <p className="text-[14px] font-bold text-[#666] mb-6 tracking-wide">{data.description || "The latest drop is here."}</p>
                  <button className="w-full bg-[#2d2d2d] text-white py-3 font-bold uppercase text-[13px] tracking-widest hover:bg-black transition-colors border-2 border-black">
                    Shop Women
                  </button>
                </div>
              </div>
            </div>

            {/* Right Hero (Men) */}
            <div className="relative w-full md:w-1/2 aspect-[4/5] md:aspect-auto md:h-[650px] group cursor-pointer overflow-hidden border-2 border-transparent hover:border-black transition-colors">
              <Image src="https://picsum.photos/1000/1200?random=150" alt="Men" fill className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-700" referrerPolicy="no-referrer" />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />

              <div className="absolute bottom-8 md:bottom-12 left-0 right-0 flex flex-col justify-center items-center px-4">
                <h2 className="text-[36px] md:text-[50px] font-black uppercase text-white mb-6 text-center leading-none tracking-tight drop-shadow-lg">
                  THE MEN'S<br />EDIT
                </h2>
                <div className="flex gap-4">
                  <button className="bg-white text-black px-8 py-3.5 font-bold uppercase text-[13px] tracking-widest hover:bg-[#eee] transition-colors shadow-lg">
                    Shop Men
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ─── DENSE CIRCULAR NAVIGATION (Iconic StylePress mobile/desktop pattern) ─── */}
        <div className="w-full px-4 md:px-8 mt-12 mb-16 relative">
          <div className="flex overflow-x-auto gap-4 md:gap-8 pb-4 snap-x hide-scrollbar justify-start lg:justify-center">
            {[
              { name: 'Sale', img: 'https://picsum.photos/150/150?random=160', color: 'border-[#d01345]' },
              { name: 'New In', img: 'https://picsum.photos/150/150?random=161', color: 'border-black' },
              { name: 'Dresses', img: 'https://picsum.photos/150/150?random=162', color: 'border-transparent' },
              { name: 'Tops', img: 'https://picsum.photos/150/150?random=163', color: 'border-transparent' },
              { name: 'Shoes', img: 'https://picsum.photos/150/150?random=164', color: 'border-transparent' },
              { name: 'Swimwear', img: 'https://picsum.photos/150/150?random=165', color: 'border-transparent' },
              { name: 'Activewear', img: 'https://picsum.photos/150/150?random=166', color: 'border-transparent' },
              { name: 'Accessories', img: 'https://picsum.photos/150/150?random=167', color: 'border-transparent' },
            ].map((cat, i) => (
              <div key={i} className="group cursor-pointer flex flex-col items-center shrink-0 snap-start">
                <div className={`w-[80px] h-[80px] md:w-[100px] md:h-[100px] rounded-full overflow-hidden mb-3 border-[3px] p-0.5 ${cat.color} group-hover:scale-105 transition-transform`}>
                  <div className="w-full h-full rounded-full overflow-hidden relative">
                    <Image src={cat.img} alt={cat.name} fill className="object-cover" />
                  </div>
                </div>
                <span className="font-bold text-[12px] md:text-[14px] tracking-wide text-center">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ─── PROMO STRIP ─── */}
        <div className="w-full px-4 md:px-8 mb-16">
          <div className="bg-[#9cf0e0] w-full p-6 md:p-8 flex flex-col md:flex-row items-center justify-between border-[3px] border-black shadow-[4px_4px_0_0_#000]">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <h3 className="text-[20px] md:text-[28px] font-black uppercase tracking-tight leading-none mb-1">STUDENTS GET 10% OFF</h3>
              <p className="text-[14px] md:text-[16px] font-medium">Get your discount code now.</p>
            </div>
            <button className="bg-white border-[2px] border-black px-6 py-2.5 font-bold text-[13px] uppercase tracking-widest hover:bg-black hover:text-white transition-colors">
              Get Code
            </button>
          </div>
        </div>

        {/* ─── PRODUCT GRID (High-density, hover reveals) ─── */}
        <div className="w-full px-4 md:px-8 mb-24">
          <div className="flex items-center justify-center mb-10 relative">
            <h3 className="text-[24px] md:text-[32px] font-black uppercase tracking-tighter bg-white px-6 z-10">Trending Now</h3>
            <div className="absolute left-0 right-0 h-[2px] bg-gray-200 top-1/2 -z-0"></div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-10 md:gap-x-5 md:gap-y-14">
            {data.products.map(product => {
              const isSale = product.originalPrice ? true : false;
              return (
                <div key={product.id} data-product-id={product.id} className="group cursor-pointer flex flex-col relative">
                  <div className="relative aspect-[3/4] mb-3 overflow-hidden bg-[#f8f8f8]">
                    <Image
                      src={product.imageUrl}
                      alt={product.title}
                      fill
                      className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    {/* StylePress style save bubble */}
                    <button className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-sm hover:bg-white hover:scale-110 transition-all z-10">
                      <Heart className="w-[18px] h-[18px] text-[#2d2d2d]" strokeWidth={2} />
                    </button>
                    {isSale && (
                      <div className="absolute bottom-3 left-3 bg-white px-2 py-1 text-[#d01345] text-[11px] font-bold tracking-widest uppercase border border-[#d01345]">
                        Sale
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col">
                    {/* StylePress prices are bold, red if sale */}
                    <div className="flex items-center space-x-2 mb-1.5">
                      <span className={`font-bold text-[14px] md:text-[16px] ${isSale ? 'text-[#d01345]' : 'text-[#2d2d2d]'}`}>
                        ${product.price}
                      </span>
                      {isSale && <span className="text-[12px] md:text-[13px] text-gray-500 line-through">${product.originalPrice}</span>}
                    </div>
                    <h4 className="text-[13px] text-[#666] line-clamp-2 leading-snug group-hover:text-black hover:underline transition-colors pr-2">
                      {product.title}
                    </h4>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="flex justify-center mt-12 text-center w-full">
            <button className="border-[2px] border-[#2d2d2d] bg-white text-[#2d2d2d] px-10 py-3.5 font-bold uppercase text-[13px] tracking-widest hover:bg-[#2d2d2d] hover:text-white transition-colors w-full sm:w-auto">
              View All
            </button>
          </div>
        </div>

        {/* ─── TWO COLUMN EDITORIAL ─── */}
        <div className="w-full px-4 md:px-8 mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Left Banner */}
            <div className="relative aspect-square md:aspect-[4/3] group overflow-hidden cursor-pointer">
              <Image src="https://picsum.photos/800/600?random=170" alt="New Balance" fill className="object-cover transition-transform duration-1000 group-hover:scale-[1.03]" />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center text-center text-white px-4">
                <h3 className="text-[24px] md:text-[32px] font-black uppercase tracking-tight mb-2">NEW BALANCE</h3>
                <p className="text-[14px] font-medium mb-4">The dad shoe, but make it fashion.</p>
                <button className="bg-white text-black px-6 py-2.5 font-bold uppercase text-[12px] tracking-widest hover:bg-gray-200 transition-colors">Shop the brand</button>
              </div>
            </div>
            {/* Right Banner */}
            <div className="relative aspect-square md:aspect-[4/3] group overflow-hidden cursor-pointer">
              <Image src="https://picsum.photos/800/600?random=171" alt="Dresses" fill className="object-cover transition-transform duration-1000 group-hover:scale-[1.03]" />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center text-center text-white px-4">
                <h3 className="text-[24px] md:text-[32px] font-black uppercase tracking-tight mb-2">DRESS TO IMPRESS</h3>
                <p className="text-[14px] font-medium mb-4">Wedding guest? We got you.</p>
                <button className="bg-white text-black px-6 py-2.5 font-bold uppercase text-[12px] tracking-widest hover:bg-gray-200 transition-colors">Shop Dresses</button>
              </div>
            </div>
          </div>
        </div>

        {/* ─── APP DOWNLOAD PROMO ─── */}
        <div className="w-full px-4 md:px-8 mb-12">
          <div className="bg-[#eeeeee] rounded-[32px] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between overflow-hidden relative">

            <div className="max-w-md z-10 text-center md:text-left mb-8 md:mb-0">
              <h3 className="text-[28px] md:text-[40px] font-black uppercase tracking-tighter mb-4 leading-none">THE StylePress APP</h3>
              <p className="text-[15px] md:text-[18px] text-[#666] mb-8 font-medium">Find everything you need, save your favorites to boards, and use Visual Search to find items from photos.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button className="bg-black text-white px-8 py-3.5 font-bold uppercase text-[13px] tracking-widest hover:bg-gray-800 transition-colors flex items-center justify-center rounded-full">
                  <Smartphone className="w-5 h-5 mr-3" /> Download App
                </button>
              </div>
            </div>

            <div className="w-[200px] h-[200px] md:w-[300px] md:h-[300px] relative z-10 hidden sm:block">
              {/* Decorative Phone Mockup Placeholder */}
              <div className="absolute right-0 bottom-[-50px] w-full h-[120%] bg-[#2d2d2d] rounded-[36px] border-8 border-white shadow-2xl rotate-12 overflow-hidden flex items-start justify-center pt-8">
                <div className="w-1/2 h-2 bg-[#444] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

      </main>

      {/* ─── FOOTER ─── */}
      <footer className="bg-[#eeeeee] pt-12 text-[#666]">
        {/* Social Links Bar */}
        <div className="flex justify-center border-b border-[#dddddd] pb-10 gap-x-12 px-4">
          <a href="#" className="w-10 h-10 flex items-center justify-center hover:text-blue-600 transition-colors"><Facebook className="w-7 h-7" strokeWidth={1.5} /></a>
          <a href="#" className="w-10 h-10 flex items-center justify-center hover:text-pink-600 transition-colors"><Instagram className="w-7 h-7" strokeWidth={1.5} /></a>
          <a href="#" className="w-10 h-10 flex items-center justify-center hover:text-black transition-colors">
            {/* Snapchat placeholder icon */}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
              <path d="M11.9 2C8.3 2 6.5 4.8 6.5 7.1c0 1.2.6 1.9 1.4 2.1l.6.2c-.3 1.3-.9 2-1.7 2.1-.2 0-.4 0-.6.1-.5.1-.9.4-.9.9 0 .4.2.7.6.9 1 .6 2.4.9 3.5.9h5.2c1.1 0 2.5-.3 3.5-.9.4-.2.6-.5.6-.9 0-.5-.4-.8-.9-.9-.2-.1-.4-.1-.6-.1-.8-.1-1.4-.8-1.7-2.1l.6-.2c.8-.2 1.4-.9 1.4-2.1 0-2.3-1.8-5.1-5.4-5.1z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        <div className="w-full max-w-[1240px] mx-auto px-6 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-8 text-[13px]">

            <div className="flex flex-col space-y-3">
              <h4 className="font-bold uppercase tracking-widest mb-3 text-[#777]">Help & Information</h4>
              <a href="#" className="hover:text-black hover:underline transition-colors block">Help</a>
              <a href="#" className="hover:text-black hover:underline transition-colors block">Track order</a>
              <a href="#" className="hover:text-black hover:underline transition-colors block">Delivery & returns</a>
              <a href="#" className="hover:text-black hover:underline transition-colors block">Sitemap</a>
            </div>

            <div className="flex flex-col space-y-3">
              <h4 className="font-bold uppercase tracking-widest mb-3 text-[#777]">About StylePress</h4>
              <a href="#" className="hover:text-black hover:underline transition-colors block">About us</a>
              <a href="#" className="hover:text-black hover:underline transition-colors block">Careers at StylePress</a>
              <a href="#" className="hover:text-black hover:underline transition-colors block">Corporate responsibility</a>
              <a href="#" className="hover:text-black hover:underline transition-colors block">Investors' site</a>
            </div>

            <div className="flex flex-col space-y-3">
              <h4 className="font-bold uppercase tracking-widest mb-3 text-[#777]">More from StylePress</h4>
              <a href="#" className="hover:text-black hover:underline transition-colors block">Mobile and StylePress apps</a>
              <a href="#" className="hover:text-black hover:underline transition-colors block">StylePress Marketplace</a>
              <a href="#" className="hover:text-black hover:underline transition-colors block">Gift vouchers</a>
              <a href="#" className="hover:text-black hover:underline transition-colors block">Black Friday</a>
              <a href="#" className="hover:text-black hover:underline transition-colors block">StylePress x Thrift+</a>
            </div>

            <div className="flex flex-col space-y-3">
              <h4 className="font-bold uppercase tracking-widest mb-3 text-[#777]">Shopping from:</h4>
              <div className="flex items-center space-x-2 text-[13px] text-gray-600 cursor-pointer hover:text-[#0088cc] group">
                <span className="font-bold leading-none border-t border-[#ccc] pt-4 w-full flex items-center">
                  You're in <span className="text-[18px] mx-2">🇺🇸</span> <span className="group-hover:underline">CHANGE</span>
                </span>
              </div>
            </div>

          </div>
        </div>

        <div className="bg-[#dddddd] w-full py-4 px-6 mt-4">
          <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row justify-between items-center text-[12px] text-[#666]">
            <div className="mb-2 md:mb-0">
              <p>© 2026 StylePress</p>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-2 justify-center">
              <a href="#" className="hover:text-black hover:underline">Privacy & Cookies</a>
              <span className="hidden md:inline">|</span>
              <a href="#" className="hover:text-black hover:underline">Ts&Cs</a>
              <span className="hidden md:inline">|</span>
              <a href="#" className="hover:text-black hover:underline">Accessibility</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
