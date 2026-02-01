// Codes by mahdi tasha
// Importing part
import DashboardLayout from "@/component/dashboard/dashboardLayout";
import type { Metadata } from "next";
import HabitsBannerImage from "@/image/banner/habits.png";
import AddHabit from "@/component/dialog/habit/addHabit";

// Defining metadata
export const metadata: Metadata = {
  title: "Habits",
};

// Creating and exporting Journal page as default
export default function JournalPage() {
  // Returning JSX
  return (
    <DashboardLayout
      bannerSrc={HabitsBannerImage.src}
      bannerTitle="Habits"
      ctaButton={<AddHabit />}
    >
      HELLO
    </DashboardLayout>
  );
}
