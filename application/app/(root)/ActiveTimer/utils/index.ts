import { Utils } from "@/lib/utils/index";
import { TimeEntry } from "../../interface";

export const generateNewEntry = ({
  activeTimer,
  selectedDate,
}: {
  activeTimer: TimeEntry;
  selectedDate: string;
}): TimeEntry | undefined => {
  if (!activeTimer) return;

  const now = new Date();
  const endTimeString = now.toTimeString().slice(0, 5);
  const duration = Utils.calculateDuration(
    activeTimer.startTime,
    endTimeString
  );

  const newEntry: TimeEntry = {
    id: Date.now().toString(),
    project: activeTimer.project,
    topic: activeTimer.topic,
    startTime: activeTimer.startTime,
    endTime: endTimeString,
    date: selectedDate,
    duration,
    description: activeTimer.description,
  };

  return newEntry;
};

export const onStopTimer = (timer: TimeEntry, store: IGlobalState) => {
  if (!timer) return;

  const endTime = new Date().getTime();

  Utils.alertOnError(async () => {
    const userId = UserService.getCurrentUserId();
    if (!userId) {
      throw new UserNotLoggedInError(userId);
    }

    return EntryService.finalize({
      entry: {
        ...timer,
        endTime,
        description: Utils.makeUndefinedIfEmpty(timer.description),
      },
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
