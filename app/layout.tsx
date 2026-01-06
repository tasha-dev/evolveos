// Codes by mahdi tasha
// Importing part
import "@/app/globals.css";
import type { Metadata } from "next";
import { RootLayoutProps } from "@/type/component";
import { Inter } from "next/font/google";

// Defining metadata
export const metadata: Metadata = {
  title: {
    template: "%s | EvolveOS",
    default: "EvolveOS – Your Personal Growth Operating System",
  },
  description:
    "EvolveOS is a markdown-first, offline-friendly personal growth OS for journaling, habits, tasks, and focused daily planning.",
  keywords: [
    "EvolveOS",
    "Personal Growth",
    "Productivity",
    "Markdown",
    "Daily Planner",
    "Habits",
    "Journal",
    "Tasks",
    "Next.js",
    "React",
  ],
  authors: [{ name: "Mahdi Tasha", url: "https://github.com/tasha-dev/" }],
  creator: "Mahdi Tasha",
  publisher: "Mahdi Tasha",
  metadataBase: new URL("https://evolveos.vercel.app/"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "EvolveOS – Personal Growth OS",
    description:
      "Build systems, track habits, journal daily, and manage tasks with EvolveOS — a markdown-first growth dashboard.",
    url: "https://evolveos.vercel.app/",
    siteName: "EvolveOS",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "EvolveOS",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EvolveOS – Personal Growth OS",
    description:
      "Markdown-first, offline-friendly dashboard for journaling, habits, tasks, and personal growth.",
    images: ["/og-image.png"],
  },
  manifest: "/manifest.json",
};

// Defining fonts
const interFont = Inter({
  display: "block",
  style: "normal",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

// Creating and exporting RootLayout component as default
export default function RootLayout({ children }: RootLayoutProps) {
  // Returning JSX
  return (
    <html suppressHydrationWarning lang="en">
      <body>{children}</body>
    </html>
  );
}
