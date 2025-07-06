"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useGlobalStore } from "../store";
import { PassedTime } from "./PassedTime";
import { Edit } from "lucide-react";
import { Utils } from "@/lib/utils/index";
import { UserService } from "@/lib/services/users";
import { EntryService } from "@/lib/services/entries";
import { AlertType } from "@/components/AlertListener/interface";

export const ActiveTimer = () => {
  const store = useGlobalStore();
  const timer = store.timer;

  const onStopTimer = () => {
    if (!timer) return;

    const endTime = new Date().getTime();

    Utils.alertOnError(() => {
      const userId = UserService.getCurrentUserId();
      if (!userId) {
        throw new Error("User is not logged in. User Id: " + userId);
      }

      return EntryService.finalize({
        entry: {
          ...timer,
          endTime,
          description: Utils.makeUndefinedIfEmpty(timer.description),
        },
        userId,
      })
        .then((response) => {
          Utils.dispatchAlert({
            summary: "Success",
            type: AlertType.Success,
            description: "Entry stored successfully",
          });
          return response;
        })
        .then(() => {
          store.finalizeTimer(timer);
        });
    });
  };

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
                  {Utils.getStartTimeFromDate(new Date(timer.startTime))}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Badge variant="secondary">
                {timer.project}{" "}
                <div className="w-2 flex cursor-pointer">
                  <Edit
                    onClick={() => {
                      alert("Editing");
                    }}
                  />
                </div>
              </Badge>
              <Badge variant="outline">
                {timer.topic}
                <div className="w-2 flex cursor-pointer">
                  <Edit
                    onClick={() => {
                      alert("Editing");
                    }}
                  />
                </div>
              </Badge>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Button onClick={onStopTimer} variant="destructive" size="sm">
              Stop Timer
            </Button>
            <PassedTime startTime={new Date(timer.startTime)} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
