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
import { toast } from "sonner";
import { DeleteProjectDialogProps } from "@/type/component";
import { useState } from "react";
import useDb from "use-db";
import { ProjectsIndexedDBType } from "@/type/indexedDb";

// Creating and exporting DeleteProject Dialog as default
export default function DeleteProject({
  onOpenChange,
  open,
  id,
}: DeleteProjectDialogProps) {
  // Defining hooks
  const [loading, setLoading] = useState<boolean>(false);
  const [projectsLocalStorage, setProjects] =
    useDb<ProjectsIndexedDBType>("projects");

  // Defining variables
  const projects = projectsLocalStorage ? [...projectsLocalStorage] : [];

  // Defining submit handler
  const submitHandler = async () => {
    try {
      const projectsToSet = projects.filter((item) => item.id !== id);

      setLoading(true);
      await sleep(3000);

      setProjects(projectsToSet);
      onOpenChange?.(false);
      setLoading(false);

      toast.success("The project has been permanently removed.");
    } catch {
      toast.error("Could not delete the project. Please try again.");
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
          <DialogTitle>Delete The Project ?</DialogTitle>
          <DialogDescription>
            Are you sure you want to permanently delete this project ? This
            action cannot be undone.
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
