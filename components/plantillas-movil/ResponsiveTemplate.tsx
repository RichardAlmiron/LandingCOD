"use client";

import { useDeviceType } from "@/hooks/useDeviceType";
import { ReactNode } from "react";

interface ResponsiveTemplateProps {
  desktopComponent: ReactNode;
  mobileComponent: ReactNode;
}

export function ResponsiveTemplate({
  desktopComponent,
  mobileComponent,
}: ResponsiveTemplateProps) {
  const { isMobile, isClient } = useDeviceType();

  // Prevent hydration mismatch - show desktop by default until client loads
  if (!isClient) {
    return <>{desktopComponent}</>;
  }

  return isMobile ? <>{mobileComponent}</> : <>{desktopComponent}</>;
}
