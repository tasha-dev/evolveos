// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import { ProjectsShowcaseProps } from "@/type/component";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { TabsContent, Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import useLocalStorageState from "use-local-storage-state";
import { project } from "@/type/general";
import ProjectDashboardItem from "./projectDashboardItem";

// Creating and exporting ProjectsShowcase component as default
export default function ProjectsShowcase({ className }: ProjectsShowcaseProps) {
  // Defining hooks
  const [projects] = useLocalStorageState<project[]>("projects");

  // Defining variables
  const projectsCopy = projects ? [...projects] : [];
  const activeOnes = projectsCopy.filter((item) => !item.done);
  const completedOnes = projectsCopy.filter((item) => item.done);

  // Returning JSX
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Projects</CardTitle>
        <CardDescription>
          An overview of everything you’re building, tracking progress and
          current status.
        </CardDescription>
      </CardHeader>
      <div className="py-4 px-6">
        <Tabs defaultValue="active">
          <TabsList>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          <TabsContent value="active">
            {activeOnes.length === 0 ? (
              <div className="h-[200px] flex items-center justify-center">
                <span>There is nothing to show</span>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-6">
                {activeOnes.map((item, index) => (
                  <ProjectDashboardItem data={item} key={index} />
                ))}
              </div>
            )}
          </TabsContent>
          <TabsContent value="all">
            {projectsCopy.length === 0 ? (
              <div className="h-[200px] flex items-center justify-center">
                <span>There is nothing to show</span>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-6">
                {projectsCopy.map((item, index) => (
                  <ProjectDashboardItem data={item} key={index} />
                ))}
              </div>
            )}
          </TabsContent>
          <TabsContent value="completed">
            {completedOnes.length === 0 ? (
              <div className="h-[200px] flex items-center justify-center">
                <span>There is nothing to show</span>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-6">
                {completedOnes.map((item, index) => (
                  <ProjectDashboardItem data={item} key={index} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  );
}
