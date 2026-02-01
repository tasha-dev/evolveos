// Codes by mahdi tasha
// Importing part
import DashboardLayout from "@/component/dashboard/dashboardLayout";
import type { Metadata } from "next";
import NotesBannerImage from "@/image/banner/notes.png";
import AddNote from "@/component/dialog/notes/addNote";
import NoteContainer from "@/component/container/noteContainer";

// Defining metadata
export const metadata: Metadata = {
  title: "Notes",
};

// Creating and exporting Notes page as default
export default function NotesPage() {
  // Returning JSX
  return (
    <DashboardLayout
      bannerSrc={NotesBannerImage.src}
      bannerTitle="Notes"
      ctaButton={<AddNote />}
    >
      <NoteContainer />
    </DashboardLayout>
  );
}
