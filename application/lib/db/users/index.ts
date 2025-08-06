import { getCollections } from "..";

export namespace UserRepository {
  export const getUserByUsername = async ({
    username,
  }: {
    username: string;
  }) => {
    const { usersCollection } = await getCollections();
    const user = await usersCollection.findOne({ username });
    return user;
  };

  export const getUserById = async ({ userId }: { userId: number }) => {
    const { usersCollection } = await getCollections();
    const user = await usersCollection.findOne({ userId });
    return user;
  };

  export const setProjectsForUser = async ({
    userId,
    projects,
  }: {
    userId: number;
    projects: string[];
  }) => {
    const { usersCollection } = await getCollections();
    const user = await usersCollection.updateOne(
      { userId },
      {
        $set: { projects, updatedAt: Date.now() },
      }
    );
    return user;
  };

  export const setTopicsForUser = async ({
    userId,
    topics,
  }: {
    userId: number;
    topics: string[];
  }) => {
    const { usersCollection } = await getCollections();
    const user = await usersCollection.updateOne(
      { userId },
      {
        $set: { topics, updatedAt: Date.now() },
      }
    );
    return user;
  };
}
