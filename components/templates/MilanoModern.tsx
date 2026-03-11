import React from 'react';
import Image from 'next/image';
import { StoreData } from '@/lib/types';
import { Search, ShoppingBag, Menu, Heart, ArrowRight, PlayCircle, Shield, Truck, Smartphone, Instagram, Twitter, Facebook, Youtube, ChevronDown, User } from 'lucide-react';

export default function MilanoModernTemplate({ data }: { data: StoreData }) {
  return (
    <div className="min-h-full bg-white font-sans text-black overflow-x-hidden selection:bg-black selection:text-white" style={{ fontFamily: "'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}>

      {/* ─── HEADER (Brutalist, sticky) ─── */}
      <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md transition-transform border-b border-gray-100">
        <div className="w-full px-4 md:px-8 h-[60px] md:h-[70px] flex items-center justify-between">

          <div className="flex items-center space-x-6 md:space-x-8 w-1/3">
            <button className="flex flex-col space-y-[4px] hover:opacity-50 transition-opacity">
              <span className="block h-[1.5px] bg-black w-6"></span>
              <span className="block h-[1.5px] bg-black w-6"></span>
              <span className="block h-[1.5px] bg-black w-6"></span>
            </button>
            <button className="hidden md:flex items-center hover:opacity-50 transition-opacity space-x-2">
              <Search className="w-[18px] h-[18px]" strokeWidth={1.5} />
            </button>
          </div>

          <div className="flex justify-center w-1/3 cursor-pointer hover:opacity-70 transition-opacity">
            {/* MilanoModern Signature Logo: Bold, wide tracking */}
            <div className="text-[24px] md:text-[32px] tracking-[0.3em] font-black uppercase leading-none" style={{ fontFamily: "'Arial Black', Impact, sans-serif" }}>
              {data.logoText !== 'MilanoModern' ? data.logoText : 'MilanoModern'}
            </div>
          </div>

          <div className="flex items-center justify-end space-x-5 md:space-x-8 w-1/3">
            <button className="hidden sm:block hover:opacity-50 transition-opacity"><User className="w-[20px] h-[20px]" strokeWidth={1.5} /></button>
            <button className="hidden md:block hover:opacity-50 transition-opacity"><Heart className="w-[20px] h-[20px]" strokeWidth={1.5} /></button>
            <button className="hover:opacity-50 transition-opacity relative">
              <ShoppingBag className="w-[20px] h-[20px]" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      <main className="w-full pt-[60px] md:pt-[70px]">

        {/* ─── HERO CAMPAIGN (Stark, industrial edge) ─── */}
        <div className="relative h-[85vh] w-full overflow-hidden group cursor-pointer bg-[#f4f4f4]">
          <Image
            src={data.bannerImage}
            alt="Campaign"
            fill
            className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-[1500ms]"
            referrerPolicy="no-referrer"
            priority
          />
          {/* Subtle gradient to ensure text readability only at bottom */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent" />

          <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 md:pb-24 text-white z-10 px-4">
            <h2 className="text-[32px] md:text-[50px] font-bold mb-4 text-center tracking-[0.25em] uppercase leading-tight drop-shadow-md">
              {data.name}
            </h2>
            <p className="text-[12px] md:text-[14px] mb-8 font-medium tracking-[0.2em] uppercase text-center max-w-xl drop-shadow-sm">
              {data.description || "A dialogue between heritage and architectural innovation."}
            </p>
            <div className="flex gap-4">
              <button className="bg-white text-black px-10 py-3.5 text-[11px] font-black tracking-[0.2em] uppercase hover:bg-black hover:text-white transition-colors duration-300">
                Discover
              </button>
            </div>
          </div>
        </div>

        {/* ─── UTILITY TAPE (MilanoModern style moving text or static bold promo) ─── */}
        <div className="w-full bg-[#e6eada] text-black text-[10px] md:text-[11px] text-center py-3 tracking-[0.25em] uppercase font-bold border-y border-gray-200 cursor-pointer hover:bg-[#d8dccb] transition-colors">
          <span className="hidden sm:inline">Complimentary Shipping and Returns on all orders</span>
          <span className="sm:hidden">Complimentary Shipping & Returns</span>
        </div>

        {/* ─── NEW ARRIVALS GRID (Stark white BG, hovering focus) ─── */}
        <div className="w-full max-w-[1920px] mx-auto px-4 md:px-10 py-20 md:py-32">
          <div className="flex flex-col items-center justify-center mb-16 md:mb-24">
            <h3 className="text-[20px] md:text-[28px] font-black tracking-[0.25em] uppercase mb-6">New Arrivals</h3>
            <a href="#" className="flex items-center text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase border-b-2 border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-colors">
              View All <ArrowRight className="w-4 h-4 ml-2" strokeWidth={2} />
            </a>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-3 md:gap-x-6 gap-y-12 md:gap-y-20">
            {data.products.map((product) => (
              <div key={product.id} data-product-id={product.id} className="group cursor-pointer flex flex-col items-center text-center">
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#f4f4f4] mb-6 shadow-sm group-hover:shadow-md transition-shadow duration-500">
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    fill
                    className="object-contain p-6 group-hover:scale-110 transition-transform duration-[1000ms] mix-blend-multiply"
                    referrerPolicy="no-referrer"
                  />
                  {/* MilanoModern Signature Triangle tag proxy */}
                  <div className="absolute top-4 left-4">
                    {product.originalPrice && <span className="bg-black text-white px-2 py-1 text-[9px] font-black tracking-widest uppercase">Online Exclusive</span>}
                  </div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="p-2 bg-white/50 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                      <Heart className="w-[18px] h-[18px] text-black font-bold" strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-end w-full px-2">
                  <span className="text-[10px] tracking-[0.25em] uppercase text-gray-500 mb-3">{product.category || 'Collection'}</span>
                  <h4 className="text-[12px] md:text-[13px] font-bold tracking-[0.1em] uppercase mb-2 line-clamp-2 px-4 leading-relaxed group-hover:underline underline-offset-4">{product.title}</h4>
                  <div className="mt-2">
                    <span className="text-[12px] md:text-[14px] font-bold tracking-widest">${product.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── ARCHITECTURAL CATEGORY BLOCKS ─── */}
        <div className="w-full px-4 md:px-10 pb-24 md:pb-32">
          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
            {[
              { name: 'Bags', img: 'https://picsum.photos/800/1000?random=530' },
              { name: 'Womenswear', img: 'https://picsum.photos/800/1000?random=531' },
              { name: 'Shoes', img: 'https://picsum.photos/800/1000?random=532' },
            ].map((category, i) => (
              <div key={i} className="group cursor-pointer relative w-full aspect-[4/5] md:aspect-auto md:h-[70vh] overflow-hidden bg-[#e0e0e0]">
                <Image src={category.img} alt={category.name} fill className="object-cover group-hover:scale-[1.03] transition-transform duration-[1500ms]" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-500" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center text-white">
                  <h3 className="font-bold uppercase tracking-[0.2em] text-[20px] md:text-[28px] mb-4 drop-shadow-md">{category.name}</h3>
                  <button className="bg-white text-black px-8 py-3 text-[10px] font-black tracking-[0.2em] uppercase opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    Shop
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── RE-NYLON SUSTAINABILITY PROJECT ─── */}
        <div className="w-full bg-black text-white relative">
          <div className="flex flex-col lg:flex-row min-h-[70vh]">
            <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-20 py-20 lg:py-0 order-2 lg:order-1">
              <h2 className="text-[11px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-6 flex items-center">
                <span className="w-6 h-[1px] bg-gray-400 mr-4"></span> Sustainability
              </h2>
              <h3 className="text-[32px] md:text-[48px] font-black tracking-[0.2em] uppercase mb-8 leading-tight">MilanoModern<br />Re-Nylon</h3>
              <p className="text-[13px] md:text-[14px] font-medium tracking-wide leading-relaxed text-[#ccc] mb-12 max-w-lg text-justify">
                A groundbreaking evolution of the brand's most recognizable signifier. Re-Nylon is entirely crafted from regenerated nylon created through the recycling and purification of plastic collected from oceans, fishing nets, and textile fiber waste.
              </p>
              <button className="border-b border-white pb-1.5 text-[11px] font-bold tracking-[0.25em] uppercase hover:text-gray-400 hover:border-gray-400 transition-colors w-fit">
                Discover the Project
              </button>
            </div>

            <div className="w-full lg:w-1/2 relative min-h-[50vh] overflow-hidden group cursor-pointer order-1 lg:order-2">
              <Image src="https://picsum.photos/1000/1000?random=533" alt="Re-Nylon" fill className="object-cover group-hover:scale-105 transition-transform duration-[2000ms]" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors duration-500">
                <PlayCircle className="w-[80px] h-[80px] text-white opacity-90 group-hover:scale-110 transition-transform duration-500 stroke-[1]" />
              </div>
            </div>
          </div>
        </div>

        {/* ─── EDITORIAL CAMPAIGN ─── */}
        <div className="bg-[#e6eada] text-black py-20 md:py-32 px-4 md:px-10">
          <div className="w-full max-w-[1920px] mx-auto flex flex-col md:flex-row gap-12 md:gap-20 items-center">
            <div className="w-full md:w-[55%] relative aspect-[4/3] bg-white overflow-hidden group cursor-pointer shadow-lg">
              <Image src={`https://picsum.photos/1000/800?random=101`} alt="Editorial" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[2000ms]" />
            </div>
            <div className="w-full md:w-[45%] flex flex-col justify-center px-4 md:px-0">
              <h3 className="text-[28px] md:text-[40px] font-black tracking-[0.2em] uppercase leading-tight mb-8">Modernist<br />Vision</h3>
              <p className="font-medium tracking-wide leading-relaxed text-[13px] md:text-[14px] text-gray-800 mb-10 text-justify">
                Challenging conventions and redefining elegance through a continuous dialogue between past and future. A study in contrasts, where industrial materials meet traditional craftsmanship.
              </p>
              <button className="border-b-2 border-black pb-1 text-[11px] font-bold tracking-[0.2em] uppercase hover:text-gray-500 hover:border-gray-500 transition-colors w-fit">
                Discover the Campaign
              </button>
            </div>
          </div>
        </div>

        {/* ─── SERVICES GRID (Iconic bold line art) ─── */}
        <div className="w-full max-w-[1920px] mx-auto px-6 py-24 md:py-32 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12 lg:gap-20 text-center">
            {[
              { title: 'Complimentary Shipping', icon: Truck, desc: 'Enjoy free standard shipping and returns on all orders.' },
              { title: 'Client Services', icon: Shield, desc: 'Our advisors are available to assist you with any inquiries regarding products.' },
              { title: 'In-Store Appointments', icon: Menu, desc: 'Book a personalized shopping experience at your nearest boutique.' },
            ].map((service, i) => (
              <div key={i} className="flex flex-col items-center group cursor-pointer px-4">
                <service.icon className="w-10 h-10 mb-8 text-black group-hover:opacity-50 transition-opacity stroke-[1.5]" />
                <h3 className="text-[12px] md:text-[13px] font-bold uppercase tracking-[0.2em] mb-4 h-[40px] flex items-center">{service.title}</h3>
                <p className="text-[12px] font-medium tracking-wide text-gray-500 leading-relaxed mb-8 max-w-[280px] h-[60px]">{service.desc}</p>
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] border-b border-black pb-0.5 group-hover:text-gray-500 group-hover:border-gray-500 transition-colors mt-auto">
                  Discover More
                </span>
              </div>
            ))}
          </div>
        </div>

      </main>

      {/* ─── FOOTER (Corporate Brutalist) ─── */}
      <footer className="bg-white pt-24 pb-16">
        <div className="w-full max-w-[1920px] mx-auto px-6 md:px-10">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-16 gap-x-12 mb-28">

            <div className="flex flex-col space-y-5">
              <h4 className="text-[12px] font-black uppercase tracking-[0.2em] mb-4 text-black">Company</h4>
              <a href="#" className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-500 hover:text-black transition-colors w-fit">Fondazione MilanoModern</a>
              <a href="#" className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-500 hover:text-black transition-colors w-fit">MilanoModern Group</a>
              <a href="#" className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-500 hover:text-black transition-colors w-fit">Luna Rossa</a>
              <a href="#" className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-500 hover:text-black transition-colors w-fit">Sustainability</a>
              <a href="#" className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-500 hover:text-black transition-colors w-fit">Work with us</a>
            </div>

            <div className="flex flex-col space-y-5">
              <h4 className="text-[12px] font-black uppercase tracking-[0.2em] mb-4 text-black">Legal Terms and Conditions</h4>
              <a href="#" className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-500 hover:text-black transition-colors w-fit">Legal Notice</a>
              <a href="#" className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-500 hover:text-black transition-colors w-fit">Privacy Policy</a>
              <a href="#" className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-500 hover:text-black transition-colors w-fit">Cookie Policy</a>
              <a href="#" className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-500 hover:text-black transition-colors w-fit">Sitemap</a>
            </div>

            <div className="flex flex-col space-y-5">
              <h4 className="text-[12px] font-black uppercase tracking-[0.2em] mb-4 text-black">Client Services</h4>
              <a href="#" className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-500 hover:text-black transition-colors w-fit">Contact Us</a>
              <a href="#" className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-500 hover:text-black transition-colors w-fit">Track your order</a>
              <a href="#" className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-500 hover:text-black transition-colors w-fit">Returns</a>
              <a href="#" className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-500 hover:text-black transition-colors w-fit">FAQs</a>
            </div>

            <div className="flex flex-col">
              <h4 className="text-[12px] font-black uppercase tracking-[0.2em] mb-6 text-black">Newsletter</h4>
              <p className="text-[11px] font-medium tracking-[0.1em] text-gray-500 mb-6 leading-relaxed">
                Subscribe to receive news and updates about MilanoModern collections, campaigns and videos.
              </p>
              <div className="flex border-b border-black pb-2 group focus-within:border-gray-500">
                <input type="email" placeholder="Email address" className="bg-transparent outline-none w-full text-[12px] placeholder-gray-400 font-medium tracking-wider" />
                <button className="text-[10px] font-black uppercase tracking-[0.2em] hover:text-gray-500 transition-colors">Subscribe</button>
              </div>

              <div className="pt-10 flex space-x-8">
                <a href="#" className="text-black hover:text-gray-400 transition-colors"><Instagram className="w-[18px] h-[18px]" strokeWidth={1.5} /></a>
                <a href="#" className="text-black hover:text-gray-400 transition-colors"><Twitter className="w-[18px] h-[18px]" strokeWidth={1.5} /></a>
                <a href="#" className="text-black hover:text-gray-400 transition-colors"><Facebook className="w-[18px] h-[18px]" strokeWidth={1.5} /></a>
                <a href="#" className="text-black hover:text-gray-400 transition-colors"><Youtube className="w-[18px] h-[18px]" strokeWidth={1.5} /></a>
              </div>
            </div>

          </div>

          <div className="pt-10 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 space-y-6 md:space-y-0">
            <div className="flex items-center space-x-6">
              <span className="text-black text-[22px] tracking-[0.25em] font-black leading-none" style={{ fontFamily: "'Arial Black', Impact, sans-serif" }}>MilanoModern</span>
            </div>

            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
              <a href="#" className="hover:text-black transition-colors">Store Locator</a>
              <span className="hidden md:inline">|</span>
              <a href="#" className="hover:text-black transition-colors">Language: English</a>
              <span className="hidden md:inline">|</span>
              <span>© MilanoModern 2026</span>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
