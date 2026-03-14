'use client';

import React, { useState } from 'react';
import { StoreData } from '@/lib/types';
import { Search, ShoppingCart, Menu, Heart, User, Star, ChevronRight, ChevronDown, Smartphone, ShieldCheck, HelpCircle, Globe, X } from 'lucide-react';
import { usePagination, ProductPagination } from './shared/Pagination';

export default function FlashDealsTemplate({ data }: { data: StoreData }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const flashDeals = data.products.slice(0, 5);
  
  const itemsPerPage = 15; // 3 rows x 5 columns for consistency
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

  return (
    <div className="min-h-full bg-[#f5f5f5] font-sans text-[#222] overflow-x-hidden">

      {/* ─── HEADER LEVEL 1: Top Bar ─── */}
      <div className="bg-[#f5f5f5] text-[#333] text-[12px] h-[36px] hidden md:flex justify-between items-center px-4 xl:px-8 border-b border-[#e8e8e8]">
        <div className="flex items-center h-full">
          <a href="#" className="flex items-center hover:text-[#ff4747] px-3 h-full cursor-pointer">
            <Smartphone className="w-4 h-4 mr-1 text-[#ff4747]" />
            Descarga la app de FlashDeals
          </a>
        </div>
        <div className="flex items-center h-full">
          <a href="#" className="flex items-center hover:text-[#ff4747] px-3 h-full border-r border-gray-300">
            Vende en FlashDeals
          </a>
          <a href="#" className="flex items-center hover:text-[#ff4747] px-3 h-full border-r border-gray-300">
            <HelpCircle className="w-4 h-4 mr-1 text-gray-400" />
            Ayuda
          </a>
          <a href="#" className="flex items-center hover:text-[#ff4747] px-3 h-full border-r border-gray-300">
            <span>Protección del comprador</span>
          </a>
          <button className="flex items-center hover:text-[#ff4747] px-3 h-full font-medium">
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg" alt="US" className="w-[16px] mr-1 rounded-sm" />
            / English / USD
            <ChevronDown className="w-3 h-3 ml-1 text-gray-500" />
          </button>
        </div>
      </div>

      {/* ─── HEADER LEVEL 2: Main Search Nav ─── */}
      <header className="bg-white sticky top-0 z-50 shadow-[0_2px_4px_rgba(0,0,0,0.08)]">
        <div className="w-full max-w-[1500px] mx-auto px-4 xl:px-8 h-[76px] flex items-center justify-between gap-4 md:gap-8">

          {/* Mobile Menu Icon */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-600"
          >
            {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>

          {/* Logo */}
          <div className="text-[#fd384f] font-black text-[32px] tracking-tighter italic shrink-0 cursor-pointer flex items-center h-full">
            {data.logoText}
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-[800px]">
            <div className="flex w-full h-[40px] border-2 border-[#fd384f] rounded-full overflow-hidden bg-white">
              <input
                type="text"
                placeholder="airpods pro"
                className="flex-1 px-5 h-full outline-none text-[15px] font-medium text-[#222]"
              />
              <button className="bg-[#fd384f] hover:bg-[#ff1616] text-white px-8 h-full font-bold flex items-center justify-center transition-colors">
                <Search className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-2 shrink-0">
            {/* Download App (Mobile usually hidden, shown on Desktop differently) */}
            <div className="hidden lg:flex items-center cursor-pointer hover:text-[#fd384f] px-2">
              <div className="w-9 h-9 flex items-center justify-center">
                <Smartphone className="w-6 h-6" />
              </div>
              <div className="flex flex-col ml-1">
                <span className="text-[14px] font-bold leading-tight">10 % dto.</span>
                <span className="text-[12px] text-[#222] leading-tight">en la app</span>
              </div>
            </div>

            {/* Account */}
            <div className="hidden md:flex items-center cursor-pointer hover:text-[#fd384f] px-2 group relative">
              <div className="w-9 h-9 flex items-center justify-center">
                <User className="w-[26px] h-[26px]" />
              </div>
              <div className="flex flex-col ml-1">
                <span className="text-[12px] text-[#222] leading-tight">¡Hola!</span>
                <span className="text-[14px] font-bold leading-tight flex items-center">
                  Identifícate
                  <ChevronDown className="w-4 h-4 ml-1 text-gray-400 group-hover:text-[#fd384f]" />
                </span>
              </div>
            </div>

            {/* Cart */}
            <div 
              onClick={addToCart}
              className="flex items-center cursor-pointer hover:text-[#fd384f] px-2 relative group"
            >
              <div className="w-10 h-10 flex items-center justify-center relative">
                <ShoppingCart className="w-[30px] h-[30px]" />
                <span className="absolute top-0 right-0 bg-[#fd384f] text-white text-[12px] font-bold px-[6px] py-[1px] rounded-full border-2 border-white leading-none">{cartCount}</span>
              </div>
              <div className="hidden lg:flex flex-col ml-1">
                <span className="text-[14px] font-bold leading-tight mt-3">Cesta</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar (Shows below header) */}
        <div className="md:hidden px-4 pb-3">
          <div className="flex w-full h-[40px] border-2 border-[#fd384f] rounded-full overflow-hidden bg-white">
            <input type="text" placeholder="Buscar..." className="flex-1 px-4 outline-none text-[15px]" />
            <button className="bg-[#fd384f] px-4"><Search className="w-5 h-5 text-white" /></button>
          </div>
        </div>

        {/* Categories Horizontal Banner (Sub Nav) */}
        <div className="w-full max-w-[1500px] mx-auto px-4 xl:px-8 h-[40px] hidden md:flex items-center space-x-6 text-[15px] font-bold text-[#222]">
          <div className="flex items-center cursor-pointer hover:text-[#fd384f] h-full">
            <Menu className="w-5 h-5 mr-2" />
            Todas las categorías
          </div>
          <a href="#" className="hover:text-[#fd384f]">NN SuperOfertas</a>
          <a href="#" className="hover:text-[#fd384f]">Choice</a>
          <a href="#" className="hover:text-[#fd384f]">Tecnología</a>
          <a href="#" className="hover:text-[#fd384f]">Hogar</a>
          <a href="#" className="hover:text-[#fd384f]">Moda</a>
          <a href="#" className="hover:text-[#fd384f]">Marcas destacadas</a>
        </div>
      </header>

      {/* ─── MAIN CONTENT ─── */}
      <main className="w-full max-w-[1500px] mx-auto px-2 md:px-4 xl:px-8 py-4">

        {/* ─── HERO ROW ─── */}
        <div className="flex gap-4 mb-6">
          {/* Left Categories Sidebar (Desktop only) */}
          <div className="w-[260px] bg-white rounded-[16px] shadow-sm hidden lg:block overflow-hidden h-[460px] flex-shrink-0">
            <ul className="py-3 text-[14px] text-[#222]">
              {['Moda Mujer', 'Moda Hombre', 'Teléfonos y Telecomunicaciones', 'Informática y Oficina', 'Electrónica de consumo', 'Joyería y Relojes', 'Hogar, Jardín y Mascotas', 'Bolsos y Calzado', 'Juguetes e Infantil', 'Deportes y Exterior', 'Salud y Belleza', 'Motor'].map((cat, i) => (
                <li key={i} className="px-5 py-2 hover:bg-[#f5f5f5] hover:text-[#fd384f] cursor-pointer flex items-center justify-between group">
                  <span className="font-medium">{cat}</span>
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#fd384f]" />
                </li>
              ))}
            </ul>
          </div>

          {/* Center Banner Slider */}
          <div className="flex-1 rounded-[16px] overflow-hidden relative h-[180px] sm:h-[300px] lg:h-[460px] bg-black">
            <img src={data.bannerImage} alt="FlashDeals Banner" className="w-full h-full object-cover opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent flex items-center p-6 sm:p-12">
              <div className="text-white max-w-lg">
                <span className="bg-[#fd384f] text-white text-[12px] sm:text-[14px] font-black italic px-3 py-1 rounded-sm mb-4 inline-block tracking-widest uppercase">
                  Choice
                </span>
                <h2 className="text-3xl sm:text-5xl font-black mb-2 leading-tight">Envío gratis</h2>
                <p className="text-lg sm:text-xl font-medium mb-6">Entrega rápida en millones de artículos.</p>
                <button className="bg-white text-[#fd384f] font-bold text-[14px] sm:text-[16px] px-8 py-3 rounded-full hover:bg-gray-100 transition-colors shadow-lg active:scale-95">
                  Comprar ahora
                </button>
              </div>
            </div>

            {/* Slider Dots Placeholder */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
              <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-white/50"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-white/50"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-white/50"></div>
            </div>
          </div>

          {/* Right User Box (Desktop only, classic Ali layout) */}
          <div className="w-[300px] bg-white rounded-[16px] shadow-sm hidden xl:block overflow-hidden h-[460px] flex-shrink-0 p-5 flex flex-col justify-between">
            <div className="flex flex-col items-center text-center mt-4">
              <div className="w-16 h-16 bg-[#fff0f0] rounded-full flex items-center justify-center mb-3">
                <User className="w-8 h-8 text-[#fd384f]" />
              </div>
              <h3 className="font-bold text-[16px] mb-1">Bienvenido a {data.name}</h3>
              <p className="text-[13px] text-gray-500 mb-4">Únete/Identifícate</p>
              <div className="flex w-full space-x-2">
                <button className="flex-1 bg-[#fd384f] text-white text-[14px] font-bold py-2.5 rounded-full hover:bg-[#ff1616]">
                  Obtener
                </button>
                <button className="flex-1 bg-[#fff0f0] text-[#fd384f] text-[14px] font-bold py-2.5 rounded-full hover:bg-[#ffe5e5]">
                  Entrar
                </button>
              </div>
            </div>
            {/* Promo banner inside user box */}
            <div className="bg-gradient-to-r from-[#ffe5e5] to-[#fff0f0] rounded-xl p-3 flex items-center mt-6">
              <div className="flex-1">
                <div className="text-[12px] font-bold text-[#fd384f] mb-1">Oferta de Bienvenida</div>
                <div className="text-[10px] text-gray-600">Tu artículo a US $0.99</div>
              </div>
              <div className="w-12 h-12 bg-white rounded-md p-1 shadow-sm">
                <img src={data.products[0]?.imageUrl} className="w-full h-full object-contain mix-blend-multiply" />
              </div>
            </div>
          </div>
        </div>

        {/* ─── SUPER DEALS (Ofertas Relámpago en Ali) ─── */}
        <div className="bg-white rounded-[16px] p-4 sm:p-6 mb-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <h3 className="text-2xl font-black italic text-[#fd384f]">SuperOfertas</h3>
            </div>
            <a href="#" className="text-[14px] text-gray-500 hover:text-[#fd384f] font-medium flex items-center">
              Ver más <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          <div className="flex overflow-x-auto space-x-4 pb-2 snap-x [&::-webkit-scrollbar]:hidden md:custom-scrollbar">
            {flashDeals.map((product, i) => (
              <div key={i} className="shrink-0 w-[140px] sm:w-[180px] bg-white group cursor-pointer">
                <div className="relative aspect-square rounded-[12px] overflow-hidden bg-[#f5f5f5] mb-2">
                  <img src={product.imageUrl} alt={product.title} className="w-full h-full object-contain mix-blend-multiply p-2 group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute top-0 left-0 bg-[#fd384f] text-white text-[11px] font-bold px-2 py-0.5 rounded-br-[8px]">
                    -80%
                  </div>
                </div>
                <div className="flex items-baseline mb-1">
                  <span className="text-[12px] font-bold text-[#fd384f] align-top mr-0.5">$</span>
                  <span className="text-[20px] font-bold text-[#fd384f] leading-none">{product.price.split('.')[0] || product.price}</span>
                  <span className="text-[12px] font-bold text-[#fd384f] align-top ml-0.5">.{product.price.split('.')[1] || '00'}</span>
                </div>
                <div className="text-[12px] text-gray-400 line-through mb-1">${product.originalPrice}</div>
                {(() => {
                  const discount = calculateDiscount(product.price, product.originalPrice);
                  return discount ? (
                    <div className="text-[12px] text-[#cc0c39] font-bold mb-1">{discount}% OFF</div>
                  ) : null;
                })()}
              </div>
            ))}
          </div>
        </div>

        {/* ─── MAIN PRODUCT GRID WITH PAGINATION (3x5 = 15 products) ─── */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[22px] font-bold text-[#222]">Más para amar</h3>
            <span className="text-sm text-gray-500">{totalItems} productos</span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
            {paginatedItems.map((product, idx) => (
              <div key={`flashdeals-${idx}-${product.id}`} data-product-id={product.id} className="bg-white rounded-[16px] overflow-hidden hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all cursor-pointer group flex flex-col h-full border border-gray-100 hover:border-transparent">
                {/* Product Image */}
                <div className="relative aspect-square bg-[#f5f5f5] overflow-hidden">
                  <img src={product.imageUrl} alt={product.title} className="w-full h-full object-contain mix-blend-multiply p-2 group-hover:opacity-90 transition-opacity" />
                  {/* Choice Label */}
                  {Math.random() > 0.5 && (
                    <div className="absolute top-2 left-2 bg-[#1b1b1b] text-white text-[10px] font-black italic px-2 py-0.5 rounded-tl-[8px] rounded-br-[8px] rounded-tr-[2px] rounded-bl-[2px]">
                      Choice
                    </div>
                  )}
                </div>

                {/* Product Details */}
                <div className="p-3 flex flex-col flex-1">
                  <h4 className="text-[13px] text-[#222] line-clamp-2 leading-[1.3] mb-1 group-hover:underline text-left">
                    {product.title}
                  </h4>

                  {/* Rating */}
                  <div className="flex items-center space-x-1 mb-2">
                    <Star className="w-[10px] h-[10px] fill-current text-[#222]" />
                    <span className="text-[11px] font-bold text-[#222]">{product.rating || 4.5}</span>
                    <span className="text-[11px] text-[#999]">{product.reviews || 120}+ vendidos</span>
                  </div>

                  <div className="mt-auto">
                    {/* Price */}
                    <div className="flex items-baseline mb-0.5">
                      <span className="text-[18px] font-bold text-[#222]">CAD ${product.price}</span>
                    </div>
                    {/* Welcome Deal Fake Price */}
                    <div className="text-[12px] text-gray-400 line-through mb-1.5">CAD ${(parseFloat(product.price) * 1.5).toFixed(2)}</div>

                    {/* Free Delivery Tag */}
                    <div className="flex mb-3">
                      <span className="text-[10px] sm:text-[11px] text-[#fd384f] bg-[#fff0f0] border border-[#ffcccc] px-1.5 py-0.5 rounded-[4px] font-medium leading-tight">
                        Envío gratis
                      </span>
                    </div>

                    {/* Add to Cart button */}
                    <div className="flex justify-end relative">
                      <button 
                        onClick={(e) => { e.stopPropagation(); addToCart(); }}
                        className="w-8 h-8 rounded-full bg-[#f5f5f5] group-hover:bg-[#fd384f] group-hover:text-white text-[#222] flex items-center justify-center transition-colors shadow-sm"
                      >
                        <ShoppingCart className="w-[14px] h-[14px] ml-[-1px]" />
                      </button>
                    </div>
                  </div>
                </div>
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

      </main>

      {/* ─── FOOTER ─── */}
      <footer className="bg-[#f5f5f5] pt-12 pb-6 border-t border-gray-200 mt-10">
        <div className="w-full max-w-[1500px] mx-auto px-4 xl:px-8">

          {/* Trust Value Props */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 bg-white rounded-xl p-8 shadow-sm">
            <div className="flex items-center space-x-4">
              <ShieldCheck className="w-10 h-10 text-gray-400" />
              <div>
                <h4 className="font-bold text-[16px] text-[#222]">Pago seguro</h4>
                <p className="text-[13px] text-gray-500">Paga con los métodos más populares y seguros del mundo.</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 border-t md:border-t-0 md:border-l border-gray-100 md:pl-6 pt-4 md:pt-0">
              <Globe className="w-10 h-10 text-gray-400" />
              <div>
                <h4 className="font-bold text-[16px] text-[#222]">Envío mundial</h4>
                <p className="text-[13px] text-gray-500">Envíos a más de 200 países y regiones en múltiples idiomas.</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 border-t md:border-t-0 md:border-l border-gray-100 md:pl-6 pt-4 md:pt-0">
              <HelpCircle className="w-10 h-10 text-gray-400" />
              <div>
                <h4 className="font-bold text-[16px] text-[#222]">Centro de ayuda 24/7</h4>
                <p className="text-[13px] text-gray-500">Te ayudamos en cada paso con un soporte disponible siempre.</p>
              </div>
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
            <div>
              <h4 className="font-bold text-[16px] mb-4 text-[#222]">Ayuda</h4>
              <div className="flex flex-col space-y-2 text-[13px] text-gray-500">
                <a href="#" className="hover:text-[#222] hover:underline">Centro de ayuda</a>
                <a href="#" className="hover:text-[#222] hover:underline">Disputas y reportes</a>
                <a href="#" className="hover:text-[#222] hover:underline">Denunciar infracción de IPI</a>
                <a href="#" className="hover:text-[#222] hover:underline">Políticas de reembolso</a>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-[16px] mb-4 text-[#222]">FlashDeals Multi-Language Sites</h4>
              <div className="flex flex-col space-y-2 text-[13px] text-gray-500">
                <a href="#" className="hover:text-[#222] hover:underline">Pусский</a>
                <a href="#" className="hover:text-[#222] hover:underline">Portuguese</a>
                <a href="#" className="hover:text-[#222] hover:underline">Spanish</a>
                <a href="#" className="hover:text-[#222] hover:underline">French</a>
                <a href="#" className="hover:text-[#222] hover:underline">German</a>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-[16px] mb-4 text-[#222]">Explorar por categoría</h4>
              <div className="flex flex-col space-y-2 text-[13px] text-gray-500">
                <a href="#" className="hover:text-[#222] hover:underline">Toda la popularidad</a>
                <a href="#" className="hover:text-[#222] hover:underline">Producto</a>
                <a href="#" className="hover:text-[#222] hover:underline">Promociones</a>
                <a href="#" className="hover:text-[#222] hover:underline">Precio bajo</a>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-[16px] mb-4 text-[#222]">TradeVault Group</h4>
              <div className="flex flex-col space-y-2 text-[13px] text-gray-500">
                <a href="#" className="hover:text-[#222] hover:underline">TradeVault Group Website</a>
                <a href="#" className="hover:text-[#222] hover:underline">FlashDeals</a>
                <a href="#" className="hover:text-[#222] hover:underline">Alimama</a>
                <a href="#" className="hover:text-[#222] hover:underline">Alipay</a>
                <a href="#" className="hover:text-[#222] hover:underline">Fliggy</a>
              </div>
            </div>
          </div>

          <div className="bg-[#222] text-gray-400 text-[13px] py-4 px-6 rounded-lg text-center flex flex-col md:flex-row justify-between items-center">
            <div className="mb-2 md:mb-0">
              Protección de la propiedad intelectual - Política de privacidad - Mapa del sitio web - Términos de uso de FlashDeals.com
            </div>
            <div>
              © 2010-2026 {data.name}.com. Todos los derechos reservados.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
