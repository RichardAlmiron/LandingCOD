"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { 
  Search, 
  ShoppingCart, 
  Zap,
  Clock,
  ChevronRight,
  Star,
  Heart,
  Timer,
  Flame,
  TrendingUp
} from "lucide-react";
import { StoreData } from "@/lib/types";
import { MobileProductCard } from "@/components/plantillas-movil/MobileProductCard";
import { MobileCartDrawer } from "@/components/plantillas-movil/MobileCartDrawer";

interface MobileFlashDealsProps {
  data: StoreData;
}

export function MobileFlashDeals({ data }: MobileFlashDealsProps) {
  const [cartOpen, setCartOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("flash");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [cartItems, setCartItems] = useState<any[]>([]);

  const flashDeals = data.products.slice(0, 8).map((p, i) => ({
    ...p,
    discount: p.discount || [40, 50, 60, 45, 55, 35, 70, 30][i],
    sold: 150,
    total: 500,
    endsIn: "6h 30m"
  }));

  const categories = [
    { id: "flash", name: "Flash", icon: "⚡" },
    { id: "trending", name: "Trending", icon: "🔥" },
    { id: "new", name: "Nuevo", icon: "✨" },
    { id: "top", name: "Top", icon: "⭐" },
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

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#FF6B35]">
        <div className="flex items-center gap-2 px-4 py-3 safe-area-top">
          <div className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-white fill-white" />
            <span className="text-white font-bold text-xl">FlashDeals</span>
          </div>
          <div className="flex items-center gap-1 ml-auto">
            <button className="p-2 text-white relative">
              <Search className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setCartOpen(true)}
              className="p-2 text-white relative"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItems.length > 0 && (
                <span className="absolute -top-0.5 right-0.5 w-5 h-5 bg-white text-[#FF6B35] text-xs font-bold rounded-full flex items-center justify-center">
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Countdown Banner */}
        <div className="bg-[#E85A2D] px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Timer className="w-4 h-4 text-white" />
            <span className="text-white text-sm font-medium">Termina en:</span>
            <div className="flex items-center gap-1 text-white font-mono font-bold">
              <span className="bg-white/20 px-1.5 py-0.5 rounded text-xs">04</span>
              <span>:</span>
              <span className="bg-white/20 px-1.5 py-0.5 rounded text-xs">32</span>
              <span>:</span>
              <span className="bg-white/20 px-1.5 py-0.5 rounded text-xs">15</span>
            </div>
          </div>
          <span className="text-white/80 text-xs">{flashDeals.reduce((acc, p) => acc + p.sold, 0)} vendidos</span>
        </div>
      </header>

      {/* Category Tabs */}
      <div className="bg-white sticky top-[104px] z-30 border-b border-gray-100">
        <div className="flex">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`flex-1 py-3 px-2 text-sm font-medium transition-colors relative ${
                activeTab === cat.id ? "text-[#FF6B35]" : "text-gray-500"
              }`}
            >
              <span className="mr-1">{cat.icon}</span>
              {cat.name}
              {activeTab === cat.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#FF6B35]"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <main className="p-4 space-y-4">
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] rounded-2xl p-5 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Flame className="w-5 h-5 fill-white" />
            <span className="font-bold text-lg">Ofertas Relámpago</span>
          </div>
          <p className="text-white/90 text-sm mb-3">
            Hasta 70% OFF en productos seleccionados. ¡Solo por tiempo limitado!
          </p>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-white/30 border-2 border-white flex items-center justify-center text-xs"
                >
                  👤
                </div>
              ))}
            </div>
            <span className="text-xs text-white/80">+2.5k comprando ahora</span>
          </div>
        </div>

        {/* Flash Deals Grid */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#FF6B35]" />
              Ofertas Flash
            </h3>
            <button className="text-[#FF6B35] text-sm flex items-center">
              Ver todo <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {flashDeals.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm"
              >
                <div className="relative aspect-square bg-gray-50">
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    fill
                    className="object-contain p-3"
                  />
                  <div className="absolute top-2 left-2 bg-[#FF6B35] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    -{product.discount}%
                  </div>
                  <div className="absolute top-2 right-2 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center shadow-sm">
                    <Heart className="w-3.5 h-3.5 text-gray-600" />
                  </div>
                </div>
                <div className="p-3">
                  <h4 className="text-sm font-medium text-gray-900 line-clamp-1 mb-1">
                    {product.title}
                  </h4>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-lg font-bold text-[#FF6B35]">
                      ${product.price}
                    </span>
                    <span className="text-xs text-gray-400 line-through">
                      ${product.originalPrice}
                    </span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mb-2">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-gray-500">{product.sold} vendidos</span>
                      <span className="text-[#FF6B35]">{Math.round((product.sold/product.total)*100)}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#FF6B35] rounded-full"
                        style={{ width: `${(product.sold/product.total)*100}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>Termina: {product.endsIn}</span>
                  </div>

                  <button
                    onClick={() => addToCart(product)}
                    className="w-full mt-2 bg-[#FF6B35] text-white text-sm font-semibold py-2.5 rounded-xl active:bg-[#E85A2D] transition-colors"
                  >
                    Agregar
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Trending Section */}
        <div className="bg-white rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-green-500" />
            <h3 className="font-bold text-gray-900">Tendencias</h3>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {data.products.slice(4, 8).map((product, idx) => (
              <div
                key={product.id}
                className="flex-shrink-0 w-36 bg-gray-50 rounded-xl overflow-hidden"
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
                  <p className="text-xs font-medium text-gray-900 line-clamp-1">
                    {product.title}
                  </p>
                  <p className="text-sm font-bold text-gray-900 mt-0.5">
                    ${product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All Products */}
        <div>
          <h3 className="font-bold text-gray-900 mb-3">Más productos</h3>
          <div className="space-y-3">
            {data.products.slice(0, 6).map((product, idx) => (
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
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 safe-area-bottom">
        <div className="flex items-center justify-around h-16">
          {[
            { id: "home", icon: "⚡", label: "Flash", active: true },
            { id: "categories", icon: "📂", label: "Categorías" },
            { id: "discover", icon: "🔍", label: "Descubrir" },
            { id: "cart", icon: "🛒", label: "Carrito", badge: cartItems.length },
            { id: "profile", icon: "👤", label: "Yo" },
          ].map((item) => (
            <button
              key={item.id}
              className={`flex flex-col items-center justify-center flex-1 h-full relative ${
                item.active ? "text-[#FF6B35]" : "text-gray-500"
              }`}
            >
              <span className="text-xl relative">
                {item.icon}
                {item.badge && item.badge > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#FF6B35] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {item.badge && item.badge > 9 ? "9+" : item.badge}
                  </span>
                )}
              </span>
              <span className="text-[10px] mt-0.5 font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

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
