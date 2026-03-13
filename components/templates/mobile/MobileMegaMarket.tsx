"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  Search, 
  ShoppingCart, 
  Menu, 
  MapPin, 
  ChevronRight,
  Star,
  Heart,
  Bell,
  Mic,
  Camera,
  Filter,
  ArrowRight
} from "lucide-react";
import { StoreData } from "@/lib/types";
import { MobileProductCard } from "../MobileProductCard";
import { MobileCartDrawer } from "../MobileCartDrawer";
import { MobileSideMenu } from "../MobileSideMenu";
import { usePagination } from "@/hooks/usePagination";

interface MobileMegaMarketProps {
  data: StoreData;
}

export function MobileMegaMarket({ data }: MobileMegaMarketProps) {
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [showLocation, setShowLocation] = useState(true);
  const [currentBanner, setCurrentBanner] = useState(0);

  const banners = [
    { id: 1, color: "from-yellow-400 to-orange-500", title: "Ofertas Relámpago", subtitle: "Hasta 40% OFF", emoji: "⚡" },
    { id: 2, color: "from-blue-400 to-blue-600", title: "Envío Gratis", subtitle: "En miles de productos", emoji: "🚚" },
    { id: 3, color: "from-green-400 to-green-600", title: "Nuevos Lanzamientos", subtitle: "Tecnología 2024", emoji: "📱" },
  ];

  // Auto-rotate banners
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const categories = [
    { id: "electronics", name: "Electrónica", icon: "📱" },
    { id: "fashion", name: "Moda", icon: "👕" },
    { id: "home", name: "Hogar", icon: "🏠" },
    { id: "sports", name: "Deportes", icon: "⚽" },
    { id: "beauty", name: "Belleza", icon: "💄" },
    { id: "toys", name: "Juguetes", icon: "🎮" },
    { id: "automotive", name: "Autos", icon: "🚗" },
    { id: "books", name: "Libros", icon: "📚" },
  ];

  const addToCart = (product: any) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const filteredProducts = data.products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "all" || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const { paginatedItems, currentPage, totalPages, handlePageChange } =
    usePagination(filteredProducts, 10);

  return (
    <div className="min-h-screen bg-gray-100 pb-20">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-[#131921]">
        {/* Top Bar */}
        <div className="flex items-center gap-2 px-3 py-2">
          <button 
            onClick={() => setMenuOpen(true)}
            className="p-2 -ml-2 text-white"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <Link href="/" className="flex items-center">
            <span className="text-white font-bold text-xl tracking-tight">
              {data.name || "MegaMarket"}
            </span>
          </Link>

          <div className="flex items-center gap-1 ml-auto">
            <button className="p-2 text-white relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <button 
              onClick={() => setCartOpen(true)}
              className="p-2 text-white relative"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItems.length > 0 && (
                <span className="absolute -top-0.5 right-0.5 min-w-[18px] h-[18px] bg-[#f90] text-[#131921] text-xs font-bold rounded-full flex items-center justify-center px-1">
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-3 pb-3">
          <div className="flex items-center bg-white rounded-lg overflow-hidden">
            <button className="p-3 text-gray-500 border-r border-gray-200">
              <Filter className="w-4 h-4" />
            </button>
            <input
              type="text"
              placeholder="Buscar en MegaMarket"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-3 py-2.5 text-gray-900 placeholder-gray-500 outline-none text-sm"
            />
            <button className="p-3 text-gray-500">
              <Camera className="w-4 h-4" />
            </button>
            <button className="p-3 bg-[#febd69] text-[#131921]">
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Location Bar */}
        <AnimatePresence>
          {showLocation && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-[#232f3e] text-white px-3 py-2 flex items-center gap-2 text-sm"
            >
              <MapPin className="w-4 h-4 text-gray-300" />
              <span className="text-gray-300">Enviar a</span>
              <span className="font-medium">Buenos Aires 1001</span>
              <button 
                onClick={() => setShowLocation(false)}
                className="ml-auto text-gray-400"
              >
                ×
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="space-y-4">
        {/* Hero Banner Carousel */}
        <div className="relative bg-white">
          <motion.div
            key={currentBanner}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`bg-gradient-to-r ${banners[currentBanner].color} p-6 text-white`}
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="text-4xl mb-2 block">
                  {banners[currentBanner].emoji}
                </span>
                <h2 className="text-2xl font-bold">
                  {banners[currentBanner].title}
                </h2>
                <p className="text-white/90 mt-1">
                  {banners[currentBanner].subtitle}
                </p>
              </div>
              <ChevronRight className="w-8 h-8 text-white/80" />
            </div>
          </motion.div>
          
          {/* Banner Indicators */}
          <div className="flex justify-center gap-1.5 py-3 bg-white">
            {banners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentBanner(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentBanner ? "bg-[#131921] w-4" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Categories Grid */}
        <div className="bg-white px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-900">Categorías</h3>
            <button className="text-[#007185] text-sm">Ver todas</button>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex flex-col items-center gap-1.5 p-2 rounded-xl transition-colors ${
                  activeCategory === category.id
                    ? "bg-[#febd69]/20"
                    : "active:bg-gray-50"
                }`}
              >
                <span className="text-2xl">{category.icon}</span>
                <span className="text-xs text-gray-700 text-center leading-tight">
                  {category.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Deals of the Day - Horizontal Scroll */}
        <div className="bg-white py-4">
          <div className="flex items-center justify-between px-4 mb-3">
            <div>
              <h3 className="font-bold text-gray-900 text-lg">Ofertas del día</h3>
              <p className="text-sm text-gray-500">Terminan en 04:32:15</p>
            </div>
            <button className="text-[#007185] text-sm flex items-center">
              Ver más <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex gap-3 overflow-x-auto px-4 pb-2 scrollbar-hide">
            {data.products.slice(0, 6).map((product, idx) => (
              <MobileProductCard
                key={product.id}
                product={product}
                variant="horizontal"
                index={idx}
                onPress={() => {}}
                onAddToCart={() => addToCart(product)}
                onFavorite={() => toggleFavorite(product.id)}
              />
            ))}
          </div>
        </div>

        {/* Featured Banner */}
        <div className="bg-white p-4">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-5 text-white">
            <p className="text-sm font-medium text-white/80">Nuevo</p>
            <h3 className="text-xl font-bold mt-1">iPhone 15 Pro</h3>
            <p className="text-white/90 mt-1">Desde $999 o 12 cuotas</p>
            <button className="mt-3 bg-white text-purple-600 px-4 py-2 rounded-full text-sm font-semibold">
              Ver ahora
            </button>
          </div>
        </div>

        {/* All Products Grid */}
        <div className="bg-white px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900 text-lg">
              {activeCategory === "all" ? "Todos los productos" : "Resultados"}
            </h3>
            <span className="text-sm text-gray-500">
              {filteredProducts.length} items
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {paginatedItems.map((product, idx) => (
              <MobileProductCard
                key={product.id}
                product={product}
                variant="grid"
                index={idx}
                onPress={() => {}}
                onAddToCart={() => addToCart(product)}
                onFavorite={() => toggleFavorite(product.id)}
              />
            ))}
          </div>

          {/* Load More */}
          {currentPage < totalPages && (
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="w-full mt-4 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium active:bg-gray-50 transition-colors"
            >
              Cargar más productos
            </button>
          )}
        </div>

        {/* Recently Viewed */}
        <div className="bg-white py-4">
          <h3 className="font-bold text-gray-900 px-4 mb-3">Vistos recientemente</h3>
          <div className="flex gap-3 overflow-x-auto px-4 pb-2 scrollbar-hide">
            {data.products.slice(0, 4).map((product, idx) => (
              <div
                key={product.id}
                className="flex-shrink-0 w-32 bg-gray-50 rounded-xl overflow-hidden"
              >
                <div className="relative aspect-square">
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    fill
                    className="object-contain p-2"
                  />
                </div>
                <div className="p-2">
                  <p className="text-xs text-gray-900 line-clamp-1 font-medium">
                    ${product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 safe-area-bottom">
        <div className="flex items-center justify-around h-16">
          {[
            { id: "home", icon: "🏠", label: "Inicio", active: true },
            { id: "profile", icon: "👤", label: "Yo" },
            { id: "orders", icon: "📦", label: "Pedidos" },
            { id: "cart", icon: "🛒", label: "Carrito", badge: cartItems.length },
            { id: "menu", icon: "☰", label: "Menú" },
          ].map((item) => (
            <button
              key={item.id}
              className={`flex flex-col items-center justify-center flex-1 h-full relative ${
                item.active ? "text-[#131921]" : "text-gray-500"
              }`}
            >
              <span className="text-xl relative">
                {item.icon}
                {item.badge > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#f90] text-[#131921] text-[10px] font-bold rounded-full flex items-center justify-center">
                    {item.badge > 9 ? "9+" : item.badge}
                  </span>
                )}
              </span>
              <span className="text-[10px] mt-0.5 font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Side Menu */}
      <MobileSideMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        storeName={data.name}
        categories={categories}
      />

      {/* Cart Drawer */}
      <MobileCartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={(id, qty) => {
          if (qty === 0) {
            setCartItems((prev) => prev.filter((item) => item.id !== id));
          } else {
            setCartItems((prev) =>
              prev.map((item) =>
                item.id === id ? { ...item, quantity: qty } : item
              )
            );
          }
        }}
        onRemoveItem={(id) =>
          setCartItems((prev) => prev.filter((item) => item.id !== id))
        }
        onCheckout={() => {}}
      />
    </div>
  );
}
