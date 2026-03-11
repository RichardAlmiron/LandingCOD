import React from 'react';
import Image from 'next/image';
import { StoreData } from '@/lib/types';
import { Search, ShoppingBag, Heart, User, MapPin, ChevronRight, Phone } from 'lucide-react';

export default function BlueClassicTemplate({ data }: { data: StoreData }) {
  const brandBlue = "#81d8d0";
  const products = data.products;

  return (
    <div className="min-h-full bg-white font-sans text-[#333333] selection:bg-[#81d8d0] selection:text-white pb-0 overflow-x-hidden">

      {/* ─── UTILITY BAR ─── */}
      <div className="bg-[#fcfcfc] border-b border-gray-100 hidden md:flex justify-between items-center px-8 py-2 text-[10px] font-medium tracking-widest uppercase text-gray-500">
        <div className="flex space-x-6">
          <a href="#" className="hover:text-[#81d8d0] transition-colors flex items-center"><MapPin className="w-3 h-3 mr-1.5" /> Client Care</a>
          <a href="#" className="hover:text-[#81d8d0] transition-colors flex items-center"><Phone className="w-3 h-3 mr-1.5" /> Book an Appointment</a>
        </div>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-[#81d8d0] transition-colors">United States</a>
          <a href="#" className="hover:text-[#81d8d0] transition-colors">Store Locator</a>
        </div>
      </div>

      {/* ─── HEADER ─── */}
      <header className="bg-white sticky top-0 z-50 transition-all h-[90px] border-b border-gray-100">
        <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-12 h-full flex items-center justify-between">

          <div className="flex items-center space-x-8">
            <nav className="hidden lg:flex space-x-8 font-serif text-[14px] tracking-wide text-[#333]">
              <div className="group relative cursor-pointer py-8">
                <a href="#" className="group-hover:text-[#81d8d0] transition-colors">Jewelry</a>
                <div className="absolute top-full left-0 w-max bg-white border border-gray-100 shadow-xl opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all flex p-8 gap-12 z-50">
                  <div className="flex flex-col gap-3 text-[12px] font-sans tracking-widest uppercase text-gray-500">
                    <h4 className="text-[#333] font-serif capitalize text-[16px] tracking-normal mb-2">Shop by Category</h4>
                    <a href="#" className="hover:text-[#81d8d0] transition-colors">Necklaces & Pendants</a>
                    <a href="#" className="hover:text-[#81d8d0] transition-colors">Bracelets</a>
                    <a href="#" className="hover:text-[#81d8d0] transition-colors">Earrings</a>
                    <a href="#" className="hover:text-[#81d8d0] transition-colors">Rings</a>
                    <a href="#" className="hover:text-[#81d8d0] transition-colors">Brooches</a>
                  </div>
                  <div className="flex flex-col gap-3 text-[12px] font-sans tracking-widest uppercase text-gray-500">
                    <h4 className="text-[#333] font-serif capitalize text-[16px] tracking-normal mb-2">Collections</h4>
                    <a href="#" className="hover:text-[#81d8d0] transition-colors">BlueClassic Lock</a>
                    <a href="#" className="hover:text-[#81d8d0] transition-colors">Return to BlueClassic®</a>
                    <a href="#" className="hover:text-[#81d8d0] transition-colors">BlueClassic HardWear</a>
                    <a href="#" className="hover:text-[#81d8d0] transition-colors">BlueClassic T</a>
                    <a href="#" className="hover:text-[#81d8d0] transition-colors">Elsa Peretti®</a>
                  </div>
                </div>
              </div>
              <div className="py-8"><a href="#" className="hover:text-[#81d8d0] transition-colors">High Jewelry</a></div>
              <div className="py-8"><a href="#" className="hover:text-[#81d8d0] transition-colors">Fine Watches</a></div>
              <div className="py-8"><a href="#" className="hover:text-[#81d8d0] transition-colors">Home & Accessories</a></div>
              <div className="py-8"><a href="#" className="hover:text-[#81d8d0] transition-colors">Love & Engagement</a></div>
            </nav>
            <div className="lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </div>
          </div>

          <div className="flex items-center justify-center cursor-pointer absolute left-1/2 -translate-x-1/2">
            <span className="font-serif text-[32px] md:text-[44px] tracking-widest uppercase leading-none text-[#333333]">
              BlueClassic.
            </span>
          </div>

          <div className="flex items-center space-x-6 text-[#333333]">
            <Search className="w-5 h-5 cursor-pointer hover:text-[#81d8d0] transition-colors" strokeWidth={1.5} />
            <User className="hidden md:block w-5 h-5 cursor-pointer hover:text-[#81d8d0] transition-colors" strokeWidth={1.5} />
            <Heart className="hidden md:block w-5 h-5 cursor-pointer hover:text-[#81d8d0] transition-colors" strokeWidth={1.5} />
            <div className="relative cursor-pointer hover:text-[#81d8d0] transition-colors">
              <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
            </div>
          </div>
        </div>
      </header>

      {/* ─── URGENCY BANNER (LUXURY STYLE) ─── */}
      <div className="bg-[#81d8d0] text-black text-[10px] md:text-[11px] py-2.5 px-6 flex justify-center font-bold tracking-[0.2em] uppercase">
        Complimentary Shipping and Returns on All Orders
      </div>

      <main className="w-full">

        {/* ─── HERO BANNER ─── */}
        <section className="relative w-full h-[600px] md:h-[800px] flex justify-center items-center overflow-hidden bg-[#f4f4f4]">
          <Image
            src={data.bannerImage}
            alt="BlueClassic."
            fill
            className="object-cover object-center"
            priority
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/5" />

          <div className="absolute inset-0 flex flex-col items-center justify-end text-center p-8 md:p-16 text-white pb-24 md:pb-32">
            <div className="max-w-2xl bg-black/20 backdrop-blur-sm p-10 px-12 rounded-sm border border-white/20">
              <h1 className="text-[40px] md:text-[60px] font-serif mb-6 leading-tight drop-shadow-md">
                {data.name}
              </h1>
              <p className="text-[12px] md:text-[14px] font-sans font-medium tracking-[0.2em] uppercase mb-10 text-white/90">
                {data.description || 'Discover extraordinary creations that capture the essence of luxury.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-[#333333] px-14 py-4 font-sans font-medium uppercase text-[11px] tracking-[0.25em] hover:bg-[#81d8d0] hover:text-white transition-all shadow-lg border border-transparent">
                  Explore The Collection
                </button>
                <button className="bg-transparent border border-white text-white px-14 py-4 font-sans font-medium uppercase text-[11px] tracking-[0.25em] hover:bg-white hover:text-[#333333] transition-all shadow-lg">
                  Shop Gifts
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ─── THE COLLECTION / GRID ─── */}
        <section className="max-w-[1600px] mx-auto px-6 lg:px-12 py-24 md:py-32">
          <div className="text-center mb-20 flex flex-col items-center">
            <h2 className="text-[32px] md:text-[40px] font-serif text-[#333333] mb-6">Signature Designs</h2>
            <div className="w-[60px] h-[1px] bg-[#81d8d0]"></div>
            <p className="mt-8 text-[14px] text-gray-500 max-w-2xl mx-auto leading-relaxed font-sans">
              From the iconic Return to BlueClassic® collection to the modern BlueClassic Lock, explore our most coveted designs crafted to be cherished for a lifetime.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {products.map((product, idx) => (
              <div key={product.id || idx} data-product-id={product.id} className="group cursor-pointer flex flex-col items-center text-center">
                <div className="relative aspect-[4/5] overflow-hidden w-full bg-[#fdfdfd] border border-gray-100 mb-8 transition-shadow group-hover:shadow-[0_20px_40px_rgba(129,216,208,0.1)]">
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    fill
                    className="object-contain p-10 group-hover:scale-110 transition-transform duration-[2000ms] ease-out"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 right-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <Heart className="w-5 h-5 hover:text-[#81d8d0]" strokeWidth={1} />
                  </div>
                </div>

                <div className="flex flex-col w-full px-4">
                  <div className="text-[10px] font-sans font-medium uppercase tracking-[0.2em] text-gray-400 mb-3">
                    {product.category || 'Jewelry'}
                  </div>
                  <h3 className="text-[15px] font-serif text-[#333333] mb-3 line-clamp-2 leading-relaxed h-[44px]">
                    {product.title}
                  </h3>
                  <div className="flex items-center justify-center space-x-3 mt-4">
                    <span className="font-sans font-medium text-[13px] tracking-widest text-[#333333]">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="font-sans font-medium text-[11px] tracking-widest text-[#81d8d0] line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 flex justify-center">
            <button className="bg-transparent border border-[#333] text-[#333] px-14 py-4 font-sans font-medium uppercase text-[11px] tracking-[0.25em] hover:bg-[#333] hover:text-white transition-all">
              View All Jewelry
            </button>
          </div>
        </section>

        {/* ─── FEATURE STORY ─── */}
        <section className="bg-stone-50">
          <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row items-stretch">
            <div className="w-full lg:w-1/2 p-12 md:p-24 lg:p-32 flex flex-col justify-center items-center lg:items-start text-center lg:text-left h-[500px] lg:h-auto">
              <div className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-[#81d8d0] mb-8">
                The BlueClassic Diamond
              </div>
              <h2 className="text-[40px] md:text-[50px] font-serif text-[#333] leading-tight mb-8">
                A Legacy of Brilliance
              </h2>
              <p className="text-[15px] text-gray-500 max-w-md leading-loose mb-12 font-serif italic">
                Discover the world's most beautiful diamonds, sustainably sourced and meticulously crafted by our master artisans to maximize their unparalleled brilliance and fire.
              </p>
              <a href="#" className="font-sans text-[11px] font-medium uppercase tracking-[0.2em] flex items-center border-b border-[#333] pb-1 hover:text-[#81d8d0] hover:border-[#81d8d0] transition-colors">
                Explore Diamonds <ChevronRight className="w-4 h-4 ml-2" />
              </a>
            </div>
            <div className="w-full lg:w-1/2 relative aspect-square lg:aspect-auto min-h-[500px] lg:min-h-[800px]">
              <Image src="https://picsum.photos/1000/1200?random=901" alt="The BlueClassic Diamond" fill className="object-cover" />
            </div>
          </div>
        </section>

        {/* ─── ICONIC CATEGORIES ─── */}
        <section className="max-w-[1600px] mx-auto px-6 lg:px-12 py-24 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">

            <div className="group cursor-pointer flex flex-col items-center">
              <div className="relative aspect-[4/5] w-full overflow-hidden mb-8">
                <Image src="https://picsum.photos/600/800?random=910" alt="Engagement Rings" fill className="object-cover group-hover:scale-105 transition-transform duration-[2000ms] ease-out" />
              </div>
              <h3 className="text-[22px] font-serif text-[#333] mb-4">Engagement Rings</h3>
              <a href="#" className="font-sans text-[10px] uppercase font-bold tracking-[0.2em] border-b border-gray-300 pb-1 text-gray-500 group-hover:text-[#81d8d0] group-hover:border-[#81d8d0] transition-colors">
                Shop Now
              </a>
            </div>

            <div className="group cursor-pointer flex flex-col items-center">
              <div className="relative aspect-[4/5] w-full overflow-hidden mb-8">
                <Image src="https://picsum.photos/600/800?random=911" alt="Gifts" fill className="object-cover group-hover:scale-105 transition-transform duration-[2000ms] ease-out" />
              </div>
              <h3 className="text-[22px] font-serif text-[#333] mb-4">Exceptional Gifts</h3>
              <a href="#" className="font-sans text-[10px] uppercase font-bold tracking-[0.2em] border-b border-gray-300 pb-1 text-gray-500 group-hover:text-[#81d8d0] group-hover:border-[#81d8d0] transition-colors">
                Shop Gifts
              </a>
            </div>

            <div className="group cursor-pointer flex flex-col items-center">
              <div className="relative aspect-[4/5] w-full overflow-hidden mb-8">
                <Image src="https://picsum.photos/600/800?random=912" alt="Home & Accessories" fill className="object-cover group-hover:scale-105 transition-transform duration-[2000ms] ease-out" />
              </div>
              <h3 className="text-[22px] font-serif text-[#333] mb-4">Home & Accessories</h3>
              <a href="#" className="font-sans text-[10px] uppercase font-bold tracking-[0.2em] border-b border-gray-300 pb-1 text-gray-500 group-hover:text-[#81d8d0] group-hover:border-[#81d8d0] transition-colors">
                Explore
              </a>
            </div>

          </div>
        </section>

      </main>

      {/* ─── INFO BANNER ─── */}
      <div className="bg-[#81d8d0] text-center py-20 px-6 text-[#333333]">
        <h2 className="text-[24px] md:text-[32px] font-serif mb-6">The BlueClassic Experience</h2>
        <p className="max-w-xl mx-auto text-[14px] font-sans leading-relaxed text-[#333]/80 mb-10">
          From the iconic Blue Box® to personalized engraving and complimentary diamond consultations, discover the exceptional services that make BlueClassic. extraordinary.
        </p>
        <button className="bg-transparent border border-[#333] text-[#333] px-10 py-3.5 font-sans font-medium uppercase text-[10px] tracking-[0.25em] hover:bg-[#333] hover:text-[#81d8d0] transition-all">
          Discover Services
        </button>
      </div>

      {/* ─── FOOTER ─── */}
      <footer className="bg-[#fdfdfd] text-[#333] pt-24 pb-12 border-t border-gray-200">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">

          <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-200 pb-16 mb-16">
            <span className="font-serif text-[36px] md:text-[44px] tracking-widest uppercase text-[#333] mb-8 md:mb-0">
              BlueClassic.
            </span>
            <div className="flex flex-col sm:flex-row items-center gap-6 text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-gray-500">
              <a href="#" className="hover:text-[#81d8d0] transition-colors flex items-center"><MapPin className="w-4 h-4 mr-2" /> Find a Store</a>
              <a href="#" className="hover:text-[#81d8d0] transition-colors flex items-center"><Phone className="w-4 h-4 mr-2" /> Client Care</a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">

            <div className="flex flex-col space-y-6">
              <h4 className="font-serif text-[18px] text-[#333] mb-2">Customer Care</h4>
              <div className="flex flex-col space-y-4 text-[11px] font-sans font-medium uppercase tracking-widest text-gray-500">
                <a href="#" className="hover:text-[#81d8d0] transition-colors">Contact Us</a>
                <a href="#" className="hover:text-[#81d8d0] transition-colors">Track Your Order</a>
                <a href="#" className="hover:text-[#81d8d0] transition-colors">Returns & Exchanges</a>
                <a href="#" className="hover:text-[#81d8d0] transition-colors">Shipping Information</a>
                <a href="#" className="hover:text-[#81d8d0] transition-colors">Product Care</a>
              </div>
            </div>

            <div className="flex flex-col space-y-6">
              <h4 className="font-serif text-[18px] text-[#333] mb-2">Our Company</h4>
              <div className="flex flex-col space-y-4 text-[11px] font-sans font-medium uppercase tracking-widest text-gray-500">
                <a href="#" className="hover:text-[#81d8d0] transition-colors">World of BlueClassic</a>
                <a href="#" className="hover:text-[#81d8d0] transition-colors">Sustainability</a>
                <a href="#" className="hover:text-[#81d8d0] transition-colors">Careers</a>
                <a href="#" className="hover:text-[#81d8d0] transition-colors">Site Index</a>
                <a href="#" className="hover:text-[#81d8d0] transition-colors">BlueClassic Foundation</a>
              </div>
            </div>

            <div className="flex flex-col space-y-6">
              <h4 className="font-serif text-[18px] text-[#333] mb-2">Related Sites</h4>
              <div className="flex flex-col space-y-4 text-[11px] font-sans font-medium uppercase tracking-widest text-gray-500">
                <a href="#" className="hover:text-[#81d8d0] transition-colors">Wedding & Gift Registry</a>
                <a href="#" className="hover:text-[#81d8d0] transition-colors">Business Accounts</a>
                <a href="#" className="hover:text-[#81d8d0] transition-colors">BlueClassic for the Press</a>
                <a href="#" className="hover:text-[#81d8d0] transition-colors">The BlueClassic. Foundation</a>
              </div>
            </div>

            <div className="flex flex-col space-y-6">
              <h4 className="font-serif text-[18px] text-[#333] mb-2">Latest from BlueClassic</h4>
              <p className="text-[12px] font-sans text-gray-500 leading-relaxed font-medium">Be the first to know about exciting new designs, special events, store openings and much more.</p>
              <form className="mt-4 border-b border-[#333] flex pb-2 group">
                <input type="email" placeholder="Email Address" className="bg-transparent w-full outline-none text-[12px] font-sans text-[#333] placeholder-gray-400 focus:placeholder-transparent transition-all" />
                <button type="button" className="text-[10px] font-bold text-[#333] uppercase tracking-[0.2em] group-hover:text-[#81d8d0] transition-colors">Sign Up</button>
              </form>
            </div>

          </div>

          <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between text-[10px] font-sans font-medium uppercase tracking-[0.15em] text-gray-400 space-y-4 md:space-y-0">
            <div className="flex space-x-8">
              <a href="#" className="hover:text-[#81d8d0] transition-colors">Terms of Use</a>
              <a href="#" className="hover:text-[#81d8d0] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#81d8d0] transition-colors">Cookie Notice</a>
              <a href="#" className="hover:text-[#81d8d0] transition-colors">Accessibility</a>
            </div>
            <span>© 2026 BlueClassic AND COMPANY. ALL RIGHTS RESERVED.</span>
          </div>

        </div>
      </footer>
    </div>
  );
}
