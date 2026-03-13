'use client';

import React, { useState } from 'react';
import { StoreData } from '@/lib/types';
import { Search, MessageSquare, User, ShoppingCart, Menu, ShieldCheck, Globe, ChevronRight, Award, Truck, HeadphonesIcon, Factory, Star, CheckCircle2, Zap, LayoutGrid, PackageCheck, X } from 'lucide-react';
import { usePagination, ProductPagination } from './shared/Pagination';

export default function TradeVaultTemplate({ data }: { data: StoreData }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  
  const itemsPerPage = 15; // 3 rows x 5 columns
  const {
    currentPage,
    totalPages,
    paginatedItems,
    handlePageChange,
    totalItems,
  } = usePagination(data.products, itemsPerPage);

  const addToCart = () => {
    setCartCount(prev => prev + 1);
  };
  return (
    <div className="min-h-full bg-[#f2f3f7] font-sans text-[#222]">
      {/* Top Bar - Ultra Precise */}
      <div className="bg-white border-b border-gray-200 text-[11px] py-1.5 px-6 hidden lg:flex justify-between items-center text-gray-500">
        <div className="flex space-x-6">
          <a href="#" className="hover:text-[#ff6a00] flex items-center gap-1 font-medium"><Factory className="w-3 h-3" /> Manufacturers</a>
          <a href="#" className="hover:text-[#ff6a00] font-medium">Ready to Ship</a>
          <a href="#" className="hover:text-[#ff6a00] font-medium">Personal Protective Equipment</a>
        </div>
        <div className="flex space-x-6 items-center">
          <a href="#" className="hover:text-[#ff6a00] font-medium">Services & Membership</a>
          <a href="#" className="hover:text-[#ff6a00] font-medium">Help Center</a>
          <span className="flex items-center space-x-1 cursor-pointer hover:text-[#ff6a00] font-medium">
            <Globe className="w-3.5 h-3.5" />
            <span>English - USD</span>
          </span>
        </div>
      </div>

      {/* Header - Enterprise Grid */}
      <header className="bg-white sticky top-0 z-[60] shadow-[0_2px_15px_rgba(0,0,0,0.05)] py-3 px-6">
        <div className="max-w-[1440px] mx-auto flex items-center gap-8">
          {/* Logo */}
          <div className="shrink-0 flex items-center gap-3">
            <div className="text-[#ff6a00] font-black text-3xl tracking-tighter italic">
              TradeVault<span className="text-[#333] not-italic">.com</span>
            </div>
          </div>

          {/* Search - Signature Orange Border */}
          <div className="flex-1 max-w-3xl">
            <div className="flex border-[2.5px] border-[#ff6a00] rounded-full overflow-hidden shadow-sm group transition-shadow focus-within:shadow-md">
              <div className="bg-gray-50 text-gray-700 text-sm px-5 border-r border-gray-200 hidden md:flex items-center gap-2 cursor-pointer font-semibold">
                Products
                <Menu className="w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="What are you looking for..."
                className="flex-1 px-5 py-2.5 outline-none text-sm placeholder:text-gray-400"
              />
              <button className="bg-[#ff6a00] text-white px-10 py-2.5 font-bold hover:bg-[#e55f00] flex items-center space-x-2 transition-colors">
                <Search className="w-5 h-5 stroke-[2.5]" />
                <span className="hidden sm:inline">Search</span>
              </button>
            </div>
          </div>

          {/* Action Icons */}
          <div className="flex items-center space-x-8 shrink-0">
            <div className="flex flex-col items-center cursor-pointer group">
              <User className="w-6 h-6 text-gray-700 group-hover:text-[#ff6a00] transition-colors" />
              <span className="text-[11px] mt-1 font-medium group-hover:text-[#ff6a00]">Sign In</span>
            </div>
            <div className="flex flex-col items-center cursor-pointer group relative">
              <MessageSquare className="w-6 h-6 text-gray-700 group-hover:text-[#ff6a00] transition-colors" />
              <span className="text-[11px] mt-1 font-medium group-hover:text-[#ff6a00]">Messages</span>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold">2</div>
            </div>
            <div 
              onClick={addToCart}
              className="flex flex-col items-center cursor-pointer group relative"
            >
              <ShoppingCart className="w-6 h-6 text-gray-700 group-hover:text-[#ff6a00] transition-colors" />
              <span className="text-[11px] mt-1 font-medium group-hover:text-[#ff6a00]">Cart</span>
              {cartCount > 0 && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#ff6a00] rounded-full text-[10px] text-white flex items-center justify-center font-bold">{cartCount}</div>
              )}
            </div>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Ribbon Nav */}
      <nav className="bg-white border-b border-gray-100 hidden md:block">
        <div className="max-w-[1440px] mx-auto px-6 flex items-center space-x-10 text-[13px] font-bold py-2.5">
          <div className="flex items-center space-x-2 cursor-pointer text-[#ff6a00]">
            <LayoutGrid className="w-4 h-4" />
            <span>All categories</span>
          </div>
          {['Managed Selection', 'Trade Assurance', 'TradeVault.com Membership', 'Buyer Central', 'Help Center'].map((link) => (
            <a key={link} href="#" className="text-gray-700 hover:text-[#ff6a00] transition-colors shrink-0">
              {link}
            </a>
          ))}
        </div>
      </nav>

      <main className="max-w-[1440px] mx-auto px-6 py-8">
        {/* Split Hero Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {/* Side Menu */}
          <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-100 p-2 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-50 mb-2">
              <h3 className="font-black text-sm uppercase tracking-wider text-gray-400">Categories</h3>
            </div>
            {[
              'Consumer Electronics', 'Apparel', 'Vehicles & Accessories', 'Home & Garden',
              'Sports & Entertainment', 'Machinery', 'Beauty & Personal Care', 'Industrial Fabric'
            ].map((cat) => (
              <div key={cat} className="flex items-center justify-between px-4 py-2.5 hover:bg-[#ff6a00]/5 hover:text-[#ff6a00] rounded-lg cursor-pointer transition-all text-[13px] font-medium group">
                {cat}
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#ff6a00]" />
              </div>
            ))}
          </div>

          {/* Main Hero Banner */}
          <div className="md:col-span-3 rounded-2xl overflow-hidden relative shadow-lg group">
            <img src={data.bannerImage} alt="Banner" className="w-full h-[450px] object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent flex items-center px-16">
              <div className="max-w-md">
                <div className="bg-[#ff6a00] text-white px-4 py-1.5 rounded-full text-xs font-black mb-6 w-fit animate-pulse shadow-lg">
                  VERIFIED DIRECT
                </div>
                <h1 className="text-5xl font-black text-white mb-6 leading-[1.1] tracking-tight">
                  Source from <br />
                  Verified <span className="text-[#ff6a00]">Manufacturers</span>
                </h1>
                <p className="text-lg text-white/90 mb-10 font-medium">Connect with top-tier suppliers and scale your business with factory direct prices.</p>
                <div className="flex gap-4">
                  <button className="bg-[#ff6a00] text-white font-black px-10 py-4 rounded-full hover:bg-[#e55f00] transition-all transform hover:scale-105 shadow-xl">
                    Get Started
                  </button>
                  <button className="bg-white/10 backdrop-blur-md text-white border border-white/30 font-black px-10 py-4 rounded-full hover:bg-white/20 transition-all">
                    View Deals
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Industrial Trust Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-5 hover:border-[#ff6a00] transition-colors cursor-default">
            <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-[#ff6a00]">
              <PackageCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="font-black text-lg">10M+</div>
              <div className="text-xs text-gray-500 font-bold uppercase tracking-widest">Business Products</div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-5 hover:border-[#ff6a00] transition-colors cursor-default">
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="font-black text-lg">Verified</div>
              <div className="text-xs text-gray-500 font-bold uppercase tracking-widest">Trade Assurance</div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-5 hover:border-[#ff6a00] transition-colors cursor-default">
            <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-600">
              <Truck className="w-7 h-7" />
            </div>
            <div>
              <div className="font-black text-lg">Fast Ship</div>
              <div className="text-xs text-gray-500 font-bold uppercase tracking-widest">Global Logistics</div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-5 hover:border-[#ff6a00] transition-colors cursor-default">
            <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <div className="font-black text-lg">Certified</div>
              <div className="text-xs text-gray-500 font-bold uppercase tracking-widest">ISO Standards</div>
            </div>
          </div>
        </div>

        {/* Dynamic Product Catalog */}
        <div className="mb-16">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-black tracking-tight text-[#111]">Recommended for your business</h2>
              <div className="h-1.5 w-20 bg-[#ff6a00] mt-3 rounded-full"></div>
            </div>
            <div className="flex gap-2">
              <button className="p-2.5 rounded-full border border-gray-200 hover:bg-white hover:shadow-md transition-all"><ChevronRight className="w-5 h-5 rotate-180" /></button>
              <button className="p-2.5 rounded-full border border-gray-200 hover:bg-white hover:shadow-md transition-all"><ChevronRight className="w-5 h-5" /></button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {paginatedItems.map((product, idx) => (
              <div key={`tradevault-${idx}-${product.id}`} data-product-id={product.id} className="bg-white rounded-2xl overflow-hidden hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all cursor-pointer border border-transparent hover:border-[#ff6a00]/20 group flex flex-col h-full">
                <div className="relative aspect-square overflow-hidden bg-gray-50 group-hover:bg-white transition-colors p-4">
                  <img src={product.imageUrl} alt={product.title} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    <div className="bg-white/90 backdrop-blur-sm shadow-sm border border-gray-100 px-2 py-1 rounded text-[10px] font-black text-blue-600 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> VERIFIED
                    </div>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/20 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={(e) => { e.stopPropagation(); addToCart(); }}
                      className="w-full bg-[#ff6a00] text-white text-[10px] font-black py-2 rounded-lg shadow-xl shadow-orange-500/30"
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h4 className="text-sm text-gray-800 line-clamp-2 mb-3 font-semibold group-hover:text-[#ff6a00] transition-colors leading-snug">{product.title}</h4>

                  <div className="mt-auto">
                    <div className="flex items-baseline gap-1 mb-1">
                      <span className="text-[12px] font-black text-[#111]">$</span>
                      <span className="text-xl font-black text-[#111]">{product.price}</span>
                      <span className="text-xs text-gray-500 font-bold ml-1">/ piece</span>
                    </div>
                    <div className="text-[11px] font-bold text-gray-400 mb-4">Min. order: 50 pieces</div>

                    <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-3.5 bg-gray-200 border border-gray-300 rounded-[2px]" />
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">CN Supplier</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                        <span className="text-[11px] font-black text-gray-700">4.9</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-10">
              <ProductPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
              />
            </div>
          )}
        </div>

        {/* Industrial RFQ Banner */}
        <div className="bg-[#1e293b] rounded-[2rem] p-10 mb-16 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[#ff6a00] -skew-x-12 translate-x-1/3 opacity-10 pointer-events-none" />
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-[#ff6a00] px-4 py-1.5 rounded-full text-[11px] font-black mb-6 uppercase tracking-widest leading-none">
                <Zap className="w-3.5 h-3.5" /> Rapid Quotation
              </div>
              <h3 className="text-4xl font-black mb-6 leading-tight">One request, multiple quotes from <span className="text-[#ff6a00]">certified manufacturers</span></h3>
              <p className="text-lg text-slate-300 mb-10 font-medium max-w-xl mx-auto lg:mx-0">Submit your requirements and let verified suppliers compete for your business. Free, fast and global.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="bg-[#ff6a00] text-white font-black px-12 py-5 rounded-2xl hover:bg-[#e55f00] transition-all transform hover:scale-105 shadow-2xl shadow-orange-500/30 text-lg">
                  Submit RFQ Now
                </button>
                <div className="flex items-center gap-3 px-6 text-slate-400">
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                  <span className="text-sm font-bold uppercase tracking-wider">Responses in &lt; 24h</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full lg:w-auto">
              <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl">
                <div className="text-3xl font-black text-[#ff6a00] mb-2 font-mono">01</div>
                <div className="font-black text-sm uppercase tracking-wider mb-2">Request</div>
                <p className="text-xs text-slate-400 font-medium">Post your exact requirements</p>
              </div>
              <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl">
                <div className="text-3xl font-black text-[#ff6a00] mb-2 font-mono">02</div>
                <div className="font-black text-sm uppercase tracking-wider mb-2">Compare</div>
                <p className="text-xs text-slate-400 font-medium">Review detailed quotes</p>
              </div>
              <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl">
                <div className="text-3xl font-black text-[#ff6a00] mb-2 font-mono">03</div>
                <div className="font-black text-sm uppercase tracking-wider mb-2">Connect</div>
                <p className="text-xs text-slate-400 font-medium">Chat with factory direct</p>
              </div>
              <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl">
                <div className="text-3xl font-black text-[#ff6a00] mb-2 font-mono">04</div>
                <div className="font-black text-sm uppercase tracking-wider mb-2">Secure</div>
                <p className="text-xs text-slate-400 font-medium">Trade with Assurance</p>
              </div>
            </div>
          </div>
        </div>

        {/* Enterprise Trade Assurance Section */}
        <div className="bg-white rounded-[2.5rem] p-12 mb-16 border border-gray-100 shadow-xl overflow-hidden relative">
          <div className="absolute top-0 right-0 p-12 opacity-5">
            <ShieldCheck className="w-64 h-64 text-[#ff6a00]" />
          </div>
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center text-[#ff6a00]">
                  <ShieldCheck className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-4xl font-black text-[#111]">Trade Assurance</h3>
                  <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mt-1">Enterprise Order Protection</p>
                </div>
              </div>
              <button className="bg-zinc-900 text-white font-black px-10 py-4 rounded-xl hover:bg-black transition-all">
                Learn More
              </button>
            </div>

            <p className="text-xl text-gray-500 mb-12 max-w-4xl font-medium leading-relaxed">
              Experience the standard for global B2B transactions. Order protection that covers your purchases from payment to delivery for all qualified orders on {data.name}.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="group border-t-2 border-gray-100 pt-8 hover:border-[#ff6a00] transition-all">
                <div className="text-[#ff6a00] mb-6">
                  <ShieldCheck className="w-10 h-10" />
                </div>
                <h4 className="text-xl font-black mb-4">Safe Payments</h4>
                <p className="text-gray-500 font-medium leading-relaxed">Every transaction is highly encrypted and strictly monitored. Flexible payment options available for global buyers.</p>
              </div>
              <div className="group border-t-2 border-gray-100 pt-8 hover:border-[#ff6a00] transition-all">
                <div className="text-[#ff6a00] mb-6">
                  <Truck className="w-10 h-10" />
                </div>
                <h4 className="text-xl font-black mb-4">Money-back policy</h4>
                <p className="text-gray-500 font-medium leading-relaxed">Automatic refunds if your shipment is delayed or if the product quality doesn't match the agreed standards.</p>
              </div>
              <div className="group border-t-2 border-gray-100 pt-8 hover:border-[#ff6a00] transition-all">
                <div className="text-[#ff6a00] mb-6">
                  <PackageCheck className="w-10 h-10" />
                </div>
                <h4 className="text-xl font-black mb-4">Logistics Visibility</h4>
                <p className="text-gray-500 font-medium leading-relaxed">Real-time tracking for ocean, air and land freight. Partnered with global carriers for reliable end-to-end delivery.</p>
              </div>
            </div>
          </div>
        </div>

      </main>

      {/* Corporate Footer */}
      <footer className="bg-white border-t border-gray-100 pt-20 pb-12">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-20">
            {['Customer Services', 'About Us', `Source on ${data.name}`, `Sell on ${data.name}`, 'Trade Services'].map((title, idx) => (
              <div key={idx}>
                <h4 className="font-black text-sm uppercase tracking-widest text-[#111] mb-8">{title}</h4>
                <div className="flex flex-col space-y-4 text-sm text-gray-400 font-bold">
                  {idx === 0 && ['Help Center', 'Report Abuse', 'Submit a Dispute', 'Policies & Rules', 'Feedback'].map(l => <a key={l} href="#" className="hover:text-[#ff6a00]">{l}</a>)}
                  {idx === 1 && [`About ${data.name}`, `${data.name} Group`, 'Sitemap', 'Official Blog', 'Investors'].map(l => <a key={l} href="#" className="hover:text-[#ff6a00]">{l}</a>)}
                  {idx === 2 && ['Resources', 'All Categories', 'RFQ', 'Ready to Ship', 'Global Partners'].map(l => <a key={l} href="#" className="hover:text-[#ff6a00]">{l}</a>)}
                  {idx === 3 && ['Seller Membership', 'Learning Center', 'Global Partner Program', 'Success Stories'].map(l => <a key={l} href="#" className="hover:text-[#ff6a00]">{l}</a>)}
                  {idx === 4 && ['Trade Assurance', 'Business Identity', 'Logistics Service', 'Letter of Credit'].map(l => <a key={l} href="#" className="hover:text-[#ff6a00]">{l}</a>)}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-100 pt-12 flex flex-col lg:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-6">
              <div className="text-2xl font-black italic text-gray-800">TradeVault<span className="not-italic"> Group</span></div>
              <div className="h-6 w-px bg-gray-200 hidden md:block" />
              <div className="flex gap-4">
                <button className="bg-gray-100 p-2 rounded-lg hover:bg-[#ff6a00]/10 hover:text-[#ff6a00] transition-all"><Globe className="w-5 h-5" /></button>
                <button className="bg-gray-100 p-2 rounded-lg hover:bg-[#ff6a00]/10 hover:text-[#ff6a00] transition-all"><ShoppingCart className="w-5 h-5" /></button>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
              <a href="#" className="hover:text-[#ff6a00]">FlashDeals</a>
              <a href="#" className="hover:text-[#ff6a00]">Lazada</a>
              <a href="#" className="hover:text-[#ff6a00]">Tmall</a>
              <a href="#" className="hover:text-[#ff6a00]">Taobao</a>
              <a href="#" className="hover:text-[#ff6a00]">Alipay</a>
            </div>
            <p className="text-xs font-bold text-gray-300">© 1999-2026 {data.name} International. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
