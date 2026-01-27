// Codes by mahdi tasha
// Importing part
import { TaskItemProps } from "@/type/component";
import Checkbox from "../ui/checkbox";
import moment from "moment";
import { cn } from "@/lib/util";
import useLocalStorageState from "use-local-storage-state";
import { TasksLocalStorageType } from "@/type/localStorage";

// Creating and exporting TaskItem component as default
export default function TaskItem({
  data: { createdAt, done, id, title },
  className,
}: TaskItemProps) {
  // Defining hooks
  const [tasksLocalStorage, setTasks] =
    useLocalStorageState<TasksLocalStorageType>("tasks");

  // Defining variables
  const tasks = tasksLocalStorage ? [...tasksLocalStorage] : [];

  // Defining checkbox check event handler
  function handleCheckboxChange(checked: boolean) {
    const tasksToSet = tasks.map((item) =>
      item.id === id
        ? {
            ...item,
            done: !checked,
          }
        : item,
    );

    setTasks(tasksToSet);
  }

  // Returning JSX
  return (
    <div
      data-done={done}
      className={cn(
        "flex items-center justify-between gap-3 w-full data-[done=false]:text-foreground data-[done=true]:text-muted-foreground group duration-500 transition-colors",
        className,
      )}
    >
      <div className="flex items-center justify-start gap-3 w-full">
        <Checkbox
          checked={done}
          className="size-5 shrink-0"
          onCheckChange={handleCheckboxChange}
        />
        <span className="font-medium text-current truncate block text-left flex-1 text-sm group-data-[done=true]:line-through">
          {title}
        </span>
      </div>
      <span className="text-sm text-muted-foreground text-right shrink-0">
        {moment(createdAt).format("YYYY MMMM DD | HH:MM")}
      </span>
    </div>
  );
}
