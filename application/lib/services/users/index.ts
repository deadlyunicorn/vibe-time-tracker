"use client";

import { UserIdKey } from "@/lib/consts";
import { UserModel } from "@/lib/db/users/model";
import { parseErrorFromResponse } from "@/lib/errors";
import { LoginBody } from "@/lib/interfaces/auth/interface";
import { BaseResponse } from "@/lib/interfaces/interface";
import { AddProjectBody, AddTopicBody } from "@/lib/interfaces/user/interface";

export namespace UserService {
  export const login = async (body: LoginBody) => {
    const response = await fetch("/api/users/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw parseErrorFromResponse(await response.json());
    }

    const { data } = (await response.json()) as BaseResponse<{
      userId: number;
    }>;
    return data.userId;
  };

  export const getCurrentUserId = (): number | null => {
    const userId = localStorage.getItem(UserIdKey);
    return userId ? Number(userId) : null;
  };

  export const getInfo = async (userId: number) => {
    const queryString = new URLSearchParams({
      userId: String(userId),
    }).toString();

    const response = await fetch(`/api/users/info?${queryString}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    });

    if (!response.ok) {
      throw parseErrorFromResponse(await response.json());
    }

    const { data } = (await response.json()) as BaseResponse<UserModel>;

    return data;
  };

  export const addProjectEntry = async (body: AddProjectBody) => {
    const response = await fetch(`/api/users/add-project`, {
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    if (!response.ok) {
      throw parseErrorFromResponse(await response.json());
    }

    return (await response.json()) as UserModel;
  };

  export const addTopicEntry = async (body: AddTopicBody) => {
    const response = await fetch(`/api/users/add-topic`, {
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    if (!response.ok) {
      throw parseErrorFromResponse(await response.json());
    }

    return (await response.json()) as UserModel;
  };
}
