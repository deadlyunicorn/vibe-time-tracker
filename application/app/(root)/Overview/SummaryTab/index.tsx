import { TimeEntry } from "../../interface";
import { getProjectSummary, getTopicSummary } from "../utils";
import { TimeByProjectCard } from "./TimeByProjectCard";
import { TimeByTopicCard } from "./TimeByTopicCard";

export const SummaryTabContent = ({ entries }: { entries: TimeEntry[] }) => {
  const projectSummary = getProjectSummary(entries);
  const topicSummary = getTopicSummary(entries);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <TimeByProjectCard projectSummary={projectSummary} />
      <TimeByTopicCard topicSummary={topicSummary} />
    </div>
  );
};
