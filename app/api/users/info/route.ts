import { UserRepository } from "@/lib/db/users";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const searchParams = Object.fromEntries(
    request.nextUrl.searchParams.entries()
  ) as { userId: string };

  const userId = Number(searchParams.userId);
  if (!userId) {
    throw new Error("User ID is required");
  }
  if (Number.isNaN(userId)) {
    throw new Error("User ID is not valid");
  }

  const user = await UserRepository.getUserById({ userId });
  if (!user) {
    throw new Error("User not found");
  }

  return new Response(JSON.stringify({ success: true, user }), {
    headers: { "Content-Type": "application/json" },
  });
};
