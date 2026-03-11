import React from 'react';
import Image from 'next/image';
import { StoreData } from '@/lib/types';
import { Search, ShoppingCart, User, Heart, Menu, MapPin, ChevronDown, HelpCircle, Truck, Phone, ArrowRight, ShieldCheck, Tag, Star } from 'lucide-react';

export default function HomeDecorTemplate({ data }: { data: StoreData }) {
  const categories = [
    { name: 'Furniture', img: 'https://picsum.photos/250/250?random=150' },
    { name: 'Outdoor', img: 'https://picsum.photos/250/250?random=151' },
    { name: 'Bedding & Bath', img: 'https://picsum.photos/250/250?random=152' },
    { name: 'Rugs', img: 'https://picsum.photos/250/250?random=153' },
    { name: 'Decor & Pillows', img: 'https://picsum.photos/250/250?random=154' },
    { name: 'Lighting', img: 'https://picsum.photos/250/250?random=155' },
    { name: 'Kitchen', img: 'https://picsum.photos/250/250?random=156' },
    { name: 'Baby & Kids', img: 'https://picsum.photos/250/250?random=157' },
  ];

  return (
    <div className="min-h-full bg-white font-sans text-[#222222] selection:bg-[#7f187f] selection:text-white overflow-x-hidden pb-10">

      {/* ─── TOP UTILITY BAR (HomeDecor) ─── */}
      <div className="bg-[#f2f2f2] text-gray-700 text-[12px] py-1.5 px-4 hidden md:flex justify-between items-center tracking-wide">
        <div className="flex space-x-6">
          <a href="#" className="hover:text-[#7f187f] transition-colors flex items-center">
            <HelpCircle className="w-3.5 h-3.5 mr-1.5" /> Customer Service
          </a>
          <a href="#" className="hover:text-[#7f187f] transition-colors flex items-center">
            <MapPin className="w-3.5 h-3.5 mr-1.5" /> Find a Store
          </a>
          <a href="#" className="hover:text-[#7f187f] transition-colors flex items-center">
            <Phone className="w-3.5 h-3.5 mr-1.5" /> Contact Us
          </a>
        </div>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-[#7f187f] transition-colors">HomeDecor Professional</a>
          <a href="#" className="hover:text-[#7f187f] transition-colors">Gift Cards</a>
          <a href="#" className="hover:text-[#7f187f] transition-colors">Credit Card</a>
        </div>
      </div>

      {/* ─── PROMO BANNER ─── */}
      <div className="bg-[#7f187f] text-white text-[13px] md:text-[14px] py-2.5 px-4 text-center font-bold tracking-wide shadow-sm relative z-50">
        <a href="#" className="hover:underline flex items-center justify-center cursor-pointer">
          FREE Shipping Over $35* <span className="font-normal ml-2 hidden sm:inline">| Everything home, for every budget.</span>
        </a>
      </div>

      {/* ─── HEADER ─── */}
      <header className="bg-white sticky top-0 z-40 border-b border-gray-200 shadow-sm transition-all duration-300">
        <div className="w-full max-w-[1440px] mx-auto px-4 lg:px-8 py-3 md:py-4 flex items-center justify-between gap-4 lg:gap-8 lg:h-[80px]">

          <div className="flex items-center space-x-4 shrink-0">
            <button className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Menu className="w-6 h-6 text-gray-700" strokeWidth={2} />
            </button>
            <div className="cursor-pointer">
              <span className="font-bold text-[32px] md:text-[40px] tracking-tight text-[#7f187f] italic leading-none select-none">
                {data.logoText !== 'HomeDecor' ? data.logoText : 'HomeDecor'}
              </span>
            </div>
          </div>

          {/* Main Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-[800px] relative group">
            <input
              type="text"
              placeholder="Find anything home..."
              className="w-full border-2 border-gray-300 rounded-full py-2.5 pl-6 pr-14 text-[15px] outline-none hover:border-[#7f187f] focus:border-[#7f187f] transition-all bg-[#f9f9f9] focus:bg-white shadow-inner"
            />
            <button className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-[#7f187f] text-white p-2 rounded-full hover:bg-[#681468] transition-colors shadow-sm">
              <Search className="w-5 h-5" strokeWidth={2.5} />
            </button>
          </div>

          <div className="flex items-center space-x-3 md:space-x-6 shrink-0 text-gray-700">
            <button className="hidden md:flex flex-col items-center cursor-pointer hover:text-[#7f187f] transition-colors p-1 group">
              <User className="w-6 h-6 mb-0.5 group-hover:fill-purple-50" strokeWidth={1.5} />
              <div className="flex items-center text-[12px] font-bold">
                Account <ChevronDown className="w-3.5 h-3.5 ml-0.5" />
              </div>
            </button>
            <button className="hidden sm:flex flex-col items-center cursor-pointer hover:text-[#7f187f] transition-colors p-1 group">
              <Heart className="w-6 h-6 mb-0.5 group-hover:fill-purple-50" strokeWidth={1.5} />
              <span className="text-[12px] font-bold">Lists</span>
            </button>
            <button className="flex flex-col items-center cursor-pointer hover:text-[#7f187f] transition-colors p-1 group relative">
              <div className="relative">
                <ShoppingCart className="w-[28px] h-[28px] mb-0.5 group-hover:fill-purple-50" strokeWidth={1.5} />
                <span className="absolute -top-1.5 -right-2 bg-[#7f187f] text-white text-[11px] font-bold w-5 h-5 flex items-center justify-center rounded-full leading-none border-2 border-white shadow-sm">0</span>
              </div>
              <span className="text-[12px] font-bold hidden sm:block">Cart</span>
            </button>
          </div>
        </div>

        {/* Navigation Categories */}
        <nav className="w-full max-w-[1440px] mx-auto px-4 lg:px-8 py-2 md:py-3 flex items-center justify-start lg:justify-center overflow-x-auto hide-scrollbar space-x-6 md:space-x-8 text-[14px] md:text-[15px] font-bold text-gray-700 border-t border-gray-100">
          <a href="#" className="hover:text-[#7f187f] hover:underline underline-offset-8 transition-colors whitespace-nowrap">Furniture</a>
          <a href="#" className="hover:text-[#7f187f] hover:underline underline-offset-8 transition-colors whitespace-nowrap">Outdoor</a>
          <a href="#" className="hover:text-[#7f187f] hover:underline underline-offset-8 transition-colors whitespace-nowrap">Bedding & Bath</a>
          <a href="#" className="hover:text-[#7f187f] hover:underline underline-offset-8 transition-colors whitespace-nowrap">Rugs</a>
          <a href="#" className="hover:text-[#7f187f] hover:underline underline-offset-8 transition-colors whitespace-nowrap">Decor & Pillows</a>
          <a href="#" className="hover:text-[#7f187f] hover:underline underline-offset-8 transition-colors whitespace-nowrap">Lighting</a>
          <a href="#" className="hover:text-[#7f187f] hover:underline underline-offset-8 transition-colors whitespace-nowrap">Kitchen</a>
          <a href="#" className="hover:text-[#7f187f] hover:underline underline-offset-8 transition-colors whitespace-nowrap hidden xl:block">Baby & Kids</a>
          <a href="#" className="text-[#d01345] hover:opacity-80 uppercase flex items-center whitespace-nowrap">
            <Tag className="w-4 h-4 mr-1.5" /> Sale
          </a>
        </nav>
      </header>

      {/* Mobile Search - Rendered only on small screens */}
      <div className="lg:hidden px-4 py-3 bg-white border-b border-gray-200 shadow-sm relative z-30">
        <div className="flex items-center w-full border-2 border-gray-300 rounded-full py-1.5 pl-4 pr-1 focus-within:border-[#7f187f] transition-all bg-[#f9f9f9] focus-within:bg-white">
          <input type="text" placeholder="Find anything home..." className="bg-transparent outline-none text-[15px] w-full" />
          <button className="bg-[#7f187f] text-white p-2 rounded-full hover:bg-[#681468] shrink-0">
            <Search className="w-4 h-4" strokeWidth={2.5} />
          </button>
        </div>
      </div>

      <main className="w-full max-w-[1440px] mx-auto px-4 lg:px-8 py-6 md:py-10">

        {/* ─── HERO CAROUSEL ─── */}
        <div className="bg-[#fbefe8] rounded-[8px] md:rounded-[16px] overflow-hidden flex flex-col md:flex-row mb-12 shadow-[0_2px_15px_rgba(0,0,0,0.06)] relative group">
          <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center w-full md:w-[45%] lg:w-[40%] z-10 order-2 md:order-1">
            <div className="inline-block bg-[#d01345] text-white uppercase text-[12px] font-black px-3 py-1 mb-4 rounded-sm tracking-wider w-fit">
              Big Outdoor Sale
            </div>
            <h1 className="text-[32px] md:text-[42px] lg:text-[48px] font-black text-[#222] mb-4 leading-[1.1] tracking-tight">{data.description || "The Great Outdoors, on Sale."}</h1>
            <p className="text-[16px] md:text-[18px] text-gray-700 mb-8 leading-relaxed">Save up to 50% on patio furniture, rugs, decor, and more to create your perfect oasis.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-[#7f187f] text-white px-8 py-3.5 rounded-full font-bold hover:bg-[#681468] transition-colors shadow-md text-[15px] active:scale-95 text-center">
                Shop the Sale
              </button>
              <button className="bg-white text-[#222] border-[2px] border-gray-300 px-8 py-3.5 rounded-full font-bold hover:border-[#7f187f] hover:text-[#7f187f] transition-colors text-[15px] active:scale-95 text-center hover:shadow-sm">
                Explore Trends
              </button>
            </div>
          </div>
          <div className="w-full md:w-[55%] lg:w-[60%] relative min-h-[300px] md:min-h-full order-1 md:order-2">
            <Image
              src={data.bannerImage}
              alt="Hero Banner"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-[2000ms] ease-out brightness-[0.95]"
              referrerPolicy="no-referrer"
              priority
            />
          </div>
        </div>

        {/* ─── SHOP BY DEPARTMENT (Circles) ─── */}
        <div className="mb-16">
          <h2 className="text-[24px] md:text-[28px] font-black mb-6 md:mb-8 text-[#222]">Shop by Department</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-y-8 gap-x-4">
            {categories.map((cat, i) => (
              <div key={i} className="flex flex-col items-center cursor-pointer group px-2 text-center">
                <div className="w-[125px] h-[125px] md:w-[140px] md:h-[140px] rounded-full overflow-hidden mb-4 border-4 border-transparent group-hover:border-[#7f187f] shadow-sm group-hover:shadow-[0_8px_25px_rgba(127,24,127,0.2)] transition-all relative">
                  <Image src={cat.img} alt={cat.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <h3 className="font-bold text-[15px] text-[#333] group-hover:text-[#7f187f] group-hover:underline underline-offset-4 decoration-2">{cat.name}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* ─── TOP PICKS (Personalized Grid) ─── */}
        <div className="mb-16 md:mb-20">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <h2 className="text-[24px] md:text-[28px] font-black text-[#222]">Top Picks for Your Home</h2>
            <div className="hidden sm:flex items-center gap-2">
              <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 hover:border-[#7f187f] hover:text-[#7f187f] transition-all bg-white shadow-sm cursor-pointer">
                <ArrowRight className="w-5 h-5 rotate-180" />
              </button>
              <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 hover:border-[#7f187f] hover:text-[#7f187f] transition-all bg-white shadow-sm cursor-pointer">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {data.products.map((product, idx) => (
              <div key={product.id || idx} data-product-id={product.id} className="group cursor-pointer flex flex-col relative h-full">
                {/* Image & Heart icon */}
                <div className="relative aspect-square mb-3 rounded-[8px] overflow-hidden bg-[#f9f9f9] group-hover:shadow-md transition-shadow">
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-500 mix-blend-multiply"
                    referrerPolicy="no-referrer"
                  />
                  <button className="absolute top-3 right-3 bg-white p-2 md:p-2.5 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.15)] opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 text-gray-500 hover:text-[#7f187f] z-10">
                    <Heart className="w-[18px] h-[18px]" strokeWidth={2} />
                  </button>
                  {/* HomeDecor Day! or Sale tag */}
                  {idx % 3 === 0 && (
                    <div className="absolute top-3 left-3 bg-[#d01345] text-white text-[11px] font-bold px-2 py-1 rounded-[2px] uppercase shadow-sm">
                      Sale
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col px-1">
                  <h3 className="text-[14px] md:text-[15px] text-[#222] line-clamp-2 md:line-clamp-3 mb-2 font-medium leading-relaxed group-hover:underline underline-offset-2">{product.title}</h3>

                  {/* Price Block */}
                  <div className="flex items-baseline space-x-2 my-1">
                    <span className="text-[20px] md:text-[22px] font-black text-[#222]">${product.price}</span>
                    {product.originalPrice && <span className="text-[13px] line-through text-gray-500 font-medium">${product.originalPrice}</span>}
                  </div>

                  {/* Reviews */}
                  <div className="flex items-center space-x-1.5 mb-3">
                    <div className="flex text-[#7f187f]">
                      {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-[12px] h-[12px] md:w-[14px] md:h-[14px] fill-current" />)}
                    </div>
                    <span className="text-[12px] md:text-[13px] text-gray-600 font-medium">({product.reviews || Math.floor(Math.random() * 2000) + 100})</span>
                  </div>

                  {/* Shipping Info */}
                  <div className="mt-auto pt-2 border-t border-gray-100">
                    <div className="text-[12px] md:text-[13px] font-bold text-green-700 flex items-center mb-1">
                      <Truck className="w-[14px] h-[14px] mr-1.5" /> Free Shipping
                    </div>
                    <div className="text-[12px] text-gray-500 font-medium">Arrives {['Tue, Oct 24', 'Tomorrow', 'In 2 Days'][idx % 3]}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── HOMEDECOR VALUE PROPS ─── */}
        <div className="bg-[#fcfcfc] border border-gray-200 rounded-[12px] p-8 md:p-12 mb-16 flex flex-col lg:flex-row gap-8 lg:gap-12 items-center lg:items-start justify-between">
          <div className="flex-1 text-center lg:text-left">
            <div className="bg-[#f0e6f0] w-16 h-16 rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-6 text-[#7f187f]">
              <Truck className="w-8 h-8" strokeWidth={1.5} />
            </div>
            <h3 className="text-[20px] font-bold mb-3 text-[#222]">Fast & Free Shipping</h3>
            <p className="text-[15px] text-gray-700 leading-relaxed">Free shipping on all orders over $35. Get your furniture delivered right to your door quickly and securely.</p>
          </div>
          <div className="w-full lg:w-[1px] h-[1px] lg:h-32 bg-gray-200" />
          <div className="flex-1 text-center lg:text-left">
            <div className="bg-[#f0e6f0] w-16 h-16 rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-6 text-[#7f187f]">
              <ShieldCheck className="w-8 h-8" strokeWidth={1.5} />
            </div>
            <h3 className="text-[20px] font-bold mb-3 text-[#222]">Love It or Return It</h3>
            <p className="text-[15px] text-gray-700 leading-relaxed">Not exactly what you wanted? Returns are easy. Send it back within 30 days for a refund.</p>
          </div>
          <div className="w-full lg:w-[1px] h-[1px] lg:h-32 bg-gray-200" />
          <div className="flex-1 text-center lg:text-left">
            <div className="bg-[#f0e6f0] w-16 h-16 rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-6 text-[#7f187f]">
              <HelpCircle className="w-8 h-8" strokeWidth={1.5} />
            </div>
            <h3 className="text-[20px] font-bold mb-3 text-[#222]">Expert Customer Care</h3>
            <p className="text-[15px] text-gray-700 leading-relaxed">Our friendly customer care team is here to help 7 days a week with any questions you might have.</p>
          </div>
        </div>

      </main>

      {/* ─── FOOTER ─── */}
      <footer className="bg-[#f9f9f9] border-t border-gray-200 pt-16 md:pt-20">
        <div className="w-full max-w-[1440px] mx-auto px-4 lg:px-8">

          {/* Email Signup Block */}
          <div className="border-b border-gray-300 pb-12 mb-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2">
              <h4 className="text-[24px] font-bold text-[#222] mb-2 tracking-tight">Be the first to know about our best deals!</h4>
              <p className="text-[15px] text-gray-600">Sign up for emails and get <strong>10% off</strong> your first order.</p>
            </div>
            <div className="flex w-full md:w-1/2 max-w-md">
              <input type="email" placeholder="Enter your email address" className="border-2 border-gray-300 rounded-l-[4px] px-4 py-3.5 focus:border-[#7f187f] outline-none flex-1 font-medium bg-white" />
              <button className="bg-[#7f187f] text-white px-8 py-3.5 rounded-r-[4px] font-bold hover:bg-[#681468] transition-colors shadow-sm">Submit</button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 mb-16">
            <div className="flex flex-col space-y-3.5">
              <h3 className="font-bold text-[18px] text-[#222] mb-3">About Us</h3>
              <a href="#" className="text-[14px] text-gray-600 hover:text-[#7f187f] hover:underline font-medium w-fit">About HomeDecor</a>
              <a href="#" className="text-[14px] text-gray-600 hover:text-[#7f187f] hover:underline font-medium w-fit">Careers</a>
              <a href="#" className="text-[14px] text-gray-600 hover:text-[#7f187f] hover:underline font-medium w-fit">Diversity & Inclusion</a>
              <a href="#" className="text-[14px] text-gray-600 hover:text-[#7f187f] hover:underline font-medium w-fit">Social Responsibility</a>
              <a href="#" className="text-[14px] text-gray-600 hover:text-[#7f187f] hover:underline font-medium w-fit">Investor Relations</a>
            </div>
            <div className="flex flex-col space-y-3.5">
              <h3 className="font-bold text-[18px] text-[#222] mb-3">Customer Service</h3>
              <a href="#" className="text-[14px] text-gray-600 hover:text-[#7f187f] hover:underline font-medium w-fit">My Account</a>
              <a href="#" className="text-[14px] text-gray-600 hover:text-[#7f187f] hover:underline font-medium w-fit">Track My Order</a>
              <a href="#" className="text-[14px] text-gray-600 hover:text-[#7f187f] hover:underline font-medium w-fit">Return Policy</a>
              <a href="#" className="text-[14px] text-gray-600 hover:text-[#7f187f] hover:underline font-medium w-fit">Help Center</a>
              <a href="#" className="text-[14px] text-gray-600 hover:text-[#7f187f] hover:underline font-medium w-fit">Contact Us</a>
            </div>
            <div className="flex flex-col space-y-3.5">
              <h3 className="font-bold text-[18px] text-[#222] mb-3">Partner With Us</h3>
              <a href="#" className="text-[14px] text-gray-600 hover:text-[#7f187f] hover:underline font-medium w-fit">HomeDecor Professional</a>
              <a href="#" className="text-[14px] text-gray-600 hover:text-[#7f187f] hover:underline font-medium w-fit">Sell on HomeDecor</a>
              <a href="#" className="text-[14px] text-gray-600 hover:text-[#7f187f] hover:underline font-medium w-fit">Affiliate Program</a>
              <a href="#" className="text-[14px] text-gray-600 hover:text-[#7f187f] hover:underline font-medium w-fit">Advertise With Us</a>
            </div>
            <div className="flex flex-col space-y-3.5">
              <h3 className="font-bold text-[18px] text-[#222] mb-3">Brands</h3>
              <a href="#" className="text-[14px] text-gray-600 hover:text-[#7f187f] hover:underline font-medium w-fit">HomeDecor</a>
              <a href="#" className="text-[14px] text-gray-600 hover:text-[#7f187f] hover:underline font-medium w-fit">Joss & Main</a>
              <a href="#" className="text-[14px] text-gray-600 hover:text-[#7f187f] hover:underline font-medium w-fit">AllModern</a>
              <a href="#" className="text-[14px] text-gray-600 hover:text-[#7f187f] hover:underline font-medium w-fit">Birch Lane</a>
              <a href="#" className="text-[14px] text-gray-600 hover:text-[#7f187f] hover:underline font-medium w-fit">Perigold</a>
            </div>
          </div>

          <div className="pt-8 pb-10 border-t border-gray-300 flex flex-col md:flex-row items-center justify-between text-[13px] text-gray-500 font-medium gap-6">
            <div className="flex items-center">
              <span className="mr-8">© 2026 {data.name} LLC</span>
            </div>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
              <a href="#" className="hover:text-[#7f187f] hover:underline transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#7f187f] hover:underline transition-colors">Terms of Use</a>
              <a href="#" className="hover:text-[#7f187f] hover:underline transition-colors">Accessibility</a>
              <a href="#" className="hover:text-[#7f187f] hover:underline transition-colors">Do Not Sell My Info</a>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
