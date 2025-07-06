"use client";

import { useEffect } from "react";
import { useGlobalStore } from "../store";
import { UserService } from "@/lib/services/users";

export const StoreInitializer = () => {
  const store = useGlobalStore();
  const shouldRestartState = store.shouldRestartState;

  useEffect(() => {
    const userId = UserService.getCurrentUserId();
    if (!userId) {
      return;
    }

    UserService.getInfo(userId).then((user) => {
      store.initState(user);
    });
  }, [shouldRestartState]);

  return null;
};
