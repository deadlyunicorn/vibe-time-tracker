import { TimersRepository } from "@/lib/db/entries";
import { UserRepository } from "@/lib/db/users";
import { ClientFriendlyError, withErrorHandling } from "@/lib/errors";
import { CreateEntryBody } from "@/lib/interfaces/user/interface";
import { ZodEntryUpdateValidator } from "@/lib/validators";

export const POST = withErrorHandling(async (request) => {
  const body: CreateEntryBody = await request.json();
  const { entry, userId } = ZodEntryUpdateValidator.parse(body);

  const user = await UserRepository.getUserById({ userId });
  if (!user) {
    throw new ClientFriendlyError(
      "Not found",
      "Your user entry was not found in the database. Are you logged in?",
      404
    );
  }

  const activeTimer = await TimersRepository.getActiveTimer(userId);
  if (!!activeTimer) {
    throw new ClientFriendlyError(
      "Invalid action",
      "Cannot start a new timer as there already seems to be an active one.",
      401
    );
  }

  const insertedTimer = await TimersRepository.create(userId, entry);

  // Simulate a successful login response
  return new Response(
    JSON.stringify({
      success: insertedTimer.acknowledged,
      data: { entry },
    }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
});
