'use client';
import React, { useState, useEffect } from 'react';
import { StoreData, Product } from '@/lib/types';
import { useCart } from '@/contexts/CartContext';
import { Search, ShoppingCart, User, Menu, Leaf, ShieldCheck, Star, Heart, HeartPulse, Brain, Eye, Bone, Smartphone, ArrowRight, Facebook, Twitter, Instagram, Youtube, FlaskConical, Beaker, CheckCircle2, ChevronDown, Plus, Minus, Globe, Sparkles, Filter, Info, CreditCard } from 'lucide-react';
import { usePagination, ProductPagination } from '@/components/componentes-compartidos/templates/Pagination';

export default function GreenHealthTemplate({ data }: { data: StoreData }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Supplements');
  const { addToCart: addToCartContext, itemCount, setIsCartOpen } = useCart();
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
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
    <div className="min-h-full bg-[#fcfdfa] font-sans text-slate-900 selection:bg-[#458500] selection:text-white antialiased">
      {/* Top Wellness Bar */}
      <div className="bg-[#458500] text-white py-2.5 px-8 flex justify-center items-center gap-8 text-[11px] font-black uppercase tracking-[0.2em] relative z-[110]">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          <span>AUTOSHIP & SAVE: EXTRA 10% OFF EVERY ORDER</span>
        </div>
        <div className="hidden md:flex items-center gap-2 border-l border-white/20 pl-8">
          <Globe className="w-4 h-4" />
          <span>FREE GLOBAL SHIPPING OVER $40</span>
        </div>
      </div>

      <header className={`sticky top-0 z-[100] transition-all duration-500 ${isScrolled ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200 py-4 shadow-xl' : 'bg-white py-8'}`}>
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="flex items-center justify-between gap-12">
            {/* Logo */}
            <div className="flex items-center gap-12 shrink-0">
              <div className="flex items-center cursor-pointer group">
                <span className="font-black text-4xl tracking-tighter text-[#458500] flex items-center">
                  GREENHEALTH<span className="text-slate-300 font-light ml-0.5">®</span>
                </span>
              </div>

              <button className="hidden xl:flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-slate-500 hover:text-[#458500] transition-colors">
                <Menu className="w-5 h-5" />
                EXPLORE WELLNESS
              </button>
            </div>

            {/* Smart Search */}
            <div className="flex-1 max-w-3xl hidden md:block">
              <div className="relative group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#458500] transition-colors" />
                <input
                  type="text"
                  placeholder="Analyze formulations, brands, or health clinical topics..."
                  className="w-full bg-slate-50 border border-slate-200 py-4 pl-14 pr-4 rounded-2xl text-[13px] font-medium outline-none focus:bg-white focus:border-[#458500] focus:ring-4 focus:ring-[#458500]/5 transition-all"
                />
              </div>
            </div>

            {/* Profile & Logic */}
            <div className="flex items-center gap-8 text-slate-500">
              <div className="hidden lg:flex flex-col items-center cursor-pointer group hover:text-[#458500] transition-colors">
                <User className="w-6 h-6" />
                <span className="text-[9px] font-black uppercase mt-1 tracking-widest">Apothecary</span>
              </div>
              <div 
                onClick={() => setIsCartOpen(true)}
                className="relative cursor-pointer group bg-slate-50 p-3.5 rounded-2xl hover:bg-[#458500] hover:text-white transition-all border border-slate-200"
              >
                <ShoppingCart className="w-6 h-6" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#ff8c00] text-white text-[10px] font-black w-6 h-6 flex items-center justify-center rounded-full border-2 border-white shadow-lg">
                    {itemCount}
                  </span>
                )}
              </div>
              <Menu className="w-7 h-7 xl:hidden cursor-pointer" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1440px] mx-auto px-8 py-10">
        {/* Clinical Hero Section */}
        <section className="relative h-[650px] mb-20 overflow-hidden rounded-[3rem] group">
          <img
            src={data.bannerImage || "https://images.unsplash.com/photo-1542736667-069246bdf6fd?auto=format&fit=crop&q=80"}
            alt="Wellness Banner"
            className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-[6000ms]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/40 via-transparent to-transparent" />

          <div className="absolute inset-0 flex flex-col items-start justify-center p-16 lg:p-32 text-white">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-[#458500] text-white px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest shadow-2xl flex items-center gap-2">
                <FlaskConical className="w-4 h-4" /> SCIENCE-BACKED
              </div>
              <span className="text-xs font-black uppercase tracking-[0.3em] text-white/80 drop-shadow-md">NUTRACEUTICALS</span>
            </div>

            <h1 className="text-7xl font-black uppercase tracking-tighter mb-8 leading-[0.9] drop-shadow-2xl max-w-2xl">
              {data.name}
            </h1>
            <p className="text-2xl font-bold mb-14 text-white/90 max-w-xl leading-relaxed drop-shadow-lg italic">
              "Mastering human longevity through clinical-grade supplementation and pure ingredients."
            </p>

            <div className="flex flex-wrap gap-8">
              <button className="bg-white text-[#458500] px-16 py-6 rounded-2xl font-black uppercase text-xl hover:bg-[#458500] hover:text-white transition-all transform hover:-translate-y-2 shadow-2xl">
                Start Analysis
              </button>
              <button className="bg-black/20 backdrop-blur-xl border border-white/30 text-white px-16 py-6 rounded-2xl font-black uppercase text-xl hover:bg-white/10 transition-all">
                Full Catalog
              </button>
            </div>
          </div>

          {/* Floating Pure Ingredient Tag */}
          <div className="absolute right-16 top-16 hidden xl:block">
            <div className="bg-white/90 backdrop-blur-md p-10 rounded-[2.5rem] border border-white shadow-2xl space-y-8 max-w-xs transition-all hover:scale-105 duration-500">
              <div className="flex justify-between items-center bg-emerald-50 p-4 rounded-2xl">
                <Leaf className="w-8 h-8 text-[#458500]" />
                <div className="text-right">
                  <div className="text-[10px] font-black text-emerald-800 uppercase tracking-widest">Purity Grade</div>
                  <div className="text-2xl font-black text-[#458500]">99.8%</div>
                </div>
              </div>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
                Third-party tested labs for toxic metals and label accuracy on all arrivals.
              </p>
              <div className="flex items-center gap-3 text-[#458500] font-black text-[10px] uppercase tracking-widest underline decoration-2 underline-offset-4 cursor-pointer">
                View COA Reports
              </div>
            </div>
          </div>
        </section>

        {/* Science-Driven Product Discovery with Pagination */}
        <section className="mb-32">
          <div className="flex flex-col xl:flex-row xl:items-end justify-between mb-16 gap-12 border-b-2 border-slate-100 pb-12">
            <div className="space-y-4">
              <h2 className="text-5xl font-black uppercase tracking-tighter flex items-center gap-5 leading-none text-slate-800">
                <Beaker className="w-12 h-12 text-[#ff8c00]" /> CLINICAL PICKS ({totalItems})
              </h2>
              <p className="text-slate-400 font-bold uppercase text-[11px] tracking-[0.4em]">Optimizing human performance through verified formulations</p>
            </div>

            <div className="flex flex-wrap gap-4">
              {['Supplements', 'Sports', 'Beauty', 'Personal Care', 'Grocery', 'Pets'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all ${activeCategory === cat ? 'bg-[#458500] text-white shadow-2xl scale-105' : 'bg-white text-slate-400 border border-slate-200 hover:border-[#458500] hover:text-[#458500]'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {paginatedItems.map(product => (
              <div key={product.id} data-product-id={product.id} className="group cursor-pointer flex flex-col bg-white border border-slate-100 p-6 rounded-3xl hover:border-[#458500] hover:shadow-[0_40px_80px_-15px_rgba(69,133,0,0.12)] transition-all duration-700">
                <div className="relative aspect-square overflow-hidden bg-slate-50 rounded-2xl mb-4 flex items-center justify-center">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-full object-contain p-4 transform scale-100 group-hover:scale-110 transition-transform duration-1000"
                  />

                  {/* Purity Labels */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1">
                    <div className="bg-white/80 backdrop-blur-md text-[#458500] text-[9px] font-black uppercase px-3 py-1 rounded-full flex items-center gap-2 border border-[#458500]/10 shadow-sm">
                      <CheckCircle2 className="w-3 h-3" /> VERIFIED
                    </div>
                    {product.originalPrice && (
                      <div className="bg-[#ff8c00] text-white text-[9px] font-black uppercase px-3 py-1 rounded-full shadow-lg">
                        SAVE {Math.round((1 - Number(product.price) / Number(product.originalPrice)) * 100)}%
                      </div>
                    )}
                  </div>

                  {/* Favorite Button */}
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }}
                    className="absolute top-3 right-3 p-2 bg-white/80 rounded-full shadow-sm transition-colors"
                  >
                    <Heart className={`w-4 h-4 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-500'}`} />
                  </button>
                </div>

                <div className="space-y-3 flex-1 flex flex-col">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#458500] bg-[#458500]/5 px-3 py-1 rounded-full">{product.category}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-[#ff8c00] text-[#ff8c00]" />
                      <span className="text-[11px] font-black text-slate-400">4.9</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-slate-800 text-sm leading-snug line-clamp-2 min-h-[2.5rem] tracking-tight group-hover:text-[#458500] transition-colors">
                    {product.title}
                  </h3>

                  <div className="pt-4 border-t border-slate-50 mt-auto">
                    <div className="flex flex-col mb-4">
                      <div className="flex items-baseline gap-3">
                        <span className="text-2xl font-black tracking-tighter text-slate-900">${product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-slate-300 line-through font-bold">${product.originalPrice}</span>
                        )}
                      </div>
                      <div className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mt-2 flex items-center gap-2">
                        <Info className="w-3 h-3" /> In Stock & Global Delivery
                      </div>
                    </div>

                    <button 
                      onClick={(e) => handleAddToCart(product, e)}
                      className="w-full bg-[#458500] text-white py-3 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-slate-900 transition-all shadow-xl flex items-center justify-center gap-3"
                    >
                      <ShoppingCart className="w-4 h-4" /> Add to Cart
                    </button>
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

        {/* Diagnostic Path / Shop by Concern */}
        <section className="bg-slate-900 rounded-[4rem] overflow-hidden relative shadow-3xl mb-32 group border-b-[24px] border-[#458500]">
          <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-center">
            <div className="flex-1 p-16 lg:p-32 space-y-12 relative z-10 text-white">
              <div className="flex items-center gap-4 text-[#458500] font-black text-xs uppercase tracking-[0.5em] mb-4">
                <HeartPulse className="w-6 h-6" /> TARGETED THERAPEUTICS
              </div>

              <h2 className="text-7xl font-black uppercase tracking-tighter leading-none max-w-xl">
                OPTIMIZE YOUR <br /><span className="text-[#458500]">BIO-LOGIC.</span>
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-8 opacity-80">
                {[
                  { name: 'IMMUNITY', icon: ShieldCheck },
                  { name: 'KINETIC', icon: Bone },
                  { name: 'COGNITIVE', icon: Brain },
                  { name: 'VITALITY', icon: HeartPulse },
                  { name: 'OCULAR', icon: Eye },
                  { name: 'ORGANIC', icon: Leaf },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-4 p-8 bg-white/5 rounded-3xl border border-white/10 cursor-pointer hover:bg-[#458500] hover:border-[#458500] transition-all group/icon">
                    <item.icon className="w-10 h-10 group-hover/icon:scale-110 transition-transform" />
                    <span className="text-[10px] font-black tracking-widest">{item.name}</span>
                  </div>
                ))}
              </div>

              <button className="bg-white text-slate-900 px-16 py-6 rounded-2xl font-black uppercase text-xl hover:bg-[#458500] hover:text-white transition-all transform hover:-translate-y-2 shadow-2xl">
                Analyze My Needs
              </button>
            </div>

            <div className="flex-1 relative h-[800px] w-full mt-12 lg:mt-0">
              <img src="https://images.unsplash.com/photo-1576091160550-217359f4bd08?auto=format&fit=crop&q=80" className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-[3000ms]" />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-transparent to-transparent" />
            </div>
          </div>
        </section>

        {/* Apothecary Rewards Interface */}
        <section className="mb-32 grid grid-cols-1 xl:grid-cols-2 gap-12">
          <div className="bg-[#458500] p-16 rounded-[4rem] text-white space-y-12 relative overflow-hidden shadow-2xl group border border-white/10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-xl transform group-hover:rotate-6 transition-transform">
                <Leaf className="w-10 h-10 text-[#458500]" />
              </div>
              <h3 className="text-4xl font-black uppercase tracking-tighter">THE GREENHEALTH LOYALTY PROTOCOL</h3>
            </div>

            <p className="text-white/80 text-lg font-bold italic leading-relaxed max-w-md">
              "Shared health is shared wealth. Collaborate with our community and optimize your procurement budget."
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-6 p-8 bg-black/10 rounded-3xl border border-white/10">
                <div className="text-5xl font-black tracking-tighter">$5.00</div>
                <div className="text-[11px] font-black uppercase tracking-widest opacity-60">REF-ID INITIAL CREDIT</div>
              </div>
              <button className="w-full bg-white text-[#458500] py-6 rounded-2xl font-black uppercase text-lg tracking-widest hover:bg-slate-900 hover:text-white transition-all shadow-2xl">
                Activate Rewards Hub
              </button>
            </div>
          </div>

          <div className="bg-white p-16 rounded-[4rem] border-2 border-slate-100 space-y-12 shadow-xl group hover:border-[#458500] transition-colors">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-3xl flex items-center justify-center shadow-md">
                <Smartphone className="w-10 h-10 text-slate-800" />
              </div>
              <h3 className="text-4xl font-black uppercase tracking-tighter text-slate-800">MOBILE LAB INTERFACE</h3>
            </div>

            <p className="text-slate-400 font-bold uppercase text-[11px] leading-relaxed tracking-widest max-w-sm">
              Real-time tracking of cellular health drops, delivery logistics, and formulations.
            </p>

            <div className="flex gap-4">
              <button className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-black uppercase text-[11px] tracking-widest hover:bg-[#458500] transition-colors shadow-lg">App Store</button>
              <button className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-black uppercase text-[11px] tracking-widest hover:bg-[#458500] transition-colors shadow-lg">Google Play</button>
            </div>

            <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-[#458500] pt-6 border-t border-slate-50">
              <CreditCard className="w-5 h-5" /> 200K+ VERIFIED MOBILE REVIEWS
            </div>
          </div>
        </section>
        {/* ─── TRENDING SUPPLEMENTS ─── */}
        <section className="mb-32">
          <h2 className="text-4xl font-black uppercase tracking-tighter mb-4 text-slate-800">Trending Now</h2>
          <p className="text-slate-400 font-bold uppercase text-[11px] tracking-[0.3em] mb-12">Most popular formulations this month</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {data.products.slice(0, 4).map((product, idx) => (
              <div key={`trend-${product.id || idx}`} className="group cursor-pointer bg-white border border-slate-100 rounded-3xl p-6 hover:border-[#458500] hover:shadow-xl transition-all">
                <div className="relative aspect-square bg-slate-50 rounded-2xl mb-4 overflow-hidden">
                  <img src={product.imageUrl} alt={product.title} className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-3 left-3 bg-[#ff8c00] text-white text-[9px] font-black uppercase px-3 py-1 rounded-full">#{idx + 1} Trending</div>
                  <button onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }} className="absolute top-3 right-3 p-2 bg-white/80 rounded-full">
                    <Heart className={`w-4 h-4 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                  </button>
                </div>
                <h3 className="font-bold text-sm text-slate-800 line-clamp-2 mb-2">{product.title}</h3>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-xl font-black text-slate-900">${product.price}</span>
                  {product.originalPrice && <span className="text-sm text-slate-300 line-through">${product.originalPrice}</span>}
                </div>
                <button onClick={(e) => handleAddToCart(product, e)} className="w-full bg-[#458500] text-white py-2.5 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-slate-900 transition-all">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ─── BRAND TRUST BADGES ─── */}
        <section className="mb-32 bg-white border border-slate-100 rounded-[3rem] p-12 md:p-16">
          <h2 className="text-3xl font-black uppercase tracking-tighter text-center mb-12 text-slate-800">Why Choose GreenHealth</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: ShieldCheck, title: 'Third-Party Tested', desc: 'Every batch verified by independent labs' },
              { icon: Leaf, title: 'Clean Ingredients', desc: 'No artificial fillers or harmful additives' },
              { icon: Globe, title: 'Global Shipping', desc: 'Delivered to 185+ countries worldwide' },
              { icon: FlaskConical, title: 'Science-Backed', desc: 'Formulated with clinically studied ingredients' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center p-6">
                <div className="w-16 h-16 bg-[#458500]/10 rounded-2xl flex items-center justify-center mb-4">
                  <item.icon className="w-8 h-8 text-[#458500]" />
                </div>
                <h4 className="font-black text-sm uppercase tracking-widest mb-2 text-slate-800">{item.title}</h4>
                <p className="text-[12px] text-slate-400 font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── HEALTH GOALS GRID ─── */}
        <section className="mb-32">
          <h2 className="text-4xl font-black uppercase tracking-tighter mb-12 text-slate-800">Shop by Health Goal</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { title: 'Immune Support', img: 'https://picsum.photos/500/400?random=1201', color: 'bg-emerald-50' },
              { title: 'Energy & Focus', img: 'https://picsum.photos/500/400?random=1202', color: 'bg-amber-50' },
              { title: 'Gut Health', img: 'https://picsum.photos/500/400?random=1203', color: 'bg-green-50' },
              { title: 'Sleep & Calm', img: 'https://picsum.photos/500/400?random=1204', color: 'bg-indigo-50' },
              { title: 'Joint & Bone', img: 'https://picsum.photos/500/400?random=1205', color: 'bg-orange-50' },
              { title: 'Heart Health', img: 'https://picsum.photos/500/400?random=1206', color: 'bg-red-50' },
            ].map((goal, i) => (
              <div key={i} className={`group cursor-pointer ${goal.color} rounded-3xl overflow-hidden border border-slate-100 hover:border-[#458500] transition-all`}>
                <div className="relative aspect-[5/3] overflow-hidden">
                  <img src={goal.img} alt={goal.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-6 flex items-center justify-between">
                  <h3 className="font-black text-sm uppercase tracking-widest text-slate-800">{goal.title}</h3>
                  <ArrowRight className="w-5 h-5 text-[#458500] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── CUSTOMER REVIEWS ─── */}
        <section className="mb-32 bg-slate-50 rounded-[3rem] p-12 md:p-16 border border-slate-100">
          <h2 className="text-3xl font-black uppercase tracking-tighter text-center mb-4 text-slate-800">What Our Customers Say</h2>
          <p className="text-center text-slate-400 font-bold uppercase text-[11px] tracking-[0.3em] mb-12">Over 200,000 verified reviews</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah M.', rating: 5, text: 'The quality of these supplements is unmatched. I can feel the difference in my energy levels after just two weeks.' },
              { name: 'James K.', rating: 5, text: 'Finally found a brand I can trust. Third-party tested and the results speak for themselves. Highly recommend.' },
              { name: 'Lisa R.', rating: 5, text: 'Great customer service and fast shipping. The autoship feature saves me money every month. Love GreenHealth!' },
            ].map((review, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                <div className="flex items-center gap-1 mb-4">
                  {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-[#ff8c00] text-[#ff8c00]" />)}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 italic">&ldquo;{review.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#458500]/10 rounded-full flex items-center justify-center">
                    <span className="font-black text-[#458500] text-sm">{review.name[0]}</span>
                  </div>
                  <div>
                    <p className="font-black text-sm text-slate-800">{review.name}</p>
                    <p className="text-[10px] font-bold text-[#458500] uppercase tracking-widest flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Verified Buyer</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── NEWSLETTER ─── */}
        <section className="mb-32 bg-[#458500] rounded-[3rem] p-12 md:p-20 text-white text-center">
          <Sparkles className="w-10 h-10 mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-4">Get 20% Off Your First Order</h2>
          <p className="text-white/70 font-bold text-sm mb-10 max-w-md mx-auto">Subscribe to our newsletter for exclusive deals, new product launches, and wellness tips.</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input type="email" placeholder="YOUR EMAIL" className="flex-1 bg-white/10 border border-white/20 text-white px-6 py-4 rounded-xl font-bold text-[12px] tracking-widest placeholder-white/50 outline-none focus:border-white transition-all" />
            <button className="bg-white text-[#458500] px-8 py-4 rounded-xl font-black uppercase text-[12px] tracking-widest hover:bg-slate-900 hover:text-white transition-all">Subscribe</button>
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 text-white pt-32 pb-16 border-t-[32px] border-[#458500]">
        <div className="max-w-[1440px] mx-auto px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-24 mb-32">
            <div className="space-y-12">
              <div className="flex items-center cursor-pointer group">
                <span className="font-black text-4xl tracking-tighter text-white">
                  GREENHEALTH<span className="text-[#458500] font-light ml-0.5">®</span>
                </span>
              </div>
              <p className="text-white/40 font-bold uppercase text-[11px] leading-relaxed tracking-[0.2em] max-w-xs">
                The global catalyst for clinical-grade health and wellness. Optimizing procurement logistics across 185 countries since 1996.
              </p>
              <div className="flex gap-6">
                {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                  <a key={i} href="#" className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-[#458500] transition-all group">
                    <Icon className="w-5 h-5 group-hover:scale-110 transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-10">
              <h4 className="text-[#458500] font-black uppercase text-sm tracking-[0.3em]">CLINICAL DIVISIONS</h4>
              <nav className="flex flex-col gap-6 text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
                {['Supplements', 'Sports Nutrition', 'Bath & Personal', 'Beauty', 'Grocery Hub', 'Healthy Home', 'Pet Health'].map(l => (
                  <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>
                ))}
              </nav>
            </div>

            <div className="space-y-10">
              <h4 className="text-[#458500] font-black uppercase text-sm tracking-[0.3em]">WELLNESS OPS</h4>
              <nav className="flex flex-col gap-6 text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
                {['Help Center', 'Shipping Params', 'Return Protocol', 'Autoship & Save', 'Rewards Hub', 'Global Network'].map(l => (
                  <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>
                ))}
              </nav>
            </div>

            <div className="space-y-10">
              <h4 className="text-[#458500] font-black uppercase text-sm tracking-[0.3em]">FIELD UPDATES</h4>
              <p className="text-white/40 font-bold uppercase text-[11px] leading-relaxed tracking-[0.2em]">
                Initialize protocol to receive clinical insights and formulation announcements.
              </p>
              <div className="relative group">
                <input
                  type="email"
                  placeholder="SUBJECT@LAB.COM"
                  className="w-full bg-transparent border-b-2 border-white/10 py-4 font-black text-[11px] tracking-[0.3em] outline-none focus:border-[#458500] transition-all uppercase"
                />
                <button className="absolute right-0 bottom-4 text-[#458500] hover:text-white transition-colors">
                  <ArrowRight className="w-6 h-6" />
                </button>
              </div>
              <div className="flex items-center gap-4 text-[9px] font-black uppercase text-white/20">
                <CheckCircle2 className="w-4 h-4 text-[#458500]" /> LOGISTICS STATUS: NOMINAL
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-center gap-10 pt-16 border-t border-white/5 text-[9px] font-black uppercase tracking-[0.4em] text-white/20">
            <p>© 2026 GREENHEALTH LLC. ALL FORMULATIONS RESERVED. NOMINAL STATUS.</p>
            <div className="flex flex-wrap justify-center gap-10">
              <a href="#" className="hover:text-white transition-colors">Privacy Protocol</a>
              <a href="#" className="hover:text-white transition-colors">Legal Framework</a>
              <a href="#" className="hover:text-white transition-colors">Compliance</a>
              <a href="#" className="hover:text-white transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

