import React from 'react';
import { StoreData } from '@/lib/types';
import { Search, ShoppingBag, Heart, User, MapPin, ArrowRight, Gift, Star, Smartphone, Facebook, Twitter, Instagram, Youtube, PlayCircle } from 'lucide-react';

export default function CharmBoutiqueTemplate({ data }: { data: StoreData }) {
  return (
    <div className="min-h-full bg-white font-sans text-[#222222]">
      <div className="bg-[#ffc0cb] text-[#222222] text-[12px] py-2 px-6 flex justify-center font-medium tracking-wide">
        Free standard shipping on orders over $75
      </div>
      <header className="bg-white sticky top-0 z-50 border-b border-gray-200 shadow-sm">
        <div className="w-full mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <nav className="hidden lg:flex space-x-6 font-sans text-[13px] font-medium text-[#222222]">
              <a href="#" className="hover:text-[#ffc0cb] transition-colors">Charms & Bracelets</a>
              <a href="#" className="hover:text-[#ffc0cb] transition-colors">Rings</a>
              <a href="#" className="hover:text-[#ffc0cb] transition-colors">Necklaces</a>
              <a href="#" className="hover:text-[#ffc0cb] transition-colors">Earrings</a>
              <a href="#" className="hover:text-[#ffc0cb] transition-colors">Gifts</a>
            </nav>
          </div>
          <div className="flex items-center justify-center cursor-pointer shrink-0 absolute left-1/2 -translate-x-1/2">
            <span className="font-serif text-3xl tracking-widest uppercase leading-none text-[#222222]">
              CharmBoutique
            </span>
          </div>
          <div className="flex items-center space-x-6 text-[#222222]">
            <Search className="w-5 h-5 cursor-pointer hover:text-[#ffc0cb] transition-colors" />
            <MapPin className="w-5 h-5 cursor-pointer hover:text-[#ffc0cb] transition-colors" />
            <User className="w-5 h-5 cursor-pointer hover:text-[#ffc0cb] transition-colors" />
            <Heart className="w-5 h-5 cursor-pointer hover:text-[#ffc0cb] transition-colors" />
            <div className="relative cursor-pointer hover:text-[#ffc0cb] transition-colors">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
        </div>
      </header>
      <main className="w-full mx-auto px-6 py-12">
        <div className="relative h-[550px] mb-20 group cursor-pointer overflow-hidden rounded-lg">
          <img src={data.bannerImage} alt="Banner" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms]" />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-6">
            <h1 className="text-5xl font-serif mb-4 leading-tight drop-shadow-lg">{data.name}</h1>
            <p className="text-lg font-sans font-light mb-8 drop-shadow-md">{data.description}</p>
            <button className="bg-white text-[#222222] px-10 py-3 font-sans font-medium uppercase text-[12px] tracking-wide hover:bg-[#ffc0cb] transition-all rounded-full">
              Shop the Collection
            </button>
          </div>
        </div>
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif text-[#222222] mb-2">New Arrivals</h2>
            <p className="text-sm font-sans text-gray-500">Discover the latest additions to our collection.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
            {data.products.map(product => (
              <div key={product.id} data-product-id={product.id} className="group cursor-pointer flex flex-col items-center text-center">
                <div className="relative aspect-square mb-4 overflow-hidden w-full bg-[#f9f9f9] rounded-lg">
                  <img src={product.imageUrl} alt={product.title} className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-[1500ms]" />
                </div>
                <div className="flex flex-col space-y-1">
                  <h3 className="text-sm font-sans font-medium text-[#222222]">{product.title}</h3>
                  <div className="text-[12px] font-sans text-gray-500">{product.category}</div>
                  <div className="pt-2">
                    <span className="font-sans font-medium text-[14px] text-[#222222]">${product.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shop by Category */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif text-[#222222] mb-2">Explore the Collections</h2>
            <p className="text-sm font-sans text-gray-500">Find the perfect piece for every moment.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Charms', img: 'https://picsum.photos/400/400?random=510' },
              { name: 'Bracelets', img: 'https://picsum.photos/400/400?random=511' },
              { name: 'Rings', img: 'https://picsum.photos/400/400?random=512' },
              { name: 'Necklaces', img: 'https://picsum.photos/400/400?random=513' },
            ].map((category, i) => (
              <div key={i} className="group cursor-pointer flex flex-col items-center">
                <div className="relative aspect-square w-full mb-4 overflow-hidden rounded-full bg-[#f9f9f9]">
                  <img src={category.img} alt={category.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors" />
                </div>
                <h3 className="text-lg font-serif text-[#222222] group-hover:text-[#ffc0cb] transition-colors">{category.name}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* The Art of Gifting */}
        <div className="mb-24 bg-[#fff0f2] rounded-2xl p-12 md:p-20 flex flex-col md:flex-row items-center justify-between">
          <div className="w-full md:w-1/2 mb-10 md:mb-0 md:pr-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white text-[#ffc0cb] rounded-full mb-6 shadow-sm">
              <Gift className="w-8 h-8" />
            </div>
            <h2 className="text-4xl font-serif text-[#222222] mb-6 leading-tight">The Art of Gifting</h2>
            <p className="text-lg font-sans text-gray-600 mb-8 leading-relaxed font-light">
              Make every occasion unforgettable with hand-finished jewelry. Discover our curated gift guide for birthdays, anniversaries, and just because.
            </p>
            <button className="bg-[#222222] text-white px-10 py-4 rounded-full font-sans font-medium uppercase text-[12px] tracking-wide hover:bg-[#ffc0cb] hover:text-[#222222] transition-all shadow-md">
              Shop Gifts
            </button>
          </div>
          <div className="w-full md:w-1/2 relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg group cursor-pointer">
            <img src="https://picsum.photos/800/600?random=514" alt="Gifting" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
            <div className="absolute inset-0 bg-black/10 flex items-center justify-center group-hover:bg-black/20 transition-colors">
              <PlayCircle className="w-20 h-20 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
            </div>
          </div>
        </div>

        {/* CharmBoutique Club */}
        <div className="mb-24 bg-white border border-[#ffc0cb] rounded-2xl p-12 md:p-20 flex flex-col md:flex-row items-center justify-between relative overflow-hidden shadow-sm">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[url('https://picsum.photos/600/800?random=515')] bg-cover bg-center opacity-10" />
          <div className="w-full md:w-2/3 relative z-10">
            <div className="flex items-center mb-6">
              <Star className="w-10 h-10 text-[#ffc0cb] mr-4 fill-[#ffc0cb]" />
              <h2 className="text-4xl font-serif text-[#222222]">My CharmBoutique</h2>
            </div>
            <h3 className="text-2xl font-sans font-medium text-[#222222] mb-4">Join the club for exclusive benefits</h3>
            <p className="text-base font-sans text-gray-600 mb-8 leading-relaxed max-w-xl font-light">
              Earn points on every purchase, enjoy early access to sales, and receive a special treat on your birthday. It's free to join!
            </p>
            <div className="flex space-x-4">
              <button className="bg-[#ffc0cb] text-[#222222] px-10 py-4 rounded-full font-sans font-medium uppercase text-[12px] tracking-wide hover:bg-[#222222] hover:text-white transition-all shadow-sm">
                Join Now
              </button>
              <button className="bg-transparent border border-[#222222] text-[#222222] px-10 py-4 rounded-full font-sans font-medium uppercase text-[12px] tracking-wide hover:bg-[#222222] hover:text-white transition-all">
                Sign In
              </button>
            </div>
          </div>
        </div>

        {/* App Promo */}
        <div className="mb-24 bg-[#222222] text-white rounded-2xl p-12 md:p-20 flex flex-col md:flex-row items-center justify-between shadow-xl">
          <div className="w-full md:w-1/2 mb-10 md:mb-0 md:pr-16">
            <div className="flex items-center mb-6">
              <Smartphone className="w-12 h-12 text-[#ffc0cb] mr-4" />
              <h2 className="text-4xl font-serif">The CharmBoutique App</h2>
            </div>
            <p className="text-lg font-sans text-gray-300 mb-8 leading-relaxed font-light">
              Try on rings virtually, manage your wish list, and shop seamlessly from anywhere. Download the app today.
            </p>
            <div className="flex space-x-4">
              <button className="bg-white text-[#222222] px-8 py-3 rounded-full font-sans font-medium uppercase text-[11px] tracking-wide hover:bg-[#ffc0cb] transition-all">
                App Store
              </button>
              <button className="bg-white text-[#222222] px-8 py-3 rounded-full font-sans font-medium uppercase text-[11px] tracking-wide hover:bg-[#ffc0cb] transition-all">
                Google Play
              </button>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
             <Smartphone className="w-64 h-64 text-white opacity-10" />
          </div>
        </div>

      </main>
      <footer className="bg-[#f9f9f9] pt-20 pb-12 border-t border-gray-200">
        <div className="w-full mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 text-[13px] font-sans font-medium text-gray-600">
            <div className="flex flex-col space-y-4">
              <h4 className="text-[#222222] font-bold mb-2 uppercase tracking-wider text-xs">Customer Service</h4>
              <a href="#" className="hover:text-[#ffc0cb] transition-colors">Contact Us</a>
              <a href="#" className="hover:text-[#ffc0cb] transition-colors">Track Order</a>
              <a href="#" className="hover:text-[#ffc0cb] transition-colors">Returns & Exchanges</a>
              <a href="#" className="hover:text-[#ffc0cb] transition-colors">Shipping Information</a>
              <a href="#" className="hover:text-[#ffc0cb] transition-colors">Product Care & Cleaning</a>
              <a href="#" className="hover:text-[#ffc0cb] transition-colors">Warranty</a>
              <a href="#" className="hover:text-[#ffc0cb] transition-colors">FAQ</a>
            </div>
            <div className="flex flex-col space-y-4">
              <h4 className="text-[#222222] font-bold mb-2 uppercase tracking-wider text-xs">Shop</h4>
              <a href="#" className="hover:text-[#ffc0cb] transition-colors">Store Locator</a>
              <a href="#" className="hover:text-[#ffc0cb] transition-colors">Gift Cards</a>
              <a href="#" className="hover:text-[#ffc0cb] transition-colors">Size Guide</a>
              <a href="#" className="hover:text-[#ffc0cb] transition-colors">CharmBoutique Club</a>
              <a href="#" className="hover:text-[#ffc0cb] transition-colors">Student Discount</a>
            </div>
            <div className="flex flex-col space-y-4">
              <h4 className="text-[#222222] font-bold mb-2 uppercase tracking-wider text-xs">About CharmBoutique</h4>
              <a href="#" className="hover:text-[#ffc0cb] transition-colors">Our Story</a>
              <a href="#" className="hover:text-[#ffc0cb] transition-colors">Careers</a>
              <a href="#" className="hover:text-[#ffc0cb] transition-colors">Sustainability</a>
              <a href="#" className="hover:text-[#ffc0cb] transition-colors">Investor Relations</a>
              <a href="#" className="hover:text-[#ffc0cb] transition-colors">Corporate Governance</a>
            </div>
            <div className="flex flex-col space-y-4">
              <h4 className="text-[#222222] font-bold mb-2 uppercase tracking-wider text-xs">Stay Connected</h4>
              <p className="text-gray-500 font-light text-sm mb-4">Sign up for the latest news and exclusive offers.</p>
              <div className="flex border-b border-gray-300 pb-2">
                <input type="email" placeholder="Email Address" className="bg-transparent outline-none w-full text-[#222222] placeholder-gray-400 text-sm" />
                <button className="text-[#222222] hover:text-[#ffc0cb] transition-colors font-bold text-sm uppercase tracking-wider">Join</button>
              </div>
              <div className="pt-6 flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-[#ffc0cb] transition-colors"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="text-gray-400 hover:text-[#ffc0cb] transition-colors"><Facebook className="w-5 h-5" /></a>
                <a href="#" className="text-gray-400 hover:text-[#ffc0cb] transition-colors"><Twitter className="w-5 h-5" /></a>
                <a href="#" className="text-gray-400 hover:text-[#ffc0cb] transition-colors"><Youtube className="w-5 h-5" /></a>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between text-[11px] font-sans text-gray-500 space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <span className="font-serif text-xl tracking-widest uppercase text-[#222222]">CharmBoutique</span>
              <span>© 2026 CharmBoutique Jewelry, LLC. All rights reserved.</span>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              <a href="#" className="hover:text-[#ffc0cb] transition-colors">Terms & Conditions</a>
              <a href="#" className="hover:text-[#ffc0cb] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#ffc0cb] transition-colors">Cookie Policy</a>
              <a href="#" className="hover:text-[#ffc0cb] transition-colors">Do Not Sell My Personal Information</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
