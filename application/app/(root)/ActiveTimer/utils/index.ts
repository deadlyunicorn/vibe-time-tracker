import { Utils } from "@/lib/utils/index";
import { TimeEntry } from "../../interface";
import { UserService } from "@/lib/client-service/users";
import { UserNotLoggedInError } from "@/lib/errors/general-errors";
import { EntryService } from "@/lib/client-service/entries";
import { AlertType } from "@/components/AlertListener/interface";
import { IGlobalState } from "../../store/interface";
import { getIsOnline } from "@/lib/utils/cache";

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

    const isOnline = getIsOnline();

    return EntryService.finalize({
      entry: finalizedTimer,
      userId,
      isOnline,
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
        store.restartState();
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

  const isOnline = getIsOnline();

  await EntryService.update({
    entry: timer,
    userId,
    isOnline,
  });

  Utils.dispatchAlert({
    summary: "Success",
    description: "Timer has been updated successfully",
    type: AlertType.Success,
  });
  reloadState();
};
