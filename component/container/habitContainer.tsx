// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import { ContainerProps } from "@/type/component";
import { habit } from "@/type/general";
import HabitCard from "../containerItem/habitCard";
import useDb from "use-db";
import { HabitsIndexedDBType } from "@/type/indexedDb";
import { Repeat } from "lucide-react";
import EmptyContainer from "../emptyContainer";

// Creating and exporting HabitsContainer component as default
export default function HabitsContainer({ className }: ContainerProps) {
  // Defining hooks
  const [habitsLocalStorage] = useDb<HabitsIndexedDBType>("habits");

  // Defining variables
  const habits: habit[] = habitsLocalStorage ? [...habitsLocalStorage] : [];

  // Returning JSX
  return (
    <div className={className}>
      {habits.length === 0 ? (
        <EmptyContainer icon={<Repeat />} />
      ) : (
        <div className="grid lg:grid-cols-2 gap-4">
          {habits.map((item, index) => (
            <HabitCard key={index} data={item} />
          ))}
        </div>
      )}
    </div>
  );
}
