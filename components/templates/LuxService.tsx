'use client';
import React, { useState } from 'react';
import { StoreData } from '@/lib/types';
import { Search, ShoppingBag, Heart, User, Menu, ChevronDown, MapPin, ArrowRight, Smartphone, Facebook, Twitter, Instagram, Youtube, Gift, Truck, Star, Sparkles, Clock, Percent, ShieldCheck, Shirt, Scissors, Eye, ChevronRight, Mail } from 'lucide-react';

export default function LuxServiceTemplate({ data }: { data: StoreData }) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <div className="min-h-full bg-white font-sans text-stone-900 selection:bg-stone-900 selection:text-white">
      {/* Editorial Announcement Bar */}
      <div className="bg-stone-100 py-3 px-6 flex justify-center items-center gap-10 border-b border-stone-200 text-[11px] font-bold uppercase tracking-[0.2em] relative z-[110]">
        <div className="hidden md:flex items-center gap-3">
          <Percent className="w-4 h-4" />
          <span>Anniversary Sale Early Access starts soon. <a href="#" className="underline ml-2 hover:opacity-70">Join Today</a></span>
        </div>
        <div className="flex-1 text-center md:flex-initial">
          Free Shipping. Free Returns. All the time. <a href="#" className="underline ml-2 hover:opacity-70 transition-opacity">Details</a>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <ShieldCheck className="w-4 h-4" />
          <span>Safety & Security First</span>
        </div>
      </div>

      <header className="bg-white sticky top-0 z-[100] border-b border-stone-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
        <div className="max-w-[1536px] mx-auto px-8">
          {/* Main Integrated Header */}
          <div className="py-8 flex flex-col items-center">
            {/* Logo - Iconic Minimalist */}
            <div className="font-serif text-5xl tracking-[0.25em] uppercase cursor-pointer mb-10 text-stone-950 transition-all hover:tracking-[0.3em]">
              LUXSERVICE
            </div>

            <div className="w-full flex items-center justify-between gap-12">
              {/* Refined Navigation */}
              <nav className="hidden lg:flex items-center gap-10 font-bold text-[13px] uppercase tracking-[0.15em] text-stone-600">
                {['Women', 'Men', 'Kids', 'Home', 'Beauty', 'Designer', 'Gifts', 'Sale'].map(item => (
                  <a
                    key={item}
                    href="#"
                    onMouseEnter={() => setActiveCategory(item)}
                    className={`hover:text-stone-950 transition-all relative pb-2 group ${item === 'Sale' ? 'text-[#c61044]' : ''}`}
                  >
                    {item}
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-stone-950 group-hover:w-full transition-all duration-300" />
                  </a>
                ))}
              </nav>

              <div className="flex-1 max-w-lg hidden xl:block">
                <div className="relative flex items-center border-b border-stone-300 py-2 focus-within:border-stone-950 transition-all group">
                  <Search className="w-4 h-4 text-stone-400 mr-4 group-focus-within:text-stone-950" />
                  <input
                    type="text"
                    placeholder="Search for products or brands"
                    className="bg-transparent outline-none text-[12px] w-full font-medium placeholder:text-stone-300"
                  />
                  <button className="text-[10px] font-black uppercase tracking-widest text-stone-400 hover:text-stone-950">Enter</button>
                </div>
              </div>

              {/* Utility Icons */}
              <div className="flex items-center gap-10 text-stone-800">
                <div className="flex items-center gap-3 cursor-pointer hover:opacity-60 transition-opacity group">
                  <User className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="hidden xl:inline text-[11px] font-black uppercase tracking-widest">Sign In</span>
                </div>
                <div className="flex items-center gap-3 cursor-pointer hover:opacity-60 transition-opacity group">
                  <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="hidden xl:inline text-[11px] font-black uppercase tracking-widest">Wish List</span>
                </div>
                <div className="relative cursor-pointer hover:opacity-60 transition-opacity group flex items-center gap-3">
                  <ShoppingBag className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  <span className="absolute -top-1 -right-2 bg-stone-950 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full ring-2 ring-white">0</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Nordy Club Quick Access */}
        <div className="bg-stone-50/50 backdrop-blur-md border-t border-stone-100 py-3 px-8">
          <div className="max-w-[1536px] mx-auto flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-stone-500">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2 cursor-pointer hover:text-stone-950 group">
                <MapPin className="w-3.5 h-3.5 group-hover:animate-bounce" />
                Your Location: <span className="text-stone-950">Seattle, WA</span>
              </div>
              <div className="w-px h-3 bg-stone-300" />
              <a href="#" className="hover:text-stone-950">Store Locator</a>
              <a href="#" className="hover:text-stone-950">LuxService Services</a>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-stone-950">
                <Sparkles className="w-3.5 h-3.5 text-stone-400" />
                The Nordy Club: <span className="underline cursor-pointer">Member Since 2024</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1536px] mx-auto px-8 py-16">
        {/* Cinematic Minimalist Hero */}
        <div className="relative h-[800px] mb-32 rounded-lg overflow-hidden group cursor-pointer">
          <img src={data.bannerImage} alt="Banner" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3s]" />
          <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-transparent transition-colors duration-1000" />
          <div className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-center text-center p-20 bg-gradient-to-t from-white via-white/80 to-transparent">
            <div className="text-[12px] font-black tracking-[0.5em] text-stone-400 mb-6 uppercase">Seasonal Spotlight</div>
            <h1 className="text-8xl lg:text-9xl font-serif mb-8 tracking-tighter text-stone-950 italic">{data.name}</h1>
            <p className="text-2xl font-light text-stone-600 mb-14 max-w-3xl leading-relaxed tracking-tight">
              {data.description || "An editorial curation of this season's most-coveted luxury essentials and minimalist everyday pieces."}
            </p>
            <div className="flex flex-col sm:flex-row gap-10">
              <button className="bg-stone-950 text-white px-16 py-5 font-black uppercase text-[12px] tracking-widest hover:bg-stone-800 transition-all shadow-2xl active:scale-95">
                Discover the Collection
              </button>
              <button className="bg-white text-stone-950 border border-stone-200 px-16 py-5 font-black uppercase text-[12px] tracking-widest hover:bg-stone-50 transition-all backdrop-blur-sm">
                Shop Men&apos;s Luxe
              </button>
            </div>
          </div>
        </div>

        {/* Global Catalog Section */}
        <div className="mb-40">
          <div className="flex flex-col sm:flex-row items-end justify-between mb-20 border-b border-stone-200 pb-10">
            <div className="space-y-3">
              <div className="text-[11px] font-black tracking-[0.4em] text-stone-300 uppercase">Curated For You</div>
              <h2 className="text-5xl font-serif italic tracking-tight text-stone-950">New <span className="not-italic">Arrivals</span></h2>
            </div>
            <div className="flex items-center gap-4 mt-8 sm:mt-0 font-black text-[11px] tracking-widest cursor-pointer group hover:text-stone-400 transition-colors uppercase">
              View All 1,420 Items <ArrowRight className="w-5 h-5 group-hover:translate-x-3 transition-transform" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-x-12 gap-y-24">
            {data.products.map((product) => (
              <div key={product.id} data-product-id={product.id} className="group cursor-pointer flex flex-col">
                <div className="relative aspect-[2/3] mb-8 overflow-hidden bg-stone-50 rounded-sm">
                  <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s]" />
                  <div className="absolute inset-0 bg-stone-950/0 group-hover:bg-stone-950/[0.02] transition-colors" />

                  {/* Premium Hover Actions */}
                  <div className="absolute top-6 right-6 flex flex-col gap-3 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                    <button className="bg-white/90 backdrop-blur-md p-3 rounded-full shadow-2xl hover:bg-stone-950 hover:text-white transition-all">
                      <Heart className="w-4 h-4" />
                    </button>
                    <button className="bg-white/90 backdrop-blur-md p-3 rounded-full shadow-2xl hover:bg-stone-950 hover:text-white transition-all">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="absolute bottom-6 inset-x-6 flex flex-wrap gap-2 justify-center translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                    {['S', 'M', 'L', 'XL'].map(size => (
                      <button key={size} className="w-10 h-10 bg-white/95 backdrop-blur-sm border border-stone-200 text-[10px] font-black hover:bg-stone-950 hover:text-white hover:border-stone-950 transition-all uppercase rounded-sm">
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="text-[10px] font-black uppercase tracking-[0.25em] text-stone-400 transition-colors group-hover:text-stone-950">
                    {product.category || "Designer Essentials"}
                  </div>
                  <h3 className="text-[15px] font-medium text-stone-900 leading-relaxed group-hover:underline underline-offset-4 decoration-stone-200 line-clamp-2 min-h-[44px]">
                    {product.title}
                  </h3>
                  <div className="flex flex-col gap-1.5 pt-1">
                    <div className="flex items-baseline gap-3">
                      <span className="text-xl font-bold tracking-tighter text-stone-950">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-xs font-medium text-stone-400 line-through">${product.originalPrice}</span>
                      )}
                    </div>
                    <div className="text-[10px] font-bold text-stone-400 uppercase tracking-tighter flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5" />
                      Free Shipping
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* The Thread - Editorial Center */}
        <div className="mb-40 grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="group cursor-pointer relative h-[700px] overflow-hidden rounded-sm">
            <img src="https://picsum.photos/1000/1200?random=476" alt="Ed" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]" />
            <div className="absolute inset-0 bg-stone-900/20 group-hover:bg-stone-900/10 transition-colors" />
            <div className="absolute bottom-20 left-20 right-20 space-y-8 bg-white/90 backdrop-blur-xl p-16 border border-white/20 shadow-[-30px_30px_60px_rgba(0,0,0,0.1)]">
              <div className="text-[11px] font-black tracking-[0.4em] text-stone-400 uppercase">The Editorial Edit</div>
              <h3 className="text-5xl font-serif text-stone-950 leading-tight italic">Summer Linen <br />& Luxury Shades</h3>
              <p className="text-stone-600 font-light leading-relaxed max-w-sm">
                Effortless elegance for every golden hour occasion. Discover our curated summer lookbook.
              </p>
              <button className="flex items-center gap-4 text-[11px] font-black uppercase tracking-widest text-stone-950 border-b-2 border-stone-950 pb-2 hover:gap-8 transition-all">
                Shop the lookbook <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex flex-col justify-between py-10">
            <div className="space-y-6">
              <h4 className="text-[12px] font-black tracking-[0.5em] text-stone-300 uppercase">LuxService Services</h4>
              <h3 className="text-5xl font-serif text-stone-950 leading-tight">We&apos;re here <br />to help.</h3>
            </div>

            <div className="grid grid-cols-1 gap-12">
              {[
                { title: 'Free Style Help', desc: 'Connect with a stylist for personalized advice, online or in store.', icon: <Sparkles className="w-6 h-6" /> },
                { title: 'Expert Alterations', desc: 'Ensure the perfect fit with our professional tailoring services.', icon: <Scissors className="w-6 h-6" /> },
                { title: 'Curbside Pickup', desc: 'Order online and pick up at your convenience, contact-free.', icon: <Clock className="w-6 h-6" /> },
              ].map((service, i) => (
                <div key={i} className="flex gap-8 group cursor-pointer">
                  <div className="w-14 h-14 bg-stone-50 rounded-full flex items-center justify-center shrink-0 border border-stone-100 group-hover:bg-stone-950 group-hover:text-white transition-all">
                    {service.icon}
                  </div>
                  <div className="space-y-2 border-b border-stone-100 pb-8 w-full group-hover:border-stone-950 transition-colors">
                    <h5 className="font-black text-[13px] uppercase tracking-widest">{service.title}</h5>
                    <p className="text-stone-500 text-sm font-light leading-relaxed">{service.desc}</p>
                    <div className="text-[10px] font-black text-stone-950 uppercase tracking-widest flex items-center gap-2 pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      Learn More <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* The Nordy Club - High Fidelity Loyalty */}
        <div className="bg-stone-950 text-white rounded-3xl p-16 lg:p-32 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between shadow-[0_40px_80px_rgba(0,0,0,0.3)] border border-stone-800">
          <div className="absolute top-0 right-0 p-20 opacity-[0.03] scale-150 rotate-45 pointer-events-none">
            <div className="font-serif text-[400px] leading-none select-none">N</div>
          </div>

          <div className="max-w-2xl relative z-10 space-y-12 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-4">
              <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-md">
                <Sparkles className="w-10 h-10 text-white fill-current" />
              </div>
              <h2 className="text-4xl font-serif italic tracking-tight uppercase">The Nordy Club</h2>
            </div>
            <h3 className="text-6xl font-serif text-white leading-tight">Get rewarded <br />for your <span className="text-stone-400">great style.</span></h3>
            <p className="text-stone-500 text-xl font-light leading-relaxed">
              Join our free loyalty program and earn points on every purchase. Level up to Platinum and unlock free alterations, lifestyle experiences, and early access to sales.
            </p>
            <div className="flex flex-col sm:flex-row gap-8 justify-center lg:justify-start pt-6">
              <button className="bg-white text-stone-950 px-16 py-5 font-black uppercase text-[12px] tracking-widest hover:bg-stone-200 transition-all shadow-2xl active:scale-95">
                Join for Free
              </button>
              <button className="border-2 border-stone-800 text-white px-16 py-5 font-black uppercase text-[12px] tracking-widest hover:bg-white hover:text-stone-950 transition-all rounded-md">
                Nordy Club Benefits
              </button>
            </div>
          </div>

          <div className="w-full lg:w-[450px] aspect-[1.58/1] perspective-1000 group hidden md:block mt-20 lg:mt-0">
            <div className="w-full h-full bg-gradient-to-br from-stone-800 via-stone-900 to-black rounded-3xl border border-stone-700 shadow-[0_50px_100px_rgba(0,0,0,0.5)] p-12 flex flex-col justify-between transform transition-transform duration-1000 group-hover:rotate-x-12 group-hover:translate-z-10 group-hover:shadow-[0_80px_160px_rgba(0,0,0,0.6)]">
              <div className="flex justify-between items-start">
                <div className="font-serif text-3xl tracking-widest text-stone-100">LUXSERVICE</div>
                <User className="w-8 h-8 text-stone-500" />
              </div>
              <div className="space-y-8">
                <div className="font-mono text-2xl tracking-[0.4em] text-stone-500">**** **** **** 2024</div>
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <div className="text-[9px] font-black text-stone-600 uppercase tracking-widest">Points Balance</div>
                    <div className="text-2xl font-black text-white italic">14,250</div>
                  </div>
                  <div className="bg-white text-stone-950 px-5 py-2 rounded-sm font-black italic text-[11px] tracking-widest skew-x-[-12deg] shadow-lg">
                    PLATINUM
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Minimalism Legacy Footer */}
      <footer className="bg-stone-50 border-t border-stone-100 pt-40 pb-20">
        <div className="max-w-[1536px] mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-24 mb-32">
            <div className="lg:col-span-1 space-y-10">
              <div className="font-serif text-3xl tracking-[0.2em] uppercase text-stone-950">LUXSERVICE</div>
              <p className="text-[13px] text-stone-400 font-light leading-relaxed">
                Celebrating over 120 years of customer service and style. Our commitment to excellence remains unchanged.
              </p>
              <div className="flex gap-8 text-stone-400">
                <Facebook className="w-5 h-5 hover:text-stone-950 cursor-pointer transition-colors" />
                <Instagram className="w-5 h-5 hover:text-stone-950 cursor-pointer transition-colors" />
                <Twitter className="w-5 h-5 hover:text-stone-950 cursor-pointer transition-colors" />
                <Youtube className="w-5 h-5 hover:text-stone-950 cursor-pointer transition-colors" />
              </div>
            </div>

            <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-4 gap-12">
              <div className="space-y-8">
                <h4 className="font-black text-[11px] uppercase tracking-[0.3em] text-stone-950">Customer Service</h4>
                <nav className="flex flex-col gap-4 text-[12px] font-medium text-stone-500">
                  {['Contact Us', 'Order Status', 'Shipping', 'Return Policy & Exchanges', 'Price Adjustments', 'Gift Cards', 'FAQ'].map(l => (
                    <a key={l} href="#" className="hover:text-stone-950 transition-colors">{l}</a>
                  ))}
                </nav>
              </div>
              <div className="space-y-8">
                <h4 className="font-black text-[11px] uppercase tracking-[0.3em] text-stone-950">About LuxService</h4>
                <nav className="flex flex-col gap-4 text-[12px] font-medium text-stone-500">
                  {['Careers', 'Corporate Social Responsibility', 'Diversity & Inclusion', 'Investors', 'Press Releases', 'LuxService Media Network'].map(l => (
                    <a key={l} href="#" className="hover:text-stone-950 transition-colors">{l}</a>
                  ))}
                </nav>
              </div>
              <div className="space-y-8">
                <h4 className="font-black text-[11px] uppercase tracking-[0.3em] text-stone-900">Stores & Services</h4>
                <nav className="flex flex-col gap-4 text-[12px] font-medium text-stone-500">
                  {['Find a Store', 'Free Style Help', 'Alterations & Tailoring', 'Spa LuxService', 'LuxService Local', 'Restaurants'].map(l => (
                    <a key={l} href="#" className="hover:text-stone-950 transition-colors">{l}</a>
                  ))}
                </nav>
              </div>
              <div className="space-y-12">
                <div className="space-y-8">
                  <h4 className="font-black text-[11px] uppercase tracking-[0.3em] text-stone-900">Get the LuxService App</h4>
                  <div className="flex gap-4">
                    <button className="bg-stone-950 text-white p-4 rounded-lg flex items-center justify-center hover:bg-stone-800 transition-all shadow-xl">
                      <Smartphone className="w-6 h-6" />
                    </button>
                    <div className="text-[11px] font-black uppercase leading-tight tracking-widest pt-2">
                      Scan to <br />Download
                    </div>
                  </div>
                </div>
                <div className="bg-white p-8 rounded-2xl border border-stone-200 space-y-4 shadow-sm">
                  <div className="flex items-center gap-2 text-stone-950 font-black text-[11px] uppercase tracking-widest border-b border-stone-100 pb-3">
                    <Mail className="w-4 h-4" /> Editorial Newsletter
                  </div>
                  <p className="text-[11px] font-medium text-stone-500 leading-relaxed">Early access to sales and the latest fashion edits.</p>
                  <div className="flex border-b border-stone-300 py-2">
                    <input type="email" placeholder="Email Address" className="bg-transparent text-[11px] outline-none w-full font-bold" />
                    <button className="text-[10px] font-black uppercase text-stone-950">Sign Up</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-center pt-20 border-t border-stone-200 gap-12">
            <div className="flex items-center gap-6">
              <div className="font-serif text-2xl tracking-[0.2em] uppercase text-stone-950">LUXSERVICE</div>
              <div className="text-[11px] font-medium text-stone-400 tracking-wider">© 2026 LuxService, Inc. All rights reserved.</div>
            </div>
            <div className="flex flex-wrap justify-center gap-12 text-[10px] font-black uppercase tracking-widest text-stone-400">
              <a href="#" className="hover:text-stone-950 transition-colors">Privacy</a>
              <a href="#" className="hover:text-stone-950 transition-colors">Your Privacy Choices</a>
              <a href="#" className="hover:text-stone-950 transition-colors">Terms & Conditions</a>
              <a href="#" className="hover:text-stone-950 transition-colors">Interest-Based Ads</a>
              <a href="#" className="hover:text-stone-950 transition-colors">CA Supply Chains Act</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
