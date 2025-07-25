import { TimeEntry } from "@/app/(root)/interface";
import { TimeUtils } from "@/lib/utils/timeUtils";

const getTotalPassedTimeForEntries = (entries: Array<TimeEntry>): number => {
  return entries.reduce(
    (acc, entry) =>
      acc +
      TimeUtils.getDateDifference(
        new Date(entry.startTime),
        entry.endTime ? new Date(entry.endTime) : new Date()
      ),
    0
  );
};

export const getTotalPassedTimeForEntriesString = (
  entries: Array<TimeEntry>
): string => {
  const totalPassedTime = getTotalPassedTimeForEntries(entries);
  return TimeUtils.getPassedTimeString(totalPassedTime);
};
