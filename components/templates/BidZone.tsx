'use client';

import React, { useState } from 'react';
import { StoreData } from '@/lib/types';
import { Search, ShoppingCart, Bell, ChevronDown, CheckCircle, ShieldCheck, ArrowRight, Facebook, Twitter, Smartphone, Monitor, Watch, Shirt, Heart, Tag, Menu, X } from 'lucide-react';
import { usePagination, ProductPagination } from './shared/Pagination';

export default function BidZoneTemplate({ data }: { data: StoreData }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [watchlist, setWatchlist] = useState<string[]>([]);
  
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

  const toggleWatchlist = (productId: string) => {
    setWatchlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };
  return (
    <div className="min-h-full bg-white font-sans text-[#191919] overflow-x-hidden">

      {/* ─── TOP HEADER NAV (BidZone Small Links) ─── */}
      <div className="border-b border-gray-200 text-[12px] bg-white z-50 relative">
        <div className="w-full max-w-[1440px] mx-auto px-4 lg:px-8 h-[34px] flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="hidden sm:inline">Hi! <a href="#" className="text-[#0654ba] hover:underline font-bold">Sign in</a> or <a href="#" className="text-[#0654ba] hover:underline">register</a></span>
            <span className="sm:hidden"><a href="#" className="text-[#0654ba] hover:underline font-bold">Sign in</a></span>
            <a href="#" className="hover:underline hidden md:block">Daily Deals</a>
            <a href="#" className="hover:underline hidden lg:block">Brand Outlet</a>
            <a href="#" className="hover:underline hidden lg:block">Help & Contact</a>
          </div>
          <div className="flex items-center space-x-3 lg:space-x-4">
            <a href="#" className="hover:underline hidden sm:block">Ship to</a>
            <a href="#" className="hover:underline hidden sm:block">Sell</a>
            <div className="w-[1px] h-3 bg-gray-300 hidden sm:block"></div>
            <a href="#" className="hover:underline hidden sm:flex items-center gap-1">Watchlist <ChevronDown className="w-3 h-3 pt-[2px]" /></a>
            <a href="#" className="hover:underline hidden sm:flex items-center gap-1">My BidZone <ChevronDown className="w-3 h-3 pt-[2px]" /></a>
            <Bell className="w-5 h-5 cursor-pointer hover:text-[#0654ba]" strokeWidth={1.5} />
            <div 
              onClick={addToCart}
              className="relative cursor-pointer hover:text-[#0654ba]"
            >
              <ShoppingCart className="w-5 h-5" strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#dd1e31] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{cartCount}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ─── MAIN HEADER (Search Bar) ─── */}
      <header className="w-full max-w-[1440px] mx-auto px-4 lg:px-8 py-3 lg:py-4 flex flex-col lg:flex-row items-center gap-4 sticky top-0 bg-white z-40 relative">

        {/* Logo */}
        <div className="font-black text-[38px] tracking-tighter shrink-0 flex items-center leading-none mr-4">
          <span className="text-[#e53238]">e</span>
          <span className="text-[#0064d2]">b</span>
          <span className="text-[#f5af02]">a</span>
          <span className="text-[#86b817]">y</span>
        </div>

        {/* Shop by category Dropdown */}
        <div className="hidden lg:flex items-center text-[13px] text-gray-500 cursor-pointer hover:text-[#0654ba] shrink-0 mr-2 leading-tight">
          Shop by <br /> category <ChevronDown className="w-3 h-3 ml-1 mt-1 opacity-60" />
        </div>

        {/* Search Input Container */}
        <div className="w-full flex-1 flex">
          <div className="flex-1 flex border-[2px] border-[#191919] rounded-[2px] overflow-hidden group">
            <div className="flex items-center pl-3">
              <Search className="w-[18px] h-[18px] text-gray-500" strokeWidth={2} />
            </div>
            <input
              type="text"
              placeholder="Search for anything"
              className="w-full py-2.5 px-3 outline-none text-[15px] font-normal"
            />
            <div className="hidden md:block w-[1px] bg-gray-300 h-[70%] my-auto"></div>
            <select className="hidden md:block bg-white pl-3 pr-8 text-[13px] text-gray-600 outline-none w-[160px] cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22currentColor%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22%3e%3cpolyline points=%226 9 12 15 18 9%22%3e%3c/polyline%3e%3c/svg%3e')] bg-no-repeat bg-[position:calc(100%-10px)_center]">
              <option>All Categories</option>
              <option>Antiques</option>
              <option>Art</option>
              <option>Baby</option>
            </select>
          </div>
          <button className="bg-[#3665f3] text-white px-8 lg:px-10 ml-2 rounded-[2px] text-[15px] hover:bg-[#2b50c5] transition-colors shadow-sm">
            Search
          </button>
        </div>

        {/* Advanced Link */}
        <div className="hidden xl:block text-[12px] text-gray-500 cursor-pointer hover:text-[#0654ba] shrink-0 w-[60px]">
          Advanced
        </div>
      </header>

      {/* ─── CATEGORY NAVIGATION TABS ─── */}
      <div className="w-full max-w-[1440px] mx-auto px-4 lg:px-8 border-b border-gray-200 mb-6 bg-white z-30 relative hidden md:block">
        <nav className="flex items-center justify-center space-x-6 text-[13px] text-[#555] h-[40px]">
          <a href="#" className="hover:underline h-full flex items-center">Saved</a>
          <a href="#" className="hover:underline h-full flex items-center">Electronics</a>
          <a href="#" className="hover:underline h-full flex items-center">Motors</a>
          <a href="#" className="hover:underline h-full flex items-center">Fashion</a>
          <a href="#" className="hover:underline h-full flex items-center border-b-[3px] border-[#191919] font-bold text-[#191919]">Collectibles and Art</a>
          <a href="#" className="hover:underline h-full flex items-center">Sports</a>
          <a href="#" className="hover:underline h-full flex items-center">Health & Beauty</a>
          <a href="#" className="hover:underline h-full flex items-center">Industrial equipment</a>
          <a href="#" className="hover:underline h-full flex items-center">Home & Garden</a>
        </nav>
      </div>

      {/* ─── MAIN CONTENT ─── */}
      <main className="w-full max-w-[1440px] mx-auto px-4 lg:px-8 py-2 md:py-6">

        {/* Hero Banner (BidZone Rounded Banner) */}
        <div className="bg-[#ffeedd] rounded-[16px] overflow-hidden flex flex-col md:flex-row items-center mb-10 md:mb-14 cursor-pointer relative group">
          <div className="p-8 md:p-12 lg:p-16 flex-1 w-full order-2 md:order-1 text-center md:text-left z-10 w-full md:w-1/2">
            <h2 className="text-[28px] md:text-[38px] font-bold mb-4 text-[#191919] leading-[1.1] tracking-tight">{data.description || 'Deals to make you smile'}</h2>
            <p className="text-[16px] mb-6 text-[#191919] font-normal">Save big on your favorite brands.</p>
            <button className="border border-[#191919] bg-transparent text-[#191919] px-6 py-2.5 font-bold text-[14px] hover:bg-[#191919] hover:text-white transition-colors rounded-full shadow-[inset_0_0_0_1px_rgba(25,25,25,1)]">
              Shop now <ArrowRight className="w-4 h-4 inline ml-1 -translate-y-[1px]" />
            </button>
          </div>
          <div className="w-full md:w-1/2 h-[250px] md:h-full order-1 md:order-2 self-stretch relative overflow-hidden bg-white">
            {/* Organic shape mask for the image - very common in new BidZone UI */}
            <div className="absolute inset-0 bg-[#ffeedd] z-10 w-[20%] h-[120%] -left-10 -top-10 rotate-[15deg] hidden md:block"></div>
            <img src={data.bannerImage} alt="Banner" className="w-full h-[300px] md:h-[400px] object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-700 ease-in-out origin-center" />
          </div>
        </div>

        {/* Explore Categories (Circular UI) */}
        <div className="mb-14">
          <div className="flex items-center space-x-4 mb-5">
            <h3 className="text-[20px] font-bold">Explore Popular Categories</h3>
            <a href="#" className="text-[#0654ba] hover:underline flex items-center text-[14px]">See all <ArrowRight className="w-4 h-4 ml-0.5" /></a>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-9 gap-4 text-center">
            {[
              { name: 'Sneakers', icon: Heart },
              { name: 'Watches', icon: Watch },
              { name: 'Cards', icon: Tag },
              { name: 'Handbags', icon: Heart },
              { name: 'Phones', icon: Smartphone },
              { name: 'Gaming', icon: Monitor },
              { name: 'Laptops', icon: Monitor },
              { name: 'Fashion', icon: Shirt },
              { name: 'Parts', icon: ShieldCheck },
            ].map((cat, i) => (
              <div key={i} className="flex flex-col items-center cursor-pointer group">
                <div className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] rounded-full overflow-hidden mb-3 border border-transparent group-hover:border-gray-300 transition-colors shadow-[0_2px_4px_rgba(0,0,0,0.08)] bg-[#f7f7f7] flex items-center justify-center p-4">
                  <cat.icon className="w-8 h-8 md:w-10 md:h-10 text-[#555] group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                </div>
                <span className="font-normal text-[13px] text-[#191919] group-hover:underline underline-offset-2">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Product Grid WITH PAGINATION (3x5 = 15 products) */}
        <div className="flex items-end space-x-4 mb-6">
          <h3 className="text-[24px] font-bold leading-none tracking-tight">Today's Deals – All With Free Shipping ({totalItems} items)</h3>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-x-4 gap-y-8 mb-8">
          {paginatedItems.map((product, idx) => {
            const price = parseFloat(product.price.replace(/[$,]/g, ''));
            const originalPrice = product.originalPrice ? parseFloat(product.originalPrice.replace(/[$,]/g, '')) : 0;
            const discount = originalPrice > price ? Math.round((1 - price / originalPrice) * 100) : 0;

            return (
              <div key={`bidzone-${idx}-${product.id}`} data-product-id={product.id} className="group cursor-pointer flex flex-col">
                <div className="bg-[#f7f7f7] aspect-square mb-2 flex items-center justify-center overflow-hidden rounded-[8px] relative z-0">
                  <img src={product.imageUrl} alt={product.title} className="max-w-[85%] max-h-[85%] object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300" />

                  {/* Watchlist Heart */}
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleWatchlist(product.id); }}
                    className="absolute top-2 right-2 p-1.5 bg-white/80 rounded-full hover:bg-white transition-colors"
                  >
                    <Heart className={`w-4 h-4 ${watchlist.includes(product.id) ? 'fill-[#dd1e31] text-[#dd1e31]' : 'text-gray-500'}`} />
                  </button>
                  
                  {/* Top Rated Seller */}
                  {Math.random() > 0.7 && (
                    <div className="absolute bottom-2 left-2">
                      <ShieldCheck className="w-4 h-4 text-[#f5af02] fill-white" />
                    </div>
                  )}
                </div>

                <h4 className="text-[13px] text-[#191919] line-clamp-2 leading-snug mb-1 font-normal group-hover:underline">{product.title}</h4>

                <div className="flex flex-col mt-auto pt-1">
                  <div className="text-[18px] font-bold text-[#191919] mb-0.5 leading-none">${product.price}</div>

                  {discount > 0 && (
                    <div className="text-[11px] text-[#555] flex items-center mb-0.5">
                      <span className="line-through mr-1.5">${product.originalPrice}</span>
                      <span className="text-[#191919] font-bold">{discount}% OFF</span>
                    </div>
                  )}

                  <div className="text-[11px] text-[#555] font-normal mb-1">
                    <span className="font-bold text-[#191919]">Free shipping</span>
                  </div>

                  <button 
                    onClick={(e) => { e.stopPropagation(); addToCart(); }}
                    className="bg-[#3665f3] text-white text-[12px] font-bold py-1.5 rounded-full mt-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mb-12">
            <ProductPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
            />
          </div>
        )}

        {/* Authenticity Guarantee Banner */}
        <div className="bg-[#f7f7f7] rounded-[16px] p-8 md:p-10 mb-16 flex flex-col md:flex-row items-center border border-gray-200 overflow-hidden relative cursor-pointer group">
          <div className="absolute right-0 top-0 bottom-0 w-[40%] bg-gradient-to-l from-[#e5f1ff] to-transparent hidden md:block"></div>

          <div className="w-full md:w-3/5 z-10 md:pr-10">
            <div className="flex items-center space-x-2 mb-4">
              <ShieldCheck className="w-8 h-8 text-[#0064d2]" strokeWidth={2.5} />
              <h2 className="text-[28px] font-bold text-[#191919] tracking-tight leading-none">Authenticity Guarantee</h2>
            </div>
            <p className="text-[16px] text-[#555] mb-6 font-normal">Our experts verify your item before it's shipped to you, ensuring you get exactly what you ordered.</p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center text-[14px] text-[#191919]"><CheckCircle className="w-5 h-5 text-[#86b817] mr-3" /> Independent experts verify every item</li>
              <li className="flex items-center text-[14px] text-[#191919]"><CheckCircle className="w-5 h-5 text-[#86b817] mr-3" /> Secure delivery with signature required</li>
            </ul>
            <button className="border border-[#191919] bg-white text-[#191919] px-6 py-2 rounded-full font-bold text-[14px] hover:bg-gray-50 transition-colors shadow-sm">
              Learn more
            </button>
          </div>

          <div className="w-full md:w-2/5 grid grid-cols-2 gap-3 mt-8 md:mt-0 z-10 perspective-1000">
            <div className="col-span-1 rounded-[12px] overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.1)] transform rotate-[-2deg] hover:rotate-0 transition-transform bg-white p-4">
              <img src="https://picsum.photos/300/300?random=189" className="w-full aspect-square object-contain mix-blend-multiply" />
            </div>
            <div className="col-span-1 rounded-[12px] overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.1)] transform rotate-[3deg] hover:rotate-0 transition-transform bg-white p-4 translate-y-4">
              <img src="https://picsum.photos/300/300?random=190" className="w-full aspect-square object-contain mix-blend-multiply" />
            </div>
          </div>
        </div>

      </main>

      {/* ─── FOOTER ─── */}
      <footer className="bg-white border-t border-gray-200 pt-10 pb-16 text-[12px] font-normal leading-[1.6]">
        <div className="w-full max-w-[1440px] mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-10 mb-10 text-[#555]">

            <div>
              <h4 className="font-bold text-[#191919] mb-3 text-[14px]">Buy</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Registration</a></li>
                <li><a href="#" className="hover:underline">BidZone Money Back Guarantee</a></li>
                <li><a href="#" className="hover:underline">Bidding & buying help</a></li>
                <li><a href="#" className="hover:underline">Stores</a></li>
                <li><a href="#" className="hover:underline">BidZone for Charity</a></li>
                <li><a href="#" className="hover:underline">Charity Shop</a></li>
                <li><a href="#" className="hover:underline">Sales & events</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-[#191919] mb-3 text-[14px]">Sell</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Start selling</a></li>
                <li><a href="#" className="hover:underline">How to sell</a></li>
                <li><a href="#" className="hover:underline">Business sellers</a></li>
                <li><a href="#" className="hover:underline">Affiliates</a></li>
              </ul>

              <h4 className="font-bold text-[#191919] mt-8 mb-3 text-[14px]">Tools & apps</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Developers</a></li>
                <li><a href="#" className="hover:underline">Security center</a></li>
                <li><a href="#" className="hover:underline">Site map</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-[#191919] mb-3 text-[14px]">Stay connected</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">BidZone's Blogs</a></li>
                <li><a href="#" className="hover:underline flex items-center"><Facebook className="w-[14px] h-[14px] mr-1.5" /> Facebook</a></li>
                <li><a href="#" className="hover:underline flex items-center"><Twitter className="w-[14px] h-[14px] mr-1.5" /> Twitter</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-[#191919] mb-3 text-[14px]">About BidZone</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Company info</a></li>
                <li><a href="#" className="hover:underline">News</a></li>
                <li><a href="#" className="hover:underline">Investors</a></li>
                <li><a href="#" className="hover:underline">Careers</a></li>
                <li><a href="#" className="hover:underline">Diversity & Inclusion</a></li>
                <li><a href="#" className="hover:underline">Global Impact</a></li>
                <li><a href="#" className="hover:underline">Government relations</a></li>
                <li><a href="#" className="hover:underline">Advertise with us</a></li>
                <li><a href="#" className="hover:underline">Policies</a></li>
                <li><a href="#" className="hover:underline">Verified Rights Owner (VeRO) Program</a></li>
                <li><a href="#" className="hover:underline">eCI Licenses</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-[#191919] mb-3 text-[14px]">Help & Contact</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Seller Information Center</a></li>
                <li><a href="#" className="hover:underline">Contact us</a></li>
              </ul>

              <h4 className="font-bold text-[#191919] mt-8 mb-3 text-[14px]">Community</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Announcements</a></li>
                <li><a href="#" className="hover:underline">Discussion boards</a></li>
                <li><a href="#" className="hover:underline">BidZone Giving Works</a></li>
              </ul>
            </div>
          </div>

          <div className="text-[11px] text-[#555] flex flex-wrap gap-x-2 gap-y-1 items-center">
            <span>Copyright © 1995-2026 BidZone Inc. All Rights Reserved.</span>
            <a href="#" className="hover:underline ml-2">Accessibility</a>,
            <a href="#" className="hover:underline">User Agreement</a>,
            <a href="#" className="hover:underline">Privacy</a>,
            <a href="#" className="hover:underline">Payments Terms of Use</a>,
            <a href="#" className="hover:underline">Cookies</a>,
            <a href="#" className="hover:underline">CA Privacy Notice</a>,
            <a href="#" className="hover:underline">Your Privacy Choices</a>
            <span>and</span>
            <a href="#" className="hover:underline">AdChoice</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
