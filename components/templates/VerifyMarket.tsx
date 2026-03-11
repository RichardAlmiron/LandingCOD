import React from 'react';
import Image from 'next/image';
import { StoreData } from '@/lib/types';
import { Search, ShoppingBag, ShoppingCart, Heart, User, TrendingUp, ShieldCheck, Globe, HelpCircle, ChevronRight, X, Menu, Info, ArrowRight, Activity } from 'lucide-react';

export default function VerifyMarketTemplate({ data }: { data: StoreData }) {
  const featuredProduct = data.products[0];
  const recommendedProducts = data.products.slice(1, 7);
  const trendingProducts = data.products.slice(2, 6);

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
              <Menu className="w-6 h-6 lg:hidden mr-4 cursor-pointer" />
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
              <button className="flex flex-col items-center cursor-pointer hover:text-[#006341] transition-colors group relative">
                <ShieldCheck className="w-[22px] h-[22px] group-hover:fill-[#006341]/10" strokeWidth={1.5} />
              </button>
              <button className="relative flex flex-col items-center cursor-pointer hover:text-[#006341] transition-colors group">
                <ShoppingBag className="w-[22px] h-[22px] group-hover:fill-[#006341]/10" strokeWidth={1.5} />
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
                        <span className="text-[24px] font-black text-[#08a05c]">${Math.floor(Number(featuredProduct.price) * 0.95)}</span>
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
            {recommendedProducts.map(product => {
              const soldCount = Math.floor(Math.random() * 500) + 10;
              return (
                <div key={product.id} data-product-id={product.id} className="group cursor-pointer flex flex-col bg-white border border-gray-200 p-4 rounded-[8px] hover:shadow-[0_4px_15px_rgba(0,0,0,0.08)] hover:border-gray-300 transition-all">
                  <div className="relative aspect-square mb-4 overflow-hidden bg-white p-2 flex items-center justify-center">
                    <Image
                      src={product.imageUrl}
                      alt={product.title}
                      fill
                      className="object-contain group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-0 right-0 w-[40px] h-[40px] flex justify-end">
                      <Heart className="w-5 h-5 text-gray-300 group-hover:text-gray-500 transition-colors stroke-[2px]" />
                    </div>
                  </div>
                  <div className="flex flex-col h-[100px]">
                    <h3 className="text-[14px] font-medium text-black line-clamp-2 leading-tight w-full hover:underline">{product.title}</h3>
                    <div className="mt-auto">
                      <div className="text-[11px] text-gray-500 font-bold uppercase mt-2 mb-0.5">Lowest Ask</div>
                      <div className="font-black text-[20px] text-black leading-none">${product.price}</div>
                      <div className="text-[11px] font-medium mt-1.5 flex items-center justify-between border-t border-gray-100 pt-1.5">
                        <span className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-[2px]">{soldCount} Sold</span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
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
                    <TrendingUp className="w-3 h-3 mr-1" /> Last Sale: ${Math.floor(Number(product.price) * 0.95)}
                  </div>
                </div>
              </div>
            ))}
          </div>
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
