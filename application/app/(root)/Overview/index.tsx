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
import { Utils } from "@/lib/utils/index";

export const Overview = () => {
  const store = useGlobalStore();
  const entries = store.entries;
  const selectedDate = "Now";
  const [project, setProject] = useState("");
  const [description, setDescription] = useState("");
  const [topic, setTopic] = useState("");
  const [endTime, setEndTime] = useState("");
  const [startTime, setStartTime] = useState("");

  const addEntry = () => {
    if (!project || !topic || !startTime || !endTime) return;

    const duration = Utils.calculateDuration(startTime, endTime);

    if (editingEntry) {
      const newEntries = entries.map((entry) =>
        entry.id === editingEntry.id
          ? {
              ...entry,
              project,
              topic,
              startTime,
              endTime,
              duration,
              description,
            }
          : entry
      );

      store.loadEntries(newEntries);

      setEditingEntry(null);
    } else {
      const newEntry: TimeEntry = {
        id: Date.now().toString(),
        project,
        topic,
        startTime,
        endTime,
        date: selectedDate,
        duration,
        description,
      };

      const newEntries = [...entries, newEntry];
      store.loadEntries(newEntries);
    }

    // Reset form
    setProject("");
    setTopic("");
    setStartTime("");
    setEndTime("");
    setDescription("");
    setIsAddDialogOpen(false);
  };

  const todayEntries = entries.filter((entry) => entry.date === selectedDate);

  const projectSummary = entries.reduce((acc, entry) => {
    acc[entry.project] = (acc[entry.project] || 0) + entry.duration;
    return acc;
  }, {} as Record<string, number>);

  const topicSummary = entries.reduce((acc, entry) => {
    acc[entry.topic] = (acc[entry.topic] || 0) + entry.duration;
    return acc;
  }, {} as Record<string, number>);

  const totalTimeToday = todayEntries.reduce(
    (sum, entry) => sum + entry.duration,
    0
  );

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<TimeEntry | null>(null);
  // const selectedDate = "Now"

  return (
    <Tabs defaultValue="today" className="space-y-6 w-full">
      <TabsList>
        <TabsTrigger value="today">Today</TabsTrigger>
        <TabsTrigger value="summary">Summary</TabsTrigger>
      </TabsList>

      <TabsContent value="today" className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Today&apos;s Entries</h2>
            <p className="text-sm text-muted-foreground">
              Total time: {Utils.formatDuration(totalTimeToday)}
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Entry
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingEntry ? "Edit Entry" : "Add Time Entry"}
                </DialogTitle>
                <DialogDescription>
                  {editingEntry
                    ? "Update the time entry details."
                    : "Add a new time entry for today."}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="project">Project</Label>
                    <Input
                      id="project"
                      value={project}
                      onChange={(e) => setProject(e.target.value)}
                      list="projects"
                    />
                  </div>
                  <div>
                    <Label htmlFor="topic">Topic</Label>
                    <Input
                      id="topic"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      list="topics"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="start-time">Start Time</Label>
                    <Input
                      id="start-time"
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="end-time">End Time</Label>
                    <Input
                      id="end-time"
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Description (optional)</Label>
                  <Input
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="What did you work on?"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={addEntry}>
                  {editingEntry ? "Update Entry" : "Add Entry"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-4">
          {todayEntries.length === 0 ? <NoEntriesView /> : <EntriesView />}
        </div>
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
                {Object.entries(projectSummary).map(([project, duration]) => (
                  <div
                    key={project}
                    className="flex items-center justify-between"
                  >
                    <span className="font-medium">{project}</span>
                    <span className="text-muted-foreground">
                      {Utils.formatDuration(duration)}
                    </span>
                  </div>
                ))}
                {Object.keys(projectSummary).length === 0 && (
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
                {Object.entries(topicSummary).map(([topic, duration]) => (
                  <div
                    key={topic}
                    className="flex items-center justify-between"
                  >
                    <span className="font-medium">{topic}</span>
                    <span className="text-muted-foreground">
                      {Utils.formatDuration(duration)}
                    </span>
                  </div>
                ))}
                {Object.keys(topicSummary).length === 0 && (
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
