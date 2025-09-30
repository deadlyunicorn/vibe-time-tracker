import { useEffect } from "react";
import { useGlobalStore } from "@/app/(root)/store";
import { UserService } from "@/lib/client-service/users";
import { EntryService } from "@/lib/client-service/entries";
import { getIsOnline } from "../utils/cache";
import { Utils } from "../utils/index";

export const useAppInitialization = () => {
  const store = useGlobalStore();
  const shouldRestartState = store.shouldRestartState;

  useEffect(() => {
    const userId = UserService.getCurrentUserId();
    if (!userId) {
      return;
    }

    const isOnline = getIsOnline();

    if (shouldRestartState) {
      // Check if we're online before making network requests
      // Online: fetch fresh data from server
      Promise.all([
        UserService.getInfo(userId, isOnline),
        EntryService.getActiveTimer(userId, isOnline),
      ])
        .then(([user, timer]) => {
          store.initState(user, timer);
          store.setStateRestarted();
        })
        .catch((error) => {
          Utils.alertOnError(() => {
            store.setInitializationFailed();
            throw error;
          });
        });
    }
  }, [shouldRestartState, store]);
};
