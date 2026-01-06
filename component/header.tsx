// Codes by mahdi tasha
// Importing part
import { cn } from "@/lib/util";
import { HeaderProps } from "@/type/component";
import Image from "next/image";
import Link from "next/link";
import LogoImage from "@/image/logo.png";
import ThemeToggler from "./ui/themeToggler";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/component/ui/tooltip";
import { Button } from "@/component/ui/button";
import { Code, LayoutDashboard } from "lucide-react";

// Creating and exporting Header component as default
export default function Header({ className }: HeaderProps) {
  // Returning JSX
  return (
    <header className={cn("border-b border-b-foreground/10", className)}>
      <div className="py-3 px-4 max-w-4xl flex items-center justify-between gap-4 mx-auto border-x border-x-foreground/10">
        <Link href="/" className="block">
          <Image
            width={100}
            height={100}
            alt="Evolve OS - logo"
            className="size-10"
            src={LogoImage.src}
          />
        </Link>
        <div className="flex items-center justify-center gap-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button asChild variant={"outline"} size="icon-lg">
                <Link href="/dashboard">
                  <LayoutDashboard />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Start using the app</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button asChild variant={"outline"} size="icon-lg">
                <Link href="https://tasha.vercel.app/">
                  <Code />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Codes by mahdi tasha</TooltipContent>
          </Tooltip>
          <ThemeToggler variant="outline" />
        </div>
      </div>
    </header>
  );
}
