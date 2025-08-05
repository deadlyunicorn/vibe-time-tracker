import { useGlobalStore } from "@/app/(root)/store";
import { EntryService } from "@/lib/client-service/entries";
import { UserService } from "@/lib/client-service/users";
import { useEffect, useState } from "react";

/**
 * Uses the store internally
 */
export const useLoadEntries = () => {
  const store = useGlobalStore();
  const userId = UserService.getCurrentUserId()!;

  const [loading, setLoading] = useState(true);
  const [hasFailed, setHasFailed] = useState(false);

  useEffect(() => {
    EntryService.getForRange({
      userId,
      endTime: Date.now(),
      startTime: 0,
      isOnline: navigator.onLine,
    })
      .then((entries) => {
        store.loadEntries(entries);
        setLoading(false);
      })
      .catch((error) => {
        console.error("[Entries] Failed to load entries:", error);
        setHasFailed(true);
        setLoading(false);
      });
  }, [store, userId]);

  return {
    loading,
    hasFailed,
  };
};
