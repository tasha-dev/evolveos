// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import { HabitCardProps } from "@/type/component";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import moment from "moment";
import { dateFormat } from "@/lib/util";
import { Pen, Trash } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../ui/context-menu";
import { Checkbox } from "../ui/checkbox";
import { useState } from "react";
import EditHabit from "../dialog/habit/editHabit";
import DeleteHabit from "../dialog/habit/deleteHabit";
import useDb from "use-db";
import { HabitsIndexedDBType } from "@/type/indexedDb";

// Creating and exporting HabitCard component as default
export default function HabitCard({
  data: { createdAt, id, on, title, doneAt },
  className,
}: HabitCardProps) {
  // Defining hooks
  const [editOpened, setEditOpened] = useState<boolean>(false);
  const [deleteOpened, setDeleteOpened] = useState<boolean>(false);
  const [habitsLocalStorage, setHabits] = useDb<HabitsIndexedDBType>("habits");

  // Defining variables
  const habits = habitsLocalStorage ? [...habitsLocalStorage] : [];
  const formatedToday = moment().format(dateFormat);
  const todayWeekdayName = moment().format("dddd");
  const itemOnWeekDayName =
    on.days === "everyday" ? "Everyday" : moment().day(on.days).format("dddd");

  const isForToday =
    itemOnWeekDayName === "Everyday"
      ? true
      : todayWeekdayName === itemOnWeekDayName;

  const isDoneToday = !!doneAt.find(
    (item) => moment(item).format(dateFormat) === formatedToday,
  );

  // Defining a function to handle checkbox onclick
  function handleCheckboxOnChange(checked: boolean) {
    if (isForToday) {
      const isoStringOfToday = moment().toISOString();
      const habitsToSet = habits.map((item) =>
        item.id === id
          ? {
              ...item,
              doneAt: checked
                ? [...item.doneAt, isoStringOfToday]
                : item.doneAt.filter((item) => item === isoStringOfToday),
            }
          : item,
      );

      setHabits(habitsToSet);
    }
  }

  // Returning JSX
  return (
    <>
      <EditHabit
        onOpenChange={setEditOpened}
        open={editOpened}
        data={{
          id,
          onDaysIndex: on.days,
          onTime: on.time,
          title,
        }}
      />
      <DeleteHabit id={id} onOpenChange={setDeleteOpened} open={deleteOpened} />
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <Card className={className}>
            <CardHeader className="flex items-center justify-between">
              <div>
                <CardTitle className="mb-2">{title}</CardTitle>
                <CardDescription>
                  {`${moment(createdAt).format(dateFormat)} - ${itemOnWeekDayName} , ${on.time}`}
                </CardDescription>
              </div>
              <Tooltip>
                <TooltipTrigger className="shrink-0" asChild>
                  <Checkbox
                    onCheckedChange={handleCheckboxOnChange}
                    disabled={!isForToday}
                    checked={isDoneToday}
                    className="size-5"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  {!isForToday
                    ? "This item is disabled right now"
                    : isDoneToday
                      ? "This habit is done"
                      : "This habit is not done"}
                </TooltipContent>
              </Tooltip>
            </CardHeader>
          </Card>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onClick={() => setEditOpened(true)}>
            <Pen />
            Edit
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => setDeleteOpened(true)}
            variant="destructive"
          >
            <Trash />
            Delete
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </>
  );
}
