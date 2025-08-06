import { EntryModel } from "@/lib/db/entries/model";
import { parseErrorFromResponse } from "@/lib/errors";
import { GetEntriesForRangeParsedBody } from "@/lib/interfaces/entries/interface";
import { BaseResponse } from "@/lib/interfaces/interface";
import {
  CreateEntryBody,
  FinalizeEntryBody,
  DeleteEntryBody,
} from "@/lib/interfaces/user/interface";
import { Utils } from "@/lib/utils/index";

export namespace EntryService {
  export const create = async (body: CreateEntryBody) => {
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

  export const finalize = async (body: FinalizeEntryBody) => {
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

  export const update = async (body: CreateEntryBody) => {
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

  export const deleteEntry = async (body: DeleteEntryBody) => {
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

    const { data } = (await response.json()) as BaseResponse<{ startTime: number }>;

    return data;
  };
}
