"use client";

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type {} from "@redux-devtools/extension"; // required for devtools typing
import { TimeEntry } from "../interface";
import { UserModel } from "@/lib/db/users/model";
import { Utils } from "@/lib/utils/index";

interface IGlobalState {
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
  setInitializationFailed: () => void
}

export const useGlobalStore = create<IGlobalState>()(
  devtools(
    (set) => ({
      hasBeenInitiated: false,
      hasInitializationFailed: false,
      timer: null,
      startTimer: (timer: TimeEntry) =>
        set(() => ({
          timer: timer,
        })),
      finalizeTimer: (timer: TimeEntry) => {
        if (!timer) {
          return;
        }
        set(() => ({
          timer: null,
        }));
      },
      entries: [],
      addEntry: (entry) =>
        set((state) => ({
          entries: [...state.entries, entry],
        })),
      loadEntries: (entries: Array<TimeEntry>) =>
        set(() => ({
          entries: entries,
        })),
      selectedDate: new Date(),
      setSelectedDate: (date: Date) =>
        set(() => ({
          selectedDate: new Date(date),
        })),
      availableProjects: [],
      availableTopics: [],
      initState: (user: UserModel, activeTimer: undefined | TimeEntry) => {
        const availableProjects = Utils.loadStringArray(user.projects);
        const availableTopics = Utils.loadStringArray(user.topics);
        const timer = activeTimer;
        set(() => ({
          availableProjects,
          availableTopics,
          timer,
          hasBeenInitiated: true,
        }));
      },
      shouldRestartState: false,
      restartState: () => {
        set((state) => ({
          shouldRestartState: !state.shouldRestartState,
        }));
      },
      setInitializationFailed: () => {
        set(() => ({
          hasInitializationFailed: true
        } as IGlobalState));
      },
    }),
    {
      name: "global-state",
    }
  )
);
