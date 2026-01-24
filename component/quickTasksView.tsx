// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import { QuickTasksViewProps } from "@/type/component";
import { task } from "@/type/general";
import useLocalStorageState from "use-local-storage-state";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Square, SquareCheck } from "lucide-react";

// Creating and exporting QuickTasksView component as default
export default function QuickTasksView({ className }: QuickTasksViewProps) {
  // Defining hooks
  const [tasks] = useLocalStorageState<task[]>("tasks");

  // Defining variables
  const tasksToRender = tasks ? tasks.slice(0, 10) : [];

  // Returning JSX
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Tasks</CardTitle>
        <CardDescription className="line-clamp-2">
          An overview of your latest Tasks, Today's hard work, is Tommorow's
          improvement.
        </CardDescription>
      </CardHeader>
      <div className="prose dark:prose-invert prose-neutral max-w-full w-full">
        {tasksToRender.length === 0 ? (
          <span className="text-center block truncate">
            There is nothing to show
          </span>
        ) : (
          <ul className="list-inside">
            {tasksToRender.map((item, index) => (
              <li key={index}>
                {item.done ? (
                  <SquareCheck className="inline-flex mr-2 size-4 shrink-0" />
                ) : (
                  <Square className="inline-flex mr-2 size-4 shrink-0" />
                )}
                <span className="text-left truncate inline-flex">
                  {item.title}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Card>
  );
}
