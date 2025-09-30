import { useGlobalStore } from "@/app/(root)/store";
import { EntryService } from "@/lib/client-service/entries";
import { UserService } from "@/lib/client-service/users";
import { getIsOnline } from "@/lib/utils/cache";
import { useEffect, useRef, useState } from "react";

/**
 * Uses the store internally
 */
export const useLoadEntries = () => {
  const store = useGlobalStore();
  const userId = UserService.getCurrentUserId()!;

  const [loading, setLoading] = useState(true);
  const [hasFailed, setHasFailed] = useState(false);
  const onlineRef = useRef(getIsOnline());

  useEffect(() => {
    const isOnline = getIsOnline();

    if (isOnline == onlineRef.current && store.entries) {
      return;
    }

    onlineRef.current = isOnline;

    if (isOnline) {
      EntryService.getForRange({
        userId,
        endTime: Date.now(),
        startTime: 0,
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
      return;
    }

    if (!isOnline) {
      const entries = EntryService.getOfflineEntries();
      store.loadEntries(entries);
      return;
    }
  }, [store, userId]);

  return {
    loading,
    hasFailed,
  };
};
