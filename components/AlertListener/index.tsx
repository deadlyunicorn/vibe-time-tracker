"use client";
import { useEventListener } from "@/lib/hooks/useEventListener";
import { ReactNode, useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Terminal } from "lucide-react";
import { IAlert } from "./interface";
import { Events } from "@/lib/consts";

export const AlertListener = ({ children }: { children: ReactNode }) => {
  const [alerts, setAlerts] = useState<Array<IAlert & { timestamp: number }>>(
    []
  );

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
  }, [alerts]);

  useEventListener(Events.Alert, (event: { detail: { alert: IAlert } }) => {
    const alert = event.detail.alert;
    setAlerts((prev) => [...prev, { ...alert, timestamp: Date.now() }]);
  });

  return (
    <>
      {children}

      {alerts.map((alert, index) => (
        <Alert
          variant={alert.type === "error" ? "destructive" : "default"}
          onMouseOver={() => {
            const updatedAlerts = alerts.map((alert, _index) =>
              index == _index ? { ...alert, timestamp: Date.now() } : alert
            );
            setAlerts(updatedAlerts);
          }}
          key={`${index}_${alert.timestamp}`}
          className="fixed w-[100vw] h-16 top-0"
        >
          <Terminal />
          <AlertTitle>{alert.summary}</AlertTitle>
          <AlertDescription>{alert.description}</AlertDescription>
        </Alert>
      ))}
    </>
  );
};
