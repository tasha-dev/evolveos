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
  imageClassName?: string;
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

export interface QuickNotesViewProps {
  className?: string;
}

export interface QuickJournalViewProps {
  className?: string;
}

export interface QuickTasksViewProps {
  className?: string;
}

export interface CustomDialogProps {
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
}

export interface DashboardListItemProps {
  className?: string;
  icon?: "square-check" | "square" | "circle" | "circle-fill";
  title: string;
  date?: string;
}
