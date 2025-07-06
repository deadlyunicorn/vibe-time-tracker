import { TimeEntry } from "@/app/(root)/interface";
import { getCollections } from "..";

export namespace TimersRepository {

  
  export const getActiveTimer = async (userId: number) => {
    const { entriesCollection } = await getCollections();
    return entriesCollection.findOne({ userId, endTime: { $exists: false } });
  };

  export const create = async (userId: number, timer: TimeEntry) => {
    const { entriesCollection } = await getCollections();

    return await entriesCollection.insertOne({
      ...timer,
      userId,
      updatedAt: Date.now(),
    });
  };


const getEntries = async () => {
  const { entriesCollection } = await getCollections();
  return entriesCollection.findOne({});
};
