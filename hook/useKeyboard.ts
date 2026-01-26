// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import { useEffect } from "react";

// Creating and exporting useKeyboard custom hook as default
export default function useKeyboard(
  key: string,
  handler: () => void,
  ctrl?: boolean,
  deps?: any[],
) {
  useEffect(() => {
    function eventHandlerFn(e: KeyboardEvent) {
      if (ctrl) {
        if (e.key.toLowerCase() === key.toLowerCase() && e.ctrlKey) {
          e.preventDefault();
          handler();
        }
      } else {
        if (e.key.toLowerCase() === key.toLowerCase()) {
          e.preventDefault();
          handler();
        }
      }
    }

    addEventListener("keydown", eventHandlerFn);

    // Clean up
    return () => removeEventListener("keydown", eventHandlerFn);
  }, [key, handler, deps && [...deps]]);
}
