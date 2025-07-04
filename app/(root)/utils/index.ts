import prettyMs from "pretty-ms";
import { DateUtils } from "./dateUtils";

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

    const startTime = now.toISOString().split("T")[1].slice(0, 5);
    const { dayOfMonth, month } = getDateAttributes(startDate);

    console.log(dayOfMonth + month);

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
}
