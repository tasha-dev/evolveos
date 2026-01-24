// Codes by mahdi tasha
// Importing part
import { Project } from "next/dist/build/swc/types";
import { habit, journal, note, task } from "./general";

// Defining type for saved items in local storage
export type NotesLocalStorageType = note[];
export type JournalsLocalStorageType = journal[];
export interface ProjectsLocalStorageType {
  done: number[];
  items: Project[];
}

export interface TasksLocalStorageType {
  done: number[];
  items: task[];
}

export interface HabitsLocalStorageType {
  done: number[];
  items: habit[];
}
