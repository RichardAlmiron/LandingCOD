import React from 'react';
import Image from 'next/image';
import { StoreData } from '@/lib/types';
import { Search, ShoppingBag, Heart, User, MapPin, Star, Gift, ChevronRight } from 'lucide-react';

export default function BeautyHavenTemplate({ data }: { data: StoreData }) {
  const products = data.products;

  return (
    <div className="min-h-full bg-white font-sans text-[#1a1a1a] selection:bg-[#f26b21] selection:text-white pb-0 overflow-x-hidden">

      {/* ─── BeautyHaven PROMO BAR ─── */}
      <div className="bg-[#f26b21] text-white text-[11px] md:text-[13px] py-2 md:py-2.5 px-6 flex justify-center text-center font-bold tracking-wide w-full shadow-sm">
        <span className="flex items-center">
          <Gift className="w-4 h-4 mr-2 hidden sm:block" />
          Free standard shipping on any $35 purchase. <a href="#" className="underline ml-1 hover:text-orange-100">Details</a>
        </span>
      </div>

      {/* ─── HEADER ─── */}
      <header className="bg-white sticky top-0 z-50 transition-all border-b border-gray-200">

        {/* Top Header Row */}
        <div className="w-full max-w-[1440px] mx-auto px-4 md:px-6 h-[72px] lg:h-[88px] flex items-center justify-between">

          <div className="flex items-center space-x-6">
            <div className="lg:hidden flex flex-col space-y-1 cursor-pointer p-2">
              <span className="w-6 h-0.5 bg-[#1a1a1a] block rounded-full"></span>
              <span className="w-6 h-0.5 bg-[#1a1a1a] block rounded-full"></span>
              <span className="w-6 h-0.5 bg-[#1a1a1a] block rounded-full"></span>
            </div>

            <div className="flex flex-col items-center justify-center cursor-pointer">
              <span className="font-sans text-[32px] md:text-[42px] font-black tracking-tighter leading-none text-[#1a1a1a]">
                BeautyHaven
                <span className="text-[#df2e82] text-[10px] md:text-[12px] align-top ml-1 font-bold tracking-widest block -mt-1 md:-mt-2">BEAUTY</span>
              </span>
            </div>
          </div>

          <div className="hidden lg:flex flex-1 max-w-2xl mx-8 relative">
            <input type="text" placeholder="Search for a brand, product, or category..." className="w-full bg-gray-100 border border-transparent focus:border-[#f26b21] focus:bg-white text-[#1a1a1a] rounded-full py-3 px-6 pl-12 font-medium text-[14px] outline-none transition-all shadow-inner" />
            <Search className="w-5 h-5 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" strokeWidth={2.5} />
          </div>

          <div className="flex items-center space-x-3 md:space-x-6 text-[#1a1a1a]">
            <Search className="lg:hidden w-6 h-6 cursor-pointer hover:text-[#f26b21] transition-colors" strokeWidth={2} />

            <div className="hidden md:flex flex-col items-center cursor-pointer hover:text-[#f26b21] transition-colors group">
              <MapPin className="w-6 h-6 mb-1" strokeWidth={1.5} />
              <span className="text-[10px] font-bold uppercase tracking-wider hidden xl:block group-hover:underline">Stores & Services</span>
            </div>

            <div className="flex flex-col items-center cursor-pointer hover:text-[#f26b21] transition-colors group">
              <User className="w-6 h-6 mb-1" strokeWidth={1.5} />
              <span className="text-[10px] font-bold uppercase tracking-wider hidden xl:block group-hover:underline">Sign In</span>
            </div>

            <div className="relative cursor-pointer hover:text-[#f26b21] transition-colors group flex flex-col items-center">
              <div className="relative">
                <ShoppingBag className="w-6 h-6 mb-1" strokeWidth={1.5} />
                <span className="absolute -top-1.5 -right-2 bg-[#df2e82] text-white text-[10px] font-black px-1.5 py-0.5 rounded-full leading-none shadow-sm">0</span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider hidden xl:block group-hover:underline">Bag</span>
            </div>
          </div>
        </div>

        {/* Bottom Navigation Row */}
        <nav className="hidden lg:flex justify-center w-full max-w-[1440px] mx-auto space-x-8 pb-3 font-sans text-[13px] font-bold text-[#1a1a1a]">
          <a href="#" className="hover:text-[#f26b21] hover:underline underline-offset-8 decoration-2 transition-all pb-2">Makeup</a>
          <a href="#" className="hover:text-[#f26b21] hover:underline underline-offset-8 decoration-2 transition-all pb-2">Skin Care</a>
          <a href="#" className="hover:text-[#f26b21] hover:underline underline-offset-8 decoration-2 transition-all pb-2">Hair</a>
          <a href="#" className="hover:text-[#f26b21] hover:underline underline-offset-8 decoration-2 transition-all pb-2">Fragrance</a>
          <a href="#" className="hover:text-[#f26b21] hover:underline underline-offset-8 decoration-2 transition-all pb-2">Bath & Body</a>
          <a href="#" className="hover:text-[#f26b21] hover:underline underline-offset-8 decoration-2 transition-all pb-2">Tools & Brushes</a>
          <a href="#" className="hover:text-[#f26b21] hover:underline underline-offset-8 decoration-2 transition-all pb-2">Brands</a>
          <a href="#" className="text-[#df2e82] hover:underline underline-offset-8 decoration-2 transition-all pb-2 flex items-center">
            Sale & Coupons <ChevronRight className="w-3 h-3 ml-1" />
          </a>
        </nav>
      </header>

      <main className="w-full">

        {/* ─── HERO BANNER ─── */}
        <section className="w-full max-w-[1440px] mx-auto md:px-6 py-6 group cursor-pointer">
          <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden md:rounded-[24px]">
            <Image
              src={data.bannerImage}
              alt="BeautyHaven Beauty Campaign"
              fill
              className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-[3000ms] ease-out"
              priority
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />

            <div className="absolute inset-y-0 left-0 w-full md:w-2/3 flex flex-col justify-center text-white p-8 md:p-16">
              <span className="bg-[#f26b21] text-white text-[12px] font-black uppercase tracking-widest px-3 py-1 rounded w-max mb-4 shadow-lg">
                New & Exclusive
              </span>
              <h1 className="text-[40px] md:text-[64px] font-black tracking-tighter mb-4 leading-none drop-shadow-lg text-balance">
                {data.name}
              </h1>
              <p className="text-[16px] md:text-[20px] font-medium mb-8 drop-shadow-md text-white/90 max-w-lg">
                {data.description || 'Discover the latest must-haves in makeup, skincare, and hair.'}
              </p>
              <div className="flex gap-4">
                <button className="bg-white text-[#1a1a1a] px-8 py-3.5 rounded-full font-black text-[14px] hover:bg-gray-100 transition-colors shadow-xl">
                  Shop Now
                </button>
                <button className="bg-transparent border-2 border-white text-white px-8 py-3.5 rounded-full font-black text-[14px] hover:bg-white/10 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ─── REWARDS / BRAND PROMO STRIP ─── */}
        <section className="w-full border-y border-gray-200 bg-orange-50/50 my-8">
          <div className="max-w-[1440px] mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow border border-orange-100 mr-4">
                <span className="font-black text-[#f26b21] text-xl">U</span>
              </div>
              <div>
                <h3 className="font-black text-[18px] text-[#1a1a1a] tracking-tight">BeautyHaven Beauty Rewards™</h3>
                <p className="font-medium text-[13px] text-gray-600">Earn points, get free gifts, and enjoy exclusive perks.</p>
              </div>
            </div>
            <button className="bg-[#f26b21] text-white px-8 py-3 rounded-full font-black text-[13px] hover:bg-[#d95918] transition-colors shadow flex items-center w-full md:w-auto justify-center">
              Join For Free <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </section>

        {/* ─── SHOP BY CATEGORY (BUBBLES) ─── */}
        <section className="max-w-[1440px] mx-auto px-6 py-10">
          <h2 className="text-[24px] font-black tracking-tighter text-[#1a1a1a] mb-8 text-center md:text-left">Shop by category</h2>
          <div className="flex justify-start md:justify-center overflow-x-auto hide-scrollbar gap-6 md:gap-12 pb-4">
            {['Makeup', 'Skin Care', 'Hair', 'Fragrance', 'Bath & Body', 'Nails'].map((cat, i) => (
              <a key={i} href="#" className="flex flex-col items-center group min-w-[80px]">
                <div className="w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden mb-3 border-2 border-transparent group-hover:border-[#df2e82] transition-colors shadow-sm relative">
                  <Image src={`https://picsum.photos/200/200?random=${995 + i}`} alt={cat} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <span className="font-bold text-[13px] md:text-[14px] text-center text-[#1a1a1a] group-hover:text-[#df2e82] transition-colors">{cat}</span>
              </a>
            ))}
          </div>
        </section>

        {/* ─── NEW ARRIVALS GRID ─── */}
        <section className="max-w-[1440px] mx-auto px-4 md:px-6 py-16">
          <div className="flex items-end justify-between mb-8 border-b-2 border-gray-100 pb-3">
            <h2 className="text-[28px] md:text-[36px] font-black tracking-tighter text-[#1a1a1a] leading-none">
              New Arrivals
            </h2>
            <a href="#" className="text-[14px] font-bold text-[#f26b21] hover:text-[#d95918] hover:underline transition-colors hidden sm:flex items-center">
              Shop All New <ChevronRight className="w-4 h-4 ml-1" />
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {products.map((product, idx) => (
              <div key={product.id || idx} data-product-id={product.id} className="group cursor-pointer flex flex-col bg-white border border-gray-100 p-4 rounded-xl hover:shadow-xl transition-shadow duration-300 relative h-full">

                {/* Sale / GWP Bagdes */}
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-1">
                  {product.originalPrice && (
                    <span className="bg-[#df2e82] text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded shadow-sm">
                      Sale
                    </span>
                  )}
                  {idx % 3 === 0 && (
                    <span className="bg-[#f26b21] text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded shadow-sm">
                      Gift with Purchase
                    </span>
                  )}
                </div>

                {/* Favorite Button */}
                <button className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-gray-400 hover:text-[#df2e82] hover:bg-white shadow-sm transition-all md:opacity-0 group-hover:opacity-100">
                  <Heart className="w-4 h-4 fill-transparent hover:fill-current" />
                </button>

                <div className="relative w-full aspect-square mb-4 bg-white flex items-center justify-center overflow-hidden rounded-lg">
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    fill
                    className="object-contain p-2 group-hover:scale-105 transition-transform duration-[800ms] ease-out"
                    referrerPolicy="no-referrer"
                  />

                  {/* Quick Look Overlay */}
                  <div className="absolute bottom-2 inset-x-2 opacity-0 group-hover:opacity-100 transition-opacity hidden lg:block">
                    <button className="w-full bg-black/80 backdrop-blur-md text-white font-bold text-[12px] py-2.5 rounded hover:bg-black transition-colors">
                      Quick Look
                    </button>
                  </div>
                </div>

                <div className="flex flex-col flex-1">
                  <div className="font-bold text-[13px] text-[#1a1a1a] mb-1 line-clamp-1">
                    {product.category || 'Beauty Brand'}
                  </div>
                  <h3 className="text-[13px] text-gray-600 font-medium leading-snug line-clamp-2 md:h-[38px] mb-2 hover:underline">
                    {product.title}
                  </h3>

                  <div className="flex items-center space-x-1 mb-3 mt-auto">
                    <div className="flex text-[#f26b21]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="text-[12px] text-gray-500 font-medium ml-1">(12{idx}4)</span>
                  </div>

                  <div className="flex flex-col items-start gap-0.5">
                    {product.originalPrice ? (
                      <div className="flex items-center space-x-2">
                        <span className="font-black text-[18px] text-[#df2e82]">${product.price}</span>
                        <span className="text-[12px] text-gray-500 line-through">${product.originalPrice}</span>
                      </div>
                    ) : (
                      <span className="font-black text-[18px] text-[#1a1a1a]">${product.price}</span>
                    )}
                  </div>
                </div>

                <button className="w-full mt-4 bg-white border-2 border-[#1a1a1a] text-[#1a1a1a] font-black text-[13px] py-2 rounded-[8px] hover:bg-[#1a1a1a] hover:text-white transition-colors lg:hidden group-hover:flex justify-center items-center">
                  Add to Bag
                </button>
              </div>
            ))}
          </div>

          <div className="mt-12 flex justify-center lg:hidden">
            <button className="bg-white border-2 border-[#f26b21] text-[#f26b21] px-10 py-3.5 rounded-full font-black text-[14px] w-full">
              Shop All New Arrivals
            </button>
          </div>
        </section>

      </main>

      {/* ─── FOOTER ─── */}
      <footer className="bg-gray-50 pt-20 pb-12 mt-10">
        <div className="w-full max-w-[1440px] mx-auto px-6">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

            <div className="flex flex-col space-y-4">
              <span className="font-sans text-[28px] font-black tracking-tighter leading-none text-[#1a1a1a] mb-2 block">
                BeautyHaven<span className="text-[#df2e82] text-[9px] align-top ml-1 font-bold tracking-widest leading-none">BEAUTY</span>
              </span>
              <p className="text-[14px] text-gray-600 font-medium leading-relaxed mb-4">
                Stay in the know! Sign up for emails to get the scoop on new product drops, exclusive offers & more.
              </p>
              <button className="bg-[#f26b21] text-white px-8 py-3 rounded-full font-black text-[14px] hover:bg-[#d95918] transition-colors shadow-sm w-max">
                Sign Up For Emails
              </button>
              <div className="flex space-x-6 mt-6 pt-6">
                <a href="#" className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-[#df2e82] hover:text-white transition-colors">IN</a>
                <a href="#" className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-[#df2e82] hover:text-white transition-colors">FB</a>
                <a href="#" className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-[#df2e82] hover:text-white transition-colors">YT</a>
              </div>
            </div>

            <div className="flex flex-col space-y-3">
              <h4 className="text-[#1a1a1a] font-black text-[16px] mb-3">Customer Service</h4>
              <a href="#" className="hover:text-[#f26b21] font-medium text-gray-600 transition-colors">Help Center</a>
              <a href="#" className="hover:text-[#f26b21] font-medium text-gray-600 transition-colors">Order Status</a>
              <a href="#" className="hover:text-[#f26b21] font-medium text-gray-600 transition-colors">Shipping & Returns</a>
              <a href="#" className="hover:text-[#f26b21] font-medium text-gray-600 transition-colors">Find a Store</a>
              <a href="#" className="hover:text-[#f26b21] font-medium text-gray-600 transition-colors">Contact Us</a>
            </div>

            <div className="flex flex-col space-y-3">
              <h4 className="text-[#1a1a1a] font-black text-[16px] mb-3">About Us</h4>
              <a href="#" className="hover:text-[#f26b21] font-medium text-gray-600 transition-colors">Our Company</a>
              <a href="#" className="hover:text-[#f26b21] font-medium text-gray-600 transition-colors">Careers</a>
              <a href="#" className="hover:text-[#f26b21] font-medium text-gray-600 transition-colors">Investors</a>
              <a href="#" className="hover:text-[#f26b21] font-medium text-gray-600 transition-colors">Diversity, Equity & Inclusion</a>
              <a href="#" className="hover:text-[#f26b21] font-medium text-gray-600 transition-colors">Corporate Responsibility</a>
            </div>

            <div className="flex flex-col space-y-3">
              <h4 className="text-[#1a1a1a] font-black text-[16px] mb-3">Services</h4>
              <a href="#" className="hover:text-[#f26b21] font-medium text-gray-600 transition-colors">The Salon at BeautyHaven Beauty</a>
              <a href="#" className="hover:text-[#f26b21] font-medium text-gray-600 transition-colors">Book an Appointment</a>
              <a href="#" className="hover:text-[#f26b21] font-medium text-gray-600 transition-colors">Gift Cards</a>
              <a href="#" className="hover:text-[#f26b21] font-medium text-gray-600 transition-colors">BeautyHaven Beauty Rewards™ Credit Card</a>
            </div>

          </div>

          <div className="pt-8 border-t border-gray-200 flex flex-col items-center justify-center text-[12px] font-bold text-gray-500 space-y-4">
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              <a href="#" className="hover:text-[#f26b21] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#f26b21] transition-colors">Terms & Conditions</a>
              <a href="#" className="hover:text-[#f26b21] transition-colors">California Transparency in Supply Chains Act</a>
              <a href="#" className="hover:text-[#f26b21] transition-colors">Do Not Sell My Personal Information</a>
            </div>
            <span className="font-normal">© 2026 BeautyHaven BEAUTY COSMETICS & FRAGRANCE, INC. ALL RIGHTS RESERVED.</span>
          </div>

        </div>
      </footer>
    </div>
  );
}
