// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// importing part
import { cn } from "@/lib/util";
import { ImageMagnifiereProps } from "@/type/component";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";

// Creating and exporting ImageMagnifier component as default
export default function ImageMagnifier({
  src,
  alt = "Magnifiable Image",
  className,
}: ImageMagnifiereProps) {
  // Defining hooks
  const [imageMagnified, setImageMagnified] = useState<boolean>(false);

  // Returning JSX
  return (
    <>
      {typeof window !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {imageMagnified && (
              <motion.div
                key="overlay"
                className="z-50 bg-foreground/30 backdrop-blur-xl fixed inset-0 overflow-y-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => {
                  setImageMagnified(false);
                  document.body.style.overflow = "auto";
                }}
              >
                <motion.div
                  key="content"
                  className="flex min-h-full items-center justify-center p-4 max-w-4xl mx-auto"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => {
                    setImageMagnified(false);
                    document.body.style.overflow = "auto";
                  }}
                >
                  <Image
                    alt={alt}
                    src={src}
                    width={1000}
                    height={1000}
                    className="w-full object-contain h-auto rounded-lg"
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
      <Image
        alt={alt}
        src={src}
        width={1000}
        height={1000}
        className={cn("object-cover cursor-zoom-in", className)}
        onClick={() => {
          setImageMagnified(true);
          document.body.style.overflow = "hidden";
        }}
      />
    </>
  );
}
