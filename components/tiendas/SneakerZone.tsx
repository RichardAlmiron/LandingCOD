'use client';

import React, { useState } from 'react';
import { StoreData, Product } from '@/lib/types';
import { useCart } from '@/contexts/CartContext';
import { Search, ShoppingBag, Heart, User, Menu, Zap, Trophy, Flame, Calendar, Star, Smartphone, ArrowRight, Facebook, Twitter, Instagram, Youtube, Clock, ShieldCheck, MapPin, ChevronDown, X } from 'lucide-react';
import { usePagination, ProductPagination } from '@/components/componentes-compartidos/templates/Pagination';

export default function SneakerZoneTemplate({ data }: { data: StoreData }) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
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
    <div className="min-h-full bg-white font-sans text-stone-950 selection:bg-stone-950 selection:text-white">
      {/* FLX Premium Announcement */}
      <div className="bg-stone-950 text-white py-2 px-6 flex justify-center items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] relative z-[110]">
        <Zap className="w-3.5 h-3.5 fill-red-600 text-red-600 animate-pulse" />
        <span>FLX MEMBERS: FREE SHIPPING + EXCLUSIVE EARLY DROPS. <a href="#" className="underline ml-2 hover:text-red-500 transition-colors">JOIN FLX</a></span>
        <Zap className="w-3.5 h-3.5 fill-red-600 text-red-600 animate-pulse" />
      </div>

      <header className="bg-white sticky top-0 z-[100] border-b border-stone-100">
        <div className="max-w-[1440px] mx-auto px-6">
          {/* Main Header */}
          <div className="h-20 flex items-center justify-between gap-12">
            {/* Brand Identity */}
            <div className="flex items-center gap-12 shrink-0">
              <div className="flex items-center cursor-pointer group">
                <div className="flex flex-col items-center">
                  <span className="font-black text-4xl tracking-tighter uppercase leading-[0.8]">
                    FOOT<span className="text-red-600">LOCKER</span>
                  </span>
                  <div className="w-full h-1.5 bg-stone-950 mt-1 origin-left group-hover:bg-red-600 transition-colors" />
                </div>
              </div>

              <nav className="hidden lg:flex items-center gap-8 font-black text-[11px] uppercase tracking-wider">
                {['Men', 'Women', 'Kids', 'Releases', 'Brands', 'Sale'].map(item => (
                  <a
                    key={item}
                    href="#"
                    className={`hover:text-red-600 transition-colors relative pb-1 group ${item === 'Sale' ? 'text-red-600' : 'text-stone-900'}`}
                  >
                    {item}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-300" />
                  </a>
                ))}
              </nav>
            </div>

            <div className="flex-1 max-w-xl hidden md:block">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 group-focus-within:text-stone-950 transition-colors" />
                <input
                  type="text"
                  placeholder="Search footwear, apparel, and releases..."
                  className="w-full bg-stone-100 py-3 pl-12 pr-4 rounded-full text-[13px] font-bold outline-none border-2 border-transparent focus:bg-white focus:border-stone-950 transition-all font-sans"
                />
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="hidden xl:flex items-center gap-2 group cursor-pointer text-stone-400 hover:text-stone-950 transition-colors border-r border-stone-200 pr-6 mr-2">
                <MapPin className="w-4 h-4" />
                <span className="text-[11px] font-black uppercase tracking-widest">Find a Store</span>
              </div>
              <div className="flex items-center gap-5">
                <button 
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden p-2 hover:bg-stone-100 rounded-full transition-colors"
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
                <User className="w-5 h-5 cursor-pointer hover:text-red-600 transition-colors" />
                <div 
                  onClick={() => toggleFavorite('header')}
                  className="relative group cursor-pointer"
                >
                  <Heart className={`w-5 h-5 group-hover:text-red-600 transition-colors ${favorites.length > 0 ? 'fill-red-500 text-red-500' : ''}`} />
                  {favorites.length > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full">{favorites.length}</span>
                  )}
                </div>
                <div 
                  onClick={() => setIsCartOpen(true)}
                  className="relative group cursor-pointer"
                >
                  <ShoppingBag className="w-5 h-5 group-hover:text-red-600 transition-colors" />
                  {itemCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full animate-bounce">{itemCount}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Rest of the code remains the same */}
      <main className="max-w-[1440px] mx-auto px-6 py-8">
        {/* Cinematic Hero */}
        <section className="relative h-[700px] mb-20 overflow-hidden rounded-3xl group">
          <img
            src={data.bannerImage || "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80"}
            alt="Main Drop"
            className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-[3000ms]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />

          <div className="absolute bottom-16 left-16 text-white max-w-3xl">
            <div className="flex items-center gap-4 mb-8">
              <span className="bg-red-600 text-white px-5 py-1.5 font-black text-xs uppercase italic tracking-widest skew-x-[-12deg] shadow-2xl">
                LATEST HEAT
              </span>
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-stone-300">
                <Clock className="w-4 h-4" /> RECENTLY DROPPED
              </div>
            </div>

            <h1 className="text-8xl font-black uppercase italic tracking-tighter mb-4 leading-[0.85] drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
              {data.name}
            </h1>
            <p className="text-xl font-bold uppercase italic mb-10 text-stone-300 max-w-xl leading-snug tracking-tight">
              {data.description}
            </p>

            <div className="flex gap-4">
              <button className="bg-white text-stone-950 px-12 py-5 rounded-sm font-black uppercase italic text-lg hover:bg-red-600 hover:text-white transition-all transform hover:-translate-y-1 shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
                Shop Collection
              </button>
              <button className="bg-transparent border-2 border-white text-white px-12 py-5 rounded-sm font-black uppercase italic text-lg hover:bg-white hover:text-stone-950 transition-all">
                Learn More
              </button>
            </div>
          </div>
        </section>

        {/* Hottest Drops Grid */}
        <section className="mb-24">
          <div className="flex items-end justify-between mb-12 border-b-8 border-stone-950 pb-6">
            <div className="space-y-2">
              <h2 className="text-5xl font-black uppercase italic tracking-tighter flex items-center gap-4 leading-none">
                <Flame className="w-10 h-10 text-red-600 fill-red-600 animate-pulse" /> HOT DROPS
              </h2>
              <p className="text-stone-400 font-bold uppercase text-xs tracking-[0.3em]">Trending Styles & Limited Releases</p>
            </div>
            <a href="#" className="flex items-center gap-3 text-sm font-black uppercase italic tracking-widest text-red-600 hover:gap-5 transition-all group">
              View All <ArrowRight className="w-5 h-5" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {paginatedItems.map((product: any, idx: number) => (
              <div key={product.id || idx} data-product-id={product.id} className="group cursor-pointer flex flex-col bg-stone-50 rounded-2xl overflow-hidden border border-stone-100 hover:border-red-600/20 hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] transition-all duration-500">
                <div className="relative aspect-square overflow-hidden bg-white group-hover:bg-stone-50 transition-colors p-8">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-full object-contain transform scale-100 group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Premium Badging */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <span className="bg-stone-950 text-white text-[10px] font-black uppercase italic px-3 py-1 skew-x-[-12deg] shadow-lg">Limited</span>
                    {product.originalPrice && (
                      <span className="bg-red-600 text-white text-[10px] font-black uppercase italic px-3 py-1 skew-x-[-12deg] shadow-lg">Sale</span>
                    )}
                  </div>

                  <button 
                    onClick={(e) => handleAddToCart(product, e)}
                    className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 bg-stone-950 text-white py-4 rounded-xl font-black uppercase italic text-xs tracking-widest transition-all duration-300 shadow-2xl hover:bg-red-600"
                  >
                    Quick Add to Bag
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }}
                    className="absolute top-4 right-4 p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Heart className={`w-4 h-4 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="text-[10px] font-black uppercase italic text-stone-400 tracking-tighter">{product.category}</div>
                    <div className="flex text-stone-200">
                      {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                    </div>
                  </div>
                  <h3 className="font-black uppercase italic text-stone-950 text-sm leading-tight line-clamp-2 min-h-[2.8rem] group-hover:text-red-600 transition-colors">
                    {product.title}
                  </h3>
                  <div className="flex items-center gap-3 pt-2">
                    <span className="text-2xl font-black italic tracking-tighter text-stone-950">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-stone-300 line-through font-bold italic">${product.originalPrice}</span>
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

        {/* FLX Rewards - Enterprise Grade Branding */}
        <section className="mb-24">
          <div className="bg-red-600 rounded-3xl overflow-hidden relative shadow-[0_40px_80px_rgba(220,38,38,0.25)]">
            {/* Background Textures */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-5">
              <span className="text-[20rem] font-black uppercase italic absolute -right-40 -top-20 tracking-tighter leading-none">FLX</span>
              <span className="text-[15rem] font-black uppercase italic absolute -left-20 -bottom-20 tracking-tighter leading-none text-white">REWARDS</span>
            </div>

            <div className="relative z-10 p-12 lg:p-24 flex flex-col lg:flex-row items-center justify-between gap-16">
              <div className="flex-1 space-y-10 group">
                <div className="inline-flex items-center gap-4 bg-stone-950 text-white px-6 py-2 rounded-full text-xs font-black uppercase italic tracking-widest shadow-xl">
                  <Star className="w-4 h-4 fill-red-600 text-red-600" /> Member Exclusive
                </div>

                <h2 className="text-7xl font-black uppercase italic tracking-tighter text-white leading-[0.85]">
                  THE HIGHEST LEVEL <br />OF ACCESS.
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl">
                  {[
                    { title: 'Free Standard Shipping', desc: 'No minimums, all the time.' },
                    { title: 'Early Release Access', desc: 'Get head starts on the heat.' },
                    { title: 'Birthday Awards', desc: 'A little extra on your day.' },
                    { title: 'Exclusive Drops', desc: 'Styles only members can shop.' },
                  ].map((benefit, i) => (
                    <div key={i} className="flex gap-4 p-6 bg-white/10 rounded-2xl backdrop-blur-md border border-white/10 hover:bg-white/20 transition-all cursor-default">
                      <Zap className="w-6 h-6 text-white fill-white shrink-0" />
                      <div>
                        <h4 className="font-black uppercase italic text-white text-sm tracking-wide">{benefit.title}</h4>
                        <p className="text-red-100 text-[11px] font-bold mt-1 opacity-80">{benefit.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4 pt-4">
                  <button className="bg-white text-red-600 px-12 py-5 rounded-xl font-black uppercase italic text-lg hover:bg-stone-950 hover:text-white transition-all transform hover:-translate-y-1 shadow-2xl">
                    Join for Free Today
                  </button>
                  <button className="bg-transparent border-2 border-white/40 text-white px-12 py-5 rounded-xl font-black uppercase italic text-lg hover:border-white transition-all whitespace-nowrap">
                    Already a Member? Sign In
                  </button>
                </div>
              </div>

              <div className="relative group perspective-[1000px]">
                <div className="w-[380px] h-[240px] bg-stone-950 rounded-3xl border-[6px] border-white/20 shadow-[0_50px_100px_rgba(0,0,0,0.4)] p-8 flex flex-col justify-between transform rotate-[-6deg] group-hover:rotate-0 transition-transform duration-700">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-white font-black text-4xl uppercase italic tracking-tighter leading-none">FLX</h3>
                      <p className="text-red-600 font-black text-[10px] uppercase tracking-widest mt-1">X3 REWARDS POINTS</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center shadow-lg">
                      <Zap className="w-6 h-6 text-white fill-white" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="h-1 bg-stone-800 rounded-full overflow-hidden">
                      <div className="w-[85%] h-full bg-red-600 rounded-full animate-pulse" />
                    </div>
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-stone-500 text-[9px] font-bold uppercase tracking-widest mb-1">Status Level</p>
                        <p className="text-white font-black uppercase italic text-sm tracking-widest">X3 PREMIER</p>
                      </div>
                      <p className="text-red-600 font-black text-xs uppercase italic tracking-widest">850 / 1000 Pts</p>
                    </div>
                  </div>
                </div>

                {/* Floating Badges */}
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl transform rotate-12 animate-bounce">
                  <Flame className="w-10 h-10 text-red-600 fill-red-600" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Exclusive Sections Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <div className="relative h-[600px] rounded-3xl overflow-hidden group cursor-pointer shadow-xl">
            <img src="https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&q=80" alt="New Balance" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[2000ms]" />
            <div className="absolute inset-0 bg-stone-950/40 group-hover:bg-stone-950/20 transition-all" />
            <div className="absolute bottom-12 left-12 text-white">
              <h2 className="text-5xl font-black uppercase italic tracking-tighter mb-4 leading-none">THE CRAFTED <br />COLLECTION</h2>
              <p className="font-bold uppercase italic text-stone-200 mb-8 max-w-sm">Premium silhouettes reimagined for the modern archive.</p>
              <button className="bg-white text-stone-950 px-10 py-4 rounded-sm font-black uppercase italic text-sm hover:bg-stone-950 hover:text-white transition-all">Shop Heritage</button>
            </div>
          </div>
          <div className="relative h-[600px] rounded-3xl overflow-hidden group cursor-pointer shadow-xl">
            <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80" alt="Performance" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[2000ms]" />
            <div className="absolute inset-0 bg-stone-950/40 group-hover:bg-stone-950/20 transition-all" />
            <div className="absolute bottom-12 left-12 text-white">
              <h2 className="text-5xl font-black uppercase italic tracking-tighter mb-4 leading-none">ENGINEERED <br />FOR SPEED</h2>
              <p className="font-bold uppercase italic text-stone-200 mb-8 max-w-sm">Break records with professional-grade performance gear.</p>
              <button className="bg-red-600 text-white px-10 py-4 rounded-sm font-black uppercase italic text-sm hover:bg-stone-950 transition-all">Shop Performance</button>
            </div>
          </div>
        </section>

        {/* Release Calendar Section */}
        <section className="bg-stone-50 rounded-3xl p-12 lg:p-20 mb-24 border border-stone-200 shadow-sm overflow-hidden relative">
          <div className="absolute top-0 right-0 p-12 pointer-events-none opacity-[0.03]">
            <Calendar className="w-[400px] h-[400px] text-stone-950" />
          </div>

          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-1/3 text-center lg:text-left space-y-6">
              <div className="inline-flex items-center gap-2 bg-stone-950 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase italic tracking-widest shadow-lg mb-4">
                <ShieldCheck className="w-3.5 h-3.5" /> Official Launch Dates
              </div>
              <h2 className="text-6xl font-black uppercase italic tracking-tighter leading-none text-stone-950">
                DROP <br />WATCH
              </h2>
              <p className="text-stone-500 font-bold uppercase italic text-sm leading-relaxed max-w-xs mx-auto lg:mx-0">
                Sync your calendar. We track every major drop so you never miss another W.
              </p>
              <button className="bg-red-600 text-white w-full lg:w-auto px-12 py-5 rounded-xl font-black uppercase italic text-lg hover:bg-stone-950 transition-all shadow-xl">
                View All Releases
              </button>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full relative z-10">
              {[
                { name: 'Jordan 1 Retro High', date: 'Oct 24', time: '10:00 AM', status: 'Raffle Open', img: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80' },
                { name: 'Yeezy Slide "Dark"', date: 'Oct 27', time: '08:00 AM', status: 'In 4 Days', img: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&q=80' },
                { name: 'Dunk Low "Panda"', date: 'Oct 29', time: '10:30 AM', status: 'Live Soon', img: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80' },
                { name: 'NB 1906R "Protection"', date: 'Nov 02', time: '12:00 PM', status: 'Upcoming', img: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80' },
              ].map((drop, i) => (
                <div key={i} className="flex bg-white rounded-2xl p-4 gap-6 border border-stone-100 hover:border-red-600/30 hover:shadow-2xl transition-all cursor-pointer group group/drop">
                  <div className="w-24 h-24 bg-stone-50 rounded-xl overflow-hidden p-2 flex-shrink-0 group-hover/drop:bg-white transition-colors">
                    <img src={drop.img} alt={drop.name} className="w-full h-full object-contain transform group-hover/drop:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="flex flex-col justify-center flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-red-600 font-black uppercase italic text-[10px] tracking-widest">{drop.date} • {drop.time}</span>
                      <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${drop.status === 'Raffle Open' ? 'bg-emerald-100 text-emerald-600' : 'bg-stone-100 text-stone-500'}`}>
                        {drop.status}
                      </span>
                    </div>
                    <h3 className="font-black uppercase italic text-stone-900 text-sm leading-tight group-hover/drop:text-red-600 transition-colors">{drop.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Brand Spotlight */}
        <section className="mb-24">
          <div className="flex items-end justify-between mb-12 border-b-8 border-stone-950 pb-6">
            <h2 className="text-5xl font-black uppercase italic tracking-tighter leading-none">SHOP BY BRAND</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {['Nike', 'Jordan', 'Adidas', 'New Balance', 'Puma', 'Reebok'].map((brand, i) => (
              <div key={i} className="bg-stone-50 border border-stone-100 rounded-2xl p-8 flex items-center justify-center hover:border-red-600 hover:shadow-lg transition-all cursor-pointer group h-28">
                <span className="font-black uppercase italic text-stone-400 group-hover:text-red-600 transition-colors tracking-tighter text-lg">{brand}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Customer Reviews */}
        <section className="mb-24 bg-stone-50 rounded-3xl p-12 lg:p-20 border border-stone-100">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black uppercase italic tracking-tighter mb-4">WHAT SNEAKERHEADS SAY</h2>
            <div className="flex items-center justify-center gap-2">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-red-600 fill-red-600" />)}
              <span className="text-stone-400 font-black text-sm ml-2">4.9 / 5 from 15,000+ reviews</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Chris D.', text: 'Got my Jordans on release day. Packaging was pristine. Best sneaker store online.', rating: 5 },
              { name: 'Maya P.', text: 'FLX membership is a game changer. Early access to every drop plus free shipping.', rating: 5 },
              { name: 'Tyler J.', text: 'The raffle system is fair and transparent. Won my first pair last month.', rating: 5 },
            ].map((review, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-stone-100">
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, j) => <Star key={j} className="w-4 h-4 text-red-600 fill-red-600" />)}
                </div>
                <p className="text-stone-600 font-bold italic mb-6 leading-relaxed">"{review.text}"</p>
                <p className="font-black uppercase text-sm tracking-widest text-stone-900">{review.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sneaker Care */}
        <section className="mb-24">
          <div className="bg-stone-950 rounded-3xl p-12 lg:p-20 text-white relative overflow-hidden">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="lg:w-1/2 space-y-8">
                <div className="inline-flex items-center gap-2 bg-red-600 text-white px-5 py-2 rounded-full text-[10px] font-black uppercase italic tracking-widest">
                  <ShieldCheck className="w-4 h-4" /> SNEAKER CARE
                </div>
                <h2 className="text-6xl font-black uppercase italic tracking-tighter leading-[0.85]">
                  KEEP YOUR <br /><span className="text-red-600">KICKS FRESH.</span>
                </h2>
                <p className="text-stone-400 font-bold italic text-lg max-w-md">
                  Premium cleaning kits, protectors, and storage solutions to keep your collection looking brand new.
                </p>
                <button className="bg-white text-stone-950 px-12 py-5 rounded-xl font-black uppercase italic text-lg hover:bg-red-600 hover:text-white transition-all shadow-xl">
                  Shop Care Products
                </button>
              </div>
              <div className="lg:w-1/2 grid grid-cols-2 gap-6">
                {[
                  { name: 'Cleaning Kits', price: '$24.99' },
                  { name: 'Crease Guards', price: '$14.99' },
                  { name: 'Shoe Trees', price: '$19.99' },
                  { name: 'Protector Spray', price: '$16.99' },
                ].map((item, i) => (
                  <div key={i} className="bg-stone-900 border border-stone-800 p-8 rounded-2xl hover:border-red-600/50 transition-all cursor-pointer group">
                    <h4 className="text-white font-black uppercase italic tracking-tight mb-2">{item.name}</h4>
                    <p className="text-red-600 font-black text-lg italic">{item.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Size Guide */}
        <section className="mb-24">
          <div className="bg-red-600 rounded-3xl p-12 lg:p-20 text-white text-center relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-5xl font-black uppercase italic tracking-tighter mb-4">FIND YOUR PERFECT FIT</h2>
              <p className="text-red-100 font-bold italic text-lg mb-10 max-w-lg mx-auto">
                Use our interactive size guide to find the right fit across all brands. Never return a wrong size again.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mb-10">
                {['US 7-8', 'US 8.5-9.5', 'US 10-11', 'US 11.5-13'].map((size, i) => (
                  <div key={i} className="bg-white/20 backdrop-blur border border-white/30 rounded-xl p-6 hover:bg-white/30 transition-all cursor-pointer">
                    <span className="font-black uppercase italic text-lg">{size}</span>
                  </div>
                ))}
              </div>
              <button className="bg-white text-red-600 px-12 py-5 rounded-xl font-black uppercase italic text-lg hover:bg-stone-950 hover:text-white transition-all shadow-xl">
                Open Size Guide
              </button>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="mb-24">
          <div className="bg-stone-50 rounded-3xl p-12 lg:p-20 border border-stone-100 text-center">
            <Flame className="w-12 h-12 text-red-600 fill-red-600 mx-auto mb-6 animate-pulse" />
            <h2 className="text-5xl font-black uppercase italic tracking-tighter mb-4 text-stone-950">STAY IN THE LOOP</h2>
            <p className="text-stone-500 font-bold italic text-lg mb-10 max-w-lg mx-auto">
              Get notified about upcoming drops, restock alerts, and exclusive FLX member deals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input type="email" placeholder="YOUR EMAIL" className="flex-1 bg-white border-2 border-stone-200 text-stone-950 px-6 py-4 rounded-xl font-black text-sm uppercase tracking-widest outline-none focus:border-red-600 transition-colors" />
              <button className="bg-stone-950 text-white px-10 py-4 rounded-xl font-black uppercase italic text-sm hover:bg-red-600 transition-all shadow-xl">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-stone-950 text-white pt-32 pb-16 mt-32 border-t-[12px] border-red-600">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-32">
            <div className="space-y-10">
              <div className="font-black text-4xl tracking-tighter uppercase leading-none border-b-8 border-red-600 inline-block">
                FOOT<span className="text-red-600">LOCKER</span>
              </div>
              <p className="text-stone-500 font-bold uppercase italic text-[11px] leading-relaxed max-w-xs tracking-wider">
                Our purpose is to inspire and empower youth culture. We are the leading global sneaker and apparel retailer.
              </p>
              <div className="flex gap-4">
                {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
                  <a key={i} href="#" className="w-12 h-12 bg-stone-900 rounded-full flex items-center justify-center hover:bg-red-600 transition-all shadow-xl group">
                    <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-10">
              <h4 className="text-red-600 font-black uppercase italic text-lg tracking-widest">Customer Help</h4>
              <nav className="flex flex-col gap-6 text-[11px] font-black uppercase italic tracking-[0.2em] text-stone-400">
                {['Contact Us', 'Order Status', 'Shipping Info', 'Returns & Exchanges', 'FLX Rewards FAQ', 'Student Discount'].map(l => (
                  <a key={l} href="#" className="hover:text-white transition-colors flex items-center gap-2 group">
                    <ArrowRight className="w-3 h-3 translate-x-[-10px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all text-red-600" />
                    {l}
                  </a>
                ))}
              </nav>
            </div>

            <div className="space-y-10">
              <h4 className="text-red-600 font-black uppercase italic text-lg tracking-widest">Account</h4>
              <nav className="flex flex-col gap-6 text-[11px] font-black uppercase italic tracking-[0.2em] text-stone-400">
                {['Sign In / Register', 'FLX Rewards Dashboard', 'Personal Info', 'Payment Methods', 'Release Reminders'].map(l => (
                  <a key={l} href="#" className="hover:text-white transition-colors flex items-center gap-2 group">
                    <ArrowRight className="w-3 h-3 translate-x-[-10px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all text-red-600" />
                    {l}
                  </a>
                ))}
              </nav>
            </div>

            <div className="space-y-10">
              <h4 className="text-red-600 font-black uppercase italic text-lg tracking-widest">Join the Heat</h4>
              <p className="text-stone-500 font-bold uppercase italic text-[11px] leading-relaxed tracking-wider">
                Get internal access to drops, rewards, and the culture of sneaker collecting.
              </p>
              <div className="space-y-4">
                <div className="relative group">
                  <input
                    type="email"
                    placeholder="EMAIL ADDRESS"
                    className="w-full bg-stone-900 border-b-2 border-stone-800 py-4 px-2 text-[11px] font-black italic outline-none focus:border-red-600 transition-colors uppercase tracking-widest"
                  />
                  <button className="absolute right-0 bottom-3 text-red-600 hover:text-white transition-colors">
                    <ArrowRight className="w-6 h-6" />
                  </button>
                </div>
                <p className="text-[9px] text-stone-700 font-bold leading-tight">By signing up you agree to our Terms and Privacy Policy.</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-center pt-16 border-t border-stone-900 gap-10">
            <div className="text-[10px] font-black uppercase italic tracking-[0.3em] text-stone-600">
              © 2026 SNEAKERZONE. ALL RIGHTS RESERVED.
            </div>
            <div className="flex flex-wrap justify-center gap-10 text-[10px] font-black uppercase italic tracking-[0.2em] text-stone-600">
              <a href="#" className="hover:text-white transition-colors">Privacy Statement</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Preferences</a>
              <a href="#" className="hover:text-white transition-colors">Do Not Sell My Info</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

