import { TimeEntry } from "@/app/(root)/interface";
import { getCollections } from "..";
import { GetEntriesForRangeFromDbBody } from "@/lib/interfaces/entries/interface";
import { UserServerService } from "@/lib/server-service/users";

export namespace TimersRepository {
  export const getActiveTimer = async (userId: number) => {
    const { entriesCollection } = await getCollections();
    return entriesCollection.findOne({ 
      userId, 
      endTime: { $exists: false },
      deletedAt: { $exists: false }
    });
  };

  export const create = async (userId: number, timer: TimeEntry) => {
    const { entriesCollection } = await getCollections();

    return await entriesCollection.insertOne({
      ...timer,
      userId,
      updatedAt: Date.now(),
    });
  };

  export const update = async (userId: number, timer: TimeEntry) => {
    const { entriesCollection } = await getCollections();

    await UserServerService.addProject({
      userId,
      project: timer.project,
      ignoreIfAlreadyExists: true,
    });
    await UserServerService.addTopic({
      userId,
      topic: timer.topic,
      ignoreIfAlreadyExists: true,
    });

    return await entriesCollection.updateOne(
      {
        userId,
        startTime: timer.startTime,
      },
      {
        $set: {
          ...timer,
          updatedAt: Date.now(),
        },
      }
    );
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
          deletedAt: { $exists: false },
        },
        {
          skip,
          limit,
        }
      )
      .toArray();
  };

  export const getTimerForUpdate = async (
    userId: number,
    startTime: number
  ) => {
    const { entriesCollection } = await getCollections();
    return entriesCollection.findOne({ 
      userId, 
      startTime,
      deletedAt: { $exists: false }
    });
  };

  export const deleteEntry = async (userId: number, startTime: number) => {
    const { entriesCollection } = await getCollections();
    return await entriesCollection.updateOne(
      {
        userId,
        startTime,
      },
      {
        $set: {
          deletedAt: Date.now(),
          updatedAt: Date.now(),
        },
      }
    );
  };
}

const getEntries = async () => {
  const { entriesCollection } = await getCollections();
  return entriesCollection.findOne({});
};
