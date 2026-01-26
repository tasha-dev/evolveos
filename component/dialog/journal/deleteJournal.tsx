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
import { JournalsLocalStorageType } from "@/type/localStorage";
import { toast } from "sonner";
import { DeleteJournalDialogProps } from "@/type/component";
import { useState } from "react";

// Creating and exporting DeleteJournal Dialog as default
export default function DeleteJournal({
  onOpenChange,
  open,
  data,
}: DeleteJournalDialogProps) {
  // Defining hooks
  const [loading, setLoading] = useState<boolean>(false);
  const [journalsLocalStorage, setJournals] =
    useLocalStorageState<JournalsLocalStorageType>("journals");

  // Defining variables
  const journals = journalsLocalStorage ? [...journalsLocalStorage] : [];

  // Defining submit handler
  const submitHandler = async () => {
    const journalsToSet = journals.filter((item) => item.id !== data.id);

    setLoading(true);
    await sleep(3000);

    setJournals(journalsToSet);
    onOpenChange?.(false);
    setLoading(false);

    toast.success("The journal item has been permanently removed.");
    // toast.error("Could not delete the journal item. Please try again.");
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
          <DialogTitle>Delete The Journal ?</DialogTitle>
          <DialogDescription>
            Are you sure you want to permanently delete the journal item titled:
            “{data.title}”? This action cannot be undone.
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
