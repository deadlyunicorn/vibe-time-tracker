"use client";

import { UserIdKey } from "@/lib/consts";
import { UserModel } from "@/lib/db/users/model";
import { LoginBody } from "@/lib/interfaces/auth/interface";

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
      throw new Error("Login failed");
    }

    const data = (await response.json()) as { userId: number };
    return data.userId;
  };

  export const getCurrentUserId = (): string | null => {
    const userId = localStorage.getItem(UserIdKey);
    return userId ? String(userId) : null;
  };

  export const getInfo = async (userId: string) => {
    const queryString = new URLSearchParams({ userId }).toString();

    const response = await fetch(`/api/users/info?${queryString}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user info");
    }

    return (await response.json()) as UserModel;
  };
}
