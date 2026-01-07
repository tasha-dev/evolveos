// Codes by mahdi tasha
// Importing part
import DashboardLayout from "@/component/dashboardLayout";
import type { Metadata } from "next";

// Defining metadata
export const metadata: Metadata = {
  title: "Dashboard",
};

// Creating and exporting Dashboard page as default
export default function DashboardPage() {
  // Returning JSX
  return (
    <DashboardLayout>
      <h1>Hello world</h1>
    </DashboardLayout>
  );
}
