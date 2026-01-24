// Creating and exporting used types for utility functions
export interface CalendarItemType {
  type: "task" | "habit";
  title: string;
  done: boolean;
}
