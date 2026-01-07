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
import useLocalStorageState from "use-local-storage-state";
import { habit, journal, note, project, task } from "@/type/general";
import Greeting from "./dialog/greeting";

// Creating and exporting DashboardLayout component as default
export default function DashboardLayout({
  children,
  className,
}: DashboardLayoutProps) {
  // Defining hooks
  const [navbarOpen, setNavBarOpen] = useState<boolean>(false);

  // Defining local storage states
  const notes = useLocalStorageState<note[]>("projects", { defaultValue: [] });
  const tasks = useLocalStorageState<task[]>("tasks", { defaultValue: [] });
  const [greeting, setGreeting] = useLocalStorageState<boolean>("greeting", {
    defaultValue: false,
  });

  const journals = useLocalStorageState<journal[]>("journals", {
    defaultValue: [],
  });

  const projects = useLocalStorageState<project[]>("projects", {
    defaultValue: [],
  });

  const habits = useLocalStorageState<habit[]>("projects", {
    defaultValue: [],
  });

  // Returning JSX
  return (
    <div className="flex items-stretch justify-center overflow-hidden lg:h-dvh">
      {!greeting && <Greeting onOpenChange={() => setGreeting(true)} open />}
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
