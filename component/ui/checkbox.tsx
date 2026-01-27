// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import { cn } from "@/lib/util";
import { CheckboxProps } from "@/type/component";
import { Check } from "lucide-react";
import { useState } from "react";

// Creating and exporting Checkbox component as default
export default function Checkbox({
  checked = false,
  className,
  onCheckChange,
}: CheckboxProps) {
  // Defining hooks
  const [checkedState, setCheckedState] = useState<boolean>(checked);

  // Returning JSX
  return (
    <button
      data-checked={checkedState}
      onClick={() => {
        setCheckedState((prev) => !prev);
        onCheckChange?.(checkedState);
      }}
      className={cn(
        "size-4 rounded-xs bg-transparent transition-all duration-500 border text-background border-foreground flex items-center justify-center p-0.5",
        "data-[checked=false]:bg-transparent",
        "data-[checked=true]:bg-foreground data-[checked=true]:text-background",
        className,
      )}
    >
      <Check className="w-full" />
    </button>
  );
}
