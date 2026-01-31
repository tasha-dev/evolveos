// Codes by mahdi tasha
// Forcing next.js to render this component as client side
"use client";

// Imporintg part
import { useState } from "react";
import { Button } from "@/component/ui/button";
import { Calendar } from "@/component/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/component/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import { DatePickerProps } from "@/type/component";
import { cn, dateFormat } from "@/lib/util";
import moment from "moment";

// Creating and exporting DatePicker component as default
export default function DatePicker({
  onValueChange,
  value = moment().format(dateFormat),
  className,
  invalid,
}: DatePickerProps) {
  // Defining hooks
  const [date, setDate] = useState<string | undefined>(value);

  // Returning JSX
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!date}
          aria-invalid={invalid}
          className={cn(
            "data-[empty=true]:text-muted-foreground w-full justify-between text-left font-normal",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            className,
          )}
        >
          {date ? date : "Pick a date"}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date ? new Date(date) : undefined}
          onSelect={(value) => {
            const formatedValue = moment(value).format(dateFormat);

            onValueChange?.(formatedValue);
            setDate(formatedValue);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
