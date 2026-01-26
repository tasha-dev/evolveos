// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import { NavBarProps } from "@/type/component";
import {
  Book,
  CheckSquare,
  FileText,
  Home,
  Layers,
  LayoutDashboard,
  Repeat,
  X,
} from "lucide-react";
import { ReactNode } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/util";
import Link from "next/link";
import useKeyboard from "@/hook/useKeyboard";

// Defining data of nav bar to render
const data: {
  title: string;
  items: {
    icon: ReactNode;
    title: string;
    href: string;
  }[];
}[] = [
  {
    title: "Core",
    items: [
      {
        icon: <LayoutDashboard />,
        title: "Dashboard",
        href: "/dashboard",
      },
      {
        icon: <Book />,
        title: "Journal",
        href: "/dashboard/journal",
      },
    ],
  },
  {
    title: "Manage",
    items: [
      {
        icon: <CheckSquare />,
        title: "Tasks",
        href: "/dashboard/tasks",
      },
      {
        icon: <Layers />,
        title: "Projects",
        href: "/dashboard/projects",
      },
      {
        icon: <Repeat />,
        title: "Habits",
        href: "/dashboard/habits",
      },
    ],
  },
  {
    title: "Write",
    items: [
      {
        title: "Notes",
        icon: <FileText />,
        href: "/dashboard/notes",
      },
    ],
  },
];

// Creating and exporting NavBar component as default
export default function NavBar({ open, onOpenChange }: NavBarProps) {
  // Defining hooks
  useKeyboard(
    "escape",
    () => {
      if (open && onOpenChange) {
        onOpenChange?.(false);
      }
    },
    false,
    [open, onOpenChange],
  );

  // Returning JSX
  return (
    <>
      <div
        data-open={open}
        onClick={() => onOpenChange?.(false)}
        className="h-dvh w-dvw fixed top-0 left-0 z-40 transition-all duration-1000 delay-200 lg:hidden data-[open=true]:backdrop-blur-2xl data-[open=false]:backdrop-blur-none data-[open=false]:invisible data-[open=true]:visible data-[open=false]:bg-background/0 data-[open=true]:bg-background/30"
      />
      <aside
        data-open={open}
        className="h-dvh dark:bg-neutral-900 bg-neutral-200 border-r border-r-foreground/10 shrink-0 transition-all duration-500 data-[open=false]:w-0 lg:data-[open=true]:w-1/5 data-[open=true]:w-3/4 overflow-hidden flex items-center flex-col justify-between lg:static fixed left-0 top-0 z-50 data-[open=false]:invisible data-[open=true]:visible"
      >
        <div className="h-full overflow-y-auto overflow-x-hidden w-full">
          {data.map((groupItem, groupIndex) => (
            <div
              key={groupIndex}
              className={cn(
                "p-4",
                groupIndex + 1 !== data.length &&
                  "border-b border-b-foreground/10 p-4",
              )}
            >
              <span className="font-medium mb-3 block truncate text-foreground text-sm">
                {groupItem.title}
              </span>
              <div className="flex flex-col gap-3">
                {groupItem.items.map((item, index) => (
                  <Button
                    key={index}
                    size="lg"
                    className="w-full justify-start overflow-hidden"
                    asChild
                    variant={"secondary"}
                  >
                    <Link href={item.href}>
                      {item.icon}
                      <span className="block text-left truncate">
                        {item.title}
                      </span>
                    </Link>
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-t-foreground/10 w-full shrink-0">
          {onOpenChange && (
            <Button
              size="lg"
              variant={"secondary"}
              className="w-full justify-start overflow-hidden mb-3"
              onClick={() => onOpenChange(false)}
            >
              <X />
              <span className="block text-left truncate">
                Close the nav bar
              </span>
            </Button>
          )}
          <Button
            size="lg"
            variant={"destructive"}
            className="w-full justify-start overflow-hidden"
            asChild
          >
            <Link href="/">
              <Home />
              <span className="block text-left truncate">Back to Home</span>
            </Link>
          </Button>
        </div>
      </aside>
    </>
  );
}
