'use client';

import React, { useState } from 'react';
import { StoreData } from '@/lib/types';
import { Search, ShoppingCart, Menu, User, MapPin, ChevronDown, Star, Monitor, Smartphone, Laptop, Headphones, Camera, Watch, ShieldCheck, Wrench, Truck, CreditCard, ChevronRight, Heart, X } from 'lucide-react';
import { usePagination, ProductPagination } from './shared/Pagination';

export default function TechRetailTemplate({ data }: { data: StoreData }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [favorites, setFavorites] = useState<string[]>([]);
  
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

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div className="min-h-full bg-[#f0f2f4] font-sans text-[#040c13] overflow-x-hidden">

      {/* ─── PROMO BAR ─── */}
      <div className="bg-[#001e73] text-white text-[13px] h-[40px] hidden md:flex items-center justify-center font-bold px-4">
        <a href="#" className="hover:underline">TechRetail Drops™ - Shop app-exclusive limited releases »</a>
      </div>

      {/* ─── HEADER ─── */}
      <header className="bg-[#0046be] text-white sticky top-0 z-50">

        {/* Main Header Row */}
        <div className="w-full max-w-[1440px] mx-auto px-4 lg:px-6 h-[72px] flex items-center justify-between gap-4 lg:gap-8">

          {/* Logo & Menu */}
          <div className="flex items-center gap-6 shrink-0 h-full">
            <div className="font-black text-[32px] tracking-tighter flex items-center bg-[#fff200] text-[#0046be] px-1.5 py-0.5 rounded-[4px] leading-none cursor-pointer hover:bg-[#ffe000] transition-colors mt-1">
              {data.logoText}
            </div>

            <button className="hidden lg:flex items-center gap-2 font-bold text-[15px] hover:text-[#fff200] cursor-pointer transition-colors px-2 h-full">
              <Menu className="w-[26px] h-[26px]" />
              <span>Menu</span>
            </button>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex items-center text-white p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-[700px] h-[44px] relative flex shadow-sm">
            <input
              type="text"
              placeholder="What can we help you find today?"
              className="w-full h-full bg-white rounded-l-[4px] pl-4 pr-4 text-[15px] font-normal text-[#040c13] outline-none placeholder:text-gray-500 focus:ring-2 focus:ring-[#0046be] focus:ring-inset"
            />
            <button className="w-[48px] h-full bg-white rounded-r-[4px] flex items-center justify-center text-[#0046be] hover:bg-gray-100 transition-colors border-l border-gray-200">
              <Search className="w-5 h-5" strokeWidth={2.5} />
            </button>
          </div>

          {/* Right Nav (Store, Account, Cart) */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-5 shrink-0 font-bold text-[14px] h-full">

            <a href="#" className="flex items-center gap-1.5 cursor-pointer hover:text-white/80 px-2 h-full">
              <StoreIcon className="w-[22px] h-[22px] mt-0.5" />
              <div className="flex flex-col leading-[1.2]">
                <span className="text-[12px] font-normal text-blue-200">Aiea</span>
                <span>My Store <ChevronDown className="w-3 h-3 inline ml-0.5 opacity-70" /></span>
              </div>
            </a>

            <div 
              onClick={() => toggleFavorite('header')}
              className="flex items-center gap-2 cursor-pointer hover:text-white/80 transition-colors px-2 h-full relative"
            >
              <Heart className={`w-[20px] h-[20px] ${favorites.length > 0 ? 'fill-red-500 text-red-500' : ''}`} />
              {favorites.length > 0 && (
                <span className="absolute -top-0 -right-1 bg-red-500 text-white text-[10px] font-black px-1.5 rounded-full">{favorites.length}</span>
              )}
              <span>Saved</span>
            </div>

            <a href="#" className="flex items-center gap-2 cursor-pointer hover:text-[#fff200] transition-colors px-2 h-full">
              <ShoppingCart className="w-[24px] h-[24px]" />
              <span>Cart ({cartCount})</span>
            </a>

            <div className="w-[1px] h-[24px] bg-white/20 mx-2"></div>

            <a href="#" className="flex items-center gap-2 cursor-pointer hover:text-white/80 transition-colors pl-2 h-full">
              Account <ChevronDown className="w-4 h-4 opacity-70" />
            </a>
          </div>

        </div>

        {/* Sub Header Links */}
        <div className="bg-[#003da5] border-t border-[#0046be]">
          <div className="w-full max-w-[1440px] mx-auto px-4 lg:px-6 h-[44px] flex items-center text-[13px] font-bold overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:hidden">
            <div className="flex items-center space-x-6 text-white min-w-max pr-4">
              <a href="#" className="hover:underline">Top Deals</a>
              <a href="#" className="hover:underline">Deal of the Day</a>
              <a href="#" className="hover:underline">Yes, TechRetail Sells That</a>
              <a href="#" className="hover:underline">My TechRetail Memberships</a>
              <a href="#" className="hover:underline">Credit Cards</a>
              <a href="#" className="hover:underline">Gift Cards</a>
              <a href="#" className="hover:underline">Gift Ideas</a>
            </div>
            <div className="ml-auto min-w-max pl-4 hidden lg:block text-[#fff200]">
              <a href="#" className="hover:underline">Recently Viewed</a> <ChevronDown className="w-3 h-3 inline mb-0.5 opacity-70" />
            </div>
          </div>
        </div>
      </header>

      {/* ─── MAIN CONTENT ─── */}
      <main className="w-full max-w-[1440px] mx-auto px-4 lg:px-6 py-6 lg:py-8">

        {/* Banner Section (TechRetail Heavy Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-14">
          <div className="lg:col-span-2 rounded-[4px] overflow-hidden bg-white shadow-[0_1px_3px_rgba(0,0,0,0.1)] relative h-[250px] md:h-[350px] lg:h-[420px] cursor-pointer group">
            <img src={data.bannerImage} alt="TechRetail Banner" className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-in-out" />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent flex flex-col justify-center p-8 md:p-14 w-full md:w-2/3">
              <h2 className="text-[32px] md:text-[44px] font-black text-[#040c13] leading-none mb-3 tracking-tight">{data.description || 'Tech savings'}</h2>
              <p className="text-[16px] md:text-[20px] text-[#040c13] mb-8 font-medium max-w-[400px]">Huge discounts on the season's hottest items.</p>
              <button className="bg-[#0046be] text-white px-8 py-3 rounded-[4px] font-bold text-[15px] hover:bg-[#003da5] transition-colors w-fit shadow-sm">
                Shop Now
              </button>
            </div>
          </div>

          <div className="bg-[#0046be] rounded-[4px] shadow-[0_1px_3px_rgba(0,0,0,0.1)] p-8 md:p-10 flex flex-col justify-center text-white relative overflow-hidden h-[300px] lg:h-[420px]">
            {/* Background design */}
            <div className="absolute -right-20 -top-20 w-[250px] h-[250px] bg-white/5 rounded-full blur-2xl"></div>

            <div className="font-black text-[28px] md:text-[34px] tracking-tight mb-4 flex items-center leading-none">
              <span className="text-[#fff200] leading-none">my</span>
              <span className="mx-1.5 leading-none">TechRetail</span>
              <span className="leading-none">®</span>
            </div>
            <p className="text-[17px] mb-8 font-medium leading-tight">Exclusive savings for Plus and Total members on the latest tech.</p>
            <button className="bg-[#fff200] text-[#040c13] px-8 py-3 rounded-[4px] font-bold text-[15px] hover:bg-[#ffe000] transition-colors w-fit shadow-md">
              Learn More
            </button>
          </div>
        </div>

        {/* Featured Offers (Product Grid) */}
        <div className="mb-14">
          <div className="flex items-end justify-between mb-6 pb-2 border-b border-gray-300">
            <h2 className="text-[20px] font-bold tracking-tight">Featured Offers ({totalItems})</h2>
            <a href="#" className="text-[14px] text-[#0046be] hover:underline font-bold flex items-center">
              View all <ChevronRight className="w-4 h-4 ml-0.5" />
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-4">
            {paginatedItems.map((product: any, idx: number) => (
              <div key={product.id || idx} data-product-id={product.id} className="bg-white rounded-[4px] p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:shadow-[0_2px_12px_rgba(0,0,0,0.1)] transition-all flex flex-col border border-gray-200 hover:border-blue-400 group relative">

                {idx % 3 === 0 && (
                  <div className="absolute top-0 left-4 bg-[#b8281e] text-white text-[11px] font-bold px-2 py-0.5 rounded-b-[4px] z-10 tracking-wider">
                    DEAL
                  </div>
                )}

                <div className="aspect-square w-full mb-4 flex items-center justify-center p-2 pt-6">
                  <img src={product.imageUrl} alt={product.title} className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300" />
                </div>

                <div className="flex-1 flex flex-col">
                  {/* Reviews line */}
                  <div className="flex items-center space-x-1 mb-2">
                    <div className="flex text-[#ffe000]">
                      <Star className="w-[14px] h-[14px] fill-current" />
                      <Star className="w-[14px] h-[14px] fill-current" />
                      <Star className="w-[14px] h-[14px] fill-current" />
                      <Star className="w-[14px] h-[14px] fill-current" />
                      <Star className="w-[14px] h-[14px] fill-current text-gray-300" />
                    </div>
                    <span className="text-[13px] text-gray-600">({product.reviews})</span>
                  </div>

                  {/* Title */}
                  <h4 className="text-[13px] text-[#0046be] hover:text-[#001e73] hover:underline cursor-pointer line-clamp-3 mb-4 font-normal leading-snug">
                    {product.title}
                  </h4>

                  <div className="mt-auto">
                    {/* Price Block */}
                    <div className="flex items-start mb-1">
                      <span className="text-[20px] md:text-[24px] font-bold text-[#040c13] leading-none">${product.price}</span>
                    </div>

                    {product.originalPrice && (
                      <div className="flex flex-col mb-4">
                        <span className="bg-[#b8281e] text-white text-[12px] font-bold px-1.5 py-0.5 w-fit rounded-[2px] mt-1 mb-0.5">Save ${(parseFloat(product.originalPrice || '0') - parseFloat(product.price)).toFixed(2)}</span>
                        <span className="text-[12px] text-gray-500">Was ${product.originalPrice}</span>
                      </div>
                    )}

                    {!product.originalPrice && <div className="h-6 mb-4"></div>}

                    {/* Add to Cart button */}
                    <button 
                      onClick={addToCart}
                      className="w-full bg-[#fff200] text-[#040c13] py-[10px] rounded-[4px] text-[14px] font-bold border border-transparent hover:bg-[#ffe000] hover:border-[#ffe000] transition-colors flex items-center justify-center gap-2 active:scale-[0.98]"
                    >
                      <ShoppingCart className="w-[18px] h-[18px]" strokeWidth={2.5} />
                      <span className="hidden sm:inline">Add to Cart</span>
                      <span className="sm:hidden">Add</span>
                    </button>
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

        {/* Deal of the Day (Full Width Banner Style) */}
        <div className="mb-14 border border-gray-300 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.05)] rounded-[4px] overflow-hidden md:min-h-[300px] flex flex-col md:flex-row group">
          <div className="bg-[#f0f2f4] p-8 md:p-12 md:w-1/3 flex flex-col justify-center border-b md:border-b-0 md:border-r border-gray-300 relative">
            <div className="absolute top-0 right-4 bg-[#b8281e] text-white text-[12px] font-bold px-3 py-1.5 rounded-b-[4px] uppercase tracking-wider hidden md:block">
              Deal of the Day
            </div>
            <h3 className="text-[28px] md:text-[36px] font-black text-[#040c13] leading-[1.1] mb-2 tracking-tight">Save big on top tech.</h3>
            <p className="text-[15px] text-gray-600 mb-6 font-medium">New deals. Every day.</p>
            <button className="bg-[#0046be] text-white px-8 py-2.5 rounded-[4px] font-bold text-[14px] hover:bg-[#003da5] transition-colors w-fit">
              See All Deals
            </button>
          </div>

          <div className="md:w-2/3 p-6 md:p-8 flex flex-col md:flex-row gap-6 relative">
            <div className="md:hidden absolute top-0 left-6 bg-[#b8281e] text-white text-[11px] font-bold px-3 py-1 rounded-b-[4px] uppercase tracking-wider z-10">
              Deal of the Day
            </div>

            {/* Left Product Image */}
            <div className="w-full md:w-1/2 aspect-square md:aspect-auto lg:h-[240px] flex items-center justify-center p-4 pt-10 md:pt-4">
              <img src={data.products[0]?.imageUrl} className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500" />
            </div>

            {/* Right Product Details */}
            <div className="w-full md:w-1/2 flex flex-col justify-center">
              <div className="flex text-[#ffe000] mb-2">
                <Star className="w-[14px] h-[14px] fill-current" />
                <Star className="w-[14px] h-[14px] fill-current" />
                <Star className="w-[14px] h-[14px] fill-current" />
                <Star className="w-[14px] h-[14px] fill-current" />
                <Star className="w-[14px] h-[14px] fill-current text-gray-300" />
                <span className="text-[13px] text-gray-600 ml-1">({data.products[0]?.reviews})</span>
              </div>
              <h4 className="text-[15px] text-[#0046be] hover:underline cursor-pointer line-clamp-2 md:line-clamp-3 font-medium mb-4">
                {data.products[0]?.title}
              </h4>
              <div className="text-[32px] font-bold text-[#040c13] leading-none mb-1">
                ${(parseFloat(data.products[0]?.price || '0') * 0.7).toFixed(2)}
              </div>
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-[#b8281e] text-white text-[12px] font-bold px-1.5 py-0.5 rounded-[2px]">Save ${(parseFloat(data.products[0]?.price || '0') * 0.3).toFixed(2)}</div>
                <div className="text-[13px] text-gray-500 line-through">Was ${data.products[0]?.price}</div>
              </div>
              <button className="w-full lg:w-3/4 bg-[#fff200] text-[#040c13] py-3 rounded-[4px] text-[15px] font-bold hover:bg-[#ffe000] transition-colors flex items-center justify-center gap-2 active:scale-[0.98]">
                <ShoppingCart className="w-[18px] h-[18px]" strokeWidth={2.5} /> Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Shop by Category (Simple White Cards) */}
        <div className="mb-14">
          <h2 className="text-[20px] font-bold tracking-tight mb-6">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 lg:gap-4">
            {[
              { name: 'TVs & Home Theater', icon: Monitor },
              { name: 'Computers & Tablets', icon: Laptop },
              { name: 'Cell Phones', icon: Smartphone },
              { name: 'Audio', icon: Headphones },
              { name: 'Cameras & Camcorders', icon: Camera },
              { name: 'Wearable Technology', icon: Watch },
            ].map((cat, i) => (
              <div key={i} className="bg-white rounded-[4px] p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:shadow-md transition-shadow shadow-[0_1px_2px_rgba(0,0,0,0.05)] border border-gray-200 group h-[140px] md:h-[160px]">
                <cat.icon className="w-12 h-12 text-[#0046be] mb-4 group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-300" strokeWidth={1.5} />
                <span className="font-bold text-[13px] text-[#0046be] group-hover:underline">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Services (Geek Squad Style Banner) */}
        <div className="mb-12">
          <h2 className="text-[20px] font-bold tracking-tight mb-6">Expert Service. Unbeatable Price.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <div className="bg-white p-8 rounded-[4px] shadow-sm border border-gray-200 flex flex-col cursor-pointer group hover:border-[#0046be] transition-colors relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gray-50 rounded-bl-[100px] -z-0 opacity-50"></div>
              <div className="relative z-10">
                <ShieldCheck className="w-10 h-10 text-[#0046be] mb-4" strokeWidth={1.5} />
                <h4 className="text-[18px] font-bold text-[#040c13] mb-2 leading-tight">Geek Squad Protection</h4>
                <p className="text-[14px] text-gray-600 mb-6 font-medium">Protect your tech from drops, spills, and cracks.</p>
                <a href="#" className="text-[#0046be] text-[14px] font-bold group-hover:underline mt-auto flex items-center gap-1 w-fit">Learn More <ChevronRight className="w-4 h-4" /></a>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[4px] shadow-sm border border-gray-200 flex flex-col cursor-pointer group hover:border-[#0046be] transition-colors relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gray-50 rounded-bl-[100px] -z-0 opacity-50"></div>
              <div className="relative z-10">
                <Wrench className="w-10 h-10 text-[#0046be] mb-4" strokeWidth={1.5} />
                <h4 className="text-[18px] font-bold text-[#040c13] mb-2 leading-tight">Repair & Support</h4>
                <p className="text-[14px] text-gray-600 mb-6 font-medium">We fix it, no matter where you bought it.</p>
                <a href="#" className="text-[#0046be] text-[14px] font-bold group-hover:underline mt-auto flex items-center gap-1 w-fit">Schedule a Service <ChevronRight className="w-4 h-4" /></a>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[4px] shadow-sm border border-gray-200 flex flex-col cursor-pointer group hover:border-[#0046be] transition-colors relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gray-50 rounded-bl-[100px] -z-0 opacity-50"></div>
              <div className="relative z-10">
                <Truck className="w-10 h-10 text-[#0046be] mb-4" strokeWidth={1.5} />
                <h4 className="text-[18px] font-bold text-[#040c13] mb-2 leading-tight">Free Delivery & Install</h4>
                <p className="text-[14px] text-gray-600 mb-6 font-medium">On major appliances and 51"+ TVs.</p>
                <a href="#" className="text-[#0046be] text-[14px] font-bold group-hover:underline mt-auto flex items-center gap-1 w-fit">See Details <ChevronRight className="w-4 h-4" /></a>
              </div>
            </div>

          </div>
        </div>

      </main>

      {/* ─── FOOTER ─── */}
      <footer className="bg-white pt-10 pb-8 border-t border-gray-300 mt-0">
        <div className="w-full max-w-[1440px] mx-auto px-4 lg:px-6">

          <div className="bg-[#f0f2f4] rounded-[8px] p-6 lg:p-8 mb-12 shadow-[inset_0_1px_3px_rgba(0,0,0,0.05)] border border-gray-200 flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-6 mb-6 md:mb-0">
              <CreditCard className="w-12 h-12 text-[#0046be] shrink-0" strokeWidth={1.5} />
              <div>
                <h4 className="text-[20px] font-bold text-[#040c13] leading-tight mb-1">My TechRetail® Credit Card</h4>
                <p className="text-[15px] text-[#040c13] font-medium">Get 5% back in rewards or flexible financing.</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 w-full md:w-auto">
              <button className="flex-1 md:flex-none bg-[#0046be] text-white px-8 py-2.5 rounded-[4px] font-bold text-[14px] hover:bg-[#003da5] transition-colors shadow-sm">Apply Now</button>
              <button className="flex-1 md:flex-none bg-white text-[#0046be] border border-[#0046be] px-8 py-2.5 rounded-[4px] font-bold text-[14px] hover:bg-[#f0f2f4] transition-colors">Learn More</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 mb-12">
            <div>
              <h4 className="font-bold text-[15px] text-[#040c13] mb-5 tracking-tight">Order & Purchases</h4>
              <ul className="space-y-3.5 text-[14px] text-[#0046be] font-medium">
                <li><a href="#" className="hover:underline hover:text-[#001e73]">Check Order Status</a></li>
                <li><a href="#" className="hover:underline hover:text-[#001e73]">Shipping, Delivery & Pickup</a></li>
                <li><a href="#" className="hover:underline hover:text-[#001e73]">Returns & Exchanges</a></li>
                <li><a href="#" className="hover:underline hover:text-[#001e73]">Price Match Guarantee</a></li>
                <li><a href="#" className="hover:underline hover:text-[#001e73]">Product Recalls</a></li>
                <li><a href="#" className="hover:underline hover:text-[#001e73]">Trade-In Program</a></li>
                <li><a href="#" className="hover:underline hover:text-[#001e73]">Gift Cards</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-[15px] text-[#040c13] mb-5 tracking-tight">Support & Services</h4>
              <ul className="space-y-3.5 text-[14px] text-[#0046be] font-medium">
                <li><a href="#" className="hover:underline hover:text-[#001e73]">Visit our Support Center</a></li>
                <li><a href="#" className="hover:underline hover:text-[#001e73]">Shop with an Expert</a></li>
                <li><a href="#" className="hover:underline hover:text-[#001e73]">Schedule a Service</a></li>
                <li><a href="#" className="hover:underline hover:text-[#001e73]">Manage an Appointment</a></li>
                <li><a href="#" className="hover:underline hover:text-[#001e73]">Protection & Support Plans</a></li>
                <li><a href="#" className="hover:underline hover:text-[#001e73]">Haul Away & Recycling</a></li>
                <li><a href="#" className="hover:underline hover:text-[#001e73]">Contact Us</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-[15px] text-[#040c13] mb-5 tracking-tight">Partnerships</h4>
              <ul className="space-y-3.5 text-[14px] text-[#0046be] font-medium">
                <li><a href="#" className="hover:underline hover:text-[#001e73]">Affiliate Program</a></li>
                <li><a href="#" className="hover:underline hover:text-[#001e73]">Developers</a></li>
                <li><a href="#" className="hover:underline hover:text-[#001e73]">TechRetail Education</a></li>
                <li><a href="#" className="hover:underline hover:text-[#001e73]">TechRetail Business</a></li>
                <li><a href="#" className="hover:underline hover:text-[#001e73]">Advertise with Us</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-[15px] text-[#040c13] mb-5 tracking-tight">About TechRetail</h4>
              <ul className="space-y-3.5 text-[14px] text-[#0046be] font-medium">
                <li><a href="#" className="hover:underline hover:text-[#001e73]">Corporate Information</a></li>
                <li><a href="#" className="hover:underline hover:text-[#001e73]">Careers</a></li>
                <li><a href="#" className="hover:underline hover:text-[#001e73]">Corporate Responsibility & Sustainability</a></li>
                <li><a href="#" className="hover:underline hover:text-[#001e73]">Discover & Learn</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8 flex flex-col lg:flex-row justify-between items-center text-[12px] text-[#0046be] gap-4">
            <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-3 font-medium">
              <a href="#" className="hover:underline hover:text-[#001e73]">Accessibility</a>
              <a href="#" className="hover:underline hover:text-[#001e73]">Terms & Conditions</a>
              <a href="#" className="hover:underline hover:text-[#001e73]">Privacy</a>
              <a href="#" className="hover:underline hover:text-[#001e73]">Interest-Based Ads</a>
              <a href="#" className="hover:underline hover:text-[#001e73]">State Privacy Rights</a>
              <a href="#" className="hover:underline hover:text-[#001e73]">CA Do Not Sell/Share My Personal Information</a>
              <a href="#" className="hover:underline hover:text-[#001e73]">Limit Use of My Sensitive Personal Information</a>
            </div>
            <div className="text-gray-600 font-normal mt-4 lg:mt-0">
              © 2026 {data.name}. All rights reserved.
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}

const StoreIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
)
