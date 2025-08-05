import { AlertType, IAlert } from "@/components/AlertListener/interface";
import { Events } from "../consts";
import { ValidationError } from "../errors";

export namespace Utils {
  // export const calculateDuration = (start: number, end: number): number => {
  //   const startDate = new Date(`2000-01-01T${start}`);
  //   const endDate = new Date(`2000-01-01T${end}`);
  //   return Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60));
  // };

  // export const formatDuration = (minutes: number): string => {
  //   const hours = Math.floor(minutes / 60);
  //   const mins = minutes % 60;
  //   return `${hours}h ${mins}m`;
  // };

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

  export const assertValidNumber = (_item: unknown) => {
    if (_item === undefined || _item === null) {
      throw new ValidationError("No item provided");
    }
    const item = Number(_item);

    if (Number.isNaN(item)) {
      throw new ValidationError("Item is not a number");
    }

    return item as number;
  };

  export const assertValidNumberWithFallback = (
    _item: unknown,
    fallback: number
  ) => {
    try {
      return assertValidNumber(_item);
    } catch (error) {
      console.warn(error);
      return fallback;
    }
  };

  export const objectValuesToString = (object: Record<string, unknown>) => {
    return Object.fromEntries(
      Object.entries(object).map(([key, value]) => [key, String(value)])
    );
  };

  export const pagesToLimits = ({
    entriesPerPage,
    currentPage,
  }: {
    entriesPerPage: number;
    /**
     * Assuming the first page has an index of 0
     */
    currentPage: number;
  }) => {
    const limit = entriesPerPage;
    const skip = currentPage * entriesPerPage;

    return {
      limit,
      skip,
    };
  };

  export const makeEmptyStringNull = (text: string | undefined | null) => {
    if (!text) {
      return null;
    }

    if (text.trim() == "") {
      return null;
    }
    return text;
  };
}
