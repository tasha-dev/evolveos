// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import { ContainerProps } from "@/type/component";
import { journal } from "@/type/general";
import NoteCard from "../containerItem/noteCard";
import useDb from "use-db";
import { NotesIndexedDBType } from "@/type/indexedDb";

// Creating and exporting NoteContainer component as default
export default function NoteContainer({ className }: ContainerProps) {
  // Defining hooks
  const [noteLocalStorage] = useDb<NotesIndexedDBType>("notes");

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
