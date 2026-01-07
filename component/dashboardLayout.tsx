// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import Banner from "@/component/banner";
import SilkImage from "@/image/silk.png";
import { cn } from "@/lib/util";
import { DashboardLayoutProps } from "@/type/component";
import { useState } from "react";
import NavBar from "./navBar";

// Creating and exporting DashboardLayout component as default
export default function DashboardLayout({
  children,
  className,
}: DashboardLayoutProps) {
  // Defining hooks
  const [navbarOpen, setNavBarOpen] = useState<boolean>(false);

  // Returning JSX
  return (
    <div className="flex items-stretch justify-center overflow-hidden lg:h-dvh">
      <NavBar open={navbarOpen} onOpenChange={setNavBarOpen} />
      <div className="flex-1 h-full">
        <Banner
          src={SilkImage.src}
          title="Dashboard"
          onMenuClick={() => setNavBarOpen((prev) => !prev)}
        />
        <section>
          <main className={cn("max-w-4xl p-4 mx-auto", className)}>
            {children}
          </main>
        </section>
      </div>
    </div>
  );
}
