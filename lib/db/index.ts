import { Collection } from "mongodb";
import { dbPromise } from "./mongodb";
import { UserModel } from "./users/model";
import { EntryModel } from "./entries/model";

const dbName = "TimeTracker";

export const getCollections = async () => {
  const client = await dbPromise;

  return {
    entriesCollection: client
      .db(dbName)
      .collection("entries") as Collection<EntryModel>,
    usersCollection: client
      .db(dbName)
      .collection("users") as Collection<UserModel>,
  };
};
