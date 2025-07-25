import { TimeEntry } from "@/app/(root)/interface";
import { TimeUtils } from "@/lib/utils/timeUtils";
import { Dot, DotIcon } from "lucide-react";

export const EntryViewTimeDetails = ({ entry }: { entry: TimeEntry }) => {
  const isActive = !entry.endTime;

  return (
    <div className="flex items-center gap-4 text-sm text-muted-foreground">
      <span>
        {TimeUtils.getStartTimeFromDate(new Date(entry.startTime))} -&nbsp;
        {isActive
          ? "..."
          : TimeUtils.getStartTimeFromDate(new Date(entry.endTime!))}{" "}
      </span>
      <div className="font-medium">
        {isActive ? (
          <div className="flex gap-1 items-center animate-pulse">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
            <span>Active</span>
          </div>
        ) : (
          TimeUtils.getPassedTimeString(entry.endTime! - entry.startTime)
        )}{" "}
      </div>
    </div>
  );
};
