'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { StoreData, Product } from '@/lib/types';
import { useCart } from '@/contexts/CartContext';
import { Menu, X, ShoppingBag, Heart } from 'lucide-react';
import { usePagination, ProductPagination } from '@/components/componentes-compartidos/templates/Pagination';

export default function AvantGardeTemplate({ data }: { data: StoreData }) {
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
    <div className="min-h-full bg-white font-sans text-black selection:bg-black selection:text-white pb-0 overflow-x-hidden">

      {/* ─── HEADER (BRUTALIST & MINIMAL) ─── */}
      <header className="bg-white sticky top-0 z-50 border-b border-black md:border-b-0 h-[50px] md:h-[60px] flex flex-col justify-center">
        <div className="w-full px-4 md:px-6 flex items-center justify-between text-[11px] md:text-[13px] uppercase tracking-normal font-medium">

          <div className="flex items-center space-x-6 w-1/3">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden cursor-pointer hover:underline underline-offset-4"
            >
              {mobileMenuOpen ? 'Close' : 'Menu'}
            </button>
            <nav className="hidden lg:flex space-x-6">
              <a href="#" className="hover:underline underline-offset-4">Menswear</a>
              <a href="#" className="hover:underline underline-offset-4">Womenswear</a>
              <a href="#" className="hover:underline underline-offset-4">Everything Else</a>
              <a href="#" className="hover:underline underline-offset-4">Sale</a>
            </nav>
          </div>

          <div className="flex items-center justify-center cursor-pointer w-1/3 text-center">
            <span className="font-bold text-[22px] md:text-[32px] tracking-tighter leading-none">
              AvantGarde
            </span>
          </div>

          <div className="flex items-center justify-end space-x-6 w-1/3">
            <div className="hidden md:flex space-x-6">
              <a href="#" className="hover:underline underline-offset-4">English</a>
              <a href="#" className="hover:underline underline-offset-4">Login</a>
            </div>
            <a href="#" className="hover:underline underline-offset-4">Search</a>
            <div 
              onClick={(e) => e.stopPropagation()}
              className="cursor-pointer hover:underline underline-offset-4 relative"
            >
              Shopping Bag ({itemCount})
            </div>
          </div>

        </div>
      </header>

      {/* Mobile Nav Header Extension if needed */}
      <div className="lg:hidden w-full border-b border-black px-4 py-2 flex space-x-4 text-[11px] uppercase overflow-x-auto hide-scrollbar">
        <a href="#" className="hover:underline underline-offset-4 shrink-0">Menswear</a>
        <a href="#" className="hover:underline underline-offset-4 shrink-0">Womenswear</a>
        <a href="#" className="hover:underline underline-offset-4 shrink-0">Everything Else</a>
        <a href="#" className="hover:underline underline-offset-4 shrink-0">Sale</a>
      </div>

      <main className="w-full pb-24">

        {/* ─── MAIN EDITORIAL BANNER ─── */}
        <section className="relative w-full h-[60vh] md:h-[85vh] group cursor-pointer mb-20">
          <Image
            src={data.bannerImage}
            alt="AvantGarde Editorial"
            fill
            className="object-cover object-center"
            priority
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/5" />

          <div className="absolute top-0 w-full p-4 md:p-6 text-black flex justify-between items-start pointer-events-none mix-blend-difference text-white">
            <h1 className="text-[32px] md:text-[64px] font-bold uppercase tracking-tighter leading-none max-w-2xl text-balance">
              {data.name}
            </h1>
            <p className="text-[12px] md:text-[14px] uppercase tracking-normal max-w-[200px] md:max-w-xs text-right hidden sm:block">
              {data.description || 'Recent highlights from the intersection of culture, art, and fashion.'}
            </p>
          </div>
          <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6">
            <button className="text-[11px] md:text-[13px] bg-white text-black px-6 py-2 uppercase hover:bg-black hover:text-white transition-colors">
              Read the Feature
            </button>
          </div>
        </section>

        {/* ─── LATEST ARRIVALS GRID WITH PAGINATION ─── */}
        <section className="px-4 md:px-6">
          <div className="flex items-center justify-between mb-8 border-b border-black pb-2 text-[11px] md:text-[13px] uppercase font-bold">
            <h2>Latest Arrivals ({totalItems})</h2>
            <div className="flex space-x-4 font-normal">
              <a href="#" className="hover:underline underline-offset-4">View All</a>
              <a href="#" className="hover:underline underline-offset-4 hidden sm:block">Filter</a>
            </div>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 md:gap-x-6 gap-y-10">
            {paginatedItems.map((product, idx) => (
              <div key={product.id || idx} data-product-id={product.id} className="group cursor-pointer flex flex-col">
                <div className="relative aspect-[3/4] mb-3 overflow-hidden bg-[#e5e5e5]">
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    fill
                    className="object-contain mix-blend-multiply opacity-90 group-hover:opacity-100 transition-opacity p-4"
                    referrerPolicy="no-referrer"
                  />
                  {idx % 4 === 0 && (
                    <div className="absolute top-2 left-2 text-[10px] uppercase bg-black text-white px-1 py-0.5">
                      New
                    </div>
                  )}
                  {/* Favorite Button */}
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }}
                    className="absolute top-2 right-2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Heart className={`w-4 h-4 ${favorites.includes(product.id) ? 'fill-black text-black' : 'text-black'}`} />
                  </button>
                  {/* Add to Cart Button */}
                  <button 
                    onClick={(e) => handleAddToCart(product, e)}
                    className="absolute bottom-2 left-2 right-2 bg-black text-white text-[10px] uppercase py-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Add to Bag
                  </button>
                </div>

                <div className="flex flex-col text-[11px] md:text-[12px] uppercase leading-tight font-medium space-y-0.5">
                  <h3 className="font-bold line-clamp-1">
                    {product.category || 'Maison Margiela'}
                  </h3>
                  <div className="text-gray-600 line-clamp-1 pb-1">
                    {product.title}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-black">${product.price} USD</span>
                    {product.originalPrice && (
                      <span className="text-gray-400 line-through">${product.originalPrice} USD</span>
                    )}
                  </div>
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
        </section>

        {/* ─── CURATED COLLECTIONS ─── */}
        <section className="mt-24 px-4 md:px-6">
          <div className="border-b border-black pb-2 mb-8 text-[11px] md:text-[13px] uppercase font-bold">
            <h2>Curated Collections</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {['Essentials', 'Outerwear', 'Footwear', 'Accessories'].map((col, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="relative aspect-[3/4] mb-3 overflow-hidden bg-[#e5e5e5]">
                  <Image src={`https://picsum.photos/500/700?random=${700 + i}`} alt={col} fill className="object-cover group-hover:scale-105 transition-transform duration-[2000ms]" />
                </div>
                <span className="text-[11px] md:text-[12px] uppercase font-bold tracking-wide">{col}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ─── BRAND PHILOSOPHY ─── */}
        <section className="mt-24 px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-square bg-[#e5e5e5] overflow-hidden">
              <Image src="https://picsum.photos/800/800?random=710" alt="Philosophy" fill className="object-cover" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-4">Our Philosophy</span>
              <h2 className="text-[28px] md:text-[36px] font-bold tracking-tighter leading-tight mb-6">Design Without Compromise</h2>
              <p className="text-[14px] text-gray-600 leading-relaxed mb-6">We believe in the intersection of art and utility. Every piece is crafted with intention, merging avant-garde aesthetics with everyday wearability.</p>
              <button className="text-[11px] uppercase bg-black text-white px-6 py-2 w-fit hover:bg-gray-800 transition-colors">Learn More</button>
            </div>
          </div>
        </section>

        {/* ─── STAFF PICKS ─── */}
        <section className="mt-24 px-4 md:px-6">
          <div className="border-b border-black pb-2 mb-8 text-[11px] md:text-[13px] uppercase font-bold flex justify-between">
            <h2>Staff Picks</h2>
            <span className="font-normal text-gray-500">Handpicked by our creative team</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {data.products.slice(0, 3).map((product, idx) => (
              <div key={`staff-${idx}`} className="group cursor-pointer">
                <div className="relative aspect-[3/4] mb-3 overflow-hidden bg-[#e5e5e5]">
                  <Image src={product.imageUrl} alt={product.title} fill className="object-contain mix-blend-multiply p-6 group-hover:scale-105 transition-transform duration-[1500ms]" referrerPolicy="no-referrer" />
                  <button onClick={(e) => handleAddToCart(product, e)} className="absolute bottom-2 left-2 right-2 bg-black text-white text-[10px] uppercase py-2 opacity-0 group-hover:opacity-100 transition-opacity">Add to Bag</button>
                </div>
                <div className="text-[11px] uppercase font-bold">{product.title}</div>
                <div className="text-[11px] text-gray-500">${product.price} USD</div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── LOOKBOOK BANNER ─── */}
        <section className="mt-24 relative w-full h-[50vh] md:h-[70vh] group cursor-pointer">
          <Image src="https://picsum.photos/1600/900?random=720" alt="Lookbook" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
            <span className="text-[10px] uppercase tracking-[0.4em] mb-4">Spring / Summer 2026</span>
            <h2 className="text-[36px] md:text-[56px] font-bold tracking-tighter leading-none mb-6">The Lookbook</h2>
            <button className="text-[11px] bg-white text-black px-8 py-2.5 uppercase hover:bg-black hover:text-white transition-colors">View Collection</button>
          </div>
        </section>

        {/* ─── DESIGNER SPOTLIGHT ─── */}
        <section className="mt-24 px-4 md:px-6">
          <div className="border-b border-black pb-2 mb-8 text-[11px] md:text-[13px] uppercase font-bold">
            <h2>Designer Spotlight</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Rei Kawakubo', label: 'Comme des Garçons', img: 'https://picsum.photos/400/500?random=730' },
              { name: 'Rick Owens', label: 'Dark Romanticism', img: 'https://picsum.photos/400/500?random=731' },
              { name: 'Demna', label: 'Balenciaga', img: 'https://picsum.photos/400/500?random=732' },
            ].map((d, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="relative aspect-[4/5] mb-4 overflow-hidden bg-[#e5e5e5]">
                  <Image src={d.img} alt={d.name} fill className="object-cover group-hover:scale-105 transition-transform duration-[2000ms]" />
                </div>
                <h3 className="text-[14px] font-bold">{d.name}</h3>
                <p className="text-[11px] text-gray-500 uppercase">{d.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── SUSTAINABILITY COMMITMENT ─── */}
        <section className="mt-24 px-4 md:px-6 bg-[#f5f5f0] py-16 -mx-4 md:-mx-6 md:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-4 block">Responsibility</span>
            <h2 className="text-[28px] md:text-[36px] font-bold tracking-tighter mb-6">Conscious Fashion</h2>
            <p className="text-[14px] text-gray-600 leading-relaxed mb-8">We are committed to reducing our environmental footprint. From ethically sourced materials to carbon-neutral shipping, every decision is made with the planet in mind.</p>
            <div className="flex justify-center gap-12 text-center">
              {[{ num: '100%', label: 'Organic Cotton' }, { num: '0', label: 'Carbon Emissions' }, { num: '85%', label: 'Recycled Packaging' }].map((s, i) => (
                <div key={i}>
                  <div className="text-[28px] font-bold tracking-tighter">{s.num}</div>
                  <div className="text-[10px] uppercase tracking-wider text-gray-500">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── RECENTLY VIEWED ─── */}
        <section className="mt-24 px-4 md:px-6">
          <div className="border-b border-black pb-2 mb-8 text-[11px] md:text-[13px] uppercase font-bold">
            <h2>Recently Viewed</h2>
          </div>
          <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4">
            {data.products.slice(0, 6).map((product, idx) => (
              <div key={`rv-${idx}`} className="min-w-[160px] md:min-w-[200px] group cursor-pointer shrink-0">
                <div className="relative aspect-[3/4] mb-2 overflow-hidden bg-[#e5e5e5]">
                  <Image src={product.imageUrl} alt={product.title} fill className="object-contain mix-blend-multiply p-4" referrerPolicy="no-referrer" />
                </div>
                <div className="text-[10px] uppercase font-bold line-clamp-1">{product.title}</div>
                <div className="text-[10px] text-gray-500">${product.price} USD</div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── EDITORIAL SECTION ─── */}
        <section className="mt-24 px-4 md:px-6">
          <div className="border-b border-black pb-2 mb-8 text-[11px] md:text-[13px] uppercase font-bold flex justify-between">
            <h2>Features</h2>
            <a href="#" className="hover:underline underline-offset-4 font-normal">View All Editorial</a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">

            <div className="group cursor-pointer">
              <div className="relative aspect-[4/3] w-full mb-4 bg-gray-100 overflow-hidden">
                <Image src="https://picsum.photos/800/600?random=980" alt="Editorial 1" fill className="object-cover group-hover:scale-105 transition-transform duration-[2000ms]" />
              </div>
              <div className="text-[11px] md:text-[12px] uppercase flex flex-col space-y-2">
                <span className="text-gray-500">Fashion</span>
                <h3 className="font-bold text-[14px] md:text-[18px] leading-tight max-w-lg">The Evolution of Technical Outerwear in Urban Environments</h3>
                <p className="normal-case text-gray-600 line-clamp-2 mt-2">Exploring how high-performance materials transitioned from mountainsides to city streets, redefining modern luxury aesthetics.</p>
              </div>
            </div>

            <div className="group cursor-pointer">
              <div className="relative aspect-[4/3] w-full mb-4 bg-gray-100 overflow-hidden">
                <Image src="https://picsum.photos/800/600?random=981" alt="Editorial 2" fill className="object-cover group-hover:scale-105 transition-transform duration-[2000ms]" />
              </div>
              <div className="text-[11px] md:text-[12px] uppercase flex flex-col space-y-2">
                <span className="text-gray-500">Music</span>
                <h3 className="font-bold text-[14px] md:text-[18px] leading-tight max-w-lg">Sound & Vision: The New Wave of Audiovisual Collectives</h3>
                <p className="normal-case text-gray-600 line-clamp-2 mt-2">An intimate conversation with the multidisciplinary artists blurring the lines between sonic landscapes and wearable art.</p>
              </div>
            </div>

          </div>
        </section>

      </main>

      {/* ─── FOOTER ─── */}
      <footer className="bg-white border-t border-black text-[11px] md:text-[12px] uppercase font-medium">
        <div className="w-full px-4 md:px-6">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-16">

            <div className="flex flex-col space-y-3">
              <a href="#" className="hover:underline underline-offset-4">Country/Region: United States</a>
              <a href="#" className="hover:underline underline-offset-4">Language: English</a>
              <a href="#" className="hover:underline underline-offset-4">Newsletter Signup</a>
              <a href="#" className="hover:underline underline-offset-4">Customer Care</a>
            </div>

            <div className="flex flex-col space-y-3">
              <a href="#" className="hover:underline underline-offset-4">Locations</a>
              <a href="#" className="hover:underline underline-offset-4">Editorial Archive</a>
              <a href="#" className="hover:underline underline-offset-4">Careers</a>
              <a href="#" className="hover:underline underline-offset-4">Affiliates</a>
              <a href="#" className="hover:underline underline-offset-4">Sitemap</a>
            </div>

            <div className="flex flex-col space-y-3 lg:col-span-2">
              <p className="normal-case text-gray-500 leading-relaxed max-w-sm">Sign up for the AvantGarde newsletter to receive news, updates, and early access to exclusives.</p>
              <form className="flex w-full max-w-sm mt-2 border-b border-black pb-1">
                <input type="email" placeholder="EMAIL ADDRESS" className="bg-transparent outline-none w-full placeholder-gray-400" />
                <button type="button" className="hover:underline underline-offset-4 shrink-0">Subscribe</button>
              </form>
            </div>

          </div>

          <div className="py-6 border-t border-black flex flex-col md:flex-row items-center justify-between text-gray-500 space-y-4 md:space-y-0">
            <span>© 2026 AvantGarde. ALL RIGHTS RESERVED.</span>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              <a href="#" className="hover:text-black hover:underline underline-offset-4">Terms & Conditions</a>
              <a href="#" className="hover:text-black hover:underline underline-offset-4">Privacy Policy</a>
              <a href="#" className="hover:text-black hover:underline underline-offset-4">Instagram</a>
              <a href="#" className="hover:text-black hover:underline underline-offset-4">Facebook</a>
              <a href="#" className="hover:text-black hover:underline underline-offset-4">Twitter</a>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}

