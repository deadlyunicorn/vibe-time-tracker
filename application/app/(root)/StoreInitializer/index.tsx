"use client";

import { useEffect } from "react";
import { useGlobalStore } from "../store";
import { UserService } from "@/lib/services/users";
import { EntryService } from "@/lib/services/entries";

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
    ]).then(([user, timer]) => {
      store.initState(user, timer);
    });
  }, [shouldRestartState]);

  return null;
};
