// Codes by mahdi tasha
// Importing part
import DashboardLayout from "@/component/dashboardLayout";
import type { Metadata } from "next";
import JournalBannerImage from "@/image/banner/journal.png";
import JournalsContainer from "@/component/journalsContainer";
import AddJournal from "@/component/dialog/addJournal";

// Defining metadata
export const metadata: Metadata = {
  title: "Journal",
};

// Creating and exporting Journal page as default
export default function JournalPage() {
  // Returning JSX
  return (
    <DashboardLayout
      bannerSrc={JournalBannerImage.src}
      bannerTitle="Journal"
      ctaButton={<AddJournal />}
      className="flex flex-col gap-4"
    >
      <JournalsContainer />
    </DashboardLayout>
  );
}
