import mongodb from "mongodb";
import { AnyBulkWriteOperation, Collection } from "mongodb";
import { addUpdatedAtPropertyIfMissing } from "./corrections";

export const syncCollections = async (
  localCollection: Collection,
  remoteCollection: Collection,
  lastSync: number // milliseconds since epoch
) => {
  const msSinceEpoch = Date.now();

  // Ensure index for performance
  await localCollection.createIndex({ updatedAt: 1 });
  await remoteCollection.createIndex({ updatedAt: 1 });

  await addUpdatedAtPropertyIfMissing(remoteCollection, msSinceEpoch);
  await addUpdatedAtPropertyIfMissing(localCollection, msSinceEpoch);

  const bulkOperationsRemote: AnyBulkWriteOperation[] = [];
  const bulkOperationsLocal: AnyBulkWriteOperation[] = [];

  const localDocs = await localCollection
    .find({ updatedAt: { $gt: lastSync } })
    .toArray();

  for (const doc of localDocs) {
    const remoteDoc = await remoteCollection.findOne({ _id: doc._id });
    if (!remoteDoc) {
      bulkOperationsRemote.push({ insertOne: { document: doc } }); // Doesn't exist remotely
    } else if (doc.updatedAt > remoteDoc.updatedAt) {
      bulkOperationsRemote.push({
        replaceOne: { filter: { _id: doc._id }, replacement: doc },
      }); // Local is newer
    } else if (doc.updatedAt < remoteDoc.updatedAt) {
      bulkOperationsLocal.push({
        replaceOne: { filter: { _id: remoteDoc._id }, replacement: remoteDoc },
      }); // Remote is newer
    }
  }

  const remoteDocs = await remoteCollection
    .find({
      updatedAt: { $gt: lastSync },
      _id: { $nin: localDocs.map((doc) => doc._id) },
    })
    .toArray();

  for (const doc of remoteDocs) {
    bulkOperationsLocal.push({ insertOne: { document: doc } });
  }

  try {
    await remoteCollection.bulkWrite(bulkOperationsRemote);
  } catch (error) {
    console.warn("Remote bulk operation failed: " + error);
  }

  try {
    await localCollection.bulkWrite(bulkOperationsLocal);
  } catch (error) {
    console.warn("Local bulk operation failed: " + error);
  }
};
