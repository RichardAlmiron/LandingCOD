'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { StoreData } from '@/lib/types';
import { Menu, X, ShoppingBag, Search, Heart, ChevronDown, Star, ArrowRight } from 'lucide-react';
import { usePagination, ProductPagination } from './shared/Pagination';
import { StoreFooter } from './shared/StoreFooter';

export default function HypeDropTemplate({ data }: { data: StoreData }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const itemsPerPage = 15; // 3 rows x 5 columns

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
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Heart className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
                <ShoppingBag className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#da291c] text-white text-xs rounded-full flex items-center justify-center font-bold">
                  0
                </span>
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
                  <button className="bg-white text-black p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <ShoppingBag className="w-5 h-5" />
                  </button>
                  <button className="bg-white text-black p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <Heart className="w-5 h-5" />
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
