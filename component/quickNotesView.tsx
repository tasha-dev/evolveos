// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import { QuickNotesViewProps } from "@/type/component";
import { note } from "@/type/general";
import useLocalStorageState from "use-local-storage-state";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

// Creating and exporting QuickNotesView component as default
export default function QuickNotesView({ className }: QuickNotesViewProps) {
  // Defining hooks
  const [notes] = useLocalStorageState<note[]>("notes");

  // Defining variables
  const notesToRender = notes ? [...notes] : [];

  // Returning JSX
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Notes</CardTitle>
        <CardDescription>
          An overview of your latest notes, Making sure to not forget them.
        </CardDescription>
      </CardHeader>
      <div className="prose dark:prose-invert prose-neutral max-w-full w-full">
        {notesToRender.length === 0 ? (
          <span className="text-center block truncate">
            There is nothing to show
          </span>
        ) : (
          <ul className="list-inside">
            {notesToRender.map((item, index) => (
              <li key={index}>{item.content}</li>
            ))}
          </ul>
        )}
      </div>
    </Card>
  );
}
