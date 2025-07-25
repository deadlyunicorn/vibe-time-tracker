import { TimeEntry } from "@/app/(root)/interface";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { getTotalPassedTimeForEntriesString } from "./utils";
import { TopicPreview } from "./TopicPreview";
import { CardExpandableIcon } from "./CardExpandableIcon";

interface TopicContentProps {
  entriesForTopic: Array<TimeEntry>;
  topic: string;
}

export const TopicContent = ({ entriesForTopic, topic }: TopicContentProps) => {
  //   const totalHoursForTopic = entriesForTopic.reduce((acc, entry) => acc + entry.duration, 0);

  return (
    <Card className="px-4 py-2">
      <Collapsible>
        <TopicPreview entries={entriesForTopic} topic={topic} />
        {entriesForTopic.map((entry) => (
          <CollapsibleContent key={`${entry.startTime}_entry`}>
            {JSON.stringify(entry)}
          </CollapsibleContent>
        ))}
      </Collapsible>
    </Card>
  );
};
