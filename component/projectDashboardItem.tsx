// Codes by mahdi tasha
// Importing part
import { cn } from "@/lib/util";
import { ProjectDashboardItemProps } from "@/type/component";
import { Square, SquareCheck } from "lucide-react";
import moment from "moment";

// Creating and exportign ProjectDashboardItem component as default
export default function ProjectDashboardItem({
  data,
  className,
}: ProjectDashboardItemProps) {
  // Returning JSX
  return (
    <div className={cn("flex items-center justify-between gap-4", className)}>
      <div className="flex items-center justify-between gap-2 flex-1">
        {data.done ? (
          <SquareCheck className="size-4 shrink-0 text-foreground" />
        ) : (
          <Square className="size-4 shrink-0 text-foreground" />
        )}
        <span className="font-medium text-foreground truncate block text-left flex-1 text-sm">
          {data.title}
        </span>
      </div>
      <span className="text-sm text-muted-foreground text-right shrink-0">
        {moment(data.createdAt).format("YYYY/MM/DD HH:MM")}
      </span>
    </div>
  );
}
