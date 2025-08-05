import { TimeEntry } from "../interface";

export const getProjectsFromEntries = (entries: Array<TimeEntry>) => {
  return Array.from(new Set(entries.map((entry) => entry.project)));
};

export const getTopicsFromEntries = (entries: Array<TimeEntry>) => {
  return Array.from(new Set(entries.map((entry) => entry.topic)));
};

export const getEntriesGroupedByProjects = (entries: Array<TimeEntry>) => {
  return groupByStringProperty<TimeEntry>(entries, "project");
};

export const getEntriesGroupedByTopics = (entries: Array<TimeEntry>) => {
  return groupByStringProperty<TimeEntry>(entries, "topic");
};

export const groupByStringProperty = <T>(
  entries: Array<T>,
  propertyName: keyof T
) => {
  const propertyEntryMap: { [property: string]: Array<T> | undefined } = {};

  for (const entry of entries) {
    const propertyForEntry = entry[propertyName];

    if (!propertyEntryMap[propertyForEntry as string]) {
      propertyEntryMap[propertyForEntry as string] = [];
    }
    propertyEntryMap[propertyForEntry as string]!.push(entry);
  }

  return propertyEntryMap as {
    [property: string]: T[];
  };
};

const filterEntriesForRange = (
  entries: TimeEntry[],
  startDate: Date,
  endDate: Date
) => {
  return entries.filter((entry) => {
    if (entry.endTime) {
      const entryEndDate = new Date(entry.endTime);
      return entryEndDate >= startDate && entryEndDate <= endDate;
    }

    return true;
  });
};

export const getTodaysEntries = (entries: TimeEntry[]) => {
  const now = new Date();
  const startOfDay = new Date(now);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(now);
  endOfDay.setHours(23, 59, 59, 999);

  return filterEntriesForRange(entries, startOfDay, endOfDay);
};

export const getThisWeeksEntries = (entries: TimeEntry[]) => {
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay()); // Sunday
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6); // Saturday
  endOfWeek.setHours(23, 59, 59, 999);

  return filterEntriesForRange(entries, startOfWeek, endOfWeek);
};

export const getThisMonthsEntries = (entries: TimeEntry[]) => {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  startOfMonth.setHours(0, 0, 0, 0);

  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  endOfMonth.setHours(23, 59, 59, 999);

  return filterEntriesForRange(entries, startOfMonth, endOfMonth);
};

export const getAllEntries = (store: IGlobalState) => {
  return [...store.entries, ...(store.timer ? [store.timer] : [])];
};

