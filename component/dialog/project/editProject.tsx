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
} from "@/component/ui/dialog";
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
import { toast } from "sonner";
import DatePicker from "@/component/ui/datePicker";
import { EditProjectProps } from "@/type/component";

// Creating and exporting EditProject Dialog as default
export default function EditProject({
  data: { deadLine, start, title, id },
  onOpenChange,
  open,
}: EditProjectProps) {
  // Defining hooks
  const [projectsLocalStorage, setProjects] =
    useLocalStorageState<ProjectsLocalStorageType>("projects");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      deadline: deadLine,
      startDate: start,
      title,
    },
  });

  // Defining variables
  const projects = projectsLocalStorage ? [...projectsLocalStorage] : [];

  // Defining submit handler
  const submitHandler: SubmitHandler<z.infer<typeof FormSchema>> = async (
    data,
  ) => {
    try {
      const projectsToSet = projects.map((item) =>
        item.id === id
          ? {
              ...item,
              timing: {
                deadLine: data.deadline,
                start: data.startDate,
              },
              title: data.title,
            }
          : item,
      );

      await sleep(3000);

      setProjects(projectsToSet);
      onOpenChange?.(false);
      toast.success("Project updated. Your changes are saved.");
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
          onOpenChange?.(open);
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit project</DialogTitle>
          <DialogDescription>
            Adjust your project to reflect where you are now. Clarity keeps
            progress moving.
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
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
