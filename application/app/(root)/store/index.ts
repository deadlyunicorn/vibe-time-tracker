"use client";

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type {} from "@redux-devtools/extension"; // required for devtools typing
import { TimeEntry } from "../interface";
import { UserModel } from "@/lib/db/users/model";
import { Utils } from "@/lib/utils/index";
import { IGlobalState } from "./interface";

export const useGlobalStore = create<IGlobalState>()(
  devtools(
    (set) => ({
      hasBeenInitiated: false,
      hasInitializationFailed: false,
      timer: null,
      selectedProject: "",
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
      removeEntry: (startTime) =>
        set((state) => ({
          entries: state.entries.filter(entry => entry.startTime !== startTime),
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
        set(
          () =>
            ({
              hasInitializationFailed: true,
            } as IGlobalState)
        );
      },
      setSelectedProject(project) {
        set(() => ({
          selectedProject: project,
        }));
      },
    }),
    {
      name: "global-state",
    }
  )
);
