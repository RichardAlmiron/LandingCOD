'use client';

import React from 'react';
import { StoreData } from '@/lib/types';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube, CreditCard, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

interface StoreFooterProps {
  data: StoreData;
  variant?: 'dark' | 'light' | 'colored';
  accentColor?: string;
}

export function StoreFooter({ data, variant = 'dark', accentColor = '#000' }: StoreFooterProps) {
  const bgColor = variant === 'dark' ? 'bg-gray-900' : variant === 'colored' ? '' : 'bg-gray-50';
  const textColor = variant === 'dark' ? 'text-white' : 'text-gray-900';
  const subtextColor = variant === 'dark' ? 'text-gray-400' : 'text-gray-600';
  const borderColor = variant === 'dark' ? 'border-gray-800' : 'border-gray-200';
  const linkHoverColor = variant === 'dark' ? 'hover:text-white' : 'hover:text-black';

  const footerStyle = variant === 'colored' ? { backgroundColor: accentColor } : {};

  return (
    <footer className={`${bgColor} ${textColor}`} style={footerStyle}>
      {/* Trust Badges */}
      <div className={`border-t ${borderColor}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <Truck className="w-8 h-8 opacity-80" />
              <div>
                <p className="font-semibold text-sm">Envío Gratis</p>
                <p className={`text-xs ${subtextColor}`}>En pedidos +$50</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 opacity-80" />
              <div>
                <p className="font-semibold text-sm">Pago Seguro</p>
                <p className={`text-xs ${subtextColor}`}>100% protegido</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <RotateCcw className="w-8 h-8 opacity-80" />
              <div>
                <p className="font-semibold text-sm">Devoluciones</p>
                <p className={`text-xs ${subtextColor}`}>30 días de garantía</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CreditCard className="w-8 h-8 opacity-80" />
              <div>
                <p className="font-semibold text-sm">Múltiples Pagos</p>
                <p className={`text-xs ${subtextColor}`}>Todas las tarjetas</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className={`border-t ${borderColor} py-12`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* About */}
            <div>
              <h4 className="font-bold text-lg mb-4">{data.name}</h4>
              <p className={`text-sm ${subtextColor} mb-4 leading-relaxed`}>
                {data.description || 'Tu tienda de confianza para productos de calidad. Ofrecemos la mejor selección con precios competitivos.'}
              </p>
              <div className="flex gap-3">
                <a href="#" className={`${subtextColor} ${linkHoverColor} transition-colors`}>
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className={`${subtextColor} ${linkHoverColor} transition-colors`}>
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className={`${subtextColor} ${linkHoverColor} transition-colors`}>
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className={`${subtextColor} ${linkHoverColor} transition-colors`}>
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-bold mb-4">Sobre Nosotros</h4>
              <ul className={`space-y-2 text-sm ${subtextColor}`}>
                <li><a href="#" className={`${linkHoverColor} transition-colors`}>Quiénes Somos</a></li>
                <li><a href="#" className={`${linkHoverColor} transition-colors`}>Nuestra Historia</a></li>
                <li><a href="#" className={`${linkHoverColor} transition-colors`}>Trabaja con Nosotros</a></li>
                <li><a href="#" className={`${linkHoverColor} transition-colors`}>Blog</a></li>
                <li><a href="#" className={`${linkHoverColor} transition-colors`}>Prensa</a></li>
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h4 className="font-bold mb-4">Atención al Cliente</h4>
              <ul className={`space-y-2 text-sm ${subtextColor}`}>
                <li><a href="#" className={`${linkHoverColor} transition-colors`}>Centro de Ayuda</a></li>
                <li><a href="#" className={`${linkHoverColor} transition-colors`}>Seguimiento de Pedidos</a></li>
                <li><a href="#" className={`${linkHoverColor} transition-colors`}>Devoluciones</a></li>
                <li><a href="#" className={`${linkHoverColor} transition-colors`}>Envíos</a></li>
                <li><a href="#" className={`${linkHoverColor} transition-colors`}>Contacto</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold mb-4">Contacto</h4>
              <ul className={`space-y-3 text-sm ${subtextColor}`}>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>contacto@{data.name.toLowerCase().replace(/\s+/g, '')}.com</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>+1 (800) 123-4567</span>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5" />
                  <span>Calle Principal 123<br />Ciudad, País</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={`border-t ${borderColor} py-6`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className={`text-sm ${subtextColor}`}>
              © 2026 {data.name}. Todos los derechos reservados.
            </p>
            <div className={`flex gap-6 text-sm ${subtextColor}`}>
              <a href="#" className={`${linkHoverColor} transition-colors`}>Términos de Uso</a>
              <a href="#" className={`${linkHoverColor} transition-colors`}>Política de Privacidad</a>
              <a href="#" className={`${linkHoverColor} transition-colors`}>Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
