import { ITimer } from "../ActiveTimer/interface";
import { TimeEntry } from "../interface"

export interface IGlobalState {
    entries: TimeEntry[]
    timer: ITimer | null;
    startTimer: (timer: ITimer) => void
    addEntry: (entry: TimeEntry) => void
    loadEntries: (entries: Array<TimeEntry>) => void,
    selectedDate: Date;
    setSelectedDate: (date: Date) => void;
} 