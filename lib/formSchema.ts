// Codes by mahdi tasha
// Importing part
import moment from "moment";
import { z } from "zod";
import { dateFormat } from "./util";

// Creating and exporting form schemas of the the whole app
export const AddJournalFormSchema = z.object({
  title: z
    .string({
      message: "Please fill this input",
    })
    .min(2)
    .max(20),
});

export const AddTaskFormSchema = z.object({
  title: z
    .string({
      message: "Please fill this input",
    })
    .min(2)
    .max(20),
});

export const AddHabitFormSchema = z.object({
  title: z
    .string({
      message: "Please fill this input",
    })
    .min(2)
    .max(20),
  onDaysIndex: z.union(
    [
      z.literal("0"),
      z.literal("1"),
      z.literal("2"),
      z.literal("3"),
      z.literal("4"),
      z.literal("5"),
      z.literal("6"),
      z.literal("everyday"),
    ],
    {
      message: "Please fill this input",
    },
  ),
  onTime: z
    .string({
      message: "Please fill this input",
    })
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
      message: "Time must be in HH:MM format (00:00 - 23:59)",
    }),
});

export const AddProjectFormSchema = z
  .object({
    title: z.string({ message: "Please fill this input" }).min(2).max(20),

    startDate: z
      .string()
      .refine((date) => moment(date, dateFormat, true).isValid(), {
        message: "Start date is invalid",
      }),

    deadline: z
      .string()
      .refine((date) => moment(date, dateFormat, true).isValid(), {
        message: "Deadline is invalid",
      }),
  })
  .refine(
    (data) =>
      moment(data.deadline, dateFormat, true).isAfter(
        moment(data.startDate, dateFormat, true),
      ),
    {
      message: "Deadline must be after start date",
      path: ["deadline"],
    },
  );
