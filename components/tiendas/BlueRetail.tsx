'use client';

import React, { useState } from 'react';
import { StoreData, Product } from '@/lib/types';
import { useCart } from '@/contexts/CartContext';
import { Search, ShoppingCart, Grid, User, MapPin, ChevronDown, Heart, Smartphone, Monitor, Coffee, Shirt, Truck, ShieldCheck, Info, Menu, X } from 'lucide-react';
import { usePagination, ProductPagination } from '@/components/componentes-compartidos/templates/Pagination';

export default function BlueRetailTemplate({ data }: { data: StoreData }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { addToCart: addToCartContext, itemCount, setIsCartOpen } = useCart();
  const flashDeals = data.products.slice(0, 6);
  
  const itemsPerPage = 15; // 3 rows x 5 columns
  const {
    currentPage,
    totalPages,
    paginatedItems,
    handlePageChange,
    totalItems,
  } = usePagination(data.products, itemsPerPage);

  const handleAddToCart = (product: Product, e?: React.MouseEvent) => { if (e) e.stopPropagation(); addToCartContext(product); };

  return (
    <div className="min-h-full bg-[#f2f8fd] font-sans text-[#2e2f32] overflow-x-hidden">

      {/* ─── HEADER ─── */}
      <header className="bg-[#0071dc] text-white">

        {/* Top Row: Logo, Search, Nav Items */}
        <div className="w-full max-w-[1440px] mx-auto px-4 lg:px-6 h-[80px] flex items-center justify-between gap-4 lg:gap-8">

          {/* Mobile Menu & Logo */}
          <div className="flex items-center gap-4 shrink-0 h-full py-4">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 -ml-2 text-white hover:bg-black/20 rounded-full transition-colors flex items-center justify-center"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Grid className="w-6 h-6" />}
            </button>
            <div className="font-extrabold text-[24px] tracking-tight flex items-center cursor-pointer hover:bg-black/10 px-2 py-1 rounded-[8px] transition-colors">
              {data.logoText}
              <span className="text-[#ffc220] ml-1 text-[32px] leading-[0px] relative top-1">*</span>
            </div>
          </div>

          {/* Desktop Left Nav Buttons */}
          <div className="hidden lg:flex items-center gap-2 shrink-0 h-full py-4">
            <button className="flex items-center gap-2 bg-[#004f9a] hover:bg-[#004f9a]/80 text-white cursor-pointer px-4 h-full rounded-full font-bold text-[14px] transition-colors">
              <Grid className="w-[18px] h-[18px]" />
              <span>Departments</span>
            </button>
            <button className="flex items-center gap-2 bg-[#004f9a] hover:bg-[#004f9a]/80 text-white cursor-pointer px-4 h-full rounded-full font-bold text-[14px] transition-colors">
              <span className="w-[18px] h-[18px] flex items-center justify-center bg-white/20 rounded-full p-0.5"><Grid className="w-full h-full" /></span>
              <span>Services</span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-[800px] h-[40px] relative flex items-center">
            <input
              type="text"
              placeholder="Search everything at BlueRetail online and in store"
              className="w-full h-full rounded-full bg-white pl-5 pr-14 text-[15px] font-normal text-[#2e2f32] outline-none placeholder:text-gray-600 focus:ring-[3px] focus:ring-[#0071dc] focus:ring-offset-2 focus:ring-offset-white transition-shadow"
            />
            <button className="absolute right-1 w-[32px] h-[32px] bg-[#ffc220] text-[#0071dc] rounded-full flex items-center justify-center hover:bg-[#f3b500] transition-colors cursor-pointer">
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Nav Right: Reorder, Account, Cart */}
          <div className="hidden md:flex items-center gap-2 shrink-0 h-full py-4">
            <button className="flex flex-col items-center justify-center cursor-pointer hover:bg-black/10 px-3 h-full rounded-full transition-colors">
              <Heart className="w-[20px] h-[20px] mb-[2px]" />
              <span className="text-[12px] font-bold leading-none">Reorder</span>
            </button>
            <button className="flex flex-col items-center justify-center cursor-pointer hover:bg-black/10 px-3 h-full rounded-full transition-colors">
              <span className="text-[12px] font-normal leading-none mb-1">Sign In</span>
              <div className="flex items-center">
                <User className="w-[18px] h-[18px] mr-1" />
                <span className="text-[12px] font-bold leading-none">Account</span>
              </div>
            </button>
            <button 
              onClick={(e) => e.stopPropagation()}
              className="flex flex-col items-center justify-center cursor-pointer hover:bg-black/10 px-4 h-full rounded-full transition-colors relative"
            >
              <div className="relative">
                <ShoppingCart className="w-[24px] h-[24px] mb-[2px]" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-2 bg-[#ffc220] text-[#0071dc] text-[10px] font-bold w-[18px] h-[18px] flex items-center justify-center rounded-full">{itemCount}</span>
                )}
              </div>
              <span className="text-[12px] font-bold leading-none">${(itemCount * 29.99).toFixed(2)}</span>
            </button>
          </div>

        </div>

        {/* Bottom Menu Strip */}
        <div className="w-full border-t border-white/20 shadow-[0_4px_6px_rgba(0,0,0,0.05)] relative z-40 bg-[#0071dc]">
          <div className="w-full max-w-[1440px] mx-auto px-4 lg:px-6 h-[44px] flex items-center text-[14px] font-bold gap-6 overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:hidden">

            {/* How do you want your items? */}
            <button className="flex items-center gap-2 cursor-pointer hover:underline shrink-0">
              <img src="https://picsum.photos/200/60?random=901" alt="W+" className="h-[22px] object-contain bg-white rounded-sm p-[1px]" />
              <span>How do you want your items?</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            <div className="w-[1px] h-[20px] bg-white/30 hidden md:block"></div>

            <button className="hidden md:flex items-center gap-[6px] cursor-pointer hover:underline text-[13px] font-normal shrink-0">
              <MapPin className="w-4 h-4" />
              <span>Sacramento, 95829</span>
            </button>

            <button className="hidden md:flex items-center gap-[6px] cursor-pointer hover:underline text-[13px] font-normal shrink-0">
              <StoreIcon />
              <span>Sacramento Supercenter</span>
            </button>

            {/* Links */}
            <div className="hidden lg:flex items-center gap-5 text-[14px] font-bold ml-4">
              <a href="#" className="hover:underline">Grocery & Essentials</a>
              <a href="#" className="hover:underline">BlueRetail+ Week</a>
              <a href="#" className="hover:underline">Back to School</a>
              <a href="#" className="hover:underline">Home</a>
              <a href="#" className="hover:underline">Electronics</a>
              <a href="#" className="hover:underline">Toys</a>
              <a href="#" className="hover:underline">Fashion</a>
            </div>
          </div>
        </div>
      </header>

      {/* ─── MAIN CONTENT ─── */}
      <main className="w-full max-w-[1440px] mx-auto px-4 lg:px-6 py-6 lg:py-8">

        {/* Banner Section */}
        <div className="rounded-[16px] overflow-hidden relative mb-12 shadow-[0_2px_4px_rgba(0,0,0,0.08)] bg-white">
          <img src={data.bannerImage} alt="Banner" className="w-full h-[250px] md:h-[350px] object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent flex items-center p-8 md:p-14">
            <div className="text-white max-w-[500px]">
              <h2 className="text-[32px] md:text-[44px] font-bold leading-tight mb-4 tracking-[-0.5px]">{data.description || 'Deals for days. Savings for everyone.'}</h2>
              <button className="bg-white text-[#2e2f32] px-5 py-2.5 rounded-full font-bold text-[14px] hover:bg-gray-100 hover:ring-2 hover:ring-black hover:ring-offset-2 transition-all active:scale-95 shadow-md">
                Shop now
              </button>
            </div>
          </div>
        </div>

        {/* Categories Pills (BlueRetail Style) */}
        <div className="flex overflow-x-auto gap-3 pb-4 mb-4 [&::-webkit-scrollbar]:hidden md:custom-scrollbar">
          {['Grocery', 'Electronics', 'Home', 'Clothing', 'Toys', 'Patio & Garden', 'Auto', 'Health'].map((cat, i) => (
            <button key={i} className="px-4 py-2 bg-white border border-gray-300 shadow-[0_1px_2px_rgba(0,0,0,0.05)] rounded-full text-[14px] font-bold hover:border-black transition-colors whitespace-nowrap">
              {cat}
            </button>
          ))}
        </div>

        {/* Flash Deals / Top Products */}
        <div className="mb-14">
          <h3 className="text-[20px] font-bold mb-5 flex items-center gap-2 tracking-tight">
            Flash Picks <span className="text-[#0071dc] font-normal text-[14px] hover:underline cursor-pointer">View all</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {data.products.slice(0, 6).map((product, idx) => (
              <div key={`blueretail-flash-${idx}-${product.id}`} data-product-id={product.id} className="bg-white rounded-[8px] p-[10px] shadow-[0_2px_4px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.12)] transition-shadow cursor-pointer flex flex-col group border border-transparent hover:border-black/5">
                <div className="relative aspect-square mb-3 bg-[#f2f8fd] overflow-hidden rounded-[8px]">
                  <img src={product.imageUrl} alt={product.title} className="w-full h-full object-contain mix-blend-multiply p-3 group-hover:scale-105 transition-transform duration-300" />
                  <button className="absolute top-2 right-2 bg-white w-8 h-8 flex items-center justify-center rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.15)] hover:bg-gray-50 z-10 transition-transform active:scale-90">
                    <Heart className="w-[18px] h-[18px] text-[#2e2f32]" />
                  </button>
                  {/* Fake deal tag */}
                  <div className="absolute bottom-0 left-0 bg-[#e82c2a] text-white text-[12px] font-bold px-2 py-[2px] rounded-tr-[8px]">
                    Save with W+
                  </div>
                </div>

                <div className="flex-1 flex flex-col">
                  {/* Price */}
                  <div className="flex items-end gap-[4px] mb-[2px]">
                    <span className="text-[#2a8703] font-bold text-[20px] leading-tight flex items-start">
                      <span className="text-[12px] mt-1 mr-0.5">{product.currency || 'S/'}</span>{Math.floor(product.price)}<span className="text-[12px] mt-1 ml-0.5">.{(product.price % 1).toFixed(2).substring(2)}</span>
                    </span>
                  </div>
                  {product.originalPrice && (
                    <span className="text-[#74767c] line-through text-[13px] mb-1">
                      {product.currency || 'S/'}{product.originalPrice}
                    </span>
                  )}

                  {/* Title */}
                  <h4 className="text-[14px] text-[#2e2f32] line-clamp-2 leading-[1.3] mb-2 font-normal hover:underline h-[36px]">{product.title}</h4>

                  {/* Shipping info */}
                  <div className="text-[12px] text-[#2e2f32] font-normal mb-3 flex items-center gap-1">
                    <span className="font-bold">Shipping</span>, arrives in 2 days
                  </div>

                  {/* Actions */}
                  <div className="mt-auto">
                    <button className="w-full bg-white border border-[#2e2f32] text-[#2e2f32] rounded-full py-[6px] text-[14px] font-bold hover:bg-[#2e2f32] hover:text-white transition-colors cursor-pointer active:scale-95">
                      Options
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BlueRetail+ Billboard */}
        <div className="bg-[#0071dc] rounded-[16px] p-6 lg:p-10 mb-14 text-white flex flex-col lg:flex-row items-center justify-between shadow-[0_4px_12px_rgba(0,113,220,0.2)]">
          <div className="max-w-[600px] mb-8 lg:mb-0">
            <div className="flex items-center gap-3 mb-4">
              <img src="https://picsum.photos/200/60?random=901" alt="W+" className="h-[40px] bg-white rounded-md p-1 shadow-sm" />
              <h3 className="text-[36px] font-black tracking-tight leading-none">BlueRetail+</h3>
            </div>
            <p className="text-[20px] font-medium mb-6 leading-snug">Members save $1,300+ each year with free delivery, free shipping & more.</p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-white text-[#0071dc] px-8 py-3 rounded-full font-bold text-[15px] hover:bg-gray-100 hover:ring-2 hover:ring-black hover:ring-offset-2 transition-all shadow-md active:scale-95">
                Start 30-day free trial
              </button>
              <button className="bg-transparent border border-white text-white px-8 py-3 rounded-full font-bold text-[15px] hover:bg-white/10 transition-all">
                Learn more
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-2 gap-4 w-full lg:w-auto">
            <div className="bg-[#004f9a] p-6 rounded-[12px] flex flex-col items-center justify-center text-center shadow-inner h-[140px] w-full lg:w-[150px]">
              <Truck className="w-10 h-10 mb-3 text-[#ffc220]" />
              <span className="font-bold text-[14px] leading-tight">Free delivery from store</span>
            </div>
            <div className="bg-[#004f9a] p-6 rounded-[12px] flex flex-col items-center justify-center text-center shadow-inner h-[140px] w-full lg:w-[150px]">
              <ShieldCheck className="w-10 h-10 mb-3 text-[#ffc220]" />
              <span className="font-bold text-[14px] leading-tight">Free shipping, no order min.</span>
            </div>
          </div>
        </div>

        {/* Departments Grid (Featured) */}
        <div className="mb-14">
          <h3 className="text-[20px] font-bold mb-5 tracking-tight">Shop by Department</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {[
              { name: 'Electronics', icon: Monitor, color: 'bg-blue-50 text-[#0071dc]' },
              { name: 'Home', icon: Coffee, color: 'bg-green-50 text-green-700' },
              { name: 'Clothing', icon: Shirt, color: 'bg-pink-50 text-pink-600' },
              { name: 'Phones', icon: Smartphone, color: 'bg-purple-50 text-purple-600' },
              { name: 'Toys', icon: Heart, color: 'bg-red-50 text-red-600' },
              { name: 'Auto', icon: Truck, color: 'bg-gray-100 text-gray-700' },
              { name: 'Pharmacy', icon: ShieldCheck, color: 'bg-teal-50 text-teal-600' },
              { name: 'Grocery', icon: Search, color: 'bg-yellow-50 text-[#f3b500]' },
            ].map((dept, i) => (
              <div key={i} className="flex flex-col items-center cursor-pointer group">
                <div className={`w-[100px] h-[100px] rounded-full ${dept.color} flex items-center justify-center mb-3 shadow-[0_2px_4px_rgba(0,0,0,0.05)] group-hover:shadow-[0_4px_8px_rgba(0,0,0,0.1)] transition-all`}>
                  <dept.icon className="w-10 h-10 group-hover:scale-110 transition-transform" />
                </div>
                <span className="font-bold text-[14px] text-[#2e2f32] text-center group-hover:underline">{dept.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Savings Spotlight */}
        <div className="mb-14">
          <h3 className="text-[20px] font-bold mb-5 tracking-tight">Savings Spotlight</h3>
          <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory hide-scrollbar -mx-4 px-4">
            {data.products.slice(6, 12).map((product, idx) => (
              <div key={`br-savings-${idx}`} data-product-id={product.id} className="bg-white rounded-[12px] p-4 shadow-[0_2px_4px_rgba(0,0,0,0.08)] shrink-0 w-[200px] snap-start cursor-pointer group hover:shadow-md transition-shadow">
                <div className="relative aspect-square mb-3 bg-[#f2f8fd] rounded-[8px] overflow-hidden">
                  <img src={product.imageUrl} alt={product.title} className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-300" />
                  {product.discount && product.discount > 0 && (
                    <div className="absolute top-2 left-2 bg-[#e82c2a] text-white text-[11px] font-bold px-2 py-0.5 rounded-full">{product.discount}% off</div>
                  )}
                </div>
                <h4 className="text-[13px] line-clamp-2 mb-1">{product.title}</h4>
                <div className="flex items-baseline gap-2">
                  <span className="text-[#2a8703] font-bold text-[16px]">${product.price}</span>
                  {product.originalPrice && <span className="text-gray-400 line-through text-[12px]">${product.originalPrice}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Brands */}
        <div className="mb-14">
          <h3 className="text-[20px] font-bold mb-5 tracking-tight">Top Brands</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {['Samsung', 'Sony', 'LG', 'Apple', 'HP', 'Dyson'].map((brand, i) => (
              <div key={i} className="bg-white rounded-[12px] p-6 flex items-center justify-center shadow-[0_2px_4px_rgba(0,0,0,0.08)] hover:shadow-md transition-shadow cursor-pointer group h-[100px]">
                <span className="text-[16px] font-bold text-gray-700 group-hover:text-[#0071dc] transition-colors">{brand}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Rollbacks Banner */}
        <div className="mb-14 bg-[#ffc220] rounded-[16px] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0">
            <h3 className="text-[32px] font-black text-[#2e2f32] mb-2">Rollbacks</h3>
            <p className="text-[16px] text-[#2e2f32]">Prices dropped on items you love. Limited time only.</p>
          </div>
          <button className="bg-[#2e2f32] text-white px-8 py-3 rounded-full font-bold text-[15px] hover:bg-black transition-colors">Shop Rollbacks</button>
        </div>

        {/* Customer Picks */}
        <div className="mb-14">
          <h3 className="text-[20px] font-bold mb-5 tracking-tight">Customer Picks</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {data.products.slice(12, 16).map((product, idx) => (
              <div key={`br-picks-${idx}`} data-product-id={product.id} className="bg-white rounded-[12px] overflow-hidden shadow-[0_2px_4px_rgba(0,0,0,0.08)] hover:shadow-md transition-shadow cursor-pointer group">
                <div className="relative aspect-[4/3] bg-[#f2f8fd] overflow-hidden">
                  <img src={product.imageUrl} alt={product.title} className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-4">
                  <h4 className="text-[14px] line-clamp-2 mb-2 font-medium">{product.title}</h4>
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => <span key={i} className="text-[#ffc220] text-[14px]">★</span>)}
                    <span className="text-[12px] text-gray-500 ml-1">({product.reviews})</span>
                  </div>
                  <span className="text-[#2a8703] font-bold text-[18px]">${product.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All Products Grid with Pagination */}
        <div className="bg-white rounded-[16px] shadow-[0_2px_4px_rgba(0,0,0,0.08)] p-6 lg:p-8 mb-10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[20px] font-bold tracking-tight">All Products ({totalItems})</h3>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
            {paginatedItems.map((product, idx) => (
              <div key={`blueretail-grid-${idx}-${product.id}`} data-product-id={product.id} className="flex flex-col group cursor-pointer">
                <div className="relative aspect-square w-full mb-3 rounded-[8px] overflow-hidden bg-gray-50">
                  <img src={product.imageUrl} alt={product.title} className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300" />
                  <button 
                    onClick={(e) => handleAddToCart(product, e)}
                    className="absolute bottom-2 right-2 bg-[#0071dc] text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex-1 flex flex-col">
                  <span className="text-[#2a8703] font-bold text-[16px] leading-tight mb-1">
                    {product.currency || 'S/'}{product.price}
                  </span>
                  <h4 className="text-[13px] text-[#2e2f32] line-clamp-2 leading-[1.3] font-normal hover:underline">{product.title}</h4>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8">
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

      </main>

      {/* ─── FOOTER ─── */}
      <footer className="w-full bg-[#004f9a] text-white pt-10 pb-8 rounded-t-[20px] shadow-[0_-4px_10px_rgba(0,0,0,0.1)]">
        <div className="w-full max-w-[1440px] mx-auto px-4 lg:px-6">

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-10">
            {/* Column 1 */}
            <div className="col-span-2 lg:col-span-1">
              <h4 className="font-bold text-[16px] mb-4 text-white tracking-tight">All Departments</h4>
              <div className="flex flex-col gap-3 text-[14px] text-[#eef5fc] font-medium">
                <a href="#" className="hover:text-white hover:underline">Store Directory</a>
                <a href="#" className="hover:text-white hover:underline">Careers</a>
                <a href="#" className="hover:text-white hover:underline">Our Company</a>
                <a href="#" className="hover:text-white hover:underline">Sell on BlueRetail.com</a>
                <a href="#" className="hover:text-white hover:underline">Help</a>
                <a href="#" className="hover:text-white hover:underline">COVID-19 Vaccine</a>
              </div>
            </div>

            <div className="col-span-2 lg:col-span-1">
              <h4 className="font-bold text-[16px] mb-4 text-white tracking-tight">Services</h4>
              <div className="flex flex-col gap-3 text-[14px] text-[#eef5fc] font-medium">
                <a href="#" className="hover:text-white hover:underline">Pharmacy</a>
                <a href="#" className="hover:text-white hover:underline">Auto Care Center</a>
                <a href="#" className="hover:text-white hover:underline">Photo Center</a>
                <a href="#" className="hover:text-white hover:underline">Virtual Care</a>
                <a href="#" className="hover:text-white hover:underline">Finance</a>
                <a href="#" className="hover:text-white hover:underline">Registry</a>
              </div>
            </div>

            <div className="col-span-2 lg:col-span-2 bg-[#003875] p-6 rounded-[12px] flex flex-col justify-center items-center text-center">
              <h4 className="font-bold text-[18px] mb-2 text-white">We'd love to hear what you think!</h4>
              <button className="bg-white text-[#004f9a] border border-white px-6 py-2 rounded-full font-bold text-[14px] mt-2 hover:bg-transparent hover:text-white transition-colors">
                Give feedback
              </button>
            </div>

            <div className="col-span-2 lg:col-span-2">
              <div className="flex flex-col bg-white rounded-[12px] p-6 text-[#2e2f32]">
                <h4 className="font-bold text-[18px] mb-2">Get the BlueRetail App</h4>
                <p className="text-[14px] mb-4">Scan the QR code to download</p>
                <div className="flex gap-4">
                  <div className="w-20 h-20 bg-gray-200 rounded-[8px] p-2 flex items-center justify-center">
                    {/* Fake QR */}
                    <Grid className="w-12 h-12 text-gray-400" />
                  </div>
                  <div className="flex flex-col gap-2 justify-center">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-[32px] cursor-pointer" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-[32px] cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-[#0071dc] pt-8 flex flex-wrap justify-center items-center gap-x-6 gap-y-4 text-[13px] text-white">
            <a href="#" className="hover:underline">© 2026 {data.name} All Rights Reserved.</a>
            <a href="#" className="hover:underline">To Do Not Sell Or Share My Personal Information</a>
            <a href="#" className="hover:underline">Request My Personal Information</a>
            <a href="#" className="hover:underline">California Supply Chain Act</a>
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Use</a>
          </div>

        </div>
      </footer>
    </div>
  );
}

const StoreIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-store"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" /><path d="M4 12v8a2 2 0 0 0 2 2h2" /><path d="M20 12v8a2 2 0 0 1-2 2h-2" /><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" /><path d="M2 7h20" /><path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7" /></svg>
)

