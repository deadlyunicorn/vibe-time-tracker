import { useEffect, useState } from "react";
import { Utils } from "../../utils";

export const PassedTime = ({ startTime }: { startTime: Date }) => {
  const [passedTime, setPassedTime] = useState(Utils.getPassedTime(startTime));

  useEffect(() => {
    const interval = setInterval(() => {
      setPassedTime(Utils.getPassedTime(startTime));
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
