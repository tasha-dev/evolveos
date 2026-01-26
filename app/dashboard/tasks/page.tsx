// Codes by mahdi tasha
// Importing part
import DashboardLayout from "@/component/dashboard/dashboardLayout";
import type { Metadata } from "next";
import TasksBannerImage from "@/image/banner/tasks.png";

// Defining metadata
export const metadata: Metadata = {
  title: "Tasks",
};

// Creating and exporting Journal page as default
export default function JournalPage() {
  // Returning JSX
  return (
    <DashboardLayout
      bannerSrc={TasksBannerImage.src}
      bannerTitle="Tasks"
      className="flex flex-col gap-4"
    >
      HIHIHIH
    </DashboardLayout>
  );
}
