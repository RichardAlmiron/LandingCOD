import React from 'react';
import Image from 'next/image';
import { StoreData } from '@/lib/types';
import { Search, ShoppingCart, Heart, User, Menu, ChevronDown, ChevronRight, Star, Instagram, Facebook, Twitter, Youtube } from 'lucide-react';

export default function ZenBasicTemplate({ data }: { data: StoreData }) {
  const products = data.products;

  return (
    <div className="min-h-full bg-white font-sans text-[#1b1b1b] selection:bg-[#ff0000] selection:text-white pb-0 overflow-x-hidden">

      {/* ─── APP PROMO HEADER ─── */}
      <div className="bg-[#f4f4f4] text-[#1b1b1b] text-[12px] py-1.5 px-4 flex justify-between items-center font-medium border-b border-gray-200">
        <div className="hidden md:flex space-x-4">
          <a href="#" className="hover:underline">Store Locator</a>
          <a href="#" className="hover:underline">Bulk Purchasing</a>
        </div>
        <div className="flex-1 text-center font-bold">
          <span>Get <span className="text-[#ff0000]">$10 off</span> your first order when you download the ZenBasic app. <a href="#" className="underline hover:text-[#ff0000]">Download Now</a></span>
        </div>
        <div className="hidden md:flex space-x-4">
          <a href="#" className="hover:underline flex items-center">English <ChevronDown className="w-3 h-3 ml-1" /></a>
          <a href="#" className="hover:underline">Help</a>
        </div>
      </div>

      {/* ─── MAIN HEADER ─── */}
      <header className="bg-white sticky top-0 z-50 border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-6 h-[72px] flex items-center justify-between">

          <div className="flex items-center">
            <Menu className="w-6 h-6 lg:hidden mr-4 cursor-pointer hover:text-[#ff0000] transition-colors" />

            {/* Iconic ZenBasic Logo */}
            <div className="bg-[#ff0000] text-white p-2 flex flex-col items-center justify-center leading-[0.85] font-black text-[14px] md:text-[16px] shrink-0 cursor-pointer mr-6 lg:mr-10 h-10 w-10 md:h-12 md:w-12 tracking-tighter shadow-sm">
              <span>UNI</span>
              <span>QLO</span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex space-x-6 font-bold text-[14px] uppercase tracking-wider text-[#1b1b1b]">
              <a href="#" className="hover:text-[#ff0000] hover:underline underline-offset-[28px] decoration-4 decoration-[#ff0000] transition-all pb-6 mt-6">Women</a>
              <a href="#" className="hover:text-[#ff0000] hover:underline underline-offset-[28px] decoration-4 decoration-[#ff0000] transition-all pb-6 mt-6">Men</a>
              <a href="#" className="hover:text-[#ff0000] hover:underline underline-offset-[28px] decoration-4 decoration-[#ff0000] transition-all pb-6 mt-6">Kids</a>
              <a href="#" className="hover:text-[#ff0000] hover:underline underline-offset-[28px] decoration-4 decoration-[#ff0000] transition-all pb-6 mt-6">Baby</a>
            </nav>
          </div>

          <div className="flex items-center space-x-5 lg:space-x-8 text-[#1b1b1b]">
            <div className="hidden md:flex items-center bg-[#f4f4f4] px-4 py-2 w-56 lg:w-80 border border-transparent focus-within:border-gray-400 focus-within:bg-white transition-colors">
              <Search className="w-5 h-5 text-gray-500 mr-2" />
              <input type="text" placeholder="Search by keyword" className="bg-transparent outline-none text-[13px] w-full font-medium" />
            </div>
            <Search className="w-6 h-6 md:hidden cursor-pointer hover:text-[#ff0000]" />
            <div className="hidden md:flex flex-col items-center cursor-pointer hover:text-[#ff0000] transition-colors group">
              <User className="w-6 h-6 mb-0.5 group-hover:fill-[#ff0000]/10" />
              <span className="text-[10px] uppercase font-bold tracking-widest">Account</span>
            </div>
            <div className="hidden md:flex flex-col items-center cursor-pointer hover:text-[#ff0000] transition-colors group">
              <Heart className="w-6 h-6 mb-0.5 group-hover:fill-[#ff0000]/10" />
              <span className="text-[10px] uppercase font-bold tracking-widest">Wishlist</span>
            </div>
            <div className="flex flex-col items-center relative cursor-pointer hover:text-[#ff0000] transition-colors group">
              <ShoppingCart className="w-6 h-6 mb-0.5 group-hover:fill-[#ff0000]/10" />
              <span className="absolute top-0 right-0 md:right-1 bg-[#ff0000] text-white text-[9px] font-bold px-1 rounded-full">0</span>
              <span className="hidden md:block text-[10px] uppercase font-bold tracking-widest">Cart</span>
            </div>
          </div>
        </div>
      </header>

      <main className="w-full">

        {/* ─── HERO BANNER ─── */}
        <section className="relative w-full h-[500px] md:h-[650px] flex justify-center items-center overflow-hidden mb-12">
          <Image
            src={data.bannerImage}
            alt="Hero Banner"
            fill
            className="object-cover object-center"
            priority
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/10"></div>

          <div className="absolute bottom-10 left-4 md:left-10 lg:left-[10%] bg-white p-8 md:p-12 max-w-[500px] border-l-8 border-[#ff0000] shadow-lg">
            <div className="text-[12px] font-bold uppercase tracking-widest text-[#ff0000] mb-2 flex items-center">
              <span>New Arrival</span> <ChevronRight className="w-4 h-4" />
            </div>
            <h1 className="text-[32px] md:text-[42px] font-black uppercase mb-4 leading-none tracking-tighter text-[#1b1b1b]">
              {data.name}
            </h1>
            <p className="text-[14px] md:text-[16px] font-medium text-gray-700 mb-8 leading-relaxed">
              {data.description || 'LifeWear designed to make everyone’s life better. Simple, high-quality, everyday clothing.'}
            </p>
            <button className="bg-[#1b1b1b] text-white px-10 py-4 font-bold text-[13px] uppercase tracking-widest hover:bg-gray-800 transition-colors shadow-sm w-full sm:w-auto text-center">
              Shop Collection
            </button>
          </div>
        </section>

        {/* ─── CATEGORY NAVIGATION TABS ─── */}
        <section className="max-w-[1440px] mx-auto px-4 lg:px-6 mb-12">
          <div className="flex border-b border-gray-300 overflow-x-auto hide-scrollbar">
            {['Women', 'Men', 'Kids', 'Baby'].map((tab, i) => (
              <button key={tab} className={`px-8 py-4 font-bold text-[18px] md:text-[22px] uppercase tracking-wider whitespace-nowrap ${i === 0 ? 'border-b-4 border-[#1b1b1b] text-[#1b1b1b]' : 'text-gray-400 hover:text-gray-800'}`}>
                {tab}
              </button>
            ))}
          </div>
        </section>

        {/* ─── LIMITED OFFERS GRID ─── */}
        <section className="max-w-[1440px] mx-auto px-4 lg:px-6 mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b-2 border-black pb-3">
            <h2 className="text-[24px] md:text-[32px] font-black uppercase tracking-tight text-[#1b1b1b] flex items-center">
              Limited Offers <span className="ml-4 text-[14px] font-medium text-[#ff0000] normal-case tracking-normal">Until Mar 14</span>
            </h2>
            <a href="#" className="hidden md:flex text-[13px] font-bold uppercase tracking-widest text-gray-500 hover:text-black hover:underline transition-colors items-center mt-4 md:mt-0">
              View All <ChevronRight className="w-4 h-4 ml-1" />
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-10">
            {products.slice(0, 5).map((product, idx) => (
              <div key={product.id || idx} data-product-id={product.id} className="group cursor-pointer flex flex-col">
                <div className="relative aspect-[4/5] mb-4 bg-[#f4f4f4] overflow-hidden group-hover:opacity-95 transition-opacity">
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-0 left-0 bg-[#ff0000] text-white text-[10px] md:text-[11px] font-bold px-2 py-1 uppercase tracking-widest shadow-sm">
                    Limited Offer
                  </div>
                  <button className="absolute bottom-0 left-0 right-0 bg-white/95 py-3 text-center text-[12px] font-bold uppercase tracking-widest translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 border-t border-gray-200 hover:bg-[#f4f4f4]">
                    Quick View
                  </button>
                </div>

                <div className="flex flex-col flex-1 px-1">
                  {/* Swatches */}
                  <div className="flex space-x-1.5 mb-2">
                    <div className="w-4 h-4 bg-white border border-gray-300 shadow-sm cursor-pointer hover:border-black" />
                    <div className="w-4 h-4 bg-[#1b1b1b] border border-gray-300 shadow-sm cursor-pointer hover:border-black" />
                    {idx % 2 === 0 && <div className="w-4 h-4 bg-blue-800 border border-gray-300 shadow-sm cursor-pointer hover:border-black" />}
                    {idx % 3 === 0 && <div className="w-4 h-4 bg-stone-300 border border-gray-300 shadow-sm cursor-pointer hover:border-black" />}
                    <div className="text-[10px] text-gray-500 font-medium ml-1">+{(idx % 3) + 2} Colors</div>
                  </div>

                  <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Women</div>

                  <h3 className="text-[13px] md:text-[14px] font-medium text-[#1b1b1b] line-clamp-2 leading-snug mb-2 group-hover:underline decoration-1 underline-offset-2">
                    {product.title}
                  </h3>

                  <div className="flex items-center space-x-2 mb-2 mt-auto">
                    <span className="text-[16px] md:text-[20px] font-black text-[#ff0000]">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-[12px] md:text-[14px] font-medium text-gray-500 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>

                  {/* Reviews */}
                  <div className="flex items-center space-x-1">
                    <div className="flex text-yellow-400">
                      <Star className="w-3 h-3 fill-yellow-400" />
                      <Star className="w-3 h-3 fill-yellow-400" />
                      <Star className="w-3 h-3 fill-yellow-400" />
                      <Star className="w-3 h-3 fill-yellow-400" />
                      <Star className="w-3 h-3 text-yellow-400" />
                    </div>
                    <span className="text-[11px] text-gray-500 font-medium underline">(12{(idx * 7) % 100})</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-center md:hidden">
            <button className="border border-black bg-white text-black px-10 py-3.5 font-bold uppercase tracking-widest text-[13px] w-full">
              View All Limited Offers
            </button>
          </div>
        </section>

        {/* ─── GRID BANNER SECTION ─── */}
        <section className="max-w-[1440px] mx-auto px-4 lg:px-6 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">

            <div className="group cursor-pointer relative overflow-hidden aspect-[4/3] bg-[#f4f4f4]">
              <Image src="https://picsum.photos/800/600?random=810" alt="Collection" fill className="object-cover group-hover:scale-[1.03] transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/10 transition-colors"></div>
              <div className="absolute top-8 left-8 text-black bg-white p-6 max-w-[300px] shadow-sm">
                <h3 className="text-[24px] font-black uppercase tracking-tight mb-2 leading-none">Linen Collection</h3>
                <p className="text-[13px] font-medium text-gray-600 mb-4">Breathable comfort for the warmer days ahead.</p>
                <span className="text-[12px] font-bold uppercase tracking-widest border-b border-black pb-0.5 group-hover:text-[#ff0000] group-hover:border-[#ff0000] transition-colors">Shop Now</span>
              </div>
            </div>

            <div className="group cursor-pointer relative overflow-hidden aspect-[4/3] bg-[#f4f4f4]">
              <Image src="https://picsum.photos/800/600?random=811" alt="AIRism" fill className="object-cover group-hover:scale-[1.03] transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/10 transition-colors"></div>
              <div className="absolute top-8 left-8 text-black bg-white p-6 max-w-[300px] shadow-sm">
                <h3 className="text-[24px] font-black uppercase tracking-tight mb-2 leading-none">AIRism</h3>
                <p className="text-[13px] font-medium text-gray-600 mb-4">Technology that keeps you cool, dry, and comfortable.</p>
                <span className="text-[12px] font-bold uppercase tracking-widest border-b border-black pb-0.5 group-hover:text-[#ff0000] group-hover:border-[#ff0000] transition-colors">Shop Now</span>
              </div>
            </div>

          </div>
        </section>

        {/* ─── NEW ARRIVALS ─── */}
        <section className="max-w-[1440px] mx-auto px-4 lg:px-6 mb-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b-2 border-gray-200 pb-3">
            <h2 className="text-[24px] md:text-[32px] font-black uppercase tracking-tight text-[#1b1b1b]">
              New Arrivals
            </h2>
            <a href="#" className="hidden md:flex text-[13px] font-bold uppercase tracking-widest text-gray-500 hover:text-black hover:underline transition-colors mt-4 md:mt-0">
              View All
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-10">
            {products.slice(0, 6).map((product, idx) => (
              <div key={product.id || idx} data-product-id={product.id} className="group cursor-pointer flex flex-col">
                <div className="relative aspect-square mb-3 bg-[#f4f4f4] overflow-hidden">
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    <span className="bg-white border border-gray-200 text-[#1b1b1b] text-[10px] font-bold px-1.5 py-0.5 uppercase tracking-wider">New</span>
                    {idx === 0 && <span className="bg-[#1b1b1b] text-white text-[10px] font-bold px-1.5 py-0.5 uppercase tracking-wider">Online Exclusive</span>}
                  </div>
                </div>

                <div className="flex flex-col flex-1 px-1">
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Unisex</div>
                  <h3 className="text-[13px] font-medium text-[#1b1b1b] line-clamp-2 leading-snug mb-2 group-hover:underline decoration-1 underline-offset-2">
                    {product.title}
                  </h3>
                  <div className="mt-auto text-[16px] md:text-[18px] font-bold text-[#1b1b1b]">
                    ${product.price}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── INFO BLOCKS ─── */}
        <section className="bg-[#f4f4f4] py-16">
          <div className="max-w-[1440px] mx-auto px-4 lg:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

              <div className="flex flex-col items-center text-center p-6 bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <ShoppingCart className="w-6 h-6 text-[#1b1b1b]" />
                </div>
                <h3 className="text-[16px] font-bold uppercase tracking-widest mb-3">Free Shipping</h3>
                <p className="text-[13px] text-gray-600 mb-6">Get free shipping on your first order or on all orders over $99.</p>
                <span className="text-[12px] font-bold uppercase tracking-widest text-[#ff0000] border-b border-[#ff0000] pb-0.5">Learn More</span>
              </div>

              <div className="flex flex-col items-center text-center p-6 bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <Store className="w-6 h-6 text-[#1b1b1b]" />
                </div>
                <h3 className="text-[16px] font-bold uppercase tracking-widest mb-3">Pick Up In Store</h3>
                <p className="text-[13px] text-gray-600 mb-6">Order online and pick it up at your local ZenBasic store for free.</p>
                <span className="text-[12px] font-bold uppercase tracking-widest text-[#ff0000] border-b border-[#ff0000] pb-0.5">Learn More</span>
              </div>

              <div className="flex flex-col items-center text-center p-6 bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <RotateCcw className="w-6 h-6 text-[#1b1b1b]" />
                </div>
                <h3 className="text-[16px] font-bold uppercase tracking-widest mb-3">Easy Returns</h3>
                <p className="text-[13px] text-gray-600 mb-6">Changed your mind? Return your items easily within 30 days.</p>
                <span className="text-[12px] font-bold uppercase tracking-widest text-[#ff0000] border-b border-[#ff0000] pb-0.5">Learn More</span>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* ─── FOOTER ─── */}
      <footer className="bg-white border-t border-gray-300 pt-16">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-6">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">

            {/* Newsletter */}
            <div className="lg:col-span-2">
              <h4 className="text-[16px] font-black uppercase tracking-widest text-[#1b1b1b] mb-4">Stay Connected</h4>
              <p className="font-medium text-gray-600 mb-6 text-[13px]">Sign up for ZenBasic news and get $10 off your first order when you download the app.</p>
              <form className="flex w-full mb-8">
                <input type="email" placeholder="Email Address" className="bg-white border border-gray-300 text-black px-4 py-3 outline-none flex-1 font-medium text-[13px] focus:border-black transition-colors" />
                <button type="button" className="bg-[#1b1b1b] text-white px-8 py-3 font-bold uppercase tracking-widest text-[13px] hover:bg-gray-800 transition-colors shrink-0">
                  Subscribe
                </button>
              </form>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-black transition-colors"><Instagram className="w-6 h-6" /></a>
                <a href="#" className="text-gray-400 hover:text-black transition-colors"><Facebook className="w-6 h-6" /></a>
                <a href="#" className="text-gray-400 hover:text-black transition-colors"><Twitter className="w-6 h-6" /></a>
                <a href="#" className="text-gray-400 hover:text-black transition-colors"><Youtube className="w-6 h-6" /></a>
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-col space-y-4 text-[12px] font-bold uppercase tracking-widest">
              <h4 className="text-[#1b1b1b] mb-2 text-[14px] font-black">About ZenBasic</h4>
              <a href="#" className="text-gray-500 hover:text-black hover:underline transition-all">Information</a>
              <a href="#" className="text-gray-500 hover:text-black hover:underline transition-all">Store Locator</a>
              <a href="#" className="text-gray-500 hover:text-black hover:underline transition-all">Sustainability</a>
              <a href="#" className="text-gray-500 hover:text-black hover:underline transition-all">Careers</a>
            </div>

            <div className="flex flex-col space-y-4 text-[12px] font-bold uppercase tracking-widest">
              <h4 className="text-[#1b1b1b] mb-2 text-[14px] font-black">Help</h4>
              <a href="#" className="text-gray-500 hover:text-black hover:underline transition-all">FAQ</a>
              <a href="#" className="text-gray-500 hover:text-black hover:underline transition-all">Shipping</a>
              <a href="#" className="text-gray-500 hover:text-black hover:underline transition-all">Returns</a>
              <a href="#" className="text-gray-500 hover:text-black hover:underline transition-all">Order Status</a>
            </div>

            <div className="flex flex-col space-y-4 text-[12px] font-bold uppercase tracking-widest">
              <h4 className="text-[#1b1b1b] mb-2 text-[14px] font-black">Legal</h4>
              <a href="#" className="text-gray-500 hover:text-black hover:underline transition-all">Terms of Use</a>
              <a href="#" className="text-gray-500 hover:text-black hover:underline transition-all">Privacy Policy</a>
              <a href="#" className="text-gray-500 hover:text-black hover:underline transition-all">Accessibility</a>
            </div>

          </div>

          <div className="py-8 border-t border-gray-300 flex flex-col md:flex-row items-center justify-between text-[11px] font-bold tracking-widest text-gray-500">
            <span>COPYRIGHT © ZenBasic CO., LTD. ALL RIGHTS RESERVED.</span>
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
              <span className="bg-[#ff0000] text-white p-1 flex flex-col leading-[0.8] font-black text-[8px]">
                <span>UNI</span>
                <span>QLO</span>
              </span>
              <span className="uppercase text-black font-black">LifeWear</span>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}

// Temporary inline icons since we can't reliably import them if they aren't already there
const Store = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
);

const RotateCcw = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="1 4 1 10 7 10"></polyline><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path></svg>
);
