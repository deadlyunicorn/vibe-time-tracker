import { EntriesView } from "../../Entries/EntriesView";
import { NoEntriesView } from "../../Entries/NoEntriesView";
import { useGlobalStore } from "../../store";
import { useLoadEntries } from "../../Entries/hooks/useEntries";
import {
  getTodaysEntries,
  getThisWeeksEntries,
  getThisMonthsEntries,
  getAllEntries,
} from "../utils";
import { AddEntryDialogButton } from "./AddEntryDialog";
import { getTotalPassedTimeForEntriesString } from "../../Entries/EntriesView/TabContent/TopicContent/utils";
import { Duration } from "./interface";
import { TimeEntry } from "../../interface";

const getEntriesForDuration = (entries: TimeEntry[], duration: Duration) => {
  switch (duration) {
    case Duration.day:
      return getTodaysEntries(entries);
    case Duration.week:
      return getThisWeeksEntries(entries);
    case Duration.month:
      return getThisMonthsEntries(entries);
    default:
      return getTodaysEntries(entries);
  }
};

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

export const EntryRangeTab = ({ duration }: { duration: Duration }) => {
  const store = useGlobalStore();

  const { loading } = useLoadEntries();

  const allEntriesForDuration = getEntriesForDuration(
    getAllEntries(store),
    duration
  );

  const durationLabel = getDurationLabel(duration);

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">{durationLabel}</h2>
          <div className="flex items-center justify-between flex-col">
            <h1 className="font-medium">
              {getTotalPassedTimeForEntriesString(allEntriesForDuration)}
            </h1>
          </div>
        </div>
        <AddEntryDialogButton />
      </div>

      <div className="space-y-4">
        {loading ? (
          "loadingComponent"
        ) : allEntriesForDuration.length === 0 ? (
          <NoEntriesView />
        ) : (
          <EntriesView filteredEntries={allEntriesForDuration} />
        )}
      </div>
    </>
  );
};
