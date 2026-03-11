'use client';
import React, { useState, useEffect } from 'react';
import { StoreData } from '@/lib/types';
import { Search, ShoppingCart, Heart, User, Menu, Zap, ShieldCheck, Gamepad2, Monitor, Smartphone, Gift, ArrowRight, Facebook, Twitter, Instagram, Youtube, Twitch, Lock, Globe, ChevronRight, Star, AlertTriangle, Key, Download, Wallet, Clock } from 'lucide-react';

export default function KeyMarketTemplate({ data }: { data: StoreData }) {
  const [activeTab, setActiveTab] = useState('Trending');
  const [timer, setTimer] = useState('02:45:12');

  useEffect(() => {
    // Simple countdown simulation
    const interval = setInterval(() => {
      setTimer(prev => {
        const [h, m, s] = prev.split(':').map(Number);
        let newS = s - 1;
        let newM = m;
        let newH = h;
        if (newS < 0) { newS = 59; newM -= 1; }
        if (newM < 0) { newM = 59; newH -= 1; }
        return `${String(newH).padStart(2, '0')}:${String(newM).padStart(2, '0')}:${String(newS).padStart(2, '0')}`;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-full bg-stone-50 font-sans text-stone-900 selection:bg-orange-500 selection:text-white antialiased">
      {/* Dynamic Security Ribbon */}
      <div className="bg-black text-white py-2 px-8 flex justify-center items-center gap-6 text-[10px] font-black uppercase tracking-[0.2em] relative z-[110]">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-orange-500" />
          <span>KeyMarket SHIELD PROTECTED: 100% SECURE TRANSACTIONS</span>
        </div>
        <div className="hidden md:flex items-center gap-2 border-l border-white/20 pl-6">
          <Globe className="w-3.5 h-3.5 text-orange-500" />
          <span>GLOBAL INSTANT DELIVERY</span>
        </div>
        <div className="flex items-center gap-2 bg-orange-500 px-3 py-1 rounded ml-4 animate-pulse">
          <Zap className="w-3.5 h-3.5 fill-white" />
          <span>KeyMarket PLUS SALE NOW LIVE</span>
        </div>
      </div>

      <header className="bg-white sticky top-0 z-[100] border-b-[4px] border-orange-500 shadow-2xl">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="h-24 flex items-center justify-between gap-10">
            {/* Logo */}
            <div className="flex items-center gap-12 shrink-0">
              <div className="flex items-center cursor-pointer group">
                <span className="font-black text-4xl tracking-tighter uppercase leading-none text-orange-500">
                  KeyMarket<span className="text-black group-hover:text-orange-500 transition-colors">.COM</span>
                </span>
              </div>

              {/* Mega Menu Trigger */}
              <button className="hidden xl:flex items-center gap-3 bg-stone-100 font-black text-[11px] uppercase tracking-wider px-6 py-3 rounded-xl hover:bg-black hover:text-white transition-all">
                <Menu className="w-4 h-4" />
                Categories
              </button>
            </div>

            {/* Search - Enterprise Style */}
            <div className="flex-1 max-w-2xl hidden lg:block">
              <div className="relative group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 group-focus-within:text-orange-500 transition-colors" />
                <input
                  type="text"
                  placeholder="I'm looking for... (e.g. Elden Ring, Windows 11)"
                  className="w-full bg-stone-100 py-4 pl-14 pr-4 rounded-2xl text-[13px] font-bold outline-none border-2 border-transparent focus:bg-white focus:border-black transition-all shadow-inner"
                />
              </div>
            </div>

            {/* Global Actions */}
            <div className="flex items-center gap-8">
              <div className="hidden md:flex flex-col items-center cursor-pointer group hover:text-orange-500 transition-colors">
                <User className="w-6 h-6" />
                <span className="text-[9px] font-black uppercase mt-1 tracking-widest text-stone-500 group-hover:text-orange-500">Account</span>
              </div>
              <div className="relative cursor-pointer group bg-stone-100 p-3.5 rounded-2xl hover:bg-orange-500 transition-all">
                <ShoppingCart className="w-6 h-6 group-hover:text-white transition-colors" />
                <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-black w-6 h-6 flex items-center justify-center rounded-full border-2 border-white shadow-lg">
                  0
                </span>
              </div>
              <Menu className="w-7 h-7 xl:hidden cursor-pointer" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1440px] mx-auto px-6 py-8">
        {/* Cinematic Marketplace Hero */}
        <section className="relative h-[550px] mb-16 overflow-hidden rounded-[2.5rem] group shadow-2xl border-2 border-white">
          <img
            src={data.bannerImage || "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80"}
            alt="Marketplace Hero"
            className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-[4000ms]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />

          <div className="absolute inset-0 flex flex-col items-start justify-center p-16 lg:p-24 text-white">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-orange-500 text-white px-5 py-2 font-black text-xs uppercase tracking-widest shadow-xl flex items-center gap-2 rounded-lg">
                <Key className="w-4 h-4" /> VERIFIED SELLER
              </div>
              <span className="text-xs font-black uppercase tracking-[0.3em] text-white/70">DIGITAL MARKETPLACE</span>
            </div>

            <h1 className="text-8xl font-black uppercase tracking-tighter mb-6 leading-[0.85] drop-shadow-2xl">
              {data.name}
            </h1>
            <p className="text-2xl font-bold uppercase mb-12 text-stone-200 max-w-xl leading-snug tracking-tight drop-shadow-md">
              {data.description}
            </p>

            <div className="flex flex-wrap gap-6 pt-4">
              <button className="bg-orange-500 text-white px-14 py-5 rounded-2xl font-black uppercase italic text-xl hover:bg-white hover:text-black transition-all transform hover:-translate-y-2 shadow-2xl">
                Shop Marketplace
              </button>
              <div className="flex items-center gap-6 px-10 py-5 bg-black/40 backdrop-blur-md rounded-2xl border border-white/20">
                <ShieldCheck className="w-8 h-8 text-orange-500" />
                <div>
                  <div className="text-sm font-black uppercase tracking-wider">SECURE ESCROW</div>
                  <div className="text-[10px] font-bold text-white/50 uppercase tracking-widest uppercase">100% AUTHENTIC KEYS</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Multi-Source Grid */}
        <section className="mb-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8 border-b-[6px] border-stone-200 pb-10">
            <div className="space-y-4">
              <h2 className="text-6xl font-black uppercase tracking-tighter flex items-center gap-5 leading-none">
                <Gamepad2 className="w-14 h-14 text-orange-500" /> TRENDING KEYS
              </h2>
              <p className="text-stone-400 font-bold uppercase text-xs tracking-[0.4em]">Hand-picked digital offers from verified sellers</p>
            </div>

            {/* Marketplace Filters */}
            <div className="flex flex-wrap gap-4">
              {['Bestsellers', 'New Releases', 'Game Keys', 'Software', 'Gift Cards'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all ${activeTab === tab ? 'bg-black text-white shadow-xl scale-105' : 'bg-white text-stone-400 border border-stone-200 hover:border-orange-500 hover:text-orange-500'
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {data.products.map(product => (
              <div key={product.id} data-product-id={product.id} className="group cursor-pointer flex flex-col bg-white border border-stone-100 rounded-[2rem] overflow-hidden hover:border-orange-500 hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-2">
                <div className="relative aspect-video overflow-hidden bg-black">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-all duration-700 opacity-90 group-hover:opacity-100"
                  />

                  {/* Seller Verified Badge */}
                  <div className="absolute top-4 left-4">
                    <div className="bg-black/60 backdrop-blur-md text-white text-[9px] font-black uppercase px-4 py-1.5 rounded-lg flex items-center gap-2 border border-white/20">
                      <ShieldCheck className="w-3.5 h-3.5 text-green-500" /> VERIFIED
                    </div>
                  </div>

                  {/* Discount Tag */}
                  {product.originalPrice && (
                    <div className="absolute bottom-4 left-4 bg-orange-600 text-white text-[12px] font-black px-4 py-1.5 rounded-lg shadow-xl">
                      -{Math.round((1 - Number(product.price) / Number(product.originalPrice)) * 100)}%
                    </div>
                  )}

                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" />
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col">
                  <div className="flex justify-between items-start">
                    <div className="text-[10px] font-black uppercase tracking-widest text-orange-500">
                      {product.category}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-stone-400" />
                      <span className="text-[10px] font-black text-stone-400">GLOBAL</span>
                    </div>
                  </div>

                  <h3 className="font-black uppercase text-stone-900 text-sm leading-tight line-clamp-2 min-h-[2.8rem] group-hover:text-orange-500 transition-colors">
                    {product.title}
                  </h3>

                  <div className="pt-4 flex items-end justify-between border-t border-stone-50 mt-auto">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Starting at</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-black tracking-tighter text-black">${product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-stone-300 line-through font-bold">${product.originalPrice}</span>
                        )}
                      </div>
                    </div>
                    <div className="bg-orange-500 p-3 rounded-xl hover:bg-black transition-all">
                      <ShoppingCart className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Marketplace Assurance System */}
        <section className="bg-white rounded-[3rem] border-2 border-stone-100 p-12 lg:p-20 mb-24 relative overflow-hidden group shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 text-center">
            <div className="space-y-6">
              <div className="w-20 h-20 bg-orange-50 rounded-[2rem] flex items-center justify-center mx-auto transform group-hover:rotate-12 transition-transform shadow-lg">
                <ShieldCheck className="w-10 h-10 text-orange-500" />
              </div>
              <h4 className="text-xl font-black uppercase tracking-tighter">KeyMarket DIRECT</h4>
              <p className="text-stone-400 font-bold uppercase text-[11px] leading-relaxed tracking-widest px-4">Buy directly from key developers and publishers.</p>
            </div>

            <div className="space-y-6">
              <div className="w-20 h-20 bg-green-50 rounded-[2rem] flex items-center justify-center mx-auto transform group-hover:-rotate-12 transition-transform shadow-lg">
                <Lock className="w-10 h-10 text-green-500" />
              </div>
              <h4 className="text-xl font-black uppercase tracking-tighter">ESCROW SECURITY</h4>
              <p className="text-stone-400 font-bold uppercase text-[11px] leading-relaxed tracking-widest px-4">Funds released only after successful key activation.</p>
            </div>

            <div className="space-y-6">
              <div className="w-20 h-20 bg-blue-50 rounded-[2rem] flex items-center justify-center mx-auto transform group-hover:rotate-12 transition-transform shadow-lg">
                <Zap className="w-10 h-10 text-blue-500" />
              </div>
              <h4 className="text-xl font-black uppercase tracking-tighter">FAST-KEY SYSTEM</h4>
              <p className="text-stone-400 font-bold uppercase text-[11px] leading-relaxed tracking-widest px-4">Guaranteed instant email delivery on all orders.</p>
            </div>

            <div className="space-y-6">
              <div className="w-20 h-20 bg-purple-50 rounded-[2rem] flex items-center justify-center mx-auto transform group-hover:-rotate-12 transition-transform shadow-lg">
                <Star className="w-10 h-10 text-purple-500" />
              </div>
              <h4 className="text-xl font-black uppercase tracking-tighter">20M+ USERS</h4>
              <p className="text-stone-400 font-bold uppercase text-[11px] leading-relaxed tracking-widest px-4">The world's largest digital gaming marketplace.</p>
            </div>
          </div>
        </section>

        {/* KeyMarket Plus - Gaming Subscription Experience */}
        <section className="mb-24">
          <div className="bg-gradient-to-br from-stone-900 via-stone-950 to-black rounded-[4rem] overflow-hidden relative shadow-[0_60px_120px_-30px_rgba(0,0,0,0.8)] border border-white/10 group">
            {/* Holographic Mesh Overlay */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cyber-glow.png')] pointer-events-none" />

            <div className="relative z-10 p-12 lg:p-24 flex flex-col lg:flex-row items-center justify-between gap-16">
              <div className="flex-1 space-y-12">
                <div className="inline-flex items-center gap-4 bg-orange-500 text-white px-8 py-3 rounded-full text-xs font-black uppercase tracking-[0.2em] shadow-2xl">
                  <Zap className="w-5 h-5 fill-white animate-pulse" /> UNLOCK PREMIUM GAMING
                </div>

                <h2 className="text-8xl font-black uppercase tracking-tighter text-white leading-[0.85]">
                  KeyMarket PLUS<br /><span className="text-orange-500">MAXIMIZE SAVINGS.</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl">
                  {[
                    { title: 'Extra 10% Off', desc: 'Additional stackable discount on all marketplace keys.', icon: Wallet },
                    { title: 'Free Monthly Game', desc: 'Claim a premium digital title every single month.', icon: Gift },
                    { title: 'Priority KeyMarket Support', desc: 'Jump the queue with 24/7 elite customer care.', icon: User },
                    { title: 'Golden Loot Boxes', desc: 'Exclusive access to high-tier digital loot packs.', icon: ShieldCheck },
                  ].map((benefit, i) => (
                    <div key={i} className="flex gap-6 p-8 bg-white/5 rounded-3xl border border-white/10 hover:border-orange-500 transition-all group/benefit cursor-default">
                      <div className="w-14 h-14 rounded-2xl bg-orange-500 flex items-center justify-center shadow-2xl shrink-0">
                        <benefit.icon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h4 className="font-black uppercase text-white text-lg tracking-tight mb-2">{benefit.title}</h4>
                        <p className="text-stone-500 text-[11px] font-bold uppercase tracking-widest leading-relaxed">{benefit.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-8 pt-8">
                  <button className="bg-orange-500 text-white px-16 py-6 rounded-2xl font-black uppercase italic text-xl hover:bg-white hover:text-black transition-all transform hover:-translate-y-2 shadow-[0_25px_50px_rgba(255,128,0,0.3)]">
                    Join KeyMarket Plus
                  </button>
                  <div className="flex flex-col justify-center">
                    <div className="text-white font-black text-2xl leading-none">$2.99<span className="text-sm font-bold text-stone-500 ml-2 uppercase">/Month</span></div>
                    <div className="text-orange-500 text-[10px] font-black uppercase tracking-widest mt-2 underline cursor-pointer">Start 7-Day Free Trial</div>
                  </div>
                </div>
              </div>

              {/* Loot Box Visualizer */}
              <div className="relative hidden lg:block">
                <div className="w-[450px] h-[450px] bg-orange-500/20 rounded-full blur-[100px] animate-pulse absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                <div className="relative z-10 w-[400px] h-[500px] bg-gradient-to-t from-stone-900 to-stone-800 rounded-[4rem] border border-white/10 shadow-3xl p-12 flex flex-col justify-between overflow-hidden group/box">
                  <div className="absolute inset-0 bg-stone-900 opacity-0 group-hover/box:opacity-100 transition-opacity duration-1000 bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')]" />

                  <div className="relative z-10 flex justify-between items-start">
                    <div className="w-12 h-12 rounded-2xl bg-black border border-orange-500/50 flex items-center justify-center">
                      <Zap className="w-6 h-6 text-orange-500" />
                    </div>
                    <div className="text-right">
                      <div className="text-stone-500 text-[10px] font-black uppercase tracking-widest mb-1">Status</div>
                      <div className="text-green-500 font-black uppercase italic tracking-tighter">ELITE SUBSCRIBER</div>
                    </div>
                  </div>

                  <div className="relative z-10 space-y-8">
                    <div className="flex flex-col items-center">
                      <Gift className="w-24 h-24 text-orange-500 mb-6 animate-bounce" />
                      <h3 className="text-white font-black text-3xl uppercase tracking-tighter text-center leading-none">MONTHLY LOOT UNLOCKED</h3>
                    </div>
                    <button className="w-full bg-orange-500 text-white py-5 rounded-2xl font-black uppercase text-sm tracking-widest shadow-2xl">
                      Claim Free Game
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Global Deals Pulse */}
        <section className="mb-24">
          <div className="flex items-center justify-between mb-12 border-b-[8px] border-black pb-8">
            <h2 className="text-5xl font-black uppercase tracking-tighter flex items-center gap-5 leading-none">
              <Zap className="w-12 h-12 text-orange-500 fill-orange-500" /> FLASH OFFERS
            </h2>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4 bg-red-100 px-6 py-3 rounded-2xl border border-red-200">
                <Clock className="w-5 h-5 text-red-600 animate-pulse" />
                <span className="text-xl font-black text-red-600 tracking-tighter">{timer}</span>
              </div>
              <button className="text-orange-500 font-black uppercase text-[11px] tracking-widest hover:underline">View All Deals</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { id: 1, title: 'Windows 11 Pro', price: '$9.99', discount: '-85%', desc: 'Official OEM Lifecycle Activation Key', img: 'https://images.unsplash.com/photo-1633419461186-7d40a38105ec?auto=format&fit=crop&q=80' },
              { id: 2, title: 'Office 2021 Plus', price: '$12.50', discount: '-90%', desc: 'Unlimited Professional Lifetime Access', img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80' },
              { id: 3, title: 'Game Gift Card $50', price: '$44.99', discount: '-10%', desc: 'Instant Reload for your Game Wallet', img: 'https://images.unsplash.com/photo-1594122230689-45899d9e6f69?auto=format&fit=crop&q=80' },
            ].map((deal) => (
              <div key={deal.id} className="relative group cursor-pointer bg-white rounded-[3rem] overflow-hidden border border-stone-200 hover:shadow-3xl transition-all duration-700">
                <div className="relative h-64 overflow-hidden">
                  <img src={deal.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3000ms]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-6 right-6 bg-red-600 text-white font-black text-xl px-4 py-2 rounded-2xl shadow-2xl">
                    {deal.discount}
                  </div>
                </div>
                <div className="p-10 space-y-6">
                  <div>
                    <h4 className="text-2xl font-black uppercase tracking-tight text-stone-900 mb-2">{deal.title}</h4>
                    <p className="text-stone-400 font-bold uppercase text-[10px] tracking-widest">{deal.desc}</p>
                  </div>
                  <div className="flex items-center justify-between border-t border-stone-100 pt-6">
                    <span className="text-4xl font-black tracking-tighter text-black">{deal.price}</span>
                    <button className="bg-black text-white px-8 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-orange-500 transition-colors">
                      Grab Deal
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-stone-950 text-white pt-32 pb-16 border-t-[16px] border-orange-500">
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-32">
            <div className="space-y-12">
              <div className="flex flex-col items-start group cursor-pointer">
                <span className="font-black text-5xl tracking-tighter uppercase leading-none text-orange-500">
                  KeyMarket<span className="text-white group-hover:text-orange-500 transition-colors">.COM</span>
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-stone-600 mt-4 leading-none">THE WORLD'S GAMING MARKETPLACE</span>
              </div>
              <p className="text-stone-500 font-bold uppercase text-[11px] leading-relaxed max-w-xs tracking-widest">
                Connecting millions of buyers and sellers across a global digital ecosystem of games, software, and gift cards.
              </p>
              <div className="flex gap-4">
                {[Facebook, Twitter, Instagram, Youtube, Twitch].map((Icon, i) => (
                  <a key={i} href="#" className="w-12 h-12 bg-stone-900 rounded-2xl flex items-center justify-center hover:bg-orange-500 transition-all shadow-2xl group">
                    <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-10">
              <h4 className="text-orange-500 font-black uppercase text-lg tracking-widest border-l-4 border-orange-500 pl-4">Marketplace</h4>
              <nav className="flex flex-col gap-6 text-[11px] font-black uppercase tracking-[0.2em] text-stone-400">
                {['Direct for Devs', 'Best Sellers', 'Subscription Deals', 'Escrow Security', 'Verification System', 'Sell With Us'].map(l => (
                  <a key={l} href="#" className="hover:text-white transition-colors flex items-center gap-3 group">
                    <div className="w-1.5 h-1.5 bg-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {l}
                  </a>
                ))}
              </nav>
            </div>

            <div className="space-y-10">
              <h4 className="text-orange-500 font-black uppercase text-lg tracking-widest border-l-4 border-orange-500 pl-4">Safety & Support</h4>
              <nav className="flex flex-col gap-6 text-[11px] font-black uppercase tracking-[0.2em] text-stone-400">
                {['Support Hub', 'KeyMarket Shield', 'Fraud Prevention', 'Contact Support', 'Privacy Policy', 'Cookie Settings'].map(l => (
                  <a key={l} href="#" className="hover:text-white transition-colors flex items-center gap-3 group">
                    <div className="w-1.5 h-1.5 bg-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {l}
                  </a>
                ))}
              </nav>
            </div>

            <div className="space-y-10">
              <h4 className="text-orange-500 font-black uppercase text-lg tracking-widest border-l-4 border-orange-500 pl-4">Digital Pulse</h4>
              <p className="text-stone-500 font-bold uppercase text-[11px] leading-relaxed tracking-widest">
                Get notified when your wishlist items go on sale in the marketplace.
              </p>
              <div className="space-y-6">
                <div className="relative group">
                  <input
                    type="email"
                    placeholder="PLAYER@DOMAIN.COM"
                    className="w-full bg-stone-900 border-b-2 border-stone-800 py-4 px-2 text-[11px] font-black outline-none focus:border-orange-500 transition-colors uppercase tracking-[0.3em]"
                  />
                  <button className="absolute right-0 bottom-4 text-orange-500 hover:text-white transition-colors">
                    <ArrowRight className="w-6 h-6" />
                  </button>
                </div>
                <div className="flex items-center gap-6 py-6 px-8 bg-orange-500/10 rounded-3xl border border-orange-500/20">
                  <Monitor className="w-8 h-8 text-orange-500" />
                  <div>
                    <h5 className="text-[10px] font-black uppercase">Marketplace App</h5>
                    <p className="text-[9px] font-bold text-stone-500 uppercase tracking-widest mt-2">Mobile Marketplace</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-center pt-20 border-t border-stone-900 gap-12 text-[10px] font-black uppercase tracking-[0.4em] text-stone-600">
            <div className="flex flex-col gap-2">
              <p>© 2026 KeyMarket.COM. ALL RIGHTS RESERVED WORLDWIDE.</p>
              <p className="opacity-40 uppercase tracking-normal">KeyMarket is a registered trademark of KeyMarket.COM Limited.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-10">
              <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
              <a href="#" className="hover:text-white transition-colors">Seller Policies</a>
              <a href="#" className="hover:text-white transition-colors">Compliance</a>
              <a href="#" className="hover:text-white transition-colors">Accessibility</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
