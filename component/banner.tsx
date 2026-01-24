// Codes by mahdi tasha
// Importing part
import { cn } from "@/lib/util";
import { BannerProps } from "@/type/component";
import { Clock, List } from "lucide-react";
import moment from "moment";
import ThemeToggler from "./ui/themeToggler";
import ImageFallBack from "./ui/imageFallBack";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

// Creating and exporting Banner component as default
export default function Banner({
  src,
  title,
  className,
  imageClassName,
  onMenuClick,
}: BannerProps) {
  // Returning JSX
  return (
    <header className={cn("h-[200px] relative overflow-hidden", className)}>
      <ImageFallBack
        alt={"Banner"}
        width={1000}
        height={1000}
        className={cn(
          "absolute top-0 left-0 w-full h-full object-cover pointer-events-none select-none",
          imageClassName,
        )}
        src={src}
      />
      <div className="relative max-w-4xl p-4 mx-auto prose dark:prose-invert prose-neutral">
        <div className="flex items-center justify-between gap-4">
          <h1 className="!my-0 text-left block flex-1 truncate">{title}</h1>
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center justify-start h-10 rounded-md px-4 font-light border border-foreground/10 bg-foreground/20 backdrop-blur-2xl ring-2 ring-transparent text-xs text-foreground transition-all duration-500">
              <Clock className="mr-2 size-4" />
              {moment().format("YYYY/MM/DD HH:MM")}
            </div>
            <ThemeToggler variant="blur" />
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant={"blur"} size={"icon-lg"} onClick={onMenuClick}>
                  <List />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Open menu</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </header>
  );
}
