'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { StoreData } from '@/lib/types';
import { Search, ShoppingBag, ChevronRight, Laptop, CreditCard, Box, HeadphonesIcon, PlayCircle, Menu, X } from 'lucide-react';
import { usePagination, ProductPagination } from './shared/Pagination';

export default function MinimalTechTemplate({ data }: { data: StoreData }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const allProducts = data.products;
  const newProducts = allProducts.slice(0, 3);
  const accessories = allProducts.slice(3, 7);
  
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
    <div className="min-h-full bg-[#f5f5f7] font-sans text-[#1d1d1f] selection:bg-[#0071e3] selection:text-white pb-0 overflow-x-hidden">

      {/* ─── GLOBAL NAV ─── */}
      <header className="bg-[#f5f5f7]/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200/50">
        <div className="w-full max-w-[1024px] mx-auto px-4 h-[44px] flex items-center justify-between text-[12px] text-gray-800 font-medium">
          <div className="flex items-center space-x-2 md:space-x-8 lg:space-x-12 cursor-pointer opacity-80 hover:opacity-100 transition-opacity">
            <Laptop className="w-[15px] h-[15px] fill-current" />
          </div>

          <nav className="hidden md:flex space-x-6 lg:space-x-8 text-[12px] tracking-tight font-normal">
            <a href="#" className="opacity-80 hover:opacity-100 transition-opacity">Store</a>
            <a href="#" className="opacity-80 hover:opacity-100 transition-opacity">Mac</a>
            <a href="#" className="opacity-80 hover:opacity-100 transition-opacity">iPad</a>
            <a href="#" className="opacity-80 hover:opacity-100 transition-opacity">iPhone</a>
            <a href="#" className="opacity-80 hover:opacity-100 transition-opacity">Watch</a>
            <a href="#" className="opacity-80 hover:opacity-100 transition-opacity">Vision</a>
            <a href="#" className="opacity-80 hover:opacity-100 transition-opacity">AirPods</a>
            <a href="#" className="opacity-80 hover:opacity-100 transition-opacity">TV & Home</a>
            <a href="#" className="opacity-80 hover:opacity-100 transition-opacity">Entertainment</a>
            <a href="#" className="opacity-80 hover:opacity-100 transition-opacity">Accessories</a>
            <a href="#" className="opacity-80 hover:opacity-100 transition-opacity">Support</a>
          </nav>

          <div className="flex items-center space-x-4 lg:space-x-8">
            <Search className="w-[15px] h-[15px] opacity-80 hover:opacity-100 cursor-pointer transition-opacity" />
            <div 
              onClick={addToCart}
              className="relative cursor-pointer"
            >
              <ShoppingBag className="w-[15px] h-[15px] opacity-80 hover:opacity-100 transition-opacity" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#0071e3] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{cartCount}</span>
              )}
            </div>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden"
            >
              {mobileMenuOpen ? <X className="w-[18px] h-[18px]" /> : <Menu className="w-[18px] h-[18px]" />}
            </button>
          </div>
        </div>
      </header>

      {/* ─── RIBBON ─── */}
      <div className="bg-white text-center py-3 px-4 border-b border-gray-200 text-[14px]">
        <p className="max-w-2xl mx-auto">
          Get $180-$620 in credit when you trade in iPhone 11 or higher. <a href="#" className="text-[#0066cc] hover:underline">Shop iPhone <ChevronRight className="inline w-3 h-3" /></a>
        </p>
      </div>

      <main className="w-full">

        {/* ─── HERO PROMO 1 (Dark Theme) ─── */}
        <section className="relative w-full h-[500px] md:h-[680px] bg-black text-white flex flex-col items-center pt-16 md:pt-20 cursor-pointer overflow-hidden border-b-[8px] border-white">
          <Image
            src={data.bannerImage}
            alt="Hero"
            fill
            className="object-cover object-bottom opacity-70 -z-10 mix-blend-screen"
            priority
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col items-center text-center z-10 px-4">
            <h2 className="text-[32px] md:text-[56px] font-semibold tracking-tight mb-1">{data.name}</h2>
            <p className="text-[19px] md:text-[28px] tracking-tight font-normal mb-4">{data.description || 'Pro. Beyond.'}</p>
            <div className="flex items-center space-x-5 text-[17px] md:text-[21px] font-normal">
              <a href="#" className="text-[#2997ff] hover:underline flex items-center">Learn more <ChevronRight className="w-4 h-4 ml-1 md:mt-1" /></a>
              <a href="#" className="text-[#2997ff] hover:underline flex items-center">Buy <ChevronRight className="w-4 h-4 ml-1 md:mt-1" /></a>
            </div>
          </div>
        </section>

        {/* ─── HERO PROMO 2 (Light Theme) ─── */}
        <section data-product-id={newProducts[0]?.id} className="relative w-full h-[500px] md:h-[680px] bg-[#fbfbfd] text-[#1d1d1f] flex flex-col items-center pt-16 md:pt-20 cursor-pointer overflow-hidden border-b-[8px] border-white">
          <Image
            src={newProducts[0]?.imageUrl || "https://picsum.photos/1920/1080?random=302"}
            alt="Promo 2"
            fill
            className="object-cover object-bottom -z-10 mt-[120px] md:mt-[180px]"
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col items-center text-center z-10 px-4">
            <h2 className="text-[32px] md:text-[56px] font-semibold tracking-tight mb-1">{newProducts[0]?.title || 'iPad Air'}</h2>
            <p className="text-[19px] md:text-[28px] tracking-tight font-normal mb-4 max-w-sm">Two sizes. Faster chip. Does it all.</p>
            <div className="flex items-center space-x-5 text-[17px] md:text-[21px] font-normal">
              <a href="#" className="text-[#0066cc] hover:underline flex items-center">Learn more <ChevronRight className="w-4 h-4 ml-1 md:mt-1" /></a>
              <a href="#" className="text-[#0066cc] hover:underline flex items-center">Buy <ChevronRight className="w-4 h-4 ml-1 md:mt-1" /></a>
            </div>
          </div>
        </section>

        {/* ─── HERO PROMO 3 (Light Theme) ─── */}
        <section data-product-id={newProducts[1]?.id} className="relative w-full h-[500px] md:h-[680px] bg-[#fbfbfd] text-[#1d1d1f] flex flex-col items-center pt-16 md:pt-20 cursor-pointer overflow-hidden border-b-[8px] border-white">
          <Image
            src={newProducts[1]?.imageUrl || "https://picsum.photos/1920/1080?random=303"}
            alt="Promo 3"
            fill
            className="object-cover object-bottom -z-10 mt-[120px] md:mt-[180px] scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col items-center text-center z-10 px-4">
            <h2 className="text-[32px] md:text-[56px] font-semibold tracking-tight mb-1">{newProducts[1]?.title || 'MacBook Air'}</h2>
            <p className="text-[19px] md:text-[28px] tracking-tight font-normal mb-4">Lean. Mean. M3 machine.</p>
            <div className="flex items-center space-x-5 text-[17px] md:text-[21px] font-normal">
              <a href="#" className="text-[#0066cc] hover:underline flex items-center">Learn more <ChevronRight className="w-4 h-4 ml-1 md:mt-1" /></a>
              <a href="#" className="text-[#0066cc] hover:underline flex items-center">Buy <ChevronRight className="w-4 h-4 ml-1 md:mt-1" /></a>
            </div>
          </div>
        </section>

        {/* ─── BENTO GRID / 50-50 SPLITS ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 px-2 md:px-4 mb-4">

          {/* Grid Item 1 */}
          <div className="relative h-[480px] md:h-[580px] bg-black text-white flex flex-col items-center pt-12 cursor-pointer overflow-hidden rounded-none md:rounded-none">
            <Image src="https://picsum.photos/1000/1000?random=304" alt="" fill className="object-cover object-bottom opacity-80 -z-10 mix-blend-screen" />
            <h3 className="text-[28px] md:text-[40px] font-semibold tracking-tight mb-1"><Laptop className="inline w-8 h-8 md:w-10 md:h-10 mb-2 fill-current" />Watch</h3>
            <p className="text-[15px] md:text-[21px] text-[#ff7b15] font-normal tracking-wide uppercase mb-3">Ultra 2</p>
            <p className="text-[15px] md:text-[19px] font-normal tracking-tight mb-4">Next level adventure.</p>
            <div className="flex items-center space-x-4 text-[15px] md:text-[17px] font-normal">
              <a href="#" className="text-[#2997ff] hover:underline flex items-center">Learn more <ChevronRight className="w-3.5 h-3.5 ml-1" /></a>
              <a href="#" className="text-[#2997ff] hover:underline flex items-center">Buy <ChevronRight className="w-3.5 h-3.5 ml-1" /></a>
            </div>
          </div>

          {/* Grid Item 2 */}
          <div className="relative h-[480px] md:h-[580px] bg-black text-white flex flex-col items-center pt-12 cursor-pointer overflow-hidden rounded-none md:rounded-none">
            <Image src="https://picsum.photos/1000/1000?random=305" alt="" fill className="object-cover object-bottom opacity-80 -z-10 mix-blend-screen" />
            <h3 className="text-[28px] md:text-[40px] font-semibold tracking-tight mb-1">Vision Pro</h3>
            <p className="text-[15px] md:text-[19px] font-normal tracking-tight mb-4 max-w-[250px] text-center">The era of spatial computing is here.</p>
            <div className="flex items-center space-x-4 text-[15px] md:text-[17px] font-normal">
              <a href="#" className="text-[#2997ff] hover:underline flex items-center">Learn more <ChevronRight className="w-3.5 h-3.5 ml-1" /></a>
              <a href="#" className="text-[#2997ff] hover:underline flex items-center">Buy <ChevronRight className="w-3.5 h-3.5 ml-1" /></a>
            </div>
          </div>

          {/* Grid Item 3 */}
          <div className="relative h-[480px] md:h-[580px] bg-[#fbfbfd] text-[#1d1d1f] flex flex-col items-center pt-12 cursor-pointer overflow-hidden rounded-none md:rounded-none">
            <Image src="https://picsum.photos/1000/1000?random=306" alt="" fill className="object-cover object-bottom opacity-90 -z-10" />
            <h3 className="text-[28px] md:text-[40px] font-semibold tracking-tight mb-1">Trade In</h3>
            <p className="text-[15px] md:text-[19px] font-normal tracking-tight mb-4 max-w-[300px] text-center">Get $180-$620 in credit when you trade in iPhone 11 or higher.</p>
            <div className="flex items-center space-x-4 text-[15px] md:text-[17px] font-normal">
              <a href="#" className="text-[#0066cc] hover:underline flex items-center">Get your estimate <ChevronRight className="w-3.5 h-3.5 ml-1" /></a>
            </div>
          </div>

          {/* Grid Item 4 */}
          <div className="relative h-[480px] md:h-[580px] bg-[#fbfbfd] text-[#1d1d1f] flex flex-col items-center pt-12 cursor-pointer overflow-hidden rounded-none md:rounded-none">
            <Image src="https://picsum.photos/1000/1000?random=307" alt="" fill className="object-cover object-bottom opacity-90 -z-10" />
            <h3 className="text-[28px] md:text-[40px] font-semibold tracking-tight mb-1"><Laptop className="inline w-8 h-8 md:w-10 md:h-10 mb-2 fill-current" />Card</h3>
            <p className="text-[15px] md:text-[19px] font-normal tracking-tight mb-4 max-w-[300px] text-center">Get up to 3% Daily Cash back with every purchase.</p>
            <div className="flex items-center space-x-4 text-[15px] md:text-[17px] font-normal">
              <a href="#" className="text-[#0066cc] hover:underline flex items-center">Learn more <ChevronRight className="w-3.5 h-3.5 ml-1" /></a>
              <a href="#" className="text-[#0066cc] hover:underline flex items-center">Apply now <ChevronRight className="w-3.5 h-3.5 ml-1" /></a>
            </div>
          </div>

        </div>

        {/* ─── PRODUCT GRID WITH PAGINATION (3x5 = 15 products) ─── */}
        <section className="py-8 px-4 max-w-[1024px] mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[24px] md:text-[32px] font-semibold tracking-tight">All Products</h3>
            <span className="text-sm text-gray-500">{totalItems} items</span>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
            {paginatedItems.map((product, idx) => (
              <div key={`minimaltech-${idx}-${product.id}`} data-product-id={product.id} className="group cursor-pointer">
                <div className="relative aspect-square bg-white rounded-2xl overflow-hidden mb-3 shadow-sm group-hover:shadow-md transition-shadow">
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                  />
                  <button 
                    onClick={(e) => { e.stopPropagation(); addToCart(); }}
                    className="absolute bottom-2 right-2 bg-[#0071e3] text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
                <h4 className="text-[14px] font-medium text-[#1d1d1f] truncate">{product.title}</h4>
                <p className="text-[14px] text-gray-500">${product.price}</p>
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
        </section>

      </main>

      {/* ─── FOOTER ─── */}
      <footer className="bg-[#f5f5f7] pt-4 pb-8 border-t border-gray-200 text-[#6e6e73] font-sans px-4">
        <div className="w-full max-w-[980px] mx-auto text-[12px] leading-[1.334]">

          <div className="border-b border-[#d2d2d7] pb-4 mb-5 pt-4">
            <p className="mb-2">1. Trade-in values will vary based on the condition, year, and configuration of your eligible trade-in device. Not all devices are eligible for credit. You must be at least 18 years old to be eligible to trade in for credit or for an MinimalTech Gift Card. Trade-in value may be applied toward qualifying new device purchase, or added to an MinimalTech Gift Card. Actual value awarded is based on receipt of a qualifying device matching the description provided when estimate was made.</p>
            <p className="mb-2">To access and use all MinimalTech Card features and products available only to MinimalTech Card users, you must add MinimalTech Card to Wallet on an iPhone or iPad with the latest version of iOS or iPadOS.</p>
            <p>Available in the U.S. on <a href="#" className="underline text-[#424245] hover:text-[#1d1d1f]">MinimalTech.com</a>, in the MinimalTech Store app, and at MinimalTech Stores.</p>
          </div>

          {/* Main Footer Links */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-y-4 md:gap-y-0 pt-2 mb-8">
            <div className="hidden md:flex flex-col space-y-2.5">
              <h3 className="font-semibold text-[#1d1d1f]">Shop and Learn</h3>
              <a href="#" className="hover:underline text-[#424245]">Store</a>
              <a href="#" className="hover:underline text-[#424245]">Mac</a>
              <a href="#" className="hover:underline text-[#424245]">iPad</a>
              <a href="#" className="hover:underline text-[#424245]">iPhone</a>
              <a href="#" className="hover:underline text-[#424245]">Watch</a>
              <a href="#" className="hover:underline text-[#424245]">Vision</a>
              <a href="#" className="hover:underline text-[#424245]">AirPods</a>
              <a href="#" className="hover:underline text-[#424245]">TV & Home</a>
              <a href="#" className="hover:underline text-[#424245]">AirTag</a>
              <a href="#" className="hover:underline text-[#424245]">Accessories</a>
              <a href="#" className="hover:underline text-[#424245]">Gift Cards</a>
            </div>

            <div className="hidden md:flex flex-col space-y-2.5">
              <h3 className="font-semibold text-[#1d1d1f]">MinimalTech Wallet</h3>
              <a href="#" className="hover:underline text-[#424245]">Wallet</a>
              <a href="#" className="hover:underline text-[#424245]">MinimalTech Card</a>
              <a href="#" className="hover:underline text-[#424245]">MinimalTech Pay</a>
              <a href="#" className="hover:underline text-[#424245]">MinimalTech Cash</a>
            </div>

            <div className="hidden md:flex flex-col space-y-2.5">
              <h3 className="font-semibold text-[#1d1d1f]">Account</h3>
              <a href="#" className="hover:underline text-[#424245]">Manage Your MinimalTech ID</a>
              <a href="#" className="hover:underline text-[#424245]">MinimalTech Store Account</a>
              <a href="#" className="hover:underline text-[#424245]">iCloud.com</a>

              <h3 className="font-semibold text-[#1d1d1f] pt-4">Entertainment</h3>
              <a href="#" className="hover:underline text-[#424245]">MinimalTech One</a>
              <a href="#" className="hover:underline text-[#424245]">MinimalTech TV+</a>
              <a href="#" className="hover:underline text-[#424245]">MinimalTech Music</a>
              <a href="#" className="hover:underline text-[#424245]">MinimalTech Arcade</a>
              <a href="#" className="hover:underline text-[#424245]">MinimalTech Fitness+</a>
            </div>

            <div className="hidden md:flex flex-col space-y-2.5">
              <h3 className="font-semibold text-[#1d1d1f]">MinimalTech Store</h3>
              <a href="#" className="hover:underline text-[#424245]">Find a Store</a>
              <a href="#" className="hover:underline text-[#424245]">Genius Bar</a>
              <a href="#" className="hover:underline text-[#424245]">Today at MinimalTech</a>
              <a href="#" className="hover:underline text-[#424245]">MinimalTech Camp</a>
              <a href="#" className="hover:underline text-[#424245]">MinimalTech Store App</a>
              <a href="#" className="hover:underline text-[#424245]">Certified Refurbished</a>
              <a href="#" className="hover:underline text-[#424245]">MinimalTech Trade In</a>
              <a href="#" className="hover:underline text-[#424245]">Financing</a>
              <a href="#" className="hover:underline text-[#424245]">Carrier Deals at MinimalTech</a>
            </div>

            <div className="hidden md:flex flex-col space-y-2.5">
              <h3 className="font-semibold text-[#1d1d1f]">About {data.name}</h3>
              <a href="#" className="hover:underline text-[#424245]">Newsroom</a>
              <a href="#" className="hover:underline text-[#424245]">MinimalTech Leadership</a>
              <a href="#" className="hover:underline text-[#424245]">Career Opportunities</a>
              <a href="#" className="hover:underline text-[#424245]">Investors</a>
              <a href="#" className="hover:underline text-[#424245]">Ethics & Compliance</a>
              <a href="#" className="hover:underline text-[#424245]">Events</a>
              <a href="#" className="hover:underline text-[#424245]">Contact MinimalTech</a>
            </div>
          </div>

          <div className="border-b border-[#d2d2d7] pb-4 md:pb-2 mb-4">
            <p>More ways to shop: <a href="#" className="text-[#0066cc] hover:underline">Find an MinimalTech Store</a> or <a href="#" className="text-[#0066cc] hover:underline">other retailer</a> near you. Or call 1-800-MINIMALTECH.</p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <p className="mb-2 md:mb-0">Copyright © 2026 {data.name} Inc. All rights reserved.</p>
            <div className="flex flex-wrap gap-x-2 gap-y-1 md:gap-x-4 mb-2 md:mb-0">
              <a href="#" className="hover:underline border-r border-[#d2d2d7] pr-2 md:pr-4 text-[#424245]">Privacy Policy</a>
              <a href="#" className="hover:underline border-r border-[#d2d2d7] pr-2 md:pr-4 text-[#424245]">Terms of Use</a>
              <a href="#" className="hover:underline border-r border-[#d2d2d7] pr-2 md:pr-4 text-[#424245]">Sales and Refunds</a>
              <a href="#" className="hover:underline border-r border-[#d2d2d7] pr-2 md:pr-4 text-[#424245]">Legal</a>
              <a href="#" className="hover:underline text-[#424245]">Site Map</a>
            </div>
            <p className="md:ml-auto text-[#424245] hover:underline cursor-pointer">United States</p>
          </div>

        </div>
      </footer>
    </div>
  );
}
