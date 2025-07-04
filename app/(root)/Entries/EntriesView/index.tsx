import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useGlobalStore } from "../../store";
import { Utils } from "../../utils";
import { Edit, Trash } from "lucide-react";
import { TimeEntry } from "../../interface";

export const EntriesView = () => {
  const store = useGlobalStore();
  const entries = store.entries;

  const editEntry = (entry: TimeEntry) => {
    alert(entry);
  };

  const deleteEntry = (id: string) => {
    alert(id);
  };

  return entries.map((entry) => (
    <Card key={entry.id}>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="secondary">{entry.project}</Badge>
                <Badge variant="outline">{entry.topic}</Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>
                  {entry.startTime} - {entry.endTime}
                </span>
                <span className="font-medium">
                  {Utils.formatDuration(entry.duration)}
                </span>
              </div>
              {entry.description && (
                <p className="text-sm mt-1">{entry.description}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => editEntry(entry)}>
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => deleteEntry(entry.id)}
            >
              <Trash className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  ));
};
