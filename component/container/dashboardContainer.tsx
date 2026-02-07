// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import Calendar from "@/component/quickView/calendar";
import HabitChart from "@/component/chart/habitChart";
import ProjectsShowcase from "@/component/quickView/projectsShowscase";
import QuickJournalView from "@/component/quickView/quickJournalView";
import QuickNotesView from "@/component/quickView/quickNotesView";
import QuickTasksView from "@/component/quickView/quickTasksView";

// Creating and exporting DashboardContainer component as default
export default function DashboardContainer() {
  // Returning JSX
  return (
    <div className="flex flex-col gap-4">
      <HabitChart />
      <ProjectsShowcase />
      <div className="grid lg:grid-cols-2 gap-4">
        <QuickNotesView className="lg:max-h-[200px] lg:overflow-auto overflow-hidden" />
        <QuickTasksView className="lg:max-h-[200px] lg:overflow-auto overflow-hidden" />
      </div>
      <QuickJournalView className="lg:max-h-[350px]" />
      <Calendar />
    </div>
  );
}
