import React from 'react';
import { StoreData } from '@/lib/types';
import { Search, ShoppingCart, User, MapPin, ArrowRight, PlayCircle, Shield, Zap, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function SportOpticsTemplate({ data }: { data: StoreData }) {
  return (
    <div className="min-h-full bg-[#111111] font-sans text-white">
      <div className="bg-[#000000] text-gray-300 text-[11px] py-2 px-6 flex justify-center font-bold tracking-widest uppercase border-b border-gray-800">
        Free Shipping & Returns
      </div>
      <header className="bg-[#111111] sticky top-0 z-50 border-b border-gray-800 shadow-sm">
        <div className="w-full mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <nav className="hidden lg:flex space-x-6 font-sans text-[13px] font-black uppercase tracking-widest text-white">
              <a href="#" className="hover:text-gray-400 transition-colors">Sunglasses</a>
              <a href="#" className="hover:text-gray-400 transition-colors">Apparel</a>
              <a href="#" className="hover:text-gray-400 transition-colors">Accessories</a>
              <a href="#" className="hover:text-gray-400 transition-colors">Custom</a>
            </nav>
          </div>
          <div className="flex items-center justify-center cursor-pointer shrink-0 absolute left-1/2 -translate-x-1/2">
            <span className="font-sans text-4xl font-black tracking-tighter uppercase leading-none text-white">
              SportOptics
            </span>
          </div>
          <div className="flex items-center space-x-6 text-white">
            <Search className="w-5 h-5 cursor-pointer hover:text-gray-400 transition-colors" />
            <MapPin className="w-5 h-5 cursor-pointer hover:text-gray-400 transition-colors" />
            <User className="w-5 h-5 cursor-pointer hover:text-gray-400 transition-colors" />
            <div className="relative cursor-pointer hover:text-gray-400 transition-colors">
              <ShoppingCart className="w-5 h-5" />
            </div>
          </div>
        </div>
      </header>
      <main className="w-full mx-auto px-6 py-12">
        <div className="relative h-[650px] mb-20 group cursor-pointer overflow-hidden">
          <img src={data.bannerImage} alt="Banner" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-16 left-16 text-white max-w-2xl">
            <h1 className="text-7xl font-black uppercase tracking-tighter mb-4 leading-none drop-shadow-2xl">{data.name}</h1>
            <p className="text-xl font-bold uppercase tracking-widest mb-8 drop-shadow-md text-gray-300">{data.description}</p>
            <button className="bg-white text-black px-12 py-4 font-sans font-black uppercase text-[14px] tracking-widest hover:bg-gray-200 transition-all">
              Shop Now
            </button>
          </div>
        </div>
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black uppercase tracking-tighter text-white mb-2">Best Sellers</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
            {data.products.map(product => (
              <div key={product.id} data-product-id={product.id} className="group cursor-pointer flex flex-col items-center text-center">
                <div className="relative aspect-[4/3] mb-4 overflow-hidden w-full bg-[#1a1a1a] rounded-lg">
                  <img src={product.imageUrl} alt={product.title} className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-[1500ms]" />
                </div>
                <div className="flex flex-col space-y-1">
                  <h3 className="text-sm font-black uppercase tracking-widest text-white">{product.title}</h3>
                  <div className="text-[11px] font-sans font-bold uppercase tracking-widest text-gray-500">{product.category}</div>
                  <div className="pt-2">
                    <span className="font-sans font-black text-[16px] text-white">${product.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shop by Category */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black uppercase tracking-tighter text-white mb-2">Shop by Category</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Sunglasses', img: 'https://picsum.photos/600/400?random=480' },
              { name: 'Apparel', img: 'https://picsum.photos/600/400?random=481' },
              { name: 'Accessories', img: 'https://picsum.photos/600/400?random=482' },
            ].map((category, i) => (
              <div key={i} className="group cursor-pointer relative aspect-video overflow-hidden bg-[#1a1a1a]">
                <img src={category.img} alt={category.name} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                  <h3 className="text-2xl font-black uppercase tracking-tighter text-white">{category.name}</h3>
                  <ArrowRight className="w-6 h-6 text-white transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Program */}
        <div className="mb-24 bg-[#1a1a1a] p-12 md:p-24 flex flex-col md:flex-row items-center justify-between border border-gray-800">
          <div className="w-full md:w-1/2 mb-12 md:mb-0 md:pr-20">
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-500 mb-6">SportOptics Custom</h2>
            <h3 className="text-5xl font-black uppercase tracking-tighter mb-8 leading-tight">Build Your Own</h3>
            <p className="text-lg text-gray-400 mb-10 leading-relaxed font-medium">
              Choose your frame, lens, and icon colors. Add a custom etching to make them truly yours. Millions of combinations available.
            </p>
            <button className="bg-white text-black px-10 py-4 font-black uppercase text-[14px] tracking-widest hover:bg-gray-200 transition-all">
              Start Customizing
            </button>
          </div>
          <div className="w-full md:w-1/2 relative aspect-square overflow-hidden group cursor-pointer bg-black rounded-full">
            <img src="https://picsum.photos/800/800?random=483" alt="Custom" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms] opacity-80" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 border-4 border-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="font-black uppercase tracking-widest text-white text-xl">Custom</span>
              </div>
            </div>
          </div>
        </div>

        {/* Technology */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black uppercase tracking-tighter text-white mb-4">Prizm™ Technology</h2>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-sm max-w-2xl mx-auto">See what you've been missing. Prizm™ Lens Technology is engineered to enhance color and contrast so you can see more detail.</p>
          </div>
          <div className="relative h-[500px] rounded-lg overflow-hidden group cursor-pointer">
            <img src="https://picsum.photos/1200/500?random=484" alt="Technology" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms]" />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center">
              <PlayCircle className="w-20 h-20 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
            </div>
          </div>
        </div>

        {/* MVP Rewards */}
        <div className="mb-24 bg-gradient-to-r from-gray-900 to-black p-12 md:p-24 flex flex-col md:flex-row items-center justify-between border border-gray-800 rounded-lg">
          <div className="w-full md:w-1/2 mb-12 md:mb-0">
            <div className="flex items-center mb-6">
              <Shield className="w-12 h-12 text-white mr-6" />
              <h2 className="text-4xl font-black uppercase tracking-tighter">SportOptics MVP</h2>
            </div>
            <p className="text-lg text-gray-400 mb-10 leading-relaxed font-medium max-w-md">
              Join the MVP program for exclusive access to new products, member-only events, and free shipping on all orders.
            </p>
            <div className="flex space-x-6">
              <button className="bg-white text-black px-10 py-4 font-black uppercase text-[14px] tracking-widest hover:bg-gray-200 transition-all">
                Join Now
              </button>
              <button className="bg-transparent border-2 border-white text-white px-10 py-4 font-black uppercase text-[14px] tracking-widest hover:bg-white hover:text-black transition-all">
                Sign In
              </button>
            </div>
          </div>
          <div className="w-full md:w-1/2 grid grid-cols-2 gap-6">
            <div className="bg-[#1a1a1a] p-8 rounded-lg text-center border border-gray-800">
              <Zap className="w-8 h-8 text-white mx-auto mb-4" />
              <h4 className="font-black uppercase tracking-widest text-sm mb-2">Early Access</h4>
              <p className="text-xs text-gray-500 font-bold">Shop new drops first</p>
            </div>
            <div className="bg-[#1a1a1a] p-8 rounded-lg text-center border border-gray-800">
              <Shield className="w-8 h-8 text-white mx-auto mb-4" />
              <h4 className="font-black uppercase tracking-widest text-sm mb-2">Protection</h4>
              <p className="text-xs text-gray-500 font-bold">50% off replacement pairs</p>
            </div>
          </div>
        </div>

      </main>
      <footer className="bg-[#000000] text-white pt-24 pb-12 border-t border-gray-800">
        <div className="w-full mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20 text-[11px] font-sans font-bold uppercase tracking-widest text-gray-400">
            <div className="flex flex-col space-y-6">
              <h4 className="text-white mb-2 text-sm tracking-tighter">Support</h4>
              <a href="#" className="hover:text-white transition-colors">Order Status</a>
              <a href="#" className="hover:text-white transition-colors">Returns</a>
              <a href="#" className="hover:text-white transition-colors">Product Care</a>
              <a href="#" className="hover:text-white transition-colors">Shipping Information</a>
              <a href="#" className="hover:text-white transition-colors">Warranty</a>
              <a href="#" className="hover:text-white transition-colors">FAQ</a>
            </div>
            <div className="flex flex-col space-y-6">
              <h4 className="text-white mb-2 text-sm tracking-tighter">Company Info</h4>
              <a href="#" className="hover:text-white transition-colors">About SportOptics</a>
              <a href="#" className="hover:text-white transition-colors">Careers</a>
              <a href="#" className="hover:text-white transition-colors">Store Locator</a>
              <a href="#" className="hover:text-white transition-colors">Site Map</a>
            </div>
            <div className="flex flex-col space-y-6">
              <h4 className="text-white mb-2 text-sm tracking-tighter">Programs</h4>
              <a href="#" className="hover:text-white transition-colors">SportOptics MVP</a>
              <a href="#" className="hover:text-white transition-colors">Student Discount</a>
              <a href="#" className="hover:text-white transition-colors">Military & First Responders</a>
              <a href="#" className="hover:text-white transition-colors">Affiliate Program</a>
            </div>
            <div className="flex flex-col space-y-6">
              <h4 className="text-white mb-2 text-sm tracking-tighter">Stay Connected</h4>
              <p className="text-gray-500 normal-case tracking-normal font-medium text-sm mb-4">Sign up for updates, new releases, and exclusive offers.</p>
              <div className="flex border-b border-gray-600 pb-2">
                <input type="email" placeholder="Email Address" className="bg-transparent outline-none w-full text-white placeholder-gray-600" />
                <button className="hover:text-white transition-colors ml-4"><ArrowRight className="w-5 h-5" /></button>
              </div>
              <div className="pt-8 flex space-x-6">
                <a href="#" className="text-gray-500 hover:text-white transition-colors"><Instagram className="w-6 h-6" /></a>
                <a href="#" className="text-gray-500 hover:text-white transition-colors"><Facebook className="w-6 h-6" /></a>
                <a href="#" className="text-gray-500 hover:text-white transition-colors"><Twitter className="w-6 h-6" /></a>
                <a href="#" className="text-gray-500 hover:text-white transition-colors"><Youtube className="w-6 h-6" /></a>
              </div>
            </div>
          </div>
          
          <div className="pt-12 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between text-[10px] font-sans font-bold uppercase tracking-widest text-gray-600 space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6">
              <span className="font-sans text-2xl font-black tracking-tighter uppercase leading-none text-white">
                SportOptics
              </span>
              <span>© 2026 SportOptics, Inc. All rights reserved.</span>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Report Fake</a>
              <a href="#" className="hover:text-white transition-colors">Do Not Sell My Info</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
