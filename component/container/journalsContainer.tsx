// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import { JournalsContainerProps } from "@/type/component";
import { journal } from "@/type/general";
import { JournalsLocalStorageType } from "@/type/localStorage";
import useLocalStorageState from "use-local-storage-state";
import moment from "moment";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/component/ui/card";

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
        <div className="grid lg:grid-cols-2 gap-4">
          {journals.map((item, index) => (
            <Card key={index}>
              <Link
                href={`/dashboard/journal/${item.id}-${item.title}-${item.createdAt}`}
              >
                <CardHeader className="mb-5">
                  <CardTitle className="truncate">{item.title}</CardTitle>
                  <CardDescription className="truncate">
                    {moment(item.createdAt).format("YYYY MMMM DD | HH:MM")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="prose prose-neutral dark:prose-invert h-[100px] overflow-hidden relative pb-0">
                  <div className="bottom-0 left-0 w-full h-[20px] bg-linear-to-t from-card to-transparent absolute" />
                  <h1>HIHIH</h1>
                  <p>HIHIHIHIHIHIHIH</p>
                  <p>HIHIHIHIHIHIHIH</p>
                  <p>HIHIHIHIHIHIHIH</p>
                  <p>HIHIHIHIHIHIHIH</p>
                  <p>HIHIHIHIHIHIHIH</p>
                  <p>HIHIHIHIHIHIHIH</p>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
