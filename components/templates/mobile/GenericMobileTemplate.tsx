"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  ShoppingCart, 
  Menu,
  MapPin,
  ChevronRight,
  SlidersHorizontal,
  Heart,
  Store
} from "lucide-react";
import { StoreData } from "@/lib/types";
import { MobileProductCard } from "../MobileProductCard";
import { MobileCartDrawer } from "../MobileCartDrawer";
import { MobileSideMenu } from "../MobileSideMenu";
import { usePagination } from "@/hooks/usePagination";

interface GenericMobileTemplateProps {
  data: StoreData;
  theme?: {
    primaryColor?: string;
    headerStyle?: "default" | "gradient" | "minimal";
  };
}

export function GenericMobileTemplate({ 
  data, 
  theme = { primaryColor: "#0066FF", headerStyle: "default" } 
}: GenericMobileTemplateProps) {
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const primaryColor = theme.primaryColor || "#0066FF";

  // Extract unique categories from products
  const categories = ["all", ...new Set(data.products.map(p => p.category || "General"))];

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

  const filteredProducts = data.products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "all" || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const { paginatedItems, currentPage, totalPages, handlePageChange } =
    usePagination(filteredProducts, 12);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Sticky Header */}
      <header 
        className="sticky top-0 z-40"
        style={{ 
          background: theme.headerStyle === "gradient" 
            ? `linear-gradient(135deg, ${primaryColor}, ${primaryColor}dd)`
            : primaryColor 
        }}
      >
        {/* Top Bar */}
        <div className="flex items-center gap-2 px-4 py-3 safe-area-top">
          <button 
            onClick={() => setMenuOpen(true)}
            className="p-2 -ml-2 text-white"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <div className="flex items-center gap-1">
            <Store className="w-5 h-5 text-white" />
            <span className="text-white font-bold text-lg">
              {data.name || "Tienda"}
            </span>
          </div>

          <div className="flex items-center gap-1 ml-auto">
            <button 
              onClick={() => setCartOpen(true)}
              className="p-2 text-white relative"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItems.length > 0 && (
                <span 
                  className="absolute -top-0.5 right-0.5 min-w-[18px] h-[18px] bg-white text-xs font-bold rounded-full flex items-center justify-center px-1"
                  style={{ color: primaryColor }}
                >
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-4 pb-3">
          <div className="flex items-center bg-white rounded-xl overflow-hidden shadow-sm">
            <button className="p-3 text-gray-400">
              <SlidersHorizontal className="w-4 h-4" />
            </button>
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-2 py-2.5 text-gray-900 placeholder-gray-400 outline-none text-sm"
            />
            <button 
              className="p-3 text-white"
              style={{ backgroundColor: primaryColor }}
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Location Bar */}
        <div className="bg-black/10 text-white px-4 py-2 flex items-center gap-2 text-sm">
          <MapPin className="w-4 h-4" />
          <span className="opacity-80">Enviar a</span>
          <span className="font-medium">Buenos Aires</span>
          <ChevronRight className="w-4 h-4 ml-auto opacity-60" />
        </div>
      </header>

      {/* Main Content */}
      <main className="space-y-4">
        {/* Hero Banner */}
        <div className="relative mx-4 mt-4 rounded-2xl overflow-hidden" style={{ backgroundColor: primaryColor }}>
          <div className="p-6 text-white">
            <span className="text-4xl mb-2 block">🛍️</span>
            <h2 className="text-2xl font-bold">Bienvenido</h2>
            <p className="text-white/90 mt-1">
              Descubre nuestras mejores ofertas
            </p>
            <button 
              className="mt-4 bg-white px-5 py-2.5 rounded-full text-sm font-semibold"
              style={{ color: primaryColor }}
            >
              Explorar
            </button>
          </div>
        </div>

        {/* Categories Horizontal Scroll */}
        <div className="bg-white py-4">
          <div className="flex items-center justify-between px-4 mb-3">
            <h3 className="font-bold text-gray-900">Categorías</h3>
          </div>
          <div className="flex gap-3 overflow-x-auto px-4 pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeCategory === category
                    ? "text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
                style={{ 
                  backgroundColor: activeCategory === category ? primaryColor : undefined 
                }}
              >
                {category === "all" ? "Todo" : category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Products - Horizontal */}
        <div className="bg-white py-4">
          <div className="flex items-center justify-between px-4 mb-3">
            <h3 className="font-bold text-gray-900">Destacados</h3>
            <button className="text-sm flex items-center" style={{ color: primaryColor }}>
              Ver todo <ChevronRight className="w-4 h-4" />
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
                onFavorite={() => {}}
              />
            ))}
          </div>
        </div>

        {/* View Toggle */}
        <div className="bg-white px-4 py-3 flex items-center justify-between sticky top-[140px] z-30">
          <h3 className="font-bold text-gray-900">
            {activeCategory === "all" ? "Todos los productos" : activeCategory}
          </h3>
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === "grid" ? "bg-white shadow-sm" : ""
              }`}
            >
              <div className="grid grid-cols-2 gap-0.5 w-4 h-4">
                <div className="bg-current rounded-sm" style={{ color: viewMode === "grid" ? primaryColor : "#9CA3AF" }} />
                <div className="bg-current rounded-sm" style={{ color: viewMode === "grid" ? primaryColor : "#9CA3AF" }} />
                <div className="bg-current rounded-sm" style={{ color: viewMode === "grid" ? primaryColor : "#9CA3AF" }} />
                <div className="bg-current rounded-sm" style={{ color: viewMode === "grid" ? primaryColor : "#9CA3AF" }} />
              </div>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === "list" ? "bg-white shadow-sm" : ""
              }`}
            >
              <div className="flex flex-col gap-0.5 w-4 h-4 justify-center">
                <div className="h-0.5 bg-current rounded-full w-full" style={{ color: viewMode === "list" ? primaryColor : "#9CA3AF" }} />
                <div className="h-0.5 bg-current rounded-full w-3/4" style={{ color: viewMode === "list" ? primaryColor : "#9CA3AF" }} />
                <div className="h-0.5 bg-current rounded-full w-1/2" style={{ color: viewMode === "list" ? primaryColor : "#9CA3AF" }} />
              </div>
            </button>
          </div>
        </div>

        {/* Products Grid/List */}
        <div className="px-4 pb-4">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-2 gap-3">
              {paginatedItems.map((product, idx) => (
                <MobileProductCard
                  key={product.id}
                  product={product}
                  variant="grid"
                  index={idx}
                  onPress={() => {}}
                  onAddToCart={() => addToCart(product)}
                  onFavorite={() => {}}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {paginatedItems.map((product, idx) => (
                <MobileProductCard
                  key={product.id}
                  product={product}
                  variant="list"
                  index={idx}
                  onPress={() => {}}
                  onAddToCart={() => addToCart(product)}
                  onFavorite={() => {}}
                />
              ))}
            </div>
          )}

          {/* Load More */}
          {currentPage < totalPages && (
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="w-full mt-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 font-medium active:bg-gray-50 transition-colors"
            >
              Cargar más
            </button>
          )}
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 safe-area-bottom">
        <div className="flex items-center justify-around h-16">
          {[
            { id: "home", icon: "🏠", label: "Inicio", active: true },
            { id: "search", icon: "🔍", label: "Buscar" },
            { id: "favorites", icon: "❤️", label: "Favoritos" },
            { id: "cart", icon: "🛒", label: "Carrito", badge: cartItems.length },
            { id: "profile", icon: "👤", label: "Perfil" },
          ].map((item) => (
            <button
              key={item.id}
              className={`flex flex-col items-center justify-center flex-1 h-full relative ${
                item.active ? "" : "text-gray-500"
              }`}
              style={{ color: item.active ? primaryColor : undefined }}
            >
              <span className="text-xl relative">
                {item.icon}
                {item.badge > 0 && (
                  <span 
                    className="absolute -top-1 -right-1 w-4 h-4 text-white text-[10px] font-bold rounded-full flex items-center justify-center"
                    style={{ backgroundColor: primaryColor }}
                  >
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
        categories={categories.filter(c => c !== "all").map(c => ({ id: c, name: c }))}
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
