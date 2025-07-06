import { UserRepository } from "@/lib/db/users";
import { ClientFriendlyError, withErrorHandling } from "@/lib/errors";
import { AddTopicBody } from "@/lib/interfaces/user/interface";
import zod from "zod";

const TopicSchema = zod.object({
  userId: zod.number().min(1, "User ID is required"),
  topic: zod.string().min(6, "Topic should be at least 6 characters long"),
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
