"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { StoreData } from '@/lib/types';
import { Search, ShoppingBag, Menu, Globe, ChevronDown, Check, Zap, ArrowRight } from 'lucide-react';

export default function FutureAutoTemplate({ data }: { data: StoreData }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const featuredProduct = data.products[0];
  const vehicles = data.products.slice(0, 4);
  const accessories = data.products.slice(4, 7);

  return (
    <div className="min-h-full bg-white font-sans text-black selection:bg-black selection:text-white">
      {/* ─── HEADER ─── */}
      <header className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${isScrolled ? 'bg-white' : 'bg-transparent text-white'}`}>
        <div className="w-full px-6 md:px-12 h-[56px] flex items-center justify-between">
          <div className="flex-1 md:flex-none">
            <div className={`font-sans text-[18px] tracking-[0.4em] uppercase font-black cursor-pointer ${isScrolled ? 'text-black' : 'text-white'}`}>
              {data.logoText || 'FUTUREAUTO'}
            </div>
          </div>

          <nav className="hidden xl:flex space-x-1 font-medium text-[13.5px] tracking-wide">
            <a href="#" className={`px-4 py-1.5 rounded-[4px] transition-colors ${isScrolled ? 'hover:bg-gray-100 text-black' : 'hover:bg-white/10 text-white'}`}>Vehicles</a>
            <a href="#" className={`px-4 py-1.5 rounded-[4px] transition-colors ${isScrolled ? 'hover:bg-gray-100 text-black' : 'hover:bg-white/10 text-white'}`}>Energy</a>
            <a href="#" className={`px-4 py-1.5 rounded-[4px] transition-colors ${isScrolled ? 'hover:bg-gray-100 text-black' : 'hover:bg-white/10 text-white'}`}>Charging</a>
            <a href="#" className={`px-4 py-1.5 rounded-[4px] transition-colors ${isScrolled ? 'hover:bg-gray-100 text-black' : 'hover:bg-white/10 text-white'}`}>Discover</a>
            <a href="#" className={`px-4 py-1.5 rounded-[4px] transition-colors ${isScrolled ? 'hover:bg-gray-100 text-black' : 'hover:bg-white/10 text-white'}`}>Shop</a>
          </nav>

          <div className="flex items-center space-x-2 md:space-x-1">
            <a href="#" className={`hidden xl:flex p-1.5 rounded-[4px] transition-colors ${isScrolled ? 'hover:bg-gray-100 text-black' : 'hover:bg-white/10 text-white'}`}>
              <Globe className="w-5 h-5" strokeWidth={1.5} />
            </a>
            <a href="#" className={`hidden md:flex flex p-1.5 rounded-[4px] transition-colors ${isScrolled ? 'hover:bg-gray-100 text-black' : 'hover:bg-white/10 text-white'}`}>
              <Search className="w-5 h-5" strokeWidth={1.5} />
            </a>
            <a href="#" className={`hidden md:flex p-1.5 rounded-[4px] transition-colors ${isScrolled ? 'hover:bg-gray-100 text-black' : 'hover:bg-white/10 text-white'}`}>
              <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
            </a>
            <a href="#" className={`flex p-1.5 rounded-[4px] transition-colors xl:hidden ${isScrolled ? 'hover:bg-gray-100 bg-gray-100' : 'hover:bg-white/10 bg-black/5 backdrop-blur-md'}`}>
              <Menu className={`w-5 h-5 ${isScrolled ? 'text-black' : 'text-white'}`} strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </header>

      <main className="snap-y snap-mandatory h-screen w-full overflow-y-scroll overflow-x-hidden scroll-smooth relative">

        {/* ─── SECTION 1: HERO (MODEL Y / MAIN BANNER) ─── */}
        <section data-product-id={featuredProduct?.id} className="relative h-screen w-full snap-start flex flex-col justify-between pt-24 pb-12 shrink-0">
          <Image
            src={data.bannerImage}
            alt="Hero"
            fill
            className="absolute inset-0 w-full h-full object-cover -z-10"
            priority
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/10 -z-10" />

          <div className="flex flex-col items-center mt-6 text-white text-center drop-shadow-md px-4">
            <h1 className="text-[40px] md:text-[52px] font-medium tracking-tight mb-2">
              {data.name || 'Model Y'}
            </h1>
            <p className="text-[14px] md:text-[16px] font-medium tracking-wide">
              {data.description || 'Lease starting at $299/mo'}
            </p>
          </div>

          <div className="flex flex-col items-center mb-6 w-full px-6">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 w-full max-w-lg mb-8">
              <button className="flex-1 bg-white text-[#393c41] py-2.5 rounded-[4px] text-[14px] font-medium hover:bg-gray-200 transition-colors">
                Order Now
              </button>
              <button className="flex-1 bg-[#171a20]/60 backdrop-blur-md text-white py-2.5 rounded-[4px] text-[14px] font-medium hover:bg-[#171a20]/80 transition-colors">
                Demo Drive
              </button>
            </div>
            <div className="text-[12px] text-white/80 max-w-2xl text-center px-4 leading-relaxed font-medium">
              *Excludes taxes and fees with $2,999 down. Subject to specific configurations and availability. <br className="hidden md:block" />
              <a href="#" className="underline underline-offset-4 hover:text-white transition-colors">See Details</a>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: VEHICLE FOCUS (MODEL 3) ─── */}
        {vehicles[1] && (
          <section data-product-id={vehicles[1].id} className="relative h-screen w-full snap-start flex flex-col justify-between pt-24 pb-12 shrink-0">
            <Image
              src={vehicles[1].imageUrl}
              alt="Model 3"
              fill
              className="absolute inset-0 w-full h-full object-cover -z-10 brightness-90"
              referrerPolicy="no-referrer"
            />

            <div className="flex flex-col items-center mt-6 text-white text-center drop-shadow-md px-4">
              <h1 className="text-[40px] md:text-[52px] font-medium tracking-tight mb-2">
                {vehicles[1].title}
              </h1>
              <p className="text-[14px] md:text-[16px] font-medium tracking-wide">
                Lease starting at $229/mo*
              </p>
            </div>

            <div className="flex flex-col items-center mb-6 w-full px-6">
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 w-full max-w-lg mb-8">
                <button className="flex-1 bg-white text-[#393c41] py-2.5 rounded-[4px] text-[14px] font-medium hover:bg-gray-200 transition-colors">
                  Order Now
                </button>
                <button className="flex-1 bg-[#171a20]/60 backdrop-blur-md text-white py-2.5 rounded-[4px] text-[14px] font-medium hover:bg-[#171a20]/80 transition-colors">
                  Demo Drive
                </button>
              </div>
            </div>
          </section>
        )}

        {/* ─── SECTION 3: VEHICLE FOCUS (MODEL X/S) ─── */}
        <section className="relative h-screen w-full snap-start flex flex-col justify-between pt-24 pb-12 shrink-0">
          <Image
            src="https://picsum.photos/1920/1080?random=211"
            alt="Model X"
            fill
            className="absolute inset-0 w-full h-full object-cover -z-10"
            referrerPolicy="no-referrer"
          />

          <div className="flex flex-col items-center mt-6 text-black text-center px-4">
            <h1 className="text-[40px] md:text-[52px] font-medium tracking-tight mb-2">
              Model X
            </h1>
            <p className="text-[14px] md:text-[16px] font-medium tracking-wide">
              Take Delivery by Dec 31 for Three Months of Free Supercharging
            </p>
          </div>

          <div className="flex flex-col items-center mb-6 w-full px-6">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 w-full max-w-lg mb-8">
              <button className="flex-1 bg-white text-[#393c41] py-2.5 rounded-[4px] text-[14px] font-medium hover:bg-gray-200 transition-colors shadow-sm">
                Order Now
              </button>
              <button className="flex-1 bg-[#171a20]/60 backdrop-blur-md text-white py-2.5 rounded-[4px] text-[14px] font-medium hover:bg-[#171a20]/80 transition-colors">
                Demo Drive
              </button>
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: ENERGY ─── */}
        <section className="relative h-screen w-full snap-start flex flex-col justify-between pt-24 pb-12 shrink-0">
          <Image
            src="https://picsum.photos/1920/1080?random=212"
            alt="Solar Panels"
            fill
            className="absolute inset-0 w-full h-full object-cover -z-10 brightness-95"
            referrerPolicy="no-referrer"
          />

          <div className="flex flex-col items-center mt-6 text-black text-center px-4">
            <h1 className="text-[40px] md:text-[52px] font-medium tracking-tight mb-2 drop-shadow-sm">
              Solar Panels
            </h1>
            <a href="#" className="text-[14px] md:text-[15px] font-medium tracking-wide underline underline-offset-4 hover:decoration-2 transition-all drop-shadow-sm">
              Schedule a Virtual Consultation
            </a>
          </div>

          <div className="flex flex-col items-center mb-6 w-full px-6">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 w-full max-w-lg mb-8">
              <button className="flex-1 bg-white text-[#393c41] py-2.5 rounded-[4px] text-[14px] font-medium hover:bg-gray-200 transition-colors shadow-sm">
                Order Now
              </button>
              <button className="flex-1 bg-[#171a20]/60 backdrop-blur-md text-white py-2.5 rounded-[4px] text-[14px] font-medium hover:bg-[#171a20]/80 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </section>

        {/* ─── SECTION 5: ACCESSORIES/SHOP ─── */}
        <section className="relative h-screen w-full snap-start flex flex-col justify-between pt-24 pb-12 shrink-0">
          <Image
            src="https://picsum.photos/1920/1080?random=213"
            alt="Accessories"
            fill
            className="absolute inset-0 w-full h-full object-cover -z-10 brightness-75"
            referrerPolicy="no-referrer"
          />

          <div className="flex flex-col items-center mt-6 text-white text-center px-4">
            <h1 className="text-[40px] md:text-[52px] font-medium tracking-tight mb-2 drop-shadow-md">
              Accessories
            </h1>
          </div>

          <div className="flex flex-col items-center mb-6 w-full px-6">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 w-full max-w-sm mb-8">
              <button className="flex-1 bg-white text-[#393c41] py-2.5 rounded-[4px] text-[14px] font-medium hover:bg-gray-200 transition-colors shadow-sm">
                Shop Now
              </button>
            </div>

            {/* Minimal Footer integrated into the last snap section */}
            <footer className="w-full flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 text-[12px] font-medium tracking-wide text-white/80 pb-6 pt-12">
              <a href="#" className="hover:text-white transition-colors">FutureAuto © 2026</a>
              <a href="#" className="hover:text-white transition-colors">Privacy & Legal</a>
              <a href="#" className="hover:text-white transition-colors">Vehicle Recalls</a>
              <a href="#" className="hidden md:inline hover:text-white transition-colors">Contact</a>
              <a href="#" className="hover:text-white transition-colors">News</a>
              <a href="#" className="hidden md:inline hover:text-white transition-colors">Get Updates</a>
              <a href="#" className="hidden md:inline hover:text-white transition-colors">Locations</a>
            </footer>
          </div>
        </section>

      </main>
    </div>
  );
}
