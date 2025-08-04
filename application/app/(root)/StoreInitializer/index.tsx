"use client";

import { useAppInitialization } from "@/lib/hooks/useAppInitialization";
import { useAutoSyncSetup } from "@/lib/hooks/useAutoSyncSetup";

export const StoreInitializer = () => {
  useAppInitialization();
  useAutoSyncSetup();

  return null;
};
