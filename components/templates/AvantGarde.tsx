import React from 'react';
import Image from 'next/image';
import { StoreData } from '@/lib/types';

export default function AvantGardeTemplate({ data }: { data: StoreData }) {
  const products = data.products;

  return (
    <div className="min-h-full bg-white font-sans text-black selection:bg-black selection:text-white pb-0 overflow-x-hidden">

      {/* ─── HEADER (BRUTALIST & MINIMAL) ─── */}
      <header className="bg-white sticky top-0 z-50 border-b border-black md:border-b-0 h-[50px] md:h-[60px] flex flex-col justify-center">
        <div className="w-full px-4 md:px-6 flex items-center justify-between text-[11px] md:text-[13px] uppercase tracking-normal font-medium">

          <div className="flex items-center space-x-6 w-1/3">
            <nav className="hidden lg:flex space-x-6">
              <a href="#" className="hover:underline underline-offset-4">Menswear</a>
              <a href="#" className="hover:underline underline-offset-4">Womenswear</a>
              <a href="#" className="hover:underline underline-offset-4">Everything Else</a>
              <a href="#" className="hover:underline underline-offset-4">Sale</a>
            </nav>
            <div className="lg:hidden cursor-pointer hover:underline underline-offset-4">Menu</div>
          </div>

          <div className="flex items-center justify-center cursor-pointer w-1/3 text-center">
            <span className="font-bold text-[22px] md:text-[32px] tracking-tighter leading-none">
              AvantGarde
            </span>
          </div>

          <div className="flex items-center justify-end space-x-6 w-1/3">
            <div className="hidden md:flex space-x-6">
              <a href="#" className="hover:underline underline-offset-4">English</a>
              <a href="#" className="hover:underline underline-offset-4">Login</a>
            </div>
            <a href="#" className="hover:underline underline-offset-4">Search</a>
            <a href="#" className="hover:underline underline-offset-4">Shopping Bag (0)</a>
          </div>

        </div>
      </header>

      {/* Mobile Nav Header Extension if needed */}
      <div className="lg:hidden w-full border-b border-black px-4 py-2 flex space-x-4 text-[11px] uppercase overflow-x-auto hide-scrollbar">
        <a href="#" className="hover:underline underline-offset-4 shrink-0">Menswear</a>
        <a href="#" className="hover:underline underline-offset-4 shrink-0">Womenswear</a>
        <a href="#" className="hover:underline underline-offset-4 shrink-0">Everything Else</a>
        <a href="#" className="hover:underline underline-offset-4 shrink-0">Sale</a>
      </div>

      <main className="w-full pb-24">

        {/* ─── MAIN EDITORIAL BANNER ─── */}
        <section className="relative w-full h-[60vh] md:h-[85vh] group cursor-pointer mb-20">
          <Image
            src={data.bannerImage}
            alt="AvantGarde Editorial"
            fill
            className="object-cover object-center"
            priority
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/5" />

          <div className="absolute top-0 w-full p-4 md:p-6 text-black flex justify-between items-start pointer-events-none mix-blend-difference text-white">
            <h1 className="text-[32px] md:text-[64px] font-bold uppercase tracking-tighter leading-none max-w-2xl text-balance">
              {data.name}
            </h1>
            <p className="text-[12px] md:text-[14px] uppercase tracking-normal max-w-[200px] md:max-w-xs text-right hidden sm:block">
              {data.description || 'Recent highlights from the intersection of culture, art, and fashion.'}
            </p>
          </div>
          <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6">
            <button className="text-[11px] md:text-[13px] bg-white text-black px-6 py-2 uppercase hover:bg-black hover:text-white transition-colors">
              Read the Feature
            </button>
          </div>
        </section>

        {/* ─── LATEST ARRIVALS GRID ─── */}
        <section className="px-4 md:px-6">
          <div className="flex items-center justify-between mb-8 border-b border-black pb-2 text-[11px] md:text-[13px] uppercase font-bold">
            <h2>Latest Arrivals</h2>
            <div className="flex space-x-4 font-normal">
              <a href="#" className="hover:underline underline-offset-4">View All</a>
              <a href="#" className="hover:underline underline-offset-4 hidden sm:block">Filter</a>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-4 md:gap-x-6 gap-y-12 md:gap-y-16">
            {products.map((product, idx) => (
              <div key={product.id || idx} data-product-id={product.id} className="group cursor-pointer flex flex-col group">
                <div className="relative aspect-[3/4] mb-3 overflow-hidden bg-[#e5e5e5]">
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    fill
                    className="object-contain mix-blend-multiply opacity-90 group-hover:opacity-100 transition-opacity p-4"
                    referrerPolicy="no-referrer"
                  />
                  {idx % 4 === 0 && (
                    <div className="absolute top-2 left-2 text-[10px] uppercase bg-black text-white px-1 py-0.5">
                      New
                    </div>
                  )}
                </div>

                <div className="flex flex-col text-[11px] md:text-[12px] uppercase leading-tight font-medium space-y-0.5">
                  <h3 className="font-bold line-clamp-1">
                    {product.category || 'Maison Margiela'}
                  </h3>
                  <div className="text-gray-600 line-clamp-1 pb-1">
                    {product.title}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-black">${product.price} USD</span>
                    {product.originalPrice && (
                      <span className="text-gray-400 line-through">${product.originalPrice} USD</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 flex justify-center border-t border-black pt-8">
            <button className="text-[11px] md:text-[13px] uppercase hover:underline underline-offset-4 font-medium">
              Load More
            </button>
          </div>
        </section>

        {/* ─── EDITORIAL SECTION ─── */}
        <section className="mt-24 px-4 md:px-6">
          <div className="border-b border-black pb-2 mb-8 text-[11px] md:text-[13px] uppercase font-bold flex justify-between">
            <h2>Features</h2>
            <a href="#" className="hover:underline underline-offset-4 font-normal">View All Editorial</a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">

            <div className="group cursor-pointer">
              <div className="relative aspect-[4/3] w-full mb-4 bg-gray-100 overflow-hidden">
                <Image src="https://picsum.photos/800/600?random=980" alt="Editorial 1" fill className="object-cover group-hover:scale-105 transition-transform duration-[2000ms]" />
              </div>
              <div className="text-[11px] md:text-[12px] uppercase flex flex-col space-y-2">
                <span className="text-gray-500">Fashion</span>
                <h3 className="font-bold text-[14px] md:text-[18px] leading-tight max-w-lg">The Evolution of Technical Outerwear in Urban Environments</h3>
                <p className="normal-case text-gray-600 line-clamp-2 mt-2">Exploring how high-performance materials transitioned from mountainsides to city streets, redefining modern luxury aesthetics.</p>
              </div>
            </div>

            <div className="group cursor-pointer">
              <div className="relative aspect-[4/3] w-full mb-4 bg-gray-100 overflow-hidden">
                <Image src="https://picsum.photos/800/600?random=981" alt="Editorial 2" fill className="object-cover group-hover:scale-105 transition-transform duration-[2000ms]" />
              </div>
              <div className="text-[11px] md:text-[12px] uppercase flex flex-col space-y-2">
                <span className="text-gray-500">Music</span>
                <h3 className="font-bold text-[14px] md:text-[18px] leading-tight max-w-lg">Sound & Vision: The New Wave of Audiovisual Collectives</h3>
                <p className="normal-case text-gray-600 line-clamp-2 mt-2">An intimate conversation with the multidisciplinary artists blurring the lines between sonic landscapes and wearable art.</p>
              </div>
            </div>

          </div>
        </section>

      </main>

      {/* ─── FOOTER ─── */}
      <footer className="bg-white border-t border-black text-[11px] md:text-[12px] uppercase font-medium">
        <div className="w-full px-4 md:px-6">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-16">

            <div className="flex flex-col space-y-3">
              <a href="#" className="hover:underline underline-offset-4">Country/Region: United States</a>
              <a href="#" className="hover:underline underline-offset-4">Language: English</a>
              <a href="#" className="hover:underline underline-offset-4">Newsletter Signup</a>
              <a href="#" className="hover:underline underline-offset-4">Customer Care</a>
            </div>

            <div className="flex flex-col space-y-3">
              <a href="#" className="hover:underline underline-offset-4">Locations</a>
              <a href="#" className="hover:underline underline-offset-4">Editorial Archive</a>
              <a href="#" className="hover:underline underline-offset-4">Careers</a>
              <a href="#" className="hover:underline underline-offset-4">Affiliates</a>
              <a href="#" className="hover:underline underline-offset-4">Sitemap</a>
            </div>

            <div className="flex flex-col space-y-3 lg:col-span-2">
              <p className="normal-case text-gray-500 leading-relaxed max-w-sm">Sign up for the AvantGarde newsletter to receive news, updates, and early access to exclusives.</p>
              <form className="flex w-full max-w-sm mt-2 border-b border-black pb-1">
                <input type="email" placeholder="EMAIL ADDRESS" className="bg-transparent outline-none w-full placeholder-gray-400" />
                <button type="button" className="hover:underline underline-offset-4 shrink-0">Subscribe</button>
              </form>
            </div>

          </div>

          <div className="py-6 border-t border-black flex flex-col md:flex-row items-center justify-between text-gray-500 space-y-4 md:space-y-0">
            <span>© 2026 AvantGarde. ALL RIGHTS RESERVED.</span>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              <a href="#" className="hover:text-black hover:underline underline-offset-4">Terms & Conditions</a>
              <a href="#" className="hover:text-black hover:underline underline-offset-4">Privacy Policy</a>
              <a href="#" className="hover:text-black hover:underline underline-offset-4">Instagram</a>
              <a href="#" className="hover:text-black hover:underline underline-offset-4">Facebook</a>
              <a href="#" className="hover:text-black hover:underline underline-offset-4">Twitter</a>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
