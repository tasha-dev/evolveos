// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import { ContainerProps } from "@/type/component";
import TaskItem from "../containerItem/taskItem";
import useDb from "use-db";
import { TasksIndexedDBType } from "@/type/indexedDb";
import EmptyContainer from "../emptyContainer";
import { CheckSquare } from "lucide-react";

// Creating and exporting TasksContainer component as default
export default function TasksContainer({ className }: ContainerProps) {
  // Defining hooks
  const [tasksLocalStorage] = useDb<TasksIndexedDBType>("tasks");

  // Defining variables
  const tasks = tasksLocalStorage ? [...tasksLocalStorage] : [];

  // Returning JSX
  return (
    <div className={className}>
      {tasks.length === 0 ? (
        <EmptyContainer icon={<CheckSquare />} />
      ) : (
        <div className="flex gap-8 w-full flex-col">
          {tasks.map((item, index) => (
            <TaskItem key={index} data={item} />
          ))}
        </div>
      )}
    </div>
  );
}
