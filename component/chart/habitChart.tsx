// Codes by mahdi tasha
// Forcing next.js to render this component as client side component
"use client";

// Importing part
import useLocalStorageState from "use-local-storage-state";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { habit } from "@/type/general";
import { HabitChartProps } from "@/type/component";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/component/ui/chart";

// Defining chart config
const chartConfig = {
  score: {
    label: "Score",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

// Creating and exporting HabitChart component as default
export default function HabitChart({ className }: HabitChartProps) {
  // Defining hooks
  const [habits] = useLocalStorageState<habit[]>("habits");
  const chartData = habits;

  // Returning JSX
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Consistency Over Time</CardTitle>
        <CardDescription>
          Small daily actions build long-term results. Stay consistent.
        </CardDescription>
      </CardHeader>
      <div className="py-4 px-6">
        <ChartContainer config={chartConfig}>
          <AreaChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="gradient-score" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-score)"
                  stopOpacity={0.5}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-score)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="point"
              fill="url(#gradient-score)"
              fillOpacity={0.4}
              stroke="var(--color-score)"
              stackId="a"
              strokeWidth={0.8}
              strokeDasharray="3 3"
            />
          </AreaChart>
        </ChartContainer>
      </div>
    </Card>
  );
}
