// Codes by mahdi tasha
// Importing part
import type { NextConfig } from "next";
import withSerwistInit from "@serwist/next";

// Defining config of next.js
const withSerwist = withSerwistInit({
  swSrc: "app/sw.ts",
  swDest: "public/sw.js",
  cacheOnNavigation: true,
  reloadOnOnline: true,
  disable: process.env.NODE_ENV === "development",
  additionalPrecacheEntries: [{ url: "/", revision: null }],
});

const nextConfig: NextConfig = {
  images: {
    domains: ["picsum.photos"],
  },
};

// Exporting the configs as default
export default withSerwist(nextConfig);
