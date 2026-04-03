'use client';

import React, { useState } from 'react';
import { StoreData, Product } from '@/lib/types';
import { useCart } from '@/contexts/CartContext';
import { Search, ShoppingCart, Heart, User, Menu, Gamepad2, Trophy, Zap, RefreshCw, Star, Headphones, ArrowRight, Facebook, Twitter, Instagram, Youtube, Monitor, Smartphone, Cpu, Target, Rocket, Clock, ShieldCheck, ChevronRight, Share2, Info, X, Flame } from 'lucide-react';
import { usePagination, ProductPagination } from '@/components/componentes-compartidos/templates/Pagination';

export default function ProGamerTemplate({ data }: { data: StoreData }) {
  const [activePlatform, setActivePlatform] = useState('All');
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
    <div className="min-h-full bg-stone-50 font-sans text-stone-900 selection:bg-red-600 selection:text-white">
      {/* PowerUp Pro Awareness Ribbon */}
      <div className="bg-red-600 text-white py-2.5 px-6 flex justify-center items-center gap-4 text-[10px] font-black uppercase tracking-[0.25em] relative z-[110] shadow-lg">
        <Zap className="w-3.5 h-3.5 fill-white animate-pulse" />
        <span>PRO EXCLUSIVE: EARLY ACCESS TO NEXT-GEN DROPS + 5% EXTRA TRADE CREDIT. <a href="#" className="underline ml-2 hover:text-black transition-colors">JOIN PRO</a></span>
        <Zap className="w-3.5 h-3.5 fill-white animate-pulse" />
      </div>

      <header className="bg-white sticky top-0 z-[100] border-b-[6px] border-red-600 shadow-xl">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="h-24 flex items-center justify-between gap-10">
            {/* Logo & Platform Nav */}
            <div className="flex items-center gap-10">
              <div className="flex flex-col items-center group cursor-pointer">
                <span className="font-black text-4xl tracking-tighter uppercase leading-[0.75] italic">
                  GAME<span className="text-red-600">STOP</span>
                </span>
                <div className="w-full h-1.5 bg-black mt-2 transform skew-x-[-15deg] group-hover:bg-red-600 transition-colors" />
              </div>

              <nav className="hidden xl:flex items-center gap-6 font-black text-[11px] uppercase tracking-wider text-stone-500">
                {['Consoles', 'Video Games', 'Accessories', 'Collectibles', 'PC Gaming', 'Pre-Owned', 'Deals'].map(item => (
                  <a key={item} href="#" className={`hover:text-red-600 transition-colors relative group py-2 ${item === 'Deals' ? 'text-red-600' : ''}`}>
                    {item}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all" />
                  </a>
                ))}
              </nav>
            </div>

            {/* Search Bar - High Contrast */}
            <div className="flex-1 max-w-2xl hidden lg:block">
              <div className="relative group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 group-focus-within:text-red-600 transition-colors" />
                <input
                  type="text"
                  placeholder="Search for games, consoles, collectibles & more..."
                  className="w-full bg-stone-100 py-3.5 pl-14 pr-4 rounded-lg text-[13px] font-bold outline-none border-2 border-transparent focus:bg-white focus:border-black transition-all shadow-inner"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-6">
              <div className="hidden md:flex flex-col items-center cursor-pointer group hover:text-red-600 transition-colors">
                <User className="w-6 h-6" />
                <span className="text-[9px] font-black uppercase mt-1 tracking-widest text-stone-500 group-hover:text-red-600">Account</span>
              </div>
              <div 
                onClick={() => toggleFavorite('header')}
                className="relative cursor-pointer group p-2"
              >
                <Heart className={`w-6 h-6 group-hover:text-red-600 transition-colors ${favorites.length > 0 ? 'fill-red-500 text-red-500' : ''}`} />
                {favorites.length > 0 && (
                  <span className="absolute top-0 right-0 bg-black text-white text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full group-hover:bg-red-600">{favorites.length}</span>
                )}
              </div>
              <div 
                onClick={() => setIsCartOpen(true)}
                className="relative cursor-pointer group bg-stone-100 p-3 rounded-xl hover:bg-black transition-all"
              >
                <ShoppingCart className="w-6 h-6 group-hover:text-white transition-colors" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-black w-6 h-6 flex items-center justify-center rounded-full border-2 border-white shadow-lg animate-bounce">
                    {itemCount}
                  </span>
                )}
              </div>
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-2 hover:text-red-600 transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1440px] mx-auto px-6 py-8">
        {/* Cinematic Hero - Next Gen Style */}
        <section className="relative h-[650px] mb-20 overflow-hidden rounded-[2.5rem] group shadow-2xl border-4 border-white">
          <img
            src={data.bannerImage || "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80"}
            alt="Hero Drop"
            className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-[4000ms]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

          <div className="absolute inset-0 flex flex-col items-start justify-center p-16 lg:p-24 text-white">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-red-600 text-white px-5 py-2 font-black text-xs uppercase italic tracking-widest skew-x-[-10deg] shadow-xl flex items-center gap-2">
                <Rocket className="w-4 h-4 fill-white animate-bounce" /> NEW ARRIVAL
              </div>
              <span className="text-xs font-black uppercase tracking-[0.3em] text-white/60">PLATFORM EXCLUSIVE</span>
            </div>

            <h1 className="text-8xl font-black uppercase italic tracking-tighter mb-6 leading-[0.85] drop-shadow-[0_15px_45px_rgba(0,0,0,0.6)]">
              {data.name}
            </h1>
            <p className="text-2xl font-bold uppercase italic mb-12 text-stone-200 max-w-xl leading-snug tracking-tight drop-shadow-md">
              {data.description}
            </p>

            <div className="flex flex-wrap gap-6">
              <button className="bg-white text-black px-12 py-5 rounded-xl font-black uppercase italic text-lg hover:bg-red-600 hover:text-white transition-all transform hover:-translate-y-2 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]">
                Shop the Drop
              </button>
              <button className="bg-black/40 backdrop-blur-md border-2 border-white/20 text-white px-12 py-5 rounded-xl font-black uppercase italic text-lg hover:bg-white hover:text-black transition-all">
                Pre-Order Now
              </button>
            </div>
          </div>

          {/* Platform Badges */}
          <div className="absolute bottom-12 right-12 hidden md:flex items-center gap-3">
            <div className="bg-white px-4 py-2 rounded-lg font-black text-[10px] tracking-widest text-[#006FCD] shadow-lg italic">PS5</div>
            <div className="bg-white px-4 py-2 rounded-lg font-black text-[10px] tracking-widest text-[#107C10] shadow-lg italic">XBOX SERIES X</div>
            <div className="bg-white px-4 py-2 rounded-lg font-black text-[10px] tracking-widest text-[#E60012] shadow-lg italic">NINTENDO</div>
          </div>
        </section>

        {/* Dynamic Product Grid */}
        <section className="mb-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b-[8px] border-black pb-8">
            <div className="space-y-3">
              <h2 className="text-6xl font-black uppercase italic tracking-tighter flex items-center gap-5 leading-none">
                <Gamepad2 className="w-14 h-14 text-red-600" /> TOP DROPS
              </h2>
              <p className="text-stone-400 font-bold uppercase text-xs tracking-[0.4em]">Most wanted gaming equipment and collectibles</p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-3">
              {['All', 'Video Games', 'Consoles', 'Accessories', 'Collectibles'].map(platform => (
                <button
                  key={platform}
                  onClick={() => setActivePlatform(platform)}
                  className={`px-6 py-2 rounded-full font-black uppercase italic text-[10px] tracking-widest transition-all ${activePlatform === platform ? 'bg-red-600 text-white shadow-lg scale-105' : 'bg-white text-stone-400 border border-stone-200 hover:border-black hover:text-black'
                    }`}
                >
                  {platform}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {paginatedItems.map((product: any, idx: number) => (
              <div key={product.id || idx} data-product-id={product.id} className="group cursor-pointer flex flex-col bg-white border border-stone-200 rounded-3xl overflow-hidden hover:border-red-600 hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-2">
                <div className="relative aspect-[3/4] overflow-hidden bg-black group-hover:bg-stone-50">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-all duration-700 opacity-80 group-hover:opacity-100"
                  />

                  {/* Performance Badge */}
                  <div className="absolute top-5 left-5">
                    <div className="bg-red-600 text-white text-[10px] font-black uppercase italic px-4 py-1.5 skew-x-[-10deg] shadow-2xl">
                      BEST SELLER
                    </div>
                  </div>

                  {/* Platform Indicator */}
                  <div className="absolute bottom-5 right-5 w-10 h-10 bg-black/80 backdrop-blur-md rounded-lg flex items-center justify-center border border-white/20">
                    <Target className="w-5 h-5 text-red-600" />
                  </div>

                  <button 
                    onClick={(e) => handleAddToCart(product, e)}
                    className="absolute bottom-6 left-6 right-6 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 bg-red-600 text-white py-4 rounded-xl font-black uppercase italic text-xs tracking-widest transition-all duration-300 shadow-2xl hover:bg-black"
                  >
                    Add to Cart
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }}
                    className="absolute top-5 right-5 p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Heart className={`w-4 h-4 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>
                </div>

                <div className="p-6 space-y-3 flex-1 flex flex-col bg-white">
                  <div className="flex justify-between items-center">
                    <div className="text-[10px] font-black uppercase italic text-red-600 tracking-wider">
                      {product.category}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-red-600 fill-red-600" />
                      <span className="text-[10px] font-black">4.9</span>
                    </div>
                  </div>
                  <h3 className="font-black uppercase italic text-stone-900 text-sm leading-tight line-clamp-2 min-h-[2.8rem] group-hover:text-red-600 transition-colors">
                    {product.title}
                  </h3>
                  <div className="flex items-baseline gap-3 pt-3 mt-auto">
                    <span className="text-3xl font-black italic tracking-tighter text-black">${product.price}</span>
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

        {/* Pro Membership - Ultra Premium Section */}
        <section className="mb-24">
          <div className="bg-gradient-to-br from-red-600 via-red-700 to-black rounded-[3rem] overflow-hidden relative shadow-[0_50px_100px_-20px_rgba(220,38,38,0.4)] border-4 border-white/10 group">
            {/* Animated Grid Overlay */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none" />

            <div className="relative z-10 p-12 lg:p-24 flex flex-col lg:flex-row items-center justify-between gap-16">
              <div className="flex-1 space-y-10">
                <div className="inline-flex items-center gap-4 bg-white text-black px-6 py-2.5 rounded-full text-xs font-black uppercase italic tracking-[0.2em] shadow-xl">
                  <Trophy className="w-5 h-5 text-red-600 fill-red-600 animate-pulse" /> LEVEL UP YOUR GAINS
                </div>

                <h2 className="text-8xl font-black uppercase italic tracking-tighter text-white leading-[0.85]">
                  THE PRO <br />ADVANTAGE.
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl">
                  {[
                    { title: '$5 Monthly Reward', desc: '$60 Annual value for anything.' },
                    { title: '2% Back in Rewards', desc: 'Get paid to play more games.' },
                    { title: 'Early Access Drops', desc: 'Jump the queue on rare items.' },
                    { title: 'Extra Trade Value', desc: 'Get 10% more for your tech.' },
                  ].map((benefit, i) => (
                    <div key={i} className="flex gap-5 p-7 bg-black/40 rounded-2xl backdrop-blur-xl border border-white/10 hover:border-white/30 transition-all cursor-default group">
                      <div className="w-12 h-12 rounded-xl bg-red-600 flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform">
                        <Zap className="w-6 h-6 text-white fill-white" />
                      </div>
                      <div>
                        <h4 className="font-black uppercase italic text-white text-base tracking-wide">{benefit.title}</h4>
                        <p className="text-red-100 text-[11px] font-bold mt-1 opacity-70 italic">{benefit.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-6 pt-6">
                  <button className="bg-white text-red-600 px-14 py-6 rounded-2xl font-black uppercase italic text-xl hover:bg-black hover:text-white transition-all transform hover:-translate-y-2 shadow-2xl">
                    Join for Only $25/Year
                  </button>
                  <button className="bg-transparent border-[3px] border-white/30 text-white px-14 py-6 rounded-2xl font-black uppercase italic text-xl hover:border-white transition-all">
                    Sign In
                  </button>
                </div>
              </div>

              {/* Holographic Card Effect */}
              <div className="relative perspective-[1000px] hidden md:block group/card">
                <div className="w-[480px] h-[300px] bg-stone-950 rounded-[2.5rem] border-[8px] border-white/10 shadow-[0_60px_120px_rgba(0,0,0,0.6)] p-12 flex flex-col justify-between transform rotate-[-8deg] group-hover/card:rotate-0 group-hover/card:scale-105 transition-all duration-[800ms] relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/20 blur-[100px] pointer-events-none" />

                  <div className="flex justify-between items-start relative z-10">
                    <div>
                      <h3 className="text-white font-black text-6xl uppercase italic tracking-tighter leading-none">PRO</h3>
                      <div className="flex items-center gap-2 mt-4 text-red-600">
                        <Star className="w-5 h-5 fill-red-600" />
                        <Star className="w-5 h-5 fill-red-600" />
                        <Star className="w-5 h-5 fill-red-600" />
                        <Star className="w-5 h-5 fill-red-600" />
                        <Star className="w-5 h-5 fill-red-600" />
                      </div>
                    </div>
                    <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center shadow-[0_0_30px_rgba(220,38,38,0.5)]">
                      <Zap className="w-8 h-8 text-white fill-white" />
                    </div>
                  </div>

                  <div className="space-y-6 relative z-10">
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-stone-500 text-[10px] font-black uppercase tracking-[0.3em] mb-2">Member Since</p>
                        <p className="text-white font-black uppercase italic text-lg tracking-widest leading-none">EST. 2024</p>
                      </div>
                      <div className="text-right">
                        <p className="text-stone-500 text-[10px] font-black uppercase tracking-[0.3em] mb-2">PowerUp Status</p>
                        <p className="text-red-600 font-black uppercase italic text-lg tracking-widest leading-none">ACTIVE ELITE</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Reward Bubble */}
                <div className="absolute -top-12 -right-12 w-28 h-28 bg-white rounded-3xl flex flex-col items-center justify-center shadow-3xl transform rotate-12 animate-bounce cursor-pointer group">
                  <span className="text-red-600 font-black text-3xl italic">$5</span>
                  <span className="text-black font-black text-[9px] uppercase tracking-tighter">MONTHLY</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Console Hubs Section */}
        <section className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { id: 'ps5', name: 'PlayStation 5', color: 'from-[#006FCD] to-white', img: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&q=80' },
              { id: 'xbox', name: 'Xbox Series X', color: 'from-[#107C10] to-white', img: 'https://images.unsplash.com/photo-1621259181239-0bf93132d53d?auto=format&fit=crop&q=80' },
              { id: 'switch', name: 'Nintendo Switch', color: 'from-[#E60012] to-white', img: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?auto=format&fit=crop&q=80' },
              { id: 'pc', name: 'PC Gaming Hub', color: 'from-stone-900 to-white', img: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&q=80' },
            ].map((hub, i) => (
              <div key={i} className="relative h-64 rounded-3xl overflow-hidden group cursor-pointer shadow-xl">
                <img src={hub.img} alt={hub.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms] opacity-60 group-hover:opacity-100" />
                <div className={`absolute inset-0 bg-gradient-to-t ${hub.color} opacity-40 group-hover:opacity-20 transition-all`} />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <h3 className="text-3xl font-black uppercase italic tracking-tighter drop-shadow-lg text-center">{hub.name}</h3>
                  <button className="mt-4 opacity-0 group-hover:opacity-100 bg-white text-black px-6 py-2 rounded-lg font-black uppercase text-[10px] tracking-widest transition-all">Shop Hub</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Trending Games Section */}
        <section className="mb-24">
          <div className="flex items-end justify-between mb-12 border-b-[8px] border-black pb-8">
            <h2 className="text-5xl font-black uppercase italic tracking-tighter flex items-center gap-5 leading-none">
              <Flame className="w-12 h-12 text-red-600 fill-red-600" /> TRENDING NOW
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'RPG Adventures', desc: 'Explore vast open worlds with epic storylines', img: 'https://picsum.photos/600/400?random=601', tag: 'HOT' },
              { title: 'FPS Competitive', desc: 'Dominate the leaderboards with precision aim', img: 'https://picsum.photos/600/400?random=602', tag: 'TRENDING' },
              { title: 'Racing Sims', desc: 'Feel every turn with next-gen haptic feedback', img: 'https://picsum.photos/600/400?random=603', tag: 'NEW' },
            ].map((game, i) => (
              <div key={i} className="group cursor-pointer relative h-80 rounded-3xl overflow-hidden shadow-xl">
                <img src={game.img} alt={game.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <div className="absolute top-5 left-5">
                  <span className="bg-red-600 text-white text-[10px] font-black uppercase italic px-4 py-1.5 skew-x-[-10deg] shadow-xl">{game.tag}</span>
                </div>
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-2">{game.title}</h3>
                  <p className="text-stone-300 font-bold text-sm italic">{game.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Customer Reviews */}
        <section className="mb-24 bg-white rounded-[3rem] p-12 lg:p-20 border border-stone-200 shadow-sm">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black uppercase italic tracking-tighter mb-4">PLAYER REVIEWS</h2>
            <div className="flex items-center justify-center gap-2">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 text-red-600 fill-red-600" />)}
              <span className="text-stone-500 font-black text-sm ml-2">4.9 / 5 from 12,400+ reviews</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Alex M.', text: 'Best gaming store online. Fast shipping and great prices on pre-orders.', rating: 5 },
              { name: 'Jordan K.', text: 'The trade-in program is unbeatable. Got amazing credit for my old console.', rating: 5 },
              { name: 'Sam R.', text: 'Pro membership pays for itself in the first month. Highly recommend.', rating: 5 },
            ].map((review, i) => (
              <div key={i} className="bg-stone-50 p-8 rounded-2xl border border-stone-100">
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, j) => <Star key={j} className="w-4 h-4 text-red-600 fill-red-600" />)}
                </div>
                <p className="text-stone-600 font-bold italic mb-6 leading-relaxed">"{review.text}"</p>
                <p className="font-black uppercase text-sm tracking-widest text-stone-900">{review.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Esports Hub */}
        <section className="mb-24">
          <div className="bg-gradient-to-r from-stone-950 to-stone-900 rounded-[3rem] p-12 lg:p-20 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none" />
            <div className="flex flex-col lg:flex-row gap-16 items-center relative z-10">
              <div className="lg:w-1/2 space-y-8">
                <div className="inline-flex items-center gap-2 bg-red-600 text-white px-5 py-2 rounded-lg text-[10px] font-black uppercase italic tracking-widest">
                  <Trophy className="w-4 h-4 fill-white" /> ESPORTS HUB
                </div>
                <h2 className="text-6xl font-black uppercase italic tracking-tighter text-white leading-[0.85]">
                  COMPETE.<br /><span className="text-red-600">DOMINATE.</span>
                </h2>
                <p className="text-stone-400 font-bold italic text-lg max-w-md">
                  Shop tournament-grade peripherals, team jerseys, and pro gaming setups used by the world's top esports athletes.
                </p>
                <button className="bg-red-600 text-white px-12 py-5 rounded-2xl font-black uppercase italic text-lg hover:bg-white hover:text-black transition-all shadow-xl">
                  Shop Esports Gear
                </button>
              </div>
              <div className="lg:w-1/2 grid grid-cols-2 gap-6">
                {[
                  { label: 'Pro Keyboards', icon: Cpu },
                  { label: 'Gaming Mice', icon: Target },
                  { label: 'Headsets', icon: Headphones },
                  { label: 'Monitors', icon: Monitor },
                ].map((item, i) => (
                  <div key={i} className="bg-stone-800/50 border border-stone-700 p-8 rounded-2xl hover:bg-red-600/10 hover:border-red-600/50 transition-all cursor-pointer group">
                    <item.icon className="w-10 h-10 text-red-600 mb-4 group-hover:scale-110 transition-transform" />
                    <h4 className="text-white font-black uppercase italic tracking-tight">{item.label}</h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Brand Partners */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-4">OFFICIAL BRAND PARTNERS</h2>
            <p className="text-stone-400 font-bold uppercase text-xs tracking-[0.3em]">Authorized retailer for the world's top gaming brands</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {['Razer', 'SteelSeries', 'Corsair', 'HyperX', 'Logitech', 'ASUS ROG'].map((brand, i) => (
              <div key={i} className="bg-white border border-stone-200 rounded-2xl p-8 flex items-center justify-center hover:border-red-600 hover:shadow-lg transition-all cursor-pointer group h-28">
                <span className="font-black uppercase italic text-stone-400 group-hover:text-red-600 transition-colors tracking-tighter text-lg">{brand}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter */}
        <section className="mb-24">
          <div className="bg-red-600 rounded-[3rem] p-12 lg:p-20 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none" />
            <div className="relative z-10">
              <Rocket className="w-16 h-16 mx-auto mb-8 animate-bounce" />
              <h2 className="text-5xl font-black uppercase italic tracking-tighter mb-4">NEVER MISS A DROP</h2>
              <p className="text-red-100 font-bold italic text-lg mb-10 max-w-lg mx-auto">
                Subscribe for exclusive early access, restock alerts, and pro member deals delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <input type="email" placeholder="ENTER YOUR EMAIL" className="flex-1 bg-white/20 backdrop-blur border-2 border-white/30 text-white placeholder-white/60 px-6 py-4 rounded-xl font-black text-sm uppercase tracking-widest outline-none focus:border-white" />
                <button className="bg-white text-red-600 px-10 py-4 rounded-xl font-black uppercase italic text-sm hover:bg-black hover:text-white transition-all shadow-xl">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Trade-In Center - Industrial Aesthetics */}
        <section className="bg-stone-950 rounded-[3rem] p-12 lg:p-24 mb-24 relative overflow-hidden border-b-[12px] border-red-600 group">
          <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')] pointer-events-none" />

          <div className="flex flex-col lg:flex-row gap-20 items-center relative z-10">
            <div className="lg:w-1/2 space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-red-600 text-white px-5 py-2 rounded-lg text-[10px] font-black uppercase italic tracking-widest shadow-lg">
                <RefreshCw className="w-4 h-4" /> RECYCLING & CREDIT PROGRAM
              </div>
              <h2 className="text-7xl font-black uppercase italic tracking-tighter leading-none text-white">
                CASH IN <br /><span className="text-red-600">NOW.</span>
              </h2>
              <p className="text-stone-400 font-bold uppercase italic text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
                Turn your pre-owned consoles, games, and electronics into cash or store credit instantly. We offer some of the highest trade rates in the industry.
              </p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
                <button className="bg-white text-black px-12 py-5 rounded-2xl font-black uppercase italic text-xl hover:bg-red-600 hover:text-white transition-all shadow-xl">
                  Get Instant Online Value
                </button>
                <div className="flex items-center gap-4 text-white font-black uppercase italic text-sm border-l-2 border-stone-800 pl-8 ml-4">
                  <div className="text-4xl">10<span className="text-lg">%</span></div>
                  <div className="leading-tight opacity-60">EXTRA CREDIT <br />FOR PROS</div>
                </div>
              </div>
            </div>

            <div className="flex-1 grid grid-cols-2 gap-6 w-full relative">
              {[
                { label: 'PS5 Consol', value: 'Up to $250', icon: Monitor },
                { label: 'OLED Switch', value: 'Up to $180', icon: Smartphone },
                { label: 'Xbox Series X', value: 'Up to $220', icon: Cpu },
                { label: 'Retro Games', icon: Target },
              ].map((cat, i) => (
                <div key={i} className="bg-stone-900 border border-stone-800 p-8 rounded-[2rem] hover:bg-red-600/10 hover:border-red-600/50 transition-all group/box cursor-pointer">
                  <cat.icon className="w-10 h-10 text-red-600 mb-6 group-hover/box:scale-110 transition-transform" />
                  <h4 className="text-white font-black uppercase italic text-lg tracking-tight mb-2 leading-none">{cat.label}</h4>
                  {cat.value && <p className="text-red-600 font-bold uppercase text-xs tracking-widest leading-none">{cat.value}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-stone-950 text-white pt-32 pb-16 border-t-[16px] border-red-600">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-32">
            <div className="space-y-12">
              <div className="flex flex-col items-start italic group cursor-pointer">
                <span className="font-black text-5xl tracking-tighter uppercase leading-[0.75]">
                  GAME<span className="text-red-600">STOP</span>
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-stone-600 mt-2">Level Up Your Play</span>
              </div>
              <p className="text-stone-500 font-bold uppercase italic text-[11px] leading-relaxed max-w-xs tracking-widest">
                ProGamer is the world's largest video game retailer. We are committed to delivering the best products for every gaming lifestyle.
              </p>
              <div className="flex gap-4">
                {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                  <a key={i} href="#" className="w-12 h-12 bg-stone-900 rounded-2xl flex items-center justify-center hover:bg-red-600 transition-all shadow-2xl group">
                    <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-10">
              <h4 className="text-red-600 font-black uppercase italic text-lg tracking-widest border-l-4 border-red-600 pl-4">Player Support</h4>
              <nav className="flex flex-col gap-6 text-[11px] font-black uppercase italic tracking-[0.2em] text-stone-400">
                {['Contact Us', 'Order Status', 'Store Locator', 'Trade-In Values', 'Game Informer', 'Returns & Help'].map(l => (
                  <a key={l} href="#" className="hover:text-white transition-colors flex items-center gap-3 group">
                    <div className="w-1.5 h-1.5 bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {l}
                  </a>
                ))}
              </nav>
            </div>

            <div className="space-y-10">
              <h4 className="text-red-600 font-black uppercase italic text-lg tracking-widest border-l-4 border-red-600 pl-4">ProGamer Pro</h4>
              <nav className="flex flex-col gap-6 text-[11px] font-black uppercase italic tracking-[0.2em] text-stone-400">
                {['Join / Renew Pro', 'Pro Rewards Info', 'Member Dashboard', 'Digital Rewards', 'Early Access Hub'].map(l => (
                  <a key={l} href="#" className="hover:text-white transition-colors flex items-center gap-3 group">
                    <div className="w-1.5 h-1.5 bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {l}
                  </a>
                ))}
              </nav>
            </div>

            <div className="space-y-10">
              <h4 className="text-red-600 font-black uppercase italic text-lg tracking-widest border-l-4 border-red-600 pl-4">Get the Drops</h4>
              <p className="text-stone-500 font-bold uppercase italic text-[11px] leading-relaxed tracking-widest">
                Be the first to know about console stock alerts, limited drops, and pro rewards.
              </p>
              <div className="space-y-6">
                <div className="relative group">
                  <input
                    type="email"
                    placeholder="PLAYER@GMAIL.COM"
                    className="w-full bg-stone-900 border-b-2 border-stone-800 py-4 px-2 text-[11px] font-black italic outline-none focus:border-red-600 transition-colors uppercase tracking-[0.2em]"
                  />
                  <button className="absolute right-0 bottom-4 text-red-600 hover:text-white transition-colors group">
                    <ArrowRight className="w-6 h-6 transform group-hover:translate-x-2 transition-transform" />
                  </button>
                </div>
                <div className="flex items-center gap-4 py-4 px-6 bg-red-600/10 rounded-2xl border border-red-600/20">
                  <Smartphone className="w-8 h-8 text-red-600" />
                  <div>
                    <h5 className="text-[10px] font-black uppercase">Download App</h5>
                    <p className="text-[9px] font-bold text-stone-500 italic">Level up on mobile</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-center pt-20 border-t border-stone-900 gap-12">
            <div className="text-[10px] font-black uppercase italic tracking-[0.4em] text-stone-600">
              © 2026 PROGAMER CORP. ALL RIGHTS RESERVED. <br />
              <span className="text-[8px] opacity-40 italic mt-2 block">PROGAMER IS A REGISTERED TRADEMARK OF PROGAMER CORP.</span>
            </div>
            <div className="flex flex-wrap justify-center gap-10 text-[10px] font-black uppercase italic tracking-[0.2em] text-stone-600">
              <a href="#" className="hover:text-white transition-colors">Privacy Rights</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Dashboard</a>
              <a href="#" className="hover:text-white transition-colors">Accessibility</a>
              <a href="#" className="hover:text-white transition-colors">California Disclosure</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

