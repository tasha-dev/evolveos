// Codes by mahdi tasha
// Importing part
import DashboardLayout from "@/component/dashboard/dashboardLayout";
import type { Metadata } from "next";
import DashboardBannerImage from "@/image/banner/dashboard.png";
import DashboardContainer from "@/component/container/dashboardContainer";

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
    >
      <DashboardContainer />
    </DashboardLayout>
  );
}
