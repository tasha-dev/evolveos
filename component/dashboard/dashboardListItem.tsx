// Codes by mahdi tasha
// Importing part
import { cn } from "@/lib/util";
import { DashboardListItemProps } from "@/type/component";
import { Circle, Square, SquareCheck } from "lucide-react";

// Creating and exporting DashboardListItem component as default
export default function DashboardListItem({
  date,
  icon,
  title,
  className,
}: DashboardListItemProps) {
  // Returning JSX
  return (
    <div className={cn("flex items-center justify-between gap-4", className)}>
      <div className="flex items-center justify-between gap-2 flex-1 overflow-hidden">
        {icon === "square" ? (
          <Square className="size-4 shrink-0 text-foreground" />
        ) : icon === "square-check" ? (
          <SquareCheck className="size-4 shrink-0 text-foreground" />
        ) : icon === "circle" ? (
          <Circle className="size-4 shrink-0 text-foreground" />
        ) : icon === "circle-fill" ? (
          <Circle className="size-4 shrink-0 text-foreground fill-foreground" />
        ) : (
          false
        )}
        <span className="font-medium text-foreground truncate block text-left flex-1 text-sm">
          {title}
        </span>
      </div>
      {date && (
        <span className="text-sm text-muted-foreground text-right shrink-0">
          {date}
        </span>
      )}
    </div>
  );
}
