import { useGlobalStore } from "@/app/(root)/store";
import { EntryService } from "@/lib/services/entries";
import { UserService } from "@/lib/services/users";
import { useEffect, useState } from "react";

/**
 * Uses the store internally
 */
export const useLoadEntries = () => {
  const store = useGlobalStore();
  const userId = UserService.getCurrentUserId()!;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    EntryService.getForRange({
      userId,
      endTime: Date.now(),
      startTime: 0,
    }).then((entries) => {
      store.loadEntries(entries);
      setLoading(false);
    });
  }, []);

  return {
    loading,
  };
};
