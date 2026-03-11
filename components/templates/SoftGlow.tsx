import React from 'react';
import Image from 'next/image';
import { StoreData } from '@/lib/types';
import { Search, ShoppingBag, Heart, User, Sparkles, ArrowRight, Instagram, MapPin } from 'lucide-react';

export default function SoftGlowTemplate({ data }: { data: StoreData }) {
  const products = data.products;

  return (
    <div className="min-h-full bg-[#fdfafaf] font-sans text-[#1a1a1a] selection:bg-[#f4d2d8] selection:text-[#1a1a1a] overflow-x-hidden">

      {/* ─── PROMO BAR ─── */}
      <div className="bg-[#1a1a1a] text-white text-[12px] py-2.5 px-6 flex justify-center items-center font-medium tracking-wide">
        <span className="flex items-center">
          Free shipping on orders over $40 <a href="#" className="underline ml-2 hover:text-[#f4d2d8] transition-colors">Shop Now</a>
        </span>
      </div>

      {/* ─── HEADER ─── */}
      <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-[#f3e5e5] transition-all">
        <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 h-[72px] flex items-center justify-between">

          <div className="flex items-center space-x-8">
            <div className="lg:hidden flex flex-col space-y-1 cursor-pointer p-2">
              <span className="w-6 h-[2px] bg-[#1a1a1a] block rounded-full"></span>
              <span className="w-6 h-[2px] bg-[#1a1a1a] block rounded-full"></span>
              <span className="w-6 h-[2px] bg-[#1a1a1a] block rounded-full"></span>
            </div>
            <nav className="hidden lg:flex space-x-8 font-bold text-[13px] text-[#1a1a1a]">
              <a href="#" className="hover:text-[#e4a6a6] transition-colors py-2">Skincare</a>
              <a href="#" className="hover:text-[#e4a6a6] transition-colors py-2">Makeup</a>
              <a href="#" className="hover:text-[#e4a6a6] transition-colors py-2">Body</a>
              <a href="#" className="hover:text-[#e4a6a6] transition-colors py-2">Fragrance</a>
            </nav>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center cursor-pointer">
            <span className="font-extrabold text-[32px] md:text-[36px] tracking-tighter text-[#1a1a1a]">
              SoftGlow.
            </span>
          </div>

          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center bg-[#fdf5f5] rounded-full px-4 py-2 w-48 group border border-transparent focus-within:border-[#f4d2d8] transition-all">
              <Search className="w-4 h-4 text-gray-500 mr-2 group-focus-within:text-[#1a1a1a]" />
              <input type="text" placeholder="Search" className="bg-transparent outline-none text-[13px] font-medium w-full placeholder-gray-500" />
            </div>

            <Search className="md:hidden w-6 h-6 cursor-pointer hover:text-[#e4a6a6] transition-colors" strokeWidth={1.5} />
            <User className="hidden md:block w-6 h-6 cursor-pointer hover:text-[#e4a6a6] transition-colors" strokeWidth={1.5} />
            <div className="relative cursor-pointer hover:text-[#e4a6a6] transition-colors group">
              <ShoppingBag className="w-6 h-6" strokeWidth={1.5} />
              <span className="absolute -top-1 -right-2 bg-[#f4d2d8] text-[#1a1a1a] text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-sm">0</span>
            </div>
          </div>
        </div>
      </header>

      <main className="w-full">

        {/* ─── HERO EDITORIAL ─── */}
        <section className="w-full max-w-[1440px] mx-auto md:px-6 py-6 group cursor-pointer">
          <div className="relative w-full h-[500px] md:h-[650px] overflow-hidden md:rounded-[32px]">
            <Image
              src={data.bannerImage}
              alt="SoftGlow Editorial"
              fill
              className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-[4000ms] ease-out"
              priority
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/10 transition-colors" />

            <div className="absolute inset-x-0 bottom-0 p-8 md:p-16 flex flex-col items-center justify-end text-center bg-gradient-to-t from-black/50 via-black/20 to-transparent">
              <span className="bg-white/90 backdrop-blur text-[#1a1a1a] text-[11px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 flex items-center shadow-md">
                <Sparkles className="w-3.5 h-3.5 mr-1.5 text-[#e4a6a6]" /> New Arrival
              </span>
              <h1 className="text-white text-[48px] md:text-[72px] font-black tracking-tighter leading-none mb-4 drop-shadow-lg">
                {data.name}
              </h1>
              <p className="text-white/90 text-[16px] md:text-[20px] font-medium mb-8 max-w-lg drop-shadow-md leading-relaxed">
                {data.description || 'Skin first. Makeup second. Get that dewy, fresh-faced look you love.'}
              </p>
              <div className="flex gap-4">
                <button className="bg-white text-[#1a1a1a] px-10 py-3.5 rounded-full font-bold text-[14px] hover:bg-[#fdfafaf] transition-colors shadow-lg">
                  Shop the Look
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ─── THE ESSENTIALS (PRODUCTS) ─── */}
        <section className="max-w-[1440px] mx-auto px-4 md:px-8 py-20">
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-[40px] font-black tracking-tighter text-[#1a1a1a] mb-2 leading-none">The Essentials</h2>
            <p className="text-[16px] text-gray-500 font-medium">Build your routine with our skincare and makeup favorites.</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {products.map((product, idx) => (
              <div key={product.id || idx} data-product-id={product.id} className="group cursor-pointer flex flex-col relative bg-white p-5 rounded-[24px] shadow-sm hover:shadow-xl transition-shadow duration-300 border border-[#fdf5f5]">

                {idx % 3 === 0 && (
                  <span className="absolute top-5 left-5 z-10 bg-[#f4d2d8] text-[#1a1a1a] text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded shadow-sm">
                    Best Seller
                  </span>
                )}

                <button className="absolute top-5 right-5 z-10 w-8 h-8 bg-white/50 backdrop-blur rounded-full flex items-center justify-center text-gray-400 hover:text-[#e4a6a6] hover:bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-all">
                  <Heart className="w-4 h-4 fill-transparent hover:fill-current" />
                </button>

                <div className="relative w-full aspect-square mb-6 overflow-hidden rounded-xl bg-[#fdfafaf] flex items-center justify-center">
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    fill
                    className="object-contain p-6 group-hover:scale-105 transition-transform duration-[1200ms] ease-out mix-blend-multiply"
                    referrerPolicy="no-referrer"
                  />
                  {/* Quick Add Overlay */}
                  <div className="absolute inset-x-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity hidden lg:block">
                    <button className="w-full bg-[#1a1a1a] text-white font-bold text-[13px] py-3 rounded-full hover:bg-black transition-colors shadow-md">
                      Add to bag - ${product.price}
                    </button>
                  </div>
                </div>

                <div className="flex flex-col flex-1 items-center text-center px-2">
                  <h3 className="text-[16px] font-bold text-[#1a1a1a] mb-[2px] group-hover:underline underline-offset-2 decoration-2 leading-snug">
                    {product.title}
                  </h3>
                  <div className="text-[14px] text-gray-600 mb-2 font-medium">
                    {product.category || 'Skincare'}
                  </div>

                  {/* Star Rating snippet */}
                  <div className="flex items-center space-x-1 mb-2">
                    <div className="flex text-[#e4a6a6]">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-[12px] leading-none">★</span>
                      ))}
                    </div>
                    <span className="text-[12px] text-gray-500 font-medium">(2.4k)</span>
                  </div>

                  <div className="mt-auto pt-2 hidden lg:flex">
                    <span className="font-bold text-[16px] text-[#1a1a1a]">${product.price}</span>
                  </div>
                  {/* Mobile Add to Bag */}
                  <button className="w-full mt-4 bg-[#fdf5f5] text-[#1a1a1a] font-bold text-[13px] py-2.5 rounded-full hover:bg-[#f4d2d8] transition-colors lg:hidden">
                    Add to bag - ${product.price}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── HOW-TO: THE 3-STEP ROUTINE ─── */}
        <section className="max-w-[1440px] mx-auto px-4 md:px-8 py-12 mb-20">
          <div className="bg-[#fcf7f7] rounded-[32px] overflow-hidden flex flex-col md:flex-row shadow-sm border border-[#f3e5e5]">
            <div className="w-full md:w-1/2 p-10 md:p-20 flex flex-col justify-center">
              <span className="text-[#e4a6a6] font-bold text-[12px] uppercase tracking-widest mb-4">How-To</span>
              <h2 className="text-[40px] md:text-[56px] font-black tracking-tighter text-[#1a1a1a] mb-6 leading-[1.1]">
                The 3-Step Routine
              </h2>
              <p className="text-[16px] font-medium text-gray-600 mb-10 leading-relaxed max-w-md">
                Cleanse, condition, and protect. Our simple, effective approach for dewy, resilient skin every day.
              </p>

              <div className="space-y-8 mb-10">
                <div className="flex gap-4 items-start">
                  <span className="w-8 h-8 rounded-full bg-[#f4d2d8] text-[#1a1a1a] font-bold text-[13px] flex items-center justify-center shrink-0 mt-1">1</span>
                  <div>
                    <h4 className="font-bold text-[16px] text-[#1a1a1a] mb-1">Cleanser</h4>
                    <p className="text-[15px] font-medium text-gray-600">Dissolves makeup and grime without stripping.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <span className="w-8 h-8 rounded-full bg-[#f4d2d8] text-[#1a1a1a] font-bold text-[13px] flex items-center justify-center shrink-0 mt-1">2</span>
                  <div>
                    <h4 className="font-bold text-[16px] text-[#1a1a1a] mb-1">Moisturizer</h4>
                    <p className="text-[15px] font-medium text-gray-600">Hydrates and visibly plumps for a smooth canvas.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <span className="w-8 h-8 rounded-full bg-[#f4d2d8] text-[#1a1a1a] font-bold text-[13px] flex items-center justify-center shrink-0 mt-1">3</span>
                  <div>
                    <h4 className="font-bold text-[16px] text-[#1a1a1a] mb-1">Sunscreen</h4>
                    <p className="text-[15px] font-medium text-gray-600">Clear water-gel protection.</p>
                  </div>
                </div>
              </div>

              <button className="bg-[#1a1a1a] text-white px-10 py-3.5 rounded-full font-bold text-[14px] hover:bg-black transition-colors w-max shadow-md">
                Shop the Set
              </button>
            </div>
            <div className="w-full md:w-1/2 relative h-[450px] md:h-auto overflow-hidden">
              <Image src="https://picsum.photos/800/800?random=1161" alt="Skincare Routine" fill className="object-cover" />
            </div>
          </div>
        </section>

        {/* ─── UGC / COMMUNITY ─── */}
        <section className="mb-24 py-12 border-t border-b border-[#f3e5e5] bg-white">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-[32px] font-black tracking-tighter text-[#1a1a1a] mb-2 leading-none">SoftGlow in Real Life</h2>
            <p className="text-[15px] text-gray-500 font-medium">Tag @softglow to be featured on our feed.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-0">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className={`relative aspect-square group cursor-pointer border-[0.5px] border-white ${i > 4 ? 'hidden lg:block' : ''}`}>
                <Image src={`https://picsum.photos/400/400?random=${1170 + i}`} alt="UGC" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center backdrop-blur-[1px] opacity-0 group-hover:opacity-100">
                  <Instagram className="w-8 h-8 text-white scale-50 group-hover:scale-100 transition-transform duration-300" />
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* ─── FOOTER ─── */}
      <footer className="bg-white pt-16 pb-8">
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-8">

          <div className="font-extrabold text-[48px] md:text-[64px] tracking-tighter text-[#1a1a1a] mb-12 border-b border-[#f3e5e5] pb-8">
            SoftGlow.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">

            <div className="lg:col-span-2">
              <h4 className="text-[#1a1a1a] font-bold text-[14px] lg:text-[15px] mb-4">Subscribe to our newsletter</h4>
              <p className="text-[14px] text-gray-600 font-medium mb-6 max-w-sm">
                Be the first to know about new products, exclusive drops, and community events.
              </p>
              <form className="flex w-full mb-8 max-w-sm border-b border-[#1a1a1a] pb-1.5 focus-within:border-[#e4a6a6] transition-colors">
                <input type="email" placeholder="Email Address" className="bg-transparent text-[#1a1a1a] px-2 outline-none flex-1 font-bold text-[13px] placeholder-gray-400" />
                <button type="button" className="text-[#1a1a1a] hover:text-[#e4a6a6] transition-colors pr-2">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>

              <div className="flex space-x-6">
                <a href="#" className="hover:text-[#e4a6a6] transition-colors text-[#1a1a1a]"><Instagram className="w-6 h-6" strokeWidth={1.5} /></a>
                <a href="#" className="hover:text-[#e4a6a6] transition-colors text-[#1a1a1a]"><svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg></a>
                <a href="#" className="hover:text-[#e4a6a6] transition-colors text-[#1a1a1a]"><svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" /></svg></a>
              </div>
            </div>

            <div className="flex flex-col space-y-4 text-[14px] font-bold text-[#1a1a1a]">
              <h4 className="text-gray-400 font-medium mb-1 uppercase tracking-widest text-[11px]">Shop</h4>
              <a href="#" className="hover:text-[#e4a6a6] transition-colors">Skincare</a>
              <a href="#" className="hover:text-[#e4a6a6] transition-colors">Makeup</a>
              <a href="#" className="hover:text-[#e4a6a6] transition-colors">Body</a>
              <a href="#" className="hover:text-[#e4a6a6] transition-colors">Fragrance</a>
              <a href="#" className="hover:text-[#e4a6a6] transition-colors">Sets</a>
              <a href="#" className="hover:text-[#e4a6a6] transition-colors">SoftGlow Goods</a>
            </div>

            <div className="flex flex-col space-y-4 text-[14px] font-bold text-[#1a1a1a]">
              <h4 className="text-gray-400 font-medium mb-1 uppercase tracking-widest text-[11px]">About</h4>
              <a href="#" className="hover:text-[#e4a6a6] transition-colors">Our Story</a>
              <a href="#" className="hover:text-[#e4a6a6] transition-colors">Careers</a>
              <a href="#" className="hover:text-[#e4a6a6] transition-colors">Visit Us</a>
              <a href="#" className="hover:text-[#e4a6a6] transition-colors">Into The Gloss</a>
              <a href="#" className="hover:text-[#e4a6a6] transition-colors">Find Your Shade</a>
            </div>

            <div className="flex flex-col space-y-4 text-[14px] font-bold text-[#1a1a1a]">
              <h4 className="text-gray-400 font-medium mb-1 uppercase tracking-widest text-[11px]">Help</h4>
              <a href="#" className="hover:text-[#e4a6a6] transition-colors">FAQ</a>
              <a href="#" className="hover:text-[#e4a6a6] transition-colors">Shipping</a>
              <a href="#" className="hover:text-[#e4a6a6] transition-colors">Returns</a>
              <a href="#" className="hover:text-[#e4a6a6] transition-colors">Track Order</a>
              <a href="#" className="hover:text-[#e4a6a6] transition-colors">Contact Us</a>
            </div>

          </div>

          <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] font-bold uppercase tracking-widest text-gray-500 border-t border-[#f3e5e5] space-y-4 md:space-y-0">
            <span>© 2026 SOFTGLOW. ALL RIGHTS RESERVED.</span>
            <div className="flex flex-wrap justify-center gap-6">
              <a href="#" className="hover:text-[#1a1a1a] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#1a1a1a] transition-colors">Terms of Use</a>
              <a href="#" className="hover:text-[#1a1a1a] transition-colors">Accessibility</a>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
