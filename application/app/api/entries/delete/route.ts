import { TimersRepository } from "@/lib/db/entries";
import { UserRepository } from "@/lib/db/users";
import { ClientFriendlyError, withErrorHandling } from "@/lib/errors";
import { DeleteEntryBody } from "@/lib/interfaces/user/interface";
import { MsSinceEpochValidator, UserIdValidator } from "@/lib/validators";
import zod from "zod";

const DeleteEntrySchema = zod.object({
  userId: UserIdValidator,
  startTime: MsSinceEpochValidator,
});

export const POST = withErrorHandling(async (request) => {
  const body: DeleteEntryBody = await request.json();
  const { userId, startTime } = DeleteEntrySchema.parse(body);

  const user = await UserRepository.getUserById({ userId });
  if (!user) {
    throw new ClientFriendlyError(
      "Not found",
      "Your user entry was not found in the database. Are you logged in?",
      404
    );
  }

  const entryToDelete = await TimersRepository.getTimerForUpdate(
    userId,
    startTime
  );
  if (!entryToDelete) {
    throw new ClientFriendlyError(
      "Not found",
      "The entry you are trying to delete could not be found or has already been deleted",
      404
    );
  }

  // Check if it's an active timer
  if (!entryToDelete.endTime) {
    throw new ClientFriendlyError(
      "Invalid action",
      "Cannot delete an active timer. Please stop the timer first.",
      400
    );
  }

  const deleteResult = await TimersRepository.deleteEntry(userId, startTime);

  return new Response(
    JSON.stringify({
      success: deleteResult.acknowledged && deleteResult.modifiedCount === 1,
      data: { startTime },
    }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
});
