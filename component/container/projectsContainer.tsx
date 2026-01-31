// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import { ContainerProps } from "@/type/component";
import { ProjectsLocalStorageType } from "@/type/localStorage";
import useLocalStorageState from "use-local-storage-state";
import ProjectCard from "../containerItem/projectCard";

// Creating and exporting ProjectsContainer component as default
export default function ProjectsContainer({ className }: ContainerProps) {
  // Defining hooks
  const [projectsLocalStorage] =
    useLocalStorageState<ProjectsLocalStorageType>("projects");

  // Defining variables
  const projects = projectsLocalStorage ? [...projectsLocalStorage] : [];

  // Returning JSX
  return (
    <div className={className}>
      {projects.length === 0 ? (
        <h3 className="font-semibold text-center truncate block text-lg">
          There is nothing to show
        </h3>
      ) : (
        <div className="grid lg:grid-cols-2 gap-4">
          {projects.map((item, index) => (
            <ProjectCard key={index} data={item} />
          ))}
        </div>
      )}
    </div>
  );
}
