"use client";

import { useAppInitialization } from "@/lib/hooks";
import { useAutoSyncSetup } from "@/lib/hooks/useAutoSyncSetup";

export const StoreInitializer = () => {
  useAppInitialization();
  useAutoSyncSetup();

  return null;
};
