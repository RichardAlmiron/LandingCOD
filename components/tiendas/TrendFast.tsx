'use client';

import React, { useState } from 'react';
import { StoreData, Product } from '@/lib/types';
import { useCart } from '@/contexts/CartContext';
import { Search, ShoppingBag, Heart, User, Globe, ChevronRight, Gift, Camera, ShoppingCart, Percent, RotateCcw, Truck, Menu, X } from 'lucide-react';
import { usePagination, ProductPagination } from '@/components/componentes-compartidos/templates/Pagination';

export default function TrendFastTemplate({ data }: { data: StoreData }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { addToCart: addToCartContext, itemCount, setIsCartOpen } = useCart();
  const [wishlist, setWishlist] = useState<string[]>([]);
  
  const itemsPerPage = 15; // 3 rows x 5 columns
  const {
    currentPage,
    totalPages,
    paginatedItems,
    handlePageChange,
    totalItems,
  } = usePagination(data.products, itemsPerPage);

  const handleAddToCart = (product: Product, e?: React.MouseEvent) => { if (e) e.stopPropagation(); addToCartContext(product); };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };
  return (
    <div className="min-h-full bg-white font-sans text-[#222] overflow-x-hidden">

      {/* ─── PROMO BAR ─── */}
      <div className="bg-[#222] text-white text-[12px] h-[40px] flex items-center justify-center font-bold tracking-widest uppercase px-4 text-center cursor-pointer hover:underline transition-all">
        Envío Gratis En Pedidos Superiores A $49.00
      </div>

      {/* ─── HEADER ─── */}
      <header className="border-b border-gray-200 sticky top-0 bg-white z-50">
        <div className="w-full max-w-[1440px] mx-auto">

          {/* Top Header Row */}
          <div className="px-4 lg:px-8 h-[60px] md:h-[80px] flex items-center justify-between">
            {/* Logo */}
            <div className="font-black text-[28px] md:text-[36px] tracking-tighter uppercase shrink-0 cursor-pointer">
              {data.logoText}
            </div>

            {/* Search Bar (Centered on Desktop) */}
            <div className="hidden md:flex flex-1 max-w-[500px] mx-8 relative group">
              <input
                type="text"
                placeholder="vestidos de verano"
                className="w-full h-[40px] bg-[#f5f5f5] rounded-full pl-5 pr-12 text-[14px] outline-none group-hover:bg-[#ebebeb] focus:bg-white focus:border focus:border-black transition-colors"
              />
              <button className="absolute right-0 top-0 h-[40px] w-[46px] flex items-center justify-center text-[#222] hover:text-[#fa6338] transition-colors rounded-r-full">
                <Search className="w-[18px] h-[18px]" strokeWidth={2.5} />
              </button>
            </div>

            {/* Icons Right */}
            <div className="flex items-center space-x-4 md:space-x-6 shrink-0">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-1"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <User className="w-[22px] h-[22px] md:w-[26px] md:h-[26px] hover:text-[#fa6338] cursor-pointer transition-colors" strokeWidth={1.5} />
              <div className="relative cursor-pointer hover:text-[#fa6338] transition-colors">
                <Heart className="w-[22px] h-[22px] md:w-[26px] md:h-[26px]" strokeWidth={1.5} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[#fa6338] text-white text-[10px] font-bold w-[16px] h-[16px] flex items-center justify-center rounded-full leading-none">{wishlist.length}</span>
                )}
              </div>
              <div 
                onClick={() => setIsCartOpen(true)}
                className="relative cursor-pointer hover:text-[#fa6338] transition-colors hidden md:block"
              >
                <ShoppingBag className="w-[22px] h-[22px] md:w-[26px] md:h-[26px]" strokeWidth={1.5} />
                {itemCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[#fa6338] text-white text-[10px] font-bold w-[16px] h-[16px] flex items-center justify-center rounded-full leading-none">{itemCount}</span>
                )}
              </div>
              <Globe className="w-[22px] h-[22px] md:w-[26px] md:h-[26px] hover:text-[#fa6338] cursor-pointer transition-colors hidden lg:block" strokeWidth={1.5} />
            </div>
          </div>

          {/* Bottom Header Row (Navigation) */}
          <div className="px-4 lg:px-8 h-[44px] hidden lg:flex items-center justify-between border-t border-gray-100">
            <nav className="flex space-x-8 font-bold text-[14px] uppercase h-full">
              <a href="#" className="h-full flex items-center border-b-[3px] border-[#222] text-[#222]">Mujer</a>
              <a href="#" className="h-full flex items-center border-b-[3px] border-transparent text-gray-500 hover:text-[#222] hover:border-black transition-all">Curve+Plus</a>
              <a href="#" className="h-full flex items-center border-b-[3px] border-transparent text-gray-500 hover:text-[#222] hover:border-black transition-all">Niños</a>
              <a href="#" className="h-full flex items-center border-b-[3px] border-transparent text-gray-500 hover:text-[#222] hover:border-black transition-all">Hombre</a>
              <a href="#" className="h-full flex items-center border-b-[3px] border-transparent text-gray-500 hover:text-[#222] hover:border-black transition-all">Hogar</a>
              <a href="#" className="h-full flex items-center border-b-[3px] border-transparent text-gray-500 hover:text-[#222] hover:border-black transition-all">Belleza</a>
            </nav>
            <div className="text-[12px] font-bold text-[#fa6338] cursor-pointer hover:underline flex items-center">
              <Percent className="w-4 h-4 mr-1" />
              Ver Todas las Ofertas
            </div>
          </div>
        </div>

        {/* Mobile Search Bar (Only shown on mobile) */}
        <div className="md:hidden px-4 pb-3 border-t border-gray-100 pt-2 flex items-center justify-between">
          <div className="flex-1 relative">
            <input type="text" placeholder="Buscar..." className="w-full bg-[#f5f5f5] rounded-full pl-4 pr-10 py-1.5 text-[14px] outline-none" />
            <Search className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2" />
          </div>
          <div 
            onClick={() => setIsCartOpen(true)}
            className="relative ml-4"
          >
            <ShoppingBag className="w-6 h-6" strokeWidth={1.5} />
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#fa6338] text-white text-[10px] font-bold w-[16px] h-[16px] flex items-center justify-center rounded-full leading-none">{itemCount}</span>
            )}
          </div>
        </div>
      </header>

      {/* ─── MAIN CONTENT ─── */}
      <main className="w-full max-w-[1440px] mx-auto px-4 lg:px-8 py-4 md:py-8">

        {/* Value Props Row (TrendFast Style) */}
        <div className="hidden md:flex justify-between items-center bg-[#f5f5f5] py-3 px-8 rounded-sm mb-6 text-[13px] font-bold uppercase tracking-wider text-[#222]">
          <span className="flex items-center gap-2"><Truck className="w-5 h-5" /> Envío Estándar Gratis</span>
          <span className="flex items-center gap-2"><RotateCcw className="w-5 h-5" /> Devolución Fácil de 30 Días</span>
          <span className="flex items-center gap-2"><Gift className="w-5 h-5" /> 10% Dto. Extra en 1er Pedido</span>
        </div>

        {/* Hero Banner Grid (Masia Image with 2 side images on desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-12">
          <div className="lg:col-span-3 relative h-[300px] sm:h-[400px] md:h-[500px] cursor-pointer group overflow-hidden">
            <img src={data.bannerImage} alt="TrendFast Banner Hero" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[800ms] ease-out" />
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute bottom-8 left-8 md:bottom-16 md:left-16 text-white max-w-lg">
              <div className="bg-[#fa6338] text-white text-[12px] font-bold px-2 py-0.5 inline-block mb-2 uppercase tracking-widest">Nueva Colección</div>
              <h2 className="text-[36px] md:text-[56px] font-black uppercase leading-[0.9] tracking-tighter mb-4 drop-shadow-md">
                {data.description || 'ESTILO 2026'}
              </h2>
              <button className="bg-white text-[#222] px-10 py-3.5 font-bold uppercase text-[14px] hover:bg-black hover:text-white transition-colors duration-300">
                Comprar Ahora
              </button>
            </div>
          </div>

          <div className="hidden lg:flex flex-col gap-4">
            <div className="flex-1 relative cursor-pointer group overflow-hidden bg-gray-100">
              <img src={data.products[0]?.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 mix-blend-multiply" />
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 py-2 text-center uppercase font-bold text-[12px]">Top Picks</div>
            </div>
            <div className="flex-1 relative cursor-pointer group overflow-hidden bg-gray-100">
              <img src={data.products[1]?.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 mix-blend-multiply" />
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 py-2 text-center uppercase font-bold text-[12px]">Básicos</div>
            </div>
          </div>
        </div>

        {/* Categories Bubbles */}
        <div className="mb-14">
          <h3 className="text-[20px] font-black uppercase text-center mb-8 tracking-wide">Comprar por Categoría</h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-6 px-2">
            {['Vestidos', 'Tops', 'Prendas de Baño', 'Zapatos', 'Accesorios', 'Denim'].map((cat, i) => (
              <div key={cat} className="flex flex-col items-center group cursor-pointer">
                <div className="w-full aspect-square rounded-full overflow-hidden mb-3 bg-[#f5f5f5] relative shadow-sm border border-transparent group-hover:border-[#222] transition-colors p-1">
                  <div className="w-full h-full rounded-full overflow-hidden">
                    <img src={data.products[i % data.products.length]?.imageUrl} alt={cat} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 mix-blend-multiply" />
                  </div>
                </div>
                <span className="text-[13px] font-bold uppercase text-center group-hover:text-[#fa6338] transition-colors">{cat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Flash Sale Bar & Grid */}
        <div className="mb-14">
          <div className="flex flex-col md:flex-row items-center justify-between mb-6 pb-2 border-b border-[#222]">
            <div className="flex items-center gap-4 mb-2 md:mb-0">
              <h3 className="text-[24px] font-black uppercase italic tracking-tighter">Venta Flash</h3>
              <div className="flex items-center gap-2 bg-[#222] text-white px-3 py-1 text-[13px] font-bold">
                <span className="tabular-nums">05 : 23 : 41</span>
              </div>
            </div>
            <a href="#" className="text-[13px] font-bold uppercase hover:underline flex items-center">
              Ver más <ChevronRight className="w-4 h-4 ml-1" />
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
            {data.products.slice(0, 6).map((product, i) => (
              <div key={`flash-${i}`} className="group cursor-pointer relative flex flex-col" data-product-id={product.id} data-discount={product.discount || 0}>
                {product.discount && product.discount > 0 && (
                  <div className="absolute top-2 left-0 bg-[#fa6338] text-white text-[11px] font-bold px-2 py-0.5 z-10 lowercase">
                    -{product.discount}%
                  </div>
                )}
                <div className="relative aspect-[3/4] mb-2 overflow-hidden bg-[#f5f5f5] rounded-sm">
                  <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[600ms] mix-blend-multiply" />

                  {/* TrendFast Quick Add Overlay */}
                  <div className="absolute bottom-0 left-0 w-full bg-white/95 py-[10px] translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex justify-center shadow-[0_-2px_10px_rgba(0,0,0,0.05)] opacity-0 group-hover:opacity-100">
                    <button className="text-[12px] font-bold uppercase hover:text-[#fa6338] transition-colors">Añadir a la bolsa</button>
                  </div>
                </div>

                <div className="flex-1 flex flex-col px-1">
                  <div className="flex items-baseline gap-1.5 mb-[2px]">
                    <span className="font-bold text-[16px] text-[#fa6338]">${product.price}</span>
                    <span className="text-[12px] text-gray-400 line-through">${product.originalPrice}</span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-[#f2f2f2] h-[5px] rounded-full mt-1 overflow-hidden relative mb-1">
                    <div className="bg-[#fa6338] h-full rounded-full" style={{ width: '45%' }}></div>
                  </div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold mb-2">{product.reviews || 25} Vendidos</div>

                  <h4 className="text-[12px] text-gray-500 line-clamp-1 leading-tight hover:underline cursor-pointer">{product.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* VIP / Daily Check-in Large Banner */}
        <div className="bg-[#fa6338] text-white rounded-[2px] p-6 md:p-10 mb-14 flex flex-col md:flex-row items-center justify-between shadow-xl relative overflow-hidden">
          {/* Abstract background shapes */}
          <div className="absolute -right-20 -top-20 w-64 h-64 border-[40px] border-white/10 rounded-full"></div>
          <div className="absolute right-40 -bottom-20 w-40 h-40 border-[20px] border-white/10 rounded-full"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 mb-6 md:mb-0 text-center md:text-left">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-white text-[#fa6338] rounded-full flex items-center justify-center shadow-lg">
              <Gift className="w-8 h-8 md:w-10 md:h-10" />
            </div>
            <div>
              <h3 className="font-black uppercase text-[24px] md:text-[32px] leading-tight tracking-tighter shadow-sm">Check-in Diario</h3>
              <p className="text-[15px] font-medium text-white/90">Gana puntos todos los días y obtén descuentos de hasta 70%.</p>
            </div>
          </div>
          <button className="relative z-10 bg-white text-[#fa6338] px-10 py-4 font-black uppercase text-[15px] shadow-[0_4px_14px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.2)] hover:scale-105 transition-all active:scale-95 duration-200">
            Hacer Check-in
          </button>
        </div>

        {/* ─── Trending Looks - Editorial Grid ─── */}
        <div className="mb-14">
          <h3 className="text-[20px] font-black uppercase text-center mb-8 tracking-wide">Looks del Momento</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Casual Chic', color: 'from-rose-400 to-pink-500' },
              { label: 'Street Style', color: 'from-violet-400 to-purple-500' },
              { label: 'Office Ready', color: 'from-sky-400 to-blue-500' },
              { label: 'Weekend Vibes', color: 'from-amber-400 to-orange-500' },
            ].map((look, i) => (
              <div key={`look-${i}`} className="relative aspect-[3/4] rounded-sm overflow-hidden cursor-pointer group">
                <div className="absolute inset-0 bg-[#f5f5f5] flex items-center justify-center p-4">
                  {data.products[i + 2] && (
                    <img src={data.products[i + 2].imageUrl} alt={look.label} className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
                  )}
                </div>
                <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t ${look.color} to-transparent h-1/3 flex items-end p-4`}>
                  <div>
                    <span className="text-white font-black uppercase text-[14px] drop-shadow-md">{look.label}</span>
                    <div className="text-white/80 text-[11px] font-medium mt-0.5">{12 + i * 3} artículos</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── New Arrivals - Horizontal Scroll ─── */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-3">
            <div className="flex items-center gap-3">
              <h3 className="text-[20px] font-black uppercase tracking-wide">Recién Llegados</h3>
              <span className="bg-[#fa6338] text-white text-[11px] font-bold px-2 py-0.5 rounded-sm uppercase">Nuevo</span>
            </div>
            <a href="#" className="text-[13px] font-bold uppercase hover:underline flex items-center text-gray-600 hover:text-[#fa6338]">
              Ver todo <ChevronRight className="w-4 h-4 ml-1" />
            </a>
          </div>
          <div className="flex overflow-x-auto space-x-4 pb-2 [&::-webkit-scrollbar]:hidden">
            {data.products.slice(0, 6).map((p, i) => (
              <div key={`newarr-${i}`} data-product-id={p.id} className="shrink-0 w-[160px] cursor-pointer group">
                <div className="relative aspect-[3/4] mb-2 overflow-hidden bg-[#f5f5f5] rounded-sm">
                  <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-2 left-2 bg-white/90 text-[10px] font-bold uppercase px-2 py-0.5 rounded-sm text-[#fa6338]">New</div>
                </div>
                <h4 className="text-[12px] text-gray-600 line-clamp-1 mb-1">{p.title}</h4>
                <span className="text-[14px] font-bold text-[#222]">${Math.floor(p.price).toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Product Grid WITH PAGINATION (3x5 = 15 products) */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-[20px] font-black uppercase tracking-wide">Recomendado para ti</h3>
            <span className="text-sm text-gray-500">{totalItems} productos</span>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-x-3 gap-y-8">
            {paginatedItems.map((product, idx) => (
              <div key={`trendfast-${idx}-${product.id}`} data-product-id={product.id} className="group cursor-pointer flex flex-col">
                <div className="relative aspect-[3/4] mb-3 overflow-hidden bg-[#f5f5f5] rounded-sm group-hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-shadow">
                  <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 mix-blend-multiply" />

                  {/* Floating Like Button */}
                  <button 
                    onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
                    className="absolute top-2 right-2 bg-white/80 backdrop-blur w-8 h-8 flex items-center justify-center rounded-full hover:text-[#fa6338] transition-colors"
                  >
                    <Heart className={`w-4 h-4 ${wishlist.includes(product.id) ? 'fill-[#fa6338] text-[#fa6338]' : 'text-[#222]'}`} />
                  </button>

                  <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur py-[10px] px-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex justify-center shadow-[0_-2px_6px_rgba(0,0,0,0.03)] border-t border-gray-100">
                    <button 
                      onClick={(e) => handleAddToCart(product, e)}
                      className="text-[12px] font-bold uppercase hover:text-[#fa6338] transition-colors flex items-center justify-center gap-1.5 w-full"
                    >
                      <ShoppingCart className="w-[14px] h-[14px]" />
                      Añadir
                    </button>
                  </div>
                </div>

                <h4 className="text-[13px] text-gray-700 line-clamp-1 mb-1.5 px-1 hover:underline">{product.title}</h4>

                <div className="flex items-center gap-2 px-1 mb-1">
                  <span className="font-bold text-[16px] text-[#222]">${product.price}</span>
                  {product.originalPrice && <span className="text-[12px] text-gray-400 line-through">${product.originalPrice}</span>}
                </div>

                {/* Reviews block */}
                {product.reviews && product.reviews > 0 && (
                  <div className="flex items-center gap-1 text-[11px] text-gray-500 px-1 mt-auto">
                    <span className="flex text-[#222]">
                      ★★★★<span className="text-gray-300">★</span>
                    </span>
                    <span>({product.reviews} Revisiones)</span>
                  </div>
                )}
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

        {/* ─── Style Inspiration - Editorial Banner ─── */}
        <div className="mb-14 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#f5efe6] rounded-sm p-8 flex flex-col justify-between h-[250px] cursor-pointer group">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#999] mb-2 block">Colección</span>
              <h3 className="text-[24px] font-black uppercase leading-tight">Esenciales<br/>de Otoño</h3>
            </div>
            <span className="text-[13px] font-bold uppercase text-[#222] group-hover:text-[#fa6338] transition-colors">Comprar ahora →</span>
          </div>
          <div className="bg-[#222] rounded-sm p-8 flex flex-col justify-between h-[250px] cursor-pointer group text-white">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-2 block">Exclusivo</span>
              <h3 className="text-[24px] font-black uppercase leading-tight">Street<br/>Culture</h3>
            </div>
            <span className="text-[13px] font-bold uppercase group-hover:text-[#fa6338] transition-colors">Descubrir →</span>
          </div>
        </div>

        {/* ─── Best Sellers - Horizontal Scroll ─── */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-3">
            <h3 className="text-[20px] font-black uppercase tracking-wide">Los Más Vendidos</h3>
            <a href="#" className="text-[13px] font-bold text-[#fa6338] hover:underline uppercase">Ver todos</a>
          </div>
          <div className="flex overflow-x-auto space-x-4 pb-2 [&::-webkit-scrollbar]:hidden">
            {data.products.slice(0, 6).map((p, i) => (
              <div key={`bs-tf-${i}`} className="shrink-0 w-[180px] cursor-pointer group">
                <div className="relative h-[220px] bg-[#f7f7f7] flex items-center justify-center p-3 mb-2 overflow-hidden">
                  <img src={p.imageUrl} alt={p.title} className="max-h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-2 left-2 bg-[#222] text-white text-[10px] font-bold px-2 py-1 rounded-sm">#{i + 1}</div>
                </div>
                <h4 className="text-[12px] font-bold text-[#222] line-clamp-1 mb-1">{p.title}</h4>
                <span className="text-[14px] font-black text-[#fa6338]">{p.currency || 'Gs.'} {Math.floor(p.price).toLocaleString('es-PY')}</span>
              </div>
            ))}
          </div>
        </div>

      </main>

      {/* ─── FOOTER ─── */}
      <footer className="bg-[#fafafa] pt-16 pb-8 border-t border-gray-200 mt-10">
        <div className="w-full max-w-[1440px] mx-auto px-4 lg:px-8">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-6 mb-12">
            <div>
              <h4 className="font-black uppercase mb-6 text-[14px] tracking-wider">Información de la Empresa</h4>
              <div className="flex flex-col space-y-4 text-[13px] text-gray-600 font-medium">
                <a href="#" className="hover:text-black hover:underline hover:translate-x-1 transition-transform w-fit">Sobre {data.name}</a>
                <a href="#" className="hover:text-black hover:underline hover:translate-x-1 transition-transform w-fit">Responsabilidad Social</a>
                <a href="#" className="hover:text-black hover:underline hover:translate-x-1 transition-transform w-fit">Afiliados</a>
                <a href="#" className="hover:text-black hover:underline hover:translate-x-1 transition-transform w-fit">Blog de Moda</a>
                <a href="#" className="hover:text-black hover:underline hover:translate-x-1 transition-transform w-fit">Inversores</a>
              </div>
            </div>

            <div>
              <h4 className="font-black uppercase mb-6 text-[14px] tracking-wider">Ayuda y Soporte</h4>
              <div className="flex flex-col space-y-4 text-[13px] text-gray-600 font-medium">
                <a href="#" className="hover:text-black hover:underline hover:translate-x-1 transition-transform w-fit">Información de Envío</a>
                <a href="#" className="hover:text-black hover:underline hover:translate-x-1 transition-transform w-fit">Devoluciones</a>
                <a href="#" className="hover:text-black hover:underline hover:translate-x-1 transition-transform w-fit">Cómo Pedir</a>
                <a href="#" className="hover:text-black hover:underline hover:translate-x-1 transition-transform w-fit">Rastrear Pedido</a>
                <a href="#" className="hover:text-black hover:underline hover:translate-x-1 transition-transform w-fit">Guía de Tallas</a>
              </div>
            </div>

            <div>
              <h4 className="font-black uppercase mb-6 text-[14px] tracking-wider">Atención al Cliente</h4>
              <div className="flex flex-col space-y-4 text-[13px] text-gray-600 font-medium">
                <a href="#" className="hover:text-black hover:underline hover:translate-x-1 transition-transform w-fit">Contáctanos</a>
                <a href="#" className="hover:text-black hover:underline hover:translate-x-1 transition-transform w-fit">Métodos de Pago</a>
                <a href="#" className="hover:text-black hover:underline hover:translate-x-1 transition-transform w-fit">Puntos y Recompensas</a>
                <a href="#" className="hover:text-black hover:underline hover:translate-x-1 transition-transform w-fit">Tarjetas Regalo</a>
              </div>
            </div>

            <div className="lg:col-span-2 flex flex-col items-start lg:items-end lg:text-right">
              <h4 className="font-black uppercase mb-6 text-[14px] tracking-wider w-full lg:text-right">Encuéntranos en</h4>
              <div className="flex space-x-3 mb-8 w-full lg:justify-end">
                <div className="w-10 h-10 bg-[#222] text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-[#fa6338] transition-colors"><span className="font-bold">f</span></div>
                <div className="w-10 h-10 bg-[#222] text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-[#fa6338] transition-colors"><span className="font-bold">in</span></div>
                <div className="w-10 h-10 bg-[#222] text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-[#fa6338] transition-colors"><span className="font-bold">tw</span></div>
                <div className="w-10 h-10 bg-[#222] text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-[#fa6338] transition-colors"><span className="font-bold">yt</span></div>
                <div className="w-10 h-10 bg-[#222] text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-[#fa6338] transition-colors"><Camera className="w-[18px] h-[18px]" /></div>
              </div>

              <h4 className="font-black uppercase mb-4 text-[14px] tracking-wider w-full lg:text-right">Suscríbete a nuestro boletín</h4>
              <p className="text-[13px] text-gray-500 mb-4 w-full lg:text-right">Recibe noticias de moda, grandes lanzamientos y códigos promocionales solo en {data.name}.</p>
              <div className="flex w-full max-w-[400px]">
                <input
                  type="email"
                  placeholder="Tu dirección de e-mail"
                  className="bg-white border border-[#222] px-4 py-3 text-[13px] w-full outline-none focus:ring-1 focus:ring-[#222]"
                />
                <button className="bg-[#222] text-white px-6 py-3 text-[13px] font-bold uppercase hover:bg-black transition-colors shrink-0">
                  Suscribir
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8 flex flex-col lg:flex-row justify-between items-center text-[12px] text-gray-500 gap-4">
            <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2 font-medium">
              <a href="#" className="hover:text-black hover:underline">Centro de Privacidad</a>
              <a href="#" className="hover:text-black hover:underline">Política de Privacidad</a>
              <a href="#" className="hover:text-black hover:underline">Términos y Condiciones</a>
              <a href="#" className="hover:text-black hover:underline">Aviso de Cookies</a>
              <a href="#" className="hover:text-black hover:underline">Configuración de Privacidad</a>
            </div>
            <div className="text-center lg:text-right">
              <p>© 2009-2026 {data.name} Todos los derechos reservados</p>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}

