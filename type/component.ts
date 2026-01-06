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
  variant?: "outline" | "default";
  size?: "icon" | "icon-lg";
}
