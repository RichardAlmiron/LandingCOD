'use client';
import React from 'react';
import { Product } from '@/lib/types';
import { Star, Award, Shield, Zap } from 'lucide-react';

interface ProductShowcaseProps {
  product: Product;
  accentColor?: string;
}

export default function ProductShowcase({ product, accentColor = '#6366f1' }: ProductShowcaseProps) {
  return (
    <div className="py-24 space-y-16">
      {/* Sección 1: Producto en Uso */}
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="relative aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl">
          <img 
            src={product.imageUrl} 
            alt={`${product.title} en uso`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <div className="absolute bottom-8 left-8 right-8">
            <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl">
              <div className="flex items-center gap-3 mb-2">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${accentColor}20` }}
                >
                  <Star className="w-6 h-6" style={{ color: accentColor }} />
                </div>
                <div>
                  <div className="font-black text-gray-900">Calidad Premium</div>
                  <div className="text-sm text-gray-600 font-bold">Verificado por expertos</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <h2 className="text-4xl font-black text-gray-900 leading-tight">
            Diseñado para la <span style={{ color: accentColor }}>Excelencia</span>
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed font-medium">
            Cada detalle ha sido cuidadosamente diseñado para ofrecerte la mejor experiencia posible. 
            Materiales premium, tecnología de punta y un diseño que destaca.
          </p>
          <ul className="space-y-4">
            {[
              "Materiales de alta calidad certificados",
              "Tecnología de última generación",
              "Diseño ergonómico y funcional",
              "Garantía extendida incluida"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3">
                <div 
                  className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${accentColor}20` }}
                >
                  <Shield className="w-4 h-4" style={{ color: accentColor }} />
                </div>
                <span className="font-bold text-gray-800">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Sección 2: Detalles del Producto */}
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 order-2 md:order-1">
          <h2 className="text-4xl font-black text-gray-900 leading-tight">
            Cada Detalle <span style={{ color: accentColor }}>Importa</span>
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed font-medium">
            No dejamos nada al azar. Desde el empaque hasta el producto final, 
            todo está pensado para superar tus expectativas.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Award, label: "Certificado", value: "ISO 9001" },
              { icon: Shield, label: "Garantía", value: "30 Días" },
              { icon: Star, label: "Rating", value: "4.9/5" },
              { icon: Zap, label: "Envío", value: "24-48h" }
            ].map((stat, i) => (
              <div 
                key={i} 
                className="p-6 rounded-2xl border-2 text-center"
                style={{ borderColor: `${accentColor}20`, backgroundColor: `${accentColor}05` }}
              >
                <stat.icon className="w-8 h-8 mx-auto mb-2" style={{ color: accentColor }} />
                <div className="text-2xl font-black text-gray-900">{stat.value}</div>
                <div className="text-xs font-bold text-gray-600 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl order-1 md:order-2">
          <img 
            src={product.imageUrl} 
            alt={`${product.title} detalles`}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Sección 3: Galería de Lifestyle */}
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-black text-gray-900 mb-4">
            Más Que Un Producto, Una <span style={{ color: accentColor }}>Experiencia</span>
          </h2>
          <p className="text-gray-600 font-bold max-w-2xl mx-auto">
            Descubre cómo {product.title} se integra perfectamente en tu vida diaria
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-xl group">
              <img 
                src={`${product.imageUrl}?lifestyle=${i}`} 
                alt={`${product.title} lifestyle ${i}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
