// Codes by mahdi tasha
// Importing part
import { JournalCardProps } from "@/type/component";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import moment from "moment";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../ui/context-menu";
import MarkdownEditor from "../markdownEditor";
import { Pen, Trash } from "lucide-react";
import { useState } from "react";
import DeleteJournal from "../dialog/journal/deleteJournal";

// Creating and exporting JournalCard component as default
export default function JournalCard({
  className,
  data: { content, createdAt, id, title },
}: JournalCardProps) {
  // Defining hooks
  const [deleteOpened, setDeleteOpened] = useState<boolean>(false);
  const [editOpened, setEditOpened] = useState<boolean>(false);

  // Returning JSX
  return (
    <>
      <DeleteJournal
        open={deleteOpened}
        onOpenChange={setDeleteOpened}
        data={{
          id,
          title,
        }}
      />
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <Link
            href={`/dashboard/journal/${id}-${title}-${createdAt}`}
            className={className}
          >
            <Card>
              <CardHeader>
                <CardTitle className="truncate">{title}</CardTitle>
                <CardDescription className="truncate">
                  {moment(createdAt).format("YYYY MMMM DD | HH:MM")}
                </CardDescription>
              </CardHeader>
              <CardContent className="prose prose-neutral dark:prose-invert h-[100px] overflow-hidden relative pb-0">
                <div className="bottom-0 left-0 w-full h-[20px] bg-linear-to-t from-card to-transparent absolute" />
                <MarkdownEditor
                  className="h-[100px]"
                  readonly
                  defaultValue={content}
                />
              </CardContent>
            </Card>
          </Link>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onClick={() => setEditOpened(true)}>
            <Pen />
            Edit
          </ContextMenuItem>
          <ContextMenuItem
            variant="destructive"
            onClick={() => setDeleteOpened(true)}
          >
            <Trash />
            Delete Item
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </>
  );
}
