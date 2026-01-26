// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import { ProjectsShowcaseProps } from "@/type/component";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/component/ui/card";
import { TabsContent, Tabs, TabsList, TabsTrigger } from "@/component/ui/tabs";
import useLocalStorageState from "use-local-storage-state";
import { ProjectsLocalStorageType } from "@/type/localStorage";
import DashboardListItem from "@/component/dashboard/dashboardListItem";
import moment from "moment";

// Creating and exporting ProjectsShowcase component as default
export default function ProjectsShowcase({ className }: ProjectsShowcaseProps) {
  // Defining hooks
  const [projects] = useLocalStorageState<ProjectsLocalStorageType>("projects");

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
        <Tabs defaultValue="all">
          <TabsList className="mb-5">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          <TabsContent value="active">
            {activeOnes.length === 0 ? (
              <div className="h-[200px] flex items-center justify-center">
                <span>There is nothing to show</span>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {activeOnes.map((item, index) => (
                  <DashboardListItem
                    date={`${moment(item.timing.start).format("YYYY/MM/DD")} - ${moment(item.timing.deadLine).format("YYYY/MM/DD")}`}
                    title={item.title}
                    icon={item.done ? "square-check" : "square"}
                    key={index}
                  />
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
              <div className="flex flex-col gap-3">
                {projectsCopy.map((item, index) => (
                  <DashboardListItem
                    date={item.createdAt}
                    title={item.title}
                    icon={item.done ? "square-check" : "square"}
                    key={index}
                  />
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
              <div className="flex flex-col gap-3">
                {completedOnes.map((item, index) => (
                  <DashboardListItem
                    date={item.createdAt}
                    title={item.title}
                    icon={item.done ? "square-check" : "square"}
                    key={index}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  );
}
