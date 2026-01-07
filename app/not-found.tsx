// Codes by mahdi tasha
// Importing part
import Footer from "@/component/footer";
import Header from "@/component/header";
import { Button } from "@/component/ui/button";
import { Home, LayoutDashboard } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

// Defining metadata
export const metadata: Metadata = {
  title: "Page Not Found",
};

// Creating and exporting 404 page as default
export default function NotFoundPage() {
  // Returning JSX
  return (
    <>
      <Header />
      <section className="max-w-4xl border-x border-foreground/10 mx-auto">
        <main className="prose dark:prose-invert prose-neutral min-h-[calc(100dvh-65px)] p-4 max-w-full">
          <h1 className="mt-0">
            Page Not Found <kbd>404</kbd>
          </h1>
          <h2 className="mt-0">
            The page you’re looking for doesn’t exist or has been moved.
          </h2>
          <p>
            Even the best systems lose their path sometimes. <br />
            Let’s get you back on track.
          </p>
          <div className="flex items-center justify-start gap-3 flex-wrap">
            <Button asChild size="lg">
              <Link href="/dashboard" className="no-underline">
                <LayoutDashboard />
                Go to Dashboard
              </Link>
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
