// Codes by mahdi tasha
// Importing part
import { HabitsIndexedDBType, ProjectsIndexedDBType } from "@/type/indexedDb";
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
  habitsLocalStorage: HabitsIndexedDBType,
) {
  const arrayToReturn = [];

  for (let i = 29; i >= 0; i--) {
    const day = moment().subtract(i, "day").format("YYYY-MM-DD");

    const doneHabits = habitsLocalStorage.filter((h) =>
      h.doneAt.some((dateStr) => moment(dateStr).format("YYYY-MM-DD") === day),
    );

    arrayToReturn.push({
      date: day,
      score: doneHabits.length,
    });
  }

  return arrayToReturn;
}

export function getDaysOfThisWeek() {
  const startOfWeek = moment().startOf("week");
  const arrayToReturn: string[] = [];

  for (let i = 0; i <= 6; i++) {
    const day = startOfWeek.clone().add(i, "day");
    arrayToReturn.push(day.format(dateFormat));
  }

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
  projects: ProjectsIndexedDBType,
  habits: HabitsIndexedDBType,
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

export function sortLast10Items<T>(
  data: Array<
    T & {
      createdAt: string;
    }
  >,
) {
  const sortedData = data.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  );

  const slicedData = sortedData.slice(0, 10);
  return slicedData;
}
