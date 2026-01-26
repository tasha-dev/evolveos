// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import { JournalsContainerProps } from "@/type/component";
import { journal } from "@/type/general";
import { JournalsLocalStorageType } from "@/type/localStorage";
import useLocalStorageState from "use-local-storage-state";
import moment from "moment";
import { Circle } from "lucide-react";
import Link from "next/link";

// Creating and exporting JournalsContainer component as default
export default function JournalsContainer({
  className,
}: JournalsContainerProps) {
  // Defining hooks
  const [journalsLocalStorage] =
    useLocalStorageState<JournalsLocalStorageType>("journals");

  // Defining variables
  const journals: journal[] = journalsLocalStorage
    ? [...journalsLocalStorage]
    : [];

  // Returning JSX
  return (
    <div className={className}>
      {journals.length === 0 ? (
        <h3 className="font-semibold text-center truncate block text-lg">
          There is nothing to show
        </h3>
      ) : (
        <div className="flex flex-col gap-4">
          {journals.map((item, index) => (
            <Link
              href={`/dashboard/journal/${btoa(`${item.id}-${item.title}-${item.createdAt}`)}`}
              className={"flex items-center justify-between gap-4 w-full"}
              key={index}
            >
              <div className="flex items-center justify-between gap-2 flex-1">
                <Circle className="size-4 shrink-0 text-foreground" />
                <span className="font-medium text-foreground truncate block text-left flex-1 text-sm">
                  {item.title}
                </span>
              </div>
              <span className="text-sm text-muted-foreground text-right shrink-0">
                {moment(item.createdAt).format("YYYY MMMM DD | HH:MM")}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
