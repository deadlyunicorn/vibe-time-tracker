import { LoginBody } from "@/lib/interfaces/auth/interface";

export const login = async (body: LoginBody) => {
  const response = await fetch("/api/login", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return response.json();
};
