// Codes by mahdi tasha
// Importing part
import { ProjectCardProps } from "@/type/component";
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
import { Circle, Pen, Trash } from "lucide-react";
import { cn, dateFormat } from "@/lib/util";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

// Creating and exporting ProjectCard component as default
export default function ProjectCard({
  className,
  data: {
    timing: { deadLine, start },
    done,
    title,
    content,
    id,
    createdAt,
  },
}: ProjectCardProps) {
  // Returning JSX
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <Link
          href={`/dashboard/projects/${id}-${title}-${createdAt}`}
          className={className}
        >
          <Card>
            <CardHeader className="flex items-center justify-between gap-4">
              <div className="flex-1 overflow-hidden">
                <CardTitle className="truncate mb-2">{title}</CardTitle>
                <CardDescription className="truncate">
                  {`${moment(start).format(dateFormat)} - ${moment(deadLine).format(dateFormat)}`}
                </CardDescription>
              </div>
              <Tooltip>
                <TooltipTrigger className="shrink-0">
                  <Circle
                    className={cn(
                      "size-5 text-current",
                      done && "fill-current",
                    )}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  {done
                    ? "The project is done"
                    : !done
                      ? moment(deadLine).isBefore(moment())
                        ? "The project failed"
                        : "The project is underdeveloped"
                      : false}
                </TooltipContent>
              </Tooltip>
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
        <ContextMenuItem>
          <Pen />
          Edit
        </ContextMenuItem>
        <ContextMenuItem variant="destructive">
          <Trash />
          Delete Item
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
