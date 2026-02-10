// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import { Loader2, Pen } from "lucide-react";
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
import { AddJournalFormSchema as FormSchema } from "@/lib/formSchema";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/component/ui/form";
import { Input } from "@/component/ui/input";
import { sleep } from "@/lib/util";
import { toast } from "sonner";
import { EditJouranlDialogProps } from "@/type/component";
import useDb from "use-db";
import { JournalsIndexedDBType } from "@/type/indexedDb";

// Creating and exporting EditJournal Dialog as default
export default function EditJournal({
  data: { id, title },
  onOpenChange,
  open,
}: EditJouranlDialogProps) {
  // Defining hooks
  const [journalsLocalStorage, setJournals] =
    useDb<JournalsIndexedDBType>("journals");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title,
    },
  });

  // Defining variables
  const journals = journalsLocalStorage ? [...journalsLocalStorage] : [];

  // Defining submit handler
  const submitHandler: SubmitHandler<z.infer<typeof FormSchema>> = async (
    data,
  ) => {
    try {
      const journalsToSet = journals.map((item) =>
        item.id === id
          ? {
              ...item,
              title: data.title,
            }
          : item,
      );

      await sleep(3000);

      setJournals(journalsToSet);
      onOpenChange?.(false);
      toast.success("Your entry was edited successfully.");
    } catch {
      toast.error(
        "There was an error while trying to edit yourentry. Please try again.",
      );
    }
  };

  // Returning JSX
  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!form.formState.isSubmitting) {
          onOpenChange?.(open);
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Journal</DialogTitle>
          <DialogDescription>
            Refine your thoughts, revisit reflections, or polish moments —
            making them truly yours.
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
                      placeholder="The great war (me vs me)"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>What’s this entry about?</FormDescription>
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
                  <Pen />
                )}
                Save Entry
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
