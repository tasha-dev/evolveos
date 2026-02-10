// Codes by mahdi tasha
// Forcing next.js to render this page as client side
"use client";

// Importing part
import DashboardLayout from "@/component/dashboard/dashboardLayout";
import JournalBannerImage from "@/image/banner/journal.png";
import { JournalItemPageProps } from "@/type/page";
import { use, useState } from "react";
import useTitle from "@/hook/useTitle";
import MarkdownEditor from "@/component/markdownEditor";
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
import useDb from "use-db";
import { JournalsIndexedDBType } from "@/type/indexedDb";

// Creating and exporting JournalItem page as default
export default function JournalItemPage({ params }: JournalItemPageProps) {
  // Defining hooks
  const { journalItem } = use(params);
  const [id, titleURL] = journalItem.split("-");
  const title = decodeURIComponent(titleURL);
  const [editorContent, setEditorContent] = useState<string>("");
  const [journalsLocalStorage, setJournals] =
    useDb<JournalsIndexedDBType>("journals");

  useTitle(`${title} Journal`, [title, journalItem]);
  useKeyboard("s", saveJournal, true);

  // Defining variables
  const journals = journalsLocalStorage ? [...journalsLocalStorage] : [];
  const journalInLocalStorage = journals.find((item) => {
    return item.id.toString() === id && item.title === item.title;
  });

  // Defining function to save the new value of journal
  function saveJournal() {
    const journalsToSet = journals.map((item) =>
      item.id.toString() === id && item.title === title
        ? {
            ...item,
            content: editorContent,
          }
        : item,
    );

    setJournals(journalsToSet);
    toast.success("Your journal is saved successfully");
  }

  // Conditional rendering
  if (journalInLocalStorage) {
    return (
      <DashboardLayout
        bannerSrc={JournalBannerImage.src}
        bannerTitle={title}
        ctaButton={
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="nolightblur"
                size="icon-lg"
                onClick={saveJournal}
              >
                <Save />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Save Journal <Kbd className="ml-[1ch]">Ctrl + s</Kbd>
            </TooltipContent>
          </Tooltip>
        }
      >
        <MarkdownEditor
          defaultValue={journalInLocalStorage.content}
          onChange={setEditorContent}
        />
      </DashboardLayout>
    );
  } else {
    notFound();
  }
}
