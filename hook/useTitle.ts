// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import { useEffect } from "react";

// Creating and exporting useTitle custom hook as default
export default function useTitle(title: string, deps?: any[]) {
  useEffect(
    () => {
      const template = "%s | EvolveOS";
      const newTitle = template.replace("%s", title);

      document.title = newTitle;
    },
    deps && [...deps],
  );
}
