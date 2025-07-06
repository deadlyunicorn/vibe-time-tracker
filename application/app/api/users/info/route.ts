import { UserRepository } from "@/lib/db/users";
import { withErrorHandling } from "@/lib/errors";
import { Utils } from "@/lib/utils/index";
import { NextRequest } from "next/server";

export const GET = withErrorHandling(async (request: NextRequest) => {
  const searchParams = Object.fromEntries(
    request.nextUrl.searchParams.entries()
  ) as { userId: string };

  const userId = Utils.assertValidNumber(searchParams.userId);

  const user = await UserRepository.getUserById({ userId });
  if (!user) {
    throw new Error("User not found");
  }

  return new Response(JSON.stringify({ success: true, data: user }), {
    headers: { "Content-Type": "application/json" },
  });
});
