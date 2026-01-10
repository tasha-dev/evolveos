// Codes by mahdi tasha
// Defining type for general things in whole app
export type WeekDay =
  | "saturday"
  | "sunday"
  | "monday"
  | "tuesday"
  | "wendesday"
  | "thursday"
  | "friday";

export interface journal {
  id: number;
  createdAt: string;
  title: string;
  content: string;
}

export interface task {
  id: number;
  createdAt: string;
  title: string;
  description?: string;
  done: boolean;
  doneBy: string;
}

export interface project {
  id: number;
  done: boolean;
  createdAt: string;
  title: string;
  content: string;
}

export interface habit {
  id: number;
  createdAt: string;
  title: string;
  done: boolean;
  on: Array<WeekDay>;
}

export interface note {
  id: number;
  createdAt: string;
  content: string;
}

export interface CustomDialogProps {
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
}
