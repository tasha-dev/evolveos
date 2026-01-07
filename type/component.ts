// Codes by mahdi tasha
// Importing part
import { ReactNode } from "react";

// Creating and exporting type of props in components
export interface RootLayoutProps {
  children: ReactNode;
}

export interface HeaderProps {
  className?: string;
}

export interface ThemeTogglerProps {
  className?: string;
  variant?: "outline" | "default" | "blur";
  size?: "icon" | "icon-lg";
}

export interface FooterProps {
  className?: string;
}

export interface BannerProps {
  className?: string;
  src: string;
  title: string;
}

export interface ImageFallBackProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}
