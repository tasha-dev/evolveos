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
  DialogTrigger,
} from "@/component/ui/dialog";
import { useState } from "react";
import { AddTaskFormSchema as FormSchema } from "@/lib/formSchema";
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
import { toast } from "sonner";
import { EditTasksDialogProps } from "@/type/component";
import useDb from "use-db";
import { TasksIndexedDBType } from "@/type/indexedDb";

// Creating and exporting EditTasks Dialog as default
export default function EditTask({
  data: { id, title },
}: EditTasksDialogProps) {
  // Defining hooks
  const [open, setOpened] = useState<boolean>(false);
  const [tasksLocalStorage, setTasks] = useDb<TasksIndexedDBType>("tasks");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title,
    },
  });

  // Defining variables
  const tasks = tasksLocalStorage ? [...tasksLocalStorage] : [];

  // Defining submit handler
  const submitHandler: SubmitHandler<z.infer<typeof FormSchema>> = async (
    data,
  ) => {
    try {
      const tasksToSet = tasks.map((item) =>
        item.id === id
          ? {
              ...item,
              title: data.title,
            }
          : item,
      );

      await sleep(3000);

      setTasks(tasksToSet);
      setOpened(false);
      toast.success("Your changes are saved.");
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
        <Button
          variant={"secondary"}
          size={"icon-sm"}
          className="shrink-0"
          onClick={() => setOpened(true)}
        >
          <Pen />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit task</DialogTitle>
          <DialogDescription>
            Refine your task to stay aligned with your goals. Small adjustments
            can make a big difference.
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
                      placeholder="What do you want to do?"
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
                  <Pen />
                )}
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
