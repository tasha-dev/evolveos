// Codes by mahdi tasha
// Importing part
import HabitChart from "@/component/chart/habitChart";
import DashboardLayout from "@/component/dashboardLayout";
import ProjectsShowcase from "@/component/projectsShowscase";
import QuickNotesView from "@/component/quickNotesView";
import QuickTasksView from "@/component/quickTasksView";
import type { Metadata } from "next";

// Defining metadata
export const metadata: Metadata = {
  title: "Dashboard",
};

// Creating and exporting Dashboard page as default
export default function DashboardPage() {
  // Returning JSX
  return (
    <DashboardLayout bannerTitle="Dashboard" className="flex flex-col gap-4">
      <HabitChart />
      <ProjectsShowcase />
      <div className="grid lg:grid-cols-2 gap-4">
        <QuickNotesView className="lg:max-h-[200px] lg:overflow-auto overflow-hidden" />
        <QuickTasksView className="lg:max-h-[200px] lg:overflow-auto overflow-hidden" />
      </div>
    </DashboardLayout>
  );
}
