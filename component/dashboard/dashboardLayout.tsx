// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import Banner from "@/component/banner";
import { cn } from "@/lib/util";
import { DashboardLayoutProps } from "@/type/component";
import { useRef, useState } from "react";
import useDb from "use-db";
import NavBar from "@/component/navBar";
import useLocalStorageState from "use-local-storage-state";
import Greeting from "@/component/dialog/greeting";
import {
  HabitsIndexedDBType,
  JournalsIndexedDBType,
  NotesIndexedDBType,
  ProjectsIndexedDBType,
  TasksIndexedDBType,
} from "@/type/indexedDb";

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
  const [greeting, setGreeting] = useLocalStorageState<boolean>("greeting", {
    defaultValue: false,
  });

  // Defining local storage states
  const notes = useDb<NotesIndexedDBType>("notes", {
    defaultValue: [],
  });

  const journals = useLocalStorageState<JournalsIndexedDBType>("journals", {
    defaultValue: [],
  });

  const tasks = useLocalStorageState<TasksIndexedDBType>("tasks", {
    defaultValue: [],
  });

  const projects = useLocalStorageState<ProjectsIndexedDBType>("projects", {
    defaultValue: [],
  });

  const habits = useLocalStorageState<HabitsIndexedDBType>("habits", {
    defaultValue: [],
  });

  const navbarRefrence = useRef<HTMLElement | null>(null);

  // Returning JSX
  return (
    <div className="flex items-stretch justify-center overflow-hidden lg:h-dvh">
      {!greeting && <Greeting onOpenChange={() => setGreeting(true)} open />}
      <NavBar
        open={navbarOpen}
        ref={navbarRefrence}
        onOpenChange={(open) => {
          setNavBarOpen(open);
          if (open) {
            const navbarElement = navbarRefrence.current;
            const firstLink: HTMLAnchorElement | null | undefined =
              navbarElement?.querySelector("a:first-of-type");

            firstLink?.focus();
          }
        }}
      />
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
