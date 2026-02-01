// Codes by mahdi tasha
// Importing part
import { ReactNode, RefObject } from "react";
import { habit, journal, note, project, task } from "./general";

// Creating and exporting type of props in components
export interface RootLayoutProps {
  children: ReactNode;
}

export interface HeaderProps {
  className?: string;
}

export interface ThemeTogglerProps {
  className?: string;
  variant?: "outline" | "default" | "blur" | "nolightblur";
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
  ctaButton?: ReactNode;
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
  bannerSrc: string;
  ctaButton?: ReactNode;
}

export interface NavBarProps {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  ref?: RefObject<HTMLElement | null>;
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

export interface CalendarProps {
  className?: string;
}

export interface ContainerProps {
  className?: string;
}

export interface MarkdownEditorProps {
  onChange?: (markdownContent: string) => void;
  className?: string;
  defaultValue?: string;
  readonly?: boolean;
}

export interface JournalCardProps {
  data: journal;
  className?: string;
}

export interface DeleteJournalDialogProps extends CustomDialogProps {
  data: {
    id: number;
    title: string;
  };
}

export type EditJouranlDialogProps = DeleteJournalDialogProps;

export interface CheckboxProps {
  className?: string;
  checked?: boolean;
  onCheckChange?: (checked: boolean) => void;
}

export interface TaskItemProps {
  data: task;
  className?: string;
}

export interface DeleteTasksDialogProps {
  id: number;
}

export interface EditTasksDialogProps {
  data: {
    id: number;
    title: string;
  };
}

export interface DatePickerProps {
  onValueChange?: (value: string) => void;
  value?: string;
  className?: string;
  invalid?: boolean;
}

export interface ProjectCardProps {
  className?: string;
  data: project;
}

export interface EditProjectProps extends CustomDialogProps {
  data: {
    start: string;
    id: number;
    deadLine: string;
    title: string;
  };
}

export interface DeleteProjectDialogProps extends CustomDialogProps {
  id: number;
}

export interface NoteCardProps {
  className?: string;
  data: note;
}

export interface DeleteNoteDialogProps extends CustomDialogProps {
  id: number;
}

export interface EditNoteDialogProps extends CustomDialogProps {
  data: {
    id: number;
    title: string;
  };
}

export interface HabitCardProps {
  className?: string;
  data: habit;
}

export interface EditHabitDialogProps extends CustomDialogProps {
  data: {
    id: number;
    title: string;
    onDaysIndex: 0 | 1 | 2 | 3 | 4 | 5 | 6 | "everyday";
    onTime: string;
  };
}

export interface DeleteHabitDialogProps extends CustomDialogProps {
  id: number;
}
