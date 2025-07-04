import { dbPromise } from "./mongodb";

const dbName = "TimeTracker";

export const getCollections = async () => {
  const client = await dbPromise;

  return {
    entriesCollection: client.db(dbName).collection("entries"),
    usersCollection: client.db(dbName).collection("users"),
  };
};


