import { useInterval } from "@/lib/hooks/useInterval";
import { TimeUtils } from "@/lib/utils/timeUtils";
import { useState } from "react";

export const CurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(
    TimeUtils.getStartTimeFromDate(new Date())
  );

  useInterval(() => {
    setCurrentTime(TimeUtils.getStartTimeFromDate(new Date()));
  }, 1000);

  return (
    <div className="gap-1 flex">
      <span className="font-medium">Current time:</span>
      <span className="font-bold">{currentTime}</span>
    </div>
  );
};
