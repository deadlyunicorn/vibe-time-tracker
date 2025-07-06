import { UserRepository } from "@/lib/db/users";
import { ClientFriendlyError, withErrorHandling } from "@/lib/errors";
import { AddProjectBody } from "@/lib/interfaces/user/interface";
import { ProjectValidator, UserIdValidator } from "@/lib/validators";
import zod from "zod";

const ProjectSchema = zod.object({
  userId: UserIdValidator,
  project: ProjectValidator,
});

export const POST = withErrorHandling(async (request) => {
  const body: AddProjectBody = await request.json();
  const { project, userId } = ProjectSchema.parse(body);

  const user = await UserRepository.getUserById({ userId });
  if (!user) {
    throw new ClientFriendlyError(
      "Not found",
      "Your user entry was not found in the database. Are you logged in?",
      404
    );
  }

  const projects = user.projects;
  if (projects.includes(project)) {
    throw new ClientFriendlyError(
      "Already exists",
      "Project already exists for this user",
      401
    );
  }

  projects.push(project);
  const updatedUser = await UserRepository.setProjectsForUser({
    userId,
    projects,
  });

  // Simulate a successful login response
  return new Response(
    JSON.stringify({ success: updatedUser.acknowledged, data: { projects } }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
});
