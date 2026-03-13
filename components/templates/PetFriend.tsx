'use client';

import React, { useState } from 'react';
import { StoreData } from '@/lib/types';
import { Search, ShoppingCart, Heart, User, Menu, Bone, Truck, Star, Pill, Repeat, ShieldCheck, ChevronRight, Facebook, Twitter, Instagram, Youtube, X } from 'lucide-react';
import { usePagination, ProductPagination } from './shared/Pagination';

export default function PetFriendTemplate({ data }: { data: StoreData }) {
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
    <div className="min-h-full bg-white font-sans text-[#333]">
      <div className="bg-[#1c4396] text-white text-xs py-2 px-6 flex justify-center font-bold tracking-wide">
        <Truck className="w-4 h-4 mr-2" /> Free 1-3 day shipping over $49 <Truck className="w-4 h-4 ml-2" />
      </div>
      <header className="bg-white sticky top-0 z-50 border-b border-gray-200 shadow-sm">
        <div className="w-full mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center cursor-pointer shrink-0">
              <span className="font-black text-4xl tracking-tighter text-[#1c4396] flex items-center">
                PetFriend
              </span>
            </div>
            <div className="hidden lg:flex items-center bg-white border-2 border-[#1c4396] rounded-full px-4 py-2 w-[500px]">
              <input type="text" placeholder="Search for products, brands, etc." className="bg-transparent outline-none text-sm w-full font-medium" />
              <Search className="w-5 h-5 text-[#1c4396] ml-2" />
            </div>
          </div>
          <div className="flex items-center space-x-6 text-[#1c4396]">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hover:text-[#f8c134] transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <div className="hidden md:flex flex-col items-center cursor-pointer hover:underline">
              <User className="w-6 h-6" />
              <span className="text-[10px] font-bold mt-1">Sign In</span>
            </div>
            <div 
              onClick={() => toggleFavorite('header')}
              className="relative hidden md:flex flex-col items-center cursor-pointer hover:underline"
            >
              <Heart className={`w-6 h-6 ${favorites.length > 0 ? 'fill-red-500 text-red-500' : ''}`} />
              <span className="text-[10px] font-bold mt-1">Favorites</span>
              {favorites.length > 0 && (
                <span className="absolute -top-1 right-0 bg-red-500 text-white text-[9px] font-black px-1.5 rounded-full">{favorites.length}</span>
              )}
            </div>
            <div 
              onClick={addToCart}
              className="relative cursor-pointer flex flex-col items-center hover:underline"
            >
              <ShoppingCart className="w-7 h-7" />
              <span className="absolute top-0 right-0 bg-[#f8c134] text-[#1c4396] text-[10px] font-black px-1.5 rounded-full border border-white">{cartCount}</span>
              <span className="text-[10px] font-bold mt-1">Cart</span>
            </div>
          </div>
        </div>
        <nav className="hidden lg:flex justify-center space-x-8 py-3 bg-[#1c4396] text-white font-bold text-sm">
          <a href="#" className="hover:text-[#f8c134] flex items-center"><Menu className="w-4 h-4 mr-2" /> Shop by Pet</a>
          <a href="#" className="hover:text-[#f8c134]">Dog</a>
          <a href="#" className="hover:text-[#f8c134]">Cat</a>
          <a href="#" className="hover:text-[#f8c134]">Fish</a>
          <a href="#" className="hover:text-[#f8c134]">Small Pet</a>
          <a href="#" className="hover:text-[#f8c134]">Reptile</a>
          <a href="#" className="hover:text-[#f8c134]">Bird</a>
          <a href="#" className="hover:text-[#f8c134]">Horse</a>
          <a href="#" className="text-[#f8c134]">Today&apos;s Deals</a>
        </nav>
      </header>
      <main className="w-full mx-auto px-6 py-8">
        <div className="relative h-[450px] mb-12 group cursor-pointer overflow-hidden rounded-2xl shadow-lg">
          <img src={data.bannerImage} alt="Banner" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1c4396]/80 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-start justify-center p-16 max-w-2xl text-white">
            <h1 className="text-5xl font-black mb-4 leading-tight drop-shadow-lg">{data.name}</h1>
            <p className="text-xl font-bold mb-8 drop-shadow-md">{data.description}</p>
            <button className="bg-[#f8c134] text-[#1c4396] px-10 py-4 rounded-full font-black text-lg hover:bg-white transition-all shadow-xl">
              Shop Now
            </button>
          </div>
        </div>
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black text-[#1c4396] flex items-center">
              <Bone className="w-7 h-7 mr-3 text-[#f8c134] fill-[#f8c134]" /> Top Picks for Your Pet ({totalItems})
            </h2>
            <a href="#" className="text-sm font-bold text-[#1c4396] hover:underline">View All</a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {paginatedItems.map((product: any, idx: number) => (
              <div key={product.id || idx} data-product-id={product.id} className="group cursor-pointer flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all">
                <div className="relative aspect-square overflow-hidden bg-white p-4">
                  <img src={product.imageUrl} alt={product.title} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-2 left-2 bg-[#f8c134] text-[#1c4396] text-[10px] font-black px-2 py-1 rounded-full shadow-sm">Autoship & Save</div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }}
                    className="absolute top-2 right-2 p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Heart className={`w-4 h-4 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>
                </div>
                <div className="p-4 flex flex-col space-y-2">
                  <h3 className="text-sm font-bold text-[#1c4396] line-clamp-2 min-h-[40px] leading-tight group-hover:underline">{product.title}</h3>
                  <div className="flex items-center space-x-1 text-[#f8c134]">
                    <Star className="w-3 h-3 fill-[#f8c134]" />
                    <Star className="w-3 h-3 fill-[#f8c134]" />
                    <Star className="w-3 h-3 fill-[#f8c134]" />
                    <Star className="w-3 h-3 fill-[#f8c134]" />
                    <Star className="w-3 h-3 fill-[#f8c134]" />
                    <span className="text-[10px] text-gray-500 ml-1">(1,234)</span>
                  </div>
                  <div className="flex flex-col pt-2">
                    <span className="font-black text-xl text-[#e31837]">${product.price}</span>
                    {product.originalPrice && <span className="text-xs text-gray-400 line-through font-bold">${product.originalPrice}</span>}
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); addToCart(); }}
                    className="w-full bg-[#f8c134] text-[#1c4396] py-2.5 rounded-full font-black text-sm hover:bg-[#1c4396] hover:text-white transition-colors mt-2"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
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

        {/* Shop by Pet */}
        <div className="mb-16">
          <h2 className="text-2xl font-black text-[#1c4396] mb-8 text-center">Shop by Pet</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {[
              { name: 'Dog', img: 'https://picsum.photos/200/200?random=201' },
              { name: 'Cat', img: 'https://picsum.photos/200/200?random=202' },
              { name: 'Fish', img: 'https://picsum.photos/200/200?random=203' },
              { name: 'Small Pet', img: 'https://picsum.photos/200/200?random=204' },
              { name: 'Reptile', img: 'https://picsum.photos/200/200?random=205' },
              { name: 'Bird', img: 'https://picsum.photos/200/200?random=206' },
              { name: 'Horse', img: 'https://picsum.photos/200/200?random=207' },
              { name: 'Farm Animal', img: 'https://picsum.photos/200/200?random=208' },
            ].map((pet, i) => (
              <div key={i} className="flex flex-col items-center group cursor-pointer">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-3 border-4 border-transparent group-hover:border-[#1c4396] transition-colors shadow-md bg-white">
                  <img src={pet.img} alt={pet.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                </div>
                <span className="font-bold text-[#1c4396] group-hover:underline">{pet.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Autoship Promo */}
        <div className="bg-[#eef3fb] rounded-2xl p-8 md:p-12 mb-16 flex flex-col md:flex-row items-center justify-between border border-[#d2e0f5]">
          <div className="max-w-xl mb-8 md:mb-0">
            <div className="flex items-center space-x-3 mb-4">
              <Repeat className="w-8 h-8 text-[#1c4396]" />
              <h2 className="text-3xl font-black text-[#1c4396]">Autoship & Save</h2>
            </div>
            <h3 className="text-xl font-bold text-[#333] mb-4">Never run out of their favorites again.</h3>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center text-sm font-bold text-gray-700"><ShieldCheck className="w-5 h-5 text-green-600 mr-2" /> Save 35% on your first Autoship order</li>
              <li className="flex items-center text-sm font-bold text-gray-700"><ShieldCheck className="w-5 h-5 text-green-600 mr-2" /> 5% off future Autoship orders</li>
              <li className="flex items-center text-sm font-bold text-gray-700"><ShieldCheck className="w-5 h-5 text-green-600 mr-2" /> Skip, change, or cancel anytime</li>
            </ul>
            <button className="bg-[#1c4396] text-white px-8 py-3 rounded-full font-black hover:bg-[#153270] transition-colors">
              Set Up Autoship
            </button>
          </div>
          <div className="w-full md:w-1/3">
             <img src="https://picsum.photos/400/300?random=209" alt="Autoship Box" className="w-full rounded-xl shadow-lg" />
          </div>
        </div>

        {/* Pharmacy */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black text-[#1c4396] flex items-center">
              <Pill className="w-7 h-7 mr-3 text-[#e31837]" /> PetFriend Pharmacy
            </h2>
            <a href="#" className="text-sm font-bold text-[#1c4396] hover:underline">Shop All Meds</a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow cursor-pointer">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4 text-[#1c4396]">
                <Pill className="w-8 h-8" />
              </div>
              <h3 className="font-black text-lg text-[#1c4396] mb-2">Prescription Meds</h3>
              <p className="text-sm text-gray-600 mb-4">Flea & tick, heartworm, and more.</p>
              <span className="text-[#1c4396] font-bold flex items-center mt-auto hover:underline">Shop Now <ChevronRight className="w-4 h-4 ml-1" /></span>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow cursor-pointer">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4 text-[#1c4396]">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="font-black text-lg text-[#1c4396] mb-2">Compounded Meds</h3>
              <p className="text-sm text-gray-600 mb-4">Customized medications for your pet's needs.</p>
              <span className="text-[#1c4396] font-bold flex items-center mt-auto hover:underline">Shop Now <ChevronRight className="w-4 h-4 ml-1" /></span>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow cursor-pointer">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4 text-[#1c4396]">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="font-black text-lg text-[#1c4396] mb-2">Connect with a Vet</h3>
              <p className="text-sm text-gray-600 mb-4">Chat with a licensed vet online.</p>
              <span className="text-[#1c4396] font-bold flex items-center mt-auto hover:underline">Learn More <ChevronRight className="w-4 h-4 ml-1" /></span>
            </div>
          </div>
        </div>

        {/* Top Brands */}
        <div className="mb-16">
          <h2 className="text-2xl font-black text-[#1c4396] mb-8 text-center">Top Brands</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {['Purina', 'Blue Buffalo', 'Hill\'s', 'Royal Canin', 'Fancy Feast', 'Greenies'].map((brand, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 flex items-center justify-center hover:shadow-md transition-shadow cursor-pointer h-24">
                <span className="font-black text-xl text-gray-400 hover:text-[#1c4396] transition-colors text-center leading-tight">{brand}</span>
              </div>
            ))}
          </div>
        </div>

      </main>
      <footer className="bg-[#1c4396] text-white pt-16 pb-8 mt-20">
        <div className="w-full mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 text-sm">
            <div className="flex flex-col space-y-4">
              <h4 className="text-[#f8c134] text-lg font-black mb-2">Customer Service</h4>
              <a href="#" className="hover:underline font-bold">Help Center</a>
              <a href="#" className="hover:underline font-bold">Track Order</a>
              <a href="#" className="hover:underline font-bold">Return Policy</a>
              <a href="#" className="hover:underline font-bold">Shipping Info</a>
              <a href="#" className="hover:underline font-bold">Contact Us</a>
              <div className="mt-4">
                <p className="font-bold mb-1">Call us 24/7</p>
                <p className="text-xl font-black text-[#f8c134]">1-800-672-4399</p>
              </div>
            </div>
            <div className="flex flex-col space-y-4">
              <h4 className="text-[#f8c134] text-lg font-black mb-2">About PetFriend</h4>
              <a href="#" className="hover:underline font-bold">About Us</a>
              <a href="#" className="hover:underline font-bold">Careers</a>
              <a href="#" className="hover:underline font-bold">PetFriend Health</a>
              <a href="#" className="hover:underline font-bold">PetFriend Pharmacy</a>
              <a href="#" className="hover:underline font-bold">Affiliates</a>
            </div>
            <div className="flex flex-col space-y-4">
              <h4 className="text-[#f8c134] text-lg font-black mb-2">Services</h4>
              <a href="#" className="hover:underline font-bold">Autoship</a>
              <a href="#" className="hover:underline font-bold">Gift Cards</a>
              <a href="#" className="hover:underline font-bold">Connect with a Vet</a>
              <a href="#" className="hover:underline font-bold">Pet Insurance</a>
              <a href="#" className="hover:underline font-bold">Shelters & Rescues</a>
            </div>
            <div className="flex flex-col space-y-4">
              <h4 className="text-[#f8c134] text-lg font-black mb-2">Connect With Us</h4>
              <div className="flex space-x-4 mb-4">
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#f8c134] hover:text-[#1c4396] transition-colors"><Facebook className="w-5 h-5" /></a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#f8c134] hover:text-[#1c4396] transition-colors"><Twitter className="w-5 h-5" /></a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#f8c134] hover:text-[#1c4396] transition-colors"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#f8c134] hover:text-[#1c4396] transition-colors"><Youtube className="w-5 h-5" /></a>
              </div>
              <p className="font-bold mb-2">Download our free app</p>
              <div className="flex space-x-2">
                <button className="bg-black text-white px-4 py-2 rounded-lg font-bold text-xs flex items-center border border-gray-700 hover:bg-gray-900">App Store</button>
                <button className="bg-black text-white px-4 py-2 rounded-lg font-bold text-xs flex items-center border border-gray-700 hover:bg-gray-900">Google Play</button>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/20 flex flex-col md:flex-row items-center justify-between text-xs font-medium text-blue-200">
            <span className="mb-4 md:mb-0">© 2026 PetFriend, Inc.</span>
            <div className="flex flex-wrap justify-center gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
              <a href="#" className="hover:text-white transition-colors">Accessibility</a>
              <a href="#" className="hover:text-white transition-colors">CA Privacy Rights</a>
              <a href="#" className="hover:text-white transition-colors">Do Not Sell My Info</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
