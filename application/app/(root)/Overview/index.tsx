"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EntryRangeTab } from "./TodayTab";
import { Duration } from "./TodayTab/interface";

const summaryTab = "summary";

export const Overview = () => {
  return (
    <Tabs defaultValue={Duration.day} className="space-y-6 w-full">
      <TabsList>
        {Object.values(Duration).map((duration) => (
          <TabsTrigger className="capitalize" key={duration} value={duration}>
            {duration}
          </TabsTrigger>
        ))}
        <TabsTrigger value={summaryTab}>Summary</TabsTrigger>
      </TabsList>

      {(
        [...Object.values(Duration), summaryTab] as Array<Duration & "summary">
      ).map((duration) => (
        <TabsContent value={duration} key={duration} className="space-y-6">
          <EntryRangeTab duration={duration} />
        </TabsContent>
      ))}
    </Tabs>
  );
};
