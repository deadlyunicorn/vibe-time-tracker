import { AnyBulkWriteOperation, Collection } from "mongodb";

export const addUpdatedAtPropertyIfMissing = async (
  collection: Collection,
  msSinceEpoch: number
) => {
  await collection.updateMany(
    {
      updatedAt: {
        $exists: false,
      },
    },
    {
      $set: {
        updatedAt: msSinceEpoch,
      },
    }
  );
};
