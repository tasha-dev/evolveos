// Codes by mahdi tasha
// Importing part
import DashboardLayout from "@/component/dashboard/dashboardLayout";
import type { Metadata } from "next";
import ProjectsBannerImage from "@/image/banner/projects.png";

// Defining metadata
export const metadata: Metadata = {
  title: "Projects",
};

// Creating and exporting Journal page as default
export default function JournalPage() {
  // Returning JSX
  return (
    <DashboardLayout bannerSrc={ProjectsBannerImage.src} bannerTitle="Projects">
      HI
    </DashboardLayout>
  );
}
