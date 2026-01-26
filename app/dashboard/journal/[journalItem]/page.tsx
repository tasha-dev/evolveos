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
import useLocalStorageState from "use-local-storage-state";
import { JournalsLocalStorageType } from "@/type/localStorage";
import { notFound } from "next/navigation";
import useKeyboard from "@/hook/useKeyboard";
import { toast } from "sonner";

// Creating and exporting JournalItem page as default
export default function JournalItemPage({ params }: JournalItemPageProps) {
  // Defining hooks
  const { journalItem } = use(params);
  const [id, titleURL] = journalItem.split("-");
  const title = decodeURIComponent(titleURL);
  const [editorContent, setEditorContent] = useState<string>("");
  const [journalsLocalStorage, setJournals] =
    useLocalStorageState<JournalsLocalStorageType>("journals");

  useTitle(`${title} Journal`, [title, journalItem]);
  useKeyboard(
    "s",
    () => {
      saveJournal(editorContent);
      toast.success("Your journal is saved successfully");
    },
    true,
  );

  // Defining variables
  const journals = journalsLocalStorage ? [...journalsLocalStorage] : [];
  const journalInLocalStorage = journals.find((item) => {
    return item.id.toString() === id && item.title === item.title;
  });

  // Defining function to save the new value of journal
  function saveJournal(newContent: string) {
    const journalsToSet = journals.map((item) =>
      item.id.toString() === id && item.title === title
        ? {
            ...item,
            content: newContent,
          }
        : item,
    );

    setJournals(journalsToSet);
  }

  // Conditional rendering
  if (journalInLocalStorage) {
    return (
      <DashboardLayout
        bannerSrc={JournalBannerImage.src}
        bannerTitle={title}
        className="flex flex-col gap-4"
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
