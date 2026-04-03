'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { StoreData, Product } from '@/lib/types';
import { useCart } from '@/contexts/CartContext';
import { Menu, X, ShoppingBag, Search, Heart, ChevronDown, Star, ArrowRight } from 'lucide-react';
import { usePagination, ProductPagination } from '@/components/componentes-compartidos/templates/Pagination';
import { StoreFooter } from '@/components/componentes-compartidos/templates/StoreFooter';

export default function HypeDropTemplate({ data }: { data: StoreData }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const { addToCart: addToCartContext, itemCount, setIsCartOpen } = useCart();
  const [favorites, setFavorites] = useState<string[]>([]);
  const itemsPerPage = 15; // 3 rows x 5 columns

  const handleAddToCart = (product: Product, e?: React.MouseEvent) => { if (e) e.stopPropagation(); addToCartContext(product); };

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  // Filter products by category
  const filteredProducts = activeCategory === 'All' 
    ? data.products 
    : data.products.filter(p => p.category === activeCategory);

  const {
    currentPage,
    totalPages,
    paginatedItems,
    handlePageChange,
    totalItems,
  } = usePagination(filteredProducts, itemsPerPage);

  const categories = ['All', ...Array.from(new Set(data.products.map(p => p.category).filter(Boolean)))];

  return (
    <div className="min-h-full bg-white font-sans text-black selection:bg-[#da291c] selection:text-white">
      {/* ─── HEADER ─── */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        {/* Top Bar */}
        <div className="bg-[#da291c] text-white text-xs py-2 px-4 text-center font-medium">
          ENVÍO GRATIS EN PEDIDOS +$100 • NUEVOS DROPS CADA SEMANA
        </div>

        {/* Main Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Mobile Menu */}
            <button 
              className="lg:hidden p-2 -ml-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Logo */}
            <a href="#" className="flex-shrink-0">
              <span className="font-black text-2xl tracking-tighter italic text-[#da291c]">
                {data.logoText || 'HypeDrop'}
              </span>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center space-x-8">
              <a href="#" className="text-sm font-bold hover:text-[#da291c] transition-colors">New Arrivals</a>
              <a href="#" className="text-sm font-bold hover:text-[#da291c] transition-colors">Colecciones</a>
              <a href="#" className="text-sm font-bold hover:text-[#da291c] transition-colors">Ofertas</a>
              <a href="#" className="text-sm font-bold hover:text-[#da291c] transition-colors">Lookbook</a>
              <a href="#" className="text-sm font-bold hover:text-[#da291c] transition-colors">About</a>
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors hidden sm:block">
                <Search className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors" onClick={() => toggleFavorite('header')}>
                <Heart className={`w-5 h-5 ${favorites.length > 0 ? 'fill-red-500 text-red-500' : ''}`} />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative" onClick={() => setIsCartOpen(true)}>
                <ShoppingBag className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#da291c] text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            <nav className="flex flex-col py-4 px-4 space-y-4">
              <a href="#" className="text-sm font-bold py-2">New Arrivals</a>
              <a href="#" className="text-sm font-bold py-2">Colecciones</a>
              <a href="#" className="text-sm font-bold py-2">Ofertas</a>
              <a href="#" className="text-sm font-bold py-2">Lookbook</a>
              <a href="#" className="text-sm font-bold py-2">About</a>
            </nav>
          </div>
        )}
      </header>

      {/* ─── HERO SECTION ─── */}
      <section className="relative bg-black text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={data.bannerImage}
            alt="HypeDrop Banner"
            fill
            className="object-cover opacity-60"
            priority
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-24 md:py-32">
          <div className="max-w-2xl">
            <span className="inline-block bg-[#da291c] text-white text-xs font-bold px-3 py-1 mb-4">
              NUEVA COLECCIÓN 2026
            </span>
            <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter mb-4">
              {data.name}
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg">
              {data.description || 'Descubre lo último en streetwear. Drops exclusivos cada semana.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-black px-8 py-4 font-bold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                Comprar Ahora
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="border border-white text-white px-8 py-4 font-bold hover:bg-white hover:text-black transition-colors">
                Ver Lookbook
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURED CATEGORIES ─── */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Streetwear', 'Accesorios', 'Calzado', 'Ediciones Limitadas'].map((cat, i) => (
              <a 
                key={cat} 
                href="#" 
                className="group relative bg-white aspect-[4/3] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <Image
                  src={`https://picsum.photos/400/300?random=${100 + i}`}
                  alt={cat}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-bold">{cat}</h3>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* ─── CATEGORY FILTER ─── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <h2 className="text-2xl font-black italic tracking-tighter">
            TODOS LOS PRODUCTOS
          </h2>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
            <span className="text-sm text-gray-500 whitespace-nowrap">Filtrar:</span>
            {categories.slice(0, 5).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  handlePageChange(1);
                }}
                className={`px-4 py-2 text-sm font-bold rounded-full whitespace-nowrap transition-colors ${
                  activeCategory === cat
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ─── PRODUCT GRID (3x5 = 15 products) ─── */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 md:gap-4">
          {paginatedItems.map((product, idx) => (
            <div 
              key={product.id || idx} 
              data-product-id={product.id}
              className="group cursor-pointer"
            >
              <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden mb-2">
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  fill
                  className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                />
                {/* Hover overlay with actions */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button onClick={(e) => handleAddToCart(product, e)} className="bg-white text-black p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <ShoppingBag className="w-5 h-5" />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }} className="bg-white text-black p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <Heart className={`w-5 h-5 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>
                </div>
                {/* Badge */}
                {idx % 3 === 0 && (
                  <span className="absolute top-2 left-2 bg-[#da291c] text-white text-[10px] font-bold px-2 py-0.5">
                    HOT
                  </span>
                )}
              </div>
              <h3 className="text-xs font-bold line-clamp-1 group-hover:text-[#da291c] transition-colors">
                {product.title}
              </h3>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-sm font-bold">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-xs text-gray-500 line-through">${product.originalPrice}</span>
                )}
              </div>
              {/* Rating */}
              <div className="flex items-center gap-1 mt-1">
                <div className="flex text-yellow-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      className={`w-3 h-3 ${star <= 4 ? 'fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="text-[10px] text-gray-500">({product.reviews || 12})</span>
              </div>
            </div>
          ))}
        </div>

        {/* ─── PAGINATION ─── */}
        {totalPages > 1 && (
          <ProductPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
          />
        )}
      </main>

      {/* ─── TRENDING DROPS ─── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-black italic tracking-tighter mb-2">DROPS DE LA SEMANA 🔥</h2>
          <p className="text-sm text-gray-500 mb-8">Las piezas más buscadas de esta semana</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {data.products.slice(0, 4).map((product, idx) => (
              <div key={`drop-${product.id || idx}`} className="group cursor-pointer bg-gray-50 rounded-lg overflow-hidden">
                <div className="relative aspect-square">
                  <Image src={product.imageUrl} alt={product.title} fill className="object-contain p-4 group-hover:scale-105 transition-transform duration-300" referrerPolicy="no-referrer" />
                  <span className="absolute top-2 left-2 bg-[#da291c] text-white text-[10px] font-bold px-2 py-0.5 rounded">DROP #{idx + 1}</span>
                  <button onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }} className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity">
                    <Heart className={`w-4 h-4 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                  </button>
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-bold line-clamp-1">{product.title}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-bold">${product.price}</span>
                    <button onClick={(e) => handleAddToCart(product, e)} className="bg-black text-white text-[10px] font-bold px-3 py-1.5 rounded hover:bg-[#da291c] transition-colors">Agregar</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── LOOKBOOK BANNER ─── */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden group">
        <Image src="https://picsum.photos/1600/500?random=1301" alt="Lookbook" fill className="object-cover group-hover:scale-[1.02] transition-transform duration-[3000ms]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
            <span className="inline-block bg-[#da291c] text-white text-xs font-bold px-3 py-1 mb-4">LOOKBOOK 2026</span>
            <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter text-white mb-4">Street Culture</h2>
            <p className="text-gray-300 text-lg mb-8 max-w-md">Explora nuestra última colección inspirada en la cultura urbana.</p>
            <button className="bg-white text-black px-8 py-3 font-bold hover:bg-gray-100 transition-colors flex items-center gap-2">
              Ver Lookbook <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* ─── BRAND VALUES ─── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { emoji: '🚀', title: 'Envío Express', desc: 'Entrega en 24-48h' },
              { emoji: '🔄', title: 'Devolución Gratis', desc: '30 días sin preguntas' },
              { emoji: '🔒', title: 'Pago Seguro', desc: 'Encriptación SSL' },
              { emoji: '💬', title: 'Soporte 24/7', desc: 'Siempre disponibles' },
            ].map((val, i) => (
              <div key={i} className="p-6">
                <div className="text-3xl mb-3">{val.emoji}</div>
                <h4 className="font-bold text-sm mb-1">{val.title}</h4>
                <p className="text-xs text-gray-500">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COLLAB SPOTLIGHT ─── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <Image src="https://picsum.photos/600/600?random=1302" alt="Collab" fill className="object-cover" />
            </div>
            <div className="p-4 md:p-8">
              <span className="inline-block bg-black text-white text-xs font-bold px-3 py-1 mb-4">COLLAB EXCLUSIVA</span>
              <h2 className="text-3xl md:text-4xl font-black italic tracking-tighter mb-4">HypeDrop × Urban Artist</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">Una colaboración única que fusiona el streetwear con el arte urbano. Piezas limitadas que no encontrarás en ningún otro lugar.</p>
              <div className="flex items-center gap-4 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-black">12</div>
                  <div className="text-[10px] font-bold text-gray-500 uppercase">Piezas</div>
                </div>
                <div className="w-px h-10 bg-gray-200"></div>
                <div className="text-center">
                  <div className="text-2xl font-black">500</div>
                  <div className="text-[10px] font-bold text-gray-500 uppercase">Unidades</div>
                </div>
                <div className="w-px h-10 bg-gray-200"></div>
                <div className="text-center">
                  <div className="text-2xl font-black text-[#da291c]">HOT</div>
                  <div className="text-[10px] font-bold text-gray-500 uppercase">Status</div>
                </div>
              </div>
              <button className="bg-[#da291c] text-white px-8 py-3 font-bold hover:bg-red-700 transition-colors">Comprar Colección</button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SIZE GUIDE ─── */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-black italic tracking-tighter mb-4">GUÍA DE TALLAS</h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">Encuentra tu talla perfecta con nuestra guía interactiva</p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3 max-w-2xl mx-auto mb-8">
            {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
              <div key={size} className="border border-gray-700 py-4 text-center font-bold hover:border-[#da291c] hover:text-[#da291c] cursor-pointer transition-colors rounded">
                {size}
              </div>
            ))}
          </div>
          <button className="border border-white text-white px-8 py-3 font-bold hover:bg-white hover:text-black transition-colors">Ver Guía Completa</button>
        </div>
      </section>

      {/* ─── INSTAGRAM FEED ─── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-black italic tracking-tighter mb-2">@HYPEDROP</h2>
          <p className="text-sm text-gray-500 mb-8">Síguenos en Instagram para más inspiración</p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {[1303, 1304, 1305, 1306, 1307, 1308].map(seed => (
              <div key={seed} className="relative aspect-square overflow-hidden group cursor-pointer">
                <Image src={`https://picsum.photos/300/300?random=${seed}`} alt="Instagram" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NEWSLETTER SECTION ─── */}
      <section className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black italic tracking-tighter mb-4">
            ÚNETE AL CLUB
          </h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Sé el primero en conocer nuevos drops, ofertas exclusivas y collabs especiales.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Tu email"
              className="flex-1 px-4 py-3 bg-white text-black rounded-none font-medium focus:outline-none focus:ring-2 focus:ring-[#da291c]"
            />
            <button className="px-6 py-3 bg-[#da291c] text-white font-bold hover:bg-red-700 transition-colors">
              SUSCRIBIRSE
            </button>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <StoreFooter data={data} variant="dark" accentColor="#da291c" />
    </div>
  );
}


