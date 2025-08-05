import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TimeUtils } from "@/lib/utils/timeUtils";
import { BarChart } from "lucide-react";

export const TimeByProjectCard = ({
  projectSummary,
}: {
  projectSummary: { [project: string]: number };
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart className="w-5 h-5" />
          Time by Project
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(projectSummary).map(([project, duration]) => (
            <div key={project} className="flex items-center justify-between">
              <span className="font-medium">{project}</span>
              <span className="text-muted-foreground">
                {TimeUtils.getPassedTimeString(duration)}
              </span>
            </div>
          ))}
          {Object.keys(projectSummary).length === 0 && (
            <p className="text-muted-foreground text-center py-4">
              No data available
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
