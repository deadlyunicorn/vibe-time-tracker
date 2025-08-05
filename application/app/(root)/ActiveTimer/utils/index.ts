import { Utils } from "@/lib/utils/index";
import { TimeEntry } from "../../interface";
import { UserService } from "@/lib/client-service/users";
import { UserNotLoggedInError } from "@/lib/errors/general-errors";
import { EntryService } from "@/lib/client-service/entries";
import { AlertType } from "@/components/AlertListener/interface";
import { IGlobalState } from "../../store/interface";
import { getIsOffline, OfflineStorageUtils } from "@/lib/utils/offline";

export const onStopTimer = (timer: TimeEntry, store: IGlobalState) => {
  if (!timer) return;

  const endTime = new Date().getTime();
  const finalizedTimer = {
    ...timer,
    endTime,
    description: Utils.makeEmptyStringNull(timer.description),
  };

  Utils.alertOnError(async () => {
    const userId = UserService.getCurrentUserId();
    if (!userId) {
      throw new UserNotLoggedInError(userId);
    }

    // Online - proceed with normal API call
    return EntryService.finalize({
      entry: finalizedTimer,
      isOnline: !getIsOffline(),
      userId,
    })
      .then((response) => {
        Utils.dispatchAlert({
          summary: "Success",
          type: AlertType.Success,
          description: "Entry stored successfully",
        });
        return response;
      })
      .then(() => {
        store.finalizeTimer(timer);
      });
  });
};

export const onUpdateTimer = async (
  timer: TimeEntry,
  reloadState: () => void
) => {
  if (!timer) return;

  const userId = UserService.getCurrentUserId();
  if (!userId) {
    throw new UserNotLoggedInError(userId);
  }

  await EntryService.update({
    entry: timer,
    userId,
    isOnline: !getIsOffline(),
  });

  Utils.dispatchAlert({
    summary: "Success",
    description: "Timer has been updated successfully",
    type: AlertType.Success,
  });
  reloadState();
};
