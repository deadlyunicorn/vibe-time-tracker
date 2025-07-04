/* eslint-disable @typescript-eslint/no-namespace */
export namespace DateUtils {
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

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
}
