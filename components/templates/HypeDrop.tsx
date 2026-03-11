import React from 'react';
import Image from 'next/image';
import { StoreData } from '@/lib/types';

export default function HypeDropTemplate({ data }: { data: StoreData }) {
  const products = data.products;

  return (
    <div className="min-h-full bg-white font-sans text-black selection:bg-[#da291c] selection:text-white pb-0">

      {/* ─── HEADER ─── */}
      <header className="bg-white pt-10 pb-6">
        <div className="w-full flex flex-col items-center justify-center">
          <div className="bg-[#da291c] text-white px-3 py-1 cursor-pointer">
            <span className="font-sans font-black text-[28px] tracking-tighter italic leading-none pl-1">
              HypeDrop
            </span>
          </div>
          <div className="mt-4 text-[11px] font-bold text-black font-sans">
            {new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }).replace(/\//g, '/')} {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }).toLowerCase()} NYC
          </div>
        </div>
      </header>

      <main className="w-full mx-auto max-w-[1200px] px-6 py-6 border-t border-gray-100/50">

        {/* ─── IMAGE FEATURE ─── */}
        <div className="mb-12 flex justify-center">
          <div className="relative w-full max-w-[800px] cursor-pointer">
            <Image
              src={data.bannerImage}
              alt="HypeDrop Lookbook"
              width={800}
              height={600}
              className="w-full h-auto object-cover"
              priority
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* ─── SHOP GRID ─── */}
        <div className="mb-24 flex justify-center w-full">
          <div className="w-full max-w-[900px]">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-0">
              {products.map((product, idx) => (
                <div key={product.id || idx} data-product-id={product.id} className="group relative cursor-pointer flex flex-col items-center text-center p-2 hover:bg-gray-50 transition-colors">
                  <div className="relative aspect-square w-full">
                    <Image
                      src={product.imageUrl}
                      alt={product.title}
                      fill
                      className="object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Hover Tooltip (HypeDrop often just shows product name on hover) */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                    <span className="text-[10px] font-bold block">{product.title}</span>
                    <span className="text-[10px] font-bold text-[#da291c]">${product.price}</span>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>

      </main>

      {/* ─── FOOTER (Classic 90s HTML links style) ─── */}
      <footer className="bg-white py-16">
        <div className="w-full flex justify-center text-[12px] font-bold text-black space-x-4 md:space-x-8">
          <a href="#" className="hover:text-gray-400">shop</a>
          <a href="#" className="hover:text-gray-400">news</a>
          <a href="#" className="hover:text-gray-400">fall/winter 2026 preview</a>
          <a href="#" className="hover:text-gray-400">lookbook</a>
          <a href="#" className="hover:text-gray-400">about</a>
          <a href="#" className="hover:text-gray-400">stores</a>
          <a href="#" className="hover:text-gray-400 hidden sm:inline">contact</a>
        </div>
      </footer>

    </div>
  );
}
