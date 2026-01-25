// Codes by mahdi tasha
// Importing part
import { z } from "zod";

// Creating and exporting form schemas of the the whole app
export const AddJournalFormSchema = z.object({
  title: z
    .string({
      message: "Please fill this input",
    })
    .min(2)
    .max(20),
});
