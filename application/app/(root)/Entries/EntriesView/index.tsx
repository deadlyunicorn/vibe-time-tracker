import { useGlobalStore } from "../../store";
import { TimeEntry } from "../../interface";
import {
  getEntriesGroupedByProjects,
} from "../../Overview/utils";
import { Tabs } from "@/components/ui/tabs";
import { TabList } from "./TabList";
import { EntryTabContent } from "./TabContent";
import { useSelectedProjectInit } from "@/lib/hooks/useSelectedProjectInit";

interface EntriesViewProps {
  filteredEntries?: TimeEntry[];
}

export const EntriesView = ({ filteredEntries }: EntriesViewProps = {}) => {
  const store = useGlobalStore();
  const entries = store.entries;
  
  // Use filtered entries if provided, otherwise use all entries with active timer
  const entriesToDisplay = filteredEntries ?? [...entries, ...(store.timer ? [store.timer] : [])];
  const entriesByProject = getEntriesGroupedByProjects(entriesToDisplay);
  const projects = Object.keys(entriesByProject);

  useSelectedProjectInit(projects);

  const editEntry = (entry: TimeEntry) => {
    alert(entry);
  };

  const deleteEntry = (id: number) => {
    alert(id);
  };

  return (
    <Tabs
      onValueChange={store.setSelectedProject}
      defaultValue={projects.at(0)}
      className="space-y-6 w-full"
    >
      <TabList projects={projects} />
      {projects.map((project) => (
        <EntryTabContent
          project={project}
          entriesForProject={entriesByProject[project]}
          key={`${project}_tab_content`}
        />
      ))}
    </Tabs>
  );
};
