import { useGlobalStore } from "../../store";
import { TimeEntry } from "../../interface";
import { getEntriesGroupedByProjects } from "../../Overview/utils";
import { Tabs } from "@/components/ui/tabs";
import { TabList } from "./TabList";
import { TabContent } from "./TabContent";

export const EntriesView = () => {
  const store = useGlobalStore();
  const entries = store.entries;
  const entriesByProject = getEntriesGroupedByProjects(entries);
  const projects = Object.keys(entriesByProject);

  const editEntry = (entry: TimeEntry) => {
    alert(entry);
  };

  const deleteEntry = (id: number) => {
    alert(id);
  };

  return (
    <Tabs defaultValue={projects.at(0)} className="space-y-6 w-full">
      <TabList projects={projects} />
      {projects.map((project) => (
        <TabContent
          project={project}
          entriesForProject={entriesByProject[project]}
          key={`${project}_tab_content`}
        />
      ))}
    </Tabs>
  );
};
