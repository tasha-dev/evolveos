// Codes by mahdi tasha
// Importing part
import { cn } from "@/lib/util";
import { ProjectDashboardItemProps } from "@/type/component";
import { Circle } from "lucide-react";
import moment from "moment";

// Creating and exportign ProjectDashboardItem component as default
export default function ProjectDashboardItem({
  data,
  className,
}: ProjectDashboardItemProps) {
  // Returning JSX
  return (
    <div className={cn("flex items-center justify-between gap-4", className)}>
      <div className="flex items-center justify-between gap-4 flex-1">
        <Circle
          className={cn(
            "size-4 shrink-0 text-foreground ",
            data.done && "fill-current stroke-current",
          )}
        />
        <span className="font-medium text-white truncate block text-left flex-1">
          {data.title}
        </span>
      </div>
      <span className="text-sm text-muted-foreground texxt-right shrink-0">
        {moment(data.createdAt).format("YYYY/MM/DD HH:MM")}
      </span>
    </div>
  );
}
