'use client';

import React, { useEffect } from 'react';

interface GlobalNavigationDisablerProps {
  enabled: boolean;
}

export default function GlobalNavigationDisabler({ enabled }: GlobalNavigationDisablerProps) {
  useEffect(() => {
    if (!enabled) return;

    // Add global CSS to disable navigation links
    const styleId = 'global-navigation-disabler';
    
    // Remove existing style if present
    const existingStyle = document.getElementById(styleId);
    if (existingStyle) {
      existingStyle.remove();
    }

    // Create and inject disabling styles
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      /* Disable all clickable navigation elements EXCEPT product cards */
      
      /* Header navigation links */
      header a,
      header button:not([data-product-id]),
      header [role="button"],
      nav a,
      nav button,
      .navbar a,
      .navbar button,
      .navigation a,
      .navigation button,
      [class*="nav"] a:not([data-product-id]),
      [class*="Nav"] a:not([data-product-id]),
      
      /* Footer links */
      footer a,
      footer button:not([data-product-id]),
      [class*="footer"] a,
      [class*="Footer"] a,
      
      /* Menu and category links */
      [class*="menu"] a:not([data-product-id]),
      [class*="Menu"] a:not([data-product-id]),
      [class*="category"] a:not([data-product-id]),
      [class*="Category"] a:not([data-product-id]),
      
      /* Generic links outside product context */
      a:not([data-product-id]):not([href*="product"]):not([href*="item"]) {
        pointer-events: none !important;
        cursor: default !important;
        user-select: none !important;
      }
      
      /* Allow product cards to remain clickable */
      [data-product-id],
      [data-product-id] *,
      [class*="product"]:not([class*="products-header"]):not([class*="product-nav"]),
      [class*="Product"]:not([class*="Products-header"]):not([class*="Product-nav"]),
      article[class*="product"],
      .product-card,
      .product-item,
      [class*="item-card"] {
        pointer-events: auto !important;
        cursor: pointer !important;
      }
      
      /* Specifically enable product images, titles, and add buttons */
      [data-product-id] img,
      [data-product-id] h3,
      [data-product-id] h4,
      [data-product-id] .title,
      [data-product-id] button,
      [data-product-id] [role="button"] {
        pointer-events: auto !important;
        cursor: pointer !important;
      }
      
      /* Keep product grid items clickable */
      .grid > div[data-product-id],
      [class*="grid"] > div[data-product-id],
      [class*="products"] > div,
      [class*="Products"] > div {
        pointer-events: auto !important;
      }
    `;
    
    document.head.appendChild(style);

    // Cleanup on unmount or when disabled
    return () => {
      const styleElement = document.getElementById(styleId);
      if (styleElement) {
        styleElement.remove();
      }
    };
  }, [enabled]);

  return null; // This is a logic-only component
}
