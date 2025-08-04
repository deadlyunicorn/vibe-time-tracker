import { useEffect, useState } from "react";
import { TimeUtils } from "@/lib/utils/timeUtils";

export const usePassedTimeTimer = (startTime: Date) => {
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
  }, [startTime]);

  return passedTime;
};
