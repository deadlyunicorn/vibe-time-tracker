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

      <div className="fixed top-0 left-0  h-[100vh] w-[100vw] flex flex-col justify-end gap-4 py-4 pointer-events-none px-8">
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
            className={`border w-96 min-h-16 p-2 pointer-events-auto pb-8 relative`}
          >
            <Terminal />
            <AlertTitle>{alert.summary}</AlertTitle>
            <AlertDescription>{alert.description}</AlertDescription>
            <span className="absolute left-0 bottom-0 text-xs m-2">
              {new Date(alert.timestamp).toTimeString()}
            </span>
          </Alert>
        ))}
      </div>
    </>
  );
};
