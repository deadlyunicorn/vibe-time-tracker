import { UserRepository } from "@/lib/db/users";
import { AddProjectBody } from "@/lib/interfaces/user/interface";
import zod from "zod";

const ProjectSchema = zod.object({
  userId: zod.number().min(1, "User ID is required"),
  project: zod.string().min(6, "Project should be at least 6 characters long"),
});

export const POST = async (request: Request) => {
  const body: AddProjectBody = await request.json();
  const { project, userId } = ProjectSchema.parse(body);

  const user = await UserRepository.getUserById({ userId });
  if (!user) {
    throw new Error("User not found");
  }

  const projects = user.projects;
  if (projects.includes(project)) {
    throw new Error("Project already exists for this user");
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
};
