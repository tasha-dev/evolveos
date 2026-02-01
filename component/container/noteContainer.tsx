// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import { ContainerProps } from "@/type/component";
import { journal } from "@/type/general";
import { NotesLocalStorageType } from "@/type/localStorage";
import useLocalStorageState from "use-local-storage-state";
import NoteCard from "../containerItem/noteCard";

// Creating and exporting NoteContainer component as default
export default function NoteContainer({ className }: ContainerProps) {
  // Defining hooks
  const [noteLocalStorage] =
    useLocalStorageState<NotesLocalStorageType>("notes");

  // Defining variables
  const journals: journal[] = noteLocalStorage ? [...noteLocalStorage] : [];

  // Returning JSX
  return (
    <div className={className}>
      {journals.length === 0 ? (
        <h3 className="font-semibold text-center truncate block text-lg">
          There is nothing to show
        </h3>
      ) : (
        <div className="grid lg:grid-cols-2 gap-4">
          {journals.map((item, index) => (
            <NoteCard key={index} data={item} />
          ))}
        </div>
      )}
    </div>
  );
}
