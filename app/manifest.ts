// Codes by mahdi tasha
// Importing part
import type { MetadataRoute } from "next";

// Creating and exporting manifest for pwa part of the app
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "EvolveOS",
    short_name: "EvolveOS",
    description:
      "EvolveOS is a markdown-first, offline-friendly personal growth OS for journaling, habits, tasks, and focused daily planning.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0a0a0a",
    orientation: "portrait-primary",
    categories: ["productivity", "lifestyle"],
    lang: "en",
    prefer_related_applications: false,
    icons: [
      {
        src: "/manifest/manifest-icon-192.maskable.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/manifest/manifest-icon-192.maskable.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/manifest/manifest-icon-512.maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/manifest/manifest-icon-512.maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
