import { Card, CardContent } from "@/components/ui/card";
import { CircleX, Clock } from "lucide-react";

interface NoEntriesViewProps {
  hasFailed: boolean;
}

export const NoEntriesView = ({ hasFailed }: NoEntriesViewProps) => {
  return (
    <Card>
      <CardContent className="pt-6 text-center">
        <Clock className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />

        <p className="text-muted-foreground">
          No time entries found for the selected time range
        </p>
        <p className="text-sm text-muted-foreground">
          {hasFailed
            ? "Failed to load entries"
            : "Start a timer or add an entry manually"}
          {hasFailed && (
            <CircleX className="w-4 h-4 mx-auto mb-4 text-red-600" />
          )}
        </p>
      </CardContent>
    </Card>
  );
};
