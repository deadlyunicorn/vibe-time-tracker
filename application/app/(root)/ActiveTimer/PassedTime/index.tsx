"use client";
import { Utils } from "@/lib/utils/index";
import { usePassedTimeTimer } from "@/lib/hooks/usePassedTimeTimer";

export const PassedTime = ({ startTime }: { startTime: Date }) => {
  const passedTime = usePassedTimeTimer(startTime);

  return (
    <div className="flex gap-0.5 flex-col items-end">
      <span className="font-medium text-xs">Passed time:</span>
      <span className="font-bold">{passedTime}</span>
    </div>
  );
};
