// Codes by mahdi tasha
// Importing part
import { Project } from "next/dist/build/swc/types";
import { habit, journal, note, task } from "./general";

// Defining type for saved items in local storage
export type NotesLocalStorageType = note[];
export type JournalsLocalStorageType = journal[];
export type ProjectsLocalStorageType = Project[];
export type TasksLocalStorageType = task[];
export type HabitsLocalStorageType = habit[];
