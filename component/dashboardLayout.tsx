// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import Banner from "@/component/banner";
import { cn } from "@/lib/util";
import { DashboardLayoutProps } from "@/type/component";
import { useState } from "react";
import NavBar from "./navBar";
import useLocalStorageState from "use-local-storage-state";
import Greeting from "./dialog/greeting";
import {
  HabitsLocalStorageType,
  JournalsLocalStorageType,
  NotesLocalStorageType,
  ProjectsLocalStorageType,
  TasksLocalStorageType,
} from "@/type/localStorage";

// Creating and exporting DashboardLayout component as default
export default function DashboardLayout({
  children,
  className,
  bannerTitle,
  bannerSrc,
  ctaButton,
}: DashboardLayoutProps) {
  // Defining hooks
  const [navbarOpen, setNavBarOpen] = useState<boolean>(false);

  // Defining local storage states
  const notes = useLocalStorageState<NotesLocalStorageType>("notes", {
    defaultValue: [],
  });

  const [greeting, setGreeting] = useLocalStorageState<boolean>("greeting", {
    defaultValue: false,
  });

  const journals = useLocalStorageState<JournalsLocalStorageType>("journals", {
    defaultValue: [],
  });

  const tasks = useLocalStorageState<TasksLocalStorageType>("tasks", {
    defaultValue: [],
  });

  const projects = useLocalStorageState<ProjectsLocalStorageType>("projects", {
    defaultValue: [],
  });

  const habits = useLocalStorageState<HabitsLocalStorageType>("habits", {
    defaultValue: [],
  });

  // Returning JSX
  return (
    <div className="flex items-stretch justify-center overflow-hidden lg:h-dvh">
      {!greeting && <Greeting onOpenChange={() => setGreeting(true)} open />}
      <NavBar open={navbarOpen} onOpenChange={setNavBarOpen} />
      <div className="flex-1 h-full overflow-auto">
        <Banner
          src={bannerSrc}
          ctaButton={ctaButton}
          title={bannerTitle}
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
