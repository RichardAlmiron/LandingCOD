'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { StoreData, Product } from '@/lib/types';
import { useCart } from '@/contexts/CartContext';
import { Search, ShoppingBag, Heart, User, MapPin, Menu, X } from 'lucide-react';
import { usePagination, ProductPagination } from '@/components/componentes-compartidos/templates/Pagination';

export default function EliteStoreTemplate({ data }: { data: StoreData }) {
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
    <div className="min-h-full bg-white font-sans text-[#111] selection:bg-[#111] selection:text-white overflow-x-hidden">

      {/* ─── UTILITY BAR ─── */}
      <div className="bg-[#111] text-white text-[11px] py-2 px-6 flex justify-between items-center font-bold tracking-[0.1em] uppercase">
        <div className="hidden md:flex space-x-4">
          <a href="#" className="hover:text-gray-300 transition-colors">United States | USD</a>
          <a href="#" className="hover:text-gray-300 transition-colors">Stores & Events</a>
        </div>
        <div className="flex-1 text-center">
          Free Shipping & Returns on All Orders. Use Code: FREESHIP
        </div>
        <div className="hidden md:flex space-x-4">
          <a href="#" className="hover:text-gray-300 transition-colors">Customer Service</a>
          <a href="#" className="hover:text-gray-300 transition-colors">EliteStoreFirst</a>
        </div>
      </div>

      {/* ─── HEADER ─── */}
      <header className="bg-white sticky top-0 z-50 border-b border-gray-200 transition-all">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 pt-6 pb-4 flex items-center justify-between">

          <div className="flex items-center space-x-6 flex-1">
            <div className="hidden lg:flex items-center border-b border-gray-300 pb-1 w-64 group focus-within:border-[#111] transition-colors">
              <input type="text" placeholder="Search for Designers, Brands, Items..." className="bg-transparent outline-none text-[12px] uppercase tracking-widest w-full placeholder-gray-400 font-medium" />
              <Search className="w-4 h-4 text-gray-400 group-focus-within:text-[#111] transition-colors" strokeWidth={2} />
            </div>
            {/* Mobile menu icon */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          <div className="flex flex-col items-center justify-center cursor-pointer flex-none">
            <span className="font-serif text-[40px] tracking-tight leading-none text-[#111] relative">
              EliteStore
              <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-transparent"></span>
            </span>
          </div>

          <div className="flex items-center justify-end space-x-5 lg:space-x-7 flex-1 text-[#111]">
            <Search className="lg:hidden w-5 h-5 cursor-pointer hover:text-gray-500 transition-colors" strokeWidth={1.5} />
            <div className="hidden xl:flex items-center cursor-pointer hover:text-gray-500 transition-colors font-bold text-[11px] uppercase tracking-widest space-x-2">
              <User className="w-5 h-5" strokeWidth={1.5} />
              <span>Sign In</span>
            </div>
            <div 
              onClick={() => toggleFavorite('header')}
              className="cursor-pointer hover:text-gray-500 transition-colors hidden sm:block relative"
            >
              <Heart className={`w-6 h-6 ${favorites.length > 0 ? 'fill-red-500 text-red-500' : ''}`} strokeWidth={1.5} />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{favorites.length}</span>
              )}
            </div>
            <div 
              onClick={() => setIsCartOpen(true)}
              className="relative cursor-pointer hover:text-gray-500 transition-colors flex items-center"
            >
              <ShoppingBag className="w-6 h-6" strokeWidth={1.5} />
              {itemCount > 0 && (
                <div className="bg-[#111] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center absolute -top-1 -right-1">{itemCount}</div>
              )}
            </div>
          </div>
        </div>

        {/* ─── NAVIGATION ─── */}
        <nav className="hidden lg:flex justify-center space-x-8 xl:space-x-10 py-4 text-[11px] font-bold uppercase tracking-[0.15em] text-[#111]">
          <a href="#" className="hover:text-gray-500 transition-colors">Designers</a>
          <a href="#" className="hover:text-gray-500 transition-colors">Women</a>
          <a href="#" className="hover:text-gray-500 transition-colors">Men</a>
          <a href="#" className="hover:text-gray-500 transition-colors">Shoes</a>
          <a href="#" className="hover:text-gray-500 transition-colors">Handbags</a>
          <a href="#" className="hover:text-gray-500 transition-colors">Jewelry & Accessories</a>
          <a href="#" className="hover:text-gray-500 transition-colors">Beauty</a>
          <a href="#" className="hover:text-gray-500 transition-colors">Home</a>
          <a href="#" className="text-red-600 hover:text-red-400 transition-colors">Sale</a>
        </nav>
      </header>

      <main className="w-full">

        {/* ─── HERO EDITORIAL BANNER ─── */}
        <section className="relative w-full h-[600px] lg:h-[750px] group cursor-pointer mb-16 xl:mb-24 flex items-center border-b border-gray-100">
          <Image
            src={data.bannerImage}
            alt="EliteStore Editorial Banner"
            fill
            className="object-cover object-top"
            priority
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/10 transition-colors" />

          <div className="relative z-10 max-w-[1400px] w-full mx-auto px-4 md:px-12 flex justify-start items-center">
            <div className="bg-white/95 p-10 lg:p-14 max-w-xl text-center shadow-2xl">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-4 text-gray-500">The Pre-Fall Collection</h2>
              <h1 className="text-[40px] lg:text-[56px] font-serif tracking-tight mb-4 leading-none text-[#111]">
                {data.name}
              </h1>
              <p className="text-[14px] font-medium text-gray-600 mb-8 max-w-sm mx-auto leading-relaxed">
                {data.description || 'Discover refined silhouettes and unexpected textures from the world\'s most coveted fashion houses.'}
              </p>
              <button className="bg-[#111] text-white px-12 py-4 font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-gray-800 transition-colors border border-[#111]">
                Explore The Edit
              </button>
            </div>
          </div>
        </section>

        {/* ─── DESIGNER SHOWCASE ─── */}
        <section className="max-w-[1400px] mx-auto px-4 lg:px-8 mb-24">
          <div className="flex flex-col items-center mb-16 text-center">
            <h2 className="text-[32px] font-serif tracking-tighter text-[#111] mb-4">Trending Icons</h2>
            <div className="h-[1px] w-24 bg-[#111]"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group cursor-pointer">
              <div className="relative aspect-[3/4] overflow-hidden mb-6 bg-gray-50">
                <Image src="https://picsum.photos/600/800?random=1111" alt="Designer 1" fill className="object-cover group-hover:scale-[1.03] transition-transform duration-[2000ms]" />
              </div>
              <h3 className="font-serif text-[24px] text-[#111] text-center mb-2">MilanoModern</h3>
              <p className="font-medium text-[12px] uppercase tracking-widest text-gray-500 text-center hover:text-[#111] transition-colors underline underline-offset-4 decoration-transparent hover:decoration-[#111]">Shop Now</p>
            </div>
            <div className="group cursor-pointer">
              <div className="relative aspect-[3/4] overflow-hidden mb-6 bg-gray-50">
                <Image src="https://picsum.photos/600/800?random=1112" alt="Designer 2" fill className="object-cover group-hover:scale-[1.03] transition-transform duration-[2000ms]" />
              </div>
              <h3 className="font-serif text-[24px] text-[#111] text-center mb-2">Givenchy</h3>
              <p className="font-medium text-[12px] uppercase tracking-widest text-gray-500 text-center hover:text-[#111] transition-colors underline underline-offset-4 decoration-transparent hover:decoration-[#111]">Shop Now</p>
            </div>
            <div className="group cursor-pointer">
              <div className="relative aspect-[3/4] overflow-hidden mb-6 bg-gray-50">
                <Image src="https://picsum.photos/600/800?random=1113" alt="Designer 3" fill className="object-cover group-hover:scale-[1.03] transition-transform duration-[2000ms]" />
              </div>
              <h3 className="font-serif text-[24px] text-[#111] text-center mb-2">Brunello Cucinelli</h3>
              <p className="font-medium text-[12px] uppercase tracking-widest text-gray-500 text-center hover:text-[#111] transition-colors underline underline-offset-4 decoration-transparent hover:decoration-[#111]">Shop Now</p>
            </div>
          </div>
        </section>

        {/* ─── NEW ARRIVALS WITH PAGINATION ─── */}
        <section className="bg-[#fcfcfc] border-y border-gray-100 py-24">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
            <div className="flex items-end justify-between mb-12 border-b border-gray-200 pb-4">
              <h2 className="text-[28px] md:text-[36px] font-serif tracking-tighter text-[#111]">Just Arrived ({totalItems})</h2>
              <a href="#" className="text-[11px] font-bold uppercase tracking-widest hover:text-gray-500 transition-colors hidden sm:block">View All</a>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-10">
              {paginatedItems.map((product, idx) => (
                <div key={product.id || idx} data-product-id={product.id} className="group cursor-pointer flex flex-col relative">
                  {/* Favorite Button */}
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }}
                    className="absolute top-2 right-2 z-10 p-2 bg-white/90 rounded-full shadow-sm text-gray-400 hover:text-red-500 hover:bg-white w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Heart className={`w-4 h-4 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>

                  <div className="relative aspect-[3/4] mb-4 overflow-hidden bg-[#f4f4f4] flex items-center justify-center">
                    <Image
                      src={product.imageUrl}
                      alt={product.title}
                      fill
                      className="object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-[1500ms]"
                      referrerPolicy="no-referrer"
                    />
                    {(idx === 1 || idx === 3) && (
                      <div className="absolute bottom-0 left-0 bg-white/90 backdrop-blur-sm text-[#111] text-[9px] font-bold uppercase tracking-widest px-3 py-1.5">
                        Exclusive
                      </div>
                    )}
                    {/* Add to Cart */}
                    <button 
                      onClick={(e) => handleAddToCart(product, e)}
                      className="absolute bottom-2 left-2 right-2 bg-[#111] text-white text-[10px] font-bold uppercase tracking-widest py-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Add to Bag
                    </button>
                  </div>

                  <div className="flex flex-col text-center">
                    <div className="text-[11px] font-bold uppercase tracking-widest text-[#111] mb-1">
                      {product.category || 'Designer Brand'}
                    </div>
                    <h3 className="text-[12px] text-gray-600 font-medium leading-relaxed line-clamp-1 mb-2">
                      {product.title}
                    </h3>
                    <div className="flex items-center justify-center space-x-2">
                      <span className="font-sans font-medium text-[13px] text-[#111]">${product.price}</span>
                      {product.originalPrice && <span className="text-[11px] text-red-500 line-through">${product.originalPrice}</span>}
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
        </section>

        {/* ─── EDITORIAL FEATURE ─── */}
        <section className="max-w-[1400px] mx-auto px-4 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="group cursor-pointer relative aspect-[4/5] overflow-hidden bg-gray-50">
              <Image src="https://picsum.photos/800/1000?random=1114" alt="Editorial 1" fill className="object-cover group-hover:scale-105 transition-transform duration-[2000ms]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-12 left-12 right-12 text-white">
                <div className="text-[10px] font-bold uppercase tracking-[0.3em] mb-3 text-gray-300">The Edit</div>
                <h3 className="font-serif text-[32px] tracking-tight mb-6">Resort Collection 2026</h3>
                <button className="bg-white text-[#111] px-10 py-3 font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-gray-200 transition-colors">Discover</button>
              </div>
            </div>
            <div className="group cursor-pointer relative aspect-[4/5] overflow-hidden bg-gray-50">
              <Image src="https://picsum.photos/800/1000?random=1115" alt="Editorial 2" fill className="object-cover group-hover:scale-105 transition-transform duration-[2000ms]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-12 left-12 right-12 text-white">
                <div className="text-[10px] font-bold uppercase tracking-[0.3em] mb-3 text-gray-300">Home & Living</div>
                <h3 className="font-serif text-[32px] tracking-tight mb-6">Artisan Home Décor</h3>
                <button className="bg-white text-[#111] px-10 py-3 font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-gray-200 transition-colors">Shop Now</button>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SHOP BY CATEGORY ─── */}
        <section className="max-w-[1400px] mx-auto px-4 lg:px-8 pb-24">
          <div className="flex flex-col items-center mb-16 text-center">
            <h2 className="text-[32px] font-serif tracking-tighter text-[#111] mb-4">Shop by Category</h2>
            <div className="h-[1px] w-24 bg-[#111]"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {[
              { name: 'Women', img: 'https://picsum.photos/300/300?random=1120' },
              { name: 'Men', img: 'https://picsum.photos/300/300?random=1121' },
              { name: 'Shoes', img: 'https://picsum.photos/300/300?random=1122' },
              { name: 'Handbags', img: 'https://picsum.photos/300/300?random=1123' },
              { name: 'Beauty', img: 'https://picsum.photos/300/300?random=1124' },
              { name: 'Home', img: 'https://picsum.photos/300/300?random=1125' },
            ].map((cat, i) => (
              <div key={i} className="group cursor-pointer text-center">
                <div className="relative aspect-square overflow-hidden rounded-full mb-4 border-2 border-gray-100 group-hover:border-[#111] transition-all">
                  <Image src={cat.img} alt={cat.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <h4 className="font-bold text-[11px] uppercase tracking-widest group-hover:text-gray-500 transition-colors">{cat.name}</h4>
              </div>
            ))}
          </div>
        </section>

        {/* ─── TRENDING PICKS ─── */}
        <section className="bg-white py-24 border-y border-gray-100">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
            <div className="flex items-end justify-between mb-12 border-b border-gray-200 pb-4">
              <h2 className="text-[28px] md:text-[36px] font-serif tracking-tighter text-[#111]">Trending Now</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {data.products.slice(0, 4).map((product, i) => (
                <div key={`trend-${i}`} className="group cursor-pointer">
                  <div className="relative aspect-[3/4] overflow-hidden bg-[#f4f4f4] mb-4">
                    <Image src={product.imageUrl} alt={product.title} fill className="object-cover group-hover:scale-105 transition-transform duration-[1500ms]" referrerPolicy="no-referrer" />
                    <button onClick={(e) => handleAddToCart(product, e)} className="absolute bottom-2 left-2 right-2 bg-[#111] text-white text-[10px] font-bold uppercase tracking-widest py-2 opacity-0 group-hover:opacity-100 transition-opacity">Add to Bag</button>
                  </div>
                  <h3 className="text-[12px] font-bold uppercase tracking-widest line-clamp-1 mb-1">{product.title}</h3>
                  <span className="font-medium text-[13px]">${product.price}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CUSTOMER REVIEWS ─── */}
        <section className="max-w-[1400px] mx-auto px-4 lg:px-8 py-24">
          <div className="flex flex-col items-center mb-16 text-center">
            <h2 className="text-[32px] font-serif tracking-tighter text-[#111] mb-4">Client Testimonials</h2>
            <div className="h-[1px] w-24 bg-[#111]"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { name: 'Victoria H.', text: 'EliteStoreFirst rewards are unmatched. The personal styling service transformed my wardrobe.', stars: 5 },
              { name: 'Jonathan P.', text: 'Exceptional designer selection and impeccable customer service. My luxury destination.', stars: 5 },
              { name: 'Sophia R.', text: 'Free shipping and returns make online shopping effortless. The quality never disappoints.', stars: 5 },
            ].map((review, i) => (
              <div key={i} className="text-center p-8 border border-gray-100 hover:border-[#111] transition-colors">
                <div className="flex justify-center mb-4">{Array.from({ length: review.stars }).map((_, j) => <span key={j} className="text-[#111] text-lg">★</span>)}</div>
                <p className="text-[13px] font-medium text-gray-600 mb-6 leading-relaxed italic">"{review.text}"</p>
                <p className="text-[11px] font-bold uppercase tracking-widest">{review.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── LOYALTY PROGRAM ─── */}
        <section className="max-w-[1400px] mx-auto px-4 lg:px-8 pb-24">
          <div className="bg-[#111] text-white rounded-lg p-12 lg:p-20 flex flex-col lg:flex-row items-center justify-between">
            <div className="mb-8 lg:mb-0 max-w-lg text-center lg:text-left">
              <h2 className="font-serif text-[36px] tracking-tight mb-4">EliteStoreFirst</h2>
              <p className="text-gray-400 text-[14px] font-medium leading-relaxed mb-8">Join our exclusive loyalty program. Earn points on every purchase, enjoy free shipping, and unlock access to private sales and events.</p>
              <button className="bg-white text-[#111] px-12 py-4 font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-gray-200 transition-colors">Join Now — It&apos;s Free</button>
            </div>
            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-[28px] font-serif mb-2">3x</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Points on Beauty</div>
              </div>
              <div>
                <div className="text-[28px] font-serif mb-2">Free</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Shipping Always</div>
              </div>
              <div>
                <div className="text-[28px] font-serif mb-2">VIP</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Private Events</div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── APP DOWNLOAD ─── */}
        <section className="max-w-[1400px] mx-auto px-4 lg:px-8 pb-24">
          <div className="bg-gray-50 border border-gray-100 rounded-lg p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0">
              <h2 className="font-serif text-[28px] tracking-tight mb-3">Download the EliteStore App</h2>
              <p className="text-gray-500 text-[13px] font-medium max-w-md">Shop designer collections, manage your EliteStoreFirst rewards, and get exclusive app-only offers.</p>
            </div>
            <div className="flex gap-4">
              <button className="bg-[#111] text-white px-8 py-3 font-bold text-[11px] uppercase tracking-widest hover:bg-gray-800 transition-colors rounded-lg">App Store</button>
              <button className="bg-[#111] text-white px-8 py-3 font-bold text-[11px] uppercase tracking-widest hover:bg-gray-800 transition-colors rounded-lg">Google Play</button>
            </div>
          </div>
        </section>

        {/* ─── VALUE PROPS ─── */}
        <section className="max-w-[1400px] mx-auto px-4 lg:px-8 py-20 border-b border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-gray-200">
            <div className="flex flex-col items-center pt-8 md:pt-0">
              <MapPin className="w-8 h-8 mb-4 text-[#111] font-light" strokeWidth={1} />
              <h4 className="font-serif text-[20px] mb-2 text-[#111]">Store Locator</h4>
              <p className="text-gray-500 text-[13px] max-w-xs mx-auto mb-4">Find your nearest EliteStore store and discover exclusive in-store services.</p>
              <a href="#" className="text-[11px] font-bold uppercase tracking-widest text-[#111] underline underline-offset-4 hover:text-gray-500 transition-colors">Find A Store</a>
            </div>
            <div className="flex flex-col items-center pt-8 md:pt-0">
              <User className="w-8 h-8 mb-4 text-[#111] font-light" strokeWidth={1} />
              <h4 className="font-serif text-[20px] mb-2 text-[#111]">Personal Styling</h4>
              <p className="text-gray-500 text-[13px] max-w-xs mx-auto mb-4">Let our elite style advisors curate the perfect wardrobe, exclusively for you.</p>
              <a href="#" className="text-[11px] font-bold uppercase tracking-widest text-[#111] underline underline-offset-4 hover:text-gray-500 transition-colors">Book An Appointment</a>
            </div>
            <div className="flex flex-col items-center pt-8 md:pt-0">
              <ShoppingBag className="w-8 h-8 mb-4 text-[#111] font-light" strokeWidth={1} />
              <h4 className="font-serif text-[20px] mb-2 text-[#111]">EliteStoreFirst Rewards</h4>
              <p className="text-gray-500 text-[13px] max-w-xs mx-auto mb-4">Earn points on every purchase and unlock unparalleled access to luxury.</p>
              <a href="#" className="text-[11px] font-bold uppercase tracking-widest text-[#111] underline underline-offset-4 hover:text-gray-500 transition-colors">Join Now</a>
            </div>
          </div>
        </section>

      </main>

      {/* ─── FOOTER ─── */}
      <footer className="bg-white pt-24 pb-12">
        <div className="w-full max-w-[1400px] mx-auto px-4 lg:px-8">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">

            <div className="flex flex-col space-y-6 lg:pr-12">
              <span className="font-serif text-[32px] tracking-tighter leading-none text-[#111] block mb-4">
                EliteStore
              </span>
              <p className="text-[13px] text-gray-500 leading-relaxed max-w-xs">
                Subscribe to receive email updates and be the first to know about new arrivals, sales & promotions.
              </p>
              <form className="flex w-full border-b border-[#111] pb-1">
                <input type="email" placeholder="EMAIL ADDRESS" className="bg-transparent outline-none flex-1 font-bold text-[11px] uppercase tracking-widest placeholder-gray-400 focus:placeholder-gray-300" />
                <button type="button" className="text-[#111] font-bold uppercase tracking-widest text-[11px] hover:text-gray-500 transition-colors">
                  Sign Up
                </button>
              </form>
            </div>

            <div className="flex flex-col space-y-4 text-[11px] font-bold uppercase tracking-widest text-gray-500">
              <h4 className="text-[#111] mb-2 tracking-[0.2em]">Customer Service</h4>
              <a href="#" className="hover:text-[#111] transition-colors">Contact Us</a>
              <a href="#" className="hover:text-[#111] transition-colors">Shipping Information</a>
              <a href="#" className="hover:text-[#111] transition-colors">Returns & Exchanges</a>
              <a href="#" className="hover:text-[#111] transition-colors">Order Status</a>
              <a href="#" className="hover:text-[#111] transition-colors">FAQs</a>
            </div>

            <div className="flex flex-col space-y-4 text-[11px] font-bold uppercase tracking-widest text-gray-500">
              <h4 className="text-[#111] mb-2 tracking-[0.2em]">Services</h4>
              <a href="#" className="hover:text-[#111] transition-colors">Personal Styling</a>
              <a href="#" className="hover:text-[#111] transition-colors">EliteStoreFirst Program</a>
              <a href="#" className="hover:text-[#111] transition-colors">EliteStore MasterCard</a>
              <a href="#" className="hover:text-[#111] transition-colors">Gift Cards</a>
            </div>

            <div className="flex flex-col space-y-4 text-[11px] font-bold uppercase tracking-widest text-gray-500">
              <h4 className="text-[#111] mb-2 tracking-[0.2em]">About EliteStore</h4>
              <a href="#" className="hover:text-[#111] transition-colors">Our History</a>
              <a href="#" className="hover:text-[#111] transition-colors">Careers</a>
              <a href="#" className="hover:text-[#111] transition-colors">Investors</a>
              <a href="#" className="hover:text-[#111] transition-colors">Corporate Responsibility</a>
            </div>

          </div>

          <div className="pt-8 border-t border-gray-100 flex flex-col items-center justify-center text-[10px] font-bold uppercase tracking-widest text-gray-400 space-y-6">
            <div className="flex flex-wrap justify-center space-x-6">
              <a href="#" className="hover:text-[#111] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#111] transition-colors">Terms of Use</a>
              <a href="#" className="hover:text-[#111] transition-colors">Supply Chain Disclosure</a>
              <a href="#" className="hover:text-[#111] transition-colors">Do Not Sell My Personal Information</a>
            </div>
            <span>© 2026 ELITESTORE. ALL RIGHTS RESERVED.</span>
          </div>

        </div>
      </footer>
    </div>
  );
}

