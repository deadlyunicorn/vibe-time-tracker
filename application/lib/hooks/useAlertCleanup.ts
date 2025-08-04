import { useEffect } from "react";
import { IAlert } from "@/components/AlertListener/interface";

export const useAlertCleanup = (
  alerts: Array<IAlert & { timestamp: number }>,
  setAlerts: React.Dispatch<React.SetStateAction<Array<IAlert & { timestamp: number }>>>
) => {
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();

      const latestNotifications = alerts.filter(
        (notification) => now - notification.timestamp < 3000
      );

      setAlerts(latestNotifications);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [alerts, setAlerts]);
};
