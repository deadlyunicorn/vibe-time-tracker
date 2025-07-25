import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EntriesView } from "../../Entries/EntriesView";
import { NoEntriesView } from "../../Entries/NoEntriesView";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { TimeEntry } from "../../interface";
import { useGlobalStore } from "../../store";
import { useLoadEntries } from "../../Entries/hooks/useEntries";

export const TodayTab = () => {
  const store = useGlobalStore();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<TimeEntry | null>(null);

  const [project, setProject] = useState("");
  const [description, setDescription] = useState("");
  const [topic, setTopic] = useState("");
  const [endTime, setEndTime] = useState("");
  const [startTime, setStartTime] = useState("");

  // const addEntry = () => {
  //   if (!project || !topic || !startTime || !endTime) return;

  //   // const duration = Utils.calculateDuration(startTime, endTime);

  //   if (editingEntry) {
  //     const newEntries = entries.map((entry) =>
  //       editingEntry
  //         ? {
  //             ...entry,
  //             project,
  //             topic,
  //             startTime,
  //             endTime,
  //             description,
  //           }
  //         : entry
  //     );

  //     // store.loadEntries(newEntries);

  //     setEditingEntry(null);
  //   } else {
  //     const newEntry: TimeEntry = {
  //       id: Date.now().toString(),
  //       project,
  //       topic,
  //       startTime,
  //       endTime,
  //       date: selectedDate,
  //       duration,
  //       description,
  //     };

  //     const newEntries = [...entries, newEntry];
  //     store.loadEntries(newEntries);
  //   }

  //   // Reset form
  //   setProject("");
  //   setTopic("");
  //   setStartTime("");
  //   setEndTime("");
  //   setDescription("");
  //   setIsAddDialogOpen(false);
  // };

  const addEntry = () => {
    alert("Hello world");
  };

  const { loading } = useLoadEntries();

  const entries = store.entries;
  const selectedDate = "Now";
  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Today&apos;s Entries</h2>
          <p className="text-sm text-muted-foreground">
            Total time: {"calculateDuration()"}
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
        {loading ? (
          "loadingComponent"
        ) : entries.length === 0 ? (
          <NoEntriesView />
        ) : (
          <EntriesView />
        )}
      </div>
    </>
  );
};
