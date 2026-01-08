// Codes by mahdi tasha
// Importing part
import { habit, WeekDay } from "@/type/general";
import { HabitPoint } from "@/type/util";
import { clsx, type ClassValue } from "clsx";
import moment from "moment";
import { twMerge } from "tailwind-merge";

// Creating and exporting helper and utility functions
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const DAY_MAP: Record<number, WeekDay> = {
  0: "sunday",
  1: "monday",
  2: "tuesday",
  3: "wendesday",
  4: "thursday",
  5: "friday",
  6: "saturday",
};

export const getLast30DaysHabitPoints = (habits: habit[]): HabitPoint[] => {
  const result: HabitPoint[] = [];

  for (let i = 29; i >= 0; i--) {
    const date = moment().subtract(i, "days");
    const dayName = DAY_MAP[date.day()];

    let point = 0;

    for (const habit of habits) {
      if (habit.on.includes(dayName)) {
        point += habit.done ? 1 : 0;
      }
    }

    result.push({
      date: date.format("YYYY-MM-DD"),
      point,
    });
  }

  return result;
};
