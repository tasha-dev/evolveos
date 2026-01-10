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
  onMenuClick?: () => void;
}

export interface ImageFallBackProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

export interface DashboardLayoutProps {
  children: ReactNode;
  className?: string;
  bannerTitle: string;
}

export interface NavBarProps {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface HabitChartProps {
  className?: string;
}

export interface ProjectsShowcaseProps {
  className?: string;
}

export interface ProjectDashboardItemProps {
  className?: string;
  data: {
    done: boolean;
    title: string;
    createdAt: string;
  };
}
