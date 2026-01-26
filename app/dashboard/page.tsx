// Codes by mahdi tasha
// Importing part
import Calendar from "@/component/quickView/calendar";
import HabitChart from "@/component/chart/habitChart";
import DashboardLayout from "@/component/dashboard/dashboardLayout";
import ProjectsShowcase from "@/component/quickView/projectsShowscase";
import QuickJournalView from "@/component/quickView/quickJournalView";
import QuickNotesView from "@/component/quickView/quickNotesView";
import QuickTasksView from "@/component/quickView/quickTasksView";
import type { Metadata } from "next";
import DashboardBannerImage from "@/image/banner/dashboard.png";

// Defining metadata
export const metadata: Metadata = {
  title: "Dashboard",
};

// Creating and exporting Dashboard page as default
export default function DashboardPage() {
  // Returning JSX
  return (
    <DashboardLayout
      bannerSrc={DashboardBannerImage.src}
      bannerTitle="Dashboard"
      className="flex flex-col gap-4"
    >
      <HabitChart />
      <ProjectsShowcase />
      <div className="grid lg:grid-cols-2 gap-4">
        <QuickNotesView className="lg:max-h-[200px] lg:overflow-auto overflow-hidden" />
        <QuickTasksView className="lg:max-h-[200px] lg:overflow-auto overflow-hidden" />
      </div>
      <QuickJournalView className="lg:max-h-[350px]" />
      <Calendar />
    </DashboardLayout>
  );
}
