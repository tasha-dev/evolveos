// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import { QuickJournalViewProps } from "@/type/component";
import { journal } from "@/type/general";
import useLocalStorageState from "use-local-storage-state";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

// Creating and exporting QuickJournalView component as default
export default function QuickJournalView({ className }: QuickJournalViewProps) {
  // Defining hooks
  const [journals] = useLocalStorageState<journal[]>("journals");

  // Defining variables
  const journalsToRender = journals ? journals.slice(0, 10) : [];

  // Returning JSX
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Journals</CardTitle>
        <CardDescription className="line-clamp-2">
          Your glouries story of success, day by day.
        </CardDescription>
      </CardHeader>
      <div className="prose dark:prose-invert prose-neutral max-w-full w-full">
        {journalsToRender.length === 0 ? (
          <span className="text-center block truncate">
            There is nothing to show
          </span>
        ) : (
          <ul className="list-inside">
            {journalsToRender.map((item, index) => (
              <li key={index}>{item.title}</li>
            ))}
          </ul>
        )}
      </div>
    </Card>
  );
}
