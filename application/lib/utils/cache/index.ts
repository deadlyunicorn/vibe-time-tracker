import { TimeEntry } from "@/app/(root)/interface";
import { Utils } from "..";
import { AlertType } from "@/components/AlertListener/interface";
import { UserModel } from "@/lib/db/users/model";
import { EntryModel } from "@/lib/db/entries/model";

export const getIsOnline = () => {
  return navigator.onLine;
};

export namespace OfflineIndicators {
  // Handle online event
  export const showIsOnline = () => {
    // if (!hasShownOnlineAlert.current) {
    Utils.dispatchAlert({
      summary: "Back Online",
      description: "Connection restored. Syncing offline data...",
      type: AlertType.Success,
    });
  };

  // Handle offline event
  export const showIsOffline = () => {
    Utils.dispatchAlert({
      summary: "You're Offline",
      description:
        "Changes will be saved locally and synced when you reconnect.",
      type: AlertType.Info,
    });
  };

  // Handle sync start event
  export const handleSyncStart = () => {
    Utils.dispatchAlert({
      summary: "Syncing Data",
      description: "Uploading offline changes to server...",
      type: AlertType.Info,
    });
  };
}

export namespace CacheStorageUtils {
  const CACHED_TIMER_KEY = "cached-timer";
  const CACHED_USER_KEY = "cached-user";
  const CACHED_ENTRIES_KEY = "cached-entries";
  const OFFLINE_ENTRIES_KEY = "offline-entries";

  // Initialize state with user and timer
  export const initState = (
    user: UserModel,
    activeTimer: undefined | TimeEntry
  ) => {
    localStorage.setItem(CACHED_USER_KEY, JSON.stringify(user));
    localStorage.setItem(CACHED_TIMER_KEY, JSON.stringify(activeTimer));
  };

  // User management
  export const getUserInfo = (userId: number): UserModel | null => {
    try {
      const userJson = localStorage.getItem(CACHED_USER_KEY);
      if (!userJson) return null;

      const user = JSON.parse(userJson) as UserModel | null;
      if (user?.userId !== userId) {
        return null;
      }
      return user;
    } catch {
      return null;
    }
  };

  // Active timer management
  export const getActiveTimer = (userId: number): EntryModel | undefined => {
    try {
      const timerJson = localStorage.getItem(CACHED_TIMER_KEY);
      if (!timerJson || timerJson === "null") return undefined;

      const timer = JSON.parse(timerJson) as EntryModel | undefined;
      if (timer?.userId !== userId) {
        return undefined;
      }
      return timer;
    } catch {
      return undefined;
    }
  };

  export const saveActiveTimer = (timer: EntryModel | null) => {
    localStorage.setItem(CACHED_TIMER_KEY, JSON.stringify(timer));
  };

  // Cached entries management for offline viewing
  export const cacheEntries = (entries: TimeEntry[]) => {
    localStorage.setItem(CACHED_ENTRIES_KEY, JSON.stringify(entries));
  };

  export const getCachedEntries = (): TimeEntry[] => {
    try {
      const entriesJson = localStorage.getItem(CACHED_ENTRIES_KEY);
      return entriesJson ? JSON.parse(entriesJson) : [];
    } catch {
      return [];
    }
  };

  export const updateCachedEntry = (entry: TimeEntry) => {
    const entries = getCachedEntries();
    const index = entries.findIndex((e) => e.startTime === entry.startTime);
    if (index >= 0) {
      entries[index] = entry;
    } else {
      entries.push(entry);
    }
    cacheEntries(entries);
  };

  export const removeCachedEntry = (startTime: number) => {
    const entries = getCachedEntries();
    const filtered = entries.filter((e) => e.startTime !== startTime);
    cacheEntries(filtered);
  };

  // Offline entries management (local changes made while offline)
  export const saveOfflineEntry = (entry: TimeEntry) => {
    const entries = getOfflineEntries();
    const index = entries.findIndex((e) => e.startTime === entry.startTime);
    if (index >= 0) {
      entries[index] = entry;
    } else {
      entries.push(entry);
    }
    localStorage.setItem(OFFLINE_ENTRIES_KEY, JSON.stringify(entries));
  };

  export const getOfflineEntries = (): TimeEntry[] => {
    try {
      const entriesJson = localStorage.getItem(OFFLINE_ENTRIES_KEY);
      return entriesJson ? JSON.parse(entriesJson) : [];
    } catch {
      return [];
    }
  };

  export const removeOfflineEntry = (startTime: number) => {
    const entries = getOfflineEntries();
    const filtered = entries.filter((e) => e.startTime !== startTime);
    localStorage.setItem(OFFLINE_ENTRIES_KEY, JSON.stringify(filtered));
  };

  // Get combined entries (cached + offline) for offline viewing
  export const getCombinedEntries = (): TimeEntry[] => {
    const cachedEntries = getCachedEntries();
    const offlineEntries = getOfflineEntries();

    // Create a map to handle conflicts (offline entries override cached entries)
    const entriesMap = new Map<number, TimeEntry>();

    // Add cached entries first
    cachedEntries.forEach((entry) => {
      entriesMap.set(entry.startTime, entry);
    });

    // Add offline entries (will override cached entries if same startTime)
    offlineEntries.forEach((entry) => {
      entriesMap.set(entry.startTime, entry);
    });

    return Array.from(entriesMap.values());
  };
}
