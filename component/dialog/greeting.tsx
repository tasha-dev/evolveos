// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import {
  Dialog,
  DialogHeader,
  DialogFooter,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogBody,
} from "@/component/ui/dialog";
import { Button } from "../ui/button";
import { Trophy } from "lucide-react";
import { CustomDialogProps } from "@/type/component";

// Creating and exporting Greeting dialog as default
export default function Greeting({ onOpenChange, open }: CustomDialogProps) {
  // Returning JSX
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Welcome to EvolveOS! 🌱</DialogTitle>
          <DialogDescription>
            Your personal growth operating system — built to help you track
            habits, journal, plan tasks, and organize your life, all in one
            place.
          </DialogDescription>
        </DialogHeader>
        <DialogBody className="prose prose-neutral dark:prose-invert">
          <p>
            EvolveOS is designed around systems, not motivation. <br /> With
            your dashboard, you can:
          </p>
          <ul>
            <li>Track daily habits and see your progress</li>
            <li>Plan and manage tasks & projects</li>
            <li>Jurnal and capture notes</li>
            <li>
              Keep everything offline and markdown-first, so your data is yours
              forever
            </li>
          </ul>
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button size={"lg"} variant={"default"}>
              <Trophy />
              Get Started
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
