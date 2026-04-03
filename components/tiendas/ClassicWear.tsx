'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { StoreData, Product } from '@/lib/types';
import { useCart } from '@/contexts/CartContext';
import { Search, ShoppingBag, User, Menu, MapPin, ChevronDown, ArrowRight, Star, Leaf, CreditCard, Facebook, Twitter, Instagram, Youtube, Heart, X } from 'lucide-react';
import { usePagination, ProductPagination } from '@/components/componentes-compartidos/templates/Pagination';

export default function ClassicWearTemplate({ data }: { data: StoreData }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { addToCart: addToCartContext, itemCount, setIsCartOpen } = useCart();
  const [favorites, setFavorites] = useState<string[]>([]);
  
  const gapBlue = "#002868";
  
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
    <div className="min-h-full bg-white font-sans text-[#111] selection:bg-[#002868] selection:text-white pb-0 overflow-x-hidden">

      {/* ─── GLOBAL BRAND TABS ─── */}
      <div className="bg-[#002868] text-white py-0 flex items-stretch h-[40px] border-b border-[#002868]">
        <div className="flex w-full">
          <a href="#" className="flex-1 max-w-[120px] flex items-center justify-center bg-white text-[#002868] font-serif font-bold text-[18px] leading-none">
            ClassicWear
          </a>
          <a href="#" className="flex-1 max-w-[140px] flex items-center justify-center font-bold text-[12px] uppercase tracking-wider text-blue-100 hover:text-white hover:bg-white/10 transition-colors border-l border-white/20">
            FamilyFun
          </a>
          <a href="#" className="flex-1 max-w-[160px] flex items-center justify-center font-bold text-[12px] uppercase tracking-wider text-blue-100 hover:text-white hover:bg-white/10 transition-colors border-l border-white/20">
            Banana Republic
          </a>
          <a href="#" className="flex-1 max-w-[120px] flex items-center justify-center font-bold text-[12px] uppercase tracking-wider text-blue-100 hover:text-white hover:bg-white/10 transition-colors border-l border-white/20">
            Athleta
          </a>
        </div>
        <div className="hidden md:flex ml-auto items-center px-6 text-[11px] font-bold uppercase tracking-widest bg-[#001f52]">
          Free Shipping on $50+ for Rewards Members
        </div>
      </div>

      {/* ─── PROMO STRIP ─── */}
      <div className="bg-[#f0f4f8] text-[#002868] py-2.5 px-6 flex justify-center text-center border-b border-gray-200">
        <span className="font-bold text-[12px] md:text-[14px] uppercase tracking-widest flex flex-col md:flex-row items-center">
          <span>Extra 20% Off Your Purchase!</span>
          <span className="md:ml-2 font-black">Use Code: YOURS <a href="#" className="ml-2 underline font-bold text-[10px]">Details</a></span>
        </span>
      </div>

      {/* ─── HEADER ─── */}
      <header className="bg-white sticky top-0 z-50 shadow-sm transition-all h-[75px] md:h-[85px] border-b border-gray-200">
        <div className="w-full mx-auto px-4 md:px-8 h-full flex items-center justify-between">

          <div className="flex items-center">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 mr-2 hover:text-[#002868] transition-colors"
            >
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>

            <div className="hidden lg:flex items-center cursor-pointer mr-10 bg-[#002868] text-white px-3 py-1.5 h-full">
              <span className="font-serif font-black text-[38px] tracking-tighter leading-none mb-1">
                ClassicWear
              </span>
            </div>

            <div className="lg:hidden flex items-center cursor-pointer mr-6 text-[#002868]">
              <span className="font-serif font-black text-[32px] tracking-tighter leading-none">
                ClassicWear
              </span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex space-x-6 xl:space-x-8 font-bold text-[13px] uppercase tracking-widest text-[#002868] mt-1 pr-6">
              <a href="#" className="hover:text-blue-500 transition-colors">New</a>
              <a href="#" className="hover:text-blue-500 transition-colors">Women</a>
              <a href="#" className="hover:text-blue-500 transition-colors">Men</a>
              <a href="#" className="hover:text-blue-500 transition-colors">Girls</a>
              <a href="#" className="hover:text-blue-500 transition-colors">Boys</a>
              <a href="#" className="hover:text-blue-500 transition-colors">Toddler</a>
              <a href="#" className="hover:text-blue-500 transition-colors">Baby</a>
              <a href="#" className="text-red-700 hover:text-red-500 transition-colors">Sale</a>
            </nav>
          </div>

          <div className="flex items-center space-x-5 lg:space-x-6 text-[#002868]">
            <div className="hidden xl:flex items-center border-b-[2px] border-gray-300 pb-1 w-64 focus-within:border-[#002868] transition-colors relative">
              <input type="text" placeholder="Search" className="bg-transparent outline-none text-[14px] w-full font-bold placeholder-gray-500 text-[#002868]" />
              <Search className="w-5 h-5 text-[#002868] absolute right-0" />
            </div>
            <Search className="w-6 h-6 xl:hidden cursor-pointer" />

            <div className="hidden md:flex items-center cursor-pointer hover:opacity-70 transition-opacity">
              <span className="text-[12px] font-bold uppercase tracking-widest mr-2 underline underline-offset-4 decoration-2">Sign In</span>
              <User className="w-6 h-6" />
            </div>

            <div 
              onClick={() => toggleFavorite('header')}
              className="hidden md:block relative cursor-pointer hover:opacity-70 transition-opacity"
            >
              <Heart className={`w-6 h-6 ${favorites.length > 0 ? 'fill-red-500 text-red-500' : ''}`} />
              {favorites.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full">{favorites.length}</span>
              )}
            </div>

            <div 
              onClick={() => setIsCartOpen(true)}
              className="relative cursor-pointer hover:opacity-70 transition-opacity"
            >
              <ShoppingBag className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute -bottom-2 -right-2 bg-[#002868] text-white text-[11px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">{itemCount}</span>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="w-full">

        {/* ─── HERO BANNER ─── */}
        <section className="relative w-full h-[500px] md:h-[650px] flex justify-center items-center overflow-hidden mb-12 border-b-8 border-[#002868]">
          <Image
            src={data.bannerImage}
            alt="Hero Banner"
            fill
            className="object-cover object-top"
            priority
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-6">
            <div className="max-w-3xl text-center">
              <h1 className="text-[50px] md:text-[80px] font-serif tracking-tight leading-[0.9] mb-4 drop-shadow-md">
                {data.name}
              </h1>
              <p className="text-[18px] md:text-[24px] font-bold uppercase tracking-widest mb-10 drop-shadow-md max-w-2xl mx-auto">
                {data.description || 'American style for every generation.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-[#002868] px-10 py-4 font-black uppercase tracking-widest text-[14px] hover:bg-gray-100 transition-colors min-w-[200px]">
                  Shop Women
                </button>
                <button className="bg-white text-[#002868] px-10 py-4 font-black uppercase tracking-widest text-[14px] hover:bg-gray-100 transition-colors min-w-[200px]">
                  Shop Men
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ─── PROMO BANNER SUBHERO ─── */}
        <section className="max-w-[1400px] mx-auto px-4 md:px-8 mb-16">
          <div className="bg-[#002868] text-white p-6 md:p-10 flex flex-col md:flex-row items-center justify-between text-center md:text-left relative overflow-hidden">
            <div className="relative z-10 mb-6 md:mb-0">
              <h2 className="text-[28px] md:text-[40px] font-bold uppercase tracking-tighter leading-none mb-2">The Big Spring Sale</h2>
              <p className="text-[16px] md:text-[20px] font-serif italic">Up to 60% off select styles. Online & In-Store.</p>
            </div>
            <div className="relative z-10">
              <button className="bg-white text-[#002868] px-8 py-3 font-bold uppercase tracking-widest text-[13px] hover:bg-gray-200 transition-colors whitespace-nowrap">
                Shop The Sale
              </button>
            </div>
            <div className="absolute right-0 -bottom-10 opacity-10 font-serif text-[150px] leading-none pointer-events-none">SALE</div>
          </div>
        </section>

        {/* ─── NEW ARRIVALS GRID (Paginated) ─── */}
        <section className="px-4 md:px-8 max-w-[1600px] mx-auto mb-20">
          <div className="text-center mb-10">
            <h2 className="text-[32px] md:text-[44px] font-serif text-[#002868] leading-none mb-4">Trending Now ({totalItems})</h2>
            <a href="#" className="text-[13px] font-bold uppercase tracking-widest text-gray-500 hover:text-[#002868] hover:underline underline-offset-4 transition-colors">
              Shop New Arrivals
            </a>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 md:gap-x-4 gap-y-8">
            {paginatedItems.map((product, idx) => (
              <div key={product.id || idx} data-product-id={product.id} className="group cursor-pointer flex flex-col">
                <div className="relative aspect-[3/4] mb-3 bg-gray-100 overflow-hidden">
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  {idx % 3 === 0 && (
                    <div className="absolute top-0 left-0 bg-white text-[#002868] text-[9px] font-bold px-2 py-1 uppercase tracking-widest shadow-sm">
                      New
                    </div>
                  )}
                  {idx % 4 === 1 && (
                    <div className="absolute top-0 left-0 bg-red-700 text-white text-[9px] font-bold px-2 py-1 uppercase tracking-widest shadow-sm">
                      Best
                    </div>
                  )}
                  {/* Quick Shop Overlay */}
                  <div className="absolute bottom-0 left-0 w-full p-3 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <button 
                      onClick={(e) => handleAddToCart(product, e)}
                      className="w-full bg-white/95 backdrop-blur-md text-[#002868] py-2 text-center text-[11px] font-bold uppercase tracking-widest shadow-lg hover:bg-[#002868] hover:text-white border border-gray-200 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }}
                    className="absolute top-2 right-2 bg-white/80 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:text-red-500"
                  >
                    <Heart className={`w-3.5 h-3.5 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : ''}`} strokeWidth={2} />
                  </button>
                </div>

                <div className="flex flex-col flex-1">
                  {/* Swatches (Heritage Style) */}
                  <div className="flex gap-1 mb-2">
                    <div className="w-4 h-4 bg-[#002868] rounded-full border border-gray-300 shadow-sm"></div>
                    <div className="w-4 h-4 bg-stone-300 rounded-full border border-gray-300 shadow-sm"></div>
                    <div className="w-4 h-4 bg-white rounded-full border border-gray-300 shadow-sm"></div>
                    {idx % 2 === 0 && <span className="text-[10px] font-medium text-gray-500 flex items-center ml-1">+2</span>}
                  </div>

                  <h3 className="text-[12px] font-medium text-gray-800 line-clamp-2 leading-tight mb-1 group-hover:text-[#002868] transition-colors">
                    {product.title}
                  </h3>

                  <div className="flex flex-col mb-1 mt-auto">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-[14px] font-bold text-[#002868]">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-[11px] font-medium text-gray-500 line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] font-bold text-red-700 uppercase tracking-widest mt-1">
                      Extra 20% Off
                    </span>
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
        </section>

        {/* ─── THE DENIM SHOP ─── */}
        <section className="max-w-[1600px] mx-auto px-4 md:px-8 mb-20 md:mb-24">
          <div className="bg-[#f0f4f8] flex flex-col-reverse lg:flex-row">
            <div className="w-full lg:w-1/2 p-10 md:p-16 lg:p-24 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
              <h2 className="text-[40px] md:text-[60px] font-serif text-[#002868] leading-none mb-6">The Denim Shop</h2>
              <p className="text-[16px] md:text-[18px] font-medium text-gray-700 mb-10 max-w-md leading-relaxed">
                Fits for every body. Washes for every mood. Find your perfect pair with decades of denim expertise.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <button className="bg-[#002868] text-white px-10 py-4 font-bold uppercase tracking-widest text-[13px] hover:bg-transparent hover:text-[#002868] border-2 border-[#002868] transition-colors w-full sm:w-auto">
                  Women's Denim
                </button>
                <button className="bg-[#002868] text-white px-10 py-4 font-bold uppercase tracking-widest text-[13px] hover:bg-transparent hover:text-[#002868] border-2 border-[#002868] transition-colors w-full sm:w-auto">
                  Men's Denim
                </button>
              </div>
            </div>
            <div className="w-full lg:w-1/2 relative aspect-square lg:aspect-auto min-h-[400px]">
              <Image src="https://picsum.photos/1000/1000?random=850" alt="Denim Heritage" fill className="object-cover" />
            </div>
          </div>
        </section>

        {/* ─── SHOP BY CATEGORY ─── */}
        <section className="px-4 md:px-8 max-w-[1600px] mx-auto mb-20 md:mb-24">
          <div className="text-center mb-10">
            <h2 className="text-[32px] md:text-[44px] font-serif text-[#002868] leading-none">Shop By Category</h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
            {[
              { name: 'Jeans', img: 'https://picsum.photos/400/500?random=860' },
              { name: 'Tees & Tanks', img: 'https://picsum.photos/400/500?random=861' },
              { name: 'Sweatshirts', img: 'https://picsum.photos/400/500?random=862' },
              { name: 'Dresses', img: 'https://picsum.photos/400/500?random=863' },
              { name: 'Activewear', img: 'https://picsum.photos/400/500?random=864' },
              { name: 'Accessories', img: 'https://picsum.photos/400/500?random=865' },
            ].map((category, i) => (
              <div key={i} className="group cursor-pointer flex flex-col items-center">
                <div className="relative aspect-[4/5] w-full mb-4 overflow-hidden rounded-sm bg-gray-100">
                  <Image src={category.img} alt={category.name} fill className="object-cover group-hover:scale-[1.03] transition-transform duration-700" />
                </div>
                <h3 className="text-[14px] font-bold uppercase tracking-widest text-[#002868] group-hover:underline underline-offset-4 decoration-2">
                  {category.name}
                </h3>
              </div>
            ))}
          </div>
        </section>

        {/* ─── ClassicWear FOR GOOD (SUSTAINABILITY) ─── */}
        <section className="px-4 md:px-8 max-w-[1600px] mx-auto mb-20">
          <div className="relative h-[400px] md:h-[500px] flex items-center justify-center text-center overflow-hidden bg-stone-100">
            <Image src="https://picsum.photos/1600/600?random=870" alt="Sustainability" fill className="object-cover opacity-60 mix-blend-multiply" />
            <div className="relative z-10 max-w-3xl px-6 py-12 bg-white/90 backdrop-blur-sm border-t-4 border-[#002868]">
              <Leaf className="w-12 h-12 text-[#002868] mx-auto mb-6" strokeWidth={1.5} />
              <h2 className="text-[36px] md:text-[50px] font-serif text-[#002868] mb-4 leading-none">ClassicWear for Good</h2>
              <p className="text-[15px] md:text-[18px] font-medium text-gray-700 mb-8 leading-relaxed">
                We're committed to creating sustainable fashion. From water-saving Washwell™ techniques to using organic cotton, we're making choices that are better for you and the planet.
              </p>
              <button className="border-[3px] border-[#002868] text-[#002868] px-10 py-3.5 font-bold uppercase tracking-widest text-[13px] hover:bg-[#002868] hover:text-white transition-colors">
                Discover Our Initiatives
              </button>
            </div>
          </div>
        </section>

        {/* ─── CUSTOMER REVIEWS ─── */}
        <section className="px-4 md:px-8 max-w-[1600px] mx-auto mb-20">
          <h2 className="text-[32px] md:text-[44px] font-serif text-[#002868] text-center mb-10">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Rachel P.', text: 'The denim quality is incredible for the price. My favorite jeans brand.', stars: 5 },
              { name: 'Michael T.', text: 'Love the classic American style. Great basics that last.', stars: 5 },
              { name: 'Jennifer W.', text: 'Perfect fit every time. The online size guide is spot on.', stars: 4 },
            ].map((review, i) => (
              <div key={i} className="border-2 border-gray-100 p-8 flex flex-col hover:border-[#002868]/20 transition-colors">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className={`w-4 h-4 ${s < review.stars ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                  ))}
                </div>
                <p className="text-[14px] text-gray-700 mb-6 flex-1 leading-relaxed italic">"{review.text}"</p>
                <span className="font-bold text-[13px] text-[#002868]">{review.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ─── SERVICES BAR ─── */}
        <section className="w-full bg-[#f0f4f8] py-12 mb-20 border-y border-gray-200">
          <div className="max-w-[1600px] mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: '🚚', title: 'Free Shipping', desc: 'On orders $50+ for Rewards Members' },
              { icon: '↩️', title: 'Free Returns', desc: 'Easy returns by mail or in-store' },
              { icon: '💳', title: 'ClassicWearCash', desc: 'Earn rewards on every purchase' },
              { icon: '🏪', title: 'Buy Online, Pick Up', desc: 'Ready in 2 hours at your store' },
            ].map((svc, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-3xl mb-3">{svc.icon}</span>
                <h4 className="text-[14px] font-bold text-[#002868] uppercase tracking-widest mb-1">{svc.title}</h4>
                <p className="text-[13px] text-gray-600">{svc.desc}</p>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* ─── FOOTER ─── */}
      <footer className="bg-white border-t-8 border-[#002868] pt-16">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-16 mb-16">

            {/* Newsletter & Socials */}
            <div className="lg:col-span-2 flex flex-col">
              <div className="bg-[#002868] text-white p-3 font-serif text-[32px] leading-none mb-8 w-fit">
                ClassicWear
              </div>
              <h4 className="text-[14px] font-bold text-[#002868] uppercase tracking-widest mb-4">Sign Up for Emails</h4>
              <p className="text-[14px] text-gray-600 mb-6 font-medium">Get 20% off your first regular-priced purchase when you sign up for ClassicWear emails.</p>

              <form className="flex border-b-2 border-[#002868] pb-2 mb-10 group">
                <input type="email" placeholder="Enter Email Address" className="bg-transparent outline-none w-full text-[14px] font-bold placeholder-gray-400 text-[#002868]" />
                <button type="button" className="text-[#002868] font-black uppercase tracking-widest text-[13px] group-hover:text-blue-500 transition-colors">
                  Join
                </button>
              </form>

              <h4 className="text-[12px] font-bold text-[#002868] uppercase tracking-widest mb-4">Follow Us</h4>
              <div className="flex space-x-6">
                <a href="#" className="text-[#002868] hover:text-blue-500 transition-colors"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="text-[#002868] hover:text-blue-500 transition-colors"><Facebook className="w-5 h-5" /></a>
                <a href="#" className="text-[#002868] hover:text-blue-500 transition-colors"><Twitter className="w-5 h-5" /></a>
                <a href="#" className="text-[#002868] hover:text-blue-500 transition-colors"><Youtube className="w-5 h-5" /></a>
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-col space-y-4 text-[13px] font-bold text-gray-600 uppercase tracking-widest mt-4 lg:mt-0">
              <h4 className="text-[#002868] mb-3 text-[14px]">Customer Service</h4>
              <a href="#" className="hover:text-[#002868] hover:underline transition-all">Help Center</a>
              <a href="#" className="hover:text-[#002868] hover:underline transition-all">Track Order</a>
              <a href="#" className="hover:text-[#002868] hover:underline transition-all">Returns & Exchanges</a>
              <a href="#" className="hover:text-[#002868] hover:underline transition-all">Shipping Info</a>
              <a href="#" className="hover:text-[#002868] hover:underline transition-all">Contact Us</a>
            </div>

            <div className="flex flex-col space-y-4 text-[13px] font-bold text-gray-600 uppercase tracking-widest">
              <h4 className="text-[#002868] mb-3 text-[14px]">About ClassicWear</h4>
              <a href="#" className="hover:text-[#002868] hover:underline transition-all">Our Story</a>
              <a href="#" className="hover:text-[#002868] hover:underline transition-all">Careers</a>
              <a href="#" className="hover:text-[#002868] hover:underline transition-all">ClassicWear for Good</a>
              <a href="#" className="hover:text-[#002868] hover:underline transition-all">Inclusion & Diversity</a>
              <a href="#" className="hover:text-[#002868] hover:underline transition-all">Investors</a>
            </div>

            <div className="flex flex-col space-y-4 text-[13px] font-bold text-gray-600 uppercase tracking-widest">
              <h4 className="text-[#002868] mb-3 text-[14px]">Programs</h4>
              <a href="#" className="hover:text-[#002868] hover:underline transition-all flex items-center"><CreditCard className="w-4 h-4 mr-2" /> ClassicWearCard</a>
              <a href="#" className="hover:text-[#002868] hover:underline transition-all">ClassicWearCash</a>
              <a href="#" className="hover:text-[#002868] hover:underline transition-all">Gift Cards</a>
              <a href="#" className="hover:text-[#002868] hover:underline transition-all flex items-center"><MapPin className="w-4 h-4 mr-2" /> Store Locator</a>
            </div>

          </div>

          <div className="py-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between text-[11px] font-bold tracking-widest text-[#002868]">
            <span className="mb-4 md:mb-0">© 2026 ClassicWear INC. ALL RIGHTS RESERVED.</span>
            <div className="flex flex-wrap justify-center gap-6">
              <a href="#" className="hover:underline transition-colors">Privacy Policy</a>
              <a href="#" className="hover:underline transition-colors">Terms of Use</a>
              <a href="#" className="hover:underline transition-colors">Your Privacy Choices</a>
              <a href="#" className="hover:underline transition-colors">CA Supply Chains Act</a>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}

