// Codes by mahdi tasha
// Importing part
import Banner from "@/component/banner";
import type { Metadata } from "next";
import SilkImage from "@/image/silk.png";

// Defining metadata
export const metadata: Metadata = {
  title: "Dashboard",
};

// Creating and exporting Dashboard page as default
export default function DashboardPage() {
  // Returning JSX
  return (
    <div>
      <Banner src={SilkImage.src} title="Dashboard" />
      <h1>Hello world</h1>
    </div>
  );
}
