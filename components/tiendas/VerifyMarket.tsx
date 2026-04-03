'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { StoreData, Product } from '@/lib/types';
import { useCart } from '@/contexts/CartContext';
import { Search, ShoppingBag, ShoppingCart, Heart, User, TrendingUp, ShieldCheck, Globe, HelpCircle, ChevronRight, X, Menu, Info, ArrowRight, Activity } from 'lucide-react';
import { usePagination, ProductPagination } from '@/components/componentes-compartidos/templates/Pagination';

export default function VerifyMarketTemplate({ data }: { data: StoreData }) {
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

  const featuredProduct = paginatedItems[0];
  const recommendedProducts = paginatedItems.slice(1, 7);
  const trendingProducts = paginatedItems.slice(2, 6);

  return (
    <div className="min-h-full bg-white font-sans text-black selection:bg-[#006341] selection:text-white pb-0 overflow-x-hidden">

      {/* ─── TOP PROMO BAR ─── */}
      <div className="bg-[#006341] text-white text-[12px] md:text-[13px] py-1.5 px-6 flex justify-center items-center font-bold tracking-normal leading-none w-full shadow-sm z-50 relative">
        <span>Verified Authentic. Every Time. Shop with Confidence.</span>
      </div>

      {/* ─── SECONDARY TOP BAR (Utility Nav) ─── */}
      <div className="hidden lg:flex justify-between items-center w-full px-8 py-2 border-b border-gray-100 text-[13px] font-medium text-gray-700 bg-white">
        <div className="flex items-center space-x-6">
          <a href="#" className="hover:text-black transition-colors flex items-center"><Globe className="w-4 h-4 mr-1.5" /> EN | USD</a>
        </div>
        <div className="flex items-center space-x-6">
          <a href="#" className="hover:text-black transition-colors flex items-center"><HelpCircle className="w-4 h-4 mr-1.5" /> Help</a>
          <a href="#" className="hover:text-black transition-colors">Sell</a>
          <a href="#" className="hover:text-black transition-colors">Login</a>
          <a href="#" className="hover:text-black transition-colors">Sign Up</a>
        </div>
      </div>

      {/* ─── MAIN HEADER ─── */}
      <header className="bg-white sticky top-0 z-40 border-b border-gray-200">
        <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 h-[72px] flex items-center justify-between">
          <div className="flex items-center justify-between w-full lg:w-auto h-full space-x-4 md:space-x-8">
            <div className="flex items-center">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden mr-4 cursor-pointer p-1 hover:bg-gray-100 rounded-md transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <div className="font-black text-[28px] md:text-[36px] tracking-tighter uppercase cursor-pointer flex items-center select-none pt-1">
                STOCK<span className="text-[#006341]">X</span>
              </div>
            </div>

            {/* Main Search Bar */}
            <div className="hidden lg:flex items-center bg-[#f7f7f7] rounded-[4px] px-4 py-2 w-[400px] xl:w-[600px] border border-transparent hover:border-gray-300 focus-within:border-black focus-within:bg-white transition-all">
              <Search className="w-5 h-5 text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search for brand, color, etc."
                className="bg-transparent outline-none text-[15px] w-full font-medium placeholder-gray-500 text-black leading-tight"
              />
            </div>

            <div className="flex lg:hidden items-center space-x-4">
              <Search className="w-6 h-6 cursor-pointer" />
              <ShoppingCart className="w-6 h-6 cursor-pointer" />
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-8 text-[15px] font-bold tracking-tight">
            <a href="#" className="hover:text-[#006341] transition-colors relative group">
              Browse
              <div className="absolute top-[100%] left-0 w-full h-[3px] bg-[#006341] scale-x-0 group-hover:scale-x-100 transition-transform origin-left mt-[23px]"></div>
            </a>
            <a href="#" className="hover:text-[#006341] transition-colors relative group">
              News
              <div className="absolute top-[100%] left-0 w-full h-[3px] bg-[#006341] scale-x-0 group-hover:scale-x-100 transition-transform origin-left mt-[23px]"></div>
            </a>
            <a href="#" className="hover:text-[#006341] transition-colors relative group">
              About
              <div className="absolute top-[100%] left-0 w-full h-[3px] bg-[#006341] scale-x-0 group-hover:scale-x-100 transition-transform origin-left mt-[23px]"></div>
            </a>
            <div className="flex items-center space-x-6 border-l border-gray-200 pl-8">
              <button className="flex flex-col items-center cursor-pointer hover:text-[#006341] transition-colors group">
                <User className="w-[22px] h-[22px] group-hover:fill-[#006341]/10" strokeWidth={1.5} />
              </button>
              <button 
                onClick={() => toggleFavorite('header')}
                className="flex flex-col items-center cursor-pointer hover:text-[#006341] transition-colors group relative"
              >
                <Heart className={`w-[22px] h-[22px] group-hover:fill-[#006341]/10 ${favorites.length > 0 ? 'fill-red-500 text-red-500' : ''}`} strokeWidth={1.5} />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[9px] font-black px-1.5 rounded-full">{favorites.length}</span>
                )}
              </button>
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative flex flex-col items-center cursor-pointer hover:text-[#006341] transition-colors group"
              >
                <ShoppingBag className="w-[22px] h-[22px] group-hover:fill-[#006341]/10" strokeWidth={1.5} />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-2 bg-[#006341] text-white text-[9px] font-black px-1.5 rounded-full">{itemCount}</span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Categories Nav */}
        <nav className="hidden lg:flex justify-start xl:justify-center space-x-8 py-3.5 px-8 border-t border-gray-100 font-bold text-[14px] text-gray-800 tracking-wide overflow-x-auto">
          <a href="#" className="hover:text-[#006341] transition-colors whitespace-nowrap">Sneakers</a>
          <a href="#" className="hover:text-[#006341] transition-colors whitespace-nowrap">Shoes</a>
          <a href="#" className="hover:text-[#006341] transition-colors whitespace-nowrap">Apparel</a>
          <a href="#" className="hover:text-[#006341] transition-colors whitespace-nowrap">Electronics</a>
          <a href="#" className="hover:text-[#006341] transition-colors whitespace-nowrap">Trading Cards</a>
          <a href="#" className="hover:text-[#006341] transition-colors whitespace-nowrap">Collectibles</a>
          <a href="#" className="hover:text-[#006341] transition-colors whitespace-nowrap">Accessories</a>
        </nav>
      </header>

      <main className="w-full max-w-[1440px] mx-auto px-4 md:px-8 py-8 md:py-12">

        {/* ─── MARKET DATA HERO ─── */}
        <div className="flex flex-col lg:flex-row gap-6 mb-16">
          <div className="relative h-[400px] md:h-[500px] flex-1 group cursor-pointer overflow-hidden rounded-[8px] bg-[#f7f7f7]">
            <Image
              src={data.bannerImage}
              alt="Banner"
              fill
              className="object-cover md:object-contain group-hover:scale-105 transition-transform duration-[800ms] p-12 mix-blend-multiply"
              referrerPolicy="no-referrer"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
            <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end text-white text-shadow-md">
              <h1 className="text-[32px] md:text-[48px] font-black uppercase tracking-tight mb-2 leading-[1.1] drop-shadow-xl">{data.name}</h1>
              <p className="text-[16px] md:text-[20px] font-medium mb-6 drop-shadow-lg max-w-lg leading-snug opacity-90">{data.description || 'The current culture marketplace.'}</p>
              <button className="bg-white text-black px-8 py-3.5 rounded-[4px] font-bold uppercase text-[14px] tracking-wide hover:bg-gray-100 transition-colors shadow-lg w-fit flex items-center">
                Shop the Collection <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>

          <div className="hidden lg:flex flex-col w-[350px] space-y-4">
            <div className="bg-[#f7f7f7] rounded-[8px] p-6 h-full flex flex-col justify-between border border-gray-100 hover:border-gray-200 transition-colors">
              <div>
                <div className="flex items-center text-[#08a05c] font-black text-[12px] uppercase tracking-wider mb-4">
                  <Activity className="w-4 h-4 mr-1.5" /> Market Insights
                </div>
                {featuredProduct && (
                  <>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-[80px] h-[80px] relative bg-white rounded-[4px] p-2 border border-gray-200">
                        <Image src={featuredProduct.imageUrl} fill className="object-contain" alt="" referrerPolicy="no-referrer" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[14px] leading-tight line-clamp-2">{featuredProduct.title}</h4>
                        <p className="text-[12px] text-gray-500 mt-1">{featuredProduct.category || "Sneakers"}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-t border-gray-200 pt-4">
                      <div className="flex flex-col">
                        <span className="text-[11px] text-gray-500 font-bold uppercase tracking-wide">Lowest Ask</span>
                        <span className="text-[24px] font-black">${featuredProduct.price}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[11px] text-gray-500 font-bold uppercase tracking-wide">Highest Bid</span>
                        <span className="text-[24px] font-black text-[#08a05c]">${featuredProduct.originalPrice || featuredProduct.price}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between text-[12px] font-medium text-gray-600">
                      <span>Last Sale: ${featuredProduct.price}</span>
                      <span className="flex items-center text-[#08a05c] font-bold"><TrendingUp className="w-3 h-3 mr-1" /> +$12 (3.5%)</span>
                    </div>

                    <div className="flex space-x-3 mt-6">
                      <button className="flex-1 bg-[#08a05c] text-white py-2.5 rounded-[4px] font-bold text-[14px] hover:bg-[#068a4e] transition-colors">
                        Buy Options
                      </button>
                      <button className="flex-1 bg-black text-white py-2.5 rounded-[4px] font-bold text-[14px] hover:bg-gray-800 transition-colors">
                        Sell Options
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ─── PRODUCT SLIDER 1 ─── */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[24px] font-black tracking-tight text-gray-900">Recommended For You</h2>
            <a href="#" className="hidden md:flex text-[14px] font-bold text-[#006341] hover:underline items-center">
              See All <ChevronRight className="w-4 h-4 ml-0.5" />
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {recommendedProducts.map((product: any) => (
              <div key={product.id} data-product-id={product.id} data-discount={product.discount || 0} className="group cursor-pointer flex flex-col bg-white border border-gray-200 p-4 rounded-[8px] hover:shadow-[0_4px_15px_rgba(0,0,0,0.08)] hover:border-gray-300 transition-all">
                <div className="relative aspect-square mb-4 overflow-hidden bg-white p-2 flex items-center justify-center">
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }}
                    className="absolute top-0 right-0 w-[40px] h-[40px] flex justify-end"
                  >
                    <Heart className={`w-5 h-5 transition-colors stroke-[2px] ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-300 group-hover:text-gray-500'}`} />
                  </button>
                </div>
                <div className="flex flex-col h-[100px]">
                  <h3 className="text-[14px] font-medium text-black line-clamp-2 leading-tight w-full hover:underline">{product.title}</h3>
                  <div className="mt-auto">
                    <div className="text-[11px] text-gray-500 font-bold uppercase mt-2 mb-0.5">Lowest Ask</div>
                    <div className="font-black text-[20px] text-black leading-none">${product.price}</div>
                    {product.discount && product.discount > 0 && (
                      <div className="text-[11px] font-medium mt-1.5 flex items-center justify-between border-t border-gray-100 pt-1.5">
                        <span className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-[2px]">{product.discount}% off</span>
                      </div>
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
        </div>

        {/* ─── BANNER / CALL TO ACTION ─── */}
        <div className="w-full bg-[#f2f2f2] rounded-[8px] p-8 md:p-12 mb-16 flex flex-col md:flex-row items-center justify-between border border-gray-200">
          <div className="max-w-xl text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-[24px] md:text-[32px] font-black tracking-tight mb-2">Sell on VerifyMarket</h2>
            <p className="text-[16px] text-gray-600 font-medium leading-relaxed">List your items in minutes. Ship to us. Get paid quickly. Secure, transparent, and hassle-free selling.</p>
          </div>
          <button className="bg-black text-white px-8 py-3.5 rounded-[4px] font-bold text-[15px] hover:bg-gray-800 transition-colors min-w-[200px] shadow-md">
            Start Selling
          </button>
        </div>

        {/* ─── PRODUCT SLIDER 2 ─── */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[24px] font-black tracking-tight text-gray-900">Trending Apparel</h2>
            <a href="#" className="hidden md:flex text-[14px] font-bold text-[#006341] hover:underline items-center">
              See All <ChevronRight className="w-4 h-4 ml-0.5" />
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trendingProducts.map(product => (
              <div key={product.id} data-product-id={product.id} className="group cursor-pointer flex flex-col bg-white border border-gray-200 p-4 rounded-[8px] hover:shadow-[0_4px_15px_rgba(0,0,0,0.08)] transition-all">
                <div className="relative aspect-square mb-4 overflow-hidden bg-[#f7f7f7] rounded-[4px] p-6 flex items-center justify-center">
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    fill
                    className="object-contain mix-blend-multiply p-4 group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 left-2 bg-white border border-gray-200 rounded-[4px] text-[10px] font-bold px-2 py-0.5 flex items-center shadow-sm">
                    <ShieldCheck className="w-[11px] h-[11px] text-[#08a05c] mr-1" /> Verified
                  </div>
                </div>
                <div className="flex flex-col">
                  <h3 className="text-[14px] font-medium text-black line-clamp-2 leading-tight hover:underline min-h-[40px]">{product.title}</h3>
                  <div className="text-[11px] text-gray-500 font-bold uppercase mt-2 mb-0.5">Lowest Ask</div>
                  <div className="font-black text-[22px] text-black leading-none">${product.price}</div>
                  <div className="text-[11px] font-medium text-[#08a05c] flex items-center mt-2 border-t border-gray-100 pt-1.5">
                    {product.discount && product.discount > 0 && <TrendingUp className="w-3 h-3 mr-1" />}
                    {product.discount && product.discount > 0 && `Last Sale: -${product.discount}%`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── HOW IT WORKS ─── */}
        <div className="mb-20 bg-[#f7f7f7] rounded-[8px] p-8 md:p-14 border border-gray-100">
          <h2 className="text-[28px] md:text-[36px] font-black tracking-tight text-center mb-4">How VerifyMarket Works</h2>
          <p className="text-[16px] text-gray-500 text-center mb-12 max-w-2xl mx-auto">The stock market of things. Buy and sell the most coveted items with complete transparency.</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Place Bid', desc: 'Set your price or buy at the lowest ask. Our live marketplace connects buyers and sellers.' },
              { step: '02', title: 'Seller Ships', desc: 'Once matched, the seller ships the item directly to our authentication center.' },
              { step: '03', title: 'We Verify', desc: 'Our team of experts inspects every detail to ensure 100% authenticity.' },
              { step: '04', title: 'Delivered', desc: 'After passing verification, the item is shipped to you with our Verified Authentic tag.' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="text-[48px] font-black text-[#006341] leading-none mb-4">{item.step}</div>
                <h3 className="text-[16px] font-bold mb-2">{item.title}</h3>
                <p className="text-[14px] text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ─── POPULAR BRANDS ─── */}
        <div className="mb-20">
          <h2 className="text-[24px] font-black tracking-tight text-gray-900 mb-8">Popular Brands</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: 'Nike', img: 'https://picsum.photos/200/200?random=600' },
              { name: 'Jordan', img: 'https://picsum.photos/200/200?random=601' },
              { name: 'Adidas', img: 'https://picsum.photos/200/200?random=602' },
              { name: 'New Balance', img: 'https://picsum.photos/200/200?random=603' },
              { name: 'Supreme', img: 'https://picsum.photos/200/200?random=604' },
              { name: 'Yeezy', img: 'https://picsum.photos/200/200?random=605' },
            ].map((brand, i) => (
              <div key={i} className="bg-[#f7f7f7] rounded-[8px] p-6 flex flex-col items-center cursor-pointer hover:shadow-md hover:border-gray-300 border border-transparent transition-all group">
                <div className="w-[80px] h-[80px] relative mb-4">
                  <Image src={brand.img} alt={brand.name} fill className="object-contain rounded-full group-hover:scale-110 transition-transform" />
                </div>
                <span className="text-[14px] font-bold">{brand.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ─── AUTHENTICATION GUARANTEE ─── */}
        <div className="mb-20 bg-[#006341] rounded-[8px] p-8 md:p-14 text-white text-center">
          <ShieldCheck className="w-16 h-16 mx-auto mb-6 opacity-80" />
          <h2 className="text-[28px] md:text-[36px] font-black tracking-tight mb-4">Our Authentication Promise</h2>
          <p className="text-[16px] font-medium opacity-80 max-w-2xl mx-auto mb-10 leading-relaxed">
            Every item sold on VerifyMarket goes through our rigorous multi-step authentication process. Our team of over 200 expert authenticators ensures that every product is 100% genuine.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-[8px]">
              <h3 className="font-black text-[36px] leading-none mb-2">200+</h3>
              <p className="text-[14px] font-bold uppercase tracking-wide opacity-70">Expert Authenticators</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-[8px]">
              <h3 className="font-black text-[36px] leading-none mb-2">99.97%</h3>
              <p className="text-[14px] font-bold uppercase tracking-wide opacity-70">Accuracy Rate</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-[8px]">
              <h3 className="font-black text-[36px] leading-none mb-2">10M+</h3>
              <p className="text-[14px] font-bold uppercase tracking-wide opacity-70">Items Verified</p>
            </div>
          </div>
        </div>

        {/* ─── MOST POPULAR CATEGORIES ─── */}
        <div className="mb-20">
          <h2 className="text-[24px] font-black tracking-tight text-gray-900 mb-8">Most Popular</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Sneakers', count: '45,000+ listings', img: 'https://picsum.photos/800/500?random=610' },
              { name: 'Streetwear', count: '28,000+ listings', img: 'https://picsum.photos/800/500?random=611' },
              { name: 'Electronics', count: '12,000+ listings', img: 'https://picsum.photos/800/500?random=612' },
            ].map((cat, i) => (
              <div key={i} className="relative h-[280px] rounded-[8px] overflow-hidden group cursor-pointer">
                <Image src={cat.img} alt={cat.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-75" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="font-black text-[24px] mb-1">{cat.name}</h3>
                  <p className="text-[14px] font-medium opacity-80">{cat.count}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── APP DOWNLOAD ─── */}
        <div className="mb-20 flex flex-col md:flex-row bg-black rounded-[8px] overflow-hidden">
          <div className="w-full md:w-1/2 p-8 md:p-14 flex flex-col justify-center text-white">
            <h2 className="text-[28px] md:text-[36px] font-black tracking-tight mb-4">Get the App</h2>
            <p className="text-[16px] text-gray-400 font-medium mb-8 leading-relaxed">
              Shop smarter with real-time notifications, price tracking, and exclusive app-only releases. Available on iOS and Android.
            </p>
            <div className="flex gap-4">
              <button className="bg-white text-black px-6 py-3 rounded-[4px] font-bold text-[14px] hover:bg-gray-200 transition-colors">App Store</button>
              <button className="bg-white text-black px-6 py-3 rounded-[4px] font-bold text-[14px] hover:bg-gray-200 transition-colors">Google Play</button>
            </div>
          </div>
          <div className="w-full md:w-1/2 relative h-[300px] md:h-auto">
            <Image src="https://picsum.photos/800/500?random=615" alt="App" fill className="object-cover" />
          </div>
        </div>

        {/* ─── TRUST BADGES ─── */}
        <div className="mb-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: ShieldCheck, title: 'Verified Authentic', desc: 'Every item authenticated by experts' },
            { icon: Globe, title: 'Global Shipping', desc: 'Ship to 200+ countries worldwide' },
            { icon: Activity, title: 'Live Market Data', desc: 'Real-time pricing and market trends' },
            { icon: HelpCircle, title: '24/7 Support', desc: 'Customer service around the clock' },
          ].map((item, i) => (
            <div key={i} className="bg-[#f7f7f7] rounded-[8px] p-6 text-center border border-gray-100 hover:border-gray-300 transition-colors">
              <item.icon className="w-8 h-8 mx-auto mb-3 text-[#006341]" />
              <h3 className="font-bold text-[14px] mb-1">{item.title}</h3>
              <p className="text-[12px] text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </main>

      {/* ─── FOOTER ─── */}
      <footer className="bg-black pt-16 pb-12 w-full text-white">
        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-8">

          <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-10 lg:gap-16 mb-16 font-medium text-[14px] text-gray-400 leading-loose">
            <div className="flex flex-col col-span-2 xl:col-span-1 border-r-0 xl:border-r border-gray-800 pr-0 xl:pr-8 mb-8 xl:mb-0">
              <div className="font-black text-[28px] tracking-tighter uppercase mb-6 text-white flex items-center leading-none">
                STOCK<span className="text-[#08a05c]">X</span>
              </div>
              <p className="text-[13px] leading-relaxed max-w-sm mb-6">
                The current culture marketplace. We provide access to the world's most coveted items, smarter, easier, and safer.
              </p>
              <div className="flex items-center space-x-2 text-white border-2 border-white rounded-[4px] px-4 py-2 w-fit font-bold text-[14px] hover:bg-white hover:text-black transition-colors cursor-pointer">
                <Globe className="w-4 h-4" />
                <span>United States | English</span>
              </div>
            </div>

            <div className="flex flex-col">
              <h4 className="text-white font-black uppercase text-[15px] mb-4 tracking-wide">VerifyMarket</h4>
              <a href="#" className="hover:text-white transition-colors w-fit">About Us</a>
              <a href="#" className="hover:text-white transition-colors w-fit">How It Works</a>
              <a href="#" className="hover:text-white transition-colors w-fit">Verification</a>
              <a href="#" className="hover:text-white transition-colors w-fit">Careers</a>
              <a href="#" className="hover:text-white transition-colors w-fit">Newsroom</a>
              <a href="#" className="hover:text-white transition-colors w-fit">Company</a>
            </div>

            <div className="flex flex-col">
              <h4 className="text-white font-black uppercase text-[15px] mb-4 tracking-wide">Help</h4>
              <a href="#" className="hover:text-white transition-colors w-fit">Help Center</a>
              <a href="#" className="hover:text-white transition-colors w-fit">Contact Us</a>
              <a href="#" className="hover:text-white transition-colors w-fit">Product Suggestion</a>
              <a href="#" className="hover:text-white transition-colors w-fit">Size Guide</a>
            </div>

            <div className="flex flex-col">
              <h4 className="text-white font-black uppercase text-[15px] mb-4 tracking-wide">Sell</h4>
              <a href="#" className="hover:text-white transition-colors w-fit">Selling Guide</a>
              <a href="#" className="hover:text-white transition-colors w-fit">Professional Tools</a>
              <a href="#" className="hover:text-white transition-colors w-fit">Scout</a>
              <a href="#" className="hover:text-white transition-colors w-fit">Developers/API</a>
            </div>

            <div className="flex flex-col">
              <h4 className="text-white font-black uppercase text-[15px] mb-4 tracking-wide">Popular</h4>
              <a href="#" className="hover:text-white transition-colors w-fit">BoldAthlete Dunk</a>
              <a href="#" className="hover:text-white transition-colors w-fit">Jordan 1</a>
              <a href="#" className="hover:text-white transition-colors w-fit">Yeezy</a>
              <a href="#" className="hover:text-white transition-colors w-fit">HypeDrop</a>
              <a href="#" className="hover:text-white transition-colors w-fit">Telfar</a>
              <a href="#" className="hover:text-white transition-colors w-fit">PS5</a>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-start md:items-center justify-between text-[11px] md:text-[12px] font-medium text-gray-500 gap-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <div className="flex items-center space-x-1">
                <Image src="https://picsum.photos/100/50?random=1" width={40} height={25} alt="App Store" className="rounded-sm border border-gray-700 opacity-60 hover:opacity-100 transition-opacity cursor-pointer" />
                <Image src="https://picsum.photos/100/50?random=2" width={40} height={25} alt="Google Play" className="rounded-sm border border-gray-700 opacity-60 hover:opacity-100 transition-opacity cursor-pointer" />
              </div>
              <span>© 2026 VerifyMarket. All Rights Reserved.</span>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 uppercase tracking-wider font-bold text-[10px] md:text-[11px]">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Accessibility</a>
              <a href="#" className="hover:text-white transition-colors">Do Not Sell My Info</a>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}

