// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import { cn } from "@/lib/util";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { CalendarProps } from "@/type/component";
import moment from "moment";
import { CheckSquare, Square } from "lucide-react";
import useLocalStorageState from "use-local-storage-state";
import {
  HabitsLocalStorageType,
  TasksLocalStorageType,
} from "@/type/localStorage";

// Defining global variables
const weekdays = [
  "monday",
  "tuesday",
  "wendesday",
  "thurdsay",
  "friday",
  "saturday",
  "sunday",
];

// Creating ane exporting Calendar component as default
export default function Calendar({ className }: CalendarProps) {
  // Defining hooks of component
  const [tasks] = useLocalStorageState<TasksLocalStorageType>("tasks");
  const [habits] = useLocalStorageState<HabitsLocalStorageType>("habits");

  // Returning JSX
  return (
    <Card className={cn("pb-0 overflow-hidden", className)}>
      <CardHeader>
        <CardTitle>Calendar</CardTitle>
        <CardDescription>
          A clear view of your days, deadlines, and routines.
        </CardDescription>
      </CardHeader>
      <div className="grid grid-cols-7 border-t border-t-foreground/10">
        {weekdays.map((weekday, index) => (
          <div
            key={index}
            className={cn(
              index + 1 === moment().get("weekday")
                ? "bg-primary text-primary-foreground"
                : "bg-card",
            )}
          >
            <div className="text-current text-sm truncate text-center block border-b border-current/10 py-3">
              {weekday}
            </div>
            <div className="p-6 flex flex-col gap-3"></div>
          </div>
        ))}
      </div>
    </Card>
  );
}
// {calendarData.length === 0 ? (
//                 <span className="text-current text-left truncate block flex-1 text-xs">
//                   There is nothing to show
//                 </span>
//               ) : (
//                 calendarData.map((item, index) => (
//                   <div
//                     className="flex items-center justify-center gap-3"
//                     key={index}
//                   >
//                     <div className="flex items-center justify-center gap-2 flex-1">
//                       {item.done ? (
//                         <CheckSquare className="text-current size-3 shrink-0" />
//                       ) : (
//                         <Square className="text-current size-3 shrink-0" />
//                       )}
//                       <span className="text-current text-left truncate block flex-1 text-xs">
//                         {item.title}
//                       </span>
//                     </div>
//                   </div>
//                 ))
//               )}
