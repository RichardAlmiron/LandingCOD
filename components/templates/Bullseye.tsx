import React from 'react';
import { StoreData } from '@/lib/types';
import { Search, ShoppingCart, User, MapPin, ChevronDown, Heart, Store, Truck, ShieldCheck, Tag, Star, Home, Shirt, Sparkles, Smartphone, Plus, Monitor, Coffee } from 'lucide-react';

export default function BullseyeTemplate({ data }: { data: StoreData }) {
  // Use recommendations logic
  const topDeals = data.products.slice(0, 6);

  return (
    <div className="min-h-full bg-white font-sans text-[#333] overflow-x-hidden">

      {/* ─── TOP UTILITY BAR (Bullseye Style) ─── */}
      <div className="bg-[#cc0000] text-white text-[13px] h-[35px] flex justify-between items-center font-bold px-4 lg:px-8">
        <div className="flex items-center space-x-4 h-full">
          <button className="flex items-center hover:bg-[#aa0000] px-2 h-full rounded-[4px] transition-colors cursor-pointer">
            <MapPin className="w-4 h-4 mr-1.5" />
            <span>My Store: Select Store</span>
            <ChevronDown className="w-[14px] h-[14px] ml-1" />
          </button>
        </div>
        <div className="hidden lg:flex items-center space-x-6 h-full font-normal">
          <a href="#" className="hover:underline">Registry</a>
          <a href="#" className="hover:underline">Weekly Ad</a>
          <a href="#" className="hover:underline">RedCard</a>
          <a href="#" className="hover:underline">Bullseye Circle</a>
          <a href="#" className="hover:underline">Find Stores</a>
        </div>
      </div>

      {/* ─── HEADER ─── */}
      <header className="border-b border-gray-200 sticky top-0 bg-white z-50">
        <div className="w-full max-w-[1440px] mx-auto px-4 lg:px-8 py-3 flex items-center justify-between gap-4 lg:gap-8">

          {/* Logo & Main Nav */}
          <div className="flex items-center gap-6 shrink-0 h-full">
            <button className="lg:hidden text-[#333] hover:bg-gray-100 p-2 rounded-full transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
            </button>
            <div className="w-10 h-10 rounded-full bg-[#cc0000] flex items-center justify-center text-white font-black text-2xl shadow-sm shrink-0 mt-[-2px] cursor-pointer hover:scale-105 transition-transform">
              ◎
            </div>
            <div className="hidden lg:flex items-center space-x-2 font-bold text-[15px] h-full text-[#333]">
              <a href="#" className="hover:bg-[#f4f4f4] px-3 py-2 rounded-[8px] transition-colors flex items-center gap-1">Categories <ChevronDown className="w-[14px] h-[14px] mt-0.5" /></a>
              <a href="#" className="hover:bg-[#f4f4f4] px-3 py-2 rounded-[8px] transition-colors flex items-center gap-1">Deals <ChevronDown className="w-[14px] h-[14px] mt-0.5" /></a>
              <a href="#" className="hover:bg-[#f4f4f4] px-3 py-2 rounded-[8px] transition-colors flex items-center gap-1">New & featured <ChevronDown className="w-[14px] h-[14px] mt-0.5" /></a>
              <a href="#" className="hover:bg-[#f4f4f4] px-3 py-2 rounded-[8px] transition-colors flex items-center gap-1">Pickup & delivery <ChevronDown className="w-[14px] h-[14px] mt-0.5" /></a>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-[700px] h-[48px] relative group">
            <input
              type="text"
              placeholder="What can we help you find?"
              className="w-full h-full bg-[#f4f4f4] rounded-[8px] pl-4 pr-12 text-[15px] font-normal text-[#333] outline-none group-hover:bg-[#e9e9e9] focus:bg-white focus:ring-[2px] focus:ring-[#cc0000] focus:ring-offset-1 transition-all"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 w-[34px] h-[34px] bg-[#333] hover:bg-black text-white rounded-[6px] flex items-center justify-center transition-colors shadow-sm cursor-pointer">
              <Search className="w-[18px] h-[18px]" strokeWidth={2.5} />
            </button>
          </div>

          {/* Account & Cart Icons */}
          <div className="flex items-center space-x-1 lg:space-x-3 2xl:space-x-6 shrink-0 h-full">
            <button className="flex items-center px-3 py-2 hover:bg-[#f4f4f4] rounded-[8px] transition-colors cursor-pointer gap-2">
              <User className="w-[24px] h-[24px]" strokeWidth={2} />
              <span className="text-[14px] font-bold hidden xl:block">Sign in</span>
              <ChevronDown className="w-[14px] h-[14px] hidden lg:block text-gray-400" />
            </button>
            <button className="flex items-center px-3 py-2 hover:bg-[#f4f4f4] rounded-[8px] transition-colors cursor-pointer gap-2 relative">
              <div className="relative">
                <ShoppingCart className="w-[24px] h-[24px]" strokeWidth={2} />
                <span className="absolute -top-1.5 -right-2 bg-[#cc0000] text-white text-[11px] font-bold w-[18px] h-[18px] flex items-center justify-center rounded-full border-2 border-white">0</span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* ─── MAIN CONTENT ─── */}
      <main className="w-full max-w-[1440px] mx-auto px-4 lg:px-8 py-6">

        {/* Banner Section (Bullseye Style Large Visual) */}
        <div className="rounded-[16px] overflow-hidden relative mb-12 shadow-sm bg-[#f4f4f4] group cursor-pointer">
          <img src={data.bannerImage} alt="Bullseye Banner" className="w-full h-[250px] md:h-[350px] object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-in-out" />
          <div className="absolute inset-0 bg-black/20 flex items-center">
            <div className="px-8 md:px-16 w-full md:w-2/3 lg:w-1/2">
              <div className="bg-white/95 backdrop-blur-md p-8 md:p-10 rounded-[16px] shadow-lg">
                <h1 className="text-[32px] md:text-[42px] font-black mb-2 text-[#333] leading-[1.1] tracking-tighter">{data.description || 'Fall fresh finds.'}</h1>
                <p className="text-[16px] text-[#333] mb-6 font-medium">Style your season with the latest arrivals.</p>
                <button className="bg-[#cc0000] text-white px-8 py-3.5 rounded-full font-bold text-[15px] hover:bg-[#aa0000] transition-colors shadow-md active:scale-95">
                  Shop now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Circular Categories Grid (Bullseye Style Categories) */}
        <div className="mb-14">
          <h2 className="text-[22px] font-bold mb-6 tracking-tight">Shop by category</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-x-4 gap-y-6">
            {[
              { name: 'Womens', icon: Shirt, color: 'bg-pink-100' },
              { name: 'Mens', icon: Shirt, color: 'bg-blue-100' },
              { name: 'Home', icon: Home, color: 'bg-orange-100' },
              { name: 'Electronics', icon: Monitor, color: 'bg-gray-200' },
              { name: 'Toys', icon: Tag, color: 'bg-yellow-100' },
              { name: 'Grocery', icon: Coffee, color: 'bg-green-100' },
              { name: 'Baby', icon: Heart, color: 'bg-purple-100' },
              { name: 'Beauty', icon: Sparkles, color: 'bg-red-100' },
            ].map((cat, i) => (
              <div key={i} className="flex flex-col items-center cursor-pointer group">
                <div className={`w-[90px] h-[90px] md:w-[120px] md:h-[120px] ${cat.color} rounded-full flex items-center justify-center mb-3 group-hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all overflow-hidden border-2 border-transparent group-hover:border-[#333]`}>
                  <img src={`https://picsum.photos/400/400?random=${i + 60}`} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 mix-blend-multiply opacity-80" />
                </div>
                <span className="font-bold text-[14px] text-[#333] text-center group-hover:underline">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bullseye Circle Banner */}
        <div className="bg-[#cc0000] rounded-[16px] p-6 md:p-10 mb-14 text-white flex flex-col md:flex-row items-center justify-between shadow-[0_4px_12px_rgba(204,0,0,0.2)] overflow-hidden relative">
          {/* Background circles */}
          <div className="absolute right-[-100px] top-[-100px] w-[300px] h-[300px] border-[40px] border-white/10 rounded-full"></div>

          <div className="flex flex-col relative z-10 w-full md:w-2/3">
            <h3 className="text-[36px] md:text-[48px] font-black tracking-tighter mb-2 leading-none flex items-center">
              Bullseye Circle <span className="text-[16px] relative top-[-15px] ml-1">™</span>
            </h3>
            <p className="text-[18px] md:text-[22px] font-medium mb-6">A more rewarding way to shop. Earn 1% on every trip & get hundreds of deals.</p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-white text-[#cc0000] px-8 py-3.5 rounded-full font-bold text-[15px] hover:bg-[#f4f4f4] transition-colors shadow-md active:scale-95">
                Join for free
              </button>
              <button className="bg-transparent border-2 border-white text-white px-8 py-3.5 rounded-full font-bold text-[15px] hover:bg-white/10 transition-colors">
                Learn more
              </button>
            </div>
          </div>

          <div className="relative z-10 hidden md:flex items-center justify-center shrink-0 w-1/3">
            <div className="w-[160px] h-[160px] bg-white rounded-full flex items-center justify-center text-[#cc0000] font-black text-[120px] shadow-xl mt-[-20px]">
              ◎
            </div>
          </div>
        </div>

        {/* Top Deals List (Bullseye Style Carousel/Grid) */}
        <div className="mb-14">
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-[22px] font-bold tracking-tight">Top Deals</h2>
            <a href="#" className="text-[14px] font-bold text-[#333] hover:underline flex items-center gap-1">
              See all <ChevronDown className="w-4 h-4 -rotate-90" />
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 lg:gap-4">
            {topDeals.map((product, i) => (
              <div key={i} data-product-id={product.id} className="group cursor-pointer flex flex-col h-full rounded-[8px] hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-shadow p-2 -m-2">
                <div className="relative aspect-square mb-3 bg-[#f4f4f4] rounded-[8px] overflow-hidden">
                  <img src={product.imageUrl} alt={product.title} className="w-full h-full object-contain mix-blend-multiply p-4 group-hover:scale-105 transition-transform duration-300" />

                  {/* Deal specific badge */}
                  <div className="absolute top-2 left-2 bg-[#cc0000] text-white text-[12px] font-bold px-2 py-0.5 rounded-[4px]">
                    Deal
                  </div>

                  <button className="absolute bottom-2 right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.15)] opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50 active:scale-95">
                    <Plus className="w-6 h-6 text-[#333]" />
                  </button>
                </div>

                <div className="flex-1 flex flex-col">
                  {/* Price Block */}
                  <div className="mb-1">
                    <span className="text-[22px] font-bold text-[#cc0000] leading-tight mr-2">${product.price}</span>
                    {product.originalPrice && <span className="text-[13px] text-gray-500 line-through">Reg ${product.originalPrice}</span>}
                  </div>
                  {product.originalPrice && (
                    <div className="text-[12px] font-bold text-[#cc0000] mb-2 uppercase tracking-wide">
                      Save ${(parseFloat(product.originalPrice || '0') - parseFloat(product.price)).toFixed(2)}
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="text-[14px] text-[#333] font-normal line-clamp-2 leading-snug hover:underline mb-2">{product.title}</h3>

                  {/* Reviews */}
                  <div className="flex items-center space-x-1 mb-3 mt-auto">
                    <div className="flex text-[#333]">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <Star className="w-3.5 h-3.5 text-gray-300" />
                    </div>
                    <span className="text-[12px] text-gray-600">({product.reviews})</span>
                  </div>

                  {/* Delivery Info */}
                  <div className="text-[12px] text-gray-600 flex flex-col gap-1 mb-3">
                    <span className="flex items-center gap-1.5"><Truck className="w-3.5 h-3.5" /> Shipping</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Grid: Fulfillment Methods */}
        <div className="mb-14">
          <h2 className="text-[22px] font-bold mb-6 tracking-tight">How do you want your items?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="bg-[#f4f4f4] p-8 md:p-10 rounded-[16px] flex flex-col items-center text-center cursor-pointer hover:bg-[#e9e9e9] transition-colors group">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                <Store className="w-10 h-10 text-[#222]" />
              </div>
              <h3 className="text-[20px] font-bold text-[#333] mb-2">Order Pickup</h3>
              <p className="text-[15px] text-[#666]">Ready within 2 hours. Always free.</p>
            </div>

            <div className="bg-[#f4f4f4] p-8 md:p-10 rounded-[16px] flex flex-col items-center text-center cursor-pointer hover:bg-[#e9e9e9] transition-colors group">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform relative">
                <img src="https://picsum.photos/200/60?random=902" className="w-[60%] h-[60%] object-contain mix-blend-multiply opacity-0" />
                <div className="absolute inset-0 flex items-center justify-center text-[32px] font-black text-[#cc0000] italic pr-2">D</div>
              </div>
              <h3 className="text-[20px] font-bold text-[#333] mb-2">Drive Up</h3>
              <p className="text-[15px] text-[#666]">We’ll bring it right out to your car.</p>
            </div>

            <div className="bg-[#f4f4f4] p-8 md:p-10 rounded-[16px] flex flex-col items-center text-center cursor-pointer hover:bg-[#e9e9e9] transition-colors group">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                <Truck className="w-10 h-10 text-[#222]" />
              </div>
              <h3 className="text-[20px] font-bold text-[#333] mb-2">Same Day Delivery</h3>
              <p className="text-[15px] text-[#666]">Delivered to your door in as little as 1 hour.</p>
            </div>

          </div>
        </div>

      </main>

      {/* ─── FOOTER ─── */}
      <footer className="bg-[#f4f4f4] pt-14 pb-10 mt-6 border-t border-gray-200">
        <div className="w-full max-w-[1440px] mx-auto px-4 lg:px-8">

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="font-bold text-[18px] mb-5 text-[#333]">About Us</h4>
              <div className="flex flex-col space-y-3 text-[14px] text-[#333] font-medium">
                <a href="#" className="hover:underline hover:text-[#cc0000]">About Bullseye</a>
                <a href="#" className="hover:underline hover:text-[#cc0000]">Careers</a>
                <a href="#" className="hover:underline hover:text-[#cc0000]">News & Blog</a>
                <a href="#" className="hover:underline hover:text-[#cc0000]">Bullseye Brands</a>
                <a href="#" className="hover:underline hover:text-[#cc0000]">Bullseye Shop</a>
                <a href="#" className="hover:underline hover:text-[#cc0000]">Bullseye's Coronavirus Response</a>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-[18px] mb-5 text-[#333]">Help</h4>
              <div className="flex flex-col space-y-3 text-[14px] text-[#333] font-medium">
                <a href="#" className="hover:underline hover:text-[#cc0000]">Bullseye Help</a>
                <a href="#" className="hover:underline hover:text-[#cc0000]">Returns</a>
                <a href="#" className="hover:underline hover:text-[#cc0000]">Track Orders</a>
                <a href="#" className="hover:underline hover:text-[#cc0000]">Recalls</a>
                <a href="#" className="hover:underline hover:text-[#cc0000]">Contact Us</a>
                <a href="#" className="hover:underline hover:text-[#cc0000]">Feedback</a>
                <a href="#" className="hover:underline hover:text-[#cc0000]">Accessibility</a>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-[18px] mb-5 text-[#333]">Stores</h4>
              <div className="flex flex-col space-y-3 text-[14px] text-[#333] font-medium">
                <a href="#" className="hover:underline hover:text-[#cc0000]">Find a Store</a>
                <a href="#" className="hover:underline hover:text-[#cc0000]">Clinic</a>
                <a href="#" className="hover:underline hover:text-[#cc0000]">Pharmacy</a>
                <a href="#" className="hover:underline hover:text-[#cc0000]">Optical</a>
                <a href="#" className="hover:underline hover:text-[#cc0000]">More In-Store Services</a>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-[18px] mb-5 text-[#333]">Services</h4>
              <div className="flex flex-col space-y-3 text-[14px] text-[#333] font-medium">
                <a href="#" className="hover:underline hover:text-[#cc0000]">Bullseye Circle™</a>
                <a href="#" className="hover:underline hover:text-[#cc0000]">RedCard</a>
                <a href="#" className="hover:underline hover:text-[#cc0000]">Bullseye App</a>
                <a href="#" className="hover:underline hover:text-[#cc0000]">Registry</a>
                <a href="#" className="hover:underline hover:text-[#cc0000]">Same Day Delivery</a>
                <a href="#" className="hover:underline hover:text-[#cc0000]">Order Pickup</a>
                <a href="#" className="hover:underline hover:text-[#cc0000]">Drive Up</a>
              </div>
            </div>
          </div>

          <div className="flex space-x-4 mb-8">
            <div className="w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors shadow-sm"><span className="font-bold text-[#333]">f</span></div>
            <div className="w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors shadow-sm"><span className="font-bold text-[#333]">tw</span></div>
            <div className="w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors shadow-sm"><span className="font-bold text-[#333]">ig</span></div>
            <div className="w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors shadow-sm"><span className="font-bold text-[#333]">pt</span></div>
            <div className="w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors shadow-sm"><span className="font-bold text-[#333]">yt</span></div>
          </div>

          <div className="border-t border-gray-300 pt-8 flex flex-wrap gap-x-6 gap-y-3 text-[13px] text-[#333] font-normal">
            <a href="#" className="hover:underline">Terms</a>
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">CA Privacy Rights</a>
            <a href="#" className="hover:underline">Do Not Sell or Share My Personal Information</a>
            <a href="#" className="hover:underline">Interest Based Ads</a>
            <a href="#" className="hover:underline">Health Privacy Policy</a>
            <span className="text-gray-500 ml-auto">© 2026 {data.name} Brands, Inc.</span>
          </div>

        </div>
      </footer>
    </div>
  );
}
