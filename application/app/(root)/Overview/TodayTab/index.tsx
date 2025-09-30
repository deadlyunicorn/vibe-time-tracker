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
import { Duration } from "./interface";
import { TimeEntry } from "../../interface";
import { LoadingIndicator } from "@/components/ui/loadingIndicator";
import { Card } from "@/components/ui/card";
import { SummaryTabContent } from "../SummaryTab";
import { SummaryForDuration } from "./SummaryForDuration";

const getEntriesForDuration = (entries: TimeEntry[], duration: Duration) => {
  switch (duration) {
    case Duration.day:
      return getTodaysEntries(entries);
    case Duration.week:
      return getThisWeeksEntries(entries);
    case Duration.month:
      return getThisMonthsEntries(entries);
    default:
      return entries;
  }
};

export const EntryRangeTab = ({
  duration,
}: {
  duration: Duration & "summary";
}) => {
  const store = useGlobalStore();

  const { loading, hasFailed } = useLoadEntries();

  const entries = getAllEntries(store);


  const allEntriesForDuration = getEntriesForDuration(
    entries,
    duration
  );

  return (
    <>
      {duration !== "summary" && (
        <SummaryForDuration
          duration={duration}
          entriesForDuration={allEntriesForDuration}
        />
      )}
      <div className="space-y-4">
        {loading ? (
          <Card className="px-4 py-24 flex items-center justify-center">
            <LoadingIndicator />
          </Card>
        ) : allEntriesForDuration.length === 0 ? (
          <NoEntriesView hasFailed={hasFailed} />
        ) : duration === "summary" ? (
          <SummaryTabContent entries={allEntriesForDuration} />
        ) : (
          <EntriesView filteredEntries={allEntriesForDuration} />
        )}
      </div>
    </>
  );
};
