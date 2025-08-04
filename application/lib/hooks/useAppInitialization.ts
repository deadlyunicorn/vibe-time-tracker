import { useEffect } from "react";
import { useGlobalStore } from "@/app/(root)/store";
import { UserService } from "@/lib/client-service/users";
import { EntryService } from "@/lib/client-service/entries";
import { Utils } from "@/lib/utils/index";

export const useAppInitialization = () => {
  const store = useGlobalStore();
  const shouldRestartState = store.shouldRestartState;

  useEffect(() => {
    const userId = UserService.getCurrentUserId();
    if (!userId) {
      return;
    }

    Promise.all([
      UserService.getInfo(userId),
      EntryService.getActiveTimer(userId),
    ])
      .then(([user, timer]) => {
        store.initState(user, timer);
      })
      .catch((error) => {
        Utils.alertOnError(() => {
          store.setInitializationFailed();
          throw error;
        });
      });
  }, [shouldRestartState, store]);
};
