import { EntriesView } from "../../Entries/EntriesView";
import { NoEntriesView } from "../../Entries/NoEntriesView";
import { useGlobalStore } from "../../store";
import { useLoadEntries } from "../../Entries/hooks/useEntries";
import { getProjectsFromEntries } from "../utils";
import { AddEntryDialogButton } from "./AddEntryDialog";

export const TodayTab = () => {
  const store = useGlobalStore();

  const { loading } = useLoadEntries();

  const entries = store.entries;
  const projects = getProjectsFromEntries(entries);

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
        <AddEntryDialogButton />
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
