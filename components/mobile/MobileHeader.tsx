"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingCart, User, Menu, X, ChevronLeft, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface MobileHeaderProps {
  storeName?: string;
  logoUrl?: string;
  cartCount?: number;
  onSearchClick?: () => void;
  onCartClick?: () => void;
  onProfileClick?: () => void;
  onMenuClick?: () => void;
  showBackButton?: boolean;
  onBackClick?: () => void;
  transparent?: boolean;
}

export function MobileHeader({
  storeName = "Tienda",
  logoUrl,
  cartCount = 0,
  onSearchClick,
  onCartClick,
  onProfileClick,
  onMenuClick,
  showBackButton = false,
  onBackClick,
  transparent = false,
}: MobileHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || !transparent
          ? "bg-white shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-4 h-14 safe-area-top">
        {/* Left - Back or Menu */}
        <div className="flex items-center w-12">
          {showBackButton ? (
            <button
              onClick={onBackClick}
              className="p-2 -ml-2 rounded-full active:bg-gray-100 transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-gray-900" />
            </button>
          ) : (
            <button
              onClick={onMenuClick}
              className="p-2 -ml-2 rounded-full active:bg-gray-100 transition-colors"
            >
              <Menu className="w-6 h-6 text-gray-900" />
            </button>
          )}
        </div>

        {/* Center - Logo/Title */}
        <div className="flex-1 flex items-center justify-center">
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt={storeName}
              width={120}
              height={32}
              className="h-8 w-auto object-contain"
            />
          ) : (
            <span className="text-lg font-bold text-gray-900 truncate max-w-[150px]">
              {storeName}
            </span>
          )}
        </div>

        {/* Right - Actions */}
        <div className="flex items-center gap-1 w-12 justify-end">
          <button
            onClick={onSearchClick}
            className="p-2 rounded-full active:bg-gray-100 transition-colors"
          >
            <Search className="w-5 h-5 text-gray-900" />
          </button>
          {cartCount > 0 && (
            <button
              onClick={onCartClick}
              className="p-2 rounded-full active:bg-gray-100 transition-colors relative"
            >
              <ShoppingCart className="w-5 h-5 text-gray-900" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

interface MobileBottomNavProps {
  activeTab?: "home" | "search" | "favorites" | "cart" | "profile";
  cartCount?: number;
  onTabChange?: (tab: string) => void;
}

export function MobileBottomNav({
  activeTab = "home",
  cartCount = 0,
  onTabChange,
}: MobileBottomNavProps) {
  const tabs = [
    { id: "home", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", label: "Inicio" },
    { id: "search", icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z", label: "Buscar" },
    { id: "favorites", icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z", label: "Favoritos" },
    { id: "cart", icon: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z", label: "Carrito", badge: cartCount },
    { id: "profile", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z", label: "Perfil" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 safe-area-bottom">
      <div className="flex items-center justify-around h-16 pb-safe">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange?.(tab.id)}
            className={`flex flex-col items-center justify-center flex-1 h-full relative ${
              activeTab === tab.id ? "text-blue-600" : "text-gray-500"
            }`}
          >
            <div className="relative">
              <svg
                className="w-6 h-6"
                fill={activeTab === tab.id ? "currentColor" : "none"}
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={activeTab === tab.id ? 0 : 1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d={tab.icon} />
              </svg>
              {tab.badge && tab.badge > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {tab.badge > 99 ? "99+" : tab.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] mt-0.5 font-medium">{tab.label}</span>
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute -bottom-0 w-1 h-1 bg-blue-600 rounded-full"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
}
