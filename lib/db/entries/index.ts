import { getCollections } from "..";

const getEntries = async () => {
  const { entriesCollection } = await getCollections();
  return entriesCollection.findOne({});
};
