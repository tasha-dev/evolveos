// Codes by mahdi tasha
// Forcing next.js to render this page as client side
"use client";

// Importing part
import DashboardLayout from "@/component/dashboard/dashboardLayout";
import ProjectBannerImage from "@/image/banner/projects.png";
import { ProjectItemPageProps } from "@/type/page";
import { use, useState } from "react";
import useTitle from "@/hook/useTitle";
import MarkdownEditor from "@/component/markdownEditor";
import useLocalStorageState from "use-local-storage-state";
import { ProjectsLocalStorageType } from "@/type/localStorage";
import { notFound } from "next/navigation";
import useKeyboard from "@/hook/useKeyboard";
import { toast } from "sonner";
import { Button } from "@/component/ui/button";
import { Save, Square, SquareCheck } from "lucide-react";
import {
  TooltipContent,
  Tooltip,
  TooltipTrigger,
} from "@/component/ui/tooltip";
import { Kbd } from "@/component/ui/kbd";

// Creating and exporting ProjectItem page as default
export default function ProjectItemPage({ params }: ProjectItemPageProps) {
  // Defining hooks
  const { projectItem } = use(params);
  const [id, titleURL] = projectItem.split("-");
  const title = decodeURIComponent(titleURL);
  const [editorContent, setEditorContent] = useState<string>("");
  const [projectsLocalStorage, setProjects] =
    useLocalStorageState<ProjectsLocalStorageType>("projects");

  useTitle(`${title} Project`, [title, projectItem]);
  useKeyboard("s", saveProject, true);
  useKeyboard("d", toggleDoneProject, true);

  // Defining variables
  const projects = projectsLocalStorage ? [...projectsLocalStorage] : [];
  const foundedProject = projects.find((item) => {
    return item.id.toString() === id && item.title === item.title;
  });

  // Defining function to save the new value of project
  function saveProject() {
    const projectsToSet = projects.map((item) =>
      item.id.toString() === id && item.title === title
        ? {
            ...item,
            content: editorContent,
          }
        : item,
    );

    setProjects(projectsToSet);
    toast.success("Your project is saved successfully");
  }

  // Defining function to set done/undone the project
  function toggleDoneProject() {
    const state = !foundedProject?.done;
    const projectsToSet = projects.map((item) =>
      item.id.toString() === id && item.title === title
        ? {
            ...item,
            done: !item.done,
          }
        : item,
    );

    setProjects(projectsToSet);
    state !== undefined &&
      toast.success(`Your project is ${state ? "Done" : "'not done'"} Now`);
  }

  // Conditional rendering
  if (foundedProject) {
    return (
      <DashboardLayout
        bannerSrc={ProjectBannerImage.src}
        bannerTitle={title}
        ctaButton={
          <>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="nolightblur"
                  size="icon-lg"
                  onClick={toggleDoneProject}
                >
                  {foundedProject.done ? <SquareCheck /> : <Square />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                Mark project as {foundedProject.done ? "Undone" : "done"}
                <Kbd className="ml-[1ch]">Ctrl + d</Kbd>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="nolightblur"
                  size="icon-lg"
                  onClick={saveProject}
                >
                  <Save />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                Save Project <Kbd className="ml-[1ch]">Ctrl + s</Kbd>
              </TooltipContent>
            </Tooltip>
          </>
        }
      >
        <MarkdownEditor
          defaultValue={foundedProject.content}
          onChange={setEditorContent}
        />
      </DashboardLayout>
    );
  } else {
    notFound();
  }
}
