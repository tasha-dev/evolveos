// Codes by mahdi tasha
// Importing part
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/component/ui/card";
import { Flag, GlobeLock, Heading, LayoutDashboard, List } from "lucide-react";
import { ReactNode } from "react";

// Defining data of cards to render
const cards: {
  title: string;
  description: string;
  icon: ReactNode;
}[] = [
  {
    title: "Daily Dashboard",
    description:
      "See your day at a glance — tasks, habits, and reflections all in one place.",
    icon: <LayoutDashboard />,
  },
  {
    title: "Markdown Notes & Journals",
    description:
      "Write freely in Markdown. Keep your thoughts organized and portable.",
    icon: <Heading />,
  },
  {
    title: "Habits & Goals",
    description:
      "Track habits daily and visualize your weekly progress. Build routines that stick.",
    icon: <Flag />,
  },
  {
    title: "Projects & Tasks",
    description:
      "Organize your tasks into projects, assign priorities, and stay focused.",
    icon: <List />,
  },
  {
    title: "Offline & Local-First",
    description:
      "Your data belongs to you. Work anytime, anywhere without dependency on the cloud.",
    icon: <GlobeLock />,
  },
];

// Creating and exporting Feature section of home page as default
export default function Feature() {
  // Returning JSX
  return (
    <section className="max-w-4xl border-x border-x-foreground/10 mx-auto">
      <main className="prose dark:prose-invert prose-neutral min-h-[calc(100dvh-65px)] p-4 max-w-full">
        <h2 className="mt-0">
          Everything You Need to Take Control of Your Life
        </h2>
        <div className="grid lg:grid-cols-3 gap-6">
          {cards.map((item, index) => (
            <Card
              key={index}
              className={
                index + 1 === cards.length && cards.length % 2 !== 0
                  ? "lg:col-span-2"
                  : ""
              }
            >
              <CardHeader>
                <div className="relative z-0">
                  <div className="absolute -z-10 size-10 bg-foreground translate-x-2 -translate-y-1 left-0 top-0 rotate-8 rounded-md" />
                  <div className="flex items-center justify-center size-10 shrink-0 mb-3 rounded-md border-foreground/25 bg-foreground/20 backdrop-blur-xl text-background">
                    {item.icon}
                  </div>
                </div>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </main>
    </section>
  );
}
