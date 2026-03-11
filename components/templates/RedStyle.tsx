import React from 'react';
import Image from 'next/image';
import { StoreData } from '@/lib/types';
import { Search, ShoppingBag, Heart, User, Menu, MoreHorizontal, ArrowRight, Leaf, Star, Facebook, Twitter, Instagram, Youtube, X } from 'lucide-react';

export default function RedStyleTemplate({ data }: { data: StoreData }) {
  return (
    <div className="min-h-full bg-white font-sans text-[#222] overflow-x-hidden" style={{ fontFamily: "'RedStyle Sans Regular', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}>

      {/* ─── UTILITY BAR ─── */}
      <div className="bg-[#faf9f8] text-[11px] h-[34px] px-6 hidden md:flex w-full justify-between items-center font-medium">
        <div className="flex space-x-6">
          <a href="#" className="hover:underline underline-offset-2">Customer Service</a>
          <a href="#" className="hover:underline underline-offset-2">Newsletter</a>
          <a href="#" className="hover:underline underline-offset-2">Find a store</a>
          <button className="flex items-center hover:underline focus:outline-none">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
        <div className="flex space-x-6">
          {/* Empty right side to balance */}
        </div>
      </div>

      {/* ─── HEADER ─── */}
      <header className="bg-white w-full sticky top-0 z-50">
        <div className="w-full mx-auto px-4 md:px-6 pt-4 pb-0 flex flex-col items-center relative">

          {/* Top Actions (Mobile Menu + Right Icons) */}
          <div className="w-full flex justify-between items-center md:items-start absolute top-4 px-4 md:px-6 z-10">
            <button className="md:hidden p-1 hover:bg-gray-100 rounded-sm">
              <Menu className="w-6 h-6" strokeWidth={1.5} />
            </button>

            {/* Invisible spacer for flex balance on desktop */}
            <div className="hidden md:block w-[150px]"></div>

            <div className="flex items-center space-x-4 md:space-x-5 text-[12px] font-bold">
              <div className="hidden md:flex flex-col items-center cursor-pointer hover:text-[#e50010] group">
                <User className="w-5 h-5 mb-1 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                <span className="font-normal text-[11px]">Sign in</span>
              </div>
              <div className="hidden md:flex flex-col items-center cursor-pointer hover:text-[#e50010] group">
                <Heart className="w-5 h-5 mb-1 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                <span className="font-normal text-[11px]">Favorites</span>
              </div>
              <div className="flex flex-col items-center cursor-pointer hover:text-[#e50010] group relative">
                <ShoppingBag className="w-5 h-5 mb-1 md:mb-1 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                <span className="hidden md:block font-normal text-[11px]">Shopping bag (0)</span>
                <span className="md:hidden absolute top-[-4px] right-[-4px] bg-[#e50010] text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold">0</span>
              </div>
            </div>
          </div>

          {/* Logo (Iconic red) */}
          <div className="text-[#e50010] font-black text-[50px] md:text-[64px] tracking-[-0.05em] uppercase cursor-pointer mb-2 md:mb-6 leading-none pt-2 md:pt-0" style={{ fontFamily: "'Arial Black', Impact, sans-serif" }}>
            {data.logoText !== 'RedStyle' ? data.logoText : 'RedStyle'}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex flex-wrap justify-center gap-x-6 gap-y-2 font-bold text-[13px] mb-4 text-[#222]">
            <a href="#" className="hover:text-[#e50010] border-b-2 border-transparent hover:border-[#e50010] pb-1 transition-all">Ladies</a>
            <a href="#" className="hover:text-[#e50010] border-b-2 border-transparent hover:border-[#e50010] pb-1 transition-all">Men</a>
            <a href="#" className="hover:text-[#e50010] border-b-2 border-transparent hover:border-[#e50010] pb-1 transition-all">Divided</a>
            <a href="#" className="hover:text-[#e50010] border-b-2 border-transparent hover:border-[#e50010] pb-1 transition-all">Baby</a>
            <a href="#" className="hover:text-[#e50010] border-b-2 border-transparent hover:border-[#e50010] pb-1 transition-all">Kids</a>
            <a href="#" className="hover:text-[#e50010] border-b-2 border-transparent hover:border-[#e50010] pb-1 transition-all">RedStyle HOME</a>
            <a href="#" className="hover:text-[#e50010] border-b-2 border-transparent hover:border-[#e50010] pb-1 transition-all">Sport</a>
            <a href="#" className="hover:text-[#e50010] border-b-2 border-transparent hover:border-[#e50010] pb-1 transition-all">Sustainability</a>
            <a href="#" className="text-[#e50010] border-b-2 border-transparent hover:border-[#e50010] pb-1 transition-all">Sale</a>
          </nav>

          {/* Search Bar (Bottom of header on desktop, hidden on mobile in this view) */}
          <div className="hidden md:flex w-full items-center justify-center border-b border-gray-200 pb-4 relative group">
            <div className="absolute right-0 bottom-3 flex items-center border-b-[1.5px] border-[#222] pb-1 w-[220px] focus-within:w-[280px] transition-all">
              <Search className="w-4 h-4 mr-2 shrink-0 group-focus-within:text-[#e50010]" strokeWidth={2} />
              <input type="text" placeholder="Search products" className="bg-transparent outline-none text-[13px] w-full font-bold placeholder:text-[#999] text-[#222]" />
            </div>
          </div>

        </div>
      </header>

      {/* ─── PUSH NOTIFICATION (Promo banner under header) ─── */}
      <div className="w-full bg-[#f4eddd] text-center py-2.5 text-[12px] font-bold tracking-wide hover:underline cursor-pointer border-b border-white">
        Members get free shipping over $40 & free returns!
      </div>

      <main className="w-full mx-auto px-4 md:px-0">

        {/* ─── FULL WIDTH HERO BANNER ─── */}
        <div className="relative h-[65vh] md:h-[85vh] w-full mb-12 md:mb-20 group cursor-pointer overflow-hidden mt-1 md:mt-2">
          <Image
            src={data.bannerImage}
            alt="Hero Campaign"
            fill
            className="object-cover object-center"
            referrerPolicy="no-referrer"
            priority
          />
          {/* Semi-transparent overlay to ensure text readability */}
          <div className="absolute inset-0 bg-black/15 transition-colors duration-500" />

          {/* Centered Typography RedStyle style (big, bold, legible) */}
          <div className="absolute inset-x-0 bottom-[15%] flex flex-col items-center justify-center text-center text-white p-6 drop-shadow-md z-10">
            <h1 className="text-[36px] md:text-[60px] font-black uppercase tracking-tight mb-2 leading-none">{data.name}</h1>
            <p className="text-[16px] md:text-[22px] font-medium mb-6 md:mb-8 max-w-2xl">{data.description || "Fresh styles for the new season."}</p>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto px-4">
              <button className="bg-white text-black px-10 py-3.5 font-bold text-[14px] hover:bg-[#f5f5f5] hover:scale-105 transition-all shadow-md w-full sm:w-auto">Shop Ladies</button>
              <button className="bg-white text-black px-10 py-3.5 font-bold text-[14px] hover:bg-[#f5f5f5] hover:scale-105 transition-all shadow-md w-full sm:w-auto">Shop Men</button>
            </div>
          </div>
        </div>

        {/* ─── NEW ARRIVALS GRID (Classic RedStyle block grid) ─── */}
        <div className="w-full max-w-[1440px] mx-auto mb-20 md:mb-28 px-0 md:px-6">
          <h2 className="text-[20px] md:text-[26px] font-bold text-center mb-10 tracking-tight">New Arrivals</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-2 md:gap-x-4 gap-y-10 md:gap-y-12">
            {data.products.map(product => (
              <div key={product.id} data-product-id={product.id} className="group cursor-pointer flex flex-col relative data-product">
                <div className="relative aspect-[3/4] mb-3 overflow-hidden bg-[#f4f4f4]">
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-[600ms] ease-out mix-blend-multiply"
                    referrerPolicy="no-referrer"
                  />
                  {product.originalPrice && (
                    <div className="absolute top-0 left-0 bg-[#e50010] text-white text-[11px] font-bold px-2 py-1 uppercase">
                      Sale
                    </div>
                  )}
                  <button className="absolute bottom-3 right-3 bg-white p-2 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110">
                    <Heart className="w-[18px] h-[18px] text-[#222]" strokeWidth={2} />
                  </button>
                </div>

                {/* Product Info */}
                <div className="flex flex-col flex-1 px-1">
                  <h3 className="text-[12px] md:text-[14px] font-normal text-[#222] mb-1 leading-snug group-hover:underline underline-offset-2 w-full pr-4">{product.title}</h3>
                  <div className="flex items-center space-x-2 mt-auto pt-1">
                    <span className={`font-bold text-[13px] md:text-[15px] ${product.originalPrice ? 'text-[#e50010]' : 'text-[#222]'}`}>
                      ${product.price}
                    </span>
                    {product.originalPrice && <span className="text-[12px] md:text-[13px] text-gray-500 line-through">${product.originalPrice}</span>}
                  </div>

                  {/* Swatches (simulated RedStyle color dots) */}
                  <div className="flex space-x-1 mt-2 mb-1">
                    <div className="w-[14px] h-[14px] rounded-full bg-[#333] border border-gray-300 cursor-pointer" />
                    <div className="w-[14px] h-[14px] rounded-full bg-[#ecebe5] border border-gray-300 cursor-pointer" />
                    <div className="w-[14px] h-[14px] rounded-full bg-[#8c9485] border border-gray-300 cursor-pointer" />
                  </div>
                  <span className="text-[#666] text-[11px]">New Arrival</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── SHOP BY CONCEPT (Square grid with text below) ─── */}
        <div className="w-full max-w-[1440px] mx-auto mb-20 md:mb-32 px-0 md:px-6">
          <h2 className="text-[20px] md:text-[26px] font-bold text-center mb-10 tracking-tight">Shop by Concept</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {[
              { name: 'Everyday Fashion', img: 'https://picsum.photos/600/600?random=300' },
              { name: 'Premium Selection', img: 'https://picsum.photos/600/600?random=301' },
              { name: 'Trend Edit', img: 'https://picsum.photos/600/600?random=302' },
            ].map((concept, i) => (
              <div key={i} className="group cursor-pointer flex flex-col items-center">
                <div className="relative w-full aspect-square overflow-hidden mb-4 bg-gray-100">
                  <Image src={concept.img} alt={concept.name} fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
                </div>
                <h3 className="text-[16px] md:text-[18px] font-bold group-hover:underline underline-offset-4">{concept.name}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* ─── TRENDING CATEGORIES (Pill buttons layout) ─── */}
        <div className="w-full bg-[#faf9f8] py-16 px-4 md:px-6 mb-20 md:mb-32 full-width-sm">
          <div className="w-full max-w-[1000px] mx-auto text-center">
            <h2 className="text-[20px] md:text-[26px] font-bold mb-10 tracking-tight">Trending Right Now</h2>
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              {[
                'Linen Shirts', 'Maxi Dresses', 'Swimwear', 'Cargo Pants',
                'Summer Accessories', 'Sandals', 'Denim Shorts', 'Basic Tees'
              ].map((tag, i) => (
                <button key={i} className="bg-white border border-[#ccc] px-6 py-3 text-[13px] font-bold hover:border-[#222] hover:bg-[#f5f5f5] transition-colors rounded-none shadow-sm min-w-[120px]">
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ─── CONSCIOUS / SUSTAINABILITY CAMPAIGN ─── */}
        <div className="w-full max-w-[1440px] mx-auto mb-20 md:mb-32 flex flex-col md:flex-row bg-[#e8efe9] px-0 md:px-0">
          <div className="w-full md:w-1/2 p-10 md:p-20 flex flex-col justify-center items-center text-center order-2 md:order-1">
            <Leaf className="w-10 h-10 text-[#2e5c3b] mb-6" strokeWidth={1.5} />
            <h2 className="text-[28px] md:text-[40px] font-black uppercase tracking-tight mb-4 text-[#2e5c3b] leading-tight">Let's Close the Loop</h2>
            <p className="text-[14px] md:text-[16px] font-medium text-[#2e5c3b] mb-8 max-w-sm leading-relaxed">
              Bring your unwanted clothes or textiles to any RedStyle store and they will be reworn, reused or recycled. Plus, you'll get a thank you voucher!
            </p>
            <button className="bg-[#2e5c3b] text-white px-8 py-3.5 font-bold text-[14px] hover:bg-[#1a3a24] transition-colors shadow-md">
              Read More
            </button>
          </div>
          <div className="w-full md:w-1/2 relative h-[400px] md:h-auto order-1 md:order-2">
            <Image src="https://picsum.photos/800/800?random=293" alt="Sustainability" fill className="object-cover" />
          </div>
        </div>

        {/* ─── RedStyle MEMBER PROMO ─── */}
        <div className="w-full max-w-[1440px] mx-auto mb-20 md:mb-32 bg-[#222] text-white py-16 md:py-24 px-6 text-center">
          <div className="max-w-[700px] mx-auto flex flex-col items-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-lg">
              <Star className="w-8 h-8 text-[#e50010] fill-current" />
            </div>
            <h2 className="text-[28px] md:text-[42px] font-black uppercase tracking-tight mb-4 leading-none text-center">Become a Member</h2>
            <p className="text-[15px] md:text-[18px] font-medium mb-10 max-w-xl text-[#ccc]">
              Join now and get 10% off your next purchase! Plus, enjoy free shipping on orders over $40, exclusive offers, and more.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto">
              <button className="bg-white text-black px-12 py-4 font-bold text-[14px] hover:bg-gray-200 transition-colors w-full sm:w-auto shadow-md">
                Join Now
              </button>
              <button className="border border-white bg-transparent text-white px-12 py-4 font-bold text-[14px] hover:bg-white hover:text-black transition-colors w-full sm:w-auto">
                Sign In
              </button>
            </div>
          </div>
        </div>

      </main>

      {/* ─── FOOTER (Structured with Gray background) ─── */}
      <footer className="bg-[#e4e4e4] pt-16 md:pt-24 pb-12 w-full">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 mb-16 text-[13px]">
            <div className="flex flex-col space-y-3">
              <h4 className="font-bold uppercase tracking-wider mb-2 text-[#222]">Shop</h4>
              <a href="#" className="hover:underline hover:text-black text-[#666] transition-colors">Ladies</a>
              <a href="#" className="hover:underline hover:text-black text-[#666] transition-colors">Men</a>
              <a href="#" className="hover:underline hover:text-black text-[#666] transition-colors">Baby</a>
              <a href="#" className="hover:underline hover:text-black text-[#666] transition-colors">Kids</a>
              <a href="#" className="hover:underline hover:text-black text-[#666] transition-colors">RedStyle HOME</a>
              <a href="#" className="hover:underline hover:text-black text-[#666] transition-colors">Sport</a>
              <a href="#" className="hover:underline hover:text-black text-[#666] transition-colors">Gift Cards</a>
              <a href="#" className="hover:underline hover:text-black text-[#666] transition-colors">Magazine</a>
            </div>

            <div className="flex flex-col space-y-3">
              <h4 className="font-bold uppercase tracking-wider mb-2 text-[#222]">Corporate Info</h4>
              <a href="#" className="hover:underline hover:text-black text-[#666] transition-colors">Career at RedStyle</a>
              <a href="#" className="hover:underline hover:text-black text-[#666] transition-colors">About RedStyle group</a>
              <a href="#" className="hover:underline hover:text-black text-[#666] transition-colors">Sustainability RedStyle Group</a>
              <a href="#" className="hover:underline hover:text-black text-[#666] transition-colors">Press</a>
              <a href="#" className="hover:underline hover:text-black text-[#666] transition-colors">Investor Relations</a>
              <a href="#" className="hover:underline hover:text-black text-[#666] transition-colors">Corporate Governance</a>
            </div>

            <div className="flex flex-col space-y-3">
              <h4 className="font-bold uppercase tracking-wider mb-2 text-[#222]">Help</h4>
              <a href="#" className="hover:underline hover:text-black text-[#666] transition-colors">Customer Service</a>
              <a href="#" className="hover:underline hover:text-black text-[#666] transition-colors">My Account</a>
              <a href="#" className="hover:underline hover:text-black text-[#666] transition-colors">Find a Store</a>
              <a href="#" className="hover:underline hover:text-black text-[#666] transition-colors">Legal & Privacy</a>
              <a href="#" className="hover:underline hover:text-black text-[#666] transition-colors">Contact</a>
              <a href="#" className="hover:underline hover:text-black text-[#666] transition-colors">CA Supply Chains Act</a>
              <a href="#" className="hover:underline hover:text-black text-[#666] transition-colors">Do Not Sell Or Share My INFO</a>
            </div>

            <div className="flex flex-col space-y-3 lg:pr-8">
              <h4 className="font-bold uppercase tracking-wider mb-2 text-[#222]">Become a Member</h4>
              <p className="text-[#666] mb-4 leading-relaxed">Join now and get 10% off your next purchase!</p>
              <button className="bg-white text-black px-6 py-2.5 font-bold text-[13px] hover:bg-black hover:text-white transition-colors w-fit border border-[#222]">
                Read More
              </button>
            </div>
          </div>

          <div className="flex justify-center space-x-6 mb-12">
            <a href="#" className="text-[#222] hover:text-[#666] transition-colors"><Instagram className="w-[22px] h-[22px]" strokeWidth={1.5} /></a>
            <a href="#" className="text-[#222] hover:text-[#666] transition-colors"><Twitter className="w-[22px] h-[22px]" strokeWidth={1.5} /></a>
            <a href="#" className="text-[#222] hover:text-[#666] transition-colors"><Youtube className="w-[22px] h-[22px]" strokeWidth={1.5} /></a>
            <a href="#" className="text-[#222] hover:text-[#666] transition-colors"><Facebook className="w-[22px] h-[22px]" strokeWidth={1.5} /></a>
          </div>

          <div className="text-center pt-8 border-t border-[#ccc]">
            <p className="text-[11px] text-[#666] max-w-2xl mx-auto leading-relaxed mb-8">
              The content of this site is copyright-protected and is the property of RedStyle Hennes & Mauritz AB. RedStyle's business concept is to offer fashion and quality at the best price in a sustainable way. RedStyle has since it was founded in 1947 grown into one of the world's leading fashion companies.
            </p>
            <div className="text-[#e50010] font-black text-[50px] tracking-[-0.05em] opacity-40 hover:opacity-100 transition-opacity cursor-pointer inline-block mt-4 mb-2" style={{ fontFamily: "'Arial Black', Impact, sans-serif" }}>
              RedStyle
            </div>
            <div className="mt-2 text-[11px] font-bold text-[#222]">
              UNITED STATES | $
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
