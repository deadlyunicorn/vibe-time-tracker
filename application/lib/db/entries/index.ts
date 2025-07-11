import { TimeEntry } from "@/app/(root)/interface";
import { getCollections } from "..";
import {
  GetEntriesForRangeFromDbBody,
  GetEntriesForRangeParsedBody,
} from "@/lib/interfaces/entries/interface";

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

  export const finalize = async (userId: number, timer: TimeEntry) => {
    const { entriesCollection } = await getCollections();

    return await entriesCollection.updateOne(
      { userId, startTime: timer.startTime },
      {
        $set: {
          endTime: timer.endTime,
          updatedAt: Date.now(),
        },
      }
    );
  };

  export const getEntriesForRange = async ({
    userId,
    startTime,
    endTime,
    skip,
    limit,
  }: GetEntriesForRangeFromDbBody) => {
    const { entriesCollection } = await getCollections();
    return entriesCollection
      .find(
        {
          userId,
          endTime: { $lt: endTime },
          startTime: { $gt: startTime },
        },
        {
          skip,
          limit,
        }
      )
      .toArray();
  };
}

const getEntries = async () => {
  const { entriesCollection } = await getCollections();
  return entriesCollection.findOne({});
};
