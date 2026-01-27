// Codes by mahdi tasha
// Importing part
import DashboardLayout from "@/component/dashboard/dashboardLayout";
import type { Metadata } from "next";
import TasksBannerImage from "@/image/banner/tasks.png";
import TasksContainer from "@/component/container/tasksContainer";
import AddTasks from "@/component/dialog/tasks/addTasks";

// Defining metadata
export const metadata: Metadata = {
  title: "Tasks",
};

// Creating and exporting Tasks page as default
export default function TasksPage() {
  // Returning JSX
  return (
    <DashboardLayout
      bannerSrc={TasksBannerImage.src}
      bannerTitle="Tasks"
      ctaButton={<AddTasks />}
    >
      <TasksContainer />
    </DashboardLayout>
  );
}
