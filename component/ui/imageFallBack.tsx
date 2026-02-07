// Codes by mahdi tasha
// Forcing next.js to render this component as client side
"use client";

// Importing part
import { ImageFallBackProps } from "@/type/component";
import Image from "next/image";
import { useState } from "react";
import { Skeleton } from "./skeleton";
import { cn } from "@/lib/util";

// Creating and exporting ImageFallBack component as default
export default function ImageFallBack({
  alt,
  height,
  src,
  width,
  className,
}: ImageFallBackProps) {
  // Defining hooks
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  // Returning JSX
  return (
    <>
      {loading && <Skeleton className={cn("rounded-none", className)} />}
      {error && <div className={cn("bg-destructive", className)} />}
      <Image
        onLoad={() => {
          setError(false);
          setLoading(false);
        }}
        onError={() => {
          setLoading(false);
          setError(true);
        }}
        src={src}
        className={className}
        hidden={loading || error}
        width={width}
        height={height}
        loading="eager"
        alt={alt}
      />
    </>
  );
}
