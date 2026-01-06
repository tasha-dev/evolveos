// Codes by mahdi tasha
// Importing part
import { Button } from "@/component/ui/button";
import { ChartColumnIncreasing, LayoutDashboard } from "lucide-react";
import Link from "next/link";

// Creating and exporting Hero section of home page as default
export default function Hero() {
  // Returning JSX
  return (
    <section className="max-w-4xl border-x border-foreground/10 mx-auto border-b">
      <main className="prose dark:prose-invert prose-neutral min-h-[calc(100dvh-65px)] p-4 max-w-full">
        <h1 className="mt-0">Build Systems. Grow Daily.</h1>
        <p>
          EvolveOS is a markdown-first, offline-friendly personal growth OS that
          helps you track habits, journal daily, plan tasks, and manage your
          life — without the complexity of Notion.
        </p>
        <div className="flex items-center justify-start gap-3 flex-wrap">
          <Button asChild size="lg">
            <Link href="/dashboard" className="no-underline">
              <LayoutDashboard />
              Get Started
            </Link>
          </Button>
          <Button asChild size="lg" variant={"outline"}>
            <Link href="/#learn" className="no-underline">
              <ChartColumnIncreasing />
              Learn More
            </Link>
          </Button>
        </div>
      </main>
    </section>
  );
}
