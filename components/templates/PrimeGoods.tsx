import React from 'react';
import { StoreData } from '@/lib/types';
import { Search, ShoppingCart, Heart, User, Menu, Zap, Smartphone, Package, ShieldCheck, Truck, Clock, HeadphonesIcon, ArrowRight, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function PrimeGoodsTemplate({ data }: { data: StoreData }) {
  return (
    <div className="min-h-full bg-[#f4f4f4] font-sans text-[#333]">
      <div className="bg-[#e1251b] text-white text-[11px] py-1.5 px-6 flex justify-center font-bold tracking-wide">
        PrimeGoods - Quality Goods, Fast Delivery. Shop the Global Collection!
      </div>
      <header className="bg-white sticky top-0 z-50 border-b border-gray-200 shadow-sm">
        <div className="w-full mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-12">
            <div className="flex items-center cursor-pointer shrink-0">
              <span className="font-black text-4xl tracking-tighter uppercase leading-none text-[#e1251b]">
                PrimeGoods<span className="text-black">.COM</span>
              </span>
            </div>
            <div className="hidden lg:flex items-center border-2 border-[#e1251b] rounded-sm w-[600px] overflow-hidden">
              <input type="text" placeholder="Search for products, brands..." className="bg-transparent outline-none text-sm w-full px-4 py-2 font-medium" />
              <button className="bg-[#e1251b] text-white p-2.5 px-6">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-8">
            <div className="hidden md:flex flex-col items-center cursor-pointer hover:text-[#e1251b]">
              <User className="w-6 h-6" />
              <span className="text-[10px] font-bold uppercase mt-1">Sign In</span>
            </div>
            <div className="hidden md:flex flex-col items-center cursor-pointer hover:text-[#e1251b]">
              <Package className="w-6 h-6" />
              <span className="text-[10px] font-bold uppercase mt-1">Orders</span>
            </div>
            <div className="relative cursor-pointer hover:text-[#e1251b]">
              <ShoppingCart className="w-7 h-7" />
              <span className="absolute top-0 right-0 bg-[#e1251b] text-white text-[10px] font-bold px-1.5 rounded-full">0</span>
            </div>
          </div>
        </div>
        <nav className="hidden lg:flex justify-center space-x-10 py-2.5 bg-white font-bold text-[12px] uppercase tracking-tight">
          <a href="#" className="hover:text-[#e1251b]">PrimeGoods Fashion</a>
          <a href="#" className="hover:text-[#e1251b]">Electronics</a>
          <a href="#" className="hover:text-[#e1251b]">Home & Living</a>
          <a href="#" className="hover:text-[#e1251b]">Fresh Food</a>
          <a href="#" className="hover:text-[#e1251b]">Global Buy</a>
          <a href="#" className="text-[#e1251b]">Flash Sales</a>
        </nav>
      </header>
      <main className="w-full mx-auto px-6 py-8">
        <div className="relative h-[450px] mb-12 group cursor-pointer overflow-hidden rounded-xl shadow-lg">
          <img src={data.bannerImage} alt="Banner" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-start justify-center p-16 max-w-2xl text-white">
            <div className="bg-[#e1251b] text-white px-4 py-1 font-black text-xs uppercase mb-6 flex items-center">
              <Zap className="w-4 h-4 mr-2 fill-white" /> Limited Time Offer
            </div>
            <h1 className="text-6xl font-black uppercase tracking-tighter mb-4 leading-none drop-shadow-2xl">{data.name}</h1>
            <p className="text-xl font-bold mb-10 drop-shadow-xl">{data.description}</p>
            <button className="bg-[#e1251b] text-white px-12 py-4 rounded-sm font-black uppercase text-lg hover:bg-black transition-all transform hover:scale-105 shadow-2xl">
              Shop Now
            </button>
          </div>
        </div>
        <div className="mb-16">
          <div className="flex items-center justify-between mb-10 border-b-2 border-[#e1251b] pb-4">
            <h2 className="text-2xl font-black uppercase tracking-tight flex items-center">
              <ShieldCheck className="w-7 h-7 mr-3 text-[#e1251b]" /> Quality Selection
            </h2>
            <a href="#" className="text-sm font-black uppercase tracking-widest text-[#e1251b] hover:underline">See All</a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {data.products.map(product => (
              <div key={product.id} data-product-id={product.id} className="group cursor-pointer flex flex-col bg-white rounded-lg overflow-hidden hover:shadow-xl transition-all border border-gray-100">
                <div className="relative aspect-square overflow-hidden bg-white p-6">
                  <img src={product.imageUrl} alt={product.title} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-3 left-3 bg-[#e1251b] text-white text-[10px] font-black uppercase px-2 py-1 rounded shadow-lg">PrimeGoods Global</div>
                </div>
                <div className="p-4 flex flex-col space-y-2">
                  <h3 className="text-sm font-bold text-gray-800 line-clamp-2 min-h-[40px] leading-tight group-hover:text-[#e1251b]">{product.title}</h3>
                  <div className="flex flex-col pt-2">
                    <span className="font-black text-2xl text-[#e1251b]">${product.price}</span>
                    {product.originalPrice && <span className="text-xs text-gray-400 line-through font-bold">${product.originalPrice}</span>}
                  </div>
                  <div className="flex items-center text-[10px] font-bold text-green-600 uppercase tracking-tighter">
                    <Package className="w-3 h-3 mr-1" /> Fast Delivery
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shop by Category */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8 border-b-2 border-[#e1251b] pb-4">
            <h2 className="text-2xl font-black uppercase tracking-tight">
              Shop by Category
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {[
              { name: 'Phones', img: 'https://picsum.photos/200/200?random=360' },
              { name: 'Computers', img: 'https://picsum.photos/200/200?random=361' },
              { name: 'Home Appliances', img: 'https://picsum.photos/200/200?random=362' },
              { name: 'Clothing', img: 'https://picsum.photos/200/200?random=363' },
              { name: 'Beauty', img: 'https://picsum.photos/200/200?random=364' },
              { name: 'Sports', img: 'https://picsum.photos/200/200?random=365' },
              { name: 'Groceries', img: 'https://picsum.photos/200/200?random=366' },
              { name: 'Automotive', img: 'https://picsum.photos/200/200?random=367' },
            ].map((category, i) => (
              <div key={i} className="bg-white rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:shadow-lg transition-all border border-gray-100 group">
                <div className="w-16 h-16 rounded-full overflow-hidden mb-3 bg-gray-50 p-2 group-hover:bg-red-50 transition-colors">
                  <img src={category.img} alt={category.name} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform" />
                </div>
                <span className="font-bold text-xs text-center text-gray-700 group-hover:text-[#e1251b]">{category.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Deals */}
        <div className="mb-16 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-[#e1251b] to-[#f74a4a] p-6 flex items-center justify-between text-white">
            <div className="flex items-center">
              <Clock className="w-8 h-8 mr-4" />
              <div>
                <h2 className="text-2xl font-black uppercase tracking-tight">PrimeGoods Flash Deals</h2>
                <p className="text-sm font-medium opacity-90">New deals every 24 hours</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm font-bold bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
              <span>Ends in:</span>
              <span className="font-black text-lg">08:45:12</span>
            </div>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Smart TV 4K 55"', img: 'https://picsum.photos/400/400?random=368', price: '$299.00', oldPrice: '$599.00', sold: '85%' },
              { title: 'Wireless Noise Cancelling Headphones', img: 'https://picsum.photos/400/400?random=369', price: '$89.00', oldPrice: '$199.00', sold: '92%' },
              { title: 'Robot Vacuum Cleaner', img: 'https://picsum.photos/400/400?random=370', price: '$149.00', oldPrice: '$299.00', sold: '78%' },
              { title: 'Smartphone Pro Max', img: 'https://picsum.photos/400/400?random=371', price: '$699.00', oldPrice: '$999.00', sold: '95%' },
            ].map((deal, i) => (
              <div key={i} className="group cursor-pointer flex flex-col">
                <div className="relative aspect-square overflow-hidden bg-gray-50 rounded-lg mb-4 p-4">
                  <img src={deal.img} alt={deal.title} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 mix-blend-multiply" />
                  <div className="absolute top-2 left-2 bg-[#e1251b] text-white text-[10px] font-black uppercase px-2 py-1 rounded">Save 50%</div>
                </div>
                <h3 className="text-sm font-bold text-gray-800 line-clamp-2 mb-2 group-hover:text-[#e1251b]">{deal.title}</h3>
                <div className="flex items-baseline space-x-2 mb-3">
                  <span className="font-black text-xl text-[#e1251b]">{deal.price}</span>
                  <span className="text-xs text-gray-400 line-through font-medium">{deal.oldPrice}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
                  <div className="bg-[#e1251b] h-1.5 rounded-full" style={{ width: deal.sold }}></div>
                </div>
                <div className="text-[10px] text-gray-500 font-medium text-right">{deal.sold} Sold</div>
              </div>
            ))}
          </div>
        </div>

        {/* PrimeGoods Logistics */}
        <div className="mb-16 bg-gray-50 rounded-2xl p-10 border border-gray-200 flex flex-col md:flex-row items-center justify-around text-center gap-8">
          <div className="flex flex-col items-center max-w-xs">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 text-[#e1251b]">
              <Truck className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-black uppercase tracking-tight mb-2">PrimeGoods Logistics</h4>
            <p className="text-sm text-gray-500 font-medium">Same-day or next-day delivery available in most major cities.</p>
          </div>
          <div className="hidden md:block w-px h-24 bg-gray-200" />
          <div className="flex flex-col items-center max-w-xs">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 text-[#e1251b]">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-black uppercase tracking-tight mb-2">Authentic Guarantee</h4>
            <p className="text-sm text-gray-500 font-medium">100% genuine products sourced directly from brands.</p>
          </div>
          <div className="hidden md:block w-px h-24 bg-gray-200" />
          <div className="flex flex-col items-center max-w-xs">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 text-[#e1251b]">
              <HeadphonesIcon className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-black uppercase tracking-tight mb-2">After-Sales Service</h4>
            <p className="text-sm text-gray-500 font-medium">7 days return, 15 days exchange. Professional customer support.</p>
          </div>
        </div>

        {/* App Promo */}
        <div className="mb-16 bg-gradient-to-r from-[#e1251b] to-[#b31b15] rounded-2xl p-12 flex flex-col md:flex-row items-center justify-between text-white shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[url('https://picsum.photos/800/800?random=372')] bg-cover bg-center opacity-20 mix-blend-overlay" />
          <div className="flex items-center mb-8 md:mb-0 relative z-10">
            <Smartphone className="w-24 h-24 text-white mr-8" />
            <div>
              <h3 className="text-4xl font-black uppercase tracking-tighter mb-2">Download PrimeGoods App</h3>
              <p className="text-white/90 font-medium text-lg mb-6 max-w-md">Get exclusive app-only discounts, track your orders in real-time, and enjoy a seamless shopping experience.</p>
              <div className="flex space-x-4">
                <button className="bg-white text-[#e1251b] px-8 py-3 rounded-lg font-black uppercase text-sm hover:bg-gray-100 transition-colors shadow-lg">
                  App Store
                </button>
                <button className="bg-white text-[#e1251b] px-8 py-3 rounded-lg font-black uppercase text-sm hover:bg-gray-100 transition-colors shadow-lg">
                  Google Play
                </button>
              </div>
            </div>
          </div>
          <div className="relative z-10 hidden lg:flex flex-col items-center bg-white/10 backdrop-blur p-6 rounded-xl border border-white/20">
            <div className="w-32 h-32 bg-white rounded-lg p-2 mb-4">
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://jd.com" alt="QR Code" className="w-full h-full" />
            </div>
            <span className="font-bold text-sm uppercase tracking-widest">Scan to Download</span>
          </div>
        </div>

      </main>
      <footer className="bg-white pt-20 pb-12 border-t border-gray-200">
        <div className="w-full mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16 text-[12px] font-medium text-gray-600">
            <div className="flex flex-col space-y-4">
              <h4 className="text-black font-bold text-sm mb-2">Shopping Guide</h4>
              <a href="#" className="hover:text-[#e1251b] transition-colors">Shopping Process</a>
              <a href="#" className="hover:text-[#e1251b] transition-colors">Member Introduction</a>
              <a href="#" className="hover:text-[#e1251b] transition-colors">Life Travel</a>
              <a href="#" className="hover:text-[#e1251b] transition-colors">Common FAQ</a>
              <a href="#" className="hover:text-[#e1251b] transition-colors">Contact Customer Service</a>
            </div>
            <div className="flex flex-col space-y-4">
              <h4 className="text-black font-bold text-sm mb-2">Delivery Info</h4>
              <a href="#" className="hover:text-[#e1251b] transition-colors">Door-to-door Delivery</a>
              <a href="#" className="hover:text-[#e1251b] transition-colors">211 Limited Time</a>
              <a href="#" className="hover:text-[#e1251b] transition-colors">Delivery Fee Standard</a>
              <a href="#" className="hover:text-[#e1251b] transition-colors">Overseas Delivery</a>
            </div>
            <div className="flex flex-col space-y-4">
              <h4 className="text-black font-bold text-sm mb-2">Payment Methods</h4>
              <a href="#" className="hover:text-[#e1251b] transition-colors">Cash on Delivery</a>
              <a href="#" className="hover:text-[#e1251b] transition-colors">Online Payment</a>
              <a href="#" className="hover:text-[#e1251b] transition-colors">Installment</a>
              <a href="#" className="hover:text-[#e1251b] transition-colors">Company Transfer</a>
            </div>
            <div className="flex flex-col space-y-4">
              <h4 className="text-black font-bold text-sm mb-2">After-sales Service</h4>
              <a href="#" className="hover:text-[#e1251b] transition-colors">After-sales Policy</a>
              <a href="#" className="hover:text-[#e1251b] transition-colors">Price Protection</a>
              <a href="#" className="hover:text-[#e1251b] transition-colors">Refund Description</a>
              <a href="#" className="hover:text-[#e1251b] transition-colors">Repair/Return/Exchange</a>
              <a href="#" className="hover:text-[#e1251b] transition-colors">Cancel Order</a>
            </div>
            <div className="flex flex-col space-y-4">
              <h4 className="text-black font-bold text-sm mb-2">Special Services</h4>
              <a href="#" className="hover:text-[#e1251b] transition-colors">Treasure Island</a>
              <a href="#" className="hover:text-[#e1251b] transition-colors">DIY PC</a>
              <a href="#" className="hover:text-[#e1251b] transition-colors">Extended Warranty</a>
              <a href="#" className="hover:text-[#e1251b] transition-colors">PrimeGoods E-card</a>
              <a href="#" className="hover:text-[#e1251b] transition-colors">PrimeGoods Communication</a>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-8 mb-8 flex flex-col items-center">
            <div className="flex space-x-6 mb-6">
              <a href="#" className="text-gray-400 hover:text-[#e1251b] transition-colors"><Facebook className="w-6 h-6" /></a>
              <a href="#" className="text-gray-400 hover:text-[#e1251b] transition-colors"><Twitter className="w-6 h-6" /></a>
              <a href="#" className="text-gray-400 hover:text-[#e1251b] transition-colors"><Instagram className="w-6 h-6" /></a>
              <a href="#" className="text-gray-400 hover:text-[#e1251b] transition-colors"><Youtube className="w-6 h-6" /></a>
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500 mb-4">
              <a href="#" className="hover:text-[#e1251b]">About Us</a>
              <span className="text-gray-300">|</span>
              <a href="#" className="hover:text-[#e1251b]">Contact Us</a>
              <span className="text-gray-300">|</span>
              <a href="#" className="hover:text-[#e1251b]">Careers</a>
              <span className="text-gray-300">|</span>
              <a href="#" className="hover:text-[#e1251b]">PrimeGoods Merchants</a>
              <span className="text-gray-300">|</span>
              <a href="#" className="hover:text-[#e1251b]">Marketing Center</a>
              <span className="text-gray-300">|</span>
              <a href="#" className="hover:text-[#e1251b]">Mobile PrimeGoods</a>
              <span className="text-gray-300">|</span>
              <a href="#" className="hover:text-[#e1251b]">Friendly Links</a>
              <span className="text-gray-300">|</span>
              <a href="#" className="hover:text-[#e1251b]">Sales Alliance</a>
              <span className="text-gray-300">|</span>
              <a href="#" className="hover:text-[#e1251b]">PrimeGoods Community</a>
              <span className="text-gray-300">|</span>
              <a href="#" className="hover:text-[#e1251b]">Risk Management</a>
            </div>
          </div>

          <div className="flex flex-col items-center text-[11px] text-gray-400 text-center">
            <p className="mb-2">Beijing Internet Police Record Number 11010502030000 | ICP License Number: B2-20090108 | Network Culture Business License: Jingwangwen [2020] 4600-843</p>
            <p className="mb-4">Internet Drug Information Service Qualification Certificate Number: (Jing) - Non-operational - 2018 - 0008 | Medical Device Network Transaction Service Third-party Platform Record Number: (Jing) Wangxiebeiwang 202000001</p>
            <span>© 2004-2026 PrimeGoods.COM. ALL RIGHTS RESERVED.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
