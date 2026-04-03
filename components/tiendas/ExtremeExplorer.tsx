'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { StoreData, Product } from '@/lib/types';
import { useCart } from '@/contexts/CartContext';
import { Search, ShoppingBag, Heart, User, Menu, MapPin, ArrowRight, Target, Navigation, X } from 'lucide-react';
import { usePagination, ProductPagination } from '@/components/componentes-compartidos/templates/Pagination';

export default function ExtremeExplorerTemplate({ data }: { data: StoreData }) {
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
    <div className="min-h-full bg-white font-sans text-black selection:bg-[#cc0000] selection:text-white pb-0 overflow-x-hidden">

      {/* ─── PROMO BANNER ─── */}
      <div className="bg-[#cc0000] text-white text-[12px] md:text-[13px] py-2 px-6 flex justify-center items-center font-black tracking-widest uppercase w-full relative z-50">
        <span className="text-center">NEVER STOP EXPLORING™ <span className="hidden sm:inline">| FREE SHIPPING & RETURNS</span></span>
      </div>

      {/* ─── HEADER ─── */}
      <header className="bg-white sticky top-0 z-40 border-b-2 border-gray-100 transition-all h-[80px]">
        <div className="w-full mx-auto px-4 md:px-8 h-full flex items-center justify-between">

          <div className="flex items-center">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 mr-2 hover:text-[#cc0000] transition-colors"
            >
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
            <div className="flex items-center cursor-pointer mr-8">
              {/* ExtremeExplorer Logo styling */}
              <div className="flex items-center h-[40px] border-r-[6px] border-[#cc0000] pr-2">
                <div className="flex flex-col text-right font-black text-[13px] leading-[0.9] tracking-tighter uppercase mr-1">
                  <span>The</span>
                  <span>North</span>
                  <span>Face</span>
                </div>
                <div className="flex gap-[2px] items-end h-[24px]">
                  <div className="w-[8px] h-full bg-black rounded-tr-full group-hover:bg-[#cc0000] transition-colors"></div>
                  <div className="w-[8px] h-[75%] bg-black rounded-tr-full group-hover:bg-[#cc0000] transition-colors"></div>
                  <div className="w-[8px] h-[50%] bg-black rounded-tr-full group-hover:bg-[#cc0000] transition-colors"></div>
                </div>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex space-x-6 font-black text-[13px] uppercase tracking-wider text-black">
              <a href="#" className="hover:text-[#cc0000] hover:underline underline-offset-8 decoration-2 transition-all">Men's</a>
              <a href="#" className="hover:text-[#cc0000] hover:underline underline-offset-8 decoration-2 transition-all">Women's</a>
              <a href="#" className="hover:text-[#cc0000] hover:underline underline-offset-8 decoration-2 transition-all">Kids'</a>
              <a href="#" className="hover:text-[#cc0000] hover:underline underline-offset-8 decoration-2 transition-all">Bags & Gear</a>
              <a href="#" className="hover:text-[#cc0000] hover:underline underline-offset-8 decoration-2 transition-all">Renewed</a>
              <a href="#" className="text-[#cc0000] hover:underline underline-offset-8 decoration-2 transition-all">Sale</a>
            </nav>
          </div>

          <div className="flex items-center space-x-5 text-black">
            <div className="hidden xl:flex items-center bg-gray-100 rounded-sm px-3 py-2 w-64 border border-transparent focus-within:border-[#cc0000] transition-colors">
              <input type="text" placeholder="Search" className="bg-transparent outline-none text-[13px] w-full font-bold uppercase placeholder-gray-500" />
              <Search className="w-4 h-4 ml-2 text-gray-500" />
            </div>
            <Search className="w-6 h-6 xl:hidden cursor-pointer hover:text-[#cc0000] transition-colors" />
            <div className="hidden md:flex items-center cursor-pointer hover:text-[#cc0000] transition-colors">
              <MapPin className="w-6 h-6" />
            </div>
            <div className="hidden md:flex items-center cursor-pointer hover:text-[#cc0000] transition-colors">
              <User className="w-6 h-6" />
            </div>
            <div className="relative cursor-pointer hover:text-[#cc0000] transition-colors" onClick={() => setIsCartOpen(true)}>
              <ShoppingBag className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[#cc0000] text-white text-[10px] font-black px-1.5 rounded-full min-w-[18px] text-center border-2 border-white">{itemCount}</span>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="w-full">

        {/* ─── HERO SECTION ─── */}
        <section className="relative w-full h-[600px] md:h-[750px] flex justify-center items-center overflow-hidden bg-black mb-8 md:mb-16">
          <Image
            src={data.bannerImage}
            alt="Hero Banner"
            fill
            className="object-cover object-center opacity-80 scale-105"
            priority
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

          <div className="relative z-10 px-6 max-w-5xl text-center text-white mt-auto pb-16 md:pb-24">
            <div className="inline-block bg-[#cc0000] text-white text-[12px] md:text-[14px] font-black px-4 py-1.5 uppercase tracking-widest mb-6">Summit Series™</div>
            <h1 className="text-[48px] md:text-[88px] font-black uppercase tracking-tighter leading-[0.9] mb-6 drop-shadow-2xl">{data.name}</h1>
            <p className="text-[18px] md:text-[24px] font-bold mb-10 mx-auto max-w-3xl drop-shadow-lg leading-tight uppercase tracking-wide">{data.description || 'Tested by athletes. Proven in the wild.'}</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-white text-black px-10 py-4 font-black uppercase tracking-widest text-[14px] hover:bg-[#cc0000] hover:text-white transition-all shadow-lg text-center">
                Shop Men's
              </button>
              <button className="bg-white text-black px-10 py-4 font-black uppercase tracking-widest text-[14px] hover:bg-[#cc0000] hover:text-white transition-all shadow-lg text-center">
                Shop Women's
              </button>
            </div>
          </div>
        </section>

        {/* ─── NEW ARRIVALS GRID (Paginated) ─── */}
        <section className="px-4 md:px-8 max-w-[1600px] mx-auto mb-20">
          <div className="flex items-end justify-between mb-8 border-b-[3px] border-black pb-4">
            <h2 className="text-[32px] md:text-[48px] font-black uppercase tracking-tighter text-black leading-none">New Arrivals ({totalItems})</h2>
            <a href="#" className="hidden md:flex text-[14px] font-black uppercase tracking-widest text-black hover:text-[#cc0000] transition-colors items-center">
              View All <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 md:gap-4">
            {paginatedItems.map((product, idx) => (
              <div key={product.id || idx} data-product-id={product.id} className="group cursor-pointer flex flex-col bg-white">
                <div className="relative aspect-[4/5] mb-3 bg-[#f4f4f4] overflow-hidden">
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out mix-blend-multiply"
                    referrerPolicy="no-referrer"
                  />
                  {idx % 3 === 0 && (
                    <div className="absolute top-0 left-0 bg-[#cc0000] text-white text-[9px] font-black px-2 py-0.5 uppercase tracking-widest shadow-sm">
                      Best Seller
                    </div>
                  )}
                  {idx === 1 && (
                    <div className="absolute top-0 left-0 bg-black text-white text-[9px] font-black px-2 py-0.5 uppercase tracking-widest shadow-sm">
                      New Color
                    </div>
                  )}
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }}
                    className="absolute bottom-3 right-3 bg-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:text-[#cc0000]"
                  >
                    <Heart className={`w-4 h-4 ${favorites.includes(product.id) ? 'fill-[#cc0000] text-[#cc0000]' : ''}`} strokeWidth={2} />
                  </button>
                  <button 
                    onClick={(e) => handleAddToCart(product, e)}
                    className="absolute bottom-3 left-3 bg-[#cc0000] text-white px-3 py-1.5 text-[9px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-col flex-1 pl-1">
                  <div className="flex gap-1.5 mb-2">
                    <div className="w-4 h-4 rounded-full bg-black border border-gray-300"></div>
                    <div className="w-4 h-4 rounded-full bg-yellow-600 border border-gray-300"></div>
                    <div className="w-4 h-4 rounded-full bg-blue-800 border border-gray-300"></div>
                    <span className="text-[10px] font-bold text-gray-500 self-center ml-1">+4</span>
                  </div>
                  <div className="text-[9px] font-black uppercase tracking-widest text-[#cc0000] mb-0.5">{product.category}</div>
                  <h3 className="text-[13px] md:text-[14px] font-black uppercase text-black line-clamp-2 leading-tight group-hover:text-[#cc0000] transition-colors">
                    {product.title}
                  </h3>
                  <div className="text-[15px] font-black text-black mt-1">
                    ${product.price}
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

          <div className="mt-8 flex justify-center md:hidden">
            <button className="border-2 border-black bg-white text-black px-10 py-3.5 font-black uppercase tracking-widest text-[14px] w-full hover:bg-black hover:text-white transition-all">
              View All
            </button>
          </div>
        </section>

        {/* ─── CATEGORY SECTION ─── */}
        <section className="w-full bg-[#f4f4f4] py-16 md:py-24 px-4 border-y-2 border-gray-200 mb-16">
          <div className="max-w-[1600px] mx-auto">
            <h2 className="text-[32px] md:text-[48px] font-black uppercase tracking-tighter text-black leading-none mb-10 text-center">Shop By Activity</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              <div className="relative h-[400px] md:h-[500px] group cursor-pointer overflow-hidden">
                <Image src="https://picsum.photos/800/800?random=401" alt="Hiking" fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <Target className="w-10 h-10 mb-4 text-[#cc0000]" />
                  <h3 className="text-[32px] font-black uppercase tracking-tighter leading-none mb-4">Trail & Hike</h3>
                  <button className="bg-white text-black px-8 py-3 font-black uppercase tracking-widest text-[12px] hover:bg-[#cc0000] hover:text-white transition-all">
                    Explore
                  </button>
                </div>
              </div>

              <div className="relative h-[400px] md:h-[500px] group cursor-pointer overflow-hidden">
                <Image src="https://picsum.photos/800/800?random=402" alt="Snow" fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <Navigation className="w-10 h-10 mb-4 text-[#cc0000]" />
                  <h3 className="text-[32px] font-black uppercase tracking-tighter leading-none mb-4">Snowsports</h3>
                  <button className="bg-white text-black px-8 py-3 font-black uppercase tracking-widest text-[12px] hover:bg-[#cc0000] hover:text-white transition-all">
                    Explore
                  </button>
                </div>
              </div>

              <div className="relative h-[400px] md:h-[500px] group cursor-pointer overflow-hidden">
                <Image src="https://picsum.photos/800/800?random=403" alt="Urban" fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <MapPin className="w-10 h-10 mb-4 text-[#cc0000]" />
                  <h3 className="text-[32px] font-black uppercase tracking-tighter leading-none mb-4">Urban Exploration</h3>
                  <button className="bg-white text-black px-8 py-3 font-black uppercase tracking-widest text-[12px] hover:bg-[#cc0000] hover:text-white transition-all">
                    Explore
                  </button>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ─── TRENDING NOW ─── */}
        <section className="px-4 md:px-8 max-w-[1600px] mx-auto mb-20">
          <h2 className="text-[32px] md:text-[48px] font-black uppercase tracking-tighter text-black leading-none mb-10 text-center">Trending This Week</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: 'ThermoBall™ Eco Jacket', tag: '#1 Trending', img: 'https://picsum.photos/500/600?random=410' },
              { title: 'Vectiv™ Trail Runners', tag: 'Hot Right Now', img: 'https://picsum.photos/500/600?random=411' },
              { title: 'Base Camp Duffel', tag: 'Fan Favorite', img: 'https://picsum.photos/500/600?random=412' },
              { title: 'Summit Series™ Parka', tag: 'Staff Pick', img: 'https://picsum.photos/500/600?random=413' },
            ].map((item, i) => (
              <div key={i} className="group cursor-pointer relative overflow-hidden">
                <div className="relative aspect-[3/4]">
                  <Image src={item.img} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute top-3 left-3 bg-[#cc0000] text-white text-[10px] font-black px-2 py-0.5 uppercase tracking-widest">{item.tag}</div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white text-[18px] font-black uppercase tracking-tight leading-tight">{item.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── CUSTOMER REVIEWS ─── */}
        <section className="w-full bg-[#f4f4f4] py-16 md:py-20 px-4 border-y-2 border-gray-200 mb-16">
          <div className="max-w-[1600px] mx-auto">
            <h2 className="text-[32px] md:text-[48px] font-black uppercase tracking-tighter text-black leading-none mb-10 text-center">What Explorers Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: 'Alex M.', text: 'Took the ThermoBall jacket to Patagonia. Kept me warm at -15°C. Absolutely bombproof gear.', rating: 5 },
                { name: 'Sarah K.', text: 'The Vectiv trail shoes changed my running game. Best grip I\'ve ever had on wet terrain.', rating: 5 },
                { name: 'James R.', text: 'Base Camp Duffel survived 3 months of backpacking through Southeast Asia. Still looks brand new.', rating: 4 },
              ].map((review, i) => (
                <div key={i} className="bg-white p-8 border-2 border-black">
                  <div className="flex mb-4">
                    {[1,2,3,4,5].map(s => (
                      <span key={s} className={`text-[20px] ${s <= review.rating ? 'text-[#cc0000]' : 'text-gray-300'}`}>★</span>
                    ))}
                  </div>
                  <p className="text-[16px] font-bold text-gray-700 mb-6 leading-relaxed">&ldquo;{review.text}&rdquo;</p>
                  <div className="text-[13px] font-black uppercase tracking-widest text-black">{review.name}</div>
                  <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Verified Explorer</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SUSTAINABILITY ─── */}
        <section className="px-4 md:px-8 max-w-[1600px] mx-auto mb-20">
          <div className="flex flex-col md:flex-row bg-[#2d5016] text-white overflow-hidden">
            <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
              <div className="bg-white/20 text-white text-[12px] font-black px-4 py-1.5 uppercase tracking-widest w-fit mb-6">Our Commitment</div>
              <h2 className="text-[36px] md:text-[48px] font-black uppercase tracking-tighter leading-tight mb-6">Explore Without A Trace</h2>
              <p className="text-[18px] font-medium text-white/80 mb-8 max-w-md leading-relaxed">
                By 2025, 100% of our top materials will be recycled, regenerative, or responsibly sourced. We&apos;re committed to protecting the places we explore.
              </p>
              <button className="bg-white text-[#2d5016] px-8 py-4 font-black uppercase tracking-widest text-[13px] hover:bg-[#cc0000] hover:text-white transition-all w-fit">
                Learn More
              </button>
            </div>
            <div className="w-full md:w-1/2 relative h-[300px] md:h-auto">
              <Image src="https://picsum.photos/800/600?random=415" alt="Sustainability" fill className="object-cover" />
            </div>
          </div>
        </section>

        {/* ─── SERVICES ─── */}
        <section className="w-full bg-black text-white py-16 md:py-20 px-4 mb-16">
          <div className="max-w-[1600px] mx-auto">
            <h2 className="text-[32px] md:text-[48px] font-black uppercase tracking-tighter leading-none mb-12 text-center">Why ExtremeExplorer</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { icon: '🚚', title: 'Free Shipping', desc: 'On orders over $99' },
                { icon: '🔄', title: 'Easy Returns', desc: '60-day return policy' },
                { icon: '🛡️', title: 'Lifetime Warranty', desc: 'We stand behind our gear' },
                { icon: '🏔️', title: 'Athlete Tested', desc: 'Proven in extreme conditions' },
              ].map((service, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="text-[40px] mb-4">{service.icon}</div>
                  <h3 className="text-[16px] font-black uppercase tracking-widest mb-2">{service.title}</h3>
                  <p className="text-[13px] font-bold text-gray-400">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── APP DOWNLOAD ─── */}
        <section className="px-4 md:px-8 max-w-[1600px] mx-auto mb-20">
          <div className="flex flex-col md:flex-row items-center bg-[#f4f4f4] border-2 border-gray-200 p-10 md:p-16 gap-10">
            <div className="w-full md:w-1/2">
              <div className="bg-[#cc0000] text-white text-[12px] font-black px-4 py-1.5 uppercase tracking-widest w-fit mb-6">New App</div>
              <h2 className="text-[36px] md:text-[48px] font-black uppercase tracking-tighter leading-tight mb-6">Explore On The Go</h2>
              <p className="text-[18px] font-medium text-gray-600 mb-8 max-w-md leading-relaxed">
                Download the ExtremeExplorer app for exclusive drops, trail maps, XPLR Pass rewards, and a seamless shopping experience.
              </p>
              <div className="flex gap-4">
                <button className="bg-black text-white px-8 py-4 font-black uppercase tracking-widest text-[12px] hover:bg-[#cc0000] transition-all">App Store</button>
                <button className="bg-black text-white px-8 py-4 font-black uppercase tracking-widest text-[12px] hover:bg-[#cc0000] transition-all">Google Play</button>
              </div>
            </div>
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="relative w-[250px] h-[500px] bg-black rounded-[40px] border-4 border-gray-300 overflow-hidden shadow-2xl">
                <Image src="https://picsum.photos/400/800?random=416" alt="App" fill className="object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* ─── EDITORIAL / STORIES ─── */}
        <section className="px-4 md:px-8 max-w-[1600px] mx-auto mb-20">
          <h2 className="text-[32px] md:text-[48px] font-black uppercase tracking-tighter text-black leading-none mb-10 text-center">Explorer Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'Summit to Sea: A 30-Day Challenge', img: 'https://picsum.photos/800/500?random=417', tag: 'Adventure' },
              { title: 'The Science Behind ThermoBall™', img: 'https://picsum.photos/800/500?random=418', tag: 'Innovation' },
            ].map((story, i) => (
              <div key={i} className="group cursor-pointer relative overflow-hidden h-[350px]">
                <Image src={story.img} alt={story.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute top-4 left-4 bg-[#cc0000] text-white text-[10px] font-black px-3 py-1 uppercase tracking-widest">{story.tag}</div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-white text-[24px] md:text-[32px] font-black uppercase tracking-tighter leading-tight mb-4">{story.title}</h3>
                  <button className="text-white text-[13px] font-black uppercase tracking-widest flex items-center hover:text-[#cc0000] transition-colors">
                    Read More <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── XPLR PASS PROMO ─── */}
        <section className="px-4 md:px-8 max-w-[1600px] mx-auto mb-20 flex flex-col md:flex-row bg-black text-white p-0 overflow-hidden">
          <div className="w-full md:w-1/2 relative h-[300px] md:h-auto overflow-hidden">
            <Image src="https://picsum.photos/1000/800?random=405" alt="XPLR Pass" fill className="object-cover opacity-80" />
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <h2 className="text-[60px] md:text-[100px] font-black uppercase tracking-tighter leading-[0.8] text-center drop-shadow-2xl">XPLR<br className="hidden md:block" /><span className="text-[#cc0000] outline-text">PASS</span></h2>
            </div>
          </div>
          <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
            <div className="bg-[#cc0000] text-white text-[12px] font-black px-4 py-1.5 uppercase tracking-widest w-fit mb-6">Join For Free</div>
            <h2 className="text-[36px] md:text-[48px] font-black uppercase tracking-tighter leading-tight mb-6">Get 10% Off Your First Online Order</h2>
            <p className="text-[18px] font-medium text-gray-300 mb-10 max-w-md">
              Join XPLR Pass™ and earn points on every purchase, get exclusive access to gear, and enjoy free shipping on all orders.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-black px-8 py-4 font-black uppercase tracking-widest text-[13px] hover:bg-[#cc0000] hover:text-white transition-all text-center">
                Join Now
              </button>
              <button className="border-2 border-white text-white px-8 py-4 font-black uppercase tracking-widest text-[13px] hover:bg-white hover:text-black transition-all text-center">
                Learn More
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* ─── FOOTER ─── */}
      <footer className="bg-[#111111] text-white w-full border-t-8 border-[#cc0000]">

        {/* Newsletter / Social */}
        <div className="border-b border-gray-800">
          <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-12 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
            <div className="max-w-xl">
              <h3 className="text-[24px] font-black uppercase tracking-tighter mb-2">Explore the world with us</h3>
              <p className="text-gray-400 font-bold text-[14px]">
                Sign up for the latest news, events, and exclusive access to gear.
              </p>
            </div>
            <form className="flex w-full lg:w-auto flex-1 max-w-lg">
              <input type="email" placeholder="Email Address" className="bg-white text-black px-4 py-4 outline-none flex-1 font-bold font-sans" />
              <button type="button" className="bg-[#cc0000] text-white px-8 py-4 font-black uppercase tracking-widest text-[13px] hover:bg-black transition-colors shrink-0">
                Sign Up
              </button>
            </form>
          </div>
        </div>

        {/* Main Links */}
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-[12px] font-black uppercase tracking-widest text-gray-400">

            <div className="flex flex-col space-y-4">
              <h4 className="text-white mb-2 text-[16px] tracking-tighter">Shop</h4>
              <a href="#" className="hover:text-[#cc0000] transition-colors">Men's</a>
              <a href="#" className="hover:text-[#cc0000] transition-colors">Women's</a>
              <a href="#" className="hover:text-[#cc0000] transition-colors">Kids'</a>
              <a href="#" className="hover:text-[#cc0000] transition-colors">Footwear</a>
              <a href="#" className="hover:text-[#cc0000] transition-colors">Equipment</a>
              <a href="#" className="hover:text-[#cc0000] transition-colors">By Activity</a>
              <a href="#" className="hover:text-[#cc0000] transition-colors">Gift Cards</a>
              <a href="#" className="hover:text-[#cc0000] transition-colors">Sale</a>
            </div>

            <div className="flex flex-col space-y-4">
              <h4 className="text-white mb-2 text-[16px] tracking-tighter">Help</h4>
              <a href="#" className="hover:text-[#cc0000] transition-colors">Help Center</a>
              <a href="#" className="hover:text-[#cc0000] transition-colors">Order Status</a>
              <a href="#" className="hover:text-[#cc0000] transition-colors">Returns</a>
              <a href="#" className="hover:text-[#cc0000] transition-colors">Warranty</a>
              <a href="#" className="hover:text-[#cc0000] transition-colors">Shipping Options</a>
              <a href="#" className="hover:text-[#cc0000] transition-colors">Size Charts</a>
              <a href="#" className="hover:text-[#cc0000] transition-colors">Contact Us</a>
            </div>

            <div className="flex flex-col space-y-4">
              <h4 className="text-white mb-2 text-[16px] tracking-tighter">About TNF</h4>
              <a href="#" className="hover:text-[#cc0000] transition-colors">About Us</a>
              <a href="#" className="hover:text-[#cc0000] transition-colors">Responsibility</a>
              <a href="#" className="hover:text-[#cc0000] transition-colors">Explore Fund</a>
              <a href="#" className="hover:text-[#cc0000] transition-colors">Careers</a>
              <a href="#" className="hover:text-[#cc0000] transition-colors">Students</a>
              <a href="#" className="hover:text-[#cc0000] transition-colors">Military & First Responders</a>
            </div>

            <div className="flex flex-col space-y-4">
              <h4 className="text-white mb-2 text-[16px] tracking-tighter">Discover</h4>
              <a href="#" className="hover:text-[#cc0000] transition-colors">XPLR Pass™</a>
              <a href="#" className="hover:text-[#cc0000] transition-colors">Athlete Team</a>
              <a href="#" className="hover:text-[#cc0000] transition-colors">Speaker Series</a>
              <a href="#" className="hover:text-[#cc0000] transition-colors">TNF Renewed</a>
              <div className="mt-8 flex items-center space-x-4">
                <MapPin className="w-5 h-5 text-white" />
                <a href="#" className="text-white hover:text-[#cc0000] underline underline-offset-4 transition-colors">Find a Store</a>
              </div>
            </div>

          </div>

          <div className="pt-16 mt-16 border-t border-gray-800 flex flex-col md:flex-row items-baseline justify-between gap-6 text-[10px] font-black uppercase tracking-widest text-gray-500">
            <span>© 2026 ExtremeExplorer, A VF Company</span>
            <div className="flex flex-wrap gap-4 md:gap-8 justify-center">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
              <a href="#" className="hover:text-white transition-colors">Do Not Sell My Info</a>
              <a href="#" className="hover:text-white transition-colors">Accessibility</a>
              <a href="#" className="hover:text-white transition-colors">CA Supply Chains Act</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

