'use client';

import React, { useState } from 'react';
import { StoreData, Product } from '@/lib/types';
import { useCart } from '@/contexts/CartContext';
import { Search, MapPin, ShoppingCart, CreditCard, Shield, Truck, Bell, Menu, Zap, X, ChevronRight, Heart, Star, Facebook, Twitter, Instagram, Youtube, HelpCircle, Tag, Gift, ArrowRight } from 'lucide-react';
import { usePagination, ProductPagination } from '@/components/componentes-compartidos/templates/Pagination';

export default function MercadoCODTemplate({ data }: { data: StoreData }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { addToCart: addToCartContext, itemCount, setIsCartOpen } = useCart();
  const [favorites, setFavorites] = useState<string[]>([]);

  const itemsPerPage = 15;
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
    <div className="min-h-full bg-[#ebebeb] font-sans text-[#333] overflow-x-hidden">

      {/* ─── PROMO TOP BAR ─── */}
      <div className="bg-[#fff159] text-[#333] text-[12px] py-2 px-4 flex justify-center items-center font-semibold tracking-normal">
        <Zap className="w-3.5 h-3.5 mr-1.5 text-[#3483fa]" />
        Envío gratis en miles de productos | Hasta 12 cuotas sin interés
      </div>

      {/* ─── HEADER ─── */}
      <header className="bg-[#fff159] sticky top-0 z-50 shadow-[0_1px_1px_0_rgba(0,0,0,.1)]">
        <div className="w-full max-w-[1200px] mx-auto px-3 md:px-0">
          {/* Top Row */}
          <div className="flex items-center justify-between pt-[8px] md:pt-[11px] pb-[8px] md:pb-[11px] gap-4 md:gap-8 lg:gap-14">
            <div className="font-extrabold text-[24px] tracking-tighter text-[#2d3277] shrink-0 flex items-center cursor-pointer">
              <span className="mt-1">{data.logoText || 'MercadoCOD'}</span>
            </div>

            <div className="flex-1 max-w-[600px] relative shadow-[0_1px_2px_0_rgba(0,0,0,.2)] rounded-[2px] overflow-hidden bg-white h-[40px] flex items-center focus-within:ring-1 focus-within:ring-[#3483fa]">
              <input
                type="text"
                placeholder="Buscar productos, marcas y más..."
                className="flex-1 px-[15px] py-[7px] text-[15px] text-[#333] font-normal outline-none placeholder-gray-400 h-full"
              />
              <div className="w-[1px] h-[26px] bg-[#e6e6e6]" />
              <button className="w-[45px] h-full bg-white flex items-center justify-center text-[#666] hover:text-[#333] transition-colors">
                <Search className="w-5 h-5 opacity-70" />
              </button>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => toggleFavorite('header')}
                className="relative cursor-pointer hidden sm:block"
              >
                <Heart className={`w-6 h-6 ${favorites.length > 0 ? 'fill-red-500 text-red-500' : 'text-[#333]/60'}`} />
                {favorites.length > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full">{favorites.length}</span>
                )}
              </button>
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative cursor-pointer"
              >
                <ShoppingCart className="w-6 h-6 text-[#333]/60 hover:text-[#333] transition-colors" />
                {itemCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-[#3483fa] text-white text-[9px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#fff159]">{itemCount}</span>
                )}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden text-[#333]"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Bottom Row: Navigation */}
          <div className="hidden md:flex items-end justify-between pb-[12px] text-[13px] text-[#333]">
            <div className="flex items-center space-x-1 -ml-2 px-2 py-0.5 rounded-[3px] cursor-pointer">
              <MapPin className="w-[18px] h-[18px] opacity-60 ml-[-2px] mb-[-4px]" />
              <div className="flex flex-col leading-[1.1]">
                <span className="text-[11px] opacity-60 font-normal">Enviar a</span>
                <span className="text-[14px] font-semibold">Tu ubicación</span>
              </div>
            </div>
            <div className="flex items-center space-x-[18px] ml-4 flex-1">
              {['Categorías', 'Ofertas', 'Historial', 'Supermercado', 'Moda', 'Vender', 'Ayuda'].map(item => (
                <span key={item} className="text-black/60 font-normal cursor-pointer hover:text-black transition-colors">{item}</span>
              ))}
            </div>
            <div className="flex items-center space-x-[18px] justify-end">
              <span className="text-[#333] font-normal cursor-pointer hover:text-[#3483fa]">Crea tu cuenta</span>
              <span className="text-[#333] font-normal cursor-pointer hover:text-[#3483fa]">Ingresá</span>
              <span className="text-[#333] font-normal cursor-pointer hover:text-[#3483fa]">Mis compras</span>
              <Bell className="w-[18px] h-[18px] text-[#333] opacity-80 cursor-pointer" />
            </div>
          </div>
        </div>
      </header>

      {/* ─── MAIN BODY ─── */}
      <main className="w-full mx-auto">

        {/* ─── 1. HERO BANNER ─── */}
        <div className="w-full bg-[#1A1A1A] mb-8 relative">
          <img src={data.bannerImage} alt="Banner" className="w-full h-[180px] sm:h-[250px] md:h-[340px] object-cover mx-auto max-w-[1600px]" />
          <div className="absolute bottom-0 w-full h-[60px]" style={{ background: 'linear-gradient(to bottom, transparent 0%, #ebebeb 100%)' }} />
        </div>

        <div className="w-full max-w-[1200px] mx-auto px-4 lg:px-0 mt-[-50px] relative z-10 pb-16">

          {/* ─── 2. PAYMENT METHODS ─── */}
          <div className="bg-white rounded-[4px] shadow-[0_1px_1px_0_rgba(0,0,0,.1)] flex flex-wrap md:flex-nowrap p-4 mb-10 overflow-hidden divide-y md:divide-y-0 md:divide-x divide-gray-200">
            {[
              { title: 'Tarjeta de crédito', sub: 'Ver promociones' },
              { title: 'Tarjeta de débito', sub: 'Ver más' },
              { title: 'Cuotas sin tarjeta', sub: 'Ver más' },
              { title: 'Efectivo', sub: 'Ver más' },
            ].map((item, idx) => (
              <div key={idx} className="w-full md:w-1/4 p-2 flex items-center cursor-pointer hover:bg-[#f7f7f7] transition-colors rounded-sm">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mr-4 shrink-0">
                  <CreditCard className="w-6 h-6 text-[#3483fa]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[15px] text-[#333] font-medium leading-tight mb-1">{item.title}</span>
                  <span className="text-[13px] text-[#3483fa] leading-tight">{item.sub}</span>
                </div>
              </div>
            ))}
          </div>

          {/* ─── 3. PRODUCT GRID ─── */}
          <div className="flex items-end space-x-4 mb-4 mt-8">
            <h2 className="text-[24px] font-light text-[#666] leading-none">Basado en tu última visita ({totalItems})</h2>
            <span className="text-[15px] font-normal text-[#3483fa] cursor-pointer hover:text-[#1259c3]">Ver historial</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
            {paginatedItems.map((product: any, idx: number) => (
              <div
                key={`mercadocod-${idx}-${product.id}`}
                data-product-id={product.id}
                className="bg-white rounded-[4px] shadow-[0_1px_1px_0_rgba(0,0,0,.1)] transition-all duration-300 group flex flex-col h-full border-2 border-transparent hover:border-gray-200 cursor-pointer hover:shadow-[0_8px_16px_0_rgba(0,0,0,.12)]"
              >
                <div className="relative w-full overflow-hidden flex items-center justify-center bg-white aspect-square p-3">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="max-w-full max-h-full w-auto h-auto object-contain"
                  />
                  {product.discount && product.discount > 0 && (
                    <span className="absolute top-3 left-3 bg-[#3483fa] text-white text-[11px] font-bold px-2 py-1 rounded-full shadow-md">
                      -{product.discount}%
                    </span>
                  )}
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }}
                    className="absolute top-3 right-3 p-1.5 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-sm"
                  >
                    <Heart className={`w-4 h-4 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                  </button>
                  <button
                    onClick={(e) => handleAddToCart(product, e)}
                    className="absolute bottom-3 right-3 p-2.5 rounded-full bg-[#3483fa] hover:bg-[#2968c8] text-white opacity-0 group-hover:opacity-100 transition-all shadow-lg hover:shadow-xl transform hover:scale-110"
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-[14px] flex flex-col flex-1 bg-white border-t border-gray-100">
                  {product.originalPrice && (
                    <span className="text-[12px] text-gray-400 line-through mb-1 block">
                      $ {Math.floor(product.originalPrice).toLocaleString()}
                    </span>
                  )}
                  <div className="flex items-center mb-1">
                    <span className="text-[20px] font-normal text-[#333] tabular-nums tracking-tighter shrink-0">
                      $ {Math.floor(product.price).toLocaleString()}
                    </span>
                    {product.discount && product.discount > 0 && (
                      <span className="text-[13px] text-[#00a650] font-normal ml-2 shrink-0">
                        {product.discount}% OFF
                      </span>
                    )}
                  </div>
                  <div className="mb-[6px] flex items-center">
                    <span className="text-[13px] font-semibold text-[#00a650] tracking-tight">Envío gratis</span>
                    {product.discount && product.discount > 5 && (
                      <span className="ml-[6px] text-[#00a650] font-black italic text-[11px] bg-green-100 px-1 rounded-sm">
                        <Zap className="w-3 h-3 inline mr-0.5 text-[#00a650] mb-0.5" />FULL
                      </span>
                    )}
                  </div>
                  <h3 className="text-[14px] font-light leading-[1.3] text-ellipsis line-clamp-2 mt-auto pr-2 text-[#666]">{product.title}</h3>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <ProductPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
            />
          )}

          {/* ─── 4. OFERTAS DEL DÍA ─── */}
          <div className="bg-white rounded-[4px] shadow-[0_1px_1px_0_rgba(0,0,0,.1)] p-5 mb-6 mt-6">
            <div className="flex items-center space-x-3 mb-4">
              <h2 className="text-[24px] font-light text-[#666]">Ofertas del día</h2>
              <span className="bg-[#3483fa] text-white text-[12px] font-semibold px-3 py-1 rounded-full">Termina en 08:45:12</span>
            </div>
            <div className="flex overflow-x-auto space-x-4 pb-2 [&::-webkit-scrollbar]:hidden">
              {data.products.slice(0, 4).map((p, i) => (
                <div key={`oferta-dia-${i}`} data-product-id={p.id} className="shrink-0 w-[220px] bg-white rounded-[4px] border border-gray-100 overflow-hidden cursor-pointer group hover:shadow-md transition-all">
                  <div className="relative aspect-square bg-white flex items-center justify-center p-4">
                    <img src={p.imageUrl} alt={p.title} className="max-h-full max-w-full object-contain" />
                    {p.originalPrice && (
                      <div className="absolute top-2 left-2 bg-[#00a650] text-white text-[12px] font-bold px-2 py-1 rounded-full">
                        -{Math.round((1 - p.price / p.originalPrice) * 100)}%
                      </div>
                    )}
                  </div>
                  <div className="p-3 border-t border-gray-100">
                    <div className="text-[20px] font-normal text-[#333]">$ {Math.floor(p.price).toLocaleString()}</div>
                    {p.originalPrice && (
                      <div className="text-[13px] text-gray-400 line-through">$ {Math.floor(p.originalPrice).toLocaleString()}</div>
                    )}
                    <div className="w-full bg-gray-100 h-[6px] rounded-full mt-2 overflow-hidden">
                      <div className="bg-[#3483fa] h-full rounded-full" style={{ width: `${50 + i * 12}%` }} />
                    </div>
                    <span className="text-[11px] text-[#3483fa] font-semibold mt-1 block">{50 + i * 12}% vendido</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ─── 5. CATEGORÍAS POPULARES ─── */}
          <div className="bg-white rounded-[4px] shadow-[0_1px_1px_0_rgba(0,0,0,.1)] p-5 mb-6">
            <h2 className="text-[24px] font-light text-[#666] mb-4">Categorías populares</h2>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {['Celulares', 'Computación', 'Electrodomésticos', 'Herramientas', 'Deportes', 'Moda'].map((cat, i) => (
                <div key={`mcat-${i}`} className="rounded-[4px] p-4 flex flex-col items-center cursor-pointer group transition-all hover:shadow-md hover:bg-[#f5f5f5]">
                  <div className="w-[56px] h-[56px] bg-[#ebebeb] rounded-full flex items-center justify-center mb-2 group-hover:bg-[#3483fa]/10 transition-colors overflow-hidden p-1">
                    {data.products[i % data.products.length] && (
                      <img src={data.products[i % data.products.length].imageUrl} alt={cat} className="w-full h-full object-contain mix-blend-multiply" />
                    )}
                  </div>
                  <span className="text-[13px] text-[#333] font-medium text-center group-hover:text-[#3483fa] transition-colors">{cat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ─── 6. BENEFICIOS DE COMPRA ─── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
            {[
              { icon: Truck, title: 'Envío gratis', desc: 'En miles de productos seleccionados', color: 'text-[#00a650]', bg: 'bg-green-50' },
              { icon: Shield, title: 'Compra protegida', desc: 'Recibe el producto o te devolvemos tu dinero', color: 'text-[#3483fa]', bg: 'bg-blue-50' },
              { icon: CreditCard, title: 'Hasta 12 cuotas', desc: 'Sin interés con tarjetas seleccionadas', color: 'text-[#f73]', bg: 'bg-orange-50' },
            ].map((item, idx) => (
              <div key={`benefit-${idx}`} className={`${item.bg} rounded-[4px] p-4 flex items-center gap-4 cursor-pointer hover:shadow-sm transition-all`}>
                <div className={`w-10 h-10 rounded-full bg-white flex items-center justify-center ${item.color} shadow-sm shrink-0`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[14px] font-semibold text-[#333]">{item.title}</h4>
                  <p className="text-[12px] text-[#999]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ─── 7. VISTO RECIENTEMENTE ─── */}
          <div className="bg-white rounded-[4px] shadow-[0_1px_1px_0_rgba(0,0,0,.1)] p-5 mb-6">
            <div className="flex items-end space-x-4 mb-3">
              <h2 className="text-[20px] font-light text-[#666]">Visto recientemente</h2>
              <span className="text-[14px] text-[#3483fa] hover:text-[#1259c3] cursor-pointer">Ver historial</span>
            </div>
            <div className="flex overflow-x-auto space-x-3 pb-2 [&::-webkit-scrollbar]:hidden">
              {data.products.slice(3, 9).map((p, i) => (
                <div key={`visto-${i}`} data-product-id={p.id} className="shrink-0 w-[120px] cursor-pointer group">
                  <div className="aspect-square bg-white border border-gray-100 rounded-[4px] flex items-center justify-center p-2 mb-1 group-hover:border-[#3483fa] transition-colors">
                    <img src={p.imageUrl} alt={p.title} className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="text-[14px] font-normal text-[#333]">$ {Math.floor(p.price).toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ─── 8. MELI+ BANNER ─── */}
          <div className="bg-gradient-to-r from-[#170e30] via-[#2f195f] to-[#170e30] rounded-[6px] shadow-[0_1px_1px_0_rgba(0,0,0,.1)] px-5 py-4 mb-6 text-white flex flex-col md:flex-row items-center justify-between group cursor-pointer">
            <div className="flex items-center">
              <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center text-[#2f195f] mr-4 shadow-sm group-hover:scale-105 transition-transform">
                <span className="font-extrabold text-[22px] italic tracking-tighter">meli<span className="text-[24px] leading-none">+</span></span>
              </div>
              <div>
                <h3 className="text-[18px] font-semibold tracking-tight">Suscríbete al nivel 6</h3>
                <span className="text-[14px] text-gray-300">Obtén Disney+ incluido</span>
              </div>
            </div>
            <ChevronRight className="w-8 h-8 text-white/50 group-hover:text-white transition-colors" />
          </div>

          {/* ─── 9. PRODUCTOS DESTACADOS ─── */}
          <div className="bg-white rounded-[4px] shadow-[0_1px_1px_0_rgba(0,0,0,.1)] p-5 mb-6">
            <div className="flex items-end space-x-4 mb-4">
              <h2 className="text-[24px] font-light text-[#666] leading-none">Productos destacados</h2>
              <span className="text-[15px] font-normal text-[#3483fa] cursor-pointer hover:text-[#1259c3]">Ver todos</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {data.products.slice(0, 4).map((p, i) => (
                <div key={`destacado-${i}`} data-product-id={p.id} className="bg-white border border-gray-100 rounded-[4px] overflow-hidden cursor-pointer group hover:shadow-md transition-all">
                  <div className="relative aspect-square bg-white flex items-center justify-center p-4">
                    <img src={p.imageUrl} alt={p.title} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-2 left-2 bg-[#ff7733] text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                      <Star className="w-3 h-3 fill-white" /> Destacado
                    </div>
                  </div>
                  <div className="p-3 border-t border-gray-100">
                    <h3 className="text-[13px] font-normal text-[#666] line-clamp-2 mb-2 leading-tight">{p.title}</h3>
                    <div className="text-[20px] font-normal text-[#333]">$ {Math.floor(p.price).toLocaleString()}</div>
                    <div className="text-[12px] text-[#00a650] font-semibold mt-1">Envío gratis</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ─── 10. SUSCRIPCIÓN PROMO ─── */}
          <div className="bg-gradient-to-r from-[#a90f90] to-[#6b14d0] rounded-[6px] p-6 mb-6 text-white flex flex-col md:flex-row items-center justify-between gap-4 cursor-pointer group">
            <div className="flex items-center gap-4">
              <Gift className="w-8 h-8 text-white/80" />
              <div>
                <h3 className="text-[18px] font-bold">Suscribite al Nivel 6</h3>
                <p className="text-[13px] text-white/70 mt-1">Disney+, Star+, Paramount+ y más. Todo incluido en tu suscripción.</p>
              </div>
            </div>
            <button className="bg-white text-[#6b14d0] font-bold text-[13px] px-6 py-2.5 rounded-[4px] hover:bg-gray-100 transition-colors shrink-0">
              Conocer más
            </button>
          </div>

          {/* ─── 11. TIENDAS OFICIALES ─── */}
          <div className="bg-white rounded-[4px] shadow-[0_1px_1px_0_rgba(0,0,0,.1)] p-5 mb-6">
            <div className="flex items-end space-x-4 mb-4">
              <h2 className="text-[24px] font-light text-[#666] leading-none">Tiendas oficiales</h2>
              <span className="text-[15px] font-normal text-[#3483fa] cursor-pointer hover:text-[#1259c3]">Ver todas</span>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {['Samsung', 'Apple', 'Nike', 'Adidas', 'Sony', 'LG'].map((brand, i) => (
                <div key={`brand-mc-${i}`} className="bg-[#f5f5f5] rounded-[4px] p-4 flex flex-col items-center justify-center h-[80px] cursor-pointer hover:shadow-md hover:bg-white transition-all border border-transparent hover:border-[#3483fa]/20">
                  <span className="text-[15px] font-bold text-[#333]">{brand}</span>
                  <span className="text-[11px] text-[#3483fa] mt-1">Tienda oficial</span>
                </div>
              ))}
            </div>
          </div>

          {/* ─── 12. CUPONES Y DESCUENTOS ─── */}
          <div className="bg-white rounded-[4px] shadow-[0_1px_1px_0_rgba(0,0,0,.1)] p-5 mb-6">
            <h2 className="text-[24px] font-light text-[#666] mb-4">Cupones y descuentos</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: '15% OFF', desc: 'En tu primera compra con tarjeta de crédito', code: 'PRIMERA15', color: 'from-[#3483fa] to-[#1259c3]' },
                { title: 'Envío gratis', desc: 'En compras mayores a $50.000', code: 'ENVIOGRATIS', color: 'from-[#00a650] to-[#008040]' },
                { title: '10% OFF', desc: 'En electrónica y tecnología', code: 'TECH10', color: 'from-[#ff7733] to-[#e55a1b]' },
              ].map((coupon, i) => (
                <div key={`coupon-${i}`} className={`bg-gradient-to-r ${coupon.color} rounded-[6px] p-5 text-white cursor-pointer hover:shadow-lg transition-all group`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Tag className="w-5 h-5" />
                    <span className="text-[22px] font-bold">{coupon.title}</span>
                  </div>
                  <p className="text-[13px] text-white/80 mb-3">{coupon.desc}</p>
                  <div className="bg-white/20 rounded-[4px] px-3 py-1.5 text-[12px] font-bold tracking-wider inline-block">
                    Código: {coupon.code}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* ─── FOOTER ─── */}
      <footer className="w-full bg-white border-t border-gray-200">
        <div className="w-full max-w-[1200px] mx-auto px-4 py-10 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 lg:gap-8 divide-y md:divide-y-0 text-center">
            {[
              { icon: CreditCard, title: 'Pago seguro', desc: 'Paga con tarjeta, débito o efectivo. Tu información siempre protegida.' },
              { icon: Truck, title: 'Envío gratis', desc: 'En miles de productos seleccionados. Recibe en tu domicilio.' },
              { icon: Shield, title: 'Garantía de satisfacción', desc: 'Tu compra está protegida. Si no te gusta, te ayudamos a resolverlo.' },
            ].map((item, idx) => (
              <div key={idx} className={`flex flex-col items-center pt-8 md:pt-0 ${idx > 0 ? 'border-t md:border-t-0 md:border-l border-gray-200' : ''}`}>
                <div className="w-[84px] h-[52px] mb-4 flex items-center justify-center border-b-[3px] border-[#3483fa] pb-4 px-2">
                  <item.icon className="w-10 h-10 text-[#3483fa]" strokeWidth={1.5} />
                </div>
                <h4 className="text-[17px] font-semibold text-[#333] mb-3">{item.title}</h4>
                <p className="text-[15px] text-[#999] font-normal leading-relaxed mb-4 max-w-[300px]">{item.desc}</p>
                <span className="text-[13px] text-[#3483fa] hover:text-[#1259c3] cursor-pointer font-medium transition-colors">
                  Ver más
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-[#ebebeb] bg-white pt-6 pb-12 text-[#999] text-[13px]">
          <div className="max-w-[1200px] mx-auto px-4">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4 font-normal text-[#333]">
              {['Trabaja con nosotros', 'Términos y condiciones', 'Privacidad', 'Accesibilidad', 'Ayuda', 'Defensa del Consumidor'].map((text, idx) => (
                <span key={idx} className="hover:text-[#999] cursor-pointer">{text}</span>
              ))}
            </div>
            <p className="mb-2">Copyright © 1999-2026 {data.name} S.R.L.</p>
            <p>Av. Caseros 3039, Piso 2, CP 1264, Parque Patricios, CABA</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

