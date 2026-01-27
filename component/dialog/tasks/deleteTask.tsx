// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import { Loader2, Trash } from "lucide-react";
import { Button } from "@/component/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/component/ui/dialog";
import { sleep } from "@/lib/util";
import useLocalStorageState from "use-local-storage-state";
import { TasksLocalStorageType } from "@/type/localStorage";
import { toast } from "sonner";
import { DeleteTasksDialogProps } from "@/type/component";
import { useState } from "react";

// Creating and exporting DeleteTask Dialog as default
export default function DeleteTask({ id }: DeleteTasksDialogProps) {
  // Defining hooks
  const [open, setOpened] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [tasksLocalStorage, setTasks] =
    useLocalStorageState<TasksLocalStorageType>("tasks");

  // Defining variables
  const tasks = tasksLocalStorage ? [...tasksLocalStorage] : [];

  // Defining submit handler
  const submitHandler = async () => {
    const journalsToSet = tasks.filter((item) => item.id !== id);

    setLoading(true);
    await sleep(3000);

    setTasks(journalsToSet);
    setOpened(false);
    setLoading(false);

    toast.success("The task was removed successfully.");
    // toast.error("Something went wrong. Please try again.");
  };

  // Returning JSX
  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!loading) {
          setOpened(open);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant={"destructive"} size="icon-sm" className="shrink-0">
          <Trash />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete task?</DialogTitle>
          <DialogDescription>
            This task will be permanently removed from your list. This action
            can’t be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button
              variant={"ghost"}
              size="lg"
              type="button"
              disabled={loading}
            >
              Cancle
            </Button>
          </DialogClose>
          <Button
            size="lg"
            type="submit"
            disabled={loading}
            onClick={submitHandler}
            variant={"destructive"}
          >
            {loading ? <Loader2 className="animate-spin" /> : <Trash />}
            Yes, Im sure
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
