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
import { NotesLocalStorageType } from "@/type/localStorage";
import { toast } from "sonner";
import { DeleteNoteDialogProps } from "@/type/component";
import { useState } from "react";

// Creating and exporting DeleteNote Dialog as default
export default function DeleteNote({
  onOpenChange,
  open,
  id,
}: DeleteNoteDialogProps) {
  // Defining hooks
  const [loading, setLoading] = useState<boolean>(false);
  const [notesLocalStorage, setNotes] =
    useLocalStorageState<NotesLocalStorageType>("notes");

  // Defining variables
  const notes = notesLocalStorage ? [...notesLocalStorage] : [];

  // Defining submit handler
  const submitHandler = async () => {
    try {
      const notesToSet = notes.filter((item) => item.id !== id);

      setLoading(true);
      await sleep(3000);

      setNotes(notesToSet);
      onOpenChange?.(false);
      setLoading(false);

      toast.success("Note deleted. The note was removed successfully.");
    } catch {
      toast.error("Something went wrong. Please try again.");
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
          <DialogTitle>Delete note?</DialogTitle>
          <DialogDescription>
            This note will be permanently removed. You won’t be able to recover
            it later.
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
