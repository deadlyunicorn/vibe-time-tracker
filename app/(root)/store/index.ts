import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { IGlobalState } from "./interface";
import type {} from "@redux-devtools/extension"; // required for devtools typing
import { TimeEntry } from "../interface";
import { ITimer } from "../ActiveTimer/interface";

export const useGlobalStore = create<IGlobalState>()(
  devtools(
    persist(
      (set) => ({
        timer: null,
        startTimer: (timer: ITimer) =>
          set(() => ({
            timer: timer,
          })),
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
            selectedDate: date,
          })),
      }),
      {
        name: "global-state",
      }
    )
  )
);
