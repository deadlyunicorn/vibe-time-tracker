import { TimeEntry, WithOfflineSupport } from "@/app/(root)/interface";
import { EntryModel } from "@/lib/db/entries/model";
import { ClientFriendlyError, parseErrorFromResponse } from "@/lib/errors";
import { GetEntriesForRangeParsedBody } from "@/lib/interfaces/entries/interface";
import { BaseResponse } from "@/lib/interfaces/interface";
import {
  CreateEntryBody,
  FinalizeEntryBody,
  DeleteEntryBody,
} from "@/lib/interfaces/user/interface";
import { Utils } from "@/lib/utils/index";
import { CacheStorageUtils } from "@/lib/utils/cache";

export namespace EntryService {
  export const create = async (body: CreateEntryBody & WithOfflineSupport) => {
    const { isOnline, ...bodyWithoutIsOnline } = body;

    return isOnline
      ? createStrategy.online(bodyWithoutIsOnline)
      : createStrategy.offline(bodyWithoutIsOnline);
  };

  namespace createStrategy {
    export const online = async (body: CreateEntryBody) => {
      const response = await fetch(`/api/entries/create`, {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        method: "POST",
      });

      if (!response.ok) {
        throw parseErrorFromResponse(response);
      }

      const { data } = (await response.json()) as BaseResponse<EntryModel>;

      return data;
    };

    export const offline = async (
      body: CreateEntryBody
    ): Promise<EntryModel> => {
      // Save the new entry as active timer in cache
      const activeTimer = CacheStorageUtils.getActiveTimer(body.userId);
      if (activeTimer) {
        throw new ClientFriendlyError(
          "An active timer already exists",
          "Please finalize or delete it before creating a new one."
        );
      }

      const newEntry: EntryModel = {
        ...body.entry,
        userId: body.userId,
        updatedAt: Date.now(),
      };

      CacheStorageUtils.saveActiveTimer(newEntry);

      return newEntry;
    };
  }

  export const finalize = async (
    body: FinalizeEntryBody & WithOfflineSupport
  ) => {
    const { isOnline, ...bodyWithoutIsOnline } = body;

    return isOnline
      ? finalizeStrategy.online(bodyWithoutIsOnline)
      : finalizeStrategy.offline(bodyWithoutIsOnline);
  };

  namespace finalizeStrategy {
    export const online = async (body: FinalizeEntryBody) => {
      const response = await fetch(`/api/entries/finalize`, {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        method: "POST",
      });

      if (!response.ok) {
        throw await parseErrorFromResponse(response);
      }

      const { data } = (await response.json()) as BaseResponse<EntryModel>;
      return data;
    };

    export const offline = async (
      body: FinalizeEntryBody
    ): Promise<EntryModel> => {
      // Save the finalized entry to cache
      CacheStorageUtils.saveOfflineEntry(body.entry);

      // Clear active timer since it's now finalized
      CacheStorageUtils.saveActiveTimer(null);

      // Return the entry as EntryModel (add userId and updatedAt from body)
      return {
        ...body.entry,
        userId: body.userId,
        updatedAt: Date.now(),
      };
    };
  }

  export const getActiveTimer = async (
    userId: number,
    isOnline: boolean
  ): Promise<EntryModel | undefined> => {
    return isOnline
      ? getActiveTimerStrategy.online(userId)
      : getActiveTimerStrategy.offline(userId);
  };

  namespace getActiveTimerStrategy {
    export const online = async (userId: number) => {
      const queryString = new URLSearchParams({
        userId: String(userId),
      }).toString();

      const response = await fetch(`/api/entries/get-active?${queryString}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      });

      if (!response.ok) {
        throw await parseErrorFromResponse(response);
      }

      const { data } = (await response.json()) as BaseResponse<
        EntryModel | undefined
      >;

      return data;
    };

    export const offline = async (
      userId: number
    ): Promise<EntryModel | undefined> => {
      const timer = CacheStorageUtils.getActiveTimer(userId);
      return timer;
    };
  }

  export const getOfflineEntries = () => {
    return CacheStorageUtils.getOfflineEntries();
  };

  export const getForRange = async (
    params: GetEntriesForRangeParsedBody
  ): Promise<Array<TimeEntry>> => {
    const queryString = new URLSearchParams(
      Utils.objectValuesToString(params as unknown as Record<string, unknown>)
    ).toString();

    const response = await fetch(`/api/entries/get?${queryString}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    });

    if (!response.ok) {
      throw await parseErrorFromResponse(response);
    }

    const { data } = (await response.json()) as BaseResponse<EntryModel[]>;

    return data;
  };

  export const update = async (body: CreateEntryBody & WithOfflineSupport) => {
    const { isOnline, ...bodyWithoutIsOnline } = body;

    return isOnline
      ? updateStrategy.online(bodyWithoutIsOnline)
      : updateStrategy.offline(bodyWithoutIsOnline);
  };

  namespace updateStrategy {
    export const online = async (body: CreateEntryBody) => {
      const response = await fetch(`/api/entries/update`, {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        method: "POST",
      });

      if (!response.ok) {
        throw await parseErrorFromResponse(response);
      }

      const { data } = (await response.json()) as BaseResponse<EntryModel>;
      return data;
    };

    export const offline = async (
      body: CreateEntryBody
    ): Promise<EntryModel> => {
      // Update the active timer in cache
      const updatedEntry: EntryModel = {
        ...body.entry,
        userId: body.userId,
        updatedAt: Date.now(),
      };

      CacheStorageUtils.saveActiveTimer(updatedEntry);

      return updatedEntry;
    };
  }

  export const deleteEntry = async (
    body: DeleteEntryBody & WithOfflineSupport
  ) => {
    const { isOnline, ...bodyWithoutIsOnline } = body;

    return isOnline
      ? deleteEntryStrategy.online(bodyWithoutIsOnline)
      : deleteEntryStrategy.offline(bodyWithoutIsOnline);
  };

  namespace deleteEntryStrategy {
    export const online = async (body: DeleteEntryBody) => {
      const response = await fetch(`/api/entries/delete`, {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        method: "POST",
      });

      if (!response.ok) {
        throw await parseErrorFromResponse(response);
      }

      const { data } = (await response.json()) as BaseResponse<{
        startTime: number;
      }>;

      return data;
    };

    export const offline = async (
      body: DeleteEntryBody
    ): Promise<{ startTime: number }> => {
      // For offline deletion, we just remove from cache
      // In a real app, you might want to mark as "deleted" and sync later
      CacheStorageUtils.removeCachedEntry(body.startTime);
      CacheStorageUtils.removeOfflineEntry(body.startTime);

      return { startTime: body.startTime };
    };
  }
}
