import { TimeEntry } from "@/app/(root)/interface";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { EntryViewTimeDetails } from "./EntryViewTimeDetails";
import { EntryButtons } from "./EntryButtons";

export const EntryView = ({ entry }: { entry: TimeEntry }) => {
  return (
    <Card key={entry.startTime}>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="secondary">{entry.project}</Badge>
                <Badge variant="outline">{entry.topic}</Badge>
              </div>
              <EntryViewTimeDetails entry={entry} />
              {entry.description && (
                <p className="text-sm mt-1">{entry.description}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <EntryButtons entry={entry} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};


