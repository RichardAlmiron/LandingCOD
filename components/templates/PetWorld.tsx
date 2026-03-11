import React from 'react';
import Image from 'next/image';
import { StoreData } from '@/lib/types';
import { Search, ShoppingCart, Heart, User, Menu, MapPin, Bone, ArrowRight, Shield, Syringe, Scissors, Smartphone, Facebook, Twitter, Instagram, Youtube, HelpCircle, Phone, Clock, CreditCard, ChevronDown } from 'lucide-react';

export default function PetWorldTemplate({ data }: { data: StoreData }) {
  const topCategories = ['Dog', 'Cat', 'Fish', 'Small Pet', 'Reptile', 'Bird', 'Pharmacy', 'Services', 'Deals'];
  const topProducts = data.products.slice(0, 5);

  return (
    <div className="min-h-full bg-white font-sans text-[#333333] selection:bg-[#001952] selection:text-white pb-10 overflow-x-hidden">

      {/* ─── TOP PROMO BANNER ─── */}
      <div className="bg-[#001952] text-white text-[12px] md:text-[13px] py-2 md:py-2.5 px-4 flex justify-between items-center font-bold tracking-wide">
        <div className="hidden lg:flex space-x-6">
          <a href="#" className="hover:underline opacity-90 transition-opacity">Gift Cards</a>
          <a href="#" className="hover:underline opacity-90 transition-opacity">Track Order</a>
        </div>
        <div className="w-full lg:w-auto text-center">
          <span className="text-[#47b5d1]">Same-Day Delivery</span> on orders $35+ or <span className="text-[#47b5d1]">Free In-Store Pickup <a href="#" className="underline ml-1">Details</a></span>
        </div>
        <div className="hidden lg:flex space-x-6">
          <a href="#" className="hover:underline opacity-90 transition-opacity flex items-center">
            <HelpCircle className="w-4 h-4 mr-1.5" /> Help
          </a>
        </div>
      </div>

      {/* ─── MAIN HEADER ─── */}
      <header className="bg-white sticky top-0 z-50 shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-all">
        <div className="w-full max-w-[1440px] mx-auto px-4 lg:px-8 py-4 flex items-center justify-between gap-4 lg:gap-8 bg-white relative z-20">

          <div className="flex items-center gap-4 shrink-0">
            <button className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors text-[#001952]">
              <Menu className="w-[28px] h-[28px]" strokeWidth={2.5} />
            </button>
            <div className="cursor-pointer flex items-center">
              <span className="font-black text-[32px] md:text-[44px] tracking-tighter text-[#001952] lowercase leading-none select-none">
                {data.logoText !== 'PetWorld' ? data.logoText : 'petworld'}
              </span>
            </div>
          </div>

          {/* Main Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-[700px] relative group border-[3px] border-[#001952] rounded-[84px] overflow-hidden bg-white h-[48px] shadow-sm">
            <input
              type="text"
              placeholder="What can we help you find?"
              className="w-full bg-transparent pl-5 pr-12 text-[15px] outline-none text-[#333] font-medium"
            />
            <button className="absolute right-0 top-0 bottom-0 bg-[#001952] text-white px-5 flex items-center justify-center hover:bg-[#002780] transition-colors">
              <Search className="w-5 h-5" strokeWidth={3} />
            </button>
          </div>

          <div className="flex items-center space-x-2 md:space-x-6 text-[#001952] shrink-0">
            <button className="hidden sm:flex flex-col items-center cursor-pointer hover:text-[#e31837] transition-colors p-1 group">
              <MapPin className="w-6 h-6 mb-1 group-hover:-translate-y-0.5 transition-transform" strokeWidth={2} />
              <span className="text-[12px] font-bold tracking-tight">Set Store</span>
            </button>
            <button className="hidden md:flex flex-col items-center cursor-pointer hover:text-[#e31837] transition-colors p-1 group">
              <User className="w-6 h-6 mb-1 group-hover:-translate-y-0.5 transition-transform" strokeWidth={2} />
              <span className="text-[12px] font-bold tracking-tight flex items-center">Sign In <ChevronDown className="w-3 h-3 ml-0.5" /></span>
            </button>
            <button className="flex flex-col items-center cursor-pointer hover:text-[#e31837] transition-colors p-1 group relative">
              <div className="relative">
                <ShoppingCart className="w-[26px] h-[26px] mb-1 group-hover:-translate-y-0.5 transition-transform" strokeWidth={2} />
                <span className="absolute -top-1.5 -right-2 bg-[#e31837] text-white text-[11px] font-black w-[20px] h-[20px] flex items-center justify-center rounded-full leading-none border-2 border-white shadow-sm">0</span>
              </div>
              <span className="text-[12px] font-bold tracking-tight hidden sm:block">Cart</span>
            </button>
          </div>
        </div>

        {/* Desktop Categorical Navigation */}
        <nav className="hidden lg:flex w-full max-w-[1440px] mx-auto px-8 relative z-10 border-t border-gray-100 items-center space-x-8 text-[15px] font-bold text-[#001952]">
          <div className="flex space-x-8 h-[50px]">
            <a href="#" className="flex items-center hover:text-[#e31837] border-b-[4px] border-transparent hover:border-[#e31837] h-full transition-colors whitespace-nowrap">
              <Menu className="w-[18px] h-[18px] mr-2" strokeWidth={2.5} /> Shop by Pet
            </a>
            {topCategories.map((cat, i) => (
              <a key={i} href="#" className={`flex items-center border-b-[4px] border-transparent h-full transition-colors whitespace-nowrap ${cat === 'Deals' || cat === 'Services' ? 'text-[#e31837] hover:border-[#e31837]' : 'hover:text-[#e31837] hover:border-[#e31837]'}`}>
                {cat}
              </a>
            ))}
          </div>
        </nav>
      </header>

      {/* Mobile Search - Rendered only on small screens */}
      <div className="lg:hidden px-4 py-3 bg-white border-b border-gray-200 shadow-sm relative z-30">
        <div className="flex items-center w-full border-[2px] border-[#001952] rounded-full overflow-hidden bg-white h-[44px]">
          <input type="text" placeholder="What can we help you find?" className="bg-transparent outline-none pl-4 pr-2 text-[15px] w-full font-medium" />
          <button className="bg-[#001952] text-white px-4 h-full flex items-center justify-center">
            <Search className="w-[18px] h-[18px]" strokeWidth={2.5} />
          </button>
        </div>
      </div>

      <main className="w-full max-w-[1440px] mx-auto px-4 lg:px-8 py-6 md:py-10">

        {/* ─── HERO BANNER ─── */}
        <div className="relative bg-[#001952] rounded-[12px] md:rounded-[24px] overflow-hidden mb-12 shadow-md flex flex-col md:flex-row group cursor-pointer">
          <div className="w-full md:w-[45%] lg:w-[40%] p-8 md:p-12 lg:p-16 flex flex-col justify-center text-white z-10">
            <div className="bg-[#e31837] text-white font-black uppercase text-[12px] md:text-[14px] px-3 py-1.5 rounded-sm mb-6 w-fit shadow-md">
              Seasonal Event
            </div>
            <h1 className="text-[36px] md:text-[46px] lg:text-[54px] font-black mb-4 leading-[1.05] tracking-tight">{data.name}</h1>
            <p className="text-[16px] md:text-[18px] font-medium text-blue-100 mb-8 max-w-md leading-relaxed">
              {data.description || "Everything your pet needs, from premium nutrition to supplies and services."}
            </p>
            <button className="bg-white text-[#001952] px-8 py-3.5 md:py-4 rounded-full font-black text-[15px] hover:bg-[#f4f4f4] hover:scale-[1.02] transition-all shadow-lg self-start active:scale-95 text-center flex items-center">
              Shop Now <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
          <div className="w-full md:w-[55%] lg:w-[60%] relative min-h-[300px] md:min-h-[450px]">
            <Image
              src={data.bannerImage}
              alt="Banner"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-[2000ms] ease-out brightness-[0.85]"
              referrerPolicy="no-referrer"
              priority
            />
          </div>
        </div>

        {/* ─── SHOP BY PET (Circles) ─── */}
        <div className="mb-16 md:mb-20">
          <h2 className="text-[24px] md:text-[32px] font-black text-[#001952] mb-8 md:mb-10 text-center tracking-tight">Shop by Pet</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-8">
            {[
              { name: 'Dog', img: 'https://picsum.photos/300/300?random=520' },
              { name: 'Cat', img: 'https://picsum.photos/300/300?random=521' },
              { name: 'Fish', img: 'https://picsum.photos/300/300?random=522' },
              { name: 'Small Pet', img: 'https://picsum.photos/300/300?random=523' },
              { name: 'Reptile', img: 'https://picsum.photos/300/300?random=524' },
              { name: 'Bird', img: 'https://picsum.photos/300/300?random=525' },
            ].map((pet, i) => (
              <div key={i} className="group cursor-pointer flex flex-col items-center">
                <div className="relative w-[100px] h-[100px] md:w-[150px] md:h-[150px] mb-4 overflow-hidden rounded-full bg-white shadow-sm group-hover:shadow-[0_8px_25px_rgba(0,25,82,0.15)] border-[4px] border-[#eaf3f9] group-hover:border-[#001952] transition-all">
                  <Image src={pet.img} alt={pet.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <h3 className="text-[16px] md:text-[18px] font-black text-[#001952] group-hover:text-[#e31837] group-hover:underline transition-colors text-center">{pet.name}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* ─── TOP PICKS CAROUSEL ─── */}
        {topProducts.length > 0 && (
          <div className="mb-16 md:mb-20">
            <div className="flex items-center justify-between mb-8 pb-3 border-b-2 border-gray-100">
              <h2 className="text-[24px] md:text-[32px] font-black text-[#001952] tracking-tight flex items-center">
                <Bone className="w-[32px] h-[32px] mr-3 text-[#e31837] fill-[#e31837] hidden sm:block" /> Top Picks for You
              </h2>
              <a href="#" className="font-bold text-[15px] text-[#001952] hover:text-[#e31837] hover:underline flex items-center">
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
              {topProducts.map((product, idx) => {
                const isSale = idx % 2 === 0;
                return (
                  <div key={product.id || idx} data-product-id={product.id} className="group cursor-pointer flex flex-col bg-white border border-gray-200 rounded-[12px] overflow-hidden hover:border-[#001952] hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] transition-all relative pb-4">

                    {/* Image Area */}
                    <div className="relative aspect-square overflow-hidden bg-white p-4">
                      {isSale && <div className="absolute top-3 left-3 bg-[#e31837] text-white text-[11px] font-black px-2.5 py-1 rounded-[4px] shadow-sm z-10 uppercase">Sale</div>}
                      <Image
                        src={product.imageUrl}
                        alt={product.title}
                        fill
                        className="object-contain p-4 group-hover:scale-[1.05] transition-transform duration-500 mix-blend-multiply"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Content */}
                    <div className="px-4 flex flex-col flex-1">
                      <div className="text-[11px] font-black uppercase tracking-widest text-gray-500 mb-1.5">{product.category || 'Pet Supplies'}</div>
                      <h3 className="text-[14px] md:text-[15px] font-bold text-[#001952] line-clamp-3 md:line-clamp-2 leading-relaxed mb-3 group-hover:underline">
                        {product.title}
                      </h3>

                      {/* Price Section */}
                      <div className="mt-auto pt-2">
                        <div className="flex items-baseline flex-wrap gap-2 mb-3">
                          <span className={`font-black text-[22px] md:text-[24px] ${isSale ? 'text-[#e31837]' : 'text-[#001952]'}`}>
                            ${product.price}
                          </span>
                          {product.originalPrice && <span className="text-[13px] text-gray-400 line-through font-bold">${product.originalPrice}</span>}
                        </div>
                        <button className="w-full bg-white border-2 border-[#001952] text-[#001952] py-2.5 rounded-full font-black text-[14px] group-hover:bg-[#001952] group-hover:text-white transition-all active:scale-95 shadow-sm">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* ─── VITAL CARE SECTION ─── */}
        <div className="mb-16 md:mb-24 bg-gradient-to-r from-[#001952] to-[#002e99] text-white rounded-[16px] md:rounded-[24px] overflow-hidden shadow-2xl flex flex-col md:flex-row relative">
          <div className="absolute inset-x-0 bottom-0 h-1/2 opacity-10 pointer-events-none" />

          <div className="p-8 md:p-14 lg:p-20 w-full md:w-[60%] flex flex-col justify-center relative z-10">
            <div className="flex items-center mb-6">
              <Shield className="w-10 h-10 md:w-12 md:h-12 text-[#47b5d1] mr-4" strokeWidth={2.5} />
              <h2 className="text-[36px] md:text-[48px] font-black text-white italic tracking-tighter">vital care</h2>
            </div>
            <h3 className="text-[24px] md:text-[32px] font-black mb-6 text-blue-100 leading-tight">The premier health & wellness plan for your pet.</h3>
            <p className="text-[16px] md:text-[18px] font-medium text-blue-200 mb-8 max-w-[500px] leading-relaxed">
              Unlock unlimited routine vet exams, 20% off grooming, $15 Vital Care Rewards every month, and more. A plan tailored just for them.
            </p>
            <button className="bg-[#47b5d1] text-[#001952] px-8 py-4 rounded-full font-black text-[15px] md:text-[16px] hover:bg-white transition-all shadow-lg w-fit active:scale-95">
              Learn More & Join
            </button>
          </div>
          <div className="w-full md:w-[40%] relative min-h-[300px] hidden md:block border-l-4 border-[#47b5d1]">
            <Image src="https://picsum.photos/800/800?random=526" alt="Vital Care" fill className="object-cover" />
          </div>
        </div>

        {/* ─── PET SERVICES GRID ─── */}
        <div className="mb-16 md:mb-24">
          <div className="mb-10 lg:mb-12">
            <h2 className="text-[28px] md:text-[36px] font-black text-[#001952] mb-3">Pet Services</h2>
            <p className="text-[16px] md:text-[18px] font-bold text-gray-600">Expert care. All in one place.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 border-t border-gray-200 pt-8">
            <div className="bg-[#f0f4f8] rounded-[16px] p-8 md:p-10 text-center hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition-all duration-300 border border-transparent hover:border-gray-200 group cursor-pointer">
              <div className="w-[80px] h-[80px] bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-gray-100 group-hover:scale-110 transition-transform">
                <Scissors className="w-10 h-10 text-[#001952]" strokeWidth={2} />
              </div>
              <h3 className="text-[22px] md:text-[24px] font-black text-[#001952] mb-3">Grooming</h3>
              <p className="text-[15px] text-gray-700 font-medium mb-8 leading-relaxed px-2">Full-service grooming, bathing, and haircuts by certified professional stylists.</p>
              <span className="text-[#001952] font-black text-[15px] border-b-[3px] border-transparent group-hover:border-[#e31837] pb-1 transition-colors flex items-center justify-center w-fit mx-auto group-hover:text-[#e31837]">
                Book Now <ArrowRight className="w-4 h-4 ml-1.5" />
              </span>
            </div>

            <div className="bg-[#f0f4f8] rounded-[16px] p-8 md:p-10 text-center hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition-all duration-300 border border-transparent hover:border-gray-200 group cursor-pointer">
              <div className="w-[80px] h-[80px] bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-gray-100 group-hover:scale-110 transition-transform">
                <Syringe className="w-10 h-10 text-[#001952]" strokeWidth={2} />
              </div>
              <h3 className="text-[22px] md:text-[24px] font-black text-[#001952] mb-3">Veterinary Care</h3>
              <p className="text-[15px] text-gray-700 font-medium mb-8 leading-relaxed px-2">Routine care, vaccinations, microchipping and wellness exams at Vetco clinics.</p>
              <span className="text-[#001952] font-black text-[15px] border-b-[3px] border-transparent group-hover:border-[#e31837] pb-1 transition-colors flex items-center justify-center w-fit mx-auto group-hover:text-[#e31837]">
                Find a Clinic <ArrowRight className="w-4 h-4 ml-1.5" />
              </span>
            </div>

            <div className="bg-[#f0f4f8] rounded-[16px] p-8 md:p-10 text-center hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition-all duration-300 border border-transparent hover:border-gray-200 group cursor-pointer">
              <div className="w-[80px] h-[80px] bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-gray-100 group-hover:scale-110 transition-transform">
                <Bone className="w-10 h-10 text-[#001952]" strokeWidth={2} />
              </div>
              <h3 className="text-[22px] md:text-[24px] font-black text-[#001952] mb-3">Dog Training</h3>
              <p className="text-[15px] text-gray-700 font-medium mb-8 leading-relaxed px-2">Positive reinforcement training classes for puppies and adult dogs to build strong bonds.</p>
              <span className="text-[#001952] font-black text-[15px] border-b-[3px] border-transparent group-hover:border-[#e31837] pb-1 transition-colors flex items-center justify-center w-fit mx-auto group-hover:text-[#e31837]">
                Explore Classes <ArrowRight className="w-4 h-4 ml-1.5" />
              </span>
            </div>
          </div>
        </div>

        {/* ─── DELIVERY OPTIONS ─── */}
        <div className="mb-10 bg-white border border-gray-200 rounded-[16px] p-6 lg:p-0 flex flex-col lg:flex-row shadow-[0_4px_12px_rgba(0,0,0,0.03)] overflow-hidden">
          <div className="flex-1 lg:p-10 flex flex-col sm:flex-row items-center gap-6 border-b lg:border-b-0 lg:border-r border-gray-200 pb-8 lg:pb-0 mb-8 lg:mb-0 text-center sm:text-left">
            <div className="w-[64px] h-[64px] bg-[#f0f4f8] rounded-full flex items-center justify-center shrink-0">
              <Clock className="w-[32px] h-[32px] text-[#001952]" />
            </div>
            <div>
              <h4 className="text-[18px] font-black text-[#001952] mb-2">Same-Day Delivery</h4>
              <p className="text-gray-600 font-medium text-[14px]">Free delivery on eligible orders $35+ if ordered before 2 PM local time.</p>
            </div>
          </div>
          <div className="flex-1 lg:p-10 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <div className="w-[64px] h-[64px] bg-[#f0f4f8] rounded-full flex items-center justify-center shrink-0">
              <MapPin className="w-[32px] h-[32px] text-[#001952]" />
            </div>
            <div>
              <h4 className="text-[18px] font-black text-[#001952] mb-2">Free In-Store Pickup</h4>
              <p className="text-gray-600 font-medium text-[14px]">Order online and we'll have it ready for you in 2 hours or less.</p>
            </div>
          </div>
        </div>

      </main>

      {/* ─── FOOTER ─── */}
      <footer className="bg-[#001952] text-white pt-16 md:pt-20">
        <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-8">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-12 mb-16 font-bold">

            <div className="flex flex-col space-y-4">
              <h4 className="text-white text-[18px] font-black mb-2 tracking-tight">Customer Service</h4>
              <a href="#" className="text-[14px] text-white opacity-80 hover:opacity-100 hover:underline hover:text-[#e31837] transition-all w-fit">Help Center</a>
              <a href="#" className="text-[14px] text-white opacity-80 hover:opacity-100 hover:underline hover:text-[#e31837] transition-all w-fit">Track Order</a>
              <a href="#" className="text-[14px] text-white opacity-80 hover:opacity-100 hover:underline hover:text-[#e31837] transition-all w-fit">Returns Policy</a>
              <a href="#" className="text-[14px] text-white opacity-80 hover:opacity-100 hover:underline hover:text-[#e31837] transition-all w-fit">Shipping Information</a>
              <a href="#" className="text-[14px] text-white opacity-80 hover:opacity-100 hover:underline hover:text-[#e31837] transition-all w-fit">Product Recalls</a>
            </div>

            <div className="flex flex-col space-y-4">
              <h4 className="text-white text-[18px] font-black mb-2 tracking-tight">Services</h4>
              <a href="#" className="text-[14px] text-white opacity-80 hover:opacity-100 hover:underline hover:text-[#e31837] transition-all w-fit">Pet Grooming</a>
              <a href="#" className="text-[14px] text-white opacity-80 hover:opacity-100 hover:underline hover:text-[#e31837] transition-all w-fit">Veterinary Services</a>
              <a href="#" className="text-[14px] text-white opacity-80 hover:opacity-100 hover:underline hover:text-[#e31837] transition-all w-fit">Dog Training</a>
              <a href="#" className="text-[14px] text-white opacity-80 hover:opacity-100 hover:underline hover:text-[#e31837] transition-all w-fit">Pet Insurance</a>
              <a href="#" className="text-[14px] text-white opacity-80 hover:opacity-100 hover:underline hover:text-[#e31837] transition-all w-fit">Vital Care</a>
            </div>

            <div className="flex flex-col space-y-4">
              <h4 className="text-white text-[18px] font-black mb-2 tracking-tight">About PetWorld</h4>
              <a href="#" className="text-[14px] text-white opacity-80 hover:opacity-100 hover:underline hover:text-[#e31837] transition-all w-fit">Careers</a>
              <a href="#" className="text-[14px] text-white opacity-80 hover:opacity-100 hover:underline hover:text-[#e31837] transition-all w-fit">Corporate Responsibility</a>
              <a href="#" className="text-[14px] text-white opacity-80 hover:opacity-100 hover:underline hover:text-[#e31837] transition-all w-fit">PetWorld Love (Adoptions)</a>
              <a href="#" className="text-[14px] text-white opacity-80 hover:opacity-100 hover:underline hover:text-[#e31837] transition-all w-fit">Investor Relations</a>
              <a href="#" className="text-[14px] text-white opacity-80 hover:opacity-100 hover:underline hover:text-[#e31837] transition-all w-fit">Affiliate Program</a>
            </div>

            <div className="flex flex-col bg-white p-6 rounded-[8px] text-[#001952] border-t-[8px] border-[#e31837]">
              <h4 className="text-[18px] font-black mb-2 tracking-tight">Stay Connected</h4>
              <p className="text-[13px] font-medium mb-4">Sign up for exclusive offers and pet care tips.</p>
              <div className="flex flex-col space-y-3 mb-6">
                <input type="email" placeholder="Email Address" className="bg-[#f0f4f8] text-[#001952] px-4 py-3 rounded outline-none w-full font-bold border border-transparent focus:border-[#001952]" />
                <button className="bg-[#e31837] text-white px-6 py-3 rounded font-black hover:bg-[#c41530] transition-colors w-full text-[14px]">
                  Sign Up
                </button>
              </div>
              <p className="text-[14px] font-black mb-3 text-[#001952]">Follow Us</p>
              <div className="flex space-x-3">
                <a href="#" className="bg-[#f0f4f8] p-2.5 rounded-full hover:bg-[#001952] hover:text-white transition-colors text-[#001952]"><Facebook className="w-5 h-5 fill-current" /></a>
                <a href="#" className="bg-[#f0f4f8] p-2.5 rounded-full hover:bg-[#001952] hover:text-white transition-colors text-[#001952]"><Twitter className="w-5 h-5 fill-current" /></a>
                <a href="#" className="bg-[#f0f4f8] p-2.5 rounded-full hover:bg-[#001952] hover:text-white transition-colors text-[#001952]"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="bg-[#f0f4f8] p-2.5 rounded-full hover:bg-[#001952] hover:text-white transition-colors text-[#001952]"><Youtube className="w-5 h-5" /></a>
              </div>
            </div>

          </div>

          <div className="pt-8 pb-10 border-t border-white/20 flex flex-col md:flex-row items-center justify-between text-[12px] font-medium text-blue-200">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 mb-6 md:mb-0">
              <span className="font-black text-[28px] tracking-tighter text-white lowercase leading-none">petworld</span>
              <span>© 2026 PetWorld Animal Supplies, Inc. All rights reserved.</span>
            </div>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 font-bold">
              <a href="#" className="hover:text-white hover:underline transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white hover:underline transition-colors">Terms of Use</a>
              <a href="#" className="hover:text-white hover:underline transition-colors">Accessibility</a>
              <a href="#" className="hover:text-white hover:underline transition-colors">Do Not Sell My Info</a>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
