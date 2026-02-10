// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import { cn, getDaysOfThisWeek, getThisWeekItems } from "@/lib/util";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/component/ui/card";
import { CalendarProps } from "@/type/component";
import moment from "moment";
import {
  Brain,
  CalendarArrowDown,
  CalendarArrowUp,
  Clipboard,
} from "lucide-react";
import {
  TooltipContent,
  TooltipTrigger,
  Tooltip,
} from "@/component/ui/tooltip";
import useDb from "use-db";
import { HabitsIndexedDBType, ProjectsIndexedDBType } from "@/type/indexedDb";

// Creating ane exporting Calendar component as default
export default function Calendar({ className }: CalendarProps) {
  // Defining hooks
  const [habitsLocalStorage] = useDb<HabitsIndexedDBType>("habits");
  const [projectsLocalStorage] = useDb<ProjectsIndexedDBType>("projects");

  // Defining variables
  const habits = habitsLocalStorage ? [...habitsLocalStorage] : [];
  const projects = projectsLocalStorage ? [...projectsLocalStorage] : [];
  const daysOfWeek = getDaysOfThisWeek();
  const calenderItems = getThisWeekItems(projects, habits) || [];

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
        {daysOfWeek.map((weekday, index) => (
          <div
            key={index}
            className={cn(
              "not-last-of-type:border-r border-r-current/10",
              moment().get("weekday") === index
                ? "dark:bg-neutral-950 bg-neutral-100"
                : "bg-card",
            )}
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="text-current text-sm truncate text-center block border-b border-current/10 p-3">
                  {moment(weekday).weekday(index).format("dddd")}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                {moment(weekday).format("YYYY MMMM DD")}
              </TooltipContent>
            </Tooltip>
            <div className="flex flex-col min-h-[250px]">
              {calenderItems[index].items.map((item, itemIndex) => (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      key={itemIndex}
                      className="flex items-center justify-center gap-2 w-full border-b border-b-current/10 p-3"
                    >
                      {item.type === "habit" ? (
                        <Brain className="size-3 shrink-0 text-current" />
                      ) : item.type === "project-deadline" ? (
                        <CalendarArrowDown className="size-3 shrink-0 text-current" />
                      ) : item.type === "project-start" ? (
                        <CalendarArrowUp className="size-3 shrink-0 text-current" />
                      ) : item.type === "task" ? (
                        <Clipboard className="size-3 shrink-0 text-current" />
                      ) : (
                        false
                      )}
                      <span
                        className={cn(
                          "text-current text-left truncate block flex-1 text-xs",
                          item.done && "line-through",
                        )}
                      >
                        {item.title}
                      </span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    {`
                        ${item.title}
                        - On ${moment(weekday).weekday(index).format("dddd")}
                        - ${
                          item.type === "project-start"
                            ? "Project Start"
                            : item.type === "project-deadline"
                              ? "Project Deadline"
                              : item.type
                        }
                    `}
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
