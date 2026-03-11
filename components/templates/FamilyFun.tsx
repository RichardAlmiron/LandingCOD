import React from 'react';
import { StoreData } from '@/lib/types';
import { Search, ShoppingBag, User, Menu, MapPin, ChevronDown, Tag, ArrowRight, DollarSign, Smartphone, Facebook, Twitter, Instagram, Youtube, Users } from 'lucide-react';

export default function FamilyFunTemplate({ data }: { data: StoreData }) {
  return (
    <div className="min-h-full bg-white font-sans text-[#111]">
      <div className="bg-[#003057] text-white text-[10px] py-1.5 px-6 flex justify-center space-x-8 font-bold uppercase tracking-widest">
        <span className="opacity-50">GAP</span>
        <span>FAMILYFUN</span>
        <span className="opacity-50">BANANA REPUBLIC</span>
        <span className="opacity-50">ATHLETA</span>
      </div>
      <div className="bg-[#ffcc00] text-[#003057] text-[12px] py-2.5 px-6 flex justify-center font-black uppercase tracking-tight italic">
        TODAY ONLY: 50% OFF EVERYTHING! NO EXCLUSIONS.
      </div>
      <header className="bg-white border-b border-gray-100">
        <div className="w-full mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-10">
            <div className="bg-[#003057] text-white px-4 py-2 rounded-full font-black text-2xl italic tracking-tighter cursor-pointer">
              FAMILYFUN
            </div>
            <nav className="hidden lg:flex space-x-5 font-black text-[13px] uppercase italic tracking-tighter">
              <a href="#" className="hover:text-[#003057] hover:underline">Women</a>
              <a href="#" className="hover:text-[#003057] hover:underline">Men</a>
              <a href="#" className="hover:text-[#003057] hover:underline">Girls</a>
              <a href="#" className="hover:text-[#003057] hover:underline">Boys</a>
              <a href="#" className="hover:text-[#003057] hover:underline">Toddler</a>
              <a href="#" className="hover:text-[#003057] hover:underline">Baby</a>
              <a href="#" className="hover:text-[#003057] hover:underline">Maternity</a>
              <a href="#" className="text-red-600 hover:underline">Sale</a>
            </nav>
          </div>
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 w-64">
              <Search className="w-4 h-4 text-gray-500 mr-2" />
              <input type="text" placeholder="Search" className="bg-transparent outline-none text-xs w-full font-bold" />
            </div>
            <div className="flex items-center space-x-6 text-[#003057]">
              <div className="flex flex-col items-center cursor-pointer hover:underline">
                <User className="w-5 h-5" />
                <span className="text-[10px] font-black uppercase italic">Sign In</span>
              </div>
              <div className="relative cursor-pointer hover:underline">
                <ShoppingBag className="w-6 h-6" />
                <span className="absolute -top-1 -right-2 bg-red-600 text-white text-[9px] font-black px-1.5 rounded-full">0</span>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="w-full mx-auto px-6 py-8">
        <div className="relative h-[500px] mb-12 group cursor-pointer overflow-hidden rounded-2xl">
          <img src={data.bannerImage} alt="Banner" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#003057]/60 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-start justify-center text-white p-16 max-w-2xl">
            <div className="bg-[#ffcc00] text-[#003057] px-4 py-1 font-black text-sm uppercase italic mb-6">Limited Time Only</div>
            <h1 className="text-7xl font-black uppercase italic tracking-tighter mb-4 leading-none drop-shadow-lg">{data.name}</h1>
            <p className="text-2xl font-bold mb-10 uppercase italic tracking-tight drop-shadow-md">{data.description}</p>
            <button className="bg-white text-[#003057] px-12 py-4 rounded-full font-black uppercase italic text-lg hover:bg-[#ffcc00] transition-all transform hover:scale-105 shadow-xl">
              Shop Now
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-[#003057]">Hot Deals</h2>
          <div className="flex space-x-4">
            <button className="bg-gray-100 px-6 py-2 rounded-full font-black text-xs uppercase italic hover:bg-gray-200 transition-colors">Shop All Deals</button>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {data.products.map(product => (
            <div key={product.id} data-product-id={product.id} className="group cursor-pointer flex flex-col">
              <div className="relative aspect-[4/5] mb-4 overflow-hidden bg-[#f5f5f5] rounded-xl">
                <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 right-4 bg-red-600 text-white p-2 rounded-full shadow-lg">
                  <Tag className="w-4 h-4" />
                </div>
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur py-3 rounded-lg text-center font-black uppercase italic text-[11px] text-[#003057] translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all shadow-xl">
                  Add to Bag
                </div>
              </div>
              <div className="flex flex-col space-y-1 px-2">
                <h3 className="text-sm font-bold text-gray-800 line-clamp-2 min-h-[40px] group-hover:text-[#003057] group-hover:underline">{product.title}</h3>
                <div className="flex items-baseline space-x-2 pt-1">
                  <span className="font-black text-xl text-red-600 italic">${product.price}</span>
                  {product.originalPrice && <span className="text-xs text-gray-400 line-through font-bold italic">${product.originalPrice}</span>}
                </div>
                <div className="text-[10px] font-black text-green-600 uppercase italic tracking-tighter">Great Value!</div>
              </div>
            </div>
          ))}
        </div>

        {/* Shop by Category */}
        <div className="mt-24 mb-24">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-black uppercase italic tracking-tighter text-[#003057]">Shop by Category</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Women', img: 'https://picsum.photos/400/500?random=490' },
              { name: 'Men', img: 'https://picsum.photos/400/500?random=491' },
              { name: 'Girls', img: 'https://picsum.photos/400/500?random=492' },
              { name: 'Boys', img: 'https://picsum.photos/400/500?random=493' },
            ].map((category, i) => (
              <div key={i} className="group cursor-pointer relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#f5f5f5]">
                <img src={category.img} alt={category.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-white font-black uppercase italic text-3xl tracking-tighter mb-2 drop-shadow-lg">{category.name}</h3>
                  <span className="inline-flex items-center text-white text-sm font-black uppercase italic border-b-2 border-white pb-1 group-hover:text-[#ffcc00] group-hover:border-[#ffcc00] transition-colors drop-shadow-md">
                    Shop Now <ArrowRight className="w-4 h-4 ml-2" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* The Family Shop */}
        <div className="mb-24 bg-[#f5f5f5] rounded-3xl p-12 md:p-20 flex flex-col md:flex-row items-center justify-between">
          <div className="w-full md:w-1/2 mb-10 md:mb-0 md:pr-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#003057] text-white rounded-full mb-6">
              <Users className="w-8 h-8" />
            </div>
            <h2 className="text-5xl font-black uppercase italic tracking-tighter mb-6 text-[#003057]">The Family Shop</h2>
            <p className="text-xl font-bold text-gray-700 mb-8 leading-relaxed">
              Matching outfits for the whole crew. From family photos to holiday parties, we've got everyone covered in style.
            </p>
            <button className="bg-[#003057] text-white px-10 py-4 rounded-full font-black uppercase italic tracking-widest text-sm hover:bg-[#ffcc00] hover:text-[#003057] transition-all shadow-lg">
              Shop Matching Styles
            </button>
          </div>
          <div className="w-full md:w-1/2 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group cursor-pointer">
            <img src="https://picsum.photos/800/600?random=494" alt="Family Shop" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          </div>
        </div>

        {/* Super Cash Promo */}
        <div className="mb-24 bg-[#003057] text-white rounded-3xl p-12 md:p-20 flex flex-col md:flex-row items-center justify-between relative overflow-hidden shadow-2xl">
          <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-[url('https://picsum.photos/800/800?random=495')] bg-cover bg-center opacity-20 mix-blend-overlay" />
          <div className="w-full md:w-1/2 relative z-10">
            <div className="flex items-center mb-6">
              <DollarSign className="w-12 h-12 text-[#ffcc00] mr-4" />
              <h2 className="text-5xl font-black uppercase italic tracking-tighter text-[#ffcc00]">Super Cash</h2>
            </div>
            <h3 className="text-3xl font-black uppercase italic tracking-tight mb-6">Earn $10 for every $25 you spend!</h3>
            <p className="text-lg font-bold text-gray-300 mb-8 leading-relaxed max-w-md">
              It's our best deal of the season. Shop now, earn Super Cash, and redeem it later for massive savings on your entire purchase.
            </p>
            <button className="bg-[#ffcc00] text-[#003057] px-10 py-4 rounded-full font-black uppercase italic tracking-widest text-sm hover:bg-white transition-all shadow-lg">
              Learn How It Works
            </button>
          </div>
        </div>

        {/* App Promo */}
        <div className="mb-24 border-4 border-[#003057] rounded-3xl p-12 md:p-20 flex flex-col md:flex-row items-center justify-between">
          <div className="w-full md:w-1/2 mb-10 md:mb-0 md:pr-16">
            <div className="flex items-center mb-6">
              <Smartphone className="w-12 h-12 text-[#003057] mr-4" />
              <h2 className="text-4xl font-black uppercase italic tracking-tighter text-[#003057]">Get the App</h2>
            </div>
            <p className="text-xl font-bold text-gray-700 mb-8 leading-relaxed">
              Shop faster, track your Super Cash, and get exclusive app-only deals. It's FamilyFun in your pocket.
            </p>
            <div className="flex space-x-4">
              <button className="bg-[#003057] text-white px-8 py-3 rounded-full font-black uppercase italic tracking-widest text-xs hover:bg-[#ffcc00] hover:text-[#003057] transition-all shadow-md">
                App Store
              </button>
              <button className="bg-[#003057] text-white px-8 py-3 rounded-full font-black uppercase italic tracking-widest text-xs hover:bg-[#ffcc00] hover:text-[#003057] transition-all shadow-md">
                Google Play
              </button>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
             <Smartphone className="w-64 h-64 text-[#003057] opacity-10" />
          </div>
        </div>

      </main>
      <footer className="bg-[#003057] text-white pt-24 pb-12 mt-20">
        <div className="w-full mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div className="flex flex-col space-y-4">
              <h4 className="font-black uppercase italic tracking-tighter text-xl mb-2 text-[#ffcc00]">Customer Service</h4>
              <a href="#" className="text-sm font-bold opacity-80 hover:opacity-100 hover:text-[#ffcc00] transition-colors">Help & FAQs</a>
              <a href="#" className="text-sm font-bold opacity-80 hover:opacity-100 hover:text-[#ffcc00] transition-colors">Track Order</a>
              <a href="#" className="text-sm font-bold opacity-80 hover:opacity-100 hover:text-[#ffcc00] transition-colors">Returns & Exchanges</a>
              <a href="#" className="text-sm font-bold opacity-80 hover:opacity-100 hover:text-[#ffcc00] transition-colors">Shipping Information</a>
              <a href="#" className="text-sm font-bold opacity-80 hover:opacity-100 hover:text-[#ffcc00] transition-colors">Size Charts</a>
            </div>
            <div className="flex flex-col space-y-4">
              <h4 className="font-black uppercase italic tracking-tighter text-xl mb-2 text-[#ffcc00]">Ways to Shop</h4>
              <a href="#" className="text-sm font-bold opacity-80 hover:opacity-100 hover:text-[#ffcc00] transition-colors">Store Locator</a>
              <a href="#" className="text-sm font-bold opacity-80 hover:opacity-100 hover:text-[#ffcc00] transition-colors">Buy Online, Pick Up In-Store</a>
              <a href="#" className="text-sm font-bold opacity-80 hover:opacity-100 hover:text-[#ffcc00] transition-colors">Gift Cards</a>
              <a href="#" className="text-sm font-bold opacity-80 hover:opacity-100 hover:text-[#ffcc00] transition-colors">FamilyFun Credit Card</a>
            </div>
            <div className="flex flex-col space-y-4">
              <h4 className="font-black uppercase italic tracking-tighter text-xl mb-2 text-[#ffcc00]">About FamilyFun</h4>
              <a href="#" className="text-sm font-bold opacity-80 hover:opacity-100 hover:text-[#ffcc00] transition-colors">Our Story</a>
              <a href="#" className="text-sm font-bold opacity-80 hover:opacity-100 hover:text-[#ffcc00] transition-colors">Careers</a>
              <a href="#" className="text-sm font-bold opacity-80 hover:opacity-100 hover:text-[#ffcc00] transition-colors">Sustainability</a>
              <a href="#" className="text-sm font-bold opacity-80 hover:opacity-100 hover:text-[#ffcc00] transition-colors">Inclusion & Belonging</a>
            </div>
            <div className="flex flex-col space-y-4">
              <h4 className="font-black uppercase italic tracking-tighter text-xl mb-2 text-[#ffcc00]">Stay Connected</h4>
              <p className="text-sm font-bold opacity-80 mb-4">Sign up for emails and get 20% off your next purchase!</p>
              <div className="flex">
                <input type="email" placeholder="Email Address" className="bg-white text-[#003057] px-4 py-3 rounded-l-full outline-none w-full font-bold" />
                <button className="bg-[#ffcc00] text-[#003057] px-6 py-3 rounded-r-full font-black uppercase italic hover:bg-white transition-colors">
                  Join
                </button>
              </div>
              <div className="pt-6 flex space-x-4">
                <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-[#ffcc00] hover:text-[#003057] transition-colors"><Facebook className="w-5 h-5" /></a>
                <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-[#ffcc00] hover:text-[#003057] transition-colors"><Twitter className="w-5 h-5" /></a>
                <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-[#ffcc00] hover:text-[#003057] transition-colors"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-[#ffcc00] hover:text-[#003057] transition-colors"><Youtube className="w-5 h-5" /></a>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/20 flex flex-col md:flex-row items-center justify-between text-[10px] font-black uppercase italic tracking-widest opacity-70 space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <span className="text-xl tracking-tighter text-[#ffcc00]">FAMILYFUN</span>
              <span>© 2026 FAMILYFUN, LLC</span>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              <a href="#" className="hover:text-[#ffcc00] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#ffcc00] transition-colors">Your Privacy Choices</a>
              <a href="#" className="hover:text-[#ffcc00] transition-colors">Terms of Use</a>
              <a href="#" className="hover:text-[#ffcc00] transition-colors">California Supply Chains Act</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
