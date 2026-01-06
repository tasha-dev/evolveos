// Codes by mahdi tasha
// Importing part
import Header from "@/component/header";
import CTA from "@/component/section/home/cta";
import Feature from "@/component/section/home/feature";
import Hero from "@/component/section/home/hero";
import VisualDemo from "@/component/section/home/visualDemo";
import Why from "@/component/section/home/why";

// Creating and exporting home page as default
export default function HomePage() {
  // Returning JSX
  return (
    <>
      <Header />
      <Hero />
      <Feature />
      <Why />
      <VisualDemo />
      <CTA />
    </>
  );
}
