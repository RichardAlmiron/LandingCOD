import React from 'react';
import { StoreData } from '@/lib/types';
import { Search, ShoppingCart, User, MapPin, Eye, Calendar, ShieldCheck, BookOpen, ArrowRight, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function OpticalRetailTemplate({ data }: { data: StoreData }) {
  return (
    <div className="min-h-full bg-white font-sans text-[#333333]">
      <div className="bg-[#005a9c] text-white text-[12px] py-2 px-6 flex justify-center font-bold tracking-wide">
        Schedule an Eye Exam Today
      </div>
      <header className="bg-white sticky top-0 z-50 border-b border-gray-200 shadow-sm">
        <div className="w-full mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <nav className="hidden lg:flex space-x-6 font-sans text-[14px] font-bold text-[#005a9c]">
              <a href="#" className="hover:text-[#003d6b] transition-colors">Eyeglasses</a>
              <a href="#" className="hover:text-[#003d6b] transition-colors">Sunglasses</a>
              <a href="#" className="hover:text-[#003d6b] transition-colors">Contacts</a>
              <a href="#" className="hover:text-[#003d6b] transition-colors">Brands</a>
            </nav>
          </div>
          <div className="flex items-center justify-center cursor-pointer shrink-0 absolute left-1/2 -translate-x-1/2">
            <span className="font-sans text-3xl font-black tracking-tight leading-none text-[#005a9c]">
              OPTICALRETAIL
            </span>
          </div>
          <div className="flex items-center space-x-6 text-[#005a9c]">
            <Search className="w-5 h-5 cursor-pointer hover:text-[#003d6b] transition-colors" />
            <MapPin className="w-5 h-5 cursor-pointer hover:text-[#003d6b] transition-colors" />
            <User className="w-5 h-5 cursor-pointer hover:text-[#003d6b] transition-colors" />
            <div className="relative cursor-pointer hover:text-[#003d6b] transition-colors">
              <ShoppingCart className="w-5 h-5" />
            </div>
          </div>
        </div>
      </header>
      <main className="w-full mx-auto px-6 py-12">
        <div className="relative h-[550px] mb-20 group cursor-pointer overflow-hidden rounded-lg">
          <img src={data.bannerImage} alt="Banner" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms]" />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-6">
            <h1 className="text-5xl font-black mb-4 leading-tight drop-shadow-lg">{data.name}</h1>
            <p className="text-lg font-bold mb-8 drop-shadow-md">{data.description}</p>
            <button className="bg-[#005a9c] text-white px-10 py-3 font-sans font-bold text-[14px] hover:bg-[#003d6b] transition-all rounded-full">
              Shop the Look
            </button>
          </div>
        </div>
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-[#333333] mb-2">Featured Brands</h2>
            <p className="text-sm font-sans text-gray-500">Explore top designers.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
            {data.products.map(product => (
              <div key={product.id} data-product-id={product.id} className="group cursor-pointer flex flex-col items-center text-center">
                <div className="relative aspect-[4/3] mb-4 overflow-hidden w-full bg-[#f4f4f4] rounded-lg">
                  <img src={product.imageUrl} alt={product.title} className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-[1500ms]" />
                </div>
                <div className="flex flex-col space-y-1">
                  <h3 className="text-sm font-bold text-[#333333]">{product.title}</h3>
                  <div className="text-[12px] font-sans text-gray-500">{product.category}</div>
                  <div className="pt-2">
                    <span className="font-sans font-bold text-[14px] text-[#005a9c]">${product.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shop by Category */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-[#333333] mb-2">Shop by Category</h2>
            <p className="text-sm font-sans text-gray-500">Find the perfect pair for your lifestyle.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Eyeglasses', img: 'https://picsum.photos/600/400?random=390' },
              { name: 'Sunglasses', img: 'https://picsum.photos/600/400?random=391' },
              { name: 'Contact Lenses', img: 'https://picsum.photos/600/400?random=392' },
            ].map((category, i) => (
              <div key={i} className="group cursor-pointer flex flex-col items-center">
                <div className="relative aspect-[3/2] mb-6 overflow-hidden w-full rounded-lg">
                  <img src={category.img} alt={category.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms]" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-[#333333] mb-2">{category.name}</h3>
                <span className="text-sm font-bold text-[#005a9c] flex items-center group-hover:underline">
                  Shop Now <ArrowRight className="w-4 h-4 ml-1" />
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Eye Exam Promo */}
        <div className="mb-24 bg-[#f4f4f4] rounded-2xl p-12 md:p-20 flex flex-col md:flex-row items-center justify-between">
          <div className="w-full md:w-1/2 mb-10 md:mb-0 md:pr-16 text-center md:text-left">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#005a9c] text-white rounded-full mb-6">
              <Calendar className="w-8 h-8" />
            </div>
            <h2 className="text-4xl font-black text-[#333333] mb-4">Schedule an Eye Exam</h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Your vision is our priority. Book a comprehensive eye exam with our independent doctors of optometry today.
            </p>
            <button className="bg-[#005a9c] text-white px-10 py-4 font-sans font-bold text-[14px] hover:bg-[#003d6b] transition-all rounded-full inline-flex items-center">
              Find a Doctor <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
          <div className="w-full md:w-1/2 relative aspect-video rounded-xl overflow-hidden shadow-xl">
            <img src="https://picsum.photos/800/450?random=393" alt="Eye Exam" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Insurance Info */}
        <div className="mb-24 border border-gray-200 rounded-2xl p-12 text-center">
          <ShieldCheck className="w-12 h-12 text-[#005a9c] mx-auto mb-6" />
          <h2 className="text-3xl font-black text-[#333333] mb-4">We Accept Most Vision Insurance</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Use your vision benefits online or in-store. We make it easy to connect your insurance and see your savings instantly.
          </p>
          <div className="flex flex-wrap justify-center gap-6 opacity-60 mb-8">
            <img src="https://picsum.photos/120/40?random=394" alt="Insurance 1" className="h-8 object-contain grayscale" />
            <img src="https://picsum.photos/120/40?random=395" alt="Insurance 2" className="h-8 object-contain grayscale" />
            <img src="https://picsum.photos/120/40?random=396" alt="Insurance 3" className="h-8 object-contain grayscale" />
            <img src="https://picsum.photos/120/40?random=397" alt="Insurance 4" className="h-8 object-contain grayscale" />
          </div>
          <button className="text-[#005a9c] font-bold text-[14px] hover:underline flex items-center mx-auto">
            Check Your Benefits <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>

        {/* Vision Guide */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-[#333333] mb-2">Vision Guide</h2>
            <p className="text-sm font-sans text-gray-500">Expert advice for your eye health and style.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'How to Read Your Prescription', icon: Eye },
              { title: 'Choosing Frames for Your Face Shape', icon: User },
              { title: 'The Benefits of Blue Light Lenses', icon: ShieldCheck },
              { title: 'Contact Lens Care 101', icon: BookOpen },
            ].map((guide, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-8 text-center hover:shadow-md transition-shadow cursor-pointer group">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white text-[#005a9c] rounded-full mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  <guide.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#333333] mb-4">{guide.title}</h3>
                <span className="text-sm font-bold text-[#005a9c] group-hover:underline">Read Article</span>
              </div>
            ))}
          </div>
        </div>

      </main>
      <footer className="bg-[#f4f4f4] text-[#333333] pt-20 pb-12">
        <div className="w-full mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16 text-[13px] font-sans font-medium text-gray-600">
            <div className="flex flex-col space-y-4">
              <h4 className="text-[#333333] font-bold mb-2 text-sm">Customer Care</h4>
              <a href="#" className="hover:text-[#005a9c] transition-colors">Schedule an Exam</a>
              <a href="#" className="hover:text-[#005a9c] transition-colors">Track Order</a>
              <a href="#" className="hover:text-[#005a9c] transition-colors">Returns & Exchanges</a>
              <a href="#" className="hover:text-[#005a9c] transition-colors">Shipping Info</a>
              <a href="#" className="hover:text-[#005a9c] transition-colors">Contact Us</a>
            </div>
            <div className="flex flex-col space-y-4">
              <h4 className="text-[#333333] font-bold mb-2 text-sm">Shop</h4>
              <a href="#" className="hover:text-[#005a9c] transition-colors">Eyeglasses</a>
              <a href="#" className="hover:text-[#005a9c] transition-colors">Sunglasses</a>
              <a href="#" className="hover:text-[#005a9c] transition-colors">Contact Lenses</a>
              <a href="#" className="hover:text-[#005a9c] transition-colors">Brands</a>
              <a href="#" className="hover:text-[#005a9c] transition-colors">Gift Cards</a>
            </div>
            <div className="flex flex-col space-y-4">
              <h4 className="text-[#333333] font-bold mb-2 text-sm">About Us</h4>
              <a href="#" className="hover:text-[#005a9c] transition-colors">Our Story</a>
              <a href="#" className="hover:text-[#005a9c] transition-colors">Careers</a>
              <a href="#" className="hover:text-[#005a9c] transition-colors">Store Locator</a>
              <a href="#" className="hover:text-[#005a9c] transition-colors">OneSight</a>
              <a href="#" className="hover:text-[#005a9c] transition-colors">Affiliate Program</a>
            </div>
            <div className="flex flex-col space-y-4">
              <h4 className="text-[#333333] font-bold mb-2 text-sm">Insurance & Savings</h4>
              <a href="#" className="hover:text-[#005a9c] transition-colors">Vision Insurance</a>
              <a href="#" className="hover:text-[#005a9c] transition-colors">FSA & HSA</a>
              <a href="#" className="hover:text-[#005a9c] transition-colors">Offers & Discounts</a>
              <a href="#" className="hover:text-[#005a9c] transition-colors">AAA Discount</a>
              <a href="#" className="hover:text-[#005a9c] transition-colors">AARP Discount</a>
            </div>
            <div className="flex flex-col space-y-4">
              <h4 className="text-[#333333] font-bold mb-2 text-sm">Stay Connected</h4>
              <p className="text-gray-500 text-sm mb-4">Sign up for exclusive offers and vision care tips.</p>
              <div className="flex flex-col space-y-3">
                <input type="email" placeholder="Email Address" className="bg-white border border-gray-300 px-4 py-3 rounded-full outline-none w-full focus:border-[#005a9c] transition-colors" />
                <button className="bg-[#005a9c] text-white px-6 py-3 rounded-full font-bold hover:bg-[#003d6b] transition-colors">
                  Sign Up
                </button>
              </div>
              <div className="pt-6 flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-[#005a9c] transition-colors"><Facebook className="w-5 h-5" /></a>
                <a href="#" className="text-gray-400 hover:text-[#005a9c] transition-colors"><Twitter className="w-5 h-5" /></a>
                <a href="#" className="text-gray-400 hover:text-[#005a9c] transition-colors"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="text-gray-400 hover:text-[#005a9c] transition-colors"><Youtube className="w-5 h-5" /></a>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between text-[12px] font-sans text-gray-500 space-y-4 md:space-y-0">
            <span>© 2026 OpticalRetail. All rights reserved.</span>
            <div className="flex flex-wrap justify-center gap-6">
              <a href="#" className="hover:text-[#005a9c] transition-colors">Terms & Conditions</a>
              <a href="#" className="hover:text-[#005a9c] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#005a9c] transition-colors">Do Not Sell My Personal Information</a>
              <a href="#" className="hover:text-[#005a9c] transition-colors">Accessibility</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
