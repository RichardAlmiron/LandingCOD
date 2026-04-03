'use client';

import React, { useState } from 'react';
import { StoreData, Product } from '@/lib/types';
import { useCart } from '@/contexts/CartContext';
import { Search, ShoppingBag, Heart, User, Menu, Globe, ChevronDown, ArrowRight, Smartphone, Check, Instagram, Facebook, Twitter, Youtube, X } from 'lucide-react';
import { usePagination, ProductPagination } from '@/components/componentes-compartidos/templates/Pagination';

export default function DesignerHubTemplate({ data }: { data: StoreData }) {
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
      <div className="bg-white text-[10px] py-2 px-6 flex justify-between items-center font-bold tracking-widest uppercase border-b border-gray-100">
        <div className="flex items-center space-x-6">
          <div className="flex items-center cursor-pointer hover:opacity-50">
            <Globe className="w-3 h-3 mr-1" />
            <span>US / USD</span>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <a href="#" className="hover:opacity-50">Customer Service</a>
          <a href="#" className="hover:opacity-50">Sign In</a>
        </div>
      </div>
      <header className="bg-white sticky top-0 z-50 border-b border-gray-100">
        <div className="w-full mx-auto px-6 h-20 flex items-center justify-between">
          <nav className="hidden lg:flex space-x-8 font-bold text-xs uppercase tracking-widest">
            <a href="#" className="hover:opacity-50 transition-opacity">Women</a>
            <a href="#" className="hover:opacity-50 transition-opacity">Men</a>
            <a href="#" className="hover:opacity-50 transition-opacity">Kids</a>
          </nav>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 hover:opacity-70 transition-opacity"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <div className="font-black text-3xl tracking-[0.3em] uppercase cursor-pointer">
            DesignerHub
          </div>
          <div className="flex items-center space-x-8">
            <div className="hidden md:flex items-center border border-gray-200 rounded-sm px-3 py-2 w-48 focus-within:border-black transition-colors">
              <Search className="w-4 h-4 text-gray-400 mr-2" />
              <input type="text" placeholder="Search" className="bg-transparent outline-none text-[10px] font-bold uppercase tracking-widest w-full" />
            </div>
            <div className="flex items-center space-x-6">
              <User className="w-5 h-5 cursor-pointer hover:opacity-50" />
              <div 
                onClick={() => toggleFavorite('header')}
                className="relative cursor-pointer hover:opacity-50"
              >
                <Heart className={`w-5 h-5 ${favorites.length > 0 ? 'fill-red-500 text-red-500' : ''}`} />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[9px] font-bold px-1 rounded-full">{favorites.length}</span>
                )}
              </div>
              <div 
                onClick={() => setIsCartOpen(true)}
                className="relative cursor-pointer hover:opacity-50"
              >
                <ShoppingBag className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-2 bg-black text-white text-[9px] font-bold px-1 rounded-full">{itemCount}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="w-full mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          <div className="relative h-[600px] group cursor-pointer overflow-hidden">
            <img src={data.bannerImage} alt="Banner" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
            <div className="absolute bottom-12 left-12 text-white">
              <h1 className="text-5xl font-black uppercase tracking-tighter mb-4 leading-none">{data.name}</h1>
              <p className="text-sm font-bold tracking-[0.2em] uppercase mb-8">{data.description}</p>
              <button className="bg-white text-black px-10 py-4 font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all">
                Shop Women
              </button>
            </div>
          </div>
          <div className="relative h-[600px] group cursor-pointer overflow-hidden">
            <img src="https://picsum.photos/800/1000?random=men" alt="Men" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
            <div className="absolute bottom-12 left-12 text-white">
              <h2 className="text-5xl font-black uppercase tracking-tighter mb-4 leading-none">The New Season</h2>
              <p className="text-sm font-bold tracking-[0.2em] uppercase mb-8">Curated for the modern man</p>
              <button className="bg-white text-black px-10 py-4 font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all">
                Shop Men
              </button>
            </div>
          </div>
        </div>
        <div className="mb-20">
          <div className="flex items-center justify-between mb-12 border-b border-gray-100 pb-6">
            <h2 className="text-2xl font-black uppercase tracking-widest">New In ({totalItems})</h2>
            <a href="#" className="text-[10px] font-bold uppercase tracking-[0.2em] hover:opacity-50 transition-opacity">Shop All</a>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-x-4 gap-y-8">
            {paginatedItems.map((product, idx) => (
              <div key={product.id || idx} data-product-id={product.id} className="group cursor-pointer flex flex-col">
                <div className="relative aspect-[3/4] mb-4 overflow-hidden bg-[#f9f9f9]">
                  <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }}
                    className="absolute top-3 right-3 bg-white p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Heart className={`w-3.5 h-3.5 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>
                  <button 
                    onClick={(e) => handleAddToCart(product, e)}
                    className="absolute bottom-3 left-3 right-3 bg-black text-white py-2 text-[9px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-col space-y-1">
                  <div className="text-[8px] font-bold uppercase tracking-[0.2em] text-gray-400">{product.category}</div>
                  <h3 className="text-[11px] font-bold uppercase tracking-[0.1em] text-gray-900 line-clamp-2 min-h-[28px] leading-relaxed group-hover:underline">{product.title}</h3>
                  <div className="flex items-center space-x-2 pt-1">
                    <span className="font-bold text-xs tracking-widest">${product.price}</span>
                    {product.originalPrice && <span className="text-[10px] text-gray-400 line-through tracking-widest">${product.originalPrice}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12">
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

        {/* Shop by Brand */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-12 border-b border-gray-100 pb-6">
            <h2 className="text-2xl font-black uppercase tracking-widest">Trending Brands</h2>
            <a href="#" className="text-[10px] font-bold uppercase tracking-[0.2em] hover:opacity-50 transition-opacity">View All Brands</a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {['Maison A', 'Atelier B', 'Studio C', 'Maison D', 'Atelier E', 'Studio F', 'Maison G', 'Atelier H', 'Studio I', 'Maison J', 'Atelier K', 'Studio L'].map((brand, i) => (
              <div key={i} className="flex items-center justify-center p-8 border border-gray-100 hover:border-black transition-colors cursor-pointer group h-32">
                <span className="font-black text-sm uppercase tracking-widest text-gray-400 group-hover:text-black transition-colors text-center">{brand}</span>
              </div>
            ))}
          </div>
        </div>

        {/* The Edit (Editorial) */}
        <div className="mb-20 bg-[#f9f9f9] py-24 px-6 md:px-12">
          <div className="w-full mx-auto text-center mb-16">
            <h2 className="text-3xl font-black uppercase tracking-widest mb-6">The Edit</h2>
            <p className="text-sm font-bold tracking-[0.1em] text-gray-500 leading-relaxed">
              Discover our latest curations, styling advice, and exclusive interviews with fashion's most exciting voices.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group cursor-pointer">
              <div className="aspect-[3/4] overflow-hidden mb-6 relative">
                <img src="https://picsum.photos/600/800?random=220" alt="Editorial 1" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
              </div>
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-3">Trend Report</div>
              <h3 className="text-lg font-black uppercase tracking-widest mb-4 group-hover:underline">The New Minimalism</h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-6">How to master the art of understated luxury this season.</p>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] border-b border-black pb-1">Read Story</span>
            </div>
            <div className="group cursor-pointer">
              <div className="aspect-[3/4] overflow-hidden mb-6 relative">
                <img src="https://picsum.photos/600/800?random=221" alt="Editorial 2" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
              </div>
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-3">Designer Focus</div>
              <h3 className="text-lg font-black uppercase tracking-widest mb-4 group-hover:underline">Meet the Vanguard</h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-6">The emerging designers you need to know right now.</p>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] border-b border-black pb-1">Read Story</span>
            </div>
            <div className="group cursor-pointer">
              <div className="aspect-[3/4] overflow-hidden mb-6 relative">
                <img src="https://picsum.photos/600/800?random=222" alt="Editorial 3" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
              </div>
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-3">Style Guide</div>
              <h3 className="text-lg font-black uppercase tracking-widest mb-4 group-hover:underline">The Ultimate Sneaker Edit</h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-6">From rare drops to everyday classics, find your perfect pair.</p>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] border-b border-black pb-1">Read Story</span>
            </div>
          </div>
        </div>

        {/* Pre-Owned */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row items-center bg-black text-white">
            <div className="w-full md:w-1/2 p-12 md:p-24 flex flex-col justify-center items-start">
              <h2 className="text-4xl font-black uppercase tracking-widest mb-6 leading-tight">Positively<br/>DesignerHub</h2>
              <p className="text-sm font-bold tracking-[0.1em] text-gray-400 leading-relaxed mb-10 max-w-md">
                Discover our curated selection of pre-owned pieces. Give luxury fashion a second life and shop more consciously.
              </p>
              <button className="bg-white text-black px-10 py-4 font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-gray-200 transition-colors">
                Shop Pre-Owned
              </button>
            </div>
            <div className="w-full md:w-1/2 relative aspect-square md:aspect-auto md:h-[600px]">
              <img src="https://picsum.photos/800/800?random=223" alt="Pre-Owned" className="w-full h-full object-cover grayscale" />
            </div>
          </div>
        </div>

        {/* ─── CUSTOMER REVIEWS ─── */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-12 border-b border-gray-100 pb-6">
            <h2 className="text-2xl font-black uppercase tracking-widest">Client Voices</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'James T.', text: 'The curation is impeccable. Found brands I never knew existed. My go-to for luxury.', rating: 5 },
              { name: 'Sophia W.', text: 'Packaging is a work of art. The sneakers arrived in perfect condition. 10/10.', rating: 5 },
              { name: 'Marcus L.', text: 'Pre-owned section is a goldmine. Scored a designer jacket at half price.', rating: 4 },
            ].map((review, i) => (
              <div key={i} className="border border-gray-100 p-8 hover:border-black transition-colors">
                <div className="flex mb-4">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <span key={j} className="text-black text-sm">★</span>
                  ))}
                  {Array.from({ length: 5 - review.rating }).map((_, j) => (
                    <span key={j} className="text-gray-300 text-sm">★</span>
                  ))}
                </div>
                <p className="text-xs text-gray-500 leading-relaxed mb-6 italic">&ldquo;{review.text}&rdquo;</p>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#111]">{review.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ─── SERVICES & VALUE PROPS ─── */}
        <div className="mb-20 bg-black text-white py-16 px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: '✈️', title: 'Global Shipping', desc: 'Express delivery worldwide' },
              { icon: '↩️', title: 'Free Returns', desc: '28-day return policy' },
              { icon: '🔒', title: 'Secure Payment', desc: 'SSL encrypted checkout' },
              { icon: '💬', title: '24/7 Support', desc: 'Personal shopping advisors' },
            ].map((service, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="text-2xl mb-4">{service.icon}</div>
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2">{service.title}</h3>
                <p className="text-[10px] text-gray-400 tracking-widest uppercase">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ─── SUSTAINABILITY ─── */}
        <div className="mb-20">
          <div className="flex flex-col md:flex-row items-center bg-[#f0ede8]">
            <div className="w-full md:w-1/2 relative aspect-square md:aspect-auto md:h-[500px]">
              <img src="https://picsum.photos/800/800?random=225" alt="Sustainability" className="w-full h-full object-cover" />
            </div>
            <div className="w-full md:w-1/2 p-12 md:p-20">
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">Our Commitment</div>
              <h2 className="text-3xl font-black uppercase tracking-widest mb-6 leading-tight">Conscious Fashion</h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-8">
                We partner with brands committed to ethical production, sustainable materials, and reducing fashion&apos;s environmental impact. Every purchase makes a difference.
              </p>
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-black">200+</div>
                  <div className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Sustainable Brands</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-black">Carbon</div>
                  <div className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Neutral Shipping</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-black">100%</div>
                  <div className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Recyclable Packaging</div>
                </div>
              </div>
              <button className="border border-black px-10 py-4 font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* ─── NEWSLETTER ─── */}
        <div className="mb-20 bg-[#111] text-white py-20 px-6 text-center">
          <h2 className="text-3xl font-black uppercase tracking-widest mb-4">Join the Inner Circle</h2>
          <p className="text-sm text-gray-400 mb-8 max-w-md mx-auto">Get early access to sales, new arrivals, and exclusive designer collaborations.</p>
          <div className="flex max-w-md mx-auto border-b border-gray-600 pb-2">
            <input type="email" placeholder="Email address" className="bg-transparent outline-none w-full text-white placeholder-gray-600 text-sm" />
            <button className="text-[10px] font-bold uppercase tracking-[0.2em] hover:text-gray-300 transition-colors shrink-0">Subscribe</button>
          </div>
        </div>

        {/* App Promo */}
        <div className="mb-20 bg-[#f9f9f9] py-24 px-6">
          <div className="w-full mx-auto flex flex-col md:flex-row items-center justify-between">
            <div className="w-full md:w-1/2 mb-12 md:mb-0 md:pr-12">
              <Smartphone className="w-12 h-12 mb-8" />
              <h2 className="text-3xl font-black uppercase tracking-widest mb-6">Download the DesignerHub App</h2>
              <p className="text-sm font-bold tracking-[0.1em] text-gray-500 leading-relaxed mb-8">
                Enjoy a personalized shopping experience, early access to sales, and exclusive app-only promotions.
              </p>
              <ul className="space-y-4 mb-10">
                <li className="flex items-center text-xs font-bold tracking-widest uppercase"><Check className="w-4 h-4 mr-4" /> Visual Search</li>
                <li className="flex items-center text-xs font-bold tracking-widest uppercase"><Check className="w-4 h-4 mr-4" /> Personalized Recommendations</li>
                <li className="flex items-center text-xs font-bold tracking-widest uppercase"><Check className="w-4 h-4 mr-4" /> Instant Updates</li>
              </ul>
              <div className="flex space-x-4">
                <button className="border border-black px-8 py-3 font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-colors">
                  iOS
                </button>
                <button className="border border-black px-8 py-3 font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-colors">
                  Android
                </button>
              </div>
            </div>
            <div className="w-full md:w-1/2 relative h-[500px] hidden md:block">
               <img src="https://picsum.photos/400/800?random=224" alt="App" className="absolute top-0 right-0 w-2/3 rounded-3xl shadow-2xl border-8 border-black" />
            </div>
          </div>
        </div>

      </main>
      <footer className="bg-[#111] text-white py-24">
        <div className="w-full mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24 text-[10px] font-bold uppercase tracking-[0.2em]">
            <div className="flex flex-col space-y-6">
              <h4 className="text-gray-500 mb-4">Customer Service</h4>
              <a href="#" className="hover:text-gray-300 transition-colors">Contact Us</a>
              <a href="#" className="hover:text-gray-300 transition-colors">Orders & Delivery</a>
              <a href="#" className="hover:text-gray-300 transition-colors">Returns & Refunds</a>
              <a href="#" className="hover:text-gray-300 transition-colors">Payment & Pricing</a>
              <a href="#" className="hover:text-gray-300 transition-colors">Cryptocurrency</a>
              <a href="#" className="hover:text-gray-300 transition-colors">Promotion Terms</a>
              <a href="#" className="hover:text-gray-300 transition-colors">FAQs</a>
            </div>
            <div className="flex flex-col space-y-6">
              <h4 className="text-gray-500 mb-4">About DesignerHub</h4>
              <a href="#" className="hover:text-gray-300 transition-colors">About Us</a>
              <a href="#" className="hover:text-gray-300 transition-colors">Investors</a>
              <a href="#" className="hover:text-gray-300 transition-colors">Boutique Partners</a>
              <a href="#" className="hover:text-gray-300 transition-colors">Affiliate Program</a>
              <a href="#" className="hover:text-gray-300 transition-colors">Student Discount</a>
              <a href="#" className="hover:text-gray-300 transition-colors">Careers</a>
              <a href="#" className="hover:text-gray-300 transition-colors">DesignerHub App</a>
            </div>
            <div className="flex flex-col space-y-6">
              <h4 className="text-gray-500 mb-4">Discounts & Membership</h4>
              <a href="#" className="hover:text-gray-300 transition-colors">Access Program</a>
              <a href="#" className="hover:text-gray-300 transition-colors">Refer A Friend</a>
            </div>
            <div className="flex flex-col space-y-6">
              <h4 className="text-gray-500 mb-4">Follow Us</h4>
              <div className="flex space-x-6 mb-8">
                <a href="#" className="hover:text-gray-300 transition-colors"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="hover:text-gray-300 transition-colors"><Facebook className="w-5 h-5" /></a>
                <a href="#" className="hover:text-gray-300 transition-colors"><Twitter className="w-5 h-5" /></a>
                <a href="#" className="hover:text-gray-300 transition-colors"><Youtube className="w-5 h-5" /></a>
              </div>
              <h4 className="text-gray-500 mb-4">Newsletter</h4>
              <p className="text-gray-400 normal-case tracking-normal font-medium text-xs mb-4">Sign up for exclusive early sale access and tailored new arrivals.</p>
              <div className="flex border-b border-gray-600 pb-2">
                <input type="email" placeholder="Email address" className="bg-transparent outline-none w-full text-white placeholder-gray-600" />
                <button className="hover:text-gray-300 transition-colors"><ArrowRight className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
          
          <div className="pt-12 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between text-[9px] font-bold uppercase tracking-[0.2em] text-gray-500">
            <span className="mb-6 md:mb-0">© 2026 DesignerHub UK LIMITED. ALL RIGHTS RESERVED.</span>
            <div className="flex flex-wrap justify-center gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
              <a href="#" className="hover:text-white transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

