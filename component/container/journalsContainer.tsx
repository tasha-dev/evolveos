// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import { ContainerProps } from "@/type/component";
import { journal } from "@/type/general";
import JournalCard from "../containerItem/journalCard";
import useDb from "use-db";
import { JournalsIndexedDBType } from "@/type/indexedDb";
import EmptyContainer from "../emptyContainer";
import { Book } from "lucide-react";

// Creating and exporting JournalsContainer component as default
export default function JournalsContainer({ className }: ContainerProps) {
  // Defining hooks
  const [journalsLocalStorage] = useDb<JournalsIndexedDBType>("journals");

  // Defining variables
  const journals: journal[] = journalsLocalStorage
    ? [...journalsLocalStorage]
    : [];

  // Returning JSX
  return (
    <div className={className}>
      {journals.length === 0 ? (
        <EmptyContainer icon={<Book />} />
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
