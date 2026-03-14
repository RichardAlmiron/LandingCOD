'use client';

import React, { useState } from 'react';
import { StoreData } from '@/lib/types';
import { Search, MapPin, ShoppingCart, CreditCard, Shield, Truck, Smartphone, Monitor, Car, Home, Shirt, ChevronRight, Bell, Menu, Zap, X } from 'lucide-react';
import { usePagination, ProductPagination } from './shared/Pagination';

export default function MercadoCODTemplate({ data }: { data: StoreData }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const topProducts = data.products.slice(0, 5);
  
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

  return (
    <div className="min-h-full bg-[#ebebeb] font-sans text-[#333] overflow-x-hidden">

      {/* ─── HEADER ─── */}
      <header className="bg-[#fff159] sticky top-0 z-50 shadow-[0_1px_1px_0_rgba(0,0,0,.1)]">
        <div className="w-full max-w-[1200px] mx-auto px-2 md:px-0">

          {/* Top Row: Logo, Search, Disney Promo */}
          <div className="flex items-center justify-between pt-[8px] md:pt-[11px] pb-[8px] md:pb-[11px] gap-4 md:gap-8 lg:gap-14">

            {/* Logo */}
            <div className="font-extrabold text-[24px] tracking-tighter text-[#2d3277] shrink-0 cursor-pointer flex items-center mb-1">
              <span className="mt-1">{data.logoText}</span>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-[600px] relative shadow-[0_1px_2px_0_rgba(0,0,0,.2)] rounded-[2px] overflow-hidden bg-white h-[40px] flex items-center focus-within:ring-1 focus-within:ring-[#3483fa]">
              <input
                type="text"
                placeholder="Buscar productos, marcas y más…"
                className="flex-1 px-[15px] py-[7px] text-[15px] text-[#333] font-normal outline-none placeholder-gray-400 h-full"
              />
              <div className="w-[1px] h-[26px] bg-[#e6e6e6]"></div>
              <button className="w-[45px] h-full bg-white flex items-center justify-center text-[#666] hover:text-[#333] transition-colors">
                <Search className="w-5 h-5 opacity-70" />
              </button>
            </div>

            {/* Promo */}
            <div className="hidden lg:flex w-[340px] shrink-0 justify-end h-[39px]">
              <div className="flex items-center text-[#333] font-semibold text-[15px] cursor-pointer">
                <img src="https://http2.mlstatic.com/D_NQ_877425-MLA47306668299_082021-OO.webp" alt="Disney+" className="h-[39px] object-contain rounded-[4px]" />
              </div>
            </div>

            {/* Mobile Menu Right */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-[#333]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Bottom Row: Navigation */}
          <div className="hidden md:flex items-end justify-between pb-[12px] text-[13px] text-[#333]">
            {/* Geo Location */}
            <div className="flex items-center space-x-1 cursor-pointer hover:border hover:border-black/10 -ml-2 px-2 py-0.5 rounded-[3px] border border-transparent">
              <MapPin className="w-[18px] h-[18px] opacity-60 ml-[-2px] mb-[-4px]" />
              <div className="flex flex-col leading-[1.1]">
                <span className="text-[11px] opacity-60 font-normal">Enviar a</span>
                <span className="text-[14px] font-semibold">Capital Federal</span>
              </div>
            </div>

            {/* Categories */}
            <div className="flex items-center space-x-[18px] ml-4 flex-1">
              <a href="#" className="flex items-center text-black/60 hover:text-[#333] font-normal group">
                Categorías <ChevronDown className="w-3 h-3 ml-1 opacity-50 group-hover:opacity-100" />
              </a>
              <a href="#" className="text-black/60 hover:text-[#333] font-normal">Ofertas</a>
              <a href="#" className="text-black/60 hover:text-[#333] font-normal">Historial</a>
              <a href="#" className="text-black/60 hover:text-[#333] font-normal">Supermercado</a>
              <a href="#" className="text-black/60 hover:text-[#333] font-normal">Moda</a>
              <a href="#" className="text-black/60 hover:text-[#333] font-normal">Vender</a>
              <a href="#" className="text-black/60 hover:text-[#333] font-normal">Ayuda</a>
            </div>

            {/* User Nav */}
            <div className="flex items-center space-x-[18px] justify-end">
              <a href="#" className="text-[#333] hover:text-[#000] font-normal">Crea tu cuenta</a>
              <a href="#" className="text-[#333] hover:text-[#000] font-normal">Ingresa</a>
              <a href="#" className="text-[#333] hover:text-[#000] font-normal">Mis compras</a>
              <a href="#" className="relative group" onClick={addToCart}>
                <Bell className="w-[18px] h-[18px] text-[#333] opacity-80" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#3483fa] text-white text-[10px] rounded-full flex items-center justify-center font-bold">{cartCount}</span>
                )}
              </a>
              <a href="#" className="relative">
                <ShoppingCart className="w-[20px] h-[20px] text-[#333] opacity-80" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* ─── MAIN BODY ─── */}
      <main className="w-full mx-auto">

        {/* Banner with absolute gradient at bottom to match Meli style */}
        <div className="w-full bg-[#1A1A1A] mb-8 relative">
          <img src={data.bannerImage} alt="Meli Banner" className="w-full h-[180px] sm:h-[250px] md:h-[340px] object-cover mx-auto max-w-[1600px]" />
          {/* Fade into #ebebeb */}
          <div className="absolute bottom-0 w-full h-[60px]" style={{ background: 'linear-gradient(to bottom, transparent 0%, #ebebeb 100%)' }}></div>
        </div>

        <div className="w-full max-w-[1200px] mx-auto px-4 lg:px-0 mt-[-50px] relative z-10 pb-16">

          {/* Base Payment Methods (Meli UI Style) */}
          <div className="bg-white rounded-[4px] shadow-[0_1px_1px_0_rgba(0,0,0,.1)] flex flex-wrap md:flex-nowrap p-4 mb-10 overflow-hidden divide-y md:divide-y-0 md:divide-x divide-gray-200">
            <div className="w-full md:w-1/4 p-2 flex items-center justify-between group cursor-pointer hover:bg-[#f7f7f7] transition-colors rounded-sm">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mr-4">
                  <CreditCard className="w-6 h-6 text-[#3483fa]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[15px] text-[#333] font-medium leading-tight mb-1">Tarjeta de crédito</span>
                  <span className="text-[13px] text-[#3483fa] leading-tight">Ver promociones</span>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/4 p-2 flex items-center justify-between group cursor-pointer hover:bg-[#f7f7f7] transition-colors rounded-sm">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mr-4">
                  <CreditCard className="w-6 h-6 text-[#3483fa]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[15px] text-[#333] font-medium leading-tight mb-1">Tarjeta de débito</span>
                  <span className="text-[13px] text-[#3483fa] leading-tight">Ver más</span>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/4 p-2 flex items-center justify-between group cursor-pointer hover:bg-[#f7f7f7] transition-colors rounded-sm">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mr-4">
                  <Search className="w-6 h-6 text-[#3483fa] rotate-90" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[15px] text-[#333] font-medium leading-tight mb-1">Cuotas sin tarjeta</span>
                  <span className="text-[13px] text-[#3483fa] leading-tight">Conoce Mercado Crédito</span>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/4 p-2 flex items-center justify-between group cursor-pointer hover:bg-[#f7f7f7] transition-colors rounded-sm">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mr-4">
                  <Shield className="w-6 h-6 text-[#3483fa]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[15px] text-[#333] font-medium leading-tight mb-1">Efectivo</span>
                  <span className="text-[13px] text-[#3483fa] leading-tight">Ver más</span>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-transparent group-hover:bg-[#ebebeb] transition-colors text-black/50 group-hover:text-[#3483fa]">
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Slider title */}
          <div className="flex items-end space-x-4 mb-4 mt-8">
            <h2 className="text-[24px] font-light text-[#666] leading-none">Basado en tu última visita</h2>
            <a href="#" className="text-[15px] font-normal text-[#3483fa] hover:text-[#1259c3]">Ver historial</a>
          </div>

          {/* Grid View of Products WITH PAGINATION (3x5 = 15 products) */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
            {paginatedItems.map((product, idx) => (
              <div key={`mercadocod-${idx}-${product.id}`} data-product-id={product.id} className="bg-white rounded-[4px] shadow-[0_1px_1px_0_rgba(0,0,0,.1)] hover:shadow-[0_4px_8px_0_rgba(0,0,0,.15)] transition-all cursor-pointer group flex flex-col h-full border border-transparent">
                {/* Envio Gratis Badge Overlay Meli */}
                <div className="relative w-full overflow-hidden border-b border-gray-100 flex items-center justify-center bg-white aspect-square p-4">
                  <img src={product.imageUrl} alt={product.title} className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:opacity-90" />
                  <button 
                    onClick={(e) => { e.stopPropagation(); addToCart(); }}
                    className="absolute bottom-2 right-2 bg-[#3483fa] text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-[14px] flex flex-col flex-1 bg-white border-t border-gray-100">
                  <div className="flex items-center mb-1">
                    <span className="text-[20px] font-normal text-[#333] tabular-nums tracking-tighter shrink-0">$ {product.price}</span>
                    {product.originalPrice && (
                      <span className="text-[13px] text-[#00a650] font-normal ml-2 shrink-0">
                        {(100 - (parseFloat(product.price.replace(/[$,]/g, '')) / parseFloat(product.originalPrice.replace(/[$,]/g, '') || '1') * 100)).toFixed(0)}% OFF
                      </span>
                    )}
                  </div>

                  {/* Discount old price */}
                  {product.originalPrice && (
                    <span className="text-[12px] text-gray-400 line-through mb-1 block">$ {product.originalPrice}</span>
                  )}

                  {/* Meli Shipping Line */}
                  <div className="mb-[6px] flex items-center">
                    <span className="text-[13px] font-semibold text-[#00a650] tracking-tight">Llega gratis mañana</span>
                    {Math.random() > 0.5 && <span className="ml-[6px] text-[#00a650] font-black italic text-[11px] bg-green-100 px-1 rounded-sm"><Zap className="w-3 h-3 inline mr-0.5 text-[#00a650] mb-0.5" />FULL</span>}
                  </div>

                  {/* Title */}
                  <h3 className="text-[14px] text-[#666] font-light leading-[1.3] text-ellipsis line-clamp-2 mt-auto pr-2">{product.title}</h3>
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

          {/* Meli+ Subscription Banner */}
          <div className="bg-gradient-to-r from-[#170e30] via-[#2f195f] to-[#170e30] rounded-[6px] shadow-[0_1px_1px_0_rgba(0,0,0,.1)] px-5 py-4 mb-10 text-white flex flex-col md:flex-row items-center justify-between cursor-pointer group">
            <div className="flex items-center">
              <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center text-[#2f195f] mr-4 shadow-sm group-hover:scale-105 transition-transform">
                <span className="font-extrabold text-[22px] italic tracking-tighter">meli<span className="text-[24px] leading-none">+</span></span>
              </div>
              <div>
                <h3 className="text-[18px] font-semibold tracking-tight">Suscríbete al nivel 6 y obtén Disney+ por $ 2.499/mes</h3>
                <span className="text-[14px] text-gray-300">Descubre más beneficios...</span>
              </div>
            </div>
            <ChevronRight className="w-8 h-8 text-white/50 group-hover:text-white transition-colors" />
          </div>

          {/* Stores section */}
          <div className="flex items-end space-x-4 mb-4 mt-8">
            <h2 className="text-[24px] font-light text-[#666] leading-none">Las mejores tiendas te esperan</h2>
            <a href="#" className="text-[15px] font-normal text-[#3483fa] hover:text-[#1259c3]">Ver tiendas</a>
          </div>

          {/* Categories Blocks */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            <div className="bg-white rounded-[4px] shadow-[0_1px_1px_0_rgba(0,0,0,.1)] overflow-hidden cursor-pointer hover:shadow-[0_4px_8px_0_rgba(0,0,0,.15)] transition-shadow">
              <div className="h-[120px] bg-gray-100 p-6 flex justify-between">
                <div>
                  <h3 className="text-[#333] text-[22px] font-semibold leading-tight w-20">Descubre <br /><span className="font-light">Celulares</span></h3>
                </div>
                <img src={data.products[0]?.imageUrl} className="h-full object-contain mix-blend-multiply drop-shadow-md" />
              </div>
              <div className="bg-white p-3 flex justify-between items-center text-[#3483fa] font-medium text-[14px]">
                Ver más <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            <div className="bg-white rounded-[4px] shadow-[0_1px_1px_0_rgba(0,0,0,.1)] overflow-hidden cursor-pointer hover:shadow-[0_4px_8px_0_rgba(0,0,0,.15)] transition-shadow">
              <div className="h-[120px] bg-red-50 p-6 flex justify-between">
                <div>
                  <h3 className="text-[#333] text-[22px] font-semibold leading-tight w-28">Renueva <br /><span className="font-light">tus espacios</span></h3>
                </div>
                <img src={data.products[1]?.imageUrl} className="h-full object-contain mix-blend-multiply drop-shadow-md" />
              </div>
              <div className="bg-white p-3 flex justify-between items-center text-[#3483fa] font-medium text-[14px]">
                Ver más <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            <div className="bg-white rounded-[4px] shadow-[0_1px_1px_0_rgba(0,0,0,.1)] overflow-hidden cursor-pointer hover:shadow-[0_4px_8px_0_rgba(0,0,0,.15)] transition-shadow">
              <div className="h-[120px] bg-green-50 p-6 flex justify-between">
                <div>
                  <h3 className="text-[#333] text-[22px] font-semibold leading-tight w-20">Ofertas <br /><span className="font-light">en Moda</span></h3>
                </div>
                <img src={data.products[2]?.imageUrl} className="h-full object-contain mix-blend-multiply drop-shadow-md" />
              </div>
              <div className="bg-white p-3 flex justify-between items-center text-[#3483fa] font-medium text-[14px]">
                Ver más <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            <div className="bg-white rounded-[4px] shadow-[0_1px_1px_0_rgba(0,0,0,.1)] overflow-hidden cursor-pointer hover:shadow-[0_4px_8px_0_rgba(0,0,0,.15)] transition-shadow">
              <div className="h-[120px] bg-blue-50 p-6 flex justify-between">
                <div>
                  <h3 className="text-[#333] text-[22px] font-semibold leading-tight w-20">Llega <br /><span className="font-light">mañana</span></h3>
                </div>
                <div className="flex flex-col items-center justify-center bg-white rounded-full w-[80px] h-[80px] shadow-sm ml-auto">
                  <Zap className="w-8 h-8 text-[#00a650]" />
                </div>
              </div>
              <div className="bg-white p-3 flex justify-between items-center text-[#3483fa] font-medium text-[14px]">
                Ver más <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* ─── FOOTER ─── */}
      <footer className="w-full bg-white border-t border-gray-200">

        {/* Value Props Row */}
        <div className="w-full max-w-[1200px] mx-auto px-4 py-10 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 lg:gap-8 divide-y md:divide-y-0 text-center">

            <div className="flex flex-col items-center pt-8 md:pt-0">
              <div className="w-[84px] h-[52px] mb-4 flex items-center justify-center border-b-[3px] border-[#3483fa] pb-4 px-2">
                <CreditCard className="w-10 h-10 text-[#3483fa]" strokeWidth={1.5} />
              </div>
              <h4 className="text-[17px] font-semibold text-[#333] mb-3">Paga con tarjeta o en efectivo</h4>
              <p className="text-[15px] text-[#999] font-normal leading-relaxed mb-4 max-w-[300px]">Con Mercado Pago, tienes meses sin intereses con tarjeta o efectivo en puntos de pago. ¡Y siempre es seguro!</p>
              <a href="#" className="text-[13px] text-[#3483fa] hover:text-[#1259c3] font-medium transition-colors">Cómo pagar con Mercado Pago</a>
            </div>

            <div className="flex flex-col items-center pt-8 md:pt-0 border-t md:border-t-0 md:border-l border-gray-200">
              <div className="w-[84px] h-[52px] mb-4 flex items-center justify-center border-b-[3px] border-[#3483fa] pb-4 px-2">
                <Truck className="w-10 h-10 text-[#3483fa]" strokeWidth={1.5} />
              </div>
              <h4 className="text-[17px] font-semibold text-[#333] mb-3">Envío gratis desde $ 23.000</h4>
              <p className="text-[15px] text-[#999] font-normal leading-relaxed mb-4 max-w-[300px]">Solo por estar registrado en MercadoCOD tienes envíos gratis en miles de productos. Es un beneficio de Mercado Puntos.</p>
              <a href="#" className="text-[13px] text-[#3483fa] hover:text-[#1259c3] font-medium transition-colors">Conoce más sobre este beneficio</a>
            </div>

            <div className="flex flex-col items-center pt-8 md:pt-0 border-t md:border-t-0 md:border-l border-gray-200">
              <div className="w-[84px] h-[52px] mb-4 flex items-center justify-center border-b-[3px] border-[#3483fa] pb-4 px-2">
                <Shield className="w-10 h-10 text-[#3483fa]" strokeWidth={1.5} />
              </div>
              <h4 className="text-[17px] font-semibold text-[#333] mb-3">Seguridad, de principio a fin</h4>
              <p className="text-[15px] text-[#999] font-normal leading-relaxed mb-4 max-w-[300px]">¿No te gusta? ¡Devuélvelo! En MercadoCOD, no hay nada que no puedas hacer, porque estás siempre protegido.</p>
              <a href="#" className="text-[13px] text-[#3483fa] hover:text-[#1259c3] font-medium transition-colors">Cómo te protegemos</a>
            </div>

          </div>
        </div>

        {/* Legal Text */}
        <div className="border-t border-[#ebebeb] bg-white pt-6 pb-12 text-[#999] text-[13px]">
          <div className="max-w-[1200px] mx-auto px-4">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4 font-normal text-[#333]">
              <a href="#" className="hover:text-[#999]">Trabaja con nosotros</a>
              <a href="#" className="hover:text-[#999]">Términos y condiciones</a>
              <a href="#" className="hover:text-[#999]">Cómo cuidamos tu privacidad</a>
              <a href="#" className="hover:text-[#999]">Accesibilidad</a>
              <a href="#" className="hover:text-[#999]">Información al usuario financiero</a>
              <a href="#" className="hover:text-[#999]">Ayuda</a>
              <a href="#" className="hover:text-[#999]">Defensa del Consumidor</a>
              <a href="#" className="hover:text-[#999]">Información sobre seguros</a>
            </div>

            <p className="mb-2">Copyright © 1999-2026 {data.name} S.R.L.</p>
            <p>Av. Caseros 3039, Piso 2, CP 1264, Parque Patricios, CABA</p>
          </div>
        </div>

      </footer>
    </div>
  );
}

const ChevronDown = ({ className }: { className?: string }) => (
  <svg className={className} width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 4L6 9L11 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
