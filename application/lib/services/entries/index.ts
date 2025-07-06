import { EntryModel } from "@/lib/db/entries/model";
import { parseErrorFromResponse } from "@/lib/errors";
import { BaseResponse } from "@/lib/interfaces/interface";
import {
  CreateEntryBody,
  FinalizeEntryBody,
} from "@/lib/interfaces/user/interface";

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
      throw parseErrorFromResponse(await response.json());
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
      throw parseErrorFromResponse(await response.json());
    }

    const { data } = (await response.json()) as BaseResponse<EntryModel>;

    return data;
  };
}
