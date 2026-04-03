'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { StoreData, Product } from '@/lib/types';
import { Search, ShoppingCart, Menu, MapPin, Star, ChevronRight, Globe, ChevronDown, Heart, X } from 'lucide-react';
import { usePagination, ProductPagination } from '@/components/componentes-compartidos/templates/Pagination';
import { calculateDiscountedPrice } from '@/lib/utils';
import { useCart } from '@/contexts/CartContext';

export default function MegaMarketTemplate({ data }: { data: StoreData }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);
  
  // Usar el contexto del carrito real
  const { addToCart: addToCartContext, itemCount, items, setIsCartOpen } = useCart();
  
  const itemsPerPage = 15; // 3 rows x 5 columns
  
  const {
    currentPage,
    totalPages,
    paginatedItems,
    handlePageChange,
    totalItems,
  } = usePagination(data.products, itemsPerPage);

  // Use data products or default
  const flashDeals = data.products.slice(0, 5);
  const categories = ['Electrónicos', 'Hogar y Cocina', 'Moda', 'Belleza y Cuidado', 'Deportes', 'Juguetes'];

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  // Función para agregar al carrito usando el contexto
  const handleAddToCart = (product: Product, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    addToCartContext(product);
  };

  return (
    <div className="min-h-full bg-[#E3E6E6] font-sans text-[#0f1111] overflow-x-hidden">
      {/* ─── HEADER LEVEL 1: Main Nav ─── */}
      <header className="bg-[#131921] text-white flex flex-col md:flex-row md:items-center px-2 py-1 md:py-0 md:h-[60px] text-[14px]">
        {/* Mobile Top Row: Menu + Logo + User + Cart */}
        <div className="flex items-center justify-between md:hidden w-full pb-2 pt-1 border-b border-transparent">
          <div className="flex items-center">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white hover:border hover:border-white rounded-sm outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <a href="#" className="font-bold text-xl tracking-tight px-2 flex items-center">
              {data.logoText}
              <span className="text-[#febd69] font-normal text-sm ml-1 mt-1">.com</span>
            </a>
          </div>
          <div className="flex items-center space-x-2">
            <button className="flex items-center px-2 cursor-pointer text-sm">
              Identifícate
              <ChevronRight className="w-4 h-4 ml-1 text-gray-400" />
            </button>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="flex items-end px-2 pb-1 relative cursor-pointer"
            >
              <ShoppingCart className="w-8 h-8 relative top-1" />
              <span className="absolute top-0 left-6 text-[#f08804] font-bold text-sm">{itemCount}</span>
            </button>
          </div>
        </div>

        {/* Desktop Navbar Left */}
        <div className="hidden md:flex items-center space-x-1 shrink-0 h-full py-1">
          {/* Logo */}
          <a href="#" className="flex items-center justify-center p-2 border border-transparent hover:border-white rounded-sm cursor-pointer h-full max-h-[50px]">
            <span className="font-extrabold text-2xl tracking-tighter mt-1">{data.logoText}</span>
            <span className="text-[#febd69] font-normal text-sm ml-1 mt-3">.com</span>
          </a>

          {/* Deliver To */}
          <button className="flex items-center p-2 border border-transparent hover:border-white rounded-sm cursor-pointer h-full max-h-[50px]">
            <MapPin className="w-4 h-4 mt-3 mr-1 text-white" />
            <div className="flex flex-col leading-tight">
              <span className="text-[#cccccc] text-[12px] font-normal">Enviar a</span>
              <span className="text-white text-[14px] font-bold">Colombia</span>
            </div>
          </button>
        </div>

        {/* Search Bar - Responsive */}
        <div className="flex flex-1 md:mx-4 mt-2 md:mt-0 relative h-10 md:h-10 rounded-md overflow-hidden focus-within:ring-[3px] focus-within:ring-[#f90] focus-within:border-transparent">
          {/* Desktop Search Dropdown */}
          <button className="hidden md:flex items-center bg-[#f3f3f3] hover:bg-[#d4d4d4] text-[#555] text-[12px] border-r border-[#cdcdcd] px-3 cursor-pointer">
            Todos
            <ChevronDown className="w-3 h-3 ml-1 text-[#555]" />
          </button>
          <input
            type="text"
            placeholder="Buscar productos, marcas y más..."
            className="flex-1 w-full h-full px-3 text-[#0f1111] text-[15px] outline-none border-none"
          />
          <button className="bg-[#febd69] hover:bg-[#f3a847] w-[45px] h-full flex items-center justify-center cursor-pointer transition-colors shrink-0">
            <Search className="w-5 h-5 text-[#333]" />
          </button>
        </div>

        {/* Desktop Navbar Right */}
        <div className="hidden md:flex items-center space-x-1 shrink-0 h-full py-1 ml-2">
          {/* Language / Region */}
          <button className="flex items-center p-2 border border-transparent hover:border-white rounded-sm cursor-pointer h-full max-h-[50px]">
            <Globe className="w-4 h-4 mr-1 text-gray-300" />
            <span className="text-[14px] font-bold">ES</span>
            <ChevronDown className="w-3 h-3 ml-1 text-gray-400 mt-1" />
          </button>

          {/* Account */}
          <button className="flex flex-col justify-center p-2 border border-transparent hover:border-white rounded-sm cursor-pointer h-full max-h-[50px] leading-tight">
            <span className="text-white text-[12px] font-normal">Hola, Identifícate</span>
            <div className="flex items-center">
              <span className="text-white text-[14px] font-bold">Cuentas y Listas</span>
              <ChevronDown className="w-3 h-3 ml-1 text-gray-400" />
            </div>
          </button>

          {/* Orders */}
          <button className="flex flex-col justify-center p-2 border border-transparent hover:border-white rounded-sm cursor-pointer h-full max-h-[50px] leading-tight">
            <span className="text-white text-[12px] font-normal">Devoluciones</span>
            <span className="text-white text-[14px] font-bold">y Pedidos</span>
          </button>

          {/* Cart Desktop */}
          <button 
            onClick={() => setIsCartOpen(true)}
            className="flex items-end p-2 border border-transparent hover:border-white rounded-sm cursor-pointer h-full max-h-[50px] relative"
          >
            <ShoppingCart className="w-8 h-8" />
            <span className="absolute top-1 left-5 text-[#f08804] font-bold text-sm text-center w-[16px]">{itemCount}</span>
            <span className="text-white text-[14px] font-bold ml-1 hidden lg:block mb-1">Carrito</span>
          </button>
        </div>
      </header>

      {/* ─── HEADER LEVEL 2: Sub Nav ─── */}
      <nav className="bg-[#232f3e] text-white flex items-center px-3 md:px-4 h-[39px] text-[14px] overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:hidden">
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex items-center border border-transparent hover:border-white rounded-sm px-2 cursor-pointer h-full"
        >
          <Menu className="w-5 h-5 mr-1" />
          <span className="font-bold">Todo</span>
        </button>
        <div className="flex items-center space-x-1 ml-2">
          {['Ofertas del Día', 'Servicio al Cliente', 'Listas', 'Tarjetas de Regalo', 'Vender'].map((link) => (
            <a key={link} href="#" className="border border-transparent hover:border-white rounded-sm px-2 py-1 h-full flex items-center">
              {link}
            </a>
          ))}
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg z-50">
          <div className="p-4 space-y-3">
            <h3 className="font-bold text-lg">Departamentos</h3>
            {categories.map((cat) => (
              <a key={cat} href="#" className="block py-2 text-[#0f1111] hover:text-[#007185]">
                {cat}
              </a>
            ))}
          </div>
        </div>
      )}

      <main className="w-full relative mx-auto pb-10">

        {/* ─── HERO BANNER & GRADIENT MASK ─── */}
        <div className="relative w-full h-[250px] sm:h-[400px] md:h-[600px] bg-white">
          <img
            src={data.bannerImage}
            alt="MegaMarket Banner Hero"
            className="w-full h-full object-cover object-top"
          />
          <div
            className="absolute bottom-0 w-full h-[250px]"
            style={{ background: 'linear-gradient(to bottom, rgba(227,230,230,0) 0%, rgba(227,230,230,1) 100%)' }}
          ></div>
        </div>

        {/* ─── CONTENT GRID (Pulled up over banner) ─── */}
        <div className="relative z-10 mx-auto px-4 sm:px-5 w-full md:max-w-[1500px] -mt-[100px] sm:-mt-[150px] md:-mt-[350px]">

          {/* Row 1: 4 Cards Quad Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {categories.slice(0, 4).map((cat, gridIdx) => (
              <div key={gridIdx} className="bg-white p-4 h-[380px] sm:h-[420px] flex flex-col cursor-pointer z-10">
                <h2 className="text-[21px] font-bold mb-3 leading-tight tracking-tight text-[#0f1111]">{cat}</h2>
                <div className="grid grid-cols-2 gap-x-3 gap-y-4 flex-1">
                  {[0, 1, 2, 3].map(i => {
                    const prodIdx = (gridIdx * 4 + i) % data.products.length;
                    const p = data.products[prodIdx];
                    return (
                      <a key={i} href="#" data-product-id={p.id} className="flex flex-col group">
                        <div className="h-[100px] sm:h-[115px] bg-white mb-2 overflow-hidden flex items-center justify-center">
                          <img src={p.imageUrl} alt={p.title} className="max-h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform" />
                        </div>
                        <span className="text-[12px] truncate text-[#0f1111] group-hover:text-[#007185] transition-colors">{p.title}</span>
                      </a>
                    )
                  })}
                </div>
                <a href="#" className="text-[13px] text-[#007185] hover:text-[#c45500] hover:underline mt-4">Comprar ahora</a>
              </div>
            ))}
          </div>

          {/* Row 2: Horizontal Scroller (Flash Deals Style) */}
          <div className="bg-white p-5 mt-5">
            <div className="flex items-center space-x-3 mb-2">
              <h2 className="text-[21px] font-bold tracking-tight text-[#0f1111]">Ofertas Relámpago</h2>
              <a href="#" className="text-[14px] text-[#007185] hover:text-[#c45500] hover:underline mt-1 font-medium">Ver más ofertas del día</a>
            </div>
            <div className="flex overflow-x-auto space-x-4 pb-4 snap-x [&::-webkit-scrollbar]:hidden md:custom-scrollbar">
              {flashDeals.map((product, i) => (
                <a key={i} href="#" data-product-id={product.id} className="shrink-0 w-[180px] sm:w-[220px] flex flex-col snap-start cursor-pointer group">
                  <div className="bg-[#f7f7f7] w-full h-[200px] flex items-center justify-center p-4 mb-2 relative">
                    <img src={product.imageUrl} alt={product.title} className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-[1.03] transition-transform duration-300" />
                  </div>
                  {/* Discount badge - uses product.discount if set */}
                  {product.discount && product.discount > 0 ? (
                    <div className="flex items-center space-x-2 mt-1 mb-1">
                      <span className="bg-[#cc0c39] text-white text-[12px] px-2 py-1 rounded-sm font-bold flex items-center h-6">
                        -{product.discount}%
                      </span>
                      <span className="text-[#cc0c39] text-[12px] font-bold">Oferta del día</span>
                    </div>
                  ) : null}
                  <div className="flex items-baseline mb-1">
                    <span className="text-[12px] align-text-top mr-[1px]">{product.currency || 'Gs.'}</span>
                    <span className="text-[21px] font-medium leading-none">
                      {product.discount && product.discount > 0 
                        ? Math.floor(calculateDiscountedPrice(product.price, product.discount)).toLocaleString('es-PY')
                        : Math.floor(product.price).toLocaleString('es-PY')}
                    </span>
                  </div>
                  {product.discount && product.discount > 0 && (
                    <div className="text-[12px] text-gray-500 line-through">
                      {product.currency || 'Gs.'}{Math.floor(product.price).toLocaleString('es-PY')}
                    </div>
                  )}
                  <div className="text-[13px] text-[#0f1111] line-clamp-2 leading-tight">{product.title}</div>
                </a>
              ))}
            </div>
          </div>

          {/* Row 3: Product Listing Grid WITH PAGINATION (3x5 = 15 products) */}
          <div className="mt-5">
            <div className="bg-white p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-[21px] font-bold tracking-tight text-[#0f1111]">Todos los Productos</h2>
                <span className="text-sm text-gray-600">{totalItems} resultados</span>
              </div>
              
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                {paginatedItems.map((p, i) => (
                  <div key={`megamarket-grid-${i}-${p.id}`} data-product-id={p.id} className="flex flex-col cursor-pointer group relative">
                    <div className="relative">
                      <div className="h-[180px] flex items-center justify-center p-2 mb-2">
                        <img src={p.imageUrl} alt={p.title} className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-[1.02] transition-transform" />
                      </div>
                      {p.discount && p.discount > 0 && (
                        <div className="absolute top-2 left-2 bg-[#cc0c39] text-white text-[11px] font-bold px-2 py-0.5 rounded-sm">
                          -{p.discount}%
                        </div>
                      )}
                      <button
                        onClick={(e) => { e.preventDefault(); toggleWishlist(p.id); }}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
                      >
                        <Heart className={`w-4 h-4 ${wishlist.includes(p.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                      </button>
                    </div>
                    <a href="#" className="text-[#007185] group-hover:text-[#c45500] text-[14px] line-clamp-2 leading-tight mb-1">{p.title}</a>

                    <div className="flex items-center space-x-1 mb-1">
                      <div className="flex text-[#ffa41c]">
                        {[...Array(5)].map((_, starIdx) => (
                          <Star key={`megamarket-star-${starIdx}`} className={`w-[14px] h-[14px] ${starIdx < Math.floor(p.rating || 4) ? 'fill-current' : 'text-gray-300'}`} />
                        ))}
                      </div>
                      <ChevronDown className="w-3 h-3 text-[#555] cursor-pointer" />
                      <span className="text-[12px] text-[#007185]">{p.reviews || 124}</span>
                    </div>

                    <div className="flex items-baseline mb-1">
                      <span className="text-[12px] align-text-top mr-[1px]">{p.currency || 'Gs.'}</span>
                      <span className="text-[21px] font-medium leading-none">
                        {p.discount && p.discount > 0 
                          ? Math.floor(calculateDiscountedPrice(p.price, p.discount)).toLocaleString('es-PY')
                          : Math.floor(p.price).toLocaleString('es-PY')}
                      </span>
                    </div>
                    {p.discount && p.discount > 0 ? (
                      <span className="text-[12px] text-[#565959]">Precio: <span className="line-through">{p.currency || 'Gs.'}{Math.floor(p.price).toLocaleString('es-PY')}</span></span>
                    ) : p.originalPrice ? (
                      <span className="text-[12px] text-[#565959]">Precio: <span className="line-through">{p.currency || 'Gs.'}{Math.floor(p.originalPrice).toLocaleString('es-PY')}</span></span>
                    ) : null}

                    <button 
                      onClick={(e) => handleAddToCart(p, e)}
                      className="mt-3 w-full bg-[#ffd814] hover:bg-[#f7ca00] text-[#0f1111] text-[13px] py-[6px] rounded-full border border-[#fcd200] hover:border-[#F2C200] hover:shadow-sm font-medium transition-all active:ring-2 active:ring-[#008296] outline-none"
                    >
                      Agregar al carrito
                    </button>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <ProductPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  totalItems={totalItems}
                  itemsPerPage={itemsPerPage}
                />
              )}
            </div>
          </div>

          {/* ─── Row 4: Best Sellers - Horizontal Cards with Ranking ─── */}
          <div className="bg-white p-5 mt-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[21px] font-bold tracking-tight text-[#0f1111]">Más Vendidos</h2>
              <a href="#" className="text-[13px] text-[#007185] hover:text-[#c45500] hover:underline font-medium">Ver todos los más vendidos</a>
            </div>
            <div className="flex overflow-x-auto space-x-4 pb-2 snap-x [&::-webkit-scrollbar]:hidden">
              {data.products.slice(0, 6).map((p, i) => (
                <div key={`bestseller-${i}`} data-product-id={p.id} className="shrink-0 w-[260px] flex items-center bg-[#fafafa] rounded-lg p-3 snap-start cursor-pointer group hover:shadow-md transition-shadow">
                  <div className="text-[32px] font-bold text-[#c45500] mr-3 w-[40px] text-center shrink-0">#{i + 1}</div>
                  <div className="w-[80px] h-[80px] shrink-0 flex items-center justify-center">
                    <img src={p.imageUrl} alt={p.title} className="max-h-full max-w-full object-contain mix-blend-multiply" />
                  </div>
                  <div className="ml-3 flex-1 min-w-0">
                    <h4 className="text-[13px] text-[#0f1111] line-clamp-2 leading-tight group-hover:text-[#c45500] transition-colors">{p.title}</h4>
                    <div className="flex items-center mt-1">
                      <div className="flex text-[#ffa41c]">
                        {[...Array(5)].map((_, s) => (
                          <Star key={`bs-star-${i}-${s}`} className={`w-[10px] h-[10px] ${s < Math.floor(p.rating || 4) ? 'fill-current' : 'text-gray-300'}`} />
                        ))}
                      </div>
                      <span className="text-[11px] text-[#007185] ml-1">{p.reviews || 100}</span>
                    </div>
                    <div className="text-[15px] font-medium text-[#0f1111] mt-1">
                      {p.currency || 'Gs.'} {Math.floor(p.price).toLocaleString('es-PY')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ─── Row 5: Prime Banner (Full Width Promo) ─── */}
          <div className="mt-5 bg-gradient-to-r from-[#232f3e] to-[#37475a] rounded-sm overflow-hidden cursor-pointer group">
            <div className="flex flex-col md:flex-row items-center justify-between p-6 md:p-8">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="bg-[#00a8e1] text-white font-bold text-[18px] px-4 py-2 rounded-sm mr-5 tracking-tight">
                  prime
                </div>
                <div className="text-white">
                  <h3 className="text-[20px] font-bold leading-tight">Envío GRATIS y rápido</h3>
                  <p className="text-[14px] text-gray-300 mt-1">En millones de productos. Sin mínimo de compra.</p>
                </div>
              </div>
              <button className="bg-[#ffd814] hover:bg-[#f7ca00] text-[#0f1111] text-[14px] font-bold px-8 py-3 rounded-full transition-colors shadow-sm">
                Prueba gratis 30 días
              </button>
            </div>
          </div>

          {/* ─── Row 6: Categories Visual Grid (2x3 with images) ─── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
            <div className="bg-white p-5">
              <h2 className="text-[21px] font-bold mb-4 text-[#0f1111]">Tendencias en Electrónicos</h2>
              <div className="grid grid-cols-2 gap-3">
                {data.products.slice(0, 4).map((p, i) => (
                  <div key={`trend-elec-${i}`} data-product-id={p.id} className="bg-[#f7f7f7] rounded-sm p-3 cursor-pointer group hover:bg-[#eef7ff] transition-colors">
                    <div className="h-[100px] flex items-center justify-center mb-2">
                      <img src={p.imageUrl} alt={p.title} className="max-h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform" />
                    </div>
                    <span className="text-[12px] text-[#0f1111] line-clamp-1">{p.title}</span>
                  </div>
                ))}
              </div>
              <a href="#" className="text-[13px] text-[#007185] hover:text-[#c45500] hover:underline mt-3 inline-block">Ver más</a>
            </div>
            <div className="bg-white p-5">
              <h2 className="text-[21px] font-bold mb-4 text-[#0f1111]">Lo Mejor en Hogar</h2>
              <div className="grid grid-cols-2 gap-3">
                {data.products.slice(4, 8).map((p, i) => (
                  <div key={`trend-home-${i}`} data-product-id={p.id} className="bg-[#f7f7f7] rounded-sm p-3 cursor-pointer group hover:bg-[#fff8ef] transition-colors">
                    <div className="h-[100px] flex items-center justify-center mb-2">
                      <img src={p.imageUrl} alt={p.title} className="max-h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform" />
                    </div>
                    <span className="text-[12px] text-[#0f1111] line-clamp-1">{p.title}</span>
                  </div>
                ))}
              </div>
              <a href="#" className="text-[13px] text-[#007185] hover:text-[#c45500] hover:underline mt-3 inline-block">Ver más</a>
            </div>
          </div>

          {/* ─── Row 7: Recently Viewed - Compact Horizontal Strip ─── */}
          <div className="bg-white p-5 mt-5">
            <h2 className="text-[21px] font-bold mb-3 text-[#0f1111]">Inspirado en lo que viste</h2>
            <div className="flex overflow-x-auto space-x-3 pb-2 [&::-webkit-scrollbar]:hidden">
              {data.products.slice(2, 8).map((p, i) => (
                <div key={`recent-${i}`} data-product-id={p.id} className="shrink-0 w-[140px] cursor-pointer group snap-start">
                  <div className="h-[140px] bg-[#f7f7f7] flex items-center justify-center p-2 rounded-sm mb-1">
                    <img src={p.imageUrl} alt={p.title} className="max-h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="text-[13px] text-[#c45500] font-medium">
                    {p.currency || 'Gs.'} {Math.floor(p.discount && p.discount > 0 ? calculateDiscountedPrice(p.price, p.discount) : p.price).toLocaleString('es-PY')}
                  </div>
                  {p.discount && p.discount > 0 && (
                    <div className="text-[11px] text-[#cc0c39] font-bold">-{p.discount}%</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ─── Row 8: Featured Brands - Logo Strip ─── */}
          <div className="bg-white p-5 mt-5">
            <h2 className="text-[21px] font-bold mb-4 text-[#0f1111]">Marcas Destacadas</h2>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {['Apple', 'Samsung', 'Nike', 'Adidas', 'Sony', 'LG'].map((brand, i) => (
                <div key={`brand-${i}`} className="bg-[#f7f7f7] rounded-lg p-4 flex flex-col items-center justify-center h-[100px] cursor-pointer hover:shadow-md hover:bg-white transition-all border border-transparent hover:border-gray-200">
                  <span className="text-[16px] font-bold text-[#0f1111] tracking-tight">{brand}</span>
                  <span className="text-[11px] text-[#007185] mt-1">Hasta 40% dto.</span>
                </div>
              ))}
            </div>
          </div>

          {/* ─── Row 9: Deals of the Day - Single Feature Card ─── */}
          <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="md:col-span-2 bg-white p-5">
              <div className="flex items-center space-x-3 mb-4">
                <h2 className="text-[21px] font-bold text-[#0f1111]">Oferta del Día</h2>
                <span className="bg-[#cc0c39] text-white text-[12px] font-bold px-2 py-0.5 rounded-sm">Termina en 05:23:41</span>
              </div>
              {data.products[0] && (
                <div className="flex flex-col sm:flex-row items-center gap-6" data-product-id={data.products[0].id}>
                  <div className="w-[200px] h-[200px] shrink-0 flex items-center justify-center">
                    <img src={data.products[0].imageUrl} alt={data.products[0].title} className="max-h-full max-w-full object-contain mix-blend-multiply" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[18px] font-medium text-[#0f1111] mb-2">{data.products[0].title}</h3>
                    <div className="flex items-center mb-2">
                      <div className="flex text-[#ffa41c]">
                        {[...Array(5)].map((_, s) => (
                          <Star key={`deal-star-${s}`} className={`w-[14px] h-[14px] ${s < Math.floor(data.products[0].rating || 4) ? 'fill-current' : 'text-gray-300'}`} />
                        ))}
                      </div>
                      <span className="text-[13px] text-[#007185] ml-2">{data.products[0].reviews || 200} opiniones</span>
                    </div>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-[28px] font-medium text-[#cc0c39]">
                        {data.products[0].currency || 'Gs.'} {Math.floor(data.products[0].discount && data.products[0].discount > 0 ? calculateDiscountedPrice(data.products[0].price, data.products[0].discount) : data.products[0].price).toLocaleString('es-PY')}
                      </span>
                      {data.products[0].originalPrice && (
                        <span className="text-[14px] text-[#565959] line-through">
                          {data.products[0].currency || 'Gs.'} {Math.floor(data.products[0].originalPrice).toLocaleString('es-PY')}
                        </span>
                      )}
                    </div>
                    <div className="w-full bg-[#f0f0f0] h-[20px] rounded-full overflow-hidden mb-2">
                      <div className="bg-gradient-to-r from-[#cc0c39] to-[#ff6a00] h-full rounded-full flex items-center justify-end pr-2" style={{ width: '72%' }}>
                        <span className="text-[10px] text-white font-bold">72% reclamado</span>
                      </div>
                    </div>
                    <button 
                      onClick={(e) => handleAddToCart(data.products[0], e)}
                      className="bg-[#ffd814] hover:bg-[#f7ca00] text-[#0f1111] text-[14px] font-bold py-2.5 px-8 rounded-full border border-[#fcd200] transition-all"
                    >
                      Agregar al carrito
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="bg-white p-5 flex flex-col">
              <h2 className="text-[21px] font-bold mb-3 text-[#0f1111]">Más ofertas</h2>
              <div className="flex flex-col space-y-3 flex-1">
                {data.products.slice(1, 4).map((p, i) => (
                  <div key={`more-deal-${i}`} data-product-id={p.id} className="flex items-center gap-3 cursor-pointer group p-2 rounded-sm hover:bg-[#f7f7f7] transition-colors">
                    <div className="w-[60px] h-[60px] shrink-0 flex items-center justify-center">
                      <img src={p.imageUrl} alt={p.title} className="max-h-full object-contain mix-blend-multiply" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[13px] text-[#0f1111] line-clamp-1 group-hover:text-[#c45500]">{p.title}</h4>
                      <span className="text-[14px] font-medium text-[#cc0c39]">
                        {p.currency || 'Gs.'} {Math.floor(p.price).toLocaleString('es-PY')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ─── Row 10: Recomendaciones Personalizadas - Compact Cards ─── */}
          <div className="bg-white p-5 mt-5">
            <h2 className="text-[21px] font-bold mb-4 text-[#0f1111]">Recomendado para ti</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {data.products.slice(3, 7).map((p, i) => (
                <div key={`rec-${i}`} data-product-id={p.id} className="flex flex-col cursor-pointer group border border-gray-100 rounded-sm hover:shadow-md transition-shadow p-3">
                  <div className="h-[120px] flex items-center justify-center mb-2">
                    <img src={p.imageUrl} alt={p.title} className="max-h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform" />
                  </div>
                  <h4 className="text-[13px] text-[#007185] line-clamp-2 leading-tight group-hover:text-[#c45500]">{p.title}</h4>
                  <div className="flex items-center mt-1">
                    <div className="flex text-[#ffa41c]">
                      {[...Array(5)].map((_, s) => (
                        <Star key={`rec-star-${i}-${s}`} className={`w-[10px] h-[10px] ${s < Math.floor(p.rating || 4) ? 'fill-current' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <span className="text-[11px] text-[#007185] ml-1">{p.reviews || 100}</span>
                  </div>
                  <div className="text-[16px] font-medium text-[#0f1111] mt-1">
                    {p.currency || 'Gs.'} {Math.floor(p.price).toLocaleString('es-PY')}
                  </div>
                  <span className="text-[11px] text-[#007185] mt-1">Envío GRATIS</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>

      {/* ─── FOOTER ─── */}
      <footer className="w-full bg-[#232f3e] text-white">
        <div className="w-full bg-[#37475a] hover:bg-[#485769] py-[15px] cursor-pointer flex justify-center transition-colors">
          <span className="text-[13px] font-medium">Volver arriba</span>
        </div>

        <div className="w-full border-b border-[#3a4553]">
          <div className="max-w-[1000px] mx-auto px-4 py-10 grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col space-y-2">
              <h4 className="font-bold text-[16px] mb-2 text-white">Conócenos</h4>
              <a href="#" className="text-[14px] text-[#dddddd] hover:underline">Trabaja en {data.name}</a>
              <a href="#" className="text-[14px] text-[#dddddd] hover:underline">Blog</a>
              <a href="#" className="text-[14px] text-[#dddddd] hover:underline">Acerca de {data.name}</a>
              <a href="#" className="text-[14px] text-[#dddddd] hover:underline">Relaciones con inversionistas</a>
              <a href="#" className="text-[14px] text-[#dddddd] hover:underline">Dispositivos {data.name}</a>
              <a href="#" className="text-[14px] text-[#dddddd] hover:underline">Ciencia de {data.name}</a>
            </div>
            <div className="flex flex-col space-y-2">
              <h4 className="font-bold text-[16px] mb-2 text-white">Gana Dinero con Nosotros</h4>
              <a href="#" className="text-[14px] text-[#dddddd] hover:underline">Vende en {data.name}</a>
              <a href="#" className="text-[14px] text-[#dddddd] hover:underline">Vende tus aplicaciones</a>
              <a href="#" className="text-[14px] text-[#dddddd] hover:underline">Programa de Afiliados</a>
              <a href="#" className="text-[14px] text-[#dddddd] hover:underline">Anuncia tus productos</a>
              <a href="#" className="text-[14px] text-[#dddddd] hover:underline">Publica tu propio libro</a>
              <a href="#" className="text-[14px] text-[#dddddd] hover:underline">Habilita un hub</a>
            </div>
            <div className="flex flex-col space-y-2">
              <h4 className="font-bold text-[16px] mb-2 text-white">Métodos de Pago</h4>
              <a href="#" className="text-[14px] text-[#dddddd] hover:underline">Comprar con Puntos</a>
              <a href="#" className="text-[14px] text-[#dddddd] hover:underline">Recarga de Saldo</a>
              <a href="#" className="text-[14px] text-[#dddddd] hover:underline">Conversor de divisas</a>
            </div>
            <div className="flex flex-col space-y-2">
              <h4 className="font-bold text-[16px] mb-2 text-white">Podemos Ayudarte</h4>
              <a href="#" className="text-[14px] text-[#dddddd] hover:underline">Tu cuenta</a>
              <a href="#" className="text-[14px] text-[#dddddd] hover:underline">Tus pedidos</a>
              <a href="#" className="text-[14px] text-[#dddddd] hover:underline">Tarifas de envío y políticas</a>
              <a href="#" className="text-[14px] text-[#dddddd] hover:underline">Devoluciones y reemplazos</a>
              <a href="#" className="text-[14px] text-[#dddddd] hover:underline">Atención al Cliente</a>
            </div>
          </div>
        </div>

        <div className="py-8 flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-12">
          <div className="font-bold text-2xl tracking-tighter cursor-pointer flex items-center">
            {data.logoText}<span className="text-[14px] text-[#febd69] font-normal ml-1 mt-2">.com</span>
          </div>
          <div className="flex items-center space-x-2">
            <button className="border border-[#767676] rounded-sm px-3 py-1.5 flex items-center space-x-2 text-[13px] hover:bg-white/5 transition-colors">
              <Globe className="w-4 h-4 text-gray-300" />
              <span>Español</span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </button>
            <button className="border border-[#767676] rounded-sm px-3 py-1.5 flex items-center space-x-2 text-[13px] hover:bg-white/5 transition-colors">
              <span className="font-bold">$</span>
              <span>USD - Dólar Estadounidense</span>
            </button>
            <button className="border border-[#767676] rounded-sm px-3 py-1.5 flex items-center space-x-2 text-[13px] hover:bg-white/5 transition-colors">
              <img src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg" alt="US" className="w-[18px]" />
              <span>Estados Unidos</span>
            </button>
          </div>
        </div>

        <div className="bg-[#131921] py-8 text-center flex flex-col items-center">
          <div className="flex flex-wrap justify-center space-x-3 md:space-x-6 text-[12px] font-medium mb-1">
            <a href="#" className="hover:underline">Condiciones de uso</a>
            <a href="#" className="hover:underline">Aviso de Privacidad</a>
            <a href="#" className="hover:underline">Opciones de Privacidad</a>
            <a href="#" className="hover:underline">No vender mis datos personales</a>
          </div>
          <p className="text-[12px] text-[#dddddd]">© 1996-2026, {data.name}.com, Inc. o sus afiliados</p>
        </div>
      </footer>
    </div>
  );
}

