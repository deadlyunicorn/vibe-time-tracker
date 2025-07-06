import { TimersRepository } from "@/lib/db/entries";
import { UserRepository } from "@/lib/db/users";
import { ClientFriendlyError, withErrorHandling } from "@/lib/errors";
import { FinalizeEntryBody } from "@/lib/interfaces/user/interface";
import {
  DescriptionValidator,
  MsSinceEpochValidator,
  ProjectValidator,
  TopicValidator,
  UserIdValidator,
} from "@/lib/validators";
import zod from "zod";

const FinalizeEntrySchema = zod.object({
  userId: UserIdValidator,
  entry: zod.object({
    project: ProjectValidator,
    topic: TopicValidator,
    description: DescriptionValidator,
    startTime: MsSinceEpochValidator,
    endTime: MsSinceEpochValidator,
  }),
});

export const POST = withErrorHandling(async (request) => {
  const body: FinalizeEntryBody = await request.json();
  const { entry, userId } = FinalizeEntrySchema.parse(body);

  const user = await UserRepository.getUserById({ userId });
  if (!user) {
    throw new ClientFriendlyError(
      "Not found",
      "Your user entry was not found in the database. Are you logged in?",
      404
    );
  }

  const activeTimer = await TimersRepository.getActiveTimer(userId);
  if (!activeTimer) {
    throw new ClientFriendlyError(
      "Invalid action",
      "Cannot end timer as there seems to be no active one.",
      401
    );
  }

  const insertedTimer = await TimersRepository.finalize(userId, entry);

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
