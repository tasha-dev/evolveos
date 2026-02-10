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
import { task } from "@/type/general";
import { toast } from "sonner";
import { Kbd } from "@/component/ui/kbd";
import useKeyboard from "@/hook/useKeyboard";
import useDb from "use-db";
import { TasksIndexedDBType } from "@/type/indexedDb";

// Creating and exporting AddTasks Dialog as default
export default function AddTasks() {
  // Defining hooks
  const [open, setOpened] = useState<boolean>(false);
  const [tasksLocalStorage, setTasks] = useDb<TasksIndexedDBType>("tasks");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  useKeyboard("a", () => !open && setOpened(true), true, [open, setOpened]);

  // Defining variables
  const tasks = tasksLocalStorage ? [...tasksLocalStorage] : [];

  // Defining submit handler
  const submitHandler: SubmitHandler<z.infer<typeof FormSchema>> = async (
    data,
  ) => {
    try {
      const prevIndexOfTasks = tasks.at(-1)?.id;

      const newTask: task = {
        createdAt: new Date().toISOString(),
        done: false,
        id: prevIndexOfTasks ? prevIndexOfTasks + 1 : 1,
        title: data.title,
      };

      const tasksToSet = [...tasks, newTask];
      await sleep(3000);

      setTasks(tasksToSet);
      setOpened(false);
      toast.success("Your task is added successfully.");
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
            Add a New Task <Kbd className="ml-[1ch]">Ctrl + a</Kbd>
          </TooltipContent>
        </Tooltip>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a New Task</DialogTitle>
          <DialogDescription>
            Add a task to keep your day moving forward.
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
                  <Plus />
                )}
                Add Task
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
