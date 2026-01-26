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

// Creating and exporting MarkdownEditor component as default
export default function MarkdownEditor({
  className,
  defaultValue,
  onChange,
  readonly = false,
}: MarkdownEditorProps) {
  // Defining hooks
  const editor = useEditor({
    extensions: [StarterKit, Markdown.configure({})],
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
