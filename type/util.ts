// Creating and exporting used types for utility functions
export type CalenderItemWeekDayIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export interface CalendarItemType {
  type: "task" | "project-start" | "project-deadline" | "habit";
  title: string;
  done: boolean;
  hour: string;
  on: CalenderItemWeekDayIndex | "everyday";
}

export interface GroupedCalendarItems {
  index: CalenderItemWeekDayIndex;
  items: CalendarItemType[];
}
