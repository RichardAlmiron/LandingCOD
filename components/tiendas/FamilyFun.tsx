'use client';

import React, { useState } from 'react';
import { StoreData, Product } from '@/lib/types';
import { useCart } from '@/contexts/CartContext';
import { Search, ShoppingBag, Heart, User, Menu, MapPin, ChevronDown, Tag, ArrowRight, DollarSign, Smartphone, Facebook, Twitter, Instagram, Youtube, Users, X } from 'lucide-react';
import { usePagination, ProductPagination } from '@/components/componentes-compartidos/templates/Pagination';

export default function FamilyFunTemplate({ data }: { data: StoreData }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { addToCart: addToCartContext, itemCount, setIsCartOpen } = useCart();
  const [favorites, setFavorites] = useState<string[]>([]);
  
  const itemsPerPage = 15; // 3 rows x 5 columns
  const {
    currentPage,
    totalPages,
    paginatedItems,
    handlePageChange,
    totalItems,
  } = usePagination(data.products, itemsPerPage);

  const handleAddToCart = (product: Product, e?: React.MouseEvent) => { if (e) e.stopPropagation(); addToCartContext(product); };

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };
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
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 mr-2 hover:text-[#003057] transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
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
              <div 
                onClick={() => toggleFavorite('header')}
                className="hidden sm:flex flex-col items-center cursor-pointer hover:underline"
              >
                <Heart className={`w-5 h-5 ${favorites.length > 0 ? 'fill-red-500 text-red-500' : ''}`} />
                <span className="text-[10px] font-black uppercase italic">Lists</span>
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[9px] font-black px-1.5 rounded-full">{favorites.length}</span>
                )}
              </div>
              <div 
                onClick={() => setIsCartOpen(true)}
                className="relative cursor-pointer hover:underline"
              >
                <ShoppingBag className="w-6 h-6" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-2 bg-red-600 text-white text-[9px] font-black px-1.5 rounded-full">{itemCount}</span>
                )}
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
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-[#003057]">Hot Deals ({totalItems})</h2>
          <div className="flex space-x-4">
            <button className="bg-gray-100 px-6 py-2 rounded-full font-black text-xs uppercase italic hover:bg-gray-200 transition-colors">Shop All Deals</button>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {paginatedItems.map((product, idx) => (
            <div key={product.id || idx} data-product-id={product.id} className="group cursor-pointer flex flex-col">
              <div className="relative aspect-[4/5] mb-4 overflow-hidden bg-[#f5f5f5] rounded-xl">
                <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-3 right-3 bg-red-600 text-white p-2 rounded-full shadow-lg">
                  <Tag className="w-4 h-4" />
                </div>
                <button 
                  onClick={(e) => handleAddToCart(product, e)}
                  className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur py-2 rounded-lg text-center font-black uppercase italic text-[10px] text-[#003057] translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all shadow-xl"
                >
                  Add to Bag
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }}
                  className="absolute top-3 left-3 bg-white p-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Heart className={`w-4 h-4 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                </button>
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

        {/* Trending Now - Staff Picks */}
        <div className="mb-24">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-black uppercase italic tracking-tighter text-[#003057]">Trending Now</h2>
            <span className="text-sm font-black uppercase italic text-[#003057] cursor-pointer hover:underline">Staff Picks →</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {data.products.slice(0, 4).map((product, i) => (
              <div key={`trending-${i}`} className="group cursor-pointer">
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#f5f5f5] mb-4">
                  <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-3 left-3 bg-[#ffcc00] text-[#003057] px-3 py-1 rounded-full text-[10px] font-black uppercase italic">Trending</div>
                  <button onClick={(e) => handleAddToCart(product, e)} className="absolute bottom-3 left-3 right-3 bg-[#003057] text-white py-2 rounded-lg text-center font-black uppercase italic text-[10px] opacity-0 group-hover:opacity-100 transition-opacity">Add to Bag</button>
                </div>
                <h3 className="text-sm font-bold line-clamp-1">{product.title}</h3>
                <span className="font-black text-lg text-[#003057] italic">${product.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Style Guide Section */}
        <div className="mb-24 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Date Night', subtitle: 'Looks that turn heads', img: 'https://picsum.photos/600/800?random=496' },
            { title: 'Weekend Vibes', subtitle: 'Casual never looked so good', img: 'https://picsum.photos/600/800?random=497' },
            { title: 'Office Ready', subtitle: 'Professional meets stylish', img: 'https://picsum.photos/600/800?random=498' },
          ].map((guide, i) => (
            <div key={i} className="group cursor-pointer relative aspect-[3/4] overflow-hidden rounded-2xl">
              <img src={guide.img} alt={guide.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#003057]/80 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <p className="text-[10px] font-black uppercase italic tracking-widest mb-2 text-[#ffcc00]">{guide.subtitle}</p>
                <h3 className="text-3xl font-black uppercase italic tracking-tighter mb-4">{guide.title}</h3>
                <button className="bg-white text-[#003057] px-6 py-2 rounded-full font-black uppercase italic text-xs hover:bg-[#ffcc00] transition-colors">Shop the Look</button>
              </div>
            </div>
          ))}
        </div>

        {/* Customer Reviews */}
        <div className="mb-24 bg-[#003057] text-white rounded-3xl p-12 md:p-16">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-center mb-12 text-[#ffcc00]">What Families Are Saying</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah M.', text: 'Best family clothing store ever! The matching outfits are adorable.', stars: 5 },
              { name: 'James K.', text: 'Super Cash is amazing. Saved over $200 this year alone.', stars: 5 },
              { name: 'Maria L.', text: 'Quality clothes at great prices. My kids love shopping here.', stars: 4 },
            ].map((review, i) => (
              <div key={i} className="bg-white/10 backdrop-blur rounded-2xl p-8">
                <div className="flex mb-4">{Array.from({ length: review.stars }).map((_, j) => <span key={j} className="text-[#ffcc00] text-lg">★</span>)}</div>
                <p className="text-sm font-bold mb-4 opacity-90 leading-relaxed">"{review.text}"</p>
                <p className="text-xs font-black uppercase italic text-[#ffcc00]">— {review.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Brand Values */}
        <div className="mb-24">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-[#003057] text-center mb-12">Why FamilyFun?</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: '🚚', title: 'Free Shipping', desc: 'On orders over $50' },
              { icon: '↩️', title: 'Easy Returns', desc: '60-day return policy' },
              { icon: '💰', title: 'Super Cash', desc: 'Earn rewards every purchase' },
              { icon: '🌱', title: 'Sustainable', desc: 'Eco-friendly materials' },
            ].map((val, i) => (
              <div key={i} className="flex flex-col items-center p-6 bg-[#f5f5f5] rounded-2xl hover:shadow-lg transition-shadow">
                <span className="text-4xl mb-4">{val.icon}</span>
                <h4 className="font-black uppercase italic text-sm text-[#003057] mb-2">{val.title}</h4>
                <p className="text-xs text-gray-600 font-bold">{val.desc}</p>
              </div>
            ))}
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

