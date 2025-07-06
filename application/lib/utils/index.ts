import prettyMs from "pretty-ms";
import { DateUtils } from "./dateUtils";
import { AlertType, IAlert } from "@/components/AlertListener/interface";
import { Events } from "../consts";

/* eslint-disable @typescript-eslint/no-namespace */
export namespace Utils {
  export const calculateDuration = (start: string, end: string): number => {
    const startDate = new Date(`2000-01-01T${start}`);
    const endDate = new Date(`2000-01-01T${end}`);
    return Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60));
  };

  export const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  export const dateToInputValue = (date: Date): string => {
    return date.toISOString().split("T")[0];
  };

  const getDateAttributes = (date: Date) => {
    const [dayOfWeek, month, dayOfMonth, year] = date.toDateString().split(" ");

    return {
      dayOfWeek,
      month,
      dayOfMonth,
      year,
    };
  };

  export const getStartTimeFromDate = (startDate: Date): string => {
    const now = new Date();

    const startTime = startDate.toString().split(" ").at(4)!.slice(0, 5);
    const { dayOfMonth, month } = getDateAttributes(startDate);

    if (DateUtils.isDifferentDay(now, startDate)) {
      return `${dayOfMonth} ${month} at ${startTime}`;
    }

    return startTime;
  };

  export const getPassedTime = (startDate: Date): string => {
    const now = new Date();
    const diff = now.getTime() - startDate.getTime() + 1000;
    return prettyMs(diff, {
      unitCount: 2,
      secondsDecimalDigits: 0,
    });
  };

  export const stringToLabelValue = (value: string) => {
    return {
      label: value,
      value,
    };
  };

  export const dispatchAlert = (alert: IAlert) => {
    const alertEvent = new CustomEvent(Events.Alert, {
      detail: { alert },
    });

    window.dispatchEvent(alertEvent);
  };

  export const alertOnError = async <T>(cb: () => Promise<T> | T) => {
    try {
      return await cb();
    } catch (error) {
      Utils.dispatchAlert({
        summary: error instanceof Error ? error.name : "Unexpected error",
        type: AlertType.Error,
        description: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  export const loadStringArray = (array: string[]) =>
    (Array.isArray(array) ? array : []).filter(
      (entry) => (entry ?? "").trim() != ""
    );
}
