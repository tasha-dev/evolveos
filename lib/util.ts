// Codes by mahdi tasha
// Importing part
import {
  HabitsLocalStorageType,
  ProjectsLocalStorageType,
  TasksLocalStorageType,
} from "@/type/localStorage";
import {
  CalendarItemType,
  CalenderItemWeekDayIndex,
  GroupedCalendarItems,
} from "@/type/util";
import { clsx, type ClassValue } from "clsx";
import moment, { Moment } from "moment";
import { twMerge } from "tailwind-merge";

// Defining variables
export const dateFormat = "YYYY/MM/DD";

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

export function getDaysOfThisWeek() {
  // Defining valriables
  const startOfWeek = moment().startOf("week");
  let arrayToReturn = [];

  // Using a for loop to get next 7 days of start of week
  for (let i = 0; i <= 6; i++) {
    const dayAfterStartOfWeek = startOfWeek.add(i, "day");
    arrayToReturn.push(dayAfterStartOfWeek.format(dateFormat));
  }

  // Returning part
  return arrayToReturn;
}

export function isInThisWeek(date: string | Moment) {
  // Defining variables
  const dateMoment = moment(date);
  const startOfWeek = moment().startOf("week");
  const endOfWeek = moment().endOf("week");

  // Returning part
  return dateMoment.isBetween(startOfWeek, endOfWeek, "day", "[]");
}

export function groupByWeekDay(
  items: CalendarItemType[],
): GroupedCalendarItems[] {
  // Defining variables
  const result: GroupedCalendarItems[] = Array.from(
    { length: 7 },
    (_, index) => ({
      index: index as CalenderItemWeekDayIndex,
      items: [],
    }),
  );

  // Pusing
  items.forEach((item) => {
    if (item.on === "everyday") {
      result.forEach((day) => day.items.push(item));
    } else {
      result[item.on].items.push(item);
    }
  });

  // Returning part
  return result;
}

export function getThisWeekItems(
  tasks: TasksLocalStorageType,
  projects: ProjectsLocalStorageType,
  habits: HabitsLocalStorageType,
): GroupedCalendarItems[] {
  // Defining variables
  const today = moment().format(dateFormat);
  const startsOfProjectsOfWeek = projects.filter((item) =>
    isInThisWeek(item.timing.start),
  );

  const deadLineOfProjectsOfWeek = projects.filter((item) =>
    isInThisWeek(item.timing.deadLine),
  );

  // Reshaping the arrays
  const formatedStartsOfProjects: CalendarItemType[] =
    startsOfProjectsOfWeek.map((item) => ({
      title: item.title,
      hour: moment(item.timing.start).format("HH:MM"),
      on: moment(item.timing.start).weekday() as CalenderItemWeekDayIndex,
      done: item.done,
      type: "project-start",
    }));

  const formatedDeadLineOfProjects: CalendarItemType[] =
    deadLineOfProjectsOfWeek.map((item) => ({
      title: item.title,
      hour: moment(item.timing.deadLine).format("HH:MM"),
      on: moment(item.timing.deadLine).weekday() as CalenderItemWeekDayIndex,
      done: item.done,
      type: "project-deadline",
    }));

  const habitsOfWeek: CalendarItemType[] = habits.map((item) => ({
    hour: moment(item.on.time).format("HH:MM"),
    title: item.title,
    on: item.on.days,
    done: item.doneAt.includes(today),
    type: "habit",
  }));

  // Grouping
  const arrayToReturn = [
    ...formatedStartsOfProjects,
    ...formatedDeadLineOfProjects,
    ...habitsOfWeek,
  ];

  // Returning part
  return groupByWeekDay(arrayToReturn);
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
