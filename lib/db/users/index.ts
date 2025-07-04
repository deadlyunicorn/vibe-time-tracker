import { getCollections } from "..";

const getUsers = async () => {
  const { usersCollection } = await getCollections();
  return usersCollection.find({}).toArray();
};

const createUser = async ({ username, password }) => {};

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
}
