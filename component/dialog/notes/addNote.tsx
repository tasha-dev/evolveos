// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import { Loader2, Plus } from "lucide-react";
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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/component/ui/tooltip";
import { useState } from "react";
import { AddJournalFormSchema as FormSchema } from "@/lib/formSchema";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/component/ui/form";
import { Input } from "@/component/ui/input";
import { sleep } from "@/lib/util";
import useLocalStorageState from "use-local-storage-state";
import { NotesLocalStorageType } from "@/type/localStorage";
import { note } from "@/type/general";
import { toast } from "sonner";
import { Kbd } from "@/component/ui/kbd";
import useKeyboard from "@/hook/useKeyboard";

// Creating and exporting AddNote Dialog as default
export default function AddNote() {
  // Defining hooks
  const [open, setOpened] = useState<boolean>(false);
  const [notesLocalStorage, setNotes] =
    useLocalStorageState<NotesLocalStorageType>("notes");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  useKeyboard("a", () => !open && setOpened(true), true, [open, setOpened]);

  // Defining variables
  const notes = notesLocalStorage ? [...notesLocalStorage] : [];

  // Defining submit handler
  const submitHandler: SubmitHandler<z.infer<typeof FormSchema>> = async (
    data,
  ) => {
    try {
      const prevIndexOfNote = notes.at(-1)?.id;

      const newNote: note = {
        content: "Hello world",
        createdAt: new Date().toISOString(),
        id: prevIndexOfNote ? prevIndexOfNote + 1 : 1,
        title: data.title,
      };

      const notesToSet = [...notes, newNote];

      await sleep(3000);

      setNotes(notesToSet);
      setOpened(false);
      toast.success("Your note is created and ready to be used.");
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  // Returning JSX
  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!form.formState.isSubmitting) {
          setOpened(open);
        }
      }}
    >
      <DialogTrigger asChild>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={"nolightblur"}
              size={"icon-lg"}
              onClick={() => setOpened(true)}
            >
              <Plus />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            Add new note
            <Kbd className="ml-[1ch]">Ctrl + a</Kbd>
          </TooltipContent>
        </Tooltip>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new note</DialogTitle>
          <DialogDescription>
            Capture ideas, thoughts, or reminders before they fade. Your notes
            stay visible when you need them most.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form action="#" onSubmit={form.handleSubmit(submitHandler)}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Give your note a short title"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="mt-5">
              <DialogClose asChild>
                <Button
                  variant={"ghost"}
                  size="lg"
                  type="button"
                  disabled={form.formState.isSubmitting}
                >
                  Cancle
                </Button>
              </DialogClose>
              <Button
                size="lg"
                type="submit"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <Plus />
                )}
                Add note
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
