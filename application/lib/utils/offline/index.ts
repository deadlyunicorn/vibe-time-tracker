import { TimeEntry } from "@/app/(root)/interface";
import { Utils } from "..";
import { AlertType } from "@/components/AlertListener/interface";

export const getIsOffline = () => {
  return !navigator.onLine;
}

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

  // Handle sync complete event
  export const handleSyncComplete = () => {
    const updatedOfflineData = OfflineStorageUtils.getOfflineDataSummary();

    if (!updatedOfflineData.hasOfflineData) {
      Utils.dispatchAlert({
        summary: "Sync Complete",
        description: "All offline data has been synchronized successfully.",
        type: AlertType.Success,
      });
    }
  };
}
