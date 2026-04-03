"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { 
  Home, 
  Search, 
  Heart, 
  ShoppingCart, 
  User, 
  ChevronRight,
  X,
  LogOut,
  Settings,
  HelpCircle,
  Package
} from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  storeName?: string;
  logoUrl?: string;
  categories?: Array<{ id: string; name: string; icon?: string }>;
  userName?: string;
  userAvatar?: string;
}

export function MobileSideMenu({
  isOpen,
  onClose,
  storeName = "Tienda",
  logoUrl,
  categories = [],
  userName = "Invitado",
  userAvatar,
}: MobileMenuProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Bloquear scroll cuando el menú está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const menuItems = [
    { id: "home", label: "Inicio", icon: Home, href: "/" },
    { id: "orders", label: "Mis Pedidos", icon: Package, href: "/orders" },
    { id: "favorites", label: "Favoritos", icon: Heart, href: "/favorites" },
    { id: "cart", label: "Carrito", icon: ShoppingCart, href: "/cart" },
    { id: "profile", label: "Mi Perfil", icon: User, href: "/profile" },
    { id: "settings", label: "Configuración", icon: Settings, href: "/settings" },
    { id: "help", label: "Ayuda", icon: HelpCircle, href: "/help" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
          />
          
          {/* Menu Panel */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 bottom-0 w-[85%] max-w-[320px] bg-white z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
              <div className="flex items-center justify-between mb-4">
                {logoUrl ? (
                  <Image
                    src={logoUrl}
                    alt={storeName}
                    width={120}
                    height={32}
                    className="h-8 w-auto object-contain brightness-0 invert"
                  />
                ) : (
                  <span className="text-xl font-bold">{storeName}</span>
                )}
                <button
                  onClick={onClose}
                  className="p-2 -mr-2 rounded-full active:bg-white/20 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              {/* User Info */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
                  {userAvatar ? (
                    <Image
                      src={userAvatar}
                      alt={userName}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-6 h-6" />
                  )}
                </div>
                <div>
                  <p className="font-semibold">{userName}</p>
                  <p className="text-sm text-blue-100">Ver perfil</p>
                </div>
                <ChevronRight className="w-5 h-5 ml-auto text-blue-200" />
              </div>
            </div>

            {/* Menu Items */}
            <div className="flex-1 overflow-y-auto py-2">
              {menuItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center gap-4 px-4 py-3.5 active:bg-gray-100 transition-colors"
                >
                  <item.icon className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-900 font-medium">{item.label}</span>
                  <ChevronRight className="w-4 h-4 ml-auto text-gray-400" />
                </Link>
              ))}
              
              {/* Categories Section */}
              {categories.length > 0 && (
                <>
                  <div className="px-4 py-2 mt-2">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Categorías
                    </p>
                  </div>
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/category/${category.id}`}
                      onClick={onClose}
                      className="flex items-center gap-4 px-4 py-3.5 active:bg-gray-100 transition-colors"
                    >
                      <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-xs">{category.icon || "📦"}</span>
                      </div>
                      <span className="text-gray-900 font-medium">{category.name}</span>
                      <ChevronRight className="w-4 h-4 ml-auto text-gray-400" />
                    </Link>
                  ))}
                </>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200 safe-area-bottom">
              <button className="flex items-center gap-3 text-red-600 font-medium w-full py-3">
                <LogOut className="w-5 h-5" />
                <span>Cerrar sesión</span>
              </button>
              <p className="text-xs text-gray-400 mt-4 text-center">
                v1.0.0 • {storeName}
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
