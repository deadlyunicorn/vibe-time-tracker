import { EntryModel } from "@/lib/db/entries/model";
import { parseErrorFromResponse } from "@/lib/errors";
import { GetEntriesForRangeParsedBody } from "@/lib/interfaces/entries/interface";
import { BaseResponse } from "@/lib/interfaces/interface";
import {
  CreateEntryBody,
  FinalizeEntryBody,
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

    return data;
  };

  export const getActiveTimer = async (userId: number) => {
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

    const { data } = (await response.json()) as BaseResponse<EntryModel>;

    return data;
  };

  export const getForRange = async (params: GetEntriesForRangeParsedBody) => {
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

  export const update = async (body: CreateEntryBody) => {
    const response = await fetch(`/api/entries/update`, {
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
}
