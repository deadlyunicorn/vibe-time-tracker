import { TimeEntry } from "@/app/(root)/interface";
import { getEntriesGroupedByTopics } from "@/app/(root)/Overview/utils";
import { TabsContent } from "@/components/ui/tabs";
import { TopicContent } from "./TopicContent";

export interface TabContentProps {
  project: string;
  entriesForProject: Array<TimeEntry>;
}

export const TabContent = ({ project, entriesForProject }: TabContentProps) => {
  const entriesByTopic = getEntriesGroupedByTopics(entriesForProject);
  const topics = Object.keys(entriesByTopic);

  return (
    <TabsContent value={project} className="space-y-6">
      {topics.map((topic) => (
        <TopicContent
          key={`${topic}_values`}
          entriesForTopic={entriesByTopic[topic]}
          topic={topic}
        />
      ))}
    </TabsContent>
  );
};
