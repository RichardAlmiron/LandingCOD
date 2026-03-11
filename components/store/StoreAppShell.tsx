import React from 'react';
import { Home, Search, ShoppingCart, User } from 'lucide-react';

interface StoreAppShellProps {
  children: React.ReactNode;
  isPremium?: boolean;
}

export default function StoreAppShell({ children, isPremium }: StoreAppShellProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white relative w-full">
      {/* Main Content Area - Added padding bottom on mobile to account for the fixed nav */}
      <div className="flex-1 pb-[80px] md:pb-0 w-full relative">
        {isPremium && (
          <div className="absolute top-4 right-4 z-[9999] pointer-events-none">
            <div className="bg-gradient-to-r from-amber-400 to-amber-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg flex items-center gap-1.5 border border-amber-300/50">
              <span className="text-sm">✨</span> PREMIUM QUALITY
            </div>
          </div>
        )}
        {children}
      </div>

      {/* Production-Ready Mobile Bottom Navigation */}
      {/* Hidden on md and up. Fixed to bottom, safe-area aware, touch-optimized */}
      <div className="md:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-xl border-t border-zinc-200 flex items-center justify-around px-2 z-[9999] shadow-[0_-10px_40px_rgba(0,0,0,0.08)] pb-safe">
        <button className="flex flex-col items-center justify-center w-16 h-16 space-y-1 text-indigo-600 active:scale-95 transition-transform">
          <Home className="w-6 h-6" />
          <span className="text-[10px] font-bold">Inicio</span>
        </button>
        <button className="flex flex-col items-center justify-center w-16 h-16 space-y-1 text-zinc-500 hover:text-zinc-900 active:scale-95 transition-transform">
          <Search className="w-6 h-6" />
          <span className="text-[10px] font-medium">Buscar</span>
        </button>
        <button className="flex flex-col items-center justify-center w-16 h-16 space-y-1 text-zinc-500 hover:text-zinc-900 active:scale-95 transition-transform relative">
          <ShoppingCart className="w-6 h-6" />
          <span className="absolute top-2 right-3 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
            3
          </span>
          <span className="text-[10px] font-medium">Carrito</span>
        </button>
        <button className="flex flex-col items-center justify-center w-16 h-16 space-y-1 text-zinc-500 hover:text-zinc-900 active:scale-95 transition-transform">
          <User className="w-6 h-6" />
          <span className="text-[10px] font-medium">Perfil</span>
        </button>
      </div>
    </div>
  );
}
