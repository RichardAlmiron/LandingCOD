'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { StoreData, Product } from '@/lib/types';
import { useCart } from '@/contexts/CartContext';
import { Search, ShoppingBag, User, MapPin, Heart, Menu, ChevronRight, Sun, X } from 'lucide-react';
import { usePagination, ProductPagination } from '@/components/componentes-compartidos/templates/Pagination';

export default function ShadesHubTemplate({ data }: { data: StoreData }) {
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
    <div className="min-h-full bg-white font-sans text-[#111] selection:bg-[#111] selection:text-white pb-0 overflow-x-hidden">

      {/* ─── PROMO BAR ─── */}
      <div className="bg-[#111] text-white text-[11px] md:text-[13px] py-2.5 px-6 flex justify-center text-center font-bold tracking-widest uppercase border-b border-gray-800">
        Free Shipping & Returns PLUS 50% Off A Second Pair*
      </div>

      {/* ─── HEADER ─── */}
      <header className="bg-white sticky top-0 z-50 transition-all border-b border-gray-200">
        <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8 h-[72px] lg:h-[88px] flex items-center justify-between">

          <div className="flex items-center space-x-6 lg:space-x-8">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <nav className="hidden lg:flex space-x-8 font-sans text-[13px] font-black uppercase tracking-widest text-[#111]">
              <div className="group relative py-8">
                <a href="#" className="hover:text-gray-500 transition-colors">Women</a>
                <div className="absolute top-full -left-8 w-[800px] bg-white border border-gray-100 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all flex p-10 gap-16 z-50">
                  <div className="flex flex-col gap-5 text-[13px] font-sans font-bold text-gray-600 uppercase tracking-widest">
                    <h4 className="text-[#111] mb-2 border-b-2 border-[#111] pb-2 text-[15px]">Shop By Shape</h4>
                    <a href="#" className="hover:text-[#111] transition-colors">Cat Eye</a>
                    <a href="#" className="hover:text-[#111] transition-colors">Aviator</a>
                    <a href="#" className="hover:text-[#111] transition-colors">Square</a>
                    <a href="#" className="hover:text-[#111] transition-colors">Round</a>
                    <a href="#" className="hover:text-[#111] transition-colors">Rectangle</a>
                  </div>
                  <div className="flex flex-col gap-5 text-[13px] font-sans font-bold text-gray-600 uppercase tracking-widest">
                    <h4 className="text-[#111] mb-2 border-b-2 border-[#111] pb-2 text-[15px]">Top Brands</h4>
                    <a href="#" className="hover:text-[#111] transition-colors">MilanoModern</a>
                    <a href="#" className="hover:text-[#111] transition-colors">Versace</a>
                    <a href="#" className="hover:text-[#111] transition-colors">IconShades</a>
                    <a href="#" className="hover:text-[#111] transition-colors">ItalianCraft</a>
                    <a href="#" className="hover:text-[#111] transition-colors">SportOptics</a>
                  </div>
                  <div className="flex-1 rounded-sm overflow-hidden relative">
                    <Image src="https://picsum.photos/400/300?random=970" alt="New Arrival" fill className="object-cover" />
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white font-black text-[24px] uppercase tracking-tighter drop-shadow-lg text-center">New<br />Arrivals</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="py-8"><a href="#" className="hover:text-gray-500 transition-colors">Men</a></div>
              <div className="py-8"><a href="#" className="hover:text-gray-500 transition-colors">Brands</a></div>
              <div className="py-8"><a href="#" className="hover:text-gray-500 transition-colors">Trends</a></div>
              <div className="py-8"><a href="#" className="text-red-600 hover:text-red-400 transition-colors">Special Offers</a></div>
            </nav>
          </div>

          <div className="flex flex-col items-center justify-center cursor-pointer absolute left-1/2 -translate-x-1/2">
            <span className="font-sans text-[24px] md:text-[32px] font-black tracking-tighter uppercase leading-none text-[#111]">
              SHADESHUB
            </span>
          </div>

          <div className="flex items-center space-x-5 lg:space-x-7 text-[#111]">
            <Search className="w-5 h-5 lg:w-6 lg:h-6 cursor-pointer hover:text-gray-500 transition-colors" strokeWidth={2.5} />
            <MapPin className="hidden md:block w-5 h-5 lg:w-6 lg:h-6 cursor-pointer hover:text-gray-500 transition-colors" strokeWidth={2.5} />
            <User className="hidden md:block w-5 h-5 lg:w-6 lg:h-6 cursor-pointer hover:text-gray-500 transition-colors" strokeWidth={2.5} />
            <div 
              onClick={() => toggleFavorite('header')}
              className="relative hidden md:block cursor-pointer hover:text-gray-500 transition-colors"
            >
              <Heart className={`w-5 h-5 lg:w-6 lg:h-6 ${favorites.length > 0 ? 'fill-red-500 text-red-500' : ''}`} strokeWidth={2.5} />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[9px] font-black px-1.5 rounded-full">{favorites.length}</span>
              )}
            </div>
            <div 
              onClick={() => setIsCartOpen(true)}
              className="relative cursor-pointer hover:text-gray-500 transition-colors"
            >
              <ShoppingBag className="w-5 h-5 lg:w-6 lg:h-6" strokeWidth={2.5} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-[#111] text-white text-[10px] font-black px-1.5 py-0.5 rounded-full leading-none">{itemCount}</span>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="w-full">

        {/* ─── HERO BANNER ─── */}
        <section className="relative w-full h-[500px] md:h-[650px] lg:h-[750px] flex justify-center items-center overflow-hidden bg-orange-100 group">
          <Image
            src={data.bannerImage}
            alt="Find Your Shades"
            fill
            className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-[4000ms] ease-out"
            priority
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          <div className="absolute inset-0 flex flex-col items-center justify-end md:justify-center text-center text-white p-6 pb-16 md:pb-6">
            <div className="bg-white/10 backdrop-blur-md p-8 md:p-12 border border-white/20 max-w-2xl">
              <h1 className="text-[40px] md:text-[60px] lg:text-[76px] font-black uppercase tracking-tighter mb-4 leading-none drop-shadow-xl line-clamp-2">
                {data.name}
              </h1>
              <p className="text-[14px] md:text-[18px] font-bold uppercase tracking-widest mb-10 drop-shadow-lg text-white/90">
                {data.description || 'Discover the season’s hottest shades from the world’s top brands.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-[#111] px-12 py-4 font-black uppercase text-[12px] md:text-[14px] tracking-widest hover:bg-[#111] hover:text-white transition-all w-full sm:w-auto text-center border-2 border-white">
                  Shop Women
                </button>
                <button className="bg-transparent border-2 border-white text-white px-12 py-4 font-black uppercase text-[12px] md:text-[14px] tracking-widest hover:bg-white hover:text-[#111] transition-all w-full sm:w-auto text-center">
                  Shop Men
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ─── TOP BRANDS CAROUSEL ─── */}
        <section className="bg-gray-100 border-b border-gray-200">
          <div className="max-w-[1600px] mx-auto px-6 py-12 flex justify-between items-center overflow-x-auto hide-scrollbar gap-8">
            {['Luxe Vision', 'Sport Pro', 'Elegance', 'Milano', 'Heritage', 'Maison', 'Modern Style'].map((brand, i) => (
              <a key={i} href="#" className="text-[20px] md:text-[28px] font-black tracking-tighter uppercase text-gray-400 hover:text-[#111] transition-colors whitespace-nowrap px-4 line-clamp-1">
                {brand}
              </a>
            ))}
          </div>
        </section>

        {/* ─── NEW ARRIVALS GRID ─── */}
        <section className="max-w-[1600px] mx-auto px-4 md:px-8 py-20 md:py-28">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b-4 border-[#111] pb-4">
            <h2 className="text-[32px] md:text-[50px] font-black uppercase tracking-tighter text-[#111] leading-none text-center md:text-left">
              Trending Now ({totalItems})
            </h2>
            <a href="#" className="hidden md:flex text-[14px] font-black uppercase tracking-widest text-gray-500 hover:text-[#111] transition-colors items-center group">
              Shop All Trending <ChevronRight className="w-5 h-5 ml-1 transform group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-x-8 gap-y-16">
            {paginatedItems.map((product: any, idx: number) => (
              <div key={product.id || idx} data-product-id={product.id} className="group cursor-pointer flex flex-col items-center">
                <div className="relative aspect-[4/3] mb-6 overflow-hidden w-full bg-[#f8f8f8] border border-gray-200 flex items-center justify-center p-6 sm:p-10">

                  {/* Decorative Elements */}
                  {(idx === 0 || idx === 3) && (
                    <div className="absolute top-4 left-4 bg-[#111] text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 z-10 shadow-sm">
                      Best Seller
                    </div>
                  )}
                  {product.originalPrice && (
                    <div className="absolute top-4 right-4 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 z-10 shadow-sm">
                      Sale
                    </div>
                  )}

                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    fill
                    className="object-contain p-8 group-hover:scale-[1.15] group-hover:rotate-[-2deg] transition-all duration-[800ms] ease-out drop-shadow-xl"
                    referrerPolicy="no-referrer"
                  />

                  {/* Heart Icon */}
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }}
                    className="absolute bottom-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md opacity-0 translate-y-2 group-hover:translate-y-0 group-hover:opacity-100 transition-all hover:text-red-500 z-20"
                  >
                    <Heart className={`w-5 h-5 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>
                </div>

                <div className="flex flex-col w-full text-center">
                  <div className="text-[14px] font-black uppercase tracking-widest text-[#111] mb-2 px-2 line-clamp-1">
                    {product.category || (idx % 2 === 0 ? 'IconShades' : 'MilanoModern')}
                  </div>
                  <h3 className="text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-4 line-clamp-2 px-2 h-[36px]">
                    {product.title}
                  </h3>

                  <div className="flex justify-center items-center space-x-3 bg-gray-50 py-3 border-y border-gray-100">
                    <span className="font-black text-[18px] text-[#111]">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="font-bold text-[14px] text-red-600 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>

                  {/* Polarized Tag mock */}
                  {idx % 3 === 0 && (
                    <div className="mt-4 flex justify-center items-center text-[10px] font-black uppercase tracking-widest text-[#111]">
                      <Sun className="w-3 h-3 mr-1" /> Polarized
                    </div>
                  )}
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

          <div className="mt-16 flex justify-center md:hidden">
            <button 
              onClick={() => handlePageChange(currentPage + 1)}
              className="bg-[#111] text-white px-10 py-4 font-black uppercase text-[12px] tracking-widest w-full border-2 border-[#111]"
            >
              View All Trending
            </button>
          </div>
        </section>

        {/* ─── CURATED COLLECTIONS ─── */}
        <section className="bg-[#111] py-24 text-white">
          <div className="max-w-[1600px] mx-auto px-6">
            <h2 className="text-[32px] md:text-[50px] font-black uppercase tracking-tighter text-white leading-none mb-12 text-center md:text-left">
              Shop By Need
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

              <div className="group relative aspect-[3/4] overflow-hidden bg-gray-900 cursor-pointer border border-gray-800">
                <Image src="https://picsum.photos/600/800?random=971" alt="Polarized" fill className="object-cover group-hover:scale-110 transition-transform duration-[3000ms] opacity-60 group-hover:opacity-40" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                  <h3 className="text-[36px] font-black uppercase tracking-tighter mb-4 drop-shadow-md">Polarized</h3>
                  <p className="font-bold text-[12px] uppercase tracking-widest text-gray-300 max-w-[250px] mb-8">Cut the glare. Enhance the color. Protect your eyes.</p>
                  <span className="bg-white text-[#111] px-8 py-3 font-black uppercase tracking-widest text-[11px] group-hover:bg-[#111] group-hover:text-white border-2 border-white transition-colors">
                    Shop Now
                  </span>
                </div>
              </div>

              <div className="group relative aspect-[3/4] overflow-hidden bg-gray-900 cursor-pointer border border-gray-800">
                <Image src="https://picsum.photos/600/800?random=972" alt="Sport" fill className="object-cover group-hover:scale-110 transition-transform duration-[3000ms] opacity-60 group-hover:opacity-40" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                  <h3 className="text-[36px] font-black uppercase tracking-tighter mb-4 drop-shadow-md">Sport</h3>
                  <p className="font-bold text-[12px] uppercase tracking-widest text-gray-300 max-w-[250px] mb-8">Performance shades designed to stay put and push limits.</p>
                  <span className="bg-white text-[#111] px-8 py-3 font-black uppercase tracking-widest text-[11px] group-hover:bg-[#111] group-hover:text-white border-2 border-white transition-colors">
                    Shop SportOptics & More
                  </span>
                </div>
              </div>

              <div className="group relative aspect-[3/4] overflow-hidden bg-gray-900 cursor-pointer border border-gray-800">
                <Image src="https://picsum.photos/600/800?random=973" alt="Luxury" fill className="object-cover group-hover:scale-110 transition-transform duration-[3000ms] opacity-60 group-hover:opacity-40" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                  <h3 className="text-[36px] font-black uppercase tracking-tighter mb-4 drop-shadow-md">Designers</h3>
                  <p className="font-bold text-[12px] uppercase tracking-widest text-gray-300 max-w-[250px] mb-8">Elevate your look with the world's most luxurious fashion houses.</p>
                  <span className="bg-white text-[#111] px-8 py-3 font-black uppercase tracking-widest text-[11px] group-hover:bg-[#111] group-hover:text-white border-2 border-white transition-colors">
                    Shop MilanoModern & ItalianCraft
                  </span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ─── FACE SHAPE GUIDE ─── */}
        <section className="max-w-[1600px] mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="text-[32px] md:text-[50px] font-black uppercase tracking-tighter text-[#111] leading-none mb-4">Find Your Perfect Frame</h2>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-sm max-w-xl mx-auto">Not sure which shape suits you? Our face shape guide makes it easy.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { shape: 'Round', rec: 'Angular & Square', img: 'https://picsum.photos/400/400?random=974' },
              { shape: 'Oval', rec: 'Any Shape', img: 'https://picsum.photos/400/400?random=975' },
              { shape: 'Square', rec: 'Round & Aviator', img: 'https://picsum.photos/400/400?random=976' },
              { shape: 'Heart', rec: 'Cat Eye & Round', img: 'https://picsum.photos/400/400?random=977' },
            ].map((item, i) => (
              <div key={i} className="group cursor-pointer text-center">
                <div className="relative aspect-square mb-6 overflow-hidden bg-gray-100 border border-gray-200">
                  <Image src={item.img} alt={item.shape} fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
                </div>
                <h3 className="text-[18px] font-black uppercase tracking-tighter text-[#111] mb-1">{item.shape} Face</h3>
                <p className="text-[12px] font-bold text-gray-500 uppercase tracking-widest">Best: {item.rec}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── CUSTOMER REVIEWS ─── */}
        <section className="bg-gray-50 border-y border-gray-200 py-24">
          <div className="max-w-[1600px] mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-[32px] md:text-[50px] font-black uppercase tracking-tighter text-[#111] leading-none mb-4">What Our Customers Say</h2>
              <div className="flex items-center justify-center gap-2 mb-2">
                {[...Array(5)].map((_, i) => <Sun key={i} className="w-5 h-5 text-[#111] fill-[#111]" />)}
                <span className="text-gray-500 font-bold text-sm ml-2">4.8 / 5 from 8,200+ reviews</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: 'Sarah L.', text: 'The quality is incredible for the price. My new go-to for sunglasses shopping.', rating: 5 },
                { name: 'Mike T.', text: 'Free returns made it easy to try different styles. Found my perfect pair.', rating: 5 },
                { name: 'Emma R.', text: 'Love the polarized lenses. Crystal clear vision and stylish frames.', rating: 5 },
              ].map((review, i) => (
                <div key={i} className="bg-white p-10 border border-gray-200">
                  <div className="flex gap-1 mb-4">
                    {[...Array(review.rating)].map((_, j) => <Sun key={j} className="w-4 h-4 text-[#111] fill-[#111]" />)}
                  </div>
                  <p className="text-gray-600 font-medium text-[15px] mb-6 leading-relaxed">"{review.text}"</p>
                  <p className="font-black uppercase text-[13px] tracking-widest text-[#111]">{review.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── VIRTUAL TRY-ON ─── */}
        <section className="max-w-[1600px] mx-auto px-6 py-24">
          <div className="bg-[#111] text-white p-12 md:p-20 flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2 space-y-8">
              <h2 className="text-[40px] md:text-[56px] font-black uppercase tracking-tighter leading-none">Virtual Try-On</h2>
              <p className="text-gray-400 font-bold text-[15px] leading-relaxed max-w-md">
                Use your camera to see how any frame looks on your face before you buy. No app download required.
              </p>
              <button className="bg-white text-[#111] px-10 py-4 font-black uppercase text-[14px] tracking-widest hover:bg-gray-200 transition-all">
                Try It Now
              </button>
            </div>
            <div className="w-full md:w-1/2 relative aspect-video overflow-hidden bg-gray-900">
              <Image src="https://picsum.photos/800/450?random=978" alt="Virtual Try-On" fill className="object-cover opacity-80" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 border-4 border-white rounded-full flex items-center justify-center">
                  <span className="font-black uppercase tracking-widest text-white text-sm">TRY ON</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SUSTAINABILITY ─── */}
        <section className="max-w-[1600px] mx-auto px-6 pb-24">
          <div className="bg-[#f5f0eb] p-12 md:p-20 flex flex-col md:flex-row items-center gap-16 border border-gray-200">
            <div className="w-full md:w-1/2 relative aspect-square overflow-hidden">
              <Image src="https://picsum.photos/600/600?random=979" alt="Sustainability" fill className="object-cover" />
            </div>
            <div className="w-full md:w-1/2 space-y-8">
              <span className="text-[12px] font-black uppercase tracking-[0.3em] text-gray-500">Our Commitment</span>
              <h2 className="text-[40px] font-black uppercase tracking-tighter text-[#111] leading-none">Sustainable Eyewear</h2>
              <p className="text-gray-600 font-medium text-[15px] leading-relaxed max-w-md">
                We're committed to reducing our environmental impact. Our eco-collection uses recycled materials and bio-based acetate for frames that look good and do good.
              </p>
              <button className="bg-[#111] text-white px-10 py-4 font-black uppercase text-[14px] tracking-widest hover:bg-gray-800 transition-all">
                Shop Eco Collection
              </button>
            </div>
          </div>
        </section>

        {/* ─── NEWSLETTER ─── */}
        <section className="max-w-[1600px] mx-auto px-6 pb-24">
          <div className="bg-[#111] text-white p-12 md:p-20 text-center">
            <h2 className="text-[32px] md:text-[40px] font-black uppercase tracking-tighter mb-4">Stay in the Shade</h2>
            <p className="text-gray-400 font-bold text-[14px] uppercase tracking-widest mb-10 max-w-md mx-auto">
              Subscribe for exclusive offers, new arrivals, and style tips delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input type="email" placeholder="YOUR EMAIL" className="flex-1 bg-transparent border-2 border-gray-700 text-white px-6 py-4 font-black text-[12px] uppercase tracking-widest outline-none focus:border-white transition-colors placeholder-gray-600" />
              <button className="bg-white text-[#111] px-10 py-4 font-black uppercase text-[12px] tracking-widest hover:bg-gray-200 transition-all">
                Subscribe
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* ─── PRE-FOOTER PROMO ─── */}
      <div className="bg-gray-100 border-y border-gray-200">
        <div className="max-w-[1600px] mx-auto px-6 py-16 flex flex-col lg:flex-row items-center justify-between text-center lg:text-left">
          <div className="mb-8 lg:mb-0">
            <h3 className="text-[28px] md:text-[36px] font-black uppercase tracking-tighter text-[#111] mb-2">
              Find Your Perfect Fit In-Store
            </h3>
            <p className="font-bold text-[14px] text-gray-600 uppercase tracking-widest">
              Try them on. Adjust the fit. Get expert advice.
            </p>
          </div>
          <button className="bg-[#111] text-white px-10 py-4 font-black uppercase text-[13px] tracking-widest flex items-center hover:bg-white hover:text-[#111] border-2 border-[#111] transition-colors w-full sm:w-auto justify-center">
            <MapPin className="w-5 h-5 mr-3" /> Store Locator
          </button>
        </div>
      </div>

      {/* ─── FOOTER ─── */}
      <footer className="bg-white text-[#111] pt-24 pb-12 border-t-8 border-[#111]">
        <div className="w-full max-w-[1600px] mx-auto px-6 md:px-8">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20 text-[12px] font-sans font-bold uppercase tracking-widest text-gray-500">

            <div className="lg:col-span-2 pr-0 lg:pr-12 border-b lg:border-b-0 lg:border-r border-gray-200 pb-12 lg:pb-0">
              <span className="font-sans text-[32px] font-black tracking-tighter uppercase leading-none text-[#111] mb-6 block">
                SHADESHUB
              </span>
              <p className="text-gray-600 leading-relaxed font-bold normal-case text-[14px] tracking-normal mb-8">
                Sign up for Sun Perks to receive exclusive offers, early access to sales, and the latest trends delivered straight to your inbox.
              </p>
              <form className="flex w-full">
                <input type="email" placeholder="ENTER YOUR EMAIL" className="bg-transparent border border-[#111] text-[#111] px-4 py-3 outline-none flex-1 font-bold text-[12px] tracking-widest placeholder-gray-400 focus:bg-gray-50 transition-colors" />
                <button type="button" className="bg-[#111] text-white px-8 py-3 font-black uppercase tracking-widest text-[12px] border-2 border-[#111] hover:bg-white hover:text-[#111] transition-all shrink-0">
                  Sign Up
                </button>
              </form>
            </div>

            <div className="flex flex-col space-y-4">
              <h4 className="text-[#111] font-black text-[16px] uppercase tracking-tighter mb-2 border-b-2 border-[#111] pb-2 inline-block w-max">Customer Care</h4>
              <a href="#" className="hover:text-[#111] transition-colors">Contact Us</a>
              <a href="#" className="hover:text-[#111] transition-colors">Order Status</a>
              <a href="#" className="hover:text-[#111] transition-colors">Shipping & Returns</a>
              <a href="#" className="hover:text-[#111] transition-colors">Perfect Fit</a>
              <a href="#" className="hover:text-[#111] transition-colors">FAQ</a>
            </div>

            <div className="flex flex-col space-y-4">
              <h4 className="text-[#111] font-black text-[16px] uppercase tracking-tighter mb-2 border-b-2 border-[#111] pb-2 inline-block w-max">About Us</h4>
              <a href="#" className="hover:text-[#111] transition-colors">Our Story</a>
              <a href="#" className="hover:text-[#111] transition-colors">Careers</a>
              <a href="#" className="hover:text-[#111] transition-colors">Store Locator</a>
              <a href="#" className="hover:text-[#111] transition-colors">Corporate Responsibility</a>
              <a href="#" className="hover:text-[#111] transition-colors">Affiliate Program</a>
            </div>

            <div className="flex flex-col space-y-4">
              <h4 className="text-[#111] font-black text-[16px] uppercase tracking-tighter mb-2 border-b-2 border-[#111] pb-2 inline-block w-max">Services</h4>
              <a href="#" className="hover:text-[#111] transition-colors">In-Store Shopping</a>
              <a href="#" className="hover:text-[#111] transition-colors">Gift Cards</a>
              <a href="#" className="hover:text-[#111] transition-colors">Student Discount</a>
              <a href="#" className="hover:text-[#111] transition-colors">Customization</a>
            </div>

          </div>

          <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between text-[11px] font-bold uppercase tracking-widest text-gray-400 space-y-4 md:space-y-0">
            <div className="flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-4">
              <a href="#" className="hover:text-[#111] transition-colors">Terms of Use</a>
              <a href="#" className="hover:text-[#111] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#111] transition-colors">AdChoices</a>
              <a href="#" className="hover:text-[#111] transition-colors">DO NOT SELL MY INFO (CA ONLY)</a>
            </div>
            <span>© 2026 SHADESHUB. ALL RIGHTS RESERVED.</span>
          </div>

        </div>
      </footer>
    </div>
  );
}

