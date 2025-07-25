"use client";
import { Utils } from "@/lib/utils/index";
import { TimeUtils } from "@/lib/utils/timeUtils";
import { useEffect, useState } from "react";

export const PassedTime = ({ startTime }: { startTime: Date }) => {
  const [passedTime, setPassedTime] = useState(TimeUtils.getPassedTime(startTime));

  useEffect(() => {
    const interval = setInterval(() => {
      setPassedTime(TimeUtils.getPassedTime(startTime));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  return (
    <div className="flex gap-1">
      <span className="font-medium">Passed time:</span>
      <span className="font-bold">{passedTime}</span>
    </div>
  );
};
