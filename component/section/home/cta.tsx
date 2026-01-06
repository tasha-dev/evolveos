// Codes by mahdi tasha
// Importing part
import { Button } from "@/component/ui/button";
import { ChartColumnIncreasing, LayoutDashboard } from "lucide-react";
import Link from "next/link";

// Creating and exporting Call to action section of home page as default
export default function CTA() {
  // Returning JSX
  return (
    <section className="max-w-4xl border-x border-foreground/10 mx-auto h-dvh flex items-center justify-center">
      <main className="prose dark:prose-invert prose-neutral p-4 max-w-full ">
        <h2 className="mt-0 text-center">
          Start Taking Control of Your Life Today
        </h2>
        <div className="flex items-center justify-center flex-wrap gap-4">
          <Button asChild size="lg">
            <Link href="/dashboard" className="no-underline">
              <LayoutDashboard />
              Get Started
            </Link>
          </Button>
          <Button asChild size="lg" variant={"outline"}>
            <Link href="/#feature" className="no-underline">
              <ChartColumnIncreasing />
              Explore Features
            </Link>
          </Button>
        </div>
      </main>
    </section>
  );
}
