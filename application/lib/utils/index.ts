import prettyMs from "pretty-ms";
import { TimeUtils } from "./timeUtils";
import { AlertType, IAlert } from "@/components/AlertListener/interface";
import { Events } from "../consts";

/* eslint-disable @typescript-eslint/no-namespace */
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

  export const makeUndefinedIfEmpty = (text: string | undefined) => {
    if (!text) {
      return undefined;
    }

    if (text.trim() == "") {
      return undefined;
    }
    return text;
  };

  export const assertValidNumber = (_item: unknown) => {
    const item = Number(_item);
    if (!item) {
      throw new Error("Not item provided");
    }
    if (Number.isNaN(item)) {
      throw new Error("Item is not a number");
    }

    return item as number;
  };
}
