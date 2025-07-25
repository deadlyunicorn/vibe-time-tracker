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
