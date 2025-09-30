import { CollapsibleTrigger } from "@/components/ui/collapsible";
import { getTotalPassedTimeForEntriesString } from "../utils";
import { Badge } from "@/components/ui/badge";
import { TimeEntry } from "@/app/(root)/interface";
import { CardExpandableIcon } from "../CardExpandableIcon";
import { EndActiveTimerAndStartNewOfSelectedTopicButton } from "./EndActiveTimerAndStartNewOfSelectedTopicButton";
import { useEffect, useState } from "react";

interface TopicPreviewProps {
  entries: Array<TimeEntry>;
  topic: string;
}

export const TopicPreview = ({ entries, topic }: TopicPreviewProps) => {

  const [passedTime,setPassedTime] = useState(getTotalPassedTimeForEntriesString(entries));


  useEffect(() => {
    const activeEntry = entries.find((entry) => !entry.endTime);
    if (activeEntry) {
      const interval = setInterval(() => {
        setPassedTime(getTotalPassedTimeForEntriesString(entries));
      }, 1000); // Update every second

      return () => clearInterval(interval);
    }
  })

  return (
    <div className="flex justify-between w-full items-center gap-2 relative">
      <CollapsibleTrigger className="flex justify-between w-full">
        <div className="flex gap-2 w-fit whitespace-nowrap items-center">
          <Badge className="aspect-square" variant={"secondary"}>
            {entries.length}
          </Badge>
          <h1 className="font-medium">{topic}</h1>{" "}
        </div>
        <div className="flex gap-2 items-center">
          <div className="flex items-center justify-between flex-col">
            <p className="text-sm">Topic time</p>
            <h1 className="font-medium">
              {passedTime}
            </h1>
          </div>
        </div>
      </CollapsibleTrigger>
      <CardExpandableIcon />
      <EndActiveTimerAndStartNewOfSelectedTopicButton />
    </div>
  );
};
