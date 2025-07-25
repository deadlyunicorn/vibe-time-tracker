import { UserModel } from "@/lib/db/users/model";
import { TimeEntry } from "../interface";

export interface IGlobalState {
  hasBeenInitiated: boolean;
  hasInitializationFailed: boolean;
  entries: TimeEntry[];
  timer: TimeEntry | null;
  startTimer: (timer: TimeEntry) => void;
  addEntry: (entry: TimeEntry) => void;
  loadEntries: (entries: Array<TimeEntry>) => void;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  availableProjects: string[];
  availableTopics: string[];
  initState: (user: UserModel, activeTimer?: TimeEntry) => void;
  shouldRestartState: boolean;
  restartState: () => void;
  finalizeTimer: (timer: TimeEntry) => void;
  setInitializationFailed: () => void;
}
