// Codes by mahdi tasha
// Importing part
import {
  HabitsLocalStorageType,
  TasksLocalStorageType,
} from "@/type/localStorage";
import { CalendarItemType } from "@/type/util";
import { clsx, type ClassValue } from "clsx";
import moment from "moment";
import { twMerge } from "tailwind-merge";

// Defining variables
const dateFormat = "YYYY/MM/DD";

// Creating and exporting helper and utility functions
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getLast30DaysOfHabitScore(
  habitsLocalStorage: HabitsLocalStorageType,
) {
  // Defining variables
  let arrayToReturn = [];

  // Defining simple for loop to get last 30 days and verify them
  for (let i = 30; i >= 0; i--) {
    const yesterday = moment().subtract(i, "day").format(dateFormat);
    const foundedYesterday = habitsLocalStorage.filter((item) =>
      item.doneAt.includes(yesterday),
    );

    arrayToReturn.push({
      date: yesterday,
      score: foundedYesterday ? foundedYesterday.length : 0,
    });
  }

  // Returning part
  return arrayToReturn;
}
