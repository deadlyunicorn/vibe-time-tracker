"use client"

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type {} from "@redux-devtools/extension"; // required for devtools typing
import { TimeEntry } from "../interface";
import { ITimer } from "../ActiveTimer/interface";

interface IGlobalState {
  entries: TimeEntry[];
  timer: ITimer | null;
  startTimer: (timer: ITimer) => void;
  addEntry: (entry: TimeEntry) => void;
  loadEntries: (entries: Array<TimeEntry>) => void;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

export const useGlobalStore = create<IGlobalState>()(
  devtools(
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
          selectedDate: new Date(date),
        })),
    }),
    {
      name: "global-state",
    }
  )
);
