import { UserRepository } from "@/lib/db/users";
import { ClientFriendlyError, withErrorHandling } from "@/lib/errors";
import { AddProjectBody } from "@/lib/interfaces/user/interface";
import { UserServerService } from "@/lib/server-service/users";
import { ProjectValidator, UserIdValidator } from "@/lib/validators";
import zod from "zod";

const ProjectSchema = zod.object({
  userId: UserIdValidator,
  project: ProjectValidator,
});

export const POST = withErrorHandling(async (request) => {
  const body: AddProjectBody = await request.json();
  const parsedBody = ProjectSchema.parse(body);

  const result = await UserServerService.addProject(parsedBody);

  // Simulate a successful login response
  return new Response(JSON.stringify(result), {
    headers: { "Content-Type": "application/json" },
  });
});
