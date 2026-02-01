// Codes by mahdi tasha
// Forcing next.js to render this page as client side
"use client";

// Importing part
import DashboardLayout from "@/component/dashboard/dashboardLayout";
import NoteBannerImage from "@/image/banner/notes.png";
import { NoteItemPageProps } from "@/type/page";
import { use, useState } from "react";
import useTitle from "@/hook/useTitle";
import MarkdownEditor from "@/component/markdownEditor";
import useLocalStorageState from "use-local-storage-state";
import { NotesLocalStorageType } from "@/type/localStorage";
import { notFound } from "next/navigation";
import useKeyboard from "@/hook/useKeyboard";
import { toast } from "sonner";
import { Button } from "@/component/ui/button";
import { Save } from "lucide-react";
import {
  TooltipContent,
  Tooltip,
  TooltipTrigger,
} from "@/component/ui/tooltip";
import { Kbd } from "@/component/ui/kbd";

// Creating and exporting NoteItem page as default
export default function NoteItemPage({ params }: NoteItemPageProps) {
  // Defining hooks
  const { noteItem } = use(params);
  const [id, titleURL] = noteItem.split("-");
  const title = decodeURIComponent(titleURL);
  const [editorContent, setEditorContent] = useState<string>("");
  const [notesLocalStorage, setNotes] =
    useLocalStorageState<NotesLocalStorageType>("notes");

  useTitle(`${title} Note`, [title, noteItem]);
  useKeyboard("s", saveNote, true);

  // Defining variables
  const notes = notesLocalStorage ? [...notesLocalStorage] : [];
  const findedNote = notes.find((item) => {
    return item.id.toString() === id && item.title === item.title;
  });

  // Defining function to save the new value of note
  function saveNote() {
    const notesToSet = notes.map((item) =>
      item.id.toString() === id && item.title === title
        ? {
            ...item,
            content: editorContent,
          }
        : item,
    );

    setNotes(notesToSet);
    toast.success("Your journal is saved successfully");
  }

  // Conditional rendering
  if (findedNote) {
    return (
      <DashboardLayout
        bannerSrc={NoteBannerImage.src}
        bannerTitle={title}
        ctaButton={
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="nolightblur" size="icon-lg" onClick={saveNote}>
                <Save />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Save Note <Kbd className="ml-[1ch]">Ctrl + s</Kbd>
            </TooltipContent>
          </Tooltip>
        }
      >
        <MarkdownEditor
          defaultValue={findedNote.content}
          onChange={setEditorContent}
        />
      </DashboardLayout>
    );
  } else {
    notFound();
  }
}
