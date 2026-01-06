// Codes by mahdi tasha
// Importing part
import { cn } from "@/lib/util";
import Link from "next/link";
import { FooterProps } from "@/type/component";
import { Code, Github } from "lucide-react";
import { Button } from "./ui/button";

// Creating and exporting Footer component as default
export default function Footer({ className }: FooterProps) {
  // Returning JSX
  return (
    <footer className={cn("border-t border-t-foreground/10", className)}>
      <div className="py-3 px-4 max-w-4xl mx-auto border-x border-x-foreground/10 flex items-center justify-between gap-4">
        <p className="!my-0 truncate">Copyright: © 2026 Mahdi Tasha</p>
        <div className="flex items-center justify-between gap-3">
          <Button variant={"ghost"} size="icon-lg" asChild>
            <Link href="https://tasha.vercel.app/">
              <Code className="size-4 text-foreground" />
            </Link>
          </Button>
          <Button variant={"ghost"} size="icon-lg" asChild>
            <Link href="https://github.com/tasha-dev/evolveos">
              <Github className="size-4 text-foreground" />
            </Link>
          </Button>
        </div>
      </div>
    </footer>
  );
}
