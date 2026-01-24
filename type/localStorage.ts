// Codes by mahdi tasha
// Importing part
import { Project } from "next/dist/build/swc/types";
import { habit, journal, note, project, task } from "./general";

// Defining type for saved items in local storage
export type NotesLocalStorageType = note[];
export type JournalsLocalStorageType = journal[];
export type ProjectsLocalStorageType = project[];
export type TasksLocalStorageType = task[];
export type HabitsLocalStorageType = habit[];
