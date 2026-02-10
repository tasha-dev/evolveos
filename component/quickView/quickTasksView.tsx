// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import { QuickTasksViewProps } from "@/type/component";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/component/ui/card";
import DashboardListItem from "@/component/dashboard/dashboardListItem";
import moment from "moment";
import { dateFormat, sortLast10Items } from "@/lib/util";
import useDb from "use-db";
import { TasksIndexedDBType } from "@/type/indexedDb";

// Creating and exporting QuickTasksView component as default
export default function QuickTasksView({ className }: QuickTasksViewProps) {
  // Defining hooks
  const [tasks] = useDb<TasksIndexedDBType>("tasks");

  // Defining variables
  const tasksToRender = tasks ? sortLast10Items([...tasks]) : [];

  // Returning JSX
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Tasks (Latest)</CardTitle>
        <CardDescription className="line-clamp-2">
          An overview of your latest Tasks, Today's hard work, is Tommorow's
          improvement.
        </CardDescription>
      </CardHeader>
      <div className="prose dark:prose-invert prose-neutral max-w-full w-full px-6">
        {tasksToRender.length === 0 ? (
          <span className="text-center block truncate">
            There is nothing to show
          </span>
        ) : (
          <div className="flex flex-col gap-3">
            {tasksToRender.map((item, index) => (
              <DashboardListItem
                icon={item.done ? "circle-fill" : "circle"}
                key={index}
                title={item.title}
                date={moment(item.createdAt).format(dateFormat)}
              />
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
