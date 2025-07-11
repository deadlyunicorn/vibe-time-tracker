"use client";

import { Input } from "@/components/ui/input";
import { useGlobalStore } from "../store";
import { TimeUtils } from "@/lib/utils/timeUtils";

export const Header = () => {
  const store = useGlobalStore();
  const selectedDate = store.selectedDate;

  return (
    <div className="flex items-center justify-between mb-6 w-full">
      <div>
        <h1 className="text-3xl font-bold">Time Tracker</h1>
        <p className="text-muted-foreground">
          Track your time across projects and topics
        </p>
      </div>
      <div className="flex items-center gap-1">
        <h3>Viewing</h3>
        <div className="flex items-center gap-2">
          <Input
            type="date"
            value={TimeUtils.dateToInputValue(selectedDate)}
            onChange={(e) => store.setSelectedDate(new Date(e.target.value))}
            pattern=""
            className="w-auto"
          />
        </div>
      </div>
    </div>
  );
};
