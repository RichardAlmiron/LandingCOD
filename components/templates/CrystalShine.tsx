import React from 'react';
import Image from 'next/image';
import { StoreData } from '@/lib/types';
import { Search, ShoppingBag, Heart, User, MapPin, ChevronRight, Menu } from 'lucide-react';

const CrystalShineSwan = ({ className, color = "#111" }: { className?: string, color?: string }) => (
  // Highly simplified swan abstraction representing the CrystalShine logo
  <svg viewBox="0 0 100 100" fill={color} xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M70 20C75 25 78 35 72 45C68 53 58 60 50 63C40 66 28 65 20 62C25 58 35 55 42 53C48 51 52 48 55 42C58 36 55 28 50 25C47 23 42 22 38 24C33 26 30 31 30 35C30 38 31 40 33 42C33 42 31 43 27 41C24 38 23 33 24 28C26 22 32 17 38 15C48 12 60 12 70 20Z" />
    <path d="M75 52C82 58 85 68 80 78C75 88 62 92 50 92C38 92 25 88 15 80C14 79 16 77 18 78C26 84 38 88 50 88C62 88 72 84 76 76C80 68 76 60 70 55C68 53 72 50 75 52Z" />
    <circle cx="62" cy="32" r="2" />
  </svg>
);

// Helper for the Octagon clip-path used heavily in CrystalShine's new branding
const OctagonWrapper = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div
    className={`relative overflow-hidden ${className || ''}`}
    style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' }}
  >
    {children}
  </div>
);

