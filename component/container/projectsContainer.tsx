// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import { ContainerProps } from "@/type/component";
import ProjectCard from "../containerItem/projectCard";
import useDb from "use-db";
import { ProjectsIndexedDBType } from "@/type/indexedDb";
import EmptyContainer from "../emptyContainer";
import { Layers } from "lucide-react";

// Creating and exporting ProjectsContainer component as default
export default function ProjectsContainer({ className }: ContainerProps) {
  // Defining hooks
  const [projectsLocalStorage] = useDb<ProjectsIndexedDBType>("projects");

  // Defining variables
  const projects = projectsLocalStorage ? [...projectsLocalStorage] : [];

  // Returning JSX
  return (
    <div className={className}>
      {projects.length === 0 ? (
        <EmptyContainer icon={<Layers />} />
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
