import { TimeEntry } from "@/app/(root)/interface";
import { Utils } from "..";
import { AlertType } from "@/components/AlertListener/interface";
import { UserModel } from "@/lib/db/users/model";
import { EntryModel } from "@/lib/db/entries/model";

export const getIsOffline = () => {
  return !navigator.onLine;
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

  export const initState = (
    user: UserModel,
    activeTimer: undefined | TimeEntry
  ) => {
    localStorage.setItem(CACHED_USER_KEY, JSON.stringify(user));
    localStorage.setItem(CACHED_TIMER_KEY, JSON.stringify(activeTimer));
  };

  export const getUserInfo = (userId: number) => {
    const user = JSON.parse(
      localStorage.get(CACHED_USER_KEY)
    ) as UserModel | null;

    if (user?.userId != userId) {
      return null;
    }

    return user;
  };

  export const getActiveTimer = (userId: number) => {
    const timer = JSON.parse(localStorage.get(CACHED_TIMER_KEY)) as
      | EntryModel
      | undefined;

    if (timer?.userId != userId) {
      return undefined;
    }

    return timer;
  };
}
