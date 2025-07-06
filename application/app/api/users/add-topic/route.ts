import { UserRepository } from "@/lib/db/users";
import { ClientFriendlyError, withErrorHandling } from "@/lib/errors";
import { AddTopicBody } from "@/lib/interfaces/user/interface";
import { TopicValidator, UserIdValidator } from "@/lib/validators";
import zod from "zod";

const TopicSchema = zod.object({
  userId: UserIdValidator,
  topic: TopicValidator,
});

export const POST = withErrorHandling(async (request) => {
  const body: AddTopicBody = await request.json();
  const { topic, userId } = TopicSchema.parse(body);

  const user = await UserRepository.getUserById({ userId });
  if (!user) {
    throw new ClientFriendlyError(
      "Not found",
      "Your user entry was not found in the database. Are you logged in?",
      404
    );
  }

  const topics = user.topics;
  if (topics.includes(topic)) {
    throw new ClientFriendlyError(
      "Already exists",
      "Topic already exists for this user",
      401
    );
  }

  topics.push(topic);
  const updatedUser = await UserRepository.setTopicsForUser({
    userId,
    topics,
  });

  // Simulate a successful login response
  return new Response(
    JSON.stringify({
      success: updatedUser.acknowledged,
      data: { topics },
    }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
});
