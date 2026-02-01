// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import { ContainerProps } from "@/type/component";
import { habit } from "@/type/general";
import { HabitsLocalStorageType } from "@/type/localStorage";
import useLocalStorageState from "use-local-storage-state";
import HabitCard from "../containerItem/habitCard";

// Creating and exporting HabitsContainer component as default
export default function HabitsContainer({ className }: ContainerProps) {
  // Defining hooks
  const [habitsLocalStorage] =
    useLocalStorageState<HabitsLocalStorageType>("habits");

  // Defining variables
  const habits: habit[] = habitsLocalStorage ? [...habitsLocalStorage] : [];

  // Returning JSX
  return (
    <div className={className}>
      {habits.length === 0 ? (
        <h3 className="font-semibold text-center truncate block text-lg">
          There is nothing to show
        </h3>
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
