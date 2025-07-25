import { TimeEntry } from "@/app/(root)/interface";
import { Card } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { TopicPreview } from "./TopicPreview";
import { EntryView } from "./EntryView";

interface TopicContentProps {
  entriesForTopic: Array<TimeEntry>;
  topic: string;
}

export const TopicContent = ({ entriesForTopic, topic }: TopicContentProps) => {
  return (
    <Card className="px-4 py-2">
      <Collapsible defaultOpen>
        <TopicPreview entries={entriesForTopic} topic={topic} />
        <div className="flex flex-col gap-2 my-2">
          {entriesForTopic.map((entry) => (
            <CollapsibleContent key={`${entry.startTime}_entry`}>
              <EntryView entry={entry} />
            </CollapsibleContent>
          ))}
        </div>
      </Collapsible>
    </Card>
  );
};
