// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import { Loader2, Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useState } from "react";
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
} from "../ui/form";
import { Input } from "../ui/input";
import { sleep } from "@/lib/util";
import useLocalStorageState from "use-local-storage-state";
import { JournalsLocalStorageType } from "@/type/localStorage";
import { journal } from "@/type/general";
import { toast } from "sonner";

// Creating and exporting AddJournal Dialog as default
export default function AddJournal() {
  // Defining hooks
  const [open, setOpened] = useState<boolean>(false);
  const [journalsLocalStorage, setJournals] =
    useLocalStorageState<JournalsLocalStorageType>("journals");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  // Defining variables
  const journals = journalsLocalStorage ? [...journalsLocalStorage] : [];

  // Defining submit handler
  const submitHandler: SubmitHandler<z.infer<typeof FormSchema>> = async (
    data,
  ) => {
    const prevIndexOfJournal = journals.at(-1)?.id;

    const newJournal: journal = {
      content: "Hello world",
      createdAt: new Date().toISOString(),
      id: prevIndexOfJournal ? prevIndexOfJournal + 1 : 1,
      title: data.title,
    };

    const journalsToSet = [...journals, newJournal];

    await sleep(3000);

    setJournals(journalsToSet);
    toast.success("Your entry was added successfully.");
    // toast.error("Something went wrong. Please try again.")
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
          <TooltipContent>Add new journal</TooltipContent>
        </Tooltip>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Journal Entry</DialogTitle>
          <DialogDescription>
            Capture thoughts, reflections, or moments — just for you.
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
                  variant={"secondary"}
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
                Save Entry
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
