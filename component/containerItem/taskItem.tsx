// Codes by mahdi tasha
// Importing part
import { TaskItemProps } from "@/type/component";
import { Checkbox } from "@/component/ui/checkbox";
import moment from "moment";
import { cn } from "@/lib/util";
import DeleteTask from "../dialog/tasks/deleteTask";
import EditTask from "../dialog/tasks/editTask";
import { useState } from "react";
import useDb from "use-db";
import { TasksIndexedDBType } from "@/type/indexedDb";

// Creating and exporting TaskItem component as default
export default function TaskItem({
  data: { createdAt, done, id, title },
  className,
}: TaskItemProps) {
  // Defining hooks
  const [doneState, setDoneState] = useState<boolean>(done);
  const [tasksLocalStorage, setTasks] = useDb<TasksIndexedDBType>("tasks");

  // Defining variables
  const tasks = tasksLocalStorage ? [...tasksLocalStorage] : [];

  // Defining checkbox check event handler
  function handleCheckboxChange(checked: boolean) {
    const tasksToSet = tasks.map((item) =>
      item.id === id
        ? {
            ...item,
            done: checked,
          }
        : item,
    );

    setTasks(tasksToSet);
  }

  // Returning JSX
  return (
    <div
      data-done={doneState}
      className={cn(
        "flex items-center justify-between gap-3 w-full data-[done=false]:text-foreground data-[done=true]:text-muted-foreground group duration-500 transition-colors",
        className,
      )}
    >
      <div className="flex items-center justify-start gap-3 w-full flex-1 overflow-hidden">
        <Checkbox
          checked={doneState}
          className="size-5 shrink-0"
          onCheckedChange={(checked) => {
            if (typeof checked !== "string") {
              handleCheckboxChange(checked);
              setDoneState(checked);
            }
          }}
        />
        <span className="font-medium text-current truncate block text-left flex-1 text-sm group-data-[done=true]:line-through">
          {title}
        </span>
      </div>
      <div className="flex items-center justify-end gap-3">
        <span className="text-sm text-muted-foreground text-left truncate block">
          {moment(createdAt).format("YYYY MMMM DD")}
        </span>
        <DeleteTask id={id} />
        <EditTask data={{ id, title }} />
      </div>
    </div>
  );
}
