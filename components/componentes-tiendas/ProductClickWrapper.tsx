'use client';

import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react';

interface ProductClickWrapperProps {
  children: React.ReactNode;
  identificadorUrl: string;
}

export default function ProductClickWrapper({ children, identificadorUrl }: ProductClickWrapperProps) {
  const router = useRouter();

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    // Buscar el elemento clickeado o sus padres con data-product-id
    let target = e.target as HTMLElement | null;
    
    while (target && target !== e.currentTarget) {
      const productId = target.getAttribute('data-product-id');
      if (productId) {
        // Prevenir comportamiento default solo si encontramos un producto
        e.preventDefault();
        e.stopPropagation();
        
        // Navegar a la página del producto
        const url = `/t/${identificadorUrl}/producto/${productId}`;
        console.log('Navegando a:', url);
        router.push(url);
        return;
      }
      target = target.parentElement;
    }
  }, [identificadorUrl, router]);

  return (
    <div onClick={handleClick} style={{ cursor: 'default' }}>
      {children}
    </div>
  );
}
