import prettyMs from "pretty-ms";

/* eslint-disable @typescript-eslint/no-namespace */
export namespace TimeUtils {
  export const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

  const getDayOfMonthFromDate = (date: Date) => {
    return date.toISOString().split("T")[0].split("-").at(2);
  };

  export const isDifferentDay = (date1: Date, date2: Date): boolean => {
    const differenceMoreThanADay =
      Math.abs(date1.getTime() - date2.getTime()) > oneDayInMilliseconds;

    if (differenceMoreThanADay) {
      return true;
    }

    return getDayOfMonthFromDate(date1) !== getDayOfMonthFromDate(date2);
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

    if (TimeUtils.isDifferentDay(now, startDate)) {
      return `${dayOfMonth} ${month} at ${startTime}`;
    }

    return startTime;
  };

  export const getDateDifference = (startDate: Date, endDate: Date): number => {
    const diff = endDate.getTime() - startDate.getTime() + 1000; // Adding 1000 to account for the milliseconds difference
    return diff;
  };

  export const getPassedTimeString = (diff: number): string => {
    return prettyMs(diff, {
      unitCount: 2,
      secondsDecimalDigits: 0,
    });
  };
}
