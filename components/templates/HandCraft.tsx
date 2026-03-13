'use client';

import React, { useState } from 'react';
import { StoreData } from '@/lib/types';
import { Search, ShoppingCart, Heart, Gift, Star, ShieldCheck, Users, ArrowRight, Instagram, Twitter, Youtube, Facebook, Bell, Menu, Tag, ChevronDown, Check, X } from 'lucide-react';
import { usePagination, ProductPagination } from './shared/Pagination';

export default function HandCraftTemplate({ data }: { data: StoreData }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const editorsPicks = data.products.slice(0, 5);
  
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

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div className="min-h-full bg-white font-sans text-[#222] overflow-x-hidden">

      {/* ─── HEADER ─── */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
        {/* Main Header Row */}
        <div className="w-full max-w-[1440px] mx-auto px-4 lg:px-6 py-2 md:py-3 flex items-center justify-between gap-3 md:gap-6">

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1 -ml-1 hover:bg-gray-100 rounded-full"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo */}
          <div className="font-serif text-[32px] md:text-[36px] text-[#F1641E] tracking-tighter shrink-0 cursor-pointer -mt-1 leading-none">
            {data.logoText}
          </div>

          {/* Categories Dropdown (Desktop) */}
          <div className="hidden lg:flex items-center gap-1 font-bold text-[14px] hover:bg-gray-100 px-3 py-2.5 rounded-full cursor-pointer transition-colors shrink-0">
            <Menu className="w-[18px] h-[18px]" strokeWidth={2.5} />
            Categories
          </div>

          {/* Search Bar */}
          <div className="flex-1 w-full relative flex items-center group">
            <input
              type="text"
              placeholder="Search for anything"
              className="w-full border-2 border-gray-300 hover:border-gray-400 focus:border-gray-900 rounded-full py-2.5 pl-4 pr-14 text-[15px] outline-none transition-colors shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)] bg-gray-50 focus:bg-white"
            />
            <button className="absolute right-1 w-[40px] h-[40px] flex items-center justify-center bg-[#F1641E] text-white rounded-full hover:bg-[#D85A1A] transition-colors shadow-sm">
              <Search className="w-5 h-5" strokeWidth={2.5} />
            </button>
          </div>

          {/* Right Nav Icons */}
          <div className="flex items-center gap-1 md:gap-2 shrink-0 text-[#222]">
            <span className="hidden lg:block hover:bg-gray-100 px-4 py-2.5 rounded-full cursor-pointer font-bold text-[14px] transition-colors">Sign in</span>
            <button className="p-2 hover:bg-gray-100 rounded-full cursor-pointer hidden md:block transition-colors tooltip-wrapper relative" title="Favorites">
              <Heart className="w-[22px] h-[22px]" strokeWidth={2} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#F1641E] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{wishlist.length}</span>
              )}
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full cursor-pointer hidden sm:block transition-colors tooltip-wrapper" title="Gift Mode">
              <Gift className="w-[22px] h-[22px]" strokeWidth={2} />
              <span className="sr-only">Gift Mode</span>
            </button>
            <button 
              onClick={addToCart}
              className="p-2 hover:bg-gray-100 rounded-full cursor-pointer transition-colors relative" 
              title="Cart"
            >
              <ShoppingCart className="w-[22px] h-[22px]" strokeWidth={2} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-0 bg-[#F1641E] text-white text-[10px] font-bold w-[16px] h-[16px] flex items-center justify-center rounded-full leading-none border border-white">{cartCount}</span>
              )}
            </button>
          </div>
        </div>

        {/* Sub Header Navigation */}
        <nav className="hidden lg:flex w-full max-w-[1440px] mx-auto px-6 pb-2 items-center justify-center space-x-6 text-[14px] font-medium text-[#222]">
          <a href="#" className="hover:underline flex items-center gap-1.5 py-1 text-[#D85A1A]">
            <Gift className="w-4 h-4 fill-[#FDEBD2]" /> Gift Mode
          </a>
          <a href="#" className="hover:underline hover:bg-gray-50 px-3 py-1 rounded-full transition-colors">Mother's Day Gifts</a>
          <a href="#" className="hover:underline hover:bg-gray-50 px-3 py-1 rounded-full transition-colors">Jewelry & Accessories</a>
          <a href="#" className="hover:underline hover:bg-gray-50 px-3 py-1 rounded-full transition-colors">Clothing & Shoes</a>
          <a href="#" className="hover:underline hover:bg-gray-50 px-3 py-1 rounded-full transition-colors">Home & Living</a>
          <a href="#" className="hover:underline hover:bg-gray-50 px-3 py-1 rounded-full transition-colors">Wedding & Party</a>
          <a href="#" className="hover:underline hover:bg-gray-50 px-3 py-1 rounded-full transition-colors">Toys & Entertainment</a>
          <a href="#" className="hover:underline hover:bg-gray-50 px-3 py-1 rounded-full transition-colors">Art & Collectibles</a>
        </nav>
      </header>

      {/* ─── MAIN CONTENT ─── */}
      <main className="w-full max-w-[1440px] mx-auto px-4 lg:px-8 py-6 md:py-8">

        {/* Discover Bar */}
        <div className="flex flex-col items-center mb-10 text-center">
          <h1 className="text-[28px] md:text-[36px] font-serif text-[#222] mb-6 tracking-wide">
            Discover items you can't find anywhere else.
          </h1>

          {/* Circular Categories Row */}
          <div className="flex items-start justify-center gap-4 md:gap-8 overflow-x-auto w-full pb-4 px-2 snap-x hide-scrollbar">
            {[
              { name: 'Gifts for Mom', img: 'https://picsum.photos/200/200?random=170' },
              { name: 'Home Decor', img: 'https://picsum.photos/200/200?random=171' },
              { name: 'Jewelry', img: 'https://picsum.photos/200/200?random=172' },
              { name: 'Clothing', img: 'https://picsum.photos/200/200?random=173' },
              { name: 'Art', img: 'https://picsum.photos/200/200?random=174' },
              { name: 'On Sale', img: 'https://picsum.photos/200/200?random=175' },
            ].map((cat, i) => (
              <div key={i} className="flex flex-col items-center gap-3 cursor-pointer group min-w-[80px] snap-start">
                <div className="w-[85px] h-[85px] md:w-[100px] md:h-[100px] rounded-full overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.08)] group-hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-all bg-gray-100 ring-2 ring-transparent group-hover:ring-gray-300 ring-offset-2">
                  <img src={cat.img} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <span className="font-bold text-[14px] text-[#222] group-hover:underline underline-offset-4 decoration-2">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sponsor/Promo Banner (Soft Orange HandCraft Style) */}
        <div className="bg-[#fdedc9] rounded-[16px] p-6 md:p-10 mb-14 flex flex-col md:flex-row items-center justify-between shadow-sm cursor-pointer group relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-[url('https://picsum.photos/1200/400?random=180')] bg-cover bg-center opacity-30 mix-blend-overlay group-hover:scale-105 transition-transform duration-700 hidden md:block"></div>

          <div className="max-w-xl z-10 text-center md:text-left">
            <h2 className="text-[32px] md:text-[40px] font-serif mb-3 text-[#222] leading-[1.1]">{data.description || 'Find something extraordinary.'}</h2>
            <p className="text-[16px] text-[#222] mb-6 font-medium">Support independent creators from around the world.</p>
            <button className="bg-[#222] border-2 border-transparent text-white px-8 py-3 rounded-full font-bold text-[15px] hover:bg-black hover:scale-[1.02] transition-all shadow-md active:scale-95">
              Shop the collection
            </button>
          </div>
        </div>

        {/* Popular Right Now (Main Grid) */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-[24px] font-bold text-[#222] tracking-tight">Popular right now</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-8">
            {data.products.map((product, idx) => {
              // HandCraft randomly places "Bestseller" or "Rare find" tags
              const tagRng = Math.random();
              let tagText = '';
              let tagColor = '';
              if (tagRng > 0.8) {
                tagText = "Bestseller";
                tagColor = "bg-[#F1641E] text-white";
              } else if (tagRng > 0.6) {
                tagText = "Rare find";
                tagColor = "bg-[#D7E6F5] text-[#222]";
              }
              
              return (
                <div key={`handcraft-${idx}-${product.id}`} data-product-id={product.id} className="group cursor-pointer flex flex-col">
                  <div className="relative aspect-square mb-2 bg-[#f4f4f4] overflow-hidden rounded-[8px]">
                    <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500" />
                    <button className="absolute top-2 right-2 bg-white/90 backdrop-blur w-[32px] h-[32px] flex items-center justify-center rounded-full shadow-[0_1px_4px_rgba(0,0,0,0.1)] hover:bg-gray-50 active:scale-95 transition-transform z-10 opacity-0 group-hover:opacity-100 sm:opacity-100">
                      <Heart className="w-[18px] h-[18px] text-[#222]" strokeWidth={2} />
                    </button>

                    {/* Bestseller Tag Floating */}
                    {tagText && (
                      <div className={`absolute top-2 left-2 ${tagColor} text-[11px] font-bold px-2 py-0.5 rounded-[4px] shadow-sm flex items-center gap-1`}>
                        {tagText === 'Rare find' && <Tag className="w-3 h-3" />}
                        {tagText}
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <h3 className="text-[14px] text-[#222] line-clamp-1 group-hover:underline font-medium mb-0.5">{product.title}</h3>

                  {/* Reviews */}
                  <div className="flex items-center space-x-1 mb-1">
                    <div className="flex text-[#222]">
                      <Star className="w-[14px] h-[14px] fill-current" />
                      <Star className="w-[14px] h-[14px] fill-current" />
                      <Star className="w-[14px] h-[14px] fill-current" />
                      <Star className="w-[14px] h-[14px] fill-current" />
                      <Star className="w-[14px] h-[14px] fill-current opacity-80" />
                    </div>
                    <span className="text-[12px] text-gray-600">({product.reviews})</span>
                  </div>

                  {/* Price Block */}
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-[16px] font-bold text-[#222] leading-none">${product.price}</span>
                    {product.originalPrice && <span className="text-[13px] text-green-700 bg-green-100 px-1 rounded-sm font-medium">{(100 - parseFloat(product.price) / parseFloat(product.originalPrice) * 100).toFixed(0)}% off</span>}
                  </div>
                  {product.originalPrice && <div className="text-[12px] text-gray-500 line-through mb-1">${product.originalPrice}</div>}

                  {/* Shipping Info */}
                  <div className="text-[12px] text-[#222] mt-auto">
                    <span className="bg-green-100 text-green-800 font-bold px-2 py-0.5 rounded-full mr-1 text-[11px]">FREE shipping</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Editor's Picks (HandCraft Masonry/Collage Style) */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-[24px] font-bold text-[#222] tracking-tight flex items-center gap-2">
                Editor's Picks <Gift className="w-5 h-5 fill-[#F1641E] text-[#F1641E]" />
              </h2>
              <p className="text-[15px] text-[#222] mt-1">Discover unique finds curated by our style experts.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Main Featured Item */}
            <div className="md:col-span-8 lg:col-span-6 relative rounded-[12px] overflow-hidden group cursor-pointer shadow-sm aspect-video md:aspect-auto h-[300px] md:h-full">
              <img src="https://picsum.photos/800/600?random=178" alt="Featured Collection" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white text-left">
                <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-[4px] text-[12px] font-bold uppercase tracking-wider mb-3 w-fit">Featured</div>
                <h3 className="text-[28px] font-serif mb-3 leading-tight">The Cozy Home Edit</h3>
                <span className="bg-white text-[#222] px-5 py-2.5 rounded-full text-[14px] font-bold inline-block hover:scale-105 transition-transform shadow-lg shadow-black/20">Shop the collection</span>
              </div>
            </div>

            {/* Smaller picks grid */}
            <div className="md:col-span-4 lg:col-span-6 grid grid-cols-2 gap-4">
              {editorsPicks.slice(0, 4).map((product, i) => (
                <div key={`editor-${i}`} className="flex flex-col group cursor-pointer">
                  <div className="relative aspect-square rounded-[8px] overflow-hidden mb-2 bg-[#f4f4f4] shadow-sm">
                    <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500" />
                    <button className="absolute top-2 right-2 bg-white/90 backdrop-blur p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-50 shadow-sm">
                      <Heart className="w-4 h-4 text-[#222]" />
                    </button>
                  </div>
                  <h3 className="text-[13px] text-[#222] line-clamp-1 group-hover:underline font-medium">{product.title}</h3>
                  <div className="font-bold text-[15px]">${product.price}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Curated Shops / Makers */}
        <div className="mb-16">
          <h2 className="text-[24px] font-bold text-[#222] tracking-tight mb-6">Discover shops you'll love</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'CeramicStudio', type: 'Handmade Pottery', icon: '🌟 Star Seller', img: 'https://picsum.photos/400/300?random=179', avatar: 'https://picsum.photos/100/100?random=180' },
              { name: 'VintageFindsNYC', type: 'Curated Vintage', icon: '✓ Authentic', img: 'https://picsum.photos/400/300?random=181', avatar: 'https://picsum.photos/100/100?random=182' },
              { name: 'LeatherCraft', type: 'Custom Leather Goods', icon: '🌟 Star Seller', img: 'https://picsum.photos/400/300?random=183', avatar: 'https://picsum.photos/100/100?random=184' },
            ].map((shop, i) => (
              <div key={i} className="border border-gray-200 rounded-[12px] p-4 group cursor-pointer hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:border-gray-300 transition-all bg-white relative">

                <div className="flex gap-2 h-32 mb-8 relative">
                  {/* Main shop image */}
                  <div className="w-2/3 h-full rounded-[6px] overflow-hidden bg-gray-100">
                    <img src={shop.img} alt={shop.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  {/* Secondary shop images slice */}
                  <div className="w-1/3 flex flex-col gap-2 h-full">
                    <div className="w-full h-[calc(50%-4px)] rounded-[6px] overflow-hidden bg-gray-100"><img src={`https://picsum.photos/200/200?random=${i * 10 + 1}`} className="w-full h-full object-cover" /></div>
                    <div className="w-full h-[calc(50%-4px)] rounded-[6px] overflow-hidden bg-gray-100"><img src={`https://picsum.photos/200/200?random=${i * 10 + 2}`} className="w-full h-full object-cover" /></div>
                  </div>

                  {/* Avatar floating */}
                  <div className="absolute -bottom-6 left-4 w-14 h-14 rounded-full border-4 border-white overflow-hidden bg-white shadow-sm">
                    <img src={shop.avatar} alt={shop.name} className="w-full h-full object-cover" />
                  </div>
                </div>

                <div className="pl-4">
                  <h3 className="font-bold text-[16px] text-[#222] group-hover:underline truncate">{shop.name}</h3>
                  <div className="flex items-center space-x-2 text-[13px] mt-1 mb-2">
                    <div className="flex text-[#222]"><Star className="w-[14px] h-[14px] fill-current" /><Star className="w-[14px] h-[14px] fill-current" /><Star className="w-[14px] h-[14px] fill-current" /><Star className="w-[14px] h-[14px] fill-current" /><Star className="w-[14px] h-[14px] fill-current" /></div>
                    <span className="bg-[#fdedc9] text-[#222] px-1.5 rounded-[4px] font-bold text-[11px]">{shop.icon}</span>
                  </div>
                  <button className="w-full border border-[#222] rounded-full py-2 text-[14px] font-bold text-[#222] hover:bg-gray-50 transition-colors">
                    Visit shop
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Buy on HandCraft (HandCraft Brand Story) */}
        <div className="bg-[#eef6f6] border-y border-gray-200 p-10 md:p-14 mb-16 text-center lg:relative lg:-left-[calc((100vw-1440px)/2)] w-screen max-w-none">
          <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
            <h2 className="text-[28px] md:text-[36px] font-serif text-[#222] mb-10 tracking-tight">What is HandCraft?</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full mx-auto pb-4">

              <div className="flex flex-col items-center">
                <h3 className="text-[22px] font-serif mb-3 text-[#222]">A community doing good</h3>
                <p className="text-[#222] text-[15px] leading-relaxed max-w-[320px]">HandCraft is a global online marketplace, where people come together to make, sell, buy, and collect unique items. We're also a community pushing for positive change for small businesses, people, and the planet.</p>
              </div>

              <div className="flex flex-col items-center">
                <h3 className="text-[22px] font-serif mb-3 text-[#222]">Support independent creators</h3>
                <p className="text-[#222] text-[15px] leading-relaxed max-w-[320px]">There's no HandCraft warehouse – just millions of people selling the things they love. We make the whole process easy, helping you connect directly with makers to find something extraordinary.</p>
              </div>

              <div className="flex flex-col items-center">
                <h3 className="text-[22px] font-serif mb-3 text-[#222]">Peace of mind</h3>
                <p className="text-[#222] text-[15px] leading-relaxed max-w-[320px]">Your privacy is the highest priority of our dedicated team. And if you ever need assistance, we are always ready to step in for support.</p>
              </div>

            </div>

            <div className="mt-8">
              <span className="font-bold text-[#222] text-[15px]">Have a question? Well, we've got some answers.</span>
              <button className="border-2 border-[#222] rounded-full px-6 py-2.5 font-bold text-[14px] ml-4 hover:scale-[1.03] transition-transform active:scale-95 shadow-sm bg-white">Go to Help Center</button>
            </div>
          </div>
        </div>

      </main>

      {/* ─── FOOTER ─── */}
      <footer className="bg-[#2f466c] text-white pt-10 pb-8 mt-auto">
        <div className="w-full max-w-[1440px] mx-auto px-4 lg:px-6">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 mb-12">
            <div>
              <h4 className="font-bold text-[16px] mb-5 font-serif text-[#FDEBD2]">Shop</h4>
              <ul className="space-y-3.5 text-[14px] text-white/90">
                <li><a href="#" className="hover:underline">Gift cards</a></li>
                <li><a href="#" className="hover:underline">HandCraft Registry</a></li>
                <li><a href="#" className="hover:underline">Sitemap</a></li>
                <li><a href="#" className="hover:underline">HandCraft blog</a></li>
                <li><a href="#" className="hover:underline">HandCraft United Kingdom</a></li>
                <li><a href="#" className="hover:underline">HandCraft Germany</a></li>
                <li><a href="#" className="hover:underline">HandCraft Canada</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-[16px] mb-5 font-serif text-[#FDEBD2]">Sell</h4>
              <ul className="space-y-3.5 text-[14px] text-white/90">
                <li><a href="#" className="hover:underline">Sell on HandCraft</a></li>
                <li><a href="#" className="hover:underline">Teams</a></li>
                <li><a href="#" className="hover:underline">Forums</a></li>
                <li><a href="#" className="hover:underline">Affiliates & Creators</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-[16px] mb-5 font-serif text-[#FDEBD2]">About</h4>
              <ul className="space-y-3.5 text-[14px] text-white/90">
                <li><a href="#" className="hover:underline">HandCraft, Inc.</a></li>
                <li><a href="#" className="hover:underline">Policies</a></li>
                <li><a href="#" className="hover:underline">Investors</a></li>
                <li><a href="#" className="hover:underline">Careers</a></li>
                <li><a href="#" className="hover:underline">Press</a></li>
                <li><a href="#" className="hover:underline">Impact</a></li>
                <li><a href="#" className="hover:underline">Legal imprint</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-[16px] mb-5 font-serif text-[#FDEBD2]">Help</h4>
              <ul className="space-y-3.5 text-[14px] text-white/90 mb-8">
                <li><a href="#" className="hover:underline">Help Center</a></li>
                <li><a href="#" className="hover:underline">Privacy settings</a></li>
              </ul>
              <div className="flex space-x-3">
                <a href="#" className="w-10 h-10 border border-white/30 rounded-full flex items-center justify-center hover:bg-white hover:text-[#2f466c] transition-colors tooltip-wrapper" title="Instagram"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="w-10 h-10 border border-white/30 rounded-full flex items-center justify-center hover:bg-white hover:text-[#2f466c] transition-colors tooltip-wrapper" title="Facebook"><Facebook className="w-5 h-5" /></a>
                <a href="#" className="w-10 h-10 border border-white/30 rounded-full flex items-center justify-center hover:bg-white hover:text-[#2f466c] transition-colors tooltip-wrapper" title="Twitter"><Twitter className="w-5 h-5" /></a>
                <a href="#" className="w-10 h-10 border border-white/30 rounded-full flex items-center justify-center hover:bg-white hover:text-[#2f466c] transition-colors tooltip-wrapper" title="Youtube"><Youtube className="w-5 h-5" /></a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 pt-6 flex flex-col xl:flex-row items-center justify-between text-[13px] text-white/80 gap-4 mt-6">

            {/* Locale Settings */}
            <div className="flex items-center space-x-4 mb-4 xl:mb-0">
              <button className="flex items-center gap-1.5 hover:bg-white/10 px-4 py-2 rounded-full transition-colors border border-transparent hover:border-white/20 font-bold text-white">
                <img src="https://flagcdn.com/w20/us.png" alt="US" className="w-[18px] h-auto rounded-[2px]" />
                United States | English (US) | $ (USD)
              </button>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center xl:justify-end items-center gap-x-4 gap-y-2">
              <span className="font-medium">© 2026 HandCraft, Inc.</span>
              <a href="#" className="hover:underline hover:text-white">Terms of Use</a>
              <a href="#" className="hover:underline hover:text-white">Privacy</a>
              <a href="#" className="hover:underline hover:text-white">Interest-based ads</a>
              <a href="#" className="hover:underline hover:text-white">Local Shops</a>
              <a href="#" className="hover:underline hover:text-white">Regions</a>
            </div>

          </div>
        </div>
      </footer>
    </div>
  );
}
