"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NoEntriesView } from "../Entries/NoEntriesView";
import { EntriesView } from "../Entries/EntriesView";
import { useGlobalStore } from "../store";
import { TimeEntry } from "../interface";
import { useState } from "react";
import { BarChart, Plus } from "lucide-react";
import { useLoadEntries } from "../Entries/hooks/useEntries";
import { TodayTab } from "./TodayTab";

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
        <TabsTrigger value="today">Today</TabsTrigger>
        <TabsTrigger value="summary">Summary</TabsTrigger>
      </TabsList>

      <TabsContent value="today" className="space-y-6">
        <TodayTab />
      </TabsContent>

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
