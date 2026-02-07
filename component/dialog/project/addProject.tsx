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
import { AddProjectFormSchema as FormSchema } from "@/lib/formSchema";
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
import { ProjectsLocalStorageType } from "@/type/localStorage";
import { project } from "@/type/general";
import { toast } from "sonner";
import { Kbd } from "@/component/ui/kbd";
import useKeyboard from "@/hook/useKeyboard";
import DatePicker from "@/component/ui/datePicker";

// Creating and exporting AddProject Dialog as default
export default function AddProject() {
  // Defining hooks
  const [open, setOpened] = useState<boolean>(false);
  const [projectsLocalStorage, setProjects] =
    useLocalStorageState<ProjectsLocalStorageType>("projects");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  useKeyboard("a", () => !open && setOpened(true), true, [open, setOpened]);

  // Defining variables
  const projects = projectsLocalStorage ? [...projectsLocalStorage] : [];

  // Defining submit handler
  const submitHandler: SubmitHandler<z.infer<typeof FormSchema>> = async (
    data,
  ) => {
    try {
      const prevIndexOfProject = projects.at(-1)?.id;

      const newProject: project = {
        done: false,
        content: "Hello world",
        createdAt: new Date().toISOString(),
        id: prevIndexOfProject ? prevIndexOfProject + 1 : 1,
        timing: {
          deadLine: data.deadline,
          start: data.startDate,
        },
        title: data.title,
      };

      const projectsToSet = [...projects, newProject];

      await sleep(3000);

      setProjects(projectsToSet);
      setOpened(false);
      toast.success("Project created. You’re ready to move forward.");
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
            Create a new project
            <Kbd className="ml-[1ch]">Ctrl + a</Kbd>
          </TooltipContent>
        </Tooltip>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new project</DialogTitle>
          <DialogDescription>
            Projects turn ideas into outcomes.
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
                      placeholder="New project v2.0.0"
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
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start date</FormLabel>
                  <FormControl>
                    <DatePicker
                      onValueChange={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="deadline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deadline</FormLabel>
                  <FormControl>
                    <DatePicker
                      onValueChange={field.onChange}
                      value={field.value}
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
                Create project
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
