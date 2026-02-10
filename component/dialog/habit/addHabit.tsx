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
import { AddHabitFormSchema as FormSchema } from "@/lib/formSchema";
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
import { habit } from "@/type/general";
import { toast } from "sonner";
import { Kbd } from "@/component/ui/kbd";
import useKeyboard from "@/hook/useKeyboard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/component/ui/select";
import useDb from "use-db";
import { HabitsIndexedDBType } from "@/type/indexedDb";

// Creating and exporting AddHabit Dialog as default
export default function AddHabit() {
  // Defining hooks
  const [open, setOpened] = useState<boolean>(false);
  const [habitsLocalStorage, setHabits] = useDb<HabitsIndexedDBType>("habits");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  useKeyboard("a", () => !open && setOpened(true), true, [open, setOpened]);

  // Defining variables
  const habits = habitsLocalStorage ? [...habitsLocalStorage] : [];

  // Defining submit handler
  const submitHandler: SubmitHandler<z.infer<typeof FormSchema>> = async (
    data,
  ) => {
    try {
      const prevIndexOfHabits = habits.at(-1)?.id;

      const newHabit: habit = {
        on: {
          days: data.onDaysIndex,
          time: data.onTime,
        },
        doneAt: [],
        createdAt: new Date().toISOString(),
        id: prevIndexOfHabits ? prevIndexOfHabits + 1 : 1,
        title: data.title,
      };

      const habitsToSet = [...habits, newHabit];

      await sleep(3000);

      setHabits(habitsToSet);
      setOpened(false);
      toast.success("Habit added. Your habit is ready to track.");
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
            Add a new habit
            <Kbd className="ml-[1ch]">Ctrl + a</Kbd>
          </TooltipContent>
        </Tooltip>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new habit</DialogTitle>
          <DialogDescription>
            Habits shape your days — and your days shape your life. Start with
            one small, repeatable action.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            action="#"
            onSubmit={form.handleSubmit(submitHandler)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="What habit do you want to build?"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="onDaysIndex"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Frequency</FormLabel>
                  <FormControl>
                    <Select
                      value={
                        field.value === "everyday"
                          ? "everyday"
                          : field.value
                            ? field.value.toString()
                            : undefined
                      }
                      onValueChange={(value) =>
                        field.onChange(
                          value === "everyday" ? "everyday" : Number(value),
                        )
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Sunday to saturday or everyday" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={"0"}>Sunday</SelectItem>
                        <SelectItem value={"1"}>Monday</SelectItem>
                        <SelectItem value={"2"}>Tuesday</SelectItem>
                        <SelectItem value={"3"}>Wendesday</SelectItem>
                        <SelectItem value={"4"}>Thursday</SelectItem>
                        <SelectItem value={"5"}>Friday</SelectItem>
                        <SelectItem value={"6"}>Saturday</SelectItem>
                        <SelectItem value={"everyday"}>Everyday</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="onTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      placeholder="Select time"
                      type="time"
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
                Add Habit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
