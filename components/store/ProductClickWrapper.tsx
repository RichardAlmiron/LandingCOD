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
    // Walk up from the clicked element to find a [data-product-id]
    let target = e.target as HTMLElement | null;
    while (target && target !== e.currentTarget) {
      const productId = target.getAttribute('data-product-id');
      if (productId) {
        e.preventDefault();
        e.stopPropagation();
        router.push(`/t/${identificadorUrl}/producto/${productId}`);
        return;
      }
      target = target.parentElement;
    }
  }, [identificadorUrl, router]);

  return (
    <div onClick={handleClick}>
      {children}
    </div>
  );
}
