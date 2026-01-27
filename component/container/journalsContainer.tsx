// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import { ContainerProps } from "@/type/component";
import { journal } from "@/type/general";
import { JournalsLocalStorageType } from "@/type/localStorage";
import useLocalStorageState from "use-local-storage-state";
import JournalCard from "../containerItem/journalCard";

// Creating and exporting JournalsContainer component as default
export default function JournalsContainer({ className }: ContainerProps) {
  // Defining hooks
  const [journalsLocalStorage] =
    useLocalStorageState<JournalsLocalStorageType>("journals");

  // Defining variables
  const journals: journal[] = journalsLocalStorage
    ? [...journalsLocalStorage]
    : [];

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
            <JournalCard key={index} data={item} />
          ))}
        </div>
      )}
    </div>
  );
}
