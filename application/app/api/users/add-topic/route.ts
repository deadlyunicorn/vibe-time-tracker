import { UserRepository } from "@/lib/db/users";
import { ClientFriendlyError, withErrorHandling } from "@/lib/errors";
import { AddTopicBody } from "@/lib/interfaces/user/interface";
import { UserServerService } from "@/lib/server-service/users";
import { TopicValidator, UserIdValidator } from "@/lib/validators";
import zod from "zod";

const TopicSchema = zod.object({
  userId: UserIdValidator,
  topic: TopicValidator,
});

export const POST = withErrorHandling(async (request) => {
  const body: AddTopicBody = await request.json();
  const parsedBody = TopicSchema.parse(body);

  const result = UserServerService.addTopic(parsedBody);

  // Simulate a successful login response
  return new Response(JSON.stringify(result), {
    headers: { "Content-Type": "application/json" },
  });
});
