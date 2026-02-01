// Codes by mahdi tasha
// Importing part
import DashboardLayout from "@/component/dashboard/dashboardLayout";
import type { Metadata } from "next";
import ProjectsBannerImage from "@/image/banner/projects.png";
import ProjectsContainer from "@/component/container/projectsContainer";
import AddProject from "@/component/dialog/project/addProject";

// Defining metadata
export const metadata: Metadata = {
  title: "Projects",
};

// Creating and exporting Projects page as default
export default function ProjectsPage() {
  // Returning JSX
  return (
    <DashboardLayout
      bannerSrc={ProjectsBannerImage.src}
      bannerTitle="Projects"
      ctaButton={<AddProject />}
    >
      <ProjectsContainer />
    </DashboardLayout>
  );
}
