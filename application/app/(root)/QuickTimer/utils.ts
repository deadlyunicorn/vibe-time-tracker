import { UserService } from "@/lib/client-service/users";
import { UserNotLoggedInError } from "@/lib/errors/general-errors";
import { Utils } from "@/lib/utils/index";
import { TimeEntry } from "../interface";
import { EntryService } from "@/lib/client-service/entries";
import { AlertType } from "@/components/AlertListener/interface";
import { IGlobalState } from "../store/interface";
import { getIsOffline } from "@/lib/utils/offline";

interface IStartTimer {
  project: string;
  topic: string;
  description: string;
  store: IGlobalState;
}

export const handleStartTimer = ({
  project,
  topic,
  description,
  store,
}: IStartTimer) => {
  if (!project || !topic) return;

  const startTime = new Date().getTime();

  Utils.alertOnError(async () => {
    const userId = UserService.getCurrentUserId();
    if (!userId) {
      throw new UserNotLoggedInError(userId);
    }

    const timer: TimeEntry = {
      project,
      topic,
      startTime,
      description,
    };

    return EntryService.create({
      userId,
      entry: {
        ...timer,
        description: Utils.makeEmptyStringNull(description),
      },
      isOnline: !getIsOffline(),
    })
      .then((response) => {
        Utils.dispatchAlert({
          summary: "Success",
          type: AlertType.Success,
          description: "Timer started successfully",
        });
        return response;
      })
      .then(() => {
        store.startTimer(timer);
      });
  });
};

export const handleAddNewProject = (project: string, store: IGlobalState) => {
  Utils.alertOnError(() => {
    const userId = UserService.getCurrentUserId();
    if (!userId) {
      throw new UserNotLoggedInError(userId);
    }
    return UserService.addProjectEntry({
      project,
      userId,
    }).then((response) => {
      Utils.dispatchAlert({
        summary: "Success",
        type: AlertType.Success,
        description: "Project added successfully",
      });
      return response;
    });
  }).then(() => {
    store.restartState();
  });
};

export const handleAddNewTopic = (topic: string, store: IGlobalState) => {
  Utils.alertOnError(() => {
    const userId = UserService.getCurrentUserId();
    if (!userId) {
      throw new UserNotLoggedInError(userId);
    }
    return UserService.addTopicEntry({
      topic,
      userId,
    }).then((response) => {
      Utils.dispatchAlert({
        summary: "Success",
        type: AlertType.Success,
        description: "Topic added successfully",
      });
      return response;
    });
  }).then(() => {
    store.restartState();
  });
};
