import { TimeEntry } from "@/app/(root)/interface";
import { getTotalPassedTimeForEntriesString } from "../../utils";
import { AddEntryDialogButton } from "../AddEntryDialog";
import { Duration } from "../interface";

const getDurationLabel = (duration: Duration) => {
  switch (duration) {
    case Duration.day:
      return "Today's Entries";
    case Duration.week:
      return "This Week's Entries";
    case Duration.month:
      return "This Month's Entries";
    default:
      return "Today's Entries";
  }
};

export const SummaryForDuration = ({
  duration,
  entriesForDuration,
}: {
  duration: Duration;
  entriesForDuration: TimeEntry[];
}) => {
  const durationLabel = getDurationLabel(duration);

  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-xl font-semibold">{durationLabel}</h2>
        <div className="flex items-center justify-between flex-col">
          <h1 className="font-medium">
            {getTotalPassedTimeForEntriesString(entriesForDuration)}
          </h1>
        </div>
      </div>
      <AddEntryDialogButton />
    </div>
  );
};
