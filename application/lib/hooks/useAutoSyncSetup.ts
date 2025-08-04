import { useEffect, useRef } from "react";
import { OfflineSyncService } from "@/lib/services/offlineSync";

export const useAutoSyncSetup = () => {
  const hasSetupOfflineSync = useRef(false);

  useEffect(() => {
    if (hasSetupOfflineSync.current) return;

    const cleanup = OfflineSyncService.setupAutoSync();
    hasSetupOfflineSync.current = true;
    
    // Dispatch sync-complete event to update UI
    window.dispatchEvent(new CustomEvent('sync-complete'));

    return cleanup;
  }, []);
};
