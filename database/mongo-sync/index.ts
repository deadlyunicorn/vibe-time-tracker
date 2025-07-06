import { MongoClient } from "mongodb";
import { syncCollections } from "./helpers/sync";
import { SyncMetaCollection } from "./interface";

const localUri = process.env.REMOTE_URI;
const remoteUri = process.env.LOCAL_URI;

const database = "TimeTracker";
const metaCollection = "syncMeta";
const collections = ["entries", "users"];

async function main() {
  if (!localUri) {
    throw new Error("Local URI not provided");
  }

  if (!remoteUri) {
    throw new Error("Remote URI not provided");
  }
  const localClient = new MongoClient(localUri);
  const remoteClient = new MongoClient(remoteUri);

  await localClient.connect();
  await remoteClient.connect();

  const localMetaColl = localClient
    .db(database)
    .collection<SyncMetaCollection>(metaCollection);
  const remoteMetaColl = remoteClient
    .db(database)
    .collection<SyncMetaCollection>(metaCollection);

  for (const collection of collections) {
    console.log(`Syncing ${collection}`);

    const localColl = localClient.db(database).collection(collection);
    const remoteColl = remoteClient.db(database).collection(collection);

    try {
      const lastSync = (
        await Promise.all(
          [remoteMetaColl, localMetaColl].map(
            async (collectionConnection) =>
              (await collectionConnection.findOne({ collection }))?.syncedAt ??
              0
          )
        )
      ).reduce(
        (previous, current) => Math.min(previous, current),
        Number.POSITIVE_INFINITY
      );

      await syncCollections(localColl, remoteColl, lastSync);
      await Promise.all(
        [remoteMetaColl, localMetaColl].map(
          async (collectionConnection) =>
            await collectionConnection.updateOne(
              {
                collection,
              },
              {
                $set: {
                  collection,
                  syncedAt: Date.now(),
                },
              },
              { upsert: true }
            )
        )
      ).then((_) => {
        console.log("Updated sync metadata");
      });
    } catch (error) {
      console.log(`Syncing ${collection} failed: ${error}`);
    }
  }
  await localClient.close();
  await remoteClient.close();
}

main();
