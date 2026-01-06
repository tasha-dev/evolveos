// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/component/ui/tooltip";
import { Button } from "@/component/ui/button";
import { SunMoon } from "lucide-react";
import { ThemeTogglerProps } from "@/type/component";
import { useTheme } from "next-themes";

// Creating and exporting ThemeToggler component as default
export default function ThemeToggler({
  className,
  size = "icon-lg",
  variant = "default",
}: ThemeTogglerProps) {
  // Defining hooks
  const { setTheme } = useTheme();

  // Returning JSX
  return (
    <Tooltip>
      <TooltipTrigger asChild className={className}>
        <Button
          size={size}
          variant={variant}
          onClick={() => {
            setTheme((theme) => (theme === "dark" ? "light" : "dark"));
          }}
        >
          <SunMoon />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Toggle theme</TooltipContent>
    </Tooltip>
  );
}
