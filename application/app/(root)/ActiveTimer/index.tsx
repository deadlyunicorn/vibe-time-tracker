"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useGlobalStore } from "../store";
import { PassedTime } from "./PassedTime";
import { TimeUtils } from "@/lib/utils/timeUtils";
import { EditableBadge } from "./EditableBadge";
import { onStopTimer, onUpdateTimer } from "./utils";

export const ActiveTimer = () => {
  const store = useGlobalStore();
  const timer = store.timer;

  if (!timer) {
    return null;
  }
  return (
    <Card className="mb-6 border-green-200 bg-green-50 w-full">
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex gap-4 flex-col">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <div className="gap-1 flex">
                <span className="font-medium">Timer running since:</span>
                <span className="font-bold">
                  {TimeUtils.getStartTimeFromDate(new Date(timer.startTime))}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="flex flex-col">
                <h5>Project</h5>
                <EditableBadge
                  initialValue={timer.project}
                  onUpdate={(newValue) =>
                    onUpdateTimer(
                      { ...timer, project: newValue },
                      store.restartState
                    )
                  }
                />
              </div>
              <div className="flex flex-col">
                <h5>Topic</h5>
                <EditableBadge
                  initialValue={timer.topic}
                  onUpdate={(newValue) =>
                    onUpdateTimer(
                      { ...timer, topic: newValue },
                      store.restartState
                    )
                  }
                />
              </div>
            </div>
            <div className="flex flex-col">
              <h5>Description</h5>
              {timer.description && (
                <EditableBadge
                  initialValue={timer.description ?? ""}
                  onUpdate={(newValue) =>
                    onUpdateTimer(
                      { ...timer, description: newValue },
                      store.restartState
                    )
                  }
                />
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2 w-24">
            <Button
              onClick={() => onStopTimer(timer, store)}
              variant="destructive"
              size="sm"
            >
              Stop Timer
            </Button>
            <PassedTime startTime={new Date(timer.startTime)} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
