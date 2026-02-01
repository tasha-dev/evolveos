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
} from "@/component/ui/dialog";
import { sleep } from "@/lib/util";
import useLocalStorageState from "use-local-storage-state";
import { HabitsLocalStorageType } from "@/type/localStorage";
import { toast } from "sonner";
import { DeleteHabitDialogProps } from "@/type/component";
import { useState } from "react";

// Creating and exporting DeleteHabit Dialog as default
export default function DeleteHabit({
  onOpenChange,
  open,
  id,
}: DeleteHabitDialogProps) {
  // Defining hooks
  const [loading, setLoading] = useState<boolean>(false);
  const [habitsLocalStorage, setHabits] =
    useLocalStorageState<HabitsLocalStorageType>("habits");

  // Defining variables
  const habits = habitsLocalStorage ? [...habitsLocalStorage] : [];

  // Defining submit handler
  const submitHandler = async () => {
    try {
      const habitsToSet = habits.filter((item) => item.id !== id);

      setLoading(true);
      await sleep(3000);

      setHabits(habitsToSet);
      onOpenChange?.(false);
      setLoading(false);

      toast.success("Habit deleted.");
    } catch {
      toast.error("Couldn’t delete habit. Something went wrong. Try again.");
    }
  };

  // Returning JSX
  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!loading) {
          onOpenChange?.(open);
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete habit?</DialogTitle>
          <DialogDescription>
            This habit and its tracking history will be removed. This action
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
