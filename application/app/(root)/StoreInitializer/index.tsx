"use client";

import { useEffect, useRef } from "react";
import { useGlobalStore } from "../store";
import { UserService } from "@/lib/services/users";
import { EntryService } from "@/lib/services/entries";
import { Utils } from "@/lib/utils/index";

export const StoreInitializer = () => {
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
  }, [shouldRestartState]);

  return null;
};
