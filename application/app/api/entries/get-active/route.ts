import { TimersRepository } from "@/lib/db/entries";
import { UserRepository } from "@/lib/db/users";
import { ClientFriendlyError, withErrorHandling } from "@/lib/errors";
import { Utils } from "@/lib/utils/index";

export const GET = withErrorHandling(async (request) => {
  const searchParams = Object.fromEntries(
    request.nextUrl.searchParams.entries()
  ) as { userId: string };

  const userId = Utils.assertValidNumber(searchParams.userId);

  const user = await UserRepository.getUserById({ userId });
  if (!user) {
    throw new ClientFriendlyError("Not found", "User not found");
  }

  const activeTimer = await TimersRepository.getActiveTimer(userId);

  return new Response(JSON.stringify({ success: true, data: activeTimer }), {
    headers: { "Content-Type": "application/json" },
  });
});
