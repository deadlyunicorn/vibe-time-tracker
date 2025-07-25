import { useEffect } from "react";

export const useInterval = (action: () => void, duration: number) => {
  useEffect(() => {
    const interval = setInterval(action, duration);

    return () => clearInterval(interval);
  }, []);
};
