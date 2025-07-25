import { UserRepository } from "@/lib/db/users";
import { ClientFriendlyError } from "@/lib/errors";

export namespace UserServerService {
  export const addProject = async ({
    userId,
    project,
    ignoreIfAlreadyExists = false,
  }: {
    userId: number;
    project: string;
    ignoreIfAlreadyExists?: boolean;
  }) => {
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
      if (ignoreIfAlreadyExists) {
        return { success: true, data: { projects } };
      }

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

    return { success: updatedUser.acknowledged, data: { projects } };
  };

  export const addTopic = async ({
    topic,
    userId,
    ignoreIfAlreadyExists,
  }: {
    userId: number;
    topic: string;
    ignoreIfAlreadyExists?: boolean;
  }) => {
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
      if (ignoreIfAlreadyExists) {
        return { success: true, data: { topics } };
      }
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
    return {
      success: updatedUser.acknowledged,
      data: { topics },
    };
  };
}
