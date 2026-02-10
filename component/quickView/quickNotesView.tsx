// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import { QuickNotesViewProps } from "@/type/component";
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
import { NotesIndexedDBType } from "@/type/indexedDb";

// Creating and exporting QuickNotesView component as default
export default function QuickNotesView({ className }: QuickNotesViewProps) {
  // Defining hooks
  const [notes] = useDb<NotesIndexedDBType>("notes");

  // Defining variables
  const notesToRender = notes ? sortLast10Items([...notes]) : [];

  // Returning JSX
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Notes (Latest)</CardTitle>
        <CardDescription className="line-clamp-2">
          An overview of your latest notes, Making sure to not forget them.
        </CardDescription>
      </CardHeader>
      <div className="prose dark:prose-invert prose-neutral max-w-full w-full px-6">
        {notesToRender.length === 0 ? (
          <span className="text-center block truncate">
            There is nothing to show
          </span>
        ) : (
          <div className="flex flex-col gap-3">
            {notesToRender.map((item, index) => (
              <DashboardListItem
                key={index}
                title={item.title}
                date={moment(item.createdAt).format(dateFormat)}
                icon={"circle"}
              />
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
