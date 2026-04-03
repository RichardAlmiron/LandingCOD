'use client';

import React, { useState } from 'react';
import { StoreData, Product } from '@/lib/types';
import { useCart } from '@/contexts/CartContext';
import { Search, ShoppingCart, User, MapPin, Menu, ChevronDown, Phone, ArrowRight, Wrench, Hammer, Smartphone, Facebook, Twitter, Instagram, Youtube, CreditCard, Star, FileText, CheckCircle2, Paintbrush, Heart, X, Clock } from 'lucide-react';
import { usePagination, ProductPagination } from '@/components/componentes-compartidos/templates/Pagination';

export default function BuilderZoneTemplate({ data }: { data: StoreData }) {
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
    <div className="min-h-full bg-white font-sans text-[#333] overflow-x-hidden">

      {/* ─── TOP UTILITY BAR ─── */}
      <div className="bg-[#f4f4f4] text-[12px] py-1 px-4 lg:px-8 flex justify-between items-center font-normal border-b border-gray-200">
        <div className="flex space-x-4 lg:space-x-6 overflow-x-auto hide-scrollbar whitespace-nowrap">
          <a href="#" className="hover:underline text-[#333]">Store Finder</a>
          <a href="#" className="hover:underline text-[#333]">Truck & Tool Rental</a>
          <a href="#" className="hover:underline text-[#333]">For the Pro</a>
          <a href="#" className="hover:underline text-[#333]">Gift Cards</a>
          <a href="#" className="hover:underline text-[#333]">Credit Services</a>
          <a href="#" className="hover:underline text-[#333]">Track Order</a>
          <a href="#" className="hover:underline text-[#333]">Help</a>
        </div>
        <div className="flex items-center space-x-4 font-bold text-[#333] shrink-0 ml-4">
          <a href="#" className="hover:underline hidden sm:block">Track Order</a>
          <a href="#" className="hover:underline hidden sm:block">Find A Store</a>
          <a href="#" className="hover:underline">Help</a>
        </div>
      </div>

      {/* ─── MAIN HEADER ─── */}
      <header className="bg-white border-b border-gray-200">
        <div className="w-full max-w-[1440px] mx-auto px-4 lg:px-6 py-4 flex items-center gap-4 lg:gap-8">

          {/* Logo (Iconic BuilderZone Square) */}
          <div className="bg-[#f96302] p-2.5 shrink-0 flex items-center justify-center cursor-pointer shadow-sm">
            <div className="font-black text-[22px] tracking-tighter text-white uppercase leading-[0.9] text-center font-sans" style={{ fontFamily: 'Arial Black, Impact, sans-serif' }}>
              THE<br />HOME<br />DEPOT
            </div>
          </div>

          {/* Location Selector */}
          <div className="hidden lg:flex flex-col shrink-0 cursor-pointer group pr-4 relative after:content-[''] after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:h-[70%] after:w-[1px] after:bg-gray-300">
            <div className="flex items-center text-[11px] text-gray-500 uppercase font-bold tracking-wider mb-0.5">
              You're shopping
            </div>
            <div className="flex items-center font-bold text-[14px] text-[#333] group-hover:text-[#f96302] transition-colors leading-none mb-1">
              <MapPin className="w-4 h-4 mr-1 mb-0.5 text-[#f96302]" strokeWidth={2.5} />
              Sacramento <ChevronDown className="w-4 h-4 ml-0.5" />
            </div>
            <div className="text-[12px] text-[#1b7e20] font-bold flex items-center">
              OPEN <span className="text-gray-500 font-normal ml-1">until 10 pm</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 w-full relative flex items-center group">
            <input
              type="text"
              placeholder="What can we help you find today?"
              className="w-full border-[2px] border-[#333] rounded-[4px] py-3.5 pl-4 pr-16 text-[15px] outline-none group-hover:border-[#f96302] focus:border-[#f96302] transition-colors shadow-[0_2px_4px_rgba(0,0,0,0.05)_inset]"
            />
            <button className="absolute right-1 top-1 bottom-1 w-[48px] bg-[#f96302] hover:bg-[#e05802] rounded-[2px] flex items-center justify-center transition-colors">
              <Search className="w-5 h-5 text-white" strokeWidth={3} />
            </button>
          </div>

          {/* Right Acc/Cart */}
          <div className="flex items-center gap-6 lg:gap-8 shrink-0">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hover:text-[#f96302] transition-colors"
            >
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
            <div className="flex flex-col items-center cursor-pointer hover:text-[#f96302] font-bold text-[#333] group">
              <User className="w-[28px] h-[28px] mb-1 group-hover:fill-[#fff5f0]" strokeWidth={1.5} />
              <span className="text-[12px] hidden sm:block">My Account</span>
            </div>
            <div 
              onClick={() => toggleFavorite('header')}
              className="hidden md:flex flex-col items-center cursor-pointer hover:text-[#f96302] font-bold text-[#333] group relative"
            >
              <Heart className={`w-[28px] h-[28px] mb-1 ${favorites.length > 0 ? 'fill-red-500 text-red-500' : ''}`} strokeWidth={1.5} />
              {favorites.length > 0 && (
                <span className="absolute -top-1 right-0 bg-red-500 text-white text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full">{favorites.length}</span>
              )}
              <span className="text-[12px] hidden sm:block">Lists</span>
            </div>
            <div 
              onClick={(e) => e.stopPropagation()}
              className="flex flex-col items-center cursor-pointer hover:text-[#f96302] font-bold text-[#333] relative group"
            >
              <div className="relative">
                <ShoppingCart className="w-[28px] h-[28px] mb-1 group-hover:fill-[#fff5f0]" strokeWidth={1.5} />
                {itemCount > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 bg-[#f96302] text-white text-[11px] font-black w-[18px] h-[18px] flex items-center justify-center rounded-full border border-white">{itemCount}</span>
                )}
              </div>
              <span className="text-[12px] hidden sm:block">Cart</span>
            </div>
          </div>
        </div>

        {/* Sub Navigation */}
        <nav className="w-full border-t border-gray-200 hidden md:flex">
          <div className="w-full max-w-[1440px] mx-auto flex items-center text-[14px] font-bold text-[#333]">
            <button className="flex items-center gap-2 px-6 py-3 hover:bg-gray-100 border-r border-gray-200 transition-colors">
              <Menu className="w-5 h-5" strokeWidth={2.5} />
              All Departments
            </button>
            <div className="flex items-center gap-6 px-6 overflow-x-auto hide-scrollbar whitespace-nowrap">
              <a href="#" className="hover:text-[#f96302] hover:underline underline-offset-4 py-3 border-b-4 border-transparent hover:border-[#f96302]">Home Decor, Furniture & Kitchenware</a>
              <a href="#" className="hover:text-[#f96302] hover:underline underline-offset-4 py-3 border-b-4 border-transparent hover:border-[#f96302]">DIY Projects & Ideas</a>
              <a href="#" className="hover:text-[#f96302] hover:underline underline-offset-4 py-3 border-b-4 border-transparent hover:border-[#f96302]">Project Calculators</a>
              <a href="#" className="hover:text-[#f96302] hover:underline underline-offset-4 py-3 border-b-4 border-transparent hover:border-[#f96302]">Installation & Services</a>
              <a href="#" className="hover:text-[#f96302] hover:underline underline-offset-4 py-3 border-b-4 border-transparent hover:border-[#f96302]">Specials & Offers</a>
              <a href="#" className="hover:text-[#f96302] hover:underline underline-offset-4 py-3 border-b-4 border-transparent hover:border-[#f96302]">Local Ad</a>
            </div>
          </div>
        </nav>
      </header>

      {/* ─── MAIN CONTENT ─── */}
      <main className="w-full mx-auto pb-16">

        {/* Main Hero Banner (Full width for HD) */}
        <div className="w-full relative bg-[#333] mb-8 md:mb-16">
          <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row relative">

            <div className="w-full md:w-1/2 p-10 md:p-16 lg:p-24 flex flex-col justify-center z-10 text-white bg-gradient-to-r from-black/80 via-black/60 to-transparent absolute inset-0 md:bg-none md:static md:bg-[#333]">
              <div className="bg-[#f96302] text-white font-black uppercase text-[12px] tracking-widest px-3 py-1 w-fit mb-6">Spring Black Friday</div>
              <h1 className="text-[36px] md:text-[52px] font-black uppercase mb-4 leading-none tracking-tight shadow-black/50 drop-shadow-md md:drop-shadow-none">
                {data.description || 'Spring Savings Start Now'}
              </h1>
              <p className="text-[18px] md:text-[22px] mb-8 font-normal max-w-md shadow-black/50 drop-shadow-md md:drop-shadow-none">
                Get your home and garden ready with our biggest sale of the season.
              </p>
              <button className="bg-white text-[#333] border border-transparent px-8 py-3.5 font-bold uppercase text-[14px] hover:bg-gray-100 transition-colors w-fit shadow-lg shadow-black/20 hover:scale-[1.02] active:scale-95">
                Shop Special Buys <ArrowRight className="w-4 h-4 inline ml-2 mb-0.5" />
              </button>
            </div>

            <div className="w-full md:w-1/2 h-[400px] md:h-[500px] lg:h-[600px] relative">
              <img src={data.bannerImage} alt="Banner" className="w-full h-full object-cover" />
              {/* BuilderZone diagonal cut styling element */}
              <div className="absolute top-0 bottom-0 left-0 w-16 bg-[#333] -skew-x-[15deg] hidden md:block origin-bottom -ml-8"></div>
            </div>

          </div>
        </div>

        <div className="max-w-[1440px] mx-auto px-4 lg:px-6">

          {/* Quick Links Category Bubbles */}
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4 mb-16 text-center">
            {[
              { name: 'Patio Furniture', img: 'https://picsum.photos/250/250?random=300' },
              { name: 'Lawn Mowers', img: 'https://picsum.photos/250/250?random=301' },
              { name: 'Grills', img: 'https://picsum.photos/250/250?random=302' },
              { name: 'Mulch', img: 'https://picsum.photos/250/250?random=303' },
              { name: 'Power Tools', img: 'https://picsum.photos/250/250?random=304' },
              { name: 'Paint', img: 'https://picsum.photos/250/250?random=305' },
              { name: 'Appliances', img: 'https://picsum.photos/250/250?random=306' },
              { name: 'Smart Home', img: 'https://picsum.photos/250/250?random=307' },
            ].map((cat, i) => (
              <div key={i} className="flex flex-col items-center cursor-pointer group">
                <div className="w-[70px] h-[70px] sm:w-[90px] sm:h-[90px] md:w-[120px] md:h-[120px] rounded-full overflow-hidden border-[3px] border-transparent group-hover:border-[#f96302] transition-colors mb-3 relative bg-gray-100">
                  <div className="absolute inset-0 border border-gray-200 rounded-full z-10 pointer-events-none group-hover:border-transparent"></div>
                  <img src={cat.img} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <span className="font-bold text-[13px] text-[#333] group-hover:text-[#f96302] transition-colors leading-tight px-1">{cat.name}</span>
              </div>
            ))}
          </div>

          {/* Savings for Your Project (Products grid) */}
          <div className="mb-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 pb-2">
              <h2 className="text-[28px] font-black tracking-tight text-[#333]">More Saving. More Doing.</h2>
              <a href="#" className="font-bold text-[#f96302] hover:underline flex items-center text-[15px] mt-2 md:mt-0">
                Shop All Deals <ChevronDown className="w-4 h-4 ml-1 -rotate-90" />
              </a>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 border-t border-l border-gray-200">
              {paginatedItems.map((product, idx) => {
                const price = product.price.toString();
                const [dollars, cents] = price.includes('.') ? price.split('.') : [price, '00'];

                return (
                  <div key={product.id || idx} data-product-id={product.id} data-discount={product.discount || 0} className="group cursor-pointer flex flex-col p-4 bg-white border-r border-b border-gray-200 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)] hover:z-10 relative transition-none">

                    {/* Badges */}
                    <div className="absolute top-4 left-4 z-10 flex flex-col gap-1">
                      {product.discount && product.discount > 20 && (
                        <span className="bg-[#1b7e20] text-white text-[11px] font-bold uppercase px-1.5 py-0.5 rounded-sm">Top Rated</span>
                      )}
                      {product.originalPrice && (
                        <span className="bg-[#f96302] text-white text-[11px] font-bold uppercase px-1.5 py-0.5 rounded-sm">Special Buy</span>
                      )}
                    </div>

                    {/* Image */}
                    <div className="relative aspect-square mb-6 flex items-center justify-center pt-6">
                      <img src={product.imageUrl} alt={product.title} className="max-w-[85%] max-h-[85%] object-contain group-hover:scale-105 transition-transform duration-300 mix-blend-multiply" />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col">
                      <div className="flex items-center space-x-1 mb-2">
                        <div className="flex text-[#f96302]">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <Star className="w-3.5 h-3.5 fill-current opacity-50" />
                        </div>
                        <span className="text-[12px] text-gray-600 hover:underline">({product.reviews})</span>
                      </div>

                      <h3 className="text-[14px] font-normal text-[#333] line-clamp-3 mb-4 group-hover:underline leading-snug">{product.title}</h3>

                      <div className="mt-auto">
                        <div className="flex items-start text-[#f96302] font-black mb-1">
                          <span className="text-[14px] leading-tight pt-1">$</span>
                          <span className="text-[32px] leading-none">{dollars}</span>
                          <span className="text-[14px] leading-tight pt-1">{cents}</span>
                        </div>
                        {product.originalPrice && (
                          <div className="text-[12px] text-gray-500 mb-2 font-medium">Was <span className="line-through">${product.originalPrice}</span></div>
                        )}
                        {!product.originalPrice && <div className="h-[24px]"></div>}

                        <div className="text-[13px] font-bold text-[#1b7e20] flex items-center mb-4">
                          <CheckCircle2 className="w-4 h-4 mr-1.5" /> 16 in stock at Sacramento
                        </div>

                        <button 
                          onClick={(e) => handleAddToCart(product, e)}
                          className="w-full bg-white border-2 border-[#f96302] text-[#f96302] py-2 px-3 font-bold rounded-[3px] text-[13px] hover:bg-[#fff5f0] hover:shadow-sm transition-colors mt-auto group-hover:bg-[#f96302] group-hover:text-white"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
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

          {/* Banner Trio Promo */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-[#f4f4f4] p-8 pb-0 rounded-[4px] border border-gray-200 overflow-hidden flex flex-col cursor-pointer group relative">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><CreditCard className="w-20 h-20" /></div>
              <h3 className="text-[22px] font-black tracking-tight mb-2">Consumer Credit Card</h3>
              <p className="text-[15px] mb-6 text-gray-700">6 Months Everyday Financing* on purchases of $299 or more.</p>
              <span className="font-bold text-[#f96302] mb-6 group-hover:underline">Apply Now <ChevronDown className="w-4 h-4 inline ml-1 -rotate-90" /></span>
              <img src="https://picsum.photos/400/200?random=320" className="w-full h-32 object-cover mt-auto group-hover:scale-105 transition-transform origin-bottom" />
            </div>
            <div className="bg-[#f4f4f4] p-8 pb-0 rounded-[4px] border border-gray-200 overflow-hidden flex flex-col cursor-pointer group relative">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><Wrench className="w-20 h-20" /></div>
              <h3 className="text-[22px] font-black tracking-tight mb-2">Tool Rental Center</h3>
              <p className="text-[15px] mb-6 text-gray-700">Rent tools, trucks and more for your next project.</p>
              <span className="font-bold text-[#f96302] mb-6 group-hover:underline">View Rentals <ChevronDown className="w-4 h-4 inline ml-1 -rotate-90" /></span>
              <img src="https://picsum.photos/400/200?random=321" className="w-full h-32 object-cover mt-auto group-hover:scale-105 transition-transform origin-bottom" />
            </div>
            <div className="bg-[#f4f4f4] p-8 pb-0 rounded-[4px] border border-gray-200 overflow-hidden flex flex-col cursor-pointer group relative">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"><Paintbrush className="w-20 h-20" /></div>
              <h3 className="text-[22px] font-black tracking-tight mb-2">Home Services</h3>
              <p className="text-[15px] mb-6 text-gray-700">Let our authorized professionals do the installation.</p>
              <span className="font-bold text-[#f96302] mb-6 group-hover:underline">Explore Services <ChevronDown className="w-4 h-4 inline ml-1 -rotate-90" /></span>
              <img src="https://picsum.photos/400/200?random=322" className="w-full h-32 object-cover mt-auto group-hover:scale-105 transition-transform origin-bottom" />
            </div>
          </div>

          {/* ─── DIY PROJECTS & IDEAS ─── */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[28px] font-black tracking-tight text-[#333]">DIY Projects & Ideas</h2>
              <a href="#" className="font-bold text-[#f96302] hover:underline flex items-center text-[15px]">
                View All <ChevronDown className="w-4 h-4 ml-1 -rotate-90" />
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Build a Raised Garden Bed', time: '4 Hours', difficulty: 'Beginner', img: 'https://picsum.photos/600/400?random=330' },
                { title: 'Install a Ceiling Fan', time: '2 Hours', difficulty: 'Intermediate', img: 'https://picsum.photos/600/400?random=331' },
                { title: 'Tile a Backsplash', time: '6 Hours', difficulty: 'Advanced', img: 'https://picsum.photos/600/400?random=332' },
              ].map((project, i) => (
                <div key={i} className="group cursor-pointer border border-gray-200 rounded-[4px] overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative aspect-[3/2]">
                    <img src={project.img} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 left-3 bg-[#f96302] text-white text-[11px] font-bold px-2 py-1 uppercase">{project.difficulty}</div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-[18px] mb-2 group-hover:text-[#f96302] transition-colors">{project.title}</h3>
                    <div className="flex items-center text-[13px] text-gray-500">
                      <Clock className="w-4 h-4 mr-1.5" /> {project.time} · Step-by-step guide
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ─── SEASONAL DEALS BANNER ─── */}
          <div className="mb-16 relative overflow-hidden rounded-[4px] h-[250px] md:h-[300px] group cursor-pointer bg-[#1b7e20]">
            <img src="https://picsum.photos/1400/400?random=333" alt="Seasonal" className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity" />
            <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-between p-8 md:p-12">
              <div className="text-white max-w-lg text-center md:text-left mb-6 md:mb-0">
                <span className="text-[12px] font-bold uppercase tracking-widest opacity-80">Limited Time</span>
                <h2 className="text-[32px] md:text-[42px] font-black uppercase leading-none mt-2 mb-3">Spring Black Friday</h2>
                <p className="text-[16px] opacity-90">Save big on outdoor furniture, grills, and garden essentials.</p>
              </div>
              <button className="bg-white text-[#333] px-8 py-3.5 font-bold uppercase text-[14px] hover:bg-gray-100 transition-colors shadow-lg">
                Shop Deals <ArrowRight className="w-4 h-4 inline ml-2" />
              </button>
            </div>
          </div>

          {/* ─── RECENTLY VIEWED ─── */}
          <div className="mb-16">
            <h2 className="text-[28px] font-black tracking-tight text-[#333] mb-6">Recently Viewed</h2>
            <div className="flex overflow-x-auto gap-4 pb-4 snap-x hide-scrollbar">
              {data.products.slice(0, 6).map((product, idx) => (
                <div key={`rv-${idx}`} className="shrink-0 w-[200px] snap-start group cursor-pointer border border-gray-200 p-3 rounded-[4px] hover:shadow-md transition-shadow">
                  <div className="relative aspect-square mb-3 flex items-center justify-center">
                    <img src={product.imageUrl} alt={product.title} className="max-w-[85%] max-h-[85%] object-contain mix-blend-multiply group-hover:scale-105 transition-transform" />
                  </div>
                  <h3 className="text-[13px] line-clamp-1 group-hover:underline mb-1">{product.title}</h3>
                  <span className="text-[16px] font-black text-[#f96302]">${product.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pro Xtra - Industrial Look */}
          <div className="mb-16 bg-[#222] text-white flex flex-col md:flex-row relative shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
            <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center relative z-10">
              <div className="absolute top-0 right-0 md:-right-10 bottom-0 w-20 bg-gradient-to-r from-[#222] to-transparent z-10 hidden md:block"></div>

              <div className="flex items-center mb-6">
                <h2 className="text-[40px] md:text-[50px] font-black uppercase tracking-tight text-[#f96302] italic pr-2">PRO</h2>
                <h2 className="text-[40px] md:text-[50px] font-black uppercase tracking-tight">Xtra</h2>
              </div>
              <p className="text-[18px] md:text-[22px] font-normal mb-8 text-white max-w-md">
                Built for Pros. Join our loyalty program to save time, save money, and get rewarded.
              </p>
              <ul className="space-y-4 mb-10 text-[15px]">
                <li className="flex items-center"><CheckCircle2 className="w-5 h-5 mr-3 text-[#f96302]" /> Volume Pricing & Paint Rewards</li>
                <li className="flex items-center"><CheckCircle2 className="w-5 h-5 mr-3 text-[#f96302]" /> Purchase Tracking & Receipt Management</li>
                <li className="flex items-center"><CheckCircle2 className="w-5 h-5 mr-3 text-[#f96302]" /> Exclusive Offers & Perks</li>
              </ul>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button className="bg-[#f96302] text-white px-8 py-3.5 font-bold uppercase text-[15px] hover:bg-[#d85502] transition-colors text-center rounded-[2px] shadow-md shadow-[#f96302]/20 hover:scale-[1.02] active:scale-95">
                  Join Now for Free
                </button>
                <button className="bg-transparent border-2 border-white text-white px-8 py-3.5 font-bold uppercase text-[15px] hover:bg-white hover:text-[#222] transition-colors text-center rounded-[2px]">
                  Sign In
                </button>
              </div>
            </div>
            <div className="w-full md:w-1/2 relative min-h-[300px] md:min-h-full bg-[#111]">
              <div className="absolute inset-0 bg-gradient-to-t from-[#222] to-transparent opacity-80 md:hidden z-10"></div>
              <img src="https://picsum.photos/800/600?random=312" alt="Pro Services" className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity opacity-60 hover:opacity-100 hover:mix-blend-normal transition-all duration-700" />
            </div>
          </div>

        </div>
      </main>

      {/* ─── FOOTER ─── */}
      <footer className="bg-[#111] text-gray-300 pt-16 pb-8 border-t-[8px] border-[#f96302]">
        <div className="w-full max-w-[1440px] mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-10 mb-16">

            <div className="flex flex-col space-y-3">
              <h4 className="font-bold uppercase text-[15px] mb-3 text-white">Customer Service</h4>
              <a href="#" className="text-[14px] hover:text-[#f96302] hover:underline transition-colors">Check Order Status</a>
              <a href="#" className="text-[14px] hover:text-[#f96302] hover:underline transition-colors">Pay Your Credit Card</a>
              <a href="#" className="text-[14px] hover:text-[#f96302] hover:underline transition-colors">Order Cancellation</a>
              <a href="#" className="text-[14px] hover:text-[#f96302] hover:underline transition-colors">Returns</a>
              <a href="#" className="text-[14px] hover:text-[#f96302] hover:underline transition-colors">Shipping & Delivery</a>
              <a href="#" className="text-[14px] hover:text-[#f96302] hover:underline transition-colors">Help & FAQs</a>
            </div>

            <div className="flex flex-col space-y-3">
              <h4 className="font-bold uppercase text-[15px] mb-3 text-white">Resources</h4>
              <a href="#" className="text-[14px] hover:text-[#f96302] hover:underline transition-colors">Specials & Offers</a>
              <a href="#" className="text-[14px] hover:text-[#f96302] hover:underline transition-colors">DIY Projects & Ideas</a>
              <a href="#" className="text-[14px] hover:text-[#f96302] hover:underline transition-colors">Truck & Tool Rental</a>
              <a href="#" className="text-[14px] hover:text-[#f96302] hover:underline transition-colors">Home Services</a>
              <a href="#" className="text-[14px] hover:text-[#f96302] hover:underline transition-colors">Protection Plans</a>
              <a href="#" className="text-[14px] hover:text-[#f96302] hover:underline transition-colors">Subscription Services</a>
            </div>

            <div className="flex flex-col space-y-3">
              <h4 className="font-bold uppercase text-[15px] mb-3 text-white">About Us</h4>
              <a href="#" className="text-[14px] hover:text-[#f96302] hover:underline transition-colors">Careers</a>
              <a href="#" className="text-[14px] hover:text-[#f96302] hover:underline transition-colors">Corporate Information</a>
              <a href="#" className="text-[14px] hover:text-[#f96302] hover:underline transition-colors">Digital Newsroom</a>
              <a href="#" className="text-[14px] hover:text-[#f96302] hover:underline transition-colors">BuilderZone Foundation</a>
              <a href="#" className="text-[14px] hover:text-[#f96302] hover:underline transition-colors">Investor Relations</a>
            </div>

            <div className="flex flex-col space-y-6">
              <div className="bg-[#222] p-6 rounded-[4px] border border-[#333]">
                <h4 className="font-bold uppercase text-[14px] mb-4 text-white flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-[#f96302]" /> Credit Accounts
                </h4>
                <div className="space-y-2 mb-4">
                  <p className="text-[13px] text-gray-400">1. Receive 6 Months Everyday Financing</p>
                  <p className="text-[13px] text-gray-400">2. Easily manage your account online.</p>
                </div>
                <button className="bg-transparent border-2 border-white text-white px-4 py-2 font-bold uppercase text-[12px] hover:bg-white hover:text-[#222] transition-colors w-full rounded-[2px]">
                  Apply Now
                </button>
              </div>

              <div>
                <h4 className="font-bold uppercase text-[14px] mb-3 text-white">Get Email Offers</h4>
                <div className="flex">
                  <input type="email" placeholder="Enter Email Address" className="bg-white text-black px-4 py-2 outline-none w-full text-[14px] rounded-l-[4px] focus:ring-2 focus:ring-[#f96302] focus:ring-inset" />
                  <button className="bg-[#f96302] text-white px-5 py-2 font-bold uppercase text-[14px] hover:bg-[#d85502] transition-colors rounded-r-[4px]">
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-[#333] flex flex-col md:flex-row items-center justify-between text-[11px] text-gray-500 gap-y-6">

            <div className="flex space-x-6">
              <a href="#" className="w-10 h-10 border border-gray-600 rounded-full flex items-center justify-center hover:bg-[#f96302] hover:border-[#f96302] hover:text-white transition-all"><Facebook className="w-[18px] h-[18px] fill-current" /></a>
              <a href="#" className="w-10 h-10 border border-gray-600 rounded-full flex items-center justify-center hover:bg-[#f96302] hover:border-[#f96302] hover:text-white transition-all"><Twitter className="w-[18px] h-[18px] fill-current" /></a>
              <a href="#" className="w-10 h-10 border border-gray-600 rounded-full flex items-center justify-center hover:bg-[#f96302] hover:border-[#f96302] hover:text-white transition-all"><Instagram className="w-[18px] h-[18px]" /></a>
              <a href="#" className="w-10 h-10 border border-gray-600 rounded-full flex items-center justify-center hover:bg-[#f96302] hover:border-[#f96302] hover:text-white transition-all"><Youtube className="w-[18px] h-[18px]" /></a>
            </div>

            <div className="flex flex-wrap justify-center md:justify-end gap-x-4 gap-y-2 max-w-2xl text-center md:text-right">
              <span>© 2026 BuilderZone Product Authority, LLC. All Rights Reserved. Use of this site is subject to certain Terms Of Use.</span>
              <a href="#" className="hover:text-white transition-colors">Local Store Directory</a>
              <a href="#" className="hover:text-white transition-colors">Privacy Statement</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Usage</a>
              <a href="#" className="hover:text-white transition-colors">My Preference Center</a>
              <a href="#" className="hover:text-white transition-colors">California Privacy Rights</a>
              <a href="#" className="hover:text-white transition-colors flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-blue-500" /> Do Not Sell My Information</a>
            </div>

          </div>
        </div>
      </footer>
    </div>
  );
}

