// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import { EditorContent, useEditor } from "@tiptap/react";
import { Markdown } from "@tiptap/markdown";
import StarterKit from "@tiptap/starter-kit";
import { MarkdownEditorProps } from "@/type/component";
import { useEffect } from "react";
import { cn } from "@/lib/util";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import { all, createLowlight } from "lowlight";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import "highlight.js/styles/github-dark.css";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import { Button } from "./ui/button";

// Defining variables
const lowlight = createLowlight(all);

// Registering languages of lowlight
lowlight.register("html", html);
lowlight.register("css", css);
lowlight.register("js", js);
lowlight.register("ts", ts);

// Creating and exporting MarkdownEditor component as default
export default function MarkdownEditor({
  className,
  defaultValue,
  onChange,
  readonly = false,
}: MarkdownEditorProps) {
  // Defining hooks
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      CodeBlockLowlight.configure({
        lowlight,
        enableTabIndentation: true,
      }),
      Markdown.configure({
        markedOptions: {
          gfm: true,
        },
      }),
      Placeholder.configure({
        placeholder: "Write something …",
      }),
      Link,
      Image,
      TaskList,
      TaskItem,
      Highlight,
      Table.configure({
        resizable: true,
        lastColumnResizable: false,
        allowTableNodeSelection: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    injectCSS: false,
    immediatelyRender: true,
    editable: !readonly,
    onUpdate: ({ editor }) => {
      if (editor) {
        onChange?.(editor.getMarkdown());
      }
    },
  });

  // Using useEffect to set default content of editor on load of it
  useEffect(() => {
    if (editor && defaultValue) {
      editor.commands.setContent(defaultValue, {
        emitUpdate: false,
        contentType: "markdown",
      });
    }
  }, [editor, defaultValue]);

  // Returning JSX
  return (
    <EditorContent
      editor={editor}
      className={cn(
        "min-h-[500px] prose prose-neutral dark:prose-invert w-full max-w-full p-0 m-0 outline-0",
        className,
      )}
    />
  );
}
