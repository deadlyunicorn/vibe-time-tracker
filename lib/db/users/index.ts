import { getCollections } from "..";

const getUsers = async () => {
  const { usersCollection } = await getCollections();
  return usersCollection.find({}).toArray();
};

export const createUser = async ({ username, password }) => {};


export const loginUser = async({ username, password }) => {
  const { usersCollection } = await getCollections();
  const user = await usersCollection.findOne({ username, password });
  return user;
}