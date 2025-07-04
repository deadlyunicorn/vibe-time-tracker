import { useEffect } from "react";

export const useEventListener = (
  eventName: string,
  handler: (event: CustomEvent) => void
) => {
  useEffect(() => {
    window.addEventListener(eventName, handler as never);

    return () => {
      window.removeEventListener(eventName, handler as never);
    };
  }, [eventName, handler]);
};
