import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TimeUtils } from "@/lib/utils/timeUtils";
import { BarChart } from "lucide-react";

export const TimeByTopicCard = ({
  topicSummary,
}: {
  topicSummary: { [topic: string]: number };
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart className="w-5 h-5" />
          Time by Topic
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(topicSummary).map(([topic, duration]) => (
            <div key={topic} className="flex items-center justify-between">
              <span className="font-medium">{topic}</span>
              <span className="text-muted-foreground">
                {TimeUtils.getPassedTimeString(duration)}
              </span>
            </div>
          ))}
          {Object.keys(topicSummary).length === 0 && (
            <p className="text-muted-foreground text-center py-4">
              No data available
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
