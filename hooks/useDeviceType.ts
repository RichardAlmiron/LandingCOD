"use client";

import { useState, useEffect } from "react";

export function useDeviceType() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    const checkDevice = () => {
      const width = window.innerWidth;
      const userAgent = navigator.userAgent.toLowerCase();
      
      // Detectar mobile por user agent
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      
      // Detectar por tamaño de pantalla
      const isMobileWidth = width < 768;
      const isTabletWidth = width >= 768 && width < 1024;
      
      setIsMobile(isMobileDevice || isMobileWidth);
      setIsTablet(isTabletWidth);
      setIsDesktop(!isMobileDevice && width >= 1024);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);
    
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  return { isMobile, isTablet, isDesktop, isClient };
}

export function useTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  return isTouch;
}

export function useViewportHeight() {
  const [vh, setVh] = useState(0);

  useEffect(() => {
    const updateVh = () => {
      setVh(window.innerHeight * 0.01);
      document.documentElement.style.setProperty("--vh", `${window.innerHeight * 0.01}px`);
    };

    updateVh();
    window.addEventListener("resize", updateVh);
    
    return () => window.removeEventListener("resize", updateVh);
  }, []);

  return vh;
}
