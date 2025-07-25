"use client";
import { Utils } from "@/lib/utils/index";
import { TimeUtils } from "@/lib/utils/timeUtils";
import { useEffect, useState } from "react";

export const PassedTime = ({ startTime }: { startTime: Date }) => {
  const [passedTime, setPassedTime] = useState(
    TimeUtils.getPassedTimeString(
      TimeUtils.getDateDifference(startTime, new Date())
    )
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setPassedTime(
        TimeUtils.getPassedTimeString(
          TimeUtils.getDateDifference(startTime, new Date())
        )
      );
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  return (
    <div className="flex gap-0.5 flex-col items-end">
      <span className="font-medium text-xs">Passed time:</span>
      <span className="font-bold">{passedTime}</span>
    </div>
  );
};
