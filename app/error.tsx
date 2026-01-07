// Codes by mahdi tasha
// Forcing next.js to render this page as client side
"use client";

// Importing part
import Footer from "@/component/footer";
import Header from "@/component/header";
import { Button } from "@/component/ui/button";
import { Home, RefreshCcw } from "lucide-react";
import Link from "next/link";

// Creating and exporting 404 page as default
export default function NotFoundPage() {
  // Returning JSX
  return (
    <>
      <Header />
      <section className="max-w-4xl border-x border-foreground/10 mx-auto">
        <main className="prose dark:prose-invert prose-neutral min-h-[calc(100dvh-65px)] p-4 max-w-full">
          <h1 className="mt-0">
            Something Went Wrong <kbd>500</kbd>
          </h1>
          <h2 className="mt-0">
            An unexpected error occurred while loading this page.
          </h2>
          <p>
            Don’t worry — your data is safe. <br />
            Try refreshing the page or return to a stable area.
          </p>
          <div className="flex items-center justify-start gap-3 flex-wrap">
            <Button size="lg" onClick={() => window.location.reload()}>
              <RefreshCcw />
              Try Again
            </Button>
            <Button asChild size="lg" variant={"outline"}>
              <Link href="/" className="no-underline">
                <Home />
                Back to Home
              </Link>
            </Button>
          </div>
        </main>
      </section>
      <Footer />
    </>
  );
}