export default function CrystalShineTemplate({ data }: { data: StoreData }) {
  const products = data.products;

  return (
    <div className="min-h-full bg-white font-sans text-[#111111] selection:bg-[#f5d5e5] selection:text-[#111] pb-0 overflow-x-hidden">

      {/* ─── TOP PROMO BAR (Vibrant Pink) ─── */}
      <div className="bg-[#f5d5e5] text-[#111] text-[11px] py-2 px-6 flex justify-center font-bold tracking-[0.15em] uppercase border-b border-[#111]/10">
        Enjoy Free Standard Shipping on Orders Over $75
      </div>

      {/* ─── HEADER ─── */}
      <header className="bg-white sticky top-0 z-50 transition-all border-b border-gray-200">
        <div className="w-full mx-auto px-6 h-[72px] lg:h-[88px] flex items-center justify-between">

          <div className="flex items-center space-x-6">
            <Menu className="w-6 h-6 lg:hidden cursor-pointer" />
            <nav className="hidden lg:flex space-x-6 font-sans text-[12px] font-bold uppercase tracking-[0.1em] text-[#111]">
              <div className="group relative py-8">
                <a href="#" className="hover:text-gray-500 transition-colors">Jewelry</a>
                <div className="absolute top-full left-0 w-[600px] bg-white border border-gray-100 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all flex p-8 gap-12 z-50">
                  <div className="flex flex-col gap-4 text-[12px] font-sans text-gray-600">
                    <h4 className="text-[#111] font-bold uppercase tracking-widest mb-1">Categories</h4>
                    <a href="#" className="hover:text-[#111] transition-colors">Necklaces & Pendants</a>
                    <a href="#" className="hover:text-[#111] transition-colors">Earrings</a>
                    <a href="#" className="hover:text-[#111] transition-colors">Bracelets</a>
                    <a href="#" className="hover:text-[#111] transition-colors">Rings</a>
                    <a href="#" className="hover:text-[#111] transition-colors">Brooches & Pins</a>
                  </div>
                  <div className="flex flex-col gap-4 text-[12px] font-sans text-gray-600 border-l border-gray-100 pl-12">
                    <h4 className="text-[#111] font-bold uppercase tracking-widest mb-1">Collections</h4>
                    <a href="#" className="hover:text-[#111] transition-colors">Millenia</a>
                    <a href="#" className="hover:text-[#111] transition-colors">Matrix</a>
                    <a href="#" className="hover:text-[#111] transition-colors">Lucent</a>
                    <a href="#" className="hover:text-[#111] transition-colors">Constella</a>
                    <a href="#" className="hover:text-[#111] transition-colors">Hyperbola</a>
                  </div>
                </div>
              </div>
              <div className="py-8"><a href="#" className="hover:text-gray-500 transition-colors">Watches</a></div>
              <div className="py-8"><a href="#" className="hover:text-gray-500 transition-colors">Decorations</a></div>
              <div className="py-8"><a href="#" className="hover:text-gray-500 transition-colors">Accessories</a></div>
              <div className="py-8"><a href="#" className="text-[#b30047] hover:opacity-70 transition-opacity">Gifts</a></div>
            </nav>
          </div>

          <div className="flex flex-col items-center justify-center cursor-pointer absolute left-1/2 -translate-x-1/2 mt-2">
            <CrystalShineSwan className="w-8 h-8 lg:w-10 lg:h-10 mb-1" color="#111" />
            <span className="font-serif text-[18px] lg:text-[22px] tracking-[0.2em] uppercase leading-none text-[#111]">
              CrystalShine
            </span>
          </div>

          <div className="flex items-center space-x-4 lg:space-x-6 text-[#111]">
            <Search className="w-5 h-5 cursor-pointer hover:text-gray-500 transition-colors" strokeWidth={1.5} />
            <MapPin className="hidden md:block w-5 h-5 cursor-pointer hover:text-gray-500 transition-colors" strokeWidth={1.5} />
            <User className="hidden md:block w-5 h-5 cursor-pointer hover:text-gray-500 transition-colors" strokeWidth={1.5} />
            <Heart className="w-5 h-5 cursor-pointer hover:text-gray-500 transition-colors" strokeWidth={1.5} />
            <div className="relative cursor-pointer hover:text-gray-500 transition-colors">
              <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
              <span className="absolute -top-1 -right-2 bg-[#f5d5e5] text-[#111] text-[9px] font-bold px-1 rounded-full">0</span>
            </div>
          </div>
        </div>
      </header>

      <main className="w-full">

        {/* ─── HIGHER GLAMOUR HERO BANNER (Vibrant Green & Pink Theme) ─── */}
        <section className="relative w-full h-[600px] lg:h-[800px] flex justify-center items-center bg-[#0e4e3b] overflow-hidden">
          <Image
            src={data.bannerImage}
            alt="CrystalShine WonderColor"
            fill
            className="object-cover object-center mix-blend-overlay opacity-50"
            priority
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e4e3b] via-transparent to-transparent opacity-80" />

          <div className="relative z-10 flex flex-col items-center justify-center text-center p-6 text-white max-w-4xl mx-auto mt-20">
            <div className="mb-6">
              <OctagonWrapper className="w-[120px] h-[120px] bg-[#f5d5e5] flex items-center justify-center p-2 mx-auto drop-shadow-2xl">
                <Image src="https://picsum.photos/200/200?random=930" alt="Crystal" width={120} height={120} className="object-cover opacity-90 mix-blend-multiply" />
              </OctagonWrapper>
            </div>

            <h1 className="text-[50px] md:text-[80px] font-serif mb-6 leading-[0.9] drop-shadow-lg text-[#f5d5e5]">
              {data.name}
            </h1>
            <p className="text-[14px] lg:text-[18px] font-sans font-medium tracking-[0.2em] uppercase mb-10 drop-shadow-md text-white/90">
              {data.description || 'Ignite your dreams with joyful extravagance and crystal wonder.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-[#111] px-12 py-4 font-sans font-bold uppercase text-[12px] tracking-[0.15em] hover:bg-[#f5d5e5] transition-colors min-w-[200px]">
                Explore the Magic
              </button>
              <button className="bg-transparent border border-white text-white px-12 py-4 font-sans font-bold uppercase text-[12px] tracking-[0.15em] hover:bg-white hover:text-[#111] transition-colors min-w-[200px]">
                Shop New Arrivals
              </button>
            </div>
          </div>
        </section>

        {/* ─── PRODUCT CATEGORIES (Octagon Grid) ─── */}
        <section className="py-24 bg-white">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-[32px] lg:text-[44px] font-serif text-[#111] mb-4">A World of Wonder</h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              {[
                { name: 'Necklaces', color: 'bg-[#f5d5e5]', img: 'https://picsum.photos/400/400?random=941' },
                { name: 'Earrings', color: 'bg-[#fbd24e]', img: 'https://picsum.photos/400/400?random=942' },
                { name: 'Rings', color: 'bg-[#cbe6f7]', img: 'https://picsum.photos/400/400?random=943' },
                { name: 'Bracelets', color: 'bg-[#bfe1cd]', img: 'https://picsum.photos/400/400?random=944' },
              ].map((cat, i) => (
                <div key={i} className="flex flex-col items-center group cursor-pointer">
                  <OctagonWrapper className={`w-full aspect-square mb-6 ${cat.color} transition-transform duration-700 group-hover:scale-105 p-6 flex items-center justify-center`}>
                    <Image src={cat.img} alt={cat.name} fill className="object-cover mix-blend-multiply opacity-80" />
                  </OctagonWrapper>
                  <h3 className="text-[16px] font-bold uppercase tracking-widest text-[#111] group-hover:underline underline-offset-4">{cat.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── TENDING PRODUCTS GRID ─── */}
        <section className="bg-[#fcfcfc] py-24 border-y border-gray-100">
          <div className="max-w-[1600px] mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16">
              <h2 className="text-[32px] lg:text-[48px] font-serif text-[#111] leading-none mb-4 md:mb-0">
                Mesmerizing Pieces
              </h2>
              <a href="#" className="font-sans font-bold text-[12px] uppercase tracking-[0.1em] text-[#111] border-b border-[#111] pb-1 hover:text-gray-500 transition-colors">
                View the Collection
              </a>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-16">
              {products.map((product, idx) => (
                <div key={product.id || idx} data-product-id={product.id} className="group cursor-pointer flex flex-col items-center text-center">
                  <div className="relative aspect-square mb-6 overflow-hidden w-full bg-white border border-gray-100 p-8 shadow-sm group-hover:shadow-xl transition-all duration-500">
                    <Image
                      src={product.imageUrl}
                      alt={product.title}
                      fill
                      className="object-contain p-8 group-hover:scale-110 transition-transform duration-[2000ms] ease-out"
                      referrerPolicy="no-referrer"
                    />
                    <button className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#111] text-white px-8 py-3 text-[10px] uppercase font-bold tracking-widest translate-y-[20px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 w-[calc(100%-32px)]">
                      Quick Shop
                    </button>
                    {(idx === 0 || idx === 3) && (
                      <div className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-widest text-[#111] bg-[#f5d5e5] px-2 py-1">
                        New
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col space-y-2 w-full px-2">
                    <div className="text-[10px] font-sans uppercase tracking-[0.15em] text-gray-400">
                      {product.category || 'Collection'}
                    </div>
                    <h3 className="text-[16px] font-serif text-[#111] leading-tight line-clamp-2 min-h-[40px]">
                      {product.title}
                    </h3>
                    <div className="pt-2 flex justify-center items-center space-x-3">
                      <span className="font-sans font-bold text-[14px] text-[#111]">${product.price}</span>
                      {product.originalPrice && (
                        <span className="font-sans font-medium text-[12px] text-gray-400 line-through">${product.originalPrice}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── THE CrystalShine CREATORS LAB (High contrast visual) ─── */}
        <section className="bg-[#111] text-white">
          <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-1/2 p-12 lg:p-24 flex flex-col justify-center text-center lg:text-left">
              <div className="mb-8">
                <CrystalShineSwan className="w-12 h-12 text-white mx-auto lg:mx-0 fill-current opacity-50" />
              </div>
              <span className="text-[12px] font-sans font-bold uppercase tracking-[0.2em] text-[#fbd24e] mb-4">
                Creators Lab
              </span>
              <h2 className="text-[40px] md:text-[56px] font-serif leading-tight mb-8">
                Masters of Light
              </h2>
              <p className="text-[16px] md:text-[18px] font-sans text-gray-400 leading-relaxed mb-12 max-w-lg mx-auto lg:mx-0">
                Step into a world where science meets magic. For over 125 years, our master cutters have pushed the boundaries of crystal craftsmanship to ignite the imagination.
              </p>
              <a href="#" className="font-sans font-bold text-[12px] uppercase tracking-[0.15em] text-white border-b border-white pb-1 inline-flex items-center w-max mx-auto lg:mx-0 hover:text-[#fbd24e] hover:border-[#fbd24e] transition-colors">
                Discover Our Story <ChevronRight className="w-4 h-4 ml-1" />
              </a>
            </div>
            <div className="w-full lg:w-1/2 relative min-h-[600px] overflow-hidden">
              <Image src="https://picsum.photos/1200/1200?random=950" alt="CrystalShine Craftsmanship" fill className="object-cover mix-blend-lighten opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent" />
            </div>
          </div>
        </section>

      </main>

      {/* ─── FOOTER ─── */}
      <footer className="bg-white text-[#111] pt-24 pb-12 border-t border-gray-200">
        <div className="max-w-[1400px] mx-auto px-6">

          {/* Newsletter Section */}
          <div className="flex flex-col items-center text-center mb-24 max-w-2xl mx-auto">
            <h3 className="text-[24px] font-serif mb-4">Join the CrystalShine Club</h3>
            <p className="text-[14px] text-gray-600 mb-8 font-medium">Be the first to know about sparkling new collections, exclusive events, and brilliant style inspiration.</p>
            <form className="w-full flex border-b border-[#111] pb-2 group">
              <input type="email" placeholder="Enter your email" className="bg-transparent w-full outline-none text-[14px] font-sans placeholder-gray-400 focus:placeholder-transparent" />
              <button type="button" className="text-[12px] font-bold uppercase tracking-widest hover:text-[#f5d5e5] transition-colors shrink-0">Subscribe</button>
            </form>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20 text-[12px] font-sans font-medium uppercase tracking-widest text-gray-600">

            <div className="flex flex-col space-y-4">
              <h4 className="text-[#111] font-bold tracking-[0.15em] mb-4">Customer Care</h4>
              <a href="#" className="hover:text-[#111] transition-colors">Contact Us</a>
              <a href="#" className="hover:text-[#111] transition-colors">Track Your Order</a>
              <a href="#" className="hover:text-[#111] transition-colors">Returns & Exchanges</a>
              <a href="#" className="hover:text-[#111] transition-colors">Shipping Information</a>
              <a href="#" className="hover:text-[#111] transition-colors">Product Care & Repair</a>
              <a href="#" className="hover:text-[#111] transition-colors">Gift Cards</a>
            </div>

            <div className="flex flex-col space-y-4">
              <h4 className="text-[#111] font-bold tracking-[0.15em] mb-4">About CrystalShine</h4>
              <a href="#" className="hover:text-[#111] transition-colors">About Us</a>
              <a href="#" className="hover:text-[#111] transition-colors">Careers</a>
              <a href="#" className="hover:text-[#111] transition-colors">Sustainability</a>
              <a href="#" className="hover:text-[#111] transition-colors">Corporate Gifts</a>
              <a href="#" className="hover:text-[#111] transition-colors">CrystalShine Professional</a>
            </div>

            <div className="flex flex-col space-y-4">
              <h4 className="text-[#111] font-bold tracking-[0.15em] mb-4">Legal</h4>
              <a href="#" className="hover:text-[#111] transition-colors">Terms of Use</a>
              <a href="#" className="hover:text-[#111] transition-colors">Terms & Conditions</a>
              <a href="#" className="hover:text-[#111] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#111] transition-colors">Cookie Consent</a>
              <a href="#" className="hover:text-[#111] transition-colors">Imprint</a>
            </div>

            <div className="flex flex-col space-y-4">
              <h4 className="text-[#111] font-bold tracking-[0.15em] mb-4">Social</h4>
              <a href="#" className="hover:text-[#111] transition-colors">Instagram</a>
              <a href="#" className="hover:text-[#111] transition-colors">Facebook</a>
              <a href="#" className="hover:text-[#111] transition-colors">TikTok</a>
              <a href="#" className="hover:text-[#111] transition-colors">Pinterest</a>
              <a href="#" className="hover:text-[#111] transition-colors">YouTube</a>
            </div>

          </div>

          <div className="pt-12 border-t border-gray-200 flex flex-col items-center justify-center space-y-6">
            <div className="flex flex-col items-center justify-center opacity-30">
              <CrystalShineSwan className="w-8 h-8 mb-2" color="#111" />
              <span className="font-serif text-[18px] tracking-[0.2em] uppercase leading-none">
                CrystalShine
              </span>
            </div>
            <span className="text-[10px] font-sans font-bold uppercase tracking-[0.15em] text-gray-400">© 2026 CrystalShine AG. All rights reserved.</span>
          </div>

        </div>
      </footer>
    </div>
  );
}
