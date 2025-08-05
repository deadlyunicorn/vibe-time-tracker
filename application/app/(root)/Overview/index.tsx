"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGlobalStore } from "../store";
import { BarChart } from "lucide-react";
import { EntryRangeTab } from "./TodayTab";
import { Duration } from "./TodayTab/interface";
import { getProjectSummary, getTopicSummary } from "./utils";
import { TimeUtils } from "@/lib/utils/timeUtils";

export const Overview = () => {
  const store = useGlobalStore();
  



  // const projectSummary = entries.reduce((acc, entry) => {
  //   acc[entry.project] = acc[entry.project] || 0;
  //   return acc;
  // }, {} as Record<string, number>);

  // const topicSummary = entries.reduce((acc, entry) => {
  //   acc[entry.topic] = acc[entry.topic] || 0;
  //   return acc;
  // }, {} as Record<string, number>);

  // const totalTimeToday = todayEntries.reduce(
  //   (sum, entry) => sum + entry.startTime, // Calculate duration
  //   0
  // );

  // const selectedDate = "Now"

  return (
    <Tabs defaultValue="today" className="space-y-6 w-full">
      <TabsList>
        {Object.values(Duration).map((duration) => (
          <TabsTrigger className="capitalize" key={duration} value={duration}>
            {duration}
          </TabsTrigger>
        ))}
        <TabsTrigger value="summary">Summary</TabsTrigger>
      </TabsList>

      {Object.values(Duration).map((duration) => (
        <TabsContent value={duration} key={duration} className="space-y-6">
          <EntryRangeTab duration={duration} />
        </TabsContent>
      ))}

      <TabsContent value="summary" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="w-5 h-5" />
                Time by Project
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries([]).map(([project, duration]) => (
                  <div
                    key={project}
                    className="flex items-center justify-between"
                  >
                    <span className="font-medium">{project}</span>
                    <span className="text-muted-foreground">
                      {"calculateDurationAndUseLibraryForPrettyDisplayOfMs"}
                    </span>
                  </div>
                ))}
                {Object.keys([]).length === 0 && (
                  <p className="text-muted-foreground text-center py-4">
                    No data available
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="w-5 h-5" />
                Time by Topic
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries([]).map(([topic, duration]) => (
                  <div
                    key={topic}
                    className="flex items-center justify-between"
                  >
                    <span className="font-medium">{topic}</span>
                    <span className="text-muted-foreground">
                      {"PrettyDisplayOfDuration"}
                    </span>
                  </div>
                ))}
                {Object.keys([]).length === 0 && (
                  <p className="text-muted-foreground text-center py-4">
                    No data available
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  );
};
