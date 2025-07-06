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
}
